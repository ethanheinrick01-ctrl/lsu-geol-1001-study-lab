/* Investigation cases: a background, a diagram, and several linked parts. They follow the format the professor described on
   Sep 22 ("I may give you a background, some choice, and you can match the geology feature with that diagram"). Scenarios,
   place names, and numbers are invented for practice; the geology they test comes from the cited course sources. */
(function (L) {
  'use strict';
  var A = L.A, opts = A.opts;
  function it(t, id, c, q, body, x, s, extra) {
    var o = { id: id, c: c, t: t, q: q, x: x, s: s };
    if (t === 'mc' || t === 'ms') o.o = opts(body);
    if (t === 'fill') o.acc = body;
    if (t === 'match') o.pairs = body;
    if (t === 'order') o.seq = body;
    if (t === 'parts') o.parts = body;
    if (t === 'tf') o.a = body;
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }
  function P(label, options, a, why) { return { label: label, options: options, a: a, why: why }; }
  function img(src, cap) { return { kind: 'img', src: src, cap: cap, alt: cap }; }
  var DSN = 'Scenario invented for practice; the geology comes from the cited sources.';

  // ============ Chapter 1 ============
  A.kase({ id: 'k1-inside', ch: 1, inv: true, title: 'Inside the planet and why some places stand high',
    stem: '<p>A classmate builds a model for a poster: a cutaway Earth (left) and blocks floating in water (right). Blocks A and B are the same material; block C is denser. ' + DSN + '</p>',
    media: [{ kind: 'svg', name: 'layers', spec: { markers: true } }, { kind: 'svg', name: 'isostasy', spec: { blocks: [{ h: 130, d: 1, l: 'A' }, { h: 60, d: 1, l: 'B' }, { h: 90, d: 1.5, l: 'C' }] } }],
    items: [
      it('parts', 'k1-inside-1', 'c1-layers', 'Match each numbered layer on the cutaway to its description.', [
        P('1', ['Crust', 'Mantle', 'Outer core', 'Inner core'], 'Crust', 'Thin outer skin.'), P('2', ['Crust', 'Mantle', 'Outer core', 'Inner core'], 'Mantle', 'Thickest layer.'),
        P('3', ['Crust', 'Mantle', 'Outer core', 'Inner core'], 'Outer core', 'Molten iron-nickel.'), P('4', ['Crust', 'Mantle', 'Outer core', 'Inner core'], 'Inner core', 'Solid iron-nickel.')], 'Lecture 1b slides 12–13.', ['L1B:12', 'L1B:13'], { mk: 'inv' }),
      it('mc', 'k1-inside-2', 'c1-layers', 'Which evidence from Lecture 1b supports an iron-nickel core?', ['*Iron-nickel meteorites, thought to be pieces of other bodies\' cores|Slide 13.', 'Granite exposed in mountain ranges|Granite is continental crust.', 'Basalt on the seafloor|Basalt is oceanic crust.', 'Olivine-rich mantle rocks carried up to the surface by volcanoes|Mantle evidence, not core.'], 'Lecture 1b slide 13.', ['L1B:13']),
      it('mc', 'k1-inside-3', 'c1-isostasy', 'Blocks A and B are the same material, but A is thicker. How do their tops compare?', ['*A rides higher above the water line|Thicker blocks ride higher (isostasy).', 'B rides higher because it is lighter overall|Same density; thinner rides lower.', 'They ride at the same height|Thickness changes the height.', 'A sinks to the bottom|Both float.'], 'Lecture 1b slides 15–16.', ['L1B:15', 'L1B:16']),
      it('mc', 'k1-inside-4', 'c1-isostasy', 'In the Earth analogy, which pair best matches blocks A and C?', ['*A = continental crust; C = oceanic crust|Lecture 1b slide 16.', 'A = oceanic crust; C = continental crust|Reversed.', 'A = inner core; C = outer core|The analogy is about crust floating on mantle.', 'A = asthenosphere; C = lithosphere|The analogy compares crustal blocks.'], 'Lecture 1b slides 15–16.', ['L1B:16']),
      it('mc', 'k1-inside-5', 'c1-lithos', 'Plates are pieces of which layer?', ['*The lithosphere|Lecture 1b slide 14.', 'The crust only, without any mantle|The lithosphere includes rigid uppermost mantle.', 'The asthenosphere|Plates move over it.', 'The outer core|Far too deep.'], 'Lecture 1b slide 14.', ['L1B:14'])
    ] });

  A.kase({ id: 'k1-canyon', ch: 1, inv: true, title: 'Field notebook: a cliff, a mountain front, and a dune field',
    stem: '<p>On a field trip you write notes at three sites (photos below). Site 1: a cliff with tan and brown layers and fallen blocks at its base. Site 2: a steep mountain front with angular rock debris spread in front of it. Site 3: rippled, well-sorted sand shaped into dunes. ' + DSN + '</p>',
    media: [img('assets/img/atlas/layered-cliff.jpg', 'Site 1'), img('assets/img/atlas/steep-mountain-front.jpg', 'Site 2'), img('assets/img/atlas/sand-dunes.jpg', 'Site 3')],
    items: [
      it('match', 'k1-canyon-1', 'c1-obsinf', 'Label each statement as an observation or an inference.', [
        ['“The cliff shows tan and brown layers.”', 'Observation'], ['“The blocks at the base fell from the cliff.”', 'Inference'], ['“The debris in front of the mountain is angular.”', 'Observation'], ['“The sand was deposited by wind.”', 'Inference']], 'Lecture 1b slides 3 and 9: observations are seen or measured; inferences interpret cause or history.', ['L1B:3', 'L1B:9']),
      it('parts', 'k1-canyon-2', 'c1-sedenv', 'Which environment fits each site\'s deposit?', [
        P('Site 2 debris', ['Steep mountain front', 'Sand dunes', 'Beach', 'Deep ocean'], 'Steep mountain front', 'Angular debris shed below a steep front.'),
        P('Site 3 sand', ['Steep mountain front', 'Sand dunes', 'Beach', 'Deep ocean'], 'Sand dunes', 'Well-sorted wind-blown sand.')], 'Lecture 1b slides 19–22.', ['L1B:19', 'L1B:20', 'L1B:21', 'L1B:22']),
      it('mc', 'k1-canyon-3', 'c1-hazards', 'You are choosing a campsite. Which site poses the most obvious hazard from falling rock?', ['*Below the cliff at Site 1|Evidence of past rockfall marks the hazard.', 'The middle of the dune field at Site 3|No cliff above.', 'Far out on a flat plain|Nothing above to fall.', 'All three sites are equally hazardous for camping|The blocks are direct evidence at Site 1.'], 'Lecture 1b slide 5: reading landscapes for hazards.', ['L1B:5', 'L1B:6']),
      it('fill', 'k1-canyon-4', 'c1-sedenv', 'Rocks that form from deposits in normal surface environments such as rivers, dunes, and beaches are <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> rocks.', ['sedimentary'], 'Lecture 1b slide 19.', ['L1B:19'])
    ] });

  // ============ Chapter 2 ============
  A.kase({ id: 'k2-sequence', ch: 2, inv: true, title: 'Read the roadcut',
    stem: '<p>A roadcut exposes tilted layers P, Q, R (bottom to top as deposited), cut by a vertical dike D (it was not tilted with the layers). The top of the dike and the tilted layers are both cut off by a flat erosion surface, and flat layer S lies on that surface. The rock on both sides of the dike is baked. ' + DSN + '</p>',
    media: { kind: 'svg', name: 'reldate', spec: { layers: ['P', 'Q', 'R'], tilt: true, dike: { x: 260, upto: 3, label: 'D', baked: true }, cap: 'S' } },
    items: [
      it('order', 'k2-sequence-1', 'c2-sequence', 'Put the events in order, oldest first.', ['Deposit P, Q, and R', 'Tilting', 'Intrusion of dike D', 'Erosion to a flat surface', 'Deposit S'], 'Superposition, cross-cutting relations, and the flat layer on tilted layers (Lecture 2 slides 10–14). The vertical dike cuts the tilted layers without being tilted, so it came after tilting; its top is cut off by the erosion surface, so it came before erosion and before S.', ['L2:10', 'L2:11', 'L2:14']),
      it('match', 'k2-sequence-2', 'c2-reldate', 'Match each observation to the principle it uses.', [
        ['R lies above Q', 'Superposition (position of layers)'], ['D cuts P, Q, and R', 'Cross-cutting relations'], ['Baked rock next to D', 'Contact effects'], ['S contains pebbles of R', 'Inclusions (pieces of older rock)']], 'Lecture 2 slides 10–13.', ['L2:10', 'L2:11', 'L2:12', 'L2:13']),
      it('mc', 'k2-sequence-3', 'c2-reldate', 'What do these principles give you?', ['*The relative order of events, not ages in years|Lecture 2.', 'Exact ages of each unit in millions of years|That needs numeric dating.', 'The rock types only|They order events.', 'The temperature of each layer|No.'], 'Lecture 2 slide 13 note.', ['L2:13']),
      it('mc', 'k2-sequence-4', 'c2-data', 'Which is quantitative data?', ['*“Layer Q is 2.4 m thick.”|A numeric measurement.', '“Layer Q is gray and fine-grained.”|Qualitative description.', '“The dike looks darker than the layers.”|Qualitative.', '“S rests on an irregular surface.”|Qualitative.'], 'Lecture 2 slide 22.', ['L2:22'])
    ] });

  A.kase({ id: 'k2-crater', ch: 2, inv: true, title: 'Crater K: test the models',
    stem: '<p>A 1-km circular depression, Crater K, sits in flat-lying sandstone and shale on a plateau. Three hypotheses are proposed, following the Lecture 2 template: (1) a volcanic explosion, (2) a rising mass of salt, (3) a meteoroid impact. ' + DSN + '</p>',
    media: img('assets/img/slides/l2-slide-26.jpg', 'Lecture 2 slide 26 (a similar crater problem from class)'),
    items: [
      it('order', 'k2-crater-1', 'c2-models', 'Put the investigation steps in the order used in Lecture 2.', ['Observation', 'Question', 'Propose several explanations', 'Make predictions for each', 'Collect data to test predictions', 'Conclusion'], 'Lecture 2 slide 25 (gasoline example).', ['L2:25']),
      it('match', 'k2-crater-2', 'c2-models', 'Match each hypothesis to a prediction that would support it.', [
        ['Volcanic explosion', 'Lava or volcanic ash around the crater'], ['Rising salt', 'Salt at depth and layers pushed up into a dome'], ['Meteoroid impact', 'Shattered, ejected blocks and no volcanic rock']], 'Lecture 2 slides 26–29; the predictions are reasoning from each model (lab inference).', ['L2:26', 'L2:27', 'L2:28', 'DES'], { tier: 4 }),
      it('mc', 'k2-crater-3', 'c2-models', 'Mapping and drilling find no lava, ash, or other volcanic rock around the crater or beneath it; the rim has angular blocks of fractured sandstone. Which hypothesis do these data most directly weaken?', ['*Volcanic explosion|No volcanic rock at the surface or at depth.', 'Meteoroid impact|Fractured, angular blocks fit an impact.', 'None; the data fit all three|The absence of volcanic rock matters.', 'All three equally|The data discriminate.'], 'Lecture 2 slides 26–29 (reasoning from the models).', ['L2:26', 'L2:29']),
      it('mc', 'k2-crater-4', 'c2-models', 'Why keep several explanations alive at the start?', ['*So that tests can be chosen where the models predict different results|Lecture 2 slide 25–29 logic.', 'To avoid ever reaching a conclusion|The goal is a conclusion.', 'Because the first idea that comes to mind is always wrong|Not the reason.', 'Because data are not needed|Data test the predictions.'], 'Lecture 2 slides 25–29.', ['L2:25', 'L2:29'])
    ] });

  // ============ Chapter 3 ============
  A.kase({ id: 'k3-samerica', ch: 3, inv: true, title: 'Across South America',
    stem: '<p>A west-to-east cross section runs from the Pacific trench, over the Andes, across the interior, to the Mid-Atlantic Ridge. The professor used this lopsided continent in Lecture 3 and on Sep 1. Match the numbered features.</p>',
    media: { kind: 'svg', name: 'samerica', spec: { markers: true } },
    items: [
      it('parts', 'k3-samerica-1', 'c3-samerica', 'Identify each numbered feature.', [
        P('1', ['Trench', 'Andes volcanic mountains', 'Low-relief interior', 'Passive margin', 'Mid-Atlantic Ridge'], 'Trench', 'Deep trough where the oceanic plate bends down.'),
        P('2', ['Trench', 'Andes volcanic mountains', 'Low-relief interior', 'Passive margin', 'Mid-Atlantic Ridge'], 'Andes volcanic mountains', 'Above the subducting plate.'),
        P('4', ['Trench', 'Andes volcanic mountains', 'Low-relief interior', 'Passive margin', 'Mid-Atlantic Ridge'], 'Passive margin', 'Continent-ocean edge that is not a plate boundary.'),
        P('5', ['Trench', 'Andes volcanic mountains', 'Low-relief interior', 'Passive margin', 'Mid-Atlantic Ridge'], 'Mid-Atlantic Ridge', 'Divergent boundary.')], 'Lecture 3 slides 44–45; Sep 1.', ['L3:44', 'L3:45', 'T0901'], { mk: 'inv' }),
      it('mc', 'k3-samerica-2', 'c3-subduction', 'What type of plate boundary lies along the west coast?', ['*Ocean-continent convergent|Trench plus volcanic mountains.', 'Divergent (spreading)|That is the Mid-Atlantic Ridge.', 'Transform|No trench-arc pair at a transform.', 'Continent-continent collision|Only one side is continental.'], 'Lecture 3 slides 25–27, 44.', ['L3:25', 'L3:44']),
      it('mc', 'k3-samerica-3', 'c3-samerica', 'Why does the east coast have a broad shallow shelf and few earthquakes?', ['*It is a passive margin inside the plate, not a plate boundary|Lecture 3 slide 45; Sep 1.', 'It is a subduction zone|That is the west coast.', 'It is a transform boundary|No.', 'The Atlantic is shrinking along that coast as the plate is consumed|The Atlantic is widening at the ridge.'], 'Lecture 3 slide 45; Sep 1.', ['L3:45', 'T0901']),
      it('mc', 'k3-samerica-4', 'c3-seafloorage', 'Moving from the Mid-Atlantic Ridge toward South America, how do seafloor age and sediment thickness change?', ['*Both increase away from the ridge|Lecture 3 slides 41–42.', 'Both decrease|Reversed.', 'Age increases; sediment gets thinner|Older seafloor has had longer to collect sediment.', 'Neither changes|They change systematically.'], 'Lecture 3 slides 41–42.', ['L3:41', 'L3:42'])
    ] });

  A.kase({ id: 'k3-newocean', ch: 3, inv: true, title: 'A young ocean basin',
    stem: '<p>A survey ship maps magnetic stripes across a ridge (top) and dates volcanic islands on the nearby plate (bottom). The island ages are shown in millions of years (Ma). ' + DSN + '</p>',
    media: [{ kind: 'svg', name: 'stripes', spec: { pattern: [2, 3, 1, 4, 2], showRidge: true, labels: [['1', -60], ['2', 200]] } }, { kind: 'svg', name: 'hotspot', spec: { islands: [{ x: 640, y: 110, r: 26, label: 'Ula', age: 0, active: true }, { x: 420, y: 130, r: 22, label: 'Mave', age: 4 }, { x: 200, y: 150, r: 16, label: 'Tosi', age: 8 }] } }],
    items: [
      it('mc', 'k3-newocean-1', 'c3-magnetic', 'Which marker on the stripe map sits on older seafloor?', ['*Marker 2|Farther from the ridge.', 'Marker 1|Closer to the ridge.', 'They are the same age|Different distances.', 'Cannot tell from a stripe map|Distance from the ridge gives relative age.'], 'Lecture 3 slides 40–42.', ['L3:40', 'L3:42']),
      it('mc', 'k3-newocean-2', 'c3-magnetic', 'Why do the stripes form a mirror-image pattern on both sides of the ridge?', ['*Crust records the field at the ridge, then moves away both ways|Lecture 3 slides 40–41.', 'Earth\'s magnetic field is stronger on one side of the ridge than the other|No.', 'Sediments sort by magnetism|No.', 'The ridge moves back and forth|No.'], 'Lecture 3 slides 40–41.', ['L3:40', 'L3:41']),
      it('num', 'k3-newocean-3', 'c3-hotspot', 'Mave (4 Ma) is 240 km from Ula, which sits over the hot spot. What is the plate speed in cm per year?', null, 'Rate = 240 km ÷ 4 million yr = 60 km per million yr = 6 cm/yr (1 km per million yr = 0.1 cm/yr).', ['L3:36', 'L3:43'], { a: 6, tol: 0.05, unit: 'cm/yr' }),
      it('mc', 'k3-newocean-4', 'c3-hotspot', 'Ula is active and Tosi is oldest. Which way is the plate moving relative to the hot spot?', ['*West, toward Tosi|Islands are carried away from the hot spot in the direction of plate motion.', 'East, toward Ula|That is from old to young.', 'The hot spot moves east|Lecture 3 treats the plume as fixed.', 'Not moving|The ages record motion.'], 'Lecture 3 slide 43.', ['L3:43'])
    ] });

  A.kase({ id: 'k3-margin', ch: 3, inv: true, title: 'Match the boundary to the diagram',
    stem: '<p>A cross section of a convergent boundary is shown with numbered features. Match each number to the correct feature, then answer the follow-ups.</p>',
    media: [{ kind: 'svg', name: 'boundary', spec: { type: 'ocean-continent', markers: true } }],
    items: [
      it('parts', 'k3-margin-1', 'c3-subduction', 'Identify each numbered feature on the cross section.', [
        P('1', ['Trench', 'Subducting slab releasing water', 'Zone where mantle melts', 'Volcanic mountain belt'], 'Trench', 'Where the oceanic plate bends down.'),
        P('2', ['Trench', 'Subducting slab releasing water', 'Zone where mantle melts', 'Volcanic mountain belt'], 'Subducting slab releasing water', 'The descending oceanic plate.'),
        P('3', ['Trench', 'Subducting slab releasing water', 'Zone where mantle melts', 'Volcanic mountain belt'], 'Zone where mantle melts', 'Water lowers the melting temperature of the overlying mantle.'),
        P('4', ['Trench', 'Subducting slab releasing water', 'Zone where mantle melts', 'Volcanic mountain belt'], 'Volcanic mountain belt', 'Magma rises into the overriding continent.')], 'Lecture 3 slides 25–27; textbook 5.10.', ['L3:25', 'L3:26', 'TB5:5.10'], { mk: 'inv' }),
      it('mc', 'k3-margin-2', 'c3-subduction', 'Why does the oceanic plate, not the continental plate, go down?', ['*Oceanic lithosphere is denser than continental lithosphere|Lecture 3.', 'Continental plates are always moving faster and ride over whatever they meet|Speed is not the reason.', 'Oceanic plates are thicker|Oceanic crust is thinner.', 'Water pushes it down|No.'], 'Lecture 3 slides 25–26.', ['L3:25', 'L3:26']),
      it('mc', 'k3-margin-3', 'c3-collision', 'If the ocean closed completely and two continents met here, what would change?', ['*Subduction would stall and high mountains would rise, with few volcanoes|Lecture 3 slides 29–30.', 'A new mid-ocean ridge would appear|That forms by divergence.', 'Volcanism would increase sharply as both continents begin melting at depth|Collisions have few volcanoes.', 'The boundary would become a transform|Not implied.'], 'Lecture 3 slides 29–30.', ['L3:29', 'L3:30'])
    ] });

  // ============ Chapter 4 ============
  A.kase({ id: 'k4-unknowns', ch: 4, inv: true, title: 'Three unknown specimens',
    stem: '<p>Lab notes:<br><b>Specimen 1</b>: white, glassy; scratched by a knife; fizzes strongly in dilute HCl; breaks into rhombs.<br><b>Specimen 2</b>: clear; scratches glass; no cleavage; curved, shell-like fracture.<br><b>Specimen 3</b>: black, metallic; strongly attracted to a magnet.<br>' + DSN + '</p>',
    items: [
      it('parts', 'k4-unknowns-1', 'c4-tests', 'Identify each specimen.', [
        P('Specimen 1', ['Calcite', 'Quartz', 'Magnetite', 'Hematite', 'Halite'], 'Calcite', 'Fizzes in HCl; rhombohedral cleavage; hardness 3.'),
        P('Specimen 2', ['Calcite', 'Quartz', 'Magnetite', 'Hematite', 'Halite'], 'Quartz', 'Hardness 7; conchoidal fracture.'),
        P('Specimen 3', ['Calcite', 'Quartz', 'Magnetite', 'Hematite', 'Halite'], 'Magnetite', 'Strong natural magnet.')], 'Textbook 4.3, 4.5, 4.9; Sep 8.', ['TB4:4.3', 'TB4:4.9', 'T0908']),
      it('parts', 'k4-unknowns-2', 'c4-nonsil', 'Name each specimen\'s mineral family.', [
        P('Specimen 1', ['Silicate', 'Carbonate', 'Oxide', 'Sulfide', 'Halide'], 'Carbonate', 'CaCO₃.'),
        P('Specimen 2', ['Silicate', 'Carbonate', 'Oxide', 'Sulfide', 'Halide'], 'Silicate', 'SiO₂ framework.'),
        P('Specimen 3', ['Silicate', 'Carbonate', 'Oxide', 'Sulfide', 'Halide'], 'Oxide', 'Fe₃O₄.')], 'Textbook 4.6, 4.9.', ['TB4:4.6', 'TB4:4.9']),
      it('mc', 'k4-unknowns-3', 'c4-silstruct', 'Specimen 2 has no cleavage. What about its atomic structure explains that?', ['*A 3-D framework of strong Si–O bonds with no weak planes|Textbook 4.7.', 'It is made of stacked sheets of tetrahedra held together by weak bonds|That gives one perfect cleavage.', 'It has single chains of tetrahedra|That gives two cleavages near 90°.', 'It has no silicon|It is SiO₂.'], 'Textbook 4.7.', ['TB4:4.7']),
      it('fill', 'k4-unknowns-4', 'c4-appearance', 'The curved, shell-like breakage of Specimen 2 is called <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> fracture.', ['conchoidal'], 'Textbook 4.3 and 4.8.', ['TB4:4.3', 'TB4:4.8'])
    ] });

  A.kase({ id: 'k4-structure', ch: 4, inv: true, title: 'From structure to cleavage',
    stem: '<p>Three broken mineral fragments are shown left, middle, and right. Link each one\'s cleavage to its silicate structure.</p>',
    media: [{ kind: 'svg', name: 'cleavage', spec: { type: '1', hideCaption: true } }, { kind: 'svg', name: 'cleavage', spec: { type: '2-90', hideCaption: true } }, { kind: 'svg', name: 'cleavage', spec: { type: '2-60', hideCaption: true } }],
    items: [
      it('parts', 'k4-structure-1', 'c4-cleavage', 'Name the cleavage shown in each fragment, left to right.', [
        P('Left', ['One direction (sheets)', 'Two at ~90°', 'Two at ~60°/120°', 'Three at 90°'], 'One direction (sheets)', 'Parallel sheets.'),
        P('Middle', ['One direction (sheets)', 'Two at ~90°', 'Two at ~60°/120°', 'Three at 90°'], 'Two at ~90°', 'Right-angle steps.'),
        P('Right', ['One direction (sheets)', 'Two at ~90°', 'Two at ~60°/120°', 'Three at 90°'], 'Two at ~60°/120°', 'Non-square corners.')], 'Textbook 4.5.', ['TB4:4.5']),
      it('parts', 'k4-structure-2', 'c4-silstruct', 'Which mineral group matches each fragment?', [
        P('Left', ['Mica', 'Pyroxene', 'Amphibole', 'Quartz'], 'Mica', 'Sheet silicate.'),
        P('Middle', ['Mica', 'Pyroxene', 'Amphibole', 'Quartz'], 'Pyroxene', 'Single chains.'),
        P('Right', ['Mica', 'Pyroxene', 'Amphibole', 'Quartz'], 'Amphibole', 'Double chains.')], 'Textbook 4.5 and 4.7.', ['TB4:4.5', 'TB4:4.7']),
      it('mc', 'k4-structure-3', 'c4-cleavage', 'What single idea connects all three answers?', ['*Breakage follows the weakest bonds, set by how tetrahedra link|Textbook 4.5 and 4.7.', 'Darker minerals always have more cleavage|Color does not control cleavage.', 'Cleavage depends mainly on how fast each mineral cooled from the magma|Cleavage is structural.', 'Every silicate has three cleavages|Quartz has none.'], 'Textbook 4.5 and 4.7.', ['TB4:4.5', 'TB4:4.7'])
    ] });

  // ============ Chapter 5 ============
  A.kase({ id: 'k5-pluton', ch: 5, inv: true, title: 'An exposed magma system',
    stem: '<p>Erosion has exposed an old magma system. The core is coarse-grained, light-colored rock of quartz, K-feldspar, and biotite. Near its edge the rock has 5-mm feldspar crystals in a fine gray matrix. Thin dark sheets cut across the surrounding sedimentary layers, and one sheet runs between two layers. ' + DSN + '</p>',
    media: [{ kind: 'svg', name: 'intrusions', spec: { markers: true } }, img('assets/img/tb/ch5-granite.jpg', 'Core rock')],
    items: [
      it('parts', 'k5-pluton-1', 'c5-smallint', 'Name the numbered intrusions on the cross section.', [
        P('1', ['Dike', 'Sill', 'Laccolith', 'Volcanic neck'], 'Dike', 'Cuts across layers.'), P('2', ['Dike', 'Sill', 'Laccolith', 'Volcanic neck'], 'Sill', 'Parallel to layers.'), P('3', ['Dike', 'Sill', 'Laccolith', 'Volcanic neck'], 'Laccolith', 'Domes the layers above.')], 'Textbook 5.13.', ['TB5:5.13'], { mk: 'inv' }),
      it('mc', 'k5-pluton-2', 'c5-classify', 'What is the core rock?', ['*Granite|Coarse, felsic (quartz, K-feldspar, biotite).', 'Rhyolite|Same composition but fine-grained.', 'Diorite|Intermediate; plagioclase and amphibole.', 'Gabbro|Mafic and dark.'], 'Textbook 5.2 chart.', ['TB5:5.2', 'IMG5737']),
      it('mc', 'k5-pluton-3', 'c5-voltex', 'What does the edge rock (large feldspars in a fine matrix) record?', ['*Two-stage cooling: slow growth of feldspar, then fast cooling of the remaining melt|Porphyritic texture (textbook 5.1).', 'The edge cooled more slowly than the core because it was insulated by the wall rock|Fine matrix means faster cooling.', 'Two unrelated rocks were welded|One magma.', 'It was reheated by a lava flow|Not required.'], 'Textbook 5.1 and 5.8.', ['TB5:5.1', 'TB5:5.8']),
      it('mc', 'k5-pluton-4', 'c5-bowen', 'In the core, quartz fills irregular spaces between feldspar and biotite crystals. Why?', ['*Quartz crystallized last and filled the remaining space|Bowen\'s series; textbook 5.8 B.6.', 'Quartz crystallized first|It is among the last.', 'Quartz formed much later by weathering of the feldspar around it|It is a magmatic mineral here.', 'Quartz has cubic cleavage|Quartz has no cleavage.'], 'Textbook 5.8.', ['TB5:5.8', 'T0915']),
      it('fill', 'k5-pluton-5', 'c5-pluton', 'The solidified magma chamber that forms the core is called a <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['pluton', 'batholith', 'stock'], 'Textbook 5.6 and 5.12 (pluton; large ones are batholiths, small steep ones stocks).', ['TB5:5.6', 'TB5:5.12'])
    ] });

  A.kase({ id: 'k5-melting', ch: 5, inv: true, title: 'Three ways to make magma',
    stem: '<p>The P-T graph shows three rocks, each about to cross the melting curve by a different path (arrows). Match each path to its mechanism and setting.</p>',
    media: { kind: 'svg', name: 'pt', spec: { wet: true, points: [['1', 8, 25], ['2', 62, 88], ['3', 48, 70]], paths: [[10, 25, 54, 25, '#c0392b'], [62, 86, 62, 45, '#2e6da4']] } },
    items: [
      it('parts', 'k5-melting-1', 'c5-melt3', 'Match each rock to the change that melts it.', [
        P('Rock 1 (red arrow)', ['Heating', 'Decompression', 'Adding water'], 'Heating', 'Moves right at constant pressure.'),
        P('Rock 2 (blue arrow)', ['Heating', 'Decompression', 'Adding water'], 'Decompression', 'Moves up (lower pressure) at nearly constant temperature.'),
        P('Rock 3 (no arrow)', ['Heating', 'Decompression', 'Adding water'], 'Adding water', 'Between the wet and dry curves: water shifts the curve past it.')], 'Textbook 5.5; Sep 15.', ['TB5:5.5', 'T0915']),
      it('parts', 'k5-melting-2', 'c5-subduction', 'Match each mechanism to the plate setting where the textbook says it dominates.', [
        P('Decompression', ['Mid-ocean ridge', 'Subduction zone', 'Continental crust heated by rising mafic magma'], 'Mid-ocean ridge', 'Rising asthenosphere (5.9).'),
        P('Adding water', ['Mid-ocean ridge', 'Subduction zone', 'Continental crust heated by rising mafic magma'], 'Subduction zone', 'Water from the slab (5.10).'),
        P('Heating', ['Mid-ocean ridge', 'Subduction zone', 'Continental crust heated by rising mafic magma'], 'Continental crust heated by rising mafic magma', 'Hot magma melts crust (5.10–5.11).')], 'Textbook 5.9–5.11.', ['TB5:5.9', 'TB5:5.10', 'TB5:5.11']),
      it('mc', 'k5-melting-3', 'c5-partial', 'Rock 2 is ultramafic mantle. What composition is its first melt?', ['*Mafic|Partial melting of ultramafic mantle yields mafic magma.', 'Ultramafic|The melt is more felsic than the source.', 'Felsic|Too far.', 'Identical to the source|Only complete melting would do that.'], 'Textbook 5.6.', ['TB5:5.6'])
    ] });

  // ============ Chapter 6 ============
  A.kase({ id: 'k6-kessa', ch: 6, inv: true, title: 'Assess Mount Kessa',
    stem: '<p>Mount Kessa is a steep, snow-capped, symmetrical volcano above a subduction zone. Its flanks show layered andesite flows, welded tuff, and old mudflow deposits; the summit has a young lava dome. Three villages (P, Q, R) sit at similar distances. A valley drains the summit toward P; the prevailing wind blows toward Q. ' + DSN + '</p>',
    media: { kind: 'svg', name: 'hazard', spec: { valleys: ['M380 190 Q 300 250 200 330'], wind: [420, 150, 600, 70], villages: [{ x: 210, y: 320, label: 'P' }, { x: 610, y: 70, label: 'Q' }, { x: 560, y: 300, label: 'R' }] } },
    items: [
      it('mc', 'k6-kessa-1', 'c6-types', 'What type of volcano is Mount Kessa?', ['*Composite volcano|Steep, layered lava, tuff, and mudflows; subduction setting.', 'Shield volcano|Gentle basaltic slopes.', 'Scoria (cinder) cone|Small cone of loose scoria.', 'Flood basalt plateau|Fissure-fed basalt plateau.'], 'Textbook 6.1, 6.7.', ['TB6:6.1', 'TB6:6.7']),
      it('parts', 'k6-kessa-2', 'c6-assess', 'Match each village to its main hazard.', [
        P('Village P', ['Lahars and small pyroclastic flows down the valley', 'Heavy ash fall downwind', 'Lowest hazard of the three'], 'Lahars and small pyroclastic flows down the valley', 'Valleys channel flows (6.12).'),
        P('Village Q', ['Lahars and small pyroclastic flows down the valley', 'Heavy ash fall downwind', 'Lowest hazard of the three'], 'Heavy ash fall downwind', 'Prevailing wind carries tephra (6.12).'),
        P('Village R', ['Lahars and small pyroclastic flows down the valley', 'Heavy ash fall downwind', 'Lowest hazard of the three'], 'Lowest hazard of the three', 'Off the valley and not downwind.')], 'Textbook 6.12 B.', ['TB6:6.12']),
      it('mc', 'k6-kessa-3', 'c6-dome', 'The summit dome is growing steeply. What specific danger does it add?', ['*Flank collapse into a pyroclastic flow, or an explosion|Textbook 6.9 B (Unzen).', 'A slow basaltic lava flow|Domes are viscous andesite to rhyolite.', 'A jökulhlaup from the melting snowcap is the only danger it adds|Flooding is possible under ice, but dome collapse is the dome\'s hazard.', 'None; domes are harmless|Unzen shows otherwise.'], 'Textbook 6.9.', ['TB6:6.9']),
      it('ms', 'k6-kessa-4', 'c6-monitor', 'Which observations would suggest magma is rising toward an eruption? Select all that apply.', ['*Increasing earthquake activity beneath the summit|Seismometers (6.13).', '*A sharp rise in sulfur dioxide output|Gas monitoring (6.13).', '*GPS stations and tiltmeters showing the flank inflating|Ground deformation (6.13).', 'A decrease in all activity for a year|Not a warning sign by itself.'], 'Textbook 6.13.', ['TB6:6.13']),
      it('mc', 'k6-kessa-5', 'c6-rainier', 'Mount Kessa most resembles which real volcano from the textbook, and why?', ['*Mount Rainier, a Cascade composite volcano|Textbook 6.14.', 'Mauna Loa, a basaltic shield volcano over a hot spot|Different type and setting.', 'Laki: a basaltic fissure|Different style.', 'The Columbia Plateau: flood basalts|Different style.'], 'Textbook 6.14.', ['TB6:6.14'])
    ] });

  A.kase({ id: 'k6-compare', ch: 6, inv: true, title: 'Two volcanoes, two personalities',
    stem: '<p>Volcano 1 (left profile) is broad and gentle, built of dark vesicular basalt with ropy and jagged flow surfaces. Volcano 2 (right) is steep, built of andesite, pumice, and welded tuff, and has a crater. ' + DSN + '</p>',
    media: [{ kind: 'svg', name: 'volcano', spec: { type: 'shield', label: 'Volcano 1' } }, { kind: 'svg', name: 'volcano', spec: { type: 'composite', label: 'Volcano 2' } }],
    items: [
      it('parts', 'k6-compare-1', 'c6-gasvisc', 'Compare the two volcanoes.', [
        P('Magma viscosity, Volcano 1', ['Low', 'High'], 'Low', 'Hot basalt with fewer silicate chains.'),
        P('Magma viscosity, Volcano 2', ['Low', 'High'], 'High', 'Silica-rich andesite.'),
        P('Typical eruption, Volcano 1', ['Mostly lava flows and fountains', 'Explosive columns and pyroclastic flows'], 'Mostly lava flows and fountains', 'Gas escapes easily.'),
        P('Typical eruption, Volcano 2', ['Mostly lava flows and fountains', 'Explosive columns and pyroclastic flows'], 'Explosive columns and pyroclastic flows', 'Gas is trapped.')], 'Textbook 6.2.', ['TB6:6.2', 'TB5:5.7']),
      it('match', 'k6-compare-2', 'c6-basaltic', 'Match each flow surface on Volcano 1 to its name.', [['Ropy, smooth, billowing', 'Pahoehoe'], ['Rough, jagged blocks', 'Aa'], ['Insulated channel beneath a solid roof', 'Lava tube']], 'Textbook 6.3.', ['TB6:6.3']),
      it('mc', 'k6-compare-3', 'c6-colflow', 'During an eruption of Volcano 2, the column suddenly collapses and a hot cloud races downhill. Why did it collapse?', ['*The gas content dropped and could no longer support the column|Textbook 6.2 A.', 'The wind stopped|Not the stated control.', 'Basaltic lava entered the vent and made the column heavier|Not the mechanism.', 'Rain cooled the column|Not the stated control.'], 'Textbook 6.2.', ['TB6:6.2']),
      it('mc', 'k6-compare-4', 'c6-hazrisk', 'Volcano 1 sits in an unpopulated desert; Volcano 2 sits above a city of one million. Which statement is best?', ['*Volcano 2 has both the greater hazard and the greater risk|Explosive style plus exposure.', 'Volcano 1 has the greater risk because its lava travels farther|No one is exposed.', 'Their risks are equal because both are active|Risk depends on exposure.', 'Neither has any hazard|Both are active volcanoes.'], 'Textbook 6.6 and 6.12.', ['TB6:6.6', 'TB6:6.12'])
    ] });
})((typeof window !== 'undefined' ? window : globalThis).L);
