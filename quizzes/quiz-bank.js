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

