import { getStore } from "@netlify/blobs";

type Rec = Record<string, any>;

export interface KV {
  get(key: string): Promise<Rec | null>;
  set(key: string, value: Rec, ttlSeconds: number): Promise<void>;
  delete(key: string): Promise<void>;
}

const memoryStores = new Map<string, Map<string, Rec>>();

function memory(name: string): KV {
  if (!memoryStores.has(name)) memoryStores.set(name, new Map());
  const m = memoryStores.get(name) as Map<string, Rec>;
  return {
    async get(key) {
      const v = m.get(key);
      if (!v) return null;
      if (typeof v.__exp === "number" && v.__exp < Date.now()) {
        m.delete(key);
        return null;
      }
      return v;
    },
    async set(key, value, ttlSeconds) {
      m.set(key, { ...value, __exp: Date.now() + ttlSeconds * 1000 });
    },
    async delete(key) {
      m.delete(key);
    },
  };
}

function blobsAvailable(): boolean {
  return typeof (globalThis as any).Netlify !== "undefined" && !process.env.BRIDGE_MEMORY_STORE;
}

// Strongly consistent key/value store on Netlify Blobs, with an in-memory fallback for local runs.
export function kv(name: string): KV {
  const fallback = memory(name);
  if (!blobsAvailable()) return fallback;
  const store = getStore({ name: `bridge-${name}`, consistency: "strong" });
  return {
    async get(key) {
      try {
        const v = await store.get(key, { type: "json" });
        if (!v) return null;
        if (typeof v.__exp === "number" && v.__exp < Date.now()) {
          await store.delete(key);
          return null;
        }
        return v;
      } catch (err) {
        console.error(`blobs get failed for ${name}/${key}`, err);
        return fallback.get(key);
      }
    },
    async set(key, value, ttlSeconds) {
      try {
        await store.setJSON(key, { ...value, __exp: Date.now() + ttlSeconds * 1000 });
      } catch (err) {
        console.error(`blobs set failed for ${name}/${key}`, err);
        await fallback.set(key, value, ttlSeconds);
      }
    },
    async delete(key) {
      try {
        await store.delete(key);
      } catch (err) {
        console.error(`blobs delete failed for ${name}/${key}`, err);
      }
      await fallback.delete(key);
    },
  };
}
