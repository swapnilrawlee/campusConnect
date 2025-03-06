const express = require("express");
const router = express.Router();
const connectDB = require("../config/mysqlConfig");

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

// 📌 Fetch Users (Students & Staff)
router.get("/users", async (req, res) => {
    const query = `
       SELECT RollNumber AS ID, FirstName, LastName, YearOfStudy, 'Student' AS Role 
       FROM studentprofile
       UNION ALL
       SELECT employee_id AS ID, first_name AS FirstName, last_name AS LastName, NULL AS YearOfStudy, role 
       FROM staffbasicinfo;
    `;
    try {
        const users = await fetchQuery(query);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 📌 Fetch Messages Between Two Users
router.get("/messages/:user1/:user2", async (req, res) => {
    const { user1, user2 } = req.params;
    const query = `
        SELECT sender_id, receiver_id, message, timestamp, is_read
        FROM messages 
        WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
        ORDER BY timestamp ASC;
    `;
    try {
        const messages = await fetchQuery(query, [user1, user2, user2, user1]);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 📌 Send a Message
router.post("/messages", async (req, res) => {
    const { sender_id, receiver_id, message } = req.body;
    const query = `INSERT INTO messages (sender_id, receiver_id, message, is_read) VALUES (?, ?, ?, 0)`;

    await executeQuery(query, [sender_id, receiver_id, message], res, "Message sent successfully");
});

// 📌 Get Unread Message Count for a User
router.get("/unread/:currentUserId/:senderId", async (req, res) => {
    const { currentUserId, senderId } = req.params;
    
    const query = `
        SELECT COUNT(*) AS count 
        FROM messages 
        WHERE receiver_id = ? AND sender_id = ? AND is_read = 0;
    `;
    
    try {
        const unreadCount = await fetchQuery(query, [currentUserId, senderId]);
        res.json({ count: unreadCount[0].count });
    } catch (error) {
        console.error("Error fetching unread messages:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 📌 Mark Messages as Read
router.post("/read/:currentUserId/:senderId", async (req, res) => {
    const { currentUserId, senderId } = req.params;
    
    const query = `
        UPDATE messages 
        SET is_read = 1 
        WHERE receiver_id = ? AND sender_id = ? AND is_read = 0;
    `;
    
    await executeQuery(query, [currentUserId, senderId], res, "Messages marked as read");
});

module.exports = router;
