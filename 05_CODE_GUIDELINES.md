# CODE GUIDELINES

## Core rule

Make the smallest safe change that delivers v1.

---

## Before editing

- Read the complete repository.
- Do not infer that frameworks or files exist.
- Locate the real functions before referring to them.
- Preserve working code.
- Explain the planned changes briefly.

---

## Frontend

- Keep vanilla JavaScript.
- Keep existing Tailwind CDN setup for v1.
- Keep current colors, fonts, spacing, animation, and interaction style.
- Do not rename existing functions unless required.
- Do not change existing vocabulary object keys.
- Add accessible labels and disabled/loading states.
- Escape or safely render model-generated text.
- Do not inject untrusted values through unsafe inline HTML where avoidable.
- Keep generated content compatible with Traditional Chinese text.

---

## Backend

- Use a Vercel-compatible serverless API route.
- Accept POST only.
- Validate all inputs server-side.
- Use `gemini-2.5-flash`.
- Use the official Google SDK.
- Set a reasonable request timeout if supported.
- Do not expose stack traces or secrets to the browser.
- Do not trust model output.
- Parse, validate, normalize, and deduplicate it.
- Return appropriate HTTP status codes.

Suggested categories:

- `400` invalid user input;
- `405` wrong HTTP method;
- `500` missing server configuration or internal failure;
- `502` malformed or failed Gemini response;
- `504` timeout.

---

## Data compatibility

Every returned word must be normalized to:

```javascript
{
  word: string,
  ipa: string,
  pos: string,
  meaning: string,
  example: string
}
```

Required after normalization:

- `word`
- `meaning`
- `example`

Defaults:

- `ipa: ""`
- `pos: "word"`

Deduplicate case-insensitively by trimmed `word`.

---

## Security

Never:

- expose `GEMINI_API_KEY`;
- put secrets in client-side code;
- commit `.env`;
- use model output as executable code;
- trust client-provided count without validation;
- permit unbounded request sizes;
- silently log personal or secret data.

---

## Scope control

Do not:

- migrate to React;
- split the entire app;
- redesign the UI;
- remove static decks;
- create authentication;
- add a database;
- add paid text-to-speech;
- implement community features;
- push to GitHub without explicit user authorization;
- deploy without explicit user authorization.

---

## Decision protocol

For decisions already marked `RECOMMENDED FOR V1`:

- implement them without asking again.

For a new material decision:

1. State the issue.
2. Give no more than three options.
3. Mark one recommendation.
4. Explain the tradeoff briefly.
5. Continue with a reversible safe default when possible.

Ask the user only when the decision is irreversible, costly, security-sensitive,
or materially changes the product.
