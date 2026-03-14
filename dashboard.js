/* ══════════════════════════════════════════
   DONNÉES PATIENTS
══════════════════════════════════════════ */
const PATIENTS = [
  {
    name: "Marie Dupont", age: 78,
    mmse: { score: 22, max: 30, history: [20,21,22,21,23,22,22], labels: ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"] },
    domains: [
      { name: "Mémoire CT",    score: 65, color: "#7ba7bc" },
      { name: "Orientation",   score: 80, color: "#9dbfa3" },
      { name: "Langage",       score: 75, color: "#c4985a" },
      { name: "Attention",     score: 60, color: "#7c6aad" },
      { name: "Calcul",        score: 55, color: "#c47a7a" },
    ],
    mood: [
      { day:"Lun", emoji:"😐", score:5, color:"#f0ad4e" },
      { day:"Mar", emoji:"😊", score:7, color:"#6dae7c" },
      { day:"Mer", emoji:"😟", score:3, color:"#c47a7a" },
      { day:"Jeu", emoji:"😊", score:7, color:"#6dae7c" },
      { day:"Ven", emoji:"😐", score:5, color:"#f0ad4e" },
      { day:"Sam", emoji:"😴", score:4, color:"#8ea0ae" },
      { day:"Dim", emoji:"😊", score:8, color:"#6dae7c" },
    ],
    autonomy: [
      { icon:"🍽️", label:"Repas",      score:80, color:"#6dae7c" },
      { icon:"🚿", label:"Toilette",   score:60, color:"#f0ad4e" },
      { icon:"👗", label:"Habillage",  score:55, color:"#f0ad4e" },
      { icon:"🚶", label:"Mobilité",   score:70, color:"#6dae7c" },
      { icon:"💊", label:"Médication", score:40, color:"#c47a7a" },
    ],
    health: [
      { icon:"🌙", label:"Sommeil",    val:"6h20 · Qualité moyenne", badge:"warn",  bg:"#fef3c7" },
      { icon:"💊", label:"Médication", val:"Oubli hier soir",        badge:"bad",   bg:"#fce7e7" },
      { icon:"💢", label:"Douleur",    val:"Aucune signalée",        badge:"ok",    bg:"#dcfce7" },
      { icon:"🍎", label:"Appétit",    val:"Bon",                    badge:"ok",    bg:"#dcfce7" },
    ],
    alerts: [
      { level:"red",  text:"Score MMSE en baisse de 3 pts en 2 semaines", icon:"fa-triangle-exclamation" },
      { level:"warn", text:"Médicament du soir oublié hier", icon:"fa-pills" },
    ],
    kpis: [
      { icon:"fa-brain",        bg:"#dbeafe", iconColor:"#5d8fae",  value:"22/30", label:"Score MMSE",    trend:"↓ −1 cette sem.", trendClass:"down" },
      { icon:"fa-face-smile",   bg:"#fef3c7", iconColor:"#c4985a",  value:"6.2/10",label:"Humeur moy.",  trend:"↑ stable",         trendClass:"flat" },
      { icon:"fa-person-walking",bg:"#dcfce7",iconColor:"#6dae7c",  value:"61%",   label:"Autonomie",    trend:"↓ −5%",            trendClass:"down" },
      { icon:"fa-heart-pulse",  bg:"#fce7e7", iconColor:"#c47a7a",  value:"3/5",   label:"Santé gén.",   trend:"→ stable",         trendClass:"flat" },
    ],
    checklist: [
      { text:"Saisir quiz mémoire du matin",  done: false },
      { text:"Vérifier prise médicaments",    done: true  },
      { text:"Note comportementale",          done: false },
      { text:"Rappel RDV kiné demain",        done: false },
    ],
    rdv: [
      { time:"09:30", patient:"Marie Dupont", type:"Évaluation cognitive mensuelle" },
      { time:"14:00", patient:"Marie Dupont", type:"Séance kiné" },
    ],
  },
  {
    name: "Jean Martin", age: 82,
    mmse: { score: 18, max: 30, history: [20,19,18,18,17,18,18], labels: ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"] },
    domains: [
      { name: "Mémoire CT",    score: 45, color: "#7ba7bc" },
      { name: "Orientation",   score: 60, color: "#9dbfa3" },
      { name: "Langage",       score: 70, color: "#c4985a" },
      { name: "Attention",     score: 50, color: "#7c6aad" },
      { name: "Calcul",        score: 40, color: "#c47a7a" },
    ],
    mood: [
      { day:"Lun", emoji:"😟", score:3, color:"#c47a7a" },
      { day:"Mar", emoji:"😐", score:5, color:"#f0ad4e" },
      { day:"Mer", emoji:"😟", score:3, color:"#c47a7a" },
      { day:"Jeu", emoji:"😐", score:5, color:"#f0ad4e" },
      { day:"Ven", emoji:"😟", score:2, color:"#c47a7a" },
      { day:"Sam", emoji:"😊", score:6, color:"#6dae7c" },
      { day:"Dim", emoji:"😐", score:5, color:"#f0ad4e" },
    ],
    autonomy: [
      { icon:"🍽️", label:"Repas",      score:65, color:"#6dae7c" },
      { icon:"🚿", label:"Toilette",   score:40, color:"#c47a7a" },
      { icon:"👗", label:"Habillage",  score:35, color:"#c47a7a" },
      { icon:"🚶", label:"Mobilité",   score:50, color:"#f0ad4e" },
      { icon:"💊", label:"Médication", score:30, color:"#c47a7a" },
    ],
    health: [
      { icon:"🌙", label:"Sommeil",    val:"5h40 · Agité",       badge:"bad",   bg:"#fce7e7" },
      { icon:"💊", label:"Médication", val:"Régulière ce mois",  badge:"ok",    bg:"#dcfce7" },
      { icon:"💢", label:"Douleur",    val:"Légère (genou D.)",  badge:"warn",  bg:"#fef3c7" },
      { icon:"🍎", label:"Appétit",    val:"Diminué",            badge:"warn",  bg:"#fef3c7" },
    ],
    alerts: [
      { level:"red",  text:"Agitation nocturne 3 nuits de suite", icon:"fa-triangle-exclamation" },
      { level:"red",  text:"Score MMSE sous le seuil critique (18)", icon:"fa-brain" },
      { level:"warn", text:"Appétit en baisse depuis 5 jours",    icon:"fa-utensils" },
    ],
    kpis: [
      { icon:"fa-brain",        bg:"#fce7e7", iconColor:"#c47a7a",  value:"18/30", label:"Score MMSE",   trend:"↓ −2 cette sem.", trendClass:"down" },
      { icon:"fa-face-smile",   bg:"#fef3c7", iconColor:"#c4985a",  value:"4.1/10",label:"Humeur moy.",  trend:"↓ en baisse",     trendClass:"down" },
      { icon:"fa-person-walking",bg:"#fef3c7",iconColor:"#c4985a",  value:"44%",   label:"Autonomie",   trend:"↓ −8%",           trendClass:"down" },
      { icon:"fa-heart-pulse",  bg:"#fce7e7", iconColor:"#c47a7a",  value:"2/5",   label:"Santé gén.",  trend:"↓ dégradée",      trendClass:"down" },
    ],
    checklist: [
      { text:"Quiz NPI comportement", done: false },
      { text:"Vérifier alimentation", done: false },
      { text:"Contacter médecin référent", done: false },
      { text:"Note agitation nocturne", done: true },
    ],
    rdv: [
      { time:"11:00", patient:"Jean Martin", type:"Consultation gériatre" },
    ],
  },
  {
    name: "Yvette Bonnet", age: 74,
    mmse: { score: 27, max: 30, history: [26,27,27,28,27,27,27], labels: ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"] },
    domains: [
      { name: "Mémoire CT",    score: 85, color: "#7ba7bc" },
      { name: "Orientation",   score: 90, color: "#9dbfa3" },
      { name: "Langage",       score: 88, color: "#c4985a" },
      { name: "Attention",     score: 82, color: "#7c6aad" },
      { name: "Calcul",        score: 80, color: "#c47a7a" },
    ],
    mood: [
      { day:"Lun", emoji:"😊", score:8, color:"#6dae7c" },
      { day:"Mar", emoji:"😊", score:9, color:"#6dae7c" },
      { day:"Mer", emoji:"😊", score:8, color:"#6dae7c" },
      { day:"Jeu", emoji:"😐", score:6, color:"#f0ad4e" },
      { day:"Ven", emoji:"😊", score:8, color:"#6dae7c" },
      { day:"Sam", emoji:"😊", score:9, color:"#6dae7c" },
      { day:"Dim", emoji:"😊", score:8, color:"#6dae7c" },
    ],
    autonomy: [
      { icon:"🍽️", label:"Repas",      score:95, color:"#6dae7c" },
      { icon:"🚿", label:"Toilette",   score:90, color:"#6dae7c" },
      { icon:"👗", label:"Habillage",  score:92, color:"#6dae7c" },
      { icon:"🚶", label:"Mobilité",   score:88, color:"#6dae7c" },
      { icon:"💊", label:"Médication", score:85, color:"#6dae7c" },
    ],
    health: [
      { icon:"🌙", label:"Sommeil",    val:"7h30 · Bonne qualité", badge:"ok",  bg:"#dcfce7" },
      { icon:"💊", label:"Médication", val:"Régulière",            badge:"ok",  bg:"#dcfce7" },
      { icon:"💢", label:"Douleur",    val:"Aucune",               badge:"ok",  bg:"#dcfce7" },
      { icon:"🍎", label:"Appétit",    val:"Excellent",            badge:"ok",  bg:"#dcfce7" },
    ],
    alerts: [
      { level:"ok",  text:"Aucune alerte — état stable", icon:"fa-circle-check" },
    ],
    kpis: [
      { icon:"fa-brain",        bg:"#dcfce7", iconColor:"#6dae7c",  value:"27/30", label:"Score MMSE",   trend:"↑ stable",    trendClass:"up" },
      { icon:"fa-face-smile",   bg:"#dcfce7", iconColor:"#6dae7c",  value:"8.3/10",label:"Humeur moy.",  trend:"↑ excellent", trendClass:"up" },
      { icon:"fa-person-walking",bg:"#dcfce7",iconColor:"#6dae7c",  value:"90%",   label:"Autonomie",   trend:"↑ +2%",       trendClass:"up" },
      { icon:"fa-heart-pulse",  bg:"#dcfce7", iconColor:"#6dae7c",  value:"5/5",   label:"Santé gén.",  trend:"↑ très bien", trendClass:"up" },
    ],
    checklist: [
      { text:"Quiz MMSE hebdomadaire", done: true },
      { text:"Vérifier médication",    done: true },
      { text:"Activité cognitive",     done: false },
    ],
    rdv: [
      { time:"10:00", patient:"Yvette Bonnet", type:"Bilan trimestriel" },
    ],
  }
];

let currentPatient = 0;

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  setDate();
  renderDashboard();
  renderQuiz();
  renderReports();
  renderRdvFull();
});

function setDate() {
  const d = new Date();
  const opts = { weekday:'long', day:'numeric', month:'long', year:'numeric' };
  document.getElementById("currentDate").textContent =
    d.toLocaleDateString("fr-FR", opts);
  document.getElementById("rdvDate").textContent =
    d.toLocaleDateString("fr-FR", { weekday:'long', day:'numeric', month:'long' });
}

function selectPatient(idx) {
  currentPatient = parseInt(idx);
  renderDashboard();
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  const sec = document.getElementById("sec-" + id) || document.getElementById("sec-dashboard");
  if (sec) sec.classList.add("active");

  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  const titles = {
    dashboard:"Tableau de bord", cognitif:"Cognitif & Mémoire",
    humeur:"Humeur", activite:"Activité", sante:"Santé",
    quiz:"Saisir un quiz", rdv:"Rendez-vous", rapports:"Rapports"
  };
  document.getElementById("pageTitle").textContent = titles[id] || "Tableau de bord";
  const navMap = { dashboard:0, cognitif:1, humeur:2, activite:3, sante:4, quiz:5, rdv:6, rapports:7 };
  const items = document.querySelectorAll(".nav-item");
  if (items[navMap[id]]) items[navMap[id]].classList.add("active");

  const mobileItems = document.querySelectorAll(".mobile-nav-item");
  mobileItems.forEach(m => m.classList.remove("active"));
  const mobileMap = { dashboard:0, cognitif:1, quiz:2, rapports:3 };
  if (mobileItems[mobileMap[id]]) mobileItems[mobileMap[id]].classList.add("active");
}

/* ══════════════════════════════════════════
   RENDER DASHBOARD
══════════════════════════════════════════ */
function renderDashboard() {
  const p = PATIENTS[currentPatient];
  renderAlerts(p);
  renderKPIs(p);
  renderCogGraph(p);
  renderRadar(p);
  renderMood(p);
  renderAutonomy(p);
  renderHealth(p);
  renderChecklist(p);
  renderRdv(p);
}

/* Alertes */
function renderAlerts(p) {
  const el = document.getElementById("alertBanner");
  el.innerHTML = p.alerts.map(a => `
    <div class="alert-item alert-${a.level}">
      <i class="fa-solid ${a.icon}"></i>
      <span>${a.text}</span>
      <button class="alert-close" onclick="this.parentElement.remove()">✕</button>
    </div>
  `).join("");
  document.getElementById("notifCount").textContent = p.alerts.filter(a => a.level !== "ok").length || "";
}

/* KPIs */
function renderKPIs(p) {
  document.getElementById("kpiRow").innerHTML = p.kpis.map((k, i) => `
    <div class="kpi-card" style="animation-delay:${i * 0.07}s">
      <div class="kpi-icon" style="background:${k.bg}">
        <i class="fa-solid ${k.icon}" style="color:${k.iconColor}"></i>
      </div>
      <div>
        <div class="kpi-value">${k.value}</div>
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-trend ${k.trendClass}">${k.trend}</div>
      </div>
    </div>
  `).join("");
}

/* Graphique cognitif */
function renderCogGraph(p) {
  const svg = document.getElementById("cogGraph");
  svg.innerHTML = "";
  const W = 520, H = 140, padL = 36, padR = 16, padT = 22, padB = 28;
  const data = p.mmse.history;
  const labels = p.mmse.labels;
  const maxVal = p.mmse.max;
  const n = data.length;
  const xStep = (W - padL - padR) / (n - 1);

  const xs = data.map((_, i) => padL + i * xStep);
  const ys = data.map(v => padT + (1 - v / maxVal) * (H - padT - padB));

  // Defs
  svg.innerHTML = `
    <defs>
      <linearGradient id="graphAreaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#7ba7bc" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#eef5ff" stop-opacity="0"/>
      </linearGradient>
    </defs>
  `;

  // Grilles horizontales
  [0.25, 0.5, 0.75, 1].forEach(t => {
    const y = padT + (1 - t) * (H - padT - padB);
    svg.innerHTML += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="#d6e4ef" stroke-width="1" stroke-dasharray="3 5"/>`;
    svg.innerHTML += `<text x="${padL - 6}" y="${y + 4}" text-anchor="end" font-size="10" fill="#8ea0ae" font-family="Roboto,sans-serif">${Math.round(t * maxVal)}</text>`;
  });

  // Aire
  const areaPoints = `${xs[0]},${H - padB} ` + xs.map((x, i) => `${x},${ys[i]}`).join(" ") + ` ${xs[n-1]},${H - padB}`;
  svg.innerHTML += `<polygon points="${areaPoints}" fill="url(#graphAreaGrad)"/>`;

  // Ligne
  const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(" ");
  svg.innerHTML += `<path d="${path}" fill="none" stroke="#5d8fae" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

  // Points + valeurs + labels
  data.forEach((v, i) => {
    const isPeak = v === Math.max(...data);
    svg.innerHTML += `
      <circle cx="${xs[i]}" cy="${ys[i]}" r="${isPeak ? 5 : 4}"
        fill="${isPeak ? '#eef5ff' : '#fff'}"
        stroke="${isPeak ? '#3d7a9e' : '#5d8fae'}"
        stroke-width="${isPeak ? 2.5 : 2}"/>
      <text class="val" x="${xs[i]}" y="${ys[i] - 9}" text-anchor="middle"
        font-size="10" font-weight="700" fill="${isPeak ? '#3d7a9e' : '#5d8fae'}"
        font-family="Roboto,sans-serif">${v}</text>
      <text x="${xs[i]}" y="${H - padB + 14}" text-anchor="middle"
        font-size="10" fill="#8ea0ae" font-family="Roboto,sans-serif">${labels[i]}</text>
    `;
  });
}

/* Radar */
function renderRadar(p) {
  const svg = document.getElementById("radarChart");
  const domains = p.domains;
  const n = domains.length;
  const cx = 100, cy = 100, R = 72, rMin = 14;

  let html = "";
  // Grilles
  [0.25, 0.5, 0.75, 1].forEach(t => {
    const pts = Array.from({length: n}, (_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = rMin + t * (R - rMin);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
    html += `<polygon points="${pts}" fill="none" stroke="#d6e4ef" stroke-width="1"/>`;
  });

  // Axes
  Array.from({length: n}, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    html += `<line x1="${cx}" y1="${cy}" x2="${cx + R * Math.cos(a)}" y2="${cy + R * Math.sin(a)}" stroke="#d6e4ef" stroke-width="1"/>`;
  });

  // Aire données
  const dataPts = domains.map((d, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = rMin + (d.score / 100) * (R - rMin);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  html += `<polygon points="${dataPts}" fill="#7ba7bc" fill-opacity="0.18" stroke="#5d8fae" stroke-width="1.8"/>`;

  // Points
  domains.forEach((d, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = rMin + (d.score / 100) * (R - rMin);
    html += `<circle cx="${cx + r * Math.cos(a)}" cy="${cy + r * Math.sin(a)}" r="3.5" fill="#5d8fae"/>`;
  });

  // Labels
  domains.forEach((d, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const labelR = R + 16;
    const lx = cx + labelR * Math.cos(a);
    const ly = cy + labelR * Math.sin(a);
    const anchor = Math.abs(Math.cos(a)) < 0.2 ? "middle" : (Math.cos(a) < 0 ? "end" : "start");
    html += `<text x="${lx}" y="${ly + 4}" text-anchor="${anchor}" font-size="9" fill="#8ea0ae" font-family="Roboto,sans-serif" font-weight="600">${d.name}</text>`;
  });

  svg.innerHTML = html;

  // Légende
  document.getElementById("radarLegend").innerHTML = domains.map(d => `
    <div class="radar-legend-item">
      <div class="radar-dot" style="background:${d.color}"></div>
      <span>${d.name} — <strong>${d.score}%</strong></span>
    </div>
  `).join("");
}

/* Humeur */
function renderMood(p) {
  document.getElementById("moodWeek").innerHTML = p.mood.map(m => `
    <div class="mood-day">
      <div class="mood-label">${m.day}</div>
      <div class="mood-emoji" title="Score ${m.score}/10">${m.emoji}</div>
      <div class="mood-score">${m.score}</div>
      <div class="mood-bar">
        <div class="mood-bar-fill" style="width:${m.score * 10}%;background:${m.color}"></div>
      </div>
    </div>
  `).join("");
}

/* Autonomie */
function renderAutonomy(p) {
  document.getElementById("autonomyGrid").innerHTML = p.autonomy.map(a => `
    <div class="autonomy-item">
      <span class="autonomy-icon">${a.icon}</span>
      <span class="autonomy-label">${a.label}</span>
      <div class="autonomy-bar-wrap">
        <div class="autonomy-bar-fill" style="width:${a.score}%;background:${a.color}"></div>
      </div>
      <span class="autonomy-score" style="color:${a.color}">${a.score}%</span>
    </div>
  `).join("");
}

/* Santé */
function renderHealth(p) {
  document.getElementById("healthList").innerHTML = p.health.map(h => `
    <div class="health-item">
      <div class="health-icon" style="background:${h.bg}; font-size:18px">${h.icon}</div>
      <div>
        <div class="health-label">${h.label}</div>
        <div class="health-val">${h.val}</div>
      </div>
      <span class="health-badge badge-${h.badge}">${
        h.badge === "ok" ? "Bon" : h.badge === "warn" ? "Attention" : "Alerte"
      }</span>
    </div>
  `).join("");
}

/* Checklist */
function renderChecklist(p) {
  const el = document.getElementById("checklistList");
  el.innerHTML = "";
  const remaining = p.checklist.filter(c => !c.done).length;
  document.getElementById("checklistSub").textContent =
    remaining === 0 ? "Tout complété ✓" : `${remaining} tâche${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""}`;

  p.checklist.forEach((c, i) => {
    const item = document.createElement("div");
    item.className = "checklist-item" + (c.done ? " done" : "");
    item.innerHTML = `
      <div class="checklist-mark">${c.done ? "✓" : ""}</div>
      <span class="checklist-text">${c.text}</span>
    `;
    item.onclick = () => {
      c.done = !c.done;
      renderChecklist(p);
    };
    el.appendChild(item);
  });
}

/* RDV */
function renderRdv(p) {
  document.getElementById("rdvList").innerHTML = p.rdv.map(r => `
    <div class="rdv-item">
      <div class="rdv-time">${r.time}</div>
      <div class="rdv-divider"></div>
      <div>
        <div class="rdv-patient">${r.patient}</div>
        <div class="rdv-type">${r.type}</div>
      </div>
    </div>
  `).join("") || `<div style="color:var(--muted);font-size:13px;padding:8px 0">Aucun RDV aujourd'hui</div>`;
}

function renderRdvFull() {
  const all = PATIENTS.flatMap(p => p.rdv);
  document.getElementById("rdvFullList").innerHTML = all.map(r => `
    <div class="rdv-item" style="margin-bottom:8px">
      <div class="rdv-time">${r.time}</div>
      <div class="rdv-divider"></div>
      <div>
        <div class="rdv-patient">${r.patient}</div>
        <div class="rdv-type">${r.type}</div>
      </div>
    </div>
  `).join("");
}

/* Période graphique */
function setPeriod(period, btn) {
  document.querySelectorAll(".period-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const p = PATIENTS[currentPatient];
  const configs = {
    week:  { history: p.mmse.history, labels: p.mmse.labels },
    month: { history: [18,19,20,21,20,22,21,22,23,22,21,22,23,22,24,23,22,23,22,21,22,23,22,21,22,23,22,23,22,22], labels: Array.from({length:30},(_,i)=>`J${i+1}`) },
    year:  { history: [20,21,21,22,21,22,22,23,22,23,22,22], labels: ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"] }
  };
  const cfg = configs[period];
  const tmpP = { mmse: { history: cfg.history, labels: cfg.labels, max: 30 } };
  renderCogGraphCustom(tmpP);
}

function renderCogGraphCustom(p) {
  const svg = document.getElementById("cogGraph");
  svg.innerHTML = "";
  const W = 520, H = 140, padL = 36, padR = 16, padT = 22, padB = 28;
  const data = p.mmse.history;
  const labels = p.mmse.labels;
  const maxVal = p.mmse.max;
  const n = data.length;
  const xStep = (W - padL - padR) / (n - 1);
  const xs = data.map((_, i) => padL + i * xStep);
  const ys = data.map(v => padT + (1 - v / maxVal) * (H - padT - padB));

  svg.innerHTML = `<defs>
    <linearGradient id="graphAreaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7ba7bc" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#eef5ff" stop-opacity="0"/>
    </linearGradient>
  </defs>`;

  [0.25, 0.5, 0.75, 1].forEach(t => {
    const y = padT + (1 - t) * (H - padT - padB);
    svg.innerHTML += `<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="#d6e4ef" stroke-width="1" stroke-dasharray="3 5"/>`;
    svg.innerHTML += `<text x="${padL-6}" y="${y+4}" text-anchor="end" font-size="10" fill="#8ea0ae" font-family="Roboto,sans-serif">${Math.round(t*maxVal)}</text>`;
  });

  const areaPoints = `${xs[0]},${H-padB} ` + xs.map((x,i)=>`${x},${ys[i]}`).join(" ") + ` ${xs[n-1]},${H-padB}`;
  svg.innerHTML += `<polygon points="${areaPoints}" fill="url(#graphAreaGrad)"/>`;
  const path = xs.map((x,i)=>`${i===0?'M':'L'}${x},${ys[i]}`).join(" ");
  svg.innerHTML += `<path d="${path}" fill="none" stroke="#5d8fae" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

  // n'afficher les labels que si pas trop nombreux
  const step = n > 14 ? Math.ceil(n / 7) : 1;
  data.forEach((v, i) => {
    const isPeak = v === Math.max(...data);
    svg.innerHTML += `<circle cx="${xs[i]}" cy="${ys[i]}" r="${isPeak?5:3.5}" fill="${isPeak?'#eef5ff':'#fff'}" stroke="#5d8fae" stroke-width="${isPeak?2.5:1.8}"/>`;
    if (i % step === 0) {
      svg.innerHTML += `<text x="${xs[i]}" y="${H-padB+14}" text-anchor="middle" font-size="9" fill="#8ea0ae" font-family="Roboto,sans-serif">${labels[i]}</text>`;
    }
  });
}

/* ══════════════════════════════════════════
   QUIZ
══════════════════════════════════════════ */
const QUIZ_DOMAINS = [
  {
    title: "🧠 Mémoire & Orientation", questions: [
      { label: "Rappel de 3 mots",     type:"range", max:3  },
      { label: "Orientation temporelle", type:"range", max:5  },
      { label: "Orientation spatiale",  type:"range", max:5  },
    ]
  },
  {
    title: "🗣️ Langage & Communication", questions: [
      { label: "Dénomination",          type:"range", max:2  },
      { label: "Répétition de phrase",  type:"range", max:1  },
      { label: "Compréhension",         type:"range", max:3  },
    ]
  },
  {
    title: "🎯 Attention & Calcul", questions: [
      { label: "Soustraction sérielle", type:"range", max:5  },
      { label: "Épellation inversée",   type:"range", max:5  },
    ]
  },
  {
    title: "😊 Humeur & Comportement", questions: [
      { label: "Niveau d'anxiété",      type:"radio", options:["Faible","Modéré","Élevé"] },
      { label: "Agitation observée",    type:"radio", options:["Aucune","Légère","Forte"] },
      { label: "Humeur générale",       type:"radio", options:["Bonne","Neutre","Déprimée"] },
    ]
  },
];

let quizValues = {};

function renderQuiz() {
  const grid = document.getElementById("quizGrid");
  grid.innerHTML = QUIZ_DOMAINS.map((domain, di) => `
    <div class="quiz-domain">
      <div class="quiz-domain-title">${domain.title}</div>
      ${domain.questions.map((q, qi) => {
        const key = `${di}-${qi}`;
        if (q.type === "range") {
          quizValues[key] = quizValues[key] ?? 0;
          return `
            <div class="quiz-question">
              <label>${q.label} <em style="color:var(--muted);font-size:11px">/ ${q.max}</em></label>
              <div class="quiz-score-input">
                <input type="range" min="0" max="${q.max}" step="1" value="${quizValues[key]}"
                  oninput="updateQuizVal('${key}', this.value, 'val-${key}')"/>
                <span class="quiz-score-val" id="val-${key}">${quizValues[key]}</span>
              </div>
            </div>`;
        } else {
          quizValues[key] = quizValues[key] ?? null;
          return `
            <div class="quiz-question">
              <label>${q.label}</label>
              <div class="quiz-radio-group">
                ${q.options.map((opt, oi) => `
                  <button class="quiz-radio-btn ${quizValues[key] === oi ? 'selected' : ''}"
                    onclick="selectQuizRadio('${key}', ${oi}, this)">
                    ${opt}
                  </button>`).join("")}
              </div>
            </div>`;
        }
      }).join("")}
    </div>
  `).join("");
}

function updateQuizVal(key, val, spanId) {
  quizValues[key] = parseInt(val);
  document.getElementById(spanId).textContent = val;
}

function selectQuizRadio(key, idx, btn) {
  quizValues[key] = idx;
  btn.closest(".quiz-radio-group").querySelectorAll(".quiz-radio-btn")
    .forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

function resetQuiz() {
  quizValues = {};
  renderQuiz();
}

function saveQuiz() {
  const total = Object.values(quizValues).filter(v => typeof v === "number").reduce((a,b) => a + b, 0);
  showToast(`Quiz enregistré — Score total : ${total}`, "ok");
}

/* ══════════════════════════════════════════
   RAPPORTS
══════════════════════════════════════════ */
function renderReports() {
  document.getElementById("reportsGrid").innerHTML = `
    <div class="report-card">
      <div class="report-card-title">📈 Évolution MMSE — 3 patients</div>
      <div class="report-svg-wrap">
        <svg viewBox="0 0 400 120" style="width:100%;height:120px" id="reportSvg1"></svg>
      </div>
    </div>
    <div class="report-card">
      <div class="report-card-title">😊 Humeur moyenne</div>
      <div class="report-svg-wrap">
        <svg viewBox="0 0 400 120" style="width:100%;height:120px" id="reportSvg2"></svg>
      </div>
    </div>
    <div class="report-card">
      <div class="report-card-title">🏃 Autonomie comparée</div>
      <div class="autonomy-grid" style="margin-top:0">
        ${PATIENTS.map(p => {
          const avg = Math.round(p.autonomy.reduce((a,b) => a + b.score, 0) / p.autonomy.length);
          const col = avg >= 75 ? "#6dae7c" : avg >= 50 ? "#f0ad4e" : "#c47a7a";
          return `
            <div class="autonomy-item">
              <span class="autonomy-label" style="font-size:12px">${p.name.split(" ")[0]}</span>
              <div class="autonomy-bar-wrap"><div class="autonomy-bar-fill" style="width:${avg}%;background:${col}"></div></div>
              <span class="autonomy-score" style="color:${col}">${avg}%</span>
            </div>`;
        }).join("")}
      </div>
    </div>
    <div class="report-card">
      <div class="report-card-title">💊 Observance médication</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px">
        ${PATIENTS.map(p => {
          const med = p.health.find(h => h.label === "Médication");
          const isOk = med.badge === "ok";
          return `
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:12px;font-weight:600;color:var(--text);flex:1">${p.name.split(" ")[0]}, ${p.age} ans</span>
              <span class="health-badge badge-${med.badge}">${isOk ? "Régulière" : "Irrégulière"}</span>
            </div>`;
        }).join("")}
      </div>
    </div>
  `;

  // Graphe multi-patients MMSE
  setTimeout(() => drawReportMmse(), 50);
  setTimeout(() => drawReportMood(), 50);
}

function drawReportMmse() {
  const svg = document.getElementById("reportSvg1");
  if (!svg) return;
  const W=400, H=120, padL=28, padR=12, padT=16, padB=22;
  const colors = ["#5d8fae","#c4985a","#6dae7c"];
  let html = `<defs>
    <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7ba7bc" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#eef5ff" stop-opacity="0"/>
    </linearGradient></defs>`;

  PATIENTS.forEach((p, pi) => {
    const data = p.mmse.history;
    const n = data.length;
    const xStep = (W - padL - padR) / (n - 1);
    const xs = data.map((_, i) => padL + i * xStep);
    const ys = data.map(v => padT + (1 - v / 30) * (H - padT - padB));
    const path = xs.map((x, i) => `${i===0?'M':'L'}${x},${ys[i]}`).join(" ");
    html += `<path d="${path}" fill="none" stroke="${colors[pi]}" stroke-width="2" stroke-linecap="round" opacity="${pi===currentPatient?1:.5}"/>`;
    data.forEach((v, i) => {
      if (i === n-1 || v === Math.max(...data)) {
        html += `<circle cx="${xs[i]}" cy="${ys[i]}" r="3" fill="${colors[pi]}" opacity="${pi===currentPatient?1:.5}"/>`;
      }
    });
  });

  // Labels Y
  [0, 15, 30].forEach(v => {
    const y = padT + (1 - v/30) * (H - padT - padB);
    html += `<text x="${padL-5}" y="${y+4}" text-anchor="end" font-size="9" fill="#8ea0ae" font-family="Roboto,sans-serif">${v}</text>`;
    html += `<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="#d6e4ef" stroke-width="1" stroke-dasharray="3 4"/>`;
  });

  // Légende
  PATIENTS.forEach((p, pi) => {
    html += `<rect x="${padL + pi * 130}" y="${H-14}" width="8" height="8" rx="2" fill="${colors[pi]}"/>`;
    html += `<text x="${padL + pi * 130 + 11}" y="${H-7}" font-size="9" fill="#8ea0ae" font-family="Roboto,sans-serif">${p.name.split(" ")[0]}</text>`;
  });

  svg.innerHTML = html;
}

function drawReportMood() {
  const svg = document.getElementById("reportSvg2");
  if (!svg) return;
  const W=400, H=120, padL=28, padR=12, padT=16, padB=22;
  const colors = ["#5d8fae","#c4985a","#6dae7c"];
  let html = "";

  PATIENTS.forEach((p, pi) => {
    const data = p.mood.map(m => m.score);
    const n = data.length;
    const xStep = (W - padL - padR) / (n - 1);
    const xs = data.map((_, i) => padL + i * xStep);
    const ys = data.map(v => padT + (1 - v / 10) * (H - padT - padB));
    const path = xs.map((x, i) => `${i===0?'M':'L'}${x},${ys[i]}`).join(" ");
    html += `<path d="${path}" fill="none" stroke="${colors[pi]}" stroke-width="2" stroke-linecap="round" opacity="${pi===currentPatient?1:.5}"/>`;
  });

  [0, 5, 10].forEach(v => {
    const y = padT + (1 - v/10) * (H - padT - padB);
    html += `<text x="${padL-5}" y="${y+4}" text-anchor="end" font-size="9" fill="#8ea0ae" font-family="Roboto,sans-serif">${v}</text>`;
    html += `<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="#d6e4ef" stroke-width="1" stroke-dasharray="3 4"/>`;
  });

  svg.innerHTML = html;
}

function exportReport() {
  showToast("Export PDF en cours… (fonctionnalité à connecter)", "warn");
}

function openNewRdv() {
  showToast("Formulaire nouveau RDV (à implémenter)", "ok");
}

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function showToast(msg, level = "ok") {
  const colors = { ok:"#f0f9f3", warn:"#fff8f0", bad:"#fdf2f2" };
  const borders = { ok:"#b8dfc4", warn:"#f5d9b8", bad:"#f5c6c6" };
  const textCol = { ok:"#2f7448", warn:"#9b6030", bad:"#9b3c3c" };
  const t = document.createElement("div");
  t.style.cssText = `
    position:fixed; bottom:80px; right:24px; z-index:9999;
    padding:12px 18px; border-radius:10px;
    background:${colors[level]}; border:1px solid ${borders[level]};
    color:${textCol[level]}; font-size:13px; font-weight:600;
    box-shadow:0 8px 28px rgba(80,80,100,.12);
    animation:fadeUp .3s ease;
    font-family:Roboto,sans-serif;
    max-width:300px;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3500);
}