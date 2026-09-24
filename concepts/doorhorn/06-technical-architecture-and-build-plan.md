# 06 — Technical architecture and build plan

Doorhorn (working title) is a local-first iOS 26 app in which a piece of music is the schedule: an AlarmKit alarm and a scheduled Live Activity start the morning with zero server, an `AVAudioEngine` graph plays bar-trimmed stems on a sample-accurate grid so every phase change, roll-call punch-in and Scrub lands on a downbeat, and SwiftData holds the manifest, the Hold item and the mission log on one phone. This document fixes the platform floor, the module boundaries, the section-map contract shared with the music document (03), the bar math, the scheduling design, the data model, the asset budget, the StoreKit 2 setup, the project layout, the test plan, the risks and a 16-week build plan for v1; every platform claim carries a citation to developer.apple.com, a WWDC session or the research digests, and anything that could not be verified is marked *unverified* with a fallback.

---

## 2. Platform floor, devices, and what the app does not need

**Floor: iOS 26.0 or later, built with the Xcode 27 SDK.** Four things Doorhorn depends on first appear in iOS 26: AlarmKit itself (`AlarmManager`, `AlarmConfiguration`, iOS 26.0) [1][3]; scheduling a Live Activity for a future date with `Activity.request(attributes:content:pushType:style:alertConfiguration:start:)` (iOS 26.0) [9]; App Intents' `supportedModes`/`IntentModes`, which replace the deprecated `openAppWhenRun` (iOS 26.0) [29][30]; and Apple-Hosted Background Assets with `AssetPackManager` (iOS 26.0), which replace On-Demand Resources [52][53][54]. iOS 27 shipped on 14 September 2026 (aesthetic digest) [65], so an iOS 26 floor covers the current and previous release, which is the usual indie choice; the build also adopts iOS 27's `playAudio(at:)` when available (section 6) [17]. Liquid Glass is the system look on both releases and the app keeps its colour in the content layer per Apple's guidance [65].

**Devices.** iPhone only at v1, with and without the Dynamic Island; on devices without it the Lock Screen presentation of a Live Activity appears as a banner for alerted updates [10]. The Action Button entry point needs iPhone 15 Pro or later [31]; everything else works without it. iPad runs the iPhone build in compatibility mode; Mac Catalyst, watchOS and visionOS are out of scope (Live Activities reach a paired Apple Watch and Mac from the iPhone anyway [13]). The app's Info.plist declares `NSSupportsLiveActivities` [61].

**What the app deliberately does not need.**

| Not needed | Consequence |
|---|---|
| A server of its own | No endpoints, no push provider, no CloudKit at v1. The scheduled launch, the Live Activity and the alarm are all set locally the night before. |
| Accounts | No sign-in, no household setup, no identifiers. The household is a list of names on one phone. |
| Runtime AI | Every song, stem and sung line is pre-generated and bundled or fetched as an asset pack; nothing is synthesized from a model on device (the one exception, a system speech voice for manifest items outside the sung bank, is section 6). |
| Network | The app opens no sockets. The only network traffic is Apple's: StoreKit 2 for the unlock and, after the unlock, Apple-hosted asset packs for the paid flavors [52]. A launch, a Scrub, Re-entry and the three free Request Line songs work in airplane mode. |

The privacy label is "Data Not Collected" (WINNER.md) [70]; there is no analytics SDK and no crash reporter beyond Apple's opt-in reports.

---

## 3. Architecture overview

```
┌──────────────────────────────── Doorhorn.app ─────────────────────────────────┐
│                                                                                │
│  Scheduler ──▶ AlarmKit alarm (station ID) + scheduled Live Activity           │
│      │                                                                         │
│      ▼                                                                         │
│  Arranger ◀── SectionMap (JSON contract) ◀── Asset store (bundle / packs)      │
│      │  plan: bars → sections → layer state → cue slots                        │
│      ▼                                                                         │
│  AudioEngine ── LaunchClock (sample grid) ── StemPlayers × 8 ── Mixer ── Out   │
│      ▲  ▲                                          ▲                           │
│      │  └── Crew (roll call taps, walk-up cues)     └── Manifest (sung slots)   │
│      │                                                    Hold item            │
│      ├── Scrub (bar-quantized abort)                                           │
│      ▼                                                                         │
│  MissionLog ──▶ Credits (End Credits assembly, v1.1) ──▶ CreditsCard           │
│                                                                                │
│  Store (StoreKit 2 entitlement)   LiveActivity (ActivityKit updates)           │
│  Widgets & Intents (App Intents, App Shortcuts, controls)                      │
└────────────────────────────────────────────────────────────────────────────────┘
        │                                    │
        ▼                                    ▼
 DoorhornWidgets.appex                DoorhornAssets.appex
 (Live Activities, AlarmKit           (managed Background Download
  countdown UI, clothesline and       extension for Apple-hosted
  Hangar widgets, controls)            asset packs)
```

**Scheduler** turns per-weekday door times into an AlarmKit schedule and a scheduled Live Activity. **SectionMap** loads and validates the per-track JSON (section 4). **Arranger** derives the day's arrangement from one 208-bar master stem set (section 5). **AudioEngine** owns the graph, eight players on one aligned timeline, per-bar commits and the tap quantizer (section 6). **Manifest** holds items with "last seen" memory and the single Hold item. **Crew** maps members to roles and stems (v1.2). **MissionLog** records launches in bars and computes the rolling rating. **Credits** assembles the nightly End Credits (v1.1). **Store**, **Widgets and Intents** and **LiveActivity** do what their names say.

**How a morning flows through it (door time 7:40, 12-minute launch).**

| Clock | Module | What happens |
|---|---|---|
| 20:50 (night before) | Scheduler | Computes first downbeat = door − 12:00 = 7:28:00 and alarm time = first downbeat − 30 s station ID = 7:27:30. Schedules an AlarmKit alarm (relative schedule, weekdays, station ID sound, secondary button "Open the launch") [1][4]. Schedules the Live Activity "board" for 7:28:05 with its required `AlertConfiguration` [9]. Writes a `Launch` row. |
| 20:50 | Arranger | Pre-computes the plan for tomorrow from the manifest's item count (bridge length, section 5) and stores its hash. |
| 7:27:30 | iOS | The alarm alerts through silent mode and Focus [1][2]; the 28-second station ID plays as the alarm sound. |
| 7:27:30–7:28:00 | Intents | Tapping the system Stop button or "Open the launch" runs a `LiveActivityIntent` in the app process [4][12]; it starts the engine. If nobody taps, the board still appears at 7:28:05 and counts down on the wall clock (section 7). |
| 7:28:00 | AudioEngine | Bar 1 of CALL at 128 BPM; if playback started late, the engine "late-joins" at the next bar boundary computed from the wall clock so T-0 stays at 7:40:00. |
| 7:28:15 | LiveActivity | Phase WAKE; countdown dates derived from the audio anchor plus output latency (section 8). |
| 7:29:15–7:31:15 | AudioEngine | Nested teeth song (64 bars), quadrant cues on bars 41, 57, 73, 89 [67]. |
| 7:32:15 | AudioEngine | DRESS on the key change (bar 137); Augustine's cue. |
| 7:35:15 | Manifest | MANIFEST bridge: Gus's sung lines scheduled into 2-bar slots from the bank; Hold item slot; roll-call window (auto-punch for a solo household). |
| 7:36:45 | AudioEngine | Horn entry, bar 281 (DOOR): "shoes and door". |
| 7:40:00 | AudioEngine, MissionLog | T-0: fanfare sting on the downbeat of bar 385; log "on time"; Live Activity ends with a 15-minute dismissal. |
| Any bar | Scrub | A Scrub tap is applied at the next bar boundary: klaxon on the bar, stems stop, "weather" logged, tomorrow offers the next-shorter track. |
| 20:15 | Scheduler, AudioEngine | Re-entry: six tempo segments 80 → 60 BPM, buzzer at 20:00.000, then (v1.1) End Credits and the clothesline card. |

---

## 4. The section map: the contract shared with the music document

The section map is the one artifact the music document (03) produces and this document consumes; both use `sectionmap.schema.json` version 1.0 exactly as written in 03 section 3.1 [67]. The engine never recomputes what the map states, so the numbers below are copied, not derived. Shared constants from 03: daytime family at **128 BPM, 4/4, 48,000 Hz, 90,000 samples per bar, 1,875 ms per bar**; Re-entry at 80/75/72/64/60 BPM; End Credits at 96 BPM [67].

### 4.1 The fields the engine reads

| Field | Type | Engine use |
|---|---|---|
| `mapId`, `family`, `flavor`, `sourceMap` | strings | Asset lookup and log records. `family` is one of launch, requestline, reentry, credits, sting. |
| `tempoBpm`, `meter`, `sampleRate` (const 48000), `barSamples`, `barMs` | numbers | The grid. `barSamples` must equal `sampleRate × 60 × beatsPerBar / tempoBpm` and must be an integer; the validator rejects a map where it is not. |
| `durationBars`, `durationMs` | integers | T-0 is the downbeat after the last bar; the fanfare is a separate LIFTOFF section. |
| `stems[]` | `stemId`, `bus`, `role`, `file`, `codec`, `channels`, `lengthBars`, `preRollSamples`, `tailSamples`, `gainDb`, `sha256` | One player per stem. Buses: `layerCalm`/`layerMed`/`layerHot` (intensity layers), `roleDrums`/`roleBass`/`roleBrass`/`roleChoir` (roll-call stems tagged with a crew role), `vocalLead`, `vocalLine`, `bed`, `sting`, `spoken`. |
| `sections[]` | `sectionId`, `phase`, `label`, `startBar`, `lengthBars`, `startMs`, `source.fromBar`, `layers{calm,med,hot}`, `rolesGate`, `keyChange`, `fillBefore` | A bar-exact read of the master from `source.fromBar`; `layers` is the intensity state (calm = L_CALM; medium adds L_MED; intense adds L_HOT); `rolesGate` is `silent`, `asConfirmed` or `all`. Launch phases: WAKE, DRESS, MANIFEST, DOOR, LIFTOFF; Re-entry: TIDY, TEETH, BOOK, LIGHTS. |
| `cues[]` | `cueId`, `type`, `bar`, `beat`, `ms`, `role`, `asset`, `text`, `slots`, `measuredMs`, `toleranceMs` | Engine-relevant types: `phaseChange`, `hornEntry`, `rollCallOpen`/`rollCallAuto` (role-cue markers), `manifestSlots`/`holdSlot`, `walkUpWindow`, `quadrant`, `spoken`, `sting`, `tZero`, `buzzer`, `creditSlot`. |
| `nest` | object | Substitution of one section by a Request Line song of identical bar count (the teeth nest). |
| `tap` | `quantize` (nextBar or nextBeat), `rampMs` | The quantization rule and punch-in ramp. |
| `provenance` | object | Rights ledger fields; not read at runtime. |

### 4.2 Worked example: the 12-minute marching-band launch

The full JSON is 03 section 3.2 [67]; this is the engineering reading of it, in bars, with the times the household hears.

| Bars | Time | Phase | Section (source bars of the 208-bar master) | Layer state | Roles |
|---|---|---|---|---|---|
| 1–8 | 0:00–0:15 | WAKE | `call` (1–8); Augustine "T-minus twelve" on bar 1 beat 1; volume ramps over these eight bars | calm | silent |
| 9–24 | 0:15–0:45 | WAKE | `wakeA` (9–24), sung verse 1 | calm | silent |
| 25–40 | 0:45–1:15 | WAKE | `wakeB` (25–40), sung verse 2 | medium | silent |
| 41–104 | 1:15–3:15 | WAKE | `teeth` (41–104), the nested 64-bar teeth song; quadrant cues at bars 41, 57, 73, 89; "spit and rinse" at 105 | medium | silent |
| 105–136 | 3:15–4:15 | WAKE | `wakeA2`, `wakeB2` (reprises), drum fill before 105 | medium | silent |
| 137–232 | 4:15–7:15 | DRESS | `dress1..3` (105–136 read three times); F→G key change on bar 137; Augustine "Get dressed" | intense | silent |
| 233–264 | 7:15–8:15 | MANIFEST | `manifest` (137–168): 4-bar lead, twelve 2-bar item slots from bar 237, 4-bar Hold slot at bar 261 | calm | asConfirmed |
| 265–280 | 8:15–8:45 | MANIFEST | `manifestV` (vamp 137–144 read twice): roll-call window, auto-punch Pilot 265, Navigator 269, Cargo 273, Ground Crew 277; Lionel "Copy." at 279 | medium | asConfirmed |
| 281–376 | 8:45–11:45 | DOOR | `door1..3` (169–200 read three times); **horn entry on bar 281 = 8:45.000, 3:15 before T-0** | intense | asConfirmed |
| 377–384 | 11:45–12:00 | DOOR | `tag` (201–208), authored ending; last bar ends on T-0 | intense | asConfirmed |
| 385–388 | 12:00–12:07.5 | LIFTOFF | `liftoff` (fanfare sting set); T-0 is bar 385 beat 1 at exactly 720,000 ms | — | all |

Every `startMs` equals `(startBar − 1) × 1875` and every section boundary is a multiple of 90,000 samples from bar 1, which is what lets the engine schedule the whole launch as integer sample offsets.

**Contract changes this document sends back to 03.** (a) The size table in 03 section 10.3 assumes On-Demand Resources for the paid flavors; ODR is deprecated as of iOS 27 and the delivery mechanism is Apple-Hosted Background Assets (section 11), which needs each flavor packaged as an asset pack with a manifest [52][54][55]. (b) The map should carry a `phaseOffsetsMs` object per duration listing the horn entry offset before T-0 (2:45, 3:15, 3:15, 4:45, 4:45 for 8/10/12/15/20 minutes, from 03's duration table), because the Live Activity states it in words ("horns at T-3:15"). (c) `stems[].codec` of `aac_lc` passes only if the decoded-length gate in section 11 passes for that asset class; otherwise the class ships as `alac`, which the schema already allows.

---

## 5. The Arranger

The Arranger turns one 208-bar master stem set per flavor into five durations and a different arrangement every day, without any second asset. It works entirely in bars; it never sees samples.

**Inputs.** The flavor's master map (`launch.<flavor>.master.v1`), the target duration, tonight's manifest (item count `n`, whether a Hold item exists), the crew state (roll call on or off), and a seed = SHA-256 of local date + household id + duration.

**Grammar (from 03 section 2.3) [67].**

```
LAUNCH   := CALL WAKE DRESS MANIFEST DOOR TAG
WAKE     := A B TEETH (A | B | BREATH)*     # BREATH = A at layer state calm
DRESS    := DR{1..6}
MANIFEST := MB MV{0..4}
DOOR     := CH{2..4} [CH_HALF]
```

**Duration budget (bars at 128 BPM; 32 bars = 1:00).**

| Duration | Total | CALL | WAKE | DRESS | MANIFEST | DOOR | TAG | Horn entry before T-0 |
|---|---|---|---|---|---|---|---|---|
| 8:00 | 256 | 8 | 96 | 32 | 32 | 80 | 8 | 88 bars = 2:45 |
| 10:00 | 320 | 8 | 112 | 64 | 32 | 96 | 8 | 104 bars = 3:15 |
| 12:00 | 384 | 8 | 128 | 96 | 48 | 96 | 8 | 104 bars = 3:15 |
| 15:00 | 480 | 8 | 144 | 128 | 48 | 144 | 8 | 152 bars = 4:45 |
| 20:00 | 640 | 8 | 224 | 192 | 64 | 144 | 8 | 152 bars = 4:45 |

**Repeating and dropping at bar boundaries.** Every unit is a whole read of a source range (A and B 16 bars, TEETH 64, DR 32, MB 32, MV 8, CH 32, CH_HALF 16, CALL and TAG 8), so repeats are further reads of the same file bytes and drops are units not scheduled. The 8-minute launch drops the second WAKE reprise and reads DR once; the 20-minute launch reads DR six times and CH four times plus CH_HALF. A join is a downbeat-to-downbeat cut; where `fillBefore` is set, the outgoing unit's last bar is replaced by one of four 1-bar drum fills [67].

**The manifest bridge depends on item count.** MB holds a 4-bar lead, twelve 2-bar item slots and a 4-bar Hold slot; `maxItems` is 12. The minimum MANIFEST length is `roundUp8(4 + 2n + 4·hold) + rollCall`, with `rollCall` 16 bars when the crew feature is on and 0 otherwise, never less than 32. If that exceeds the table's value, the Arranger adds MV vamps (8 bars each, up to 4) and takes the bars from DRESS within the ±32-bar shift 03 already allows. Unused slots become instrumental bars (V_LEAD muted, calm layer). What the household learns is unchanged: the bridge always begins at MANIFEST and Gus's first line is always four bars in.

**The horn constraint.** The horn entry is the downbeat of DOOR. The Arranger asserts `hornBar == durationBars − (DOOR + TAG) + 1` for the chosen duration and that this equals the map's `hornEntry` cue bar; a plan that fails the assertion is discarded and the seed is advanced. The offset before T-0 is therefore stated per duration (last column above) and shown in the Live Activity as text.

**Daily variation rule.** With the seed, the Arranger chooses in order: (1) the flavor, rotating across unlocked flavors and never repeating yesterday's unless only one is unlocked; (2) the order of A/B/BREATH repeats in WAKE; (3) the DRESS/DOOR split within ±32 bars; (4) the layer state of each repeated unit (a repeated A may be calm or medium, never below the map's minimum for that phase); (5) which of the four fills sits at each join; (6) the walk-up cue slots; (7) the cue variants (Augustine's call, Farrago's forecast). The plan's hash is compared against the last 60 stored in the mission log and re-rolled on collision, so no launch repeats exactly inside two months [67]. Phase boundaries and the horn bar are never varied; only the texture is.

**Re-entry** is not arranged: it is six fixed segments (100, 40, 75, 72, 48, 30 bars at 80, 80, 75, 72, 64, 60 BPM; 365 bars, 1,200.000 s) [67]. **Request Line** songs are monolithic and not arranged.

---

## 6. Audio timing

### 6.1 The grid

At 128 BPM in 4/4 at 48 kHz a beat is 22,500 samples (468.75 ms) and a bar is 90,000 samples (1,875 ms); bar `k` (1-based) starts at sample `(k − 1) × 90,000` from the first downbeat. Because every daytime bar is an integer number of samples, boundaries are computed by multiplication from the origin, never by accumulation, and a 640-bar launch ends at exactly 57,600,000 samples with zero drift. For Re-entry each segment has its own integer bar (144,000 / 153,600 / 160,000 / 180,000 / 192,000 samples) and the segment's first downbeat sits at the cumulative sample count of the segments before it [67].

The engine keeps stems and player nodes at 48 kHz and lets `AVAudioEngine`'s mixer handle any hardware rate conversion; Apple's guidance is to match the node's output rate to the files and let a mixer convert [14]. All bar math is done in the player timeline, not the hardware timeline.

### 6.2 One timeline for eight players

`AVAudioPlayerNode` superimposes a player timeline on the node's arbitrary-zero sample clock; `playerTime(forNodeTime:)` and `nodeTime(forPlayerTime:)` convert between them, and `stop()` returns the player timeline to sample 0 [14]. Doorhorn starts all eight stem players (and the cue, sting and vocal-line players) on one shared node time a quarter of a second in the future, computed as Apple's own example does from `lastRenderTime.sampleTime + delay × sampleRate` [16]. From then on every player's sample 0 is the same instant, so bar `k` is sample `(k − 1) × 90,000` in every player, and a stem scheduled "at bar k" on any player lands with the others. On iOS 26 the start call is `play(at:)`; it is marked deprecated in iOS 27 in favor of the throwing `playAudio(at:)` (iOS 27.0), so the engine wraps the two behind one `startAll(at:)` helper and picks by availability [16][17].

Scheduling semantics are the documented ones: a valid sample time is interpreted as such, `nil` means "after the previous command", and a channel-count mismatch fails to schedule [14]. Bar-exact frame ranges are read from the `AVAudioFile` by `framePosition` and scheduled with `scheduleSegment` or as buffers [19][71].

### 6.3 Per-bar commits and the one-beat lead

The Scheduler keeps at most one bar queued ahead per player. At beat 4 of bar `k` (the *commit point*, 468.75 ms before the downbeat of `k + 1`, plus the current `outputLatency`) it commits bar `k + 1` for every player: stem, frame range, gain. Continuous stems are read one contiguous bar at a time from the same file. The commit point is why a tap can be honoured on the very next bar.

**"The tap is the downbeat."** A tap (phase confirm, roll-call punch, Scrub, Door) is timestamped with the host clock, converted to the reference player's sample position through `lastRenderTime` and `playerTime(forNodeTime:)` [14][15], and applied at the next bar boundary that is at least one beat plus output latency away:

```
s        = player sample at tap
bar      = floor(s / 90000) + 1              # next boundary index
if bar*90000 − s < 22500 + latencyFrames:  bar += 1
```

So a tap in the last beat of a bar lands on the bar after next; everything else lands on the next bar. That rule is stated in the product as "taps land on the next downbeat" and holds to the sample.

### 6.4 Punch-ins, crossfades and stops

Role stems play continuously from bar 1 at gain 0 (03 section 4.4) [67]. A roll-call punch-in does not start anything: the incoming bar's buffer is rendered with a 10 ms equal-power ramp (`tap.rampMs`) baked into its first samples before it is scheduled, so the join is sample-exact and needs no mixer automation. Layer-state changes at section joins are handled the same way, with a one-beat fade baked into the outgoing bar's last buffer and the incoming bar's first. Baking gain into the committed buffer is the engine's one rule: *no gain change is ever performed by a timer*.

**Scrub stops on a bar.** A Scrub tap is quantized as above. At the commit point for the scrub bar the Scheduler commits, for every stem player, a bar of silence (a zero buffer) instead of music, and commits the klaxon on the sting player at the scrub bar's sample. The stems therefore fall silent exactly on the downbeat where the klaxon lands, and the players are stopped by a timer a beat later, when nothing audible remains. The log records the scrub in bars.

**Request Line songs are exact-length.** Each song file is body bars plus one release bar, and the map's `durationBars` ends the wait on the downbeat after the body (03 section 5) [67]; the engine schedules the whole file as one segment and computes the end date from `durationBars × barSamples`, not from a timer. The Live Activity's end is that date plus output latency.

**Re-entry's descending tempo.** Six segments at decreasing BPM are scheduled as six segments on the same aligned players; segment `N + 1` starts on the exact sample where segment `N`'s body ends, and `N`'s 2,000 ms tail rings over the first bar of `N + 1` on its own player (no equal-power crossfade, which would smear two tempos) [67]. The buzzer is a one-shot scheduled at sample 57,600,000 (1,200.000 s). Bar boundaries after a tempo step are computed from the new segment's `barSamples`, so a Scrub during Re-entry still lands on a downbeat.

### 6.5 Codec, gapless joins and memory

AAC carries priming and remainder frames that gap loops unless handled at a lower level (QA1636) [25][64]. Doorhorn never asks a codec to loop: every join is a read at a sample offset into decoded PCM, gated by `AVAudioFile.length == lengthBars × barSamples + preRoll + tail` for every asset [19][67]; `kAudioFilePropertyPacketTableInfo` exposes the priming and remainder counts when a file needs inspection [26]. A class that fails the gate ships as ALAC. Because stems stream one bar at a time, resident audio memory stays under 10 MB.

### 6.6 AirPlay and route changes

`AVAudioSession.outputLatency` reports output latency in seconds, and Apple's documentation states that "using an AirPlay-enabled device for your audio content can result in a 2-second delay" [20]. The engine reads `outputLatency` at start and on every `routeChangeNotification` [59], inspects `currentRoute` for an `.airPlay` output port [60], and adds the latency to (a) the commit lead and (b) every Live Activity date. A route change mid-launch may reconfigure the engine (behaviour to be measured in the week-3 harness; *unverified* whether the engine stops on every AirPlay handoff); the fallback is deterministic: on any engine configuration change the Scheduler restarts all players on a fresh anchor and resumes at the first bar boundary after `now − launchStartDate`, so the schedule to T-0 is preserved and the only artefact is a gap the person caused by changing speakers. The AirPlay picker in onboarding is `AVRoutePickerView` [56].

### 6.7 Background audio rules

The session category is `.playback`, which continues through the Ring/Silent switch and screen lock and, with `audio` in `UIBackgroundModes`, in the background [21][22][23]. Apple says an app not actively playing should deactivate its session on entering the background, and to use a background task rather than streaming silence [24]. Doorhorn activates the session when a track starts and deactivates it when the track ends; it never plays silence to stay resident, which is why quiet mode keeps the app in the foreground [69] and why an alarm or an intent, not a sleeping app, starts the launch.

---

## 7. Scheduling the launch with zero server

### 7.1 The alarm

The night before (or on any settings change) the Scheduler asks `AlarmManager.shared` for authorization if `authorizationState` is `.notDetermined`; the app's Info.plist carries `NSAlarmKitUsageDescription` ("Augustine calls the launch at the door time you set"), without which no alarm can be scheduled [1][6]. It then schedules one alarm per weekday pattern with `Alarm.Schedule.relative(.init(time:repeats: .weekly(days)))`, which accounts for time-zone changes, and a fixed date for one-off launches [1][2].

Configuration, per the documented API [3][4][5][62]:

```swift
let alert = AlarmPresentation.Alert(
    title: "T-minus twelve. Launch window open.",
    secondaryButton: AlarmButton(text: "Open the launch", textColor: .white,
                                 systemImageName: "door.left.hand.open"),
    secondaryButtonBehavior: .custom)                 // the system supplies Stop
let attributes = AlarmAttributes(presentation: AlarmPresentation(alert: alert),
                                 metadata: LaunchAlarmMetadata(launchId: id),
                                 tintColor: .doorhornOrange)
let config = AlarmManager.AlarmConfiguration.alarm(
    schedule: schedule, attributes: attributes,
    stopIntent: StartLaunchIntent(launchId: id),       // Stop = "I'm up, roll it"
    secondaryIntent: OpenLaunchIntent(launchId: id),   // opens the app, foreground
    sound: .named("station_id_28s.caf"))
let alarm = try await AlarmManager.shared.schedule(id: id, configuration: config)
```

Verified facts the design leans on: the alert breaks through silent mode and Focus [1][2]; the system supplies the Stop button and the secondary button is optional [5]; `.custom` shows an Open action that launches the app [1][62]; `stopIntent` and `secondaryIntent` are `LiveActivityIntent`s, performed by launching the app process without opening the app [4][12]; a custom sound is an `AlertSound` named after a file in the main bundle or `Library/Sounds` [7]; the alert is forwarded to a paired Apple Watch [1].

**The 30-second station ID.** The AlertSound documentation states only where the file lives [7]; the 30-second cap is the documented `UNNotificationSound` rule ("Sound files must be less than 30 seconds in length", otherwise the default sound plays) [8] and the assumption WINNER.md carries [70]. Whether AlarmKit enforces the same cap is *unverified*; the station ID is authored at 28.0 s, PCM in CAF, so it is safe under either rule.

**Why Stop also starts the launch.** The station ID *is* the first thirty seconds of the launch, so Stop means "I'm up": `StartLaunchIntent` runs in the app process, activates the audio session, and starts the engine at the bar matching the wall clock. Whether iOS lets an intent launched in the background begin new audio playback is *unverified* (the app process is launched without opening the app [12]; nothing documents session activation from that state). The fallback is the secondary button, which opens the app in the foreground [1], where playback is guaranteed; because the `secondaryIntent` is "only available after first unlock" [3], after a reboot the person taps Stop, unlocks, and the app resumes at the right bar. If the week-2 spike shows background start works, the secondary button is a convenience; if not, one tap is the contract.

**Late join.** Whenever playback starts, the engine computes `elapsed = now − firstDownbeatDate`, quantizes to the next bar, and begins there, so the door time is preserved even if the phone was picked up two minutes late; the mission log records the join bar.

### 7.2 The scheduled Live Activity

`Activity.request(attributes:content:pushType:style:alertConfiguration:start:)` (iOS 26) requests and schedules a Live Activity for a date; "the system starts the Live Activity at the specified date, even if the app is in the background"; an `AlertConfiguration` is mandatory "to let people know that your app started a Live Activity"; the activity is in the `.pending` state until then; and scheduled activities count toward the device's limit on simultaneous Live Activities [9][10]. Doorhorn schedules the board for first downbeat + 5 s, after the alarm's own presentation is up, with a quiet named sound (a half-second "board on" tick) so the two alerts do not compete. The board shows the countdown, the phase and the person's role (section 8) and carries a `LiveActivityIntent` button "Start the launch" for the case where nobody tapped the alarm. Its content state counts down on wall-clock dates until the engine starts, then is updated with audio-derived dates.

### 7.3 If the app is killed

Alarms are scheduled with the system, not the process; the AlarmKit sample observes `alarmUpdates` so the app "has the latest state of an alarm even if the alarm state updated while the sample app isn't running" [1]. That the alarm still alerts after a force-quit is *unverified* in Apple's documentation, and forum threads report late alarms on some builds (anecdotal, e.g. [72]); the week-2 spike force-quits after scheduling. The scheduled Live Activity is documented to start with the app in the background, not after termination (*unverified*); the alarm's own presentation is the fallback and needs no app process. Both intents launch the process on demand [12], so a killed app is never a dead morning: the station ID plays, the person taps, and the launch late-joins.

### 7.4 Do Not Disturb, Focus, weekends and no-launch days

An AlarmKit alert "overrides both a device's focus and silent mode" [1], so a Sleep Focus at 7:27 does not silence Augustine. Whether a Live Activity alert is suppressed under Focus is *unverified*; nothing in the design depends on it. Door times are per weekday (01) [69]; the weekly recurrence array carries only the days with a door time, and a day without one schedules nothing, so weekends are simply absent from the alarm. "No launch tomorrow" cancels the next occurrence with `cancel(id:)` and re-schedules the recurring alarm afterward [3]; a date range does the same for a holiday. Re-entry is a second recurring alarm with a softer sound and its own Live Activity, on the days the person chooses.

---

## 8. Live Activity and StandBy content

**What is shown.** Three things and nothing else: a large countdown to T-0, the phase name (WAKE, DRESS, MANIFEST, DOOR) with the next fixed anchor in words ("horns at T-3:15"), and the person's role patch. No manifest text, no names (Live Activities are visible to casual observers, HIG) [11]. Text is medium weight or heavier per the HIG [11]. Buttons: Scrub, and Start when the engine is not yet running, both `LiveActivityIntent`s so they run in the app process without opening it [12].

**Timing derives from playback position.** The engine knows the host time of the first downbeat's sample (an `AVAudioTime` carrying both host and sample time, converted with `seconds(forHostTime:)`) [15]; the `ContentState` carries `firstDownbeatDate`, `doorDate = firstDownbeatDate + durationMs + outputLatency` and each phase's start date, and the views use `Text(timerInterval:pauseTime:countsDown:showsHours:)` and `ProgressView(timerInterval:countsDown:)`, which the system advances without app updates [39][40]. The app calls `update(_:)` only at phase changes, Scrub and the end (six per launch), each far under the 4 KB payload limit [10]. A wall-clock countdown would reach T-0 two seconds before the fanfare on AirPlay; anchoring to the audio clock makes the number on the nightstand agree with the room.

**Dynamic Island states.** Compact leading: the phase glyph; compact trailing: the countdown; minimal: the countdown alone (the HIG example is the Timer app showing remaining time rather than an icon) [11]; expanded: phase, role patch, next anchor in words, and the Scrub button. iOS 27 also shows the compact and minimal views in landscape and exposes `isDynamicIslandLimitedInWidth` for the narrow case [13]. During a Request Line song the same activity type shows the ON AIR bulb and a shrinking vinyl (a `ProgressView(timerInterval:)` counting down) with no digits. The launch activity is ended at T-0 + 8 s with a 15-minute dismissal window, which the HIG calls adequate in most cases [11].

**StandBy.** On iPhone in StandBy the Live Activity appears in the minimal presentation and, when tapped, expands to the Lock Screen presentation scaled 2x to fill the screen; a custom background colour set with `activityBackgroundTint` extends to the whole screen, and `isActivityFullscreen` tells the view it is there [10][11][38]. Doorhorn's full-screen layout is the huge cutout countdown on indigo that WINNER.md describes, with assets at 2x resolution [10]. Night Mode applies a red tint, so the design is checked in that mode [11].

**Hangar mode (paid).** StandBy is a system surface, not a screen an app can take over, so the Hangar is built from what StandBy renders: two small system-family widgets side by side, scaled up with the background removed, rendered monochrome red in low light, refreshed at a system-defined rate that does not count against the widget budget [35][36][63]. The Hangar widget pair is the launch tower silhouette with tomorrow's door time and the tonight's-card widget, designed without background colour so it blends with the black bezel [35]. When the phone is upright and charging in the app's Hangar screen, the app disables the idle timer only for that screen and re-enables it on exit, which Apple permits for apps that need to keep displaying content with minimal interaction [57].

---

## 9. Entry points: Shortcuts, Action Button, NFC, widgets

**App Intents.** `StartRequestLineIntent(song:)` takes an `AppEnum` parameter (teeth 2:00, microwave 1:30, kettle 3:00, shower 5:00, and the rest once unlocked), `StartLaunchIntent`, `ScrubIntent`, `NoLaunchTomorrowIntent` and `AddManifestItemIntent`. App Intents by default do not bring the app to the foreground; `supportedModes` declares `.background`, `.foreground`, or the dynamic and deferred foreground modes, and `systemContext.canContinueInForeground` says whether a transition is possible [28][29]. Request Line intents declare `[.background, .foreground(.dynamic)]`: they try to start audio in the background and continue to the foreground only if the audio session cannot be activated there (the same *unverified* point as section 7.1, resolved by the same spike). Intents that start a Live Activity conform to `LiveActivityIntent` [12].

**App Shortcuts.** One `AppShortcutsProvider` lists the shortcuts; each phrase must include the app name placeholder and may include up to one parameter, and a parameterized phrase generates one shortcut per enum value ("Start Microwave on Doorhorn") [27][28]. App Shortcuts surface in Spotlight, Siri and when configuring the Action Button [28].

**Action Button.** On iPhone 15 Pro or later, Settings > Action Button > Shortcut lets the person pick a shortcut [31]; "Kettle" on the Action Button is the solo-commuter demo.

**NFC tags and time triggers.** The Shortcuts app's NFC trigger "triggers your automation when you scan a near-field communication tag" [32], and the Time of Day trigger runs daily, weekly or monthly [33]. A sticker on the microwave door runs the microwave shortcut. Whether an NFC automation runs without confirmation is not stated on Apple's support pages retrieved here (*unverified*; third-party guides describe a "Run Immediately" option); the in-app help says "turn off Ask Before Running if your phone offers it" and nothing depends on it.

**Widgets.** The clothesline widget (v1.1) is a `systemMedium` timeline widget showing the week's End Credits cards, with `systemSmall` (today's card) and `accessoryRectangular` variants, reading the shared SwiftData store from the widget extension's own `ModelContainer` [34][51]. The app calls `WidgetCenter.shared.reloadTimelines(ofKind:)` after credits are generated and after a Scrub [37]; timelines are otherwise planned to the next day, well inside the 40–70 daily refresh budget [36]. A Control Center control ("Request Line") is a button control backed by the same intent [34].

---

## 10. Data model

SwiftData (`@Model`) with a single `ModelContainer` in an App Group container so the widget extension and intents read the same store; the widget builds its own container with `ModelConfiguration(groupContainer: .identifier("group.<bundle>.station"))` [49][50][51]. Writes happen only in the app process (including intents run there); the widget is read-only.

| Entity | Fields |
|---|---|
| `Launch` | id, date, doorTime, weekday, durationMinutes, flavor, planHash, firstDownbeatDate, alarmId, activityId, state (scheduled, running, done, scrubbed, noLaunch) |
| `Track` | mapId, family, flavor, version, packId (nil when bundled), sha256, installedAt |
| `SectionMap` | mapId, json (Data), tempoBpm, barSamples, durationBars (denormalized for queries) |
| `ManifestItem` | id, text, bankLineId (nil if not in the sung bank), lastSeenPlace, dueDate, order, active, createdAt |
| `HoldItem` | id, text, createdAt, ageDays (computed, capped at 30), state (open, cleared, amnestied), clearedAt |
| `CrewMember` | id, name, role (pilot, navigator, cargo, groundCrew), colour, walkUpCueId, patchIndex |
| `MissionLogEntry` | id, date, launchId, outcome (onTime, late, scrubbed, noLaunch), scrubBar, joinBar, durationMinutes, flavor, planHash, note, edited |
| `CreditsCard` | id, date, billing (ordered roles), lines (bank line ids), jokeId, renderSeed |
| `Settings` | doorTimes[weekday], reentryTime, durations, flavorRotation, firstSound, quietMode, visualCueMode, speakerRoute, entitlementCached, entitlementCheckedAt, schemaVersion |

Indexes on `MissionLogEntry.date` and `Launch.date` use the `#Index` macro [49]. **Retention.** Aggregate counters (the rolling 50-launch rating and the Station Log) are kept forever. `MissionLogEntry` detail is visible for 14 days on the free tier and 90 days with the unlock; older rows are kept but hidden (nothing is deleted at either boundary, per 01 and 05) [68][69]; a maintenance pass at app launch marks rows older than 90 days as archived. `CreditsCard` rows are data, not images, and are re-rendered on demand. **Privacy.** Nothing leaves the device; the store lives in the app group container with the default file protection (complete until first user authentication) so intents and widgets can read it while the phone is locked after a reboot. Season Two's CloudKit share is a second `ModelConfiguration` with `cloudKitDatabase` set, added without changing the entities [50].

---

## 11. Asset pipeline and budget

**Formats.** Stems, songs and line banks are CAF containers with AAC-LC (160 kbps stereo, 128 kbps role stems, 96 kbps mono lines), ALAC where the decoded-length gate fails, and 16-bit PCM for stings, the buzzer and the station ID (03 section 10.2) [67]; masters stay 24-bit WAV off-repo. The pipeline (`Tools/stemcheck`) validates every file against its map: exact frame count, sha256, loudness, and the `measuredMs` tolerance of sung cues, and refuses to build a map whose `barSamples` is not an integer.

**Size (from 03 section 10.3, adopted unchanged) [67].**

| Class | Shipped |
|---|---|
| One launch flavor (8 stems × 208 bars) | 56 MB |
| Six launch flavors | 336 MB |
| Request Line, 24 songs | 62 MB |
| Re-entry, 6 segments | 24 MB |
| End Credits bed and banks (~300 lines) | 15 MB |
| Gus manifest bank (~200 lines) | 9 MB |
| Spoken cues | 3 MB |
| PCM stings and micro sounds | 17 MB |
| Whole set | ≈ 466 MB |

**Delivery.** The free bundle (one launch flavor, one Re-entry, three Request Line songs, both banks, cues and stings) is about 130 MB of audio; with code, fonts and art the **App Store download target is 150 MB, hard ceiling 180 MB**. The remaining five flavors and 21 Request Line songs (about 320 MB) are **Apple-Hosted Background Assets**, not On-Demand Resources: ODR "has been deprecated on Apple platforms as of iOS 27" [55], and Apple-Hosted Background Assets is available from iOS 26 with 200 GB of hosting included in the developer membership [54][73]. Each flavor is one asset pack with an on-demand download policy, fetched through `AssetPackManager.shared.ensureLocalAvailability(of:)` at unlock or when the flavor is picked, with `statusUpdates` driving a progress row; the project needs a managed Background Download extension conforming to `StoreDownloaderExtension`, and packs are tested against Xcode's local mock server [52][53]. Fallback if the extension misbehaves in the week-10 spike: bundle every flavor (about 470 MB, inside the 4 GB bundle limit [55]) at a conversion cost.

**Manifest items outside the sung bank.** Gus's bank covers about 200 items; an item Gus has no line for is read by Lionel (CAPCOM) with `AVSpeechSynthesizer` in the spoken slot ("and one more thing: the permission slip"), which is on-device and free [58]; the joke is that Lionel reads anything Gus won't sing.

---

## 12. StoreKit 2

One non-consumable, product id `<bundle-id-prefix>.station.fullcrew` ("Full Crew"), as fixed in 05 [68]. **Entitlement check.** At launch, iterate `Transaction.currentEntitlements`, which emits a transaction for each non-consumable and excludes refunded or revoked products; accept only `.verified` results and require `revocationDate == nil` [41]. Start a `Transaction.updates` listener in a `Task` at launch, because unfinished transactions are delivered once at launch and the listener also receives Family Sharing, Ask to Buy and other-device purchases [43]. Cache the result as `Settings.entitlementCached` so a 6:58 launch in airplane mode never waits on StoreKit; re-check when StoreKit is reachable. **Restore.** A "Restore Purchases" button calls `AppStore.sync()`, which prompts for App Store credentials and must only run on an explicit tap; Apple notes that in normal operation transactions are available automatically on reinstall or a new device [42]. **Family Sharing: enabled, consistent with 05.** Family Sharing lets a purchaser share a non-consumable with up to five family members; it is enabled per product in App Store Connect and cannot be turned off afterwards; family members get their own transactions, and access is revoked (a `revocationDate` appears) when sharing stops [44]. The reason to enable it stands: one purchase per household is the product, and the only cost is the irreversibility, which is accepted. The paywall reads `product.isFamilyShareable` and says so [46]. For non-consumables bought before sharing was enabled, family members may need to restore [44]; enabling it before the first submission avoids that case entirely. On revocation the app downgrades at the next idle moment and deletes nothing [68].

---

## 13. Project structure

```
Doorhorn/
├── Doorhorn.xcodeproj
├── Doorhorn/                         # app target (SwiftUI, iOS 26)
│   ├── App/            DoorhornApp.swift, AudioSessionController, Router
│   ├── Features/       Launch, Reentry, Manifest, RequestLine, MissionLog,
│   │                   Onboarding (Test Fire), Store, Settings, Hangar
│   ├── Intents/        StartLaunchIntent, OpenLaunchIntent, ScrubIntent,
│   │                   StartRequestLineIntent, DoorhornShortcuts (AppShortcutsProvider)
│   ├── Resources/      Audio/free-bundle (CAF + maps), Fonts (OFL), Assets.xcassets,
│   │                   Doorhorn.storekit, Info.plist (NSAlarmKitUsageDescription,
│   │                   NSSupportsLiveActivities, UIBackgroundModes: audio)
├── DoorhornWidgets/                  # widget extension
│   ├── LaunchActivity, RequestLineActivity, ReentryActivity   (ActivityConfiguration)
│   ├── AlarmCountdownView            (AlarmKit countdown/paused presentations)
│   ├── ClotheslineWidget, HangarWidget, RequestLineControl
├── DoorhornAssets/                   # managed Background Download extension
├── Packages/
│   ├── DoorhornCore/    SectionMap, Plan, Arranger, SeededRNG, Models (@Model),
│   │                    CreditsAssembler, Entitlement          (pure Swift, macOS-testable)
│   └── DoorhornAudio/   Engine, LaunchClock, StemPlayer, Scheduler, BarBuffer, Latency
├── AssetPacks/                       # asset pack sources + manifests (ba-package)
├── Tools/
│   ├── stemcheck/                    # validates CAF against maps, writes sha256 manifest
│   └── mapgen/                       # builds section maps from the arrangement sheet
└── Tests/
    ├── DoorhornCoreTests/            # arranger, bar math, credits (XCTest, runs on macOS)
    ├── DoorhornAudioTests/           # manual-rendering timing harness
    ├── DoorhornStoreTests/           # StoreKitTest sessions
    └── DoorhornUITests/              # onboarding, paywall, Scrub
```

---

## 14. Code sketches

**Section map types (DoorhornCore).**

```swift
struct SectionMap: Codable {
    let schemaVersion: String, mapId: String, family: Family, flavor: String
    let tempoBpm: Double, meter: Meter, sampleRate: Int, barSamples: Int, barMs: Double
    let durationBars: Int, durationMs: Int
    let stems: [Stem], sections: [Section], cues: [Cue], tap: TapRule
    enum Family: String, Codable { case launch, requestline, reentry, credits, sting }
    struct Meter: Codable { let beatsPerBar: Int, beatUnit: Int }
    struct Stem: Codable { let stemId: String, bus: Bus, role: Role?, file: String
        let codec: Codec, channels: Int, lengthBars: Int, preRollSamples: Int, tailSamples: Int, gainDb: Double, sha256: String }
    struct Section: Codable { let sectionId: String, phase: Phase, label: String, startBar: Int, lengthBars: Int
        let startMs: Int, source: Source, layers: Layers, rolesGate: RolesGate?, keyChange: String?, fillBefore: Bool? }
    struct Cue: Codable { let cueId: String, type: CueType, bar: Int, beat: Int, ms: Int, role: Role?, asset: String?, text: String? }
    struct TapRule: Codable { let quantize: Quantize, rampMs: Int }
    func sample(ofBar bar: Int) -> AVAudioFramePosition { AVAudioFramePosition(bar - 1) * AVAudioFramePosition(barSamples) }
}
enum Bus: String, Codable { case layerCalm, layerMed, layerHot, roleDrums, roleBass, roleBrass, roleChoir, vocalLead, vocalLine, bed, sting, spoken }
enum Role: String, Codable { case pilot, navigator, cargo, groundCrew }
enum Phase: String, Codable { case WAKE, DRESS, MANIFEST, DOOR, LIFTOFF, TIDY, TEETH, BOOK, LIGHTS, CREDITS, BODY }
```

**The Arranger's bar loop.**

```swift
func plan(master: SectionMap, minutes: Int, items n: Int, hold: Bool, crew: Bool, seed: UInt64) throws -> Plan {
    var rng = SeededRNG(seed)
    let budget = try Budget(minutes: minutes, manifestMin: max(32, roundUp8(4 + 2*n + (hold ? 4 : 0)) + (crew ? 16 : 0)))
    var bars: [PlannedBar] = []
    for phase in [Phase.WAKE, .DRESS, .MANIFEST, .DOOR] {
        var left = budget[phase]
        for unit in Grammar.units(for: phase, bars: left, rng: &rng) {   // whole reads of master ranges
            let state = Grammar.layerState(unit, phase, rng: &rng)
            for i in 0..<unit.bars {
                bars.append(PlannedBar(index: bars.count + 1, phase: phase, unit: unit, sourceBar: unit.fromBar + i, layers: state))
            }
            left -= unit.bars
        }
        precondition(left == 0)
    }
    let hornBar = bars.firstIndex { $0.phase == .DOOR }! + 1
    guard hornBar == budget.total - (budget[.DOOR]) + 1 else { throw ArrangeError.hornMisplaced }
    return Plan(bars: bars, hornBar: hornBar, tZeroBar: budget.total + 1, seed: seed)
}
```

**Scheduling a stem at a bar boundary (DoorhornAudio).**

```swift
final class StemPlayer { let node = AVAudioPlayerNode(); let file: AVAudioFile
    func commit(bar: Int, sourceBar: Int, gain: Float, map: SectionMap) throws {
        let frames = AVAudioFrameCount(map.barSamples)
        file.framePosition = map.sample(ofBar: sourceBar) + AVAudioFramePosition(map.stemPreRoll)
        let buf = AVAudioPCMBuffer(pcmFormat: file.processingFormat, frameCapacity: frames)!
        try file.read(into: buf, frameCount: frames)                       // one bar, bar-exact
        BarBuffer.applyGain(buf, gain, rampMs: gain == 0 ? 0 : map.tap.rampMs)
        node.scheduleBuffer(buf, at: AVAudioTime(sampleTime: map.sample(ofBar: bar), atRate: 48_000),
                            options: [], completionCallbackType: .dataRendered) { _ in }
    }
}
// All players share one anchor so bar k is the same sample in every player timeline.
func startAll(_ players: [AVAudioPlayerNode], engine: AVAudioEngine) throws {
    try engine.start()
    guard let now = players[0].lastRenderTime else { throw EngineError.noRenderTime }
    let anchor = AVAudioTime(sampleTime: now.sampleTime + 12_000, atRate: 48_000)   // 0.25 s ahead
    for p in players { if #available(iOS 27, *) { try p.playAudio(at: anchor) } else { p.play(at: anchor) } }
}
```

**Applying a bar-quantized tap.**

```swift
func targetBar(forTapAt hostTime: UInt64, clock: LaunchClock) -> Int {
    guard let nodeNow = clock.reference.lastRenderTime,
          let playerNow = clock.reference.playerTime(forNodeTime: nodeNow) else { return clock.nextCommitBar }
    let dt = AVAudioTime.seconds(forHostTime: hostTime) - AVAudioTime.seconds(forHostTime: nodeNow.hostTime)
    let s = Double(playerNow.sampleTime) + dt * 48_000
    var bar = Int(s / 90_000) + 2                                  // next boundary, 1-based
    if Double(bar - 1) * 90_000 - s < 22_500 + clock.latencyFrames { bar += 1 }
    return max(bar, clock.nextCommitBar)
}
```

**Requesting the scheduled Live Activity.**

```swift
func scheduleBoard(_ launch: Launch) throws {
    guard ActivityAuthorizationInfo().areActivitiesEnabled else { return }
    let state = LaunchAttributes.ContentState(phase: .WAKE, firstDownbeat: launch.firstDownbeatDate,
                                              door: launch.doorDate, audioAnchored: false)
    let activity = try Activity.request(
        attributes: LaunchAttributes(launchId: launch.id, role: settings.myRole, hornOffsetText: "horns at T-3:15"),
        content: .init(state: state, staleDate: launch.doorDate.addingTimeInterval(20 * 60)),
        pushType: nil, style: .standard,
        alertConfiguration: AlertConfiguration(title: "Launch window open", body: "Augustine has the floor.", sound: .named("board_on.caf")),
        start: launch.firstDownbeatDate.addingTimeInterval(5))
    launch.activityId = activity.id
}
```

**An App Intent that starts a Request Line song.**

```swift
enum RequestLineSong: String, AppEnum {
    case teeth, microwave, kettle, shower
    static let typeDisplayRepresentation = TypeDisplayRepresentation(name: "Request Line song")
    static let caseDisplayRepresentations: [Self: DisplayRepresentation] =
        [.teeth: "Teeth 2:00", .microwave: "Microwave 1:30", .kettle: "Kettle 3:00", .shower: "Shower 5:00"]
}
struct StartRequestLineIntent: LiveActivityIntent {
    static let title: LocalizedStringResource = "Play a Request Line song"
    static let supportedModes: IntentModes = [.background, .foreground(.dynamic)]
    @Parameter(title: "Song") var song: RequestLineSong
    func perform() async throws -> some IntentResult & ProvidesDialog {
        try await Station.shared.play(song, continueInForeground: systemContext.canContinueInForeground)
        return .result(dialog: "On air: \(RequestLineSong.caseDisplayRepresentations[song]!)")
    }
}
struct DoorhornShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(intent: StartRequestLineIntent(), phrases: ["Start \(\.$song) on \(.applicationName)"],
                    shortTitle: "Request Line", systemImageName: "antenna.radiowaves.left.and.right")
    }
}
```

---

## 15. Test plan

**Unit tests (DoorhornCore, macOS CI).** Arranger: for every duration × item count 0…12 × hold × crew × 200 seeds, bar count equals the table, phases are in order, the horn assertion holds, the bridge meets its minimum, every unit is a whole read, and no two seeds in a 60-day window collide. Bar math: `sample(ofBar:)` is exact for bars 1…640; Re-entry boundaries sum to 57,600,000; the tap rule maps 10,000 random positions to the right boundary with the one-beat lead and a 2.0 s latency. The credits assembler and entitlement logic are pure and tested the same way.

**Audio timing harness (DoorhornAudioTests).** The engine runs in manual rendering mode (`enableManualRenderingMode`, `renderOffline`) [18] with click stems whose transients sit on bar 1 beat 1; the harness renders a 12-minute plan with punch-ins, a layer change and a Scrub at random taps, detects onsets in the output, and reports bar-alignment error in milliseconds per event; pass is ≤ 1.0 ms offline. On device the `.dataRendered` completion host time is compared with the scheduled sample's host time; pass is ≤ 5 ms on the speaker and a constant offset of `outputLatency` ± 50 ms on AirPlay.

**Device matrix.** One Dynamic Island iPhone with an Action Button (iPhone 15 Pro or later) on iOS 26 and on iOS 27; one iPhone without the Dynamic Island on iOS 26 (banner presentation); one older supported iPhone for CPU and memory; the iPhone Duo (iOS 27.1, October 2026 per the aesthetic digest) added as a compatibility pass [65]; iPad in compatibility mode once.

**AirPlay and HomePod checks.** Start on speaker, hand off to HomePod mid-WAKE and back; start already routed to HomePod; Bluetooth speaker; confirm the Live Activity T-0 coincides with the fanfare heard in the room; confirm Scrub lands on a bar as heard; confirm engine recovery after a route change.

**AlarmKit and Focus.** Authorization not determined, granted, denied (the app must still start every launch from the widget, per 01 [69]); custom sound plays in full; alarm alerts under Do Not Disturb, Sleep Focus and Silent switch/Action Button silent; Stop and "Open the launch" each start playback; force-quit before the alarm; reboot without unlock before the alarm; the scheduled Live Activity appears and its Start button works.

**StoreKit.** A local `.storekit` configuration with Full Crew marked Family Sharing [47]; StoreKitTest sessions for purchase, restore, refund, revocation, Ask to Buy deferred and approved, interrupted purchase [48]; a Sandbox Test Family for gaining and losing shared access, checking the `familyShared` ownership type and revocation [45].

---

## 16. Risk register

| Risk | Mitigation |
|---|---|
| Zero-tap start is unverified: an intent launched in the background may not be allowed to begin audio. | Week-2 spike; the secondary button opens the app in the foreground, where playback is guaranteed; late-join keeps T-0. |
| AlarmKit custom sound cap and post-force-quit firing are unverified; forum reports of late alarms [72]. | Station ID at 28 s PCM; spike force-quit and reboot cases; the scheduled Live Activity and the widget are second and third ways in. |
| Scheduled Live Activity after termination, and Live Activity alerts under Focus, are unverified. | The alarm is the trigger; the board is a fallback surface; nothing waits on it. |
| AirPlay's 2-second latency and engine reconfiguration on route change [20]. | Latency added to commit lead and Live Activity dates; deterministic restart on configuration change; measured in the harness. |
| AAC priming frames breaking bar-exact reads [25]. | Decoded-length gate per asset class; ALAC fallback already in the schema. |
| ODR deprecation; Background Assets extension complexity [55]. | Apple-Hosted Background Assets from day one; bundle-everything fallback at ~470 MB. |
| Live Activity limits: 8-hour maximum, simultaneous-activity cap that scheduled activities count toward [10]. | One activity per event, ended at T-0 + 8 s; Re-entry's activity ends at the buzzer; the Hangar is widgets, not an activity. |
| `play(at:)` deprecated in iOS 27 [16][17]. | One `startAll` helper switches on availability. |
| Family Sharing is irreversible [44]. | Decision made deliberately with 05; revocation handled via `revocationDate`. |
| Widget process reads SwiftData while the app writes. | Widget is read-only; app reloads timelines after every write [37]. |
| 4.3(b) "simple timers" review exposure (WINNER.md) [70]. | The annotated score is screen one; Notes for Review name the section map, roll call and in-song manifest. |
| Suno legal exposure and model retirement (Suno digest) [64]. | Audio is a replaceable layer under copyrightable maps, lyrics and code; the pipeline regenerates from maps. |
| Scope creep from the grafts (WINNER.md) [70]. | The phase plan below; v1 ships when the first morning proves the feel. |
| Liquid Glass changes in iOS 27 breaking custom bars (third-party claim in the aesthetic digest, unverified) [65]. | Colour in the content layer only; system glass for navigation; test at both ends of the iOS 27 slider. |

---

## 17. Build plan

**v1 (16 weeks).** W1 skeleton, DoorhornCore package, schema validator, StoreKit config, macOS CI. W2 spikes: AlarmKit sound, Stop and secondary intents, force-quit and reboot, scheduled Live Activity; decide the trigger contract. W3 AudioEngine: aligned players, per-bar commits, tap quantizer, harness at ≤ 1 ms. W4 Arranger: all durations, bridge rule, horn assertion, daily variation, tests. W5 end-to-end morning on device (alarm → start → Live Activity → T-0 → log) and the Test Fire on the same pipeline. W6 Manifest and Hold item: SwiftData, editor, bank assembly, last-seen memory, ageing, amnesty, victory sting. W7 Scrub and Mission Log: bar-quantized abort, klaxon, weather entry, rating, editable yesterday, shorter-tomorrow. W8 Re-entry: six segments, reversed phases, buzzer, bedtime alarm and activity. W9 Request Line v1 (teeth, microwave, kettle): exact-length playback, ON AIR activity, intents, App Shortcuts, Action Button and NFC help. W10 Onboarding (score screen, door time, Test Fire, AirPlay picker), Settings, Background Assets spike and decision. W11 StoreKit 2: paywall, entitlement cache, restore, Family Sharing, Small Business Program enrolment (15% commission) [66]. W12 final audio integration (marching band, lullaby, three songs, banks, stings), loudness, volume ramp, quiet mode. W13 device matrix, AirPlay and HomePod, Focus and permission tests, battery. W14 accessibility (VoiceOver, Dynamic Type, Reduce Motion), Liquid Glass polish, icon, StandBy layouts. W15 TestFlight with ten households, fixes, review notes, screenshots, privacy label, age rating. W16 buffer and submission.

**Definition of done for v1.** A new install reaches the end of the Test Fire in under 60 seconds; a scheduled launch starts from the alarm with at most one tap and reaches T-0 within ±5 ms of the audio grid on speaker and within `outputLatency` ± 50 ms on AirPlay; Scrub lands on a bar every time in 50 tries; the manifest bridge sings every bank item and Lionel reads the rest; Re-entry ends on the buzzer at 20:00.000; the mission log survives reinstall; the paywall purchases, restores and shares in the sandbox; the free bundle is under 150 MB; no network calls other than StoreKit and asset packs appear in a proxy trace; zero crashes across 200 TestFlight mornings.

**v1.1 (4 weeks).** Full Request Line library via asset packs, rotation rule, End Credits assembly, the card renderer, the clothesline widget, Control Center control. **v1.2 (4 weeks).** Crew patches, walk-up cues, Stem Roll Call with pass-the-phone confirmation, role-cue markers in the Live Activity. **Season Two.** CloudKit household share through a second `ModelConfiguration`, the 5 p.m. Fuel segment, a second launch melody.

---

## 18. Open questions

1. Can a `LiveActivityIntent` launched by the alarm's Stop button activate the audio session and start playback without the app in the foreground? (Decides zero-tap versus one-tap.)
2. Does AlarmKit enforce the 30-second custom sound rule, and does the alarm fire after force-quit and after a reboot without unlock?
3. Does a scheduled Live Activity start when the app has been terminated, and is its alert suppressed under Focus?
4. Does an AirPlay handoff mid-launch stop `AVAudioEngine`, and how long does the restart take on a HomePod?
5. Does `AVAudioFile.length` compensate for AAC priming on every asset class, or does the whole role-stem class go ALAC?
6. Is a managed Background Download extension acceptable overhead for one developer, or does v1 bundle everything?
7. How should the app behave when `AlarmManager` authorization is denied: notifications with the station ID (suppressed by Focus) or the widget only?
8. Should the Hangar's in-app screen exist at all given Apple's guidance on the idle timer, or is StandBy's widget pair enough?
9. Which system voice reads the non-bank manifest items, and is a spoken fallback acceptable to the music document?
10. Should the section map carry `phaseOffsetsMs` (proposed here) or should the engine derive the horn offset from the DOOR + TAG bars?

---

### References

[1] https://developer.apple.com/documentation/AlarmKit/scheduling-an-alarm-with-alarmkit · [2] https://developer.apple.com/videos/play/wwdc2025/230/ · [3] https://developer.apple.com/documentation/alarmkit/alarmmanager/alarmconfiguration · [4] https://developer.apple.com/documentation/alarmkit/alarmmanager/alarmconfiguration/alarm(schedule:attributes:stopintent:secondaryintent:sound:) · [5] https://developer.apple.com/documentation/alarmkit/alarmpresentation/alert-swift.struct · [6] https://developer.apple.com/documentation/bundleresources/information-property-list/nsalarmkitusagedescription · [7] https://developer.apple.com/documentation/activitykit/alertconfiguration/alertsound/named(_:) · [8] https://developer.apple.com/documentation/usernotifications/unnotificationsound · [9] https://developer.apple.com/documentation/activitykit/activity/request(attributes:content:pushtype:style:alertconfiguration:start:) · [10] https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities · [11] https://developer.apple.com/design/human-interface-guidelines/live-activities · [12] https://developer.apple.com/documentation/appintents/liveactivityintent · [13] https://developer.apple.com/videos/play/wwdc2026/223/ · [14] https://developer.apple.com/documentation/avfaudio/avaudioplayernode · [15] https://developer.apple.com/documentation/avfaudio/avaudiotime · [16] https://developer.apple.com/documentation/avfaudio/avaudioplayernode/play(at:) · [17] https://developer.apple.com/documentation/avfaudio/avaudioplayernode/playaudio(at:) · [18] https://developer.apple.com/documentation/avfaudio/avaudioengine · [19] https://developer.apple.com/documentation/avfaudio/avaudiofile · [20] https://developer.apple.com/documentation/avfaudio/avaudiosession/outputlatency · [21] https://developer.apple.com/documentation/avfoundation/configuring-your-app-for-media-playback · [22] https://developer.apple.com/documentation/xcode/configuring-background-execution-modes · [23] https://developer.apple.com/documentation/avfaudio/avaudiosession/category-swift.struct/playback · [24] https://developer.apple.com/library/archive/documentation/Audio/Conceptual/AudioSessionProgrammingGuide/AudioGuidelinesByAppType/AudioGuidelinesByAppType.html · [25] https://developer.apple.com/library/archive/qa/qa1636/_index.html · [26] https://developer.apple.com/documentation/audiotoolbox/kaudiofilepropertypackettableinfo · [27] https://developer.apple.com/documentation/appintents/app-shortcuts · [28] https://developer.apple.com/videos/play/wwdc2025/244/ · [29] https://developer.apple.com/documentation/appintents/appintent/supportedmodes · [30] https://developer.apple.com/documentation/appintents/appintent/openappwhenrun · [31] https://support.apple.com/guide/shortcuts/run-shortcuts-with-the-action-button-apdfea15680b/ios · [32] https://support.apple.com/guide/shortcuts/setting-triggers-apde31e9638b/ios · [33] https://support.apple.com/guide/shortcuts/event-triggers-apd932ff833f/ios · [34] https://developer.apple.com/documentation/widgetkit · [35] https://developer.apple.com/design/human-interface-guidelines/widgets · [36] https://developer.apple.com/documentation/widgetkit/keeping-a-widget-up-to-date · [37] https://developer.apple.com/documentation/widgetkit/widgetcenter/reloadtimelines(ofkind:) · [38] https://developer.apple.com/documentation/swiftui/environmentvalues/isactivityfullscreen · [39] https://developer.apple.com/documentation/swiftui/text/init(timerinterval:pausetime:countsdown:showshours:) · [40] https://developer.apple.com/documentation/swiftui/progressview/init(timerinterval:countsdown:label:currentvaluelabel:) · [41] https://developer.apple.com/documentation/storekit/transaction/currententitlements · [42] https://developer.apple.com/documentation/storekit/appstore/sync() · [43] https://developer.apple.com/documentation/storekit/transaction/updates · [44] https://developer.apple.com/documentation/storekit/supporting-family-sharing-in-your-app · [45] https://developer.apple.com/documentation/storekit/testing-family-sharing · [46] https://developer.apple.com/documentation/storekit/product/isfamilyshareable · [47] https://developer.apple.com/documentation/xcode/setting-up-storekit-testing-in-xcode · [48] https://developer.apple.com/documentation/storekit/testing-at-all-stages-of-development-with-xcode-and-the-sandbox · [49] https://developer.apple.com/documentation/swiftdata · [50] https://developer.apple.com/documentation/swiftdata/modelconfiguration · [51] https://developer.apple.com/documentation/swiftdata/modelconfiguration/groupcontainer-swift.struct · [52] https://developer.apple.com/documentation/backgroundassets · [53] https://developer.apple.com/documentation/backgroundassets/assetpackmanager · [54] https://developer.apple.com/videos/play/wwdc2025/325/ · [55] https://developer.apple.com/help/app-store-connect/reference/app-uploads/on-demand-resources-size-limits · [56] https://developer.apple.com/documentation/avkit/avroutepickerview · [57] https://developer.apple.com/documentation/uikit/uiapplication/isidletimerdisabled · [58] https://developer.apple.com/documentation/avfaudio/avspeechsynthesizer · [59] https://developer.apple.com/documentation/avfaudio/avaudiosession/routechangenotification · [60] https://developer.apple.com/documentation/avfaudio/avaudiosession/currentroute · [61] https://developer.apple.com/documentation/bundleresources/information-property-list/nssupportsliveactivities · [62] https://developer.apple.com/documentation/alarmkit/alarmpresentation/alert-swift.struct/secondarybuttonbehavior-swift.enum · [63] https://developer.apple.com/videos/play/wwdc2025/278/ · [64] Suno digest, scratchpad/digest/research-suno-commercial-use-terms-….md · [65] scratchpad/digest/research-aesthetic-research.md · [66] scratchpad/digest/research-monetization-research.md · [67] concepts/doorhorn/03-music-system.md · [68] concepts/doorhorn/05-monetization-and-app-store.md · [69] concepts/doorhorn/01-product-spec.md · [70] concepts/tournament/WINNER.md · [71] https://developer.apple.com/documentation/avfaudio/avaudioplayernode/schedulesegment(_:startingframe:framecount:at:completioncallbacktype:completionhandler:) · [72] https://developer.apple.com/forums/thread/807752 · [73] https://developer.apple.com/videos/play/wwdc2026/378/
