# 03 — Music system specification and production pipeline

Doorhorn (working title) treats a piece of music as the schedule, the cue and the role call for a household's morning launch and bedtime re-entry, so every second of audio is authored against a bar grid and shipped with a data map the app reads. This document fixes the tempos, bar math, section-map schema, stem model, Suno production steps, file formats, rights procedure and QA gates that the engineering and content documents build on.

Status: draft 1, 24 September 2026. Source of truth for product decisions is `concepts/tournament/WINNER.md`; where this document is more specific, it is a refinement, never a contradiction.

---

## 1. Principles

1. **Music is the schedule.** A launch has no countdown other than the music itself; the phase changes, the manifest and the door are positions in a score. The parent's Live Activity may show a countdown, but it is derived from playback position, never from the wall clock.
2. **The audio is a replaceable layer.** Lyrics, spoken scripts, section maps, character designs and code are human-authored and copyrightable; the Suno renders beneath them are not (US Copyright Office Part 2 report, 29 Jan 2025; Thaler cert denied 2 Mar 2026). Every design decision below keeps the protectable value in data and words, and makes re-rendering the audio a mechanical job.
3. **No clock on screen.** Nothing in the household-facing UI shows digits. The job ends when the song ends.
4. **The tap is the downbeat.** Every phase change, roll-call confirm and Scrub press is quantized to the next bar boundary on the audio engine's sample clock. Nothing signature ever lands between beats, and the mission log records events in bars.
5. **One asset set, many mornings.** Five launch durations and daily variation are arrangements of one stem set per flavor, never separate downloads, so a flavor costs one Suno song plus its stems and the arrangement grammar does the rest.

---

## 2. Tempo and bar math

### 2.1 Locked tempos

| Family | Tempo | Meter | Seconds per bar | Seconds per beat | Samples per bar at 48 kHz |
|---|---|---|---|---|---|
| Daytime launches (all six flavors) | 128 BPM | 4/4 | 1.875 | 0.46875 | 90,000 |
| Request Line songs | 128 BPM | 4/4 | 1.875 | 0.46875 | 90,000 |
| Re-entry descent (six segments) | 80 → 75 → 72 → 64 → 60 BPM | 4/4 | 3.000 / 3.200 / 3.333 / 3.750 / 4.000 | 0.750 / 0.800 / 0.833 / 0.9375 / 1.000 | 144,000 / 153,600 / 160,000 / 180,000 / 192,000 |
| End Credits | 96 BPM | 4/4 | 2.500 | 0.625 | 120,000 |

**Why 128 for the whole daytime family.** The launch nests the two-minute teeth song inside WAKE, so launch and Request Line must share a grid. At 128 BPM every 30 seconds is exactly 16 bars and every minute 32 bars: all five launch durations and all six Request Line lengths are whole 16-bar blocks, the teeth quadrant switches fall on phrase downbeats, and a bar is an integer 90,000 samples at 48 kHz, so trims never drift. 120 BPM was rejected because 30 seconds is then 15 bars and the 10- and 15-minute launches are not multiples of an 8-bar phrase. 128 sits inside the natural range of a quick march, disco, surf and bluegrass and is a medium swing for big band; the calm layer plays half-time feel at 6:58 a.m.

**Why 80 → 60 for Re-entry.** A descent of exactly 20 BPM ending at one beat per second (resting pulse); every step tempo divides 11,520,000 (240 × 48,000), so each segment's bar is an integer sample count and each segment a whole number of bars (section 6).

**Why 96 for End Credits.** Sixty seconds is exactly 24 bars, which splits into 2 + 4 + 12 + 4 + 2 bar slots (section 7). It is also a comfortable late-night swing tempo for Bunny's lane.

**Keys.** Launches begin in F major and modulate up a whole step to G major at the DRESS key change; the MANIFEST bridge, the DOOR chorus, the fanfare, every Gus sung line, Re-entry and the End Credits are all in G major. One house key means every runtime-assembled sung line fits every bed it can land on. Request Line songs are monolithic and may sit in any key, recorded in their map. Key is a prompt hint in Suno song generation, not a control, so it is verified in QA (section 13).

### 2.2 Launch durations as bar counts

| Launch | Bars | Phase split (bars) | Phase split (m:ss) |
|---|---|---|---|
| 8:00 | 256 | CALL 8 · WAKE 96 · DRESS 32 · MANIFEST 32 · DOOR 80 · TAG 8 | 0:15 · 3:00 · 1:00 · 1:00 · 2:30 · 0:15 |
| 10:00 | 320 | CALL 8 · WAKE 112 · DRESS 64 · MANIFEST 32 · DOOR 96 · TAG 8 | 0:15 · 3:30 · 2:00 · 1:00 · 3:00 · 0:15 |
| 12:00 | 384 | CALL 8 · WAKE 128 · DRESS 96 · MANIFEST 48 · DOOR 96 · TAG 8 | 0:15 · 4:00 · 3:00 · 1:30 · 3:00 · 0:15 |
| 15:00 | 480 | CALL 8 · WAKE 144 · DRESS 128 · MANIFEST 48 · DOOR 144 · TAG 8 | 0:15 · 4:30 · 4:00 · 1:30 · 4:30 · 0:15 |
| 20:00 | 640 | CALL 8 · WAKE 224 · DRESS 192 · MANIFEST 64 · DOOR 144 · TAG 8 | 0:15 · 7:00 · 6:00 · 2:00 · 4:30 · 0:15 |

CALL is counted inside the WAKE phase and TAG inside the DOOR phase in the section map; they are listed separately here because they are fixed-length units. T-0 is the downbeat that follows the last TAG bar. The LIFTOFF phase is the fanfare that starts at T-0 (4 bars, 7.5 s).

### 2.3 The master and the arrangement grammar

Each flavor is produced as **one master song of 208 bars (6:30)**, under Suno v6's eight-minute single-generation ceiling (secondary guide, digest: https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/suno-duration-slider-control-song-length-in-v5-5). The master's units, by source bar range:

| Unit | Bars in master | Length | Content |
|---|---|---|---|
| CALL | 1–8 | 8 | Intro; volume ramps in over these eight bars; Augustine's spoken call rides on top |
| A | 9–24 | 16 | WAKE verse 1 (sung) |
| B | 25–40 | 16 | WAKE verse 2 (sung) |
| TEETH | 41–104 | 64 | Nested teeth section, four 16-bar quadrants, cues sung in the lyrics |
| DR | 105–136 | 32 | DRESS section, the F → G key change lands on its downbeat |
| MB | 137–168 | 32 | MANIFEST bridge, instrumental in the master (sung lines are assembled at runtime); bars 137–144 are the 8-bar vamp MV |
| CH | 169–200 | 32 | DOOR chorus; the horn entry is its downbeat |
| TAG | 201–208 | 8 | Authored ending; last bar ends on T-0 |

Grammar (each symbol is a source range of the same stem set; repeats are re-reads of the same bars):

```
LAUNCH   := CALL WAKE DRESS MANIFEST DOOR TAG
WAKE     := A B TEETH (A | B | BREATH)*      # BREATH = A with layer state calm only
DRESS    := DR{1..6}
MANIFEST := MB MV{0..4}
DOOR     := CH{2..4} [CH_HALF]               # CH_HALF = bars 169–184
```

Fixed anchors that the household learns: the horn entry is always the downbeat of DOOR; the manifest bridge always begins at MANIFEST; the teeth nest always begins at bar 41. Section 3.2 gives the 12-minute bar numbers.

**Daily variation.** A seeded generator (seed = local date + household id) picks from the legal set: the order of A/B/BREATH repeats in WAKE, the DR/DOOR split (±32 bars may shift between them), layer states per repeat, one of four authored 1-bar drum fills at each join, walk-up cue slots, and the flavor (rotated, never the same two days running unless only one is unlocked). The 12-minute launch alone has more than 200 legal arrangements; across six flavors the space is in the tens of thousands. The app keeps a hash of the last 60 arrangements and re-rolls on a collision, so no launch repeats exactly inside two months.

---

## 3. The section map

Every shipped track carries a JSON map validated against `sectionmap.schema.json`. The engineering document consumes the same schema. Units are fixed: bars are 1-based integers, beats are 1–4, `ms` is integer milliseconds from track start (t = 0 is T-minus the launch duration), and `samples` are at 48,000 Hz. Anything derivable (`startMs`, `barSamples`) is still written out so the engine never recomputes with floating point.

### 3.1 Schema (`sectionmap.schema.json`)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "sectionmap.schema.json",
  "title": "Doorhorn section map",
  "type": "object",
  "required": ["schemaVersion", "mapId", "family", "flavor", "tempoBpm", "meter", "key",
               "sampleRate", "barSamples", "barMs", "durationBars", "durationMs",
               "stems", "sections", "cues", "tap"],
  "properties": {
    "schemaVersion": { "type": "string", "const": "1.0" },
    "mapId":        { "type": "string", "pattern": "^[a-z]+\\.[a-z0-9]+\\.[a-z0-9]+\\.v[0-9]+$" },
    "family":       { "enum": ["launch", "requestline", "reentry", "credits", "sting"] },
    "flavor":       { "type": "string" },
    "tempoBpm":     { "type": "number", "exclusiveMinimum": 0 },
    "meter":        { "type": "object", "properties": { "beatsPerBar": { "type": "integer" }, "beatUnit": { "type": "integer" } }, "required": ["beatsPerBar", "beatUnit"] },
    "key":          { "type": "string", "description": "Concert key of bar 1, e.g. 'F'; modulations are on sections" },
    "sampleRate":   { "type": "integer", "const": 48000 },
    "barSamples":   { "type": "integer", "description": "sampleRate * 60 * beatsPerBar / tempoBpm, must be an integer" },
    "barMs":        { "type": "number" },
    "durationBars": { "type": "integer", "minimum": 1 },
    "durationMs":   { "type": "integer" },
    "sourceMap":    { "type": "string", "description": "mapId of the master this arrangement reads from (launch arrangements only)" },
    "nest": {
      "type": "object",
      "description": "Optional substitution of a section by a Request Line song of identical bar count",
      "properties": { "sectionId": { "type": "string" }, "mapId": { "type": "string" }, "allowed": { "type": "boolean" } },
      "required": ["sectionId", "allowed"]
    },
    "stems": {
      "type": "array", "minItems": 1,
      "items": {
        "type": "object",
        "required": ["stemId", "bus", "file", "codec", "channels", "lengthBars", "preRollSamples", "tailSamples", "gainDb", "sha256"],
        "properties": {
          "stemId":   { "type": "string" },
          "bus":      { "enum": ["layerCalm", "layerMed", "layerHot", "roleDrums", "roleBass", "roleBrass", "roleChoir", "vocalLead", "vocalLine", "bed", "sting", "spoken"] },
          "role":     { "enum": ["pilot", "navigator", "cargo", "groundCrew"], "description": "Only for role buses; which crew patch punches this stem in" },
          "file":     { "type": "string" },
          "codec":    { "enum": ["pcm_s16", "alac", "aac_lc"] },
          "channels": { "enum": [1, 2] },
          "lengthBars":     { "type": "integer" },
          "preRollSamples": { "type": "integer", "description": "Samples before the bar-1 downbeat in the file (0 for stems; >0 for lines with a pickup)" },
          "tailSamples":    { "type": "integer", "description": "Samples after the last bar (reverb ring), overlapped onto whatever follows" },
          "gainDb":   { "type": "number" },
          "sha256":   { "type": "string", "pattern": "^[0-9a-f]{64}$" }
        }
      }
    },
    "sections": {
      "type": "array", "minItems": 1,
      "items": {
        "type": "object",
        "required": ["sectionId", "phase", "label", "startBar", "lengthBars", "startMs", "source", "layers"],
        "properties": {
          "sectionId": { "type": "string" },
          "phase":     { "enum": ["WAKE", "DRESS", "MANIFEST", "DOOR", "LIFTOFF", "TIDY", "TEETH", "BOOK", "LIGHTS", "CREDITS", "BODY"] },
          "label":     { "type": "string" },
          "startBar":  { "type": "integer", "minimum": 1 },
          "lengthBars":{ "type": "integer", "minimum": 1 },
          "startMs":   { "type": "integer" },
          "source":    { "type": "object", "required": ["fromBar"], "properties": { "fromBar": { "type": "integer" }, "stemSet": { "type": "string" } },
                         "description": "Bar in the stem files where this section starts reading" },
          "layers":    { "type": "object", "required": ["calm", "med", "hot"], "properties": { "calm": { "type": "boolean" }, "med": { "type": "boolean" }, "hot": { "type": "boolean" } } },
          "rolesGate": { "enum": ["silent", "asConfirmed", "all"], "default": "silent", "description": "Whether role stems may sound in this section" },
          "keyChange": { "type": "string", "description": "e.g. 'F->G' on the section downbeat" },
          "fillBefore": { "type": "boolean", "description": "A 1-bar drum fill may replace the last bar of the previous section" }
        }
      }
    },
    "cues": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["cueId", "type", "bar", "beat", "ms"],
        "properties": {
          "cueId": { "type": "string" },
          "type":  { "enum": ["phaseChange", "hornEntry", "rollCallOpen", "rollCallAuto", "manifestSlots", "holdSlot", "walkUpWindow", "quadrant", "spoken", "sting", "tZero", "buzzer", "creditSlot"] },
          "bar":   { "type": "integer" }, "beat": { "type": "integer", "minimum": 1, "maximum": 4 }, "ms": { "type": "integer" },
          "role":  { "enum": ["pilot", "navigator", "cargo", "groundCrew"] },
          "asset": { "type": "string", "description": "stemId or sting id played at this cue" },
          "text":  { "type": "string", "description": "Human-readable label shown on the Live Activity" },
          "slots": { "type": "object", "properties": { "count": { "type": "integer" }, "strideBars": { "type": "integer" }, "lineBars": { "type": "integer" } } },
          "measuredMs": { "type": "integer", "description": "Where the sung cue actually landed in the take; must be within toleranceMs of ms" },
          "toleranceMs": { "type": "integer" }
        }
      }
    },
    "tap": {
      "type": "object", "required": ["quantize", "rampMs"],
      "properties": { "quantize": { "enum": ["nextBar", "nextBeat"] }, "rampMs": { "type": "integer", "description": "Gain ramp length at a punch-in" } }
    },
    "provenance": {
      "type": "object",
      "properties": { "sunoClipIds": { "type": "array", "items": { "type": "string" } }, "model": { "type": "string" }, "generatedOn": { "type": "string", "format": "date" }, "downloadedOn": { "type": "string", "format": "date" }, "tier": { "type": "string" }, "lyricsDoc": { "type": "string" } }
    }
  }
}
```

### 3.2 Worked example: the 12-minute launch, marching-band flavor

Bar numbers are for the arrangement; `source.fromBar` points into the 208-bar master stems. Sung cue bars carry both the designed `ms` and the `measuredMs` from the take. Manifest and roll-call slots are expressed as slot specs rather than 20 separate entries.

```json
{
  "schemaVersion": "1.0",
  "mapId": "launch.march.12m.v1",
  "family": "launch",
  "flavor": "march",
  "sourceMap": "launch.march.master.v1",
  "tempoBpm": 128,
  "meter": { "beatsPerBar": 4, "beatUnit": 4 },
  "key": "F",
  "sampleRate": 48000,
  "barSamples": 90000,
  "barMs": 1875,
  "durationBars": 384,
  "durationMs": 720000,
  "nest": { "sectionId": "teeth", "mapId": "requestline.teeth.march.v1", "allowed": true },
  "stems": [
    { "stemId": "L_CALM",  "bus": "layerCalm",  "file": "launch/march/launch_march_L-CALM_208b_128_F-G_v1.caf",  "codec": "aac_lc", "channels": 2, "lengthBars": 208, "preRollSamples": 0, "tailSamples": 0, "gainDb": -1.8, "sha256": "…" },
    { "stemId": "L_MED",   "bus": "layerMed",   "file": "launch/march/launch_march_L-MED_208b_128_F-G_v1.caf",   "codec": "aac_lc", "channels": 2, "lengthBars": 208, "preRollSamples": 0, "tailSamples": 0, "gainDb": -1.8, "sha256": "…" },
    { "stemId": "L_HOT",   "bus": "layerHot",   "file": "launch/march/launch_march_L-HOT_208b_128_F-G_v1.caf",   "codec": "aac_lc", "channels": 2, "lengthBars": 208, "preRollSamples": 0, "tailSamples": 0, "gainDb": -1.8, "sha256": "…" },
    { "stemId": "R_DRUMS", "bus": "roleDrums",  "role": "pilot",      "file": "launch/march/launch_march_R-DRUMS_208b_128_F-G_v1.caf", "codec": "aac_lc", "channels": 2, "lengthBars": 208, "preRollSamples": 0, "tailSamples": 0, "gainDb": -1.8, "sha256": "…" },
    { "stemId": "R_BASS",  "bus": "roleBass",   "role": "navigator",  "file": "launch/march/launch_march_R-BASS_208b_128_F-G_v1.caf",  "codec": "aac_lc", "channels": 2, "lengthBars": 208, "preRollSamples": 0, "tailSamples": 0, "gainDb": -1.8, "sha256": "…" },
    { "stemId": "R_BRASS", "bus": "roleBrass",  "role": "cargo",      "file": "launch/march/launch_march_R-BRASS_208b_128_F-G_v1.caf", "codec": "aac_lc", "channels": 2, "lengthBars": 208, "preRollSamples": 0, "tailSamples": 0, "gainDb": -1.8, "sha256": "…" },
    { "stemId": "R_CHOIR", "bus": "roleChoir",  "role": "groundCrew", "file": "launch/march/launch_march_R-CHOIR_208b_128_F-G_v1.caf", "codec": "aac_lc", "channels": 2, "lengthBars": 208, "preRollSamples": 0, "tailSamples": 0, "gainDb": -1.8, "sha256": "…" },
    { "stemId": "V_LEAD",  "bus": "vocalLead",  "file": "launch/march/launch_march_V-LEAD_208b_128_F-G_v1.caf",  "codec": "aac_lc", "channels": 2, "lengthBars": 208, "preRollSamples": 0, "tailSamples": 0, "gainDb": -1.8, "sha256": "…" }
  ],
  "sections": [
    { "sectionId": "call",     "phase": "WAKE",     "label": "T-minus twelve",   "startBar": 1,   "lengthBars": 8,  "startMs": 0,      "source": { "fromBar": 1 },   "layers": { "calm": true,  "med": false, "hot": false }, "rolesGate": "silent" },
    { "sectionId": "wakeA",    "phase": "WAKE",     "label": "Wake",             "startBar": 9,   "lengthBars": 16, "startMs": 15000,  "source": { "fromBar": 9 },   "layers": { "calm": true,  "med": false, "hot": false }, "rolesGate": "silent" },
    { "sectionId": "wakeB",    "phase": "WAKE",     "label": "Wash",             "startBar": 25,  "lengthBars": 16, "startMs": 45000,  "source": { "fromBar": 25 },  "layers": { "calm": true,  "med": true,  "hot": false }, "rolesGate": "silent" },
    { "sectionId": "teeth",    "phase": "WAKE",     "label": "Teeth",            "startBar": 41,  "lengthBars": 64, "startMs": 75000,  "source": { "fromBar": 41 },  "layers": { "calm": true,  "med": true,  "hot": false }, "rolesGate": "silent" },
    { "sectionId": "wakeA2",   "phase": "WAKE",     "label": "Wake (reprise)",   "startBar": 105, "lengthBars": 16, "startMs": 195000, "source": { "fromBar": 9 },   "layers": { "calm": true,  "med": true,  "hot": false }, "rolesGate": "silent", "fillBefore": true },
    { "sectionId": "wakeB2",   "phase": "WAKE",     "label": "Wash (reprise)",   "startBar": 121, "lengthBars": 16, "startMs": 225000, "source": { "fromBar": 25 },  "layers": { "calm": true,  "med": true,  "hot": false }, "rolesGate": "silent" },
    { "sectionId": "dress1",   "phase": "DRESS",    "label": "Get dressed",      "startBar": 137, "lengthBars": 32, "startMs": 255000, "source": { "fromBar": 105 }, "layers": { "calm": true,  "med": true,  "hot": true  }, "rolesGate": "silent", "keyChange": "F->G", "fillBefore": true },
    { "sectionId": "dress2",   "phase": "DRESS",    "label": "Get dressed",      "startBar": 169, "lengthBars": 32, "startMs": 315000, "source": { "fromBar": 105 }, "layers": { "calm": true,  "med": true,  "hot": true  }, "rolesGate": "silent" },
    { "sectionId": "dress3",   "phase": "DRESS",    "label": "Get dressed",      "startBar": 201, "lengthBars": 32, "startMs": 375000, "source": { "fromBar": 105 }, "layers": { "calm": true,  "med": true,  "hot": true  }, "rolesGate": "silent" },
    { "sectionId": "manifest", "phase": "MANIFEST", "label": "The manifest",     "startBar": 233, "lengthBars": 32, "startMs": 435000, "source": { "fromBar": 137 }, "layers": { "calm": true,  "med": false, "hot": false }, "rolesGate": "asConfirmed", "fillBefore": true },
    { "sectionId": "manifestV","phase": "MANIFEST", "label": "Roll call",        "startBar": 265, "lengthBars": 16, "startMs": 495000, "source": { "fromBar": 137 }, "layers": { "calm": true,  "med": true,  "hot": false }, "rolesGate": "asConfirmed" },
    { "sectionId": "door1",    "phase": "DOOR",     "label": "Shoes and door",   "startBar": 281, "lengthBars": 32, "startMs": 525000, "source": { "fromBar": 169 }, "layers": { "calm": true,  "med": true,  "hot": true  }, "rolesGate": "asConfirmed", "fillBefore": true },
    { "sectionId": "door2",    "phase": "DOOR",     "label": "Shoes and door",   "startBar": 313, "lengthBars": 32, "startMs": 585000, "source": { "fromBar": 169 }, "layers": { "calm": true,  "med": true,  "hot": true  }, "rolesGate": "asConfirmed" },
    { "sectionId": "door3",    "phase": "DOOR",     "label": "Shoes and door",   "startBar": 345, "lengthBars": 32, "startMs": 645000, "source": { "fromBar": 169 }, "layers": { "calm": true,  "med": true,  "hot": true  }, "rolesGate": "asConfirmed" },
    { "sectionId": "tag",      "phase": "DOOR",     "label": "Go for launch",    "startBar": 377, "lengthBars": 8,  "startMs": 705000, "source": { "fromBar": 201 }, "layers": { "calm": true,  "med": true,  "hot": true  }, "rolesGate": "asConfirmed" },
    { "sectionId": "liftoff",  "phase": "LIFTOFF",  "label": "Liftoff",          "startBar": 385, "lengthBars": 4,  "startMs": 720000, "source": { "fromBar": 1, "stemSet": "sting.fanfare.v1" }, "layers": { "calm": false, "med": false, "hot": false }, "rolesGate": "all" }
  ],
  "cues": [
    { "cueId": "call",      "type": "spoken",       "bar": 1,   "beat": 1, "ms": 0,      "asset": "spk_augustine_tminus12", "text": "T-minus twelve. Launch window open." },
    { "cueId": "q1",        "type": "quadrant",     "bar": 41,  "beat": 1, "ms": 75000,  "text": "Top left",     "measuredMs": 75120,  "toleranceMs": 469 },
    { "cueId": "q2",        "type": "quadrant",     "bar": 57,  "beat": 1, "ms": 105000, "text": "Top right",    "measuredMs": 104910, "toleranceMs": 469 },
    { "cueId": "q3",        "type": "quadrant",     "bar": 73,  "beat": 1, "ms": 135000, "text": "Bottom left",  "measuredMs": 135260, "toleranceMs": 469 },
    { "cueId": "q4",        "type": "quadrant",     "bar": 89,  "beat": 1, "ms": 165000, "text": "Bottom right", "measuredMs": 165030, "toleranceMs": 469 },
    { "cueId": "rinse",     "type": "quadrant",     "bar": 105, "beat": 1, "ms": 195000, "text": "Spit and rinse", "measuredMs": 194880, "toleranceMs": 469 },
    { "cueId": "dress",     "type": "phaseChange",  "bar": 137, "beat": 1, "ms": 255000, "text": "Get dressed", "asset": "spk_augustine_dress" },
    { "cueId": "manifest",  "type": "phaseChange",  "bar": 233, "beat": 1, "ms": 435000, "text": "The manifest", "asset": "spk_augustine_manifest" },
    { "cueId": "rcOpen",    "type": "rollCallOpen", "bar": 233, "beat": 1, "ms": 435000, "text": "Roll call open" },
    { "cueId": "items",     "type": "manifestSlots","bar": 237, "beat": 1, "ms": 442500, "slots": { "count": 12, "strideBars": 2, "lineBars": 2 } },
    { "cueId": "hold",      "type": "holdSlot",     "bar": 261, "beat": 1, "ms": 487500, "slots": { "count": 1, "strideBars": 4, "lineBars": 4 } },
    { "cueId": "walkUp",    "type": "walkUpWindow", "bar": 233, "beat": 1, "ms": 435000, "slots": { "count": 4, "strideBars": 0, "lineBars": 2 } },
    { "cueId": "rcAuto1",   "type": "rollCallAuto", "bar": 265, "beat": 1, "ms": 495000, "role": "pilot" },
    { "cueId": "rcAuto2",   "type": "rollCallAuto", "bar": 269, "beat": 1, "ms": 502500, "role": "navigator" },
    { "cueId": "rcAuto3",   "type": "rollCallAuto", "bar": 273, "beat": 1, "ms": 510000, "role": "cargo" },
    { "cueId": "rcAuto4",   "type": "rollCallAuto", "bar": 277, "beat": 1, "ms": 517500, "role": "groundCrew" },
    { "cueId": "copy",      "type": "spoken",       "bar": 279, "beat": 1, "ms": 521250, "asset": "spk_lionel_copy", "text": "Copy." },
    { "cueId": "horns",     "type": "hornEntry",    "bar": 281, "beat": 1, "ms": 525000, "text": "Shoes and door" },
    { "cueId": "tzero",     "type": "tZero",        "bar": 385, "beat": 1, "ms": 720000, "asset": "sting.fanfare.v1", "text": "Liftoff" }
  ],
  "tap": { "quantize": "nextBar", "rampMs": 10 },
  "provenance": { "sunoClipIds": ["…"], "model": "v6", "generatedOn": "2026-10-14", "downloadedOn": "2026-10-14", "tier": "Premier", "lyricsDoc": "lyrics/launch_march_v1.md" }
}
```

Reading it: WAKE is bars 1–136 (0:00–4:15) with the teeth nest at 41–104 (1:15–3:15); DRESS is three reads of one 32-bar section (4:15–7:15) with the key change on bar 137; MANIFEST (7:15–8:45) is four bars of lead-in, twelve 2-bar item slots, a 4-bar Hold slot and a 16-bar roll-call window in which a solo household's role stems auto-punch every four bars; the horns enter on bar 281 at 8:45.000; three choruses and the tag run to T-0 at 12:00.000. Every `ms` equals `(bar − 1) × 1875`.

---

## 4. Stems and layers

### 4.1 The eight-stem model

Each launch flavor ships eight bar-trimmed stems of identical length (208 bars). They are additive: the full master mix is the sum of all eight at unity.

| Stem | Bus | Content | When it sounds |
|---|---|---|---|
| L_CALM | layerCalm | Sustained bed: pads, organ or accordion, soft strums, shaker | Always (the floor) |
| L_MED | layerMed | Comping and hand percussion: rhythm guitar or banjo, congas, claps | From WAKE verse 2 onward |
| L_HOT | layerHot | Energy bed: tambourine, piano or keys stabs, high strings or organ swells | DRESS and DOOR |
| R_DRUMS | roleDrums (Pilot) | Full kit or snare line | Silent until confirmed in the roll call |
| R_BASS | roleBass (Navigator) | Bass or sousaphone | Silent until confirmed |
| R_BRASS | roleBrass (Cargo) | Brass section; carries the horn entry | Silent until confirmed |
| R_CHOIR | roleChoir (Ground Crew) | Choir and backing vocals | Silent until confirmed |
| V_LEAD | vocalLead | The station's lead vocal: verses, teeth cues, chorus lyric | Always |

Intensity is a layer state (calm = L_CALM; medium = L_CALM + L_MED; intense = all three), not separate audio. Role stems are silent before the manifest bridge by design: the band assembles during the roll call and T-0 is the first moment everything sounds together, so L_MED and L_HOT must carry enough rhythm for the early phases to feel alive without a kit (a prompt and split requirement, checked in QA).

### 4.2 Producing the stems from Suno

1. Generate the master song (section 11) and, from the same clip, run stem separation. Suno offers three modes: **Auto Split** (up to 12 stems for 50 credits, a true separation whose stems sum back to the mix), **Split from Mix** (Pro, 10 credits per stem) and **Advanced Split** (Premier only, pick from nearly 100 instruments at 20 credits per stem, which *regenerates* the stem rather than slicing the mix) (https://help.suno.com/en/articles/12702337).
2. Use **Advanced Split** for the four role stems, since it isolates named instruments (drum kit, bass, brass section, choir) cleanly and the roll call needs them clean. Because Advanced Split regenerates rather than slices, each role stem must be checked against the master for grid alignment (section 13) and, if it drifts, replaced by the corresponding Auto Split slice.
3. Use **Auto Split** for everything else, grouping its slices into L_CALM, L_MED, L_HOT and V_LEAD as buses in Suno Studio, and removing the role instruments from those buses so nothing is doubled.
4. Export from Studio as multitrack WAV; Studio exports are WAV and, on Premier, do not count against the monthly download cap (https://help.suno.com/en/articles/8128193; https://help.suno.com/en/articles/13614785). All stems of a song are part of that song's single download when downloaded from the library (same FAQ).
5. Verify the sum: mix the eight exported stems at unity and null-test against the master export. Role stems from Advanced Split will not null; the test then checks alignment, not identity.

### 4.3 Trimming to bar boundaries

Tempo drift is normal in Suno output ("just like live music", https://help.suno.com/en/articles/8363457); the documented fix is Studio's Project Tempo → Manual BPM before exporting. After export, the bar-1 downbeat sample `S0` is located once on R_DRUMS (kick onset) and the same `S0` and length (208 × 90,000 = 18,720,000 samples) are applied to all eight stems, so they stay sample-aligned to each other (commands in section 11.4). A master whose bars drift more than ±15 ms from the grid by bar 208 after Manual BPM is regenerated; it is not time-stretched, because stretching eight stems separately introduces artefacts that are audible at punch-ins.

### 4.4 How the Stem Roll Call punches in

All eight stems run on separate `AVAudioPlayerNode`s from the same start sample for the whole arrangement, unconfirmed ones at gain 0. A confirm tap is timestamped on the engine's render clock, the next bar boundary is computed from `barSamples`, and the stem's gain ramps 0 → 1 over `tap.rampMs` (10 ms) starting on that exact sample; nothing is started at tap time, so the join is sample-exact. On AirPlay the output is delayed uniformly (up to about two seconds), so the punch-in still lands on a bar as heard, and the Live Activity follows playback position. A walk-up cue (2 bars, 3.75 s, `sting` bus) starts on the beat after the tap and the stem enters on the first bar boundary after it ends. Section repeats are `scheduleSegment` calls at bar-exact offsets into the same files; `fillBefore` swaps a section's last bar for one of four 1-bar fills on R_DRUMS if Pilot is confirmed, otherwise on L_MED.

---

## 5. The Request Line

The library: 2:00 teeth (quadrant switches every 16 bars), 1:00, 1:30, 3:00, 5:00 shower (rinse bridge at bar 145, 4:30), 10:00, each in two or three flavors, rotated so no song repeats within a week. Each is a monolithic song (no stems) with the cues sung in the lyrics: "top left", "switch", "bottom right", "spit and rinse", "lid off, stir, back in" for the microwave, "kettle's on, cup out, tea in" for the kettle.

**Getting an exact length out of Suno.** Suno's own v6 interface has no exact-length control: the v6 release notes list section editing, mashups and multi-modal inputs but no length or tempo setting (https://suno.com/release-notes/introducing-v6), and the v5.5 Duration slider workflow is described as legacy (https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/suno-duration-slider-control-song-length-in-v5-5). A third-party wrapper advertises a 10 s–6 min length field, and even there dense arrangements overrun because "Suno finishes the musical phrase it started" (https://kolbo.ai/blog/suno-v6-launch); it is not used, because commercial rights attach to permitted downloads from Suno's own service. Length is controlled by writing, not by a slider:

1. Write the lyric to the bar count: 4 lines of 2 bars per 8-bar phrase, a `[Chorus]`/`[Verse]` tag per 16-bar quadrant, and `[Outro]` then `[End]` immediately after the last cue so the model closes rather than jams (meta-tag practice: https://blakecrosley.com/guides/suno; hints are probabilistic, not commands).
2. Front-load the style prompt with "128 BPM", the genre and the instrumentation; explicit BPM numbers are more reliable than words but "Suno isn't always accurate" (https://hookgenius.app/learn/suno-tempo-bpm-guide/). Generate two takes per song (one generation yields two clips).
3. Lock Manual BPM in Studio if the take drifts, export WAV, locate the bar-1 downbeat, and trim to exactly N body bars plus one release bar: for teeth, 64 bars of body (5,760,000 samples) ending on the downbeat of bar 65, where the final "done" hit lands, then 1 bar of ring with a 200 ms fade. The map's `durationBars` is 64 and the wait ends at the downbeat of bar 65; the file is 65 bars long. The job ends when the song ends.
4. Verify: `ffprobe` sample count equals `(N + 1) × 90,000`; each sung cue's onset is within ±1 beat (469 ms) of its designed bar (measured with an onset detector or by ear against a click); the map stores `measuredMs`. A cue more than a beat late is fixed with Replace Section (Pro/Premier, 10–30 s windows, per the release notes) or the take is dropped.

If a take's sung cues land one bar late throughout, the map moves, not the audio: quadrant cues may sit at bar 17 ± 1 as long as all four agree.

---

## 6. Re-entry

Twenty minutes, 80 → 60 BPM, phase grammar reversed (TIDY, TEETH, BOOK, LIGHTS), a buzzer on the final downbeat, Bunny's late-night voice on spoken cues.

**Why segmented.** Suno "doesn't reliably support tempo changes within a single generation"; the recommended approach is to "generate sections separately at different BPMs and splice them" (https://hookgenius.app/learn/suno-tempo-bpm-guide/). Nothing in Suno's v6 release notes or help centre documents a tempo ramp. Re-entry is therefore six generations, all in G major, lullaby lane, same Persona, same style prompt with only the BPM number changed (the one-setting-at-a-time rule from https://moelueker.com/blog/suno-v6-guide):

| Segment | Phase | Tempo | Window | Bars | Seconds |
|---|---|---|---|---|---|
| RE1 | TIDY | 80 | 0:00–5:00 | 100 | 300 |
| RE2 | TEETH (bedtime teeth, quadrants of 10 bars: 8-bar verse + 2-bar cue tag) | 80 | 5:00–7:00 | 40 | 120 |
| RE3 | BOOK | 75 | 7:00–11:00 | 75 | 240 |
| RE4 | BOOK | 72 | 11:00–15:00 | 72 | 240 |
| RE5 | LIGHTS | 64 | 15:00–18:00 | 48 | 180 |
| RE6 | LIGHTS | 60 | 18:00–20:00 | 30 | 120 |
| buzzer | — | — | 20:00.000 | — | 1.5 s one-shot |

Every segment is a whole number of bars at its tempo, so the total is 365 bars and exactly 1,200.000 s. Each segment file is its body bars plus a 2,000 ms tail (`tailSamples` = 96,000). Joins are not equal-power crossfades, which smear two tempos: the engine starts segment N+1 on the exact sample where segment N's body ends and lets N's tail ring over N+1's first bar. Each segment is written to open on a downbeat chord in the same lead instrument, so the tempo step reads as the music settling, not as an edit. The last bar of RE6 is cut hard at 20:00.000 (no fade) and the buzzer one-shot (Sounds mode, key G, 60 BPM) fires on that sample; two seconds of silence follow before End Credits. Each segment is loudness-matched to the same target and then attenuated by a fixed −1 dB per step (RE1 at target, RE6 at −5 dB) so the house gets quieter as it slows.

---

## 7. End Credits

Sixty seconds at 96 BPM in G major: a template bed of 24 bars, a modular bank of sung lines in Bunny's lane, assembled at runtime from the day's real manifest and scrub log. Billing order is computed from carried load, delivered as a joke, never a number.

**Slot plan (24 bars).** Intro 2 bars (bed only, sung sting "tonight's launch was brought to you by"); top billing 4 bars (role line 2 + carried-item line 2); three further billings at 4 bars each (12); guest star and joke line 4 bars; outro 2 bars ("splashdown confirmed"). Names are never sung; a billing line names the role ("the Navigator, who remembered the photo money") and the card shows the household name in text.

**The line bank.** Three banks, all generated in Bunny's lane at 96 BPM in G with identical style prompts: role billing lines (4 roles × 3 phrasings × 2 positions), manifest item lines (the same vocabulary as Gus's morning bank, ~150 items plus "and one more thing, it's on the list" for items outside the bank), and joke lines (~40, written by the developer). Each bank is produced as list songs: a lyric of items one per 2-bar phrase, `[Verse]` tags every 8 bars, one download per song, then the Auto Split vocal stem is sliced by bar into per-line files with `preRollSamples` covering any pickup and a half-bar `tailSamples`. Lines that land more than a beat off their bar are discarded, not stretched.

**Runtime assembly rules.** Bed and lines are on different buses; the bed is continuous. A line is scheduled at `slotStart − preRollSamples` and gated by a 20 ms equal-power fade at both ends on the `vocalLine` bus; two lines never overlap by more than their tails. Every line is normalized to the same short-term loudness (section 10) so the bed sits at a fixed −6 dB under the vocal bus. If the manifest has fewer than four billable roles, empty billing slots are filled with 4-bar instrumental reads of the bed (source bars 7–10). The same key, tempo and bar length across bank and bed is the entire assembly contract; a line in the wrong key fails QA and is never shipped.

Gus's morning manifest bank follows the same rules at 128 BPM in G (lines of 2 bars, Hold lines of 4 bars including "day N, still on the manifest" for N = 1–30) and is the only runtime-assembled vocal inside a launch.

---

## 8. Character genre lanes

Each character owns a lane, not a voice (WINNER.md): Augustine Pell, brass and snare; Gus Marchetti, warm baritone folk; Dr. Farrago, theremin-flecked lounge; Bunny Kowalczyk, late-night jazz; Scrub, kazoo and toy piano; Lionel Abara says "copy" over whatever is playing.

Lanes beat voice locks because of how Suno's continuity tools behave. A Persona "recalls the identity of a Suno song" and may keep "vocal character and general delivery, genre and stylistic tendencies, instrumentation and sonic palette", but "a Persona does not lock" one exact singer or timbre, and "new lyrics, vocal demands, active controls and model behaviour can create drift" (https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/suno-personas-keep-the-same-voice-across-songs, rebuilt 1 Aug 2026). Voices are built around an authorized recording and the Terms allow a Voice Model of your own voice only (https://suno.com/terms-of-service), so no character can be voice-locked except by the developer singing it. A lane is a written spec (instrumentation, register, tempo, key, delivery notes) that any model, Persona or human musician can render, so drift reads as the same band on a different day, and a model retirement (Suno retires prior models when new ones launch: https://suno.com/blog/suno-updates-tos) orphans nothing. Each lane gets one Persona per model line as a convenience; the spec is the contract. Spoken cues (Augustine's calls, Lionel's "copy", Bunny's phase cues) are not generated with Suno: a human voice actor records them, which is cheaper, exact to the millisecond, and adds a human-authored layer to every launch.

Lane prompts contain genre, instrumentation, mood, tempo and key only. No artist names, no song titles, no "in the style of", no show names.

---

## 9. Stings and micro sounds

| Asset | Length | Source | Notes |
|---|---|---|---|
| Station ID | 30 s | Song generation, 128 BPM, G | The AlarmKit alarm sound (about 30 s cap, WINNER.md); brass and snare lane |
| Liftoff fanfare | 4 bars, 7.5 s + 1.5 s tail | Instrumental song generation, 128 BPM, G | Plays at T-0 on top of all layers; the one asset every launch shares |
| Scrub klaxon | 2.5 s | Sounds one-shot | Kazoo and toy piano lane; followed by Scrub's spoken "weather" |
| Hold cleared (victory sting) | 2 bars, 3.75 s | Sounds one-shot or 2-bar song | G major |
| Re-entry buzzer | 1.5 s | Sounds one-shot, 60 BPM, G | Hard cut before it, silence after |
| Walk-up cues | 2 bars each, 3.75 s | 8 short instrumental songs (mariachi, surf, marching band, and five more lanes) | Household picks one per member |
| Roll-call confirm tick, phase whoosh, manifest ding, Scrub button, patch tap, card flip, clothesline peg, plus four more | 0.2–1.0 s each | Sounds one-shots, 12 total | Delivered as a "sting reel": several one-shots separated by silence in one clip, then sliced |

Sounds mode creates One Shot samples and seamless Loops with a chosen key and tempo and requires Pro or Premier (https://suno.com/release-notes/make-loops-and-samples-from-scratch-with-sounds). Whether Sounds output is counted under the download caps is not stated in Suno's primary documents (digest open item); the budget in section 10.4 counts every Sounds clip as a download to be safe, which is why micro sounds are batched into reels. Quiet mode plays spoken cues and stings only, at the same loudness targets; it is never a silent session.

---

## 10. Loudness and format

### 10.1 Targets

| Class | Integrated loudness | True peak | Notes |
|---|---|---|---|
| Launch full sum (all eight stems at map gain), Request Line songs, Re-entry RE1, End Credits bed + lines | −16 LUFS ± 0.5 LU | ≤ −1.0 dBTP | Apple's Sound Check normalizes to about −16 LUFS and Apple Digital Masters guidance keeps true peak under −1 dBTP (https://mastering.to/apple-music; https://www.masteringbox.com/learn/mastering-for-streaming) |
| Re-entry RE2–RE6 | −17, −18, −19, −20, −21 LUFS | ≤ −1.0 dBTP | Fixed −1 dB per step |
| Spoken cues and sung line files | −18 LUFS short-term | ≤ −1.0 dBTP | Lines sit 2 LU under the bed sum; cues read over it |
| Stings (fanfare, klaxon, buzzer) | −14 LUFS momentary max | ≤ −1.0 dBTP | 2 LU above the bed, by design |
| Micro sounds | −20 LUFS momentary | ≤ −3.0 dBTP | Never compete with music |

Stems are never normalized individually. The eight-stem sum is measured, one gain is computed, and that same gain is written into every stem's `gainDb` and baked into the files, so the sum lands on target and relative balance is untouched. If the sum's true peak would exceed −1 dBTP at target, the target for that flavor drops, and then every other flavor is matched to the lowest, so flavors always level-match within ±0.5 LU.

### 10.2 Sample rate, bit depth, containers

Everything ships at 48 kHz (integer bars at 128, 96, 80, 75, 72, 64 and 60 BPM; matches iOS hardware rates). Masters are kept at 24-bit WAV. Shipped files are CAF containers (WINNER.md: "stems ship as bar-trimmed CAF") with one of three payloads:

| Payload | Used for | Why |
|---|---|---|
| 16-bit PCM | Fanfare, buzzer, klaxon, ticks, walk-up cues, roll-call fills | Loop- and join-critical, short; gapless by construction (AVAudioPlayer loops WAV seamlessly; AAC carries priming and remainder frames that gap unless trimmed at a lower level, Apple QA1636: https://developer.apple.com/library/archive/qa/qa1636/_index.html) |
| ALAC | Any long asset that fails the decoded-length gate below | Lossless, no priming frames, ~55–60 % of PCM |
| AAC-LC 160 kbps stereo (128 kbps for role stems) | Launch stems, Request Line songs, Re-entry segments, End Credits bed, line banks, spoken cues | Size; all joins are made by the engine at sample offsets into decoded PCM, so the codec never sees a loop point |

The AAC choice rests on one engineering gate (section 13): the decoded frame count reported by `AVAudioFile.length` must equal `lengthBars × barSamples + preRoll + tail` exactly for every asset. If any asset class fails, that class ships as ALAC.

### 10.3 Size math

| Asset class | Audio seconds | PCM 16/48 stereo | ALAC (est. 58 %) | Chosen |
|---|---|---|---|---|
| One launch flavor: 8 stems × 390 s | 3,120 | 599 MB | 347 MB | 4 layer/vocal stems at 160 kbps = 31 MB; 4 role stems at 128 kbps = 25 MB; **56 MB** |
| Six flavors | 18,720 | 3.6 GB | 2.1 GB | **336 MB** |
| Request Line, 24 songs (51.5 min) | 3,090 | 593 MB | 344 MB | 160 kbps: **62 MB** |
| Re-entry, 6 segments + tails | 1,212 | 233 MB | 135 MB | 160 kbps: **24 MB** |
| End Credits bed + three banks (~300 lines, ~4 s each) | 1,260 | 242 MB | 140 MB | 96 kbps mono: **15 MB** |
| Gus morning bank (~200 lines) | 750 | 144 MB | 84 MB | 96 kbps mono: **9 MB** |
| Spoken cues (~120 × 3 s) | 360 | 69 MB | 40 MB | 64 kbps mono: **3 MB** |
| PCM stings and micro sounds (~30 assets) | 90 | 17 MB | — | PCM: **17 MB** |
| **Whole set** | | **5.5 GB** | **3.2 GB** | **≈ 466 MB** |

The free bundle (one flavor, three Request Line songs, one Re-entry, the banks, all stings) is about 130 MB and stays under the App Store's 200 MB cellular auto-download threshold; the remaining five flavors and the rest of the Request Line ship as On-Demand Resources fetched at unlock. Runtime memory stays small because stems stream from file through `scheduleSegment`; nothing is decoded whole into RAM.

### 10.4 Download budget on Suno

Commercial rights attach to a *permitted download* on a paid tier; one song is one download regardless of format or stems; Pro allows 20 a month, Premier 60, and Studio downloads on Premier are unlimited (https://suno.com/terms-of-service; https://help.suno.com/en/articles/13614785; https://help.suno.com/en/articles/13876865; https://suno.com/blog/suno-updates-tos). Extras cost about $2.99 each (https://roo.beehiiv.com/p/suno-download-prices-explained). Because the "permitted download" wording is untested against Studio's unlimited exports, every shipped song is downloaded once through the library so its status is unambiguous; Studio exports supply stems and WAV.

| Item | Beta (v1 scope) | Launch |
|---|---|---|
| Launch masters incl. covers, with one retake each | 4 (2 flavors) | 12 (6 flavors) |
| Request Line songs, two takes kept per song | 6 (3 songs) | 32 (24 songs + retakes) |
| Re-entry segments + retakes | 8 | 8 |
| End Credits bed + line-bank list songs | 5 | 17 |
| Gus manifest bank list songs | 4 | 8 |
| Stings, reels, station ID, fanfare, walk-up cues | 8 | 12 |
| Test Fire demo, lounge track, Flight Review bed, seasonal | 2 | 8 |
| Reserve | 8 | 13 |
| **Total downloads** | **45** | **110** |

That is one Premier month for beta and two for launch (60 each), consistent with WINNER.md, with Studio covering all stem and WAV exports. Every download is logged (section 12).

---

## 11. The production pipeline

### 11.1 Account, model, settings

1. **Tier: Premier.** Only Premier has Studio (WAV export, unlimited Studio downloads, Manual BPM), Advanced Split and 60 downloads a month; Pro has no Studio and 20 downloads (https://suno.com/pricing, fetched 24 Sept 2026; it rendered $24/month while secondary sources say $30 monthly, $24 annual; confirm at checkout). Nothing for the app is ever generated on the free tier: free output is non-commercial and cannot be licensed retroactively (https://help.suno.com/en/articles/2425729).
2. **Model: v6 (flagship).** v6 and v6-wild are paid-only; v6-mini is the free model (https://suno.com/release-notes/introducing-v6). v6-wild is excluded as "less predictable"; v6-mini is the free-tier model. v6 is the line Suno describes as trained on licensed partner content (https://www.digitalmusicnews.com/2026/09/22/suno-comments-umg-sony-lawsuit/), which matters for section 12.
3. **Project settings.** Custom Mode; style prompt under 1,000 characters, front-loaded with genre, vocal type, mood, instruments and the BPM number; lyrics under 5,000 characters with bracketed section tags, about 3,000 being the quality sweet spot (https://hookgenius.app/learn/suno-character-limits/). Instrumental beds: Instrumental toggle on, `[Instrumental]` in the lyrics box, "vocals" in Exclude (https://blakecrosley.com/guides/suno). Weirdness low, Style Influence high; change one setting at a time with identical lyrics; no Max Mode except to finalize a take, since it doubles credit cost (https://moelueker.com/blog/suno-v6-guide).
4. **Personas.** One Persona per lane, created from the first approved song in that lane; used as continuity, not identity (section 8). No Voices except, optionally, the developer's own.
5. **Never:** artist names, song titles, "in the style of", Remix (Remixes are joint works restricted to non-commercial use regardless of tier, https://suno.com/terms-of-service), uploads of anyone else's audio, or third-party API wrappers (there is no public API: https://www.musicbusinessworldwide.com/suno-explores-developer-api-seeking-apps-that-unlock-experiences-generative-music-makes-possible-for-the-first-time/).

### 11.2 One melody, six flavors

1. Write the launch lyric and section plan (208 bars, section 2.3) and generate the marching-band master at 128 BPM in F with the DRESS modulation to G written into the lyric tags (`[Verse: key change up]`). Keep the best of two clips; if the structure is off by a section, use Replace Section (10–30 s) or regenerate.
2. **Covers** render the other five flavors: Covers keep "the melody and adapt the track to a different style", accept a fully produced track as source, and cost 10 credits after the complimentary allowance; Suno notes a cover "might return the original clip without adapting it" in some cases (https://suno.com/blog/covers, 12 Sept 2024; Covers is available to Pro and Premier). For each cover the style prompt is the new lane plus "128 BPM, F major modulating to G". Each cover is a new song and one download.
3. Verify each cover's tempo (Manual BPM in Studio, then onset check), key (extract MIDI from the bass stem, 10 credits, https://help.suno.com/en/articles/8128193, or a key detector), the modulation bar, and the section lengths. A cover that lost the modulation or drifted a section is regenerated; it is not conformed by pitch-shifting.
4. Split (section 4.2), bus in Studio, export multitrack WAV, and download the song once from the library.

### 11.3 File naming and folder layout

`{family}_{flavor}_{asset}_{bars}b_{bpm}_{key}_v{n}.{ext}` — for example `launch_march_R-BRASS_208b_128_F-G_v1.caf`, `requestline_teeth_surf_64b_128_D_v2.caf`, `reentry_lullaby_RE3_75b_75_G_v1.caf`, `credits_bunny_line-item-lunchbox_2b_96_G_v1.caf`, `sting_fanfare_4b_128_G_v1.caf`. Bars are body bars; pre-roll and tail are in the map, not the name. Versions increment on any re-render; a map references files by exact name and hash.

```
concepts/doorhorn/suno-library/          # repository folder; audio itself lives in the off-repo archive
  originals/YYYY-MM-DD_{clipId}_{title}.{mp3,wav}   # unmodified downloads, never edited
  prompts/YYYY-MM-DD_{clipId}.md                     # style prompt, lyrics, model, settings, Persona, credits spent
  receipts/                                          # subscription receipts, plan page PDFs, download log CSV
  lyrics/                                            # the registered literary collection, versioned
  masters/{family}/{flavor}/                          # bar-trimmed 24-bit WAV after 11.7
  dist/{family}/{flavor}/                             # CAF as shipped
  maps/*.json                                        # section maps, validated against sectionmap.schema.json
  manifest.sha256                                    # hashes and sizes of everything in dist and maps
```

### 11.4 ffmpeg: trim to bar boundaries (sample-accurate)

`S0` is the bar-1 downbeat sample found on R_DRUMS; apply the same values to every stem of the flavor.

```bash
S0=71233                     # bar-1 downbeat, measured once on the drum stem
BARS=208; BAR_SAMPLES=90000
LEN=$((BARS * BAR_SAMPLES))  # 18,720,000 samples
for stem in L-CALM L-MED L-HOT R-DRUMS R-BASS R-BRASS R-CHOIR V-LEAD; do
  ffmpeg -y -i "studio/march_${stem}.wav" \
    -af "atrim=start_sample=${S0}:end_sample=$((S0 + LEN)),asetpts=N/SR/TB" \
    -ar 48000 -c:a pcm_s24le "masters/launch/march/launch_march_${stem}_208b_128_F-G_v1.wav"
done
```

Monolithic songs use the same command with `LEN = (N + 1) × BAR_SAMPLES` and a 200 ms fade on the last bar (`afade=t=out:st=<seconds>:d=0.2`). Line-bank slices use `start_sample = downbeat − preRollSamples`.

### 11.5 ffmpeg: loudness normalization

Stem sets: measure the sum, apply one gain to all.

```bash
cd masters/launch/march
ffmpeg -i launch_march_L-CALM_208b_128_F-G_v1.wav -i launch_march_L-MED_208b_128_F-G_v1.wav \
       -i launch_march_L-HOT_208b_128_F-G_v1.wav -i launch_march_R-DRUMS_208b_128_F-G_v1.wav \
       -i launch_march_R-BASS_208b_128_F-G_v1.wav -i launch_march_R-BRASS_208b_128_F-G_v1.wav \
       -i launch_march_R-CHOIR_208b_128_F-G_v1.wav -i launch_march_V-LEAD_208b_128_F-G_v1.wav \
       -filter_complex "amix=inputs=8:normalize=0,ebur128=peak=true:framelog=verbose" -f null - 2>&1 \
       | grep -E "I:|Peak:" | tail -2
# Suppose I = -14.2 LUFS and true peak = -0.4 dBTP.
# gain = min(-16 - I, -1 - TP) = min(-1.8, -0.6) = -1.8 dB  -> write -1.8 into every stem's gainDb
GAIN=-1.8
for f in launch_march_*_v1.wav; do
  ffmpeg -y -i "$f" -af "volume=${GAIN}dB" -c:a pcm_s24le "norm_$f"
done
```

Monolithic files use two-pass `loudnorm` with a true-peak ceiling; note `-ar 48000` on the second pass, because `loudnorm` upsamples internally and would otherwise emit 192 kHz.

```bash
ffmpeg -i in.wav -af "loudnorm=I=-16:TP=-1:LRA=11:print_format=json" -f null - 2> pass1.json
# read measured_I, measured_TP, measured_LRA, measured_thresh, target_offset from pass1.json, then:
ffmpeg -y -i in.wav -af "loudnorm=I=-16:TP=-1:LRA=11:measured_I=-13.9:measured_TP=-0.2:measured_LRA=6.1:measured_thresh=-24.3:offset=0.1:linear=true:print_format=summary" \
       -ar 48000 -c:a pcm_s24le out.wav
```

### 11.6 ffmpeg: true-peak limiting

Only stings and monolithic songs are limited (stems are gain-matched instead, so their sum is not recompressed). True peak is controlled by oversampling around a lookahead limiter, then verified.

```bash
ffmpeg -y -i norm.wav -af "aresample=192000,alimiter=limit=0.891:attack=5:release=60:level=false,aresample=48000" -c:a pcm_s24le limited.wav
ffmpeg -i limited.wav -af "ebur128=peak=true" -f null - 2>&1 | grep -E "I:|Peak:" | tail -2   # expect TP <= -1.0 dBTP
```

### 11.7 Converting to CAF

```bash
# 16-bit PCM in CAF (stings, fills, buzzer), triangular dither from 24-bit
ffmpeg -y -i limited.wav -af "aresample=osf=s16:dither_method=triangular_hp" -c:a pcm_s16le -f caf dist/sting/sting_fanfare_4b_128_G_v1.caf
# ALAC in CAF (fallback class)
ffmpeg -y -i norm_stem.wav -c:a alac -f caf dist/launch/march/launch_march_R-BASS_208b_128_F-G_v1.caf
# AAC-LC in CAF with Apple's encoder (preferred for AAC; writes correct priming/remainder metadata)
afconvert -f caff -d aac -b 160000 -q 127 norm_stem.wav dist/launch/march/launch_march_L-CALM_208b_128_F-G_v1.caf
```

### 11.8 Verifying seamless joins

Length gate, then a join test that plays the file into itself and compares the largest sample-to-sample jump at the join with the largest jump anywhere in the file.

```bash
N=$((208 * 90000))
ffprobe -v error -select_streams a -show_entries stream=duration_ts,sample_rate -of csv=p=0 dist/launch/march/launch_march_L-CALM_208b_128_F-G_v1.caf   # expect 18720000,48000
ffmpeg -i loop.caf -i loop.caf -filter_complex \
  "[0][1]concat=n=2:v=0:a=1,atrim=start_sample=$((N-480)):end_sample=$((N+480)),astats=measure_perchannel=none:measure_overall=Max_difference" -f null - 2>&1 | grep "Max difference"
ffmpeg -i loop.caf -af "astats=measure_perchannel=none:measure_overall=Max_difference" -f null - 2>&1 | grep "Max difference"
# Pass: the join-window value is no larger than the whole-file value.
```

### 11.9 Checksum manifest

```bash
cd concepts/doorhorn/suno-library
find dist maps -type f \( -name '*.caf' -o -name '*.json' \) | LC_ALL=C sort | while read -r f; do
  printf '%s  %s  %s\n' "$(shasum -a 256 "$f" | cut -d' ' -f1)" "$(stat -f%z "$f")" "$f"
done > manifest.sha256
jq -Rn '[inputs | split("  ") | {sha256: .[0], bytes: (.[1]|tonumber), path: .[2]}]' manifest.sha256 > manifest.json
```

The hash of each file is copied into its map's `stems[].sha256`; the app refuses to load a stem whose hash does not match its map.

---

## 12. Rights and records procedure

**Before generating.** Subscribe to Premier and save, with dates: the checkout receipt, the plan page as PDF, and the Terms of Service in force (effective 3 Sept 2026, last revised 10 Aug 2026: https://suno.com/terms-of-service). The controlling grant is that for Pro and Premier subscribers Suno "assigns to you all of its right, title and interest in and to any Output", and commercial exploitation requires "a permitted download of that Output" under the tier's download allocation (same source). Rights persist after the subscription ends; the test is whether you were subscribed when the song was made and downloaded (https://help.suno.com/en/articles/2416769; https://help.suno.com/en/articles/9601665).

**During.** One prompt log per clip (`prompts/`): date, model (v6), style prompt, lyrics, settings, Persona, credits spent, clip id, which take was kept. No artist names, song titles or "in the style of"; no Remix; no uploaded third-party audio; no Voice Model of anyone but the developer (https://suno.com/terms-of-service). The download log (`receipts/downloads.csv`) records every library download with date, clip id, tier and the monthly counter, so the "permitted download" status of every shipped song is provable.

**After.** Keep unmodified originals exactly as downloaded, hashed, beside the CAF derivatives; never "remove, alter, obscure or circumvent any fingerprint, watermark or metadata Suno appends" (https://suno.com/terms-of-service). Trimming and loudness work on Studio WAV exports and are ordinary post-production, not watermark removal; if Suno's fingerprint is later documented as fragile to processing, revisit. Archive `originals/`, `prompts/`, `receipts/`, `lyrics/` and `maps/` off-platform (encrypted drive plus a second copy): Suno changed terms once in 2026 and suffered a large data breach (https://www.musicbusinessworldwide.com/suno-hit-with-class-action-lawsuit-over-data-breach-reportedly-affecting-55m-users/).

**Registration.** Every lyric and script is written by the developer and registered with the US Copyright Office as an unpublished literary collection, with the section maps and character bible deposited as part of the same collection where the Office permits; the audio is excluded from the claim. Purely AI-generated audio is not copyrightable (Copyright Office Part 2, 29 Jan 2025: https://copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf; Thaler cert denied 2 Mar 2026: https://www.scotusblog.com/cases/thaler-v-perlmutter/), and Suno itself says lyrics you wrote are yours and may be registered separately (https://help.suno.com/en/articles/2746945).

**Human re-recording, year one.** The station ID, the liftoff fanfare and the launch melody (the 208-bar master's lead line and chord chart, exported as MIDI from Studio and notated) are re-recorded with a human musician before the first anniversary, under a written work-for-hire or assignment, so the brand owns at least one defensible audio asset. The section maps make the swap a file replacement.

**App Review notes and disclosure.** Apple has no rule on AI-generated bundled audio; 5.2.1 and 5.2.2 require holding the rights and complying with the third party's terms, with authorization "provided upon request" (https://developer.apple.com/app-store/review/guidelines/). The notes state: "All lyrics and scripts are original works by the developer. Music was produced with Suno under a Premier subscription with commercial rights; receipts, download logs and prompt logs are available on request." The About screen carries, verbatim: **"Every line written by a person. Songs produced with Suno from those lyrics."** Attribution is not required on paid plans (https://help.suno.com/en/articles/2410177), and Suno reserves the right to identify Output as AI-generated (https://suno.com/terms-of-service); the disclosure is consistent with both.

**Contingency: a Suno model or service is withdrawn.** Downloaded outputs keep their contractual grant, so a retirement alone pulls nothing. The live risks are litigation: Sony and UMG's second suit (18–19 Sept 2026, D. Mass., up to $9B over 60,202 recordings, arguing v6 is "fruit of the poisoned tree": https://www.engadget.com/2262978/sony-music-and-udio-say-sunos-new-models-still-violates-their-copyright.html) and the Munich GEMA judgment (31 July 2026, not final: https://www.twobirds.com/en/insights/2026/germany/munich-district-court-rules-on-ai-generated-music-gema-v-suno). The plan: (1) maps, lyrics and lane specs are provider-neutral, so a full re-render (12 launch songs, 24 Request Line songs, 6 Re-entry segments, the banks) is about three weeks on any licensed provider or with session musicians; (2) the human-recorded station ID, fanfare and melody are the fallback identity; (3) a point update swaps the audio bundle without touching maps or code; (4) if an injunction ever reached distributed outputs, the app ships the human-recorded assets and a reduced library while the rest is re-rendered. Territory availability is reviewed if the GEMA ruling is upheld.

---

## 13. QA checklist

| Check | Method | Pass |
|---|---|---|
| Decoded length gate | `AVAudioFile.length` and `ffprobe duration_ts` on every asset | Equals `lengthBars × barSamples + preRoll + tail` exactly, every file |
| Gapless section reads | Play a 12-minute arrangement with all section repeats; record the output; inspect each join with the max-difference test (11.8) | No join-window value above the file baseline; nothing audible at 4× loudness on headphones |
| Bar alignment, stems to grid | Onset of R_DRUMS kick on bars 1, 65, 129, 208 versus `(bar−1) × 90,000` | Within ±3 ms (144 samples); role stems (regenerated) within ±5 ms of R_DRUMS |
| Sung cue placement | `measuredMs` versus `ms` for every quadrant, manifest and credit cue | Within ±469 ms (one beat); all four quadrants consistent |
| Punch-in timing | Log tap sample and ramp start sample in a debug build; 50 taps | Ramp starts on a bar boundary, jitter 0 samples; ramp 10 ms, no click |
| Key and modulation | Bass-stem MIDI or key detector on bars 9–40 (F) and 105–208 (G), every flavor and every bank line | Correct key; a wrong line is discarded |
| Level matching between flavors | `ebur128` on each flavor's eight-stem sum at map gain | −16 LUFS ± 0.5 LU across all six; TP ≤ −1 dBTP |
| Layer states | Solo calm, calm+med, all, in each section | No doubled instruments between layers; L_MED/L_HOT carry rhythm without the kit |
| Re-entry descent | Play RE1–RE6 end to end | Six downbeat joins, tails ring across, buzzer at 20:00.000 ± 1 ms, silence after |
| Phone speaker | iPhone at 60 % volume, kitchen distance | R_BASS punch-in audible (bass stems must carry 300–800 Hz harmonics); spoken cues intelligible over intense layer |
| AirPlay / HomePod | Same arrangement over AirPlay; compare Live Activity phase to heard phase | Phase display follows audio, not wall clock; punch-ins land on heard bars; no dropouts at joins |
| Quiet mode | Run a launch with music muted | Every cue and sting still fires on the bar; never silent for more than one section |
| Hash gate | Corrupt one byte of a stem | App refuses the stem and logs the mapId |

---

## 14. Open questions

1. **Is 128 BPM too brisk at 6:58 a.m.?** Half-time calm layer is the mitigation; 96 BPM (bar = 2.5 s, 30 s = 12 bars) is the fallback. Decide after the first flavor is heard in a kitchen.
2. **Do kit-less WAKE and DRESS phases feel thin?** Faithful to WINNER.md, but L_MED and L_HOT may need a light "ghost kit" that a Pilot confirm replaces.
3. **Will Covers keep the F → G modulation and the 208-bar structure?** Suno says a cover may come back unadapted; the budget assumes one retake per flavor.
4. **Does an Advanced Split regenerated stem stay on the grid?** If not, role stems fall back to Auto Split slices, which are less isolated.
5. **Do Studio exports satisfy "permitted download"?** Untested wording; the one-library-download-per-song rule is the hedge.
6. **Are Sounds one-shots counted as downloads?** Not stated; reels are the hedge.
7. **Does `AVAudioFile` report AAC lengths without priming frames for every asset class?** Any class that fails the gate ships as ALAC at roughly 2× the size.
8. **Manifest bank vocabulary.** Items outside the ~150-line bank get a generic sung line and the text on the card; a 3-second "record it in your own voice" option is the candidate v1.1 answer.
9. **Which key detector.** Studio MIDI extraction costs 10 credits per stem; an offline detector is cheaper but unverified on Suno mixes.
10. **Pricing.** $24 or $30 a month for Premier; confirm at checkout and file the receipt.
