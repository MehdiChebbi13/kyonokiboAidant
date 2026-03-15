(() => {
  const { AppData, AppUtils, AppUI } = window;
  AppUI.mountSidebar("calendar", { fromSubpage: true });

  const state = {
    currentDate: new Date(2025, 5, 1),
    selectedDay: null,
    editingId: null,
    events: AppUtils.clone(AppData.calendarEvents)
  };

  const monthLabel = document.getElementById("month-label");
  const calendarGrid = document.getElementById("calendar-grid");
  const selectedDayPanel = document.getElementById("selected-day-panel");
  const upcomingList = document.getElementById("upcoming-list");

  const openEventModalButton = document.getElementById("open-event-modal");
  const modal = document.getElementById("event-modal");
  const modalTitle = document.getElementById("event-modal-title");
  const closeModalButton = document.getElementById("close-event-modal");
  const cancelEventButton = document.getElementById("cancel-event");
  const eventForm = document.getElementById("event-form");

  function eventDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function getEventsForDay(day) {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const key = eventDateKey(year, month, day);
    return state.events.filter((event) => event.date === key);
  }

  function openModal(event = null, forcedDate = "") {
    state.editingId = event ? event.id : null;
    modalTitle.textContent = event ? "Modifier l'événement" : "Nouvel événement";

    eventForm.title.value = event ? event.title : "";
    eventForm.date.value = event ? event.date : forcedDate;
    eventForm.time.value = event ? event.time : "";
    eventForm.lieu.value = event ? event.lieu : "";
    eventForm.reminders.value = event ? (event.reminders || []).join(", ") : "";
    eventForm.important.checked = Boolean(event && event.important);

    modal.classList.remove("hidden");
  }

  function closeModal() {
    state.editingId = null;
    modal.classList.add("hidden");
    eventForm.reset();
  }

  function renderCalendar() {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirst = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthLabel.textContent = AppUtils.formatMonthLabel(state.currentDate);
    calendarGrid.innerHTML = "";

    for (let blank = 0; blank < adjustedFirst; blank += 1) {
      const empty = document.createElement("div");
      calendarGrid.append(empty);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const events = getEventsForDay(day);
      const hasImportant = events.some((event) => event.important);
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();

      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = [
        "calendar-day",
        events.length ? "has-events" : "",
        state.selectedDay === day ? "selected" : "",
        isToday ? "today" : ""
      ].join(" ");
      cell.dataset.day = String(day);
      cell.innerHTML = `
        <div class="day-number">${day}</div>
        <div class="day-events">
          ${events
            .slice(0, 2)
            .map((event) => `<span class="day-chip ${event.important ? "important" : "normal"}">${AppUtils.escapeHtml(event.title)}</span>`)
            .join("")}
          ${events.length > 2 ? `<span class="day-chip ${hasImportant ? "important" : "normal"}">+${events.length - 2}</span>` : ""}
        </div>
      `;
      calendarGrid.append(cell);
    }
  }

  function renderSelectedDayPanel() {
    if (!state.selectedDay) {
      selectedDayPanel.innerHTML = `
        <div class="day-panel-empty">
          Cliquez sur un jour pour voir les événements.
        </div>
      `;
      return;
    }

    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const day = state.selectedDay;
    const selectedDate = new Date(year, month, day);
    const selectedEvents = getEventsForDay(day);
    const dateForCreation = eventDateKey(year, month, day);

    selectedDayPanel.innerHTML = `
      <h3 class="section-title small" style="margin-bottom:12px">
        ${AppUtils.escapeHtml(
          selectedDate.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long"
          })
        )}
      </h3>

      ${
        selectedEvents.length === 0
          ? `<div class="day-panel-empty">Aucun événement sur cette date.</div>`
          : selectedEvents
              .map((event) => {
                return `
                  <div class="day-event-card ${event.important ? "important" : ""}">
                    ${event.important ? `<span class="badge badge-accent" style="margin-bottom:8px">⚡ Important</span>` : ""}
                    <h4 class="day-event-title">${AppUtils.escapeHtml(event.title)}</h4>
                    <p class="day-event-meta">🕐 ${AppUtils.escapeHtml(event.time || "-")}</p>
                    <p class="day-event-meta">📍 ${AppUtils.escapeHtml(event.lieu || "-")}</p>
                    <div class="day-event-actions">
                      <button class="btn btn-ghost" type="button" data-action="edit" data-id="${event.id}">Modifier</button>
                      <button class="btn btn-danger" type="button" data-action="delete" data-id="${event.id}">Supprimer</button>
                    </div>
                  </div>
                `;
              })
              .join("")
      }

      <button type="button" class="btn btn-primary" style="width:100%;margin-top:8px" data-action="add-here" data-date="${dateForCreation}">
        Ajouter ici
      </button>
    `;
  }

  function renderUpcoming() {
    const important = AppUtils
      .clone(state.events)
      .filter((event) => event.important)
      .sort((left, right) => left.date.localeCompare(right.date))
      .slice(0, 4);

    if (important.length === 0) {
      upcomingList.innerHTML = `<p class="day-event-meta">Aucun événement important.</p>`;
      return;
    }

    upcomingList.innerHTML = important
      .map((event) => {
        return `
          <div class="upcoming-item">
            <time>${AppUtils.escapeHtml(AppUtils.formatMonthDay(event.date))}</time>
            <span>${AppUtils.escapeHtml(event.title)}</span>
          </div>
        `;
      })
      .join("");
  }

  function render() {
    renderCalendar();
    renderSelectedDayPanel();
    renderUpcoming();
  }

  document.getElementById("prev-month").addEventListener("click", () => {
    state.currentDate = new Date(
      state.currentDate.getFullYear(),
      state.currentDate.getMonth() - 1,
      1
    );
    state.selectedDay = null;
    render();
  });

  document.getElementById("next-month").addEventListener("click", () => {
    state.currentDate = new Date(
      state.currentDate.getFullYear(),
      state.currentDate.getMonth() + 1,
      1
    );
    state.selectedDay = null;
    render();
  });

  calendarGrid.addEventListener("click", (event) => {
    const dayButton = event.target.closest("[data-day]");
    if (!dayButton) {
      return;
    }
    const day = Number(dayButton.dataset.day);
    state.selectedDay = state.selectedDay === day ? null : day;
    render();
  });

  selectedDayPanel.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) {
      return;
    }

    const action = target.dataset.action;
    if (action === "add-here") {
      openModal(null, target.dataset.date);
      return;
    }

    const id = Number(target.dataset.id);
    const found = state.events.find((item) => item.id === id);
    if (!found) {
      return;
    }

    if (action === "edit") {
      openModal(found);
    }
    if (action === "delete") {
      state.events = state.events.filter((item) => item.id !== id);
      render();
    }
  });

  openEventModalButton.addEventListener("click", () => {
    let date = "";
    if (state.selectedDay) {
      const y = state.currentDate.getFullYear();
      const m = state.currentDate.getMonth();
      date = eventDateKey(y, m, state.selectedDay);
    }
    openModal(null, date);
  });

  closeModalButton.addEventListener("click", closeModal);
  cancelEventButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(eventForm);
    const reminders = String(formData.get("reminders") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      id: state.editingId || Date.now(),
      title: String(formData.get("title") || "").trim(),
      date: String(formData.get("date") || ""),
      time: String(formData.get("time") || ""),
      lieu: String(formData.get("lieu") || ""),
      important: formData.get("important") === "on",
      color: formData.get("important") === "on" ? "#e07840" : "#9dbfa3",
      reminders
    };

    if (!payload.title) {
      return;
    }

    if (state.editingId) {
      state.events = state.events.map((item) => (item.id === state.editingId ? payload : item));
    } else {
      state.events = [...state.events, payload];
    }

    closeModal();
    render();
  });

  render();
})();
