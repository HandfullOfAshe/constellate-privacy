import { randomToken } from "./crypto.mts";
import { kv } from "./store.mts";

export interface Env {
  PASSPHRASE: string;
  TOKEN_SECRET: string;
  TOKEN_SECRET_SOURCE: "env" | "auto" | "none";
  ENVATO_TOKEN: string;
  SUNO_PROVIDER: string;
  SUNO_API_KEY: string;
  SUNO_API_BASE: string;
  PUBLIC_URL: string;
}

function read(key: string): string {
  const netlify = (globalThis as any).Netlify;
  const fromNetlify = netlify?.env?.get?.(key);
  if (typeof fromNetlify === "string") return fromNetlify;
  return process.env[key] ?? "";
}

let autoSecret = "";

// The signing secret is either TOKEN_SECRET from the environment or a random value generated once
// and kept in the site's private blob store, so no signing key ever has to be typed anywhere.
async function ensureTokenSecret(): Promise<{ secret: string; source: "env" | "auto" | "none" }> {
  const fromEnv = read("TOKEN_SECRET");
  if (fromEnv.length >= 32) return { secret: fromEnv, source: "env" };
  if (autoSecret) return { secret: autoSecret, source: "auto" };
  const store = kv("config");
  const existing = await store.get("token-secret");
  if (existing && typeof existing.value === "string" && existing.value.length >= 32) {
    autoSecret = existing.value;
    return { secret: autoSecret, source: "auto" };
  }
  const fresh = randomToken(48);
  await store.set("token-secret", { value: fresh }, 10 * 365 * 24 * 3600);
  const confirmed = await store.get("token-secret");
  autoSecret = confirmed && typeof confirmed.value === "string" ? confirmed.value : fresh;
  return { secret: autoSecret, source: "auto" };
}

export async function readEnv(): Promise<Env> {
  const { secret, source } = await ensureTokenSecret();
  return {
    PASSPHRASE: read("CONNECTOR_PASSPHRASE"),
    TOKEN_SECRET: secret,
    TOKEN_SECRET_SOURCE: secret ? source : "none",
    ENVATO_TOKEN: read("ENVATO_TOKEN"),
    SUNO_PROVIDER: read("SUNO_PROVIDER").trim().toLowerCase(),
    SUNO_API_KEY: read("SUNO_API_KEY"),
    SUNO_API_BASE: (read("SUNO_API_BASE") || "https://api.sunoapi.org").replace(/\/+$/, ""),
    PUBLIC_URL: read("PUBLIC_URL").replace(/\/+$/, ""),
  };
}

export function sunoEnabled(env: Env): boolean {
  return env.SUNO_PROVIDER === "sunoapi" && env.SUNO_API_KEY.length > 0;
}

export function statusOf(env: Env, issuer: string) {
  return {
    ok: env.PASSPHRASE.length > 0 && env.TOKEN_SECRET.length >= 32,
    issuer,
    mcp_url: `${issuer}/mcp`,
    passphrase_set: env.PASSPHRASE.length > 0,
    token_secret_set: env.TOKEN_SECRET.length >= 32,
    token_secret_source: env.TOKEN_SECRET_SOURCE,
    envato_configured: env.ENVATO_TOKEN.length > 0,
    suno_provider: env.SUNO_PROVIDER || "disabled",
    suno_configured: sunoEnabled(env),
    suno_api_base: sunoEnabled(env) ? env.SUNO_API_BASE : null,
  };
}
