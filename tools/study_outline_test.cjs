const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = {
  console, Math, Date, JSON, setTimeout() {},
  location: { protocol: 'https:', hostname: 'ethanheinrick01-ctrl.github.io' },
  document: { readyState: 'loading', addEventListener() {} },
  localStorage: { getItem() { return null; }, setItem() {} }
};
context.window = context;
vm.createContext(context);
function load(file) {
  if (file !== 'js/app.js') vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
function scripts(html) {
  for (const [, url] of html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/g)) load(url.split('?')[0]);
}
context.document.write = scripts;
scripts(fs.readFileSync(path.join(root, 'index.html'), 'utf8'));
const L = context.L;
L.engine.build();
const protectedBefore = JSON.stringify([L.GUIDE, L.EXAM1, L.EXAM2, L.EXAM2_FINAL, L.engine.REG()]);
let cards = 0;
for (const card of Object.values(L.GUIDE).flat()) {
  const plan = L.studyOutlineData.cards[card.id];
  assert.ok(plan, `Missing chapter outline: ${card.id}`);
  assert.equal(plan.source, card.html, `Stale chapter outline: ${card.id}`);
  const result = L.studyOutline.format(card.id, card.html);
  assert.match(result, /class="e2-note-group"/);
  assert.equal(L.studyOutline.format(card.id, result), result, 'Repeated formatting must be idempotent');
  assert.equal(L.studyOutline.format(card.id, card.html + ' Changed.'), card.html + ' Changed.', 'Changed sources must stay intact');
  cards++;
}
for (const topic of L.EXAM1.topics) {
  assert.equal(L.studyOutlineData.cards['exam1-' + topic.id].source, topic.html);
}
let groups = 0;
for (const unit of L.exam2Mocks.focusGroups()) {
  const plan = L.studyOutlineData.focus[unit.n];
  assert.equal(plan.source, unit.explain);
  assert.equal(plan.trapSource, unit.trap);
  assert.ok(L.studyOutline.focusGroups(unit).length);
  assert.equal(L.studyOutline.focusGroups({ ...unit, explain: 'Changed source' }), null);
  assert.match(L.studyOutline.focusLimit({ ...unit, trap: '<changed>' }), /&lt;changed&gt;/);
  assert.match(L.studyOutline.focusHTML(unit), new RegExp('data-focus-practice="' + unit.id + '"'));
  groups += plan.groups.length;
}
assert.equal(L.studyOutline.format('unknown', '<p>Keep me</p>'), '<p>Keep me</p>');
assert.equal(L.studyOutline.format('unknown', ''), '');
// The reading adapter must retain lecture highlights after paragraphs become lists.
const sourceScope = L.examScope.current, sourceNotes = L.exam2Notes.apply;
L.examScope.current = () => 'exam2';
L.exam2Notes.apply = () => {};
const points = { innerHTML: L.studyOutlineData.cards['g8-1a'].html };
const readingRoot = {
  dataset: { e2Reading: 'g8-1a' }, closest() { return null; },
  querySelectorAll(selector) { return selector === '.e2-note-group .e2-note-points' ? [points] : []; }
};
const readingMain = { querySelectorAll() { return [readingRoot]; }, querySelector() { return {}; } };
L.exam2Reading.apply(readingMain);
assert.match(points.innerHTML, /e2-study-emphasis/);
assert.match(points.innerHTML, /e2-study-emphasis[^>]*>strength generally increases downward<\/mark>/);
const highlighted = points.innerHTML;
L.exam2Reading.apply(readingMain);
assert.equal(points.innerHTML, highlighted, 'Repeated decoration must not nest highlights');
const excluded = { ...readingRoot, dataset: { e2Reading: 'g8-1a' }, closest() { return {}; } };
points.innerHTML = '<p>Question choices stay neutral</p>';
L.exam2Reading.apply({ ...readingMain, querySelectorAll() { return [excluded]; } });
assert.equal(points.innerHTML, '<p>Question choices stay neutral</p>');
L.examScope.current = sourceScope;
L.exam2Notes.apply = sourceNotes;
assert.doesNotMatch(L.studyOutline.keyHTML(false), /Yellow highlight/);
assert.match(L.studyOutline.keyHTML(true), /Yellow highlight/);
for (const n of [20,39,42,43]) assert.ok(L.studyOutlineData.focus[n].groups.some(g => g.html.includes('e2-study-emphasis')));
const plume = L.studyOutlineData.cards['g10-4-a'].html;
assert.match(plume, /hot solid rock<\/mark>\.<ul class="study-subpoints"><li>Melting near the lithosphere supplies liquid magma\.<\/li><li>The plume is not a pipe/);
assert.equal(JSON.stringify([L.GUIDE, L.EXAM1, L.EXAM2, L.EXAM2_FINAL, L.engine.REG()]), protectedBefore);
console.log(`PASS ${cards} chapter cards, ${L.EXAM1.topics.length} Exam 1 topics and ${groups} Focus teaching groups; stale-source, idempotence, escaping and content-preservation checks`);
