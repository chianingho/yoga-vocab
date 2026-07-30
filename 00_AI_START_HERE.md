# AI START HERE — Vocab Matcher v1

You are working on an existing single-file web application.

## Mandatory reading order

Read these files completely and in this exact order:

1. `00_AI_START_HERE.md`
2. `01_PROJECT_CONTEXT.md`
3. `02_ARCHITECTURE.md`
4. `03_DECISIONS.md`
5. `04_TASKS.md`
6. `05_CODE_GUIDELINES.md`
7. `index.html`

Do not write or modify code until all seven items have been read.

---

## Repository reality

The current application is mainly contained in:

`index.html`

The HTML, CSS, JavaScript, static vocabulary datasets, views, matching-game logic,
audio feedback, speech synthesis, review library, favorites, wrong-answer tracking,
and app-icon settings are currently implemented in this file.

Do not assume React, Vue, Vite, Node, or any other framework exists.

Do not add a framework unless the existing repository already requires it.

---

## Main assignment

Build the first working version of an AI vocabulary generator using:

`gemini-2.5-flash`

The user must be able to choose:

- target language
- topic
- CEFR difficulty level
- word count

The generated vocabulary must be converted into the existing vocabulary object shape
and loaded into the current matching-game flow.

---

## First action after reading

Before coding, report:

1. The current project structure you found.
2. The exact current vocabulary object shape.
3. The functions that control the data flow.
4. The files you plan to create or modify.
5. Any conflict between the repository and these specifications.

Then proceed with the recommended v1 decisions in `03_DECISIONS.md`.

Do not ask the user to choose again for decisions already marked `RECOMMENDED FOR V1`.

Only stop for a decision when:

- a required secret or account value is missing;
- an irreversible operation is required;
- the repository materially contradicts the specification;
- deployment cannot work without changing the selected architecture.

---

## Definition of done

The v1 task is complete only when:

- the existing static modules still work;
- an AI Generator entry exists;
- the frontend calls a server-side endpoint;
- the Gemini key is never exposed in browser code;
- Gemini 2.5 Flash is used;
- valid generated words can enter the current preview and matching flow;
- loading and error states work;
- a `.env.example` file exists;
- deployment instructions are documented;
- no unrelated UI redesign or large refactor was performed.
