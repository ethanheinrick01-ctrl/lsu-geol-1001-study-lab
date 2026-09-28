/* Motion overlays on existing GEOL 1001 course figures. No progress state is touched. */
(function (L) {
  'use strict';

  var films = {"T1": {"seconds": 32, "chapters": [[0, "Weather and transport"], [8, "Burial and lithification"], [16, "Metamorphism"], [24, "Melt and crystallize"]], "description": "Grains erode, settle, compact, deform, melt and crystallize.", "source": "L1b slide 29"}, "T2": {"seconds": 30, "chapters": [[0, "Precambrian"], [7.5, "Paleozoic"], [15, "Mesozoic"], [22.5, "Cenozoic"]], "description": "Build the course time blocks from older to younger.", "source": "L2 slide 24"}, "T3": {"seconds": 32, "chapters": [[0, "Build magnetic stripes"], [20, "Watch the plate age"]], "description": "Create paired magnetic bands, then cool and thicken the plate.", "source": "L3 slides 23, 40, 42"}, "T4": {"seconds": 30, "chapters": [[0, "Divergent"], [10, "Convergent"], [20, "Transform"]], "description": "Open a ridge, bend a slab, and offset a river.", "source": "L3 slides 20, 24, 37"}, "T5": {"seconds": 30, "chapters": [[0, "Earth layers"], [10, "Change thickness"], [20, "Change density"]], "description": "Expose Earth’s layers and change a floating block’s balance.", "source": "L1b slides 12, 14, 16"}, "T6": {"seconds": 30, "chapters": [[0, "First volcano"], [12, "A chain grows"], [24, "Trace plate motion"]], "description": "Grow volcanoes over a plume and carry them away on a plate.", "source": "L3 slide 43; textbook 5.11"}, "T7": {"seconds": 30, "chapters": [[0, "Add heat"], [10, "Reduce pressure"], [20, "Add water"]], "description": "Connect each graph path to melt appearing between solid grains.", "source": "Textbook 5.5, figures 28–30"}, "T8": {"seconds": 30, "chapters": [[0, "Crystal nuclei"], [10, "Growth"], [20, "Final textures"]], "description": "Grow coarse, fine and porphyritic textures from magma.", "source": "Textbook 5.1 and 5.8"}, "T9": {"seconds": 28, "chapters": [[0, "Bubble formation"], [12, "Expansion"], [24, "Frozen vesicles"]], "description": "Expand gas bubbles and preserve their cavities in solid rock.", "source": "Textbook 5.1 and 5.3"}, "T10": {"seconds": 26, "chapters": [[0, "Start cooling"], [10, "Compare crystal growth"], [20, "Read the rock names"]], "description": "Hold composition steady while changing crystal size.", "source": "Class chart; textbook 5.2–5.3"}, "T11": {"seconds": 26, "chapters": [[0, "Build a tetrahedron"], [10, "Share corner oxygen"]], "description": "Assemble Si and O, then link tetrahedra through shared corners.", "source": "Textbook 4.7, figures 09–10"}, "T12": {"seconds": 30, "chapters": [[0, "High-temperature minerals"], [12, "Continue cooling"], [21, "Partial melting"]], "description": "Crystallize minerals in sequence, then partly melt the rock.", "source": "Textbook 5.5 and 5.8"}, "T13": {"seconds": 30, "chapters": [[0, "Heat transfer"], [10, "Decompression"], [20, "Slab water"]], "description": "Heat rock, raise a mantle parcel, and release slab water.", "source": "Textbook 5.5; L3 slide 26"}, "T14": {"seconds": 30, "chapters": [[0, "Magma rises"], [10, "Add deposits"], [20, "Compare the shapes"]], "description": "Build shield and composite volcanoes through successive deposits.", "source": "Textbook 6.1, 6.3, 6.7"}, "T15": {"seconds": 30, "chapters": [[0, "Conduction"], [10, "Convection"], [20, "Radiation"]], "description": "Track energy transfer and the movement of material.", "source": "Textbook 5.4, figure 05.04.b4"}, "T16": {"seconds": 30, "chapters": [[0, "Ocean–ocean"], [10, "Ocean–continent"], [20, "Continent–continent"]], "description": "Subduct oceanic plates and thicken colliding continental crust.", "source": "L3 slides 25–30"}};

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
    var film = films[id];
    var src = 'videos/exam1/' + id + '.mp4?v=3.3.0';
    var poster = 'videos/exam1/' + id + '.png?v=3.3.0';
    var count = L.exam1.topicMetrics(t);
    var sources = t.media.map(function (m) { return m.cap; }).join(' · ');
    return '<section class="card ad-video" data-process-film="' + id + '" aria-label="' + id + ' animated study diagram">' +
      '<div class="ad-heading"><div><p class="eyebrow">' + id + ' · Textbook-inspired process film</p><h2>' + t.title + '</h2></div><span class="badge">' + film.seconds + ' seconds</span></div>' +
      '<p>' + film.description + '</p>' +
      '<video controls playsinline preload="metadata" poster="' + poster + '" aria-label="' + id + ' motion diagram: ' + t.title + '"><source src="' + src + '" type="video/mp4"><track kind="captions" src="videos/exam1/' + id + '.vtt?v=3.3.0" srclang="en" label="English">Your browser cannot play this video. <a href="' + src + '">Download the MP4</a>.</video>' +
      '<div class="ad-film-controls"><div class="ad-chapters" aria-label="Jump to a stage">' + film.chapters.map(function (c) { return '<button class="btn small" type="button" data-film-seek="' + c[0] + '">' + c[1] + '</button>'; }).join('') + '</div><label class="small">Speed <select data-film-speed aria-label="Playback speed for ' + id + '"><option value="0.5">0.5×</option><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option></select></label></div>' +
      '<div class="row"><button class="btn pri" data-topic="' + id + '">Practice ' + id + '</button><span class="badge">' + count.mastered + '/' + count.concepts + ' concepts mastered</span><a class="btn small" href="' + src + '" download>Save MP4</a></div>' +
      '<p class="small muted">Watching is study time. Checked practice answers build the same mastery record used by Guide and Practice.</p>' +
      '<p class="small muted ad-source">Teaching animation rebuilt from the visual relationships in: ' + sources + '. Textures follow the course art; motion and time are schematic. Compare with the original figures on this Learn page.</p></section>';
  }
  function forTopic(id) { return videoCard(id); }
  function gallery(nav) {
    return '<h1>Course figures in motion</h1><p class="lede">Follow the process from beginning to end. These sixteen films cover the Sep 24 Exam 1 review, with textbook-inspired cutaways, moving material, stage controls and links to practice.</p>' + nav +
      '<div class="ad-motion-index">' + L.EXAM1.topics.map(function (t) { var m = L.exam1.topicMetrics(t), f = films[t.id]; return '<a class="card ad-film-tile" href="#exam1/topic/' + t.id + '"><img src="videos/exam1/' + t.id + '.png?v=3.3.0" loading="lazy" width="1280" height="720" alt="Preview of ' + t.title + '"><div class="row"><span class="badge">' + t.id + '</span><span class="small muted">' + f.seconds + ' seconds</span></div><h2>' + t.title + '</h2><p class="small">' + f.description + '</p><span class="small muted">Watch & practice · ' + m.mastered + '/' + m.concepts + ' mastered</span></a>'; }).join('') + '</div>' +
      '<h2>Watch: boundaries in motion</h2>' + videoCard('T4') + '<h2>Watch: build a volcano</h2>' + videoCard('T14');
  }
  function render(el) {
    var f = figures[el.dataset.geolAnimation], stage = +el.dataset.stage, step = f.steps[stage];
    el.querySelector('.ad-count').textContent = 'Step ' + (stage + 1) + ' of ' + f.steps.length;
    el.querySelector('.ad-stage-name').textContent = step[0];
    el.querySelector('.ad-step').textContent = step[1];
    el.querySelectorAll('[data-ad-frame]').forEach(function (g) { g.classList.toggle('is-active', +g.dataset.adFrame === stage); });
  }
  function wire(root) {
    root.querySelectorAll('[data-process-film]').forEach(function (el) {
      var video = el.querySelector('video');
      el.querySelectorAll('[data-film-seek]').forEach(function (button) {
        button.onclick = function () {
          var seek = function () { video.currentTime = +button.dataset.filmSeek; video.play().catch(function () {}); };
          if (video.readyState >= 1) seek();
          else { video.addEventListener('loadedmetadata', seek, { once: true }); video.load(); }
        };
      });
      el.querySelector('[data-film-speed]').onchange = function (event) { video.playbackRate = +event.target.value; };
    });
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
