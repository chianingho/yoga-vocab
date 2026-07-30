# Vocab Matcher

Vocab Matcher 是一款依主題產生情境單字、用配對遊戲建立長期學習記憶的網頁應用程式。

## Live demo

TODO: 加入正式展示網址。

## Product screenshots

TODO: 加入不含個人資料或機密資訊的產品截圖。

## Core features

- AI topic vocabulary generation
- CEFR-adjusted explanations and examples
- Domain-aware terminology
- Accumulated topic decks
- Device-local vocabulary memory
- Known-word avoidance
- Mastery and review tracking
- Multi-context Vocabulary
- Matching game and pronunciation
- Context-aware favorites and wrong-answer review

## Privacy

單字牌組與學習紀錄只儲存在使用者自己的瀏覽器 localStorage。不同使用者不會看到彼此的資料；清除瀏覽器儲存空間可能移除所有學習紀錄。本版本沒有帳號同步功能。

## Architecture

`Browser → Vercel Function (/api/generate) → Gemini`

瀏覽器不會取得 Gemini API key；AI 請求由伺服器端函式代理。

## Tech stack

- HTML、JavaScript、Tailwind CSS
- Vercel Functions
- Google Gen AI SDK (`@google/genai`)
- Gemini Flash
- Browser localStorage、Web Speech API

## Local setup

1. 安裝 Node.js 20+ 與依賴：`npm install`
2. 複製 `.env.example` 為 `.env.local`
3. 在 `.env.local` 設定 `GEMINI_API_KEY`
4. 啟動：`npx vercel dev`
5. 開啟終端機顯示的本機網址

## Environment variables

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

此變數只可設定於伺服器環境，不可使用 `PUBLIC_`、`NEXT_PUBLIC_` 或 `VITE_` 前綴。

## Vercel deployment

1. 將專案匯入 Vercel。
2. 在 Project Settings → Environment Variables 新增 `GEMINI_API_KEY`。
3. 完成測試後再由專案維護者部署。

## Known limitations

- 學習紀錄不會跨裝置同步。
- 無帳號、雲端備份或完整伺服器端 rate limiting。
- AI 內容仍可能需要人工判斷。
- 瀏覽器語音品質依裝置與已安裝語音而異。
- 刪除 topic 會移除該裝置上的牌組、context、收藏與複習項目。字詞若仍有其他 context，word-level `seenCount`、`correctCount`、`wrongCount` 與 mastery 會完整保留，不會依 context 回推扣除。

## Roadmap

- 可選的帳號同步與資料匯出
- 更完整的複習排程與無障礙測試

## Author / portfolio

TODO: 加入作者姓名與作品集連結。

## License

尚未選定開源授權，請參閱 [LICENSE.md](LICENSE.md)。
