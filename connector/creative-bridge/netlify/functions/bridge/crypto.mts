import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function sha256b64url(input: string): string {
  return createHash("sha256").update(input).digest("base64url");
}

export function hmac(secret: string, data: string): string {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function signJwt(secret: string, payload: Record<string, unknown>): string {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(payload));
  return `${header}.${body}.${hmac(secret, `${header}.${body}`)}`;
}

export function verifyJwt(secret: string, token: string): Record<string, any> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, b, s] = parts;
  if (!safeEqual(hmac(secret, `${h}.${b}`), s)) return null;
  try {
    const header = JSON.parse(Buffer.from(h, "base64url").toString("utf8"));
    if (header.alg !== "HS256") return null;
    const payload = JSON.parse(Buffer.from(b, "base64url").toString("utf8"));
    if (typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// Signed, expiring blob used to carry authorization parameters through the consent form.
export function signBlob(secret: string, data: Record<string, unknown>, ttlSeconds: number): string {
  const body = b64url(JSON.stringify({ ...data, exp: Math.floor(Date.now() / 1000) + ttlSeconds }));
  return `${body}.${hmac(secret, body)}`;
}

export function verifyBlob(secret: string, blob: string): Record<string, any> | null {
  const idx = blob.lastIndexOf(".");
  if (idx <= 0) return null;
  const body = blob.slice(0, idx);
  const sig = blob.slice(idx + 1);
  if (!safeEqual(hmac(secret, body), sig)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (typeof data.exp !== "number" || data.exp * 1000 < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}
