# Doorhorn (working title): visual design system, screen designs and Envato shortlist

Document 04 of the product package, 24 September 2026. The world, cast and features come from `concepts/tournament/WINNER.md`; design-context facts come from the aesthetic and Envato research digests and from the fresh fetches cited inline. Hex values, contrast ratios and font licenses were computed or fetched on 24 September 2026; anything unverified is listed in section 13.

**Summary.** Doorhorn is a deadpan mission-control comedy that runs a household's morning launch and bedtime re-entry through music, and its interface has one job: make a piece of music legible as a plan from across a kitchen at 6:58 a.m. This document fixes the visual system (sky, crew and character color, type, the annotated score component, characters, patches and icon), specifies every screen, storyboards the App Store screenshots, states what may and may not come from Envato Elements, and gives the production plan for Figma, Adobe Express or Canva, and Xcode.

## 2. Design principles

1. **Readable from across the kitchen.** The phone lies on a counter three metres from the person it is talking to. One word (the phase name) at 96 pt or larger, one sky color per phase, one moving thing (the playhead). Everything smaller is for the person holding the phone, who at 6:58 is nobody.
2. **No clock digits except the parent's Live Activity.** No countdown or elapsed-time digits appear anywhere except the parent's Live Activity on the Lock Screen, in the Dynamic Island and in StandBy. Progress is the playhead. A scheduled wall-clock time may be printed once, in words, where the schedule is set or confirmed ("Tomorrow at 7:28, Augustine will call it"). This is the Houseband rule: "No clock. The job ends when the song ends." (WINNER.md)
3. **Hard shapes that survive iOS 26 tinted, clear and dark icon modes.** Every character, patch and icon is a handful of opaque, hard-edged shapes with one signature color. Icons are now "crafted from multiple layers of Liquid Glass" with light, dark, tinted and clear looks (https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/), and in tinted and clear modes "the symbol must still work through shape, spacing, and value contrast" (https://www.applaunchflow.com/blog/ios-26-app-icon-sizes-variants). Anything that needs a gradient, a texture or a second close color to be recognised fails.
4. **The score is the hero.** The annotated score (phase bands, waveform, playhead, role-cue markers, the horn labeled "shoes and door") is screen one, screenshot one and the spine of every surface. It is the visual answer to Apple's 4.3(b) "simple timers" exposure (WINNER.md).
5. **Color lives in the content layer; glass stays in the navigation layer.** Liquid Glass "is best reserved for the navigation layer that floats above the content", "Always avoid glass on glass", "Tinting should only be used to bring emphasis to primary elements", and "If you want to imbue color into your app, do it in the content layer instead" (https://developer.apple.com/videos/play/wwdc2025/219/). Sky, score, characters and cards are content; bars and sheets are untinted system glass with one tinted primary action per screen.
6. **Red belongs to Scrub.** Red is never a crew color, a sky color or decoration. A child who has seen Scrub once knows what every red thing does.
7. **Borrow energy, never property.** From the reference shows: economy of silhouette, warmth, structural music, the black-outline credits motif. From blockbuster marketing: a fixed mark whose color shifts per chapter and "in color = active, greyscale = fallen" as a state language (aesthetic digest). No trade dress, no agency insignia, no likeness, no real call signs (WINNER.md).
8. **The tap is the downbeat.** Every phase change, roll-call confirm, sky shift and Scrub lands on the next bar boundary; the log counts in bars, not minutes (WINNER.md, Pull It Off graft).

## 3. Color

All values are sRGB hex. The sky is always a flat fill: no gradients, stars or clouds. Depth comes from the tower silhouette and the counter edge.

### 3.1 The sky system

| Phase | Token | Hex | On screen when | Notes |
|---|---|---|---|---|
| T-12 and WAKE | T-12 Indigo | `#1F1B5A` | Station ID through verse one; also the Hangar, End Credits and resting sky | WINNER.md: "deep indigo at T-12" |
| DRESS | Dress Blue | `#3B4BA8` | First key change | Derived step so the climb toward the bridge is visible; added here, not in WINNER.md |
| MANIFEST | Manifest Gold | `#F5B82E` | The bridge: Gus sings the list, the roll call runs | The only light morning sky; all text on it is Ink |
| DOOR (final chorus) | Hot Orange | `#FF5A1F` | Horns in; shoes and door | Also the ON AIR bulb |
| T-0 | Liftoff White | `#FFFBF2` | One-beat flash, then the clean-launch resting state | Warm, not pure white |
| Re-entry TIDY, TEETH | Dusk Purple | `#4A2A6A` | First half of the descent | Inverts the indigo |
| Re-entry BOOK | Lamp Amber | `#FFAB3D` | The lamp-glow phase | Also the Hold item color |
| LIGHTS, buzzer | Ink 900 | `#14132A` | The house goes dark | The screen may be nearly black |

### 3.2 Crew colors

Pure and saturated because they are worn as patches. They never sit directly on a sky: they live on the console strip (Ink 900) or inside a Liftoff White ring, and any label on a disc is Ink 900.

| Role | Token | Hex | Glyph (one shape, no counters) |
|---|---|---|---|
| Pilot | Pilot Blue | `#2D7DFF` | Upward chevron |
| Navigator | Navigator Green | `#2FB36B` | Compass needle (long rhombus) |
| Cargo | Cargo Yellow | `#FFD23F` | Box with one strap |
| Ground Crew | Ground Crew Pink | `#F05DA8` | Two marshalling batons in a V |
| Spare 1 | Spare Teal | `#1FB8B0` | Headset arc |
| Spare 2 | Spare Violet | `#9F7AEA` | Five-point star |

### 3.3 Character signature colors

One signature color each plus one shared neutral, Suit Cream `#FFF1D6`, for faces, hands and visors. Dark-signature characters read on gold, orange and white by their body and on indigo and dusk by their cream face; light-signature characters the reverse. Silhouettes are in section 6.

| Character | Token | Hex |
|---|---|---|
| Augustine Pell | Director Navy | `#22345F` |
| Gus Marchetti | Coverall Olive | `#5C6B22` |
| Dr. Ines Farrago | Storm Violet | `#6A4BD8` |
| Bunny Kowalczyk | Velvet Plum | `#5B1F4F` |
| Lionel Abara | Copy Cyan | `#34B9E8` |
| Scrub | Overcast Grey body `#AEB6C2`, Scrub Red button `#E8402F` | |

### 3.4 UI neutrals

Every neutral sits near 245 to 250 degrees of hue at 3 to 8 percent saturation, so greys feel like the T-12 sky at rest.

| Token | Hex | Use |
|---|---|---|
| Ink 900 | `#14132A` | Text on light; dark background; console strip |
| Ink 800 | `#1E1D3A` | Dark cards |
| Ink 700 | `#2B2A4A` | Raised dark surfaces, dividers |
| Ink 500 | `#5C5B7A` | Secondary text on light |
| Ink 300 | `#A9A8C2` | Borders; secondary text on dark; greyscale for scrubbed elements |
| Ink 100 | `#E6E4F2` | Text on dark; light alternate surface |
| Paper | `#FAF8FF` | Light background |
| Cream | `#FFF6E5` | Light cards, manifest paper |

### 3.5 Semantic colors

| Meaning | Token | Hex | Rule |
|---|---|---|---|
| Abort, destructive | Scrub Red | `#E8402F` | Only Scrub and the abort action |
| Hold item | Hold Amber | `#FFAB3D` | Same value as Lamp Amber on purpose: a lamp left on |
| Confirmed, cleared, "copy" | Clear Green | `#1E9E5A` | Roll call punched in, Hold cleared, launch logged |
| Live, on air | ON AIR Orange | `#FF5A1F` | Same value as Hot Orange; the Request Line bulb |
| Information | Ink 900 / Ink 100 | | Never a colored info state |

### 3.6 Text contrast checks

WCAG 2.x relative-luminance ratios computed from the values above. Targets: 4.5:1 for text under 24 px regular or 19 px bold; 3:1 for large text and UI components.

| Text | Surface | Ratio | Verdict |
|---|---|---|---|
| Ink 900 | Paper | 17.24:1 | Body, light mode |
| Ink 500 | Paper | 6.17:1 | Secondary, light mode |
| Ink 900 | Cream | 16.92:1 | Manifest rows |
| Ink 500 | Cream | 6.05:1 | "last seen" lines |
| Ink 100 | Ink 900 | 14.48:1 | Body, dark mode |
| Ink 300 | Ink 900 | 7.84:1 | Secondary, dark mode; log lines |
| Ink 100 | Ink 800 | 12.96:1 | Dark cards |
| Liftoff White | T-12 Indigo | 14.92:1 | Phase names, credits |
| Liftoff White | Dress Blue | 7.37:1 | Phase name DRESS |
| Ink 900 | Manifest Gold | 10.19:1 | MANIFEST label, lyric captions |
| Liftoff White | Manifest Gold | 1.73:1 | Fails; white text is banned on gold |
| Ink 900 | Hot Orange | 5.82:1 | Small text on the DOOR sky |
| Liftoff White | Hot Orange | 3.02:1 | Large text only (the 96 pt DOOR label) |
| Liftoff White | Dusk Purple | 11.11:1 | Re-entry phase names |
| Ink 300 | Dusk Purple | 4.95:1 | Re-entry secondary |
| Ink 900 | Lamp Amber | 9.64:1 | BOOK label, Hold item |
| Ink 900 | Pilot Blue | 4.75:1 | Pilot disc |
| Ink 900 | Navigator Green | 6.73:1 | Navigator disc |
| Ink 900 | Cargo Yellow | 12.58:1 | Cargo disc |
| Ink 900 | Ground Crew Pink | 5.91:1 | Ground Crew disc |
| Ink 900 | Spare Teal | 7.39:1 | Spare disc |
| Ink 900 | Spare Violet | 5.57:1 | Spare disc |
| Ink 900 | Scrub Red | 4.50:1 | SCRUB label, bold 20 pt or larger |
| Liftoff White | Scrub Red | 3.91:1 | Large text only |
| Ink 900 | Clear Green | 5.27:1 | CLEARED stamp |
| Crew discs (six) | Ink 900 console | 4.75:1 to 12.58:1 | Every disc passes the 3:1 component rule |
| Manifest Gold | T-12 Indigo | 8.64:1 | Gold score columns on the resting sky |
| Hot Orange | T-12 Indigo | 4.94:1 | Horn marker on indigo |
| Lamp Amber | Dusk Purple | 6.09:1 | Hold tick on the Re-entry sky |

Two consequences: white text is banned on gold and amber, and the playhead cannot be a single color because Hot Orange on Manifest Gold is 1.75:1; it is a Liftoff White line with an Ink 900 edge (section 5).

### 3.7 Light and dark treatment

Sky, score, crew, semantic and character colors are identical in both modes: the sky is the sky. Only the chrome flips. Light: Paper background, Cream cards, Ink 900 text, Ink 500 secondary. Dark: Ink 900 background, Ink 800 cards, Ink 100 text, Ink 300 secondary. Every screen is tested at both ends of the iOS 27 translucency slider, "from ultraclear to fully tinted" (https://www.apple.com/gn/newsroom/2026/09/major-updates-for-apples-software-platforms-are-now-available/), and with the iOS 26.1 tinted option that increases glass opacity (https://support.apple.com/en-us/123075).

## 4. Typography

Three faces, all under the SIL Open Font License 1.1, which permits bundled copies to be used, embedded, redistributed and sold provided the font is not sold by itself and each copy carries its notice and license (https://openfontlicense.org/open-font-license-official-text/); Google Fonts confirms use "within a product that is sold commercially" and "in apps" (https://fonts.google.com/faq). Each family's `OFL.txt` ships beside the font files.

| Role | Face | Designer | License and proof | Specimen |
|---|---|---|---|---|
| Display | Anton, Regular 400 only | Vernon Adams | SIL OFL 1.1, "Copyright 2020 The Anton Project Authors" (https://raw.githubusercontent.com/google/fonts/main/ofl/anton/OFL.txt; https://raw.githubusercontent.com/google/fonts/main/ofl/anton/METADATA.pb) | https://fonts.google.com/specimen/Anton |
| Body | Fredoka, variable weight 300 to 700, width 75 to 125 | Milena Brandão, Hafontia | SIL OFL 1.1, "Copyright 2016 The Fredoka Project Authors" (https://raw.githubusercontent.com/google/fonts/main/ofl/fredoka/OFL.txt; https://raw.githubusercontent.com/google/fonts/main/ofl/fredoka/METADATA.pb) | https://fonts.google.com/specimen/Fredoka |
| Tabular | Space Mono, Regular, Italic, Bold, Bold Italic | Colophon Foundry | SIL OFL 1.1, "Copyright 2016 The Space Mono Project Authors" (https://raw.githubusercontent.com/google/fonts/main/ofl/spacemono/OFL.txt; https://raw.githubusercontent.com/google/fonts/main/ofl/spacemono/METADATA.pb) | https://fonts.google.com/specimen/Space+Mono |

**The pairing.** Anton is a condensed single-weight advertising sans (aesthetic digest); in caps with 0.06 em tracking it reads like gantry stencil lettering without imitating any agency, sounds like Augustine reading a checklist, and is the only face here that reads at 96 pt across a room without looking like a warning sign. Fredoka is round and heavy with a real weight range, which the HIG asks of a custom body face (implement Dynamic Type and Bold Text, avoid thin decorative faces, https://developer.apple.com/design/human-interface-guidelines/typography); its width axis lets a word tighten into a Dynamic Island slot. Space Mono is the printout: the mission log, bar counts, Hangar readouts and credits billing need aligned figures, and its squared geometry sounds like a 1970s teletype. Apple's SF fonts are not embedded ("You may not embed the Apple Font in any software programs or other products", https://developer.apple.com/fonts/) and SF Symbols appear only as in-app glyphs, never in the icon or logo (https://developer.apple.com/sf-symbols/). No Envato or Adobe font file ships in the binary (section 11).

### 4.1 Dynamic Type scale

Sizes are at the default Large content size; each style is registered with `Font.custom(_:size:relativeTo:)` so it scales with the user's setting. The HIG default is 17 pt and the minimum 11 pt (https://developer.apple.com/design/human-interface-guidelines/typography). Two custom tiers exist for the kitchen; they scale with Large Title but cap at 1.6x so a phase name never leaves the screen.

| Style | Face and weight | Size at Large | Relative to | Used for |
|---|---|---|---|---|
| Kitchen | Anton caps | 96 pt | Large Title (cap 1.6x) | Phase name on the live screen, StandBy, Hangar |
| Counter | Anton caps | 64 pt | Large Title (cap 1.6x) | T-minus on the Live Activity; screenshot captions |
| Large Title | Anton caps | 34 pt | Large Title | Screen titles, Paywall headline |
| Title 1 | Anton caps | 28 pt | Title 1 | Score section heads, End Credits title |
| Title 2 | Fredoka 600 | 22 pt | Title 2 | Card titles, crew names |
| Title 3 | Fredoka 600 | 20 pt | Title 3 | Request Line tile names |
| Headline | Fredoka 600 | 17 pt | Headline | Buttons, manifest items |
| Body | Fredoka 500 | 17 pt | Body | Reading text |
| Callout | Fredoka 500 | 16 pt | Callout | Lyric captions |
| Subhead | Fredoka 500 | 15 pt | Subheadline | "last seen" memory lines |
| Footnote | Fredoka 500 | 13 pt | Footnote | Patch labels, compact band labels |
| Caption 1 | Space Mono 400 | 12 pt | Caption 1 | Bar counts, log timestamps |
| Caption 2 | Space Mono 400 | 11 pt | Caption 2 | Hangar readouts; never smaller |
| Log | Space Mono 400 / 700 | 15 pt | Body | Mission log rows, Flight Review tables |

**Bold Text.** When the accessibility setting is on, Fredoka 500 and 600 become 700, Space Mono Regular becomes Bold, and Anton gains a 0.75 pt same-color stroke so a single-weight face visibly responds, as the HIG requires. Live Activities use Fredoka 600 or heavier throughout, per the HIG's "medium weight or higher" rule (https://developer.apple.com/design/human-interface-guidelines/live-activities).

## 5. The annotated score component

One SwiftUI component with four sizes (hero, standard, compact, strip) and four states. It always sits on a console strip of Ink 900 so the band colors read regardless of the sky behind it.

### 5.1 Anatomy, top to bottom

1. **Phase bands.** Contiguous rectangles whose widths are proportional to bar counts, filled with each phase's sky color: WAKE, DRESS, MANIFEST, DOOR, and a two-bar Liftoff White cap at T-0 (Re-entry: TIDY, TEETH, BOOK, LIGHTS). Labels in Anton caps, Footnote size at standard and Title 1 at hero; Ink 900 on gold, Liftoff White elsewhere. Band height 28 pt at hero, 16 standard, 8 compact, 4 strip.
2. **Waveform.** Not audio: one column per bar, height from the section map's intensity layer (calm, medium, intense at 40, 70 and 100 percent), so it reads as a plan and is identical every morning for the same arrangement. Columns 2 pt with 1 pt gaps at standard, filled with the band color; unplayed at 40 percent opacity, played at 100.
3. **Playhead.** A 3 pt Liftoff White line with a 1 pt Ink 900 edge each side and a small triangle at the top, so it reads on gold by its edge and on indigo by its core. It steps per bar under Reduce Motion and slides otherwise.
4. **Role-cue markers.** 12 pt crew discs on the top edge of the waveform at the bar where each stem punches in during the bridge; a walk-up cue is a bracket in the member's color spanning its two or three bars.
5. **The horn marker.** At the first bar of the final chorus: an original horn glyph (flared trapezoid bell on a short tube) in Hot Orange over a Liftoff White pill reading "shoes and door" in Fredoka 600, Ink 900. The only labeled marker, so the eye lands on it first.
6. **Nested Request Line segment.** The two-minute teeth song inside WAKE appears as a lighter inset band with tick marks at each 30-second quadrant switch.
7. **Hold tick.** A Lamp Amber tick at the bar where Gus reads the Hold item, with the day count in Space Mono at hero size only.

### 5.2 States

- **Scheduled.** Whole score at 40 percent, playhead parked left, an Anton tag "SCHEDULED". No digits.
- **Live.** Playhead advancing, played columns at 100 percent, current band label at full opacity and the rest at 70; the sky behind the console takes the current band's color.
- **Scrubbed.** From the scrub bar onward, bands and columns turn Ink 300 greyscale while the played part keeps its color; a Scrub Red "WEATHER" stamp in Anton, rotated minus six degrees, sits over the rest. The color-versus-greyscale grammar applied to a morning rather than a person.
- **Complete.** All columns lit, the T-0 cap on, a "CLEAN LAUNCH" tag and the bar count in Space Mono ("48 bars").

### 5.3 Where it appears

- **Onboarding.** Hero size, full width, waveform 120 pt tall, three callouts on 1 pt leader lines: "phases, not minutes", "the manifest, sung by Gus", "horns mean shoes and door".
- **Live Activity.** Lock Screen: strip size under the phase name, playhead only. Dynamic Island expanded: compact size with playhead; compact leading: a band-color chip with the phase initial; compact trailing: the T-minus digits; minimal: the chip. Live Activities render on the Lock Screen, in the Dynamic Island and in StandBy with compact, minimal, expanded and Lock Screen presentations (https://developer.apple.com/design/human-interface-guidelines/live-activities).
- **StandBy.** The Live Activity's custom background color extends full screen in StandBy (same HIG page), so the sky fills the display with the phase name at Kitchen size and the compact score across the bottom.
- **End Credits card.** The complete or scrubbed state at strip size along the card's bottom edge as the day's receipt.

## 6. Character art direction

**Rules.** Hard-shaped flat cutouts: one silhouette and one signature color each, one prop, faces and hands in Suit Cream, no outlines in-app, no paper grain, no cutout jitter, no mitten hands (WINNER.md). Hands are a wedge with a separate thumb so gestures read at 32 pt; eyes are two Ink 900 dots; mouths are one stroke that changes only on the beat. The lanky, loose line of Bob's Burgers and the uniform-body economy of South Park are the energy borrowed (aesthetic digest); the only outline treatment allowed is the End Credits card's black-outline-on-white share variant, a genre convention rather than a property. Every character must read at 32 pt on the console and at 400 pt on the Hangar.

| Character | Silhouette (what you would recognise in solid black) | Signature color and prop |
|---|---|---|
| Augustine Pell, Flight Director | Tall, narrow, absolutely vertical; a square-shouldered jacket that reads as one rectangle; hair a single swept wedge; a headset boom as one straight diagonal. She never leans. | Director Navy; a clipboard held flat against the chest |
| Gus Marchetti, Janitor and Payload Specialist | Wide and low; rounded shoulders; coveralls as one soft trapezoid; a flat cap overhanging the face; the biggest hands in the cast; the only relaxed posture. | Coverall Olive; a keyring at the hip with three keys that jingle on the bar |
| Dr. Ines Farrago, Meteorologist | Small and high-waisted; a long coat flaring like a bell; hair a tall unruly cloud; carries a bent umbrella in perfect weather. Specific and proud, never dim (WINNER.md, tone risk). | Storm Violet lining and umbrella |
| Bunny Kowalczyk, Countdown Announcer | Long and languid; a tuxedo with one exaggerated lapel and a single sequined shoulder line; reclines on the console, one ankle crossed. Appears only under dusk and amber. | Velvet Plum; a chrome stand microphone on a very thin stalk |
| Lionel Abara, CAPCOM | Medium height, seated whenever possible, headset larger than his head, one hand raised in a two-finger "copy". | Copy Cyan headset and tie |
| Scrub, abort robot | Toddler-sized: a squat cylinder on two stub feet, no arms, a domed head half the body height, one big round chest button. Drawable in five strokes. | Overcast Grey; Scrub Red button with a Suit Cream ring (3.61:1 against the red) |

**Similarity check rule.** Before a character ships, its silhouette is filled black, exported at 64 and 512 pt, and reviewed against a written list of well-known cartoon characters in its category (famous animated robots, especially the squat one-eyed and the inflatable ones; animated janitors and handymen; bumbling weather presenters; lounge singers and announcers). Two people outside the project are asked "who is this?"; a confident answer naming an existing character sends it back. A reverse image search on the silhouette is archived with the date, and names are grepped against real public figures (WINNER.md).

**Authorship rule.** Every character is drawn by the developer or a commissioned artist under a written assignment of rights. No character, patch or icon is assembled from stock parts, including the Envato character kits in section 11, which are reference only (WINNER.md). This is also what makes the cast defensible when the audio layer is not.

## 7. Crew patches and the app icon

### 7.1 Patch geometry

Bold circular badges in each member's color (WINNER.md). At the 96 pt master: a 96 pt disc in the crew color; an 8 pt Liftoff White ring inset 6 pt so the disc shows outside it like a woven border; a 44 pt Ink 900 glyph (section 3.2) centred; the name in Fredoka 600 Footnote beneath, on the console. No stitching, no shadow. Sizes: 96 (roll-call console), 56 (crew picker), 32 (score markers, log), 12 (role-cue dots). States: idle (disc at 60 percent, no ring), punched in (100 percent, ring and glyph on), missed (disc Ink 300, glyph Ink 500), walk-up (ring pulses once over one bar). A solo user is Pilot, Ground Crew and audience (WINNER.md), so the Pilot patch alone must look complete.

### 7.2 iOS 26 icon variants

The icon is one layered `.icon` file from Icon Composer, which "lets you create layered icons out of Liquid Glass from a single design for iPhone, iPad, Mac, and Apple Watch" with Default, Dark and Mono rendering modes (https://developer.apple.com/icon-composer/). Xcode "uses [the .icon file] to generate all the icon variants it needs", the App Icon Set Name must match the file name, and a legacy asset-catalog icon is kept because "Icon Composer icons back deploy to older versions of iOS ... with inconsistent rendering" (https://useyourloaf.com/blog/adding-icon-composer-icons-to-xcode/). The layout is a 1024 by 1024 square with no rounded corners ("let the operating system apply its mask"), and the system produces default, dark, clear light, clear dark, tinted light and tinted dark outcomes (https://www.applaunchflow.com/blog/ios-26-app-icon-sizes-variants). Three layers at most: background, mid-ground, foreground, exported as fully opaque SVGs. Every concept is checked as a single black silhouette before it is colored.

### 7.3 Three icon concepts

**A. Doorhorn (recommended).** Background: T-12 Indigo full square. Mid layer: a door as a Liftoff White rounded rectangle on the left 55 percent of the canvas, ajar, its right edge angled 12 degrees so a 60 pt wedge of Manifest Gold light spills from the gap. Foreground: a horn bell (flared trapezoid, 380 pt at the mouth, 140 pt at the throat) in Hot Orange bursting rightward from the gap, with three Liftoff White sound bars stacked beside it. Dark: indigo deepens to Ink 900, the door becomes Ink 100. Tinted and clear: door and horn merge into one opaque silhouette on the mono layer and the sound bars are dropped. Reads at 29 pt because it is two large shapes, and it avoids a rocket, which WINNER.md warns maps App Store search to rocket trackers.

**B. Four Bands.** Background: T-12 Indigo. Mid layer: four vertical bands (indigo, Dress Blue, gold, orange) at 22, 18, 35 and 25 percent of width with an 8 percent Liftoff White cap at the right. Foreground: the horn glyph in Liftoff White at the gold-orange seam with a 3 pt playhead. The score as an icon; strong in the store, weaker at 29 pt where bands become stripes. Shipped as the alternate icon offered by the unlock.

**C. The Patch.** Background: Ink 900. Mid layer: a 760 pt Manifest Gold disc with a 56 pt Liftoff White inner ring. Foreground: the horn glyph in Ink 900 at 380 pt. Reads as the household's badge; the risk is resembling club and sports apps, so it is the fallback and the mission-log empty-state art.

## 8. Screen-by-screen design

Layouts are top to bottom, iPhone portrait. System glass chrome is untinted and not re-described.

**8.1 Onboarding score screen.** Sky T-12 Indigo. Top third: Large Title "The song is the schedule." in Liftoff White. Middle: the hero score with its three callouts. Below: "When do you need to be out the door?" and a wheel picker defaulting to 7:40 (the one place a wall-clock time is set). Bottom: the single tinted button "Test fire (60 seconds)". *Must communicate:* this is a score, not a timer, in five seconds. *Motion:* bands draw in left to right over one bar of the station ID, which fades up over eight bars (WINNER.md); the playhead does not move here.

**8.2 Test Fire.** The live screen compressed: the sky runs the whole phase sequence in sixty seconds. Phase name at Kitchen size; the standard score across the lower third with the horn marker; where Scrub normally sits, a Liftoff White door button (140 by 200 pt with a handle dot) labeled "Tap the door". No Scrub. *Must communicate:* when the horns come in and you tap the door, the fanfare fires; that is the product. *Copy:* WAKE, DRESS, MANIFEST, DOOR; Gus's demo manifest caption ending "and your keys, wherever they are"; on tap, "CLEAN LAUNCH". Then two optional questions, "Who's launching?" (add names to patches, or Skip) and "Play tomorrow on a speaker?" (AirPlay picker), closing with "Tomorrow at 7:28, Augustine will call it. You don't need to open the app." and the three free Request Line tiles. *Motion:* sky crossfades on each phase downbeat over one bar; the door lifts 8 pt when the horns enter; the liftoff flash on tap.

**8.3 Launch live screen.** Sky in the current phase color, full bleed. Top: the launch tower silhouette in Ink 900 (40 percent of screen height) rising from a counter edge line. Centre: the phase name at Kitchen size. Beneath it, one lyric caption line during the bridge only. Lower third: the console strip holding the standard score, the roll-call row of 96 pt patches, and the Scrub button (a 72 pt Scrub Red disc with a Suit Cream ring, "SCRUB" in Ink 900 beneath). Nothing else. *Must communicate:* which phase we are in, from across the kitchen. *Copy:* phase names; "Roll call" during the bridge; "Scrub". *Motion:* all on bar boundaries; a patch tap lights its ring on the next bar as its stem punches in; at T-0 every patch lights together and the flash fires; tower windows light one row per bar through the final chorus.

**8.4 Lock Screen Live Activity and Dynamic Island.** Lock Screen: background in the current sky color; left, the phase name in Anton Title 1; right, T-minus at Counter size, the product's only countdown digits, derived from playback position rather than the wall clock (WINNER.md); bottom edge, the strip score with playhead; the parent's own patch at 32 pt. Dynamic Island: compact leading a band-color chip with the phase initial; compact trailing T-minus in Space Mono Bold; minimal the chip; expanded the compact score, phase name, T-minus and a Scrub button on the trailing edge. For the Request Line the Island shows the ON AIR bulb leading and a shrinking vinyl disc trailing that loses radius as the song plays, replacing any countdown (WINNER.md). *Must communicate:* phase and time to door for the one adult allowed digits. *Copy:* phase name; "T-7:20"; "ON AIR". *Motion:* text changes on the bar; the vinyl shrinks continuously, or steps every 10 percent under Reduce Motion.

**8.5 StandBy Hangar mode.** Landscape, full screen, overnight before the launch. Top 60 percent: a color-bars test pattern of eight vertical bars in sky order (indigo, Dress Blue, gold, orange, Liftoff White, dusk, amber, Ink 900). Below, on Ink 900: the tower silhouette in Ink 700 with one Lamp Amber window lit; bottom left "HANGAR" in Anton Title 1 over "Launch window opens 7:28" in Space Mono Caption 2 (a scheduled time in words, permitted); bottom right, tonight's End Credits card at 25 percent. During the launch, StandBy becomes the Live Activity's full-screen sky. *Must communicate:* the station is on the air and knows about tomorrow. *Motion:* the bars are static; every 64 bars the lit window moves one floor; under StandBy Night Mode the pattern survives red tinting because it is shape, not hue.

**8.6 Request Line tiles.** Paper chrome, title "Request Line". A two-column grid of square Cream tiles, each with an original Ink 900 pictogram (toothbrush, microwave, kettle, shower head), the name in Title 3, and the song length printed like a track length on a record sleeve in Space Mono ("2:00"), a static label rather than a countdown. Free tiles (teeth 2:00, microwave 1:30, kettle 3:00) first; locked tiles (shower 5:00, 1:00, 10:00, flavors) at 60 percent with a patch-shaped lock. Footer: "Also on the widget, Shortcuts, the Action Button and NFC tags." *Must communicate:* songs exactly as long as the boring waits, cues sung in. *Copy:* "Teeth, 2:00, quadrants sung in"; "Shower, 5:00, rinse bridge at 4:30". *Motion:* a tap lights the ON AIR bulb in the tile corner on the next beat; the pictogram does one squash-and-stretch on the downbeat, never a loop.

**8.7 Manifest editor with the Hold item.** A Cream clipboard page under a Manifest Gold header, "Tomorrow's manifest" in Anton, Ink 900. Rows in Fredoka Headline with a Subhead memory line ("keys, last seen kitchen counter"; "library book, due Thursday"); rows reorder and swipe to remove using iOS 27's `.reorderable()` and swipe actions (https://appcircle.io/blog/wwdc26-whats-new-in-swiftui). At the bottom, the single Hold row on a Lamp Amber field: the label ("dentist call"), the day count in Space Mono Bold ("day 23"), the field growing 1 pt taller per day to a cap at day 30 (WINNER.md), and two verbs, "Clear" (Clear Green) and "Amnesty" (Ink 500). Add field at top: "What's going out the door?" Footer: "Gus reads this in the bridge. Edit it any time tonight." *Must communicate:* Gus will sing exactly this tomorrow, including the thing you keep not doing, without judgment. *Motion:* Clear plays the victory sting and collapses the amber field over one bar; Amnesty fades it to Ink 300 with "Declared dead of natural causes."

**8.8 Crew and walk-up picker.** Ink 900 chrome, because this is a console. Title "Crew". Four role slots at 96 pt (Pilot, Navigator, Cargo, Ground Crew) with two spares behind a "+"; each slot has the patch, a name field and the walk-up cue picker, five pills (mariachi, surf, marching band, big band, lullaby) that play a five-second preview on tap. Note: "Pass the phone. Everyone taps their own patch during the bridge." *Must communicate:* a role is a color, a patch, a five-second cue and a stem; the reluctant partner's on-ramp is "I want the mariachi one" (WINNER.md). *Motion:* choosing a cue lights the ring for one bar while the cue plays over a crossfaded stem preview.

**8.9 Re-entry.** The live screen mirrored: sky Dusk Purple, then Lamp Amber, then Ink 900; TIDY, TEETH, BOOK, LIGHTS at Kitchen size; the tower with windows going out one row per bar; the standard score with the descending-tempo waveform visibly widening as bars lengthen; no roll call; a single Ink 100 "Lights" button that Bunny calls "splashdown". *Must communicate:* the day ends on a hard boundary and the house goes dark. *Copy:* phase names; Bunny's caption during BOOK; on the final bar only "SPLASHDOWN" in Anton on Ink 900. *Motion:* sky crossfades over two bars because the tempo is slower; every element fades to 20 percent over the last four bars; the buzzer bar is a hard cut to Ink 900.

**8.10 End Credits card and clothesline widget.** The card is 3:4 portrait on T-12 Indigo with the lit tower in Ink 900 and Manifest Gold windows; "END CREDITS" in Anton Title 1, the date in Space Mono, then billing in Space Mono largest first ("Top billing: Sam, who remembered the photo money"), the guest star with the best line, one written joke in Fredoka Body, and the strip score along the bottom as the receipt; no numbers, no percentages (WINNER.md). The share sheet offers a black-outline-on-white variant. Widget, medium: a Liftoff White line with seven folded cards pegged to it, oldest left, today largest, scrub days in Ink 300 greyscale; small: today's card. *Must communicate:* the day happened, someone carried it, and it was a joke rather than a score. *Copy:* empty state "No launch today. Weather." *Motion:* the card rolls up over four bars while the credits are sung; a new card swings once on its peg when it arrives, never again.

**8.11 Mission Log.** Light chrome. Header: the rolling rating in Anton Title 1, "On time 42 of 50 launches", with no streak anywhere. A list in Space Mono Log size: date, flavor, bars ("48 bars"), result stamp (CLEAN in Clear Green, WEATHER in Scrub Red, LOUNGE in Ink 500), top-billed name. Yesterday's row carries "Fix yesterday" because yesterday is always correctable (WINNER.md); free shows thirty days, the unlock ninety. *Must communicate:* ratings, not streaks; a bad week dips and never resets. *Copy:* "Scrubs count as weather, not failure." *Motion:* none beyond the system list; a corrected stamp changes on a beat with a tap sound.

**8.12 Sunday Flight Review.** A two-minute review played as a track. Screen: a seven-column strip of the week's cards in color, scrubs greyscale; the tower at top with one window lit per clean launch; beneath, the crew's three notes in Fredoka Body attributed by patch (Farrago's forecast, wrong in a new way; Lionel's copy count; Gus's manifest note); a "Lounge" toggle for mornings with nowhere to be. *Must communicate:* the week as a picture, commented on, never graded. *Copy:* "Flight Review, week 38"; "Next week's first launch: Monday, 7:28." *Motion:* the cards deal onto the strip one per bar.

**8.13 Paywall.** T-12 Indigo with the tower fully lit. Large Title "One purchase. Everything." Two columns, "Free, complete" and "Unlock, $9.99 once", listing exactly what WINNER.md lists (free: one flavor at 10 and 12 minutes, one Re-entry track, the manifest with the Hold item, Scrub and the log, Test Fire, three Request Line songs; unlock: every flavor and duration, crew roles with walk-up cues and the Stem Roll Call, the full Request Line, End Credits card and clothesline widget, ninety-day log and Flight Review, weekend lounge and Hangar, household sharing when it ships). One tinted button "Unlock for $9.99", a text button "Restore purchases". Footer: "No subscription. No ads. No accounts. No streaks to lose. Seasonal flavors are free updates." *Must communicate:* the price and the absence of everything people resent. *Motion:* window rows light one per bar over the station ID sting; nothing pulses, nothing counts down.

## 9. Motion

**Bar quantization.** Every duration is written in beats and bars and resolved from the track's locked BPM: at 120 BPM a bar is 2.0 s, at 96 BPM 2.5 s; Re-entry descends roughly 20 BPM over twenty minutes (WINNER.md), so the interface slows with the music. Taps are acknowledged at once by a twelve-variant micro tap sound (the Not Boring technique, aesthetic digest) and a 2 pt press; their visual consequence lands on the next bar.

**Sky shift.** On the phase downbeat the sky crossfades to the next color over one bar (two in Re-entry). The phase name cuts rather than fades: the old word drops 24 pt and out over one beat, the new word is present on the downbeat. Tower windows light one row per bar in the final chorus.

**Liftoff flash.** At T-0: cut to Liftoff White for one beat, hold one beat, settle over two bars to the resting chrome with "CLEAN LAUNCH" already on screen. Fanfare and flash share the bar.

**Reduced motion and bright effects.** With Reduce Motion: hard cuts on the downbeat instead of crossfades, the playhead steps per bar, the vinyl steps per 10 percent, the credits card appears in place, pictograms do not squash. With Reduce Bright Effects, added in iOS 26.4 alongside more reliable Reduce Motion for Liquid Glass (https://support.apple.com/en-us/123075): the flash becomes a 300 ms rise to Liftoff White at 60 percent opacity and the Scrub stamp does not slam. Both settings are read every launch.

**Liquid Glass coexistence.** Glass belongs to the navigation layer, never on glass, tinted only for the primary action, with color in the content layer (https://developer.apple.com/videos/play/wwdc2025/219/); shapes nest with concentric corner radii and hierarchy comes from layout rather than decorative bar backgrounds (https://developer.apple.com/videos/play/wwdc2025/356/). Doorhorn never paints a nav or tab bar, since the iOS 27 breakage points are custom bar backgrounds and layouts pinned to the old tab-bar safe area (https://byteiota.com/ios-27-makes-liquid-glass-mandatory-act-before-april-2027/); it uses `Tab(role: .prominent)` for Launch and toolbar minimisation on the live screen (https://appcircle.io/blog/wwdc26-whats-new-in-swiftui), and keeps the console strip opaque so the glass above has something flat to refract. Custom Metal effects are limited to the flash.

## 10. App Store screenshot storyboard

Ten portrait screenshots at 1320 by 2868 px for the 6.9-inch display, PNG or JPEG without alpha, the maximum of ten per localization (https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications). Captions are Anton over the sky of the screen shown; each is a real screen, not a device-frame mockup.

| # | Caption | On screen | Point it proves for the reviewer |
|---|---|---|---|
| 1 | The song is the schedule. | The onboarding hero score: phase bands, waveform, role-cue markers, the horn labeled "shoes and door" | An authored section map, not a timer (4.3(b)) |
| 2 | Horns mean shoes and door. | Live screen in DOOR, sky Hot Orange, playhead on the horn, four patches lit | The music is the cue; nobody looks at a screen |
| 3 | Gus sings your manifest. | Manifest editor with memory lines and the caption "keys last seen kitchen counter" | Household data becomes in-song lyrics |
| 4 | One Hold item. It ages. | The Hold row at day 23 with Clear and Amnesty | A blameless mechanic no checklist app has |
| 5 | Your crew, your stems. | Crew picker with four named patches and cue pills | Roles, colors and stems; household mode without accounts |
| 6 | Bad morning? Scrub. Weather. | The scrubbed score with the WEATHER stamp and Scrub at 400 pt | No streaks, no penalty, shorter track tomorrow |
| 7 | Songs exactly as long as teeth. | Request Line tiles: Teeth 2:00, Microwave 1:30, Kettle 3:00, Shower 5:00 | Daily value for solo users; not a kids' timer |
| 8 | Re-entry ends the day. | Re-entry in BOOK, Lamp Amber, windows going out | The same grammar at night; a second daily anchor |
| 9 | End Credits, sung nightly. | The End Credits card beside the clothesline widget | A shareable artifact from real data, no scores |
| 10 | One purchase. No subscription. | The paywall, both columns legible | Small Business Program pricing; no dark patterns |

## 11. Envato Elements shortlist

### 11.1 License position, plainly

Under the Envato Elements license (last revised 8 December 2025) a download creates a single-use commercial license for one End Product; one license covers one software product "so long as the Item is only hosted in or on one software product and you are not giving users access to the underlying Item" (https://help.elements.envato.com/hc/en-us/articles/360000629346-Envato-Elements-License-FAQ), and it becomes perpetual only if the app is completed while the subscription is active (https://help.elements.envato.com/hc/en-us/articles/360000628966-Envato-Elements-License). Three rules follow:

- **Usable in the shipped app: textures, UI scaffolding, sound effects**, compiled into asset catalogs and bundled audio so users cannot extract them (clause 12(e), https://help.elements.envato.com/hc/en-us/articles/360000621803-Prohibited-Usage-of-Envato-Items). Sound effects are cleared even for broadcast (License FAQ, above). Nothing from Envato may feed a user-customisation feature such as a card maker (clause 12(c), same FAQ), which is why the End Credits card is generated from the developer's own art.
- **Reference only, never in the app: characters and icons.** WINNER.md's rule is that no character, patch or icon is built from stock art, and clause 12(f) bars trademark claims over an Envato item inside a logo (License FAQ), which would poison the app icon.
- **Fonts: marketing only.** Fonts are licensed per device to the subscriber and clause 13(d)(ii) says you cannot "incorporate or distribute the Font or Add-on within an End Product" (License, above); the web-font carve-out is written for websites and excludes products that let users create new text. Envato faces may be rasterised into the icon, wordmark and screenshots; runtime text uses section 4. Adobe Fonts carry the same restriction (https://helpx.adobe.com/fonts/using/font-licensing.html).

Keep the named license certificate for every item and archive item-page screenshots: authors can withdraw items, and App Review 5.2.1 requires that you own or have licensed everything in the app (https://developer.apple.com/app-store/review/guidelines/).

### 11.2 Sourced items (verified live by the digest, 24 September 2026)

| Item | URL | What it is | Doorhorn use | License caveat |
|---|---|---|---|---|
| Menu Pack iOS UI Kit (uibundlecom) | https://elements.envato.com/menu-pack-ios-ui-kit-EC6RYUH | 4 iOS templates, 520+ icons, Figma/XD/PSD/Sketch | Scaffolding for settings, crew picker, paywall, re-skinned in section 3 tokens | Usable as integrated scaffolding; check bundled "free fonts" (clauses 16 to 18); its icons are reference only |
| Mobile Design System (uiuxassets) | https://elements.envato.com/mobile-design-system-J47A58 | 250+ symbols, 14 chart styles, Sketch/Figma | Chart primitives for the log rating and Flight Review strip | Bundles Google Material Icons under their own license; do not ship those |
| Game Mobile App (Vktr__Supply) | https://elements.envato.com/game-mobile-app-2MVVT2C | Game-style mobile UI kit | Layout reference for the Request Line grid and lock states | Art is reference only; layout patterns may be reused |
| Multipurpose Casual Game UI Kit (anchor_point_heshan) | https://elements.envato.com/multipurpose-casual-game-ui-kit-9TFRVCG | Layered PSD popups, buttons, panels | Dialog scaffolding for Scrub confirmation and Hold amnesty | Usable if fully re-colored and compiled; linked fonts are not ours to ship |
| UI elements for game design (Sensvector) | https://elements.envato.com/ui-elements-for-game-design-icons-and-menu-XVWTCL9 | Flat vector HUD pieces | Reference for band and progress geometry | Reference only (icons) |
| Colorful Game Icons (nimart1) | https://elements.envato.com/colorful-game-icons-F5859C | 21 tiered icons | Reference for how a badge changes across levels | Reference only |
| Vibrant iOS Icon Set (creativevip) | https://elements.envato.com/vibrant-ios-icon-set-TNTCGY | Bright iOS-style icons | Reference for saturated iOS-native iconography | Reference only |
| Character Creation Kit (AnnaIvanir) | https://elements.envato.com/character-creation-kit-7XN3YY | Modular vector faces, hair, outfits | Study of proportion systems while drawing the cast; nothing traced | Reference only (WINNER.md; clause 12(c) if user-facing) |
| Vector Characters Builder (bestwebsoft) | https://elements.envato.com/vector-characters-builder-QZK7BG | 50+ modular character parts | As above | Reference only |
| Character & Monster Creation Kit (RZDESIGN) | https://elements.envato.com/character-monster-creation-kit-DKGVJ2 | Cartoon monster parts | Not used; Scrub is drawn from scratch | Reference only |
| Superhero Mascot Character Pack (Blankids) | https://elements.envato.com/superhero-mascot-character-pack-TGF3RWE | Mascot with franchise-adjacent tags | Skip | Do not use; Apple 5.2.1 liability regardless of Envato's license |
| 3D Illustration Characters Kit (Krafted) | https://elements.envato.com/3d-illustration-characters-kit-ZXFDLEM | Figma-native 3D characters | Not used; off style | Reference only |
| Comic Speech Bubbles (alexdndz) | https://elements.envato.com/comic-speech-bubbles-CZ47MLA | 16 SVG/PNG bubbles | Social cards; a bubble shape for lyric captions if redrawn in Ink and Cream | Usable in-app only as a compiled graphic; the words on them are not ours |
| Halftone Texture Pack Background (Mihis_Design) | https://elements.envato.com/halftone-texture-pack-background-A4PK9G | 15 vector halftones | 6 percent halftone over the credits share render and screenshots; never over the sky in-app | Usable as a compiled texture |
| Fun Stickers (uicreativenet) | https://elements.envato.com/fun-stickers-JDZ4GAE | Bold-outline stickers | Line-weight reference for the outline credits variant | Reference only |
| Comic Cartoon Sticker Set (TotallypicRF) | https://elements.envato.com/comic-cartoon-sticker-set-ARFTHSD | Patch-badge stickers | Reference for patch ring proportions | Reference only |
| Emoji Vector Set (wowomnom) | https://elements.envato.com/emoji-vector-set-72JE9ZH | 12 vector emoticons | Not used; the cast carries reactions | Reference only |
| Comic Toopia (simetro) | https://elements.envato.com/comic-toopia-playful-comic-display-font-3AK877J | Comic display font | Wordmark exploration, rasterised | Marketing only; never in the binary (clause 13) |
| Kartooni (Tokokoo) | https://elements.envato.com/kartooni-cartoon-comic-font-6FTEGVY | Rounded cartoon font | Screenshot captions if Anton tests too severe | Marketing only |
| Mokupoku (AnnoraStudio) | https://elements.envato.com/mokupoku-playful-cartoon-display-font-ZEVB8HD | Playful display font | Logo exploration | Marketing only |
| Breaking The Comic (Gassstype) | https://elements.envato.com/breaking-the-comic-bold-playful-comic-font-JGHU4BF | Bold comic font | Poster-weight social title cards | Marketing only |
| Tricky Jimmy (Tokokoo) | https://elements.envato.com/tricky-jimmy-comic-cartoon-font-KTA3AUQ | Chunky rounded font | Social captions | Marketing only |
| Mobile Game App Pack (GameChestAudio) | https://elements.envato.com/mobile-game-app-pack-FYHH4PZ | 15 UI sound clips | The micro tap pool, pitched into twelve variants in-house | Usable; the least constrained category |
| Cartoon Bloopers Sound Pack (applehillstudios) | https://elements.envato.com/cartoon-funny-bloopers-pack-KHAACYF | 20 slapstick clips | Farrago's forecast punctuation in Request Line bits | Usable |
| Funny Cartoon Voice & Sounds Pack (applehillstudios) | https://elements.envato.com/funny-cartoon-voice-sounds-pack-X2SV73G | 10 cartoon voice clips; laughs at https://elements.envato.com/cartoon-laugh-pack-X7P2EMG | Scrub's non-verbal noises only; the cast's lines are written and produced by the developer | Usable |
| 8 Bit Game Interface Sound Pack (moonlight_sounds) | https://elements.envato.com/8-bit-game-interface-sound-pack-SWHE3XW | 50 retro interface clips | Hangar blips, log edit confirmations | Usable |
| iOS 16 App Icon Template (itefan) | https://elements.envato.com/ios-16-app-icon-template-LW8Q24G | Layered PSD icon mockup | Store-preview mockups of the three icon concepts | Usable as a tool; Icon Composer ships the real icon |
| iOS Icon Template, All Sizes (ForesightThemes) | https://elements.envato.com/ios-icon-template-all-sizes-Z73DRK | Sketch template for every Xcode icon size | Legacy `AppIcon.appiconset` fallback export | Usable as a tool |

### 11.3 Further searches

Envato's search pages return 403 to automated fetches, so these follow the `https://elements.envato.com/<kind>/<query-slug>` form and were not opened from this session. Poster, badge and patch results are geometry references to be redrawn; texture and sound-effect results may ship; font results are marketing only.

- https://elements.envato.com/graphic-templates/ios-ui-kit
- https://elements.envato.com/graphic-templates/mobile-app-ui-kit
- https://elements.envato.com/graphics/halftone-texture
- https://elements.envato.com/graphics/halftone-pattern
- https://elements.envato.com/graphic-templates/retro-poster
- https://elements.envato.com/graphic-templates/space-poster
- https://elements.envato.com/graphics/circular-badge
- https://elements.envato.com/graphic-templates/badge-logo
- https://elements.envato.com/graphics/embroidered-patch
- https://elements.envato.com/graphic-templates/app-store-screenshot
- https://elements.envato.com/sound-effects/cartoon
- https://elements.envato.com/sound-effects/kazoo
- https://elements.envato.com/sound-effects/klaxon
- https://elements.envato.com/sound-effects/buzzer
- https://elements.envato.com/sound-effects/toy-piano
- https://elements.envato.com/fonts/display
- https://elements.envato.com/fonts/condensed

## 12. Production plan with the connected tools

**Figma: library and screens.** One file, `Doorhorn Design System`, with variables for every token in section 3 (Light and Dark modes for the neutrals; skies, crew, character and semantic colors mode-independent) and text styles for every row of the Dynamic Type table. Components with variants: `Sky` (eight fills), `Score` (four sizes by four states), `PhaseBand`, `RoleCueMarker`, `HornMarker`, `Playhead`, `CrewPatch` (six colors by four sizes by four states), `ConsoleStrip`, `ScrubButton`, `RequestTile` (free, locked, on air), `ManifestRow`, `HoldRow` (day 1 to 30 as a property), `CreditsCard` (indigo and outline), `ClotheslineWidget` (small, medium), `HangarBars`, `Tower` (lit rows as a property). Characters are a separate page of pen-tool vector components with pose variants, never imported from a kit. System chrome comes from Apple's iOS and iPadOS 27 Figma design kit of 23 June 2026 (https://developer.apple.com/news/). A screens page holds the thirteen screens of section 8 at 402 by 874 pt in light and dark, plus Live Activity, StandBy and widget frames. Prototype the launch with Smart Animate and bar-timed delays (2,000 ms at 120 BPM) so the reluctant-partner playtest runs on a phone before code exists.

**Adobe Express or Canva: screenshots and social cards.** Screenshots are composed at 1320 by 2868 px from exported Figma frames with Anton captions (or an Envato display face rasterised, which the Envato license permits for designs made with the font) and the halftone over the caption area only; export PNG without alpha (Apple's specification above). Social cards at 1080 by 1080 and 1080 by 1920 on T-12 Indigo with the tower and one storyboard line. The End Credits card is never produced here, because the shipped card is generated in-app from the developer's own art. Both tools' brand kits carry the section 3 hex values.

**Exporting for Xcode.**

- *Colors.* `Colors.xcassets` with one color set per token, namespaced by folder (`sky/t12Indigo`, `crew/pilotBlue`, `ink/900`, `semantic/scrubRed`); neutrals carry Any and Dark appearances, everything else Any only.
- *Vector art.* Characters, patches, glyphs, the tower and pictograms export from Figma as SVG, convert to PDF and enter single-scale image sets with Preserve Vector Data on, named `character/gus/idle`, `patch/pilot`, `glyph/horn`. Raster textures export at 1x, 2x and 3x PNG into one image set, the standard imageset structure for iOS bitmaps (https://image-toolkit.com/guides/ios-xcode-imageset-guide).
- *App icon.* `AppIcon.icon` from Icon Composer, dragged into the project with the App Icon Set Name matching the file name (https://useyourloaf.com/blog/adding-icon-composer-icons-to-xcode/), plus a legacy `AppIcon.appiconset` set to Single Size with the 1024 by 1024 flattened export, "a single slot for a 1024×1024 point image that the system resizes as needed" (https://useyourloaf.com/blog/xcode-14-single-size-app-icon/). The `.appiconset` folder holds PNGs and a required `Contents.json` whose `images` entries carry `idiom`, `size`, `scale` and `filename` (https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/AppIconType.html). The alternate icon (concept B) ships as `AppIcon-FourBands`.
- *Fonts.* `Anton-Regular.ttf`, `Fredoka[wdth,wght].ttf` and the four Space Mono files under `Fonts/` with their `OFL.txt` files, listed under "Fonts provided by application"; no Envato or Adobe font file anywhere in the target.
- *Audio.* Envato sound effects as bundled CAF beside the Suno-derived stems, never as browsable loose files.
- *Widgets and Live Activity.* One shared asset catalog with target membership for the app, the widget extension and the Live Activity so the strip score and the patches are one source.

## 13. Open questions

1. **Name and mark.** Every candidate name is unverified against trademark and App Store availability (WINNER.md); the wordmark waits for the name, and icon concept A only works for a name with a horn or a door in it.
2. **Dress Blue.** This document's addition; WINNER.md moves straight from indigo to gold. Confirm in the first Test Fire whether the visible climb helps.
3. **Anton under Bold Text.** The 0.75 pt stroke is a workaround for a single-weight face; if a true bold is required, Oswald (OFL, multiple weights) is the fallback display face.
4. **Apple pages not fetched.** The HIG App Icons page and the Icon Composer developer article did not render for this session, so the six-outcome list and the 1024 no-corner rule are cited from a third-party guide and should be re-read on developer.apple.com before the icon is finalised. The HIG Widgets page did not render in the digest's session either, so widget rendering modes are unconfirmed.
5. **Liftoff White on Hot Orange at 3.02:1.** The DOOR label passes only as large text; under Increased Contrast it should switch to Ink 900 (5.82:1). Decide whether to switch always.
6. **Envato search links** are unverified from this session (403); open them by hand before relying on a category.
7. **Live Activity digits.** T-minus is derived from playback position (WINNER.md); confirm that a `Text(timerInterval:)` countdown can be driven that way, or render the digits from the bar counter.
8. **Household sharing.** When CloudKit share ships, whether a non-parent member's Live Activity shows digits or only phase and patch is a product decision this document leaves at "parent only".
