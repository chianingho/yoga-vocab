# 公主的使用說明

## 這一包是什麼？

這是一包給 Codex 閱讀的專案規格。

你不一定要先學會 VS Code，也不需要把內容逐段貼進 Codex。

你只要把這些檔案和目前的 `index.html` 放在同一個桌面資料夾。

---

## 資料夾應該長這樣

```text
Vocab_Matcher_Codex/
├── 00_AI_START_HERE.md
├── 01_PROJECT_CONTEXT.md
├── 02_ARCHITECTURE.md
├── 03_DECISIONS.md
├── 04_TASKS.md
├── 05_CODE_GUIDELINES.md
├── README_FOR_USER_中文.md
└── index.html
```

這個資料夾就是「根目錄」。

根目錄沒有神祕功能，它只是代表：

> Codex 現在工作的最外層資料夾。

Codex 從這裡啟動，就能看到這一層裡的所有檔案，以及之後建立的 `api/` 等子資料夾。

---

## 你要做的步驟

### 1. 解壓縮下載的 ZIP

把整包解壓縮到桌面。

### 2. 把你的 `index.html` 放進去

確定它和 `00_AI_START_HERE.md` 在同一層。

### 3. 用終端機進入資料夾

最簡單的方法：

1. 開啟 Terminal。
2. 輸入 `cd` 加一個空格。
3. 把桌面的資料夾拖進 Terminal 視窗。
4. 按 Enter。

看起來會類似：

```bash
cd ~/Desktop/Vocab_Matcher_Codex
```

### 4. 啟動 Codex

```bash
codex
```

### 5. 貼上下面這段指令

```text
Read every required file in this folder in the exact order defined by 00_AI_START_HERE.md.

Then inspect index.html completely.

Before editing, report the current architecture, exact vocabulary data shape, functions controlling the data flow, and the files you plan to create or modify.

After that, implement the recommended v1 decisions without asking me to choose them again.

Use Gemini model gemini-2.5-flash. Keep the API key server-side. Preserve the existing UI, static vocabulary modules, matching logic, pronunciation, favorites, wrong-answer flow, and responsive behavior.

Do not push to GitHub or deploy until I explicitly authorize it.
```

---

## Codex 完成第一版後

先不要立刻讓它推上 GitHub。

請它先提供：

- 修改了哪些檔案；
- 測試結果；
- 本機怎麼測；
- Vercel 要設定什麼；
- 有沒有仍需你決定的地方。

確認第一版正常後，再把完成的整個資料夾上傳或推送到 GitHub。

---

## 目前已替你決定的項目

第一版已選擇：

- 保留單一 `index.html`；
- 不改成 React；
- 使用 JavaScript Vercel Serverless Function；
- 使用 `gemini-2.5-flash`；
- API Key 只放 Vercel 環境變數；
- 生成上限 50 個字；
- 翻譯固定繁體中文；
- 生成結果沿用既有資料格式；
- 首頁增加 AI Generate 入口；
- 保留原本三個靜態題庫；
- 最新 AI 題庫存在 localStorage；
- 第一版不做登入與資料庫。

這些都寫進 `03_DECISIONS.md`，Codex 不需要再重複問你。

---

## 仍然由你之後決定的事項

第一版測試完成後才需要選：

1. 是否正式推送到原本的 GitHub repository。
2. 是否把目前 GitHub Pages 網址改成 Vercel 網址。
3. 是否保留舊的 GitHub Pages 版本作為備份。
4. 第二版是否加入多組 AI 題庫歷史紀錄。

這些現在都不阻礙第一版開發。
