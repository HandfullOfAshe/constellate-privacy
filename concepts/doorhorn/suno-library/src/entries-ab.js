const { LANES, postSong, postSting, tipsSong } = require('./helpers.js');

const A = 'A. Station IDs';
const B = 'B. Launch tracks';

// ---------------- Section A: Station IDs ----------------

const stationPost = postSong(128, {
  extra: [
    'Hard limit 30.0 s: the file is the AlarmKit alarm sound, and custom alarm sounds are capped at about 30 s. Trim to exactly 16 bars (30.000 s) from the first downbeat; if the sung tag runs over, cut the brass tail at bar 16 with a 150 ms fade.',
    'Make a second export with a 2-second fade-in for households that pick "soft first sound".',
  ],
  level: 'Loudness: -14 LUFS integrated (it has to be heard from a counter across a kitchen), true peak -1 dBTP.',
});

const stationTips = (extra) => tipsSong({
  takes: 3,
  listen: [
    'Listen for: a snare that is crisp not roomy, spoken lines that stay calm (reject any take where the voice sells the line), and "T-minus twelve. Launch window open." landing before 0:22 so the tag fits.',
    'The spoken lines must be intelligible at low volume; reject takes where the brass swell covers the words.',
  ],
  keep: 'Keep the take with the clearest diction; this voice becomes the Augustine persona for the whole library.',
  extra,
});

const stationIds = [
  {
    id: 'station-id-launch-window-open',
    title: 'Station ID — Launch Window Open',
    section: A,
    purpose: 'The standard 30-second station ID that opens every weekday launch: the alarm sound itself and the first thing the house hears. Establishes the station, the Flight Director and the T-minus twelve call.',
    plays_in: 'AlarmKit alarm sound at the scheduled launch time (T-12); also the first 30 s of the in-app launch if the alarm was dismissed; StandBy shows the countdown over it.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Radio station identification jingle, 30 seconds, 128 BPM, 4/4, key of G major. Marching snare drum rolls and rim clicks, a small bright brass section (two trumpets, trombone, sousaphone) playing a short chorale and a fanfare tag, no other instruments. Calm, dry, official, gently comic. A calm, precise, unhurried female spoken voice reads announcements like a checklist and sings one short phrase with the brass; a second low male voice speaks a single word. Clean hard ending on a brass chord with a snare hit, no fade, no reverb wash.',
    exclude_styles: 'rock, pop, EDM, synth, guitar, piano, strings, ballad, slow, lo-fi, distorted, shouting, rap, fade out, long intro',
    vocal_lane: LANES.augustine,
    lyrics: `[Intro: snare roll, two bars, brass swell]
[Spoken, calm, precise, unhurried, female]
Cul-de-Sac Mission Control. Flight Director speaking.
Item one: it is morning. Item two: the window is open. Item three: there is a procedure.
[Sung, with the brass chorale, four bars]
One launch a day, and the launch is yours.
[Spoken, calm]
T-minus twelve. Launch window open. Crew to stations.
[Spoken, second voice, low male, one word]
Copy.
[Instrumental: brass fanfare tag, snare hit, hard stop]
[End]`,
    bpm: 128,
    duration_seconds: 30,
    section_targets: { snare_roll: 0, checklist: 3.75, sung_tag: 13.125, t_minus_twelve: 20.625, copy: 26.25, end: 30 },
    stems: [],
    generation_tips: stationTips(['Create the "Augustine" persona from the winning take before generating anything else in her lane.']),
    post_processing: stationPost,
  },
  {
    id: 'station-id-soft-brass-sunrise',
    title: 'Station ID — Soft Brass Sunrise',
    section: A,
    purpose: 'The quiet-first-sound station ID for households that do not want a snare at 6:58: muted brass, brushes, the same call at half the intensity.',
    plays_in: 'AlarmKit alarm sound when the household picks "soft brass" as its first sound; Re-entry never uses it.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Gentle radio station identification, 30 seconds, 128 BPM with a relaxed half-time feel, 4/4, key of G major. Muted trumpet and flugelhorn chorale over soft brushed snare, a low sousaphone pedal, very sparse, warm and unhurried, volume rising gently over the first eight bars. A calm, precise, unhurried female spoken voice, close to the microphone, almost a whisper, reads a short checklist; one short sung phrase with the brass. Ends cleanly on a soft brass chord and a single brushed snare stroke, no fade.',
    exclude_styles: 'rock, pop, EDM, synth, guitar, piano, strings, drum kit, loud, distorted, shouting, rap, fade out, long intro, upbeat',
    vocal_lane: LANES.augustine,
    lyrics: `[Intro: brushed snare, muted trumpet chorale rising softly, four bars]
[Spoken, calm, close, almost a whisper, female]
Good morning. No rush yet. The window opens in twelve.
Item one: the Flight Director is awake. Item two: that is enough for now.
[Sung, softly, with the flugelhorn, four bars]
One launch a day, and the launch is yours.
[Spoken, calm]
T-minus twelve. Launch window open. Take your time to your stations.
[Instrumental: soft brass chord, one brushed snare stroke, stop]
[End]`,
    bpm: 128,
    duration_seconds: 30,
    section_targets: { rise: 0, checklist: 7.5, sung_tag: 15, t_minus_twelve: 22.5, end: 30 },
    stems: [],
    generation_tips: stationTips(['Use the Augustine persona from entry 1 so the two IDs are recognisably one person at two volumes.', 'Reject any take where the brass swells above the voice; the whole point of this ID is that it never gets loud.']),
    post_processing: postSong(128, {
      extra: [
        'Trim to exactly 16 bars (30.000 s). Apply an 8-bar (15 s) linear fade-in on top of whatever rise Suno gave it; the concept calls for volume ramping in over the first eight bars.',
      ],
      level: 'Loudness: -18 LUFS integrated, true peak -1 dBTP; this ID is meant to be quieter than everything else.',
    }),
  },
  {
    id: 'station-id-checklist',
    title: 'Station ID — Checklist',
    section: A,
    purpose: 'The spoken-checklist station ID for quiet mode (spoken cues and stings only, still real audio, never a silent session): snare, one trumpet, and Augustine reading the wake procedure.',
    plays_in: 'AlarmKit alarm sound in quiet mode; also plays before the Sunday Flight Review.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Spoken station identification over a marching snare cadence, 30 seconds, 128 BPM, 4/4, key of G major. Snare drum cadence with rim clicks and one bass drum, a single trumpet playing short answering phrases between the spoken lines, nothing else. Dry, precise, deadpan, quietly funny. A calm, precise, unhurried female spoken voice reads a numbered checklist with a small pause after each item; no singing. Ends on a trumpet tag and a single snare hit, no fade.',
    exclude_styles: 'singing, choir, rock, pop, EDM, synth, guitar, piano, strings, full band, ballad, distorted, shouting, rap, fade out',
    vocal_lane: LANES.augustine,
    lyrics: `[Intro: snare cadence, two bars]
[Spoken, calm, precise, unhurried, female, a small pause after each item]
Checklist.
One: eyes. Open is preferred.
Two: feet. Locate them.
Three: floor. It has not moved.
Four: the window is open. It opens every day. This is one of those.
[Instrumental: trumpet answer, two bars]
[Spoken]
T-minus twelve. Crew to stations. There is a procedure, and the procedure is kind.
[Spoken, second voice, low male]
Copy.
[Instrumental: trumpet tag, snare hit, stop]
[End]`,
    bpm: 128,
    duration_seconds: 30,
    section_targets: { cadence: 0, checklist: 3.75, trumpet_answer: 16.875, t_minus_twelve: 20.625, copy: 26.25, end: 30 },
    stems: [],
    generation_tips: stationTips(['Toggle nothing: this is not an instrumental, but put "no singing" in the Exclude field as above so the model does not turn the checklist into a verse.', 'If the trumpet answers over the words, run Replace Section on that phrase rather than regenerating.']),
    post_processing: stationPost,
  },
];

// ---------------- Section B: Launch tracks ----------------

// The one shared lyric. Flavor descriptors only change the bracketed tags.
function launchLyric(f) {
  return `[Intro: station bed, ${f.intro}]
[Spoken, calm female flight director, unhurried]
Cul-de-Sac Mission Control. T-minus twelve. Launch window open.
Crew to stations. This is not a drill. It is, however, a morning.

[Verse 1: WAKE, ${f.verse1}]
Feet on the floor, that counts as go, the sun is doing its part,
Rise and shine is not required, we'll settle for a start.
Now brush: top left. Top right. Switch. The bottom row's the same.
Two minutes, crew, then rinse and spit, and nobody's to blame.

[Chorus: ${f.chorus}]
Launch window open, one launch a day,
Nobody says it twice, the song says it our way,
When the horns come in, that's shoes and door,
Copy, copy, copy that, that's what the horns are for.

[Verse 2: DRESS, ${f.verse2}]
Item: socks. Two socks. A matching pair's a bonus, not a rule.
Item: shirt, the clean-ish one. Item: pants, the ones that pass for cool.
The Department of Five More Minutes just filed for a delay,
The Board of Snooze Appeals says no. The Board has had its say.

[Bridge: MANIFEST, ${f.bridge}]
[Warm baritone, unhurried, conversational]
Payload Specialist to the bridge. I've swept this floor, I've seen it all.
Here's what goes out the door today, so listen for the call:
The lunchbox, packed and by the door.
The library book, it's due, you know it's due.
The good water bottle. Not the other one. The good one.
The gym bag, and the shoes are in the bag.
The permission slip, signed, the real signature.
The keys, last seen kitchen counter.
And the dentist call, day twenty-three, still on the manifest.
No judgment. Just the manifest.
[Instrumental: roll call window, eight bars, band vamps, walk-up cues fire here]
[Spoken, baritone] Manifest complete.
[Spoken, second voice, low male] Copy.

[Final Chorus: DOOR, ${f.finalChorus}]
[Horns]
There's the horns! That's shoes and door!
Launch window open, one launch a day,
Nobody said it twice, the song said it our way,
The horns came in, so it's shoes and door,
Copy, copy, copy that, that's what the horns were for.

[Outro: LIFTOFF, ${f.outro}]
[Spoken count, calm female, one number per beat, then full ensemble on liftoff]
Ten. Nine. Eight. Seven. Six. Five. Four. Three. Two. One.
Liftoff. Clean launch. Log it. Copy.
[Instrumental: fanfare, eight bars, big final chord, hard stop]
[End]`;
}

const LAUNCH_TARGETS = { intro: 0, wake: 15, chorus: 45, dress: 75, manifest: 105, roll_call: 142.5, horns: 165, door: 165, liftoff: 210, t_zero: 217.5, end: 240 };

const LAUNCH_STEMS = [
  'Advanced Split (Premier) role stems for the Stem Roll Call: drums, bass, brass, choir (ensemble vocals)',
  'Advanced Split layers for the on-device arrangement: calm (bass + chords), medium (+ drums), intense (full)',
  'Lead vocal stem (Gus bridge and verses) so the app can mute bars 61 to 76 of the bridge and overlay the Section D manifest clips',
  'Full mix (for the standalone 4:00 song and the Test Fire fallback)',
];

const launchTips = (flavor, extra = []) => tipsSong({
  takes: 4,
  listen: [
    'Generate the marching band master first (entry 5) and accept it before any other flavor; then create entries 6 to 10 as Covers of that master with the flavor style prompt, keeping the lyric byte-identical, so the melody is shared. The digest confirms Covers exists but not that it preserves tempo or key: check both on every cover and regenerate if either drifts.',
    'Listen for, in order: (1) the tempo reads 128 BPM start to finish; (2) the [Horns] entry is an audible brass event at the start of the final chorus, because that entry is the door cue; (3) the bridge drops to a quiet bed under the baritone so the Section D clips can sit on it; (4) a hard ending, no fade; (5) the count in the outro is one number per beat.',
    `Flavor check for ${flavor}: the arrangement must be unmistakably this flavor within four bars of the intro, because the flavor is what the household chose.`,
  ],
  keep: 'Keep the take with the cleanest horn entry and the quietest bridge bed; melody consistency with the master matters more than polish.',
  extra: [
    'Vocal gender setting: male. Persona: Gus for the lead; the calm female spoken intro is a tag hint and will drift, which is acceptable (lanes make drift invisible), but reject takes where the intro is sung instead of spoken.',
    'After acceptance, run Advanced Split for the four role stems and the three layers listed under stems, then export everything from Studio as WAV (Studio exports do not count against the monthly download cap on Premier).',
    ...extra,
  ],
});

const launchPost = (extra = []) => postSong(128, {
  extra: [
    'Trim so bar 1 (the first downbeat of the station bed) is at 0.000 s; the target section map is intro 0:00, WAKE 0:15, chorus 0:45, DRESS 1:15, MANIFEST 1:45, roll call 2:22.5, horns/DOOR 2:45, LIFTOFF 3:30, T-0 3:37.5, end 4:00.',
    'Suno will not hit those boundaries exactly. Record the actual boundaries of the accepted take in the section-map JSON (bar numbers, not seconds); the app reads the map, not this document. Where a phase runs a bar long, prefer cutting an instrumental bar rather than a sung one.',
    'Cut every stem at the same bar boundaries and confirm sample-accurate alignment by nulling the stems against the full mix.',
    'Bridge bed: create a version of bars 57 to 88 with the lead vocal stem muted from bar 61 to 76 (the item and Hold slots), so the runtime manifest clips have a clean bed.',
    ...extra,
  ],
});

const flavors = [
  {
    id: 'launch-marching-band',
    title: 'Launch — Marching Band (master)',
    purpose: 'The master launch track and the default free-tier flavor. Every other flavor is a Cover of this one, so its melody and its section map are the reference.',
    style_prompt: 'Marching band, 128 BPM, 4/4, key of G major. Drumline snare cadence, bass drums, tenor drums, crash cymbals; full brass section of trumpets, mellophones, trombones and sousaphone; piccolo counter-melody. Bright, brisk, deadpan-cheerful, stadium-clean mix. Lead vocal: warm baritone male, unhurried and conversational on the bridge; gang-vocal ensemble on the choruses; one calm, precise female spoken announcement in the intro and a short low male spoken "copy". The bridge drops to soft snare taps and sousaphone under the baritone. A full trumpet fanfare enters at the start of the final chorus. Clean hard ending on a final chord, no fade.',
    exclude_styles: 'ballad, slow, lo-fi, distorted guitar, screaming, rap, trap, EDM, synthwave, ambient, fade out, acoustic guitar, piano ballad',
    tags: { intro: 'snare line rolls under a brass chorale', verse1: 'drumline cadence, piccolo answers each line', chorus: 'full brass, crash cymbals, gang vocals', verse2: 'snare rim clicks, sousaphone walking', bridge: 'drums drop to soft snare taps, sousaphone and one trombone under the baritone', finalChorus: 'full trumpet section fanfare, everything in', outro: 'drumline roll-off, brass fanfare, final chord' },
    extraTips: ['This is the flavor the first-run Test Fire and the free tier use; spend the most takes here (six generations if needed).'],
  },
  {
    id: 'launch-surf',
    title: 'Launch — Surf',
    purpose: 'Surf flavor of the shared launch: twang, tremolo and floor toms, with a sax-and-trumpet horn entry for the door.',
    style_prompt: 'Surf rock, 128 BPM, 4/4, key of G major. Reverb-drenched twangy electric lead guitar with tremolo picking, clean rhythm guitar, electric bass, driving drums with floor-tom rolls, combo organ, saxophone honks; baritone sax and trumpets join for the final chorus. Sunny, brisk, wide-eyed, a little deadpan. Lead vocal: warm baritone male; gang-vocal ensemble on choruses with "ooh" backing; one calm, precise female spoken announcement in the intro and a short low male spoken "copy". The bridge pulls back to clean guitar chords, bass and light toms under the baritone. Clean hard ending with a reverb splash, no fade.',
    exclude_styles: 'ballad, slow, lo-fi, metal, screaming, rap, trap, EDM, synthwave, ambient, fade out, acoustic, country',
    tags: { intro: 'tremolo guitar over floor toms', verse1: 'twangy lead guitar answers, organ swells', chorus: 'sax honks, gang vocals, crash cymbals', verse2: 'half-time surf drums, chunky guitar chords', bridge: 'clean guitar chords, bass and light toms under the baritone', finalChorus: 'baritone sax and trumpets blast in', outro: 'drum fill, crash, guitar riff, final chord with a reverb splash' },
    extraTips: [],
  },
  {
    id: 'launch-disco',
    title: 'Launch — Disco',
    purpose: 'Disco flavor of the shared launch: four-on-the-floor, strings and a brass-hit door entry; the natural home of 128 BPM.',
    style_prompt: 'Disco, 128 BPM, 4/4, key of G major. Four-on-the-floor kick, open hi-hats, congas, octave bass line, funky rhythm guitar, clavinet, lush string section stabs and runs, brass section hits; big brass blasts on the final chorus. Glittering, joyful, tight, polished. Lead vocal: warm baritone male; ensemble chorus with falsetto backing; one calm, precise female spoken announcement in the intro and a short low male spoken "copy". The bridge thins to strings and congas under the baritone. Clean hard ending on a big chord, no fade.',
    exclude_styles: 'ballad, slow, lo-fi, rock guitar solo, metal, screaming, rap, trap, dubstep, ambient, fade out, acoustic, country',
    tags: { intro: 'hi-hat and a string swell', verse1: 'clavinet and four-on-the-floor', chorus: 'string stabs, brass hits, falsetto backing', verse2: 'octave bass, rhythm guitar, congas', bridge: 'strings and congas only under the baritone', finalChorus: 'brass section blasts, strings run up', outro: 'string run up, brass, big cymbal ending' },
    extraTips: [],
  },
  {
    id: 'launch-big-band',
    title: 'Launch — Big Band',
    purpose: 'Big band flavor of the shared launch: medium-up swing, sections trading, a shout-chorus door entry.',
    style_prompt: 'Big band swing, 128 BPM medium-up swing, 4/4, key of G major. Full trumpet, trombone and saxophone sections, walking upright bass, ride cymbal and brushes, piano comping, muted trumpets in the verses, sax section soli, shout chorus with a screaming lead trumpet on the final chorus. Confident, playful, crisp. Lead vocal: warm baritone male crooner, relaxed; ensemble chorus; one calm, precise female spoken announcement in the intro and a short low male spoken "copy". The bridge drops to piano and brushes under the baritone. Ensemble tag and a hard final chord, no fade.',
    exclude_styles: 'ballad, slow, lo-fi, rock, metal, screaming, rap, trap, EDM, ambient, fade out, acoustic guitar, country, smooth jazz',
    tags: { intro: 'brass swell over ride cymbal', verse1: 'muted trumpets, piano comping', chorus: 'full band shout, sections answering', verse2: 'sax section soli under the verse', bridge: 'piano and brushes only under the baritone', finalChorus: 'shout chorus, screaming lead trumpet', outro: 'drum break, ensemble tag, final chord' },
    extraTips: [],
  },
  {
    id: 'launch-bluegrass',
    title: 'Launch — Bluegrass',
    purpose: 'Bluegrass flavor of the shared launch: banjo, fiddle and harmony, with one bright trumpet joining for the door because the horn entry is the cue in every flavor.',
    style_prompt: 'Bluegrass, 128 BPM with a driving cut-time feel, key of G major. Banjo rolls, mandolin chop, fiddle, dobro, flatpicked acoustic guitar runs, upright bass; high close harmony on the choruses; one bright trumpet unexpectedly joins the band for the final chorus. Quick, warm, front-porch cheerful. Lead vocal: warm baritone male; two- and three-part harmony ensemble on choruses; one calm, precise female spoken announcement in the intro and a short low male spoken "copy". The bridge drops to guitar and upright bass under the baritone. Ensemble shout and a hard final chord, no fade.',
    exclude_styles: 'ballad, slow, lo-fi, electric guitar, drum kit, metal, screaming, rap, trap, EDM, ambient, fade out, pop country',
    tags: { intro: 'banjo roll and mandolin chop', verse1: 'fiddle answers, guitar runs', chorus: 'harmony vocals, dobro, everybody in', verse2: 'banjo breakdown under the verse', bridge: 'guitar and upright bass only under the baritone', finalChorus: 'one bright trumpet joins the band, the only trumpet in the county', outro: 'fiddle and banjo race, ensemble shout, final chord' },
    extraTips: ['Bluegrass has no horns; the trumpet at the final chorus is deliberate and must be there, because the horn entry means shoes and door in every flavor. Reject takes without it.'],
  },
  {
    id: 'launch-ska',
    title: 'Launch — Ska',
    purpose: 'The sixth flavor (developer choice): ska, a horn-forward, bouncy genre that is nobody\'s signature, with the offbeat guitar carrying the household to the door.',
    style_prompt: 'Ska, 128 BPM, 4/4, key of G major. Offbeat upstroke guitar, bubbling organ, walking electric bass, tight drums with rimshots, horn section of trumpet, trombone and tenor sax playing riffs; full horn fanfare on the final chorus. Sunny, bouncy, brisk, good-natured. Lead vocal: warm baritone male; gang-vocal ensemble on choruses; one calm, precise female spoken announcement in the intro and a short low male spoken "copy". The bridge drops to bass and quiet offbeat guitar under the baritone. Horn stab ending on a hard final chord, no fade.',
    exclude_styles: 'ballad, slow, lo-fi, punk shouting, metal, screaming, rap, trap, EDM, ambient, fade out, acoustic, country, reggaeton',
    tags: { intro: 'organ and offbeat guitar', verse1: 'skank guitar, walking bass', chorus: 'horn section riff, gang vocals', verse2: 'organ bubble, rimshots', bridge: 'bass and quiet offbeat guitar under the baritone', finalChorus: 'full horn section fanfare', outro: 'horn fanfare, drum roll, final chord' },
    extraTips: [],
  },
];

const launchEntries = flavors.map(f => ({
  id: f.id,
  title: f.title,
  section: B,
  purpose: f.purpose,
  plays_in: 'The morning launch (T-12 to T-0) as the 4:00 master; the 8, 10, 12, 15 and 20-minute launches are on-device arrangements of its stems. Drives the Live Activity phase names, the StandBy countdown and AirPlay playback.',
  model: 'v6',
  mode: 'Custom (entries 6 to 10: Covers of entry 5 with this style prompt and the identical lyric)',
  style_prompt: f.style_prompt,
  exclude_styles: f.exclude_styles,
  vocal_lane: 'Lead: Gus Marchetti persona (warm baritone). Intro and count: Augustine Pell (calm female spoken, tag hint). "Copy": Lionel Abara (low male spoken, tag hint). Choruses: ensemble.',
  lyrics: launchLyric(f.tags),
  bpm: 128,
  duration_seconds: 240,
  section_targets: LAUNCH_TARGETS,
  stems: LAUNCH_STEMS,
  generation_tips: launchTips(f.title.replace('Launch — ', ''), f.extraTips),
  post_processing: launchPost(),
}));

const launchReference = {
  id: 'launch-shared-lyric-and-manifest-slots',
  title: 'Launch — Shared lyric, slot map and example manifest verses (reference)',
  section: B,
  purpose: 'Reference entry, not generated. Holds the one shared launch lyric with the manifest slot map marked, plus the three example manifest verses (A, B, C). Entries 5 to 10 paste this lyric with Example A filled in. The app and the engineering document read the slot map from here.',
  plays_in: 'Nowhere; it is the source the six flavors and the runtime manifest assembly are built from.',
  model: 'none (reference entry; not generated)',
  mode: 'Reference (do not paste into Suno)',
  style_prompt: 'Not applicable. The shared musical spec for every flavor: 128 BPM, 4/4, key of G major, 128 bars, hard ending, no fade; a brass entry at the start of the final chorus in every flavor, even the ones that have no horns; the bridge bed drops to two or three instruments under the baritone.',
  exclude_styles: 'Not applicable.',
  vocal_lane: 'Lead: Gus Marchetti (warm baritone). Intro and count: Augustine Pell (calm female spoken). "Copy": Lionel Abara. Choruses: ensemble.',
  lyrics: `SLOT MAP (128 BPM; bar = 1.875 s; bars are 1-based from the first downbeat)
[Intro] station bed ............ bars 1-8    (0:00-0:15)
[Verse 1] WAKE .................. bars 9-24   (0:15-0:45)  teeth cues nested: "top left, top right, switch"
[Chorus] ........................ bars 25-40  (0:45-1:15)
[Verse 2] DRESS ................. bars 41-56  (1:15-1:45)
[Bridge] MANIFEST ............... bars 57-88  (1:45-2:45)
    intro couplet ............... bars 57-60
    ⟨ITEM 1⟩ .................... bars 61-62   (each item slot is 2 bars = 3.75 s; a Section D clip)
    ⟨ITEM 2⟩ .................... bars 63-64
    ⟨ITEM 3⟩ .................... bars 65-66
    ⟨ITEM 4⟩ .................... bars 67-68
    ⟨ITEM 5⟩ .................... bars 69-70
    ⟨ITEM 6⟩ .................... bars 71-72   (fewer items: the app fills unused slots with the bed only)
    ⟨HOLD ITEM⟩ ................. bars 73-76   ("And the ⟨task⟩, ⟨day N⟩, still on the manifest." + "No judgment. Just the manifest.")
    roll call window ............ bars 77-84   (instrumental vamp; walk-up cues fire here on the next bar)
    "Manifest complete." "Copy." bars 85-88
[Final Chorus] DOOR ............. bars 89-112 (2:45-3:30)  [Horns] at bar 89 = shoes and door
[Outro] LIFTOFF ................. bars 113-128 (3:30-4:00) count bars 113-116, T-0 at bar 117 (3:37.5), fanfare to bar 128

SHARED LYRIC (paste-ready form is in entries 5-10; the bridge below shows the slots)

[Intro: station bed]
[Spoken, calm female flight director, unhurried]
Cul-de-Sac Mission Control. T-minus twelve. Launch window open.
Crew to stations. This is not a drill. It is, however, a morning.

[Verse 1: WAKE]
Feet on the floor, that counts as go, the sun is doing its part,
Rise and shine is not required, we'll settle for a start.
Now brush: top left. Top right. Switch. The bottom row's the same.
Two minutes, crew, then rinse and spit, and nobody's to blame.

[Chorus]
Launch window open, one launch a day,
Nobody says it twice, the song says it our way,
When the horns come in, that's shoes and door,
Copy, copy, copy that, that's what the horns are for.

[Verse 2: DRESS]
Item: socks. Two socks. A matching pair's a bonus, not a rule.
Item: shirt, the clean-ish one. Item: pants, the ones that pass for cool.
The Department of Five More Minutes just filed for a delay,
The Board of Snooze Appeals says no. The Board has had its say.

[Bridge: MANIFEST]
Payload Specialist to the bridge. I've swept this floor, I've seen it all.
Here's what goes out the door today, so listen for the call:
⟨ITEM 1⟩
⟨ITEM 2⟩
⟨ITEM 3⟩
⟨ITEM 4⟩
⟨ITEM 5⟩
⟨ITEM 6⟩
⟨HOLD ITEM: And the ⟨task⟩, ⟨day N⟩, still on the manifest.⟩
No judgment. Just the manifest.
[Instrumental: roll call window, eight bars]
Manifest complete. / Copy.

[Final Chorus: DOOR]
[Horns]
There's the horns! That's shoes and door!
Launch window open, one launch a day,
Nobody said it twice, the song said it our way,
The horns came in, so it's shoes and door,
Copy, copy, copy that, that's what the horns were for.

[Outro: LIFTOFF]
Ten. Nine. Eight. Seven. Six. Five. Four. Three. Two. One.
Liftoff. Clean launch. Log it. Copy.
[Instrumental: fanfare, big final chord]
[End]

EXAMPLE MANIFEST VERSE A (school day; the one pasted in entries 5-10)
The lunchbox, packed and by the door.
The library book, it's due, you know it's due.
The good water bottle. Not the other one. The good one.
The gym bag, and the shoes are in the bag.
The permission slip, signed, the real signature.
The keys, last seen kitchen counter.
And the dentist call, day twenty-three, still on the manifest.
No judgment. Just the manifest.

EXAMPLE MANIFEST VERSE B (work day)
The laptop, closed, and charged, we hope.
The charger, the one that actually works.
The badge, on the lanyard, on you.
The umbrella. Dr. Farrago said rain. So: sun.
The lunch order, it's already in, you're covered.
The bus pass, in the wallet, in the pocket.
And the thank-you note, day twelve, still on the manifest.
No judgment. Just the manifest.

EXAMPLE MANIFEST VERSE C (weekend, bins and practice)
The cleats, in the bag, not on the kitchen floor.
The swim bag, with a towel this time.
The sunscreen, on your face, not just in the bag.
The hat, it's on your head, that's where hats go.
The dog, who is also going. The dog agrees.
The trash, it's trash day, the trash goes out with you.
And the garage, day thirty, still on the manifest. It has stopped counting. So have we.
No judgment. Just the manifest.`,
  bpm: 128,
  duration_seconds: 240,
  section_targets: LAUNCH_TARGETS,
  stems: [],
  generation_tips: [
    'Do not paste this entry into Suno; the angle-bracket slots would be sung. Paste entries 5 to 10, which carry Example A.',
    'To regenerate a flavor with a different demo manifest (for screenshots or a store preview), swap Example B or C into the bridge of the flavor entry; keep everything else byte-identical so the Cover keeps the melody.',
    'Every item line is written to fill two bars at 128 BPM so the same line exists as a Section D clip; if you write new example items, keep them to about eight to eleven syllables.',
    'The Hold item line carries a day number on purpose (the credits carry no numbers; the manifest does). The day count is sung from the Section D day-count bank at runtime.',
  ],
  post_processing: [
    'None; this entry produces no audio. Keep it under version control next to the section-map JSON, because the slot map here and the map the app reads must agree.',
  ],
};

const testFire = {
  id: 'launch-test-fire',
  title: 'Launch — Test Fire (60 seconds)',
  section: B,
  purpose: 'The 60-second miniature launch from first-run onboarding: Augustine calls T-minus one, Gus sings a three-item demo manifest that ends with "and your keys, wherever they are", the horns come in, and the fanfare fires when the person taps the door. It is the moment the product is understood.',
  plays_in: 'Onboarding "Test fire (60 seconds)" button; also replayable from the Hangar as a demo. The app holds the last bar on a loop until the door is tapped, then plays the liftoff fanfare sting (entry 47).',
  model: 'v6',
  mode: 'Custom',
  style_prompt: 'Marching band, 128 BPM, 4/4, key of G major, 60 seconds, a compact miniature of a full launch song. Drumline snare cadence, bass drums, crash cymbals, full brass section, piccolo counter-melody. Bright, brisk, deadpan-cheerful. A calm, precise female spoken announcement opens it; a warm baritone male sings a short list over soft snare taps and sousaphone; a full trumpet fanfare enters for the final chorus with gang vocals; the band lands on a held chord with a snare roll and stops hard, no fade.',
  exclude_styles: 'ballad, slow, lo-fi, distorted guitar, screaming, rap, trap, EDM, synthwave, ambient, fade out, acoustic guitar, long intro',
  vocal_lane: 'Augustine Pell (spoken open), Gus Marchetti persona (baritone manifest), ensemble (final chorus), Lionel Abara ("copy").',
  lyrics: `[Intro: snare cadence, brass swell, four bars]
[Spoken, calm female flight director]
Cul-de-Sac Mission Control. This is a test. T-minus one. Launch window open.

[Verse: WAKE and DRESS, drumline and piccolo, eight bars]
Feet on the floor, that counts as go, the sun is doing its part,
Socks, a shirt, the clean-ish one, we'll settle for a start.

[Bridge: MANIFEST, soft snare taps and sousaphone under the baritone, eight bars]
[Warm baritone, unhurried]
Payload Specialist. Three items, and then we go:
The lunchbox, packed and by the door.
The good water bottle. Not the other one.
And your keys, wherever they are.

[Final Chorus: DOOR, full trumpet fanfare, gang vocals, eight bars]
[Horns]
There's the horns! That's shoes and door!
Copy, copy, copy that, that's what the horns are for.

[Outro: held chord and snare roll, four bars, waiting for the door]
[Spoken, calm female] Tap the door when you're through it.
[Instrumental: held brass chord, snare roll, hard stop]
[End]`,
  bpm: 128,
  duration_seconds: 60,
  section_targets: { intro: 0, wake_dress: 7.5, manifest: 22.5, horns: 37.5, door: 37.5, hold_for_door: 52.5, end: 60 },
  stems: ['Full mix', 'Optional: a 4-bar loop of the held-chord outro (bars 29 to 32) so the app can hold indefinitely until the door tap'],
  generation_tips: tipsSong({
    takes: 3,
    listen: [
      'Listen for a real pause before the held chord: the last four bars must be a hold, not a fanfare, because the fanfare is a separate sting fired by the door tap.',
      'The three-item manifest must be clearly Gus (same persona as entry 32); this is the first time a new person hears him.',
    ],
    keep: 'Keep the take whose horn entry is the loudest single event in the minute; onboarding needs the door cue to be unmistakable.',
  }),
  post_processing: postSong(128, {
    extra: [
      'Trim to 32 bars (60.000 s). Build the hold loop from bars 29 to 32 (4 bars, 7.5 s) at zero crossings so the app can sustain it until the tap.',
      'The fanfare sting (entry 47) is mixed on top by the app at the tap; check the two together in G major so the sting does not clash with the held chord.',
    ],
  }),
};

module.exports = [...stationIds, launchReference, ...launchEntries, testFire];
