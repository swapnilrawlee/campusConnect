import React, { useState, useEffect } from "react";
import TeacherNavbar from "./TeacherNavbar";
import TodoList from "../../smallComponents/TodoList";
import axiosInstance from "../../utils/axiosInstance";

const TeacherHomepage = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [teacher, setteacher] = useState("");
  console.log(teacher);
  
  
  useEffect(() => {
    // Retrieve teacher name from session storage
    const getteacher = () => {
      const token = sessionStorage.getItem("token"); // Adjust based on where the token is stored
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
          setteacher(payload.name || "Teacher");
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    getteacher();

    // Fetch the timetable
    const fetchTimetable = async () => {
      try {
        const response = await axiosInstance.get("/timetable",{
          params: {  teacher :teacher },
        });
        setTimetable(response.data);
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };

    fetchTimetable();
  }, []);

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
        <h1 className="text-2xl font-bold">Welcome, {teacher}</h1>
        <p className="text-gray-600 mt-2">
          Manage your classes, assignments, and communication efficiently.
        </p>

        {/* Dashboard Overview */}
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

        {/* Timetable */}
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Timetable</h2>
          <p className="text-gray-500 mt-1">Your scheduled classes.</p>
          <div className="overflow-x-auto">
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Day</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Classroom</th>
                </tr>
              </thead>
              <tbody>
                {timetable.length > 0 ? (
                  timetable.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="border p-2">{item.day}</td>
                      <td className="border p-2">{item.time}</td>
                      <td className="border p-2">{item.subject}</td>
                      <td className="border p-2">{item.classroom}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border p-2 text-center text-gray-500">
                      No timetable available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Todo List */}
        <TodoList />
      </div>
    </div>
  );
};

export default TeacherHomepage;
