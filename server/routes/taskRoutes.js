const express = require("express");
const Router = express.Router();
const connectDB = require("../config/mysqlConfig");

// Helper function to execute SELECT queries
const fetchQuery = async (query, params = []) => {
  const connection = await connectDB;
  const [result] = await connection.execute(query, params);
  return result;
};

// Helper function to execute INSERT/UPDATE/DELETE queries
const executeQuery = async (
  query,
  params,
  res,
  successMessage,
  extraData = {}
) => {
  const connection = await connectDB;
  try {
    const [result] = await connection.execute(query, params);

    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({
          message: successMessage,
          ...extraData,
          resultId: result.insertId,
        });
    } else {
      return res.status(400).json({ message: "Failed to insert record." });
    }
  } catch (err) {
    console.error("Database Error: ", err);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
};

// Create a new task
Router.post("/", async (req, res) => {
  const { task, id } = req.body;

  if (!task || !task.text) {
    return res.status(400).json({ error: "Task text is required" });
  }

  const query =
    "INSERT INTO tasks (task_text, priority, completed, user_id) VALUES (?, ?, ?, ?)";
  const result = await executeQuery(
    query,
    [task.text, task.priority, task.completed, id],
    res,
    "Task created successfully",
    {
      task: {
        text: task.text,
        priority: task.priority,
        completed: task.completed,
      },
    }
  );

  return result;
});

// Update task completion status
Router.put("/:taskId/completion", async (req, res) => {
  const { taskId } = req.params;
  const { completed } = req.body;

  if (completed === undefined) {
    return res.status(400).json({ error: "Completion status is required" });
  }

  const query = "UPDATE tasks SET completed = ? WHERE id = ?";
  const result = await executeQuery(
    query,
    [completed, taskId],
    res,
    "Task completion updated successfully"
  );

  return result;
});

// Delete task by taskId
// Backend DELETE route for task deletion
Router.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;

  const query = "DELETE FROM tasks WHERE id = ?";
  const result = await executeQuery(
    query,
    [taskId],
    res,
    "Task deleted successfully"
  );
  

  return result;
});
// Backend: Get all tasks for the user
Router.get("/:id", async (req, res) => {

  const { id } = req.params;
  const query = "SELECT * FROM tasks WHERE user_id = ?";
  const tasks = await fetchQuery(query, [id]);

  

  return res.status(200).json({ tasks });
});

module.exports = Router;
