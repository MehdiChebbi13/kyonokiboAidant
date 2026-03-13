/* ══════════════════════════════════════════
   DONNÉES — Patients
══════════════════════════════════════════ */

const PATIENTS = [
  {
    id:        1,
    nom:       'Jean Dupont',
    age:       75,
    pathologie:'Diabète',
    avatar:    'https://i.pravatar.cc/40?img=1'
  },
  {
    id:        2,
    nom:       'Marie Martin',
    age:       81,
    pathologie:'Hypertension',
    avatar:    'https://i.pravatar.cc/40?img=2'
  },
  {
    id:        3,
    nom:       'Paul Bernard',
    age:       70,
    pathologie:'Troubles mémoire',
    avatar:    'https://i.pravatar.cc/40?img=3'
  }
];
const VISITES_HEBDO = [
  { jour: 'Lun', visites: 4 },
  { jour: 'Mar', visites: 5 },
  { jour: 'Mer', visites: 6 },
  { jour: 'Jeu', visites: 4 },
  { jour: 'Ven', visites: 7 },
  { jour: 'Sam', visites: 3 },
  { jour: 'Dim', visites: 2 }
];

/* ══════════════════════════════════════════
   DONNÉES — RDV du jour
══════════════════════════════════════════ */

const RDV_JOUR = [
  { heure: '09:30', patient: 'Jean Dupont',  type: 'Contrôle glycémie' },
  { heure: '11:00', patient: 'Marie Martin', type: 'Prise de tension'  },
  { heure: '14:30', patient: 'Paul Bernard', type: 'Séance mémoire'    }
];

/* ══════════════════════════════════════════
   DONNÉES — Alertes
══════════════════════════════════════════ */

const CHECKLIST_QUOTIDIENNE = [
  { id: 'medicaments', label: 'Verifier la prise des medicaments', done: true },
  { id: 'constantes', label: 'Noter les constantes vitales', done: false },
  { id: 'hydratation', label: 'Controle de l hydratation', done: false },
  { id: 'rdv', label: 'Confirmer les rendez-vous de demain', done: false }
];

/* ══════════════════════════════════════════
   RENDU — Liste patients
══════════════════════════════════════════ */

function renderStatisticsCard() {
  const totalPatients = PATIENTS.length;
  const totalVisites = VISITES_HEBDO.reduce((sum, day) => sum + day.visites, 0);
  const firstHalf = VISITES_HEBDO.slice(0, 3).reduce((sum, day) => sum + day.visites, 0);
  const secondHalf = VISITES_HEBDO.slice(3).reduce((sum, day) => sum + day.visites, 0);
  const trend = firstHalf === 0 ? 0 : Math.round(((secondHalf - firstHalf) / firstHalf) * 100);

  const patientCountEl = document.getElementById('patientCount');
  if (patientCountEl) {
    patientCountEl.textContent = `${totalVisites} visites cette semaine`;
  }

  const activePatientsEl = document.getElementById('statsActivePatients');
  if (activePatientsEl) activePatientsEl.textContent = String(totalPatients);

  const weekVisitsEl = document.getElementById('statsWeekVisits');
  if (weekVisitsEl) weekVisitsEl.textContent = String(totalVisites);

  const trendEl = document.getElementById('statsTrend');
  if (trendEl) {
    trendEl.textContent = `${trend >= 0 ? '+' : ''}${trend}%`;
    trendEl.classList.toggle('positive', trend >= 0);
  }

  const statPatientsEl = document.getElementById('statPatients');
  if (statPatientsEl) statPatientsEl.textContent = String(totalPatients);

  renderStatsGraph(VISITES_HEBDO);
}

function renderStatsGraph(data) {
  const svg = document.getElementById('statsGraph');
  if (!svg || data.length === 0) return;

  const width = 420;
  const height = 150;
  const padding = { top: 12, right: 14, bottom: 28, left: 14 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.map(d => d.visites), 1);
  const baseY = padding.top + innerHeight;

  const points = data.map((d, i) => {
    const x = padding.left + (i * innerWidth) / (data.length - 1);
    const y = padding.top + innerHeight - (d.visites / maxValue) * innerHeight;
    return { x, y, label: d.jour, value: d.visites };
  });

  const smoothPath = buildSmoothPath(points);
  const areaPath = `${smoothPath} L ${points[points.length - 1].x.toFixed(2)} ${baseY.toFixed(2)} L ${points[0].x.toFixed(2)} ${baseY.toFixed(2)} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(ratio => {
    const y = padding.top + innerHeight * ratio;
    return `<line class="stats-grid-line" x1="${padding.left}" y1="${y.toFixed(2)}" x2="${(padding.left + innerWidth).toFixed(2)}" y2="${y.toFixed(2)}"></line>`;
  }).join('');

  const labels = points.map(p => `<text class="stats-label" x="${p.x.toFixed(2)}" y="${(height - 8).toFixed(2)}" text-anchor="middle">${escapeHtml(p.label)}</text>`).join('');
  const peak = points.reduce((best, point) => point.value > best.value ? point : best, points[0]);
  const pointValues = points.map(p => `<text class="stats-value" x="${p.x.toFixed(2)}" y="${(p.y - 10).toFixed(2)}" text-anchor="middle">${p.value}</text>`).join('');
  const circles = points.map(p => {
    const isPeak = p === peak;
    const cls = isPeak ? 'stats-point stats-point-peak' : 'stats-point';
    const radius = isPeak ? 5 : 4;
    return `<circle class="${cls}" cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${radius}"></circle>`;
  }).join('');

  svg.innerHTML = `
    <defs>
      <linearGradient id="statsAreaGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#14b8a6" stop-opacity="0.35"></stop>
        <stop offset="100%" stop-color="#14b8a6" stop-opacity="0.02"></stop>
      </linearGradient>
      <linearGradient id="statsLineGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0d9488"></stop>
        <stop offset="100%" stop-color="#2dd4bf"></stop>
      </linearGradient>
      <filter id="statsLineGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#0d9488" flood-opacity="0.2"></feDropShadow>
      </filter>
    </defs>
    ${gridLines}
    <path class="stats-baseline" d="M ${padding.left} ${baseY.toFixed(2)} L ${(padding.left + innerWidth).toFixed(2)} ${baseY.toFixed(2)}"></path>
    <path class="stats-area" d="${areaPath}"></path>
    <path class="stats-line" d="${smoothPath}"></path>
    ${pointValues}
    ${circles}
    ${labels}
  `;
}

function buildSmoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  return d;
}
/* ══════════════════════════════════════════
   RENDU — Liste RDV
══════════════════════════════════════════ */

function renderRdv() {
  const container = document.getElementById('rdvList');
  if (!container) return;

  if (RDV_JOUR.length === 0) {
    container.innerHTML = '<div style="font-size:13px;color:var(--muted);text-align:center;padding:16px 0">Aucun RDV aujourd\'hui</div>';
    return;
  }

  container.innerHTML = RDV_JOUR.map(r => `
    <div class="rdv-item">
      <div class="rdv-time">${escapeHtml(r.heure)}</div>
      <div class="rdv-divider"></div>
      <div class="rdv-info">
        <div class="rdv-patient">${escapeHtml(r.patient)}</div>
        <div class="rdv-type">${escapeHtml(r.type)}</div>
      </div>
    </div>
  `).join('');

  // Met à jour les stats
  const statRdvEl    = document.getElementById('statRdv');
  const statProchain = document.getElementById('statProchain');
  if (statRdvEl)    statRdvEl.textContent    = RDV_JOUR.length;
  if (statProchain) statProchain.textContent = RDV_JOUR[0]?.heure ?? '—';
}

/* ══════════════════════════════════════════
   RENDU — Alertes
══════════════════════════════════════════ */

function renderChecklist() {
  const container = document.getElementById('checklistList');
  if (!container) return;

  if (CHECKLIST_QUOTIDIENNE.length === 0) {
    container.innerHTML = '<div style="font-size:13px;color:var(--muted);text-align:center;padding:16px 0">Aucune tache pour aujourd hui</div>';
    return;
  }

  container.innerHTML = CHECKLIST_QUOTIDIENNE.map((item, index) => `
    <label class="checklist-item ${item.done ? 'done' : ''}">
      <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleChecklistItem(${index})">
      <span class="checklist-mark"><i class="fa-solid fa-check"></i></span>
      <span class="checklist-text">${escapeHtml(item.label)}</span>
    </label>
  `).join('');

  const restantes = CHECKLIST_QUOTIDIENNE.filter(item => !item.done).length;
  const countEl = document.getElementById('checklistCount');
  if (countEl) countEl.textContent = `${restantes} tache${restantes > 1 ? 's' : ''} restante${restantes > 1 ? 's' : ''}`;

  const statEl = document.getElementById('statAlertes');
  if (statEl) statEl.textContent = restantes;
}

function toggleChecklistItem(index) {
  if (!CHECKLIST_QUOTIDIENNE[index]) return;
  CHECKLIST_QUOTIDIENNE[index].done = !CHECKLIST_QUOTIDIENNE[index].done;
  renderChecklist();
}

/* ══════════════════════════════════════════
   RENDU — Date courante dans le header
══════════════════════════════════════════ */

function renderDate() {
  const el = document.getElementById('currentDate');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
    year:    'numeric'
  });
}

/* ══════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════ */

/** Recharge le dashboard (page courante) */
function goDashboard() {
  setActiveNav(0);
  window.location.href = 'dashboard.html';
}

/** Ouvre la page du calendrier */
function openCalendar() {
  setActiveNav(1);
  window.location.href = 'calendar.html';
}

/** Ouvre le quiz mémoire */
function openQuiz() {
  setActiveNav(2);
  window.location.href = 'quiz.html';
}

/** Ouvre la liste complète des patients */
function openPatientList() {
  setActiveNav(3);
  window.location.href = 'patients.html';
}

/** Ouvre la fiche d'un patient spécifique */
function openPatient(nom, age, pathologie) {
  // Passe les données via URL (ou localStorage selon architecture)
  const params = new URLSearchParams({ nom, age, pathologie });
  window.location.href = 'patient.html?' + params.toString();
}

/** Ouvre la création d'un nouveau RDV */
function openNewRdv() {
  window.location.href = 'calendar.html?new=1';
}

/**
 * Met à jour l'état actif dans la nav mobile.
 * @param {number} index - index du bouton actif (0=accueil, 1=cal, 2=quiz, 3=patients)
 */
function setActiveNav(index) {
  const items = document.querySelectorAll('.mobile-nav-item');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

/* ══════════════════════════════════════════
   UTILITAIRES
══════════════════════════════════════════ */

/** Échappe les caractères HTML pour éviter les injections XSS. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

/* ══════════════════════════════════════════
   POINT D'ENTRÉE
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  renderDate();
  renderStatisticsCard();
  renderRdv();
  renderChecklist();
});


