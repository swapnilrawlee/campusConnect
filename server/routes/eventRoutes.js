const express = require("express");
const router = express.Router();
const connectDB = require("../config/mysqlConfig");

// Function to execute a query that modifies data (INSERT, UPDATE, DELETE)
const executeQuery = async (query, params, res, successMessage, extraData = {}) => {
    try {
        const connection = await connectDB;
        const [result] = await connection.execute(query, params);
      console.log(result);
      
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

// 📌 Fetch All Events
router.get("/", async (req, res) => {
    try {
        const events = await fetchQuery("SELECT * FROM events");
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch events", details: err.message });
    }
});

// 📌 Add New Event
router.post("/", async (req, res) => {
  console.log(req.body);
  
    const { title, event_date, type } = req.body;
    if (!title || !event_date || !type) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const query = "INSERT INTO events (title, event_date, type) VALUES (?, ?, ?)";
    await executeQuery(query, [title, event_date, type], res, "Event added successfully");
});

// 📌 Delete an Event
router.delete("/:id", async (req, res) => {
  console.log(req.params);
  
    const { id } = req.params;
    const query = "DELETE FROM events WHERE id = ?";
    await executeQuery(query, [id], res, "Event deleted successfully");
});

module.exports = router;
