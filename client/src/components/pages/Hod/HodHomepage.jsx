import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MyCalendar from "../../MyCalendar";
import useAxiosFetch from "../../CustomHook/useAxiosFetch";
import userDetailsContext from "../../utils/CreateContext";

const HodHomepage = () => {
  const location = useLocation();
  const {userDetails} = useContext(userDetailsContext);
  console.log(userDetails);
  

  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("green");
  const [calendarData, setCalendarData] = useState([]);

  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
  } = useAxiosFetch("/students/studentCount");

  const {
    data: staffData,
    loading: staffLoading,
    error: staffError,
  } = useAxiosFetch("/staff/staffCount");

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);

  useEffect(() => {
    if (studentData) setTotalStudents(studentData.data.totalStudents);
    if (staffData) setTotalStaff(staffData.data.totalStaff);
  }, [studentData, staffData]);

  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
  const greeting =
    hours < 12
      ? "Good Morning"
      : hours < 18
      ? "Good Afternoon"
      : hours < 21
      ? "Good Evening"
      : "Good Night";

  // Load tasks and calendar data from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedCalendarData =
      JSON.parse(localStorage.getItem("calendarData")) || [];
    setTask(storedTasks);
    setCalendarData(storedCalendarData);
  }, []);

  // Sync tasks and calendar data to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }, [calendarData]);

  // Handle adding tasks
  const handleTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [
        ...task,
        { text: newTask, priority, completed: false },
      ];
      setTask(updatedTasks);
      setNewTask("");
    }
  };

  // Handle deleting a task
  const handleDelete = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
  };

  // Handle toggling task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = task.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTask(updatedTasks);
  };

  return (
    <div className='flex gap-4  w-screen min-h-screen'>
      <Navbar />
      <div className="min-h-screen p-10 w-[80%] flex-col flex gap-4">
        <div className="bg-[#511A1A] w-[80%] text-white rounded-lg p-5">
          <h1 className="text-2xl">
            Welcome, {userDetails?.first_name}! {greeting}
          </h1>
          <p>{formattedTime}</p>
        </div>

        <div className="flex w-full gap-4 mx-auto">
          {/* Overview Panel */}
          <div className="border border-black w-[30%] p-4 min-h-[40%] flex flex-col gap-6 shadow-md shadow-black">
            <h1 className="text-xl font-extrabold font-serif">Overview Panel</h1>
            {studentLoading || staffLoading ? (
              <p>Loading...</p>
            ) : studentError || staffError ? (
              <p>Error loading data.</p>
            ) : (
              <>
                <p className="font-semibold">Active Students: {totalStudents || 0}</p>
                <p className="font-semibold">Active Teachers: {totalStaff || 0}</p>
                <p className="font-semibold">Ongoing Classes: 4</p>
                <p className="font-semibold">Upcoming Deadlines: 2 approvals pending</p>
              </>
            )}
          </div>

          {/* Quick Action */}
          <div className="border border-black w-[30%] p-4 min-h-[40%] flex flex-col gap-6 shadow-md shadow-black">
            <h1 className="text-xl font-extrabold font-serif">Quick Action</h1>
            <button className="bg-[#0B930B] text-start p-2 rounded-lg text-white">
              Approve Pending Leave Requests
            </button>
            <button className="bg-[#CD5E03] text-start p-2 rounded-lg text-white">
              Announce Urgent Updates
            </button>
          </div>

          {/* Notifications */}
          <div className="border border-black w-[30%] p-4 min-h-[40%] flex flex-col gap-6 shadow-md shadow-black">
            <h1 className="text-xl font-extrabold font-serif">Notifications</h1>
            <p className="bg-[#2B419C] p-2 rounded-xl text-white">
              Recent Update: New class schedule uploaded.
            </p>
            <p className="bg-[#9B0B25] p-2 rounded-xl text-white">
              Alert: Teacher John Doe is absent today.
            </p>
            <p className="bg-[#CD5E03] p-2 rounded-xl text-white">
              Reminder: Faculty meeting on 15th Jan at 3 PM.
            </p>
          </div>
        </div>

        {/* To-Do List */}
        <div className="rounded p-4 flex justify-between">
          <div className="border rounded shadow-xl shadow-black p-4">
            <h1 className="text-xl font-extrabold font-serif mt-6">To-Do List</h1>
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
                className="bg-[#0B930B] text-start p-2 rounded-lg text-white"
                onClick={handleTask}
              >
                Add Task
              </button>
            </div>
            <ul className="mt-4 max-h-[30vh] pl-5 overflow-y-scroll">
              {task.map((item, index) => (
                <li
                  key={index}
                  className={`text-lg capitalize border-b-2 p-2 justify-between flex items-center gap-4 ${
                    item.completed ? "line-through" : ""
                  }`}
                  style={{
                    color:
                      item.priority === "red"
                        ? "red"
                        : item.priority === "blue"
                        ? "blue"
                        : "green",
                  }}
                >
                    <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTaskCompletion(index)}
                  />
                  {item.text}
                
                  <button
                    className={`bg-[#9B0B25] text-white px-2 py-1 rounded-lg ${
                      item.completed ? "line-through" : ""
                    }` }
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-9">
          <MyCalendar
            events={calendarData}
            onEventChange={(newEvents) => setCalendarData(newEvents)}
          />
        </div>
      </div>
    </div>
  );
};

export default HodHomepage;
