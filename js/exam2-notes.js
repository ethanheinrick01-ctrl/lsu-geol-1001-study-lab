/* Reading layout only: curated headings and exact-text points for Chapters 7–8.
 * Source data, assessments and saved-progress objects are never mutated. */
(function(L){
  'use strict';
  var plans={
  "g7-1a": [
    {
      "heading": "Streams and floodplains",
      "points": [
        "Begin with the setting, then ask what transports sediment and where it loses energy.",
        "Steep mountain streams can move gravel and boulders.",
        "A stream can split and rejoin into braided channels; on gentler terrain, meandering channels flood adjacent flat land.",
        "Fluvial means stream or river processes.",
        "Floodplains accumulate mud and sand during floods."
      ]
    },
    {
      "heading": "Other land environments",
      "points": [
        "A delta grows where a stream enters standing water and slows.",
        "Wind selectively moves sand and finer particles; dunes commonly contain well-sorted sand.",
        "Glaciers carry a wide size range and release sediment as they melt.",
        "Lakes combine active shorelines with quieter deeper water.",
        "Wetlands preserve plant material where saturation limits oxidation."
      ]
    },
    {
      "heading": "Clues for identifying an environment",
      "points": [
        "Use several clues together: grain size, sorting, sedimentary structures, and plant or shell remains.",
        "A single sandstone does not uniquely identify a desert.",
        "Compare modern environments with the original overview before interpreting an ancient rock."
      ]
    }
  ],
  "g7-intro": [
    {
      "heading": "Follow the Fraser River",
      "points": [
        "The chapter introduction follows the Fraser River through southwestern British Columbia.",
        "Mountain streams, lakes, glaciers, and tributaries supply sediment to the river.",
        "Its branching and rejoining channels illustrate a braided river.",
        "At the Strait of Georgia, slowing flow disperses sediment and builds a delta near Vancouver."
      ]
    },
    {
      "heading": "Track one sediment grain",
      "points": [
        "Follow one grain through this system: weathering produces it, erosion removes it, a stream transports it, and decreasing flow allows deposition.",
        "Coarse and fine material respond differently.",
        "The delta can grow seaward as material accumulates.",
        "An ancient deposit must be interpreted from textures and structures, because the modern river and coastline may no longer exist."
      ]
    },
    {
      "heading": "Why sediment matters",
      "points": [
        "Vancouver also illustrates the human importance of sediment.",
        "Broad sediment-covered plains provide land for building and agriculture; pore spaces hold groundwater.",
        "This supplied example connects environment, process, preserved rock, and resources."
      ]
    }
  ],
  "g7-2a": [
    {
      "heading": "Beaches, lagoons, reefs, and barriers",
      "points": [
        "Beaches accumulate sediment moved by waves and currents; their grains depend on local supply.",
        "A lagoon is sheltered water behind a reef or barrier island.",
        "A reef is constructed by organisms, commonly in shallow, warm, clear water.",
        "A barrier island is a long, narrow sand body separated from shore by lagoon or marsh."
      ]
    },
    {
      "heading": "Offshore transport and deposition",
      "points": [
        "Continental shelves and slopes receive sand, mud, and carbonate sediment.",
        "Material can move downslope in a turbidity current, a sediment-laden water flow.",
        "Deep seafloor commonly receives fine dust and the remains of small marine organisms.",
        "Tidal flats alternate between flooding and exposure; coastal dunes form when wind moves shoreline sand inland."
      ]
    },
    {
      "heading": "Interpret the whole setting",
      "points": [
        "Distinguish a sheltered lagoon from open shelf water and a river delta from a reef.",
        "Ocean depth alone does not determine the sediment: supply, water clarity, organisms, and transport also matter."
      ]
    }
  ],
  "g7-3a": [
    {
      "heading": "Physical weathering",
      "points": [
        "Physical weathering breaks rock without requiring a chemical change.",
        "Near-surface fracturing, frost or mineral wedging, thermal expansion, and biological activity can loosen pieces.",
        "Expansion on unloading and roots growing in cracks are physical mechanisms.",
        "Thermal expansion is included in the textbook with a caution about its relative importance."
      ]
    },
    {
      "heading": "Chemical weathering",
      "points": [
        "Chemical weathering changes minerals.",
        "Dissolution carries soluble material away;",
        "oxidation combines susceptible material with oxygen;",
        "hydrolysis commonly turns silicate minerals into clay and dissolved products.",
        "Organisms can produce acids and drive chemical reactions."
      ]
    },
    {
      "heading": "Products and interacting processes",
      "points": [
        "Starting composition and environmental conditions determine the products.",
        "Resistant quartz can survive transport while less stable minerals break down.",
        "Physical breakup exposes fresh surfaces to chemical reactions, so both processes can work together.",
        "Weathering produces material; erosion removes it, and transport carries it elsewhere."
      ]
    }
  ],
  "g7-4a": [
    {
      "heading": "Grain size",
      "points": [
        "Describe size, roundness, and sorting independently.",
        "Gravel includes granules, pebbles, cobbles, and boulders;",
        "sand is smaller than gravel;",
        "silt and clay together are mud.",
        "The grain-size table in the original page is the authority for exact boundaries.",
        "Clay can refer to a particle size or a mineral group."
      ]
    },
    {
      "heading": "Roundness and sorting",
      "points": [
        "Angular grains have sharp edges; abrasion during transport can round them.",
        "Sorting describes the range of sizes.",
        "Well-sorted sediment has a narrow range; poorly sorted sediment mixes sizes.",
        "Rounding and sorting can develop during repeated transport, but do not infer a unique travel distance from either alone."
      ]
    },
    {
      "heading": "Transport controls",
      "points": [
        "The material transported depends on the agent, current strength, clast size and density, and available sediment.",
        "Wind selectively moves sand and finer particles; glaciers can carry a broad mixture.",
        "Strong water currents can move larger clasts than weak currents.",
        "Observe all three properties before assigning a rock name or environment."
      ]
    }
  ],
  "g7-5a": [
    {
      "heading": "Name the clastic rock",
      "points": [
        "Classify a clastic rock by the particles preserved within it.",
        "Rounded gravel forms conglomerate;",
        "angular gravel forms breccia.",
        "Sand forms sandstone;",
        "silt forms siltstone.",
        "Fine clay-rich sediment can form shale, whose aligned grains allow thin sheets to split apart.",
        "Quartz sandstone is quartz rich;",
        "arkose contains abundant feldspar;",
        "graywacke contains mixed grains and rock fragments."
      ]
    },
    {
      "heading": "Lithification: compaction and cementation",
      "points": [
        "Lithification changes loose sediment into rock.",
        "Compaction moves grains closer together and expels pore fluids.",
        "Cementation precipitates mineral material in the pores and binds grains.",
        "Compaction is particularly substantial in initially water-rich mud.",
        "Common cements include carbonate, silica, and iron-bearing material."
      ]
    },
    {
      "heading": "Separate texture from composition",
      "points": [
        "Composition, grain size, and roundness carry different information.",
        "Sandstone is a size-based name; feldspar content adds a compositional distinction.",
        "A red stain may be cement or oxidation rather than the original grains.",
        "Read the clast chart and the compaction sequence separately."
      ]
    }
  ],
  "g7-6a": [
    {
      "heading": "Chemical precipitation",
      "points": [
        "Some sedimentary rocks form from dissolved substances or organic material rather than chiefly from transported rock fragments.",
        "Evaporation concentrates dissolved ions and can precipitate evaporites, including rock salt and gypsum.",
        "Chemical precipitation also forms minerals where water chemistry changes."
      ]
    },
    {
      "heading": "Biological and organic origins",
      "points": [
        "Organisms extract dissolved substances to build shells and skeletons.",
        "Accumulation of carbonate remains can form limestone; silica-rich remains can contribute to chert.",
        "Plant material accumulates in waterlogged environments and, after burial and alteration, can form coal.",
        "These origins overlap: a biochemical rock can include fragments of organisms, yet its material originated through biological extraction from water."
      ]
    },
    {
      "heading": "Identify the dominant material",
      "points": [
        "Use the dominant material and formation process to interpret the rock.",
        "Halite is a mineral; rock salt is a rock composed mostly of halite.",
        "Coal records organic accumulation and preservation, whereas an evaporite records concentration and precipitation from water."
      ]
    }
  ],
  "g7-7a": [
    {
      "heading": "What beds record",
      "points": [
        "Beds preserve changes in sediment supply, current strength, environment, or sea level.",
        "A boundary can mark erosion or a pause in deposition; not every layer represents an equal amount of time.",
        "Layer thickness and composition must be interpreted with other evidence."
      ]
    },
    {
      "heading": "Graded beds and cross beds",
      "points": [
        "Graded bedding commonly places coarse grains at the bottom and successively finer grains above, recording waning current strength.",
        "A settling jar models this sorting.",
        "Cross beds are inclined layers within a larger bed, formed as dunes or ripples migrate.",
        "Their shape can preserve flow direction.",
        "Large cross beds commonly occur in wind-blown dunes; smaller examples also occur in streams and shorelines."
      ]
    },
    {
      "heading": "One bed versus a longer sequence",
      "points": [
        "Separate a graded bed from a whole sequence that changes upward.",
        "One event can produce a graded bed; a succession of environments can produce a longer fining- or coarsening-upward sequence.",
        "Observe contacts, internal layers, and grain-size trends before explaining the process."
      ]
    }
  ],
  "g7-8a": [
    {
      "heading": "Breccia: angular clasts",
      "points": [
        "Both rocks contain large clasts, so start by describing roundness.",
        "Breccia has angular fragments and commonly poor sorting.",
        "It forms where material is broken and accumulates with limited abrasion, including steep slopes, talus, landslides, and debris-flow deposits.",
        "Angular fragments alone do not prove one specific origin."
      ]
    },
    {
      "heading": "Conglomerate: rounded clasts",
      "points": [
        "Conglomerate contains rounded coarse clasts and finer matrix.",
        "Streams, beaches, and other energetic environments can transport coarse material and round it.",
        "Alluvial fans can preserve a mixture of stream and debris-flow deposits; environments are not defined by a single rock name."
      ]
    },
    {
      "heading": "Compare the supporting clues",
      "points": [
        "Compare size distribution, clast support versus matrix, bedding, and association with neighboring deposits.",
        "Grain rounding supports abrasion, while the coarse grain size supports transport or accumulation capable of handling large pieces."
      ]
    }
  ],
  "g7-9a": [
    {
      "heading": "Dunes, streams, and beaches",
      "points": [
        "Sandstone preserves sand-sized particles but can form in many environments.",
        "Wind dunes tend to be well sorted and can preserve large cross beds.",
        "Stream deposits may include channels, gravel, variable sorting, and smaller cross beds.",
        "Beach sand is repeatedly reworked by waves, but its composition depends on the local supply."
      ]
    },
    {
      "heading": "Deltas, shelves, and deeper water",
      "points": [
        "Deltas and offshore shelves accumulate sand carried from land.",
        "Turbidity currents move sediment into deeper settings.",
        "Compare bedding, fossils, grain composition, and adjacent units to distinguish these possibilities.",
        "Sand-sized particles alone do not identify a beach or desert."
      ]
    },
    {
      "heading": "Rock resistance and interpretation limits",
      "points": [
        "Sandstone commonly forms resistant cliffs or ledges where strongly cemented.",
        "The landscape depends on cement, fractures, climate, and neighboring rocks.",
        "A visible sand grain gives a textural observation; the environment remains an interpretation that needs several supporting attributes."
      ]
    }
  ],
  "g7-10a": [
    {
      "heading": "Silt, clay, mudstone, and shale",
      "points": [
        "Siltstone, mudstone, and shale preserve particles finer than sand.",
        "Silt commonly includes quartz and can feel gritty.",
        "Clay-sized particles are finer; clay-rich shale commonly splits into thin sheets because its minerals are aligned.",
        "Mud includes silt and clay."
      ]
    },
    {
      "heading": "Where fine sediment settles",
      "points": [
        "Fine sediment settles where energetic transport subsides: floodplains, quiet lake centers, sheltered coastal water, and offshore settings.",
        "Mud can also remain suspended and be transported far from a river mouth.",
        "Deposits may include thin sand layers from stronger events."
      ]
    },
    {
      "heading": "Color, fossils, and structures",
      "points": [
        "Color, fossils, and structures add environmental information.",
        "Dark organic-rich material can support low-oxygen preservation; mudcracks indicate drying and exposure.",
        "Fine-grained rocks often weather into gentler slopes, but lithification and local conditions affect their resistance."
      ]
    }
  ],
  "g7-11a": [
    {
      "heading": "Composition and carbonate components",
      "points": [
        "Limestone consists mainly of calcite;",
        "dolostone consists mainly of dolomite.",
        "Carbonate rocks may form through chemical precipitation, biological accumulation, or later chemical replacement.",
        "Shells, reef frameworks, carbonate mud, and rounded coated grains can contribute to limestone."
      ]
    },
    {
      "heading": "Carbonate settings and identification",
      "points": [
        "Warm, shallow marine water is an important carbonate setting, especially where little land-derived mud obscures the water.",
        "Reefs build skeletal material.",
        "Lakes and springs can also deposit carbonate, so limestone alone is not proof of a tropical ocean.",
        "Dissolution can give exposed limestone pits or irregular surfaces; dilute acid helps identify calcite."
      ]
    },
    {
      "heading": "Reconstruct the environment",
      "points": [
        "Read fossils, grain types, bedding, and associated deposits to reconstruct conditions.",
        "Carbonate cliffs versus rounded slopes depend partly on climate and erosion.",
        "Do not confuse a carbonate sedimentary rock with marble: marble records later metamorphism of carbonate rock."
      ]
    }
  ],
  "g7-12a": [
    {
      "heading": "Facies and shifting environments",
      "points": [
        "A facies is a body of sediment or rock with characteristics representing an environment.",
        "Moving shorelines shift facies laterally, producing a vertical succession at a fixed location."
      ]
    },
    {
      "heading": "Transgression versus regression",
      "points": [
        "In a transgression, the sea advances over land because sea level rises relative to the land.",
        "Beach sand may be overlain by offshore mud and then carbonate material: the site becomes more marine through time.",
        "In a regression, the sea retreats and shallower-water or land deposits overlie deeper-water deposits.",
        "Relative sea-level change can result from changing water level or vertical land movement."
      ]
    },
    {
      "heading": "Read shoreline movement and vertical stacking",
      "points": [
        "Follow both the shoreline and one fixed observation point in the source sequence.",
        "Lateral shifts and vertical stacking are different views of the same change.",
        "The exact rock sequence depends on which environments and sediment supplies exist; do not memorize sandstone–shale–limestone as a universal rule."
      ]
    }
  ],
  "g7-13a": [
    {
      "heading": "Observe before interpreting",
      "points": [
        "Begin with observations: grain size and sorting, composition, fossils, color, bedding, cross beds, and contacts.",
        "Then infer an environment.",
        "Keep an observation such as “large cross beds” distinct from an interpretation such as “wind dunes.”"
      ]
    },
    {
      "heading": "Read the sequence upward",
      "points": [
        "Read an undisturbed sequence from older at the bottom toward younger at the top.",
        "Use changes between units to reconstruct changes in environment.",
        "Red beds can reflect oxidation; dark organic-rich deposits may reflect limited oxygen.",
        "Neither color alone proves a unique setting.",
        "Several clues should agree."
      ]
    },
    {
      "heading": "Explain contacts and transitions",
      "points": [
        "Interpret erosional contacts and missing intervals explicitly.",
        "A marine unit above land deposits can support transgression; land deposits above marine material can support regression.",
        "Explain both the environment of each unit and the transition between them."
      ]
    }
  ],
  "g7-14a": [
    {
      "heading": "Groundwater and construction materials",
      "points": [
        "Sediment and sedimentary rocks store groundwater in pores and fractures.",
        "Connected pore spaces allow water to move; pore volume and connectivity are different properties.",
        "Sand and gravel are useful construction materials, and limestone supplies carbonate for cement and other uses."
      ]
    },
    {
      "heading": "Coal, petroleum, and natural gas",
      "points": [
        "Sedimentary basins can preserve coal, petroleum, and natural gas.",
        "Organic material supplies the starting carbon; burial and chemical change contribute to fuel formation.",
        "Reservoir rock stores fluids, while less permeable layers can help trap them.",
        "Resources occur through a sequence of processes, not merely because a rock has one name."
      ]
    },
    {
      "heading": "The record preserved in layers",
      "points": [
        "Layers also record past environments, biological remains, and events.",
        "Fossils, sedimentary structures, and sequences help reconstruct Earth history.",
        "The supplied lecture ending introduces this societal importance but does not establish a new exam weighting."
      ]
    }
  ],
  "g7-15a": [
    {
      "heading": "Read the Front Range evidence",
      "points": [
        "The Front Range exposes older crystalline basement.",
        "Younger sedimentary layers record sediment shed from mountains, wind-blown sand, shoreline deposits, and marine environments.",
        "The supplied map, cross section, and photographs show the relations used to reconstruct that changing history."
      ]
    },
    {
      "heading": "Reconstruct the depositional sequence",
      "points": [
        "The lowest coarse reddish sediment includes sandstone, conglomerate, and breccia deposited by streams and debris flows from the Ancestral Rockies.",
        "Overlying units record later environments; interpret each with its grains, structures, and fossils.",
        "The present steep dips also record deformation after deposition."
      ]
    },
    {
      "heading": "Separate deposition, tilting, and erosion",
      "points": [
        "Separate deposition from later tilting and erosion.",
        "A coarse unit can indicate nearby relief during deposition, whereas its present inclination need not be the slope on which it originally formed.",
        "Use the source sequence rather than assigning an age from color alone."
      ]
    }
  ],
  "g7-16a": [
    {
      "heading": "Identify each unit from its clues",
      "points": [
        "The supplied investigation combines four units, their grain types, fossils, and structures.",
        "Identify at least two useful attributes of each unit before assigning an environment.",
        "Coal and plant remains support vegetation-rich land settings;",
        "mudcracks support exposure and drying;",
        "marine fossils support marine deposition."
      ]
    },
    {
      "heading": "Interpret structures and succession",
      "points": [
        "Large cross beds in well-sorted sand support dunes, while smaller cross beds can occur in channels or shoreline deposits.",
        "Distinguish sandstone from carbonate rock by composition and fossils, not merely cliff color.",
        "Read the succession upward to infer environmental change."
      ]
    },
    {
      "heading": "Use the original investigation",
      "points": [
        "This lab uses original practice scenarios based on those relationships.",
        "It does not treat a missing or unreadable worksheet label as a verified answer.",
        "For the full original investigation, inspect the source pages and make your own observation-to-interpretation table."
      ]
    }
  ],
  "g8-1a": [
    {
      "heading": "Stress and strain",
      "points": [
        "Stress is force applied over an area.",
        "Confining pressure acts approximately equally in all directions;",
        "differential stress varies with direction.",
        "Compression shortens, tension stretches, and shear moves neighboring material past itself.",
        "Strain is the resulting change in shape or size.",
        "Displacement and rotation can also change a rock’s position or orientation."
      ]
    },
    {
      "heading": "How strength changes with depth",
      "points": [
        "The classroom diagram shows rock strength against depth.",
        "In shallow crust, increasing confinement resists fracture and slip, so strength generally increases downward.",
        "At greater depth, temperature permits ductile deformation and strength decreases.",
        "The curve reaches a maximum near the brittle–ductile transition; it does not imply rock melts there."
      ]
    },
    {
      "heading": "Read the axes and threshold",
      "points": [
        "Read the axes first: depth increases downward and strength increases rightward.",
        "A rock can remain intact below its strength threshold and deform or fracture when imposed stress exceeds it.",
        "Depth is a proxy for changing conditions, not a universal fixed boundary."
      ]
    }
  ],
  "g8-2a": [
    {
      "heading": "Brittle versus ductile response",
      "points": [
        "The same differential stress can produce different structures under different conditions.",
        "At cool shallow levels, compression, tension, or shear can produce brittle failure and faults.",
        "At warmer depths, material can fold, stretch, or shear through distributed deformation while remaining solid."
      ]
    },
    {
      "heading": "Conditions that control behavior",
      "points": [
        "Temperature, pressure, rock type, fluids, and the conditions of deformation affect behavior.",
        "Hotter rock generally deforms more easily.",
        "Fluids can alter minerals, move dissolved material, and form veins by precipitating in openings.",
        "A shear zone distributes deformation through a broader volume; a brittle fault concentrates movement along a fracture."
      ]
    },
    {
      "heading": "Compare one condition at a time",
      "points": [
        "Compare one changing condition at a time.",
        "“Deep” and “shallow” describe the course’s general model rather than exact universal depths.",
        "Do not infer a unique stress type solely from the fact that a rock is brittle or ductile."
      ]
    }
  ],
  "g8-3a": [
    {
      "heading": "Joints versus faults",
      "points": [
        "A joint is a fracture with little or no shear displacement.",
        "A fault records relative displacement across a fracture.",
        "Joint sets have similar orientations and may divide rock into blocks.",
        "Tectonic stress can produce joints;",
        "cooling and contraction can produce columnar joints;",
        "removal of overlying weight can produce curved unloading joints."
      ]
    },
    {
      "heading": "Cooling and unloading joints",
      "points": [
        "Columnar joints develop as solidified igneous rock cools and contracts.",
        "Their polygonal geometry records contraction rather than sedimentary layering.",
        "Unloading changes stress near the surface and can form sheetlike fractures roughly parallel to a curved exposed surface."
      ]
    },
    {
      "heading": "Strike and dip",
      "points": [
        "Strike is the compass orientation of a horizontal line on a plane.",
        "Dip is the inclination of the plane, measured downward from horizontal and perpendicular to strike.",
        "Read orientation from the source diagram; the supplied lecture explicitly does not require detailed compass operation."
      ]
    }
  ],
  "g8-4a": [
    {
      "heading": "Identify the fault blocks",
      "points": [
        "A fault is a fracture with relative movement.",
        "On an inclined fault, the hanging wall is above the plane and the footwall is below it.",
        "Name the blocks geometrically before describing their motion."
      ]
    },
    {
      "heading": "Normal, reverse, thrust, and strike-slip faults",
      "points": [
        "On a normal fault, the hanging wall moves down relative to the footwall; extension commonly produces these faults.",
        "On a reverse fault, the hanging wall moves up; shortening commonly produces them.",
        "A low-angle reverse fault is a thrust.",
        "On a strike-slip fault, relative movement is predominantly horizontal.",
        "Oblique slip combines components."
      ]
    },
    {
      "heading": "Use markers to establish movement",
      "points": [
        "Several normal faults can bound uplifted horsts and downdropped grabens.",
        "Infer relative movement from matching offset layers, arrows, or other markers.",
        "A photograph of a steep cliff by itself does not establish the movement direction."
      ]
    }
  ],
  "g8-5a": [
    {
      "heading": "Fold types",
      "points": [
        "A fold bends layers.",
        "In a simple upright sequence, an anticline arches upward and a syncline forms a trough.",
        "A monocline has one main dipping segment between flatter portions.",
        "A dome dips outward in several directions;",
        "a basin dips inward.",
        "Use rock ages where needed to distinguish overturned anticlines and synclines reliably."
      ]
    },
    {
      "heading": "Hinges, limbs, axial surfaces, and plunge",
      "points": [
        "The hinge is the region of greatest curvature, the limbs are the sides, and the axial surface connects hinges through successive layers.",
        "Symmetric and asymmetric folds differ in limb geometry.",
        "An inclined or overturned axial surface is different from a plunging fold axis; one does not automatically imply the other."
      ]
    },
    {
      "heading": "Interpret shortening and viewpoint",
      "points": [
        "Compression commonly shortens layered rock through folding.",
        "Infer shortening from geometric evidence, and state the viewing direction before translating a cross-section direction into compass directions.",
        "Inspect the original examples to distinguish upright, inclined, overturned, and plunging configurations."
      ]
    }
  ],
  "g8-6a": [
    {
      "heading": "Planar fabrics: foliation and cleavage",
      "points": [
        "Foliation is a planar metamorphic fabric.",
        "It can result from aligned platy minerals, mineral bands, flattened objects, or distributed shearing.",
        "Slaty cleavage allows fine-grained rock to split along closely spaced planes.",
        "Schistosity reflects aligned visible platy minerals.",
        "Gneissic foliation is expressed as alternating mineral-rich bands."
      ]
    },
    {
      "heading": "Lineation versus bedding",
      "points": [
        "Lineation is a linear feature, such as aligned elongated crystals or stretched objects.",
        "A rock can contain both foliation and lineation.",
        "Bedding is an inherited sedimentary layer;",
        "cleavage can cut across it, so the two must be traced separately."
      ]
    },
    {
      "heading": "Relict features and deformation",
      "points": [
        "Relict features are preserved from the parent rock, including bedding, clasts, or other textures.",
        "Shearing can deform grains into lenses and rotate minerals.",
        "Diagnose the feature from its geometry before assigning a rock name, and avoid treating every planar surface as original bedding."
      ]
    }
  ],
  "g8-7a": [
    {
      "heading": "The progressive shale sequence",
      "points": [
        "In the supplied progressive shale sequence, slate → phyllite → schist → gneiss records increasing metamorphic conditions.",
        "Slate is fine grained and dull with cleavage;",
        "phyllite has a sheen;",
        "schist has visible aligned minerals;",
        "gneiss has mineral banding.",
        "This is a course model for suitable parent composition, not a universal path followed by every rock."
      ]
    },
    {
      "heading": "Parent rocks and other metamorphic products",
      "points": [
        "Quartz sandstone can become quartzite, whose interlocking grains make it strong and can cause fractures to cross grains.",
        "Limestone can become marble, dominated by recrystallized carbonate minerals.",
        "Basalt and other suitable volcanic rocks can form greenstone; hotter conditions can form amphibolite.",
        "Contact metamorphism can produce hornfels; partial melting can form migmatite."
      ]
    },
    {
      "heading": "Use texture and minerals together",
      "points": [
        "Identify grain size, fabric, minerals, and preserved parent features together.",
        "Schist is named partly by texture, so the mineral assemblage can vary.",
        "Marble and quartzite often lack strong foliation, even though both are metamorphic."
      ]
    }
  ],
  "g8-8a": [
    {
      "heading": "Causes of metamorphism",
      "points": [
        "Metamorphism changes minerals, textures, or both through heat, pressure, stress, and fluids while the rock remains predominantly solid.",
        "Burial and tectonic thickening raise pressure and temperature.",
        "Magma heats neighboring rocks; circulating hot fluids can alter minerals.",
        "Shearing can deform and heat rock locally."
      ]
    },
    {
      "heading": "Processes that change the rock",
      "points": [
        "Recrystallization changes crystal size and texture.",
        "Neocrystallization grows new minerals as old minerals become unstable.",
        "Pressure solution dissolves material where stress is greatest and can move it elsewhere.",
        "Chemical remobilization concentrates different minerals into bands.",
        "Rotation, flattening, and stretching change geometry."
      ]
    },
    {
      "heading": "Foliation and the limit at melting",
      "points": [
        "Foliation develops through alignment, growth, dissolution, and deformation.",
        "Metamorphism and deformation can occur together or independently.",
        "Crossing into melting is a separate transition;",
        "do not describe solid-state recrystallization as simply melting and freezing again."
      ]
    }
  ],
  "g8-9a": [
    {
      "heading": "Grade and pressure–temperature conditions",
      "points": [
        "Metamorphic grade reflects the conditions a rock experienced and can be constrained by mineral assemblages.",
        "In the course pressure–temperature model, normal regional conditions increase pressure and temperature together.",
        "High-temperature/low-pressure conditions occur near shallow magma bodies;",
        "high-pressure/low-temperature conditions occur where relatively cold material is subducted."
      ]
    },
    {
      "heading": "Contact, regional, and collision settings",
      "points": [
        "At an ocean–continent convergent margin, a subducting slab, the overriding mountain belt, and a shallow intrusion experience different conditions.",
        "Contact metamorphism surrounds heat sources; regional metamorphism affects broader buried or thickened regions.",
        "Continental collision can thicken crust and produce extensive metamorphism."
      ]
    },
    {
      "heading": "Read the graph and coverage limits",
      "points": [
        "Read the axes and fields on the supplied graph.",
        "A location on a pressure–temperature diagram is not automatically a geographic depth with a single universal temperature.",
        "The October 6 lecture reaches subduction and contact settings; its collision discussion is explicitly left for later."
      ]
    }
  ],
  "g8-10a": [
    {
      "heading": "Extension and rifting",
      "points": [
        "Extension can form continental rifts, normal faults, tilted blocks, and grabens.",
        "Crust becomes thinner as it stretches.",
        "Magma and hot fluids can alter rock during rifting and ocean opening.",
        "Hydrothermal metamorphism is especially important where seawater circulates through hot rock at mid-ocean ridges."
      ]
    },
    {
      "heading": "Strike-slip motion and bends",
      "points": [
        "Strike-slip faults accommodate predominantly horizontal motion and can occur at transform boundaries or within continents.",
        "Shearing changes structures at depth.",
        "A bend can make neighboring material converge or separate, creating local uplift or subsidence even though the main motion is lateral."
      ]
    },
    {
      "heading": "Interpret the full fault geometry",
      "points": [
        "Interpret the entire geometry: arrows, fault trace, matching displaced features, and the bend direction.",
        "Straight horizontal motion should not be assigned the same vertical effect as every bend.",
        "Keep plate-scale setting separate from the smaller local stress field."
      ]
    }
  ],
  "g8-11a": [
    {
      "heading": "Related faults, folds, and fabrics",
      "points": [
        "Faults, folds, joints, and cleavage can form during the same deformation episode.",
        "A fault propagating upward can bend overlying beds into a monocline.",
        "Beds moving over a bend in a thrust can fold into anticlines and synclines.",
        "Thrust belts combine shortening, stacked sheets, and related fabrics."
      ]
    },
    {
      "heading": "Cleavage and axial surfaces",
      "points": [
        "Cleavage commonly lies approximately parallel to the axial surfaces of folds formed in the same event, and it can cut original bedding.",
        "This relation helps locate fold geometry where only parts of the rock are exposed.",
        "The relation is a structural clue, not proof that all fabrics everywhere formed simultaneously."
      ]
    },
    {
      "heading": "Distinguish separate events",
      "points": [
        "Use cross-cutting and overprinting to distinguish separate events.",
        "Older thrusts can later be folded or faulted.",
        "Observations must support a shared history; visual proximity alone does not establish age or cause."
      ]
    }
  ],
  "g8-12a": [
    {
      "heading": "Fractures and fault traces",
      "points": [
        "Weathering and erosion exploit joints, faults, and cleavage.",
        "Joint sets divide rock into blocks and influence cliffs.",
        "Fault scarps offset the land surface; fault breccia, crushed zones, and aligned notches can expose traces.",
        "Striations on a fault surface record slip direction."
      ]
    },
    {
      "heading": "Erosion of beds and metamorphic fabrics",
      "points": [
        "Erosion of inclined resistant layers can form dip slopes and hogbacks.",
        "A ridge is not automatically an anticline: landforms depend on resistance and erosion as well as structure.",
        "Metamorphic foliation can create slabs, shiny outcrops, or complex ridges and folds."
      ]
    },
    {
      "heading": "Compare rock structure with the landscape",
      "points": [
        "Infer geometry by tracing beds and fabrics, then comparing their orientation with the landscape.",
        "Distinguish the modern erosional surface from the original rock structure.",
        "Multiple observations are needed before locating a fault or determining its motion."
      ]
    }
  ],
  "g8-intro": [
    {
      "heading": "Read the Valley and Ridge pattern",
      "points": [
        "The Chapter 8 introduction shows the Valley and Ridge Province in the Appalachians.",
        "Trace the curved ridges on the map, then compare them with the cross section.",
        "Folded sedimentary layers and thrust faults record shortening.",
        "Cleavage may cut the older bedding because it developed during later deformation."
      ]
    },
    {
      "heading": "Collision, metamorphism, and erosion",
      "points": [
        "The source describes several Paleozoic deformation episodes, culminating in collision between Africa and eastern North America around 300 million years ago.",
        "Shortening stacked and folded rocks while burial and heating promoted metamorphism.",
        "Subsequent erosion removed weaker layers more rapidly, leaving resistant units as ridges."
      ]
    },
    {
      "heading": "Separate the geological processes",
      "points": [
        "Use this sequence to separate processes: deposition first creates layers; deformation changes their geometry; mineral reactions and fabric development can occur during metamorphism; erosion exposes and reshapes the structure.",
        "A ridge is not automatically an anticline.",
        "Read bedding, rock resistance, and map geometry together."
      ]
    }
  ],
  "g8-13a": [
    {
      "heading": "Collect structural evidence",
      "points": [
        "Structural fieldwork records observations, sketches, orientations, maps, and samples.",
        "Measurements of strike and dip help project structures below the surface.",
        "Laboratory work can identify minerals, textures, and chemical conditions."
      ]
    },
    {
      "heading": "Faults and sealing relationships",
      "points": [
        "A fault is younger than units it cuts.",
        "An unfaulted intrusion or deposit that crosses and seals a fault constrains the fault to be older than that feature.",
        "Sediment accumulating during fault movement can record changing relief and tilting.",
        "The available evidence may constrain an interval rather than one exact date."
      ]
    },
    {
      "heading": "Mineral growth and event sequences",
      "points": [
        "Minerals can grow before, during, or after deformation.",
        "Their relationship to fabrics helps distinguish these possibilities.",
        "Preserve uncertainty where an exposure or age is missing.",
        "Reconstruct the event sequence from several relations, not from a rock name alone."
      ]
    }
  ],
  "g8-14a": [
    {
      "heading": "Read the maps and cross section",
      "points": [
        "The New England maps and cross section show belts of rock, faults, folds, and metamorphic variation.",
        "Older crystalline rocks and Paleozoic units record deformation and metamorphism; younger Mesozoic rocks occur in rift-related fault blocks.",
        "Recent deposits record still later glacial and shoreline processes."
      ]
    },
    {
      "heading": "Collision versus later rifting",
      "points": [
        "Distinguish the collision history associated with assembly of the Appalachians from later rifting between North America and Africa.",
        "Metamorphic mineral patterns and pressure–temperature paths help reconstruct burial, heating, and later change.",
        "Different locations have different histories, so read the map legend and cross-section direction."
      ]
    },
    {
      "heading": "Keep events and ages separate",
      "points": [
        "Do not equate every fault on the map with the same episode.",
        "The sequence includes older deformation, metamorphism, younger extension, and erosion/deposition.",
        "Exact ages and geographic labels must follow the supplied figures."
      ]
    }
  ],
  "g8-15a": [
    {
      "heading": "Identify the rock samples",
      "points": [
        "The supplied investigation combines bedding, cleavage, rock samples, and a linear fractured zone.",
        "First identify the rocks from mineral and texture evidence: fine dull cleavage supports slate;",
        "quartz-rich interlocking sand grains support quartzite;",
        "recrystallized calcite supports marble;",
        "coarse mineral bands support gneiss."
      ]
    },
    {
      "heading": "Trace structures and constrain their history",
      "points": [
        "Trace bedding to interpret the fold, then compare cleavage and the viewing direction to infer shortening.",
        "A highly fractured boundary may be a fault, but fault type requires movement or an independently verified geometric relation.",
        "Differences in metamorphic grade across a boundary help constrain the structural history."
      ]
    },
    {
      "heading": "Make each reasoning step explicit",
      "points": [
        "Keep each reasoning step explicit: observation → rock or structure → parent material or process → integrated sequence.",
        "Written Connect summaries support style calibration; missing original screenshots are not a basis for grading their unseen numbered locations."
      ]
    }
  ],
  "brittle-response": [
    {
      "heading": "",
      "points": [
        "Cool, shallow rock breaks.",
        "Matching layers become offset across a fault.",
        "The break is the useful observation."
      ]
    },
    {
      "heading": "",
      "points": [
        "Deeper, hotter rock changes shape while solid.",
        "Continuous bent layers provide a geological example."
      ]
    },
    {
      "heading": "",
      "points": [
        "Compression, tension, and shear describe stress direction.",
        "Brittle and ductile describe how rock responds.",
        "They are different classifications."
      ]
    }
  ],
  "brittle-model": [
    {
      "heading": "",
      "points": [
        "Brittle deformation breaks rock or permits slip along a fracture, as in shallow faulting.",
        "Ductile deformation changes shape while rock remains solid, as in folding of deeper, hotter layers.",
        "Higher temperature makes solid-state deformation easier; flow does not require melting."
      ]
    }
  ],
  "brittle-graph": [
    {
      "heading": "",
      "points": [
        "The text gives roughly 15 km as an example transition depth.",
        "It is gradual and shallower in unusually hot regions; it is not a universal boundary."
      ]
    }
  ]
}, sources={
  "7.1": [
    {
      "heading": "Streams and floodplains",
      "points": [
        "Begin with the setting, then ask what transports sediment and where it loses energy.",
        "Steep mountain streams can move gravel and boulders.",
        "A stream can split and rejoin into braided channels; on gentler terrain, meandering channels flood adjacent flat land.",
        "Fluvial means stream or river processes.",
        "Floodplains accumulate mud and sand during floods."
      ]
    },
    {
      "heading": "Other land environments",
      "points": [
        "A delta grows where a stream enters standing water and slows.",
        "Wind selectively moves sand and finer particles; dunes commonly contain well-sorted sand.",
        "Glaciers carry a wide size range and release sediment as they melt.",
        "Lakes combine active shorelines with quieter deeper water.",
        "Wetlands preserve plant material where saturation limits oxidation."
      ]
    },
    {
      "heading": "Clues for identifying an environment",
      "points": [
        "Use several clues together: grain size, sorting, sedimentary structures, and plant or shell remains.",
        "A single sandstone does not uniquely identify a desert.",
        "Compare modern environments with the original overview before interpreting an ancient rock."
      ]
    }
  ],
  "7.intro": [
    {
      "heading": "Follow the Fraser River",
      "points": [
        "The chapter introduction follows the Fraser River through southwestern British Columbia.",
        "Mountain streams, lakes, glaciers, and tributaries supply sediment to the river.",
        "Its branching and rejoining channels illustrate a braided river.",
        "At the Strait of Georgia, slowing flow disperses sediment and builds a delta near Vancouver."
      ]
    },
    {
      "heading": "Track one sediment grain",
      "points": [
        "Follow one grain through this system: weathering produces it, erosion removes it, a stream transports it, and decreasing flow allows deposition.",
        "Coarse and fine material respond differently.",
        "The delta can grow seaward as material accumulates.",
        "An ancient deposit must be interpreted from textures and structures, because the modern river and coastline may no longer exist."
      ]
    },
    {
      "heading": "Why sediment matters",
      "points": [
        "Vancouver also illustrates the human importance of sediment.",
        "Broad sediment-covered plains provide land for building and agriculture; pore spaces hold groundwater.",
        "This supplied example connects environment, process, preserved rock, and resources."
      ]
    }
  ],
  "7.2": [
    {
      "heading": "Beaches, lagoons, reefs, and barriers",
      "points": [
        "Beaches accumulate sediment moved by waves and currents; their grains depend on local supply.",
        "A lagoon is sheltered water behind a reef or barrier island.",
        "A reef is constructed by organisms, commonly in shallow, warm, clear water.",
        "A barrier island is a long, narrow sand body separated from shore by lagoon or marsh."
      ]
    },
    {
      "heading": "Offshore transport and deposition",
      "points": [
        "Continental shelves and slopes receive sand, mud, and carbonate sediment.",
        "Material can move downslope in a turbidity current, a sediment-laden water flow.",
        "Deep seafloor commonly receives fine dust and the remains of small marine organisms.",
        "Tidal flats alternate between flooding and exposure; coastal dunes form when wind moves shoreline sand inland."
      ]
    },
    {
      "heading": "Interpret the whole setting",
      "points": [
        "Distinguish a sheltered lagoon from open shelf water and a river delta from a reef.",
        "Ocean depth alone does not determine the sediment: supply, water clarity, organisms, and transport also matter."
      ]
    }
  ],
  "7.3": [
    {
      "heading": "Physical weathering",
      "points": [
        "Physical weathering breaks rock without requiring a chemical change.",
        "Near-surface fracturing, frost or mineral wedging, thermal expansion, and biological activity can loosen pieces.",
        "Expansion on unloading and roots growing in cracks are physical mechanisms.",
        "Thermal expansion is included in the textbook with a caution about its relative importance."
      ]
    },
    {
      "heading": "Chemical weathering",
      "points": [
        "Chemical weathering changes minerals.",
        "Dissolution carries soluble material away;",
        "oxidation combines susceptible material with oxygen;",
        "hydrolysis commonly turns silicate minerals into clay and dissolved products.",
        "Organisms can produce acids and drive chemical reactions."
      ]
    },
    {
      "heading": "Products and interacting processes",
      "points": [
        "Starting composition and environmental conditions determine the products.",
        "Resistant quartz can survive transport while less stable minerals break down.",
        "Physical breakup exposes fresh surfaces to chemical reactions, so both processes can work together.",
        "Weathering produces material; erosion removes it, and transport carries it elsewhere."
      ]
    }
  ],
  "7.4": [
    {
      "heading": "Grain size",
      "points": [
        "Describe size, roundness, and sorting independently.",
        "Gravel includes granules, pebbles, cobbles, and boulders;",
        "sand is smaller than gravel;",
        "silt and clay together are mud.",
        "The grain-size table in the original page is the authority for exact boundaries.",
        "Clay can refer to a particle size or a mineral group."
      ]
    },
    {
      "heading": "Roundness and sorting",
      "points": [
        "Angular grains have sharp edges; abrasion during transport can round them.",
        "Sorting describes the range of sizes.",
        "Well-sorted sediment has a narrow range; poorly sorted sediment mixes sizes.",
        "Rounding and sorting can develop during repeated transport, but do not infer a unique travel distance from either alone."
      ]
    },
    {
      "heading": "Transport controls",
      "points": [
        "The material transported depends on the agent, current strength, clast size and density, and available sediment.",
        "Wind selectively moves sand and finer particles; glaciers can carry a broad mixture.",
        "Strong water currents can move larger clasts than weak currents.",
        "Observe all three properties before assigning a rock name or environment."
      ]
    }
  ],
  "7.5": [
    {
      "heading": "Name the clastic rock",
      "points": [
        "Classify a clastic rock by the particles preserved within it.",
        "Rounded gravel forms conglomerate;",
        "angular gravel forms breccia.",
        "Sand forms sandstone;",
        "silt forms siltstone.",
        "Fine clay-rich sediment can form shale, whose aligned grains allow thin sheets to split apart.",
        "Quartz sandstone is quartz rich;",
        "arkose contains abundant feldspar;",
        "graywacke contains mixed grains and rock fragments."
      ]
    },
    {
      "heading": "Lithification: compaction and cementation",
      "points": [
        "Lithification changes loose sediment into rock.",
        "Compaction moves grains closer together and expels pore fluids.",
        "Cementation precipitates mineral material in the pores and binds grains.",
        "Compaction is particularly substantial in initially water-rich mud.",
        "Common cements include carbonate, silica, and iron-bearing material."
      ]
    },
    {
      "heading": "Separate texture from composition",
      "points": [
        "Composition, grain size, and roundness carry different information.",
        "Sandstone is a size-based name; feldspar content adds a compositional distinction.",
        "A red stain may be cement or oxidation rather than the original grains.",
        "Read the clast chart and the compaction sequence separately."
      ]
    }
  ],
  "7.6": [
    {
      "heading": "Chemical precipitation",
      "points": [
        "Some sedimentary rocks form from dissolved substances or organic material rather than chiefly from transported rock fragments.",
        "Evaporation concentrates dissolved ions and can precipitate evaporites, including rock salt and gypsum.",
        "Chemical precipitation also forms minerals where water chemistry changes."
      ]
    },
    {
      "heading": "Biological and organic origins",
      "points": [
        "Organisms extract dissolved substances to build shells and skeletons.",
        "Accumulation of carbonate remains can form limestone; silica-rich remains can contribute to chert.",
        "Plant material accumulates in waterlogged environments and, after burial and alteration, can form coal.",
        "These origins overlap: a biochemical rock can include fragments of organisms, yet its material originated through biological extraction from water."
      ]
    },
    {
      "heading": "Identify the dominant material",
      "points": [
        "Use the dominant material and formation process to interpret the rock.",
        "Halite is a mineral; rock salt is a rock composed mostly of halite.",
        "Coal records organic accumulation and preservation, whereas an evaporite records concentration and precipitation from water."
      ]
    }
  ],
  "7.7": [
    {
      "heading": "What beds record",
      "points": [
        "Beds preserve changes in sediment supply, current strength, environment, or sea level.",
        "A boundary can mark erosion or a pause in deposition; not every layer represents an equal amount of time.",
        "Layer thickness and composition must be interpreted with other evidence."
      ]
    },
    {
      "heading": "Graded beds and cross beds",
      "points": [
        "Graded bedding commonly places coarse grains at the bottom and successively finer grains above, recording waning current strength.",
        "A settling jar models this sorting.",
        "Cross beds are inclined layers within a larger bed, formed as dunes or ripples migrate.",
        "Their shape can preserve flow direction.",
        "Large cross beds commonly occur in wind-blown dunes; smaller examples also occur in streams and shorelines."
      ]
    },
    {
      "heading": "One bed versus a longer sequence",
      "points": [
        "Separate a graded bed from a whole sequence that changes upward.",
        "One event can produce a graded bed; a succession of environments can produce a longer fining- or coarsening-upward sequence.",
        "Observe contacts, internal layers, and grain-size trends before explaining the process."
      ]
    }
  ],
  "7.8": [
    {
      "heading": "Breccia: angular clasts",
      "points": [
        "Both rocks contain large clasts, so start by describing roundness.",
        "Breccia has angular fragments and commonly poor sorting.",
        "It forms where material is broken and accumulates with limited abrasion, including steep slopes, talus, landslides, and debris-flow deposits.",
        "Angular fragments alone do not prove one specific origin."
      ]
    },
    {
      "heading": "Conglomerate: rounded clasts",
      "points": [
        "Conglomerate contains rounded coarse clasts and finer matrix.",
        "Streams, beaches, and other energetic environments can transport coarse material and round it.",
        "Alluvial fans can preserve a mixture of stream and debris-flow deposits; environments are not defined by a single rock name."
      ]
    },
    {
      "heading": "Compare the supporting clues",
      "points": [
        "Compare size distribution, clast support versus matrix, bedding, and association with neighboring deposits.",
        "Grain rounding supports abrasion, while the coarse grain size supports transport or accumulation capable of handling large pieces."
      ]
    }
  ],
  "7.9": [
    {
      "heading": "Dunes, streams, and beaches",
      "points": [
        "Sandstone preserves sand-sized particles but can form in many environments.",
        "Wind dunes tend to be well sorted and can preserve large cross beds.",
        "Stream deposits may include channels, gravel, variable sorting, and smaller cross beds.",
        "Beach sand is repeatedly reworked by waves, but its composition depends on the local supply."
      ]
    },
    {
      "heading": "Deltas, shelves, and deeper water",
      "points": [
        "Deltas and offshore shelves accumulate sand carried from land.",
        "Turbidity currents move sediment into deeper settings.",
        "Compare bedding, fossils, grain composition, and adjacent units to distinguish these possibilities.",
        "Sand-sized particles alone do not identify a beach or desert."
      ]
    },
    {
      "heading": "Rock resistance and interpretation limits",
      "points": [
        "Sandstone commonly forms resistant cliffs or ledges where strongly cemented.",
        "The landscape depends on cement, fractures, climate, and neighboring rocks.",
        "A visible sand grain gives a textural observation; the environment remains an interpretation that needs several supporting attributes."
      ]
    }
  ],
  "7.10": [
    {
      "heading": "Silt, clay, mudstone, and shale",
      "points": [
        "Siltstone, mudstone, and shale preserve particles finer than sand.",
        "Silt commonly includes quartz and can feel gritty.",
        "Clay-sized particles are finer; clay-rich shale commonly splits into thin sheets because its minerals are aligned.",
        "Mud includes silt and clay."
      ]
    },
    {
      "heading": "Where fine sediment settles",
      "points": [
        "Fine sediment settles where energetic transport subsides: floodplains, quiet lake centers, sheltered coastal water, and offshore settings.",
        "Mud can also remain suspended and be transported far from a river mouth.",
        "Deposits may include thin sand layers from stronger events."
      ]
    },
    {
      "heading": "Color, fossils, and structures",
      "points": [
        "Color, fossils, and structures add environmental information.",
        "Dark organic-rich material can support low-oxygen preservation; mudcracks indicate drying and exposure.",
        "Fine-grained rocks often weather into gentler slopes, but lithification and local conditions affect their resistance."
      ]
    }
  ],
  "7.11": [
    {
      "heading": "Composition and carbonate components",
      "points": [
        "Limestone consists mainly of calcite;",
        "dolostone consists mainly of dolomite.",
        "Carbonate rocks may form through chemical precipitation, biological accumulation, or later chemical replacement.",
        "Shells, reef frameworks, carbonate mud, and rounded coated grains can contribute to limestone."
      ]
    },
    {
      "heading": "Carbonate settings and identification",
      "points": [
        "Warm, shallow marine water is an important carbonate setting, especially where little land-derived mud obscures the water.",
        "Reefs build skeletal material.",
        "Lakes and springs can also deposit carbonate, so limestone alone is not proof of a tropical ocean.",
        "Dissolution can give exposed limestone pits or irregular surfaces; dilute acid helps identify calcite."
      ]
    },
    {
      "heading": "Reconstruct the environment",
      "points": [
        "Read fossils, grain types, bedding, and associated deposits to reconstruct conditions.",
        "Carbonate cliffs versus rounded slopes depend partly on climate and erosion.",
        "Do not confuse a carbonate sedimentary rock with marble: marble records later metamorphism of carbonate rock."
      ]
    }
  ],
  "7.12": [
    {
      "heading": "Facies and shifting environments",
      "points": [
        "A facies is a body of sediment or rock with characteristics representing an environment.",
        "Moving shorelines shift facies laterally, producing a vertical succession at a fixed location."
      ]
    },
    {
      "heading": "Transgression versus regression",
      "points": [
        "In a transgression, the sea advances over land because sea level rises relative to the land.",
        "Beach sand may be overlain by offshore mud and then carbonate material: the site becomes more marine through time.",
        "In a regression, the sea retreats and shallower-water or land deposits overlie deeper-water deposits.",
        "Relative sea-level change can result from changing water level or vertical land movement."
      ]
    },
    {
      "heading": "Read shoreline movement and vertical stacking",
      "points": [
        "Follow both the shoreline and one fixed observation point in the source sequence.",
        "Lateral shifts and vertical stacking are different views of the same change.",
        "The exact rock sequence depends on which environments and sediment supplies exist; do not memorize sandstone–shale–limestone as a universal rule."
      ]
    }
  ],
  "7.13": [
    {
      "heading": "Observe before interpreting",
      "points": [
        "Begin with observations: grain size and sorting, composition, fossils, color, bedding, cross beds, and contacts.",
        "Then infer an environment.",
        "Keep an observation such as “large cross beds” distinct from an interpretation such as “wind dunes.”"
      ]
    },
    {
      "heading": "Read the sequence upward",
      "points": [
        "Read an undisturbed sequence from older at the bottom toward younger at the top.",
        "Use changes between units to reconstruct changes in environment.",
        "Red beds can reflect oxidation; dark organic-rich deposits may reflect limited oxygen.",
        "Neither color alone proves a unique setting.",
        "Several clues should agree."
      ]
    },
    {
      "heading": "Explain contacts and transitions",
      "points": [
        "Interpret erosional contacts and missing intervals explicitly.",
        "A marine unit above land deposits can support transgression; land deposits above marine material can support regression.",
        "Explain both the environment of each unit and the transition between them."
      ]
    }
  ],
  "7.14": [
    {
      "heading": "Groundwater and construction materials",
      "points": [
        "Sediment and sedimentary rocks store groundwater in pores and fractures.",
        "Connected pore spaces allow water to move; pore volume and connectivity are different properties.",
        "Sand and gravel are useful construction materials, and limestone supplies carbonate for cement and other uses."
      ]
    },
    {
      "heading": "Coal, petroleum, and natural gas",
      "points": [
        "Sedimentary basins can preserve coal, petroleum, and natural gas.",
        "Organic material supplies the starting carbon; burial and chemical change contribute to fuel formation.",
        "Reservoir rock stores fluids, while less permeable layers can help trap them.",
        "Resources occur through a sequence of processes, not merely because a rock has one name."
      ]
    },
    {
      "heading": "The record preserved in layers",
      "points": [
        "Layers also record past environments, biological remains, and events.",
        "Fossils, sedimentary structures, and sequences help reconstruct Earth history.",
        "The supplied lecture ending introduces this societal importance but does not establish a new exam weighting."
      ]
    }
  ],
  "7.15": [
    {
      "heading": "Read the Front Range evidence",
      "points": [
        "The Front Range exposes older crystalline basement.",
        "Younger sedimentary layers record sediment shed from mountains, wind-blown sand, shoreline deposits, and marine environments.",
        "The supplied map, cross section, and photographs show the relations used to reconstruct that changing history."
      ]
    },
    {
      "heading": "Reconstruct the depositional sequence",
      "points": [
        "The lowest coarse reddish sediment includes sandstone, conglomerate, and breccia deposited by streams and debris flows from the Ancestral Rockies.",
        "Overlying units record later environments; interpret each with its grains, structures, and fossils.",
        "The present steep dips also record deformation after deposition."
      ]
    },
    {
      "heading": "Separate deposition, tilting, and erosion",
      "points": [
        "Separate deposition from later tilting and erosion.",
        "A coarse unit can indicate nearby relief during deposition, whereas its present inclination need not be the slope on which it originally formed.",
        "Use the source sequence rather than assigning an age from color alone."
      ]
    }
  ],
  "7.16": [
    {
      "heading": "Identify each unit from its clues",
      "points": [
        "The supplied investigation combines four units, their grain types, fossils, and structures.",
        "Identify at least two useful attributes of each unit before assigning an environment.",
        "Coal and plant remains support vegetation-rich land settings;",
        "mudcracks support exposure and drying;",
        "marine fossils support marine deposition."
      ]
    },
    {
      "heading": "Interpret structures and succession",
      "points": [
        "Large cross beds in well-sorted sand support dunes, while smaller cross beds can occur in channels or shoreline deposits.",
        "Distinguish sandstone from carbonate rock by composition and fossils, not merely cliff color.",
        "Read the succession upward to infer environmental change."
      ]
    },
    {
      "heading": "Use the original investigation",
      "points": [
        "This lab uses original practice scenarios based on those relationships.",
        "It does not treat a missing or unreadable worksheet label as a verified answer.",
        "For the full original investigation, inspect the source pages and make your own observation-to-interpretation table."
      ]
    }
  ],
  "8.1": [
    {
      "heading": "Stress and strain",
      "points": [
        "Stress is force applied over an area.",
        "Confining pressure acts approximately equally in all directions;",
        "differential stress varies with direction.",
        "Compression shortens, tension stretches, and shear moves neighboring material past itself.",
        "Strain is the resulting change in shape or size.",
        "Displacement and rotation can also change a rock’s position or orientation."
      ]
    },
    {
      "heading": "How strength changes with depth",
      "points": [
        "The classroom diagram shows rock strength against depth.",
        "In shallow crust, increasing confinement resists fracture and slip, so strength generally increases downward.",
        "At greater depth, temperature permits ductile deformation and strength decreases.",
        "The curve reaches a maximum near the brittle–ductile transition; it does not imply rock melts there."
      ]
    },
    {
      "heading": "Read the axes and threshold",
      "points": [
        "Read the axes first: depth increases downward and strength increases rightward.",
        "A rock can remain intact below its strength threshold and deform or fracture when imposed stress exceeds it.",
        "Depth is a proxy for changing conditions, not a universal fixed boundary."
      ]
    }
  ],
  "8.2": [
    {
      "heading": "Brittle versus ductile response",
      "points": [
        "The same differential stress can produce different structures under different conditions.",
        "At cool shallow levels, compression, tension, or shear can produce brittle failure and faults.",
        "At warmer depths, material can fold, stretch, or shear through distributed deformation while remaining solid."
      ]
    },
    {
      "heading": "Conditions that control behavior",
      "points": [
        "Temperature, pressure, rock type, fluids, and the conditions of deformation affect behavior.",
        "Hotter rock generally deforms more easily.",
        "Fluids can alter minerals, move dissolved material, and form veins by precipitating in openings.",
        "A shear zone distributes deformation through a broader volume; a brittle fault concentrates movement along a fracture."
      ]
    },
    {
      "heading": "Compare one condition at a time",
      "points": [
        "Compare one changing condition at a time.",
        "“Deep” and “shallow” describe the course’s general model rather than exact universal depths.",
        "Do not infer a unique stress type solely from the fact that a rock is brittle or ductile."
      ]
    }
  ],
  "8.3": [
    {
      "heading": "Joints versus faults",
      "points": [
        "A joint is a fracture with little or no shear displacement.",
        "A fault records relative displacement across a fracture.",
        "Joint sets have similar orientations and may divide rock into blocks.",
        "Tectonic stress can produce joints;",
        "cooling and contraction can produce columnar joints;",
        "removal of overlying weight can produce curved unloading joints."
      ]
    },
    {
      "heading": "Cooling and unloading joints",
      "points": [
        "Columnar joints develop as solidified igneous rock cools and contracts.",
        "Their polygonal geometry records contraction rather than sedimentary layering.",
        "Unloading changes stress near the surface and can form sheetlike fractures roughly parallel to a curved exposed surface."
      ]
    },
    {
      "heading": "Strike and dip",
      "points": [
        "Strike is the compass orientation of a horizontal line on a plane.",
        "Dip is the inclination of the plane, measured downward from horizontal and perpendicular to strike.",
        "Read orientation from the source diagram; the supplied lecture explicitly does not require detailed compass operation."
      ]
    }
  ],
  "8.4": [
    {
      "heading": "Identify the fault blocks",
      "points": [
        "A fault is a fracture with relative movement.",
        "On an inclined fault, the hanging wall is above the plane and the footwall is below it.",
        "Name the blocks geometrically before describing their motion."
      ]
    },
    {
      "heading": "Normal, reverse, thrust, and strike-slip faults",
      "points": [
        "On a normal fault, the hanging wall moves down relative to the footwall; extension commonly produces these faults.",
        "On a reverse fault, the hanging wall moves up; shortening commonly produces them.",
        "A low-angle reverse fault is a thrust.",
        "On a strike-slip fault, relative movement is predominantly horizontal.",
        "Oblique slip combines components."
      ]
    },
    {
      "heading": "Use markers to establish movement",
      "points": [
        "Several normal faults can bound uplifted horsts and downdropped grabens.",
        "Infer relative movement from matching offset layers, arrows, or other markers.",
        "A photograph of a steep cliff by itself does not establish the movement direction."
      ]
    }
  ],
  "8.5": [
    {
      "heading": "Fold types",
      "points": [
        "A fold bends layers.",
        "In a simple upright sequence, an anticline arches upward and a syncline forms a trough.",
        "A monocline has one main dipping segment between flatter portions.",
        "A dome dips outward in several directions;",
        "a basin dips inward.",
        "Use rock ages where needed to distinguish overturned anticlines and synclines reliably."
      ]
    },
    {
      "heading": "Hinges, limbs, axial surfaces, and plunge",
      "points": [
        "The hinge is the region of greatest curvature, the limbs are the sides, and the axial surface connects hinges through successive layers.",
        "Symmetric and asymmetric folds differ in limb geometry.",
        "An inclined or overturned axial surface is different from a plunging fold axis; one does not automatically imply the other."
      ]
    },
    {
      "heading": "Interpret shortening and viewpoint",
      "points": [
        "Compression commonly shortens layered rock through folding.",
        "Infer shortening from geometric evidence, and state the viewing direction before translating a cross-section direction into compass directions.",
        "Inspect the original examples to distinguish upright, inclined, overturned, and plunging configurations."
      ]
    }
  ],
  "8.6": [
    {
      "heading": "Planar fabrics: foliation and cleavage",
      "points": [
        "Foliation is a planar metamorphic fabric.",
        "It can result from aligned platy minerals, mineral bands, flattened objects, or distributed shearing.",
        "Slaty cleavage allows fine-grained rock to split along closely spaced planes.",
        "Schistosity reflects aligned visible platy minerals.",
        "Gneissic foliation is expressed as alternating mineral-rich bands."
      ]
    },
    {
      "heading": "Lineation versus bedding",
      "points": [
        "Lineation is a linear feature, such as aligned elongated crystals or stretched objects.",
        "A rock can contain both foliation and lineation.",
        "Bedding is an inherited sedimentary layer;",
        "cleavage can cut across it, so the two must be traced separately."
      ]
    },
    {
      "heading": "Relict features and deformation",
      "points": [
        "Relict features are preserved from the parent rock, including bedding, clasts, or other textures.",
        "Shearing can deform grains into lenses and rotate minerals.",
        "Diagnose the feature from its geometry before assigning a rock name, and avoid treating every planar surface as original bedding."
      ]
    }
  ],
  "8.7": [
    {
      "heading": "The progressive shale sequence",
      "points": [
        "In the supplied progressive shale sequence, slate → phyllite → schist → gneiss records increasing metamorphic conditions.",
        "Slate is fine grained and dull with cleavage;",
        "phyllite has a sheen;",
        "schist has visible aligned minerals;",
        "gneiss has mineral banding.",
        "This is a course model for suitable parent composition, not a universal path followed by every rock."
      ]
    },
    {
      "heading": "Parent rocks and other metamorphic products",
      "points": [
        "Quartz sandstone can become quartzite, whose interlocking grains make it strong and can cause fractures to cross grains.",
        "Limestone can become marble, dominated by recrystallized carbonate minerals.",
        "Basalt and other suitable volcanic rocks can form greenstone; hotter conditions can form amphibolite.",
        "Contact metamorphism can produce hornfels; partial melting can form migmatite."
      ]
    },
    {
      "heading": "Use texture and minerals together",
      "points": [
        "Identify grain size, fabric, minerals, and preserved parent features together.",
        "Schist is named partly by texture, so the mineral assemblage can vary.",
        "Marble and quartzite often lack strong foliation, even though both are metamorphic."
      ]
    }
  ],
  "8.8": [
    {
      "heading": "Causes of metamorphism",
      "points": [
        "Metamorphism changes minerals, textures, or both through heat, pressure, stress, and fluids while the rock remains predominantly solid.",
        "Burial and tectonic thickening raise pressure and temperature.",
        "Magma heats neighboring rocks; circulating hot fluids can alter minerals.",
        "Shearing can deform and heat rock locally."
      ]
    },
    {
      "heading": "Processes that change the rock",
      "points": [
        "Recrystallization changes crystal size and texture.",
        "Neocrystallization grows new minerals as old minerals become unstable.",
        "Pressure solution dissolves material where stress is greatest and can move it elsewhere.",
        "Chemical remobilization concentrates different minerals into bands.",
        "Rotation, flattening, and stretching change geometry."
      ]
    },
    {
      "heading": "Foliation and the limit at melting",
      "points": [
        "Foliation develops through alignment, growth, dissolution, and deformation.",
        "Metamorphism and deformation can occur together or independently.",
        "Crossing into melting is a separate transition;",
        "do not describe solid-state recrystallization as simply melting and freezing again."
      ]
    }
  ],
  "8.9": [
    {
      "heading": "Grade and pressure–temperature conditions",
      "points": [
        "Metamorphic grade reflects the conditions a rock experienced and can be constrained by mineral assemblages.",
        "In the course pressure–temperature model, normal regional conditions increase pressure and temperature together.",
        "High-temperature/low-pressure conditions occur near shallow magma bodies;",
        "high-pressure/low-temperature conditions occur where relatively cold material is subducted."
      ]
    },
    {
      "heading": "Contact, regional, and collision settings",
      "points": [
        "At an ocean–continent convergent margin, a subducting slab, the overriding mountain belt, and a shallow intrusion experience different conditions.",
        "Contact metamorphism surrounds heat sources; regional metamorphism affects broader buried or thickened regions.",
        "Continental collision can thicken crust and produce extensive metamorphism."
      ]
    },
    {
      "heading": "Read the graph and coverage limits",
      "points": [
        "Read the axes and fields on the supplied graph.",
        "A location on a pressure–temperature diagram is not automatically a geographic depth with a single universal temperature.",
        "The October 6 lecture reaches subduction and contact settings; its collision discussion is explicitly left for later."
      ]
    }
  ],
  "8.10": [
    {
      "heading": "Extension and rifting",
      "points": [
        "Extension can form continental rifts, normal faults, tilted blocks, and grabens.",
        "Crust becomes thinner as it stretches.",
        "Magma and hot fluids can alter rock during rifting and ocean opening.",
        "Hydrothermal metamorphism is especially important where seawater circulates through hot rock at mid-ocean ridges."
      ]
    },
    {
      "heading": "Strike-slip motion and bends",
      "points": [
        "Strike-slip faults accommodate predominantly horizontal motion and can occur at transform boundaries or within continents.",
        "Shearing changes structures at depth.",
        "A bend can make neighboring material converge or separate, creating local uplift or subsidence even though the main motion is lateral."
      ]
    },
    {
      "heading": "Interpret the full fault geometry",
      "points": [
        "Interpret the entire geometry: arrows, fault trace, matching displaced features, and the bend direction.",
        "Straight horizontal motion should not be assigned the same vertical effect as every bend.",
        "Keep plate-scale setting separate from the smaller local stress field."
      ]
    }
  ],
  "8.11": [
    {
      "heading": "Related faults, folds, and fabrics",
      "points": [
        "Faults, folds, joints, and cleavage can form during the same deformation episode.",
        "A fault propagating upward can bend overlying beds into a monocline.",
        "Beds moving over a bend in a thrust can fold into anticlines and synclines.",
        "Thrust belts combine shortening, stacked sheets, and related fabrics."
      ]
    },
    {
      "heading": "Cleavage and axial surfaces",
      "points": [
        "Cleavage commonly lies approximately parallel to the axial surfaces of folds formed in the same event, and it can cut original bedding.",
        "This relation helps locate fold geometry where only parts of the rock are exposed.",
        "The relation is a structural clue, not proof that all fabrics everywhere formed simultaneously."
      ]
    },
    {
      "heading": "Distinguish separate events",
      "points": [
        "Use cross-cutting and overprinting to distinguish separate events.",
        "Older thrusts can later be folded or faulted.",
        "Observations must support a shared history; visual proximity alone does not establish age or cause."
      ]
    }
  ],
  "8.12": [
    {
      "heading": "Fractures and fault traces",
      "points": [
        "Weathering and erosion exploit joints, faults, and cleavage.",
        "Joint sets divide rock into blocks and influence cliffs.",
        "Fault scarps offset the land surface; fault breccia, crushed zones, and aligned notches can expose traces.",
        "Striations on a fault surface record slip direction."
      ]
    },
    {
      "heading": "Erosion of beds and metamorphic fabrics",
      "points": [
        "Erosion of inclined resistant layers can form dip slopes and hogbacks.",
        "A ridge is not automatically an anticline: landforms depend on resistance and erosion as well as structure.",
        "Metamorphic foliation can create slabs, shiny outcrops, or complex ridges and folds."
      ]
    },
    {
      "heading": "Compare rock structure with the landscape",
      "points": [
        "Infer geometry by tracing beds and fabrics, then comparing their orientation with the landscape.",
        "Distinguish the modern erosional surface from the original rock structure.",
        "Multiple observations are needed before locating a fault or determining its motion."
      ]
    }
  ],
  "8.intro": [
    {
      "heading": "Read the Valley and Ridge pattern",
      "points": [
        "The Chapter 8 introduction shows the Valley and Ridge Province in the Appalachians.",
        "Trace the curved ridges on the map, then compare them with the cross section.",
        "Folded sedimentary layers and thrust faults record shortening.",
        "Cleavage may cut the older bedding because it developed during later deformation."
      ]
    },
    {
      "heading": "Collision, metamorphism, and erosion",
      "points": [
        "The source describes several Paleozoic deformation episodes, culminating in collision between Africa and eastern North America around 300 million years ago.",
        "Shortening stacked and folded rocks while burial and heating promoted metamorphism.",
        "Subsequent erosion removed weaker layers more rapidly, leaving resistant units as ridges."
      ]
    },
    {
      "heading": "Separate the geological processes",
      "points": [
        "Use this sequence to separate processes: deposition first creates layers; deformation changes their geometry; mineral reactions and fabric development can occur during metamorphism; erosion exposes and reshapes the structure.",
        "A ridge is not automatically an anticline.",
        "Read bedding, rock resistance, and map geometry together."
      ]
    }
  ],
  "8.13": [
    {
      "heading": "Collect structural evidence",
      "points": [
        "Structural fieldwork records observations, sketches, orientations, maps, and samples.",
        "Measurements of strike and dip help project structures below the surface.",
        "Laboratory work can identify minerals, textures, and chemical conditions."
      ]
    },
    {
      "heading": "Faults and sealing relationships",
      "points": [
        "A fault is younger than units it cuts.",
        "An unfaulted intrusion or deposit that crosses and seals a fault constrains the fault to be older than that feature.",
        "Sediment accumulating during fault movement can record changing relief and tilting.",
        "The available evidence may constrain an interval rather than one exact date."
      ]
    },
    {
      "heading": "Mineral growth and event sequences",
      "points": [
        "Minerals can grow before, during, or after deformation.",
        "Their relationship to fabrics helps distinguish these possibilities.",
        "Preserve uncertainty where an exposure or age is missing.",
        "Reconstruct the event sequence from several relations, not from a rock name alone."
      ]
    }
  ],
  "8.14": [
    {
      "heading": "Read the maps and cross section",
      "points": [
        "The New England maps and cross section show belts of rock, faults, folds, and metamorphic variation.",
        "Older crystalline rocks and Paleozoic units record deformation and metamorphism; younger Mesozoic rocks occur in rift-related fault blocks.",
        "Recent deposits record still later glacial and shoreline processes."
      ]
    },
    {
      "heading": "Collision versus later rifting",
      "points": [
        "Distinguish the collision history associated with assembly of the Appalachians from later rifting between North America and Africa.",
        "Metamorphic mineral patterns and pressure–temperature paths help reconstruct burial, heating, and later change.",
        "Different locations have different histories, so read the map legend and cross-section direction."
      ]
    },
    {
      "heading": "Keep events and ages separate",
      "points": [
        "Do not equate every fault on the map with the same episode.",
        "The sequence includes older deformation, metamorphism, younger extension, and erosion/deposition.",
        "Exact ages and geographic labels must follow the supplied figures."
      ]
    }
  ],
  "8.15": [
    {
      "heading": "Identify the rock samples",
      "points": [
        "The supplied investigation combines bedding, cleavage, rock samples, and a linear fractured zone.",
        "First identify the rocks from mineral and texture evidence: fine dull cleavage supports slate;",
        "quartz-rich interlocking sand grains support quartzite;",
        "recrystallized calcite supports marble;",
        "coarse mineral bands support gneiss."
      ]
    },
    {
      "heading": "Trace structures and constrain their history",
      "points": [
        "Trace bedding to interpret the fold, then compare cleavage and the viewing direction to infer shortening.",
        "A highly fractured boundary may be a fault, but fault type requires movement or an independently verified geometric relation.",
        "Differences in metamorphic grade across a boundary help constrain the structural history."
      ]
    },
    {
      "heading": "Make each reasoning step explicit",
      "points": [
        "Keep each reasoning step explicit: observation → rock or structure → parent material or process → integrated sequence.",
        "Written Connect summaries support style calibration; missing original screenshots are not a basis for grading their unseen numbered locations."
      ]
    }
  ]
};
  function normal(s){return s.replace(/\s+/g,' ').trim();}
  function pointList(p,spec,level){
    var actual=p.textContent;
    // Keep an edited source intact until its outline is reviewed again.
    if(normal(actual)!==normal(spec.points.join(' ')))return null;
    var group=document.createElement('div');group.className='e2-note-group';
    if(spec.heading){var heading=document.createElement(level||'h4');heading.className='e2-note-heading';heading.textContent=spec.heading;group.appendChild(heading);}
    var list=document.createElement('ul');list.className='e2-note-points';
    if(p.classList.contains('small'))list.classList.add('small');
    if(p.classList.contains('muted'))list.classList.add('muted');
    var walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT),nodes=[],offset=0,n;
    while((n=walker.nextNode())){nodes.push({node:n,start:offset,end:offset+n.length});offset+=n.length;}
    function locate(at){for(var i=0;i<nodes.length;i++){if(at<=nodes[i].end)return[nodes[i].node,Math.max(0,at-nodes[i].start)];}return[nodes[nodes.length-1].node,nodes[nodes.length-1].node.length];}
    var from=0;
    spec.points.forEach(function(text){
      var at=actual.indexOf(text,from);if(at<0)throw new Error('Reviewed note point no longer matches source');
      var a=locate(at),b=locate(at+text.length),range=document.createRange();range.setStart(a[0],a[1]);range.setEnd(b[0],b[1]);
      var li=document.createElement('li');li.appendChild(range.cloneContents());list.appendChild(li);from=at+text.length;
    });
    group.appendChild(list);return group;
  }
  function format(root,specs,level){
    if(root.dataset.e2Outlined)return;
    var ps=Array.from(root.querySelectorAll('p'));if(ps.length!==specs.length)return;
    var groups=ps.map(function(p,i){return pointList(p,specs[i],level);});
    if(groups.some(function(g){return !g;}))return;
    ps.forEach(function(p,i){p.replaceWith(groups[i]);});root.dataset.e2Outlined='true';
  }
  function apply(main){
    if(!L.examScope||L.examScope.current()!=='exam2')return;
    main.querySelectorAll('[data-e2-reading]').forEach(function(root){
      var specs=plans[root.dataset.e2Reading];if(!specs||root.closest('.item,.feedback,.opts,.casebox'))return;
      // Short lesson excerpts retain their existing paragraph scope.
      if(root.dataset.e2Excerpt==='true')specs=specs.slice(0,1);
      format(root,specs,root.closest('.gcard')?'h3':'h4');
    });
    main.querySelectorAll('[data-e2-note-source]').forEach(function(root){var specs=sources[root.dataset.e2NoteSource];if(specs)format(root,specs,'h4');});
  }
  function passageHTML(key,text){
    var esc=L.util.esc;
    if(!sources[key])return '<p class="e2-passage">'+esc(text)+'</p>';
    return '<div data-e2-note-source="'+esc(key)+'">'+text.split(/\n\n/).map(function(p){return '<p>'+esc(p)+'</p>';}).join('')+'</div>';
  }
  L.exam2Notes={apply:apply,passageHTML:passageHTML,plans:plans};
})(window.L);
