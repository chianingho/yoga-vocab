# IMPLEMENTATION TASKS — V1

Complete tasks in order.

## Phase 0 — Inspection

- [ ] Read all specification files in order.
- [ ] Read the complete `index.html`.
- [ ] Confirm actual function names and current data flow.
- [ ] Confirm whether `package.json`, `api/`, or Vercel configuration already exists.
- [ ] Report planned file changes before implementation.

## Phase 1 — Protect current behavior

- [ ] Preserve static datasets.
- [ ] Preserve module cards.
- [ ] Preserve preview.
- [ ] Preserve matching logic.
- [ ] Preserve audio and speech.
- [ ] Preserve favorites and wrong-answer flow.
- [ ] Preserve responsive layout and current styling.

## Phase 2 — Generator UI

- [ ] Add a dedicated AI generator entry on Home.
- [ ] Add target language field.
- [ ] Add topic field.
- [ ] Add CEFR level field.
- [ ] Add count field: 10, 20, 30, 50.
- [ ] Add Generate button.
- [ ] Add loading state.
- [ ] Add inline validation.
- [ ] Add inline API error state.
- [ ] Match the existing design system.

## Phase 3 — API

- [ ] Create `api/generate.js`.
- [ ] Use the official Google Gemini SDK.
- [ ] Use model identifier `gemini-2.5-flash`.
- [ ] Read `GEMINI_API_KEY` server-side.
- [ ] Accept POST only.
- [ ] Validate request body.
- [ ] Enforce maximum count of 50.
- [ ] Build a fixed structured prompt.
- [ ] Request JSON output where supported.
- [ ] Parse and validate model output.
- [ ] Normalize to existing word shape.
- [ ] Remove duplicates.
- [ ] Return friendly status codes and errors.
- [ ] Do not leak secrets or raw internal errors.

## Phase 4 — Data integration

- [ ] Add or initialize `database.ai`.
- [ ] Map generated language to speech locale.
- [ ] Insert normalized words into `database.ai.data`.
- [ ] Set `currentModuleKey = "ai"`.
- [ ] Start the existing preview flow.
- [ ] Ensure 10-word generation works.
- [ ] Ensure 20/30/50-word decks still start sessions by drawing 10 at a time.
- [ ] Save latest valid deck to `localStorage`.
- [ ] Restore latest valid deck safely on load.

## Phase 5 — Configuration

- [ ] Create `.env.example`.
- [ ] Add package dependency only when required.
- [ ] Create `README_DEPLOY.md`.
- [ ] Document local testing.
- [ ] Document Vercel environment-variable setup.
- [ ] Confirm the real `.env` is ignored if a git repository exists.

## Phase 6 — Testing

- [ ] Existing locally generated modules still work after migration.
- [ ] Generated English deck works.
- [ ] At least one non-English deck works.
- [ ] Pronunciation uses the correct locale.
- [ ] Preview displays all required fields.
- [ ] Matching works.
- [ ] Wrong answer is recorded.
- [ ] Favorite toggle works.
- [ ] Refresh restores the latest AI deck.
- [ ] Missing API key shows a safe error.
- [ ] Invalid topic is rejected.
- [ ] Count above 50 is rejected.
- [ ] API failure does not remove static modules.
- [ ] No secret appears in frontend source.

## Phase 7 — Final report

Report:

- files created;
- files modified;
- architecture used;
- test results;
- unresolved risks;
- exact commands the user should run;
- exact Vercel setup steps;
- any remaining decision that genuinely needs the user.
