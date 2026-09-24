// Local HTTP shim so the Netlify function can be exercised with plain fetch.
import { createServer } from "node:http";
import handler from "../netlify/functions/bridge/index.mts";

process.env.CONNECTOR_PASSPHRASE ??= "local-passphrase";
process.env.BRIDGE_MEMORY_STORE ??= "1";

const port = Number(process.env.PORT || 8788);

createServer(async (req, res) => {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(c as Buffer);
  const body = Buffer.concat(chunks);
  const method = req.method || "GET";
  const request = new Request(`http://127.0.0.1:${port}${req.url}`, {
    method,
    headers: req.headers as Record<string, string>,
    body: method === "GET" || method === "HEAD" ? undefined : body,
  });
  const response = await handler(request, { ip: "127.0.0.1" } as any);
  const headers: Record<string, string> = {};
  response.headers.forEach((v, k) => (headers[k] = v));
  res.writeHead(response.status, headers);
  res.end(Buffer.from(await response.arrayBuffer()));
}).listen(port, () => console.log(`creative-bridge local on http://127.0.0.1:${port}`));
