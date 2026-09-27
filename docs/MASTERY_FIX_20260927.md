# Mastery coverage repair · September 27, 2026

## Cause

Some Exam 1 topic cards included concepts with fewer than two eligible automatic questions. The mastery rule requires two different unassisted correct questions, so repeating a topic could leave its last concept unreachable. Topic cards also counted only the latest Exam 1 first answer per item, hiding repeated checks and work from other modes.

## Changes

- Promote a reviewed list of existing course questions and add four source-cited application questions. Every concept on every topic card now has at least two eligible questions in both topic and figure practice.
- Choose questions across concepts, prioritizing open misses and unfinished mastery. Prefer independent questions not already answered correctly; use history from all modes.
- Add a per-concept explanation and targeted practice button to every topic, plus mastery feedback after checked answers and on Progress.
- Count all saved checks in topic and Data totals; keep first answers, corrections, and rubric self-assessments separate.
- Preserve every previous question ID, answer key, concept, saved run, and the `geol1001-lab-v3` storage key. Do not turn repeat answers into extra independent mastery credit.

## Verification

- `node tools/mastery_coverage_test.js`: all 16 topics and figure drills, all 102 broader-course concepts, every current case/Boss drill and writing item, repeat-answer regression, cross-mode counters, reload and export/import.
- Every topic can reach full mastery within three successful topic or figure drills in the coverage simulation.
- `node tools/cohesive_test.js`: shared recording, immutable first answers, hints, corrections, permanent mastery, saved drafts and migration.
- `node tools/exam1_content_test.js`: curated scope, supplied course images, original assessment compatibility, 25/8/7 forms.
- `node tools/fresh_mocks_test.js`: frozen generated questions, novelty, shared mastery and honest independent-question counting.
- Local browser verification: the saved 2/3 scenario offers an unseen igneous question; checking it reaches 3/3 in both the topic card and Progress and survives reload. Browser QA uses a separate local origin.

Mastery still requires two different correct questions without hints, with medium/high confidence on the second. Saved drafts count after checking; explanations count after explicit rubric assessment. Progress remains local to the same browser and origin.
