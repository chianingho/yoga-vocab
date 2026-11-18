# Vocab 技術架構

`index.html` 包含 HTML、CSS 和原生 JavaScript，負責選主題、牌組、配對、複習與收藏。流程為「選主題 → `POST /api/generate` → Gemini 產生資料 → 後端驗證並回傳單字 → 瀏覽器保存並開始配對」。發音透過 Web Speech API，牌組、收藏與學習紀錄在 `localStorage`，依瀏覽器保存。未發現外部資料庫。

`api/generate.js` 是 Vercel serverless 入口。鎖檔版本為 `@google/genai` 2.14.0；`package.json` 沒有 build script。 [歷史架構](../02_ARCHITECTURE.md)
