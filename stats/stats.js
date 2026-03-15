(() => {
  const { AppData, AppUtils, AppUI } = window;
  AppUI.mountSidebar("stats", { fromSubpage: true });

  const CHART_COLOR = "#7BA7BC";
  const state = { chartRange: "week" };

  const WEEK_LABELS = {
    Lu: "Lun",
    Ma: "Mar",
    Me: "Mer",
    Je: "Jeu",
    Ve: "Ven",
    Sa: "Sam",
    Di: "Dim"
  };

  const CHART_RANGES = [
    { key: "week", label: "7j" },
    { key: "month", label: "30j" },
    { key: "all", label: "Tout" }
  ];

  const CHART_DATASETS = {
    week: AppData.statsHistory.map((item) => ({
      label: WEEK_LABELS[item.day] || item.day,
      v: item.score
    })),
    month: [
      { label: "J1", v: 48 },
      { label: "J5", v: 56 },
      { label: "J9", v: 61 },
      { label: "J13", v: 58 },
      { label: "J17", v: 67 },
      { label: "J21", v: 74 },
      { label: "J25", v: 70 },
      { label: "J30", v: 82 }
    ],
    all: [
      { label: "Jan", v: 42 },
      { label: "Fev", v: 50 },
      { label: "Mar", v: 57 },
      { label: "Avr", v: 61 },
      { label: "Mai", v: 68 },
      { label: "Juin", v: 63 },
      { label: "Juil", v: 72 },
      { label: "Aout", v: 79 },
      { label: "Sep", v: 74 },
      { label: "Oct", v: 83 },
      { label: "Nov", v: 88 },
      { label: "Dec", v: 85 }
    ]
  };

  const WEEKLY_SUMMARY = [
    { week: "Semaine 1", avg: 52 },
    { week: "Semaine 2", avg: 67 },
    { week: "Semaine 3", avg: 76 },
    { week: "Semaine 4", avg: 81 }
  ];

  const kpisRoot = document.getElementById("stats-kpis");
  const chartRangeTabsRoot = document.getElementById("chart-range-tabs");
  const lineChartRoot = document.getElementById("line-chart-root");
  const weeklySummaryRoot = document.getElementById("weekly-summary");
  const ringsRoot = document.getElementById("rings-root");
  const breakdownBody = document.getElementById("breakdown-body");
  const indicatorsRoot = document.getElementById("indicators-root");
  const insightsRoot = document.getElementById("insights-root");

  function renderKpis() {
    const cards = [
      { label: "Taux de reussite", value: `${AppData.weekStats.correctRate} %`, sub: "down -4% vs semaine passee", icon: "stats", accent: "var(--primary)" },
      { label: "Sans indice", value: `${AppData.weekStats.noHintRate} %`, sub: "up +2% vs semaine passee", icon: "hint", accent: "var(--secondary)" },
      { label: "Premier essai", value: `${AppData.weekStats.firstTryRate} %`, sub: "down -12% vs semaine passee", icon: "check", accent: "var(--accent)" },
      { label: "Temps moyen", value: AppData.weekStats.avgTime, sub: "up +8s vs semaine passee", icon: "time", accent: "var(--accent-alt)" }
    ];
    kpisRoot.innerHTML = cards.map((card) => AppUI.kpiCardHTML(card)).join("");
  }

  function renderChartRangeTabs() {
    chartRangeTabsRoot.innerHTML = CHART_RANGES
      .map((range) => {
        const activeClass = range.key === state.chartRange ? "active" : "inactive";
        return `<button class="chart-range-tab ${activeClass}" data-range="${range.key}" type="button">${range.label}</button>`;
      })
      .join("");
  }

  function getWeeklyClass(avg) {
    if (avg >= 75) return "weekly-good";
    if (avg >= 50) return "weekly-mid";
    return "weekly-low";
  }

  function renderWeeklySummary() {
    weeklySummaryRoot.innerHTML = WEEKLY_SUMMARY
      .map((week) => {
        return `
          <div class="weekly-item">
            <div class="weekly-label">${AppUtils.escapeHtml(week.week)}</div>
            <div class="weekly-value ${getWeeklyClass(week.avg)}">${week.avg}%</div>
          </div>
        `;
      })
      .join("");
  }

  function renderLineChart(data, color = CHART_COLOR, height = 190) {
    const width = 560;
    const padL = 36;
    const padR = 16;
    const padT = 12;
    const padB = 28;
    const innerW = width - padL - padR;
    const innerH = height - padT - padB;
    const labelStep = data.length > 8 ? 2 : 1;

    const xs = data.map((_, index) => {
      if (data.length === 1) {
        return padL + innerW / 2;
      }

      return padL + (index / (data.length - 1)) * innerW;
    });

    const ys = data.map((item) => padT + ((100 - item.v) / 100) * innerH);
    const path = xs.map((x, index) => `${index === 0 ? "M" : "L"}${x},${ys[index]}`).join(" ");
    const area = `${path} L${xs[xs.length - 1]},${height - padB} L${xs[0]},${height - padB} Z`;
    const gridLines = [0, 25, 50, 75, 100];

    return `
      <svg viewBox="0 0 ${width} ${height}" aria-label="Graphique des scores">
        <defs>
          <linearGradient id="score-line-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.18"></stop>
            <stop offset="100%" stop-color="${color}" stop-opacity="0"></stop>
          </linearGradient>
        </defs>

        ${gridLines
          .map((value) => {
            const y = padT + ((100 - value) / 100) * innerH;
            return `
              <g>
                <line
                  x1="${padL}"
                  y1="${y}"
                  x2="${width - padR}"
                  y2="${y}"
                  stroke="#F0F4F8"
                  stroke-width="1"
                  stroke-dasharray="4 4"
                ></line>
                <text
                  x="${padL - 6}"
                  y="${y + 4}"
                  font-size="10"
                  fill="#C0CDD8"
                  text-anchor="end"
                >${value}</text>
              </g>
            `;
          })
          .join("")}

        <path d="${area}" fill="url(#score-line-gradient)"></path>
        <path
          d="${path}"
          fill="none"
          stroke="${color}"
          stroke-width="2.5"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>

        ${xs
          .map((x, index) => {
            const showLabel = index % labelStep === 0 || index === data.length - 1;
            return `
              <g>
                <circle
                  cx="${x}"
                  cy="${ys[index]}"
                  r="5"
                  fill="#ffffff"
                  stroke="${color}"
                  stroke-width="2.5"
                ></circle>
                ${showLabel
                  ? `
                    <text
                      x="${x}"
                      y="${height - padB + 16}"
                      font-size="10"
                      fill="#B0BEC5"
                      text-anchor="middle"
                    >${AppUtils.escapeHtml(data[index].label)}</text>
                  `
                  : ""}
              </g>
            `;
          })
          .join("")}
      </svg>
    `;
  }

  function renderLineChartPanel() {
    renderChartRangeTabs();
    lineChartRoot.innerHTML = renderLineChart(CHART_DATASETS[state.chartRange], CHART_COLOR, 190);
    renderWeeklySummary();
  }

  function renderRings() {
    const ringData = [
      { label: "Questions texte", correct: 58, color: "var(--primary)" },
      { label: "Questions image", correct: 81, color: "var(--secondary)" },
      { label: "Avec indice", correct: 74, color: "var(--accent-alt)" },
      { label: "Apres erreur", correct: 62, color: "var(--accent)" }
    ];

    ringsRoot.innerHTML = ringData
      .map((item) => {
        return `
          <div class="ring-item">
            ${AppUI.circleProgressHTML({ value: item.correct, color: item.color, size: 58, stroke: 6 })}
            <p>
              <strong>${AppUtils.escapeHtml(item.label)}</strong>
              <span>de bonnes rep.</span>
            </p>
          </div>
        `;
      })
      .join("");
  }

  function scoreColor(score) {
    if (score > 80) return "var(--primary)";
    if (score > 65) return "var(--secondary)";
    return "var(--accent)";
  }

  function trendClass(trend) {
    if (trend === "up") return "up";
    if (trend === "down") return "down";
    return "flat";
  }

  function trendLabel(trend) {
    if (trend === "up") return "UP";
    if (trend === "down") return "DOWN";
    return "MID";
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
            <span class="trend ${trendClass(row.trend)}">${trendLabel(row.trend)}</span>
          </div>
        `;
      })
      .join("");
  }

  function renderIndicators() {
    const indicators = [
      ["Quiz completes", `${AppData.weekStats.totalQuizzes} / 7`],
      ["Quiz abandonnes", `${AppData.weekStats.abandoned}`],
      ["Indices utilises", `${AppData.weekStats.hintsUsed}`],
      ["Questions transformees en V/F", "8"],
      ["Temps total moyen / quiz", "9 min"],
      ["Questions les plus difficiles", "Famille elargie"]
    ];

    indicatorsRoot.innerHTML = indicators.map(([label, value]) => `<div class="indicator-row"><span>${label}</span><strong>${value}</strong></div>`).join("");
  }

  function renderInsights() {
    insightsRoot.innerHTML = AppData.insights
      .map((insight) => `<article class="insight ${insight.type}">${AppUtils.escapeHtml(insight.text)}</article>`)
      .join("");
  }

  function renderAll() {
    renderKpis();
    renderLineChartPanel();
    renderRings();
    renderBreakdown();
    renderIndicators();
    renderInsights();
  }

  chartRangeTabsRoot.addEventListener("click", (event) => {
    const rangeButton = event.target.closest("[data-range]");
    if (!rangeButton) {
      return;
    }

    state.chartRange = rangeButton.dataset.range;
    renderLineChartPanel();
  });

  renderAll();
})();
