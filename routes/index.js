const express = require('express');
const router = express.Router();
const db = require('../db');

// 取得所有愛文芒果價格（按日期排序）
router.get('/avomango', (req, res) => {
  db.all('SELECT * FROM MangoPrice WHERE name = ? ORDER BY date', ['愛文芒果'], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 搜尋指定日期區間（只比對年月）
router.get('/avomango/search', (req, res) => {
  let { start, end } = req.query;
  if (!start || !end) return res.status(400).json({ error: '請提供 start 和 end 日期' });

  // 只取年月，格式 YYYY-MM
  start = start.slice(0, 7);
  end = end.slice(0, 7);

  const sql = `
    SELECT * FROM MangoPrice
    WHERE name = ? AND substr(date,1,7) BETWEEN ? AND ?
    ORDER BY date
  `;
  db.all(sql, ['愛文芒果', start, end], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 新增或更新單日資料
router.post('/avomango', (req, res) => {
  const { date, name, price } = req.body;
  if (!date || !name || price === undefined) {
    return res.status(400).json({ error: '請提供完整 date, name, price 資料' });
  }
  const sql = `
    INSERT OR REPLACE INTO MangoPrice (date, name, price)
    VALUES (?, ?, ?)
  `;
  db.run(sql, [date, name, price], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '資料已新增/更新', changes: this.changes });
  });
});

module.exports = router;
