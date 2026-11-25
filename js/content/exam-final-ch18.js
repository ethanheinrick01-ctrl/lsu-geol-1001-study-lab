/* GEOL 1001 · Final Exam Learn · Chapter 18 */
(function (L) {
  'use strict';
  const {chapter, group, term} = L.FINAL_STUDY;
  const text = "Textbook 18", connect = "Connect 18";
  L.SOURCES[text] = {t: "Exploring Geology · Chapter 18", f: 'Assigned textbook', tier: 2, unit: 'figure or section'};
  L.SOURCES[connect] = {t: "Chapter 18 Connect practice", f: 'Course exercise figures', tier: 2, unit: 'exercise'};
  const {section, img} = chapter(18, {
    name: "Ch 18 · Energy and Mineral Resources", short: 'Ch 18',
    coverage: 'Introduction and sections 18.1–18.16',
    evidence: "Assigned textbook and Connect exercises. Instructor slide selections are pending.",
    sourceNote: "Numbered figures cite the assigned textbook and Connect. This chapter currently uses textbook and Connect evidence."
  }, (n, loc) => [loc.includes(':') ? loc : text + ':' + loc]);

  section(0, "Read the Arabian Peninsula from west to east", "Read the Arabian Peninsula from west to east", [
    group("Locate the plate boundaries", "18.00.a2", [img("18.00.a2", "Locate the plate boundaries", "Exploring Geology · Fig. 18.00.a2"), img("arabia-boundaries", "Plate boundaries and resource fields on the Arabian Peninsula", "Connect · Chapter 18 · assessment Q2")], [
      term("Rift", "a zone where the crust stretches as tectonic plates separate") + ".",
      "Along the western margin of Arabia, extension opened the Red Sea between the Arabian and African plates.",
      "The western escarpment faces a young ocean basin at a divergent boundary. The Persian Gulf lies on the opposite side of the peninsula, toward the collision belt of the Zagros Mountains."
    ], "Read the figure", "Use the map legend to distinguish extension from convergence.", []),
    group("Follow the sedimentary basin", "18.00.a3", [img("18.00.a3", "Follow the sedimentary basin", "Exploring Geology · Fig. 18.00.a3")], [
      term("Sedimentary basin", "a region that subsides and accumulates sediment") + ".",
      "Eastward, sedimentary layers thicken toward the Persian Gulf, preserving rocks that could generate and store petroleum.",
      "On the cross section, older basement lies close to the surface in the west. The sedimentary succession thickens eastward. Different parts of that succession can supply organic-rich beds, porous reservoirs, and seals."
    ], "Read the figure", "Trace basement and overlying sediment independently across the peninsula.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.0", "Which pairing best fits the two sides of the Arabian plate?",
      ["*Red Sea extension and Zagros convergence.", "Red Sea convergence and Zagros extension.", "Red Sea subduction and Zagros seafloor spreading.", "Red Sea collision and Zagros transform motion."],
      "The Red Sea records extension and separation. To the east, a thick sedimentary basin preserves potential petroleum-system rocks near a convergent margin. Those histories produce different structures and resources.", undefined);
    mc("figure", "18.00.a3", "Where on the cross section is there a more extensive sedimentary succession to investigate for petroleum?",
      ["*Toward the Persian Gulf on the eastern side.", "Directly beneath exposed western basement.", "At the axial ridge in the Red Sea.", "Within uplifted crystalline rock along the western escarpment."],
      "Eastward, sedimentary layers thicken toward the Persian Gulf, preserving rocks that could generate and store petroleum. On the cross section, older basement lies close to the surface in the west. The sedimentary succession thickens eastward. Different parts of that succession can supply organic-rich beds, porous reservoirs, and seals.", img("18.00.a3", "Follow the sedimentary basin", "Exploring Geology · Fig. 18.00.a3"));
    fill("recall", "18.0", "What term describes a zone where the crust stretches as tectonic plates separate?", ["rift", "a rift", "an rift"], "Along the western margin of Arabia, extension opened the Red Sea between the Arabian and African plates.");
    mc("arabia-boundaries", "Connect 18:assessment Q2", "Which motion of Arabia fits both opening of the Red Sea and shortening at the Zagros margin?",
      ["*Toward the northeast, away from the rift and toward the collision.", "Toward the southwest, into the rift and away from the collision.", "Toward the northwest, parallel to both margins.", "Toward the southeast, parallel to both margins."],
      "Arabia separates from Africa in the Red Sea and converges with Eurasia toward the northeast. Read both boundary types before choosing the regional movement.", img("arabia-boundaries", "Plate boundaries and resource fields on the Arabian Peninsula", "Connect · Chapter 18 · assessment Q2"));
    write("explain", "18.0", "Explain why the geology of the Red Sea and Persian Gulf need different interpretations.",
      "The Red Sea records extension and separation. To the east, a thick sedimentary basin preserves potential petroleum-system rocks near a convergent margin. Those histories produce different structures and resources.", ["Locate the boundary types", "Compare the preserved rocks", "Connect basin history to resources"], img("18.00.a2", "Locate the plate boundaries", "Exploring Geology · Fig. 18.00.a2"));
  });

  section(1, "Generation and migration of petroleum", "Generation and migration of petroleum", [
    group("Bury organic sediment", "18.01.b3", [img("18.01.b3", "Bury organic sediment", "Exploring Geology · Fig. 18.01.b3")], [
      term("Source rock", "a rock containing organic matter capable of generating hydrocarbons") + ".",
      "Organic material buried with fine sediment can generate oil and gas when time and temperature are sufficient.",
      "Organic matter is more likely to survive where oxygen is scarce and sediment buries it. Progressive burial changes temperature. Insufficient maturity limits generation, while excessive heating can break down oil."
    ], "Read the figure", "Distinguish preservation of organic matter from later thermal maturation.", []),
    group("Separate the fluids", "18.01.c3", [img("18.01.c3", "Separate the fluids", "Exploring Geology · Fig. 18.01.c3")], [
      term("Reservoir rock", "a rock with pore space that can store and transmit petroleum") + ".",
      "In the folded reservoir, gas occupies the highest pores, oil lies beneath it, and water fills the lower part.",
      "Hydrocarbons can leave the source rock and move through permeable units. Density sorting in a water-bearing reservoir gives gas, oil, and water a characteristic vertical order beneath the seal."
    ], "Read the figure", "Distinguish generation, migration, storage, and trapping.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.1", "Which sequence can produce a conventional accumulation?",
      ["*Preservation, burial heating, migration, and trapping.", "Trapping, surface oxidation, erosion, and cooling.", "Migration, evaporation, crystallization, and uplift.", "Burial, exposure, wave sorting, and cement removal."],
      "Organic-rich source rock generated hydrocarbons during burial. They migrated into connected sandstone pores and accumulated beneath a seal. The source and reservoir need not be the same unit.", undefined);
    mc("figure", "18.01.c3", "Which sequence would a well passing downward through all three fluid zones encounter?",
      ["*Gas, oil, water.", "Oil, gas, water.", "Water, oil, gas.", "Gas, water, oil."],
      "In the folded reservoir, gas occupies the highest pores, oil lies beneath it, and water fills the lower part. Hydrocarbons can leave the source rock and move through permeable units. Density sorting in a water-bearing reservoir gives gas, oil, and water a characteristic vertical order beneath the seal.", img("18.01.c3", "Separate the fluids", "Exploring Geology · Fig. 18.01.c3"));
    fill("recall", "18.1", "What term describes a rock containing organic matter capable of generating hydrocarbons?", ["source rock", "a source rock", "an source rock"], "Organic material buried with fine sediment can generate oil and gas when time and temperature are sufficient.");
    write("explain", "18.1", "A porous sandstone contains oil but little original organic matter. Explain how the oil could be there.",
      "Organic-rich source rock generated hydrocarbons during burial. They migrated into connected sandstone pores and accumulated beneath a seal. The source and reservoir need not be the same unit.", ["Identify source and maturation", "Trace migration", "Explain storage and seal"], img("18.01.b3", "Bury organic sediment", "Exploring Geology · Fig. 18.01.b3"));
  });

  section(2, "Structural and stratigraphic traps", "Structural and stratigraphic traps", [
    group("Follow the folded bed", "18.02.a1", [img("18.02.a1", "Follow the folded bed", "Exploring Geology · Fig. 18.02.a1"), img("salt-closure", "Folded reservoir beds next to a salt dome", "Connect · Chapter 18 · assignment Q5")], [
      term("Anticline", "a fold in which the strata arch upward") + ".",
      "Oil can migrate up a permeable bed toward the fold crest, but it accumulates only where an effective seal closes the trap.",
      "A structural trap uses a fold, offset, or salt-related deformation to close a migration route. A fold alone cannot retain petroleum if the reservoir remains open updip or its cap leaks."
    ], "Read the figure", "Trace a continuous path before concluding the bed is closed.", []),
    group("Locate the sandstone pinch-out", "18.02.c4", [img("18.02.c4", "Locate the sandstone pinch-out", "Exploring Geology · Fig. 18.02.c4")], [
      term("Stratigraphic trap", "a trap created by a change in rock type or the termination of a permeable layer") + ".",
      "Follow the sandstone until it thins into surrounding low-permeability rock, which can block further migration.",
      "A permeable layer can pinch out or terminate against an unconformity. If the adjoining rock seals that termination, migrating fluids can accumulate without a pronounced fold.",
      "A fault can put reservoir rock against impermeable rock. At an unconformity, tilted reservoir beds may instead end beneath younger sealing strata. In both settings the contact matters more than its name."
    ], "Read the figure", "Ask what ends the permeable pathway.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.2", "A folded reservoir is exposed at its crest. Why might a promising anticline contain little oil?",
      ["*Erosion removed the seal and opened an escape path.", "Folding made the reservoir too flat to permit buoyancy.", "Oil cannot migrate through a curved sedimentary bed.", "The fold can hold gas only below denser formation water."],
      "Both require reservoir rock and a seal. In an anticline the geometry of folded beds provides closure. In a pinch-out the permeable bed terminates laterally against a sealing material.", undefined);
    mc("figure", "18.02.c4", "What ends migration in the lens-shaped sandstone shown in the section?",
      ["*The permeable sandstone pinches out into sealing rock.", "The sandstone folds into a symmetrical anticlinal crest.", "A rising salt plug pierces the middle of the lens.", "A vertical fault juxtaposes sandstone against granite."],
      "Follow the sandstone until it thins into surrounding low-permeability rock, which can block further migration. A permeable layer can pinch out or terminate against an unconformity. If the adjoining rock seals that termination, migrating fluids can accumulate without a pronounced fold.", img("18.02.c4", "Locate the sandstone pinch-out", "Exploring Geology · Fig. 18.02.c4"));
    fill("recall", "18.2", "What term describes a fold in which the strata arch upward?", ["anticline", "a anticline", "an anticline"], "Oil can migrate up a permeable bed toward the fold crest, but it accumulates only where an effective seal closes the trap.");
    mc("salt-closure", "Connect 18:assignment Q5", "How can the salt body create a trapping geometry along its flank?",
      ["*It deforms the beds upward and seals an adjacent permeable layer.", "It changes dense formation water directly into petroleum.", "It stores all buoyant oil at the base of the dome.", "It prevents the sedimentary beds from folding during burial."],
      "Salt can rise and bend the surrounding beds. Petroleum migrating updip can gather where impermeable salt or an overlying unit blocks the path.", img("salt-closure", "Folded reservoir beds next to a salt dome", "Connect · Chapter 18 · assignment Q5"));
    mc("extend-2-18-02-c3", "18.02.c3", "A porous tilted bed is truncated and overlain by younger mudrock. Where is a trap most plausible?",
      ["*Near its updip termination beneath the mudrock.", "Inside every permeable bed regardless of its termination.", "At the deepest water-filled end of the tilted reservoir.", "Above the cap where the bent layer reaches the surface."],
      "Trace the updip migration path until it meets an effective seal.");
    write("explain", "18.2", "Compare an anticline trap with a sandstone pinch-out.",
      "Both require reservoir rock and a seal. In an anticline the geometry of folded beds provides closure. In a pinch-out the permeable bed terminates laterally against a sealing material.", ["Identify common requirements", "Explain structural closure", "Explain stratigraphic closure"], img("18.02.a1", "Follow the folded bed", "Exploring Geology · Fig. 18.02.a1"));
  });

  section(3, "Shale reservoirs and well geometry", "Shale reservoirs and well geometry", [
    group("Separate storage from flow", "18.03.a2", [img("18.03.a2", "Separate storage from flow", "Exploring Geology · Fig. 18.03.a2")], [
      term("Shale reservoir", "a fine-grained hydrocarbon-bearing rock with low permeability") + ".",
      "Even where shale contains hydrocarbons, its tiny, poorly connected openings can transmit them very slowly.",
      "In a conventional field, petroleum may leave its source and concentrate in a separate reservoir. Hydrocarbons in a shale reservoir can remain widely distributed through the source interval."
    ], "Read the figure", "Separate a hydrocarbon-bearing bed from a conventional structural trap.", []),
    group("Trace the horizontal well", "18.03.b1", [img("18.03.b1", "Trace the horizontal well", "Exploring Geology · Fig. 18.03.b1")], [
      term("Horizontal lateral", "the part of a well that follows a target interval sideways") + ".",
      "A well can turn and follow the target bed, putting a longer length of the well in contact with the same thin interval.",
      "Well orientation affects how much productive rock the borehole intersects. Induced fractures can connect nearby rock to the well. This improves local fluid pathways while the surrounding shale remains relatively impermeable."
    ], "Read the figure", "Compare contact length for a vertical crossing and a horizontal lateral.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.3", "Why might a shale well have a long horizontal section within one layer?",
      ["*To contact more of a thin, poorly permeable target.", "To ensure that the source interval becomes a structural dome.", "To remove the need for hydrocarbons in the target.", "To convert low-permeability shale into a coarse sandstone."],
      "A lateral contacts a long stretch of the target interval. Fractures provide additional connected paths between the low-permeability rock and the well. Neither feature by itself generates hydrocarbons.", undefined);
    mc("figure", "18.03.b1", "In the well cross section, where does the borehole gain most of its contact length within the target bed?",
      ["*Along the lower lateral that follows bedding.", "At the vertical casing near the ground surface.", "At the drill rig above the sedimentary layers.", "On the short vertical crossing of upper gravel."],
      "A well can turn and follow the target bed, putting a longer length of the well in contact with the same thin interval. Well orientation affects how much productive rock the borehole intersects. Induced fractures can connect nearby rock to the well. This improves local fluid pathways while the surrounding shale remains relatively impermeable.", img("18.03.b1", "Trace the horizontal well", "Exploring Geology · Fig. 18.03.b1"));
    fill("recall", "18.3", "What term describes a fine-grained hydrocarbon-bearing rock with low permeability?", ["shale reservoir", "a shale reservoir", "an shale reservoir"], "Even where shale contains hydrocarbons, its tiny, poorly connected openings can transmit them very slowly.");
    write("explain", "18.3", "Explain why horizontal wells and induced fractures are complementary in shale.",
      "A lateral contacts a long stretch of the target interval. Fractures provide additional connected paths between the low-permeability rock and the well. Neither feature by itself generates hydrocarbons.", ["Explain lateral contact", "Identify the flow limitation", "Explain the role of fractures"], img("18.03.a2", "Separate storage from flow", "Exploring Geology · Fig. 18.03.a2"));
  });

  section(4, "From peat to coal and methane", "From peat to coal and methane", [
    group("Accumulate plant material", "18.04.a1", [img("18.04.a1", "Accumulate plant material", "Exploring Geology · Fig. 18.04.a1")], [
      term("Peat", "partly decomposed plant material that accumulates in wet environments") + ".",
      "In waterlogged ground, plant remains can accumulate faster than they decay, forming a layer of peat.",
      "Waterlogged swamps can preserve terrestrial plant material. Burial by sediment protects and compacts the organic layer. Coal beds can therefore lie within a sequence of other sedimentary rocks."
    ], "Read the figure", "Distinguish the original depositional setting from the coal’s present depth.", []),
    group("Bury and compact the seam", "18.04.a5", [img("18.04.a5", "Bury and compact the seam", "Exploring Geology · Fig. 18.04.a5")], [
      term("Coal rank", "a measure of the degree of transformation of coal during burial and heating") + ".",
      "Burial compacts the plant-rich layer, and increasing heat changes its composition and can generate methane.",
      "With increasing burial and heating, peat can progress through lignite and bituminous coal toward anthracite under stronger metamorphic conditions. Increasing rank generally raises carbon concentration.",
      "For a shallow seam, surface mining first removes the overburden. Underground mining can reach deeper seams, while a gas well can recover methane without removing the coal itself."
    ], "Read the figure", "Use rank to describe transformation, not seam thickness.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.4", "A thick seam retains abundant plant fragments. Which origin best explains it?",
      ["*Accumulation of vegetation in a waterlogged setting.", "Sorting of dense metal grains by a mountain stream.", "Crystallization of carbon from cooling basalt.", "Precipitation from an evaporating marine basin."],
      "Plant debris accumulates in a wet setting and is buried and compacted. Increasing temperature changes the organic material into coal and can generate methane, some of which remains within the seam.", undefined);
    mc("figure", "18.04.a5", "What do the paired blocks showing a buried dark seam illustrate?",
      ["*An organic bed can persist beneath later sedimentary cover.", "Coal occurs only in the soil above exposed bedrock.", "The seam is a lava flow cutting across older bedding.", "Every dark bed is an underground water table."],
      "Burial compacts the plant-rich layer, and increasing heat changes its composition and can generate methane. With increasing burial and heating, peat can progress through lignite and bituminous coal toward anthracite under stronger metamorphic conditions. Increasing rank generally raises carbon concentration.", img("18.04.a5", "Bury and compact the seam", "Exploring Geology · Fig. 18.04.a5"));
    fill("recall", "18.4", "What term describes partly decomposed plant material that accumulates in wet environments?", ["peat", "a peat", "an peat"], "In waterlogged ground, plant remains can accumulate faster than they decay, forming a layer of peat.");
    mc("extend-2-18-04-b1", "18.04.b1", "A deeper extension of a mined seam has too much cover for stripping. What can still be present?",
      ["*Methane held in the coal even where stripping is impractical.", "A shallow open pit wherever coal exists at any depth.", "Only oil generated in an unrelated sandstone bed.", "Coal that necessarily lost all of its gas during burial."],
      "Burial depth changes access. It does not eliminate methane storage in the seam.");
    write("explain", "18.4", "Trace the formation of a coal seam and explain its association with methane.",
      "Plant debris accumulates in a wet setting and is buried and compacted. Increasing temperature changes the organic material into coal and can generate methane, some of which remains within the seam.", ["Identify the starting material", "Connect burial and transformation", "Explain the methane association"], img("18.04.a1", "Accumulate plant material", "Exploring Geology · Fig. 18.04.a1"));
  });

  section(5, "Hydrates, oil shale, and oil sands", "Hydrates, oil shale, and oil sands", [
    group("Release gas from hydrate", "18.05.b2", [img("18.05.b2", "Release gas from hydrate", "Exploring Geology · Fig. 18.05.b2")], [
      term("Gas hydrate", "an ice-like solid in which water molecules enclose gas molecules") + ".",
      "Cold temperatures and sufficient pressure can stabilize gas hydrate, while changing those conditions can release the trapped methane.",
      "Gas hydrate differs from ordinary ice containing bubbles. It is stable over a range of pressure and temperature, including beneath some cold seafloors and in permafrost settings.",
      "Coal-bed methane may be held on coal surfaces and in fractures. Lowering water pressure in a seam can allow methane to leave the coal and flow toward a well."
    ], "Read the figure", "Link the resource to the physical conditions that preserve it.", []),
    group("Read the oil-shale layers", "18.05.c1", [img("18.05.c1", "Read the oil-shale layers", "Exploring Geology · Fig. 18.05.c1")], [
      term("Kerogen", "solid organic matter that can yield hydrocarbons when sufficiently heated") + ".",
      "Oil shale contains solid organic matter that must be converted to yield oil, while oil sand already contains thick petroleum.",
      "Oil shale contains kerogen. Shale oil refers to liquid petroleum associated with low-permeability shale, while oil sands contain viscous petroleum in pore spaces. Similar names describe different storage and recovery problems."
    ], "Read the figure", "Identify the form of organic matter before naming the resource.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.5", "A fine-grained lake bed contains abundant solid organic material that yields oil upon heating. What is it?",
      ["*Oil shale.", "Oil sand.", "Gas hydrate.", "A coal-bed methane reservoir."],
      "Oil shale holds solid kerogen that can be converted by heating. Oil sand contains thick petroleum between grains. In gas hydrate, a solid water structure encloses gas molecules.", undefined);
    mc("figure", "18.05.b2", "Why can the hydrate sample in the photograph release a combustible gas when its conditions change?",
      ["*The water structure can release enclosed methane.", "The ice converts water molecules directly into methane.", "The mineral grains undergo nuclear fission.", "Liquid oil evaporates from sandstone pores."],
      "Cold temperatures and sufficient pressure can stabilize gas hydrate, while changing those conditions can release the trapped methane. Gas hydrate differs from ordinary ice containing bubbles. It is stable over a range of pressure and temperature, including beneath some cold seafloors and in permafrost settings.", img("18.05.b2", "Release gas from hydrate", "Exploring Geology · Fig. 18.05.b2"));
    fill("recall", "18.5", "What term describes an ice-like solid in which water molecules enclose gas molecules?", ["gas hydrate", "a gas hydrate", "an gas hydrate"], "Cold temperatures and sufficient pressure can stabilize gas hydrate, while changing those conditions can release the trapped methane.");
    mc("extend-1-18-05-a1", "18.05.a1", "Which change can release methane held in a coal seam?",
      ["*Reducing fluid pressure in the seam.", "Increasing the groundwater head in the seam.", "Cooling a seafloor hydrate into a stable solid.", "Heating a surface retort of kerogen-rich shale."],
      "Pressure reduction allows methane to desorb and move through connected fractures.");
    write("explain", "18.5", "Compare the material stored in oil shale, oil sand, and gas hydrate.",
      "Oil shale holds solid kerogen that can be converted by heating. Oil sand contains thick petroleum between grains. In gas hydrate, a solid water structure encloses gas molecules.", ["Describe kerogen", "Describe petroleum in pores", "Describe gas in hydrate"], img("18.05.b2", "Release gas from hydrate", "Exploring Geology · Fig. 18.05.b2"));
  });

  section(6, "Testing a petroleum prospect", "Testing a petroleum prospect", [
    group("Send a seismic pulse", "18.06.b3", [img("18.06.b3", "Send a seismic pulse", "Exploring Geology · Fig. 18.06.b3")], [
      term("Reflection seismology", "a method that uses returning seismic waves to infer subsurface boundaries") + ".",
      "A surface source sends vibrations into the ground, and receivers record echoes from boundaries between contrasting layers.",
      "Mapping and seismic reflection can reveal the orientation and continuity of subsurface beds. Reflections record changes in physical properties and require geological interpretation."
    ], "Read the figure", "Follow reflectors across a structure before calling it a trap.", []),
    group("Interpret a subsurface section", "18.06.d1", [img("18.06.d1", "Interpret a subsurface section", "Exploring Geology · Fig. 18.06.d1")], [
      term("Exploration well", "a borehole drilled to test a geological prediction about a subsurface resource") + ".",
      "A section can suggest a folded or faulted trap, but drilling is needed to test the rock and the fluids it contains.",
      "A prospect requires favorable source, reservoir, seal and timing. Well logs and samples help test the predicted sequence and fluid content. A structure imaged by seismic data can still be dry."
    ], "Read the figure", "State what the borehole tests that the section alone cannot establish.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.6", "A seismic profile reveals closure beneath a cap. What remains unresolved?",
      ["*Whether a reservoir is charged with recoverable hydrocarbons.", "Whether any layer in the area can reflect seismic waves.", "Whether the seismic equipment recorded a travel time.", "Whether the land surface lies above the target."],
      "Map the reservoir and seal, trace their closure on seismic sections, and assess source maturity and migration. A well could encounter porous rock with water if the trap never received petroleum.", undefined);
    mc("figure", "18.06.d1", "Why must a proposed trap in an interpreted section be tested with additional evidence?",
      ["*The structure can exist without a charged reservoir.", "A seismic section provides no information about structures.", "A borehole cannot identify the rocks it encounters.", "All folded strata have the same fluid content."],
      "A section can suggest a folded or faulted trap, but drilling is needed to test the rock and the fluids it contains. A prospect requires favorable source, reservoir, seal and timing. Well logs and samples help test the predicted sequence and fluid content. A structure imaged by seismic data can still be dry.", img("18.06.d1", "Interpret a subsurface section", "Exploring Geology · Fig. 18.06.d1"));
    fill("recall", "18.6", "What term describes a method that uses returning seismic waves to infer subsurface boundaries?", ["reflection seismology", "a reflection seismology", "an reflection seismology"], "A surface source sends vibrations into the ground, and receivers record echoes from boundaries between contrasting layers.");
    write("explain", "18.6", "Build a case for drilling a prospect and name one reason the test could fail.",
      "Map the reservoir and seal, trace their closure on seismic sections, and assess source maturity and migration. A well could encounter porous rock with water if the trap never received petroleum.", ["Identify mapped targets", "Check charge and closure", "Give a plausible failure"], img("18.06.b3", "Send a seismic pulse", "Exploring Geology · Fig. 18.06.b3"));
  });

  section(7, "Fission and uranium deposits", "Fission and uranium deposits", [
    group("Follow the energy transfer", "18.07.a1", [img("18.07.a1", "Follow the energy transfer", "Exploring Geology · Fig. 18.07.a1")], [
      term("Fission", "the splitting of a heavy atomic nucleus with a release of energy") + ".",
      "Splitting a heavy nucleus releases energy as heat, which a power plant uses to make steam and drive a turbine.",
      "Heat from fission can be used to produce steam. Steam drives a turbine coupled to a generator. Fuel handling, cooling, and long-term management of radioactive materials are separate parts of the energy system."
    ], "Read the figure", "Follow energy from a nuclear change to mechanical rotation.", []),
    group("Find the mineralized front", "18.07.b1", [img("18.07.b1", "Find the mineralized front", "Exploring Geology · Fig. 18.07.b1")], [
      term("Roll-front deposit", "a curved uranium concentration at a change in groundwater chemistry") + ".",
      "Groundwater can carry dissolved uranium through sandstone and leave a curved mineralized zone where the chemical conditions change.",
      "Some uranium is deposited by groundwater within permeable sedimentary units. Others occur near unconformities or in collapse structures. The rock setting records processes that concentrated the element.",
      "After use, spent fuel continues to release heat and radiation. Cooling and shielding serve the immediate storage problem. Long-term isolation also depends on groundwater paths and the stability of a proposed site."
    ], "Read the figure", "Follow the fluid pathway and chemical boundary in the sandstone.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.7", "What directly turns the generator shaft in a conventional nuclear steam plant?",
      ["*A turbine driven by steam.", "The extraction of ore at a mine.", "The splitting nucleus itself.", "A groundwater redox front."],
      "Groundwater or other geological processes concentrate uranium into a deposit. In the power plant, fission releases heat. Steam drives a turbine connected to a generator.", undefined);
    mc("figure", "18.07.b1", "What feature explains the curved zone in the sandstone deposit?",
      ["*A moving chemical boundary where uranium precipitated.", "A folded coal bed bent by regional compression.", "An oil lens held beneath a sealing shale.", "A placer bar built by gravel in a river."],
      "Groundwater can carry dissolved uranium through sandstone and leave a curved mineralized zone where the chemical conditions change. Some uranium is deposited by groundwater within permeable sedimentary units. Others occur near unconformities or in collapse structures. The rock setting records processes that concentrated the element.", img("18.07.b1", "Find the mineralized front", "Exploring Geology · Fig. 18.07.b1"));
    fill("recall", "18.7", "What term describes the splitting of a heavy atomic nucleus with a release of energy?", ["fission", "a fission", "an fission"], "Splitting a heavy nucleus releases energy as heat, which a power plant uses to make steam and drive a turbine.");
    mc("extend-2-18-07-d2", "18.07.d2", "Which geological characteristic most directly affects whether water could carry material away from a long-term repository?",
      ["*Connected groundwater pathways through the host rock.", "The average height of local wind turbines.", "The number of active coal mines in the region.", "The temperature of the nearest surface power line."],
      "Groundwater movement can transport dissolved material, making subsurface flow an essential part of evaluating isolation.");
    write("explain", "18.7", "Explain how the geological concentration of uranium differs from the process that produces electricity.",
      "Groundwater or other geological processes concentrate uranium into a deposit. In the power plant, fission releases heat. Steam drives a turbine connected to a generator.", ["Distinguish ore formation", "Identify the heat source", "Trace power conversion"], img("18.07.a1", "Follow the energy transfer", "Exploring Geology · Fig. 18.07.a1"));
  });

  section(8, "Hydropower and tidal flow", "Hydropower and tidal flow", [
    group("Turn the turbine", "18.08.a1", [img("18.08.a1", "Turn the turbine", "Exploring Geology · Fig. 18.08.a1"), img("dam-site", "Numbered canyon, abutment, reservoir floor, fault, and weak rocks", "Connect · Chapter 18 · assignment Q6")], [
      term("Hydraulic head", "the energy per unit weight of water expressed as a height") + ".",
      "Water descending from the reservoir drives the turbine, whose rotating shaft transfers mechanical energy to the generator.",
      "At a dam, available head and water discharge both matter. A narrow, stable valley may be suitable for a dam wall, while leakage, unstable slopes, and sediment accumulation can reduce usefulness.",
      "A dam can adjust output by changing turbine flow, moderate downstream flooding, and produce electricity without burning fuel at the generator. The impoundment floods existing land, accumulates sediment, and alters habitats downstream."
    ], "Read the figure", "Trace the route from the elevated reservoir to the outflow.", []),
    group("Reverse the water-level difference", "18.08.b2", [img("18.08.b2", "Reverse the water-level difference", "Exploring Geology · Fig. 18.08.b2")], [
      term("Tidal range", "the vertical difference between high tide and low tide") + ".",
      "As the tide falls, stored water can flow back toward the sea through a turbine whenever the water levels differ enough.",
      "A tidal barrier produces power when there is a difference between water levels on its two sides. Marine-current turbines can instead extract energy directly from moving water.",
      "A reservoir can buffer floods and support recreation. Sediment trapped behind the dam reduces storage and changes downstream sediment supply. Filling a reservoir also submerges part of the valley."
    ], "Read the figure", "A large water surface alone does not guarantee a useful head difference.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.8", "Which change can reduce a dam’s generating capacity during a dry period?",
      ["*Less water is available to pass through the turbines.", "The concrete becomes exposed to direct sunlight.", "The downstream channel becomes easier to observe.", "More of the reservoir shoreline appears on a map."],
      "A river dam maintains a reservoir above its outflow. A tidal barrage uses a changing difference between sea and basin levels. In both cases moving water turns turbines linked to generators.", undefined);
    mc("figure", "18.08.b2", "Why can turbine flow in a tidal barrage reverse direction?",
      ["*Sea level rises and falls relative to the impounded water.", "The dam moves to opposite banks each tidal cycle.", "The two bodies of water have permanently equal levels.", "Power generation changes the direction of gravity."],
      "As the tide falls, stored water can flow back toward the sea through a turbine whenever the water levels differ enough. A tidal barrier produces power when there is a difference between water levels on its two sides. Marine-current turbines can instead extract energy directly from moving water.", img("18.08.b2", "Reverse the water-level difference", "Exploring Geology · Fig. 18.08.b2"));
    fill("recall", "18.8", "What term describes the energy per unit weight of water expressed as a height?", ["hydraulic head", "a hydraulic head", "an hydraulic head"], "Water descending from the reservoir drives the turbine, whose rotating shaft transfers mechanical energy to the generator.");
    mc("dam-site", "Connect 18:assignment Q6", "Which observation favors the dam site before engineers evaluate its possible leakage paths?",
      ["*The narrow, deep canyon at location 1.", "Permeable rock in the abutment at location 2.", "A fractured fault zone beneath location 4.", "The weak rock unit exposed at location 5."],
      "A narrow canyon can accommodate a shorter dam wall. Permeable or fractured rock can leak, and weak rock can compromise support.", img("dam-site", "Numbered canyon, abutment, reservoir floor, fault, and weak rocks", "Connect · Chapter 18 · assignment Q6"));
    mc("extend-2-18-08-t1", "18.08.t1", "Why can a dam gradually lose storage while the downstream river becomes sediment-starved?",
      ["*Sediment settles in the reservoir before water is released.", "All sediment passes through the dam faster than the water.", "The reservoir permanently stops weathering upstream.", "Power generation consumes the sediment as a fuel."],
      "The reservoir traps part of the incoming sediment load, affecting both storage space and downstream transport.");
    match("dam-tradeoffs", "Connect 18:assignment Q1", "Classify each consequence of constructing and operating the dam.", [["No fuel combustion at the turbine", "Operational benefit"], ["Reservoir storage for flood control and recreation", "Operational benefit"], ["Rapid adjustment of generation by changing water flow", "Operational benefit"], ["Reduced downstream sediment and nutrient delivery", "Environmental or storage cost"], ["Loss of reservoir capacity as sediment settles", "Environmental or storage cost"], ["Inundation of the upstream valley", "Environmental or storage cost"]], "Water storage and controlled releases create benefits. The same interruption of flow inundates land and changes sediment transport.");
    write("explain", "18.8", "Compare the source of the driving force at a hydroelectric dam and a tidal barrage.",
      "A river dam maintains a reservoir above its outflow. A tidal barrage uses a changing difference between sea and basin levels. In both cases moving water turns turbines linked to generators.", ["Explain reservoir head", "Explain changing tidal head", "Identify the common conversion"], img("18.08.a1", "Turn the turbine", "Exploring Geology · Fig. 18.08.a1"));
  });

  section(9, "Geothermal, wind, solar, and biomass energy", "Geothermal, wind, solar, and biomass energy", [
    group("Trace geothermal circulation", "18.09.a1", [img("18.09.a1", "Trace geothermal circulation", "Exploring Geology · Fig. 18.09.a1")], [
      term("Geothermal energy", "energy obtained from heat within Earth") + ".",
      "Water circulating through hot rock absorbs heat and may return along fractures, bringing energy closer to the surface.",
      "Hot rock provides heat, while permeable fractures and a fluid pathway allow that heat to reach a well or spring. Geothermal energy is strongly influenced by the local geological setting.",
      "Geothermal water may exceed the surface boiling temperature at depth because it is pressurized. Wind projects can affect birds and produce noise. Biomass can include plant waste as well as food crops."
    ], "Read the figure", "Distinguish a heat source from an accessible fluid pathway.", []),
    group("Convert moving air to electricity", "18.09.b1", [img("18.09.b1", "Convert moving air to electricity", "Exploring Geology · Fig. 18.09.b1")], [
      term("Wind energy", "kinetic energy in moving air that a rotor can convert into mechanical work") + ".",
      "Flowing air turns the blades, while the generator converts the rotating shaft’s mechanical energy into electricity.",
      "Wind turbines use moving air. Photovoltaic panels convert sunlight to electricity, solar thermal systems collect heat, and biomass supplies chemical energy. Each depends on a different resource and site condition.",
      "Passive solar design admits or shades sunlight without circulating fluid. A photovoltaic cell makes electricity, while active solar thermal equipment captures and transfers heat. Wind and direct solar output vary with local conditions."
    ], "Read the figure", "Name the input energy before tracing the output.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.9", "Hot rock lies at shallow depth beneath two sites. Which observation favors geothermal circulation at one site?",
      ["*Connected fractures allow water to move through the hot rock.", "The exposed rocks have the darkest surface color.", "The site has the highest annual wind speed.", "A nearby valley faces the afternoon sunlight."],
      "Circulating fluid transports heat from underground rock. Moving air delivers kinetic energy to a wind rotor. Each system must convert its input into mechanical or electrical output.", undefined);
    mc("figure", "18.09.b1", "In the wind-farm photograph, which part performs the first conversion of wind energy into mechanical motion?",
      ["*The rotor blades in the moving air.", "The generator’s electrical output cable.", "The foundation anchoring each tower.", "The rocks exposed on the distant hills."],
      "Flowing air turns the blades, while the generator converts the rotating shaft’s mechanical energy into electricity. Wind turbines use moving air. Photovoltaic panels convert sunlight to electricity, solar thermal systems collect heat, and biomass supplies chemical energy. Each depends on a different resource and site condition.", img("18.09.b1", "Convert moving air to electricity", "Exploring Geology · Fig. 18.09.b1"));
    fill("recall", "18.9", "What term describes energy obtained from heat within Earth?", ["geothermal energy", "a geothermal energy", "an geothermal energy"], "Water circulating through hot rock absorbs heat and may return along fractures, bringing energy closer to the surface.");
    mc("extend-2-18-09-c2", "18.09.c2", "A roof panel heats water that circulates into a tank. Which conversion occurs at the collector?",
      ["*Sunlight to heat in an active solar thermal system.", "Sunlight directly to electricity in a photovoltaic cell.", "Wind energy to heat in a stationary turbine.", "Heat from a deep aquifer to solar radiation."],
      "The transferred product is heat in a fluid. A photovoltaic cell instead supplies electrical energy.");
    match("energy-claims", "Connect 18:assignment Q2", "Classify each claim about alternative energy under the conditions described.", [["A photovoltaic panel converts sunlight into electricity", "Supported"], ["A wind farm may create noise or affect birds", "Supported"], ["Geothermal fluids can heat buildings or supply a generating plant", "Supported"], ["Pressurized geothermal water can exceed the surface boiling temperature", "Supported"], ["Sunlight alone provides continuous photovoltaic output through the night", "Unsupported"], ["A wind turbine generates its rated power at all wind speeds", "Unsupported"], ["Passive solar heating always requires powered pumps", "Unsupported"], ["Only the edible part of corn can supply biomass energy", "Unsupported"]], "Match each claim to its energy source and operating conditions. Stored energy and direct generation are distinct.");
    write("explain", "18.9", "Compare geothermal generation and wind generation by identifying what brings energy to each machine.",
      "Circulating fluid transports heat from underground rock. Moving air delivers kinetic energy to a wind rotor. Each system must convert its input into mechanical or electrical output.", ["Identify subsurface heat transport", "Identify the wind input", "Describe conversion"], img("18.09.a1", "Trace geothermal circulation", "Exploring Geology · Fig. 18.09.a1"));
  });

  section(10, "Concentration, grade, and ore", "Concentration, grade, and ore", [
    group("Identify the concentrated mineral", "18.10.a2", [img("18.10.a2", "Identify the concentrated mineral", "Exploring Geology · Fig. 18.10.a2")], [
      term("Grade", "the concentration of a valuable constituent in a deposit") + ".",
      "A rock may contain a valuable mineral, but its grade tells you how much of that material occurs per unit of rock.",
      "Natural enrichment makes a mineral concentration geologically distinctive. Grade alone does not determine value. Tonnage, depth, access, recovery, processing costs, and price help determine whether it can be mined.",
      "Metals can concentrate as magma cools, hot fluids deposit minerals, or surface water reworks sediment. Evaporation can also concentrate dissolved constituents until minerals precipitate."
    ], "Read the figure", "Distinguish the amount of material from its concentration.", []),
    group("Distinguish a deposit from ore", "18.10.b3", [img("18.10.b3", "Distinguish a deposit from ore", "Exploring Geology · Fig. 18.10.b3")], [
      term("Ore", "material from which a valuable constituent can be extracted economically under current conditions") + ".",
      "A mine must recover enough value to cover extraction and processing, so a change in price or cost can change what counts as ore.",
      "Changing prices or technology can change economic viability even when the rocks remain physically identical. Larger tonnage may compensate for lower grade in some settings."
    ], "Read the figure", "Identify which change is geological and which is economic.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.10", "The grade and tonnage of a deposit stay constant but processing becomes cheaper. Which outcome is possible?",
      ["*A previously uneconomic deposit becomes ore.", "The host rock automatically gains a higher metal concentration.", "The deposit necessarily becomes smaller in volume.", "The mineral grains become younger than their host."],
      "Grade measures concentration in the rock. Revenue, recovery, and costs determine economic feasibility. Changing prices or processing costs can alter feasibility without changing geology.", undefined);
    mc("figure", "18.10.b3", "What does the large open pit indicate about evaluating a deposit?",
      ["*The volume of rock moved can matter alongside its grade.", "All material in every bench has the same grade.", "Every exposed mineral is a saleable product.", "The pit shape alone gives the current metal price."],
      "A mine must recover enough value to cover extraction and processing, so a change in price or cost can change what counts as ore. Changing prices or technology can change economic viability even when the rocks remain physically identical. Larger tonnage may compensate for lower grade in some settings.", img("18.10.b3", "Distinguish a deposit from ore", "Exploring Geology · Fig. 18.10.b3"));
    fill("recall", "18.10", "What term describes the concentration of a valuable constituent in a deposit?", ["grade", "a grade", "an grade"], "A rock may contain a valuable mineral, but its grade tells you how much of that material occurs per unit of rock.");
    mc("extend-1-18-10-c4", "18.10.c4", "Which deposit most directly records concentration by evaporation?",
      ["*Gypsum precipitated from a restricted body of water.", "Gold left behind as a stream transports lighter gravel.", "Copper in a fracture next to a cooling intrusion.", "Nickel sulfides concentrated in a magma chamber."],
      "Loss of water concentrates dissolved ions until an evaporite mineral precipitates.");
    write("explain", "18.10", "Explain how the same rock could be classified as ore in one year but uneconomic in another.",
      "Grade measures concentration in the rock. Revenue, recovery, and costs determine economic feasibility. Changing prices or processing costs can alter feasibility without changing geology.", ["Define grade", "Identify economic factors", "Separate classification from physical change"], img("18.10.a2", "Identify the concentrated mineral", "Exploring Geology · Fig. 18.10.a2"));
  });

  section(11, "Precious metals in veins and placers", "Precious metals in veins and placers", [
    group("Deposit minerals in a vein", "18.11.a1", [img("18.11.a1", "Deposit minerals in a vein", "Exploring Geology · Fig. 18.11.a1")], [
      term("Hydrothermal vein", "a mineral-filled fracture formed by deposition from hot fluids") + ".",
      "As hot water moves through fractures near an intrusion, changes in temperature or chemistry can cause metal-bearing minerals to precipitate.",
      "Hydrothermal deposits can form when fluids enter fractures and then cool, mix, or react with wall rock. Mineral deposition leaves a vein in place within its host."
    ], "Read the figure", "Look for evidence of a fluid pathway before inferring transport by a stream.", []),
    group("Concentrate dense grains", "18.11.a3", [img("18.11.a3", "Concentrate dense grains", "Exploring Geology · Fig. 18.11.a3")], [
      term("Placer deposit", "a concentration of dense, durable grains sorted by moving water or waves") + ".",
      "When a stream reworks sediment containing gold, dense grains can remain in gravel while lighter material is carried farther downstream.",
      "Weathering can free gold from a bedrock source. Stream transport and hydraulic sorting can concentrate dense particles in gravel, sometimes far from the original vein.",
      "Gold occurs in stream gravels in Alaska and in many western bedrock deposits, including disseminated deposits in Nevada. Platinum-rich layers in a major South African mafic intrusion record crystallization of magma, a different process from placer sorting."
    ], "Read the figure", "Distinguish where the metal formed from where it accumulated.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.11", "A miner finds rounded gold grains in gravel downstream from mineralized bedrock. Which process best explains the gravel deposit?",
      ["*Mechanical transport and density sorting.", "Direct precipitation from magma beneath the channel.", "Burial conversion of organic-rich sediment.", "Leaching of copper beneath a regional water table."],
      "A fluid first deposits gold in a fracture. Weathering releases grains, and moving water transports and sorts them. Dense grains collect in favorable parts of a stream deposit.", undefined);
    mc("figure", "18.11.a3", "In the stream diagram, why is the gravel a better placer target than the unweathered rock beneath it?",
      ["*It can retain dense grains as the stream sorts sediment.", "It is always hotter than the underlying bedrock.", "Every gravel deposit contains gold at ore grade.", "The stream converts quartz pebbles directly into gold."],
      "When a stream reworks sediment containing gold, dense grains can remain in gravel while lighter material is carried farther downstream. Weathering can free gold from a bedrock source. Stream transport and hydraulic sorting can concentrate dense particles in gravel, sometimes far from the original vein.", img("18.11.a3", "Concentrate dense grains", "Exploring Geology · Fig. 18.11.a3"));
    fill("recall", "18.11", "What term describes a mineral-filled fracture formed by deposition from hot fluids?", ["hydrothermal vein", "a hydrothermal vein", "an hydrothermal vein"], "As hot water moves through fractures near an intrusion, changes in temperature or chemistry can cause metal-bearing minerals to precipitate.");
    mc("extend-2-18-11-c1", "18.11.c1", "Which setting points most strongly to primary magmatic concentration of platinum?",
      ["*A mineralized layer within a mafic intrusion.", "Rounded grains in an abandoned river channel.", "A quartz vein cutting a weathered volcanic rock.", "A groundwater precipitate below the water table."],
      "Layering within an intrusion can record crystallization and concentration during cooling.");
    write("explain", "18.11", "Explain how the same gold could pass through both a vein deposit and a placer deposit.",
      "A fluid first deposits gold in a fracture. Weathering releases grains, and moving water transports and sorts them. Dense grains collect in favorable parts of a stream deposit.", ["Identify vein formation", "Describe liberation", "Explain sorting"], img("18.11.a1", "Deposit minerals in a vein", "Exploring Geology · Fig. 18.11.a1"));
  });

  section(12, "Iron, copper, and secondary enrichment", "Iron, copper, and secondary enrichment", [
    group("Build the iron-rich layers", "18.12.a1", [img("18.12.a1", "Build the iron-rich layers", "Exploring Geology · Fig. 18.12.a1")], [
      term("Banded iron formation", "a layered sedimentary deposit with alternating iron-rich and silica-rich beds") + ".",
      "Iron once dissolved in water was precipitated into sediment, leaving repeated iron-rich layers interbedded with silica-rich material.",
      "Banded iron formations preserve chemical precipitation in ancient waters. Other base metals occur in different settings, including magmatic intrusions, seafloor sulfide systems, and deposits formed by circulating fluids.",
      "At seafloor vents, hot metal-bearing fluids meet cold seawater and precipitate sulfides. In contrast, some continental lead-zinc deposits form where groundwater carries metals through permeable rocks and deposits them in a favorable host."
    ], "Read the figure", "Compare the host rock and mineral geometry before assigning an origin.", []),
    group("Move copper below the surface", "18.12.c1", [img("18.12.c1", "Move copper below the surface", "Exploring Geology · Fig. 18.12.c1"), img("six-metal-settings", "Numbered locations · six metal settings", "Connect · Chapter 18 · assignment Q3")], [
      term("Secondary enrichment", "concentration of a metal by weathering, transport, and redeposition") + ".",
      "Water leaches copper from the upper rock and carries it downward, where changed chemical conditions can cause it to precipitate again.",
      "In a weathered copper deposit, dissolved copper moves away from an oxidized upper zone. Chemical changes near or below the water table can precipitate copper and enrich a deeper interval."
    ], "Read the figure", "Trace the metal from the leached zone to the enriched zone.", ["Connect 18:assignment Q3"])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.12", "A copper-rich layer is found below a weathered, copper-poor cap. Which interpretation fits the vertical arrangement?",
      ["*Downward transport followed by precipitation at depth.", "Concentration by wave sorting on a beach.", "Sorting of iron droplets in a magma chamber.", "Uniform enrichment of the entire rock column."],
      "Iron-bearing material precipitated in water and accumulated with silica-rich layers. In secondary enrichment, weathering mobilizes copper from an existing rock and redeposits it deeper in the profile.", undefined);
    mc("figure", "18.12.c1", "What does the water table separate in the illustrated copper profile?",
      ["*An upper leached zone and a lower precipitation zone.", "Two coal seams of different thermal rank.", "A gas cap and an oil-water contact.", "Crystalline basement and a modern stream placer."],
      "Water leaches copper from the upper rock and carries it downward, where changed chemical conditions can cause it to precipitate again. In a weathered copper deposit, dissolved copper moves away from an oxidized upper zone. Chemical changes near or below the water table can precipitate copper and enrich a deeper interval.", img("18.12.c1", "Move copper below the surface", "Exploring Geology · Fig. 18.12.c1"));
    fill("recall", "18.12", "What term describes a layered sedimentary deposit with alternating iron-rich and silica-rich beds?", ["banded iron formation", "a banded iron formation", "an banded iron formation"], "Iron once dissolved in water was precipitated into sediment, leaving repeated iron-rich layers interbedded with silica-rich material.");
    match("six-metal-settings", "Connect 18:assignment Q3", "Match all six geological settings to their mineral-forming processes.",
      [["Location 1", "Precious metals in hot waters"], ["Location 2", "Gold pieces in ancient rivers"], ["Location 3", "Platinum in crystallizing magma"], ["Location 4", "Iron layers on seafloor"], ["Location 5", "Base metals in seafloor black smokers"], ["Location 6", "Base metals from flowing groundwater"]], "Find the fracture near the intrusion, the buried stream gravel, and the igneous layers. Across the lower row distinguish bedded iron, a hydrothermal seafloor vent, and a mineralized groundwater pathway.", img("six-metal-settings", "Numbered locations · six metal settings", "Connect · Chapter 18 · assignment Q3"));
    mc("extend-1-18-12-b3", "18.12.b3", "What connects a seafloor black smoker to a nearby sulfide deposit?",
      ["*Precipitation when hot metal-bearing fluid meets seawater.", "Density sorting of gold grains in coastal beaches.", "Heating of buried peat in an isolated marine basin.", "Evaporation of freshwater on a dry lake bed."],
      "Cooling and changes in fluid chemistry at the vent cause minerals to precipitate.");
    write("explain", "18.12", "Compare the origin of banded iron formation with secondary copper enrichment.",
      "Iron-bearing material precipitated in water and accumulated with silica-rich layers. In secondary enrichment, weathering mobilizes copper from an existing rock and redeposits it deeper in the profile.", ["Explain iron sediment formation", "Identify the preexisting copper source", "Trace redistribution"], img("18.12.a1", "Build the iron-rich layers", "Exploring Geology · Fig. 18.12.a1"));
  });

  section(13, "Finding and testing buried mineral deposits", "Finding and testing buried mineral deposits", [
    group("Map the geological setting", "18.13.a1", [img("18.13.a1", "Map the geological setting", "Exploring Geology · Fig. 18.13.a1"), img("magnetic-traverse", "Magnetic survey trace across a concealed target", "Connect · Chapter 18 · assessment Q16")], [
      term("Alteration halo", "a zone where fluid–rock reactions changed the minerals around a deposit") + ".",
      "Mineralized fractures and altered rocks give the geologist a target to map and sample across the surrounding terrain.",
      "A geologic map narrows a search by identifying host rocks, structures, and alteration. Geochemical samples test whether selected elements are anomalously concentrated relative to local background."
    ], "Read the figure", "An anomalous sample is a lead that needs spatial context.", []),
    group("Connect an anomaly with its possible source", "18.13.c1", [img("18.13.c1", "Connect an anomaly with its possible source", "Exploring Geology · Fig. 18.13.c1")], [
      term("Geophysical anomaly", "a measured departure from the surrounding physical signal") + ".",
      "A magnetic high can identify a target beneath cover, but drilling and sampling are needed to determine what produces the anomaly.",
      "Magnetic, gravity, or electrical methods respond to physical properties that may differ between a deposit and its host. Similar anomalies can have different causes. Drilling provides direct material for testing.",
      "A shallow deposit may be mined in an open pit. Deeper bodies may need underground access. Processing separates valuable material from waste, leaving tailings that can affect water quality if poorly managed."
    ], "Read the figure", "Compare the anomaly with a geological model and independent samples.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.13", "A magnetic survey has a prominent high. Which next step best tests an ore interpretation?",
      ["*Check geology and sample or drill the inferred source.", "Estimate profit from the height of the peak alone.", "Assume all strongly magnetic rock contains saleable ore.", "Ignore the background rock because only the peak matters."],
      "An anomaly indicates a contrast in physical or chemical properties. Several rock types could produce it. Samples and drilling must establish composition, extent, and grade before economics can be evaluated.", undefined);
    mc("figure", "18.13.c1", "In the profile above the buried body, what does the peak measure?",
      ["*A change in magnetic signal over a possible target.", "A direct measurement of recoverable tonnage.", "A uniquely determined percentage of valuable metal.", "The exact thickness of every bed in the profile."],
      "A magnetic high can identify a target beneath cover, but drilling and sampling are needed to determine what produces the anomaly. Magnetic, gravity, or electrical methods respond to physical properties that may differ between a deposit and its host. Similar anomalies can have different causes. Drilling provides direct material for testing.", img("18.13.c1", "Connect an anomaly with its possible source", "Exploring Geology · Fig. 18.13.c1"));
    fill("recall", "18.13", "What term describes a zone where fluid–rock reactions changed the minerals around a deposit?", ["alteration halo", "a alteration halo", "an alteration halo"], "Mineralized fractures and altered rocks give the geologist a target to map and sample across the surrounding terrain.");
    mc("magnetic-traverse", "Connect 18:assessment Q16", "Which part of the traverse would you sample first for a localized magnetic source?",
      ["*The narrow peak above the neighboring background.", "The long middle stretch with little change.", "The far-right return toward background.", "The left-hand baseline before the rise."],
      "The narrow positive departure identifies a local contrast worth testing. Its height alone cannot establish metal grade.", img("magnetic-traverse", "Magnetic survey trace across a concealed target", "Connect · Chapter 18 · assessment Q16"));
    mc("extend-2-18-13-d1", "18.13.d1", "What distinguishes tailings from the original overburden?",
      ["*Tailings remain after ore is processed.", "Tailings cover a deposit before any mining.", "Tailings consist only of the recovered metal.", "Tailings are unbroken rock below a future shaft."],
      "Overburden is removed to reach the ore. Tailings are residual material after processing.");
    write("explain", "18.13", "Explain why an exploration anomaly is evidence for a target but cannot establish an ore reserve.",
      "An anomaly indicates a contrast in physical or chemical properties. Several rock types could produce it. Samples and drilling must establish composition, extent, and grade before economics can be evaluated.", ["Identify what is measured", "Consider alternative causes", "Require direct testing"], img("18.13.a1", "Map the geological setting", "Exploring Geology · Fig. 18.13.a1"));
  });

  section(14, "Industrial rocks and construction materials", "Industrial rocks and construction materials", [
    group("Assemble concrete", "18.14.a3", [img("18.14.a3", "Assemble concrete", "Exploring Geology · Fig. 18.14.a3")], [
      term("Aggregate", "sand, gravel, or crushed stone used as the granular part of a construction material") + ".",
      "Coarse and fine aggregate make up much of concrete, while cement mixed with water binds the grains together.",
      "Cement is a binder manufactured from processed raw materials that include limestone. Concrete combines cement, water, fine aggregate, and coarse aggregate. Gypsum, dimension stone, and salt serve different industrial uses.",
      "Gypsum is an evaporite used in wallboard and plaster. Clay is used in bricks and ceramics. Limestone supplies raw material for cement. These uses depend on mineral or rock properties even when no metal is extracted."
    ], "Read the figure", "Separate a manufactured mixture from its binder.", []),
    group("Separate useful grain sizes", "18.14.c2", [img("18.14.c2", "Separate useful grain sizes", "Exploring Geology · Fig. 18.14.c2")], [
      term("Industrial mineral", "a mineral used for its physical or chemical properties in products or processes") + ".",
      "A quarry can crush and screen material to supply different sizes, so grain size and durability matter as much as chemical composition.",
      "A stream deposit or quarry can supply aggregate if its size, durability, composition, and transport cost suit the use. Dimension stone instead must yield intact blocks of suitable appearance and strength."
    ], "Read the figure", "Choose the property required by the intended product.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.14", "Which material should a supplier deliver when a specification calls for the binder in concrete?",
      ["*Cement.", "Coarse aggregate.", "Sand.", "Dimension stone."],
      "Aggregate can use small, durable fragments with the required size range. Dimension stone requires sound blocks large enough to cut into slabs. Closely spaced fractures can prevent that use.", undefined);
    mc("figure", "18.14.c2", "What purpose does the equipment in the aggregate-processing photograph serve?",
      ["*Crushing and sorting rock into useful sizes.", "Melting limestone into metallic iron.", "Separating oil from dissolved natural gas.", "Converting feldspar directly into dimension stone."],
      "A quarry can crush and screen material to supply different sizes, so grain size and durability matter as much as chemical composition. A stream deposit or quarry can supply aggregate if its size, durability, composition, and transport cost suit the use. Dimension stone instead must yield intact blocks of suitable appearance and strength.", img("18.14.c2", "Separate useful grain sizes", "Exploring Geology · Fig. 18.14.c2"));
    fill("recall", "18.14", "What term describes sand, gravel, or crushed stone used as the granular part of a construction material?", ["aggregate", "a aggregate", "an aggregate"], "Coarse and fine aggregate make up much of concrete, while cement mixed with water binds the grains together.");
    mc("extend-1-18-14-b1", "18.14.b1", "Which rock-to-product pairing is supported by the chapter?",
      ["*Gypsum and wallboard.", "Halite and structural dimension granite.", "Sandstone and metallic copper concentrate.", "Coal and the binder in Portland cement."],
      "Gypsum is a useful nonmetallic mineral whose properties suit plaster and wallboard.");
    write("explain", "18.14", "Explain why a rock suitable for crushed aggregate might be unsuitable for dimension stone.",
      "Aggregate can use small, durable fragments with the required size range. Dimension stone requires sound blocks large enough to cut into slabs. Closely spaced fractures can prevent that use.", ["Identify aggregate requirements", "Identify block requirements", "Explain the role of fractures"], img("18.14.a3", "Assemble concrete", "Exploring Geology · Fig. 18.14.a3"));
  });

  section(15, "Wyoming’s uplifts, basins, and energy resources", "Wyoming’s uplifts, basins, and energy resources", [
    group("Read the mountain–basin section", "18.15.a2", [img("18.15.a2", "Read the mountain–basin section", "Exploring Geology · Fig. 18.15.a2")], [
      term("Basement uplift", "an elevated block that exposes or raises older basement rocks") + ".",
      "Wyoming’s uplifts expose older rocks while adjacent basins preserve thick sedimentary sequences that can contain fossil fuels.",
      "Uplift, folding, erosion, and deposition reorganized the region. Some uplifts expose crystalline basement, while adjacent basins preserve sedimentary rocks and burial histories favorable to oil, gas, and coal."
    ], "Read the figure", "Compare basin fill with rocks exposed on mountain crests.", []),
    group("Compare the coal and gas fields", "18.15.b2", [img("18.15.b2", "Compare the coal and gas fields", "Exploring Geology · Fig. 18.15.b2")], [
      term("Coal-bed methane", "methane stored in a coal seam and its fracture system") + ".",
      "A coal seam may be too deep for economical surface mining yet still be reachable by wells that extract methane.",
      "The extent of mapped coal-bearing rocks differs from the area of economically accessible coal. Wells can reach methane in buried seams where surface mining is impractical.",
      "Wyoming’s resources include geothermal heat associated with recent volcanism near Yellowstone and uranium concentrated by groundwater in sandstone. Each needs a geological explanation distinct from preservation of coal in a basin."
    ], "Read the figure", "Compare what each map symbol actually represents.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.15", "Why can a basin contain both shallow coal mines and methane wells tapping deeper coal?",
      ["*The same coal-bearing succession occurs at different depths.", "Each producing well must sit directly inside an active coal pit.", "The crystalline mountain cores generated all basin methane.", "Surface mining requires greater depth than gas extraction."],
      "Uplifts expose and erode older rocks. Adjacent basins preserve and bury sedimentary sequences, allowing coal to survive and source rocks to mature. Depth and traps affect which resource is accessible.", undefined);
    mc("figure", "18.15.b2", "On the resource map, why can coal-bed methane extend beyond the mapped mine areas?",
      ["*Wells can reach a seam beneath thicker overburden.", "Methane forms only in areas where coal has been removed.", "Every unmined part of the state contains a gas reservoir.", "The mapped gases necessarily migrated from distant volcanoes."],
      "A coal seam may be too deep for economical surface mining yet still be reachable by wells that extract methane. The extent of mapped coal-bearing rocks differs from the area of economically accessible coal. Wells can reach methane in buried seams where surface mining is impractical.", img("18.15.b2", "Compare the coal and gas fields", "Exploring Geology · Fig. 18.15.b2"));
    fill("recall", "18.15", "What term describes an elevated block that exposes or raises older basement rocks?", ["basement uplift", "a basement uplift", "an basement uplift"], "Wyoming’s uplifts expose older rocks while adjacent basins preserve thick sedimentary sequences that can contain fossil fuels.");
    mc("extend-2-18-15-b3", "18.15.b3", "Which pairing best fits two different Wyoming settings?",
      ["*Geothermal heat near young volcanism and coal in sedimentary basins.", "Geothermal heat confined to coal seams and coal in granite cores.", "Coal seams in young lava flows and geothermal heat from placer gold.", "Uranium only in modern stream gravels and coal only in hot springs."],
      "The geothermal and fossil-fuel resources depend on different heat, rock, and burial histories.");
    write("explain", "18.15", "Explain how uplift and basin formation help explain Wyoming’s uneven resource distribution.",
      "Uplifts expose and erode older rocks. Adjacent basins preserve and bury sedimentary sequences, allowing coal to survive and source rocks to mature. Depth and traps affect which resource is accessible.", ["Compare uplift and basin", "Connect burial to resources", "Explain accessibility"], img("18.15.a2", "Read the mountain–basin section", "Exploring Geology · Fig. 18.15.a2"));
  });

  section(16, "Evaluate the Tan Mountain prospect", "Evaluate the Tan Mountain prospect", [
    group("Trace the reservoir bed", "18.16.a1", [img("18.16.a1", "Trace the reservoir bed", "Exploring Geology · Fig. 18.16.a1"), img("tan-mountain-targets", "Lettered reservoir prospects at Tan Mountain", "Connect · Chapter 18 · assignment Q13–15")], [
      term("Structural closure", "a geometry that prevents buoyant hydrocarbons from continuing updip") + ".",
      "Trace the sandstone around Tan Mountain and below the surface, then look for a seal above the highest connected part of the reservoir.",
      "Sandstone dipping away from both flanks of the ridge supports an anticline interpretation. The column and cross section help project that bed below cover and test whether it closes beneath an impermeable unit."
    ], "Read the figure", "Compare the surface trace with the section before siting a test.", []),
    group("Test the rock sequence", "18.16.a2", [img("18.16.a2", "Test the rock sequence", "Exploring Geology · Fig. 18.16.a2")], [
      term("Petroleum system", "the source, migration path, reservoir, seal, and timing needed for an accumulation") + ".",
      "A folded bed alone is insufficient evidence of petroleum, so use the column to test whether suitable source and sealing rocks are present.",
      "Coal seams, organic-rich rock, salt, and potential reservoir sandstone imply different opportunities. A seep or trace of petroleum supports a source hypothesis, while recoverable volumes require further tests."
    ], "Read the figure", "Separate an indicator from a proved accumulation.", [])
  ], ({mc, fill, match, write}) => {
    mc("apply", "18.16", "A ridge is underlain by porous sandstone that dips away on both sides. What additional evidence most improves its case as a trap?",
      ["*A continuous seal over a closed part of the sandstone.", "A coal seam exposed on a different ridge.", "A river flowing parallel to the road.", "Loose sand collected from a nearby modern stream."],
      "Opposing dips support a folded sandstone reservoir. A low-permeability cover could close the updip path, and organic-rich strata could supply hydrocarbons. A well can test thickness, fluids, and seal integrity.", undefined);
    mc("figure", "18.16.a1", "Which observation specifically supports a fold crest at Tan Mountain?",
      ["*The same sandstone dips away on both sides of the ridge.", "The youngest alluvium follows the modern channels.", "The landscape contains a road that crosses the ridge.", "A circular salt exposure lies elsewhere in the area."],
      "Trace the sandstone around Tan Mountain and below the surface, then look for a seal above the highest connected part of the reservoir. Sandstone dipping away from both flanks of the ridge supports an anticline interpretation. The column and cross section help project that bed below cover and test whether it closes beneath an impermeable unit.", img("18.16.a1", "Trace the reservoir bed", "Exploring Geology · Fig. 18.16.a1"));
    fill("recall", "18.16", "What term describes a geometry that prevents buoyant hydrocarbons from continuing updip?", ["structural closure", "a structural closure", "an structural closure"], "Trace the sandstone around Tan Mountain and below the surface, then look for a seal above the highest connected part of the reservoir.");
    mc("tan-mountain-targets", "Connect 18:assignment Q13–15", "Which pair of possible trapping mechanisms fits locations E beside the salt and F beside the offset beds?",
      ["*Salt-flank closure at E and fault sealing at F.", "Fault sealing at E and placer sorting at F.", "Stratigraphic thinning at E and tidal deposition at F.", "Placer sorting at E and salt dissolution at F."],
      "At E, a permeable bed may terminate against impermeable salt. At F an offset or sealing fault can interrupt updip migration. Both interpretations still require a charged reservoir.", img("tan-mountain-targets", "Lettered reservoir prospects at Tan Mountain", "Connect · Chapter 18 · assignment Q13–15"));
    write("explain", "18.16", "Use two independent geological observations to propose a testable petroleum target at Tan Mountain.",
      "Opposing dips support a folded sandstone reservoir. A low-permeability cover could close the updip path, and organic-rich strata could supply hydrocarbons. A well can test thickness, fluids, and seal integrity.", ["Use the dip evidence", "Identify a source and seal", "Name a decisive test"], img("18.16.a1", "Trace the reservoir bed", "Exploring Geology · Fig. 18.16.a1"));
  });

})(window.L);
