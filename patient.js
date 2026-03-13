/* ══════════════════════════════════════════
   DONNÉES PATIENT (exemple — à remplacer
   par un appel API ou des paramètres URL)
══════════════════════════════════════════ */

/**
 * Récupère les données du patient.
 * En production : lire l'ID depuis l'URL (?id=123)
 * puis faire un fetch('/api/patients/123').
 *
 * Ici on utilise un objet statique pour la démo.
 */
function getPatientData() {
  // Exemple : lire un paramètre URL
  // const params = new URLSearchParams(window.location.search);
  // const id = params.get('id');

  // Données de démonstration
  return {
    nom:       'Sophie Martin',
    age:       47,
    sexe:      'Femme',
    groupe:    'A+',
    avatar:    'https://i.pravatar.cc/160?img=47',
    pathologie:'Insuffisance cardiaque chronique',
    medecin:   'Dr. Bernard Leroy',
    chambre:   'Chambre 214 — Aile B',
    entree:    '2025-03-01',
    allergies: ['Pénicilline', 'Aspirine'],
    traitements: [
      { nom: 'Furosémide',   dose: '40 mg — 1×/jour le matin' },
      { nom: 'Bisoprolol',   dose: '5 mg — 1×/jour' },
      { nom: 'Ramipril',     dose: '10 mg — 1×/jour au coucher' },
      { nom: 'Spironolactone', dose: '25 mg — 1×/jour' }
    ],
    notes: `Patiente coopérative et bien informée de sa pathologie.\n\nSurveillance du poids quotidienne recommandée (± 2 kg/j = alerte).\nÉdème des membres inférieurs en légère régression depuis J3.\n\nProchaine consultation cardiologique prévue le 15/03/2025.`
  };
}

/* ══════════════════════════════════════════
   RENDU DE LA PAGE
══════════════════════════════════════════ */

/**
 * Injecte les données du patient dans le DOM.
 */
function renderPatient(data) {
  // ── Avatar ──────────────────────────────
  const avatar = document.getElementById('patientAvatar');
  if (avatar) {
    avatar.src = data.avatar || 'https://i.pravatar.cc/160';
    avatar.alt = 'Photo de ' + data.nom;
  }

  // ── Identité ────────────────────────────
  setTextContent('patientName',  data.nom);
  setTextContent('patientAge',   data.age);
  setTextContent('patientSexe',  data.sexe   || '—');
  setTextContent('patientGroupe',data.groupe  || '—');
  setTextContent('patientTag',   'Patient');

  // ── Informations médicales ───────────────
  setTextContent('patientDisease', data.pathologie || '—');
  setTextContent('patientMedecin', data.medecin    || '—');
  setTextContent('patientChambre', data.chambre    || '—');

  // Date d'entrée formatée
  const entreeEl = document.getElementById('patientEntree');
  if (entreeEl) {
    entreeEl.textContent = data.entree
      ? formatDate(data.entree)
      : '—';
  }

  // ── Allergies ───────────────────────────
  renderAllergies(data.allergies);

  // ── Traitements ─────────────────────────
  renderTraitements(data.traitements);

  // ── Notes ───────────────────────────────
  setTextContent('patientNotes', data.notes || 'Aucune note pour ce patient.');
}

/**
 * Construit la liste des tags d'allergies.
 */
function renderAllergies(allergies) {
  const container = document.getElementById('patientAllergies');
  if (!container) return;

  if (!allergies || allergies.length === 0) {
    container.innerHTML = '<span class="tag tag-none">Aucune allergie connue</span>';
    return;
  }

  container.innerHTML = allergies
    .map(a => `<span class="tag tag-allergie">⚠️ ${escapeHtml(a)}</span>`)
    .join('');
}

/**
 * Construit la liste des traitements en cours.
 */
function renderTraitements(traitements) {
  const list = document.getElementById('patientTraitements');
  if (!list) return;

  if (!traitements || traitements.length === 0) {
    list.innerHTML = '<li class="treatment-empty">Aucun traitement renseigné</li>';
    return;
  }

  list.innerHTML = traitements.map(t => `
    <li class="treatment-item">
      <div class="treatment-dot"></div>
      <div>
        <div class="treatment-name">${escapeHtml(t.nom)}</div>
        <div class="treatment-dose">${escapeHtml(t.dose)}</div>
      </div>
    </li>
  `).join('');
}

/* ══════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════ */

/**
 * Retourne à la page précédente dans l'historique.
 * Si aucune page précédente n'existe, redirige vers l'accueil.
 */
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

/* ══════════════════════════════════════════
   UTILITAIRES
══════════════════════════════════════════ */

/**
 * Définit le textContent d'un élément par son ID.
 */
function setTextContent(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? '—';
}

/**
 * Formate une date ISO (YYYY-MM-DD) en format lisible français.
 * Ex : "2025-03-01" → "1 mars 2025"
 */
function formatDate(isoStr) {
  try {
    return new Date(isoStr + 'T12:00:00').toLocaleDateString('fr-FR', {
      day:   'numeric',
      month: 'long',
      year:  'numeric'
    });
  } catch {
    return isoStr;
  }
}

/**
 * Échappe les caractères HTML pour éviter les injections.
 */
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
  const data = getPatientData();
  renderPatient(data);
});