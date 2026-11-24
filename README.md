# CS5610 A5 — Express APIs and Kambaz

Yingzi Zhang · Section 09

Chapter 5 client on branch `a5`, continuing the existing Labs 1–4 and Kambaz application. The sibling `webdev-server` project stores the classroom data in memory.

## Run

Start the sibling server in another terminal:

```sh
cd ../webdev-server
npm ci
npm start
```

In this client, copy `.env.example` to `.env.development.local`, then run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000/labs/lab5 or http://localhost:3000/account/signin.
The default local API is http://localhost:4000. Use the same hostname (`localhost`) for both apps so the local session cookie works.

```sh
npm run lint
npm run build
```

For a production build, set `NEXT_PUBLIC_HTTP_SERVER` to the actual HTTPS Express origin before building. Next.js embeds this public value at build time. The server's `CLIENT_URL` must include the exact frontend origin, without a trailing slash. No deployed URL is invented or hardcoded.

## Implemented

- Lab 5: environment link, path/query arithmetic, remote objects/arrays, property updates, axios requests and load-on-mount, JSON POST/PUT/DELETE, loading/error states.
- Same-app `/api/lab5/hello` and `/api/lab5/calculator` Route Handlers.
- Kambaz account sign-in/sign-up/profile/sign-out and session restoration.
- Server-backed courses, modules, assignments, enrollments, and course membership views. Zustand stores cache server responses.
- Faculty can edit; students can view and manage their own enrollments. Public visitors can inspect sample courses, modules, and assignments.
- Labs navigation preserves Labs 1–5 and adds client/server repository and server-root links.

Use fictional demo accounts: `nick_fury` / `fury123` (faculty) and `iron_man` / `stark123` (student). Never reuse a real password in this classroom prototype. Refresh preserves changes while Express runs; restarting the server resets the sample data. This assignment does not yet use MongoDB.

## A5 deployment

Both repositories need an `a5` branch on GitHub. Deploy the server on Render (or Heroku), configure its production session/CORS settings, then set the client's `NEXT_PUBLIC_HTTP_SERVER` and deploy its `a5` branch on Vercel. The public URLs must be verified before submitting them on [Kambaz A5](https://kambaz.dev/assignments/a5).

## A5 assistance

Codex adapted the existing A4 project to Chapter 5, implemented the Express server and HTTP clients, and ran local checks at the student's request. This records AI assistance and does not claim independent authorship. Review the source and the course's own-work expectations before submission.

## Personal content and assistance

The student supplied name, university, major, learning goal, pizza preference, and reading titles. Codex translated and inserted the supplied content, generated the recipe steps, completed the remaining implementation at the student's request, and verified the app. The personal learning table and goals break down the supplied learning goal. Scientific American is interpreted from the supplied title spelling.

The Student Profile uses the confirmed student name, school email (public display authorized), CS major, Graduate and Full-time selections, expected graduation in December 2027, and excitement 10/10. The program began in September 2024; the exact day was not provided, so a visible note preserves the month and the date control stays blank. The password is a practice field, not a real credential. Review the assistant-authored work before submission; this record does not claim independent student authorship.

## Sources and assets

- [A5 assignment checklist](https://kambaz.dev/assignments/a5)
- [Chapter 5](https://kambaz.dev/book/ch5) — HTTP API examples and deliverables.
- [Chapter 1](https://kambaz.dev/book/ch1) — textbook samples and required ids.
- Tesla Bot: course-provided sample downloaded from https://kambaz.dev/images/teslabot.jpg.
- Starship: remote textbook image from Star-Advertiser.
- Earth: NASA Apollo 17 public-domain photograph hosted on Wikimedia Commons.
- Pizza and course-card SVG illustrations were created for this project.

Quiz dates/grades, course cards, account profile, assignment dates, and module content are textbook/example data, not the student's actual records or live deadlines.

## Delivery status

A5 deployment and submission have not yet been performed in this implementation pass. A successful local build does not mean the assignment has been submitted or graded.
