# 🧮 計算機大賽 — Calculator Race

60秒計算機挑戰遊戲！使用 CASIO fx50FHII 快問快答。

**線上遊玩：** https://ai-lish.github.io/calculator-race/

---

## 🎮 遊戲說明

### 玩法
1. 選擇難度：**Easy（97題）** / **Medium（56題）** / **Hard（63題）** / **混合（221題）**
2. 按「開始挑戰」進入 60 秒計時
3. 看到題目，用 **CASIO fx50FHII 計算機** 計算答案
4. 輸入答案後按 **✓ 提交** 或 **Enter**
5. 時間到後顯示最終得分，可提交到排行榜

### 計分規則
| 情況 | 分數 |
|------|------|
| 答啱 | +1 |
| 答錯 | -1 |
| 最低分 | 0 |

### 答案格式
- 所有答案取 **3位有效數字 (3sf)**
- 例：`10.236` → `10.2`，`0.00567` → `0.00567`
- 冪運算：`1234` → `1234`，`1234000` → `1.23e+06`

---

## 📊 題庫統計

| 難度 | 題數 | 說明 |
|------|------|------|
| Easy | 97 | 基本算術、根號、冪 |
| Medium | 56 | 三角函數、對數、π |
| Hard | 63 | 排列組合、統計、複數 |
| **總計** | **221** | |

### 18種題目類型

| 類型 | 範例 | 難度 |
|------|------|------|
| **運算** | `12+8`, `72/9`, `23*17` | Easy |
| **百分比** | `120*0.15`, `8%*1250` | Easy |
| **分數** | `3/8*64`, `7/12*100` | Easy-Medium |
| **冪** | `5^2`, `2.5^3`, `1.5^4` | Easy-Medium |
| **根號** | `sqrt(144)`, `sqrt(2)`, `sqrt(0.02)` | Easy-Medium |
| **括號** | `(8+4)*5`, `((2+3)^3)/5` | Easy-Medium |
| **科學記數** | `3e4*2e2`, `0.005*3.4e4` | Easy-Medium |
| **三角函數** | `sin(30)`, `cos(60)`, `tan(45)` | Medium-Hard |
| **對數** | `log10(1000)`, `ln(e^2)` | Medium-Hard |
| **π/e 常數** | `2*pi`, `pi*3^2`, `e^2` | Medium-Hard |
| **排列 (nPr)** | `5nPr2`, `10nPr3` | Hard |
| **組合 (nCr)** | `5nCr2`, `10nCr3` | Hard |
| **統計** | `mean(2,4,6,8)` | Hard |
| **複數** | `abs(3+4i)` | Hard |
| **反三角** | `arcsin(0.5)`, `arctan(1)` | Hard |
| **進制** | `bin(13)`, `hex(255)` | Hard |
| **二次方程** | `x^2=4` | Medium-Hard |
| **複利息** | `1000*1.05^3` | Hard |

---

## 🧮 CASIO fx50FHII 使用提示

### 基本操作
| 計算 | 按鍵順序 |
|------|----------|
| `sqrt(144)` | `144` `x²` 或 `SHIFT` `x²` |
| `sin(30)` | `30` `sin` |
| `log10(1000)` | `1000` `log` |
| `π` | `SHIFT` `π` |
| `e` | `SHIFT` `e` |

### 常見問題
- **度制確認**：確保計算機設為 **DEG** 模式（顯示 `D`）
- **3sf 答案**：使用 `MODE` `6` (Norm) 切換顯示格式
- **分數顯示**：使用 `SHIFT` `a^b/c` 轉換

---

## ⚙️ 技術架構

### 前端（GitHub Pages）
- 純靜態 HTML/CSS/JS
- KaTeX 渲染數學公式
- CSV 讀取 Google Sheets 題庫
- 無需後端伺服器

### 後端（Google Sheets + Apps Script）
- **題目庫**：Google Sheets（CSV 導出）
- **分數榜**：Google Apps Script Web App
- 支援即時更新題目，無需重新部署

### CSV 格式
```csv
id,expression,answer_3sf,difficulty,topics
E001,12+8,20,Easy,arithmetic
M001,sin(30),0.5,Medium,trig
H001,5nCr2,10,Hard,combination
```

---

## 📁 目錄結構

```
calculator-race/
├── docs/
│   ├── index.html              # 主遊戲頁面
│   ├── SETUP.md               # 詳細設定指南
│   ├── PLANNING.md            # 規劃文件
│   └── data/
│       ├── questions-full.csv   # 完整題庫 (221題)
│       ├── questions-sample.csv # 示範題庫 (50題)
│       └── test-100-cases.csv  # 測試用例 (100題)
├── backend/
│   └── apps-script.js         # Google Apps Script 後端代碼
└── README.md
```

---

## 🔧 設定自定義題庫

### 1. 建立 Google Sheets
1. 建立新 Google Sheets，命名為「計算機大賽題庫」
2. 第一列標題：`id`, `expression`, `answer_3sf`, `difficulty`, `topics`
3. 填入題目資料
4. 分享設定為「知道連結的任何人可檢視」

### 2. 取得 CSV 導出 URL
1. 在 Google Sheets 按 `File` → `Share` → `Publish to web`
2. 選擇 `Entire Document` → `CSV`
3. 複製導出連結
4. 格式：`https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/export?format=csv&gid=[SHEET_ID]`

### 3. 更新遊戲
修改 `docs/index.html` 頂部的 `CONFIG`：
```javascript
const CONFIG = {
  SHEET_CSV_URL: '你的CSV導出URL',
  SCORE_SUBMIT_URL: '',  // 可留空
  LEADERBOARD_URL: '',   // 可留空
};
```

### 4. 部署
```bash
git add -A && git commit -m "Update questions" && git push
```

---

## 📝 授權

免費使用於教育目的。
