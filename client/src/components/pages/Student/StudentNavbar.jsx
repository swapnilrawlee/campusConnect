import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const userdetails = JSON.parse(sessionStorage.getItem("userdetails"));
  const navigate = useNavigate();

  // Function to apply active link styling
  const getActiveClass = ({ isActive }) =>
    isActive
      ? "bg-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm text-black"
      : "text-white px-3 py-2 flex items-center gap-2 text-sm";

  // Logout function to clear session storage and redirect to login
  const handleLogout = () => {
    sessionStorage.removeItem("userdetails");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen w-[20%] bg-blue-800 p-6">
      <h1 className="text-sm font-bold mb-6 text-white flex items-center gap-2">
        <i className="ri-school-line text-base"></i> Campus Connect
      </h1>
      <div className="flex flex-col gap-3">
        <NavLink to="/student/dashboard" className={getActiveClass}>
          <i className="ri-dashboard-line text-base"></i> Dashboard
        </NavLink>
        <NavLink to="/student/profile" className={getActiveClass}>
          <i className="ri-user-line text-base"></i> Profile
        </NavLink>
        <NavLink to="/student/assignments" className={getActiveClass}>
          <i className="ri-task-line text-base"></i> Assignments
        </NavLink>
        <NavLink to="/student/deadlines" className={getActiveClass}>
          <i className="ri-time-line text-base"></i> Deadlines
        </NavLink>
        <NavLink to="/student/communication" className={getActiveClass}>
          <i className="ri-chat-3-line text-base"></i> Communication
        </NavLink>
        <NavLink to="/student/events" className={getActiveClass}>
          <i className="ri-calendar-event-line text-base"></i> Events
        </NavLink>
        <NavLink to="/student/courses" className={getActiveClass}>
          <i className="ri-book-line text-base"></i> Courses
        </NavLink>
        <NavLink to="/student/library" className={getActiveClass}>
          <i className="ri-bookmark-line text-base"></i> Library
        </NavLink>
        <NavLink to="/student/feedback" className={getActiveClass}>
          <i className="ri-feedback-line text-base"></i> Feedback
        </NavLink>
      </div>

      <div className="flex mt-6 justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg flex items-center gap-2 text-sm"
        >
          <i className="ri-logout-box-line text-base"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default StudentNavbar;
