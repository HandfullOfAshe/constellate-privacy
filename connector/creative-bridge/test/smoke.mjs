// End-to-end smoke test: OAuth discovery, DCR, PKCE, consent, token, MCP calls, refresh rotation, replay rejection.
import { createHash, randomBytes } from "node:crypto";

const base = process.env.BASE || "http://127.0.0.1:8788";
const passphrase = process.env.CONNECTOR_PASSPHRASE || "local-passphrase";
const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? "  " + detail : ""}`);
}

const meta = await (await fetch(`${base}/.well-known/oauth-authorization-server`)).json();
check("AS metadata advertises S256 + DCR", meta.code_challenge_methods_supported?.includes("S256") && !!meta.registration_endpoint);

const prm = await (await fetch(`${base}/.well-known/oauth-protected-resource/mcp`)).json();
check("PRM resource matches /mcp", prm.resource === `${base}/mcp`);

const noAuth = await fetch(`${base}/mcp`, { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream" }, body: "{}" });
check("Unauthenticated /mcp returns 401 with resource_metadata", noAuth.status === 401 && /resource_metadata=/.test(noAuth.headers.get("www-authenticate") || ""));

const reg = await (await fetch(`${base}/register`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ client_name: "Smoke", redirect_uris: ["https://claude.ai/api/mcp/auth_callback"] }) })).json();
check("DCR issues client_id", typeof reg.client_id === "string");

const verifier = randomBytes(48).toString("base64url");
const challenge = createHash("sha256").update(verifier).digest("base64url");
const state = randomBytes(8).toString("hex");
const authz = new URL(`${base}/authorize`);
authz.search = new URLSearchParams({ response_type: "code", client_id: reg.client_id, redirect_uri: "https://claude.ai/api/mcp/auth_callback", code_challenge: challenge, code_challenge_method: "S256", state, scope: "bridge offline_access", resource: `${base}/mcp` }).toString();
const consentHtml = await (await fetch(authz)).text();
const txn = /name="txn" value="([^"]+)"/.exec(consentHtml)?.[1];
check("Consent page carries signed txn", !!txn);

const wrong = await fetch(`${base}/authorize`, { method: "POST", redirect: "manual", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ txn, passphrase: "nope" }) });
check("Wrong passphrase rejected", wrong.status === 401);

const right = await fetch(`${base}/authorize`, { method: "POST", redirect: "manual", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ txn, passphrase }) });
const loc = new URL(right.headers.get("location") || "http://x/");
const code = loc.searchParams.get("code");
check("Correct passphrase redirects with code + state", right.status === 302 && !!code && loc.searchParams.get("state") === state);

const badPkce = await fetch(`${base}/token`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "authorization_code", code: "not-a-real-code", code_verifier: verifier, client_id: reg.client_id, redirect_uri: "https://claude.ai/api/mcp/auth_callback" }) });
check("Unknown code -> invalid_grant", badPkce.status === 400 && (await badPkce.json()).error === "invalid_grant");

const tok = await (await fetch(`${base}/token`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "authorization_code", code, code_verifier: verifier, client_id: reg.client_id, redirect_uri: "https://claude.ai/api/mcp/auth_callback" }) })).json();
check("Token exchange returns access + refresh", typeof tok.access_token === "string" && typeof tok.refresh_token === "string");

const replay = await fetch(`${base}/token`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "authorization_code", code, code_verifier: verifier, client_id: reg.client_id }) });
check("Code replay rejected", replay.status === 400);

async function rpc(token, body) {
  const r = await fetch(`${base}/mcp`, { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream", authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
  const text = await r.text();
  try { return { status: r.status, json: JSON.parse(text) }; } catch { return { status: r.status, text }; }
}
const init = await rpc(tok.access_token, { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "smoke", version: "0" } } });
check("MCP initialize", init.status === 200 && init.json?.result?.serverInfo?.name === "creative-bridge", JSON.stringify(init.json?.result?.serverInfo));

const list = await rpc(tok.access_token, { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });
const names = (list.json?.result?.tools || []).map((t) => t.name);
check("tools/list includes envato + bridge tools", names.includes("envato_search_items") && names.includes("bridge_status"), names.join(","));

const status = await rpc(tok.access_token, { jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "bridge_status", arguments: {} } });
check("bridge_status call", status.status === 200 && /passphrase_set/.test(status.json?.result?.content?.[0]?.text || ""));

const links = await rpc(tok.access_token, { jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "envato_elements_links", arguments: { query: "bold cartoon display font", kinds: ["fonts"] } } });
check("envato_elements_links call", /elements\.envato\.com\/fonts\/bold-cartoon-display-font/.test(links.json?.result?.content?.[0]?.text || ""));

const envatoNoToken = await rpc(tok.access_token, { jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "envato_account", arguments: {} } });
check("envato_account without token explains setup (isError)", envatoNoToken.json?.result?.isError === true && /ENVATO_TOKEN/.test(envatoNoToken.json?.result?.content?.[0]?.text || ""));

const sunoOff = await rpc(tok.access_token, { jsonrpc: "2.0", id: 6, method: "tools/call", params: { name: "suno_credits", arguments: {} } });
check("suno_credits while disabled explains opt-in (isError)", sunoOff.json?.result?.isError === true && /SUNO_PROVIDER/.test(sunoOff.json?.result?.content?.[0]?.text || ""));

const refreshed = await (await fetch(`${base}/token`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: tok.refresh_token, client_id: reg.client_id }) })).json();
check("Refresh returns rotated pair", typeof refreshed.access_token === "string" && refreshed.refresh_token !== tok.refresh_token);

const stale = await fetch(`${base}/token`, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: tok.refresh_token, client_id: reg.client_id }) });
check("Old refresh token invalid after rotation", stale.status === 400 && (await stale.json()).error === "invalid_grant");

const tampered = await fetch(`${base}/mcp`, { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream", authorization: `Bearer ${tok.access_token.slice(0, -2)}xx` }, body: "{}" });
check("Tampered access token -> 401", tampered.status === 401);

const cb = await fetch(`${base}/suno/callback`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code: 200, data: { task_id: "abc123", callbackType: "complete", data: [{ id: "a1", title: "Test", audio_url: "https://x/y.mp3" }] } }) });
check("Suno callback accepted", cb.status === 200);

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
