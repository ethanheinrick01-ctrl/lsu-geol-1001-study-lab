# Source ledger

Every file in `GEOL1001_FALL2026_STUDY_LAB_HANDOFF_2026-09-22.zip` (404 files, archive test passed), what it is, how it was reviewed for this build, and how it was used. Paths are relative to the archive's `COURSE EVIDENCE/` folder unless noted.

**Evidence tiers** used in the lab: **1** = direct statements by Professor Zhuang or official Fall 2026 course documents; **2** = what current decks, recordings, and assigned textbook pages show (not a statement about exam weight); **3** = your own notes or reported experience; **4** = lab design choice or inference.

**Review status key:** *Full* = read or viewed in full. *Partial* = read in part (what was skipped is named). *Keyword* = searched for specific claims only. *Checked* = provenance and format checked, content not used.

## Instructor and official documents

| File | What it is | Review | Tier | Used for | Code |
|---|---|---|---|---|---|
| ADMIN/SYLLABUS.docx | Fall 2026 syllabus, GEOL 1001-002 | Full (converted to text) | 1 | Exam types (MC, fill-in, exploration), paper/no-notes rule, ≥20% integrative MC, grading, schedule | SYL |
| ADMIN/COURSE_CONTEXT.md | Syllabus-derived course map written earlier | Full | 1 (derived) | Exam date/time; cross-check only. Exam-day times are rule-derived, so the lab shows date and class time only | CTX |
| LECTURE POWERPOINTS/LECTURE 1/GEOL1001-002 Lecture 1a.pptx | Syllabus deck (Aug 25) | Full: text, speaker notes | 1 | ILEA cycle (s18), AI-use policy (s23–24) | L1A |
| RECORDED LECTURES/09:22:2026 .rtf | Sep 22 recording (ASR transcript) | Full for the exam announcements; the Chapter 7 remainder keyword-searched only (outside Exam 1) | 1 | Exam 1 format: three sections, MC about 40–50% and "easiest," fill-in/definitions, "investigation" matching features to diagrams; Chapters 1–6 only; "exam is not ready"; review Sep 24 | T0922 |

## Your notes

| File | What it is | Review | Tier | Used for | Code |
|---|---|---|---|---|---|
| Top of RECORDED LECTURES/09:22:2026 .rtf | Your typed "EXAM FORMATTING" notes | Full | 3 | Agrees with the audio; cited alongside T0922 on the mock page | EN0922 |
| EXAM ONE/HANDWRITTEN NOTES/SOURCE_INVENTORY.json | Inventory only; **no note images are in the archive** | Full | n/a | Nothing to use. Flagged as missing evidence | none |

## Lecture decks (tier 2)

| File | Review | Used for | Limits | Code |
|---|---|---|---|---|
| LECTURE 1/GEOL1001-002-lecture 1b.pptx (31 slides) | Full: text, notes, rendered slides | Chapter 1 cards, items, source-slide strips | Speaker note on s23: "stopped at this slide" (Aug 25). s24–31 tagged as continuation. s7 resource map does not render | L1B |
| LECTURE 2/GEOL1001-002 Lecture 2.pptx (32 slides) | Full: text, notes, renders | Chapter 2 | s18 geologic map and s23–24 timescale render blank; timescale recovered from the deck's embedded TIFF | L2 |
| LECTURE 3/GEOL1001-002 Lecture 3.pptx (45 slides) | Full: text, notes, renders | Chapter 3 | none found | L3 |

## Recorded lectures (tier 2; automatic speech-recognition transcripts)

| File | Review | Content | Code |
|---|---|---|---|
| 09:01:2026.rtf | Full | Ch 3: bathymetry, fracture zones, ridges, drift evidence, plates, boundary types, rift stages, subduction | T0901 |
| 09:08:2026 .rtf | Full | Ch 3 wrap-up (transforms vs fracture zones); Ch 4 mineral definition, properties, cleavage, silicate structures, non-silicates, bonds | T0908 |
| 09:10:2026 .rtf | Full | Ch 4 review (tetrahedron charge, diamond vs graphite, river vs beach sand); Ch 5 textures and classification | T0910 |
| 09:15:2026.rtf | Full | Ch 5: chart mineral bars, geothermal gradient, heat, P-T graphs and three ways to melt, magma processes, stoping, viscosity, cooling, Bowen's series | T0915 |

Transcripts are garbled in places; recording-based statements in the lab were matched to slide or textbook content before use. **Not recorded:** Aug 25, Aug 27, Sep 3, Sep 17. **No Chapter 6 recording or deck exists in the package.**

## Textbook pages (Exploring Geology; tier 2)

| Folder | Files | Review | Code |
|---|---|---|---|
| Chapters 4 and 5 Screenshots/Chapter 4 | PG 1–16 + 4.7 PDF | 4.1–4.13 full; 4.14 partial; **4.15–4.16 not read in full** (no items depend on them) | TB4 |
| Chapters 4 and 5 Screenshots/Chapter 5 | PG 0–15 | 5.0–5.13 full; **5.14 (Sierra Nevada) and 5.15 (investigation) not read in full** | TB5 |
| GEOL CH 6 SS/ | pg 1 + 6.1–6.15 | 6.0–6.14 full. **6.15 PDF is 94 KB and incomplete** (map and photos missing); not copied | TB6 |
| EXAM ONE/IMG_5737.JPG | Your classroom photo of textbook figure 05.03.b1 (classification chart) | Viewed | IMG5737 |

Textbook text was extracted from the PDFs; figures were cropped from the page renders for teaching cards (tier 2 images, cited in captions). Several Chapter 6 "figures" in the old lab were whole PDF pages with illegible text; those were not reused.

## Derived materials (not used as answer authority)

| File(s) | What they are | Review | Why not used |
|---|---|---|---|
| EXAM ONE/STUDY GUIDES 1-2, STUDY GUIDE 3 (3 .docx) | AI-assisted lecture study guides (python-docx) | Full text read | Derived from the decks; the decks themselves were used instead |
| PODCASTS/Chapters 4-6 (8 scripts, complete script, manifest, receipt, creation record) | Speechify podcast scripts generated Sep 22 | Checked (creation record, manifest); complete script keyword-searched for professor or exam claims (none found) | Derived narration |
| PODCASTS/Lectures 1-3/CREATION_RECORD.md | Generation request record only; no script or audio | Checked | Nothing to use |

## Package files outside COURSE EVIDENCE

| Path | Review | Notes |
|---|---|---|
| README.md | Full | Names `FILE_INVENTORY.json`, **which is not in the archive** |
| SOURCE_INDEX.json | Full | Lists 42 sources (Ch 4–5 screenshots, IMG_5737, Ch 6 PDFs) |
| STUDY LAB/ (old lab: app, 3 quiz banks, 10 study-guide files, 195 visuals, source-material audits) | Code and data read in full; representative items solved independently; visuals viewed on contact sheets | Audited (see `CHANGES.md`). No items copied; images re-curated |
| SKILL/build-course-study-lab/ (SKILL.md, references, scripts, templates, tests) | Full | v3 extends the skill's v2 contract; its validator and engine tests were run (see `VALIDATION.md`) |

## Outside the archive

| File | Use |
|---|---|
| ~/Desktop/GEOL-progress-2026-09-17T19-18-14.029Z.json | Your real old-lab progress export (format `geol1001-progress-backup-v1`). A copy was placed in `GEOL1001_STUDY_LAB_V3_BUILD/_review/migration/` and imported in the browser test |
| Obsidian vault | Reviewed at the start per your standing instruction; only the GEOL hub and a COURSE_CONTEXT copy exist, nothing new |

## Not in the package (evidence gaps)

- Handwritten note images (only an inventory file exists).
- FILE_INVENTORY.json (named in README).
- Any Chapter 6 deck or recording; any recording of Aug 25, Aug 27, Sep 3, Sep 17.
- Graded Connect quizzes and homework (correctly absent; the lab does not use or imitate them).
- Any prior-semester exam or professor history. The lab makes no claims about Professor Zhuang's exam style beyond his Sep 22 statements and the syllabus.


## September 24 review update

The new review supersedes preliminary September 22 format statements. Instructor review evidence and student-header notes are stored separately as R0924 and N0924. Actual source-figure mapping, transcript line ranges, ASR corrections and exact source provenance are documented in [EXAM1_UPDATE.md](EXAM1_UPDATE.md). Scientific answer sources remain distinct from review-emphasis evidence.
