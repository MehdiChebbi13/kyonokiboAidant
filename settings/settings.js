(() => {
  const { AppData, AppUtils, AppUI } = window;
  AppUI.mountSidebar("settings", { fromSubpage: true });

  const sections = [
    { id: "caregiver", label: "Profil aidant", icon: "user" },
    { id: "patient", label: "Profil patient", icon: "star" },
    { id: "prefs", label: "Preferences", icon: "settings" },
    { id: "quiz", label: "Parametres quiz", icon: "quiz" },
    { id: "security", label: "Securite", icon: "lock" },
    { id: "export", label: "Export et rapports", icon: "download" }
  ];

  const state = {
    section: "caregiver",
    lang: "fr",
    theme: "clair",
    fontSize: "normal",
    quizDefaults: { hints: true, tf: true, remove: true, showStats: true }
  };

  const navRoot = document.getElementById("settings-nav");
  const contentRoot = document.getElementById("settings-content");

  function renderNav() {
    navRoot.innerHTML = sections
      .map((section) => `
        <button class="settings-tab ${section.id === state.section ? "active" : ""}" data-section="${section.id}">
          <span class="settings-tab-icon">${AppUI.iconHTML(section.icon, { size: 15 })}</span>
          <span>${AppUtils.escapeHtml(section.label)}</span>
        </button>
      `)
      .join("");
  }

  function caregiverPanel() {
    return `
      <section class="settings-panel">
        <h2 class="section-title">Profil aidant</h2>
        <div class="profile-head neutral">
          ${AppUI.avatarHTML(AppData.caregiver.name, { sizeClass: "large", bg: "var(--secondary-light)", color: "var(--secondary-dark)" })}
          <div>
            <h3 class="profile-name">${AppUtils.escapeHtml(AppData.caregiver.name)}</h3>
            <p class="profile-role">${AppUtils.escapeHtml(AppData.caregiver.role)}</p>
            <button class="btn btn-ghost" style="margin-top:8px">Changer la photo</button>
          </div>
        </div>
        <div class="field-grid">
          <div><label class="label">Prenom et nom</label><input class="input-field" value="Sophie Martin"></div>
          <div><label class="label">Adresse email</label><input class="input-field" value="sophie.martin@email.com"></div>
          <div><label class="label">Role</label><input class="input-field" value="Sa fille - Aidante principale"></div>
          <div><label class="label">Telephone</label><input class="input-field" value="+33 6 12 34 56 78"></div>
        </div>
        <button class="btn btn-primary" style="margin-top:16px">Enregistrer les modifications</button>
      </section>
    `;
  }

  function patientPanel() {
    return `
      <section class="settings-panel">
        <h2 class="section-title">Profil patient</h2>
        <div class="profile-head primary">
          ${AppUI.avatarHTML(AppData.patient.name, { sizeClass: "large", bg: "var(--primary-light)", color: "var(--primary-dark)" })}
          <div>
            <h3 class="profile-name">${AppUtils.escapeHtml(AppData.patient.name)}</h3>
            <p class="profile-role">${AppUtils.escapeHtml(AppData.patient.diagnosis)}</p>
            <p class="profile-role">Suivi depuis ${AppUtils.escapeHtml(AppData.patient.since)}</p>
          </div>
        </div>
        <div class="field-grid" style="margin-bottom:12px">
          <div><label class="label">Prenom et nom</label><input class="input-field" value="${AppUtils.escapeHtml(AppData.patient.name)}"></div>
          <div><label class="label">Age</label><input class="input-field" value="${AppData.patient.age} ans"></div>
          <div><label class="label">Diagnostic</label><input class="input-field" value="${AppUtils.escapeHtml(AppData.patient.diagnosis)}"></div>
          <div><label class="label">Suivi depuis</label><input class="input-field" value="${AppUtils.escapeHtml(AppData.patient.since)}"></div>
        </div>
        <label class="label">Notes de contexte</label>
        <textarea class="input-field">Jean vit a son domicile a Nice. Il apprecie la musique classique et les promenades au jardin. Sa fille Sophie lui rend visite le week-end.</textarea>
        <button class="btn btn-primary" style="margin-top:16px">Enregistrer</button>
      </section>
    `;
  }

  function prefsPanel() {
    return `
      <section class="settings-panel">
        <h2 class="section-title">Preferences generales</h2>
        <div class="settings-row">
          <div><strong>Langue</strong><p>Langue de l'interface</p></div>
          <select class="input-field" style="max-width:200px" data-pref="lang">
            <option value="fr" ${state.lang === "fr" ? "selected" : ""}>Francais</option>
            <option value="en" ${state.lang === "en" ? "selected" : ""}>English</option>
          </select>
        </div>
        <div class="settings-row">
          <div><strong>Theme visuel</strong><p>Choisissez un mode de lecture</p></div>
          <div class="pill-group">${["clair", "sombre", "contraste"].map((v) => `<button class="pill ${state.theme === v ? "active" : ""}" data-pref="theme" data-value="${v}">${v}</button>`).join("")}</div>
        </div>
        <div class="settings-row">
          <div><strong>Taille d'affichage</strong><p>Ajustez la densite de contenu</p></div>
          <div class="pill-group">${["compact", "normal", "large"].map((v) => `<button class="pill ${state.fontSize === v ? "active" : ""}" data-pref="fontSize" data-value="${v}">${v}</button>`).join("")}</div>
        </div>
      </section>
    `;
  }

  function quizPanel() {
    const rows = [
      { key: "hints", label: "Activer les indices par defaut", desc: "Pour tous les nouveaux quiz" },
      { key: "tf", label: "Format vrai/faux active par defaut", desc: "Pour les questions ratees en fin de quiz" },
      { key: "remove", label: "Suppression de reponses fausses", desc: "Apres la deuxieme erreur consecutive" },
      { key: "showStats", label: "Afficher les statistiques apres quiz", desc: "Resume visible dans la vue patient" }
    ];

    return `
      <section class="settings-panel">
        <h2 class="section-title">Parametres quiz</h2>
        <p class="info-note">Ces parametres s'appliquent par defaut a tous les nouveaux quiz. Les quiz existants conservent leur configuration individuelle.</p>
        ${rows.map((row) => `
          <div class="settings-row">
            <div><strong>${row.label}</strong><p>${row.desc}</p></div>
            ${AppUI.toggleHTML({ checked: state.quizDefaults[row.key], key: row.key })}
          </div>
        `).join("")}
      </section>
    `;
  }

  function securityPanel() {
    return `
      <section class="settings-panel">
        <h2 class="section-title">Securite</h2>
        <div class="security-form">
          <div><label class="label">Mot de passe actuel</label><input class="input-field" type="password" placeholder="**********"></div>
          <div><label class="label">Nouveau mot de passe</label><input class="input-field" type="password" placeholder="**********"></div>
          <div><label class="label">Confirmer le nouveau mot de passe</label><input class="input-field" type="password" placeholder="**********"></div>
          <button class="btn btn-primary">Changer le mot de passe</button>
        </div>
        <div class="logout-box">
          <h3 class="section-title small">Deconnexion</h3>
          <p>Vous serez redirigee vers l'ecran de connexion.</p>
          <button class="btn btn-secondary">
            <span class="btn-label">
              ${AppUI.iconHTML("logout", { size: 15 })}
              <span>Se deconnecter</span>
            </span>
          </button>
        </div>
      </section>
    `;
  }

  function exportPanel() {
    const items = [
      ["download", "Resume hebdomadaire", "Rapport PDF de la semaine en cours", "PDF"],
      ["stats", "Export des statistiques", "Toutes les donnees de performance en CSV", "CSV"],
      ["calendar", "Rapport mensuel", "Vue d'ensemble du mois avec graphiques", "PDF"],
      ["quiz", "Historique des quiz", "Detail de chaque quiz joue", "XLSX"]
    ];

    return `
      <section class="settings-panel">
        <h2 class="section-title">Export et rapports</h2>
        <p class="page-subtitle" style="margin-top:0;margin-bottom:16px">Generez et partagez des resumes de suivi pour les professionnels de sante ou la famille.</p>
        <div class="export-list">
          ${items.map(([icon, title, desc, badge]) => `
            <div class="export-item">
              <span class="icon">${AppUI.iconHTML(icon, { size: 16 })}</span>
              <div style="flex:1"><h4>${title}</h4><p>${desc}</p></div>
              <span class="badge badge-gray" style="margin-right:8px">${badge}</span>
              <button class="btn btn-primary">Generer</button>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderContent() {
    if (state.section === "caregiver") return void (contentRoot.innerHTML = caregiverPanel());
    if (state.section === "patient") return void (contentRoot.innerHTML = patientPanel());
    if (state.section === "prefs") return void (contentRoot.innerHTML = prefsPanel());
    if (state.section === "quiz") return void (contentRoot.innerHTML = quizPanel());
    if (state.section === "security") return void (contentRoot.innerHTML = securityPanel());
    contentRoot.innerHTML = exportPanel();
  }

  function renderAll() {
    renderNav();
    renderContent();
  }

  navRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-section]");
    if (!button) return;
    state.section = button.dataset.section;
    renderAll();
  });

  contentRoot.addEventListener("click", (event) => {
    const prefButton = event.target.closest("[data-pref][data-value]");
    if (!prefButton) return;
    state[prefButton.dataset.pref] = prefButton.dataset.value;
    renderContent();
  });

  contentRoot.addEventListener("change", (event) => {
    const control = event.target;
    if (control.dataset.pref === "lang") {
      state.lang = control.value;
      return;
    }
    if (control.dataset.toggleKey && state.section === "quiz") {
      state.quizDefaults[control.dataset.toggleKey] = control.checked;
    }
  });

  renderAll();
})();
