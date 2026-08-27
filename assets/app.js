(() => {
  "use strict";

  const quizzes = Array.isArray(window.GEOL_QUIZZES) ? window.GEOL_QUIZZES : [];
  const storageKey = "geol1001-study-lab-progress-v1";
  const state = {
    quiz: null,
    questions: [],
    index: 0,
    score: 0,
    answered: false,
    responses: []
  };

  const $ = (id) => document.getElementById(id);
  const views = [$("library-view"), $("quiz-view"), $("results-view")];

  const shuffle = (items) => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const readProgress = () => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {}; }
    catch { return {}; }
  };

  const writeProgress = (quizId, score, total) => {
    const progress = readProgress();
    const previous = progress[quizId];
    if (!previous || score / total >= previous.score / previous.total) {
      progress[quizId] = { score, total, completedAt: new Date().toISOString() };
      localStorage.setItem(storageKey, JSON.stringify(progress));
    }
  };

  const showView = (view) => {
    views.forEach((item) => item.classList.toggle("hidden", item !== view));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderLibrary = () => {
    const progress = readProgress();
    const library = $("quiz-library");
    library.replaceChildren();

    quizzes.forEach((quiz) => {
      const card = document.createElement("article");
      card.className = "quiz-tile";
      const saved = progress[quiz.id];
      const disabled = quiz.questions.length === 0;
      card.innerHTML = `
        <span class="pill">${quiz.lane}</span>
        <h3>${quiz.title}</h3>
        <p>${quiz.description}</p>
        <div class="quiz-stats">
          <span>${quiz.chapters}</span>
          <span>${quiz.questions.length} question${quiz.questions.length === 1 ? "" : "s"}</span>
        </div>
        ${saved ? `<p class="saved-score">Best: ${saved.score}/${saved.total} (${Math.round(saved.score / saved.total * 100)}%)</p>` : ""}
        <button class="button ${disabled ? "ghost" : "primary"}" type="button" ${disabled ? "disabled" : ""}>
          ${disabled ? quiz.status : "Start shuffled drill"}
        </button>`;
      if (!disabled) card.querySelector("button").addEventListener("click", () => startQuiz(quiz));
      library.append(card);
    });
  };

  const prepareQuestion = (question) => {
    const indices = shuffle(question.choices.map((_, index) => index));
    return { ...question, displayIndices: indices };
  };

  const startQuiz = (quiz, selectedQuestions = null) => {
    state.quiz = quiz;
    state.questions = shuffle(selectedQuestions || quiz.questions).map(prepareQuestion);
    state.index = 0;
    state.score = 0;
    state.answered = false;
    state.responses = [];
    showView($("quiz-view"));
    renderQuestion();
  };

  const renderQuestion = () => {
    const question = state.questions[state.index];
    state.answered = false;
    $("feedback").className = "feedback hidden";
    $("feedback").replaceChildren();
    $("next-question").classList.add("hidden");
    $("check-answer").disabled = false;
    $("progress-label").textContent = `Question ${state.index + 1} of ${state.questions.length}`;
    $("score-label").textContent = `${state.score} correct`;
    $("progress-fill").style.width = `${(state.index / state.questions.length) * 100}%`;
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

  const selectedAnswers = () => [...document.querySelectorAll("#answer-options input:checked")].map((input) => Number(input.value)).sort((a, b) => a - b);
  const normalizedAnswer = (question) => (Array.isArray(question.answer) ? [...question.answer].sort((a, b) => a - b) : [question.answer]);
  const sameAnswers = (left, right) => left.length === right.length && left.every((value, index) => value === right[index]);

  const checkAnswer = (event) => {
    event.preventDefault();
    if (state.answered) return;
    const question = state.questions[state.index];
    const selected = selectedAnswers();
    if (selected.length === 0) {
      $("feedback").className = "feedback bad";
      $("feedback").innerHTML = "<strong>Select an answer first.</strong> Make the retrieval attempt before revealing the explanation.";
      return;
    }

    const correctAnswers = normalizedAnswer(question);
    const correct = sameAnswers(selected, correctAnswers);
    state.answered = true;
    if (correct) state.score += 1;
    state.responses.push({ question, selected, correct });

    document.querySelectorAll("#answer-options input").forEach((input) => {
      input.disabled = true;
      const originalIndex = Number(input.value);
      const label = input.closest("label");
      if (correctAnswers.includes(originalIndex)) label.classList.add("correct");
      else if (input.checked) label.classList.add("incorrect");
    });

    const feedback = $("feedback");
    feedback.className = `feedback ${correct ? "good" : "bad"}`;
    feedback.innerHTML = `<strong>${correct ? "Correct." : "Not yet."}</strong>${question.explanation}`;
    $("score-label").textContent = `${state.score} correct`;
    $("check-answer").disabled = true;
    $("next-question").textContent = state.index === state.questions.length - 1 ? "See results" : "Next question";
    $("next-question").classList.remove("hidden");
  };

  const nextQuestion = () => {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      renderQuestion();
    } else {
      renderResults();
    }
  };

  const renderResults = () => {
    const total = state.questions.length;
    const percent = Math.round((state.score / total) * 100);
    writeProgress(state.quiz.id, state.score, total);
    $("result-score").textContent = `${percent}%`;
    $("result-message").textContent = `${state.score} of ${total} correct. ${percent >= 80 ? "Strong retrieval. Now explain the misses without looking." : "The weak concepts have revealed themselves. Feed them back into the drill."}`;

    const missed = state.responses.filter((response) => !response.correct);
    $("retry-missed").classList.toggle("hidden", missed.length === 0);
    const review = $("missed-review");
    review.replaceChildren();
    missed.forEach(({ question }) => {
      const item = document.createElement("article");
      item.className = "review-item";
      const correct = normalizedAnswer(question).map((index) => question.choices[index]).join("; ");
      item.innerHTML = `<h3>${question.prompt}</h3><p><strong>Correct:</strong> ${correct}</p><p>${question.explanation}</p><small>${question.source}</small>`;
      review.append(item);
    });

    $("retry-missed").onclick = () => startQuiz(state.quiz, missed.map((item) => item.question));
    showView($("results-view"));
    renderLibrary();
  };

  $("answer-form").addEventListener("submit", checkAnswer);
  $("next-question").addEventListener("click", nextQuestion);
  $("back-to-library").addEventListener("click", () => showView($("library-view")));
  $("results-library").addEventListener("click", () => showView($("library-view")));
  $("restart-quiz").addEventListener("click", () => startQuiz(state.quiz));
  $("print-results").addEventListener("click", () => window.print());
  $("clear-progress").addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    renderLibrary();
  });

  renderLibrary();
})();

