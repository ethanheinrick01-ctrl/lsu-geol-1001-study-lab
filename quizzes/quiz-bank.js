window.GEOL_QUIZZES = [
  {
    id: "foundations-starter",
    title: "Foundations Starter Drill",
    description: "An original orientation drill for core physical-geology reasoning. Replace or expand it as lecture evidence accumulates.",
    lane: "Exam 1",
    chapters: "Chapters 1–2",
    status: "Starter bank",
    questions: [
      {
        type: "single",
        topic: "Scientific reasoning",
        source: "Original practice · verify with Lecture 1",
        prompt: "Which statement is a testable scientific hypothesis?",
        choices: [
          "Granite is more beautiful than basalt.",
          "A mineral sample will scratch glass if its hardness exceeds the hardness of glass.",
          "Earth's history has a hidden purpose.",
          "Volcanoes are inherently evil."
        ],
        answer: 1,
        explanation: "A testable hypothesis predicts an observable result. A scratch test can support or falsify the hardness claim; the other statements are value judgments or non-testable claims."
      },
      {
        type: "true-false",
        topic: "Geologic time",
        source: "Original practice · verify with Chapter 1",
        prompt: "Uniformitarianism requires geologic processes to have always occurred at exactly the same rates seen today.",
        choices: ["True", "False"],
        answer: 1,
        explanation: "Uniformitarian reasoning uses present processes to interpret the past, but it does not require constant rates or exclude rare, high-magnitude events."
      },
      {
        type: "single",
        topic: "Earth systems",
        source: "Original practice · verify with Chapter 1",
        prompt: "A volcanic eruption adds ash to the atmosphere, which changes rainfall and accelerates erosion. What does this best demonstrate?",
        choices: [
          "Earth systems operate independently.",
          "Only the solid Earth controls geology.",
          "The geosphere, atmosphere, hydrosphere, and biosphere can exchange matter and energy.",
          "Weather and geology occur on unrelated timescales."
        ],
        answer: 2,
        explanation: "The example is a chain of interactions among Earth systems. Matter and energy cross system boundaries, producing feedbacks."
      },
      {
        type: "single",
        topic: "Hazards and risk",
        source: "Original practice · verify with Lecture 1",
        prompt: "Two towns face the same probability of earthquake shaking. Town A has enforced seismic building codes; Town B has not. Which statement is strongest?",
        choices: [
          "The seismic hazard is necessarily greater in Town A.",
          "Town B can have greater risk because vulnerability is greater.",
          "Both towns must have identical risk because the hazard is identical.",
          "Building codes change the earthquake's magnitude."
        ],
        answer: 1,
        explanation: "Risk depends on hazard, exposure, and vulnerability. Similar shaking hazard can produce different losses when infrastructure vulnerability differs."
      },
      {
        type: "multi",
        topic: "Evidence",
        source: "Original practice · verify with Lecture 1",
        prompt: "Which observations could help a geologist reconstruct an ancient environment? Select all that apply.",
        choices: [
          "Sedimentary structures",
          "Fossil assemblages",
          "Mineral composition",
          "The researcher's favorite color"
        ],
        answer: [0, 1, 2],
        explanation: "Structures, fossils, and minerals preserve environmental information. Personal preference is not physical evidence about the ancient setting."
      },
      {
        type: "single",
        topic: "Scale",
        source: "Original practice · verify with Chapter 1",
        prompt: "Why can a very slow geologic process still produce a major landscape change?",
        choices: [
          "Small rates accumulated over long intervals can yield large total change.",
          "Slow processes violate conservation of energy.",
          "Landscapes respond only to sudden events.",
          "Geologic time is too short for accumulation."
        ],
        answer: 0,
        explanation: "Rate multiplied by time gives total change. Even a small annual rate can produce a large result over thousands or millions of years."
      },
      {
        type: "single",
        topic: "Models",
        source: "Original practice · verify with Lecture 1",
        prompt: "What is the best use of a scientific model in geology?",
        choices: [
          "To reproduce every detail of Earth without assumptions",
          "To replace observation with authority",
          "To simplify a system so predictions and explanations can be tested",
          "To prove a conclusion permanently"
        ],
        answer: 2,
        explanation: "Models deliberately simplify reality. Their value comes from organizing evidence and producing predictions that can be compared with observations."
      },
      {
        type: "true-false",
        topic: "Resources",
        source: "Original practice · verify with Lecture 1",
        prompt: "A geologic resource can be abundant in Earth's crust yet economically unavailable at a particular location.",
        choices: ["True", "False"],
        answer: 0,
        explanation: "Economic availability depends on concentration, accessibility, extraction technology, environmental constraints, and cost—not abundance alone."
      }
    ]
  },
  {
    id: "chapter-one-boss-drill",
    title: "Chapter 1 Boss Drill",
    description: "A 30-question, source-linked cumulative retrieval run covering the complete Lecture 1 evidence set.",
    lane: "Exam 1",
    chapters: "Chapter 1",
    status: "Verified pilot bank",
    questions: [
      {
        type: "single",
        topic: "Research method",
        source: "Original practice · Lecture 1b s2",
        prompt: "Which action belongs immediately after testing a hypothesis in the lecture sequence?",
        choices: ["Observe again without recording data", "Adjust the hypothesis using new data", "Declare the model permanent", "Skip directly to publication"],
        answer: 1,
        explanation: "The sequence is observe, describe, question, hypothesize, test, adjust using new data, then build a model or interpretation."
      },
      {
        type: "single",
        topic: "Research method",
        source: "Original practice · Lecture 1b s2",
        prompt: "Which statement is a testable hypothesis?",
        choices: ["Basalt is the nicest rock", "If a mineral is harder than glass, it should scratch glass", "Earth has a hidden purpose", "All mountains are beautiful"],
        answer: 1,
        explanation: "A scratch test produces an observable result that can support or falsify the claim."
      },
      {
        type: "single",
        topic: "Observation and inference",
        source: "Original practice · Lecture 1b s9",
        prompt: "Which statement is an observation rather than an inference?",
        choices: ["The cliff formed during one flood", "A brown block rests near the edge", "The lower layer eroded fastest", "The block will fall next year"],
        answer: 1,
        explanation: "The block's color and position are visible. Formation process, erosion rate, and future timing are interpretations."
      },
      {
        type: "single",
        topic: "ILEA reasoning",
        source: "Original practice · Lecture 1a s18",
        prompt: "What is the final move in the ILEA cycle?",
        choices: ["Predict", "Draw", "Research", "Revise understanding"],
        answer: 3,
        explanation: "ILEA uses Predict -> Draw -> Justify -> Research -> Revise Understanding."
      },
      {
        type: "single",
        topic: "Hazards",
        source: "Original practice · Lecture 1b s5",
        prompt: "Which geologic feature is most directly associated with earthquake hazard in the lecture landscape?",
        choices: ["Fault", "Beach", "Lake", "Soil nutrient"],
        answer: 0,
        explanation: "The lecture explicitly links earthquakes to faults."
      },
      {
        type: "single",
        topic: "Hazards",
        source: "Original practice · Lecture 1b s5",
        prompt: "Why can a steep slope constrain settlement even without an active volcano?",
        choices: ["It guarantees rich soil", "It can be difficult to build on and may fail as a landslide", "It removes flood risk everywhere", "It converts crust into core"],
        answer: 1,
        explanation: "Steepness can limit construction and increase mass-movement hazard."
      },
      {
        type: "multi",
        topic: "Streams",
        source: "Original practice · Lecture 1b s5",
        prompt: "Which roles of streams appear in the lecture? Select all that apply.",
        choices: ["Flood hazard", "Water supply", "Transport of soil nutrients", "Prevention of all earthquakes"],
        answer: [0, 1, 2],
        explanation: "Streams can be both resources and hazards; they do not control earthquake occurrence."
      },
      {
        type: "single",
        topic: "Resources",
        source: "Original practice · Lecture 1b s7; map visual unavailable, claim text verified",
        prompt: "Why is mineral-resource distribution not treated as random in the lecture?",
        choices: ["Mines are placed alphabetically", "Deposits track rock age and geologic history", "Every rock contains equal ore", "Atmosphere never affects minerals"],
        answer: 1,
        explanation: "Old iron deposits and younger copper deposits are linked to different atmospheric and tectonic histories."
      },
      {
        type: "single",
        topic: "Continents",
        source: "Original practice · Lecture 1b s8",
        prompt: "What marks the edge of the continent in the Australia figure?",
        choices: ["The current shoreline", "The outer edge of the continental shelf", "The nearest river", "The deepest ocean trench anywhere"],
        answer: 1,
        explanation: "The shallow continental shelf extends offshore; its outer edge marks the continent's edge in the figure."
      },
      {
        type: "single",
        topic: "Geologic evidence",
        source: "Original practice · Lecture 1b s9",
        prompt: "Which claim about a layered cliff requires additional evidence?",
        choices: ["Tan and brown layers are exposed", "Blocks sit near the edge", "Differential erosion produced the shape", "The upper cliff is brown"],
        answer: 2,
        explanation: "Differential erosion is a process interpretation, while the other statements describe visible features."
      },
      {
        type: "single",
        topic: "Climate evidence",
        source: "Original practice · Lecture 1b s10",
        prompt: "What does the 28,000-years-ago versus present comparison directly show?",
        choices: ["Changed ice-sheet extent", "One proven cause", "No climate change", "A constant shoreline"],
        answer: 0,
        explanation: "The comparison documents change in ice extent but does not by itself prove one cause."
      },
      {
        type: "multi",
        topic: "Ancient life",
        source: "Original practice · Lecture 1b s11",
        prompt: "Which evidence could help reconstruct ancient animal life? Select all that apply.",
        choices: ["Bones and teeth", "Tracks and burrows", "Other trace fossils", "The illustrator's color palette"],
        answer: [0, 1, 2],
        explanation: "Body and trace fossils are physical evidence. Artistic choices are not evidence from the Jurassic."
      },
      {
        type: "single",
        topic: "Compositional layers",
        source: "Original practice · Lecture 1b s12",
        prompt: "Which sequence lists Earth's major compositional layers from outside inward?",
        choices: ["Crust, mantle, core", "Lithosphere, asthenosphere, core", "Mantle, crust, atmosphere", "Core, mantle, crust"],
        answer: 0,
        explanation: "The compositional sequence is crust, mantle, and core."
      },
      {
        type: "single",
        topic: "Core",
        source: "Original practice · Lecture 1b s12-13",
        prompt: "Which description matches the core?",
        choices: ["Silicate crust with two surface types", "Iron-nickel region with molten outer and solid inner parts", "Entirely liquid mantle", "Strong crust plus uppermost mantle"],
        answer: 1,
        explanation: "The lecture identifies an iron-nickel core with a molten outer core and solid inner core."
      },
      {
        type: "single",
        topic: "Mechanical layers",
        source: "Original practice · Lecture 1b s14",
        prompt: "What material does the lithosphere include?",
        choices: ["Crust only", "Crust plus uppermost mantle", "Asthenosphere only", "Outer and inner core"],
        answer: 1,
        explanation: "The strong lithosphere crosses the crust-mantle compositional boundary."
      },
      {
        type: "true-false",
        topic: "Mechanical layers",
        source: "Original practice · Lecture 1b s14",
        prompt: "The asthenosphere is hot and weak but mostly solid.",
        choices: ["True", "False"],
        answer: 0,
        explanation: "That is the deck's explicit description; weak does not mean completely liquid."
      },
      {
        type: "single",
        topic: "Isostasy",
        source: "Original practice · Lecture 1b s15-16",
        prompt: "If two floating blocks have equal density, which should ride higher?",
        choices: ["The thicker block", "The thinner block", "They must be identical", "The darker block"],
        answer: 0,
        explanation: "The lecture analogy shows thicker blocks riding higher than thinner blocks."
      },
      {
        type: "single",
        topic: "Isostasy",
        source: "Original practice · Lecture 1b s16",
        prompt: "If two floating blocks have equal thickness, which should ride lower?",
        choices: ["The less-dense block", "The denser block", "The wider block regardless of density", "Neither can float"],
        answer: 1,
        explanation: "Greater density lowers the exposed height in the floating-block analogy."
      },
      {
        type: "single",
        topic: "Earth-system drivers",
        source: "Original practice · Lecture 1b s17",
        prompt: "Which process is an internal driver?",
        choices: ["Solar radiation", "Wind", "Radioactive decay", "Atmospheric pressure"],
        answer: 2,
        explanation: "Radioactive decay contributes heat within Earth; the other choices are surface-linked or atmospheric."
      },
      {
        type: "multi",
        topic: "Atmosphere",
        source: "Original practice · Lecture 1b s18",
        prompt: "Which functions of the atmosphere appear in the lecture? Select all that apply.",
        choices: ["Stores water vapor, drops, and ice", "Produces precipitation and wind", "Blocks some light, UV, and infrared", "Stops all energy transfer"],
        answer: [0, 1, 2],
        explanation: "The atmosphere moves water and moderates radiation; it does not stop all energy transfer."
      },
      {
        type: "multi",
        topic: "Sedimentary environments",
        source: "Original practice · Lecture 1b s19-22",
        prompt: "Which settings are associated with sedimentary rocks in the lecture? Select all that apply.",
        choices: ["Rivers", "Glaciers", "Sand dunes", "Only molten magma"],
        answer: [0, 1, 2],
        explanation: "The lecture shows numerous normal surface environments as sedimentary settings."
      },
      {
        type: "single",
        topic: "Igneous rocks",
        source: "Original practice · Lecture 1b s23; classroom stopping point",
        prompt: "What process defines igneous-rock formation?",
        choices: ["Solidification of magma", "Weathering alone", "Precipitation from hot water", "Compaction of fossils"],
        answer: 0,
        explanation: "Igneous rock forms when magma solidifies, whether at depth or in volcanic settings."
      },
      {
        type: "single",
        topic: "Metamorphic rocks",
        source: "Original practice · Lecture 1b s26-27; deck continuation",
        prompt: "Which process produces metamorphic rock in the continuation material?",
        choices: ["Change by heat and pressure", "Solidification of magma", "Evaporation of seawater only", "Freezing of atmospheric vapor"],
        answer: 0,
        explanation: "Metamorphic rock is existing rock changed by increased temperature and pressure or heating near magma."
      },
      {
        type: "single",
        topic: "Hydrothermal rocks",
        source: "Original practice · Lecture 1b s26 and s28; deck continuation",
        prompt: "What process is linked to hydrothermal rock in the lecture?",
        choices: ["Precipitation from hot water", "Compaction of snow", "Wind abrasion", "Core solidification"],
        answer: 0,
        explanation: "The continuation slide defines hydrothermal material through precipitation from hot water."
      },
      {
        type: "single",
        topic: "Rock cycle",
        source: "Original practice · Lecture 1b s29; deck continuation",
        prompt: "Which statement best describes the rock cycle?",
        choices: ["It has one required starting point", "Rocks can enter linked processes at different stages", "It excludes melting", "Uplift occurs only once"],
        answer: 1,
        explanation: "The cycle links weathering, transport, burial, metamorphism, melting, solidification, and uplift without one required beginning."
      },
      {
        type: "single",
        topic: "Earth's spheres",
        source: "Original practice · Lecture 1b s30; deck continuation",
        prompt: "Which list contains the four spheres named in the lecture?",
        choices: ["Atmosphere, hydrosphere, biosphere, lithosphere", "Crust, mantle, core, magnetosphere", "Troposphere, mantle, ocean, core", "Biosphere, core, magma, shelf"],
        answer: 0,
        explanation: "The figure names atmosphere, hydrosphere, biosphere, and lithosphere."
      },
      {
        type: "true-false",
        topic: "Solar-system scale",
        source: "Original practice · Lecture 1b s31; deck continuation",
        prompt: "The solar-system figure preserves the true relative sizes and proximities of all objects.",
        choices: ["True", "False"],
        answer: 1,
        explanation: "The slide explicitly warns that size and proximity are not to scale."
      },
      {
        type: "single",
        topic: "Crust and elevation",
        source: "Original practice · Lecture 1b s15-16",
        prompt: "Which relationship is supported by the elevation figures?",
        choices: ["Thin crust is always highest", "Thick continental crust commonly supports higher elevation", "Oceanic crust is always thicker", "Density has no effect"],
        answer: 1,
        explanation: "The figures link thick, less-dense continental crust with higher elevation and deeper crustal roots."
      },
      {
        type: "single",
        topic: "Crust types",
        source: "Original practice · Lecture 1b s12 and s15",
        prompt: "Which statement correctly compares continental and oceanic crust in the lecture?",
        choices: ["They are two types of crust", "Oceanic crust is the inner core", "Continental crust is the whole lithosphere", "They are both atmosphere"],
        answer: 0,
        explanation: "Continental and oceanic crust are two types within the crustal compositional layer."
      },
      {
        type: "single",
        topic: "Evidence",
        source: "Original practice · Lecture 1b s8-11",
        prompt: "Which answer uses evidence most carefully?",
        choices: ["The image proves one complete history", "The pattern supports an interpretation, but additional data are needed to test it", "A reconstruction is identical to a fossil", "Visible color proves exact age"],
        answer: 1,
        explanation: "Geologic figures constrain interpretations, but responsible reasoning keeps the remaining uncertainty visible."
      }
    ]
  },
  {
    id: "exam-one-shell",
    title: "Exam 1 Build Slot",
    description: "Reserved for an evidence-backed Chapters 1–6 mock exam after lecture decks and professor materials are dissected.",
    lane: "Exam 1",
    chapters: "Chapters 1–6",
    status: "Needs evidence",
    questions: []
  },
  {
    id: "exam-two-shell",
    title: "Exam 2 Build Slot",
    description: "Reserved for original Chapters 7–12 practice questions and explanations.",
    lane: "Exam 2",
    chapters: "Chapters 7–12",
    status: "Needs evidence",
    questions: []
  },
  {
    id: "final-shell",
    title: "Cumulative Final Build Slot",
    description: "Reserved for a balanced Chapters 1–19 cumulative bank with missed-concept recycling.",
    lane: "Final",
    chapters: "Chapters 1–19",
    status: "Needs evidence",
    questions: []
  }
];
