# CS5610 A1 — HTML / Next.js / Kambaz

Yingzi Zhang · Section 09

Chapter 1 HTML prototype. Styling beyond the highlight exercises is intentionally left to Chapter 2.

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:3000/labs or http://localhost:3000/account/signin.

```sh
npm run lint
npm run build
npm start
```

Dev and build use Webpack because Turbopack worker port binding was restricted in the local environment.

## Implemented

- Lab 1: headings, paragraphs, ordered/unordered lists, quiz/personal tables, remote/local images, all form input families, props, children, and anchors.
- Labs navigation: Lab 1–5, persistent TOC, student name/section, GitHub link, Chapter 1 link.
- Kambaz: account redirects, Signin/Signup/Profile, global and account navigation, three reusable CourseCards, course navigation, Home, nested Modules and Lessons, Course Status, Assignments, and Assignment Editor.
- Course placeholders: Piazza, Zoom, Quizzes, Grades, People.
- Not-found screen for unfinished destinations such as Calendar and Inbox.

This is a static HTML prototype: sign-in and sign-up navigate without authenticating; editor Save/Cancel return to the list without persistence; non-navigation toolbar buttons are structural examples. Forms prevent submission and do not send personal data.

## Personal content and assistance

The student supplied name, university, major, learning goal, pizza preference, and reading titles. Codex translated and inserted the supplied content, generated the recipe steps, completed the remaining implementation at the student's request, and verified the app. The personal learning table and goals break down the supplied learning goal. Scientific American is interpreted from the supplied title spelling.

The Student Profile uses the confirmed student name, school email (public display authorized), CS major, Graduate and Full-time selections, expected graduation in December 2027, and excitement 10/10. The program began in September 2024; the exact day was not provided, so a visible note preserves the month and the date control stays blank. The password is a practice field, not a real credential. Review the assistant-authored work before submission; this record does not claim independent student authorship.

## Sources and assets

- [Assignment checklist](https://kambaz.dev/assignments/a1)
- [Chapter 1](https://kambaz.dev/book/ch1) — textbook samples and required ids.
- Tesla Bot: course-provided sample downloaded from https://kambaz.dev/images/teslabot.jpg.
- Starship: remote textbook image from Star-Advertiser.
- Earth: NASA Apollo 17 public-domain photograph hosted on Wikimedia Commons.
- Pizza and course-card SVG illustrations were created for this project.

Quiz dates/grades, course cards, account profile, assignment dates, and module content are textbook/example data, not the student's actual records or live deadlines.

## Delivery status

See the separate A1 completion report for verified deployment and submission status. A successful local build does not mean the assignment has been submitted or graded.
