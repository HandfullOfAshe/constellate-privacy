# Doorhorn (working title): Monetization, App Store Listing and Launch Plan

Doorhorn is sold once, as a $9.99 non-consumable unlock under the App Store Small Business Program, on top of a free tier complete enough to prove the product on the first morning, with no ads, no subscription, no accounts and no streaks. This document fixes the price and its evidence, the free/paid boundary, the StoreKit 2 setup, the paywall, a paste-ready listing built to survive a guideline 4.3(b) comparison with routine timers, the review-risk table, screenshots and preview, the launch plan, revenue scenarios, localization, support, the roadmap and the open questions.

Date: 24 September 2026. Source of truth: `concepts/tournament/WINNER.md`. "Doorhorn" in listing copy is a placeholder for the final name (section 6).

---

## 2. Pricing model and rationale

### 2.1 Free download, one-time unlock

Free to download. The free tier is not a trial: a real launch every morning and a real Re-entry every night, forever. One non-consumable purchase, Full Crew, at USD 9.99, unlocks everything else. No subscription, no consumable, no ad tier, no second product at v1.

Evidence (monetization digest): paid-upfront apps get almost no installs now (one developer: six downloads in week one; another moved from subscription-with-trial to one-time and "got daily sales, more downloads", https://www.reddit.com/r/iOSProgramming/comments/1n23m6g/try_before_you_buy_subscription_or_simply_buy_to/); the developer consensus is "Simple offline app with no maintenance = single lifetime IAP" (https://www.reddit.com/r/iOSProgramming/comments/1lpkpsz/is_the_subscriptions_based_revenue_still_the_best/), and Doorhorn has no server, no sync at v1 and no runtime AI; one-time IAPs earn an estimated $251 per 1,000 downloads against $152 for subscriptions after Apple's cut, with refunds targeted under 2% (https://dev.to/snake_sun/why-i-picked-one-time-iap-over-subscription-for-4-indie-ios-apps-storekit-2-2026-data-1nk6); "lifetime" wording triggers sticker shock (https://www.reddit.com/r/iOSProgramming/comments/1l4j5ra/lifetime_vs_annual_free_trial_vs_no_trial/), so the paywall says "one purchase"; five-star reviews of Streaks and Things 3 repeat one-time purchase, no ads, no subscription (https://apps.apple.com/us/app/streaks/id963034692, https://apps.apple.com/us/app/things-3/id904237743); and over half of conversions happen on day 0 (https://www.revenuecat.com/state-of-subscription-apps), so the Test Fire and the first morning carry the sale.

### 2.2 The price point: $9.99

The proven price for a finished premium app: Balatro ($9.99, no IAP, about $1M in its first mobile week, https://www.pocketgamer.biz/balatro-nears-44m-on-mobile-amid-a-sudden-spending-surge/), Things 3 on iPhone ($9.99), DREDGE ($9.99, https://www.mobilemarketingreads.com/the-15-best-paid-ios-games/). Streaks proves $5.99 is uncontroversial; HabitKit's $32 lifetime is the habit-app ceiling (https://www.buildmvpfast.com/blog/602k-revenue-solo-indie-hacker-app-portfolio-breakdown-2026). The digest's rule of thumb caps a lifetime price at about two years of the category's annual plan; two years of Routinery is $72, so $9.99 is conservative. Apple's price points allow $0.10 steps up to $10 (https://developer.apple.com/news/?id=dbrszv62), so $8.99 is available for the soft-launch test.

### 2.3 The Small Business Program

Enrol on day one: developers with up to $1M in prior-calendar-year proceeds pay 15% instead of 30%, effective 15 days after the end of the fiscal month of approval; exceeding $1M in-year moves future sales to the standard rate (https://developer.apple.com/app-store/small-business-program/). At $9.99 the developer nets about $8.49. EU participants pay 15% through Apple's IAP under the terms effective 1 October 2026 (https://developer.apple.com/support/apps-in-the-eu/), so alternative payment paths are not worth touching; nor are US external links, since the 0% link-out rate could change after the Supreme Court's 2027 ruling (https://tiun.io/blog/ios-external-payments-us-cost-2026).

### 2.4 Why not a subscription

The promise forbids it, and the promise is the marketing. The audience is sick of it: paywall/subscription was the top complaint across 18,464 habit-tracker reviews (https://dev.to/eltacrew/i-read-18464-reviews-of-6-habit-tracker-apps-the-1-upvoted-complaint-is-something-none-of-them-go9), Cozi's surprise paywall took its Trustpilot score to 2.1/5 (https://www.trustpilot.com/review/cozi.com), and Alarmy reviewers "would be happy to pay once to remove ads, but don't do subscriptions" (https://apps.apple.com/us/app/alarmy-loud-alarm-clock/id1163786766?see-all=reviews&platform=iphone). There is nothing to meter: the app costs the same to run in year three as on day one (https://localonelabs.com/topics/no-subscription-apps). And guideline 3.1.2(a) says a developer moving to subscriptions "should not take away the primary functionality existing users have already paid for" (https://developer.apple.com/app-store/review/guidelines/).

### 2.5 What competitors charge

| Product | Price | Source |
|---|---|---|
| Routinery | Premium Yearly $36.00 (also a $39.49 yearly tier, $5.00-$5.49 monthly, $0.99 weekly); 4.7 stars, 18K ratings | https://apps.apple.com/us/app/routine-planner-habit-tracker/id1450486923 (fetched 24 Sep 2026) |
| Brili Routines | Yearly $49.99, monthly $7.99, six-month $34.99; 4.6 stars, 601 ratings | https://apps.apple.com/us/app/brili-routines-habit-tracker/id1516036620 (fetched 24 Sep 2026) |
| Morning Routine: Be On Time | $2.99 weekly or $29.99 yearly | https://apps.apple.com/us/app/morning-routine-be-on-time/id6759146787 (tournament competitor hunt) |
| Cozi | Gold $39/yr, Max $79.99/yr, ads on the free tier | https://www.trustpilot.com/review/cozi.com |
| Finch | $9.99/month or $69.99/year | https://slate.com/technology/2026/09/finch-app-self-care-wellness-review.html |
| Goally (routine hardware) | $295-$395 today; the tournament recorded $189-$369 earlier in 2026 | https://getgoally.com/ (fetched 24 Sep 2026) |
| Streaks / Things 3 / HabitKit | $5.99 one-time / $9.99 one-time / $32 lifetime | Sources above |

One $9.99 purchase is under four months of Routinery and under three of Brili. The comparison is never made in words: 2.3.7 says subtitles must not "reference other apps", and the description names no competitor.

### 2.6 Three models considered and rejected

1. Paid upfront at $4.99: no Test Fire before purchase, near-invisible downloads (six in a week, above), and the free tier is the distribution: one person pays, three hear it.
2. Annual subscription ($19.99) with a trial: hard paywalls convert 10.7% versus 2.1% at day 35, but 35% of annual cancellations happen in month one (https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026); there is no ongoing cost to justify it and it contradicts the positioning.
3. Per-flavor packs ($1.99 each): Heads Up! reviewers lost purchased decks under Family Sharing and call the developers uncaring (https://apps.apple.com/us/app/heads-up/id623592465); Psych! is reviled for paywalling "almost all of the fun categories" (https://appgrooves.com/app/psych-outwit-your-friends-by-warner-bros-international-enterprises/negative); packs turn every seasonal drop into a pricing decision.

Deferred, not rejected: 3.1.1 allows a "XX-day Trial" non-consumable at price tier 0 for non-subscription apps; it can be tested after launch.

---

## 3. Free versus paid boundary

Following WINNER.md's "What you pay for": anything needed to prove the product on the first morning, or to keep a household's data safe, is free; breadth, memory and spectacle are paid.

| Item | Tier | Why |
|---|---|---|
| One launch flavor at 10 and 12 minutes | Free | The core mechanic must run for real every morning or nobody buys. |
| One Re-entry track | Free | The second structural anchor; without it the free tier is half a day. |
| Manifest with memory and one Hold item | Free | The user's own data; gating it would hold their lunchbox hostage. |
| Scrub and the mission log (rolling rating, last 14 days editable) | Free | Blameless abort is the ethical core and is never sold. |
| Test Fire | Free | The demo and the moment of understanding; it runs before any purchase. |
| Three Request Line songs (teeth 2:00, microwave 1:30, kettle 3:00) | Free | Makes the app daily for a solo commuter; the family-shelf mitigation. |
| Lock Screen/StandBy countdown, AirPlay, quiet mode | Free | Plumbing; the launch does not work on a kitchen speaker without them. |
| Every flavor and duration (six flavors; 8/10/12/15/20 min) | Paid | Breadth against music fatigue for the 300th morning. |
| Crew roles, walk-up cues, Stem Roll Call | Paid | The household spectacle; a household pays after hearing the silence where a stem should be. |
| Full Request Line library | Paid | Cheap to want, expensive to author; three free ones set the hook. |
| End Credits, shareable card, clothesline widget | Paid | The nightly artifact people screenshot. |
| Ninety-day log history, Sunday Flight Review | Paid | Memory and reflection; the free log keeps the rating and recent days. |
| Weekend lounge, Hangar StandBy | Paid | Atmosphere and the nightstand identity. |
| Household sharing via iCloud (when it ships) | Included in Full Crew | Promised in the v1 unlock copy; shipping it free is the promise kept. |
| Seasonal flavor drops | Free updates | Never a subscription; see 4.5. |

---

## 4. StoreKit 2 setup

### 4.1 Product identifiers

IDs cannot change after creation and the name is not final, so they use in-world names: `<bundle-prefix>.station.fullcrew` (reference name "Full Crew (one-time unlock)", display name "Full Crew"); reserved, not created at v1: `<bundle-prefix>.station.seasontwo` and `<bundle-prefix>.station.trial7` ("7-day Trial"). Create the App Store Connect record only after the name knock-out search, because the bundle ID is fixed at first upload.

### 4.2 Product type

Non-Consumable: "A product that is purchased once and does not expire or decrease with use" (https://developer.apple.com/help/app-store-connect/reference/in-app-purchase-types/). The only type that matches the sentence on the paywall.

### 4.3 Family Sharing: on, from day one

"Family Sharing is a feature supported only by apps that offer auto-renewable subscriptions and non-consumable In-App Purchases", a shared purchase "will be able to be shared by up to six family members", and "once you turn on Family Sharing for an In-App Purchases in App Store Connect, you can't turn it off" (https://www.developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/turn-on-family-sharing-for-in-app-purchases), because "customers may have based their purchasing decision on this functionality" (https://developer.apple.com/videos/play/tech-talks/110345/). The decision is made now, and it is yes: the product is one purchase per household by design, so sharing costs almost nothing; a partner's phone showing the paywall after the family paid is the Heads Up! one-star review; and "works for your whole family" is one more honest sentence. `Transaction.ownershipType` distinguishes `.purchased` from `.familyShared` and both grant Full Crew; when a member leaves the group the transaction is revoked, and "you should check for the presence of the revocationDate property. This tells you this transaction has been revoked" (same Tech Talk).

### 4.4 Restore purchases and receipt handling on device

No server; no receipt ever leaves the phone. At cold launch, iterate `Transaction.currentEntitlements`, accept only `.verified` results (StoreKit's on-device JWS check) with `revocationDate == nil`, and set a local flag. Keep a `Transaction.updates` listener alive for the app's lifetime so refunds, family revocations and purchases from another device arrive without a restart. Cache the flag in SwiftData: at 6:58 a.m. in airplane mode the launch must start, so the app trusts the cache and re-checks when StoreKit is reachable; a launch is never blocked on a network call. "Restore Purchases" in Settings > Full Crew calls `AppStore.sync()`, the documented fix for a stale cache (https://developer.apple.com/forums/thread/823454); success is quiet, failure is specific ("No purchase found for this Apple Account. Bought it on a different account? Switch and try again."). On revocation, downgrade at the next idle moment, never mid-launch, and delete nothing; history beyond the free window becomes read-only.

### 4.5 How seasonal drops stay free

A drop is an app update carrying new stems and a section map, never a product. Audio ships in the bundle, or through Managed Background Assets if the bundle grows (On-Demand Resources are deprecated, https://www.mobilemarketingreads.com/wwdc-2026-apple-brings-major-changes-to-app-store-marketing-monetization-and-safety/). Entitlement is the single `fullcrew` flag: a seasonal flavor joins the paid set, and the parts that touch everyone (station ID, Farrago's forecast, Scrub's weather) ship to the free tier so the world stays visibly alive for non-payers. No consumable, no code, no "season pass". Each drop's What's New: "Free for everyone with Full Crew, as promised."

### 4.6 A later Season Two without breaking "no subscription"

Season Two, if sold, is a second non-consumable bought once. Nothing in Full Crew moves behind it, including every earlier seasonal drop and household sharing. "Season" refers to the show, not a billing period, and the paywall says so: "Season Two is a second one-time purchase. Full Crew stays yours." Two one-time prices on one screen, nothing else. 3.1.1 is satisfied because both are ordinary IAPs; 3.1.2(a) is honored by construction.

---

## 5. The paywall

### 5.1 Exact copy

```
FULL CREW

One purchase. No ads. No subscription. No streaks.

Everything the station has, for good:
• All six launch flavors and all five lengths, 8 to 20 minutes, arranged fresh every morning
• Crew patches, walk-up cues and the Stem Roll Call
• The whole Request Line library
• End Credits, the shareable card and the clothesline widget
• Ninety days of mission log and the Sunday Flight Review
• The weekend lounge and Hangar StandBy
• Household sharing over iCloud, when it ships

Seasonal flavors are free updates. There is nothing else to buy.

[ Unlock Full Crew · {localized price} ]

Restore Purchases          Not now

Shares with your Family Sharing group.
Augustine Pell, Flight Director: "That is the entire procedure. There is no step two."
```

The price is StoreKit's `displayPrice`, never hardcoded. "Not now" has the same weight as Restore. No countdown, no "limited offer", no strike-through, no "most popular" badge.

### 5.2 What it shows

Above the copy: the annotated score with the locked flavors in colour, the free flavor marked "yours already", and one button, "Hear 15 seconds of the marching band", playing a bar-aligned excerpt. The preview is the argument; the copy is the receipt.

### 5.3 When it appears

When the user taps a locked thing (a flavor, a duration, a Request Line song outside the free three, a walk-up cue, the End Credits share button, the Sunday Flight Review, the lounge); once, after the first complete week, as the last card of the Sunday Flight Review ("The crew would like to mention that there is more crew."); and from Settings > Full Crew.

### 5.4 When it never appears

Never during a launch, a Re-entry, a Request Line song or the Test Fire: the audio engine owns the screen from first bar to last, and modals are not permitted while a track plays. Never on first open, inside onboarding, or before the first morning has run. Never within twelve hours of a Scrub. Never from a notification, widget, Live Activity or Lock Screen. Never as a timed pop-up, and never more than once a day except by the user's own tap on a locked item.

---

## 6. App Store listing, ready to paste

Limits: name 2 to 30 characters, subtitle 30, promotional text 170, description 4,000, keywords 100 bytes (https://developer.apple.com/help/app-store-connect/reference/app-information/). Guideline 2.3.7 repeats the 30-character limit and bans trademarked terms and popular app names in metadata.

### 6.1 Name candidates

All WINNER.md candidates plus three new ones; counts checked by script. "Pronounceable" means a parent can say it across a kitchen and a child can repeat it. No candidate has been checked at the USPTO (the tournament notes lookups were blocked).

| Candidate | Chars | Pronounceable | Trademark or collision concern | Verdict |
|---|---|---|---|---|
| Doorhorn | 8 | Yes | Coined; a web search for a "Doorhorn" app or mark found nothing (not conclusive). Names the signature moment. | Primary |
| Liftoff Choir | 13 | Yes | "Liftoff" is a known ad-tech company name; invites a knock-out hit. | Backup |
| Hornline | 8 | Hears as "hotline" on a speaker | Coined. | Backup |
| Gantry | 6 | Yes | "Gantry - Coolify Manager" already on the store (https://apps.apple.com/us/app/gantry-coolify-manager/id6759326220). | Reject |
| Cul-de-Sac Mission Control | 26 | Long | Original; no room for a descriptor. | World name, not app name |
| CMC | 3 | Yes | Collides with countless marks; searches for nothing. | Reject |
| Mission Cul-de-Sac | 18 | Yes | Original; Alarmy owns "mission" in App Store search. | Backup |
| Go Horns | 8 | Yes | Reads as a college-sports chant; slogan marks are heavily enforced. | Reject |
| T-Minus Kitchen | 15 | Yes | Descriptive; many "T-Minus" apps; weak mark. | Reject |
| Scrub & Go | 10 | Yes | Ampersand is bad in URLs; "Scrub" reads as cleaning; a TV title starts with the word. | Reject |
| Shoes and Door | 14 | Yes | No brand words; says nothing about music. | Backup or preview tagline |
| Splashdown | 10 | Yes | Generic, likely used by games; Bunny's in-world word for bedtime. | Reject |
| Horns Mean Shoes (new) | 16 | Yes | Coined phrase; explains the product in three words. | Backup and slogan |
| Liftoff Kitchen (new) | 15 | Yes | Same "Liftoff" concern, plus generic. | Reject |
| Pell & Marchetti (new) | 16 | Moderate; sounds like a law firm, which is the joke | Coined from the cast; names must be grepped against real public figures first. | Backup |

Before any asset is drawn: USPTO Trademark Center knock-outs in Classes 9, 41 and 42 for the primary and two backups; App Store Connect availability in every localization ("app names are based on language localization, not geographic territory", https://www.apple.com/legal/intellectual-property/dispute-forms/app-store/app-name-dispute.html); domain check; intent-to-use filing. WINNER.md's three banned franchise words and every show or film name stay out of the name, subtitle, keywords and IAP names.

### 6.2 Subtitle (30 characters)

Built on "No clock. The job ends when the song ends." (43 characters, too long). Primary: `No clock. Song ends, job ends.` (30). Alternate: `No clock. The song is the plan` (30). Fallback if "No clock" is read as an unverifiable claim: `The morning runs on a song` (26).

### 6.3 Promotional text (170 characters)

`A deadpan mission-control comedy runs your morning launch and bedtime re-entry on original songs. One phone, one speaker, no accounts. One purchase, no subscription.` (165). It changes without a build; seasonal drops rotate the first clause.

### 6.4 Full description (3,992 characters)

Leads with original music, the manifest, the crew and household mode. "Timer" and "alarm" appear nowhere in it.

```
Doorhorn is a piece of original music that runs your morning. At T-minus twelve a flight director calls the launch. Verse one is wake and wash. The first key change is get dressed. The bridge is the manifest, sung. And when the horns come in, shoes go on and the door opens. Nobody watches a screen, and nobody has to say it twice.

The manifest is yours, and it has a memory. Type tonight whatever has to leave the house tomorrow, and Gus the janitor sings it in the middle of the track: lunchbox, library book, the good water bottle, keys last seen kitchen counter. One line can be a Hold: the thing you keep not doing. It ages one day at a time and gets sung with total neutrality ("dentist call, day 23, still on the manifest") until you clear it or declare it dead of natural causes.

HOUSEHOLD MODE
Everyone in the house gets a crew patch, a color, a five-second walk-up cue and one stem of the launch track. During the bridge, tap your patch and your stem punches in on the next bar. At T-0 every stem plays together for the first time. Silence is audible; showing up completes the song. It works on one phone passed around the kitchen, or on a HomePod or any speaker over AirPlay. No accounts, no sync, nothing for anyone else to install. Living alone? You are automatically Pilot, Ground Crew and audience.

THE REQUEST LINE, ALL DAY
Songs exactly as long as the boring waits, with the cues sung in: two minutes of teeth with the quadrant switches in the lyrics, ninety seconds of microwave, three minutes of kettle, a five-minute shower with a rinse bridge. Start one from a widget, a Shortcut, the Action button or an NFC tag. Fully offline.

RE-ENTRY, EVERY NIGHT
Bunny Kowalczyk, late-night countdown announcer, runs the same phases in reverse over twenty minutes of music that slows toward bed: tidy, teeth, book, lights. The last bar is a buzzer and the house goes dark. Then the End Credits roll: sixty seconds of sung credits built from what actually happened today, with top billing to whoever carried it. The card hangs on a clothesline widget, so the week is visible without opening the app.

BAD MORNINGS ARE WEATHER
Press Scrub. A toddler-sized abort robot declares "weather" as the official reason, the day is logged without penalty, and tomorrow offers a shorter track. There are no streaks. The mission log keeps a rolling rating (on time 42 of 50 launches) that dips but never resets, and yesterday is always editable.

THE CREW
Cul-de-Sac Mission Control lost its rockets in a budget cut and now runs one launch a day: yours. Augustine Pell, Flight Director, has never raised her voice. Gus Marchetti, Janitor, is the only person who knows where anything is. Dr. Ines Farrago forecasts catastrophe every morning and has been wrong since 1998. Lionel Abara, CAPCOM, says "copy." Scrub has one big button. Their nemesis is the Department of Five More Minutes and its Board of Snooze Appeals. Everyone in the building is incompetent except the janitor.

WHAT YOU PAY FOR
Free, and complete in itself: one launch flavor at 10 and 12 minutes, one Re-entry track, the manifest with memory and a Hold item, Scrub and the mission log, the Test Fire, and three Request Line songs (teeth, microwave, kettle).
One purchase, Full Crew, unlocks everything else for good: all six flavors and all five lengths, crew patches with walk-up cues and the Stem Roll Call, the whole Request Line library, End Credits with the shareable card and widget, ninety days of mission log and the Sunday Flight Review, the weekend lounge and Hangar StandBy mode, and household sharing over iCloud when it ships.
No ads. No subscription. No accounts. No streaks. Seasonal flavors are free updates.

PRIVACY
Nothing leaves your phone. No analytics, no accounts, no tracking. Every lyric and every line was written by a person; the songs were produced from those lyrics with Suno.

Requires iOS 26 or later. Works with any AirPlay or Bluetooth speaker. Best heard from a kitchen counter at 6:58 a.m.
```

The Suno sentence is deliberate: WINNER.md requires plain disclosure, and saying it in the listing pre-empts the review that would otherwise "discover" it. No price is stated because prices vary by storefront and 2.3.7 discourages pricing in metadata.

### 6.5 Keyword field (100 bytes)

`morning,routine,bedtime,kids,family,household,music,songs,getting ready,school,roommates,launch` (95 bytes). No trademarks, no competitor names, no "timer", "alarm" or "countdown"; words already in the name and subtitle are not repeated. "ADHD" is deliberately absent (section 14).

### 6.6 Categories

Primary: Lifestyle. The 4.3(b) comparison set (Routinery, Brili, ReadySet, Prep Pal) lives in Productivity and Health & Fitness; Lifestyle is where household products sit, and it stays off the Games shelf that iOS 27 Time Allowances let parents cap by category (https://www.mobilemarketingreads.com/wwdc-2026-apple-brings-major-changes-to-app-store-marketing-monetization-and-safety/). WINNER.md allows Productivity if Lifestyle featuring proves thin. Secondary: Entertainment, for the cast and the music. Not Music, never Kids (extra obligations and the children's-timer shelf), never Games.

### 6.7 Age rating questionnaire

Apple's 2025 overhaul added 13+, 16+ and 18+ to 4+ and 9+ and added required questions on in-app controls, capabilities, medical or wellness topics and violent themes (https://developer.apple.com/news/?id=ks775ehf); 12+ and 17+ were removed (https://www.macrumors.com/2025/07/25/apple-overhauls-app-store-age-ratings/). Honest answers, all "None" or "No": cartoon or fantasy violence (Scrub is a robot with a button); realistic violence; profanity or crude humor (none in any lyric or cue); mature or suggestive themes; horror or fear (Farrago's forecasts are comic weather); medical or treatment information and wellness topics (not marketed as ADHD treatment); alcohol, tobacco or drugs; sexual content; gambling or contests; unrestricted web access; user-generated content shared with others (manifest text stays on device; the credits card is exported by the user through the share sheet); in-app parental controls (not applicable); messaging, social or loot-box capabilities; violent themes. Expected result: 4+. A regional 9+ is acceptable; anything higher means a script line has drifted.

### 6.8 Privacy nutrition label

Data Not Collected. Apple defines "collect" as "transmitting data off the device in a way that allows you and/or your third-party partners to access it for a period longer than what is necessary to service the transmitted request in real time" (https://developer.apple.com/app-store/app-privacy-details/). Doorhorn transmits nothing: no analytics or crash SDK (Apple's own crash reports reach Xcode through Apple's consent flow), no accounts, no server, no ads. The one-page privacy policy required by 5.1.1(i) says exactly that, linked from the listing and from About. The label is re-evaluated before the CloudKit household-sharing update ships.

### 6.9 Notes for Review

```
Thank you for reviewing. A few things that will make this faster.

WHAT THIS IS. A piece of original music with an authored section map: every track ships with a JSON map of phase timestamps (wake, dress, manifest, door), role-cue markers and the horn entry that means "shoes and door". The music is the schedule; there are no countdown digits anywhere except the parent's Live Activity. The first screen shows this map as an annotated score.

WHY IT IS MEANINGFULLY DIFFERENT (Guideline 4.3(b)). We know simple timers are a saturated category. Four things here do not exist in routine or timer apps: (1) the section map, which maps song sections to phases and cues; (2) the Stem Roll Call, where each household member owns one stem of the track and tapping their patch punches it in on the next bar, so the full arrangement is only heard when everyone has shown up; (3) the in-song manifest, where the household's own list is sung mid-track by a character, with memory ("keys last seen kitchen counter"); (4) the End Credits, a sung credits sequence built each night from the day's real manifest. To see all four in under two minutes: open the app, tap "Test fire (60 seconds)", then in Settings tap "Demo tonight's Re-entry".

PURCHASE. One non-consumable in-app purchase, "Full Crew", with Family Sharing on. The paywall is reachable from Settings > Full Crew or by tapping any locked tile. Sandbox works without an account; there is no login anywhere.

BACKGROUND AUDIO (2.5.4). The audio background mode is used only while a track is actually playing (the launch, Re-entry, or a Request Line song, all started or scheduled by the user). Playback stops at the last bar and the session ends.

SCHEDULED START AND LIVE ACTIVITIES. The morning start uses AlarmKit with a 30-second station-ID sound and the system Stop button; the full track plays only in the app. The Live Activity shows countdown, phase and role only, and carries no promotion.

PRIVACY. No data is collected, no third-party SDKs, no network calls except StoreKit. Label: Data Not Collected.

CONTENT. All characters, names, lyrics, scripts and section maps are original and written by the developer; no third-party intellectual property, no real agency insignia, no real people. Audio was produced from those lyrics with a licensed music-generation service under its commercial terms; unmodified originals and licence records are archived and can be provided.

AGE RATING. 4+. No profanity, violence or wellness claims in any lyric or cue.

Contact: <support email>; replies within one business day during review.
```

---

## 7. Review-guideline risk table

Guideline text quoted from https://developer.apple.com/app-store/review/guidelines/ (fetched 24 September 2026).

| Guideline | Text (verbatim, abridged) | Risk | Mitigation | Additional source |
|---|---|---|---|---|
| 4.3(b) saturated categories | "Certain kinds of apps, such as dating, flashlight, sound effects, wallpaper, simple timers, and fortune telling, are well established on the App Store and we will not accept new submissions unless they offer a meaningfully different or improved experience ... We may remove these apps ... if they are not updated, improved, or do not attract customers." | Filed as a routine timer next to Routinery, Brili, ReadySet and Prep Pal; later removed as stale. | Annotated score is screen one and screenshot one; metadata never says timer or alarm; Notes for Review name the section map, Stem Roll Call, in-song manifest and End Credits; Lifestyle primary; a seasonal update every quarter. | https://www.macrumors.com/2026/06/09/app-store-guidelines-low-quality-apps/ |
| 5.2.1 third-party IP | "Don't use protected third-party material such as trademarks, copyrighted works, or patented ideas in your app without permission, and don't include misleading, false, or copycat representations, names, or metadata." | A silhouette, voice or cue resembles a known show, agency or weatherman; a Content Dispute gets the app removed on an "unresolved" flag. | Original cast and invented bureaucracy; no real agencies or insignia; Suno prompts by genre only, never "in the style of"; silhouettes checked against known characters; an originality dossier ready for App Review Information. | https://www.apple.com/legal/intellectual-property/dispute-forms/app-store/ |
| 2.3.7 names and keywords | "Choose a unique app name, assign keywords that accurately describe your app, and don't try to pack any of your metadata with trademarked terms, popular app names, pricing information ... App names must be limited to 30 characters ... subtitles ... should not ... reference other apps, or make unverifiable product claims." | Name collides with a mark; a keyword names a competitor; the subtitle reads as a claim. | Knock-out search before naming; no brand, competitor or franchise word in keywords; subtitle fallback ready; no price in metadata. | |
| 4.1(c) icons and names | "You cannot use another developer's icon, brand, or product name in your app's icon or name, without approval from the developer." | Icon or name echoes another app (Gantry is the live example). | Coined name; an in-house flat cutout icon of the launch tower, tested in tinted and clear modes; nothing from stock art. | https://developer.apple.com/news/?id=ey6d8onl |
| 2.5.4 background audio | "Multitasking apps may only use background services for their intended purposes: VoIP, audio playback, location, task completion, local notifications, etc." | Audio mode read as a way to keep a timer alive. | Background audio only while a track plays; session ends at the last bar; quiet mode still plays real audio; Live Activity driven by playback position; stated in Notes for Review. | |
| 5.1.1 data collection | "(i) All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app ... (ii) Apps that collect user or usage data must secure user consent ... (v) If your app doesn't include significant account-based features, let people use it without a login." | Missing policy link; a future SDK quietly collects; the CloudKit share changes the label. | One-page policy linked in metadata and About; no SDKs; no login; label re-evaluated before the sharing update. | https://developer.apple.com/app-store/app-privacy-details/ |
| 3.1.1 in-app purchase | "If you want to unlock features or functionality within your app ... you must use in-app purchase. Apps may not use their own mechanisms to unlock content ... Non-subscription apps may offer a free time-based trial period ... by setting up a Non-Consumable IAP item at Price Tier 0 that follows the naming convention: 'XX-day Trial.'" | Any unlock outside StoreKit is a rejection; a trial must follow the naming rule. | Only StoreKit products; App Store promo codes for press, never in-app codes; a Restore button; any trial is "7-day Trial" at tier 0 and states duration and what ends. | |

---

## 8. Screenshots and App Preview

### 8.1 Screenshot captions (ten)

Order follows the visual document's storyboard, annotated score first. Headline over the frame, sub-line where needed.

1. Annotated score, phase bands WAKE / DRESS / MANIFEST / DOOR, horn marker. "The song is the schedule." / "When the horns come in, shoes go on."
2. Test Fire in progress with Augustine's line. "Test fire: 60 seconds." / "T-minus one. Launch window open."
3. Manifest bridge with Gus's sung line as lyric text. "Your list, sung mid-song." / "Keys last seen kitchen counter."
4. Crew patches in four colours, one stem pending. "Tap your patch. Your stem punches in." / "At T-0 everyone plays together."
5. Lock Screen and StandBy cutout countdown with phase name. "One phone on the counter." / "Nobody else looks at a screen."
6. Request Line tiles: Teeth 2:00, Microwave 1:30, Kettle 3:00, Shower 5:00. "Songs exactly as long as the wait." / "Cues sung in. Fully offline."
7. Scrub's weather report and the mission log rating. "Bad mornings are weather." / "On time 42 of 50. No streaks to lose."
8. Re-entry at the final bar, house going dark. "Bedtime runs the phases in reverse." / "Tidy, teeth, book, lights, buzzer."
9. End Credits card on the clothesline widget. "Tonight's credits, from today's real list." / "Top billing: whoever carried it."
10. The paywall. "One purchase. No ads. No subscription. No streaks." / "Seasonal flavors are free updates."

### 8.2 App Preview script (30 seconds)

Previews run 15 to 30 seconds, up to three per listing (https://developer.apple.com/help/app-store-connect/reference/app-preview-specifications). They autoplay muted, so every beat carries a caption; the mix is still mastered for people who tap for sound. Footage is captured from the app.

| Time | Picture | Audio | Caption |
|---|---|---|---|
| 0:00-0:03 | Annotated score fills the frame; playhead starts at WAKE. | Station ID sting, first bars. | "The song is the schedule." |
| 0:03-0:08 | Lock Screen countdown on a phone on a counter; indigo sky. | Augustine: "T-minus twelve. Launch window open." | "Nobody looks at a screen." |
| 0:08-0:14 | Manifest bridge; lyric lines appear as Gus sings; gold sky. | Gus: "Lunchbox, library book, the good water bottle, keys last seen kitchen counter." | "Your list, sung." |
| 0:14-0:19 | Four patches; three taps, three stems join; the fourth waits, then taps. | Drums, bass, brass, then choir lands on the bar. | "Tap your patch. Your stem joins." |
| 0:19-0:23 | Final chorus; horn marker lights; door tap; white flash. | Horns, then the liftoff fanfare. | "Horns mean shoes. Door." |
| 0:23-0:27 | Dusk purple: Re-entry's last bar, house dark, credits card slides onto the clothesline. | Buzzer, two bars of sung credits. | "Every night: sung credits from the real day." |
| 0:27-0:30 | The promise card on the score's colours. | Final chord. | "One purchase. No ads. No subscription. No streaks." |

---

## 9. Launch plan

### 9.1 TestFlight cohorts

TestFlight allows up to 10,000 external and 100 internal testers, public links, screenshot feedback and crash reports (https://developer.apple.com/testflight/); a build becomes unavailable after 90 days (https://www.developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview), so a fresh build ships at least monthly.

| Cohort | Size | Recruited from | What it must prove |
|---|---|---|---|
| Families with school-age children | 25 households | Parent friends, one school's parent list, one ADHD-parent community with moderator permission | The launch replaces the human clock; pass-the-phone Roll Call works; kids do not need the screen; the 4+ tone holds. Four weeks. |
| Couples | 15 | Personal network, one newsletter reader ask | The reluctant partner joins for the walk-up cue; End Credits read as a joke, never a scoreboard. Four weeks. |
| Roommates | 10 flats | Two university housing groups, one roommate community with permission | Different departure windows; the Request Line used by people who never run a launch; the shared-speaker question. Three weeks. |
| Solo commuters | 30 | Public TestFlight link in iOS communities, Mastodon, Bluesky | Daily use by one person with zero new time; no family-shelf feel. Three weeks. |
| Shift workers | 10 | Nurse and hospitality contacts, one shift-work forum with permission | Launches at odd hours; Re-entry at 9 a.m.; the no-launch lounge on days off; AlarmKit across Focus modes. Three weeks. |

Families and shift workers can kill the schedule: if the launch does not start reliably on a HomePod at the set time, nothing else matters.

### 9.2 What to measure without analytics

Measurement is what people choose to tell you and what Apple already provides: TestFlight's crash reports and screenshot feedback; an exported Flight Review (a Settings button that composes an email with the last fourteen days of the log as plain text, which the tester sees in full and sends or does not); three weekly questions by email ("Did the launch start by itself?", "Did anyone look at the phone during it?", "What did you skip?") plus "What did the crew say that you repeated to someone?"; one watched real morning per cohort in week two, counting the instructions an adult speaks that the song already sang; and one purchase-intent question at the end ("If this cost $9.99 once, would you buy it, and what would you expect in it?"). After launch: App Store Connect's own App Analytics (impressions, page views, downloads, conversion, proceeds, Apple's opt-in usage aggregates, no SDK required) and the reviews.

### 9.3 Soft launch storefronts

Canada, Australia, New Zealand and Ireland first: English-speaking, small enough to contain a review problem, similar buying behaviour to the US. Three to four weeks answering three questions: is download-to-paid inside the 4-8% band assumed in section 10; is the refund rate under 2%; do reviews mention the music unprompted. Test $8.99 against $9.99 by storefront, set the world price, then open the US, UK and every other storefront together.

### 9.4 Press and community targets, and the etiquette

Press pitch: one paragraph, a private TestFlight link, the 30-second preview, an App Store promo code, a plain offer of a 15-minute call, no embargo games. Apple-platform press: MacStories and its AppStories podcast, 9to5Mac, Cult of Mac, AppAdvice, iMore, Six Colors, The Sweet Setup, with "the first app where the music is the schedule" and the on-device stem engine as the developer-interest angle. Parenting and home press: Fatherly, Cool Mom Tech, Romper, The Everymom, Apartment Therapy (roommates and couples), The Kitchn, with "stop being the human clock" backed by the mental-load study (mothers carry 71% of household mental-load tasks versus 45% for fathers, https://www.bath.ac.uk/announcements/mothers-bear-the-brunt-of-the-mental-load-managing-7-in-10-household-tasks/). Podcasts by pitch: Mac Power Users, Upgrade, Connected, and the ADHD shows whose hosts recommend Brili (the tournament hunt notes How to ADHD does), offering a tester build, not a mention. Apple: a Featuring Nomination in App Store Connect four weeks before launch with the seasonal calendar, and Creative Assets so the page changes without a build (https://appleworld.today/2026/06/wwdc-26-apple-announces-expanded-app-store-capabilities-for-developers/).

Communities where routine apps are actually discussed (their written rules were not verified here; read them and message the moderators before the first post): parenting (r/Parenting, r/daddit, r/Mommit, r/toddlers, autism- and ADHD-parenting communities; school Facebook groups only by personal invitation); ADHD and executive function (r/ADHD, r/adhdwomen, r/ADHD_Programmers, where Routinery and Brili get recommended and "I am the human clock" is said out loud); households (roommate communities, r/CleaningTips, r/declutter); Apple platform (r/apple, r/iphone, r/ios, r/HomePod for the speaker question, r/shortcuts for the Request Line via Shortcuts, Action button and NFC, r/iOSProgramming and Hacker News "Show HN" for the engineering story of bar-quantized taps, stems arranged on device and zero server); iOS developer and design communities on Mastodon and Bluesky; one official TikTok account showing the crew and the music (Finch grew on organic video, https://blog.sparrowapps.io/p/finch-how-a-self-care-app-hit-30m-arr-without-vc-money).

Etiquette, without exception: read the self-promotion rule and obey it; ask the moderators first and accept a no; post as a person telling a story ("I built this because I was the human clock") in threads where someone asks for exactly this, never as a launch broadcast; disclose that you are the developer every time; answer questions as long as the thread lives; never ask for reviews or ratings; never hand out codes without moderator approval; never use a second account; never name a competitor in a comparison. Where a weekly self-promotion thread exists, that is the only place a link goes.

### 9.5 Product Hunt

Tuesday or Wednesday at 12:01 a.m. Pacific; self-launch, no paid hunter. Gallery: the 30-second preview first, the annotated score as thumbnail, five stills matching screenshots 1, 3, 4, 9 and 10, and a maker's first comment telling the human-clock story in six sentences with the free/paid boundary stated plainly. Tagline: "The song is the schedule. One purchase, no subscription." Reply to every comment for 24 hours; pricing answers are plain. A limited batch of App Store promo codes for commenters who ask, issued from App Store Connect, never an in-app code (3.1.1). It is a press day, not a sales day; the metric is press replies the following week.

### 9.6 The first 90 days

Days 1-7: global release with the soft-launch storefronts already open; press emails with codes on day 1; Product Hunt day 2 or 3; Show HN day 4; community threads and every review answered daily. Days 8-30: 1.0.1 with the top three complaints; Featuring Nomination for the December drop; the first shared End Credits screenshots collected and, with permission, two used on the product page. Days 31-60: v1.1 (full Request Line, End Credits card) per WINNER.md's phasing, which also answers any 4.3(b) "not updated" concern; a second press round to parenting and ADHD press; first metadata localization. Days 61-90: the December drop as a free update with new Creative Assets; a written review against section 10 and a decision on the 7-day Trial experiment. Cash flow: Apple pays once per fiscal month, roughly 33-45 days after the month closes, $10 minimum for USD accounts (https://leus.capital/blog/apple-payout-guide-2026-how-to-accelerate-your-studios-cash-flow), so launch-month revenue arrives around day 60.

---

## 10. Revenue scenarios

Fixed inputs: price $9.99; commission 15%; net per sale $9.99 × 0.85 = $8.49; refund allowance 2% of sales. Conversion means downloads to Full Crew purchases in year one. Benchmarks: RevenueCat's freemium median is 2.1% download-to-paid at day 35 and hard paywalls reach 10.7% (https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026); Health & Fitness sits at 2.9% (https://www.revenuecat.com/state-of-subscription-apps-2026-gaming). A soft paywall on a strong free tier with a one-time price is assumed to land between those, at 4-8%. Impression-to-download rates are assumptions, shown so App Store Connect's counts can be read against them from week one.

| Case | Impressions (year one) | Impression to download | Downloads | Conversion | Purchases | Gross (× $8.49) | 2% refunds | Net |
|---|---|---|---|---|---|---|---|---|
| Quiet | 125,000 (about 340/day) | 4% | 5,000 | 4% | 200 | $1,698 | $34 | about $1,660 |
| Solid | 800,000 (about 2,200/day) | 5% | 40,000 | 6% | 2,400 | $20,376 | $408 | about $19,970 |
| Breakout | 4,170,000 (about 11,400/day) | 6% | 250,000 | 8% | 20,000 | $169,800 | $3,396 | about $166,400 |

Arithmetic for the solid case: 800,000 × 0.05 = 40,000 downloads; 40,000 × 0.06 = 2,400 purchases; 2,400 × $8.49 = $20,376; refunds 48 × $8.49 = $408; net $19,968.

Quiet is ASO alone without featuring; it covers Suno Premier ($24/month, $192/year, https://suno.com/pricing) and little else, and it is the base case: only 17.3% of new apps reach $1K MRR within two years (https://www.revenuecat.com/state-of-subscription-apps). Solid assumes one Apple-platform press feature and a few End Credits cards travelling on social media; it funds the year-one human re-recording of the station ID, fanfare and launch melody. Breakout assumes App Store featuring plus a video that travels the way Finch's did; it stays under the $1M threshold, so 15% holds. Premium mobile revenue decays fast after launch (Balatro fell from a $200K daily peak to about $35K a month a year later, monetization digest), so the breakout year is front-loaded and the seasonal cadence exists to slow the decay. Season Two, localization and any Mac or iPad version are excluded.

---

## 11. Localization plan

What localizes cheaply: UI strings, metadata (name kept; subtitle, promotional text, description, keywords), screenshot captions, the spoken-cue transcripts on the Live Activity and StandBy, the privacy policy and the FAQ. What does not: anything sung. Manifest lines are pre-generated per line in one voice lane, the teeth song carries its cues in the lyrics, the End Credits are a template song with modular sung lines; each needs new lyrics written by the developer in the target language, regenerated audio on the licensed Suno line, re-split stems and re-authored section maps because sung phrases change length. The comedy register does not translate either.

Launch: English only, the same English metadata on every storefront. Within 90 days: metadata and UI localization, no audio, for German, French, Spanish (Spain and Latin America), Dutch and Portuguese (Brazil), storefronts with high English comprehension or large bilingual households, where the Request Line's variety carries the habit even with English lyrics; the localized description states that the songs are sung in English. Deferred: Japanese, Korean and Chinese, where both the songs and the register need full re-authoring. The first sung localization, if any: Spanish, serving US bilingual households, Spain and Latin America with one authoring effort, shipped as a free update inside Full Crew, decided at the 90-day review on Spanish-storefront downloads. Keyword fields in every language are written by a person and re-checked for brand and competitor words (2.3.7 applies in every localization).

---

## 12. Support and refunds

### 12.1 The support email flow

One address, in the listing and in About, plus an in-app Contact button that composes a mail with app version, iOS version and device model pre-filled in the body where the person can see and delete them; nothing is attached automatically. An auto-reply within minutes carries the FAQ link, the refund path and "a person replies within two business days; if a launch did not start, say which speaker and which time." A personal reply from the developer within two business days, every time. Bug reports come with the exported Flight Review if the person chooses to send it. Any question asked three times goes into the FAQ and, where possible, into the app.

### 12.2 The refund stance

Apple decides refunds. A customer asks at reportaproblem.apple.com; "If Apple approves your request" the money returns, Apple says to "Wait 24 to 48 hours for an update on your request", and "Refund eligibility might vary by country or region" (https://support.apple.com/en-us/118223). The app puts the StoreKit refund sheet in Settings > Full Crew ("Request a refund from Apple") using `beginRefundRequest`, which Apple describes as letting you "provide the same functionality without having to redirect customers and provide assistance within the app" (https://developer.apple.com/videos/play/tech-talks/10887/). The developer never argues: anyone who emails for a refund gets the steps and a note that their manifest and log are safe. On revocation the app returns to the free tier at the next idle moment and keeps every byte. The refund rate is watched against a 2% ceiling; above it, the paywall is overpromising or the free tier is confusing, and the fix is in the product.

### 12.3 FAQ

1. Is there a subscription? No. One purchase, Full Crew, and that is the end of it. Seasonal flavors are free updates. If a Season Two is ever made it will be a second one-time purchase, and Full Crew keeps everything it has.
2. What is free, forever? A real launch every morning at 10 or 12 minutes, a Re-entry track every night, the manifest with memory and a Hold item, Scrub and the mission log, the Test Fire, and three Request Line songs.
3. Does everyone in the house need the app? No. One phone or one speaker runs the launch; patches work pass-the-phone. Nobody else installs anything or makes an account.
4. Can my family share the purchase? Yes. Full Crew supports Family Sharing, so up to six people in your Family Sharing group can use it on their own phones.
5. Does it work on a HomePod or another speaker? Yes, over AirPlay or Bluetooth. The scheduled start plays a 30-second station ID from the phone; the full track plays through the app and your speaker.
6. Does it need the internet or a music subscription? No. Everything is on the phone. No accounts, no music service, no data collected.
7. What happens on a bad morning? Press Scrub. The day is logged as weather, nothing is lost, and tomorrow offers a shorter track. There are no streaks.
8. I bought Full Crew and it says locked. Settings > Full Crew > Restore Purchases. If a family member bought it, check that Purchase Sharing is on in Family Sharing settings. If it still fails, email support with the Apple Account used to buy it.
9. How do I get a refund? Settings > Full Crew > Request a refund from Apple, or reportaproblem.apple.com. Apple decides within a day or two. Your manifest and log stay on your phone either way.
10. Who wrote the songs? Every lyric and line was written by the developer. The recordings were produced from those lyrics with Suno under its commercial terms. The station ID, fanfare and launch melody are being re-recorded with a human musician in the first year.

---

## 13. Roadmap

### 13.1 Seasonal drops (paid-free)

Every drop is a free update inside Full Crew; the seasonal station ID, forecast and Scrub weather ship to the free tier too. Names are invented and avoid any real holiday brand.

| When | Drop | Contents |
|---|---|---|
| Launch (v1) | Six flavors: marching band, surf, disco, big band, bluegrass, lullaby for Re-entry | The v1 set from WINNER.md, five lengths each, arranged on device from stems. |
| December | Snow-Day Lounge | A no-launch lounge track for snow days, a wintry station ID, Farrago finally forecasting snow and being wrong about the amount. |
| March | Clocks-Forward Week | A Scrub weather report for the clock change, a slower 8-minute flavor for the week after, Bunny's "splashdown is an hour earlier" intro. |
| June | Last Day of School | A one-off fanfare for the final launch of the school year and a Summer Lounge for mornings with nowhere to be. |
| September | Marching Band Season | New arrangement variants for the September flavor and a "first day" station ID. |

Between drops, per WINNER.md's phasing: v1.1 adds the full Request Line and the End Credits card; v1.2 adds crew stems and walk-up cues; CloudKit household share ships to Full Crew owners at no charge when ready. Season Two, only if the 90-day review shows demand, is a second one-time purchase: the 5 p.m. Fuel segment (the crew settles dinner from the house menu with one veto, feeding the manifest and the credits), a second launch melody and a new recurring character from the Board of Snooze Appeals. Full Crew loses nothing.

### 13.2 The second app: Dreadlines (renamed)

The runner-up, and the showrunner's first choice, becomes the second product in the same world's sound. Dreadlines is the avoidance-only list: you put on it only the things you keep not doing, and each becomes a monster that ages visibly and affectionately ("my dentist monster is 41 days old"), so the cast is generated from the user's own life without a writer typing a line. The song is the contract: starting the task starts a track and the job ends when the song ends, with Pull It Off's bar-quantized score so every tap lands on a downbeat and Caper's script library so bailing shrinks the job instead of failing it. Doorhorn's single Hold item is the seed; Dreadlines is the whole garden, priced the same way, one purchase, no streaks, with a share line the showrunner called the best sentence in the dossier.

### 13.3 The third product: Split Level (renamed)

Split Level had the best cast and strongest visual identity in the tournament (the lit dollhouse card, the nightly 90-second household sitcom with credits sung from the real task log), and its credits are already grafted into Doorhorn's Re-entry. As a standalone it would be re-scoped away from the morning: a nightly show about the house, the dollhouse as the artifact, Doorhorn's mission log as an optional import. A direction, not a commitment; the authoring load that worried every judge must first be solved by the Suno-and-stems pipeline proven in Doorhorn.

---

## 14. Open questions

1. The name. Every candidate is unverified at the USPTO and Gantry already collides on the store. Knock-out search, App Store Connect availability in every localization and the domain check must finish before the app record is created, because the bundle ID and product IDs are then fixed.
2. Family Sharing is irreversible. This document says on; if the developer disagrees, the decision is made before the first submission.
3. Categories and Time Allowances. Whether a secondary Entertainment category can be capped on a child's device under iOS 27's parental caps is not documented in the digests. If it can, drop the secondary category.
4. "ADHD" in keywords. It would help discovery where Routinery and Brili are recommended, but the new questionnaire asks about medical or wellness topics. The safe answer is to keep it out of metadata and let community threads carry it.
5. The privacy label after CloudKit sharing. Data in the user's own iCloud is not accessible to the developer, but the questionnaire must be re-answered for that update; ship it separately so a label dispute cannot block a seasonal drop.
6. The 7-day Trial. Allowed by 3.1.1; whether it lifts conversion beyond the free tier's own effect is untested and belongs after the 90-day review. A $14.99 test is not planned, because "one purchase" is easier to keep at a price nobody has to think about.
7. Suno terms at submission. Both digests note the December 2025 shift from "you own the songs" to "granted commercial use rights" and unresolved litigation; the live Terms are re-read the week of submission and recorded in the originality dossier.
8. Hardware prices drift. Goally is $295-$395 today against the tournament's $189-$369; any marketing line about hardware must be refreshed on the day it is used.
9. The "Demo tonight's Re-entry" button referenced in Notes for Review is not in the v1 spec; build it (a 60-second Re-entry and credits demo) or rewrite the note.
10. Screenshot order assumes the visual document's storyboard begins with the annotated score and ends with the paywall; if it differs, reorder the captions but never the first one.
