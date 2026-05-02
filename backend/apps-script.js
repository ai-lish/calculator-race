/**
 * Calculator Race — Google Apps Script Backend
 * 
 * 用途：
 * 1. 讀取分數排行榜 (GET ?action=leaderboard)
 * 2. 提交分數 (POST)
 * 
 * 部署方法：
 * 1. 開啟 Google Sheet
 * 2. Extensions > Apps Script
 * 3. 貼上此代碼
 * 4. 儲存後，Deploy > New deployment > Web app
 * 5. 設定：Execute as: Me / Access: Anyone
 * 6. 複製 Web app URL 到前端 CONFIG.SCORE_SUBMIT_URL 和 CONFIG.LEADERBOARD_URL
 */

// ============================================================
// 設定
// ============================================================
const SHEET_NAME = 'Scores'; // 分數記錄工作表名稱

// ============================================================
// 取得分數工作表
// ============================================================
function getScoreSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // 設定標題行
    sheet.getRange(1, 1, 1, 6).setValues([[
      'Timestamp', 'Name', 'Score', 'Difficulty', 'TimeTaken', 'IP'
    ]]);
    sheet.getRange(1, 1, 1, 6)
      .setFontWeight('bold')
      .setBackground('#f5c518')
      .setFontColor('#1a1a2e');
    sheet.deleteColumns(7, sheet.getMaxColumns() - 6);
  }
  return sheet;
}

// ============================================================
// 提交分數 (POST)
// ============================================================
function doPost(e) {
  try {
    const sheet = getScoreSheet();
    
    const timestamp = new Date().toISOString();
    const name = e.parameter.name || '匿名';
    const score = parseInt(e.parameter.score) || 0;
    const difficulty = e.parameter.difficulty || 'Easy';
    const timeTaken = parseInt(e.parameter.timeTaken) || 60;
    const ip = e.parameter.ip || '';
    
    // 清理名字（防止XSS）
    const cleanName = String(name)
      .replace(/[<>]/g, '')
      .substring(0, 20);
    
    sheet.appendRow([timestamp, cleanName, score, difficulty, timeTaken, ip]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// 讀取排行榜 (GET)
// ============================================================
function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'leaderboard') {
    return getLeaderboard(e);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getLeaderboard(e) {
  try {
    const sheet = getScoreSheet();
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ Easy: [], Medium: [], Hard: [], Mixed: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
    
    // 按難度分組，每個難度取前3名
    const byDiff = { Easy: [], Medium: [], Hard: [], Mixed: [] };
    
    data.forEach(row => {
      const [timestamp, name, score, difficulty] = row;
      if (!name || isNaN(score)) return;
      const diff = ['Easy', 'Medium', 'Hard', 'Mixed'].includes(difficulty) 
        ? difficulty : 'Mixed';
      byDiff[diff].push({
        name: String(name),
        score: parseInt(score),
        timestamp: String(timestamp),
      });
    });
    
    // 每個難度取前三名
    Object.keys(byDiff).forEach(diff => {
      byDiff[diff] = byDiff[diff]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    });
    
    return ContentService
      .createTextOutput(JSON.stringify(byDiff))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
// 測試用：手動插入示範分數
// ============================================================
function insertDemoScores() {
  const sheet = getScoreSheet();
  const demo = [
    ['2026-04-01T10:00:00.000Z', '張小明', 25, 'Easy', 58],
    ['2026-04-01T10:05:00.000Z', '李小華', 23, 'Easy', 60],
    ['2026-04-01T10:10:00.000Z', '王小明', 20, 'Easy', 60],
    ['2026-04-02T14:00:00.000Z', '陳大同', 18, 'Medium', 59],
    ['2026-04-02T14:10:00.000Z', '林美美', 16, 'Medium', 60],
    ['2026-04-03T09:00:00.000Z', '黃大偉', 15, 'Hard', 60],
    ['2026-04-03T09:05:00.000Z', '周小傑', 14, 'Hard', 58],
  ];
  demo.forEach(row => sheet.appendRow(row));
}
