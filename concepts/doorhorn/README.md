# Doorhorn (working title) — concept package

A deadpan mission-control comedy that lives in your phone and runs one launch a day: yours. A piece of original music is the schedule, the cue and the role call for a household's morning launch and bedtime re-entry. One phone, one speaker, no accounts, no subscription, one purchase.

The name is provisional. See the legal document for the name-clearance results before any asset is drawn.

## How this package fits together

| File | What it is | Read it when |
| --- | --- | --- |
| `../tournament/WINNER.md` | The winning concept synthesis from the 35-agent tournament: pitch, loop, cast, music system, risks, judge dissent | First, for the whole idea in one read |
| `01-product-spec.md` | Problems, audiences, the three daily moments, manifest and Hold item, crew roll call, Scrub and mission log, onboarding, accessibility, edge cases, data model, free versus paid, phased scope with acceptance criteria | Planning what to build |
| `02-world-bible-and-scripts.md` | The world, the cast bible, tone rules, vocabulary, and the script book (station IDs, launch calls, manifest templates, forecasts, Re-entry calls, End Credits, seasonal flavors), plus cast-name safety checks | Writing any line the app says or sings |
| `03-music-system.md` | Tempo and bar math, the section-map schema, stems and layers, exact-length songs, Re-entry descent, End Credits assembly, loudness and formats, the Suno production pipeline with ffmpeg commands, rights and records | Producing and integrating audio |
| `suno-library/` | The paste-ready Suno library: README, one entry per track in markdown, and the same entries as JSON | Sitting down in Suno to generate |
| `04-visual-design-system.md` | Palette, type, the annotated score component, character art direction, icon, every screen, motion, screenshot storyboard, Envato Elements shortlist and production plan | Designing screens and assets |
| `05-monetization-and-app-store.md` | Pricing, StoreKit setup, paywall copy, the full App Store listing ready to paste, review-guideline risk table, launch plan, revenue scenarios, support FAQ | Preparing App Store Connect |
| `06-technical-architecture-and-build-plan.md` | Platform floor, modules, section-map contract, arranger and audio timing, scheduling with AlarmKit and Live Activities, entry points, data model, asset budget, code sketches, tests, 16-week build plan | Opening Xcode |
| `07-legal-ip-and-rights-checklist.md` | Name clearance, original IP inventory and registration, Suno rights procedure, Envato license rules, art and tone safety, App Store compliance, privacy policy draft, launch-day checklist | Before launch, and for a lawyer |
| `prototype/index.html` | Playable browser prototype of the core loop with a synthesized score (also published as a claude.ai artifact) | Feeling the loop in sixty seconds |

## The rights position in one paragraph

Every lyric, script, section map, character and line of code is original and written by a person; those are the protectable assets. Audio is treated as a replaceable layer: it is generated in the developer's own paid Suno account, on the licensed model line, with dated records kept off-platform, and the station ID, fanfare and launch melody are re-recorded by a human musician in year one. Nothing from Bob's Burgers, South Park, American Dad or the Avengers films appears anywhere; the package borrows their energy (ensemble warmth, satire of invented institutions, "everyone shows up" stakes) with an original world.

## Tools connected to this project

- `../../connector/creative-bridge/` — a private claude.ai connector for Envato Market (and an opt-in Suno-compatible adapter) deployed at https://creative-bridge-mcp.netlify.app. Its README explains setup.
