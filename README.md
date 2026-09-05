# 10X CRM

## About

10X CRM is a simplified client-relationship management tool for a sales manager who needs to track leads through a pipeline. It covers account creation and login, a dashboard with live stats, a searchable/filterable client list backed by a real API, and a profile page — all built with plain HTML, CSS, and JavaScript, no frameworks.

## Features

- **Sign up / Login** — form validation with exact error messages, passwords stored (in plain text, deliberately — see note below) in `localStorage`.
- **Auth guard** — protected pages (Dashboard, Clients, Profile) redirect to Login when no session exists; Login/Sign Up redirect away when one does.
- **Dashboard** — live clock, 4 stat cards (Total Clients, Active Deals, Won Revenue, New This Week), a pipeline breakdown by status, and the 5 most recently added clients.
- **Clients** — loads 30 seed clients from the DummyJSON API on first visit (cached in `localStorage` after that), search by name/company, filter by pipeline status, sort by newest/name/deal value, add a client (POST), delete a client (DELETE, with confirmation), change a client's status inline, and a details modal with notes and a 1-minute follow-up reminder toast.
- **Profile** — edit full name/company, change password (validated against the current password), and reset all client data back to a fresh 30 from the API.
- **Dark/light theme** toggle, persisted across visits.

## Tech Stack

- Vanilla JavaScript (ES modules), HTML, CSS — no frameworks or libraries.
- [DummyJSON](https://dummyjson.com) as the mock REST API for client data (`GET /users`, `POST /users/add`, `DELETE /users/{id}`).
- Browser `localStorage` for all persistence (`crm_users`, `crm_session`, `crm_clients`, `crm_theme`).
- [`node:test`](https://nodejs.org/api/test.html) for unit tests of pure logic (no dependencies).

## How to Run

No build step or server is required for the app itself:

1. Clone the repo.
2. Open `index.html` directly in a browser, or serve the folder with any static file server (e.g. the VS Code "Live Server" extension) if your browser blocks `fetch()` from `file://` URLs.

To run the unit tests:

```bash
npm test
```

## Live Demo

_Not yet deployed — a Vercel/Netlify link will be added here once the app is deployed._

## Test Account

Sign up with any email/password (min. 8 characters, at least one letter and one number) — there is no seed account, since accounts are created client-side in `localStorage` and don't persist across browsers/devices.

## Credits

Built solo, with AI assistance from Claude Code throughout — see [`ai-log.md`](ai-log.md) for specific prompts, what was used vs. rejected, and what was learned.
