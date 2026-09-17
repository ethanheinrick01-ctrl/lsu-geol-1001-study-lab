(() => {
  "use strict";

  const quizzes = Array.isArray(window.GEOL_QUIZZES) ? window.GEOL_QUIZZES : [];
  const modules = Array.isArray(window.GEOL_MODULES) ? window.GEOL_MODULES : [];
  const visualCatalog = window.GEOL_VISUALS && typeof window.GEOL_VISUALS === "object" ? window.GEOL_VISUALS : {};
  const quizStorageKey = "geol1001-study-lab-progress-v1";
  const guidedStorageKey = "geol1001-guided-progress-v1";
  const gradedTypes = new Set(["single", "multi", "sort", "match", "fillblank", "teachback", "hazard", "label", "isostasy"]);

  const $ = (id) => document.getElementById(id);
  const allViews = [
    $("guide-library-view"),
    $("guide-detail-view"),
    $("lab-library-view"),
    $("lesson-view"),
    $("quiz-view"),
    $("results-view"),
    $("mastery-view"),
    $("exam-placeholder-view")
  ];

  const escapeHTML = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const shuffle = (items) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffleAwayFromOriginal = (items) => {
    const copy = shuffle(items);
    if (copy.length > 1 && copy.every((item, index) => item === items[index])) {
      [copy[0], copy[1]] = [copy[1], copy[0]];
    }
    return copy;
  };

  const safeRead = (key, fallback) => {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const getGuidedProgress = () => {
    const saved = safeRead(guidedStorageKey, {});
    return {
      concepts: saved.concepts && typeof saved.concepts === "object" ? saved.concepts : {},
      modules: saved.modules && typeof saved.modules === "object" ? saved.modules : {}
    };
  };

  let guidedProgress = getGuidedProgress();

  const saveGuidedProgress = () => {
    localStorage.setItem(guidedStorageKey, JSON.stringify(guidedProgress));
  };

  const conceptCatalog = modules.flatMap((module) => module.concepts.map((concept) => ({
    ...concept,
    moduleId: module.id,
    moduleNumber: module.number,
    moduleTitle: module.title
  })));
  const conceptById = new Map(conceptCatalog.map((concept) => [concept.id, concept]));

  const emptyConcept = () => ({
    attempts: 0,
    correct: 0,
    streak: 0,
    lastConfidence: null,
    needsReview: false,
    mastered: false,
    misconception: false
  });

  const getConceptState = (conceptId) => ({
    ...emptyConcept(),
    ...(guidedProgress.concepts[conceptId] || {})
  });

  const examShells = {
    "exam-one": {
      label: "Exam 1",
      coverage: "Chapters 1–6",
      live: true
    },
    "exam-two": {
      label: "Exam 2",
      coverage: "Chapters 7–12",
      title: "Exam 2 study system",
      copy: "Exam 2 gets its own Study Guide and its own Lab. Both remain empty until Chapters 7–12 lecture evidence is supplied and audited.",
      guide: "Verified notes, diagrams, rules, and source receipts for Chapters 7–12 will live here.",
      lab: "Topic Labs and an Exam 2 Boss Drill will be built only from those verified sources."
    },
    final: {
      label: "Final Exam",
      coverage: "Cumulative · Chapters 1–19",
      title: "Cumulative final study system",
      copy: "The Final is not a third isolated bank. It combines the completed Exam 1 and Exam 2 systems, then adds verified Chapters 13–19 material.",
      guide: "The Final Study Guide will merge the prior exam guides with the final-unit guide into one cumulative reference.",
      lab: "The Final Lab will inherit the tested Exam 1 and Exam 2 banks, then balance them with Chapters 13–19.",
      inheritance: "Exam 1 Guide + Exam 2 Guide + Chapters 13–19 → Final Guide. Exam 1 Lab + Exam 2 Lab + Chapters 13–19 → cumulative Final Lab."
    }
  };
  let activeExam = "exam-one";
  let activeMode = "guide";
  let currentGuideModule = null;

  const showOnly = (view) => {
    allViews.forEach((item) => item.classList.toggle("hidden", item !== view));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const markMode = (mode) => {
    document.querySelectorAll(".mode-button, .mastery-button").forEach((button) => {
      const active = button.dataset.mode === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  const openMode = (mode) => {
    activeMode = mode;
    markMode(mode);
    if (activeExam !== "exam-one") {
      renderExamPlaceholder(activeExam);
      return;
    }
    if (mode === "mastery") {
      renderMastery();
      showOnly($("mastery-view"));
      return;
    }
    if (mode === "lab") {
      renderLabLibrary();
      showOnly($("lab-library-view"));
      return;
    }
    renderGuideLibrary();
    showOnly($("guide-library-view"));
  };

  const masteredCount = () => conceptCatalog.filter(({ id }) => getConceptState(id).mastered).length;

  const updateMasteryCounts = () => {
    const mastered = masteredCount();
    $("nav-mastery-count").textContent = `${mastered}/${conceptCatalog.length}`;
    $("lab-mastery-count").textContent = `${mastered}/${conceptCatalog.length}`;
  };

  const renderGuideLibrary = () => {
    const library = $("guide-module-library");
    library.replaceChildren();
    modules.forEach((module) => {
      const lesson = module.activities.find((activity) => activity.type === "lesson");
      const visualData = visualCatalog[module.id];
      const preview = visualData?.atlas?.find((item) => item.category === "metamorphic") || visualData?.visuals?.find((item) => item.src);
      const visualCount = (visualData?.visuals?.length || 0) + (visualData?.atlas?.length || 0);
      const card = document.createElement("article");
      card.className = `guide-card${module.continuation ? " continuation-card" : ""}`;
      card.innerHTML = `
        <div class="guide-card-number" aria-hidden="true">${String(module.number).padStart(2, "0")}</div>
        <div class="guide-card-copy">
          <div class="module-card-topline"><span class="pill">${escapeHTML(module.kicker)}</span>${module.continuation ? '<span class="continuation-tag">Continuation</span>' : ""}</div>
          <h3>${escapeHTML(module.title)}</h3>
          <p>${escapeHTML(module.description)}</p>
          ${preview ? `<div class="guide-card-preview"><img src="${escapeHTML(preview.src)}" alt="${escapeHTML(preview.alt)}"><span><strong>Visual field guide</strong><small>${visualCount} sourced view${visualCount === 1 ? "" : "s"} + interaction</small></span></div>` : ""}
          <ul>${(lesson?.keyPoints || []).slice(0, 3).map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul>
          <div class="guide-card-footer"><span>${module.concepts.length} concept${module.concepts.length === 1 ? "" : "s"} · ${escapeHTML(module.source)}</span><button class="button primary" type="button">Open notes</button></div>
        </div>`;
      card.querySelector("button").addEventListener("click", () => openGuideDetail(module.id));
      library.append(card);
    });
  };

  const uniqueText = (items) => [...new Set(items.filter(Boolean))];

  const visualStatus = (item) => item.status === "continuation"
    ? `<span class="continuation-tag">${item.source?.startsWith("Exploring Geology") ? "Secondary textbook review" : "Deck continuation"} · emphasis unconfirmed</span>`
    : item.status === "textbook" ? '<span class="verified-tag">Verified textbook source</span>'
    : item.status === "verified-deck" ? '<span class="verified-tag">Verified source deck</span>'
    : '<span class="verified-tag">Verified classroom path</span>';

  const visualFeatureHTML = (item, index) => {
    if (!item) return "";
    if (item.missing) {
      return `
        <article class="visual-feature visual-missing" data-feature-index="${index}">
          <div class="missing-map-mark" aria-hidden="true"><span>MAP</span><strong>not present</strong></div>
          <div class="visual-feature-copy">
            <div class="visual-feature-topline">${visualStatus(item)}<span>Evidence boundary</span></div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.caption)}</p>
            <div class="visual-notice"><strong>What is still verified</strong><p>${escapeHTML(item.notice)}</p></div>
            <p class="source-strip"><strong>Source:</strong> ${escapeHTML(item.source)}</p>
          </div>
        </article>`;
    }
    return `
      <article class="visual-feature" data-feature-index="${index}">
        <button class="visual-image-button" type="button" data-visual-zoom aria-label="Enlarge ${escapeHTML(item.title)}">
          <img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}">
          <span>Enlarge visual</span>
        </button>
        <div class="visual-feature-copy">
          <div class="visual-feature-topline">${visualStatus(item)}<span>Visual ${index + 1}</span></div>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.caption)}</p>
          <button class="notice-toggle" type="button" data-notice-toggle aria-expanded="false">Reveal what to notice</button>
          <div class="visual-notice hidden"><strong>What to notice</strong><p>${escapeHTML(item.notice)}</p></div>
          <p class="source-strip"><strong>Source:</strong> ${escapeHTML(item.source)}</p>
        </div>
      </article>`;
  };

  const renderILEACycle = () => {
    const moves = [
      ["Predict", "State an initial expectation before the new evidence is revealed."],
      ["Draw", "Make the proposed relationships, geometry, or process visible."],
      ["Justify", "Defend the prediction with an explicit chain of reasoning."],
      ["Research", "Seek the observation, measurement, or source that can test the reasoning."],
      ["Revise Understanding", "Update the model from the evidence, then let the revision inform the next prediction."]
    ];
    const method = ["Observe", "Describe", "Ask a question", "Form a hypothesis", "Test the hypothesis", "Adjust using new data", "Build a model or interpretation"];
    return `
      <section class="visual-interaction process-workbench" aria-labelledby="ilea-cycle-heading">
        <div class="interaction-heading"><p class="eyebrow dark">The actual thing to learn</p><h3 id="ilea-cycle-heading">Predict → Draw → Justify → Research → Revise Understanding</h3><p>Click a move. The fifth move loops back to the first: revised understanding changes the next prediction.</p></div>
        <div class="process-cycle" role="list" aria-label="Complete ILEA cycle">
          ${moves.map(([label], index) => `<button type="button" class="cycle-step${index === 0 ? " active" : ""}" data-cycle-index="${index}" role="listitem"><span>${index + 1}</span><strong>${escapeHTML(label)}</strong></button>`).join("")}
        </div>
        <div id="cycle-explanation" class="cycle-explanation" aria-live="polite"><strong>${moves[0][0]}</strong><p>${moves[0][1]}</p></div>
        <div class="method-map"><div><span>Evidence first</span><strong>Geologic research method</strong></div><ol>${method.map((step) => `<li>${escapeHTML(step)}</li>`).join("")}</ol></div>
      </section>`;
  };

  const renderObserveInfer = () => `
    <section class="visual-interaction evidence-workbench" aria-labelledby="observe-infer-heading">
      <div class="interaction-heading"><p class="eyebrow dark">Look → describe → infer</p><h3 id="observe-infer-heading">Do not let the label replace the looking</h3><p>Use the cliff photograph. Change lenses to expose the boundary between visible evidence and a testable story.</p></div>
      <div class="lens-controls" role="group" aria-label="Evidence lens">
        <button class="active" type="button" data-evidence-mode="look">1 · Look</button>
        <button type="button" data-evidence-mode="describe">2 · Describe</button>
        <button type="button" data-evidence-mode="infer">3 · Infer</button>
      </div>
      <div class="evidence-lens">
        <img src="assets/course-figure.svg" alt="Layered cliff for observation and inference practice">
        <div id="evidence-lens-copy"><strong>Look without naming a cause.</strong><p>Scan color, layer thickness, contacts, fractures, ledges, slope, and detached blocks.</p></div>
      </div>
    </section>`;

  const renderHazardScan = () => {
    const features = [
      ["Volcano", "Lava, ash, gases, and debris flows can reach beyond the cone; distance and topography matter."],
      ["Steep slope", "Gravity can move rock and sediment downslope, especially where material is fractured or saturated."],
      ["Fault", "Surface rupture and shaking threaten structures; mapped proximity changes exposure."],
      ["Stream", "Water and nutrients are resources, but the adjacent floodplain is episodically occupied by water."],
      ["Soil", "Soil supports food and construction decisions, but thickness, drainage, and stability vary with parent material and setting."]
    ];
    return `
      <section class="visual-interaction hazard-workbench" aria-labelledby="hazard-scan-heading">
        <div class="interaction-heading"><p class="eyebrow dark">Landscape scan</p><h3 id="hazard-scan-heading">One scene, multiple consequences</h3><p>Select a feature to trace it from geologic condition to human exposure.</p></div>
        <div class="hazard-scan-grid"><div class="hazard-chip-bank">${features.map(([name], index) => `<button type="button" class="${index === 0 ? "active" : ""}" data-hazard-index="${index}">${escapeHTML(name)}</button>`).join("")}</div><div id="hazard-scan-copy"><strong>${features[0][0]}</strong><p>${features[0][1]}</p></div></div>
      </section>`;
  };

  const renderEvidenceLens = () => `
    <section class="visual-interaction evidence-chain" aria-labelledby="evidence-chain-heading">
      <div class="interaction-heading"><p class="eyebrow dark">Ancient environment reasoning</p><h3 id="evidence-chain-heading">Trace → constraint → reconstruction</h3><p>A deep interpretation needs a chain, not a leap.</p></div>
      <div class="evidence-chain-steps">
        <div><span>01</span><strong>Observe the trace</strong><p>Strata, fossils, tracks, glacial deposits, shelf geometry.</p></div>
        <div><span>02</span><strong>Constrain the process</strong><p>Ask what conditions can produce and preserve that trace.</p></div>
        <div><span>03</span><strong>Build the reconstruction</strong><p>Combine independent clues while keeping uncertainty visible.</p></div>
      </div>
    </section>`;

  const renderLayerToggle = () => {
    const systems = [
      ["Composition", "Crust → Mantle → Core", "Classified by chemistry and material identity. Continental and oceanic crust are both crust; the core is chiefly iron-nickel."],
      ["Mechanical behavior", "Lithosphere → Asthenosphere", "Classified by strength and deformation. Lithosphere is rigid crust plus rigid uppermost mantle; asthenosphere is weaker and ductile."],
      ["The trap", "Crust ≠ Lithosphere", "The terms overlap spatially but answer different questions. A compositional boundary does not have to match a mechanical boundary."]
    ];
    return `
      <section class="visual-interaction layer-workbench" aria-labelledby="layer-toggle-heading">
        <div class="interaction-heading"><p class="eyebrow dark">Switch the question</p><h3 id="layer-toggle-heading">How are you dividing Earth?</h3><p>The correct layer names depend on whether the rule is composition or mechanical behavior.</p></div>
        <div class="layer-switch" role="tablist" aria-label="Earth classification system">${systems.map(([label], index) => `<button type="button" role="tab" aria-selected="${index === 0}" class="${index === 0 ? "active" : ""}" data-layer-index="${index}">${escapeHTML(label)}</button>`).join("")}</div>
        <div id="layer-switch-copy" class="layer-switch-copy"><strong>${systems[0][1]}</strong><p>${systems[0][2]}</p></div>
      </section>`;
  };

  const renderIsostasyCompare = () => {
    const cases = [
      ["Thicker, same density", "Rides higher and extends deeper", "Thickness increases both the exposed top and the submerged root."],
      ["Denser, same thickness", "Rides lower", "Greater density requires more displacement of the supporting material."],
      ["Thin + dense", "Lowest of these comparisons", "Both variables push the block toward a lower equilibrium position."]
    ];
    return `
      <section class="visual-interaction isostasy-compare" aria-labelledby="isostasy-compare-heading">
        <div class="interaction-heading"><p class="eyebrow dark">Control the variable</p><h3 id="isostasy-compare-heading">Which change moves the surface?</h3><p>Select a comparison. The rule only works when you state what remains constant.</p></div>
        <div class="compare-buttons">${cases.map(([label], index) => `<button type="button" class="${index === 0 ? "active" : ""}" data-isostasy-index="${index}">${escapeHTML(label)}</button>`).join("")}</div>
        <div id="isostasy-compare-copy" class="compare-copy"><strong>${cases[0][1]}</strong><p>${cases[0][2]}</p></div>
      </section>`;
  };

  const renderEnergyPathways = () => {
    const paths = [
      ["Internal heat", "Interior heat → mantle motion/melting → tectonism and magmatism", "Volcanism, intrusion, deformation, uplift"],
      ["Solar energy", "Uneven solar heating → atmosphere and water cycle → weathering, runoff, transport", "Climate, wind, streams, erosion, deposition"],
      ["Gravity", "Potential energy → downslope motion", "Rockfall, landslide, river flow, sediment transport"]
    ];
    return `
      <section class="visual-interaction energy-workbench" aria-labelledby="energy-heading">
        <div class="interaction-heading"><p class="eyebrow dark">Source → pathway → result</p><h3 id="energy-heading">Follow the energy</h3><p>Classify by the ultimate driver, then trace how its effect reaches the landscape.</p></div>
        <div class="energy-tabs">${paths.map(([label], index) => `<button type="button" class="${index === 0 ? "active" : ""}" data-energy-index="${index}">${escapeHTML(label)}</button>`).join("")}</div>
        <div id="energy-path-copy" class="energy-path-copy"><strong>${paths[0][1]}</strong><p>Visible results: ${paths[0][2]}</p></div>
      </section>`;
  };

  const renderRockAtlas = (data) => {
    const categories = ["all", ...new Set(data.atlas.map((item) => item.category))];
    return `
      <section class="visual-interaction rock-workbench" aria-labelledby="rock-atlas-heading">
        <div class="interaction-heading"><p class="eyebrow dark">Recognition atlas</p><h3 id="rock-atlas-heading">See the clue. Name the process.</h3><p>These are the actual photographs supplied in Lecture 1. Filter by process family, then reveal the formation connection on each image.</p></div>
        <div class="atlas-filters" role="group" aria-label="Filter visual atlas">${categories.map((category, index) => `<button type="button" class="${index === 0 ? "active" : ""}" data-atlas-filter="${escapeHTML(category)}">${escapeHTML(category)}</button>`).join("")}</div>
        <div class="rock-atlas">${data.atlas.map((item, index) => `
          <article class="rock-card" data-atlas-category="${escapeHTML(item.category)}">
            <button type="button" class="rock-image-button" data-atlas-zoom="${index}" aria-label="Enlarge ${escapeHTML(item.title)}"><img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}"><span>${escapeHTML(item.category)}</span></button>
            <div class="rock-card-copy"><div>${item.status === "continuation" ? '<span class="continuation-tag">Continuation</span>' : '<span class="verified-tag">Classroom path</span>'}<h4>${escapeHTML(item.title)}</h4></div><p><strong>Visible cues:</strong> ${escapeHTML(item.cues)}</p><button type="button" data-atlas-reveal aria-expanded="false">Reveal process connection</button><div class="atlas-process hidden"><strong>Formation connection</strong><p>${escapeHTML(item.process)}</p></div><small>${escapeHTML(item.source)}</small></div>
          </article>`).join("")}</div>
        <aside class="evidence-boundary"><strong>Evidence boundary</strong><p>${escapeHTML(data.boundary)}</p></aside>
      </section>`;
  };

  const renderGuideInteraction = (data) => ({
    "ilea-cycle": renderILEACycle,
    "observe-infer": renderObserveInfer,
    "hazard-scan": renderHazardScan,
    "evidence-lens": renderEvidenceLens,
    "layer-toggle": renderLayerToggle,
    "isostasy-compare": renderIsostasyCompare,
    "energy-pathways": renderEnergyPathways,
    "rock-atlas": () => renderRockAtlas(data)
  }[data.interactive]?.() || "");

  const renderGuideVisuals = (moduleId) => {
    const data = visualCatalog[moduleId];
    if (!data || !Array.isArray(data.visuals) || data.visuals.length === 0) return "";
    return `
      <section class="visual-learning" data-visual-module="${escapeHTML(moduleId)}" aria-labelledby="visual-learning-heading">
        <div class="visual-learning-heading"><div><p class="guide-section-label">Visual field guide</p><h2 id="visual-learning-heading">${escapeHTML(data.label)}</h2><p>${escapeHTML(data.intro)}</p></div><span>${data.visuals.length} sourced visual${data.visuals.length === 1 ? "" : "s"}</span></div>
        ${renderGuideInteraction(data)}
        <div class="visual-stage" data-visual-stage>${visualFeatureHTML(data.visuals[0], 0)}</div>
        ${data.visuals.length > 1 ? `<div class="visual-gallery" role="list" aria-label="Source visual gallery">${data.visuals.map((item, index) => `<button type="button" role="listitem" class="visual-thumb${index === 0 ? " active" : ""}${item.missing ? " missing" : ""}" data-visual-index="${index}">${item.missing ? '<span class="thumb-missing">Map unavailable</span>' : `<img src="${escapeHTML(item.src)}" alt="">`}<span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.source)}</small></span></button>`).join("")}</div>` : ""}
      </section>`;
  };

  const openVisualDialog = (item) => {
    if (!item?.src) return;
    const dialog = $("visual-dialog");
    $("visual-dialog-image").src = item.src;
    $("visual-dialog-image").alt = item.alt || item.title;
    $("visual-dialog-title").textContent = item.title;
    $("visual-dialog-caption").textContent = item.caption || item.cues || "";
    $("visual-dialog-source").innerHTML = `<strong>Source:</strong> ${escapeHTML(item.source)}`;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  };

  const bindGuideVisuals = (moduleId) => {
    const data = visualCatalog[moduleId];
    const root = document.querySelector(`[data-visual-module="${CSS.escape(moduleId)}"]`);
    if (!data || !root) return;
    const stage = root.querySelector("[data-visual-stage]");
    const bindFeature = (index) => {
      const item = data.visuals[index];
      stage.innerHTML = visualFeatureHTML(item, index);
      root.querySelectorAll(".visual-thumb").forEach((thumb) => thumb.classList.toggle("active", Number(thumb.dataset.visualIndex) === index));
      stage.querySelector("[data-notice-toggle]")?.addEventListener("click", (event) => {
        const notice = stage.querySelector(".visual-notice");
        const expanded = event.currentTarget.getAttribute("aria-expanded") === "true";
        event.currentTarget.setAttribute("aria-expanded", String(!expanded));
        event.currentTarget.textContent = expanded ? "Reveal what to notice" : "Hide what to notice";
        notice.classList.toggle("hidden", expanded);
      });
      stage.querySelector("[data-visual-zoom]")?.addEventListener("click", () => openVisualDialog(item));
    };
    root.querySelectorAll(".visual-thumb").forEach((thumb) => thumb.addEventListener("click", () => bindFeature(Number(thumb.dataset.visualIndex))));
    bindFeature(0);

    const cycleMoves = [
      ["Predict", "State an initial expectation before the new evidence is revealed."],
      ["Draw", "Make the proposed relationships, geometry, or process visible."],
      ["Justify", "Defend the prediction with an explicit chain of reasoning."],
      ["Research", "Seek the observation, measurement, or source that can test the reasoning."],
      ["Revise Understanding", "Update the model from the evidence, then let the revision inform the next prediction."]
    ];
    root.querySelectorAll("[data-cycle-index]").forEach((button) => button.addEventListener("click", () => {
      const index = Number(button.dataset.cycleIndex);
      root.querySelectorAll("[data-cycle-index]").forEach((item) => item.classList.toggle("active", item === button));
      const copy = root.querySelector("#cycle-explanation");
      copy.innerHTML = `<strong>${cycleMoves[index][0]}</strong><p>${cycleMoves[index][1]}</p>`;
    }));

    const evidenceModes = {
      look: ["Look without naming a cause.", "Scan color, layer thickness, contacts, fractures, ledges, slope, and detached blocks."],
      describe: ["State only what the image can directly support.", "Example: horizontal tan and brown layers are exposed; several blocks sit below a steep ledge."],
      infer: ["Now propose a testable history.", "Example: the lower unit may erode faster, undercutting the upper unit and contributing to rockfall. Field measurements would test it."]
    };
    root.querySelectorAll("[data-evidence-mode]").forEach((button) => button.addEventListener("click", () => {
      const [title, copy] = evidenceModes[button.dataset.evidenceMode];
      root.querySelectorAll("[data-evidence-mode]").forEach((item) => item.classList.toggle("active", item === button));
      root.querySelector("#evidence-lens-copy").innerHTML = `<strong>${title}</strong><p>${copy}</p>`;
    }));

    const hazards = [
      ["Volcano", "Lava, ash, gases, and debris flows can reach beyond the cone; distance and topography matter."],
      ["Steep slope", "Gravity can move rock and sediment downslope, especially where material is fractured or saturated."],
      ["Fault", "Surface rupture and shaking threaten structures; mapped proximity changes exposure."],
      ["Stream", "Water and nutrients are resources, but the adjacent floodplain is episodically occupied by water."],
      ["Soil", "Soil supports food and construction decisions, but thickness, drainage, and stability vary with parent material and setting."]
    ];
    root.querySelectorAll("[data-hazard-index]").forEach((button) => button.addEventListener("click", () => {
      const item = hazards[Number(button.dataset.hazardIndex)];
      root.querySelectorAll("[data-hazard-index]").forEach((node) => node.classList.toggle("active", node === button));
      root.querySelector("#hazard-scan-copy").innerHTML = `<strong>${item[0]}</strong><p>${item[1]}</p>`;
    }));

    const layers = [
      ["Crust → Mantle → Core", "Classified by chemistry and material identity. Continental and oceanic crust are both crust; the core is chiefly iron-nickel."],
      ["Lithosphere → Asthenosphere", "Classified by strength and deformation. Lithosphere is rigid crust plus rigid uppermost mantle; asthenosphere is weaker and ductile."],
      ["Crust ≠ Lithosphere", "The terms overlap spatially but answer different questions. A compositional boundary does not have to match a mechanical boundary."]
    ];
    root.querySelectorAll("[data-layer-index]").forEach((button) => button.addEventListener("click", () => {
      const item = layers[Number(button.dataset.layerIndex)];
      root.querySelectorAll("[data-layer-index]").forEach((node) => { node.classList.toggle("active", node === button); node.setAttribute("aria-selected", String(node === button)); });
      root.querySelector("#layer-switch-copy").innerHTML = `<strong>${item[0]}</strong><p>${item[1]}</p>`;
    }));

    const isoCases = [
      ["Rides higher and extends deeper", "Thickness increases both the exposed top and the submerged root."],
      ["Rides lower", "Greater density requires more displacement of the supporting material."],
      ["Lowest of these comparisons", "Both variables push the block toward a lower equilibrium position."]
    ];
    root.querySelectorAll("[data-isostasy-index]").forEach((button) => button.addEventListener("click", () => {
      const item = isoCases[Number(button.dataset.isostasyIndex)];
      root.querySelectorAll("[data-isostasy-index]").forEach((node) => node.classList.toggle("active", node === button));
      root.querySelector("#isostasy-compare-copy").innerHTML = `<strong>${item[0]}</strong><p>${item[1]}</p>`;
    }));

    const energyPaths = [
      ["Interior heat → mantle motion/melting → tectonism and magmatism", "Visible results: volcanism, intrusion, deformation, uplift"],
      ["Uneven solar heating → atmosphere and water cycle → weathering, runoff, transport", "Visible results: climate, wind, streams, erosion, deposition"],
      ["Potential energy → downslope motion", "Visible results: rockfall, landslide, river flow, sediment transport"]
    ];
    root.querySelectorAll("[data-energy-index]").forEach((button) => button.addEventListener("click", () => {
      const item = energyPaths[Number(button.dataset.energyIndex)];
      root.querySelectorAll("[data-energy-index]").forEach((node) => node.classList.toggle("active", node === button));
      root.querySelector("#energy-path-copy").innerHTML = `<strong>${item[0]}</strong><p>${item[1]}</p>`;
    }));

    root.querySelectorAll("[data-atlas-filter]").forEach((button) => button.addEventListener("click", () => {
      const filter = button.dataset.atlasFilter;
      root.querySelectorAll("[data-atlas-filter]").forEach((node) => node.classList.toggle("active", node === button));
      root.querySelectorAll("[data-atlas-category]").forEach((card) => card.classList.toggle("hidden", filter !== "all" && card.dataset.atlasCategory !== filter));
    }));
    root.querySelectorAll("[data-atlas-reveal]").forEach((button) => button.addEventListener("click", () => {
      const process = button.nextElementSibling;
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      button.textContent = expanded ? "Reveal process connection" : "Hide process connection";
      process.classList.toggle("hidden", expanded);
    }));
    root.querySelectorAll("[data-atlas-zoom]").forEach((button) => button.addEventListener("click", () => openVisualDialog(data.atlas[Number(button.dataset.atlasZoom)])));
  };

  const openGuideDetail = (moduleId) => {
    const module = modules.find((item) => item.id === moduleId);
    if (!module) return;
    currentGuideModule = module;
    markMode("guide");
    $("guide-detail-kicker").textContent = `Exam 1 · Section ${module.number} · ${module.kicker}`;
    $("guide-detail-title").textContent = module.title;
    $("guide-detail-description").textContent = module.description;
    $("guide-detail-source").textContent = module.source;
    $("guide-continuation").classList.toggle("hidden", !module.continuation);

    const lesson = module.activities.find((activity) => activity.type === "lesson");
    const conceptSections = module.concepts.map((concept) => {
      const activities = module.activities.filter((activity) => activity.concept === concept.id);
      const explanations = uniqueText(activities.map((activity) => activity.explanation));
      const prompts = uniqueText(activities.map((activity) => activity.prompt));
      const sources = uniqueText(activities.map((activity) => activity.source));
      return `
        <section class="guide-concept">
          <div class="guide-concept-heading"><span>Concept ${module.number}.${module.concepts.indexOf(concept) + 1}</span><h3>${escapeHTML(concept.label)}</h3></div>
          <div class="guide-explanations">${explanations.map((item) => `<p>${escapeHTML(item)}</p>`).join("")}</div>
          <div class="guide-self-check"><strong>Close the notes, then answer:</strong><ul>${prompts.map((prompt) => `<li>${escapeHTML(prompt)}</li>`).join("")}</ul></div>
          <p class="source-strip"><strong>Sources:</strong> ${sources.map(escapeHTML).join(" · ")}</p>
        </section>`;
    }).join("");

    $("guide-detail-content").innerHTML = `
      <section class="guide-overview">
        <p class="guide-section-label">Source-based study notes</p>
        ${(lesson?.body || []).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
        <div class="key-points"><strong>What must survive closed notes</strong><ul>${(lesson?.keyPoints || []).map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul></div>
        <p class="source-strip"><strong>Foundation source:</strong> ${escapeHTML(lesson?.source || module.source)}</p>
      </section>
      ${renderGuideVisuals(module.id)}
      <div class="guide-concept-list">${conceptSections}</div>`;
    bindGuideVisuals(module.id);
    showOnly($("guide-detail-view"));
  };

  const renderLabLibrary = () => {
    updateMasteryCounts();
    const library = $("lab-module-library");
    library.replaceChildren();
    modules.forEach((module) => {
      const moduleState = guidedProgress.modules[module.id] || {};
      const masteredHere = module.concepts.filter(({ id }) => getConceptState(id).mastered).length;
      const attempts = module.concepts.reduce((sum, { id }) => sum + getConceptState(id).attempts, 0);
      const gradedCount = module.activities.filter((activity) => gradedTypes.has(activity.type)).length;
      const status = masteredHere === module.concepts.length ? "Mastered" : moduleState.completed ? "Review due" : attempts > 0 ? "In progress" : "Not started";
      const card = document.createElement("article");
      card.className = `module-card${module.continuation ? " continuation-card" : ""}`;
      card.innerHTML = `
        <div class="module-number" aria-hidden="true">${String(module.number).padStart(2, "0")}</div>
        <div class="module-card-body">
          <div class="module-card-topline"><span class="pill">${escapeHTML(module.kicker)}</span><span class="module-status ${status.toLowerCase().replaceAll(" ", "-")}">${status}</span></div>
          <h3>${escapeHTML(module.title)}</h3><p>${escapeHTML(module.description)}</p>
          ${module.continuation ? '<p class="continuation-note">Deck continuation—class emphasis unconfirmed</p>' : ""}
          <div class="module-metrics"><span>${gradedCount} Lab activities</span><span>${masteredHere}/${module.concepts.length} mastered</span></div>
          <div class="mini-track" aria-hidden="true"><span style="width:${Math.round(masteredHere / module.concepts.length * 100)}%"></span></div>
          <div class="module-card-actions"><button class="button ghost" type="button" data-action="notes">Notes</button><button class="button primary" type="button" data-action="lab">${attempts > 0 ? "Continue Lab" : "Start topic Lab"}</button></div>
        </div>`;
      card.querySelector('[data-action="notes"]').addEventListener("click", () => openGuideDetail(module.id));
      card.querySelector('[data-action="lab"]').addEventListener("click", () => startModule(module.id));
      library.append(card);
    });
    renderQuizLibrary();
  };

  const renderExamPlaceholder = (examId) => {
    const exam = examShells[examId];
    $("placeholder-kicker").textContent = `${exam.label} · ${exam.coverage}`;
    $("placeholder-title").textContent = exam.title;
    $("placeholder-copy").textContent = exam.copy;
    $("placeholder-guide-copy").textContent = exam.guide;
    $("placeholder-lab-copy").textContent = exam.lab;
    const inheritance = $("placeholder-inheritance");
    inheritance.classList.toggle("hidden", !exam.inheritance);
    inheritance.textContent = exam.inheritance || "";
    showOnly($("exam-placeholder-view"));
  };

  const selectExam = (examId) => {
    activeExam = examId;
    document.querySelectorAll(".exam-button").forEach((button) => {
      const active = button.dataset.exam === examId;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    $("mode-nav").classList.toggle("hidden", examId !== "exam-one");
    if (examId === "exam-one") openMode(activeMode === "mastery" ? "guide" : activeMode);
    else renderExamPlaceholder(examId);
  };

  const learning = {
    module: null,
    queue: [],
    index: 0,
    currentCorrect: null,
    submitted: false,
    confidenceRecorded: false,
    repeatCounts: {},
    isReview: false,
    selectedLabel: null,
    labelAssignments: {},
    renderedSelectRows: []
  };

  const startModule = (moduleId, conceptFilter = null) => {
    const module = modules.find((item) => item.id === moduleId);
    if (!module) return;
    const relevant = module.activities.filter((activity) => gradedTypes.has(activity.type) && (!conceptFilter || activity.concept === conceptFilter));
    learning.module = module;
    learning.queue = relevant.map((activity) => ({ ...activity, _rootId: activity.id }));
    learning.index = 0;
    learning.repeatCounts = {};
    learning.isReview = Boolean(conceptFilter);
    guidedProgress.modules[module.id] = {
      ...(guidedProgress.modules[module.id] || {}),
      startedAt: guidedProgress.modules[module.id]?.startedAt || new Date().toISOString()
    };
    saveGuidedProgress();
    activeMode = "lab";
    markMode("lab");
    showOnly($("lesson-view"));
    renderActivity();
  };

  const activityTypeLabel = (type) => ({
    lesson: "Learn",
    single: "Choose one",
    multi: "Select all",
    sort: "Sort",
    match: "Match",
    fillblank: "Exact term",
    teachback: "Teach back",
    hazard: "Map decision",
    label: "Label model",
    isostasy: "Manipulate"
  }[type] || type);

  const renderStudyReference = (activity) => {
    const lesson = learning.module?.activities.find((item) => item.type === "lesson");
    const concept = learning.module?.concepts.find((item) => item.id === activity.concept);
    const explanations = uniqueText(learning.module?.activities
      .filter((item) => item.concept === activity.concept)
      .map((item) => item.explanation) || []);
    return `
      <details class="study-reference" ${activity.type === "teachback" ? "open" : ""}>
        <summary>Study Guide notes${concept ? `: ${escapeHTML(concept.label)}` : ""}</summary>
        <div>
          ${(lesson?.body || []).slice(0, 2).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
          <ul>${(lesson?.keyPoints || []).slice(0, 4).map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul>
          ${explanations.slice(0, 3).map((item) => `<p>${escapeHTML(item)}</p>`).join("")}
          ${renderReferenceFigures(activity)}
          <button class="text-button" type="button" data-open-reference>Open the full Study Guide section</button>
        </div>
      </details>`;
  };

  // Images stay inside Study Guide notes, never exposed in the closed-notes prompt.
  const renderReferenceFigures = (activity) => {
    const figures = (visualCatalog[learning.module?.id]?.visuals || []).filter(item => item.conceptIds?.includes(activity.concept));
    if (!figures.length) return "";
    return `<section class="reference-figures" aria-label="Figures for this concept"><h3>See the concept</h3><p>Open a source figure to enlarge it. These are study aids, not a graded attempt.</p><div class="reference-figure-grid">${figures.map(item => `<figure><button type="button" data-reference-visual="${escapeHTML(item.id)}" aria-label="Enlarge ${escapeHTML(item.title)}"><img loading="lazy" src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}"></button><figcaption><strong>${escapeHTML(item.title)}</strong><p>${escapeHTML(item.notice)}</p><small>${escapeHTML(item.source)}</small></figcaption></figure>`).join("")}</div></section>`;
  };

  const sourceAndHint = (activity) => `
    ${activity.hint ? `<details class="hint-panel"><summary>Need a hint?</summary><p>${escapeHTML(activity.hint)}</p></details>` : ""}
    ${renderStudyReference(activity)}
    <p class="source-strip"><strong>Source:</strong> ${escapeHTML(activity.source)}</p>`;

  const renderLesson = (activity) => `
    <div class="lesson-copy">
      ${(activity.body || []).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
      <div class="key-points">
        <strong>Working rules</strong>
        <ul>${(activity.keyPoints || []).map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul>
      </div>
      <p class="source-strip"><strong>Source:</strong> ${escapeHTML(activity.source)}</p>
    </div>`;

  const renderChoiceActivity = (activity, extra = "") => {
    const type = activity.type === "multi" ? "checkbox" : "radio";
    const indices = shuffleAwayFromOriginal(activity.choices.map((_, index) => index));
    return `
      ${extra}
      <fieldset class="activity-options">
        <legend class="sr-only">${escapeHTML(activity.prompt)}</legend>
        ${indices.map((index) => `
          <label class="activity-option">
            <input type="${type}" name="guided-answer" value="${index}">
            <span>${escapeHTML(activity.choices[index])}</span>
          </label>`).join("")}
      </fieldset>
      ${sourceAndHint(activity)}`;
  };

  const renderSelectActivity = (activity) => {
    const rows = activity.type === "sort" ? activity.items.map((item) => ({ label: item.text, answer: item.group })) : activity.rows;
    const options = activity.type === "sort" ? activity.groups : activity.options;
    learning.renderedSelectRows = shuffleAwayFromOriginal(rows);
    const shuffledOptions = shuffleAwayFromOriginal(options);
    return `
      <div class="select-grid" data-select-kind="${activity.type}">
        ${learning.renderedSelectRows.map((row, index) => `
          <label class="select-row">
            <span>${escapeHTML(row.label)}</span>
            <select data-row="${index}">
              <option value="">Choose…</option>
              ${shuffledOptions.map((option) => `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`).join("")}
            </select>
          </label>`).join("")}
      </div>
      ${sourceAndHint(activity)}`;
  };

  const earthDiagram = () => `
    <div class="earth-activity">
      <div class="earth-diagram" aria-label="Original concentric Earth cross-section">
        <svg viewBox="0 0 420 420" role="img" aria-labelledby="earth-title earth-desc">
          <title id="earth-title">Earth compositional cross-section</title>
          <desc id="earth-desc">Three concentric regions representing crust, mantle, and core.</desc>
          <defs>
            <radialGradient id="coreGlow"><stop offset="0" stop-color="#f7d46d"/><stop offset="1" stop-color="#c96f42"/></radialGradient>
          </defs>
          <circle cx="210" cy="210" r="176" fill="#254f3d" stroke="#17392c" stroke-width="4"/>
          <circle cx="210" cy="210" r="162" fill="#d9a94d"/>
          <circle cx="210" cy="210" r="92" fill="url(#coreGlow)" stroke="#9c4f34" stroke-width="3"/>
          <path d="M210 34 A176 176 0 0 1 372 278 L302 250 A100 100 0 0 0 210 110Z" fill="#efe5c9" opacity=".18"/>
        </svg>
        <button class="earth-zone zone-crust" type="button" data-zone="crust" aria-label="Outermost thin zone">Outer shell<span>Drop label</span></button>
        <button class="earth-zone zone-mantle" type="button" data-zone="mantle" aria-label="Thick middle zone">Thick middle<span>Drop label</span></button>
        <button class="earth-zone zone-core" type="button" data-zone="core" aria-label="Center zone">Center<span>Drop label</span></button>
      </div>
      <div>
        <p class="interaction-instruction">Drag a label to a zone, or select a label and then choose a zone.</p>
        <div class="label-bank" aria-label="Available labels"></div>
      </div>
    </div>`;

  const bindEarthDiagram = (activity) => {
    const bank = document.querySelector(".label-bank");
    const zones = [...document.querySelectorAll(".earth-zone")];
    learning.selectedLabel = null;
    learning.labelAssignments = {};

    const update = () => {
      bank.replaceChildren();
      activity.labels.forEach((labelText) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "label-chip";
        chip.textContent = labelText;
        chip.draggable = true;
        const assigned = Object.values(learning.labelAssignments).includes(labelText);
        chip.classList.toggle("assigned", assigned);
        chip.classList.toggle("selected", learning.selectedLabel === labelText);
        chip.addEventListener("click", () => {
          learning.selectedLabel = labelText;
          update();
        });
        chip.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", labelText));
        bank.append(chip);
      });
      zones.forEach((zone) => {
        const assignment = learning.labelAssignments[zone.dataset.zone];
        zone.querySelector("span").textContent = assignment || "Drop label";
        zone.classList.toggle("filled", Boolean(assignment));
      });
    };

    const assign = (zoneId, labelText) => {
      if (!labelText || !activity.labels.includes(labelText)) return;
      Object.keys(learning.labelAssignments).forEach((key) => {
        if (learning.labelAssignments[key] === labelText) delete learning.labelAssignments[key];
      });
      learning.labelAssignments[zoneId] = labelText;
      learning.selectedLabel = null;
      update();
    };

    zones.forEach((zone) => {
      zone.addEventListener("click", () => assign(zone.dataset.zone, learning.selectedLabel));
      zone.addEventListener("dragover", (event) => event.preventDefault());
      zone.addEventListener("drop", (event) => {
        event.preventDefault();
        assign(zone.dataset.zone, event.dataTransfer.getData("text/plain"));
      });
    });
    update();
  };

  const hazardMap = () => `
    <div class="hazard-layout">
      <div class="hazard-map">
        <svg viewBox="0 0 680 390" role="img" aria-labelledby="hazard-title hazard-desc">
          <title id="hazard-title">Original settlement hazard schematic</title>
          <desc id="hazard-desc">Four candidate settlement zones near a volcano, stream floodplain, fault, and steep slope.</desc>
          <rect width="680" height="390" rx="22" fill="#e7e2cf"/>
          <path d="M0 300 C110 250 150 345 260 295 S430 255 680 300 V390 H0Z" fill="#9bc9d0"/>
          <path d="M0 270 C120 220 158 315 266 265 S450 225 680 270" fill="none" stroke="#397f91" stroke-width="26" opacity=".8"/>
          <path d="M40 216 160 54 278 216Z" fill="#98684f"/>
          <path d="M108 122 160 54 207 119 185 111 162 127 138 108Z" fill="#f2e5d1"/>
          <path d="M496 36 650 170 594 232 462 124Z" fill="#b6976d"/>
          <path d="M510 350 565 34" stroke="#a34335" stroke-width="8" stroke-dasharray="14 10"/>
          <path d="M150 54 C188 34 203 25 215 2" fill="none" stroke="#6d756f" stroke-width="14" opacity=".6"/>
          <g class="map-zone"><circle cx="193" cy="169" r="28"/><text x="193" y="176">A</text></g>
          <g class="map-zone safe"><circle cx="355" cy="150" r="28"/><text x="355" y="157">B</text></g>
          <g class="map-zone"><circle cx="346" cy="301" r="28"/><text x="346" y="308">C</text></g>
          <g class="map-zone"><circle cx="552" cy="172" r="28"/><text x="552" y="179">D</text></g>
          <text x="46" y="245">volcanic flank</text><text x="274" y="356">active floodplain</text>
          <text x="540" y="340">fault</text><text x="510" y="90">steep slope</text>
        </svg>
        <p>Original schematic—candidate sites still require field and subsurface investigation.</p>
      </div>
    </div>`;

  const isostasyModel = () => `
    <div class="isostasy-lab">
      <div class="slider-panel">
        <label>Crustal thickness <strong id="thickness-value">70</strong>
          <input id="thickness-slider" type="range" min="30" max="100" value="70">
        </label>
        <label>Relative density <strong id="density-value">45</strong>
          <input id="density-slider" type="range" min="20" max="85" value="45">
        </label>
        <p id="isostasy-prediction">Prediction: moderately elevated</p>
      </div>
      <div class="float-tank" aria-label="Floating block analogy">
        <div class="air-label">surface</div>
        <div class="waterline"></div>
        <div id="crust-block" class="crust-block"><span>crust</span></div>
        <div class="mantle-water">supporting mantle</div>
      </div>
    </div>`;

  const bindIsostasy = () => {
    const thickness = $("thickness-slider");
    const density = $("density-slider");
    const block = $("crust-block");
    const update = () => {
      const thick = Number(thickness.value);
      const dense = Number(density.value);
      const elevation = Math.max(8, Math.round(thick * 0.62 - dense * 0.38 + 28));
      $("thickness-value").textContent = thick;
      $("density-value").textContent = dense;
      block.style.height = `${80 + thick}px`;
      block.style.width = `${84 + thick * 0.45}px`;
      block.style.transform = `translateY(${-elevation}px)`;
      $("isostasy-prediction").textContent = `Prediction: ${elevation > 50 ? "rides high" : elevation > 30 ? "moderately elevated" : "rides low"}`;
    };
    thickness.addEventListener("input", update);
    density.addEventListener("input", update);
    update();
  };

  const renderTeachback = (activity) => `
    <div class="teachback">
      <label for="teachback-response">Your explanation</label>
      <textarea id="teachback-response" rows="6" placeholder="Explain the causal chain in your own words…"></textarea>
      <div class="teachback-meta"><span id="teachback-count">0 words</span><span>Not stored</span></div>
      <div id="rubric-host" class="rubric-host hidden"></div>
    </div>
    ${sourceAndHint(activity)}`;

  const renderFillBlank = (activity) => `
    <div class="fillblank-activity">
      <label for="fillblank-response">Type the missing term</label>
      <input id="fillblank-response" type="text" autocomplete="off" spellcheck="false" placeholder="Enter the exact term…">
      <small>Capitalization and surrounding punctuation do not matter.</small>
    </div>
    ${sourceAndHint(activity)}`;

  const bindTeachback = () => {
    const textarea = $("teachback-response");
    const update = () => {
      const words = textarea.value.trim() ? textarea.value.trim().split(/\s+/).length : 0;
      $("teachback-count").textContent = `${words} word${words === 1 ? "" : "s"}`;
      $("activity-primary").disabled = words < 5;
    };
    textarea.addEventListener("input", update);
    update();
  };

  const renderActivity = () => {
    if (learning.index >= learning.queue.length) {
      finishModule();
      return;
    }
    const activity = learning.queue[learning.index];
    learning.currentCorrect = null;
    learning.submitted = false;
    learning.confidenceRecorded = false;
    $("activity-feedback").className = "feedback hidden";
    $("activity-feedback").replaceChildren();
    $("confidence-panel").classList.add("hidden");
    document.querySelectorAll(".confidence-buttons button").forEach((button) => {
      button.disabled = false;
      button.classList.remove("selected");
    });
    $("activity-next").classList.add("hidden");
    $("activity-primary").classList.remove("hidden");
    $("activity-primary").disabled = false;

    $("lesson-progress-label").textContent = `Activity ${learning.index + 1} of ${learning.queue.length}`;
    $("lesson-mastery-label").textContent = `${learning.module.concepts.filter(({ id }) => getConceptState(id).mastered).length}/${learning.module.concepts.length} concepts mastered`;
    $("lesson-progress-fill").style.width = `${(learning.index / learning.queue.length) * 100}%`;
    $("lesson-kicker").textContent = `Module ${learning.module.number} · ${learning.module.kicker}`;
    $("lesson-title").textContent = activity.title || activity.prompt;
    $("activity-type").textContent = activityTypeLabel(activity.type);
    $("activity-scope").textContent = "Deck continuation · emphasis unconfirmed";
    $("activity-scope").classList.toggle("hidden", activity.status !== "continuation");

    const host = $("activity-host");
    host.replaceChildren();

    let body = "";
    if (activity.type === "lesson") body = renderLesson(activity);
    if (["single", "multi"].includes(activity.type)) body = renderChoiceActivity(activity);
    if (["sort", "match"].includes(activity.type)) body = renderSelectActivity(activity);
    if (activity.type === "fillblank") body = renderFillBlank(activity);
    if (activity.type === "hazard") body = renderChoiceActivity(activity, hazardMap());
    if (activity.type === "label") body = `${earthDiagram()}${sourceAndHint(activity)}`;
    if (activity.type === "isostasy") body = renderChoiceActivity(activity, isostasyModel());
    if (activity.type === "teachback") body = renderTeachback(activity);
    host.insertAdjacentHTML("beforeend", body);

    $("activity-primary").textContent = activity.type === "lesson" ? "Continue" : activity.type === "teachback" ? "Reveal rubric" : activity.type === "fillblank" ? "Check term" : "Check answer";
    if (activity.type === "label") bindEarthDiagram(activity);
    if (activity.type === "isostasy") bindIsostasy();
    if (activity.type === "teachback") bindTeachback();
    host.querySelectorAll("[data-open-reference]").forEach((button) => button.addEventListener("click", () => openGuideDetail(learning.module.id)));
    host.querySelectorAll("[data-reference-visual]").forEach(button => button.addEventListener("click", () => openVisualDialog(visualCatalog[learning.module.id].visuals.find(item => item.id === button.dataset.referenceVisual))));
    $("activity-primary").focus({ preventScroll: true });
  };

  const selectedGuidedAnswers = () => [...document.querySelectorAll('input[name="guided-answer"]:checked')]
    .map((input) => Number(input.value)).sort((a, b) => a - b);

  const sameAnswers = (left, right) => left.length === right.length && left.every((value, index) => value === right[index]);

  const normalizeTerm = (value) => String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

  const evaluateCurrent = (activity) => {
    if (["single", "hazard", "isostasy"].includes(activity.type)) {
      const selected = selectedGuidedAnswers();
      return { ready: selected.length === 1, correct: selected[0] === activity.answer };
    }
    if (activity.type === "multi") {
      const selected = selectedGuidedAnswers();
      const answer = [...activity.answer].sort((a, b) => a - b);
      return { ready: selected.length > 0, correct: sameAnswers(selected, answer) };
    }
    if (["sort", "match"].includes(activity.type)) {
      const rows = learning.renderedSelectRows.map((row) => row.answer);
      const selected = [...document.querySelectorAll(".select-row select")].map((select) => select.value);
      return { ready: selected.every(Boolean), correct: selected.every((value, index) => value === rows[index]) };
    }
    if (activity.type === "fillblank") {
      const response = normalizeTerm($("fillblank-response")?.value);
      const answers = (activity.answers || []).map(normalizeTerm);
      return { ready: Boolean(response), correct: answers.includes(response) };
    }
    if (activity.type === "label") {
      const ready = activity.zones.every((zone) => learning.labelAssignments[zone.id]);
      const correct = ready && activity.zones.every((zone) => learning.labelAssignments[zone.id] === zone.answer);
      return { ready, correct };
    }
    return { ready: false, correct: false };
  };

  const showAttemptFeedback = (activity, correct) => {
    learning.currentCorrect = correct;
    learning.submitted = true;
    const feedback = $("activity-feedback");
    feedback.className = `feedback ${correct ? "good" : "bad"}`;
    feedback.innerHTML = `
      <strong>${correct ? "Correct." : "Not yet."}</strong>
      <span>${escapeHTML(activity.explanation)}</span>
      <small>${escapeHTML(activity.source)}</small>`;
    $("activity-primary").classList.add("hidden");
    $("confidence-panel").classList.remove("hidden");
    document.querySelectorAll("#activity-host input, #activity-host select, #activity-host textarea, #activity-host .label-chip, #activity-host .earth-zone")
      .forEach((control) => { control.disabled = true; });
  };

  const revealTeachbackRubric = (activity) => {
    if (learning.submitted) return;
    const rubric = $("rubric-host");
    rubric.classList.remove("hidden");
    rubric.innerHTML = `
      <strong>Compare your answer with this rubric</strong>
      <ul>${activity.rubric.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
      <p>${escapeHTML(activity.explanation)}</p>
      <div class="self-rating" role="group" aria-label="Self-rate teach-back response">
        <button type="button" data-rating="got">Got it</button>
        <button type="button" data-rating="partial">Partial</button>
        <button type="button" data-rating="missed">Missed it</button>
      </div>`;
    $("activity-primary").classList.add("hidden");
    $("teachback-response").disabled = true;
    rubric.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
      const correct = button.dataset.rating === "got";
      rubric.querySelectorAll("button").forEach((item) => {
        item.disabled = true;
        item.classList.toggle("selected", item === button);
      });
      showAttemptFeedback(activity, correct);
    }));
  };

  const checkGuidedActivity = () => {
    const activity = learning.queue[learning.index];
    if (!activity) return;
    if (activity.type === "lesson") {
      learning.index += 1;
      renderActivity();
      return;
    }
    if (activity.type === "teachback") {
      revealTeachbackRubric(activity);
      return;
    }
    const result = evaluateCurrent(activity);
    if (!result.ready) {
      const feedback = $("activity-feedback");
      feedback.className = "feedback bad";
      feedback.innerHTML = "<strong>Complete the attempt first.</strong><span>Commit to every required choice before revealing the explanation.</span>";
      return;
    }
    showAttemptFeedback(activity, result.correct);
  };

  const hasFutureConcept = (conceptId) => learning.queue
    .slice(learning.index + 1)
    .some((activity) => activity.concept === conceptId);

  const insertAdaptiveReview = (activity, distance, guaranteeDistance = true) => {
    const rootId = activity._rootId || activity.id;
    const repeats = learning.repeatCounts[rootId] || 0;
    if (repeats >= 2) return;
    const requestedIndex = learning.index + distance + 1;
    if (guaranteeDistance && learning.queue.length < requestedIndex) {
      const bridgePool = learning.module.activities.filter((candidate) => gradedTypes.has(candidate.type) && candidate.id !== rootId);
      let cursor = 0;
      while (learning.queue.length < requestedIndex && bridgePool.length) {
        const bridge = bridgePool[cursor % bridgePool.length];
        learning.queue.push({ ...bridge, _rootId: bridge.id, _bridge: true });
        cursor += 1;
      }
    }
    const insertionIndex = guaranteeDistance ? Math.min(requestedIndex, learning.queue.length) : learning.queue.length;
    learning.queue.splice(insertionIndex, 0, { ...activity, _rootId: rootId, _repeat: true });
    learning.repeatCounts[rootId] = repeats + 1;
  };

  const recordGuidedAttempt = (confidence) => {
    if (!learning.submitted || learning.confidenceRecorded) return;
    const activity = learning.queue[learning.index];
    if (!gradedTypes.has(activity.type) || !activity.concept) return;
    const concept = getConceptState(activity.concept);
    concept.attempts += 1;
    concept.lastConfidence = confidence;
    if (learning.currentCorrect) {
      concept.correct += 1;
      concept.streak += 1;
      concept.needsReview = confidence === "low";
      if (confidence !== "low" && concept.streak >= 2) {
        concept.mastered = true;
        concept.needsReview = false;
        concept.misconception = false;
      }
    } else {
      concept.streak = 0;
      concept.mastered = false;
      concept.needsReview = true;
      if (confidence === "high") concept.misconception = true;
    }
    guidedProgress.concepts[activity.concept] = concept;

    if (!learning.currentCorrect) {
      insertAdaptiveReview(activity, 2);
    } else if (confidence === "low") {
      insertAdaptiveReview(activity, 4);
    } else if (concept.streak === 1 && !hasFutureConcept(activity.concept)) {
      insertAdaptiveReview(activity, 0, false);
    }

    saveGuidedProgress();
    learning.confidenceRecorded = true;
    document.querySelectorAll(".confidence-buttons button").forEach((button) => {
      button.disabled = true;
      button.classList.toggle("selected", button.dataset.confidence === confidence);
    });
    $("activity-next").textContent = learning.index === learning.queue.length - 1 ? "Finish module" : "Next activity";
    $("activity-next").classList.remove("hidden");
    renderLabLibrary();
  };

  const nextActivity = () => {
    if (!learning.confidenceRecorded) return;
    learning.index += 1;
    renderActivity();
  };

  const finishModule = () => {
    if (!learning.isReview) {
      guidedProgress.modules[learning.module.id] = {
        ...(guidedProgress.modules[learning.module.id] || {}),
        completed: true,
        completedAt: new Date().toISOString()
      };
      saveGuidedProgress();
    }
    const masteredHere = learning.module.concepts.filter(({ id }) => getConceptState(id).mastered).length;
    $("lesson-progress-label").textContent = learning.isReview ? "Review complete" : "Module complete";
    $("lesson-mastery-label").textContent = `${masteredHere}/${learning.module.concepts.length} concepts mastered`;
    $("lesson-progress-fill").style.width = "100%";
    $("lesson-kicker").textContent = `Module ${learning.module.number}`;
    $("lesson-title").textContent = learning.isReview ? "Review cycle complete" : "Path complete";
    $("activity-type").textContent = "Checkpoint";
    $("activity-scope").classList.add("hidden");
    $("activity-feedback").className = "feedback hidden";
    $("confidence-panel").classList.add("hidden");
    $("activity-primary").classList.add("hidden");
    $("activity-next").classList.add("hidden");
    $("activity-host").innerHTML = `
      <div class="module-complete">
        <span class="completion-mark" aria-hidden="true">${masteredHere === learning.module.concepts.length ? "✓" : "↻"}</span>
        <h3>${masteredHere === learning.module.concepts.length ? "This module is mastered." : "Completion recorded. Retrieval remains."}</h3>
        <p>${masteredHere} of ${learning.module.concepts.length} concepts currently meet the two-correct-at-medium-or-high rule.</p>
        <div class="completion-actions">
          <button class="button primary" type="button" data-finish="mastery">View mastery</button>
          <button class="button ghost" type="button" data-finish="guide">Study Guide</button>
          <button class="button ghost" type="button" data-finish="lab">Exam 1 Lab</button>
        </div>
      </div>`;
    $("activity-host").querySelector('[data-finish="mastery"]').addEventListener("click", () => openMode("mastery"));
    $("activity-host").querySelector('[data-finish="guide"]').addEventListener("click", () => openMode("guide"));
    $("activity-host").querySelector('[data-finish="lab"]').addEventListener("click", () => openMode("lab"));
    renderLabLibrary();
  };

  const priorityRank = (concept) => {
    const state = getConceptState(concept.id);
    if (state.misconception) return 0;
    if (state.needsReview) return 1;
    if (state.attempts === 0) return 2;
    if (!state.mastered) return 3;
    return 4;
  };

  const renderMastery = () => {
    const mastered = masteredCount();
    const percent = conceptCatalog.length ? Math.round(mastered / conceptCatalog.length * 100) : 0;
    $("mastery-percent").textContent = `${percent}%`;
    document.querySelector(".mastery-ring").style.setProperty("--mastery", `${percent * 3.6}deg`);
    const misconceptionCount = conceptCatalog.filter(({ id }) => getConceptState(id).misconception).length;
    const attempted = conceptCatalog.filter(({ id }) => getConceptState(id).attempts > 0).length;
    $("mastery-summary").textContent = mastered === conceptCatalog.length
      ? "Chapter 1 path mastered"
      : mastered > 0
        ? `${mastered} of ${conceptCatalog.length} concepts mastered`
        : "Begin the first module";
    $("mastery-detail").textContent = attempted
      ? `${attempted} concepts attempted · ${misconceptionCount} high-confidence misconception flag${misconceptionCount === 1 ? "" : "s"}.`
      : "No guided attempts recorded yet.";

    const priority = [...conceptCatalog].sort((left, right) => priorityRank(left) - priorityRank(right))[0];
    const reviewButton = $("review-priority");
    if (mastered === conceptCatalog.length) {
      reviewButton.textContent = "Launch Chapter 1 Boss Drill";
      reviewButton.onclick = () => {
        const boss = quizzes.find((quiz) => quiz.id === "chapter-one-boss-drill");
        if (boss) startQuiz(boss);
      };
    } else if (priority) {
      reviewButton.textContent = priorityRank(priority) === 2 ? `Start Module ${priority.moduleNumber}` : `Review: ${priority.label}`;
      reviewButton.onclick = () => startModule(priority.moduleId, priority.id);
    }

    const misconceptionCallout = $("misconception-callout");
    if (misconceptionCount) {
      misconceptionCallout.classList.remove("hidden");
      misconceptionCallout.innerHTML = `<strong>Misconception flag</strong><span>${misconceptionCount} concept${misconceptionCount === 1 ? " was" : "s were"} answered incorrectly with high confidence. Those take review priority.</span>`;
    } else {
      misconceptionCallout.classList.add("hidden");
      misconceptionCallout.replaceChildren();
    }

    const ledger = $("concept-ledger");
    ledger.replaceChildren();
    [...conceptCatalog].sort((left, right) => priorityRank(left) - priorityRank(right) || left.moduleNumber - right.moduleNumber).forEach((concept) => {
      const state = getConceptState(concept.id);
      const status = state.mastered ? "Mastered" : state.misconception ? "Misconception" : state.needsReview ? "Review due" : state.attempts ? "Building" : "Unattempted";
      const row = document.createElement("article");
      row.className = `concept-row status-${status.toLowerCase().replaceAll(" ", "-")}`;
      row.innerHTML = `
        <div><span class="concept-module">M${concept.moduleNumber}</span><strong>${escapeHTML(concept.label)}</strong><small>${escapeHTML(concept.moduleTitle)}</small></div>
        <div class="concept-stats"><span>${state.correct}/${state.attempts} correct</span><span>streak ${state.streak}</span><span>${state.lastConfidence ? `${state.lastConfidence} confidence` : "no confidence yet"}</span></div>
        <button type="button" class="status-button">${status}</button>`;
      row.querySelector("button").addEventListener("click", () => startModule(concept.moduleId, concept.id));
      ledger.append(row);
    });

    const moduleGrid = $("module-progress-grid");
    moduleGrid.replaceChildren();
    modules.forEach((module) => {
      const completed = Boolean(guidedProgress.modules[module.id]?.completed);
      const count = module.concepts.filter(({ id }) => getConceptState(id).mastered).length;
      const card = document.createElement("button");
      card.type = "button";
      card.className = "module-progress-card";
      card.innerHTML = `<span>Module ${module.number}</span><strong>${escapeHTML(module.title)}</strong><small>${completed ? "Completed" : "Open"} · ${count}/${module.concepts.length} mastered</small>`;
      card.addEventListener("click", () => startModule(module.id));
      moduleGrid.append(card);
    });
  };

  const quizState = {
    quiz: null,
    questions: [],
    index: 0,
    score: 0,
    answered: false,
    responses: []
  };

  const readQuizProgress = () => safeRead(quizStorageKey, {});

  const writeQuizProgress = (quizId, score, total) => {
    const progress = readQuizProgress();
    const previous = progress[quizId];
    if (!previous || score / total >= previous.score / previous.total) {
      progress[quizId] = { score, total, completedAt: new Date().toISOString() };
      localStorage.setItem(quizStorageKey, JSON.stringify(progress));
    }
  };

  const renderQuizLibrary = () => {
    const progress = readQuizProgress();
    const library = $("quiz-library");
    library.replaceChildren();
    quizzes.filter((quiz) => quiz.lane === "Exam 1").forEach((quiz) => {
      const card = document.createElement("article");
      card.className = "quiz-tile";
      const saved = progress[quiz.id];
      const disabled = quiz.questions.length === 0;
      card.innerHTML = `
        <span class="pill">${escapeHTML(quiz.lane)}</span>
        <h3>${escapeHTML(quiz.title)}</h3>
        <p>${escapeHTML(quiz.description)}</p>
        <div class="quiz-stats"><span>${escapeHTML(quiz.chapters)}</span><span>${quiz.questions.length} question${quiz.questions.length === 1 ? "" : "s"}</span></div>
        ${saved ? `<p class="saved-score">Best: ${saved.score}/${saved.total} (${Math.round(saved.score / saved.total * 100)}%)</p>` : ""}
        <button class="button ${disabled ? "ghost" : "primary"}" type="button" ${disabled ? "disabled" : ""}>${disabled ? escapeHTML(quiz.status) : "Start shuffled drill"}</button>`;
      if (!disabled) card.querySelector("button").addEventListener("click", () => startQuiz(quiz));
      library.append(card);
    });
  };

  const prepareQuestion = (question) => ({ ...question, displayIndices: shuffle(question.choices.map((_, index) => index)) });

  const startQuiz = (quiz, selectedQuestions = null) => {
    quizState.quiz = quiz;
    quizState.questions = shuffle(selectedQuestions || quiz.questions).map(prepareQuestion);
    quizState.index = 0;
    quizState.score = 0;
    quizState.answered = false;
    quizState.responses = [];
    activeMode = "lab";
    markMode("lab");
    showOnly($("quiz-view"));
    renderQuestion();
  };

  const normalizedAnswer = (question) => Array.isArray(question.answer) ? [...question.answer].sort((a, b) => a - b) : [question.answer];

  const renderQuestion = () => {
    const question = quizState.questions[quizState.index];
    quizState.answered = false;
    $("feedback").className = "feedback hidden";
    $("feedback").replaceChildren();
    $("next-question").classList.add("hidden");
    $("check-answer").disabled = false;
    $("progress-label").textContent = `Question ${quizState.index + 1} of ${quizState.questions.length}`;
    $("score-label").textContent = `${quizState.score} correct`;
    $("progress-fill").style.width = `${(quizState.index / quizState.questions.length) * 100}%`;
    $("question-topic").textContent = question.topic;
    $("question-source").textContent = question.source;
    $("question-prompt").textContent = question.prompt;
    const fieldset = $("answer-options");
    fieldset.replaceChildren();
    const inputType = question.type === "multi" ? "checkbox" : "radio";
    question.displayIndices.forEach((originalIndex) => {
      const label = document.createElement("label");
      label.className = "answer-option";
      const input = document.createElement("input");
      input.type = inputType;
      input.name = "answer";
      input.value = originalIndex;
      const copy = document.createElement("span");
      copy.textContent = question.choices[originalIndex];
      label.append(input, copy);
      fieldset.append(label);
    });
  };

  const selectedQuizAnswers = () => [...document.querySelectorAll("#answer-options input:checked")]
    .map((input) => Number(input.value)).sort((a, b) => a - b);

  const checkQuizAnswer = (event) => {
    event.preventDefault();
    if (quizState.answered) return;
    const question = quizState.questions[quizState.index];
    const selected = selectedQuizAnswers();
    if (selected.length === 0) {
      $("feedback").className = "feedback bad";
      $("feedback").innerHTML = "<strong>Select an answer first.</strong> Make the retrieval attempt before revealing the explanation.";
      return;
    }
    const correctAnswers = normalizedAnswer(question);
    const correct = sameAnswers(selected, correctAnswers);
    quizState.answered = true;
    if (correct) quizState.score += 1;
    quizState.responses.push({ question, selected, correct });
    document.querySelectorAll("#answer-options input").forEach((input) => {
      input.disabled = true;
      const originalIndex = Number(input.value);
      const label = input.closest("label");
      if (correctAnswers.includes(originalIndex)) label.classList.add("correct");
      else if (input.checked) label.classList.add("incorrect");
    });
    const feedback = $("feedback");
    feedback.className = `feedback ${correct ? "good" : "bad"}`;
    feedback.innerHTML = `<strong>${correct ? "Correct." : "Not yet."}</strong>${escapeHTML(question.explanation)}`;
    $("score-label").textContent = `${quizState.score} correct`;
    $("check-answer").disabled = true;
    $("next-question").textContent = quizState.index === quizState.questions.length - 1 ? "See results" : "Next question";
    $("next-question").classList.remove("hidden");
  };

  const nextQuestion = () => {
    if (quizState.index < quizState.questions.length - 1) {
      quizState.index += 1;
      renderQuestion();
    } else {
      renderResults();
    }
  };

  const renderResults = () => {
    const total = quizState.questions.length;
    const percent = Math.round(quizState.score / total * 100);
    writeQuizProgress(quizState.quiz.id, quizState.score, total);
    $("result-score").textContent = `${percent}%`;
    $("result-message").textContent = `${quizState.score} of ${total} correct. ${percent >= 80 ? "Strong retrieval. Now explain the misses without looking." : "The weak concepts have revealed themselves. Feed them back into the drill."}`;
    const missed = quizState.responses.filter((response) => !response.correct);
    $("retry-missed").classList.toggle("hidden", missed.length === 0);
    const review = $("missed-review");
    review.replaceChildren();
    missed.forEach(({ question }) => {
      const item = document.createElement("article");
      item.className = "review-item";
      const correct = normalizedAnswer(question).map((index) => question.choices[index]).join("; ");
      item.innerHTML = `<h3>${escapeHTML(question.prompt)}</h3><p><strong>Correct:</strong> ${escapeHTML(correct)}</p><p>${escapeHTML(question.explanation)}</p><small>${escapeHTML(question.source)}</small>`;
      review.append(item);
    });
    $("retry-missed").onclick = () => startQuiz(quizState.quiz, missed.map((item) => item.question));
    showOnly($("results-view"));
    renderQuizLibrary();
  };

  document.querySelectorAll(".exam-button").forEach((button) => button.addEventListener("click", () => selectExam(button.dataset.exam)));
  document.querySelectorAll(".mode-button, .mastery-button").forEach((button) => button.addEventListener("click", () => openMode(button.dataset.mode)));
  $("activity-primary").addEventListener("click", checkGuidedActivity);
  $("activity-next").addEventListener("click", nextActivity);
  $("back-to-lab").addEventListener("click", () => openMode("lab"));
  document.querySelectorAll(".confidence-buttons button").forEach((button) => button.addEventListener("click", () => recordGuidedAttempt(button.dataset.confidence)));
  $("answer-form").addEventListener("submit", checkQuizAnswer);
  $("next-question").addEventListener("click", nextQuestion);
  $("back-to-library").addEventListener("click", () => openMode("lab"));
  $("results-library").addEventListener("click", () => openMode("lab"));
  $("back-to-guide").addEventListener("click", () => openMode("guide"));
  $("test-guide-module").addEventListener("click", () => currentGuideModule && startModule(currentGuideModule.id));
  $("test-guide-module-bottom").addEventListener("click", () => currentGuideModule && startModule(currentGuideModule.id));
  $("lab-back-to-guide").addEventListener("click", () => openMode("guide"));
  $("view-mastery").addEventListener("click", () => openMode("mastery"));
  $("mastery-back-to-guide").addEventListener("click", () => openMode("guide"));
  $("mastery-back-to-lab").addEventListener("click", () => openMode("lab"));
  $("return-exam-one").addEventListener("click", () => selectExam("exam-one"));
  $("restart-quiz").addEventListener("click", () => startQuiz(quizState.quiz));
  $("print-results").addEventListener("click", () => window.print());
  $("clear-progress").addEventListener("click", () => {
    localStorage.removeItem(quizStorageKey);
    renderQuizLibrary();
  });
  $("reset-guided-progress").addEventListener("click", () => {
    if (!window.confirm("Reset all Lab and Mastery progress? Saved shuffled-drill scores will remain.")) return;
    localStorage.removeItem(guidedStorageKey);
    guidedProgress = getGuidedProgress();
    renderGuideLibrary();
    renderLabLibrary();
    renderMastery();
  });
  $("visual-dialog-close").addEventListener("click", () => $("visual-dialog").close());
  $("visual-dialog").addEventListener("click", (event) => {
    if (event.target === $("visual-dialog")) $("visual-dialog").close();
  });

  renderGuideLibrary();
  renderLabLibrary();
  updateMasteryCounts();
})();
