import type { Env } from "./env.mts";
import { hmac, randomToken, safeEqual, sha256b64url, signBlob, signJwt, verifyBlob, verifyJwt } from "./crypto.mts";
import { html, json, readForm } from "./http.mts";
import { consentPage, errorPage } from "./pages.mts";
import { kv } from "./store.mts";

const CODE_TTL = 120;
const TXN_TTL = 600;
const ACCESS_TTL = 3600;
const REFRESH_TTL = 30 * 24 * 3600;
const CLIENT_TTL = 90 * 24 * 3600;
const MAX_FAILURES = 8;
const LOCKOUT_SECONDS = 15 * 60;
const SCOPE = "bridge";

export interface AuthInfo {
  token: string;
  clientId: string;
  scopes: string[];
  expiresAt?: number;
}

interface Client {
  client_id: string;
  client_name: string;
  redirect_uris: string[];
}

export function authServerMetadata(issuer: string) {
  return {
    issuer,
    authorization_endpoint: `${issuer}/authorize`,
    token_endpoint: `${issuer}/token`,
    registration_endpoint: `${issuer}/register`,
    response_types_supported: ["code"],
    response_modes_supported: ["query"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post"],
    scopes_supported: [SCOPE, "offline_access"],
    client_id_metadata_document_supported: true,
    service_documentation: `${issuer}/`,
  };
}

export function protectedResourceMetadata(issuer: string) {
  return {
    resource: `${issuer}/mcp`,
    authorization_servers: [issuer],
    scopes_supported: [SCOPE],
    bearer_methods_supported: ["header"],
    resource_name: "Creative Bridge",
    resource_documentation: `${issuer}/`,
  };
}

export function unauthorized(issuer: string, description = "A valid bearer token is required."): Response {
  return json(
    { error: "unauthorized", error_description: description },
    401,
    {
      "www-authenticate": `Bearer resource_metadata="${issuer}/.well-known/oauth-protected-resource/mcp", scope="${SCOPE}"`,
    },
  );
}

function isLoopback(u: URL): boolean {
  return u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1" || u.hostname === "[::1]");
}

function validRedirect(raw: string): boolean {
  try {
    const u = new URL(raw);
    if (u.hash) return false;
    if (u.protocol === "https:") return true;
    return isLoopback(u);
  } catch {
    return false;
  }
}

// Exact match, except loopback redirects match with any port (RFC 8252 section 7.3).
function redirectMatches(registered: string, provided: string): boolean {
  if (registered === provided) return true;
  try {
    const r = new URL(registered);
    const p = new URL(provided);
    if (!isLoopback(r) || !isLoopback(p)) return false;
    return r.hostname === p.hostname && r.pathname === p.pathname && r.search === p.search;
  } catch {
    return false;
  }
}

export async function handleRegister(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ error: "invalid_request", error_description: "POST required" }, 405);
  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_client_metadata", error_description: "Body must be JSON" }, 400);
  }
  const uris = Array.isArray(body?.redirect_uris) ? body.redirect_uris.filter((u: unknown) => typeof u === "string") : [];
  if (uris.length === 0 || uris.length > 10 || !uris.every(validRedirect)) {
    return json({ error: "invalid_redirect_uri", error_description: "redirect_uris must be https URLs or loopback http URLs" }, 400);
  }
  const clientName = typeof body.client_name === "string" ? body.client_name.slice(0, 100) : "Unnamed client";
  const client = {
    client_id: randomToken(24),
    client_name: clientName,
    redirect_uris: uris,
    token_endpoint_auth_method: "none",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    client_id_issued_at: Math.floor(Date.now() / 1000),
  };
  await kv("clients").set(client.client_id, client, CLIENT_TTL);
  return json(client, 201);
}

async function resolveClient(clientId: string): Promise<Client | null> {
  if (!clientId) return null;
  if (clientId.startsWith("https://")) {
    const cache = kv("cimd");
    const cached = await cache.get(sha256b64url(clientId));
    if (cached) return cached as Client;
    try {
      const res = await fetch(clientId, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(5000) });
      if (!res.ok) return null;
      const doc: any = await res.json();
      if (doc?.client_id !== clientId || !Array.isArray(doc.redirect_uris)) return null;
      const client: Client = {
        client_id: clientId,
        client_name: typeof doc.client_name === "string" ? doc.client_name.slice(0, 100) : new URL(clientId).hostname,
        redirect_uris: doc.redirect_uris.filter((u: unknown) => typeof u === "string"),
      };
      await cache.set(sha256b64url(clientId), client, 3600);
      return client;
    } catch {
      return null;
    }
  }
  const stored = await kv("clients").get(clientId);
  return stored ? (stored as Client) : null;
}

function redirectWithError(redirectUri: string, error: string, description: string, state: string | null): Response {
  const u = new URL(redirectUri);
  u.searchParams.set("error", error);
  u.searchParams.set("error_description", description);
  if (state) u.searchParams.set("state", state);
  return new Response(null, { status: 302, headers: { location: u.toString(), "cache-control": "no-store" } });
}

export async function handleAuthorizeGet(url: URL, env: Env): Promise<Response> {
  if (!env.PASSPHRASE || !env.TOKEN_SECRET) return html(errorPage("Not configured", "Set CONNECTOR_PASSPHRASE and TOKEN_SECRET on the server first."), 503);
  const q = url.searchParams;
  const clientId = q.get("client_id") || "";
  const redirectUri = q.get("redirect_uri") || "";
  const client = await resolveClient(clientId);
  if (!client) return html(errorPage("Unknown client", "This client is not registered with the connector."), 400);
  if (!redirectUri || !client.redirect_uris.some((r) => redirectMatches(r, redirectUri))) {
    return html(errorPage("Invalid redirect", "The redirect URI does not match the registered client."), 400);
  }
  const state = q.get("state");
  if (q.get("response_type") !== "code") return redirectWithError(redirectUri, "unsupported_response_type", "Only response_type=code is supported", state);
  const challenge = q.get("code_challenge") || "";
  if (!/^[A-Za-z0-9_-]{43}$/.test(challenge) || (q.get("code_challenge_method") || "S256") !== "S256") {
    return redirectWithError(redirectUri, "invalid_request", "PKCE S256 code_challenge is required", state);
  }
  const requestedScope = (q.get("scope") || SCOPE).split(/\s+/).filter(Boolean);
  const grantedScope = requestedScope.filter((s) => s === SCOPE || s === "offline_access");
  if (!grantedScope.includes(SCOPE)) grantedScope.unshift(SCOPE);
  const txn = signBlob(
    env.TOKEN_SECRET,
    { client_id: client.client_id, redirect_uri: redirectUri, code_challenge: challenge, state, scope: grantedScope.join(" "), resource: q.get("resource") || null },
    TXN_TTL,
  );
  const r = new URL(redirectUri);
  return html(consentPage({ txn, clientName: client.client_name, redirectHost: r.host, redirectIsLoopback: isLoopback(r), scope: grantedScope.join(" ") }));
}

async function checkRateLimit(ip: string): Promise<boolean> {
  const rec = await kv("ratelimit").get(ip);
  if (!rec) return true;
  return typeof rec.failures !== "number" || rec.failures < MAX_FAILURES;
}

async function recordFailure(ip: string): Promise<void> {
  const store = kv("ratelimit");
  const rec = (await store.get(ip)) || { failures: 0 };
  await store.set(ip, { failures: (rec.failures || 0) + 1 }, LOCKOUT_SECONDS);
}

export async function handleAuthorizePost(req: Request, env: Env, ip: string): Promise<Response> {
  if (!env.PASSPHRASE || !env.TOKEN_SECRET) return html(errorPage("Not configured", "Set CONNECTOR_PASSPHRASE and TOKEN_SECRET on the server first."), 503);
  const form = await readForm(req);
  const txn = verifyBlob(env.TOKEN_SECRET, form.txn || "");
  if (!txn) return html(errorPage("Expired request", "This authorization request expired. Start the connection again from Claude."), 400);
  const client = await resolveClient(txn.client_id);
  const r = new URL(txn.redirect_uri);
  const view = { txn: form.txn, clientName: client?.client_name || "Client", redirectHost: r.host, redirectIsLoopback: isLoopback(r), scope: txn.scope };
  if (!(await checkRateLimit(ip))) {
    return html(consentPage({ ...view, error: "Too many failed attempts. Wait 15 minutes and try again." }), 429);
  }
  if (!safeEqual(form.passphrase || "", env.PASSPHRASE)) {
    await recordFailure(ip);
    return html(consentPage({ ...view, error: "That passphrase is not correct." }), 401);
  }
  const code = randomToken(32);
  await kv("codes").set(sha256b64url(code), {
    client_id: txn.client_id,
    redirect_uri: txn.redirect_uri,
    code_challenge: txn.code_challenge,
    scope: txn.scope,
    resource: txn.resource,
  }, CODE_TTL);
  const dest = new URL(txn.redirect_uri);
  dest.searchParams.set("code", code);
  if (txn.state) dest.searchParams.set("state", txn.state);
  return new Response(null, { status: 302, headers: { location: dest.toString(), "cache-control": "no-store" } });
}

async function issueTokens(env: Env, issuer: string, clientId: string, scope: string) {
  const now = Math.floor(Date.now() / 1000);
  const accessToken = signJwt(env.TOKEN_SECRET, {
    iss: issuer,
    aud: `${issuer}/mcp`,
    sub: "owner",
    client_id: clientId,
    scope,
    iat: now,
    exp: now + ACCESS_TTL,
    jti: randomToken(12),
  });
  const refreshToken = randomToken(48);
  await kv("refresh").set(sha256b64url(refreshToken), { client_id: clientId, scope }, REFRESH_TTL);
  return { access_token: accessToken, token_type: "Bearer", expires_in: ACCESS_TTL, refresh_token: refreshToken, scope };
}

export async function handleToken(req: Request, env: Env, issuer: string): Promise<Response> {
  if (req.method !== "POST") return json({ error: "invalid_request", error_description: "POST required" }, 405);
  if (!env.PASSPHRASE || !env.TOKEN_SECRET) return json({ error: "server_error", error_description: "Server not configured" }, 503);
  const form = await readForm(req);
  const grant = form.grant_type;
  if (grant === "authorization_code") {
    const codes = kv("codes");
    const key = sha256b64url(form.code || "");
    const rec = await codes.get(key);
    if (rec) await codes.delete(key); // single use, whatever happens next
    if (!rec) return json({ error: "invalid_grant", error_description: "Unknown or expired code" }, 400);
    if (form.client_id && form.client_id !== rec.client_id) return json({ error: "invalid_grant", error_description: "client_id mismatch" }, 400);
    if (form.redirect_uri && form.redirect_uri !== rec.redirect_uri) return json({ error: "invalid_grant", error_description: "redirect_uri mismatch" }, 400);
    const verifier = form.code_verifier || "";
    if (!/^[A-Za-z0-9._~-]{43,128}$/.test(verifier) || !safeEqual(sha256b64url(verifier), rec.code_challenge)) {
      return json({ error: "invalid_grant", error_description: "PKCE verification failed" }, 400);
    }
    return json(await issueTokens(env, issuer, rec.client_id, rec.scope));
  }
  if (grant === "refresh_token") {
    const store = kv("refresh");
    const key = sha256b64url(form.refresh_token || "");
    const rec = await store.get(key);
    if (rec) await store.delete(key); // rotate: old token dies now
    if (!rec) return json({ error: "invalid_grant", error_description: "Unknown or expired refresh token" }, 400);
    if (form.client_id && form.client_id !== rec.client_id) return json({ error: "invalid_grant", error_description: "client_id mismatch" }, 400);
    return json(await issueTokens(env, issuer, rec.client_id, rec.scope));
  }
  return json({ error: "unsupported_grant_type" }, 400);
}

export function authenticate(req: Request, env: Env, issuer: string): AuthInfo | null {
  const header = req.headers.get("authorization") || "";
  const m = /^Bearer\s+(.+)$/i.exec(header);
  if (!m) return null;
  const payload = verifyJwt(env.TOKEN_SECRET, m[1].trim());
  if (!payload) return null;
  if (payload.iss !== issuer || payload.aud !== `${issuer}/mcp`) return null;
  return { token: m[1].trim(), clientId: String(payload.client_id || ""), scopes: String(payload.scope || "").split(" ").filter(Boolean), expiresAt: payload.exp };
}

export const _internal = { hmac };
