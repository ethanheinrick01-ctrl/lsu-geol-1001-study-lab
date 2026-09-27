/* Chapter 1; The Nature of Geology. Evidence: Lecture 1b (31 slides; class stopped at slide 23 on Aug 25),
   Lecture 1a slide 18 (ILEA cycle), Sep 1 recording (method recap). All items are original. */
(function (L) {
  'use strict';
  var A = L.A, S = function (n) { return 'assets/img/slides/l1b-slide-' + n + '.jpg'; };
  function img(n, cap, alt) { return { kind: 'img', src: S(n), cap: cap, alt: alt || cap }; }

  // ---------- 1.1 ----------
  A.section({ id: 'c1s1', ch: 1, n: '1.1', title: 'Think like a geologist', srcText: 'Lec 1b s2–3, s9 · Lec 1a s18 · Rec. Sep 1', src: ['L1B:2', 'L1B:3', 'L1A:18', 'T0901'],
    concepts: [['c1-method', 'Research method sequence'], ['c1-obsinf', 'Observation vs. inference'], ['c1-ilea', 'ILEA problem-solving cycle']] });
  A.cards('c1s1', [
    { id: 'g1-1a', h: 'The research method is a loop, not a checklist', c: ['c1-method'], src: ['L1B:2', 'T0901'],
      html: '<p>Lecture 1b gives the sequence: <b>observe → describe → ask a question → make a hypothesis → test the hypothesis → adjust it with new data → build a model (interpretation)</b>. On Sep 1 the professor replayed it for continental drift: observe matching coastlines, ask why, propose a hypothesis, predict what else must be true (matching rocks, fossils, glacial scratches), then collect data. A hypothesis that survives many tests can become a theory; one that fails is revised.</p><p>The key move is the <b>prediction</b>: “If this hypothesis is right, what else must I find?” Data that could come out either way is what makes a test.</p>',
      traps: ['Treating a hypothesis as proven after one supporting observation.', 'Skipping the prediction step: a test needs an expected result that could fail.'] },
    { id: 'g1-1b', h: 'Observation vs. inference', c: ['c1-obsinf'], src: ['L1B:3', 'L1B:9'],
      html: '<p>An <b>observation</b> is what you can see or measure directly: “the cliff exposes tan, brown, and yellowish layers,” “blocks sit on top of the cliff.” An <b>inference</b> is an interpretation of cause or history: “the blocks fell from a higher ledge,” “the layers were deposited in water.” Good geology states observations first, then infers, and keeps the two separate so an inference can be tested.</p>',
      media: img(9, 'Lec 1b s9: What can you observe on this cliff before you explain it?'),
      traps: ['Smuggling a cause into an “observation” (“an old river cut this valley” is an inference).', 'Refusing to infer at all; the goal is a testable interpretation built on observations.'] },
    { id: 'g1-1c', h: 'ILEA cycle (in-class assignments)', c: ['c1-ilea'], src: ['L1A:18', 'SYL'], tier: 1,
      html: '<p>ILEAs use <b>Predict → Draw → Justify → Research → Revise understanding</b>. The syllabus says ILEAs are graded mainly on the quality of reasoning; observations, logical deductions, and hypothesis testing; not only on a single right answer. That is also the habit the investigation section of Exam 1 rewards.</p>' }
  ]);
  A.order('c1-method-o1', 'c1-method', 'Put the research method from Lecture 1b in order.', ['Observe', 'Describe', 'Ask a question', 'Make a hypothesis', 'Test the hypothesis', 'Adjust the hypothesis with new data', 'Make a model of interpretation'],
    'Observation and description come before any question; a hypothesis must exist before it can be tested; new data adjusts it; the end product is an interpretive model.', ['L1B:2']);
  A.mc('c1-method-m1', 'c1-method', 'A student notices that the coastlines of South America and Africa look like puzzle pieces and proposes that the continents were once joined. What is the <b>next</b> step that turns this idea into science?',
    ['*Predict other evidence that must exist if they were joined, then look for it|This is the test step: matching rocks, fossils, or glacial features on both sides are predictions that could fail.',
     'Declare the idea a theory right away, since a fit this close could not happen by chance|A good fit is one observation; a theory needs repeated successful tests.',
     'Describe the coastline shapes in more detail and stop there|Description supports observation, but it does not test the hypothesis.',
     'Reject the idea because nobody saw the continents move|Many geologic hypotheses concern unobserved past events; they are tested by their predictions.'],
    'On Sep 1 the professor walked through exactly this: the coastline fit is the observation, continental drift is the hypothesis, and fossils, rocks, and glacial scratches are the data used to test it.', ['T0901', 'L1B:2', 'L3:12']);
  A.mc('c1-method-m2', 'c1-method', 'A hypothesis predicts that a gasoline leak came from a buried tank. Workers find the tank intact and holding a different kind of gasoline than the contamination. What should happen to the hypothesis?',
    ['*It should be rejected or revised, because its prediction failed|The research method adjusts the hypothesis when new data contradict it.',
     'It is confirmed anyway, since gasoline was still found in the ground near the station and tank|Presence of gasoline was the original observation, not a test of the tank as its source.',
     'It becomes a theory because it was tested|Being tested is not enough; it failed the test.',
     'Nothing changes until someone observes the leak happening|Data from the tank already tested the prediction.'],
    'This is the Lecture 2 gasoline example: the prediction “a leak should be found in the tank” failed, so the conclusion was that contamination came from elsewhere.', ['L2:25', 'L1B:2']);
  A.fill('c1-method-f1', 'c1-method', 'Fill in the blank: A proposed, testable explanation for an observation is a <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['hypothesis', 'hypotheses'],
    'A hypothesis is the proposed explanation that is then tested with data (Lecture 1b s2; Sep 1 recording).', ['L1B:2', 'T0901']);
  A.ms('c1-obsinf-s1', 'c1-obsinf', 'A geologist writes four notes about a hillside. Which are <b>observations</b> rather than inferences? Select all that apply.',
    ['*The slope is covered with loose, angular rock pieces|Directly visible.',
     '*The upper ledge is tan and the lower slope is reddish|Color is directly observed.',
     'The loose pieces fell from the ledge during winter freezes|This proposes a cause and timing; an inference.',
     'The reddish rocks formed in an ancient desert|Environment of formation is an interpretation.'],
    'Observations are what you can see or measure; causes, timing, and past environments are inferences built on them.', ['L1B:3', 'L2:3']);
  A.mc('c1-obsinf-m1', 'c1-obsinf', 'Which statement about the cliff in Lecture 1b slide 9 is an <b>inference</b>?',
    ['*The blocks broke off a higher ledge that has since eroded away|This explains how the blocks got there; an interpretation of history.',
     'The cliff exposes tan, brown, and yellowish layers in its lower half|This is a description of what is visible.',
     'Several large blocks sit on top of the cliff|Location and size are observable.',
     'The upper part of the cliff is brown|Color is an observation.'],
    'The slide asks you to note observations and then questions about past events. The history of the blocks is an inference.', ['L1B:9'], { media: img(9, 'Lecture 1b slide 9') });
  A.fill('c1-obsinf-f1', 'c1-obsinf', 'An interpretation or conclusion drawn from observations (for example, “this valley was carved by a river”) is called an <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['inference', 'interpretation'],
    'Observation = what is seen or measured; inference = the explanation drawn from it.', ['L1B:3']);
  A.order('c1-ilea-o1', 'c1-ilea', 'Order the ILEA problem-solving cycle from Lecture 1a.', ['Predict', 'Draw', 'Justify', 'Research', 'Revise understanding'],
    'Lecture 1a slide 18: Predict → Draw → Justify → Research → Revise Understanding.', ['L1A:18'], { tier: 1 });
  A.mc('c1-ilea-m1', 'c1-ilea', 'According to the syllabus, what is an ILEA graded mainly on?',
    ['*The quality and reasonableness of your reasoning|The syllabus says credit is based on observations, logical deductions, critical thinking, and hypothesis testing.',
     'Getting the single correct final number|The syllabus explicitly says reasoning matters more than a single correct answer.',
     'Whether the SmartBook reading was completed before class started|Reading is a separate RQH component.',
     'How many sources you cite|Research is one step, but citations are not the grading basis.'],
    'Syllabus, “ILEAs”: graded primarily on the quality and reasonableness of reasoning.', ['SYL'], { tier: 1, mock: false });

  // ---------- 1.2 ----------
  A.section({ id: 'c1s2', ch: 1, n: '1.2', title: 'Geology controls where and how we live', srcText: 'Lec 1b s5–7 (s7 resource map missing)', src: ['L1B:5', 'L1B:6', 'L1B:7'],
    note: 'Slide 7\'s central map of iron and copper mines is blank in the supplied deck. The lab uses only the slide\'s text; it does not reconstruct the map.',
    concepts: [['c1-hazards', 'Landscape hazards and settlement'], ['c1-resources', 'Why resources occur where they do']] });
  A.cards('c1s2', [
    { id: 'g1-2a', h: 'Read a landscape for hazards and resources', c: ['c1-hazards'], src: ['L1B:5', 'L1B:6'],
      html: '<p>The Lecture 1b landscape labels how geology affects where people live: <b>landslides</b> on slopes, <b>volcanic eruptions</b>, <b>earthquakes along faults</b>, the <b>type of soil</b>, <b>slopes too steep</b> to build on, and <b>streams</b> that are at once a <b>flood hazard, a water supply, and a source of soil nutrients</b>. The same feature can be both a resource and a hazard.</p>',
      media: img(5, 'Lec 1b s5: landscape labeled with hazards and resources'),
      traps: ['Assuming a feature is only a hazard or only a resource: a river floodplain is both.'] },
    { id: 'g1-2b', h: 'Resources reflect geologic history', c: ['c1-resources'], src: ['L1B:7'],
      html: '<p>Slide 7 contrasts <b>iron mines in very old rocks</b>, which record a change in Earth\'s early atmosphere, with <b>copper mines in much younger rocks</b> related to <b>mountain building in the West</b>. The lesson: where a resource is found depends on when and how its host rocks formed.</p>',
      media: { kind: 'missing', note: 'Lecture 1b slide 7: the resource map is blank in the supplied file. Only the slide text is used here.' } }
  ]);
  A.ms('c1-hazards-s1', 'c1-hazards', 'A town sits beside a river at the foot of steep slopes. Using the Lecture 1b landscape, which geologic factors could matter to the town? Select all that apply.',
    ['*Flooding from the river|Streams are labeled as a flood hazard.',
     '*The river as a water supply and source of soil nutrients|The same stream is also a resource.',
     '*Landslides from the steep slopes|Steep slopes are labeled as landslide-prone or too steep to build on.',
     'Nothing geologic, because towns control their own risk|Geology sets the hazards and resources that people then manage.'],
    'Lecture 1b slide 5 labels streams (flood hazard, water supply, soil nutrients), landslides, earthquakes along faults, volcanic eruptions, soil type, and overly steep slopes.', ['L1B:5']);
  A.mc('c1-hazards-m1', 'c1-hazards', 'Which pairing correctly shows one landscape feature acting as <b>both</b> a hazard and a resource?',
    ['*A stream: floods nearby land but also supplies water and soil nutrients|Lecture 1b labels streams with all three roles.',
     'A fault: causes earthquakes but also supplies all of the region\'s drinking water|The slide ties faults to earthquakes, not water supply.',
     'A steep slope: causes landslides but provides fertile soil|Steep slopes are labeled as landslide-prone and too steep to build on.',
     'A volcano: erupts but prevents all flooding|Nothing in the lecture supports volcanoes preventing floods.'],
    'Streams appear in Lecture 1b as a flood hazard, water supply, and source of soil nutrients.', ['L1B:5']);
  A.mc('c1-resources-m1', 'c1-resources', 'Lecture 1b contrasts iron mines and copper mines. What is the main point of that contrast?',
    ['*Resource locations reflect when and how the host rocks formed|Iron sits in very old rocks recording early-atmosphere change; copper is younger and tied to western mountain building.',
     'Iron and copper always occur together in the same rocks|The slide contrasts them because they occur in different settings.',
     'Copper is found only in the very oldest rocks on any continent, never in younger ones|The slide says the copper mines are much younger.',
     'Mines are placed where cities already exist|The slide explains mine locations by rock age and history, not by settlement.'],
    'Slide 7 text: iron mines in very old rocks record a change in Earth\'s early atmosphere; copper mines are much younger and related to mountain building in the West.', ['L1B:7']);
  A.tf('c1-resources-t1', 'c1-resources', 'According to Lecture 1b, the iron mines are found in very old rocks that record a change in Earth\'s early atmosphere.', true,
    'Slide 7 states this directly; the copper mines are the younger set, tied to mountain building in the West.', ['L1B:7']);

  // ---------- 1.3 ----------
  A.section({ id: 'c1s3', ch: 1, n: '1.3', title: 'Reading evidence of Earth\'s past', srcText: 'Lec 1b s8–11', src: ['L1B:8', 'L1B:9', 'L1B:10', 'L1B:11'],
    concepts: [['c1-shelf', 'Continental shelf and the true edge of a continent'], ['c1-pastclues', 'Clues to past climate and life']] });
  A.cards('c1s3', [
    { id: 'g1-3a', h: 'Where does a continent really end?', c: ['c1-shelf'], src: ['L1B:8', 'T0901'],
      html: '<p>Around Australia, the brown–blue boundary is only the <b>current shoreline</b>. The <b>shallow seafloor around the land is the continental shelf</b>, and the <b>outer edge of the shelf is the edge of the continent</b>. Some parts of the seafloor look simple and others complex, meaning they had different histories. On Sep 1 the professor used shelves again: South America\'s east coast has a broad shallow shelf, while the west coast drops into a trench.</p>',
      media: img(8, 'Lec 1b s8: Australia: shoreline vs. continental shelf edge'),
      traps: ['Calling the shoreline the edge of the continent.'] },
    { id: 'g1-3b', h: 'Clues about past climate and life', c: ['c1-pastclues'], src: ['L1B:10', 'L1B:11'],
      html: '<p>Two globes compare <b>glaciers and ice sheets 28,000 years ago and today</b>: ice once covered far more of the Northern Hemisphere, so climate has changed. The Jurassic scene (about 160 million years ago) asks what evidence ancient animals leave; bones, teeth, shells, tracks, and other fossils preserved in rocks. Past conditions are reconstructed from such evidence, not observed directly.</p>',
      media: [img(10, 'Lec 1b s10: ice extent 28,000 years ago vs. present'), img(11, 'Lec 1b s11: an artist\'s reconstruction of Jurassic life')] }
  ]);
  A.mc('c1-shelf-m1', 'c1-shelf', 'On a map of Australia, the brown land meets blue water at the coastline, and pale shallow seafloor extends far offshore before dropping to deep water. Where is the geologic edge of the continent?',
    ['*At the outer edge of the shallow shelf, where the seafloor drops off|Lecture 1b: the outer edge of the shelf is the edge of the continent.',
     'At the present shoreline|The slide calls the brown–blue boundary only the current shoreline.',
     'At the deepest point of the nearest ocean basin|Deep ocean floor is not continental.',
     'Halfway across the shallow shelf, wherever the water color turns darker blue|Color shading inside the shelf does not mark the edge.'],
    'The continental shelf is part of the continent flooded by shallow sea; its outer edge marks the continent\'s edge.', ['L1B:8']);
  A.fill('c1-shelf-f1', 'c1-shelf', 'The shallow, submerged seafloor that borders a continent is the <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u> (two words).', ['continental shelf', 'shelf'],
    'Lecture 1b slide 8: “Shallow seafloor around land is continental shelf.”', ['L1B:8']);
  A.mc('c1-pastclues-m1', 'c1-pastclues', 'Two globes show far more glacial ice 28,000 years ago than today. What can you conclude <b>directly</b> from that comparison?',
    ['*Earth\'s climate has changed enough to shrink ice sheets greatly|The comparison documents a change; its causes are a separate question.',
     'Ice sheets will certainly return to the same places within the next 28,000 years|The figure shows the past and present only.',
     'Glaciers never existed in the Southern Hemisphere|The slide does not support that claim.',
     'The ice melted because of volcanic eruptions|The slide asks for possible factors; it does not identify one.'],
    'Lecture 1b slide 10 documents the change and asks what factors could have caused it; the cause is an open question, not the observation.', ['L1B:10']);
  A.ms('c1-pastclues-s1', 'c1-pastclues', 'Which could preserve evidence that dinosaurs lived in an area? Select all that apply.',
    ['*Bones and teeth preserved in rock|Body fossils.', '*Footprint tracks in hardened mud|Trace fossils.', '*Nests or eggshell fragments|Also preserved remains.',
     'The colors an artist used in a reconstruction|Art is an interpretation, not evidence.'],
    'Slide 11 is an artist\'s reconstruction and asks what evidence creatures could leave behind; the evidence is what is preserved in rock.', ['L1B:11']);

  // ---------- 1.4 ----------
  A.section({ id: 'c1s4', ch: 1, n: '1.4', title: 'What is inside Earth?', srcText: 'Lec 1b s12–14 · Rec. Sep 8', src: ['L1B:12', 'L1B:13', 'L1B:14', 'T0908'],
    concepts: [['c1-layers', 'Crust, mantle, and core'], ['c1-lithos', 'Lithosphere vs. asthenosphere']] });
  A.cards('c1s4', [
    { id: 'g1-4a', h: 'Composition layers: crust, mantle, core', c: ['c1-layers'], src: ['L1B:12', 'L1B:13', 'T0908'],
      html: '<ul><li><b>Crust</b>: the thin upper layer, in two types: <b>continental</b> and <b>oceanic</b>.</li><li><b>Mantle</b>: the <b>thickest</b> layer.</li><li><b>Core</b>: the deepest layer, made of <b>iron-nickel</b>: <b>molten outer core</b>, <b>solid inner core</b>.</li></ul><p>Iron-nickel meteorites (slide 13) are used as evidence for what a metallic core is made of. The Sep 8 lecture added typical rocks: continental crust like granite (quartz, feldspar), oceanic crust like basalt, and an upper mantle dominated by olivine.</p>',
      media: { kind: 'svg', name: 'layers', spec: {}, cap: 'Original sketch after Lec 1b s12 (not to scale).' },
      traps: ['Calling the mantle molten; it is mostly solid rock.', 'Mixing up which core layer is liquid: outer = molten, inner = solid.'] },
    { id: 'g1-4b', h: 'Strength layers: lithosphere and asthenosphere', c: ['c1-lithos'], src: ['L1B:14'],
      html: '<p>Earth can also be divided by <b>strength</b>. The <b>lithosphere</b> is the stronger, rigid outer shell: the <b>crust plus the uppermost mantle</b>. Beneath it is the <b>asthenosphere</b>: <b>hot and weak, but mostly solid</b>. Plates are pieces of lithosphere moving over the asthenosphere (Chapter 3).</p>',
      media: { kind: 'svg', name: 'lithos', spec: {}, cap: 'Original sketch after Lec 1b s14.' },
      traps: ['Equating lithosphere with crust; it also includes the uppermost mantle.', 'Calling the asthenosphere liquid; it is weak but mostly solid.'] }
  ]);
  A.parts('c1-layers-p1', 'c1-layers', 'Label the numbered layers in this cutaway of Earth.', [
    { label: '1', options: ['Crust', 'Mantle', 'Outer core', 'Inner core'], a: 'Crust', why: 'Thin outermost layer.' },
    { label: '2', options: ['Crust', 'Mantle', 'Outer core', 'Inner core'], a: 'Mantle', why: 'Thickest layer.' },
    { label: '3', options: ['Crust', 'Mantle', 'Outer core', 'Inner core'], a: 'Outer core', why: 'Molten iron-nickel.' },
    { label: '4', options: ['Crust', 'Mantle', 'Outer core', 'Inner core'], a: 'Inner core', why: 'Solid iron-nickel at the center.' }],
    'Lecture 1b slide 12 asks you to draw and label crust, mantle, and core.', ['L1B:12'], { media: { kind: 'svg', name: 'layers', spec: { markers: true } }, mk: 'inv' });
  A.mc('c1-layers-m1', 'c1-layers', 'Which statement about Earth\'s core matches Lecture 1b?',
    ['*It is iron-nickel, with a molten outer core and a solid inner core|Slide 12 states exactly this.',
     'It is silicate rock, molten throughout|The core is metallic, not silicate, and the inner core is solid.',
     'It is iron-nickel, with a solid outer core and a molten inner core|The liquid and solid parts are reversed.',
     'It is the thickest layer of Earth|The mantle is the thickest layer.'],
    'Slide 12: “Deepest layer: iron-nickel core (molten outer core; solid inner core).”', ['L1B:12']);
  A.mc('c1-layers-m2', 'c1-layers', 'Why are iron-nickel meteorites shown in a lecture about Earth\'s interior?',
    ['*They are samples of metallic material thought to resemble Earth\'s core|No one can sample the core directly, so similar metal from space is used as evidence.',
     'They prove Earth\'s crust is made of iron|The crust is mostly silicate rock.',
     'They show that the mantle is liquid|Meteorites say nothing about the mantle\'s state.',
     'They are fragments of Earth\'s own inner core that were thrown out by deep volcanoes|Volcanoes do not bring up core material.'],
    'Slide 13 pairs the core discussion with iron-nickel meteorites; the textbook (4.10) likewise compares the inner core to iron-rich meteorites.', ['L1B:13', 'TB4:4.10']);
  A.fill('c1-layers-f1', 'c1-layers', 'The thickest layer of Earth is the <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['mantle'], 'Lecture 1b slide 12: “Thickest layer: mantle.”', ['L1B:12']);
  A.mc('c1-lithos-m1', 'c1-lithos', 'Which description of the lithosphere is correct?',
    ['*The strong outer layer made of the crust plus the uppermost mantle|Slide 14 groups oceanic crust, continental crust, and the uppermost mantle as lithosphere.',
     'The crust only, both continental and oceanic|This omits the uppermost mantle.',
     'The hot, weak, mostly solid layer of mantle found just below the plates|That describes the asthenosphere.',
     'The molten layer on which continents float|No layer in this model is described as a molten layer for continents.'],
    'Lithosphere (stronger) = crust + uppermost mantle; asthenosphere (weaker) = hot, weak, mostly solid.', ['L1B:14']);
  A.parts('c1-lithos-p1', 'c1-lithos', 'Label the numbered parts of this block.', [
    { label: '1', options: ['Continental crust', 'Oceanic crust', 'Uppermost mantle', 'Asthenosphere'], a: 'Continental crust', why: 'Thick crust under the land.' },
    { label: '2', options: ['Continental crust', 'Oceanic crust', 'Uppermost mantle', 'Asthenosphere'], a: 'Oceanic crust', why: 'Thin crust beneath the ocean.' },
    { label: '3', options: ['Continental crust', 'Oceanic crust', 'Uppermost mantle', 'Asthenosphere'], a: 'Uppermost mantle', why: 'Rigid mantle that belongs to the lithosphere.' },
    { label: '4', options: ['Continental crust', 'Oceanic crust', 'Uppermost mantle', 'Asthenosphere'], a: 'Asthenosphere', why: 'Hot, weak, mostly solid.' }],
    'Items 1–3 together make up the lithosphere; 4 is the asthenosphere.', ['L1B:14'], { media: { kind: 'svg', name: 'lithos', spec: { markers: true } }, mk: 'inv' });
  A.fill('c1-lithos-f1', 'c1-lithos', 'The hot, weak, but mostly solid layer beneath the lithosphere is the <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['asthenosphere'], 'Lecture 1b slide 14.', ['L1B:14']);
  A.tf('c1-lithos-t1', 'c1-lithos', 'The asthenosphere is described in lecture as a liquid layer of molten rock.', false,
    'Slide 14: the asthenosphere is hot and weak but <b>mostly solid</b>.', ['L1B:14']);

  // ---------- 1.5 ----------
  A.section({ id: 'c1s5', ch: 1, n: '1.5', title: 'Why some regions are high: isostasy', srcText: 'Lec 1b s15–16', src: ['L1B:15', 'L1B:16'],
    concepts: [['c1-isostasy', 'Isostasy: thickness and density control elevation']] });
  A.cards('c1s5', [
    { id: 'g1-5a', h: 'Floating blocks explain elevation', c: ['c1-isostasy'], src: ['L1B:15', 'L1B:16'],
      html: '<p>Think of wooden blocks floating in water. <b>Thicker blocks ride higher</b>; <b>denser blocks sit lower</b>. Crust floats on the mantle in the same way, so <b>regions with thick crust stand higher than regions with thin crust</b>, and <b>continental crust stands higher than oceanic crust</b> (oceanic crust is thinner and denser). This relationship between crustal thickness and elevation is <b>isostasy</b>. Some mountains are also built on top of the crust.</p>',
      media: [{ kind: 'svg', name: 'isostasy', spec: { showDensity: true }, cap: 'Original sketch after Lec 1b s16: A and B share a density; C is denser.' }, img(15, 'Lec 1b s15: elevation vs. crustal thickness')],
      traps: ['Thinking the tallest block must sink the deepest; it does, but it also rises highest.', 'Forgetting density: equal thickness does not mean equal height.'] }
  ]);
  A.mc('c1-isostasy-m1', 'c1-isostasy', 'In the diagram, blocks A and B have the same density and A is the thicker of the two; C is denser and thinner than A. Which block\'s top stands highest above the water line, and why?',
    ['*A, because it is the thickest of the equally dense blocks|Isostasy: thicker blocks ride higher; A is also less dense than C.',
     'C, because denser material floats higher|Denser material sits lower.',
     'B, because thinner blocks ride higher|Thinner blocks stand lower.',
     'All three stand equally high because they float in the same water|Height above the water depends on thickness and density.'],
    'Lecture 1b slide 16: thick blocks higher than thin blocks; dense materials lower.', ['L1B:16'], { media: { kind: 'svg', name: 'isostasy', spec: { showDensity: true } } });
  A.mc('c1-isostasy-m2', 'c1-isostasy', 'Why does most continental crust stand higher than oceanic crust?',
    ['*Continental crust is thicker and less dense, so it floats higher on the mantle|Both thickness and density favor higher elevation.',
     'Continental crust is denser, so it pushes down on the mantle less and rides higher|Higher density would make it sit lower.',
     'Oceanic crust is heated by seawater and expands downward|This is not part of the isostasy explanation.',
     'Mountains on continents hold the crust up like pillars|Isostasy is about floating balance, not support from below.'],
    'Slide 15: regions with continental crust are higher than oceanic crust; slide 16: thick blocks higher, dense blocks lower.', ['L1B:15', 'L1B:16']);
  A.fill('c1-isostasy-f1', 'c1-isostasy', 'The relationship in which thicker or less dense crust floats higher on the mantle is called <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['isostasy'], 'Lecture 1b slide 16.', ['L1B:16']);
  A.tf('c1-isostasy-t1', 'c1-isostasy', 'If two crustal blocks have the same thickness, the denser block will stand lower.', true, 'Slide 16: dense materials (like denser wood) sit lower.', ['L1B:16']);

  // ---------- 1.6 ----------
  A.section({ id: 'c1s6', ch: 1, n: '1.6', title: 'Forces, energy, and the atmosphere', srcText: 'Lec 1b s17–18', src: ['L1B:17', 'L1B:18'],
    concepts: [['c1-forces', 'Internal vs. external forces'], ['c1-atmos', 'How the atmosphere affects the surface']] });
  A.cards('c1s6', [
    { id: 'g1-6a', h: 'What drives change: inside vs. outside Earth', c: ['c1-forces'], src: ['L1B:17'],
      html: '<table><tr><th>From outside / at the surface</th><th>From inside Earth</th></tr><tr><td>Sun\'s energy; gravity from the Sun and Moon; atmospheric pressure; wind and ocean currents; Earth\'s gravity pulling material downhill</td><td>Forces within Earth; radioactive decay (heat); heat transfer from the interior</td></tr></table><p>Chapter 5 returns to internal heat: most of Earth\'s internal heat today comes from radioactive decay.</p>',
      media: img(17, 'Lec 1b s17: forces and processes acting on Earth materials') },
    { id: 'g1-6b', h: 'What the atmosphere does', c: ['c1-atmos'], src: ['L1B:18'],
      html: '<p>Slide 18 labels: water vapor, drops, and ice crystals; <b>precipitation</b>; <b>wind</b>; <b>evaporation</b>; the atmosphere <b>blocks some light and UV</b>; the Sun\'s energy is converted to <b>infrared</b>, some of which the atmosphere blocks; <b>land and sea absorb heat</b>.</p>', media: img(18, 'Lec 1b s18') }
  ]);
  A.match('c1-forces-x1', 'c1-forces', 'Classify each driver as coming mainly from outside Earth (at or above the surface) or from inside Earth.', [
    ['Radioactive decay', 'Inside Earth'], ['Sun\'s energy', 'Outside / surface'], ['Wind and ocean currents', 'Outside / surface'], ['Heat transfer from the deep interior', 'Inside Earth'], ['Gravity of the Sun and Moon', 'Outside / surface']],
    'Lecture 1b slide 17 lists these drivers; radioactive decay and interior heat transfer are internal.', ['L1B:17']);
  A.mc('c1-forces-m1', 'c1-forces', 'Which listed process supplies heat from <b>inside</b> Earth?',
    ['*Radioactive decay|Decay of unstable atoms inside Earth releases heat (slide 17; textbook 5.4).',
     'Atmospheric pressure|An external, surface force.', 'Tides from the Moon\'s gravity|An external force.', 'Evaporation of seawater|A surface process driven by solar energy.'],
    'Slide 17 lists radioactive decay among internal drivers; textbook 5.4 says it supplies most of Earth\'s internal heat today.', ['L1B:17', 'TB5:5.4']);
  A.mc('c1-atmos-m2', 'c1-atmos', 'On Lecture 1b slide 18, what happens to much of the Sun\'s energy after it reaches the land and sea?',
    ['*It is absorbed and re-emitted as infrared, partly trapped|Slide 18 labels.', 'It is reflected straight back out to space without warming anything|The slide shows land and sea absorbing heat.', 'It is turned into water vapor directly by the atmosphere|Evaporation is one process, not the fate of most energy.', 'It passes through Earth and heats the core|Solar energy does not reach the core.'], 'Lecture 1b slide 18.', ['L1B:18']);
  A.fill('c1-atmos-f1', 'c1-atmos', 'Water that falls from the atmosphere as rain or snow is called <u>&nbsp;&nbsp;&nbsp;&nbsp;</u>.', ['precipitation'], 'Lecture 1b slide 18 labels.', ['L1B:18']);
  A.ms('c1-atmos-s1', 'c1-atmos', 'Which are effects of the atmosphere labeled in Lecture 1b slide 18? Select all that apply.',
    ['*Holding water vapor, drops, and ice crystals|Labeled.', '*Producing precipitation and wind|Labeled.', '*Blocking some light, UV, and infrared energy|Labeled.',
     'Generating radioactive heat in the crust|Radioactive decay is an internal process, not atmospheric.'],
    'The atmosphere stores and moves water, produces wind and precipitation, and filters part of incoming and outgoing radiation.', ['L1B:18']);

  // ---------- 1.7 ----------
  A.section({ id: 'c1s7', ch: 1, n: '1.7', title: 'Rock-forming environments and the rock cycle', srcText: 'Lec 1b s19–31 (s24–31 = continuation)', src: ['L1B:19', 'L1B:23', 'L1B:26', 'L1B:29', 'L1B:30'],
    flag: 'part continuation', note: 'Class stopped at slide 23 on Aug 25 (speaker note). Slides 24–31 (metamorphic, hydrothermal, rock cycle, spheres, solar system) are deck continuation; covered in the deck, classroom emphasis unconfirmed.',
    concepts: [['c1-sedenv', 'Surface environments make sedimentary rocks'], ['c1-igintro', 'Igneous rocks form from magma'], ['c1-cycle', 'Other rock types and the rock cycle'], ['c1-spheres', 'Earth\'s four spheres']] });
  A.cards('c1s7', [
    { id: 'g1-7a', h: 'Surface environments → sedimentary rocks', c: ['c1-sedenv'], src: ['L1B:19', 'L1B:20', 'L1B:21', 'L1B:22'],
      html: '<p>Rivers, glaciers, steep mountain fronts, sand dunes, beaches, offshore areas, and lakes are normal surface environments. <b>Rocks formed in normal surface environments are sedimentary rocks.</b> Each environment leaves a recognizable deposit: angular rock debris below a steep mountain front, well-sorted sand in dunes, rounded pebbles on a beach.</p>',
      media: [img(20, 'Lec 1b s20: steep mountain front: angular debris'), img(21, 'Lec 1b s21: sand dunes'), img(22, 'Lec 1b s22: beach: rounded pebbles')],
      traps: ['Calling any layered rock igneous; normal surface settings produce sedimentary rocks.'] },
    { id: 'g1-7b', h: 'Rocks from magma: igneous', c: ['c1-igintro'], src: ['L1B:23'],
      html: '<p>Magma can <b>erupt as lava</b>, <b>explode as ash</b>, or <b>solidify at depth</b>. <b>Rock formed from magma is igneous rock.</b> (This is the last slide covered in class on Aug 25.)</p>', media: img(23, 'Lec 1b s23') },
    { id: 'g1-7c', h: 'Deck continuation: metamorphic, hydrothermal, the rock cycle, spheres', c: ['c1-cycle', 'c1-spheres'], src: ['L1B:26', 'L1B:29', 'L1B:30'],
      html: '<p><span class="badge flag">continuation</span> Rocks <b>changed by heat and pressure</b> are <b>metamorphic</b>; minerals <b>precipitated from hot water</b> form <b>hydrothermal</b> rock. The rock-cycle diagram links processes: <b>weathering → erosion and transport → deposition → burial → deformation and metamorphism → melting → solidification → uplift</b>, with many shortcuts. Earth\'s four spheres are the <b>lithosphere, hydrosphere, biosphere, and atmosphere</b>.</p>',
      media: [img(29, 'Lec 1b s29: rock cycle (continuation slide)'), img(30, 'Lec 1b s30: four spheres (continuation slide)')] }
  ]);
  A.mc('c1-sedenv-m1', 'c1-sedenv', 'A photo shows a pile of sharp, angular rock pieces at the base of a cliff. Which environment best fits, based on the Lecture 1b photo series?',
    ['*Steep mountain front|Rock breaks off and collects nearby without much transport, so pieces stay angular.',
     'Beach|Waves round pebbles, as in the beach photo.', 'Sand dune|Dunes are fine, well-sorted sand.', 'Offshore lake floor|Deep, quiet water collects fine sediment, not angular blocks.'],
    'Lecture 1b slides 20–22 contrast angular debris at a steep mountain front with dune sand and rounded beach pebbles.', ['L1B:20', 'L1B:22']);
  A.fill('c1-sedenv-f1', 'c1-sedenv', 'Rocks that form in normal surface environments such as rivers, beaches, and dunes are <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u> rocks.', ['sedimentary'], 'Lecture 1b slide 19.', ['L1B:19']);
  A.mc('c1-sedenv-m2', 'c1-sedenv', 'Which pair of observations best distinguishes a beach deposit from a steep-mountain-front deposit?',
    ['*Rounded pebbles at the beach vs. angular pieces at the mountain front|Rounding records transport and abrasion by waves.',
     'Gray color at the beach vs. brown color at the mountain front|Color depends on rock type, not environment.',
     'Beach rock is igneous and cooled from lava; mountain-front rock is sedimentary|Both deposits are sedimentary material.',
     'Beach pebbles are larger than any mountain-front blocks|Mountain-front blocks are often larger.'],
    'Slides 20 and 22 show the contrast in shape.', ['L1B:20', 'L1B:22']);
  A.ms('c1-igintro-s1', 'c1-igintro', 'Lecture 1b slide 23 shows three ways magma can become rock. Which are they? Select all that apply.',
    ['*Erupting as lava|Labeled.', '*Explosively erupting as ash|Labeled.', '*Solidifying at depth|Labeled.', 'Precipitating from hot spring water|That is hydrothermal rock (continuation slide 26).'],
    'All three produce igneous rock.', ['L1B:23']);
  A.fill('c1-igintro-f1', 'c1-igintro', 'Rock that forms when magma or lava cools and solidifies is <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u> rock.', ['igneous'], 'Lecture 1b slide 23.', ['L1B:23']);
  A.match('c1-cycle-x1', 'c1-cycle', 'Match each rock-forming condition to the rock type (Lecture 1b continuation slides).', [
    ['Deposited in normal surface environments', 'Sedimentary'], ['Solidified from magma', 'Igneous'], ['Changed by increased heat and pressure', 'Metamorphic'], ['Precipitated from hot water', 'Hydrothermal']],
    'Slides 19, 23, and 26.', ['L1B:19', 'L1B:23', 'L1B:26'], { tier: 2 });
  A.mc('c1-cycle-m1', 'c1-cycle', 'On the rock-cycle diagram, which sequence connects a sedimentary layer to a new igneous rock?',
    ['*Burial → deformation and metamorphism → melting → solidification|Deep burial heats rock; melting makes magma that solidifies.',
     'Weathering → deposition → uplift → erosion → solidification|Solidification requires magma; nothing here melts.',
     'Uplift → erosion → deposition → burial|This makes another sedimentary rock.',
     'Solidification → melting → burial → weathering|Out of order: solidification comes after melting.'],
    'Slide 29 (continuation) links burial, metamorphism, melting, and solidification.', ['L1B:29']);
  A.ms('c1-spheres-s1', 'c1-spheres', 'Which of these are among Earth\'s four spheres in Lecture 1b? Select all that apply.',
    ['*Lithosphere|Listed.', '*Hydrosphere|Listed.', '*Biosphere|Listed.', 'Asthenosphere|This is a mechanical layer of the mantle, not one of the four spheres.'],
    'Slide 30: lithosphere, hydrosphere, biosphere, atmosphere. The syllabus outcomes use the same four systems.', ['L1B:30', 'SYL']);
  A.mc('c1-spheres-m1', 'c1-spheres', 'A volcanic eruption injects ash high into the air, rain washes ash into rivers, and the ash later enriches soils for crops. Which spheres interact?',
    ['*Lithosphere, atmosphere, hydrosphere, and biosphere|Rock material, air, water, and living things are all involved.',
     'Only the lithosphere and atmosphere|The river (hydrosphere) and crops (biosphere) are also involved.',
     'Only the hydrosphere and biosphere|The volcanic rock and the air carry the ash first.',
     'Only the lithosphere, because volcanic ash is made of rock fragments|The scenario explicitly moves ash through air, water, and life.'],
    'The syllabus stresses Earth as interacting lithosphere, hydrosphere, atmosphere, and biosphere; slide 30 names them.', ['SYL', 'L1B:30']);
})((typeof window !== 'undefined' ? window : globalThis).L);
