const express = require('express');
const router = express.Router();
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

// Get students based on YearOfStudy and stream
router.get('/', async (req, res) => {
    console.log("Fetching student records...");

    const { yearOfStudy, stream } = req.query;
    console.log(
      `Fetching students from YearOfStudy ${yearOfStudy} and stream ${stream}...`
    );

const year = String(yearOfStudy || "").trim();
const streamValue = String(stream || "").trim();
    

    // Validate required parameters
    if (!yearOfStudy || !stream) {
        return res.status(400).json({ error: "yearOfStudy and stream are required parameters" });
    }

    const query = `
        SELECT * FROM studentprofile WHERE yearOfStudy = ? AND stream = ?
    `;

    try {
        const results = await fetchQuery(query, [year, streamValue]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch student records", details: err.message });
    }
});
router.post('/', async (req, res) => {
  console.log("Marking attendance...");

  const { RollNumber, Date, Status, YearOfStudy, Stream } = req.body;

  // Validate request body
  if (!RollNumber || !Date || !Status || !YearOfStudy || !Stream) {
      return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
      INSERT INTO Attendance (RollNumber, Date, Status, YearOfStudy, Stream)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE Status = VALUES(Status);
  `;

  await executeQuery(query, [RollNumber, Date, Status, YearOfStudy, Stream], res, "Attendance marked successfully");
});



module.exports = router;
