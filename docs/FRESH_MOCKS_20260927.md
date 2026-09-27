# Fresh mock exams · September 27, 2026

## Request and implementation

The Mock page now generates original question variants for forms A, B, and C instead of reopening fixed question sets. The rest of the lab remains in place. Generation runs entirely in the browser, with no account, API, or per-use cost.

A new run draws unused observation combinations from 24 course-grounded model families. Observations, targets, correct answers, and distractors change; option shuffling is supplementary. Paired observations appear in both orders across the catalog so their interpretation is not determined by a fixed ordering. A single observation cannot be assigned again as a new recall question, and a pair cannot be recycled as a new MC, explanation, or investigation after it has already been assigned. All assigned variants are excluded across A/B/C, even before they are answered.

This is a finite curated generator, not a language-model service or a promise of unlimited unfamiliar facts. Individual concepts, observations, and original course figures recur in new combinations. The generator checks old-bank fingerprints and saved generated-question history. It cannot know what the student has seen outside the lab. When a required pool is exhausted, generation stops with a message and keeps every existing exam. Clearing browser storage removes its exposure history; importing a progress backup restores it.

Each run saves its seed, complete question/answer snapshots, original figure references, question order, choice order, matching order, drafts, first responses, confidence, corrections, and self-rubrics. Reloading or importing resumes those exact questions. The generated pool is kept out of ordinary practice so mock questions are not assigned there first.

## Evidence cutoff and mechanics

Cutoff: **2026-09-27**. The authoritative format is the September 24 held-exam review, documented in `docs/EXAM1_UPDATE.md`, particularly transcript lines 322–434 and 4966–5000. `docs/COHESIVE_UPDATE_20260927.md` records the paired lecture-transcript refinements. Course textbook/slides resolve ASR terminology. No new homework-bank prediction or inferred exam timing is introduced.

| Section | Practice count | How it is assessed |
|---|---:|---|
| Multiple choice | 25 | Four options, one answer; first-response points out of 50 |
| Short answer | 8 | Four terms + four explanations; terms automatic, writing self-rubric |
| Investigations | 7 | Original course figure, identification, matching, explanation; three parts each |
| Total | 40 questions / 54 parts | 43 automatic parts + 11 written self-assessments |

The professor stated 6–8 short answers and 6–7 investigations. Eight and seven are practice defaults. No official Section 2/3 point allocation is known; only Section 1's 25 × 2 = 50 points is presented as an official weight. Exact live questions, figure choices, topic placement, time limit, and allowed tools remain unknown. These are untimed learning mocks with immediate feedback, as requested for the existing lab.

## Coverage and given-to-target variants

Every form's MC section includes all 16 review topics. The counts below are practice-design choices, not inferred official quotas. Short answers span eight different topics. Investigations vary by form to preserve coverage across the three forms.

| Topic | MC count | Models and targets |
|---|---:|---|
| T1 Rock cycle | 2 | Observed change → weathering, transport, deposition, lithification, metamorphism, solidification |
| T2 Broad time blocks | 1 | Broad interval or landmark → Precambrian, Paleozoic, Mesozoic, Cenozoic; no period memorization |
| T3 Drift and spreading | 2 | Fossil/rock/magnetic evidence → interpretation; age/heat/sediment → relative ridge position |
| T4 Plate boundaries | 2 | Motion, crust creation, consumption → boundary type |
| T5 Layers and isostasy | 2 | Mechanical behavior → layer; equal-density/thickness comparison → surface elevation |
| T6 Hot spots | 1 | Active-center location and age progression → plate direction |
| T7 Pressure–temperature | 1 | Changed temperature/pressure → path; equal-temperature or equal-pressure comparison → melting tendency |
| T8 Texture | 2 | Cooling setting, grain-size populations, water-rich growth → texture |
| T9 Vesicular rocks | 1 | Color, glass and cavity structure → pumice versus scoria |
| T10 Classification | 2 | Composition + texture → rock; lower mineral bands → composition column |
| T11 Minerals | 2 | Tetrahedral architecture, anion, electron behavior → structure, group, bond |
| T12 Bowen | 2 | Candidate minerals → earlier crystallization or simplified earlier melting |
| T13 Melting | 2 | Tectonic/thermal setting → decompression, added water, added heat |
| T14 Volcanoes | 1 | Construction and form → type; silica/temperature/crystals → viscosity |
| T15 Heat | 1 | Energy movement → conduction, convection, radiation |
| T16 Convergence | 1 | Crust types, trench, arc, collision → convergent setting |

Investigations:

- **A:** rock cycle, boundaries, ocean-floor age, isostasy, classification, P–T paths, volcanoes.
- **B:** rock cycle, boundaries, ocean-floor age, silicate structure, classification, melting mechanisms, volcanoes.
- **C:** rock cycle, boundaries, isostasy, silicate structure, classification, Bowen, heat transfer.

Delivery follows the reviewed identify/classify → distinguish → explain sequence, using introductory prose and the supplied McGraw-Hill images. Comparison MC stems intentionally ask students to interpret two observations together. The source figure is a reference: invented observation labels are not falsely attributed to labels printed on the image. No new diagram is drawn. Original diagrams may include textbook labels; these remain learning mocks, not a claim to reproduce unseen Tuesday figures. Numeric phase calculations and advanced mineral chemistry are excluded.

## Progress compatibility

Changed JavaScript assets carry a release version in their URLs so a fresh page does not mix cached older code with the new generator. Same `geol1001-lab-v3` storage key and schema. All 623 existing questions and 102 concepts remain. Old saved exams still resolve their original questions and scores through My history. Generated snapshots are resolved by the same grading and mastery engine. Linked investigation subparts contribute all their attempts but share one independent-question identity for mastery/review clearing; reading feedback within one scenario cannot by itself manufacture two independent successes. Corrections remain assisted. Writing remains explicitly self-assessed.

## Verification receipt

- Registry: **0 errors**, one unchanged legacy marker warning.
- Existing content/persistence suite: **12 passed**.
- Existing cohesion suite: **19 passed**, including old-question comparison, progress preservation, first-response integrity, and all study modes.
- Fresh suite: **14 passed**, including every catalog key, source-image existence, separate direction/Bowen checks, exact format, all three 54-part forms, unseen-history exclusion, seed reproduction, frozen snapshots, cold reload, export/import, mastery, corrections, 30 three-form seed trials, and explicit exhaustion without a partial save.
- Catalog: **786 MC variants, 139 term variants, 603 written variants, 356 three-part investigations**, derived from 24 model families. Counts describe variants and overlapping response formats, not independent facts or guaranteed full-exam capacity.
- Frozen QA forms: seeds **202609270 / 202609271 / 202609272**. The evidence-mock-exam renderer emitted separate MC student/key/coverage/validation outputs. Written and investigation supplements include prompts, models, source provenance and scoring rules.
- Chrome: generated A/B/C through their buttons, verified 120 distinct numbered-question identities, immediate MC feedback, correction retention, source figure display, term/matching/written draft reload, matching grading, rubric self-checks, and shared mastery without linked-part inflation. Desktop selector visually inspected.

QA samples and logs are retained outside the deployed app in the local task audit folder. No user progress, lecture recordings, or transcript archives are added to the deployment.
