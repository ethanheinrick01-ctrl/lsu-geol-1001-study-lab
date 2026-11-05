#!/usr/bin/env node
/* Question drift check (2026-11-05).
   Catches the failure mode where generated questions slide into authoring voice: caveat clauses
   ("alone", "necessarily", "without assuming"), notes about sources or keys, and stems that grow
   far past the course's own question style. It does NOT lower difficulty: hard courses keep hard
   questions. Difficulty is judged against the course's real questions, never against a generic norm.

   Usage: node drift-check.cjs <labDir> [--config drift-check.json] [--list]
   Config (optional; defaults to <labDir>/drift-check.json):
   {
     "include": "^e2",                 // regex on item id: which authored items to check
     "exclude": "^e2-connect",         // optional regex on item id
     "baseline": {"stemMedian": 15, "qualifierRate": 0.05},  // from the course's REAL questions
     "tolerance": {"stemMedianRatio": 1.35, "qualifierRateDelta": 0.12},
     "allow": ["lipreading alone"],    // exact phrases that are course content, not caveats
     "strictVoice": false,             // true: authoring-voice words are errors, not warnings
     "strictExplanations": false       // true: caveats in explanations are errors too
   }
   Exit 1 when caveat wording or baseline drift is found. */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');

const CAVEAT = /\b(alone|by itself|by themselves|necessarily|uniquely|universal(?:ly)?|without assuming|assum(?:e|es|ed|ing|ption)s?|ignoring|held (?:fixed|constant)|model-dependent|oversimplif\w*|simplified (?:model|curve|course)|qualifi(?:ed|cation)|insufficient|does not (?:by itself )?establish|exactly the same|under the (?:same|applicable|stated) model|in the (?:stated|taught|lecture['’]s|course['’]s) model|silently reconcil\w*|without qualification)\b/i;
const VOICE = /\b(the review(?:['’]s)? (?:mentioned|names|said)|authored|supplied|keyed|answer key|source review|provenance|screenshot|ambiguous key|teaching shorthand)\b/i;
const QUAL = /\b(if|assum\w*|while|but|although|without|same|equal|held|fixed|unless)\b/i;

function loadLab(dir) {
  const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const srcs = [...html.matchAll(/<script[^>]*src="([^"?]+)[^"]*"/g)].map(m => m[1]).filter(s => !/^https?:/.test(s));
  const el = () => new Proxy(function () {}, { get: (t, k) => k === 'style' ? {} : k === 'classList' ? { add() {}, remove() {}, toggle() {}, contains() { return false; } } : k === 'children' || k === 'childNodes' ? [] : k === Symbol.toPrimitive ? () => '' : el(), apply: () => el(), set: () => true });
  const doc = { addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; }, getElementById() { return null; }, createElement: () => el(), createElementNS: () => el(), body: el(), documentElement: el(), head: el() };
  const store = {}, ls = { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; }, key: () => null, length: 0 };
  const noop = () => {};
  const win = { document: doc, localStorage: ls, sessionStorage: ls, navigator: { userAgent: 'node' }, location: { hash: '', href: '', search: '', pathname: '/' }, addEventListener: noop, removeEventListener: noop, setTimeout: noop, clearTimeout: noop, setInterval: noop, requestAnimationFrame: noop, matchMedia: () => ({ matches: false, addEventListener: noop }), history: { replaceState: noop, pushState: noop }, console: { log: noop, warn: noop, error: noop, info: noop }, URL, Blob: function () {}, performance: { now: () => 0 }, getComputedStyle: () => ({}), CustomEvent: function () {}, Event: function () {}, MutationObserver: function () { return { observe: noop, disconnect: noop }; }, dispatchEvent: noop, fetch: () => Promise.reject(new Error('no fetch')) };
  win.window = win; win.self = win; win.globalThis = win;
  const ctx = vm.createContext(win), errs = [];
  for (const s of srcs) {
    const f = path.join(dir, s);
    if (!fs.existsSync(f)) { errs.push('missing ' + s); continue; }
    try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: s, timeout: 10000 }); } catch (e) { errs.push(s + ': ' + String(e.message).slice(0, 90)); }
  }
  return { win, errs };
}

const optText = o => typeof o === 'string' ? o : Array.isArray(o) ? String(o[0] ?? '') : o && typeof o === 'object' ? String(o.t ?? o.text ?? o.label ?? '') : '';
const stemOf = q => q.q ?? q.stem ?? q.question ?? q.prompt;
const optsOf = q => q.o ?? q.choices ?? q.options ?? [];
const explOf = q => [q.x, q.explanation, q.why].filter(v => typeof v === 'string').join(' ');
const strip = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const words = s => strip(s).split(' ').filter(Boolean).length;
const median = a => { if (!a.length) return 0; const b = [...a].sort((x, y) => x - y); return b[b.length >> 1]; };

// Collect every object that looks like a graded question anywhere under window. The latest
// definition of an id wins, which matches how patch files replace items at load time.
function collect(win) {
  const out = new Map(), seen = new Set();
  (function walk(o, d) {
    if (!o || typeof o !== 'object' || seen.has(o) || d > 8) return; seen.add(o);
    if (!Array.isArray(o) && typeof o.id === 'string' && typeof stemOf(o) === 'string' && Array.isArray(optsOf(o))) out.set(o.id, o);
    for (const k of Object.keys(o)) { if (k === 'ITEM_REVISIONS' || k === 'window' || k === 'self' || k === 'globalThis' || k === 'document') continue; let v; try { v = o[k]; } catch { continue; } walk(v, d + 1); }
  })(win, 0);
  return [...out.values()];
}

function main() {
  const args = process.argv.slice(2), dir = path.resolve(args.find(a => !a.startsWith('--')) || '.');
  const ci = args.indexOf('--config'), cfgPath = ci >= 0 ? path.resolve(args[ci + 1]) : path.join(dir, 'drift-check.json');
  const cfg = fs.existsSync(cfgPath) ? JSON.parse(fs.readFileSync(cfgPath, 'utf8')) : {};
  const inc = cfg.include ? new RegExp(cfg.include) : null, exc = cfg.exclude ? new RegExp(cfg.exclude) : null;
  const allow = (cfg.allow || []).map(s => s.toLowerCase());
  const { win, errs } = loadLab(dir);
  const items = collect(win).filter(q => (!inc || inc.test(q.id)) && !(exc && exc.test(q.id)));
  const clean = s => { let t = strip(s).toLowerCase(); allow.forEach(a => { t = t.split(a).join(' '); }); return t; };
  // Stems and answer choices are what the learner reasons with: caveats there are errors.
  // Explanations are read after answering: caveats there are warnings unless strictExplanations.
  const caveats = [], explCaveats = [], voice = [];
  for (const q of items) {
    const asked = clean([stemOf(q), ...optsOf(q).map(optText)].join(' ')), expl = clean(explOf(q));
    const c = asked.match(CAVEAT), e = expl.match(CAVEAT), v = (asked + ' ' + expl).match(VOICE);
    if (c) caveats.push(`${q.id}: "${c[0]}"`);
    else if (e) explCaveats.push(`${q.id}: "${e[0]}"`);
    if (v) voice.push(`${q.id}: "${v[0]}"`);
  }
  const stems = items.map(q => words(stemOf(q))), med = median(stems);
  const qualRate = items.length ? items.filter(q => QUAL.test(strip(stemOf(q)))).length / items.length : 0;
  const problems = [];
  if (caveats.length) problems.push(`${caveats.length} item(s) carry caveat wording in the stem or choices`);
  if (cfg.strictExplanations && explCaveats.length) problems.push(`${explCaveats.length} explanation(s) carry caveat wording`);
  if (cfg.strictVoice && voice.length) problems.push(`${voice.length} item(s) carry authoring-voice wording`);
  const b = cfg.baseline, t = Object.assign({ stemMedianRatio: 1.35, qualifierRateDelta: 0.12 }, cfg.tolerance || {});
  if (b && b.stemMedian && med > b.stemMedian * t.stemMedianRatio) problems.push(`stem median ${med} words exceeds the course baseline ${b.stemMedian} × ${t.stemMedianRatio}`);
  if (b && b.qualifierRate != null && qualRate > b.qualifierRate + t.qualifierRateDelta) problems.push(`qualifier rate ${(qualRate * 100).toFixed(0)}% exceeds the course baseline ${(b.qualifierRate * 100).toFixed(0)}% + ${(t.qualifierRateDelta * 100).toFixed(0)} points`);
  console.log(`drift-check ${path.basename(dir)}: ${items.length} items · stem median ${med} words · qualifier stems ${(qualRate * 100).toFixed(0)}%${b ? ` (baseline ${b.stemMedian ?? '-'} words, ${b.qualifierRate != null ? (b.qualifierRate * 100).toFixed(0) + '%' : '-'})` : ''}`);
  if (errs.length && args.includes('--list')) console.log('load notes:\n  ' + errs.join('\n  '));
  const show = (title, arr) => { if (arr.length) console.log(`${title} (${arr.length}):\n  ` + arr.slice(0, args.includes('--list') ? 1e9 : 25).join('\n  ') + (arr.length > 25 && !args.includes('--list') ? `\n  … ${arr.length - 25} more (--list)` : '')); };
  show('CAVEAT in stem/choices', caveats);
  show(cfg.strictExplanations ? 'CAVEAT in explanation' : 'caveat in explanation (warning)', explCaveats);
  show(cfg.strictVoice ? 'VOICE' : 'voice (warning)', voice);
  if (problems.length) { console.log('FAIL: ' + problems.join('; ')); process.exit(1); }
  console.log('PASS');
}
main();
