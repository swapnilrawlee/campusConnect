const express = require("express");
const connectDB = require("../config/mysqlConfig"); // ✅ Import your existing config
const router = express.Router();

// 🔹 Helper function for executing queries
const executeQuery = async (query, params, res, successMessage, extraData = {}) => {
    try {
        
        const connection = await connectDB; // ✅ Await the resolved database connection
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

// 🔹 Function to fetch data (SELECT queries)
const fetchQuery = async (query, params = []) => {
    try {
        const connection = await connectDB; // ✅ Await the resolved database connection
        const [result] = await connection.execute(query, params);
        return result;
    } catch (err) {
        console.error("Database Fetch Error:", err);
        throw err;
    }
};


// 🔹 Submit a new leave request (Teacher)
router.post("/leave-requests", async (req, res) => {
    
    const { teacher_id, leave_type, start_date, end_date, reason } = req.body;
    const query = "INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, ?, 'pending')";
    await executeQuery(query, [teacher_id, leave_type, start_date, end_date, reason], res, "Leave request submitted successfully.");
});

// 🔹 Get all leave requests (HOD view)
// 🔹 Get all leave requests (HOD view) - Recent First
router.get("/hod/leave-requests", async (req, res) => {
    try {
        const rows = await fetchQuery("SELECT * FROM leave_requests ORDER BY id DESC"); // Sorting by newest first
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ message: "Error fetching leave requests.", error });
    }
});

// 🔹 Get all leave requests for a teacher (sorted by recent first)
router.get("/leave-requests", async (req, res) => {
    const { teacher_id } = req.query;
    if (!teacher_id) {
        return res.status(400).json({ message: "Teacher ID is required." });
    }

    try {
        const rows = await fetchQuery("SELECT * FROM leave_requests WHERE employee_id = ? ORDER BY id DESC", [teacher_id]);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ message: "Error fetching leave requests.", error });
    }
});


// 🔹 Approve or Reject Leave Request (HOD)
router.put("/hod/leave-requests/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status. Use 'approved' or 'rejected'." });
    }

    const query = "UPDATE leave_requests SET status = ? WHERE id = ?";
    await executeQuery(query, [status, id], res, `Leave request ${status}.`);
});

module.exports = router;