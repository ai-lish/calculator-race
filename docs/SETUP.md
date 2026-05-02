# 計算機大賽 — 設定指南

## 架構總覽

```
┌─────────────┐     CSV導出      ┌──────────────────┐
│ Google Sheet │ ───────────────→ │  前端 (GitHub)   │
│  題目庫      │ ←─讀取分數────── │  index.html      │
│  分數記錄    │ ──提交分數───→ │                  │
└─────────────┘   Apps Script   └──────────────────┘
       ↓
  Apps Script Web App
  (部署為可公開訪問)
```

---

## 步驟一：建立 Google Sheet

### 1.1 建立新 Google Sheet

1. 前往 [Google Sheets](https://sheets.google.com) 並登入
2. 建立新空白 spreadsheet
3. 命名為「計算機大賽 - 題目庫」

### 1.2 建立「題目」工作表

**工作表1：命名為 `Questions`**

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| id | expression | answer_3sf | answer_exact | difficulty | topics |
| calc-001 | 24/3 | 8 | 8 | Easy | arithmetic |
| calc-002 | 7+5 | 12 | 12 | Easy | arithmetic |
| calc-021 | sqrt(2) | 1.41 | sqrt(2) | Medium | root |
| calc-041 | pi^2 | 9.87 | pi^2 | Hard | pi |

**欄位說明：**
- `id`: 題目唯一識別碼
- `expression`: 算式（使用標準格式，見下方）
- `answer_3sf`: 3位有效數字答案
- `answer_exact`: 準確值（如有π或根號）
- `difficulty`: Easy / Medium / Hard
- `topics`: 主題標籤（用分號分隔）

**算式格式規範：**
```
加減乘除:  24/3, 7+5, 15-8, 9*6
百分比:    0.75*16, 0.25*240
根號:      sqrt(49), sqrt(2)
冪:        6^2, 2^5, 27^(1/3)
科學記數:  0.2*1000 (= 200)
三角函數:  sin(30), cos(60), tan(45), arctan(1)
對數:      log10(1000), ln(e^2)
常數:      pi, e
```

### 1.3 建立「分數」工作表

**工作表2：命名為 `Scores`**

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Name | Score | Difficulty | TimeTaken | IP |

（此工作表由 Apps Script 自動填寫，無需手動建立）

---

## 步驟二：發布題目 CSV

1. 在 `Questions` 工作表，點擊 **File > Share > Publish to web**
2. 選擇 **Entire Document** > **Comma-separated values (.csv)**
3. 點擊 **Publish**，複製 URL

**CSV 導出 URL 格式：**
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}
```

---

## 步驟三：設定 Apps Script

### 3.1 開啟 Apps Script

1. 在 Google Sheet，點擊 **Extensions > Apps Script**
2. 刪除所有預設代碼
3. 貼上 `backend/apps-script.js` 的內容
4. 點擊 **Save** (💾)

### 3.2 部署 Web App

1. 點擊 **Deploy > New deployment**
2. 選擇類型：**Web app**
3. 設定：
   - **Description**: `Calculator Race API v1`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. 點擊 **Deploy**
5. 複製 **Web app URL**

### 3.3 複製 URL

Web app URL 格式：
```
https://script.google.com/macros/s/{SCRIPT_ID}/exec
```

---

## 步驟四：設定前端

### 4.1 編輯 `frontend/index.html`

在文件頂部找到 `CONFIG` 物件，填入你的值：

```javascript
const CONFIG = {
  // Google Sheet CSV 導出 URL（題目庫）
  SHEET_CSV_URL: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=YOUR_GID',

  // Google Apps Script Web App URL（提交分數）
  SCORE_SUBMIT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',

  // Google Apps Script Web App URL（讀取排行榜）
  LEADERBOARD_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=leaderboard',
};
```

### 4.2 部署到 GitHub Pages

1. 在 GitHub 建立新 repo：`calculator-race`
2. 上傳 `index.html`（和 `data/questions-sample.csv` 如需）
3. 前往 **Settings > Pages**
4. Source: `Deploy from a branch` > `main` > `/ (root)`
5. 等待部署完成，訪問 `https://yourusername.github.io/calculator-race/`

---

## 測試

### 測試本地

```bash
# macOS
open /Users/zachli/calculator-race/frontend/index.html

# 或用 Python 伺服器
cd /Users/zachli/calculator-race/frontend
python3 -m http.server 8080
# 訪問 http://localhost:8080
```

### 測試提交分數

```bash
curl -X POST "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" \
  -d "name=測試用戶" \
  -d "score=25" \
  -d "difficulty=Easy" \
  -d "timeTaken=55"
```

### 測試讀取排行榜

```bash
curl "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=leaderboard"
```

---

## 常見問題

**Q: 題目庫有幾多題？**
A: 建議至少50題，遊戲會隨機抽取。

**Q: 可以自訂時間嗎？**
A: 可以，在 `index.html` 修改 `GAME_DURATION = 60;`（秒）。

**Q: 為什麼分數提交後排行榜沒有更新？**
A: 檢查瀏覽器 Console 有沒有錯誤；確認 Apps Script 已正確部署為「Anyone」。

**Q: Google Sheet 可以設為私有嗎？**
A: 可以，只要 CSV 導出設為「Anyone with the link」即可公開讀取。Apps Script 分數提交無需 Sheet 公開。
