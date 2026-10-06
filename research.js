(() => {
  const dialog = document.querySelector('#figure-dialog');
  const host = dialog.querySelector('.dialog-image');
  const caption = dialog.querySelector('#figure-caption');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let playing = !reducedMotion.matches;
  let opener;
  function syncMotion() {
    document.querySelectorAll('img[data-motion]').forEach(img => {
      const source = playing ? img.dataset.motion : img.dataset.poster;
      if (img.getAttribute('src') !== source) img.src = source;
    });
    document.querySelectorAll('.motion-toggle').forEach(button => {
      button.textContent = playing ? '동작 정지' : '동작 재생';
      button.setAttribute('aria-pressed', String(playing));
    });
  }
  document.querySelectorAll('.motion-toggle').forEach(button => {
    button.addEventListener('click', () => { playing = !playing; syncMotion(); });
  });
  document.querySelectorAll('.figure-open').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      host.replaceChildren(button.querySelector('.image-frame').cloneNode(true));
      host.querySelectorAll('img').forEach(img => { img.loading = 'eager'; });
      caption.textContent = button.dataset.caption;
      dialog.querySelector('.dialog-motion').hidden = !host.querySelector('[data-motion]');
      syncMotion();
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { host.replaceChildren(); opener?.focus(); });
  reducedMotion.addEventListener('change', event => { playing = !event.matches; syncMotion(); });
  syncMotion();
})();
