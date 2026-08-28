const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;