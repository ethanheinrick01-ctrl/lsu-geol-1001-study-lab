/* GEOL 1001 Study Lab v3; router and views. */
(function (root) {
  'use strict';
  var L = root.L, U = L.util, E = L.engine, S = L.store, IU = L.itemUI, esc = U.esc, CFG = L.CONFIG;
  var main;
  var STATUS = { new: 'Not started', learning: 'Learning', shaky: 'Shaky', misconception: 'Misconception', mastered: 'Mastered' };
  function $(s, r) { return (r || document).querySelector(s); }
  function toast(msg) { var t = U.el('div', { class: 'toast', role: 'status' }, esc(msg)); document.body.appendChild(t); setTimeout(function () { t.remove(); }, 3600); }
  function secById(id) { return L.SECTIONS.filter(function (s) { return s.id === id; })[0]; }
  function secsOfCh(ch) { return L.SECTIONS.filter(function (s) { return s.ch === ch; }); }
  function conceptsOfSec(id) { return Object.keys(L.CONCEPTS).filter(function (c) { return L.CONCEPTS[c].sec === id; }); }
  function daysToExam() { return U.daysBetween(U.todayKey(), CFG.examDate); }
  function setNav(r) { document.querySelectorAll('nav.main a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-r') === r); a.setAttribute('aria-current', a.getAttribute('data-r') === r ? 'page' : 'false'); }); }
  function banner() {
    var h = '';
    if (!S.ok()) h += '<div class="warnbox" role="alert"><b>Browser storage is blocked here.</b> Practice works, but progress will not survive closing this tab. Use <a href="#data">Data → Export</a> before closing. <span class="small muted">' + esc(S.error()) + '</span></div>';
    if (S.load().mockActive && location.hash.indexOf('#mock') !== 0) h += '<div class="infobox">An old-format mock is saved. <a href="#exam1/history">Resume or archive it</a>.</div>';
    return h;
  }
  function statusBadge(st) { return '<span class="badge st-' + st + '">' + STATUS[st] + '</span>'; }
  function go(h) { if (location.hash === '#' + h) route(); else location.hash = h; }
  function route() {
    var h = (location.hash || '#home').slice(1), parts = h.split('/'), r = parts[0] || 'home';
    document.onkeydown = null;
    setNav(r === 'mock' ? 'exam1' : r === 'session' ? (S.load().session && S.load().session.mode === 'boss' ? 'boss' : 'practice') : r);
    var views = { home: pHome, guide: pGuide, practice: pPractice, session: pSession, review: pReview, boss: pBoss, mock: pMock, exam1: function(args){ L.exam1.view(main,args); }, progress: pProgress, evidence: pEvidence, data: pData };
    (views[r] || pHome)(parts.slice(1));
    main.focus({ preventScroll: true });
    if (r !== 'session' && r !== 'mock' && !(r === 'exam1' && parts[1] === 'take')) window.scrollTo(0, 0);
    wireZoom();
  }
  function wireZoom() {
    main.querySelectorAll('[data-zoom]').forEach(function (b) {
      if (b._z) return; b._z = 1;
      b.addEventListener('click', function () { var d = $('#zoomdlg'); $('#zoomimg').src = b.getAttribute('data-zoom'); $('#zoomimg').alt = b.getAttribute('data-cap') || ''; $('#zoomcap').textContent = b.getAttribute('data-cap') || ''; if (d.showModal) d.showModal(); else d.setAttribute('open', ''); });
    });
  }

  // ---------------- Home ----------------
  function pHome() {
    var st = E.conceptStats(), ids = Object.keys(L.CONCEPTS).filter(E.hasPracticeContent);
    var mastered = ids.filter(function (c) { return st[c].status === 'mastered'; }).length;
    var mis = ids.filter(function (c) { return st[c].status === 'misconception'; });
    var plan = E.reviewPlan(), urgent = plan.filter(function (p) { return p.why !== 'new' && p.why !== 'learning'; }).length;
    var s = S.load(), d = daysToExam();
    var h = [banner()];
    h.push('<section class="hero"><div><p class="eyebrow">' + esc(CFG.courseCode) + ' · ' + esc(CFG.term) + ' · ' + esc(CFG.instructor) + '</p><h1>Exam 1 Study Lab</h1><p class="lede">Start with the Sep 24 Exam 1 review: focused teaching, familiar course figures, and feedback after every question.</p></div>');
    h.push('<div class="count"><b>' + (d >= 0 ? d : 0) + '</b><span>' + (d === 1 ? 'day' : 'days') + ' to Exam 1</span><small>' + esc(CFG.examDate) + ' · ' + esc(CFG.examTime) + '</small></div></section>');
    h.push('<div class="grid4">' +
      stat(mastered + '/' + ids.length, 'concepts mastered', 'Two correct answers on different questions at medium/high confidence, no hints. Earned mastery never goes down.') +
      stat(String(mis.length), 'misconceptions', 'High-confidence misses not yet cleared by two correct answers.') +
      stat(String(urgent), 'review items', 'Misses, mock misses, and spaced reviews waiting.') +
      stat(String(s.examRuns.length), 'Exam 1 review runs', 'First attempts and corrections saved separately; untimed.') + '</div>');
    h.push('<section class="card exam-home"><p class="eyebrow">Your first stop for Tuesday</p><h2>Professor’s Exam 1 review</h2><p>16 focused topic groups · original McGraw-Hill figures · three review sets with 25 multiple choice, 8 short answers, and 7 investigations.</p><div class="row"><a class="btn pri" href="#exam1">Open Exam 1 topic map</a><a class="btn" href="#exam1/sets">Choose a review set</a>' + (L.exam1.active() ? '<a class="btn" href="#exam1/take">Resume saved review</a>' : '') + '</div></section>');
    var leg = S.readLegacyInBrowser();
    if (leg && leg.guided && !s.legacy) h.push('<div class="infobox"><b>Old lab progress found in this browser.</b> Import it as review signals (read-only; the old lab is not changed). <button class="btn small" id="impLeg">Import old history</button></div>');
    h.push('<section class="card"><h2>What to do next</h2><ol class="steps">' + nextSteps(st, plan, s) + '</ol></section>');
    h.push('<section class="card"><h2>What the professor said about Exam 1</h2>' + examFacts() + '</section>');
    h.push('<section class="card"><h2>Chapters</h2><div class="chgrid">');
    for (var ch = 1; ch <= 6; ch++) {
      var cs = ids.filter(function (c) { return secById(L.CONCEPTS[c].sec).ch === ch; }), m = cs.filter(function (c) { return st[c].status === 'mastered'; }).length;
      h.push('<a class="chcard" href="#guide/ch' + ch + '"><b>' + esc(L.CHAPTERS[ch].name) + '</b><div class="bar"><i style="width:' + U.pct(m, cs.length) + '%"></i></div><span class="small muted">' + m + '/' + cs.length + ' mastered · ' + esc(L.CHAPTERS[ch].evidence) + '</span></a>');
    }
    h.push('</div></section>');
    main.innerHTML = h.join('');
    if ($('#impLeg')) $('#impLeg').onclick = function () { var r = S.importLegacyFromBrowser(); toast(r.message); route(); };
    main.querySelectorAll('[data-go]').forEach(function (b) { b.onclick = function () { runAction(b.getAttribute('data-go')); }; });
  }
  function stat(v, l, d) { return '<div class="stat"><b>' + esc(v) + '</b><span>' + esc(l) + '</span><small>' + esc(d) + '</small></div>'; }
  function nextSteps(st, plan, s) {
    var out = [], unread = L.SECTIONS.filter(function (x) { return !(L.GUIDE[x.id] || []).every(function (c) { return s.guideRead[c.id]; }); });
    var mis = plan.filter(function (p) { return p.why === 'misconception' || p.why === 'mock' || p.why === 'shaky'; });
    if (mis.length) out.push('<li><b>Clear ' + mis.length + ' weak concept' + (mis.length > 1 ? 's' : '') + '.</b> ' + esc(mis.slice(0, 3).map(function (p) { return L.CONCEPTS[p.c].name; }).join('; ')) + (mis.length > 3 ? '…' : '') + ' <button class="btn small pri" data-go="review">Start review</button></li>');
    if (unread.length) out.push('<li><b>Study before testing.</b> Next unread guide section: <a href="#guide/' + unread[0].id + '">' + esc(unread[0].n + ' ' + unread[0].title) + '</a>.</li>');
    var newc = plan.filter(function (p) { return p.why === 'new'; });
    if (newc.length) out.push('<li><b>' + newc.length + ' concepts never attempted.</b> <button class="btn small" data-go="mixed">Mixed practice (15)</button></li>');
    var boss = L.BOSSES.filter(function (b) { return !(s.boss[b.id] && s.boss[b.id].best !== null); });
    if (boss.length) out.push('<li><b>Boss drill not yet completed:</b> <a href="#boss">' + esc(boss[0].title) + '</a>.</li>');
    out.unshift('<li><b>Follow the Sep 24 review.</b> <a href="#exam1">Learn and practice the reviewed topics</a>; weak topics show their first-try results and corrections.</li>');
    return out.join('');
  }
  function examFacts() {
    return L.EXAM_FACTS + IU.srcChips(['R0924:lines 322–434; 4966–5000','SYL','CTX']);
  }
  function runAction(a) {
    if (a === 'review') return startReview();
    if (a === 'mixed') return startPractice({ n: 15 }, 'Mixed practice');
  }

  // ---------------- Guide ----------------
  function pGuide(args) {
    var s = S.load(), h = [banner()];
    var id = args[0];
    if (!id || /^ch\d$/.test(id)) {
      var only = id ? +id.slice(2) : null;
      h.push('<h1>Study Guide</h1><p class="lede">Teaching first. Each section cites the lecture slides, recordings, or textbook pages it comes from, flags evidence limits, and ends with practice.</p>');
      for (var ch = 1; ch <= 6; ch++) {
        if (only && ch !== only) continue;
        h.push('<section class="card"><h2>' + esc(L.CHAPTERS[ch].name) + '</h2><p class="small muted">Evidence: ' + esc(L.CHAPTERS[ch].evidence) + '</p><div class="seclist">');
        secsOfCh(ch).forEach(function (sec) {
          var cards = L.GUIDE[sec.id] || [], read = cards.filter(function (c) { return s.guideRead[c.id]; }).length;
          h.push('<a class="secrow" href="#guide/' + sec.id + '"><span class="n">' + esc(sec.n) + '</span><span><b>' + esc(sec.title) + '</b><br><span class="small muted">' + esc(sec.srcText) + '</span></span><span class="small">' + (sec.flag ? '<span class="badge flag">' + esc(sec.flag) + '</span> ' : '') + (read === cards.length && cards.length ? '<span class="badge st-mastered">read</span>' : read + '/' + cards.length) + '</span></a>');
        });
        h.push('</div></section>');
      }
      if (only) h.push('<p><a href="#guide">All chapters</a></p>');
      main.innerHTML = h.join(''); return;
    }
    var sec = secById(id); if (!sec) { main.innerHTML = '<p>Unknown section.</p>'; return; }
    var list = secsOfCh(sec.ch), pos = list.indexOf(sec), prev = list[pos - 1], next = list[pos + 1];
    h.push('<nav class="crumbs"><a href="#guide">Guide</a> › <a href="#guide/ch' + sec.ch + '">' + esc(L.CHAPTERS[sec.ch].short) + '</a> › ' + esc(sec.n) + '</nav>');
    h.push('<header class="sechead"><h1>' + esc(sec.n + ' ' + sec.title) + '</h1><p class="small">' + IU.srcChips(sec.src) + ' ' + IU.tierBadge(sec.tier || 2) + '</p>' + (sec.note ? '<div class="infobox small">' + sec.note + '</div>' : '') + '</header>');
    (L.GUIDE[id] || []).forEach(function (c) {
      var ts = U.uniq((c.c || []).reduce(function(a,id){return a.concat(L.EXAM_CONCEPT_TOPICS[id] || []);},[]));
      h.push('<p class="small muted">' + (ts.length ? 'Related to Sep 24 review: ' + ts.map(function(t){return '<a href="#exam1/topic/'+t+'">'+t+'</a>';}).join(' · ') : 'Broader course material; not singled out in the Sep 24 review.') + '</p>');
      h.push('<article class="card gcard" id="' + c.id + '"><h2>' + esc(c.h) + '</h2>' + c.html + (c.media ? IU.mediaHTML(c.media) : ''));
      if (c.traps && c.traps.length) h.push('<div class="traps"><b>Tempting mistakes</b><ul>' + c.traps.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>');
      h.push('<p class="srcline">' + IU.srcChips(c.src) + ' ' + IU.tierBadge(c.tier || sec.tier || 2) + '</p></article>');
    });
    var slides = sectionSlides(sec);
    if (slides.length) h.push('<details class="card"><summary><b>Source slides for this section</b> <span class="small muted">(' + slides.length + ' slides from the lecture deck; tap to enlarge)</span></summary>' + IU.mediaHTML(slides.map(function (x) { return { kind: 'img', src: x.src, cap: x.cap, alt: x.cap }; })) + '</details>');
    var cons = conceptsOfSec(id).filter(E.hasPracticeContent), st = E.conceptStats();
    h.push('<section class="card"><h2>Check yourself</h2><p class="small muted">Close the notes first. Questions use new wording and new situations, not the sentences above.</p><div class="chips">' + cons.map(function (c) { return '<span class="chip">' + esc(L.CONCEPTS[c].name) + ' ' + statusBadge(st[c].status) + '</span>'; }).join('') + '</div><div class="row"><button class="btn pri" id="pracSec">Practice this section (8)</button>' + (prev ? '<a class="btn ghost" href="#guide/' + prev.id + '">← ' + esc(prev.n) + '</a>' : '') + (next ? '<a class="btn ghost" href="#guide/' + next.id + '">' + esc(next.n) + ' →</a>' : '') + '</div></section>');
    main.innerHTML = h.join('');
    (L.GUIDE[id] || []).forEach(function (c) { s.guideRead[c.id] = s.guideRead[c.id] || Date.now(); }); S.save();
    $('#pracSec').onclick = function () { startPractice({ sec: id, n: 8 }, 'Practice: ' + sec.n + ' ' + sec.title); };
    main.querySelectorAll('[data-guidegen]').forEach(function (b) { b.onclick = function () { var g = b.getAttribute('data-guidegen'); E.newSession('practice', 'Generated practice', [0, 1, 2, 3, 4].map(function () { return { gen: g, seed: U.newSeed() }; }), { back: 'guide/' + id }); go('session'); }; });
    if (L.GUIDE_HOOKS && L.GUIDE_HOOKS[id]) L.GUIDE_HOOKS[id](main);
  }

  // Deck slides named in a section's source line (e.g. "Lec 3 s31–33, s37–38"), shown as a viewable strip.
  var DECKS = { 'Lec 1b': ['l1b', 31, 'Lec 1b'], 'Lec 2': ['l2', 32, 'Lec 2'], 'Lec 3': ['l3', 45, 'Lec 3'] };
  function sectionSlides(sec) {
    var out = [];
    String(sec.srcText || '').split('·').forEach(function (part) {
      part = part.split('(')[0].trim();
      Object.keys(DECKS).forEach(function (k) {
        if (part.indexOf(k + ' ') !== 0) return;
        var d = DECKS[k], re = /s(\d+)(?:–(\d+))?/g, m;
        while ((m = re.exec(part))) { var a = +m[1], b = m[2] ? +m[2] : a; for (var i = a; i <= b && i <= d[1]; i++) out.push({ src: 'assets/img/slides/' + d[0] + '-slide-' + i + '.jpg', cap: d[2] + ' slide ' + i }); }
      });
    });
    return out;
  }
  // ---------------- Practice ----------------
  function pPractice() {
    var st = E.conceptStats(), h = [banner(), '<h1>Practice</h1><p class="lede">Confidence is chosen before feedback. Misses and low-confidence answers come back after a gap, usually as a different question on the same concept.</p>'];
    h.push('<div class="infobox">For the professor’s focused review and course-figure practice, open <a href="#exam1">Exam 1</a>. The practice below covers the broader chapters.</div>');
    h.push('<div class="row"><button class="btn pri" id="mix15">Mixed Ch 1–6 (15)</button><button class="btn" id="rev">Review queue (15)</button></div>');
    for (var ch = 1; ch <= 6; ch++) {
      h.push('<details class="card" ' + (ch === 1 ? 'open' : '') + '><summary><b>' + esc(L.CHAPTERS[ch].name) + '</b></summary><div class="row"><button class="btn small" data-ch="' + ch + '">Practice all of ' + esc(L.CHAPTERS[ch].short) + ' (15)</button></div>');
      secsOfCh(ch).forEach(function (sec) {
        var cs = conceptsOfSec(sec.id).filter(E.hasPracticeContent);
        h.push('<div class="pracsec"><div class="spread"><b>' + esc(sec.n + ' ' + sec.title) + '</b><button class="btn small" data-sec="' + sec.id + '">Practice (8)</button></div><div class="chips">');
        cs.forEach(function (c) { h.push('<label class="chip"><input type="checkbox" class="cc" value="' + c + '"> ' + esc(L.CONCEPTS[c].name) + ' ' + statusBadge(st[c].status) + '</label>'); });
        h.push('</div></div>');
      });
      h.push('</details>');
    }
    h.push('<div class="sticky"><button class="btn pri" id="custom">Practice checked concepts</button></div>');
    main.innerHTML = h.join('');
    $('#mix15').onclick = function () { startPractice({ n: 15 }, 'Mixed practice'); };
    $('#rev').onclick = startReview;
    main.querySelectorAll('[data-ch]').forEach(function (b) { b.onclick = function (e) { e.preventDefault(); startPractice({ ch: +b.getAttribute('data-ch'), n: 15 }, 'Practice: ' + L.CHAPTERS[+b.getAttribute('data-ch')].name); }; });
    main.querySelectorAll('[data-sec]').forEach(function (b) { b.onclick = function () { var sec = secById(b.getAttribute('data-sec')); startPractice({ sec: sec.id, n: 8 }, 'Practice: ' + sec.n + ' ' + sec.title); }; });
    $('#custom').onclick = function () { var cs = [].slice.call(main.querySelectorAll('.cc:checked')).map(function (x) { return x.value; }); if (!cs.length) return toast('Check at least one concept.'); startPractice({ concepts: cs, n: Math.min(20, Math.max(6, cs.length * 2)) }, 'Custom practice'); };
  }
  function startPractice(opt, title) {
    var refs = E.practiceRefs(opt); if (!refs.length) return toast('No practice items for that selection.');
    E.newSession('practice', title, refs, { back: 'practice' }); go('session');
  }
  function startReview() {
    var refs = E.reviewRefs(15); if (!refs.length) return toast('Nothing in the review queue yet. Practice first.');
    E.newSession('review', 'Review queue', refs, { back: 'review' }); go('session');
  }

  // ---------------- Session (practice / review / boss) ----------------
  function pSession() {
    var sess = E.currentSession();
    if (!sess) { main.innerHTML = '<div class="card"><p>No active session.</p><a class="btn" href="#practice">Practice</a></div>'; return; }
    if (sess.idx >= sess.queue.length) { var ended = E.endSession(); var bossRes = ended.mode === 'boss' ? E.finishBoss(ended) : null; summary(ended, bossRes); return; }
    var q = sess.queue[sess.idx], it = E.resolve(q.ref);
    if (!it) { E.advance(); return pSession(); }
    var firsts = sess.results.filter(function (r) { return !r.retry; });
    var isBoss = sess.mode === 'boss', done = sess.results.length > sess.idx;
    var h = ['<div class="sesshead"><div><b>' + esc(sess.title) + '</b><span class="small muted"> · ' + (sess.idx + 1) + ' of ' + sess.queue.length + (sess.retries ? ' (' + sess.retries + ' spaced retr' + (sess.retries > 1 ? 'ies' : 'y') + ' added)' : '') + '</span></div><div class="row"><span class="small">' + firsts.filter(function (r) { return r.ok; }).length + '/' + firsts.length + ' first-try correct</span><button class="btn ghost small" id="endS">End</button></div></div>'];
    h.push('<div class="progress"><i style="width:' + U.pct(sess.idx, sess.queue.length) + '%"></i></div><div id="host"></div><div class="row nextrow" id="nr"></div>');
    main.innerHTML = h.join('');
    var host = $('#host'), key = String(sess.idx);
    var hdr = (q.retry ? '<span class="badge">Spaced retry</span> ' : '') + (isBoss ? 'Boss · ' : '') + esc((L.CONCEPTS[it.c] || {}).name || '');
    var ui = IU.render(host, it, {
      mode: sess.mode, header: hdr, order: sess.orders[key], rights: sess.orders[key + 'r'], allowHint: !isBoss,
      response: done ? sess.results[sess.idx].resp : undefined,
      graded: done && it.t !== 'teach' ? E.grade(it, sess.results[sess.idx].resp) : null, locked: done,
      onSubmit: function (resp, conf, assisted) {
        var res = E.answerInSession(resp, conf, assisted);
        if (it.t !== 'teach') IU.showFeedback(host, it, resp, res.grade, {});
        showNext();
      }
    });
    var s0 = S.load(); if (s0.session) { s0.session.orders[key] = ui.order; if (ui.rights) s0.session.orders[key + 'r'] = ui.rights; S.save(); }
    function showNext() {
      var nr = $('#nr'); nr.innerHTML = '';
      var nb = U.el('button', { class: 'btn pri', id: 'nextBtn' }, 'Next →'); nb.onclick = function () { E.advance(); pSession(); window.scrollTo(0, 0); };
      nr.appendChild(nb); nb.focus({ preventScroll: true });
    }
    if (done) showNext();
    document.onkeydown = function (e) {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === 'Enter' && $('#nextBtn')) { e.preventDefault(); $('#nextBtn').click(); return; }
      if (host._keys) host._keys(e);
    };
    $('#endS').onclick = function () {
      var s1 = E.currentSession(), msg = s1.mode === 'boss' ? 'End this Boss drill early? It will be recorded as incomplete and cannot set a best score.' : 'End this session? Answers so far are saved.';
      if (!confirm(msg)) return;
      var ended = E.endSession(); var br = ended.mode === 'boss' ? E.finishBoss(ended) : null; summary(ended, br, true);
    };
  }
  function summary(sess, bossRes, early) {
    var first = sess.results.filter(function (r) { return !r.retry && r.t !== 'teach'; });
    var ok = first.filter(function (r) { return r.ok; }).length;
    var missed = U.uniq(sess.results.filter(function (r) { return r.ok === false; }).map(function (r) { return r.c; }));
    var hiMiss = sess.results.filter(function (r) { return r.ok === false && r.cf === 'h'; }).length;
    var h = ['<div class="card"><h1>' + (early ? 'Session ended' : 'Session complete') + '</h1><h2>' + esc(sess.title) + '</h2>'];
    if (bossRes) {
      var b = L.BOSSES.filter(function (x) { return x.id === sess.bossId; })[0];
      h.push('<p class="big">' + bossRes.score + ' / ' + bossRes.total + (bossRes.complete ? '' : ' <span class="badge st-shaky">incomplete: ' + bossRes.answered + ' answered; not eligible for best score</span>') + '</p>');
      if (bossRes.complete) h.push('<p>' + (bossRes.score / bossRes.total >= b.pass ? '<b>Cleared.</b> ' : '<b>Not cleared yet.</b> ') + 'Target: ' + Math.round(b.pass * 100) + '% (a lab design choice, not a course grade).</p>');
    } else h.push('<p class="big">' + ok + ' / ' + first.length + ' correct on first try</p>');
    if (hiMiss) h.push('<p class="warn">' + hiMiss + ' high-confidence miss' + (hiMiss > 1 ? 'es' : '') + '; these are the dangerous ones on an exam because you would not second-guess them.</p>');
    if (missed.length) h.push('<h3>Concepts to revisit</h3><ul>' + missed.map(function (c) { var con = L.CONCEPTS[c]; return con ? '<li>' + esc(con.name) + ': <a href="#guide/' + con.sec + '">guide</a></li>' : ''; }).join('') + '</ul><div class="row"><button class="btn pri" id="drillMiss">Practice missed concepts</button></div>');
    h.push('<div class="row"><a class="btn" href="#' + (sess.back || 'practice') + '">Back</a><a class="btn ghost" href="#progress">Progress</a></div></div>');
    main.innerHTML = h.join('');
    if ($('#drillMiss')) $('#drillMiss').onclick = function () { startPractice({ concepts: missed.filter(E.hasPracticeContent), n: Math.max(6, Math.min(20, missed.length * 2)) }, 'Missed-concept practice'); };
  }

  // ---------------- Review ----------------
  function pReview() {
    var plan = E.reviewPlan(), h = [banner(), '<h1>Review queue</h1><p class="lede">Built from your record: high-confidence misses first, then mock misses, recent misses, spaced reviews, old-lab signals, and unfinished concepts.</p>'];
    var urgent = plan.filter(function (p) { return p.why !== 'new'; });
    h.push('<div class="row"><button class="btn pri" id="go15"' + (plan.length ? '' : ' disabled') + '>Start review (15)</button></div>');
    if (!urgent.length) h.push('<p class="muted">No misses or due reviews yet. New concepts are listed below.</p>');
    h.push('<table class="t"><thead><tr><th>Concept</th><th>Section</th><th>Why</th><th>Record</th></tr></thead><tbody>' + plan.slice(0, 80).map(function (p) { var sec = secById(L.CONCEPTS[p.c].sec); return '<tr><td>' + esc(L.CONCEPTS[p.c].name) + '</td><td class="small"><a href="#guide/' + sec.id + '">' + esc(sec.n) + '</a></td><td><span class="badge why-' + p.why + '">' + esc(p.label) + '</span>' + (p.s.prior && p.s.prior.mastered ? ' <span class="badge">old lab: marked mastered</span>' : '') + '</td><td class="small">' + (p.s.att ? p.s.ok + '/' + p.s.att : 'n/a') + '</td></tr>'; }).join('') + '</tbody></table>');
    main.innerHTML = h.join('');
    $('#go15').onclick = startReview;
  }

  // ---------------- Boss ----------------
  function pBoss() {
    var s = S.load(), h = [banner(), '<h1>Boss drills</h1><p class="lede">Fixed, integrative drills of 25+ questions with feedback after each answer. Most questions combine ideas or apply them to a new diagram or scenario. Only a completed run can set a best score; retrying misses runs as ordinary practice and never changes the best.</p><div class="bossgrid">'];
    L.BOSSES.forEach(function (b) {
      var rec = s.boss[b.id], n = (b.refs || []).length + (b.gens || []).reduce(function (a, g) { return a + g[1]; }, 0) + (b.cases || []).reduce(function (a, c) { var cs = E.caseById(c); return a + (cs ? cs.items.length : 0); }, 0);
      h.push('<article class="card boss"><h2>' + esc(b.title) + '</h2><p>' + esc(b.blurb) + '</p><p class="small muted">' + n + ' questions · pass target ' + Math.round(b.pass * 100) + '% (design choice)</p>' +
        '<p class="small">Best: <b>' + (rec && rec.best !== null ? Math.round(rec.best * 100) + '%' : 'n/a') + '</b>' + (rec ? ' · runs: ' + rec.runs.map(function (r) { return r.score + '/' + r.total + (r.complete ? '' : '*'); }).join(', ') : '') + '</p><button class="btn pri" data-boss="' + b.id + '">Start</button></article>');
    });
    h.push('</div><p class="small muted">* incomplete run.</p>');
    main.innerHTML = h.join('');
    main.querySelectorAll('[data-boss]').forEach(function (btn) { btn.onclick = function () { var b = L.BOSSES.filter(function (x) { return x.id === btn.getAttribute('data-boss'); })[0]; if (S.load().session && !confirm('Replace the session in progress?')) return; E.newSession('boss', 'Boss: ' + b.title, E.bossRefs(b.id), { noRetry: true, bossId: b.id, back: 'boss' }); go('session'); }; });
  }

  // ---------------- Mock exams ----------------
  var timerH = null;
  function pMock(args) {
    clearInterval(timerH);
    if (args[0] === 'take') return mockTake();
    if (args[0] === 'result') return mockResult(args[1], args[2]);
    return go('exam1');
  }
  function mockTake() {
    var s = S.load(), m = s.mockActive; if (!m) { go('mock'); return; }
    var i = Math.max(0, Math.min(m.cur || 0, m.refs.length - 1)), it = E.resolve(m.refs[i]);
    var sec = m.sections.filter(function (x) { return i >= x.start && i < x.start + x.n; })[0];
    var answered = Object.keys(m.answers).length;
    var h = ['<div class="sesshead"><div><b>' + esc(m.title) + '</b> <span class="small muted">· ' + esc(sec.title) + ' · question ' + (i + 1) + ' of ' + m.refs.length + '</span></div><div class="row"><span class="timer" id="timer"></span><button class="btn small" id="flag">' + (m.flags[i] ? 'Unflag' : 'Flag') + '</button></div></div>'];
    h.push('<div class="mocknav">' + m.sections.map(function (x) { var cells = ''; for (var k = x.start; k < x.start + x.n; k++) cells += '<button type="button" class="' + (m.answers[k] !== undefined ? 'ans' : '') + (m.flags[k] ? ' flg' : '') + (k === i ? ' cur' : '') + '" data-q="' + k + '" aria-label="Question ' + (k + 1) + (m.answers[k] !== undefined ? ', answered' : ', unanswered') + (m.flags[k] ? ', flagged' : '') + '">' + (k + 1) + '</button>'; return '<div class="navsec"><span class="small">' + esc(x.title) + '</span><div class="cells">' + cells + '</div></div>'; }).join('') + '</div>');
    h.push('<div class="infobox small">Feedback is hidden until you submit the whole mock. Answers save automatically; you can close the tab and resume.</div><div id="host"></div>');
    h.push('<div class="row nextrow"><button class="btn" id="prev"' + (i === 0 ? ' disabled' : '') + '>← Previous</button><button class="btn" id="next"' + (i === m.refs.length - 1 ? ' disabled' : '') + '>Next →</button><button class="btn ghost" id="clear">Clear answer</button><button class="btn pri" id="submit">Submit mock (' + answered + '/' + m.refs.length + ' answered)</button></div>');
    main.innerHTML = h.join('');
    var host = $('#host');
    var ui = IU.render(host, it, { mode: 'mock', header: 'Q' + (i + 1), order: m.orders[i], rights: m.orders[i + 'r'], response: m.answers[i],
      onChange: function (r) { var st2 = S.load(), mm = st2.mockActive; if (!mm) return; if (!E.hasResponse(it, r)) delete mm.answers[i]; else mm.answers[i] = U.clone(r); S.save(); var cell = main.querySelector('[data-q="' + i + '"]'); if (cell) cell.classList.toggle('ans', mm.answers[i] !== undefined); $('#submit').textContent = 'Submit mock (' + Object.keys(mm.answers).length + '/' + mm.refs.length + ' answered)'; } });
    m.orders[i] = ui.order; if (ui.rights) m.orders[i + 'r'] = ui.rights; S.save();
    function goQ(k) { var st2 = S.load(); st2.mockActive.cur = k; S.save(); mockTake(); window.scrollTo(0, 0); }
    main.querySelectorAll('[data-q]').forEach(function (b) { b.onclick = function () { goQ(+b.getAttribute('data-q')); }; });
    $('#prev').onclick = function () { goQ(i - 1); }; $('#next').onclick = function () { goQ(i + 1); };
    $('#flag').onclick = function () { var st2 = S.load(); st2.mockActive.flags[i] = !st2.mockActive.flags[i]; S.save(); mockTake(); };
    $('#clear').onclick = function () { var st2 = S.load(); delete st2.mockActive.answers[i]; delete st2.mockActive.orders[i]; S.save(); mockTake(); };
    $('#submit').onclick = function () {
      var st2 = S.load(), mm = st2.mockActive, blanks = mm.refs.length - Object.keys(mm.answers).length, fl = Object.keys(mm.flags).filter(function (k) { return mm.flags[k]; }).length;
      if (!confirm('Submit now?' + (blanks ? '\n' + blanks + ' question(s) unanswered will be scored wrong.' : '') + (fl ? '\n' + fl + ' flagged.' : '') + '\nFeedback appears only after submission.')) return;
      clearInterval(timerH); var rec = E.submitMock(); go('mock/result/' + rec.id);
    };
    function tick() { var el = $('#timer'); if (!el) return clearInterval(timerH); var used = Math.floor((Date.now() - m.started) / 1000), left = m.minutes * 60 - used; el.textContent = (left >= 0 ? Math.floor(left / 60) + ':' + ('0' + left % 60).slice(-2) + ' left' : 'over by ' + Math.floor(-left / 60) + ' min'); el.classList.toggle('late', left < 0); }
    tick(); timerH = setInterval(tick, 1000);
    document.onkeydown = function (e) { if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return; if (host._keys) host._keys(e); };
  }
  function mockResult(id, qi) {
    var s = S.load(), m = s.mocks.filter(function (x) { return x.id === id; })[0]; if (!m) { go('mock'); return; }
    var items = m.items.filter(function (x) { return !x.meta; });
    var h = ['<div class="card"><h1>' + esc(m.title) + ' results</h1><p class="big">' + m.score + ' / ' + m.total + ' (' + U.pct(m.score, m.total) + '%)</p><p class="small muted">Time used: ' + Math.round((m.elapsed || 0) / 60000) + ' min. This practice score is not a prediction of your exam grade.</p>'];
    h.push('<div class="bars">' + Object.keys(m.bySec).map(function (k) { var x = m.bySec[k]; return '<div class="barrow"><span>' + esc(x.title) + '</span><div class="b"><i style="width:' + U.pct(x.ok, x.n) + '%"></i></div><span>' + x.ok + '/' + x.n + '</span></div>'; }).join('') + '</div>');
    h.push('<h3>By chapter</h3><div class="bars">' + Object.keys(m.byCh).sort().map(function (k) { var x = m.byCh[k]; return '<div class="barrow"><span>' + esc(L.CHAPTERS[k] ? L.CHAPTERS[k].short : 'Ch ' + k) + '</span><div class="b"><i style="width:' + U.pct(x.ok, x.n) + '%"></i></div><span>' + x.ok + '/' + x.n + '</span></div>'; }).join('') + '</div>');
    var weak = Object.keys(m.byCon).filter(function (c) { return m.byCon[c].ok < m.byCon[c].n; });
    h.push('<h3>Remediation</h3>' + (weak.length ? '<p>' + weak.length + ' concepts missed. They are now at the top of your <a href="#review">review queue</a>.</p><div class="row"><button class="btn pri" id="remed">Practice missed concepts</button></div>' : '<p>No misses.</p>') + '</div>');
    h.push('<div class="card"><h2>Question-by-question review</h2><div class="mocknav"><div class="cells">' + items.map(function (x, k) { return '<button type="button" class="' + (x.ok ? 'r-ok' : 'r-no') + (String(k) === qi ? ' cur' : '') + '" data-rq="' + k + '" aria-label="Question ' + (k + 1) + (x.ok ? ' correct' : ' incorrect') + '">' + (k + 1) + '</button>'; }).join('') + '</div></div><div id="rhost"></div></div>');
    main.innerHTML = h.join('');
    if ($('#remed')) $('#remed').onclick = function () { startPractice({ concepts: weak.filter(E.hasPracticeContent), n: Math.min(24, Math.max(8, weak.length * 2)) }, 'Mock remediation'); };
    function show(k) {
      var x = items[k], it = E.resolve(x.ref), host = $('#rhost');
      IU.render(host, it, { mode: 'review', locked: true, header: 'Q' + (k + 1) + ' · ' + esc((L.CONCEPTS[it.c] || {}).name || ''), order: m.orders[k], rights: m.orders[k + 'r'], response: x.r === null ? undefined : x.r, graded: E.grade(it, x.r === null ? undefined : x.r) });
      main.querySelectorAll('[data-rq]').forEach(function (b) { b.classList.toggle('cur', +b.getAttribute('data-rq') === k); });
      wireZoom();
    }
    main.querySelectorAll('[data-rq]').forEach(function (b) { b.onclick = function () { show(+b.getAttribute('data-rq')); }; });
    var first = qi !== undefined ? +qi : items.findIndex(function (x) { return !x.ok; }); show(first >= 0 ? first : 0);
  }

  // ---------------- Progress ----------------
  function pProgress() {
    var s = S.load(), st = E.conceptStats(), h = [banner(), '<h1>Progress</h1>'];
    var cal = { l: [0, 0], m: [0, 0], h: [0, 0] };
    s.attempts.forEach(function (a) { if (a.m !== 'mock' && cal[a.cf]) { cal[a.cf][1]++; if (a.ok) cal[a.cf][0]++; } });
    h.push('<div class="card"><h2>Confidence calibration</h2><div class="bars">' + [['l', 'Low'], ['m', 'Medium'], ['h', 'High']].map(function (x) { var c = cal[x[0]]; return '<div class="barrow"><span>' + x[1] + '</span><div class="b"><i style="width:' + U.pct(c[0], c[1]) + '%"></i></div><span>' + (c[1] ? U.pct(c[0], c[1]) + '% of ' + c[1] : 'n/a') + '</span></div>'; }).join('') + '</div><p class="small muted">Well calibrated: high-confidence accuracy near 100%, low-confidence noticeably lower.</p></div>');
    if (s.legacy) h.push('<div class="infobox small">Old-lab history imported ' + U.fmtDate(s.legacy.imported) + ' (' + esc((s.legacy.sources || []).join(', ')) + '): ' + s.legacy.mapped + ' mappings. Shown as "old lab" badges; it does not grant v3 mastery.</div>');
    for (var ch = 1; ch <= 6; ch++) {
      h.push('<details class="card" open><summary><b>' + esc(L.CHAPTERS[ch].name) + '</b></summary><table class="t"><tr><th>Concept</th><th>Status</th><th>Right/tries</th><th>Next review</th></tr>');
      secsOfCh(ch).forEach(function (sec) { conceptsOfSec(sec.id).filter(E.hasPracticeContent).forEach(function (c) { var x = st[c]; h.push('<tr><td>' + esc(L.CONCEPTS[c].name) + ' <span class="small muted">' + esc(sec.n) + '</span>' + (x.prior ? ' <span class="badge" title="' + esc('Old lab: ' + x.prior.ok + '/' + x.prior.att + (x.prior.mastered ? ', marked mastered' : '')) + '">old lab</span>' : '') + (x.mockMiss ? ' <span class="badge st-shaky">exam review miss</span>' : '') + '</td><td>' + statusBadge(x.status) + '</td><td>' + (x.att ? x.ok + '/' + x.att : 'n/a') + '</td><td class="small">' + (x.att ? (x.isDue ? 'due now' : x.due) : 'n/a') + '</td></tr>'); }); });
      h.push('</table></details>');
    }
    var bk = Object.keys(s.boss);
    if (bk.length) { h.push('<div class="card"><h2>Boss history</h2><table class="t"><tr><th>Boss</th><th>Best (complete runs only)</th><th>Runs</th></tr>'); bk.forEach(function (k) { var b = L.BOSSES.filter(function (x) { return x.id === k; })[0]; h.push('<tr><td>' + esc(b ? b.title : k) + '</td><td>' + (s.boss[k].best === null ? 'n/a' : Math.round(s.boss[k].best * 100) + '%') + '</td><td class="small">' + s.boss[k].runs.map(function (r) { return r.score + '/' + r.total + (r.complete ? '' : ' (incomplete)'); }).join(', ') + '</td></tr>'); }); h.push('</table></div>'); }
    main.innerHTML = h.join('');
  }

  // ---------------- Evidence ----------------
  function pEvidence() {
    var h = [banner(), '<h1>Evidence and limits</h1><p class="lede">What this lab knows, where it came from, and what it does not know. No prior-semester exams, professor profile, or exam predictions were used.</p>'];
    h.push('<div class="card"><h2>Evidence tiers</h2><dl class="tiers">' + [1, 2, 3, 4].map(function (k) { return '<dt>' + IU.tierBadge(k) + ' ' + esc(L.TIERS[k].name) + '</dt><dd>' + esc(L.TIERS[k].desc) + '</dd>'; }).join('') + '</dl></div>');
    h.push('<div class="card"><h2>Exam 1: what is established</h2>' + examFacts() + '</div>');
    h.push('<div class="card"><h2>Coverage by chapter</h2><table class="t"><tr><th>Chapter</th><th>Current-course evidence used</th><th>Limits</th></tr>' + (L.COVERAGE || []).map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td class="small">' + r[1] + '</td><td class="small">' + r[2] + '</td></tr>'; }).join('') + '</table></div>');
    h.push('<div class="card"><h2>Conflicts and caveats</h2><ul>' + (L.CONFLICTS || []).map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>');
    var counts = {}; E.itemsFor(function () { return true; }).forEach(function (it) { (it.s || []).forEach(function (c) { var b = L.srcParse(c).base; counts[b] = (counts[b] || 0) + 1; }); });
    h.push('<div class="card"><h2>Source ledger (runtime)</h2><table class="t"><tr><th>Code</th><th>Source</th><th>Tier</th><th>Items citing</th></tr>' + Object.keys(L.SOURCES).map(function (k) { var s = L.SOURCES[k]; return '<tr><td><code>' + k + '</code></td><td>' + esc(s.t) + '<br><span class="tiny muted">' + esc(s.f) + (s.note ? ': ' + esc(s.note) : '') + '</span></td><td>' + IU.tierBadge(s.tier) + '</td><td>' + (counts[k] || 0) + '</td></tr>'; }).join('') + '</table><p class="small muted">The full review ledger (what was read, how deeply, and how it shaped the lab) is in <code>docs/SOURCE_LEDGER.md</code>.</p></div>');
    main.innerHTML = h.join('');
  }

  // ---------------- Data ----------------
  function pData() {
    var s = S.load(), leg = S.readLegacyInBrowser(), h = [banner(), '<h1>Data</h1>'];
    h.push('<div class="card"><h2>Export</h2><p>Progress lives only in this browser (key <code>' + esc(S.KEY) + '</code>). Export a backup before clearing browser data or switching browsers.</p><div class="row"><button class="btn pri" id="exp">Download backup (.json)</button><button class="btn" id="expCopy">Copy to clipboard</button></div><p class="small muted">' + s.attempts.length + ' attempts · ' + s.mocks.length + ' old-format mocks · ' + s.examRuns.length + ' Exam 1 runs · ' + Object.keys(s.boss).length + ' Boss records.</p></div>');
    h.push('<div class="card"><h2>Import</h2><p>Accepts a v3 export (merged without deleting anything) or an old-lab backup file (<code>geol1001-progress-backup-v1</code>, imported as review signals).</p><input type="file" id="file" aria-label="Choose a backup or old-lab progress file to import" accept=".json,application/json"><details><summary>Or paste JSON</summary><textarea id="paste" rows="5" aria-label="Paste JSON"></textarea><button class="btn" id="pasteGo">Import pasted JSON</button></details><p id="impMsg" role="status"></p></div>');
    h.push('<div class="card"><h2>Old lab (v1) in this browser</h2>' + (leg ? '<p>Found old keys: ' + (leg.guided ? '<code>' + esc(CFG.legacyKeys.guided) + '</code> (' + Object.keys(leg.guided.concepts || {}).length + ' concepts) ' : '') + (leg.drills ? '<code>' + esc(CFG.legacyKeys.drills) + '</code>' : '') + '. They are read, never modified.</p><button class="btn" id="impLeg2">Import as review signals</button>' : '<p class="muted">No old-lab progress is visible from this page\'s browser origin. If you have a backup file from the old lab, import it above.</p>') + '</div>');
    h.push('<div class="card danger"><h2>Reset v3 progress</h2><p>Deletes this lab\'s progress in this browser only. The old lab\'s keys are untouched.</p><button class="btn warnbtn" id="reset">Reset v3 progress</button></div>');
    main.innerHTML = h.join('');
    $('#exp').onclick = function () { U.download('geol1001-lab-v3-progress-' + U.todayKey() + '.json', S.exportJSON()); toast('Backup downloaded.'); };
    $('#expCopy').onclick = function () { try { navigator.clipboard.writeText(S.exportJSON()).then(function () { toast('Copied.'); }, function () { toast('Clipboard blocked; use Download.'); }); } catch (e) { toast('Clipboard blocked; use Download.'); } };
    function doImport(txt) { var r = S.importText(txt); $('#impMsg').textContent = r.message; $('#impMsg').className = r.ok ? 'okc' : 'noc'; }
    $('#file').onchange = function () { var f = this.files[0]; if (!f) return; var rd = new FileReader(); rd.onload = function () { doImport(rd.result); }; rd.readAsText(f); };
    $('#pasteGo').onclick = function () { doImport($('#paste').value); };
    if ($('#impLeg2')) $('#impLeg2').onclick = function () { var r = S.importLegacyFromBrowser(); toast(r.message); };
    $('#reset').onclick = function () { if (confirm('Delete ALL v3 progress in this browser?') && confirm('Really delete? Export first if you want a copy.')) { S.reset(); toast('v3 progress reset.'); route(); } };
  }

  function boot() {
    main = document.getElementById('main');
    E.build();
    S.load();
    document.getElementById('zoomclose').onclick = function () { var d = $('#zoomdlg'); if (d.close) d.close(); else d.removeAttribute('open'); };
    $('#zoomdlg').addEventListener('click', function (e) { if (e.target.id === 'zoomdlg') { if (this.close) this.close(); } });
    window.addEventListener('hashchange', route);
    route();
  }
  L.app = { boot: boot, route: route, go: go, startPractice: startPractice };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})(window);
