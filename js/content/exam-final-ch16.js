/* Final Exam Learn and figure practice. */
(function (L) {
  'use strict';
  const {chapter, group, term} = L.FINAL_STUDY;
  const text = 'Textbook 16', connect = 'Connect assignment 16';
  L.SOURCES[text] = {t: 'Exploring Geology · Chapter 16', f: 'Assigned textbook extracts', tier: 2, unit: 'section'};
  L.SOURCES[connect] = {t: 'Chapter 16 Connect assignment', f: 'Assignment figures', tier: 2, unit: 'question'};
  L.SOURCES['Connect assessment 16'] = {t: 'Chapter 16 Connect assessment', f: 'Assessment captures', tier: 2, unit: 'question'};
  const {section, img} = chapter(16, {
    name: 'Ch 16 · Streams and Flooding', short: 'Ch 16',
    coverage: 'Introduction and sections 16.1–16.17',
    evidence: 'Assigned textbook figures and Connect practice. The November 17 transcript ends at the introduction to streams.',
    sourceNote: 'Sections 2, 5 and 14 use the available lecture or Connect evidence. Their standalone textbook pages were absent from the packet.'
  }, (n, locator) => locator.includes(':') ? [locator] : [text + ':' + locator]);
  const figure = (id, description) => img(id, description, 'Exploring Geology · Fig. ' + id);

  section(0, "Reading the Yukon Delta", "Reading the Yukon Delta", [
    group("Find the river mouth", "16.00.a1", [figure("16.00.a1", "Satellite image of the Yukon Delta")], [
      term("A delta", "a sediment body built where a stream enters standing water") + ".",
      "At the Yukon coast, the river spreads into quieter receiving water and deposits part of its sediment load."
    ], "Read the figure", "Distributaries carry sediment from the main river toward several outlets."),
    group("Watch the shoreline", "16.00.a2", [figure("16.00.a2", "Yukon Delta location on the Alaskan coast")], [
      term("A distributary", "a channel that branches away from a main channel and carries part of its flow") + ".",
      "In the satellite view, branching channels carry water and sediment toward the Bering Sea. A pale plume shows sediment still in suspension offshore. Some sediment travels beyond the visible shoreline before settling.",
      "Where deposition exceeds removal by waves and currents, the delta can build outward into the sea."
    ], "Read the coast", "Explain how sediment eroded inland becomes new coastal land.")
  ], ({mc, fill, write}) => {
    mc("application", "16.0", "Which observation best supports active delta growth at a river mouth?",
      ["*Mouth bars accumulate and the shoreline advances over repeated surveys.", "A single offshore plume becomes briefly darker after a storm.", "A tributary erodes a deep channel far upstream from the mouth.", "The highest ridge in the drainage basin rises during uplift."], "Streams carry inland sediment to the coast. Water spreads and slows at the mouth, depositing some of its load. The delta advances where sediment accumulation outpaces removal by waves and currents.");
    mc("figure", "16.0", "Which channel pattern near the coast supports sediment distribution across the delta?",
      ["*Channels diverging toward multiple mouths", "Channels converging uphill at a divide", "One closed depression without an outlet", "A line of lakes crossing mountain crests"], "Distributaries carry sediment from the main river toward several outlets.", figure("16.00.a1", "Assigned figure for section 16.0"));
    fill("recall", "16.0", "What geological term means “a sediment body built where a stream enters standing water”?",
      ["delta", "a delta"], "At the Yukon coast, the river spreads into quieter receiving water and deposits part of its sediment load.");
    write("explain", "16.0", "Explain how sediment eroded inland becomes new coastal land.",
      "Streams carry inland sediment to the coast. Water spreads and slows at the mouth, depositing some of its load. The delta advances where sediment accumulation outpaces removal by waves and currents.", ["Trace sediment transport", "Identify loss of transport capacity", "Compare deposition with coastal removal"], figure("16.00.a1", "Assigned figure for section 16.0"));
  });

  section(1, "Drainage basins and divides", "Drainage basins and divides", [
    group("Trace the branches", "16.01.b1", [figure("16.01.b1", "Two adjacent drainage basins separated by high ground")], [
      term("A drainage basin", "the land area contributing runoff to a particular outlet") + ".",
      "Small tributaries join larger channels, combining runoff from separate parts of the landscape."
    ], "Read the figure", "A divide separates water routed to different outlets."),
    group("Find the divide", "16.01.d1", [figure("16.01.d1", "Branching drainage on a landscape")], [
      term("A drainage divide", "a topographic boundary separating land that drains toward different outlets") + ".",
      "A tributary joins another channel. Distributaries instead branch away from a main channel, commonly on a delta. Water can enter a stream through surface runoff or groundwater discharge, so a stream may continue flowing between storms.",
      "A ridge separates neighboring drainage basins, so rain on opposite sides can reach different outlets."
    ], "Trace a drop", "Explain how a ridge can separate the sources of two streams even when the streams are close together.")
  ], ({mc, fill, write}) => {
    mc("application", "16.1", "Rain falls just across a ridge from the stream below your camp. How can you tell whether that water feeds the stream?",
      ["*Trace the downhill route from the landing point to its outlet.", "Choose the closest channel in straight-line distance.", "Trace the contour line that crosses the nearest stream.", "Compare the widths of the two channels."], "The crest is a topographic divide. Runoff on one flank travels downslope to one channel and runoff on the opposite flank reaches a different channel. Distance to the channels alone does not determine the outlet.");
    mc("figure", "16.1", "Where would a runoff path switch from one colored basin to the other?",
      ["*Across the ridge separating the basins", "Across the mouth within either basin", "Across a tributary within the same basin", "Across the floodplain along one trunk stream"], "A divide separates water routed to different outlets.", figure("16.01.b1", "Assigned figure for section 16.1"));
    fill("recall", "16.1", "What geological term means “the land area contributing runoff to a particular outlet”?",
      ["drainage basin", "a drainage basin"], "Small tributaries join larger channels, combining runoff from separate parts of the landscape.");
    write("explain", "16.1", "Explain how a ridge can separate the sources of two streams even when the streams are close together.",
      "The crest is a topographic divide. Runoff on one flank travels downslope to one channel and runoff on the opposite flank reaches a different channel. Distance to the channels alone does not determine the outlet.", ["Locate the topographic divide", "Follow opposite downhill paths", "Identify the receiving outlets"], figure("16.01.b1", "Assigned figure for section 16.1"));
  });

  section(2, "Stream transport and channel abrasion", "Stream transport and channel abrasion", [
    group("Track contact", "Connect assignment 16:question 4", [img("stream-load", "Sediment paths within a stream", "Connect assignment 16 · Q4")], [
      term("Saltation", "transport in short hops that repeatedly return a grain to the bed") + ".",
      "Distinguish a sand grain repeatedly striking the bed from fine material held aloft in turbulent water. Both travel downstream, but the hopping grain belongs to the bed load. Dissolved ions travel with water without remaining discrete sediment grains."
    ], "Check your reasoning", "Watch whether a grain stays aloft or repeatedly touches down.", ["Connect assessment 16:question 5"]),
    group("Name both processes", "Connect assignment 16:question 4", [img("16.03.b1", "Particle size, velocity and transport", "Exploring Geology · 16.03.b1")], [
      term("Traction", "rolling or sliding of sediment in contact with the bed") + ".",
      "A moving pebble can roll along the bed while scouring the channel surface. The pebble is transported by traction. Wear of the surface it strikes is abrasion. Grain size and the strength of the current help determine which motion occurs."
    ], "Check your reasoning", "Describe what happens to the moving clast and what happens to the channel.", ["Connect assessment 16:question 5"])
  ], ({mc, fill, match, write}) => {
    mc("interpret", "Connect assignment 16:question 4", "Which path in the stream corresponds to saltation?",
      ["*A grain lifts from the bed and repeatedly lands downstream", "A pebble stays in contact with the bed as it rolls", "Fine silt remains dispersed in turbulent water", "Dissolved calcium moves with the water"], "Each hop ends with contact at the bed.", img("stream-load", "Sediment paths within a stream", "Connect assignment 16 · Q4"), ["Connect assessment 16:question 5"]);
    mc("apply", "Connect assignment 16:question 4", "A pebble rolls downstream and leaves scratches on bedrock. Which pair describes the pebble and the bedrock, in that order?",
      ["*Traction and abrasion", "Saltation and solution", "Suspension and traction", "Abrasion and suspension"], "Rolling is traction. Scraping of the channel surface is abrasion.", img("stream-load", "Sediment paths within a stream", "Connect assignment 16 · Q4"), ["Connect assessment 16:question 5"]);
    fill("recall", "Connect assignment 16:question 4", "Which term describes transport in short hops that repeatedly return a grain to the bed?",
      ["saltation"], "Distinguish a sand grain repeatedly striking the bed from fine material held aloft in turbulent water. Both travel downstream, but the hopping grain belongs to the bed load. Dissolved ions travel with water without remaining discrete sediment grains.", ["Connect assessment 16:question 5"]);
    match("bank", "Connect assignment 16:question 4", "Match each observation to the corresponding geological term.",
      [["Calcium ions traveling in water", "Dissolved load"], ["Silt held in the water column", "Suspended load"], ["Sand making short hops", "Saltation"], ["Gravel rolling along the bottom", "Traction"]], "A moving pebble can roll along the bed while scouring the channel surface. The pebble is transported by traction. Wear of the surface it strikes is abrasion. Grain size and the strength of the current help determine which motion occurs.", img("stream-load", "Sediment paths within a stream", "Connect assignment 16 · Q4"), ["Connect assessment 16:question 5"]);
    write("explain", "Connect assignment 16:question 4", "Compare two ways bed load moves and explain how it can erode the channel.",
      "Grains moving by saltation hop off the bed and land again. Traction keeps a rolling or sliding clast in contact with the bed. Impacts and scraping abrade the channel.", ["Describe saltation", "Describe traction", "Connect impacts or scraping to abrasion"], img("stream-load", "Sediment paths within a stream", "Connect assignment 16 · Q4"), ["Connect assessment 16:question 5"]);
  });

  section(3, "Changing flow and sediment transport", "Changing flow and sediment transport", [
    group("Raise the flow", "16.03.a3", [figure("16.03.a3", "Maximum sediment size along a stream system")], [
      term("Competence", "the largest particle size a flow can transport") + ".",
      "During a storm, higher flow can move coarser grains that normally rest on the bed."
    ], "Read the figure", "The plotted reach trends toward finer maximum sediment sizes downstream."),
    group("Follow the falling flow", "16.03.b1", [figure("16.03.b1", "Velocity and particle size for transport and deposition")], [
      term("Capacity", "the total sediment load a stream can transport under given conditions") + ".",
      "Capacity describes the total load a stream can carry. Bed load rolls, slides, or hops along the bottom. Suspended load is carried in the water column, whereas dissolved ions travel in solution. A flood can raise both competence and capacity.",
      "As the flood subsides, larger particles commonly settle before finer sediment leaves suspension."
    ], "Track a grain", "Compare the movement of a gravel clast and suspended silt as a storm recedes.")
  ], ({mc, fill, write, match}) => {
    mc("application", "16.3", "During a flood, cobbles that previously remained on the bed begin to move. Which change does that observation directly establish?",
      ["*An increase in competence", "A decrease in suspended load", "A decline in sediment supply", "A decrease in total discharge"], "A gravel clast rolls, slides, or hops along the bed and may stop as velocity declines. Fine silt can remain suspended in the water column longer. Under comparable conditions gravel settles or stops moving before much of the silt.");
    mc("figure", "16.3", "What pattern is shown by the sediment-size curve from headwaters toward the mouth?",
      ["*Maximum grain size generally decreases.", "Maximum grain size steadily increases.", "All dissolved material settles first.", "Grain size changes only at the coast."], "The plotted reach trends toward finer maximum sediment sizes downstream.", figure("16.03.a3", "Assigned figure for section 16.3"));
    fill("recall", "16.3", "What geological term means “the largest particle size a flow can transport”?",
      ["competence"], "During a storm, higher flow can move coarser grains that normally rest on the bed.");
    write("explain", "16.3", "Compare the movement of a gravel clast and suspended silt as a storm recedes.",
      "A gravel clast rolls, slides, or hops along the bed and may stop as velocity declines. Fine silt can remain suspended in the water column longer. Under comparable conditions gravel settles or stops moving before much of the silt.", ["Identify bed load and suspension", "Relate velocity to transport", "Predict the likely settling order"], figure("16.03.a3", "Assigned figure for section 16.3"));
    match("transport-modes", "16.3B", "Match the observed river load to its mode of transport.",
      [["A pebble bouncing along the bottom", "Bed load"], ["Fine silt carried in the water column", "Suspended load"], ["Ions carried in the water", "Dissolved load"]],
      "Bed load moves against or near the bed. Suspended particles travel within the flow. Dissolved material travels as ions.", undefined, [connect + ":question 4"]);
  });

  section(4, "Longitudinal profiles and base level", "Longitudinal profiles and base level", [
    group("Read the long profile", "16.04.a2", [figure("16.04.a2", "James River elevation plotted against distance")], [
      term("A longitudinal profile", "a plot of channel elevation against distance along the stream") + ".",
      "A stream commonly descends steeply near its headwaters and becomes gentler downstream."
    ], "Read the figure", "Gradient is the vertical change divided by horizontal distance."),
    group("Change the base level", "16.04.a1", [figure("16.04.a1", "Longitudinal view of a channel reaching base level")], [
      term("Gradient", "the drop in channel elevation per unit of horizontal distance") + ".",
      "A typical profile is concave upward. Local resistant rock, tributary junctions, dams, or recent uplift can introduce steps. Base level limits how far a reach can cut down at its downstream end.",
      "Lowering the outlet creates an opportunity for incision that can work its way upstream."
    ], "Read the axes", "Explain how to recognize a locally steep reach on a stream profile.")
  ], ({mc, fill, write}) => {
    mc("application", "16.4", "A resistant rock layer crosses an otherwise smoothly declining river. What feature is most likely at the crossing?",
      ["*A local steep reach or waterfall", "An abrupt regional drainage divide", "A marine delta above the headwaters", "A floodplain higher than both valley walls"], "The axes show elevation and downstream distance. Compare the vertical drop over equal horizontal intervals. A sharp local drop may mark a resistant ledge or a change in base level.");
    mc("figure", "16.4", "Which part of the plotted river has the greatest drop per unit distance?",
      ["*The steep upper reach", "The nearly level lower reach", "The point where the profile meets sea level", "All reaches equally"], "Gradient is the vertical change divided by horizontal distance.", figure("16.04.a2", "Assigned figure for section 16.4"));
    fill("recall", "16.4", "What geological term means “a plot of channel elevation against distance along the stream”?",
      ["longitudinal profile", "a longitudinal profile"], "A stream commonly descends steeply near its headwaters and becomes gentler downstream.");
    write("explain", "16.4", "Explain how to recognize a locally steep reach on a stream profile.",
      "The axes show elevation and downstream distance. Compare the vertical drop over equal horizontal intervals. A sharp local drop may mark a resistant ledge or a change in base level.", ["Identify elevation and distance", "Compare elevation drop over equal distances", "Offer a geologic control"], figure("16.04.a2", "Assigned figure for section 16.4"));
  });

  section(5, "Sinuosity and the shape of a river bend", "Sinuosity and the shape of a river bend", [
    group("Trace both distances", "Connect assignment 16:question 2", [img("bend-profiles", "Channel bend and cross-section locations", "Connect assignment 16 · Q2")], [
      term("Sinuosity", "the winding of a channel, measured by channel length divided by valley distance over the same reach") + ".",
      "Use the same upstream and downstream endpoints for both distances. A nearly straight channel has a ratio close to one. A channel with wide loops travels farther between the endpoints and has greater sinuosity."
    ], "Check your reasoning", "Follow the channel centerline first, then compare the valley distance.", ["Connect assessment 16:question 8"]),
    group("Orient the profile", "Connect assignment 16:question 2", [img("16.08.a3", "Bends across a floodplain", "Exploring Geology · 16.08.a3")], [
      term("A cutbank", "an eroding bank on the outside of a bend") + ".",
      "In a typical bend, the deeper, faster current swings toward the outside bank. Erosion there and deposition on an inside point bar allow the channel to migrate laterally. At the next bend the deep side can switch banks."
    ], "Check your reasoning", "Locate the outer bank before choosing which side of the cross section should be deepest.", ["Connect assessment 16:question 8"])
  ], ({mc, fill, match, write}) => {
    mc("interpret", "Connect assignment 16:question 2", "The river winds for 6 km between endpoints 4 km apart along the valley. What is its sinuosity?",
      ["*1.5", "0.67", "2.0", "10"], "Divide the channel distance by the valley distance: 6 divided by 4 is 1.5.", img("bend-profiles", "Channel bend and cross-section locations", "Connect assignment 16 · Q2"), ["Connect assessment 16:question 8"]);
    mc("apply", "Connect assignment 16:question 2", "Two cross sections cut successive bends that curve in opposite directions. What should happen to the deepest part of the typical profile?",
      ["*It switches banks to follow each outer bend", "It stays against the same geographic bank", "It follows the inside point bar at both bends", "It always stays midway between the banks"], "The outer bank changes sides as the channel curves in the opposite direction.", img("bend-profiles", "Channel bend and cross-section locations", "Connect assignment 16 · Q2"), ["Connect assessment 16:question 8"]);
    fill("recall", "Connect assignment 16:question 2", "Which term describes the winding of a channel, measured by channel length divided by valley distance over the same reach?",
      ["sinuosity"], "Use the same upstream and downstream endpoints for both distances. A nearly straight channel has a ratio close to one. A channel with wide loops travels farther between the endpoints and has greater sinuosity.", ["Connect assessment 16:question 8"]);
    match("bank", "Connect assignment 16:question 2", "Match each observation to the corresponding geological term.",
      [["Deeper side of a bend profile", "Outer bank"], ["Accumulating sand on the inside", "Point bar"], ["Channel length relative to valley length", "Sinuosity"]], "In a typical bend, the deeper, faster current swings toward the outside bank. Erosion there and deposition on an inside point bar allow the channel to migrate laterally. At the next bend the deep side can switch banks.", img("bend-profiles", "Channel bend and cross-section locations", "Connect assignment 16 · Q2"), ["Connect assessment 16:question 8"]);
    write("explain", "Connect assignment 16:question 2", "Explain how two rivers connecting the same endpoints can have different sinuosity, and predict the deeper side of a bend.",
      "A more winding route has greater channel length for the same valley distance. In a typical bend, the deeper and faster part of the flow lies toward the outer bank, where erosion commonly occurs.", ["Hold the two endpoints fixed", "Compare the channel and valley distances", "Locate the deeper current"], img("bend-profiles", "Channel bend and cross-section locations", "Connect assignment 16 · Q2"), ["Connect assessment 16:question 8"]);
  });

  section(6, "Headwater channels and waterfalls", "Headwater channels and waterfalls", [
    group("Trace the headwaters", "16.06.a1", [figure("16.06.a1", "A small branching headwater system")], [
      term("Headwaters", "the uppermost reaches of a stream network") + ".",
      "Runoff converges into small channels on steep slopes, where streams can cut narrow valleys."
    ], "Read the figure", "A channel gains contributing area as tributaries join it."),
    group("Find a resistant ledge", "16.06.b1", [figure("16.06.b1", "Channels draining a mountainous catchment")], [
      term("Undercutting", "erosion that removes support beneath an overlying layer or bank") + ".",
      "Mountain headwaters commonly have steep gradients, small contributing basins, and coarse sediment. Resistant beds may hold up waterfalls. Erosion beneath a strong ledge can undercut it and allow the waterfall to retreat upstream.",
      "A bed of stronger rock can form a step, producing rapids or a waterfall along the stream."
    ], "Trace the retreat", "Explain why a waterfall can migrate opposite the direction of water flow.")
  ], ({mc, fill, write}) => {
    mc("application", "16.6", "A waterfall lip migrates upstream while the stream continues to flow downhill. Which sequence explains this?",
      ["*A weaker layer erodes beneath a resistant ledge and the ledge collapses.", "The resistant ledge thickens until the channel reverses direction.", "Downstream bars push the waterfall uphill as they migrate.", "The upstream divide delivers sediment that fills the plunge pool permanently."], "Water erodes weaker rock beneath a resistant cap. The overhang eventually collapses, leaving the lip farther upstream. River water still flows down the gradient while the waterfall retreats.");
    mc("figure", "16.6", "Where would the contributing area be smallest?",
      ["*At the start of a headwater channel", "Below the last major confluence", "At the outlet of the entire basin", "Just downstream of two large tributaries"], "A channel gains contributing area as tributaries join it.", figure("16.06.a1", "Assigned figure for section 16.6"));
    fill("recall", "16.6", "What geological term means “the uppermost reaches of a stream network”?",
      ["headwaters"], "Runoff converges into small channels on steep slopes, where streams can cut narrow valleys.");
    write("explain", "16.6", "Explain why a waterfall can migrate opposite the direction of water flow.",
      "Water erodes weaker rock beneath a resistant cap. The overhang eventually collapses, leaving the lip farther upstream. River water still flows down the gradient while the waterfall retreats.", ["Identify contrasting resistance", "Describe undercutting and collapse", "Distinguish flow direction from lip retreat"], figure("16.06.a1", "Assigned figure for section 16.6"));
  });

  section(7, "Braided channels and bars", "Braided channels and bars", [
    group("Build a gravel bar", "16.07.a4", [figure("16.07.a4", "Braided channels seen from above")], [
      term("A braided stream", "a stream divided into shifting channels by sediment bars") + ".",
      "Where abundant sediment accumulates, a bar can divide a stream into two active channels."
    ], "Read the figure", "Bars split the current locally and strands can rejoin below them."),
    group("Move the channels", "16.07.b2", [figure("16.07.b2", "Gravel bars separating stream strands")], [
      term("A channel bar", "an accumulation of sediment within a channel") + ".",
      "Abundant sediment and variable discharge favor repeated bar construction and erosion. Gravel commonly forms coarse bars. Trace a strand downstream to see it diverge around a bar and rejoin another strand.",
      "Changing flow scours one path and deposits sediment in another, shifting the braided pattern."
    ], "Read the network", "Explain why a gravel bar can redirect a channel during the next high flow.")
  ], ({mc, fill, write}) => {
    mc("application", "16.7", "Which map pattern best distinguishes a braided reach from a tributary network?",
      ["*Channels repeatedly split around bars and rejoin downstream.", "Many small streams join one trunk without splitting again.", "One sinuous channel curves around a vegetated floodplain.", "A few permanent channels diverge at the coast and enter the sea."], "Deposition creates a bar within the active channel. Water divides around the obstruction. High flow may scour one strand and deposit gravel elsewhere, shifting the bar and the favored channel.");
    mc("figure", "16.7", "What separates neighboring active strands in the photographed reach?",
      ["*Deposited sediment bars", "Regional drainage divides", "Marine barrier islands", "High bedrock terraces"], "Bars split the current locally and strands can rejoin below them.", figure("16.07.a4", "Assigned figure for section 16.7"));
    fill("recall", "16.7", "What geological term means “a stream divided into shifting channels by sediment bars”?",
      ["braided stream", "a braided stream"], "Where abundant sediment accumulates, a bar can divide a stream into two active channels.");
    write("explain", "16.7", "Explain why a gravel bar can redirect a channel during the next high flow.",
      "Deposition creates a bar within the active channel. Water divides around the obstruction. High flow may scour one strand and deposit gravel elsewhere, shifting the bar and the favored channel.", ["Identify deposition within the channel", "Describe flow splitting", "Explain scouring and bar migration"], figure("16.07.a4", "Assigned figure for section 16.7"));
  });

  section(8, "Meanders, cutbanks, and oxbows", "Meanders, cutbanks, and oxbows", [
    group("Find the outer bank", "16.08.a2", [figure("16.08.a2", "A looping river and abandoned bends")], [
      term("A point bar", "a deposit that accumulates along the inside of a channel bend") + ".",
      "In a bend, erosion can cut into the outside bank while sand builds a point bar on the inside."
    ], "Read the figure", "A cutoff leaves a curved former channel that may persist as an oxbow lake."),
    group("Close the bend", "16.08.a3", [figure("16.08.a3", "Meanders across a cultivated floodplain")], [
      term("An oxbow lake", "a water-filled former channel loop isolated by a meander cutoff") + ".",
      "The deeper, faster part of the flow generally swings toward the outside bank of a bend. Lateral migration changes the channel position even when the long profile changes little. A cutoff shortens the path across a narrow meander neck.",
      "If the river cuts across a narrow neck, the abandoned loop can become an oxbow lake."
    ], "Read the cross section", "Explain how erosion and deposition can move a bend sideways.")
  ], ({mc, fill, write}) => {
    mc("application", "16.8", "A survey line crosses a river bend. Which pair of observations fits a migrating meander?",
      ["*A deeper channel at the outer bank and a shallow bar at the inner bank", "A shallow channel at the outer bank and a deep trench at the inner bar", "Two equal-depth banks and the deepest water always at the midpoint", "An abandoned lake at every outer bank and a waterfall at each inner bank"], "The deeper, faster current generally erodes the outside bank. Lower velocities on the inside allow a point bar to grow. Together the bank retreat and bar growth shift the channel laterally.");
    mc("figure", "16.8", "Which feature is most likely to mark an abandoned reach?",
      ["*A water-filled crescent disconnected from the active bend", "A straight reach just upstream of a bend", "An outer bank in contact with the main current", "A tributary entering the main channel"], "A cutoff leaves a curved former channel that may persist as an oxbow lake.", figure("16.08.a2", "Assigned figure for section 16.8"));
    fill("recall", "16.8", "What geological term means “a deposit that accumulates along the inside of a channel bend”?",
      ["point bar", "a point bar"], "In a bend, erosion can cut into the outside bank while sand builds a point bar on the inside.");
    write("explain", "16.8", "Explain how erosion and deposition can move a bend sideways.",
      "The deeper, faster current generally erodes the outside bank. Lower velocities on the inside allow a point bar to grow. Together the bank retreat and bar growth shift the channel laterally.", ["Locate erosion on the outside", "Locate deposition on the inside", "Relate both to bend migration"], figure("16.08.a2", "Assigned figure for section 16.8"));
    mc("outer-bend-depth", "16.8A", "Two surveyors sample opposite banks of a migrating bend. Where should they expect a deeper channel and active bank erosion?",
      ["*Beside the outer cutbank", "On the shallow inner point bar", "Inside a disconnected oxbow", "Across the meander neck on land"],
      "Flow is generally deepest toward the outside of a bend. Sediment accumulates along the shallower inside bank.", undefined, [connect + ":question 2"]);
  });

  section(9, "River mouths, deltas, and dams", "River mouths, deltas, and dams", [
    group("Trap the sediment", "16.09.c1", [figure("16.09.c1", "River impoundment and downstream release")], [
      term("Base level", "a limit to downcutting set by a downstream surface or body of water") + ".",
      "A reservoir slows incoming water and traps part of the river's sediment load."
    ], "Read the figure", "The receiving water sets the downstream elevation for the entering river."),
    group("Inspect the reach below", "16.09.a3", [figure("16.09.a3", "Deposition at a river mouth")], [
      term("A reservoir", "water impounded behind a barrier such as a dam") + ".",
      "Sea level is the ultimate base level for streams reaching the ocean. A lake or reservoir provides a local base level. At a river mouth, waves and tides can redistribute sediment and influence the shape of a delta.",
      "Water released below a dam may erode the channel if it can carry more sediment than it receives."
    ], "Compare two reaches", "Explain how a dam can promote deposition above it and erosion below it.")
  ], ({mc, fill, write}) => {
    mc("application", "16.9", "A dam forms a reservoir where a river formerly occupied a narrow valley. Where is the first major accumulation of incoming coarse sediment likely?",
      ["*Upstream where the current enters slower reservoir water", "Immediately below the spillway in the fastest released water", "At the drainage divide above all tributaries", "At the ocean mouth regardless of distance from the dam"], "The reservoir surface becomes a local base level. Incoming water slows and deposits sediment upstream. Below the dam, releases with sediment-transport capacity exceeding their load can erode the bed.");
    mc("figure", "16.9", "Which part of the reservoir diagram acts as a local base level for the inflowing river?",
      ["*The water surface in the reservoir", "The crest of a mountain divide", "The lowest point beneath the dam foundation", "The upper limit of the drainage basin"], "The receiving water sets the downstream elevation for the entering river.", figure("16.09.c1", "Assigned figure for section 16.9"));
    fill("recall", "16.9", "What geological term means “a limit to downcutting set by a downstream surface or body of water”?",
      ["base level"], "A reservoir slows incoming water and traps part of the river's sediment load.");
    write("explain", "16.9", "Explain how a dam can promote deposition above it and erosion below it.",
      "The reservoir surface becomes a local base level. Incoming water slows and deposits sediment upstream. Below the dam, releases with sediment-transport capacity exceeding their load can erode the bed.", ["Identify local base level", "Explain the upstream loss of velocity", "Relate downstream response to sediment supply"], figure("16.09.c1", "Assigned figure for section 16.9"));
  });

  section(10, "Incision and aggradation through time", "Incision and aggradation through time", [
    group("Change the balance", "16.10.a2", [figure("16.10.a2", "Bedrock cross section with a buried valley")], [
      term("Aggradation", "net accumulation of sediment that raises the channel bed") + ".",
      "If a stream receives more sediment than it can transport, the bed rises as sediment accumulates."
    ], "Read the figure", "The depression had to exist before it could receive the younger fill."),
    group("Reverse the imbalance", "16.10.b2", [figure("16.10.b2", "River response to changes at its downstream end")], [
      term("Incision", "net downward erosion of a channel bed") + ".",
      "A river adjusts to changes in discharge, sediment supply, and downstream base level. The same reach can switch from deposition to erosion as conditions change. An abandoned channel or buried valley records an earlier configuration.",
      "If transport increases relative to supply, the same reach can erode its bed."
    ], "Predict a change", "Explain how a reach could switch from net deposition to net erosion.")
  ], ({mc, fill, write}) => {
    mc("application", "16.10", "A tributary suddenly delivers abundant gravel while main-channel flow stays similar. What response is most likely just downstream?",
      ["*Aggradation as supply exceeds transport", "Incision driven by a sudden sediment deficit", "A permanent reduction in the drainage area", "A fall in the elevation of the receiving lake"], "When supply exceeds transport, sediment accumulates and raises the bed. A rise in transport capacity or a reduction in incoming sediment can reverse that imbalance. The bed then lowers if erodible material is available.");
    mc("figure", "16.10", "What sequence could leave the buried channel shown in cross section?",
      ["*Incision followed by deposition that fills the valley", "Deposition on a ridge followed by regional uplift", "Repeated floods without erosion or deposition", "A steady channel with unchanging bed elevation"], "The depression had to exist before it could receive the younger fill.", figure("16.10.a2", "Assigned figure for section 16.10"));
    fill("recall", "16.10", "What geological term means “net accumulation of sediment that raises the channel bed”?",
      ["aggradation"], "If a stream receives more sediment than it can transport, the bed rises as sediment accumulates.");
    write("explain", "16.10", "Explain how a reach could switch from net deposition to net erosion.",
      "When supply exceeds transport, sediment accumulates and raises the bed. A rise in transport capacity or a reduction in incoming sediment can reverse that imbalance. The bed then lowers if erodible material is available.", ["Compare sediment supply and transport", "Identify a change that reverses the balance", "Predict the direction of bed change"], figure("16.10.a2", "Assigned figure for section 16.10"));
  });

  section(11, "River terraces and entrenched meanders", "River terraces and entrenched meanders", [
    group("Mark the floodplain", "16.11.a3", [figure("16.11.a3", "Sequence of river incision and terrace formation")], [
      term("A stream terrace", "a bench left above the active valley floor after incision") + ".",
      "Before incision, floodwater spreads across a low surface beside the channel."
    ], "Read the figure", "An older valley floor is left perched when the river cuts a lower one."),
    group("Lower the bed", "16.11.b1", [figure("16.11.b1", "Sequence showing an entrenched meander")], [
      term("An entrenched meander", "a winding river bend cut deeply into the underlying landscape") + ".",
      "A terrace tread may preserve old channel gravel. Its riser separates it from the younger floodplain below. A meandering river that cuts down rapidly may preserve its bends in bedrock, producing entrenched meanders.",
      "After the river cuts down, remnants of that former floodplain stand above the new channel as terraces."
    ], "Reconstruct the sequence", "Explain how a low-gradient meander can become a deep winding canyon.")
  ], ({mc, fill, write, match}) => {
    mc("application", "16.11", "Old river gravel caps a bench well above the present channel. What history best explains the deposit?",
      ["*A former valley floor was abandoned as the stream incised.", "A recent flood rolled gravel uphill onto a high divide.", "Wind cut a flat bench and deposited coarse river gravel.", "The present floodplain rose because the river ceased flowing."], "A low-gradient river first migrates laterally to form bends. Uplift or lower base level can renew downcutting. If incision dominates over lateral migration, the river preserves its winding path in a deep canyon.");
    mc("figure", "16.11", "In the terrace sequence, what was the high gravel-covered tread before incision?",
      ["*Part of an earlier valley floor", "A former bedrock drainage divide", "A submerged delta front offshore", "A recent channel-bottom scour hole"], "An older valley floor is left perched when the river cuts a lower one.", figure("16.11.a3", "Assigned figure for section 16.11"));
    fill("recall", "16.11", "What geological term means “a bench left above the active valley floor after incision”?",
      ["stream terrace", "a stream terrace"], "Before incision, floodwater spreads across a low surface beside the channel.");
    write("explain", "16.11", "Explain how a low-gradient meander can become a deep winding canyon.",
      "A low-gradient river first migrates laterally to form bends. Uplift or lower base level can renew downcutting. If incision dominates over lateral migration, the river preserves its winding path in a deep canyon.", ["Begin with lateral migration", "Identify renewed downcutting", "Explain preservation of the winding planform"], figure("16.11.a3", "Assigned figure for section 16.11"));
    match("connect-bank", "16.11", "Assign each numbered landscape to its stage of incision.",
      [["1", "Second stage"], ["2", "Third stage (youngest)"], ["3", "First stage (oldest)"]], "Read the depth of incision beneath the former valley surface. The shallowest bend is earliest.",
      img("bank-16.11", "Numbered course diagram", "Connect · question 3"), [connect + ":question 3"]);
  });

  section(12, "Natural bridges and arches", "Natural bridges and arches", [
    group("Follow the stream", "16.12.a4", [figure("16.12.a4", "Channel approaching a narrow meander wall")], [
      term("A natural bridge", "a rock span produced as a stream cuts through a barrier") + ".",
      "A stream can cut through a narrow rock wall between bends and leave a natural bridge overhead."
    ], "Read the figure", "A shortcut bypasses part of the winding course."),
    group("Compare an arch", "16.12.a2", [figure("16.12.a2", "A natural bridge spanning an opening")], [
      term("A rock fin", "a relatively thin wall of resistant rock") + ".",
      "Where two bends approach, a stream can breach a narrow wall and shorten its channel. In contrast, many arches form as weathering enlarges weaknesses in a rock fin and gravity removes loosened blocks. Later erosion can obscure the original setting.",
      "An opening formed by weathering and rockfall without a stream cutting through is a natural arch."
    ], "Reconstruct the opening", "Distinguish evidence for a stream-cut bridge from evidence for an arch in an isolated rock fin.")
  ], ({mc, fill, write}) => {
    mc("application", "16.12", "A preserved stream course passes through a gap in a former meander wall. Which origin best fits the span?",
      ["*Stream breaching of a narrow neck", "Wind piling sand across an open gap", "Precipitation of cement above an unrelated fracture", "Rotation of an intact slump block onto a point bar"], "A stream-cut bridge can straddle a channel shortcut through a narrow meander wall. An arch in a rock fin can grow through weathering and rockfall without a river cutting that opening. Trace the former channel to distinguish the origins.");
    mc("figure", "16.12", "Which route becomes shorter when the river breaches the wall between adjacent bends?",
      ["*The channel path between upstream and downstream points", "The horizontal distance between two fixed valley walls", "The distance from a hilltop to sea level", "The vertical drop between two fixed points"], "A shortcut bypasses part of the winding course.", figure("16.12.a4", "Assigned figure for section 16.12"));
    fill("recall", "16.12", "What geological term means “a rock span produced as a stream cuts through a barrier”?",
      ["natural bridge", "a natural bridge"], "A stream can cut through a narrow rock wall between bends and leave a natural bridge overhead.");
    write("explain", "16.12", "Distinguish evidence for a stream-cut bridge from evidence for an arch in an isolated rock fin.",
      "A stream-cut bridge can straddle a channel shortcut through a narrow meander wall. An arch in a rock fin can grow through weathering and rockfall without a river cutting that opening. Trace the former channel to distinguish the origins.", ["Identify the former channel path", "Explain breaching of the wall", "Describe weathering and rockfall in a fin"], figure("16.12.a4", "Assigned figure for section 16.12"));
  });

  section(13, "Bankfull flow and flooding", "Bankfull flow and flooding", [
    group("Raise the stage", "16.13.a3", [figure("16.13.a3", "Hydrograph with a flood threshold")], [
      term("Stage", "water-surface height relative to a reference level") + ".",
      "Water can rise inside a channel without covering the adjacent floodplain."
    ], "Read the figure", "The river is above the indicated threshold during that interval."),
    group("Cross the bank", "16.13.a4", [figure("16.13.a4", "Hydrograph with a broader peak")], [
      term("A hydrograph", "a graph showing how stream stage or discharge changes over time") + ".",
      "A hydrograph shows how stage or discharge changes through time. A sharp rise and short lag can indicate rapid runoff, whereas a broad peak can follow slower input or storage. Whether an event floods a site depends on channel capacity and local elevation.",
      "When the river overtops its banks, water spreads across land that is usually dry."
    ], "Read the threshold", "Explain why two storms with similar peak discharge may cause different amounts of inundation in different reaches.")
  ], ({mc, fill, write, match}) => {
    mc("application", "16.13", "A gauge records a strong peak but water remains below both banks. What can you conclude at that reach?",
      ["*Discharge increased without overbank flooding.", "The gauge proves that all nearby terraces flooded.", "The rising limb records a drop in water level.", "The stream permanently increased its drainage area."], "Each channel can carry a different discharge before spilling onto its floodplain. Ground elevation and connection to the river control which areas are inundated. Equal discharge can therefore produce different flooded areas.");
    mc("figure", "16.13", "What feature determines the duration of flooding on the graph?",
      ["*Time between the upward and downward threshold crossings", "Height of the peak above the start of the graph", "Time between the first two plotted points", "Difference between maximum and minimum discharge"], "The river is above the indicated threshold during that interval.", figure("16.13.a4", "Threshold and recorded flow"));
    fill("recall", "16.13", "What geological term means “water-surface height relative to a reference level”?",
      ["stage"], "Water can rise inside a channel without covering the adjacent floodplain.");
    write("explain", "16.13", "Explain why two storms with similar peak discharge may cause different amounts of inundation in different reaches.",
      "Each channel can carry a different discharge before spilling onto its floodplain. Ground elevation and connection to the river control which areas are inundated. Equal discharge can therefore produce different flooded areas.", ["Identify bank or channel capacity", "Consider floodplain elevation", "Distinguish discharge from flooded area"], figure("16.13.a4", "Threshold and recorded flow"));
    match("connect-bank", "16.13", "Classify the flow event in each numbered graph.",
      [["1", "Flow stays below flood stage"], ["2", "Gradual rise above flood stage"], ["3", "Rapid rise above flood stage"]], "Compare each curve with the threshold and follow the timing of its rise and fall.",
      img("bank-16.13", "Numbered course diagram", "Connect · question 1"), [connect + ":question 1"]);
  });

  section(14, "The 1976 Big Thompson flash flood", "The 1976 Big Thompson flash flood", [
    group("Explain the concentration", "Connect assessment 16:questions 17–18", [img("flash-curves", "Four schematic discharge curves", "Connect assessment 16 · Q17")], [
      term("A stationary weather front", "a boundary between air masses that moves little over time") + ".",
      "In the 1976 Big Thompson event, intense rainfall persisted over a small region. The location and persistence of the storm concentrated runoff into the same drainage system. This is the historical cause tested by the assessment."
    ], "Check your reasoning", "Identify what kept heavy rain over the same area.", ["Connect assignment 16:question 1"]),
    group("Read the timing", "Connect assessment 16:questions 17–18", [img("flash-curves", "Comparison of rapid and gradual discharge peaks", "Connect assessment 16 · Q17")], [
      term("A flash flood", "flooding characterized by a rapid rise in water level or discharge over a short period") + ".",
      "Read time from left to right on the four practice hydrographs. A sharp rise over a short interval distinguishes a flash response from a broader, gradual peak. These are schematic comparisons. They do not give the measured peak discharge for the 1976 flood."
    ], "Check your reasoning", "Compare the width and steepness of each rise, not just peak height.", ["Connect assignment 16:question 1"])
  ], ({mc, fill, match, write}) => {
    mc("interpret", "Connect assessment 16:questions 17–18", "Which weather pattern triggered the 1976 Big Thompson flood?",
      ["*A nearly stationary front producing intense local rain", "A rapidly retreating front with brief light showers", "Several days of snowmelt throughout a large basin", "Rain spread evenly over several states for weeks"], "The event-specific Connect item identifies a stationary front and intense rain concentrated in a small region.", img("flash-curves", "Four schematic discharge curves", "Connect assessment 16 · Q17"), ["Connect assignment 16:question 1"]);
    mc("apply", "Connect assessment 16:questions 17–18", "Which lettered hydrograph best illustrates the rapid response expected during a flash flood?",
      ["*D", "A", "B", "C"], "D rises abruptly to a sharp peak. A rises and falls gradually, B stays nearly steady, and C rises to a plateau.", img("flash-curves", "Four schematic discharge curves", "Connect assessment 16 · Q17"), ["Connect assignment 16:question 1"]);
    fill("recall", "Connect assessment 16:questions 17–18", "Which term describes flooding characterized by a rapid rise in water level or discharge over a short period?",
      ["flash flood", "a flash flood"], "In the 1976 Big Thompson event, intense rainfall persisted over a small region. The location and persistence of the storm concentrated runoff into the same drainage system. This is the historical cause tested by the assessment.", ["Connect assignment 16:question 1"]);
    match("bank", "Connect assessment 16:questions 17–18", "Match each lettered hydrograph to its discharge pattern.",
      [["A", "Broad rise and fall"], ["B", "Nearly steady discharge"], ["C", "Rise to a sustained plateau"], ["D", "Short, sharp peak"]], "Read time from left to right on the four practice hydrographs. A sharp rise over a short interval distinguishes a flash response from a broader, gradual peak. These are schematic comparisons. They do not give the measured peak discharge for the 1976 flood.", img("flash-curves", "Four schematic discharge curves", "Connect assessment 16 · Q17"), ["Connect assignment 16:question 1"]);
    write("explain", "Connect assessment 16:questions 17–18", "Link the storm pattern to the flood response in the 1976 Big Thompson case.",
      "A nearly stationary front kept intense rain concentrated over a small area. Runoff reached the same drainage network in a short interval, causing a rapid rise in river discharge.", ["Identify persistence of the front", "Identify intense local rainfall", "Connect runoff concentration to a rapid rise"], img("flash-curves", "Four schematic discharge curves", "Connect assessment 16 · Q17"), ["Connect assignment 16:question 1"]);
  });

  section(15, "Discharge and flood recurrence", "Discharge and flood recurrence", [
    group("Measure the section", "16.15.a2", [figure("16.15.a2", "Cross section used to measure flowing area")], [
      term("Discharge", "the volume of water crossing a channel section per unit time") + ".",
      "Stream discharge equals the cross-sectional area of flowing water multiplied by its mean velocity."
    ], "Read the figure", "Discharge is area multiplied by mean velocity."),
    group("Interpret the odds", "16.15.b2", [figure("16.15.b2", "Flood discharge versus annual exceedance probability")], [
      term("Annual exceedance probability", "the chance that a specified event magnitude will be equaled or exceeded in a given year") + ".",
      "For a rectangular channel, multiply width by mean depth to get area. Multiply area by mean velocity to obtain cubic meters per second. Annual exceedance probability is the reciprocal of recurrence interval under the assumed statistical conditions.",
      "A hundred-year flood has a one percent chance of being equaled or exceeded in any given year under the assumed conditions."
    ], "Check units and probability", "Explain why two floods classed as hundred-year events can occur in successive years.")
  ], ({mc, fill, write}) => {
    mc("application", "16.15", "A rectangular channel is 12 m wide with a mean depth of 2 m. Mean velocity is 0.5 m/s. What is the discharge?",
      ["*12 cubic meters per second", "24 cubic meters per second", "48 cubic meters per second", "3 cubic meters per second"], "The hundred-year classification describes a one percent annual exceedance probability under the assumed conditions. It is an average recurrence interval, not a schedule. One occurrence does not impose a waiting period before the next.");
    mc("figure", "16.15", "With the same area, what happens to discharge when mean velocity doubles?",
      ["*It doubles.", "It halves.", "It stays constant.", "It quadruples."], "Discharge is area multiplied by mean velocity.", figure("16.15.a2", "Assigned figure for section 16.15"));
    fill("recall", "16.15", "What geological term means “the volume of water crossing a channel section per unit time”?",
      ["discharge"], "Stream discharge equals the cross-sectional area of flowing water multiplied by its mean velocity.");
    write("explain", "16.15", "Explain why two floods classed as hundred-year events can occur in successive years.",
      "The hundred-year classification describes a one percent annual exceedance probability under the assumed conditions. It is an average recurrence interval, not a schedule. One occurrence does not impose a waiting period before the next.", ["State the one percent annual chance", "Distinguish an average interval from a schedule", "Recognize that one event does not impose a waiting period"], figure("16.15.a2", "Assigned figure for section 16.15"));
    fill("discharge-change", "16.15A", "A rectangular channel is 8 m wide. At a mean depth of 3 m and a mean velocity of 2 m/s, how many cubic meters pass each second?",
      ["48", "48 m3/s", "48 m³/s", "48 cubic meters per second"], "The wetted area is 24 square meters. Multiplying by 2 meters per second gives 48 cubic meters per second.", [connect + ":questions 7–8"]);
  });

  section(16, "The Colorado River from source to mouth", "The Colorado River from source to mouth", [
    group("Follow the Colorado", "16.16.a1", [figure("16.16.a1", "Colorado River drainage basin")], [
      term("A tributary", "a stream that contributes water to another stream") + ".",
      "The Colorado River gathers tributaries, cuts deep canyons, and carries sediment toward its mouth."
    ], "Read the figure", "The basin boundary encloses land draining to the chosen outlet."),
    group("Follow the sediment", "16.16.a10", [figure("16.16.a10", "Lower river and delta near the Gulf of California")], [
      term("Sediment load", "the material transported by a stream") + ".",
      "Mountain headwaters feed a river that crosses plateaus and deeply incised canyons before reaching low desert terrain. Reservoirs store water and trap sediment. Diversions and evaporation also affect the amount of water reaching the lower river.",
      "Reservoirs interrupt that route by trapping sediment that otherwise could travel farther downstream."
    ], "Follow water and sediment", "Explain how a reservoir changes the relationship between distance downstream and sediment load.")
  ], ({mc, fill, write}) => {
    mc("application", "16.16", "Why can sediment supply decrease across a reservoir even where the river has received tributaries upstream?",
      ["*Sediment settles where the river slows within the reservoir.", "Tributaries increase velocity enough to dissolve all suspended grains.", "The dam converts gravel into dissolved ions at the spillway.", "The river loses its entire drainage basin at the dam."], "Upstream tributaries supply sediment. As water enters a reservoir, slower flow deposits part of that load. Water can continue through the dam while much of the sediment stays upstream.");
    mc("figure", "16.16", "On the basin map, where should a tracer enter to travel down the Colorado system?",
      ["*In a tributary inside the basin boundary", "On the far side of a major drainage divide", "In a neighboring closed basin", "In seawater beyond the river mouth"], "The basin boundary encloses land draining to the chosen outlet.", figure("16.16.a1", "Assigned figure for section 16.16"));
    fill("recall", "16.16", "What geological term means “a stream that contributes water to another stream”?",
      ["tributary", "a tributary"], "The Colorado River gathers tributaries, cuts deep canyons, and carries sediment toward its mouth.");
    write("explain", "16.16", "Explain how a reservoir changes the relationship between distance downstream and sediment load.",
      "Upstream tributaries supply sediment. As water enters a reservoir, slower flow deposits part of that load. Water can continue through the dam while much of the sediment stays upstream.", ["Identify an upstream sediment source", "Describe settling in stiller water", "Explain interruption of downstream transport"], figure("16.16.a1", "Assigned figure for section 16.16"));
  });

  section(17, "Floodplain siting investigation", "Floodplain siting investigation", [
    group("Trace low ground", "16.17.a1", [figure("16.17.a1", "Floodplain investigation map")], [
      term("Inundation", "the covering of normally dry land by water") + ".",
      "Water that overtops a channel spreads first into low areas that connect to the river."
    ], "Read the figure", "Water reaches the lowest connected bank elevation before higher surfaces."),
    group("Compare two sites", "16.17.a2", [figure("16.17.a2", "Cross section of the channel and adjacent ground")], [
      term("A floodplain", "low ground beside a channel built or modified by river deposition and overbank flow") + ".",
      "Compare ground elevations with the expected water surface and trace connected low routes. A field can benefit from level fertile soil yet still flood. A house has different tolerances, and a low access road can be cut off before the building floods.",
      "A nearby terrace can stand above a flood that covers a more distant part of the floodplain."
    ], "Evaluate the route", "Choose between an elevated house with a low approach and a terrace with an elevated approach.")
  ], ({mc, fill, write}) => {
    mc("application", "16.17", "Which site is most likely to stay accessible during a flood that fills the valley floor?",
      ["*A terrace above flood stage with a road on high ground", "A high knoll reached only by a low floodplain road", "A point bar beside the outer edge of the main channel", "A low swale on the far side of the floodplain"], "Compare the predicted water level with both the house and its approach road. A house can remain dry while floodwater blocks its only access. A terrace and approach both above that stage reduce isolation during that event.");
    mc("figure", "16.17", "Which feature in a valley cross section is overtopped first as stage rises from the channel to overbank flow?",
      ["*The lower bank bordering the floodplain", "The highest terrace tread", "The crest of the far valley wall", "The top of a distant drainage divide"], "Water reaches the lowest connected bank elevation before higher surfaces.", figure("16.17.a2", "Assigned figure for section 16.17"));
    fill("recall", "16.17", "What geological term means “the covering of normally dry land by water”?",
      ["inundation"], "Water that overtops a channel spreads first into low areas that connect to the river.");
    write("explain", "16.17", "Choose between an elevated house with a low approach and a terrace with an elevated approach.",
      "Compare the predicted water level with both the house and its approach road. A house can remain dry while floodwater blocks its only access. A terrace and approach both above that stage reduce isolation during that event.", ["Compare site elevations with stage", "Identify low points on the access route", "Explain isolation during flooding"], figure("16.17.a2", "Assigned figure for section 16.17"));
  });
})(window.L);
