/* Chapter 3; Plate Tectonics. Evidence: Lecture 3 (45 slides), Sep 1 recording (continental drift, belts, boundary types,
   rifting stages, ocean-ocean subduction), Sep 8 recording (fracture zone vs. transform, Mendocino triple junction). */
(function (L) {
  'use strict';
  var A = L.A, S = function (n) { return 'assets/img/slides/l3-slide-' + n + '.jpg'; };
  function img(n, cap) { return { kind: 'img', src: S(n), cap: cap, alt: cap }; }
  var BT = ['Divergent', 'Convergent', 'Transform'];

  // ---------- 3.1 ----------
  A.section({ id: 'c3s1', ch: 3, n: '3.1', title: 'Reading the ocean floor and tectonic landscapes', srcText: 'Lec 3 s2–10 · Rec. Sep 1', src: ['L3:2', 'L3:3', 'L3:4', 'L3:5', 'L3:10', 'T0901'],
    concepts: [['c3-seafloor', 'Major seafloor and continental features'], ['c3-bathy', 'Reading depth colors on relief maps']] });
  A.cards('c3s1', [
    { id: 'g3-1a', h: 'The features plate tectonics has to explain', c: ['c3-seafloor'], src: ['L3:10', 'L3:4', 'L3:5', 'T0901'],
      html: '<p>Slide 10 names the main features: <b>mid-ocean ridges</b> (undersea mountain ranges), <b>deep ocean trenches</b>, <b>oceanic fracture zones</b> (linear steps in the seafloor), <b>continental shelves</b>, <b>linear island and seamount chains</b>, <b>submerged ridges and island arcs</b>, <b>oceanic plateaus</b>, and continents.</p><p>Close-ups: <b>South America</b> has a trench, the Andes, and a low-relief interior on the west-to-east path, with a broad shelf only on the east; the <b>South Atlantic</b> has a central ridge with zigzags, fracture zones, shelves on both sides and no trenches; <b>Japan</b> has curving ridges (island arc) beside trenches; <b>Tibet</b> is the highest broad plateau, bordered by the Himalaya.</p>',
      media: [img(10, 'Lec 3 s10: main features of Earth\'s surface'), img(5, 'Lec 3 s5: South Atlantic')],
      traps: ['Calling a mid-ocean ridge a trench because both are “in the ocean.” Ridges are high; trenches are the deepest places.'] },
    { id: 'g3-1b', h: 'Reading depth on the maps', c: ['c3-bathy'], src: ['T0901', 'L3:3'],
      html: '<p>On Sep 1 the professor explained the colors: <b>dark blue = deep water</b> (around 3–5 km or more), <b>light blue = shallow water</b> (a mid-ocean ridge rises to within roughly 2 km of the surface; shelves are shallower still). Land images are often <b>false color</b> from satellite data, so a color can stand for a measurement rather than what your eye would see. Water depth is <b>bathymetry</b>.</p><p>Example from the Pacific Northwest (slide 3): a linear <b>step in the seafloor</b> separates shallower water to the north from much deeper water to the south; a fracture zone.</p>',
      media: img(3, 'Lec 3 s3: Pacific Northwest: ridge, step in seafloor, Cascade volcanoes') }
  ]);
  A.match('c3-seafloor-x1', 'c3-seafloor', 'Match each feature to its description.', [
    ['Mid-ocean ridge', 'Long undersea mountain range, shallower than the seafloor on both sides'], ['Oceanic trench', 'Deepest, narrow trough in the ocean floor'], ['Fracture zone', 'Long linear scar on the seafloor extending beyond a ridge offset'], ['Continental shelf', 'Broad shallow platform bordering a continent'], ['Island arc', 'Curved chain of volcanic islands beside a trench']],
    'Lecture 3 slides 3–10 and the Sep 1 recording.', ['L3:10', 'T0901']);
  A.mc('c3-seafloor-m1', 'c3-seafloor', 'Crossing the South Atlantic from Brazil to Africa, which sequence of features would you encounter?',
    ['*Shelf, deep smooth seafloor, ridge, deep smooth seafloor, shelf|Slide 5: shelves on both sides, no trenches, a central ridge.',
     'Trench, island arc, ridge, island arc, trench|The South Atlantic has no trenches or arcs.', 'Shelf, trench, ridge, trench, shelf|The slide notes there are no trenches.', 'Mountain belt, high plateau, ridge, high plateau, mountain belt|These are not the South Atlantic features.'],
    'Lecture 3 slide 5: ridge with zigzags and fracture zones; continental shelves on both sides of the ocean (no trenches); smooth, deep seafloor away from the ridge.', ['L3:5']);
  A.mc('c3-seafloor-m2', 'c3-seafloor', 'A long, curving chain of volcanic islands lies beside a deep, narrow trench. What is this combination called in Lecture 3?',
    ['*An island arc next to an oceanic trench|Slide 8 (Japan) labels curving ridges and oceanic trenches.', 'A mid-ocean ridge and its rift|A ridge is a broad mountain range, not a curved island chain beside a trench.', 'A hot-spot island chain|Hot-spot chains are linear and not tied to trenches.', 'A continental shelf and the slope below it|Shelves are shallow platforms, not volcanic chains.'], 'Lecture 3 slides 8 and 10.', ['L3:8', 'L3:10']);
  A.mc('c3-bathy-m1', 'c3-bathy', 'On a relief map of the ocean floor, a light-blue band runs down the middle of an ocean with dark blue on both sides. What does the light band most likely represent?',
    ['*A mid-ocean ridge, where the water is shallower|Light blue = shallower water; the central band is the ridge.', 'A trench, the deepest part of the ocean|Trenches appear dark (deep).', 'A zone of warm surface water|Colors on these maps represent depth.', 'A continental shelf standing in the middle of the ocean basin|Shelves border continents.'], 'Sep 1 recording: dark blue ≈ 3–5 km deep; lighter blue along the mid-Atlantic ridge ≈ shallower than 2 km.', ['T0901', 'L3:5']);
  A.fill('c3-bathy-f1', 'c3-bathy', 'The measurement of water depth and the shape of the seafloor is called <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['bathymetry'], 'Sep 1 recording (“the word for that is bathymetry”).', ['T0901']);

  // ---------- 3.2 ----------
  A.section({ id: 'c3s2', ch: 3, n: '3.2', title: 'Continental drift: evidence and the missing mechanism', srcText: 'Lec 3 s11–15 · Rec. Sep 1', src: ['L3:11', 'L3:12', 'L3:13', 'L3:14', 'L3:15', 'T0901'],
    concepts: [['c3-drift-evidence', 'Evidence for continental drift'], ['c3-drift-problem', 'Why drift was rejected at first']] });
  A.cards('c3s2', [
    { id: 'g3-2a', h: 'Observation → hypothesis → tests', c: ['c3-drift-evidence'], src: ['L3:11', 'L3:12', 'L3:13', 'L3:14', 'T0901'],
      html: '<table><tr><th>Observation</th><th>Interpretation</th></tr><tr><td>Shapes of continents match across the Atlantic (Brazil\'s corner fits Africa\'s indentation)</td><td>They were once joined, then moved apart; the <b>continental drift</b> hypothesis (Wegener)</td></tr><tr><td>Fossils of the same land creatures (e.g., <i>Mesosaurus</i>) on continents now separated by oceans</td><td>Continents were joined so creatures could move between them</td></tr><tr><td>Glacial scratches (striations/grooves) record ice flowing from directions that are now ocean</td><td>With continents restored, ice sheets flowed outward from a center</td></tr><tr><td>Similar rocks and structures on matching coasts (Sep 1)</td><td>Same geology once continuous</td></tr></table><p>The joined southern continents are called <b>Gondwana</b> (Sep 1).</p>',
      media: [img(12, 'Lec 3 s12'), img(13, 'Lec 3 s13: fossils'), img(14, 'Lec 3 s14: glaciers')] },
    { id: 'g3-2b', h: 'The weakness: no mechanism', c: ['c3-drift-problem'], src: ['L3:15', 'T0901'],
      html: '<p>Wegener could not explain <b>what force moves continents</b>. His suggestions (tidal pull of the Moon, continents plowing through ocean crust) were shown by calculation to be far too weak. Slide 15 adds that some geologists were unfamiliar with data from other parts of the world. Drift was largely rejected from the 1930s until new seafloor data in the 1950s–60s revived it as <b>plate tectonics</b>, which supplies a mechanism (seafloor spreading, ridge push, slab pull, mantle convection).</p>',
      traps: ['Saying drift was rejected for lack of evidence; the matching evidence existed; the mechanism was missing.'] }
  ]);
  A.ms('c3-drift-evidence-s1', 'c3-drift-evidence', 'Which observations were used as evidence that continents were once joined? Select all that apply.',
    ['*Coastlines of South America and Africa fit together|Slide 12.', '*The same land-dwelling fossil species on continents now separated by ocean|Slide 13.', '*Glacial scratches showing ice flowing from what is now ocean|Slide 14.',
     'Magnetometer measurements of ocean-floor stripes in Wegener\'s time|Magnetic stripes came decades later and support plate tectonics, not Wegener\'s original case.'],
    'Lecture 3 slides 12–14; the Sep 1 recording adds matching rocks.', ['L3:12', 'L3:13', 'L3:14', 'T0901']);
  A.mc('c3-drift-evidence-m1', 'c3-drift-evidence', 'Why do fossils of a small land reptile found in both South America and Africa support continental drift?',
    ['*The animal could not have crossed a wide ocean, so the land was probably connected|Slide 13: creatures could walk from one place to another when continents were joined.',
     'The fossils prove the ocean between the continents was once shallow enough for the reptile to wade across|No evidence of a shallow crossing is offered.', 'Reptiles always evolve the same way on different continents|Independent identical evolution is not the argument.', 'The fossils were carried across by glaciers|Glaciers do not explain matching living populations.'], 'Lecture 3 slide 13.', ['L3:13']);
  A.mc('c3-drift-evidence-m2', 'c3-drift-evidence', 'Glacial striations in southern Africa, India, and Australia point in directions that come from today\'s oceans. How does restoring the continents resolve this?',
    ['*When the continents are fitted together, the scratches point outward from a single ice cap|Slide 14 interpretation.',
     'It shows the ice sheets flowed uphill out of the ocean and onto each continent separately|Ice sheets do not originate in the ocean.', 'It shows the scratches were made by rivers, not ice|Striations are glacial scratches.', 'It proves the continents were at the North Pole|The pattern radiates from a southern ice cap in the reconstruction.'], 'Lecture 3 slide 14.', ['L3:14']);
  A.tf('c3-drift-problem-t1', 'c3-drift-problem', 'Continental drift was widely rejected mainly because there was no evidence that the continents had ever been joined.', false, 'The matching evidence existed; the missing piece was a force strong enough to move continents (Lecture 3 slide 15; Sep 1).', ['L3:15', 'T0901']);
  A.mc('c3-drift-problem-m1', 'c3-drift-problem', 'Why did many scientists reject Wegener\'s continental drift for decades?',
    ['*He could not explain what force was strong enough to move continents|Slide 15 lists “mechanism” first; Sep 1: proposed forces were far too weak.',
     'No one had noticed that coastlines matched|The fit was the original observation.', 'Fossils found on the different continents turned out to be completely different species|Matching fossils were evidence for drift.', 'Continental drift predicted that continents never move|It predicted that they do move.'], 'Lecture 3 slide 15; Sep 1 recording.', ['L3:15', 'T0901']);
  A.fill('c3-drift-f1', 'c3-drift-evidence', 'Wegener\'s early hypothesis that continents were once joined and later moved apart is called continental <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['drift'], 'Lecture 3 slide 12.', ['L3:12']);

  // ---------- 3.3 ----------
  A.section({ id: 'c3s3', ch: 3, n: '3.3', title: 'Activity belts, plates, and three kinds of boundaries', srcText: 'Lec 3 s16–21 · Rec. Sep 1', src: ['L3:16', 'L3:17', 'L3:18', 'L3:19', 'L3:20', 'L3:21', 'T0901'],
    concepts: [['c3-belts', 'Belts of tectonic activity define plates'], ['c3-boundtypes', 'Divergent, convergent, transform']] });
  A.cards('c3s3', [
    { id: 'g3-3a', h: 'Earthquakes, volcanoes, and mountains line up', c: ['c3-belts'], src: ['L3:16', 'L3:17', 'L3:18', 'L3:19', 'T0901'],
      html: '<p>Earthquakes are concentrated in <b>narrow belts</b>: along mid-ocean ridges, trenches, and mountain belts, and are sparse in continental interiors. Volcanoes follow similar belts (ridges, island arcs next to trenches, mountain belts next to trenches), plus isolated oceanic islands (Hawaii) and the Red Sea/East Africa. Earthquakes, volcanism, and mountain building together are <b>tectonic activity</b>. <b>Belts of tectonic activity divide the lithosphere into tectonic plates</b>; plate interiors are relatively quiet.</p><p>Sep 1: the professor counted <b>7 major plates and 6 smaller ones (13 total)</b> on the lecture map (e.g., Pacific, North American, South American, African, Eurasian, Australian-Indian, Antarctic; Nazca, Cocos, Caribbean, Arabian, Philippine…). Counts differ between maps; know how plates are defined, not only the number.</p>',
      media: [img(16, 'Lec 3 s16: earthquakes'), img(17, 'Lec 3 s17: volcanoes'), img(19, 'Lec 3 s19: belts define plates')] },
    { id: 'g3-3b', h: 'Boundaries are defined by relative motion', c: ['c3-boundtypes'], src: ['L3:20', 'L3:21', 'T0901'],
      html: '<table><tr><th>Relative motion</th><th>Boundary</th><th>Typical features</th></tr><tr><td>Move apart</td><td><b>Divergent</b></td><td>Mid-ocean ridge, continental rift</td></tr><tr><td>Move toward each other</td><td><b>Convergent</b></td><td>Trench + island arc or volcanic mountain belt; collision mountains</td></tr><tr><td>Slide horizontally past</td><td><b>Transform</b></td><td>Offsets between ridge segments; e.g., San Andreas</td></tr></table>',
      media: img(20, 'Lec 3 s20: three types of relative plate motion') }
  ]);
  A.mc('c3-belts-m1', 'c3-belts', 'Maps of earthquakes, volcanoes, and high elevation are overlaid, and the three line up in narrow belts. What does Lecture 3 conclude from this?',
    ['*The belts mark plate boundaries that divide the lithosphere into plates|Slide 19: belts of tectonic activity divide the lithosphere into tectonic plates.',
     'The belts mark where the crust is thickest|Belts include mid-ocean ridges, where crust is thin.', 'Earthquakes cause volcanoes to form wherever the ground shakes hard enough, so the two always overlap|The belts share a cause (plate interaction); one does not create the other everywhere.', 'Plate interiors are where most earthquakes occur|Interiors are relatively quiet.'], 'Lecture 3 slides 16–19.', ['L3:19']);
  A.tf('c3-belts-t1', 'c3-belts', 'Most large earthquakes are scattered evenly across continents and ocean floors.', false,
    'Earthquakes are concentrated in belts (ridges, trenches, mountain belts) and are sparse in some regions; slide 16. Louisiana, for example, has very few (Sep 1).', ['L3:16', 'T0901']);
  A.fill('c3-belts-f1', 'c3-belts', 'Earthquakes, volcanism, and mountain building together are called <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> activity.', ['tectonic'], 'Lecture 3 slide 19.', ['L3:19']);
  A.match('c3-boundtypes-x1', 'c3-boundtypes', 'Match each relative motion to its boundary type.', [
    ['Plates move apart', 'Divergent'], ['Plates move toward each other', 'Convergent'], ['Plates slide horizontally past one another', 'Transform']], 'Lecture 3 slide 20.', ['L3:20']);
  A.mc('c3-boundtypes-m1', 'c3-boundtypes', 'Along a boundary, GPS shows one plate moving north at 4 cm/yr and the plate across the boundary moving south at 2 cm/yr, parallel to the boundary. What type of boundary is it?',
    ['*Transform|Motion is parallel to the boundary: the plates slide past each other.', 'Divergent|Divergent plates move apart, perpendicular to the boundary.', 'Convergent|Convergent plates move toward each other.', 'It cannot be classified without volcano data|Boundary type is defined by relative motion.'], 'Lecture 3 slide 20: horizontal motion past one another = transform.', ['L3:20']);
  A.fill('c3-boundtypes-f1', 'c3-boundtypes', 'A plate boundary where two plates move apart is a <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> boundary.', ['divergent'], 'Lecture 3 slide 20.', ['L3:20']);
  A.fill('c3-boundtypes-f2', 'c3-boundtypes', 'A plate boundary where two plates move toward each other is a <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> boundary.', ['convergent'], 'Lecture 3 slide 20.', ['L3:20']);

  // ---------- 3.4 ----------
  A.section({ id: 'c3s4', ch: 3, n: '3.4', title: 'Divergence: mid-ocean ridges and continental rifts', srcText: 'Lec 3 s22–24 · Rec. Sep 1', src: ['L3:22', 'L3:23', 'L3:24', 'T0901'],
    concepts: [['c3-mor', 'Processes at a mid-ocean ridge'], ['c3-rifting', 'From continental rift to ocean']] });
  A.cards('c3s4', [
    { id: 'g3-4a', h: 'What happens at a mid-ocean ridge', c: ['c3-mor'], src: ['L3:22', 'L3:23', 'T0901'],
      html: '<ol><li>Plates move apart (<b>seafloor spreading</b>), leaving a <b>narrow trough or rift</b> along the crest.</li><li><b>Asthenosphere rises and melts</b>.</li><li><b>Magma rises through fractures</b>, erupts or solidifies at depth, and <b>forms new oceanic crust</b>.</li><li>The <b>ridge stands high because the rocks are hot and the lithosphere is thin</b>; hot material expands (Sep 1).</li><li>Crust gets <b>older and colder away from the ridge</b>.</li></ol><p>Earthquakes happen as blocks drop into the rift; volcanism builds new crust (Sep 1).</p>',
      media: [{ kind: 'svg', name: 'boundary', spec: { type: 'divergent' }, cap: 'Original cross section after Lec 3 s23.' }, img(23, 'Lec 3 s23')],
      traps: ['Explaining the ridge\'s height by piled-up lava alone; the lecture reason is hot, expanded rock and thin lithosphere.'] },
    { id: 'g3-4b', h: 'Rifting a continent, stage by stage', c: ['c3-rifting'], src: ['L3:24', 'T0901'],
      html: '<p><b>1.</b> Rising mantle causes <b>initial uplift</b>. <b>2.</b> <b>Stretching and faulting form a rift</b> (example: <b>East African Rift</b>; the Sep 1 lecture also named the Rio Grande rift); melting forms magma. <b>3.</b> Rifting can lead to <b>seafloor spreading and a new ocean basin</b> (example: <b>Red Sea</b>: a young ocean). <b>4.</b> The <b>ocean widens</b> with spreading (example: <b>modern Atlantic</b>). On Sep 1 the professor added that as the Atlantic grows, the Pacific shrinks.</p>',
      media: [{ kind: 'svg', name: 'riftstage', spec: { stage: 'rift', label: 'Continental rift (East Africa)' } }, { kind: 'svg', name: 'riftstage', spec: { stage: 'sea', label: 'Narrow new ocean (Red Sea)' } }, { kind: 'svg', name: 'riftstage', spec: { stage: 'ocean', label: 'Wide ocean with ridge (Atlantic)' } }] }
  ]);
  A.ms('c3-mor-s1', 'c3-mor', 'Which processes happen at a mid-ocean ridge according to Lecture 3? Select all that apply.',
    ['*Asthenosphere rises and partly melts|Slide 23.', '*Magma rises through fractures and forms new oceanic crust|Slide 23.', '*A narrow trough (rift) forms along the crest|Slide 23.',
     'Old oceanic crust sinks back into the mantle at the crest|Old crust sinks at subduction zones, not at ridges.'], 'Lecture 3 slides 22–23.', ['L3:23']);
  A.mc('c3-mor-m1', 'c3-mor', 'Why does a mid-ocean ridge stand higher than the ocean floor on either side?',
    ['*The rock beneath it is hot and the lithosphere is thin, so it is expanded and buoyant|Slide 23: “Ridge high (hot rocks and thin lithosphere).”',
     'Thick, buoyant continental crust is piled up along the crest of the ridge|Ridges are made of oceanic crust.', 'Sediment accumulates fastest at the crest|Sediment is thinnest at the ridge.', 'Colliding plates push the crest upward|Plates move apart at ridges.'], 'Lecture 3 slide 23; Sep 1 recording.', ['L3:23', 'T0901']);
  A.parts('c3-mor-p1', 'c3-mor', 'Label the numbered features on this ridge cross section.', [
    { label: '1', options: ['Rift at the ridge crest', 'Trench', 'Accretionary prism', 'Continental shelf'], a: 'Rift at the ridge crest', why: 'Narrow trough where plates pull apart.' },
    { label: '2', options: ['Rising, partly melting asthenosphere', 'Subducting slab', 'Outer core', 'Continental crust'], a: 'Rising, partly melting asthenosphere', why: 'Decompression brings mantle up and melts it.' },
    { label: '3', options: ['New oceanic crust moving away', 'Old crust sinking at the ridge', 'Island arc', 'Transform fault'], a: 'New oceanic crust moving away', why: 'Crust forms at the ridge and moves outward.' }],
    'Lecture 3 slide 23 asks you to sketch a mid-ocean ridge and label the processes.', ['L3:23'], { media: { kind: 'svg', name: 'boundary', spec: { type: 'divergent', markers: true } }, mk: 'inv' });
  A.fill('c3-mor-f1', 'c3-mor', 'The process by which new oceanic crust forms at a mid-ocean ridge as plates move apart is called seafloor <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['spreading'], 'Lecture 3 slide 22.', ['L3:22']);
  A.order('c3-rifting-o1', 'c3-rifting', 'Order the stages of continental rifting shown in Lecture 3.', ['Uplift from rising mantle', 'Stretching and faulting form a rift valley', 'Seafloor spreading begins; a narrow sea forms', 'Ocean widens with continued spreading'],
    'Slide 24: initial uplift → rift (East African Rift) → new ocean basin (Red Sea) → widening ocean (Atlantic).', ['L3:24']);
  A.match('c3-rifting-x1', 'c3-rifting', 'Match each modern example to its stage of rifting.', [
    ['East African Rift', 'Continental rift valley'], ['Red Sea', 'Young, narrow ocean with a spreading center'], ['Atlantic Ocean', 'Wide ocean that keeps widening']], 'Lecture 3 slide 24; Sep 1 recording.', ['L3:24', 'T0901']);
  A.mc('c3-rifting-m1', 'c3-rifting', 'What single feature tells you a rift has become an <b>ocean</b> rather than a continental rift?',
    ['*A spreading center is making new oceanic crust|Sep 1: seafloor spreading defines an ocean; the Red Sea already has one.', 'The rift valley has a lake in it|Lakes form in continental rifts too.', 'The rift has grown longer than about 100 kilometers|Length does not define an ocean.', 'Earthquakes occur there|Both stages have earthquakes.'], 'Sep 1 recording on the Red Sea; Lecture 3 slide 24.', ['T0901', 'L3:24']);

  // ---------- 3.5 ----------
  A.section({ id: 'c3s5', ch: 3, n: '3.5', title: 'Convergence: subduction, the Ring of Fire, and collisions', srcText: 'Lec 3 s25–30 · Rec. Sep 1', src: ['L3:25', 'L3:26', 'L3:27', 'L3:28', 'L3:29', 'L3:30', 'T0901'],
    concepts: [['c3-subduction', 'Subduction and island arcs'], ['c3-ringfire', 'Pacific Ring of Fire'], ['c3-collision', 'Continent-continent collision']] });
  A.cards('c3s5', [
    { id: 'g3-5a', h: 'Ocean-ocean convergence: trench and island arc', c: ['c3-subduction'], src: ['L3:25', 'L3:26', 'T0901'],
      html: '<p>When two oceanic plates converge, <b>one moves down (subduction)</b>. On Sep 1 the professor explained which one: the <b>older, colder, denser plate sinks</b>. Features: a <b>trench</b> where the plate bends down; an <b>accretionary prism</b> of scraped-off material; the <b>slab releases water</b>; <b>water causes melting of the mantle</b> above the slab; <b>magma rises</b> through mantle and crust; <b>eruptions form a volcanic island arc</b> (e.g., Japan).</p>',
      media: [{ kind: 'svg', name: 'boundary', spec: { type: 'ocean-ocean' }, cap: 'Original sketch after Lec 3 s26.' }, img(26, 'Lec 3 s26')],
      traps: ['Saying the subducting slab itself melts to feed the arc; the lecture says water released from the slab melts the mantle above it.'] },
    { id: 'g3-5b', h: 'Why the Pacific is ringed by volcanoes', c: ['c3-ringfire'], src: ['L3:27', 'L3:28'],
      html: '<p>Oceanic plates are being <b>subducted on both sides of the Pacific</b>, while new crust forms at the <b>East Pacific Rise</b>. Where subduction is beneath <b>oceanic</b> plates you get <b>island arcs</b> (e.g., Japan, west Pacific). Where it is beneath <b>continental</b> plates you get <b>mountain belts with volcanoes</b> (e.g., Andes, east Pacific).</p>', media: img(28, 'Lec 3 s28') },
    { id: 'g3-5c', h: 'Continent-continent collision', c: ['c3-collision'], src: ['L3:29', 'L3:30', 'T0901'],
      html: '<p>Subduction of the oceanic part of a plate brings two continents together until they <b>collide</b>. <b>Continental plate is buoyant, so subduction ends</b>. Results: a <b>wide zone of deformation</b>, <b>pieces sliced off</b>, <b>thick crust = high elevation</b>, and <b>few volcanoes</b>. The Himalaya and Tibetan Plateau are the example; the peaks are still rising and the region has many large earthquakes (Sep 1).</p>',
      media: [{ kind: 'svg', name: 'boundary', spec: { type: 'continent-continent' }, cap: 'Original sketch after Lec 3 s30.' }] }
  ]);
  A.mc('c3-subduction-m1', 'c3-subduction', 'Two oceanic plates converge. Plate X formed 150 million years ago; plate Y formed 20 million years ago. Which plate subducts, according to the Sep 1 lecture reasoning?',
    ['*Plate X, because older oceanic lithosphere is colder and denser|The professor: the older, colder, denser plate goes down.', 'Plate Y, because younger crust is heavier and hotter crust sinks first|Younger crust is hotter and more buoyant.', 'Neither; oceanic plates always collide without subduction|Ocean-ocean convergence produces subduction.', 'Both sink together|One plate goes beneath the other.'], 'Sep 1 recording on ocean-ocean convergence; Lecture 3 slide 25.', ['T0901', 'L3:25']);
  A.mc('c3-subduction-m2', 'c3-subduction', 'What causes melting above a subducting slab, according to Lecture 3 slide 26?',
    ['*Water released from the slab lowers the melting temperature of the overlying mantle|Slide 26: slab releases water; water causes melting of mantle.',
     'Friction between the plates melts the entire slab right at the trench|The slide attributes melting to water, not friction at the trench.', 'The slab reaches the outer core and melts|Slabs do not melt at the core.', 'Seawater boils the rock at the trench|Melting happens deep, above the slab.'], 'Lecture 3 slide 26; textbook 5.10 gives the same mechanism.', ['L3:26', 'TB5:5.10']);
  A.parts('c3-subduction-p1', 'c3-subduction', 'Label the numbered features on this ocean-ocean convergent boundary.', [
    { label: '1', options: ['Trench', 'Rift', 'Island arc', 'Fracture zone'], a: 'Trench', why: 'Where the subducting plate bends down.' },
    { label: '2', options: ['Slab releases water', 'Mantle plume', 'Continental root', 'Magnetic stripe'], a: 'Slab releases water', why: 'Water-bearing minerals break down as the slab descends.' },
    { label: '3', options: ['Mantle melts (water added)', 'Outer core melts', 'Crust melts at the trench', 'Sediment melts on the seafloor'], a: 'Mantle melts (water added)', why: 'Water lowers the mantle\'s melting temperature.' },
    { label: '4', options: ['Volcanic island arc', 'Mid-ocean ridge', 'Hot-spot island', 'Continental rift'], a: 'Volcanic island arc', why: 'Magma erupts on the overriding oceanic plate.' }],
    'Lecture 3 slide 26 asks you to sketch and label ocean-ocean convergence.', ['L3:26'], { media: { kind: 'svg', name: 'boundary', spec: { type: 'ocean-ocean', markers: true } }, mk: 'inv' });
  A.fill('c3-subduction-f1', 'c3-subduction', 'The process in which one lithospheric plate moves down beneath another into the mantle is <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['subduction'], 'Lecture 3 slide 25.', ['L3:25']);
  A.mc('c3-ringfire-m2', 'c3-ringfire', 'Where is new oceanic crust being made within the Pacific basin, even as the Pacific is subducted along its edges?',
    ['*At the East Pacific Rise|Lecture 3 slide 28.', 'At the Mariana Trench|Trenches consume crust.', 'Beneath the Andes|That is a subduction margin.', 'Along the coast of Japan|An island-arc subduction margin.'], 'Lecture 3 slides 27–28.', ['L3:27', 'L3:28']);
  A.mc('c3-ringfire-m1', 'c3-ringfire', 'Why are the volcanoes on the western side of the Pacific mostly island arcs, while those on the eastern side (South America) sit in a mountain belt?',
    ['*In the west, subduction is beneath oceanic plates; in the east, beneath a continental plate|Slide 28: island arcs vs. mountain belts with volcanoes.',
     'The west Pacific has divergent boundaries and the east Pacific has convergent ones|Both sides are dominated by subduction.', 'Hot spots feed the west; subduction feeds the east|The Ring of Fire pattern is subduction on both sides.', 'The east Pacific has no subduction|South America\'s west coast has a trench and subduction.'], 'Lecture 3 slide 28.', ['L3:28']);
  A.mc('c3-collision-m1', 'c3-collision', 'Why do continent-continent collision zones like the Himalaya have <b>few volcanoes</b> compared with subduction zones?',
    ['*Buoyant continental crust stalls subduction, so arc-type melting largely ends|Slide 30: continental plate buoyant, so subduction ends; few volcanoes.',
     'Continental crust cannot melt under any conditions, no matter how deep it is pushed|Continental crust can melt; the point is subduction stops.', 'The mountains are too cold for magma|Temperature of mountains is not the lecture\'s reason.', 'Collision zones are divergent boundaries|They are convergent.'], 'Lecture 3 slides 29–30.', ['L3:30']);
  A.ms('c3-collision-s1', 'c3-collision', 'Which features characterize a continent-continent collision in Lecture 3? Select all that apply.',
    ['*Wide zone of deformation|Slide 30.', '*Thick crust and high elevation|Slide 30.', '*Pieces of crust sliced off and stacked|Slide 30.', 'A chain of large composite volcanoes along a trench|That describes ocean-continent subduction.'], 'Lecture 3 slide 30.', ['L3:30']);

  // ---------- 3.6 ----------
  A.section({ id: 'c3s6', ch: 3, n: '3.6', title: 'Transforms, fracture zones, and boundary geometry', srcText: 'Lec 3 s31–33, s37–38 · Rec. Sep 8', src: ['L3:31', 'L3:32', 'L3:33', 'L3:37', 'L3:38', 'T0908'],
    concepts: [['c3-transform', 'Transform faults vs. fracture zones'], ['c3-geometry', 'Boundary orientation controls boundary type']] });
  A.cards('c3s6', [
    { id: 'g3-6a', h: 'Transforms link other boundaries', c: ['c3-transform'], src: ['L3:31', 'L3:32', 'T0908'],
      html: '<p>On a <b>transform boundary</b>, plates move <b>horizontally past one another</b>. Most transforms <b>link spreading segments</b> of a mid-ocean ridge, which is why ridges zigzag. On Sep 8 the professor drew the distinction that trips people up: the offset between two ridge segments is an <b>active transform fault</b>; its continuation beyond the segments is a <b>fracture zone</b>: an <b>inactive</b> scar where both sides now move the same direction. Where three boundaries meet is a <b>triple junction</b> (e.g., the Mendocino triple junction off northern California).</p>',
      media: [{ kind: 'svg', name: 'boundary', spec: { type: 'transform' }, cap: 'Original map-view sketch: the transform is active only between the ridge segments.' }, img(32, 'Lec 3 s32')],
      traps: ['Calling the whole fracture-zone line a transform. Only the part between ridge segments is active.'] },
    { id: 'g3-6b', h: 'Same plates, different boundary types', c: ['c3-geometry'], src: ['L3:37', 'L3:38', 'L3:33'],
      html: '<p>The type of boundary depends on how the boundary is <b>oriented relative to the motion</b>. Where the Pacific–North America boundary runs parallel to plate motion it is a transform (the <b>Queen Charlotte fault</b>); where it bends, the same motion becomes <b>convergent</b> and the Pacific plate is subducted beneath North America (slide 38). Transforms link two spreading centers or a spreading center with a subduction zone.</p>', media: [img(37, 'Lec 3 s37'), img(38, 'Lec 3 s38')] }
  ]);
  A.parts('c3-transform-p1', 'c3-transform', 'In this map view of a ridge offset, identify each numbered feature.', [
    { label: '1', options: ['Spreading segment', 'Active transform fault', 'Inactive fracture zone'], a: 'Spreading segment', why: 'Where plates diverge and new crust forms.' },
    { label: '2', options: ['Spreading segment', 'Active transform fault', 'Inactive fracture zone'], a: 'Active transform fault', why: 'Between the segments the two sides move in opposite directions.' },
    { label: '3', options: ['Spreading segment', 'Active transform fault', 'Inactive fracture zone'], a: 'Inactive fracture zone', why: 'Beyond the segments both sides move the same way.' }],
    'Sep 8 recording: a transform is active; a fracture zone is inactive.', ['T0908', 'L3:31'], { media: { kind: 'svg', name: 'boundary', spec: { type: 'transform', markers: true } }, mk: 'inv' });
  A.mc('c3-transform-m1', 'c3-transform', 'What is the key difference between a transform fault and a fracture zone, as explained on Sep 8?',
    ['*The transform is active; the fracture zone is its inactive continuation|Plates on both sides of a fracture zone move the same way.',
     'A fracture zone is active and a transform is inactive|Reversed.', 'Transforms occur only on land, while fracture zones occur only on the seafloor|Both are commonly oceanic; the San Andreas is a transform on land.', 'They differ only in length|The difference is activity, not length.'], 'Sep 8 recording (Mendocino example).', ['T0908']);
  A.fill('c3-transform-f1', 'c3-transform', 'A point where three plate boundaries meet is called a <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> junction.', ['triple'], 'Sep 8 recording: Mendocino triple junction.', ['T0908']);
  A.fill('c3-geometry-f1', 'c3-geometry', 'Where the Pacific–North America boundary runs parallel to plate motion off western Canada, it is a <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> boundary.', ['transform', 'transform fault'], 'Lecture 3 slides 37–38 (Queen Charlotte fault).', ['L3:37', 'L3:38']);
  A.mc('c3-geometry-m1', 'c3-geometry', 'Two plates keep moving in the same directions, but their shared boundary bends from parallel to the motion to perpendicular to it. What happens to the boundary type along the bend?',
    ['*It can become convergent or divergent where it bends, depending on the relative motion|Slide 37–38: orientation relative to motion sets the type.',
     'It stays a transform everywhere, because the same two plates are on either side of it|Boundary type depends on orientation relative to motion.', 'It becomes a hot spot|Hot spots are not a boundary type.', 'It stops being a boundary|The plates still meet along it.'], 'Lecture 3 slides 37–38.', ['L3:37', 'L3:38']);

  // ---------- 3.7 ----------
  A.section({ id: 'c3s7', ch: 3, n: '3.7', title: 'What moves plates, and how fast', srcText: 'Lec 3 s34–36', src: ['L3:34', 'L3:35', 'L3:36'],
    concepts: [['c3-forces', 'Ridge push, slab pull, convection'], ['c3-rates', 'Plate rates and directions']] });
  A.cards('c3s7', [
    { id: 'g3-7a', h: 'Driving forces', c: ['c3-forces'], src: ['L3:34'],
      html: '<p>Slide 34 names <b>ridge push</b> (the elevated ridge pushes plates outward), <b>slab pull</b> (the sinking slab pulls the rest of the plate), and <b>other forces, such as convection in the mantle</b>. This is the mechanism Wegener lacked.</p>', media: img(34, 'Lec 3 s34') },
    { id: 'g3-7b', h: 'Rates are centimeters per year', c: ['c3-rates'], src: ['L3:35', 'L3:36'],
      html: '<p>Plates move <b>centimeters per year</b>: about fingernail-growth speed; and some move faster than others. On direct-measurement maps, <b>arrows show direction</b>, <b>longer arrows mean faster</b>, and some arrows curve because plates rotate on a sphere. Over millions of years, cm/yr adds up to thousands of kilometers.</p><button class="btn small" data-guidegen="hotspotRate">Practice rate calculations (5)</button>', media: img(36, 'Lec 3 s36') }
  ]);
  A.match('c3-forces-x1', 'c3-forces', 'Match each driving force to its description.', [
    ['Slab pull', 'A dense subducting plate drags the rest of the plate behind it'], ['Ridge push', 'Elevated, hot lithosphere at the ridge pushes plates outward'], ['Mantle convection', 'Circulation of hot and cooler mantle material']], 'Lecture 3 slide 34.', ['L3:34']);
  A.mc('c3-forces-m1', 'c3-forces', 'Which force is tied to the <b>downgoing</b> part of a plate at a subduction zone?',
    ['*Slab pull|The sinking slab pulls the plate.', 'Ridge push|Acts at the elevated ridge, not the trench.', 'Isostasy|A balance of floating crust, not a plate-driving force on the slide.', 'Tidal pull of the Moon|One of Wegener\'s proposed forces, shown to be too weak.'], 'Lecture 3 slide 34; Sep 1 recording.', ['L3:34', 'T0901']);
  A.num('c3-rates-n1', 'c3-rates', 'A plate moves 5 cm per year. How many kilometers does it move in 1 million years? (100,000 cm = 1 km)', 50, 0, 'km',
    '5 cm/yr × 1,000,000 yr = 5,000,000 cm = 50 km.', ['L3:35'], { tier: 2 });
  A.mc('c3-rates-m1', 'c3-rates', 'On a map of measured plate motions, what does a longer arrow indicate?',
    ['*A faster rate of motion|Slide 36: higher rates shown by longer arrows.', 'An older plate|Arrow length shows rate, not age.', 'A deeper earthquake|Arrows show motion.', 'A thicker plate|Arrow length is about speed.'], 'Lecture 3 slide 36.', ['L3:36']);

  // ---------- 3.8 ----------
  A.section({ id: 'c3s8', ch: 3, n: '3.8', title: 'Testing plate tectonics: stripes, ages, hot spots, South America', srcText: 'Lec 3 s39–45', src: ['L3:39', 'L3:40', 'L3:41', 'L3:42', 'L3:43', 'L3:44', 'L3:45'],
    concepts: [['c3-magnetic', 'Magnetic reversals and stripes'], ['c3-seafloorage', 'Seafloor age and sediment thickness'], ['c3-hotspot', 'Hot-spot island chains'], ['c3-samerica', 'Why South America is lopsided']] });
  A.cards('c3s8', [
    { id: 'g3-8a', h: 'Magnetic stripes: a tape recorder at the ridge', c: ['c3-magnetic'], src: ['L3:39', 'L3:40', 'L3:41'],
      html: '<p>Earth\'s magnetic field comes from <b>convection currents in the liquid outer core</b> and <b>reverses</b> over time (normal vs. reversed polarity). New crust at a ridge records the field as it cools. As spreading continues, each stripe is carried away and split, producing <b>stripes that are symmetric (mirror images) on both sides of the ridge</b>.</p>',
      media: [{ kind: 'svg', name: 'stripes', spec: { pattern: [2, 3, 1, 4, 2], showRidge: true }, cap: 'Original sketch: the pattern on one side mirrors the other.' }, img(40, 'Lec 3 s40')],
      traps: ['Expecting stripes to get younger away from the ridge; the youngest crust is at the ridge.'] },
    { id: 'g3-8b', h: 'Drill cores: older crust, thicker sediment', c: ['c3-seafloorage'], src: ['L3:42'],
      html: '<p>Drilling showed <b>volcanic rocks of the oceanic crust are youngest near the ridge</b> (just formed) and <b>older with distance</b>, and <b>sediment thickens away from the ridge</b> because older seafloor has had more time to collect it. Both are predictions of seafloor spreading that passed the test.</p>', media: img(42, 'Lec 3 s42') },
    { id: 'g3-8c', h: 'Hot spots make age-progressive chains', c: ['c3-hotspot'], src: ['L3:43'],
      html: '<p>A <b>volcano forms over a hot spot</b>; as the <b>plate moves</b>, the volcano is carried away and <b>becomes inactive</b>, and a new one forms over the hot spot. The <b>plate subsides as it cools</b>, so old islands sink to become <b>seamounts</b>. Result: a <b>line of islands and seamounts</b> (e.g., Hawaii) that gets <b>older away from the active end</b>, pointing in the direction the plate moved away from.</p><button class="btn small" data-guidegen="hotspotRate">Practice hot-spot rate problems (5)</button>', media: img(43, 'Lec 3 s43') },
    { id: 'g3-8d', h: 'Why South America is lopsided', c: ['c3-samerica'], src: ['L3:44', 'L3:45', 'T0901'],
      html: '<p>West to east: an offshore <b>trench</b> → the <b>Andes</b> (mountains and volcanoes over a subduction zone) → a <b>low-relief interior</b> → the east coast, which is a <b>passive margin (not a plate boundary)</b> with a broad shelf → the <b>Mid-Atlantic Ridge</b>, where spreading occurs. South America and the western South Atlantic ride on the same plate.</p>',
      media: { kind: 'svg', name: 'samerica', spec: {}, cap: 'Original west-to-east cross section after Lec 3 s45 (not to scale).' } }
  ]);
  A.mc('c3-magnetic-m1', 'c3-magnetic', 'Why are magnetic stripes on the seafloor symmetric on the two sides of a mid-ocean ridge?',
    ['*Each band of new crust forms at the ridge and is split and carried away equally in both directions|Slide 40: normal stripe moved away from the ridge as spreading continued.',
     'The magnetic field is stronger near ridges and fades evenly with distance on both sides|Symmetry comes from spreading, not field strength.', 'Sediment covers the stripes evenly|Stripes are recorded in volcanic crust, not sediment.', 'Transform faults copy stripes from one side to the other|Transforms offset stripes; they do not create symmetry.'], 'Lecture 3 slides 40–41.', ['L3:40', 'L3:41']);
  A.mc('c3-magnetic-m2', 'c3-magnetic', 'Where is Earth\'s magnetic field generated, according to Lecture 3?',
    ['*By convection currents in the liquid outer core|Slide 39.', 'By magnetite crystals spread throughout the crust|Crustal rocks record the field; they do not generate it.', 'By the solid inner core rotating alone|Slide 39 names convection in the liquid outer core.', 'By the Sun\'s magnetic field|The field is internal.'], 'Lecture 3 slide 39.', ['L3:39']);
  A.fill('c3-magnetic-f1', 'c3-magnetic', 'A time when Earth\'s magnetic field flips so that a compass would point south is a magnetic <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['reversal', 'reversed polarity', 'reversal of polarity'], 'Lecture 3 slides 39–40.', ['L3:39', 'L3:40']);
  A.ms('c3-seafloorage-s1', 'c3-seafloorage', 'Drill cores are taken at increasing distance from a mid-ocean ridge. Which results support seafloor spreading? Select all that apply.',
    ['*Volcanic rock just under the sediment gets older with distance from the ridge|Slide 42.', '*Sediment on top of the crust gets thicker with distance from the ridge|Slide 42.', 'The oldest crust is found at the ridge crest|Reversed: the youngest is at the crest.', 'Sediment is thickest right at the ridge|Reversed: sediment is thinnest at the ridge.'], 'Lecture 3 slide 42.', ['L3:42']);
  A.mc('c3-seafloorage-m1', 'c3-seafloorage', 'Why is sediment thicker on seafloor far from a ridge?',
    ['*That seafloor is older, so it has had more time to accumulate sediment|Slide 42: had more time to accumulate.', 'Currents sweep sediment away from the ridges faster than it can settle there|Not the lecture\'s reason.', 'Ridges erupt sediment outward|Ridges erupt lava, not sediment.', 'Deep water makes sediment grow thicker|Time since formation, not depth itself, is the reason given.'], 'Lecture 3 slide 42.', ['L3:42']);
  A.mc('c3-hotspot-m1', 'c3-hotspot', 'In a hot-spot chain, the island at one end is active and the islands get progressively older toward the other end. What does this tell you?',
    ['*The plate moved away from the active end, carrying older volcanoes off the hot spot|Slide 43: volcanoes become inactive as the area moves away from the hot spot.',
     'The hot spot moved along beneath the plate while the plate itself stayed still|The lecture model has the plate moving over the hot spot.', 'All the islands erupted at the same time|The age progression rules this out.', 'The chain formed at a subduction zone|Hot-spot chains form away from plate boundaries.'], 'Lecture 3 slide 43.', ['L3:43']);
  A.mc('c3-hotspot-m2', 'c3-hotspot', 'Why do the oldest islands in a hot-spot chain become seamounts below sea level?',
    ['*The plate cools and subsides as it moves away, and erosion wears the islands down|Slide 43: plate subsides as it cools, so islands become seamounts.',
     'Sea level rises only near old islands|Sea level is global.', 'Seamounts are a different type of volcano that never grew tall enough to reach the surface|Here, seamounts are former islands.', 'The hot spot pulls them down|The hot spot is far from the old end.'], 'Lecture 3 slide 43.', ['L3:43']);
  A.fill('c3-hotspot-f1', 'c3-hotspot', 'A fixed source of rising hot mantle that builds a line of volcanoes on a moving plate is a <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['hot spot', 'hotspot', 'mantle plume'], 'Lecture 3 slide 43 (textbook 5.11 links hot spots to mantle plumes).', ['L3:43', 'TB5:5.11']);
  A.parts('c3-samerica-p1', 'c3-samerica', 'Label the numbered features on this west-to-east section across South America.', [
    { label: '1', options: ['Trench', 'Passive margin', 'Mid-Atlantic Ridge', 'Low-relief interior', 'Andes'], a: 'Trench', why: 'Where the oceanic plate subducts.' },
    { label: '2', options: ['Trench', 'Passive margin', 'Mid-Atlantic Ridge', 'Low-relief interior', 'Andes'], a: 'Andes', why: 'Mountains and volcanoes above the subduction zone.' },
    { label: '3', options: ['Trench', 'Passive margin', 'Mid-Atlantic Ridge', 'Low-relief interior', 'Andes'], a: 'Low-relief interior', why: 'Amazon lowlands.' },
    { label: '4', options: ['Trench', 'Passive margin', 'Mid-Atlantic Ridge', 'Low-relief interior', 'Andes'], a: 'Passive margin', why: 'East coast; not a plate boundary.' },
    { label: '5', options: ['Trench', 'Passive margin', 'Mid-Atlantic Ridge', 'Low-relief interior', 'Andes'], a: 'Mid-Atlantic Ridge', why: 'Spreading center.' }],
    'Lecture 3 slides 44–45.', ['L3:45'], { media: { kind: 'svg', name: 'samerica', spec: { markers: true } }, mk: 'inv' });
  A.mc('c3-samerica-m1', 'c3-samerica', 'Why does South America\'s east coast have a broad continental shelf and no trench, while the west coast has a trench?',
    ['*East: passive margin inside the plate; west: subduction boundary|Slide 45.', 'The east coast is a transform boundary where plates slide past each other|It is not a plate boundary at all.', 'Large rivers flowing west dredged a deep trench along the west coast|Trenches form by subduction.', 'The Atlantic is older than the Pacific|The Atlantic is the younger, widening ocean.'], 'Lecture 3 slide 45; Sep 1 recording on the east–west shelf contrast.', ['L3:45', 'T0901']);
  A.fill('c3-samerica-f1', 'c3-samerica', 'A continental edge that is not a plate boundary, such as South America\'s east coast, is a <u>&nbsp;&nbsp;&nbsp;&nbsp;</u> margin.', ['passive'], 'Lecture 3 slide 45.', ['L3:45']);
})((typeof window !== 'undefined' ? window : globalThis).L);
