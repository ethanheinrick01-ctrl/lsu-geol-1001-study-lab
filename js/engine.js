/* Engine: registry, grading, mastery, review scheduling, sessions, Boss drills, mock exams. No DOM. */
(function (root) {
  'use strict';
  var L = root.L = root.L || {}, U = L.util;
  var BOX_DAYS = [0, 1, 2, 4, 7];
  var FRESH = {}, REG = {}, BY_CONCEPT = {}, CASE_OF = {}, SEC_OF = {};

  // ---------------- Registry ----------------
  function chapterOfSec(secId) { var s = SEC_OF[secId]; return s ? s.ch : 0; }
  function norm(it, extra) {
    var o = U.clone(it); extra = extra || {};
    for (var k in extra) if (o[k] === undefined) o[k] = extra[k];
    var con = L.CONCEPTS[o.c];
    o.sec = o.sec || (con ? con.sec : null);
    o.ch = o.ch || chapterOfSec(o.sec);
    if (o.tier === undefined) { o.tier = L.tierOf ? L.tierOf(o.s) : 2; }
    if (o.t === 'tf') { if (!o.o) o.o = [{ t: 'True', ok: o.a === true, w: (o.tw || [])[0] || '' }, { t: 'False', ok: o.a === false, w: (o.tw || [])[1] || '' }]; o.fixedOrder = true; }
    o.pool = o.pool || 'core';
    return o;
  }
  function build() {
    FRESH = {}; REG = {}; BY_CONCEPT = {}; CASE_OF = {}; SEC_OF = {};
    L.SECTIONS.forEach(function (s) { SEC_OF[s.id] = s; });
    (L.ITEMS || []).forEach(function (it) { var n = norm(it); REG[n.id] = n; });
    (L.CASES || []).forEach(function (cs) {
      cs.items.forEach(function (it, i) { var n = norm(it, { caseId: cs.id, caseIdx: i, ch: cs.ch }); REG[n.id] = n; CASE_OF[n.id] = cs.id; });
    });
    Object.keys(REG).forEach(function (id) { var it = REG[id]; (BY_CONCEPT[it.c] = BY_CONCEPT[it.c] || []).push(id); });
  }
  function resolve(ref) {
    if (!ref) return null;
    if(ref.snapshot)return norm(ref.snapshot);
    if (ref.gen) { var g = L.GEN[ref.gen]; if (!g) return null; var it = g.build(ref.seed, ref.opt || {}); it.id = 'g:' + ref.gen + ':' + ref.seed; it.generated = ref.gen; return norm(it); }
    if(REG[ref.id])return REG[ref.id];
    if(FRESH[ref.id])return FRESH[ref.id];
    if(String(ref.id).indexOf('fresh1-')===0){var runs=L.store.load().examRuns||[];for(var i=0;i<runs.length;i++){var saved=runs[i].freshItems&&runs[i].freshItems[ref.id];if(saved)return FRESH[ref.id]=norm(saved);}}
    return null;
  }
  function refKey(ref) { return ref.gen ? 'g:' + ref.gen + ':' + ref.seed : ref.id; }
  function itemsFor(f) { return Object.keys(REG).map(function (k) { return REG[k]; }).filter(f); }
  function caseById(id) { return (L.CASES || []).filter(function (c) { return c.id === id; })[0]; }

  // ---------------- Grading ----------------
  function gradeFill(it, r) {
    var got = U.normTerm(r); if (!got) return { ok: false, sc: 0, blank: true };
    var accs = (it.acc || []).map(U.normTerm), gs = U.stemPlural(got);
    for (var i = 0; i < accs.length; i++) { if (got === accs[i] || gs === U.stemPlural(accs[i])) return { ok: true, sc: 1 }; }
    for (var j = 0; j < accs.length; j++) {
      var a = accs[j]; if (a.length >= 7 && U.lev(gs, U.stemPlural(a)) <= 1) return { ok: true, sc: 1, spelling: it.acc[j] };
    }
    var near = null; accs.forEach(function (a, k) { if (a.length >= 5 && U.lev(got, a) <= 2) near = it.acc[k]; });
    return { ok: false, sc: 0, near: near };
  }
  function grade(it, r) {
    if (it.t === 'teach') return { ok: null, sc: null };
    if (r === undefined || r === null || r === '') return { ok: false, sc: 0, blank: true };
    switch (it.t) {
      case 'mc': case 'tf': return { ok: !!(it.o[r] && it.o[r].ok), sc: it.o[r] && it.o[r].ok ? 1 : 0 };
      case 'ms': {
        var sel = Array.isArray(r) ? r : [r], want = 0; it.o.forEach(function (c) { if (c.ok) want++; });
        var hit = sel.filter(function (i) { return it.o[i] && it.o[i].ok; }).length, bad = sel.length - hit;
        var ok = hit === want && bad === 0; return { ok: ok, sc: ok ? 1 : Math.max(0, (hit - bad) / want) };
      }
      case 'fill': return gradeFill(it, r);
      case 'num': { var v = parseFloat(String(r).replace(/,/g, '')); if (isNaN(v)) return { ok: false, sc: 0, blank: true }; var okn = Math.abs(v - it.a) <= (it.tol || 0) + 1e-9; return { ok: okn, sc: okn ? 1 : 0 }; }
      case 'match': { var c = 0; it.pairs.forEach(function (p, i) { if (r[i] === p[1]) c++; }); return { ok: c === it.pairs.length, sc: c / it.pairs.length }; }
      case 'order': { var k = 0; it.seq.forEach(function (s, i) { if (r[i] === s) k++; }); return { ok: k === it.seq.length, sc: k / it.seq.length }; }
      case 'parts': { var m = 0; it.parts.forEach(function (p, i) { if (r[i] === p.a) m++; }); return { ok: m === it.parts.length, sc: m / it.parts.length }; }
    }
    return { ok: false, sc: 0 };
  }
  function hasResponse(it, r) {
    if (r === undefined || r === null || r === '') return false;
    if (it.t === 'ms') return r.length > 0;
    if (it.t === 'match' || it.t === 'parts') return r.every(function (x) { return x; });
    if (it.t === 'fill' || it.t === 'num') return String(r).trim() !== '';
    return true;
  }

  // ---------------- Recording + mastery ----------------
  function record(it, ref, r, conf, mode, assisted) {
    var s = L.store.load(), g = grade(it, r);
    if (it.t === 'teach') {
      if (!r || ['got','part','miss'].indexOf(r.self) < 0) return g;
      var hits = Array.isArray(r.rubric) ? r.rubric.filter(Boolean).length : 0;
      g = { ok: r.self === 'got', sc: Array.isArray(r.rubric) && r.rubric.length ? hits / r.rubric.length : r.self === 'got' ? 1 : r.self === 'part' ? 0.5 : 0, self: true };
      s.teach[it.id] = { ts: Date.now(), self: r.self, response: r.response || '', rubric: r.rubric || null };
    }
    var key = ref ? refKey(ref) : it.id;
    var a = { i: key, root: it.masteryRoot || key, c: it.c, ok: !!g.ok, sc: Math.round((g.sc || 0) * 100) / 100, cf: conf || 'm', m: mode || 'practice', t: Date.now() };
    if (it.t === 'teach') { a.self = true; a.response = r.response || ''; a.rubric = r.rubric || null; s.teach[it.id].ts = a.t; }
    if (assisted) a.h = 1;
    s.attempts.push(a); L.store.save();
    return g;
  }
  // One read model for every dashboard, regardless of the exercise's storage location.
  function allAttempts(state) {
    state = state || L.store.load();
    var out = (state.attempts || []).map(function(a){ return Object.assign({}, a); });
    (state.examRuns || []).forEach(function(r){ Object.keys(r.answers || {}).forEach(function(id){
      var entry=r.answers[id], it=resolve({id:id}); if(!entry || !it)return;
      [entry.first].concat(entry.tries || []).forEach(function(x, n){
        if(!x || !x.grade)return;
        out.push({i:id,root:it.masteryRoot||id,c:it.c,ok:!!x.grade.ok,sc:x.grade.sc||0,cf:x.cf||'m',m:'exam1',t:x.at||r.started||0,
          self:!!x.self,h:x.assisted?1:0,correction:n>0,run:r.id,attemptId:x.id});
      });
    }); });
    // Older rubric self-checks were saved separately. Include the recorded rating, never infer a grade from prose.
    Object.keys(state.teach || {}).forEach(function(id){
      var x=state.teach[id], it=resolve({id:id});
      if(!it || !x || ['got','part','miss'].indexOf(x.self)<0 || out.some(function(a){return a.i===id && a.self && a.t===x.ts;}))return;
      out.push({i:id,c:it.c,ok:x.self==='got',sc:x.self==='got'?1:x.self==='part'?0.5:0,cf:'m',m:'teach',t:x.ts||0,self:true});
    });
    return out.sort(function(a,b){return (a.t||0)-(b.t||0);});
  }
  function conceptStats(state, ignoreCredits) {
    state=state||L.store.load();var out={},today=U.todayKey();
    Object.keys(L.CONCEPTS).forEach(function(c){out[c]={id:c,att:0,ok:0,autoAtt:0,selfAtt:0,hist:[],box:0,last:0,status:'new',rawStatus:'new',mockMiss:false,mockSeen:false,reviewOpen:false,highConfidenceMiss:false,prior:null,due:today};});
    allAttempts(state).forEach(function(a){var st=out[a.c];if(!st)return;st.att++;if(a.ok)st.ok++;if(a.self)st.selfAtt++;else st.autoAtt++;st.hist.push(a);st.last=Math.max(st.last,a.t||0);});
    Object.keys(out).forEach(function(c){
      var st=out[c],h=st.hist,roots={},autoRoots={},earned=false,autoEarned=false,lastMiss=-1;
      if(state.legacy && state.legacy.signal && state.legacy.signal[c])st.prior=state.legacy.signal[c];
      h.forEach(function(a,i){
        if(!a.ok)lastMiss=i;
        if(a.ok && !a.h){
          roots[a.root||a.i]=true;if(!a.self)autoRoots[a.root||a.i]=true;
          if(Object.keys(roots).length>=2 && a.cf!=='l')earned=true;
          if(Object.keys(autoRoots).length>=2 && a.cf!=='l' && !a.self)autoEarned=true;
          st.box=a.cf==='l'?Math.max(st.box,1):Math.min(st.box+1,4);
        }
      });
      var after=lastMiss>=0?h.slice(lastMiss+1).filter(function(a){return a.ok&&!a.h;}):[],clearRoots={};
      after.forEach(function(a){clearRoots[a.root||a.i]=true;});
      var cleared=Object.keys(clearRoots).length>=2 && after.length && after[after.length-1].cf!=='l';
      st.reviewOpen=lastMiss>=0&&!cleared;
      st.highConfidenceMiss=st.reviewOpen&&h.some(function(a){return !a.ok&&a.cf==='h' && !isClearedAfter(h,a);});
      st.mockSeen=h.some(function(a){return a.m==='mock'||a.m==='exam1';});
      st.mockMiss=st.reviewOpen&&h.some(function(a){return !a.ok&&(a.m==='mock'||a.m==='exam1')&&!isClearedAfter(h,a);});
      st.lastMiss=lastMiss>=0?h[lastMiss]:null;
      st.rawStatus=!h.length?'new':st.highConfidenceMiss?'misconception':st.reviewOpen?'shaky':earned?'mastered':'learning';
      st.status=earned || (!ignoreCredits && state.masteryCredits && state.masteryCredits[c])?'mastered':st.rawStatus;
      st.masterySource=autoEarned?'earned':earned?'self':state.masteryCredits&&state.masteryCredits[c]||null;
      st.independentCorrect=Object.keys(roots).length;
      st.reviewCorrect=Object.keys(clearRoots).length;
      st.earned=earned;st.due=st.last?U.addDays(U.todayKey(new Date(st.last)),BOX_DAYS[st.box]):today;st.isDue=!!st.last&&st.due<=today;
    });return out;
  }
  function masteryNote(st) {
    if(st.status==='mastered')return 'Mastery earned'+(st.masterySource==='self'?' (includes self-assessment)':'')+(st.reviewOpen?' · recent miss needs review.':'.');
    if(st.independentCorrect>=2)return 'Two different questions correct without hints. Finish with a correct answer at medium/high confidence.';
    if(st.independentCorrect===1)return '1/2 different questions correct without hints. Get another right at medium/high confidence.';
    return 'Get two different questions right without hints; use medium/high confidence on the second.';
  }
  function practicePriority(st) { return st.reviewOpen?0:st.status!=='mastered'?1:2; }
  function isClearedAfter(history,miss){
    var roots={},after=history.slice(history.indexOf(miss)+1);
    // A later wrong answer starts a fresh review requirement.
    var latestWrong=-1;after.forEach(function(a,i){if(!a.ok)latestWrong=i;});
    after=after.slice(latestWrong+1).filter(function(a){return a.ok&&!a.h;});
    after.forEach(function(a){roots[a.root||a.i]=true;});
    return Object.keys(roots).length>=2 && after.length>0 && after[after.length-1].cf!=='l';
  }
  function captureMastery(state){
    state.masteryCredits=state.masteryCredits||{};
    var stats=conceptStats(state,true);
    Object.keys(stats).forEach(function(c){if(stats[c].earned && (!state.masteryCredits[c] || stats[c].masterySource==='earned'))state.masteryCredits[c]=stats[c].masterySource;});
  }
  var RANK = { misconception: 0, mock: 1, shaky: 2, due: 3, prior: 4, learning: 5, new: 6 };
  var WHY = { misconception: 'High-confidence miss', mock: 'Missed in exam review', shaky: 'Last attempt wrong', due: 'Due for spaced review', prior: 'Old-lab history', learning: 'Needs a second correct answer', new: 'Not yet attempted' };
  function reviewPlan(limit) {
    var st = conceptStats(), rows = [];
    Object.keys(st).forEach(function (c) {
      var s = st[c], why = null; if (!hasPracticeContent(c) || (L.examScope && L.examScope.conceptOwner(c)!==L.examScope.current())) return;
      if (s.highConfidenceMiss) why = 'misconception';
      else if (s.mockMiss) why = 'mock';
      else if (s.reviewOpen) why = 'shaky';
      else if (s.att && s.isDue) why = 'due';
      else if (s.prior && s.prior.flagged && s.status !== 'mastered') why = 'prior';
      else if (s.status === 'learning') why = 'learning';
      else if (!s.att) why = 'new';
      if (why) rows.push({ c: c, why: why, label: WHY[why], s: s });
    });
    rows.sort(function (a, b) { return RANK[a.why] - RANK[b.why] || Number(!(L.EXAM_CONCEPT_TOPICS && L.EXAM_CONCEPT_TOPICS[a.c])) - Number(!(L.EXAM_CONCEPT_TOPICS && L.EXAM_CONCEPT_TOPICS[b.c])) || (a.s.last || 0) - (b.s.last || 0); });
    return limit ? rows.slice(0, limit) : rows;
  }
  function practiceEligible(id) { var it = REG[id]; return !!it && it.t !== 'teach' && !CASE_OF[id] && it.pool !== 'boss' && it.pool !== 'exam1'; }
  function hasPracticeContent(c) { return (BY_CONCEPT[c] || []).some(practiceEligible) || !!(L.GEN_FOR[c] && L.GEN_FOR[c].length); }
  function pickFor(c, exclude, allowBoss) {
    exclude = exclude || {};
    var s = L.store.load(), lastSeen = {}, lastOk = {};
    allAttempts(s).forEach(function (a) { lastSeen[a.i] = a.t; lastOk[a.i] = a.ok; });
    var ids = (BY_CONCEPT[c] || []).filter(function (id) { var it = REG[id]; return it && it.t !== 'teach' && !CASE_OF[id] && (allowBoss || it.pool !== 'boss') && it.pool !== 'exam1' && !exclude[id]; });
    var cands = ids.map(function (id) { return { ref: { id: id }, score: (lastSeen[id] ? (lastOk[id] ? 3 : 1.2) : 0) * 1e13 + (lastSeen[id] || 0) + Math.random() * 1e9 }; });
    (L.GEN_FOR[c] || []).forEach(function (g) { cands.push({ ref: { gen: g, seed: U.newSeed(), opt: { c: c } }, score: 1.1e13 + Math.random() * 1e12 }); });
    if (!cands.length) return null;
    cands.sort(function (a, b) { return a.score - b.score; });
    return cands[0].ref;
  }

  // ---------------- Sessions ----------------
  function newSession(mode, title, refs, opt) {
    opt = opt || {};
    var sess = { id: 'S' + Date.now() + '-' + Math.random().toString(36).slice(2,7), mode: mode, title: title, queue: refs.map(function (r) {var ref=U.clone(r),it=resolve(r);if(it&&it.examId==='exam2')ref.snapshot=U.clone(it);return { ref: ref, retry: false }; }), idx: 0, results: [],
      retries: 0, started: Date.now(), updated: Date.now(), drafts: {}, confidence: {}, assisted: {}, revealed: {}, bossId: opt.bossId || null, noRetry: !!opt.noRetry, orders: {}, back: opt.back || 'practice' };
    var s = L.store.load(); sess.examId=opt.examId||(L.examScope?L.examScope.current():'exam1'); archiveSession(s,s.session); s.session = sess; L.store.save(); return sess;
  }
  function archiveSession(s,sess){if(!sess)return;var copy=U.clone(sess),at=s.sessionHistory.findIndex(function(x){return x.id===sess.id;});if(at<0)s.sessionHistory.push(copy);else s.sessionHistory[at]=copy;}
  function currentSession() { return L.store.load().session; }
  function endSession() { var s = L.store.load(), sess = s.session; archiveSession(s,sess); if(sess)delete s.sessionsByExam[sess.examId||'exam1'];s.session = null; L.store.save(); return sess; }
  function answerInSession(response, conf, assisted) {
    var s = L.store.load(), sess = s.session; if (!sess) return null;
    var q = sess.queue[sess.idx], it = resolve(q.ref);
    if (sess.results.length > sess.idx) return { grade: grade(it, response), item: it, duplicate: true };
    var g = record(it, q.ref, response, conf, sess.mode, assisted);
    sess = L.store.load().session;
    sess.results.push({ key: refKey(q.ref), c: it.c, ok: g.ok, sc: g.sc, cf: conf, retry: q.retry, t: it.t, h: assisted ? 1 : 0, resp: U.clone(response) });
    if (!sess.noRetry && it.t !== 'teach' && (!g.ok || conf === 'l' || assisted)) {
      var gap = g.ok ? 4 : 2, again = null, ex = {}; ex[it.id] = 1;
      if (q.ref.gen) again = { gen: q.ref.gen, seed: U.newSeed(), opt: q.ref.opt };
      else { var alt = pickFor(it.c, ex); again = alt || { id: it.id }; }
      var already = sess.queue.filter(function (x) { return x.retry && x.c === it.c; }).length;
      if (already < 2) { sess.queue.splice(Math.min(sess.idx + 1 + gap, sess.queue.length), 0, { ref: again, retry: true, c: it.c }); sess.retries++; }
    }
    L.store.save();
    return { grade: g, item: it };
  }
  function advance() { var s = L.store.load(); if (!s.session) return null; s.session.idx++; L.store.save(); return s.session; }
  function practiceRefs(opt) {
    var n = opt.n || 12, concepts = opt.concepts;
    if (!concepts) concepts = Object.keys(L.CONCEPTS).filter(function (c) { var con = L.CONCEPTS[c]; return (!opt.sec || con.sec === opt.sec) && (!opt.ch || chapterOfSec(con.sec) === opt.ch) && (!L.examScope || L.examScope.conceptOwner(c)===(opt.examId||L.examScope.current())) && hasPracticeContent(c); });
    var stats=conceptStats();
    var refs = [], used = {}, pool = U.shuffle(concepts).sort(function(a,b){return practicePriority(stats[a])-practicePriority(stats[b]) || stats[a].att-stats[b].att;}), i = 0, guard = 0;
    while (refs.length < n && guard < n * 8 && pool.length) {
      var c = pool[i % pool.length]; i++; guard++;
      var r = pickFor(c, used); if (!r) continue;
      var k = refKey(r); if (used[k]) continue; used[k] = 1; if (r.id) used[r.id] = 1;
      refs.push(r);
    }
    return refs;
  }
  function reviewRefs(n) {
    var plan = reviewPlan(), refs = [], used = {}, s = L.store.load();
    for (var i = 0; i < plan.length && refs.length < (n || 15); i++) {
      var ex = U.clone(used);
      // after a miss, prefer a different item root than the one missed
      var lastMiss = plan[i].s.lastMiss && plan[i].s.lastMiss.i;
      if (lastMiss && REG[lastMiss]) ex[lastMiss] = 1;
      var r = pickFor(plan[i].c, ex); if (r) { used[refKey(r)] = 1; if (r.id) used[r.id] = 1; refs.push(r); }
    }
    return refs;
  }
  function caseRefs(caseId) { var cs = caseById(caseId); return cs ? cs.items.map(function (it) { return { id: it.id }; }) : []; }
  function bossRefs(bossId) {
    var b = L.BOSSES.filter(function (x) { return x.id === bossId; })[0]; if (!b) return [];
    var loose = (b.refs || []).map(function (id) { return { id: id }; });
    (b.gens || []).forEach(function (g) { for (var i = 0; i < g[1]; i++) loose.push({ gen: g[0], seed: U.newSeed(), opt: g[2] || {} }); });
    var blocks = U.shuffle(loose).map(function (r) { return [r]; });
    (b.cases || []).forEach(function (cid) { blocks.push(caseRefs(cid)); });
    blocks = U.shuffle(blocks);
    return blocks.reduce(function (acc, bl) { return acc.concat(bl); }, []);
  }
  function finishBoss(sess) {
    var s = L.store.load();
    var first = sess.results.filter(function (r) { return !r.retry && r.t !== 'teach'; });
    var assigned = sess.queue.filter(function (q) { return !q.retry; }).length;
    var score = first.filter(function (r) { return r.ok; }).length;
    var complete = assigned > 0 && first.length === assigned;
    var b = s.boss[sess.bossId] || { best: null, runs: [] };
    var run={sessionId:sess.id,ts:Date.now(),score:score,answered:first.length,total:assigned,complete:complete};
    var previous=b.runs.findIndex(function(r){return r.sessionId===sess.id;});
    if(previous<0)b.runs.push(run);else b.runs[previous]=run;
    if (complete) b.best = b.best === null ? score / assigned : Math.max(b.best, score / assigned);
    s.boss[sess.bossId] = b; L.store.save();
    return { score: score, answered: first.length, total: assigned, complete: complete };
  }

  // ---------------- Mock exams (feedback withheld until submission) ----------------
  function mockPools() {
    return {
      mc: itemsFor(function (it) { return it.ch<=6 && (it.t === 'mc' || it.t === 'ms' || it.t === 'tf') && !it.caseId && it.mock !== false && it.pool !== 'design'; }),
      fill: itemsFor(function (it) { return it.ch<=6 && it.t === 'fill' && !it.caseId && it.mock !== false; }),
      cases: (L.CASES || []).filter(function (c) { return c.ch<=6 && c.inv; })
    };
  }
  function chooseSpread(pool, n, used, inMock) {
    // Even spread across chapters 1-6 (a disclosed design choice, not a weighting claim).
    var byCh = {}; pool.forEach(function (it) { (byCh[it.ch] = byCh[it.ch] || []).push(it); });
    var chs = Object.keys(byCh).sort(), out = [], k = 0, guard = 0;
    chs.forEach(function (ch) { byCh[ch] = U.shuffle(byCh[ch]).sort(function (a, b) { return (inMock[a.id] || 0) - (inMock[b.id] || 0); }); });
    var start = Math.floor(Math.random() * chs.length);
    while (out.length < n && guard < n * 20) {
      var ch = chs[(start + k) % chs.length]; k++; guard++;
      var list = byCh[ch]; while (list.length && used[list[0].id]) list.shift();
      // one concept at most twice per section to prevent near-duplicates
      var idx = list.findIndex(function (it) { return out.filter(function (o) { return o.c === it.c; }).length < 2; });
      if (idx >= 0) { var it = list.splice(idx, 1)[0]; used[it.id] = 1; out.push(it); }
    }
    return out;
  }
  function buildMock(key) {
    var bp = L.MOCKS[key]; if (!bp) throw new Error('Unknown mock ' + key);
    var s = L.store.load(), inMock = {}, used = {}, pools = mockPools(), sections = [];
    s.mocks.forEach(function (m) { (m.items || []).forEach(function (x) { inMock[x.id] = (inMock[x.id] || 0) + 1; }); });
    bp.sections.forEach(function (sec) {
      var refs = [];
      if (sec.kind === 'mc' || sec.kind === 'fill') {
        var chosen = chooseSpread(pools[sec.kind], sec.n, used, inMock);
        if (chosen.length < sec.n) throw new Error('Not enough ' + sec.kind + ' items for ' + bp.title + ' (' + chosen.length + '/' + sec.n + ')');
        refs = U.shuffle(chosen).map(function (it) { return { id: it.id }; });
      } else if (sec.kind === 'inv') {
        var cases = U.shuffle(pools.cases).sort(function (a, b) { return (inMock['case:' + a.id] || 0) - (inMock['case:' + b.id] || 0); });
        var pickedCh = {}, picked = [];
        cases.forEach(function (c) { if (picked.length < sec.cases && !pickedCh[c.ch]) { picked.push(c); pickedCh[c.ch] = 1; } });
        cases.forEach(function (c) { if (picked.length < sec.cases && picked.indexOf(c) < 0) picked.push(c); });
        if (picked.length < sec.cases) throw new Error('Not enough investigation cases');
        picked.forEach(function (c) { refs = refs.concat(caseRefs(c.id)); });
      }
      sections.push({ id: sec.id, title: sec.title, kind: sec.kind, start: 0, refs: refs });
    });
    var all = [], pos = 0;
    sections.forEach(function (sc) { sc.start = pos; pos += sc.refs.length; all = all.concat(sc.refs); });
    var m = { id: 'M' + Date.now(), key: key, title: bp.title, started: Date.now(), minutes: bp.minutes, sections: sections.map(function (x) { return { id: x.id, title: x.title, kind: x.kind, start: x.start, n: x.refs.length }; }), refs: all, answers: {}, flags: {}, cur: 0, orders: {} };
    s.mockActive = m; L.store.save(); return m;
  }
  function submitMock() {
    var s = L.store.load(), m = s.mockActive; if (!m) return null;
    var items = [], score = 0, bySec = {}, byCh = {}, byCon = {}, caseSeen = {};
    m.refs.forEach(function (ref, i) {
      var it = resolve(ref), r = m.answers[i], g = grade(it, r);
      var sec = m.sections.filter(function (x) { return i >= x.start && i < x.start + x.n; })[0];
      items.push({ id: refKey(ref), ref: ref, c: it.c, ch: it.ch, sec: sec.id, ok: !!g.ok, sc: g.sc || 0, r: r === undefined ? null : r, blank: r === undefined, spelling: g.spelling || null });
      if (g.ok) score++;
      var b = bySec[sec.id] || (bySec[sec.id] = { ok: 0, n: 0, title: sec.title }); b.n++; if (g.ok) b.ok++;
      var d = byCh[it.ch] || (byCh[it.ch] = { ok: 0, n: 0 }); d.n++; if (g.ok) d.ok++;
      var c = byCon[it.c] || (byCon[it.c] = { ok: 0, n: 0 }); c.n++; if (g.ok) c.ok++;
      if (it.caseId) caseSeen[it.caseId] = 1;
      s.attempts.push({ i: refKey(ref), c: it.c, ok: !!g.ok, sc: g.sc || 0, cf: 'm', m: 'mock', t: Date.now() + i });
    });
    Object.keys(caseSeen).forEach(function (cid) { items.push({ id: 'case:' + cid, meta: true }); });
    var rec = { id: m.id, key: m.key, title: m.title, ts: Date.now(), started: m.started, elapsed: Date.now() - m.started, score: score, total: m.refs.length,
      bySec: bySec, byCh: byCh, byCon: byCon, items: items, orders: m.orders, flags: m.flags, sections: m.sections };
    s.mocks.push(rec); s.mockActive = null; L.store.save();
    return rec;
  }

  L.engine = { build: build, resolve: resolve, refKey: refKey, grade: grade, hasResponse: hasResponse, record: record, conceptStats: conceptStats,
    reviewPlan: reviewPlan, pickFor: pickFor, newSession: newSession, currentSession: currentSession, endSession: endSession,
    answerInSession: answerInSession, advance: advance, practiceRefs: practiceRefs, reviewRefs: reviewRefs, caseRefs: caseRefs, caseById: caseById,
    bossRefs: bossRefs, finishBoss: finishBoss, buildMock: buildMock, submitMock: submitMock, mockPools: mockPools, itemsFor: itemsFor,
    allAttempts: allAttempts, captureMastery: captureMastery, masteryNote: masteryNote, practicePriority: practicePriority, hasPracticeContent: hasPracticeContent, REG: function () { return REG; }, BY_CONCEPT: function () { return BY_CONCEPT; }, CASE_OF: function () { return CASE_OF; }, WHY: WHY };
})(typeof window !== 'undefined' ? window : globalThis);
