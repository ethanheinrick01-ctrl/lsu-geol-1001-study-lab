# Cohesive Study Lab update · September 27, 2026

## Delivered changes

- COMD 4590 dashboard and study-flow reference applied to the existing Geology app: compact dark layout, blue controls, chapter Study/Practice cards, and dedicated Cases, Mock, Progress, and instructor-focus navigation.
- One concept record now includes practice, review, cases, Boss drills, submitted old-format mocks, Exam 1 answers, and explicitly self-assessed written rubrics. Confidence calibration excludes hints, corrections, and self-ratings.
- Earned mastery persists. Later misses stay visible, including on mastered concepts. Two independent correct answers after a miss clear review when the second has medium/high confidence.
- First exam responses and scores remain fixed. Corrections are separate and do not earn independent mastery credit. Written self-assessments are labeled rather than presented as automatic grading.
- Ordinary practice drafts, hints, and written responses survive reloads. Starting another session archives the unfinished session for later resumption. Backups merge attempts, sessions, flags, confidence, first responses, and corrections without replacing newer work with older copies.
- The original storage key, 102 concepts, and all 613 existing assessment IDs/prompts/keys remain. Ten new answer parts bring the registry to 623. Existing saved mocks keep their original question groups.

## Professor evidence and scope

The September 24 exam-review transcript supports 25 multiple-choice questions at 2 points each, 6–8 short definitions/concepts, and 6–7 investigations using diagrams, matching, and explanation. Forms A–C use **25 / 8 / 7**, with 40 numbered questions and 54 answer parts each: 43 automatically checked parts and 11 rubric explanations. The short-answer and investigation point allocations are unknown and are not invented.

The lecture comparison supports a recurring task sequence: observe the figure, identify/classify, explain the process. Targeted additions cover the lower mineral bands in the igneous classification chart; mineral structure and cleavage; equal-temperature/different-pressure comparisons; and formation setting, cooling history, and texture. Existing coverage of water-rich pegmatite, porphyritic cooling, pumice/scoria, Bowen's series, melting mechanisms, and viscosity is retained. This is introductory geology practice; exact Tuesday questions and exact figures are not known.

Paired September 1, 8, 10, and 15 Apple/Whisper transcripts were compared where available. The duplicated review was counted once. Unrelated audiology, student chatter, and later Chapter 7 material were excluded. Textbook figures resolve technical terms; ASR agreement alone does not verify them.

## New figure provenance

All three are supplied McGraw-Hill figures, not generated illustrations:

| Asset | Source |
|---|---|
| `assets/img/exam1/pt-comparison.png` | Existing source extraction `assets/visuals/ch4-ch5-expanded/figure-27.png`; section 5.5, pressure–temperature comparison, supplied PDF page 4 |
| `assets/img/exam1/silicate-sheets.png` | *4.7 What Is the Crystalline Structure of Silicate Minerals?*, supplied PDF page 7, figure 04.07.b4 |
| `assets/img/exam1/texture-settings.png` | *Chapter 5: Earth Materials PG 1*, supplied PDF page 9, section 5.1B; original embedded image with its PDF transparency mask restored against white |

## Verification

- Registry validator: **0 errors**. One pre-existing warning remains for `c4-silstruct-p1` (investigation without markers).
- Content/persistence suite: **12 checks passed**, including all answer keys and completion of all three 54-part forms.
- Cohesion suite: **19 checks passed** with the pre-update baseline, covering every recording path, permanent mastery, clearing misses, hint/correction limits, old saved runs, export/import, drafts, and Boss-history deduplication.
- Chrome UI checks: all navigation routes, immediate MC feedback, first-score retention, flags, written draft/reveal/rubric reload, three-part mineral investigation, shared dashboard totals, backup merge, and history. No application console errors in the final route checks.
- Desktop and narrow layout inspected. Original figure enlargement and image loading verified.
- A load guard prevents an incompletely loaded question bank from opening a partial exam.

## Persistence and cost

The app uses `geol1001-lab-v3` on the same existing URL. Progress survives closing/reopening this browser. Data → Export/Import moves or backs up progress; there is no account or cloud synchronization. No paid APIs or per-use costs.

COMD reference: `ethanheinrick01-ctrl/PUGZPLZ`, `aural-rehab/`, commit `0426b7241f906905c392ab30c37dd8743246963c`. The reference source hashes were checked against GitHub. Geology remains its own app and storage key.
