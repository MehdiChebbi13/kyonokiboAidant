(() => {
  const { AppData, AppUtils, AppUI } = window;
  AppUI.mountSidebar("quiz", { fromSubpage: true });

  const state = {
    tab: "daily",
    editingId: null,
    dailyConfig: { hints: true, truefalse: true, removeFalse: false },
    quizzes: AppUtils.clone(AppData.quizList)
  };

  const tabs = document.getElementById("quiz-tabs");
  const dailySection = document.getElementById("daily-section");
  const customSection = document.getElementById("custom-section");
  const createTop = document.getElementById("create-quiz-top");
  const dailyConfigList = document.getElementById("daily-config-list");
  const dailyFlowList = document.getElementById("daily-flow-list");
  const weekSummaryList = document.getElementById("week-summary-list");
  const dailyQuestionPreview = document.getElementById("daily-question-preview");
  const customCount = document.getElementById("custom-count");
  const customGrid = document.getElementById("custom-quiz-grid");
  const createInline = document.getElementById("create-quiz-inline");
  const quizModal = document.getElementById("quiz-modal");
  const quizModalTitle = document.getElementById("quiz-modal-title");
  const quizForm = document.getElementById("quiz-form");
  const closeQuizModal = document.getElementById("close-quiz-modal");
  const cancelQuizButton = document.getElementById("cancel-quiz");
  const previewModal = document.getElementById("preview-modal");
  const previewTitle = document.getElementById("preview-title");
  const previewContent = document.getElementById("preview-content");
  const closePreview = document.getElementById("close-preview");

  const dailyOptions = [
    { key: "hints", label: "Ajouter des indices", desc: "Un indice apparait apres la premiere mauvaise reponse" },
    { key: "truefalse", label: "Transformer en vrai/faux", desc: "Les questions echouees reviennent en format simplifie" },
    { key: "removeFalse", label: "Supprimer des reponses fausses", desc: "Une mauvaise reponse est retiree apres la deuxieme erreur" }
  ];

  const dailyPreviewLines = [
    { text: "Qui est la fille de Jean ?", ok: true },
    { text: "Dans quelle ville habitiez-vous enfant ?", ok: true },
    { text: "Quel animal avez-vous eu ?", ok: true },
    { text: "Quel jour sommes-nous ?", ok: false }
  ];

  function openQuizModal(quiz = null) {
    state.editingId = quiz ? quiz.id : null;
    quizModalTitle.textContent = quiz ? "Modifier le quiz" : "Nouveau quiz";
    quizForm.title.value = quiz ? quiz.title : "";
    quizForm.desc.value = quiz ? quiz.desc : "";
    quizForm.cover.value = quiz ? quiz.cover : "QZ";
    quizForm.questions.value = quiz ? quiz.questions : 8;
    quizForm.lastScore.value = quiz ? quiz.lastScore : 0;
    quizForm.played.value = quiz ? quiz.played : 0;
    quizModal.classList.remove("hidden");
  }

  function closeModal() {
    state.editingId = null;
    quizForm.reset();
    quizModal.classList.add("hidden");
  }

  function openPreview(quiz) {
    previewTitle.textContent = quiz.title;
    previewContent.innerHTML = `
      <p>${AppUtils.escapeHtml(quiz.desc || "Aucune description.")}</p>
      <div class="preview-metrics">
        <div><strong>${quiz.questions}</strong><span>questions</span></div>
        <div><strong>${quiz.lastScore}%</strong><span>dernier score</span></div>
        <div><strong>${quiz.played}x</strong><span>joue</span></div>
      </div>
      <button class="btn btn-primary" style="width:100%;margin-top:12px">Lancer ce quiz avec Jean</button>
    `;
    previewModal.classList.remove("hidden");
  }

  function closePreviewModal() {
    previewModal.classList.add("hidden");
  }

  function renderTabs() {
    Array.from(tabs.querySelectorAll("[data-tab]")).forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === state.tab);
    });
    const customActive = state.tab === "custom";
    dailySection.classList.toggle("hidden", customActive);
    customSection.classList.toggle("hidden", !customActive);
    createTop.classList.toggle("hidden", !customActive);
  }

  function renderDailyConfig() {
    dailyConfigList.innerHTML = dailyOptions
      .map((option) => `
        <div class="quiz-config-row">
          <div><h4>${AppUtils.escapeHtml(option.label)}</h4><p>${AppUtils.escapeHtml(option.desc)}</p></div>
          ${AppUI.toggleHTML({ checked: state.dailyConfig[option.key], key: option.key })}
        </div>
      `)
      .join("");
  }

  function renderDailyFlow() {
    const flow = [
      { step: 1, text: "Question affichee avec toutes les reponses", active: true },
      { step: 2, text: "1ere erreur -> un indice apparait", active: state.dailyConfig.hints },
      { step: 3, text: "2eme erreur -> suppression d'une mauvaise reponse", active: state.dailyConfig.removeFalse },
      { step: 4, text: "3eme erreur -> passage a la question suivante", active: true },
      { step: 5, text: "Fin du quiz -> questions echouees en vrai/faux", active: state.dailyConfig.truefalse }
    ];

    dailyFlowList.innerHTML = flow
      .map((item) => `
        <div class="flow-step ${item.active ? "active" : ""}" style="${item.active ? "" : "opacity:0.45"}">
          <span class="flow-step-index">${item.step}</span>
          <p>${AppUtils.escapeHtml(item.text)}</p>
        </div>
      `)
      .join("");
  }

  function renderWeekSummary() {
    const summary = [
      ["Quiz completes", "5 / 7"],
      ["Questions posees", "68"],
      ["Score moyen", "68 %"],
      ["Indices utilises", "12"]
    ];
    weekSummaryList.innerHTML = summary.map(([l, v]) => `<div class="week-row"><span>${l}</span><strong>${v}</strong></div>`).join("");
  }

  function renderDailyQuestionPreview() {
    dailyQuestionPreview.innerHTML = dailyPreviewLines
      .map((line) => `
        <div class="quiz-line ${line.ok ? "ok" : "ko"}">
          <i></i>
          <span>${AppUtils.escapeHtml(line.text)}</span>
          <strong>${line.ok ? "Correct" : "Echoue"}</strong>
        </div>
      `)
      .join("");
  }

  function renderCustom() {
    customCount.textContent = `${state.quizzes.length} quiz cree${state.quizzes.length > 1 ? "s" : ""}`;
    if (state.quizzes.length === 0) {
      customGrid.innerHTML = `<article class="card" style="padding:40px;text-align:center;color:var(--text-muted)">Aucun quiz personnalise.</article>`;
      return;
    }

    customGrid.innerHTML = state.quizzes
      .map((quiz) => `
        <article class="card quiz-card">
          <div class="quiz-head">
            <span class="quiz-cover">${AppUtils.escapeHtml(quiz.cover || "QZ")}</span>
            <div>
              <h3 class="quiz-title">${AppUtils.escapeHtml(quiz.title)}</h3>
              <p class="quiz-desc">${AppUtils.escapeHtml(quiz.desc || "")}</p>
            </div>
          </div>
          <div class="quiz-stats">
            <div class="quiz-stat" style="background:#f8fbfe"><strong>${quiz.questions}</strong><span>questions</span></div>
            <div class="quiz-stat" style="background:#eef5ff;color:#4e6579"><strong>${quiz.lastScore}%</strong><span>dernier score</span></div>
            <div class="quiz-stat" style="background:#eef8f1;color:var(--secondary-dark)"><strong>${quiz.played}</strong><span>parties</span></div>
          </div>
          <div class="quiz-actions">
            <button class="btn btn-ghost" data-action="preview" data-id="${quiz.id}">Apercu</button>
            <button class="btn btn-ghost" data-action="edit" data-id="${quiz.id}">Modifier</button>
            <button class="btn btn-danger" data-action="delete" data-id="${quiz.id}">Suppr.</button>
          </div>
        </article>
      `)
      .join("");
  }

  function render() {
    renderTabs();
    renderDailyConfig();
    renderDailyFlow();
    renderWeekSummary();
    renderDailyQuestionPreview();
    renderCustom();
  }

  tabs.addEventListener("click", (event) => {
    const tabButton = event.target.closest("[data-tab]");
    if (!tabButton) return;
    state.tab = tabButton.dataset.tab;
    render();
  });

  dailyConfigList.addEventListener("change", (event) => {
    const toggle = event.target.closest("[data-toggle-key]");
    if (!toggle) return;
    state.dailyConfig[toggle.dataset.toggleKey] = toggle.checked;
    renderDailyFlow();
  });

  [createInline, createTop].forEach((button) => button.addEventListener("click", () => openQuizModal(null)));

  customGrid.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.action;
    const id = Number(actionButton.dataset.id);
    const quiz = state.quizzes.find((item) => item.id === id);
    if (!quiz) return;

    if (action === "preview") openPreview(quiz);
    if (action === "edit") openQuizModal(quiz);
    if (action === "delete") {
      state.quizzes = state.quizzes.filter((item) => item.id !== id);
      renderCustom();
    }
  });

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(quizForm);
    const payload = {
      id: state.editingId || Date.now(),
      title: String(formData.get("title") || "").trim(),
      desc: String(formData.get("desc") || "").trim(),
      cover: String(formData.get("cover") || "QZ").trim(),
      questions: Number(formData.get("questions") || 0),
      lastScore: Number(formData.get("lastScore") || 0),
      played: Number(formData.get("played") || 0)
    };

    if (!payload.title) return;

    if (state.editingId) {
      state.quizzes = state.quizzes.map((quiz) => (quiz.id === state.editingId ? payload : quiz));
    } else {
      state.quizzes = [...state.quizzes, payload];
    }

    closeModal();
    renderCustom();
  });

  closeQuizModal.addEventListener("click", closeModal);
  cancelQuizButton.addEventListener("click", closeModal);
  quizModal.addEventListener("click", (event) => {
    if (event.target === quizModal) closeModal();
  });

  closePreview.addEventListener("click", closePreviewModal);
  previewModal.addEventListener("click", (event) => {
    if (event.target === previewModal) closePreviewModal();
  });

  render();
})();
