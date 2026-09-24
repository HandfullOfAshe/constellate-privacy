import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Env } from "./env.mts";
import { sunoEnabled } from "./env.mts";
import { json } from "./http.mts";
import { kv } from "./store.mts";
import { BridgeError } from "./envato.mts";

const MODELS = ["V6", "V6_WILD", "V6_MINI", "V5_5", "V5", "V4_5PLUS", "V4_5ALL", "V4_5", "V4"] as const;
const RIGHTS_NOTE =
  "Rights note: Suno has no public API. This adapter talks to a third-party, Suno-compatible service. Suno's own terms grant commercial rights only to Pro/Premier subscribers for output made through Suno itself. Treat adapter output as drafts and regenerate final masters in your own Suno account with the same prompt.";

function text(obj: unknown) {
  return { content: [{ type: "text" as const, text: typeof obj === "string" ? obj : JSON.stringify(obj, null, 2) }] };
}
function failure(err: unknown) {
  return { content: [{ type: "text" as const, text: err instanceof Error ? err.message : String(err) }], isError: true };
}

async function sunoCall(env: Env, method: "GET" | "POST", path: string, body?: unknown, query?: Record<string, string>) {
  if (!sunoEnabled(env)) throw new BridgeError("Suno adapter is disabled. Set SUNO_PROVIDER=sunoapi and SUNO_API_KEY in Netlify to opt in. " + RIGHTS_NOTE);
  const u = new URL(env.SUNO_API_BASE + path);
  for (const [k, v] of Object.entries(query || {})) u.searchParams.set(k, v);
  const res = await fetch(u, {
    method,
    headers: { authorization: `Bearer ${env.SUNO_API_KEY}`, "content-type": "application/json", accept: "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20000),
  });
  const raw = await res.text();
  let data: any;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new BridgeError(`Suno provider returned non-JSON (HTTP ${res.status}): ${raw.slice(0, 300)}`);
  }
  if (!res.ok || (typeof data?.code === "number" && data.code !== 200)) {
    throw new BridgeError(`Suno provider error (HTTP ${res.status}, code ${data?.code}): ${data?.msg || raw.slice(0, 300)}`);
  }
  return data;
}

function compactTrack(t: any) {
  return {
    audio_id: t?.id,
    title: t?.title,
    tags: t?.tags,
    duration_seconds: t?.duration,
    model: t?.model_name,
    audio_url: t?.audio_url || t?.audioUrl,
    stream_url: t?.stream_audio_url || t?.streamAudioUrl,
    image_url: t?.image_url || t?.imageUrl,
    created: t?.createTime,
  };
}

export async function handleSunoCallback(req: Request): Promise<Response> {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  const raw = await req.text();
  if (raw.length > 1_000_000) return json({ error: "too_large" }, 413);
  let body: any;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  const taskId = body?.data?.task_id || body?.data?.taskId || body?.task_id || body?.taskId;
  if (typeof taskId !== "string" || !taskId) return json({ error: "missing_task_id" }, 400);
  await kv("suno-callbacks").set(taskId.slice(0, 128), { received_at: new Date().toISOString(), payload: body }, 7 * 24 * 3600);
  return json({ ok: true });
}

export function registerSunoTools(server: McpServer, env: Env, issuer: string) {
  const callBackUrl = `${issuer}/suno/callback`;

  server.registerTool(
    "suno_credits",
    { title: "Suno adapter credits", description: "Remaining credits on the Suno-compatible provider. " + RIGHTS_NOTE, inputSchema: {} },
    async () => {
      try {
        const data = await sunoCall(env, "GET", "/api/v1/generate/credit");
        return text({ credits: data?.data });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "suno_generate",
    {
      title: "Generate a song draft",
      description:
        "Submit a song to the Suno-compatible provider and get a task_id back. Custom mode (title + style, optional lyrics) is used when style is given; otherwise simple mode uses only simple_prompt. Poll with suno_task. " + RIGHTS_NOTE,
      inputSchema: {
        title: z.string().max(80).optional(),
        style: z.string().max(1000).optional().describe("Genre, mood, instrumentation, tempo, e.g. 'bright indie pop, hand claps, 120 bpm, playful brass stabs'"),
        lyrics: z.string().max(5000).optional().describe("Lyrics with [Verse]/[Chorus] tags; leave empty with instrumental=true for music only"),
        simple_prompt: z.string().max(3000).optional().describe("Simple mode: one description, provider writes lyrics and style"),
        instrumental: z.boolean().optional().describe("Default false"),
        model: z.enum(MODELS).optional().describe("Default V5"),
        negative_tags: z.string().max(1000).optional(),
        vocal_gender: z.enum(["m", "f"]).optional(),
        style_weight: z.number().min(0).max(1).optional(),
        weirdness: z.number().min(0).max(1).optional(),
        duration_seconds: z.number().min(10).max(360).optional().describe("V5_5 and newer only"),
      },
    },
    async (a) => {
      try {
        const custom = Boolean(a.style || a.lyrics || a.title);
        if (custom && !a.style) return failure(new BridgeError("Custom mode needs a style."));
        if (!custom && !a.simple_prompt) return failure(new BridgeError("Give a style (custom mode) or a simple_prompt."));
        const body: Record<string, unknown> = {
          customMode: custom,
          instrumental: a.instrumental ?? false,
          model: a.model ?? "V5",
          callBackUrl,
        };
        if (custom) {
          body.title = a.title ?? "Untitled";
          body.style = a.style;
          if (a.lyrics && !a.instrumental) body.prompt = a.lyrics;
          if (a.negative_tags) body.negativeTags = a.negative_tags;
          if (a.vocal_gender) body.vocalGender = a.vocal_gender;
          if (a.style_weight !== undefined) body.styleWeight = a.style_weight;
          if (a.weirdness !== undefined) body.weirdnessConstraint = a.weirdness;
          if (a.duration_seconds !== undefined) body.duration = a.duration_seconds;
        } else {
          body.prompt = a.simple_prompt;
        }
        const data = await sunoCall(env, "POST", "/api/v1/generate", body);
        return text({ task_id: data?.data?.taskId, submitted: body, next: "Call suno_task with this task_id in 30-90 seconds." });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "suno_task",
    {
      title: "Check a song task",
      description: "Status and results of a generation or extend task. Merges the provider's record with any callback this server received.",
      inputSchema: { task_id: z.string().min(1).max(128) },
    },
    async ({ task_id }) => {
      try {
        const [record, callback] = await Promise.all([
          sunoCall(env, "GET", "/api/v1/generate/record-info", undefined, { taskId: task_id }).catch((e) => ({ error: String(e?.message || e) })),
          kv("suno-callbacks").get(task_id),
        ]);
        const d: any = (record as any)?.data;
        const tracks = d?.response?.sunoData || callback?.payload?.data?.data || [];
        return text({
          task_id,
          status: d?.status || (callback ? "CALLBACK_RECEIVED" : "UNKNOWN"),
          error: d?.errorMessage || (record as any)?.error || null,
          tracks: Array.isArray(tracks) ? tracks.map(compactTrack) : [],
          callback_received_at: callback?.received_at || null,
        });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "suno_extend",
    {
      title: "Extend a song",
      description: "Continue an existing track from a time point, keeping its style. Returns a new task_id to poll with suno_task.",
      inputSchema: {
        audio_id: z.string().min(1).max(128),
        task_id: z.string().max(128).optional(),
        continue_at: z.number().min(0).optional().describe("Seconds into the track to continue from"),
        style: z.string().max(1000).optional(),
        title: z.string().max(100).optional(),
        lyrics: z.string().max(5000).optional(),
        instrumental: z.boolean().optional(),
        model: z.enum(MODELS).optional(),
      },
    },
    async (a) => {
      try {
        const body: Record<string, unknown> = { audioId: a.audio_id, model: a.model ?? "V5", callBackUrl };
        if (a.task_id) body.taskId = a.task_id;
        if (a.continue_at !== undefined) body.continueAt = a.continue_at;
        if (a.style) body.style = a.style;
        if (a.title) body.title = a.title;
        if (a.lyrics) body.prompt = a.lyrics;
        if (a.instrumental !== undefined) body.instrumental = a.instrumental;
        const data = await sunoCall(env, "POST", "/api/v1/generate/extend", body);
        return text({ task_id: data?.data?.taskId });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "suno_wav",
    {
      title: "Request a WAV master",
      description: "Ask the provider for a WAV version of a finished track. Returns a wav task_id; fetch with suno_result kind=wav.",
      inputSchema: { task_id: z.string().min(1).max(128), audio_id: z.string().min(1).max(128) },
    },
    async ({ task_id, audio_id }) => {
      try {
        const data = await sunoCall(env, "POST", "/api/v1/wav/generate", { taskId: task_id, audioId: audio_id, callBackUrl });
        return text({ wav_task_id: data?.data?.taskId });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "suno_stems",
    {
      title: "Split stems",
      description: "Separate a finished track into vocal/instrumental or up to 12 stems. Returns a stems task_id; fetch with suno_result kind=stems.",
      inputSchema: {
        task_id: z.string().min(1).max(128),
        audio_id: z.string().min(1).max(128),
        type: z.enum(["separate_vocal", "split_stem"]).optional().describe("Default separate_vocal"),
      },
    },
    async ({ task_id, audio_id, type }) => {
      try {
        const data = await sunoCall(env, "POST", "/api/v1/vocal-removal/generate", { taskId: task_id, audioId: audio_id, type: type ?? "separate_vocal", callBackUrl });
        return text({ stems_task_id: data?.data?.taskId });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "suno_lyrics",
    {
      title: "Draft lyrics",
      description: "Ask the provider to draft lyrics from a short brief (max 200 characters). Returns a task_id; fetch with suno_result kind=lyrics.",
      inputSchema: { brief: z.string().min(1).max(200) },
    },
    async ({ brief }) => {
      try {
        const data = await sunoCall(env, "POST", "/api/v1/lyrics", { prompt: brief, callBackUrl });
        return text({ lyrics_task_id: data?.data?.taskId });
      } catch (err) {
        return failure(err);
      }
    },
  );

  server.registerTool(
    "suno_result",
    {
      title: "Fetch a WAV, stems or lyrics result",
      description: "Result of a wav, stems or lyrics task. Tries the provider's record endpoint and this server's callback store.",
      inputSchema: { task_id: z.string().min(1).max(128), kind: z.enum(["wav", "stems", "lyrics"]) },
    },
    async ({ task_id, kind }) => {
      const path = kind === "wav" ? "/api/v1/wav/record-info" : kind === "stems" ? "/api/v1/vocal-removal/record-info" : "/api/v1/lyrics/record-info";
      const [record, callback] = await Promise.all([
        sunoCall(env, "GET", path, undefined, { taskId: task_id }).catch((e) => ({ error: String(e?.message || e) })),
        kv("suno-callbacks").get(task_id),
      ]);
      return text({ task_id, kind, provider_record: (record as any)?.data ?? record, callback: callback?.payload?.data ?? null, callback_received_at: callback?.received_at ?? null });
    },
  );
}
