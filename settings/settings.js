(() => {
  if (!window.AppUI) {
    return;
  }

  window.AppUI.mountSidebar("settings", { fromSubpage: true });
})();
