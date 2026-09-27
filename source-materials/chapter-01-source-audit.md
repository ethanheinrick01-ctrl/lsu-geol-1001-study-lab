# Chapter 1 source audit

Audit date: 2026-08-28  
Scope: GEOL 1001-002 Lecture 1 pilot

## Source inventory

| Source | Coverage checked | Use in study system |
|---|---:|---|
| `GEOL1001-002 Lecture 1a.pptx` | 28 of 28 slides | Course strategy, ILEA, scientific reasoning |
| `GEOL1001-002-lecture 1b.pptx` | 31 of 31 slides | Chapter 1 geology content and figures |
| `GEOL1001_Lecture_1_Study_Guide.docx` | Complete document | Teaching backbone for the Study Guide half; cross-check of slide coverage, claims, active-recall prompts, and unresolved evidence |

All 59 supplied lecture slides were re-extracted and visually cross-checked. The completed guide was read in full, including its tables, active-recall drill, answer key, and ILEA practice prompts. Every graded activity in `study-guides/chapter-01-modules.js` has an authored hint, explanation, and source reference. Every Boss Drill item in `quizzes/quiz-bank.js` has an explanation and slide/source reference.

The private Study Guide now contains a local visual library of **42 files**: 32 complete source-slide renders and 10 extracted source photographs. `study-guides/chapter-01-visuals.js` records the title, alt text, caption, recognition cues, exact slide reference, and continuation status for every displayed visual. Each of the eight Chapter 1 sections has one visual workbench plus a zoomable source gallery.

## Evidence boundaries

- Lecture 1b slide 23 contains the speaker note: `2026.08.25: stopped at this slide`.
- Lecture 1b slides 24–31 are therefore labeled **deck continuation—class emphasis unconfirmed** throughout the app. They are not represented as confirmed classroom emphasis.
- Lecture 1b slide 7's central resource-distribution map did not render in the supplied deck. The verified text claims remain usable: older iron deposits are linked to early atmospheric change, while younger copper deposits are linked to western mountain building. The lab uses an original text-based resource-distribution activity and does not reconstruct or claim to reproduce the missing map.
- The supplied Lecture 1 evidence does not contain a systematic hand-sample identification bank. The visual atlas therefore teaches the actual photographed evidence—landforms, depositional settings, eruption styles, metamorphic banding, and hydrothermal settings—without inventing specimen coverage.
- Study Guide figures are local copies of supplied lecture visuals for private course study. Interactive Lab diagrams and all graded prompts are original redraws or original wording. No live Connect question, publisher question-bank item, or graded assessment wording was copied.

## Module coverage ledger

| Module | Concepts | Primary evidence |
|---:|---|---|
| 1 | Research method; ILEA cycle | Lecture 1a s18; Lecture 1b s2 |
| 2 | Observation versus inference | Lecture 1b s3–4, s9–11 |
| 3 | Hazard-aware siting; resource distribution | Lecture 1b s5–7 |
| 4 | Evidence of ancient environments | Lecture 1b s8–11 |
| 5 | Compositional and mechanical layers | Lecture 1b s12–14 |
| 6 | Isostasy | Lecture 1b s15–16 |
| 7 | Earth-system drivers; atmospheric effects | Lecture 1b s17–18 |
| 8 | Rock-forming logic; spheres; scale | Lecture 1b s19–31, with s24–31 marked continuation |

## Interactive evidence ledger

| Interaction | Original implementation | Evidence basis |
|---|---|---|
| Observation/inference sorter | Authored statement cards and classifications | Lecture 1b s9–11 |
| Settlement hazard map | Original inline SVG with zones A–D | Lecture 1b s5 |
| Earth cross-section labeling | Original concentric SVG/CSS model | Lecture 1b s12 |
| Isostasy simulator | Original slider-driven floating-block analogy | Lecture 1b s15–16 |
| Internal/external driver sorter | Authored driver set | Lecture 1b s17 |
| Rock-family process matcher | Authored matching activity | Lecture 1b s19, s23, s26–28 |

## Visual-learning ledger

| Study Guide section | Visual learning added | Evidence basis |
|---:|---|---|
| 1 | Complete clickable ILEA cycle; seven-step research-method map; source-slide gallery | Lecture 1a s18; Lecture 1b s2 |
| 2 | Look → Describe → Infer cliff lens; globe, landscape, climate, and reconstruction gallery | Lecture 1b s3–4, s9–11 |
| 3 | Feature-to-exposure hazard scanner; settlement figure; missing-map boundary | Lecture 1b s5–7 |
| 4 | Trace → Constraint → Reconstruction chain; shelf, strata, ice, and Jurassic visuals | Lecture 1b s8–11 |
| 5 | Composition/mechanical toggle; Earth cross-sections; meteorite analog | Lecture 1b s12–14 |
| 6 | Thickness/density comparison switch; crustal-root and floating-block figures | Lecture 1b s15–16 |
| 7 | Internal/solar/gravity pathway tabs; atmosphere-water-energy figures | Lecture 1b s17–18 |
| 8 | Filterable seven-image environment/process atlas; rock-cycle, spheres, and scale gallery | Lecture 1b s19–31; s24–31 marked continuation |

## Boss Drill audit

The Chapter 1 Boss Drill contains **30 original items**, exceeding the 25-item minimum. Coverage includes research method, ILEA, observation/inference, hazards, resources, evidence, Earth layers, isostasy, internal/external drivers, atmosphere, sedimentary and igneous rocks, continuation rock types, the rock cycle, Earth spheres, and scale. Continuation items explicitly include that status in their source text.

The source of truth is the supplied lecture set and completed Chapter 1 guide. Unresolved evidence is marked rather than guessed.
