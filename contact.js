const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const fields = new FormData(contactForm);
    const name = String(fields.get('sender_name') || '').trim();
    const email = String(fields.get('sender_email') || '').trim();
    const subject = String(fields.get('subject') || '').trim();
    const message = String(fields.get('body') || '').trim();
    if (!subject || !message) {
      document.querySelector('.contact-form-status').textContent = '제목과 메시지를 입력해 주세요.';
      return;
    }
    const body = [...(name ? [`이름: ${name}`] : []), `답변 이메일: ${email}`, '', message].join('\n');
    const recipient = contactForm.dataset.recipient;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.querySelector('.contact-form-status').textContent = '메일 앱에서 내용을 확인한 뒤 전송해 주세요. 앱이 열리지 않으면 왼쪽 이메일 주소로 직접 보내주세요.';
  });
  contactForm.querySelector('button[type="submit"]').disabled = false;
}

const copyEmail = document.querySelector('[data-copy-email]');
if (copyEmail) {
  copyEmail.addEventListener('click', async () => {
    const status = document.querySelector('.contact-copy-status');
    try {
      await navigator.clipboard.writeText(copyEmail.dataset.copyEmail);
      status.textContent = '이메일 주소를 복사했습니다.';
    } catch {
      status.textContent = `주소를 선택해 복사해 주세요: ${copyEmail.dataset.copyEmail}`;
    }
  });
}
