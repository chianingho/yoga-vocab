# Vocab Matcher

> Turn real-life situations into vocabulary you can practice right away.

Vocab Matcher is a context-based vocabulary learning web app.

Describe a real-life situation you are preparing for—such as ordering food in Japan, joining a tennis class in Thailand, or attending a jewelry auction in Germany—and generate a personalized vocabulary set with pronunciation, examples, and a matching game.

[Live Demo](https://yoga-vocab.vercel.app/) · [GitHub Repository](https://github.com/chianingho/yoga-vocab)

<img src="docs/images/01-create-scenario.png" alt="Create vocabulary from a real-life scenario" width="360">

---

## Why I Built This

Vocab Matcher began when I was taking an anatomy course taught entirely in English. The course introduced many unfamiliar technical terms, and memorizing them through repetition alone was difficult.

Inspired by Duolingo's matching game, I built a simple tool for practicing anatomy vocabulary by pairing terms with their meanings.

I later noticed that people around me faced the same problem in very different contexts: preparing for a Korean language exam, joining a tennis class in Thailand, or attending a jewelry auction in Germany. Existing learning materials rarely match the exact vocabulary someone needs for their next real-life situation.

The project therefore grew from a single-purpose anatomy tool into a way to create personalized learning content for any real-life scenario.

---

## How It Works

### 1. Describe a situation

Choose a target language, CEFR level, number of vocabulary items, and a specific real-life scenario.

Supported languages:

- English
- Japanese
- Korean
- Thai
- Indonesian

### 2. Generate vocabulary

Each generated item includes:

- A target-language word or phrase
- A concise Traditional Chinese translation
- A phonetic transcription or pronunciation guide
- Part of speech
- An original-language example sentence
- Pronunciation playback

### 3. Preview and save

Review the generated vocabulary, play its pronunciation, and save important words to Favorites.

### 4. Practice by matching

Match target-language words with their Traditional Chinese meanings. Incorrect answers are recorded for later Review sessions.

<img src="docs/images/02-vocabulary-preview.png" alt="Review generated vocabulary before practicing" width="360">

<img src="docs/images/03-matching-game.png" alt="Practice vocabulary through a matching game" width="360">

---

## Key Features

- Context-based vocabulary generation
- CEFR level selection
- English, Japanese, Korean, Thai, and Indonesian
- Vocabulary Preview
- Pronunciation playback
- Favorites
- Matching game
- Wrong-answer tracking
- Smart Review
- Topic management
- Progressive Web App support
- Local learning history

---

## AI-Assisted Content Generation

Vocab Matcher uses Google Gemini to generate structured learning content based on the scenario, target language, CEFR level, and requested vocabulary count.

The system uses three layers of control to improve output consistency:

1. **Prompt contract** — Defines the responsibility and format of every field.
2. **Response schema** — Requires a consistent structured response.
3. **Normalization and validation** — Cleans and validates data before it reaches Preview, Match, Review, or localStorage.

For example, the `meaning` field must contain a concise Traditional Chinese translation suitable for matching:

```text
reservation → 預約
boarding pass → 登機證
receipt → 收據
```

It must not contain a dictionary definition, an example translation, or a lengthy explanation. Example sentences, by contrast, are preserved in full.

---

## Architecture

```text
Browser
├── HTML / JavaScript
├── Tailwind CSS
├── Web Speech API
└── localStorage
        │
        │ POST /api/generate
        ▼
Vercel Function
├── Prompt construction
├── Response schema
├── Validation
└── API key protection
        │
        ▼
Google Gemini
        │
        ▼
Normalize and render
├── Preview
├── Match
└── Review
```

The Gemini API key is stored in a server-side Vercel environment variable and is never exposed to the browser.

---

## Tech Stack

| Area          | Technology                       |
| ------------- | -------------------------------- |
| Frontend      | HTML, JavaScript                 |
| Styling       | Tailwind CSS                     |
| AI            | Google Gemini                    |
| SDK           | Google Gen AI SDK                |
| Backend       | Vercel Functions                 |
| Storage       | Browser localStorage             |
| Pronunciation | Web Speech API                   |
| Deployment    | Vercel                           |
| Analytics     | Vercel Analytics                 |
| Performance   | Vercel Speed Insights            |
| PWA           | Web App Manifest, Service Worker |

---

## Local Setup

### Prerequisites

- Node.js
- A Gemini API key
- Vercel CLI, or `npx vercel`

### Installation

```bash
git clone https://github.com/chianingho/yoga-vocab.git
cd yoga-vocab
npm install
```

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the local development environment:

```bash
npx vercel dev
```

> Do not commit `.env.local` or a production API key to GitHub.

---

## Current Status

The MVP is complete, and the product is currently in the product validation stage.

Current validation focuses on:

- Whether new users immediately understand how to begin
- The quality of vocabulary generated for different situations
- The stability of AI-generated content
- Whether matching practice improves recall
- Whether users return to create new scenarios

---

## Known Limitations

- Learning data is currently stored only in browser localStorage
- Data does not sync across devices
- Clearing browser data may remove learning history
- There is no account system or cloud backup
- AI-generated content may still require human review
- Pronunciation quality depends on browser and device voices

---

## Roadmap

- First round of user testing
- Improve generated content quality
- Refine Smart Review
- Add a more complete spaced-repetition system
- Export learning data
- Optional accounts and cross-device sync

---

## Case Study

For the full product story, design decisions, AI output validation process, and development reflections, see:

- [完整產品紀錄 — 繁體中文](docs/CASE_STUDY.md)

---

## License

This project is licensed under the MIT License.
