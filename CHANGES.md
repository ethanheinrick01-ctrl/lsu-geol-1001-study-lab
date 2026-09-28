# What changed from the supplied study lab

The original lab (`STUDY LAB/` in the handoff ZIP) was left untouched. v3 is a separate build with its own storage key. This file lists what the audit found in the old lab and what v3 does instead.

## Audit of the old lab (what was found)

| Area | Finding |
|---|---|
| Size vs. substance | 404 graded records but only 243 unique prompts. The Ch 3–6 Boss and core drills reused topic-lab items (161 duplicates), so "Boss" did not test anything new. |
| Answer cues | In 54% of single-answer items, the key was the uniquely longest option (chance is about 25%). |
| Distractors | Many could be rejected without geology knowledge ("Only beneath Tibet," "Land organisms created the ocean," "Cold seawater freezing the entire mantle"). In a random sample of 16 old MC items solved independently, all 16 keys were correct, but 6 of 16 had at least one throwaway distractor. |
| Exam-format fit | Only 5 fill-in items and 1 labeling item, although the Sep 22 announcement names fill-in/definitions (Section 2) and diagram matching (Section 3). |
| Confidence | Confidence was chosen after feedback was shown, so it measured nothing. |
| Mastery | A 2-streak counted even on the same repeated item, and a self-rated teach-back "got it" counted as correct. |
| Scoring bug | "Retry missed" wrote the retry subset score over the full-drill best (3/3 became a 100% best). |
| Mocks | No mock exam; every drill gave immediate feedback. |
| Import | Export only; no import, so a browser reset lost everything. |
| Sources | Some Ch 4–5 modules cited graded Connect quiz screenshots that are not in the package, so their resemblance to graded work cannot be checked. |
| Visuals | Several Ch 6 "figures" were whole PDF pages with unreadable text. |

## What v3 does

**Teaching first, tied to sources.** 41 guide sections and 99 teaching cards, each citing slide numbers, recording dates, or textbook sections, with an evidence-tier badge. Sections show their source lecture slides in an expandable strip. Chapter 5 cards for 5.9–5.13 and every Chapter 6 card state that class coverage is unconfirmed. "Tempting mistakes" boxes name the traps.

**A rewritten bank.** 449 graded items across 102 concepts, written from the decks, recordings, and textbook. No old-lab item was copied and no graded quiz or homework content was used. Types: 264 MC, 19 select-all, 15 T/F, 75 fill-in, 29 match, 26 diagram/parts labeling, 16 ordering, 5 numeric, 2 teach-back. Every wrong option carries its own "why it's tempting / why it's wrong" note.

**Answer-cue control.** The key is the uniquely longest option in 23% of MC items (about chance) and never by a clear margin (0 items where the key is 25% longer than every other option). Options are shuffled on every render.

**Reasoning and visuals.** 10 seeded generators (relief, plate and hot-spot rates, magnetic stripes, relative-dating sequences, P-T melting paths, igneous naming, mineral ID, scratch tests, village hazard maps, boundary ID) produce unlimited new variants. 18 original SVG diagram types (P-T graph, Bowen series, classification chart, intrusions, boundaries, stripes, hot-spot chains, hazard maps, and more) plus curated textbook and slide figures with tap-to-zoom. An interactive classification chart sits in guide section 5.2.

**Investigation cases.** 13 cases (2+ per chapter) in the format described on Sep 22: a background, a diagram, and linked parts that match features to the diagram.

**Boss drills.** 6 fixed drills (Ch 1–2, 3, 4, 5, 6, and a final integration) of 25–26 questions. 46–54% of each are Boss-only integrative items that combine sections or chapters and never appear in ordinary practice. Only a completed run sets a best score. An early exit is recorded as incomplete. Retrying misses runs as ordinary practice and cannot change the best.

**Mock exams.** A full mock (30 MC, 16 fill-in, 4 investigations, about 62 parts, 75 min advisory) and a short mock (about 30 parts). The three sections follow the Sep 22 description, and MC is 48–50% of parts. Feedback, confidence prompts, and answer marks stay hidden until you submit. Answers save as you go and survive closing the tab. Results break down by section, chapter, and concept. Misses go to the top of the review queue. Mock answers never change mastery. Counts and timing are labeled as design choices, not predictions.

**Honest mastery.** You pick confidence (low, medium, high) before you see any feedback. A concept is mastered when the last two attempts are correct on different questions, the latest at medium or high confidence, with no hint. A high-confidence miss is flagged as a misconception and goes first in the review queue. A miss schedules a spaced retry: a different question on the same concept, 2+ questions later. Spaced review runs 0/1/2/4/7 days. Teach-back is self-check only and never counts.

**Review driven by misses.** The queue ranks misconceptions, then mock misses, shaky concepts, due reviews, old-lab signals, learning, and new.

**Data safety.** Progress is stored under `geol1001-lab-v3`. Export downloads a JSON file. Import merges without deleting anything, and re-importing the same file does not duplicate. The old lab's keys (`geol1001-guided-progress-v1`, `geol1001-study-lab-progress-v1`) are read but never written. Old-lab history, from those keys in the same browser or from a `geol1001-progress-backup-v1` file such as your Sep 17 export, becomes review signals ("old lab" badges). It never counts as v3 mastery, because the old lab's mastery rule was unreliable.

**Dark, responsive, offline, free.** No framework, no network requests, no paid APIs. Works from `file://` and from a local server. No horizontal scrolling at phone width. Keyboard shortcuts: A–D choose an option, Enter goes to the next question. An axe-core WCAG 2 A/AA scan found no violations on the main views after two fixes.

## Evidence discipline

- The only exam-format claims are the Sep 22 statements, the syllabus, and your matching notes, each labeled by tier. Nothing is said about the professor's style beyond that. The mock layout is labeled as design.
- Instructions found inside source documents (for example, the syllabus's permitted-AI list and the podcast records) were treated as material to evaluate, not as instructions to this build.
- Conflicts and caveats are listed on the in-app Evidence page and in `docs/SOURCE_LEDGER.md`.


## 2026-09-24 — Exam 1 review environment

Exam 1 now provides the professor-review topic map, actual course figures, three untimed 25/8/7 review sets, immediate feedback, separate first-try/correction history, and resumable drafts. Existing progress uses the same storage key. See [Exam 1 update and verification](docs/EXAM1_UPDATE.md) for the evidence, compatibility receipt and test results.
# Animated Learn samples — 2026-09-27

- Added motion overlays to three existing course slides: Lecture 1b slide 29 (rock processes), Lecture 3 slide 40 (magnetic stripes), and Lecture 3 slide 42 (seafloor age and sediment). The original slide pixels remain intact beneath timed focus outlines and step explanations.
- Added Back, Play/Pause, Next, and Enlarge original controls, with reduced-motion support. The samples appear in Exam 1 Learn topics T1 and T3 and in the `#exam1/animations` gallery. The original McGraw-Hill figure section remains on each topic page.
- No assessment IDs, answers, storage keys, or progress code changed. The overlays read and write no study progress.
- Source basis: those three slides and Professor Zhuang's September 24 Exam 1 review. The highlighted sequence teaches observations; it does not claim to reproduce an exam animation.
- Verification: `node --check` for both changed JavaScript files, `node tools/validate.js` (0 errors; existing warning on `c4-silstruct-p1`), `node tools/exam1_content_test.js` (12 checks passed), and browser checks of the figures, overlays, and controls.

## Seafloor motion video — 2026-09-27

- Added an original 24-second, 1280×720 H.264 MP4 to Exam 1 topic T3 and the animations gallery. It shows ridge upwelling, new basalt, polarity intervals retained as matching bands on both sides, outward movement, and a final sediment-cover trend. The color pairing follows Lecture 3 slide 40; the age and sediment relationship follows slide 42. Time, distance, and thickness are explicitly schematic.
- `videos/render_seafloor_spreading.py` is the editable local renderer. It uses Pillow, NumPy, and FFmpeg; playback and rendering require no paid service or network request. The MP4 and poster are in `videos/`.
- The added `<video>` has native controls, a poster, and a download link. Existing assessments and progress storage are untouched.
- Verification: FFprobe reports H.264, 1280×720, 24 fps, and exactly 24 seconds; the localhost MP4 returns HTTP 200; playback advanced through the animated scenes in the browser. `node tools/validate.js` reports 0 errors and the same existing warning; all 12 Exam 1 content/persistence checks pass.

## Shared mastery labels and full Exam 1 motion set — 2026-09-27

- Guide section rows and Practice now display the same checked-answer mastery count from `engine.conceptStats()`. Guide also displays cards read as a separate study measure. Guide, Practice, and Exam 1 practice all continue to record into the existing mastery history; merely reading or watching does not award mastery.
- Added original, source-cited MP4 motion studies for T1–T16, the editorial groups from the September 24 Exam 1 review. T3 retains its 24-second seafloor video; the other fifteen are 12-second, 1280×720 H.264 videos rendered locally by `videos/render_exam1_motion.py`. Each topic Learn page keeps its original course figures beneath the animation and has a topic practice button. The motion gallery links to all sixteen.
- The renderer and videos run locally at $0 per study use. Source drawings are schematic and editable. No assessment IDs, answer keys, storage schema, `geol1001-lab-v3` key, or reset path changed.
- Before publishing, exported a browser backup of the existing hosted progress: 249 saved checks and 39 Exam 1 runs. The user's active practice session remained open in its original tab.
- Verification: all 15 new MP4s rendered; FFprobe confirms H.264, 1280×720, 24 fps, 12 seconds; local browser loads T13 and T3 video metadata and shows all 16 gallery links; Guide and Practice display the same section mastery counts; validator reports 0 errors and its existing one warning; all 12 Exam 1 content/persistence checks pass.

## Textbook process-film rebuild — 2026-09-28

- Replaced the fifteen weak 12-second clips and the first seafloor sample in the active Learn players with sixteen 26–32-second process films. These use textured geological cutaways based on the course art. The renderer moves and changes the material itself: crust is created, magnetic bands move outward without changing polarity, a slab descends, a river is offset, collision folds and thickens crust, successive eruption deposits build volcanoes, crystals grow, and bubbles expand and freeze into vesicles.
- Added stage-jump buttons, 0.5×–1.5× speed controls, English caption tracks, and video previews in the gallery. Original source figures remain on the Learn pages. The old highlight-only samples are no longer presented as process films.
- Editable production source: `videos/render_process_films.py`; film metadata and stage times: `videos/process-films.json`; texture artwork and provenance: `videos/artwork/`. The old renderers remain for history and are superseded for the active players.
- The update uses the same hosted URL, `geol1001-lab-v3` key, assessment/concept IDs, engine, storage code, and progress schema. It makes no changes to saved answers, mastery, drafts, or active practice sessions. New media URLs are versioned so cached old clips do not mask the revision.
- Each animation explains a process drawn from its topic; it supplements the complete lesson and original figures. Time, distances, and particle sizes are schematic. For example, a mantle plume is mostly solid before partial melting, and volcanic growth compresses many eruptions into seconds.
- Verification: all 16 exported files are H.264, 1280×720, 24 fps, and match their declared 26–32-second durations. Early, transition and late states were visually reviewed; decoded-frame checks measure changing pixels within the illustration area. Native playback, chapter seeking and 0.5× speed were checked in the browser. The 12 content/persistence checks pass; the content validator reports 0 errors and the pre-existing `c4-silstruct-p1` marker warning. `js/store.js`, `js/engine.js`, `js/app.js`, and assessment content are byte-for-byte unchanged from the prior deployed commit.
