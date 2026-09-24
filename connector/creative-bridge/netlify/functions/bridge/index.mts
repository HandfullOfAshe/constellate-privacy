import type { Config, Context } from "@netlify/functions";
import { readEnv, statusOf } from "./env.mts";
import { html, json } from "./http.mts";
import { landingPage } from "./pages.mts";
import { authServerMetadata, authenticate, handleAuthorizeGet, handleAuthorizePost, handleRegister, handleToken, protectedResourceMetadata, unauthorized } from "./oauth.mts";
import { handleMcp } from "./mcp.mts";
import { handleSunoCallback } from "./suno.mts";

export default async (req: Request, context: Context) => {
  const env = await readEnv();
  const url = new URL(req.url);
  const issuer = (env.PUBLIC_URL || url.origin).replace(/\/+$/, "");
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const ip = (context as any)?.ip || req.headers.get("x-nf-client-connection-ip") || req.headers.get("x-forwarded-for") || "unknown";
  try {
    if (path === "/") return html(landingPage(issuer, statusOf(env, issuer)));
    if (path === "/health") return json(statusOf(env, issuer));
    if (path === "/.well-known/oauth-authorization-server") return json(authServerMetadata(issuer));
    if (path === "/.well-known/oauth-protected-resource" || path === "/.well-known/oauth-protected-resource/mcp") return json(protectedResourceMetadata(issuer));
    if (path === "/register") return handleRegister(req);
    if (path === "/authorize") return req.method === "POST" ? handleAuthorizePost(req, env, String(ip)) : handleAuthorizeGet(url, env);
    if (path === "/token") return handleToken(req, env, issuer);
    if (path === "/suno/callback") return handleSunoCallback(req);
    if (path === "/mcp") {
      if (!env.PASSPHRASE || env.TOKEN_SECRET.length < 32) {
        return json({ error: "server_not_configured", error_description: "Set CONNECTOR_PASSPHRASE and a TOKEN_SECRET of at least 32 characters." }, 503);
      }
      const auth = authenticate(req, env, issuer);
      if (!auth) return unauthorized(issuer);
      return handleMcp(req, env, issuer, auth);
    }
    return json({ error: "not_found" }, 404);
  } catch (err: any) {
    console.error("bridge error", err);
    return json({ error: "server_error", error_description: String(err?.message || err) }, 500);
  }
};

export const config: Config = {
  path: ["/", "/health", "/register", "/authorize", "/token", "/mcp", "/suno/callback", "/.well-known/*"],
};
