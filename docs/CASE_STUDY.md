# Vocab Matcher

### Learn vocabulary through real-life contexts, not endless word lists.

Vocab Matcher 是一款輕巧的情境式單字學習工具。輸入想學的主題與 CEFR 程度，它會產生實用詞彙，並透過預習、配對遊戲與個人學習記憶，讓每一副單字牌組慢慢成為真正屬於你的語言筆記。

[開啟 Live Demo](https://yoga-vocab.vercel.app/)

---

## Screenshots

| Home | Generate Topic | Preview | Matching Game |
| --- | --- | --- | --- |
| ![Vocab Matcher home](assets/screenshots/home.png) | ![Generate a vocabulary topic](assets/screenshots/generate-topic.png) | ![Preview generated vocabulary](assets/screenshots/preview.png) | ![Vocabulary matching game](assets/screenshots/matching-game.png) |

| Vocabulary Memory | Smart Review | Delete Topic | Result |
| --- | --- | --- | --- |
| ![Vocabulary memory](assets/screenshots/vocabulary-memory.png) | ![Smart review queue](assets/screenshots/smart-review.png) | ![Delete a generated topic](assets/screenshots/delete-topic.png) | ![Matching game result](assets/screenshots/result.png) |

---

## Why I Built This

這個專案最初源自兩個很私人的學習目標：準備 **TOPIK II**，以及前往峇里島參加 **Yoga Teacher Training（YTT）**。

我試過不少單字工具，卻常覺得它們太重了。功能很多、資料很多，也有永遠背不完的清單；但我真正需要的，只是一個像筆記本一樣自然的地方，能快速整理眼前生活真正會用到的詞。

於是 Vocab Matcher 慢慢有了現在的樣子：簡單、不需要帳號，可以為餐廳點餐、旅行、運動或任何臨時需求產生主題單字，並且只記住使用者實際遇過與練習過的內容。

> I don't want to build the world's biggest dictionary.  
> I want to build a vocabulary notebook that truly belongs to its owner.

---

## Features

### ✨ AI Topic Generation

輸入語言、生活主題、CEFR 程度與單字數量，即可建立貼近情境的個人牌組。難度主要控制解釋與例句，不會為了程度標籤而犧牲真正重要的領域詞彙。

### Vocabulary Memory

系統會在瀏覽器中記錄實際生成與練習過的單字，包括出現次數、答對、答錯與熟練度。再次生成時，已學內容也能協助 Gemini 優先提供新的詞彙。

### Multi-context Vocabulary

同一個字可能在不同主題裡有不同意思。例如 `love` 在一般英文中是「愛」，在網球裡則是「零分」。Vocab Matcher 只保存使用者真正生成過的 context，遊戲中也只顯示當前牌組對應的意思。

### Favorites

用星號收藏真正想留下的詞。收藏會連同原始 topic 與 meaning 一起保存，因此不會因為同一個字出現在另一個情境，就被換成錯誤的解釋。

### Smart Review

答錯或尚未熟練的單字會進入個人複習佇列。每個 normalized word 最多出現一次，並使用最近一次實際學過的情境，不會憑空補上未生成的意思。

### Delete Topic

臨時旅遊或短期學習主題完成後，可以從裝置上永久刪除。系統只會移除該語言、topic 與程度所組成的 context，其他主題及同一單字的其他意思仍會保留。

### Pronunciation

透過瀏覽器的 Web Speech API 播放單字發音，並依目標語言使用對應 locale。實際聲音與品質會依裝置及瀏覽器而異。

### Matching Game

用簡單的單字與意思配對練習，加上即時回饋、錯題記錄與完成結果，讓短時間複習不再像翻閱一長串清單。

---

## Architecture

```text
Browser
   ↓
Vercel Serverless Function
   ↓
Gemini API
   ↓
Browser localStorage
```

Gemini API key 只由 Vercel Serverless Function 從伺服器環境變數讀取，不會放進前端程式或瀏覽器請求。生成的牌組、收藏與學習紀錄則保存在使用者自己的瀏覽器 `localStorage`；不同使用者不會看到彼此的資料。

目前沒有帳號或雲端同步。清除瀏覽器儲存空間，也可能一併移除學習紀錄。

---

## Tech Stack

- HTML、JavaScript
- Tailwind CSS
- Vercel Serverless Functions
- Google Gen AI SDK (`@google/genai`)
- Gemini API
- Browser `localStorage`
- Web Speech API

---

## Local Development

```bash
git clone <your-repository-url>
cd vocab-matcher
npm install
```

建立 `.env.local`：

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

啟動 Vercel 本機開發環境：

```bash
npx vercel dev
```

請勿使用 `PUBLIC_`、`NEXT_PUBLIC_` 或 `VITE_` 前綴存放 Gemini API key。

---

## Deployment

本專案以 Vercel Serverless Function 提供 `/api/generate`。部署前，請先在 Vercel Project Settings 的 Environment Variables 中設定：

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

完整步驟請參考 [README_DEPLOY.md](./README_DEPLOY.md)。

---

## Roadmap

以下仍是未來規劃，尚未包含在目前版本中：

- 根據使用者回饋持續改善學習流程
- Context-level learning analytics
- 匯出個人學習紀錄
- PWA support
- Offline support
- Cloud sync

---

## Author

### Chia Ning Ho

- UI / UX Design
- AI Product Design
- Front-end Development

Originally built to solve my own language learning needs.

If it also helps someone else enjoy learning a little more, that would make me very happy.

---

## License

See [LICENSE](./LICENSE).
