// Auth guard — the only place redirect-based access control lives.
const Guard = {
  protect() {
    if (!Storage.getSession()) {
      window.location.href = 'index.html';
    }
  },
  redirectIfAuthed() {
    if (Storage.getSession()) {
      window.location.href = 'dashboard.html';
    }
  },
};
