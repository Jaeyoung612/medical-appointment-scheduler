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

router.post('/appointments', async (req, res) => {
    const { patient_id, dentist_id, appointment_date, appointment_time, appointment_type, reason } = req.body;

    if (!patient_id || !dentist_id || !appointment_date || !appointment_time || !appointment_type) {
    return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
    const [existing] = await db.query(
        'SELECT id FROM appointments WHERE dentist_id = ? AND appointment_date = ? AND appointment_time = ?',
        [dentist_id, appointment_date, appointment_time]
    );
    if (existing.length > 0) {
        return res.status(409).json({ error: 'This slot is already booked' });
    }

    const [result] = await db.query(
        'INSERT INTO appointments (patient_id, dentist_id, appointment_date, appointment_time, appointment_type, reason) VALUES (?, ?, ?, ?, ?, ?)',
        [patient_id, dentist_id, appointment_date, appointment_time, appointment_type, reason || null]
    );

    res.status(201).json({ id: result.insertId, message: 'Appointment created' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

router.get('/appointments/mine/:patientId', async (req, res) => {
    const { patientId } = req.params;

    try {
    const [rows] = await db.query(
        `SELECT a.id, a.appointment_date, a.appointment_time, a.appointment_type, a.reason, a.status, d.name AS dentist_name
        FROM appointments a
        JOIN dentists d ON a.dentist_id = d.id
        WHERE a.patient_id = ?
        ORDER BY a.appointment_date, a.appointment_time`,
        [patientId]
    );

    const upcoming = rows.filter(r => r.status === 'confirmed');
    const past = rows.filter(r => r.status !== 'confirmed');

    res.json({ upcoming, past });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

router.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;

    try {
    const [result] = await db.query('DELETE FROM appointments WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment cancelled' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

router.get('/appointments', async (req, res) => {
    try {
    const [rows] = await db.query(
        `SELECT a.id, a.appointment_date, a.appointment_time, a.appointment_type, a.reason, a.status,
                d.name AS dentist_name, u.name AS patient_name
        FROM appointments a
        JOIN dentists d ON a.dentist_id = d.id
        JOIN users u ON a.patient_id = u.id
        ORDER BY a.appointment_date, a.appointment_time`
    );

    res.json(rows);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

module.exports = router;