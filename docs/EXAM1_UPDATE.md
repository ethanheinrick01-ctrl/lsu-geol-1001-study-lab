# Exam 1 update — September 24, 2026

## Implemented experience

- New **Exam 1** tab replaces the old Mock entry. Home makes the Sep 24 review the primary starting point.
- 16 editorial topic groups follow the review sequence, with focused explanations, actual McGraw-Hill source figures, links to the Guide, topic practice and figure practice.
- Three distinct sets A/B/C: 25 single-answer, four-option multiple choice; 8 short answers (4 terms + 4 explanations); 7 grouped investigations with 3 subparts each. Each full set is 40 numbered questions / 54 answer parts. The 162 new parts have new IDs.
- Every answer receives immediate feedback. Explanations use the saved typed answer, a model answer, and an explicit self-assessed rubric. No remote AI grading and no cost per use.
- First responses remain immutable after feedback. Correction attempts and self-assessments are stored and displayed separately. No Exam 1 review answer or correction awards mastery; later different-question practice uses the existing mastery rules.
- Section-only practice and 20-prompt source-figure practice. Topic/figure drills use a finite curated pool and prefer unseen questions; the displayed figures repeat deliberately because they are the course originals. Prior exposure is disclosed on the set cards.
- Untimed. Section 1 reports first-try points out of 50. Sections 2 and 3 report raw automatic results and self-assessment separately, without invented point weights.

## User refinements implemented

The initial plan for generated plate maps, rock-cycle blanks, and seafloor diagrams was superseded by the user's request to use ONLY actual McGraw-Hill figures. The new custom renderer was removed before integration. No newly drawn diagram is loaded by Exam 1. The pre-existing broader lab's old diagrams remain in their existing activities.

Questions emphasize introductory recognition, matching, basic process connections, and short explanations. A draft numerical plate-budget calculation was replaced with a straightforward subduction question. Exact city crust-thickness numbers and period-by-period time memorization are not tested in these new sets. The terminology question about “solidus” was replaced with identifying the temperature axis. Topic instruction explains the melting boundary without requiring advanced phase-diagram calculations.

## Evidence and figure matching

Format: transcript lines 322–434 and 4966–5000. 25 MC ×2=50 points is an instructor statement. Spoken ranges are 6–8 short answers and 6–7 investigations. 8 and 7 are lab defaults; the student header is separate evidence. Topic-to-section allocations and the exact Tuesday figures remain unknown. Figure matches are conceptual matches, not a promised reproduction of the exam.

| Group | Review passage (lines) | Actual figures used |
|---|---|---|
| T1 Rock cycle | 529–800 | Lecture 1b slide 29, McGraw-Hill 01.06.a1 |
| T2 Time | 821–905 | Embedded course timescale from Lecture 2 slide 24 |
| T3 Drift/spreading/age | 905–1300 | Lecture 3 slides 23, 40, 42 |
| T4 Boundaries | 1300–1705 | Lecture 3 slides 20, 24, 37 |
| T5 Layers/isostasy | 1716–2090 | Lecture 1b slides 12, 14, 16; wooden blocks match the described analogy |
| T6 Hot spots | 2090–2300 | Lecture 3 slide 43 |
| T7 P–T diagrams | 2280–2335; 3730 onward | McGraw-Hill section 5.5 heating, decompression, and water graphs (existing extracted figures 28–30) |
| T8 Textures | 2320–2540 | McGraw-Hill section 5.1 porphyritic and pegmatitic specimens |
| T9 Vesicles | 2540–2700 | McGraw-Hill section 5.3 pumice and scoria photographs |
| T10 Classification | 2700–3000 | Unmodified classroom photograph IMG_5737.JPG, figure 05.03.b1 |
| T11 Minerals | 3000–3400 | McGraw-Hill section 4.7 tetrahedron/linked tetrahedra, existing figures 09–10 |
| T12 Bowen | 3400–3720 | McGraw-Hill section 5.8, existing figure 34 |
| T13 Melting settings | 3730–4150 | Section 5.5 decompression graph and Lecture 3 slide 26 |
| T14 Volcanoes | 4150–4350 | McGraw-Hill section 6.1 shield, composite, and scoria-cone block diagrams |
| T15 Heat transfer | 4350–4590 | Extracted original section 5.4 PDF page 8 stove/convection and tectonic heat-transfer figures |
| T16 Convergence | 4600–4740 | Lecture 3 slides 25 and 30 |

The first 11 transcript lines are student notes. All references above count those lines. Scientific answers are checked against the actual course slides/textbook, not accepted from garbled ASR. Specific repairs include billion versus million years, mafic oceanic versus more felsic continental crust, mantle-lithosphere versus sediment/crust thickness, and sulfide/sulfate anions. The audio was not manually re-transcribed for this build.

## Persistence and compatibility

Same browser key: `geol1001-lab-v3`; same schema and export identity. Additive fields: `examRuns`, `examActive`, `mockArchived`. Each review retains groups, question order, current question, typed drafts, first answers, confidence, rubric checks, corrections and timestamps. Runs merge by ID on import; correction records merge by their IDs. Importing an older backup does not erase newer corrections. A divergent imported first response is retained as history rather than overwriting the local first response.

Old attempts, assessment IDs/keys, concept IDs, Boss scores, Guide reads, teach-back records, legacy signals, and mocks remain. An unfinished old mock can be resumed or archived. The old creation screen now routes to Exam 1. The prior silent 8,000-attempt truncation was removed; a storage error is shown instead of silently deleting history. Storage-blocked/quota conditions are surfaced in the interface.

Browser storage persists across normal closes/restarts, but is specific to browser and origin. Data → Export/Import remains the recovery and transfer mechanism. No user browser profile was accessed or reset; all browser verification used isolated contexts.

## Verification

- `node tools/validate.js`: **0 errors**. One pre-existing warning remains for `c4-silstruct-p1` (old SVG marker heuristic).
- `node tools/exam1_content_test.js`: **11 checks passed**. All 451 old assessment objects unchanged, same concept IDs/key, all 162 new parts validated, all three sets completed, source images verified, older-backup merge checked.
- `tools/exam1_test.js` with Playwright and isolated Chrome: **77 checks passed**, across file and temporary localhost origins. Exact counts/coverage, immediate feedback, correction integrity, terms, rubric self-checks, partial matching, drafts/reload/tab reopening, import idempotence, old history, source-image loading, phone overflow, quota errors, no runtime errors and no external requests.
- Manual visual review: topic map, source figure displays, review-set selection, and phone question flow. Source diagrams were inspected against the supplied slides/PDFs.
- New MC items including case parts: 15/92 have a uniquely longest keyed option. This is a cue audit, not a guarantee of empirical question difficulty.

No GitHub publication, visibility change, or network-dependent grading. No Study Lab skill invoked. A reusable exam-environment skill remains deferred until the user has reviewed the finished experience.

## Files and receipts

Canonical installation: `/Users/ethanheinrick/Desktop/GEOL-1001/SYLLABUS : ADMIN/STUDY LAB`.
The existing `/Users/ethanheinrick/Desktop/GEOL-1001/STUDY LAB` shortcut resolves there.

Before snapshot, hashes, source-inspection contact sheets, screenshots and full logs: `/Users/ethanheinrick/Desktop/GEOLOGY/exam1-build-20260924/`.
