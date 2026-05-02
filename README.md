# 🧮 計算機大賽 — Calculator Race

60秒計算機挑戰遊戲！使用 CASIO fx50FHII 快問快答，支援多個難度級別。

**線上遊玩：** https://ai-lish.github.io/calculator-race/

---

## 🎮 功能

- ⏱️ **60秒計時挑戰** — 最後10秒紅色閃爍警示
- 🎯 **三個難度** — Easy / Medium / Hard + 混合模式
- 🧮 **使用計算機** — 題目為需使用 CASIO fx50FHII 計算的算式
- ✅ **答對+1，答錯-1** — 計分系統
- 📊 **排行榜** — 分數自動提交到 Google Sheets
- 📱 **響應式設計** — 支援桌面和手機

---

## 🏗️ 架構

```
┌─────────────┐     CSV導出      ┌──────────────────┐
│ Google Sheet │ ───────────────→ │  GitHub Pages     │
│  題目庫+分數 │ ←─讀取分數────── │  index.html       │
│             │ ──提交分數───→  │                  │
└─────────────┘   Apps Script   └──────────────────┘
```

- **前端**：GitHub Pages（純靜態 HTML/CSS/JS）
- **後端**：Google Sheets（題目庫 + 分數記錄）
- **API**：Google Apps Script（讀寫分數）

---

## 🚀 快速開始

### 方式一：直接使用（內置50題示範）

訪問 https://ai-lish.github.io/calculator-race/ 即可遊玩（使用內置示範題目，無需設定）

### 方式二：使用自己的 Google Sheet 題目庫

1. 按照 [docs/SETUP.md](docs/SETUP.md) 建立 Google Sheet 和 Apps Script
2. 修改 `frontend/index.html` 頂部的 `CONFIG` 物件
3. 部署到 GitHub Pages

---

## 📁 目錄結構

```
calculator-race/
├── index.html           # 主遊戲頁面（包含完整代碼）
├── docs/
│   └── SETUP.md         # 詳細設定指南
├── backend/
│   └── apps-script.js   # Google Apps Script 後端代碼
└── README.md
```

---

## 🎯 題目格式

Google Sheet `Questions` 工作表格式：

| id | expression | answer_3sf | answer_exact | difficulty | topics |
|----|-----------|------------|--------------|------------|--------|
| calc-001 | 24/3 | 8 | 8 | Easy | arithmetic |
| calc-021 | sqrt(2) | 1.41 | sqrt(2) | Medium | root |
| calc-041 | pi^2 | 9.87 | pi^2 | Hard | pi |

**支持的算式格式：**
- 基本運算：`+, -, *, /`
- 冪運算：`^`, `**`
- 根號：`sqrt(x)`
- 三角函數：`sin(), cos(), tan(), arctan(), arcsin()`（使用度制）
- 對數：`log10(), ln()`
- 常數：`pi`, `e`
- 科學記數：`1.23e+05`

---

## ⚙️ 設定

詳見 [docs/SETUP.md](docs/SETUP.md)

快速摘要：

```javascript
const CONFIG = {
  SHEET_CSV_URL: 'https://docs.google.com/spreadsheets/d/.../export?format=csv&gid=...',
  SCORE_SUBMIT_URL: 'https://script.google.com/macros/s/.../exec',
  LEADERBOARD_URL: 'https://script.google.com/macros/s/.../exec?action=leaderboard',
};
```

---

## 📝 授權

MIT License — 免費使用於教育目的
