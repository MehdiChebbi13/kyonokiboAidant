(() => {
  const { AppData, AppUtils, AppUI } = window;
  AppUI.mountSidebar("quiz", { fromSubpage: true });

  const COVER_EMOJIS = [
    "👨‍👩‍👧‍👦",
    "🌸",
    "🏡",
    "🐱",
    "🎵",
    "🌿",
    "☀️",
    "🎨",
    "📸",
    "🍰",
    "🌻",
    "🐦",
    "🚗",
    "📚",
    "⛵",
    "🎭",
  ];
  const BUILDER_STEPS = [
    "Informations",
    "Questions",
    "Configuration",
    "Apercu",
  ];
  const DEFAULT_QUIZ_CONFIG = {
    hints: true,
    truefalse: false,
    removeFalse: false,
  };
  const LEGACY_COVER_TOKEN_MAP = {
    FAM: 0,
    FLR: 1,
    HSE: 2,
    CAT: 3,
  };
  const BUILDER_CONFIG_OPTIONS = [
    {
      key: "hints",
      label: "Ajouter des indices",
      desc: "Un indice est disponible apres la premiere erreur",
      badge: "Indices",
      tone: "blue",
    },
    {
      key: "truefalse",
      label: "Transformer en vrai/faux",
      desc: "Les questions ratees reviennent en fin de quiz au format vrai/faux",
      badge: "Vrai/Faux",
      tone: "gray",
    },
    {
      key: "removeFalse",
      label: "Supprimer des reponses fausses",
      desc: "Une mauvaise reponse disparait apres la deuxieme erreur",
      badge: "Elimination",
      tone: "peach",
    },
  ];
  const QUESTION_TYPES = [
    { id: "text-text", label: "Texte -> Texte", icon: "📝" },
    { id: "text-image", label: "Texte -> Images", icon: "📝🖼" },
    { id: "image-text", label: "Image -> Texte", icon: "🖼📝" },
  ];
  const PRESET_QUIZ_DETAILS = {
    1: {
      config: { hints: true, truefalse: true, removeFalse: false },
      questions: [
        {
          type: "text-text",
          text: "Qui est le fils de Marguerite ?",
          answers: ["Pierre", "Claude", "Sophie", "Julien"],
          correct: 0,
          hint: "Il vient souvent le week-end.",
        },
        {
          type: "text-text",
          text: "Qui appelle souvent Marguerite le dimanche ?",
          answers: ["Pierre", "Le medecin", "La voisine", "Le pharmacien"],
          correct: 0,
          hint: "C'est un proche de la famille.",
        },
        {
          type: "text-text",
          text: "Quel lien a Sophie avec Marguerite ?",
          answers: ["Sa fille", "Sa cousine", "Sa soeur", "Sa voisine"],
          correct: 0,
          hint: "C'est l'aidante principale.",
        },
      ],
    },
    2: {
      config: { hints: true, truefalse: false, removeFalse: true },
      questions: [
        {
          type: "text-text",
          text: "Dans quelle ville habitiez-vous enfant ?",
          answers: ["Nice", "Lyon", "Lille", "Bordeaux"],
          correct: 0,
          hint: "La mer n'etait jamais loin.",
        },
        {
          type: "text-image",
          text: "Quelle fleur rappelle le jardin de votre enfance ?",
          answers: ["", "", "", ""],
          correct: 1,
          hint: "Elle revient au printemps.",
        },
        {
          type: "text-text",
          text: "Quel souvenir revient avec l'odeur des gateaux ?",
          answers: [
            "Les dimanches en famille",
            "L'ecole",
            "Le marche",
            "Le cinema",
          ],
          correct: 0,
          hint: "Cela se passait souvent a la maison.",
        },
      ],
    },
    3: {
      config: { hints: false, truefalse: true, removeFalse: true },
      questions: [
        {
          type: "image-text",
          text: "",
          answers: ["La cuisine", "Le salon", "La chambre", "Le jardin"],
          correct: 0,
          hint: "On y prepare les repas.",
        },
        {
          type: "text-text",
          text: "Ou rangez-vous habituellement vos lunettes ?",
          answers: [
            "Dans l'entree",
            "Sur le bureau",
            "Dans la salle de bain",
            "Dans la cuisine",
          ],
          correct: 1,
          hint: "Pres du fauteuil de lecture.",
        },
        {
          type: "image-text",
          text: "",
          answers: [
            "Le vase bleu",
            "Le cadre photo",
            "La lampe",
            "Le coussin vert",
          ],
          correct: 0,
          hint: "Objet decoratif place sur le meuble du salon.",
        },
      ],
    },
    4: {
      config: { hints: true, truefalse: true, removeFalse: false },
      questions: [
        {
          type: "image-text",
          text: "",
          answers: ["Le chat", "Le lapin", "Le chien", "Le cheval"],
          correct: 0,
          hint: "Il aimait dormir pres de la fenetre.",
        },
        {
          type: "text-image",
          text: "Retrouvez l'animal prefere de Marguerite.",
          answers: ["", "", "", ""],
          correct: 2,
          hint: "Il ronronne souvent.",
        },
        {
          type: "text-text",
          text: "Quel animal avait un collier rouge ?",
          answers: ["Le chat", "Le poisson", "L'oiseau", "Le lapin"],
          correct: 0,
          hint: "On le voit souvent sur les photos de famille.",
        },
      ],
    },
  };

  let questionSeed = 1000;

  const state = {
    tab: "daily",
    editingId: null,
    dailyConfig: {
      hints: true,
      truefalse: true,
      removeFalse: false,
    },
    quizzes: AppUtils.clone(AppData.quizList).map(normalizeQuiz),
    builder: null,
  };

  const tabs = document.getElementById("quiz-tabs");
  const dailySection = document.getElementById("daily-section");
  const customSection = document.getElementById("custom-section");
  const dailyConfigList = document.getElementById("daily-config-list");
  const dailyFlowList = document.getElementById("daily-flow-list");
  const weekSummaryList = document.getElementById("week-summary-list");
  const dailyQuestionPreview = document.getElementById(
    "daily-question-preview",
  );
  const customCount = document.getElementById("custom-count");
  const customGrid = document.getElementById("custom-quiz-grid");
  const createInline = document.getElementById("create-quiz-inline");
  const quizModal = document.getElementById("quiz-modal");
  const quizModalTitle = document.getElementById("quiz-modal-title");
  const quizForm = document.getElementById("quiz-form");
  const closeQuizModal = document.getElementById("close-quiz-modal");
  const builderStepbar = document.getElementById("quiz-builder-stepbar");
  const builderContent = document.getElementById("quiz-builder-content");
  const builderActions = document.getElementById("quiz-builder-actions");

  const previewModal = document.getElementById("preview-modal");
  const previewTitle = document.getElementById("preview-title");
  const previewContent = document.getElementById("preview-content");
  const closePreview = document.getElementById("close-preview");

  const dailyOptions = [
    {
      key: "hints",
      label: "Ajouter des indices",
      desc: "Affiche un indice pour aider l’accueilli après une erreur.",
    },
    {
      key: "truefalse",
      label: "Transformer en vrai / faux",
      desc: "Reprend en fin de quiz les questions échouées au format vrai/faux.",
    },
    {
      key: "removeFalse",
      label: "Supprimer des réponses fausses",
      desc: "Retire une mauvaise réponse pour faciliter le choix après une erreur.",
    },
  ];

  const dailyPreviewLines = [
    { text: "Qui est la fille de Jean ?", ok: true },
    { text: "Dans quelle ville habitiez-vous enfant ?", ok: true },
    { text: "Quel animal avez-vous eu ?", ok: true },
    { text: "Quel jour sommes-nous ?", ok: false },
  ];

  function nextQuestionId() {
    questionSeed += 1;
    return questionSeed;
  }

  function getNextQuizId() {
    return (
      state.quizzes.reduce(
        (max, quiz) => Math.max(max, Number(quiz.id) || 0),
        0,
      ) + 1
    );
  }

  function isQuestionImage(type) {
    return String(type || "").startsWith("image");
  }

  function isAnswerImage(type) {
    return String(type || "").endsWith("image");
  }

  function getQuestionTypeMeta(type) {
    return QUESTION_TYPES.find((item) => item.id === type) || QUESTION_TYPES[0];
  }

  function normalizeConfig(config) {
    return {
      hints:
        typeof config?.hints === "boolean"
          ? config.hints
          : DEFAULT_QUIZ_CONFIG.hints,
      truefalse:
        typeof config?.truefalse === "boolean"
          ? config.truefalse
          : DEFAULT_QUIZ_CONFIG.truefalse,
      removeFalse:
        typeof config?.removeFalse === "boolean"
          ? config.removeFalse
          : DEFAULT_QUIZ_CONFIG.removeFalse,
    };
  }

  function normalizeQuizCover(rawQuiz = {}) {
    const token = String(rawQuiz.cover || "")
      .trim()
      .toUpperCase();

    if (Object.prototype.hasOwnProperty.call(LEGACY_COVER_TOKEN_MAP, token)) {
      const coverFromToken = COVER_EMOJIS[LEGACY_COVER_TOKEN_MAP[token]];
      if (coverFromToken) {
        return coverFromToken;
      }
    }

    const providedCover = String(rawQuiz.cover || rawQuiz.emoji || "").trim();
    if (providedCover) {
      return providedCover;
    }

    return "📝";
  }

  function normalizeQuestion(question = {}) {
    const answers = Array.isArray(question.answers)
      ? question.answers.slice(0, 4).map((answer) => String(answer || ""))
      : [];

    while (answers.length < 4) {
      answers.push("");
    }

    const correctIndex = Number.isInteger(question.correct)
      ? question.correct
      : Number(question.correct || 0);
    const safeCorrect = Math.min(
      3,
      Math.max(0, Number.isNaN(correctIndex) ? 0 : correctIndex),
    );
    const type = getQuestionTypeMeta(question.type).id;

    return {
      id: question.id || nextQuestionId(),
      type,
      text: String(question.text || ""),
      answers,
      correct: safeCorrect,
      hint: String(question.hint || ""),
    };
  }

  function createQuestion(overrides = {}) {
    return normalizeQuestion({
      id: nextQuestionId(),
      type: "text-text",
      text: "",
      answers: ["", "", "", ""],
      correct: 0,
      hint: "",
      ...overrides,
    });
  }

  function createFallbackQuestion(title, index) {
    return createQuestion({
      text: `Question ${index + 1}`,
      answers: [
        `Reponse A${index + 1}`,
        `Reponse B${index + 1}`,
        `Reponse C${index + 1}`,
        `Reponse D${index + 1}`,
      ],
      correct: 0,
      hint: title ? `Indice lie au quiz ${title}.` : "",
    });
  }

  function buildSeedQuestions(rawQuiz) {
    const count = Math.max(1, Number(rawQuiz.questions) || 1);
    const preset = PRESET_QUIZ_DETAILS[rawQuiz.id];
    const presetQuestions = preset?.questions
      ? preset.questions.map((question) => normalizeQuestion(question))
      : [];
    const questions = [];

    for (let index = 0; index < count; index += 1) {
      const presetQuestion = presetQuestions[index];
      questions.push(
        presetQuestion
          ? normalizeQuestion(AppUtils.clone(presetQuestion))
          : createFallbackQuestion(rawQuiz.title, index),
      );
    }

    return questions;
  }

  function normalizeQuiz(rawQuiz) {
    const preset = PRESET_QUIZ_DETAILS[rawQuiz.id];
    const sourceQuestions = Array.isArray(rawQuiz.questionItems)
      ? rawQuiz.questionItems
      : Array.isArray(rawQuiz.questions)
        ? rawQuiz.questions
        : buildSeedQuestions(rawQuiz);
    const questionItems = sourceQuestions.map((question) =>
      normalizeQuestion(question),
    );

    return {
      id: rawQuiz.id || getNextQuizId(),
      title: String(rawQuiz.title || "Sans titre"),
      desc: String(rawQuiz.desc || ""),
      cover: normalizeQuizCover(rawQuiz),
      questionItems,
      questions: questionItems.length,
      config: normalizeConfig(rawQuiz.config || preset?.config),
      lastScore: Number(rawQuiz.lastScore || 0),
      played: Number(rawQuiz.played || 0),
    };
  }

  function cloneQuestionList(questions) {
    return questions.map((question) =>
      normalizeQuestion(AppUtils.clone(question)),
    );
  }

  function getQuestionCount(quiz) {
    return Array.isArray(quiz.questionItems)
      ? quiz.questionItems.length
      : Math.max(0, Number(quiz.questions) || 0);
  }

  function getConfigBadges(config) {
    return BUILDER_CONFIG_OPTIONS.filter(
      (option) => normalizeConfig(config)[option.key],
    ).map((option) => ({ label: option.badge, tone: option.tone }));
  }

  function renderConfigPills(config) {
    const badges = getConfigBadges(config);

    if (badges.length === 0) {
      return '<span class="quiz-config-pill muted">Mode simple</span>';
    }

    return badges
      .map(
        (badge) =>
          `<span class="quiz-config-pill ${badge.tone}">${AppUtils.escapeHtml(badge.label)}</span>`,
      )
      .join("");
  }

  function renderPreviewBadges(config, questionCount) {
    const badges = [
      `<span class="badge badge-green">${questionCount} question${questionCount > 1 ? "s" : ""}</span>`,
    ];

    getConfigBadges(config).forEach((badge) => {
      badges.push(
        `<span class="badge badge-${badge.tone}">${AppUtils.escapeHtml(badge.label)}</span>`,
      );
    });

    return badges.join("");
  }

  function formatQuestionCopy(question) {
    return question.text || "(Question image)";
  }

  function formatAnswerCopy(question, answerIndex) {
    const answer = String(question.answers[answerIndex] || "").trim();

    if (answer) {
      return answer;
    }

    return isAnswerImage(question.type)
      ? `Image ${answerIndex + 1}`
      : `Reponse ${answerIndex + 1}`;
  }

  function buildConfigSummary(config) {
    const labels = getConfigBadges(config).map((badge) =>
      badge.label.toLowerCase(),
    );
    return labels.length > 0
      ? `Aides actives : ${AppUtils.escapeHtml(labels.join(", "))}.`
      : "Mode simple sans aide automatique.";
  }

  function updateBuilderQuestion(questionId, updater) {
    state.builder.questions = state.builder.questions.map((question) => {
      if (question.id !== questionId) {
        return question;
      }

      return normalizeQuestion(
        typeof updater === "function"
          ? updater(question)
          : { ...question, ...updater },
      );
    });
  }

  function openQuizModal(quiz = null) {
    state.editingId = quiz ? quiz.id : null;
    state.builder = {
      step: 1,
      title: quiz ? quiz.title : "",
      desc: quiz ? quiz.desc || "" : "",
      emoji: quiz ? quiz.cover || "📝" : "📝",
      questions: quiz
        ? cloneQuestionList(quiz.questionItems)
        : [createQuestion()],
      config: quiz ? normalizeConfig(quiz.config) : { ...DEFAULT_QUIZ_CONFIG },
    };

    quizModal.classList.remove("hidden");
    renderBuilder();
  }

  function closeModal() {
    state.editingId = null;
    state.builder = null;
    quizModal.classList.add("hidden");
    builderStepbar.innerHTML = "";
    builderContent.innerHTML = "";
    builderActions.innerHTML = "";
  }

  function openPreview(quiz) {
    const questionCount = getQuestionCount(quiz);
    previewTitle.textContent = quiz.title;
    previewContent.innerHTML = `
      <div class="preview-hero">
        <div class="preview-hero-top">
          <div class="preview-hero-icon">${AppUtils.escapeHtml(quiz.cover || "📝")}</div>
          <div class="preview-hero-copy">
            <h3>${AppUtils.escapeHtml(quiz.title)}</h3>
            <p>${AppUtils.escapeHtml(quiz.desc || "Quiz sans description.")}</p>
          </div>
        </div>
        <div class="preview-metrics">
          <div>
            <strong>${questionCount}</strong>
            <span>questions</span>
          </div>
          <div>
            <strong>${quiz.lastScore}%</strong>
            <span>dernier score</span>
          </div>
          <div>
            <strong>${quiz.played}x</strong>
            <span>parties</span>
          </div>
        </div>
        <div class="preview-badges">${renderPreviewBadges(quiz.config, questionCount)}</div>
      </div>
      <p class="preview-note">${buildConfigSummary(quiz.config)}</p>
      <div class="preview-questions">
        ${quiz.questionItems
          .map((question, index) => {
            const type = getQuestionTypeMeta(question.type);
            return `
              <article class="preview-question-item">
                <div class="preview-question-meta">
                  <strong>Q${index + 1}</strong>
                  <span class="preview-question-type">${AppUtils.escapeHtml(type.label)}</span>
                </div>
                <p class="preview-question-copy">${AppUtils.escapeHtml(formatQuestionCopy(question))}</p>
                <div class="preview-answer-grid">
                  ${question.answers
                    .map((answer, answerIndex) => {
                      const isCorrect = answerIndex === question.correct;
                      return `
                        <div class="preview-answer ${isCorrect ? "correct" : ""}">
                          ${AppUtils.escapeHtml(formatAnswerCopy(question, answerIndex))}${isCorrect ? " ✓" : ""}
                        </div>
                      `;
                    })
                    .join("")}
                </div>
                ${question.hint ? `<div class="builder-preview-hint">💡 ${AppUtils.escapeHtml(question.hint)}</div>` : ""}
              </article>
            `;
          })
          .join("")}
      </div>
    `;
    previewModal.classList.remove("hidden");
  }

  function closePreviewModal() {
    previewModal.classList.add("hidden");
    previewContent.innerHTML = "";
  }

  function renderTabs() {
    Array.from(tabs.querySelectorAll("[data-tab]")).forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === state.tab);
    });
    const customActive = state.tab === "custom";
    dailySection.classList.toggle("hidden", customActive);
    customSection.classList.toggle("hidden", !customActive);
  }

  function renderDailyConfig() {
    dailyConfigList.innerHTML = dailyOptions
      .map(
        (option) => `
        <div class="quiz-config-row">
          <div><h4>${AppUtils.escapeHtml(option.label)}</h4><p>${AppUtils.escapeHtml(option.desc)}</p></div>
          ${AppUI.toggleHTML({ checked: state.dailyConfig[option.key], key: option.key })}
        </div>
      `,
      )
      .join("");
  }

  function renderDailyFlow() {
    const flow = [
      {
        step: 1,
        text: "Question affichée avec toutes les réponses",
        active: true,
      },
      {
        step: 2,
        text: "1re erreur → un indice apparaît",
        active: state.dailyConfig.hints,
      },
      {
        step: 3,
        text: "Une mauvaise réponse est supprimée (après l’indice si celui-ci est activé)",
        active: state.dailyConfig.removeFalse,
      },
      {
        step: 4,
        text: " Erreur suivante → passage à la question suivante",
        active: true,
      },
      {
        step: 5,
        text: "Fin du quiz → questions échouées en vrai/faux",
        active: state.dailyConfig.truefalse,
      },
    ];

    dailyFlowList.innerHTML = flow
      .map(
        (item) => `
        <div class="flow-step ${item.active ? "active" : ""}" style="${item.active ? "" : "opacity:0.45"}">
          <span class="flow-step-index">${item.step}</span>
          <p>${AppUtils.escapeHtml(item.text)}</p>
        </div>
      `,
      )
      .join("");
  }

  function renderWeekSummary() {
    const summary = [
      ["Quiz complétés", "5 / 7"],
      ["Questions posées", "68"],
      ["Score moyen", "68 %"],
      ["Indices utilisés", "12"],
    ];

    weekSummaryList.innerHTML = summary
      .map(
        ([label, value]) =>
          `<div class="week-row"><span>${AppUtils.escapeHtml(label)}</span><strong>${AppUtils.escapeHtml(value)}</strong></div>`,
      )
      .join("");
  }

  function renderDailyQuestionPreview() {
    const previewLines = dailyPreviewLines
      .map((line) => {
        return `
          <div class="quiz-line ${line.ok ? "ok" : "ko"}">
            <i></i>
            <span>${AppUtils.escapeHtml(line.text)}</span>
            <strong>${line.ok ? "Correct" : "Echoue"}</strong>
          </div>
        `;
      })
      .join("");

    dailyQuestionPreview.innerHTML = `${previewLines}<div class="quiz-line more"><span>+ 6 autres questions</span></div>`;
  }

  function renderCustom() {
    customCount.textContent = `${state.quizzes.length} quiz crée${state.quizzes.length > 1 ? "s" : ""}`;

    if (state.quizzes.length === 0) {
      customGrid.innerHTML = `
        <article class="card quiz-empty-state">
          <div style="font-size:3rem;margin-bottom:12px">📝</div>
          <strong>Aucun quiz personnalisé</strong>
          <div>Cliquez sur "Créer un quiz" pour commencer.</div>
        </article>
      `;
      return;
    }

    customGrid.innerHTML = state.quizzes
      .map((quiz) => {
        const questionCount = getQuestionCount(quiz);

        return `
          <article class="card quiz-card">
            <div class="quiz-head">
              <span class="quiz-cover">${AppUtils.escapeHtml(quiz.cover || "📝")}</span>
              <div>
                <h3 class="quiz-title">${AppUtils.escapeHtml(quiz.title)}</h3>
                <p class="quiz-desc">${AppUtils.escapeHtml(quiz.desc || "Quiz sans description.")}</p>
              </div>
            </div>
            <div class="quiz-stats">
              <div class="quiz-stat" style="background:#f8fbfe">
                <strong>${questionCount}</strong>
                <span>questions</span>
              </div>
              <div class="quiz-stat" style="background:#eef5ff;color:#4e6579">
                <strong>${quiz.lastScore}%</strong>
                <span>dernier score</span>
              </div>
              <div class="quiz-stat" style="background:#eef8f1;color:var(--secondary-dark)">
                <strong>${quiz.played}</strong>
                <span>parties</span>
              </div>
            </div>
            <div class="quiz-badges">${renderConfigPills(quiz.config)}</div>
            <div class="quiz-actions">
              <button class="btn btn-ghost" data-action="preview" data-id="${quiz.id}" type="button">
                <span class="btn-label">
                  ${AppUI.iconHTML("eye", { size: 13 })}
                  <span>Aperçu</span>
                </span>
              </button>
              <button class="btn btn-ghost" data-action="edit" data-id="${quiz.id}" type="button">
                <span class="btn-label">
                  ${AppUI.iconHTML("edit", { size: 13 })}
                  <span>Modifier</span>
                </span>
              </button>
              <button
                class="btn btn-danger quiz-delete-btn"
                data-action="delete"
                data-id="${quiz.id}"
                type="button"
                aria-label="Supprimer le quiz"
                title="Supprimer"
              >
                <span class="btn-label">
                  ${AppUI.iconHTML("trash", { size: 13 })}
                </span>
              </button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderBuilderStepbar() {
    return BUILDER_STEPS.map((label, index) => {
      const stepNumber = index + 1;
      const statusClass =
        stepNumber < state.builder.step
          ? "step-done"
          : stepNumber === state.builder.step
            ? "step-active"
            : "step-todo";
      const indicator =
        stepNumber < state.builder.step ? "✓" : String(stepNumber);
      const canNavigate = stepNumber < state.builder.step;
      const stepControl = canNavigate
        ? `
            <button class="step-link clickable" data-builder-nav-step="${stepNumber}" type="button">
              <span class="step-indicator ${statusClass}">${indicator}</span>
              <span class="step-label">${AppUtils.escapeHtml(label)}</span>
            </button>
          `
        : `
            <div class="step-link ${stepNumber === state.builder.step ? "current" : ""}">
              <span class="step-indicator ${statusClass}">${indicator}</span>
              <span class="step-label">${AppUtils.escapeHtml(label)}</span>
            </div>
          `;

      return `
          <div class="builder-step">
            ${stepControl}
            ${index < BUILDER_STEPS.length - 1 ? `<span class="step-line ${stepNumber < state.builder.step ? "done" : ""}"></span>` : ""}
          </div>
        `;
    }).join("");
  }

  function renderBuilderInfoStep() {
    return `
      <section class="builder-section">
        <h3 class="builder-heading">Informations generales</h3>
        <div class="builder-field">
          <label class="label">Titre du quiz *</label>
          <input class="input-field" data-builder-field="title" placeholder="Ex : La famille proche" value="${AppUtils.escapeHtml(state.builder.title)}" autofocus>
          <div class="builder-inline-note ${state.builder.title.trim() ? "hidden" : ""}" data-title-validation>Le titre est obligatoire pour continuer.</div>
        </div>
        <div class="builder-field">
          <label class="label">Description courte (optionnel)</label>
          <textarea class="input-field" data-builder-field="desc" placeholder="Decrivez brievement ce quiz..." style="min-height:70px">${AppUtils.escapeHtml(state.builder.desc)}</textarea>
        </div>
        <div class="builder-field">
          <label class="label">Icone de couverture</label>
          <div class="emoji-grid">
            ${COVER_EMOJIS.map((emoji) => {
              return `
                  <button class="emoji-chip ${state.builder.emoji === emoji ? "selected" : ""}" data-builder-action="emoji" data-emoji="${AppUtils.escapeHtml(emoji)}" type="button">
                    ${AppUtils.escapeHtml(emoji)}
                  </button>
                `;
            }).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderQuestionCard(question, index) {
    return `
      <article class="builder-question-card">
        <div class="builder-question-head">
          <span class="builder-question-label">Question ${index + 1}</span>
          <div class="builder-question-controls">
            <div class="builder-question-types">
              ${QUESTION_TYPES.map((type) => {
                return `
                    <button
                      class="question-type-btn ${question.type === type.id ? "selected" : ""}"
                      data-builder-action="type"
                      data-question-id="${question.id}"
                      data-type="${type.id}"
                      title="${AppUtils.escapeHtml(type.label)}"
                      type="button"
                    >
                      ${AppUtils.escapeHtml(type.icon)}
                    </button>
                  `;
              }).join("")}
            </div>
            ${
              state.builder.questions.length > 1
                ? `<button class="btn btn-danger" data-builder-action="remove-question" data-question-id="${question.id}" type="button">Suppr.</button>`
                : ""
            }
          </div>
        </div>
        ${
          isQuestionImage(question.type)
            ? `
            <div class="upload-zone">
              <div style="font-size:1.5rem">🖼️</div>
              <strong>Image de la question</strong>
              <span>Zone de media prete. Le branchement d'upload reste a connecter.</span>
            </div>
          `
            : `
            <input
              class="input-field"
              data-question-field="text"
              data-question-id="${question.id}"
              placeholder="Enonce de la question..."
              value="${AppUtils.escapeHtml(question.text)}"
              style="margin-bottom:12px"
            >
          `
        }
        <div class="answer-grid">
          ${question.answers
            .map((answer, answerIndex) => {
              const isCorrect = answerIndex === question.correct;

              return `
                <div class="answer-slot ${isCorrect ? "correct" : ""}">
                  <button
                    class="answer-correct-btn"
                    data-builder-action="set-correct"
                    data-question-id="${question.id}"
                    data-answer-index="${answerIndex}"
                    title="Marquer comme bonne reponse"
                    type="button"
                  ></button>
                  ${
                    isAnswerImage(question.type)
                      ? `<div class="answer-image-box">📷 Reponse ${answerIndex + 1}</div>`
                      : `
                      <input
                        class="answer-text"
                        data-question-id="${question.id}"
                        data-answer-index="${answerIndex}"
                        placeholder="Reponse ${answerIndex + 1}${answerIndex === 0 ? " (bonne reponse)" : ""}"
                        value="${AppUtils.escapeHtml(answer)}"
                      >
                    `
                  }
                </div>
              `;
            })
            .join("")}
        </div>
        <input
          class="input-field"
          data-question-field="hint"
          data-question-id="${question.id}"
          placeholder="Indice (optionnel)..."
          value="${AppUtils.escapeHtml(question.hint)}"
          style="font-size:0.82rem"
        >
      </article>
    `;
  }

  function renderBuilderQuestionsStep() {
    return `
      <section class="builder-section">
        <div class="builder-questions-top">
          <h3 class="builder-heading" style="margin-bottom:0">Questions (${state.builder.questions.length})</h3>
          <button class="btn btn-primary" data-builder-action="add-question" type="button">Ajouter</button>
        </div>
        <div class="builder-question-list">
          ${state.builder.questions.map((question, index) => renderQuestionCard(question, index)).join("")}
        </div>
      </section>
    `;
  }

  function renderBuilderConfigStep() {
    return `
      <section class="builder-section">
        <h3 class="builder-heading">Configuration du quiz</h3>
        ${BUILDER_CONFIG_OPTIONS.map((option) => {
          return `
              <div class="builder-config-row">
                <div>
                  <strong>${AppUtils.escapeHtml(option.label)}</strong>
                  <span>${AppUtils.escapeHtml(option.desc)}</span>
                </div>
                <label class="toggle-wrap">
                  <input type="checkbox" data-builder-config-key="${option.key}" ${state.builder.config[option.key] ? "checked" : ""}>
                  <span class="toggle-slider"></span>
                </label>
              </div>
            `;
        }).join("")}
      </section>
    `;
  }

  function renderBuilderPreviewStep() {
    return `
      <section class="builder-section">
        <h3 class="builder-heading">Apercu du quiz</h3>
        <div class="builder-preview-card">
          <div class="builder-preview-head">
            <div class="builder-preview-emoji">${AppUtils.escapeHtml(state.builder.emoji || "📝")}</div>
            <div>
              <h4 class="builder-preview-title">${AppUtils.escapeHtml(state.builder.title || "Sans titre")}</h4>
              ${state.builder.desc ? `<p class="builder-preview-desc">${AppUtils.escapeHtml(state.builder.desc)}</p>` : ""}
            </div>
          </div>
          <div class="builder-preview-badges">${renderPreviewBadges(state.builder.config, state.builder.questions.length)}</div>
        </div>
        <div class="builder-preview-list">
          ${state.builder.questions
            .map((question, index) => {
              const type = getQuestionTypeMeta(question.type);
              return `
                <article class="builder-preview-item">
                  <div class="builder-preview-meta">
                    <strong>Q${index + 1}</strong>
                    <span class="builder-preview-type">${AppUtils.escapeHtml(type.label)}</span>
                  </div>
                  <p class="builder-preview-question">${AppUtils.escapeHtml(formatQuestionCopy(question))}</p>
                  <div class="builder-preview-answer-grid">
                    ${question.answers
                      .map((answer, answerIndex) => {
                        const isCorrect = answerIndex === question.correct;
                        return `
                          <div class="builder-preview-answer ${isCorrect ? "correct" : ""}">
                            ${AppUtils.escapeHtml(formatAnswerCopy(question, answerIndex))}${isCorrect ? " ✓" : ""}
                          </div>
                        `;
                      })
                      .join("")}
                  </div>
                  ${question.hint ? `<div class="builder-preview-hint">💡 ${AppUtils.escapeHtml(question.hint)}</div>` : ""}
                </article>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderBuilderContent() {
    switch (state.builder.step) {
      case 1:
        return renderBuilderInfoStep();
      case 2:
        return renderBuilderQuestionsStep();
      case 3:
        return renderBuilderConfigStep();
      case 4:
      default:
        return renderBuilderPreviewStep();
    }
  }

  function canAdvanceBuilder() {
    return state.builder.step !== 1 || state.builder.title.trim().length > 0;
  }

  function renderBuilderActionsMarkup() {
    const canAdvance = canAdvanceBuilder();

    return `
      <button class="btn btn-secondary" data-builder-action="back" type="button">
        ${state.builder.step > 1 ? "&larr; Retour" : "Annuler"}
      </button>
      ${
        state.builder.step < 4
          ? `
          <button class="btn btn-primary ${canAdvance ? "" : "is-disabled"}" data-builder-action="next" type="button" ${canAdvance ? "" : "disabled"}>
            Continuer &rarr;
          </button>
        `
          : `
          <button class="btn btn-primary" type="submit">
            ${state.editingId ? "Enregistrer les modifications" : "Creer le quiz"}
          </button>
        `
      }
    `;
  }

  function renderBuilder() {
    if (!state.builder) {
      return;
    }

    quizModalTitle.textContent = state.editingId
      ? "Modifier le quiz"
      : "Nouveau quiz";
    builderStepbar.innerHTML = renderBuilderStepbar();
    builderContent.innerHTML = renderBuilderContent();
    builderActions.innerHTML = renderBuilderActionsMarkup();
  }

  function syncTitleValidation() {
    const validationNote = builderContent.querySelector(
      "[data-title-validation]",
    );
    if (validationNote) {
      validationNote.classList.toggle(
        "hidden",
        state.builder.title.trim().length > 0,
      );
    }
  }

  function refreshBuilderActions() {
    if (!state.builder) {
      return;
    }

    builderActions.innerHTML = renderBuilderActionsMarkup();
  }

  function buildQuizPayload() {
    const existingQuiz = state.quizzes.find(
      (quiz) => quiz.id === state.editingId,
    );

    return normalizeQuiz({
      id: state.editingId || getNextQuizId(),
      title: state.builder.title.trim(),
      desc: state.builder.desc.trim(),
      cover: state.builder.emoji || "📝",
      questionItems: cloneQuestionList(state.builder.questions).map(
        (question) => ({
          ...question,
          text: question.text.trim(),
          answers: question.answers.map((answer) =>
            String(answer || "").trim(),
          ),
          hint: question.hint.trim(),
        }),
      ),
      config: normalizeConfig(state.builder.config),
      lastScore: existingQuiz ? existingQuiz.lastScore : 0,
      played: existingQuiz ? existingQuiz.played : 0,
    });
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
    if (!tabButton) {
      return;
    }

    state.tab = tabButton.dataset.tab;
    renderTabs();
  });

  dailyConfigList.addEventListener("change", (event) => {
    const toggle = event.target;
    if (!toggle || !toggle.matches("[data-toggle-key]")) {
      return;
    }

    state.dailyConfig[toggle.dataset.toggleKey] = toggle.checked;
    renderDailyFlow();
  });

  [createInline].forEach((button) =>
    button.addEventListener("click", () => openQuizModal(null)),
  );

  customGrid.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) {
      return;
    }

    const action = actionButton.dataset.action;
    const id = Number(actionButton.dataset.id);
    const quiz = state.quizzes.find((item) => item.id === id);

    if (!quiz) {
      return;
    }

    if (action === "preview") {
      openPreview(quiz);
      return;
    }

    if (action === "edit") {
      openQuizModal(quiz);
      return;
    }

    if (action === "delete") {
      state.quizzes = state.quizzes.filter((item) => item.id !== id);
      renderCustom();
    }
  });

  quizForm.addEventListener("click", (event) => {
    if (!state.builder) {
      return;
    }

    const stepButton = event.target.closest("[data-builder-nav-step]");
    if (stepButton) {
      state.builder.step = Number(stepButton.dataset.builderNavStep);
      renderBuilder();
      return;
    }

    const actionButton = event.target.closest("[data-builder-action]");
    if (!actionButton) {
      return;
    }

    event.preventDefault();

    switch (actionButton.dataset.builderAction) {
      case "emoji":
        state.builder.emoji = actionButton.dataset.emoji;
        renderBuilder();
        break;
      case "add-question":
        state.builder.questions = [
          ...state.builder.questions,
          createQuestion(),
        ];
        renderBuilder();
        break;
      case "remove-question": {
        const questionId = Number(actionButton.dataset.questionId);
        if (state.builder.questions.length > 1) {
          state.builder.questions = state.builder.questions.filter(
            (question) => question.id !== questionId,
          );
          renderBuilder();
        }
        break;
      }
      case "type": {
        const questionId = Number(actionButton.dataset.questionId);
        updateBuilderQuestion(questionId, (question) => ({
          ...question,
          type: actionButton.dataset.type,
        }));
        renderBuilder();
        break;
      }
      case "set-correct": {
        const questionId = Number(actionButton.dataset.questionId);
        const answerIndex = Number(actionButton.dataset.answerIndex);
        updateBuilderQuestion(questionId, (question) => ({
          ...question,
          correct: answerIndex,
        }));
        renderBuilder();
        break;
      }
      case "back":
        if (state.builder.step > 1) {
          state.builder.step -= 1;
          renderBuilder();
        } else {
          closeModal();
        }
        break;
      case "next":
        if (canAdvanceBuilder()) {
          state.builder.step += 1;
          renderBuilder();
        }
        break;
      default:
        break;
    }
  });

  quizForm.addEventListener("input", (event) => {
    if (!state.builder) {
      return;
    }

    const target = event.target;

    if (target.matches("[data-builder-field='title']")) {
      state.builder.title = target.value;
      syncTitleValidation();
      refreshBuilderActions();
      return;
    }

    if (target.matches("[data-builder-field='desc']")) {
      state.builder.desc = target.value;
      return;
    }

    if (target.matches("[data-question-field='text']")) {
      const questionId = Number(target.dataset.questionId);
      updateBuilderQuestion(questionId, (question) => ({
        ...question,
        text: target.value,
      }));
      return;
    }

    if (target.matches("[data-question-field='hint']")) {
      const questionId = Number(target.dataset.questionId);
      updateBuilderQuestion(questionId, (question) => ({
        ...question,
        hint: target.value,
      }));
      return;
    }

    if (target.matches("[data-answer-index]")) {
      const questionId = Number(target.dataset.questionId);
      const answerIndex = Number(target.dataset.answerIndex);
      updateBuilderQuestion(questionId, (question) => ({
        ...question,
        answers: question.answers.map((answer, index) =>
          index === answerIndex ? target.value : answer,
        ),
      }));
    }
  });

  quizForm.addEventListener("change", (event) => {
    if (!state.builder) {
      return;
    }

    const target = event.target;
    if (!target.matches("[data-builder-config-key]")) {
      return;
    }

    state.builder.config[target.dataset.builderConfigKey] = target.checked;
  });

  quizForm.addEventListener("keydown", (event) => {
    if (!state.builder || state.builder.step === 4) {
      return;
    }

    if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
      event.preventDefault();
    }
  });

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!state.builder) {
      return;
    }

    if (!state.builder.title.trim()) {
      state.builder.step = 1;
      renderBuilder();
      return;
    }

    const payload = buildQuizPayload();

    if (state.editingId) {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz.id === state.editingId ? payload : quiz,
      );
    } else {
      state.quizzes = [...state.quizzes, payload];
    }

    closeModal();
    renderCustom();
  });

  closeQuizModal.addEventListener("click", closeModal);
  quizModal.addEventListener("click", (event) => {
    if (event.target === quizModal) closeModal();
  });

  closePreview.addEventListener("click", closePreviewModal);
  previewModal.addEventListener("click", (event) => {
    if (event.target === previewModal) closePreviewModal();
  });

  render();
})();
