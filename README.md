# LSU GEOL 1001 Study Lab

Private study workspace for **GEOL 1001-002: General Geology — Physical** (Fall 2026).

This repository is built around three exam lanes:

- **Exam 1:** Chapters 1–6
- **Exam 2:** Chapters 7–12
- **Final:** Cumulative, Chapters 1–19

The quiz runner is a static website. It has no paid services, API keys, tracking, or server-side code, so each practice attempt costs **$0**.

## Open the quiz lab

Either open `index.html` directly, or run a small local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Repository map

```text
.
├── index.html                 # Quiz dashboard
├── assets/
│   ├── app.js                 # Reusable quiz engine
│   └── styles.css             # Responsive interface
├── quizzes/
│   └── quiz-bank.js           # All quiz content
├── practice-exams/            # Original practice exams + answer keys
├── study-guides/              # Chapter and exam study guides
└── source-materials/          # Private evidence used to build study tools
```

## Add a quiz

1. Open `quizzes/quiz-bank.js`.
2. Duplicate one quiz object.
3. Give it a unique `id`, title, exam lane, chapter list, and questions.
4. Use `single`, `multi`, or `true-false` question types.
5. Add a concise explanation and a source note for every question.
6. Reload `index.html`.

The engine automatically shuffles questions and answer choices, stores local progress, supports missed-question review, and prints a clean result sheet.

## Evidence rules

- Use original practice questions; do not copy live Connect questions or graded assessments.
- Record the source for every answer: lecture number/slide, textbook chapter/page, or instructor handout.
- Mark uncertain or reconstructed material clearly.
- Keep this repository private while it contains course files or instructor materials.
- Put answer keys in a clearly named file and verify them independently before calling an exam ready.

## Course source of truth

Course logistics were initialized from the verified Fall 2026 GEOL 1001 course context. Moodle and instructor announcements supersede this repository when newer and clearly dated.

