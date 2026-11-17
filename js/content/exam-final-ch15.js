/* Final Exam Learn and figure practice. */
(function (L) {
  'use strict';
  const {chapter, group, term} = L.FINAL_STUDY;
  const text = 'Textbook 15', connect = 'Connect assignment 15';
  L.SOURCES[text] = {t: 'Exploring Geology · Chapter 15', f: 'Assigned textbook extracts', tier: 2, unit: 'section'};
  L.SOURCES[connect] = {t: 'Chapter 15 Connect assignment', f: 'Assignment figures', tier: 2, unit: 'question'};
  L.SOURCES['Weathering lectures'] = {t: 'Professor Zhuang · November 12 and 17 lectures', f: 'Chapter 15 lecture transcripts', tier: 2, unit: 'lines'};
  const lecture = {0:'Nov 12, lines 1–5',1:'Nov 12, lines 7–15',2:'Nov 17, lines 27–39',3:'Nov 17, lines 39–43',4:'Nov 17, lines 45–51',5:'Nov 17, lines 53–69',6:'Nov 17, lines 71–91',8:'Nov 17, lines 93–113',9:'Nov 17, lines 113–117',10:'Nov 17, lines 119–131',11:'Nov 17, lines 133–139',12:'Nov 17, lines 139–143',13:'Nov 17, lines 145–149',14:'Nov 17, lines 151–155'};
  L.SOURCES['Connect assessment 15'] = {t: 'Chapter 15 Connect assessment', f: 'Assessment captures', tier: 2, unit: 'question'};
  const {section, img} = chapter(15, {
    name: 'Ch 15 · Weathering, Soil, and Unstable Slopes', short: 'Ch 15',
    coverage: 'Introduction and sections 15.1–15.17',
    evidence: 'November 12 and 17 lectures, textbook figures, classroom exercise, and Connect.',
    sourceNote: 'Sections 7 and 15 use the available lecture or Connect evidence. Their standalone textbook pages were absent from the packet.'
  }, (n, locator) => locator.includes(':') ? [locator] : [text + ':' + locator, ...(lecture[n] ? ['Weathering lectures:' + lecture[n]] : [])]);
  const figure = (id, description) => img(id, description, 'Exploring Geology · Fig. ' + id);

  section(0, "Venezuela’s coastal fans", "Venezuela’s coastal fans", [
    group("Follow the valley", "15.00.a1", [figure("15.00.a1", "Coastal relief and settlements below mountain valleys")], [
      term("An alluvial fan", "a sediment apron where a confined stream emerges onto open ground") + ".",
      "Heavy rain mobilizes loose material on the steep slopes above the Venezuelan coast."
    ], "Read the figure", "A fan receives material funneled through its upstream valley."),
    group("Find the fan", "15.00.a4", [figure("15.00.a4", "Deposits among buildings after the coastal disaster")], [
      term("A debris flow", "a rapidly moving mixture of water and rock debris") + ".",
      "Sediment from many earlier events built the flat surface at the valley mouth. Its gentle slope records deposition and can hide the hazard posed by a steep catchment upstream.",
      "Where the valley opens onto an alluvial fan, a debris flow can spread across the same flat ground that attracted settlement."
    ], "Trace the route", "Explain how mountain rainfall threatens a settlement on a coastal fan.")
  ], ({mc, fill, write}) => {
    mc("application", "15.0", "Why did a neighborhood on relatively gentle ground receive boulders during the coastal storm?",
      ["*Its position connected it to a steep, debris-producing valley.", "Waves carried the largest blocks inland from deep water.", "The entire fan detached along one bedding surface.", "Local soil expanded enough to lift buried bedrock."], "Rain mobilizes loose soil and blocks high on the slopes. A confined canyon directs that debris toward its mouth. On reaching the fan, the flow spreads across gentler ground occupied by buildings.");
    mc("figure", "15.0", "In the relief view, which position connects a settlement to sediment from an entire mountain valley?",
      ["*On the fan where the valley opens", "On the crest separating valleys", "Offshore beyond the fan front", "On a spur above the valley walls"], "A fan receives material funneled through its upstream valley.", figure("15.00.a1", "Assigned figure for section 15.0"));
    fill("recall", "15.0", "What geological term means “a sediment apron where a confined stream emerges onto open ground”?",
      ["alluvial fan", "an alluvial fan"], "Heavy rain mobilizes loose material on the steep slopes above the Venezuelan coast.");
    write("explain", "15.0", "Explain how mountain rainfall threatens a settlement on a coastal fan.",
      "Rain mobilizes loose soil and blocks high on the slopes. A confined canyon directs that debris toward its mouth. On reaching the fan, the flow spreads across gentler ground occupied by buildings.", ["Connect rainfall to sediment mobilization", "Trace the flow through the canyon", "Explain spreading at the valley mouth"], figure("15.00.a1", "Assigned figure for section 15.0"));
  });

  section(1, "Joints and physical weathering", "Joints and physical weathering", [
    group("Find the fracture", "15.01.b2", [figure("15.01.b2", "Bedrock blocks separated by intersecting joints")], [
      term("A joint", "a fracture with little or no displacement across it") + ".",
      "A joint divides solid rock into blocks without appreciable movement across the crack."
    ], "Read the figure", "New fracture faces expose formerly internal rock."),
    group("Open the path", "15.01.d1", [figure("15.01.d1", "One block subdivided into smaller blocks")], [
      term("Frost wedging", "the opening of fractures by ice growth") + ".",
      "Unloading can open sheet joints roughly parallel to the land surface. Roots, salt crystals, and ice can enlarge existing openings. Breaking rock into smaller pieces increases its surface area per unit volume.",
      "As ice grows inside a wet fracture, it can pry the walls apart and expose fresh surfaces."
    ], "Inspect the break", "Explain how a joint can accelerate both mechanical and chemical weathering.")
  ], ({mc, fill, write}) => {
    mc("application", "15.1", "A granite block splits along a crack while its minerals retain their composition. What has happened?",
      ["*Physical weathering increased the exposed surface area.", "Hydrolysis converted feldspar to dissolved quartz.", "Oxidation produced the fresh fracture surfaces.", "Dissolution removed the entire core of the block."], "Water can enter a joint. Ice growth or roots can widen it and separate blocks. Their newly exposed surfaces give water more mineral area on which to react.");
    mc("figure", "15.1", "In the block diagram, what increases when a block splits while total rock volume stays constant?",
      ["*Total exposed surface area", "Total mineral mass", "Individual block volume", "Average grain diameter"], "New fracture faces expose formerly internal rock.", figure("15.01.d1", "Assigned figure for section 15.1"));
    fill("recall", "15.1", "What geological term means “a fracture with little or no displacement across it”?",
      ["joint", "a joint"], "A joint divides solid rock into blocks without appreciable movement across the crack.");
    write("explain", "15.1", "Explain how a joint can accelerate both mechanical and chemical weathering.",
      "Water can enter a joint. Ice growth or roots can widen it and separate blocks. Their newly exposed surfaces give water more mineral area on which to react.", ["Identify a path for water", "Describe widening or separation", "Connect new surface area to reaction"], figure("15.01.d1", "Assigned figure for section 15.1"));
  });

  section(2, "Dissolution, oxidation, and hydrolysis", "Dissolution, oxidation, and hydrolysis", [
    group("Dissolve the mineral", "15.02.b2", [figure("15.02.b2", "Channels enlarged along the surface of soluble rock")], [
      term("Hydrolysis", "a reaction in which minerals interact with water and form new substances") + ".",
      "Slightly acidic water moving through limestone carries dissolved material away and leaves a wider opening."
    ], "Read the figure", "Water can dissolve calcite along the same route repeatedly and deepen a groove."),
    group("Change the mineral", "15.02.c1", [figure("15.02.c1", "Contrasting colors across exposed rock")], [
      term("Oxidation", "a chemical change involving electron loss, commonly altering iron-bearing minerals near the surface") + ".",
      "Dissolution can remove calcite in solution. Oxidation changes the chemical state of elements such as iron and can leave rusty coatings. In hydrolysis, clay can remain even after soluble ions leave.",
      "In contrast, hydrolysis can turn feldspar into clay that stays behind as a solid residue."
    ], "Follow the products", "Compare dissolution of limestone with hydrolysis of feldspar.")
  ], ({mc, fill, write}) => {
    mc("application", "15.2", "A pale feldspar grain becomes soft clay while ions leave with groundwater. Which process best accounts for both products?",
      ["*Hydrolysis of the original feldspar", "Frost wedging along crystal faces", "Oxidation of an iron coating", "Dissolution of a calcite vein"], "Water dissolving calcite can carry calcium and bicarbonate away in solution. Water reacting with feldspar can carry ions away while leaving newly formed clay minerals behind.");
    mc("figure", "15.2", "Which observation in the grooved block best supports dissolution along preferred paths?",
      ["*Channels deepen along lines where water travels.", "The entire block darkens uniformly.", "A displaced layer crosses the block.", "The upper surface is covered by angular talus."], "Water can dissolve calcite along the same route repeatedly and deepen a groove.", figure("15.02.b2", "Assigned figure for section 15.2"));
    fill("recall", "15.2", "What geological term means “a reaction in which minerals interact with water and form new substances”?",
      ["hydrolysis"], "Slightly acidic water moving through limestone carries dissolved material away and leaves a wider opening.");
    write("explain", "15.2", "Compare dissolution of limestone with hydrolysis of feldspar.",
      "Water dissolving calcite can carry calcium and bicarbonate away in solution. Water reacting with feldspar can carry ions away while leaving newly formed clay minerals behind.", ["Identify transport in solution", "Identify a new solid mineral", "Relate both changes to water"], figure("15.02.b2", "Assigned figure for section 15.2"));
  });

  section(3, "Minerals and rock resistance", "Minerals and rock resistance", [
    group("Compare the grains", "15.03.a1", [figure("15.03.a1", "Sandstone with visible grains")], [
      term("Differential weathering", "unequal breakdown of materials exposed to similar conditions") + ".",
      "Quartz grains may survive after the cement holding a sandstone together breaks down."
    ], "Read the figure", "Calcite dissolves preferentially along wetted openings and exposed surfaces."),
    group("Trace the residue", "15.03.a2", [figure("15.03.a2", "Pitted limestone surface")], [
      term("Cement", "mineral material that binds sediment grains together") + ".",
      "Quartz is relatively resistant to chemical attack near the surface. Sandstone can release intact quartz grains when its cement fails. Closely spaced fractures also allow weathering to penetrate a rock mass more thoroughly.",
      "A granite rich in feldspar can instead develop clay as its crystals react with water."
    ], "Compare components", "Predict how quartz-rich sandstone and feldspar-rich granite may differ after weathering.")
  ], ({mc, fill, write}) => {
    mc("application", "15.3", "Two sandstones contain similar quartz grains. One crumbles when its calcite cement dissolves. Why do the grains survive?",
      ["*The cement and the grains differ in chemical resistance.", "The grains weather faster than the calcite cement.", "The cement changes into quartz during dissolution.", "The grains were shielded from water by open pores."], "Loss of cement can release resistant quartz grains from sandstone. Feldspar in granite can undergo hydrolysis and yield clay, while quartz in that granite can remain as sand.");
    mc("figure", "15.3", "Which mechanism can produce pits on the limestone surface in this photo?",
      ["*Selective dissolution by water", "Deposition of windblown quartz", "Compaction of loose gravel", "Rotation along a curved rupture"], "Calcite dissolves preferentially along wetted openings and exposed surfaces.", figure("15.03.a2", "Assigned figure for section 15.3"));
    fill("recall", "15.3", "What geological term means “unequal breakdown of materials exposed to similar conditions”?",
      ["differential weathering"], "Quartz grains may survive after the cement holding a sandstone together breaks down.");
    write("explain", "15.3", "Predict how quartz-rich sandstone and feldspar-rich granite may differ after weathering.",
      "Loss of cement can release resistant quartz grains from sandstone. Feldspar in granite can undergo hydrolysis and yield clay, while quartz in that granite can remain as sand.", ["Distinguish grains from cement", "Describe a resistant residue", "Describe production of clay"], figure("15.03.a2", "Assigned figure for section 15.3"));
  });

  section(4, "Climate, slope, and exposure time", "Climate, slope, and exposure time", [
    group("Supply water and heat", "15.04.a1", [figure("15.04.a1", "Climate and depth-of-weathering comparison")], [
      term("Regolith", "loose material overlying coherent bedrock") + ".",
      "Warm, wet conditions generally accelerate chemical reactions when the mineral and exposure time are similar."
    ], "Read the figure", "Heat and available moisture jointly affect chemical weathering."),
    group("Track what remains", "15.04.b1", [figure("15.04.b1", "Relief and contrasting slopes in a single landscape")], [
      term("Residence time", "the time material remains at a site before removal") + ".",
      "Soil thickness reflects both production and removal. Vegetation can break rock with roots and supply organic acids while holding loose grains on the slope. Compare surfaces of similar age before attributing a difference solely to climate.",
      "A steep slope can lose weathered material faster than a gentle surface, leaving a thinner cover despite ongoing weathering."
    ], "Control the comparison", "Explain how a wet mountainside can have less regolith than a gentler slope.")
  ], ({mc, fill, write}) => {
    mc("application", "15.4", "Which comparison best isolates the effect of climate on chemical weathering?",
      ["*Similar granite and slope age in humid and dry settings", "Granite on a young cliff and shale on an old plain", "Young limestone and old sandstone in one valley", "Forest soil on an old fan and bare rock on a new slide"], "Warmth and moisture can promote weathering on the mountainside. Runoff and mass movement may remove the products as fast as they form. A gentler slope can retain a thicker cover even with a lower rate of production.");
    mc("figure", "15.4", "Which pair of variables should be read together to interpret the weathering-depth pattern in the graph?",
      ["*Temperature and precipitation", "River width and discharge", "Slope length and aspect", "Latitude and grain size"], "Heat and available moisture jointly affect chemical weathering.", figure("15.04.a1", "Assigned figure for section 15.4"));
    fill("recall", "15.4", "What geological term means “loose material overlying coherent bedrock”?",
      ["regolith"], "Warm, wet conditions generally accelerate chemical reactions when the mineral and exposure time are similar.");
    write("explain", "15.4", "Explain how a wet mountainside can have less regolith than a gentler slope.",
      "Warmth and moisture can promote weathering on the mountainside. Runoff and mass movement may remove the products as fast as they form. A gentler slope can retain a thicker cover even with a lower rate of production.", ["Identify a weathering influence", "Identify material removal", "Compare rates of production and loss"], figure("15.04.a1", "Assigned figure for section 15.4"));
  });

  section(5, "Reading spheroidal weathering", "Reading spheroidal weathering", [
    group("Start with a joint block", "15.05.a1", [figure("15.05.a1", "Angular joint-bounded starting block")], [
      term("Spheroidal weathering", "preferential rounding of a joint-bounded block as weathering advances inward") + ".",
      "Water reaches a corner from three directions, an edge from two, and a flat face from one."
    ], "Read the figure", "Corners are exposed on three sides and retreat faster than planar faces."),
    group("Follow the rounding", "15.05.a3", [figure("15.05.a3", "Rounded remnant of a weathered block")], [
      term("A weathering rind", "an altered outer zone around a less weathered rock core") + ".",
      "A rind is altered rock around a less altered core. Look for continuous joints, surviving angular corners, curved shells, and rounded cores. Rounded rock still attached to bedrock can record weathering in place without tumbling in a river.",
      "As the corners retreat faster than the faces, a rounded core can form while the block is still in place."
    ], "Compare the two stages", "A jointed outcrop has angular blocks beside rounded cores with concentric rinds. Explain the original shape and the relative stage of alteration.")
  ], ({mc, fill, write}) => {
    mc("application", "15.5", "Which observation best supports in-place rounding of an originally angular block?",
      ["*Curved weathering shells lie inside an intersecting joint network.", "Smooth pebbles occur in cross-bedded channel gravel.", "Rounded cobbles are imbricated on a point bar.", "Polished clasts cover a modern high-energy beach."], "Intersecting joints first outlined angular blocks. Water attacked corners from three sides and edges from two, so these retreated faster than faces. A rounded residual core with curved weathering shells records more rounding than a block that still retains its joint corners.");
    mc("figure", "15.5", "Which part of the original angular block retreated farthest relative to the center?",
      ["*Its corners", "The centers of its faces", "Its entire volume equally", "Only the lower face"], "Corners are exposed on three sides and retreat faster than planar faces.", figure("15.05.a1", "Assigned figure for section 15.5"));
    fill("recall", "15.5", "What geological term means “preferential rounding of a joint-bounded block as weathering advances inward”?",
      ["spheroidal weathering"], "Water reaches a corner from three directions, an edge from two, and a flat face from one.");
    write("explain", "15.5", "A jointed outcrop has angular blocks beside rounded cores with concentric rinds. Explain the original shape and the relative stage of alteration.",
      "Intersecting joints first outlined angular blocks. Water attacked corners from three sides and edges from two, so these retreated faster than faces. A rounded residual core with curved weathering shells records more rounding than a block that still retains its joint corners.", ["Infer an angular joint-bounded block", "Compare corner and face exposure", "Use rind and core geometry as evidence"], figure("15.05.a1", "Assigned figure for section 15.5"));
    mc("outcrop-evidence", "15.5A–B", "At one outcrop, a nearly circular core has concentric shells. Nearby, blocks retain broad flat joint faces. Which claim is best supported?",
      ["*The core records more rounding in place.", "The blocks began as spheres of different sizes.", "The shells establish a period of river transport.", "The joint faces formed after the core rounded."],
      "Look for the original joint geometry and compare how much of each corner survives. A rind surrounds a remnant of the parent rock.");
  });

  section(6, "Caves and karst", "Caves and karst", [
    group("Enlarge an opening", "15.06.a1", [figure("15.06.a1", "Stages in limestone cave development")], [
      term("Karst", "terrain shaped by dissolution of soluble rock, often with subsurface drainage") + ".",
      "Water carrying dissolved carbon dioxide can dissolve limestone along a fracture and enlarge it into a passage."
    ], "Read the figure", "A surface depression can focus drainage into a connected subsurface passage."),
    group("Build a deposit", "15.06.c1", [figure("15.06.c1", "Surface depressions and an underground cavern")], [
      term("A stalagmite", "a mineral deposit growing upward from a cave floor") + ".",
      "A sinkhole can form by dissolution at the surface or collapse into an opening. In an air-filled cave a stalactite grows down from a ceiling, and a stalagmite grows up from the floor. A lava tube forms when liquid lava drains from a solidifying crust. In a karst landscape, streams can disappear into sinks and return at springs. Trace the underground route as well as the surface slope.",
      "When water loses carbon dioxide inside an air-filled cave, calcite can precipitate and build a deposit beneath a drip."
    ], "Follow the calcium", "Explain how groundwater can remove limestone at one location and deposit calcite at another.")
  ], ({mc, fill, write}) => {
    mc("application", "15.6", "A cave has passages along bedding and calcite deposits below drips. Which sequence fits?",
      ["*Dissolution opens the passage, then precipitation builds deposits.", "Precipitation opens the passage, then dissolution builds deposits.", "Cooling lava opens the passage, then frost makes the deposits.", "Collapse opens every passage, then clay forms the dripstone."], "Slightly acidic groundwater dissolves calcite from limestone along fractures. Dissolved calcium and bicarbonate travel with the water. When a drip loses carbon dioxide in a cave, calcite can precipitate.");
    mc("figure", "15.6", "Which feature in the cutaway could route surface runoff underground?",
      ["*A sinkhole connected to an opening", "A stalactite projecting from the ceiling", "A stalagmite rising from the floor", "A column joining two dripstone deposits"], "A surface depression can focus drainage into a connected subsurface passage.", figure("15.06.a1", "Assigned figure for section 15.6"));
    fill("recall", "15.6", "What geological term means “terrain shaped by dissolution of soluble rock, often with subsurface drainage”?",
      ["karst"], "Water carrying dissolved carbon dioxide can dissolve limestone along a fracture and enlarge it into a passage.");
    write("explain", "15.6", "Explain how groundwater can remove limestone at one location and deposit calcite at another.",
      "Slightly acidic groundwater dissolves calcite from limestone along fractures. Dissolved calcium and bicarbonate travel with the water. When a drip loses carbon dioxide in a cave, calcite can precipitate.", ["Describe dissolution", "Identify transport in solution", "Explain precipitation at a drip"], figure("15.06.a1", "Assigned figure for section 15.6"));
  });

  section(7, "Karst landscapes and disappearing streams", "Karst landscapes and disappearing streams", [
    group("Trace the water", "Weathering lectures:Nov 17, lines 83–91", [img("15.06.c1", "Karst terrain and underground openings", "Exploring Geology · 15.06.c1")], [
      term("Karst", "terrain shaped by dissolution of soluble rock") + ".",
      "Weakly acidic water enlarges fractures in limestone. When a stream encounters a sinkhole connected to those passages, its flow can leave the surface. A sparse network of surface streams can therefore coexist with abundant rainfall."
    ], "Check your reasoning", "Follow a drop from a surface depression into a connected passage.", ["Connect assessment 15:question 11"]),
    group("Read the relief", "Weathering lectures:Nov 17, lines 83–91", [img("15.06.a1", "Water pathways in limestone", "Exploring Geology · 15.06.a1")], [
      term("Tower karst", "a landscape with steep residual hills rising above more deeply dissolved terrain") + ".",
      "Prolonged dissolution in humid tropical settings can lower the ground around resistant remnants, leaving steep knobs, pillars and towers. Soluble evaporites can also develop karst. The drainage route and the material being dissolved both matter."
    ], "Check your reasoning", "Look for the rock that remains between enlarged openings.", ["Connect assessment 15:question 11"])
  ], ({mc, fill, match, write}) => {
    mc("interpret", "Weathering lectures:Nov 17, lines 83–91", "A stream in a rainy limestone basin ends at a closed depression. Where is its water most likely to go?",
      ["*Into connected passages beneath the depression", "Over the ridge into the next surface valley", "Into a lake sealed from the bedrock", "Back uphill along the tributary network"], "Dissolution can open a connected route from a sinkhole to underground drainage.", img("15.06.c1", "Karst terrain and underground openings", "Exploring Geology · 15.06.c1"), ["Connect assessment 15:question 11"]);
    mc("apply", "Weathering lectures:Nov 17, lines 83–91", "Which setting best explains steep residual limestone towers in the lecture example?",
      ["*Prolonged dissolution in a humid tropical setting", "Abrasion beneath a continental ice sheet", "Wind erosion in a polar desert", "Deposition along a dry mountain front"], "Dissolution can widen openings and lower the surrounding surface while steep remnants persist.", img("15.06.c1", "Karst terrain and underground openings", "Exploring Geology · 15.06.c1"), ["Connect assessment 15:question 11"]);
    fill("recall", "Weathering lectures:Nov 17, lines 83–91", "Which term describes terrain shaped by dissolution of soluble rock?",
      ["karst"], "Weakly acidic water enlarges fractures in limestone. When a stream encounters a sinkhole connected to those passages, its flow can leave the surface. A sparse network of surface streams can therefore coexist with abundant rainfall.", ["Connect assessment 15:question 11"]);
    match("bank", "Weathering lectures:Nov 17, lines 83–91", "Match each observation to the corresponding geological term.",
      [["Surface opening captures a stream", "Sinkhole"], ["Water follows enlarged fractures", "Underground drainage"], ["Steep residual limestone hill", "Karst tower"]], "Prolonged dissolution in humid tropical settings can lower the ground around resistant remnants, leaving steep knobs, pillars and towers. Soluble evaporites can also develop karst. The drainage route and the material being dissolved both matter.", img("15.06.c1", "Karst terrain and underground openings", "Exploring Geology · 15.06.c1"), ["Connect assessment 15:question 11"]);
    write("explain", "Weathering lectures:Nov 17, lines 83–91", "Explain how a rainy limestone landscape can have both disappearing streams and steep isolated hills.",
      "Water dissolves limestone along fractures and can divert streams underground through sinkholes. Uneven surface lowering leaves residual limestone hills.", ["Link water and soluble rock", "Trace the disappearing stream underground", "Explain why residual hills remain"], img("15.06.c1", "Karst terrain and underground openings", "Exploring Geology · 15.06.c1"), ["Connect assessment 15:question 11"]);
  });

  section(8, "Soil horizons and climate", "Soil horizons and climate", [
    group("Trace water downward", "15.08.a2", [figure("15.08.a2", "Soil profile above bedrock")], [
      term("A soil horizon", "a layer distinguished by its composition, texture, or soil-forming processes") + ".",
      "Water entering the soil carries dissolved substances and fine particles away from upper layers."
    ], "Read the figure", "Loss above and enrichment below are complementary evidence for translocation."),
    group("Find the accumulation", "15.08.c2", [figure("15.08.c2", "A strongly weathered soil profile")], [
      term("Leaching", "removal of soluble constituents as water passes through soil") + ".",
      "Read a profile from the surface down. O is organic litter, A is mineral topsoil mixed with organic matter, E is a leached zone, B commonly accumulates transferred material, and C is weakly altered parent material. A given profile can lack one or more horizons. Strong leaching in a warm, wet profile can leave iron and aluminum oxides. In an arid profile, less flushing and strong evaporation can allow calcium carbonate or salts to accumulate.",
      "Some of that material collects deeper in the soil, creating a horizon with a different color or texture."
    ], "Read the profile", "Explain the relationship between a leached E horizon and an underlying B horizon.")
  ], ({mc, fill, write, match}) => {
    mc("application", "15.8", "A pale mineral layer overlies a clay-rich reddish layer. Which interpretation best links them?",
      ["*Material was leached from above and accumulated below.", "Fresh litter accumulated beneath unaltered parent rock.", "The deeper horizon lost all material to the upper one.", "Both layers consist exclusively of decomposed litter."], "Percolating water removes fine clay or dissolved constituents from the E horizon. Some material is deposited lower in the profile, enriching the B horizon. The resulting difference may be visible as a paler layer above a more strongly colored one.");
    mc("figure", "15.8", "Which profile observation best indicates downward transfer within the soil?",
      ["*A leached layer over an enriched subsoil", "Organic litter at the surface", "Fresh bedrock at the base", "Grass stems above the profile"], "Loss above and enrichment below are complementary evidence for translocation.", figure("15.08.a2", "Assigned figure for section 15.8"));
    fill("recall", "15.8", "What geological term means “a layer distinguished by its composition, texture, or soil-forming processes”?",
      ["soil horizon", "a soil horizon"], "Water entering the soil carries dissolved substances and fine particles away from upper layers.");
    write("explain", "15.8", "Explain the relationship between a leached E horizon and an underlying B horizon.",
      "Percolating water removes fine clay or dissolved constituents from the E horizon. Some material is deposited lower in the profile, enriching the B horizon. The resulting difference may be visible as a paler layer above a more strongly colored one.", ["Identify eluviation from above", "Identify accumulation below", "Give a possible mobile constituent"], figure("15.08.a2", "Assigned figure for section 15.8"));
    match("connect-bank", "15.8", "Identify the five numbered soil horizons.",
      [["1", "O horizon"], ["2", "A horizon"], ["3", "E horizon"], ["4", "B horizon"], ["5", "C horizon"]], "Follow the leaders from the surface to the underlying parent material.",
      img("bank-15.8", "Numbered course diagram", "Connect · question 2"), [connect + ":question 2"]);
  });

  section(9, "Soil, vegetation, and land use", "Soil, vegetation, and land use", [
    group("Cover the ground", "15.09.a1", [figure("15.09.a1", "Rows of plants growing on cultivated soil")], [
      term("Topsoil", "the near-surface mineral soil commonly enriched in organic matter") + ".",
      "Roots hold soil in place while leaves and litter soften the impact of falling rain."
    ], "Read the figure", "Cover reduces raindrop impact and slows runoff before it concentrates."),
    group("Remove the cover", "15.09.a2", [figure("15.09.a2", "Erosion channels in exposed soil")], [
      term("Salinization", "accumulation of soluble salts in soil") + ".",
      "Removing vegetation can reduce organic inputs and expose particles to splash, runoff, and wind. In poorly drained irrigated fields, evaporation can also concentrate dissolved salts near the surface. Some clay-rich soils expand when wet and shrink when dry. Repeated volume changes can crack foundations even on a nearly level site.",
      "When the same slope is stripped, concentrated runoff can cut channels through topsoil faster than new soil forms."
    ], "Track the water", "Compare the effect of stripping vegetation with the effect of irrigating a poorly drained arid field.")
  ], ({mc, fill, write}) => {
    mc("application", "15.9", "A field in a dry basin develops a salt crust after repeated irrigation. Which change would most directly reduce its cause?",
      ["*Improve drainage so dissolved salts can leave the root zone.", "Increase evaporation from the exposed soil surface.", "Compact the subsoil to restrict downward water movement.", "Remove litter so more water evaporates at the surface."], "Removing vegetation exposes topsoil to splash and runoff. Irrigation adds dissolved salts with the water. Where drainage is inadequate, evaporation removes water while salts accumulate.");
    mc("figure", "15.9", "Which action would most directly limit the rills visible in the exposed field?",
      ["*Keep protective vegetation or residue on the surface.", "Increase the length of bare downslope furrows.", "Drain runoff into a single unprotected furrow.", "Remove organic matter from the upper soil."], "Cover reduces raindrop impact and slows runoff before it concentrates.", figure("15.09.a2", "Assigned figure for section 15.9"));
    fill("recall", "15.9", "What geological term means “the near-surface mineral soil commonly enriched in organic matter”?",
      ["topsoil"], "Roots hold soil in place while leaves and litter soften the impact of falling rain.");
    write("explain", "15.9", "Compare the effect of stripping vegetation with the effect of irrigating a poorly drained arid field.",
      "Removing vegetation exposes topsoil to splash and runoff. Irrigation adds dissolved salts with the water. Where drainage is inadequate, evaporation removes water while salts accumulate.", ["Link bare ground to erosion", "Identify dissolved salts in water", "Connect evaporation and poor drainage to accumulation"], figure("15.09.a2", "Assigned figure for section 15.9"));
  });

  section(10, "Forces on a slope", "Forces on a slope", [
    group("Resolve the weight", "15.10.a1", [figure("15.10.a1", "Weight resolved on a block resting on a slope")], [
      term("The angle of repose", "the steepest stable angle for a loose material under given conditions") + ".",
      "On a steeper surface, a larger component of a block's weight acts parallel to the slope."
    ], "Read the figure", "The downslope component is parallel to the potential sliding surface."),
    group("Reduce resistance", "15.10.b1", [figure("15.10.b1", "A loose sand pile at its stable angle")], [
      term("Pore pressure", "the pressure of fluid in the spaces between grains") + ".",
      "Gravity acts vertically. Its component parallel to a slope drives movement, while friction and cohesion resist it. Adding water can increase weight and pore pressure. Excavating the toe can remove support even if the upper slope is unchanged. A small amount of water can help damp sand stand steeply through capillary attraction. Saturation and elevated pore pressure can instead weaken a slope.",
      "Water pressure in pores can reduce the contact force between grains, allowing the same slope to fail."
    ], "Separate force from resistance", "Explain why both steepening a slope and saturating it may promote failure.")
  ], ({mc, fill, write}) => {
    mc("application", "15.10", "Why might a previously stable hillside slide after several days of rain?",
      ["*Higher pore pressure reduces effective contact between grains.", "Rain reduces the downslope component of gravity to zero.", "Saturated sediment gains enough friction to detach uphill.", "Infiltration removes the weight of water from the slope."], "Steepening increases the share of weight acting along the slope relative to the normal component. Friction and cohesion resist that motion. Increased pore-water pressure reduces effective contact between grains and can lower resistance enough for sliding.");
    mc("figure", "15.10", "Which arrow direction represents the force component driving the block downhill?",
      ["*Parallel to the inclined surface", "Perpendicular into the inclined surface", "Horizontally into the upper hillside", "Vertically away from the ground"], "The downslope component is parallel to the potential sliding surface.", figure("15.10.a1", "Assigned figure for section 15.10"));
    fill("recall", "15.10", "What geological term means “the steepest stable angle for a loose material under given conditions”?",
      ["angle of repose", "the angle of repose"], "On a steeper surface, a larger component of a block's weight acts parallel to the slope.");
    write("explain", "15.10", "Explain why both steepening a slope and saturating it may promote failure.",
      "Steepening increases the share of weight acting along the slope relative to the normal component. Friction and cohesion resist that motion. Increased pore-water pressure reduces effective contact between grains and can lower resistance enough for sliding.", ["Identify downslope driving force", "Explain the role of resistance", "Connect saturation with pore pressure"], figure("15.10.a1", "Assigned figure for section 15.10"));
  });

  section(11, "Classifying slope failures", "Classifying slope failures", [
    group("Locate the rupture", "15.11.a1", [figure("15.11.a1", "Blocks fallen beneath a jointed cliff")], [
      term("Mass wasting", "downslope movement of Earth material under gravity") + ".",
      "A slide carries a mass across a distinct surface, often leaving a steep scarp near its head."
    ], "Read the figure", "Open joints isolate blocks that can detach and fall from a cliff."),
    group("Track internal movement", "15.11.a2", [figure("15.11.a2", "A tongue of debris beneath mountain slopes")], [
      term("A head scarp", "a steep face exposed near the upper end of a slope failure") + ".",
      "Classify both the material and the manner of movement. A fall leaves a steep face and travels through air. A slide moves across a rupture surface. A flow deforms internally. Speed alone cannot reliably distinguish all three.",
      "In a flow, neighboring pieces change positions throughout the moving material."
    ], "Classify the motion", "Explain how to distinguish a slide from a flow in a field photograph or diagram.")
  ], ({mc, fill, write, match}) => {
    mc("application", "15.11", "A hillside moves rapidly but trees on one block retain their spacing above a discrete rupture. Which movement fits best?",
      ["*A slide of a relatively coherent mass", "A flow with grains mixing throughout", "Creep distributed over many decades", "A fall through open air from a cliff"], "A slide has a distinct rupture surface and may carry coherent blocks with their original structure intact. A flow mixes and deforms internally as it moves. Look for displaced blocks versus a lobate body of churned debris.");
    mc("figure", "15.11", "Which observation in the cliff photo favors rockfall at the source?",
      ["*Detached angular blocks below a steep rock face", "A continuous terrace capped by gravel", "An oxbow lake on a broad plain", "A soil horizon parallel to the surface"], "Open joints isolate blocks that can detach and fall from a cliff.", figure("15.11.a1", "Assigned figure for section 15.11"));
    fill("recall", "15.11", "What geological term means “downslope movement of Earth material under gravity”?",
      ["mass wasting"], "A slide carries a mass across a distinct surface, often leaving a steep scarp near its head.");
    write("explain", "15.11", "Explain how to distinguish a slide from a flow in a field photograph or diagram.",
      "A slide has a distinct rupture surface and may carry coherent blocks with their original structure intact. A flow mixes and deforms internally as it moves. Look for displaced blocks versus a lobate body of churned debris.", ["Locate a possible rupture surface", "Assess coherence of displaced material", "Identify evidence of internal deformation"], figure("15.11.a1", "Assigned figure for section 15.11"));
    match("connect-bank", "15.11", "Classify each numbered slope movement.",
      [["1", "Rock fall"], ["2", "Rock slide"], ["3", "Rotational slide (slump)"], ["4", "Creep"], ["5", "Debris flow"]], "Distinguish a falling block, a translating block, a rotating mass, slow soil movement, and mobile mixed debris.",
      img("bank-15.11", "Numbered course diagram", "Connect · question 4"), [connect + ":question 4"]);
  });

  section(12, "Falls, rockslides, and slumps", "Falls, rockslides, and slumps", [
    group("Trace a planar slide", "15.12.a1", [figure("15.12.a1", "Block diagram of a cliff shedding rock")], [
      term("A slump", "a slide with rotation along a curved failure surface") + ".",
      "A slab can move along a bedding plane that dips out of a hillside."
    ], "Read the figure", "Sliding follows a rupture surface, while detached falling rock can travel through air."),
    group("Trace a slump", "15.12.a3", [figure("15.12.a3", "Blocks sliding on an inclined slope")], [
      term("Talus", "rock fragments accumulated below a steep slope or cliff") + ".",
      "An oversteepened cliff can shed blocks that bounce and accumulate as talus. On a planar rupture, a coherent slab translates. On a curved rupture, displaced ground can tilt back toward the head scarp.",
      "When the rupture surface curves, blocks rotate as they descend and may tilt backward near the head."
    ], "Trace the rupture", "Compare a planar rockslide with a rotational slump.")
  ], ({mc, fill, write}) => {
    mc("application", "15.12", "A displaced bench tilts toward its head scarp and the base of the failed mass bulges. Which geometry fits?",
      ["*Rotation along a concave-up rupture", "Translation along a planar bedding surface", "Free fall from a vertical overhang", "Gradual wash of individual sand grains"], "A slab on a planar rupture translates downslope with relatively little rotation. A slump moves across a curved rupture. Its upper blocks rotate and may tilt back toward the head.");
    mc("figure", "15.12", "How does the movement of the blocks shown here differ from a rockfall?",
      ["*More of the mass stays in contact with a sliding surface.", "More of the moving rock travels freely through the air.", "All of the displaced material remains suspended in water.", "All of the material moves by slow grain-by-grain creep."], "Sliding follows a rupture surface, while detached falling rock can travel through air.", figure("15.12.a3", "Assigned figure for section 15.12"));
    fill("recall", "15.12", "What geological term means “a slide with rotation along a curved failure surface”?",
      ["slump", "a slump"], "A slab can move along a bedding plane that dips out of a hillside.");
    write("explain", "15.12", "Compare a planar rockslide with a rotational slump.",
      "A slab on a planar rupture translates downslope with relatively little rotation. A slump moves across a curved rupture. Its upper blocks rotate and may tilt back toward the head.", ["Describe both rupture shapes", "Relate translation to planar sliding", "Relate back-tilting to rotation"], figure("15.12.a3", "Assigned figure for section 15.12"));
  });

  section(13, "Creep and rapid flows", "Creep and rapid flows", [
    group("Follow slow creep", "15.13.a1", [figure("15.13.a1", "Slope with shallow gradual downslope movement")], [
      term("Creep", "slow, persistent downslope displacement of soil or regolith") + ".",
      "Small repeated displacements move soil downhill and can tilt posts over many years."
    ], "Read the figure", "Gradual displacement requires a stable reference and observations separated in time."),
    group("Follow a debris flow", "15.13.a12", [figure("15.13.a12", "Classification of slope movements")], [
      term("Solifluction", "slow downslope flow of saturated soil or regolith") + ".",
      "Repeated expansion and settling can shift grains downhill by small increments. Solifluction involves slow flow of saturated ground, commonly above frozen or impermeable material. A debris flow can carry a poorly sorted mixture through a confined channel.",
      "During intense runoff, a mixture of mud, gravel, and boulders can surge rapidly through a narrow channel."
    ], "Use movement evidence", "Distinguish creep from debris flow using a field clue and a transport mechanism for each.")
  ], ({mc, fill, write}) => {
    mc("application", "15.13", "Which field evidence most strongly favors sustained creep?",
      ["*Several generations of tilted posts and curved tree trunks", "A fresh steep scarp and a single rotated intact block", "A boulder levee beside a newly scoured channel", "A talus cone below a freshly detached rock face"], "Creep moves regolith in small increments over long periods, gradually tilting posts. In a debris flow, water and poorly sorted material surge through a channel and can leave boulder-rich levees or a lobate deposit.");
    mc("figure", "15.13", "What field measurement would best detect the slow movement represented in the first panel?",
      ["*Repeat precise surveys of shallow markers against stable bedrock.", "Record a single estimate of peak flood discharge.", "Measure the fall time of a detached cliff block.", "Count boulders on a bar after a single storm."], "Gradual displacement requires a stable reference and observations separated in time.", figure("15.13.a1", "Assigned figure for section 15.13"));
    fill("recall", "15.13", "What geological term means “slow, persistent downslope displacement of soil or regolith”?",
      ["creep"], "Small repeated displacements move soil downhill and can tilt posts over many years.");
    write("explain", "15.13", "Distinguish creep from debris flow using a field clue and a transport mechanism for each.",
      "Creep moves regolith in small increments over long periods, gradually tilting posts. In a debris flow, water and poorly sorted material surge through a channel and can leave boulder-rich levees or a lobate deposit.", ["Describe long-term small displacements", "Describe rapid movement of mixed debris", "Connect each process with a diagnostic observation"], figure("15.13.a1", "Assigned figure for section 15.13"));
  });

  section(14, "Reading landslide hazard maps", "Reading landslide hazard maps", [
    group("Locate steep relief", "15.14.a1", [figure("15.14.a1", "Alaskan rock debris on a glacier")], [
      term("Susceptibility", "how favorable the terrain and material are for slope failure") + ".",
      "In Alaska, earthquake shaking released rock from steep mountain slopes onto the glacier below."
    ], "Read the figure", "Risk depends on exposure as well as susceptibility to failure."),
    group("Compare the trigger", "15.14.b1", [figure("15.14.b1", "Regional landslide susceptibility in the United States")], [
      term("A trigger", "an event that initiates failure on a susceptible slope") + ".",
      "Steep relief, weak strata, earlier failures, and stream undercutting can raise susceptibility. A trigger initiates a particular event. The Denali earthquake illustrates how shaking can mobilize already susceptible slopes.",
      "In another mountain belt, prolonged rain can raise pore pressure until a slope fails without an earthquake."
    ], "Separate setting and trigger", "Use the Denali example to distinguish a susceptible slope from a trigger.")
  ], ({mc, fill, write}) => {
    mc("application", "15.14", "Two sites receive the same rainfall. Which has the stronger geologic warning signs?",
      ["*Steep undercut terrain with old slide scarps", "A broad divide on gently dipping competent rock", "A flat terrace well outside the runout path", "A level upland with intact unfractured bedrock"], "Steep mountain relief made the Denali slopes susceptible. Earthquake shaking provided the trigger. Detached rock then descended across the glacier beneath the slopes.");
    mc("figure", "15.14", "What additional information is needed to convert the map into an estimate of risk to people?",
      ["*Locations of people and structures in potential paths", "The nationwide mean slope angle", "The color used for each susceptibility category", "The length of state boundaries in mountain belts"], "Risk depends on exposure as well as susceptibility to failure.", figure("15.14.b1", "Assigned figure for section 15.14"));
    fill("recall", "15.14", "What geological term means “how favorable the terrain and material are for slope failure”?",
      ["susceptibility"], "In Alaska, earthquake shaking released rock from steep mountain slopes onto the glacier below.");
    write("explain", "15.14", "Use the Denali example to distinguish a susceptible slope from a trigger.",
      "Steep mountain relief made the Denali slopes susceptible. Earthquake shaking provided the trigger. Detached rock then descended across the glacier beneath the slopes.", ["Identify steep relief", "Identify earthquake shaking", "Explain how both contribute"], figure("15.14.b1", "Assigned figure for section 15.14"));
  });

  section(15, "Recognizing past failures and testing for movement", "Recognizing past failures and testing for movement", [
    group("Locate the source", "Weathering lectures:Nov 17, lines 151–155", [img("slide-scarp", "Numbered landslide block diagram", "Connect assessment 15 · Q16")], [
      term("A head scarp", "a steep break where displaced material pulled away from the slope") + ".",
      "Start at the uphill edge of the displaced mass. A fresh break, displaced blocks and hummocky ground are clues to earlier movement. At the downslope end, the advancing material may override the old surface."
    ], "Check your reasoning", "Trace the movement arrow back to the break in the hillside.", ["Connect assessment 15:questions 16 and 19"]),
    group("Test the inference", "Weathering lectures:Nov 17, lines 151–155", [img("15.16.a3", "Mapped active and older landslide material", "Exploring Geology · 15.16.a3")], [
      term("Susceptibility", "the tendency of a slope to fail under a given set of conditions") + ".",
      "Compare the suspect slope with nearby slopes. Check its steepness, material and whether fractures or bedding dip out of the hillside. A scarp records past movement. Repeated measurements relative to stable ground test whether the mass is moving today."
    ], "Check your reasoning", "Choose a stable reference outside the moving material.", ["Connect assessment 15:questions 16 and 19"])
  ], ({mc, fill, match, write}) => {
    mc("interpret", "Weathering lectures:Nov 17, lines 151–155", "Which numbered location marks where the block separated from the upper slope?",
      ["*1", "2", "4", "5"], "Location 1 is the exposed face at the head. Location 4 is the downslope front.", img("slide-scarp", "Numbered landslide block diagram", "Connect assessment 15 · Q16"), ["Connect assessment 15:questions 16 and 19"]);
    mc("apply", "Weathering lectures:Nov 17, lines 151–155", "Which result provides direct evidence that a mapped landslide is moving this season?",
      ["*Markers shift relative to stable bedrock between surveys", "A single aerial image shows hummocky ground", "An old scarp cuts across the hillside", "Bedding planes dip toward the valley"], "Measured displacement over a known interval establishes movement during that interval.", img("slide-scarp", "Numbered landslide block diagram", "Connect assessment 15 · Q16"), ["Connect assessment 15:questions 16 and 19"]);
    fill("recall", "Weathering lectures:Nov 17, lines 151–155", "Which term describes a steep break where displaced material pulled away from the slope?",
      ["head scarp", "a head scarp"], "Start at the uphill edge of the displaced mass. A fresh break, displaced blocks and hummocky ground are clues to earlier movement. At the downslope end, the advancing material may override the old surface.", ["Connect assessment 15:questions 16 and 19"]);
    match("bank", "Weathering lectures:Nov 17, lines 151–155", "Identify the five numbered features of the slide.",
      [["1", "Head scarp"], ["2", "Fractures in the sliding block"], ["3", "Intact layers below the slide"], ["4", "Front of the slide"], ["5", "Valley in front of the slide"]], "Compare the suspect slope with nearby slopes. Check its steepness, material and whether fractures or bedding dip out of the hillside. A scarp records past movement. Repeated measurements relative to stable ground test whether the mass is moving today.", img("slide-scarp", "Numbered landslide block diagram", "Connect assessment 15 · Q16"), ["Connect assessment 15:questions 16 and 19"]);
    write("explain", "Weathering lectures:Nov 17, lines 151–155", "A road crosses hummocky ground below a scarp. Explain what these features suggest and how to test whether movement continues.",
      "The scarp and uneven displaced material suggest an earlier failure. Survey markers on the mass against stable ground outside it and compare their positions through time.", ["Identify evidence of earlier failure", "Select an external reference", "Use repeated observations"], img("slide-scarp", "Numbered landslide block diagram", "Connect assessment 15 · Q16"), ["Connect assessment 15:questions 16 and 19"]);
  });

  section(16, "The Slumgullion earthflow", "The Slumgullion earthflow", [
    group("Separate old and active ground", "15.16.a1", [figure("15.16.a1", "Slumgullion deposit and the blocked valley")], [
      term("An earthflow", "downslope flow of earth material that deforms internally") + ".",
      "At Slumgullion, an active earthflow occupies part of a much larger, older landslide deposit."
    ], "Read the figure", "A landslide can obstruct the valley and impound water on its upstream side."),
    group("Track relative movement", "15.16.a3", [figure("15.16.a3", "Map of active and inactive parts of the slide")], [
      term("An active slide", "a landslide undergoing movement during the observation period") + ".",
      "The older Slumgullion deposit dammed the Lake Fork and formed Lake San Cristobal. Compare the older deposit with the active tongue. Offset markers and repeated position measurements can distinguish active ground from an inherited landform.",
      "Repeated surveys show which parts move fastest and where deformation is concentrated."
    ], "Test for movement", "Explain how geologists could distinguish current movement from evidence of an older failure.")
  ], ({mc, fill, write}) => {
    mc("application", "15.16", "Which evidence best identifies the currently moving portion of an old landslide?",
      ["*Survey markers shift relative to stable points over time.", "A lake occupies the upstream valley behind the deposit.", "Weathered fragments occur at the end of the old deposit.", "An old scarp stands high above the valley floor."], "Place survey markers across the suspected flow and tie their positions to stable ground outside it. Repeated displacement identifies active zones. A scarp or a deposit shape by itself can record an older event.");
    mc("figure", "15.16", "What pattern supports landslide damming in the terrain view?",
      ["*Ponded water upstream of a deposit crossing the valley", "Ponded water on a ridge above all deposits", "A channel that follows the crest of a divide", "A lake entirely below the deposit with no upstream water"], "A landslide can obstruct the valley and impound water on its upstream side.", figure("15.16.a1", "Assigned figure for section 15.16"));
    fill("recall", "15.16", "What geological term means “downslope flow of earth material that deforms internally”?",
      ["earthflow", "an earthflow"], "At Slumgullion, an active earthflow occupies part of a much larger, older landslide deposit.");
    write("explain", "15.16", "Explain how geologists could distinguish current movement from evidence of an older failure.",
      "Place survey markers across the suspected flow and tie their positions to stable ground outside it. Repeated displacement identifies active zones. A scarp or a deposit shape by itself can record an older event.", ["Choose stable reference points", "Compare positions over time", "Distinguish a landform from measured motion"], figure("15.16.a1", "Assigned figure for section 15.16"));
  });

  section(17, "Slope hazard investigation", "Slope hazard investigation", [
    group("Identify the source", "15.17.a1", [figure("15.17.a1", "Investigation terrain with cliffs, slopes, and a valley floor")], [
      term("Runout", "the distance or area reached by moving debris beyond its source") + ".",
      "Look upslope for steep, fractured ground or a scarp left by an earlier failure."
    ], "Read the figure", "Runout follows connected downslope paths and can extend onto flatter ground."),
    group("Trace the path", "15.17.a1", [figure("15.17.a1", "Terrain used to trace potential paths toward development")], [
      term("Exposure", "the presence of people or structures within reach of a hazard") + ".",
      "A flat site may sit below an unstable bluff or on a fan at a canyon mouth. Trace a plausible route from source to site. Hazard describes the physical event, while risk also depends on who or what occupies its path.",
      "Follow the downhill route to see whether a road or building lies within reach of the moving debris."
    ], "Trace source to site", "Compare a site beneath a scarp with a site across a drainage divide.")
  ], ({mc, fill, write}) => {
    mc("application", "15.17", "Which pair of observations should weigh most heavily in siting a house below a slope?",
      ["*An old head scarp and a continuous runout path to the lot", "The lot’s flat surface and a clear view of the ridge", "The absence of rockfall during one dry afternoon", "The distance to the nearest town and its elevation"], "The scarp identifies a possible source. Follow the downhill path from it to see whether it reaches the site. A drainage divide can separate a second site from that runout path even at similar distance.");
    mc("figure", "15.17", "Which part of the terrain is exposed to debris arriving from a steep tributary?",
      ["*The valley floor at the tributary mouth", "The crest of a neighboring divide", "A high spur across a separate basin", "The summit above the source area"], "Runout follows connected downslope paths and can extend onto flatter ground.", figure("15.17.a1", "Assigned figure for section 15.17"));
    fill("recall", "15.17", "What geological term means “the distance or area reached by moving debris beyond its source”?",
      ["runout"], "Look upslope for steep, fractured ground or a scarp left by an earlier failure.");
    write("explain", "15.17", "Compare a site beneath a scarp with a site across a drainage divide.",
      "The scarp identifies a possible source. Follow the downhill path from it to see whether it reaches the site. A drainage divide can separate a second site from that runout path even at similar distance.", ["Identify the potential source", "Trace downhill connectivity", "Explain differing exposure"], figure("15.17.a1", "Assigned figure for section 15.17"));
  });
})(window.L);
