# Vocab 交接

工作目錄 `/Users/chianiny/Desktop/codex/yoga-vocab`，基準 `main`。先驗證生成和配對，再修改錯誤處理。原有 [00–05 工作脈絡](../00_AI_START_HERE.md) 保留，其中早期模型和任務描述屬歷史，現況以程式與本目錄的驗證紀錄為準。

## 共用工作流程

1. 開始前從本文指定目錄開啟專案，執行 `pwd`、`git status --short --branch`、`git log -1 --oneline`。先讀 [目前狀態](CURRENT_STATUS.md)，接續前一輪待辦。
2. 同一工作樹同一時間由一個工具修改。已有修改先比對並保存，Git 寫入、跨分支整合及部署依當次授權執行。
3. 使用鎖檔及文件列出的環境變數。密鑰只放本機環境或服務控制台；正式資料寫入需另外確認。
4. 收工時更新本頁的接續事項、[目前狀態](CURRENT_STATUS.md) 的測試證據，以及 [變更紀錄](CHANGELOG.md) 的重要決策。記下分支、提交、未提交檔案和下一步。
5. CC 可從指定目錄啟動，回報 `pwd`、`git status --short --branch` 並摘要本頁首段。這是實際會話的存取驗證。

## 文件索引

- [專案概況](PROJECT_OVERVIEW.md)
- [架構](ARCHITECTURE.md)
- [外部串接](INTEGRATIONS.md)
- [目前狀態](CURRENT_STATUS.md)
- [變更紀錄](CHANGELOG.md)
