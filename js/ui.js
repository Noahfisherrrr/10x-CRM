// Shared UI helpers: theme, toasts, field errors, formatting.
const UI = {
  applyTheme() {
    const theme = Storage.getTheme();
    document.body.classList.toggle('theme-light', theme === 'light');
  },
  toggleTheme() {
    const next = Storage.getTheme() === 'dark' ? 'light' : 'dark';
    Storage.saveTheme(next);
    UI.applyTheme();
  },
  showToast(message, type) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span><button class="toast-close" aria-label="Close">&times;</button>`;
    container.appendChild(toast);
    const remove = () => toast.remove();
    toast.querySelector('.toast-close').addEventListener('click', remove);
    setTimeout(remove, 3000);
  },
  formatCurrency(amount) {
    return '$' + Number(amount).toLocaleString('en-US');
  },
  showFieldError(fieldName, message) {
    const el = document.querySelector(`[data-error-for="${fieldName}"]`);
    const input = document.getElementById(fieldName);
    if (el) el.textContent = message;
    if (input) input.classList.add('input-error');
  },
  clearFieldErrors(form) {
    form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  },
};

document.addEventListener('DOMContentLoaded', UI.applyTheme);
