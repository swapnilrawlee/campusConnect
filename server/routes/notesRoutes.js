const express = require('express');
const multer = require('multer');
const connectDB = require('../config/mysqlConfig');

const router = express.Router();

// 🔹 Multer: Use Memory Storage (Change to `diskStorage()` if needed)
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 30 * 1024 * 1024 } // 10MB max
});

// 🔹 Execute Query (For INSERT, UPDATE, DELETE)
const executeQuery = async (query, params, res, successMessage) => {
    let connection;
    try {
        connection = await connectDB;
        const [result] = await connection.execute(query, params);

        return res.status(200).json({ message: successMessage, affectedRows: result.affectedRows });
    } catch (err) {
        if (connection) connection.release();
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    } 
};

// 🔹 Fetch Query (For SELECT Queries)
const fetchQuery = async (query, params, res) => {
    let connection;
    try {
        connection = await connectDB;
        const [result] = await connection.execute(query, params);
        
        return res.status(200).json(result);
    } catch (err) {
        if (connection) connection.release();
        console.error("Database Fetch Error:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    } 
};

// ✅ Upload Note
router.post('/upload', upload.single('note'), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { employee_id, year, stream } = req.body;
    const filename = req.file.originalname;
    const filedata = req.file.buffer;
    const filetype = req.file.mimetype;

    const sql = `INSERT INTO teacher_notes (employee_id, filename, filedata, filetype, year, stream) VALUES (?, ?, ?, ?, ?, ?)`;
    await executeQuery(sql, [employee_id, filename, filedata, filetype, year, stream], res, "Note uploaded successfully");
});

// ✅ Get Notes by Year & Stream
router.get('/:employee_id/:year/:stream', async (req, res) => {
    const { year, stream, employee_id } = req.params;
    const sql = `SELECT id, filename, filetype FROM teacher_notes WHERE year = ? AND stream = ? AND employee_id = ?`;
    await fetchQuery(sql, [year, stream, employee_id], res);
});

// ✅ Download Note (With Streaming)
router.get('/download/:id', async (req, res) => {
    let connection;
    try {
        connection = await connectDB;
        const sql = `SELECT filename, filedata, filetype FROM teacher_notes WHERE id = ?`;
        const [results] = await connection.execute(sql, [req.params.id]);
       

        if (results.length === 0) return res.status(404).json({ message: 'Note not found' });

        const note = results[0];
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(note.filename)}"`);
        res.setHeader('Content-Type', note.filetype);
        
        // Streaming the file to avoid memory overflow
        res.write(note.filedata);
        res.end();
    } catch (err) {
        
        console.error("Database Fetch Error:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    } 
});

// ✅ Delete Note
router.delete('/delete/:id', async (req, res) => {
    const sql = `DELETE FROM teacher_notes WHERE id = ?`;
    await executeQuery(sql, [req.params.id], res, "Note deleted successfully");
});

module.exports = router;
