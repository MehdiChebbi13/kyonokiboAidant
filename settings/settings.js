(() => {
  if (!window.AppUI) {
    return;
  }

  window.AppUI.mountSidebar("settings", { fromSubpage: true });

  const navLinks = Array.from(document.querySelectorAll('.settings-tab[href^="#"]'));

  if (!navLinks.length) {
    return;
  }

  function syncSettingsNav() {
    const activeHash = window.location.hash || navLinks[0].getAttribute("href");

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === activeHash;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("hashchange", syncSettingsNav);
  syncSettingsNav();
})();
