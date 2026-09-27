# LSU GEOL 1001 Study System

Private study workspace for **GEOL 1001-002: General Geology — Physical** (Fall 2026).

## September 15, 2026 extension

Current coverage supersedes the older build description below: Chapters 1–5 are live; Chapter 6 still needs evidence. The additive Chapter 4–5 update adds 9 sections, 18 concepts, 39 original graded activities, and 16/16/32-item chapter and combined drills. Core practice is separated from secondary settings/intrusions review. Source notes, classroom chart, silicate figures, and an interactive classification table accompany the questions.

Keep using the existing Chrome bookmark and profile. The original 21 modules, 42 concepts, quiz records, progress keys, and grading engine are preserved. The mastery denominator is now 60. Use **Download progress backup** to export both browser-local progress records; an app-folder backup alone does not contain browser progress.

See `source-materials/ch4-ch5-audit/COMPLETE.md` for evidence, validation, and verification limits. No hosting, upload, API, or per-use cost was added.

This repository is built around three separate exam systems:

- **Exam 1:** Chapters 1–6
- **Exam 2:** Chapters 7–12
- **Final:** Cumulative, Chapters 1–19; combines the completed Exam 1 and Exam 2 systems before adding Chapters 13–19

Each exam system is split into two equal halves:

- **Study Guide:** the teaching/reference half, built from the completed Lecture 1 guide plus the audited 32-slide Lecture 2 deck. Every live Chapter 1–2 section includes source receipts, slide figures, core rules, and recognition cues.
- **Lab:** the closed-notes half, with original interactions, confidence ratings, adaptive review, exact-term blanks, exploration/concept-sketch rubrics, and separate 30-question Chapter 1 and Chapter 2 Boss Drills.
- **Mastery:** the Lab record; it separates completion from demonstrated mastery.

Exam 1 Chapters 1–2 are live. Chapters 3–6, Exam 2, and the remaining Final material stay visibly evidence-gated until verified course sources are added. The interface uses a responsive dark theme.

It has no paid services, API keys, tracking, network dependency, or server-side code, so every attempt costs **$0**.

## Open the study system

Either open `index.html` directly, or run a small local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Repository map

```text
.
├── index.html                 # Exam selector, Study Guide, Lab, and Mastery views
├── assets/
│   ├── app.js                 # Guide, Lab, adaptive-mastery, and preserved quiz engines
│   ├── styles.css             # Responsive dark interface
│   └── visuals/               # 32 slide renders + 10 extracted source images
├── quizzes/
│   └── quiz-bank.js           # Quiz content, including the Boss Drill
├── practice-exams/            # Original practice exams + answer keys
├── study-guides/
│   ├── chapter-01-modules.js  # Eight sourced guide sections and Lab activities
│   └── chapter-01-visuals.js  # Visual metadata, recognition cues, and evidence boundaries
└── source-materials/
    └── chapter-01-source-audit.md # 59-slide coverage and limitation ledger
```

## Guided mastery rules

- Every graded activity requires **Low / Medium / High** confidence after the answer is checked.
- Incorrect answers return after two intervening activities.
- Correct answers at low confidence return after four.
- A concept is mastered after two consecutive correct attempts when the latest confidence is medium or high.
- An incorrect high-confidence answer creates a visible misconception flag.
- Teach-back prose is never sent anywhere or stored. The relevant Guide notes are open beside the prompt, then the app reveals an authored rubric and asks for an honest self-rating.
- Ordering and matching rows and choices are shuffled away from their authored order on every render.

Guided progress is stored locally under `geol1001-guided-progress-v1`. The original quiz-score key, `geol1001-study-lab-progress-v1`, is preserved separately.

## Add a quiz

1. Open `quizzes/quiz-bank.js`.
2. Duplicate one quiz object.
3. Give it a unique `id`, title, exam lane, chapter list, and questions.
4. Use `single`, `multi`, or `true-false` question types.
5. Add a concise explanation and a source note for every question.
6. Reload `index.html`.

The Lab drill engine automatically shuffles questions and answer choices, stores local best scores, supports missed-question review, and prints a clean result sheet.

## Evidence rules

- Use original practice questions; do not copy live Connect questions or graded assessments.
- Record the source for every answer: lecture number/slide, textbook chapter/page, or instructor handout.
- Mark uncertain or reconstructed material clearly.
- Keep this repository private while it contains course files or instructor materials.
- Put answer keys in a clearly named file and verify them independently before calling an exam ready.
- Mark Lecture 1b slides 24–31 as **deck continuation—class emphasis unconfirmed**; the slide 23 speaker note records the classroom stopping point.
- Use supplied lecture figures in the private Study Guide only when they materially teach visual evidence. Lab diagrams and every graded prompt remain original.
- Do not invent a missing figure. Lecture 1b slide 7 visibly records that its central resource map is unavailable while preserving the verified claim text.
- Do not imply a complete hand-sample identification bank when the supplied lecture evidence shows environments and processes rather than a systematic specimen set.

## Course source of truth

Course logistics were initialized from the verified Fall 2026 GEOL 1001 course context. Moodle and instructor announcements supersede this repository when newer and clearly dated.
