const { LANES, postSong, tipsSong } = require('./helpers.js');

const C = 'C. Re-entry';
const D = 'D. End Credits';

// ---------------- Section C: Re-entry ----------------

const reentryPlays = (n, phase) => `Re-entry, segment ${n} of 4 (${phase}), starting at bedtime minus twenty and running five minutes; the app crossfades to the next segment at the last bar boundary. Drives the Live Activity phase name and the dusk-purple to lamp-amber sky.`;

const reentryTips = (segment, extra = []) => tipsSong({
  takes: 3,
  listen: [
    `Listen for the tempo: this segment must read ${segment.bpm} BPM start to finish, because the descent from 80 to 56 across the four segments is the whole design. Reject any take that pushes.`,
    'Listen for a real dynamic ceiling: nothing in Re-entry should ever get louder than the segment before it.',
    'The spoken phase call at the top ("First: the room", "Next: teeth", and so on) must be spoken, not sung, and must land inside the first eight bars.',
  ],
  keep: 'Keep the take with the steadiest tempo and the softest ending; the segments are crossfaded, so a clean last bar matters more than a strong first one.',
  extra: [
    'Use the Bunny persona (created from entry 16) for all eight segments so the two Re-entry tracks are the same announcer in two rooms.',
    'Write "no drum fills, no crescendo" into the Exclude field as given; the model likes to build toward endings and Re-entry must not.',
    ...extra,
  ],
});

const reentryPost = (bpm, bars, extra = []) => postSong(bpm, {
  extra: [
    `Trim to exactly ${bars} bars (300.000 s) from the first downbeat; the app crossfades over the last bar, so leave the natural decay inside the file rather than a fade.`,
    'Level-match the four segments to each other, then make each one 1 dB quieter than the one before, so the descent is audible in level as well as tempo.',
    ...extra,
  ],
  level: 'Loudness: -20 LUFS integrated (bedtime), true peak -3 dBTP.',
});

const lullabyStyle = (bpm, extra) => `Lullaby, ${bpm} BPM, 4/4, key of G major, very gentle. Music-box celesta, nylon-string guitar fingerpicking, soft sustained strings, a low bowed bass, a faint brushed snare with no fills. Warm, dim, unhurried, lamp-lit. A low, smoky, unhurried late-night radio voice speaks short announcements between softly sung lines; the singing is quiet and close, never belted. ${extra} Ends on a held soft chord with no crescendo and no fade.`;

const lullabyExclude = 'drum fills, crescendo, big finish, loud, rock, pop, EDM, synth lead, electric guitar, trap, rap, distorted, upbeat, fast, cheerful, fade out, tempo change';

const jazzStyle = (bpm, extra) => `Late-night jazz, ${bpm} BPM, 4/4, key of G major, slow and intimate. Brushed drums with no fills, upright bass, sparse piano, a muted trumpet answering the voice, a little vibraphone; small room, close microphones, warm and dim. A low, smoky, unhurried late-night radio voice talks and half-sings the lines like a sign-off. ${extra} Ends on a held soft chord with no crescendo and no fade.`;

const jazzExclude = 'drum fills, crescendo, big finish, loud, big band, swing shout, rock, pop, EDM, synth, electric guitar, trap, rap, distorted, upbeat, fast, fade out, tempo change, saxophone solo';

const reentry = [
  // ---- Lullaby ----
  {
    id: 'reentry-lullaby-1-tidy',
    title: 'Re-entry Lullaby — Segment 1, Tidy (80 BPM)',
    section: C,
    purpose: 'First five minutes of the lullaby Re-entry: Bunny opens the night desk and the household puts things back where they live.',
    plays_in: reentryPlays(1, 'TIDY'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: lullabyStyle(80, 'The tempo is steady at 80 BPM for the whole five minutes.'),
    exclude_styles: lullabyExclude,
    vocal_lane: LANES.bunny,
    lyrics: `[Intro: music box and nylon guitar, four bars]
[Spoken, low, smoky, unhurried]
Good evening. This is Re-entry. Cul-de-Sac Mission Control, night desk.
Splashdown in twenty. First: the room. Everything goes back where it lives.

[Verse 1: TIDY, softly sung]
The blocks go in the box, the box goes on the shelf,
The shelf is where it always was, it got there by itself.
The cup goes to the kitchen, the socks go to the bin,
The couch is not a closet, but the couch has always been.

[Chorus: softly sung, strings enter]
Re-entry, re-entry, easy on the way down,
Nothing's on fire, nobody's late, we're the only ones in town.
Put it back, put it back, where it lives is where it goes,
Re-entry, re-entry, and the night desk knows.

[Instrumental: music box and guitar, twelve bars]

[Verse 2: softly sung]
The Department of Five More Minutes closed at seven. It's past seven.
The Board of Snooze Appeals went home. So everybody's even.
Pick up the one thing near your foot. Now the one thing near that.
That's tidy. That's the whole procedure. The night desk says: copy that.

[Chorus: softly sung]
Re-entry, re-entry, easy on the way down,
Nothing's on fire, nobody's late, we're the only ones in town.
Put it back, put it back, where it lives is where it goes,
Re-entry, re-entry, and the night desk knows.

[Instrumental: music box, strings, eight bars, getting quieter]
[Spoken, low]
Room's clear. Next: teeth. Splashdown in fifteen.
[Instrumental: held soft chord]
[End]`,
    bpm: 80,
    duration_seconds: 300,
    section_targets: { intro: 0, open: 12, verse_1: 36, chorus: 84, instrumental: 132, verse_2: 168, chorus_2: 216, instrumental_2: 264, next_call: 288, end: 300 },
    stems: ['Full mix', 'Optional vocal stem (Auto Split) for quiet mode, where only the spoken calls play over a hum'],
    generation_tips: reentryTips({ bpm: 80 }),
    post_processing: reentryPost(80, 100),
  },
  {
    id: 'reentry-lullaby-2-teeth',
    title: 'Re-entry Lullaby — Segment 2, Teeth (72 BPM)',
    section: C,
    purpose: 'Second segment: bedtime teeth with the quadrant cues sung gently at thirty-second intervals inside a two-minute window, then face and pajamas.',
    plays_in: reentryPlays(2, 'TEETH') + ' The teeth window is 0:30 to 2:30 of this segment; the app fires its own soft quadrant cue at 0:30, 1:00, 1:30 and 2:00 on top of the sung ones.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: lullabyStyle(72, 'The tempo is steady at 72 BPM for the whole five minutes; the sung cues "switch" are soft, not commands.'),
    exclude_styles: lullabyExclude,
    vocal_lane: LANES.bunny,
    lyrics: `[Intro: music box, nylon guitar, eight bars]
[Spoken, low, smoky, unhurried]
Night desk. Next: teeth. Two minutes, four corners, no hurry. Brush on the word.

[Verse 1: TEETH quadrant one, softly sung, starts at bar 10]
Top left. Small circles, slow, the way the lamp goes low.
The day is put away, and the toothbrush says so.

[Verse 2: quadrant two, starts at bar 19]
Switch. Top right. The ones that did the chewing today.
They chewed a lot. They earned this. Let the small circles stay.

[Verse 3: quadrant three, starts at bar 28]
Switch. Bottom left. That's halfway, and halfway is fine.
Nobody's counting but the night desk, and the night desk lost the line.

[Verse 4: quadrant four, starts at bar 37]
Switch. Bottom right. Then the tongue, and then you're through.
Rinse. Spit. Look at that. The procedure's done with you.

[Spoken, low, at bar 46]
Teeth: clear. Now the face, then pajamas. There's time.

[Chorus: softly sung, strings]
Re-entry, re-entry, easy on the way down,
Warm water, a towel, the softest shirt in town.
Put it on, put it on, the one that's soft and slow,
Re-entry, re-entry, and the night desk knows.

[Instrumental: music box and strings, sixteen bars, quieter]

[Spoken, low]
Pajamas: confirmed. Next: the book. Splashdown in ten.
[Instrumental: held soft chord]
[End]`,
    bpm: 72,
    duration_seconds: 300,
    section_targets: { intro: 0, teeth_call: 10, quadrant_1: 30, quadrant_2: 60, quadrant_3: 90, quadrant_4: 120, teeth_clear: 150, face_and_pajamas_chorus: 156.7, instrumental: 210, next_call: 263.3, hold: 276.7, end: 300 },
    stems: ['Full mix', 'Optional vocal stem for quiet mode'],
    generation_tips: reentryTips({ bpm: 72 }, [
      'At 72 BPM a bar is 3.333 s and 30 s is exactly 9 bars; each quadrant verse is written as 9 bars (2 bars of cue, 7 of verse). Check that the four "Switch" words fall near 0:30, 1:00, 1:30 and 2:00 after the first downbeat; within four seconds is acceptable because the app overlays its own cue.',
      'If the cues drift, do not stretch the whole segment; use Replace Section on the late verse or accept and let the app cue carry it.',
    ]),
    post_processing: reentryPost(72, 90, [
      'Record the measured time of each "Switch" in the section map so the app can place its overlay cue on the same bar rather than exactly at :30.',
    ]),
  },
  {
    id: 'reentry-lullaby-3-book',
    title: 'Re-entry Lullaby — Segment 3, Book (64 BPM)',
    section: C,
    purpose: 'Third segment: the book. Mostly instrumental so a parent can read over it; Bunny only opens it and closes it.',
    plays_in: reentryPlays(3, 'BOOK') + ' Ducked by 6 dB while the app detects speech near the phone is not in v1; instead this segment is simply quiet.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: lullabyStyle(64, 'Almost entirely instrumental: after the opening announcement the voice only hums a wordless melody twice, very quietly, and speaks one closing line. Long spaces of only music box and guitar. Steady at 64 BPM.'),
    exclude_styles: lullabyExclude + ', lyrics, verses, singing words',
    vocal_lane: LANES.bunny,
    lyrics: `[Intro: music box alone, four bars]
[Spoken, low, smoky, unhurried]
Night desk. Next: the book. One book. Choose it, and I'll be quiet.

[Instrumental: music box, nylon guitar, soft strings, twenty-four bars]

[Hummed, wordless, very soft, eight bars]
Mm, mm, mm, mm.

[Instrumental: nylon guitar and low bass only, twenty-four bars]

[Hummed, wordless, very soft, eight bars]
Mm, mm, mm, mm.

[Spoken, low, at bar 73]
Last page. Copy. Next: lights. Splashdown in five.
[Instrumental: music box and strings, held soft chord, eight bars, quieter still]
[End]`,
    bpm: 64,
    duration_seconds: 300,
    section_targets: { intro: 0, book_call: 15, instrumental_1: 30, hum_1: 120, instrumental_2: 150, hum_2: 240, last_page_call: 270, end: 300 },
    stems: ['Full mix', 'Instrumental-only stem (Auto Split, vocals removed) for households that want no humming under reading'],
    generation_tips: reentryTips({ bpm: 64 }, [
      'The model will want to add words to the hum; reject any take that sings lyrics in the instrumental stretches. Adding "wordless" to the tag and "lyrics, verses" to Exclude helps but is not a guarantee.',
    ]),
    post_processing: reentryPost(64, 80),
  },
  {
    id: 'reentry-lullaby-4-lights-splashdown',
    title: 'Re-entry Lullaby — Segment 4, Lights and Splashdown (56 BPM)',
    section: C,
    purpose: 'Final segment: lights out, a long lullaby, and the splashdown call. The app appends the buzzer-and-lights-off sting (entry 50) at the last bar.',
    plays_in: reentryPlays(4, 'LIGHTS then SPLASHDOWN') + ' Ends the day; the End Credits (Section D) roll after the buzzer.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: lullabyStyle(56, 'The slowest and quietest segment, steady at 56 BPM, near resting pulse; the voice is almost a whisper by the end.'),
    exclude_styles: lullabyExclude,
    vocal_lane: LANES.bunny,
    lyrics: `[Intro: music box, four bars]
[Spoken, low, smoky, almost a whisper]
Night desk. Lights. The big one first, then the small one. The small one can stay.

[Verse: softly sung, LIGHTS]
The launch tower's dark, the counter's clear,
The sky's gone purple, the lamp is here,
Nothing left on the manifest tonight,
Nothing at all, and that's all right.

[Chorus: softly sung, strings very low]
Re-entry, re-entry, easy on the way down,
The Department of Five More Minutes is asleep, it's the quietest place in town.
Close your eyes, close your eyes, that's the last thing on the list,
Re-entry, re-entry, and you won't be missed. Not tonight. Not by us.

[Instrumental: music box and low strings, twenty-four bars, getting quieter]

[Hummed, wordless, very soft, eight bars]
Mm, mm, mm, mm.

[Spoken, whisper, at bar 63]
Splashdown in thirty. Crew, stand down. You were excellent. Copy.

[Instrumental: held soft chord, four bars, fading toward silence but not silent]
[End]`,
    bpm: 56,
    duration_seconds: 300,
    section_targets: { intro: 0, lights_call: 17.1, verse: 34.3, chorus: 68.6, instrumental: 120, hum: 222.9, splashdown_call: 265.7, hold: 282.9, end: 300 },
    stems: ['Full mix'],
    generation_tips: reentryTips({ bpm: 56 }, [
      'The last line before the hold, "Splashdown in thirty", is the cue the buzzer sting is timed from; it must be spoken at about 4:25 to 4:30 of the segment.',
    ]),
    post_processing: reentryPost(56, 70, [
      'Do not add a fade at the end: the buzzer sting (entry 50) is cut in by the app on the final bar, and the sting brings its own silence.',
    ]),
  },
  // ---- Late-night jazz ----
  {
    id: 'reentry-jazz-1-tidy',
    title: 'Re-entry Jazz — Segment 1, Tidy (80 BPM)',
    section: C,
    purpose: 'First five minutes of the late-night jazz Re-entry: the same night desk, same phases, in Bunny\'s native lane. This take also becomes the Bunny persona.',
    plays_in: reentryPlays(1, 'TIDY'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: jazzStyle(80, 'Steady at 80 BPM for the whole five minutes; the muted trumpet only plays between vocal lines.'),
    exclude_styles: jazzExclude,
    vocal_lane: LANES.bunny + ' This entry is where the persona is created: run extra takes.',
    lyrics: `[Intro: brushes, upright bass, piano, four bars]
[Spoken, low, smoky, unhurried]
Good evening. You're listening to Re-entry, from the night desk at Cul-de-Sac Mission Control.
Splashdown in twenty. First: the room. Nothing dramatic. Just put it where it lives.

[Verse 1: TIDY, talk-sung, muted trumpet answers]
The blocks go in the box, and the box knows where it goes,
The cup goes back to the kitchen, on its own, I suppose.
The socks have found the laundry, or the laundry has found the socks,
Either way, that's tidy, and the night desk never knocks.

[Chorus: softly sung, vibraphone]
Re-entry, re-entry, easy on the way down,
Nothing's on fire, nobody's late, the quietest room in town.
Put it back, put it back, where it lives is where it goes,
Re-entry, re-entry, and the night desk knows.

[Instrumental: piano and brushes, muted trumpet, twelve bars]

[Verse 2: talk-sung]
The Department of Five More Minutes closed at seven, and it's past seven.
The Board of Snooze Appeals has left. The two of us are even.
Pick up the one thing near your foot. Now the one thing near that.
That's tidy. That's the whole procedure. Night desk: copy that.

[Chorus: softly sung]
Re-entry, re-entry, easy on the way down,
Nothing's on fire, nobody's late, the quietest room in town.
Put it back, put it back, where it lives is where it goes,
Re-entry, re-entry, and the night desk knows.

[Instrumental: piano, bass, eight bars, quieter]
[Spoken, low]
Room's clear. Next: teeth. Splashdown in fifteen.
[Instrumental: held soft chord]
[End]`,
    bpm: 80,
    duration_seconds: 300,
    section_targets: { intro: 0, open: 12, verse_1: 36, chorus: 84, instrumental: 132, verse_2: 168, chorus_2: 216, instrumental_2: 264, next_call: 288, end: 300 },
    stems: ['Full mix', 'Optional vocal stem for quiet mode'],
    generation_tips: reentryTips({ bpm: 80 }, [
      'Run five generations here, not three: the take you keep becomes the Bunny persona for every Re-entry segment, the weekend lounge and the buzzer line. Pick for warmth and diction at low volume, not for range.',
    ]),
    post_processing: reentryPost(80, 100),
  },
  {
    id: 'reentry-jazz-2-teeth',
    title: 'Re-entry Jazz — Segment 2, Teeth (72 BPM)',
    section: C,
    purpose: 'Second jazz segment: bedtime teeth with the quadrant cues talk-sung at thirty-second intervals inside a two-minute window, then face and pajamas.',
    plays_in: reentryPlays(2, 'TEETH') + ' Teeth window 0:30 to 2:30 of the segment; the app overlays its own soft quadrant cue.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: jazzStyle(72, 'Steady at 72 BPM; the sung cue "switch" is a soft aside, not a command; a brushed rim click marks each new quadrant.'),
    exclude_styles: jazzExclude,
    vocal_lane: LANES.bunny,
    lyrics: `[Intro: brushes and bass, eight bars]
[Spoken, low, smoky, unhurried]
Night desk. Next: teeth. Two minutes, four corners. I'll call the corners; you do the rest.

[Verse 1: TEETH quadrant one, talk-sung, starts at bar 10]
Top left. Small circles, slow, like the record's winding down.
The day's a little dusty; we'll brush it out of town.

[Verse 2: quadrant two, starts at bar 19]
Switch. Top right. The molars did the heavy work today.
They chewed through a whole Tuesday. Give them a minute. Let them stay.

[Verse 3: quadrant three, starts at bar 28]
Switch. Bottom left. Halfway. The trumpet says it's true.
Nobody's counting but the trumpet, and the trumpet's counting for you.

[Verse 4: quadrant four, starts at bar 37]
Switch. Bottom right. Then the tongue. Then rinse. Then spit.
Look at that. Procedure complete. The night desk logs it.

[Spoken, low, at bar 46]
Teeth: clear. Now the face, warm water, then the soft shirt.

[Chorus: softly sung, vibraphone]
Re-entry, re-entry, easy on the way down,
Warm water, a towel, the softest shirt in town.
Put it on, put it on, the one that's soft and slow,
Re-entry, re-entry, and the night desk knows.

[Instrumental: piano, muted trumpet, sixteen bars, quieter]

[Spoken, low]
Pajamas: confirmed. Next: the book. Splashdown in ten.
[Instrumental: held soft chord]
[End]`,
    bpm: 72,
    duration_seconds: 300,
    section_targets: { intro: 0, teeth_call: 10, quadrant_1: 30, quadrant_2: 60, quadrant_3: 90, quadrant_4: 120, teeth_clear: 150, face_and_pajamas_chorus: 156.7, instrumental: 210, next_call: 263.3, hold: 276.7, end: 300 },
    stems: ['Full mix', 'Optional vocal stem for quiet mode'],
    generation_tips: reentryTips({ bpm: 72 }, [
      'At 72 BPM, 30 s is exactly 9 bars; each quadrant verse is 9 bars. Check the four "Switch" words against 0:30, 1:00, 1:30 and 2:00 from the first downbeat; within four seconds is fine because the app overlays its own cue.',
    ]),
    post_processing: reentryPost(72, 90, [
      'Record the measured time of each "Switch" in the section map so the app places its overlay cue on the same bar.',
    ]),
  },
  {
    id: 'reentry-jazz-3-book',
    title: 'Re-entry Jazz — Segment 3, Book (64 BPM)',
    section: C,
    purpose: 'Third jazz segment: the book. Piano, bass and brushes with long spaces so a parent can read; Bunny opens and closes it only.',
    plays_in: reentryPlays(3, 'BOOK'),
    model: 'v6',
    mode: 'Custom',
    style_prompt: jazzStyle(64, 'Almost entirely instrumental: after the opening announcement the voice only hums a wordless melody twice, very quietly, and speaks one closing line. Long stretches of piano, bass and brushes only. Steady at 64 BPM.'),
    exclude_styles: jazzExclude + ', lyrics, verses, singing words',
    vocal_lane: LANES.bunny,
    lyrics: `[Intro: piano alone, four bars]
[Spoken, low, smoky, unhurried]
Night desk. Next: the book. One book. Choose it, and I'll get out of the way.

[Instrumental: piano, upright bass, brushes, twenty-four bars]

[Hummed, wordless, very soft, eight bars]
Mm, mm, mm, mm.

[Instrumental: bass and brushes only, muted trumpet very far away, twenty-four bars]

[Hummed, wordless, very soft, eight bars]
Mm, mm, mm, mm.

[Spoken, low, at bar 73]
Last page. Copy. Next: lights. Splashdown in five.
[Instrumental: piano, held soft chord, eight bars, quieter still]
[End]`,
    bpm: 64,
    duration_seconds: 300,
    section_targets: { intro: 0, book_call: 15, instrumental_1: 30, hum_1: 120, instrumental_2: 150, hum_2: 240, last_page_call: 270, end: 300 },
    stems: ['Full mix', 'Instrumental-only stem for households that want no humming under reading'],
    generation_tips: reentryTips({ bpm: 64 }, [
      'Reject takes that add words to the hum or a trumpet solo in the reading stretches.',
    ]),
    post_processing: reentryPost(64, 80),
  },
  {
    id: 'reentry-jazz-4-lights-splashdown',
    title: 'Re-entry Jazz — Segment 4, Lights and Splashdown (56 BPM)',
    section: C,
    purpose: 'Final jazz segment: lights out, the sign-off, and the splashdown call; the app appends the buzzer-and-lights-off sting (entry 50) on the last bar.',
    plays_in: reentryPlays(4, 'LIGHTS then SPLASHDOWN') + ' Ends the day; the End Credits roll after the buzzer.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: jazzStyle(56, 'The slowest and quietest segment, steady at 56 BPM, near resting pulse; brushes only, the piano plays single notes, the voice is a whisper by the end.'),
    exclude_styles: jazzExclude,
    vocal_lane: LANES.bunny,
    lyrics: `[Intro: single piano notes, bass, four bars]
[Spoken, low, smoky, almost a whisper]
Night desk. Lights. The big one first, then the small one. The small one can stay on for me.

[Verse: talk-sung, LIGHTS]
The launch tower's dark, the counter's clear,
The sky's gone purple, and the lamp is here,
Nothing left on the manifest tonight,
Nothing at all, and that's all right.

[Chorus: softly sung, vibraphone very low]
Re-entry, re-entry, easy on the way down,
The Department of Five More Minutes is asleep, it's the quietest place in town.
Close your eyes, close your eyes, that's the last thing on the list,
Re-entry, re-entry, and you won't be missed. Not tonight. Not by us.

[Instrumental: piano single notes, bass, brushes, twenty-four bars, getting quieter]

[Hummed, wordless, very soft, eight bars]
Mm, mm, mm, mm.

[Spoken, whisper, at bar 63]
Splashdown in thirty. Crew, stand down. You were excellent. Copy.

[Instrumental: held soft chord, four bars, quieter but not silent]
[End]`,
    bpm: 56,
    duration_seconds: 300,
    section_targets: { intro: 0, lights_call: 17.1, verse: 34.3, chorus: 68.6, instrumental: 120, hum: 222.9, splashdown_call: 265.7, hold: 282.9, end: 300 },
    stems: ['Full mix'],
    generation_tips: reentryTips({ bpm: 56 }, [
      '"Splashdown in thirty" must be spoken at about 4:25 to 4:30 of the segment; the buzzer sting is timed from it.',
    ]),
    post_processing: reentryPost(56, 70, [
      'No fade at the end; the app cuts the buzzer sting (entry 50) in on the final bar.',
    ]),
  },
];

// ---------------- Section D: End Credits ----------------

const bankStyle = 'Warm baritone folk, 128 BPM with a relaxed half-time feel, 4/4, key of G major. Fingerpicked acoustic guitar, upright bass, brushed drums, a little accordion, a two-bar repeating vamp that never changes. A warm, unhurried, kind baritone male sings a list: one short line every two bars, the same short melodic cell each time, with a clear pause between lines, like reading names at a small ceremony. Nothing builds; the vamp just continues. Hard clean stop at the end, no fade.';

const bankExclude = 'chorus, build, crescendo, drum fills, harmonies, backing vocals, rock, pop, EDM, synth, electric guitar, rap, trap, fade out, tempo change, key change, ballad slow';

const bankStems = ['Vocal stem (Auto Split): the shipped asset is the isolated vocal, sliced per line', 'Instrumental stem: kept only for checking alignment against the template bed (entry 20); not shipped'];

const bankTips = (what, extra = []) => tipsSong({
  takes: 4,
  listen: [
    `Listen for: each ${what} line sung as its own two-bar phrase with a real gap before the next; identical melodic cell on every line; the same Gus voice as entry 32; no harmonies; the vamp staying at 128 BPM.`,
    'Reject any take where the singer runs two lines together, adds a harmony, or changes the tune for a line; runtime assembly depends on every line being interchangeable.',
  ],
  keep: 'Keep the take with the most uniform lines, even if one line is weak: fix that single line with Replace Section (it is well inside the 10 to 30 s window) rather than take a livelier but uneven performance.',
  extra: [
    'Use the Gus persona (from entry 32). Vocal gender: male. Keep Weirdness and Variety low; this is the one place where "boring and identical" is the goal.',
    ...extra,
  ],
});

const bankPost = (lines, extra = []) => [
  'Auto Split the accepted take and work from the vocal stem only.',
  `Slice the vocal stem into ${lines} clips at bar boundaries (a bar is 1.875 s; each line is 2 bars = 3.750 s). The written layout is: 2-bar intro vamp, then lines in groups of five, with a 2-bar instrumental turnaround after each group; so line n starts at bar 3 + 2(n-1) + 2 × floor((n-1)/5). Verify by ear; Suno's layout is approximate.`,
  'Each clip: start on the bar, keep the natural consonant onset (do not cut the breath), end exactly 3.750 s later with a 40 ms fade; no reverb tail should cross into the next bar.',
  'Name clips by the line key given in the lyric comments (for example manifest-item-lunchbox.caf).',
  'Check every clip against the template bed (entry 20) in a DAW: the vocal must sit in G major over the vamp; if the accepted take came out in another key, pitch-shift the whole stem by the smallest interval (at most two semitones) before slicing, or regenerate.',
  ...extra,
  'Loudness: match all clips to -18 LUFS short-term so no item is louder than another; true peak -3 dBTP; the app adds the bed.',
  'Ship PCM/ALAC CAF at 48 kHz. Keep the unmodified original in /originals.',
];

const credits = [
  {
    id: 'end-credits-template',
    title: 'End Credits — Template (60 seconds)',
    section: D,
    purpose: 'The 60-second sung credits sequence that rolls over the lit launch tower after splashdown. The generated vocal is a demo; at runtime the app plays this song\'s instrumental bed and drops bank clips (entries 21 to 26) into the slots, billing order computed from the day\'s manifest and who carried it.',
    plays_in: 'After the Re-entry buzzer, over the lit-tower card; the card then hangs on the clothesline widget. Also the audio behind the shareable card if the household exports it.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: 'Warm baritone folk, 128 BPM with a relaxed half-time feel, 4/4, key of G major, 60 seconds. Fingerpicked acoustic guitar, upright bass, brushed drums, accordion, a glockenspiel doubling the melody; a two-bar vamp that repeats under a credits roll. Warm, wry, contented, like the end of a small film. A warm, unhurried, kind baritone male sings the credits one line every two bars with a clear pause between lines; a low, smoky late-night voice speaks the last word. Ends on a resolved chord with a single glockenspiel note, no fade.',
    exclude_styles: 'build, crescendo, drum fills, big finish, rock, pop, EDM, synth, electric guitar, rap, trap, fade out, tempo change, key change, harmonies',
    vocal_lane: 'Gus Marchetti persona (baritone) for every sung line; Bunny Kowalczyk (low spoken) for the final "Splashdown confirmed".',
    lyrics: `[Intro: credits vamp, acoustic guitar, brushed drums, glockenspiel, four bars]

[Verse: billing, one line every two bars]
Top billing tonight: the one who carried the most.
Co-starring: the one who found the shoes.
Special guest star, with the best line of the night.
With: everyone who showed up. That's the whole cast.
And introducing: first launch, first credit.
And Scrub, as the weather.

[Verse: the manifest, carried, one line every two bars]
The photo money, in the envelope, with the name on it.
The library book, it's due, you know it's due.
The dog, who is also going. The dog agrees.
The good water bottle. Not the other one. The good one.

[Bridge: the joke, two bars]
The keys were found where the keys always are.

[Outro: four bars]
Produced by the household. Filmed on location, in a kitchen.
[Spoken, low, smoky] Splashdown confirmed. Good night.
[Instrumental: resolved chord, one glockenspiel note, stop]
[End]`,
    bpm: 128,
    duration_seconds: 60,
    section_targets: { intro: 0, billing: 7.5, manifest_carried: 30, joke: 45, outro: 48.75, splashdown_confirmed: 52.5, end: 60 },
    stems: ['Instrumental bed (Auto Split, vocals removed): the shipped runtime asset', 'Vocal stem: kept as the demo credits for the store preview and as the alignment reference for the bank clips', 'Full mix: the fallback credits if a household has no manifest data'],
    generation_tips: tipsSong({
      takes: 4,
      listen: [
        'Listen for the vamp never changing under the lines: the runtime drops clips onto this bed at any bar, so the bed must be the same in every bar of the billing and manifest sections.',
        'The slots must be one line per two bars with a real gap; this take is the alignment reference for all six banks.',
        'The last spoken word must be Bunny, not Gus: two personas in one song is unreliable, so if the model sings the last line, accept it and take "Splashdown confirmed" from entry 50 instead.',
      ],
      keep: 'Keep the take with the most even vamp and the clearest pauses; charm is secondary here.',
      extra: ['Use the Gus persona. Create the banks (entries 21 to 26) only after this template is accepted, so every bank is checked against this bed.'],
    }),
    post_processing: postSong(128, {
      extra: [
        'Trim to 32 bars (60.000 s). Slot map on the bed: intro bars 1-4; billing slots bars 5-16 (six 2-bar slots); manifest slots bars 17-24 (four 2-bar slots); joke slot bars 25-26; outro bars 27-32 with "Splashdown confirmed" at bar 29.',
        'Auto Split, then ship the instrumental bed; mute nothing else. Verify the bed loops cleanly on any 2-bar boundary from bar 5 to bar 26 in case the app needs to extend the credits for a long manifest.',
      ],
      level: 'Loudness: bed at -20 LUFS integrated so the clips (at -18 LUFS short-term) read on top; true peak -3 dBTP.',
    }),
  },
  {
    id: 'end-credits-item-bank-1-school-day',
    title: 'End Credits — Manifest item bank 1 (school day, 10 lines)',
    section: D,
    purpose: 'Ten sung manifest item lines in Gus\'s lane, generated as one song and sliced into 2-bar vocal clips for the morning bridge and the night credits: lunchbox, library book, water bottle, homework, permission slip, photo money, field-trip form, violin, cleats, swim bag.',
    plays_in: 'Runtime assembly: the manifest bridge of every launch flavor (bars 61 to 72) and the End Credits manifest slots; also the Test Fire demo if the household edits the demo manifest.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: bankStyle,
    exclude_styles: bankExclude,
    vocal_lane: LANES.gus,
    lyrics: `[Intro: vamp, two bars]
[Verse: one line every two bars, same melody each line]
The lunchbox, packed and by the door.
The library book, it's due, you know it's due.
The water bottle, filled, the lid on tight.
The homework, finished, or at least it's in the bag.
The permission slip, signed, the real signature.
[Instrumental: turnaround, two bars]
[Verse: one line every two bars]
The photo money, in the envelope, with the name on it.
The field-trip form, the one that's due today.
The violin, in the case, and the case is closed.
The cleats, in the bag, not on the kitchen floor.
The swim bag, with a towel this time.
[Instrumental: turnaround, two bars, hard stop]
[End]`,
    bpm: 128,
    duration_seconds: 48.75,
    section_targets: { intro: 0, lines_1_to_5: 3.75, turnaround_1: 22.5, lines_6_to_10: 26.25, turnaround_2: 45, end: 48.75 },
    stems: bankStems,
    generation_tips: bankTips('item', ['Line keys, in order: lunchbox, library-book, water-bottle, homework, permission-slip, photo-money, field-trip-form, violin, cleats, swim-bag.']),
    post_processing: bankPost(10),
  },
  {
    id: 'end-credits-item-bank-2-work-and-errands',
    title: 'End Credits — Manifest item bank 2 (work and errands, 10 lines)',
    section: D,
    purpose: 'Ten sung manifest item lines in Gus\'s lane: keys, charger, laptop, badge, wallet, bus pass, lunch order, gym bag, thermos, medication.',
    plays_in: 'Runtime assembly: launch bridge item slots and End Credits manifest slots.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: bankStyle,
    exclude_styles: bankExclude,
    vocal_lane: LANES.gus,
    lyrics: `[Intro: vamp, two bars]
[Verse: one line every two bars, same melody each line]
The keys, wherever the keys may be.
The charger, the one that actually works.
The laptop, closed, and charged, we hope.
The badge, on the lanyard, on you.
The wallet, back pocket, left, as usual.
[Instrumental: turnaround, two bars]
[Verse: one line every two bars]
The bus pass, in the wallet, in the pocket.
The lunch order, it's already in, you're covered.
The gym bag, and the shoes are in the bag.
The thermos, the lid is on. Check it. It's on.
The medication, taken, and the bottle's in the bag.
[Instrumental: turnaround, two bars, hard stop]
[End]`,
    bpm: 128,
    duration_seconds: 48.75,
    section_targets: { intro: 0, lines_1_to_5: 3.75, turnaround_1: 22.5, lines_6_to_10: 26.25, turnaround_2: 45, end: 48.75 },
    stems: bankStems,
    generation_tips: bankTips('item', ['Line keys, in order: keys, charger, laptop, badge, wallet, bus-pass, lunch-order, gym-bag, thermos, medication.', 'The medication line is deliberately neutral and factual; reject any take that plays it for a laugh.']),
    post_processing: bankPost(10),
  },
  {
    id: 'end-credits-item-bank-3-weather-gear-and-house',
    title: 'End Credits — Manifest item bank 3 (weather, gear and house, 10 lines)',
    section: D,
    purpose: 'Ten sung manifest item lines in Gus\'s lane: umbrella, snow boots, sunscreen, hat, mittens, glasses, dog, trash, recycling, the good water bottle.',
    plays_in: 'Runtime assembly: launch bridge item slots and End Credits manifest slots.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: bankStyle,
    exclude_styles: bankExclude,
    vocal_lane: LANES.gus,
    lyrics: `[Intro: vamp, two bars]
[Verse: one line every two bars, same melody each line]
The umbrella. Dr. Farrago said rain. So: sun.
The snow boots, both of them, the left one and the right.
The sunscreen, on your face, not just in the bag.
The hat, it's on your head, that's where hats go.
The mittens, both, they're clipped, they're a pair.
[Instrumental: turnaround, two bars]
[Verse: one line every two bars]
The glasses, on your face, that was the hard part.
The dog, who is also going. The dog agrees.
The trash, it's trash day, the trash goes out with you.
The recycling, rinsed, and mostly sorted.
The good water bottle. Not the other one. The good one.
[Instrumental: turnaround, two bars, hard stop]
[End]`,
    bpm: 128,
    duration_seconds: 48.75,
    section_targets: { intro: 0, lines_1_to_5: 3.75, turnaround_1: 22.5, lines_6_to_10: 26.25, turnaround_2: 45, end: 48.75 },
    stems: bankStems,
    generation_tips: bankTips('item', ['Line keys, in order: umbrella, snow-boots, sunscreen, hat, mittens, glasses, dog, trash, recycling, good-water-bottle.', 'The umbrella line is the only one with a second voice implied (Farrago is named, not heard); keep it in Gus\'s voice.']),
    post_processing: bankPost(10),
  },
  {
    id: 'end-credits-role-billing-bank',
    title: 'End Credits — Role billing bank (6 lines)',
    section: D,
    purpose: 'Six sung billing lines in Gus\'s lane: top billing, co-star, guest star, with, and introducing, Scrub. The person\'s name is shown on the card, never sung, so one clip per billing tier serves every household.',
    plays_in: 'End Credits billing slots (bars 5 to 16 of the template bed), in the order the app computes from carried load; the guest star slot is always followed by a joke clip.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: bankStyle,
    exclude_styles: bankExclude,
    vocal_lane: LANES.gus,
    lyrics: `[Intro: vamp, two bars]
[Verse: one line every two bars, same melody each line]
Top billing tonight: the one who carried the most.
Co-starring: the one who found the shoes.
Special guest star, with the best line of the night.
With: everyone who showed up. That's the whole cast.
And introducing: first launch, first credit.
[Instrumental: turnaround, two bars]
[Verse: one line, two bars]
And Scrub, as the weather.
[Instrumental: turnaround, two bars, hard stop]
[End]`,
    bpm: 128,
    duration_seconds: 33.75,
    section_targets: { intro: 0, lines_1_to_5: 3.75, turnaround_1: 22.5, scrub_line: 26.25, end: 33.75 },
    stems: bankStems,
    generation_tips: bankTips('billing', [
      'Line keys, in order: top-billing, co-star, guest-star, with, and-introducing, scrub.',
      'Optional extension for v1.2 (not counted here): the same six lines with a crew role appended ("Top billing tonight: Pilot") for households that want roles sung; generate as a second bank song, do not mix into this one.',
    ]),
    post_processing: bankPost(6),
  },
  {
    id: 'end-credits-joke-bank',
    title: 'End Credits — Joke line bank (10 lines, no numbers)',
    section: D,
    purpose: 'Ten sung one-line jokes in Gus\'s lane for the guest star slot; the card shows exactly one. No line contains a number, because the credits show billing order and one joke, never a count.',
    plays_in: 'End Credits joke slot (bars 25 to 26 of the template bed); one per night, chosen by the day\'s log (a scrub picks the weather lines, a cleared Hold item picks the Hold line) and never repeated within a week.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: bankStyle,
    exclude_styles: bankExclude,
    vocal_lane: LANES.gus,
    lyrics: `[Intro: vamp, two bars]
[Verse: one line every two bars, same melody each line, deadpan]
The keys were found where the keys always are.
No lunchboxes were harmed in the making of this morning.
Weather was declared. Weather was not consulted.
The Hold item remains on the manifest, and sends its regards.
Dr. Farrago's forecast was wrong again. The streak is safe.
[Instrumental: turnaround, two bars]
[Verse: one line every two bars]
Lionel said copy. Nobody had asked.
The Department of Five More Minutes applied for a permit. Denied.
The shoes were in the last place anyone looked: the shoe place.
Filmed on location, in a kitchen, before anyone was ready.
The good water bottle made it home. The other one is a mystery.
[Instrumental: turnaround, two bars, hard stop]
[End]`,
    bpm: 128,
    duration_seconds: 48.75,
    section_targets: { intro: 0, lines_1_to_5: 3.75, turnaround_1: 22.5, lines_6_to_10: 26.25, turnaround_2: 45, end: 48.75 },
    stems: bankStems,
    generation_tips: bankTips('joke', [
      'Line keys, in order: keys-always-are, no-lunchboxes-harmed, weather-not-consulted, hold-sends-regards, farrago-streak-safe, lionel-copy, permit-denied, shoe-place, filmed-in-a-kitchen, other-bottle-mystery.',
      'These lines are longer than the item lines; if a take squeezes one into less than two bars or spills past, use Replace Section on that line. Deadpan delivery only; reject takes that laugh.',
    ]),
    post_processing: bankPost(10),
  },
  {
    id: 'manifest-hold-and-memory-bank',
    title: 'Manifest — Hold-item day count, common Hold tasks and last-seen tails',
    section: D,
    purpose: 'The remaining sung fragments the manifest needs at runtime, in Gus\'s lane: thirty day-count tails (day one to day thirty, growth caps at thirty), the tag "still on the manifest", ten common Hold tasks, a generic Hold line for free-text tasks, six "last seen" memory tails, and a generic "one more thing" item line for items not in the banks.',
    plays_in: 'The Hold slot of the launch bridge (bars 73 to 76): "And the ⟨task⟩," + "⟨day N⟩," + "still on the manifest."; the keys line and any item with a remembered location gets a last-seen tail; items outside the banks use the generic line with the text shown on the Live Activity.',
    model: 'v6',
    mode: 'Custom',
    style_prompt: bankStyle + ' In this song most lines are only one bar long: one short fragment per bar, spoken-sung on the same two notes, with a tiny pause between fragments, like reading a ledger.',
    exclude_styles: bankExclude,
    vocal_lane: LANES.gus,
    lyrics: `[Intro: vamp, two bars]
[Verse: Hold task openers, one per bar, same two notes each]
And the dentist call,
And the form,
And the email,
And the garage,
And the thank-you note,
And the return,
And the appointment,
And the phone call,
And the paperwork,
And the closet,
And the one you've been holding,
[Instrumental: turnaround, two bars]
[Verse: day counts, one per bar, same two notes each]
day one, day two, day three, day four, day five,
day six, day seven, day eight, day nine, day ten,
day eleven, day twelve, day thirteen, day fourteen, day fifteen,
day sixteen, day seventeen, day eighteen, day nineteen, day twenty,
day twenty-one, day twenty-two, day twenty-three, day twenty-four, day twenty-five,
day twenty-six, day twenty-seven, day twenty-eight, day twenty-nine, day thirty,
[Instrumental: turnaround, two bars]
[Verse: tags, one per bar]
still on the manifest.
No judgment. Just the manifest.
[Instrumental: turnaround, two bars]
[Verse: last-seen tails, one per bar]
last seen kitchen counter.
last seen in the car.
last seen by the shoes.
last seen in a coat.
last seen on the hook.
last seen: nobody knows.
[Instrumental: turnaround, two bars]
[Verse: generic item line, two bars]
And one more thing. You know the thing.
[Instrumental: turnaround, two bars, hard stop]
[End]`,
    bpm: 128,
    duration_seconds: 118.125,
    section_targets: { intro: 0, hold_openers: 3.75, day_counts: 28.125, tags: 88.125, last_seen_tails: 95.625, generic_item: 110.625, end: 118.125 },
    stems: bankStems,
    generation_tips: bankTips('fragment', [
      'This is the riskiest bank: thirty-one one-bar fragments in a row. Run six generations. Reject any take that turns the day counts into a melody or rushes two into one bar; the clips must each be exactly one bar.',
      'If the day counts come out uneven, generate them as a separate song (only the day-count verse) with the same prompt; the persona keeps the voice consistent.',
      'Line keys: hold-dentist-call, hold-form, hold-email, hold-garage, hold-thank-you-note, hold-return, hold-appointment, hold-phone-call, hold-paperwork, hold-closet, hold-generic; day-01 to day-30; tag-still-on-the-manifest, tag-no-judgment; seen-kitchen-counter, seen-in-the-car, seen-by-the-shoes, seen-in-a-coat, seen-on-the-hook, seen-nobody-knows; item-generic.',
    ]),
    post_processing: bankPost(50, [
      'This bank does not follow the groups-of-five layout in the previous step: the layout is a 2-bar intro, 11 one-bar openers, a 2-bar turnaround, 30 one-bar day counts, a turnaround, 2 one-bar tags, a turnaround, 6 one-bar last-seen tails, a turnaround, one 2-bar generic item line, and a closing turnaround (63 bars). Slice by that map and verify by ear.',
      'One-bar clips are 1.875 s; the generic item line is a two-bar clip (3.750 s). The runtime Hold line is assembled as opener (1 bar) + day count (1 bar) + "still on the manifest" (1 bar) + "No judgment. Just the manifest." (1 bar) = 4 bars, which is exactly the Hold slot (bars 73 to 76).',
    ]),
  },
];

module.exports = [...reentry, ...credits];
