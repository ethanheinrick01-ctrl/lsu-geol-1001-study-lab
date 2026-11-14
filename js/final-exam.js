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

  function topicCard(t) {
    const { mastered, concepts, total, auto, self } = L.exam1.ui.topicMetrics(t);
    const route = '#' + lessonRoute(t);
    const count = (n, word) => n + ' ' + word + (n === 1 ? '' : 's');
    return '<article class="card exam-topic final-topic"><h3><a href="' + route + '">' + esc(t.title) + '</a></h3>' +
      '<p class="small">' + mastered + '/' + concepts + ' mastered · ' + count(total, 'check') + ' · ' +
      count(auto + self, 'first response') + '</p><div class="progress" role="progressbar" aria-label="' +
      esc(t.title) + ' mastery" aria-valuemin="0" aria-valuemax="' + concepts + '" aria-valuenow="' + mastered +
      '"><i style="width:' + L.util.pct(mastered, concepts) + '%"></i></div><div class="row">' +
      '<a class="btn pri" href="' + route + '">Learn</a>' +
      '<button type="button" class="btn" data-e2-practice="' + t.id + '">Practice topic</button>' +
      (figureRefs(t.id).length ? '<button type="button" class="btn" data-e2-diagram="' + t.id + '">Practice figure</button>' : '') +
      '</div>' + L.exam1.ui.masteryDetails(t, 'final') + '</article>';
  }

  function filmHTML(t) {
    const film = L.FINAL_FILMS?.[t.id];
    if (!film) return '';
    const b = 'videos/final-study/' + film.id;
    const stages = film.stages;
    return '<section class="card ad-video final-film" data-process-film="' + t.id + '" aria-label="Narrated explanation">' +
      '<h2>Watch the concept unfold</h2>' +
      '<video controls playsinline preload="metadata" width="1280" height="720" poster="' + b + '.webp" aria-label="' +
      esc(t.title) + ' narrated animation"><source src="' + b + '.mp4" type="video/mp4">' +
      (typeof window.VTTCue === 'function' ? '' : '<track kind="captions" src="' + b + '.vtt" srclang="en" label="English narration">') +
      'Download the video below to watch it.</video>' +
      '<div class="ad-film-controls"><div class="ad-chapters" aria-label="Film chapters">' + stages.map(s =>
        '<button type="button" class="btn small" data-film-seek="' + s.start + '">' + esc(s.label) + '</button>').join('') +
      '</div><label>Film speed <select data-film-speed><option value="0.75">0.75×</option><option value="1" selected>1×</option>' +
      '<option value="1.25">1.25×</option><option value="1.5">1.5×</option></select></label>' +
      '<button type="button" class="btn small" data-final-captions aria-pressed="false">Captions: off</button></div>' +
      '<div class="row"><a class="btn small" href="' + b + '.mp4" download>Save video</a>' +
      '<a class="btn small" href="' + b + '.vtt" download>Save captions</a></div>' +
      '<details class="ad-narration"><summary>Read the film transcript</summary>' + stages.map(s =>
        '<h3>' + esc(s.label) + '</h3><p>' + esc(s.text) + '</p>').join('') + '</details>' +
      '<details class="ad-narration"><summary>Visual sources and diagram notes</summary><ul>' + stages.map(s =>
        '<li>' + esc(s.source) + ' · <a href="' + esc(s.asset) + '" target="_blank" rel="noopener">Open course figure</a></li>').join('') +
      '</ul><p>Distances and process time are schematic. Narration uses Ethan’s synthetic voice.</p></details>' +
      '<p class="small muted">Watching does not award mastery.</p></section>';
  }

  function wireFilm(main, t) {
    const panel = main.querySelector('.final-film');
    if (!panel) return;
    L.animatedDiagrams.wire(main);
    const video = panel.querySelector('video'), button = panel.querySelector('[data-final-captions]');
    const cues = L.FINAL_FILMS[t.id].cues;
    const custom = typeof window.VTTCue === 'function' && video.addTextTrack;
    const track = custom ? video.addTextTrack('captions', 'English narration', 'en') : video.textTracks[0];
    if (!track) { button.hidden = true; return; }
    track.mode = 'hidden';
    if (custom) cues.forEach(([start, end, text]) => track.addCue(new window.VTTCue(start, end, text)));
    const update = () => {
      const showing = track.mode === 'showing';
      button.textContent = 'Captions: ' + (showing ? 'on' : 'off');
      button.setAttribute('aria-pressed', String(showing));
    };
    button.onclick = () => { track.mode = track.mode === 'showing' ? 'hidden' : 'showing'; update(); };
    video.textTracks.addEventListener('change', update);
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
      emphasis: filmHTML(t),
      html: cards + '<button type="button" class="btn" data-final-write="' + t.writing + '">Explain it in writing</button>',
      mediaIntro: 'Chapter ' + t.ch + ' course figures. Select a figure to enlarge it.'
    });
  }

  function addPracticeBuilder(main) {
    const stats = E.conceptStats();
    const valid = new Set(L.pilotPractice.concepts(L.examScope.concepts('final'), 'final'));
    const groups = topics.map(t => ({...t, concepts: t.concepts.filter(c => valid.has(c))})).filter(t => t.concepts.length);
    const builder = document.createElement('details');
    builder.className = 'card pilot-builder final-builder';
    builder.innerHTML = '<summary>Build your own practice</summary><p>Choose Final Exam concepts and a question count. Your answers and corrections are saved in your study history.</p>' +
      '<form><div class="row"><label>Number of questions <select name="count"><option>8</option><option selected>15</option><option>20</option><option>30</option></select></label>' +
      '<button class="btn" type="button" data-all>Select all concepts</button><button class="btn" type="button" data-clear>Clear selection</button></div>' +
      L.EXAMS.final.available.map(ch => '<details class="final-builder-chapter"><summary>Chapter ' + ch + ' · ' + esc(L.CHAPTERS[ch].name) + '</summary>' +
        groups.filter(t => t.ch === ch).map(t => {
          const mastered = t.concepts.filter(c => stats[c]?.status === 'mastered').length;
          const review = t.concepts.filter(c => stats[c]?.reviewOpen).length;
          return '<details class="final-builder-topic"><summary>' + esc(t.title) + ' · ' + mastered + '/' + t.concepts.length + ' mastered · ' +
            Math.round(mastered / t.concepts.length * 100) + '%' + (review ? ' · ' + review + ' need review' : '') + '</summary>' +
            t.concepts.map(c => '<label class="pilot-concept"><input type="checkbox" name="concept" value="' + esc(c) + '"><span>' +
              esc(L.CONCEPTS[c].name) + '<small>' + (stats[c]?.reviewOpen ? 'Needs review' : stats[c]?.status === 'mastered' ? 'Mastered' : 'Unfinished') + '</small></span></label>').join('') + '</details>';
        }).join('') + '</details>').join('') +
      '<div class="row"><button class="btn" type="button" data-unfinished>Select unfinished</button><button class="btn" type="button" data-review>Select needs review</button></div>' +
      '<p role="status" aria-live="polite" data-count></p><button type="submit" class="btn pri" disabled>Start selected practice</button></form>';
    main.append(builder);
    const form = builder.querySelector('form');
    const inputs = [...form.querySelectorAll('input[name="concept"]')];
    let current;
    function update() {
      const ids = inputs.filter(input => input.checked).map(input => input.value);
      current = L.pilotPractice.plan(ids, Number(form.elements.count.value), 'final');
      form.querySelector('[data-count]').textContent = ids.length + ' concept' + (ids.length === 1 ? '' : 's') + ' selected · ' + current.pool.authored + ' eligible questions · ' + current.refs.length + ' in this set';
      form.querySelector('[type="submit"]').disabled = !current.refs.length;
    }
    function select(predicate) {
      inputs.forEach(input => { input.checked = predicate(input.value); });
      update();
    }
    form.addEventListener('change', update);
    form.querySelector('[data-all]').onclick = () => select(() => true);
    form.querySelector('[data-clear]').onclick = () => select(() => false);
    form.querySelector('[data-unfinished]').onclick = () => select(c => stats[c]?.status !== 'mastered');
    form.querySelector('[data-review]').onclick = () => select(c => !!stats[c]?.reviewOpen);
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (current.refs.length) L.pilotPractice.launch(current, 'Final Exam · Custom practice', 'final');
    });
    update();
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
      wireFilm(main, t);
    } else if (page === 'chapter' && available.includes(ch)) {
      main.innerHTML = '<h1>' + esc(L.CHAPTERS[ch].name) + '</h1><p class="pilot-intro">Read the notes, then practice the course figures and concepts.</p>' +
        '<section class="pilot-topic-chapter final-topic-list" aria-labelledby="final-mini-chapters"><h2 id="final-mini-chapters">Mini-chapters</h2><div class="exam-topics">' +
        topics.filter(t => t.ch === ch).map(topicCard).join('') + '</div></section>';
    } else {
      main.innerHTML = '<h1>Final Exam</h1><p class="pilot-intro">Choose a chapter to read the notes and practice its figures.</p>' + L.pilotPractice.resumeHTML('final');
    }
    if (!page || page === 'map') addPracticeBuilder(main);
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
