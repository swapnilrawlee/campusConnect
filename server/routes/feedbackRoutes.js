const express = require('express');
const router = express.Router();
const connectDB = require('../config/mysqlConfig'); // Import database connection

// Function to execute queries (INSERT, UPDATE, DELETE)
const executeQuery = async (query, params, res, successMessage, extraData = {}) => {
    try {
        const connection = await connectDB;
        const [result] = await connection.execute(query, params);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: successMessage, ...extraData });
        } else {
            return res.status(400).json({ message: "No changes were made." });
        }
    } catch (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

// Function to fetch data (SELECT queries)
const fetchQuery = async (query, params = []) => {
    try {
        const connection = await connectDB;
        const [result] = await connection.execute(query, params);
        return result;
    } catch (err) {
        console.error("Database Fetch Error:", err);
        throw err;
    }
};

// 🚀 **POST Route: Submit Feedback**
router.post('/', async (req, res) => {
    const { title, message, year, name, role } = req.body;
    console.log(req.body);

    if (!title || !message || !role) {
        return res.status(400).json({ error: "All fields are required except year for teachers." });
    }

    // If the role is "teacher", set year to NULL
    const yearValue = role === "teacher" ? null : year;

    const query = `INSERT INTO feedback (title, message, year, name, role) VALUES (?, ?, ?, ?, ?)`;
    const params = [title, message, yearValue, name, role];

    await executeQuery(query, params, res, "Feedback submitted successfully!");
});

// 🚀 **GET Route: Fetch All Feedback**
router.get('/', async (req, res) => {
    console.log(req.body);

    try {
        const feedbacks = await fetchQuery(`SELECT * FROM feedback ORDER BY created_at DESC`);
        res.status(200).json({ feedbacks });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});

// 🚀 **GET Route: Fetch Feedback by Role (Student, Teacher, HOD)**
router.get('/:role', async (req, res) => {
    const { role } = req.params;

    if (!['student', 'teacher', 'hod'].includes(role)) {
        return res.status(400).json({ error: "Invalid role specified." });
    }

    try {
        const feedbacks = await fetchQuery(`SELECT * FROM feedback WHERE role = ? ORDER BY created_at DESC`, [role]);
        res.status(200).json({ feedbacks });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});

// 🚀 **DELETE Route: Delete Feedback by ID**
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Feedback ID is required." });
    }

    try {
        const result = await fetchQuery(`SELECT * FROM feedback WHERE id = ?`, [id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Feedback not found." });
        }

        const query = `DELETE FROM feedback WHERE id = ?`;
        await executeQuery(query, [id], res, "Feedback deleted successfully!");
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});

module.exports = router;
