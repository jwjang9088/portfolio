const stylingDemo = document.querySelector('[data-styling-demo]');
if (stylingDemo) {
  const form = stylingDemo.querySelector('form');
  const button = form.querySelector('button[type="submit"]');
  const preview = stylingDemo.querySelector('[data-demo-preview]');
  const placeholder = preview.firstElementChild.cloneNode(true);
  const status = stylingDemo.querySelector('[data-demo-status]');
  const fields = [...stylingDemo.querySelectorAll('[data-demo-field]')];
  const samples = [...stylingDemo.querySelectorAll('template[data-demo-product]')];
  let lastSample = null;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const product = form.elements.namedItem('demo-product').value;
    const options = samples.filter(sample => sample.dataset.demoProduct === product && sample !== lastSample);
    if (!options.length) return;
    const match = options[Math.floor(Math.random() * options.length)];
    lastSample = match;
    preview.replaceChildren(match.content.cloneNode(true));
    fields.forEach(field => { field.textContent = match.dataset[field.dataset.demoField]; });
    button.textContent = '다시 매칭';
    status.textContent = `샘플 결과. ${fields.map(field => `${field.previousElementSibling.textContent} ${field.textContent}`).join(', ')}`;
  });

  form.addEventListener('change', () => {
    lastSample = null;
    preview.replaceChildren(placeholder.cloneNode(true));
    fields.forEach(field => { field.textContent = '—'; });
    button.textContent = '자동 매칭';
    status.textContent = '';
  });
  stylingDemo.hidden = false;
}
