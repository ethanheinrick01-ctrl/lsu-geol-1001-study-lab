/* Original Chapter 13 instruction with selected course figures. The full source packet stays private. */
(function (L) {
  'use strict';
  const A = L.A, topics = [];
  const deck = 'Ch 13 deck', text = 'Textbook 13', lecture = 'Nov 10 lecture';
  const ilea = 'ILEA 10', assignment = 'Connect assignment 13', assessment = 'Connect assessment 13';
  Object.assign(L.SOURCES, {
    [deck]: {t: 'Chapter 13 PowerPoint · Ch13_2025R copy 2', f: 'Ch13_2025R copy 2.pptx', tier: 2, unit: 'slide'},
    [text]: {t: 'Exploring Geology · assigned Chapter 13 extracts', f: 'Chapter 13 textbook extracts', tier: 2, unit: 'section'},
    [lecture]: {t: 'Professor Zhuang · November 10 Chapter 13 lecture', f: '11:10:26.txt', tier: 2, unit: 'lines'},
    [ilea]: {t: 'ILEA 10 · atmospheric carbon dioxide graphs', f: 'ILEA 10.jpg', tier: 2, unit: 'part'},
    [assignment]: {t: 'Chapter 13 Connect assignment · supplied captures', f: 'Ch13_Assignment_screenshots.zip', tier: 2, unit: 'question'},
    [assessment]: {t: 'Chapter 13 Connect assessment · supplied captures', f: 'Ch13_Assessment_screenshots.zip', tier: 2, unit: 'capture'},
    'NHC Sandy': {t: 'National Hurricane Center · Hurricane Sandy report', f: 'https://www.nhc.noaa.gov/data/tcr/AL182012_Sandy.pdf', tier: 2, unit: 'section'}
  });
  L.EXAMS.final = {id: 'final', label: 'Final Exam', chapters: [13], available: [13], mocks: false};
  L.CHAPTERS[13] = {
    name: 'Ch 13 · Climate, Weather, and Their Influences on Geology', short: 'Ch 13',
    evidence: 'Chapter 13 lecture deck, November 10 lecture, ILEA 10, textbook extracts, and Connect captures.'
  };
  L.FINAL_STUDY = {topics};

  const img = (file, alt, cap) => ({
    kind: 'img', src: 'assets/figures/chapter13/' + file + '.webp', alt, cap
  });
  const fig = (file, slide, description) => img(file, description, 'Chapter 13 PowerPoint · slide ' + slide + ' · ' + description);
  const term = (name, definition, join = 'is') => '<mark class="pilot-term">' + name +
    '</mark> ' + join + ' <mark class="study-definition">' + definition + '</mark>';
  const highlight = phrase => '<mark class="e2-study-emphasis">' + phrase + '</mark>';
  const group = (heading, slides, figures, points, label, check, more = []) =>
    ({heading, slides, figures, points, label, check, more});

  function section(n, title, concept, groups, author) {
    const number = '13.' + n, sec = 'c13s' + n, c = sec + '-core', prefix = 'final-c13-' + n + '-';
    const sources = (slides, extra = []) =>
      [deck + ':slides ' + slides, ...(n === 17 ? [] : [text + ':' + number]), ...extra];
    const cards = groups.map((g, i) => ({
      id: 'g13-' + n + '-' + (i + 1), h: g.heading, c: [c], tier: 2,
      html: '<section class="e2-note-group"><h3 class="e2-note-heading">' + g.heading +
        '</h3><ul class="e2-note-points">' + g.points.map(p => '<li>' + p + '</li>').join('') +
        '<li class="pilot-checkpoint"><b class="pilot-check-label">' + g.label + '</b>' + g.check + '</li></ul></section>',
      src: sources(g.slides, g.more),
      media: g.figures.map(m => ({...m, alt: g.heading + ' · ' + m.alt}))
    }));
    A.section({id: sec, n: number, ch: 13, examId: 'final', title, concepts: [[c, concept]], tier: 2});
    A.cards(sec, cards);
    const t = {
      id: 'F13S' + n, sec, ch: 13, title: number + ' · ' + title, sections: [number],
      concepts: [c], sources: [...new Set(cards.flatMap(card => card.src))],
      media: cards.flatMap(card => card.media)
    };
    topics.push(t);
    const owned = {examId: 'final', ch: 13};
    author({
      mc(id, slides, q, choices, why, media, extra) {
        A.mc(prefix + id, c, q, choices, why, sources(slides, extra), {...owned, media});
      },
      fill(id, slides, q, answers, why, extra) {
        A.fill(prefix + id, c, q, answers, why, sources(slides, extra), owned);
      },
      match(id, slides, q, pairs, why, media, extra, distractors) {
        A.match(prefix + id, c, q, pairs, why, sources(slides, extra),
          {...owned, media, wordBank: true, sourceFigure: !!media, extra: distractors});
      },
      write(id, slides, q, model, rubric, media, extra) {
        t.writing = A.teach(prefix + id, c, q, model, rubric, sources(slides, extra), {...owned, media}).id;
      }
    });
  }

  section(0, 'Read a regional climate map', 'Climate, weather, and the landscape', [
    group('One region, different climates', '2', [fig('fig-02','2','South Asia overview with mountains, dust, forests, and rivers')],
      [term('Weather', 'the atmospheric conditions at a particular time and place') + '. Climate describes the usual conditions and their variability over a much longer period.',
       'The Chapter 13 opener juxtaposes dusty dry land, the Himalayan mountain front, green forests, and flooding rivers. Winds move dust and water vapor, relief redirects and lifts air, and runoff links rainfall to the shape of the land.'],
      'Read the evidence', 'Use one visible clue to make an inference, then name a second clue that could test it. A single storm image gives a weather observation.'),
    group('Follow the water', '2, 12, 27', [fig('image14','2','Brahmaputra River floodplain')],
      [term('Runoff', 'water moving over land into channels') + '. Widespread heavy rain and mountain drainage can increase flow through the same lowland river system.',
       'Vegetation integrates climate over time. A wet forest and a dry basin in the same region can reflect differences in wind exposure, topographic barriers, and moisture supply.'],
      'Transfer the idea', 'Trace moisture from its ocean source to the slope where it rises, then trace surface water down to the floodplain.')
  ], ({mc,fill,write}) => {
    mc('nearby-landscapes','2, 27','Which process best explains a wet ocean-facing mountain slope beside a much drier inland basin?',
      ['*Moist air cools on ascent and loses water before descending inland.', 'Moist air warms on ascent and rains after sinking inland.', 'Dry inland air cools as it sinks and supplies rain to the mountains.', 'Coastal currents transfer rainfall directly to the inland basin.'],
      'The slope lifts moist air. Cooling promotes rain on the windward side, while descending air favors drier conditions inland.',
      fig('image10','2','Relief map of South Asia and adjoining oceans'));
    fill('long-record','2','What term describes the long-term pattern and variability of weather in a region?', ['climate'],
      'A satellite picture documents conditions at one time. Climate is the pattern across many observations.');
    mc('runoff','2, 12','After several days of heavy mountain rain, what most directly connects the storm to lowland flooding?',
      ['*Drainage gathers upslope runoff into downstream channels.', 'Ocean currents deliver sediment directly to mountain valleys.', 'Wind moves floodwater inland before it reaches a river.', 'Dry air sinks over the lowland and raises river levels.'],
      'Tributaries gather runoff. A larger downstream discharge can inundate the floodplain.');
    write('map-inference','2, 27','Use two observations from the chapter opener to connect the region’s weather or climate to its landscape.',
      'Moist marine air can rise along the Himalayan front and release rain. Drainage from the wet slopes can swell the Brahmaputra and spread floodwater and sediment across its lowland floodplain.',
      ['Names two specific observations on the slide.', 'Links a moisture source or uplift to rain.', 'Links rainfall or flow to a landscape effect.']);
  });

  section(1, 'Air pressure, isobars, and wind', 'Air pressure and horizontal motion', [
    group('What sets air pressure', '3–4', [fig('fig-03','3','Gas cylinders under compression, cooling, and heating'), fig('image17','4','Atmospheric layers and the decrease in pressure with altitude')],
      [term('Air pressure', 'force per unit area from molecules striking a surface') + '. Compression puts more molecules in the same space. In a sealed rigid container, heating increases molecular motion and raises the pressure.',
       'Pressure falls with altitude because less air lies above. The troposphere contains most familiar weather. The stratosphere above it contains the ozone layer and has an interval where temperature rises upward.'],
      'Keep conditions attached', 'Heating a rigid sealed gas and warming an air parcel free to expand are different situations.'),
    group('Read highs, lows, and gradients', '5–6', [fig('image18','5','Surface pressure contours over North America'), fig('image19','6','Ideal pressure-gradient arrow across four isobars')],
      [term('An isobar', 'a line connecting places with the same air pressure') + '. H and L mark pressure centers. A ridge is an elongated high-pressure region and a trough is an elongated low.',
       'Closer contours of the same interval show a stronger pressure gradient. With only the pressure-gradient force acting, acceleration points from higher to lower pressure, perpendicular to the isobars. Rotation and friction affect the actual wind.'],
      'Read the arrow', 'Follow the pressure values before choosing direction. A single isobar has the same value along its length.')
  ], ({mc,fill,write}) => {
    mc('sealed','3','A sealed, rigid cylinder is warmed. What changes first in the molecular model of pressure?',
      ['*Molecules strike the walls more energetically.', 'Molecules lose speed as the cylinder expands.', 'Fewer molecules remain inside the cylinder.', 'More gas molecules form at the cylinder wall.'],
      'Warming raises molecular kinetic energy. The container keeps its volume and number of molecules.');
    mc('gradient','5–6','The same 4-millibar contour interval appears in two parts of the map. What does tighter spacing indicate?',
      ['*Pressure changes more over the same distance.', 'Pressure changes less over the same distance.', 'The air is higher above the surface there.', 'The pressure value is constant across that region.'],
      'A gradient is a difference over distance. Equal pressure steps packed closer together give a stronger gradient.',
      fig('image18','5','Surface pressure contours over North America'));
    fill('equal-line','5','Name a line on a weather map connecting points with equal air pressure.', ['isobar'],
      'An isobar represents one pressure value. Compare nearby isobars to read the gradient.');
    mc('gradient-direction','6','A parcel starts at rest between the 1008 and 1004 millibar contours. With only the pressure-gradient force acting, how does it initially accelerate?',
      ['*Across the contours toward 1004.', 'Across the contours toward 1008.', 'Along the contour toward 1004.', 'Along the contour toward 1008.'],
      'The pressure-gradient force is perpendicular to isobars and points toward lower pressure.',
      fig('image19','6','Pressure gradient and the sequence of isobar values'));
    write('two-maps','5–6','Explain how contour labels and contour spacing answer two different questions about pressure-driven air motion.',
      'Read the contour values to find the direction from high to low pressure. Then compare the spacing between the same contour intervals. The tighter spacing has the larger pressure change per distance and the stronger pressure-gradient force.',
      ['Uses contour values for direction.', 'Uses equal intervals and spacing to compare gradients.', 'Connects the gradient to initial air acceleration.']);
  });

  section(2, 'Local breezes and global wind belts', 'Breezes, wind belts, and the Coriolis effect', [
    group('Sea breeze by day, land breeze by night', '7', [fig('breezes','7','Day and night coastal circulation panels')],
      [term('A sea breeze', 'surface flow from sea to land') + '. During the day, land warms faster. Warm air rises over land and cooler marine air moves in near the surface.',
       term('A land breeze', 'surface flow from land to sea') + '. At night, land cools faster than the water. Relatively cool, dense air flows offshore while the return flow is aloft.'],
      'Start at the surface', 'Breezes are named for where surface wind comes from. Trace the arrow nearest the water and land.'),
    group('Wind belts and the Coriolis effect', '8–9', [fig('image22','8','Globe with idealized circulation cells and surface wind belts'), fig('image23','9','Rotating globe and deflected air paths')],
      [term('The Coriolis effect', 'apparent deflection to the right of motion in the Northern Hemisphere and to the left in the Southern Hemisphere') + '. Start with the parcel’s direction of motion before choosing right or left.',
       'Unequal solar heating sets up rising and sinking branches. Near the surface, easterly trade winds approach the equator, westerlies occupy the middle latitudes, and polar easterlies blow from the east at high latitudes.'],
      'Compare latitude belts', 'An easterly arrives from the east. A westerly arrives from the west. Wind names use origin.',
      [lecture + ':lines 17–33', assignment + ':Q1, Q4'])
  ], ({mc,match,fill,write}) => {
    match('coastal-panels','7','Match the two coastal panels to the surface breeze and time of day.',
      [['1','Daytime sea breeze'],['2','Nighttime land breeze']],
      'The daytime surface arrow moves toward the low over land. In the night panel it moves offshore toward the low over water.',
      fig('breezes-numbered','7','Two numbered coastal cross sections with surface and upper arrows'));
    match('wind-belts','8–9','Match each numbered location on the course circulation globe to its surface wind belt.',
      [['1','Polar easterlies'],['2','Northern Hemisphere westerlies'],['3','Southeast trade winds'],['4','Northeast trade winds']],
      'High northern latitudes have polar easterlies. Midlatitude winds have a westerly component. The northeast and southeast trades approach the equator from their respective hemispheres.',
      fig('winds-numbered','8','Four numbered locations on the lecture circulation globe'),
      [assignment + ':Q1, blank capture 002 and checked capture 005']);
    mc('hemisphere','9','An air parcel initially moves due south in the Southern Hemisphere. Which way is the initial Coriolis deflection?',
      ['*East', 'West', 'North', 'South'],
      'Face south, then turn left. The resulting cross-track direction is east.');
    fill('prevailing-west','8','What are the prevailing midlatitude surface winds that usually come from the west called?', ['westerlies','prevailing westerlies','midlatitude westerlies'],
      'Westerlies generally transport air from west to east through the midlatitudes.');
    write('breeze-reversal','7','Explain why a coast can have an onshore wind by afternoon and an offshore wind before sunrise.',
      'The land gains heat faster during the day. Air rises over the warmer land and surface flow moves in from the sea. Land loses heat faster at night, so denser surface air moves offshore toward the relatively warmer water.',
      ['Compares daytime and nighttime heating of land and water.', 'Identifies afternoon surface flow from water to land.', 'Identifies nighttime surface flow from land to water.']);
  });

  section(3, 'Water phases and precipitation', 'Phase changes and precipitation growth', [
    group('Water changes phase and moves energy', '10', [fig('image26','10','Pressure-temperature diagram of ice, liquid, and vapor')],
      [term('Condensation', 'a change from water vapor to liquid water') + '. It releases latent heat to the surrounding air. Direct deposition of vapor as ice also releases heat.',
       'Evaporation takes up energy as liquid becomes vapor. Melting takes up energy as ice becomes liquid. Temperature and pressure together control which phase is stable.'],
      'Follow the energy', 'Evaporation takes energy from its surroundings. Condensation returns energy to them.'),
    group('From cloud particles to rain, snow, and hail', '11, 19', [fig('image28','11','Growth, splitting, and persistence of falling drops')],
      [term('Condensation nuclei', 'small airborne particles on which water droplets form', 'are') + '. Cloud droplets stay aloft readily. Larger drops fall when their settling speed overcomes the local updraft.',
       'Colliding droplets can join into a larger drop or split. Ice crystals can grow into snow. In a strong thunderstorm updraft, ice collects supercooled droplets and can grow into hail.'],
      'Distinguish three stages', 'A condensation nucleus is much smaller than a cloud droplet. A typical raindrop is larger than a cloud droplet.')
  ], ({mc,fill,match,write}) => {
    mc('energy-direction','10','Air over water loses heat as some liquid enters the gas phase. Which phase change accounts for this?',
      ['*Evaporation', 'Condensation', 'Deposition', 'Freezing'],
      'Evaporation takes energy from the surroundings to convert liquid water to vapor.');
    fill('nucleus','11','What is the name for a small aerosol particle that provides a surface for a cloud droplet to form?',
      ['condensation nucleus','cloud condensation nucleus'], 'A condensation nucleus can be a dust or salt particle.');
    match('phase-changes','10–11','Match each phase change to its energy effect and direction.',
      [['Liquid to vapor','Evaporation, absorbs heat'],['Vapor to liquid','Condensation, releases heat'],['Ice to liquid','Melting, absorbs heat']],
      'Compare the starting and ending phases. Each transition has a corresponding uptake or release of latent heat.');
    mc('hail-updraft','19','Why is a strong thunderstorm updraft favorable for hail growth?',
      ['*It holds ice in a region with supercooled droplets.', 'It brings warm raindrops directly to the surface.', 'It lets all cloud droplets evaporate before freezing.', 'It keeps ice below the level where clouds form.'],
      'The updraft keeps ice aloft long enough to collect supercooled water and grow.');
    write('cloud-to-rain','10–11','Explain how airborne particles, condensation, and drop growth lead from vapor to rainfall.',
      'Vapor condenses on small airborne particles as moist air cools. Cloud droplets are initially small. Some collide and join. They can fall as rain once their settling speed exceeds the updraft.',
      ['Identifies cooling and condensation on nuclei.', 'Distinguishes initial cloud droplets from raindrops.', 'Explains growth and settling as separate steps.']);
  });

  section(4, 'Rising air, weather fronts, and rainfall belts', 'Rising air and front interpretation', [
    group('Why rising air makes clouds', '12, 17', [fig('image29','12','Moisture path from ocean evaporation to mountain precipitation'), fig('image34','17','Idealized wet and dry latitude belts')],
      [term('Adiabatic cooling', 'cooling as a rising air parcel expands in lower pressure') + '. If moist air cools to saturation, water can condense. Continued lifting can support precipitation.',
       'Mountains lift oncoming air. On the global circulation figure, ascending air favors wet equatorial and roughly 60° belts. Descending, warming air favors dryness around 30° and near the poles.'],
      'Predict which side is wetter', 'Follow moist wind toward the slope it encounters first. Rising air cools there. The descending side is usually drier.',
      [lecture + ':lines 27–33, 67–73', assignment + ':Q3']),
    group('Compare cold, warm, and stationary fronts', '13–16', [fig('fig-13','13','Cold front with advancing dense air'), fig('fig-14','14','Warm air overrunning colder surface air'), fig('fig-15','15','Stationary front cross section'), fig('image33','16','Weather map with colored fronts')],
      [term('A front', 'the boundary between contrasting air masses') + '. In a cold front, advancing cold air wedges under warm air. Blue triangles point in the direction of motion.',
       'In a warm front, advancing warm air glides over colder air. Red semicircles mark its direction. Alternating blue triangles and red semicircles on opposite sides mark a stationary front with little net movement.'],
      'Use the symbols', 'Clouds can form near all three boundaries. Identify the front and motion from symbol shape and side before interpreting the rain.')
  ], ({mc,match,fill,write}) => {
    match('front-map','13–16','Match the numbered boundaries on the course weather map.',
      [['1','Stationary front'],['2','Warm front'],['3','Cold front']],
      'The western line alternates symbols on opposite sides, the eastern red line has semicircles, and the southeast blue line has triangles.',
      fig('fronts-numbered','16','Three numbered fronts on a North American weather map'));
    mc('parcel','12, 17','Why can a moist parcel cool as it rises above the surface?',
      ['*Lower pressure allows the parcel to expand.', 'Higher pressure forces the parcel to expand.', 'Lower pressure causes the parcel to compress.', 'Higher pressure causes the parcel to compress.'],
      'Air expands as surrounding pressure falls. The expansion cools the parcel, which can reach saturation.');
    mc('rising-belts','17','Which paired latitude bands have rising air and relatively frequent precipitation in the idealized circulation figure?',
      ['*Near the equator and near 60°.', 'Near the equator and near 30°.', 'Near 30° and near the poles.', 'Near 30° and near 60°.'],
      'Equatorial air rises, and contrasting air masses meet near 60°. Subtropical and polar sinking branches favor dryness.',
      fig('image34','17','Circulation globe with latitude belts'));
    fill('red-front','14','What kind of front is marked by red semicircles along its advancing edge?', ['warm front'],
      'The semicircles point in the direction the advancing warm front moves.');
    write('front-compare','13–15','Compare what moves at a cold and warm front, how the warm air rises, and how each is drawn on a map.',
      'A cold front advances as dense cold air wedges under warmer air. Blue triangles point along its motion. At a warm front, advancing warm air climbs over retreating colder air. Red semicircles point along the motion.',
      ['States which air mass advances at each front.', 'Describes the warm air’s path in both settings.', 'Identifies both map symbols and their direction cue.']);
  });

  section(5, 'Hurricanes, supercells, and tornadoes', 'How major storms develop', [
    group('Hurricanes draw heat from warm ocean water', '18', [fig('fig-18','18','Hurricane cross section, rotation, and seasonal tracks')],
      [term('A hurricane', 'a large rotating tropical cyclone with an organized low-pressure center') + '. Warm ocean water supplies vapor. The air rises, cools, and condenses, releasing heat that supports more rising air and surface inflow.',
       'In the Northern Hemisphere, the inflow curves into a counterclockwise circulation. Air descends in the relatively calm eye. Strong convection and winds surround it in the eyewall. The storm often weakens after losing its warm-ocean supply.'],
      'Separate motion from fuel', 'Coriolis deflection helps organize rotation. Warm ocean water and the release of latent heat supply energy.'),
    group('A supercell has a rotating updraft', '19–20', [fig('fig-19','19','Supercell structure and tornado photograph'), fig('image41','20','Historical U.S. tornado frequency map')],
      [term('A supercell', 'a thunderstorm with a persistent rotating updraft') + '. Wind shear helps organize rotation. A tornado can extend from the rotating storm toward the ground.',
       'The same storm may produce hail and heavy rain. Concentrated sinking air can spread outward as a damaging microburst. The U.S. map shows clustering across the central Plains and parts of the Southeast.'],
      'Read the arrows', 'Locate the rising rotating column before looking for a tornado. A microburst is associated with sinking and spreading air.',
      [assessment + ':capture 010'])
  ], ({mc,match,fill,write}) => {
    match('supercell-diagram','19','Match each numbered target in the storm cross section.',
      [['1','Rotating updraft'],['2','Downdraft'],['3','Tornado']],
      'The rotating rising column is shown by the red spiral. The blue flow descends next to it, while the narrow funnel reaches toward the ground.',
      fig('supercell-numbered','19','Three targets on a storm cross section with rising and descending flow'));
    mc('ocean-fuel','18','A tropical cyclone moves from a warm current across much colder water. What change directly limits its fuel?',
      ['*Less evaporation supplies less vapor to the storm.', 'More evaporation supplies less vapor to the storm.', 'Reduced rotation suppresses incoming sunlight.', 'Increased pressure prevents heat from entering the ocean.'],
      'Warm water sustains the storm by supplying vapor. Condensation of that vapor releases latent heat inside the storm.');
    fill('calm-center','18','What is the relatively calm center of a mature hurricane called?', ['eye','hurricane eye','eye of the storm'],
      'Air sinks in the eye. The eyewall around it contains vigorous convection and strong winds.');
    mc('outflow','19','A short-lived burst of air descends below a thunderstorm and spreads outward at ground level. What is it?',
      ['*A microburst', 'A tornado', 'A storm surge', 'A sea breeze'],
      'A microburst is a localized, intense downdraft with damaging outflow near the surface.');
    write('storm-mechanisms','18–19','Contrast how a hurricane is sustained with where a tornado can form in a supercell.',
      'A hurricane draws moisture and energy from warm ocean water, with latent heat released during condensation. A supercell has a rotating updraft. A tornado can develop beneath that part of the storm and reach the ground.',
      ['Names warm-ocean evaporation and latent heat for a hurricane.', 'Places tornado development near the rotating updraft.', 'Distinguishes a storm-wide fuel source from a feature within a storm.']);
  });

  section(6, 'Global surface currents', 'Current direction, temperature, and gyres', [
    group('Read a gyre from its arrows', '21', [fig('fig-21','21','Warm and cold surface currents and gyre patterns')],
      [term('A gyre', 'a broad loop of ocean surface circulation') + '. Wind transfers momentum to surface water. Earth’s rotation and the shape of the ocean basins help turn flows into large circuits.',
       'Subtropical gyres circulate clockwise in the Northern Hemisphere and counterclockwise in the Southern Hemisphere. Currents leaving low latitudes often carry relatively warm water, while those flowing toward the equator from higher latitudes can carry cooler water.'],
      'Use the whole map', 'Follow arrowheads around the basin. For an east–west current, read the color legend and source region to infer its temperature.',
      [assignment + ':Q7–Q11']),
    group('Identify the named boundary currents', '22', [fig('fig-22','22','Named currents in the global map')],
      [term('The Gulf Stream', 'a warm current flowing poleward off eastern North America') + '. On the map it follows the western boundary of the North Atlantic basin.',
       'The California Current flows south along western North America. The Humboldt (Peru) Current flows north along western South America, and the Benguela Current flows north along southwestern Africa. All three carry cool water toward lower latitudes.',
       'The Antarctic Circumpolar Current circles Antarctica eastward. The slide also points out the Canary, North Pacific, Equatorial, and Mozambique currents.'],
      'Name the basin side', 'Western side of a continent and western boundary of an ocean basin refer to opposite sides of the same coastline.')
  ], ({mc,match,fill,write}) => {
    match('named-currents','21–22','Match the four numbered boundary currents to their names.',
      [['1','California Current'],['2','Gulf Stream'],['3','Humboldt Current'],['4','Benguela Current']],
      'California is off western North America. The Gulf Stream is off eastern North America. Humboldt lies off western South America, and Benguela lies off southwestern Africa.',
      fig('currents-numbered','22','Four numbered coastal currents on the world map'),
      [assessment + ':capture 013', assignment + ':Q7–Q11'], ['Canary Current','Mozambique Current']);
    mc('southern-loop','21','What is the general circulation direction of the South Atlantic subtropical gyre when viewed on a map?',
      ['*Counterclockwise around the basin.', 'Clockwise around the basin.', 'Eastward along both boundary currents.', 'Westward along both boundary currents.'],
      'The Brazil Current carries water south on the west side and the Benguela Current flows north on the east side.');
    fill('circulation-loop','21','What term names a broad loop of ocean surface circulation within a basin?', ['gyre','ocean gyre','oceanic gyre'],
      'A gyre links several currents into a basin-scale circuit.');
    mc('west-south-america','21–22','Which pair correctly describes the surface current along the west coast of South America?',
      ['*Relatively cool, generally northward', 'Relatively cool, generally southward', 'Relatively warm, generally northward', 'Relatively warm, generally southward'],
      'The Humboldt Current carries relatively cool water northward along western South America.',
      fig('image42','21','Global surface-current arrows colored by relative temperature'), [assignment + ':Q8']);
    write('current-map','21–22','Compare the Gulf Stream and the California Current by coast, temperature, and direction relative to the equator.',
      'The warm Gulf Stream flows poleward off eastern North America. The cool California Current flows toward the equator along western North America.',
      ['Identifies the coast for each current.', 'States the relative temperature of each.', 'States the direction of each relative to the equator.']);
  });

  section(7, 'Ocean heat transport and ENSO', 'Surface temperatures and deep circulation', [
    group('Sea-surface temperature and coastal climates', '23, 25', [fig('image44','23','Global sea-surface temperature belts and departures'), fig('fig-25','25','Surface currents and onshore winds near Australia and Europe')],
      [term('Sea-surface temperature', 'the temperature of water at the ocean surface') + '. The tropics are generally warmer than the poles. Currents stretch warm zones poleward and carry tongues of cold water toward lower latitudes.',
       'A current affects land climate most directly when prevailing winds move over the water and then onshore. The slides illustrate warm waters off eastern Australia and ocean heat transported toward northwestern Europe.'],
      'Use wind and current together', 'Warm water beside a coastline supplies heat and moisture. The wind direction controls where that marine air goes.',
      [assignment + ':Q11–Q14']),
    group('Cold, salty water can sink', '24', [fig('image45','24','Idealized thermohaline conveyor with surface and deep branches')],
      [term('Thermohaline circulation', 'large-scale ocean circulation linked to density differences from temperature and salinity') + '. Cold, salty water is relatively dense. In the deck’s idealized diagram, it sinks in the North Atlantic and flows south at depth.',
       'Water from depth returns toward the surface elsewhere. Read the diagram as connected surface and deep pathways with mixing and upwelling.'],
      'Distinguish the drivers', 'Wind chiefly drives the surface gyres. Temperature and salinity are the density controls emphasized for the deep circulation.'),
    group('El Niño and La Niña on a Pacific map', '26', [fig('fig-26','26','Paired equatorial Pacific temperature patterns')],
      [term('El Niño', 'the warm phase with unusually warm surface water in the central and eastern equatorial Pacific') + '. Weaker trades and reduced upwelling commonly accompany the eastward spread of warm water.',
       term('La Niña', 'the cool phase with unusually cool central and eastern equatorial Pacific surface water') + '. Stronger trades pile warm water farther west and favor upwelling in the east. Both phases shift weather and affect marine life.'],
      'Check the comparison', 'An anomaly compares a place with its own long-term average. An eastern Pacific warm anomaly identifies the phase more directly than a warm patch in the normally warm west.')
  ], ({mc,fill,write}) => {
    mc('cold-tongue','23','In the South Pacific, a cool tongue extends toward the equator next to western South America. Which explanation fits that shape?',
      ['*An equatorward current supplies relatively cold water.', 'A poleward current supplies relatively warm water.', 'Latitude determines temperature along straight lines only.', 'An eastward warm current heats the continental margin.'],
      'Cool water carried by the Humboldt Current and coastal upwelling help explain why the temperature contours bend.',
      fig('image44','23','Two globes showing mean ocean surface temperatures'), [assignment + ':Q14']);
    mc('deep-water','24','Compared with neighboring surface seawater, which change most favors sinking in the conveyor model?',
      ['*Cooling and an increase in salinity.', 'Warming and an increase in salinity.', 'Cooling and a decrease in salinity.', 'Warming and a decrease in salinity.'],
      'Cooling and increased salinity both raise seawater density in this setting.',
      fig('image45','24','Linked surface and deep ocean pathways'));
    mc('east-warm-anomaly','26','The eastern equatorial Pacific becomes unusually warm as the trades weaken. Which phase fits both observations?',
      ['*El Niño', 'La Niña', 'Winter monsoon', 'Neutral ENSO'],
      'The El Niño pattern includes warmer-than-average water extending eastward in the equatorial Pacific.',
      fig('image48','26','A Pacific temperature pattern with the warm color band extending eastward'));
    fill('deep-name','24','What is the name for the large-scale ocean circulation associated with temperature and salinity differences?', ['thermohaline circulation','thermohaline conveyor','thermohaline conveyor belt'],
      'Thermo refers to temperature and haline to salt. Both affect density.');
    write('compare-enso','26','Explain how wind, upwelling, and the position of warm water differ between El Niño and La Niña.',
      'During El Niño weaker trades permit warm surface water to spread east and eastern upwelling weakens. During La Niña stronger trades drive warm water farther west and stronger eastern upwelling helps maintain cool anomalies.',
      ['Compares the strength of the trades.', 'Connects the trades to east–west position of warm water.', 'Compares eastern upwelling or temperature anomalies.']);
  });

  section(8, 'Monsoons, drought, and seasons', 'Seasonal and shorter-term climate changes', [
    group('A monsoon reverses the prevailing wind', '27', [fig('fig-27','27','India monsoon circulation and dry versus rainy season imagery')],
      [term('A monsoon', 'a seasonal reversal in prevailing wind direction') + '. Strong summer heating over Asia favors rising air and lower pressure over land. Moist air flows inland from the ocean.',
       'Air rising along mountain fronts cools and can produce heavy precipitation. In the dry season the prevailing flow reverses, reducing the marine moisture supply.'],
      'Define the process', 'The wind reversal defines the monsoon. Heavy rain is an effect where the incoming wind supplies moist air.',
      [assessment + ':capture 001']),
    group('Three routes to drought', '28', [fig('fig-28','28','Wind, ocean current, and high-pressure drought diagrams')],
      [term('Drought', 'a sustained period of reduced precipitation relative to normal for a region') + '. An unusual wind shift can cut off moisture. A changed current can alter marine temperature and moisture supply.',
       'Persistent high pressure promotes subsidence. Sinking air warms and its relative humidity tends to drop, limiting cloud development.'],
      'Distinguish drought from desert climate', 'A normally wet region can have a drought. A desert describes the long-term water balance.',
      [lecture + ':lines 67–69', assessment + ':capture 017']),
    group('Earth’s tilt and opposite seasons', '29', [fig('seasons','29','Two seasonal views of the tilted Earth')],
      [term('Axial tilt', 'the inclination of Earth’s spin axis relative to a line perpendicular to its orbital plane') + '. During a hemisphere’s summer, its axis points toward the Sun. Sunlight strikes at a higher angle and days are longer.',
       'Half an orbit later, that hemisphere tilts away and has shorter days and lower-angle sunlight. The other hemisphere has the opposite season.'],
      'Track one hemisphere', 'Start with the direction of its pole relative to the Sun. The same Sun–Earth distance applies to both hemispheres at a given instant.',
      [assignment + ':Q5'])
  ], ({mc,match,fill,write}) => {
    mc('monsoon-causal','27','During the Indian summer monsoon, which sequence best explains intense rain at a mountain front?',
      ['*Land heating, onshore moist flow, ascent and cooling.', 'Land cooling, onshore moist flow, sinking and warming.', 'Land heating, offshore moist flow, sinking and cooling.', 'Land cooling, offshore moist flow, ascent and warming.'],
      'Heating supports low pressure over land and draws in moist marine air. Mountain ascent cools the air.',
      fig('image50','27','Arrows showing summer air flow into the Indian subcontinent'));
    mc('dry-high','28','A high-pressure system remains over a normally rainy region for several weeks. Which mechanism favors drought?',
      ['*Air descends and warms, inhibiting condensation.', 'Air descends and cools, inhibiting condensation.', 'Air ascends and warms, promoting condensation.', 'Air ascends and cools, promoting condensation.'],
      'Sinking air is compressed and warms. With little change in vapor content, its relative humidity drops.');
    match('season-panels','29','Match the numbered views to the hemisphere tilted toward the Sun.',
      [['1','Northern Hemisphere summer'],['2','Southern Hemisphere summer']],
      'In panel 1 the northern pole leans toward the incoming sunlight. In panel 2 the southern pole does.',
      fig('seasons-numbered','29','Two numbered Earth views with parallel sunlight arrows'),
      [assignment + ':Q5']);
    fill('seasonal-wind','27','What is a seasonal reversal in prevailing wind direction called?', ['monsoon','seasonal monsoon'],
      'Monsoon refers to the seasonal winds. An onshore phase can bring intense rainfall.');
    write('season-explanation','29','Why does the Northern Hemisphere have summer while the Southern Hemisphere has winter?',
      'The Northern Hemisphere tilts toward the Sun, with longer days and more direct sunlight. The Southern Hemisphere tilts away at the same time, with shorter days and lower-angle sunlight.',
      ['Uses axial tilt.', 'Compares sun angle and day length.', 'Explains why the two hemispheres have opposite seasons.']);
  });

  section(9, 'Rain forests and the ITCZ', 'Rain forest climates and forest loss', [
    group('Why many tropical rain forests lie near the ITCZ', '30', [fig('image62','30','Global rain forests and seasonal positions of the ITCZ')],
      [term('The Intertropical Convergence Zone (ITCZ)', 'a migrating tropical belt where trade winds meet and moist air rises') + '. The rising air cools and condenses, helping support wet forests in the Amazon, equatorial Africa, and Southeast Asia.',
       'The belt shifts seasonally. A warm sea, prevailing winds, and the local terrain can change which parts of the tropics receive rain.'],
      'Instructor emphasis', 'Zhuang highlighted ' + highlight('the ITCZ as a key control on tropical rainfall') + '. Locate the convergence belt and explain the rising-air mechanism.',
      [lecture + ':lines 69–79']),
    group('Rain forest structure, regional settings, and loss', '30–31', [fig('fig-30','30','Tropical and temperate forest photographs and ITCZ map'), fig('fig-31','31','Rain forest fragmentation and land clearing')],
      [term('The canopy', 'the upper layer of interlocking tree crowns') + '. The understory and forest floor below receive less light. Warm, wet tropical forests differ from cooler temperate rain forests on some wet, ocean-facing coasts.',
       'In the Pacific Northwest, moist onshore air and coastal relief support temperate rain forests. Logging, ranching, farming, mining, dams, and roads can remove or fragment forest. Roads also open forest interiors to further clearing.'],
      'Explain the regional example', 'Use tropical convergence for an equatorial forest. Use marine winds and coastal uplift for a Pacific Northwest temperate forest.',
      [lecture + ':lines 75–79', assessment + ':capture 019'])
  ], ({mc,fill,write}) => {
    mc('why-wet','30','Why does the moving convergence belt favor frequent precipitation?',
      ['*Moist trade-wind air converges, rises, and cools.', 'Dry trade-wind air diverges, sinks, and cools.', 'Moist trade-wind air converges, sinks, and warms.', 'Dry trade-wind air diverges, rises, and warms.'],
      'Converging low-level winds force moist air upward, cooling it and promoting condensation.',
      fig('image62','30','Map of rainforest locations and seasonal tropical wind convergence'));
    fill('itcz-full','30','Name the tropical convergence belt associated with frequent rising air and equatorial rainfall.',
      ['intertropical convergence zone','ITCZ','inter tropical convergence zone'],
      'The ITCZ shifts position seasonally and often coincides with heavy tropical rainfall.');
    mc('temperate','30','Which process best explains a temperate rain forest on a windward Pacific Northwest mountain slope?',
      ['*Moist marine air is lifted by coastal mountains.', 'Dry continental air descends toward the coast.', 'Polar air diverges outward under high pressure.', 'Equatorial trades converge year-round at the coast.'],
      'Moist onshore flow and orographic uplift supply rain in the temperate setting.');
    mc('road-access','31','Why can road construction increase forest clearing beyond the road’s own footprint?',
      ['*It gives access for logging, farms, ranches, or mines.', 'It shifts the tropical convergence zone toward the road.', 'It changes marine currents and reduces regional rainfall.', 'It blocks all moisture carried by prevailing winds.'],
      'New access allows additional development. The road itself also fragments habitat.');
    write('two-forests','30','Explain why a tropical forest near the equator and a coastal temperate rain forest can both have high rainfall.',
      'Near the equator, moist trades converge and rise in the ITCZ. On a temperate coast, prevailing marine wind carries moisture into mountains, where uplift cools it and favors precipitation.',
      ['Explains moist convergence and ascent for the tropical forest.', 'Explains moist onshore flow and topographic ascent for the temperate forest.']);
  });

  section(10, 'Desert settings and desertification', 'Where deserts form and why', [
    group('A dry climate can have several causes', '32–33', [fig('image66','32','Distribution of the major dry regions'), fig('fig-33','33','Desert settings and examples around the world')],
      [term('A desert', 'a region where precipitation is very low relative to potential water loss') + '. The textbook uses less than about 25 cm of precipitation per year as a common guide. Deserts can be hot or cold.',
       'Subtropical deserts such as the Sahara lie under belts of sinking air near 30° latitude. The Gobi illustrates limited marine moisture far inland. Polar deserts receive little precipitation in very cold air.'],
      'Connect setting to mechanism', 'Start with latitude and distance from the ocean. Then check barriers, prevailing winds, and offshore currents.',
      [lecture + ':lines 81–99']),
    group('Mountains, cool coasts, and land degradation', '33–34', [fig('image70','33','Rain-shadow cross section'), fig('image71','33','Coastal desert with a prevailing offshore wind'), fig('image73','34','Map of relative desertification risk')],
      [term('A rain shadow', 'a dry zone on the leeward side of a mountain barrier') + '. Air loses moisture as it rises on the windward side. It then warms on descent. The eastern side of the southern Andes illustrates the pattern.',
       'Cold coastal water can keep lower air cool and stable, favoring fog with little rain. The Atacama also has a mountain barrier. More than one control can act together.',
       term('Desertification', 'degradation of productive dryland through climate stress and land use') + '. Drought, vegetation loss, soil erosion, and overgrazing can reinforce one another. The risk map marks areas such as the Sahel and the western United States.'],
      'Use more than the map color', 'The same dry climate can result from different processes. Explain which process the site’s setting supports.',
      [lecture + ':lines 89–101', assessment + ':captures 021–023'])
  ], ({mc,match,fill,write}) => {
    match('desert-mechanisms','32–33','Match each geographic setting with its strongest aridity mechanism.',
      [['Air sinks near a subtropical high','Subsidence warms air and lowers relative humidity'],
       ['Basin east of a west-facing mountain barrier','Moisture is lost on the windward slope before descent'],
       ['Interior far from the nearest ocean','Marine moisture has little access to the region'],
       ['Pacific coast beside a cold boundary current','Cool marine air is stable and produces little rain']],
      'Use the geographic clue first. Latitude, relief, distance inland, and a cold current point to different mechanisms.');
    mc('cold-desert','32–33','Which observation most directly supports classifying an Antarctic dry valley as a desert?',
      ['*Its annual precipitation is very low.', 'Its daily temperatures are always high.', 'Its bedrock has a dark surface coating.', 'Its coastline is next to a warm current.'],
      'A desert is defined by aridity. Persistent cold and very little annual precipitation can coexist.');
    mc('rain-shadow','33','Moist air travels from the ocean across a mountain range. Where is a rain shadow most likely?',
      ['*On the inland slope where air descends and warms.', 'On the coastal slope where air ascends and cools.', 'At the crest where air reaches saturation first.', 'Offshore where moist air approaches the range.'],
      'Windward ascent favors precipitation. Leeward descent warms the air after moisture was lost on the first slope.',
      fig('image70','33','Moist flow crossing a mountain range'));
    fill('land-degradation','34','What term describes the degradation of productive dryland through climate stress and land use?', ['desertification'],
      'Desertification can reduce vegetation and soil quality and increase erosion.');
    write('compare-deserts','33–34','Compare one subtropical desert with one rain-shadow desert. Give a named example and a process for each.',
      'The Sahara lies in the subtropical high-pressure belt, where descending air warms and is less likely to form clouds. Patagonia east of the southern Andes lies in a rain shadow, where prevailing westerly air has already lost much of its moisture.',
      ['Names a suitable subtropical example and explains subsidence.', 'Names a suitable rain-shadow example and explains windward moisture loss and leeward descent.']);
  });

  section(11, 'Wind transport and erosion', 'How wind moves and erodes sediment', [
    group('Rolling, bouncing, and suspension', '35–36', [fig('image74','35','Wind transport by grain size and height'), fig('image75','35','Wind speed by height above the surface'), fig('fig-36','36','Dust storm and local whirlwind')],
      [term('Saltation', 'short hops made by sand grains close to the ground') + '. Impacts can move coarser grains by rolling or sliding. Fine dust and silt can stay suspended and travel farther.',
       'Wind generally slows close to a rough surface. Dust storms loft fine material over wide areas, while small whirlwinds can briefly pick up dust in a narrow column.'],
      'Read grain size and height together', 'Look for fine grains higher in the flow, hopping sand near the ground, and coarser grains moving along the surface.',
      [lecture + ':lines 101–109', assessment + ':capture 025']),
    group('Remove loose grains or abrade rock', '37–38', [fig('fig-37','37','Vegetation-protected sediment and a wind-shaped rock'), fig('fig-38','38','Active and stabilized dunes, wind streaks, and loess')],
      [term('Deflation', 'removal of loose sediment by wind') + '. Vegetation can slow the wind and anchor sediment. Exposed neighboring surfaces may erode while material at the roots remains.',
       term('Abrasion', 'wearing or polishing rock by impacts from windblown grains') + '. Wind can also deposit sediment where it slows. Dunes hold sand and loess is mostly windblown silt.'],
      'Compare evidence', 'A mound around roots can reflect removal of the surrounding sand. A polished rock face points to repeated impacts.')
  ], ({mc,match,fill,write}) => {
    match('transport-bands','35','Match the numbered transport paths in the wind diagram.',
      [['1','Suspension'],['2','Saltation'],['3','Rolling or sliding']],
      'Fine particles stay aloft. Sand hops near the surface. Coarser grains can move along the ground after impacts from hopping grains.',
      fig('transport-numbered','35','Numbered paths at three heights in the sediment transport figure'));
    fill('sand-hop','35','What term describes short hops made by wind-transported sand grains?', ['saltation'],
      'Saltation moves sand in successive short hops close to the ground.');
    mc('root-island','37','A patch of sand remains high around plant roots while the bare surface around it drops. Which process best explains the difference?',
      ['*Deflation removes exposed grains while roots stabilize the patch.', 'Abrasion cuts through the roots while the exposed grains stay fixed.', 'Suspension deposits coarser grains farther above the bare surface.', 'Runoff deposits gravel above the roots while wind buries the surface.'],
      'Rooted vegetation protects sediment while wind strips loose grains from the exposed surrounding surface.',
      fig('image79','37','A raised patch of sand held together by vegetation'));
    mc('rock-surface','37','A rock has a polished face on its windward side near the ground. What process most directly produces the wear?',
      ['*Abrasion by repeated impacts from windblown sand.', 'Deflation removing only loose sediment nearby.', 'Chemical cementation of dust in the underlying soil.', 'Compaction of grains under newly deposited sand.'],
      'Air moves the grains, and the grains do the mechanical wearing.');
    write('size-modes','35','Explain how fine dust, sand, and coarser grains move differently in the same wind.',
      'Fine dust can remain suspended and travel high or far. Sand generally moves near the ground in short hops. Some coarser grains roll or slide after impacts from hopping sand.',
      ['Identifies suspension for fine material.', 'Identifies saltation for sand.', 'Identifies surface motion for coarser grains.']);
  });

  section(12, 'Dune shapes, cross-beds, and loess', 'Eolian deposits and former wind direction', [
    group('Classify dunes by shape, wind, and sediment supply', '39', [fig('fig-39','39','Six dune shapes with photographs and wind arrows')],
      [term('Barchan dunes', 'crescent dunes with horns pointing downwind', 'are') + '. They commonly form with a prevailing wind and limited sand. Parabolic dunes curve the other way because vegetation anchors their arms upwind.',
       'Transverse ridges run across a dominant wind where sand is plentiful. Longitudinal ridges run roughly along the resultant wind direction, often with winds from two directions. Multidirectional winds can produce star dunes with several arms. Composite dunes combine traits of other forms.'],
      'Check both the horns and the wind', 'Crescent outlines can look similar. Compare the horns with the direction of transport and look for vegetation anchoring the arms.',
      [lecture + ':lines 109–119']),
    group('A slip face records sand movement', '38, 40', [fig('image94','40','Dune cross section with inclined layers beneath the slip face'), fig('image95','40','Cross-beds preserved in rock'), fig('image84','38','Thick loess exposed in a valley')],
      [term('A slip face', 'the steep leeward slope where sand avalanches down a dune') + '. Wind moves sand up the gentler side. Sand builds out in inclined layers on the steep side as the dune migrates.',
       'Preserved cross-beds can indicate transport toward the direction of dip in that dune set. Loess is a widespread fine, mostly silt deposit produced by wind. It need not look like a sand dune.'],
      'Track the depositional side', 'The steep face and inclined beds point downwind in the illustrated dune.')
  ], ({mc,match,fill,write}) => {
    match('dune-shapes','39','Identify the numbered forms in the course dune diagram.',
      [['1','Barchan'],['2','Parabolic'],['3','Transverse'],['4','Star'],['5','Longitudinal'],['6','Composite']],
      'Downwind horns indicate barchan; upwind anchored arms indicate parabolic. Read the transverse and longitudinal crests relative to the arrows. Multiple arms mark a star dune, while the last panel combines traits.',
      fig('dunes-numbered','39','Six numbered dune forms with the wind arrows retained'));
    mc('horns','39','Two dunes have curved outlines. Which evidence favors a parabolic dune?',
      ['*The arms point upwind and are anchored by plants.', 'The horns point downwind and move faster than the center.', 'The ridges lie across the wind and carry abundant sand.', 'Several arms radiate from a center under shifting winds.'],
      'Vegetation anchors the arms of a parabolic dune. Its active middle moves downwind relative to those arms.');
    mc('beds-dip','40','What does the dip of inclined beds below the steep slope record in this dune?',
      ['*Sand deposition down the leeward face.', 'Sand deposition down the windward face.', 'Sand scour along the leeward face.', 'Sand scour along the windward face.'],
      'Sand avalanches and accumulates on the slip face. This creates inclined deposits that can be preserved as cross-beds.',
      fig('image94','40','Dune with an incoming wind arrow and inclined internal layers'));
    fill('silt-deposit','38','Name the widespread, mostly silt-sized windblown sediment deposit.', ['loess'],
      'Loess is dominated by wind-deposited silt. It differs from the sand that typically builds dunes.');
    write('cross-bed-sequence','40','Explain how moving sand builds a slip face and leaves cross-beds in the rock record.',
      'Wind carries sand up the gentle windward slope. Sand avalanches down the steep leeward face. As the dune migrates, successive inclined layers accumulate. Burial and lithification can preserve part of that inclined stack.',
      ['Explains movement up the gentler windward slope.', 'Explains deposition on the steep leeward face.', 'Connects successive inclined layers to cross-beds.']);
  });

  section(13, 'Landforms and surfaces of deserts', 'Desert landforms and surface materials', [
    group('From a canyon mouth to a closed basin', '41', [fig('fig-41','41','Alluvial fan, desert wash, playa, and dune examples')],
      [term('An alluvial fan', 'a fan-shaped sediment deposit at a canyon mouth') + '. Confined flow spreads out and slows as it reaches flatter ground, depositing sediment.',
       'A desert wash is a channel that can carry runoff after storms. A playa is the flat floor of a closed basin. Water can pool there briefly and leave fine sediment or salts after evaporation.'],
      'Trace the runoff path', 'Find the channel, then the place where flow spreads, then the low point where water can pond.',
      [lecture + ':lines 121–125', assignment + ':Q2']),
    group('Slow changes to rock and soil surfaces', '42', [fig('fig-42','42','Pediment, pavement, caliche, varnish, and natural stains')],
      [term('A pediment', 'a gently sloping erosional bedrock surface at a mountain front') + '. It can lie beside depositional features such as fans.',
       term('Desert pavement', 'a surface layer of closely packed rock fragments') + '. Fine-grain removal and soil processes can leave or maintain the coarse surface.',
       'Caliche is a carbonate accumulation in soil or sediment. Desert varnish is a thin dark coating commonly rich in manganese and iron oxides. Water can also leave stains on exposed cliffs.'],
      'Distinguish layer, coating, and deposit', 'Pavement consists of stones across a surface. Varnish coats individual rocks. Caliche is a carbonate accumulation within a soil or sediment.',
      [lecture + ':lines 121–125', assignment + ':Q2'])
  ], ({mc,match,fill,write}) => {
    match('desert-photos','41–42','Match all four numbered course photographs to their landforms or surfaces.',
      [['1','Desert wash'],['2','Playa'],['3','Desert pavement'],['4','Desert varnish']],
      'The channel is a wash. The flat evaporative basin floor is a playa. Closely spaced surface stones make pavement. The dark skin on exposed rock is varnish.',
      fig('desert-numbered','41–42','Four numbered desert photographs'),
      [assignment + ':Q2, blank capture 006 and checked capture 007']);
    mc('fan-origin','41','A channel exits a steep canyon and spreads across a flatter basin margin. Why does the resulting sediment body widen?',
      ['*Water spreads and slows as it leaves confinement.', 'Water narrows and speeds up as it leaves confinement.', 'Winds suspend larger grains as runoff enters the basin.', 'Evaporation dissolves the deposited grains at the canyon mouth.'],
      'As flow exits a canyon, it loses confinement and transport capacity. Sediment accumulates in a spreading fan.',
      fig('image99','41','Oblique view of a mountain front and its basin deposits'));
    mc('surface-pair','42','A gently sloping bench is cut into bedrock. Nearby, pale carbonate cements the shallow soil. Which two terms fit in order?',
      ['*Pediment and caliche', 'Alluvial fan and caliche', 'Pediment and desert varnish', 'Alluvial fan and desert varnish'],
      'A pediment is cut in bedrock. Caliche is a carbonate accumulation in soil or sediment.');
    fill('episodic-channel','41','What is the name for an often-dry desert channel that can carry runoff after storms?', ['desert wash','wash','arroyo'],
      'A desert wash is an ephemeral stream channel. Short intense flows can move substantial sediment.');
    write('fan-pediment','41–42','Distinguish an alluvial fan from a pediment at a desert mountain front. Describe an observation that would separate them.',
      'A fan is a body of sediment spread outward as a stream leaves a canyon. A pediment is a gently sloping surface cut across bedrock, sometimes with a thin cover. Exposed bedrock beneath a thin cover supports a pediment, while a thick fan-shaped accumulation supports an alluvial fan.',
      ['Identifies the fan as a depositional body.', 'Identifies the pediment as an erosional bedrock surface.', 'Gives a field distinction based on material or geometry.']);
  });

  section(14, 'Temperature records and climate proxies', 'Direct records, anomalies, and proxies', [
    group('Read an anomaly series', '43–44', [fig('temperature-records','43','Paired historical air and sea-surface temperature anomaly records'), fig('image108','44','Satellite lower-atmosphere temperature anomalies')],
      [term('A temperature anomaly', 'the observed temperature minus the reference average') + '. A negative anomaly is cooler than the baseline. The axis gives differences in temperature rather than absolute temperatures.',
       'The historical air and sea-surface graphs both show long-term warming with cooler intervals and short-term variation. The satellite graph covers a shorter period. Events such as El Niño and major eruptions can contribute to deviations within a trend.'],
      'Read two timescales', 'Compare decades for the long-term trend. Use individual spikes and dips to discuss short-term variability.',
      [lecture + ':lines 125–131', assessment + ':capture 032']),
    group('Reconstruct climates from proxies', '44', [fig('fig-44','44','Satellite record and examples of tree rings, cave deposits, and fossils')],
      [term('A climate proxy', 'an indirect record used to infer past climate conditions') + '. Tree rings reflect growing conditions. Isotopes in cave deposits, ice, and fossils can reflect temperature or water conditions.',
       'Proxy interpretation depends on the material and setting. Tree growth can respond to moisture as well as temperature. Independent records and calibration help separate those effects.'],
      'Separate measurement from inference', 'An instrument measures a modern quantity. A proxy measurement needs an established relationship to infer earlier conditions.',
      [lecture + ':lines 127–131'])
  ], ({mc,fill,write}) => {
    mc('paired-graphs','43','Which statement fits both historical records shown in the course figure?',
      ['*The long-term trend rises with shorter intervals of cooling.', 'Every decade is warmer than the previous one in both records.', 'Only the air record trends warmer after the early 1900s.', 'Both records measure absolute temperature on the same scale.'],
      'Both series trend upward across the record. Anomaly values vary from year to year and can drop for shorter periods.',
      fig('temperature-records','43','Air and ocean temperature anomaly series with year on the horizontal axes'));
    fill('anomaly-name','43','What is the term for an observed temperature minus a selected reference average?', ['anomaly','temperature anomaly','thermal anomaly'],
      'An anomaly is a difference from a defined baseline.');
    mc('tree-growth','44','A tree ring is unusually wide. What is needed before treating the width as evidence of warmer conditions?',
      ['*A calibration that accounts for factors such as moisture.', 'A count of rings to fix each wide ring to a calendar year.', 'A reference average built only from the widest rings.', 'A modern thermometer reading at an unrelated latitude.'],
      'Growth depends on more than temperature. A regional calibration can show whether temperature is the limiting influence.',
      fig('image109','44','Tree ring cross section with different ring widths'));
    mc('instrument','43–44','Which example is a proxy for a period before direct temperature measurements?',
      ['*Isotope ratios in dated cave deposits.', 'Air temperatures from a weather station.', 'Sea-surface temperatures measured by a buoy.', 'Atmospheric temperatures inferred from satellite radiance.'],
      'A dated cave deposit can preserve an indirect record before instrumental observations. The other choices use modern instruments.');
    write('proxy-limit','43–44','Compare the evidence from a modern temperature series and a tree-ring record. Give one limit of each.',
      'A temperature series represents instrumental observations and may show anomalies relative to a specified baseline. It only covers the period and places sampled. A tree-ring series can extend farther into the past, but ring width must be calibrated because both moisture and temperature can affect growth.',
      ['Distinguishes instrumental observations from proxy inference.', 'Names a valid limit of the temperature series.', 'Names a valid limit of ring-width interpretation.']);
  });

  section(15, 'Climate drivers and atmospheric CO₂', 'Radiation, climate drivers, and ILEA 10', [
    group('Where incoming and outgoing energy go', '45–46', [fig('image112','45','Reflection, absorption, and radiation in Earth’s energy balance')],
      [term('Insolation', 'incoming solar radiation') + '. Clouds, particles, and bright surfaces reflect some of it. Land and ocean absorb much of the remainder and emit longer-wave infrared radiation.',
       term('The greenhouse effect', 'warming associated with gases absorbing and re-emitting outgoing infrared radiation') + '. Water vapor and carbon dioxide contribute. Human activities add CO₂, particularly through fossil fuel combustion and land clearing.'],
      'Instructor emphasis', 'Zhuang highlighted ' + highlight('the role of greenhouse gases in absorbing outgoing infrared radiation') + '. Track incoming sunlight and outgoing infrared as separate paths.',
      [lecture + ':lines 129–147', assessment + ':capture 036']),
    group('ILEA 10 reads CO₂ on two timescales', '46', [fig('image113','46','Mauna Loa CO₂ record with an annual cycle inset'), fig('image116','46','Ice-core CO₂ and inferred temperature over roughly 400,000 years')],
      [term('The Keeling Curve', 'the long record of atmospheric CO₂ measured at Mauna Loa') + '. Read the deck plot as about 315–320 ppm around 1960 and about 410 ppm near its 2020 end, an increase of roughly 90–100 ppm.',
       'Small, repeated yearly rises and falls sit on top of the overall increase. Seasonal uptake and release by land vegetation, especially in the Northern Hemisphere, help account for that cycle.',
       'In the ice-core graph, CO₂ and inferred temperature broadly rise and fall together through repeated glacial cycles. Read each line against its own vertical axis. Their association alone cannot resolve the timing or cause of every change.'],
      'Use the correct window and axis', 'Read ppm from the CO₂ axis and temperature from the separate temperature axis. In the ice-core plot, older ages are on the left.',
      [ilea + ':parts 1–2', lecture + ':lines 57–65']),
    group('Climate drivers act on different timescales', '47–48', [fig('image117','47','Comparison of more and less eccentric orbits'), fig('image120','48','Multidecadal Atlantic sea-surface temperature departures')],
      [term('Orbital eccentricity', 'how much Earth’s orbit departs from a circle') + '. Eccentricity and changes in tilt and axis orientation alter the seasonal and geographic pattern of sunlight over long intervals.',
       'Solar output varies. The deck uses sunspots as one indicator of solar activity. Ocean oscillations include shorter ENSO variations and Atlantic and Pacific patterns that can persist for decades.'],
      'Match the timescale to the evidence', 'An annual CO₂ cycle, a multidecadal Atlantic fluctuation, and orbital changes refer to different processes and timescales.',
      [lecture + ':lines 147–153'])
  ], ({mc,fill,write}) => {
    mc('co2-graph','46','Estimate the change in Mauna Loa CO₂ from about 1960 to the end of the figure near 2020.',
      ['*An increase of about 95 ppm.', 'An increase of about 45 ppm.', 'An increase of about 190 ppm.', 'An increase of about 10 ppm.'],
      'The early value is near 315–320 ppm and the late value near 410 ppm. Subtract to get roughly 90–100 ppm.',
      fig('image113','46','Mauna Loa CO₂ in ppm by year'), [ilea + ':part 1']);
    mc('ice-cores','46','Which pattern recurs across the paired ice-core curves?',
      ['*High and low CO₂ intervals generally coincide with warm and cool intervals.', 'CO₂ and temperature both increased continuously across the record.', 'CO₂ changes consistently follow temperature by exactly one cycle.', 'CO₂ and temperature share the same units and baseline.'],
      'The broad highs and lows align across repeated cycles. The timing and causes require additional evidence.',
      fig('image116','46','Ice-core CO₂ and inferred temperature plotted on separate axes'), [ilea + ':part 2']);
    mc('radiation-path','45–46','Which path supplies the infrared radiation absorbed by greenhouse gases?',
      ['*The warmed surface emits energy back upward.', 'Sunlight reflects from bright clouds into space.', 'Incoming visible light passes through the air.', 'Sea ice reflects shortwave sunlight back upward.'],
      'The warmed land and ocean emit infrared radiation. Greenhouse gases absorb and re-emit part of that outgoing energy.',
      fig('image112','45','Shortwave and longwave paths in the course energy diagram'));
    fill('orbit-shape','47','What term describes the degree to which an orbit departs from a circle?', ['eccentricity','orbital eccentricity'],
      'Eccentricity describes orbital shape. Obliquity describes the axial tilt.');
    write('ilea-graphs','46','Use both ILEA graphs. Describe the Mauna Loa trend and its short-term variation, then describe how CO₂ and inferred temperature compare in the ice-core record.',
      'Mauna Loa CO₂ rises by roughly 90–100 ppm from around 1960 to near 2020, with a yearly oscillation superimposed. Across the ice-core record CO₂ and inferred temperature go through repeated broadly corresponding peaks and troughs.',
      ['Describes the long-term Mauna Loa increase and approximate magnitude.', 'Identifies a repeating annual cycle.', 'Describes repeated broadly aligned high and low intervals in the ice-core record.'],
      undefined, [ilea + ':parts 1–2']);
  });

  section(16, 'Climate feedback, sea level, and storms', 'Consequences of warming and evidence limits', [
    group('Ice and albedo reinforce each other', '49–50', [fig('image122','49','Landscape and ocean processes affected by warming'), fig('arctic','50','Arctic sea-ice comparison, with image dates 1979 and 2015')],
      [term('Albedo', 'the fraction of incoming sunlight a surface reflects') + '. Snow and ice tend to reflect more than darker ocean or exposed land.',
       'A warmer surface can lose reflective snow and ice, exposing darker surfaces. They absorb more solar energy and reinforce the initial warming. This is a positive feedback.',
       'The paired Arctic images are labeled 1979 and 2015. The comparison illustrates reduced sea-ice extent, with consequences for marine habitat and surface reflectivity.'],
      'Instructor emphasis', 'Follow ' + highlight('warming → less reflective ice → greater solar absorption → more warming') + ' all the way around the loop.',
      [lecture + ':lines 135–139, 155–157']),
    group('Sea-level rise and uneven regional effects', '49–50', [fig('fig-49','49','Warming impacts across land, ice, and ocean')],
      [term('Thermal expansion', 'an increase in seawater volume as the water warms') + '. It raises sea level. Melting grounded glaciers and ice sheets also raises sea level by adding water to the ocean.',
       'Floating sea ice already displaces seawater and its loss has little direct effect on sea level in the course model. It still affects habitat, albedo, and local salinity. Changes in precipitation and evaporation can affect runoff, ecosystems, and circulation.'],
      'Separate floating and grounded ice', 'Compare where the water is stored before melting. Land ice adds water to the ocean. Floating ice already occupies space in it.'),
    group('Read storm records separately', '51', [fig('fig-51','51','Historical Atlantic storm counts and strong U.S. tornado counts')],
      [term('Storm frequency', 'the number of storms in a stated time interval') + '. Intensity describes how strong they are. Warmer surface water can supply more heat and moisture to some tropical storms, while wind shear and atmospheric circulation also affect development.',
       'The lecture graphs report counts for different kinds of storms. Changes in the observing record and strong year-to-year variability matter when interpreting trends.'],
      'What does the graph count?', 'A count of storms cannot by itself tell you how their maximum wind speeds or rainfall changed.')
  ], ({mc,match,fill,write}) => {
    match('sea-level-effects','49–50','Match each physical change to its immediate effect.',
      [['Grounded ice melts','Water is added to the ocean'],['Ocean water warms','Seawater expands'],['Floating sea ice retreats','The surface reflects less sunlight']],
      'Grounded meltwater and thermal expansion raise sea level. Floating ice retreat exposes darker water and reduces albedo.');
    mc('albedo-loop','49–50','After ice retreats and exposes dark ocean, what amplifies the initial warming?',
      ['*The lower albedo increases absorbed sunlight.', 'The lower albedo increases reflected sunlight.', 'The higher albedo increases absorbed sunlight.', 'The higher albedo decreases reflected sunlight.'],
      'Open water generally reflects less than snow or ice, so the surface absorbs more incoming solar energy.',
      fig('arctic','50','Arctic ice extent comparison'));
    fill('reflectivity','45, 49–50','Name the fraction of incoming sunlight reflected by a surface.', ['albedo'],
      'Higher albedo means a larger fraction is reflected.');
    mc('counts','51','What would you need to compare hurricane intensity between decades beyond the count plot?',
      ['*A consistent record of storm strength, such as maximum winds.', 'A longer series containing only the total storm count.', 'The annual number of strong tornadoes on land.', 'The year each storm first appeared in the record.'],
      'Frequency counts cannot determine intensity. A comparable measure of strength is needed.',
      fig('image125','51','Historical Atlantic tropical storm and hurricane counts'));
    write('ice-contrast','49–50','Compare what melting grounded ice and losing floating sea ice do to sea level and albedo.',
      'Grounded ice loss adds water to the ocean and raises sea level. Floating sea ice already displaces seawater, so its melt has little direct effect on sea level. Replacing reflective ice with darker land or ocean lowers albedo and can reinforce warming.',
      ['Explains grounded ice and added ocean water.', 'Explains floating ice and displacement.', 'Connects loss of reflective cover to lower albedo.']);
  });

  section(17, 'Plate tectonics and climate', 'Two-way links between climate and tectonics', [
    group('Changing geography changes climate', '52–53', [fig('fig-52','52','Mountains, volcanism, and changing sea level'), fig('fig-53','53','North America in the Permian, Cretaceous, and Neogene')],
      [term('Plate motion', 'movement of lithospheric plates that can change a continent’s latitude and geographic setting') + '. A continent moving toward higher latitude encounters a different pattern of sunlight. Opening or closing seaways can change heat transport.',
       'Uplift builds mountains that redirect and lift air. Volcanism can release gases and particles. Sustained changes in the rate of seafloor spreading can alter the volume of mid-ocean ridges and affect sea level.'],
      'Read the sequence of maps', 'Compare the coastline, mountains, seaways, and latitude of a site before inferring how its climate might have changed.'),
    group('Climate affects erosion in rising mountains', '54', [fig('fig-54','54','Himalayan precipitation, topography, and the crustal cross section')],
      [term('Erosion', 'removal and transport of material from the landscape') + '. Climate influences its rate by changing runoff and glacial activity. Mountain height and slopes reflect the balance between uplift and material removal.',
       'Removing mass can promote isostatic rebound. Slide 54 also presents a Himalayan example where strong erosion may influence how crustal material moves.'],
      'Separate rock motion from surface height', 'Rock can rise while erosion lowers or limits the height of the surface.',
      [assessment + ':capture 040'])
  ], ({mc,fill,write}) => {
    mc('moving-continent','53','A continental site moves from near the equator toward higher latitude. Which climate control changes directly?',
      ['*The seasonal pattern and angle of incoming sunlight.', 'The chemical composition of all underlying bedrock.', 'The existence of ocean tides at all shorelines.', 'The direction of Earth’s rotation at the site.'],
      'Latitude controls sun angle and day length through the seasons. Other controls, such as currents, can also change as the geography evolves.',
      fig('fig-53','53','Three reconstructions of North America through time'));
    mc('uplift-erosion','54','A mountain belt continues to uplift while rivers remove material just as fast at its surface. What can happen to surface elevation?',
      ['*It can stay roughly steady while rock keeps rising.', 'It must increase at the full rate of rock uplift.', 'It must decrease at the full rate of erosion.', 'It stops changing only if the rivers stop carrying sediment.'],
      'If rates balance, surface height can remain roughly steady even though rock rises and sediment is removed.');
    fill('unloading','54','What process lifts the crust as a long-term response to erosion removing mass?', ['isostatic rebound','isostatic uplift','isostatic adjustment'],
      'Removing material reduces the load. Isostatic adjustment can raise the underlying rock.',
      [assessment + ':capture 040']);
    mc('ridge-volume','52–53','How can a sustained change in spreading rates influence sea level in the deck’s tectonic example?',
      ['*It can change how much volume ocean ridges occupy.', 'It can change the albedo of sea ice without any melt.', 'It can reverse all surface winds that drive ocean currents.', 'It can add rainfall directly to the open ocean each day.'],
      'More extensive young, elevated ridge crust can displace seawater and reduce the capacity of the ocean basins.');
    write('two-directions','52–54','Give one example of tectonics changing a regional climate and one example of climate affecting a mountain belt.',
      'Uplift can build a range that forces moist air upward, producing a wet windward slope and dry leeward slope. Persistent heavy precipitation can accelerate river erosion, changing how rapidly material is removed from an uplifting belt.',
      ['Gives a tectonic change and a climate mechanism.', 'Gives a climate control on erosion.', 'Connects erosion with surface relief or unloading.']);
  });

  section(18, 'Hurricane Sandy and the East Coast', 'Sandy’s path, transition, and impacts', [
    group('Follow Sandy and the approaching front', '55–56', [fig('fig-56','56','Three satellite views of Sandy approaching and making landfall')],
      [term('The Gulf Stream', 'a warm ocean current off the eastern United States') + '. It helped sustain Sandy as the storm moved northward after beginning in the tropics.',
       'On the slide, the curved spiral east of the coast is Sandy. A separate band of clouds extends along a front to its west. Interaction with the frontal system helped change the storm’s structure and path.',
       'Sandy reached New Jersey on October 29, 2012 after transitioning to a post-tropical cyclone, the classification used in the National Hurricane Center’s report.'],
      'Track two systems', 'Trace the tropical circulation and the continental front separately in the earlier views. Then compare their positions before landfall.',
      ['NHC Sandy:summary and synoptic history']),
    group('Strong winds can raise water against a coast', '55–56', [fig('image137','55','Coastal damage after Sandy')],
      [term('Storm surge', 'a storm-driven rise in coastal water above the expected tide') + '. Strong winds drive water toward the coast. A high tide can add to the resulting water level.',
       'At Sandy’s landfall, inundation and waves damaged infrastructure and eroded shorelines. The cyclone’s change in classification did not remove those hazards.'],
      'Separate hazard and classification', 'Ask what wind, waves, and water can do at the shoreline, even when the storm has changed structure.',
      ['NHC Sandy:storm surge and impacts'])
  ], ({mc,fill,write}) => {
    mc('satellite-two-systems','55–56','In the earlier view, what does the curved band of clouds west of Sandy’s offshore spiral represent?',
      ['*A separate cold front and its associated weather.', 'A second eyewall circling Sandy’s center.', 'A surface current flowing through the clouds.', 'A belt of polar easterlies spanning the coast.'],
      'The course sequence distinguishes Sandy’s cloud spiral offshore from the frontal cloud band approaching over land.',
      fig('sandy-early','56','Early satellite view with an offshore spiral and a separate continental cloud band'));
    mc('northbound-fuel','56','What helped support Sandy while it moved northward along the coast before landfall?',
      ['*It remained over warm Gulf Stream waters.', 'It moved inland across the Appalachian mountains.', 'It entered a band of colder shelf water.', 'It crossed an offshore zone of sinking polar air.'],
      'The warm current could continue supplying moisture and heat while the storm was offshore.');
    fill('above-tide','55–56','What term describes a storm-driven rise in coastal water above the expected tide?', ['storm surge','surge'],
      'Wind and the storm’s pressure field can raise coastal water. Local tide and coastal geometry affect the total water level.');
    mc('damage','55','Which process directly accounts for coastal erosion and flooding even as Sandy changed structure near landfall?',
      ['*Onshore storm surge and wave action.', 'Offshore cold air suppressing wave formation.', 'Inland runoff preventing seawater from moving.', 'A change in storm category reducing coastal water.'],
      'Surge and waves can persist as a storm transitions. They can inundate and erode the shoreline.',
      fig('image137','55','Coastal damage after the storm'));
    write('track-and-hazard','55–56','Use the satellite sequence to explain how Sandy’s setting changed as it moved north, and name two coastal effects.',
      'Sandy tracked north over warm offshore waters while a separate front approached from the west. Its structure changed during the interaction and it reached New Jersey as a post-tropical cyclone. Surge flooded coastal areas and waves eroded shorelines.',
      ['Identifies the warm offshore path and the separate front.', 'Connects frontal interaction to the transition near landfall.', 'Names two relevant coastal effects.'],
      undefined, ['NHC Sandy:summary and impacts']);
  });

  section(19, 'Planet X climate investigation', 'Combine evidence to infer climate on a map', [
    group('Read the evidence layers in order', '57–58', [fig('fig-57','57','Planet X site photographs and location map'), fig('fig-58','58','Planet X surface currents, winds, and late-summer temperatures')],
      [term('Prevailing wind', 'the direction the wind most commonly comes from') + '. Follow the arrows to see whether a site receives marine or continental air. Then check whether mountains lift that air or shelter the site downwind.',
       'Read current arrows and surface temperatures separately. On this map a red-orange low-latitude belt reaches about 31 °C. Cooler water occurs farther south, including the marked 16 °C and 2 °C zones.',
       'Use the photographs to test your map inference. Sand dunes suggest arid, wind-affected terrain, lush vegetation suggests abundant moisture, and glacial ice indicates sustained cold conditions or high elevation.'],
      'Keep observations and interpretations separate', 'Arrow direction and a color value are observations. The moisture supply to a coast is an interpretation that uses both.',
      [assignment + ':Q15–Q19']),
    group('Place likely rain forests, deserts, farms, and storm risk', '58–59', [fig('image153','59','Planet X blank map with latitude lines')],
      [term('A climate inference', 'a likely interpretation built from several mutually supporting clues') + '. Low-latitude onshore flow from warm water supports a wet forest. Subsiding air, an offshore wind, a cool current, or a rain shadow can favor desert.',
       'Look for adequate water and suitable relief for agriculture. Warm tropical water can support cyclones away from the immediate equator, and storm tracks determine which coasts are exposed.'],
      'Make a defensible placement', 'Choose one favorable and one limiting factor before assigning a climate or hazard to a place.')
  ], ({mc,match,write}) => {
    mc('wet-vs-dry','57–58','Which combination is the strongest evidence for a tropical rain forest on Planet X?',
      ['*Low latitude, warm offshore water, and moist onshore flow.', 'Low latitude, cool offshore water, and persistent offshore flow.', 'Midlatitude, warm offshore water, and leeward descent.', 'High latitude, cool offshore water, and dry continental flow.'],
      'Warm water and onshore wind provide moisture in the tropics. Uplift or convergence can then sustain frequent rainfall.',
      fig('fig-58','58','Planet X with wind, current, and temperature maps'));
    mc('hurricane-compare','58','Which coast is most exposed to a tropical cyclone given the late-summer conditions on the map?',
      ['*A coast in the tropical belt downwind of a broad area of warm ocean.', 'A coast in the polar belt beside the water marked 2 °C.', 'A coast isolated from the warm ocean by a high inland divide.', 'A coast beside the 16 °C water on the far side of the cold current.'],
      'A warm tropical ocean can supply moisture and heat. Exposure is greater when prevailing storm motion can bring the cyclone to the coast.',
      fig('image152','58','Planet X late-summer sea-surface temperatures by latitude'));
    match('map-evidence','57–59','Match each combined clue to the strongest climate or land-use inference.',
      [['Warm marine air rising at a low-latitude coast','Likely tropical rain forest'],
       ['Dry air descending inland after crossing a mountain chain','Likely rain-shadow desert'],
       ['Gently sloping land with reliable water','Potential cropland'],
       ['Low-latitude shore reached by storms over warm water','Potential hurricane exposure']],
      'Infer a likely result by combining moisture, terrain, latitude, and storm path. Each clue supports one of the mapped categories.',
      fig('image153','59','Planet X planning map showing continents and latitude bands'));
    mc('photo-evidence','57','Two of the photos show dunes at A and glacial ice at D. What does the contrast establish most directly?',
      ['*The sites preserve different landscape evidence that needs a climate explanation.', 'The sites have identical temperatures and annual precipitation.', 'All of the locations on the same continent have the same climate.', 'Each photo provides an exact annual precipitation measurement.'],
      'The photos give observations to reconcile with latitude, winds, relief, and ocean temperatures. They do not measure a complete climate record.',
      fig('fig-57','57','Planet X map surrounded by lettered site photographs'));
    write('justify-a-site','57–59','Use the Planet X maps to explain how you would distinguish a likely rain-forest site from a dry site. Name the evidence you would check in order.',
      'Locate the sites by latitude. Trace whether winds reach each site from the ocean or land, then read the offshore sea-surface temperatures. Check the relief for uplift or rain shadow and compare the vegetation or landform photos with the resulting prediction.',
      ['Uses latitude and wind direction.', 'Checks the offshore temperature or current.', 'Uses relief and one visible landscape clue to test the inference.']);
  });
})(window.L);
