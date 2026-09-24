// Shared tip and post-processing text so every entry says the same thing the same way.
const BAR = (bpm) => +(240 / bpm).toFixed(4);

const LANES = {
  augustine: 'Augustine Pell (Flight Director): brass and snare lane. Female, calm, precise, mid-alto spoken delivery with short sung phrases; never raises her voice. Use the "Augustine" persona created from entry 1.',
  gus: 'Gus Marchetti (Janitor, Payload Specialist): warm baritone folk lane. Male baritone, unhurried, conversational, kind. Use the "Gus" persona created from entry 32 (Watched Pot).',
  farrago: 'Dr. Ines Farrago (Meteorologist): theremin-flecked lounge lane. Female, sly, dry, mid-range, half-spoken half-sung, delighted by doom. Use the "Farrago" persona created from entry 30.',
  bunny: 'Bunny Kowalczyk (Countdown Announcer): late-night jazz lane. Low, smoky, unhurried; pick the take that sounds most like 2 a.m. radio (a low alto or a soft baritone both fit) and save it as the "Bunny" persona from entry 16 (Re-entry Jazz, Tidy).',
  scrub: 'Scrub (abort robot): kazoo and toy piano lane. Tiny, squeaky, cheerful robot voice, almost childlike, mostly spoken with sing-song phrases. Use the "Scrub" persona created from entry 36.',
  house: 'House band (no single character lane): ensemble gang vocals with a warm baritone male lead (Gus persona optional) and short spoken lines from Augustine (calm female) and Lionel Abara (low male "copy").',
  lionel: 'Lionel Abara (CAPCOM): no lane of his own in WINNER.md; a low, dry, deadpan male spoken voice that only ever says variations of "copy".',
};

function postSong(bpm, opts = {}) {
  const bar = BAR(bpm);
  const arr = [
    `Trim the head to the first downbeat and the tail to the last bar boundary; at ${bpm} BPM a bar is ${bar} s, so every cut lands on a multiple of ${bar} s from the first downbeat.`,
    `Check tempo with a BPM detector. If the take is within ±3% of ${bpm} BPM, time-stretch it to exactly ${bpm} (pitch-preserving) before trimming; if it is further off, reject the take rather than stretch it.`,
    ...(opts.extra || []),
    opts.level || 'Loudness: normalise to -16 LUFS integrated, true peak -1 dBTP.',
    'Export a 48 kHz 24-bit WAV master, then ALAC-in-CAF (or PCM CAF) for the app bundle; never ship AAC for anything that loops or butts against another clip (AAC priming frames break gapless playback).',
    'Keep the unmodified Suno original (WAV as downloaded) untouched in /originals with a checksum; all edits live in /derived.',
  ];
  return arr;
}

function postLoop(bpm, bars, opts = {}) {
  const bar = BAR(bpm);
  return [
    `Cut a ${bars}-bar loop (${+(bars * bar).toFixed(3)} s) between two downbeats; match the cut to zero crossings and audition at least twenty passes for a click or a lurch.`,
    ...(opts.extra || []),
    opts.level || 'Loudness: normalise to -18 LUFS integrated (this is a bed, it sits under UI and speech), true peak -1 dBTP.',
    'Ship as PCM/ALAC CAF and loop with AVAudioEngine scheduling; do not rely on AAC or on a player-level loop flag.',
    'Keep the unmodified Suno original untouched in /originals with a checksum.',
  ];
}

function postSting(opts = {}) {
  return [
    opts.trim || 'Trim to the sting itself: cut at the attack of the first note and let the natural ring-out finish, then a 100 ms fade so the file ends in silence.',
    ...(opts.extra || []),
    opts.level || 'Loudness: -14 LUFS short-term, true peak -1 dBTP (stings must read over the launch mix without startling anyone).',
    'Export PCM/ALAC CAF at 48 kHz; keep the unmodified Suno original in /originals.',
  ];
}

function tipsSong(opts = {}) {
  const takes = opts.takes || 3;
  return [
    `Run ${takes} generations (${takes * 2} takes at 2 songs per 10-credit generation; Max Mode doubles the cost and is rarely worth it here).`,
    ...(opts.listen || []),
    opts.keep || 'Keep the take whose cues land closest to the bar map; a slightly weaker mix can be fixed, timing cannot.',
    'If one section is wrong and the rest is right, use Replace Section (10 to 30 s) on that section before regenerating the whole song.',
    ...(opts.extra || []),
  ];
}

module.exports = { BAR, LANES, postSong, postLoop, postSting, tipsSong };
