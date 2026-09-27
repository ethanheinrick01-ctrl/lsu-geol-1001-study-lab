# GEOL 1001-002 Exam 1 Study Lab (v3)

General Geology: Physical · Professor Guangsheng Zhuang · Fall 2026 · Exam 1 (Chapters 1–6), Tuesday Sep 29, 10:30 AM, Howe-Russell W130.

A private, offline study system: a source-cited study guide, practice where you commit your confidence before any feedback, spaced review driven by your misses, integrative Boss drills, and mock exams that hide feedback until you submit.

## Open it

**Easiest:** double-click `index.html`. It opens in your browser from the file itself. No internet, install, account, or paid API is needed.

**If your browser blocks something from a file** (rare), run a tiny local server instead. In Terminal:

```
cd path/to/GEOL1001_STUDY_LAB_V3
python3 -m http.server 8811
```

Then open http://localhost:8811 . Stop the server with Ctrl+C.

Use one browser consistently. Progress is saved in that browser only.

## First five minutes

1. **Home** shows the countdown, your weakest concepts, and what to do next. If it finds the old lab's progress in the same browser, it offers to import it as review hints. That is read-only; the old lab is not changed.
2. **Guide:** read a section. Every card shows its source (slide, recording date, or textbook section) and an evidence badge. Open "Source slides for this section" to see the actual lecture slides.
3. **Practice:** choose an answer, then submit with **Low / Medium / High** confidence. Feedback appears only after that. Keys: A–D pick an option, Enter goes to the next question.
4. **Review** runs your misses first: high-confidence misses, then mock misses, then shaky and due concepts.
5. **Boss** drills are fixed 25–26-question integrative runs. Only a completed run sets a best score.
6. **Mock** exams follow the three sections the professor described on Sep 22. There is no feedback until you submit.
7. **Data:** export a backup (.json) often. You can also import your old lab's backup file here (for example `GEOL-progress-2026-09-17T19-18-14.029Z.json`).

## What "mastered" means here

The last two answers on a concept are correct, on different questions, the latest at Medium or High confidence, with no hint. A High-confidence miss is flagged as a misconception until you clear it. Mock answers and old-lab history never count toward mastery.

## Folder contents

| Path | What |
|---|---|
| `index.html`, `css/`, `js/` | The app (plain HTML, CSS, JS; no framework) |
| `js/content/` | Study guide, items, cases, Boss drills, mocks, generators (each item cites its sources) |
| `assets/img/` | Lecture slide renders, textbook figure crops, a few photos |
| `docs/SOURCE_LEDGER.md` | Every source in the package, how it was reviewed, and how it was used |
| `docs/EVIDENCE_MAP.md` | Source → section → concept → practice coverage, generated from the content |
| `CHANGES.md` | Old-lab audit findings and what v3 does differently |
| `VALIDATION.md` | Tests run, results, and limitations |
| `docs/validation-logs/` | Raw outputs from the validators, browser tests, and blind answer-key audit |
| `tools/` | Validator, blind-audit export, report generator, browser test (for maintenance; not needed to study) |

## Evidence rules the lab follows

- **Tier 1**: Professor Zhuang's own statements (Sep 22 recording, Lecture 1a) and the syllabus.
- **Tier 2**: What the decks, recordings, and textbook show.
- **Tier 3**: Your notes.
- **Tier 4**: Lab design or inference.

The lab makes no claims about his exam style beyond what he said on Sep 22 and what the syllabus states. Chapter 6 has no deck or recording in the package, so it is taught from the textbook, and each card says so.

Course slides and textbook figures are included for your personal study only. Do not share the folder.

Storage key: `geol1001-lab-v3`. Old-lab keys (`geol1001-guided-progress-v1`, `geol1001-study-lab-progress-v1`) are read, never written. Version 3.0.0, built 2026-09-23.


## September 24 Exam 1 update

Exam 1 now provides the professor-review topic map, actual course figures, three untimed 25/8/7 review sets, immediate feedback, separate first-try/correction history, and resumable drafts. Existing progress uses the same storage key. See [Exam 1 update and verification](docs/EXAM1_UPDATE.md) for the evidence, compatibility receipt and test results.
