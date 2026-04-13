const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

/* ============================
   GET - listar transações
============================ */
app.get('/transactions', (req, res) => {
  db.all(
    'SELECT * FROM transactions ORDER BY favorite DESC, date DESC, id DESC',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const normalizedRows = rows.map((row) => ({
        ...row,
        favorite: Boolean(row.favorite),
        notes: row.notes || '',
        tags: (() => {
          try {
            return JSON.parse(row.tags || '[]');
          } catch {
            return [];
          }
        })(),
        paymentMethod: row.paymentMethod || 'cash',
        cardName: row.cardName || '',
      }));

      res.json(normalizedRows);
    }
  );
});

/* ============================
   POST - criar transação
============================ */
app.post('/transactions', (req, res) => {
  const {
    title,
    amount,
    type,
    category,
    date,
    notes = '',
    favorite = false,
    tags = [],
    paymentMethod = 'cash',
    cardName = '',
  } = req.body;

  if (!title || !amount || !type || !category || !date) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  if (paymentMethod === 'credit' && !cardName.trim()) {
    return res
      .status(400)
      .json({ error: 'Informe o nome do cartão para gastos no crédito' });
  }

  const normalizedTags = Array.from(
    new Set(
      (tags || [])
        .map((tag) => String(tag).trim().replace(/^#+/, ''))
        .filter(Boolean)
    )
  );

  const finalTags =
    paymentMethod === 'credit' && !normalizedTags.includes('cartao')
      ? [...normalizedTags, 'cartao']
      : normalizedTags;

  const sql = `
    INSERT INTO transactions (
      title, amount, type, category, date, notes, favorite, tags, paymentMethod, cardName
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      title,
      amount,
      type,
      category,
      date,
      notes,
      favorite ? 1 : 0,
      JSON.stringify(finalTags),
      paymentMethod,
      paymentMethod === 'credit' ? cardName.trim() : '',
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ id: this.lastID });
    }
  );
});

/* ============================
   PUT - atualizar transação
============================ */
app.put('/transactions/:id', (req, res) => {
  const {
    title,
    amount,
    type,
    category,
    date,
    notes = '',
    favorite = false,
    tags = [],
    paymentMethod = 'cash',
    cardName = '',
  } = req.body;

  const { id } = req.params;

  if (paymentMethod === 'credit' && !cardName.trim()) {
    return res
      .status(400)
      .json({ error: 'Informe o nome do cartão para gastos no crédito' });
  }

  const normalizedTags = Array.from(
    new Set(
      (tags || [])
        .map((tag) => String(tag).trim().replace(/^#+/, ''))
        .filter(Boolean)
    )
  );

  const finalTags =
    paymentMethod === 'credit' && !normalizedTags.includes('cartao')
      ? [...normalizedTags, 'cartao']
      : normalizedTags.filter((tag) => tag !== 'cartao' || paymentMethod === 'credit');

  const sql = `
    UPDATE transactions
    SET
      title = ?,
      amount = ?,
      type = ?,
      category = ?,
      date = ?,
      notes = ?,
      favorite = ?,
      tags = ?,
      paymentMethod = ?,
      cardName = ?
    WHERE id = ?
  `;

  db.run(
    sql,
    [
      title,
      amount,
      type,
      category,
      date,
      notes,
      favorite ? 1 : 0,
      JSON.stringify(finalTags),
      paymentMethod,
      paymentMethod === 'credit' ? cardName.trim() : '',
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ updated: this.changes });
    }
  );
});

/* ============================
   PATCH - favoritar/desfavoritar
============================ */
app.patch('/transactions/:id/favorite', (req, res) => {
  const { id } = req.params;

  db.get('SELECT favorite FROM transactions WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    const newFavorite = row.favorite ? 0 : 1;

    db.run(
      'UPDATE transactions SET favorite = ? WHERE id = ?',
      [newFavorite, id],
      function (updateErr) {
        if (updateErr) {
          return res.status(500).json({ error: updateErr.message });
        }

        res.json({
          updated: this.changes,
          favorite: Boolean(newFavorite),
        });
      }
    );
  });
});

/* ============================
   DELETE
============================ */
app.delete('/transactions/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ deleted: this.changes });
  });
});

/* ============================
   SERVER
============================ */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server rodando em http://localhost:${PORT}`);
});