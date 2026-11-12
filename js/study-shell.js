/* Local UI proposal. Course content, grading and persistence belong to the existing lab.
   shortcut: adapts this Geology DOM only; move accepted changes into its renderers before cross-lab rollout. */
(function (L) {
  'use strict';
  const main = document.querySelector('#main'), header = document.querySelector('header.top');
  const esc = L.util.esc;
  const nav = [
    ['Study', '#exam2', 'study'], ['Exam focus', '#exam2/focus', 'focus'],
    ['Review', '#review', 'review'], ['Progress', '#exam2/progress', 'progress']
  ];
  function element(tag, className, html) {
    const node = document.createElement(tag); node.className = className; node.innerHTML = html; return node;
  }
  function disclosure(label, nodes, className = '') {
    const d = element('details', 'shared-disclosure ' + className, '<summary>' + esc(label) + '</summary>');
    nodes.filter(Boolean).forEach(n => d.append(n)); return d;
  }
  function activeKind(hash) {
    return /focus|sets|take|result/.test(hash) ? 'focus' : /review/.test(hash) ? 'review' : /progress|history/.test(hash) ? 'progress' : 'study';
  }
  function shell() {
    const scope = L.examScope.current(), final = scope === 'final';
    const kind = final ? 'study' : activeKind(location.hash), key = scope + '/' + kind;
    if (header.dataset.shared === key && header.querySelector('.shared-nav')) return;
    header.dataset.shared = key;
    const tabs = final ? [['Study', '#final', 'study']] : nav;
    const laneTools = final ? '<a href="#final/progress">Chapter progress</a><a href="#review">Review misses</a>' : '<a href="#exam2/zhuang">Instructor guidance</a>';
    header.innerHTML = '<div class="shared-header"><div class="shared-identity"><a class="pilot-brand" href="#'+scope+'">GEOL 1001 <span>Physical Geology · '+L.EXAMS[scope].label+'</span></a><details class="shared-tools"><summary>Tools</summary><div class="pilot-tools-menu"><a href="#'+scope+'/history">Saved sessions</a><a href="#data">Back up / restore progress</a><a href="#'+scope+'/sources">Sources &amp; coverage</a>'+laneTools+'<a href="#exams">Switch exam</a></div></details></div><nav class="shared-nav" aria-label="Main">' + tabs.map(([label, href, id]) => '<a href="' + href + '"' + (kind === id ? ' aria-current="page"' : '') + '>' + label + '</a>').join('') + '</nav></div>';
  }
  function chapterName(ch) { return L.CHAPTERS[ch].name.replace(/^Ch(?:apter)?\s*\d+\s*[:·–—-]?\s*/i, ''); }
  function chapterIndex(scope) {
    const stats = L.engine.conceptStats();
    return element('section', 'shared-chapters', '<h2>Choose a chapter</h2><div class="shared-chapter-list">' + L.EXAMS[scope].available.map(ch => {
      const topics = (scope === 'final' ? L.FINAL_STUDY : L.EXAM2).topics.filter(t => t.ch === ch);
      const cs = [...new Set(topics.flatMap(t => t.concepts))].filter(c => L.engine.hasPracticeContent(c));
      const mastered = cs.filter(c => stats[c]?.status === 'mastered').length;
      const coverage = scope === 'final' && L.CHAPTERS[ch].coverage;
      return '<a class="shared-chapter-link" href="#' + scope + '/chapter/' + ch + '"><span class="shared-chapter-number">' + ch + '</span><span><strong>' + esc(chapterName(ch)) + '</strong><small>' + (coverage ? esc(coverage) + ' · ' : '') + topics.length + ' lessons · ' + mastered + '/' + cs.length + ' concepts mastered</small></span><span aria-hidden="true">→</span></a>';
    }).join('') + '</div>');
  }
  function hub() {
    const h1 = main.querySelector('h1'); if (!h1 || h1.dataset.shared) return;
    h1.dataset.shared = 'true';
    const scope = L.examScope.current(), final = scope === 'final';
    const requested = /^#(?:exam2|final)\/chapter\/(\d+)$/.exec(location.hash)?.[1];
    const chapter = final && !L.EXAMS.final.available.includes(Number(requested)) ? null : requested;
    const quick = main.querySelector('.pilot-quick-practice'), builder = main.querySelector('.pilot-builder');
    const formats = main.querySelector('.pilot-other-practice'), resume = main.querySelector('.pilot-resume');
    const oldFocus = [...main.querySelectorAll(':scope > section')].find(e => e.querySelector('a[href="#exam2/focus"]'));
    oldFocus?.remove(); main.querySelector('.pilot-chapter-nav')?.remove();
    const intro = main.querySelector('.pilot-intro');
    const resumeLabel = resume?.querySelector('p');
    if (resumeLabel) resumeLabel.textContent = resumeLabel.textContent.replace(/^(Exam \d+) · \1 · /, '$1 · ');
    if (chapter) {
      h1.textContent = chapterName(+chapter);
      h1.before(element('p', 'shared-crumb', '<a href="#'+scope+'">Study</a> / Chapter ' + chapter));
      const coverage = final && L.CHAPTERS[chapter].coverage;
      intro.textContent = (coverage ? coverage + '. ' : '') + (final ? 'Choose a mini-chapter to learn it or practice it.' : 'Choose a lesson, read the notes, then check what you can recall.');
      resume?.remove();
      if (!final) main.querySelectorAll('.pilot-topic-chapter > h2').forEach(h => h.remove());
      if (!final) main.querySelectorAll('.exam-topic').forEach(card => {
        const detail = card.querySelector('.mastery-details');
        if (detail) detail.querySelector('summary').textContent = detail.querySelector('summary').textContent.replace('Mastery details', 'Progress details');
      });
    } else {
      h1.textContent = final ? 'Final Exam' : 'What are you studying?';
      if (!final) intro.textContent = 'Learn a section, try it from memory, and return to what needs work.';
      main.querySelectorAll('.pilot-topic-chapter').forEach(n => n.remove());
      main.append(chapterIndex(scope));
    }
    if (final) return;
    const practice = element('section', 'shared-practice-options', '<h2>Ready to practice?</h2><p>Use your chapter work, review mistakes, or try the exam format.</p><div class="row"><a class="btn" href="#review">Review what needs work</a><a class="btn" href="#exam2/sets">Mock exams · 35 + 9</a></div>');
    if (quick) practice.append(disclosure('Quick practice', [quick]));
    if (builder) practice.append(builder);
    if (formats) practice.append(formats);
    main.append(practice);
  }
  function compactKey() {
    main.querySelector('.pilot-key')?.classList.add('shared-reading-key');
  }
  function lesson() {
    const stack = main.querySelector('.pilot-reading-stack');
    if (!stack || stack.dataset.shared) return;
    stack.dataset.shared = 'true';
    const topic = (L.examScope.current() === 'final' ? L.finalExam : L.exam2).topic(location.hash.split('/')[2]); if (!topic) return;
    main.querySelector('.pilot-intro')?.remove();
    main.querySelector(':scope > .small.muted')?.remove();
    const mastery = main.querySelector(':scope > .mastery-details');
    const toolbar = main.querySelector('.pilot-toolbar');
    const actions = main.querySelector('.pilot-lesson-actions');
    if (toolbar && actions) {
      toolbar.append(...actions.children); actions.remove();
      const practice = toolbar.querySelector('#pilot-practice');
      if (practice) practice.textContent = 'Practice section ' + topic.sections.join(', ');
    }
    if (mastery) main.append(mastery);
    compactKey();
    const cards = [...stack.querySelectorAll(':scope > .pilot-section-card')];
    const jump = element('label', 'shared-jump', 'In this lesson <select aria-label="Jump to a teaching group"><option value="">Choose a heading</option>' + cards.map((card, i) => {
      card.id = 'shared-group-' + i;
      return '<option value="' + card.id + '">' + esc(card.querySelector('h2').textContent) + '</option>';
    }).join('') + '</select>');
    jump.querySelector('select').onchange = e => {
      if (!e.target.value) return;
      const card = document.getElementById(e.target.value);
      card.scrollIntoView({block:'start'}); const title = card.querySelector('h2'); title.tabIndex = -1; title.focus({preventScroll:true});
    };
    stack.before(jump);
    cards.forEach(card => {
      const footer = card.querySelector('.pilot-section-practice');
      if (!footer) return;
      const button = footer.querySelector('button');
      if (button) button.textContent = 'Practice section ' + topic.sections.join(', ') + ' →';
      const help = footer.querySelector('.pilot-practice-help');
      if (help) help.textContent = 'This practice set covers the full textbook section, including the related notes above and below.';
    });
    const bottom = main.querySelector('.pilot-bottom'); if (bottom) main.append(bottom);
  }
  function focus() {
    const h1 = main.querySelector('h1'); if (!h1 || h1.dataset.shared) return;
    h1.dataset.shared = 'true';
    if (location.hash.split('/')[2]) {
      const unit = L.exam2Mocks.focusUnit(location.hash.split('/')[2]);
      h1.before(element('p', 'shared-crumb', '<a href="#exam2/focus">Exam focus</a> / Section ' + esc(unit.order)));
      h1.textContent = unit.title;
      const original = main.querySelector('[data-focus-practice]');
      if (original) {
        const action = element('div', 'row shared-focus-actions', '<button class="btn pri" type="button">' + esc(original.textContent) + '</button>');
        action.querySelector('button').onclick = () => original.click(); h1.after(action);
      }
      const record = main.querySelector('#e2-focus-detail-progress');
      if (record) record.classList.add('shared-section-progress');
      compactKey(); return;
    }
    h1.textContent = 'Exam focus';
    const overview = main.querySelector('.e2-focus-overview');
    const lead = main.querySelector('.lede');
    const scope = [...main.querySelectorAll(':scope > details')];
    const filters = main.querySelector('.e2-focus-filters');
    if (lead) {
      const fullExplanation = lead.cloneNode(true);
      lead.textContent = '25 focused sections · 72 distinct skill checks.';
      scope.push(fullExplanation); h1.after(lead);
    }
    const mock = element('div', 'shared-focus-actions row', '<a class="btn" href="#exam2/sets">Try a mock exam · 35 MC + 9 investigations</a>');
    if (lead) lead.after(mock); else h1.after(mock);
    if (overview) {
      overview.classList.add('shared-focus-tracker');
      overview.querySelector('h2').textContent = 'Your Focus mastery';
      const skillLabel = overview.querySelectorAll('.e2-focus-metrics > div > span')[1];
      if (skillLabel) skillLabel.textContent = 'Skills passed independently';
      const explanation = overview.querySelector(':scope > .small.muted');
      if (explanation) scope.push(explanation);
      overview.querySelector(':scope > p:not(.small)')?.remove();
      if (lead) lead.after(overview);
      const mockLink = mock.querySelector('a');
      mockLink.textContent = 'Mock exams · 35 + 9';
      overview.querySelector('.row').append(mockLink); mock.remove();
      const saved = main.querySelector('#examSave');
      if (saved) overview.append(saved);
      if (scope.length) main.append(disclosure('How Focus progress works', scope));
    }
    if (filters) filters.classList.add('shared-focus-filters');
    const rows = L.exam2Mocks.focusProgress().rows;
    main.querySelectorAll('[data-focus-card]').forEach(card => {
      const row = rows.find(r => r.id === card.dataset.focusId);
      if (row) card.dataset.mastery = row.mastered ? 'mastered' : row.needs ? 'review' : 'unfinished';
      card.querySelectorAll('.e2-focus-record > p').forEach(p => {
        if (p.textContent.includes(' skills checked at ')) p.textContent = p.textContent.replace(' skills checked at ', ' skills passed at ');
      });
    });
  }

  function review() {
    const h1 = main.querySelector('h1'); if (!h1 || h1.dataset.shared) return;
    h1.dataset.shared = 'true'; h1.textContent = 'Review what needs work';
    main.querySelector('.lede').textContent = 'Misses and due reviews come first. Topics you have not tried belong in Study.';
    const table = main.querySelector('table');
    const newRows = table ? [...table.querySelectorAll('tbody tr')].filter(row => row.querySelector('.why-new')) : [];
    newRows.forEach(row => row.remove());
    const count = L.engine.reviewPlan().filter(p => p.why !== 'new').length;
    const focusRows = L.exam2Mocks.focusProgress().rows.filter(row => row.needs);
    const old = main.querySelector('#go15');
    if (old) old.textContent = 'Mixed review + new practice (15)';
    const controls = old?.parentElement;
    if (controls) main.append(disclosure('More practice choices', [controls]));
    if (!count) {
      main.querySelector(':scope > .muted')?.remove();
      table?.closest('.pilot-table-frame')?.remove(); table?.remove();
      if (!focusRows.length) h1.after(element('section', 'card shared-empty', '<h2>No misses or due reviews yet</h2><p>Try a chapter or a Focus section. Your checked answers will show what to revisit here.</p><a class="btn pri" href="#exam2">Choose a chapter</a><a class="btn" href="#exam2/focus">Open exam focus</a>'));
    } else {
      h1.after(element('p', 'shared-status', count + ' concepts to revisit. Open miss details for targeted practice and saved feedback.'));
      h1.nextElementSibling.after(element('p', 'row', '<a class="btn pri" href="#exam2/review">Review missed concepts</a>'));
    }
    if (focusRows.length) {
      h1.after(element('section', 'card shared-empty', '<h2>Focus sections to revisit</h2><p>These misses come from your Focus checks. Focus skills and chapter mastery keep their own records.</p>' + focusRows.map(row => {
        const unit = L.exam2Mocks.focusUnit(row.id);
        return '<p><a class="btn pri" href="#exam2/focus/' + unit.n + '">' + esc(unit.title) + ' →</a></p>';
      }).join('')));
    }
  }
  function progress() {
    if (main.querySelector('.shared-focus-progress')) return;
    const p = L.exam2Mocks.focusProgress();
    const summary = element('section', 'card shared-empty shared-focus-progress', '<h2>Exam Focus checks</h2><p>' + p.mastered + '/' + p.total + ' sections mastered · ' + p.correct + '/' + p.checks + ' skills checked correctly at medium/high confidence' + (p.needs ? ' · ' + p.needs + (p.needs === 1 ? ' section needs review' : ' sections need review') : '') + '</p><p>Focus checks are separate from the chapter mastery record below. Reading alone does not count as a successful check.</p><a class="btn" href="#exam2/focus">Open Focus progress</a>');
    main.querySelector('.grid4')?.before(summary);
  }
  function mocks() {
    const heading = [...main.querySelectorAll('h2')].find(h => h.textContent === 'Practice the reviewed structure');
    const card = heading?.closest('.card');
    if (!card || card.closest('.shared-disclosure')) return;
    const d = disclosure('Exam format, scoring & limits', []); card.before(d); d.append(card);
  }
  function apply() {
    const scope = L.examScope.current();
    const active = ['exam2','final'].includes(scope) && !/^#exams$|^#exam1/.test(location.hash);
    document.body.classList.toggle('shared-preview', active);
    if (!active || !main.children.length) return;
    shell();
    const hash = location.hash;
    if (/^#(?:exam2|final)(?:\/(?:practice|chapter\/\d+))?\/?$/.test(hash)) hub();
    else if (/^#(?:exam2|final)\/topic\//.test(hash)) lesson();
    else if (scope === 'final') return;
    else if (/^#exam2\/focus(?:\/\d+)?$/.test(hash)) focus();
    else if (hash === '#review') review();
    else if (hash === '#exam2/progress') progress();
    else if (hash === '#exam2/sets') mocks();
    main.querySelectorAll('.e2-final-links').forEach(n => n.hidden = true);
  }
  let pending = false;
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(() => { pending = false; apply(); }); } }
  new MutationObserver(schedule).observe(main, {childList:true});
  // Native Enter actions must not also trigger the legacy document-level Next shortcut.
  [main, header].forEach(region => region.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.closest('a,button,summary,select,input,textarea')) e.stopPropagation();
  }));
  window.addEventListener('hashchange', () => { header.querySelectorAll('details[open]').forEach(d => d.open = false); schedule(); });
  document.addEventListener('DOMContentLoaded', schedule); schedule();
})(window.L);
