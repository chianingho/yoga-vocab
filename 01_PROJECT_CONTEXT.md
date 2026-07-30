# PROJECT CONTEXT — Vocab Matcher

## Product summary

Vocab Matcher is a vocabulary-learning web app with:

- module-based vocabulary decks;
- a 10-word preview;
- two matching rounds of five words;
- pronunciation;
- example sentences;
- favorites;
- wrong-answer review;
- completion statistics;
- responsive mobile-first UI.

This task is an upgrade, not a rewrite.

---

## Current application

The current source supplied to Codex is:

`index.html`

It is a single-file application using:

- standard HTML;
- Tailwind CSS loaded from CDN;
- custom CSS;
- vanilla JavaScript;
- browser speech synthesis;
- browser audio APIs;
- local browser storage for selected app-icon style;
- embedded static vocabulary arrays.

The existing visual design and game behavior are already approved.

---

## Primary goal

Add an AI Vocabulary Generator backed by Gemini.

Target flow:

User selects language, topic, CEFR level, and word count
→ frontend sends `POST /api/generate`
→ server validates input
→ server calls Gemini 2.5 Flash
→ server validates and normalizes JSON
→ generated deck is inserted into the existing `database`
→ existing preview and matching game continue unchanged.

---

## Gemini requirement

Use the Flash model.

Preferred model identifier:

```python
model = genai.GenerativeModel("gemini-2.5-flash")
```

Do not switch to a Pro model.

If the installed official SDK uses a newer invocation style, keep the model identifier
exactly as:

`gemini-2.5-flash`

Use only the official Google Gemini SDK.

---

## Secret handling

The API key must exist only on the server.

Environment variable:

```text
GEMINI_API_KEY=
```

Never:

- write the real key into `index.html`;
- commit the real key;
- return the key to the browser;
- log the key;
- place the key in a public GitHub repository.

Create `.env.example`, but never create a committed `.env` containing a real key.

---

## Deployment target

Primary deployment target:

Vercel

Use a Vercel-compatible serverless API route.

Do not introduce Express, Fastify, NestJS, or another backend framework for v1.

The current GitHub-hosted static page cannot securely contain the Gemini API key.
The AI-enabled version should therefore be deployed through Vercel, while GitHub
continues to store the source code.

---

## Required request

Endpoint:

```text
POST /api/generate
```

Recommended request body:

```json
{
  "language": "English",
  "topic": "Jewelry auction",
  "level": "B2",
  "count": 20
}
```

---

## Required response

Recommended normalized response:

```json
{
  "language": "English",
  "topic": "Jewelry auction",
  "level": "B2",
  "count": 20,
  "words": [
    {
      "word": "appraisal",
      "ipa": "/əˈpreɪzəl/",
      "pos": "n.",
      "meaning": "估價；鑑價",
      "example": "The auction house arranged an appraisal of the necklace."
    }
  ]
}
```

The frontend must use this existing object shape:

```json
{
  "word": "",
  "ipa": "",
  "pos": "",
  "meaning": "",
  "example": ""
}
```

Do not make `audio`, `translation`, `category`, or `level` required on every word object
for v1. Pronunciation is already handled by the browser.

---

## Validation

Server-side validation must include:

- supported non-empty language;
- non-empty topic;
- valid CEFR level;
- integer count within the chosen v1 limit;
- returned `words` is an array;
- every item includes non-empty `word`, `meaning`, and `example`;
- missing `ipa` may become an empty string;
- missing `pos` may become `"word"`;
- duplicate words are removed;
- malformed model output produces a friendly server error.

---

## Error handling

Handle:

- missing request fields;
- invalid count;
- missing API key;
- Gemini request failure;
- timeout;
- invalid JSON;
- empty vocabulary;
- too few valid words after normalization;
- frontend network failure.

The UI must display a clear error and allow retrying.

Do not destroy the existing static vocabulary when generation fails.

---

## Non-goals for v1

Do not implement yet:

- login;
- cloud database;
- community decks;
- payments;
- deck sharing;
- permanent server storage;
- custom audio generation;
- large architectural rewrite;
- TypeScript migration;
- React migration.

---

## Success criteria

A user can generate a temporary AI deck and immediately use the current:

- preview;
- favorite button;
- pronunciation;
- two-round matching game;
- wrong-answer tracking;
- completion screen.

Existing static decks remain available.
