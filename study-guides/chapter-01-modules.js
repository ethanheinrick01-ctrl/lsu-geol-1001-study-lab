window.GEOL_MODULES = [
  {
    id: "method-ilea",
    number: 1,
    title: "Think Like a Geologist",
    kicker: "Method + ILEA",
    description: "Move from observation to a testable interpretation, then revise it when evidence changes.",
    source: "Lecture 1a s18; Lecture 1b s2",
    emphasis: "Taught in class",
    concepts: [
      { id: "research-method", label: "Research method" },
      { id: "ilea-cycle", label: "ILEA cycle" }
    ],
    activities: [
      {
        id: "m1-lesson",
        type: "lesson",
        title: "Evidence before interpretation",
        source: "Lecture 1b s2",
        body: [
          "Geology begins with what can be observed or measured. Description comes before explanation.",
          "A hypothesis must be testable. New evidence can force an adjustment before a model or interpretation is built."
        ],
        keyPoints: [
          "Observe -> describe -> question -> hypothesis -> test -> adjust -> model.",
          "Revision is a strength of the method, not a failure."
        ]
      },
      {
        id: "m1-order",
        type: "match",
        concept: "research-method",
        prompt: "Assign each research-method action its correct position.",
        rows: [
          { label: "Observe", answer: "1" },
          { label: "Describe", answer: "2" },
          { label: "Ask a question", answer: "3" },
          { label: "Form a hypothesis", answer: "4" },
          { label: "Test the hypothesis", answer: "5" },
          { label: "Adjust using new data", answer: "6" },
          { label: "Build a model or interpretation", answer: "7" }
        ],
        options: ["1", "2", "3", "4", "5", "6", "7"],
        hint: "The sequence starts with visible evidence and ends with a defensible interpretation.",
        explanation: "The deck places adjustment after testing and before the final model. That ordering prevents a favored explanation from outrunning the evidence.",
        source: "Lecture 1b s2"
      },
      {
        id: "m1-hypothesis",
        type: "single",
        concept: "research-method",
        prompt: "Which statement is a testable geologic hypothesis?",
        choices: [
          "This cliff is the most impressive feature in the region.",
          "If the lower layer erodes faster than the upper layer, undercutting should increase after heavy rain.",
          "The landscape was designed to look dramatic.",
          "Brown rocks are always older than gray rocks."
        ],
        answer: 1,
        hint: "Choose the claim that predicts an observable result.",
        explanation: "The erosion statement predicts a measurable change and can be supported or falsified. Preference, purpose, and an absolute color rule are not defensible tests.",
        source: "Original practice derived from Lecture 1b s2 and s9"
      },
      {
        id: "m1-ilea-map",
        type: "match",
        concept: "ilea-cycle",
        prompt: "Match each ILEA move to what it contributes.",
        rows: [
          { label: "Predict", answer: "State an initial expectation" },
          { label: "Draw", answer: "Make relationships visible" },
          { label: "Justify", answer: "Defend the prediction with reasoning" },
          { label: "Research", answer: "Seek relevant evidence" },
          { label: "Revise", answer: "Update understanding from evidence" }
        ],
        options: [
          "State an initial expectation",
          "Make relationships visible",
          "Defend the prediction with reasoning",
          "Seek relevant evidence",
          "Update understanding from evidence"
        ],
        hint: "Think of the cycle as claim -> representation -> defense -> evidence -> correction.",
        explanation: "ILEA grading emphasizes the reasoning chain, not merely the final answer.",
        source: "Lecture 1a s18"
      },
      {
        id: "m1-ilea-teach",
        type: "teachback",
        concept: "ilea-cycle",
        prompt: "Teach back why an ILEA answer can improve even when the original prediction was wrong.",
        rubric: [
          "Names evidence or research as the basis for revision.",
          "Explains that justification makes the reasoning inspectable.",
          "Treats revision as learning rather than hiding the first prediction."
        ],
        hint: "Focus on the movement from prediction to revised understanding.",
        explanation: "A wrong prediction can still produce strong learning when its reasoning is explicit and the revision follows evidence.",
        source: "Lecture 1a s18"
      }
    ]
  },
  {
    id: "observation-inference",
    number: 2,
    title: "Observation vs. Inference",
    kicker: "The central habit",
    description: "Separate what a figure shows from the history or process proposed to explain it.",
    source: "Lecture 1b s3-4, s9-11",
    emphasis: "Taught in class",
    concepts: [{ id: "observation-inference", label: "Observation vs. inference" }],
    activities: [
      {
        id: "m2-lesson",
        type: "lesson",
        title: "Do not smuggle the explanation into the observation",
        source: "Lecture 1b s9-11",
        body: [
          "An observation reports what is visible or measured. An inference proposes an event, process, age, or future outcome.",
          "Maps, photographs, and artistic reconstructions are representations. They still require evidence and do not explain themselves."
        ],
        keyPoints: [
          "Observation: layered tan and brown rock is exposed.",
          "Inference: differential erosion produced the cliff."
        ]
      },
      {
        id: "m2-sort",
        type: "sort",
        concept: "observation-inference",
        prompt: "Classify each statement about a layered cliff.",
        groups: ["Observation", "Inference"],
        items: [
          { text: "Tan, brown, and yellowish layers are exposed.", group: "Observation" },
          { text: "Several blocks are perched near the cliff edge.", group: "Observation" },
          { text: "The lower layer eroded more quickly.", group: "Inference" },
          { text: "A future rockfall is possible.", group: "Inference" },
          { text: "The upper cliff is brown.", group: "Observation" },
          { text: "Water helped shape the slope.", group: "Inference" }
        ],
        hint: "Ask whether a camera or measurement could record the statement directly.",
        explanation: "Colors, layers, and positions are observations. Erosion history and future instability are interpretations that require testing.",
        source: "Original practice derived from Lecture 1b s9"
      },
      {
        id: "m2-reconstruction",
        type: "single",
        concept: "observation-inference",
        prompt: "A Jurassic scene shows dinosaurs beside a lake. What is the scene itself?",
        choices: [
          "Direct evidence collected in the Jurassic",
          "An artistic interpretation that must be supported by preserved evidence",
          "Proof that every illustrated species lived together",
          "A measurement of the Jurassic atmosphere"
        ],
        answer: 1,
        hint: "The slide explicitly distinguishes the image from the evidence behind it.",
        explanation: "The scene is a reconstruction. Fossils, tracks, burrows, bones, teeth, and other traces are evidence that could support parts of it.",
        source: "Lecture 1b s11"
      },
      {
        id: "m2-teach",
        type: "teachback",
        concept: "observation-inference",
        prompt: "Write one observation and one inference for a cliff with horizontal layers and a detached block below it.",
        rubric: [
          "Observation is limited to visible geometry, color, position, or measurement.",
          "Inference proposes a process or history such as erosion or rockfall.",
          "The inference is framed as testable rather than certain."
        ],
        hint: "Start the observation with 'I can see...' and the inference with 'This may indicate...'.",
        explanation: "Clean separation makes the interpretation testable and reveals what additional evidence is needed.",
        source: "Original practice derived from Lecture 1b s9"
      }
    ]
  },
  {
    id: "hazards-resources",
    number: 3,
    title: "Hazards, Resources, and Settlement",
    kicker: "Geology controls choices",
    description: "Read a landscape as a set of interacting risks, resources, and constraints.",
    source: "Lecture 1b s5-7",
    emphasis: "Taught in class",
    concepts: [
      { id: "hazard-siting", label: "Hazard-aware siting" },
      { id: "resource-distribution", label: "Resource distribution" }
    ],
    activities: [
      {
        id: "m3-lesson",
        type: "lesson",
        title: "A feature can be both useful and dangerous",
        source: "Lecture 1b s5-7",
        body: [
          "Volcanoes, faults, steep slopes, streams, and soil influence settlement and infrastructure.",
          "A stream can supply water and nutrients while also creating flood hazard. Resource locations reflect rock age and geologic history rather than random placement."
        ],
        keyPoints: [
          "Risk depends on where people and structures sit relative to the hazard.",
          "Resource patterns can preserve atmospheric and tectonic history."
        ]
      },
      {
        id: "m3-hazard-map",
        type: "hazard",
        concept: "hazard-siting",
        prompt: "Choose the strongest preliminary settlement zone on the original hazard schematic.",
        choices: [
          "Zone A - volcanic flank",
          "Zone B - stable upland away from mapped hazards",
          "Zone C - active floodplain",
          "Zone D - fault beside a steep slope"
        ],
        answer: 1,
        hint: "Avoid the active channel, fault, steep slope, and volcanic flank while retaining access to water.",
        explanation: "Zone B is the strongest preliminary choice because it is separated from the mapped fault, floodplain, steep slope, and volcanic flank. A real siting decision would still require field and subsurface data.",
        source: "Original schematic derived from Lecture 1b s5"
      },
      {
        id: "m3-streams",
        type: "multi",
        concept: "hazard-siting",
        prompt: "Which consequences are linked to streams in the lecture? Select all that apply.",
        choices: ["Flood hazard", "Water supply", "Soil nutrients", "Elimination of all slope hazards"],
        answer: [0, 1, 2],
        hint: "The same feature can provide resources and create risk.",
        explanation: "Streams can flood, supply water, and transport nutrients. They do not eliminate hazards elsewhere in a landscape.",
        source: "Lecture 1b s5"
      },
      {
        id: "m3-resources",
        type: "single",
        concept: "resource-distribution",
        prompt: "What is the strongest conclusion supported by the lecture's iron-versus-copper example?",
        choices: [
          "Mine locations are random once enough deposits are mapped.",
          "Iron and copper must form at the same time.",
          "Resource distributions can reflect rock age, atmospheric change, and mountain-building history.",
          "Every old rock contains an economic iron deposit."
        ],
        answer: 2,
        hint: "Connect location and age to the geologic process recorded by the rocks.",
        explanation: "The verified slide text links old iron deposits to early atmospheric change and younger western copper deposits to mountain building. It does not support universal or random claims.",
        source: "Lecture 1b s7; map visual unavailable, claim text verified"
      },
      {
        id: "m3-resource-teach",
        type: "teachback",
        concept: "resource-distribution",
        prompt: "Explain why a mineral-resource map is evidence of geologic history rather than merely a list of mine locations.",
        rubric: [
          "Connects mine location to rock age or geologic setting.",
          "Names atmospheric change or mountain building as an example.",
          "Avoids claiming that location alone proves a single cause."
        ],
        hint: "Use the chain location -> rock age/setting -> geologic process.",
        explanation: "Spatial patterns become geologic evidence when they are tied to dated rocks and a process capable of producing the deposit.",
        source: "Lecture 1b s7; map visual unavailable, claim text verified"
      },
      {
        id: "m3-ilea-teach",
        type: "teachback",
        concept: "hazard-siting",
        prompt: "Use the ILEA cycle to explain how new flood data could change your settlement choice.",
        rubric: [
          "States an initial prediction or zone choice.",
          "Uses flood evidence to justify a revision.",
          "Keeps other hazards and resources in the updated reasoning."
        ],
        hint: "Do not jump from new data straight to an unsupported conclusion.",
        explanation: "A strong revision preserves the full landscape model while changing the parts contradicted by new evidence.",
        source: "Original practice derived from Lecture 1a s18 and Lecture 1b s5"
      }
    ]
  },
  {
    id: "geologic-evidence",
    number: 4,
    title: "Read Evidence Across Time",
    kicker: "Coasts, cliffs, ice, life",
    description: "Use present patterns to constrain past environments without turning a figure into proof of one cause.",
    source: "Lecture 1b s8-11",
    emphasis: "Taught in class",
    concepts: [{ id: "geologic-evidence", label: "Geologic evidence" }],
    activities: [
      {
        id: "m4-lesson",
        type: "lesson",
        title: "Representations carry different kinds of evidence",
        source: "Lecture 1b s8-11",
        body: [
          "The present shoreline is not the edge of the continent; the continental shelf continues offshore.",
          "A comparison of ice extent is evidence of change, but it does not identify a single cause by itself. An artistic reconstruction is not the same as a fossil or trace."
        ],
        keyPoints: [
          "Describe the pattern first.",
          "State what the evidence constrains and what remains uncertain."
        ]
      },
      {
        id: "m4-shelf",
        type: "single",
        concept: "geologic-evidence",
        prompt: "Why is the current shoreline not necessarily the edge of a continent?",
        choices: [
          "Continents end only at mountain ranges.",
          "The continental shelf extends beneath shallow water to its outer edge.",
          "Shorelines never change position.",
          "Oceanic crust is exposed on every beach."
        ],
        answer: 1,
        hint: "Separate the land-water boundary from the crustal boundary.",
        explanation: "The shoreline marks today's land-water boundary. The outer edge of the shallow continental shelf marks the continent's edge in the lecture figure.",
        source: "Lecture 1b s8"
      },
      {
        id: "m4-fossils",
        type: "multi",
        concept: "geologic-evidence",
        prompt: "Which findings could support a reconstruction of ancient animal life? Select all that apply.",
        choices: ["Bones or teeth", "Tracks or burrows", "Coprolites or other traces", "An artist's preference for color"],
        answer: [0, 1, 2],
        hint: "Choose preserved physical evidence rather than choices made by the illustrator.",
        explanation: "Body fossils and trace fossils constrain ancient organisms and behavior. Artistic choices are not Jurassic evidence.",
        source: "Lecture 1b s11; examples clarified in the Lecture 1 study guide"
      },
      {
        id: "m4-climate",
        type: "single",
        concept: "geologic-evidence",
        prompt: "What does the 28,000-years-ago versus present ice comparison directly establish?",
        choices: [
          "The extent of glaciers and ice sheets changed.",
          "One specific cause produced all of the change.",
          "Continents occupied identical positions throughout Earth history.",
          "No additional climate evidence is needed."
        ],
        answer: 0,
        hint: "Choose the pattern visible in the comparison, not a cause that the figure alone cannot prove.",
        explanation: "The comparison documents a major change in ice extent. Identifying causes requires additional evidence and testing.",
        source: "Lecture 1b s10"
      },
      {
        id: "m4-seafloor",
        type: "sort",
        concept: "geologic-evidence",
        prompt: "Classify what the Australia figure shows versus what it suggests.",
        groups: ["Shown directly", "Interpretation to test"],
        items: [
          { text: "A shallow shelf surrounds much of the land.", group: "Shown directly" },
          { text: "The brown-blue boundary is the current shoreline.", group: "Shown directly" },
          { text: "Different seafloor complexity records different histories.", group: "Interpretation to test" },
          { text: "Every complex seafloor feature formed in one event.", group: "Interpretation to test" }
        ],
        hint: "Visible boundaries and relief are observations; histories are interpretations.",
        explanation: "The figure shows shelf geometry and seafloor relief. Geologic history is inferred from those patterns and must be tested with additional data.",
        source: "Original practice derived from Lecture 1b s8"
      },
      {
        id: "m4-teach",
        type: "teachback",
        concept: "geologic-evidence",
        prompt: "Explain why a reconstruction can be scientifically useful without being direct evidence.",
        rubric: [
          "Identifies the reconstruction as a model or interpretation.",
          "Names physical evidence that can support or challenge it.",
          "Acknowledges uncertainty rather than treating the image as proof."
        ],
        hint: "A useful model organizes evidence and makes claims that can be checked.",
        explanation: "Reconstructions are valuable when they synthesize evidence transparently and remain revisable.",
        source: "Lecture 1b s11"
      }
    ]
  },
  {
    id: "earth-layers",
    number: 5,
    title: "Two Ways to Divide Earth",
    kicker: "Composition vs. behavior",
    description: "Label Earth's compositional layers without confusing them with the mechanical layers.",
    source: "Lecture 1b s12-14",
    emphasis: "Taught in class",
    concepts: [
      { id: "compositional-layers", label: "Compositional layers" },
      { id: "mechanical-layers", label: "Mechanical layers" }
    ],
    activities: [
      {
        id: "m5-lesson",
        type: "lesson",
        title: "The classifications overlap",
        source: "Lecture 1b s12-14",
        body: [
          "By composition, Earth has crust, mantle, and an iron-nickel core. The core includes a molten outer part and solid inner part.",
          "By mechanical behavior, the strong lithosphere includes crust plus uppermost mantle. The asthenosphere below it is hot, weak, and mostly solid."
        ],
        keyPoints: [
          "Lithosphere is not a synonym for crust.",
          "Asthenosphere is weak, not a global ocean of liquid magma."
        ]
      },
      {
        id: "m5-label",
        type: "label",
        concept: "compositional-layers",
        prompt: "Place the three compositional labels on the original Earth cross-section.",
        labels: ["Crust", "Mantle", "Core"],
        zones: [
          { id: "crust", answer: "Crust" },
          { id: "mantle", answer: "Mantle" },
          { id: "core", answer: "Core" }
        ],
        hint: "The thinnest outer shell is crust; the mantle is the thickest layer; the core is deepest.",
        explanation: "Crust, mantle, and core are compositional divisions. Continental and oceanic crust are both parts of the outer compositional layer.",
        source: "Original diagram derived from Lecture 1b s12"
      },
      {
        id: "m5-comp-match",
        type: "match",
        concept: "compositional-layers",
        prompt: "Match each compositional layer to its defining lecture fact.",
        rows: [
          { label: "Crust", answer: "Continental and oceanic types" },
          { label: "Mantle", answer: "Thickest compositional layer" },
          { label: "Core", answer: "Iron-nickel; outer molten and inner solid" }
        ],
        options: ["Continental and oceanic types", "Thickest compositional layer", "Iron-nickel; outer molten and inner solid"],
        hint: "Use composition and position, not strength.",
        explanation: "These are material-based divisions. Strength belongs to the mechanical classification.",
        source: "Lecture 1b s12-13"
      },
      {
        id: "m5-lithosphere",
        type: "single",
        concept: "mechanical-layers",
        prompt: "Which description of the lithosphere is correct?",
        choices: [
          "Only continental crust",
          "All of the mantle",
          "Strong crust plus the uppermost mantle",
          "The molten outer core"
        ],
        answer: 2,
        hint: "The mechanical boundary crosses the crust-mantle compositional boundary.",
        explanation: "The lithosphere is a strong mechanical layer that contains the crust and uppermost mantle.",
        source: "Lecture 1b s14"
      },
      {
        id: "m5-asthenosphere",
        type: "single",
        concept: "mechanical-layers",
        prompt: "Which statement best matches the lecture's asthenosphere?",
        choices: [
          "Cold, rigid, and completely liquid",
          "Hot, weak, and mostly solid",
          "Identical to oceanic crust",
          "Made only of molten iron"
        ],
        answer: 1,
        hint: "Weak does not mean completely liquid.",
        explanation: "The deck explicitly describes the asthenosphere as hot and weak but mostly solid.",
        source: "Lecture 1b s14"
      },
      {
        id: "m5-teach",
        type: "teachback",
        concept: "mechanical-layers",
        prompt: "Explain why a diagram can place mantle material inside both the lithosphere and asthenosphere.",
        rubric: [
          "Distinguishes composition from mechanical behavior.",
          "States that uppermost mantle can be strong and lithospheric.",
          "States that deeper mantle material can be weak and asthenospheric."
        ],
        hint: "The same compositional material can behave differently at different depths.",
        explanation: "The classifications answer different questions: what the material is versus how it behaves.",
        source: "Lecture 1b s12 and s14"
      }
    ]
  },
  {
    id: "isostasy",
    number: 6,
    title: "Make Isostasy Move",
    kicker: "Thickness up, density down",
    description: "Manipulate a floating-block model and predict how crustal thickness and density affect elevation.",
    source: "Lecture 1b s15-16",
    emphasis: "Taught in class",
    concepts: [{ id: "isostasy", label: "Isostasy" }],
    activities: [
      {
        id: "m6-lesson",
        type: "lesson",
        title: "Elevation reflects both thickness and density",
        source: "Lecture 1b s15-16",
        body: [
          "The floating-block analogy gives two rules: thick blocks ride higher than thin blocks, and denser blocks ride lower than less-dense blocks.",
          "Continental crust is generally higher than oceanic crust, and high mountain regions may have deep crustal roots."
        ],
        keyPoints: ["Increasing thickness raises the exposed height.", "Increasing density lowers the exposed height."]
      },
      {
        id: "m6-simulator",
        type: "isostasy",
        concept: "isostasy",
        prompt: "Use the sliders, then choose the block expected to ride highest.",
        choices: [
          "Thick and relatively low-density",
          "Thin and relatively low-density",
          "Thick and relatively high-density",
          "Thin and relatively high-density"
        ],
        answer: 0,
        hint: "Both greater thickness and lower density favor greater exposed height.",
        explanation: "The thick, low-density block combines both elevation-raising effects in the lecture analogy.",
        source: "Original interactive model derived from Lecture 1b s15-16"
      },
      {
        id: "m6-scenario",
        type: "single",
        concept: "isostasy",
        prompt: "Two blocks have equal thickness. Block X is denser than Block Y. Which prediction follows?",
        choices: ["X rides higher", "Y rides higher", "Both must ride at the same height", "Thickness reverses density"],
        answer: 1,
        hint: "Hold thickness constant and vary only density.",
        explanation: "When thickness is equal, the less-dense block rides higher in the floating-block analogy.",
        source: "Original practice derived from Lecture 1b s16"
      },
      {
        id: "m6-teach",
        type: "teachback",
        concept: "isostasy",
        prompt: "Explain why a mountain belt may have a deep crustal root rather than being only material piled on top.",
        rubric: [
          "Connects high elevation with thick crust.",
          "Uses the floating or isostatic relationship.",
          "Avoids claiming density is irrelevant."
        ],
        hint: "Think of how much of a thick floating block lies below the waterline.",
        explanation: "A thick crustal block can extend downward into the mantle while also supporting higher topography.",
        source: "Lecture 1b s15-16; Lecture 1 study guide"
      }
    ]
  },
  {
    id: "drivers-atmosphere",
    number: 7,
    title: "Trace Forces, Energy, and Water",
    kicker: "Inside, outside, atmosphere",
    description: "Classify Earth-system drivers and follow causal chains through the atmosphere and surface.",
    source: "Lecture 1b s17-18",
    emphasis: "Taught in class",
    concepts: [
      { id: "earth-drivers", label: "Earth-system drivers" },
      { id: "atmosphere", label: "Atmospheric effects" }
    ],
    activities: [
      {
        id: "m7-lesson",
        type: "lesson",
        title: "Memorize arrows, not a flat list",
        source: "Lecture 1b s17-18",
        body: [
          "External or surface-linked drivers include solar energy, atmospheric pressure, wind, ocean currents, and gravity acting at the surface.",
          "Internal drivers include radioactive decay, heat transfer, and forces within Earth. The atmosphere moves water and energy while blocking some incoming and outgoing radiation."
        ],
        keyPoints: [
          "Driver -> transfer -> material response.",
          "The atmosphere mediates both the water cycle and energy balance."
        ]
      },
      {
        id: "m7-sort",
        type: "sort",
        concept: "earth-drivers",
        prompt: "Classify each driver using the lecture's inside-versus-outside framing.",
        groups: ["External or surface-linked", "Internal"],
        items: [
          { text: "Sun's energy", group: "External or surface-linked" },
          { text: "Wind and ocean currents", group: "External or surface-linked" },
          { text: "Radioactive decay", group: "Internal" },
          { text: "Heat transfer from Earth's interior", group: "Internal" },
          { text: "Atmospheric pressure", group: "External or surface-linked" },
          { text: "Forces within Earth", group: "Internal" }
        ],
        hint: "Ask whether the energy or force originates inside Earth or acts mainly at the surface.",
        explanation: "The classification is a starting point; many processes interact across the boundary.",
        source: "Lecture 1b s17"
      },
      {
        id: "m7-driver-chain",
        type: "single",
        concept: "earth-drivers",
        prompt: "Which chain begins with an internal driver?",
        choices: [
          "Solar energy -> evaporation -> precipitation",
          "Radioactive decay -> internal heat -> movement of Earth materials",
          "Wind -> waves -> coastal erosion",
          "Atmospheric pressure -> moving air"
        ],
        answer: 1,
        hint: "Look for the energy source located within Earth.",
        explanation: "Radioactive decay contributes internal heat. The other chains begin with surface-linked or atmospheric drivers.",
        source: "Original practice derived from Lecture 1b s17"
      },
      {
        id: "m7-atmosphere",
        type: "multi",
        concept: "atmosphere",
        prompt: "Which atmospheric effects appear in the lecture figure? Select all that apply.",
        choices: [
          "Stores water vapor, droplets, and ice crystals",
          "Produces precipitation and wind",
          "Blocks some light, UV, and infrared energy",
          "Stops all solar energy from reaching Earth"
        ],
        answer: [0, 1, 2],
        hint: "The atmosphere modifies energy flow; it does not eliminate it.",
        explanation: "The figure links the atmosphere to water storage, precipitation, wind, and selective blocking of radiation.",
        source: "Lecture 1b s18"
      },
      {
        id: "m7-teach",
        type: "teachback",
        concept: "atmosphere",
        prompt: "Trace one complete water-and-energy pathway from the Sun to precipitation.",
        rubric: [
          "Begins with solar energy absorbed by land or water.",
          "Includes evaporation and atmospheric water.",
          "Ends with condensation/precipitation or another explicit return pathway."
        ],
        hint: "Use arrows: solar energy -> surface heating -> evaporation -> atmospheric water -> precipitation.",
        explanation: "Causal tracing turns the lecture figure into a working Earth-system model.",
        source: "Lecture 1b s18"
      }
    ]
  },
  {
    id: "rocks-spheres-scale",
    number: 8,
    title: "Rocks, Spheres, and Scale",
    kicker: "Core + continuation",
    description: "Distinguish surface and magma-formed rocks, then preview the continuation material without overstating classroom emphasis.",
    source: "Lecture 1b s19-31",
    emphasis: "Slides 24-31: class emphasis unconfirmed",
    continuation: true,
    concepts: [
      { id: "rock-forming", label: "Rock-forming logic" },
      { id: "continuation-context", label: "Continuation concepts" },
      { id: "earth-context", label: "Spheres and scale" }
    ],
    activities: [
      {
        id: "m8-lesson",
        type: "lesson",
        title: "Master the stopping point; preview what follows",
        source: "Lecture 1b s19-31; speaker note on s23",
        status: "continuation",
        body: [
          "Sedimentary rocks form in ordinary surface environments. Igneous rock is defined by solidification of magma; slide 23 is the recorded classroom stopping point.",
          "Slides 24-31 continue into metamorphic and hydrothermal rocks, the rock cycle, Earth's four spheres, and solar-system scale. Those ideas are represented in the deck but not assigned equal classroom emphasis here."
        ],
        keyPoints: [
          "Sedimentary: surface environments.",
          "Igneous: solidification of magma.",
          "Continuation material stays visibly marked."
        ]
      },
      {
        id: "m8-sedimentary",
        type: "multi",
        concept: "rock-forming",
        prompt: "Which settings are associated with sedimentary rocks in the lecture? Select all that apply.",
        choices: ["Rivers", "Glaciers", "Beaches and offshore settings", "Only molten magma chambers"],
        answer: [0, 1, 2],
        hint: "The lecture groups many ordinary surface environments together.",
        explanation: "Rivers, glaciers, lakes, mountain fronts, dunes, beaches, and offshore settings are presented as sedimentary environments.",
        source: "Lecture 1b s19-22"
      },
      {
        id: "m8-igneous",
        type: "single",
        concept: "rock-forming",
        prompt: "What single process defines igneous-rock formation in this lecture?",
        choices: ["Burial of sediment", "Solidification of magma", "Precipitation from hot water", "Increased temperature and pressure"],
        answer: 1,
        hint: "The process can occur at depth or after eruption.",
        explanation: "Igneous rock forms when magma solidifies, including volcanic and intrusive settings.",
        source: "Lecture 1b s23; recorded classroom stopping point"
      },
      {
        id: "m8-rock-match",
        type: "match",
        concept: "continuation-context",
        prompt: "Match each rock family to its defining formation logic.",
        status: "continuation",
        rows: [
          { label: "Sedimentary", answer: "Forms in normal surface environments" },
          { label: "Igneous", answer: "Solidification of magma" },
          { label: "Metamorphic", answer: "Changed by heat and pressure" },
          { label: "Hydrothermal", answer: "Precipitation from hot water" }
        ],
        options: ["Forms in normal surface environments", "Solidification of magma", "Changed by heat and pressure", "Precipitation from hot water"],
        hint: "Use the process, not the rock's appearance.",
        explanation: "The later two families appear after the recorded stop and therefore remain marked as continuation content.",
        source: "Lecture 1b s19, s23, s26-28; s24-31 continuation"
      },
      {
        id: "m8-cycle",
        type: "single",
        concept: "continuation-context",
        status: "continuation",
        prompt: "Which statement best describes the rock-cycle figure?",
        choices: [
          "Every rock begins as sedimentary rock.",
          "A rock can enter different linked processes; the cycle has no single required starting point.",
          "Uplift and burial are identical processes.",
          "Melting directly produces sedimentary rock."
        ],
        answer: 1,
        hint: "A cycle has linked pathways rather than one privileged beginning.",
        explanation: "Weathering, transport, deposition, burial, metamorphism, melting, solidification, and uplift connect in multiple pathways.",
        source: "Lecture 1b s29; deck continuation"
      },
      {
        id: "m8-spheres",
        type: "single",
        concept: "earth-context",
        status: "continuation",
        prompt: "Which set matches the four spheres named in the lecture?",
        choices: [
          "Atmosphere, hydrosphere, biosphere, lithosphere",
          "Crust, mantle, outer core, inner core",
          "Troposphere, stratosphere, mantle, core",
          "Oceanic crust, continental crust, magma, sediment"
        ],
        answer: 0,
        hint: "The spheres group air, water, life, and the strong rocky exterior.",
        explanation: "The deck names atmosphere, hydrosphere, biosphere, and lithosphere.",
        source: "Lecture 1b s30; deck continuation"
      },
      {
        id: "m8-scale",
        type: "single",
        concept: "earth-context",
        status: "continuation",
        prompt: "Why should the solar-system figure not be read literally for size or spacing?",
        choices: [
          "It omits Earth.",
          "It states that object size and proximity are not to scale.",
          "Planetary orbits are perfectly square.",
          "The Sun is smaller than Mercury."
        ],
        answer: 1,
        hint: "Read the explicit warning at the bottom of the figure.",
        explanation: "The diagram organizes the objects but deliberately distorts their relative size and proximity.",
        source: "Lecture 1b s31; deck continuation"
      },
      {
        id: "m8-teach",
        type: "teachback",
        concept: "continuation-context",
        status: "continuation",
        prompt: "Explain how a rock could move from exposure at the surface to metamorphism and then become igneous rock.",
        rubric: [
          "Includes weathering/transport/deposition and burial or another defensible path inward.",
          "Includes heat and pressure for metamorphism.",
          "Includes melting followed by solidification for igneous rock."
        ],
        hint: "Build a process chain; do not simply list rock names.",
        explanation: "Rock-cycle reasoning follows transformations: burial and deformation can produce metamorphism; melting and later solidification produce igneous rock.",
        source: "Lecture 1b s29; deck continuation"
      }
    ]
  }
];
