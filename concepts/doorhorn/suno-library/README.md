# Doorhorn (working title) — Suno library: how to use it

This folder holds the paste-ready prompt library for every track in Doorhorn (working title), the mission-control morning-launch and bedtime re-entry app described in `concepts/tournament/WINNER.md`. `suno-library.md` is the human-readable library (57 numbered entries in seven sections); `suno-library.json` is the same entries as a JSON array for the app and the engineering document. Every lyric and script in the library was written by a person; Suno produces the audio from them.

## 1. Account tier and model line

Generate everything on a **Premier** subscription, and nothing on the free tier. Commercial rights attach only to a "permitted download" made on a paid tier: Suno's Terms of Service (effective 3 September 2026) assign Output rights to Pro and Premier subscribers but allow commercial exploitation only for downloaded Output, and free-tier songs are personal, non-commercial and cannot be licensed retroactively by upgrading later (Terms of Service, https://suno.com/terms-of-service; help centre, https://help.suno.com/en/articles/2425729). Premier is the right tier for three reasons: it has 60 downloads a month against Pro's 20; it includes Suno Studio, whose exports are not counted against the monthly cap; and it includes Advanced Split, the Premier-only stem mode the launch tracks need for the four role stems and the calm/medium/intense layers (pricing, https://suno.com/pricing; download FAQ, https://help.suno.com/en/articles/13614785; stems, https://help.suno.com/en/articles/12702337). One song is one download whatever the format, and all stems from a song are part of that one download, so route stem and WAV exports through Studio. Extra platform downloads cost about $2.99 each (https://roo.beehiiv.com/p/suno-download-prices-explained); Premier is reported at $30 monthly or $24 on annual billing, so confirm at checkout.

Select the **v6** model line for every entry. v6 and v6-wild are paid-tier models; v6-mini is the free model and its output carries no commercial rights, so never use it even for tests that might be kept (release notes, https://suno.com/release-notes/introducing-v6). The library specifies v6 throughout. v6-wild is an undocumented option for the Farrago and Scrub entries if v6 plays them too straight; treat it as an experiment and log it. Generate only while subscribed; the ownership test in Suno's help centre is "was I subscribed when I made the song?" (https://help.suno.com/en/articles/2416769).

## 2. How to paste an entry

Open Create, switch to **Custom** mode, and fill four fields from the entry:

- **Title**: the entry's `title` (limit 100 characters; every title here is under 80).
- **Style of Music**: the entry's `style_prompt` verbatim (limit 1,000 characters; the longest here is 647). The prompts front-load genre, tempo, key, instruments, mood and vocal type, which is the order the model weights most (https://hookgenius.app/learn/suno-character-limits/).
- **Lyrics**: the entry's `lyrics` verbatim, including the square-bracket meta tags on their own lines (limit 5,000 characters; the longest here is about 4,500). Tags such as `[Verse 1: WAKE, drumline cadence]` and `[Spoken, calm female]` are probabilistic hints, not commands (https://blakecrosley.com/guides/suno).
- **Exclude Styles**: the entry's `exclude_styles` verbatim (limit 1,000).

For instrumental entries, toggle **Instrumental** on and leave `[Instrumental]` in the Lyrics box as written; both together are more reliable than either alone. Leave Weirdness, Style Influence and Variety at their defaults on the first generation; change one setting at a time with identical lyrics if a take is off (https://moelueker.com/blog/suno-v6-guide). Set Vocal Gender where the entry's `vocal_lane` states one. The tap-sound batch (entry 51) is the one entry that uses **Sounds** mode, which makes key- and tempo-locked one-shots and loops on Pro and Premier (https://suno.com/release-notes/make-loops-and-samples-from-scratch-with-sounds); its `lyrics` field lists the twelve variant lines.

Do not paste entry 4 (the shared launch lyric and slot map); it exists for the app and the engineering document. Entries 5 to 10 carry the same lyric with Example A filled in.

## 3. One voice per crew member: personas

Each character has a genre lane, not a voice lock, because Suno Personas preserve an essence rather than an exact voice, and lanes make drift invisible. Voices (the voice-model feature) are for your own voice only and are not used here (Terms of Service; release notes, https://suno.com/release-notes). The workflow is:

1. Generate the five **persona source** entries first, with extra takes: entry 1 (Augustine Pell), entry 32 (Gus Marchetti), entry 30 (Dr. Ines Farrago), entry 16 (Bunny Kowalczyk) and entry 36 (Scrub). Each is a single-voice song, which gives the cleanest persona.
2. On the accepted take, create a Persona and name it after the character; follow the current UI, since the menu wording changes.
3. Select that Persona whenever the entry's `vocal_lane` names it. Lionel Abara has no lane of his own; he is a low spoken "copy" inside other entries and a ten-line bank (entry 52).

Only after the personas exist, generate the marching band launch master (entry 5) and accept it. Then make the other five flavors (entries 6 to 10) as **Covers** of that master with each flavor's style prompt and the byte-identical lyric, so the six share one melody. Covers exist (September 2024) but the digest does not confirm they preserve tempo or key; check both on every cover.

## 4. Exact lengths and trimming

v6 generates up to eight minutes in one pass and has no reliable duration control (the v5.5 duration slider is legacy; https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/suno-duration-slider-control-song-length-in-v5-5), so exact lengths come from arithmetic, not from a setting:

- **The house grid is 128 BPM in G major** for all daytime music. At 128 BPM a bar is 1.875 s and four bars are 7.5 s, so every Request Line length (1:00, 1:30, 2:00, 3:00, 4:30, 5:00, 10:00) and every launch phase boundary is a whole number of four-bar phrases, and one bank of Gus's sung manifest lines fits both the morning bridge and the night credits. Re-entry descends 80, 72, 64, 56 BPM; those tempos make each five-minute segment a whole number of bars.
- Every lyric is written to fill its bar count, and each entry names the bar where each cue must land. Generate, then measure the tempo with a BPM detector: within 3% of target, time-stretch to exact (pitch-preserving); further off, reject the take.
- Trim in a DAW at bar boundaries: head to the first downbeat, tail to the last bar. Cut instrumental bars, never a sung cue. Record the measured second of every cue in the section-map JSON; the app reads that map, and also fires its own short cue clip at the exact second, so the sung cue is the flavor and the app's cue is the guarantee.
- Loops (Hangar beds, forecast bed) are prompted "seamless loop, no intro, no outro, exactly N BPM" and cut between two downbeats at zero crossings (https://hookgenius.app/learn/suno-for-game-developers/). Ship PCM or ALAC-in-CAF and loop with AVAudioEngine; AAC priming frames break gapless playback (Apple QA1636, https://developer.apple.com/library/archive/qa/qa1636/_index.html).
- The ten-minute song exceeds one generation: make Part A, then Extend with the Part B lyric, or generate both halves and join at bar 161.

## 5. Takes and what to listen for

Each entry's `generation_tips` state the number of generations (two songs per 10-credit generation): two for stings and cues, three for most songs, four for launches and banks, five or six for persona sources. Listen, in order, for tempo lock, cue placement, lane match (is this the same person as the persona source), intelligible spoken lines at low volume, and a hard ending with no fade. Keep the take with the best timing over the best mix; timing cannot be fixed later, mix can. Use Replace Section (10 to 30 s, Pro and Premier) for a single wrong phrase before regenerating a whole song. Never use Remix: remixed output is non-commercial on every tier (Terms of Service).

Budget: about 1,700 credits for the generations plus about 1,300 for Advanced Split (20 credits a stem) and Auto Split (50 credits a song), inside one Premier month's 10,000. One Studio download per accepted song sits well inside the concept's plan of about 45 for a beta and 110 by launch.

## 6. Naming scheme

Download every accepted take as WAV and name it before anything else touches it:

`DH_<section>_<id>_t<take>_<YYYYMMDD>_<model>_<tier>.wav`

for example `DH_B_launch-marching-band_t03_20261002_v6_premier.wav`. Stems append `_stem-<name>` (`_stem-drums`, `_stem-brass`, `_stem-vocal`), layers append `_layer-calm`, and bank clips append the line key from the entry (`_manifest-item-lunchbox`). Keep two trees: `/originals` (untouched downloads, with a SHA-256 checksum file) and `/derived` (trimmed WAV masters and the CAF files the app bundles). Never modify anything in `/originals`.

## 7. Records for commercial rights

Suno disclaims that copyright vests in Output, and US law treats purely prompt-generated audio as uncopyrightable (Copyright Office Part 2 report, https://copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf; Thaler v. Perlmutter cert denied 2 March 2026). What the app owns is the human layer: the lyrics, scripts, section maps, characters and arrangements. Apple's guidelines 5.2.1 and 5.2.2 require you to hold the rights and to comply with the third party's terms, with authorisation available on request (https://developer.apple.com/app-store/review/guidelines/). Keep, off-platform and backed up:

1. **Dated receipts** for every month of Premier, plus a dated screenshot of the pricing page and a PDF of the Terms of Service version in force on each generation date.
2. **A prompt log**: one row per generation with date, entry id, model, the exact style prompt, lyrics and exclude text, Persona used, take numbers, the Suno song id and URL, and which take was accepted.
3. **A download ledger**: date, tier at download, platform or Studio route, filename and checksum, and whether stems were exported.
4. **Unmodified originals**: the WAV as downloaded, untouched, alongside every CAF derivative; do not strip or alter Suno's fingerprint or metadata (Terms of Service).
5. **Lyric authorship**: the dated source files for every lyric, registered with the Copyright Office as a literary collection, as WINNER.md specifies.

Do not prompt with artist names, band names or "in the style of" (none appear in this library), and do not let users generate or remix music in the app. Disclose in About: "Every line written by a person. Songs produced with Suno from those lyrics." The Sony and UMG suit of 18 to 19 September 2026 and the Munich GEMA ruling could change model availability, which is why the lyrics and section maps carry the value, the audio is a replaceable layer, and the station ID, fanfare and launch melody are re-recorded with a human musician in year one.

## 8. Controls the digest does not confirm

Test these on the first session rather than assuming them: whether Covers keep tempo and key; whether Extend keeps tempo; whether the model honours a requested key at all (check with a tuner); whether Sounds mode can make a six-second musical fanfare or foley such as a clothespin; the Sounds credit cost and whether Sounds output counts as a download; whether a music-free spoken-word generation (entry 52) is possible; the exact Persona menu wording; and what v6-wild changes. Where an entry depends on one of these, its tips give a fallback.
