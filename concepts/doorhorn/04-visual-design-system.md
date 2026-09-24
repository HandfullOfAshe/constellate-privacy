# Doorhorn (working title): visual design system, screen designs and Envato shortlist

Document 04 of the product package. 24 September 2026. Source of truth for the world, cast and features is `concepts/tournament/WINNER.md`; design-context facts come from the aesthetic and Envato research digests and from the fresh fetches cited inline.

**Summary.** Doorhorn is a deadpan mission-control comedy that runs a household's morning launch and bedtime re-entry through music, and its interface has one job: make a piece of music legible as a plan from across a kitchen at 6:58 a.m. This document fixes the visual system (sky, crew and character color; type; the annotated score component; characters, patches and icon), specifies every screen, storyboards the App Store screenshots, states what may and may not come from Envato Elements, and gives the production plan for Figma, Adobe Express or Canva, and Xcode.

## 1. How to read this document

Sections 2 to 7 are the system: rules, tokens and components that every screen inherits. Section 8 applies them screen by screen. Sections 9 and 10 cover motion and the store. Sections 11 and 12 are sourcing and production. Hex values, contrast ratios and font licenses in this document were computed or fetched on 24 September 2026; anything not verified is listed in section 13.

## 2. Design principles

1. **Readable from across the kitchen.** The phone lies on a counter three metres from the person it is talking to. One word (the phase name) at 96 pt or larger, one sky color per phase, and one moving thing (the playhead). Everything smaller is for the person holding the phone, who at 6:58 is nobody.
2. **No clock digits except the parent's Live Activity.** No countdown or elapsed-time digits appear anywhere in the app except the parent's Live Activity on the Lock Screen, in the Dynamic Island and in StandBy. Progress is the playhead on the score. A scheduled wall-clock time may be printed once, in words, where the schedule is set or confirmed ("Tomorrow at 7:28, Augustine will call it"). This is the product rule from the Houseband graft: "No clock. The job ends when the song ends." (WINNER.md)
3. **Hard shapes that survive iOS 26 tinted, clear and dark icon modes.** Every character, patch and icon is built from a handful of opaque, hard-edged shapes with one signature color each. Apple's icons are now "crafted from multiple layers of Liquid Glass" with light, dark, tinted and clear looks (https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/), and in tinted and clear modes "the symbol must still work through shape, spacing, and value contrast" (https://www.applaunchflow.com/blog/ios-26-app-icon-sizes-variants). Anything that needs a gradient, a texture or a second close color to be recognised fails.
4. **The score is the hero.** The annotated score (phase bands, waveform, playhead, role-cue markers and the horn labeled "shoes and door") is screen one, screenshot one and the spine of every other surface. It is the visual answer to Apple's 4.3(b) "simple timers" exposure (WINNER.md, risks).
5. **Color lives in the content layer; glass stays in the navigation layer.** Apple's guidance is explicit: Liquid Glass "is best reserved for the navigation layer that floats above the content", "Always avoid glass on glass", "Tinting should only be used to bring emphasis to primary elements" and "If you want to imbue color into your app, do it in the content layer instead" (https://developer.apple.com/videos/play/wwdc2025/219/). The sky, the score, the characters and the cards are content. Tab bars, toolbars and sheets are untinted system glass, with one tinted primary action per screen.
6. **Red belongs to Scrub.** Red is never a crew color, never a sky color and never decorative. When something is red it is the abort robot or the abort action, so a child who has seen Scrub once knows what every red thing does.
7. **Borrow energy, never property.** From the reference shows we take economy of silhouette, warmth, structural music and the black-outline credits motif; from blockbuster marketing we take a fixed mark whose color shifts per chapter and "in color = active, greyscale = fallen" as a state language (aesthetic digest, implications). We take no trade dress, no agency insignia, no likeness and no real call signs (WINNER.md).
8. **The tap is the downbeat.** Every phase change, roll-call confirm, sky shift and Scrub is quantized to the next bar boundary; the mission log counts in bars, not minutes (Pull It Off graft, WINNER.md). Motion that cannot wait for a bar does not exist.

## 3. Color

All values are sRGB hex. The sky is always a flat fill: no gradients, no stars, no clouds. Depth comes from the tower silhouette and the counter edge.

### 3.1 The sky system

| Phase | Token | Hex | When it is on screen | Notes |
|---|---|---|---|---|
| T-12 and WAKE | T-12 Indigo | `#1F1B5A` | Station ID through verse one; also the Hangar, the End Credits card and the resting sky | The resting color of the world (WINNER.md: "deep indigo at T-12") |
| DRESS | Dress Blue | `#3B4BA8` | First key change | Derived step between indigo and gold so the climb toward the bridge is visible; not named in WINNER.md, added here |
| MANIFEST | Manifest Gold | `#F5B82E` | The bridge: Gus sings the list, the Stem Roll Call runs | The only light sky in the morning; all text on it is Ink |
| DOOR (final chorus) | Hot Orange | `#FF5A1F` | Horns in; shoes and door | Also the ON AIR bulb color for the Request Line |
| T-0 | Liftoff White | `#FFFBF2` | One-beat flash, then the "clean launch" resting state | Warm, not pure white |
| Re-entry: TIDY and TEETH | Dusk Purple | `#4A2A6A` | First half of the twenty-minute descent | Inverts the indigo |
| Re-entry: BOOK | Lamp Amber | `#FFAB3D` | The lamp-glow phase | Also the Hold item's color |
| LIGHTS and buzzer | Ink 900 | `#14132A` | The house goes dark | The screen is allowed to be nearly black here |

### 3.2 Crew colors

Crew colors are pure and saturated because they are worn as patches, and they never sit directly on a sky: they live on the console strip (Ink 900) or inside a Liftoff White ring. Any label on a crew disc is Ink 900.

| Role | Token | Hex | Glyph (one shape, no counters) |
|---|---|---|---|
| Pilot | Pilot Blue | `#2D7DFF` | Upward chevron |
| Navigator | Navigator Green | `#2FB36B` | Compass needle (a long rhombus) |
| Cargo | Cargo Yellow | `#FFD23F` | Box with one strap |
| Ground Crew | Ground Crew Pink | `#F05DA8` | Two marshalling batons in a V |
| Spare 1 | Spare Teal | `#1FB8B0` | Headset arc |
| Spare 2 | Spare Violet | `#9F7AEA` | Five-point star |

### 3.3 Character signature colors

One signature color per character plus a single shared neutral, Suit Cream `#FFF1D6`, for faces, hands and visors. Dark-signature characters (Augustine, Gus, Farrago, Bunny) read on gold, orange and white by their body and on indigo and dusk by their cream face plate; light-signature characters (Lionel, Scrub) read the other way round. Full silhouette notes are in section 6.

| Character | Token | Hex |
|---|---|---|
| Augustine Pell | Director Navy | `#22345F` |
| Gus Marchetti | Coverall Olive | `#5C6B22` |
| Dr. Ines Farrago | Storm Violet | `#6A4BD8` |
| Bunny Kowalczyk | Velvet Plum | `#5B1F4F` |
| Lionel Abara | Copy Cyan | `#34B9E8` |
| Scrub | Overcast Grey `#AEB6C2` body, Scrub Red `#E8402F` button | |

### 3.4 UI neutrals

Every neutral sits at roughly 245 to 250 degrees of hue with 3 to 8 percent saturation, so greys feel like the T-12 sky at rest rather than like a spreadsheet.

| Token | Hex | Use |
|---|---|---|
| Ink 900 | `#14132A` | Text on light; dark background; console strip |
| Ink 800 | `#1E1D3A` | Dark cards |
| Ink 700 | `#2B2A4A` | Raised dark surfaces, dividers on dark |
| Ink 500 | `#5C5B7A` | Secondary text on light |
| Ink 300 | `#A9A8C2` | Borders; secondary text on dark; greyscale for scrubbed elements |
| Ink 100 | `#E6E4F2` | Text on dark; light alternate surface |
| Paper | `#FAF8FF` | Light background |
| Cream | `#FFF6E5` | Light cards, manifest paper |

### 3.5 Semantic colors

| Meaning | Token | Hex | Rule |
|---|---|---|---|
| Abort, destructive | Scrub Red | `#E8402F` | Only Scrub and the abort action |
| Hold item (aging) | Hold Amber | `#FFAB3D` | Same value as Lamp Amber, on purpose: the Hold item glows like a lamp left on |
| Confirmed, cleared, "copy" | Clear Green | `#1E9E5A` | Roll-call punched in, Hold cleared, launch logged |
| Live, on air | ON AIR Orange | `#FF5A1F` | Same value as Hot Orange; the Request Line bulb |
| Information | Ink 900 / Ink 100 | | Never a colored info state; Lionel says "copy", the UI does not |

### 3.6 Text contrast checks

WCAG 2.x relative-luminance ratios, computed on 24 September 2026 from the hex values above. Targets: 4.5:1 for text under 24 px regular or 19 px bold; 3:1 for large text and UI components.

| Text | Surface | Ratio | Verdict |
|---|---|---|---|
| Ink 900 | Paper | 17.24:1 | Body text, light mode |
| Ink 500 | Paper | 6.17:1 | Secondary text, light mode |
| Ink 900 | Cream | 16.92:1 | Manifest rows |
| Ink 500 | Cream | 6.05:1 | "last seen" memory line |
| Ink 100 | Ink 900 | 14.48:1 | Body text, dark mode |
| Ink 300 | Ink 900 | 7.84:1 | Secondary text, dark mode; Space Mono log lines |
| Ink 100 | Ink 800 | 12.96:1 | Dark cards |
| Liftoff White | T-12 Indigo | 14.92:1 | Phase names, credits |
| Liftoff White | Dress Blue | 7.37:1 | Phase name DRESS |
| Ink 900 | Manifest Gold | 10.19:1 | Phase name MANIFEST, lyric captions on the bridge |
| Liftoff White | Manifest Gold | 1.73:1 | Fails; never put white text on gold |
| Ink 900 | Hot Orange | 5.82:1 | Small text on the DOOR sky |
| Liftoff White | Hot Orange | 3.02:1 | Large text only (the 96 pt DOOR label passes; nothing smaller) |
| Liftoff White | Dusk Purple | 11.11:1 | Re-entry phase names |
| Ink 300 | Dusk Purple | 4.95:1 | Re-entry secondary text |
| Ink 900 | Lamp Amber | 9.64:1 | BOOK phase, Hold item label |
| Ink 900 | Pilot Blue | 4.75:1 | Glyph and label on the Pilot disc |
| Ink 900 | Navigator Green | 6.73:1 | Navigator disc |
| Ink 900 | Cargo Yellow | 12.58:1 | Cargo disc |
| Ink 900 | Ground Crew Pink | 5.91:1 | Ground Crew disc |
| Ink 900 | Spare Teal | 7.39:1 | Spare disc |
| Ink 900 | Spare Violet | 5.57:1 | Spare disc |
| Ink 900 | Scrub Red | 4.50:1 | The word SCRUB on the button (bold, 20 pt or larger) |
| Liftoff White | Scrub Red | 3.91:1 | Large text only |
| Ink 900 | Clear Green | 5.27:1 | "CLEARED" stamp |
| Crew discs (all six) | Ink 900 console | 4.75:1 to 12.58:1 | Every disc reads as a component on the console strip (3:1 minimum) |
| Manifest Gold | T-12 Indigo | 8.64:1 | Gold score columns on the resting sky |
| Hot Orange | T-12 Indigo | 4.94:1 | Horn marker on indigo |
| Lamp Amber | Dusk Purple | 6.09:1 | Hold tick on the Re-entry sky |

Two consequences: white text is banned on gold and on Lamp Amber, and the playhead cannot be a single color because Hot Orange on Manifest Gold is only 1.75:1; the playhead is therefore a Liftoff White line with an Ink 900 edge (section 5).

### 3.7 Light and dark treatment

The sky, the score, the crew colors, the semantic colors and the characters are identical in light and dark mode: the sky is the sky. Only the chrome flips. Light: Paper background, Cream cards, Ink 900 text, Ink 500 secondary. Dark: Ink 900 background, Ink 800 cards, Ink 100 text, Ink 300 secondary. Because Liquid Glass adapts to what is under it, every screen is tested at both ends of the iOS 27 translucency slider ("from ultraclear to fully tinted", https://www.apple.com/gn/newsroom/2026/09/major-updates-for-apples-software-platforms-are-now-available/) and with the iOS 26.1 tinted option that increases opacity (https://support.apple.com/en-us/123075).

## 4. Typography

Three faces, all under the SIL Open Font License 1.1, which permits bundled copies to be used, embedded, redistributed and sold provided the font is not sold by itself and each copy carries its copyright notice and license (https://openfontlicense.org/open-font-license-official-text/). Google Fonts confirms they may be included "within a product that is sold commercially" and used "in apps" (https://fonts.google.com/faq). Each family's `OFL.txt` ships in the app bundle next to the font files.

| Role | Face | Designer | License and proof | Specimen |
|---|---|---|---|---|
| Display (mission-control energy) | Anton, Regular 400 only | Vernon Adams | SIL OFL 1.1; "Copyright 2020 The Anton Project Authors" (https://raw.githubusercontent.com/google/fonts/main/ofl/anton/OFL.txt, https://raw.githubusercontent.com/google/fonts/main/ofl/anton/METADATA.pb) | https://fonts.google.com/specimen/Anton |
| Body (friendly) | Fredoka, variable: weight 300 to 700, width 75 to 125 | Milena Brandão, Hafontia | SIL OFL 1.1; "Copyright 2016 The Fredoka Project Authors" (https://raw.githubusercontent.com/google/fonts/main/ofl/fredoka/OFL.txt, https://raw.githubusercontent.com/google/fonts/main/ofl/fredoka/METADATA.pb) | https://fonts.google.com/specimen/Fredoka |
| Tabular (mission log) | Space Mono, Regular, Italic, Bold, Bold Italic | Colophon Foundry | SIL OFL 1.1; "Copyright 2016 The Space Mono Project Authors" (https://raw.githubusercontent.com/google/fonts/main/ofl/spacemono/OFL.txt, https://raw.githubusercontent.com/google/fonts/main/ofl/spacemono/METADATA.pb) | https://fonts.google.com/specimen/Space+Mono |

**Why this pairing.** Anton is a condensed, single-weight advertising sans (aesthetic digest) whose tall counters and flat terminals look like gantry stencil lettering without imitating any agency's typography; set in all caps with 0.06 em tracking it is the voice of Augustine Pell reading a checklist, and it is the only face that reads at 96 pt from across a room without looking like a warning sign. Fredoka is round and heavy with a real weight range, which is what the HIG asks of a custom body face (implement Dynamic Type and Bold Text; prefer a fat rounded face over a thin decorative one, https://developer.apple.com/design/human-interface-guidelines/typography); it carries the manifest, lyrics captions and every button, and its width axis lets the same word tighten to fit a Dynamic Island slot. Space Mono is the printout: the mission log, bar counts, Hangar readouts and the End Credits billing all need figures that line up, and its squared geometry sounds like a 1970s teletype without the agency it never worked for. Apple's SF fonts are not embedded (Apple's license: "You may not embed the Apple Font in any software programs or other products", https://developer.apple.com/fonts/); SF Symbols appear only as in-app UI glyphs, never in the icon or logo (https://developer.apple.com/sf-symbols/). No Envato or Adobe font file ships in the binary (section 11).

### 4.1 Dynamic Type scale

Sizes are at the default Large content size; every style is registered with `Font.custom(_:size:relativeTo:)` against the named system text style so it scales with the user's setting. The HIG default body size is 17 pt and the minimum is 11 pt (https://developer.apple.com/design/human-interface-guidelines/typography). Two custom tiers above Large Title exist for the kitchen; they scale with Large Title but are capped at 1.6x so a phase name never leaves the screen.

| Style | Face and weight | Size at Large | Relative to | Used for |
|---|---|---|---|---|
| Kitchen | Anton 400, caps | 96 pt | Large Title (cap 1.6x) | Phase name on the live screen, StandBy, Hangar |
| Counter | Anton 400, caps | 64 pt | Large Title (cap 1.6x) | T-minus on the Live Activity; screenshot captions |
| Large Title | Anton 400, caps | 34 pt | Large Title | Screen titles, Test Fire, Paywall headline |
| Title 1 | Anton 400, caps | 28 pt | Title 1 | Section heads on the score, End Credits title |
| Title 2 | Fredoka 600 | 22 pt | Title 2 | Card titles, crew names on patches |
| Title 3 | Fredoka 600 | 20 pt | Title 3 | Request Line tile names |
| Headline | Fredoka 600 | 17 pt | Headline | Buttons, manifest item names |
| Body | Fredoka 500 | 17 pt | Body | All reading text |
| Callout | Fredoka 500 | 16 pt | Callout | Lyric captions during the bridge |
| Subhead | Fredoka 500 | 15 pt | Subheadline | "last seen" memory lines |
| Footnote | Fredoka 500 | 13 pt | Footnote | Patch labels, band labels in compact scores |
| Caption 1 | Space Mono 400 | 12 pt | Caption 1 | Bar counts, log timestamps |
| Caption 2 | Space Mono 400 | 11 pt | Caption 2 | Hangar readouts; never smaller |
| Log | Space Mono 400 / 700 | 15 pt | Body | Mission log rows and Flight Review tables |

**Bold Text.** When the accessibility Bold Text setting is on, Fredoka 500 becomes 700 and 600 becomes 700, Space Mono Regular becomes Bold, and Anton (single weight) gains a 0.75 pt same-color stroke so it visibly responds rather than ignores the setting, which the HIG requires of custom fonts. Live Activities use Fredoka 600 or heavier throughout, per the HIG's "medium weight or higher" rule (https://developer.apple.com/design/human-interface-guidelines/live-activities).

## 5. The annotated score component

The score is one SwiftUI component with four sizes (hero, standard, compact, strip) and four states. It always sits on a console strip of Ink 900 so the band colors read regardless of the sky behind it.

### 5.1 Anatomy, top to bottom

1. **Phase bands.** A contiguous strip of rectangles whose widths are proportional to bar counts, filled with the sky color of each phase: WAKE (T-12 Indigo), DRESS (Dress Blue), MANIFEST (Manifest Gold), DOOR (Hot Orange), and a two-bar cap of Liftoff White at T-0. Labels in Anton caps, Footnote size at standard, Title 1 at hero; Ink 900 on gold, Liftoff White on the rest. Band height 28 pt at hero, 16 pt standard, 8 pt compact, 4 pt strip. For Re-entry the bands run TIDY, TEETH (Dusk Purple), BOOK (Lamp Amber), LIGHTS (Ink 900 with an Ink 700 edge).
2. **Waveform.** Not an audio waveform: one column per bar, height from the section map's intensity layer (calm, medium, intense at 40, 70 and 100 percent of track height), so the shape reads as a plan and is identical every morning for the same arrangement. Columns are 2 pt wide with a 1 pt gap at standard size and filled with the band's color; unplayed columns sit at 40 percent opacity, played at 100.
3. **Playhead.** A 3 pt Liftoff White vertical line with a 1 pt Ink 900 edge each side and a small downward triangle at the top, so it reads on gold by its edge and on indigo by its core. It moves in bar steps under Reduce Motion and slides between bars otherwise.
4. **Role-cue markers.** 12 pt crew discs (section 7) sitting on the top edge of the waveform at the bar where each role's stem punches in during the bridge. A walk-up cue is drawn as a bracket in the member's color spanning its bars (a five-second cue is two to three bars depending on tempo).
5. **The horn marker.** At the first bar of the final chorus: an original horn glyph (a flared trapezoid bell on a short tube, no clip art) in Hot Orange with a Liftoff White pill beneath it reading "shoes and door" in Fredoka 600, Ink 900. It is the only labeled marker on the score so the eye lands on it first.
6. **Nested Request Line segment.** The two-minute teeth song nested in WAKE appears as an inset lighter band with four tick marks at the quadrant switches (every 30 seconds).
7. **Hold tick.** A small Lamp Amber tick at the bar where Gus reads the Hold item, with the day count in Space Mono Caption 1 at hero size only.

### 5.2 States

- **Scheduled.** Whole score at 40 percent, playhead parked at the left edge, a small Anton tag "SCHEDULED" at the right of the console. No digits.
- **Live.** Playhead advancing; played columns at 100 percent; the current band's label at full opacity and the others at 70; the sky behind the console takes the current band's color.
- **Scrubbed.** From the scrub bar onward, columns and bands turn Ink 300 greyscale while the played part keeps its color, and a Scrub Red stamp reading "WEATHER" in Anton, rotated minus six degrees, sits over the remaining bands. This is the "in color = active, greyscale = fallen" grammar applied to a morning rather than a person.
- **Complete.** All columns at 100 percent, the T-0 cap lit, a small tag "CLEAN LAUNCH" and the bar count in Space Mono ("48 bars").

### 5.3 Where it appears

- **Onboarding (hero).** Full width, 28 pt bands, waveform 120 pt tall, three callouts with 1 pt leader lines: "phases, not minutes", "the manifest, sung by Gus", "horns mean shoes and door".
- **Live Activity.** Lock Screen: the strip size (4 pt bands) under the phase name, playhead only, no waveform; Dynamic Island expanded: compact size with playhead; compact leading: a band-color chip with the phase's first letter; compact trailing: the T-minus digits; minimal: the chip alone. Live Activities render on the Lock Screen, in the Dynamic Island and in StandBy with compact, minimal, expanded and Lock Screen presentations (https://developer.apple.com/design/human-interface-guidelines/live-activities).
- **StandBy.** The Live Activity's custom background color extends full screen in StandBy (same HIG page), so the sky fills the display, the phase name sits at Kitchen size, and the compact score runs across the bottom.
- **End Credits card.** The complete (or scrubbed) state at strip size along the bottom edge of the card as the day's receipt.

## 6. Character art direction

**Rules.** Characters are hard-shaped flat cutouts: one silhouette and one signature color each, one prop, faces and hands in Suit Cream, no outlines in-app, no paper grain, no cutout jitter, no mitten hands (WINNER.md). Hands are drawn as a wedge with a separate thumb so gestures read at 32 pt. Eyes are two Ink 900 dots; mouths are a single stroke that changes only on the beat. The lanky, loose line the developer admires in Bob's Burgers and the uniform-body economy of South Park are the energy we borrow (aesthetic digest); the only outline treatment allowed is the End Credits card's black-outline-on-white motif, which is a genre convention, not a property. Every character must read at 32 pt on the console strip and at 400 pt on the Hangar.

| Character | Silhouette (the shape you would recognise in black) | Signature color and prop |
|---|---|---|
| Augustine Pell, Flight Director | Tall, narrow, absolutely vertical; a square-shouldered jacket that reads as one rectangle; hair a single swept wedge; a one-piece headset boom as a straight diagonal line off the head. She never leans. | Director Navy; a clipboard held flat against the chest like a lectern |
| Gus Marchetti, Janitor and Payload Specialist | Wide and low; rounded shoulders; coveralls as one soft trapezoid; a flat cap that overhangs the face; the biggest hands in the cast. His posture is the only relaxed one. | Coverall Olive; a keyring on a loop at the hip with three keys that jingle on the bar |
| Dr. Ines Farrago, Meteorologist | Small, high-waisted, with a long white coat that flares like a bell; hair a tall unruly cloud; she carries a bent umbrella in perfect weather. Specific and proud, never dim (WINNER.md, tone risk). | Storm Violet coat lining and umbrella; the umbrella is the prop |
| Bunny Kowalczyk, Countdown Announcer | Long and languid; a tuxedo silhouette with one exaggerated lapel; a single sequined shoulder line; reclines against the console with one ankle crossed. Appears only under dusk and amber skies. | Velvet Plum; a chrome stand microphone on a very thin stalk |
| Lionel Abara, CAPCOM | Medium height, seated whenever possible, headset larger than his head, one hand permanently raised in a two-finger "copy" gesture. | Copy Cyan headset and tie; the prop is the headset |
| Scrub, abort robot | Toddler-sized: a squat cylinder body on two stub feet, no arms, a domed head that is half the body height, one big round button on the chest. Kids will draw this, so it must be drawable in five strokes. | Overcast Grey body; Scrub Red button with a Suit Cream ring (3.61:1 against the red) |

**Similarity check rule.** Before any character ships, its silhouette is filled black, exported at 64 pt and 512 pt, and reviewed against a written list of well-known cartoon characters in its category (famous animated robots, especially the squat one-eyed and the inflatable ones; famous animated janitors and handymen; famous bumbling weather presenters; famous lounge singers and announcers). Two people outside the project are shown each silhouette and asked "who is this?"; a confident answer naming an existing character sends it back to the drawing board. A reverse image search on the silhouette is run and archived with the date. Character names are grepped against real public figures (WINNER.md).

**Authorship rule.** Every character is drawn by the developer or a commissioned artist under a written assignment of rights. No character, patch or icon is assembled from stock parts, including the Envato character-creation kits in the shortlist, which are reference only (WINNER.md; section 11). This is also what makes the cast defensible when the audio layer is not (WINNER.md, music system).

## 7. Crew patches and the app icon

### 7.1 Patch geometry

Bold circular badges in each member's color (WINNER.md). At the 96 pt master: a 96 pt disc in the crew color; an 8 pt Liftoff White ring set 6 pt inside the edge so the disc shows outside the ring like a woven border; a 44 pt Ink 900 glyph (section 3.2) centred; the member's name in Fredoka 600 Footnote beneath the disc on the console. No stitching texture, no drop shadow. Sizes: 96 (roll-call console), 56 (crew picker), 32 (score markers and mission log), 12 (role-cue dots). States: idle (disc at 60 percent, no ring), punched in (100 percent, ring on, glyph on), missed (disc Ink 300, glyph Ink 500), walk-up (ring pulses once over one bar). A solo user is Pilot, Ground Crew and audience (WINNER.md), so the Pilot patch alone must look complete.

### 7.2 iOS 26 icon variants

The icon is authored in Icon Composer as one layered `.icon` file: "Icon Composer lets you create layered icons out of Liquid Glass from a single design for iPhone, iPad, Mac, and Apple Watch" with Default, Dark and Mono rendering modes (https://developer.apple.com/icon-composer/). Xcode "uses [the .icon file] to generate all the icon variants it needs", the App Icon Set Name must match the file name, and a legacy asset-catalog icon should be kept because "Icon Composer icons back deploy to older versions of iOS ... with inconsistent rendering" (https://useyourloaf.com/blog/adding-icon-composer-icons-to-xcode/). The layout is a 1024 by 1024 square with no rounded corners ("let the operating system apply its mask"), and the system produces default, dark, clear light, clear dark, tinted light and tinted dark outcomes (https://www.applaunchflow.com/blog/ios-26-app-icon-sizes-variants). Three layers maximum: background, mid-ground, foreground. Layers are exported as fully opaque SVGs (useyourloaf, above). Every concept below is checked as a single black silhouette before it is colored.

### 7.3 Three icon concepts

**A. Doorhorn (recommended).** Background layer: T-12 Indigo full square. Mid layer: a door drawn as a Liftoff White rounded rectangle occupying the left 55 percent of the canvas, ajar, with the right edge angled 12 degrees so a 60 pt wedge of Manifest Gold light spills from the gap. Foreground layer: a horn bell (flared trapezoid, 380 pt wide at the mouth, 140 pt at the throat) in Hot Orange bursting rightward out of the gap, with three Liftoff White sound bars (short, medium, long) stacked to its right. Dark: the indigo deepens to Ink 900 and the door becomes Ink 100. Tinted and clear: the door and horn merge into one opaque silhouette on the mono layer; the sound bars are dropped so the shape stays simple. Reads at 29 pt because the door and bell are two large shapes.

**B. Four Bands.** Background: T-12 Indigo. Mid layer: four vertical bands (indigo, Dress Blue, Manifest Gold, Hot Orange) of widths 22, 18, 35 and 25 percent, with a Liftoff White cap band 8 percent wide at the right edge. Foreground: the horn glyph in Liftoff White at the seam between gold and orange, with a 3 pt playhead line. The score as an icon. Strong on the store, weaker at 29 pt because the bands become stripes. Shipped as the alternate icon that the one-time unlock offers.

**C. The Patch.** Background: Ink 900. Mid layer: a 760 pt disc in Manifest Gold with a 56 pt Liftoff White inner ring. Foreground: the horn glyph in Ink 900 at 380 pt. Reads as a crew patch and therefore as the household's badge; the risk is that a badge on a dark square resembles many sports and club apps, so it is kept as a fallback and as the mission-log empty-state art.

Concept A avoids a rocket, which the WINNER risk register warns maps App Store search to rocket trackers, and it is the only concept that literally draws the name.

## 8. Screen-by-screen design

Layout is described top to bottom for an iPhone in portrait; system Liquid Glass chrome (nav bar, tab bar, sheets) is untinted and is not re-described each time.

### 8.1 Onboarding score screen

**Layout.** Sky at T-12 Indigo filling the screen. Top third: Large Title "The song is the schedule." in Liftoff White. Middle: the hero score (section 5.3) with its three callouts. Below the score: the question "When do you need to be out the door?" in Fredoka Body and a single wheel picker defaulting to 7:40 (the one place a wall-clock time is set). Bottom: one tinted primary button, "Test fire (60 seconds)". **Must communicate:** this is a score, not a timer, in five seconds. **Copy:** as above; the callouts read "phases, not minutes", "the manifest, sung by Gus", "horns mean shoes and door". **Motion.** The bands draw in left to right over one bar of the station ID (which plays quietly, volume ramped over eight bars per WINNER.md); the playhead does not move on this screen.

### 8.2 Test Fire

**Layout.** The live screen (8.3) compressed: the sky runs the full phase sequence in sixty seconds. Phase name at Kitchen size in the top half; the standard score across the lower third with the horn marker; a Liftoff White "door" button (a rounded rectangle 140 by 200 pt with a handle dot) sitting where the Scrub button normally sits, labeled "Tap the door". No Scrub on the Test Fire. **Must communicate:** the moment the horns come in and you tap the door, the fanfare fires; that is the product. **Copy:** phase names WAKE, DRESS, MANIFEST, DOOR; lyric caption during the bridge showing Gus's demo manifest ending "and your keys, wherever they are"; on tap, "CLEAN LAUNCH" in Anton Title 1. Then the two optional questions: "Who's launching?" (add names to patches, or Skip) and "Play tomorrow on a speaker?" (AirPlay picker), closing with "Tomorrow at 7:28, Augustine will call it. You don't need to open the app." and the three free Request Line tiles. **Motion.** Sky crossfades on each phase downbeat over one bar; the door button lifts 8 pt when the horns enter; on tap, the liftoff flash (section 9).

### 8.3 Launch live screen

**Layout.** Sky in the current phase color, full bleed. Top: the launch tower silhouette (Ink 900, 40 percent of screen height) rising from a counter edge line at the bottom of the sky area. Centre: the phase name at Kitchen size, Liftoff White or Ink 900 by phase. Below it: one lyric caption line in Callout during the bridge only. Lower third: the console strip (Ink 900) holding the standard score, then the roll-call row of crew patches at 96 pt, then the Scrub button (a 72 pt Scrub Red disc with a Suit Cream ring, the word SCRUB in Ink 900 beneath). Nothing else. **Must communicate:** which phase we are in, from across the kitchen. **Copy:** phase names; "Roll call" above the patches during the bridge; "Scrub". **Motion.** All transitions on bar boundaries; a patch tap lights its ring on the next bar as its stem punches in; at T-0 every patch lights together and the flash fires; the tower's windows light one row per bar through the final chorus.

### 8.4 Lock Screen Live Activity and Dynamic Island

**Lock Screen.** Background in the current sky color with Ink 900 or Liftoff White text by contrast rule. Left: the phase name at Title 1 in Anton. Right: T-minus in Counter size (the only countdown digits in the product, derived from playback position rather than the wall clock per WINNER.md). Bottom edge: the strip score with the playhead. Under the phase name, the parent's own role patch at 32 pt. **Dynamic Island.** Compact leading: a band-color chip with the phase initial; compact trailing: T-minus digits in Space Mono Bold; minimal: the chip; expanded: the compact score with the playhead, phase name, T-minus, and a Scrub button on the trailing edge. For the Request Line the Island shows the ON AIR bulb (Hot Orange dot) leading and a shrinking vinyl disc trailing that loses radius as the song plays, replacing any countdown (WINNER.md, Dead Air graft). **Must communicate:** phase and time to door for the one adult who is allowed digits. **Copy:** phase name; "T-7:20"; "ON AIR". **Motion.** Text changes on the bar; the vinyl shrinks continuously except under Reduce Motion, where it steps every 10 percent.

### 8.5 StandBy Hangar mode

**Layout.** Landscape, full screen. Overnight, before the scheduled launch: a color-bars test pattern of eight vertical bars in the sky palette order (indigo, Dress Blue, gold, orange, Liftoff White, dusk, amber, Ink 900) occupying the top 60 percent; below, on Ink 900, the launch tower silhouette in Ink 700 with one Lamp Amber window lit; bottom-left, "HANGAR" in Anton Title 1 and beneath it "Launch window opens 7:28" in Space Mono Caption 2 (a scheduled time in words, permitted); bottom-right, the End Credits card from tonight at 25 percent scale. During the launch, StandBy becomes the Live Activity's full-screen sky (section 5.3). **Must communicate:** the station is on the air and knows about tomorrow. **Copy:** as above. **Motion.** The bars are static; every 64 bars of silence the lit window moves one floor; under StandBy Night Mode the pattern survives red tinting because it is shape, not hue.

### 8.6 Request Line tiles

**Layout.** Light chrome (Paper). Title "Request Line". A two-column grid of square tiles on Cream: each tile carries a large original pictogram (a toothbrush, a microwave with a rotating plate, a kettle, a shower head) in Ink 900, the name in Title 3, and the song length printed like a track length on a record sleeve in Space Mono ("2:00"), which is a static label rather than a countdown. Free tiles (teeth 2:00, microwave 1:30, kettle 3:00) sit first; locked tiles (shower 5:00, 1:00, 10:00 and flavors) show at 60 percent with a small patch-shaped lock. A footer row explains "Also on the widget, Shortcuts, the Action Button and NFC tags." **Must communicate:** songs exactly as long as the boring waits, cues sung in. **Copy:** "Teeth, 2:00, quadrants sung in", "Microwave, 1:30", "Kettle, 3:00", "Shower, 5:00, rinse bridge at 4:30". **Motion.** A tap lights the ON AIR bulb in the tile corner on the next beat; the tile's pictogram does one squash-and-stretch on the downbeat, never a loop.

### 8.7 Manifest editor with the Hold item

**Layout.** Cream sheet styled as a clipboard page under a Manifest Gold header strip reading "Tomorrow's manifest" in Anton Title 1, Ink 900. Rows in Fredoka Headline with a Subhead memory line beneath ("keys, last seen kitchen counter"; "library book, due Thursday"). Rows are reorderable and swipe to remove (iOS 27 `.reorderable()` and swipe actions, https://appcircle.io/blog/wwdc26-whats-new-in-swiftui). At the bottom, one distinct row, the Hold item, on a Lamp Amber field with an Ink 900 label ("dentist call") and a day count in Space Mono Bold ("day 23"); the amber field grows 1 pt taller per day to a cap at day 30 (WINNER.md, Dreadlines graft). Two verbs on the Hold row: "Clear" (Clear Green) and "Amnesty" (Ink 500 text). An add field at the top: "What's going out the door?" **Must communicate:** Gus will sing exactly this tomorrow, including the thing you keep not doing, without judgment. **Copy:** as above; footer "Gus reads this in the bridge. Edit it any time tonight." **Motion.** Clearing the Hold item plays the victory sting and the amber field collapses over one bar; Amnesty fades it to Ink 300 with the line "Declared dead of natural causes."

### 8.8 Crew and walk-up picker

**Layout.** Dark chrome (Ink 900) because this is a console. Title "Crew". A row of four role slots at 96 pt (Pilot, Navigator, Cargo, Ground Crew) with two spare slots collapsed behind a "+"; each slot shows the patch, a name field, and beneath it the walk-up cue picker: a horizontal set of five pills (mariachi, surf, marching band, big band, lullaby) that play a five-second preview on tap. A note: "Pass the phone. Everyone taps their own patch during the bridge." **Must communicate:** a role is a color, a patch, a five-second cue and a stem of the song; the reluctant partner's on-ramp is "I want the mariachi one" (WINNER.md, Choreball graft). **Copy:** "Pilot", "Navigator", "Cargo", "Ground Crew", "Walk-up cue", "Preview". **Motion.** Choosing a cue lights the patch ring for one bar while the cue plays; the stem preview crossfades in under the cue.

### 8.9 Re-entry

**Layout.** The live screen mirrored: sky Dusk Purple, then Lamp Amber, then Ink 900; phase names TIDY, TEETH, BOOK, LIGHTS at Kitchen size; the tower silhouette with windows going out one row per bar; the standard score across the console with the descending-tempo waveform visibly widening as bars lengthen; no roll call; a single Ink 100 "Lights" button that Bunny calls "splashdown". **Must communicate:** the day is ending on a hard boundary and the house is going dark. **Copy:** the phase names; Bunny's caption line during BOOK; the final bar shows nothing but the buzzer's word "SPLASHDOWN" in Anton on Ink 900 for one bar. **Motion.** Sky crossfades over two bars because the tempo is slower; screen brightness is left to the system, but every element fades to 20 percent over the last four bars; the buzzer bar is a hard cut to Ink 900.

### 8.10 End Credits card and clothesline widget

**Card.** A 3:4 portrait card on T-12 Indigo with the lit launch tower in Ink 900 and Manifest Gold windows; "END CREDITS" in Anton Title 1 at the top, the date in Space Mono; then the billing in Space Mono, largest name first ("Top billing: Sam, who remembered the photo money"), guest star always with the best line, and one written joke in Fredoka Body at the bottom; the strip score as the day's receipt along the bottom edge; no numbers, no percentages (WINNER.md, Split Level graft). The share sheet renders the card in the black-outline-on-white motif as an alternate style for messages. **Widget.** Medium: a Liftoff White line across the top with seven folded cards pegged to it, oldest left, today largest; scrub days are Ink 300 greyscale cards; tapping opens the mission log. Small: today's card alone. **Must communicate:** the day happened, someone carried it, and it was a joke rather than a score. **Copy:** as above; empty state "No launch today. Weather." **Motion.** The card rolls up from the bottom over four bars while the credits are sung; on the widget a new card swings once on its peg when it arrives, and never again.

### 8.11 Mission Log

**Layout.** Light chrome. Header: the rolling rating in Anton Title 1, "On time 42 of 50 launches", with no streak anywhere. A list in Space Mono Log size: date, launch flavor, bars ("48 bars"), result stamp (CLEAN in Clear Green, WEATHER in Scrub Red, LOUNGE in Ink 500), and the top-billed name. Yesterday's row carries an "Edit" affordance because yesterday is always correctable (WINNER.md). Free tier shows thirty days; the unlock shows ninety. **Must communicate:** ratings, not streaks; a bad week dips and never resets. **Copy:** "Fix yesterday"; "Scrubs count as weather, not failure." **Motion.** None beyond the system list; a corrected row's stamp changes on a beat with a tap sound.

### 8.12 Sunday Flight Review

**Layout.** A two-minute review played as a track, with a screen that is a seven-column strip of the week's cards in color (scrubs in greyscale), the tower at the top with one window per clean launch lit, and beneath the strip the crew's three notes for the week in Fredoka Body attributed to characters by patch (Farrago's forecast, wrong in a new way; Lionel's "copy count"; Gus's manifest note). A "Lounge" toggle for mornings with nowhere to be. **Must communicate:** the week as a picture, with the crew commenting, never grading. **Copy:** "Flight Review, week 38"; "Next week's first launch: Monday, 7:28." **Motion.** The seven cards deal onto the strip one per bar as the review plays.

### 8.13 Paywall

**Layout.** T-12 Indigo sky with the tower and all windows lit. Large Title "One purchase. Everything." Below, two columns headed "Free, complete" and "Unlock, $9.99 once", listing exactly what WINNER.md lists (free: one flavor at 10 and 12 minutes, one Re-entry track, the manifest with the Hold item, Scrub and the log, Test Fire, three Request Line songs; unlock: every flavor and duration, crew roles with walk-up cues and the Stem Roll Call, the full Request Line, End Credits card and clothesline widget, ninety-day log and Flight Review, the weekend lounge and Hangar, household sharing when it ships). One tinted primary button, "Unlock for $9.99", one text button "Restore purchases". Footer in Fredoka Subhead: "No subscription. No ads. No accounts. No streaks to lose. Seasonal flavors are free updates." **Must communicate:** the price and the absence of everything people resent. **Copy:** as above, verbatim. **Motion.** The window rows light one per bar over the station ID sting; nothing pulses, nothing counts down.

## 9. Motion

**Bar quantization.** Every animation duration is written in beats and bars and resolved at runtime from the track's locked BPM. At 120 BPM a beat is 0.5 s and a bar is 2.0 s; at 96 BPM a bar is 2.5 s; Re-entry tracks descend roughly 20 BPM over twenty minutes (WINNER.md), so late bars are longer and the interface slows with the music. Taps are acknowledged immediately by a 12-variant micro tap sound (the Not Boring technique, aesthetic digest) and by a 2 pt press, but their visual consequence lands on the next bar boundary.

**Sky shift.** On the phase downbeat the sky crossfades to the next color over exactly one bar (two bars in Re-entry). The phase name cuts, it does not fade: the old word drops 24 pt and out over one beat, the new word is present on the downbeat. The tower windows light one row per bar in the final chorus.

**Liftoff flash.** At T-0: cut to Liftoff White for one beat, hold one beat, then settle over two bars to the resting Paper or Ink 900 chrome with "CLEAN LAUNCH" already on screen. The fanfare and the flash share the same bar.

**Reduced motion and bright effects.** With Reduce Motion on: no crossfades (hard cuts on the downbeat), the playhead steps per bar, the vinyl steps per 10 percent, the credits card appears in place rather than rolling, and pictograms do not squash. With Reduce Bright Effects on, added in iOS 26.4 alongside more reliable Reduce Motion for Liquid Glass (https://support.apple.com/en-us/123075): the liftoff flash becomes a 300 ms rise to Liftoff White at 60 percent opacity, and the Scrub stamp does not slam. Both settings are read every launch, not once.

**Liquid Glass coexistence.** Per Apple, glass belongs to the navigation layer, never on glass, tinted only for the primary action, and color belongs to the content layer (https://developer.apple.com/videos/play/wwdc2025/219/); shapes nest with concentric corner radii and hierarchy is expressed through layout rather than decorative bar backgrounds (https://developer.apple.com/videos/play/wwdc2025/356/). Doorhorn therefore never paints a nav or tab bar (the iOS 27 breakage points are custom bar background colors and layouts pinned to the old tab-bar safe area, https://byteiota.com/ios-27-makes-liquid-glass-mandatory-act-before-april-2027/), uses `Tab(role: .prominent)` for the Launch tab and toolbar minimisation on the live screen (https://appcircle.io/blog/wwdc26-whats-new-in-swiftui), and keeps the score's console strip fully opaque so the glass above it has something flat to refract. Custom Metal effects are limited to the liftoff flash.

## 10. App Store screenshot storyboard

Ten portrait screenshots at 1320 by 2868 px for the 6.9-inch display, PNG or JPEG without alpha, the maximum of ten per localization (https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications). Captions are set in Anton over the sky of the screen shown; each screenshot is a real screen, not a mockup with a device frame.

| # | Caption (six words or fewer) | On screen | Point it proves for the reviewer |
|---|---|---|---|
| 1 | The song is the schedule. | The onboarding hero score with phase bands, waveform, role-cue markers and the horn labeled "shoes and door" | This is an authored section map, not a timer (4.3(b)) |
| 2 | Horns mean shoes and door. | Launch live screen in the DOOR phase, sky Hot Orange, playhead on the horn marker, all four patches lit | The music is the cue; nobody looks at a screen |
| 3 | Gus sings your manifest. | Manifest editor with four items and memory lines, and the lyric caption "keys last seen kitchen counter" | Household-edited data becomes in-song lyrics |
| 4 | One Hold item. It ages. | The Hold row at day 23 on Lamp Amber with Clear and Amnesty | A blameless mechanic no checklist app has |
| 5 | Your crew, your stems. | The crew picker with four named patches and walk-up cue pills | Roles, colors and stems; household mode without accounts |
| 6 | Bad morning? Scrub. Weather. | The scrubbed score with the WEATHER stamp and Scrub at 400 pt | No streaks, no penalty, shorter track tomorrow |
| 7 | Songs exactly as long as teeth. | Request Line tiles: Teeth 2:00, Microwave 1:30, Kettle 3:00, Shower 5:00 | Daily value for solo users; not a kids' timer |
| 8 | Re-entry ends the day. | Re-entry in the BOOK phase, Lamp Amber, windows going out | The same grammar at night; a second daily anchor |
| 9 | End Credits, sung nightly. | The End Credits card on indigo beside the clothesline widget with a week of cards | A shareable artifact from real data, no scores |
| 10 | One purchase. No subscription. | The paywall, both columns legible | Small Business Program pricing; no dark patterns |

## 11. Envato Elements shortlist

### 11.1 License position, in plain terms

Under the Envato Elements license (last revised 8 December 2025), a download creates a single-use commercial license for one End Product; one license covers one software product "so long as the Item is only hosted in or on one software product and you are not giving users access to the underlying Item" (https://help.elements.envato.com/hc/en-us/articles/360000629346-Envato-Elements-License-FAQ), and the license becomes perpetual only if the app is completed while the subscription is active (https://help.elements.envato.com/hc/en-us/articles/360000628966-Envato-Elements-License). Three rules follow for Doorhorn:

- **Usable in the shipped app:** textures, UI scaffolding and sound effects, compiled into asset catalogs and bundled audio so users cannot extract them (clause 12(e), https://help.elements.envato.com/hc/en-us/articles/360000621803-Prohibited-Usage-of-Envato-Items). Sound effects are explicitly cleared even for broadcast (License FAQ, above). Nothing from Envato may feed a user-customisation feature such as a card maker (clause 12(c), same FAQ); the End Credits card is generated from the developer's own art for exactly this reason.
- **Reference only, never in the app:** characters, mascots and icons. WINNER.md's rule is that no character, patch or icon is built from stock art, and clause 12(f) bars trademark claims over an Envato item inside a logo (License FAQ, above), which would poison the app icon.
- **Fonts: marketing only.** Envato fonts are licensed per device to the subscriber and clause 13(d)(ii) says you cannot "incorporate or distribute the Font or Add-on within an End Product" (License, above); the web-font carve-out is written for websites and excludes products that let users create new text. Envato display faces may be rasterised into the icon, wordmark and screenshots; runtime text uses the OFL faces in section 4. Adobe Fonts carry the same restriction ("does not allow you to embed the fonts within mobile or desktop applications", https://helpx.adobe.com/fonts/using/font-licensing.html).

Keep the named license certificate for every item under the app's name and archive item-page screenshots, because authors can withdraw items and App Review 5.2.1 requires that you own or have licensed everything in the app (https://developer.apple.com/app-store/review/guidelines/).

### 11.2 Sourced items (verified live by the digest on 24 September 2026)

| Item | URL | What it is | Doorhorn use | License caveat |
|---|---|---|---|---|
| Menu Pack iOS UI Kit (uibundlecom) | https://elements.envato.com/menu-pack-ios-ui-kit-EC6RYUH | 4 iOS templates, 520+ icons, Figma/XD/PSD/Sketch | Layout scaffolding for settings, crew picker and paywall; re-skinned in section 3 tokens | Usable as integrated scaffolding; check the bundled "free fonts" under clauses 16 to 18; its icons are reference only |
| Mobile Design System (uiuxassets) | https://elements.envato.com/mobile-design-system-J47A58 | 250+ symbols, 14 chart styles, style guide, Sketch/Figma | Chart primitives for the Mission Log rating and Flight Review strip | Bundles Google Material Icons under their own license; do not ship those icons |
| Game Mobile App (Vktr__Supply) | https://elements.envato.com/game-mobile-app-2MVVT2C | Game-style mobile UI kit, Figma/XD/Sketch | Layout reference for the Request Line grid and lock states | Reference only for its art; layout patterns may be reused |
| Multipurpose Casual Game UI Kit (anchor_point_heshan) | https://elements.envato.com/multipurpose-casual-game-ui-kit-9TFRVCG | Layered PSD popups, buttons, panels | Popup and dialog scaffolding for the Scrub confirmation and Hold amnesty | Usable if fully re-colored and compiled; fonts linked in docs are not ours to ship |
| UI elements for game design (Sensvector) | https://elements.envato.com/ui-elements-for-game-design-icons-and-menu-XVWTCL9 | Flat vector HUD pieces | Reference for band and progress geometry only | Icons are reference only under the no-stock-icon rule |
| Colorful Game Icons (nimart1) | https://elements.envato.com/colorful-game-icons-F5859C | 21 tiered icons, PNG and layered sources | Reference for how a tiered badge changes across levels | Reference only |
| Vibrant iOS Icon Set (creativevip) | https://elements.envato.com/vibrant-ios-icon-set-TNTCGY | Bright iOS-style icon set | Reference for saturated iOS-native iconography | Reference only |
| Character Creation Kit (AnnaIvanir) | https://elements.envato.com/character-creation-kit-7XN3YY | Modular vector faces, hair, outfits | Study of proportion systems while drawing the cast; nothing traced or assembled | Reference only (WINNER.md rule; clause 12(c) if ever user-facing) |
| Vector Characters Builder (bestwebsoft) | https://elements.envato.com/vector-characters-builder-QZK7BG | 50+ modular character parts | Same as above | Reference only |
| Character & Monster Creation Kit (RZDESIGN) | https://elements.envato.com/character-monster-creation-kit-DKGVJ2 | Cartoon monster and alien parts | Not used; Scrub is drawn from scratch | Reference only |
| Superhero Mascot Character Pack (Blankids) | https://elements.envato.com/superhero-mascot-character-pack-TGF3RWE | Vector mascot with franchise-adjacent tags | Skip: tags echo licensed properties | Do not use; Apple 5.2.1 liability regardless of Envato's license |
| 3D Illustration Characters Kit (Krafted) | https://elements.envato.com/3d-illustration-characters-kit-ZXFDLEM | Figma-native 3D characters | Not used; off style (flat cutouts) | Reference only |
| Comic Speech Bubbles (alexdndz) | https://elements.envato.com/comic-speech-bubbles-CZ47MLA | 16 SVG/PNG comic bubbles | Marketing art and social cards; a possible in-app bubble shape for lyric captions if redrawn to the Ink/Cream tokens | Usable in-app only as a compiled, non-extractable graphic; the words on them are not ours |
| Halftone Texture Pack Background (Mihis_Design) | https://elements.envato.com/halftone-texture-pack-background-A4PK9G | 15 vector halftones plus PNGs | Halftone at 6 percent over the End Credits card share render and the screenshots; never over the sky in-app | Usable in the shipped app as a compiled texture |
| Stickers Illustration / Fun Stickers (uicreativenet) | https://elements.envato.com/fun-stickers-JDZ4GAE | Bold-outline cartoon stickers | Reference for line weight on the outline credits variant | Reference only (icons and characters) |
| Comic Cartoon Sticker Set (TotallypicRF) | https://elements.envato.com/comic-cartoon-sticker-set-ARFTHSD | Patch-badge pop stickers | Reference for patch ring proportions | Reference only |
| Emoji Vector Set (wowomnom) | https://elements.envato.com/emoji-vector-set-72JE9ZH | 12 vector emoticons | Not used; the cast carries the reactions | Reference only |
| Comic Toopia (simetro) | https://elements.envato.com/comic-toopia-playful-comic-display-font-3AK877J | Comic display font | Wordmark exploration, rasterised | Marketing only; never in the binary (clause 13) |
| Kartooni (Tokokoo) | https://elements.envato.com/kartooni-cartoon-comic-font-6FTEGVY | Rounded cartoon font | Screenshot captions if Anton proves too severe in store tests | Marketing only |
| Mokupoku (AnnoraStudio) | https://elements.envato.com/mokupoku-playful-cartoon-display-font-ZEVB8HD | Playful display font | Logo exploration | Marketing only |
| Breaking The Comic (Gassstype) | https://elements.envato.com/breaking-the-comic-bold-playful-comic-font-JGHU4BF | Bold comic font | Poster-weight title cards for social | Marketing only |
| Tricky Jimmy (Tokokoo) | https://elements.envato.com/tricky-jimmy-comic-cartoon-font-KTA3AUQ | Chunky rounded font | Social captions | Marketing only |
| Mobile Game App Pack (GameChestAudio) | https://elements.envato.com/mobile-game-app-pack-FYHH4PZ | 15 UI sound clips | The micro tap sound pool, pitched into twelve variants in-house | Usable; sound effects are the least constrained category |
| Cartoon Bloopers Sound Pack (applehillstudios) | https://elements.envato.com/cartoon-funny-bloopers-pack-KHAACYF | 20 slapstick clips | Farrago's forecast punctuation in the Request Line bits | Usable |
| Funny Cartoon Voice & Sounds Pack (applehillstudios) | https://elements.envato.com/funny-cartoon-voice-sounds-pack-X2SV73G | 10 cartoon voice clips; companion laughs at https://elements.envato.com/cartoon-laugh-pack-X7P2EMG | Scrub's non-verbal noises only; the cast's lines are written and produced by the developer | Usable; keep the cast's speech in the developer's own lane |
| 8 Bit Game Interface Sound Pack (moonlight_sounds) | https://elements.envato.com/8-bit-game-interface-sound-pack-SWHE3XW | 50 retro interface clips | Hangar mode blips and the log's edit confirmations | Usable |
| iOS 16 App Icon Template (itefan) | https://elements.envato.com/ios-16-app-icon-template-LW8Q24G | Layered PSD icon mockup workflow | Store-preview mockups of the three icon concepts | Usable as a tool; superseded by Icon Composer for the shipped icon |
| iOS Icon Template - All Sizes (ForesightThemes) | https://elements.envato.com/ios-icon-template-all-sizes-Z73DRK | Sketch template for every Xcode icon size | Legacy `AppIcon.appiconset` fallback export | Usable as a tool |

### 11.3 Further searches

Envato's search pages return 403 to automated fetches, so these links follow the `https://elements.envato.com/<kind>/<query-slug>` form and were not opened from this session.

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

Search results in the poster, badge and patch categories are references for geometry and are redrawn; results in the texture and sound-effect categories may ship; results in the font category are marketing only.

## 12. Production plan with the connected tools

### 12.1 Figma: the component library and the screens

One file, `Doorhorn Design System`, with variables for every token in section 3 (a Light and a Dark mode for the neutrals; skies, crew, character and semantic colors mode-independent) and text styles for every row of the Dynamic Type table. Components, each with variants: `Sky` (eight fills), `Score` (four sizes by four states), `PhaseBand`, `RoleCueMarker`, `HornMarker`, `Playhead`, `CrewPatch` (six colors by four sizes by four states), `ConsoleStrip`, `ScrubButton`, `RequestTile` (free, locked, on air), `ManifestRow`, `HoldRow` (day 1 to day 30 as a number property), `CreditsCard` (indigo and outline styles), `ClotheslineWidget` (small, medium), `HangarBars`, and `Tower` (window rows as a property). Characters live on a separate page as flat vector components with pose variants, drawn in Figma's pen tool, never imported from a kit. System chrome comes from Apple's iOS and iPadOS 27 Figma design kit released 23 June 2026 (https://developer.apple.com/news/) so glass bars, sheets and the Dynamic Island are accurate. A second page holds the fourteen screens of section 8 as frames at 402 by 874 pt, each in light and dark, plus a Live Activity, StandBy and widget page. Prototype the launch with Smart Animate for the sky and bar-timed delays (2,000 ms at 120 BPM) so the reluctant-partner playtest can be run on a phone before code exists.

### 12.2 Adobe Express or Canva: screenshots and social cards

Screenshots are composed at 1320 by 2868 px from exported Figma frames, with Anton captions (or an Envato display face rasterised, which the Envato license permits for designs made with the font) and the 6 percent halftone from the shortlist over the caption area only. Export PNG without alpha (Apple's specification above). Social cards are 1080 by 1080 and 1080 by 1920 on T-12 Indigo with the tower and one line of copy from the storyboard; the End Credits card itself is never produced in Express, because the shipped card is generated in-app from the developer's own art. Both tools' brand kits are loaded with the section 3 hex values so nobody eyeballs a gold.

### 12.3 Exporting for Xcode

- **Colors.** `Colors.xcassets` with one color set per token, named exactly as the tokens (`sky/t12Indigo`, `crew/pilotBlue`, `ink/900`, `semantic/scrubRed`) using folder namespaces; the neutrals carry Any and Dark appearances, everything else Any only.
- **Vector art.** Characters, patches, glyphs, the tower and pictograms export from Figma as SVG, are converted to PDF and added as single-scale image sets with Preserve Vector Data on, named `character/gus/idle`, `patch/pilot`, `glyph/horn`. Raster textures (the halftone) export at 1x, 2x and 3x as PNG into one image set, the standard imageset structure for iOS bitmaps (https://image-toolkit.com/guides/ios-xcode-imageset-guide).
- **App icon.** `AppIcon.icon` from Icon Composer, dragged into the project with the App Icon Set Name matching the file name; alongside it a legacy `AppIcon.appiconset` set to Single Size with the 1024 by 1024 flattened export, because the single-size option "is a single slot for a 1024×1024 point image that the system resizes as needed" (https://useyourloaf.com/blog/xcode-14-single-size-app-icon/) and Icon Composer icons back-deploy inconsistently (https://useyourloaf.com/blog/adding-icon-composer-icons-to-xcode/). The `.appiconset` folder holds PNGs plus a required `Contents.json` whose `images` entries carry `idiom`, `size`, `scale` and `filename` (https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/AppIconType.html). The alternate icon (concept B) ships as `AppIcon-FourBands`.
- **Fonts.** `Anton-Regular.ttf`, `Fredoka[wdth,wght].ttf` and the four Space Mono files under `Fonts/` with their `OFL.txt` files beside them, listed under "Fonts provided by application"; no Envato or Adobe font file anywhere in the target.
- **Audio.** Envato sound effects as bundled CAF alongside the Suno-derived stems, never as loose files a user could browse.
- **Widgets and Live Activity.** A shared asset catalog with target membership for the app, the widget extension and the Live Activity so the strip score and the patches are one source.

## 13. Open questions

1. **Name and mark.** Every candidate name is unverified against trademark and App Store availability (WINNER.md); the wordmark is not drawn until the name clears, and icon concept A only works for a name that contains a horn or a door.
2. **Dress Blue.** The intermediate sky step is this document's addition; WINNER.md moves straight from indigo to gold. Confirm in the first Test Fire whether the visible climb helps or whether two morning skies are enough.
3. **Anton under Bold Text.** The 0.75 pt stroke is a workaround for a single-weight face; if the HIG reviewers or the Guitar Wiz-style inclusivity bar (aesthetic digest) require a true bold, Oswald (OFL, multiple weights) is the fallback display face.
4. **Apple pages not fetched.** The HIG App Icons page and the Icon Composer developer article did not render for this session, so the six-outcome list and the 1024 no-corner rule are cited from a third-party guide and should be re-read on developer.apple.com before the icon is finalised. The HIG Widgets page also did not render in the digest's session, so widget rendering modes (full color versus accented) are unconfirmed.
5. **Liftoff White on Hot Orange at 3.02:1.** The DOOR label passes only as large text; if Increased Contrast is on, the label should switch to Ink 900 (5.82:1). Decide whether to switch always.
6. **Envato search links** are unverified from this session (403); open them by hand before relying on any category.
7. **Live Activity digits.** The Live Activity's T-minus is derived from playback position (WINNER.md); confirm that a `Text(timerInterval:)` style countdown can be driven that way rather than by the wall clock, or render the digits from the bar counter.
8. **Household sharing.** When CloudKit share ships, each member's own phone shows their own Live Activity; whether a non-parent member's Live Activity should show digits, or only the phase and their patch, is a product decision this document leaves at "parent only".
