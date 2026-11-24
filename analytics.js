(() => {
  'use strict';

  if (location.origin !== 'https://jwjang9088.github.io' || !location.pathname.startsWith('/portfolio/')) return;

  const measurementId = 'G-Y3SLLMD36E';
  const preferenceKey = 'jangjaewon-portfolio-analytics';
  const disableKey = 'ga-disable-' + measurementId;
  let started = false;
  let preference;
  try {
    preference = localStorage.getItem(preferenceKey);
  } catch {
    // A visitor can still choose for this page when storage is unavailable.
  }

  function enableAnalytics() {
    window[disableKey] = false;
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    const referrer = document.referrer ? new URL(document.referrer) : null;
    gtag('js', new Date());
    gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: location.origin + location.pathname,
      page_referrer: referrer?.origin || '',
      cookie_path: '/portfolio/',
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.append(script);
  }

  const settings = document.createElement('details');
  settings.className = 'analytics-settings';
  settings.open = !preference;
  settings.innerHTML = `
    <summary>방문 통계 설정</summary>
    <div class="analytics-settings-content">
      <p>동의하면 Google 애널리틱스가 쿠키를 사용해 페이지 조회와 방문자 수를 집계합니다. 여기서 언제든 변경할 수 있습니다.</p>
      <p><a href="https://policies.google.com/technologies/partner-sites?hl=ko" target="_blank" rel="noopener noreferrer">Google의 데이터 처리 안내</a></p>
      <div class="analytics-settings-actions">
        <button type="button" data-preference="off">거부</button>
        <button type="button" data-preference="on">동의</button>
      </div>
    </div>`;
  document.body.append(settings);

  function applyPreference() {
    window[disableKey] = preference !== 'on';
    if (preference === 'on') enableAnalytics();
    settings.querySelectorAll('[data-preference]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.preference === preference));
    });
  }

  settings.addEventListener('click', event => {
    const button = event.target.closest('button[data-preference]');
    if (!button) return;
    preference = button.dataset.preference;
    try {
      localStorage.setItem(preferenceKey, preference);
    } catch {
      // Keep the choice for this page.
    }
    applyPreference();
    settings.open = false;
    settings.querySelector('summary').focus();
  });
  applyPreference();
})();
