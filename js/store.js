/* Browser-local progress with versioned export/import and a read-only legacy bridge.
   The old lab's keys are never written or cleared by this app. */
(function (root) {
  'use strict';
  var L = root.L = root.L || {}, KEY = L.CONFIG.storageKey, SCHEMA = 3;
  var mem = null, storageOK = true, lastError = '';
  function blank() {
    return { app: L.CONFIG.id, schema: SCHEMA, created: Date.now(), updated: Date.now(), attempts: [], mocks: [], mockActive: null,
      examRuns: [], examActive: null, masteryCredits: {}, sessionHistory: [], mockArchived: [], session: null, sessionsByExam: {}, boss: {}, guideRead: {}, teach: {}, legacy: null, settings: { mockMinutes: 80, activeExam: 'exam1' } };
  }
  function get(k) { try { return root.localStorage ? root.localStorage.getItem(k) : null; } catch (e) { storageOK = false; lastError = String(e); return null; } }
  function set(k, v) { try { if (!root.localStorage) throw Error('localStorage unavailable'); root.localStorage.setItem(k, v); storageOK = true; return true; } catch (e) { storageOK = false; lastError = String(e); return false; } }
  function normalize(x) {
    var b = blank(); if (!x || typeof x !== 'object') return b;
    Object.keys(b).forEach(function (k) { if (x[k] === undefined) x[k] = b[k]; });
    if (!Array.isArray(x.attempts)) x.attempts = [];
    if (!Array.isArray(x.mocks)) x.mocks = [];
    if (!Array.isArray(x.examRuns)) x.examRuns = [];
    if (!Array.isArray(x.sessionHistory)) x.sessionHistory = [];
    if (!Array.isArray(x.mockArchived)) x.mockArchived = [];
    ['boss', 'guideRead', 'teach', 'settings', 'masteryCredits', 'sessionsByExam'].forEach(function (k) { if (!x[k] || typeof x[k] !== 'object') x[k] = b[k]; });
    if(x.session)x.sessionsByExam[x.session.examId||'exam1']=x.session;
    x.schema = SCHEMA; x.app = L.CONFIG.id; return x;
  }
  function load() {
    if (mem) return mem;
    var raw = get(KEY), x = null;
    if (raw) { try { x = JSON.parse(raw); } catch (e) { lastError = 'Saved progress was unreadable JSON; started fresh without deleting it.'; set(KEY + '-corrupt-' + Date.now(), raw); } }
    mem = normalize(x); return mem;
  }
  function save() {
    if (!mem) return false;
    if (L.engine && L.engine.captureMastery) L.engine.captureMastery(mem);
    if(mem.session)mem.sessionsByExam[mem.session.examId||'exam1']=mem.session;
    mem.updated = Date.now();
    // Keep the complete history; storage failures are surfaced instead of silently truncating progress.
    return set(KEY, JSON.stringify(mem));
  }
  function reset() { mem = blank(); return save(); }
  function exportObj() { return { app: L.CONFIG.id, format: 'geol1001-lab-v3-export', schema: SCHEMA, exported: new Date().toISOString(), state: load() }; }
  function exportJSON() { return JSON.stringify(exportObj(), null, 2); }
  function mergeSession(cur,incoming,state){
    if(!cur)return incoming;
    var a=cur.results||[],b=incoming.results||[],conflict=a.some(function(x,i){return b[i]&&JSON.stringify(x)!==JSON.stringify(b[i]);});
    if(conflict){var copy=L.util.clone(incoming);copy.id=incoming.id+'-imported-'+(incoming.updated||incoming.started);copy.importConflict=true;if(!state.sessionHistory.some(function(x){return x.id===copy.id;}))state.sessionHistory.push(copy);return cur;}
    if((incoming.updated||incoming.started)>(cur.updated||cur.started)&&b.length>=a.length)return incoming;
    return cur;
  }
  function mergeInto(into, from) {
    var seen = {}, added = 0;
    into.attempts.forEach(function (a) { seen[a.i + '|' + a.t + '|' + a.c] = 1; });
    (from.attempts || []).forEach(function (a) { var k = a.i + '|' + a.t + '|' + a.c; if (!seen[k]) { into.attempts.push(a); seen[k] = 1; added++; } });
    into.attempts.sort(function (a, b) { return a.t - b.t; });
    var mids = {}; into.mocks.forEach(function (m) { mids[m.id] = 1; });
    (from.mocks || []).forEach(function (m) { if (!mids[m.id]) into.mocks.push(m); });
    into.mocks.sort(function (a, b) { return a.ts - b.ts; });
    Object.keys(from.boss || {}).forEach(function (id) {
      var cur = into.boss[id] || { best: null, runs: [] }, ext = from.boss[id] || {}, ts = {};
      cur.runs.forEach(function (r,i) { ts[r.sessionId || r.ts] = i; });
      (ext.runs || []).forEach(function (r) { var k=r.sessionId||r.ts,at=ts[k];if(at===undefined){ts[k]=cur.runs.length;cur.runs.push(r);}else if((r.answered||0)>(cur.runs[at].answered||0) || (r.complete&&!cur.runs[at].complete))cur.runs[at]=r; });
      cur.best = null; cur.runs.forEach(function (r) { if (r.complete && r.total > 0) cur.best = cur.best === null ? r.score / r.total : Math.max(cur.best, r.score / r.total); });
      into.boss[id] = cur;
    });
    ['guideRead', 'teach'].forEach(function (k) { Object.keys(from[k] || {}).forEach(function (id) { if (!into[k][id]) into[k][id] = from[k][id]; }); });
    // Merge Exam 1 runs by stable run ID. First answers are immutable; keep correction history.
    (from.examRuns || []).forEach(function (incoming) {
      var current = into.examRuns.find(function (r) { return r.id === incoming.id; });
      if (!current) { into.examRuns.push(incoming); return; }
      Object.keys(incoming.answers || {}).forEach(function (id) {
        var ext = incoming.answers[id], cur = current.answers[id];
        if (!cur) { current.answers[id] = ext; return; }
        if (!cur.first && ext.first) cur.first = ext.first;
        else if (cur.first && ext.first && cur.first.at === ext.first.at && !cur.first.grade && ext.first.grade) cur.first.grade = ext.first.grade;
        var attempts = {}; (cur.tries || []).forEach(function (a) { attempts[a.id] = a; });
        (ext.tries || []).forEach(function (a) { if (!attempts[a.id] || (!attempts[a.id].grade && a.grade)) attempts[a.id] = a; });
        // Divergent imported first responses are retained as history, never overwrite the local first.
        if (cur.first && ext.first && cur.first.at !== ext.first.at && JSON.stringify(cur.first.response) !== JSON.stringify(ext.first.response)) attempts['imported-' + ext.first.at] = Object.assign({}, ext.first, { id: 'imported-' + ext.first.at, imported: true });
        cur.tries = Object.keys(attempts).map(function (k) { return attempts[k]; }).sort(function (a,b) { return a.at - b.at; });
        if ((ext.updated || 0) > (cur.updated || 0)) { cur.draft = ext.draft; cur.editing = ext.editing; cur.confidence = ext.confidence || cur.confidence; cur.updated = ext.updated; }
      });
      if ((incoming.updated || 0) > (current.updated || 0)) { current.cur = incoming.cur; current.flags = incoming.flags || current.flags; current.updated = incoming.updated; current.finished = incoming.finished; current.archived = incoming.archived; }
    });
    into.examRuns.sort(function (a,b) { return a.started - b.started; });
    if (!into.examActive && from.examActive && into.examRuns.some(function(r){return r.id===from.examActive && !r.finished && !r.archived;})) into.examActive = from.examActive;
    (from.mockArchived || []).forEach(function(r){ if (!into.mockArchived.some(function(x){return x.id===r.id;})) into.mockArchived.push(r); });
    if (!into.mockActive && from.mockActive && !into.mocks.some(function(m){return m.id===from.mockActive.id;}) && !into.mockArchived.some(function(m){return m.id===from.mockActive.id;})) into.mockActive=from.mockActive;
    Object.keys(from.masteryCredits || {}).forEach(function(c){if(!into.masteryCredits[c] || from.masteryCredits[c]==='earned')into.masteryCredits[c]=from.masteryCredits[c];});
    (from.sessionHistory || []).concat(from.session?[from.session]:[]).forEach(function(r){
      if(into.session && into.session.id===r.id){into.session=mergeSession(into.session,r,into);return;}
      var at=into.sessionHistory.findIndex(function(x){return x.id===r.id;});
      if(at<0)into.sessionHistory.push(r);else into.sessionHistory[at]=mergeSession(into.sessionHistory[at],r,into);
    });
    if(!into.session && from.session){into.session=from.session;into.settings.activeExam=from.session.examId||'exam1';}
    Object.keys(from.sessionsByExam||{}).forEach(function(id){
      var incoming=from.sessionsByExam[id],cur=into.sessionsByExam[id];if(!incoming)return;
      if(!cur){into.sessionsByExam[id]=incoming;return;}
      if(cur.id!==incoming.id){if(!into.sessionHistory.some(function(r){return r.id===incoming.id;}))into.sessionHistory.push(incoming);return;}
      into.sessionsByExam[id]=mergeSession(cur,incoming,into);
    });
    var active=into.settings.activeExam==='exam2'?'exam2':'exam1';
    if(into.session&&into.sessionsByExam[active]&&into.session.id===into.sessionsByExam[active].id)into.session=into.sessionsByExam[active];
    if (from.legacy && !into.legacy) into.legacy = from.legacy;
    return added;
  }
  // Legacy: old lab stored {concepts:{id:{attempts,correct,streak,lastConfidence,needsReview,mastered,misconception}}, modules:{}}
  // under geol1001-guided-progress-v1, and drill best scores under geol1001-study-lab-progress-v1.
  function legacyFromGuided(guided, drills, label) {
    if (!guided || typeof guided !== 'object' || !guided.concepts) return null;
    var map = L.LEGACY_MAP || {}, signal = {}, mapped = 0, unmapped = [];
    Object.keys(guided.concepts).forEach(function (oldId) {
      var st = guided.concepts[oldId] || {}, targets = map[oldId];
      if (!targets) { unmapped.push(oldId); return; }
      targets.forEach(function (c) {
        if (!L.CONCEPTS[c]) return;
        var sg = signal[c] || (signal[c] = { oldIds: [], att: 0, ok: 0, mastered: false, flagged: false });
        sg.oldIds.push(oldId); sg.att += st.attempts || 0; sg.ok += st.correct || 0;
        if (st.mastered) sg.mastered = true;
        if (st.needsReview || st.misconception || (st.attempts && st.correct < st.attempts)) sg.flagged = true;
        mapped++;
      });
    });
    return { imported: Date.now(), sources: [label], signal: signal, oldConcepts: Object.keys(guided.concepts).length, mapped: mapped, unmapped: unmapped, drills: drills || null };
  }
  function parseMaybe(v) { if (v == null) return null; if (typeof v === 'object') return v; try { return JSON.parse(v); } catch (e) { return null; } }
  function importText(text) {
    var d; try { d = JSON.parse(text); } catch (e) { return { ok: false, message: 'That file is not valid JSON. Nothing was changed.' }; }
    var s = load();
    if (d && d.format === 'geol1001-lab-v3-export' && d.state) {
      if (d.app !== L.CONFIG.id) return { ok: false, message: 'This export belongs to a different lab (' + d.app + '). Nothing was changed.' };
      var n = mergeInto(s, normalize(d.state)); save();
      return { ok: true, kind: 'v3', message: 'Merged ' + n + ' new attempts plus Exam 1, mock, and Boss history. Existing records were kept.' };
    }
    var guided = null, drills = null, label = '';
    if (d && d.format === 'geol1001-progress-backup-v1' && d.storage) {
      guided = parseMaybe(d.storage[L.CONFIG.legacyKeys.guided]); drills = parseMaybe(d.storage[L.CONFIG.legacyKeys.drills]);
      label = 'Old-lab backup exported ' + (d.exportedAt || '?');
    } else if (d && d.concepts && d.modules) { guided = d; label = 'Raw old-lab guided record'; }
    if (guided) {
      var lg = legacyFromGuided(guided, drills, label);
      if (!lg) return { ok: false, message: 'The old-lab file had no concept records. Nothing was changed.' };
      s.legacy = lg; save();
      return { ok: true, kind: 'legacy', message: 'Imported ' + lg.oldConcepts + ' old concept records as review signals (' + lg.mapped + ' mapped to v3 concepts). Old "mastered" marks are shown as prior history; v3 mastery must be re-earned under the stricter rule.' };
    }
    return { ok: false, message: 'Unrecognized file. Expected a v3 export or an old-lab backup (geol1001-progress-backup-v1). Nothing was changed.' };
  }
  function readLegacyInBrowser() {
    var g = parseMaybe(get(L.CONFIG.legacyKeys.guided)), dr = parseMaybe(get(L.CONFIG.legacyKeys.drills));
    if (!g && !dr) return null;
    return { guided: g, drills: dr };
  }
  function importLegacyFromBrowser() {
    var x = readLegacyInBrowser(); if (!x || !x.guided) return { ok: false, message: 'No old-lab guided progress was found in this browser origin.' };
    var s = load(), lg = legacyFromGuided(x.guided, x.drills, 'Old lab progress found in this browser');
    if (!lg) return { ok: false, message: 'Old progress had no concept records.' };
    s.legacy = lg; save();
    return { ok: true, message: 'Imported old-lab history as review signals. The old keys were read, not modified.' };
  }
  L.store = { KEY: KEY, load: load, save: save, reset: reset, exportJSON: exportJSON, exportObj: exportObj, importText: importText,
    readLegacyInBrowser: readLegacyInBrowser, importLegacyFromBrowser: importLegacyFromBrowser,
    ok: function () { return storageOK; }, error: function () { return lastError; }, _setMem: function (x) { mem = normalize(x); }, _blank: blank, _normalize: normalize };
})(typeof window !== 'undefined' ? window : globalThis);
