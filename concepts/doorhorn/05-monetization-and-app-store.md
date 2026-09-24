# Doorhorn (working title): Monetization, App Store Listing and Launch Plan

Doorhorn is sold once, as a $9.99 non-consumable unlock under the App Store Small Business Program, on top of a free tier that is complete enough to prove the product on the first morning, with no ads, no subscription, no accounts and no streaks. This document fixes the price and its evidence, the free/paid boundary, the StoreKit 2 setup, the paywall, a paste-ready App Store listing written to survive a guideline 4.3(b) comparison with routine timers, the review-risk table, screenshots and preview, the launch plan, revenue scenarios, localization, support, the roadmap and the open questions.

Document date: 24 September 2026. Source of truth for scope and phasing: `concepts/tournament/WINNER.md`. Wherever "Doorhorn" appears in listing copy it is a placeholder for the final name (see section 6).

---

## 1. Summary

The business model is the one the product's own promise dictates: free to download, a genuinely useful free layer, one purchase called Full Crew, and seasonal content shipped as free updates for as long as the app is maintained. Everything below exists to make that promise cheap to keep and hard for a reviewer, a competitor or a customer to misread.

---

## 2. Pricing model and rationale

### 2.1 The model: free download, one-time unlock

Doorhorn is free to download. The free tier is not a trial: it runs a real launch every morning and a real Re-entry every night, forever. One non-consumable in-app purchase, Full Crew, at USD 9.99, unlocks everything else. There is no subscription, no consumable, no ad tier and no second purchase inside the app at v1.

The evidence for this shape, all from the monetization digest:

- Paid-upfront apps get almost no installs in 2025-26: one developer reported six downloads in the first week, another moved from subscription-with-trial to one-time and "got daily sales, more downloads" (r/iOSProgramming, Aug 2025, https://www.reddit.com/r/iOSProgramming/comments/1n23m6g/try_before_you_buy_subscription_or_simply_buy_to/).
- The developer consensus is "Simple offline app with no maintenance = single lifetime IAP; any app with backend service and regular maintenance = subscription" (r/iOSProgramming, July 2025, https://www.reddit.com/r/iOSProgramming/comments/1lpkpsz/is_the_subscriptions_based_revenue_still_the_best/). Doorhorn has no server, no sync at v1 and no runtime AI, so it falls squarely on the one-time side.
- A developer of four utility apps estimates $251 per 1,000 downloads for one-time IAPs against $152 for subscriptions after Apple's cut, and targets refunds under 2% (https://dev.to/snake_sun/why-i-picked-one-time-iap-over-subscription-for-4-indie-ios-apps-storekit-2-2026-data-1nk6).
- Where both are offered, developers see 4:1 one-time to subscription by count or 50/50 by revenue (same Reddit threads above), and "lifetime" wording triggers sticker shock (https://www.reddit.com/r/iOSProgramming/comments/1l4j5ra/lifetime_vs_annual_free_trial_vs_no_trial/). The paywall therefore says "one purchase", never "lifetime".
- Five-star reviews of paid indie apps repeat the same three phrases: one-time purchase, no ads, no subscription (Streaks, https://apps.apple.com/us/app/streaks/id963034692; Things 3, https://apps.apple.com/us/app/things-3/id904237743). Those phrases are the paywall.
- Over half of all conversions happen on day 0 (RevenueCat State of Subscription Apps 2026, https://www.revenuecat.com/state-of-subscription-apps), which is why the Test Fire and the first morning must carry the whole "this is my new daily thing" feeling before the paywall is ever seen.

### 2.2 The price point: $9.99

$9.99 is the proven premium-mobile price for a finished, self-contained thing: Balatro ($9.99, no IAP, about $1M in its first mobile week, https://www.pocketgamer.biz/balatro-nears-44m-on-mobile-amid-a-sudden-spending-surge/), Things 3 on iPhone ($9.99, https://apps.apple.com/us/app/things-3/id904237743), DREDGE ($9.99, https://www.mobilemarketingreads.com/the-15-best-paid-ios-games/). Streaks proves $5.99 is uncontroversial (https://apps.apple.com/us/app/streaks/id963034692) and HabitKit's $32 lifetime shows the ceiling for a habit app (https://www.buildmvpfast.com/blog/602k-revenue-solo-indie-hacker-app-portfolio-breakdown-2026). The digest's guidance is that a lifetime price should sit at or under about two years of the category's annual plan; two years of Routinery is $72, so $9.99 is conservative rather than aggressive.

Apple's price points allow $0.10 steps up to $10 and rounded endings (https://developer.apple.com/news/?id=dbrszv62), so $8.99 and $7.99 are available for soft-launch tests (section 9) without changing the product.

### 2.3 The Small Business Program

Enrol on day one. Developers with up to $1M in prior-calendar-year proceeds pay 15% instead of 30% on paid apps and in-app purchases; the reduced rate takes effect 15 days after the end of the fiscal month of approval, and exceeding $1M in-year moves future sales to the standard rate (https://developer.apple.com/app-store/small-business-program/). At $9.99 the developer nets about $8.49 per sale (monetization digest, same source). In the EU, Small Business Program participants pay 15% through Apple's in-app purchase under the unified terms effective 1 October 2026 (https://developer.apple.com/support/apps-in-the-eu/), so there is no reason to touch alternative payment paths. Do not build around US external purchase links either: the 0% link-out rate could change after the Supreme Court hears the contempt question, with a ruling likely in 2027 (https://tiun.io/blog/ios-external-payments-us-cost-2026).

### 2.4 Why not a subscription

1. The product promise forbids it, and the promise is the marketing. "No subscription" is on the paywall, in the description and in the promotional text; the sentence is worth more than the recurring revenue it forgoes.
2. The category's users are sick of it. Paywall/subscription was the number-one complaint theme in an analysis of 18,464 habit-tracker reviews (https://dev.to/eltacrew/i-read-18464-reviews-of-6-habit-tracker-apps-the-1-upvoted-complaint-is-something-none-of-them-go9). Cozi's surprise paywall took its Trustpilot score to 2.1/5 (https://www.trustpilot.com/review/cozi.com). Alarmy reviewers "would be happy to pay once to remove ads, but don't do subscriptions" (https://apps.apple.com/us/app/alarmy-loud-alarm-clock/id1163786766?see-all=reviews&platform=iphone). A crocheter: "I'm all for paying for it, but specifically I don't want a subscription model. That's madness" (https://www.reddit.com/r/crochet/comments/1g3gowt/what_crochetknitting_apps_do_you_guys_use/).
3. There is nothing to subscribe to. The app costs the same to run in year three as on day one (https://localonelabs.com/topics/no-subscription-apps). Seasonal drops are content, and content is cheaper to give away than to meter.
4. A later switch would be constrained anyway: Apple's 3.1.2(a) says a developer moving to subscriptions "should not take away the primary functionality existing users have already paid for" (https://developer.apple.com/app-store/review/guidelines/).

### 2.5 What competitors charge

| Product | Price | Model | Source |
|---|---|---|---|
| Routinery (Routine Planner, Habit Tracker) | Premium Yearly $36.00 (a $39.49 yearly tier and $5.00-$5.49 monthly, $0.99 weekly also listed); 4.7 stars, 18K ratings | Subscription | https://apps.apple.com/us/app/routine-planner-habit-tracker/id1450486923 (fetched 24 Sep 2026) |
| Brili Routines | Yearly $49.99, monthly $7.99, six-month $34.99 (older tiers from $24.99/yr also listed); 4.6 stars, 601 ratings | Subscription | https://apps.apple.com/us/app/brili-routines-habit-tracker/id1516036620 (fetched 24 Sep 2026) |
| Morning Routine: Be On Time | $2.99 weekly or $29.99 yearly | Subscription | https://apps.apple.com/us/app/morning-routine-be-on-time/id6759146787 (tournament competitor hunt) |
| Cozi | Gold $39/yr, Max $79.99/yr, free tier with ads | Subscription | https://www.trustpilot.com/review/cozi.com |
| Finch | $9.99/month or $69.99/year | Subscription | https://slate.com/technology/2026/09/finch-app-self-care-wellness-review.html |
| Goally (routine hardware) | $295-$395 for the device system (the tournament research recorded $189-$369 earlier in 2026) | Hardware plus plan | https://getgoally.com/ (fetched 24 Sep 2026) |
| Streaks | $5.99 one-time | One-time | https://apps.apple.com/us/app/streaks/id963034692 |
| Things 3 | $9.99 iPhone, one-time | One-time | https://apps.apple.com/us/app/things-3/id904237743 |
| HabitKit | $32 lifetime beside $2/month | Hybrid | https://www.buildmvpfast.com/blog/602k-revenue-solo-indie-hacker-app-portfolio-breakdown-2026 |

One $9.99 purchase is less than four months of Routinery and less than three months of Brili. The comparison belongs on the product page in spirit but not in words: guideline 2.3.7 says subtitles must not "reference other apps", and the description does not name competitors either.

### 2.6 Three models considered and rejected

1. Paid upfront at $4.99. Rejected: no Test Fire before purchase, and paid downloads are near-invisible in 2025-26 (six downloads in a week, above). The free tier is also the word-of-mouth engine; a household where one person paid and three heard it is the distribution.
2. Annual subscription ($19.99/year) with a 14-day trial and Retention Messaging. Rejected despite the RevenueCat numbers (hard paywalls convert 10.7% versus 2.1% for freemium at day 35, https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026): the app has no ongoing cost to justify it, 35% of annual cancellations happen in month one (same source), and it would contradict every sentence of the positioning.
3. Per-flavor content packs (marching band $1.99, disco $1.99) like Heads Up! decks. Rejected: Heads Up! reviewers lost purchased decks under Family Sharing and call the developers uncaring (https://apps.apple.com/us/app/heads-up/id623592465), Psych! is reviled for paywalling "almost all of the fun categories" (https://appgrooves.com/app/psych-outwit-your-friends-by-warner-bros-international-enterprises/negative), and a pack model turns every seasonal drop into a decision about what to charge for. One purchase keeps the drops free by construction.

A fourth idea is deferred, not rejected: guideline 3.1.1 allows a "XX-day Trial" non-consumable at price tier 0 for non-subscription apps (https://developer.apple.com/app-store/review/guidelines/). It could be tested after launch as a 7-day Full Crew trial, but the free tier is designed to make it unnecessary.

---

## 3. Free versus paid boundary

The boundary follows WINNER.md exactly. The rule that decides each row: anything needed to prove the product on the first morning, or to keep a household's data safe, is free; anything that is breadth, memory or spectacle is paid.

| Item | Tier | Why it sits there |
|---|---|---|
| One launch flavor at 10 and 12 minutes | Free | The core mechanic must be experienced for real, every morning, or nobody buys. Two lengths cover most departure windows. |
| One Re-entry track | Free | The second structural anchor; without it the free tier is half a day. |
| The manifest with memory and one Hold item | Free | The manifest is the user's own data; gating it would feel like holding their lunchbox hostage. The Hold item is the daily reason to open the app at night. |
| Scrub and the mission log (rolling on-time rating, last 14 days editable) | Free | Blameless abort is the ethical core; it must never be sold. The rating is the anti-streak and belongs to everyone. |
| The Test Fire | Free | It is the demo and the moment of understanding; it runs before any purchase. |
| Three Request Line songs (teeth 2:00, microwave 1:30, kettle 3:00) | Free | Makes the app daily for a solo commuter with zero new time, which is the family-shelf mitigation. |
| Lock Screen / StandBy countdown and phase name, AirPlay playback, quiet mode | Free | These are how the launch works at all on a kitchen speaker; they are plumbing, not premium. |
| Every flavor and every duration (six flavors, 8/10/12/15/20 minutes) | Paid | Breadth against music fatigue; the free flavor proves it, the rest keep it fresh for the 300th morning. |
| Crew roles, walk-up cues, Stem Roll Call | Paid | The household spectacle; a solo user does not need it, a household will pay for it after one morning of hearing the silence where a stem should be. |
| The full Request Line library | Paid | Exact-length songs are cheap to want and expensive to author; the three free ones set the hook. |
| End Credits with the shareable card and clothesline widget | Paid | The nightly artifact people screenshot; it is the shareable reward for a household that already trusts the product. |
| Ninety-day mission log history and the Sunday Flight Review | Paid | Memory and reflection; the free log keeps the rating and recent days so nobody loses anything real. |
| Weekend lounge and Hangar StandBy mode | Paid | Pure atmosphere, and the visual identity that lives on the nightstand. |
| Household sharing via iCloud (when it ships) | Paid, included in Full Crew at no extra cost | Promised in the v1 unlock copy; delivering it free to existing purchasers is the promise being kept. |
| Seasonal flavor drops | Free updates for everyone entitled to the flavor set; seasonal station IDs and forecasts free to all | Never a subscription; see 4.5. |

---

## 4. StoreKit 2 setup

### 4.1 Product identifiers

Product identifiers cannot be changed after creation and the app's name is not final, so the identifiers must not contain the name. Use the in-world names, which will survive any rename:

| Purpose | Product ID | App Store Connect reference name | Display name (customer-facing) |
|---|---|---|---|
| The v1 unlock | `<bundle-id-prefix>.station.fullcrew` | Full Crew (one-time unlock) | Full Crew |
| Reserved, not created at v1 | `<bundle-id-prefix>.station.seasontwo` | Season Two (one-time unlock) | Season Two |
| Reserved, only if the trial experiment runs | `<bundle-id-prefix>.station.trial7` | 7-day Trial | 7-day Trial |

Create the App Store Connect app record only after the name knock-out search (section 6) because the bundle ID is fixed at first upload too.

### 4.2 Product type

Full Crew is a Non-Consumable: "A product that is purchased once and does not expire or decrease with use" (App Store Connect help, https://developer.apple.com/help/app-store-connect/reference/in-app-purchase-types/). It is the only product type that matches the sentence on the paywall.

### 4.3 Family Sharing: on, from day one

Decision: turn on Family Sharing for Full Crew before the first submission.

- Eligibility: "Family Sharing is a feature supported only by apps that offer auto-renewable subscriptions and non-consumable In-App Purchases" and a shared purchase "will be able to be shared by up to six family members" (https://www.developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/turn-on-family-sharing-for-in-app-purchases).
- Irreversible: "once you turn on Family Sharing for an In-App Purchases in App Store Connect, you can't turn it off" (same page), and Apple's rationale is that "customers may have based their purchasing decision on this functionality" (Tech Talk, https://developer.apple.com/videos/play/tech-talks/110345/). The decision therefore has to be made now, and the honest one is yes.
- Why yes: the product is one purchase per household by design (one phone, one speaker), so sharing costs almost nothing in lost sales; a parent whose partner's phone shows the paywall after the family already paid is a one-star review waiting to happen (the Heads Up! Family Sharing complaint above is exactly this); and "works for your whole family" is one more honest sentence for the listing.
- Implementation: `Transaction.ownershipType` distinguishes `.purchased` from `.familyShared`; both grant Full Crew. When a member leaves the family group the transaction is revoked: "you should check for the presence of the revocationDate property. This tells you this transaction has been revoked and the customer is no longer entitled to the product" (same Tech Talk).

### 4.4 Restore purchases and on-device receipt handling

There is no server, so the app never sees a receipt in the classic sense and never sends one anywhere. StoreKit 2 handles it on device:

1. At cold launch, iterate `Transaction.currentEntitlements`; for each `VerificationResult`, accept only `.verified` (StoreKit's JWS signature check), and require `revocationDate == nil`. If a verified, unrevoked transaction for `station.fullcrew` exists, set the local entitlement flag.
2. Start a `Transaction.updates` listener at launch and keep it alive for the app's lifetime, so refunds, family revocations and purchases made on another device arrive without a restart.
3. Cache the entitlement locally (a single flag in the app's SwiftData store). At 6:58 a.m. in airplane mode the launch must start: the app trusts the cached flag and re-checks when StoreKit is reachable. A launch is never blocked on a network call.
4. A "Restore Purchases" button lives in Settings under Full Crew and calls `AppStore.sync()`, which is the documented unblock when the local transaction cache is stale (https://developer.apple.com/forums/thread/823454). Restoring is silent on success ("Full Crew is on this phone") and specific on failure ("No purchase found for this Apple Account. Bought it on a different account? Switch accounts in Settings and try again.").
5. On revocation (refund or family departure), downgrade to the free tier at the next idle moment, never mid-launch or mid-Re-entry, and never delete anything: the manifest, log and End Credits history stay; the ninety-day history simply becomes read-only beyond the free window.

### 4.5 How seasonal drops stay free

A seasonal drop is an app update that adds stems and a section map, never a product. The audio ships in the bundle (or through Managed Background Assets if the bundle grows past a sensible size; On-Demand Resources are deprecated per WWDC26, https://www.mobilemarketingreads.com/wwdc-2026-apple-brings-major-changes-to-app-store-marketing-monetization-and-safety/). Entitlement is checked against the single `fullcrew` flag: a seasonal launch flavor joins the paid flavor set, and the seasonal parts that touch everyone (the station ID, Dr. Farrago's forecast, Scrub's weather report, the Sunday Flight Review's opening line) ship to the free tier so the world is visibly alive for people who have not paid. No consumable, no unlock code, no "season pass". The App Store "What's New" for each drop says "Free for everyone with Full Crew, as promised."

### 4.6 How a later Season Two would be added without breaking "no subscription"

If Season Two content (the 5 p.m. Fuel segment, a second launch melody, a new cast member) is ever sold, it is a second non-consumable, `station.seasontwo`, bought once. Rules that keep the promise:

- Nothing that was in Full Crew moves behind Season Two, including every seasonal drop shipped before it and household sharing.
- Season Two is a new song and new segments, not a renewal; the word "season" refers to the show, not to a billing period, and the paywall says so: "Season Two is a second one-time purchase. Full Crew stays yours."
- No bundle pricing tricks. If both are shown, the screen lists two one-time prices and nothing else.
- Guideline 3.1.1 is satisfied because both are ordinary in-app purchases; 3.1.2(a)'s rule about not removing paid functionality is honored by construction.

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

The price is always the StoreKit `displayPrice`, never hardcoded. "Not now" is a plain button of the same weight as Restore, not a small grey link. No countdown, no "limited offer", no strike-through price, ever.

### 5.2 What it shows

Above the copy, the annotated score with the locked flavors in colour and the free flavor marked "yours already", and a single "Hear 15 seconds of the marching band" button that plays a bar-aligned excerpt. The preview is the argument; the copy is the receipt.

### 5.3 When it appears

- When the user taps a locked thing: a flavor tile, a duration, a Request Line song outside the free three, a crew patch's walk-up cue, the End Credits share button, the Sunday Flight Review, the lounge.
- Once, after the first complete week, at the end of the Sunday Flight Review, as the last card of the review ("The crew would like to mention that there is more crew.").
- From Settings > Full Crew, at any time.

### 5.4 When it never appears

- Never during a launch, a Re-entry, a Request Line song or the Test Fire. The audio engine owns the screen from the first bar to the last; the paywall is a modal and modals are not permitted while a track is playing.
- Never on first open, never inside onboarding, never before the first morning has run.
- Never within twelve hours of a Scrub. A bad morning is not a sales opportunity.
- Never from a notification, a widget, a Live Activity or the Lock Screen.
- Never as a timed or interval pop-up, and never more than once per day except by the user's own tap on a locked item.
- Never with urgency language, a sale timer or a fake "most popular" badge (there is one product).

---

## 6. App Store listing, ready to paste

Limits from App Store Connect help: name 2 to 30 characters, subtitle up to 30, promotional text up to 170, description 4,000 characters, keywords up to 100 bytes (https://developer.apple.com/help/app-store-connect/reference/app-information/). Guideline 2.3.7 repeats the 30-character name limit and bans trademarked terms and popular app names in metadata (https://developer.apple.com/app-store/review/guidelines/).

### 6.1 Name candidates

Every candidate from WINNER.md plus three new ones. Character counts were checked by script. "Pronounceable" means a parent can say it across a kitchen and a child can repeat it. "Trademark-sounding" flags words that read like an existing brand or a slogan; none of these was checked at the USPTO (the tournament notes USPTO lookups were blocked), so every survivor still needs the knock-out search described below.

| Candidate | Chars | Pronounceable | Trademark or collision concern | Verdict |
|---|---|---|---|---|
| Doorhorn | 8 | Yes; two plain words, one stress | Coined. A web search for a "Doorhorn" app or trademark returned nothing relevant (not conclusive). Names the product's signature moment (the horns mean the door). | Primary candidate |
| Liftoff Choir | 13 | Yes | "Liftoff" is a known ad-tech company name; the two-word mark is distinct but the first word invites a knock-out hit. | Keep as backup pending search |
| Hornline | 8 | Yes, but hears as "hotline" over a speaker | Coined; no obvious collision. | Backup |
| Gantry | 6 | Yes | Common word; an iOS app named "Gantry - Coolify Manager" already exists on the store (https://apps.apple.com/us/app/gantry-coolify-manager/id6759326220), so App Store name availability is doubtful. | Reject |
| Cul-de-Sac Mission Control | 26 | Long; children shorten it | Original phrase; fits the 30 limit with no room for a descriptor. Better as the world's name inside the app than as the store name. | Keep as the world name, not the app name |
| CMC | 3 | Yes | Three letters collide with countless marks and search for nothing. | Reject |
| Mission Cul-de-Sac | 18 | Yes | Original; "Mission" is a word Alarmy owns in App Store search (tournament competitor hunt), which is a discoverability problem, not a legal one. | Backup |
| Go Horns | 8 | Yes | Reads as a college-sports chant rather than a product; sports-slogan marks are heavily enforced. | Reject |
| T-Minus Kitchen | 15 | Yes | Descriptive, generic phrase; many "T-Minus" apps exist. Weak as a mark. | Reject |
| Scrub & Go | 10 | Yes | Ampersand is awkward in URLs and search; "Scrub" reads as cleaning; a well-known TV title starts with the same word. | Reject |
| Shoes and Door | 14 | Yes | No trademark-sounding words; says nothing about music. | Backup, or the App Preview tagline |
| Splashdown | 10 | Yes | Generic word, likely used by games; it is also Bunny's in-world word for bedtime and should stay that. | Reject as app name |
| Horns Mean Shoes (new) | 16 | Yes | Coined phrase, no brand words; explains the product in three words. | Backup, and the slogan under any name |
| Liftoff Kitchen (new) | 15 | Yes | Same "Liftoff" concern as above, plus generic. | Reject |
| Pell & Marchetti (new) | 16 | Moderate; sounds like a law firm, which is the joke | Coined from the cast's names; the names must first be grepped against real public figures (WINNER.md). | Backup |

Before any asset is drawn: run USPTO Trademark Center knock-outs in Classes 9, 41 and 42 for the primary and two backups; check App Store Connect name availability in every localization (Apple notes "app names are based on language localization, not geographic territory", https://www.apple.com/legal/intellectual-property/dispute-forms/app-store/app-name-dispute.html); check the domain; file intent-to-use on the winner. Keep "assemble", "endgame", "infinity" and any show or film name out of the name, subtitle, keywords and IAP names (WINNER.md).

### 6.2 Subtitle (30 characters)

Built on the product rule "No clock. The job ends when the song ends." (43 characters, too long for the field).

- Primary: `No clock. Song ends, job ends.` (30)
- Alternate: `No clock. The song is the plan` (30, no final period)
- Fallback if Apple's reviewer reads "No clock" as an unverifiable claim: `The morning runs on a song` (26)

### 6.3 Promotional text (170 characters)

`A deadpan mission-control comedy runs your morning launch and bedtime re-entry on original songs. One phone, one speaker, no accounts. One purchase, no subscription.` (165 characters)

Promotional text can change without a new build; seasonal drops rotate the first clause ("Snow-Day Lounge is in. Free for everyone with Full Crew.").

### 6.4 Full description (3,992 characters)

Leads with original music, the manifest, the crew and household mode. The words "timer" and "alarm" appear nowhere in it; "assemble", "endgame" and "infinity" appear nowhere in it.

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

The Suno sentence is deliberate: WINNER.md requires plain disclosure in About, and putting it in the listing pre-empts the review that would otherwise "discover" it. The price is not stated in the description because it varies by storefront and 2.3.7 discourages pricing in metadata fields.

### 6.5 Keyword field (100 bytes)

`morning,routine,bedtime,kids,family,household,music,songs,getting ready,school,roommates,launch` (95 bytes)

No trademarked terms, no competitor names, no "timer", no "alarm", no "countdown". Words already in the name and subtitle (song, clock) are not repeated. "ADHD" is deliberately absent pending the open question in section 14 about the medical-or-wellness questionnaire item.

### 6.6 Categories

- Primary: Lifestyle. Routinery, Brili, ReadySet and Prep Pal are the comparison set a 4.3(b) reviewer will reach for; they live in Productivity and Health & Fitness. Lifestyle is where household products sit, and it keeps the app off the Games shelf that iOS 27 Time Allowances let parents cap by category (https://www.mobilemarketingreads.com/wwdc-2026-apple-brings-major-changes-to-app-store-marketing-monetization-and-safety/). WINNER.md allows Productivity as the alternative; use it only if Lifestyle featuring proves thin during soft launch.
- Secondary: Entertainment. It signals the cast and the music, and it is honest. Not Music (the app would be compared with players), never Kids (opting into the Kids Category adds obligations and shelves the product as a children's timer, which WINNER.md forbids), never Games.

### 6.7 Age rating questionnaire

Apple's 2025 overhaul added 13+, 16+ and 18+ to the existing 4+ and 9+ and added required questions on in-app controls, capabilities, medical or wellness topics and violent themes, with a 31 January 2026 deadline for existing apps (https://developer.apple.com/news/?id=ks775ehf); the old 12+ and 17+ tiers were removed (https://www.macrumors.com/2025/07/25/apple-overhauls-app-store-age-ratings/). Honest answers for the default script:

| Question | Answer | Note |
|---|---|---|
| Cartoon or fantasy violence | None | Scrub is an abort robot with a button; no conflict is depicted. |
| Realistic violence, prolonged graphic violence | None | |
| Profanity or crude humor | None | The register is 4+/9+ warmth; no profanity in any lyric or cue (WINNER.md). |
| Mature or suggestive themes | None | |
| Horror or fear themes | None | Dr. Farrago's forecasts are comic weather, never scary. |
| Medical or treatment information; medical or wellness topics | None | The app is not marketed as ADHD treatment or therapy; see section 14. |
| Alcohol, tobacco or drug use or references | None | |
| Sexual content or nudity | None | |
| Gambling, simulated gambling, contests | None | |
| Unrestricted web access | No | No web view. |
| User-generated content shared with others | No | Manifest text stays on device; the End Credits card is exported by the user through the share sheet, not published in-app. |
| In-app controls (parental controls) | Not applicable | No purchase or content requires a gate; Ask to Buy is Apple's. |
| Capabilities (messaging, social, loot boxes) | None | |
| Violent themes | None | |

Expected result: 4+. If a storefront's regional rules push it to 9+ that is acceptable; anything higher means a script line has drifted and must be cut.

### 6.8 Privacy nutrition label

Answer: Data Not Collected. Apple defines "collect" as "transmitting data off the device in a way that allows you and/or your third-party partners to access it for a period longer than what is necessary to service the transmitted request in real time" (https://developer.apple.com/app-store/app-privacy-details/). Doorhorn transmits nothing: no analytics SDK, no crash SDK (Apple's own crash reports reach Xcode through Apple's consent flow, not the app), no accounts, no server, no advertising. The one-page privacy policy required by 5.1.1(i) says exactly that and links from the listing and from About. When CloudKit household sharing ships, the label must be re-evaluated before that update is submitted (section 14).

### 6.9 Notes for Review

Written to a human reviewer.

```
Thank you for reviewing. A few things that will make this faster.

WHAT THIS IS. This is a piece of original music with an authored section map: every track ships with a JSON map of phase timestamps (wake, dress, manifest, door), role-cue markers and the horn entry that means "shoes and door". The music is the schedule; there are no countdown digits anywhere in the app except the parent's Live Activity. The first screen shows this map as an annotated score.

WHY IT IS MEANINGFULLY DIFFERENT (Guideline 4.3(b)). We are aware that simple timers are a saturated category. Four things here do not exist in routine or timer apps: (1) the section map, which maps song sections to phases and cues; (2) the Stem Roll Call, where each household member owns one stem of the track and tapping their patch punches it in on the next bar, so the full arrangement is only heard when everyone has shown up; (3) the in-song manifest, where the household's own list is sung mid-track by a character, with memory ("keys last seen kitchen counter"); (4) the End Credits, a sung credits sequence built each night from the day's real manifest. To see all four in under two minutes: open the app, tap "Test fire (60 seconds)", then in Settings tap "Demo tonight's Re-entry".

PURCHASE. One non-consumable in-app purchase, "Full Crew", with Family Sharing on. The paywall is reachable from Settings > Full Crew or by tapping any locked tile. Sandbox works without an account; there is no login anywhere.

BACKGROUND AUDIO (2.5.4). The audio background mode is used only while a track is actually playing (the launch, Re-entry, or a Request Line song, all user-initiated or scheduled by the user). Playback stops at the last bar and the session ends.

ALARMS AND LIVE ACTIVITIES. The scheduled morning start uses AlarmKit with a 30-second station-ID sound and a system Stop button; the full track plays only in the app. The Live Activity shows countdown, phase and role only, and carries no promotion.

PRIVACY. No data is collected, no third-party SDKs, no network calls except StoreKit. Privacy label: Data Not Collected.

CONTENT. All characters, names, lyrics, scripts and section maps are original and written by the developer; there is no third-party intellectual property, no real agency insignia, no real people. Audio was produced from those lyrics with a licensed music-generation service under its commercial terms; unmodified originals and licence records are archived and can be provided.

AGE RATING. 4+. No profanity, violence or wellness claims in any lyric or cue.

Contact: <support email>, replies within one business day during review.
```

---

## 7. Review-guideline risk table

Guideline text quoted from https://developer.apple.com/app-store/review/guidelines/ (fetched 24 September 2026) unless another URL is given.

| Guideline | Text (verbatim, abridged) | Risk to Doorhorn | Mitigation | Source |
|---|---|---|---|---|
| 4.3(b) Spam, saturated categories | "Certain kinds of apps, such as dating, flashlight, sound effects, wallpaper, simple timers, and fortune telling, are well established on the App Store and we will not accept new submissions unless they offer a meaningfully different or improved experience ... We may remove these apps from the App Store going forward if they are not updated, improved, or do not attract customers." | A reviewer files it as a routine timer next to Routinery, Brili, ReadySet and Prep Pal, or later removes it as stale. | The annotated score is screen one and screenshot one; metadata never says timer or alarm; Notes for Review name the section map, Stem Roll Call, in-song manifest and End Credits; Lifestyle primary; a shipping cadence of at least one seasonal update per quarter so the app is never "not updated". | https://developer.apple.com/app-store/review/guidelines/ ; June 2026 revision reported at https://www.macrumors.com/2026/06/09/app-store-guidelines-low-quality-apps/ |
| 5.2.1 Intellectual property | "Don't use protected third-party material such as trademarks, copyrighted works, or patented ideas in your app without permission, and don't include misleading, false, or copycat representations, names, or metadata in your app bundle or developer name." | A character silhouette, a voice or a cue resembles a known show, agency or weatherman; a rights holder files Apple's Content Dispute and the app is removed on an "unresolved" flag. | Original cast, invented bureaucracy, no real agencies or insignia; Suno prompts by genre and instrumentation only, never "in the style of"; silhouettes checked against known characters; an originality dossier (character sheets, dated sources, Suno logs, licence records) ready to attach in App Review Information. | https://developer.apple.com/app-store/review/guidelines/ ; dispute process https://www.apple.com/legal/intellectual-property/dispute-forms/app-store/ |
| 2.3.7 Accurate metadata | "Choose a unique app name, assign keywords that accurately describe your app, and don't try to pack any of your metadata with trademarked terms, popular app names, pricing information, or other irrelevant phrases ... App names must be limited to 30 characters ... subtitles ... should not include inappropriate content, reference other apps, or make unverifiable product claims." | Name collides with an existing mark; keywords include a competitor; the subtitle reads as a claim. | Knock-out search before naming; keyword field contains no brand, competitor or franchise word; subtitle fallback ready if "No clock" is challenged; no price in any metadata field. | https://developer.apple.com/app-store/review/guidelines/ |
| 4.1(c) Copycats | "You cannot use another developer's icon, brand, or product name in your app's icon or name, without approval from the developer." | Icon or name echoes another app (the Gantry collision is the live example). | Coined name; icon is a flat cutout of the launch tower on a kitchen counter, drawn in-house, tested in tinted and clear modes; nothing built from stock art. | https://developer.apple.com/app-store/review/guidelines/ ; added Nov 2025, https://developer.apple.com/news/?id=ey6d8onl |
| 2.5.4 Background services | "Multitasking apps may only use background services for their intended purposes: VoIP, audio playback, location, task completion, local notifications, etc." | The audio background mode is seen as a way to keep a "timer" alive, or audio runs when nothing is playing. | Background audio only while a track plays; the session ends at the last bar; quiet mode still plays real audio (spoken cues and stings), never a silent session; the Live Activity is driven by playback position. Stated plainly in Notes for Review. | https://developer.apple.com/app-store/review/guidelines/ |
| 5.1.1 Data collection and storage | "(i) All apps must include a link to their privacy policy in the App Store Connect metadata field and within the app ... (ii) Apps that collect user or usage data must secure user consent ... (v) If your app doesn't include significant account-based features, let people use it without a login." | Missing privacy policy link; a future SDK quietly collects data; the CloudKit share changes the label. | One-page privacy policy linked in metadata and in About; no SDKs; no login exists; label re-evaluated before the household-sharing update. | https://developer.apple.com/app-store/review/guidelines/ ; label definitions https://developer.apple.com/app-store/app-privacy-details/ |
| 3.1.1 In-app purchase | "If you want to unlock features or functionality within your app ... you must use in-app purchase. Apps may not use their own mechanisms to unlock content ... Non-subscription apps may offer a free time-based trial period ... by setting up a Non-Consumable IAP item at Price Tier 0 that follows the naming convention: 'XX-day Trial.'" | Any promo mechanism outside StoreKit (a code typed in-app, a link) is a rejection; the trial, if tried, must follow the naming rule. | Only StoreKit products; App Store promo codes for press, never in-app codes; a Restore button; if a trial is tested it is named "7-day Trial" at tier 0 and states duration and what ends. | https://developer.apple.com/app-store/review/guidelines/ |

---

## 8. Screenshots and App Preview

### 8.1 Screenshot captions (ten)

Order matches the visual document's storyboard: the annotated score first. Each caption is a headline set over the frame, with a smaller second line where the frame needs it. Headlines are short enough to read at thumbnail size.

1. The annotated score, phase bands WAKE / DRESS / MANIFEST / DOOR, horn marker. Headline: "The song is the schedule." Sub-line: "When the horns come in, shoes go on."
2. Test Fire in progress, Augustine's line on screen. Headline: "Test fire: 60 seconds." Sub-line: "T-minus one. Launch window open."
3. The manifest bridge with Gus's sung line as lyric text. Headline: "Your list, sung mid-song." Sub-line: "Keys last seen kitchen counter."
4. Crew patches in four colours, one stem pending. Headline: "Tap your patch. Your stem punches in." Sub-line: "At T-0 everyone plays together."
5. Lock Screen and StandBy with the cutout countdown and phase name. Headline: "One phone on the counter." Sub-line: "Nobody else looks at a screen."
6. Request Line tiles: Teeth 2:00, Microwave 1:30, Kettle 3:00, Shower 5:00. Headline: "Songs exactly as long as the wait." Sub-line: "Cues sung in. Fully offline."
7. Scrub with the weather report and the mission log rating. Headline: "Bad mornings are weather." Sub-line: "On time 42 of 50. No streaks to lose."
8. Re-entry at the final bar, the house going dark. Headline: "Bedtime runs the phases in reverse." Sub-line: "Tidy, teeth, book, lights, buzzer."
9. The End Credits card on the clothesline widget. Headline: "Tonight's credits, from today's real list." Sub-line: "Top billing: whoever carried it."
10. The paywall. Headline: "One purchase. No ads. No subscription. No streaks." Sub-line: "Seasonal flavors are free updates."

### 8.2 App Preview script (30 seconds)

Apple allows previews of 15 to 30 seconds, up to three per listing (https://developer.apple.com/help/app-store-connect/reference/app-preview-specifications). Previews autoplay muted on the product page, so every beat carries a caption; the audio is the product, so the mix is still mastered properly for people who tap for sound. Footage is captured from the app.

| Time | Picture | Audio | Caption |
|---|---|---|---|
| 0:00-0:03 | Annotated score fills the frame; the playhead starts at WAKE. | Station ID sting, then the first bars. | "The song is the schedule." |
| 0:03-0:08 | Lock Screen countdown on a phone on a counter; sky indigo. | Augustine: "T-minus twelve. Launch window open." | "Nobody looks at a screen." |
| 0:08-0:14 | Manifest bridge; lyric lines appear as Gus sings them; sky gold. | Gus: "Lunchbox, library book, the good water bottle, keys last seen kitchen counter." | "Your list, sung." |
| 0:14-0:19 | Four crew patches; three taps, three stems join; one patch waits, then taps. | Drums, bass, brass, then choir lands on the bar. | "Tap your patch. Your stem joins." |
| 0:19-0:23 | Final chorus; horn marker lights; door tap; white flash. | Horns, then the liftoff fanfare. | "Horns mean shoes. Door." |
| 0:23-0:27 | Cut to dusk purple: Re-entry's last bar, house dark, End Credits card slides onto the clothesline. | Buzzer, then two bars of sung credits. | "Every night: sung credits from the real day." |
| 0:27-0:30 | The promise card on the score's colours. | Final chord. | "One purchase. No ads. No subscription. No streaks." |

---

## 9. Launch plan

### 9.1 TestFlight cohorts

TestFlight supports up to 10,000 external testers and 100 internal testers, up to 100 builds, public links, screenshot feedback and crash reports (https://developer.apple.com/testflight/); a build becomes unavailable to testers after 90 days (https://www.developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview), so the beta ships a fresh build at least monthly.

| Cohort | Size | Recruited from | What it has to prove | Duration |
|---|---|---|---|---|
| Families (school-age children) | 25 households | Parent friends, one school's parent list by personal ask, one ADHD-parent community with moderator permission | The launch replaces the human clock; the Stem Roll Call works pass-the-phone; kids do not need the screen; 4+ tone holds. | 4 weeks of school mornings |
| Couples | 15 | Personal network, one couples' newsletter reader ask | The reluctant partner joins for the walk-up cue; End Credits read as a joke, never a scoreboard. | 4 weeks |
| Roommates | 10 flats | Two university housing groups, one r/roommates-type community with permission | Departure windows differ; the Request Line is used by people who never run a launch; the shared speaker question. | 3 weeks |
| Solo commuters | 30 | Public TestFlight link shared in iOS communities and on Mastodon/Bluesky | The app is daily for one person with zero new time; the solo "Pilot, Ground Crew and audience" line lands; no family-shelf feel. | 3 weeks |
| Shift workers | 10 | Nurse and hospitality contacts, one shift-work forum with permission | Launches at odd hours; Re-entry at 9 a.m.; the "no-launch lounge" for days off; AlarmKit behaviour across Focus modes. | 3 weeks |

Each cohort gets the same three-question weekly email (below), the same build, and a named contact. Families and shift workers are the two cohorts that can kill the schedule: if the launch does not start reliably on a HomePod at the scheduled time, nothing else matters.

### 9.2 What to measure without analytics

The app collects nothing, so measurement is what people choose to tell you and what Apple already provides.

- TestFlight's own signal: crash reports and screenshot feedback (both Apple-collected, tester-initiated).
- The exported Flight Review: a Settings button that composes an email with the last fourteen days of the mission log as plain text (launches, scrubs, lengths, Request Line plays, roll-call completeness) that the tester sends or does not. This is the only "data" and the person sees every line of it before sending.
- Three questions, weekly, by email: "Did the launch start by itself?", "Did anyone look at the phone during it?", "What did you skip?" One free-text line: "What did the crew say that you repeated to someone?"
- One in-person or video session per cohort in week two: watch a real morning on a speaker phone; count the number of times an adult speaks an instruction the song already sang.
- Purchase intent, asked once at the end: "If this cost $9.99 once, would you buy it, and what would you expect to be in it?" Compare the answers with the free/paid table.
- After launch: App Store Connect's own App Analytics (impressions, product page views, downloads, conversion, proceeds, and opt-in usage aggregates supplied by Apple, no SDK required) and the reviews themselves.

### 9.3 Soft launch storefronts

Release first in Canada, Australia, New Zealand and Ireland: English-speaking, small enough that a review problem is contained, similar purchasing behaviour to the US. Three to four weeks with three questions: does the free-to-paid conversion sit in the 4-8% band assumed in section 10; is the refund rate under 2%; do reviews mention the music unprompted. Use the window to test $8.99 against $9.99 by storefront (Apple pricing is per storefront), then set the world price and open the US, UK and all remaining storefronts together.

### 9.4 Press and community targets, and the etiquette

Press (email, one paragraph, a private TestFlight link, the 30-second preview, a promo code from App Store Connect, and a plain offer of a 15-minute call; no embargo games for an indie):

- Apple-platform press: MacStories (and its AppStories podcast), 9to5Mac, Cult of Mac, AppAdvice, iMore, Six Colors, The Sweet Setup. Pitch: "the first app where the music is the schedule", with the on-device stem engine as the developer-interest angle.
- Parenting and home press: Fatherly, Cool Mom Tech, Romper, The Everymom, Apartment Therapy (roommates and couples), The Kitchn (a kitchen-counter product). Pitch: "stop being the human clock", the mental-load evidence (mothers carry 71% of household mental-load tasks versus 45% for fathers, https://www.bath.ac.uk/announcements/mothers-bear-the-brunt-of-the-mental-load-managing-7-in-10-household-tasks/).
- Podcasts by pitch, not by ad: Mac Power Users, Upgrade and Connected (Relay), the ADHD-focused shows whose hosts recommend Brili (the tournament hunt notes How to ADHD recommends Brili; ask for a tester build, not a mention).
- Apple itself: submit a Featuring Nomination in App Store Connect four weeks before launch with the seasonal calendar attached; upload Creative Assets (the video header and seasonal imagery) so the product page can change without a build (https://appleworld.today/2026/06/wwdc-26-apple-announces-expanded-app-store-capabilities-for-developers/).

Communities where routine apps are actually discussed, and the rules of conduct (each community's written rules were not verified for this document; read the sidebar and message the moderators before the first post):

- Parenting: r/Parenting, r/daddit, r/Mommit, r/toddlers, r/AutismParenting and r/ADHDparenting-type communities; Facebook groups for specific school communities only by personal invitation.
- ADHD and executive function: r/ADHD, r/adhdwomen, r/ADHD_Programmers. These communities are where Routinery and Brili get recommended and where "I am the human clock" is said out loud.
- Households: r/roommates-type communities, r/CleaningTips, r/declutter; couples communities are less useful than the ADHD ones.
- Apple platform: r/apple, r/iphone, r/ios, r/HomePod (the speaker question), r/shortcuts (the Request Line via Shortcuts, Action button and NFC), r/iOSProgramming and Hacker News "Show HN" for the engineering story (bar-quantized taps, stems arranged on device, zero server).
- Elsewhere: the iOS developer and design communities on Mastodon and Bluesky; one official TikTok account showing the crew and the music (Finch's growth came from organic video, https://blog.sparrowapps.io/p/finch-how-a-self-care-app-hit-30m-arr-without-vc-money).

Etiquette, without exception: read the self-promotion rule and obey it; ask the moderators first and accept a no; post as a person telling a story ("I built this because I was the human clock") in threads where someone is asking for exactly this, never as a launch broadcast; disclose that you are the developer every single time; answer questions for as long as the thread lives; never ask for reviews or ratings; never hand out codes without moderator approval; never use a second account; never mention a competitor by name in a comparison. If a community has a weekly self-promotion thread, that is the only place a link goes.

### 9.5 Product Hunt

- Launch on a Tuesday or Wednesday, going live at 12:01 a.m. Pacific so the whole day counts. Self-launch; no paid hunter.
- Assets: the 30-second preview as the first gallery item, the annotated score as the thumbnail, five stills matching screenshots 1, 3, 4, 9 and 10, and a maker's first comment telling the human-clock story in six sentences with the free/paid boundary stated plainly.
- Tagline under 60 characters: "The song is the schedule. One purchase, no subscription."
- Reply to every comment for 24 hours; the crew's voice is allowed in replies but the pricing answers are plain.
- A limited batch of App Store promo codes for the first commenters who ask, issued from App Store Connect, never an in-app code (3.1.1).
- Product Hunt is a press day, not a sales day; the goal is the write-ups and the backlink, and the metric is press replies in the following week.

### 9.6 The first 90 days

- Days 1-7: launch week. Soft-launch storefronts already open; global release, press emails sent on day 1 with codes, Product Hunt on day 2 or 3, Show HN on day 4, community threads answered daily. Watch reviews hourly; reply to every review through App Store Connect within a day.
- Days 8-30: fix week and the first seasonal drop prepared. Ship a 1.0.1 with the top three complaints from reviews and TestFlight; submit the Featuring Nomination for the December Snow-Day Lounge; collect the first End Credits screenshots people share and ask permission to use two on the product page.
- Days 31-60: v1.1 (full Request Line, End Credits card) per WINNER.md's phasing, which is also the answer to any 4.3(b) "not updated" concern; second press round targeted at the parenting and ADHD press with the v1.1 story; first localization of metadata (section 11).
- Days 61-90: the December seasonal drop as a free update with new Creative Assets; a written 90-day review against the scenarios in section 10 (impressions, conversion, refunds, the price test result) and a decision on whether to run the 7-day Trial experiment.

Cash flow: Apple pays once per fiscal month, roughly 33-45 days after the month closes, with a $10 minimum for USD accounts (https://leus.capital/blog/apple-payout-guide-2026-how-to-accelerate-your-studios-cash-flow); launch-month revenue arrives around day 60.

---

## 10. Revenue scenarios

Fixed inputs: price $9.99; Small Business Program commission 15%; net per sale $9.99 × 0.85 = $8.49 (rounded; the digest's figure); refund allowance 2% of sales (the dev.to developer's target). Conversion means downloads to Full Crew purchases within the first year. Benchmarks for the assumption: RevenueCat's freemium median is 2.1% download-to-paid at day 35 and hard paywalls reach 10.7% (https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026); Health & Fitness sits at 2.9% (https://www.revenuecat.com/state-of-subscription-apps-2026-gaming). A soft paywall on a strong free tier with a one-time price and day-0 conversions is assumed to land between those, at 4-8%. Impression-to-download rates are assumptions, not benchmarks; they are shown so that App Store Connect's impression counts can be read against them from week one.

| Case | Product page impressions (year one) | Impression to download | Downloads | Conversion to Full Crew | Purchases | Gross to developer (× $8.49) | Less 2% refunds | Net, year one |
|---|---|---|---|---|---|---|---|---|
| Quiet | 125,000 (about 340 a day) | 4% | 5,000 | 4% | 200 | $1,698 | $34 | about $1,660 |
| Solid | 800,000 (about 2,200 a day) | 5% | 40,000 | 6% | 2,400 | $20,376 | $408 | about $19,970 |
| Breakout | 4,170,000 (about 11,400 a day) | 6% | 250,000 | 8% | 20,000 | $169,800 | $3,396 | about $166,400 |

Arithmetic shown for the solid case: 800,000 × 0.05 = 40,000 downloads; 40,000 × 0.06 = 2,400 purchases; 2,400 × $8.49 = $20,376; refunds 2,400 × 0.02 = 48 sales, 48 × $8.49 = $408; net $19,968.

What each case means:

- Quiet is what ASO alone produces for a new app with no featuring; it covers Suno Premier for the year ($24/month, $192/year, https://suno.com/pricing) and not much else. Only 17.3% of new apps reach $1K MRR within two years (https://www.revenuecat.com/state-of-subscription-apps), so this is the base case, not the failure case.
- Solid assumes one Apple-platform press feature and a handful of End Credits cards travelling on social media. It is a real second income and funds the human re-recording of the station ID, fanfare and launch melody that WINNER.md schedules for year one.
- Breakout assumes App Store featuring plus a video that travels the way Finch's did. It stays well under the $1M Small Business threshold, so the 15% rate holds. Premium mobile revenue decays fast after launch (Balatro's mobile daily revenue fell from a $200K peak to about $35K a month a year later, monetization digest), so the breakout year is front-loaded and the seasonal cadence exists to slow the decay.

The scenarios deliberately exclude Season Two, localization revenue and any Mac or iPad version.

---

## 11. Localization plan

What localizes cheaply: UI strings, the App Store metadata (name kept, subtitle, promotional text, description, keywords), screenshot captions, the spoken-cue transcripts shown on the Live Activity and StandBy, the privacy policy and the FAQ. What does not: anything sung. The manifest lines are pre-generated per line in one voice lane, the teeth song has quadrant cues in the lyrics, the End Credits are a template song with modular sung lines, and every one of those would need new lyrics written by the developer in the target language, regenerated audio on the licensed Suno line, re-split stems, and re-authored section maps because sung phrases change length. The comedy register does not translate either; a deadpan flight director is a different joke in German.

Therefore:

1. Launch: English only, with the same English metadata on every storefront. Songs, cues and credits in English.
2. Within 90 days: metadata and UI localization (no audio) for German, French, Spanish (Spain and Latin America), Dutch and Portuguese (Brazil). These storefronts have high English comprehension or large bilingual households, and the Request Line's flavor variety carries the daily habit even when the lyrics are in English. The localized description states plainly that the songs are sung in English.
3. Deferred: Japanese, Korean and Chinese. Both the songs and the register would need full re-authoring; no metadata-only version is honest.
4. The first sung localization, if ever: Spanish, because it serves US bilingual households, Spain and Latin America with one authoring effort, and it ships as a free update inside Full Crew, never as a product. The decision is taken at the 90-day review on the strength of Spanish-storefront downloads.

Rule for every localized storefront: keyword fields are rewritten in-language by a person, never machine-translated, and checked again for brand and competitor words (2.3.7 applies in every localization).

---

## 12. Support and refunds

### 12.1 The support email flow

- One address, published in the listing and in About, and an in-app Contact button that composes a mail with app version, iOS version and device model pre-filled in the body where the person can see and delete them. Nothing is attached automatically.
- Auto-reply within minutes: thanks, the FAQ link, the refund path (below), and "a person replies within two business days; if it is about a launch that did not start, say which speaker and which time and I will look tonight."
- A personal reply within two business days, every time, from the developer; no ticketing language, no "we".
- If the person wants to help with a bug, ask them to send the exported Flight Review from Settings; they see the text before sending.
- Keep a private list of the ten most common questions; when a question appears three times it goes into the FAQ and, where possible, into the app.

### 12.2 The refund stance

Apple decides refunds, not the developer. A customer requests one at reportaproblem.apple.com; "If Apple approves your request" the money returns, and Apple asks people to "Wait 24 to 48 hours for an update on your request"; "Refund eligibility might vary by country or region" (https://support.apple.com/en-us/118223). The app therefore:

- Puts the StoreKit refund sheet in Settings > Full Crew ("Request a refund from Apple"), using `beginRefundRequest`, which Apple describes as letting you "provide the same functionality without having to redirect customers and provide assistance within the app" (https://developer.apple.com/videos/play/tech-talks/10887/). Nobody has to search for the path.
- Never argues. Anyone who emails asking for a refund gets the steps, a note that their manifest and log are safe, and nothing else.
- On revocation, returns to the free tier at the next idle moment and keeps every byte of the person's data.
- Watches the refund rate through App Store Connect; the target is under 2%. Above that, the paywall copy is overpromising or the free tier is confusing, and the fix is in the product, not in the reply.

### 12.3 FAQ (ten questions)

1. Is there a subscription? No. There is one purchase, Full Crew, and that is the end of it. Seasonal flavors are free updates. If a Season Two is ever made it will be a second one-time purchase, and Full Crew keeps everything it has.
2. What do I get for free, forever? A real launch every morning at 10 or 12 minutes, a Re-entry track every night, the manifest with memory and a Hold item, Scrub and the mission log, the Test Fire, and three Request Line songs. It is complete on its own.
3. Does everyone in the house need the app? No. One phone on the counter or one speaker runs the whole launch. Crew patches work pass-the-phone. Nobody else installs anything or makes an account.
4. Can my family share the purchase? Yes. Full Crew supports Family Sharing, so up to six people in your Family Sharing group can use it on their own phones.
5. Does it work on a HomePod or another speaker? Yes, over AirPlay or Bluetooth from the phone. The scheduled start plays a 30-second station ID from the phone; the full track plays through the app and your speaker.
6. Does it need the internet or a music subscription? No. Everything is on the phone. No accounts, no music service, no data collected.
7. What happens on a bad morning? Press Scrub. The day is logged as weather, nothing is lost, and tomorrow offers a shorter track. There are no streaks in this app.
8. I bought Full Crew and it says locked. Open Settings > Full Crew > Restore Purchases. If your family member bought it, make sure Purchase Sharing is on in your Family Sharing settings. If it still fails, email support with the Apple Account used to buy it.
9. How do I get a refund? Settings > Full Crew > Request a refund from Apple, or reportaproblem.apple.com. Apple decides within a day or two. Your manifest and log stay on your phone either way.
10. Who wrote the songs? Every lyric and every line was written by the developer. The recordings were produced from those lyrics with Suno under its commercial terms. The station ID, the fanfare and the launch melody are being re-recorded with a human musician in the first year.

---

## 13. Roadmap

### 13.1 Paid-free seasonal drops

Every drop is a free update inside Full Crew; the seasonal station ID, forecast and Scrub weather ship to the free tier too. Names are invented and avoid any real holiday brand.

| When | Drop | What it contains |
|---|---|---|
| Launch (v1) | Six flavors: marching band, surf, disco, big band, bluegrass, lullaby for Re-entry | The v1 set from WINNER.md, five lengths each, arranged on device from stems. |
| December | Snow-Day Lounge | A no-launch lounge track for snow days, a wintry station ID, Dr. Farrago finally forecasting snow and being wrong about the amount. |
| March | Clocks-Forward Week | A special Scrub weather report for the clock change, a slower 8-minute flavor for the week after, and Bunny's "splashdown is an hour earlier" Re-entry intro. |
| June | Last Day of School | A one-off fanfare for the final launch of the school year and a Summer Lounge no-launch track for mornings with nowhere to be. |
| September | Marching Band Season | The September marching-band flavor gets new arrangement variants and a "first day" station ID. |

In between, per WINNER.md's phasing: v1.1 adds the full Request Line and the End Credits card; v1.2 adds crew stems and walk-up cues; CloudKit household share ships to Full Crew owners at no charge when it is ready.

### 13.2 Season Two (the same app)

A second one-time purchase, only if the 90-day review shows demand: the 5 p.m. Fuel segment (the crew settles dinner from the house menu with one veto, feeding the manifest and the End Credits), a second launch melody, and a new recurring character from the Board of Snooze Appeals. Full Crew loses nothing.

### 13.3 The second app: Dreadlines (renamed)

The runner-up, and the showrunner's first choice, becomes the second product in the same world's sound. Dreadlines is the avoidance-only list: you put on it only the things you keep not doing, and each one becomes a monster that ages visibly and affectionately ("my dentist monster is 41 days old"), so the cast is generated from the user's own life without a writer typing a line. The song is the contract: starting the task starts a track, and the job ends when the song ends, with Pull It Off's bar-quantized score so every tap lands on a downbeat and Caper's script library so bailing shrinks the job instead of failing it. Doorhorn's single Hold item is the seed of it; Dreadlines is the whole garden, priced the same way, one purchase, no streaks, with a share line that the showrunner called the best sentence in the dossier.

### 13.4 The third product: Split Level (renamed)

Split Level had the best cast and the strongest visual identity in the tournament (the lit dollhouse card, the nightly 90-second household sitcom with credits sung from the real task log), and its credits are already grafted into Doorhorn's Re-entry. As a standalone it would be re-scoped away from the morning entirely: a nightly show about the house, with the dollhouse as the artifact and Doorhorn's mission log as an optional import. It is listed here as a direction, not a commitment; the authoring load that worried every judge has to be solved by the Suno-and-stems pipeline proven in Doorhorn first.

---

## 14. Open questions

1. The name. Every candidate is unverified at the USPTO; "Gantry" already collides on the App Store. The knock-out search, App Store Connect availability in every localization and the domain check must finish before the app record is created, because the bundle ID and product IDs are then fixed.
2. Family Sharing is irreversible. This document says turn it on; if the developer disagrees, the decision has to be made before the first submission, not after.
3. Categories and Time Allowances. iOS 27's parental caps are by category (Games, Entertainment, Social Media); whether a secondary Entertainment category can be capped on a child's device is not documented in the digests. If it can, drop the secondary category rather than risk the launch being silenced on a child's iPad.
4. "ADHD" in keywords and copy. The word would help discovery in the communities where Routinery and Brili are recommended, but the new age-rating questionnaire asks about medical or wellness topics. The safe answer is to leave it out of metadata and let the community threads carry it; a reviewer's view of a single keyword is unknown.
5. The privacy label after CloudKit sharing. Data in the user's own iCloud is not accessible to the developer, but the label questionnaire must be re-answered when that update ships; keep the sharing update separate from any other change so a label dispute cannot block a seasonal drop.
6. The $0 "7-day Trial" experiment. Allowed by 3.1.1; whether it lifts conversion above the free tier's own effect is untested and should only be tried after the 90-day review.
7. Price test. $8.99 versus $9.99 in the soft-launch storefronts is the only test planned; a $14.99 test is not, because the promise "one purchase" is easier to keep at a price nobody has to think about.
8. Suno terms at launch. The monetization and legal digests both note the December 2025 shift from "you own the songs" to "granted commercial use rights" and unresolved litigation; the live Terms must be re-read the week of submission and the answer recorded in the originality dossier.
9. The hardware comparison. Goally's live price today is $295-$395, above the $189-$369 the tournament research recorded; any marketing line about hardware prices must be refreshed on the day it is used.
10. App Preview audio. Previews autoplay muted; whether Apple's editorial team hears the product at all depends on the Featuring Nomination notes. The preview should be resubmitted with each seasonal drop through Creative Assets so the page never goes stale in a 4.3(b) sense.
11. The reviewer's "Demo tonight's Re-entry" button referenced in Notes for Review does not exist in the v1 spec; it has to be built (a 60-second Re-entry and credits demo) or the note rewritten.
12. Screenshot order. The captions above assume the visual document's storyboard begins with the annotated score and ends with the paywall; if the storyboard differs, reorder the captions, never the first one.

---

## Sources used in this document

- App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- June 2026 4.3(b) revision (report): https://www.macrumors.com/2026/06/09/app-store-guidelines-low-quality-apps/
- November 2025 4.1(c) addition: https://developer.apple.com/news/?id=ey6d8onl
- Small Business Program: https://developer.apple.com/app-store/small-business-program/
- Apps in the EU (Oct 2026 terms): https://developer.apple.com/support/apps-in-the-eu/
- US link-out status: https://tiun.io/blog/ios-external-payments-us-cost-2026
- Price points: https://developer.apple.com/news/?id=dbrszv62
- App information field limits: https://developer.apple.com/help/app-store-connect/reference/app-information/
- App preview specifications: https://developer.apple.com/help/app-store-connect/reference/app-preview-specifications
- In-app purchase types: https://developer.apple.com/help/app-store-connect/reference/in-app-purchase-types/
- Family Sharing for in-app purchases: https://www.developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/turn-on-family-sharing-for-in-app-purchases and https://developer.apple.com/videos/play/tech-talks/110345/
- StoreKit 2 support and refunds: https://developer.apple.com/videos/play/tech-talks/10887/ and https://developer.apple.com/forums/thread/823454
- Apple refund process: https://support.apple.com/en-us/118223
- Updated age ratings: https://developer.apple.com/news/?id=ks775ehf and https://www.macrumors.com/2025/07/25/apple-overhauls-app-store-age-ratings/
- App privacy details: https://developer.apple.com/app-store/app-privacy-details/
- TestFlight: https://developer.apple.com/testflight/ and https://www.developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview
- App name disputes: https://www.apple.com/legal/intellectual-property/dispute-forms/app-store/app-name-dispute.html
- Content disputes: https://www.apple.com/legal/intellectual-property/dispute-forms/app-store/
- Routinery: https://apps.apple.com/us/app/routine-planner-habit-tracker/id1450486923
- Brili: https://apps.apple.com/us/app/brili-routines-habit-tracker/id1516036620
- Goally: https://getgoally.com/
- Morning Routine: Be On Time: https://apps.apple.com/us/app/morning-routine-be-on-time/id6759146787
- Gantry (name collision): https://apps.apple.com/us/app/gantry-coolify-manager/id6759326220
- RevenueCat 2026: https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026, https://www.revenuecat.com/state-of-subscription-apps, https://www.revenuecat.com/state-of-subscription-apps-2026-gaming
- Streaks: https://apps.apple.com/us/app/streaks/id963034692
- Things 3: https://apps.apple.com/us/app/things-3/id904237743
- Balatro: https://www.pocketgamer.biz/balatro-nears-44m-on-mobile-amid-a-sudden-spending-surge/
- HabitKit: https://www.buildmvpfast.com/blog/602k-revenue-solo-indie-hacker-app-portfolio-breakdown-2026
- One-time versus subscription (indie): https://dev.to/snake_sun/why-i-picked-one-time-iap-over-subscription-for-4-indie-ios-apps-storekit-2-2026-data-1nk6
- r/iOSProgramming threads: https://www.reddit.com/r/iOSProgramming/comments/1n23m6g/try_before_you_buy_subscription_or_simply_buy_to/, https://www.reddit.com/r/iOSProgramming/comments/1lpkpsz/is_the_subscriptions_based_revenue_still_the_best/, https://www.reddit.com/r/iOSProgramming/comments/1l4j5ra/lifetime_vs_annual_free_trial_vs_no_trial/
- Habit-tracker review analysis: https://dev.to/eltacrew/i-read-18464-reviews-of-6-habit-tracker-apps-the-1-upvoted-complaint-is-something-none-of-them-go9
- Cozi: https://www.trustpilot.com/review/cozi.com
- Finch: https://slate.com/technology/2026/09/finch-app-self-care-wellness-review.html and https://blog.sparrowapps.io/p/finch-how-a-self-care-app-hit-30m-arr-without-vc-money
- Alarmy reviews: https://apps.apple.com/us/app/alarmy-loud-alarm-clock/id1163786766?see-all=reviews&platform=iphone
- Heads Up! and Psych! complaints: https://apps.apple.com/us/app/heads-up/id623592465, https://appgrooves.com/app/psych-outwit-your-friends-by-warner-bros-international-enterprises/negative
- Crochet subscription quote: https://www.reddit.com/r/crochet/comments/1g3gowt/what_crochetknitting_apps_do_you_guys_use/
- No-subscription argument: https://localonelabs.com/topics/no-subscription-apps
- Mental load study: https://www.bath.ac.uk/announcements/mothers-bear-the-brunt-of-the-mental-load-managing-7-in-10-household-tasks/
- WWDC26 store changes: https://appleworld.today/2026/06/wwdc-26-apple-announces-expanded-app-store-capabilities-for-developers/ and https://www.mobilemarketingreads.com/wwdc-2026-apple-brings-major-changes-to-app-store-marketing-monetization-and-safety/
- Apple payout timing: https://leus.capital/blog/apple-payout-guide-2026-how-to-accelerate-your-studios-cash-flow
- Suno pricing: https://suno.com/pricing
