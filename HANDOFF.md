# Handoff — Doorhorn app concept, Creative Bridge connector, and where everything stands

Written 24 September 2026 for a fresh Claude session (or a person) picking this work up with no memory of the previous session. Read this file first, then `concepts/tournament/WINNER.md`, then `concepts/doorhorn/README.md`.

## 1. What the owner asked for

An app or game to sell legitimately on the Apple App Store: not bland or niche, truly unique and worth paying for, solving problems that have little or no solutions, something anyone can fold into daily life, vibrant and colorful, drawing on the energy of Bob's Burgers, South Park, American Dad and the two Avengers ensemble films; all music made with Suno; Envato used for layouts, fonts and references. The owner is a solo iOS developer with an active Apple Developer account who previously shipped **Constellate**, a local-only daily-reading app (its privacy page is `index.html` at the repo root; that is the only thing this repo held before this work).

Two constraints were established and accepted:
- **No licensed characters.** Named characters, likenesses, logos or quotes from those shows and films cannot ship in a paid app (App Store guideline 5.2.1 and trademark law; see the legal digest). The concept captures their energy with an original world and cast.
- **Suno music must be generated in the owner's own paid Suno account.** Suno has no public API (only an invite-only partner intake form as of July 2026), its terms forbid automated access, and commercial rights attach only to Pro/Premier subscribers' own downloads. Every "Suno API" on the market is a third-party wrapper and would put the rights in doubt.

## 2. The decision: Doorhorn (working title)

A 35-agent tournament (6 research topics, 18 concepts from 6 lenses, a competitor hunt per concept, 4 judges, 1 synthesis) chose **Launch Window**, renamed to the working title **Doorhorn**: a deadpan mission-control comedy that runs a household's morning launch and bedtime re-entry through original music. The song is the schedule: phases WAKE, DRESS, MANIFEST, DOOR, LIFTOFF; the janitor sings the manifest; the horns mean shoes and door; a crew roll call punches stems in on the bar; Scrub is a blameless abort ("weather"); Re-entry runs bedtime in reverse and rolls sung End Credits; the Request Line plays songs exactly as long as the day's small waits. One phone, one speaker, no accounts, no subscription, one purchase ($9.99 unlock; free tier complete in itself).

The full synthesis, cast (Augustine Pell, Gus Marchetti, Dr. Ines Farrago, Bunny Kowalczyk, Lionel Abara, Scrub), music system, pricing, grafts from runner-up concepts, risks and judge dissent are in `concepts/tournament/WINNER.md`. Do not rename characters or phases without the owner's say-so. The product name is provisional pending trademark checks (document 07).

## 3. Repository map (branch `claude/app-store-game-concept-kzvywq`)

```
HANDOFF.md                                  this file
index.html                                  Constellate privacy page (pre-existing; untouched)
concepts/tournament/
  WINNER.md                                 readable synthesis of the tournament
  results.json                              every stage's raw output (research, concepts, refutations, judges)
  extract-digests.mjs                       regenerates digest/ from results.json
  digest/                                   per-topic research digests + top-concept dossiers (inputs for the writers)
concepts/doorhorn/
  README.md                                 package index
  01-product-spec.md                        DONE
  02-world-bible-and-scripts.md             DONE
  03-music-system.md                        see status table below
  suno-library/README.md, suno-library.md, suno-library.json   see status table below
  04-visual-design-system.md                DONE
  05-monetization-and-app-store.md          see status table below
  06-technical-architecture-and-build-plan.md   see status table below
  07-legal-ip-and-rights-checklist.md       see status table below
  prototype/index.html                      playable browser prototype (DONE)
  _briefs/                                  the brief for every document above, for regeneration or rewrites
connector/creative-bridge/                  Creative Bridge MCP connector (DONE, deployed)
```

### Status of the package documents

| Document | State when this handoff was last updated |
| --- | --- |
| 01-product-spec.md | written and committed |
| 02-world-bible-and-scripts.md | written and committed |
| 03-music-system.md | written and committed |
| 04-visual-design-system.md | written and committed |
| 05-monetization-and-app-store.md | written and committed |
| suno-library/ (README.md, suno-library.md, suno-library.json) | writer was still running |
| 06-technical-architecture-and-build-plan.md | writer was still running |
| 07-legal-ip-and-rights-checklist.md | writer was still running |

**Check the file list.** Any document above that is missing on disk was not finished before the previous session ended; regenerate it from its brief in `concepts/doorhorn/_briefs/` (the briefs reference only files that exist in this repo). None of the documents has had a cross-document consistency review yet; that review is the first open task after the package is complete (section 6).

## 4. Things that live outside the repo

| Thing | Where | State |
| --- | --- | --- |
| Creative Bridge connector (remote MCP server) | https://creative-bridge-mcp.netlify.app on the owner's Netlify account, site id `8c8e21fb-b54b-44be-8108-3aeaa8e6c4d4`, project `creative-bridge-mcp` | Deployed and verified live: discovery metadata, 401 handshake, dynamic registration all answer. `/mcp` returns 503 until the owner sets `CONNECTOR_PASSPHRASE`. Signing secret is self-managed in Netlify Blobs. Code in `connector/creative-bridge/`; local 20-check smoke test passes. |
| Playable prototype artifact | https://claude.ai/artifact/1iEwxV3GnA51VPnqtBDcGK (private to the owner) | Published from the same HTML as `concepts/doorhorn/prototype/index.html`. To update it from a new session, pass that URL as `url` when publishing. |
| Suno | owner's account (no connector exists in Claude's directory) | Nothing automated. The paste-ready library is the deliverable. Recommended path: a session on the owner's own computer (Claude Desktop or `claude remote-control`) driving Suno in their signed-in browser. The owner should also apply to Suno's partner API program. |
| Envato Elements | owner's account (no connector exists) | The connector covers Envato Market via the official API once `ENVATO_TOKEN` is set. Elements has no content API; the connector and the visual document hand over direct search links. |

## 5. What only the owner can do (pending on their side)

1. Netlify → site `creative-bridge-mcp` → Site configuration → Environment variables: add `CONNECTOR_PASSPHRASE` (a long phrase). Optional: `ENVATO_TOKEN` from https://build.envato.com/create-token/ with permissions *View and search Envato sites*, *List purchases you've made*, *Download your purchased items*, *View your account profile details*. Optional and discouraged for final masters: `SUNO_PROVIDER=sunoapi` plus `SUNO_API_KEY` (third-party service; drafts only).
2. claude.ai → Customize → Connectors → + → Add custom connector → URL `https://creative-bridge-mcp.netlify.app/mcp` → Connect → enter the passphrase → start a new session.
3. Decide the product name from the shortlist in document 07 once it exists, then run the trademark and App Store Connect checks it describes.
4. Generate the music in their own Suno Pro/Premier account from `concepts/doorhorn/suno-library/` once it exists, keeping the records the music document specifies.

Never ask the owner to paste tokens, keys or passwords into chat; they go into Netlify's environment settings.

## 6. Open tasks, in order

1. **Finish the package.** For each missing document, run its brief (`concepts/doorhorn/_briefs/`) with a subagent; regenerate `concepts/tournament/digest/` first if it is missing (`node concepts/tournament/extract-digests.mjs`).
2. **Consistency review across all documents.** Check: cast names and phases match WINNER.md; the section-map schema in 03 and 06 is identical; tempos and durations agree between 03, 06 and the Suno library; the free/paid boundary matches between 01 and 05; the name shortlist in 05 respects 07's clearance results; every factual claim has a source URL. Fix and commit.
3. **Owner review of the concept.** Confirm the name, the tone (4+/9+, warm, never blaming the household), the price, and the v1 scope (launches, Re-entry, manifest and Hold item, Scrub, mission log, three Request Line songs, Test Fire, paywall).
4. **Then build.** Document 06 carries the 16-week v1 plan; the prototype shows the loop; the Suno library and music pipeline produce the audio.

## 7. Working rules that were followed and should continue

- Commit to `claude/app-store-game-concept-kzvywq` and push with `git push -u origin claude/app-store-game-concept-kzvywq`; never push elsewhere without permission. A stop hook in this environment requires the tree to be clean before a turn ends.
- Do not create a pull request unless the owner asks.
- Keep model names out of commit messages, code comments and repo files.
- The owner prefers plain, detailed explanations that both a creative and a business reader can follow, no jokes in the assistant's own voice.
- The Workflow tool (multi-agent orchestration) was used only while the owner had ultracode on; afterwards, independent parallel writing used the Agent tool.

## 8. Session history in brief

1. Tournament workflow run (35 agents, ~2 hours); results saved to `concepts/tournament/`.
2. Creative Bridge connector built, tested locally (20/20), deployed to Netlify, login wall removed, live endpoints verified, committed.
3. Prototype built and checked headlessly through a full launch, roll call, Scrub, Re-entry, credits and a request-line song; published as an artifact; committed.
4. Eight writer agents launched for the package documents; the status table in section 3 records which landed before the session ended.
