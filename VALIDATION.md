# Validation results and limitations

## October 6, 2026 · Exam 2 addition

The Chapters 7–8 addition passes structural, isolated engine/storage, media decode and source/figure checks. The public edition excludes the full supplied packet and private professor evidence. Live media, grading, confidence, drafts, export/import, Boss scoring and the desktop/phone exam chooser passed isolated browser checks; see [Exam 2 release receipt](docs/EXAM2_RELEASE.md). The earlier browser results below are historical.

Everything below was run on the packaged build (this folder), on 2026-09-23. Commands are run from this folder unless noted.

## 1. Content validator (`node tools/validate.js`)

Result: **0 errors**, 1 warning. The warning is on `c4-silstruct-p1`, a labeling item whose diagrams use numbered captions instead of in-figure markers. That is intended.

What it checks: unique IDs; every item and card cites known source codes; images exist; every SVG renders; MC and T/F items have exactly one key; select-all items have at least one key and one distractor; parts keys appear in their option lists; every concept has a teaching card and at least two practice items (or a generator); each generator is built 300 seeds × each concept it serves, checking keys, duplicate options, and diagrams; each Boss has 25 or more questions with at least 40% Boss-only items; each mock is built 20 times with no Boss items leaking in; answer-length cue rates.

| Measure | Value |
|---|---|
| Graded items | 449, plus 2 teach-back self-checks |
| Concepts / sections / teaching cards | 102 / 41 / 99 |
| Investigation cases / Boss drills / generators | 13 / 6 / 10 |
| Key is the uniquely longest MC option | 60 of 264 (23%; chance is about 25%; old lab: 54%) |
| Key longer than every other option by 25% or more | 0 of 264 |
| Key is the uniquely shortest option | 12 of 264 |
| Boss sizes (Boss-only share) | 25–26 questions (46–54%) |
| Mock parts (MC share) | full about 62 (48%); short about 30 (50%) |

## 2. Skill checks (`SKILL/build-course-study-lab`)

- `node --check` on every runtime file: all pass.
- `node tests/test-v2.mjs` (the skill's engine self-test on its own template): passes (item types, retry spacing, mastery, misconception, Boss partial and full scoring, mock, export/import). This tests the skill's template, not this lab.
- `node scripts/validate-study-lab-v2.mjs <lab> --hydrated`: 116 errors, 449 warnings. **Every one is a deliberate difference between the v3 contract and the v2 validator, not a content defect:**
  - 75 × "unsupported type fill": v3 adds a fill-in type because the Sep 22 announcement names fill-in/definitions as a whole exam section, and v2 has no such type.
  - 41 × "section needs number…": v3 numbers sections "5.1", "5.2"… (chapter.section). v2 wants integers.
  - 449 warnings: v3 stores each item's overall explanation in `x`, and v2 looks for `explain`.
  - Every other v2 rule passes (sources, tiers, keys, rationales, teaching coverage, 2+ roots per concept, Boss size, image alt text).

## 3. Browser tests (`python3 tools/browser_test.py <url>`, Playwright + Chromium)

Run at `http://localhost` (served by `python3 -m http.server`) and at `file://`. **37 of 37 checks passed on both** (final run on the packaged folder).

1. All 56 views render (home, guide index, 6 chapter pages, 41 sections, practice, review, Boss, mock, progress, evidence, data). No broken images, including the source-slide strips.
2. The classification widget returns Basalt for mafic + fine.
3. The confidence/submit buttons are disabled until an answer is chosen. No feedback shows before submit. Feedback with explanations shows after submit.
4. A high-confidence miss is marked a misconception and goes first in the review queue.
5. Two correct answers on different questions at medium confidence give mastery. The same question twice does not.
6. A miss schedules a spaced retry: same concept, different question, at least 2 questions later.
7. All 10 generators render and grade correct answers as correct.
8. Short mock (30 parts): no feedback, verdicts, or confidence prompts appear during the exam, and the answered count is tracked. Submit shows section, chapter, and remediation results. Mock answers do not change mastery. Mock misses feed the review queue. History persists across reload. The full mock builds (62 parts).
9. Boss: a complete 25-question run records a best score, and Boss mode shows no hints. Retrying misses as practice leaves the best unchanged. Ending early records an incomplete run with no best.
10. Export has the right format and schema. Import after clearing restores all attempts. Re-import does not duplicate. A bad file is rejected with no change.
11. **Your real Sep 17 old-lab export** imports through the Data page file picker: 4 old concepts mapped to 5 v3 concepts, none unmapped. The old miss becomes a review signal, not mastery. When old-lab keys are in the same browser, Home offers an import, and the old keys are left byte-identical.
12. Reset (double confirm) clears v3 progress and leaves the old-lab keys.
13. Keyboard: letter keys choose options and Enter advances. Image zoom dialog opens. Answer options are shuffled on screen (the keyed position varies across renders).
14. No horizontal scrolling at 390 px on 9 views plus a question with a diagram.
15. No console errors or page exceptions. **No external network requests.**

Accessibility: an axe-core WCAG 2 A/AA scan of home, guide, a guide section, practice, a practice question, Boss, mock list, mock-taking, progress, evidence, and data found 2 issues: a button inside a `<summary>`, and an unlabeled file input. Both were fixed, and a rescan found none.

## 4. Answer-key audit

Two independent examiner agents answered all 449 items **blind**: they had the question and options only, with no keys and no source code. They matched the key on 442.

The 7 disagreements:

- `c1-ilea-o1`: the course-specific ILEA order from Lecture 1a slide 18 (Predict → Draw → Justify → Research → Revise). Kept, because the lecture defines it.
- `c2-sequence-o2`: depended on an unseen slide. The stem now states the stacking, and the slide is shown.
- `c4-commonsil-f1`: "ferromagnesian" is now accepted.
- `c5-visc-m2`: the auditor chose silica. The textbook (5.7 C.3) explicitly calls temperature the most important control, so the key stands.
- `k5-pluton-1`: figure-dependent; the rendered figure matches the key.
- 2 were formatting artifacts of the comparison.

The auditors raised 48 flags. Fixes made from them:

- A P-T point sat 0.9 units on the wrong side of the wet melting curve in 2 items; moved.
- The "fracture zone" definition was inconsistent with the transform items; reworded.
- A Boss stem said fracture zones connect ridge offsets; now it says transform faults do.
- The sill vs. buried-flow ambiguity in `b4-10`: baked rock above is now stated.
- `k2-crater-3` data also weakened a second hypothesis; data changed.
- An ambiguous Bowen T/F was reworded.
- "Mafic and ultramafic" became "mafic or ultramafic."
- The thickness is now stated in the isostasy stem.
- Fill-in synonyms added: phaneritic/coarse, aphanitic/fine, tephra/pyroclastic material, nonferromagnesian.

Flags kept on purpose:

- Mica interlayer bonding is "intermolecular" because textbook 4.12 says so.
- A shell is not a mineral per the textbook and the Sep 8 lecture.
- Lecture-defined orders are kept.

The auditors' "correct option is always A" flag describes the export order only. Options are shuffled on screen (a browser check confirms the keyed position varies across renders).

## 5. Limitations (read these)

- **Chapter 6 is textbook-only.** No Ch 6 deck or recording was in the package, so what the professor emphasized in class is unknown. Textbook 6.15 is incomplete and was not used.
- **Chapter 5 sections 5.9–5.13** are textbook-based. The recordings end at Bowen's series. Sections 4.15–4.16 and 5.14–5.15 were not read in full, and no items depend on them.
- **Unrecorded lectures** (Aug 25, Aug 27, Sep 3, Sep 17) and the missing handwritten-note images mean class emphasis on those days is unknown.
- **Recordings are machine transcripts.** Where wording was unclear, items cite the slide or textbook.
- **The mock is a design.** Section order and the MC share follow the professor's Sep 22 description. Question counts, timing, and the even chapter spread are choices. On Sep 22 he said the exam was not written yet. A mock score is not a grade prediction.
- **Textbook and slide images** are course materials copied for personal study. Do not redistribute the folder.
- **Progress lives in one browser.** Export before clearing browser data or switching browsers or computers.
- **Automated tests used Chromium.** Safari was not tested directly. The code uses only standard features (no framework, no modules), and the layout was checked at phone width in Chromium.
- **The answer audit** was done by AI examiners plus source checks, not by the professor. If class notes contradict an item, trust the class and report the item ID.


## 2026-09-24 Exam 1 verification

Exam 1 now provides the professor-review topic map, actual course figures, three untimed 25/8/7 review sets, immediate feedback, separate first-try/correction history, and resumable drafts. Existing progress uses the same storage key. See [Exam 1 update and verification](docs/EXAM1_UPDATE.md) for the evidence, compatibility receipt and test results.
