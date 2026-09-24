# Creative Bridge — a private connector between Claude and your creative accounts

Creative Bridge is a small remote MCP (Model Context Protocol) server that runs as a Netlify Function. Once it is added to claude.ai as a custom connector, Claude can:

- search **Envato Market** (fonts, UI kits, icons, illustrations, sound effects, music, templates), read item details, list the account's purchases and generate download links;
- build direct **Envato Elements** search links (Elements has no content API, so the person opens them in their own signed-in browser);
- optionally drive a **Suno-compatible** music service for drafting songs, checking tasks, extending, WAV export, stem splitting and lyric drafts.

Access is protected by OAuth 2.1 the way claude.ai requires it: dynamic client registration, PKCE (S256), protected-resource metadata, single-use authorization codes and rotating refresh tokens. The consent page asks for a passphrase that only you know.

## What is safe to say about rights

- **Envato Market**: items bought there carry a Regular or Extended license that allows use inside one end product (the app). Keep the purchase code.
- **Envato Elements**: items must be downloaded while subscribed and registered to the specific end product in your downloads page. Keep the license certificate. Font files embedded in an app binary count as distribution; check each font's license text or convert display type to outlines.
- **Suno**: Suno has no public API (as of September 2026 it runs an invite-only partner program). Its terms grant commercial rights only to Pro/Premier subscribers for songs generated **through Suno itself**, and they prohibit automated access. Every "Suno API" on the market is a third-party wrapper. Treat adapter output as drafts and regenerate final masters in your own Suno account with the same prompt. The adapter is off unless you opt in.

## Files

```
connector/creative-bridge/
  netlify.toml                      build settings (functions only)
  netlify/functions/bridge/
    index.mts                       router: /, /health, /.well-known/*, /register, /authorize, /token, /mcp, /suno/callback
    oauth.mts                       OAuth 2.1 authorization server + bearer verification
    mcp.mts                         builds the MCP server and handles /mcp (stateless Streamable HTTP)
    envato.mts                      Envato Market tools
    suno.mts                        Suno-compatible tools and callback receiver
    pages.mts                       landing and consent pages
    store.mts                       Netlify Blobs key/value with TTL (memory fallback locally)
    crypto.mts                      HMAC tokens, PKCE helpers, constant-time compare
    env.mts                         environment reading, self-managed signing secret, status
  test/local.mts                    local HTTP shim around the function
  test/smoke.mjs                    end-to-end test of the whole OAuth + MCP flow (20 checks)
```

## Environment variables (Netlify → Site configuration → Environment variables)

| Variable | Required | Purpose |
| --- | --- | --- |
| `CONNECTOR_PASSPHRASE` | yes | Typed on the consent page when Claude connects. Choose a long phrase. |
| `ENVATO_TOKEN` | for Envato tools | Personal token from https://build.envato.com/create-token/ with: *View and search Envato sites*, *List purchases you've made*, *Download your purchased items*, *View your account profile details*. |
| `SUNO_PROVIDER` | opt-in | Set to `sunoapi` to enable the adapter. Leave unset to keep it off. |
| `SUNO_API_KEY` | opt-in | API key from the third-party provider. |
| `SUNO_API_BASE` | optional | Defaults to `https://api.sunoapi.org`. |
| `TOKEN_SECRET` | optional | Signing key for access tokens. Leave unset and the server generates one on first run and keeps it in the site's private blob store. |
| `PUBLIC_URL` | optional | Override the issuer URL if you put the site behind a custom domain. |

Never paste any of these into a chat. Set them in the Netlify UI, then trigger a redeploy (functions read them at runtime, so a redeploy is only needed the first time).

## Deploy

The site `creative-bridge-mcp` already exists in the connected Netlify account.

Option A, continuous deploys from GitHub: in Netlify open the site → *Site configuration → Build & deploy → Continuous deployment → Link repository*, pick `HandfullOfAshe/constellate-privacy`, branch `claude/app-store-game-concept-kzvywq` (or `main` after merge), and set **Base directory** to `connector/creative-bridge`.

Option B, from a terminal:

```bash
cd connector/creative-bridge
npm install
npx netlify-cli login
npx netlify-cli link --id 8c8e21fb-b54b-44be-8108-3aeaa8e6c4d4
npx netlify-cli deploy --prod
```

## Connect it to Claude

1. Open the site URL once and confirm the status list shows the passphrase as configured.
2. In claude.ai go to **Customize → Connectors**, click **+**, then **Add custom connector**.
3. Paste `https://creative-bridge-mcp.netlify.app/mcp` as the remote MCP server URL. Leave the OAuth client fields empty (the server supports dynamic registration).
4. Click **Connect**. The consent page from your server opens; enter the passphrase.
5. Start a new Claude session. The tools appear under *Creative Bridge*.

## Run the tests locally

```bash
cd connector/creative-bridge
npm install
CONNECTOR_PASSPHRASE=local-passphrase node test/local.mts &
node test/smoke.mjs
```

The smoke test walks the full flow: metadata discovery, 401 handshake, dynamic registration, PKCE, wrong and right passphrase, code exchange, code replay rejection, MCP initialize, tools/list, tool calls, refresh rotation, stale refresh rejection, tampered token rejection and the Suno callback receiver.

## Security notes

- Authorization codes live 2 minutes and are deleted on first use. Refresh tokens rotate on every use and live 30 days. Access tokens live 1 hour and are bound to this server's `/mcp` audience.
- Eight wrong passphrases from one IP lock that IP out for 15 minutes.
- The consent form is bound to a signed transaction so its parameters cannot be altered in transit.
- Loopback redirect URIs (used by Claude Code on a computer) are accepted with any port and are called out on the consent page.
- The Suno callback endpoint stores whatever the provider posts, keyed by task id, for seven days. It is unauthenticated by necessity; a forged callback can only add noise for a task id the attacker already knows.
