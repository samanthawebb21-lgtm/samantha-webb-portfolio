const copyButton = document.querySelector('[data-copy-email]');

if (copyButton) {
  const label = copyButton.querySelector('.button-label');
  const feedback = document.getElementById('copy-feedback');
  const defaultLabel = label.textContent;
  let resetTimer;

  copyButton.addEventListener('click', async () => {
    const email = copyButton.dataset.copyEmail;
    let copied = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        copied = true;
      }
    } catch {
      // The visible address remains usable when clipboard permission is denied.
    }

    if (!copied) {
      const field = document.createElement('textarea');
      field.value = email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
      field.remove();
    }

    label.textContent = copied ? 'Copied ✓' : 'Copy unavailable';
    feedback.textContent = copied
      ? 'Email address copied to clipboard.'
      : 'Select the email address shown above to copy it.';

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      label.textContent = defaultLabel;
      feedback.textContent = '';
    }, 2500);
  });
}
