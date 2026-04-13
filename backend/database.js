const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      notes TEXT DEFAULT '',
      favorite INTEGER DEFAULT 0,
      tags TEXT DEFAULT '[]',
      paymentMethod TEXT DEFAULT 'cash',
      cardName TEXT DEFAULT ''
    )
  `);

  db.all(`PRAGMA table_info(transactions)`, [], (err, columns) => {
    if (err) {
      console.error('Erro ao verificar colunas da tabela:', err.message);
      return;
    }

    const columnNames = columns.map((col) => col.name);

    if (!columnNames.includes('notes')) {
      db.run(
        `ALTER TABLE transactions ADD COLUMN notes TEXT DEFAULT ''`,
        (alterErr) => {
          if (alterErr) {
            console.error('Erro ao adicionar coluna notes:', alterErr.message);
          }
        }
      );
    }

    if (!columnNames.includes('favorite')) {
      db.run(
        `ALTER TABLE transactions ADD COLUMN favorite INTEGER DEFAULT 0`,
        (alterErr) => {
          if (alterErr) {
            console.error(
              'Erro ao adicionar coluna favorite:',
              alterErr.message
            );
          }
        }
      );
    }

    if (!columnNames.includes('tags')) {
      db.run(
        `ALTER TABLE transactions ADD COLUMN tags TEXT DEFAULT '[]'`,
        (alterErr) => {
          if (alterErr) {
            console.error('Erro ao adicionar coluna tags:', alterErr.message);
          }
        }
      );
    }

    if (!columnNames.includes('paymentMethod')) {
      db.run(
        `ALTER TABLE transactions ADD COLUMN paymentMethod TEXT DEFAULT 'cash'`,
        (alterErr) => {
          if (alterErr) {
            console.error(
              'Erro ao adicionar coluna paymentMethod:',
              alterErr.message
            );
          }
        }
      );
    }

    if (!columnNames.includes('cardName')) {
      db.run(
        `ALTER TABLE transactions ADD COLUMN cardName TEXT DEFAULT ''`,
        (alterErr) => {
          if (alterErr) {
            console.error(
              'Erro ao adicionar coluna cardName:',
              alterErr.message
            );
          }
        }
      );
    }
  });
});

module.exports = db;