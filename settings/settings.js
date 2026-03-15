(() => {
  const { AppData, AppUtils, AppUI } = window;
  AppUI.mountSidebar("settings", { fromSubpage: true });

  const sections = [
    { id: "caregiver", label: "Profil aidant" },
    { id: "patient", label: "Profil patient" },
    { id: "prefs", label: "Préférences" },
    { id: "quiz", label: "Paramètres quiz" },
    { id: "security", label: "Sécurité" },
    { id: "export", label: "Export & rapports" }
  ];

  const state = {
    section: "caregiver",
    lang: "fr",
    theme: "clair",
    fontSize: "normal",
    quizDefaults: {
      hints: true,
      tf: true,
      remove: true,
      showStats: true
    }
  };

  const navRoot = document.getElementById("settings-nav");
  const contentRoot = document.getElementById("settings-content");

  function renderNav() {
    navRoot.innerHTML = sections
      .map((section) => {
        return `
          <button class="settings-tab ${section.id === state.section ? "active" : ""}" data-section="${section.id}">
            ${AppUtils.escapeHtml(section.label)}
          </button>
        `;
      })
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
          <div>
            <label class="label">Prénom et nom</label>
            <input class="input-field" value="Sophie Fontaine">
          </div>
          <div>
            <label class="label">Adresse email</label>
            <input class="input-field" value="sophie.fontaine@email.com">
          </div>
          <div>
            <label class="label">Rôle</label>
            <input class="input-field" value="Fille – Aidante principale">
          </div>
          <div>
            <label class="label">Téléphone</label>
            <input class="input-field" value="+33 6 12 34 56 78">
          </div>
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
            <p class="profile-role">Suivie depuis ${AppUtils.escapeHtml(AppData.patient.since)}</p>
          </div>
        </div>

        <div class="field-grid" style="margin-bottom:12px">
          <div>
            <label class="label">Prénom et nom</label>
            <input class="input-field" value="${AppUtils.escapeHtml(AppData.patient.name)}">
          </div>
          <div>
            <label class="label">Âge</label>
            <input class="input-field" value="${AppData.patient.age} ans">
          </div>
          <div>
            <label class="label">Diagnostic</label>
            <input class="input-field" value="${AppUtils.escapeHtml(AppData.patient.diagnosis)}">
          </div>
          <div>
            <label class="label">Suivi depuis</label>
            <input class="input-field" value="${AppUtils.escapeHtml(AppData.patient.since)}">
          </div>
        </div>

        <label class="label">Notes de contexte</label>
        <textarea class="input-field">Marguerite vit à son domicile à Nice. Elle apprécie la musique classique et les promenades au jardin. Son fils Pierre lui rend visite le week-end.</textarea>

        <button class="btn btn-primary" style="margin-top:16px">Enregistrer</button>
      </section>
    `;
  }

  function prefsPanel() {
    return `
      <section class="settings-panel">
        <h2 class="section-title">Préférences générales</h2>
        <div class="settings-row">
          <div>
            <strong>Langue</strong>
            <p>Langue de l'interface</p>
          </div>
          <select class="input-field" style="max-width:200px" data-pref="lang">
            <option value="fr" ${state.lang === "fr" ? "selected" : ""}>Français</option>
            <option value="en" ${state.lang === "en" ? "selected" : ""}>English</option>
          </select>
        </div>

        <div class="settings-row">
          <div>
            <strong>Thème visuel</strong>
            <p>Choisissez un mode de lecture</p>
          </div>
          <div class="pill-group">
            ${["clair", "sombre", "contraste"]
              .map((value) => `<button class="pill ${state.theme === value ? "active" : ""}" data-pref="theme" data-value="${value}">${value}</button>`)
              .join("")}
          </div>
        </div>

        <div class="settings-row">
          <div>
            <strong>Taille d'affichage</strong>
            <p>Ajustez la densité de contenu</p>
          </div>
          <div class="pill-group">
            ${["compact", "normal", "large"]
              .map((value) => `<button class="pill ${state.fontSize === value ? "active" : ""}" data-pref="fontSize" data-value="${value}">${value}</button>`)
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function quizPanel() {
    const rows = [
      {
        key: "hints",
        label: "Activer les indices par défaut",
        desc: "Pour tous les nouveaux quiz"
      },
      {
        key: "tf",
        label: "Format vrai/faux activé par défaut",
        desc: "Pour les questions ratées en fin de quiz"
      },
      {
        key: "remove",
        label: "Suppression de réponses fausses",
        desc: "Après la deuxième erreur consécutive"
      },
      {
        key: "showStats",
        label: "Afficher les statistiques après quiz",
        desc: "Résumé visible dans la vue patient"
      }
    ];

    return `
      <section class="settings-panel">
        <h2 class="section-title">Paramètres quiz</h2>
        <p class="info-note">
          Ces paramètres s'appliquent par défaut à tous les nouveaux quiz. Les quiz existants conservent leur configuration individuelle.
        </p>
        ${rows
          .map((row) => {
            return `
              <div class="settings-row">
                <div>
                  <strong>${row.label}</strong>
                  <p>${row.desc}</p>
                </div>
                ${AppUI.toggleHTML({ checked: state.quizDefaults[row.key], key: row.key })}
              </div>
            `;
          })
          .join("")}
      </section>
    `;
  }

  function securityPanel() {
    return `
      <section class="settings-panel">
        <h2 class="section-title">Sécurité</h2>

        <div class="security-form">
          <div>
            <label class="label">Mot de passe actuel</label>
            <input class="input-field" type="password" placeholder="••••••••••">
          </div>
          <div>
            <label class="label">Nouveau mot de passe</label>
            <input class="input-field" type="password" placeholder="••••••••••">
          </div>
          <div>
            <label class="label">Confirmer le nouveau mot de passe</label>
            <input class="input-field" type="password" placeholder="••••••••••">
          </div>
          <button class="btn btn-primary">Changer le mot de passe</button>
        </div>

        <div class="logout-box">
          <h3 class="section-title small">Déconnexion</h3>
          <p>Vous serez redirigée vers l'écran de connexion.</p>
          <button class="btn btn-secondary">Se déconnecter</button>
        </div>
      </section>
    `;
  }

  function exportPanel() {
    const items = [
      ["📄", "Résumé hebdomadaire", "Rapport PDF de la semaine en cours", "PDF"],
      ["📊", "Export des statistiques", "Toutes les données de performance en CSV", "CSV"],
      ["🗓", "Rapport mensuel", "Vue d'ensemble du mois avec graphiques", "PDF"],
      ["📝", "Historique des quiz", "Détail de chaque quiz joué", "XLSX"]
    ];

    return `
      <section class="settings-panel">
        <h2 class="section-title">Export & rapports</h2>
        <p class="page-subtitle" style="margin-top:0;margin-bottom:16px">
          Générez et partagez des résumés de suivi pour les professionnels de santé ou la famille.
        </p>
        <div class="export-list">
          ${items
            .map(([icon, title, desc, badge]) => {
              return `
                <div class="export-item">
                  <span class="icon">${icon}</span>
                  <div style="flex:1">
                    <h4>${title}</h4>
                    <p>${desc}</p>
                  </div>
                  <span class="badge badge-gray" style="margin-right:8px">${badge}</span>
                  <button class="btn btn-primary">Générer</button>
                </div>
              `;
            })
            .join("")}
        </div>
      </section>
    `;
  }

  function renderContent() {
    if (state.section === "caregiver") {
      contentRoot.innerHTML = caregiverPanel();
      return;
    }
    if (state.section === "patient") {
      contentRoot.innerHTML = patientPanel();
      return;
    }
    if (state.section === "prefs") {
      contentRoot.innerHTML = prefsPanel();
      return;
    }
    if (state.section === "quiz") {
      contentRoot.innerHTML = quizPanel();
      return;
    }
    if (state.section === "security") {
      contentRoot.innerHTML = securityPanel();
      return;
    }
    contentRoot.innerHTML = exportPanel();
  }

  function renderAll() {
    renderNav();
    renderContent();
  }

  navRoot.addEventListener("click", (event) => {
    const button = event.target.closest("[data-section]");
    if (!button) {
      return;
    }
    state.section = button.dataset.section;
    renderAll();
  });

  contentRoot.addEventListener("click", (event) => {
    const prefButton = event.target.closest("[data-pref][data-value]");
    if (prefButton) {
      const key = prefButton.dataset.pref;
      state[key] = prefButton.dataset.value;
      renderContent();
      return;
    }
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
