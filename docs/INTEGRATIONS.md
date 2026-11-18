# Vocab 外部串接

| 服務 | 用途及狀態 |
|---|---|
| Vercel | [公開首頁](https://yoga-vocab.vercel.app/) 實測 200；正式部署提交、自動部署和帳號權限待查 |
| Gemini | `api/generate.js` 讀取伺服器端 `GEMINI_API_KEY`，目前指定 `gemini-3.6-flash`。本機使用受忽略的 `.env.local`，正式值從 Vercel 環境管理。模型、金鑰與配額尚未實測 |
| Web Speech API | 瀏覽器語音合成，語音可用性依裝置；待實機測試 |
| GitHub | [yoga-vocab](https://github.com/chianingho/yoga-vocab) 遠端 refs 已讀取；寫入權限待驗 |

歷史文件中的模型與任務描述以當時版本為準。 [程式入口](../api/generate.js) · [環境範本](../.env.example)
