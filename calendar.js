/* ══════════════════════════════════════════
   VARIABLES D'ÉTAT
══════════════════════════════════════════ */
let calendar;
let currentEvent = null;
let isCreating   = false;
let selectedColor = '#0d9488';

const categoryEmoji = {
  'Consultation': '🩺',
  'Pansement':    '🩹',
  'Injection':    '💉',
  'Suivi':        '📋',
  'Urgence':      '🚨'
};

/* ══════════════════════════════════════════
   INITIALISATION DU CALENDRIER
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  const calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    locale:      'fr',
    headerToolbar: {
      left:   'prev,next today',
      center: 'title',
      right:  'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
      today: "Aujourd'hui",
      month: 'Mois',
      week:  'Semaine',
      day:   'Jour'
    },
    slotMinTime:     '07:00:00',
    slotMaxTime:     '20:00:00',
    allDaySlot:      false,
    slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
    eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
    nowIndicator:    true,
    selectable:      true,
    editable:        true,
    height:          'auto',
    events:          getSavedEvents(),

    /* — Sélection d'une plage en vue semaine/jour — */
    select: function (info) {
      isCreating   = true;
      currentEvent = null;
      document.getElementById('form-date').value  = info.startStr.split('T')[0];
      document.getElementById('form-start').value = info.startStr.includes('T')
        ? info.startStr.split('T')[1].substring(0, 5) : '09:00';
      document.getElementById('form-end').value   = info.endStr.includes('T')
        ? info.endStr.split('T')[1].substring(0, 5) : '09:30';
      clearForm();
      showEditMode('Nouveau rendez-vous', info.startStr.split('T')[0]);
      openModal();
      calendar.unselect();
    },

    /* — Clic sur un jour (vue mois) — */
    dateClick: function (info) {
      isCreating   = true;
      currentEvent = null;
      document.getElementById('form-date').value  = info.dateStr.split('T')[0];
      document.getElementById('form-start').value = '09:00';
      document.getElementById('form-end').value   = '09:30';
      clearForm();
      showEditMode('Nouveau rendez-vous', info.dateStr);
      openModal();
    },

    /* — Clic sur un événement → affiche les détails — */
    eventClick: function (info) {
      currentEvent = info.event;
      isCreating   = false;

      const ext   = info.event.extendedProps;
      const cat   = ext.category || 'Consultation';
      const emoji = categoryEmoji[cat] || '🩺';
      const color = info.event.backgroundColor || '#0d9488';

      // En-tête dynamique
      document.getElementById('modal-header').style.background =
        `linear-gradient(135deg, ${color}, ${darkenColor(color)})`;
      document.getElementById('modal-badge').textContent         = emoji + ' ' + cat;
      document.getElementById('modal-title-display').textContent = info.event.title;

      const start = info.event.start;
      const end   = info.event.end;
      const dateStr = start
        ? start.toLocaleDateString('fr-FR', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
          })
        : '';
      document.getElementById('modal-date-display').textContent = '📅 ' + dateStr;

      // Champs de détail
      document.getElementById('view-patient').textContent  = ext.patient || '—';
      document.getElementById('view-start').textContent    = start
        ? start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '—';
      document.getElementById('view-end').textContent      = end
        ? end.toLocaleTimeString('fr-FR',   { hour: '2-digit', minute: '2-digit' }) : '—';
      document.getElementById('view-category').textContent = emoji + ' ' + cat;
      document.getElementById('view-notes').textContent    = ext.notes || 'Aucune note';

      // Afficher le mode consultation
      document.getElementById('view-mode').style.display = 'block';
      document.getElementById('edit-mode').classList.add('hidden');
      openModal();
    },

    /* — Glisser-déposer & redimensionnement — */
    eventDrop:   function () { saveEvents(); updateSidebar(); },
    eventResize: function () { saveEvents(); updateSidebar(); }
  });

  calendar.render();
  updateSidebar();

  // Fermer le modal en cliquant sur l'overlay
  document.getElementById('modal-overlay').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
});

/* ══════════════════════════════════════════
   GESTION DU MODAL
══════════════════════════════════════════ */

function openModal() {
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  currentEvent = null;
}

/** Passe le modal en mode édition/création */
function showEditMode(title, dateStr) {
  document.getElementById('modal-header').style.background =
    'linear-gradient(135deg, #0d9488, #0f766e)';
  document.getElementById('modal-badge').textContent         = '✏️ Nouveau RDV';
  document.getElementById('modal-title-display').textContent = title;
  document.getElementById('modal-date-display').textContent  = dateStr
    ? '📅 ' + new Date(dateStr + 'T12:00:00').toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })
    : '';
  document.getElementById('view-mode').style.display = 'none';
  document.getElementById('edit-mode').classList.remove('hidden');
}

/** Bascule depuis le mode consultation vers l'édition */
function switchToEdit() {
  if (!currentEvent) return;
  const ext   = currentEvent.extendedProps;
  const start = currentEvent.start;
  const end   = currentEvent.end;

  document.getElementById('form-title').value    = currentEvent.title;
  document.getElementById('form-patient').value  = ext.patient  || '';
  document.getElementById('form-notes').value    = ext.notes    || '';
  document.getElementById('form-category').value = ext.category || 'Consultation';
  document.getElementById('form-date').value     = start
    ? start.toISOString().split('T')[0] : '';
  document.getElementById('form-start').value    = start
    ? start.toTimeString().substring(0, 5) : '09:00';
  document.getElementById('form-end').value      = end
    ? end.toTimeString().substring(0, 5)   : '09:30';
  resetColorPicker(currentEvent.backgroundColor || '#0d9488');

  document.getElementById('view-mode').style.display = 'none';
  document.getElementById('edit-mode').classList.remove('hidden');
  document.getElementById('modal-badge').textContent = '✏️ Modification';
}

/** Annule l'édition et revient au mode consultation (ou ferme si création) */
function cancelEdit() {
  if (isCreating) { closeModal(); return; }
  document.getElementById('view-mode').style.display = 'block';
  document.getElementById('edit-mode').classList.add('hidden');
}

/* ══════════════════════════════════════════
   CRÉATION / MODIFICATION D'UN RDV
══════════════════════════════════════════ */

function saveEvent() {
  const title = document.getElementById('form-title').value.trim();
  if (!title) {
    document.getElementById('form-title').style.borderColor = '#ef4444';
    return;
  }
  document.getElementById('form-title').style.borderColor = '';

  const date      = document.getElementById('form-date').value;
  const startTime = document.getElementById('form-start').value;
  const endTime   = document.getElementById('form-end').value;
  const patient   = document.getElementById('form-patient').value.trim();
  const notes     = document.getElementById('form-notes').value.trim();
  const category  = document.getElementById('form-category').value;

  const startISO = date + 'T' + startTime + ':00';
  const endISO   = date + 'T' + endTime   + ':00';

  if (currentEvent && !isCreating) {
    // Mise à jour d'un événement existant
    currentEvent.setProp('title', title);
    currentEvent.setStart(startISO);
    currentEvent.setEnd(endISO);
    currentEvent.setExtendedProp('patient',  patient);
    currentEvent.setExtendedProp('notes',    notes);
    currentEvent.setExtendedProp('category', category);
    currentEvent.setProp('backgroundColor',  selectedColor);
    currentEvent.setProp('borderColor',      selectedColor);
  } else {
    // Ajout d'un nouvel événement
    calendar.addEvent({
      title,
      start:           startISO,
      end:             endISO,
      backgroundColor: selectedColor,
      borderColor:     selectedColor,
      extendedProps:   { patient, notes, category }
    });
  }

  saveEvents();
  updateSidebar();
  closeModal();
}

/* ══════════════════════════════════════════
   SUPPRESSION D'UN RDV
══════════════════════════════════════════ */

function deleteCurrentEvent() {
  if (currentEvent && confirm('Supprimer ce rendez-vous ?')) {
    currentEvent.remove();
    saveEvents();
    updateSidebar();
    closeModal();
  }
}

/* ══════════════════════════════════════════
   BOUTON « NOUVEAU RDV » (header)
══════════════════════════════════════════ */

function openNewModal() {
  isCreating   = true;
  currentEvent = null;
  const today  = new Date().toISOString().split('T')[0];
  document.getElementById('form-date').value  = today;
  document.getElementById('form-start').value = '09:00';
  document.getElementById('form-end').value   = '09:30';
  clearForm();
  resetColorPicker('#0d9488');
  showEditMode('Nouveau rendez-vous', today);
  openModal();
}

/* ══════════════════════════════════════════
   NAVIGATION — BOUTON AUJOURD'HUI
══════════════════════════════════════════ */

function goToday() {
  calendar.today();
}

/* ══════════════════════════════════════════
   SÉLECTEUR DE COULEUR
══════════════════════════════════════════ */

function selectColor(el) {
  document.querySelectorAll('.color-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selectedColor = el.dataset.color;
}

function resetColorPicker(color) {
  selectedColor = color;
  document.querySelectorAll('.color-opt').forEach(o => {
    o.classList.toggle('selected', o.dataset.color === color);
  });
}

/* ══════════════════════════════════════════
   SIDEBAR — STATISTIQUES & PROCHAINS RDV
══════════════════════════════════════════ */

function updateSidebar() {
  const now       = new Date();
  const todayStr  = now.toISOString().split('T')[0];

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  const all        = calendar.getEvents();
  const todayCount = all.filter(e =>
    e.start && e.start.toISOString().split('T')[0] === todayStr
  ).length;
  const weekCount  = all.filter(e =>
    e.start && e.start >= weekStart && e.start < weekEnd
  ).length;

  document.getElementById('stat-today').textContent = todayCount;
  document.getElementById('stat-week').textContent  = weekCount;

  // Liste des 5 prochains RDV
  const upcoming = all
    .filter(e => e.start && e.start >= now)
    .sort((a, b) => a.start - b.start)
    .slice(0, 5);

  const list = document.getElementById('upcoming-list');
  if (upcoming.length === 0) {
    list.innerHTML = '<div class="upcoming-empty">Aucun RDV à venir</div>';
  } else {
    list.innerHTML = upcoming.map(e => {
      const cat     = e.extendedProps.category || 'Consultation';
      const emoji   = categoryEmoji[cat] || '🩺';
      const timeStr = e.start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      const dateStr = e.start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
      const patient = e.extendedProps.patient ? ' — ' + e.extendedProps.patient : '';
      return `<div class="upcoming-item">
        <div class="upcoming-name">${emoji} ${e.title}</div>
        <div class="upcoming-time">📅 ${dateStr} à ${timeStr}${patient}</div>
      </div>`;
    }).join('');
  }
}

/* ══════════════════════════════════════════
   PERSISTANCE (localStorage)
══════════════════════════════════════════ */

function saveEvents() {
  const events = calendar.getEvents().map(e => ({
    title:           e.title,
    start:           e.start ? e.start.toISOString() : null,
    end:             e.end   ? e.end.toISOString()   : null,
    backgroundColor: e.backgroundColor,
    borderColor:     e.borderColor,
    extendedProps:   e.extendedProps
  }));
  try {
    localStorage.setItem('nurse_calendar_events', JSON.stringify(events));
  } catch (err) {
    console.warn('Impossible de sauvegarder les événements :', err);
  }
}

function getSavedEvents() {
  try {
    const saved = localStorage.getItem('nurse_calendar_events');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    return [];
  }
}

/* ══════════════════════════════════════════
   UTILITAIRES
══════════════════════════════════════════ */

/** Réinitialise les champs du formulaire */
function clearForm() {
  document.getElementById('form-title').value    = '';
  document.getElementById('form-patient').value  = '';
  document.getElementById('form-notes').value    = '';
  document.getElementById('form-category').value = 'Consultation';
  resetColorPicker('#0d9488');
}

/** Assombrit une couleur hex de 30 niveaux */
function darkenColor(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r   = Math.max(0, (num >> 16) - 30);
  const g   = Math.max(0, ((num >> 8) & 0xff) - 30);
  const b   = Math.max(0, (num & 0xff) - 30);
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}