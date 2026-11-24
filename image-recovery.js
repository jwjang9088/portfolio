(() => {
  'use strict';

  const retried = new WeakSet();

  function retry(image) {
    if (!(image instanceof HTMLImageElement) || retried.has(image) || !image.currentSrc) return;
    const url = new URL(image.currentSrc);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (image.srcset || image.closest('picture')) return;

    retried.add(image);
    url.searchParams.set('image-retry', String(Date.now()));
    image.src = url.href;
  }

  document.addEventListener('error', event => retry(event.target), true);
  for (const image of document.images) {
    if (image.complete && !image.naturalWidth) retry(image);
  }
})();
