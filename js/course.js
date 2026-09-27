/* Course configuration, evidence tiers, and source ledger for the runtime.
   Every graded item and teaching card cites codes defined here. */
(function (root) {
  'use strict';
  var L = root.L = root.L || {};
  L.CONFIG = {
    id: 'geol1001-exam1-v3',
    storageKey: 'geol1001-lab-v3',
    legacyKeys: { guided: 'geol1001-guided-progress-v1', drills: 'geol1001-study-lab-progress-v1' },
    courseCode: 'GEOL 1001-002', courseTitle: 'General Geology: Physical', term: 'Fall 2026',
    instructor: 'Professor Guangsheng Zhuang',
    examLabel: 'Exam 1 · Chapters 1–6',
    examDate: '2026-09-29', examTime: '10:30 AM, regular classroom (Howe-Russell W130)',
    version: '3.0.0 (built 2026-09-23)'
  };
  L.TIERS = {
    1: { name: 'Instructor / official', short: 'Instructor', desc: 'Direct statements by Professor Zhuang or official Fall 2026 course documents (syllabus, syllabus deck).' },
    2: { name: 'Course content', short: 'Course content', desc: 'What current lecture decks, recorded lectures, and the assigned textbook pages show. Not a statement about exam weight.' },
    3: { name: 'Student notes', short: 'Your notes', desc: 'Your own notes or reported experience this semester.' },
    4: { name: 'Lab design / inference', short: 'Design', desc: 'Choices and inferences made by this lab (question counts, mock layout, emphasis guesses). Not course facts.' }
  };
  var CE = 'COURSE EVIDENCE/';
  L.SOURCES = {
    SYL: { t: 'Fall 2026 syllabus (GEOL 1001-002)', f: CE + 'ADMIN/SYLLABUS.docx', tier: 1, unit: '' },
    L1A: { t: 'Lecture 1a; syllabus deck (Aug 25)', f: CE + 'LECTURE POWERPOINTS/LECTURE 1/GEOL1001-002 Lecture 1a.pptx', tier: 1, unit: 'slide' },
    L1B: { t: 'Lecture 1b; Ch. 1 The Nature of Geology', f: CE + 'LECTURE POWERPOINTS/LECTURE 1/GEOL1001-002-lecture 1b.pptx', tier: 2, unit: 'slide', note: 'Speaker note on slide 23: "2026.08.25: stopped at this slide." Slides 24–31 are deck continuation; class emphasis unconfirmed.' },
    L2: { t: 'Lecture 2; Ch. 2 Investigating Geologic Questions', f: CE + 'LECTURE POWERPOINTS/LECTURE 2/GEOL1001-002 Lecture 2.pptx', tier: 2, unit: 'slide' },
    L3: { t: 'Lecture 3; Ch. 3 Plate Tectonics', f: CE + 'LECTURE POWERPOINTS/LECTURE 3/GEOL1001-002 Lecture 3.pptx', tier: 2, unit: 'slide' },
    T0901: { t: 'Recorded lecture Sep 1 (Ch. 3)', f: CE + 'RECORDED LECTURES/09:01:2026.rtf', tier: 2, unit: '', note: 'Automatic speech-recognition transcript; wording is garbled in places.' },
    T0908: { t: 'Recorded lecture Sep 8 (Ch. 3 wrap-up, Ch. 4)', f: CE + 'RECORDED LECTURES/09:08:2026 .rtf', tier: 2, unit: '', note: 'ASR transcript.' },
    T0910: { t: 'Recorded lecture Sep 10 (Ch. 4 review, Ch. 5)', f: CE + 'RECORDED LECTURES/09:10:2026 .rtf', tier: 2, unit: '', note: 'ASR transcript.' },
    T0915: { t: 'Recorded lecture Sep 15 (Ch. 5)', f: CE + 'RECORDED LECTURES/09:15:2026.rtf', tier: 2, unit: '', note: 'ASR transcript.' },
    T0922: { t: 'Recorded lecture Sep 22; Exam 1 announcements', f: CE + 'RECORDED LECTURES/09:22:2026 .rtf', tier: 1, unit: '', note: 'Instructor statements about Exam 1 format and scope. Rest of the lecture is Chapter 7 (outside Exam 1).' },
    EN0922: { t: 'Your typed "EXAM FORMATTING" notes at the top of the Sep 22 transcript file', f: CE + 'RECORDED LECTURES/09:22:2026 .rtf', tier: 3, unit: '' },
    TB4: { t: 'Exploring Geology, Ch. 4 Earth Materials (supplied pages)', f: CE + 'LECTURE POWERPOINTS/GEOL 1001 Chapters 4 and 5 Screenshots - 2026-09-15/Chapter 4/', tier: 2, unit: 'section' },
    TB5: { t: 'Exploring Geology, Ch. 5 Igneous Environments (supplied pages)', f: CE + 'LECTURE POWERPOINTS/GEOL 1001 Chapters 4 and 5 Screenshots - 2026-09-15/Chapter 5/', tier: 2, unit: 'section' },
    TB6: { t: 'Exploring Geology, Ch. 6 Volcanoes and Volcanic Hazards (supplied pages)', f: CE + 'LECTURE POWERPOINTS/GEOL CH 6 SS /', tier: 2, unit: 'section', note: 'No Chapter 6 lecture recording or deck was supplied. Chapter 6 practice is textbook-grounded; classroom emphasis unconfirmed.' },
    IMG5737: { t: 'Classroom photo of the projected igneous classification chart (textbook fig. 05.03.b1)', f: CE + 'EXAM ONE/IMG_5737.JPG', tier: 2, unit: '' },
    CTX: { t: 'COURSE_CONTEXT.md (syllabus map)', f: CE + 'ADMIN/COURSE_CONTEXT.md', tier: 1, unit: '', note: 'Derived from the syllabus; exam times on class days are rule-derived.' },
    DES: { t: 'Lab design choice', f: 'n/a', tier: 4, unit: '' }
  };
  L.srcParse = function (code) {
    var s = String(code), i = s.indexOf(':');
    var base = i < 0 ? s : s.slice(0, i), loc = i < 0 ? '' : s.slice(i + 1);
    return { base: base, loc: loc, src: L.SOURCES[base] };
  };
  L.srcLabel = function (code) {
    var p = L.srcParse(code), s = p.src; if (!s) return code;
    var short = { SYL: 'Syllabus', L1A: 'Lec 1a', L1B: 'Lec 1b', L2: 'Lec 2', L3: 'Lec 3', T0901: 'Rec. Sep 1', T0908: 'Rec. Sep 8', T0910: 'Rec. Sep 10', T0915: 'Rec. Sep 15', T0922: 'Rec. Sep 22', EN0922: 'Your Sep 22 notes', TB4: 'Textbook', TB5: 'Textbook', TB6: 'Textbook', IMG5737: 'Class chart photo', CTX: 'Course context', DES: 'Lab design' }[p.base] || p.base;
    if (!p.loc) return short;
    if (s.unit === 'slide') return short + ' s' + p.loc;
    if (s.unit === 'section') return short + ' ' + p.loc;
    return short + ' ' + p.loc;
  };
  // Chapters act as "domains" for mocks and progress.
  L.CHAPTERS = {
    1: { name: 'Ch 1 · The Nature of Geology', short: 'Ch 1', evidence: 'Lecture 1b slides (class stopped at slide 23 on Aug 25).' },
    2: { name: 'Ch 2 · Investigating Geologic Questions', short: 'Ch 2', evidence: 'Lecture 2 deck (all 32 slides).' },
    3: { name: 'Ch 3 · Plate Tectonics', short: 'Ch 3', evidence: 'Lecture 3 deck + Sep 1 and Sep 8 recordings.' },
    4: { name: 'Ch 4 · Earth Materials', short: 'Ch 4', evidence: 'Textbook 4.1–4.13 + Sep 8 and Sep 10 recordings.' },
    5: { name: 'Ch 5 · Igneous Environments', short: 'Ch 5', evidence: 'Textbook 5.1–5.13 + Sep 10 and Sep 15 recordings + class chart photo.' },
    6: { name: 'Ch 6 · Volcanoes and Volcanic Hazards', short: 'Ch 6', evidence: 'Textbook 6.1–6.15 only. No Ch 6 recording supplied.' }
  };
  L.SECTIONS = [];   // filled by content files
  L.CONCEPTS = {};   // id -> {sec, name}
  L.GUIDE = {};      // secId -> [cards]
  L.ITEMS = [];      // graded items
  L.CASES = [];      // investigation cases
  L.BOSSES = [];
  L.MOCKS = {};
  L.GEN = {};        // generators
  L.GEN_FOR = {};    // concept -> [generator names]
  L.MEDIA = {};      // svg renderers
  // Authoring helpers used by content files ------------------------------------------------
  // Option strings: '*text|why' marks the keyed option; 'text|why' is a distractor with its rationale.
  function opts(list) {
    return list.map(function (s) {
      var ok = s.charAt(0) === '*'; if (ok) s = s.slice(1);
      var bar = s.indexOf('|'); return { t: bar < 0 ? s : s.slice(0, bar), w: bar < 0 ? '' : s.slice(bar + 1), ok: ok };
    });
  }
  L.A = {
    section: function (s) { L.SECTIONS.push(s); L.GUIDE[s.id] = L.GUIDE[s.id] || []; (s.concepts || []).forEach(function (c) { L.CONCEPTS[c[0]] = { sec: s.id, name: c[1] }; }); },
    cards: function (sec, cards) { L.GUIDE[sec] = (L.GUIDE[sec] || []).concat(cards); },
    mc: function (id, c, q, o, x, s, extra) { var it = { id: id, c: c, t: 'mc', q: q, o: opts(o), x: x, s: s }; return push(it, extra); },
    ms: function (id, c, q, o, x, s, extra) { var it = { id: id, c: c, t: 'ms', q: q, o: opts(o), x: x, s: s }; return push(it, extra); },
    tf: function (id, c, q, ans, x, s, extra) { var it = { id: id, c: c, t: 'tf', q: q, a: ans, x: x, s: s, o: [{ t: 'True', ok: ans === true, w: ans === true ? '' : x }, { t: 'False', ok: ans === false, w: ans === false ? '' : x }], fixedOrder: true }; return push(it, extra); },
    fill: function (id, c, q, acc, x, s, extra) { var it = { id: id, c: c, t: 'fill', q: q, acc: acc, x: x, s: s }; return push(it, extra); },
    match: function (id, c, q, pairs, x, s, extra) { var it = { id: id, c: c, t: 'match', q: q, pairs: pairs, x: x, s: s }; return push(it, extra); },
    order: function (id, c, q, seq, x, s, extra) { var it = { id: id, c: c, t: 'order', q: q, seq: seq, x: x, s: s }; return push(it, extra); },
    parts: function (id, c, q, parts, x, s, extra) { var it = { id: id, c: c, t: 'parts', q: q, parts: parts, x: x, s: s }; return push(it, extra); },
    teach: function (id, c, q, model, rubric, s, extra) { var it = { id: id, c: c, t: 'teach', q: q, model: model, rubric: rubric, s: s }; return push(it, extra); },
    num: function (id, c, q, a, tol, unit, x, s, extra) { var it = { id: id, c: c, t: 'num', q: q, a: a, tol: tol, unit: unit, x: x, s: s }; return push(it, extra); },
    kase: function (cs) { cs.items.forEach(function (it) { if (it.tier === undefined) it.tier = tierOf(it.s); if (it.t === 'tf' && !it.o) it.o = [{ t: 'True', ok: it.a === true, w: it.a === true ? '' : it.x }, { t: 'False', ok: it.a === false, w: it.a === false ? '' : it.x }]; }); L.CASES.push(cs); return cs; },
    opts: opts
  };
  // Evidence tier of an item = strongest tier among its cited sources, ignoring the design marker unless it is the only one.
  function tierOf(list) { var t = 9, onlyDes = true; (list || []).forEach(function (c) { var p = L.srcParse(c); if (!p.src) return; if (p.base !== 'DES') { onlyDes = false; t = Math.min(t, p.src.tier); } }); return onlyDes ? 4 : (t === 9 ? 2 : t); }
  L.tierOf = tierOf;
  function push(it, extra) { if (extra) for (var k in extra) it[k] = extra[k]; if (it.tier === undefined) it.tier = tierOf(it.s); L.ITEMS.push(it); return it; }
})(typeof window !== 'undefined' ? window : globalThis);
