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
