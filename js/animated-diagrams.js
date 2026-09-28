/* Motion overlays on existing GEOL 1001 course figures. No progress state is touched. */
(function (L) {
  'use strict';

  var figures = {
    cycle: {
      title: 'What can happen to a rock?',
      src: 'assets/img/slides/l1b-slide-29.jpg',
      alt: 'Lecture 1b slide 29 showing weathering, erosion and transport, deposition, burial, metamorphism, melting, solidification, and uplift around two rock blocks',
      source: 'Lecture 1b slide 29; Sep 24 review lines 529–800',
      foot: 'The slide shows several possible processes, not a required single loop. Metamorphism changes solid rock; melting produces magma.',
      steps: [
        ['Weathering', 'Weathering breaks exposed rock into smaller pieces.', [[52, 126, 191, 93]]],
        ['Erosion and transport', 'Erosion removes material; transport carries it toward a new setting.', [[445, 129, 345, 102]]],
        ['Deposition', 'Deposition drops the transported material near the coast and in water.', [[928, 288, 227, 96]]],
        ['Burial', 'New material piles on top. Burial can lead toward lithification or deeper changes.', [[1075, 417, 162, 303]]],
        ['Deformation and metamorphism', 'Heat, pressure, and fluids can change rock while it remains solid.', [[905, 725, 323, 125]]],
        ['Melting', 'Melting produces magma. This is a different process from metamorphism.', [[338, 764, 155, 91]]],
        ['Solidification', 'Cooling and crystallization solidify magma into igneous rock.', [[35, 797, 278, 98]]],
        ['Uplift', 'Uplift brings buried rock toward the surface, where weathering can act again.', [[46, 551, 171, 219]]]
      ]
    },
    stripes: {
      title: 'Magnetic stripes at a mid-ocean ridge',
      src: 'assets/img/slides/l3-slide-40.jpg',
      alt: 'Lecture 3 slide 40 showing three stages of magnetic reversals and mirrored seafloor stripes at a mid-ocean ridge',
      source: 'Lecture 3 slide 40; Sep 24 review lines 905–1300',
      foot: 'The three pictured stages are a schematic sequence. Matching bands on both sides of the ridge record field reversals as basalt cools.',
      steps: [
        ['Time 1: normal polarity', 'New basalt forms at the ridge and records the magnetic field direction as it cools.', [[620, 30, 347, 250]]],
        ['Time 2: reversed polarity', 'New crust records the reversed field. The earlier normal-polarity bands move outward on both sides.', [[467, 311, 504, 294]]],
        ['A longer stripe sequence', 'Continued spreading and reversals build matching sequences to the left and right of the ridge.', [[263, 650, 703, 293]]],
        ['Compare the paired bands', 'Trace equal-colored bands away from the ridge. The mirror pattern is the key observation.', [[339, 671, 162, 218], [771, 671, 162, 218]]]
      ]
    },
    age: {
      title: 'Seafloor age and sediment away from the ridge',
      src: 'assets/img/slides/l3-slide-42.jpg',
      alt: 'Lecture 3 slide 42 showing the mid-ocean ridge, ocean-floor drill cores, and sediment thickening away from the ridge',
      source: 'Lecture 3 slide 42; Sep 24 review lines 905–1300',
      foot: 'This describes the general trend away from an undisturbed ridge. The diagram separates oceanic volcanic rock from sediment accumulating above it.',
      steps: [
        ['Start at the ridge', 'New oceanic volcanic rock is youngest near the ridge axis.', [[573, 489, 208, 248]]],
        ['Move outward', 'Rock on both sides is generally older farther from the ridge.', [[110, 466, 291, 254], [902, 466, 286, 254]]],
        ['Read the drill cores', 'The cores compare sediment over volcanic rock at different distances.', [[180, 183, 454, 165], [707, 183, 438, 165]]],
        ['More time to accumulate', 'Sediment cover is generally thicker farther from the ridge.', [[177, 190, 130, 148], [1007, 190, 134, 148]]]
      ]
    }
  };

  function outlines(def) {
    return def.steps.map(function (step, i) {
      return '<g class="ad-focus" data-ad-frame="' + i + '">' + step[2].map(function (r) {
        return '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" rx="22"/>';
      }).join('') + '</g>';
    }).join('');
  }
  function card(kind) {
    var f = figures[kind];
    return '<section class="card ad-demo" data-geol-animation="' + kind + '" data-stage="0" aria-label="Animated ' + f.title + '">' +
      '<div class="ad-heading"><div><p class="eyebrow">Course figure brought to life · sample</p><h2>' + f.title + '</h2></div><span class="badge">Original slide + motion</span></div>' +
      '<div class="ad-figure-frame"><img src="' + f.src + '" alt="' + f.alt + '" width="1280" height="960" loading="lazy">' +
      '<svg viewBox="0 0 1280 960" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' + outlines(f) + '</svg></div>' +
      '<div class="ad-controls" aria-label="Animation controls"><button class="btn small" type="button" data-ad-action="prev" aria-label="Previous step">← Back</button><button class="btn small pri" type="button" data-ad-action="play" aria-pressed="false">Play</button><button class="btn small" type="button" data-ad-action="next" aria-label="Next step">Next →</button><span class="ad-count" aria-live="off"></span><button class="btn small ghost" type="button" data-zoom="' + f.src + '" data-cap="' + f.alt + '">Enlarge original</button></div>' +
      '<p class="ad-stage-name"></p><p class="ad-step" aria-live="polite"></p><p class="small muted">' + f.foot + '</p>' +
      '<p class="small muted ad-source">Image: ' + f.source + '. Motion is a teaching overlay on that same image.</p></section>';
  }
  function videoCard(id) {
    var t = L.EXAM1.topics.find(function (item) { return item.id === id; });
    if (!t) return '';
    var isT3 = id === 'T3';
    var src = isT3 ? 'videos/seafloor-spreading-sample.mp4' : 'videos/exam1/' + id + '.mp4';
    var poster = isT3 ? 'videos/seafloor-spreading-poster.png' : 'videos/exam1/' + id + '.png';
    var count = L.exam1.topicMetrics(t);
    var sources = t.media.map(function (m) { return m.cap; }).join(' · ');
    return '<section class="card ad-video" aria-label="' + id + ' animated study diagram">' +
      '<div class="ad-heading"><div><p class="eyebrow">' + id + ' · Original motion study</p><h2>' + t.title + '</h2></div><span class="badge">' + (isT3 ? '24' : '12') + ' seconds</span></div>' +
      '<p>Watch the process, then answer questions to build mastery. The video is study material; only checked answers count.</p>' +
      '<video controls playsinline preload="metadata" poster="' + poster + '" aria-label="' + id + ' motion diagram: ' + t.title + '"><source src="' + src + '" type="video/mp4">Your browser cannot play this video.</video>' +
      '<div class="row"><button class="btn pri" data-topic="' + id + '">Practice ' + id + '</button><span class="badge">' + count.mastered + '/' + count.concepts + ' concepts mastered</span><a class="btn small" href="' + src + '" download>Save MP4</a></div>' +
      '<p class="small muted ad-source">Original schematic based on the course figures shown below: ' + sources + '. Motion is explanatory and not to scale.</p></section>';
  }
  function forTopic(id) { return videoCard(id) + (id === 'T1' ? card('cycle') : id === 'T3' ? card('stripes') + card('age') : ''); }
  function gallery(nav) {
    return '<h1>Course figures in motion</h1><p class="lede">Sixteen short motion studies follow the Sep 24 Exam 1 review. Each Learn page keeps the original course figure beside its animation and links straight to practice. All checked answers use the same mastery record as Guide and Practice.</p>' + nav +
      '<div class="ad-motion-index">' + L.EXAM1.topics.map(function (t) { var m = L.exam1.topicMetrics(t); return '<a class="card" href="#exam1/topic/' + t.id + '"><span class="badge">' + t.id + '</span><h2>' + t.title + '</h2><span class="small muted">Watch motion study · ' + m.mastered + '/' + m.concepts + ' mastered</span></a>'; }).join('') + '</div>' +
      '<h2>Sample: seafloor spreading</h2>' + videoCard('T3') + card('cycle') + card('stripes') + card('age');
  }
  function render(el) {
    var f = figures[el.dataset.geolAnimation], stage = +el.dataset.stage, step = f.steps[stage];
    el.querySelector('.ad-count').textContent = 'Step ' + (stage + 1) + ' of ' + f.steps.length;
    el.querySelector('.ad-stage-name').textContent = step[0];
    el.querySelector('.ad-step').textContent = step[1];
    el.querySelectorAll('[data-ad-frame]').forEach(function (g) { g.classList.toggle('is-active', +g.dataset.adFrame === stage); });
  }
  function wire(root) {
    root.querySelectorAll('[data-geol-animation]').forEach(function (el) {
      var f = figures[el.dataset.geolAnimation], timer = null, play = el.querySelector('[data-ad-action="play"]');
      render(el);
      function stop() { if (timer) clearInterval(timer); timer = null; play.textContent = 'Play'; play.setAttribute('aria-pressed', 'false'); }
      function advance(delta) { el.dataset.stage = (+el.dataset.stage + delta + f.steps.length) % f.steps.length; render(el); }
      el.querySelector('[data-ad-action="prev"]').onclick = function () { stop(); advance(-1); };
      el.querySelector('[data-ad-action="next"]').onclick = function () { stop(); advance(1); };
      play.onclick = function () {
        if (timer) { stop(); return; }
        play.textContent = 'Pause'; play.setAttribute('aria-pressed', 'true');
        timer = setInterval(function () { if (!el.isConnected) { stop(); return; } advance(1); }, 2700);
      };
    });
  }
  L.animatedDiagrams = { forTopic: forTopic, gallery: gallery, wire: wire };
})(window.L);
