export function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });
}

export function html(body: string, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-frame-options": "DENY",
      "referrer-policy": "no-referrer",
      ...headers,
    },
  });
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export async function readForm(req: Request): Promise<Record<string, string>> {
  const ct = req.headers.get("content-type") || "";
  const text = await req.text();
  if (ct.includes("application/json")) {
    try {
      const obj = JSON.parse(text);
      const out: Record<string, string> = {};
      for (const [k, v] of Object.entries(obj || {})) out[k] = typeof v === "string" ? v : JSON.stringify(v);
      return out;
    } catch {
      return {};
    }
  }
  const params = new URLSearchParams(text);
  const out: Record<string, string> = {};
  for (const [k, v] of params.entries()) out[k] = v;
  return out;
}
