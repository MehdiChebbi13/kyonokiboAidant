(() => {
  const AppData = {
    patient: {
      name: "Jean Martin",
      age: 78,
      diagnosis: "Maladie d'Alzheimer - stade leger",
      since: "Mars 2023"
    },
    caregiver: {
      name: "Sophie Martin",
      role: "Sa fille - Aidante principale",
      email: "sophie.martin@email.com"
    },
    todayTasks: [
      { id: 1, time: "08:30", title: "Medicaments du matin", done: true, important: true },
      { id: 2, time: "10:00", title: "Quiz du jour", done: true, important: false },
      { id: 3, time: "14:30", title: "Kinesitherapie - Dr. Martin", done: false, important: true },
      { id: 4, time: "16:00", title: "Appel de Sophie (fille)", done: false, important: false },
      { id: 5, time: "19:00", title: "Medicaments du soir", done: false, important: true }
    ],
    recentActivity: [
      { id: 1, icon: "check", color: "#9DBFA3", text: "Quiz du jour termine", sub: "Score: 7/10 - 9 min 32 sec", time: "10h42" },
      { id: 2, icon: "quiz", color: "#9DBFA3", text: "Question difficile: Qui est Sophie?", sub: "Quiz personnalise - Famille proche", time: "hier 15h" },
      { id: 3, icon: "check", color: "#9DBFA3", text: "Medicaments du matin pris", sub: "Tache marquee comme realisee", time: "hier 08h" },
      { id: 4, icon: "alert", color: "#E07840", text: "Rendez-vous Dr. Renaud non effectue", sub: "Mercredi 12 mars", time: "il y a 3j" },
      { id: 5, icon: "star", color: "#C4A882", text: "Anniversaire de Claude approche", sub: "Dans 4 jours", time: "il y a 4j" }
    ],
    weekStats: {
      correctRate: 68,
      noHintRate: 45,
      firstTryRate: 52,
      avgTime: "1m 24s",
      totalQuizzes: 5,
      abandoned: 1,
      hintsUsed: 12
    },
    quizList: [
      { id: 1, title: "La famille proche", questions: 8, lastScore: 87, played: 14, cover: "FAM", desc: "Questions sur les proches: Sophie, Claude..." },
      { id: 2, title: "Souvenirs d'enfance", questions: 6, lastScore: 72, played: 9, cover: "FLR", desc: "Les lieux, les odeurs, les moments d'autrefois" },
      { id: 3, title: "La maison et les objets", questions: 10, lastScore: 61, played: 7, cover: "HSE", desc: "Reconnaissance des pieces et objets du quotidien" },
      { id: 4, title: "Les animaux favoris", questions: 5, lastScore: 94, played: 11, cover: "CAT", desc: "Photos d'animaux familiers et favoris" }
    ],
    calendarEvents: [
      { id: 1, title: "Kinesitherapie", date: "2025-06-03", time: "14:30", lieu: "Cabinet Dr. Martin", important: true, color: "#E07840", reminders: ["3h", "1h"] },
      { id: 2, title: "Anniversaire de Claude", date: "2025-06-07", time: "15:00", lieu: "Maison familiale", important: true, color: "#C4A882", reminders: ["1j", "3h"] },
      { id: 3, title: "Consultation neurologie", date: "2025-06-12", time: "10:00", lieu: "Hopital Pasteur, Nice", important: true, color: "#E07840", reminders: ["1j", "1h"] },
      { id: 4, title: "Seance musicotherapie", date: "2025-06-10", time: "11:00", lieu: "Centre de jour", important: false, color: "#9DBFA3", reminders: ["1h"] },
      { id: 5, title: "Visite de Sophie", date: "2025-06-15", time: "14:00", lieu: "Domicile", important: false, color: "#7BA7BC", reminders: ["15m"] },
      { id: 6, title: "Kinesitherapie", date: "2025-06-17", time: "14:30", lieu: "Cabinet Dr. Martin", important: false, color: "#9DBFA3", reminders: ["1h"] },
      { id: 7, title: "Prise de sang", date: "2025-06-20", time: "08:30", lieu: "Laboratoire Pasteur", important: true, color: "#E07840", reminders: ["1j"] },
      { id: 8, title: "Repas en famille", date: "2025-06-22", time: "12:30", lieu: "Restaurant Le Jardin", important: true, color: "#C4A882", reminders: ["1j", "3h"] }
    ],
    statsHistory: [
      { day: "Lu", score: 62, noHint: 40 },
      { day: "Ma", score: 71, noHint: 55 },
      { day: "Me", score: 58, noHint: 38 },
      { day: "Je", score: 75, noHint: 58 },
      { day: "Ve", score: 80, noHint: 65 },
      { day: "Sa", score: 68, noHint: 45 },
      { day: "Di", score: 72, noHint: 50 }
    ],
    quizBreakdown: [
      { name: "La famille proche", score: 87, plays: 14, trend: "up" },
      { name: "Souvenirs d'enfance", score: 72, plays: 9, trend: "flat" },
      { name: "La maison et les objets", score: 61, plays: 7, trend: "down" },
      { name: "Les animaux favoris", score: 94, plays: 11, trend: "up" }
    ],
    insights: [
      { text: "Les quiz sur la famille proche obtiennent les meilleurs scores (+23% vs moyenne)", type: "green" },
      { text: "Le taux de bonnes reponses au premier essai est en baisse cette semaine (52% vs 64%)", type: "peach" },
      { text: "Les questions avec image sont mieux reussies que les questions textuelles (81% vs 58%)", type: "blue" },
      { text: "Jean utilise davantage les indices en apres-midi qu'en matinee", type: "peach" }
    ]
  };

  const NAV_PAGES = [
    { id: "dashboard", label: "Dashboard", href: "dashboard/dashboard.html", icon: "dashboard" },
    { id: "calendar", label: "Calendrier", href: "calendar/calendar.html", icon: "calendar" },
    { id: "quiz", label: "Quiz", href: "quiz/quiz.html", icon: "quiz" },
    { id: "stats", label: "Statistiques", href: "stats/stats.html", icon: "stats" },
    { id: "settings", label: "Parametres", href: "settings/settings.html", icon: "settings" }
  ];

  const ICON_PATHS = {
    dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    quiz: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z",
    calendar: "M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z",
    stats: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z",
    settings: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z",
    check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    plus: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
    trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
    eye: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
    alert: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
    close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
    arrowRight: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
    arrowLeft: "M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6 1.41 1.41z",
    star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    image: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
    lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
    download: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
    logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
    time: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
    location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    hint: "M9 21h6v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function initials(name) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function formatLongDate(date) {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function formatMonthDay(isoDate) {
    const parsed = new Date(`${isoDate}T00:00:00`);
    return parsed.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  }

  function formatMonthLabel(date) {
    return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  }

  function iconHTML(name, options = {}) {
    const size = Number(options.size || 16);
    const color = options.color || "currentColor";
    const className = options.className ? ` ${options.className}` : "";
    const path = ICON_PATHS[name] || ICON_PATHS.dashboard;
    return `
      <svg
        class="icon-svg${className}"
        width="${size}"
        height="${size}"
        viewBox="0 0 24 24"
        fill="currentColor"
        style="color:${escapeHtml(color)}"
        aria-hidden="true"
      >
        <path d="${path}"></path>
      </svg>
    `;
  }

  function hydrateInlineIcons(root = document) {
    Array.from(root.querySelectorAll("[data-app-icon]")).forEach((slot) => {
      const name = slot.dataset.appIcon;
      const size = Number(slot.dataset.appIconSize || 16);
      const color = slot.dataset.appIconColor || "currentColor";
      const className = slot.dataset.appIconClass || "";
      slot.innerHTML = iconHTML(name, { size, color, className });
    });
  }

  function avatarHTML(name, options = {}) {
    const sizeClass = options.sizeClass || "small";
    const bg = options.bg || "var(--primary-light)";
    const color = options.color || "var(--primary-dark)";
    return `<span class="avatar ${sizeClass}" style="background:${bg};color:${color}">${initials(name)}</span>`;
  }

  function kpiCardHTML({ label, value, sub, icon, accent = "var(--primary)" }) {
    return `
      <article class="card kpi-card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
          <span class="kpi-label">${escapeHtml(label)}</span>
          <span class="icon-badge" style="background:color-mix(in srgb, ${accent} 14%, white 86%);color:${accent}">
            ${iconHTML(icon, { size: 16, color: accent })}
          </span>
        </div>
        <div class="kpi-value">${escapeHtml(value)}</div>
        <div class="kpi-sub">${escapeHtml(sub || "")}</div>
      </article>
    `;
  }

  function circleProgressHTML({ value, label, color = "var(--primary)", size = 68, stroke = 7 }) {
    const radius = (size - stroke * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    return `
      <div style="display:flex;align-items:center;gap:10px">
        <div style="position:relative;width:${size}px;height:${size}px;flex-shrink:0">
          <svg width="${size}" height="${size}" class="progress-ring">
            <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="#eaf2f7" stroke-width="${stroke}"></circle>
            <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"></circle>
          </svg>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.84rem">${value}%</div>
        </div>
        ${label ? `<div style="font-size:0.78rem;color:var(--text-secondary)">${escapeHtml(label)}</div>` : ""}
      </div>
    `;
  }

  function barChartHTML(data, height = 150) {
    const max = Math.max(...data.map((item) => Math.max(item.score, item.noHint)));
    const cols = data
      .map((item) => {
        const scoreHeight = Math.max(4, (item.score / max) * (height - 20));
        const hintHeight = Math.max(4, (item.noHint / max) * (height - 20));
        return `
          <div class="chart-col">
            <div class="chart-duo" style="height:${height - 20}px">
              <span class="bar" style="height:${scoreHeight}px"></span>
              <span class="bar low" style="height:${hintHeight}px"></span>
            </div>
            <span class="chart-label">${escapeHtml(item.day)}</span>
          </div>
        `;
      })
      .join("");
    return `<div class="chart-bars" style="height:${height}px">${cols}</div>`;
  }

  function toggleHTML({ checked = false, key = "" }) {
    return `
      <label class="toggle-wrap">
        <input type="checkbox" data-toggle-key="${escapeHtml(key)}" ${checked ? "checked" : ""}>
        <span class="toggle-slider"></span>
      </label>
    `;
  }

  function mountSidebar(activePage, options = {}) {
    const target = document.getElementById(options.targetId || "app-sidebar");
    if (!target) {
      return;
    }

    const fromSubpage = options.fromSubpage !== false;
    const prefix = fromSubpage ? "../" : "";
    const links = NAV_PAGES.map((page) => {
      return `
        <a class="sidebar-link ${page.id === activePage ? "active" : ""}" href="${prefix}${page.href}">
          <span class="nav-icon">${iconHTML(page.icon, { size: 16 })}</span>
          <span>${page.label}</span>
        </a>
      `;
    }).join("");

    target.className = "sidebar";
    target.innerHTML = `
      <div class="brand-wrap">
        <div class="brand-name">Kyo<span>no</span>kibo</div>
        <div class="brand-sub">Espace aidant</div>
      </div>

      <div class="person-pill">
        ${avatarHTML(AppData.patient.name, { bg: "var(--primary-light)", color: "var(--primary-dark)" })}
        <div>
          <div class="person-name">${escapeHtml(AppData.patient.name.split(" ")[0])}</div>
          <div class="person-role">Patient suivi</div>
        </div>
      </div>

      <nav class="sidebar-nav">${links}</nav>

      <div class="caregiver-box">
        ${avatarHTML(AppData.caregiver.name, { bg: "var(--secondary-light)", color: "var(--secondary-dark)" })}
        <div>
          <div class="person-name">${escapeHtml(AppData.caregiver.name.split(" ")[0])}</div>
          <div class="person-role">Aidante</div>
        </div>
      </div>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const todayLabel = document.querySelector("[data-today-label]");
    if (todayLabel) {
      todayLabel.textContent = formatLongDate(new Date());
    }
    hydrateInlineIcons();
  });

  window.AppData = AppData;
  window.AppUtils = {
    clone,
    initials,
    escapeHtml,
    formatLongDate,
    formatMonthDay,
    formatMonthLabel
  };
  window.AppUI = {
    mountSidebar,
    avatarHTML,
    iconHTML,
    hydrateInlineIcons,
    kpiCardHTML,
    circleProgressHTML,
    barChartHTML,
    toggleHTML
  };
})();
