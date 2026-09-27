# GEOL 1001-002 Exam 1 Study Lab (v3)

General Geology: Physical · Professor Guangsheng Zhuang · Fall 2026 · Exam 1 (Chapters 1–6), Tuesday Sep 29, 10:30 AM, Howe-Russell W130.

A source-cited study guide with one shared mastery record across practice, cases, Boss drills, written self-checks, and Exam 1 learning mocks. Runs in your browser with no account, backend, or paid API.

## Open it

**Live lab:** https://ethanheinrick01-ctrl.github.io/lsu-geol-1001-study-lab/

**Offline copy:** double-click `index.html`. It opens in your browser from the file itself. No internet, install, account, or paid API is needed.

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
6. **Mock** opens three learning mocks: 25 multiple choice, 8 short answers, and 7 grouped investigations, following the September 24 review. Confidence comes before immediate feedback. First responses stay fixed; corrections are saved separately.
7. **Data:** export a backup (.json) often. You can also import your old lab's backup file here (for example `GEOL-progress-2026-09-17T19-18-14.029Z.json`).

## What "mastered" means here

Two correct, unhinted answers on different questions earn mastery when the second has Medium or High confidence. Mastery stays earned. Later misses enter review and clear after two independent correct answers following the miss. All checked exercise modes feed the same record, including rubric self-assessments (labeled separately). Corrections after feedback do not count as independent answers. Imported old-lab summary marks remain review signals rather than new mastery.

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

The September 24 exam review supplies the exam format and focus. Repeated lecture explanations guide the introductory practice style; they do not establish exact exam questions. Chapter 6 has no deck or recording in the package, so it is taught from the textbook, and each card says so.

Course slides and textbook figures are included for your personal study only. Do not share the folder.

Storage key: `geol1001-lab-v3`. Old-lab keys (`geol1001-guided-progress-v1`, `geol1001-study-lab-progress-v1`) are read, never written. Version 3.1.0, updated 2026-09-27.


## September 24 Exam 1 update

Exam 1 now provides the professor-review topic map, actual course figures, three untimed 25/8/7 review sets, immediate feedback, separate first-try/correction history, and resumable drafts. Existing progress uses the same storage key. See [Exam 1 update and verification](docs/EXAM1_UPDATE.md) for the evidence, compatibility receipt and test results.

## September 27 cohesive update

COMD-style navigation and dashboard, shared mastery and review, persistent ordinary-session drafts/history, and targeted transcript refinements. See [update receipt](docs/COHESIVE_UPDATE_20260927.md). Use the same URL and browser for automatic persistence; use Data → Export/Import for backup or another device.
