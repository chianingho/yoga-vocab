# Vocab Matcher v1：本機與 Vercel 設定

## 本機測試

需求：Node.js 20 以上與 Gemini API key。

```bash
npm install
cp .env.example .env.local
```

在 `.env.local` 填入：

```text
GEMINI_API_KEY=你的金鑰
```

啟動：

```bash
npm run dev
```

依終端機顯示的本機網址開啟應用程式。請勿用 `file://` 直接開啟 `index.html`，否則 `/api/generate` 無法運作。

## 部署至 Vercel

1. 將此資料夾存入 GitHub repository（需由專案擁有者明確授權後執行）。
2. 在 Vercel 匯入該 repository；Framework Preset 選 `Other`，保留預設 Build/Output 設定。
3. 到 Project Settings → Environment Variables，新增 `GEMINI_API_KEY`，值為真實 Gemini API key；至少套用 Production，建議也套用 Preview。
4. 觸發部署並開啟網站，從首頁送出一次 AI 單字產生請求。

API key 僅由 `api/generate.js` 透過伺服器環境變數讀取，不會傳到瀏覽器。`.env`、`.env.local` 與 Vercel 本機資料夾已列入 `.gitignore`。
