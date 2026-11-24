const motionToggle = document.querySelector('.case-motion-toggle');
if (motionToggle) {
  const visual = motionToggle.closest('.case-hero-visual');
  visual.classList.add('has-motion');
  motionToggle.hidden = false;
  motionToggle.addEventListener('click', () => {
    const paused = visual.classList.toggle('is-paused');
    motionToggle.setAttribute('aria-label', paused ? '모자이크 움직임 재생' : '모자이크 움직임 일시 정지');
    motionToggle.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
  });
}

const filters = [...document.querySelectorAll('[data-case-filter]')];
const groups = [...document.querySelectorAll('[data-result-group]')];
const count = document.querySelector('.case-result-count');

function filterResults(kind) {
  filters.forEach(button => {
    const selected = button.dataset.caseFilter === kind;
    button.setAttribute('aria-pressed', String(selected));
  });
  groups.forEach(group => { group.hidden = group.dataset.resultGroup !== kind; });
  const visible = groups.filter(group => !group.hidden).reduce((total, group) => total + group.querySelectorAll('[data-lightbox]').length, 0);
  if (count) count.textContent = `${String(visible).padStart(2, '0')} IMAGES`;
}
filters.forEach(button => button.addEventListener('click', () => filterResults(button.dataset.caseFilter)));
document.querySelectorAll('[data-branch-filter]').forEach(link => link.addEventListener('click', () => filterResults(link.dataset.branchFilter)));

const dialog = document.querySelector('.case-lightbox');
let currentImage = 0;
let lastTrigger;
let visibleImages = [];
function showImage(index) {
  currentImage = (index + visibleImages.length) % visibleImages.length;
  const item = visibleImages[currentImage];
  const image = dialog.querySelector('img');
  image.src = item.href;
  image.alt = item.dataset.caption;
  dialog.querySelector('[data-lightbox-caption]').textContent = item.dataset.caption;
  dialog.querySelector('[data-lightbox-index]').textContent = `${String(currentImage + 1).padStart(2, '0')} / ${String(visibleImages.length).padStart(2, '0')}`;
  dialog.querySelector('[data-lightbox-original]').href = item.href;
}
if (dialog && typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-lightbox]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    visibleImages = [...document.querySelectorAll('.case-result-group:not([hidden]) [data-lightbox], .project-image-link[data-lightbox]')];
    lastTrigger = link;
    showImage(visibleImages.indexOf(link));
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }));
  dialog.querySelector('[data-lightbox-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => showImage(currentImage - 1));
  dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => showImage(currentImage + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(currentImage - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showImage(currentImage + 1); }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    dialog.querySelector('img').removeAttribute('src');
    lastTrigger?.focus({ preventScroll: true });
  });
  let touchX;
  dialog.addEventListener('touchstart', event => { touchX = event.changedTouches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - touchX;
    if (Math.abs(distance) > 55) showImage(currentImage + (distance < 0 ? 1 : -1));
  }, { passive: true });
}
