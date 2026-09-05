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

  // Sets up the sidebar on a protected page: highlights the link for
  // the page we're on, and wires the theme toggle + logout buttons.
  // activePage should be the file name, e.g. "dashboard.html".
  initNav(activePage) {
    const navLinks = document.querySelectorAll('[data-nav]');
    navLinks.forEach((link) => {
      const isActiveLink = link.dataset.nav === activePage;
      link.classList.toggle('active', isActiveLink);
    });

    document.getElementById('theme-toggle').addEventListener('click', UI.toggleTheme);

    document.getElementById('logout-btn').addEventListener('click', () => {
      Storage.clearSession();
      window.location.href = 'index.html';
    });
  },

  // Turns "<script>" into text that shows on the page instead of
  // running as HTML. We use this whenever we insert text a user typed
  // (a client's name, a note, etc.) into innerHTML, so someone can't
  // type HTML/JavaScript into a form field and have it execute.
  escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
  },

  // Turns "Emily Johnson" into "EJ". Used as a fallback avatar when a
  // client or user has no profile picture.
  getInitials(fullName) {
    const nameParts = fullName.trim().split(' ');
    const firstInitial = nameParts[0][0];
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
    return (firstInitial + lastInitial).toUpperCase();
  },
};
