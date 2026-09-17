# Study guides and guided modules

Store chapter and exam guides here. Recommended names:

- `lecture-01-study-guide.docx`
- `chapters-01-06-exam-1-guide.md`
- `chapters-07-12-exam-2-guide.md`
- `chapters-01-19-final-guide.md`

Each guide should separate:

1. confirmed lecture/textbook evidence;
2. professor-emphasized patterns;
3. original worked examples;
4. unresolved questions;
5. retrieval prompts for the quiz bank.

## Chapter 1 guided content

`chapter-01-modules.js` defines `window.GEOL_MODULES`, the evidence-backed content collection shared by the Study Guide, Lab, and Mastery views. `lesson` entries power the teaching/reference half; graded entries power the closed-notes Lab. Each module includes:

- stable module, concept, and activity IDs;
- exact slide/source references;
- original activity prompts and answers;
- authored hints and concise explanations;
- revealable teach-back rubrics;
- an explicit continuation marker wherever Lecture 1b slides 24–31 are used.

Supported activity types are `lesson`, `single`, `multi`, `sort`, `match`, `teachback`, `hazard`, `label`, and `isostasy`. Graded activities must include `concept`, `source`, `hint`, and `explanation` fields.

`chapter-01-visuals.js` defines `window.GEOL_VISUALS`, the private visual-learning layer. Every visual entry includes a local asset path, descriptive alt text, a concise caption, a `what to notice` cue, and an exact source reference. Continuation images carry `status: "continuation"`. Missing source visuals use an explicit evidence-boundary card rather than a fabricated replacement.

The current Chapter 1 visual interactions are: complete ILEA cycle, observation/inference lens, hazard scan, ancient-evidence chain, Earth-layer toggle, isostasy comparison, energy pathways, and a filterable rock/environment atlas.
