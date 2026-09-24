const { LANES, postSong, tipsSong } = require('./helpers.js');

const E = 'E. Request Line';
const F = 'F. Walk-up cues';

// ---------------- Section E: Request Line ----------------

const rlPlays = (len) => `Request Line "${len}" from the widget, a Shortcut, the Action Button or an NFC tag; the ON AIR bulb and shrinking vinyl show in the Dynamic Island; rotated so no song repeats within a week. Fully offline, no music subscription needed.`;

const rlTips = (cues, extra = []) => tipsSong({
  takes: 4,
  listen: [
    `Cue bars: ${cues}. Measure each sung cue against the first downbeat; within two seconds is a keep, within four is acceptable because the app fires its own cue clip at the exact second, beyond that reject or Replace Section.`,
    'Listen for the tempo reading 128 BPM the whole way, a clean hard ending, and the cue words spoken clearly above the band (the household is not looking at a screen).',
  ],
  keep: 'Keep the take whose cues are closest to the bars, then the one with the clearest cue diction; the arrangement is the least important thing.',
  extra,
});

const rlPost = (bars, total, extra = []) => postSong(128, {
  extra: [
    `Trim to exactly ${bars} bars (${total} s) from the first downbeat; if the take is a bar or two long, cut instrumental bars, never a cue; if it is short, extend the final chord with a bar-length reverb tail rather than stretching.`,
    'Record the measured second of each sung cue in the section map so the app fires its overlay cue on the same bar, not on the nominal second.',
    ...extra,
  ],
});

const teethTargets = { quadrant_1_top_left: 0, quadrant_2_top_right: 30, quadrant_3_bottom_left: 60, halfway: 60, quadrant_4_bottom_right: 90, ten_seconds: 110, rinse_spit: 117, end: 120 };
const teethCues = 'Top left at bar 1 (0:00), Switch top right at bar 17 (0:30), Switch bottom left at bar 33 (1:00), Switch bottom right at bar 49 (1:30), Ten seconds at bar 59 (1:50), end at bar 64 (2:00)';

const requestLine = [
  {
    id: 'teeth-2-00-quadrant-march',
    title: 'Teeth 2:00 — Quadrant March',
    section: E,
    purpose: 'Two minutes of teeth as a marching procedure in Augustine\'s lane, with the quadrant switches sung at 0:30, 1:00 and 1:30. Free-tier song; also nested in the WAKE phase of long launches.',
    plays_in: rlPlays('Teeth 2:00') + ' Also inserted at a bar boundary inside the WAKE phase of the 12, 15 and 20-minute launches.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Marching band, exactly 128 BPM, 4/4, key of G major, two minutes, four equal sixteen-bar sections. Snare cadence, bass drum, cymbals, bright brass section, piccolo. Brisk, precise, cheerful, deadpan. A calm, precise female voice speaks a short command at the top of each section and sings the verses; gang vocals on the hook; a low male voice speaks one word at the end. The band never stops between sections. Hard stop on a snare hit at the end, no fade, no long intro.',
    exclude_styles: 'intro, slow, ballad, lo-fi, rock, EDM, synth, guitar solo, rap, screaming, fade out, tempo change, drum solo',
    vocal_lane: LANES.augustine,
    lyrics: `[Verse 1: quadrant one, starts at bar 1, snare cadence and brass]
[Spoken, calm, precise, female] Top left. Begin.
[Sung]
Item one: the top left, the outside, then the in,
Small circles, crew, small circles, that's where every morning's been.
This is a two-minute procedure. There are four parts. This is one.
[Hook, gang vocals] Brush, brush, the procedure says brush. Brush, brush, we're not done.

[Verse 2: quadrant two, starts at bar 17]
[Spoken] Switch. Top right.
[Sung]
Item two: the top right, the molars in the back,
The ones that do the chewing, so the chewing stays on track.
Halfway to the halfway, crew, and nobody's off pace.
[Hook, gang vocals] Brush, brush, the procedure says brush. Brush, brush, hold your place.

[Verse 3: quadrant three, starts at bar 33]
[Spoken] Switch. Bottom left. That's halfway.
[Sung]
Item three: the bottom left, the gums, be gentle there,
A gentle brush is still a brush; the Flight Director's fair.
The Department of Five More Minutes called. We let it ring.
[Hook, gang vocals] Brush, brush, the procedure says brush. Brush, brush, everything.

[Verse 4: quadrant four, starts at bar 49]
[Spoken] Switch. Bottom right. Final quadrant.
[Sung]
Item four: the bottom right, and then the tongue, don't laugh,
You're in the final half of the final half of the final half.
[Spoken, at bar 59] Ten seconds.
[Spoken, at bar 63] Rinse. Spit. Procedure complete.
[Spoken, low male] Copy.
[Instrumental: brass tag, snare hit, hard stop]
[End]`,
    bpm: 128,
    duration_seconds: 120,
    section_targets: teethTargets,
    stems: ['Full mix', 'Vocal stem (Auto Split) for quiet mode, where only the spoken cues play over a soft snare'],
    generation_tips: rlTips(teethCues, ['Use the Augustine persona. If the model sings the "Switch" lines, accept only if they land on the bar; spoken is preferred because sung cues blur.']),
    post_processing: rlPost(64, '120.000'),
  },
  {
    id: 'teeth-2-00-scrub-brushes-along',
    title: 'Teeth 2:00 — Scrub Brushes Along',
    section: E,
    purpose: 'Two minutes of teeth in Scrub\'s lane (kazoo and toy piano) for the youngest crew: Scrub has no teeth and brushes anyway, tries to declare weather on the toothbrush, and is denied. Quadrant switches at 0:30, 1:00, 1:30.',
    plays_in: rlPlays('Teeth 2:00'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Toy-instrument march, exactly 128 BPM, 4/4, key of G major, two minutes, four equal sixteen-bar sections. Kazoo lead melody, toy piano, slide whistle, a small hand drum and a tambourine, a squeaky bicycle horn on the hook. Silly, bouncy, sweet. A tiny, squeaky, cheerful robot voice speaks a command at the top of each section and sing-songs the verses; a kazoo choir on the hook. Never stops between sections. Hard stop on a toy piano flourish, no fade, no intro.',
    exclude_styles: 'intro, slow, ballad, lo-fi, rock, EDM, distorted, guitar, orchestra, rap, screaming, fade out, tempo change, adult vocals, dark',
    vocal_lane: LANES.scrub,
    lyrics: `[Verse 1: quadrant one, starts at bar 1, toy piano and kazoo]
[Spoken, tiny robot voice] Top left! Scrub is brushing too. Scrub has no teeth. Scrub is brushing anyway.
[Sung, sing-song]
Round and round on the top left row, the little brush goes slow,
Scrub declares... no weather here. The toothpaste told me so.
[Hook, kazoo choir] Brush-a brush-a brush-a, top left, brush-a brush-a, go!

[Verse 2: quadrant two, starts at bar 17]
[Spoken] Switch! Top right!
[Sung]
Round and round on the top right row, the big ones in the back,
Scrub would like to press the button. Scrub is told: no button. Brush.
[Hook, kazoo choir] Brush-a brush-a brush-a, top right, brush-a brush-a, brush!

[Verse 3: quadrant three, starts at bar 33]
[Spoken] Switch! Bottom left! Halfway! Scrub is very proud of you!
[Sung]
Round and round on the bottom left, be gentle on the gums,
Scrub has counted all the bubbles. Scrub lost count. Here more come.
[Hook, kazoo choir] Brush-a brush-a brush-a, bottom left, brush-a brush-a, hum!

[Verse 4: quadrant four, starts at bar 49]
[Spoken] Switch! Bottom right! Last one!
[Sung]
Round and round on the bottom right, and then the tongue, blah blah,
Scrub is done, but Scrub was never brushing, so, ta-da!
[Spoken, at bar 59] Ten seconds!
[Spoken, at bar 63] Rinse! Spit! Scrub declares: clean weather!
[Instrumental: toy piano flourish, kazoo tag, stop]
[End]`,
    bpm: 128,
    duration_seconds: 120,
    section_targets: teethTargets,
    stems: ['Full mix'],
    generation_tips: rlTips(teethCues, [
      'Use the Scrub persona from entry 36. Reject takes where the robot voice reads as creepy or as a real child; it should be a squeaky cartoon machine.',
      'The kazoo choir hook tends to run long; Replace Section it if it eats the next spoken cue.',
    ]),
    post_processing: rlPost(64, '120.000'),
  },
  {
    id: 'teeth-2-00-two-minutes-to-splashdown',
    title: 'Teeth 2:00 — Two Minutes to Splashdown',
    section: E,
    purpose: 'Two minutes of teeth in Bunny\'s lane (late-night jazz, half-time feel on the house grid) for the evening brush, quadrant switches called like a radio sign-off.',
    plays_in: rlPlays('Teeth 2:00') + ' The rotation prefers this one after 6 p.m.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Late-night jazz, exactly 128 BPM with a relaxed half-time feel, 4/4, key of G major, two minutes, four equal sixteen-bar sections. Brushed drums, upright bass, sparse piano, a muted trumpet answering each verse, small warm room. Unhurried, intimate, wry. A low, smoky, unhurried late-night radio voice speaks a short call at the top of each section and talk-sings the verses. The band never stops between sections. Ends on a piano tag and a brushed cymbal, no fade, no intro.',
    exclude_styles: 'intro, big band, swing shout, rock, pop, EDM, synth, electric guitar, rap, screaming, fade out, tempo change, saxophone solo, upbeat',
    vocal_lane: LANES.bunny,
    lyrics: `[Verse 1: quadrant one, starts at bar 1, brushes, bass, piano]
[Spoken, low, smoky] Top left. Two minutes, four corners, and I'll call them. Small circles.
[Talk-sung]
Top left, where the day began, the coffee and the toast,
Small circles, slow, like a record; this corner needs it most.
[Instrumental: muted trumpet answer, four bars]

[Verse 2: quadrant two, starts at bar 17]
[Spoken] Switch. Top right.
[Talk-sung]
Top right, the working side, the molars that did the lifting,
Small circles, easy now, the whole long day is shifting.
[Instrumental: piano answer, four bars]

[Verse 3: quadrant three, starts at bar 33]
[Spoken] Switch. Bottom left. That's halfway, and halfway's a lovely place.
[Talk-sung]
Bottom left, the gentle side, the gums get a little grace,
Nobody's counting but the bass, and the bass has lost its place.
[Instrumental: muted trumpet answer, four bars]

[Verse 4: quadrant four, starts at bar 49]
[Spoken] Switch. Bottom right. Last corner.
[Talk-sung]
Bottom right, and then the tongue, then rinse, then spit, then done,
The night desk logs it: teeth complete. That's everyone.
[Spoken, at bar 59] Ten seconds.
[Spoken, at bar 63] Rinse. Spit. Procedure complete. Copy.
[Instrumental: piano tag, brushed cymbal, stop]
[End]`,
    bpm: 128,
    duration_seconds: 120,
    section_targets: teethTargets,
    stems: ['Full mix'],
    generation_tips: rlTips(teethCues, ['Use the Bunny persona. Half-time feel means the drums feel like 64 BPM while the bar grid stays at 128; check that the section lengths still add up to 30 s each.']),
    post_processing: rlPost(64, '120.000'),
  },
  {
    id: 'microwave-1-30-severe-reheating-advisory',
    title: 'Microwave 1:30 — Severe Reheating Advisory',
    section: E,
    purpose: 'Ninety seconds of microwave in Dr. Farrago\'s lane: she forecasts catastrophe for the kitchen, calls halfway and ten seconds, and is wrong again at the ding. Free-tier song and the Farrago persona source.',
    plays_in: rlPlays('Microwave 1:30'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Space-age lounge, exactly 128 BPM with a half-time feel, 4/4, key of G major, ninety seconds. Theremin swoops and trills, vibraphone, bongos, a walking electric bass, muted brass stabs, a small string pad. Sly, dramatic, tongue-in-cheek. A dry, sly, mid-range female voice speaks a weather-bulletin opening and half-sings the verses like a lounge singer delighted by doom; she speaks the halfway and ten-second calls. Ends on a theremin swoop up and a vibraphone hit, no fade, short intro.',
    exclude_styles: 'rock, pop, EDM, synth pop, electric guitar, rap, screaming, fade out, tempo change, ballad, long intro, horror, dark ambient',
    vocal_lane: LANES.farrago + ' This entry is where the persona is created: run extra takes.',
    lyrics: `[Intro: theremin swoop, vibraphone, bongos, four bars]
[Spoken, sly, dry, female] This is Dr. Ines Farrago, Meteorology, with the kitchen forecast. Ninety seconds. Conditions: dire.

[Verse 1: lounge, half-sung, starts at bar 5]
I foresee a fog of steam, a lid that will not hold,
A plate that's hot around the edge, and in the middle, cold,
I predict a spill, a splash, a small domestic doom,
I've been wrong each day since ninety-eight. The streak fills up the room.

[Spoken, at bar 25] Halfway. Rotate if you must. I predicted this. Not this, exactly. Something worse.

[Verse 2: half-sung, starts at bar 27]
I foresee a fork left in, a rogue potato, sparks,
A soup that reaches escape velocity and leaves its marks,
And yet each morning, every day, the kitchen just goes on,
The streak protects me, I am wrong, and being wrong's my song.

[Spoken, at bar 43] Ten seconds. Stand back. It will be... fine. It always is. Regrettably.
[Spoken, at bar 48] Ding. The forecast was wrong. The streak holds. Good day.
[Instrumental: theremin swoop up, vibraphone hit, stop]
[End]`,
    bpm: 128,
    duration_seconds: 90,
    section_targets: { intro: 0, forecast_open: 3.75, verse_1: 7.5, halfway: 45, verse_2: 48.75, ten_seconds: 78.75, ding: 88.125, end: 90 },
    stems: ['Full mix', 'Vocal stem for quiet mode'],
    generation_tips: rlTips('Open at bar 1 (0:00), Halfway at bar 25 (0:45), Ten seconds at bar 43 (1:18.75), Ding at bar 48 (1:28), end at bar 48 (1:30)', [
      'Run five generations: the accepted take becomes the Farrago persona. Choose the one where "wrong" sounds like a boast, not an apology.',
      'Theremin is a tag the model sometimes replaces with a synth lead; reject takes with no audible theremin.',
    ]),
    post_processing: rlPost(48, '90.000', ['The word "Ding" must sit inside the last bar so the app can also play its own ding tap sound (entry 51) on the same beat without a double.']),
  },
  {
    id: 'microwave-1-30-rotation-complete',
    title: 'Microwave 1:30 — Rotation Complete',
    section: E,
    purpose: 'Ninety seconds of microwave as a big band number for the house band, with Lionel Abara confirming halfway and ten seconds with "copy".',
    plays_in: rlPlays('Microwave 1:30'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Big band swing, exactly 128 BPM medium swing, 4/4, key of G major, ninety seconds. Full brass and sax sections, walking upright bass, ride cymbal, piano comping, a shout chorus near the end. Confident, playful, crisp. Ensemble gang vocals sing the lines; a low, dry, deadpan male voice speaks the word "copy" at three points; the band pauses for each spoken word. Ends on a brass tag and a cymbal choke, no fade, short intro.',
    exclude_styles: 'rock, pop, EDM, synth, electric guitar, rap, screaming, fade out, tempo change, ballad, long intro, smooth jazz',
    vocal_lane: LANES.house + ' The "copy" lines are Lionel Abara; keep them dry and unimpressed.',
    lyrics: `[Intro: brass swell, ride cymbal, four bars]
[Sung, ensemble, starts at bar 5]
Ninety seconds on the clock, the plate goes round and round,
The band is here, the lid is on, we're covered, safe and sound.
[Spoken, low male, dry] Copy.

[Verse: ensemble]
It's not a launch, it's not a landing, it's a plate of last night's dinner,
But the band plays every window, and the window's getting thinner.

[Spoken, low male, at bar 25] Halfway. Copy.

[Verse: ensemble, starts at bar 27]
Rotate the plate, or don't, we're not the boss of you,
The band will play the ninety, and the ninety's nearly through.

[Spoken, low male, at bar 43] Ten seconds. Copy.
[Sung, shout chorus] Stand back, stand by, the door's about to go!
[Spoken, low male, at bar 48] Ding. Copy. Rotation complete.
[Instrumental: brass tag, cymbal choke, stop]
[End]`,
    bpm: 128,
    duration_seconds: 90,
    section_targets: { intro: 0, verse_1: 7.5, halfway: 45, verse_2: 48.75, ten_seconds: 78.75, ding: 88.125, end: 90 },
    stems: ['Full mix'],
    generation_tips: rlTips('Halfway at bar 25 (0:45), Ten seconds at bar 43 (1:18.75), Ding at bar 48 (1:28), end at bar 48 (1:30)', ['Keep the take where "copy" is spoken flat; the joke is that he is unmoved.']),
    post_processing: rlPost(48, '90.000'),
  },
  {
    id: 'kettle-3-00-watched-pot',
    title: 'Kettle 3:00 — Watched Pot',
    section: E,
    purpose: 'Three minutes of kettle in Gus\'s lane, the janitor waiting with you: he knows where everything lives except patience. Cues at 1:00, 1:30, 2:00 and 2:30. Free-tier song and the Gus persona source.',
    plays_in: rlPlays('Kettle 3:00'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Warm baritone folk, exactly 128 BPM with a relaxed half-time feel, 4/4, key of G major, three minutes. Fingerpicked acoustic guitar, upright bass, brushed drums, a little accordion, a harmonica answering the chorus. Warm, patient, kind, gently funny. A warm, unhurried, kind baritone male sings the verses and choruses and speaks short time calls between them, close to the microphone. Ends on a guitar tag, no fade, short intro.',
    exclude_styles: 'rock, pop, EDM, synth, electric guitar, rap, screaming, fade out, tempo change, drum fills, big finish, long intro, bluegrass speed',
    vocal_lane: LANES.gus + ' This entry is where the persona is created: run extra takes.',
    lyrics: `[Intro: acoustic guitar, upright bass, brushes, four bars]
[Spoken, warm baritone] Kettle's on. Three minutes. I'll wait with you. I've waited with every kettle in this county.

[Verse 1: starts at bar 5]
They say a watched pot never boils; I've watched a few, and they all did,
It just takes the time it takes, like finding where the keys got hid.
I know where every lunchbox lives, where every left shoe goes,
The one thing I can't locate, friend, is patience. And it shows.

[Chorus: harmonica answers]
So stand here with the kettle, and the kettle stands with you,
Three minutes is a long time, and it's also not, it's true,
The water's getting warmer, and the morning's getting through,
Watched pot, watched pot, we're watching it with you.

[Spoken, at bar 33] One minute in. Little bubbles on the bottom. That's it doing its job.

[Verse 2: starts at bar 35]
The Department of Five More Minutes has a form for waiting long,
I never filled it in; I figured I would rather sing a song.

[Spoken, at bar 49] Halfway. The hum has changed. You can hear it if you're quiet. There. That.

[Chorus]
So stand here with the kettle, and the kettle stands with you,
Three minutes is a long time, and it's also not, it's true,
The water's getting warmer, and the morning's getting through,
Watched pot, watched pot, we're watching it with you.

[Spoken, at bar 65] Two minutes. It's thinking about it. Get the cup.

[Verse 3: starts at bar 67]
The good mug's on the hook, the other mug is in the sink,
Take the good one, that's the rule, and give the kettle time to think.

[Spoken, at bar 81] Thirty seconds. Here it comes. Steady.

[Outro: sung, starts at bar 83]
Watched pot, watched pot, we watched it, and it...
[Spoken, at bar 95] Boiled. Copy. Pour.
[Instrumental: guitar tag, stop]
[End]`,
    bpm: 128,
    duration_seconds: 180,
    section_targets: { intro: 0, verse_1: 7.5, chorus_1: 37.5, one_minute: 60, verse_2: 63.75, halfway: 90, chorus_2: 93.75, two_minutes: 120, verse_3: 123.75, thirty_seconds: 150, outro: 153.75, boil: 176.25, end: 180 },
    stems: ['Full mix', 'Vocal stem for quiet mode'],
    generation_tips: rlTips('One minute at bar 33 (1:00), Halfway at bar 49 (1:30), Two minutes at bar 65 (2:00), Thirty seconds at bar 81 (2:30), Boiled at bar 95 (2:56), end at bar 96 (3:00)', [
      'Run five generations: the accepted take becomes the Gus persona for the launch bridges, the credits and every bank. Choose for warmth and diction, not range; he should sound like a man who has seen every lunchbox.',
    ]),
    post_processing: rlPost(96, '180.000'),
  },
  {
    id: 'kettle-3-00-boil-procedure',
    title: 'Kettle 3:00 — Three-Minute Boil Procedure',
    section: E,
    purpose: 'Three minutes of kettle in Augustine\'s lane: the boil as a numbered procedure, with a brass-and-snare band that takes it exactly as seriously as she does.',
    plays_in: rlPlays('Kettle 3:00'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Marching band, exactly 128 BPM, 4/4, key of G major, three minutes. Snare cadence, bass drum, cymbals, full brass, piccolo, a glockenspiel on the checklist items. Precise, brisk, dry, quietly funny. A calm, precise female voice speaks numbered checklist items over the cadence and sings the choruses with gang vocals; a low male voice speaks "copy" after each time call. Ends on a brass chord and a snare hit, no fade, short intro.',
    exclude_styles: 'slow, ballad, lo-fi, rock, EDM, synth, guitar solo, rap, screaming, fade out, tempo change, drum solo, long intro',
    vocal_lane: LANES.augustine,
    lyrics: `[Intro: snare cadence, brass, four bars]
[Spoken, calm, precise, female] Three-minute boil procedure. Item one: the kettle is on. Confirm.
[Spoken, low male] Copy.

[Verse 1: starts at bar 7, glockenspiel on each item]
Item two: the cup. Item three: the spoon. Item four: the thing that goes in the cup.
Item five: stand by. Item six: there is no item six. The procedure is mostly standing by.

[Chorus: gang vocals]
Stand by, stand by, the water's on its way,
Nothing to do but stand here, and standing here's okay,
Stand by, stand by, the kettle has a plan,
The Flight Director trusts the kettle, and the kettle trusts the band.

[Spoken, at bar 33] One minute. Copy.

[Verse 2: starts at bar 35]
Item seven: the Department of Five More Minutes has submitted a request.
Item eight: request denied. The kettle does not take requests.

[Spoken, at bar 49] Halfway. Copy.

[Chorus: gang vocals]
Stand by, stand by, the water's on its way,
Nothing to do but stand here, and standing here's okay,
Stand by, stand by, the kettle has a plan,
The Flight Director trusts the kettle, and the kettle trusts the band.

[Spoken, at bar 65] Two minutes. Copy.

[Verse 3: starts at bar 67]
Item nine: the hum has risen. Item ten: this is normal. Item eleven: so are you.

[Spoken, at bar 81] Thirty seconds. Hands clear of the spout. Copy.

[Instrumental: brass build, cadence, bars 83 to 94]
[Spoken, at bar 95] Boil confirmed. Pour. Procedure complete.
[Instrumental: brass chord, snare hit, stop]
[End]`,
    bpm: 128,
    duration_seconds: 180,
    section_targets: { intro: 0, verse_1: 11.25, chorus_1: 37.5, one_minute: 60, verse_2: 63.75, halfway: 90, chorus_2: 93.75, two_minutes: 120, verse_3: 123.75, thirty_seconds: 150, build: 153.75, boil: 176.25, end: 180 },
    stems: ['Full mix', 'Vocal stem for quiet mode'],
    generation_tips: rlTips('One minute at bar 33 (1:00), Halfway at bar 49 (1:30), Two minutes at bar 65 (2:00), Thirty seconds at bar 81 (2:30), Boil at bar 95 (2:56), end at bar 96 (3:00)', ['Use the Augustine persona. Reject takes that sing the numbered items; they must be spoken over the cadence.']),
    post_processing: rlPost(96, '180.000'),
  },
  {
    id: 'shower-5-00-rinse-cycle',
    title: 'Shower 5:00 — Rinse Cycle',
    section: E,
    purpose: 'Five minutes of shower as a surf song for the house band with Gus leading, time calls at 1:00, 2:30 and 4:00, and the rinse bridge at 4:30.',
    plays_in: rlPlays('Shower 5:00') + ' Played from a speaker outside the bathroom; the cues are written to carry over water.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Surf rock, exactly 128 BPM, 4/4, key of G major, five minutes. Reverb-drenched twangy lead guitar with tremolo picking, clean rhythm guitar, electric bass, driving drums with floor-tom rolls, combo organ, saxophone honks on the choruses. Sunny, brisk, bright, easy to hear over running water. A warm baritone male leads, gang vocals on choruses; a calm female voice speaks the time calls loudly and clearly. A half-time "rinse" bridge near the end with only organ and toms, then a final shout. Hard ending on a crash, no fade, short intro.',
    exclude_styles: 'slow, ballad, lo-fi, metal, screaming, rap, trap, EDM, synthwave, ambient, fade out, tempo change, country, acoustic, long intro',
    vocal_lane: LANES.house + ' Lead: Gus persona. Time calls: Augustine (spoken, projected).',
    lyrics: `[Intro: tremolo guitar over floor toms, eight bars]
[Spoken, calm female, projected] Shower. Five minutes. Water on.

[Verse 1: starts at bar 9]
Water on, the steam comes up, the day goes down the drain,
Whatever yesterday was wearing, it's not wearing it again.
Soap's the one thing on the manifest, and the soap's already here,
Five minutes, crew, the surf is up, and the surf is very clear.

[Chorus: sax honks, gang vocals, starts at bar 25]
Rinse cycle, rinse cycle, everybody's clean,
Rinse cycle, rinse cycle, the cleanest crew you've seen.

[Spoken, calm female, at bar 33, projected] One minute. Hair.

[Verse 2: starts at bar 35]
Hair first, that's the rule, because the hair takes the longest time,
Scrub it like you mean it, scrub it like it's yours, because it's yours, and that's the rhyme.

[Chorus: starts at bar 49]
Rinse cycle, rinse cycle, everybody's clean,
Rinse cycle, rinse cycle, the cleanest crew you've seen.

[Instrumental: guitar solo, organ, bars 57 to 80]

[Spoken, calm female, at bar 81, projected] Halfway. The rest of you.

[Verse 3: starts at bar 83]
Arms and neck and elbows, and the feet, the feet, the feet,
Nobody remembers feet, and feet remember it, and feet keep it discreet.

[Chorus: starts at bar 97]
Rinse cycle, rinse cycle, everybody's clean,
Rinse cycle, rinse cycle, the cleanest crew you've seen.

[Instrumental: guitar and sax trading, bars 105 to 128]

[Spoken, calm female, at bar 129, projected] One minute left. Finish up.

[Verse 4: starts at bar 131]
The Department of Five More Minutes has a shower permit too,
The Board of Snooze Appeals is dripping, and the Board says: no, not you.

[Bridge: RINSE, half-time, organ and toms only, starts at bar 145]
[Spoken, calm female, projected] Rinse. All of it. Soap off. Hair. Ears. Done.
[Sung, softly] Rinse, rinse, rinse it off, the water's doing all the work,

[Final shout: full band, bars 153 to 160]
Rinse cycle complete! Water off!
[Spoken, low male] Copy.
[Instrumental: crash, hard stop]
[End]`,
    bpm: 128,
    duration_seconds: 300,
    section_targets: { intro: 0, verse_1: 15, chorus_1: 45, one_minute_hair: 60, verse_2: 63.75, chorus_2: 90, solo_1: 105, halfway: 150, verse_3: 153.75, chorus_3: 180, solo_2: 195, one_minute_left: 240, verse_4: 243.75, rinse_bridge: 270, water_off: 285, end: 300 },
    stems: ['Full mix', 'Vocal stem for quiet mode'],
    generation_tips: rlTips('One minute at bar 33 (1:00), Halfway at bar 81 (2:30), One minute left at bar 129 (4:00), Rinse bridge at bar 145 (4:30), Water off at bar 153 (4:45), end at bar 160 (5:00)', [
      'The rinse bridge must be an audible drop in energy (organ and toms only); it is the cue the household hears through a door. Reject takes where the bridge is as loud as the chorus.',
      'Five minutes is long for one take; if only the bridge is off, Replace Section (up to 30 s) covers it.',
    ]),
    post_processing: rlPost(160, '300.000', ['Export a second version with a +3 dB shelf above 2 kHz for households that play it outside a closed bathroom door; the app picks by a setting.']),
  },
  {
    id: 'shower-5-00-hot-water-procedure',
    title: 'Shower 5:00 — Hot Water Procedure',
    section: E,
    purpose: 'Five minutes of shower as a disco number for the house band, Augustine\'s time calls spoken over four-on-the-floor, and the rinse bridge at 4:30 as a strings-only breakdown.',
    plays_in: rlPlays('Shower 5:00'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Disco, exactly 128 BPM, 4/4, key of G major, five minutes. Four-on-the-floor kick, open hi-hats, congas, octave bass, funky rhythm guitar, clavinet, string section, brass hits. Glittering, joyful, tight, easy to hear over running water. Ensemble vocals with falsetto backing; a calm, precise female voice speaks the time calls loudly and clearly over the beat. A strings-and-congas breakdown near the end for the rinse, then a final brass hit. Hard ending, no fade, short intro.',
    exclude_styles: 'slow, ballad, lo-fi, rock guitar solo, metal, screaming, rap, trap, dubstep, ambient, fade out, tempo change, country, acoustic, long intro',
    vocal_lane: LANES.house + ' Time calls: Augustine (spoken, projected).',
    lyrics: `[Intro: hi-hat, string swell, eight bars]
[Spoken, calm female, projected] Hot water procedure. Five minutes. Water on. Confirm.

[Verse 1: starts at bar 9]
Step in, the steam is rising, and the mirror's gone to fog,
The morning has a rhythm, and the rhythm's in the log,
Item one: get wet. Item two: stay wet. Item three: the soap.
The procedure is a simple one, and simple is the hope.

[Chorus: strings, brass hits, falsetto backing, starts at bar 25]
Hot water, hot water, the procedure says get clean,
Hot water, hot water, the shiniest crew you've seen.

[Spoken, calm female, at bar 33, projected] One minute. Hair.

[Verse 2: starts at bar 35]
Hair first, lather up, the bubbles do the counting,
Rinse it once, rinse it twice, the steam is only mounting.

[Chorus: starts at bar 49]
Hot water, hot water, the procedure says get clean,
Hot water, hot water, the shiniest crew you've seen.

[Instrumental: string run, clavinet, bars 57 to 80]

[Spoken, calm female, at bar 81, projected] Halfway. The rest of you. All of it.

[Verse 3: starts at bar 83]
Elbows, knees and shoulders, the back, as far as you can reach,
The Flight Director cannot help you there; she can only teach.

[Chorus: starts at bar 97]
Hot water, hot water, the procedure says get clean,
Hot water, hot water, the shiniest crew you've seen.

[Instrumental: brass and strings, bars 105 to 128]

[Spoken, calm female, at bar 129, projected] One minute left. Finish up.

[Verse 4: starts at bar 131]
The Department of Five More Minutes filed a steam-related appeal,
The Board reviewed it in the mirror. The Board could not see. Denied.

[Bridge: RINSE, strings and congas only, starts at bar 145]
[Spoken, calm female, projected] Rinse. Soap off. Hair. Ears. Behind the ears. Done.
[Sung, softly, falsetto] Rinse it, rinse it, let the water take it down,

[Final: full band, brass hit, bars 153 to 160]
Procedure complete! Water off!
[Spoken, low male] Copy.
[Instrumental: brass hit, hard stop]
[End]`,
    bpm: 128,
    duration_seconds: 300,
    section_targets: { intro: 0, verse_1: 15, chorus_1: 45, one_minute_hair: 60, verse_2: 63.75, chorus_2: 90, break_1: 105, halfway: 150, verse_3: 153.75, chorus_3: 180, break_2: 195, one_minute_left: 240, verse_4: 243.75, rinse_bridge: 270, water_off: 285, end: 300 },
    stems: ['Full mix', 'Vocal stem for quiet mode'],
    generation_tips: rlTips('One minute at bar 33 (1:00), Halfway at bar 81 (2:30), One minute left at bar 129 (4:00), Rinse bridge at bar 145 (4:30), Water off at bar 153 (4:45), end at bar 160 (5:00)', ['The rinse breakdown must drop the kick; if the four-on-the-floor keeps going through it, the cue is lost through a door.']),
    post_processing: rlPost(160, '300.000', ['Export the same +3 dB high-shelf variant as entry 34 for closed-door playback.']),
  },
  {
    id: 'one-minute-sixty-seconds-of-weather',
    title: 'One Minute — Sixty Seconds of Weather',
    section: E,
    purpose: 'A one-minute song in Scrub\'s lane for any sixty-second wait (hand washing, shoes on, the coat): Scrub tries to declare weather on a perfectly fine minute and is overruled by the kazoo. Persona source for Scrub.',
    plays_in: rlPlays('One minute'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Toy-instrument march, exactly 128 BPM, 4/4, key of G major, sixty seconds, no intro. Kazoo lead, toy piano, slide whistle, hand drum, tambourine, a squeaky bicycle horn. Silly, bouncy, sweet, very short. A tiny, squeaky, cheerful robot voice speaks the time calls and sing-songs the lines; a kazoo choir on the hook. Ends on a toy piano flourish and a bicycle horn, no fade.',
    exclude_styles: 'intro, slow, ballad, lo-fi, rock, EDM, distorted, guitar, orchestra, rap, screaming, fade out, tempo change, adult vocals, dark, long',
    vocal_lane: LANES.scrub + ' This entry is where the persona is created: run extra takes.',
    lyrics: `[Verse: starts at bar 1, toy piano and kazoo]
[Spoken, tiny robot voice] One minute! Scrub is in charge of the minute. Scrub declares: weather!
[Sung, sing-song]
Sixty seconds, that's a minute, and a minute is a lot,
Scrub declared some weather, and the kazoo said: it's not.
[Hook, kazoo choir] Do the thing, do the thing, do the thing you're doing, do it!

[Spoken, at bar 17] Halfway! Thirty seconds! Scrub is counting on its fingers! Scrub has one finger!
[Sung, starts at bar 19]
Keep on going, nearly there, the minute's nearly through,
Scrub is very proud of you, and Scrub is proud of Scrub too.
[Spoken, at bar 27] Ten seconds!
[Hook, kazoo choir] Do the thing, do the thing, do the thing you're doing...
[Spoken, at bar 31] Done! No weather! Clean minute!
[Instrumental: toy piano flourish, bicycle horn, stop]
[End]`,
    bpm: 128,
    duration_seconds: 60,
    section_targets: { start: 0, halfway: 30, ten_seconds: 48.75, done: 56.25, end: 60 },
    stems: ['Full mix'],
    generation_tips: rlTips('Start at bar 1 (0:00), Halfway at bar 17 (0:30), Ten seconds at bar 27 (0:48.75), Done at bar 31 (0:56), end at bar 32 (1:00)', [
      'Run five generations: the accepted take becomes the Scrub persona. Pick the voice a child would draw: round, squeaky, kind, unmistakably a machine.',
    ]),
    post_processing: rlPost(32, '60.000'),
  },
  {
    id: 'one-minute-procedure',
    title: 'One Minute — One-Minute Procedure',
    section: E,
    purpose: 'A one-minute song in Augustine\'s lane for any sixty-second wait, run as a checklist with a halfway and ten-second call.',
    plays_in: rlPlays('One minute'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Marching band, exactly 128 BPM, 4/4, key of G major, sixty seconds, no intro. Snare cadence, bass drum, bright brass, piccolo. Brisk, precise, dry, cheerful. A calm, precise female voice speaks numbered checklist items and the time calls over the cadence and sings one short hook with gang vocals; a low male voice speaks "copy" at the end. Ends on a brass chord and a snare hit, no fade.',
    exclude_styles: 'intro, slow, ballad, lo-fi, rock, EDM, synth, guitar, rap, screaming, fade out, tempo change, drum solo, long',
    vocal_lane: LANES.augustine,
    lyrics: `[Verse: starts at bar 1, snare cadence]
[Spoken, calm, precise, female] One-minute procedure. Item one: begin. Item two: continue. Item three: there is no item three. Continue.
[Hook, sung, gang vocals, starts at bar 9]
One minute, one minute, a minute is a plan,
One minute, one minute, do the thing you can.

[Spoken, at bar 17] Halfway. Item four: you are doing it. Confirmed.
[Hook, sung, starts at bar 21]
One minute, one minute, a minute is a plan,
One minute, one minute, do the thing you can.
[Spoken, at bar 27] Ten seconds.
[Spoken, at bar 31] Procedure complete.
[Spoken, low male] Copy.
[Instrumental: brass chord, snare hit, stop]
[End]`,
    bpm: 128,
    duration_seconds: 60,
    section_targets: { start: 0, hook_1: 15, halfway: 30, hook_2: 37.5, ten_seconds: 48.75, complete: 56.25, end: 60 },
    stems: ['Full mix'],
    generation_tips: rlTips('Start at bar 1 (0:00), Halfway at bar 17 (0:30), Ten seconds at bar 27 (0:48.75), Complete at bar 31 (0:56), end at bar 32 (1:00)', ['Use the Augustine persona.']),
    post_processing: rlPost(32, '60.000'),
  },
  {
    id: 'ten-minute-long-haul',
    title: 'Ten Minute — The Long Haul',
    section: E,
    purpose: 'A ten-minute song in Gus\'s lane for the long waits (the tidy, the homework, the bath), with a midpoint cue sung at 5:00. Generated as a five-minute Part A plus an Extend for Part B, because v6 generates at most eight minutes in one go.',
    plays_in: rlPlays('Ten minute') + ' The app also uses it as the default bed for a ten-minute tidy from the Re-entry card.',
    model: 'v6',
    mode: 'Custom (Part A as a normal generation; Part B via Extend from the last stable bar of Part A, pasting the Part B lyric)',
    style_prompt: 'Warm baritone folk, exactly 128 BPM with a relaxed half-time feel, 4/4, key of G major, long form. Fingerpicked acoustic guitar, upright bass, brushed drums, accordion, harmonica, an occasional mandolin; long instrumental stretches between short verses; nothing builds, the groove just carries on. Warm, patient, kind, gently funny. A warm, unhurried, kind baritone male sings short verses and speaks time calls close to the microphone; a low male voice speaks "copy". Ends on a guitar tag, no fade, short intro.',
    exclude_styles: 'rock, pop, EDM, synth, electric guitar, rap, screaming, fade out, tempo change, drum fills, big finish, key change, bluegrass speed',
    vocal_lane: LANES.gus + ' Lionel Abara for "copy".',
    lyrics: `[Part A, bars 1 to 160]

[Intro: acoustic guitar, upright bass, brushes, four bars]
[Spoken, warm baritone] Ten minutes. That's a long haul. I'll be here the whole way. I've got nowhere else to sweep.

[Verse 1: starts at bar 5]
Ten minutes is a country, and we're driving through it slow,
The radio is me, and I know every road you know,
Pick a corner, pick a pile, pick the nearest thing to you,
The Long Haul's on. The Long Haul's long. The Long Haul's getting through.

[Instrumental: guitar, accordion, harmonica, bars 21 to 60]

[Spoken, at bar 33] One minute. Copy.
[Spoken, at bar 65] Two minutes. Looking good. Copy.

[Verse 2: starts at bar 67]
The Department of Five More Minutes sent a car to slow us down,
We waved. We kept on driving. That's how you get out of town.

[Instrumental: mandolin, guitar, bars 83 to 128]

[Spoken, at bar 97] Three minutes. Copy.
[Spoken, at bar 129] Four minutes. Nearly halfway. Copy.

[Verse 3: starts at bar 131]
If you found a thing that's lost, well, put it where it lives,
And if you found a thing that's yours, that's what the Long Haul gives.

[Instrumental: guitar and bass, bars 147 to 160, settling to a stable groove]

[Part B, bars 161 to 320, begins with the midpoint cue]

[Spoken, at bar 161, warm baritone] Halfway. Five minutes down, five to go. Copy.
[Spoken, low male] Copy.

[Verse 4: starts at bar 163]
The second half is shorter, that's a thing I've always found,
The road's the same, the miles are same, but you've already covered ground.

[Instrumental: harmonica, accordion, bars 179 to 224]

[Spoken, at bar 193] Six minutes. Copy.
[Spoken, at bar 225] Seven minutes. Copy.

[Verse 5: starts at bar 227]
Whatever's left, it's less than it was, and less is good enough,
The Long Haul doesn't count the stuff. The Long Haul carries stuff.

[Instrumental: mandolin, guitar, bars 243 to 288]

[Spoken, at bar 257] Eight minutes. Copy.
[Spoken, at bar 289] Nine minutes. Last mile. Copy.

[Verse 6: starts at bar 291]
Set the last thing down, and look: the country's smaller than it seemed,
Ten minutes, and it's done, and it's exactly what we dreamed. Roughly.

[Spoken, at bar 313] Thirty seconds.
[Spoken, at bar 319] Long Haul complete. Copy.
[Instrumental: guitar tag, stop]
[End]`,
    bpm: 128,
    duration_seconds: 600,
    section_targets: { intro: 0, verse_1: 7.5, one_minute: 60, two_minutes: 120, verse_2: 123.75, three_minutes: 180, four_minutes: 240, verse_3: 243.75, midpoint: 300, verse_4: 303.75, six_minutes: 360, seven_minutes: 420, verse_5: 423.75, eight_minutes: 480, nine_minutes: 540, verse_6: 543.75, thirty_seconds: 585, complete: 596.25, end: 600 },
    stems: ['Full mix', 'Vocal stem for quiet mode'],
    generation_tips: rlTips('Minute calls at bars 33, 65, 97, 129 (1:00 to 4:00), Midpoint at bar 161 (5:00), then 193, 225, 257, 289 (6:00 to 9:00), Thirty seconds at bar 313 (9:45), Complete at bar 319 (9:56), end at bar 320 (10:00)', [
      'Generate Part A (lyric down to the Part B marker) as a normal song of about 5:00. Then use Extend from the last stable instrumental bar of Part A, pasting only the Part B lyric. The digest confirms Extend exists and continues from a stable point but does not confirm it holds tempo; check Part B reads 128 BPM and re-extend if it drifts.',
      'Fallback: generate Part B as its own song with the same prompt and persona, and join the two at bar 161 with a one-bar crossfade on the instrumental groove.',
      'Run three generations of Part A; extend only the accepted one.',
    ]),
    post_processing: rlPost(320, '600.000', [
      'If Parts A and B are separate files, join them at exactly bar 161 (300.000 s) with a 1-bar equal-power crossfade, then verify the midpoint cue is the first thing heard in Part B.',
    ]),
  },
];

// ---------------- Section F: Walk-up cues ----------------

const cuePlays = 'Fires in the manifest bridge\'s roll call window (bars 77 to 84 of any launch flavor) when this crew member taps their patch; the app starts it on the next bar boundary and their stem punches in with it. Also plays when the person picks it in settings.';

const cueTips = (extra = []) => tipsSong({
  takes: 2,
  listen: [
    'Suno will generate far more than five seconds; you are shopping for one two-bar phrase with a clear downbeat and a clean landing. Listen for a phrase that starts on a downbeat, ends on a hit, and reads as this flavor within a second.',
    'Check the tempo is 128 BPM so the phrase sits on the launch grid; a cue that is 4% off will feel like a stumble when it lands on a bar.',
  ],
  keep: 'Keep the take with the punchiest two bars, not the best song.',
  extra: ['Toggle Instrumental on and keep [Instrumental] in the lyrics box; put vocals in Exclude.', ...extra],
});

const cuePost = (extra = []) => [
  'Cut exactly two bars (3.750 s at 128 BPM) starting on a downbeat, then let the last hit ring out to 5.000 s total with a 150 ms fade at the very end.',
  'The app starts the cue on a bar boundary, so the first sample must be the downbeat transient; no pre-roll, no reverb pre-delay.',
  ...extra,
  'Loudness: -14 LUFS short-term, true peak -1 dBTP; it must be heard over an intense launch layer.',
  'Export PCM/ALAC CAF at 48 kHz; keep the unmodified original in /originals.',
];

const cueLyrics = '[Intro]\n[Instrumental: one short punchy two-bar phrase, clear downbeat, ends on a hit]\n[End]';

const walkups = [
  { id: 'walkup-mariachi', title: 'Walk-up cue — Mariachi', purpose: 'Five-second mariachi identity sting: trumpets in thirds, a strummed flourish, a hit.', style_prompt: 'Mariachi, exactly 128 BPM, 4/4, key of G major, instrumental, a short bright fanfare: two trumpets in thirds, vihuela and guitar strumming, guitarron bass, one violin flourish, ending on a strong unison hit. Joyful, proud, short. No vocals, no intro, no fade.', exclude_styles: 'vocals, singing, slow, ballad, intro, fade out, drums, synth, rock, pop, lo-fi' },
  { id: 'walkup-surf', title: 'Walk-up cue — Surf', purpose: 'Five-second surf identity sting: a tremolo-picked run down the neck into a floor-tom roll and a crash.', style_prompt: 'Surf rock, exactly 128 BPM, 4/4, key of G major, instrumental, a short sting: reverb-drenched twangy lead guitar plays a fast tremolo-picked run down the neck, floor toms roll underneath, ending on a crash cymbal and a single reverb splash. Bright, sudden, short. No vocals, no intro, no fade.', exclude_styles: 'vocals, singing, slow, ballad, intro, fade out, synth, acoustic, country, lo-fi' },
  { id: 'walkup-marching-band', title: 'Walk-up cue — Marching Band', purpose: 'Five-second marching band identity sting: a snare roll-off into a brass hit.', style_prompt: 'Marching band, exactly 128 BPM, 4/4, key of G major, instrumental, a short sting: a snare drum roll-off with bass drum, then the full brass section plays a two-note fanfare and lands on a crash cymbal. Crisp, big, short. No vocals, no intro, no fade.', exclude_styles: 'vocals, singing, slow, ballad, intro, fade out, synth, guitar, rock, pop, lo-fi' },
  { id: 'walkup-disco', title: 'Walk-up cue — Disco', purpose: 'Five-second disco identity sting: a string run up, a brass hit and a hi-hat open.', style_prompt: 'Disco, exactly 128 BPM, 4/4, key of G major, instrumental, a short sting: a string section runs up the scale over two bars of four-on-the-floor kick and open hi-hat, brass section lands a single hit with a cymbal. Glittering, short. No vocals, no intro, no fade.', exclude_styles: 'vocals, singing, slow, ballad, intro, fade out, rock guitar, metal, acoustic, lo-fi' },
  { id: 'walkup-bluegrass', title: 'Walk-up cue — Bluegrass', purpose: 'Five-second bluegrass identity sting: a banjo roll and a fiddle whoop into a chop.', style_prompt: 'Bluegrass, exactly 128 BPM with a cut-time feel, key of G major, instrumental, a short sting: a fast banjo roll for two bars with mandolin chop and upright bass, a fiddle slides up, and the band lands together on one chop. Quick, bright, short. No vocals, no intro, no fade.', exclude_styles: 'vocals, singing, slow, ballad, intro, fade out, drums, electric guitar, synth, pop country, lo-fi' },
  { id: 'walkup-big-band', title: 'Walk-up cue — Big Band', purpose: 'Five-second big band identity sting: a brass shout and a drum kick-off.', style_prompt: 'Big band swing, exactly 128 BPM medium swing, 4/4, key of G major, instrumental, a short sting: the trumpet section plays a two-bar shout figure with the saxes answering, a drum fill on the toms, and the band lands on a single stab with a cymbal choke. Confident, punchy, short. No vocals, no intro, no fade.', exclude_styles: 'vocals, singing, slow, ballad, intro, fade out, rock, synth, guitar, smooth jazz, lo-fi' },
  { id: 'walkup-kazoo-march', title: 'Walk-up cue — Kazoo March', purpose: 'Five-second kazoo march identity sting in Scrub\'s lane: a kazoo fanfare over toy piano and a bicycle horn.', style_prompt: 'Toy-instrument march, exactly 128 BPM, 4/4, key of G major, instrumental, a short sting: a kazoo choir plays a two-bar fanfare over toy piano and hand drum, and a squeaky bicycle horn honks twice on the landing. Silly, bright, short. No vocals, no intro, no fade.', exclude_styles: 'vocals, singing, slow, ballad, intro, fade out, orchestra, rock, synth, guitar, dark, lo-fi' },
  { id: 'walkup-lullaby', title: 'Walk-up cue — Lullaby', purpose: 'Five-second lullaby identity sting: a music-box phrase and a soft chime, for the crew member who wants a gentle entrance even at 7 a.m.', style_prompt: 'Lullaby, exactly 128 BPM with a half-time feel, 4/4, key of G major, instrumental, a short sting: a music-box celesta plays a two-bar rising phrase over a soft nylon-string guitar chord and ends on one soft chime. Gentle, clear, short, still audible over a band. No vocals, no intro, no fade.', exclude_styles: 'vocals, singing, drums, intro, fade out, rock, synth, pop, loud, lo-fi' },
];

const walkupEntries = walkups.map(w => ({
  id: w.id,
  title: w.title,
  section: F,
  purpose: w.purpose,
  plays_in: cuePlays,
  model: 'v6',
  mode: 'Custom (Instrumental toggle on)',
  style_prompt: w.style_prompt,
  exclude_styles: w.exclude_styles,
  vocal_lane: 'Instrumental; no character lane (the cue is the person\'s, not the crew\'s). The kazoo march borrows Scrub\'s instruments and the lullaby borrows the Re-entry palette.',
  lyrics: cueLyrics,
  bpm: 128,
  duration_seconds: 5,
  section_targets: { downbeat: 0, phrase: 0, hit: 3.75, ring_out: 3.75, end: 5 },
  stems: [],
  generation_tips: cueTips(w.id === 'walkup-lullaby' ? ['The lullaby cue must still cut through a band: pick the take with the brightest celesta, not the softest.'] : []),
  post_processing: cuePost(),
}));

module.exports = [...requestLine, ...walkupEntries];
