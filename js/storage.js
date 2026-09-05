// localStorage data-access layer. Every other script reads/writes state
// through this object instead of touching localStorage directly.
const Storage = {
  getUsers() {
    return JSON.parse(localStorage.getItem('crm_users')) || [];
  },
  saveUsers(users) {
    localStorage.setItem('crm_users', JSON.stringify(users));
  },
  getSession() {
    return JSON.parse(localStorage.getItem('crm_session'));
  },
  saveSession(session) {
    localStorage.setItem('crm_session', JSON.stringify(session));
  },
  clearSession() {
    localStorage.removeItem('crm_session');
  },
  getClients() {
    // null = "never loaded yet" (triggers an API fetch); [] = "loaded, empty"
    const raw = localStorage.getItem('crm_clients');
    return raw ? JSON.parse(raw) : null;
  },
  saveClients(clients) {
    localStorage.setItem('crm_clients', JSON.stringify(clients));
  },
  getTheme() {
    return localStorage.getItem('crm_theme') || 'dark';
  },
  saveTheme(theme) {
    localStorage.setItem('crm_theme', theme);
  },
};
