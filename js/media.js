/* Original instructional diagrams drawn as inline SVG. They redraw relationships taught in the
   current course sources; they are not copies of publisher figures. Numbered markers support labeling tasks. */
(function (root) {
  'use strict';
  var L = root.L = root.L || {}, U = L.util, esc = U.esc;
  var C = { paper: '#f4efe4', ink: '#1f2328', mute: '#5b616b', cont: '#cdb48a', ocean: '#5f7385', mantle: '#8fa56e', astheno: '#c08a55', outer: '#e7a13d', inner: '#f3d35a',
    water: '#86b9da', magma: '#e0522c', sed: '#e9dcae', rock1: '#d8c7a0', rock2: '#b99873', rock3: '#9fb0a0', rock4: '#c7a3a3', dike: '#5a3d52', red: '#c0392b', blue: '#2e6da4', green: '#3f7d3a' };
  var uid = 0;
  function svg(w, h, body, title) {
    uid++;
    return '<svg class="dg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-labelledby="dg' + uid + '" xmlns="http://www.w3.org/2000/svg"><title id="dg' + uid + '">' + esc(title || 'Diagram') + '</title><rect x="0" y="0" width="' + w + '" height="' + h + '" rx="10" fill="' + C.paper + '"/>' + body + '</svg>';
  }
  function t(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" font-size="' + (o.size || 14) + '" fill="' + (o.fill || C.ink) + '" text-anchor="' + (o.anchor || 'middle') + '"' + (o.bold ? ' font-weight="700"' : '') + (o.italic ? ' font-style="italic"' : '') + (o.rot ? ' transform="rotate(' + o.rot + ' ' + x + ' ' + y + ')"' : '') + '>' + esc(s) + '</text>';
  }
  function mk(x, y, n) { return '<g class="mk"><circle cx="' + x + '" cy="' + y + '" r="12" fill="#111" stroke="#fff" stroke-width="2"/>' + t(x, y + 5, String(n), { size: 14, fill: '#fff', bold: true }) + '</g>'; }
  function arrow(x1, y1, x2, y2, col, w) {
    col = col || C.ink; w = w || 3;
    var a = Math.atan2(y2 - y1, x2 - x1), hl = 11, p1 = [x2 - hl * Math.cos(a - 0.45), y2 - hl * Math.sin(a - 0.45)], p2 = [x2 - hl * Math.cos(a + 0.45), y2 - hl * Math.sin(a + 0.45)];
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + col + '" stroke-width="' + w + '"/><polygon points="' + x2 + ',' + y2 + ' ' + p1.join(',') + ' ' + p2.join(',') + '" fill="' + col + '"/>';
  }
  function lbl(show, x, y, s, n, o) { return show ? t(x, y, s, o) : mk(x, y - 5, n); }

  // 1. Earth's layers (compositional and mechanical halves)
  L.MEDIA.layers = function (sp) {
    var show = !sp.markers, b = '';
    var cx = 225, cy = 250;
    b += '<circle cx="' + cx + '" cy="' + cy + '" r="200" fill="' + C.mantle + '"/><circle cx="' + cx + '" cy="' + cy + '" r="110" fill="' + C.outer + '"/><circle cx="' + cx + '" cy="' + cy + '" r="52" fill="' + C.inner + '"/>';
    b += '<circle cx="' + cx + '" cy="' + cy + '" r="200" fill="none" stroke="' + C.cont + '" stroke-width="9"/>';
    b += '<rect x="0" y="0" width="200" height="500" fill="' + C.paper + '" opacity="0"/>';
    b += lbl(show, 470, 60, 'Crust (thin: continental + oceanic)', 1, { anchor: 'start' }) + '<line x1="360" y1="130" x2="460" y2="62" stroke="#333"/>';
    b += lbl(show, 470, 170, 'Mantle; thickest layer', 2, { anchor: 'start' }) + '<line x1="330" y1="200" x2="460" y2="170" stroke="#333"/>';
    b += lbl(show, 470, 270, 'Outer core; molten iron-nickel', 3, { anchor: 'start' }) + '<line x1="290" y1="255" x2="460" y2="268" stroke="#333"/>';
    b += lbl(show, 470, 360, 'Inner core; solid iron-nickel', 4, { anchor: 'start' }) + '<line x1="225" y1="275" x2="460" y2="358" stroke="#333"/>';
    return svg(760, 500, b, 'Cutaway of Earth showing crust, mantle, outer core, and inner core');
  };
  // 2. Lithosphere vs asthenosphere block
  L.MEDIA.lithos = function (sp) {
    var show = !sp.markers, b = '';
    b += '<rect x="30" y="60" width="700" height="40" fill="' + C.water + '"/>';
    b += '<polygon points="30,40 420,40 450,100 30,100" fill="' + C.cont + '"/><polygon points="30,100 450,100 470,130 30,130" fill="' + C.cont + '" opacity=".8"/>';
    b += '<rect x="420" y="100" width="310" height="18" fill="' + C.ocean + '"/>';
    b += '<rect x="30" y="130" width="700" height="80" fill="#7f9563"/><rect x="450" y="118" width="280" height="92" fill="#7f9563"/>';
    b += '<rect x="30" y="210" width="700" height="120" fill="' + C.astheno + '"/>';
    b += '<line x1="30" y1="210" x2="730" y2="210" stroke="#222" stroke-dasharray="8 5" stroke-width="2"/>';
    b += lbl(show, 200, 80, 'Continental crust', 1) + lbl(show, 620, 113, 'Oceanic crust', 2, { size: 12, fill: '#fff' }) + lbl(show, 380, 175, 'Uppermost mantle (rigid)', 3) + lbl(show, 380, 280, 'Asthenosphere; hot, weak, mostly solid', 4);
    b += '<path d="M 745 40 L 755 40 L 755 210 L 745 210" fill="none" stroke="#222" stroke-width="2"/>' + t(770, 130, 'Lithosphere', { anchor: 'start', size: 13, rot: 0 });
    return svg(860, 340, b, 'Block showing crust and uppermost mantle forming the lithosphere above the asthenosphere');
  };
  // 3. Isostasy blocks floating
  L.MEDIA.isostasy = function (sp) {
    var blocks = sp.blocks || [{ h: 120, d: 1, l: 'A' }, { h: 60, d: 1, l: 'B' }, { h: 90, d: 1.5, l: 'C' }], b = '', x = 50, wl = 170;
    b += '<rect x="20" y="' + wl + '" width="' + (blocks.length * 150 + 40) + '" height="190" fill="' + C.water + '" opacity=".75"/>';
    blocks.forEach(function (k) {
      var sub = k.h * (k.d / 2.0); // submerged fraction proportional to density (fluid density 2)
      var top = wl - (k.h - sub);
      b += '<rect x="' + x + '" y="' + top + '" width="100" height="' + k.h + '" fill="' + (k.d > 1.2 ? C.rock2 : C.rock1) + '" stroke="#333"/>' + t(x + 50, top + k.h / 2 + 5, k.l, { bold: true, size: 20 });
      if (sp.showDensity) b += t(x + 50, wl + 175, (k.d > 1.2 ? 'denser' : 'less dense'), { size: 12, fill: C.mute });
      x += 150;
    });
    b += t(30, wl - 6, 'water line', { anchor: 'start', size: 11, fill: C.mute });
    return svg(blocks.length * 150 + 80, 380, b, 'Blocks of different thickness and density floating in water');
  };
  // 4. Silicate structures (top view)
  function tetra(x, y, s, up) { var h = s * 0.866, p = up === false ? [x, y + h * 0.66, x - s / 2, y - h * 0.33, x + s / 2, y - h * 0.33] : [x, y - h * 0.66, x - s / 2, y + h * 0.33, x + s / 2, y + h * 0.33]; return '<polygon points="' + p.join(',') + '" fill="#e9b949" stroke="#8a5a00" stroke-width="1.5"/><circle cx="' + x + '" cy="' + y + '" r="3" fill="#333"/>'; }
  L.MEDIA.silicate = function (sp) {
    var ty = sp.type || 'isolated', b = '', s = 34, i, j;
    if (ty === 'isolated') { for (i = 0; i < 4; i++) for (j = 0; j < 3; j++) b += tetra(80 + i * 90 + (j % 2) * 40, 60 + j * 70, s); }
    if (ty === 'single') { for (j = 0; j < 2; j++) for (i = 0; i < 9; i++) b += tetra(50 + i * 34, 80 + j * 100, s, i % 2 === 0); }
    if (ty === 'double') { for (j = 0; j < 2; j++) { for (i = 0; i < 9; i++) b += tetra(50 + i * 34, 60 + j * 110, s, i % 2 === 0); for (i = 0; i < 9; i++) b += tetra(50 + i * 34, 90 + j * 110, s, i % 2 !== 0); } }
    if (ty === 'sheet') { for (j = 0; j < 4; j++) for (i = 0; i < 10; i++) b += tetra(40 + i * 34 + (j % 2) * 17, 45 + j * 52, s, (i + j) % 2 === 0); }
    if (ty === 'framework') { for (j = 0; j < 4; j++) for (i = 0; i < 9; i++) { b += tetra(45 + i * 38 + (j % 2) * 19, 45 + j * 52, s, (i + j) % 2 === 0); } b += '<path d="M20 20 L 400 20 L 400 240 L 20 240 Z" fill="none" stroke="#8a5a00" stroke-dasharray="4 4"/>'; b += t(210, 262, 'linked in all three dimensions (shown flattened)', { size: 12, fill: C.mute }); }
    if (sp.label) b += t(210, 280, sp.label, { bold: true });
    return svg(420, 290, b, 'Top-view sketch of silicon-oxygen tetrahedra arranged as ' + ty);
  };
  // 5. Cleavage geometry (cross-section outline of broken fragment)
  L.MEDIA.cleavage = function (sp) {
    var ty = sp.type || '1', b = '';
    if (ty === '1') { for (var i = 0; i < 7; i++) b += '<rect x="' + (70 + i * 3) + '" y="' + (60 + i * 18) + '" width="220" height="12" fill="#b9a27a" stroke="#5a4a2a"/>'; b += t(180, 230, 'one set of parallel planes → thin sheets', { size: 13 }); }
    if (ty === '2-90') { b += '<polygon points="100,70 250,70 250,200 100,200" fill="#8c8f7d" stroke="#333" stroke-width="2"/><path d="M100 90 L118 90 L118 70" fill="none" stroke="' + C.red + '" stroke-width="2"/>' + t(175, 230, 'two planes meeting at ~90°', { size: 13 }); }
    if (ty === '2-60') { b += '<polygon points="90,200 150,80 290,80 230,200" fill="#6f8a6a" stroke="#333" stroke-width="2"/>' + t(128, 190, '~60°', { size: 12, fill: C.red, bold: true }) + t(262, 98, '~60°', { size: 12, fill: C.red, bold: true }) + t(170, 100, '~120°', { size: 12, fill: C.red, bold: true }) + t(190, 230, 'two planes NOT at 90° (~60°/120°)', { size: 13 }); }
    if (ty === '3-90') { b += '<polygon points="110,110 200,80 290,110 200,140" fill="#ddd" stroke="#333"/><polygon points="110,110 200,140 200,230 110,200" fill="#bbb" stroke="#333"/><polygon points="200,140 290,110 290,200 200,230" fill="#999" stroke="#333"/>' + t(200, 260, 'three planes, all at 90° → cubes', { size: 13 }); }
    if (ty === '3-rhomb') { b += '<polygon points="90,120 190,90 300,110 200,140" fill="#eee" stroke="#333"/><polygon points="90,120 200,140 230,230 120,210" fill="#ccc" stroke="#333"/><polygon points="200,140 300,110 330,200 230,230" fill="#aaa" stroke="#333"/>' + t(210, 260, 'three planes, not at 90° → rhombs', { size: 13 }); }
    if (ty === 'none') { b += '<path d="M90 190 C 70 120, 140 60, 210 70 C 280 80, 300 150, 270 200 C 230 240, 130 240, 90 190 Z" fill="#d9dde3" stroke="#333" stroke-width="2"/><path d="M130 170 C 150 130, 190 120, 230 140" fill="none" stroke="#888"/><path d="M140 195 C 170 160, 215 155, 250 170" fill="none" stroke="#888"/>' + t(190, 260, 'no planes → curved (conchoidal) fracture', { size: 13 }); }
    if (sp.hideCaption) b = b.replace(/<text[^>]*>[^<]*(planes|fracture)[^<]*<\/text>/g, '');
    return svg(380, 280, b, 'Broken mineral fragment illustrating cleavage type ' + ty);
  };
  // 6. Igneous classification chart (redrawn; follows textbook fig. 05.03.b1 shown in class)
  L.MEDIA.igchart = function (sp) {
    var hide = sp.hide || [], mark = sp.markers || {}, b = '', cols = ['FELSIC', 'INTERMEDIATE', 'MAFIC', 'ULTRAMAFIC'], x0 = 110, cw = 150;
    var names = { 'coarse-0': 'Granite', 'coarse-1': 'Diorite', 'coarse-2': 'Gabbro', 'coarse-3': 'Peridotite', 'fine-0': 'Rhyolite', 'fine-1': 'Andesite', 'fine-2': 'Basalt', 'fine-3': 'Komatiite (ultramafic lava)' };
    var fills = ['#f1d3c6', '#d6d6d6', '#a8a8a8', '#b6d3a2'];
    cols.forEach(function (c, i) { b += t(x0 + i * cw + cw / 2, 30, c, { bold: true, size: 13 }); });
    ['coarse', 'fine'].forEach(function (row, r) {
      b += t(60, 85 + r * 70, row === 'coarse' ? 'Coarse' : 'Fine', { bold: true, size: 13 }) + t(60, 101 + r * 70, row === 'coarse' ? '(intrusive)' : '(volcanic)', { size: 11, fill: C.mute });
      for (var i = 0; i < 4; i++) {
        var k = row + '-' + i;
        b += '<rect x="' + (x0 + i * cw) + '" y="' + (50 + r * 70) + '" width="' + cw + '" height="70" fill="' + fills[i] + '" stroke="#555"/>';
        if (mark[k]) b += mk(x0 + i * cw + cw / 2, 85 + r * 70, mark[k]);
        else if (hide.indexOf(k) < 0) b += t(x0 + i * cw + cw / 2, 90 + r * 70, names[k], { size: i === 3 && r === 1 ? 11 : 15, bold: true });
      }
    });
    // mineral bars (approximate extents, as in the class chart)
    var bars = [['Quartz', 0.0, 1.25, '#e8e8f0'], ['Potassium feldspar', 0.0, 1.35, '#f0c7b0'], ['Biotite', 0.0, 1.35, '#8a5a3a'], ['Plagioclase (Na-rich → Ca-rich)', 0.0, 2.6, '#cfc8b8'], ['Amphibole', 0.5, 1.9, '#4f8a7a'], ['Pyroxene', 1.6, 3.9, '#6d5f58'], ['Olivine', 2.3, 4.0, '#9cc47a']];
    bars.forEach(function (bar, i) {
      var y = 210 + i * 30, xa = x0 + bar[1] * cw, xb = x0 + bar[2] * cw;
      if (hide.indexOf('bar-' + i) >= 0) return;
      b += '<rect x="' + xa + '" y="' + y + '" width="' + (xb - xa) + '" height="22" rx="11" fill="' + bar[3] + '" stroke="#555"/>';
      if (mark['bar-' + i]) b += mk((xa + xb) / 2, y + 11, mark['bar-' + i]); else b += t((xa + xb) / 2, y + 16, bar[0], { size: 12, fill: i === 2 || i === 5 ? '#fff' : C.ink, bold: true });
    });
    b += t(60, 320, 'Minerals', { rot: -90, size: 12, fill: C.mute });
    b += '<line x1="' + x0 + '" y1="430" x2="' + (x0 + 4 * cw) + '" y2="430" stroke="#333"/>';
    [[0.4, '~70% silica'], [1.5, '~60%'], [2.5, '~45–50%'], [3.6, '~40%']].forEach(function (s) { b += t(x0 + s[0] * cw, 450, s[1], { size: 12 }); });
    b += t(x0, 472, 'lighter color', { anchor: 'start', size: 12, fill: C.mute }) + t(x0 + 4 * cw, 472, 'darker color', { anchor: 'end', size: 12, fill: C.mute });
    return svg(740, 485, b, 'Igneous rock classification by composition (columns) and grain size (rows), with mineral ranges below');
  };
  // 7. Pressure-temperature melting diagram
  L.MEDIA.pt = function (sp) {
    var b = '', X = function (v) { return 80 + v * 5.2; }, Y = function (v) { return 60 + v * 3.4; };
    b += '<rect x="80" y="60" width="520" height="340" fill="#efe6d2"/>';
    b += '<polygon points="' + X(35) + ',' + Y(0) + ' ' + X(100) + ',' + Y(0) + ' ' + X(100) + ',' + Y(100) + ' ' + X(80) + ',' + Y(100) + '" fill="#f6c9a8"/>';
    b += '<line x1="' + X(35) + '" y1="' + Y(0) + '" x2="' + X(80) + '" y2="' + Y(100) + '" stroke="#333" stroke-width="3"/>';
    if (sp.wet) b += '<line x1="' + X(15) + '" y1="' + Y(0) + '" x2="' + X(52) + '" y2="' + Y(100) + '" stroke="' + C.blue + '" stroke-width="3" stroke-dasharray="9 6"/>' + t(X(40), Y(92), 'wet', { fill: C.blue, bold: true, size: 13 }) + t(X(86), Y(92), 'dry', { bold: true, size: 13 });
    b += t(X(18), Y(45), 'SOLID', { bold: true, size: 16, fill: '#6b5b3b' }) + t(X(88), Y(35), 'LIQUID', { bold: true, size: 16, fill: '#a2481c' });
    b += t(340, 40, 'Temperature → (hotter)', { size: 14, bold: true }) + t(40, 230, 'Pressure / depth → (deeper)', { size: 14, bold: true, rot: -90 });
    b += t(X(55), Y(50) - 8, sp.curveLabel || 'melting curve (solidus)', { size: 12, rot: 62, fill: '#333' });
    (sp.paths || []).forEach(function (p) { b += arrow(X(p[0]), Y(p[1]), X(p[2]), Y(p[3]), p[4] || C.red, 3); });
    (sp.points || []).forEach(function (p) { b += '<circle cx="' + X(p[1]) + '" cy="' + Y(p[2]) + '" r="7" fill="#111"/>' + t(X(p[1]) + 16, Y(p[2]) + 5, p[0], { bold: true, size: 16, anchor: 'start' }); });
    return svg(640, 420, b, 'Pressure-temperature graph with a melting curve dividing solid and liquid fields');
  };
  // 8. Bowen's reaction series
  L.MEDIA.bowen = function (sp) {
    var hide = sp.hide || [], mark = sp.markers || {}, b = '';
    var disc = ['Olivine', 'Pyroxene', 'Amphibole', 'Biotite'], low = ['K-feldspar', 'Muscovite', 'Quartz'];
    function node(key, x, y, s) { if (mark[key]) return mk(x, y, mark[key]); if (hide.indexOf(key) >= 0) return t(x, y + 5, '?', { bold: true, size: 18 }); return t(x, y + 5, s, { bold: true, size: 14 }); }
    disc.forEach(function (d, i) { var y = 70 + i * 62; b += '<rect x="80" y="' + (y - 18) + '" width="150" height="34" rx="8" fill="#e6d8c0" stroke="#555"/>' + node('d' + i, 155, y, d); if (i < 3) b += arrow(155, y + 18, 155, y + 42, '#555', 2); });
    b += '<rect x="330" y="52" width="160" height="240" rx="10" fill="url(#plg)" stroke="#555"/><defs><linearGradient id="plg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a9a9a"/><stop offset="1" stop-color="#f1efe7"/></linearGradient></defs>';
    b += node('pca', 410, 80, 'Ca-rich plagioclase') + node('pna', 410, 270, 'Na-rich plagioclase') + arrow(410, 110, 410, 245, '#333', 2);
    b += t(410, 175, 'continuous', { size: 12, fill: C.mute }) + t(155, 330, 'discontinuous series', { size: 12, fill: C.mute });
    low.forEach(function (l, i) { var x = 150 + i * 130; b += '<rect x="' + (x - 58) + '" y="352" width="116" height="34" rx="8" fill="#f3efe6" stroke="#555"/>' + node('l' + i, x, 369, l); });
    b += arrow(40, 60, 40, 380, '#333', 2) + t(28, 70, 'HIGH T', { size: 11, rot: -90, bold: true }) + t(28, 370, 'LOW T', { size: 11, rot: -90, bold: true });
    b += t(600, 90, 'first to crystallize', { size: 12, anchor: 'end', fill: C.mute }) + t(600, 385, 'last to crystallize', { size: 12, anchor: 'end', fill: C.mute });
    return svg(620, 405, b, 'Bowen reaction series: mafic minerals and calcium-rich plagioclase crystallize at high temperature; quartz, muscovite, and K-feldspar at low temperature');
  };
  // 9. Plate boundary cross sections
  L.MEDIA.boundary = function (sp) {
    var ty = sp.type, show = !sp.markers, b = '', W = 760, H = 330;
    function sea(y) { return '<rect x="0" y="' + y + '" width="' + W + '" height="' + (H - y) + '" fill="' + C.water + '" opacity=".0"/>'; }
    if (ty === 'divergent') {
      b += '<rect x="20" y="40" width="720" height="70" fill="' + C.water + '"/>';
      b += '<path d="M20 125 L 330 105 L 360 95 L 372 110 L 388 110 L 400 95 L 430 105 L 740 125 L 740 170 L 20 170 Z" fill="' + C.ocean + '"/>';
      b += '<rect x="20" y="170" width="720" height="140" fill="' + C.astheno + '"/><path d="M340 300 Q 380 170 420 300 Z" fill="' + C.magma + '" opacity=".85"/>';
      b += arrow(300, 140, 150, 140, '#fff', 4) + arrow(460, 140, 610, 140, '#fff', 4);
      b += lbl(show, 380, 80, 'Narrow rift (trough) at ridge crest', 1, { size: 13 }) + lbl(show, 380, 240, 'Hot asthenosphere rises and partly melts', 2, { size: 13 }) + lbl(show, 170, 160, 'New oceanic crust moves away', 3, { size: 12, fill: '#fff' });
      if (sp.sediment) b += '<path d="M20 125 L 330 105 L 330 98 L 20 104 Z" fill="' + C.sed + '"/><path d="M740 125 L 430 105 L 430 98 L 740 104 Z" fill="' + C.sed + '"/>' + lbl(show, 110, 96, 'Sediment thicker away from ridge', 4, { size: 12 });
    }
    if (ty === 'ocean-ocean' || ty === 'ocean-continent') {
      var cont = ty === 'ocean-continent';
      b += '<rect x="20" y="40" width="720" height="60" fill="' + C.water + '"/>';
      b += '<path d="M20 100 L 400 100 L 440 118 L 700 300 L 640 310 L 400 140 L 20 140 Z" fill="' + C.ocean + '"/>';
      if (cont) b += '<path d="M430 100 L 470 70 L 560 20 L 620 40 L 740 60 L 740 150 L 560 170 L 470 118 Z" fill="' + C.cont + '"/>';
      else b += '<path d="M430 100 L 740 100 L 740 135 L 470 135 Z" fill="' + C.ocean + '"/><path d="M560 100 L 585 60 L 610 100 Z" fill="#6b4f3a"/>';
      b += '<rect x="20" y="140" width="720" height="180" fill="' + C.astheno + '" opacity=".6"/>';
      b += '<path d="M540 210 Q 560 150 575 ' + (cont ? '60' : '100') + '" stroke="' + C.magma + '" stroke-width="6" fill="none"/><ellipse cx="545" cy="215" rx="30" ry="14" fill="' + C.magma + '"/>';
      b += arrow(160, 120, 330, 120, '#fff', 4);
      b += lbl(show, 430, 112, 'Trench', 1, { size: 13 }) + lbl(show, 600, 250, 'Subducting slab releases water', 2, { size: 12 }) + lbl(show, 520, 190, 'Mantle melts (water added)', 3, { size: 12 }) + lbl(show, cont ? 565 : 585, cont ? 15 : 52, cont ? 'Volcanic mountain belt (e.g., Andes)' : 'Volcanic island arc (e.g., Japan)', 4, { size: 13 });
    }
    if (ty === 'continent-continent') {
      b += '<path d="M20 110 L 300 110 L 360 60 L 400 20 L 440 60 L 500 110 L 740 110 L 740 200 L 520 230 L 400 290 L 280 230 L 20 200 Z" fill="' + C.cont + '"/>';
      b += '<path d="M280 230 L 400 290 L 520 230 L 460 250 L 400 270 L 340 250 Z" fill="#b39468"/>';
      b += '<rect x="20" y="200" width="720" height="120" fill="' + C.astheno + '" opacity=".5"/>';
      b += arrow(120, 150, 260, 150, '#333', 4) + arrow(680, 150, 540, 150, '#333', 4);
      b += lbl(show, 400, 60, 'High mountains; wide deformation zone', 1, { size: 13 }) + lbl(show, 400, 250, 'Thick, buoyant crust; subduction stalls', 2, { size: 12 }) + lbl(show, 620, 90, 'Few volcanoes', 3, { size: 13 });
    }
    if (ty === 'transform') {
      b += '<rect x="20" y="30" width="720" height="280" fill="#cdd8e0"/>';
      b += '<line x1="120" y1="30" x2="120" y2="150" stroke="' + C.red + '" stroke-width="6"/><line x1="120" y1="150" x2="620" y2="150" stroke="' + C.green + '" stroke-width="6"/><line x1="620" y1="150" x2="620" y2="310" stroke="' + C.red + '" stroke-width="6"/>';
      b += '<line x1="20" y1="150" x2="120" y2="150" stroke="#777" stroke-width="3" stroke-dasharray="8 6"/><line x1="620" y1="150" x2="740" y2="150" stroke="#777" stroke-width="3" stroke-dasharray="8 6"/>';
      b += arrow(330, 110, 230, 110, '#333', 3) + arrow(410, 190, 510, 190, '#333', 3);
      b += lbl(show, 170, 70, 'Spreading segment', 1, { size: 13 }) + lbl(show, 370, 140, 'Active transform (plates slide past)', 2, { size: 13 }) + lbl(show, 680, 140, 'Inactive fracture zone', 3, { size: 12 });
      b += t(380, 300, 'map view', { size: 12, fill: C.mute });
    }
    if (ty === 'rift') {
      b += '<path d="M20 120 L 300 120 L 330 170 L 430 170 L 460 120 L 740 120 L 740 220 L 20 220 Z" fill="' + C.cont + '"/>';
      b += '<line x1="300" y1="120" x2="330" y2="220" stroke="#333" stroke-width="2"/><line x1="460" y1="120" x2="430" y2="220" stroke="#333" stroke-width="2"/>';
      b += '<rect x="20" y="220" width="720" height="100" fill="' + C.astheno + '"/><path d="M330 320 Q 380 200 430 320 Z" fill="' + C.magma + '" opacity=".8"/>';
      b += arrow(250, 180, 120, 180, '#333', 4) + arrow(510, 180, 640, 180, '#333', 4);
      b += lbl(show, 380, 150, 'Down-dropped rift valley', 1, { size: 13 }) + lbl(show, 380, 285, 'Rising mantle melts', 2, { size: 12, fill: '#fff' });
    }
    return svg(W, H, b, 'Cross section of a ' + ty + ' plate boundary');
  };
  // 10. Magnetic stripes (map view), symmetric about ridge
  L.MEDIA.stripes = function (sp) {
    var pat = sp.pattern || [3, 2, 4, 1, 2], b = '', mid = 380, x = 0, i, w;
    b += '<rect x="20" y="30" width="720" height="200" fill="#f8f4ea" stroke="#999"/>';
    var widths = pat.map(function (p) { return p * 16; });
    x = 0;
    for (i = 0; i < widths.length; i++) { w = widths[i]; var fill = i % 2 === 0 ? '#1f2328' : '#f8f4ea';
      b += '<rect x="' + (mid - x - w) + '" y="30" width="' + w + '" height="200" fill="' + fill + '" stroke="#999"/>';
      b += '<rect x="' + (mid + x) + '" y="30" width="' + w + '" height="200" fill="' + fill + '" stroke="#999"/>'; x += w; }
    if (sp.showRidge) b += '<line x1="' + mid + '" y1="20" x2="' + mid + '" y2="240" stroke="' + C.red + '" stroke-width="3" stroke-dasharray="6 4"/>' + t(mid, 256, 'ridge axis', { fill: C.red, size: 12 });
    (sp.labels || []).forEach(function (l) { b += mk(mid + l[1], 130, l[0]); });
    b += t(60, 262, 'black = normal polarity · white = reversed', { anchor: 'start', size: 12, fill: C.mute });
    return svg(760, 275, b, 'Map of seafloor magnetic stripes');
  };
  // 11. Hot spot island chain
  L.MEDIA.hotspot = function (sp) {
    var isl = sp.islands || [], b = '';
    b += '<rect x="20" y="30" width="720" height="220" fill="' + C.water + '"/>';
    isl.forEach(function (s) { b += '<ellipse cx="' + s.x + '" cy="' + s.y + '" rx="' + (s.r || 22) + '" ry="' + ((s.r || 22) * 0.7) + '" fill="' + (s.active ? '#6b4f3a' : '#9c8a6a') + '" stroke="#333"/>' + t(s.x, s.y + (s.r || 22) + 18, s.label, { bold: true, size: 13 }) + (s.age !== undefined ? t(s.x, s.y + (s.r || 22) + 34, s.age + ' Ma', { size: 12 }) : ''); if (s.active) b += '<circle cx="' + s.x + '" cy="' + s.y + '" r="6" fill="' + C.magma + '"/>'; });
    if (sp.scale) b += '<line x1="560" y1="235" x2="' + (560 + sp.scale.px) + '" y2="235" stroke="#111" stroke-width="3"/>' + t(560 + sp.scale.px / 2, 228, sp.scale.label, { size: 12 });
    return svg(760, 260, b, 'Map of a chain of volcanic islands and seamounts with ages');
  };
  // 12. Volcano profiles
  L.MEDIA.volcano = function (sp) {
    var ty = sp.type, b = '', base = 230;
    var shapes = {
      shield: 'M20 230 Q 200 120 380 105 Q 560 120 740 230 Z',
      composite: 'M180 230 Q 330 140 370 50 L 390 50 Q 430 140 580 230 Z',
      scoria: 'M300 230 L 360 150 L 380 158 L 400 150 L 460 230 Z',
      dome: 'M300 230 Q 305 150 380 140 Q 455 150 460 230 Z',
      caldera: 'M40 230 L 120 120 L 210 110 L 240 200 L 520 200 L 550 110 L 640 120 L 720 230 Z'
    };
    b += '<rect x="0" y="230" width="760" height="40" fill="#d2c5a6"/>';
    b += '<path d="' + shapes[ty] + '" fill="' + (ty === 'shield' ? '#5a4a42' : ty === 'scoria' ? '#7a3a2a' : ty === 'dome' ? '#8a8078' : '#7d7466') + '" stroke="#333" stroke-width="2"/>';
    if (ty === 'composite') b += '<path d="M230 200 L 530 200 M 260 170 L 500 170 M 290 140 L 470 140 M 320 110 L 440 110" stroke="#c9b99a" stroke-width="3" opacity=".7"/>';
    if (ty === 'caldera' && sp.dome) b += '<path d="M360 200 Q 380 170 400 200 Z" fill="#8a8078" stroke="#333"/>';
    if (sp.label) b += t(380, 262, sp.label, { bold: true });
    return svg(760, 270, b, 'Profile of a volcano (not to scale)');
  };
  // 13. Relative dating cross-section
  L.MEDIA.reldate = function (sp) {
    var layers = sp.layers || ['A', 'B', 'C'], b = '', W = 640, top = 40, H = 230, lh = H / layers.length;
    var pats = [C.rock1, C.rock3, C.rock2, C.rock4, '#d9cf9a', '#a9b8c9'];
    var tilt = sp.tilt ? 30 : 0;
    layers.forEach(function (l, i) { // i=0 bottom
      var y = top + H - (i + 1) * lh;
      b += '<polygon points="20,' + (y + tilt) + ' ' + (W - 20) + ',' + (y - tilt) + ' ' + (W - 20) + ',' + (y + lh - tilt) + ' 20,' + (y + lh + tilt) + '" fill="' + pats[i % pats.length] + '" stroke="#555"/>';
      b += t(60, y + lh / 2 + 5 + tilt * 0.8, l, { bold: true, size: 18 });
    });
    if (sp.unconf) { b += '<rect x="20" y="' + (top - 10) + '" width="' + (W - 40) + '" height="' + (lh * 0.0 + 1) + '" fill="none"/>'; }
    if (sp.fault) { var fx = sp.fault.x || 380, fy = top + H - sp.fault.upto * lh; b += '<line x1="' + (fx - 40) + '" y1="' + (top + H) + '" x2="' + (fx + 30) + '" y2="' + fy + '" stroke="' + C.red + '" stroke-width="4"/>' + t(fx + 48, fy + 10, sp.fault.label || 'F', { bold: true, size: 18, fill: C.red }); }
    if (sp.dike) { var dx = sp.dike.x || 250, dy = top + H - sp.dike.upto * lh; b += '<polygon points="' + (dx - 12) + ',' + (top + H) + ' ' + (dx + 12) + ',' + (top + H) + ' ' + (dx + 10) + ',' + dy + ' ' + (dx - 10) + ',' + dy + '" fill="' + C.dike + '"/>' + t(dx, dy - 8, sp.dike.label || 'D', { bold: true, size: 18, fill: C.dike }); if (sp.dike.baked) b += '<rect x="' + (dx - 18) + '" y="' + dy + '" width="36" height="' + (top + H - dy) + '" fill="none" stroke="#e67e22" stroke-width="3" stroke-dasharray="4 3"/>'; }
    if (sp.cap) { b += '<rect x="20" y="' + (top - 26) + '" width="' + (W - 40) + '" height="26" fill="#e5dcc0" stroke="#555"/>' + t(60, top - 8, sp.cap, { bold: true, size: 16 }); b += '<path d="M20 ' + top + ' Q 200 ' + (top - 6) + ' 320 ' + top + ' T ' + (W - 20) + ' ' + top + '" stroke="#333" stroke-width="2" fill="none"/>'; }
    return svg(W, top + H + 20, b, 'Geologic cross section with lettered rock units' + (sp.fault ? ', a fault' : '') + (sp.dike ? ', and an intrusion' : ''));
  };
  // 14. Topographic profile with labeled points
  L.MEDIA.topo = function (sp) {
    var pts = sp.pts || [], b = '', maxE = sp.maxE || 3000, Y = function (e) { return 230 - (e / maxE) * 190; };
    b += '<rect x="20" y="' + Y(0) + '" width="720" height="' + (250 - Y(0)) + '" fill="' + C.water + '"/>';
    var d = 'M20 ' + Y(sp.left || 200);
    (sp.profile || [[120, 900], [240, 2600], [330, 1400], [450, 2100], [600, 300], [740, 100]]).forEach(function (p) { d += ' L ' + p[0] + ' ' + Y(p[1]); });
    d += ' L 740 250 L 20 250 Z'; b += '<path d="' + d + '" fill="#9aaf7a" stroke="#333" stroke-width="2"/>';
    pts.forEach(function (p) { b += '<circle cx="' + p.x + '" cy="' + Y(p.e) + '" r="6" fill="#111"/>' + t(p.x, Y(p.e) - 14, p.label + (p.show !== false ? ' (' + p.e.toLocaleString() + ' m)' : ''), { bold: true, size: 13 }); });
    b += t(700, Y(0) + 16, 'sea level', { size: 11, fill: '#123', anchor: 'end' });
    return svg(760, 260, b, 'Topographic profile with labeled points and elevations');
  };
  // 15. Intrusion geometries
  L.MEDIA.intrusions = function (sp) {
    var show = !sp.markers, b = '';
    for (var i = 0; i < 6; i++) b += '<rect x="20" y="' + (60 + i * 38) + '" width="720" height="38" fill="' + (i % 2 ? C.rock1 : '#e3d6b6') + '"/>';
    b += '<path d="M20 60 Q 380 55 740 60" fill="none" stroke="#333"/>';
    b += '<polygon points="140,288 160,288 155,60 145,60" fill="' + C.dike + '"/>';
    b += '<rect x="240" y="170" width="220" height="12" fill="' + C.dike + '"/><rect x="250" y="182" width="12" height="106" fill="' + C.dike + '"/>';
    b += '<path d="M520 180 Q 600 100 680 180 Z" fill="' + C.dike + '"/><rect x="594" y="180" width="12" height="108" fill="' + C.dike + '"/>';
    b += lbl(show, 150, 50, 'Dike; cuts across layers', 1, { size: 12 }) + lbl(show, 350, 160, 'Sill; parallel to layers', 2, { size: 12 }) + lbl(show, 600, 95, 'Laccolith; bulges layers up', 3, { size: 12 });
    return svg(760, 300, b, 'Cross section with a steep sheet cutting layers, a sheet parallel to layers, and a lens that domes overlying layers');
  };
  // 16. Volcanic hazard map: valleys, wind, villages
  L.MEDIA.hazard = function (sp) {
    var b = '', vx = 380, vy = 190;
    b += '<rect x="20" y="20" width="720" height="340" fill="#cfdcb6"/>';
    for (var r = 150; r >= 30; r -= 30) b += '<circle cx="' + vx + '" cy="' + vy + '" r="' + r + '" fill="none" stroke="#7a8a5a" stroke-width="1.5"/>';
    b += '<circle cx="' + vx + '" cy="' + vy + '" r="14" fill="#6b4f3a"/>' + t(vx, vy + 5, '▲', { size: 12, fill: '#fff' });
    (sp.valleys || []).forEach(function (v) { b += '<path d="' + v + '" fill="none" stroke="#3a6ea5" stroke-width="5" stroke-linecap="round"/>'; });
    if (sp.wind) { var w = sp.wind; b += arrow(w[0], w[1], w[2], w[3], '#b03a2e', 5) + t((w[0] + w[2]) / 2, (w[1] + w[3]) / 2 - 12, 'prevailing wind', { size: 12, fill: '#b03a2e', bold: true }); }
    (sp.villages || []).forEach(function (v) { b += '<rect x="' + (v.x - 9) + '" y="' + (v.y - 9) + '" width="18" height="18" fill="#fff" stroke="#111" stroke-width="2"/>' + t(v.x, v.y - 14, v.label, { bold: true, size: 16 }); });
    b += t(700, 350, 'blue = valleys draining the volcano', { size: 11, anchor: 'end', fill: '#1f3b5a' });
    return svg(760, 370, b, 'Map of a steep composite volcano with valleys, prevailing wind, and villages');
  };
  // 17. Earthquake/volcano belt vs plate boundary schematic (continental margin cross section South America)
  L.MEDIA.samerica = function (sp) {
    var show = !sp.markers, b = '';
    b += '<rect x="20" y="60" width="720" height="50" fill="' + C.water + '"/>';
    b += '<path d="M20 110 L 140 110 L 170 130 L 250 250 L 220 260 L 150 140 L 20 140 Z" fill="' + C.ocean + '"/>';
    b += '<path d="M160 110 L 200 60 L 240 30 L 280 60 L 330 90 L 520 95 L 560 110 L 600 150 L 600 170 L 200 170 Z" fill="' + C.cont + '"/>';
    b += '<path d="M560 110 L 740 118 L 740 140 L 600 150 Z" fill="' + C.ocean + '"/><path d="M660 112 L 670 104 L 680 113 Z" fill="#555"/>';
    b += '<rect x="20" y="170" width="720" height="110" fill="' + C.astheno + '" opacity=".55"/>';
    b += lbl(show, 150, 100, 'Trench', 1, { size: 12 }) + lbl(show, 240, 22, 'Andes: mountains + volcanoes', 2, { size: 12 }) + lbl(show, 420, 88, 'Low-relief interior', 3, { size: 12 }) + lbl(show, 560, 102, 'Passive margin (not a plate boundary)', 4, { size: 12 }) + lbl(show, 670, 96, 'Mid-Atlantic Ridge', 5, { size: 12 });
    return svg(760, 290, b, 'West-to-east cross section from the Pacific trench across South America to the Mid-Atlantic Ridge');
  };
  // 18. Rift stages
  L.MEDIA.riftstage = function (sp) {
    var st = sp.stage, b = '';
    b += '<rect x="20" y="170" width="520" height="80" fill="' + C.astheno + '"/>';
    if (st === 'uplift') b += '<path d="M20 120 Q 280 70 540 120 L 540 170 L 20 170 Z" fill="' + C.cont + '"/><path d="M230 170 Q 280 110 330 170 Z" fill="' + C.magma + '"/>';
    if (st === 'rift') b += '<path d="M20 110 L 230 95 L 250 140 L 310 140 L 330 95 L 540 110 L 540 170 L 20 170 Z" fill="' + C.cont + '"/><path d="M240 170 Q 280 120 320 170 Z" fill="' + C.magma + '"/>';
    if (st === 'sea') b += '<path d="M20 110 L 200 100 L 225 150 L 240 150 L 240 170 L 20 170 Z" fill="' + C.cont + '"/><path d="M540 110 L 360 100 L 335 150 L 320 150 L 320 170 L 540 170 Z" fill="' + C.cont + '"/><rect x="225" y="120" width="110" height="30" fill="' + C.water + '"/><rect x="240" y="150" width="80" height="20" fill="' + C.ocean + '"/>';
    if (st === 'ocean') b += '<path d="M20 110 L 90 100 L 110 150 L 20 150 Z" fill="' + C.cont + '"/><path d="M540 110 L 470 100 L 450 150 L 540 150 Z" fill="' + C.cont + '"/><rect x="100" y="110" width="360" height="40" fill="' + C.water + '"/><rect x="100" y="150" width="360" height="20" fill="' + C.ocean + '"/><path d="M270 150 L 280 140 L 290 150 Z" fill="#555"/>';
    if (sp.label) b += t(280, 40, sp.label, { bold: true });
    return svg(560, 260, b, 'Stage of continental rifting');
  };
  L.MEDIA_COLORS = C;
})(typeof window !== 'undefined' ? window : globalThis);
