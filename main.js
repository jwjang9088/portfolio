// 헤더는 읽기 쉬운 크기로 유지하고 콜라주만 남은 화면에 맞춥니다.
function fitCanvas() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const width = hero.clientWidth;
  const compact = width <= 600;
  const horizontalScale = compact ? (width - 32) / 1100 : width / 1565;
  const verticalScale = (hero.clientHeight - (compact ? 48 : 80)) / 700;
  const scale = Math.max(.1, Math.min(1.05, horizontalScale, verticalScale));
  document.documentElement.style.setProperty('--canvas-scale', scale);
}
fitCanvas();
window.addEventListener('resize', fitCanvas, { passive: true });
const hero = document.querySelector('.hero');
if (hero && 'ResizeObserver' in window) {
  new ResizeObserver(fitCanvas).observe(hero);
}
