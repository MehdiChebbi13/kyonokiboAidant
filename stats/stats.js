(() => {
  if (!window.AppUI) {
    return;
  }

  window.AppUI.mountSidebar("stats", { fromSubpage: true });
})();
