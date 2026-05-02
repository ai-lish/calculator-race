# 🧮 計算機大賽 — Planning

**最後更新：** 2026-05-02  
**狀態：** 進行中

---

## 📋 項目概覽

**計算機大賽**係一個60秒計時數學挑戰遊戲，玩家使用 CASIO fx50FHII 計算機答題。

**目標用戶：** 香港中學生  
**核心功能：** 快問快答、排行榜、難度分類

---

## 🔬 Research 發現

### MiniMax Web Search 結果

#### 1. 類似遊戲參考

| 項目 | GitHub | 特色 |
|------|--------|------|
| MathRush (divid3d) | github.com/divid3d/MathRush | 答對維持、答錯結束（5秒/題） |
| MathRush (vhogberg) | github.com/vhogberg/mathrush | 60秒HTML5數學遊戲 |
| Sixty Second Sweep | github.com/jgordon510/60SecondSweep | Phaser + 分數儲存 |
| MATH-SPRINT-GAME | github.com/Amey-Thakur/MATH-SPRINT-GAME | 60秒計時 + 速度/準確度 |

#### 2. UI/UX 設計趨勢

| 風格 | 特點 | 適合程度 |
|------|------|----------|
| **Glassmorphism** | 半透明、毛玻璃效果、深色背景 | ⭐⭐⭐⭐⭐ 2025-2026主流 |
| **Neumorphism** | 柔和陰影、立體按鈕 | ⭐⭐⭐ 適合計算機 |
| **Dark Theme** | 深色背景 + 霓虹強調色 | ⭐⭐⭐⭐⭐ 遊戲標配 |
| **Futuristic HUD** | 發光計時器、旋轉環 | ⭐⭐⭐ 10秒警示 |

#### 3. 計時器 UI 最佳實踐

- Tailwind CSS countdown timer (pagedone.io)
- 10秒警示：Futuristic HUD 動畫（橙/紅發光 + 脈動動畫）
- 進度條由右至左縮減，最後10秒變紅色

#### 4. 即時反饋 UX

| 做法 | 效果 |
|------|------|
| 正確：綠色閃爍 + `✓` | 立即正向確認 |
| 錯誤：紅色震動 + 顯示正確答案 | 學習導向 |
| 輸入框變色（綠/紅） | 簡潔明瞭 |

#### 5. Google Apps Script 排行榜

- **官方文檔**: developers.google.com/apps-script/guides/web — doGet/doPost 模式
- **最佳實踐**: 與現有 `backend/apps-script.js` 架構一致

---

## ✅ 待辦事項

### P0 — 必須完成

- [ ] **3sf 答案修正** — 6題需要修正答案至3位有效數字
  - calc-028: 3.2^2 = 10.24（錯誤: 10.2）
  - calc-037: π×3² = 28.3（錯誤: 28.27）
  - calc-038: (4/3)×π×2³ = 33.5（錯誤: 33.51）
  - calc-045: 5.5^(3/2) = 12.9（錯誤: 12.92）
  - calc-047: 2^10/3 = 341（錯誤: 341.3）
  - calc-049: 123456^(1/3) = 49.8（錯誤: 49.83）

- [ ] **前端代入3sf比較邏輯** — 確保所有答案比較使用3位有效數字

### P1 — 重要功能

- [ ] **Glassmorphism UI 改進**
  - 排行榜卡片加 `backdrop-filter: blur(10px)` + 半透明背景
  - 遊戲容器加玻璃效果

- [ ] **Futuristic 計時器**
  - 最後10秒加發光動畫
  - 考慮加旋轉環或數字跳動效果

- [ ] **按鈕 Hover 效果**
  - 加 `transform: translateY(-2px)` + `box-shadow`

- [ ] **排行榜 URL 分享** — 特定難度排行榜可直接分享

### P2 — 改進功能

- [ ] **題目類型圖標** — 顯示題目類型（根號、三角函數等）
- [ ] **音效反饋** — 正確/錯誤音效（可選）
- [ ] **統計面板** — 顯示個人歷史記錄

- [ ] **Dark Mode 切換** — 深色/淺色主題

### P3 — 未來功能

- [ ] **多人對戰** — 同一時間多人同時答題
- [ ] **每日挑戰** — 每天新題目
- [ ] **成就系統** — 達成特定成就解鎖徽章

---

## 🏗️ 技術架構

```
┌─────────────┐     CSV導出      ┌──────────────────┐
│ Google Sheet │ ───────────────→ │  GitHub Pages     │
│  題目庫+分數 │ ←─讀取分數────── │  index.html       │
│             │ ──提交分數───→  │                  │
└─────────────┘   Apps Script   └──────────────────┘
```

### 前端 (docs/index.html)
- 純靜態 HTML/CSS/JS
- KaTeX 渲染數學公式
- localStorage 本地備份
- Google Sheets CSV 讀取題目

### 後端 (backend/apps-script.js)
- Google Apps Script Web App
- doGet / doPost 處理分數
- Google Sheets 儲存分數

---

## 📐 3位有效數字（3sf）標準

### 規則
1. **大於100的數**：四捨五入至小數點前1位
   - 例：1330 → 1330，10000 → 10000

2. **10-100的數**：四捨五入至小數點後2位
   - 例：28.27 → 28.3，10.24 → 10.2

3. **1-10的數**：四捨五入至小數點後3位
   - 例：1.414 → 1.41，9.425 → 9.43

4. **小於1的數**：四捨五入至小數點後3位
   - 例：0.1414 → 0.141

5. **整數**：保持原樣
   - 例：8, 12, 36, 341

### 容許誤差
- 比較答案時使用 **2% 容許誤差**
- 考慮計算機顯示位數差異

---

## 📁 目錄結構

```
calculator-race/
├── docs/
│   ├── index.html              # 主遊戲頁面
│   ├── data/
│   │   └── questions-sample.csv  # 50題示範題目
│   ├── SETUP.md               # 設定指南
│   └── PLANNING.md            # 本文件
├── backend/
│   └── apps-script.js         # Google Apps Script 後端
└── README.md
```

---

## 🔗 連結

- **遊戲**：https://ai-lish.github.io/calculator-race/
- **GitHub Repo**：https://github.com/ai-lish/calculator-race
- **題目 CSV**：docs/data/questions-sample.csv

---

## 📅 里程碑

### v1.0.0 ✅ 已完成
- 基礎遊戲功能（60秒計時、計分）
- 三個難度分類（Easy/Medium/Hard）
- 排行榜（localStorage + Apps Script）
- 示範題目50題

### v1.1.0 🔄 下一版本
- 3sf 答案修正
- Glassmorphism UI 改進
- 計時器動畫加強

### v2.0.0 📋 未來
- 多人在線對戰
- 每日挑戰
- 成就系統
