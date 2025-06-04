const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, 'avomango.db');

if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

const db = new sqlite3.Database(dbPath, err => {
    if (err) console.error('無法開啟資料庫:', err.message);
    else console.log('資料庫已開啟:', dbPath);
});

const initSQL = `
CREATE TABLE IF NOT EXISTS MangoPrice (
  date TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL
);
`;

const data = [
    { date: '2015-06', name: '愛文芒果', price: 45.67 },
    { date: '2015-07', name: '愛文芒果', price: 29.64 },
    { date: '2015-08', name: '愛文芒果', price: 46.11 },
    { date: '2016-04', name: '愛文芒果', price: 96.67 },
    { date: '2016-05', name: '愛文芒果', price: 107.5 },
    { date: '2016-06', name: '愛文芒果', price: 105.68 },
    { date: '2016-07', name: '愛文芒果', price: 95.9 },
    { date: '2016-08', name: '愛文芒果', price: 95.11 },
    { date: '2017-06', name: '愛文芒果', price: 62.68 },
    { date: '2017-07', name: '愛文芒果', price: 47.7 },
    { date: '2018-06', name: '愛文芒果', price: 52.85 },
    { date: '2018-07', name: '愛文芒果', price: 46.38 },
    { date: '2019-05', name: '愛文芒果', price: 63.46 },
    { date: '2019-06', name: '愛文芒果', price: 47.09 },
    { date: '2019-07', name: '愛文芒果', price: 38.05 },
    { date: '2020-05', name: '愛文芒果', price: 49.92 },
    { date: '2020-06', name: '愛文芒果', price: 41.29 },
    { date: '2020-07', name: '愛文芒果', price: 41.44 },
    { date: '2021-04', name: '愛文芒果', price: 100.83 },
    { date: '2021-05', name: '愛文芒果', price: 84.81 },
    { date: '2021-06', name: '愛文芒果', price: 39.93 },
    { date: '2021-07', name: '愛文芒果', price: 43.67 },
    { date: '2022-04', name: '愛文芒果', price: 75.33 },
    { date: '2022-05', name: '愛文芒果', price: 84.85 },
    { date: '2022-06', name: '愛文芒果', price: 81.15 },
    { date: '2022-07', name: '愛文芒果', price: 77.86 },
    { date: '2023-04', name: '愛文芒果', price: 101 },
    { date: '2023-05', name: '愛文芒果', price: 86.23 },
    { date: '2023-06', name: '愛文芒果', price: 47.52 },
    { date: '2023-07', name: '愛文芒果', price: 39.34 },
    { date: '2024-04', name: '愛文芒果', price: 113.33 },
    { date: '2024-05', name: '愛文芒果', price: 87.47 },
    { date: '2024-06', name: '愛文芒果', price: 57.32 },
    { date: '2024-07', name: '愛文芒果', price: 66.28 },
    { date: '2025-04', name: '愛文芒果', price: 86.33 }

];

db.serialize(() => {
    db.run(initSQL, err => {
        if (err) {
            console.error('建立 MangoPrice 表格錯誤:', err.message);
        } else {
            const insertSQL = `
        INSERT OR REPLACE INTO MangoPrice (date, name, price) VALUES (?, ?, ?)`;
            const stmt = db.prepare(insertSQL);
            data.forEach(({ date, name, price }) => {
                stmt.run(date, name, price, err => {
                    if (err) console.error('插入資料錯誤:', err.message);
                });
            });
            stmt.finalize();
            console.log('愛文芒果價格資料已插入');
        }
    });
});

module.exports = db;
