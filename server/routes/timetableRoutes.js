const express = require("express");
const connectDB = require("../config/mysqlConfig");
const router = express.Router();

// 🔹 Helper Function to Execute Queries (INSERT, UPDATE, DELETE)
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

// 🔹 Function to Fetch Data (SELECT Queries)
const fetchQuery = async (query, params = []) => {
    try {
        const connection = await connectDB;
        const [result] = await connection.execute(query, params);
        console.log(result);
        
        return result;
    } catch (err) {
        console.error("Database Fetch Error:", err);
        throw err;
    }
};

// ✅ Get filtered timetable data
router.get("/", async (req, res) => {
    try {
        console.log(req.query.teacher);
        const { teacher, year } = req.query;
        

        let sql = "SELECT * FROM timetable";
        let params = [];

        if (teacher) {
            sql += " WHERE teacher = ?";
            params.push(teacher);
        } else if (year) {
            sql += " WHERE year = ?";
            params.push(year);
        }

        const events = await fetchQuery(sql, params);
        res.json({ data: events });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Add a new event
router.post("/", async (req, res) => {
    const { department, year, section, time, description, subject, teacher } = req.body;

    if (!department || !year || !time || !description || !subject || !teacher) {
        return res.status(400).json({ error: "All fields except section are required." });
    }

    const sql = "INSERT INTO timetable (department, year, section, time, description, subject, teacher) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [department, year, section || null, time, description, subject, teacher];

    await executeQuery(sql, values, res, "Event added successfully!");
});

// ✅ Delete an event by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM timetable WHERE id = ?";

    await executeQuery(sql, [id], res, "Event deleted successfully!");
});

module.exports = router;
