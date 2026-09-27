/* Structural validator: node tools/validate.js  (run from the lab folder). Exits non-zero on errors. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
const store = {}; const ctx = { console, Math, Date, JSON, Object, Array, String, Number, parseFloat, parseInt, isNaN, Error,
  localStorage: { getItem: k => store[k] || null, setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
  document: { addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; }, getElementById() { return null; }, createElement() { return { style: {}, setAttribute() {}, appendChild() {}, classList: { add() {}, remove() {} } }; } },
  location: { hash: '' }, addEventListener() {}, setTimeout() {} };
ctx.window = ctx; ctx.globalThis = ctx; vm.createContext(ctx);
for (const s of scripts) { if (s.endsWith('app.js')) continue; vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), ctx, { filename: s }); }
const L = ctx.L, E = L.engine; E.build();
const errs = [], warns = []; const E_ = m => errs.push(m), W = m => warns.push(m);
const REG = E.REG(), ids = Object.keys(REG);
// ids unique
const seen = {}; L.ITEMS.forEach(it => { if (seen[it.id]) E_('duplicate item id ' + it.id); seen[it.id] = 1; });
L.CASES.forEach(cs => cs.items.forEach(it => { if (seen[it.id]) E_('duplicate case item id ' + it.id); seen[it.id] = 1; }));
// concepts, sources, answers
function checkSrc(list, where) { (list || []).forEach(c => { const p = L.srcParse(c); if (!p.src) E_(where + ': unknown source ' + c); }); if (!list || !list.length) E_(where + ': no sources'); }
function checkMedia(m, where) { if (!m) return; if (Array.isArray(m)) return m.forEach(x => checkMedia(x, where));
  if (m.kind === 'img' && !fs.existsSync(path.join(root, m.src))) E_(where + ': missing image ' + m.src);
  if (m.kind === 'svg') { if (!L.MEDIA[m.name]) E_(where + ': unknown svg ' + m.name); else { try { const out = L.MEDIA[m.name](m.spec || {}); if (!/^<svg/.test(out)) E_(where + ': bad svg'); } catch (e) { E_(where + ': svg throws ' + e.message); } } } }
const usedImgs = new Set();
function noteImgs(m) { if (!m) return; if (Array.isArray(m)) return m.forEach(noteImgs); if (m.kind === 'img') usedImgs.add(m.src); }
ids.forEach(id => { const it = REG[id], w = 'item ' + id;
  if (!L.CONCEPTS[it.c]) E_(w + ': unknown concept ' + it.c);
  checkSrc(it.s, w); checkMedia(it.media, w); noteImgs(it.media);
  if (it.t === 'mc' || it.t === 'tf') { const k = it.o.filter(o => o.ok).length; if (k !== 1) E_(w + ': ' + k + ' keyed options'); if (it.t === 'mc' && it.o.length < 3) E_(w + ': <3 options'); it.o.forEach(o => { if (it.t === 'mc' && !o.w) W(w + ': option without rationale: ' + o.t.slice(0, 40)); }); }
  if (it.t === 'ms') { if (!it.o.some(o => o.ok)) E_(w + ': ms no key'); if (!it.o.some(o => !o.ok)) E_(w + ': ms no distractor'); }
  if (it.t === 'fill' && (!it.acc || !it.acc.length)) E_(w + ': fill no answers');
  if (it.t === 'parts') it.parts.forEach(p => { if (p.options.indexOf(p.a) < 0) E_(w + ': parts key not in options ' + p.label); });
  if (it.t === 'match') { const r = it.pairs.map(p => p[1]); if (it.pairs.length < 2) E_(w + ': match too short'); }
  if (it.t === 'num' && typeof it.a !== 'number') E_(w + ': num without answer');
  if (!it.x && it.t !== 'teach') W(w + ': no explanation');
  if (it.mk === 'inv') { const hasMk = JSON.stringify(it.media || '').includes('markers') || !!it.caseId; if (!hasMk) W(w + ': inv item without markers'); }
});
// cards
Object.keys(L.GUIDE).forEach(sec => L.GUIDE[sec].forEach(cd => { checkSrc(cd.src, 'card ' + cd.id); checkMedia(cd.media, 'card ' + cd.id); noteImgs(cd.media); (cd.c || []).forEach(c => { if (!L.CONCEPTS[c]) E_('card ' + cd.id + ' unknown concept ' + c); });
  (cd.html.match(/data-guidegen="(\w+)"/g) || []).forEach(m => { const g = m.split('"')[1]; if (!L.GEN[g]) E_('card ' + cd.id + ' unknown generator ' + g); }); }));
L.SECTIONS.forEach(s => checkSrc(s.src, 'section ' + s.id));
L.CASES.forEach(cs => { checkMedia(cs.media, 'case ' + cs.id); noteImgs(cs.media); if (!cs.items.length) E_('case ' + cs.id + ' empty'); });
// every concept: >=2 practice roots (non-teach, non-boss, non-case) or a generator
const byC = {}; ids.forEach(id => { const it = REG[id]; if (it.t === 'teach' || it.pool === 'boss' || it.caseId) return; (byC[it.c] = byC[it.c] || []).push(id); });
Object.keys(L.CONCEPTS).forEach(c => { const n = (byC[c] || []).length, g = (L.GEN_FOR[c] || []).length; if (n + (g ? 2 : 0) < 2) E_('concept ' + c + ' has only ' + n + ' practice items'); if (!L.GUIDE[L.CONCEPTS[c].sec].some(cd => (cd.c || []).includes(c))) E_('concept ' + c + ' has no guide card'); });
// generators: 300 seeds each, validate
Object.keys(L.GEN).forEach(g => { for (let s = 1; s <= 300; s++) { const concepts = [undefined].concat(Object.keys(L.GEN_FOR).filter(c => L.GEN_FOR[c].includes(g)));
  concepts.forEach(c => { let it; try { it = E.resolve({ gen: g, seed: s * 7919, opt: { c } }); } catch (e) { E_('gen ' + g + ' seed ' + s + ' throws ' + e.message); return; }
    const w = 'gen ' + g + '#' + s; if (!L.CONCEPTS[it.c]) E_(w + ' bad concept');
    if (it.t === 'mc') { const k = it.o.filter(o => o.ok).length; if (k !== 1) E_(w + ' keyed=' + k); const ts = it.o.map(o => o.t); if (new Set(ts).size !== ts.length) E_(w + ' duplicate options ' + ts.join(' | ')); }
    if (it.t === 'order' && new Set(it.seq).size !== it.seq.length) E_(w + ' dup seq');
    checkMedia(it.media, w); if (c && L.GEN_FOR[c] && it.c !== c && !(g === 'pt') && !(g === 'hardness' || g === 'mineralId')) W(w + ' concept mismatch ' + c + '→' + it.c); }); } });
// bosses
L.BOSSES.forEach(b => { const refs = E.bossRefs(b.id); const bo = b.bossOnly.length; const n = refs.length;
  b.refs.forEach(id => { if (!REG[id]) E_('boss ' + b.id + ' unknown ref ' + id); });
  (b.cases || []).forEach(c => { if (!E.caseById(c)) E_('boss ' + b.id + ' unknown case ' + c); });
  if (n < 25) E_('boss ' + b.id + ' only ' + n + ' items'); if (bo / n < 0.4) E_('boss ' + b.id + ' boss-only share ' + (bo / n).toFixed(2));
  if (new Set(refs.map(E.refKey)).size !== n) E_('boss ' + b.id + ' duplicate refs');
  console.log('boss', b.id, 'items', n, 'boss-only', bo, (100 * bo / n).toFixed(0) + '%'); });
// mocks: build each 20 times
Object.keys(L.MOCKS).forEach(k => { for (let i = 0; i < 20; i++) { try { const m = E.buildMock(k); const kinds = {}; m.refs.forEach(r => { const it = E.resolve(r); if (it.pool === 'boss') E_('mock contains boss item'); });
  if (i === 0) { const mc = m.sections[0].n, tot = m.refs.length; console.log('mock', k, 'parts', tot, 'MC share', (100 * mc / tot).toFixed(0) + '%', m.sections.map(s => s.id + ':' + s.n).join(' ')); }
  L.store.load().mockActive = null; } catch (e) { E_('mock ' + k + ' fails: ' + e.message); break; } } });
// longest-option cue rate
let single = 0, longest = 0; ids.forEach(id => { const it = REG[id]; if (it.t !== 'mc') return; single++; const lens = it.o.map(o => o.t.length), mx = Math.max(...lens), key = it.o.findIndex(o => o.ok); if (lens[key] === mx && lens.filter(x => x === mx).length === 1) longest++; });
// counts
const byT = {}; ids.forEach(id => { const t = REG[id].t; byT[t] = (byT[t] || 0) + 1; });
const byCh = {}; ids.forEach(id => { const it = REG[id]; const k = 'ch' + it.ch + (it.pool === 'boss' ? '-boss' : it.caseId ? '-case' : ''); byCh[k] = (byCh[k] || 0) + 1; });
const allImgs = []; (function walk(d) { fs.readdirSync(d).forEach(f => { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else allImgs.push(path.relative(root, p)); }); })(path.join(root, 'assets/img'));
const cssJs = fs.readdirSync(path.join(root, 'js')).join(' ');
const srcText = scripts.map(s => fs.readFileSync(path.join(root, s), 'utf8')).join('\n');
const unused = allImgs.filter(p => !usedImgs.has(p) && !srcText.includes(p.replace(/^assets\/img\//, '')) );
console.log(JSON.stringify({ items: ids.length, concepts: Object.keys(L.CONCEPTS).length, sections: L.SECTIONS.length, cards: Object.values(L.GUIDE).reduce((a, b) => a + b.length, 0), cases: L.CASES.length, bosses: L.BOSSES.length, generators: Object.keys(L.GEN).length, byType: byT, byChapter: byCh,
  mcLongestKeyed: longest + '/' + single + ' (' + (100 * longest / single).toFixed(0) + '%)', images: allImgs.length, imagesReferenced: usedImgs.size, unusedImages: unused.length }, null, 1));
if (process.argv.includes('--unused')) console.log(unused.join('\n'));
console.log('WARNINGS', warns.length); warns.slice(0, 40).forEach(w => console.log('  w', w));
console.log('ERRORS', errs.length); errs.slice(0, 80).forEach(e => console.log('  E', e));
process.exit(errs.length ? 1 : 0);
