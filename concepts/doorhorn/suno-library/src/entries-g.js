const { LANES, postSong, postLoop, postSting, tipsSong } = require('./helpers.js');

const G = 'G. Stings and sounds';

const stingTips = (listen, extra = []) => tipsSong({
  takes: 2,
  listen: [
    'Suno generates a whole track; you are shopping for one moment. ' + listen,
    'Reject anything with a slow swell in: stings must start on a transient because the app fires them on a bar boundary.',
  ],
  keep: 'Keep the take whose best moment needs the least editing.',
  extra,
});

const entries = [
  {
    id: 'sting-liftoff-fanfare',
    title: 'Sting — Liftoff Fanfare',
    section: G,
    purpose: 'The T-0 fanfare in Augustine\'s lane: six seconds of brass and snare that logs a clean launch, fired when all stems are in at T-0 or when the door is tapped in the Test Fire. Re-recorded with a human musician in year one, so this is the placeholder that defines the phrase.',
    plays_in: 'T-0 of every launch (over the outro of the launch track, on the bar), the Test Fire door tap, and the mission log\'s clean-launch confirmation.',
    model: 'v6',
    mode: 'Custom (Instrumental toggle on); alternative: Sounds mode One Shot if it can hold a six-second musical phrase (unconfirmed)',
    style_prompt: 'Brass fanfare, exactly 128 BPM, 4/4, key of G major, instrumental, short: a snare roll into a three-note rising trumpet fanfare with trombones and sousaphone underneath, cymbal crash on the final chord, the chord held for two beats and cut. Triumphant, clean, bright, a little stiff, like a ceremony that takes itself seriously. No vocals, no intro, no fade, no reverb wash.',
    exclude_styles: 'vocals, singing, slow, intro, fade out, synth, guitar, rock, pop, orchestra strings, lo-fi, long',
    vocal_lane: 'Instrumental; Augustine Pell\'s lane (brass and snare).',
    lyrics: '[Intro]\n[Instrumental: snare roll, three-note rising trumpet fanfare, crash, held chord, cut]\n[End]',
    bpm: 128,
    duration_seconds: 6,
    section_targets: { snare_roll: 0, fanfare: 0.9375, final_chord: 3.75, cut: 5.625, end: 6 },
    stems: [],
    generation_tips: stingTips('Listen for a fanfare whose three notes rise and land on the G major chord; it must be the same intervals every time the household hears it, so pick the most singable one.', [
      'Write the chosen three-note figure down (pitches and rhythm); it is the melodic hook the year-one human re-recording must reproduce and the phrase the Sunday Flight Review bed quotes.',
    ]),
    post_processing: postSting({
      trim: 'Cut from the first snare hit to the end of the held chord plus ring-out: 3 bars of music (5.625 s) and a 375 ms tail, 6.000 s total, ending in silence.',
      extra: ['Check it against every launch flavor\'s outro in G major; it plays on top of them.'],
    }),
  },
  {
    id: 'sting-scrub-klaxon',
    title: 'Sting — Scrub Klaxon ("Weather")',
    section: G,
    purpose: 'The comic abort sting in Scrub\'s lane: a sad slide whistle, a kazoo raspberry, a toy-piano tumble and Scrub declaring "Weather." Comic, never alarming; it tells the household the day is logged without penalty.',
    plays_in: 'When anyone presses Scrub; the launch track ducks, the klaxon plays, the Live Activity shows "Scrubbed: weather" and tomorrow offers the next-shorter track.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Toy-instrument comedy sting, 128 BPM, key of G major, four seconds of music: a slide whistle falling, a kazoo raspberry, a toy piano tumbling down the keys, one soft bicycle horn honk, then a tiny, squeaky, cheerful robot voice says one word. Silly, gentle, never harsh, no alarm sound, no siren. Dry, close, no reverb. No intro, no fade.',
    exclude_styles: 'siren, alarm, air horn, loud, harsh, distorted, scary, dark, orchestra, rock, synth, singing, intro, fade out, long',
    vocal_lane: LANES.scrub,
    lyrics: '[Intro]\n[Instrumental: slide whistle falling, kazoo raspberry, toy piano tumbling down, soft bicycle horn]\n[Spoken, tiny robot voice, cheerful] Weather.\n[End]',
    bpm: 128,
    duration_seconds: 5,
    section_targets: { slide_whistle: 0, tumble: 1, honk: 2.5, weather: 3, end: 5 },
    stems: [],
    generation_tips: stingTips('Listen for the word "Weather" spoken clearly after the tumble, and for a sting a four-year-old would find funny rather than scary.', [
      'Use the Scrub persona from entry 36. If the model refuses to keep it to one word, take the word from a clean take and the instruments from another; this sting is assembled anyway.',
    ]),
    post_processing: postSting({
      trim: 'Assemble: 3.0 s of instruments then the word; total 5.0 s ending in silence. The word must sit alone with nothing under it.',
      level: 'Loudness: -16 LUFS short-term, true peak -1 dBTP; deliberately quieter than the fanfare.',
    }),
  },
  {
    id: 'sting-hold-item-victory',
    title: 'Sting — Hold Item Victory',
    section: G,
    purpose: 'The victory sting when the household clears the Hold item: a banjo roll into a brass tag and one big chord, then Gus says "Cleared." Also plays when the amnesty verb declares a Hold item dead of natural causes, at half volume.',
    plays_in: 'Manifest screen on clearing or amnestying the Hold item; the End Credits also cue the Hold joke that night.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Victory sting, exactly 128 BPM, 4/4, key of G major, four seconds of music: a fast banjo roll with upright bass for two bars, then a full brass section lands a bright three-note tag and one big final chord with a cymbal crash, and a warm, unhurried baritone male speaks one word after the chord. Warm, proud, short, a little surprised. No intro, no fade.',
    exclude_styles: 'singing, slow, intro, fade out, synth, rock, pop, electric guitar, orchestra strings, lo-fi, long, dark',
    vocal_lane: LANES.gus,
    lyrics: '[Intro]\n[Instrumental: fast banjo roll with upright bass, two bars, then brass three-note tag and one big final chord with a crash]\n[Spoken, warm baritone, after the chord] Cleared.\n[End]',
    bpm: 128,
    duration_seconds: 5,
    section_targets: { banjo_roll: 0, brass_tag: 3.75, chord: 4.2, cleared: 4.5, end: 5 },
    stems: [],
    generation_tips: stingTips('Listen for the banjo-to-brass handoff being funny on its own (a bluegrass band suddenly owning a brass section) and "Cleared" being warm, not smug.', ['Use the Gus persona from entry 32.']),
    post_processing: postSting({
      trim: 'Cut from the first banjo note; brass tag at bar 3; the spoken word over the chord ring-out; 5.0 s total ending in silence.',
      extra: ['Make a second export at -6 dB for the amnesty case.'],
    }),
  },
  {
    id: 'sting-reentry-buzzer-lights-off',
    title: 'Sting — Re-entry Buzzer and Lights Off',
    section: G,
    purpose: 'The hard ending of the day in Bunny\'s lane: a low, round buzzer (final, not harsh), a lamp click, a two-note descending "lights off" figure, and Bunny\'s "Splashdown confirmed." The house goes dark on it.',
    plays_in: 'Cut in by the app on the final bar of Re-entry segment 4 (entries 15 and 19); the screen goes to the dark card; the End Credits follow after two seconds of silence.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Sign-off sting, 56 BPM, key of G major, five seconds: a low, round electric buzzer tone for one beat (final, not harsh, like a game-show end bell heard through a wall), a single lamp-switch click, a soft two-note descending figure on muted piano and vibraphone, then a low, smoky, unhurried late-night radio voice speaks two words and the room is silent. Dim, warm, final. No intro, no fade, no music after the words.',
    exclude_styles: 'siren, alarm, harsh, loud, distorted, singing, drums, intro, fade out, long, upbeat, bright',
    vocal_lane: LANES.bunny,
    lyrics: '[Intro]\n[Instrumental: low round buzzer, one beat; lamp switch click; two descending notes on muted piano and vibraphone]\n[Spoken, low, smoky, unhurried] Splashdown confirmed.\n[End]',
    bpm: 56,
    duration_seconds: 6,
    section_targets: { buzzer: 0, click: 1.1, lights_off_notes: 1.5, splashdown_confirmed: 3.2, silence: 5, end: 6 },
    stems: [],
    generation_tips: stingTips('Listen for a buzzer that ends the day without waking anyone who is already asleep, and for the click being a real, dry click.', [
      'Use the Bunny persona from entry 16. If the buzzer comes out harsh, take the buzzer from a Sounds One Shot ("low round buzzer, one beat, dry") and the rest from this take; the sting is assembled.',
      'Also save the isolated "Splashdown confirmed." as its own clip: the credits template (entry 20) may need it.',
    ]),
    post_processing: postSting({
      trim: 'Assemble: buzzer at 0.0 s, click at about 1.1 s, two notes, words at about 3.2 s, then one full second of true digital silence so the file itself is the dark.',
      level: 'Loudness: -20 LUFS short-term, true peak -3 dBTP; it follows the quietest music in the app.',
    }),
  },
  {
    id: 'taps-micro-batch',
    title: 'Micro tap sounds — batch of twelve (Sounds mode)',
    section: G,
    purpose: 'A dozen UI one-shots for taps and confirmations, made in Sounds mode so they are key-locked to G and dry. One base prompt plus twelve variant lines; run one One Shot per line.',
    plays_in: 'Every tap in the app: phase confirms, patch taps, roll-call punch-ins, manifest edits, the Hold item\'s daily age tick, the Scrub button press, menus, the credits card flip, the clothesline pin, AirPlay connect, the Test Fire button, and the microwave ding.',
    model: 'v6 (Sounds mode; Pro or Premier required)',
    mode: 'Sounds — One Shot (fallback: Custom with Instrumental on, trimmed by hand)',
    style_prompt: 'Base prompt for every one-shot: short UI sound, one hit, under half a second, dry, no reverb tail, no music, key of G, 128 BPM, toy-mechanical character: wood, brass, felt and paper, warm and small, like a well-made desk object. Append one variant line from the list.',
    exclude_styles: 'reverb, echo, music, melody, loop, synth pad, harsh, digital beep, glitch, long',
    vocal_lane: 'Instrumental; no lane. These belong to the building, not the crew.',
    lyrics: `[Instrumental]
Sounds mode has no lyrics box. Run twelve One Shots, appending one line each to the base prompt; the key in brackets is the file name.
1. [tap-confirm] a single wooden block tick
2. [phase-advance] two brass notes ascending, very short, staccato
3. [patch-tap] a snare rimshot with a felt mallet
4. [rollcall-punch-in] a short muted trumpet stab
5. [manifest-edit] a pencil scratch on paper with a soft click
6. [hold-age-tick] one music-box note, slightly detuned, short
7. [scrub-press] a big soft rubber button thunk, low
8. [menu-open] a brass valve click, pitched up
9. [menu-close] a brass valve click, pitched down
10. [card-flip] a paper flick with a snare ghost note
11. [clothesline-pin] a wooden clothespin snapping onto a line
12. [airplay-connect-and-ding] a two-note toy piano chime, bright, also used as the microwave ding
[End]`,
    bpm: 128,
    duration_seconds: 0.5,
    section_targets: { hit: 0, end: 0.5 },
    stems: [],
    generation_tips: [
      'Sounds mode (One Shot) is confirmed in the digest for Pro and Premier with key and tempo selection; its credit cost (reported as 2) and whether Sounds output counts as a download are not confirmed by Suno\'s own docs, so log each one-shot as if it counts.',
      'Run each variant twice; keep the drier one. Reject any hit with a tail longer than 400 ms or with pitch that is not G (or a G chord tone).',
      'If Sounds mode cannot make a specific sound (the pencil scratch and clothespin are the likely misses), fall back to Custom mode with Instrumental on, "foley, single sound, dry" in the style prompt, and trim by hand.',
      'Generate all twelve in one sitting so they share a character; they are heard hundreds of times a week and must sound like one set.',
    ],
    post_processing: [
      'Trim each to the transient: 0 ms pre-roll, natural decay, hard limit 500 ms, 10 ms fade at the end.',
      'Loudness: peak-normalise all twelve to -12 dBFS, then match by ear so the scrub-press is the loudest and the hold-age-tick the quietest; true peak -1 dBTP.',
      'Export PCM CAF at 48 kHz, mono; keep the originals in /originals with the Sounds prompt logged per file.',
    ],
  },
  {
    id: 'capcom-copy-bank',
    title: 'CAPCOM "copy" bank (Lionel Abara, 10 spoken clips)',
    section: G,
    purpose: 'Ten spoken variations of "copy" for Lionel Abara, whose entire job is to say it. Used as roll-call confirms, phase acknowledgements and the occasional unprompted copy at home.',
    plays_in: 'Roll-call confirm when a stem punches in, phase advance in quiet mode, the mission log\'s "logged" confirmation, and one random unprompted "copy" per week in the Hangar.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Spoken word only, no music, no instruments, dry studio voice, close microphone. A low, dry, deadpan, unimpressed male voice says a short phrase, pauses for two seconds of silence, and says the next; every phrase is a variation of the word "copy"; never sung, never enthusiastic. Clean silence between phrases. Nothing else on the recording.',
    exclude_styles: 'music, instruments, singing, melody, beat, drums, reverb, echo, background, enthusiasm, shouting',
    vocal_lane: LANES.lionel,
    lyrics: `[Spoken word, no music, low dry male voice, two seconds of silence between lines]
Copy.
Copy that.
Copy, Flight.
Copy. Go.
Copy. Standing by.
Copy, all stations.
Copy. Manifest received.
Copy. Door.
Copy. Splashdown.
Copy... copy.
[End]`,
    bpm: 0,
    duration_seconds: 30,
    section_targets: { first_copy: 0, end: 30 },
    stems: ['Vocal stem (Auto Split) if any music leaks in; otherwise none'],
    generation_tips: tipsSong({
      takes: 3,
      listen: [
        'A music-free spoken-word generation is not a documented Suno feature; the Exclude field and "no music" in the prompt usually get close but not always. Listen for any bed under the voice and Auto Split it out if present.',
        'Keep the voice flat and dry; the joke is that he is never surprised. Reject takes that inflect "copy" as a question.',
      ],
      keep: 'Keep the take with the most even ten lines; the pauses can be fixed in the edit.',
      extra: ['If v6 will not produce clean spoken word, generate it over a soft snare cadence in Augustine\'s lane instead and ship the vocal stem only.'],
    }),
    post_processing: [
      'Slice into ten clips at the pauses; 0 ms pre-roll on the consonant, 200 ms tail, no fade on the word.',
      'Name by line: copy-01 to copy-10, with a manifest of which phrase each holds.',
      'Loudness: match all ten to -18 LUFS short-term, true peak -3 dBTP; they sit under music.',
      'Export PCM CAF 48 kHz mono; keep the original in /originals.',
    ],
  },
  {
    id: 'hangar-lounge-1-night-shift-hum',
    title: 'Hangar lounge 1 — Night Shift Hum (loop)',
    section: G,
    purpose: 'The first of two overnight Hangar beds in Bunny\'s lane: a two-minute seamless late-night jazz loop for the colour-bars StandBy screen between splashdown and T-12.',
    plays_in: 'Hangar StandBy mode overnight (optional, off by default, volume very low); also under the mission log and settings screens.',
    model: 'v6',
    mode: 'Custom (Instrumental toggle on)',
    style_prompt: 'Late-night jazz, seamless loop, no intro, no outro, exactly 64 BPM, 4/4, key of G major, instrumental. Brushed drums with no fills, upright bass walking slowly, sparse piano, a muted trumpet far away, vibraphone, a faint radio-static texture; the same two-chord vamp for the whole track with no build and no climax. Dim, warm, patient, a control room at 3 a.m. No vocals, no fade.',
    exclude_styles: 'vocals, singing, intro, outro, fade out, build, climax, drum fills, key change, tempo change, big band, rock, synth, electric guitar, saxophone solo, loud',
    vocal_lane: 'Instrumental; Bunny Kowalczyk\'s lane (late-night jazz).',
    lyrics: '[Instrumental]\n[Intro: none, loop starts on the vamp]\n[Verse: two-chord vamp, brushes, bass, piano, muted trumpet far away, thirty-two bars]\n[Verse: same vamp, vibraphone joins, thirty-two bars]\n[Outro: none, loop ends on the vamp]',
    bpm: 64,
    duration_seconds: 120,
    section_targets: { loop_start: 0, vibraphone_joins: 60, loop_end: 120 },
    stems: [],
    generation_tips: tipsSong({
      takes: 3,
      listen: ['Listen for a vamp that is the same in bar 1 as in bar 32, no fills, no build; the digest\'s loop practice ("seamless loop, no intro, no outro, exactly N BPM", avoid "building" and "climax") is written into the prompt.', 'Reject takes with a trumpet solo; it should never draw attention.'],
      keep: 'Keep the take with the flattest dynamics.',
      extra: ['Toggle Instrumental on and keep [Instrumental] in the lyrics box.'],
    }),
    post_processing: postLoop(64, 32),
  },
  {
    id: 'hangar-lounge-2-colour-bars',
    title: 'Hangar lounge 2 — Colour Bars (loop)',
    section: G,
    purpose: 'The second overnight Hangar bed in Dr. Farrago\'s lane: a two-minute seamless theremin-flecked lounge loop, the sound of a weather desk nobody is sitting at.',
    plays_in: 'Hangar StandBy mode overnight, alternating nightly with entry 53; also under Dr. Farrago\'s screen when the forecast bed (entry 56) is not playing.',
    model: 'v6',
    mode: 'Custom (Instrumental toggle on)',
    style_prompt: 'Space-age lounge, seamless loop, no intro, no outro, exactly 64 BPM, 4/4, key of G major, instrumental. Soft theremin swells, vibraphone, bongos played with fingers, a slow electric bass, a small string pad, a faint tape hiss; the same two-chord vamp for the whole track with no build and no climax. Dim, curious, a little eerie but kind. No vocals, no fade.',
    exclude_styles: 'vocals, singing, intro, outro, fade out, build, climax, drum fills, key change, tempo change, horror, dark ambient, rock, synth pop, loud',
    vocal_lane: 'Instrumental; Dr. Ines Farrago\'s lane (theremin-flecked lounge).',
    lyrics: '[Instrumental]\n[Intro: none, loop starts on the vamp]\n[Verse: two-chord vamp, vibraphone, bongos, bass, theremin swells, thirty-two bars]\n[Verse: same vamp, string pad joins, thirty-two bars]\n[Outro: none, loop ends on the vamp]',
    bpm: 64,
    duration_seconds: 120,
    section_targets: { loop_start: 0, strings_join: 60, loop_end: 120 },
    stems: [],
    generation_tips: tipsSong({
      takes: 3,
      listen: ['Listen for the theremin staying a texture, not a melody; the loop must be ignorable.', 'Reject takes that drift toward horror; it is a weather desk, not a haunted one.'],
      keep: 'Keep the take with the flattest dynamics and an audible theremin.',
      extra: ['Toggle Instrumental on and keep [Instrumental] in the lyrics box.'],
    }),
    post_processing: postLoop(64, 32),
  },
  {
    id: 'sunday-flight-review-bed',
    title: 'Sunday Flight Review bed (2:00)',
    section: G,
    purpose: 'The two-minute instrumental bed under the Sunday Flight Review in Augustine\'s lane: a lighter brass-and-snare arrangement in four sections that the review screen steps through (the week\'s launches in colour, the scrubs in greyscale, the crew\'s notes, the rating), quoting the liftoff fanfare figure at the end.',
    plays_in: 'Sunday Flight Review, played once on the first open on a Sunday; the station ID checklist (entry 3) precedes it.',
    model: 'v6',
    mode: 'Custom (Instrumental toggle on)',
    style_prompt: 'Light marching-band arrangement, exactly 128 BPM with a relaxed half-time feel, 4/4, key of G major, two minutes, instrumental, in four clear sixteen-bar sections: (1) muted trumpets and brushed snare, warm; (2) the brass drops out to sousaphone and rim clicks, greyer and quieter; (3) glockenspiel and one trombone, conversational; (4) the full brass returns with a three-note rising trumpet fanfare and a final chord. Tidy, fond, official, a small ceremony. No vocals, short intro, hard ending, no fade.',
    exclude_styles: 'vocals, singing, rock, pop, EDM, synth, guitar, strings, rap, fade out, tempo change, long intro, loud drums',
    vocal_lane: 'Instrumental; Augustine Pell\'s lane (brass and snare).',
    lyrics: '[Instrumental]\n[Intro: brushed snare, two bars]\n[Verse: launches in colour, muted trumpets and brushed snare, sixteen bars]\n[Verse: scrubs in greyscale, sousaphone and rim clicks only, quieter, sixteen bars]\n[Bridge: crew notes, glockenspiel and one trombone, sixteen bars]\n[Outro: rating, full brass, three-note rising trumpet fanfare, final chord, fourteen bars]\n[End]',
    bpm: 128,
    duration_seconds: 120,
    section_targets: { intro: 0, launches_in_colour: 3.75, scrubs_in_greyscale: 33.75, crew_notes: 63.75, rating_and_fanfare: 93.75, end: 120 },
    stems: ['Full mix', 'Optional: the four sections exported separately so the app can hold a section while the person reads'],
    generation_tips: tipsSong({
      takes: 3,
      listen: ['Listen for four audibly different sections; the review screen changes on each, and the greyscale section must be the quietest.', 'The closing fanfare should be the same three-note figure as entry 47; if it is not, it is fine, but note it, and prefer the take that quotes it.'],
      keep: 'Keep the take whose section changes are clearest.',
      extra: ['Toggle Instrumental on and keep [Instrumental] in the lyrics box.'],
    }),
    post_processing: postSong(128, {
      extra: ['Trim to 64 bars (120.000 s); mark the four section boundaries in the section map at bars 3, 19, 35 and 51 as measured.', 'Cut each section to its own loopable file (16 bars) in case the person lingers on a page.'],
      level: 'Loudness: -18 LUFS integrated (a bed under reading), true peak -1 dBTP.',
    }),
  },
  {
    id: 'farrago-forecast-bed',
    title: 'Farrago forecast bed (30-second loop)',
    section: G,
    purpose: 'A thirty-second seamless theremin-lounge loop in Dr. Farrago\'s lane that plays under her daily written forecast (a new way of being wrong every day) on the Live Activity and the launch screen.',
    plays_in: 'Under the daily forecast card at T-12 before the launch track starts, and under the forecast line on the End Credits card if a scrub was declared.',
    model: 'v6',
    mode: 'Custom (Instrumental toggle on)',
    style_prompt: 'Space-age lounge, seamless loop, no intro, no outro, exactly 128 BPM with a half-time feel, 4/4, key of G major, instrumental, sixteen bars. A theremin plays a wobbling two-note question over vibraphone, bongos and a walking electric bass; a muted brass stab once per eight bars; a little tape hiss. Sly, dramatic, tongue-in-cheek, like a weather bulletin from a lounge. No vocals, no build, no fade.',
    exclude_styles: 'vocals, singing, intro, outro, fade out, build, climax, key change, tempo change, horror, rock, synth pop, loud, long',
    vocal_lane: 'Instrumental; Dr. Ines Farrago\'s lane.',
    lyrics: '[Instrumental]\n[Intro: none, loop starts on the vamp]\n[Verse: theremin two-note question, vibraphone, bongos, bass, muted brass stab at bar 8, sixteen bars]\n[Outro: none, loop ends on the vamp]',
    bpm: 128,
    duration_seconds: 30,
    section_targets: { loop_start: 0, brass_stab: 13.125, loop_end: 30 },
    stems: [],
    generation_tips: tipsSong({
      takes: 3,
      listen: ['Listen for the theremin figure being a question (rising), because the forecast under it is always wrong and the music should sound unsure.', 'The loop must be the same at bar 1 and bar 16.'],
      keep: 'Keep the take with the cleanest bar-16-to-bar-1 join.',
      extra: ['Toggle Instrumental on and keep [Instrumental] in the lyrics box.', 'Suno will generate longer than sixteen bars; find the best sixteen-bar stretch and loop that.'],
    }),
    post_processing: postLoop(128, 16),
  },
  {
    id: 'weekend-no-launch-lounge-nowhere-to-be',
    title: 'Weekend lounge — Nowhere to Be',
    section: G,
    purpose: 'The no-launch weekend lounge track in Bunny\'s lane with a guest line from Gus: the station stays on for mornings with nowhere to be. The seasonal snow-day lounge is a later Cover of this one.',
    plays_in: 'Weekend mornings with no launch scheduled, from the "no launch today" card; also the Hangar\'s daytime bed. Part of the one-time unlock.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Lazy late-morning lounge jazz with a soft bossa feel, 96 BPM, 4/4, key of G major, about three and a half minutes. Nylon-string guitar, upright bass, brushed drums, vibraphone, a muted trumpet, a little accordion for one verse. Sunny, unhurried, wry, content. A low, smoky, unhurried late-night radio voice sings the verses and choruses like a morning sign-on; a warm, unhurried baritone male sings one guest verse. Ends on a soft guitar chord, no fade, short intro.',
    exclude_styles: 'rock, pop, EDM, synth, electric guitar, rap, screaming, fade out, tempo change, drum fills, big finish, big band, upbeat, fast',
    vocal_lane: LANES.bunny + ' Guest verse: Gus persona (two personas in one song is unreliable; if the guest verse comes out in Bunny\'s voice, accept it; the line still works).',
    lyrics: `[Intro: nylon guitar, brushes, vibraphone, four bars]
[Spoken, low, smoky, unhurried] Good morning. Cul-de-Sac Mission Control. There is no launch today. Repeat: no launch. The window is closed, and the window is fine with that.

[Verse 1: starts at bar 9]
Nowhere to be, nowhere to be, the tower's cold, the coffee's hot,
The manifest says: nothing. That's the best thing that it's got.
The Flight Director's off. The kettle's on. The socks can stay unpaired,
Dr. Farrago forecast doom. We checked. The sky is fair.

[Chorus: vibraphone]
Nowhere to be, nowhere to be, nobody says it twice,
The station's on because we like it, and the station's very nice,
No horns today, no shoes, no door, the crew is standing down,
Nowhere to be, nowhere to be, the quietest launch in town.

[Instrumental: muted trumpet, guitar, eight bars]

[Verse 2: guest verse, warm baritone, accordion joins]
I'm the one who keeps the manifest; today I keep it shut,
The keys are on the counter, where I left them. Look. They're there. But
Nobody needs the keys today, and that's a thing I know,
So I'll sweep the tower, slowly, and we'll let the morning go.

[Chorus]
Nowhere to be, nowhere to be, nobody says it twice,
The station's on because we like it, and the station's very nice,
No horns today, no shoes, no door, the crew is standing down,
Nowhere to be, nowhere to be, the quietest launch in town.

[Bridge: talk-sung, low and smoky]
The Department of Five More Minutes is open on weekends.
Today, and only today, their permits are approved.
Take five. Take fifty. The Board of Snooze Appeals has gone fishing.

[Chorus: softer]
Nowhere to be, nowhere to be, nobody says it twice,
The station's on because we like it, and the station's very nice,
No horns today, no shoes, no door, the crew is standing down,
Nowhere to be, nowhere to be, the quietest launch in town.

[Outro: guitar, four bars]
[Spoken, low, smoky] No launch. Copy. Enjoy the weather. Whatever it does.
[Instrumental: soft guitar chord, stop]
[End]`,
    bpm: 96,
    duration_seconds: 210,
    section_targets: { intro: 0, sign_on: 10, verse_1: 20, chorus_1: 60, instrumental: 100, guest_verse: 120, chorus_2: 160, bridge: 180, chorus_3: 195, outro: 205, end: 210 },
    stems: ['Full mix', 'Instrumental stem (Auto Split) for the Hangar daytime bed'],
    generation_tips: tipsSong({
      takes: 3,
      listen: ['Listen for the whole track staying lazy; the model will want to lift the last chorus and it must not.', 'The spoken sign-on at the top must be Bunny and must say "no launch" clearly; it is the only information in the song.'],
      keep: 'Keep the take with the sleepiest groove and the clearest sign-on.',
      extra: ['Use the Bunny persona. At 96 BPM a bar is 2.5 s; the targets above are approximate and will be replaced by measured values.'],
    }),
    post_processing: postSong(96, {
      extra: ['Trim to the last bar boundary after the spoken sign-off; keep the natural chord decay inside the file.', 'Also export the Auto Split instrumental as a 3:30 bed and find a clean 16-bar loop inside the first chorus for the Hangar daytime loop.'],
      level: 'Loudness: -18 LUFS integrated, true peak -1 dBTP.',
    }),
  },
];

module.exports = entries;
