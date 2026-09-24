# Doorhorn (working title): Product Specification

Doorhorn (working title) is an iOS app in which a piece of original music is the household's schedule: a morning Launch track carries everyone from waking to the front door, exact-length Request Line songs cover the day's short waits, and a nightly Re-entry track ends the day with a buzzer and sung End Credits. It runs from one phone and one speaker, keeps every byte on the device, sells for a single $9.99 unlock, and never keeps a streak.

Version 1, 24 September 2026. The source of truth for cast, phases, music system and pricing is `concepts/tournament/WINNER.md`; details added here are proposals for the developer to confirm (section 16).

---

## 2. The problem set

**One adult is the household clock.** One person repeats the same instructions every morning and night and absorbs the resentment. A study of 3,000 US parents found mothers handle 71% of household mental-load tasks against 45% for fathers, with daily tasks splitting 79% to 37% (https://www.bath.ac.uk/announcements/mothers-bear-the-brunt-of-the-mental-load-managing-7-in-10-household-tasks/). An analysis of 1,281 Reddit posts about family organizers ranks "disproportionate mental load / household project manager" first and "partners remain passive recipients" third, and notes tools are "phone-centric with no passive household visibility" (https://domistiq.com/blog/2026/05/16/the-2026-family-organizer-app-guide-what-1-281-real-reddit-pain-points-reveal-about-today-s-top-apps). During the concept tournament the parent of three on the everyday panel said "I am the human clock" before the pitch was finished. No product moves the nagging off the person and onto something the room can hear.

**Transitions are the hardest minutes, and silent tools do not carry a room through them.** Lickety Split has used fixed-length classical pieces as timers since 2011, and its reviews have asked for the chained version for a decade ("Getting ready is a series of events... potty 5 min, then brush 3, then shower 5... so parents don't need to set timers every single time") (https://apps.apple.com/us/app/lickety-split/id455790177). Adults with ADHD reviewing Happy Kids Timer say "with the timer and music it's easy to stay on task" (https://apps.apple.com/us/app/happy-kids-timer-home-chores/id978996118). Parents build the behaviour by hand: a widely shared Alexa routine plays a five-minute pop song every school day and the children must be at the door when it ends (https://www.mostlyproudparents.com/get-your-kids-to-school-on-time-with-buttrock). That hack is a licensed song with one phase, no list and no memory.

**The manifest lives in one head.** Morning Routine: Be On Time ships a checklist so you "walk out with everything", but it is silent, single-user and $29.99 a year (https://apps.apple.com/us/app/morning-routine-be-on-time/id6759146787). Nothing reads the list aloud at the moment it matters or remembers where the keys were last seen.

**Routine apps are per-person checklists on subscription that hand a child a screen.** Routinery is single-user and $36 a year (https://www.routinery.app/); Brili is $49.99 a year and parents cite handing kids a device as a drawback (https://brili.com/); ReadySet and Prep Pal are new free entrants in the same mould (https://apps.apple.com/us/app/readyset-visual-routine-timer/id6757413273, https://apps.apple.com/us/app/prep-pal-daily-routine-timer/id6740274295). Across 18,464 reviews of six habit apps the paywall was the number-one complaint (https://dev.to/eltacrew/i-read-18464-reviews-of-6-habit-tracker-apps-the-1-upvoted-complaint-is-something-none-of-them-go9), and Cozi's surprise paywall pushed its Trustpilot score to 2.1 (https://www.trustpilot.com/review/cozi.com).

**The day's one-to-five-minute dead zones default to the phone.** Music is a documented lever for mundane tasks and time-boxed playlists are recommended for executive dysfunction (https://www.homesandgardens.com/solved/cleaning-playlist); doomscrolling guides argue blockers fail unless paired with a short replacement that satisfies the same pull (https://nerdsip.com/blog/best-apps-to-stop-doomscrolling-2026). Song-length timers exist (https://apps.apple.com/us/app/music-timer-perfect-song-time/id6773217154) but only match a length; nothing is composed to the wait with the cues sung in.

**Bedtime is the morning in reverse, with no shared cue that is not a lecture.** Happy Kids Timer's bedtime list ends in "lights off" and Prep Pal covers "mornings, homework, bedtime" (sources above), but both are checklists a child carries room to room; Alarmy's bedtime reminder is a notification to one person (https://apps.apple.com/us/app/alarmy-loud-alarm-clock/id1163786766). The day ends without a boundary or a record.

**Invisible labour gets no credit, and counting it becomes a scoreboard.** FairPlay is called "essentially just a glorified chore chart" (https://apps.apple.com/us/app/fairplay-couple/id6761787753); roommate chore apps fail because "if one roommate opts out of the game, the scoreboard becomes one more thing to resent" (https://cohabby.com/blog/best-apps-for-roommates/). Credit has to be a joke, never a number.

**Bad mornings are logged as failure.** The most-upvoted review in the 18,464-review analysis asked only to fix yesterday, and none of the six apps allowed it (dev.to source above). Duolingo users describe "streak anxiety" (https://unstar.app/blog/language-learning-app-reviews-duolingo-babbel-rosetta-stone-2026); Duolingo's own data shows lowering the daily bar raised D14 retention 3.3% (https://blog.duolingo.com/improving-the-streak), and design guidance recommends "47 out of the last 50 days" over "you broke your streak" (https://uxmag.com/articles/the-psychology-of-hot-streak-game-design-how-to-keep-players-coming-back-every-day-without-shame). Nobody gives a household a blameless reason and a shorter plan for tomorrow.

---

## 3. Who it is for

Anyone who leaves the house and goes to bed. The parent's phone is the primary device in every household; nobody else installs anything.

| Household | Day one | Free tier gives them |
|---|---|---|
| Solo commuter | Sets a door time, runs the 60-second Test Fire, hears the launch next morning from the phone on the counter. Automatically Pilot, Ground Crew and audience. | A 10- or 12-minute launch every workday, the manifest with keys memory, Scrub, and the teeth, microwave and kettle songs. |
| Couple | One phone runs the launch; the reluctant partner's on-ramp is hearing it. Either edits tonight's manifest. | Everything above plus Re-entry; with the unlock, two crew patches and End Credits that bill whoever remembered the thing. |
| Roommates | The counter phone belongs to whoever cares most; the bathroom queue becomes the Request Line. No scoreboard exists. | Teeth song; with the unlock, the shower song, patches and the Stem Roll Call so showing up is audible. |
| Family with kids | The launch replaces the parent's voice for twelve minutes; children answer the horns, not a screen. Scrub is the character they will draw. | Launch, Re-entry, manifest, Scrub, mission log; with the unlock, walk-up cues per child, every duration, the weekend lounge. |
| Shift worker | Per-weekday door times, a launch at 4:40 a.m. or 6:30 p.m., a Re-entry at 9 a.m. after nights. A "day" runs launch to launch, not midnight to midnight. | All free features; with the unlock, the 8-minute launch for short turnarounds and the 20-minute Re-entry after nights. |

The app is never listed in the Kids category and carries a 4+ or 9+ rating; marketing leads with roommates, couples, shift workers and solo commuters alongside families.

---

## 4. The three daily moments

Timings assume the default 12-minute launch, a 7:40 a.m. door time and 8:35 p.m. lights-out. Every phase change, roll-call confirm, Door tap and Scrub tap is quantised to the next bar of the playing track, and the mission log records launches in bars.

### 4.1 Launch

**Trigger.** Door time minus track duration, scheduled the moment door time is saved and re-scheduled after every launch, as an AlarmKit alarm plus a Live Activity. AlarmKit alerts "break through the silent mode and the current focus", always present a Stop control, and may carry a secondary button whose action is an App Intent (https://developer.apple.com/videos/play/wwdc2025/230/). Custom alarm sounds must be under 30 seconds and play once (Apple engineer reply, https://developer.apple.com/forums/thread/797172), so the alarm sound is the 30-second station ID and the app plays the track. Two start modes:

- *Docked start (the intended setup).* The phone is on the counter overnight, plugged in, in StandBy with the app in the foreground. At T-12:30 the app plays the station ID itself and rolls into the track. Nobody touches anything.
- *Pocket start.* The AlarmKit alert fires at T-12:30 with the station ID; its secondary button "Open the launch" opens the app and starts the track. One tap. If Stop is tapped instead, the Live Activity stays on the Lock Screen reading "Launch window open. Tap to call it." until door time.

**Flow.**

| Clock | T-minus | Phase | Audio | Screen |
|---|---|---|---|---|
| 7:27:30 | 12:30 | Station ID | 30-second station ID, volume ramping over eight bars. | Live Activity: cutout countdown, phase name. |
| 7:28:00 | 12:00 | WAKE | Augustine Pell: "T-minus twelve. Launch window open." Verse one, wake and wash. | Sky deep indigo. |
| 7:29:30 | 10:30 | WAKE | The 2:00 teeth song nested, "top left... top right... switch" at each :30. | Unchanged. |
| 7:32:00 | 8:00 | DRESS | First key change. Dr. Ines Farrago's ten-second forecast of catastrophe at T-6:00. | Phase "DRESS". |
| 7:35:30 | 4:30 | MANIFEST | Bridge. Gus Marchetti sings the manifest with "last seen" memory, the Hold item last with its day count; Lionel Abara: "copy." With the unlock, walk-up cues and the Stem Roll Call. | Sky gold; crew patches large for the roll call. |
| 7:38:30 | 1:30 | DOOR | Horns enter: the only cue that means shoes and door. | Sky hot orange; one large Door button on phone and Live Activity. |
| 7:40:00 | 0:00 | LIFTOFF | Liftoff fanfare, all stems together. | White flash, "LAUNCHED 7:40"; Live Activity dismisses two minutes later. |

**Screen versus audio.** The parent's Lock Screen, Dynamic Island and StandBy show the countdown, the phase and (unlock) their role; the launch screen shows the annotated score with a playhead, Door and Scrub. Everything else is audio. No countdown digits appear anywhere except the parent's Live Activity and launch screen. Children are never handed the phone.

**What each person does.** Nothing until the bridge, when the parent may glance at the manifest and crew members (unlock) tap their patch. Whoever crosses the threshold first taps Door; if nobody does, the launch completes at T-0 anyway.

**Failure paths.**
- *Scrub.* Anyone taps Scrub (launch screen, Live Activity, Shortcut). Klaxon on the next bar, Scrub declares "weather", the track ends within a bar, the entry is logged as a scrub. That evening the Hangar offers the next-shorter duration (12 to 10 to 8) with one tap. No penalty.
- *Phone not on the counter.* Pocket start applies. If a speaker was chosen at onboarding, the track goes to the speaker wherever the phone is.
- *Speaker missing.* If the AirPlay route is unreachable at T-12:30, playback falls back to the phone and Lionel says "CAPCOM. Speaker not found. Going local." The next Hangar screen shows a "Choose speaker" button.
- *Someone late.* A patch tapped after T-0 punches in over the post-launch tail (the screen stays live ten minutes) and is logged late by N bars; a Door tap after T-0 logs the launch late by N bars. Augustine reads it as "Door confirmed. Late. Noted." in her usual voice.
- *Nobody starts it.* If the alarm was stopped and nothing tapped by door time, the entry is "no launch" and excluded from the rating.

**Logged.** One MissionLogEntry: date, door time, track and arrangement seed, duration, start mode, audio route, phases as bars, Door bar, outcome (on time, late by N bars, scrubbed, no launch), manifest items sung, Hold age, crew punch-in bars, delay permit flag.

### 4.2 The Request Line

**Trigger.** A tile in the app, the Request Line widget, an App Intent from Shortcuts, a Control on the Action Button, or an NFC tag that runs a Shortcut. Each names one song: "Teeth 2:00", "Microwave 1:30", "Kettle 3:00", and with the unlock "1:00", "Shower 5:00", "10:00" and the rest.

**Flow (Teeth 2:00).** 0:00 ON AIR sting, song starts on beat; Dynamic Island shows the ON AIR bulb and a vinyl record that shrinks as the song plays, no digits. 0:30 "top right" sung into the lyric. 1:00 "bottom left"; Farrago gets eight bars to forecast a dental catastrophe. 1:30 "bottom right, last quarter." 2:00 the song ends on the downbeat with a rinse sting; the bulb goes out. The shower song carries a sung rinse bridge at 4:30; the microwave song ends on a ding in the arrangement. A rotation rule ensures no song repeats within seven days where a length has more than one flavour; the free tier's single flavours are exempt and the tiles say so.

**Screen versus audio.** The phone can be face-down. Only the bulb, the vinyl and a Stop button exist on screen.

**What each person does.** One tap.

**Failure paths.** Scrub does not apply; Stop ends the song on the next bar and logs "stopped early". The song plays wherever the phone is, or on the speaker if that route is on; a missing speaker falls back silently. Someone late is not applicable. A song started during a launch nests: the launch ducks 12 dB and nothing shifts; in v1 only the teeth song nests, and it is already part of WAKE.

**Logged.** Song, flavour, start time, route, completed or stopped early, and the entry point (tag, Shortcut, widget, Action Button, app).

### 4.3 Re-entry

**Trigger.** Lights-out minus 20 minutes, set in Settings. Re-entry is off until a time is chosen; on the first evening a single local notification offers "Splashdown tonight at 8:35? Bunny is standing by." with a one-tap yes. Scheduling uses the same alarm-plus-Live-Activity path with a softer station ID.

**Flow.**

| Clock | Phase | Audio | Screen |
|---|---|---|---|
| 8:15 | TIDY | Bunny Kowalczyk: "Good evening. This is Re-entry. Splashdown in twenty." Tempo about 20 BPM above where it will end. | Dusk purple, phase "TIDY". |
| 8:21 | TEETH | The 2:00 teeth cues in a slower arrangement. | Phase "TEETH". |
| 8:24 | BOOK | Nine minutes at descending tempo; Bunny reads tomorrow's manifest if it was edited. | Lamp-glow amber; manifest editor one tap away. |
| 8:33 | LIGHTS | Two minutes at resting tempo. | Screen dims to 20%. |
| 8:35 | SPLASHDOWN | A real buzzer, one bar of silence, then nothing. | Hangar (unlock) or a black card, "Splashdown 8:35." |
| 8:35:10 | END CREDITS (unlock, v1.1) | Sixty seconds of sung credits over the lit launch tower, built from today's manifest and log. | The credits card, then the clothesline widget. |

**Screen versus audio.** Audio carries the phases; the screen exists for the adult editing tomorrow's manifest during BOOK and for the credits afterwards.

**What each person does.** Children follow by ear. The adult edits tomorrow's manifest (thirty seconds) and accepts or declines a shorter launch if a scrub offered one.

**Failure paths.** Scrub works at night: the buzzer plays early and a scrubbed Re-entry is logged; there is no shorter offer because Re-entry is one length in v1. Phone not on the counter: pocket start. Speaker missing: fallback with no spoken line after 8 p.m. Someone late: Re-entry does not track people.

**Logged.** Date, start mode, route, phases as bars, completed or scrubbed, manifest edited or not, CreditsCard id once credits ship.

---

## 5. The Manifest with memory and the single Hold item

**Editing flow.** One list, edited on the counter phone from the Hangar, the Re-entry BOOK phase, the post-launch screen or a widget. Adding an item is a text field with autocomplete against a catalogue of pre-sung items (lunchbox, library book, water bottle, gym bag, permission slip, keys, wallet, badge, laptop, charger, umbrella, instrument, homework folder, and more; catalogue size is open question 16.1). An item has a name, an optional "last seen" place, an optional due weekday, and a recurrence (every launch, weekdays, one weekday, once). Items are ticked as they go into the bag; unticked items are what Gus sings; "once" items vanish after they are sung.

**"Last seen" memory.** Every item can carry a place from a short pre-sung list (kitchen counter, by the door, in the car, in the bag, on the hook, bathroom, bedroom, the other coat, unknown). It is set by typing, by tapping the item during Re-entry ("keys, where?"), or by a single prompt later in the day when the launch completed with keys unticked: "Keys: where did they end up?" Gus sings "keys, last seen kitchen counter" until someone changes it. There is no location tracking; "last seen" is what a person typed.

**How the janitor reads it in-song.** The bridge is a fixed-length section with slots on bar boundaries. Each catalogue item, place phrase, number ("day one" to "day thirty") and connective ("and", "still on the manifest", "that's the lot") is a short sung line in Gus's warm baritone folk lane, pre-generated in two or three melodic variants so the same item can land on different bars on different days. At runtime the app fills the slots: items in the household's order, then the Hold item, then the closing line. Overflow beyond the slots is covered by one pre-recorded spoken line, "and the rest is on the phone." An item not in the catalogue is spoken, not sung, by the system speech synthesizer over the bed, and the editor labels it "spoken, not sung". Nothing is generated at runtime and no text leaves the phone.

**The Hold item.** Exactly one avoided task, created from its own slot ("Something you've been putting off?"), never promoted automatically. Age starts at day 1 on the first launch after creation and rises one per calendar day whether or not a launch happened. Gus reads it at the end of every bridge in the same neutral voice as the lunchbox: "and the dentist call, day 23, still on the manifest." Growth caps at day 30: from then on the line stays "day 30" and nothing grows. Its colour on the Hangar deepens one step a week for four weeks and holds. No sad face, no red, no nag notification.

**Clearing and amnesty.** "Done" fires the victory sting, logs the cleared Hold with its final age and, with the unlock, gives whoever cleared it top billing in that night's End Credits. "Amnesty" declares it dead of natural causes: a short brass sigh, the item removed, the age recorded, no penalty. The slot reopens; a second Hold item cannot exist until the first is cleared or amnestied.

---

## 6. Crew patches, walk-up cues and the Stem Roll Call

This is the v1.2 feature set, included in the unlock.

**Crew patches.** A member has a name, a role (Pilot, Navigator, Cargo, Ground Crew), a colour, a five-second walk-up cue and a stem. Patches are bold circular badges in the member's colour. A solo household is automatically Pilot, Ground Crew and audience and never sees a roll call. A Guest Star patch lasts one launch and, when End Credits ship, always gets the best line.

**Walk-up cues.** Each member picks a five-second cue (mariachi, surf, marching band, and more as flavours ship). It fires in the bridge, on the next bar after their patch is tapped. This is the reluctant partner's on-ramp: "I want the mariachi one" is the whole onboarding.

**Stems.** Every launch track ships as four role stems (drums, bass, brass, choir) plus calm, medium and intense layers, all bar-trimmed so any combination plays in time. Pilot owns drums, Navigator bass, Cargo brass, Ground Crew choir. Before the bridge the shared bed plays alone; during the bridge a stem is silent until its owner punches in; from the final chorus on, everyone who punched in is audible, and T-0 is the first time all stems play together. Silence is audible: a missing stem is the only feedback a no-show gets.

**Pass-the-phone, no sync.** The counter phone is the only device with state.
1. At T-4:30 the launch screen shows every patch large in a grid; Augustine: "Roll call."
2. Whoever is nearest taps their patch; the walk-up cue plays on the next bar and the stem punches in on the bar after. The patch fills solid.
3. The phone is passed, or left on the counter, and the next person taps. A parent may tap a small child's patch; the app does not care who tapped.
4. At T-1:30 the horns enter regardless. At T-0 the fanfare plays with every punched-in stem; untapped patches stay hollow on the post-launch screen and are logged absent, not late.

Nothing is synchronised between phones. A second phone running the app is an independent installation; per-phone roles wait for the Season Two CloudKit share.

---

## 7. Scrub, the Mission Log and the Sunday Flight Review

**Scrub.** A toddler-sized abort robot with one big button, on the launch screen, the Live Activity and as an App Intent so a household can put a tag by the door. Pressing it: klaxon on the next bar, "weather", the track ends within a bar, and the launch is logged scrubbed with reason "weather". There is no other reason field. That evening the Hangar offers tomorrow at the next-shorter duration ("Shorter tomorrow: 10 minutes"); a second scrub in a row offers the one below, down to 8; after an on-time launch the offer stops.

**The Mission Log.** A rating, not a streak: "On time 42 of 50 launches", computed over the most recent 50 launches whose outcome was on time, late or scrubbed. No-launch and paused days count in neither number. It dips and never resets. Each entry is a card: date, duration, outcome, Door bar, Hold read, crew punch-ins. Yesterday is always editable to any of the four outcomes with no reason asked; older entries are locked except that any entry can become "no launch". Free shows the rating and 14 days of cards; the unlock shows 90. Nothing is deleted at either boundary.

**The Sunday Flight Review (unlock).** On the first no-launch morning of the week, opening the app or tapping the widget plays a two-minute review: Augustine reads the week's launches and outcomes, Farrago reports her forecasts and how each was wrong, Bunny counts the Re-entries, Gus reads the Hold item's age and anything cleared. On screen, launches in colour and scrubs in greyscale, with the crew's notes (one line per launch, written on the post-launch screen). Audio-first, skippable, and it never contains a percentage.

---

## 8. Onboarding: the first 60 seconds

No account, no household setup, no permission prompt before the person has heard the product.

**Screen 1, the score.** Full-bleed annotated waveform of the 12-minute launch: coloured phase bands WAKE, DRESS, MANIFEST, DOOR, and a horn marker labelled "shoes and door". Copy: "This is a launch. It's twelve minutes of music. The song is the schedule." Button: "Set the door." Footer: "Nothing leaves your phone. Ever."

**Screen 2, the door.** Copy: "When do you need to be out the door?" A wheel, defaulting to 7:40; "Weekdays" pre-selected with seven chips under it. Button: "Test fire (60 seconds)."

**Screen 3, Test Fire.** The score in miniature with a playhead. Augustine: "T-minus one. Launch window open." Gus sings a three-item demo manifest ending "and your keys, wherever they are." The horns come in at 0:45 and a Door button appears; tapping it fires the fanfare and the white flash (at 0:60 if nobody taps). Copy after the flash: "That's a launch. Tomorrow it's twelve minutes and the manifest is yours." Skip is visible throughout.

**Screen 4, who's launching (optional).** Copy: "Who's launching?" Empty crew patches; tapping one asks a name and shows the four roles ("Pilot: gets the drums"). Button: "Skip, it's just me." Footer: "A solo launch is Pilot, Ground Crew and audience." Small type, once: "Patches sing with the full unlock."

**Screen 5, speaker (optional).** Copy: "Play tomorrow on a speaker?" The system AirPlay picker. Button: "Phone speaker is fine."

**Screen 6, permissions.** Copy: "Augustine needs to be allowed to call it." The alarm and notification prompts follow. If declined: "You can still start every launch by hand from the widget."

**Screen 7, closing.** Copy: "Tomorrow at 7:28, Augustine will call it. You don't need to open the app." Below it the three free Request Line tiles, "Teeth 2:00", "Microwave 1:30", "Kettle 3:00", each playable now. Footer: "Tonight, if you like: add what needs to leave the house." The unlock is not mentioned. The manifest starts with one item, "keys, last seen unknown," so the first morning already has memory to fill.

---

## 9. Settings, widgets, Live Activity, StandBy Hangar mode, Shortcuts, Action Button and NFC

**Settings.** Door time per weekday; duration (free 10 or 12; unlock 8 to 20); flavour; first sound (station ID, soft brass, spoken checklist); volume ramp; Re-entry time and days; speaker route; quiet mode; visual-cue mode; crew (unlock); rotation on or off; travel behaviour; Station Log; About, carrying "Every line written by a person. Songs produced with Suno from those lyrics." and the privacy statement.

**Widgets.** Next Launch (small): door time, duration, Hold age. Request Line (medium): tiles, one-tap start. Manifest (small): unticked count and top three items. Clothesline (unlock, v1.1): the last seven End Credits cards on a line.

**Live Activity.** Three variants, limited to countdown, phase and role with no promotion, since guideline 4.5.3 forbids using Live Activities to "spam, phish, or send unsolicited messages" (https://developer.apple.com/app-store/review/guidelines/). Launch: cutout countdown, phase colour, Door and Scrub. Request Line: ON AIR bulb, shrinking vinyl, Stop, no digits. Re-entry: phase and dusk palette. Timing comes from the track's playback position, never the wall clock, so AirPlay latency cannot put the screen ahead of the sound.

**StandBy Hangar mode (unlock).** Docked sideways overnight, the app shows a colour-bars-style test pattern in the world's palette with the next launch time, manifest count, Hold age and tomorrow's duration if a scrub offered a shorter one. It is the docked-start surface. Free gets a plain StandBy view with the next launch time.

**Shortcuts (App Intents).** Start Launch (duration parameter), Start Re-entry, Start Request Line (song parameter), Scrub, Add Manifest Item, Set Last Seen, Mark Hold Done, Hold Amnesty, No Launch Tomorrow, Get Rating. All work with the app closed except the three that play audio, which open it.

**Action Button.** Controls for Start Request Line (last-used song), Scrub and Start Launch can be assigned to the Action Button or Control Center; Settings explains how in two lines.

**NFC tags.** No NFC code is in the app. The household sticks a tag on the microwave and creates a Shortcuts automation ("When NFC tag is detected, run Start Request Line: Microwave 1:30"). A "Tags" page in Settings gives three recipes and opens the Shortcuts app.

---

## 10. Accessibility

**VoiceOver.** Every control has a label and hint; the score is one element that reads its phases in order ("Launch, 12 minutes. Wake, 4 minutes... Horns at 1 minute 30 mean shoes and door."). Patches announce name, role and state. The track ducks while VoiceOver speaks during the bridge.

**Dynamic Type.** All text scales through the accessibility sizes; the phase name and countdown use the rounded display face and reflow rather than truncate; the manifest editor is a plain list.

**Reduced motion.** Sky transitions become crossfades, the shrinking vinyl a static bulb, the white flash a soft fade; the clothesline does not sway.

**Visual-cue mode.** For anyone who cannot rely on audio, the phone is the cue. Each phase change shows a full-screen phase card (name, colour band, pictogram: toothbrush, shirt, list, door) on the launch screen, StandBy and the Live Activity, with a distinct haptic per phase; the horn entry is a long double haptic and the screen turning hot orange. The manifest appears as large text, one item per card, advancing on the bars Gus sings. Request Line songs show a quadrant diagram for teeth and a filling bar otherwise. It runs with or without audio and is a v1 feature, because for a deaf household it is the product.

**Quiet mode.** Spoken cues and stings only: Augustine's phase calls, Gus reading the manifest in the spoken lane, the horn sting at DOOR, the fanfare at T-0. Still real audio, never a silent session. Because an app may use background modes only "for their intended purposes: VoIP, audio playback, location, task completion, local notifications" (guideline 2.5.4, https://developer.apple.com/app-store/review/guidelines/), quiet mode keeps the app in the foreground with the screen on; if the person leaves the app, remaining cues arrive as local notifications carrying the same short sounds.

---

## 11. Edge cases

**Weekends and no-launch days.** Door times are per weekday. With no door time, no alarm is scheduled, the widget says "No launch today," and the Request Line and Re-entry still work. With the unlock, opening the app plays the lounge track and, weekly, the Flight Review. Free users hear nothing unless they tap a tile.

**Holidays.** The app reads no calendar. "No launch tomorrow" is one tap on the Hangar, the BOOK screen or a Shortcut; it cancels the alarm and logs an excluded no-launch day. A date range is available in Settings. Optional calendar access is open question 16.5.

**Travel and time zones.** Door times are local wall-clock. On the first open after a zone change the app asks once: "You're three hours from home. Launch here at 7:28 local, or pause until you're back?" The default when nobody answers is pause, so nothing fires in a hotel at the wrong hour. Paused days are excluded; returning home lifts the pause.

**Guests.** A Guest Star patch is added from the roll-call screen with a name and no role, lasts one launch, gets a walk-up cue and, when credits ship, the best line. Guests are not stored unless the household taps "keep".

**Two adults with two phones.** In v1 one phone owns the household launch, manifest and log. A second adult may install the app for their own door time, Request Line and Re-entry; the two installations know nothing of each other. The speaker picker warns when two phones might both target one speaker. Enabling Family Sharing on the unlock lets a household pay once (open question 16.6). Shared manifest and per-phone roles arrive with Season Two.

**Snooze pressure.** There is no snooze; the alert has Stop and "Open the launch". Inside a launch two blameless instruments exist, both voiced by the Department of Five More Minutes. A *hold* pauses the countdown for up to five minutes, once, before the bridge, without moving the door; the app re-arranges the remainder to the next-shorter arrangement that fits and fills the gap with hold music. A *delay permit* moves today's door by 5, 10 or 15 minutes from the Live Activity and flags the entry. Neither touches the rating; the Flight Review shows permits in a lighter shade. The Board of Snooze Appeals is a running joke in Farrago's forecasts, not a mechanic.

**Phone volume and Do Not Disturb.** The station ID breaks through silent mode and Focus (WWDC25 source above). The track plays through the app's media session, unaffected by the ring/silent switch but subject to the volume slider, which the app cannot raise. The Hangar and the post-Re-entry screen show "Volume low for tomorrow" under a floor, and the Live Activity repeats it at T-12:30. A speaker route sidesteps phone volume entirely.

**The app killed in the background.** The alarm and Live Activity are scheduled with the system when door time is saved and after every launch, so a later force-quit does not remove tomorrow's alarm; pocket start applies. If the app is killed mid-track, playback stops, the Live Activity ends, and the entry is logged "interrupted" and offered for editing on next open. The app holds its audio session only while audio plays.

---

## 12. Data model overview

Everything lives in the app's own container on the device. No accounts, no analytics or crash-reporting SDKs, and no network requests beyond App Store purchases and, in Season Two, an iCloud share the person switches on. This is the Constellate stance carried over unchanged and supports a "Data Not Collected" privacy label: Apple's definition is that "data that is processed only on device is not 'collected' and does not need to be disclosed" (https://developer.apple.com/app-store/app-privacy-details/).

| Entity | Fields | Notes |
|---|---|---|
| Launch | id, scheduledDoorTime, weekdayMask, durationMinutes (8/10/12/15/20), flavourId, arrangementSeed, firstSound, routeId, state (scheduled, holding, playing, completed, scrubbed, noLaunch), startMode (docked, pocket, manual), delayPermitMinutes | The next row is created when the current one completes. |
| Track | id, kind (launch, reentry, requestLine, lounge, credits, sting), flavourId, lengthSeconds, bpm, stems[] (fileName, role, layer), generatedOn, licenceReceiptRef, version | Audio ships in the bundle as bar-trimmed CAF; the row is metadata. |
| SectionMap | id, trackId, version, phases[] (name, startBar, endBar), cues[] (bar, kind: roleCue, hornEntry, manifestSlot, forecast, buzzer), slotsPerBridge, barsTotal | Developer-authored JSON, versioned; the copyrightable layer. |
| ManifestItem | id, name, catalogueId (nullable), lastSeenPlaceId (nullable), dueWeekday (nullable), recurrence, ticked, sortOrder, createdAt, lastSungAt | Null catalogueId means spoken, not sung. |
| HoldItem | id, name, createdAt, ageDays (display-capped at 30), status (open, cleared, amnestied), resolvedAt, clearedByCrewMemberId (nullable) | At most one open row. |
| CrewMember | id, name, role (pilot, navigator, cargo, groundCrew, guest), colour, walkUpCueId, stemRole, isGuest, sortOrder | Solo households have one implicit member. |
| MissionLogEntry | id, date, launchId, reentryId, outcome (onTime, late, scrubbed, noLaunch, interrupted), lateBars, doorBar, phasesAsBars[], manifestItemIdsSung[], holdAgeRead, crewPunchIns[] (crewMemberId, bar), delayPermitMinutes, route, startMode, editedAt, note | Rating derived over the latest 50 entries with outcome in {onTime, late, scrubbed}. |
| CreditsCard | id, date, billingOrder[], guestLine, jokeLine, manifestSummary, holdEvent (nullable), imageRef | Rendered once at Re-entry end; shareable as an image carrying only first names the household typed. |
| Settings | doorTimes[7], durationMinutes, flavourId, firstSound, volumeRamp, reentryTime, reentryDays, routeId, quietMode, visualCueMode, rotationEnabled, travelBehaviour, unlockPurchased, unlockDate, stationLogCounters | One row. |

Backups follow the device backup; v1 has no export beyond the Station Log's copy-as-text.

---

## 13. Free versus paid boundary

Free is complete in itself and proves the product on the first morning. The unlock is a one-time $9.99 non-consumable under the App Store Small Business Program (15% commission under $1M in proceeds, https://developer.apple.com/app-store/small-business-program/). No ads, no accounts, no subscription; seasonal flavour drops are free updates. The paywall says exactly that, appears only when a free user taps a locked tile, and never shows urgency.

| Capability | Free | $9.99 unlock |
|---|---|---|
| Launch durations | 10 and 12 minutes | 8, 10, 12, 15, 20 |
| Launch flavours | One | All (marching band, surf, disco, big band, bluegrass at v1) plus seasonal drops |
| Re-entry | One track (lullaby) | Same at v1; more flavours as they ship |
| Manifest with memory, Hold item, Scrub, shorter-tomorrow, Test Fire | Yes | Yes |
| Mission Log | Rating plus 14 days of cards | Rating plus 90 days |
| Sunday Flight Review | No | Yes |
| Request Line | Teeth 2:00, microwave 1:30, kettle 3:00, one flavour each | Full library (1:00, 1:30, 2:00, 3:00, 5:00 shower, 10:00), two or three flavours each, weekly rotation |
| Crew roles, walk-up cues, Stem Roll Call | Names stored, not audible | Yes (v1.2) |
| End Credits, shareable card, clothesline widget | No | Yes (v1.1) |
| Weekend lounge track | No | Yes |
| StandBy | Plain next-launch view | Hangar |
| Household sharing via iCloud | No | Yes, when it ships (Season Two) |
| Quiet mode, visual-cue mode, VoiceOver, Dynamic Type | Yes | Yes |

---

## 14. Phased scope

Ship when the first morning proves the feel, not when the world is complete. Every v1 criterion is checkable by a person with a phone and a speaker.

### v1 (about four months): launches, Re-entry, manifest, Scrub, mission log and three Request Line songs on one phone

**Launch scheduling and start.**
- With door time 7:40 and duration 12, the station ID begins at 7:27:30 within one second when the app is docked in the foreground.
- With the app not in the foreground, an alert with the station ID fires at 7:27:30 showing "Open the launch", and one tap starts the track within three seconds.
- With the alert stopped, the Live Activity remains until 7:40 with a control that starts the launch.
- In silent mode with a Focus active, the alert still sounds.
- After a force-quit the previous evening, tomorrow's alert still fires.

**Playback and section map.**
- Every phase change lands on a bar boundary, within 50 ms of the mapped bar.
- The horn entry is at T-1:30 in both the 12- and 10-minute arrangements.
- Five consecutive launches with the same duration and flavour produce five different arrangement seeds.
- A chosen AirPlay route carries the whole track; if unreachable at start, the phone speaker is used and the spoken fallback plays once.
- With a route adding two seconds of latency, the Live Activity countdown reflects playback position, not the clock.

**Manifest and Hold.**
- "Library book", place "in the bag", due "Thursday" produces a sung line containing item, place and day in the next bridge.
- An item outside the catalogue is spoken and labelled "spoken, not sung".
- Twelve items in an eight-slot bridge sing the first eight in order and speak the overflow line once.
- Ticking an item before the bridge removes it from the song.
- After a launch with "keys" unticked, one prompt asks where they ended up, and the answer is sung next morning.
- A Hold item created on day 0 is sung as "day 1" next launch and "day 2" the launch after; on day 31 and beyond the count reads 30.
- Done plays the victory sting and closes the item with its age; Amnesty plays the sigh, closes it and reopens the slot; a second open Hold cannot be created.

**Scrub and Mission Log.**
- Scrub mid-launch stops the track on the next bar, plays the klaxon and "weather", and logs a scrub within the same second.
- That evening the next-shorter duration is offered; accepting changes tomorrow only; after an 8-minute scrub no offer is made.
- With 50 launches and 42 on time the log reads "On time 42 of 50 launches"; one more on-time launch reads 43 of 50 as the oldest drops.
- No-launch and paused days change neither number.
- Yesterday can be changed to any outcome and the rating updates at once; a two-day-old entry can only become "no launch".
- Free shows 14 days of cards and deletes nothing.

**Re-entry.**
- With lights-out 8:35, the track starts at 8:15 and the buzzer sounds at 8:35 within one second.
- The final bar's tempo is at least 15 BPM below the first bar's.
- The screen is at 20% during LIGHTS and dark after the buzzer until touched.
- Scrub during Re-entry plays the buzzer early and logs a scrubbed Re-entry.

**Request Line.**
- Teeth 2:00 runs exactly 120 seconds from first beat to last, with sung cues at 0:30, 1:00 and 1:30 within one beat; microwave 1:30 and kettle 3:00 are within one beat of nominal.
- Each song starts from the widget, a Shortcut, the Action Button Control and an NFC-triggered Shortcut with no further tap.
- The Dynamic Island shows the bulb and vinyl and no digits; stopping early logs "stopped early".

**Onboarding.**
- A new install reaches the end of the Test Fire in under 60 seconds with two required taps.
- No permission prompt appears before the Test Fire has played; declining alarm permission leaves every launch startable from the widget.

**Settings, widgets, Shortcuts.**
- Every setting in section 9 persists across a force-quit.
- The three v1 widgets show correct data within one refresh of a change.
- All ten App Intents appear in Shortcuts and behave as described.

**Accessibility.**
- With VoiceOver on, every screen is navigable and the score reads its phases in order.
- At the largest accessibility size no control is clipped.
- With Reduce Motion on, nothing animates beyond a crossfade.
- In visual-cue mode at zero volume, a tester identifies every phase change and the horn from screen and haptics alone.
- In quiet mode every phase and the horn are audible as spoken cues and stings, with no silent audio between them.

**Privacy and store.**
- A network monitor shows no outbound connections in a full day of use apart from StoreKit.
- The privacy questionnaire is answered "Data Not Collected".
- The first screenshot and the first screen are the annotated score.

### v1.1: the full Request Line and End Credits
Full library with weekly rotation; End Credits built from the day's manifest and log with billing order computed from carried load; the shareable card; the clothesline widget; the lounge track, Flight Review and Hangar. Criteria written at v1 ship.

### v1.2: crew stems and walk-up cues
Audible patches, four role stems, the Stem Roll Call with pass-the-phone, guest patches, late and absent logging in bars.

### Season Two
CloudKit household share (shared manifest, per-phone roles); the 5 p.m. "Fuel" segment that settles dinner from the house menu with one veto; Dreadlines (renamed) as a second app in the same world's sound; human re-recordings of the station ID, fanfare and launch melody.

---

## 15. What the developer can measure without analytics, and what success looks like

**On-device counters the person can see.** Settings carries a Station Log: install date; launches scheduled, on time, late, scrubbed, no-launch, interrupted; docked versus pocket starts; routes used; Request Line plays by song, completed versus stopped; manifest items sung and the five most-sung; "last seen" answers; Hold items cleared, amnestied and the oldest age reached; Re-entries completed; Test Fires; quiet-mode and visual-cue days; unlock date. "Copy station log" puts it on the clipboard as plain text. Nothing is sent anywhere; the developer sees it only if a person pastes it into a review, an email or a TestFlight note.

**What the developer sees without any SDK.** App Store Connect's aggregated figures (impressions, downloads, proceeds, unlock conversions, retention by cohort), ratings and reviews, TestFlight feedback, and crash reports from people who opted in through the system setting. That is the whole measurement stack.

**Success at 30 days.**
- Day-30 retention above the 3.5% to 4% health-and-fitness benchmark (https://uxcam.com/blog/mobile-app-retention-benchmarks/).
- Download-to-unlock conversion above the 2.1% freemium median RevenueCat reports at day 35 (https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026).
- At least ten written reviews, most five-star ones mentioning "one purchase", "no subscription" or "the music", the phrases that recur for Streaks at $5.99 one-time (https://apps.apple.com/us/app/streaks/id963034692).
- Approval on first or second submission with no 4.3(b) rejection; Apple's June 2026 rewrite names "simple timers" as a saturated category requiring a "meaningfully different or improved experience" (https://www.macrumors.com/2026/06/09/app-store-guidelines-low-quality-apps/; https://developer.apple.com/news/?id=a233fmpw).
- Pasted station logs show docked starts outnumbering pocket starts.

**Success at 90 days.**
- Day-90 retention no lower than half of day 30: the shape of a structural habit, not a novelty.
- Reviews or pasted logs from at least three household types other than families.
- v1.1 shipped and the End Credits card visibly shared in reviews or on channels the developer already watches.
- Refunds under 2% of unlocks.
- Proceeds covering the Suno subscription and developer account with margin, on Apple's 33-to-45-day payout lag. Only 17.3% of new apps reach $1K in monthly revenue within two years (https://www.revenuecat.com/state-of-subscription-apps), so the 90-day bar is trajectory, not income.

---

## 16. Open questions for the developer to decide

1. **Catalogue size.** How many pre-sung manifest lines and variants fit the beta budget of about 45 paid downloads and the launch budget of about 110? This sets how often a household hears "spoken, not sung".
2. **Docked start as the story.** "You don't need to open the app" is fully true only when the phone is docked with the app in the foreground. Say so in onboarding, or let the one-tap pocket start go unsaid?
3. **Hold and delay permits.** Both in v1, or only the hold?
4. **Free log window.** 14 days of cards free, 90 with the unlock. Confirm.
5. **Calendar access.** Never, or an optional read-only permission in v1.1 to pre-mark school holidays?
6. **Family Sharing on the unlock.** Enable it so a household pays once (recommended), or require a second purchase per phone?
7. **Rating window.** 50 launches is ten weeks for a five-day household and longer for a shift worker. Keep 50, or use 30 days?
8. **Re-entry length.** A 10-minute variant in v1.1 for small children or late nights?
9. **Quiet mode's foreground requirement.** Confirm the screen-on approach and whether the notification fallback ships in v1.
10. **Interrupted entries.** Default to "no launch" or to "interrupted" awaiting an edit?
11. **The name.** Every candidate in WINNER.md is unverified in trademark classes 9, 41 and 42 and App Store Connect. Clear a name before any asset is drawn.
12. **Human re-recording timing.** Before v1, so the alarm sound and fanfare are defensible from day one, or within year one as WINNER.md allows?
