window.GEOL_MODULES.push(
  {
    id: "ch2-observe-represent",
    number: 9,
    title: "Observe, Represent, Then Infer",
    kicker: "Chapter 2 · Evidence discipline",
    description: "Extract visible features from outcrops and representations before proposing processes or histories.",
    source: "Lecture 2 s2–8",
    emphasis: "Current Fall 2026 lecture",
    concepts: [
      { id: "ch2-observation-coding", label: "Observation coding" },
      { id: "ch2-deposit-comparison", label: "Modern-deposit comparison" }
    ],
    activities: [
      {
        id: "ch2-m9-lesson", type: "lesson", title: "Look before the story", source: "Lecture 2 s2–8",
        body: [
          "Record colors, layers, contacts, fractures, ledges, loose material, bedrock, and rounded versus angular corners before naming a cause.",
          "A photograph, map, sketch, cross section, or model is a representation: it selects information rather than reproducing all of reality."
        ],
        keyPoints: [
          "Observation is directly visible or measurable.",
          "Inference is a proposed process, history, or relationship.",
          "A useful sketch preserves the relationships needed to test an explanation."
        ]
      },
      {
        id: "ch2-m9-observe-sort", type: "sort", concept: "ch2-observation-coding",
        prompt: "Classify each statement about an outcrop.", groups: ["Observation", "Inference"],
        items: [
          { text: "Three reddish layers form ledges.", group: "Observation" },
          { text: "Vertical fractures cut the pale unit.", group: "Observation" },
          { text: "Water enlarged the fractures.", group: "Inference" },
          { text: "The lower unit eroded more rapidly.", group: "Inference" }
        ],
        hint: "Could a camera or ruler record it directly?", explanation: "Colors, layers, ledges, and fractures are visible. Causes and histories require tests.", source: "Original practice derived from Lecture 2 s2–4"
      },
      {
        id: "ch2-m9-observe-fill", type: "fillblank", concept: "ch2-observation-coding",
        prompt: "A direct visible or measurable feature is an ____.", answers: ["observation"],
        hint: "It comes before explanation.", explanation: "Observation names what is present without smuggling in a cause.", source: "Lecture 2 s2–4"
      },
      {
        id: "ch2-m9-deposit-match", type: "match", concept: "ch2-deposit-comparison",
        prompt: "Match the visible clue to the strongest initial interpretation.",
        rows: [
          { label: "Rounded clasts", answer: "Transport and abrasion" },
          { label: "Angular clasts", answer: "Limited transport or nearby breakage" },
          { label: "Cemented clasts", answer: "Burial and lithification" },
          { label: "Mixed clast sizes", answer: "Variable transport energy" }
        ],
        options: ["Transport and abrasion", "Limited transport or nearby breakage", "Burial and lithification", "Variable transport energy"],
        hint: "Compare edge shape, sorting, and whether the material is loose or rock.", explanation: "Modern deposits help interpret rock only when the inference is anchored to matching observable texture.", source: "Lecture 2 s5–8"
      },
      {
        id: "ch2-m9-deposit-teach", type: "teachback", concept: "ch2-deposit-comparison",
        prompt: "Explain why rounded pebbles in rock support transport but do not by themselves prove one exact environment.",
        rubric: ["Links rounding to collision and abrasion.", "Names transport as the supported process.", "States that other evidence is needed to identify the exact environment."],
        hint: "Separate the process clue from the final setting.", explanation: "Rounding supports transport and abrasion; grain size, sorting, structures, fossils, and context narrow the setting.", source: "Lecture 2 s5–8"
      }
    ]
  },
  {
    id: "ch2-relative-time",
    number: 10,
    title: "Relative Time and Event Order",
    kicker: "Chapter 2 · Reconstruct history",
    description: "Sequence landscapes, layers, faults, clasts, and intrusions using explicit relative-dating principles.",
    source: "Lecture 2 s9–14",
    emphasis: "Current Fall 2026 lecture",
    concepts: [
      { id: "ch2-landscape-evolution", label: "Landscape evolution" },
      { id: "ch2-relative-dating", label: "Relative dating" }
    ],
    activities: [
      {
        id: "ch2-m10-lesson", type: "lesson", title: "Order without a numerical date", source: "Lecture 2 s9–14",
        body: [
          "Mesa → butte → knobs models progressive erosion of a resistant, layered remnant.",
          "Superposition, cross-cutting, inclusions, and contact effects provide independent rules for placing units and events in order."
        ],
        keyPoints: ["Lower undeformed layers formed first.", "A cutting feature is younger than what it cuts.", "Clasts are older than their container.", "Magma that bakes adjacent rock is younger than that rock."]
      },
      {
        id: "ch2-m10-landscape-order", type: "match", concept: "ch2-landscape-evolution",
        prompt: "Assign each erosional landform its stage.",
        rows: [{ label: "Mesa", answer: "1 · broad remnant" }, { label: "Butte", answer: "2 · narrowed remnant" }, { label: "Knobs", answer: "3 · small remnants" }],
        options: ["1 · broad remnant", "2 · narrowed remnant", "3 · small remnants"],
        hint: "Progressive erosion reduces the protected remnant.", explanation: "The lecture sequence is mesa → butte → knobs as slopes retreat and the cap-rock remnant narrows.", source: "Lecture 2 s9"
      },
      {
        id: "ch2-m10-landscape-sketch", type: "teachback", concept: "ch2-landscape-evolution",
        prompt: "On paper, sketch mesa → butte → knobs. Then describe the three labels that make your sketch explanatory.",
        rubric: ["Shows three stages connected by arrows.", "Labels resistant cap rock.", "Labels retreating slopes and decreasing remnant width."],
        hint: "The exam asks for concept sketching, so make the process visible.", explanation: "A strong concept sketch shows change, direction, and the controlling resistant layer—not merely three silhouettes.", source: "Lecture 2 s9 · syllabus concept-sketch format"
      },
      {
        id: "ch2-m10-principles-match", type: "match", concept: "ch2-relative-dating",
        prompt: "Match each relationship to the principle that establishes it.",
        rows: [
          { label: "Lower layer is older in an undeformed sequence", answer: "Superposition" },
          { label: "Fault is younger than offset layers", answer: "Cross-cutting" },
          { label: "Granite clasts are older than conglomerate", answer: "Inclusions" },
          { label: "Intrusion is younger than baked country rock", answer: "Contact effects" }
        ],
        options: ["Superposition", "Cross-cutting", "Inclusions", "Contact effects"],
        hint: "Name the evidence rule, not just older or younger.", explanation: "Each principle establishes a different observable relationship. Strong answers state both order and proof.", source: "Lecture 2 s10–13"
      },
      {
        id: "ch2-m10-superposition-fill", type: "fillblank", concept: "ch2-relative-dating",
        prompt: "The rule that lower undeformed layers were deposited before upper layers is ____.", answers: ["superposition", "principle of superposition"],
        hint: "Think vertical position.", explanation: "Superposition orders deposited layers where later deformation has not overturned them.", source: "Lecture 2 s10"
      },
      {
        id: "ch2-m10-event-teach", type: "teachback", concept: "ch2-relative-dating",
        prompt: "Four layers are cut by a fault and later by an intrusion that bakes the fault zone. Reconstruct the order and justify each step.",
        rubric: ["Places deposition of the four layers first using superposition.", "Places the fault after the layers using cross-cutting.", "Places the intrusion after the fault using cross-cutting/contact effects."],
        hint: "Every placement needs a named principle.", explanation: "The defensible sequence is layer deposition → faulting → intrusion, with superposition and cross-cutting/contact evidence as receipts.", source: "Original integrative practice derived from Lecture 2 s10–14"
      }
    ]
  },
  {
    id: "ch2-maps-subsurface",
    number: 11,
    title: "Maps, Relief, and the Subsurface",
    kicker: "Chapter 2 · Change viewpoints",
    description: "Choose the representation that answers the question, calculate relief, and translate surface patterns into subsurface geometry.",
    source: "Lecture 2 s15–21",
    emphasis: "Current Fall 2026 lecture",
    concepts: [
      { id: "ch2-map-types", label: "Map types" },
      { id: "ch2-topography", label: "Elevation, relief, and slope" },
      { id: "ch2-subsurface-sequence", label: "Subsurface representations" }
    ],
    activities: [
      {
        id: "ch2-m11-lesson", type: "lesson", title: "Every representation answers a different question", source: "Lecture 2 s15–21",
        body: ["Topographic, shaded-relief, geologic, and satellite views emphasize different surface information.", "Cross sections, block diagrams, and stratigraphic sections expose different aspects of the subsurface and event sequence."],
        keyPoints: ["Elevation is height above sea level.", "Relief is highest minus lowest elevation.", "Closer contours generally indicate steeper slope.", "A cross section is a vertical slice; a block diagram adds 3-D context; a stratigraphic section records unit order and thickness."]
      },
      {
        id: "ch2-m11-map-match", type: "match", concept: "ch2-map-types",
        prompt: "Match the representation to its primary information.",
        rows: [
          { label: "Topographic map", answer: "Elevation contours" },
          { label: "Shaded-relief map", answer: "Terrain appearance from light and shadow" },
          { label: "Geologic map", answer: "Rock units, contacts, and faults" },
          { label: "Satellite image", answer: "Remotely sensed surface patterns" }
        ],
        options: ["Elevation contours", "Terrain appearance from light and shadow", "Rock units, contacts, and faults", "Remotely sensed surface patterns"],
        hint: "Ask what variable is encoded.", explanation: "The same place can look different because each representation selects a different evidence layer.", source: "Lecture 2 s15–18"
      },
      {
        id: "ch2-m11-map-choice", type: "single", concept: "ch2-map-types",
        prompt: "Which representation best shows the surface distribution and contacts of rock units?",
        choices: ["Topographic map", "Geologic map", "Shaded-relief map", "Satellite image"], answer: 1,
        hint: "Choose the map designed to encode rock bodies.", explanation: "A geologic map shows mapped rock units, ages, contacts, faults, and other surface geology.", source: "Lecture 2 s16–18"
      },
      {
        id: "ch2-m11-relief-single", type: "single", concept: "ch2-topography",
        prompt: "A map's highest point is 860 m and lowest point is 315 m. What is the relief?",
        choices: ["545 m", "1,175 m", "2.73 m", "545 m/km"], answer: 0,
        hint: "Relief = high elevation − low elevation.", explanation: "860 m − 315 m = 545 m. Relief is an elevation difference, not a slope unless horizontal distance is included.", source: "Original quantitative practice derived from Lecture 2 s19"
      },
      {
        id: "ch2-m11-relief-fill", type: "fillblank", concept: "ch2-topography",
        prompt: "The elevation difference between the highest and lowest points is ____.", answers: ["relief"],
        hint: "It is not elevation or slope.", explanation: "Relief compares two elevations; slope compares elevation change with horizontal distance.", source: "Lecture 2 s19"
      },
      {
        id: "ch2-m11-subsurface-match", type: "match", concept: "ch2-subsurface-sequence",
        prompt: "Match each subsurface representation to its job.",
        rows: [
          { label: "Cross section", answer: "Vertical slice through geology" },
          { label: "Block diagram", answer: "3-D surface and subsurface view" },
          { label: "Stratigraphic section", answer: "Ordered record of units and thicknesses" }
        ],
        options: ["Vertical slice through geology", "3-D surface and subsurface view", "Ordered record of units and thicknesses"],
        hint: "Slice, 3-D block, or column.", explanation: "These views can represent the same geology while answering different geometric and historical questions.", source: "Lecture 2 s20"
      },
      {
        id: "ch2-m11-sequence-teach", type: "teachback", concept: "ch2-subsurface-sequence",
        prompt: "Explain how a block diagram and stratigraphic section together help reconstruct an event sequence.",
        rubric: ["Uses the block diagram for geometry and cross-cutting relationships.", "Uses the stratigraphic section for vertical unit order/thickness.", "Connects both evidence types to an ordered history."],
        hint: "One preserves geometry; the other simplifies the vertical record.", explanation: "Combining views reduces ambiguity: the section orders units while the block diagram shows how deformation and erosion relate spatially.", source: "Lecture 2 s20–21"
      }
    ]
  },
  {
    id: "ch2-data-time-investigation",
    number: 12,
    title: "Data, Geologic Time, and Model Tests",
    kicker: "Chapter 2 · Ask what would discriminate",
    description: "Combine qualitative patterns with quantitative measurements, order geologic time, and use predictions to eliminate weak explanations.",
    source: "Lecture 2 s22–29",
    emphasis: "Current Fall 2026 lecture",
    concepts: [
      { id: "ch2-data-types", label: "Qualitative and quantitative data" },
      { id: "ch2-geologic-time", label: "Geologic time divisions" },
      { id: "ch2-model-testing", label: "Prediction-driven investigation" }
    ],
    activities: [
      {
        id: "ch2-m12-lesson", type: "lesson", title: "Descriptions find patterns; numbers constrain them", source: "Lecture 2 s22–29",
        body: ["Qualitative data use words or sketches; quantitative data use numbers and units. Strong investigations combine both.", "Models earn support by making distinct predictions. The best next observation is often the one that produces different expected results under competing explanations."],
        keyPoints: ["Oldest broad division: Precambrian.", "Paleozoic → Mesozoic → Cenozoic.", "Observe → explain → predict → test → conclude or revise.", "A failed prediction weakens the model even when the model initially seemed plausible."]
      },
      {
        id: "ch2-m12-data-sort", type: "sort", concept: "ch2-data-types",
        prompt: "Classify each crater observation.", groups: ["Qualitative", "Quantitative"],
        items: [
          { text: "Angular blocks surround the rim.", group: "Qualitative" },
          { text: "The crater is 1.2 km wide.", group: "Quantitative" },
          { text: "Layers bend upward near the center.", group: "Qualitative" },
          { text: "The central uplift is 180 m high.", group: "Quantitative" }
        ],
        hint: "Numbers plus units mark quantitative data.", explanation: "Qualitative observations describe kind, pattern, or geometry; quantitative observations measure magnitude.", source: "Lecture 2 s22"
      },
      {
        id: "ch2-m12-data-teach", type: "teachback", concept: "ch2-data-types",
        prompt: "Give one qualitative and one quantitative observation that could test a crater-origin model.",
        rubric: ["Includes a descriptive pattern or material.", "Includes a number with a unit.", "Explains how at least one observation bears on a model prediction."],
        hint: "A good pair might combine rock texture with a measured geometry.", explanation: "Integration matters: the pattern identifies what may matter, and the measurement compares its magnitude with predictions.", source: "Lecture 2 s22 and s26–29 · syllabus integrative QFR target"
      },
      {
        id: "ch2-m12-time-order", type: "match", concept: "ch2-geologic-time",
        prompt: "Assign each broad division its order from oldest to youngest.",
        rows: [{ label: "Precambrian", answer: "1" }, { label: "Paleozoic", answer: "2" }, { label: "Mesozoic", answer: "3" }, { label: "Cenozoic", answer: "4" }],
        options: ["1", "2", "3", "4"],
        hint: "Begin below the Cambrian boundary.", explanation: "The lecture figure orders Precambrian → Paleozoic → Mesozoic → Cenozoic.", source: "Lecture 2 s23–24"
      },
      {
        id: "ch2-m12-time-fill", type: "fillblank", concept: "ch2-geologic-time",
        prompt: "Triassic, Jurassic, and Cretaceous are periods of the ____ Era.", answers: ["mesozoic", "mesozoic era"],
        hint: "The era associated with dinosaurs lies between Paleozoic and Cenozoic.", explanation: "Triassic → Jurassic → Cretaceous are the three periods shown within the Mesozoic.", source: "Lecture 2 s24 embedded timescale"
      },
      {
        id: "ch2-m12-model-sequence", type: "match", concept: "ch2-model-testing",
        prompt: "Place each investigation move in order.",
        rows: [{ label: "Observe", answer: "1" }, { label: "Propose competing explanations", answer: "2" }, { label: "Generate distinct predictions", answer: "3" }, { label: "Collect discriminating data", answer: "4" }, { label: "Conclude or revise", answer: "5" }],
        options: ["1", "2", "3", "4", "5"],
        hint: "The evidence test comes after the predictions.", explanation: "Predictions make competing models vulnerable to evidence; a conclusion follows the discriminating test.", source: "Lecture 2 s25–29"
      },
      {
        id: "ch2-m12-gasoline-single", type: "single", concept: "ch2-model-testing",
        prompt: "Why was a buried gasoline tank rejected as the contamination source?",
        choices: ["The tank was too old to inspect.", "No leak was found and the gasoline did not match.", "Groundwater cannot carry gasoline.", "The first explanation must always be rejected."], answer: 1,
        hint: "Compare the model's predicted evidence with what was observed.", explanation: "The source model weakened because both the physical inspection and chemical comparison contradicted its predictions.", source: "Lecture 2 s25"
      }
    ]
  },
  {
    id: "ch2-crater-dome",
    number: 13,
    title: "Crater Models and Upheaval Dome",
    kicker: "Chapter 2 · Integrative capstone",
    description: "Use layer order, geometry, materials, and model-specific predictions to test volcanic, salt, and impact explanations.",
    source: "Lecture 2 s26–32",
    emphasis: "Current Fall 2026 lecture",
    concepts: [
      { id: "ch2-competing-models", label: "Competing crater models" },
      { id: "ch2-upheaval-sequence", label: "Upheaval Dome sequence" }
    ],
    activities: [
      {
        id: "ch2-m13-lesson", type: "lesson", title: "Do not memorize the picture—attack the predictions", source: "Lecture 2 s26–32",
        body: ["A volcanic explosion, rising salt, and meteoroid impact can all begin as plausible crater models, but each predicts different materials and structures.", "Upheaval Dome integrates map pattern, upward-bent layers, stratigraphic order, deformation, erosion, and model testing."],
        keyPoints: ["Volcanic model: vent or volcanic deposits.", "Salt model: salt body or salt-driven deformation at depth.", "Impact model: shock features, impact melt, or meteoritic material.", "Upward-bent layers are observations; the proposed cause is an inference."]
      },
      {
        id: "ch2-m13-model-match", type: "match", concept: "ch2-competing-models",
        prompt: "Match each model to its most discriminating predicted evidence.",
        rows: [{ label: "Volcanic explosion", answer: "Vent and volcanic deposits" }, { label: "Rising salt", answer: "Salt body or salt deformation at depth" }, { label: "Meteoroid impact", answer: "Shock features or impact melt" }],
        options: ["Vent and volcanic deposits", "Salt body or salt deformation at depth", "Shock features or impact melt"],
        hint: "Pick evidence that would not be expected equally under all three models.", explanation: "A discriminating prediction separates models; crater shape alone may fit more than one explanation.", source: "Lecture 2 s26–29"
      },
      {
        id: "ch2-m13-model-teach", type: "teachback", concept: "ch2-competing-models",
        prompt: "Sketch the three crater models on paper, then explain one field test that separates them.",
        rubric: ["Shows volcanic, salt, and impact alternatives.", "Names one distinct prediction under each.", "Chooses a measurement, sample, map, or cross section that can discriminate."],
        hint: "A test must produce different expected outcomes among the models.", explanation: "The reasoning target is prediction and falsification, not recall of the lecture artwork.", source: "Lecture 2 s26–29 · syllabus exploration/concept-sketch format"
      },
      {
        id: "ch2-m13-sequence-match", type: "match", concept: "ch2-upheaval-sequence",
        prompt: "Order the Upheaval Dome events at the broadest defensible level.",
        rows: [{ label: "Deposition of Units G through A", answer: "1" }, { label: "Dome-forming deformation", answer: "2" }, { label: "Erosion exposes the structure", answer: "3" }, { label: "Modern investigation tests causes", answer: "4" }],
        options: ["1", "2", "3", "4"],
        hint: "The layers must exist before they bend and erode.", explanation: "Superposition orders G → A; deformation affects existing layers; erosion exposes them; investigation evaluates competing causes.", source: "Lecture 2 s30–32"
      },
      {
        id: "ch2-m13-observation-fill", type: "fillblank", concept: "ch2-upheaval-sequence",
        prompt: "Upward-bent layers are an observation; rising salt is an ____.", answers: ["inference", "interpretation", "hypothesis"],
        hint: "It proposes a cause not directly visible at the surface.", explanation: "Geometry can be observed; the process that caused it must be inferred and tested.", source: "Lecture 2 s30–32"
      },
      {
        id: "ch2-m13-capstone-teach", type: "teachback", concept: "ch2-upheaval-sequence",
        prompt: "Build a complete evidence chain for Upheaval Dome: observation → sequence → competing causes → discriminating test.",
        rubric: ["States at least two direct observations.", "Orders deposition, deformation, and erosion with a principle.", "Keeps volcanic, salt, and impact causes distinct.", "Names evidence that could favor or eliminate a model."],
        hint: "This is the Chapter 2 exploration-question rehearsal.", explanation: "A complete answer moves from observable geometry through relative history to predictions that can be tested with new data.", source: "Lecture 2 s30–32 · syllabus integrative exploration target"
      }
    ]
  }
);
