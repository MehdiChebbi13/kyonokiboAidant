(() => {
  const { AppData, AppUtils, AppUI } = window;
  AppUI.mountSidebar("dashboard", { fromSubpage: true });

  const state = {
    tasks: AppUtils.clone(AppData.todayTasks)
  };

  const welcomeCard = document.getElementById("welcome-card");
  const kpiRoot = document.getElementById("dashboard-kpis");
  const checklistCard = document.getElementById("checklist-card");
  const nextEventRoot = document.getElementById("next-event");
  const memoryCard = document.getElementById("memory-card");
  const activityCard = document.getElementById("activity-card");

  function getDoneCount() {
    return state.tasks.filter((task) => task.done).length;
  }

  function circleProgressMarkup(value, label, color) {
    const size = 80;
    const stroke = 6;
    const radius = (size - stroke * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return `
      <div style="position:relative;width:${size}px;height:${size}px;flex-shrink:0">
        <svg width="${size}" height="${size}" class="progress-ring">
          <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="var(--primary-light)" stroke-width="${stroke}"></circle>
          <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" style="transition:stroke-dashoffset 1s ease"></circle>
        </svg>
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
          <span style="font-size:${size * 0.24}px;font-weight:700;color:var(--text-primary)">${value}%</span>
          <span style="font-size:${size * 0.14}px;color:var(--text-muted);margin-top:1px">${AppUtils.escapeHtml(label)}</span>
        </div>
      </div>
    `;
  }

  function activitySymbol(icon) {
    if (icon === "check") return "✓";
    if (icon === "quiz") return "?";
    if (icon === "alert") return "!";
    if (icon === "star") return "◆";
    return "•";
  }

  function renderWelcome() {
    const doneCount = getDoneCount();
    welcomeCard.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-size:0.78rem;color:var(--text-muted);font-weight:500;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">${AppUtils.escapeHtml(AppUtils.formatLongDate(new Date()))}</div>
          <h1 style="font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:600;color:#1A2535;margin-bottom:6px">
            Bonjour, Sophie 👋
          </h1>
          <p style="color:var(--text-secondary);font-size:0.9rem">
            Jean a complete son quiz du matin avec un bon score.
            <strong>${doneCount}/${state.tasks.length}</strong> taches accomplies aujourd'hui.
          </p>
        </div>
        <div style="text-align:right">
          <div class="badge badge-green" style="font-size:0.8rem;padding:6px 14px">Journee sereine &#10022;</div>
        </div>
      </div>
    `;
  }

  function renderKpis() {
    const doneCount = getDoneCount();
    kpiRoot.style.display = "grid";
    kpiRoot.style.gridTemplateColumns = "repeat(4, 1fr)";
    kpiRoot.style.gap = "16px";
    kpiRoot.style.marginBottom = "24px";

    const cards = [
      {
        label: "Quiz du jour",
        value: "Termine ✓",
        sub: "Score : 7/10 • 9 min 32 s",
        icon: "📝",
        accent: "var(--primary)"
      },
      {
        label: "Taches du jour",
        value: `${doneCount} / ${state.tasks.length}`,
        sub: `${state.tasks.length - doneCount} restante(s)`,
        icon: "✓",
        accent: "var(--secondary)"
      },
      {
        label: "Taux de reussite",
        value: "68 %",
        sub: "Cette semaine • -4% vs semaine passee",
        icon: "📊",
        accent: "var(--accent)"
      },
      {
        label: "Temps moyen",
        value: AppData.weekStats.avgTime,
        sub: "Par question aujourd'hui",
        icon: "⏱",
        accent: "var(--accent-alt)"
      }
    ];

    kpiRoot.innerHTML = cards
      .map((card) => {
        return `
          <div class="card" style="padding:18px 20px;display:flex;flex-direction:column;gap:12px">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em">${AppUtils.escapeHtml(card.label)}</span>
              <div style="width:34px;height:34px;border-radius:10px;background:color-mix(in srgb, ${card.accent} 14%, white 86%);display:flex;align-items:center;justify-content:center;color:${card.accent};font-size:1rem">
                ${AppUtils.escapeHtml(card.icon)}
              </div>
            </div>
            <div>
              <div style="font-size:1.6rem;font-weight:700;color:#1A2535;font-family:'Cormorant Garamond',serif;line-height:1">${AppUtils.escapeHtml(card.value)}</div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px">${AppUtils.escapeHtml(card.sub)}</div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderChecklist() {
    const doneCount = getDoneCount();
    checklistCard.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
        <h2 style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;color:var(--text-primary)">Checklist du jour</h2>
        <div style="display:flex;gap:6px;align-items:center">
          <div style="width:8px;height:8px;border-radius:50%;background:var(--primary)"></div>
          <span style="font-size:0.78rem;color:var(--text-muted)">${doneCount} / ${state.tasks.length} effectuees</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${state.tasks
      .map((task) => {
        const done = Boolean(task.done);
        const rowBackground = done ? "var(--secondary-light)" : "#f8f9fa";
        const rowBorder = done
          ? "color-mix(in srgb, var(--secondary) 30%, white 70%)"
          : "var(--border)";
        const checkboxBorder = done ? "var(--secondary)" : "var(--text-muted)";
        const checkboxBackground = done ? "var(--secondary)" : "#ffffff";
        const titleColor = done ? "var(--text-muted)" : "var(--text-primary)";

        return `
          <div
            data-task-id="${task.id}"
            style="
              display:flex;
              align-items:center;
              gap:12px;
              padding:11px 14px;
              border-radius:var(--radius-sm);
              background:${rowBackground};
              border:1px solid ${rowBorder};
              cursor:pointer;
              transition:all 0.18s;
              opacity:${done ? "0.75" : "1"};
            "
          >
            <div style="width:20px;height:20px;border-radius:6px;border:2px solid ${checkboxBorder};background:${checkboxBackground};display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.18s">
              ${done ? AppUI.iconHTML("check", { size: 12, color: "white" }) : ""}
            </div>
            <span style="font-size:0.78rem;color:var(--text-muted);font-variant-numeric:tabular-nums;width:36px;flex-shrink:0">${AppUtils.escapeHtml(task.time)}</span>
            <span style="flex:1;font-size:0.88rem;font-weight:500;color:${titleColor};text-decoration:${done ? "line-through" : "none"}">${AppUtils.escapeHtml(task.title)}</span>
            ${task.important ? `<div style="width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0" title="Important"></div>` : ""}
          </div>
        `;
      })
      .join("")}
      </div>
    `;
  }

  function renderNextEvent() {
    const nextEvent = AppUtils
      .clone(AppData.calendarEvents)
      .filter((event) => event.important)
      .find((event) => event.date >= "2025-06-03")
      || AppData.calendarEvents[0];

    if (!nextEvent) {
      nextEventRoot.innerHTML = "<p class='next-event-meta'>Aucun evenement important.</p>";
      return;
    }

    nextEventRoot.innerHTML = `
      <div style="font-size:0.72rem;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px">⚡ Prochain evenement important</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;color:#1A2535;margin-bottom:4px">${AppUtils.escapeHtml(nextEvent.title)}</div>
      <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:8px">
        ${AppUtils.escapeHtml(AppUtils.formatMonthDay(nextEvent.date))} a ${AppUtils.escapeHtml(nextEvent.time)}
      </div>
      <div style="font-size:0.8rem;color:var(--text-muted)">📍 ${AppUtils.escapeHtml(nextEvent.lieu)}</div>
    `;
  }

  function renderMemorySummary() {
    memoryCard.innerHTML = `
      <div style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:600;color:var(--text-primary);margin-bottom:14px">Resume cognitif</div>
      <div style="display:flex;justify-content:space-around;margin-bottom:14px">
        ${circleProgressMarkup(AppData.weekStats.correctRate, "reussite", "var(--secondary)")}
        ${circleProgressMarkup(AppData.weekStats.noHintRate, "sans indice", "var(--primary)")}
        ${circleProgressMarkup(AppData.weekStats.firstTryRate, "1er essai", "var(--accent)")}
      </div>
      <div style="background:#f8f9fa;border-radius:var(--radius-sm);padding:10px 12px;font-size:0.8rem;color:var(--text-secondary)">
        ⏱ Temps moyen : <strong style="color:#6B7A8D">${AppUtils.escapeHtml(AppData.weekStats.avgTime)}</strong> par question
      </div>
    `;
  }

  function renderActivity() {
    activityCard.innerHTML = `
      <h2 style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;color:var(--text-primary);margin-bottom:18px">Activite recente</h2>
      <div style="display:flex;flex-direction:column;gap:0">
        ${AppData.recentActivity
      .map((item, index) => {
        const iconText = activitySymbol(item.icon);
        const hasDivider = index < AppData.recentActivity.length - 1;
        return `
          <div style="display:flex;gap:14px;align-items:flex-start;padding-bottom:${hasDivider ? "14px" : "0"};margin-bottom:${hasDivider ? "14px" : "0"};border-bottom:${hasDivider ? "1px solid var(--primary-light)" : "none"}">
            <div style="width:32px;height:32px;border-radius:10px;background:color-mix(in srgb, ${item.color} 16%, white 84%);display:flex;align-items:center;justify-content:center;font-size:0.85rem;color:${item.color};flex-shrink:0;font-weight:700">
              ${AppUtils.escapeHtml(iconText)}
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:0.87rem;font-weight:500;color:var(--text-primary)">${AppUtils.escapeHtml(item.text)}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);margin-top:2px">${AppUtils.escapeHtml(item.sub)}</div>
            </div>
            <span style="font-size:0.75rem;color:var(--text-muted);flex-shrink:0">${AppUtils.escapeHtml(item.time)}</span>
          </div>
        `;
      })
      .join("")}
      </div>
    `;
  }

  function renderAll() {
    renderWelcome();
    renderKpis();
    renderChecklist();
    renderNextEvent();
    renderMemorySummary();
    renderActivity();
  }

  checklistCard.addEventListener("click", (event) => {
    const taskRow = event.target.closest("[data-task-id]");
    if (!taskRow) {
      return;
    }
    const taskId = Number(taskRow.dataset.taskId);
    state.tasks = state.tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task));
    renderAll();
  });

  renderAll();
})();
