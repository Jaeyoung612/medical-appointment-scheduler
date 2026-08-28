const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/dentists', async (req, res) => {
    try {
    const [rows] = await db.query('SELECT * FROM dentists');
    res.json(rows);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;