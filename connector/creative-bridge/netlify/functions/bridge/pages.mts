import { escapeHtml } from "./http.mts";

const STYLE = `
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; background: #0f1020; color: #f4f1ff;
    font: 16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  main { max-width: 40rem; margin: 0 auto; padding: 3rem 1.25rem 4rem; }
  h1 { font-size: 2rem; line-height: 1.15; margin: 0 0 .5rem; letter-spacing: -.01em; }
  h2 { font-size: 1.1rem; margin: 2rem 0 .6rem; color: #ffb454; }
  p { margin: 0 0 1rem; }
  .eyebrow { text-transform: uppercase; letter-spacing: .12em; font-size: .75rem; color: #8fe3ff; margin-bottom: .75rem; }
  .card { background: #1a1b33; border: 1px solid rgba(255,180,84,.25); border-radius: 16px; padding: 1.25rem 1.4rem; margin: 1rem 0; }
  code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .92em; }
  code { background: #262748; padding: .1em .35em; border-radius: 6px; }
  pre { background: #262748; padding: 1rem; border-radius: 12px; overflow-x: auto; }
  ol, ul { padding-left: 1.25rem; } li { margin-bottom: .5rem; }
  .ok { color: #7ff0a5; } .bad { color: #ff7a90; }
  label { display: block; font-weight: 600; margin: 1rem 0 .4rem; }
  input[type=password] { width: 100%; font-size: 1.05rem; padding: .7rem .8rem; border-radius: 10px; border: 1px solid #3a3b66; background: #0f1020; color: #fff; }
  button { margin-top: 1.2rem; width: 100%; font-size: 1.05rem; font-weight: 700; padding: .8rem; border: 0; border-radius: 12px; background: #ffb454; color: #1a1b33; cursor: pointer; }
  .warn { background: #33200f; border-color: #ff7a90; }
  .muted { color: #b9b5d8; font-size: .9rem; }
  a { color: #8fe3ff; }
`;

function shell(title: string, body: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title><style>${STYLE}</style></head><body><main>${body}</main></body></html>`;
}

export function landingPage(issuer: string, status: Record<string, any>): string {
  const flag = (v: boolean) => (v ? '<span class="ok">configured</span>' : '<span class="bad">missing</span>');
  return shell(
    "Creative Bridge",
    `<div class="eyebrow">Remote MCP connector</div>
     <h1>Creative Bridge</h1>
     <p>A private bridge between Claude and your creative accounts. It exposes Envato Market search, item details, purchases and downloads, plus an opt-in Suno-compatible music adapter. Access is protected by a passphrase you choose.</p>
     <div class="card">
       <h2 style="margin-top:0">Status</h2>
       <ul>
         <li>Passphrase: ${flag(status.passphrase_set)}</li>
         <li>Token signing secret: ${flag(status.token_secret_set)} (${escapeHtml(String(status.token_secret_source))})</li>
         <li>Envato personal token: ${flag(status.envato_configured)}</li>
         <li>Suno adapter: ${status.suno_configured ? '<span class="ok">enabled</span>' : '<span class="muted">disabled (opt-in)</span>'}</li>
       </ul>
       <p class="muted">Connector URL to paste into Claude: <code>${escapeHtml(issuer)}/mcp</code></p>
     </div>
     <h2>Connect it to Claude</h2>
     <ol>
       <li>In claude.ai open <strong>Customize → Connectors</strong>, click <strong>+</strong>, then <strong>Add custom connector</strong>.</li>
       <li>Paste <code>${escapeHtml(issuer)}/mcp</code> as the remote MCP server URL and save.</li>
       <li>Click <strong>Connect</strong>. A consent page from this server asks for your connector passphrase.</li>
       <li>Start a new Claude session. The tools appear under “Creative Bridge”.</li>
     </ol>
     <h2>Environment variables (set in Netlify)</h2>
     <ul>
       <li><code>CONNECTOR_PASSPHRASE</code> — the passphrase typed on the consent page.</li>
       <li><code>TOKEN_SECRET</code> — optional. Leave it unset and the server generates one and keeps it in its private blob store.</li>
       <li><code>ENVATO_TOKEN</code> — personal token from build.envato.com/create-token.</li>
       <li><code>SUNO_PROVIDER=sunoapi</code> and <code>SUNO_API_KEY</code> — opt-in, see the notes below.</li>
     </ul>
     <div class="card warn">
       <h2 style="margin-top:0">About the Suno adapter</h2>
       <p>Suno has no public API. The adapter targets a third-party, Suno-compatible service. Suno's terms assign commercial rights only to Pro and Premier subscribers for music they generate through Suno itself, and they prohibit automated access. Music produced through a third party may not carry those rights. Use the adapter for drafting and previews, and generate the final masters inside your own Suno account.</p>
     </div>
     <p class="muted">Health JSON: <a href="${escapeHtml(issuer)}/health">/health</a> · OAuth metadata: <a href="${escapeHtml(issuer)}/.well-known/oauth-authorization-server">/.well-known/oauth-authorization-server</a></p>`,
  );
}

export interface ConsentView {
  txn: string;
  clientName: string;
  redirectHost: string;
  redirectIsLoopback: boolean;
  scope: string;
  error?: string;
}

export function consentPage(v: ConsentView): string {
  const warn = v.redirectIsLoopback
    ? `<p class="bad">The redirect goes to a local address on the requesting computer (<code>${escapeHtml(v.redirectHost)}</code>). Only continue if you started this connection yourself.</p>`
    : "";
  return shell(
    "Connect Creative Bridge",
    `<div class="eyebrow">Authorization request</div>
     <h1>Connect Creative Bridge</h1>
     <p><strong>${escapeHtml(v.clientName)}</strong> is asking to use this connector. After you approve, Claude will be sent back to <code>${escapeHtml(v.redirectHost)}</code>.</p>
     ${warn}
     <form method="post" action="/authorize" class="card" autocomplete="off">
       <input type="hidden" name="txn" value="${escapeHtml(v.txn)}">
       <label for="passphrase">Connector passphrase</label>
       <input id="passphrase" name="passphrase" type="password" required autofocus>
       ${v.error ? `<p class="bad" style="margin-top:.8rem">${escapeHtml(v.error)}</p>` : ""}
       <p class="muted" style="margin-top:.8rem">Scope requested: <code>${escapeHtml(v.scope)}</code></p>
       <button type="submit">Approve and connect</button>
     </form>`,
  );
}

export function errorPage(title: string, message: string): string {
  return shell(title, `<h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p>`);
}
