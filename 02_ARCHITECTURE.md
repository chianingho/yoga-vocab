# CURRENT ARCHITECTURE AND INTEGRATION PLAN

## Current architecture

The application is a single-page, single-file vanilla JavaScript app.

### UI views

The page contains these existing views:

- `view-home`
- `view-preview`
- `view-game`
- `view-complete`
- `view-review`
- `view-profile`

Navigation is controlled by:

- `showView(viewId)`
- `switchBottomTab(tab)`

---

## Current vocabulary sources

Production starts with an empty runtime database. User-generated decks are restored from localStorage and registered dynamically:

```javascript
const database = {};
```

Each vocabulary item currently follows this shape:

```javascript
{
  word: "",
  ipa: "",
  pos: "",
  meaning: "",
  example: ""
}
```

This shape is the compatibility contract for v1.

---

## Current game data flow

```text
database[moduleKey].data
        ↓
getFilteredWordsForModule(moduleKey)
        ↓
initRoundSession()
        ↓
shuffle(...).slice(0, 10)
        ↓
fullSession10Words
        ↓
renderPreviewList()
        ↓
startMatchingGame() / startRoundChallenge()
        ↓
currentRound5
        ↓
left word cards + right meaning cards
        ↓
handleCardClick(...)
        ↓
showCompletionScreen()
```

Important existing state:

- `currentModuleKey`
- `currentSegment`
- `fullSession10Words`
- `roundIndex`
- `currentRound5`
- `favoriteWords`
- `wrongWordsMap`
- `totalMistakes`

---

## Existing behavior to preserve

### Preview

`renderPreviewList()` expects:

- `item.word`
- `item.ipa`
- `item.pos`
- `item.meaning`
- `item.example`

It also calls:

- `toggleFavorite(item.word)`
- `speak(item.word)`

### Matching game

The matching identity is based on:

`item.word`

The left card displays:

- word;
- part of speech;
- pronunciation button.

The right card displays:

- meaning.

Do not change this matching identity in v1.

### Filtering

`getFilteredWordsForModule()` reads:

`database[currentModuleKey].data`

Therefore the safest integration is to register a generated deck as another database module.

---

## Recommended v1 integration

Create a persistent runtime module entry:

```javascript
database.ai = {
  title: "AI Generated Deck",
  subtitle: "Custom vocabulary",
  lang: "en-US",
  data: []
};
```

After a successful response:

```javascript
database.ai.data = normalizedWords;
database.ai.title = generatedTitle;
database.ai.lang = speechLocale;
currentModuleKey = "ai";
currentSegment = "all";
initRoundSession();
```

This reuses the existing flow instead of rewriting it.

If the module-card renderer automatically loops through all keys in `database`,
Codex may either:

1. show the AI deck card only after generation; or
2. add a dedicated generator card before the normal module cards.

Use the decision in `03_DECISIONS.md`.

---

## Files recommended for v1

Keep the frontend mostly in:

- `index.html`

Create:

- `api/generate.js`
- `package.json` only if required for the official SDK and Vercel runtime;
- `.env.example`;
- `README_DEPLOY.md`.

Do not split all existing HTML, CSS, and JavaScript into separate files during v1.

---

## Server flow

```text
POST /api/generate
        ↓
validate body
        ↓
construct fixed prompt
        ↓
call gemini-2.5-flash
        ↓
extract JSON
        ↓
parse
        ↓
validate and normalize words
        ↓
remove duplicates
        ↓
return normalized response
```

---

## Prompt contract

The server prompt should instruct Gemini to:

- return JSON only;
- produce exactly the requested language;
- write `meaning` in Traditional Chinese;
- keep examples appropriate for the requested CEFR level;
- return one natural example per word;
- use the required vocabulary object keys;
- avoid duplicates;
- avoid markdown fences;
- avoid commentary.

Prefer structured JSON output supported by the current official SDK. Still validate all output.

---

## Speech locale

The existing `speak()` function should continue to use the active module language.

Add a small language-to-locale mapping, for example:

- English → `en-US`
- German → `de-DE`
- French → `fr-FR`
- Spanish → `es-ES`
- Italian → `it-IT`
- Japanese → `ja-JP`
- Korean → `ko-KR`

Fallback:

`en-US`

Do not add paid audio generation in v1.

---

## Generated deck lifetime

Recommended v1 behavior:

- keep the current generated deck in memory;
- optionally save the latest successful deck to `localStorage`;
- do not create a database.

See `03_DECISIONS.md` for the selected choice.
