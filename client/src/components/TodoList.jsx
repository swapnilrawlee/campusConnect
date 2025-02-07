import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import axiosInstance from "./utils/axiosInstance";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("green");
  const [userName, setUserName] = useState("User");
  const [id, setId] = useState("");

  // Decode JWT Token
  const decodeToken = (token) => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid Token", error);
      return null;
    }
  };

  // Fetch Tasks
  useEffect(() => {
    if (!id) return; // Prevent unnecessary API calls
    const gettingTask = async () => {
      try {
        const response = await axiosInstance.get(`/task/${id}`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    gettingTask();
  }, [id]); // Runs only when `id` changes

  // Set User Data from Token
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const decodedData = decodeToken(token);
    if (decodedData) {
      setUserName(decodedData.name);
      setId(decodedData.id);
    }
  }, []); // Runs once on mount

  // Add Task Handler
  const handleTaskChange = async (updatedTask) => {
    try {
      const response = await axiosInstance.post("/task", {
        task: updatedTask,
        id,
      });
      if (response.status === 200) {
        setTasks((prevTasks) => [...prevTasks, updatedTask]); // Append new task
        setNewTask("");
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleTask = () => {
    if (newTask.trim()) {
      const taskObject = { text: newTask, priority, completed: false };
      handleTaskChange(taskObject);
    }
  };

  // Handle Task Deletion
  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/task/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId)); // Remove task from state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle Task Completion Toggle
  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axiosInstance.put(`/task/${taskId}/completion`, {
        completed: updatedStatus,
      });
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: updatedStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  return (
    <div className="border rounded shadow-xl shadow-black p-4">
      <h1 className="text-xl font-extrabold font-serif mt-6">
        {userName}'s To-Do List
      </h1>
      <div className="flex gap-3 mt-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="outline rounded px-2"
          placeholder="Add a new task"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="outline rounded px-2"
        >
          <option value="green">Low</option>
          <option value="blue">Medium</option>
          <option value="red">High</option>
        </select>
        <button
          className="bg-[#0B930B] text-white p-2 rounded-lg"
          onClick={handleTask}
        >
          Add Task
        </button>
      </div>

      <ul className="mt-4 overflow-x-auto max-h-[25vh] flex flex-col gap-6 justify-center mb-4 ">
        {tasks.map((taskItem) => (
          <li
            key={taskItem.id}
            className={`flex justify-between items-center p-2 rounded-lg   ${
              taskItem.completed ? "bg-gray-100" : "bg-gray-100"
            }`}
          >
           <div className="flex  gap-4 capitalize items-center w-full mb-4">
            <span className="text-black">
              {taskItem.priority === "blue" ? "🔵" : ""}
              {taskItem.priority === "red" ? "🔴" : ""}
              {taskItem.priority === "green" ? "🟢" : ""}
            </span>
            <span
    className={`text-black capitalize ${
      taskItem.completed ? "line-through  decoration-2 text-gray-500" : ""
    }`}
  >
    {taskItem.task_text}
  </span>           </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleTaskCompletion(taskItem.id, taskItem.completed)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                {taskItem.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDelete(taskItem.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
