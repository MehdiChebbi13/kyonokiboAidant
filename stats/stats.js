(() => {
  const { AppData, AppUtils, AppUI } = window;
  AppUI.mountSidebar("stats", { fromSubpage: true });

  const state = {
    period: "7j"
  };

  const periodSwitch = document.getElementById("period-switch");
  const kpisRoot = document.getElementById("stats-kpis");
  const barsRoot = document.getElementById("bars-root");
  const ringsRoot = document.getElementById("rings-root");
  const breakdownBody = document.getElementById("breakdown-body");
  const indicatorsRoot = document.getElementById("indicators-root");
  const insightsRoot = document.getElementById("insights-root");

  function renderPeriodButtons() {
    Array.from(periodSwitch.querySelectorAll("[data-period]")).forEach((button) => {
      button.classList.toggle("active", button.dataset.period === state.period);
    });
  }

  function renderKpis() {
    const cards = [
      {
        label: "Taux de réussite",
        value: `${AppData.weekStats.correctRate} %`,
        sub: "↓ −4% vs semaine passée",
        icon: "🎯",
        accent: "var(--secondary)"
      },
      {
        label: "Sans indice",
        value: `${AppData.weekStats.noHintRate} %`,
        sub: "↑ +2% vs semaine passée",
        icon: "💡",
        accent: "var(--primary)"
      },
      {
        label: "Premier essai",
        value: `${AppData.weekStats.firstTryRate} %`,
        sub: "↓ −12% vs semaine passée",
        icon: "⚡",
        accent: "var(--accent)"
      },
      {
        label: "Temps moyen",
        value: AppData.weekStats.avgTime,
        sub: "↑ +8s vs semaine passée",
        icon: "⏱",
        accent: "var(--accent-alt)"
      }
    ];

    kpisRoot.innerHTML = cards.map((card) => AppUI.kpiCardHTML(card)).join("");
  }

  function renderBars() {
    barsRoot.innerHTML = AppUI.barChartHTML(AppData.statsHistory, 155);
  }

  function renderRings() {
    const ringData = [
      { label: "Questions texte", correct: 58, color: "var(--secondary)" },
      { label: "Questions image", correct: 81, color: "var(--primary)" },
      { label: "Avec indice", correct: 74, color: "var(--accent-alt)" },
      { label: "Après erreur", correct: 62, color: "var(--accent)" }
    ];

    ringsRoot.innerHTML = ringData
      .map((item) => {
        return `
          <div class="ring-item">
            ${AppUI.circleProgressHTML({ value: item.correct, color: item.color, size: 58, stroke: 6 })}
            <p>
              <strong>${AppUtils.escapeHtml(item.label)}</strong>
              <span>de bonnes rép.</span>
            </p>
          </div>
        `;
      })
      .join("");
  }

  function scoreColor(score) {
    if (score > 80) {
      return "var(--secondary)";
    }
    if (score > 65) {
      return "var(--primary)";
    }
    return "var(--accent)";
  }

  function trendClass(trend) {
    if (trend === "↑") {
      return "up";
    }
    if (trend === "↓") {
      return "down";
    }
    return "flat";
  }

  function renderBreakdown() {
    breakdownBody.innerHTML = AppData.quizBreakdown
      .map((row) => {
        return `
          <div class="breakdown-row">
            <span class="breakdown-name">${AppUtils.escapeHtml(row.name)}</span>
            <span class="score-line">
              <span class="score-bar">
                <span class="score-fill" style="width:${row.score}%;background:${scoreColor(row.score)}"></span>
              </span>
              <strong>${row.score}%</strong>
            </span>
            <span class="breakdown-plays">${row.plays}x</span>
            <span class="trend ${trendClass(row.trend)}">${AppUtils.escapeHtml(row.trend)}</span>
          </div>
        `;
      })
      .join("");
  }

  function renderIndicators() {
    const indicators = [
      ["Quiz complétés", `${AppData.weekStats.totalQuizzes} / 7`],
      ["Quiz abandonnés", `${AppData.weekStats.abandoned}`],
      ["Indices utilisés", `${AppData.weekStats.hintsUsed}`],
      ["Questions transformées en V/F", "8"],
      ["Temps total moyen / quiz", "9 min"],
      ["Questions les + difficiles", "Famille élargie"]
    ];

    indicatorsRoot.innerHTML = indicators
      .map(([label, value]) => `<div class="indicator-row"><span>${label}</span><strong>${value}</strong></div>`)
      .join("");
  }

  function renderInsights() {
    insightsRoot.innerHTML = AppData.insights
      .map((insight) => `<article class="insight ${insight.type}">${AppUtils.escapeHtml(insight.text)}</article>`)
      .join("");
  }

  function renderAll() {
    renderPeriodButtons();
    renderKpis();
    renderBars();
    renderRings();
    renderBreakdown();
    renderIndicators();
    renderInsights();
  }

  periodSwitch.addEventListener("click", (event) => {
    const periodButton = event.target.closest("[data-period]");
    if (!periodButton) {
      return;
    }
    state.period = periodButton.dataset.period;
    renderPeriodButtons();
  });

  renderAll();
})();
