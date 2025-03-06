import React, { useState } from "react";
import TeacherNavbar from "./TeacherNavbar"; // Ensure the correct import path
import TodoList from "../../smallComponents/TodoList";

const TeacherHomepage = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  return (
    <div className="flex w-screen min-h-screen">
      <TeacherNavbar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to Teacher Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your classes, assignments, and communication efficiently.</p>
        
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Quick insights into your teaching activities.</p>
          <ul className="mt-4 list-disc pl-5 text-gray-700">
            <li>Upcoming Classes</li>
            <li>Pending Assignments</li>
            <li>Recent Communications</li>
            <li>Feedback Summary</li>
          </ul>
        </div>
<TodoList/>
      
      </div>
    </div>
  );
};

export default TeacherHomepage;