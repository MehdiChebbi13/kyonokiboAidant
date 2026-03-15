import { useState, useEffect } from "react";

// ─── DESIGN TOKENS — Kyōnokibō Shared Design System ─────────────────────────
// These tokens are shared between the patient (accueilli) and caregiver (aidant)
// interfaces to ensure full visual consistency across the application.
//
// Source of truth: patient interface palette
//   Primary    #7BA7BC  — calm blue, main interactive color
//   Secondary  #9DBFA3  — soft green, secondary actions & positive states
//   Accent     #E07840  — warm orange, alerts, urgent events
//   Accent Alt #C4A882  — warm sand, family/special events
//   Lilac      #B39BC8  — support color, soft highlights
//   Background #F5F0E8  — warm ivory, main app background
//   Surface    #FFFFFF  — pure white for panels
//   Card       #FBFDFF  — near-white for card surfaces
//   Border     #D8E5EE  — soft blue-grey borders
//   Text Pri   #2D3748  — deep navy for headings & body
//   Text Sec   #8EA0AE  — muted blue-grey for labels
//   Text Muted #9AABBF  — very muted for placeholders
//   Success    #4CAF50
//   Warning    #E07840  (= accent)
//   Error      #E07070

const T = {
  // ── Primary (calm blue — main CTA, active states, links)
  primary:      "#7BA7BC",
  primaryLight: "#EEF5FF",
  primaryDark:  "#5D8FAE",

  // ── Secondary (soft green — success, positive, secondary actions)
  secondary:      "#9DBFA3",
  secondaryDark:  "#6A9E74",
  secondaryLight: "#F0F7F3",

  // ── Accent (warm orange — urgent events, warnings, important badges)
  accent:      "#E07840",
  accentLight: "#FDF3EC",

  // ── Accent Alt (warm sand — family events, gold highlights)
  accentAlt:      "#C4A882",
  accentAltLight: "#FAF6EF",

  // ── Support (soft lilac — decorative, soft highlights)
  lilac:      "#B39BC8",
  lilacLight: "#F3EEF8",

  // ── Backgrounds & Surfaces
  bg:      "#F5F0E8",   // warm ivory — app background
  surface: "#FFFFFF",   // pure white — sidebars, modals
  card:    "#FBFDFF",   // near-white — card surfaces
  border:  "#D8E5EE",   // soft blue-grey — dividers, inputs

  // ── Text
  textPrimary:   "#2D3748",  // deep navy — headings, body
  textSecondary: "#8EA0AE",  // muted — labels, subtitles
  textMuted:     "#9AABBF",  // very muted — placeholders, timestamps

  // ── Semantic
  success:    "#4CAF50",
  successBg:  "#F0F7F3",
  warning:    "#E07840",
  warningBg:  "#FDF3EC",
  error:      "#E07070",
  errorBg:    "#FFF0F0",
  errorBorder:"#F5C0C0",

  // ── Neutral scale (used for backgrounds, borders, muted text)
  neutral50:  "#F8F9FA",
  neutral100: "#EEF5FF",   // maps to primaryLight for tinted surfaces
  neutral200: "#D8E5EE",   // = border
  neutral400: "#9AABBF",   // = textMuted
  neutral600: "#8EA0AE",   // = textSecondary
  neutral700: "#6B7A8D",
  neutral800: "#2D3748",   // = textPrimary
  neutral900: "#1A2535",

  // ── Shadows (unchanged — neutral values)
  shadow:   "0 2px 16px rgba(80,80,100,0.08)",
  shadowMd: "0 4px 24px rgba(80,80,100,0.11)",
  shadowLg: "0 8px 40px rgba(80,80,100,0.15)",

  // ── Radii (unchanged)
  radius:   "16px",
  radiusSm: "10px",
  radiusLg: "24px",
};


// ─── GOOGLE FONTS INJECTION ───────────────────────────────────────────────────
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 15px; }
    body { font-family: 'DM Sans', sans-serif; background: ${T.bg}; color: ${T.textPrimary}; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${T.neutral200}; border-radius: 3px; }

    .app-bg {
      background-color: ${T.bg};
      background-image:
        radial-gradient(circle at 20% 80%, rgba(123,167,188,0.07) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(157,191,163,0.07) 0%, transparent 50%),
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237BA7BC' fill-opacity='0.04'%3E%3Cpath d='M30 5C27 12 20 15 15 20s-7 13-5 20 9 11 16 10 13-7 14-14-3-14-7-18-8-8-3-13M30 5C33 12 40 15 45 20s7 13 5 20-9 11-16 10-13-7-14-14 3-14 7-18 8-8 3-13'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      min-height: 100vh;
    }

    .sidebar-link {
      display: flex; align-items: center; gap: 10px; padding: 10px 14px;
      border-radius: ${T.radiusSm}; cursor: pointer; transition: all 0.18s ease;
      color: ${T.textSecondary}; font-size: 0.87rem; font-weight: 500; text-decoration: none;
      border: none; background: none; width: 100%; text-align: left;
    }
    .sidebar-link:hover { background: ${T.secondaryLight}; color: ${T.secondary}; }
    .sidebar-link.active { background: ${T.secondaryLight}; color: ${T.secondary}; font-weight: 600; }
    .sidebar-link.active .nav-icon { color: ${T.secondary}; }

    .kpi-card { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: default; }
    .kpi-card:hover { transform: translateY(-2px); box-shadow: ${T.shadowMd}; }

    .btn { border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: all 0.18s ease; }
    .btn-primary { background: ${T.secondary}; color: white; padding: 9px 20px; border-radius: ${T.radiusSm}; font-size: 0.87rem; }
    .btn-primary:hover { background: ${T.secondaryDark}; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(157,191,163,0.35); }
    .btn-secondary { background: ${T.neutral100}; color: ${T.neutral700}; padding: 9px 20px; border-radius: ${T.radiusSm}; font-size: 0.87rem; }
    .btn-secondary:hover { background: ${T.neutral200}; }
    .btn-ghost { background: transparent; color: ${T.textSecondary}; padding: 7px 14px; border-radius: ${T.radiusSm}; font-size: 0.83rem; border: 1px solid ${T.neutral200}; }
    .btn-ghost:hover { background: ${T.neutral50}; border-color: ${T.textMuted}; }
    .btn-danger { background: ${T.errorBg}; color: ${T.error}; padding: 7px 14px; border-radius: ${T.radiusSm}; font-size: 0.83rem; border: 1px solid ${T.errorBorder}; }
    .btn-danger:hover { background: ${T.errorBg}; }

    .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .badge-green { background: ${T.secondaryLight}; color: ${T.secondary}; }
    .badge-blue { background: ${T.secondaryLight}; color: ${T.primaryDark}; }
    .badge-peach { background: ${T.accentLight}; color: ${T.accentAlt}; }
    .badge-red { background: ${T.errorBg}; color: ${T.error}; }
    .badge-gray { background: ${T.neutral100}; color: ${T.textSecondary}; }

    .toggle-wrap { position: relative; display: inline-block; width: 44px; height: 24px; }
    .toggle-wrap input { opacity: 0; width: 0; height: 0; }
    .toggle-slider { position: absolute; cursor: pointer; top:0; left:0; right:0; bottom:0; background: ${T.neutral200}; transition: 0.3s; border-radius: 24px; }
    .toggle-slider:before { position: absolute; content:""; height:18px; width:18px; left:3px; bottom:3px; background:white; transition:0.3s; border-radius:50%; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
    .toggle-wrap input:checked + .toggle-slider { background: ${T.secondary}; }
    .toggle-wrap input:checked + .toggle-slider:before { transform: translateX(20px); }

    .tab-btn { padding: 8px 18px; border-radius: 8px; font-size: 0.85rem; font-weight: 500; border: none; cursor: pointer; transition: all 0.18s; background: transparent; color: ${T.textSecondary}; }
    .tab-btn.active { background: white; color: ${T.secondary}; box-shadow: ${T.shadow}; font-weight: 600; }
    .tab-btn:not(.active):hover { background: ${T.secondaryLight}; color: ${T.secondary}; }

    .card { background: white; border-radius: ${T.radius}; box-shadow: ${T.shadow}; }
    .input-field { border: 1.5px solid ${T.neutral200}; border-radius: ${T.radiusSm}; padding: 9px 13px; font-size: 0.87rem; font-family: 'DM Sans',sans-serif; color: ${T.textPrimary}; background: white; outline: none; width: 100%; transition: border-color 0.18s; }
    .input-field:focus { border-color: ${T.secondary}; box-shadow: 0 0 0 3px rgba(157,191,163,0.15); }
    .label { font-size: 0.8rem; font-weight: 600; color: ${T.textSecondary}; margin-bottom: 5px; display: block; text-transform: uppercase; letter-spacing: 0.04em; }

    @keyframes fadeIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
    .fade-in { animation: fadeIn 0.3s ease forwards; }

    @keyframes shimmer { 0%,100% { opacity:0.6; } 50% { opacity:1; } }

    .stat-bar-fill { transition: width 1s ease; }
    .cal-day:hover { background: ${T.secondaryLight} !important; cursor: pointer; }
    .cal-day.has-event { background: rgba(157,191,163,0.08); }

    textarea.input-field { resize: vertical; min-height: 80px; }
    select.input-field { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236C757D' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; }

    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.35); backdrop-filter:blur(4px); z-index:1000; display:flex; align-items:center; justify-content:center; animation: fadeIn 0.2s ease; }
    .modal-box { background:white; border-radius: ${T.radiusLg}; box-shadow: ${T.shadowLg}; max-height:90vh; overflow-y:auto; animation: fadeIn 0.25s ease; }
    .modal-box::-webkit-scrollbar { width:4px; }

    .progress-ring { transform: rotate(-90deg); }
    .question-type-btn { border: 2px solid ${T.neutral200}; border-radius: ${T.radiusSm}; padding: 10px 14px; cursor:pointer; transition: all 0.18s; background:white; font-size:0.82rem; text-align:center; }
    .question-type-btn:hover { border-color: ${T.secondary}; background: ${T.secondaryLight}; }
    .question-type-btn.selected { border-color: ${T.secondary}; background: ${T.secondaryLight}; color: ${T.secondary}; font-weight:600; }

    .step-indicator { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.78rem; font-weight:700; }
    .step-done { background: ${T.secondary}; color:white; }
    .step-active { background: white; border: 2px solid ${T.secondary}; color: ${T.secondary}; }
    .step-todo { background: ${T.neutral100}; color: ${T.textMuted}; }

    .insight-card { border-left: 3px solid ${T.secondary}; padding: 12px 16px; background: ${T.secondaryLight}; border-radius: 0 ${T.radiusSm} ${T.radiusSm} 0; }
    .insight-card.blue { border-color: ${T.secondary}; background: ${T.secondaryLight}; }
    .insight-card.peach { border-color: ${T.accent}; background: ${T.accentLight}; }

    .upload-zone { border: 2px dashed ${T.neutral200}; border-radius: ${T.radiusSm}; padding: 24px; text-align:center; cursor:pointer; transition: all 0.18s; }
    .upload-zone:hover { border-color: ${T.secondary}; background: ${T.secondaryLight}; }

    .answer-slot { border: 1.5px solid ${T.neutral200}; border-radius: ${T.radiusSm}; overflow:hidden; transition: border-color 0.18s; }
    .answer-slot.correct { border-color: ${T.secondary}; background: ${T.secondaryLight}; }

    .event-dot { width:7px; height:7px; border-radius:50%; display:inline-block; flex-shrink:0; }
    .event-important { background: ${T.accent}; }
    .event-normal { background: ${T.secondary}; }

    .settings-section { background:white; border-radius:${T.radius}; box-shadow:${T.shadow}; padding:24px; }
  `}</style>
);

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const patient = {
  name: "Marguerite Fontaine",
  age: 78,
  photo: null,
  diagnosis: "Maladie d'Alzheimer – stade léger",
  since: "Mars 2023",
};

const caregiver = {
  name: "Sophie Fontaine",
  role: "Fille – Aidante principale",
  email: "sophie.fontaine@email.com",
  photo: null,
};

const todayTasks = [
  { id: 1, time: "08:30", title: "Médicaments du matin", done: true, important: true },
  { id: 2, time: "10:00", title: "Quiz du jour", done: true, important: false },
  { id: 3, time: "14:30", title: "Kinésithérapie – Dr. Martin", done: false, important: true },
  { id: 4, time: "16:00", title: "Appel de Pierre (fils)", done: false, important: false },
  { id: 5, time: "19:00", title: "Médicaments du soir", done: false, important: true },
];

const recentActivity = [
  { id: 1, type: "quiz", icon: "✓", color: T.secondary, text: "Quiz du jour terminé", sub: "Score : 7/10 • 9 min 32 sec", time: "10h42" },
  { id: 2, type: "difficulty", icon: "?", color: T.secondary, text: "Question difficile : « Qui est Pierre ? »", sub: "Quiz personnalisé – Famille proche", time: "hier 15h" },
  { id: 3, type: "event", icon: "✓", color: T.secondary, text: "Médicaments du matin pris", sub: "Tâche marquée comme réalisée", time: "hier 08h" },
  { id: 4, type: "warning", icon: "!", color: T.accent, text: "Rendez-vous Dr. Renaud non effectué", sub: "Mercredi 12 mars", time: "il y a 3j" },
  { id: 5, type: "event", icon: "◆", color: T.accentAlt, text: "Anniversaire de Claude approche", sub: "Dans 4 jours", time: "il y a 4j" },
];

const weekStats = {
  correctRate: 68,
  noHintRate: 45,
  firstTryRate: 52,
  avgTime: "1m 24s",
  totalQuizzes: 5,
  abandoned: 1,
  hintsUsed: 12,
};

const quizList = [
  { id: 1, title: "La famille proche", questions: 8, lastScore: 87, played: 14, cover: "👨‍👩‍👧‍👦", desc: "Questions sur les proches : Pierre, Claude, Sophie…" },
  { id: 2, title: "Souvenirs d'enfance", questions: 6, lastScore: 72, played: 9, cover: "🌸", desc: "Les lieux, les odeurs, les moments d'autrefois" },
  { id: 3, title: "La maison et les objets", questions: 10, lastScore: 61, played: 7, cover: "🏡", desc: "Reconnaître les pièces, objets du quotidien" },
  { id: 4, title: "Les animaux favoris", questions: 5, lastScore: 94, played: 11, cover: "🐱", desc: "Photos d'animaux familiers et favoris" },
];

const calendarEvents = [
  { id: 1, title: "Kinésithérapie", date: "2025-06-03", time: "14:30", lieu: "Cabinet Dr. Martin", important: true, color: T.accent, reminders: ["3h", "1h"] },
  { id: 2, title: "Anniversaire de Claude", date: "2025-06-07", time: "15:00", lieu: "Maison familiale", important: true, color: T.accentAlt, reminders: ["1j", "3h"] },
  { id: 3, title: "Consultation neurologie", date: "2025-06-12", time: "10:00", lieu: "Hôpital Pasteur, Nice", important: true, color: T.accent, reminders: ["1j", "1h"] },
  { id: 4, title: "Séance musicothérapie", date: "2025-06-10", time: "11:00", lieu: "Centre de jour", important: false, color: T.secondary, reminders: ["1h"] },
  { id: 5, title: "Visite de Sophie", date: "2025-06-15", time: "14:00", lieu: "Domicile", important: false, color: T.primary, reminders: ["15m"] },
  { id: 6, title: "Kinésithérapie", date: "2025-06-17", time: "14:30", lieu: "Cabinet Dr. Martin", important: false, color: T.secondary, reminders: ["1h"] },
  { id: 7, title: "Prise de sang", date: "2025-06-20", time: "08:30", lieu: "Laboratoire Pasteur", important: true, color: T.accent, reminders: ["1j"] },
  { id: 8, title: "Repas en famille", date: "2025-06-22", time: "12:30", lieu: "Restaurant Le Jardin", important: true, color: T.accentAlt, reminders: ["1j", "3h"] },
];

const statsHistory = [
  { day: "Lu", score: 62, noHint: 40 }, { day: "Ma", score: 71, noHint: 55 },
  { day: "Me", score: 58, noHint: 38 }, { day: "Je", score: 75, noHint: 58 },
  { day: "Ve", score: 80, noHint: 65 }, { day: "Sa", score: 68, noHint: 45 },
  { day: "Di", score: 72, noHint: 50 },
];

const quizBreakdown = [
  { name: "La famille proche", score: 87, plays: 14, trend: "↑" },
  { name: "Souvenirs d'enfance", score: 72, plays: 9, trend: "→" },
  { name: "La maison et les objets", score: 61, plays: 7, trend: "↓" },
  { name: "Les animaux favoris", score: 94, plays: 11, trend: "↑" },
];

const insights = [
  { text: "Les quiz sur la famille proche obtiennent les meilleurs scores (+23% vs moyenne)", type: "green" },
  { text: "Le taux de bonnes réponses au premier essai est en baisse cette semaine (52% vs 64%)", type: "peach" },
  { text: "Les questions avec image sont mieux réussies que les questions textuelles (81% vs 58%)", type: "blue" },
  { text: "Marguerite utilise davantage les indices en après-midi qu'en matinée", type: "peach" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color }) => {
  const icons = {
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
    arrow: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
    star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    image: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
    lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
    download: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
    logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color || "currentColor"} style={{ flexShrink: 0 }}>
      <path d={icons[name] || icons.dashboard} />
    </svg>
  );
};

const Toggle = ({ checked, onChange }) => (
  <label className="toggle-wrap">
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
    <span className="toggle-slider" />
  </label>
);

const Avatar = ({ name, size = 40, photo, bg = T.secondaryLight, color = T.secondary }) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color, fontSize: size * 0.36, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", flexShrink: 0, border: `2px solid ${T.surface}`, boxShadow: T.shadow }}>
      {initials}
    </div>
  );
};

const CircleProgress = ({ value, size = 72, stroke = 7, color = T.secondary, label }) => {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} className="progress-ring">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.neutral100} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.24, fontWeight: 700, color: T.textPrimary }}>{value}%</span>
        {label && <span style={{ fontSize: size * 0.14, color: T.textMuted, marginTop: 1 }}>{label}</span>}
      </div>
    </div>
  );
};

const BarChart = ({ data, height = 120 }) => {
  const max = Math.max(...data.map(d => Math.max(d.score, d.noHint)));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height, padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: height - 20 }}>
            <div style={{ flex: 1, background: T.secondary, borderRadius: "3px 3px 0 0", height: `${(d.score / max) * 100}%`, opacity: 0.85, minHeight: 4 }} />
            <div style={{ flex: 1, background: T.secondary, borderRadius: "3px 3px 0 0", height: `${(d.noHint / max) * 100}%`, opacity: 0.7, minHeight: 4 }} />
          </div>
          <span style={{ fontSize: "0.7rem", color: T.textMuted, fontWeight: 500 }}>{d.day}</span>
        </div>
      ))}
    </div>
  );
};

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const Sidebar = ({ page, setPage }) => {
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "quiz", label: "Quiz", icon: "quiz" },
    { id: "calendar", label: "Calendrier", icon: "calendar" },
    { id: "stats", label: "Statistiques", icon: "stats" },
    { id: "settings", label: "Paramètres", icon: "settings" },
  ];
  return (
    <aside style={{ width: 220, flexShrink: 0, background: T.surface, borderRight: `1px solid ${T.neutral100}`, display: "flex", flexDirection: "column", padding: "24px 12px", position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
      {/* Logo */}
      <div style={{ padding: "0 8px 24px", borderBottom: `1px solid ${T.neutral100}`, marginBottom: 16 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: T.textPrimary, letterSpacing: "-0.01em" }}>
          Kyō<span style={{ color: T.secondary }}>no</span>kibō
        </div>
        <div style={{ fontSize: "0.72rem", color: T.textMuted, marginTop: 2, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>Espace aidant</div>
      </div>

      {/* Patient pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: T.secondaryLight, borderRadius: T.radiusSm, padding: "10px 12px", marginBottom: 20 }}>
        <Avatar name={patient.name} size={34} />
        <div>
          <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.textPrimary }}>{patient.name.split(" ")[0]}</div>
          <div style={{ fontSize: "0.7rem", color: T.textMuted }}>Patient suivi</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {nav.map(n => (
          <button key={n.id} className={`sidebar-link ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
            <span className="nav-icon"><Icon name={n.icon} size={16} /></span>
            {n.label}
          </button>
        ))}
      </nav>

      {/* Caregiver */}
      <div style={{ borderTop: `1px solid ${T.neutral100}`, paddingTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name={caregiver.name} size={34} bg={T.secondaryLight} color={T.secondary} />
        <div>
          <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.textPrimary }}>{caregiver.name.split(" ")[0]}</div>
          <div style={{ fontSize: "0.7rem", color: T.textMuted }}>Aidante</div>
        </div>
      </div>
    </aside>
  );
};

// ─── HEADER ───────────────────────────────────────────────────────────────────
const Header = ({ title, subtitle, action }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
    <div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.85rem", fontWeight: 600, color: T.neutral900, letterSpacing: "-0.02em", lineHeight: 1.1 }}>{title}</h1>
      {subtitle && <p style={{ color: T.textMuted, fontSize: "0.85rem", marginTop: 4 }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

// ─── KPI CARD ────────────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, icon, accent = T.secondary, accentBg }) => (
  <div className="card kpi-card" style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: accentBg || `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, fontSize: "1rem" }}>
        {icon}
      </div>
    </div>
    <div>
      <div style={{ fontSize: "1.6rem", fontWeight: 700, color: T.neutral900, fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: "0.75rem", color: T.textMuted, marginTop: 4 }}>{sub}</div>}
    </div>
  </div>
);

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const [tasks, setTasks] = useState(todayTasks);
  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const toggleTask = id => setTasks(ts => ts.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const doneTasks = tasks.filter(t => t.done).length;

  const nextEvent = calendarEvents.filter(e => e.important).find(e => e.date >= "2025-06-03") || calendarEvents[0];

  return (
    <div className="fade-in">
      {/* Welcome header */}
      <div className="card" style={{ padding: "24px 28px", marginBottom: 24, background: `linear-gradient(135deg, ${T.secondaryLight} 0%, ${T.primaryLight} 100%)`, border: `1px solid ${T.neutral200}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.78rem", color: T.textMuted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{dateStr}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: T.neutral900, marginBottom: 6 }}>
              Bonjour, Sophie 👋
            </h1>
            <p style={{ color: T.textSecondary, fontSize: "0.9rem" }}>
              Marguerite a complété son quiz du matin avec un bon score. <strong>{doneTasks}/{tasks.length}</strong> tâches accomplies aujourd'hui.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="badge badge-green" style={{ fontSize: "0.8rem", padding: "6px 14px" }}>Journée sereine ✦</div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <KpiCard label="Quiz du jour" value="Terminé ✓" sub="Score : 7/10 • 9 min 32 s" icon="📝" accent={T.secondary} />
        <KpiCard label="Tâches du jour" value={`${doneTasks} / ${tasks.length}`} sub={`${tasks.length - doneTasks} restante(s)`} icon="✓" accent={T.secondary} />
        <KpiCard label="Taux de réussite" value="68 %" sub="Cette semaine • −4% vs semaine passée" icon="📊" accent={T.accent} />
        <KpiCard label="Temps moyen" value="1m 24s" sub="Par question aujourd'hui" icon="⏱" accent={T.accentAlt} />
      </div>

      {/* Main columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 20 }}>
        {/* Checklist */}
        <div className="card" style={{ padding: "22px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: T.textPrimary }}>Checklist du jour</h2>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.secondary }} />
              <span style={{ fontSize: "0.78rem", color: T.textMuted }}>{doneTasks} / {tasks.length} effectuées</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tasks.map(task => (
              <div key={task.id} onClick={() => toggleTask(task.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: T.radiusSm, background: task.done ? T.secondaryLight : T.neutral50, border: `1px solid ${task.done ? `${T.secondary}30` : T.neutral200}`, cursor: "pointer", transition: "all 0.18s", opacity: task.done ? 0.75 : 1 }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${task.done ? T.secondary : T.neutral400}`, background: task.done ? T.secondary : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.18s" }}>
                  {task.done && <Icon name="check" size={12} color="white" />}
                </div>
                <span style={{ fontSize: "0.78rem", color: T.textMuted, fontVariantNumeric: "tabular-nums", width: 36, flexShrink: 0 }}>{task.time}</span>
                <span style={{ flex: 1, fontSize: "0.88rem", fontWeight: 500, color: task.done ? T.textMuted : T.textPrimary, textDecoration: task.done ? "line-through" : "none" }}>{task.title}</span>
                {task.important && <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, flexShrink: 0 }} title="Important" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Next important event */}
          <div className="card" style={{ padding: "18px 20px", border: `1px solid ${T.accent}40` }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>⚡ Prochain événement important</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 600, color: T.neutral900, marginBottom: 4 }}>{nextEvent.title}</div>
            <div style={{ fontSize: "0.82rem", color: T.textSecondary, marginBottom: 8 }}>
              {new Date(nextEvent.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} à {nextEvent.time}
            </div>
            <div style={{ fontSize: "0.8rem", color: T.textMuted }}>📍 {nextEvent.lieu}</div>
          </div>

          {/* Memory summary */}
          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: T.textPrimary, marginBottom: 14 }}>Résumé cognitif</div>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 14 }}>
              <CircleProgress value={68} size={64} label="réussite" color={T.secondary} />
              <CircleProgress value={45} size={64} label="sans indice" color={T.secondary} />
              <CircleProgress value={52} size={64} label="1er essai" color={T.accent} />
            </div>
            <div style={{ background: T.neutral50, borderRadius: T.radiusSm, padding: "10px 12px", fontSize: "0.8rem", color: T.textSecondary }}>
              ⏱ Temps moyen : <strong style={{ color: T.neutral700 }}>1m 24s</strong> par question
            </div>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="card" style={{ padding: "22px 24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: T.textPrimary, marginBottom: 18 }}>Activité récente</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {recentActivity.map((a, i) => (
            <div key={a.id} style={{ display: "flex", gap: 14, paddingBottom: i < recentActivity.length - 1 ? 14 : 0, marginBottom: i < recentActivity.length - 1 ? 14 : 0, borderBottom: i < recentActivity.length - 1 ? `1px solid ${T.neutral100}` : "none", alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: a.color, flexShrink: 0, fontWeight: 700 }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.87rem", fontWeight: 500, color: T.textPrimary }}>{a.text}</div>
                <div style={{ fontSize: "0.78rem", color: T.textMuted, marginTop: 2 }}>{a.sub}</div>
              </div>
              <span style={{ fontSize: "0.75rem", color: T.neutral400, flexShrink: 0 }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// ─── QUIZ PAGE ─────────────────────────────────────────────────────────────────
const QuizPage = () => {
  const [tab, setTab] = useState("daily");
  const [dailyConfig, setDailyConfig] = useState({ hints: true, truefalse: true, removeFalse: false });
  const [showBuilder, setShowBuilder] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);
  const [showPreview, setShowPreview] = useState(null);
  const [quizzes, setQuizzes] = useState(quizList);

  const toggleConfig = (key) => setDailyConfig(c => ({ ...c, [key]: !c[key] }));
  const deleteQuiz = (id) => setQuizzes(qs => qs.filter(q => q.id !== id));

  const handleSave = ({ title, desc, emoji, questions, config }) => {
    const questionCount = Array.isArray(questions) ? questions.length : (questions || 0);
    if (editQuiz) {
      setQuizzes(qs => qs.map(x =>
        x.id === editQuiz.id
          ? { ...x, title, desc: desc || "", cover: emoji || x.cover, questions: questionCount }
          : x
      ));
    } else {
      setQuizzes(qs => [...qs, {
        id: Date.now(),
        title,
        desc: desc || "",
        cover: emoji || "📝",
        questions: questionCount,
        lastScore: 0,
        played: 0,
      }]);
    }
    setShowBuilder(false);
    setEditQuiz(null);
  };

  const openEdit = (q) => { setEditQuiz(q); setShowBuilder(true); };
  const openCreate = () => { setEditQuiz(null); setShowBuilder(true); };
  const closeBuilder = () => { setShowBuilder(false); setEditQuiz(null); };

  const dailyConfigOptions = [
    { key: "hints",       label: "Ajouter des indices",            desc: "Un indice apparaît après la première mauvaise réponse" },
    { key: "truefalse",   label: "Transformer en vrai / faux",     desc: "Les questions échouées sont reproposées en format vrai/faux en fin de quiz" },
    { key: "removeFalse", label: "Supprimer des réponses fausses", desc: "Une mauvaise réponse est supprimée après la deuxième erreur" },
  ];

  return (
    <div className="fade-in">
      <Header title="Quiz" subtitle="Quiz du jour et quiz personnalisés de Marguerite" />

      <div style={{ background: T.neutral100, borderRadius: 12, padding: 4, display: "inline-flex", gap: 2, marginBottom: 28 }}>
        <button className={`tab-btn ${tab === "daily" ? "active" : ""}`} onClick={() => setTab("daily")}>Quiz du jour</button>
        <button className={`tab-btn ${tab === "custom" ? "active" : ""}`} onClick={() => setTab("custom")}>Quiz personnalisés</button>
      </div>

      {/* ── QUIZ DU JOUR ── */}
      {tab === "daily" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 22 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="card" style={{ padding: "24px 26px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, color: T.textPrimary, marginBottom: 20 }}>Configuration globale</h2>
              {dailyConfigOptions.map(opt => (
                <div key={opt.key} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${T.neutral100}` }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: T.textPrimary, marginBottom: 3 }}>{opt.label}</div>
                    <div style={{ fontSize: "0.8rem", color: T.textMuted }}>{opt.desc}</div>
                  </div>
                  <Toggle checked={dailyConfig[opt.key]} onChange={() => toggleConfig(opt.key)} />
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: "24px 26px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, color: T.textPrimary }}>Quiz d'aujourd'hui</h2>
                <span className="badge badge-green">Terminé</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
                {[["10 questions", "Prévu"], ["7 / 10", "Score"], ["9 min 32 s", "Durée"]].map(([v, l]) => (
                  <div key={l} style={{ background: T.neutral50, borderRadius: T.radiusSm, padding: "12px 14px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: T.neutral900 }}>{v}</div>
                    <div style={{ fontSize: "0.73rem", color: T.textMuted, marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["Qui est le fils de Marguerite ?", true],
                  ["Dans quelle ville habitiez-vous enfant ?", true],
                  ["Quel animal avez-vous eu ?", true],
                  ["Quel jour sommes-nous ?", false],
                ].map(([q, correct], idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: correct ? T.primaryLight : T.errorBg, borderRadius: T.radiusSm }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: correct ? T.secondary : T.error, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.85rem", color: T.neutral700, flex: 1 }}>{q}</span>
                    <span style={{ fontSize: "0.73rem", color: correct ? T.secondary : T.error, fontWeight: 600 }}>{correct ? "✓ Correct" : "✗ Échoué"}</span>
                  </div>
                ))}
                <div style={{ fontSize: "0.78rem", color: T.textMuted, textAlign: "center", paddingTop: 4 }}>+ 6 autres questions</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: T.textPrimary, marginBottom: 16 }}>Aperçu du fonctionnement</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { step: 1, text: "Question affichée avec toutes les réponses", active: true },
                  { step: 2, text: "1ʳᵉ erreur → un indice apparaît", active: dailyConfig.hints },
                  { step: 3, text: "2ᵉ erreur → une mauvaise réponse est supprimée", active: dailyConfig.removeFalse },
                  { step: 4, text: "3ᵉ erreur → passage à la question suivante", active: true },
                  { step: 5, text: "Fin du quiz → questions échouées en vrai/faux", active: dailyConfig.truefalse },
                ].map((s, si, arr) => (
                  <div key={s.step} style={{ display: "flex", gap: 12, paddingBottom: si < arr.length - 1 ? 12 : 0, marginBottom: si < arr.length - 1 ? 12 : 0, opacity: s.active ? 1 : 0.35 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div className={`step-indicator ${s.active ? "step-done" : "step-todo"}`}>{s.step}</div>
                      {si < arr.length - 1 && <div style={{ width: 1, flex: 1, background: T.neutral200, marginTop: 4 }} />}
                    </div>
                    <div style={{ paddingTop: 4 }}>
                      <p style={{ fontSize: "0.85rem", color: s.active ? T.neutral700 : T.textMuted, lineHeight: 1.4 }}>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding: "20px" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 600, color: T.textPrimary, marginBottom: 12 }}>Cette semaine</h3>
              {[["Quiz complétés", "5 / 7"], ["Questions posées", "68"], ["Score moyen", "68 %"], ["Indices utilisés", "12"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${T.neutral100}` }}>
                  <span style={{ fontSize: "0.83rem", color: T.textSecondary }}>{l}</span>
                  <span style={{ fontSize: "0.83rem", fontWeight: 600, color: T.textPrimary }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── QUIZ PERSONNALISÉS ── */}
      {tab === "custom" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <p style={{ color: T.textMuted, fontSize: "0.88rem" }}>{quizzes.length} quiz créé{quizzes.length > 1 ? "s" : ""}</p>
            <button className="btn btn-primary" onClick={openCreate}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="plus" size={15} color="white" /> Créer un quiz</span>
            </button>
          </div>

          {quizzes.length === 0 && (
            <div className="card" style={{ padding: "48px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>📝</div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: T.textMuted, marginBottom: 6 }}>Aucun quiz personnalisé</div>
              <div style={{ fontSize: "0.85rem", color: T.neutral400 }}>Cliquez sur « Créer un quiz » pour commencer</div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
            {quizzes.map(q => (
              <div key={q.id} className="card kpi-card" style={{ padding: "20px 22px" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: T.radiusSm, background: T.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>{q.cover}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 600, color: T.neutral900, marginBottom: 3 }}>{q.title}</div>
                    <div style={{ fontSize: "0.8rem", color: T.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.desc}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                  {[
                    [q.questions, "questions", T.neutral50, T.textPrimary, T.textMuted],
                    [`${q.lastScore}%`, "dernier score", T.primaryLight, T.primaryDark, T.primaryDark],
                    [`${q.played}`, "parties", T.secondaryLight, T.secondary, T.secondary],
                  ].map(([val, lbl, bg, valColor, lblColor]) => (
                    <div key={lbl} style={{ background: bg, borderRadius: 8, padding: "7px 12px", flex: 1, textAlign: "center" }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 700, color: valColor }}>{val}</div>
                      <div style={{ fontSize: "0.7rem", color: lblColor }}>{lbl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-ghost" style={{ flex: 1, fontSize: "0.78rem" }} onClick={() => setShowPreview(q)}>
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}><Icon name="eye" size={13} /> Aperçu</span>
                  </button>
                  <button className="btn btn-ghost" style={{ flex: 1, fontSize: "0.78rem" }} onClick={() => openEdit(q)}>
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}><Icon name="edit" size={13} /> Modifier</span>
                  </button>
                  <button className="btn btn-danger" style={{ padding: "7px 12px" }} onClick={() => deleteQuiz(q.id)}>
                    <Icon name="trash" size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showBuilder && <QuizBuilder onClose={closeBuilder} editQuiz={editQuiz} onSave={handleSave} />}
      {showPreview && <QuizPreview quiz={showPreview} onClose={() => setShowPreview(null)} />}
    </div>
  );
};

// ─── QUIZ BUILDER ─────────────────────────────────────────────────────────────
const COVER_EMOJIS = ["👨‍👩‍👧‍👦","🌸","🏡","🐱","🎵","🌿","☀️","🎨","📸","🍰","🌻","🐦","🚗","📚","⛵","🎭"];

const QuizBuilder = ({ onClose, editQuiz, onSave }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle]     = useState(editQuiz ? editQuiz.title : "");
  const [desc, setDesc]       = useState(editQuiz ? (editQuiz.desc || "") : "");
  const [emoji, setEmoji]     = useState(editQuiz ? (editQuiz.cover || "📝") : "📝");
  const [questions, setQuestions] = useState([
    { id: 1, type: "text-text", text: "", answers: ["", "", "", ""], correct: 0, hint: "" }
  ]);
  const [config, setConfig] = useState({ hints: true, truefalse: false, removeFalse: false });

  const qTypes = [
    { id: "text-text",   label: "Texte → Texte",   icon: "📝"   },
    { id: "text-image",  label: "Texte → Images",  icon: "📝🖼" },
    { id: "image-text",  label: "Image → Texte",   icon: "🖼📝" },
    { id: "image-image", label: "Image → Images",  icon: "🖼🖼" },
  ];

  const addQuestion = () =>
    setQuestions(qs => [...qs, { id: Date.now(), type: "text-text", text: "", answers: ["", "", "", ""], correct: 0, hint: "" }]);
  const removeQuestion = (qid) =>
    setQuestions(qs => qs.filter(q => q.id !== qid));
  const updateQ = (qid, field, val) =>
    setQuestions(qs => qs.map(q => q.id === qid ? { ...q, [field]: val } : q));
  const updateAnswer = (qid, ansIdx, val) =>
    setQuestions(qs => qs.map(q =>
      q.id === qid ? { ...q, answers: q.answers.map((a, ai) => ai === ansIdx ? val : a) } : q
    ));

  const stepLabels = ["Informations", "Questions", "Configuration", "Aperçu"];
  const canAdvance = step !== 1 || title.trim().length > 0;
  const handleSubmit = () => onSave({ title, desc, emoji, questions, config });

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ width: 700, padding: "28px 32px" }}>

        {/* Step bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
          {stepLabels.map((label, si) => (
            <div key={si} style={{ display: "flex", alignItems: "center", gap: 6, flex: si < stepLabels.length - 1 ? 1 : "none" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: 6, cursor: si + 1 < step ? "pointer" : "default" }}
                onClick={() => { if (si + 1 < step) setStep(si + 1); }}
              >
                <div className={`step-indicator ${si + 1 < step ? "step-done" : si + 1 === step ? "step-active" : "step-todo"}`}>
                  {si + 1 < step ? "✓" : si + 1}
                </div>
                <span style={{ fontSize: "0.8rem", color: si + 1 === step ? T.secondary : si + 1 < step ? T.secondary : T.textMuted, fontWeight: si + 1 === step ? 600 : 400 }}>
                  {label}
                </span>
              </div>
              {si < stepLabels.length - 1 && (
                <div style={{ flex: 1, height: 1, background: si + 1 < step ? T.secondary : T.neutral200, marginLeft: 4 }} />
              )}
            </div>
          ))}
          <button className="btn btn-ghost" style={{ marginLeft: "auto", padding: "6px 10px", flexShrink: 0 }} onClick={onClose}>
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: T.neutral900, marginBottom: 20 }}>Informations générales</h3>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Titre du quiz *</label>
              <input
                className="input-field"
                placeholder="Ex : La famille proche"
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus
              />
              {title.trim() === "" && (
                <div style={{ fontSize: "0.75rem", color: T.accent, marginTop: 4 }}>Le titre est obligatoire pour continuer.</div>
              )}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Description courte (optionnel)</label>
              <textarea
                className="input-field"
                placeholder="Décrivez brièvement ce quiz…"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                style={{ minHeight: 70 }}
              />
            </div>
            <div>
              <label className="label">Icône de couverture</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
                {COVER_EMOJIS.map(em => (
                  <button
                    key={em}
                    onClick={() => setEmoji(em)}
                    style={{
                      width: 42, height: 42, borderRadius: 10, fontSize: "1.3rem",
                      border: `2px solid ${emoji === em ? T.secondary : T.neutral200}`,
                      background: emoji === em ? T.secondaryLight : "white",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >{em}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: T.neutral900 }}>Questions ({questions.length})</h3>
              <button className="btn btn-primary" onClick={addQuestion} style={{ fontSize: "0.8rem", padding: "7px 14px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Icon name="plus" size={13} color="white" /> Ajouter</span>
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxHeight: 460, overflowY: "auto", paddingRight: 6 }}>
              {questions.map((q, qi) => (
                <div key={q.id} style={{ border: `1.5px solid ${T.neutral200}`, borderRadius: T.radius, padding: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.secondary, textTransform: "uppercase", letterSpacing: "0.05em" }}>Question {qi + 1}</span>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        {qTypes.map(t => (
                          <button
                            key={t.id}
                            className={`question-type-btn ${q.type === t.id ? "selected" : ""}`}
                            onClick={() => updateQ(q.id, "type", t.id)}
                            style={{ padding: "5px 8px", fontSize: "0.7rem" }}
                            title={t.label}
                          >{t.icon}</button>
                        ))}
                      </div>
                      {questions.length > 1 && (
                        <button className="btn btn-danger" style={{ padding: "5px 8px" }} onClick={() => removeQuestion(q.id)}>
                          <Icon name="trash" size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  {q.type.startsWith("image") ? (
                    <div className="upload-zone" style={{ marginBottom: 12, padding: "14px" }}>
                      <div style={{ fontSize: "1.5rem" }}>🖼️</div>
                      <div style={{ fontSize: "0.78rem", color: T.textMuted, marginTop: 4 }}>Image de la question</div>
                    </div>
                  ) : (
                    <input
                      className="input-field"
                      placeholder="Énoncé de la question…"
                      value={q.text}
                      onChange={e => updateQ(q.id, "text", e.target.value)}
                      style={{ marginBottom: 12 }}
                    />
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                    {q.answers.map((a, ansIdx) => (
                      <div
                        key={ansIdx}
                        className={`answer-slot ${q.correct === ansIdx ? "correct" : ""}`}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px" }}
                      >
                        <button
                          onClick={() => updateQ(q.id, "correct", ansIdx)}
                          title="Marquer comme bonne réponse"
                          style={{
                            width: 20, height: 20, borderRadius: "50%",
                            border: `2px solid ${q.correct === ansIdx ? T.secondary : T.neutral200}`,
                            background: q.correct === ansIdx ? T.secondary : "white",
                            cursor: "pointer", flexShrink: 0, transition: "all 0.15s",
                          }}
                        />
                        {q.type.endsWith("image") ? (
                          <div style={{ flex: 1, height: 40, background: T.neutral50, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: T.textMuted, cursor: "pointer" }}>
                            📷 Réponse {ansIdx + 1}
                          </div>
                        ) : (
                          <input
                            className="input-field"
                            placeholder={`Réponse ${ansIdx + 1}${ansIdx === 0 ? " (bonne réponse)" : ""}`}
                            value={a}
                            onChange={e => updateAnswer(q.id, ansIdx, e.target.value)}
                            style={{ border: "none", padding: 0, background: "transparent", fontSize: "0.83rem", outline: "none", flex: 1 }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <input
                    className="input-field"
                    placeholder="Indice (optionnel)…"
                    value={q.hint}
                    onChange={e => updateQ(q.id, "hint", e.target.value)}
                    style={{ fontSize: "0.82rem" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: T.neutral900, marginBottom: 20 }}>Configuration du quiz</h3>
            {[
              { key: "hints",       label: "Ajouter des indices",            desc: "Un indice est disponible après la première erreur" },
              { key: "truefalse",   label: "Transformer en vrai / faux",     desc: "Les questions ratées reviennent en fin de quiz au format vrai/faux" },
              { key: "removeFalse", label: "Supprimer des réponses fausses", desc: "Une mauvaise réponse disparaît après la deuxième erreur" },
            ].map(opt => (
              <div key={opt.key} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "16px 0", borderBottom: `1px solid ${T.neutral100}` }}>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: T.textPrimary, marginBottom: 3 }}>{opt.label}</div>
                  <div style={{ fontSize: "0.8rem", color: T.textMuted }}>{opt.desc}</div>
                </div>
                <Toggle checked={config[opt.key]} onChange={v => setConfig(c => ({ ...c, [opt.key]: v }))} />
              </div>
            ))}
          </div>
        )}

        {/* ── STEP 4 : Aperçu ── */}
        {step === 4 && (
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: T.neutral900, marginBottom: 20 }}>Aperçu du quiz</h3>
            <div style={{ background: T.primaryLight, borderRadius: T.radius, padding: "20px 22px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                <div style={{ fontSize: "2rem" }}>{emoji}</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: T.neutral900 }}>{title || "Sans titre"}</div>
                  {desc && <div style={{ fontSize: "0.85rem", color: T.textSecondary, marginTop: 2 }}>{desc}</div>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="badge badge-green">{questions.length} question{questions.length > 1 ? "s" : ""}</span>
                {config.hints       && <span className="badge badge-blue">Indices activés</span>}
                {config.truefalse   && <span className="badge badge-gray">Vrai/Faux</span>}
                {config.removeFalse && <span className="badge badge-peach">Suppression réponses</span>}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 300, overflowY: "auto" }}>
              {questions.map((q, qi) => (
                <div key={qi} style={{ border: `1px solid ${T.neutral200}`, borderRadius: T.radiusSm, padding: "14px" }}>
                  <div style={{ fontSize: "0.75rem", color: T.secondary, fontWeight: 700, marginBottom: 6 }}>Q{qi + 1}</div>
                  <div style={{ fontSize: "0.88rem", color: T.neutral700, marginBottom: 8 }}>{q.text || "(Question image)"}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {q.answers.map((a, ai) => (
                      <div
                        key={ai}
                        style={{
                          padding: "6px 10px", borderRadius: 8,
                          background: ai === q.correct ? T.secondaryLight : T.neutral50,
                          fontSize: "0.8rem",
                          color: ai === q.correct ? T.secondary : T.textSecondary,
                          border: `1px solid ${ai === q.correct ? T.secondary + "40" : T.neutral200}`,
                          fontWeight: ai === q.correct ? 600 : 400,
                        }}
                      >
                        {a || (q.type.endsWith("image") ? `Image ${ai + 1}` : `Réponse ${ai + 1}`)}
                        {ai === q.correct && " ✓"}
                      </div>
                    ))}
                  </div>
                  {q.hint && (
                    <div style={{ marginTop: 8, fontSize: "0.78rem", color: T.secondary, background: T.secondaryLight, borderRadius: 6, padding: "5px 10px" }}>
                      💡 {q.hint}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.neutral100}` }}>
          <button className="btn btn-secondary" onClick={() => step > 1 ? setStep(s => s - 1) : onClose()}>
            {step > 1 ? "← Retour" : "Annuler"}
          </button>
          {step < 4 ? (
            <button
              className="btn btn-primary"
              onClick={() => { if (canAdvance) setStep(s => s + 1); }}
              style={{ opacity: canAdvance ? 1 : 0.45, cursor: canAdvance ? "pointer" : "not-allowed" }}
            >
              Continuer →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit}>
              {editQuiz ? "✓ Enregistrer les modifications" : "✓ Créer le quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── QUIZ PREVIEW ─────────────────────────────────────────────────────────────
const QuizPreview = ({ quiz, onClose }) => {
  const questionCount = Array.isArray(quiz.questions) ? quiz.questions.length : (quiz.questions || 0);
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ width: 500, padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600 }}>{quiz.title}</div>
          <button className="btn btn-ghost" style={{ padding: "6px 10px" }} onClick={onClose}><Icon name="close" size={16} /></button>
        </div>
        <div style={{ background: T.primaryLight, borderRadius: T.radiusSm, padding: "16px", marginBottom: 20, textAlign: "center", fontSize: "2.5rem" }}>
          {quiz.cover || "📝"}
        </div>
        {quiz.desc && <div style={{ fontSize: "0.88rem", color: T.textSecondary, marginBottom: 16 }}>{quiz.desc}</div>}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, background: T.neutral50, borderRadius: T.radiusSm, padding: "12px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700 }}>{questionCount}</div>
            <div style={{ fontSize: "0.72rem", color: T.textMuted }}>questions</div>
          </div>
          <div style={{ flex: 1, background: T.primaryLight, borderRadius: T.radiusSm, padding: "12px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700, color: T.primaryDark }}>{quiz.lastScore}%</div>
            <div style={{ fontSize: "0.72rem", color: T.primaryDark }}>meilleur score</div>
          </div>
          <div style={{ flex: 1, background: T.secondaryLight, borderRadius: T.radiusSm, padding: "12px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700, color: T.secondary }}>{quiz.played}×</div>
            <div style={{ fontSize: "0.72rem", color: T.secondary }}>joué</div>
          </div>
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }}>Lancer ce quiz avec Marguerite →</button>
      </div>
    </div>
  );
};


// ─── CALENDAR PAGE ────────────────────────────────────────────────────────────
const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1));
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [events, setEvents] = useState(calendarEvents);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const adjustedFirst = (firstDay + 6) % 7; // Monday start

  const monthName = currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  const eventsForDate = (d) => {
    const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return events.filter(e => e.date === ds);
  };

  const selectedEvents = selectedDay ? eventsForDate(selectedDay) : [];

  const deleteEvent = id => { setEvents(ev => ev.filter(e => e.id !== id)); };

  return (
    <div className="fade-in">
      <Header
        title="Calendrier"
        subtitle="Événements et rappels de Marguerite"
        action={<button className="btn btn-primary" onClick={() => { setEditEvent(null); setShowModal(true); }}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="plus" size={15} color="white" /> Ajouter un événement</span></button>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 22 }}>
        {/* Calendar */}
        <div className="card" style={{ padding: "24px" }}>
          {/* Nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <button className="btn btn-ghost" style={{ padding: "7px 12px" }} onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}>‹</button>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 600, color: T.neutral900, textTransform: "capitalize" }}>{monthName}</h2>
            <button className="btn btn-ghost" style={{ padding: "7px 12px" }} onClick={() => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}>›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 6 }}>
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: "0.72rem", fontWeight: 700, color: T.neutral400, padding: "4px 0", textTransform: "uppercase", letterSpacing: "0.06em" }}>{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
            {Array.from({ length: adjustedFirst }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const dayEvents = eventsForDate(d);
              const isSelected = selectedDay === d;
              const isToday = d === 3 && month === 5 && year === 2025;
              const hasImportant = dayEvents.some(e => e.important);
              return (
                <div
                  key={d}
                  className={`cal-day ${dayEvents.length ? "has-event" : ""}`}
                  onClick={() => setSelectedDay(isSelected ? null : d)}
                  style={{ minHeight: 70, padding: "7px 6px", borderRadius: T.radiusSm, border: `1.5px solid ${isSelected ? T.secondary : isToday ? T.secondaryLight : "transparent"}`, background: isSelected ? T.secondaryLight : undefined, cursor: "pointer", transition: "all 0.15s", position: "relative" }}
                >
                  <div style={{ fontSize: "0.83rem", fontWeight: isToday ? 700 : 400, color: isToday ? T.secondary : T.neutral700, marginBottom: 4 }}>{d}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {dayEvents.slice(0, 2).map(ev => (
                      <div key={ev.id} style={{ fontSize: "0.67rem", padding: "2px 5px", borderRadius: 4, background: ev.important ? `${T.accent}25` : `${T.secondary}20`, color: ev.important ? T.accent : T.primaryDark, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 3 }}>
                        {ev.important && <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.accent, flexShrink: 0, display: "inline-block" }} />}
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && <div style={{ fontSize: "0.63rem", color: T.textMuted }}>+{dayEvents.length - 2}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, marginTop: 16, paddingTop: 14, borderTop: `1px solid ${T.neutral100}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: T.textMuted }}><span className="event-dot event-important" />Événement important</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: T.textMuted }}><span className="event-dot event-normal" />Événement normal</div>
          </div>
        </div>

        {/* Side panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {selectedDay ? (
            <div className="card" style={{ padding: "20px 22px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: T.neutral900, marginBottom: 16 }}>
                {new Date(year, month, selectedDay).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
              </div>
              {selectedEvents.length === 0 ? (
                <div style={{ textAlign: "center", padding: "24px 0", color: T.neutral400, fontSize: "0.85rem" }}>
                  <div style={{ fontSize: "2rem", marginBottom: 8 }}>📅</div>
                  Aucun événement ce jour
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {selectedEvents.map(ev => (
                    <div key={ev.id} style={{ border: `1.5px solid ${ev.important ? T.accent + "50" : T.neutral200}`, borderRadius: T.radiusSm, padding: "12px 14px", background: ev.important ? T.accentLight : "white" }}>
                      {ev.important && <div style={{ fontSize: "0.7rem", fontWeight: 700, color: T.accent, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>⚡ Important</div>}
                      <div style={{ fontWeight: 600, fontSize: "0.9rem", color: T.textPrimary, marginBottom: 4 }}>{ev.title}</div>
                      <div style={{ fontSize: "0.78rem", color: T.textMuted, marginBottom: 2 }}>🕐 {ev.time}</div>
                      <div style={{ fontSize: "0.78rem", color: T.textMuted, marginBottom: 8 }}>📍 {ev.lieu}</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-ghost" style={{ flex: 1, fontSize: "0.75rem", padding: "5px" }} onClick={() => { setEditEvent(ev); setShowModal(true); }}><Icon name="edit" size={12} /></button>
                        <button className="btn btn-danger" style={{ flex: 1, fontSize: "0.75rem", padding: "5px" }} onClick={() => deleteEvent(ev.id)}><Icon name="trash" size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button className="btn btn-primary" style={{ width: "100%", marginTop: 14, fontSize: "0.82rem" }} onClick={() => { setEditEvent(null); setShowModal(true); }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><Icon name="plus" size={13} color="white" /> Ajouter ici</span>
              </button>
            </div>
          ) : (
            <div className="card" style={{ padding: "20px 22px" }}>
              <div style={{ textAlign: "center", padding: "16px 0", color: T.neutral400 }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>👆</div>
                <div style={{ fontSize: "0.85rem" }}>Cliquez sur un jour pour voir les événements</div>
              </div>
            </div>
          )}

          {/* Upcoming important */}
          <div className="card" style={{ padding: "18px 20px" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600, color: T.textPrimary, marginBottom: 12 }}>Prochains événements importants</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {events.filter(e => e.important).slice(0, 3).map(ev => (
                <div key={ev.id} style={{ display: "flex", gap: 10, padding: "10px 12px", background: T.accentLight, borderRadius: T.radiusSm, border: `1px solid ${T.accent}30` }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: T.accent, background: `${T.accent}20`, borderRadius: 6, padding: "3px 6px", flexShrink: 0 }}>
                    {new Date(ev.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                  </span>
                  <span style={{ fontSize: "0.83rem", color: T.neutral700 }}>{ev.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <EventModal
          event={editEvent}
          defaultDate={selectedDay ? `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}` : ""}
          onClose={() => { setShowModal(false); setEditEvent(null); }}
          onSave={ev => {
            if (editEvent) setEvents(evs => evs.map(e => e.id === ev.id ? ev : e));
            else setEvents(evs => [...evs, { ...ev, id: Date.now() }]);
            setShowModal(false); setEditEvent(null);
          }}
        />
      )}
    </div>
  );
};

const EventModal = ({ event, defaultDate, onClose, onSave }) => {
  const [form, setForm] = useState(event || { title: "", date: defaultDate || "", time: "", lieu: "", description: "", important: false, reminders: [], color: T.secondary });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleReminder = r => set("reminders", form.reminders.includes(r) ? form.reminders.filter(x => x !== r) : [...form.reminders, r]);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ width: 520, padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600 }}>{event ? "Modifier l'événement" : "Nouvel événement"}</h3>
          <button className="btn btn-ghost" style={{ padding: "6px 10px" }} onClick={onClose}><Icon name="close" size={16} /></button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label className="label">Titre *</label><input className="input-field" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Ex : Rendez-vous médecin" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label className="label">Date</label><input type="date" className="input-field" value={form.date} onChange={e => set("date", e.target.value)} /></div>
            <div><label className="label">Heure</label><input type="time" className="input-field" value={form.time} onChange={e => set("time", e.target.value)} /></div>
          </div>
          <div><label className="label">Lieu</label><input className="input-field" value={form.lieu} onChange={e => set("lieu", e.target.value)} placeholder="Ex : Cabinet Dr. Martin, Nice" /></div>
          <div><label className="label">Description</label><textarea className="input-field" value={form.description} onChange={e => set("description", e.target.value)} placeholder="Informations complémentaires…" /></div>

          {/* Important toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: form.important ? T.accentLight : T.neutral50, borderRadius: T.radiusSm, border: `1.5px solid ${form.important ? T.accent + "50" : T.neutral200}`, transition: "all 0.2s" }}>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: T.textPrimary }}>Événement important</div>
              <div style={{ fontSize: "0.78rem", color: T.textMuted, marginTop: 2 }}>Apparaîtra côté patient avec des rappels</div>
            </div>
            <Toggle checked={form.important} onChange={v => set("important", v)} />
          </div>

          {/* Reminders */}
          {form.important && (
            <div>
              <label className="label">Rappels</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["1j", "3h", "1h", "15m"].map(r => (
                  <button key={r} onClick={() => toggleReminder(r)} style={{ padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${form.reminders.includes(r) ? T.secondary : T.neutral200}`, background: form.reminders.includes(r) ? T.secondaryLight : "white", color: form.reminders.includes(r) ? T.secondary : T.textSecondary, fontSize: "0.83rem", fontWeight: form.reminders.includes(r) ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>
                    {r === "1j" ? "1 jour avant" : r === "3h" ? "3 heures avant" : r === "1h" ? "1 heure avant" : "15 min avant"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color */}
          <div>
            <label className="label">Catégorie</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ c: T.secondary, l: "Médical" }, { c: T.secondary, l: "Quotidien" }, { c: T.accent, l: "Urgent" }, { c: T.accentAlt, l: "Famille" }].map(({ c, l }) => (
                <button key={c} onClick={() => set("color", c)} style={{ flex: 1, padding: "8px 6px", borderRadius: 8, border: `2px solid ${form.color === c ? c : T.neutral200}`, background: `${c}18`, fontSize: "0.75rem", color: c, fontWeight: form.color === c ? 700 : 400, cursor: "pointer", transition: "all 0.15s" }}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.neutral100}` }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>Annuler</button>
          <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => onSave(form)} disabled={!form.title}>{event ? "Enregistrer" : "Créer l'événement ✓"}</button>
        </div>
      </div>
    </div>
  );
};

// ─── STATS PAGE ───────────────────────────────────────────────────────────────
const StatsPage = () => {
  const [period, setPeriod] = useState("7j");

  return (
    <div className="fade-in">
      <Header
        title="Statistiques"
        subtitle="Suivi cognitif de Marguerite Fontaine"
        action={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ background: T.neutral100, borderRadius: 10, padding: 3, display: "flex", gap: 2 }}>
              {["7j", "30j", "3m"].map(p => (
                <button key={p} className={`tab-btn ${period === p ? "active" : ""}`} style={{ padding: "5px 12px", fontSize: "0.8rem" }} onClick={() => setPeriod(p)}>{p}</button>
              ))}
            </div>
            <button className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="download" size={14} /> Exporter</button>
          </div>
        }
      />

      {/* KPIs row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 22 }}>
        <KpiCard label="Taux de réussite" value="68 %" sub="↓ −4% vs semaine passée" icon="🎯" accent={T.secondary} />
        <KpiCard label="Sans indice" value="45 %" sub="↑ +2% vs semaine passée" icon="💡" accent={T.secondary} />
        <KpiCard label="Premier essai" value="52 %" sub="↓ −12% vs semaine passée" icon="⚡" accent={T.accent} />
        <KpiCard label="Temps moyen" value="1m 24s" sub="↑ +8s vs semaine passée" icon="⏱" accent={T.accentAlt} />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Bar chart */}
        <div className="card" style={{ padding: "22px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: T.textPrimary }}>Évolution sur 7 jours</h3>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.73rem", color: T.textMuted }}><span style={{ width: 10, height: 10, borderRadius: 2, background: T.secondary, display: "inline-block" }} />Réussite</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.73rem", color: T.textMuted }}><span style={{ width: 10, height: 10, borderRadius: 2, background: T.secondary, display: "inline-block" }} />Sans indice</div>
            </div>
          </div>
          <BarChart data={statsHistory} height={150} />
        </div>

        {/* Donut-like rings */}
        <div className="card" style={{ padding: "22px 24px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: T.textPrimary, marginBottom: 20 }}>Répartition des réponses</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { label: "Questions texte", correct: 58, color: T.secondary },
              { label: "Questions image", correct: 81, color: T.secondary },
              { label: "Avec indice", correct: 74, color: T.accentAlt },
              { label: "Après erreur", correct: 62, color: T.accent },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <CircleProgress value={s.correct} size={56} color={s.color} />
                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.neutral700 }}>{s.label}</div>
                  <div style={{ fontSize: "0.72rem", color: T.textMuted, marginTop: 2 }}>de bonnes rép.</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Quiz table */}
        <div className="card" style={{ padding: "22px 24px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: T.textPrimary, marginBottom: 16 }}>Récapitulatif par quiz</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 40px 30px", gap: 8, padding: "6px 10px", borderBottom: `1px solid ${T.neutral100}` }}>
              {["Quiz", "Score", "Parties", "Tendance"].map(h => <span key={h} style={{ fontSize: "0.7rem", fontWeight: 700, color: T.neutral400, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</span>)}
            </div>
            {quizBreakdown.map((q, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 60px 40px 30px", gap: 8, padding: "11px 10px", borderBottom: i < quizBreakdown.length - 1 ? `1px solid ${T.neutral100}` : "none", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: T.neutral700, fontWeight: 500 }}>{q.name}</span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ flex: 1, height: 6, borderRadius: 3, background: T.neutral100, overflow: "hidden" }}>
                    <div style={{ width: `${q.score}%`, height: "100%", background: q.score > 80 ? T.secondary : q.score > 65 ? T.primary : T.accent, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: T.neutral700, width: 30 }}>{q.score}%</span>
                </div>
                <span style={{ fontSize: "0.83rem", color: T.textMuted }}>{q.plays}×</span>
                <span style={{ fontSize: "1rem", color: q.trend === "↑" ? T.secondary : q.trend === "↓" ? T.error : T.textMuted }}>{q.trend}</span>
              </div>
            ))}
          </div>
        </div>

        {/* More stats */}
        <div className="card" style={{ padding: "22px 24px" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: T.textPrimary, marginBottom: 16 }}>Indicateurs clés</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { label: "Quiz complétés", value: "5", total: "7" },
              { label: "Quiz abandonnés", value: "1", total: null },
              { label: "Indices utilisés", value: "12", total: null },
              { label: "Questions transformées en V/F", value: "8", total: null },
              { label: "Temps total moyen / quiz", value: "9 min", total: null },
              { label: "Questions les + difficiles", value: "Famille élargie", total: null },
            ].map((s, i, arr) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.neutral100}` : "none" }}>
                <span style={{ fontSize: "0.85rem", color: T.textSecondary }}>{s.label}</span>
                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: T.textPrimary }}>{s.value}{s.total ? <span style={{ fontWeight: 400, color: T.textMuted }}> / {s.total}</span> : ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="card" style={{ padding: "22px 24px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: T.textPrimary, marginBottom: 16 }}>Observations ✦</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {insights.map((ins, i) => (
            <div key={i} className={`insight-card ${ins.type}`}>
              <p style={{ fontSize: "0.85rem", color: T.neutral700, lineHeight: 1.55 }}>{ins.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────
const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("caregiver");
  const [theme, setTheme] = useState("clair");
  const [lang, setLang] = useState("fr");
  const [fontSize, setFontSize] = useState("normal");

  const sections = [
    { id: "caregiver", label: "Profil aidant", icon: "user" },
    { id: "patient", label: "Profil patient", icon: "star" },
    { id: "prefs", label: "Préférences", icon: "settings" },
    { id: "quiz", label: "Paramètres quiz", icon: "quiz" },
    { id: "security", label: "Sécurité", icon: "lock" },
    { id: "export", label: "Export & rapports", icon: "download" },
  ];

  return (
    <div className="fade-in">
      <Header title="Paramètres" subtitle="Personnalisez votre espace et celui de Marguerite" />

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 22 }}>
        {/* Nav */}
        <div className="card" style={{ padding: "16px 12px", alignSelf: "start" }}>
          {sections.map(s => (
            <button key={s.id} className={`sidebar-link ${activeSection === s.id ? "active" : ""}`} onClick={() => setActiveSection(s.id)}>
              <Icon name={s.icon} size={15} />
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeSection === "caregiver" && (
            <div className="settings-section">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, marginBottom: 24 }}>Profil aidant</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, padding: 20, background: T.neutral50, borderRadius: T.radiusSm }}>
                <Avatar name={caregiver.name} size={64} bg={T.secondaryLight} color={T.secondary} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600 }}>{caregiver.name}</div>
                  <div style={{ fontSize: "0.85rem", color: T.textMuted, marginTop: 3 }}>{caregiver.role}</div>
                  <button className="btn btn-ghost" style={{ marginTop: 10, fontSize: "0.78rem" }}>Changer la photo</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Prénom et nom", "Sophie Fontaine"], ["Adresse email", "sophie.fontaine@email.com"], ["Rôle", "Fille – Aidante principale"], ["Téléphone", "+33 6 12 34 56 78"]].map(([l, v]) => (
                  <div key={l}>
                    <label className="label">{l}</label>
                    <input className="input-field" defaultValue={v} />
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 20 }}>Enregistrer les modifications</button>
            </div>
          )}

          {activeSection === "patient" && (
            <div className="settings-section">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, marginBottom: 24 }}>Profil patient</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, padding: 20, background: T.primaryLight, borderRadius: T.radiusSm }}>
                <Avatar name={patient.name} size={64} />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600 }}>{patient.name}</div>
                  <div style={{ fontSize: "0.85rem", color: T.textMuted, marginTop: 3 }}>{patient.diagnosis}</div>
                  <div style={{ fontSize: "0.78rem", color: T.textMuted, marginTop: 2 }}>Suivie depuis {patient.since}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[["Prénom et nom", patient.name], ["Âge", `${patient.age} ans`], ["Diagnostic", patient.diagnosis], ["Suivi depuis", patient.since]].map(([l, v]) => (
                  <div key={l}>
                    <label className="label">{l}</label>
                    <input className="input-field" defaultValue={v} />
                  </div>
                ))}
              </div>
              <div>
                <label className="label">Notes de contexte</label>
                <textarea className="input-field" defaultValue="Marguerite vit à son domicile à Nice. Elle apprécie la musique classique et les promenades au jardin. Son fils Pierre lui rend visite le week-end." />
              </div>
              <button className="btn btn-primary" style={{ marginTop: 20 }}>Enregistrer</button>
            </div>
          )}

          {activeSection === "prefs" && (
            <div className="settings-section">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, marginBottom: 24 }}>Préférences générales</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { l: "Langue", ctrl: <select className="input-field" value={lang} onChange={e => setLang(e.target.value)} style={{ maxWidth: 200 }}><option value="fr">Français</option><option value="en">English</option></select> },
                  { l: "Thème visuel", ctrl: <div style={{ display: "flex", gap: 8 }}>{["clair", "sombre", "contraste"].map(t => <button key={t} onClick={() => setTheme(t)} style={{ padding: "7px 16px", borderRadius: 8, border: `2px solid ${theme === t ? T.secondary : T.neutral200}`, background: theme === t ? T.secondaryLight : "white", fontSize: "0.83rem", color: theme === t ? T.secondary : T.textSecondary, cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s" }}>{t}</button>)}</div> },
                  { l: "Taille d'affichage", ctrl: <div style={{ display: "flex", gap: 8 }}>{["compact", "normal", "large"].map(fs => <button key={fs} onClick={() => setFontSize(fs)} style={{ padding: "7px 16px", borderRadius: 8, border: `2px solid ${fontSize === fs ? T.secondary : T.neutral200}`, background: fontSize === fs ? T.secondaryLight : "white", fontSize: "0.83rem", color: fontSize === fs ? T.secondary : T.textSecondary, cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s" }}>{fs}</button>)}</div> },
                ].map(({ l, ctrl }) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${T.neutral100}` }}>
                    <label style={{ fontSize: "0.9rem", fontWeight: 500, color: T.neutral700 }}>{l}</label>
                    {ctrl}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "quiz" && (
            <div className="settings-section">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, marginBottom: 24 }}>Paramètres quiz</h3>
              <div style={{ background: T.primaryLight, borderRadius: T.radiusSm, padding: "14px 16px", marginBottom: 20, fontSize: "0.85rem", color: T.primaryDark }}>
                Ces paramètres s'appliquent par défaut à tous les nouveaux quiz. Les quiz existants conservent leur configuration individuelle.
              </div>
              {[
                { label: "Activer les indices par défaut", desc: "Pour tous les nouveaux quiz", key: "hints" },
                { label: "Format vrai/faux activé par défaut", desc: "Pour les questions ratées en fin de quiz", key: "tf" },
                { label: "Suppression de réponses fausses", desc: "Après la deuxième erreur consécutive", key: "remove" },
                { label: "Afficher les statistiques après quiz", desc: "Résumé visible dans la vue patient", key: "showStats" },
              ].map(opt => (
                <div key={opt.key} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${T.neutral100}` }}>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: T.textPrimary, marginBottom: 2 }}>{opt.label}</div>
                    <div style={{ fontSize: "0.78rem", color: T.textMuted }}>{opt.desc}</div>
                  </div>
                  <Toggle checked={true} onChange={() => {}} />
                </div>
              ))}
            </div>
          )}

          {activeSection === "security" && (
            <div className="settings-section">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, marginBottom: 24 }}>Sécurité</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 400 }}>
                {["Mot de passe actuel", "Nouveau mot de passe", "Confirmer le nouveau mot de passe"].map(l => (
                  <div key={l}>
                    <label className="label">{l}</label>
                    <input type="password" className="input-field" placeholder="••••••••••" />
                  </div>
                ))}
                <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Changer le mot de passe</button>
              </div>
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${T.neutral100}` }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, marginBottom: 12, color: T.textPrimary }}>Déconnexion</h4>
                <p style={{ fontSize: "0.85rem", color: T.textMuted, marginBottom: 14 }}>Vous serez redirigée vers l'écran de connexion.</p>
                <button className="btn btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="logout" size={15} /> Se déconnecter</button>
              </div>
            </div>
          )}

          {activeSection === "export" && (
            <div className="settings-section">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 600, marginBottom: 8 }}>Export & rapports</h3>
              <p style={{ fontSize: "0.85rem", color: T.textMuted, marginBottom: 24 }}>Générez et partagez des résumés de suivi pour les professionnels de santé ou la famille.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { title: "Résumé hebdomadaire", desc: "Rapport PDF de la semaine en cours", icon: "📄", badge: "PDF" },
                  { title: "Export des statistiques", desc: "Toutes les données de performance en CSV", icon: "📊", badge: "CSV" },
                  { title: "Rapport mensuel", desc: "Vue d'ensemble du mois avec graphiques", icon: "📅", badge: "PDF" },
                  { title: "Historique des quiz", desc: "Détail de chaque quiz joué", icon: "📝", badge: "XLSX" },
                ].map(item => (
                  <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 18px", border: `1.5px solid ${T.neutral200}`, borderRadius: T.radiusSm, background: T.neutral50 }}>
                    <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 600, color: T.textPrimary }}>{item.title}</div>
                      <div style={{ fontSize: "0.78rem", color: T.textMuted, marginTop: 2 }}>{item.desc}</div>
                    </div>
                    <span className="badge badge-gray" style={{ marginRight: 8 }}>{item.badge}</span>
                    <button className="btn btn-primary" style={{ padding: "7px 14px", fontSize: "0.8rem" }}>Générer</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    quiz: <QuizPage />,
    calendar: <CalendarPage />,
    stats: <StatsPage />,
    settings: <SettingsPage />,
  };

  return (
    <>
      <FontStyle />
      <div className="app-bg" style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar page={page} setPage={setPage} />
        <main style={{ flex: 1, padding: "32px 36px", overflow: "auto", maxWidth: "calc(100vw - 220px)" }}>
          {pages[page]}
        </main>
      </div>
    </>
  );
}

