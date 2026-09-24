# Doorhorn (working title): legal, intellectual-property and rights checklist

Prepared 24 September 2026 for the Doorhorn product package. The product's source of truth is `concepts/tournament/WINNER.md`; the Suno, Envato and legal-IP digests cited below come from the same tournament.

**Summary.** Doorhorn stands on a clean rights footing because everything that carries its value (lyrics, scripts, section maps, characters, code, the name) is human-authored and registrable, while the Suno audio is a licensed, replaceable layer. The work before launch is to pick and file a name nobody else owns, register the human-authored layers, keep an auditable ledger for every Suno and Envato asset, and ship metadata and a privacy label that give App Review nothing to object to.

**This document is preparation for a lawyer, not legal advice.** It collects facts, sources and open questions so a licensed attorney can advise efficiently. Several items are marked as unverified.

---

## 1. Name clearance

### 1.1 What was checked (24 September 2026)

For Doorhorn, Liftoff Choir, Hornline, Gantry, Splashdown, Go Horns and T-Minus Kitchen:

- **App Store:** the public iTunes Search API (`itunes.apple.com/search`, `entity=software`), US and GB storefronts, top 25 results, plus web search restricted to `apps.apple.com`.
- **Google Play:** web search restricted to `play.google.com`.
- **Web, games, podcasts:** general web search plus Steam, SteamDB and itch.io searches.
- **Trademark registers:** the USPTO Trademark Center front end is JavaScript-only and its JSON endpoint refused the request (HTTP 405); EUIPO eSearch plus is JavaScript-only; the WIPO Global Brand Database sits behind a CAPTCHA; Justia and uspto.report pages returned HTTP 403. Trademark signals below are search-engine snippets of Justia, Trademarkia, TrademarkElite and uspto.report records: a knock-out screen, not a clearance search.
- **Domains:** GoDaddy's availability API for `.com` and `.app`; prices not returned.

### 1.2 Results

| Candidate | App Store (US/GB) | Google Play | Web, games, podcasts | Trademark signals | .com / .app | Risk |
|---|---|---|---|---|---|---|
| **Doorhorn** | No app of this name (US 22 results, GB 14, all door or horn utilities). Nearest: "myDoorHan" ([id6463870110](https://apps.apple.com/us/app/mydoorhan/id6463870110)). | None. | "door horn" is a generic novelty-doorbell term (Etsy, YouTube). No company, game or podcast. | No DOORHORN record. Near-spelling DOORHAN (Class 6) cancelled 2019 ([Trademarkia](https://www.trademarkia.com/doorhan-79078885)). | Available / Available | **Low** |
| **Liftoff Choir** | None of this name; many "Liftoff" apps (LiftOff, LiftOff: The Game, Liftoff Ranked Gym Workouts). | None exact; LiftOff (com.liftoffapp.mobile). | "Liftoff" is crowded: ad-tech company liftoff.io, a space podcast, a Vancouver band, Liftoff: Micro Drones on Steam, a choral piece "Liftoff Canon Chorale". Nothing named "Liftoff Choir". | LIFTOFF registered to Liftoff Mobile, Inc. (Reg. 4618689, Class 42; later filing 88945960); HMP Labs LIFTOFF; braXos LiftOff (Class 42); LIFTOFF CERTIFICATIONS (Class 41). [Justia](https://trademarks.justia.com/860/92/liftoff-86092596.html), [uspto.report](https://uspto.report/TM/88945960). | Available / Available | **Medium** (phrase free; dominant word registered in Classes 41 and 42) |
| **Hornline** | None; search maps to horn sound-effect apps. | None. | Generic marching-band term for the brass section ([Wikipedia](https://en.wikipedia.org/wiki/Marching_brass)). No company, game, podcast or band. | No HORNLINE record; HORN LIN (auto locks) and HRONLINE unrelated ([Justia](https://trademarks.justia.com/856/68/horn-85668472.html)). | Available / Available | **Low–Medium** (App Store neighbours are sound-effects apps, a 4.3(b) category) |
| **Gantry** | **Taken:** "Gantry" by Chad Neal ([id6759813683](https://apps.apple.com/us/app/gantry/id6759813683)) plus Gantry Coolify Manager, Gantry: Scene Converter, Gantry Radiology, Gantry SG, Gantry AI. | Gantry (com.gantry.app), Gantry CNC Controller. | Gantry Systems, Inc. (gantry.io); Gantry theme framework (gantry.org). | GANTRY registered 2018 (Reg. 5462624, Classes 41 and 42, software design and media production) ([Justia](https://trademarks.justia.com/875/44/gantry-87544357.html)). | Taken / Taken | **High** (exclude) |
| **Splashdown** | None exact; water games. | "Splashdown Surge". | A 2026 Steam shooter ([app 4742700](https://store.steampowered.com/app/4742700/Splashdown/)); a 2001 PS2/Xbox game with a 2003 sequel; a Boston band (1996–2001); three waterparks; generic NASA term. | SPLASHDOWN, Class 9 video game software (Reg. 2645389), cancelled 2009; serial 76272002 abandoned 2003 ([Justia](https://trademarks.justia.com/762/54/splashdown-76254139.html)). Other SPLASHDOWN marks live in unrelated classes. | Reported available / Available (re-check the .com) | **Medium–High** |
| **Go Horns** | None exact; official "Texas Longhorns" app. | Texas Longhorns app. | UT's licensing office treats "Horns" as a UT mark ([trademarks.utexas.edu](https://trademarks.utexas.edu/use-restrictions)) and has fought app-name disputes ([Austin Chronicle](https://www.austinchronicle.com/news/2010-02-12/960952/)). | HOOK 'EM HORNS (Reg. 1358128), TEXAS LONGHORNS (Reg. 3665961), HOOK 'EM (Reg. 4963680), live, University of Texas System ([Justia](https://trademarks.justia.com/734/96/hook-em-73496540.html)). | Taken / Available | **High** (exclude) |
| **T-Minus Kitchen** | None exact; "T-Minus Events" (countdown) and "T-Minus – Space Launch Tracker" exist. | None. | Nothing found. | T-MINUS COUNTDOWN CLOCK (Class 9 software) abandoned ([TrademarkElite](https://www.trademarkelite.com/trademark/trademark-detail/78419994/T-MINUS-COUNTDOWN-CLOCK)); no live T-MINUS software mark surfaced (unverified). | Available / Available | **Low–Medium** ("T-Minus" reads as "countdown timer", the 4.3(b) word to avoid) |

### 1.3 Recommended shortlist

1. **Doorhorn.** Coined, arbitrary for software, nothing found anywhere, both domains free, and it does not describe a timer, countdown or sound effect.
2. **Liftoff Choir.** The phrase is free everywhere checked and says what the product is; counsel must assess the LIFTOFF marks in Classes 41 and 42. Never shorten it to "Liftoff" in metadata.
3. **Hornline.** Clean and suggestive, both domains free; a generic band word (stronger with a logo) whose App Store neighbours are horn sound-effect apps.

T-Minus Kitchen is a usable fallback that pulls the listing toward "timer". Exclude Gantry (six apps use the name; live registration in Classes 41 and 42) and Go Horns (University of Texas marks and an active licensing office). Splashdown is not recommended: a live 2026 Steam game of the same name plus a crowded common word is the App Name Dispute scenario the legal digest warns about.

### 1.4 Filing steps for the chosen name

1. **Knock-out searches** at the USPTO Trademark Center ([tmsearch.uspto.gov](https://tmsearch.uspto.gov/search/search-information)), EUIPO eSearch plus ([euipo.europa.eu/eSearch](https://euipo.europa.eu/eSearch/)) and WIPO's Global Brand Database ([branddb.wipo.int](https://branddb.wipo.int/en/)): exact word, phonetic equivalents, word plus "app". None could be queried by this document's tooling; run them by hand or through counsel.
2. **Classes 9, 41 and 42** (downloadable software; entertainment and non-downloadable music; software as a service for the future household share), with pre-approved wording from the USPTO ID Manual ([idm-tmng.uspto.gov](https://idm-tmng.uspto.gov/id-master-list-public.html)) to qualify for the base fee.
3. **Intent-to-use (Section 1(b)) application.** A sworn statement of bona fide intent suffices; a Notice of Allowance opens six months for a Statement of Use, extendable five times to 36 months ([USPTO ITU page](https://www.uspto.gov/trademarks/apply/intent-use-itu-applications)). Fees since 18 January 2025: base application $350 per class; surcharges of $100 per class for incomplete applications, $200 per class for free-form goods wording, $200 per extra 1,000 characters ([USPTO fee summary](https://www.uspto.gov/trademarks/fees-payment-information/summary-2025-trademark-fee-changes)); Statement of Use or Amendment to Allege Use $150 per class; extensions $125 per class ([USPTO fee information](https://www.uspto.gov/trademarks/trademark-fee-information)). Three classes: $1,050 at filing, $450 at Statement of Use.
4. **App Store Connect name reservation.** "You can use an app name for one app per localization" ([App Store Connect help](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app)); the App Name Dispute page says names are "based on language localization, not geographic territory" (legal digest, [apple.com](https://www.apple.com/legal/intellectual-property/dispute-forms/app-store/app-name-dispute.html)). Add the localized name for every supported language; 30-character cap (2.3.7). Secondary sources say an unused reservation lapses after about 90 days ([ptkd.com](https://ptkd.com/journal/check-app-store-name-availability)); Apple states no period, so upload a build promptly.
5. **Domains.** Register `.com` and `.app` the day the name is chosen.
6. **Metadata hygiene.** Keep "assemble", "endgame", "infinity", any show name, "timer" and "alarm" out of the name, subtitle, keywords and IAP names (WINNER.md).

### 1.5 What could not be verified

No official trademark database was queried, so recent applications, design marks and state registrations are invisible. App Store checks cover US and GB only. Google Play rests on web search. Common-law uses, business names and social handles were not checked. Domain flags came from one registrar at one moment.

---

## 2. Original IP inventory and registration plan

### 2.1 What is protectable, and by whom

| Asset | Protection | Owner | Notes and sources |
|---|---|---|---|
| Lyrics (launch tracks, Request Line, Re-entry, End Credits template) | Copyright, literary or musical work | Developer | Suno: if you wrote the lyrics "you own those lyrics" and may register them separately ([help.suno.com](https://help.suno.com/en/articles/2746945)). |
| Scripts: cues, station IDs, Flight Review lines, onboarding copy | Copyright, literary work | Developer | No AI disclosure needed if no AI text is included. |
| Section maps (JSON: phase timestamps, cue bars, role markers, horn entry) | Copyright in creative selection and arrangement, likely thin | Developer | The Office recognises claims in "Selection, coordination, and arrangement" ([AI guidance](https://www.copyright.gov/ai/ai_policy_guidance.pdf)); whether a timing map qualifies is a lawyer question. |
| The launch melody, written before rendering | Copyright, musical work | Developer | WINNER.md: "one original melody, developer-written lyrics". Fix it in dated notation or MIDI before generation. |
| Characters, art, crew patches, Department seal | Copyright in pictorial works and delineated characters; trademark potential for Scrub | Developer, or the artist unless assigned | Character test per DC Comics v. Towle (legal digest, [Wikipedia](https://en.wikipedia.org/wiki/DC_Comics_v._Mark_Towle)). Contractor art needs a written assignment. |
| Source code and screen displays | Copyright, computer program | Developer | Circular 61: deposit the first and last 25 pages of source, with trade-secret redaction options ([circ61.pdf](https://www.copyright.gov/circs/circ61.pdf)). |
| Human re-recorded station ID, fanfare, melody | Copyright in sound recording and musical work | Developer via work-for-hire or assignment | Circular 34 allows one registration for a sound recording and its underlying work when unpublished and author and claimant match ([circ34.pdf](https://www.copyright.gov/circs/circ34.pdf)). |
| Suno-rendered audio | No copyright expected; contractual rights only | Developer holds Suno's grant | Suno "makes no representation or warranty to you that any copyright will vest in any Output" ([terms](https://suno.com/terms-of-service)). |
| Name and logo | Trademark (section 1) | Developer | Logo must be original; nothing built from an Envato item can be a mark (section 4). |

### 2.2 Registration plan

**Fees today** ([copyright.gov/about/fees.html](https://www.copyright.gov/about/fees.html)): "Single author, same claimant, one work, not for hire $45"; "Standard Application $65"; "Registration of a claim in a group of unpublished works $85"; "Paper Filing (Forms PA, SR, TX, VA, SE) $125".

**Fees are about to rise.** A proposed rule appeared 20 March 2026 ([Federal Register](https://www.federalregister.gov/documents/2026/03/20/2026-05529/copyright-office-fees)); the final proposed schedule went to Congress in July 2026 for a 120-day review ([feestudy2026](https://www.copyright.gov/rulemaking/feestudy2026/)). Titled as fees "to go into effect in fall 2026", it raises the Standard Application from $65 to $85, paper from $125 to $185, most group options to $130, and keeps the Single Application with a $10 rise ([proposed schedule](https://www.copyright.gov/rulemaking/feestudy2026/proposed-fee-schedule.pdf)). File before it takes effect.

**Filings, in order:**

1. **Lyrics and scripts as group registrations.** Group Registration of Unpublished Works (GRUW) covers up to ten unpublished works for $85 when all are by the same author, the author is the claimant for each, the claim is identical and all share a class; it replaced the "unpublished collection" option in 2019 ([copyright.gov](https://www.copyright.gov/rulemaking/group-unpublished/)), and the registration "will remain in effect even if the works included in the group are subsequently published" (Circular 34). File one GRUW for the v1 lyric set and one for the script book; if either exceeds ten works, file further groups or register the script book as one integrated literary work ($65). Counsel should say which framing is stronger.
2. **The launch melody with lyrics** as a musical work (Standard Application, $65).
3. **Character art**: one GRUW of visual-arts works ($85).
4. **Source code and screen displays** (Standard Application, $65) at the 1.0 build.
5. **Human re-recordings** (sound recording plus musical work, $65) once they exist.

**AI disclosure.** Any registration that includes Suno material must follow the Office's policy: "applicants have a duty to disclose the inclusion of AI-generated content in a work submitted for registration and to provide a brief explanation of the human author's contributions"; the Standard Application must be used; and "AI-generated content that is more than de minimis should be explicitly excluded from the application" in the "Limitation of the Claim" section under "Material Excluded" ([AI guidance](https://www.copyright.gov/ai/ai_policy_guidance.pdf), effective 16 March 2023). The lyric and script filings contain no AI material; keep them separate from any audio filing.

**Timing.** Under 17 U.S.C. §412, statutory damages and attorney's fees are unavailable for infringement of an unpublished work that began before registration, or of a published work that began before registration and outside the three-month grace period after first publication ([uscode.house.gov](https://uscode.house.gov/view.xhtml?req=granuleid%3AUSC-prelim-title17-section412&num=0&edition=prelim)). Register the unpublished groups before release. Budget at current fees: about $365.

---

## 3. Music rights procedure for Suno-produced audio

### 3.1 When commercial rights attach

From the Suno digest (terms effective 3 September 2026):

- Pro and Premier subscribers receive the grant: "Subject to your compliance with these Terms of Service... Suno hereby assigns to you all of its right, title and interest in and to any Output owned by Suno and generated from Submissions made by you... provided such Output will remain subject to these Terms of Service including any applicable commercial use restrictions" ([terms](https://suno.com/terms-of-service)).
- Commercial use needs a permitted download: "You may commercially exploit Output solely to the extent it adheres to Suno's Conditions of Access and Use... provided you have obtained a permitted download of that Output".
- Free-tier output is "personal and non-commercial" and upgrading does not cure it ([help.suno.com](https://help.suno.com/en/articles/2425729)); the test is "was I subscribed when I made the song?", and rights persist after the subscription ends ([help.suno.com](https://help.suno.com/en/articles/2416769)).
- Caps since 3 September 2026: Pro 20 downloads a month, Premier 60, unlimited from Studio for Premier; one song is one download including stems; caps apply to the back catalogue; extras about $2.99 ([blog](https://suno.com/blog/suno-updates-tos), [FAQ](https://help.suno.com/en/articles/13614785)). v6 and v6-wild are paid-only; v6-mini is free to everyone ([release notes](https://suno.com/release-notes/introducing-v6)).

**Operating rule:** every shipped track is generated on an active Premier (or Pro) plan, on v6 or v6-wild, and obtained by permitted download or Studio export while subscribed. WINNER.md budgets about 110 downloads by launch, hence Premier plus Studio.

### 3.2 Records to keep

One ledger row per track, off-platform, in two places: monthly **subscription receipts** plus a PDF snapshot of the terms page on the first generation day of each month; a **prompt log** (style prompt, lyrics, model, settings, timestamp, clip ID and URL, credit cost); a **download log** (date, tier, format, credit consumed, SHA-256 of the file); the **unmodified originals** exactly as downloaded, fingerprint intact, kept apart from the bar-trimmed CAF derivatives; **derivation notes** mapping every shipped file to its original; and a **human authorship file** of dated melody and lyric drafts that predate each generation. This ledger answers guideline 5.2.2: "ensure that you are specifically permitted to do so under the service's terms of use. Authorization must be provided upon request" (Suno digest).

### 3.3 Prohibited practices

- **No artist names, show names or "in the style of".** Suno allows a Voice Model of your own voice only; the Isbell class action of 31 August 2026 targets use of artists' identities ([Hollywood Reporter](https://www.hollywoodreporter.com/music/music-industry-news/jason-isbell-files-class-action-lawsuit-against-suno-1236687285/)); Midler and Waits make deliberate voice imitation a tort ([Waits v. Frito-Lay](https://law.justia.com/cases/federal/appellate-courts/ca9/90-55981/90-55981.html)). Prompts stay at genre, mood, instrumentation, tempo and register.
- **No uploading copyrighted audio.** Covers and audio inputs use only the developer's own melody.
- **No watermark removal:** users may not "remove, alter, obscure or circumvent any fingerprint, watermark or metadata Suno appends to an Output" ([terms](https://suno.com/terms-of-service)). Trimming for playback is engineering; the originals prove nothing was stripped.
- **No Remix:** Remixes are usable "only... for lawful, personal and non-commercial purposes, regardless of your subscription tier".
- **No third-party API wrappers.** There is no public API; the July 2026 developer programme is invite-only ([MBW](https://www.musicbusinessworldwide.com/suno-explores-developer-api-seeking-apps-that-unlock-experiences-generative-music-makes-possible-for-the-first-time/)). Wrappers sit outside the terms and leave no permitted-download record.
- **No in-app generation, remixing or sharing**: a "competing music-generation product" under the terms, and a trigger for Apple's 1.2 user-generated-content rules (Suno digest).

### 3.4 Copyright status of the audio

The Copyright Office's Part 2 report (29 January 2025) holds that AI output is protectable only where a human determined sufficient expressive elements, and prompts alone are not enough ([Part 2](https://copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf)); certiorari in Thaler v. Perlmutter was denied on 2 March 2026 ([SCOTUSblog](https://www.scotusblog.com/cases/thaler-v-perlmutter/)). Assume the rendered audio is uncopyrightable and could be copied by a competitor, while the lyrics, melody, scripts, maps, characters and brand cannot. So audio is a replaceable layer by design: maps are keyed to bars and BPM, not files; every asset carries a content hash; any flavour can be re-rendered or re-recorded and shipped in an update without touching maps, lyrics or code. Never describe or register the audio as human-composed.

### 3.5 In-app disclosure text

About screen, from WINNER.md: **"Every line written by a person. Songs produced with Suno from those lyrics."** Optional second line for About and the review notes: "Music was generated under a Suno Premier commercial licence from lyrics and a melody written by the developer; every track was downloaded while subscribed and records are available on request." Attribution is optional on paid plans ([help.suno.com](https://help.suno.com/en/articles/2410177)).

### 3.6 Human re-recording plan

Within year one, re-record the station ID, liftoff fanfare and launch melody with a human musician under a written work-for-hire agreement plus assignment (lawyer to draft); archive session files and masters like the Suno originals; register the sound recording and musical work together (section 2.2); ask whether the station ID could later be a sound mark.

### 3.7 Contingency

Live risks from the Suno digest: Sony and UMG's second suit of 18–19 September 2026 seeks injunction-scale remedies against v6 ([Engadget](https://www.engadget.com/2262978/sony-music-and-udio-say-sunos-new-models-still-violates-their-copyright.html)); Munich ruled for GEMA on 31 July 2026 ([Bird & Bird](https://www.twobirds.com/en/insights/2026/germany/munich-district-court-rules-on-ai-generated-music-gema-v-suno)); prior models were retired at the v6 launch and terms tightened once already in 2026. Plan: freeze a golden-master library at launch (nothing depends on Suno being reachable); keep the ledger current; keep a model-agnostic regeneration path on another licensed provider or with human musicians, with a budget line (the digest names Epidemic Sound but its app-embedding terms were not checked); monitor the UMG, GEMA, Justice and Isbell cases; never add runtime generation or a vendor SDK.

---

## 4. Envato Elements rules as they apply here

From the Envato digest (licence revised 8 December 2025; the digest notes Envato's help pages blocked automated fetching, so re-read clause numbers on the live [License](https://help.elements.envato.com/hc/en-us/articles/360000628966-Envato-Elements-License) and [FAQ](https://help.elements.envato.com/hc/en-us/articles/360000629346-Envato-Elements-License-FAQ)).

- **One licence per End Product; the app is one End Product.** A licence is created at download; one licence covers one software product when the item is fully integrated and users cannot access it; a second app needs a second licence. Set the account to "Always ask" so every download is labelled for this app ([how licensing works](https://elements.envato.com/learn/how-envato-licensing-works), [Create a new license](https://help.elements.envato.com/hc/en-us/articles/360000621763-Create-a-new-license)), and archive the licence PDF and an item-page screenshot for every item, since authors can withdraw items.
- **Complete the End Product while subscribed.** Clause 8: "the license is only valid if you complete the End Product while your subscription is active... If you cancel your subscription and have not completed your End Product, the license for the Item is terminated". Keep the subscription active until 1.0 ships.
- **After the subscription lapses:** the finished app may keep shipping with minor updates; items may not go into new or materially different products; installed fonts must be uninstalled (clause 12(a)). A sequel needs fresh licences.
- **Fonts do not ship in the binary.** Clause 13(d)(ii) bars incorporating or distributing a font within an End Product, and the web-font exception excludes products that let users create new text. Envato display fonts serve the icon, wordmark, screenshots and title art exported as outlines; runtime text uses SIL OFL faces. The digest recommends written confirmation from terms@help.envato.com before any font file ships.
- **No trademark from Items.** Clause 12(f): "You can't claim trademark or service mark rights over an Item within the End Product"; a logo built from an item cannot be trademarked. Wordmark, icon, Scrub and the patches must be original art.
- **No build-it-yourself features** from items (clause 12(c)): household names and colours are user data on original art; nothing Envato-derived is exportable.
- **Not extractable** (clause 12(e)): ship graphics through asset catalogs; never include PSD, AI, EPS or Sketch sources.
- **Check bundled third-party components** (clauses 16–18): kits may carry Google Material Icons or "free fonts" under their own licences.
- **Sound effects yes, music no:** sound effects may be used commercially; Envato music may not be standalone tracks. Apple 5.2.1 still requires proof of licence; the certificates are it.

| Asset category | Reference only | Usable in app | Usable in marketing | Notes |
|---|---|---|---|---|
| Layout references, UI kits, design systems | Yes | Yes, re-skinned, in asset catalogs | Yes | One licence per app; check bundled icon and font licences |
| Halftone textures, poster templates | Yes | Yes, as textures | Yes | Not as the app's identity as-is |
| Display fonts | Yes | **No font files**; pre-rendered outlines or PNG only | Yes (icon, wordmark, screenshots) | Runtime text in OFL faces; uninstall on lapse |
| Character kits, stock characters, mascots | Yes, for pose study | **No**: characters, patches and icons are original (WINNER.md) | No | Avoids clause 12(f) and lookalike risk |
| Stickers, emoji, speech bubbles | Yes | Yes, fixed, never user-remixable | Yes | No Apple emoji (guideline 5.2.5, legal digest) |
| Sound effects | Yes | Yes | Yes | Least constrained; one licence per pack |
| Music tracks | No | **No** | No | Standalone playback prohibited |
| App-icon templates | Yes | Yes, as tooling | Yes | The icon artwork must be original |

---

## 5. Art and tone safety

### 5.1 Checklist for the original cast

- [ ] **Silhouette comparison.** Place each final silhouette beside the best-known cartoon characters of the same archetype and confirm no one would read them as the same character. Krofft v. McDonald's found infringement from "total concept and feel" without identical drawings ([Wikipedia](https://en.wikipedia.org/wiki/Sid_%26_Marty_Krofft_Television_Productions_Inc._v._McDonald%27s_Corp.)); Kill the Plumber was blocked by Apple until its art stopped resembling Nintendo's ([Wikipedia](https://en.wikipedia.org/wiki/Kill_the_Plumber)). If any pairing is close, change the archetype mix, not just the drawing.
- [ ] **No real agency insignia, call signs or hardware:** no NASA or ESA insignia, Apollo-era likenesses, real call signs or recognisable vehicles. AM General v. Activision (real Humvees inside a game) turned on artistic relevance and no explicit misleading ([Finnegan](https://www.finnegan.com/en/insights/blogs/incontestable/in-legal-warfare-over-humvee-trademarks-the-first-amendment-goes-beyond-the-call-of-duty-in-dismissing-am-generals-claims.html)); do not rely on it.
- [ ] **Role title "CAPCOM".** A genuine NASA job title, but also the name of a major video game publisher; no trademark check was run on it here. Keep it out of the name, subtitle, keywords and marketing, and ask counsel whether to rename the role.
- [ ] **No real weather personalities.** Dr. Farrago stays a streak-keeper proud of being wrong, never an impression of a real or fictional TV meteorologist; the soundalike cases apply to her voice direction too.
- [ ] **Names checked against public figures** (24 September 2026): "Augustine Pell" returns only Cardinal George Pell (surname collision); "Gus Marchetti" private individuals; "Ines Farrago" nothing ("Farrago" is also a Rogue Amoeba soundboard app); "Bunny Kowalczyk" a real, recently deceased private person whose 80-year marriage received national TV coverage in 2024 ([obituary](https://www.schrader.com/obituary/bertha-b-bunny-kowalczyk-nee-burnham)), which argues for changing the name; "Lionel Abara" nothing. Re-run every name, plus "Scrub", "Department of Five More Minutes" and "Cul-de-Sac Mission Control", before shipping and log the date.
- [ ] **Satire aimed only at invented institutions;** never a real agency, company, product or person.
- [ ] **Register held at 4+/9+:** no profanity, alcohol, crude humour or fear themes in the default script.
- [ ] **Originality dossier:** dated character sheets, source files, name-check logs, Suno ledger and Envato certificates in one folder, ready to attach in App Review Information.

### 5.2 Why parody and lookalikes are not a safe harbour

From the legal digest:

- **Jack Daniel's Properties v. VIP Products (US Supreme Court, 2023, 9–0):** "When an alleged infringer uses a trademark as a designation of source for the infringer's own goods, the Rogers test does not apply." A parody used as your own brand or title gets no First Amendment shield ([Wikipedia](https://en.wikipedia.org/wiki/Jack_Daniel%27s_Properties,_Inc._v._VIP_Products_LLC)).
- **Andy Warhol Foundation v. Goldsmith (2023):** a commercial use sharing the original's purpose fails the first fair-use factor even with new expression ([copyright.gov](https://www.copyright.gov/fair-use/summaries/Andy-Warhol-Found-for-the-Visual-Arts-Inc-v-Goldsmith-143-S-Ct-1258-2023.pdf)).
- **Dr. Seuss Enterprises v. ComicMix (9th Cir. 2020):** a mashup that "merely mimick[ed] Seuss' style without critiquing or commenting on that style" was not parody ([Loeb](https://www.loeb.com/en/insights/publications/2020/12/dr-seuss-enterprises-lp-v-comicmix-llc)).
- **Walt Disney Productions v. Air Pirates (9th Cir. 1978):** near-identical character drawings lost even in satire ([copyright.gov](https://www.copyright.gov/fair-use/summaries/waltdsney-airpirates-9thcir1978.pdf)).
- **App Review does not weigh fair use.** Its remedy text is to "attach documentary evidence in the App Review Information section" or remove the content ([forum 699048](https://developer.apple.com/forums/thread/699048)); the only satire carve-out (1.1.1) concerns offensiveness. After launch any rights holder can file the Content Dispute form and Apple removes on an "unresolved" flag without adjudicating, as with TV Time in 2024 ([TechCrunch](https://techcrunch.com/2024/11/20/tv-time-points-to-apples-significant-power-over-developers-after-being-removed-from-app-store)).

Style itself is safe: the Office's May 2025 report says style is something "copyright does not protect", with the caveat that replication can still "capture protectible elements" ([Part 3](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-3-Generative-AI-Training-Report-Pre-Publication-Version.pdf)). Flat colour, mission-control comedy and ensemble warmth are ideas; the cast, names, world and words are the expression Doorhorn owns.

---

## 6. App Store compliance checklist

Quoted guideline text is as it appears in the digests; other rows paraphrase the current guidelines ([developer.apple.com](https://developer.apple.com/app-store/review/guidelines/)).

| Guideline | Requirement | Doorhorn action | Source |
|---|---|---|---|
| **5.2.1** | "Don't use protected third-party material such as trademarks, copyrighted works, or patented ideas in your app without permission, and don't include misleading, false, or copycat representations, names, or metadata in your app bundle or developer name. Apps should be submitted by the person or legal entity that owns or has licensed the intellectual property and other relevant rights." | Zero third-party IP; rights ledger ready; seller name matches the brand or an authorisation letter is on file. | Legal digest |
| **5.2.2** | "ensure that you are specifically permitted to do so under the service's terms of use. Authorization must be provided upon request." | Suno ledger and Envato certificates; review note on the Suno licence. | Suno digest |
| **4.3(b)** | "Certain kinds of apps, such as dating, flashlight, sound effects, wallpaper, simple timers, and fortune telling, are well established on the App Store and we will not accept new submissions unless they offer a meaningfully different or improved experience". | Annotated score is screen one and screenshot one; metadata never says "timer" or "alarm"; review notes name the section map, in-song manifest, Stem Roll Call and End Credits; category Lifestyle or Productivity, secondary Entertainment. | Legal digest; [MacRumors](https://www.macrumors.com/2026/06/09/app-store-guidelines-low-quality-apps/); [Apple news](https://developer.apple.com/news/?id=a233fmpw) |
| **2.3.7** | "Choose a unique app name, assign keywords that accurately describe your app, and don't try to pack any of your metadata with trademarked terms, popular app names ... App names must be limited to 30 characters ... Apple may modify inappropriate keywords at any time." | Cleared name; no competitor or franchise words, no "for kids"; subtitle "No clock. The job ends when the song ends." | Legal digest |
| **4.1(c)** | "You cannot use another developer's icon, brand, or product name in your app's icon or name, without approval from the developer." | Original icon and name. | Legal digest; [Apple news](https://developer.apple.com/news/?id=ey6d8onl) |
| **5.1.1** | Privacy policy link in App Store Connect and in the app, stating what is collected, third-party sharing, retention and deletion; consent for any collection; data minimisation. | Publish the section 7 policy; link it from Settings; request only notification and alarm permissions. | [Guidelines](https://developer.apple.com/app-store/review/guidelines/) |
| **Privacy label** | "Data Not Collected" reads "The developer does not collect any data from this app." Apple defines "collect" as transmitting data off the device so the developer or partners can access it beyond real-time servicing of a request. | Declare Data Not Collected and keep it true: no analytics, no crash reporter sending personal data, no SDKs that phone home. | [apple.com/privacy/labels](https://www.apple.com/privacy/labels/); [app-privacy-details](https://developer.apple.com/app-store/app-privacy-details/) |
| **5.1.2(i)** | "You must clearly disclose where personal data will be shared with third parties, including with third-party AI, and obtain explicit permission before doing so." | Not triggered: no runtime AI; nothing leaves the device. | Suno digest |
| **2.5.4** | Background services only for their intended purposes, audio playback among them. | Declare the audio background mode; run it only while a track actually plays. | [Guidelines](https://developer.apple.com/app-store/review/guidelines/); [UIBackgroundModes](https://developer.apple.com/documentation/bundleresources/information-property-list/uibackgroundmodes) |
| **Age rating** (questionnaire mandatory since 31 January 2026) | Tiers 4+, 9+, 13+, 16+, 18+. To 9+: infrequent profanity or crude humour, cartoon violence, fear themes. To 13+: frequent crude humour, infrequent alcohol, tobacco or drug references, infrequent realistic violence. | Answer honestly for 4+ or 9+; keep alcohol, profanity and fear out of the default script so the app stays visible on family devices under iOS 27 Child Accounts (WINNER.md). | [Age ratings](https://developer.apple.com/help/app-store-connect/reference/age-ratings/); [Apple news](https://developer.apple.com/news/?id=ks775ehf) |
| **1.3 and 5.1.4 (Kids)** | Kids Category apps must gate links and purchases, may not send identifiable data to third parties, and stay bound by those rules even if the category is later deselected; 2.3.8 reserves "For Kids" and "For Children" to the Kids Category and other apps may not imply children are the main audience. | **Do not opt into the Kids Category.** The parent's phone is the primary device, marketing leads with roommates, couples and commuters, and no metadata implies a child audience. | [Guidelines](https://developer.apple.com/app-store/review/guidelines/); [Apple news](https://developer.apple.com/news/?id=091202019a) |
| **Small Business Program** | 15% commission up to $1M prior-year proceeds; enrol as Account Holder after accepting the Paid Apps agreement; applies 15 days after the end of the fiscal month of approval. | Enrol before launch. | [Apple](https://developer.apple.com/app-store/small-business-program/) |
| **EU DSA trader status** | Declared trader status required; verified address, phone and email appear on EU product pages; unverified apps were removed from the EU store from 17 February 2025. | Declare status; decide deliberately whether a home address should appear. | [Apple news](https://developer.apple.com/news/?id=x60uzbu9); [App Store Connect help](https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements/) |

---

## 7. Privacy

### 7.1 Ready-to-publish privacy policy

Modelled on the Constellate policy in `index.html`, keeping its stance (nothing leaves the device, so there is nothing for the developer to hold) and structure. Replace bracketed items, publish at a stable HTTPS URL, and link it from App Store Connect and Settings.

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
> - Your mission log: which launches happened, which were scrubbed, your on-time rating, and the End Credits cards assembled from your manifest
> - Which songs the app played and when, so it can rotate them
> - Your settings: flavours and durations, first-sound choice, quiet mode, AirPlay preference, widget and Live Activity options
> - Whether you have bought the one-time unlock (the purchase itself is processed by Apple under Apple's own privacy policy; Doorhorn only stores the fact that it succeeded)
>
> This information never leaves your device. It is not uploaded, synced, backed up to our servers, shared with third parties, or used for advertising. We cannot see it, and we cannot recover it for you. If you use your device's own backup features, your device may include this data in your personal backup; that is controlled by you and your device settings, not by us.
>
> If you delete Doorhorn, this data is deleted with it. You can also erase everything at any time from **Settings → Reset all data**.
>
> ## Alarms, notifications and Live Activities
>
> If you schedule a launch, Doorhorn asks your operating system for permission to set alarms and send notifications. The morning alarm, the bedtime cue, the countdown on your Lock Screen and any reminders are scheduled locally by the operating system. They do not require an account and do not involve a server. Shortcuts, NFC tags and the Action Button can start a Request Line song; Doorhorn reads nothing from a tag except the instruction to play.
>
> ## Playback on speakers
>
> If you play on a HomePod or another AirPlay speaker, audio travels from your device to that speaker over your own network through your operating system. Doorhorn sends nothing to us.
>
> ## Analytics and tracking
>
> Doorhorn contains no analytics, no advertising SDKs, no third-party trackers, and no crash-reporting service that transmits personal information. We do not use cookies or device advertising identifiers, and we do not track you across other apps or websites.
>
> ## Children's privacy
>
> Doorhorn is made for the adult who runs a household and is not directed at children under 13. It does not knowingly collect information from anyone. Names a parent enters for family members stay on that parent's device. Because the app collects no data at all, no personal information from any user — of any age — is transmitted or retained by us.
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

Rename throughout when the final name is chosen; use one support mailbox for the policy, App Store Connect and the EU trader listing.

### 7.2 Children in the household

- **COPPA scope.** COPPA applies to operators of services directed to children under 13 that collect personal information, and to general-audience services with actual knowledge of collecting from a child under 13; "personal information" includes names, online contact details and persistent identifiers ([FTC](https://www.ftc.gov/business-guidance/resources/childrens-online-privacy-protection-rule-six-step-compliance-plan-your-business)). The amended rule was published 22 April 2025, took effect 23 June 2025, with compliance due 22 April 2026 ([Federal Register](https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule)). Doorhorn transmits nothing, keeps no identifier of its own and has no account, so COPPA's notice-and-consent machinery is not engaged; any future sync, analytics or crash reporter re-opens the question.
- **"Directed to children" factors** include subject matter, "the use of animated characters or other child-oriented activities and incentives", and child celebrities (same source). Doorhorn has animated characters and a child-appealing robot; the counterweights are the adult-owned device, adult-facing marketing, adult tasks and zero collection. Counsel should confirm, and the marketing brief must not drift toward "for kids".
- **Apple's rules.** Outside the Kids Category, "For Kids" and "For Children" are off limits (2.3.8) and 5.1.4 bars implying children are the main audience; Apple notes its parental gate is "generally not the same as securing parental consent" under privacy statutes (guideline 5.1.4). Names a parent enters about children stay on the parent's device as the parent's own record.

---

## 8. Accessibility and consumer-protection notes

Not legally mandatory for a US one-time-purchase app of this kind, but good practice.

**Accessibility.** Follow Apple's Human Interface Guidelines ([accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)): VoiceOver labels on the score, phase bands, patches and Scrub; Dynamic Type; Reduce Motion alternatives for the cutout animation; contrast that survives tinted and clear icons. Because the product is audio-first, give every sung cue a visual twin (phase name and countdown on the Live Activity, optional captions for the manifest bridge, a haptic on the horn entry). The **European Accessibility Act** has applied since 28 June 2025 to a listed set of products and services, including e-commerce, banking, e-books, telephony and transport ([European Commission](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en)); secondary sources describe a microenterprise exemption for services ([webyes.com](https://www.webyes.com/blogs/eaa-exemptions/)). A household routine app is not in the listed categories, but the question is on the lawyer list.

**Consumer protection.** Refunds are Apple's: customers apply at reportaproblem.apple.com and Apple decides within about 24 to 48 hours ([Apple Support](https://support.apple.com/en-us/118223)); link to that page from Settings. No dark patterns: the FTC's September 2022 report describes designs that "can trick or manipulate consumers into buying products or services or giving up their privacy", including countdown timers where "the offer is not actually time-limited", hidden fees and hard-to-find cancellation paths ([FTC release](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers); [report](https://www.ftc.gov/reports/bringing-dark-patterns-light)). For an app whose identity is a countdown, never put a countdown or scarcity language on the paywall; state one price, exactly what it unlocks, and that there is no subscription (WINNER.md: "The paywall says exactly that"). The free tier stays complete without the unlock.

---

## 9. Launch-day legal checklist

**Name and marks**
- [ ] Final name cleared by counsel; USPTO, EUIPO and WIPO knock-outs run by hand and filed
- [ ] Intent-to-use application filed in Classes 9, 41 and 42; serial numbers recorded
- [ ] App Store Connect record created under the final name in every supported localization; a build uploaded
- [ ] `.com` and `.app` registered; privacy policy live on HTTPS
- [ ] Name, subtitle, keywords and IAP names free of trademarked terms, competitor names, "timer", "alarm", "for kids" and franchise words

**Copyright**
- [ ] Lyrics GRUW and script book registration filed; launch melody registered as a musical work
- [ ] Character art GRUW filed; source code and screen displays registered at the 1.0 build
- [ ] All filings made before public release (17 U.S.C. §412)

**Music**
- [ ] Every shipped track traces in the ledger to a permitted download or Studio export on an active paid plan, v6 line
- [ ] Unmodified originals archived off-platform with hashes; CAF derivatives mapped to originals; receipts and terms snapshots archived
- [ ] No prompt contains an artist, show or brand name or "in the style of"; no Remix, wrapper, free-tier or v6-mini output in the bundle
- [ ] About screen carries the disclosure line; musician agreement for year-one re-recordings drafted

**Envato**
- [ ] One named licence per item; certificates and screenshots archived; subscription active through the 1.0 submission
- [ ] No Envato font file in the bundle; runtime fonts OFL; icon, wordmark, characters and patches original
- [ ] No PSD/AI/EPS/Sketch sources in the bundle; third-party components inside kits checked

**Characters and tone**
- [ ] Silhouette comparison documented for all six characters
- [ ] Character names re-searched on the release date; Bunny Kowalczyk and "CAPCOM" resolved with counsel
- [ ] No real agency insignia, call signs, vehicles, brands or people in the app or marketing
- [ ] Default script free of profanity, alcohol, crude humour and fear themes; age-rating questionnaire answered honestly

**App Store Connect**
- [ ] Privacy label Data Not Collected; policy URL entered and linked in Settings
- [ ] Review notes name the section map, in-song manifest, Stem Roll Call and End Credits, the Suno licence, and that no data leaves the device
- [ ] Category Lifestyle or Productivity, secondary Entertainment; Kids Category not selected
- [ ] Background audio declared and used only during real playback
- [ ] Small Business Program approved; EU trader status declared with a deliberate address choice
- [ ] Originality dossier in one folder ready to attach

**Consumer**
- [ ] Paywall states one price, one purchase, no subscription; no countdown or scarcity language
- [ ] Settings links to Apple's refund page and the privacy policy; free tier verified complete

---

## 10. Open questions for a lawyer

1. **Name.** Which of Doorhorn, Liftoff Choir and Hornline survives full clearance in the US, EU and UK? Does the LIFTOFF portfolio in Classes 41 and 42 make "Liftoff Choir" too close? Is "Hornline" registrable without a design element?
2. **Classes.** Confirm the Class 9, 41 and 42 identifications, and whether Class 41 belongs in the first filing or later with a soundtrack release.
3. **Section maps.** Are the JSON maps protectable as compilations, worth registering, or better kept as trade secrets?
4. **Lyrics and scripts.** GRUW groups or one integrated "book and lyrics" registration for enforcement, and does the fall-2026 fee change alter the choice?
5. **Suno rights.** The terms "assign" all right, title and interest while disclaiming that copyright vests, and help pages say paid users "own" songs. What exactly does Doorhorn hold in each track, is the section 3.2 ledger sufficient evidence, and do Studio exports and Advanced Split stems clearly count as "permitted downloads"?
6. **Contingency.** If an injunction or terms change affects v6 after launch, what is the exposure for tracks already downloaded, and should the re-recordings be brought forward?
7. **Agreements.** Draft the musician work-for-hire plus assignment and any contractor-art assignment; advise whether the station ID could become a sound mark.
8. **CAPCOM.** Is the NASA job title acceptable as a character role given the video game publisher of the same name?
9. **Envato fonts.** Confirm that no Envato font file may ship in the binary, and whether written confirmation from Envato is worth obtaining.
10. **Children.** Confirm that an adult-owned, no-collection app with animated characters is not "directed to children" under COPPA, and what guardrails the marketing brief needs.
11. **EU and UK.** Does the European Accessibility Act or consumer law in the launch territories impose obligations on a one-time-purchase app sold through Apple, and does microenterprise status matter? Should a registered agent's address be used for the DSA trader listing?
12. **Entity and timing.** Should the app be published from an LLC rather than an individual account, given Apple's seller-name practice under 5.2.1 and the Suno litigation climate? Confirm the section 2.2 sequence preserves §412 remedies from release.
