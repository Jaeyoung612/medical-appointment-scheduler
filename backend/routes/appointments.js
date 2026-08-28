const express = require('express');
const db = require('../db');

const router = express.Router();

const ALL_SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30'];

router.get('/dentists/:id/slots', async (req, res) => {
    const dentistId = req.params.id;
    const { date } = req.query;

    try {
    const [[dentist]] = await db.query('SELECT * FROM dentists WHERE id = ?', [dentistId]);
    if (!dentist) {
        return res.status(404).json({ error: 'Dentist not found' });
    }

    const [booked] = await db.query(
        'SELECT appointment_time FROM appointments WHERE dentist_id = ? AND appointment_date = ?',
        [dentistId, date]
    );
    const bookedTimes = booked.map(b => b.appointment_time.slice(0,5));

    const availableSlots = ALL_SLOTS.filter(slot => {
        const isWithinHours = slot >= dentist.available_start.slice(0,5) && slot < dentist.available_end.slice(0,5);
        const isNotBooked = !bookedTimes.includes(slot);
        return isWithinHours && isNotBooked;
    });

    res.json(availableSlots);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;