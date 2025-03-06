const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connectDB = require('../config/mysqlConfig');

// Function to execute a query that modifies data (INSERT, UPDATE, DELETE)
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

// Function to fetch data from the database (SELECT queries)
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

// Get all attendance records
router.get('/', async (req, res) => {
  const query = `
    SELECT a.AttendanceID, a.RollNumber, sp.FirstName, sp.LastName, a.YearOfStudy, 
           a.CurrentSemester, a.AttendanceDate, a.Status
    FROM attendance a
    JOIN studentprofile sp ON a.RollNumber = sp.RollNumber;
  `;
  try {
    const results = await fetchQuery(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch attendance records", details: err.message });
  }
});

// Mark attendance (Insert record into attendance table)
router.post('/', async (req, res) => {
  const { RollNumber, YearOfStudy, CurrentSemester, AttendanceDate, Status } = req.body;
  const query = `
    INSERT INTO attendance (RollNumber, YearOfStudy, CurrentSemester, AttendanceDate, Status)
    VALUES (?, ?, ?, ?, ?);
  `;
  try {
    await executeQuery(query, [RollNumber, YearOfStudy, CurrentSemester, AttendanceDate, Status], res, 'Attendance marked successfully');
  } catch (err) {
    res.status(500).json({ error: "Failed to mark attendance", details: err.message });
  }
});

module.exports = router;
