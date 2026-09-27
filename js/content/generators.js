/* Seeded practice generators. Each build(seed) returns a fresh item that applies a course relationship to new numbers or
   a new diagram. The relationships come from the cited sources; the specific numbers and layouts are invented for practice. */
(function (L) {
  'use strict';
  var U = L.util;
  function O(t, ok, w) { return { t: String(t), ok: !!ok, w: w || '' }; }
  function uniqOpts(list) { var seen = {}; return list.filter(function (o) { if (seen[o.t]) return false; seen[o.t] = 1; return true; }); }
  function fmt(n) { return Number(n).toLocaleString('en-US'); }
  var LET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'R', 'S', 'T'];

  // 1. Relief (Lecture 2 slide 19)
  L.GEN.relief = { title: 'Relief from elevations', c: 'c2-relief', build: function (seed) {
    var r = U.rng(seed), v = U.int(r, 0, 2);
    var e1 = U.int(r, 12, 34) * 100 + U.pick(r, [0, 50]), e2 = U.int(r, 1, 11) * 100 + U.pick(r, [0, 20, 60]);
    if (v === 0) return { c: 'c2-relief', t: 'num', q: 'A summit is at ' + fmt(e1) + ' m. The river at its base is at ' + fmt(e2) + ' m. What is the relief between them, in meters?', a: e1 - e2, tol: 0, unit: 'm',
      x: 'Relief = difference in elevation = ' + fmt(e1) + ' − ' + fmt(e2) + ' = ' + fmt(e1 - e2) + ' m.', s: ['L2:19'], hint: 'Relief is a difference, not a single elevation.' };
    if (v === 1) {
      var hiA = U.int(r, 25, 34) * 100, loA = hiA - U.int(r, 2, 6) * 100, hiB = U.int(r, 10, 18) * 100, loB = U.int(r, 0, 2) * 100;
      var pts = [{ x: 150, e: loA, label: 'P' }, { x: 240, e: hiA, label: 'Q' }, { x: 520, e: hiB, label: 'R' }, { x: 640, e: loB, label: 'S' }];
      var profile = [[150, loA], [240, hiA], [330, loA + 100], [520, hiB], [640, loB], [740, 0]];
      var rq = hiA - loA, rr = hiB - loB, bigger = rr > rq ? 'R–S' : 'P–Q';
      return { c: 'c2-relief', t: 'mc', q: 'On the profile, which pair of neighboring points has the greater relief between them?', media: { kind: 'svg', name: 'topo', spec: { pts: pts, profile: profile, maxE: 3600, left: loA } },
        o: uniqOpts([O('P–Q (' + fmt(rq) + ' m)', bigger === 'P–Q', 'Relief P–Q = ' + fmt(hiA) + ' − ' + fmt(loA) + ' = ' + fmt(rq) + ' m.'), O('R–S (' + fmt(rr) + ' m)', bigger === 'R–S', 'Relief R–S = ' + fmt(hiB) + ' − ' + fmt(loB) + ' = ' + fmt(rr) + ' m.'),
          O('P–Q, because Q is the highest point', false, 'The highest point does not guarantee the greatest relief.'), O('They are equal', false, 'Subtract each pair.')]),
        x: 'Relief compares two places; the highest summit can sit beside a high valley and have less relief than a lower peak beside the sea (Lecture 2 slide 19).', s: ['L2:19'], hint: 'Subtract within each pair.' };
    }
    var d = U.int(r, 2, 9) * 500;
    return { c: 'c2-relief', t: 'mc', q: 'Two slopes each have ' + fmt(d) + ' m of relief. Slope 1 spans ' + fmt(U.int(r, 2, 4)) + ' km horizontally; slope 2 spans ' + fmt(U.int(r, 8, 15)) + ' km. Which is steeper?',
      o: [O('Slope 1', true, 'Same elevation change over a shorter horizontal distance.'), O('Slope 2', false, 'A longer horizontal distance means a gentler slope.'), O('They are equally steep because relief is equal', false, 'Steepness depends on horizontal distance too.'), O('Cannot be compared without absolute elevations', false, 'Relief and distance are enough.')],
      x: 'Steepness = how fast elevation changes over horizontal distance (Lecture 2 slide 19).', s: ['L2:19'] };
  } };

  // 2. Hot-spot and plate rates (Lecture 3 slides 35–36, 43)
  L.GEN.hotspotRate = { title: 'Hot-spot chains and plate rates', c: 'c3-hotspot', build: function (seed, opt) {
    var r = U.rng(seed), v = U.int(r, 0, 2), rate = U.int(r, 2, 10), t = U.int(r, 2, 16), d = rate * 10 * t;
    var east = r() < 0.5, names = U.shuffle(LET, r).slice(0, 3);
    var isl = east ? [{ x: 620, y: 110, r: 26, label: names[0], age: 0, active: true }, { x: 420, y: 130, r: 22, label: names[1], age: t }, { x: 200, y: 150, r: 16, label: names[2], age: t * 2 }]
      : [{ x: 140, y: 110, r: 26, label: names[0], age: 0, active: true }, { x: 340, y: 130, r: 22, label: names[1], age: t }, { x: 560, y: 150, r: 16, label: names[2], age: t * 2 }];
    var media = { kind: 'svg', name: 'hotspot', spec: { islands: isl } };
    if (opt && opt.c === 'c3-rates') v = 1; else if (opt && opt.c === 'c3-hotspot' && v === 1) v = 0;
    if (v === 0) return { c: 'c3-hotspot', t: 'num', q: 'Island ' + names[0] + ' sits over the hot spot now. Island ' + names[1] + ' is ' + fmt(d) + ' km away along the chain and is ' + t + ' million years old. What is the average plate speed, in cm per year? (1 km = 100,000 cm)', a: rate, tol: 0.05, unit: 'cm/yr', media: media,
      x: fmt(d) + ' km ÷ ' + t + ' million yr = ' + fmt(d / t) + ' km per million yr. One km per million years is 0.1 cm/yr, so the rate is ' + rate + ' cm/yr, the "centimeters per year" pace from Lecture 3.', s: ['L3:36', 'L3:43'], hint: 'Divide distance by age, then convert km per million years to cm per year (÷10).' };
    if (v === 1) return { c: 'c3-rates', t: 'num', q: 'A plate moves ' + rate + ' cm per year. How far does it move in ' + t + ' million years, in kilometers? (1 km = 100,000 cm)', a: d, tol: 0, unit: 'km',
      x: rate + ' cm/yr × ' + fmt(t * 1e6) + ' yr = ' + fmt(rate * t * 1e6) + ' cm = ' + fmt(d) + ' km.', s: ['L3:36'], hint: 'Multiply, then divide centimeters by 100,000.' };
    var dir = east ? 'west' : 'east';
    return { c: 'c3-hotspot', t: 'mc', q: 'Island ages are shown (Ma = millions of years). The active volcano is island ' + names[0] + '. Which way has the plate been moving over the hot spot?', media: media,
      o: [O('Toward the ' + dir, true, 'Older islands were carried away from the hot spot in the direction of plate motion.'), O('Toward the ' + (east ? 'east' : 'west'), false, 'That points from the old islands toward the active one; the hot spot stays put while the plate carries volcanoes away.'), O('North', false, 'The chain runs east-west.'), O('The plate is stationary; the hot spot moved', false, 'Lecture 3 treats the hot spot as fixed and the plate as moving.')],
      x: 'Lecture 3 slide 43: a volcano forms over the hot spot, the plate carries it away, and islands get older away from the active end.', s: ['L3:43'] };
  } };

  // 3. Magnetic stripes (Lecture 3 slides 39–41)
  L.GEN.stripes = { title: 'Magnetic stripes', c: 'c3-magnetic', build: function (seed) {
    var r = U.rng(seed), pat = [U.int(r, 1, 3), U.int(r, 1, 4), U.int(r, 1, 3), U.int(r, 2, 4), U.int(r, 1, 3), U.int(r, 1, 3)], v = U.int(r, 0, 1);
    var total = pat.reduce(function (a, b) { return a + b; }, 0) * 16;
    if (v === 0) {
      var a = U.int(r, 30, total - 20), b = U.int(r, 30, total - 20), g = 0; while (Math.abs(a - b) < 60 && g++ < 200) b = U.int(r, 30, total - 20); if (Math.abs(a - b) < 60) { a = 30; b = total - 20; }
      var older = a > b ? '1' : '2';
      return { c: 'c3-magnetic', t: 'mc', q: 'The dashed line is the ridge axis. Which marker sits on older seafloor?', media: { kind: 'svg', name: 'stripes', spec: { pattern: pat, showRidge: true, labels: [['1', -a], ['2', b]] } },
        o: [O('Marker ' + older, true, 'It is farther from the ridge axis.'), O('Marker ' + (older === '1' ? '2' : '1'), false, 'It is closer to the ridge, where new crust forms.'), O('Both are the same age because they are on stripes of the same color', false, 'Color shows polarity, not age; many stripes share a polarity.'), O('Cannot tell without drilling', false, 'Distance from the ridge is the evidence.')],
        x: 'New crust forms at the ridge and moves away, so age increases with distance from the ridge on both sides (Lecture 3 slides 39–42).', s: ['L3:39', 'L3:40', 'L3:42'] };
    }
    var p = U.int(r, 60, Math.min(total - 20, 280));
    return { c: 'c3-magnetic', t: 'mc', q: 'Marker 1 is on the west side of the ridge. Where would you expect rock of exactly the same age on the other side?', media: { kind: 'svg', name: 'stripes', spec: { pattern: pat, showRidge: true, labels: [['1', -p], ['A', p], ['B', Math.max(20, Math.round(p / 2))], ['C', Math.min(350, p + 64)]] } },
      o: [O('A, the mirror position at the same distance east of the ridge', true, 'Spreading is symmetric in this idealized map.'), O('B, closer to the ridge', false, 'Closer means younger.'), O('C, farther from the ridge', false, 'Farther means older.'), O('Anywhere on a stripe of the same color', false, 'Several stripes share a polarity.')],
      x: 'Stripes are symmetric because one ridge produces crust that moves away on both sides (Lecture 3 slides 40–41).', s: ['L3:40', 'L3:41'] };
  } };

  // 4. Relative dating sequences (Lecture 2 slides 10–13)
  L.GEN.reldate = { title: 'Order the events', c: 'c2-sequence', build: function (seed) {
    var r = U.rng(seed), names = U.shuffle(['A', 'B', 'C', 'D', 'E', 'G', 'H', 'K'], r).slice(0, 4);
    var du = U.int(r, 1, 3), fu = U.int(r, 1, 3); while (fu === du) fu = U.int(r, 1, 3);
    var seq = [];
    for (var i = 0; i < 4; i++) { seq.push('Deposit layer ' + names[i]); if (du === i + 1) seq.push('Intrude dike X'); if (fu === i + 1) seq.push('Fault F'); }
    var media = { kind: 'svg', name: 'reldate', spec: { layers: names, dike: { x: 230, upto: du, label: 'X', baked: true }, fault: { x: 430, upto: fu, label: 'F' } } };
    if (r() < 0.5) return { c: 'c2-sequence', t: 'order', q: 'Layers are labeled from the bottom up. Dike X and fault F each stop at a layer boundary. Put all six events in order, oldest first.', seq: seq, media: media,
      x: 'Superposition orders the layers; cross-cutting relations place each feature after the youngest layer it cuts and before the first layer that covers it (Lecture 2 slides 10–13).', s: ['L2:10', 'L2:11', 'L2:12'], hint: 'A feature is younger than everything it cuts and older than the layer that lies undisturbed on top of it.' };
    var dikeFirst = du < fu;
    return { c: 'c2-sequence', t: 'mc', q: 'Which happened first: intrusion of dike X or movement on fault F?', media: media,
      o: [O(dikeFirst ? 'Dike X' : 'Fault F', true, (dikeFirst ? 'X' : 'F') + ' is covered by layer ' + names[Math.min(du, fu)] + ', which the other feature cuts.'), O(dikeFirst ? 'Fault F' : 'Dike X', false, 'It cuts a younger layer, so it is younger.'), O('They happened at the same time', false, 'They stop at different layer boundaries.'), O('It cannot be determined because they do not touch', false, 'The layers they cut and do not cut bracket their ages.')],
      x: 'Compare the youngest layer each feature cuts (Lecture 2 cross-cutting relations).', s: ['L2:11', 'L2:12'] };
  } };

  // 5. P-T melting paths (Textbook 5.5; Sep 15)
  L.GEN.pt = { title: 'Melting on a P-T graph', c: 'c5-ptread', build: function (seed, opt) {
    var r = U.rng(seed), v = U.int(r, 0, 3);
    if (opt && opt.c === 'c5-ptread') v = r() < 0.5 ? 3 : 0; else if (opt && opt.c === 'c5-melt3' && v === 3) v = U.int(r, 0, 2);
    function ts(p) { return 35 + 0.45 * p; } function tw(p) { return 15 + 0.37 * p; }
    if (v === 0) { var p = U.int(r, 60, 90), T = Math.round(ts(p) - U.int(r, 4, 10));
      return { c: 'c5-melt3', t: 'mc', q: 'Rock X is hot, deep, and just on the solid side of the melting curve. Which single change would melt it WITHOUT adding heat or water?', media: { kind: 'svg', name: 'pt', spec: { points: [['X', T, p]] } },
        o: [O('Raise it toward the surface quickly so pressure drops', true, 'Decompression moves it up the graph across the curve.'), O('Push it deeper', false, 'Higher pressure moves it further into the solid field.'), O('Let it cool slowly', false, 'Moves it left, away from the curve.'), O('Nothing can melt it without heat', false, 'Decompression melting needs no added heat.')],
        x: 'Textbook 5.5: hot rock that rises fast enough not to cool much can cross the melting curve by decompression; Sep 15 lecture walked through the same three routes.', s: ['TB5:5.5', 'T0915'] }; }
    if (v === 1) { var p1 = U.int(r, 10, 30), T1 = U.int(r, 8, 18);
      return { c: 'c5-melt3', t: 'mc', q: 'Rock Y is cool and shallow. Which change is the only one of these that would melt it?', media: { kind: 'svg', name: 'pt', spec: { points: [['Y', T1, p1]] } },
        o: [O('Heat it strongly at the same depth', true, 'Moves right across the curve.'), O('Lower the pressure to zero', false, 'Even at the surface its temperature is below the curve.'), O('Increase the pressure', false, 'Deeper into the solid field.'), O('Wait for it to cool', false, 'Moves away from the curve.')],
        x: 'Decompression works only for rock that is already hot (textbook 5.5).', s: ['TB5:5.5'] }; }
    if (v === 2) { var p2 = U.int(r, 55, 85), lo = tw(p2), hi = ts(p2), T2 = Math.round(lo + (hi - lo) * (0.35 + r() * 0.3));
      return { c: 'c5-melt3', t: 'mc', q: 'Rock Z lies between the wet (dashed) and dry melting curves. What would make it melt with no change in temperature or pressure?', media: { kind: 'svg', name: 'pt', spec: { wet: true, points: [['Z', T2, p2]] } },
        o: [O('Add water', true, 'Water lowers the melting curve; Z is on the liquid side of the wet curve.'), O('Remove water', false, 'Dry rock follows the dry curve; Z is solid there.'), O('Increase pressure', false, 'That changes pressure.'), O('Nothing; it is already molten', false, 'It is on the solid side of the dry curve.')],
        x: 'Adding water can lower melting temperatures by as much as 500 °C (textbook 5.5); this is how the mantle melts above subducting slabs (5.10).', s: ['TB5:5.5', 'TB5:5.10'] }; }
    var pts = [], lab = U.shuffle(['A', 'B', 'C', 'D'], r), liquidIdx = U.int(r, 0, 3), out = [];
    for (var i = 0; i < 4; i++) { var pp = U.int(r, 15, 85), tt = i === liquidIdx ? Math.round(ts(pp) + U.int(r, 8, 20)) : Math.round(ts(pp) - U.int(r, 8, 25)); pts.push([lab[i], Math.max(4, Math.min(96, tt)), pp]); }
    return { c: 'c5-ptread', t: 'mc', q: 'Which point represents rock that is molten under its current conditions?', media: { kind: 'svg', name: 'pt', spec: { points: pts } },
      o: lab.map(function (l, i) { return O('Point ' + l, i === liquidIdx, i === liquidIdx ? 'Right of (hotter than) the melting curve.' : 'Left of the curve: solid.'); }), fixedOrder: false,
      x: 'The melting curve (solidus) separates solid (cooler side) from liquid (hotter side) at each pressure (textbook 5.5).', s: ['TB5:5.5', 'T0915'] };
  } };

  // 6. Igneous rock naming (Textbook 5.2–5.3; class chart photo)
  var IG = [
    { comp: 'felsic', coarse: 'Granite', fine: 'Rhyolite', min: ['quartz, pink K-feldspar, a little biotite', 'quartz, white feldspar, some muscovite'] },
    { comp: 'intermediate', coarse: 'Diorite', fine: 'Andesite', min: ['white plagioclase and black amphibole, little or no quartz', 'plagioclase, amphibole, and some biotite'] },
    { comp: 'mafic', coarse: 'Gabbro', fine: 'Basalt', min: ['dark pyroxene and gray Ca-rich plagioclase', 'pyroxene, Ca-plagioclase, and some olivine'] },
    { comp: 'ultramafic', coarse: 'Peridotite', fine: 'Komatiite', min: ['mostly green olivine with some pyroxene', 'olivine and dark pyroxene only'] }];
  L.GEN.igneousName = { title: 'Name the igneous rock', c: 'c5-classify', build: function (seed) {
    var r = U.rng(seed), k = U.int(r, 0, 2), row = IG[k], coarse = r() < 0.5, ans = coarse ? row.coarse : row.fine;
    var desc = coarse ? 'Crystals several millimeters across, easy to see: ' + U.pick(r, row.min) + '.' : 'No crystals visible without a microscope; lab analysis shows the minerals are ' + U.pick(r, row.min) + '.';
    var pool = IG.slice(0, 3).reduce(function (a, x) { return a.concat([x.coarse, x.fine]); }, []).filter(function (n) { return n !== ans; });
    var partner = coarse ? row.fine : row.coarse, sameRow = IG.slice(0, 3).map(function (x) { return coarse ? x.coarse : x.fine; }).filter(function (n) { return n !== ans; });
    var wrong = U.uniq([partner, U.pick(r, sameRow)].concat(U.shuffle(pool, r))).slice(0, 3);
    return { c: 'c5-classify', t: 'mc', q: 'Name this igneous rock. ' + desc,
      o: [O(ans, true, row.comp.charAt(0).toUpperCase() + row.comp.slice(1) + ', ' + (coarse ? 'coarse-grained' : 'fine-grained') + '.')].concat(wrong.map(function (w) { return O(w, false, w === partner ? 'Same composition, wrong grain size.' : 'Different composition' + (sameRow.indexOf(w) >= 0 ? ', same grain size.' : '.')); })),
      x: 'Column = composition (from the minerals); row = grain size (textbook 5.2–5.3 chart, shown in class).', s: ['TB5:5.2', 'TB5:5.3', 'IMG5737'], hint: 'Decide composition from the minerals first, then pick coarse or fine.' };
  } };

  // 7. Mineral ID from properties (Textbook 4.3–4.9; Sep 8)
  var MIN = [
    { n: 'Quartz', p: 'glassy, hardness 7 (scratches glass), no cleavage, conchoidal fracture, no reaction to acid' },
    { n: 'Calcite', p: 'white, hardness 3, three cleavages not at 90° (rhombs), fizzes strongly in dilute HCl' },
    { n: 'Halite', p: 'clear to white, cubic cleavage in three directions at 90°, salty taste, hardness about 2.5' },
    { n: 'Gypsum', p: 'white, soft enough to scratch with a fingernail, no fizz in acid' },
    { n: 'Muscovite', p: 'clear-silvery, peels into thin flexible sheets (one cleavage)' },
    { n: 'Biotite', p: 'black, peels into thin sheets (one cleavage)' },
    { n: 'Magnetite', p: 'black, metallic, strongly attracted to a magnet' },
    { n: 'Hematite', p: 'dark gray to red, reddish-brown streak, not magnetic' },
    { n: 'Pyrite', p: 'brassy yellow, metallic, striated cubes, harder than a knife blade' },
    { n: 'Galena', p: 'gray, metallic, cubic cleavage, feels very heavy for its size' },
    { n: 'Olivine', p: 'olive green, glassy, no cleavage, found in mantle rocks' }];
  L.GEN.mineralId = { title: 'Identify the mineral', c: 'c4-tests', build: function (seed) {
    var r = U.rng(seed), m = U.pick(r, MIN), others = U.shuffle(MIN.filter(function (x) { return x.n !== m.n; }), r).slice(0, 3);
    return { c: 'c4-tests', t: 'mc', q: 'A specimen is ' + m.p + '. Which mineral is it?',
      o: [O(m.n, true, 'Matches every listed property.')].concat(others.map(function (x) { return O(x.n, false, x.n + ': ' + x.p + '.'); })),
      x: 'Use several properties together; color alone is unreliable (textbook 4.3).', s: ['TB4:4.3', 'TB4:4.9', 'T0908'] };
  } };

  // 8. Hardness reasoning (Textbook 4.3)
  var REF = [['a fingernail', 2.5], ['a copper wire', 3.5], ['window glass', 5.5], ['a steel knife blade', 5.5]];
  var MOHS = [['talc', 1], ['gypsum', 2], ['calcite', 3], ['fluorite', 4], ['apatite', 5], ['K-feldspar', 6], ['quartz', 7], ['topaz', 8], ['corundum', 9], ['diamond', 10]];
  L.GEN.hardness = { title: 'Scratch-test reasoning', c: 'c4-tests', build: function (seed) {
    var r = U.rng(seed), v = U.int(r, 0, 1);
    if (v === 0) {
      var pr = U.pick(r, [[REF[0], REF[1]], [REF[1], REF[2]], [REF[0], REF[2]], [REF[1], REF[3]]]), lo = pr[0], hi = pr[1];
      var range = 'Between ' + lo[1] + ' and ' + hi[1];
      var inside = MOHS.filter(function (m) { return m[1] > lo[1] && m[1] < hi[1]; }).map(function (m) { return m[0]; });
      return { c: 'c4-tests', t: 'mc', q: 'An unknown mineral scratches ' + lo[0] + ' but is scratched by ' + hi[0] + '. What is its Mohs hardness?',
        o: [O(range, true, 'Harder than ' + lo[1] + ', softer than ' + hi[1] + (inside.length ? ' (e.g., ' + inside.join(' or ') + ').' : '.')), O('Less than ' + lo[1], false, 'It scratches ' + lo[0] + ', so it is harder.'), O('Greater than ' + hi[1], false, 'It is scratched by ' + hi[0] + '.'), O('Exactly 7', false, 'Quartz (7) scratches glass and steel.')],
        x: 'A harder material scratches a softer one. Reference hardnesses: fingernail 2.5, copper 3.5, glass or knife 5.5 (textbook 4.3).', s: ['TB4:4.3'] };
    }
    var a = U.int(r, 0, 8), b = U.int(r, a + 1, 9);
    return { c: 'c4-tests', t: 'mc', q: 'Mineral P scratches ' + MOHS[a][0] + '. Mineral Q scratches P. ' + MOHS[b][0].charAt(0).toUpperCase() + MOHS[b][0].slice(1) + ' scratches Q. Which statement must be true?',
      o: [O('Q is harder than P', true, 'Q scratches P.'), O('P is harder than ' + MOHS[b][0], false, MOHS[b][0] + ' scratches Q, which is harder than P.'), O('P and Q have the same hardness', false, 'One scratches the other.'), O('P is softer than ' + MOHS[a][0], false, 'P scratches ' + MOHS[a][0] + '.')],
      x: 'Chain the scratch results: ' + MOHS[a][0] + ' < P < Q < ' + MOHS[b][0] + ' (textbook 4.3; Mohs numbers are relative ranks).', s: ['TB4:4.3'] };
  } };

  // 9. Village risk around a composite volcano (Textbook 6.12, 6.14)
  L.GEN.hazard = { title: 'Village risk map', c: 'c6-assess', build: function (seed) {
    var r = U.rng(seed), ang = r() * Math.PI * 2, deg = function (a, d) { return [Math.round(380 + Math.cos(a) * d), Math.round(190 + Math.sin(a) * d * 0.85)]; };
    var va = ang, wa = ang + Math.PI * (0.45 + r() * 0.1), sa = ang + Math.PI * (1.45 + r() * 0.1);
    var vEnd = deg(va, 175), vMid = deg(va + 0.15, 90);
    var valley = 'M380 190 Q ' + vMid[0] + ' ' + vMid[1] + ' ' + vEnd[0] + ' ' + vEnd[1];
    var w0 = deg(wa, 40), w1 = deg(wa, 150);
    var names = U.shuffle(['1', '2', '3'], r), pv = deg(va + 0.06, 140), pw = deg(wa, 165), ps = deg(sa, 160);
    var spec = { valleys: [valley], wind: [w0[0], w0[1], w1[0], w1[1]], villages: [{ x: pv[0], y: pv[1], label: names[0] }, { x: pw[0], y: pw[1], label: names[1] }, { x: ps[0], y: ps[1], label: names[2] }] };
    var v = U.int(r, 0, 2), media = { kind: 'svg', name: 'hazard', spec: spec };
    var opts = function (key) { return [
      O('Village ' + names[0], key === 0, 'In a valley draining the volcano: lahars and small pyroclastic flows follow valleys.'),
      O('Village ' + names[1], key === 1, 'Downwind: ash and pumice fall here most often.'),
      O('Village ' + names[2], key === 2, 'Upwind and off the valleys: lowest hazard of the three at similar distance.'),
      O('All three are equal because they are the same distance from the summit', false, 'Distance matters most, but valleys and wind direction change the risk.')]; };
    if (v === 0) return { c: 'c6-assess', t: 'mc', q: 'Three villages sit about the same distance from a steep, snow-capped composite volcano. Which is at greatest risk from lahars?', media: media, o: opts(0), x: 'Textbook 6.12 B: valleys channel mudflows; 6.14: Rainier\'s mudflows follow valleys toward towns.', s: ['TB6:6.12', 'TB6:6.14'] };
    if (v === 1) return { c: 'c6-assess', t: 'mc', q: 'Which village would most likely receive the thickest ash fall during an eruption column?', media: media, o: opts(1), x: 'Textbook 6.12 B.3: tephra is carried farthest in the prevailing wind direction.', s: ['TB6:6.12'] };
    return { c: 'c6-assess', t: 'mc', q: 'Which village is in the least hazardous position?', media: media, o: opts(2), x: 'Textbook 6.12 B: at similar distance, avoid valleys draining the volcano and the downwind side.', s: ['TB6:6.12'] };
  } };

  // 10. Plate boundary identification (Lecture 3 slides 20–33)
  var BT = [
    { type: 'divergent', ans: 'Divergent (mid-ocean ridge)', clue: 'Two oceanic plates move apart; a ridge with a central rift valley; shallow earthquakes; basaltic magma' },
    { type: 'ocean-ocean', ans: 'Convergent, ocean-ocean (island arc)', clue: 'A trench offshore, a curved chain of volcanic islands, and earthquakes that get deeper in one direction' },
    { type: 'ocean-continent', ans: 'Convergent, ocean-continent', clue: 'An offshore trench next to a continent with a mountain belt of volcanoes and deepening earthquakes inland' },
    { type: 'continent-continent', ans: 'Convergent, continent-continent (collision)', clue: 'Very high mountains with a wide zone of deformation, earthquakes, and few volcanoes' },
    { type: 'transform', ans: 'Transform', clue: 'Plates slide past each other horizontally; shallow earthquakes; no volcanoes' }];
  L.GEN.boundaryId = { title: 'Identify the plate boundary', c: 'c3-boundtypes', build: function (seed) {
    var r = U.rng(seed), b = U.pick(r, BT), useFig = r() < 0.5, others = U.shuffle(BT.filter(function (x) { return x !== b; }), r).slice(0, 3);
    return { c: 'c3-boundtypes', t: 'mc', q: useFig ? 'The labels have been replaced by numbers. What kind of plate boundary is drawn?' : 'Clues: ' + b.clue + '. What kind of plate boundary is this?',
      media: useFig ? { kind: 'svg', name: 'boundary', spec: { type: b.type, markers: true } } : undefined,
      o: [O(b.ans, true, b.clue + '.')].concat(others.map(function (x) { return O(x.ans, false, x.clue + '.'); })),
      x: 'Lecture 3 slides 20–33: boundaries are defined by relative motion, and each type has a signature set of features.', s: ['L3:20', 'L3:24', 'L3:27', 'L3:31'] };
  } };

  L.GEN_FOR = {
    'c2-relief': ['relief'], 'c2-sequence': ['reldate'], 'c3-hotspot': ['hotspotRate'], 'c3-rates': ['hotspotRate'], 'c3-magnetic': ['stripes'],
    'c3-boundtypes': ['boundaryId'], 'c4-tests': ['hardness', 'mineralId'], 'c5-ptread': ['pt'], 'c5-melt3': ['pt'], 'c5-classify': ['igneousName'], 'c6-assess': ['hazard']
  };
})((typeof window !== 'undefined' ? window : globalThis).L);
