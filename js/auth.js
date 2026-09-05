// auth.js
//
// This file runs on both index.html (Login) and signup.html (Sign Up).
// It only sets up the form that actually exists on the current page —
// initSignupForm() and initLoginForm() both check for their form first
// and simply do nothing if it's not there.

import { Storage } from './storage.js';
import { UI } from './ui.js';
import { Guard } from './guard.js';

// If someone is already logged in, there is no reason to show them a
// login or signup form.
Guard.redirectIfAuthed();
UI.applyTheme();

function isValidEmailFormat(email) {
  // Very simple check: something, then @, then something, then a dot,
  // then something. Good enough for this project — we are not trying
  // to fully validate every real-world email address.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isValidPasswordFormat(password) {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return password.length >= 8 && hasLetter && hasNumber;
}

function initSignupForm() {
  const form = document.getElementById('signup-form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    UI.clearFieldErrors(form);

    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const company = form.company.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const existingUsers = Storage.getUsers();

    // We check every field and collect all the errors at once,
    // instead of stopping at the first one.
    let formIsValid = true;

    if (fullName.length < 3) {
      UI.showFieldError('fullName', 'Full name must be at least 3 characters');
      formIsValid = false;
    }

    if (!isValidEmailFormat(email)) {
      UI.showFieldError('email', 'Please enter a valid email address');
      formIsValid = false;
    } else {
      const emailAlreadyUsed = existingUsers.some((user) => user.email === email);
      if (emailAlreadyUsed) {
        UI.showFieldError('email', 'An account with this email already exists');
        formIsValid = false;
      }
    }

    if (!isValidPasswordFormat(password)) {
      UI.showFieldError('password', 'Password must be at least 8 characters and contain a letter and a number');
      formIsValid = false;
    }

    if (confirmPassword !== password) {
      UI.showFieldError('confirmPassword', 'Passwords do not match');
      formIsValid = false;
    }

    if (!formIsValid) {
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName: fullName,
      email: email,
      password: password,
      company: company,
      createdAt: new Date().toISOString(),
    };

    existingUsers.push(newUser);
    Storage.saveUsers(existingUsers);

    UI.showToast('Account created successfully! Please log in.', 'success');

    // Give the user a moment to read the toast before sending them to
    // the login page.
    setTimeout(function () {
      window.location.href = 'index.html';
    }, 1500);
  });
}

function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    UI.clearFieldErrors(form);

    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;

    let formIsValid = true;

    if (!email) {
      UI.showFieldError('email', 'Email is required');
      formIsValid = false;
    }

    if (!password) {
      UI.showFieldError('password', 'Password is required');
      formIsValid = false;
    }

    if (!formIsValid) {
      return;
    }

    const matchingUser = Storage.getUsers().find(
      (user) => user.email === email && user.password === password
    );

    if (!matchingUser) {
      // On purpose, we don't say whether the email or the password was
      // wrong — that's a common security practice so an attacker can't
      // use the error message to figure out which emails are registered.
      UI.showFieldError('password', 'Invalid email or password');
      return;
    }

    Storage.saveSession({
      userId: matchingUser.id,
      email: matchingUser.email,
      loginAt: new Date().toISOString(),
    });

    window.location.href = 'dashboard.html';
  });
}

initSignupForm();
initLoginForm();
