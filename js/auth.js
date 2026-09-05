// Signup + login form logic.

function initSignupForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    UI.clearFieldErrors(form);

    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const company = form.company.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const users = Storage.getUsers();

    let hasError = false;
    if (fullName.length < 3) {
      UI.showFieldError('fullName', 'Full name must be at least 3 characters');
      hasError = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      UI.showFieldError('email', 'Please enter a valid email address');
      hasError = true;
    } else if (users.some(u => u.email === email)) {
      UI.showFieldError('email', 'An account with this email already exists');
      hasError = true;
    }
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      UI.showFieldError('password', 'Password must be at least 8 characters and contain a letter and a number');
      hasError = true;
    }
    if (confirmPassword !== password) {
      UI.showFieldError('confirmPassword', 'Passwords do not match');
      hasError = true;
    }
    if (hasError) return;

    const newUser = {
      id: Date.now(),
      fullName,
      email,
      password,
      company,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    Storage.saveUsers(users);

    UI.showToast('Account created successfully! Please log in.', 'success');
    setTimeout(() => { window.location.href = 'index.html'; }, 1500);
  });
}

document.addEventListener('DOMContentLoaded', initSignupForm);
