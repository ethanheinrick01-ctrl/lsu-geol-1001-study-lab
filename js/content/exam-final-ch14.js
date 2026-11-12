/* Original study and retrieval for the assigned glaciation sections. */
(function (L) {
  'use strict';
  const text = 'Textbook 14', first = 'Nov 10 glaciation lecture', second = 'Nov 12 glaciation lecture';
  const assignment = 'Connect assignment 14', assessment = 'Connect assessment 14';
  Object.assign(L.SOURCES, {
    [text]: {t: 'Exploring Geology · assigned Chapter 14 extracts', f: 'Chapter 14 textbook extracts', tier: 2, unit: 'section'},
    [first]: {t: 'Professor Zhuang · November 10 glaciation lecture', f: '11:10:26 (ch 14 start).txt', tier: 2, unit: 'lines'},
    [second]: {t: 'Professor Zhuang · November 12 glaciation lecture', f: '11:12:26.txt (stop 14.7) .txt', tier: 2, unit: 'lines'},
    [assignment]: {t: 'Chapter 14 Connect assignment · supplied captures', f: 'Ch14_Assignment_screenshots.zip', tier: 2, unit: 'question'},
    [assessment]: {t: 'Chapter 14 Connect assessment · supplied captures', f: 'Ch14_Assessment_screenshots (1).zip', tier: 2, unit: 'capture'}
  });
  const {chapter, term, highlight, group} = L.FINAL_STUDY;
  const {img, section} = chapter(14, {
    name: 'Ch 14 · Glaciers, Coasts, and Changing Sea Levels', short: 'Ch 14', coverage: 'Sections 14.1–14.7',
    evidence: 'November 10 and 12 lectures, assigned textbook figures, and Connect captures.',
    sourceNote: 'Study stops at 14.7. Figure captions identify the assigned textbook art and Connect diagrams. Lecture references show where the instructor discusses the material; the original PowerPoint was not supplied.'
  }, (n, location) => [text + ':14.' + n + ' · ' + location]);
  const fig = (file, locator, description) => img(file, description, 'Exploring Geology · ' + locator + ' · ' + description);
  const bank = (file, question, description) => img(file, description, 'Chapter 14 Connect assignment · ' + question + ' · ' + description);
  const l1 = lines => first + ':lines ' + lines;
  const l2 = lines => second + ':lines ' + lines;

  section(1, 'What glaciers are', 'Glacier formation, structure, and types', [
    group('Where flowing ice can form', '14.1A', [
      fig('crevasses', 'Fig. 14.01.a2', 'Glacial ice and surface fractures in the Patagonian Andes'),
      fig('valley-terminus', 'Fig. 14.01.a3', 'A glacier in the Swiss Alps')
    ], [
      term('A glacier', 'a persistent body of land ice that flows under its own weight') + '. It can form where snow survives the melt season and enough new snow accumulates to build thick ice. High latitude and high elevation favor cold conditions; a place still needs snowfall and terrain that can hold it.',
      term('A crevasse', 'a fracture in the brittle upper part of moving ice') + '. Bends and changes in bed slope make different parts of the ice move at different speeds, opening cracks. The <mark class="pilot-term">terminus</mark> is the <mark class="study-definition">downflow end of the glacier</mark>.',
      'Deep, compact ice can look blue as air spaces close and the ice preferentially absorbs red light. Fresh snow and bubbly surface ice scatter more light and often look white.'
    ], 'Read the glacier', 'Find the broken surface at a bend or steep drop. Then follow the valley down to the ice front.', [l1('31–39'), assessment + ':captures 003–004']),
    group('Ice sheets, valley glaciers, and piedmont glaciers', '14.1B–C', [
      fig('ice-sheet', 'Fig. 14.01.b1', 'Antarctic continental ice across a broad region'),
      fig('valley-glacier', 'Fig. 14.01.b2', 'Ice confined to a mountain valley'),
      fig('piedmont', 'Fig. 14.01.b3', 'A broad lobe at the foot of mountains')
    ], [
      term('An ice sheet', 'a continuous regional mass of land ice spreading across a broad area') + '. Antarctica and Greenland are the textbook examples.',
      term('A valley glacier', 'mountain ice whose flow is confined by a valley') + '. Alpine glaciers form in mountains, including some at low latitudes where elevations are high.',
      term('A piedmont glacier', 'a lobe that spreads where a valley glacier exits onto flatter ground') + '. The valley walls confine the ice upstream; the lobe widens where that confinement ends.'
    ], 'Classify by terrain', 'Follow the ice margin. Look for widespread cover, a tongue between walls, or a lobe opening beyond them.', [l1('33–39')])
  ], ({mc,fill,match,write}) => {
    match('glacier-types', '14.1B · Figs. 14.01.b1–b3', 'Classify the ice in the three numbered course photographs.',
      [['1','Continental ice sheet'],['2','Valley glacier'],['3','Piedmont glacier']],
      '1 covers a wide region, 2 is confined by valley walls, and 3 fans out from a valley onto lower ground.',
      fig('glacier-types', 'Figs. 14.01.b1–b3', 'Three numbered photographs of ice and its surrounding terrain'), [l1('33–39')]);
    mc('blue-ice', '14.1A · Fig. 14.01.a2', 'What best explains the dark blue ice exposed among the white patches in the photograph?',
      ['*Compact ice has fewer air spaces and preferentially absorbs red light.', 'Compact ice has more air spaces that absorb red light as they enlarge.', 'Surface melting concentrates blue grains released by the glacier bed.', 'New snow traps blue meltwater between its grains as it accumulates.'],
      'Compaction reduces air spaces; light traveling through a greater thickness of ice loses more red wavelengths. Bubbly ice and snow scatter more light.',
      fig('crevasses', 'Fig. 14.01.a2', 'Blue and white surfaces within a glacier'), [l1('37–43'), assessment + ':captures 003–004']);
    fill('surface-crack', '14.1A · Fig. 14.01.a3', 'What is a fracture in the brittle surface of a glacier called?', ['crevasse','crevasses'],
      'The upper ice can fracture when the glacier bends or when its bed slope changes.', [l1('31–33')]);
    mc('tropical-mountain', '14.1A, C', 'A tropical summit keeps snow through summer while the valley below stays warm. What must also happen for a glacier to form on the summit?',
      ['*Snow must build up and persist long enough to form thick ice.', 'Ice must slide away each year before new snow can bury it.', 'Snow must melt completely each year and refreeze at lower elevation.', 'Ice must be fed from a continental sheet at the same latitude.'],
      'Elevation supplies cold conditions. Persistent accumulation over time is still needed to build ice thick enough to flow.');
    write('valley-to-lobe', '14.1B · Figs. 14.01.b2–b3', 'Explain how one body of moving ice can appear as a narrow valley tongue upstream and a broad lobe downstream.',
      'Gravity moves ice down the mountain valley. The walls constrain its width there. The same ice spreads when it emerges on a plain, forming a piedmont lobe.',
      ['Explains gravity-driven movement.', 'Identifies confinement upstream.', 'Connects the loss of confinement with the piedmont lobe.'],
      fig('glacier-types', 'Figs. 14.01.b1–b3', 'Ice over broad terrain, within a valley, and beyond a mountain front'), [l1('33–39')]);
  });

  section(2, 'Formation, movement, and ice loss', 'Ice formation, glacier balance, flow, and calving', [
    group('Snow becomes ice; gain and loss set the front', '14.2A–B', [
      fig('snow-to-ice', 'Fig. 14.02.a2', 'Burial and compaction of snow into glacial ice'),
      fig('glacier-balance', 'Fig. 14.02.b2', 'Accumulation above and ablation below the equilibrium line')
    ], [
      term('Firn', 'older granular snow compacted partway to solid glacial ice') + '. Snow grains pack and recrystallize under burial. Pores shrink and become isolated bubbles as the firn becomes ice.',
      'The <mark class="pilot-term">accumulation zone</mark> has <mark class="study-definition">a local annual net gain of ice and snow</mark>. The <mark class="pilot-term">ablation zone</mark> has <mark class="study-definition">a local annual net loss</mark>. At the <mark class="pilot-term">equilibrium line</mark>, <mark class="study-definition">the local annual gains and losses are equal</mark>.',
      'When loss near the front exceeds the ice supplied to it, the terminus retreats. ' + highlight('The ice can keep flowing downhill while the terminus moves uphill.') + ' A stable terminus can also have ice continually flowing toward it.'
    ], 'Track two motions', 'Separate the movement of an ice particle from the changing position of the glacier edge.', [l1('39–45')]),
    group('Ice deforms, and sometimes the base slides', '14.2C', [
      fig('flow-profiles', 'Figs. 14.02.c2–c3', 'Lettered panels comparing glacier movement above two different beds')
    ], [
      term('Internal deformation', 'flow produced by the slow distortion of ice within the glacier') + '. With the base frozen to the bed, ice above it can still move. Drag at the bed and valley walls helps account for slower flow near those boundaries.',
      term('Basal sliding', 'movement of the ice as a whole over its bed') + '. Meltwater at the base can promote sliding. Deformation within the same ice can continue, so the two processes can add to the speed.',
      'Use arrow length to compare movement at different depths. A moving lower block over a smooth interface is evidence for sliding in the second panel.'
    ], 'Compare the bases', 'Start at the bottom of each profile. Moving surface ice alone cannot show that the bed is sliding.', [l1('43–47'), assessment + ':captures 005 and 007']),
    group('When ice reaches water', '14.2D', [
      fig('calving', 'Fig. 14.02.d1', 'Ice breaks from a glacier front and releases debris as it melts'),
      fig('ice-shelf', 'Fig. 14.02.d3', 'Floating ice from land adjoins sea ice')
    ], [
      term('Calving', 'the break-off of ice from a glacier or ice shelf into water') + '. The floating fragments are icebergs. Sediment carried in an iceberg can fall to the bottom when it melts.',
      term('An ice shelf', 'a floating extension of land ice attached to the coast') + '. Sea ice grows when ocean water freezes. The source of the floating ice distinguishes the two.'
    ], 'Follow the fragment', 'Start at the land-ice front, trace the break-off, then trace the debris down through water.', [l1('45–49')])
  ], ({mc,fill,match,write}) => {
    match('balance-figure', '14.2B · Fig. 14.02.b2', 'Match the four numbered positions to the parts of the glacier balance diagram.',
      [['1','Terminus'],['2','Zone of ablation'],['3','Equilibrium line'],['4','Zone of accumulation']],
      '1 is the downvalley ice edge. Upward arrows indicate net loss at 2, and downward arrows indicate net gain at 4. The line at 3 separates them.',
      fig('glacier-balance-bank', 'Fig. 14.02.b2', 'Numbered glacier cross section with arrows showing local gains and losses'), [l1('39–45')]);
    match('flow-profiles', '14.2C · Figs. 14.02.c2–c3', 'Match each lettered panel to the movement of the ice at its base.',
      [['A','Internal flow with the base held in place'],['B','Internal flow with the base sliding']],
      'A shows slower flow down into the ice and a base locked to an irregular bed. B shows both levels moving over a smoother bed.',
      fig('flow-profiles', 'Figs. 14.02.c2–c3', 'Two arrow profiles comparing movement from bed to surface'), [l1('43–47'), assessment + ':captures 005 and 007']);
    fill('firn', '14.2A · Fig. 14.02.a2', 'Name the granular material between fresh snow and solid glacial ice in the burial sequence.', ['firn','neve','névé'],
      'Firn has survived melting and been compacted. Continued burial turns it into glacial ice.', [l1('39–41')]);
    mc('retreat', '14.2B · Fig. 14.02.b2', 'A stake in the ice moves downhill during summer. The glacier edge moves uphill over the same period. What explains both observations?',
      ['*The front loses ice faster than the flow supplies it.', 'The front gains ice faster than the flow supplies it.', 'The glacier has reversed its flow below the stake.', 'Ice at the front has stopped moving in both directions.'],
      'The stake follows flowing ice. The edge shifts according to the balance of delivery and loss.', undefined, [l1('39–45')]);
    mc('floating-origin', '14.2D · Fig. 14.02.d3', 'Which observation identifies the floating ice attached to this coast as a shelf?',
      ['*The floating part is continuous with ice flowing off land.', 'The floating part grew from seawater frozen in place.', 'The floating part is surrounded by open water in summer.', 'The floating part broke from shore and is drifting freely.'],
      'An ice shelf is the floating, still-attached extension of a land glacier or ice sheet.',
      fig('ice-shelf', 'Fig. 14.02.d3', 'Land ice and adjoining floating ice at a coast'), [l1('45–49')]);
    write('front-and-bed', '14.2B–C', 'A meltwater pulse increases the speed of ice at the bed, yet the front retreats through the summer. Explain the possible change at the bed and what the retreat tells you.',
      'Water at the bed can increase basal sliding while deformation also continues. The terminus retreats if losses there exceed the increased delivery of ice. Ice particles can still move downhill.',
      ['Explains a plausible sliding mechanism at the bed.', 'Compares loss at the front with ice delivery.', 'Distinguishes ice movement from the position of the front.'], undefined, [l1('39–47')]);
  });

  section(3, 'Erosion, transport, and deposits', 'Abrasion, plucking, sediment transport, till and outwash', [
    group('A glacier can polish one face and break the other', '14.3A', [
      fig('abrasion-plucking', 'Fig. 14.03.a1', 'Ice crossing a bedrock step'),
      fig('grooves', 'Fig. 14.03.a2', 'Parallel scratches and grooves left by ice-driven debris'),
      fig('roche', 'Fig. 14.03.a4', 'Asymmetric glacially sculpted bedrock')
    ], [
      term('Abrasion', 'wearing down rock by ice-driven grit and stones') + '. The tools can polish bedrock or cut parallel striations and larger grooves.',
      term('Plucking', 'removing blocks of bedrock as moving ice pulls them away') + '. The steep, rough face on the lee side of an obstacle can record that removal.',
      'A <mark class="pilot-term">roche moutonnée</mark> is an <mark class="study-definition">asymmetric bedrock knob with a smoother up-ice face and a steeper plucked down-ice face</mark>. The photograph and the process sketch face opposite ways.'
    ], 'Read the slope first', 'Compare the smoothed approach side with the broken face before choosing which way the ice moved.', [l1('49–59'), assessment + ':captures 006 and 008']),
    group('Where the moving ice carries debris', '14.3B', [
      fig('transport', 'Fig. 14.03.b1', 'Sediment at the glacier surface, within the ice, and at the base')
    ], [
      'Rockfall loads the ice surface; sediment can enter fractures or be incorporated into internal layers. The base carries debris it picked up while abrading or plucking bedrock.',
      term('An erratic', 'a rock carried by ice and deposited away from its source') + '. Its composition may differ from the local bedrock. Subglacial meltwater can also cut channels and move sediment.'
    ], 'Trace a piece of rock', 'A fragment can fall onto the glacier, be buried within it, and be left far from the rock face that supplied it.', [l1('53–59')]),
    group('Ice and streams leave different textures', '14.3C', [
      fig('till', 'Fig. 14.03.c2', 'Coarse and fine material mixed in one glacial deposit'),
      fig('outwash-strata', 'Fig. 14.03.c4', 'Sediment layers sorted and deposited by meltwater')
    ], [
      term('Till', 'sediment deposited directly by glacier ice, typically poorly sorted and unstratified') + '. Fine sediment and large clasts can sit together in the same deposit.',
      term('Outwash', 'sediment deposited by glacial meltwater streams') + '. Flow sorts grains as velocity changes, often making beds of sand and gravel.'
    ], 'Use texture and setting', 'Both materials can have the same glacial source. Identify the final carrier by combining sorting, layering, and location.', [l1('55–59')])
  ], ({mc,fill,match,write}) => {
    mc('roche-flow', '14.3A · Fig. 14.03.a4', 'Which flow direction and pair of processes explain this bedrock knob?',
      ['*Right to left; the ice abraded the gentle slope and plucked the steep face.', 'Right to left; the ice plucked the gentle slope and abraded the steep face.', 'Left to right; the ice abraded the gentle slope and plucked the steep face.', 'Left to right; the ice plucked the gentle slope and abraded the steep face.'],
      'The right side is the gentler, smoothed stoss face. The left side is the steeper, quarried lee face. Ice moved right to left in this photograph.',
      fig('roche', 'Fig. 14.03.a4', 'Photograph of a smooth slope adjoining a steeper broken face'), [l1('49–53'), assessment + ':captures 006 and 008']);
    match('deposition-pair', '14.3C · Figs. 14.03.c2 and c4', 'Match each deposit to its most likely final carrier.',
      [['1','Direct deposition by glacier ice'],['2','Deposition by flowing meltwater']],
      '1 has many grain sizes mixed together. 2 has beds and size sorting, evidence of changing flow in meltwater.',
      fig('sediment-pair', 'Figs. 14.03.c2 and c4', 'Two numbered outcrop photographs with different grain arrangements'), [l1('55–59')]);
    fill('abrasion', '14.3A · Fig. 14.03.a1', 'What process grinds bedrock as stones held against it move with the ice?', ['abrasion','glacial abrasion'],
      'Debris at the glacier base acts as an abrasive. Plucking removes larger fragments.', [l1('49–53')]);
    mc('erratic-source', '14.3A–B', 'A rounded granite boulder rests on a broad limestone bench. Which additional observation would best support glacial transport from a nearby granite area?',
      ['*Ice scratches align with a plausible path from the granite outcrop.', 'The limestone and granite both contain some of the same elements.', 'The boulder is closest to the steepest limestone face on the bench.', 'Modern rain runs off the boulder and collects in limestone fractures.'],
      'A nonlocal rock plus an independent ice-flow clue is stronger evidence for transport than boulder shape. Scratch alignment constrains the path axis, so the granite source matters for the inferred sense of travel.', undefined, [l1('51–57')]);
    write('erosion-and-deposition', '14.3A–C', 'Explain how one glacier can leave polished bedrock, a chaotic deposit of mixed grain sizes, and nearby layered sand and gravel.',
      'Debris at the moving ice base abrades the rock. When the glacier melts it can leave till with large and small grains mixed together. Meltwater streams sort part of that sediment and deposit it in layers as outwash.',
      ['Connects polishing with debris and ice movement.', 'Identifies direct deposition and poor sorting in till.', 'Explains why flowing meltwater can leave sorted beds.'], undefined, [l1('49–59')]);
  });


  section(4, 'Alpine glacial landforms', 'Alpine erosion and moraines', [
    group('A basin, its lake, the ridges and peaks', '14.4C', [
      fig('alpine-block', '§14.4C central block', 'Glacier-carved mountain terrain with annotated landforms')
    ], [
      term('A cirque', 'a bowl-shaped hollow eroded near the head of a mountain glacier') + '. A <mark class="pilot-term">tarn</mark> is <mark class="study-definition">a small lake occupying a glacial basin such as a cirque</mark>.',
      term('An arête', 'a narrow ridge sharpened by glacial erosion on both sides') + '. A <mark class="pilot-term">horn</mark> is <mark class="study-definition">a pointed peak cut back by several cirques</mark>.',
      'In the central block, compare the floor of a bowl, the water that fills it, the sharp line between basins, and the peak at the meeting of ridges.'
    ], 'Name what the arrow touches', 'A leader ending on water and one ending on the rock bowl can point into the same basin and require different answers.', [l2('1–9'), assignment + ':Q1', assessment + ':captures 009 and 011']),
    group('Main valleys, tributaries, and flooded troughs', '14.4A, C', [
      fig('alpine-valley', 'Fig. 14.04.a3', 'Broad floor and steep walls of a glacier-carved valley'),
      fig('hanging-valley', 'Fig. 14.04.c6', 'A high tributary valley meeting a deeper main trough'),
      fig('fjord', 'Fig. 14.04.c7', 'Seawater occupying glacier-carved valleys on Baffin Island')
    ], [
      term('A U-shaped valley', 'a broad-bottomed, steep-sided valley widened and deepened by ice') + '. A stream cutting down into bedrock often leaves a narrower V-shaped cross section.',
      term('A hanging valley', 'a tributary valley whose floor stands above the deeper main valley') + '. A larger trunk glacier can excavate deeper than the tributary glacier. After ice retreats, the stream can drop into the main trough as a waterfall, as in Yosemite.',
      term('A fjord', 'a glacial trough flooded by seawater') + '. Glacial excavation accounts for the valley shape; inundation accounts for its connection to the ocean.'
    ], 'Compare valley floors', 'The high tributary floor identifies the hanging valley. A waterfall can mark the drop between the floors.', [l2('3–9, 57–59'), assignment + ':Q1–Q2']),
    group('Debris at the sides, in the center, and at the front', '14.4B', [
      fig('medial-moraine', 'Fig. 14.04.b1', 'Debris bands on joining alpine glaciers'),
      fig('alpine-front', 'Fig. 14.04.b2', 'Ridges left after ice retreated from the Sawtooth Mountains')
    ], [
      term('A lateral moraine', 'a ridge or band of glacial debris along a glacier margin') + '. After retreat, it can remain along the valley flank.',
      term('A medial moraine', 'a debris band within the combined glacier formed where two lateral moraines join') + '. Trace the two inward edges upstream to see why the band runs down the center.',
      term('A terminal moraine', 'a ridge of debris recording the glacier’s farthest advance in that episode') + '. An end ridge lies across the former flow path. A side ridge runs along it.'
    ], 'Use the former front', 'Look across the trough for the outer end ridge; trace along the flank for a lateral ridge.', [l2('11–23'), assignment + ':Q2'])
  ], ({mc,fill,match,write}) => {
    match('alpine-basin', '14.4C · central alpine block', 'Use the complete word bank to identify the four marked alpine features.',
      [['1','Cirque'],['2','Tarn'],['3','Arête'],['4','Hanging valley']],
      '1 points to glacial bowls, 2 to water in a basin, 3 to the sharp divide between carved basins, and 4 to the tributary perched above the main trough.',
      bank('alpine-basin-bank', 'Q1', 'Mountain relief block with four numbered leaders'), [assignment + ':Q1 · blank 001, checked 010', l2('1–9')]);
    match('alpine-front', '14.4A–C · Fig. 14.04.b2', 'Label the eroded and deposited features at the four leaders on this mountain front.',
      [['1','U-shaped valley'],['2','Cirque'],['3','Lateral moraine'],['4','Terminal moraine']],
      '1 is the wide trough, 2 is the excavated bowl near its head, 3 runs alongside former ice, and 4 lies across the former lower end.',
      bank('alpine-front-bank', 'Q2', 'Mountain front with four numbered leaders'), [assignment + ':Q2 · blank 011, checked 013', l2('13–19')]);
    mc('sharp-divide', '14.4C · Fig. 14.04.c4', 'Two cirques cut into opposite sides of a divide until their headwalls nearly meet. What can remain between them?',
      ['*A narrow arête along the divide','A pointed horn centered in one basin','A hanging valley above both headwalls','A lateral moraine joining both floors'],
      'Headward erosion on two sides can leave a narrow ridge. A horn is a point surrounded by cirques on several sides.', undefined, [l2('7–9'), assessment + ':captures 009 and 011']);
    mc('joined-margins', '14.4B · Fig. 14.04.b1', 'Two valley glaciers join and their inner edge debris continues downstream as a central stripe. How did that stripe form?',
      ['*One lateral band from each glacier came together.', 'Sediment at each terminus piled up at the junction.', 'Two broad outwash fans were drawn into the ice.', 'One debris stripe formed where the bed thawed.'],
      'The sides that touch after the confluence become the interior of the combined glacier.',
      fig('medial-moraine', 'Fig. 14.04.b1', 'Dark debris stripes where two ice flows join'), [l2('13–19')]);
    fill('flooded-valley', '14.4C · Fig. 14.04.c7', 'What is a formerly glaciated valley called once seawater fills its lower trough?', ['fjord','fiord'],
      'A fjord preserves the steep sides and deep floor of a glacier-cut valley now flooded by the ocean.', [l2('3–5')]);
    write('tributary-waterfall', '14.4C · Fig. 14.04.c6', 'Explain why a waterfall can appear where a tributary enters a formerly glaciated mountain valley. Relate both valley floors to the former ice.',
      'The larger trunk glacier carved the main trough more deeply than the smaller tributary glacier carved its side valley. After retreat, the tributary floor remained above the trunk floor. Its stream drops over the step.',
      ['Compares erosion by the two glaciers.', 'Places the tributary floor above the main trough.', 'Connects the floor-height difference to a postglacial waterfall.'],
      fig('hanging-valley', 'Fig. 14.04.c6', 'A perched tributary on the flank of a larger glacial trough'), [l2('5–9, 57–59')]);
  });

  section(5, 'Continental glacial landforms', 'Ice-sheet landforms and their formation', [
    group('An ice margin can leave several ridges', '14.5A · Figs. 14.05.a1 and a11', [
      fig('continental-block', 'Fig. 14.05.a1', 'Landforms and sediments near the margin of an ice sheet'),
      fig('great-lakes', 'Fig. 14.05.a11', 'Curving end moraines in the Great Lakes region')
    ], [
      term('Ground moraine', 'a blanket of till left beneath melting glacier ice') + '. It can be gently rolling instead of forming a distinct ridge.',
      'The <mark class="pilot-term">terminal moraine</mark> records <mark class="study-definition">the farthest position of a particular advance</mark>. <mark class="pilot-term">Recessional moraines</mark> record <mark class="study-definition">pauses or small readvances during overall retreat</mark>, generally inward from the terminal ridge.',
      'Near the Great Lakes, broad troughs record glacial erosion and the arcuate moraine ridges record former ice fronts. Compare ridge positions for the same lobe before inferring a sequence.'
    ], 'Separate margin from bed', 'An end moraine marks an edge position. A broad till blanket records the ice that lay over it.', [l1('15–31'), l2('21–27, 81–83'), assessment + ':captures 001–002']),
    group('Follow meltwater channels and stranded ice', '14.5A · Figs. 14.05.a1–a6', [
      fig('kettle-sequence', 'Fig. 14.05.a6', 'An ice block is buried and melts, leaving a depression')
    ], [
      term('An esker', 'a winding ridge of sediment deposited by a meltwater channel in or under the ice') + '. After the surrounding ice disappears, the channel fill stands above adjacent ground.',
      term('A kame', 'a mound of sand and gravel deposited by meltwater against or within stagnant ice') + '. A kame is a mound; an esker preserves the route of a channel.',
      term('A kettle', 'a depression left where a detached block of glacier ice melts') + '. Burial by sediment can preserve the ice long enough for a distinct pit to form. If the depression holds water, it becomes a kettle lake.',
      term('An outwash plain', 'a wide deposit laid down by streams flowing away from an ice front') + '. Trace the branching streams across the plain on the continental block.'
    ], 'Read relief and carrier', 'A channel deposit can become a ridge when its ice walls vanish. A buried ice block leaves a low when the ice itself vanishes.', [l2('25–29'), assignment + ':Q3–Q4']),
    group('Drumlins record flow beneath the ice', '14.5A · Figs. 14.05.a7–a9', [
      fig('drumlin-field', 'Fig. 14.05.a7', 'A field of elongated hills aligned with former ice flow')
    ], [
      term('A drumlin', 'an elongated hill of glacial sediment shaped beneath moving ice') + '. The long axes of a group show the former flow trend.',
      'In the idealized course examples, the up-ice end is blunter and steeper, and the down-ice end tapers. Compare shape as well as alignment when inferring a sense of movement.'
    ], 'Use two clues for direction', 'An axis has two possible senses. Look for asymmetry or other evidence to choose between them.', [l2('21–29'), assignment + ':Q3–Q4', assessment + ':captures 010 and 012'])
  ], ({mc,fill,match,write}) => {
    match('continental-features', '14.5A · Fig. 14.05.a1', 'Match the five landforms to the numbered leaders on the continental ice diagram.',
      [['1','Esker'],['2','Kettle'],['3','Drumlin'],['4','Terminal moraine'],['5','Outwash plain']],
      '1 is the sinuous channel ridge, 2 is a depression where stranded ice melted, 3 is a streamlined hill, 4 is the farthest end ridge, and 5 is the stream-built plain.',
      bank('continental-bank', 'Q3', 'Former ice margin and neighboring terrain with five numbered leaders'), [assignment + ':Q3 · blank 014, checked 017', l2('21–29'), assessment + ':captures 010 and 012']);
    match('continental-processes', '14.5A · Fig. 14.05.a1', 'Match each marked feature to how it formed. The numbers occupy new positions on the same landscape.',
      [['1','A stranded block of ice melted out of surrounding sediment.'],
       ['2','A channel within or beneath the ice deposited sediment.'],
       ['3','Moving ice streamlined sediment beneath the glacier.'],
       ['4','Glacial debris piled up at the farthest advance.'],
       ['5','Meltwater streams spread sediment in front of the glacier.']],
      '1 is a kettle, 2 an esker, 3 a drumlin, 4 the terminal moraine, and 5 the outwash plain. The carrier and setting distinguish the deposits.',
      bank('continental-process-bank', 'Q4', 'Same continental terrain with a different arrangement of numbered leaders'), [assignment + ':Q4 · blank 018, checked 020', l2('21–29')]);
    mc('great-lakes-ridges', '14.5A · Fig. 14.05.a11', 'Several roughly parallel curved ridges lie inside the farthest extent of a single ice lobe. What do those inner ridges most directly record?',
      ['*Former ice-front positions during overall retreat.', 'Channels cut in bedrock during maximum advance.', 'Dunes formed by winds crossing the ice margin.', 'Sediment stripes formed along merging ice streams.'],
      'The nested arcs are recessional moraines. Each marks a margin position that persisted or readvanced enough to build a ridge.',
      fig('great-lakes', 'Fig. 14.05.a11', 'A map of curved ridges in the Great Lakes region'), [l1('15–31'), l2('81–83'), assessment + ':captures 001–002']);
    fill('drumlin', '14.5A · Figs. 14.05.a7–a9', 'Name the streamlined hill formed from sediment shaped under moving ice.', ['drumlin','drumlins'],
      'Drumlins commonly occur in aligned groups. An esker, by contrast, follows a meltwater channel.', [l2('23–27'), assessment + ':captures 010 and 012']);
    mc('kettle-transfer', '14.5A · Fig. 14.05.a6', 'A retreating glacier leaves an isolated ice block surrounded by stream sediment. Which change is most likely after the buried ice disappears?',
      ['*The overlying sediment settles into a depression.', 'The overlying sediment rises into a narrow ridge.', 'The stream sediment spreads as a new terminal ridge.', 'The stream sediment turns into a streamlined hill.'],
      'Melting removes the supporting ice, leaving a kettle. Water can later collect in it.', undefined, [l2('27–29')]);
    write('three-deposit-pathways', '14.5A · Fig. 14.05.a1', 'A curved end ridge, a winding ridge, and a broad layered plain survive near a former glacier. Name each feature and explain where its sediment was deposited.',
      'A moraine piles up at the ice margin. An esker is sediment from a confined meltwater channel within or beneath the ice. An outwash plain spreads where meltwater streams lay down sediment beyond the front.',
      ['Relates the moraine to debris at an ice front.', 'Relates the esker to a channel in or beneath the ice.', 'Relates the outwash plain to deposition by streams beyond the front.'],
      bank('continental-bank', 'Q3', 'Continental glacial landscape with numbered features'), [assignment + ':Q3–Q4', l2('21–29')]);
  });


  section(6, 'Outwash, permafrost, and ice-age lakes', 'Processes and landforms beyond glacier ice', [
    group('Meltwater carries gravel; wind carries silt', '14.6A', [
      fig('outwash', 'Fig. 14.06.a1', 'Streams spreading sediment across a plain below mountains'),
      fig('loess', 'Fig. 14.06.a2', 'Fine sediment draped across slopes in Shaanxi')
    ], [
      'Meltwater flowing out of ice can deposit sand and gravel across a broad <mark class="pilot-term">outwash plain</mark>, a <mark class="study-definition">stream-built surface downstream of a glacier</mark>.',
      term('Loess', 'an accumulation of windblown silt') + '. Glacial grinding can supply silt, and winds can pick it up from bare outwash or other exposed sediment. A blanket can build well beyond the ice margin.'
    ], 'Follow the last carrier', 'Water can leave sand and gravel in channels and bars. Wind can lift fine silt and drape it across the landscape.', [l2('37–41')]),
    group('The active layer thaws above colder ground', '14.6B', [
      fig('permafrost-map', 'Fig. 14.06.b2', 'Map of ground that stays frozen across northern latitudes'),
      fig('permafrost', 'Fig. 14.06.b3', 'Thin surface soil above an icy exposure on the Kolyma River')
    ], [
      term('Permafrost', 'ground that stays at or below freezing for at least two consecutive years') + '. It occurs in cold high-latitude regions and in some high mountains, whether or not glaciers are nearby.',
      term('The active layer', 'the surface layer above permafrost that thaws seasonally and refreezes') + '. In the figure, roots occupy the thin layer over the smooth icy exposure. Shallow rooting and seasonal thaw can contribute to leaning trees.',
      'Repeated frost action can sort or displace material near the surface, producing patterned ground such as stone rings or polygons.'
    ], 'Look above the boundary', 'Summer thaw and vegetation at the surface can coexist with permafrost below.', [l2('41–45'), assessment + ':captures 013 and 015']),
    group('Ice-age lakes and the flood path', '14.6C and Lake Missoula feature', [
      fig('lake-map', 'Fig. 14.06.c1', 'Lake basins and flood routes in western North America'),
      fig('missoula-flood', 'Fig. 14.06.t1', 'Ice dam, Lake Missoula, and the Channeled Scablands'),
      fig('giant-ripples', 'Fig. 14.06.t2', 'Giant current ripples at West Bar along the Columbia River'),
      fig('dry-falls', 'Fig. 14.06.t3', 'A dry cataract left by large floods')
    ], [
      'A cooler, wetter water balance allowed large lakes to occupy interior western basins. Old shorelines record former high water. The <mark class="pilot-term">Great Salt Lake</mark> is <mark class="study-definition">a remnant of the much larger Lake Bonneville</mark>.',
      'A lobe of the Cordilleran ice sheet blocked a valley drainage, making <mark class="pilot-term">glacial Lake Missoula</mark>, an <mark class="study-definition">ice-dammed lake in the northern Rockies</mark>. When the dam failed, water rushed west and cut channels in the Columbia Plateau.',
      'Giant current ripples and an abandoned cataract such as Dry Falls record fast, deep floodwater. Shorelines around the former lake record stored water before release.'
    ], 'Read the map as a sequence', 'Find the reservoir on the upstream side of the dam, then follow the flood route to the scoured land downstream.', [l2('47–55')])
  ], ({mc,fill,match,write}) => {
    match('two-sediment-paths', '14.6A · Figs. 14.06.a1–a2', 'Match each deposit to the carrier that laid it down.',
      [['Outwash plain','Glacial meltwater streams'],['Loess blanket','Wind carrying fine silt']],
      'Glacial debris can supply both. The final transporting agent and the sizes it moves distinguish them.', undefined, [l2('37–41')]);
    mc('roots-and-thaw', '14.6B · Fig. 14.06.b3', 'A tree grows above the dark icy part of this bank. What explains how its roots can grow there while the deeper ground remains frozen?',
      ['*The upper layer thaws in summer and freezes again later.', 'The deep layer thaws first and the surface remains frozen.', 'The roots enter ice that melts only in winter.', 'The surface freezes in summer and thaws in winter.'],
      'The active layer thaws during warm months. The soil or rock beneath it stays frozen across years.',
      fig('permafrost', 'Fig. 14.06.b3', 'Trees and exposed material along a river bank'), [l2('41–45'), assessment + ':captures 013 and 015']);
    fill('active-layer', '14.6B · Fig. 14.06.b3', 'What is the name for the ground layer above permafrost that thaws and refreezes each year?', ['active layer','the active layer'],
      'The active layer undergoes seasonal thaw; deeper permafrost persists across seasons.', [l2('41–45')]);
    mc('lake-and-flood', '14.6C · Figs. 14.06.c1 and t1', 'Trace the route from the northern lake to the Columbia Plateau. What could release enough water to scour the marked channels?',
      ['*The ice barrier failed and released water stored upstream.', 'The ice barrier advanced and blocked the outlet more tightly.', 'The lake shrank as evaporation exceeded incoming water.', 'The glacier thinned while the downstream outlet stayed sealed.'],
      'Lake Missoula stood upstream of the ice dam. Failure released its stored water through the plateau.',
      fig('missoula-flood', 'Fig. 14.06.t1', 'Map of an ice barrier, lake basin, and downstream route'), [l2('47–55')]);
    mc('different-lakes', '14.6C · Fig. 14.06.c1', 'Which pairing distinguishes the two lake histories shown on the map?',
      ['*Bonneville left the Great Salt Lake; Missoula stood behind ice.', 'Missoula left the Great Salt Lake; Bonneville stood behind ice.', 'Bonneville occupied the Scablands; Missoula filled the Great Basin.', 'Missoula occupied the Great Basin; Bonneville filled the northern Rockies.'],
      'Lake Bonneville occupied the Utah basin. Lake Missoula was held upstream of a glacial dam in the northern Rockies.',
      fig('lake-map', 'Fig. 14.06.c1', 'Map of western ice-age lakes and drainage paths'), [l2('47–55')]);
    write('missoula-sequence', '14.6C · Figs. 14.06.t1–t3', 'Explain how a glacier helped create a lake and how loss of that barrier left evidence downstream. Name one piece of flood evidence.',
      'Ice blocked a valley outlet so water built up as Lake Missoula. Dam failure released stored water rapidly down the drainage. The floods could scour channels and leave giant current ripples or cataracts such as Dry Falls.',
      ['Explains why water accumulated.', 'Links loss of the ice dam to rapid downstream release.', 'Names a specific downstream flood landform.'],
      fig('giant-ripples', 'Fig. 14.06.t2', 'Long, regularly spaced ridges at West Bar, Washington'), [l2('47–55')]);
  });

  section(7, 'Evidence of past glaciation', 'Glacial landscape evidence and isotope records', [
    group('Recognize a landscape that used to hold ice', '14.7A', [
      fig('striations', 'Fig. 14.07.a3', 'Parallel scratches on a polished rock surface'),
      fig('tillite', 'Fig. 14.07.a5', 'Lithified mixed-size sediment of glacial origin'),
      fig('dropstone', 'Fig. 14.07.a6', 'A large clast interrupting finer lake sediment')
    ], [
      'U-shaped troughs, perched tributaries, drumlins, and moraine belts can outlast the glaciers that made them. A sequence of former margins helps reconstruct how far ice reached and how its extent changed.',
      term('Striations', 'parallel scratches where debris at the ice base scraped bedrock') + '. ' + highlight('The scratches alone show a flow axis; they need an additional clue to show which way along it the ice moved.') + ' A polished stoss and plucked lee on a bedrock knob can provide that clue.',
      term('Tillite', 'old till that became rock') + '. An erratic contrasts with its local substrate, and a <mark class="pilot-term">dropstone</mark> is <mark class="study-definition">a clast dropped from floating ice into finer sediment</mark>. The clast can deform the layers it lands on.'
    ], 'Combine evidence', 'Scratches, nonlocal rocks, and deposits have more force when their settings and shapes tell the same story.', [l2('57–63, 71–83'), assessment + ':captures 014 and 016']),
    group('Oxygen isotopes trace storage of water in ice', '14.7B · Fig. 14.07.b1', [
      fig('isotope-cycle', 'Fig. 14.07.b1', 'Water transfers between the ocean, atmosphere, and glacier ice')
    ], [
      term('A climate proxy', 'a measurable record used to infer past climate conditions') + '. Oxygen-16 and oxygen-18 are light and heavy isotopes of the same element.',
      'Evaporation sends proportionally more oxygen-16 into vapor. During glacial growth, snow and ice on land hold relatively more of that light isotope. The ocean becomes relatively richer in oxygen-18.',
      'When land ice melts and light-isotope-rich water returns, the ocean ratio can decrease. The ratio in fossil marine shells records a combination of seawater composition and the temperature at which the shells formed.'
    ], 'Say where the sample came from', 'Light isotope can accumulate in land ice while the ratio of heavy to light isotope in the ocean rises.', [l2('63–71')]),
    group('Read the shell record and the ice-core record on their own axes', '14.7B · Figs. 14.07.b2 and b4', [
      fig('marine-isotopes', 'Fig. 14.07.b4', 'Marine-shell oxygen-isotope ratio over roughly two million years'),
      fig('greenland-core', 'Fig. 14.07.b2', 'Central Greenland temperature inferred from ice-core oxygen isotopes')
    ], [
      'In this <mark class="pilot-term">marine-shell record</mark>, <mark class="study-definition">higher oxygen-18/oxygen-16 marks glacial intervals and lower ratios mark warmer interglacials</mark>. Read age along the horizontal axis; the repeated shifts show multiple glacial cycles.',
      'The Greenland graph instead places inferred temperature along the horizontal axis and age vertically. Read its rightward shifts as warmer in central Greenland. The marine curve’s isotope direction is not a rule for reading raw ice-core ratios.',
      'A shell record helps reconstruct timing and changing global ice volume. Local features and their ages are needed to draw individual ice margins on a map.'
    ], 'Read the axes before the color', 'Name the measured or inferred quantity, the archive it comes from, and the direction of older ages before interpreting a change.', [l2('63–77')])
  ], ({mc,fill,match,write}) => {
    mc('striations-limit', '14.7A · Fig. 14.07.a3', 'The scratches on this isolated slab run northeast–southwest. Which inference does their orientation support?',
      ['*Ice moved along that axis; either sense is possible.', 'Ice moved southwest; the slope must face southwest.', 'Ice moved northeast; all scratches begin on the west side.', 'Ice moved across the axis; the grooves formed at the margin.'],
      'Scratches constrain the alignment. An asymmetric landform or an identifiable upstream rock source can resolve which sense of flow occurred.',
      fig('striations', 'Fig. 14.07.a3', 'Parallel linear marks in bedrock'), [l2('59–63')]);
    match('three-field-clues', '14.7A · Figs. 14.07.a3–a6', 'Match each field observation to the ice-related evidence it best supports.',
      [['A granite boulder rests on a limestone plain.','Glacial erratic'],
       ['A large clast interrupts fine layers in a lake bed.','Dropstone'],
       ['A hard rock preserves the unsorted mixture of ancient till.','Tillite']],
      'An erratic is transported from its source, a dropstone falls into sediment from floating ice, and tillite is lithified till.', undefined, [l2('57–63'), assessment + ':captures 014 and 016']);
    mc('marine-rise', '14.7B · Figs. 14.07.b1 and b4', 'The marine-shell curve rises from a low interval into a high one. Which water transfer helps explain that shift?',
      ['*Growing land ice stores light oxygen, increasing the ocean ratio.', 'Growing land ice stores heavy oxygen, increasing the ocean ratio.', 'Melting land ice returns light oxygen, increasing the ocean ratio.', 'Melting land ice returns heavy oxygen, lowering the ocean ratio.'],
      'Land ice takes relatively oxygen-16-rich water out of circulation. The remaining seawater has a higher heavy-to-light ratio.',
      fig('marine-isotopes', 'Fig. 14.07.b4', 'Oxygen-isotope ratio plotted against age in marine shells'), [l2('63–71')]);
    mc('two-axes', '14.7B · Figs. 14.07.b2 and b4', 'On this Greenland core graph, the curve shifts right between two successive levels. What does that horizontal change directly represent?',
      ['*A rise in the inferred temperature of central Greenland.', 'A rise in the heavy-to-light isotope ratio of seawater.', 'A rise in the relative age of both Greenland ice samples.', 'A rise in the area of the North American ice sheet.'],
      'The horizontal axis is inferred temperature in degrees Celsius. The vertical axis is sample age in thousands of years before present.',
      fig('greenland-core', 'Fig. 14.07.b2', 'Curve with temperature on the horizontal axis and age on the vertical axis'), [l2('63–71')]);
    fill('proxy', '14.7B', 'What is a measurable stand-in, such as an isotope ratio from a dated shell, used to infer past climate called?', ['proxy','climate proxy','paleoclimate proxy','palaeoclimate proxy'],
      'A proxy preserves a response to past conditions that can be measured now.', [l2('61–71')]);
    write('local-vs-archive', '14.7A–B · Figs. 14.07.a3 and b4', 'A field team finds polished, striated bedrock. A marine core records several peaks in shell oxygen-isotope ratios. What does each record show, and what extra evidence would help date ice at that site?',
      'The bedrock records abrasion where ice once passed, and the scratches give an axis but not the sense of flow. In the course’s marine record, peaks mark colder glacial intervals with more land ice. Neither observation alone dates the passage of ice over that particular outcrop; local dating or correlated deposits are needed.',
      ['Connects polish and scratches to local ice and its flow axis.', 'Interprets the high marine ratios in the correct archive.', 'Identifies why a local age or exact extent needs independent evidence.'],
      fig('marine-isotopes', 'Fig. 14.07.b4', 'Marine record of oxygen-isotope changes through time'), [l2('57–75')]);
  });
})(window.L);
