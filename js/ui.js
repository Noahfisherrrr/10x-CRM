// ui.js
//
// Small helpers that every page reuses: showing a toast message,
// showing/clearing a field error under an input, switching the
// dark/light theme, and formatting money as "$5,000".

import { Storage } from './storage.js';

export const UI = {
  // Reads the saved theme and puts (or removes) the "theme-light"
  // class on <body>. The actual colors are defined in css/styles.css.
  applyTheme() {
    const theme = Storage.getTheme();
    const isLight = theme === 'light';
    document.body.classList.toggle('theme-light', isLight);
  },

  // Switches dark <-> light, saves the choice, then re-applies it.
  toggleTheme() {
    const currentTheme = Storage.getTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    Storage.saveTheme(nextTheme);
    UI.applyTheme();
  },

  // Shows a small message in the top-right corner. It disappears on
  // its own after 3 seconds, or right away if the user clicks the X.
  // type should be "success" or "error".
  showToast(message, type) {
    const container = document.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);

    function removeToast() {
      toast.remove();
    }

    toast.querySelector('.toast-close').addEventListener('click', removeToast);
    setTimeout(removeToast, 3000);
  },

  // Turns 5000 into "$5,000".
  formatCurrency(amount) {
    const formattedNumber = Number(amount).toLocaleString('en-US');
    return '$' + formattedNumber;
  },

  // Shows an error message under one specific field, and puts a red
  // border on that field. fieldName must match the input's id and the
  // matching <p data-error-for="fieldName"> in the HTML.
  showFieldError(fieldName, message) {
    const errorText = document.querySelector(`[data-error-for="${fieldName}"]`);
    const input = document.getElementById(fieldName);

    if (errorText) {
      errorText.textContent = message;
    }
    if (input) {
      input.classList.add('input-error');
    }
  },

  // Clears every field error inside one form. We call this at the
  // start of every submit handler so old errors don't stick around.
  clearFieldErrors(form) {
    const errorTexts = form.querySelectorAll('.field-error');
    errorTexts.forEach((errorText) => {
      errorText.textContent = '';
    });

    const errorInputs = form.querySelectorAll('.input-error');
    errorInputs.forEach((input) => {
      input.classList.remove('input-error');
    });
  },
};
