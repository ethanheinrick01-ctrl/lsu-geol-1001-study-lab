/* Chapter Study uses the same teaching cards, session engine and progress as Exam 2. */
(function (L) {
  'use strict';
  if (!L.FINAL_STUDY) return;
  const { topics } = L.FINAL_STUDY, E = L.engine, esc = L.util.esc;
  const topic = id => topics.find(t => t.id === id);
  const lessonRoute = t => 'final/topic/' + t.id;

  function figureRefs(id) {
    const t = topic(id);
    return t ? E.itemsFor(it => it.examId === 'final' && it.media && t.concepts.includes(it.c)).map(it => ({id: it.id})) : [];
  }

  function sourceHTML(item) {
    const citations = (item.s || item.src || []).map(code => {
      const { loc, src } = L.srcParse(code);
      const reference = src?.f.startsWith('https://') ? '<a href="' + esc(src.f) + '">Read report</a>' : '';
      return '<li>' + esc(src ? src.t : code) + (loc ? ' · ' + esc(loc) : '') + (reference ? ' · ' + reference : '') + '</li>';
    });
    return '<details class="e2-source"><summary>Course sources</summary><ul>' + citations.join('') + '</ul></details>';
  }

  function lesson(t) {
    const cards = L.GUIDE[t.sec].map(card =>
      '<section class="e2-note-topic">' + L.exam2Reading.wrap(card.id, card.html) + '</section>'
    ).join('');
    return L.exam1.ui.topicLesson(t, {
      examId: 'final',
      html: cards + '<button type="button" class="btn" data-final-write="' + t.writing + '">Explain it in writing</button>',
      mediaIntro: 'Chapter ' + t.ch + ' course figures. Select a figure to enlarge it.'
    });
  }

  function view(main, args) {
    const page = args[0], ch = Number(args[1]), available = L.EXAMS.final.available;
    const t = page === 'topic' ? topic(args[1]) : page === 'guide' ? topics.find(t => t.sec === args[1]) : null;
    if (page === 'guide') {
      L.app.go(t ? lessonRoute(t) : 'final');
      return;
    }
    if (page === 'progress') {
      L.app.sharedView(main, 'progress');
      return;
    }
    if (page === 'history') {
      main.innerHTML = L.exam1.ui.history('final');
    } else if (page === 'review') {
      main.innerHTML = L.exam1.ui.review('final');
    } else if (page === 'sources') {
      main.innerHTML = '<h1>Final Exam sources</h1>' + available.map(n => {
        const chapter = L.CHAPTERS[n];
        return '<section class="card"><h2>' + esc(chapter.name) + '</h2><p>' + esc(chapter.evidence) + '</p>' +
          (chapter.sourceNote ? '<p>' + esc(chapter.sourceNote) + '</p>' : '') + '</section>' +
          topics.filter(t => t.ch === n).map(t => '<section class="card"><h3><a href="#' + lessonRoute(t) + '">' + esc(t.title) + '</a></h3>' + sourceHTML({src: t.sources}) + '</section>').join('');
      }).join('');
    } else if (t) {
      main.innerHTML = lesson(t);
    } else if (page === 'chapter' && available.includes(ch)) {
      main.innerHTML = '<h1>' + esc(L.CHAPTERS[ch].name) + '</h1><p class="pilot-intro">Read the notes, then practice the course figures and concepts.</p>' +
        '<section class="pilot-topic-chapter"><div class="exam-topics">' + topics.filter(t => t.ch === ch).map(t => L.exam1.ui.topicCard(t, 'final')).join('') + '</div></section>';
    } else {
      main.innerHTML = '<h1>Final Exam</h1><p class="pilot-intro">Choose a chapter to read the notes and practice its figures.</p>' + L.pilotPractice.resumeHTML('final');
    }
    main.querySelectorAll('[data-e2-practice]').forEach(b => {
      const lesson = topic(b.dataset.e2Practice);
      b.onclick = () => L.pilotPractice.launch(
        L.pilotPractice.plan(b.dataset.concept ? [b.dataset.concept] : lesson.concepts, 8, 'final'),
        lesson.title + ' · Section practice', lessonRoute(lesson)
      );
    });
    main.querySelectorAll('[data-e2-diagram]').forEach(b => {
      const lesson = topic(b.dataset.e2Diagram), figures = figureRefs(lesson.id);
      if (!figures.length) {
        b.remove();
        return;
      }
      b.onclick = () => {
        const used = new Set(figures.map(ref => ref.id));
        const supporting = L.pilotPractice.plan(lesson.concepts, 8, 'final').refs.filter(ref => !used.has(ref.id));
        L.pilotPractice.launch({examId: 'final', refs: figures.concat(supporting)}, lesson.title + ' · Figure practice', lessonRoute(lesson));
      };
    });
    main.querySelectorAll('[data-final-write]').forEach(b => {
      b.onclick = () => L.pilotPractice.launch({examId: 'final', refs: [{id: b.dataset.finalWrite}]}, t.title + ' · Short answer', lessonRoute(t));
    });
    main.querySelectorAll('[data-e2-resume]').forEach(b => {
      b.onclick = () => L.app.resumeSession(b.dataset.e2Resume);
    });
  }
  L.finalExam = { topic, figureRefs, sourceHTML, view };
})(window.L);
