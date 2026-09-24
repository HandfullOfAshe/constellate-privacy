import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import type { Env } from "./env.mts";
import { statusOf } from "./env.mts";
import { registerEnvatoTools } from "./envato.mts";
import { registerSunoTools } from "./suno.mts";
import type { AuthInfo } from "./oauth.mts";

const INSTRUCTIONS = `Creative Bridge connects Claude to the owner's creative accounts.
Envato Market tools search and fetch fonts, UI kits, icons, illustrations, sound effects and templates, and list or download purchases. Envato Elements has no API; use envato_elements_links to hand the person direct search links.
Suno tools exist only when the owner has opted in to a third-party Suno-compatible provider. Treat their output as drafts: Suno's commercial-rights grant applies only to songs generated inside the owner's own Pro/Premier Suno account, so final masters should be regenerated there with the same prompt.`;

export function buildServer(env: Env, issuer: string): McpServer {
  const server = new McpServer({ name: "creative-bridge", version: "0.1.0" }, { instructions: INSTRUCTIONS });
  server.registerTool(
    "bridge_status",
    { title: "Bridge status", description: "Which integrations are configured on this connector (no secrets).", inputSchema: {} },
    async () => ({ content: [{ type: "text", text: JSON.stringify(statusOf(env, issuer), null, 2) }] }),
  );
  registerEnvatoTools(server, env);
  registerSunoTools(server, env, issuer);
  return server;
}

export async function handleMcp(req: Request, env: Env, issuer: string, auth: AuthInfo): Promise<Response> {
  const server = buildServer(env, issuer);
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  await server.connect(transport);
  try {
    return await transport.handleRequest(req, { authInfo: { token: auth.token, clientId: auth.clientId, scopes: auth.scopes, expiresAt: auth.expiresAt } });
  } finally {
    queueMicrotask(() => {
      transport.close().catch(() => undefined);
      server.close().catch(() => undefined);
    });
  }
}
