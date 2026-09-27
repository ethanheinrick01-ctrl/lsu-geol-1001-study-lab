/* Interactive widgets attached to guide sections. Hook keys are section ids; widgets mount into [data-hook] placeholders. */
(function (root) {
  'use strict';
  var L = root.L = root.L || {}, U = L.util, esc = U.esc;
  var IG = {
    felsic: { coarse: 'Granite', fine: 'Rhyolite', silica: '~70–77%', min: 'quartz, K-feldspar, Na-rich plagioclase, biotite, muscovite', color: 'light' },
    intermediate: { coarse: 'Diorite', fine: 'Andesite', silica: '~60%', min: 'plagioclase, amphibole, biotite, some pyroxene; little quartz', color: 'medium gray' },
    mafic: { coarse: 'Gabbro', fine: 'Basalt', silica: '~44–50%', min: 'Ca-rich plagioclase, pyroxene, some olivine', color: 'dark' },
    ultramafic: { coarse: 'Peridotite', fine: 'Komatiite (rare, very old lava)', silica: 'lowest', min: 'olivine and pyroxene', color: 'dark green to black' }
  };
  var GRAIN = { coarse: 'coarse (crystals visible): cooled slowly at depth, intrusive', fine: 'fine (crystals not visible): cooled quickly at or near the surface, volcanic' };
  function igclass(host) {
    host.innerHTML = '<div class="card widget"><b>Try the chart:</b> ' +
      '<label>Composition <select data-k="comp">' + Object.keys(IG).map(function (k) { return '<option value="' + k + '">' + k + '</option>'; }).join('') + '</select></label> ' +
      '<label>Grain size <select data-k="grain"><option value="coarse">coarse</option><option value="fine">fine</option></select></label>' +
      '<div class="out" aria-live="polite"></div></div>';
    var sc = host.querySelector('[data-k="comp"]'), sg = host.querySelector('[data-k="grain"]'), out = host.querySelector('.out');
    function upd() {
      var c = IG[sc.value], g = sg.value, other = g === 'coarse' ? c.fine : c.coarse;
      out.innerHTML = '<p class="big"><b>' + esc(c[g]) + '</b></p><p class="small">' + esc(sc.value) + ' · silica ' + esc(c.silica) + ' · ' + esc(c.color) + '<br>Minerals: ' + esc(c.min) + '<br>Texture: ' + esc(GRAIN[g]) + '<br>Same composition, other grain size: <b>' + esc(other) + '</b></p>';
    }
    sc.onchange = upd; sg.onchange = upd; upd();
  }
  L.GUIDE_HOOKS = {
    c5s2: function (main) { main.querySelectorAll('[data-hook="igclass"]').forEach(igclass); }
  };
})(typeof window !== 'undefined' ? window : globalThis);
