/* Mock blueprints, coverage and caveat tables, and the old-lab concept map used for progress migration. */
(function (L) {
  'use strict';
  // Section structure mirrors the professor's Sep 22 description (MC about 40–50%, fill-in/definition, investigation).
  // Counts, timing, and the even chapter spread are lab design choices, not course facts.
  L.MOCKS = {
    full: { title: 'Full mock exam', minutes: 75, blurb: 'Three sections in the order described on Sep 22. About 45% of scored parts are multiple choice. Feedback is withheld until you submit.',
      sections: [
        { id: 'mc', kind: 'mc', title: 'Section 1: Multiple choice', n: 30 },
        { id: 'fill', kind: 'fill', title: 'Section 2: Short answer, fill-in, definitions', n: 16 },
        { id: 'inv', kind: 'inv', title: 'Section 3: Investigations (background + diagram matching)', cases: 4, approx: '15–20' }] },
    short: { title: 'Short mock', minutes: 35, blurb: 'Half-length version with the same three sections. Useful the night before or for a quick check.',
      sections: [
        { id: 'mc', kind: 'mc', title: 'Section 1: Multiple choice', n: 15 },
        { id: 'fill', kind: 'fill', title: 'Section 2: Short answer, fill-in, definitions', n: 8 },
        { id: 'inv', kind: 'inv', title: 'Section 3: Investigations', cases: 2, approx: '7–10' }] }
  };

  L.COVERAGE = [
    ['Ch 1 · The Nature of Geology', 'Lecture 1a (syllabus deck) and Lecture 1b slides 2–31; Sep 1 and Sep 8 recordings where they revisit Ch 1 ideas.', 'Aug 25 and Aug 27 lectures were not recorded. Speaker note on slide 23 says class stopped there on Aug 25; slides 24–31 are deck continuation with unconfirmed emphasis. Slide 7 resource map is missing from the deck render.'],
    ['Ch 2 · Investigating Geologic Questions', 'Lecture 2 slides 2–32 (text, notes, renders).', 'No recording (Sep 3 not recorded). Slide 18 geologic map renders blank; the timescale on slides 23–24 was recovered from the deck\'s embedded image.'],
    ['Ch 3 · Plate Tectonics', 'Lecture 3 slides 2–45; Sep 1 and Sep 8 recordings.', 'Recordings are automatic transcripts with garbled wording; content was cross-checked against the slides.'],
    ['Ch 4 · Earth Materials', 'Textbook 4.1–4.13 (read in full); Sep 8 and Sep 10 recordings.', 'No Ch 4 slide deck supplied. Textbook 4.14 read in part; 4.15–4.16 not read in full, so no items depend on them.'],
    ['Ch 5 · Igneous Environments', 'Textbook 5.1–5.13 (read in full); Sep 10 and Sep 15 recordings; your classroom photo of the classification chart (IMG_5737).', 'Recordings reach Bowen\'s reaction series (5.8); lecture coverage of 5.9–5.13 is unconfirmed and marked on those cards. 5.14–5.15 not read in full; no items depend on them. Sep 17 lecture not recorded.'],
    ['Ch 6 · Volcanoes and Volcanic Hazards', 'Textbook 6.1–6.14 (read in full).', 'No Ch 6 deck or recording was supplied, so classroom emphasis is unknown. 6.15 is a textbook investigation whose capture is incomplete; the lab does not copy it and uses original hazard maps instead.']
  ];

  L.CONFLICTS = [
    '<b>Exam format evidence.</b> The Sep 22 recording (tier 1) describes three sections: multiple choice (about 40–50%, "easiest"), short answer / fill-in / definitions, and "investigation" (background, choices, match a feature to a diagram). The professor also said the exam "is not ready." Your typed notes at the top of that file (tier 3) agree. The syllabus lists multiple choice, fill-in-the-blank, and exploration (short answer and concept sketching). Mock counts and timing here are design choices built to match that description, not predictions of the real exam.',
    '<b>AI use policy.</b> Lecture 1a slide 24 says AI may not generate answers for graded work; the syllabus document lists similar items under "Permitted," which reads as a formatting error. This lab is for ungraded practice only. It contains no graded quiz or homework questions, and its items were written from the lecture decks, recordings, and textbook.',
    '<b>Transcripts are machine-generated.</b> Statements attributed to recordings were matched to slide or textbook content before use. Where the wording was too garbled to confirm, the item cites the textbook instead.',
    '<b>Lecture 1b slides 24–31.</b> The speaker note on slide 23 records that class stopped there on Aug 25. Later slides are included as deck content and tagged as continuation.',
    '<b>Old study lab.</b> The previous lab cited graded Connect quiz screenshots (not in the package) for some Ch 4–5 items. Those citations cannot be audited, so every Ch 4–5 item here was rewritten from the textbook and recordings.',
    '<b>Study guides and podcasts in the package</b> are derived summaries (AI-assisted), so they are not used as answer authority.',
    '<b>Numbers from the textbook</b> (for example about 20% of internal heat from early events, 20–40 °C per km, about 60% of magma at ridges) are quoted as the textbook states them. The textbook size cutoff for stocks vs. batholiths did not survive text extraction, so no item asks for it.'
  ];

  // Old lab concept id → new concept ids (used only to seed review priority; old mastery never counts as new mastery).
  L.LEGACY_MAP = {
    'research-method': ['c1-method'], 'ilea-cycle': ['c1-ilea'], 'observation-inference': ['c1-obsinf'],
    'hazard-siting': ['c1-hazards'], 'resource-distribution': ['c1-resources'], 'geologic-evidence': ['c1-pastclues', 'c1-shelf'],
    'compositional-layers': ['c1-layers'], 'mechanical-layers': ['c1-lithos'], 'isostasy': ['c1-isostasy'],
    'earth-drivers': ['c1-forces'], 'atmosphere': ['c1-atmos'], 'rock-forming': ['c1-sedenv', 'c1-igintro'],
    'continuation-context': ['c1-cycle'], 'earth-context': ['c1-spheres'],
    'ch2-observation-coding': ['c2-observe', 'c2-sketch'], 'ch2-deposit-comparison': ['c2-analog'],
    'ch2-landscape-evolution': ['c2-landscape'], 'ch2-relative-dating': ['c2-reldate', 'c2-sequence'],
    'ch2-map-types': ['c2-maps'], 'ch2-topography': ['c2-relief'], 'ch2-subsurface-sequence': ['c2-subsurface'],
    'ch2-data-types': ['c2-data'], 'ch2-geologic-time': ['c2-time'], 'ch2-model-testing': ['c2-models'],
    'ch2-competing-models': ['c2-models'], 'ch2-upheaval-sequence': ['c2-upheaval'],
    'ch3-surface': ['c3-seafloor', 'c3-bathy'], 'ch3-drift': ['c3-drift-evidence', 'c3-drift-problem'],
    'ch3-belts': ['c3-belts'], 'ch3-motion': ['c3-boundtypes', 'c3-rates'], 'ch3-ridge': ['c3-mor'], 'ch3-rift': ['c3-rifting'],
    'ch3-subduction': ['c3-subduction'], 'ch3-ring': ['c3-ringfire'], 'ch3-collision': ['c3-collision'], 'ch3-transform': ['c3-transform'],
    'ch3-forces': ['c3-forces'], 'ch3-geometry': ['c3-geometry'], 'ch3-magnetism': ['c3-magnetic'], 'ch3-seafloor': ['c3-seafloorage'],
    'ch3-hotspot': ['c3-hotspot'], 'ch3-samerica': ['c3-samerica'],
    'ch4-mineral-definition': ['c4-mineraldef', 'c4-rockmineral'], 'ch4-clastic-crystalline': ['c4-crysclast'],
    'ch4-properties': ['c4-appearance', 'c4-tests'], 'ch4-cleavage': ['c4-cleavage', 'c4-shape'],
    'ch4-tetrahedra': ['c4-tetra', 'c4-abundance'], 'ch4-structure-cleavage': ['c4-silstruct', 'c4-commonsil'],
    'ch4-bonding': ['c4-atoms', 'c4-bonds', 'c4-water'], 'ch4-families': ['c4-nonsil', 'c4-whereminerals'],
    'ch5-rock-pairs': ['c5-classify'], 'ch5-mineral-associations': ['c5-silica'], 'ch5-cooling-texture': ['c5-grain'],
    'ch5-special-textures': ['c5-voltex', 'c5-special'], 'ch5-melting-mechanisms': ['c5-melt3', 'c5-ptread', 'c5-heat', 'c5-gradient'],
    'ch5-viscosity': ['c5-visc'], 'ch5-bowen': ['c5-bowen', 'c5-cool'], 'ch5-magma-evolution': ['c5-change', 'c5-partial', 'c5-rise'],
    'ch5-settings': ['c5-divergent', 'c5-subduction', 'c5-hotspotmag'], 'ch5-intrusions': ['c5-pluton', 'c5-smallint'],
    'ch6-vent': ['c6-volcdef'], 'ch6-types': ['c6-types'], 'ch6-gas': ['c6-gasvisc'], 'ch6-products': ['c6-erupt', 'c6-colflow'],
    'ch6-scoria': ['c6-basaltic'], 'ch6-flow-textures': ['c6-basaltic'], 'ch6-shields': ['c6-shield'], 'ch6-floods': ['c6-flood'],
    'ch6-composite': ['c6-composite', 'c6-disaster'], 'ch6-lahar': ['c6-composite'], 'ch6-dome': ['c6-dome'], 'ch6-caldera': ['c6-caldera', 'c6-calddis'],
    'ch6-hazard-risk': ['c6-hazrisk', 'c6-bashaz'], 'ch6-pathways': ['c6-assess'], 'ch6-monitor-tools': ['c6-monitor'], 'ch6-rainier': ['c6-rainier']
  };
})((typeof window !== 'undefined' ? window : globalThis).L);
/* Aliases so the build-course-study-lab v2 validator can read this v3 contract (chapters act as domains). */
(function (L) {
  'use strict';
  L.DOMAINS = {}; Object.keys(L.CHAPTERS).forEach(function (k) { L.DOMAINS[k] = { name: L.CHAPTERS[k].name }; });
  L.SECTIONS.forEach(function (s) { s.dom = s.ch; s.short = s.short || s.title; });
  L.CASES.forEach(function (c) { c.dom = c.ch; });
  L.srcBase = L.srcBase || function (code) { return L.srcParse(code).src ? L.srcParse(code).base : null; };
  if (!L.CONFIG.title) L.CONFIG.title = 'GEOL 1001 Exam 1 Study Lab';
})((typeof window !== 'undefined' ? window : globalThis).L);
