/* Additive Chapter 6 extension. No browser-storage access; existing records remain untouched. */
(()=>{'use strict';
const modules=[
  {
    "id": "ch6-recognition",
    "examId": "exam-one",
    "number": 31,
    "chapter": 6,
    "kicker": "Chapter 6 · Textbook-grounded",
    "title": "Recognize a Volcano, Not Just a Mountain",
    "description": "A volcano is a vent where magma and other volcanic products reach the surface. A familiar cone is only one possible expression. Eruptions can also occur along fissures or within broad depressions. Look for the vent, volcanic deposits, and their relationships rather than assuming every mountain is volcanic.",
    "source": "Exploring Geology 6.1, supplied PDF pp. 2–3; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.1, supplied PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
    "evidenceStatus": "verified",
    "emphasis": "Textbook evidence; classroom emphasis unconfirmed",
    "concepts": [
      {
        "id": "ch6-vent",
        "label": "Vent versus erosional remnant"
      },
      {
        "id": "ch6-types",
        "label": "Compare the four volcano forms"
      }
    ],
    "activities": [
      {
        "id": "ch6-recognition-lesson",
        "type": "lesson",
        "title": "Recognize a Volcano, Not Just a Mountain",
        "body": [
          "A volcano is a vent where magma and other volcanic products reach the surface. A familiar cone is only one possible expression. Eruptions can also occur along fissures or within broad depressions. Look for the vent, volcanic deposits, and their relationships rather than assuming every mountain is volcanic.",
          "A lava-capped mesa may be an eroded remnant of a flow that traveled away from its vent. The cap is volcanic rock, but the mesa itself was shaped by erosion. This is the same observation-versus-inference distinction practiced in Chapter 1: identify the material, then reconstruct how the landform formed.",
          "Four useful mountain-building types are scoria cones, shields, composite volcanoes, and domes. Scoria cones are comparatively small piles of erupted fragments. Shields are broad and gently sloping, built largely from basalt flows. Composite volcanoes are steeper and layered, with lava and fragmental deposits. Domes are steep accumulations of viscous lava near a vent.",
          "Shape is evidence, not a complete diagnosis. Erosion can obscure craters and slopes, and a scoria cone or dome can sit on a larger volcano. Study sequence is a learning aid, not a prediction of exam weighting. Chapter 6 is textbook-grounded; no Chapter 6 transcript or quiz packet was available for confirming classroom emphasis."
        ],
        "keyPoints": [
          "Volcanic rock does not prove the hill was built over a volcanic vent.",
          "Shield: broad flows; composite: layered cone; scoria: loose fragments; dome: viscous mound."
        ],
        "source": "Exploring Geology 6.1, supplied PDF pp. 2–3; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.1, supplied PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed"
      },
      {
        "id": "ch6-vent-q1",
        "type": "single",
        "concept": "ch6-vent",
        "topic": "Vent versus erosional remnant",
        "prompt": "A flat-topped hill has a basalt cap but lies far from the mapped eruptive fissure. What best explains why it need not be a volcano?",
        "choices": [
          "Basalt cannot be volcanic",
          "Erosion can leave a remnant of a lava flow away from its vent",
          "Every lava flow must retain a crater",
          "Only underwater vents count"
        ],
        "answer": 1,
        "explanation": "The mesa can be an erosional remnant of a lava sheet. A volcanic rock and a volcano built at a vent are different observations.",
        "hint": "Separate where lava erupted from where it later cooled.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 2–3; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-vent-q2",
        "type": "single",
        "concept": "ch6-vent",
        "topic": "Vent versus erosional remnant",
        "prompt": "Lava emerges along a long crack without building a conical mountain. How should it be classified?",
        "choices": [
          "Not volcanic because no cone exists",
          "Sedimentary deposition",
          "A volcanic fissure eruption",
          "A glacier"
        ],
        "answer": 2,
        "explanation": "A volcano need not have a classic cone. Magma reaching the surface through a fissure is volcanic activity.",
        "hint": "Separate where lava erupted from where it later cooled.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 2–3; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-types-q1",
        "type": "single",
        "concept": "ch6-types",
        "topic": "Compare the four volcano forms",
        "prompt": "Which description best identifies a shield volcano?",
        "choices": [
          "A broad edifice built mainly by repeated basalt flows",
          "A small pile made only of loose scoria",
          "An erosional mesa with no vent",
          "A steep mound of highly viscous lava only"
        ],
        "answer": 0,
        "explanation": "Low-viscosity basalt spreads outward. Repeated flows build a broad shield with gentle slopes.",
        "hint": "Connect shape to the material and how far it travels.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-types-q2",
        "type": "single",
        "concept": "ch6-types",
        "topic": "Compare the four volcano forms",
        "prompt": "A small cone is mostly loose vesicular fragments ejected around a vent. Which type fits best?",
        "choices": [
          "Caldera",
          "Shield volcano",
          "Volcanic dome",
          "Scoria cone"
        ],
        "answer": 3,
        "explanation": "Scoria cones grow as ejected fragments fall near a vent. They are not simply miniature domes of intact viscous lava.",
        "hint": "Connect shape to the material and how far it travels.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-volcano-match",
        "type": "match",
        "concept": "ch6-types",
        "prompt": "Match each volcano type to its characteristic construction.",
        "rows": [
          {
            "label": "Shield",
            "answer": "Repeated fluid basalt flows"
          },
          {
            "label": "Scoria cone",
            "answer": "Loose fragments around a vent"
          },
          {
            "label": "Composite",
            "answer": "Interlayered lava and fragmental deposits"
          },
          {
            "label": "Dome",
            "answer": "Viscous lava piled near the vent"
          }
        ],
        "options": [
          "Repeated fluid basalt flows",
          "Loose fragments around a vent",
          "Interlayered lava and fragmental deposits",
          "Viscous lava piled near the vent"
        ],
        "hint": "Connect the shape to the material and how it is deposited.",
        "explanation": "Volcano types reflect construction processes. A dome or scoria cone can also occur on a larger volcano.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 2–3; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.1, supplied PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ]
  },
  {
    "id": "ch6-eruption",
    "examId": "exam-one",
    "number": 32,
    "chapter": 6,
    "kicker": "Chapter 6 · Textbook-grounded",
    "title": "Why Eruptions Flow or Explode",
    "description": "Chapter 5 supplies the mechanism: viscosity is resistance to flow. Silica-rich magma generally has a more connected silicate structure and higher viscosity than basaltic magma. Viscosity affects both lava movement and how easily gas bubbles escape.",
    "source": "Exploring Geology 6.2, supplied PDF pp. 6–8; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.2, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
    "evidenceStatus": "verified",
    "emphasis": "Textbook evidence; classroom emphasis unconfirmed",
    "concepts": [
      {
        "id": "ch6-gas",
        "label": "Pressure, viscosity, and gas escape"
      },
      {
        "id": "ch6-products",
        "label": "Distinguish volcanic products and transport"
      }
    ],
    "activities": [
      {
        "id": "ch6-eruption-lesson",
        "type": "lesson",
        "title": "Why Eruptions Flow or Explode",
        "body": [
          "Chapter 5 supplies the mechanism: viscosity is resistance to flow. Silica-rich magma generally has a more connected silicate structure and higher viscosity than basaltic magma. Viscosity affects both lava movement and how easily gas bubbles escape.",
          "At depth, confining pressure keeps much volcanic gas dissolved in magma. As magma rises, pressure falls; gas can leave solution and bubbles expand. If viscous magma prevents gas from escaping easily, pressure can build and drive explosive fragmentation. Gas-rich basalt can still fountain, so low viscosity does not mean no explosions.",
          "Lava flows and domes are erupted molten material that moves away from or piles up near a vent. Tephra is ejected fragmental material; its fine fraction is volcanic ash, not the residue of ordinary burning. A buoyant eruption column carries tephra upward; wind spreads ash before it settles.",
          "A pyroclastic flow is a dense, very hot mixture of gas, ash, and fragments moving along the ground. Collapse of an eruption column can produce one; collapse of a dome is another route. It is different from lava and from a water-rich lahar. One volcano can alternate among eruption styles as conditions change."
        ],
        "keyPoints": [
          "Falling pressure releases gas; high viscosity impedes its escape.",
          "Column rises and falls out; pyroclastic flow moves hot material along the ground."
        ],
        "source": "Exploring Geology 6.2, supplied PDF pp. 6–8; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.2, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed"
      },
      {
        "id": "ch6-gas-q1",
        "type": "single",
        "concept": "ch6-gas",
        "topic": "Pressure, viscosity, and gas escape",
        "prompt": "What most directly allows dissolved gas to form bubbles as magma rises?",
        "choices": [
          "Increasing confining pressure",
          "A decrease in confining pressure",
          "Conversion of gas to feldspar",
          "Loss of all heat instantly"
        ],
        "answer": 1,
        "explanation": "Pressure decreases toward the surface, allowing dissolved gases to come out of solution and expand.",
        "hint": "Think of both dissolved gas and the ability of bubbles to move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 6–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-gas-q2",
        "type": "single",
        "concept": "ch6-gas",
        "topic": "Pressure, viscosity, and gas escape",
        "prompt": "Two magmas have comparable gas contents. Why can the more viscous one have greater explosive potential?",
        "choices": [
          "It always contains no silica",
          "Its bubbles are necessarily colder",
          "It prevents gravity",
          "It can retain gas rather than allowing easy escape"
        ],
        "answer": 3,
        "explanation": "High viscosity resists bubble movement and gas escape. Trapped gas can build pressure; composition alone is not the only variable.",
        "hint": "Think of both dissolved gas and the ability of bubbles to move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 6–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-products-q1",
        "type": "single",
        "concept": "ch6-products",
        "topic": "Distinguish volcanic products and transport",
        "prompt": "A dense, hot cloud of ash and gas races downslope after an eruption column collapses. What is it?",
        "choices": [
          "A pyroclastic flow",
          "A lava tube",
          "A lahar made primarily of water and mud",
          "A slowly advancing intact lava flow"
        ],
        "answer": 0,
        "explanation": "A collapsed hot ash-and-gas mixture is a pyroclastic flow. A lahar requires water mixed with volcanic debris.",
        "hint": "Identify what carries the fragments and where they move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-products-q2",
        "type": "single",
        "concept": "ch6-products",
        "topic": "Distinguish volcanic products and transport",
        "prompt": "Fine volcanic particles blanket a town far downwind. Which transport route best explains this?",
        "choices": [
          "Only a lava flow could reach it",
          "Mineral cleavage moved the particles",
          "Ash rose in an eruption column and was carried by wind",
          "The entire magma chamber slid there"
        ],
        "answer": 2,
        "explanation": "Fine tephra can be carried far downwind in the atmosphere and deposited as ash fall, unlike valley-confined ground flows.",
        "hint": "Identify what carries the fragments and where they move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ]
  },
  {
    "id": "ch6-basalt",
    "examId": "exam-one",
    "number": 33,
    "chapter": 6,
    "kicker": "Chapter 6 · Textbook-grounded",
    "title": "Read Basaltic Flows and Scoria Cones",
    "description": "Basaltic magma commonly begins an eruption with gas-driven fountains. Clots cool and accumulate as loose scoria around the vent. As less-gassy magma reaches the surface, it may instead emerge as a lava flow, sometimes from the cone base. A single episode can therefore create both a cone and a flow.",
    "source": "Exploring Geology 6.3, supplied PDF pp. 2–3, 5; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.3, supplied PDF pp. 4; also 6.4 PDF p. 5; textbook-grounded, classroom emphasis unconfirmed",
    "evidenceStatus": "verified",
    "emphasis": "Textbook evidence; classroom emphasis unconfirmed",
    "concepts": [
      {
        "id": "ch6-scoria",
        "label": "One vent, changing gas content"
      },
      {
        "id": "ch6-flow-textures",
        "label": "Texture and environment of basalt flows"
      }
    ],
    "activities": [
      {
        "id": "ch6-basalt-lesson",
        "type": "lesson",
        "title": "Read Basaltic Flows and Scoria Cones",
        "body": [
          "Basaltic magma commonly begins an eruption with gas-driven fountains. Clots cool and accumulate as loose scoria around the vent. As less-gassy magma reaches the surface, it may instead emerge as a lava flow, sometimes from the cone base. A single episode can therefore create both a cone and a flow.",
          "Vesicles are preserved bubble spaces. Vesicular basalt and scoria record gas bubbles trapped during cooling; nonvesicular basalt may begin with little gas or lose it before solidifying. Do not confuse a vesicle with a crystal or a mineral cleavage surface.",
          "Aa has a rough surface of jagged, jumbled blocks. Pahoehoe has smoother, folded or ropy surfaces. A lava tube forms when the outer surface solidifies while hot lava continues beneath the insulating roof. Insulation slows cooling and helps lava travel farther.",
          "Lava erupted into water can form rounded pillows. Pillows diagnose the environment of eruption, not simply slow cooling on land. Fresh cones and flows usually retain sharper features and little developed soil; weathering, soil, vegetation, and erosion can obscure them over time."
        ],
        "keyPoints": [
          "Gas-rich fountains can build scoria cones; less-gassy lava can flow afterward.",
          "Aa is rough; pahoehoe is ropy; tubes insulate; pillows indicate water."
        ],
        "source": "Exploring Geology 6.3, supplied PDF pp. 2–3, 5; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.3, supplied PDF pp. 4; also 6.4 PDF p. 5; textbook-grounded, classroom emphasis unconfirmed"
      },
      {
        "id": "ch6-scoria-q1",
        "type": "single",
        "concept": "ch6-scoria",
        "topic": "One vent, changing gas content",
        "prompt": "A basaltic vent first builds a cone of cinders, then releases a quieter lava flow. Which change best explains the transition?",
        "choices": [
          "The lava must become pure quartz",
          "The plate boundary must reverse direction",
          "Later magma contains less gas available to drive fountains",
          "All rock has become sedimentary"
        ],
        "answer": 2,
        "explanation": "Early gas-rich magma can fragment in fountains. Later magma with less gas can erupt as a comparatively nonexplosive flow.",
        "hint": "An eruption can change while composition stays basaltic.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 2–3, 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-scoria-q2",
        "type": "single",
        "concept": "ch6-scoria",
        "topic": "One vent, changing gas content",
        "prompt": "What do abundant vesicles in a basalt sample record?",
        "choices": [
          "Gas bubbles trapped when the lava solidified",
          "The number of minerals in the rock",
          "Cleavage directions of one crystal",
          "Dissolution by rivers in every case"
        ],
        "answer": 0,
        "explanation": "Vesicles are former bubbles. Their presence records gas behavior during solidification, not mineral cleavage.",
        "hint": "An eruption can change while composition stays basaltic.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 2–3, 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-flow-textures-q1",
        "type": "single",
        "concept": "ch6-flow-textures",
        "topic": "Texture and environment of basalt flows",
        "prompt": "Which pairing correctly matches basaltic flow surface textures?",
        "choices": [
          "Aa is ropy; pahoehoe is jagged",
          "Both terms mean volcanic ash",
          "Pahoehoe means pillow basalt only",
          "Aa is jagged and blocky; pahoehoe is ropy"
        ],
        "answer": 3,
        "explanation": "Aa breaks into rough blocks while pahoehoe develops smoother, folded surfaces. Both describe lava-flow features.",
        "hint": "Separate surface shape, heat retention, and eruption environment.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 4; also 6.4 PDF p. 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-flow-textures-q2",
        "type": "single",
        "concept": "ch6-flow-textures",
        "topic": "Texture and environment of basalt flows",
        "prompt": "Why can a lava flow continue traveling beneath a solid roof?",
        "choices": [
          "The roof adds water until the lava becomes a river",
          "The roof insulates the hot moving interior",
          "The whole flow is already solid",
          "The roof removes gravity"
        ],
        "answer": 1,
        "explanation": "A lava tube limits heat loss, allowing its molten interior to remain hot and mobile longer than an exposed flow.",
        "hint": "Separate surface shape, heat retention, and eruption environment.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 4; also 6.4 PDF p. 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ]
  },
  {
    "id": "ch6-shields-floods",
    "examId": "exam-one",
    "number": 34,
    "chapter": 6,
    "kicker": "Chapter 6 · Textbook-grounded",
    "title": "Shields, Fissures, and Flood Basalts",
    "description": "A shield grows through repeated eruptions of relatively fluid basalt. Lava spreads away from vents and fissures instead of remaining in a steep pile, producing broad, gentle slopes. Shield volcanoes can include summit depressions and scoria cones; those features do not change the overall shield geometry.",
    "source": "Exploring Geology 6.4, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.5, supplied PDF pp. 2, 4–7; textbook-grounded, classroom emphasis unconfirmed",
    "evidenceStatus": "verified",
    "emphasis": "Textbook evidence; classroom emphasis unconfirmed",
    "concepts": [
      {
        "id": "ch6-shields",
        "label": "Composition to shield geometry"
      },
      {
        "id": "ch6-floods",
        "label": "Flood basalt supply and effects"
      }
    ],
    "activities": [
      {
        "id": "ch6-shields-floods-lesson",
        "type": "lesson",
        "title": "Shields, Fissures, and Flood Basalts",
        "body": [
          "A shield grows through repeated eruptions of relatively fluid basalt. Lava spreads away from vents and fissures instead of remaining in a steep pile, producing broad, gentle slopes. Shield volcanoes can include summit depressions and scoria cones; those features do not change the overall shield geometry.",
          "Hot spots are important for large oceanic shields such as Hawaii, but shields are not exclusive to one tectonic setting. Keep the Chapter 3 link: setting helps explain magma supply, and composition helps explain viscosity and shape.",
          "Flood basalts are extensive stacks of basalt flows, commonly fed by long fissures or strings of vents. Large magma supply, low viscosity, and high eruption rates permit individual flows to cover broad areas. Exposed dikes can mark the former feeder cracks.",
          "In a common origin model, a mostly solid mantle plume rises, spreads beneath the lithosphere, and produces melting through decompression and heating. Flood-basalt gases can influence climate: sulfur-bearing aerosols can reduce incoming sunlight, whereas carbon dioxide contributes greenhouse warming. Do not reduce all volcanic climate effects to one sign or treat an association with extinction as proof of one sole cause."
        ],
        "keyPoints": [
          "Low-viscosity basalt spreads outward, building a broad shield.",
          "Long fissures plus abundant fluid basalt can build extensive layered plateaus."
        ],
        "source": "Exploring Geology 6.4, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.5, supplied PDF pp. 2, 4–7; textbook-grounded, classroom emphasis unconfirmed"
      },
      {
        "id": "ch6-shields-q1",
        "type": "single",
        "concept": "ch6-shields",
        "topic": "Composition to shield geometry",
        "prompt": "Why do repeated basalt flows commonly build gentle shield slopes?",
        "choices": [
          "Lava spreads far enough to distribute material broadly",
          "All lava is deposited vertically at the vent",
          "Shields are made only of windblown ash",
          "High viscosity keeps every flow at the summit"
        ],
        "answer": 0,
        "explanation": "Fluid basalt spreads rather than piling exclusively beside the vent. Repetition builds broad, gentle slopes.",
        "hint": "Use the Chapter 5 viscosity connection.",
        "source": "Exploring Geology 6.4, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-shields-q2",
        "type": "single",
        "concept": "ch6-shields",
        "topic": "Composition to shield geometry",
        "prompt": "Rounded pillow-shaped basalt is exposed on a volcanic island. What is the strongest inference?",
        "choices": [
          "The island must be a composite volcano",
          "The basalt erupted into water",
          "The basalt formed from sandstone",
          "The lava never reached the surface"
        ],
        "answer": 1,
        "explanation": "Pillow forms develop as lava advances into water. They are evidence of an aquatic eruption environment.",
        "hint": "Use the Chapter 5 viscosity connection.",
        "source": "Exploring Geology 6.4, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-floods-q1",
        "type": "single",
        "concept": "ch6-floods",
        "topic": "Flood basalt supply and effects",
        "prompt": "A plateau exposes stacked basalt sheets fed by many long dikes. Which eruptive pattern fits?",
        "choices": [
          "One dome of high-viscosity rhyolite",
          "Only a single small scoria cone",
          "A limestone reef",
          "Repeated large fissure-fed flood-basalt eruptions"
        ],
        "answer": 3,
        "explanation": "Long feeder fissures and extensive basalt sheets characterize flood-basalt systems rather than a single central dome.",
        "hint": "Look for a regional sheet, not only a central cone.",
        "source": "Exploring Geology 6.5, supplied PDF pp. 2, 4–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-floods-q2",
        "type": "single",
        "concept": "ch6-floods",
        "topic": "Flood basalt supply and effects",
        "prompt": "Why is “volcanism always causes cooling” too simple?",
        "choices": [
          "Volcanoes release no gases",
          "All gases have identical effects",
          "Sulfur aerosols can cool while released carbon dioxide can contribute warming",
          "Only the color of lava controls climate"
        ],
        "answer": 2,
        "explanation": "The source distinguishes opposing atmospheric effects. Their importance depends on gas amounts, persistence, and other conditions.",
        "hint": "Look for a regional sheet, not only a central cone.",
        "source": "Exploring Geology 6.5, supplied PDF pp. 2, 4–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ]
  },
  {
    "id": "ch6-composites",
    "examId": "exam-one",
    "number": 35,
    "chapter": 6,
    "kicker": "Chapter 6 · Textbook-grounded",
    "title": "Composite Volcanoes and Their Deposits",
    "description": "Composite volcanoes, or stratovolcanoes, are built by repeated eruptions over long periods. Their internal record includes lava, tephra, pyroclastic-flow deposits, lahars, and intrusions. Andesite is common, but a composite volcano need not have only one composition or one eruptive style.",
    "source": "Exploring Geology 6.7, supplied PDF pp. 2–8; also 6.8 PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.7, supplied PDF pp. 3–7; textbook-grounded, classroom emphasis unconfirmed",
    "evidenceStatus": "verified",
    "emphasis": "Textbook evidence; classroom emphasis unconfirmed",
    "concepts": [
      {
        "id": "ch6-composite",
        "label": "Layered history and collapse"
      },
      {
        "id": "ch6-lahar",
        "label": "Water-rich lahar versus pyroclastic flow"
      }
    ],
    "activities": [
      {
        "id": "ch6-composites-lesson",
        "type": "lesson",
        "title": "Composite Volcanoes and Their Deposits",
        "body": [
          "Composite volcanoes, or stratovolcanoes, are built by repeated eruptions over long periods. Their internal record includes lava, tephra, pyroclastic-flow deposits, lahars, and intrusions. Andesite is common, but a composite volcano need not have only one composition or one eruptive style.",
          "They are common above subduction zones, including the Pacific Ring of Fire. Relatively viscous intermediate and felsic lava travels shorter distances and builds steeper slopes. Pyroclastic material and altered rock can make portions unstable, so eruption and collapse hazards can interact.",
          "A lahar is a water-rich flow of volcanic mud and debris. Rain or snow and ice melt can mix with loose volcanic material; landslides can also contribute. It follows valleys and can threaten communities beyond the cone. A pyroclastic flow is instead a hot gas-supported mixture; tuff can form from deposited volcanic ash.",
          "Use disasters to remember mechanisms rather than casualty trivia. Vesuvius and Mount Pelée illustrate lethal pyroclastic activity. At Mount St. Helens in 1980, earthquakes and a growing bulge preceded collapse of the north flank; unloading reduced pressure and helped trigger a lateral blast. The important chain is deformation → instability → collapse/unloading → explosive release."
        ],
        "keyPoints": [
          "Composite means a layered history of different eruptive and surface processes.",
          "Lahar: water and debris. Pyroclastic flow: hot gas, ash, and fragments."
        ],
        "source": "Exploring Geology 6.7, supplied PDF pp. 2–8; also 6.8 PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.7, supplied PDF pp. 3–7; textbook-grounded, classroom emphasis unconfirmed"
      },
      {
        "id": "ch6-composite-q1",
        "type": "single",
        "concept": "ch6-composite",
        "topic": "Layered history and collapse",
        "prompt": "Why is the term composite appropriate for a stratovolcano?",
        "choices": [
          "Its layers record lava, pyroclastic activity, and debris or mudflows",
          "It is entirely one giant mineral",
          "It forms in only one brief fountain",
          "It has no intrusive structures"
        ],
        "answer": 0,
        "explanation": "Composite volcanoes combine deposits from multiple eruption styles and surface processes over repeated episodes.",
        "hint": "Combine the internal deposits with the process that formed each.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 2–8; also 6.8 PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-composite-q2",
        "type": "single",
        "concept": "ch6-composite",
        "topic": "Layered history and collapse",
        "prompt": "In the 1980 Mount St. Helens sequence, why did removal of the north-flank bulge matter?",
        "choices": [
          "It increased confinement on the magma",
          "It converted all magma into water",
          "It decreased pressure on magma and helped trigger a lateral blast",
          "It prevented gas expansion"
        ],
        "answer": 2,
        "explanation": "The landslide unloaded the volcano, reducing confining pressure and permitting explosive release.",
        "hint": "Combine the internal deposits with the process that formed each.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 2–8; also 6.8 PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-lahar-q1",
        "type": "single",
        "concept": "ch6-lahar",
        "topic": "Water-rich lahar versus pyroclastic flow",
        "prompt": "Heavy rain remobilizes loose volcanic ash into a muddy flow down a river valley. What is it?",
        "choices": [
          "An eruption column",
          "A lahar",
          "A lava fountain",
          "A mantle plume"
        ],
        "answer": 1,
        "explanation": "Water mixed with volcanic sediment creates a lahar. It need not be a new lava eruption.",
        "hint": "Identify the fluid carrying the material.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 3–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-lahar-q2",
        "type": "single",
        "concept": "ch6-lahar",
        "topic": "Water-rich lahar versus pyroclastic flow",
        "prompt": "An ash-rich deposit was emplaced hot and compacted into welded tuff. Which source process is most consistent?",
        "choices": [
          "Cold river transport of only rounded gravel",
          "Slow growth of one crystal",
          "Deposition of carbonate mud",
          "A pyroclastic flow"
        ],
        "answer": 3,
        "explanation": "Hot pyroclastic material may compact and weld. A lahar is a water-rich sediment flow and is not the same process.",
        "hint": "Identify the fluid carrying the material.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 3–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ]
  },
  {
    "id": "ch6-domes-calderas",
    "examId": "exam-one",
    "number": 36,
    "chapter": 6,
    "kicker": "Chapter 6 · Textbook-grounded",
    "title": "Dome Growth and Caldera Collapse",
    "description": "A dome forms when intermediate or felsic lava is too viscous to spread far. It can inflate from within as magma is injected, or grow outward as thick lava breaks through the surface. The solid outer crust fractures into angular blocks, creating a rubbly exterior.",
    "source": "Exploring Geology 6.9, supplied PDF pp. 1–3, 5–6; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.10, supplied PDF pp. 2–6; also 6.11 PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
    "evidenceStatus": "verified",
    "emphasis": "Textbook evidence; classroom emphasis unconfirmed",
    "concepts": [
      {
        "id": "ch6-dome",
        "label": "Dome growth and failure"
      },
      {
        "id": "ch6-caldera",
        "label": "Withdrawal causes roof subsidence"
      }
    ],
    "activities": [
      {
        "id": "ch6-domes-calderas-lesson",
        "type": "lesson",
        "title": "Dome Growth and Caldera Collapse",
        "body": [
          "A dome forms when intermediate or felsic lava is too viscous to spread far. It can inflate from within as magma is injected, or grow outward as thick lava breaks through the surface. The solid outer crust fractures into angular blocks, creating a rubbly exterior.",
          "A dome can fail by gravitational collapse or explode when gas is trapped beneath a plug. Collapse can send hot blocks and ash downslope as a pyroclastic flow. Domes may occupy the craters of composite volcanoes or form within calderas after a larger eruption.",
          "A caldera is a large volcanic depression formed when the roof above a magma reservoir subsides as magma is withdrawn. Eruption and collapse can occur together. It is not simply a hole excavated by an outward explosion. Faulted blocks drop, thick ash accumulates inside, and later domes, lava, sediment, or a lake may fill part of the basin.",
          "Crater Lake occupies a caldera formed during the Mount Mazama eruption; later activity built Wizard Island. Thera and Krakatau illustrate how eruption and coastal collapse can generate destructive sea waves. Yellowstone illustrates hot-spot-related continental caldera volcanism and widespread ash deposits. These are mechanism examples, not forecasts: historical intervals do not establish the date of the next eruption."
        ],
        "keyPoints": [
          "High-viscosity lava builds near a vent; collapse can send blocks and ash downhill.",
          "Caldera collapse follows loss of magma support beneath the roof."
        ],
        "source": "Exploring Geology 6.9, supplied PDF pp. 1–3, 5–6; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.10, supplied PDF pp. 2–6; also 6.11 PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed"
      },
      {
        "id": "ch6-dome-q1",
        "type": "single",
        "concept": "ch6-dome",
        "topic": "Dome growth and failure",
        "prompt": "New magma enters the interior of a dome and fractures its solid outer shell. What is happening?",
        "choices": [
          "Caldera roof collapse only",
          "Erosion of a nonvolcanic mesa",
          "Internal growth and inflation of a viscous lava dome",
          "Formation of pillows under water"
        ],
        "answer": 2,
        "explanation": "Injection inside the dome expands it and fractures the outer crust. Domes can also grow by lava breaking out externally.",
        "hint": "Growth and destruction are different parts of the dome cycle.",
        "source": "Exploring Geology 6.9, supplied PDF pp. 1–3, 5–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-dome-q2",
        "type": "single",
        "concept": "ch6-dome",
        "topic": "Dome growth and failure",
        "prompt": "Why can a slowly growing dome still produce a fast-moving hazard?",
        "choices": [
          "Its unstable flank can collapse into a pyroclastic flow of hot blocks and ash",
          "Slow growth guarantees no hazard",
          "Only basalt can move downslope",
          "Dome material cannot fragment"
        ],
        "answer": 0,
        "explanation": "Slow extrusion does not guarantee stability. Collapse releases material downslope and can form a dangerous pyroclastic flow.",
        "hint": "Growth and destruction are different parts of the dome cycle.",
        "source": "Exploring Geology 6.9, supplied PDF pp. 1–3, 5–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-caldera-q1",
        "type": "single",
        "concept": "ch6-caldera",
        "topic": "Withdrawal causes roof subsidence",
        "prompt": "Which causal sequence best describes caldera formation?",
        "choices": [
          "Rain fills a crater, then manufactures magma",
          "Magma withdrawal during eruption → roof subsidence along faults",
          "A glacier freezes the magma chamber into a hill",
          "A mountain simply dissolves without volcanism"
        ],
        "answer": 1,
        "explanation": "As magma is withdrawn, the overlying roof subsides along fractures. The eruption and subsidence can occur simultaneously.",
        "hint": "Track what leaves the chamber and what drops into the vacated space.",
        "source": "Exploring Geology 6.10, supplied PDF pp. 2–6; also 6.11 PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-caldera-q2",
        "type": "single",
        "concept": "ch6-caldera",
        "topic": "Withdrawal causes roof subsidence",
        "prompt": "A small volcanic dome sits inside a broad caldera. Which interpretation is reasonable?",
        "choices": [
          "Calderas cannot contain later volcanic activity",
          "The dome proves the depression is nonvolcanic",
          "Every caldera is made only by wind erosion",
          "Residual magma erupted after the main collapse"
        ],
        "answer": 3,
        "explanation": "Later magma can reach the surface within or around a caldera and construct domes or other volcanic features.",
        "hint": "Track what leaves the chamber and what drops into the vacated space.",
        "source": "Exploring Geology 6.10, supplied PDF pp. 2–6; also 6.11 PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ]
  },
  {
    "id": "ch6-risk",
    "examId": "exam-one",
    "number": 37,
    "chapter": 6,
    "kicker": "Chapter 6 · Textbook-grounded",
    "title": "Hazard Is Not the Same as Risk",
    "description": "A hazard is a potentially dangerous process or condition. Risk concerns its possible consequences for people, property, and society. A remote submarine eruption and one through a developed neighborhood can involve comparable physical processes but very different societal exposure.",
    "source": "Exploring Geology 6.6, supplied PDF pp. 2–6; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.12, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
    "evidenceStatus": "verified",
    "emphasis": "Textbook evidence; classroom emphasis unconfirmed",
    "concepts": [
      {
        "id": "ch6-hazard-risk",
        "label": "Process versus societal consequences"
      },
      {
        "id": "ch6-pathways",
        "label": "Valleys, winds, and distance"
      }
    ],
    "activities": [
      {
        "id": "ch6-risk-lesson",
        "type": "lesson",
        "title": "Hazard Is Not the Same as Risk",
        "body": [
          "A hazard is a potentially dangerous process or condition. Risk concerns its possible consequences for people, property, and society. A remote submarine eruption and one through a developed neighborhood can involve comparable physical processes but very different societal exposure.",
          "Basaltic lava can burn or bury structures even when people have time to move away. Scoria and larger projectiles are especially dangerous near vents. Ash can spread downwind, volcanic gases can be hazardous, and eruption beneath ice can cause catastrophic meltwater floods. Relatively nonexplosive does not mean harmless.",
          "Assess paths as well as distance. Valleys can channel lava, lahars, and some pyroclastic flows. Ash follows atmospheric winds. A village farther away in a valley may be more exposed to a particular flow than a closer ridge site. A ridge is not universally safe from ash, blasts, or large flows.",
          "Infer potential behavior from rock types, shape, dated deposits, and past activity, then combine that history with current observations. The section 6.15 PDF contains only the investigation introduction, not its referenced island map or rock photographs. That specific investigation remains incomplete; the practice here uses original scenarios supported by sections 6.6 and 6.12, not invented answers to its missing map."
        ],
        "keyPoints": [
          "Hazard describes the threatening process; risk includes potential societal loss.",
          "Flow paths follow topography; ash dispersal follows wind."
        ],
        "source": "Exploring Geology 6.6, supplied PDF pp. 2–6; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.12, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed"
      },
      {
        "id": "ch6-hazard-risk-q1",
        "type": "single",
        "concept": "ch6-hazard-risk",
        "topic": "Process versus societal consequences",
        "prompt": "Which change most directly raises societal risk without changing the lava-flow hazard itself?",
        "choices": [
          "The lava is given a new name",
          "The flow is photographed",
          "A geologist changes the map color",
          "More homes are built in the expected flow path"
        ],
        "answer": 3,
        "explanation": "Increasing exposed people and structures raises potential loss even if the physical hazard is unchanged.",
        "hint": "Ask whether the statement describes the event or its consequences for people.",
        "source": "Exploring Geology 6.6, supplied PDF pp. 2–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-hazard-risk-q2",
        "type": "single",
        "concept": "ch6-hazard-risk",
        "topic": "Process versus societal consequences",
        "prompt": "How can a basaltic eruption beneath a glacier produce a flood?",
        "choices": [
          "Heat melts ice and releases water that can carry debris",
          "All basalt is liquid water",
          "The eruption eliminates gravity",
          "Only felsic magma can melt ice"
        ],
        "answer": 0,
        "explanation": "Eruptive heat can rapidly melt ice. Released meltwater may transport sediment, rock, and ice blocks.",
        "hint": "Ask whether the statement describes the event or its consequences for people.",
        "source": "Exploring Geology 6.6, supplied PDF pp. 2–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-pathways-q1",
        "type": "single",
        "concept": "ch6-pathways",
        "topic": "Valleys, winds, and distance",
        "prompt": "Two settlements lie equally far from a volcano. One is in a drainage valley, the other on an adjacent ridge. For a valley-confined lahar, which is generally more exposed?",
        "choices": [
          "The ridge solely because it is higher",
          "Both must have identical exposure",
          "The settlement in the drainage valley",
          "Neither because distance is equal"
        ],
        "answer": 2,
        "explanation": "Lahars follow drainage paths. Equal distance does not imply equal exposure to a channeled flow.",
        "hint": "Rank each site for the particular hazard, not by distance alone.",
        "source": "Exploring Geology 6.12, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-pathways-q2",
        "type": "single",
        "concept": "ch6-pathways",
        "topic": "Valleys, winds, and distance",
        "prompt": "An eruption column rises above a volcano while wind blows east. Where is the greater directional ash-fall concern, all else equal?",
        "choices": [
          "Only directly uphill",
          "East, downwind of the column",
          "Only west because ash moves against wind",
          "Only inside river channels"
        ],
        "answer": 1,
        "explanation": "Airborne ash is carried downwind. This differs from the topographic control on ground-hugging flows.",
        "hint": "Rank each site for the particular hazard, not by distance alone.",
        "source": "Exploring Geology 6.12, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ]
  },
  {
    "id": "ch6-monitoring",
    "examId": "exam-one",
    "number": 38,
    "chapter": 6,
    "kicker": "Chapter 6 · Textbook-grounded",
    "title": "Monitor Change and Apply It to Rainier",
    "description": "Monitoring combines independent evidence. Seismometers record ground shaking associated with rock fracture and magma movement. GPS and surveying track position and elevation; tiltmeters track changes in slope. Repeated satellite radar observations can reveal deformation across a wider area.",
    "source": "Exploring Geology 6.13, supplied PDF pp. 2–8; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.14, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
    "evidenceStatus": "verified",
    "emphasis": "Textbook evidence; classroom emphasis unconfirmed",
    "concepts": [
      {
        "id": "ch6-monitor-tools",
        "label": "Match observations to instruments"
      },
      {
        "id": "ch6-rainier",
        "label": "Plate setting to valley risk"
      }
    ],
    "activities": [
      {
        "id": "ch6-monitoring-lesson",
        "type": "lesson",
        "title": "Monitor Change and Apply It to Rainier",
        "body": [
          "Monitoring combines independent evidence. Seismometers record ground shaking associated with rock fracture and magma movement. GPS and surveying track position and elevation; tiltmeters track changes in slope. Repeated satellite radar observations can reveal deformation across a wider area.",
          "Gas measurements, including sulfur dioxide output, and thermal observations can reveal changes associated with rising magma. The strongest interpretation combines seismic, gas, thermal, and deformation evidence. A single signal is not an exact eruption countdown, and absence of a visible lava flow does not prove absence of unrest.",
          "Mount Rainier is an andesitic composite volcano above the Cascadia subduction zone, where oceanic Juan de Fuca lithosphere descends beneath North America. This connects Chapter 3 plate boundaries to Chapter 5 magma processes and Chapter 6 eruption style.",
          "At Rainier, snow and ice, steep or weakened rock, and valleys draining toward communities make lahars especially important. Eruptions can generate them, but landslides unrelated to a new eruption can also contribute. Hazard maps show pathways and potential inundation, while remote sensors can detect a moving lahar and support warnings. The source map is a textbook case study, not a current emergency forecast."
        ],
        "keyPoints": [
          "Seismometer: shaking; GPS/tilt/radar: deformation; gas and heat: additional evidence.",
          "Subduction builds the composite volcano; ice, debris, and valleys connect it to lahar exposure."
        ],
        "source": "Exploring Geology 6.13, supplied PDF pp. 2–8; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.14, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed"
      },
      {
        "id": "ch6-monitor-tools-q1",
        "type": "single",
        "concept": "ch6-monitor-tools",
        "topic": "Match observations to instruments",
        "prompt": "A station detects a small change in the volcano’s surface slope. Which instrument most directly measures it?",
        "choices": [
          "A mineral streak plate",
          "A tiltmeter",
          "A balance measuring lava mass",
          "A compass alone"
        ],
        "answer": 1,
        "explanation": "Tiltmeters detect changes in ground tilt, one expression of deformation. Seismometers instead record shaking.",
        "hint": "First name what is being measured.",
        "source": "Exploring Geology 6.13, supplied PDF pp. 2–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-monitor-tools-q2",
        "type": "single",
        "concept": "ch6-monitor-tools",
        "topic": "Match observations to instruments",
        "prompt": "Earthquake activity, ground inflation, and sulfur dioxide output all increase. What is the strongest scientific response?",
        "choices": [
          "Declare the exact eruption minute from one reading",
          "Ignore all but the gas data",
          "Conclude that every volcano follows a fixed clock",
          "Integrate the signals to assess unrest and possible eruption"
        ],
        "answer": 3,
        "explanation": "Multiple independent changes support a more useful interpretation than one measurement. Monitoring improves assessment without guaranteeing exact timing.",
        "hint": "First name what is being measured.",
        "source": "Exploring Geology 6.13, supplied PDF pp. 2–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-rainier-q1",
        "type": "single",
        "concept": "ch6-rainier",
        "topic": "Plate setting to valley risk",
        "prompt": "Which tectonic relationship underlies Mount Rainier and the Cascades?",
        "choices": [
          "Juan de Fuca lithosphere subducts beneath North America",
          "North America splits at Rainier into two ocean ridges",
          "A transform boundary alone creates all Cascade magma",
          "Rainier is unrelated to a plate boundary"
        ],
        "answer": 0,
        "explanation": "The Cascades overlie the Cascadia ocean-continent subduction zone. The Juan de Fuca plate descends beneath North America.",
        "hint": "Link tectonic cause, volcano properties, and the path to people.",
        "source": "Exploring Geology 6.14, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-rainier-q2",
        "type": "single",
        "concept": "ch6-rainier",
        "topic": "Plate setting to valley risk",
        "prompt": "Why can a town well down a Rainier river valley still face volcanic risk without a new lava flow reaching it?",
        "choices": [
          "All hazards stop at the summit",
          "Only wind matters for water-rich flows",
          "Lahars can travel along drainage paths, including flows triggered by slope failure",
          "A river guarantees protection"
        ],
        "answer": 2,
        "explanation": "Water and volcanic debris can move far along valleys. Rainier lahars can be associated with eruptions or with noneruptive slope failures.",
        "hint": "Link tectonic cause, volcano properties, and the path to people.",
        "source": "Exploring Geology 6.14, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-monitor-match",
        "type": "match",
        "concept": "ch6-monitor-tools",
        "prompt": "Match monitoring observations with the appropriate measurement.",
        "rows": [
          {
            "label": "Earthquake activity",
            "answer": "Seismometer"
          },
          {
            "label": "Change in slope",
            "answer": "Tiltmeter"
          },
          {
            "label": "Precise station position",
            "answer": "GPS"
          },
          {
            "label": "Heat output",
            "answer": "Thermal sensing"
          }
        ],
        "options": [
          "Seismometer",
          "Tiltmeter",
          "GPS",
          "Thermal sensing"
        ],
        "hint": "Name the physical quantity before choosing the instrument.",
        "explanation": "Seismometers measure shaking, tiltmeters measure tilt, GPS measures position, and thermal sensing tracks heat. The observations should be interpreted together.",
        "source": "Exploring Geology 6.13, supplied PDF pp. 2–8; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.14, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-rainier-teachback",
        "type": "teachback",
        "concept": "ch6-rainier",
        "prompt": "Explain how plate setting, magma, ice, and valleys connect Rainier to risk downstream. Reveal the rubric, then honestly self-rate.",
        "rubric": [
          "Juan de Fuca oceanic lithosphere subducts beneath North America.",
          "Rainier is an intermediate-composition composite volcano.",
          "Water from snow/ice or other sources can mix with volcanic debris into lahars.",
          "Valleys carry debris toward exposed communities; some lahars do not require a new eruption."
        ],
        "hint": "Follow cause → volcano → hazard → exposure.",
        "explanation": "Use all four links in the rubric. This is self-assessment, not automatic grading of prose.",
        "source": "Exploring Geology 6.13, supplied PDF pp. 2–8; textbook-grounded, classroom emphasis unconfirmed | Exploring Geology 6.14, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ]
  }
];
const quizzes=[
  {
    "id": "chapter-six-volcanoes-drill",
    "title": "Chapter 6 · Eruptions and Volcano Types",
    "chapters": "Chapter 6 · Sections 6.1–6.5",
    "questions": [
      {
        "id": "ch6-vent-q1",
        "type": "single",
        "concept": "ch6-vent",
        "topic": "Vent versus erosional remnant",
        "prompt": "A flat-topped hill has a basalt cap but lies far from the mapped eruptive fissure. What best explains why it need not be a volcano?",
        "choices": [
          "Basalt cannot be volcanic",
          "Erosion can leave a remnant of a lava flow away from its vent",
          "Every lava flow must retain a crater",
          "Only underwater vents count"
        ],
        "answer": 1,
        "explanation": "The mesa can be an erosional remnant of a lava sheet. A volcanic rock and a volcano built at a vent are different observations.",
        "hint": "Separate where lava erupted from where it later cooled.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 2–3; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-vent-q2",
        "type": "single",
        "concept": "ch6-vent",
        "topic": "Vent versus erosional remnant",
        "prompt": "Lava emerges along a long crack without building a conical mountain. How should it be classified?",
        "choices": [
          "Not volcanic because no cone exists",
          "Sedimentary deposition",
          "A volcanic fissure eruption",
          "A glacier"
        ],
        "answer": 2,
        "explanation": "A volcano need not have a classic cone. Magma reaching the surface through a fissure is volcanic activity.",
        "hint": "Separate where lava erupted from where it later cooled.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 2–3; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-types-q1",
        "type": "single",
        "concept": "ch6-types",
        "topic": "Compare the four volcano forms",
        "prompt": "Which description best identifies a shield volcano?",
        "choices": [
          "A broad edifice built mainly by repeated basalt flows",
          "A small pile made only of loose scoria",
          "An erosional mesa with no vent",
          "A steep mound of highly viscous lava only"
        ],
        "answer": 0,
        "explanation": "Low-viscosity basalt spreads outward. Repeated flows build a broad shield with gentle slopes.",
        "hint": "Connect shape to the material and how far it travels.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-types-q2",
        "type": "single",
        "concept": "ch6-types",
        "topic": "Compare the four volcano forms",
        "prompt": "A small cone is mostly loose vesicular fragments ejected around a vent. Which type fits best?",
        "choices": [
          "Caldera",
          "Shield volcano",
          "Volcanic dome",
          "Scoria cone"
        ],
        "answer": 3,
        "explanation": "Scoria cones grow as ejected fragments fall near a vent. They are not simply miniature domes of intact viscous lava.",
        "hint": "Connect shape to the material and how far it travels.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-gas-q1",
        "type": "single",
        "concept": "ch6-gas",
        "topic": "Pressure, viscosity, and gas escape",
        "prompt": "What most directly allows dissolved gas to form bubbles as magma rises?",
        "choices": [
          "Increasing confining pressure",
          "A decrease in confining pressure",
          "Conversion of gas to feldspar",
          "Loss of all heat instantly"
        ],
        "answer": 1,
        "explanation": "Pressure decreases toward the surface, allowing dissolved gases to come out of solution and expand.",
        "hint": "Think of both dissolved gas and the ability of bubbles to move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 6–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-gas-q2",
        "type": "single",
        "concept": "ch6-gas",
        "topic": "Pressure, viscosity, and gas escape",
        "prompt": "Two magmas have comparable gas contents. Why can the more viscous one have greater explosive potential?",
        "choices": [
          "It always contains no silica",
          "Its bubbles are necessarily colder",
          "It prevents gravity",
          "It can retain gas rather than allowing easy escape"
        ],
        "answer": 3,
        "explanation": "High viscosity resists bubble movement and gas escape. Trapped gas can build pressure; composition alone is not the only variable.",
        "hint": "Think of both dissolved gas and the ability of bubbles to move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 6–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-products-q1",
        "type": "single",
        "concept": "ch6-products",
        "topic": "Distinguish volcanic products and transport",
        "prompt": "A dense, hot cloud of ash and gas races downslope after an eruption column collapses. What is it?",
        "choices": [
          "A pyroclastic flow",
          "A lava tube",
          "A lahar made primarily of water and mud",
          "A slowly advancing intact lava flow"
        ],
        "answer": 0,
        "explanation": "A collapsed hot ash-and-gas mixture is a pyroclastic flow. A lahar requires water mixed with volcanic debris.",
        "hint": "Identify what carries the fragments and where they move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-products-q2",
        "type": "single",
        "concept": "ch6-products",
        "topic": "Distinguish volcanic products and transport",
        "prompt": "Fine volcanic particles blanket a town far downwind. Which transport route best explains this?",
        "choices": [
          "Only a lava flow could reach it",
          "Mineral cleavage moved the particles",
          "Ash rose in an eruption column and was carried by wind",
          "The entire magma chamber slid there"
        ],
        "answer": 2,
        "explanation": "Fine tephra can be carried far downwind in the atmosphere and deposited as ash fall, unlike valley-confined ground flows.",
        "hint": "Identify what carries the fragments and where they move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-scoria-q1",
        "type": "single",
        "concept": "ch6-scoria",
        "topic": "One vent, changing gas content",
        "prompt": "A basaltic vent first builds a cone of cinders, then releases a quieter lava flow. Which change best explains the transition?",
        "choices": [
          "The lava must become pure quartz",
          "The plate boundary must reverse direction",
          "Later magma contains less gas available to drive fountains",
          "All rock has become sedimentary"
        ],
        "answer": 2,
        "explanation": "Early gas-rich magma can fragment in fountains. Later magma with less gas can erupt as a comparatively nonexplosive flow.",
        "hint": "An eruption can change while composition stays basaltic.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 2–3, 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-scoria-q2",
        "type": "single",
        "concept": "ch6-scoria",
        "topic": "One vent, changing gas content",
        "prompt": "What do abundant vesicles in a basalt sample record?",
        "choices": [
          "Gas bubbles trapped when the lava solidified",
          "The number of minerals in the rock",
          "Cleavage directions of one crystal",
          "Dissolution by rivers in every case"
        ],
        "answer": 0,
        "explanation": "Vesicles are former bubbles. Their presence records gas behavior during solidification, not mineral cleavage.",
        "hint": "An eruption can change while composition stays basaltic.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 2–3, 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-flow-textures-q1",
        "type": "single",
        "concept": "ch6-flow-textures",
        "topic": "Texture and environment of basalt flows",
        "prompt": "Which pairing correctly matches basaltic flow surface textures?",
        "choices": [
          "Aa is ropy; pahoehoe is jagged",
          "Both terms mean volcanic ash",
          "Pahoehoe means pillow basalt only",
          "Aa is jagged and blocky; pahoehoe is ropy"
        ],
        "answer": 3,
        "explanation": "Aa breaks into rough blocks while pahoehoe develops smoother, folded surfaces. Both describe lava-flow features.",
        "hint": "Separate surface shape, heat retention, and eruption environment.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 4; also 6.4 PDF p. 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-flow-textures-q2",
        "type": "single",
        "concept": "ch6-flow-textures",
        "topic": "Texture and environment of basalt flows",
        "prompt": "Why can a lava flow continue traveling beneath a solid roof?",
        "choices": [
          "The roof adds water until the lava becomes a river",
          "The roof insulates the hot moving interior",
          "The whole flow is already solid",
          "The roof removes gravity"
        ],
        "answer": 1,
        "explanation": "A lava tube limits heat loss, allowing its molten interior to remain hot and mobile longer than an exposed flow.",
        "hint": "Separate surface shape, heat retention, and eruption environment.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 4; also 6.4 PDF p. 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-shields-q1",
        "type": "single",
        "concept": "ch6-shields",
        "topic": "Composition to shield geometry",
        "prompt": "Why do repeated basalt flows commonly build gentle shield slopes?",
        "choices": [
          "Lava spreads far enough to distribute material broadly",
          "All lava is deposited vertically at the vent",
          "Shields are made only of windblown ash",
          "High viscosity keeps every flow at the summit"
        ],
        "answer": 0,
        "explanation": "Fluid basalt spreads rather than piling exclusively beside the vent. Repetition builds broad, gentle slopes.",
        "hint": "Use the Chapter 5 viscosity connection.",
        "source": "Exploring Geology 6.4, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-shields-q2",
        "type": "single",
        "concept": "ch6-shields",
        "topic": "Composition to shield geometry",
        "prompt": "Rounded pillow-shaped basalt is exposed on a volcanic island. What is the strongest inference?",
        "choices": [
          "The island must be a composite volcano",
          "The basalt erupted into water",
          "The basalt formed from sandstone",
          "The lava never reached the surface"
        ],
        "answer": 1,
        "explanation": "Pillow forms develop as lava advances into water. They are evidence of an aquatic eruption environment.",
        "hint": "Use the Chapter 5 viscosity connection.",
        "source": "Exploring Geology 6.4, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-floods-q1",
        "type": "single",
        "concept": "ch6-floods",
        "topic": "Flood basalt supply and effects",
        "prompt": "A plateau exposes stacked basalt sheets fed by many long dikes. Which eruptive pattern fits?",
        "choices": [
          "One dome of high-viscosity rhyolite",
          "Only a single small scoria cone",
          "A limestone reef",
          "Repeated large fissure-fed flood-basalt eruptions"
        ],
        "answer": 3,
        "explanation": "Long feeder fissures and extensive basalt sheets characterize flood-basalt systems rather than a single central dome.",
        "hint": "Look for a regional sheet, not only a central cone.",
        "source": "Exploring Geology 6.5, supplied PDF pp. 2, 4–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-floods-q2",
        "type": "single",
        "concept": "ch6-floods",
        "topic": "Flood basalt supply and effects",
        "prompt": "Why is “volcanism always causes cooling” too simple?",
        "choices": [
          "Volcanoes release no gases",
          "All gases have identical effects",
          "Sulfur aerosols can cool while released carbon dioxide can contribute warming",
          "Only the color of lava controls climate"
        ],
        "answer": 2,
        "explanation": "The source distinguishes opposing atmospheric effects. Their importance depends on gas amounts, persistence, and other conditions.",
        "hint": "Look for a regional sheet, not only a central cone.",
        "source": "Exploring Geology 6.5, supplied PDF pp. 2, 4–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ],
    "examId": "exam-one",
    "lane": "Exam 1",
    "status": "Ready",
    "description": "Original textbook-grounded practice. Same item roots as topic Labs; use topic Labs for confidence-based mastery. Lecture emphasis unconfirmed."
  },
  {
    "id": "chapter-six-hazards-drill",
    "title": "Chapter 6 · Hazards and Monitoring",
    "chapters": "Chapter 6 · Sections 6.6–6.14",
    "questions": [
      {
        "id": "ch6-composite-q1",
        "type": "single",
        "concept": "ch6-composite",
        "topic": "Layered history and collapse",
        "prompt": "Why is the term composite appropriate for a stratovolcano?",
        "choices": [
          "Its layers record lava, pyroclastic activity, and debris or mudflows",
          "It is entirely one giant mineral",
          "It forms in only one brief fountain",
          "It has no intrusive structures"
        ],
        "answer": 0,
        "explanation": "Composite volcanoes combine deposits from multiple eruption styles and surface processes over repeated episodes.",
        "hint": "Combine the internal deposits with the process that formed each.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 2–8; also 6.8 PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-composite-q2",
        "type": "single",
        "concept": "ch6-composite",
        "topic": "Layered history and collapse",
        "prompt": "In the 1980 Mount St. Helens sequence, why did removal of the north-flank bulge matter?",
        "choices": [
          "It increased confinement on the magma",
          "It converted all magma into water",
          "It decreased pressure on magma and helped trigger a lateral blast",
          "It prevented gas expansion"
        ],
        "answer": 2,
        "explanation": "The landslide unloaded the volcano, reducing confining pressure and permitting explosive release.",
        "hint": "Combine the internal deposits with the process that formed each.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 2–8; also 6.8 PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-lahar-q1",
        "type": "single",
        "concept": "ch6-lahar",
        "topic": "Water-rich lahar versus pyroclastic flow",
        "prompt": "Heavy rain remobilizes loose volcanic ash into a muddy flow down a river valley. What is it?",
        "choices": [
          "An eruption column",
          "A lahar",
          "A lava fountain",
          "A mantle plume"
        ],
        "answer": 1,
        "explanation": "Water mixed with volcanic sediment creates a lahar. It need not be a new lava eruption.",
        "hint": "Identify the fluid carrying the material.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 3–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-lahar-q2",
        "type": "single",
        "concept": "ch6-lahar",
        "topic": "Water-rich lahar versus pyroclastic flow",
        "prompt": "An ash-rich deposit was emplaced hot and compacted into welded tuff. Which source process is most consistent?",
        "choices": [
          "Cold river transport of only rounded gravel",
          "Slow growth of one crystal",
          "Deposition of carbonate mud",
          "A pyroclastic flow"
        ],
        "answer": 3,
        "explanation": "Hot pyroclastic material may compact and weld. A lahar is a water-rich sediment flow and is not the same process.",
        "hint": "Identify the fluid carrying the material.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 3–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-dome-q1",
        "type": "single",
        "concept": "ch6-dome",
        "topic": "Dome growth and failure",
        "prompt": "New magma enters the interior of a dome and fractures its solid outer shell. What is happening?",
        "choices": [
          "Caldera roof collapse only",
          "Erosion of a nonvolcanic mesa",
          "Internal growth and inflation of a viscous lava dome",
          "Formation of pillows under water"
        ],
        "answer": 2,
        "explanation": "Injection inside the dome expands it and fractures the outer crust. Domes can also grow by lava breaking out externally.",
        "hint": "Growth and destruction are different parts of the dome cycle.",
        "source": "Exploring Geology 6.9, supplied PDF pp. 1–3, 5–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-dome-q2",
        "type": "single",
        "concept": "ch6-dome",
        "topic": "Dome growth and failure",
        "prompt": "Why can a slowly growing dome still produce a fast-moving hazard?",
        "choices": [
          "Its unstable flank can collapse into a pyroclastic flow of hot blocks and ash",
          "Slow growth guarantees no hazard",
          "Only basalt can move downslope",
          "Dome material cannot fragment"
        ],
        "answer": 0,
        "explanation": "Slow extrusion does not guarantee stability. Collapse releases material downslope and can form a dangerous pyroclastic flow.",
        "hint": "Growth and destruction are different parts of the dome cycle.",
        "source": "Exploring Geology 6.9, supplied PDF pp. 1–3, 5–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-caldera-q1",
        "type": "single",
        "concept": "ch6-caldera",
        "topic": "Withdrawal causes roof subsidence",
        "prompt": "Which causal sequence best describes caldera formation?",
        "choices": [
          "Rain fills a crater, then manufactures magma",
          "Magma withdrawal during eruption → roof subsidence along faults",
          "A glacier freezes the magma chamber into a hill",
          "A mountain simply dissolves without volcanism"
        ],
        "answer": 1,
        "explanation": "As magma is withdrawn, the overlying roof subsides along fractures. The eruption and subsidence can occur simultaneously.",
        "hint": "Track what leaves the chamber and what drops into the vacated space.",
        "source": "Exploring Geology 6.10, supplied PDF pp. 2–6; also 6.11 PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-caldera-q2",
        "type": "single",
        "concept": "ch6-caldera",
        "topic": "Withdrawal causes roof subsidence",
        "prompt": "A small volcanic dome sits inside a broad caldera. Which interpretation is reasonable?",
        "choices": [
          "Calderas cannot contain later volcanic activity",
          "The dome proves the depression is nonvolcanic",
          "Every caldera is made only by wind erosion",
          "Residual magma erupted after the main collapse"
        ],
        "answer": 3,
        "explanation": "Later magma can reach the surface within or around a caldera and construct domes or other volcanic features.",
        "hint": "Track what leaves the chamber and what drops into the vacated space.",
        "source": "Exploring Geology 6.10, supplied PDF pp. 2–6; also 6.11 PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-hazard-risk-q1",
        "type": "single",
        "concept": "ch6-hazard-risk",
        "topic": "Process versus societal consequences",
        "prompt": "Which change most directly raises societal risk without changing the lava-flow hazard itself?",
        "choices": [
          "The lava is given a new name",
          "The flow is photographed",
          "A geologist changes the map color",
          "More homes are built in the expected flow path"
        ],
        "answer": 3,
        "explanation": "Increasing exposed people and structures raises potential loss even if the physical hazard is unchanged.",
        "hint": "Ask whether the statement describes the event or its consequences for people.",
        "source": "Exploring Geology 6.6, supplied PDF pp. 2–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-hazard-risk-q2",
        "type": "single",
        "concept": "ch6-hazard-risk",
        "topic": "Process versus societal consequences",
        "prompt": "How can a basaltic eruption beneath a glacier produce a flood?",
        "choices": [
          "Heat melts ice and releases water that can carry debris",
          "All basalt is liquid water",
          "The eruption eliminates gravity",
          "Only felsic magma can melt ice"
        ],
        "answer": 0,
        "explanation": "Eruptive heat can rapidly melt ice. Released meltwater may transport sediment, rock, and ice blocks.",
        "hint": "Ask whether the statement describes the event or its consequences for people.",
        "source": "Exploring Geology 6.6, supplied PDF pp. 2–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-pathways-q1",
        "type": "single",
        "concept": "ch6-pathways",
        "topic": "Valleys, winds, and distance",
        "prompt": "Two settlements lie equally far from a volcano. One is in a drainage valley, the other on an adjacent ridge. For a valley-confined lahar, which is generally more exposed?",
        "choices": [
          "The ridge solely because it is higher",
          "Both must have identical exposure",
          "The settlement in the drainage valley",
          "Neither because distance is equal"
        ],
        "answer": 2,
        "explanation": "Lahars follow drainage paths. Equal distance does not imply equal exposure to a channeled flow.",
        "hint": "Rank each site for the particular hazard, not by distance alone.",
        "source": "Exploring Geology 6.12, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-pathways-q2",
        "type": "single",
        "concept": "ch6-pathways",
        "topic": "Valleys, winds, and distance",
        "prompt": "An eruption column rises above a volcano while wind blows east. Where is the greater directional ash-fall concern, all else equal?",
        "choices": [
          "Only directly uphill",
          "East, downwind of the column",
          "Only west because ash moves against wind",
          "Only inside river channels"
        ],
        "answer": 1,
        "explanation": "Airborne ash is carried downwind. This differs from the topographic control on ground-hugging flows.",
        "hint": "Rank each site for the particular hazard, not by distance alone.",
        "source": "Exploring Geology 6.12, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-monitor-tools-q1",
        "type": "single",
        "concept": "ch6-monitor-tools",
        "topic": "Match observations to instruments",
        "prompt": "A station detects a small change in the volcano’s surface slope. Which instrument most directly measures it?",
        "choices": [
          "A mineral streak plate",
          "A tiltmeter",
          "A balance measuring lava mass",
          "A compass alone"
        ],
        "answer": 1,
        "explanation": "Tiltmeters detect changes in ground tilt, one expression of deformation. Seismometers instead record shaking.",
        "hint": "First name what is being measured.",
        "source": "Exploring Geology 6.13, supplied PDF pp. 2–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-monitor-tools-q2",
        "type": "single",
        "concept": "ch6-monitor-tools",
        "topic": "Match observations to instruments",
        "prompt": "Earthquake activity, ground inflation, and sulfur dioxide output all increase. What is the strongest scientific response?",
        "choices": [
          "Declare the exact eruption minute from one reading",
          "Ignore all but the gas data",
          "Conclude that every volcano follows a fixed clock",
          "Integrate the signals to assess unrest and possible eruption"
        ],
        "answer": 3,
        "explanation": "Multiple independent changes support a more useful interpretation than one measurement. Monitoring improves assessment without guaranteeing exact timing.",
        "hint": "First name what is being measured.",
        "source": "Exploring Geology 6.13, supplied PDF pp. 2–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-rainier-q1",
        "type": "single",
        "concept": "ch6-rainier",
        "topic": "Plate setting to valley risk",
        "prompt": "Which tectonic relationship underlies Mount Rainier and the Cascades?",
        "choices": [
          "Juan de Fuca lithosphere subducts beneath North America",
          "North America splits at Rainier into two ocean ridges",
          "A transform boundary alone creates all Cascade magma",
          "Rainier is unrelated to a plate boundary"
        ],
        "answer": 0,
        "explanation": "The Cascades overlie the Cascadia ocean-continent subduction zone. The Juan de Fuca plate descends beneath North America.",
        "hint": "Link tectonic cause, volcano properties, and the path to people.",
        "source": "Exploring Geology 6.14, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-rainier-q2",
        "type": "single",
        "concept": "ch6-rainier",
        "topic": "Plate setting to valley risk",
        "prompt": "Why can a town well down a Rainier river valley still face volcanic risk without a new lava flow reaching it?",
        "choices": [
          "All hazards stop at the summit",
          "Only wind matters for water-rich flows",
          "Lahars can travel along drainage paths, including flows triggered by slope failure",
          "A river guarantees protection"
        ],
        "answer": 2,
        "explanation": "Water and volcanic debris can move far along valleys. Rainier lahars can be associated with eruptions or with noneruptive slope failures.",
        "hint": "Link tectonic cause, volcano properties, and the path to people.",
        "source": "Exploring Geology 6.14, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ],
    "examId": "exam-one",
    "lane": "Exam 1",
    "status": "Ready",
    "description": "Original textbook-grounded practice. Same item roots as topic Labs; use topic Labs for confidence-based mastery. Lecture emphasis unconfirmed."
  },
  {
    "id": "chapter-six-boss-drill",
    "title": "Chapter 6 Boss Drill",
    "chapters": "Chapter 6 · Volcanoes and Volcanic Hazards",
    "kind": "boss",
    "questions": [
      {
        "id": "ch6-vent-q1",
        "type": "single",
        "concept": "ch6-vent",
        "topic": "Vent versus erosional remnant",
        "prompt": "A flat-topped hill has a basalt cap but lies far from the mapped eruptive fissure. What best explains why it need not be a volcano?",
        "choices": [
          "Basalt cannot be volcanic",
          "Erosion can leave a remnant of a lava flow away from its vent",
          "Every lava flow must retain a crater",
          "Only underwater vents count"
        ],
        "answer": 1,
        "explanation": "The mesa can be an erosional remnant of a lava sheet. A volcanic rock and a volcano built at a vent are different observations.",
        "hint": "Separate where lava erupted from where it later cooled.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 2–3; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-vent-q2",
        "type": "single",
        "concept": "ch6-vent",
        "topic": "Vent versus erosional remnant",
        "prompt": "Lava emerges along a long crack without building a conical mountain. How should it be classified?",
        "choices": [
          "Not volcanic because no cone exists",
          "Sedimentary deposition",
          "A volcanic fissure eruption",
          "A glacier"
        ],
        "answer": 2,
        "explanation": "A volcano need not have a classic cone. Magma reaching the surface through a fissure is volcanic activity.",
        "hint": "Separate where lava erupted from where it later cooled.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 2–3; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-types-q1",
        "type": "single",
        "concept": "ch6-types",
        "topic": "Compare the four volcano forms",
        "prompt": "Which description best identifies a shield volcano?",
        "choices": [
          "A broad edifice built mainly by repeated basalt flows",
          "A small pile made only of loose scoria",
          "An erosional mesa with no vent",
          "A steep mound of highly viscous lava only"
        ],
        "answer": 0,
        "explanation": "Low-viscosity basalt spreads outward. Repeated flows build a broad shield with gentle slopes.",
        "hint": "Connect shape to the material and how far it travels.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-types-q2",
        "type": "single",
        "concept": "ch6-types",
        "topic": "Compare the four volcano forms",
        "prompt": "A small cone is mostly loose vesicular fragments ejected around a vent. Which type fits best?",
        "choices": [
          "Caldera",
          "Shield volcano",
          "Volcanic dome",
          "Scoria cone"
        ],
        "answer": 3,
        "explanation": "Scoria cones grow as ejected fragments fall near a vent. They are not simply miniature domes of intact viscous lava.",
        "hint": "Connect shape to the material and how far it travels.",
        "source": "Exploring Geology 6.1, supplied PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-gas-q1",
        "type": "single",
        "concept": "ch6-gas",
        "topic": "Pressure, viscosity, and gas escape",
        "prompt": "What most directly allows dissolved gas to form bubbles as magma rises?",
        "choices": [
          "Increasing confining pressure",
          "A decrease in confining pressure",
          "Conversion of gas to feldspar",
          "Loss of all heat instantly"
        ],
        "answer": 1,
        "explanation": "Pressure decreases toward the surface, allowing dissolved gases to come out of solution and expand.",
        "hint": "Think of both dissolved gas and the ability of bubbles to move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 6–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-gas-q2",
        "type": "single",
        "concept": "ch6-gas",
        "topic": "Pressure, viscosity, and gas escape",
        "prompt": "Two magmas have comparable gas contents. Why can the more viscous one have greater explosive potential?",
        "choices": [
          "It always contains no silica",
          "Its bubbles are necessarily colder",
          "It prevents gravity",
          "It can retain gas rather than allowing easy escape"
        ],
        "answer": 3,
        "explanation": "High viscosity resists bubble movement and gas escape. Trapped gas can build pressure; composition alone is not the only variable.",
        "hint": "Think of both dissolved gas and the ability of bubbles to move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 6–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-products-q1",
        "type": "single",
        "concept": "ch6-products",
        "topic": "Distinguish volcanic products and transport",
        "prompt": "A dense, hot cloud of ash and gas races downslope after an eruption column collapses. What is it?",
        "choices": [
          "A pyroclastic flow",
          "A lava tube",
          "A lahar made primarily of water and mud",
          "A slowly advancing intact lava flow"
        ],
        "answer": 0,
        "explanation": "A collapsed hot ash-and-gas mixture is a pyroclastic flow. A lahar requires water mixed with volcanic debris.",
        "hint": "Identify what carries the fragments and where they move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-products-q2",
        "type": "single",
        "concept": "ch6-products",
        "topic": "Distinguish volcanic products and transport",
        "prompt": "Fine volcanic particles blanket a town far downwind. Which transport route best explains this?",
        "choices": [
          "Only a lava flow could reach it",
          "Mineral cleavage moved the particles",
          "Ash rose in an eruption column and was carried by wind",
          "The entire magma chamber slid there"
        ],
        "answer": 2,
        "explanation": "Fine tephra can be carried far downwind in the atmosphere and deposited as ash fall, unlike valley-confined ground flows.",
        "hint": "Identify what carries the fragments and where they move.",
        "source": "Exploring Geology 6.2, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-scoria-q1",
        "type": "single",
        "concept": "ch6-scoria",
        "topic": "One vent, changing gas content",
        "prompt": "A basaltic vent first builds a cone of cinders, then releases a quieter lava flow. Which change best explains the transition?",
        "choices": [
          "The lava must become pure quartz",
          "The plate boundary must reverse direction",
          "Later magma contains less gas available to drive fountains",
          "All rock has become sedimentary"
        ],
        "answer": 2,
        "explanation": "Early gas-rich magma can fragment in fountains. Later magma with less gas can erupt as a comparatively nonexplosive flow.",
        "hint": "An eruption can change while composition stays basaltic.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 2–3, 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-scoria-q2",
        "type": "single",
        "concept": "ch6-scoria",
        "topic": "One vent, changing gas content",
        "prompt": "What do abundant vesicles in a basalt sample record?",
        "choices": [
          "Gas bubbles trapped when the lava solidified",
          "The number of minerals in the rock",
          "Cleavage directions of one crystal",
          "Dissolution by rivers in every case"
        ],
        "answer": 0,
        "explanation": "Vesicles are former bubbles. Their presence records gas behavior during solidification, not mineral cleavage.",
        "hint": "An eruption can change while composition stays basaltic.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 2–3, 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-flow-textures-q1",
        "type": "single",
        "concept": "ch6-flow-textures",
        "topic": "Texture and environment of basalt flows",
        "prompt": "Which pairing correctly matches basaltic flow surface textures?",
        "choices": [
          "Aa is ropy; pahoehoe is jagged",
          "Both terms mean volcanic ash",
          "Pahoehoe means pillow basalt only",
          "Aa is jagged and blocky; pahoehoe is ropy"
        ],
        "answer": 3,
        "explanation": "Aa breaks into rough blocks while pahoehoe develops smoother, folded surfaces. Both describe lava-flow features.",
        "hint": "Separate surface shape, heat retention, and eruption environment.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 4; also 6.4 PDF p. 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-flow-textures-q2",
        "type": "single",
        "concept": "ch6-flow-textures",
        "topic": "Texture and environment of basalt flows",
        "prompt": "Why can a lava flow continue traveling beneath a solid roof?",
        "choices": [
          "The roof adds water until the lava becomes a river",
          "The roof insulates the hot moving interior",
          "The whole flow is already solid",
          "The roof removes gravity"
        ],
        "answer": 1,
        "explanation": "A lava tube limits heat loss, allowing its molten interior to remain hot and mobile longer than an exposed flow.",
        "hint": "Separate surface shape, heat retention, and eruption environment.",
        "source": "Exploring Geology 6.3, supplied PDF pp. 4; also 6.4 PDF p. 5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-shields-q1",
        "type": "single",
        "concept": "ch6-shields",
        "topic": "Composition to shield geometry",
        "prompt": "Why do repeated basalt flows commonly build gentle shield slopes?",
        "choices": [
          "Lava spreads far enough to distribute material broadly",
          "All lava is deposited vertically at the vent",
          "Shields are made only of windblown ash",
          "High viscosity keeps every flow at the summit"
        ],
        "answer": 0,
        "explanation": "Fluid basalt spreads rather than piling exclusively beside the vent. Repetition builds broad, gentle slopes.",
        "hint": "Use the Chapter 5 viscosity connection.",
        "source": "Exploring Geology 6.4, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-shields-q2",
        "type": "single",
        "concept": "ch6-shields",
        "topic": "Composition to shield geometry",
        "prompt": "Rounded pillow-shaped basalt is exposed on a volcanic island. What is the strongest inference?",
        "choices": [
          "The island must be a composite volcano",
          "The basalt erupted into water",
          "The basalt formed from sandstone",
          "The lava never reached the surface"
        ],
        "answer": 1,
        "explanation": "Pillow forms develop as lava advances into water. They are evidence of an aquatic eruption environment.",
        "hint": "Use the Chapter 5 viscosity connection.",
        "source": "Exploring Geology 6.4, supplied PDF pp. 2–5; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-floods-q1",
        "type": "single",
        "concept": "ch6-floods",
        "topic": "Flood basalt supply and effects",
        "prompt": "A plateau exposes stacked basalt sheets fed by many long dikes. Which eruptive pattern fits?",
        "choices": [
          "One dome of high-viscosity rhyolite",
          "Only a single small scoria cone",
          "A limestone reef",
          "Repeated large fissure-fed flood-basalt eruptions"
        ],
        "answer": 3,
        "explanation": "Long feeder fissures and extensive basalt sheets characterize flood-basalt systems rather than a single central dome.",
        "hint": "Look for a regional sheet, not only a central cone.",
        "source": "Exploring Geology 6.5, supplied PDF pp. 2, 4–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-floods-q2",
        "type": "single",
        "concept": "ch6-floods",
        "topic": "Flood basalt supply and effects",
        "prompt": "Why is “volcanism always causes cooling” too simple?",
        "choices": [
          "Volcanoes release no gases",
          "All gases have identical effects",
          "Sulfur aerosols can cool while released carbon dioxide can contribute warming",
          "Only the color of lava controls climate"
        ],
        "answer": 2,
        "explanation": "The source distinguishes opposing atmospheric effects. Their importance depends on gas amounts, persistence, and other conditions.",
        "hint": "Look for a regional sheet, not only a central cone.",
        "source": "Exploring Geology 6.5, supplied PDF pp. 2, 4–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-composite-q1",
        "type": "single",
        "concept": "ch6-composite",
        "topic": "Layered history and collapse",
        "prompt": "Why is the term composite appropriate for a stratovolcano?",
        "choices": [
          "Its layers record lava, pyroclastic activity, and debris or mudflows",
          "It is entirely one giant mineral",
          "It forms in only one brief fountain",
          "It has no intrusive structures"
        ],
        "answer": 0,
        "explanation": "Composite volcanoes combine deposits from multiple eruption styles and surface processes over repeated episodes.",
        "hint": "Combine the internal deposits with the process that formed each.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 2–8; also 6.8 PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-composite-q2",
        "type": "single",
        "concept": "ch6-composite",
        "topic": "Layered history and collapse",
        "prompt": "In the 1980 Mount St. Helens sequence, why did removal of the north-flank bulge matter?",
        "choices": [
          "It increased confinement on the magma",
          "It converted all magma into water",
          "It decreased pressure on magma and helped trigger a lateral blast",
          "It prevented gas expansion"
        ],
        "answer": 2,
        "explanation": "The landslide unloaded the volcano, reducing confining pressure and permitting explosive release.",
        "hint": "Combine the internal deposits with the process that formed each.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 2–8; also 6.8 PDF pp. 4–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-lahar-q1",
        "type": "single",
        "concept": "ch6-lahar",
        "topic": "Water-rich lahar versus pyroclastic flow",
        "prompt": "Heavy rain remobilizes loose volcanic ash into a muddy flow down a river valley. What is it?",
        "choices": [
          "An eruption column",
          "A lahar",
          "A lava fountain",
          "A mantle plume"
        ],
        "answer": 1,
        "explanation": "Water mixed with volcanic sediment creates a lahar. It need not be a new lava eruption.",
        "hint": "Identify the fluid carrying the material.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 3–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-lahar-q2",
        "type": "single",
        "concept": "ch6-lahar",
        "topic": "Water-rich lahar versus pyroclastic flow",
        "prompt": "An ash-rich deposit was emplaced hot and compacted into welded tuff. Which source process is most consistent?",
        "choices": [
          "Cold river transport of only rounded gravel",
          "Slow growth of one crystal",
          "Deposition of carbonate mud",
          "A pyroclastic flow"
        ],
        "answer": 3,
        "explanation": "Hot pyroclastic material may compact and weld. A lahar is a water-rich sediment flow and is not the same process.",
        "hint": "Identify the fluid carrying the material.",
        "source": "Exploring Geology 6.7, supplied PDF pp. 3–7; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-dome-q1",
        "type": "single",
        "concept": "ch6-dome",
        "topic": "Dome growth and failure",
        "prompt": "New magma enters the interior of a dome and fractures its solid outer shell. What is happening?",
        "choices": [
          "Caldera roof collapse only",
          "Erosion of a nonvolcanic mesa",
          "Internal growth and inflation of a viscous lava dome",
          "Formation of pillows under water"
        ],
        "answer": 2,
        "explanation": "Injection inside the dome expands it and fractures the outer crust. Domes can also grow by lava breaking out externally.",
        "hint": "Growth and destruction are different parts of the dome cycle.",
        "source": "Exploring Geology 6.9, supplied PDF pp. 1–3, 5–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-dome-q2",
        "type": "single",
        "concept": "ch6-dome",
        "topic": "Dome growth and failure",
        "prompt": "Why can a slowly growing dome still produce a fast-moving hazard?",
        "choices": [
          "Its unstable flank can collapse into a pyroclastic flow of hot blocks and ash",
          "Slow growth guarantees no hazard",
          "Only basalt can move downslope",
          "Dome material cannot fragment"
        ],
        "answer": 0,
        "explanation": "Slow extrusion does not guarantee stability. Collapse releases material downslope and can form a dangerous pyroclastic flow.",
        "hint": "Growth and destruction are different parts of the dome cycle.",
        "source": "Exploring Geology 6.9, supplied PDF pp. 1–3, 5–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-caldera-q1",
        "type": "single",
        "concept": "ch6-caldera",
        "topic": "Withdrawal causes roof subsidence",
        "prompt": "Which causal sequence best describes caldera formation?",
        "choices": [
          "Rain fills a crater, then manufactures magma",
          "Magma withdrawal during eruption → roof subsidence along faults",
          "A glacier freezes the magma chamber into a hill",
          "A mountain simply dissolves without volcanism"
        ],
        "answer": 1,
        "explanation": "As magma is withdrawn, the overlying roof subsides along fractures. The eruption and subsidence can occur simultaneously.",
        "hint": "Track what leaves the chamber and what drops into the vacated space.",
        "source": "Exploring Geology 6.10, supplied PDF pp. 2–6; also 6.11 PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-caldera-q2",
        "type": "single",
        "concept": "ch6-caldera",
        "topic": "Withdrawal causes roof subsidence",
        "prompt": "A small volcanic dome sits inside a broad caldera. Which interpretation is reasonable?",
        "choices": [
          "Calderas cannot contain later volcanic activity",
          "The dome proves the depression is nonvolcanic",
          "Every caldera is made only by wind erosion",
          "Residual magma erupted after the main collapse"
        ],
        "answer": 3,
        "explanation": "Later magma can reach the surface within or around a caldera and construct domes or other volcanic features.",
        "hint": "Track what leaves the chamber and what drops into the vacated space.",
        "source": "Exploring Geology 6.10, supplied PDF pp. 2–6; also 6.11 PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-hazard-risk-q1",
        "type": "single",
        "concept": "ch6-hazard-risk",
        "topic": "Process versus societal consequences",
        "prompt": "Which change most directly raises societal risk without changing the lava-flow hazard itself?",
        "choices": [
          "The lava is given a new name",
          "The flow is photographed",
          "A geologist changes the map color",
          "More homes are built in the expected flow path"
        ],
        "answer": 3,
        "explanation": "Increasing exposed people and structures raises potential loss even if the physical hazard is unchanged.",
        "hint": "Ask whether the statement describes the event or its consequences for people.",
        "source": "Exploring Geology 6.6, supplied PDF pp. 2–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-hazard-risk-q2",
        "type": "single",
        "concept": "ch6-hazard-risk",
        "topic": "Process versus societal consequences",
        "prompt": "How can a basaltic eruption beneath a glacier produce a flood?",
        "choices": [
          "Heat melts ice and releases water that can carry debris",
          "All basalt is liquid water",
          "The eruption eliminates gravity",
          "Only felsic magma can melt ice"
        ],
        "answer": 0,
        "explanation": "Eruptive heat can rapidly melt ice. Released meltwater may transport sediment, rock, and ice blocks.",
        "hint": "Ask whether the statement describes the event or its consequences for people.",
        "source": "Exploring Geology 6.6, supplied PDF pp. 2–6; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-pathways-q1",
        "type": "single",
        "concept": "ch6-pathways",
        "topic": "Valleys, winds, and distance",
        "prompt": "Two settlements lie equally far from a volcano. One is in a drainage valley, the other on an adjacent ridge. For a valley-confined lahar, which is generally more exposed?",
        "choices": [
          "The ridge solely because it is higher",
          "Both must have identical exposure",
          "The settlement in the drainage valley",
          "Neither because distance is equal"
        ],
        "answer": 2,
        "explanation": "Lahars follow drainage paths. Equal distance does not imply equal exposure to a channeled flow.",
        "hint": "Rank each site for the particular hazard, not by distance alone.",
        "source": "Exploring Geology 6.12, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-pathways-q2",
        "type": "single",
        "concept": "ch6-pathways",
        "topic": "Valleys, winds, and distance",
        "prompt": "An eruption column rises above a volcano while wind blows east. Where is the greater directional ash-fall concern, all else equal?",
        "choices": [
          "Only directly uphill",
          "East, downwind of the column",
          "Only west because ash moves against wind",
          "Only inside river channels"
        ],
        "answer": 1,
        "explanation": "Airborne ash is carried downwind. This differs from the topographic control on ground-hugging flows.",
        "hint": "Rank each site for the particular hazard, not by distance alone.",
        "source": "Exploring Geology 6.12, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-monitor-tools-q1",
        "type": "single",
        "concept": "ch6-monitor-tools",
        "topic": "Match observations to instruments",
        "prompt": "A station detects a small change in the volcano’s surface slope. Which instrument most directly measures it?",
        "choices": [
          "A mineral streak plate",
          "A tiltmeter",
          "A balance measuring lava mass",
          "A compass alone"
        ],
        "answer": 1,
        "explanation": "Tiltmeters detect changes in ground tilt, one expression of deformation. Seismometers instead record shaking.",
        "hint": "First name what is being measured.",
        "source": "Exploring Geology 6.13, supplied PDF pp. 2–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-monitor-tools-q2",
        "type": "single",
        "concept": "ch6-monitor-tools",
        "topic": "Match observations to instruments",
        "prompt": "Earthquake activity, ground inflation, and sulfur dioxide output all increase. What is the strongest scientific response?",
        "choices": [
          "Declare the exact eruption minute from one reading",
          "Ignore all but the gas data",
          "Conclude that every volcano follows a fixed clock",
          "Integrate the signals to assess unrest and possible eruption"
        ],
        "answer": 3,
        "explanation": "Multiple independent changes support a more useful interpretation than one measurement. Monitoring improves assessment without guaranteeing exact timing.",
        "hint": "First name what is being measured.",
        "source": "Exploring Geology 6.13, supplied PDF pp. 2–8; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-rainier-q1",
        "type": "single",
        "concept": "ch6-rainier",
        "topic": "Plate setting to valley risk",
        "prompt": "Which tectonic relationship underlies Mount Rainier and the Cascades?",
        "choices": [
          "Juan de Fuca lithosphere subducts beneath North America",
          "North America splits at Rainier into two ocean ridges",
          "A transform boundary alone creates all Cascade magma",
          "Rainier is unrelated to a plate boundary"
        ],
        "answer": 0,
        "explanation": "The Cascades overlie the Cascadia ocean-continent subduction zone. The Juan de Fuca plate descends beneath North America.",
        "hint": "Link tectonic cause, volcano properties, and the path to people.",
        "source": "Exploring Geology 6.14, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      },
      {
        "id": "ch6-rainier-q2",
        "type": "single",
        "concept": "ch6-rainier",
        "topic": "Plate setting to valley risk",
        "prompt": "Why can a town well down a Rainier river valley still face volcanic risk without a new lava flow reaching it?",
        "choices": [
          "All hazards stop at the summit",
          "Only wind matters for water-rich flows",
          "Lahars can travel along drainage paths, including flows triggered by slope failure",
          "A river guarantees protection"
        ],
        "answer": 2,
        "explanation": "Water and volcanic debris can move far along valleys. Rainier lahars can be associated with eruptions or with noneruptive slope failures.",
        "hint": "Link tectonic cause, volcano properties, and the path to people.",
        "source": "Exploring Geology 6.14, supplied PDF pp. 2–4; textbook-grounded, classroom emphasis unconfirmed",
        "provenance": "original",
        "evidenceStatus": "verified"
      }
    ],
    "examId": "exam-one",
    "lane": "Exam 1",
    "status": "Ready",
    "description": "Original textbook-grounded practice. Same item roots as topic Labs; use topic Labs for confidence-based mastery. Lecture emphasis unconfirmed."
  }
];
const visuals={
  "ch6-recognition": {
    "id": "ch6-recognition-visuals",
    "label": "Textbook visual field guide",
    "intro": "Use the same observe → explain → retrieve routine as the earlier chapters. Click to enlarge; check the source and what-to-notice cue.",
    "visuals": [
      {
        "id": "ch6-visual-1",
        "module": "ch6-recognition",
        "title": "A volcanic rock is not always a volcano",
        "notice": "A mesa can preserve lava far from its original vent. Separate the source of eruption from the eroded remnant.",
        "caption": "A mesa can preserve lava far from its original vent. Separate the source of eruption from the eroded remnant.",
        "alt": "Textbook figure: A volcanic rock is not always a volcano. A mesa can preserve lava far from its original vent. Separate the source of eruption from the eroded remnant.",
        "conceptIds": [
          "ch6-vent"
        ],
        "src": "assets/visuals/ch6/figure-01.png",
        "source": "Exploring Geology 6.1, supplied PDF page 3; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-1",
        "page": 3,
        "imageIndex": 3,
        "assetSHA256": "2b32bd132ca48a6a86df21cdbfc3c9c52341283766a9ce011572c4bb31523a5a"
      },
      {
        "id": "ch6-visual-2",
        "module": "ch6-recognition",
        "title": "Compare volcano shapes",
        "notice": "Compare broad shields, steep composite cones, small scoria cones, and domes. The source comparison is not to a single true scale.",
        "caption": "Compare broad shields, steep composite cones, small scoria cones, and domes. The source comparison is not to a single true scale.",
        "alt": "Textbook figure: Compare volcano shapes. Compare broad shields, steep composite cones, small scoria cones, and domes. The source comparison is not to a single true scale.",
        "conceptIds": [
          "ch6-types"
        ],
        "src": "assets/visuals/ch6/figure-02.png",
        "source": "Exploring Geology 6.1, supplied PDF page 6; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-1",
        "page": 6,
        "imageIndex": 4,
        "assetSHA256": "4b2dd6f434934e2415ddc2a23e45c49346d7ecfcca38020d09e0e2551469d43e"
      }
    ]
  },
  "ch6-eruption": {
    "id": "ch6-eruption-visuals",
    "label": "Textbook visual field guide",
    "intro": "Use the same observe → explain → retrieve routine as the earlier chapters. Click to enlarge; check the source and what-to-notice cue.",
    "visuals": [
      {
        "id": "ch6-visual-3",
        "module": "ch6-eruption",
        "title": "Pressure release and gas bubbles",
        "notice": "Follow rising magma: lower confining pressure allows dissolved gas to form expanding bubbles.",
        "caption": "Follow rising magma: lower confining pressure allows dissolved gas to form expanding bubbles.",
        "alt": "Textbook figure: Pressure release and gas bubbles. Follow rising magma: lower confining pressure allows dissolved gas to form expanding bubbles.",
        "conceptIds": [
          "ch6-gas"
        ],
        "src": "assets/visuals/ch6/figure-03.png",
        "source": "Exploring Geology 6.2, supplied PDF page 6; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-2",
        "page": 6,
        "imageIndex": 2,
        "assetSHA256": "bd2771fc4705eefe5a42a7f91a19eebaefbfb79627bb0ef4c37535b959cc7cc8"
      },
      {
        "id": "ch6-visual-4",
        "module": "ch6-eruption",
        "title": "Column collapse and pyroclastic flow",
        "notice": "An unsupported eruption column can collapse into a dense, hot flow moving down the slope.",
        "caption": "An unsupported eruption column can collapse into a dense, hot flow moving down the slope.",
        "alt": "Textbook figure: Column collapse and pyroclastic flow. An unsupported eruption column can collapse into a dense, hot flow moving down the slope.",
        "conceptIds": [
          "ch6-products"
        ],
        "src": "assets/visuals/ch6/figure-04.png",
        "source": "Exploring Geology 6.2, supplied PDF page 5; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-2",
        "page": 5,
        "imageIndex": 1,
        "assetSHA256": "477b00b937831f6677b254bb01f8ab7d10513bb3786436fdb3c0140b05073f00"
      }
    ]
  },
  "ch6-basalt": {
    "id": "ch6-basalt-visuals",
    "label": "Textbook visual field guide",
    "intro": "Use the same observe → explain → retrieve routine as the earlier chapters. Click to enlarge; check the source and what-to-notice cue.",
    "visuals": [
      {
        "id": "ch6-visual-5",
        "module": "ch6-basalt",
        "title": "Basaltic flow features",
        "notice": "Compare the insulating lava tube, rough aa, and ropy pahoehoe examples in the full-page source view.",
        "caption": "Compare the insulating lava tube, rough aa, and ropy pahoehoe examples in the full-page source view.",
        "alt": "Textbook figure: Basaltic flow features. Compare the insulating lava tube, rough aa, and ropy pahoehoe examples in the full-page source view.",
        "conceptIds": [
          "ch6-flow-textures"
        ],
        "src": "assets/visuals/ch6/figure-05.png",
        "source": "Exploring Geology 6.3, supplied PDF page 4; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-3",
        "page": 4,
        "imageIndex": "full page",
        "assetSHA256": "c69d0836cdeaed7e08d290ffdb2d6d543402a16534d1eb5d83301946fe5f9012"
      },
      {
        "id": "ch6-visual-6",
        "module": "ch6-basalt",
        "title": "Scoria cone to lava flow",
        "notice": "Early gas-rich magma can build a cone; later less-gassy magma may flow from its base.",
        "caption": "Early gas-rich magma can build a cone; later less-gassy magma may flow from its base.",
        "alt": "Textbook figure: Scoria cone to lava flow. Early gas-rich magma can build a cone; later less-gassy magma may flow from its base.",
        "conceptIds": [
          "ch6-scoria"
        ],
        "src": "assets/visuals/ch6/figure-06.png",
        "source": "Exploring Geology 6.3, supplied PDF page 5; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-3",
        "page": 5,
        "imageIndex": 1,
        "assetSHA256": "fda1ffd307066bdf83e64b1310e1e6ade7d71d4dd18eefb102c667aa36452d24"
      }
    ]
  },
  "ch6-shields-floods": {
    "id": "ch6-shields-floods-visuals",
    "label": "Textbook visual field guide",
    "intro": "Use the same observe → explain → retrieve routine as the earlier chapters. Click to enlarge; check the source and what-to-notice cue.",
    "visuals": [
      {
        "id": "ch6-visual-7",
        "module": "ch6-shields-floods",
        "title": "Fluid lava and shield slopes",
        "notice": "Low-viscosity basalt can travel and spread, building broad, gentle slopes over repeated eruptions.",
        "caption": "Low-viscosity basalt can travel and spread, building broad, gentle slopes over repeated eruptions.",
        "alt": "Textbook figure: Fluid lava and shield slopes. Low-viscosity basalt can travel and spread, building broad, gentle slopes over repeated eruptions.",
        "conceptIds": [
          "ch6-shields"
        ],
        "src": "assets/visuals/ch6/figure-07.png",
        "source": "Exploring Geology 6.4, supplied PDF page 4; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-4",
        "page": 4,
        "imageIndex": 2,
        "assetSHA256": "9665bb660e71d8e137ec11a9ee099e8dc3ffbd789f20e5950f4d7d787ae3da72"
      },
      {
        "id": "ch6-visual-8",
        "module": "ch6-shields-floods",
        "title": "Flood-basalt fissure eruption",
        "notice": "A long fissure and large supply of fluid basalt allow a widespread lava sheet, not just one central cone.",
        "caption": "A long fissure and large supply of fluid basalt allow a widespread lava sheet, not just one central cone.",
        "alt": "Textbook figure: Flood-basalt fissure eruption. A long fissure and large supply of fluid basalt allow a widespread lava sheet, not just one central cone.",
        "conceptIds": [
          "ch6-floods"
        ],
        "src": "assets/visuals/ch6/figure-08.png",
        "source": "Exploring Geology 6.5, supplied PDF page 4; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-5",
        "page": 4,
        "imageIndex": 1,
        "assetSHA256": "e11a5e3851e41b9b9c9bef96c687ac59acb4e805547b876703c1c628ea6c2c4b"
      },
      {
        "id": "ch6-visual-9",
        "module": "ch6-shields-floods",
        "title": "Mantle plume beneath the lithosphere",
        "notice": "The rising plume is mostly solid; melting is associated with decompression and heating of surrounding rock.",
        "caption": "The rising plume is mostly solid; melting is associated with decompression and heating of surrounding rock.",
        "alt": "Textbook figure: Mantle plume beneath the lithosphere. The rising plume is mostly solid; melting is associated with decompression and heating of surrounding rock.",
        "conceptIds": [
          "ch6-floods"
        ],
        "src": "assets/visuals/ch6/figure-09.png",
        "source": "Exploring Geology 6.5, supplied PDF page 5; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-5",
        "page": 5,
        "imageIndex": 1,
        "assetSHA256": "e035e689dd3c952148a02a07d0e45461a64dfadb5f3e5111e60af87d61380195"
      }
    ]
  },
  "ch6-composites": {
    "id": "ch6-composites-visuals",
    "label": "Textbook visual field guide",
    "intro": "Use the same observe → explain → retrieve routine as the earlier chapters. Click to enlarge; check the source and what-to-notice cue.",
    "visuals": [
      {
        "id": "ch6-visual-10",
        "module": "ch6-composites",
        "title": "Inside a composite volcano",
        "notice": "Interlayered lava, pyroclastic deposits, and mudflow deposits record repeated eruptions and different processes.",
        "caption": "Interlayered lava, pyroclastic deposits, and mudflow deposits record repeated eruptions and different processes.",
        "alt": "Textbook figure: Inside a composite volcano. Interlayered lava, pyroclastic deposits, and mudflow deposits record repeated eruptions and different processes.",
        "conceptIds": [
          "ch6-composite"
        ],
        "src": "assets/visuals/ch6/figure-10.png",
        "source": "Exploring Geology 6.8, supplied PDF page 4; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-8",
        "page": 4,
        "imageIndex": 1,
        "assetSHA256": "ea14d4426fb560f0b139c51efccf28302e1bec0d1e6398225b14bd9e09e3af4f"
      },
      {
        "id": "ch6-visual-11",
        "module": "ch6-composites",
        "title": "Lahars and downstream damage",
        "notice": "The damaged bridge illustrates a water-rich volcanic debris flow. Remote sensors can detect the rumble of a moving lahar.",
        "caption": "The damaged bridge illustrates a water-rich volcanic debris flow. Remote sensors can detect the rumble of a moving lahar.",
        "alt": "Textbook figure: Lahars and downstream damage. The damaged bridge illustrates a water-rich volcanic debris flow. Remote sensors can detect the rumble of a moving lahar.",
        "conceptIds": [
          "ch6-lahar"
        ],
        "src": "assets/visuals/ch6/figure-11.png",
        "source": "Exploring Geology 6.13, supplied PDF page 7; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-13",
        "page": 7,
        "imageIndex": "full page",
        "assetSHA256": "0bc9803a543739df0497b0522340e2531b4b3f963f59e5a8aa2e207e02da9369"
      },
      {
        "id": "ch6-visual-12",
        "module": "ch6-composites",
        "title": "Mount St. Helens: unloading and blast",
        "notice": "A landslide removed pressure from magma, helping trigger the lateral blast and eruption column in 1980.",
        "caption": "A landslide removed pressure from magma, helping trigger the lateral blast and eruption column in 1980.",
        "alt": "Textbook figure: Mount St. Helens: unloading and blast. A landslide removed pressure from magma, helping trigger the lateral blast and eruption column in 1980.",
        "conceptIds": [
          "ch6-composite"
        ],
        "src": "assets/visuals/ch6/figure-12.png",
        "source": "Exploring Geology 6.8, supplied PDF page 6; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-8",
        "page": 6,
        "imageIndex": 1,
        "assetSHA256": "c3b41ac80704fdfb5119d04e8030b676b571b8c12c2290aae0c39989183fc20d"
      }
    ]
  },
  "ch6-domes-calderas": {
    "id": "ch6-domes-calderas-visuals",
    "label": "Textbook visual field guide",
    "intro": "Use the same observe → explain → retrieve routine as the earlier chapters. Click to enlarge; check the source and what-to-notice cue.",
    "visuals": [
      {
        "id": "ch6-visual-13",
        "module": "ch6-domes-calderas",
        "title": "A dome grows",
        "notice": "Viscous lava inflates a dome from within or breaks out as short, thick flows.",
        "caption": "Viscous lava inflates a dome from within or breaks out as short, thick flows.",
        "alt": "Textbook figure: A dome grows. Viscous lava inflates a dome from within or breaks out as short, thick flows.",
        "conceptIds": [
          "ch6-dome"
        ],
        "src": "assets/visuals/ch6/figure-13.png",
        "source": "Exploring Geology 6.9, supplied PDF page 2; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-9",
        "page": 2,
        "imageIndex": 1,
        "assetSHA256": "809a7764c32e501913e7fb0e4e0b269090e7db74d775b39315f2e10ec4559c4c"
      },
      {
        "id": "ch6-visual-14",
        "module": "ch6-domes-calderas",
        "title": "Dome collapse and explosion",
        "notice": "Steep dome material can collapse; trapped gas can also cause an explosion. Both can produce hazardous fragments.",
        "caption": "Steep dome material can collapse; trapped gas can also cause an explosion. Both can produce hazardous fragments.",
        "alt": "Textbook figure: Dome collapse and explosion. Steep dome material can collapse; trapped gas can also cause an explosion. Both can produce hazardous fragments.",
        "conceptIds": [
          "ch6-dome"
        ],
        "src": "assets/visuals/ch6/figure-14.png",
        "source": "Exploring Geology 6.9, supplied PDF page 3; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-9",
        "page": 3,
        "imageIndex": "full page",
        "assetSHA256": "eab81463f4e8631f500e5f091a9e4822b479bbdc9647023288ef991a3ca09975"
      },
      {
        "id": "ch6-visual-15",
        "module": "ch6-domes-calderas",
        "title": "Caldera formation sequence",
        "notice": "Track magma withdrawal and downward roof collapse, then later volcanic activity within the depression.",
        "caption": "Track magma withdrawal and downward roof collapse, then later volcanic activity within the depression.",
        "alt": "Textbook figure: Caldera formation sequence. Track magma withdrawal and downward roof collapse, then later volcanic activity within the depression.",
        "conceptIds": [
          "ch6-caldera"
        ],
        "src": "assets/visuals/ch6/figure-15.png",
        "source": "Exploring Geology 6.10, supplied PDF page 4; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-10",
        "page": 4,
        "imageIndex": "full page",
        "assetSHA256": "fb427e75b89be0e809b92aba10260ddf1d936d19232f2635cb4b214dcc92e6f2"
      },
      {
        "id": "ch6-visual-16",
        "module": "ch6-domes-calderas",
        "title": "Krakatau: collapse and sea waves",
        "notice": "A coastal eruption can couple pyroclastic activity and collapse with destructive waves beyond the island.",
        "caption": "A coastal eruption can couple pyroclastic activity and collapse with destructive waves beyond the island.",
        "alt": "Textbook figure: Krakatau: collapse and sea waves. A coastal eruption can couple pyroclastic activity and collapse with destructive waves beyond the island.",
        "conceptIds": [
          "ch6-caldera"
        ],
        "src": "assets/visuals/ch6/figure-16.png",
        "source": "Exploring Geology 6.11, supplied PDF page 4; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-11",
        "page": 4,
        "imageIndex": "full page",
        "assetSHA256": "ce87e7055db6a187fb3ddf4d7b38a91522495fd3e696a8bd3ba8d3677461071a"
      }
    ]
  },
  "ch6-risk": {
    "id": "ch6-risk-visuals",
    "label": "Textbook visual field guide",
    "intro": "Use the same observe → explain → retrieve routine as the earlier chapters. Click to enlarge; check the source and what-to-notice cue.",
    "visuals": [
      {
        "id": "ch6-visual-17",
        "module": "ch6-risk",
        "title": "Hazard versus exposed community",
        "notice": "The lava is the physical hazard; people, homes, and infrastructure in its path create societal risk.",
        "caption": "The lava is the physical hazard; people, homes, and infrastructure in its path create societal risk.",
        "alt": "Textbook figure: Hazard versus exposed community. The lava is the physical hazard; people, homes, and infrastructure in its path create societal risk.",
        "conceptIds": [
          "ch6-hazard-risk"
        ],
        "src": "assets/visuals/ch6/figure-17.png",
        "source": "Exploring Geology 6.6, supplied PDF page 2; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-6",
        "page": 2,
        "imageIndex": 2,
        "assetSHA256": "ca0c4fcdb4ff6cc25734bc2626ae79eacf222dc93bfe3870276960f5b4c98962"
      },
      {
        "id": "ch6-visual-18",
        "module": "ch6-risk",
        "title": "Read the hazard pathways",
        "notice": "Trace valleys for flows and wind direction for ash. Distance alone does not determine which site is safer.",
        "caption": "Trace valleys for flows and wind direction for ash. Distance alone does not determine which site is safer.",
        "alt": "Textbook figure: Read the hazard pathways. Trace valleys for flows and wind direction for ash. Distance alone does not determine which site is safer.",
        "conceptIds": [
          "ch6-pathways"
        ],
        "src": "assets/visuals/ch6/figure-18.png",
        "source": "Exploring Geology 6.12, supplied PDF page 3; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-12",
        "page": 3,
        "imageIndex": 0,
        "assetSHA256": "f9ca2b4e8a07dc418a2ea3b26ad086b690662b483bc538a9c25fb5279af0f702"
      }
    ]
  },
  "ch6-monitoring": {
    "id": "ch6-monitoring-visuals",
    "label": "Textbook visual field guide",
    "intro": "Use the same observe → explain → retrieve routine as the earlier chapters. Click to enlarge; check the source and what-to-notice cue.",
    "visuals": [
      {
        "id": "ch6-visual-19",
        "module": "ch6-monitoring",
        "title": "Seismic monitoring",
        "notice": "Changes in earthquake activity provide evidence of movement and deformation, not an exact eruption clock.",
        "caption": "Changes in earthquake activity provide evidence of movement and deformation, not an exact eruption clock.",
        "alt": "Textbook figure: Seismic monitoring. Changes in earthquake activity provide evidence of movement and deformation, not an exact eruption clock.",
        "conceptIds": [
          "ch6-monitor-tools"
        ],
        "src": "assets/visuals/ch6/figure-19.png",
        "source": "Exploring Geology 6.13, supplied PDF page 2; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-13",
        "page": 2,
        "imageIndex": "full page",
        "assetSHA256": "eb99eb2fca3509ced32072268cbe23fae19fd02ff3ad67fb563d867f167d9bf9"
      },
      {
        "id": "ch6-visual-20",
        "module": "ch6-monitoring",
        "title": "Measuring ground deformation",
        "notice": "GPS tracks position, tiltmeters track tilt, and repeat radar observations reveal surface deformation.",
        "caption": "GPS tracks position, tiltmeters track tilt, and repeat radar observations reveal surface deformation.",
        "alt": "Textbook figure: Measuring ground deformation. GPS tracks position, tiltmeters track tilt, and repeat radar observations reveal surface deformation.",
        "conceptIds": [
          "ch6-monitor-tools"
        ],
        "src": "assets/visuals/ch6/figure-20.png",
        "source": "Exploring Geology 6.13, supplied PDF page 5; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-13",
        "page": 5,
        "imageIndex": "full page",
        "assetSHA256": "768e388bca9b069fa2f296a97f32dbe6e39b60e115ec0225d9fe9a2ec62c7ac9"
      },
      {
        "id": "ch6-visual-21",
        "module": "ch6-monitoring",
        "title": "Rainier and the Cascadia subduction zone",
        "notice": "Trace oceanic Juan de Fuca lithosphere beneath North America and connect the setting to the Cascade volcanoes.",
        "caption": "Trace oceanic Juan de Fuca lithosphere beneath North America and connect the setting to the Cascade volcanoes.",
        "alt": "Textbook figure: Rainier and the Cascadia subduction zone. Trace oceanic Juan de Fuca lithosphere beneath North America and connect the setting to the Cascade volcanoes.",
        "conceptIds": [
          "ch6-rainier"
        ],
        "src": "assets/visuals/ch6/figure-21.png",
        "source": "Exploring Geology 6.14, supplied PDF page 3; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-14",
        "page": 3,
        "imageIndex": 1,
        "assetSHA256": "644a052619c6131374ffc81a189c9b12a6a572b22a4e599cd1a7e140c5150969"
      },
      {
        "id": "ch6-visual-22",
        "module": "ch6-monitoring",
        "title": "Rainier hazard map",
        "notice": "Read the map legend, then trace the lahar paths down valleys toward developed areas. This is a textbook study map, not a current emergency forecast.",
        "caption": "Read the map legend, then trace the lahar paths down valleys toward developed areas. This is a textbook study map, not a current emergency forecast.",
        "alt": "Textbook figure: Rainier hazard map. Read the map legend, then trace the lahar paths down valleys toward developed areas. This is a textbook study map, not a current emergency forecast.",
        "conceptIds": [
          "ch6-rainier"
        ],
        "src": "assets/visuals/ch6/figure-22.png",
        "source": "Exploring Geology 6.14, supplied PDF page 4; textbook evidence, lecture emphasis unconfirmed",
        "status": "textbook",
        "sourceId": "ch6-source-14",
        "page": 4,
        "imageIndex": 2,
        "assetSHA256": "b7397a00c080b3c16994857267c5ad12c77763368dd72d8345444eb446d3f4ff"
      }
    ]
  }
};
const oldIds=new Set(window.GEOL_MODULES.flatMap(m=>[m.id,...m.concepts.map(c=>c.id),...m.activities.map(a=>a.id)]));
const ids=modules.flatMap(m=>[m.id,...m.concepts.map(c=>c.id),...m.activities.map(a=>a.id)]);
if(new Set(ids).size!==ids.length||ids.some(id=>oldIds.has(id))||quizzes.some(q=>window.GEOL_QUIZZES.some(o=>o.id===q.id))||Object.keys(visuals).some(k=>window.GEOL_VISUALS[k]))throw Error('Chapter 6 collision: refusing to replace existing content');
window.GEOL_MODULES.push(...modules);window.GEOL_QUIZZES.push(...quizzes);Object.assign(window.GEOL_VISUALS,visuals);
})();
