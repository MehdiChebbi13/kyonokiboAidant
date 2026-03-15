(() => {
  const AppData = {
    patient: {
      name: "Marguerite Fontaine",
      age: 78,
      diagnosis: "Maladie d'Alzheimer – stade léger",
      since: "Mars 2023"
    },
    caregiver: {
      name: "Sophie Fontaine",
      role: "Fille – Aidante principale",
      email: "sophie.fontaine@email.com"
    },
    todayTasks: [
      { id: 1, time: "08:30", title: "Médicaments du matin", done: true, important: true },
      { id: 2, time: "10:00", title: "Quiz du jour", done: true, important: false },
      { id: 3, time: "14:30", title: "Kinésithérapie – Dr. Martin", done: false, important: true },
      { id: 4, time: "16:00", title: "Appel de Pierre (fils)", done: false, important: false },
      { id: 5, time: "19:00", title: "Médicaments du soir", done: false, important: true }
    ],
    recentActivity: [
      { id: 1, icon: "✓", color: "#9DBFA3", text: "Quiz du jour terminé", sub: "Score : 7/10 • 9 min 32 sec", time: "10h42" },
      { id: 2, icon: "?", color: "#9DBFA3", text: "Question difficile : « Qui est Pierre ? »", sub: "Quiz personnalisé – Famille proche", time: "hier 15h" },
      { id: 3, icon: "✓", color: "#9DBFA3", text: "Médicaments du matin pris", sub: "Tâche marquée comme réalisée", time: "hier 08h" },
      { id: 4, icon: "!", color: "#E07840", text: "Rendez-vous Dr. Renaud non effectué", sub: "Mercredi 12 mars", time: "il y a 3j" },
      { id: 5, icon: "◆", color: "#C4A882", text: "Anniversaire de Claude approche", sub: "Dans 4 jours", time: "il y a 4j" }
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
      {
        id: 1,
        title: "La famille proche",
        questions: 8,
        lastScore: 87,
        played: 14,
        cover: "👨‍👩‍👧‍👦",
        desc: "Questions sur les proches : Pierre, Claude, Sophie…"
      },
      {
        id: 2,
        title: "Souvenirs d'enfance",
        questions: 6,
        lastScore: 72,
        played: 9,
        cover: "🌸",
        desc: "Les lieux, les odeurs, les moments d'autrefois"
      },
      {
        id: 3,
        title: "La maison et les objets",
        questions: 10,
        lastScore: 61,
        played: 7,
        cover: "🏡",
        desc: "Reconnaître les pièces, objets du quotidien"
      },
      {
        id: 4,
        title: "Les animaux favoris",
        questions: 5,
        lastScore: 94,
        played: 11,
        cover: "🐱",
        desc: "Photos d'animaux familiers et favoris"
      }
    ],
    calendarEvents: [
      { id: 1, title: "Kinésithérapie", date: "2025-06-03", time: "14:30", lieu: "Cabinet Dr. Martin", important: true, color: "#E07840", reminders: ["3h", "1h"] },
      { id: 2, title: "Anniversaire de Claude", date: "2025-06-07", time: "15:00", lieu: "Maison familiale", important: true, color: "#C4A882", reminders: ["1j", "3h"] },
      { id: 3, title: "Consultation neurologie", date: "2025-06-12", time: "10:00", lieu: "Hôpital Pasteur, Nice", important: true, color: "#E07840", reminders: ["1j", "1h"] },
      { id: 4, title: "Séance musicothérapie", date: "2025-06-10", time: "11:00", lieu: "Centre de jour", important: false, color: "#9DBFA3", reminders: ["1h"] },
      { id: 5, title: "Visite de Sophie", date: "2025-06-15", time: "14:00", lieu: "Domicile", important: false, color: "#7BA7BC", reminders: ["15m"] },
      { id: 6, title: "Kinésithérapie", date: "2025-06-17", time: "14:30", lieu: "Cabinet Dr. Martin", important: false, color: "#9DBFA3", reminders: ["1h"] },
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
      { name: "La famille proche", score: 87, plays: 14, trend: "↑" },
      { name: "Souvenirs d'enfance", score: 72, plays: 9, trend: "→" },
      { name: "La maison et les objets", score: 61, plays: 7, trend: "↓" },
      { name: "Les animaux favoris", score: 94, plays: 11, trend: "↑" }
    ],
    insights: [
      { text: "Les quiz sur la famille proche obtiennent les meilleurs scores (+23% vs moyenne)", type: "green" },
      { text: "Le taux de bonnes réponses au premier essai est en baisse cette semaine (52% vs 64%)", type: "peach" },
      { text: "Les questions avec image sont mieux réussies que les questions textuelles (81% vs 58%)", type: "blue" },
      { text: "Marguerite utilise davantage les indices en après-midi qu'en matinée", type: "peach" }
    ]
  };

  const NAV_PAGES = [
    { id: "dashboard", label: "Dashboard", href: "dashboard/dashboard.html", icon: "▦" },
    { id: "calendar", label: "Calendrier", href: "calendar/calendar.html", icon: "📅" },
    { id: "quiz", label: "Quiz", href: "quiz/quiz.html", icon: "❓" },
    { id: "stats", label: "Statistiques", href: "stats/stats.html", icon: "📊" },
    { id: "settings", label: "Paramètres", href: "settings/settings.html", icon: "⚙" }
  ];

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

  function avatarHTML(name, options = {}) {
    const sizeClass = options.sizeClass || "small";
    const bg = options.bg || "var(--secondary-light)";
    const color = options.color || "var(--secondary-dark)";
    return `<span class="avatar ${sizeClass}" style="background:${bg};color:${color}">${initials(name)}</span>`;
  }

  function kpiCardHTML({ label, value, sub, icon, accent = "var(--secondary)" }) {
    return `
      <article class="card kpi-card">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
          <span class="kpi-label">${escapeHtml(label)}</span>
          <span class="icon-badge" style="background:color-mix(in srgb, ${accent} 14%, white 86%);color:${accent}">${escapeHtml(icon)}</span>
        </div>
        <div class="kpi-value">${escapeHtml(value)}</div>
        <div class="kpi-sub">${escapeHtml(sub || "")}</div>
      </article>
    `;
  }

  function circleProgressHTML({ value, label, color = "var(--secondary)", size = 68, stroke = 7 }) {
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
          <span>${page.icon}</span>
          <span>${page.label}</span>
        </a>
      `;
    }).join("");

    target.className = "sidebar";
    target.innerHTML = `
      <div class="brand-wrap">
        <div class="brand-name">Kyō<span>no</span>kibō</div>
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
    kpiCardHTML,
    circleProgressHTML,
    barChartHTML,
    toggleHTML
  };
})();
