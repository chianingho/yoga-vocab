# Vocab Matcher — Vocabulary Memory v1.5

## Goal

Add a local vocabulary memory system to the existing Vocab Matcher app without redesigning the UI or rewriting the project.

The app must remember:

1. Which decks/topics the user generated.
2. Which individual words the user has seen.
3. Correct and wrong answer counts for each word.
4. The topics in which each word appeared.
5. The most recent review time.
6. A simple mastery score.

Use `localStorage` only for this version. Do not add a database, login, Firebase, Supabase, or other backend storage.

## Important constraints

- Preserve the existing UI, CSS, layout, animations, matching logic, pronunciation, and static decks.
- Do not redesign the frontend.
- Do not rewrite the app.
- Modify only the files required for vocabulary memory.
- Keep the current Gemini model and API flow unchanged unless a small request-field addition is needed.
- Do not expose `GEMINI_API_KEY`.
- Do not deploy or push.
- Inspect the current implementation before changing anything.
- Existing users must not lose their current custom deck.

## Storage design

Use one localStorage key:

```js
vocab_matcher_memory_v1
```

Stored value:

```json
{
  "version": 1,
  "words": {
    "order": {
      "word": "order",
      "meaning": "點餐；訂購",
      "phonetic": "...",
      "example": "...",
      "exampleTranslation": "...",
      "seenCount": 2,
      "correctCount": 3,
      "wrongCount": 1,
      "topics": ["豬排店點餐", "餐廳英文"],
      "levels": ["A1", "A2"],
      "firstSeenAt": "2026-07-30T05:00:00.000Z",
      "lastSeenAt": "2026-07-30T05:20:00.000Z",
      "lastReviewedAt": "2026-07-30T05:25:00.000Z",
      "mastery": 67
    }
  },
  "decks": [
    {
      "id": "generated-id",
      "topic": "豬排店點餐",
      "level": "A1",
      "wordKeys": ["order", "menu"],
      "createdAt": "2026-07-30T05:00:00.000Z"
    }
  ]
}
```

### Canonical word key

Normalize words before using them as keys:

```js
word.trim().toLowerCase()
```

Do not merge different phrases accidentally beyond lowercase and surrounding whitespace removal.

## Required helper functions

Add small, testable helpers with names equivalent to:

```js
loadVocabularyMemory()
saveVocabularyMemory(memory)
normalizeWordKey(word)
upsertGeneratedDeckMemory(deckMetadata, words)
recordWordAnswer(word, isCorrect)
calculateMastery(entry)
getKnownWordKeys()
```

The exact names may follow the current code style, but the responsibilities must remain clear.

### Safe loading

If localStorage data is missing, malformed, or from an unsupported version:

- Do not crash.
- Return a clean default structure.
- Preserve the rest of the app.

## Behavior A — after AI deck generation

After a custom deck is generated successfully and normalized:

1. Keep the current custom-deck save behavior.
2. Add or update every generated word in vocabulary memory.
3. Increment `seenCount` once per generated deck.
4. Add the topic to `topics` without duplicates.
5. Add the level to `levels` without duplicates.
6. Preserve existing correct/wrong statistics.
7. Save one deck-history entry.
8. Do not create duplicate deck-history entries during rerenders.

A word repeated inside the same generated response should count only once.

## Behavior B — during the matching game

When the user completes a match:

- Correct match:
  - increment `correctCount`
  - update `lastReviewedAt`
  - recalculate mastery

- Wrong attempt:
  - increment `wrongCount`
  - update `lastReviewedAt`
  - recalculate mastery

Do not count UI rerenders, card selection, or reopening a deck as an answer.

### Mastery formula

Use this simple deterministic formula:

```js
attempts = correctCount + wrongCount

if attempts === 0:
  mastery = 0
else:
  accuracy = correctCount / attempts
  practiceBonus = min(seenCount * 5, 20)
  mastery = round(min(100, accuracy * 80 + practiceBonus))
```

## Behavior C — avoid repeated AI vocabulary

Before requesting a new AI deck:

1. Read known word keys from vocabulary memory.
2. Send at most the 100 most recently seen known words to `/api/generate`.
3. Add the optional request field:

```json
{
  "knownWords": ["menu", "order", "bill"]
}
```

Backend requirements:

- Validate that `knownWords` is an array of strings.
- Trim and lowercase entries.
- Cap at 100 entries.
- Include them in the Gemini prompt as words to avoid when reasonable.
- Treat this as a preference, not a hard failure condition.
- If the topic is narrow and a repeated word is necessary, generation may still succeed.
- Keep response schema unchanged.

Prompt meaning:

> Prefer vocabulary the learner has not seen before. Avoid the listed known words when reasonable. If avoiding all of them would reduce relevance or correctness, prioritize useful topic vocabulary.

Do not send the full memory object to the backend.

## Behavior D — profile statistics

Reuse the existing Profile view. Do not redesign it.

Add or update compact statistics:

- Total Vocabulary
- Mastered Words
- Need Review

Definitions:

```js
totalVocabulary = number of unique word entries
masteredWords = mastery >= 80
needReview = wrongCount > 0 && mastery < 80
```

Keep the existing Favorite Words and Wrong Words values.

Use the current visual style and existing card pattern.

## Migration and compatibility

- Existing static decks must continue to work.
- Existing custom deck storage must continue to work.
- If a previously saved custom deck exists, import its words into memory once when possible.
- Use a migration marker inside the memory object or another namespaced localStorage key.
- Do not repeatedly increment `seenCount` on every page load.
- Do not delete old localStorage keys.

## Acceptance tests

### Storage

1. Generate `豬排店點餐`, A1, 10 words.
2. Confirm `vocab_matcher_memory_v1` exists.
3. Confirm exactly 10 unique word entries are added.
4. Reload the browser.
5. Confirm memory remains.
6. Confirm reload does not increment `seenCount`.

### Duplicate handling

1. Generate another topic containing one previously seen word.
2. Confirm that word remains one unique entry.
3. Confirm its `seenCount` increments.
4. Confirm both topics appear once in `topics`.

### Game tracking

1. Answer one word correctly.
2. Confirm `correctCount` increments exactly once.
3. Make one wrong attempt.
4. Confirm `wrongCount` increments exactly once.
5. Confirm mastery updates.

### AI avoidance

1. Generate a deck.
2. Generate a second deck with a related topic.
3. Confirm the request includes known words.
4. Confirm the app still succeeds if Gemini repeats a necessary word.
5. Confirm repeated words merge rather than duplicate.

### Regression

- Static decks still open.
- Custom deck still opens.
- Matching game still works.
- Favorite and wrong-word features still work.
- Pronunciation still works.
- No API key appears in browser source or network payload.
- No console errors.
- No unrelated visual changes.

## Codex execution prompt

Inspect the current project before editing. Implement the specification in this file as a small upgrade, not a rewrite.

Work primarily in the current `index.html` and `api/generate.js` unless the real project structure clearly requires otherwise.

Before editing, identify:

1. Current localStorage keys.
2. Current custom-deck save/load flow.
3. The exact successful AI-generation callback.
4. The exact correct-match and wrong-attempt handlers.
5. Existing profile statistic rendering.
6. Existing request validation in `/api/generate`.

Then implement Vocabulary Memory v1.5.

After implementation:

1. Restart the local Vercel runtime.
2. Test generation with:
   - Language: English
   - Level: A1
   - Topic: 豬排店點餐
   - Count: 10
3. Test persistence after reload.
4. Test one correct and one wrong answer.
5. Generate a second related deck and verify known-word avoidance.
6. Report:
   - changed files
   - storage keys
   - migration behavior
   - request payload change
   - test results
   - any remaining limitations

Do not redesign.
Do not deploy.
Do not push.
Do not modify unrelated files.
Do not print or log secret values.
