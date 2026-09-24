// Regenerates per-topic research digests and top-concept dossiers from results.json.
// Usage: node concepts/tournament/extract-digests.mjs
import fs from "node:fs";
import path from "node:path";
const here = path.dirname(new URL(import.meta.url).pathname);
const r = JSON.parse(fs.readFileSync(path.join(here, "results.json"), "utf8"));
const out = path.join(here, "digest");
fs.mkdirSync(out, { recursive: true });
// Research topics are in the order the tournament ran them.
const ORDER = ["legal-ip", "suno", "envato", "market-gaps", "monetization", "aesthetic"];
const shortName = (i, topic) => ORDER[i] || topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
r.research.forEach((t, i) => {
  const md = ["# " + t.topic, "", t.summary, "", "## Key facts (sourced)", ...t.key_facts.map((f) => "- " + f.fact + "\n  Source: " + f.source_url), "", "## Implications for the concept", ...t.implications_for_concept.map((x) => "- " + x), "", "## Open uncertainties", ...t.open_uncertainties.map((x) => "- " + x)].join("\n");
  fs.writeFileSync(path.join(out, `research-${shortName(i, t.topic)}.md`), md);
});
for (const name of ["Launch Window", "Dreadlines", "Split Level", "Caper", "Pull It Off", "Cold Open"]) {
  const c = r.concepts.find((x) => x.name === name);
  const ref = r.refuted.find((x) => x.concept.name === name);
  const judges = r.verdicts.map((v) => ({ judge: v.judge_lens, score: v.scores.find((s) => s.concept_name === name) }));
  fs.writeFileSync(path.join(out, `concept-${name.toLowerCase().replace(/\s+/g, "-")}.json`), JSON.stringify({ concept: c, refutation: ref && ref.refutation, judges }, null, 1));
}
fs.writeFileSync(path.join(out, "synthesis.json"), JSON.stringify(r.synthesis, null, 1));
console.log("digests written to", out, fs.readdirSync(out).join(", "));
