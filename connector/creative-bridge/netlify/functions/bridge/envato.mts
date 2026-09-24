import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Env } from "./env.mts";

const BASE = "https://api.envato.com";
const UA = "creative-bridge-mcp/0.1 (claude.ai custom connector)";
const SITES = ["themeforest.net", "codecanyon.net", "videohive.net", "audiojungle.net", "graphicriver.net", "photodune.net", "3docean.net"] as const;
const SORTS = ["relevance", "rating", "sales", "price", "date", "updated", "name", "trending", "featured_until"] as const;
const ELEMENT_KINDS = ["all-items", "fonts", "graphic-templates", "graphics", "sound-effects", "audio", "stock-video", "video-templates", "photos", "presentation-templates", "add-ons", "3d", "web-templates", "cms-templates"] as const;

export class BridgeError extends Error {}

function text(obj: unknown) {
  return { content: [{ type: "text" as const, text: typeof obj === "string" ? obj : JSON.stringify(obj, null, 2) }] };
}

function failure(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

async function envatoGet(env: Env, path: string, params: Record<string, string | number | boolean | undefined> = {}) {
  if (!env.ENVATO_TOKEN) {
    throw new BridgeError(
      "Envato is not configured. Create a personal token at https://build.envato.com/create-token/ (enable: View and search Envato sites, List purchases you have made, Download your purchased items, View your account profile details) and set ENVATO_TOKEN in the Netlify environment variables, then redeploy.",
    );
  }
  const u = new URL(BASE + path);
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") u.searchParams.set(k, String(v));
  const res = await fetch(u, {
    headers: { authorization: `Bearer ${env.ENVATO_TOKEN}`, "user-agent": UA, accept: "application/json" },
    signal: AbortSignal.timeout(9000),
  });
  if (res.status === 429) throw new BridgeError(`Envato rate limit reached. Retry after ${res.headers.get("retry-after") || "a few"} seconds.`);
  if (res.status === 401 || res.status === 403) throw new BridgeError(`Envato rejected the token (HTTP ${res.status}). Check that ENVATO_TOKEN is valid and has the needed permissions.`);
  if (!res.ok) throw new BridgeError(`Envato returned HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

function compactItem(m: any) {
  const previews = m?.previews || {};
  const preview =
    previews.icon_with_landscape_preview?.landscape_url ||
    previews.landscape_preview?.landscape_url ||
    previews.icon_with_video_preview?.landscape_url ||
    previews.icon_with_audio_preview?.mp3_url ||
    previews.icon_preview?.icon_url ||
    null;
  return {
    id: m?.id,
    name: m?.name,
    site: m?.site,
    category: m?.classification,
    url: m?.url,
    price_usd: typeof m?.price_cents === "number" ? m.price_cents / 100 : null,
    sales: m?.number_of_sales ?? null,
    rating: m?.rating?.rating ?? m?.rating ?? null,
    rating_count: m?.rating?.count ?? m?.rating_count ?? null,
    author: m?.author_username,
    updated_at: m?.updated_at,
    tags: Array.isArray(m?.tags) ? m.tags.slice(0, 12) : [],
    summary: typeof m?.summary === "string" ? m.summary.slice(0, 240) : undefined,
    preview_url: preview,
  };
}

function slug(q: string): string {
  return q.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function registerEnvatoTools(server: McpServer, env: Env) {
  server.registerTool(
    "envato_search_items",
    {
      title: "Search Envato Market",
      description:
        "Search Envato Market (ThemeForest, CodeCanyon, VideoHive, AudioJungle, GraphicRiver, PhotoDune, 3DOcean) for fonts, UI kits, icons, illustrations, sound effects, music and templates. Returns compact results with ids, prices, ratings and preview links. Requires ENVATO_TOKEN.",
      inputSchema: {
        term: z.string().min(1).max(200).describe("Search words, e.g. 'cartoon display font' or 'ios app ui kit'"),
        site: z.enum(SITES).optional().describe("Limit to one marketplace, e.g. graphicriver.net for fonts and UI kits, audiojungle.net for sound"),
        category: z.string().max(100).optional().describe("Marketplace category slug, e.g. 'fonts' or 'game-assets'"),
        page: z.number().int().min(1).max(60).optional().describe("Result page, default 1"),
        page_size: z.number().int().min(1).max(100).optional().describe("Results per page, default 20"),
        sort_by: z.enum(SORTS).optional().describe("Sort order, default relevance"),
        sort_direction: z.enum(["asc", "desc"]).optional(),
        price_min: z.number().min(0).optional().describe("Minimum price in USD"),
        price_max: z.number().min(0).optional().describe("Maximum price in USD"),
      },
    },
    async (args) => {
      try {
        const data: any = await envatoGet(env, "/v1/discovery/search/search/item", {
          term: args.term,
          site: args.site,
          category: args.category,
          page: args.page ?? 1,
          page_size: args.page_size ?? 20,
          sort_by: args.sort_by,
          sort_direction: args.sort_direction,
          price_min: args.price_min,
          price_max: args.price_max,
        });
        const matches = Array.isArray(data?.matches) ? data.matches : [];
        return text({
          total_hits: data?.total_hits ?? data?.search_results_count ?? matches.length,
          page: args.page ?? 1,
          items: matches.map(compactItem),
        });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "envato_item",
    {
      title: "Envato item details",
      description: "Full details for one Envato Market item by numeric id: description, attributes (file types, fonts included, software), price, previews and license notes.",
      inputSchema: { id: z.number().int().positive().describe("Numeric item id from envato_search_items") },
    },
    async ({ id }) => {
      try {
        const m: any = await envatoGet(env, "/v3/market/catalog/item", { id });
        return text({
          ...compactItem(m),
          description: typeof m?.description === "string" ? m.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 2500) : undefined,
          attributes: Array.isArray(m?.attributes) ? m.attributes : [],
          previews: m?.previews,
          wordpress_theme_metadata: m?.wordpress_theme_metadata,
        });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "envato_popular",
    {
      title: "Popular Envato items",
      description: "Popular items this week on one Envato marketplace, useful for spotting trends in fonts, UI kits or game assets.",
      inputSchema: { site: z.enum(["themeforest", "codecanyon", "videohive", "audiojungle", "graphicriver", "photodune", "3docean"]) },
    },
    async ({ site }) => {
      try {
        const data: any = await envatoGet(env, "/v1/market/popular:" + site + ".json");
        const popular = data?.popular || {};
        return text({
          items_last_week: (popular.items_last_week || []).slice(0, 30).map(compactItem),
          items_last_three_months: (popular.items_last_three_months || []).slice(0, 30).map(compactItem),
        });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "envato_my_purchases",
    {
      title: "My Envato purchases",
      description: "List items the connected Envato account has purchased on Envato Market, with purchase codes and license types. Envato Elements subscription downloads are not included (Elements has no API).",
      inputSchema: { include_all_purchases: z.boolean().optional().describe("Include purchases from all Envato sites, default true") },
    },
    async ({ include_all_purchases }) => {
      try {
        const data: any = await envatoGet(env, "/v3/market/buyer/list-purchases", { include_all_purchases: include_all_purchases ?? true });
        const results = Array.isArray(data?.results) ? data.results : [];
        return text({
          count: data?.count ?? results.length,
          purchases: results.map((p: any) => ({
            item: compactItem(p?.item),
            purchase_code: p?.code,
            license: p?.license,
            sold_at: p?.sold_at,
            supported_until: p?.supported_until,
          })),
        });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "envato_download",
    {
      title: "Download a purchased Envato item",
      description: "Generate a short-lived download URL for an item the account has purchased on Envato Market. Give either item_id or purchase_code.",
      inputSchema: {
        item_id: z.number().int().positive().optional(),
        purchase_code: z.string().max(64).optional(),
      },
    },
    async ({ item_id, purchase_code }) => {
      if (!item_id && !purchase_code) return failure(new BridgeError("Provide item_id or purchase_code."));
      try {
        const data: any = await envatoGet(env, "/v3/market/buyer/download", { item_id, purchase_code, shorten_url: true });
        return text({ download_url: data?.download_url ?? data?.wordpress_theme ?? data?.wordpress_plugin ?? data, note: "The link expires quickly. Open it right away." });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "envato_account",
    {
      title: "Envato account",
      description: "Basic profile of the connected Envato account (name, country, image). Confirms the token works.",
      inputSchema: {},
    },
    async () => {
      try {
        const data: any = await envatoGet(env, "/v1/market/private/user/account.json");
        const a = data?.account || data;
        return text({ firstname: a?.firstname, surname: a?.surname, country: a?.country, image: a?.image });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "envato_elements_links",
    {
      title: "Envato Elements search links",
      description:
        "Envato Elements (the subscription library) has no content API. This builds direct search links for Elements so the person can open them in their signed-in browser. Also returns the license facts that matter for shipping assets inside an app.",
      inputSchema: {
        query: z.string().min(1).max(120).describe("What to look for, e.g. 'bold cartoon display font'"),
        kinds: z.array(z.enum(ELEMENT_KINDS)).max(6).optional().describe("Elements sections to link, default all-items and fonts and graphic-templates"),
      },
    },
    async ({ query, kinds }) => {
      const s = slug(query);
      const list = kinds && kinds.length ? kinds : ["all-items", "fonts", "graphic-templates"];
      return text({
        links: list.map((k) => ({ kind: k, url: `https://elements.envato.com/${k}/${s}` })),
        license_notes: [
          "Every Elements item you use in the app must be downloaded while subscribed and registered to that specific end product (the app) in your Elements downloads; keep the license certificate PDF.",
          "Fonts: Elements fonts are licensed for use in end products, but embedding a font file inside an app binary counts as distribution; check the item's font license text and prefer converting display type to outlines or images where practical.",
          "Sound effects and music from Elements may be embedded in an app, again registered per end product; the license does not allow reselling the sound on its own.",
          "If the subscription lapses, items registered to a project before that date stay licensed for that project.",
        ],
      });
    },
  );
}
