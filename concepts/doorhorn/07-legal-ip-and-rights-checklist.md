# Doorhorn (working title): legal, intellectual-property and rights checklist

Prepared 24 September 2026 for the Doorhorn product package. Source of truth for the product is `concepts/tournament/WINNER.md`; the research digests cited below are the Suno, Envato and legal-IP digests from the same tournament.

**Summary.** Doorhorn is buildable on a clean rights footing because everything that carries its value (lyrics, scripts, section maps, characters, code, the name) is human-authored and registrable, while the Suno audio is treated as a licensed, replaceable layer. The work before launch is to pick and file a name that no one else owns, register the human-authored layers, keep an auditable rights ledger for every Suno and Envato asset, and ship metadata and a privacy label that give App Review nothing to object to.

**This document is preparation for a lawyer, not legal advice.** It collects facts, sources and open questions so that a licensed attorney can give advice efficiently. Nothing here should be relied on as a legal opinion, and several items are explicitly marked as unverified.

---

## 1. Name clearance

### 1.1 What was checked and how (24 September 2026)

For each of the seven candidates (Doorhorn, Liftoff Choir, Hornline, Gantry, Splashdown, Go Horns, T-Minus Kitchen) the following live checks were run:

- **App Store:** the public iTunes Search API (`itunes.apple.com/search`, `entity=software`) for the US and GB storefronts, top 25 results, looking for an app whose title is or contains the candidate. Web search restricted to `apps.apple.com` as a second pass.
- **Google Play:** web search restricted to `play.google.com`, plus a raw HTML probe of the Play search page (inconclusive, see gaps).
- **Web, games, podcasts, products:** general web search; Steam and SteamDB restricted searches; itch.io for one candidate.
- **Trademark registers:** the USPTO Trademark Center front end (`tmsearch.uspto.gov`) renders only with JavaScript and its JSON endpoint refused the request (HTTP 405); EUIPO eSearch plus is JavaScript-only; the WIPO Global Brand Database sits behind a CAPTCHA. Direct pages on Justia Trademarks and uspto.report returned HTTP 403. What follows for trademarks therefore comes from search-engine snippets of Justia, Trademarkia, TrademarkElite and uspto.report records. This is a knock-out screen, not a clearance search.
- **Domains:** GoDaddy's availability API for `<name>.com` and `<name>.app`. "Available" means the registry reported the exact name as registrable at the moment of the query; premium pricing was not returned.

### 1.2 Results

| Candidate | App Store (US/GB, iTunes Search API) | Google Play (web search) | Web, games, podcasts, products | Trademark signals (public mirrors) | Domains (.com / .app) | Risk |
|---|---|---|---|---|---|---|
| **Doorhorn** | No app titled "Doorhorn" in US (22 results, all door/horn utilities) or GB (14). Nearest: "myDoorHan" (DoorHan garage-door control, [apps.apple.com/us/app/mydoorhan/id6463870110](https://apps.apple.com/us/app/mydoorhan/id6463870110)). | No exact title found. | "door horn" is a generic name for an air-pump novelty doorbell (Etsy listings, a 2019 YouTube build). No company, game or podcast found. | No DOORHORN record surfaced. Near-spelling DOORHAN (Russian metal-products mark, Class 6) is listed as dead/cancelled 2019 ([trademarkia.com/doorhan-79078885](https://www.trademarkia.com/doorhan-79078885)). | Available / Available | **Low** |
| **Liftoff Choir** | No app with this name. Many "Liftoff" apps: LiftOff (id1511652103), LiftOff: The Game (id1466585995), Liftoff – Ranked Gym Workouts (id6448081563). | No exact title; LiftOff on Play (com.liftoffapp.mobile). | "Liftoff" is crowded: an ad-tech company (liftoff.io) with a podcast, a Relay-style space podcast, a Vancouver rock band, Liftoff: Micro Drones on Steam (app 1432320), and a choral piece "Liftoff Canon Chorale" (Cypress Choral Music). Nothing named "Liftoff Choir". | LIFTOFF is registered to Liftoff Mobile, Inc. (Reg. 4618689, serial 86092596; Class 42 SaaS) with a further filing (serial 88945960); HMP Labs LIFTOFF (serial 85792166); braXos LiftOff (Class 42); LIFTOFF CERTIFICATIONS (serial 98639023, Class 41). Sources: [trademarks.justia.com/860/92/liftoff-86092596.html](https://trademarks.justia.com/860/92/liftoff-86092596.html), [uspto.report/TM/88945960](https://uspto.report/TM/88945960). | Available / Available | **Medium** (composite is free, but the dominant word is registered in Classes 41 and 42 by others) |
| **Hornline** | No app titled "Hornline"; search maps to horn sound-effect apps ("Horns and Sirens", "Car Horn Simulator"). | No exact title found. | "Hornline" is the generic marching-band term for the brass section ([en.wikipedia.org/wiki/Marching_brass](https://en.wikipedia.org/wiki/Marching_brass)). No company, game, podcast or band found. | No HORNLINE record surfaced. HORN LIN (Hornling Industrial, auto locks, Reg. 4316180) and HRONLINE (PeopleStrategy) are unrelated. Sources: [trademarks.justia.com/856/68/horn-85668472.html](https://trademarks.justia.com/856/68/horn-85668472.html). | Available / Available | **Low–Medium** (clean, but App Store search neighbours are "sound effects" apps, a 4.3(b) category) |
| **Gantry** | **Taken.** "Gantry" by Chad Neal ([id6759813683](https://apps.apple.com/us/app/gantry/id6759813683)), Gantry – Coolify Manager (id6759326220), Gantry: Scene Converter, Gantry Radiology, Gantry SG, Gantry AI (id6759843816), The Gantry Apartments. | Gantry (com.gantry.app), Gantry: GRBL CNC Controller, The Gantry Apartments. | Gantry Systems, Inc. (gantry.io, ML tooling); Gantry theme framework (gantry.org). | GANTRY registered (Reg. 5462624, serial 87544357, registered 8 May 2018, Classes 41 and 42, including software design and media production) ([trademarks.justia.com/875/44/gantry-87544357.html](https://trademarks.justia.com/875/44/gantry-87544357.html)); CX-GANTRY in Class 9. | Taken / Taken | **High** (exclude) |
| **Splashdown** | No exact title; results are water games (Splashin, Splash). | "Splashdown Surge" (com.SS.SplashdownSurge). | Splashdown on Steam, a 2026 top-down shooter ([store.steampowered.com/app/4742700](https://store.steampowered.com/app/4742700/Splashdown/)); Splashdown, 2001 PS2/Xbox jet-ski game (Rainbow Studios/Infogrames) with a 2003 THQ sequel; Splashdown, a Boston band 1996–2001; three "Splashdown" waterparks (Poole, Quaywest, Fishkill NY). Generic NASA term. | SPLASHDOWN in Class 9 (video game software; serial 76254139, Reg. 2645389) cancelled under Section 8 in 2009; serial 76272002 abandoned 2003 ([trademarks.justia.com/762/54/splashdown-76254139.html](https://trademarks.justia.com/762/54/splashdown-76254139.html)). SPLASHDOWN FLAG (water sports) and SPLASH DOWN (vehicle splash guards) live in other classes. | Reported available / Available (the .com result is surprising for a common word; re-check before relying on it) | **Medium–High** (no live Class 9 mark found, but a live 2026 Steam title, a crowded common word, and App Store search that maps to space trackers) |
| **Go Horns** | No exact title; the official "Texas Longhorns" app (id347883008) and "UB Horns Up" appear. | Texas Longhorns app on Play. | The University of Texas licensing office treats "Horns" as a UT mark and restricts uses ([trademarks.utexas.edu/use-restrictions](https://trademarks.utexas.edu/use-restrictions)); UT has litigated app-name disputes before ([austinchronicle.com, 2010](https://www.austinchronicle.com/news/2010-02-12/960952/)). | HOOK 'EM HORNS (Reg. 1358128), TEXAS LONGHORNS (Reg. 3665961), HOOK 'EM (Reg. 4963680), all live, owned by the Board of Regents of the University of Texas System ([trademarks.justia.com/734/96/hook-em-73496540.html](https://trademarks.justia.com/734/96/hook-em-73496540.html)). | Taken / Available | **High** (exclude) |
| **T-Minus Kitchen** | No exact title. "T-Minus Events" (countdown app, id343230528) and "T-Minus – Space Launch Tracker" (id1496516813) exist. | No exact title ("Kitchen Multi-Timer" nearby). | No company, game, podcast or product found. | T-MINUS COUNTDOWN CLOCK (serial 78419994, Class 9 calendaring software) abandoned ([trademarkelite.com/.../78419994](https://www.trademarkelite.com/trademark/trademark-detail/78419994/T-MINUS-COUNTDOWN-CLOCK)). No live T-MINUS software mark surfaced in snippets (unverified). | Available / Available | **Low–Medium** (composite is clean, but "T-Minus" is used by two countdown apps and reads as "timer", the 4.3(b) word the listing must avoid) |

### 1.3 Recommended shortlist

1. **Doorhorn.** Coined, arbitrary for software, no app, mark, company, game or podcast found, both domains available. It also survives the 4.3(b) test best: it does not describe a timer, a countdown or a sound effect.
2. **Liftoff Choir.** The whole phrase is free everywhere checked and says what the product is. The risk is the registered LIFTOFF marks in Classes 41 and 42 held by unrelated companies; a lawyer should assess likelihood of confusion before an intent-to-use filing, and the name should never be shortened to "Liftoff" in metadata.
3. **Hornline.** Clean and suggestive, with both domains free. Two cautions: it is a generic word in marching-band vocabulary (weak as a mark on its own, stronger with a logo), and App Store search puts it next to horn sound-effect apps, which is the neighbourhood 4.3(b) now polices.

Fallback: T-Minus Kitchen is usable but pulls the listing toward "countdown timer". Exclude Gantry (name already used by at least six apps and a live registration in Classes 41 and 42) and Go Horns (University of Texas marks and an active licensing office). Splashdown is not recommended: a live 2026 Steam game of the same name plus a crowded common word is exactly the App Name Dispute scenario the legal digest warns about.

### 1.4 Filing steps for the chosen name

1. **Knock-out search at the USPTO Trademark Center** ([tmsearch.uspto.gov](https://tmsearch.uspto.gov/search/search-information); overview at [uspto.gov/trademarks/search](https://www.uspto.gov/trademarks/search)). Search the exact word, phonetic equivalents, and the word with "app". Repeat at EUIPO eSearch plus ([euipo.europa.eu/eSearch](https://euipo.europa.eu/eSearch/)) and the WIPO Global Brand Database ([branddb.wipo.int](https://branddb.wipo.int/en/)) for the launch territories. These three databases could not be queried by this document's tooling; they must be run by hand or by counsel.
2. **Classes.** File in International Class 9 (downloadable software and mobile applications), Class 41 (entertainment services, including providing non-downloadable music and entertainment content) and Class 42 (software as a service, for the future iCloud household share). Use pre-approved wording from the USPTO ID Manual ([idm-tmng.uspto.gov](https://idm-tmng.uspto.gov/id-master-list-public.html)) so the application qualifies for the base fee.
3. **Intent-to-use (Section 1(b)) application.** The USPTO's ITU page explains that a sworn statement of bona fide intent is sufficient at filing, that a Notice of Allowance opens a six-month window to file a Statement of Use, and that up to five six-month extensions are allowed, for a maximum of 36 months from the NOA ([uspto.gov/trademarks/apply/intent-use-itu-applications](https://www.uspto.gov/trademarks/apply/intent-use-itu-applications)). Fees under the schedule in force since 18 January 2025: base application $350 per class electronically; surcharges of $100 per class for incomplete applications, $200 per class for free-form goods descriptions, and $200 per additional 1,000 characters ([uspto.gov summary of 2025 fee changes](https://www.uspto.gov/trademarks/fees-payment-information/summary-2025-trademark-fee-changes)); Statement of Use or Amendment to Allege Use $150 per class and extension requests $125 per class ([uspto.gov/trademarks/trademark-fee-information](https://www.uspto.gov/trademarks/trademark-fee-information)). Three classes therefore cost $1,050 at filing and $450 at Statement of Use.
4. **App Store Connect name reservation.** Create the app record under the final name as soon as the trademark knock-out is clean. Apple's rule is that "You can use an app name for one app per localization" ([developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app)), and the App Name Dispute page confirms names are "based on language localization, not geographic territory" (legal digest, [apple.com/legal/.../app-name-dispute.html](https://www.apple.com/legal/intellectual-property/dispute-forms/app-store/app-name-dispute.html)). In practice that means adding a localized app name for every language the store supports, not every country. Names are capped at 30 characters (guideline 2.3.7). Secondary sources say a reserved name lapses after about 90 days without an uploaded build ([ptkd.com journal](https://ptkd.com/journal/check-app-store-name-availability)); Apple's own help pages do not state a period, so upload a build promptly and treat the 90-day figure as unverified.
5. **Domains.** Register `<name>.com` and `<name>.app` the same day the name is chosen (both were reported available for the three shortlisted names). The `.app` zone requires HTTPS, which suits a privacy-policy host.
6. **Metadata hygiene.** Keep "assemble", "endgame", "infinity", any show name, "timer" and "alarm" out of the name, subtitle, keywords and in-app purchase names (WINNER.md risk table; guideline 2.3.7).

### 1.5 What could not be verified

- No official trademark database was queried (USPTO, EUIPO, WIPO), so live applications filed in the last few weeks, design marks, and state registrations are invisible to this screen.
- App Store checks cover the US and GB storefronts only; Apple has more than 170 storefronts and names are per localization.
- Google Play has no public search API; the HTML probe returned no titles for most queries, so Play results rest on web search alone.
- Common-law (unregistered) uses, business-name registrations and social handles were not checked.
- Domain "available" flags came from one registrar's API at one moment; the Splashdown.com result in particular should be re-checked.

---

## 2. Original IP inventory and registration plan

### 2.1 What is protectable, and by whom

| Asset | Kind of protection | Owner | Notes and sources |
|---|---|---|---|
| Lyrics for launch tracks, Request Line songs, Re-entry tracks, End Credits template lines | Copyright (literary work, or musical work with words once paired with a human melody) | Developer as author | Suno's help centre: if you wrote the lyrics "you own those lyrics" and may register them separately (Suno digest, [help.suno.com/en/articles/2746945](https://help.suno.com/en/articles/2746945)). |
| Scripts: character cues, station IDs, Flight Review lines, Scrub's "weather" reports, onboarding copy | Copyright (literary work) | Developer | Human-authored text; registrable without any AI disclosure as long as no AI-generated text is included. |
| Section maps (JSON: phase timestamps, cue bars, role-cue markers, horn entry) | Copyright, to the extent of creative selection and arrangement; thin protection likely | Developer | The Copyright Office's AI guidance recognises claims in "Selection, coordination, and arrangement" of content ([copyright.gov/ai/ai_policy_guidance.pdf](https://www.copyright.gov/ai/ai_policy_guidance.pdf)). Whether a timing map is expressive enough is a question for the lawyer (section 11). |
| The launch melody (written by the developer before rendering) | Copyright (musical work) | Developer | WINNER.md specifies "one original melody, developer-written lyrics" rendered through Suno Covers. Fix the melody in notation or MIDI, dated, before generation so the human authorship is documented. |
| Characters (Augustine Pell, Gus Marchetti, Ines Farrago, Bunny Kowalczyk, Lionel Abara, Scrub) and their art, crew patches, the Department of Five More Minutes | Copyright in the pictorial works and in sufficiently delineated characters; trade-dress and trademark potential for Scrub | Developer, or the commissioned artist unless assigned | Character protection follows the DC Comics v. Towle test in the legal digest ([en.wikipedia.org/wiki/DC_Comics_v._Mark_Towle](https://en.wikipedia.org/wiki/DC_Comics_v._Mark_Towle)). Any contractor art needs a written assignment. |
| Source code | Copyright (computer program) | Developer | Circular 61 governs deposit: the first and last 25 pages of source, with trade-secret redaction options ([copyright.gov/circs/circ61.pdf](https://www.copyright.gov/circs/circ61.pdf)). |
| UI and screen displays (annotated score screen, Hangar mode, End Credits card) | Copyright as part of the program registration or as pictorial works | Developer | Circular 61 covers "Computer screen displays". Envato-derived scaffolding is licensed, not owned (section 4). |
| Human re-recorded station ID, fanfare and launch melody (year one) | Copyright in the sound recording and the musical work | Developer, via work-for-hire or assignment from the musician | Circular 34 allows one registration for a sound recording and the underlying musical, literary or dramatic work when both are unpublished and author and claimant are the same ([copyright.gov/circs/circ34.pdf](https://www.copyright.gov/circs/circ34.pdf)). |
| Suno-rendered audio | No copyright expected (see section 3.4); contractual commercial-use rights only | Developer holds Suno's assignment and commercial-use grant | Suno "makes no representation or warranty to you that any copyright will vest in any Output" (Suno digest, [suno.com/terms-of-service](https://suno.com/terms-of-service)). |
| The name and logo | Trademark (section 1) | Developer | The logo must be original art; nothing built from an Envato item can be claimed as a mark (section 4). |

### 2.2 Registration plan with the US Copyright Office

**Fees in force today** (copyright.gov fee page, fetched 24 September 2026, [copyright.gov/about/fees.html](https://www.copyright.gov/about/fees.html)): "Single author, same claimant, one work, not for hire $45"; "Standard Application $65"; "Registration of a claim in a group of unpublished works $85"; "Paper Filing (Forms PA, SR, TX, VA, SE) $125".

**Fees are about to rise.** The Office published a notice of proposed rulemaking on 20 March 2026 ([federalregister.gov 2026-05529](https://www.federalregister.gov/documents/2026/03/20/2026-05529/copyright-office-fees)) and sent a final proposed schedule to Congress in July 2026 for a 120-day review ([copyright.gov/rulemaking/feestudy2026](https://www.copyright.gov/rulemaking/feestudy2026/)). The proposed schedule, titled as fees "to go into effect in fall 2026", raises the Standard Application from $65 to $85, paper filing from $125 to $185, most group options to $130, and keeps the Single Application with a $10 increase after the NPRM had proposed eliminating it ([copyright.gov proposed-fee-schedule.pdf](https://www.copyright.gov/rulemaking/feestudy2026/proposed-fee-schedule.pdf)). File before the new schedule takes effect.

**Recommended filings, in order:**

1. **Lyrics and scripts, unpublished, as group registrations.** The Group Registration of Unpublished Works (GRUW) option takes up to ten unpublished works per application for $85, provided all works are by the same author, the author is the claimant for each, the claim is the same and all are in the same administrative class; it replaced the old "unpublished collection" option in 2019 ([copyright.gov/rulemaking/group-unpublished](https://www.copyright.gov/rulemaking/group-unpublished/)). A registration in a group "will remain in effect even if the works included in the group are subsequently published" (Circular 34). Plan: bundle the v1 lyric set (six launch flavours, three Request Line songs, one Re-entry track, End Credits template) as one GRUW of literary works, and the script book (all character cues and station IDs) as a second GRUW, at $85 each. If the count exceeds ten, file additional groups or register the script book as one integrated literary work on the Standard Application ($65); the lawyer should confirm which framing is stronger.
2. **The launch melody with lyrics** as a musical work (Standard Application, $65), with the MIDI or notation deposit. This is the asset that turns "words" into "song" for enforcement purposes.
3. **Character art** (one GRUW of up to ten unpublished works of the visual arts, $85): model sheets for the six characters, the crew patches and the Department seal.
4. **Source code and screen displays** (Standard Application, $65) at the 1.0 build, following Circular 61's deposit rules; use the trade-secret option if the section-map format is considered confidential.
5. **Human re-recordings** (sound recording plus musical work, one application, $65) once they exist.

**AI disclosure rule.** For any registration that includes Suno-generated material (for example a future soundtrack release), the Office's policy is explicit: "applicants have a duty to disclose the inclusion of AI-generated content in a work submitted for registration and to provide a brief explanation of the human author's contributions"; the Standard Application must be used; and "AI-generated content that is more than de minimis should be explicitly excluded from the application" in the "Limitation of the Claim" section under "Material Excluded" ([copyright.gov/ai/ai_policy_guidance.pdf](https://www.copyright.gov/ai/ai_policy_guidance.pdf), effective 16 March 2023). The lyric and script filings above contain no AI material and need no disclosure, which is a reason to keep them separate from any audio filing.

**Timing.** Register before launch. Under 17 U.S.C. §412, statutory damages and attorney's fees are unavailable where infringement of an unpublished work began before registration, or where infringement of a published work began after publication and before registration, subject to a three-month grace period after first publication ([uscode.house.gov, 17 U.S.C. 412](https://uscode.house.gov/view.xhtml?req=granuleid%3AUSC-prelim-title17-section412&num=0&edition=prelim)). Registering the unpublished groups before the App Store release preserves those remedies from day one. Total budget at current fees: roughly $365 for the five filings above.

---

## 3. Music rights procedure for Suno-produced audio

### 3.1 When commercial rights attach

The Suno digest (terms effective 3 September 2026, last revised 10 August 2026) gives the conditions:

- Only Pro and Premier subscribers receive the assignment: "Subject to your compliance with these Terms of Service... Suno hereby assigns to you all of its right, title and interest in and to any Output owned by Suno and generated from Submissions made by you... provided such Output will remain subject to these Terms of Service including any applicable commercial use restrictions" ([suno.com/terms-of-service](https://suno.com/terms-of-service)).
- Commercial use requires a permitted download: "You may commercially exploit Output solely to the extent it adheres to Suno's Conditions of Access and Use... provided you have obtained a permitted download of that Output" (same source).
- Free-tier output is "personal and non-commercial" only, and upgrading later does not cure it: subscribing "does NOT grant retroactive commercial rights for songs made on the free plan" ([help.suno.com/en/articles/2425729](https://help.suno.com/en/articles/2425729)). The help centre's test is "was I subscribed when I made the song?" and rights persist after the subscription ends ([help.suno.com/en/articles/2416769](https://help.suno.com/en/articles/2416769)).
- Download caps since 3 September 2026: Pro 20 per month, Premier 60 per month, unlimited from Suno Studio for Premier; one song is one download including all its stems; caps apply to the whole back catalogue; extra downloads about $2.99 each ([suno.com/blog/suno-updates-tos](https://suno.com/blog/suno-updates-tos), [help.suno.com/en/articles/13614785](https://help.suno.com/en/articles/13614785)).
- Models: v6 and v6-wild are paid-only; v6-mini is available to everyone ([suno.com/release-notes/introducing-v6](https://suno.com/release-notes/introducing-v6)). Generate the app's library only on v6 or v6-wild on a paid plan so the tier question never arises.

**Operating rule for Doorhorn:** every shipped track is generated on an active Premier (or Pro) subscription, on the v6 line, and obtained through a permitted download or a Studio export while subscribed. WINNER.md budgets about 110 downloads by launch, which is why Premier plus Studio is the practical tier.

### 3.2 Records to keep (the rights ledger)

Keep one row per track, off-platform, in a spreadsheet plus a folder tree, backed up in two places:

- **Subscription receipts**, dated, for every month in which anything was generated or downloaded, plus a PDF snapshot of the Terms of Service page on the first generation day of each month.
- **Prompt log**: style prompt, lyrics as submitted, model name, advanced settings, date and time, clip ID and URL, and the credit cost.
- **Download log**: date, tier, format (WAV, MP3, stems, Studio export), which download credit it consumed, and the SHA-256 hash of the file received.
- **Unmodified originals**: the files exactly as downloaded, never re-encoded, with Suno's fingerprint and metadata intact, stored separately from the bar-trimmed CAF derivatives that ship in the app.
- **Derivation notes**: which original produced which stems, layers and trims, so any shipped CAF file traces back to a permitted download.
- **Human authorship file**: the dated melody (MIDI or notation) and dated lyric drafts that predate each generation, to support the copyright filings in section 2.

This ledger is also the answer to App Review guideline 5.2.2: "ensure that you are specifically permitted to do so under the service's terms of use. Authorization must be provided upon request" (Suno digest, [developer.apple.com/app-store/review/guidelines](https://developer.apple.com/app-store/review/guidelines/)).

### 3.3 Prohibited practices

- **No artist names, show names or "in the style of" prompts.** Suno's terms allow a Voice Model of the user's own voice only; the Jason Isbell class action (31 August 2026) targets use of artists' names and identities (Suno digest, [hollywoodreporter.com](https://www.hollywoodreporter.com/music/music-industry-news/jason-isbell-files-class-action-lawsuit-against-suno-1236687285/)); and the legal digest's Midler and Waits cases make deliberate imitation of a known voice a right-of-publicity tort ([law.justia.com, Waits v. Frito-Lay](https://law.justia.com/cases/federal/appellate-courts/ca9/90-55981/90-55981.html)). Prompts stay at genre, mood, instrumentation, tempo and vocal register.
- **No uploading of copyrighted audio.** Covers and audio inputs use only the developer's own melody recordings; nothing owned by anyone else goes into a Suno session.
- **No watermark or fingerprint removal.** Users may not "remove, alter, obscure or circumvent any fingerprint, watermark or metadata Suno appends to an Output" (Suno digest, [suno.com/terms-of-service](https://suno.com/terms-of-service)). Bar-trimming and re-encoding for playback is engineering, not stripping; keep the unmodified originals to prove it.
- **No Remix.** Remixes are joint works usable "only... for lawful, personal and non-commercial purposes, regardless of your subscription tier" (same source).
- **No third-party API wrappers.** Suno has no public API; the July 2026 developer programme is invite-only ([musicbusinessworldwide.com](https://www.musicbusinessworldwide.com/suno-explores-developer-api-seeking-apps-that-unlock-experiences-generative-music-makes-possible-for-the-first-time/)). Unofficial "Suno APIs" operate outside the terms, produce output with no permitted-download record, and would break the ledger. All music is pre-generated and bundled, which also keeps runtime AI, and Apple's 5.1.2(i) third-party-AI disclosure, out of the app.
- **No in-app generation, remixing or sharing of music.** That would be a "competing music-generation product" under Suno's terms and would trigger Apple's 1.2 user-generated-content requirements (Suno digest).

### 3.4 Copyright status of the audio and what it means for the plan

The US Copyright Office's Part 2 report (29 January 2025) holds that AI outputs are protectable only where a human determined sufficient expressive elements, and that prompts alone are not enough ([copyright.gov Part 2 report](https://copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf)); the Supreme Court denied certiorari in Thaler v. Perlmutter on 2 March 2026, leaving the human-authorship requirement intact ([scotusblog.com](https://www.scotusblog.com/cases/thaler-v-perlmutter/)). Suno itself disclaims that copyright will vest.

Consequences for Doorhorn:

- The rendered audio should be assumed uncopyrightable. A competitor could legally copy the raw Suno tracks; they could not copy the lyrics, the melody, the scripts, the section maps, the characters or the brand.
- **Audio is a replaceable layer, by design.** Section maps are keyed to bars and BPM, not to specific files; every asset carries a content hash in a manifest; a flavour can be regenerated or re-recorded and shipped in an update without touching maps, lyrics or code. The human-authored melody and lyrics are what make a re-render "the same song".
- Do not describe the audio as human-composed anywhere, and do not register it as such (section 2.2).

### 3.5 In-app disclosure text

About screen, verbatim from WINNER.md: **"Every line written by a person. Songs produced with Suno from those lyrics."**

Optional second line for the About screen and the App Review notes: "Music was generated under a Suno Premier commercial licence from lyrics and a melody written by the developer; every track was downloaded while subscribed and records are available on request." Attribution is optional on paid plans (Suno digest, [help.suno.com/en/articles/2410177](https://help.suno.com/en/articles/2410177)), so this is a courtesy and a credibility signal, not a requirement.

### 3.6 Human re-recording plan

Within the first year, re-record the station ID, the liftoff fanfare and the launch melody with a human musician so the brand owns at least one defensible audio asset. Requirements:

- A written agreement (work made for hire where valid, plus an assignment as belt-and-braces) covering the sound recording and any arrangement, drafted or reviewed by the lawyer.
- Session files, stems and dated masters archived like the Suno originals.
- Register the sound recording and musical work together (section 2.2).
- Consider whether the station ID can serve as a sound mark later (lawyer question).

### 3.7 Contingency if a model is withdrawn or the terms change

The Suno digest lists live risks: Sony and UMG filed a second suit on 18–19 September 2026 seeking injunction-scale remedies against v6 ([engadget.com](https://www.engadget.com/2262978/sony-music-and-udio-say-sunos-new-models-still-violates-their-copyright.html)); the Munich court ruled for GEMA on 31 July 2026 ([twobirds.com](https://www.twobirds.com/en/insights/2026/germany/munich-district-court-rules-on-ai-generated-music-gema-v-suno)); Suno retired all prior models at the v6 launch and tightened terms once already in 2026.

Plan:

1. **Freeze a golden-master library at launch.** Everything shipped is already downloaded under a permitted download, and Suno's help centre says rights persist after the subscription ends. Nothing in the app depends on Suno being reachable.
2. **Keep the ledger current** so that if terms change, the version in force at each download is documented.
3. **Keep a regeneration path on another licensed provider or with human musicians.** Because maps, lyrics and melody are model-agnostic, a flavour can be re-rendered elsewhere. Budget one contingency line for it. Any alternative provider's app-embedding terms must be verified before use (the digest notes Epidemic Sound as a candidate but its terms were not checked).
4. **Monitor** UMG Recordings v. Suno (1:24-cv-11611 and the 2026 case 26-cv-14275, D. Mass.), GEMA v. Suno, the Justice class action and the Isbell action; if an injunction or a terms change makes shipped output questionable, the human re-recordings (section 3.6) and the regeneration path are the fallback.
5. **Never expand the app's dependence** on a single vendor: no runtime generation, no vendor SDK in the binary.

---

## 4. Envato Elements rules as they apply here

All facts from the Envato digest (licence last revised 8 December 2025; the digest notes Envato's help pages blocked automated fetching, so clause numbers should be re-read on the live page before relying on them: [Envato Elements License](https://help.elements.envato.com/hc/en-us/articles/360000628966-Envato-Elements-License), [License FAQ](https://help.elements.envato.com/hc/en-us/articles/360000629346-Envato-Elements-License-FAQ)).

- **One licence per End Product; the app is one End Product.** A licence is created at download; a single licence covers "one software product" when the item is fully integrated and users cannot access the underlying item; a second app needs a second licence. Registration per project is now optional, but licences can be named: set the account preference to "Always ask" so every download is labelled "Doorhorn v1" ([elements.envato.com/learn/how-envato-licensing-works](https://elements.envato.com/learn/how-envato-licensing-works), [Create a new license](https://help.elements.envato.com/hc/en-us/articles/360000621763-Create-a-new-license)).
- **Keep the certificates.** Download the licence certificate PDF for every item, plus a screenshot of the item page, into the rights ledger; authors can withdraw items later.
- **Complete the End Product while subscribed.** Clause 8: "the license is only valid if you complete the End Product while your subscription is active... If you cancel your subscription and have not completed your End Product, the license for the Item is terminated". Keep the subscription active until 1.0 ships.
- **When the subscription lapses:** the finished app may keep shipping with minor updates, but items cannot be used in new or materially different products, and installed fonts must be uninstalled (clause 12(a)). Where a large feature update falls is undefined; a sequel or the second app in the same world needs fresh licences.
- **Fonts do not ship in the binary.** Clause 13(d)(ii) bars incorporating or distributing a font within an End Product; the web-enabled-font exception excludes products that let users create new text with it. Envato display fonts are for the icon, wordmark, screenshots and static title art exported as outlines or PNG; runtime text uses SIL OFL faces. The digest recommends written confirmation from terms@help.envato.com before any font file ships.
- **No trademark from Items.** Clause 12(f): "You can't claim trademark or service mark rights over an Item within the End Product", and the FAQ says a logo built from an item cannot be trademarked. The Doorhorn wordmark, icon, Scrub and the crew patches must be original art.
- **No build-it-yourself features from Items.** Clause 12(c) bans on-demand customisation applications. Household names, colours and walk-up cue choices are user data applied to original art, not Envato items, and the app must not let users export or remix any Envato-derived element.
- **Not extractable.** Clause 12(e): ship graphics through asset catalogs and audio as compressed resources; never include PSD, AI, EPS or Sketch sources in the bundle.
- **Check bundled third-party components** (clauses 16–18): several shortlisted kits include Google Material Icons or "free fonts" under their own licences.
- **Music versus sound effects.** Sound effects may be used commercially, even for broadcast; Envato music may not be used as standalone tracks. All music comes from Suno, so Envato music is simply not used.
- **Apple 5.2.1** still requires the developer to own or have licensed everything in the app; the certificates are the proof.

| Asset category | Reference only | Usable in app | Usable in marketing | Notes |
|---|---|---|---|---|
| Layout references, UI kits, design systems | Yes | Yes, re-skinned and compiled into asset catalogs | Yes | One licence per app; check bundled icon/font licences |
| Halftone textures, poster templates | Yes | Yes, as backgrounds or textures | Yes | Not as the app's identity "as-is" |
| Display fonts | Yes | **No font files in the bundle**; only pre-rendered text as outlines/PNG | Yes (icon, wordmark, screenshots, store art) | Runtime text in OFL faces; uninstall fonts when subscription ends |
| Character-creation kits, stock characters, mascots | Yes, for proportion and pose study | **No**: characters, patches and icons are original art (WINNER.md) | No | Avoids clause 12(f) and lookalike risk |
| Stickers, emoji, speech bubbles | Yes | Yes, fixed and developer-authored, never user-remixable | Yes | No Apple emoji anywhere (guideline 5.2.5, legal digest) |
| Sound effects (UI blips, cartoon stings) | Yes | Yes | Yes | Least constrained category; keep a licence per pack |
| Music tracks | No | **No** | No | Standalone playback prohibited; all music is Suno |
| App-icon templates | Yes | Yes, as tooling | Yes | The icon artwork itself must be original |

---

## 5. Art and tone safety

### 5.1 Checklist for the original cast

- [ ] **Silhouette comparison.** For each of the six characters, place the final silhouette beside the best-known cartoon characters of the same archetype (calm female leader, kindly janitor, wrong weather forecaster, late-night announcer, yes-man, small round robot) and confirm no one would read them as the same character. The Krofft v. McDonald's case in the legal digest found infringement from "total concept and feel" without identical drawings ([en.wikipedia.org/wiki/Sid_%26_Marty_Krofft...](https://en.wikipedia.org/wiki/Sid_%26_Marty_Krofft_Television_Productions_Inc._v._McDonald%27s_Corp.)); Kill the Plumber was blocked by Apple until its art stopped resembling Nintendo's ([en.wikipedia.org/wiki/Kill_the_Plumber](https://en.wikipedia.org/wiki/Kill_the_Plumber)). Change the archetype mix, not just the drawing, if any pairing is close.
- [ ] **No real agency insignia, call signs or hardware.** No NASA, ESA or military insignia, no Apollo-era likenesses, no real call signs ("Houston", real mission names), no recognisable real vehicles. AM General v. Activision is the rare case where a real trademark inside a game world survived, and it turned on artistic relevance and no explicit misleading ([finnegan.com](https://www.finnegan.com/en/insights/blogs/incontestable/in-legal-warfare-over-humvee-trademarks-the-first-amendment-goes-beyond-the-call-of-duty-in-dismissing-am-generals-claims.html)); do not rely on it.
- [ ] **Role title "CAPCOM".** It is a genuine NASA job title, but it is also the name of a major video game publisher. This pass did not run a trademark check on it. Keep it out of the app name, subtitle, keywords and marketing, and ask the lawyer whether to rename the role (for example "Capsule Comms").
- [ ] **No real weather personalities.** Dr. Farrago must stay a streak-keeper proud of being wrong, not an impression of any real or fictional TV meteorologist; the legal digest's soundalike cases (Midler, Waits) also apply to voice direction for her genre lane.
- [ ] **Names checked against public figures.** Searches run 24 September 2026: "Augustine Pell" returns only Cardinal George Pell (surname collision, no person of that full name found); "Gus Marchetti" returns private individuals, including an obituary; "Ines Farrago" returns nothing (note "Farrago" is also the name of a Rogue Amoeba soundboard app); "Bunny Kowalczyk" returns a real, recently deceased private person (Bertha "Bunny" Kowalczyk, whose 80-year marriage received national TV coverage in 2024, [schrader.com obituary](https://www.schrader.com/obituary/bertha-b-bunny-kowalczyk-nee-burnham)), which argues for changing the surname or first name; "Lionel Abara" returns nothing. Re-run every name (and "Scrub", "Department of Five More Minutes", "Cul-de-Sac Mission Control") before shipping and log the date.
- [ ] **Satire targets only invented institutions.** The Department of Five More Minutes and the Board of Snooze Appeals are fictional; never name a real agency, company, product or person in a joke.
- [ ] **Register held at 4+/9+.** No profanity, alcohol, crude humour or fear themes in the default script (section 6).
- [ ] **Originality dossier.** Keep dated character sheets, source files, name-check logs, Suno generation logs and Envato certificates in one folder ready to attach in App Review Information if a reviewer or a claimant raises resemblance.

### 5.2 Why parody and lookalikes are not a safe harbour

The legal digest sets out the doctrine and the App Store practice:

- **Jack Daniel's Properties v. VIP Products (US Supreme Court, 2023, 9–0):** "When an alleged infringer uses a trademark as a designation of source for the infringer's own goods, the Rogers test does not apply." A parody used as your own brand or title gets no First Amendment shield and goes straight to likelihood of confusion ([en.wikipedia.org](https://en.wikipedia.org/wiki/Jack_Daniel%27s_Properties,_Inc._v._VIP_Products_LLC)).
- **Andy Warhol Foundation v. Goldsmith (US Supreme Court, 2023):** a commercial use sharing substantially the same purpose as the original fails the first fair-use factor even with new expression ([copyright.gov summary](https://www.copyright.gov/fair-use/summaries/Andy-Warhol-Found-for-the-Visual-Arts-Inc-v-Goldsmith-143-S-Ct-1258-2023.pdf)).
- **Dr. Seuss Enterprises v. ComicMix (9th Cir. 2020):** a mashup that "merely mimick[ed] Seuss' style without critiquing or commenting on that style" was not parody and not fair use ([loeb.com](https://www.loeb.com/en/insights/publications/2020/12/dr-seuss-enterprises-lp-v-comicmix-llc)).
- **Walt Disney Productions v. Air Pirates (9th Cir. 1978):** near-identical character drawings lost even in satire ([copyright.gov summary](https://www.copyright.gov/fair-use/summaries/waltdsney-airpirates-9thcir1978.pdf)).
- **App Review does not weigh fair use at all.** Its remedy text is to "attach documentary evidence in the App Review Information section" or remove the content ([developer.apple.com/forums/thread/699048](https://developer.apple.com/forums/thread/699048)); Apple's only satire carve-out (1.1.1) concerns offensive content, not IP. Post-launch, any rights holder can file the Content Dispute form and Apple removes on an "unresolved" flag without adjudicating, as happened to TV Time in 2024 ([techcrunch.com](https://techcrunch.com/2024/11/20/tv-time-points-to-apples-significant-power-over-developers-after-being-removed-from-app-store)).

What is safe is style itself: the Copyright Office's May 2025 report states style is something "copyright does not protect", with the caveat that style replication can still "capture protectible elements" ([copyright.gov Part 3 pre-publication](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-3-Generative-AI-Training-Report-Pre-Publication-Version.pdf)). Flat saturated colour, mission-control comedy and ensemble warmth are ideas; the cast, names, world and words are the protectable expression Doorhorn owns.

---

## 6. App Store compliance checklist

All guideline text quoted below is as it appears in the digests; other items are paraphrased from the current guidelines page ([developer.apple.com/app-store/review/guidelines](https://developer.apple.com/app-store/review/guidelines/)).

| Guideline | Requirement | Doorhorn action | Source |
|---|---|---|---|
| **5.2.1 Intellectual property** | "Don't use protected third-party material such as trademarks, copyrighted works, or patented ideas in your app without permission, and don't include misleading, false, or copycat representations, names, or metadata in your app bundle or developer name. Apps should be submitted by the person or legal entity that owns or has licensed the intellectual property and other relevant rights." | Zero third-party IP; rights ledger (Suno, Envato, contractor assignments) ready to attach; seller name matches the app's brand or an authorisation letter is on file (legal digest notes 5.2.1 rejections for seller/brand mismatch). | Legal digest; [guidelines](https://developer.apple.com/app-store/review/guidelines/) |
| **5.2.2 Third-party services** | "ensure that you are specifically permitted to do so under the service's terms of use. Authorization must be provided upon request." | Suno ledger and Envato certificates; App Review note stating music was generated under a Suno paid commercial licence from original lyrics. | Suno digest |
| **4.3(b) Saturated categories** | "Certain kinds of apps, such as dating, flashlight, sound effects, wallpaper, simple timers, and fortune telling, are well established on the App Store and we will not accept new submissions unless they offer a meaningfully different or improved experience". | Screen one and screenshot one are the annotated score; metadata never says "timer" or "alarm"; Notes for Review name the section map, in-song manifest, Stem Roll Call and End Credits as the difference; category Lifestyle or Productivity with Entertainment secondary (WINNER.md). | Legal digest; [macrumors.com, 9 June 2026](https://www.macrumors.com/2026/06/09/app-store-guidelines-low-quality-apps/); [developer.apple.com/news/?id=a233fmpw](https://developer.apple.com/news/?id=a233fmpw) |
| **2.3.7 Names and keywords** | "Choose a unique app name, assign keywords that accurately describe your app, and don't try to pack any of your metadata with trademarked terms, popular app names ... App names must be limited to 30 characters ... Apple may modify inappropriate keywords at any time." | Cleared name; no competitor names, franchise words or "for kids" in keywords; subtitle "No clock. The job ends when the song ends." | Legal digest |
| **4.1(c) Copycats** | "You cannot use another developer's icon, brand, or product name in your app's icon or name, without approval from the developer." | Original icon and name; the name check in section 1 exists partly to satisfy this. | Legal digest; [developer.apple.com/news/?id=ey6d8onl](https://developer.apple.com/news/?id=ey6d8onl) |
| **5.1.1 Data collection and storage** | Privacy policy link required in App Store Connect and inside the app; it must identify what is collected (if anything), third-party sharing, retention and deletion; consent required for any collection; data minimisation. | Publish the section 7 policy at a stable URL; link it from Settings; request no permissions beyond notifications and alarms. | [guidelines 5.1.1](https://developer.apple.com/app-store/review/guidelines/) |
| **Privacy label** | Apple's "Data Not Collected" label reads "The developer does not collect any data from this app." Apple defines "collect" as transmitting data off the device in a way that lets the developer or partners access it beyond real-time servicing of a request. | Declare Data Not Collected; keep it true: no analytics, no crash reporter that sends personal data, no third-party SDKs that phone home. | [apple.com/privacy/labels](https://www.apple.com/privacy/labels/); [developer.apple.com/app-store/app-privacy-details](https://developer.apple.com/app-store/app-privacy-details/) |
| **5.1.2(i) Third-party AI** | "You must clearly disclose where personal data will be shared with third parties, including with third-party AI, and obtain explicit permission before doing so." | Not triggered: no runtime AI, no data leaves the device. State this in the review notes. | Suno digest; [developer.apple.com/news/?id=ey6d8onl](https://developer.apple.com/news/?id=ey6d8onl) |
| **2.5.4 Background modes** | Background services only for their intended purposes, audio playback among them. | Declare the audio background mode; play audio in the background only while a track is actually playing (WINNER.md mitigation); no silent sessions to keep the app alive. | [guidelines 2.5.4](https://developer.apple.com/app-store/review/guidelines/); [UIBackgroundModes reference](https://developer.apple.com/documentation/bundleresources/information-property-list/uibackgroundmodes) |
| **1.2 User-generated content** | Filtering, reporting, blocking and contact requirements apply to apps with UGC or social features. | Not triggered by a developer-bundled library; do not add music sharing or public feeds. | Suno digest |
| **Age rating (questionnaire mandatory since 31 January 2026)** | Apple's tiers are 4+, 9+, 13+, 16+, 18+. Moving from 4+ to 9+ includes infrequent profanity or crude humour, infrequent cartoon or fantasy violence, infrequent horror or fear themes; moving to 13+ includes frequent crude humour, infrequent alcohol, tobacco or drug references, and infrequent realistic violence. | Answer honestly for 4+ (or 9+ if Scrub's klaxon or the Department's bureaucracy reads as "infrequent crude humour"); keep alcohol, profanity and fear themes out of the default script so the app stays visible on family devices under iOS 27 Child Accounts (WINNER.md). | [developer.apple.com/help/app-store-connect/reference/age-ratings](https://developer.apple.com/help/app-store-connect/reference/age-ratings/); [developer.apple.com/news/?id=ks775ehf](https://developer.apple.com/news/?id=ks775ehf) |
| **1.3 Kids Category and 5.1.4 Kids** | Kids Category apps must put links out and purchases behind a parental gate, may not send identifiable data to third parties, and must keep meeting those rules in later updates even if the category is deselected; 5.1.4 reserves "For Kids" and "For Children" (guideline 2.3.8) to the Kids Category and bars other apps from implying children are the main audience. | **Do not opt into the Kids Category.** The parent's phone is the primary device, marketing leads with roommates, couples and commuters, and no metadata term implies a child audience. This avoids a one-way ratchet of Kids rules on a one-time-purchase app whose paywall would need a gate. | [guidelines 1.3, 5.1.4](https://developer.apple.com/app-store/review/guidelines/); [developer.apple.com/news/?id=091202019a](https://developer.apple.com/news/?id=091202019a) |
| **Small Business Program** | 15% commission for developers with up to $1M in prior-year proceeds; enrol as Account Holder after accepting the Paid Apps agreement; rate applies from 15 days after the end of the fiscal month in which enrolment is approved. | Enrol before launch so the $9.99 unlock is at 15% from the first sale. | [developer.apple.com/app-store/small-business-program](https://developer.apple.com/app-store/small-business-program/) |
| **EU Digital Services Act trader status** | Apple requires a declared trader status; verified trader address, phone and email are shown on EU product pages; apps without verified status were removed from the EU store from 17 February 2025. | Declare trader status and decide whether to use a business address; a solo developer's home address would otherwise appear on the EU listing. | [developer.apple.com/news/?id=x60uzbu9](https://developer.apple.com/news/?id=x60uzbu9); [App Store Connect help](https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements/) |
| **Content Dispute readiness** | Apple forwards any rights holder's claim to the developer and removes the app if the claimant reports it unresolved. | Keep the originality dossier current and respond to any notice within days, not weeks. | Legal digest; [apple.com/legal/.../app-store](https://www.apple.com/legal/intellectual-property/dispute-forms/app-store/) |

---

## 7. Privacy

### 7.1 Ready-to-publish privacy policy (local-only app)

Modelled on the Constellate policy at `index.html` in this repository, keeping its stance (nothing leaves the device, so there is nothing for the developer to hold) and its structure. Replace the bracketed items before publishing; publish at a stable HTTPS URL (the `.app` domain suits this) and link it from App Store Connect and from Settings inside the app.

> # Privacy Policy for Doorhorn
>
> Last updated: [date]
>
> **The short version.** Doorhorn does not collect your data. Everything you put into it — the names and roles of the people in your household, your manifests, your mission log, your settings — is stored only on your device. None of it is transmitted to us, because there is no "us" server receiving it.
>
> ## What is stored, and where
>
> Doorhorn stores the following locally on your device, using your device's standard app storage:
>
> - Your launch time and bedtime, and the days they apply
> - The names, crew roles, colours and walk-up cues you give to household members ("crew patches")
> - Your manifests: the items you add, the "last seen" notes you write, and the one Hold item and how long it has been on the list
> - Your mission log: which launches happened, which were scrubbed, your on-time rating, and the End Credits cards the app assembled from your manifest
> - Which songs the app played and when, so it can rotate them
> - Your settings: chosen flavours and durations, first-sound choice, quiet mode, volume ramp, AirPlay preference, widget and Live Activity options
> - Whether you have bought the one-time unlock (the purchase itself is processed by Apple under Apple's own privacy policy; Doorhorn only stores the fact that it succeeded)
>
> This information never leaves your device. It is not uploaded, synced, backed up to our servers, shared with third parties, or used for advertising. We cannot see it, and we cannot recover it for you. If you use your device's own backup features, your device may include this data in your personal backup; that is controlled by you and your device settings, not by us.
>
> If you delete Doorhorn, this data is deleted with it. You can also erase everything at any time from **Settings → Reset all data**.
>
> ## Alarms, notifications and Live Activities
>
> If you schedule a launch, Doorhorn asks your operating system for permission to set alarms and send notifications. The morning alarm, the bedtime cue, the countdown on your Lock Screen and any reminders are scheduled locally on your device by the operating system. They do not require an account and do not involve a server. Shortcuts, NFC tags and the Action Button can start a Request Line song; Doorhorn reads nothing from a tag except the instruction to play.
>
> ## Playback on speakers
>
> If you choose to play on a HomePod or another AirPlay speaker, audio is sent from your device to that speaker over your own network by your operating system. Doorhorn does not send anything to us.
>
> ## Analytics and tracking
>
> Doorhorn contains no analytics, no advertising SDKs, no third-party trackers, and no crash-reporting service that transmits personal information. We do not use cookies or device advertising identifiers, and we do not track you across other apps or websites.
>
> ## Children's privacy
>
> Doorhorn is made for the adult who runs a household and is not directed at children under 13. It does not knowingly collect information from anyone. Names that a parent enters for family members stay on that parent's device. Because the app collects no data at all, no personal information from any user — of any age — is transmitted or retained by us.
>
> ## Your rights
>
> Because your data never leaves your device, there is nothing for us to disclose, export, correct, or delete on your behalf. You have direct and complete control: **Settings → Reset all data** erases everything Doorhorn has stored.
>
> ## Changes to this policy
>
> If a future version of Doorhorn adds a feature that transmits data — for example optional household sharing through iCloud — this policy will be updated before that version ships, and the App Store privacy labels will be updated to match.
>
> ## Contact
>
> Questions about this policy: [contact email]
>
> Doorhorn — no clock; the job ends when the song ends.

Rename "Doorhorn" throughout when the final name is chosen. The Constellate policy uses a dedicated support mailbox; reuse it or create one for this app, and keep the same address in App Store Connect and on the EU trader listing.

### 7.2 Children in the household

- **COPPA scope.** The FTC's compliance guide says COPPA applies to operators of sites or services directed to children under 13 that collect personal information, and to general-audience services with actual knowledge that they collect personal information from a child under 13; "personal information" includes names, online contact details and persistent identifiers ([ftc.gov six-step compliance plan](https://www.ftc.gov/business-guidance/resources/childrens-online-privacy-protection-rule-six-step-compliance-plan-your-business)). The amended rule was published 22 April 2025, took effect 23 June 2025, and operators had until 22 April 2026 to comply ([federalregister.gov 2025-05904](https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule)). Doorhorn transmits nothing, keeps no persistent identifier of its own and has no account, so it collects no personal information from anyone; COPPA's notice and consent machinery is not engaged. That is a design property to protect, not a permanent exemption: any future sync, analytics or crash reporter re-opens the question.
- **"Directed to children" factors.** The FTC looks at subject matter, visual and audio content, "the use of animated characters or other child-oriented activities and incentives", and child celebrities (same FTC source). Doorhorn has animated characters and a child-appealing robot. The counterweights are the adult-owned device, the adult-facing marketing (roommates, couples, commuters), adult tasks (manifest, dentist call, keys), and the absence of any collection. The lawyer should confirm this reading; it is the reason the marketing brief must not drift toward "for kids".
- **Apple's rules.** Not being in the Kids Category means 2.3.8's "For Kids" and "For Children" terms are off limits in metadata, and 5.1.4 says apps not in the Kids Category cannot imply that children are the main audience (section 6). Apple's parental-gate requirement applies to Kids Category apps and is "generally not the same as securing parental consent" under privacy statutes (guideline 5.1.4).
- **Data the parent enters about children** (first names, roles, colours) stays on the parent's device and is the parent's own record; the policy above says so plainly.

---

## 8. Accessibility and consumer-protection notes

Not legally mandatory for a US one-time-purchase app of this kind, but good practice and cheap to do early.

**Accessibility.**

- Follow Apple's Human Interface Guidelines for accessibility ([developer.apple.com/design/human-interface-guidelines/accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)): VoiceOver labels on the annotated score, the phase bands, crew patches and Scrub; Dynamic Type for manifest text; Reduce Motion alternatives for the cutout animations and the sky gradient; sufficient contrast in tinted and clear icon modes.
- The product is audio-first, so give every sung cue a visual twin: the phase name and countdown already on the Live Activity and StandBy, plus optional on-screen captions of the manifest bridge and a haptic on the horn entry for deaf and hard-of-hearing households. Quiet mode (spoken cues and stings) already helps sound-sensitive users.
- **European Accessibility Act.** The Act has applied since 28 June 2025 to a listed set of products and services, including e-commerce, banking, e-books, telephony and transport services ([European Commission EAA page](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en)). Secondary sources describe a microenterprise exemption from the service requirements (fewer than 10 employees and no more than €2 million turnover) ([webyes.com summary](https://www.webyes.com/blogs/eaa-exemptions/)). A household routine app is not in the listed categories, but the question is on the lawyer list because the app is sold to EU consumers.

**Consumer protection.**

- **Refunds are Apple's.** Customers request refunds at reportaproblem.apple.com and Apple decides within about 24 to 48 hours ([support.apple.com/en-us/118223](https://support.apple.com/en-us/118223)). The app should link to that page from Settings rather than promise anything itself.
- **No dark patterns.** The FTC's September 2022 report describes design practices that "can trick or manipulate consumers into buying products or services or giving up their privacy", with examples including countdown timers used when "the offer is not actually time-limited", hidden fees and hard-to-find cancellation paths ([ftc.gov press release](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers); report at [ftc.gov/reports/bringing-dark-patterns-light](https://www.ftc.gov/reports/bringing-dark-patterns-light)). For an app whose whole identity is a countdown, the rule is simple: never put a countdown, "limited time" or scarcity language on the paywall; state the one price, exactly what it unlocks, and that there is no subscription (WINNER.md: "The paywall says exactly that").
- **Free tier stays complete.** The free launch, Re-entry, manifest, Scrub and three Request Line songs are usable without the unlock, so nothing is held hostage after download.
- **Price and trader transparency.** Apple displays the price and, in the EU, the verified trader details (section 6); keep the in-app price string identical to the App Store Connect price tier.

---

## 9. Launch-day legal checklist

**Name and marks**
- [ ] Final name cleared by counsel: USPTO, EUIPO and WIPO knock-outs run by hand and filed in the dossier
- [ ] Intent-to-use application filed in Classes 9, 41 and 42; serial numbers recorded
- [ ] App Store Connect record created under the final name in every supported localization; a build uploaded
- [ ] `<name>.com` and `<name>.app` registered; privacy policy live on HTTPS
- [ ] Name, subtitle, keywords and IAP names contain no trademarked terms, competitor names, "timer", "alarm", "for kids" or franchise words

**Copyright**
- [ ] Lyrics group registration filed (GRUW, up to 10 works, $85)
- [ ] Script book registration filed (GRUW or Standard Application)
- [ ] Launch melody with lyrics registered as a musical work
- [ ] Character art group registration filed
- [ ] Source code and screen displays registered at the 1.0 build
- [ ] All filings made before public release (17 U.S.C. §412)

**Music**
- [ ] Every shipped track traces to a permitted download or Studio export on an active paid Suno plan, v6 line, in the ledger
- [ ] Unmodified originals archived off-platform with hashes; CAF derivatives mapped to originals
- [ ] Monthly subscription receipts and terms-of-service snapshots archived
- [ ] No prompt in the log contains an artist, show or brand name or "in the style of"
- [ ] No Remix output, no third-party API output, no free-tier or v6-mini output in the bundle
- [ ] About screen carries: "Every line written by a person. Songs produced with Suno from those lyrics."
- [ ] Musician agreement for the year-one re-recordings drafted (work-for-hire plus assignment)

**Envato**
- [ ] One named licence per item for this app; certificate PDFs and item-page screenshots archived
- [ ] Subscription active through the 1.0 submission
- [ ] No Envato font file in the bundle; runtime fonts are OFL; icon, wordmark, characters and patches are original art
- [ ] No PSD/AI/EPS/Sketch sources in the bundle; third-party components inside kits checked

**Characters and tone**
- [ ] Silhouette comparison completed and documented for all six characters
- [ ] Character names re-searched against public figures on the release date; Bunny Kowalczyk resolved
- [ ] "CAPCOM" role title resolved with counsel
- [ ] No real agency insignia, call signs, vehicles, brands or people anywhere in the app or marketing
- [ ] Default script contains no profanity, alcohol, crude humour or fear themes; age-rating questionnaire answered honestly

**App Store Connect**
- [ ] Privacy label: Data Not Collected; policy URL entered and linked in Settings
- [ ] Notes for Review name the section map, in-song manifest, Stem Roll Call and End Credits, state that music was generated under a Suno paid commercial licence from original lyrics, and that no data leaves the device
- [ ] Category Lifestyle or Productivity, secondary Entertainment; Kids Category not selected
- [ ] Background audio mode declared and used only during real playback
- [ ] Small Business Program enrolment approved
- [ ] EU trader status declared; address choice made deliberately
- [ ] Originality dossier (character sheets, dated sources, Suno ledger, Envato certificates, name-check logs) in one folder ready to attach

**Consumer**
- [ ] Paywall states one price, one purchase, no subscription; no countdown or scarcity language
- [ ] Settings links to Apple's refund page and to the privacy policy
- [ ] Free tier verified complete without the unlock

---

## 10. Open questions for a lawyer

1. **Name.** Of Doorhorn, Liftoff Choir and Hornline, which survives a full clearance in the US, EU and UK? Does the registered LIFTOFF portfolio in Classes 41 and 42 make "Liftoff Choir" too close? Is "Hornline" too descriptive to register without a design element?
2. **Classes and wording.** Confirm Class 9, 41 and 42 identifications from the ID Manual, and whether Class 41 should be included at filing or added later when the soundtrack or streaming release exists.
3. **Section maps.** Are the JSON section maps (phase timestamps, cue bars, role markers) protectable as compilations or literary works, and is it worth registering them, or is their value better protected as trade secrets?
4. **Lyrics and scripts framing.** Is a GRUW of up to ten works or a single integrated "book and lyrics" registration on the Standard Application the stronger position for enforcement, and does the proposed fall-2026 fee change alter the choice?
5. **Suno ownership language.** The terms "assign" all right, title and interest to paid subscribers while disclaiming that copyright vests; help pages say paid users "own" songs. What, precisely, does Doorhorn hold in each track, and is the ledger described in section 3.2 sufficient evidence for App Review and for any dispute?
6. **Stems and Studio exports.** Suno's FAQ says Studio downloads are unlimited for Premier, while the terms tie commercial rights to a "permitted download". Do Studio exports and Advanced Split stems clearly qualify?
7. **Contingency.** If an injunction or a terms change affects v6 output after launch, what is the exposure for tracks already downloaded under the current terms, and should the human re-recordings be brought forward?
8. **Musician agreement.** Draft the work-for-hire plus assignment for the year-one re-recordings; advise whether the station ID could later be registered as a sound mark.
9. **Contractor art.** If any character or icon art is commissioned, draft the assignment; confirm the developer will be the copyright claimant for the character-art group registration.
10. **CAPCOM.** Is using the NASA job title "CAPCOM" for a character inside the app acceptable given the video game publisher of the same name, and should the role be renamed?
11. **Envato fonts.** Confirm the reading that no Envato font file may ship in the binary, and whether written confirmation from Envato is worth obtaining.
12. **Children.** Confirm that an adult-owned, no-collection app with animated characters is not "directed to children" under COPPA, and whether the marketing brief needs guardrails to keep it that way.
13. **EU and UK.** Does the European Accessibility Act or any consumer law in the launch territories impose obligations on a one-time-purchase app sold through Apple, and does the developer's microenterprise status matter?
14. **Trader listing.** Advise on using a registered agent or business address for the EU DSA trader listing rather than a home address.
15. **Entity and account.** Should the app be published from an LLC (or equivalent) rather than an individual account, given Apple's 5.2.1 practice of matching seller name to brand and the litigation climate around Suno?
16. **Statutory damages timing.** Confirm the registration sequence in section 2.2 preserves statutory damages and fees under 17 U.S.C. §412 for the lyrics, scripts, art and code from the release date.
