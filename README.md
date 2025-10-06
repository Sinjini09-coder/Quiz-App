# Quiz-App
# Levelled Quiz App (Client-side Demo)

A simple front-end quiz application demonstrating:

- User registration & login (client-side, stored in `localStorage`)
- Level selection during registration: `school`, `college`, `office`
- Filtering of questions by level
- Quiz interface, scoring, and saving results per user (in `localStorage`)

> This project is a demo / prototype. There is **no server**. Authentication and storage are insecure for production.

## Repo structure


## How it works (quick)

- Registration: user chooses name, email, password, and level. Password is hashed client-side (SHA-256) and stored in `localStorage`.
- Login: password hashed and compared to stored hash.
- After login, user can start a quiz for a chosen level (defaults to the level selected at registration). Questions are loaded from `js/questions.js`.
- Results are stored per-user in `localStorage` (key `qa_results_<email>`).

## How to run locally

1. Clone this repository (or copy files).
2. Open `index.html` in a modern browser (Chrome, Firefox, Edge).
   - No build step required.
3. Register a user and try the quiz.

## Security / Production notes

This project is for learning and prototyping only:

- Client-side hashing and storing credentials in `localStorage` is **not secure**. Anyone with access to the browser profile can read `localStorage`.
- For production: implement server-side authentication (HTTPS), proper password storage (bcrypt/scrypt/Argon2), session tokens (httpOnly cookies / secure storage), input validation, rate limiting, and a database.
- Do not use this code as-is for real user accounts.

## Extending the app

Ideas to improve:
- Add a real backend (Node/Express + DB) and implement JWT or cookie-based sessions.
- Add timed quizzes, pagination, and question categories.
- Allow admins to add/edit question banks.
- Track analytics and leaderboards.
- Add accessibility improvements (ARIA attributes, keyboard nav).

## License

MIT-style (use as you like).
