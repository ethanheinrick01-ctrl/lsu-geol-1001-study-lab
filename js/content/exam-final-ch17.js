/* GEOL 1001 · Final Exam Learn · Chapter 17 */
(function (L) {
  'use strict';
  const {chapter, group, term} = L.FINAL_STUDY;
  const text = "Textbook 17", connect = "Connect 17";
  L.SOURCES[text] = {t: "Exploring Geology · Chapter 17", f: 'Assigned textbook', tier: 2, unit: 'figure or section'};
  L.SOURCES[connect] = {t: "Chapter 17 Connect practice", f: 'Course exercise figures', tier: 2, unit: 'exercise'};
  L.SOURCES["Class discussion Nov 24"] = {t: 'November 24 class discussion', f: 'Lecture transcript', tier: 2, unit: 'lines'};
  const {section, img} = chapter(17, {
    name: "Ch 17 · Water Resources", short: 'Ch 17',
    coverage: 'Introduction and sections 17.1–17.11',
    evidence: "Assigned textbook, Connect exercises, and the November 24 groundwater lecture. Lecture references identify matches to the discussion.",
    sourceNote: "Numbered figures cite the assigned textbook and Connect. Discussion-to-figure matches are provisional until the slides are available."
  }, (n, loc) => [loc.includes(':') ? loc : text + ':' + loc]);

  section(0, "The Snake River Plain", "The Snake River Plain", [
    group("Follow the Snake River", "17.00.a1", [img("17.00.a1", "Follow the Snake River", "Exploring Geology · Fig. 17.00.a1")], [
      term("Drainage basin", "the area contributing water to a common outlet") + ".",
      "Snowmelt from the surrounding mountains supplies the Snake River as it crosses the lower basalt plain.",
      "A river seen in a dry part of the plain can carry runoff from wetter mountains far upstream. Surface drainage and groundwater can therefore supply the same river from different places."
    ], "Read the figure", "Follow the low ground from the mountain margin into the plain.", ["Class discussion Nov 24:83–123"]),
    group("Find the canyon springs", "17.00.a3", [img("17.00.a3", "Find the canyon springs", "Exploring Geology · Fig. 17.00.a3")], [
      term("Spring", "a place where groundwater emerges at the land surface") + ".",
      "Water moving through the basalt can reach a canyon wall and emerge as springs above the river.",
      "The canyon exposes permeable basalt above the channel. Where groundwater paths intersect that face, springs can sustain streamflow between storms."
    ], "Read the figure", "Find where water leaves the rock face before it reaches the main channel.", ["Class discussion Nov 24:83–123"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.0", "Which observation best explains persistent flow during a dry summer on the plain?",
      ["*Snowmelt and springs continue to feed the channel.", "A flat valley floor makes river water evaporate more slowly than it flows.", "Water falling on the valley floor is its only source.", "Basalt prevents a river from exchanging water with groundwater."],
      "Snowmelt runs off the mountains into tributaries. Some water infiltrates and travels through basalt before emerging at canyon springs, adding groundwater to streamflow.", undefined);
    mc("figure", "17.00.a3", "What evidence in the canyon photograph indicates groundwater discharge?",
      ["*Water issues from the canyon wall above the river.", "The main river curves toward the horizon.", "The distant plateau has little local relief.", "The river occupies the bottom of a valley."],
      "Water moving through the basalt can reach a canyon wall and emerge as springs above the river. The canyon exposes permeable basalt above the channel. Where groundwater paths intersect that face, springs can sustain streamflow between storms.", img("17.00.a3", "Find the canyon springs", "Exploring Geology · Fig. 17.00.a3"));
    fill("recall", "17.0", "What term describes the area contributing water to a common outlet?", ["drainage basin", "a drainage basin", "an drainage basin"], "Snowmelt from the surrounding mountains supplies the Snake River as it crosses the lower basalt plain.");
    write("explain", "17.0", "Explain how mountain snow and permeable basalt can supply the same river during dry weather.",
      "Snowmelt runs off the mountains into tributaries. Some water infiltrates and travels through basalt before emerging at canyon springs, adding groundwater to streamflow.", ["Trace surface runoff", "Trace infiltration and groundwater flow", "Identify spring discharge"], img("17.00.a1", "Follow the Snake River", "Exploring Geology · Fig. 17.00.a1"));
  });

  section(1, "Earth’s water reservoirs and transfers", "Earth’s water reservoirs and transfers", [
    group("Compare the three columns", "17.01.a2", [img("17.01.a2", "Compare the three columns", "Exploring Geology · Fig. 17.01.a2")], [
      term("Reservoir", "a place where water is stored") + ".",
      "Each column changes the total being compared, from all water on Earth to fresh water and then to fresh surface water.",
      "The first column counts all water. The second divides fresh water, and the third divides fresh surface water. A tall segment in the third column can represent a small share of the original total."
    ], "Read the figure", "State the denominator before comparing two segments.", ["Class discussion Nov 24:223–297"]),
    group("Follow a drop through the cycle", "17.01.b1", [img("17.01.b1", "Follow a drop through the cycle", "Exploring Geology · Fig. 17.01.b1"), img("reservoirs", "Numbered locations · reservoirs", "Connect · Chapter 17 · assignment Q1"), img("water-cycle", "Numbered locations · water cycle", "Connect · Chapter 17 · assignment Q2")], [
      term("Infiltration", "the entry of surface water into the ground") + ".",
      "After moisture falls on land, some water runs into streams while some enters the ground through connected openings.",
      "Evaporation transfers liquid water to the atmosphere. Condensation produces cloud droplets or ice. Precipitation returns water to land or ocean, and infiltration routes some of it below ground."
    ], "Read the figure", "Trace a route from the ocean to the aquifer with each change of reservoir.", ["Class discussion Nov 24:223–297", "Connect 17:assignment Q1", "Connect 17:assignment Q2"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.1", "A lake accounts for most of the third column. Why can it still account for very little of Earth’s total water?",
      ["*The third column represents only fresh surface water.", "The first column excludes water stored in the oceans.", "The middle column includes only the water in rivers.", "The three columns show the same total at different dates."],
      "Ocean water evaporates. The vapor condenses, precipitation falls on land, and some of that water infiltrates and percolates to the saturated zone.", undefined);
    mc("figure", "17.01.b1", "In the water-cycle block diagram, which process carries rainfall across the ground surface into the subsurface?",
      ["*Infiltration", "Evaporation", "Condensation", "Surface runoff"],
      "After moisture falls on land, some water runs into streams while some enters the ground through connected openings. Evaporation transfers liquid water to the atmosphere. Condensation produces cloud droplets or ice. Precipitation returns water to land or ocean, and infiltration routes some of it below ground.", img("17.01.b1", "Follow a drop through the cycle", "Exploring Geology · Fig. 17.01.b1"));
    fill("recall", "17.1", "What term describes a place where water is stored?", ["reservoir", "a reservoir", "an reservoir"], "Each column changes the total being compared, from all water on Earth to fresh water and then to fresh surface water.");
    match("reservoirs", "Connect 17:assignment Q1", "Assign all eight reservoirs to the numbered parts of the nested water columns.",
      [["Location 1", "Freshwater"], ["Location 2", "Surface and other water"], ["Location 3", "Rivers"], ["Location 4", "Groundwater"], ["Location 5", "Saline water (oceans)"], ["Location 6", "Swamps and wetlands"], ["Location 7", "Lakes"], ["Location 8", "Ice caps and glaciers"]], "Read the base of each column first. Ocean water dominates the global total, ice dominates the freshwater column, and lakes dominate the surface freshwater column.", img("reservoirs", "Numbered locations · reservoirs", "Connect · Chapter 17 · assignment Q1"));
    match("water-cycle", "Connect 17:assignment Q2", "Place each process and each accompanying description in its numbered box.",
      [["Location 1", "Condensation"], ["Location 2", "Water vapor cools and becomes liquid or solid"], ["Location 3", "Precipitation"], ["Location 4", "Infiltration"], ["Location 5", "Water enters fractures and pores in the ground"], ["Location 6", "Evaporation"], ["Location 7", "Liquid water gains energy and escapes as vapor"]], "Read the cloud, the downward rain, and the ground surface in sequence. The two pathways that rise from wet surfaces represent evaporation.", img("water-cycle", "Numbered locations · water cycle", "Connect · Chapter 17 · assignment Q2"));
    write("explain", "17.1", "Trace ocean water into a groundwater reservoir through the atmosphere.",
      "Ocean water evaporates. The vapor condenses, precipitation falls on land, and some of that water infiltrates and percolates to the saturated zone.", ["Identify evaporation", "Connect condensation and precipitation", "Trace recharge"], img("17.01.a2", "Compare the three columns", "Exploring Geology · Fig. 17.01.a2"));
  });

  section(2, "Freshwater withdrawals and consumption", "Freshwater withdrawals and consumption", [
    group("Track water delivered to a field", "17.02.a3", [img("17.02.a3", "Track water delivered to a field", "Exploring Geology · Fig. 17.02.a3")], [
      term("Withdrawal", "water taken from a surface or underground source for use") + ".",
      "An irrigation pump withdraws water, but only the portion that leaves the local supply counts as consumptive use.",
      "Irrigation can transfer water to the atmosphere through evaporation and plant transpiration. A withdrawal measurement alone does not tell you how much was returned to a basin."
    ], "Read the figure", "Account for both return flow and water lost from the immediate supply.", ["Class discussion Nov 24:301–353"]),
    group("Follow water through a dam", "17.02.b4", [img("17.02.b4", "Follow water through a dam", "Exploring Geology · Fig. 17.02.b4")], [
      term("Instream use", "a use that depends on water remaining in its channel") + ".",
      "Water released through a dam can generate electricity and continue downstream, where it is available for other uses.",
      "Water can perform work while flowing through a channel or dam. Cooling withdrawals at a power plant and flow through a hydroelectric turbine are different uses."
    ], "Read the figure", "Identify whether water is diverted and where it goes afterward.", ["Class discussion Nov 24:301–353"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.2", "Two farms withdraw equal volumes. Which farm consumes more water from the local supply?",
      ["*The farm with less return flow and greater evapotranspiration.", "The farm that measures flow nearest the pump.", "The farm with the shorter delivery pipe.", "The farm closer to the stream outlet."],
      "A diversion withdraws water for irrigation. Water that evaporates or transpires is consumed locally, while some can return. Water passing through a hydroelectric turbine can continue downstream.", undefined);
    mc("figure", "17.02.b4", "In the dam photograph, which observation explains why turbine flow can serve another downstream user?",
      ["*Released water continues through the downstream channel.", "The structure stores all released water in concrete.", "Turbines change the water into water vapor.", "The structure permanently isolates the reservoir from the channel."],
      "Water released through a dam can generate electricity and continue downstream, where it is available for other uses. Water can perform work while flowing through a channel or dam. Cooling withdrawals at a power plant and flow through a hydroelectric turbine are different uses.", img("17.02.b4", "Follow water through a dam", "Exploring Geology · Fig. 17.02.b4"));
    fill("recall", "17.2", "What term describes water taken from a surface or underground source for use?", ["withdrawal", "a withdrawal", "an withdrawal"], "An irrigation pump withdraws water, but only the portion that leaves the local supply counts as consumptive use.");
    write("explain", "17.2", "Distinguish withdrawal, consumption, and instream use with an irrigation and a dam example.",
      "A diversion withdraws water for irrigation. Water that evaporates or transpires is consumed locally, while some can return. Water passing through a hydroelectric turbine can continue downstream.", ["Identify diversion", "Explain consumptive loss", "Explain instream or downstream use"], img("17.02.a3", "Track water delivered to a field", "Exploring Geology · Fig. 17.02.a3"));
  });

  section(3, "Pore space and groundwater", "Pore space and groundwater", [
    group("Find the space between grains", "17.03.c1", [img("17.03.c1", "Find the space between grains", "Exploring Geology · Fig. 17.03.c1")], [
      term("Porosity", "the proportion of a material occupied by openings") + ".",
      "Even tightly packed round grains leave space between them where groundwater can be stored.",
      "Openings between grains, fractures in rock, and solution cavities can store groundwater. Below the water table, connected openings are saturated. Above it, pores may contain both air and water."
    ], "Read the figure", "Separate storage volume from the ability to transmit water.", ["Class discussion Nov 24:379–605"]),
    group("Test which openings connect", "17.03.c2", [img("17.03.c2", "Test which openings connect", "Exploring Geology · Fig. 17.03.c2"), img("rock-properties", "Numbered locations · rock properties", "Connect · Chapter 17 · assignment Q3")], [
      term("Permeability", "the ability of a material to transmit fluid through connected openings") + ".",
      "When fine grains fill the gaps between larger grains, they narrow the paths through which water can flow.",
      "Fine particles can block connections between larger pores. Fractured rock can transmit water readily even when the intact rock between fractures has little pore space."
    ], "Read the figure", "Trace a continuous route rather than counting isolated openings.", ["Class discussion Nov 24:379–605", "Connect 17:assignment Q3"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.3", "Two samples have similar total pore volume. Why can one transmit water much more slowly?",
      ["*Its pore spaces communicate through narrower or fewer connections.", "Its grains occupy exactly the same fraction of the sample.", "Its pores are entirely filled with water during the test.", "Its total pore volume remains constant during the test."],
      "Connected fractures provide flow paths through otherwise dense granite. Clay can store water in tiny pores whose narrow connections transmit it slowly.", undefined);
    mc("figure", "17.03.c2", "Compare the two grain containers. What effect does adding fine material between the large grains have?",
      ["*It fills open space and can restrict flow paths.", "It enlarges all of the passages between large grains.", "It separates the large grains into an open framework.", "It converts intergranular pores into bedrock fractures."],
      "When fine grains fill the gaps between larger grains, they narrow the paths through which water can flow. Fine particles can block connections between larger pores. Fractured rock can transmit water readily even when the intact rock between fractures has little pore space.", img("17.03.c2", "Test which openings connect", "Exploring Geology · Fig. 17.03.c2"));
    fill("recall", "17.3", "What term describes the proportion of a material occupied by openings?", ["porosity", "a porosity", "an porosity"], "Even tightly packed round grains leave space between them where groundwater can be stored.");
    match("rock-properties", "Connect 17:assignment Q3", "Match each specimen to its combination of pore space and permeability.",
      [["Location 1", "High porosity and high permeability"], ["Location 2", "High porosity with small pores and low permeability"], ["Location 3", "High porosity with large pores and low permeability"], ["Location 4", "Low porosity and low permeability"]], "Connected pores in coarse sediment transmit water. Tiny pores in mudrock and poorly connected cavities can store water while restricting its flow. Intact crystalline rock has little pore space.", img("rock-properties", "Numbered locations · rock properties", "Connect · Chapter 17 · assignment Q3"));
    write("explain", "17.3", "Explain how fractured granite can yield water while a porous clay bed yields little.",
      "Connected fractures provide flow paths through otherwise dense granite. Clay can store water in tiny pores whose narrow connections transmit it slowly.", ["Distinguish storage from flow", "Identify fracture connectivity", "Explain slow flow in clay"], img("17.03.c1", "Find the space between grains", "Exploring Geology · Fig. 17.03.c1"));
  });

  section(4, "Groundwater flow and aquifers", "Groundwater flow and aquifers", [
    group("Locate the groundwater divide", "17.04.a1", [img("17.04.a1", "Locate the groundwater divide", "Exploring Geology · Fig. 17.04.a1"), img("valley-flow", "Numbered groundwater-flow cross section beneath two valleys", "Connect · Chapter 17 · assessment Q8")], [
      term("Hydraulic gradient", "the change in hydraulic head per unit distance along a flow path") + ".",
      "Under the ridge, the water table stands higher than it does in the valleys, so shallow groundwater flows away on either side.",
      "Near an unconfined water table, groundwater commonly moves from recharge areas beneath uplands toward lower-head valleys. At greater depth, the vertical component of flow can also matter."
    ], "Read the figure", "Infer direction from differences in head, not the dip of a rock layer alone.", ["Class discussion Nov 24:627–775"]),
    group("Trace the confined layer", "17.04.c1", [img("17.04.c1", "Trace the confined layer", "Exploring Geology · Fig. 17.04.c1"), img("well-types", "Numbered locations · well types", "Connect · Chapter 17 · assignment Q5"), img("head-and-flow", "Numbered locations · head and flow", "Connect · Chapter 17 · assignment Q4")], [
      term("Aquitard", "a layer that transmits groundwater slowly and can restrict flow between aquifers") + ".",
      "Follow the permeable layer under the confining bed, where water can move laterally even though vertical flow is restricted.",
      "An unconfined aquifer has a water table as its upper surface. A confined aquifer lies beneath a low-permeability layer. Water in a well tapping the confined unit can rise above its roof."
    ], "Read the figure", "Trace the permeable unit before deciding which wells access it.", ["Class discussion Nov 24:627–775", "Connect 17:assignment Q5", "Connect 17:assignment Q4"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.4", "An observation well on a ridge and one near a stream tap the same unconfined aquifer. Which information best establishes flow direction?",
      ["*Water-level elevations measured relative to a common datum.", "Depth to water measured below each wellhead without its elevation.", "The difference in the two wells’ casing diameters.", "The direction in which the local sedimentary beds dip."],
      "A permeable saturated bed has connected openings. Hydraulic-head differences drive water along it, while an adjoining aquitard restricts flow across the layer.", undefined);
    mc("figure", "17.04.c1", "What feature in the section restricts exchange between the upper and lower water-bearing units?",
      ["*The intervening low-permeability bed.", "The highest point on the ground surface.", "The vertical wall of the figure block.", "The direction of the rainfall arrows."],
      "Follow the permeable layer under the confining bed, where water can move laterally even though vertical flow is restricted. An unconfined aquifer has a water table as its upper surface. A confined aquifer lies beneath a low-permeability layer. Water in a well tapping the confined unit can rise above its roof.", img("17.04.c1", "Trace the confined layer", "Exploring Geology · Fig. 17.04.c1"));
    fill("recall", "17.4", "What term describes the change in hydraulic head per unit distance along a flow path?", ["hydraulic gradient", "a hydraulic gradient", "an hydraulic gradient"], "Under the ridge, the water table stands higher than it does in the valleys, so shallow groundwater flows away on either side.");
    match("well-types", "Connect 17:assignment Q5", "Classify each numbered well configuration using the complete bank.",
      [["Location 1", "Well into an unconfined aquifer"], ["Location 2", "Dry well"], ["Location 3", "One well is into a perched aquifer"], ["Location 4", "Well into an artesian aquifer"]], "Compare the bottom of the well with the saturated layers. A perched saturated zone lies above the main one, and water rises in a well tapping a confined unit under pressure.", img("well-types", "Numbered locations · well types", "Connect · Chapter 17 · assignment Q5"));
    match("head-and-flow", "Connect 17:assignment Q4", "Assuming the material is uniform, match the four flow relationships to their numbered positions.",
      [["Location 1", "Fastest flow at the steepest gradient"], ["Location 2", "Groundwater enters on one side and leaves on the other"], ["Location 3", "Groundwater feeds the low area from both sides"], ["Location 4", "Groundwater flows in opposite directions away from the divide"]], "Compare water-table slopes and the relative heads on each side of the two valleys. The broad high in the water table sends shallow water in opposite directions.", img("head-and-flow", "Numbered locations · head and flow", "Connect · Chapter 17 · assignment Q4"));
    mc("valley-flow", "Connect 17:assessment Q8", "Compare the sites numbered 1 and 4. What would make water travel faster at site 1 if the aquifer material is uniform?",
      ["*The water table has a steeper local slope there.", "A larger number is printed near the second valley.", "The valley on the right contains a longer stream.", "The recharge area receives light from the left."],
      "For the same hydraulic conductivity and effective porosity, a steeper gradient increases groundwater velocity. Both the groundwater arrows and the slope help identify the contrast.", img("valley-flow", "Numbered groundwater-flow cross section beneath two valleys", "Connect · Chapter 17 · assessment Q8"));
    write("explain", "17.4", "Explain why an aquifer can carry water laterally below a layer that greatly restricts vertical flow.",
      "A permeable saturated bed has connected openings. Hydraulic-head differences drive water along it, while an adjoining aquitard restricts flow across the layer.", ["Identify the permeable bed", "Use hydraulic head", "Explain the aquitard"], img("17.04.a1", "Locate the groundwater divide", "Exploring Geology · Fig. 17.04.a1"));
  });

  section(5, "Springs, lakes, and streams", "Springs, lakes, and streams", [
    group("Follow the spring outlet", "17.05.b1", [img("17.05.b1", "Follow the spring outlet", "Exploring Geology · Fig. 17.05.b1")], [
      term("Discharge", "the transfer of groundwater out of an aquifer") + ".",
      "Water travels through openings in limestone until it meets the canyon wall and flows out as a spring.",
      "Where a permeable unit meets a much less permeable unit, groundwater may travel along their contact to a hillside. Cavities and fractures can also focus discharge into a spring."
    ], "Read the figure", "Identify both the pathway and the point where it meets the surface.", ["Class discussion Nov 24:793–955"]),
    group("Compare the lake levels", "17.05.c1", [img("17.05.c1", "Compare the lake levels", "Exploring Geology · Fig. 17.05.c1"), img("lake-exchange", "Numbered locations · lake exchange", "Connect · Chapter 17 · assignment Q6")], [
      term("Recharge", "the addition of water to an aquifer") + ".",
      "The upland lake loses water downward, while the low lake at the valley floor intersects the regional water table.",
      "A gaining stream receives groundwater where hydraulic head in the adjacent aquifer exceeds stream level. A losing stream sends water into its bed where that gradient reverses."
    ], "Read the figure", "Compare water levels on the two sides of a streambank.", ["Class discussion Nov 24:793–955", "Connect 17:assignment Q6"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.5", "How could a stream change from gaining to losing during pumping nearby?",
      ["*Groundwater head falls below stream level.", "The channel becomes straighter at a fixed gradient.", "The valley walls become steeper above the stream.", "Discharge is measured farther from the bank."],
      "A spring-fed reach receives groundwater moving from higher head in the aquifer to the stream. A losing reach has higher stream level than adjacent groundwater head, so water moves out through the bed.", undefined);
    mc("figure", "17.05.c1", "At the upland pond labeled 1 in the section, which arrows identify its exchange with the subsurface?",
      ["*Downward arrows from the pond into the underlying material.", "Arrows moving from the valley floor toward the clouds.", "Arrows rising from the regional aquifer into the pond.", "Horizontal arrows crossing only the pond surface."],
      "The upland lake loses water downward, while the low lake at the valley floor intersects the regional water table. A gaining stream receives groundwater where hydraulic head in the adjacent aquifer exceeds stream level. A losing stream sends water into its bed where that gradient reverses.", img("17.05.c1", "Compare the lake levels", "Exploring Geology · Fig. 17.05.c1"));
    fill("recall", "17.5", "What term describes the transfer of groundwater out of an aquifer?", ["discharge", "a discharge", "an discharge"], "Water travels through openings in limestone until it meets the canyon wall and flows out as a spring.");
    match("lake-exchange", "Connect 17:assignment Q6", "Which exchange pattern belongs at each numbered lake or wetland?",
      [["Location 1", "Perched water leaks downward to the water table"], ["Location 2", "Groundwater flows in on one side and out on the other"], ["Location 3", "Groundwater enters from both sides"], ["Location 4", "Low-permeability material limits flow beneath a perched water body"]], "Compare the pond with the regional water table. A low-permeability bed can support perched water, while a low-lying lake may receive groundwater from both slopes.", img("lake-exchange", "Numbered locations · lake exchange", "Connect · Chapter 17 · assignment Q6"));
    write("explain", "17.5", "Compare a spring-fed stream with a losing stream in terms of hydraulic head.",
      "A spring-fed reach receives groundwater moving from higher head in the aquifer to the stream. A losing reach has higher stream level than adjacent groundwater head, so water moves out through the bed.", ["Describe gaining flow", "Describe losing flow", "Use relative water levels"], img("17.05.b1", "Follow the spring outlet", "Exploring Geology · Fig. 17.05.b1"));
  });

  section(6, "Mapping groundwater from field evidence", "Mapping groundwater from field evidence", [
    group("Read material from a borehole", "17.06.a5", [img("17.06.a5", "Read material from a borehole", "Exploring Geology · Fig. 17.06.a5"), img("field-heads", "Water-level elevations at observation wells with a north arrow", "Connect · Chapter 17 · assessment Q12")], [
      term("Drill core", "a cylindrical sample that preserves the sequence of material in a borehole") + ".",
      "A drill core records which layers the hole crossed, including coarse beds that may transmit water more readily than clay.",
      "Geologic mapping identifies permeable units and barriers. A borehole reveals subsurface materials directly, but a single hole gives only a narrow sample of a heterogeneous aquifer."
    ], "Read the figure", "Combine material and water-level evidence from multiple locations.", ["Class discussion Nov 24:987–1145"]),
    group("Build the water-table map", "17.06.b1", [img("17.06.b1", "Build the water-table map", "Exploring Geology · Fig. 17.06.b1")], [
      term("Water-table contour", "a line joining points at the same water-table elevation") + ".",
      "Convert well measurements to elevations before drawing contours, then trace flow across the contours toward lower head.",
      "Subtract the measured depth to water from the elevation of the measuring point. On a water-table map, shallow flow generally crosses head contours toward lower values where properties are uniform."
    ], "Read the figure", "A shallow depth below a low wellhead can still mean a low hydraulic head.", ["Class discussion Nov 24:987–1145"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.6", "Well A has a measuring elevation of 140 m and water 24 m below it. Well B has a measuring elevation of 125 m and water 5 m below it. Which head is higher?",
      ["*Well B at 120 m.", "Well A at 140 m.", "Well A at 116 m.", "Well B at 125 m."],
      "Use a common elevation reference and subtract depths to find heads. Contour matching elevations. For a reasonably uniform aquifer, predict shallow flow across the contours toward lower head.", undefined);
    mc("figure", "17.06.b1", "What do the contour lines in the mapped well field allow you to estimate between observation points?",
      ["*Water-table elevations and their gradient.", "The exact depth of every impermeable bed.", "The chemical composition at each well.", "The precise age of each groundwater sample."],
      "Convert well measurements to elevations before drawing contours, then trace flow across the contours toward lower head. Subtract the measured depth to water from the elevation of the measuring point. On a water-table map, shallow flow generally crosses head contours toward lower values where properties are uniform.", img("17.06.b1", "Build the water-table map", "Exploring Geology · Fig. 17.06.b1"));
    fill("recall", "17.6", "What term describes a cylindrical sample that preserves the sequence of material in a borehole?", ["drill core", "a drill core", "an drill core"], "A drill core records which layers the hole crossed, including coarse beds that may transmit water more readily than clay.");
    mc("field-heads", "Connect 17:assessment Q12", "Across this well network, which regional head gradient is supported by the plotted elevations?",
      ["*From higher northern wells toward lower southern wells.", "From lower southern wells toward higher northern wells.", "From the village toward the farms at equal head.", "From every point toward the well marked 150."],
      "Head is about 140–150 in the northern part of the map and about 109–110 in the south. The elevation trend, together with the north arrow, gives the regional gradient.", img("field-heads", "Water-level elevations at observation wells with a north arrow", "Connect · Chapter 17 · assessment Q12"));
    write("explain", "17.6", "Explain how to turn well measurements into a prediction of groundwater flow.",
      "Use a common elevation reference and subtract depths to find heads. Contour matching elevations. For a reasonably uniform aquifer, predict shallow flow across the contours toward lower head.", ["Convert depths to head", "Construct contours", "Infer direction"], img("17.06.a5", "Read material from a borehole", "Exploring Geology · Fig. 17.06.a5"));
  });

  section(7, "Drawdown, subsidence, and saltwater intrusion", "Drawdown, subsidence, and saltwater intrusion", [
    group("Lower the water table", "17.07.a2", [img("17.07.a2", "Lower the water table", "Exploring Geology · Fig. 17.07.a2")], [
      term("Cone of depression", "a local lowering of hydraulic head around a pumping well") + ".",
      "Pumping draws the water table down most strongly near the well and redirects nearby groundwater toward it.",
      "A pumping well creates a gradient toward itself. Drawdown decreases outward. A nearby shallow well can stop supplying water when the local water table drops beneath its intake."
    ], "Read the figure", "Check the intake elevation against the lowered water table.", ["Class discussion Nov 24:1201–1287"]),
    group("Watch the coastal freshwater lens", "17.07.c2", [img("17.07.c2", "Watch the coastal freshwater lens", "Exploring Geology · Fig. 17.07.c2")], [
      term("Saltwater intrusion", "movement of saline water into a freshwater aquifer") + ".",
      "Near the coast, sustained pumping can reduce freshwater pressure and allow salt water to move inland toward wells.",
      "Removing water can compact compressible sediments and lower the land surface. Near a coast, saltwater intrusion presents a separate problem as the balance between fresh and saline groundwater changes."
    ], "Read the figure", "Distinguish falling land elevation from a change in groundwater salinity.", ["Class discussion Nov 24:1201–1287"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.7", "A water level recovers after pumping stops, but the land surface remains lower. What explains that combination?",
      ["*Some sediment compacted irreversibly as pore pressure fell.", "The cone of depression remains filled with open air.", "Returning water always expands the grains themselves.", "Saltwater can never reenter a coastal aquifer."],
      "Drawdown can lower head below a shallow well intake. At the coast, lowered freshwater pressure can draw salt water inland. Compaction and subsidence are another possible consequence in compressible material.", undefined);
    mc("figure", "17.07.c2", "What shift does the coastal panel associate with increased freshwater pumping?",
      ["*The fresh–salt boundary moves toward the pumping area.", "The boundary rises into the atmosphere over the sea.", "The shoreline advances because aquifer pressure rises.", "The freshwater layer thickens beneath the pumping well."],
      "Near the coast, sustained pumping can reduce freshwater pressure and allow salt water to move inland toward wells. Removing water can compact compressible sediments and lower the land surface. Near a coast, saltwater intrusion presents a separate problem as the balance between fresh and saline groundwater changes.", img("17.07.c2", "Watch the coastal freshwater lens", "Exploring Geology · Fig. 17.07.c2"));
    fill("recall", "17.7", "What term describes a local lowering of hydraulic head around a pumping well?", ["cone of depression", "a cone of depression", "an cone of depression"], "Pumping draws the water table down most strongly near the well and redirects nearby groundwater toward it.");
    write("explain", "17.7", "Explain two distinct problems that can follow prolonged groundwater withdrawal.",
      "Drawdown can lower head below a shallow well intake. At the coast, lowered freshwater pressure can draw salt water inland. Compaction and subsidence are another possible consequence in compressible material.", ["Relate pumping to lower head", "Describe one effect on wells", "Explain a second mechanism"], img("17.07.a2", "Lower the water table", "Exploring Geology · Fig. 17.07.a2"));
  });

  section(8, "Sources and paths of contamination", "Sources and paths of contamination", [
    group("Separate a source from its pathway", "17.08.a1", [img("17.08.a1", "Separate a source from its pathway", "Exploring Geology · Fig. 17.08.a1")], [
      term("Point source", "a discharge that can be traced to an identifiable location") + ".",
      "A leaking tank supplies a localized source, but the exposure risk depends on where water carries the dissolved material.",
      "Wastewater, mine drainage, fertilizers and naturally occurring dissolved substances can affect water quality. A single leak differs from diffuse contributions over a broad agricultural area."
    ], "Read the figure", "First locate possible inputs, then establish transport.", ["Class discussion Nov 24:1293–1331"]),
    group("Trace a dissolved release", "17.09.a1", [img("17.09.a1", "Trace a dissolved release", "Exploring Geology · Fig. 17.09.a1")], [
      term("Contaminant plume", "a zone of contaminated groundwater that extends away from a source") + ".",
      "A dissolved contaminant can spread along a groundwater flow path and reach some wells while missing others nearby.",
      "A supply well is exposed only if contaminated water enters its capture area. Two wells at similar distances from a source can sample different layers or opposite sides of the flow path."
    ], "Read the figure", "Compare depths and hydraulic connection as well as map distance.", ["Class discussion Nov 24:1293–1331"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.8", "Which observation best distinguishes a diffuse source from a single localized release?",
      ["*Similar runoff inputs enter from many cultivated fields.", "A visible pipe discharges at one mapped location.", "One tank leaks at a measured depth beneath a yard.", "A spring emerges at one known fracture intersection."],
      "The plume follows connected flow paths through an aquifer. A farther well can intercept the plume downgradient, while a close but upgradient well or a well in another layer can miss it.", undefined);
    mc("figure", "17.09.a1", "Which well location in a plume investigation most directly tests transport from a suspected source?",
      ["*A well downgradient in the affected water-bearing unit.", "The nearest uphill well regardless of its screen depth.", "A well across a continuous confining barrier.", "A shallow dry hole outside the mapped flow path."],
      "A dissolved contaminant can spread along a groundwater flow path and reach some wells while missing others nearby. A supply well is exposed only if contaminated water enters its capture area. Two wells at similar distances from a source can sample different layers or opposite sides of the flow path.", img("17.09.a1", "Trace a dissolved release", "Exploring Geology · Fig. 17.09.a1"));
    fill("recall", "17.8", "What term describes a discharge that can be traced to an identifiable location?", ["point source", "a point source", "an point source"], "A leaking tank supplies a localized source, but the exposure risk depends on where water carries the dissolved material.");
    write("explain", "17.8", "Explain why a nearby well can remain clean while a more distant well is affected.",
      "The plume follows connected flow paths through an aquifer. A farther well can intercept the plume downgradient, while a close but upgradient well or a well in another layer can miss it.", ["Identify connected pathways", "Use flow direction", "Compare well screens"], img("17.08.a1", "Separate a source from its pathway", "Exploring Geology · Fig. 17.08.a1"));
  });

  section(9, "Testing and cleaning a groundwater plume", "Testing and cleaning a groundwater plume", [
    group("Predict the plume direction", "17.09.a1", [img("17.09.a1", "Predict the plume direction", "Exploring Geology · Fig. 17.09.a1")], [
      term("Downgradient", "toward lower hydraulic head along a groundwater flow path") + ".",
      "Start at the release and follow groundwater flow to predict the plume, then use samples to test its boundaries.",
      "A map view can conceal vertical differences. Use upgradient samples as a baseline and downgradient samples at relevant depths to test plume extent. One clean sample does not delimit a three-dimensional plume."
    ], "Read the figure", "Predict where the next sample should differ if the interpretation is right.", ["Class discussion Nov 24:1333–1375"]),
    group("Follow capture and treatment", "17.09.c1", [img("17.09.c1", "Follow capture and treatment", "Exploring Geology · Fig. 17.09.c1")], [
      term("Pump and treat", "a cleanup method that extracts contaminated groundwater and treats it at the surface") + ".",
      "An extraction well can capture contaminated water, but continued monitoring is needed to see whether contamination persists.",
      "Removing a source stops new loading but may leave contaminant in groundwater or sediment. Recovery wells, treatment, containment, or monitored natural processes suit different cases."
    ], "Read the figure", "Distinguish stopping the release from addressing existing contamination.", ["Class discussion Nov 24:1333–1375"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.9", "A plume seems shorter after a new well samples clean water. What should you verify first?",
      ["*Whether its screened interval actually intersects the affected layer.", "Whether the nearest road runs parallel to the plume.", "Whether the well owner started sampling recently.", "Whether the clean well is the deepest well in the county."],
      "Sample an upgradient point and several downgradient points in the same aquifer. Compare screened depths and repeat sampling to determine whether the inferred limits persist.", undefined);
    mc("figure", "17.09.a1", "In the plume panels, what feature best predicts the long direction of the affected zone?",
      ["*Flow within the permeable material beneath the source.", "The alignment of the roof above the source.", "The direction of sunlight on the diagrams.", "The nearest edge of the block illustration."],
      "Start at the release and follow groundwater flow to predict the plume, then use samples to test its boundaries. A map view can conceal vertical differences. Use upgradient samples as a baseline and downgradient samples at relevant depths to test plume extent. One clean sample does not delimit a three-dimensional plume.", img("17.09.a1", "Predict the plume direction", "Exploring Geology · Fig. 17.09.a1"));
    fill("recall", "17.9", "What term describes toward lower hydraulic head along a groundwater flow path?", ["downgradient", "a downgradient", "an downgradient"], "Start at the release and follow groundwater flow to predict the plume, then use samples to test its boundaries.");
    write("explain", "17.9", "Design a sampling comparison that could distinguish background water quality from a plume.",
      "Sample an upgradient point and several downgradient points in the same aquifer. Compare screened depths and repeat sampling to determine whether the inferred limits persist.", ["Establish a baseline", "Include comparable depths", "Test the extent over time"], img("17.09.a1", "Predict the plume direction", "Exploring Geology · Fig. 17.09.a1"));
  });

  section(10, "Reading the Ogallala water budget", "Reading the Ogallala water budget", [
    group("Follow the saturated deposit", "17.10.a2", [img("17.10.a2", "Follow the saturated deposit", "Exploring Geology · Fig. 17.10.a2")], [
      term("Saturated thickness", "the vertical thickness of aquifer material filled with groundwater") + ".",
      "On the cross section, the usable saturated thickness depends on both the water table and the base of the aquifer.",
      "The High Plains aquifer varies in thickness. A water-table decline of the same size can remove a larger fraction of the saturated thickness where the deposit is thin."
    ], "Read the figure", "Compare the water table with the aquifer base.", ["Class discussion Nov 24:1383–1455"]),
    group("Balance recharge and pumping", "17.10.b2", [img("17.10.b2", "Balance recharge and pumping", "Exploring Geology · Fig. 17.10.b2")], [
      term("Groundwater overdraft", "withdrawal that exceeds long-term replenishment") + ".",
      "Compare the recharge bar with the much larger pumping loss, then look at the storage bar to see how the shortfall is met.",
      "In a water budget, recharge adds water and pumping removes it. A persistent imbalance can reduce storage. On the chapter graph, projected values represent a scenario, distinct from the historical observations."
    ], "Read the figure", "Read the signs and the time legend before comparing magnitudes.", ["Class discussion Nov 24:1383–1455"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.10", "Two areas experience the same drawdown. Where does it remove the larger fraction of usable saturated thickness?",
      ["*Where the original saturated interval was thinner.", "Where the land surface has the highest elevation.", "Where the county has the largest mapped area.", "Where the aquifer’s base is deepest in absolute elevation."],
      "A large starting volume can support continued withdrawals. If pumping consistently outpaces replenishment, wells draw on storage and the water table declines even while water is still available.", undefined);
    mc("figure", "17.10.b2", "On the budget graph, what does a large pumping loss alongside modest recharge help explain?",
      ["*A reduction in groundwater storage.", "A permanent increase in saturated thickness.", "A reversal of gravity-driven infiltration.", "A disappearance of fluctuations in well levels."],
      "Compare the recharge bar with the much larger pumping loss, then look at the storage bar to see how the shortfall is met. In a water budget, recharge adds water and pumping removes it. A persistent imbalance can reduce storage. On the chapter graph, projected values represent a scenario, distinct from the historical observations.", img("17.10.b2", "Balance recharge and pumping", "Exploring Geology · Fig. 17.10.b2"));
    fill("recall", "17.10", "What term describes the vertical thickness of aquifer material filled with groundwater?", ["saturated thickness", "a saturated thickness", "an saturated thickness"], "On the cross section, the usable saturated thickness depends on both the water table and the base of the aquifer.");
    write("explain", "17.10", "Explain why an aquifer can sustain irrigation for decades while losing stored water.",
      "A large starting volume can support continued withdrawals. If pumping consistently outpaces replenishment, wells draw on storage and the water table declines even while water is still available.", ["Identify stored water", "Compare withdrawals with recharge", "Predict the water-level trend"], img("17.10.a2", "Follow the saturated deposit", "Exploring Geology · Fig. 17.10.a2"));
  });

  section(11, "Tracing pollution in a watershed", "Tracing pollution in a watershed", [
    group("Bracket a possible source", "17.11.a1", [img("17.11.a1", "Bracket a possible source", "Exploring Geology · Fig. 17.11.a1")], [
      term("Upstream control", "a sampling point above a suspected input that establishes a comparison") + ".",
      "Compare stream samples above and below a tributary junction before assigning a change in water quality to a nearby facility.",
      "A facility upstream of a contaminated sample is one candidate among several. Tributary junctions allow paired samples to narrow the contributing reach. A clean tributary can also dilute a signal."
    ], "Read the figure", "Use the pattern across multiple sampling sites.", []),
    group("Check the subsurface connection", "17.11.a2", [img("17.11.a2", "Check the subsurface connection", "Exploring Geology · Fig. 17.11.a2")], [
      term("Stratigraphic column", "a vertical record of rock units in their relative order") + ".",
      "Use the rock column to ask whether a well and a suspected source connect through the same permeable layer.",
      "The stratigraphic column helps test whether a proposed route crosses a barrier or follows a connected unit. Both flow direction and chemical evidence are needed before attributing a release."
    ], "Read the figure", "Distinguish a plausible source from a demonstrated source.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "17.11", "Two tributaries meet above a polluted sample. Which next comparison best narrows the source?",
      ["*Sample each tributary immediately above their junction.", "Collect two more samples from the same mixed water.", "Choose the facility with the largest mapped footprint.", "Assume the nearest site downstream supplied the pollutant."],
      "Paired stream samples can isolate the reach where water quality changes. The rock column helps assess whether groundwater can travel between source and receptor through a connected layer. Additional samples can test that route.", undefined);
    mc("figure", "17.11.a1", "Which feature on the landscape lets you test one tributary separately before its water mixes?",
      ["*A sampling reach upstream of the confluence.", "A sampling reach below both industrial districts.", "The elevation of the coal plant roof.", "The total width of the main valley."],
      "Compare stream samples above and below a tributary junction before assigning a change in water quality to a nearby facility. A facility upstream of a contaminated sample is one candidate among several. Tributary junctions allow paired samples to narrow the contributing reach. A clean tributary can also dilute a signal.", img("17.11.a1", "Bracket a possible source", "Exploring Geology · Fig. 17.11.a1"));
    fill("recall", "17.11", "What term describes a sampling point above a suspected input that establishes a comparison?", ["upstream control", "a upstream control", "an upstream control"], "Compare stream samples above and below a tributary junction before assigning a change in water quality to a nearby facility.");
    write("explain", "17.11", "Explain how a stream map and a rock column can test different parts of a contamination hypothesis.",
      "Paired stream samples can isolate the reach where water quality changes. The rock column helps assess whether groundwater can travel between source and receptor through a connected layer. Additional samples can test that route.", ["Bracket the reach", "Assess subsurface continuity", "Require confirming samples"], img("17.11.a1", "Bracket a possible source", "Exploring Geology · Fig. 17.11.a1"));
  });

})(window.L);
