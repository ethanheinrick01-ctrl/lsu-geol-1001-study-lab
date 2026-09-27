/* Chapter 2; Investigating Geologic Questions. Evidence: Lecture 2 (32 slides; no classroom stop marker).
   Slide 18's geologic map and slides 23–24's timescale render blank in the deck; the embedded timescale TIFF was recovered (atlas). */
(function (L) {
  'use strict';
  var A = L.A, S = function (n) { return 'assets/img/slides/l2-slide-' + n + '.jpg'; };
  function img(n, cap) { return { kind: 'img', src: S(n), cap: cap, alt: cap }; }
  var TS = { kind: 'img', src: 'assets/img/atlas/geologic-timescale-ch2.jpg', cap: 'Geologic timescale embedded in Lec 2 s24 (recovered from the deck; ages in millions of years, Ma).', alt: 'Geologic timescale: Cenozoic, Mesozoic, Paleozoic eras with periods and boundary ages' };

  // ---------- 2.1 ----------
  A.section({ id: 'c2s1', ch: 2, n: '2.1', title: 'Observe, describe, and represent', srcText: 'Lec 2 s2–8', src: ['L2:2', 'L2:3', 'L2:6', 'L2:8'],
    concepts: [['c2-observe', 'What to observe in a landscape'], ['c2-sketch', 'Sketches and simplified views'], ['c2-analog', 'Compare rocks to modern environments']] });
  A.cards('c2s1', [
    { id: 'g2-1a', h: 'A checklist for looking at a landscape', c: ['c2-observe'], src: ['L2:3', 'L2:4'],
      html: '<p>Lecture 2\'s labeled hillside gives a practical checklist: <b>different parts of the hill; various colors; ledges that reflect layers; color that is only a stain on the outside of the rock; fractures; loose pieces vs. solid bedrock; loose pieces covering reddish rocks on the slope; rounded vs. angular corners</b>. Colored overlays group similar features into main rock units (slide 4).</p>',
      media: [img(3, 'Lec 2 s3: features to observe'), img(4, 'Lec 2 s4: similar features colored alike = rock units')],
      traps: ['Treating a surface stain as the rock\'s real color.', 'Mapping loose slope debris as if it were the bedrock beneath it.'] },
    { id: 'g2-1b', h: 'Sketches emphasize what matters', c: ['c2-sketch'], src: ['L2:5', 'L2:6'],
      html: '<p>A field sketch of the mesa (slide 6) keeps the ledges, cliffs, fractures, layers, and loose material, labels them, and drops distracting detail such as individual bushes. A sketch is a model: it selects information. Exam “investigation” questions often show a simplified diagram instead of a photo, so practice moving between the two.</p>', media: [img(5, 'Lec 2 s5: photo'), img(6, 'Lec 2 s6: the same view as a labeled sketch')] },
    { id: 'g2-1c', h: 'Use modern environments to interpret old rocks', c: ['c2-analog'], src: ['L2:7', 'L2:8'],
      html: '<p>Slide 8 asks which modern setting made deposits most like an outcrop full of <b>rounded pebbles</b>: a <b>steep mountain front</b> (angular, broken pieces that have not traveled far) or a <b>river with pebbles</b> (rounded by transport). Rounded clasts match the river. Present-day processes are the key for reading past ones.</p>', media: img(8, 'Lec 2 s8: outcrop vs. two modern environments'),
      traps: ['Matching by color instead of by clast shape and sorting.'] }
  ]);
  A.ms('c2-observe-s1', 'c2-observe', 'You are describing a red-and-tan hillside for the first time. Which belong in your <b>observations</b>? Select all that apply.',
    ['*Ledges that follow horizontal layers|Visible geometry.', '*Loose angular pieces covering part of the lower slope|Visible material and shape.', '*A dark coating on some surfaces that differs from the fresh rock|Observable; noting it prevents mistaking a stain for rock color.',
     'The layers formed in an ancient river system|This is an inference about origin.'],
    'Lecture 2 slide 3 lists layers, fractures, colors, stains, loose pieces vs. bedrock, and rounded vs. angular corners as things to observe.', ['L2:3']);
  A.mc('c2-observe-m1', 'c2-observe', 'On a hillside, a thin dark coating covers exposed rock, but a freshly broken surface is light tan. What color should you record for the rock unit?',
    ['*Light tan, noting the dark coating as a surface stain|Lecture 2 flags that some color is only a stain on the outside of the rock.',
     'Dark, because most of the exposed surface is dark|Surface coatings can hide the rock\'s real color.', 'Both, because two colors always mean two different rock units are present|A coating on one unit is not a second unit.', 'Neither; color is never recorded|Color is a basic observation, just not a stain\'s color.'],
    'Slide 3: “Some color looks to be a stain on outside of rock.”', ['L2:3']);
  A.tf('c2-sketch-t1', 'c2-sketch', 'A good geologic field sketch should include every bush and rock visible in the photograph so nothing is lost.', false, 'Lecture 2 slides 5–6: a sketch selects and labels the important features (ledges, cliffs, fractures, layers, loose material) and leaves out distractions such as individual bushes.', ['L2:5', 'L2:6']);
  A.mc('c2-sketch-m1', 'c2-sketch', 'Why might a geologist draw a labeled sketch of a cliff instead of relying only on a photograph?',
    ['*A sketch selects and labels the important features, like layers, fractures, and loose debris|Slide 6 shows a sketch highlighting ledges, fractures, and layers.',
     'Sketches are more accurate than photographs in every single detail of shape and color|Sketches simplify; photos record more raw detail.', 'Photographs cannot show layers|The photo on slide 5 shows layers.', 'Sketches remove the need for any observations|Sketches are built from observations.'],
    'Lecture 2 slides 5–6 pair a photo with a sketch and ask whether the sketch changes how you look at the photo.', ['L2:5', 'L2:6']);
  A.mc('c2-analog-m1', 'c2-analog', 'An old rock is made mostly of rounded, smooth pebbles. Which modern environment from Lecture 2 produces the most similar deposit?',
    ['*A river carrying pebbles|Transport in water rounds pebbles.', 'A steep mountain front|Pieces there are angular because they have not been transported far.', 'A glacier-free desert cliff face|This is bedrock, not a pebble deposit.', 'A lava flow|Lava forms igneous rock, not a pebble deposit.'],
    'Slide 8 compares the outcrop with a steep mountain front and a river with pebbles; rounding points to the river.', ['L2:8']);
  A.tf('c2-analog-t1', 'c2-analog', 'Angular rock fragments usually indicate they traveled a long distance before being deposited.', false,
    'Angular pieces have had little transport (as at a steep mountain front); long transport rounds them.', ['L2:8', 'L1B:20']);

  // ---------- 2.2 ----------
  A.section({ id: 'c2s2', ch: 2, n: '2.2', title: 'Landscape change and relative dating', srcText: 'Lec 2 s9–14', src: ['L2:9', 'L2:10', 'L2:11', 'L2:12', 'L2:13', 'L2:14'],
    concepts: [['c2-landscape', 'Mesa → butte → knobs'], ['c2-reldate', 'Relative-dating principles'], ['c2-sequence', 'Reconstructing a sequence of events']] });
  A.cards('c2s2', [
    { id: 'g2-2a', h: 'Erosion shrinks a mesa into a butte, then knobs', c: ['c2-landscape'], src: ['L2:9'],
      html: '<p>Three models show one landscape through time: a broad flat-topped <b>mesa</b>, eroded into a narrower <b>butte</b>, then into small <b>knobs</b>. The resistant cap protects the rock below until erosion removes it. Order: <b>mesa → butte → knobs</b>.</p>', media: img(9, 'Lec 2 s9') },
    { id: 'g2-2b', h: 'Four principles for ordering events', c: ['c2-reldate'], src: ['L2:10', 'L2:11', 'L2:12', 'L2:13'],
      html: '<table><tr><th>Principle</th><th>Rule</th><th>What you see</th></tr>' +
        '<tr><td>Position of layers (superposition)</td><td>Lower layers were deposited first; the youngest layer is on top.</td><td>Undisturbed stack of layers</td></tr>' +
        '<tr><td>Cross-cutting relations</td><td>A feature that cuts across rocks is younger than the rocks it cuts.</td><td>A fault or dike through layers</td></tr>' +
        '<tr><td>Pieces of older rock (inclusions / clasts)</td><td>A unit that contains pieces of another unit is younger than those pieces.</td><td>Pebbles of unit X inside unit Y</td></tr>' +
        '<tr><td>Contact effects (baking)</td><td>Magma bakes the older rocks it touches; the baked rock is older than the intrusion.</td><td>A changed rim next to an intrusion</td></tr></table>' +
        '<p>These give <b>relative</b> order (older/younger), not ages in years.</p>',
      media: [img(10, 'Lec 2 s10: position of layers'), img(11, 'Lec 2 s11: cross-cutting'), img(12, 'Lec 2 s12: pieces of older rock'), img(13, 'Lec 2 s13: contact effects')],
      traps: ['Reversing inclusions: the rock <i>containing</i> the pieces is younger.', 'Thinking a fault is older because it goes deeper; it is younger than everything it cuts.', 'Assigning numeric ages from relative order.'] },
    { id: 'g2-2c', h: 'Putting a sequence together', c: ['c2-sequence'], src: ['L2:14', 'L2:21'],
      html: '<p>Slide 14 shows a <b>lower tilted unit</b>, a <b>middle sandy unit</b>, and an <b>upper coarse unit</b>. Superposition puts the lower unit first. The middle unit lies flat on top of tilted layers, so <b>tilting (and erosion of the tilted beds) happened after the lower unit formed but before the middle unit was deposited</b>. The upper coarse unit is youngest. Always list events, not just rock units: deposition, tilting, faulting, intrusion, erosion.</p>',
      media: img(14, 'Lec 2 s14: determine the relative ages of three units'),
      traps: ['Leaving out non-deposition events (tilting, erosion) when asked for a sequence of events.'] }
  ]);
  A.order('c2-landscape-o1', 'c2-landscape', 'Put these landforms in order as one landscape erodes over time.', ['Mesa', 'Butte', 'Knobs'],
    'Lecture 2 slide 9: mesa → butte → knobs as erosion removes more of the resistant cap.', ['L2:9']);
  A.mc('c2-landscape-m1', 'c2-landscape', 'A small, isolated, steep-sided hill capped by resistant rock stands near a broad flat-topped plateau made of the same layers. What is the best interpretation?',
    ['*The hill is an erosional remnant; the layers once extended continuously between them|Mesa → butte → knobs: erosion isolates smaller remnants.',
     'The hill was pushed up from below by later forces after the plateau had already formed|Matching layers at the same level point to erosion, not uplift.', 'The hill is a separate volcano|Nothing indicates a vent; the cap matches the plateau layers.', 'The layers formed separately on each landform|Continuous matching layers imply they were once connected.'],
    'The sequence on slide 9 shows landforms shrinking as erosion proceeds; textbook 6.1 makes the same point for a lava-capped mesa.', ['L2:9', 'TB6:6.1']);
  A.mc('c2-reldate-m1', 'c2-reldate', 'A dike cuts straight through layers 1, 2, and 3 but stops at the base of layer 4, which lies undisturbed on top. What is the relative age of the dike?',
    ['*Younger than layers 1–3 but older than layer 4|Cross-cutting makes it younger than what it cuts; layer 4 was deposited over it afterward.',
     'Older than all four layers|A feature cannot cut rocks that did not yet exist.', 'Younger than all four layers|It would cut layer 4 too if it came after layer 4.', 'The same age as layer 1 because it starts at the bottom|Where a dike starts does not set its age.'],
    'Cross-cutting relations (slide 11) plus superposition (slide 10).', ['L2:10', 'L2:11'], { media: { kind: 'svg', name: 'reldate', spec: { layers: ['1', '2', '3', '4'], dike: { x: 300, upto: 3, label: 'Dike' } } } });
  A.mc('c2-reldate-m2', 'c2-reldate', 'A sandstone contains pebbles of a distinctive granite. What does the principle of inclusions tell you?',
    ['*The granite is older than the sandstone|Pieces had to exist, weather, and erode before being incorporated.',
     'The sandstone is older than the granite|Reversed: the container is younger.', 'Both formed at the same time|The pieces had to exist first.', 'The granite intruded the sandstone later|Intrusion would bake the sandstone, not make rounded pebbles inside it.'],
    'Lecture 2 slide 12: a younger unit can contain pieces (clasts) of an older rock unit.', ['L2:12']);
  A.mc('c2-reldate-m3', 'c2-reldate', 'A zone of altered, hardened rock lines both sides of an igneous body where it touches shale. What does this observation establish?',
    ['*The igneous body was hot magma intruding shale that already existed|Contact effects: magma bakes the older rock it touches.',
     'The shale was deposited later on top of an igneous body that had already cooled|A cold body would not bake the shale.', 'The shale is younger than the intrusion|Baked rock must predate the heat source.', 'The two formed together as one layer|Baking records heating of one rock by another.'],
    'Lecture 2 slide 13: a younger magma can bake older rocks near the contact.', ['L2:13']);
  A.match('c2-reldate-x1', 'c2-reldate', 'Match each observation to the relative-dating principle it uses.', [
    ['A fault offsets three layers', 'Cross-cutting relations'], ['The bottom layer of an undisturbed stack is oldest', 'Position of layers (superposition)'], ['A conglomerate holds chunks of the basalt below it', 'Pieces of older rock (inclusions)'], ['Sandstone next to a dike is hardened and discolored', 'Contact effects (baking)']],
    'Lecture 2 slides 10–13.', ['L2:10', 'L2:11', 'L2:12', 'L2:13']);
  A.fill('c2-reldate-f1', 'c2-reldate', 'The principle that a fault or intrusion is younger than the rocks it cuts through is called <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> relations.', ['cross-cutting', 'cross cutting', 'crosscutting'],
    'Lecture 2 slide 11: cross-cutting relations.', ['L2:11']);
  A.fill('c2-reldate-f2', 'c2-reldate', 'In an undisturbed stack of sedimentary layers, the principle that the oldest layer is at the bottom is often called the principle of <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['superposition', 'position of layers'],
    'Slide 10 states the rule as “position of layers: the youngest layer is on top.” Many texts call it superposition; the slide\'s wording is accepted too.', ['L2:10'], { tier: 2 });
  A.order('c2-sequence-o1', 'c2-sequence', 'For the three-unit outcrop in Lecture 2 slide 14 (lower tilted unit, middle sandy unit, upper coarse unit), order the events from oldest to youngest.', ['Lower unit deposited', 'Lower unit tilted and eroded', 'Middle sandy unit deposited', 'Upper coarse unit deposited'],
    'Superposition orders the units; the flat middle unit resting on tilted beds shows tilting happened before the middle unit was deposited.', ['L2:14', 'L2:10'], { media: img(14, 'Lecture 2 slide 14') });
  A.order('c2-sequence-o2', 'c2-sequence', 'In a canyon wall, a gray marine layer lies directly on top of a wind-blown sand layer, and the canyon cuts through both (Lecture 2 slide 21 shows this kind of three-stage history). Order the stages.', ['Sand dunes deposit a sand layer', 'A shallow sea deposits a gray layer', 'Erosion cuts through the layers, forming a canyon'],
    'The lower sand layer came first, the sea later deposited the gray layer on top, and the canyon cuts both, so it is youngest.', ['L2:21'], { media: { kind: 'img', src: 'assets/img/slides/l2-slide-21.jpg', cap: 'Lecture 2 slide 21', alt: 'Lecture 2 slide 21' } });

  // ---------- 2.3 ----------
  A.section({ id: 'c2s3', ch: 2, n: '2.3', title: 'Maps, topography, and the subsurface', srcText: 'Lec 2 s15–21 (s18 geologic map missing)', src: ['L2:15', 'L2:17', 'L2:18', 'L2:19', 'L2:20'],
    note: 'The geologic map panel on slide 18 is blank in the supplied deck; only its label (“types and ages of rocks and features”) is used.',
    concepts: [['c2-maps', 'Types of maps'], ['c2-relief', 'Elevation, relief, and slope'], ['c2-subsurface', 'Cross sections, block diagrams, stratigraphic sections']] });
  A.cards('c2s3', [
    { id: 'g2-3a', h: 'Four kinds of maps and what each is for', c: ['c2-maps'], src: ['L2:15', 'L2:17', 'L2:18'],
      html: '<table><tr><th>Map</th><th>Shows</th></tr><tr><td>Topographic map</td><td>Elevation using <b>contour lines</b> (lines of equal elevation)</td></tr><tr><td>Shaded-relief map</td><td>The shape of the land as if lit from one side</td></tr><tr><td>Satellite image</td><td>What the surface looks like from space (color, vegetation, dark lava)</td></tr><tr><td>Geologic map</td><td><b>Types and ages of rocks and features</b> (e.g., faults)</td></tr></table><p>The SP Crater area in northern Arizona (slides 15–16) appears on all four: small volcanoes, a dark young lava flow from SP Crater, light-colored sedimentary rocks, and linear features that are faults.</p>',
      media: [img(15, 'Lec 2 s15: SP Crater area'), img(17, 'Lec 2 s17: shaded relief and topographic map')] },
    { id: 'g2-3b', h: 'Elevation, relief, and slope are different measurements', c: ['c2-relief'], src: ['L2:19'],
      html: '<ul><li><b>Elevation</b>: height above sea level at one point.</li><li><b>Relief</b>: the <b>difference in elevation between two places</b> (subtract).</li><li><b>Steepness of slope</b>: how fast elevation changes over horizontal distance.</li></ul><p>Example: a peak at 2,600 m and a valley floor at 900 m have <b>1,700 m of relief</b> between them. Use the generator below for more.</p><button class="btn small" data-guidegen="relief">Practice relief calculations (5)</button>',
      media: img(19, 'Lec 2 s19'), traps: ['Reporting the higher elevation as the relief.', 'Dropping units: relief is in meters (or feet).', 'On a contour map, closely spaced contours mean a steep slope, not a high elevation (general map-reading rule; the Chapter 2 textbook pages were not supplied).'] },
    { id: 'g2-3c', h: 'Three ways to show what is underground', c: ['c2-subsurface'], src: ['L2:20'],
      html: '<ul><li><b>Cross section</b>: a vertical slice showing rock units and structures at depth.</li><li><b>Block diagram</b>: a 3-D block: map view on top plus cross sections on the sides.</li><li><b>Stratigraphic section</b>: a single column listing the layers from bottom (oldest) to top.</li></ul>', media: img(20, 'Lec 2 s20') }
  ]);
  A.match('c2-maps-x1', 'c2-maps', 'Match each question to the map that answers it best.', [
    ['How high is the summit above sea level?', 'Topographic map'], ['Which rock unit is oldest, and where are the faults?', 'Geologic map'], ['Is the lava flow darker and less vegetated than its surroundings?', 'Satellite image'], ['What does the overall shape of the terrain look like at a glance?', 'Shaded-relief map']],
    'Lecture 2 slides 17–18.', ['L2:17', 'L2:18']);
  A.mc('c2-maps-m1', 'c2-maps', 'Which map type is designed to show the <b>types and ages of rocks</b> and features such as faults?',
    ['*Geologic map|Slide 18 labels it this way.', 'Topographic map|Shows elevation with contours.', 'Shaded-relief map|Shows terrain shape, not rock types.', 'Satellite image|Shows surface appearance; rock ages are not directly shown.'], 'Lecture 2 slide 18.', ['L2:18']);
  A.fill('c2-maps-f1', 'c2-maps', 'On a topographic map, a line connecting points of equal elevation is a <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> line.', ['contour', 'contour line', 'elevation contour'], 'Lecture 2 slide 17: “Topographic map with elevation contours.”', ['L2:17']);
  A.num('c2-relief-n1', 'c2-relief', 'A ridge crest is at 2,450 m and the nearby river is at 1,180 m. What is the relief between them, in meters?', 1270, 0, 'm',
    'Relief is the elevation difference between two places: 2,450 − 1,180 = 1,270 m.', ['L2:19']);
  A.mc('c2-relief-m1', 'c2-relief', 'Peak X is at 3,000 m with a valley at 2,700 m beside it. Peak Y is at 1,500 m with a valley at 200 m beside it. Which statement is correct?',
    ['*Y has greater local relief even though X has the higher elevation|Relief: X = 300 m, Y = 1,300 m.',
     'X has greater relief because it is higher|Elevation and relief are different measurements.', 'They have equal relief, because each landscape has exactly one peak and one valley|Relief depends on the elevation difference.', 'Relief cannot be compared without a satellite image|Two elevations are enough.'],
    'Lecture 2 slide 19 separates elevation (height above sea level) from relief (difference between two places).', ['L2:19']);
  A.fill('c2-relief-f1', 'c2-relief', 'The difference in elevation between two places is called <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['relief', 'topographic relief'], 'Lecture 2 slide 19.', ['L2:19']);
  A.match('c2-subsurface-x1', 'c2-subsurface', 'Match each representation to its description.', [
    ['Cross section', 'A vertical slice through the ground'], ['Block diagram', 'A 3-D view combining map surface and sides'], ['Stratigraphic section', 'One column of layers listed bottom to top']],
    'Lecture 2 slide 20.', ['L2:20']);
  A.mc('c2-subsurface-m1', 'c2-subsurface', 'You want to show a single drill core\'s layers, oldest at the bottom, with their thicknesses. Which representation fits?',
    ['*Stratigraphic section|A column of layers at one location.', 'Block diagram|Shows 3-D geometry over an area.', 'Shaded-relief map|Shows only the surface.', 'Satellite image|Shows only the surface from above.'], 'Lecture 2 slide 20.', ['L2:20']);

  // ---------- 2.4 ----------
  A.section({ id: 'c2s4', ch: 2, n: '2.4', title: 'Data and geologic time', srcText: 'Lec 2 s22–24 (timescale recovered from the deck)', src: ['L2:22', 'L2:23', 'L2:24'],
    concepts: [['c2-data', 'Qualitative vs. quantitative data'], ['c2-time', 'The geologic timescale']] });
  A.cards('c2s4', [
    { id: 'g2-4a', h: 'Two kinds of data', c: ['c2-data'], src: ['L2:22'],
      html: '<p><b>Quantitative data</b> are numeric measurements (a crater 1.2 km wide; a layer 3 m thick). <b>Qualitative data</b> are descriptions in words or sketches (angular blocks on the rim; a gray, fine-grained layer). Both are observations; neither is automatically better.</p>' },
    { id: 'g2-4b', h: 'The geologic timescale', c: ['c2-time'], src: ['L2:23', 'L2:24'],
      html: '<p>Four main parts, based on fossils (slide 23): <b>Precambrian</b> (before shells and hard parts) → <b>Paleozoic</b> (appearance of fish, plants, insects, reptiles) → <b>Mesozoic</b> (dinosaurs and first flowering plants) → <b>Cenozoic</b> (most recent; lots of mammals). If Earth history were squeezed into one year, the Precambrian fills most of the calendar and the other three crowd into the final weeks.</p><p>Periods, oldest to youngest: <b>Cambrian, Ordovician, Silurian, Devonian, Mississippian, Pennsylvanian, Permian</b> (Paleozoic); <b>Triassic, Jurassic, Cretaceous</b> (Mesozoic); <b>Paleogene, Neogene, Quaternary</b> (Cenozoic). Boundaries on the lecture chart: Paleozoic begins 541 Ma, Mesozoic 252 Ma, Cenozoic 66 Ma.</p>',
      media: TS, traps: ['Putting the Cambrian in the Mesozoic.', 'Reading the chart upside down: the top is youngest.'] }
  ]);
  A.ms('c2-data-s1', 'c2-data', 'Which of these observations are <b>quantitative</b>? Select all that apply.',
    ['*The crater is about 1.2 km across|A numeric measurement.', '*The rim stands 50 m above the surrounding plain|A numeric measurement.', 'Blocks on the rim are angular and fractured|A description in words.', 'The lower layers are reddish|A description in words.'],
    'Lecture 2 slide 22: quantitative data are numbers; qualitative data are words or sketches.', ['L2:22']);
  A.fill('c2-data-f1', 'c2-data', 'Data recorded as descriptions in words or sketches rather than numbers are <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> data.', ['qualitative'], 'Lecture 2 slide 22.', ['L2:22']);
  A.order('c2-time-o1', 'c2-time', 'Order the four main divisions of geologic time from oldest to youngest.', ['Precambrian', 'Paleozoic', 'Mesozoic', 'Cenozoic'],
    'Lecture 2 slide 23; the timescale on slide 24 puts Precambrian at the base and Cenozoic at the top.', ['L2:23', 'L2:24']);
  A.order('c2-time-o2', 'c2-time', 'Order these periods from oldest to youngest.', ['Cambrian', 'Devonian', 'Permian', 'Triassic', 'Cretaceous', 'Neogene'],
    'From the Lecture 2 timescale: Cambrian (541 Ma) → Devonian → Permian (Paleozoic) → Triassic → Cretaceous (Mesozoic) → Neogene (Cenozoic).', ['L2:24'], { media: TS });
  A.mc('c2-time-m1', 'c2-time', 'A rock layer contains the first dinosaur fossils in a sequence. In which era did it most likely form?',
    ['*Mesozoic|Slide 23 marks the Mesozoic with dinosaurs and the first flowering plants.', 'Paleozoic|Marked by the appearance of fish, plants, insects, and reptiles.', 'Cenozoic|Marked by abundant mammals.', 'Precambrian|Before shells and hard parts.'], 'Lecture 2 slide 23.', ['L2:23']);
  A.mc('c2-time-m2', 'c2-time', 'According to the lecture timescale, about when did the Mesozoic Era end and the Cenozoic begin?',
    ['*About 66 million years ago|The chart marks 66 Ma at the Cretaceous–Paleogene boundary.', 'About 252 million years ago|That is the Paleozoic–Mesozoic boundary.', 'About 541 million years ago|That is the start of the Paleozoic.', 'About 2.6 million years ago|That is the start of the Quaternary.'], 'Lecture 2 slide 24 timescale.', ['L2:24'], { media: TS });
  A.fill('c2-time-f1', 'c2-time', 'The most recent era of geologic time, marked by abundant mammals, is the <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> Era.', ['Cenozoic'], 'Lecture 2 slide 23.', ['L2:23']);

  // ---------- 2.5 ----------
  A.section({ id: 'c2s5', ch: 2, n: '2.5', title: 'Testing competing models: craters and domes', srcText: 'Lec 2 s25–32', src: ['L2:25', 'L2:26', 'L2:27', 'L2:28', 'L2:29', 'L2:30', 'L2:31', 'L2:32'],
    concepts: [['c2-models', 'Multiple hypotheses and predictions'], ['c2-upheaval', 'Upheaval Dome investigation']] });
  A.cards('c2s5', [
    { id: 'g2-5a', h: 'Keep several explanations alive, then test their predictions', c: ['c2-models'], src: ['L2:25', 'L2:26', 'L2:27', 'L2:28', 'L2:29'],
      html: '<p>The gasoline case (slide 25) is the template: observation → question → proposed explanations → <b>predictions for each</b> → collect data → conclusion. For the crater (slides 26–29) the models are a <b>volcanic explosion</b>, a <b>rising mass of salt</b>, and a <b>meteoroid impact</b>. Observations: the rim has <b>angular blocks of fractured rock</b>, and the crater sits in <b>sedimentary layers</b>.</p><p>A useful test is one where the models predict <i>different</i> results. Reasoning from each model (lab inference, not stated on the slides): a volcanic origin predicts volcanic rock (lava, ash) at the crater; rising salt predicts salt at depth and layers pushed <i>up</i> into a dome rather than a pit; an impact predicts shattered, ejected rock and possibly meteorite fragments, with no volcanic rock or salt required.</p>',
      media: [img(25, 'Lec 2 s25: gasoline investigation'), img(29, 'Lec 2 s29: three crater models')],
      traps: ['Picking the model from the picture instead of from predictions.', 'Choosing a test that all models predict equally (it cannot discriminate).'] },
    { id: 'g2-5b', h: 'Upheaval Dome', c: ['c2-upheaval'], src: ['L2:30', 'L2:31', 'L2:32'],
      html: '<p>Upheaval Dome is a <b>circular feature</b> where <b>layers bend upward around the dome</b>, surrounded by <b>flat-lying sedimentary layers</b>. The stratigraphic column lists units A (upper sandstone) down to G (sandstone with pebbles); by superposition <b>G is oldest and A youngest</b>. Possible explanations: <b>rising salt, rising magma, meteoroid impact</b>. The slide asks for predictions from each and what information would narrow the origin; it does not hand you the answer.</p>',
      media: [img(30, 'Lec 2 s30'), img(31, 'Lec 2 s31: units A–G'), img(32, 'Lec 2 s32')] }
  ]);
  A.mc('c2-models-m1', 'c2-models', 'Three models are proposed for a crater: volcanic explosion, rising salt, and meteoroid impact. Which new observation would best <b>discriminate</b> among them?',
    ['*Whether volcanic rock (lava or ash) is present around the crater|Only the volcanic model requires it, so its presence or absence separates the models.',
     'Whether the crater is roughly circular|All three could make a roughly circular feature.', 'Whether the crater is in the desert|Location in a desert does not test any model.', 'Whether the crater is large enough to be seen clearly from an airplane|Size alone does not separate the models.'],
    'Lecture 2 slide 29 asks which data would test each model; a discriminating test is one the models predict differently. (Prediction reasoning is the lab\'s.)', ['L2:29'], { tier: 4 });
  A.mc('c2-models-m2', 'c2-models', 'In the gasoline investigation, why was it important to state a prediction before checking the tank?',
    ['*So the tank inspection could either support or reject the idea that the tank was the source|A prediction makes the test meaningful.',
     'Because a prediction must always be written down before any observation is allowed|Observations came first; predictions come after a hypothesis.', 'So the workers would find what they expected|A fair test can fail.', 'Because the conclusion was already known|The conclusion came from the data.'],
    'Slide 25: “if tank is cause, leak should be found in tank”; no leak and the wrong gasoline led to rejecting the tank as the source.', ['L2:25']);
  A.fill('c2-models-f1', 'c2-models', 'Before collecting data, a scientist states what should be observed if a hypothesis is true. This expected result is a <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['prediction'], 'Lecture 2 slides 25, 29, 32 all ask for predictions from each explanation.', ['L2:25', 'L2:29']);
  A.order('c2-upheaval-o1', 'c2-upheaval', 'Using the Upheaval Dome stratigraphic column (units A–G, A at the top), list these units from oldest to youngest.', ['Unit G: sandstone with pebbles', 'Unit E: lower mudstone', 'Unit C: middle sandstone', 'Unit A: upper sandstone'],
    'Superposition in an undisturbed column: the lowest unit (G) is oldest and the top unit (A) is youngest.', ['L2:31', 'L2:10'], { media: img(31, 'Lecture 2 slide 31') });
  A.ms('c2-upheaval-s1', 'c2-upheaval', 'Which are <b>observations</b> about Upheaval Dome shown in Lecture 2? Select all that apply.',
    ['*It is a circular feature|Labeled on slide 30.', '*Layers are bent upward around the dome|Labeled on slide 30.', '*Flat-lying sedimentary layers surround it|Labeled on slide 30.', 'It was formed by a meteoroid impact|That is one of three candidate explanations, not an observation.'],
    'The slides present rising salt, rising magma, and impact as possible explanations to be tested.', ['L2:30', 'L2:32']);
  A.teach('c2-upheaval-t1', 'c2-upheaval', 'Concept sketch / short answer: For Upheaval Dome, give one prediction for EACH of the three explanations (rising salt, rising magma, meteoroid impact), and say what data would tell them apart.',
    'Rising salt: salt (evaporite) should exist at depth beneath the dome, and layers should be domed upward by the rising mass. Rising magma: igneous rock (an intrusion) should be found at depth, with baked contact rock around it. Meteoroid impact: shattered and fractured rock, ejected or disturbed layers, and possibly meteorite material or other impact evidence; no salt or magma body is required. Discriminating data: drilling or geophysical data to find salt or igneous rock at depth; close examination of the rocks for heat effects vs. shattering.',
    ['One distinct prediction per explanation', 'Predictions differ between explanations (so they can be tested)', 'Names a type of data that would discriminate'], ['L2:32', 'L2:29'], { tier: 4 });
})((typeof window !== 'undefined' ? window : globalThis).L);
