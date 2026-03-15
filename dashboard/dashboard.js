(() => {
  const { AppData, AppUtils, AppUI } = window;
  AppUI.mountSidebar("dashboard", { fromSubpage: true });

  const state = {
    tasks: AppUtils.clone(AppData.todayTasks)
  };

  const welcomeCard = document.getElementById("welcome-card");
  const kpiRoot = document.getElementById("dashboard-kpis");
  const taskCount = document.getElementById("task-count");
  const taskList = document.getElementById("task-list");
  const nextEventRoot = document.getElementById("next-event");
  const memoryRoot = document.getElementById("memory-rings");
  const activityRoot = document.getElementById("activity-list");
  const avgTime = document.getElementById("avg-time");

  function getDoneCount() {
    return state.tasks.filter((task) => task.done).length;
  }

  function renderWelcome() {
    const doneCount = getDoneCount();
    welcomeCard.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
        <div>
          <div class="welcome-date">${AppUtils.escapeHtml(AppUtils.formatLongDate(new Date()))}</div>
          <h2 class="welcome-title">Bonjour, Sophie</h2>
          <p class="welcome-copy">
            Jean a complete son quiz du matin avec un bon score.
            <strong>${doneCount}/${state.tasks.length}</strong> taches accomplies aujourd'hui.
          </p>
        </div>
        <span class="badge badge-green">Journee sereine</span>
      </div>
    `;
  }

  function renderKpis() {
    const doneCount = getDoneCount();
    const cards = [
      { label: "Quiz du jour", value: "Termine", sub: "Score: 7/10 - 9 min 32 s", icon: "QZ", accent: "var(--primary)" },
      { label: "Taches du jour", value: `${doneCount} / ${state.tasks.length}`, sub: `${state.tasks.length - doneCount} restante(s)`, icon: "OK", accent: "var(--primary)" },
      { label: "Taux de reussite", value: "68 %", sub: "Cette semaine -4% vs semaine passee", icon: "ST", accent: "var(--accent)" },
      { label: "Temps moyen", value: AppData.weekStats.avgTime, sub: "Par question aujourd'hui", icon: "TM", accent: "var(--accent-alt)" }
    ];
    kpiRoot.innerHTML = cards.map((card) => AppUI.kpiCardHTML(card)).join("");
  }

  function renderTasks() {
    const doneCount = getDoneCount();
    taskCount.textContent = `${doneCount} / ${state.tasks.length} effectuees`;
    taskList.innerHTML = state.tasks
      .map((task) => {
        return `
          <div class="task-item ${task.done ? "done" : ""}">
            <button class="task-toggle" data-task-id="${task.id}" aria-label="toggle"></button>
            <span class="task-time">${AppUtils.escapeHtml(task.time)}</span>
            <span class="task-title">${AppUtils.escapeHtml(task.title)}</span>
            ${task.important ? `<span class="task-dot" title="Important"></span>` : ""}
          </div>
        `;
      })
      .join("");
  }

  function renderNextEvent() {
    const nextImportant = AppUtils
      .clone(AppData.calendarEvents)
      .filter((event) => event.important)
      .sort((left, right) => left.date.localeCompare(right.date))[0];

    if (!nextImportant) {
      nextEventRoot.innerHTML = "<p class='next-event-meta'>Aucun evenement important.</p>";
      return;
    }

    nextEventRoot.innerHTML = `
      <div class="next-event-label">Prochain evenement important</div>
      <h3 class="next-event-title">${AppUtils.escapeHtml(nextImportant.title)}</h3>
      <div class="next-event-meta">
        ${AppUtils.escapeHtml(AppUtils.formatMonthDay(nextImportant.date))} a ${AppUtils.escapeHtml(nextImportant.time)}
      </div>
      <div class="next-event-place">Lieu: ${AppUtils.escapeHtml(nextImportant.lieu)}</div>
    `;
  }

  function renderMemorySummary() {
    memoryRoot.innerHTML = [
      AppUI.circleProgressHTML({ value: AppData.weekStats.correctRate, label: "reussite", color: "var(--primary)", size: 62 }),
      AppUI.circleProgressHTML({ value: AppData.weekStats.noHintRate, label: "sans indice", color: "var(--secondary)", size: 62 }),
      AppUI.circleProgressHTML({ value: AppData.weekStats.firstTryRate, label: "1er essai", color: "var(--accent)", size: 62 })
    ].join("");
    avgTime.textContent = AppData.weekStats.avgTime;
  }

  function renderActivity() {
    activityRoot.innerHTML = AppData.recentActivity
      .map((item) => {
        return `
          <div class="activity-item">
            <span class="activity-icon" style="color:${item.color};background:color-mix(in srgb, ${item.color} 16%, white 84%)">${AppUtils.escapeHtml(item.icon)}</span>
            <div class="activity-text">
              <strong>${AppUtils.escapeHtml(item.text)}</strong>
              <span>${AppUtils.escapeHtml(item.sub)}</span>
            </div>
            <span class="activity-time">${AppUtils.escapeHtml(item.time)}</span>
          </div>
        `;
      })
      .join("");
  }

  function renderAll() {
    renderWelcome();
    renderKpis();
    renderTasks();
    renderNextEvent();
    renderMemorySummary();
    renderActivity();
  }

  taskList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-task-id]");
    if (!button) {
      return;
    }
    const taskId = Number(button.dataset.taskId);
    state.tasks = state.tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task));
    renderAll();
  });

  renderAll();
})();
