# PRODUCT AND ENGINEERING DECISIONS — V1

This document prevents unnecessary back-and-forth.

Codex should use every option marked:

`RECOMMENDED FOR V1`

Only raise the decision again when the repository makes the recommendation impossible.

---

## Decision 1 — Where to place the project

### Option A — One local folder containing everything
Place `index.html`, these Markdown files, and new API files in one folder.

**RECOMMENDED FOR V1**

Reason:
Codex works best when all relevant files are inside the folder where it is launched.

### Option B — Let Codex work only from pasted chat text
Not recommended because it cannot reliably inspect and edit the whole project.

### Selected
Option A.

---

## Decision 2 — Frontend architecture

### Option A — Preserve the single-file frontend
Keep existing UI, CSS, and JavaScript in `index.html`.

**RECOMMENDED FOR V1**

### Option B — Split into multiple frontend files
Cleaner later, but creates unnecessary risk during the first integration.

### Option C — Migrate to React/Vite
Out of scope.

### Selected
Option A.

---

## Decision 3 — Backend runtime

### Option A — Vercel Serverless Function
Create `api/generate.js`.

**RECOMMENDED FOR V1**

### Option B — Put Gemini directly in browser code
Forbidden because the API key would be exposed.

### Option C — Create a separate Express server
Unnecessary for v1.

### Selected
Option A.

---

## Decision 4 — Gemini model

### Option A — `gemini-2.5-flash`
Lower cost and appropriate for structured vocabulary generation.

**RECOMMENDED FOR V1**

### Option B — Pro model
Not selected.

### Selected
Option A.

---

## Decision 5 — Gemini SDK language

### Option A — JavaScript serverless function
Matches the current web project and Vercel deployment.

**RECOMMENDED FOR V1**

### Option B — Python serverless function
Possible, but adds a second language and deployment complexity.

### Selected
Option A.

Important:
The user's Python example communicates the required model name:

```python
model = genai.GenerativeModel("gemini-2.5-flash")
```

In JavaScript, use the official SDK's equivalent current syntax while preserving the exact
model identifier `gemini-2.5-flash`.

---

## Decision 6 — Generated vocabulary object shape

### Option A — Reuse existing keys
`word`, `ipa`, `pos`, `meaning`, `example`

**RECOMMENDED FOR V1**

### Option B — Replace with new keys
`translation`, `audio`, `level`, `category`

Not selected because it would force changes throughout the game.

### Selected
Option A.

---

## Decision 7 — Generated deck entry point

### Option A — Add one dedicated “AI Generate” card/button on Home
Opens a compact generator form.

**RECOMMENDED FOR V1**

### Option B — Replace all static modules with the generator
Not selected because static content should remain as fallback.

### Option C — Put the generator inside Profile
Not intuitive.

### Selected
Option A.

---

## Decision 8 — Generator fields

Use:

- Language: select
- Topic: free text
- Level: select A1, A2, B1, B2, C1, C2
- Count: select 10, 20, 30, 50

**RECOMMENDED FOR V1**

Default values:

- Language: English
- Level: B1
- Count: 20

Reason:
This covers common use cases while controlling cost and response reliability.

---

## Decision 9 — Maximum generation size

### Option A — Maximum 50 words per request
**RECOMMENDED FOR V1**

### Option B — 100 words per request
Higher latency and higher risk of malformed or incomplete output.

### Selected
Option A.

The user can generate again later. Do not silently support counts above 50 in v1.

---

## Decision 10 — Translation language

### Option A — Traditional Chinese
**RECOMMENDED FOR V1**

### Option B — User-selectable translation language
Useful later, but adds UI and prompt complexity.

### Selected
Option A.

---

## Decision 11 — Generated deck storage

### Option A — Save only the latest generated deck in `localStorage`
Restores it after refresh without requiring a database.

**RECOMMENDED FOR V1**

### Option B — Memory only
Simpler, but refresh loses the deck.

### Option C — Cloud database
Out of scope.

### Selected
Option A.

Use a versioned key such as:

`vocab_matcher_ai_deck_v1`

If stored data is invalid, ignore it safely.

---

## Decision 12 — Existing favorites and wrong answers

### Option A — Preserve the current in-memory behavior
**RECOMMENDED FOR V1**

### Option B — Redesign storage for all decks
Out of scope.

### Selected
Option A.

Do not expand persistence unless it is already implemented.

---

## Decision 13 — Loading experience

### Option A — Disable Generate, show spinner/text, prevent duplicate requests
**RECOMMENDED FOR V1**

Suggested text:

`Generating your vocabulary deck…`

### Option B — Full-screen loader
Too disruptive.

### Selected
Option A.

---

## Decision 14 — Error fallback

### Option A — Show inline error and keep static decks available
**RECOMMENDED FOR V1**

### Option B — Clear the existing deck
Not selected.

### Selected
Option A.

---

## Decision 15 — UI redesign

### Option A — Reuse current palette, typography, spacing, cards, and buttons
**RECOMMENDED FOR V1**

### Option B — Redesign the app
Forbidden for v1.

### Selected
Option A.

---

## Decision 16 — GitHub and deployment

### Option A — Use the local folder as the working copy, then push the completed files to GitHub and deploy that repository on Vercel
**RECOMMENDED FOR V1**

### Option B — Continue editing only inside GitHub's browser editor
Possible, but not ideal for Codex.

### Selected
Option A.

Codex may prepare the changes and instructions, but must not push, deploy, or overwrite a remote repository unless the user explicitly authorizes that action.
