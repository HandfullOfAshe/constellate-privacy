// Build script: one source of truth (entries-*.js) -> suno-library.md + suno-library.json
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..'); // markdown and JSON are generated from src/, edit the entries files, not the outputs

const entries = [
  ...require('./entries-ab.js'),
  ...require('./entries-cd.js'),
  ...require('./entries-ef.js'),
  ...require('./entries-g.js'),
];

const FIELDS = ['id', 'title', 'section', 'purpose', 'plays_in', 'model', 'mode', 'style_prompt', 'exclude_styles', 'vocal_lane', 'lyrics', 'bpm', 'duration_seconds', 'section_targets', 'stems', 'generation_tips', 'post_processing'];

const SECTION_ORDER = ['A. Station IDs', 'B. Launch tracks', 'C. Re-entry', 'D. End Credits', 'E. Request Line', 'F. Walk-up cues', 'G. Stings and sounds'];

const SECTION_INTRO = {
  'A. Station IDs': 'Three 30-second IDs in Augustine Pell\'s lane (brass and snare, spoken and sung). One of them is the AlarmKit alarm sound each morning (custom alarm sounds are capped at about 30 seconds), so every ID is trimmed to exactly 30.0 s. All three share the house grid of 128 BPM, where 16 bars are exactly 30 seconds.',
  'B. Launch tracks': 'One original melody, one shared lyric, six arrangements. Every daytime launch is locked to 128 BPM in G major so the four role stems (drums, bass, brass, choir) and the calm/medium/intense layers interchange across flavors, and so the Gus manifest clips from Section D drop into any flavor\'s bridge. At 128 BPM a bar is 1.875 s and four bars are 7.5 s; every phase boundary below sits on an 8-bar (15 s) grid. The master is 4:00 (128 bars); the 8, 10, 12, 15 and 20-minute launches are on-device arrangements of the same bar-aligned stems, never separate downloads. Entry 4 is a reference entry (not generated) that holds the slot map and the three example manifest verses; entries 5 to 10 are the six flavors with Example A filled in; entry 11 is the 60-second Test Fire.',
  'C. Re-entry': 'Two twenty-minute bedtime tracks in Bunny Kowalczyk\'s lane (late-night jazz voice), one arranged as a lullaby and one as late-night jazz, with the phase grammar reversed: tidy, teeth, book, lights, splashdown. Suno cannot ramp tempo inside one generation, so each track is four five-minute segments at descending tempos: 80, 72, 64 and 56 BPM (a 24 BPM descent, roughly the 20 BPM the concept calls for, ending near resting pulse). Those tempos were chosen so 5:00 is a whole number of bars in every segment (100, 90, 80 and 70 bars). The app crossfades segments at their last bar boundary and appends the Re-entry buzzer sting (Section G) after segment 4.',
  'D. End Credits': 'One 60-second template song in Gus Marchetti\'s lane (warm baritone folk) plus a bank of sung lines: 30 manifest item lines, 6 role billing lines, 10 joke lines with no numbers, and a Hold-item day-count and memory bank. Everything is at the house grid (128 BPM, G major, half-time feel) so the same isolated-vocal clips serve both the morning manifest bridge and the night credits. Each bank line is written to fill exactly two bars (3.75 s). Generation: each bank is one Custom-mode song with the Gus persona; the vocal stem is split out (Auto Split), and each line is sliced at bar boundaries into a dry 2-bar clip. At runtime the app plays the template\'s instrumental bed and drops the clips onto bar boundaries in billing order; the household names are shown on the card, never sung.',
  'E. Request Line': 'Exact-length songs with the cues sung in. All twelve are on the house grid of 128 BPM, chosen because four bars are 7.5 s, so every Request Line length (1:00, 1:30, 2:00, 3:00, 5:00 with a 4:30 bridge, 10:00 with a 5:00 midpoint) is a whole number of four-bar phrases and every cue lands on a phrase downbeat. Calmer flavors use a half-time feel at the same grid. Suno places lyrics approximately, not to the millisecond, so each entry names the bar where each cue must sit; the app also fires its own short cue clip at the exact second, so the sung cue is the flavor and the app\'s cue is the guarantee.',
  'F. Walk-up cues': 'Eight five-second identity stings, one per flavor, that fire in the manifest bridge\'s roll call window when a crew member taps their patch. Each is generated as a short instrumental song and trimmed to its best two bars at 128 BPM (3.75 s of music plus ring-out to 5.0 s), so it lands on the launch grid whatever flavor is playing.',
  'G. Stings and sounds': 'The liftoff fanfare, the Scrub klaxon, the Hold-item victory sting, the Re-entry buzzer and lights-off, a batch prompt for a dozen micro tap sounds, a CAPCOM "copy" bank, two Hangar lounge loops for overnight StandBy, the Sunday Flight Review bed, the Farrago forecast bed and the no-launch weekend lounge.',
};

function mmss(sec) {
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  const sStr = Number.isInteger(s) ? String(s).padStart(2, '0') : s.toFixed(1).padStart(4, '0');
  return `${m}:${sStr}`;
}

// ---------- validation ----------
const errors = [];
const ids = new Set();
entries.forEach((e, i) => {
  const n = i + 1;
  for (const f of FIELDS) if (!(f in e)) errors.push(`#${n} ${e.id || '?'} missing field ${f}`);
  for (const k of Object.keys(e)) if (!FIELDS.includes(k)) errors.push(`#${n} ${e.id} has extra field ${k}`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id)) errors.push(`#${n} bad id ${e.id}`);
  if (ids.has(e.id)) errors.push(`#${n} duplicate id ${e.id}`);
  ids.add(e.id);
  if (e.title.length > 80) errors.push(`#${n} ${e.id} title > 80 chars (${e.title.length})`);
  if (e.style_prompt.length >= 1000) errors.push(`#${n} ${e.id} style_prompt >= 1000 chars (${e.style_prompt.length})`);
  if (e.lyrics.length > 5000) errors.push(`#${n} ${e.id} lyrics > 5000 chars (${e.lyrics.length})`);
  if (e.exclude_styles.length > 1000) errors.push(`#${n} ${e.id} exclude > 1000`);
  if (!SECTION_ORDER.includes(e.section)) errors.push(`#${n} ${e.id} unknown section ${e.section}`);
  if (typeof e.bpm !== 'number' || typeof e.duration_seconds !== 'number') errors.push(`#${n} ${e.id} bpm/duration not numbers`);
  if (typeof e.section_targets !== 'object') errors.push(`#${n} ${e.id} section_targets not object`);
  for (const f of ['stems', 'generation_tips', 'post_processing']) if (!Array.isArray(e[f])) errors.push(`#${n} ${e.id} ${f} not array`);
  const banned = /in the style of|sounds like|style of\b/i;
  for (const f of ['style_prompt', 'lyrics', 'exclude_styles', 'vocal_lane']) if (banned.test(e[f])) errors.push(`#${n} ${e.id} banned phrase in ${f}`);
  if (/\$\{|`/.test(e.lyrics + e.style_prompt)) errors.push(`#${n} ${e.id} stray template chars`);
});
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }

// ---------- markdown ----------
const out = [];
out.push('# Doorhorn (working title) — Suno prompt library');
out.push('');
out.push('Paste-ready prompts and lyrics for every track in the app. Generated 24 September 2026 from the concept in `concepts/tournament/WINNER.md`. Read `README.md` first for the account tier, model line, persona workflow, exact-length method and the rights records to keep.');
out.push('');
out.push(`**Entries:** ${entries.length} (${entries.length - 1} generated tracks or banks plus one reference entry). **House grid:** 128 BPM, G major, for all daytime music (station IDs, launches, Request Line, manifest and credits banks, walk-up cues, fanfare). **Re-entry descent:** 80 → 72 → 64 → 56 BPM over four five-minute segments. **Model:** v6 (paid tier only). **Mode:** Custom unless stated.`);
out.push('');
out.push('Every lyric and script here is original. No brand names, real people, real agencies or franchise references appear in any prompt or lyric, and no prompt names an artist, a band or "in the style of". The crew never blames the household; the tone is warm ensemble comedy at a 4+/9+ rating.');
out.push('');
out.push('## Contents');
out.push('');
for (const sec of SECTION_ORDER) {
  out.push(`- **${sec}**`);
  entries.forEach((e, i) => { if (e.section === sec) out.push(`  - ${i + 1}. ${e.title} (\`${e.id}\`)`); });
}
out.push('');
out.push('## Cast and lanes (from WINNER.md)');
out.push('');
out.push('- **Augustine Pell**, Flight Director: brass and snare; calm, precise, speaks in checklists, never raises her voice.');
out.push('- **Gus Marchetti**, Janitor and Payload Specialist: warm baritone folk; sings the manifest; the emotional centre.');
out.push('- **Dr. Ines Farrago**, Meteorologist: theremin-flecked lounge; forecasts catastrophe, wrong every day since 1998, proud of the streak.');
out.push('- **Bunny Kowalczyk**, Countdown Announcer: late-night jazz voice; runs Re-entry; calls bedtime "splashdown".');
out.push('- **Lionel Abara**, CAPCOM: says "copy"; no lane of his own, appears as a low spoken interjection inside other lanes.');
out.push('- **Scrub**, abort robot: kazoo and toy piano; declares "weather".');
out.push('- The invented antagonist is the Department of Five More Minutes and its Board of Snooze Appeals.');
out.push('');

for (const sec of SECTION_ORDER) {
  out.push(`## ${sec}`);
  out.push('');
  out.push(SECTION_INTRO[sec]);
  out.push('');
  entries.forEach((e, i) => {
    if (e.section !== sec) return;
    const n = i + 1;
    out.push(`### ${n}. ${e.title}`);
    out.push('');
    out.push(`- **id:** \`${e.id}\``);
    out.push(`- **section:** ${e.section}`);
    out.push(`- **purpose:** ${e.purpose}`);
    out.push(`- **plays_in:** ${e.plays_in}`);
    out.push(`- **model:** ${e.model}`);
    out.push(`- **mode:** ${e.mode}`);
    out.push(`- **vocal_lane:** ${e.vocal_lane}`);
    out.push(`- **bpm:** ${e.bpm}`);
    out.push(`- **duration_seconds:** ${e.duration_seconds} (${mmss(e.duration_seconds)})`);
    const st = Object.entries(e.section_targets).map(([k, v]) => `${k} → ${mmss(v)}`).join(' · ');
    out.push(`- **section_targets:** ${st || 'none'}`);
    out.push(`- **stems:** ${e.stems.length ? e.stems.join('; ') : 'none'}`);
    out.push('');
    out.push(`**style_prompt** (${e.style_prompt.length} chars)`);
    out.push('');
    out.push('```text');
    out.push(e.style_prompt);
    out.push('```');
    out.push('');
    out.push('**exclude_styles**');
    out.push('');
    out.push('```text');
    out.push(e.exclude_styles);
    out.push('```');
    out.push('');
    out.push(`**lyrics** (${e.lyrics.length} chars)`);
    out.push('');
    out.push('```text');
    out.push(e.lyrics);
    out.push('```');
    out.push('');
    out.push('**generation_tips**');
    out.push('');
    e.generation_tips.forEach(t => out.push(`- ${t}`));
    out.push('');
    out.push('**post_processing**');
    out.push('');
    e.post_processing.forEach(t => out.push(`- ${t}`));
    out.push('');
  });
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'suno-library.md'), out.join('\n') + '\n');

// ---------- json ----------
const json = entries.map(e => {
  const o = {};
  for (const f of FIELDS) o[f] = e[f];
  return o;
});
fs.writeFileSync(path.join(OUT_DIR, 'suno-library.json'), JSON.stringify(json, null, 2) + '\n');

// ---------- report ----------
const bySection = {};
entries.forEach(e => { bySection[e.section] = (bySection[e.section] || 0) + 1; });
console.log('entries:', entries.length);
console.log(bySection);
console.log('max style_prompt chars:', Math.max(...entries.map(e => e.style_prompt.length)));
console.log('max lyrics chars:', Math.max(...entries.map(e => e.lyrics.length)));
console.log('md bytes:', fs.statSync(path.join(OUT_DIR, 'suno-library.md')).size, 'json bytes:', fs.statSync(path.join(OUT_DIR, 'suno-library.json')).size);
