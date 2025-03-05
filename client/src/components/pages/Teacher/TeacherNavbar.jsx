import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const TeacherNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const getActiveClass = ({ isActive }) =>
    isActive
      ? "bg-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm text-black"
      : "text-white px-3 py-2 flex items-center gap-2 text-sm";

  return (
    <div className="min-h-screen w-[20%] bg-blue-800 p-6">
      <h1 className="text-sm font-bold mb-6 text-white flex items-center gap-2">
        <i className="ri-school-line text-base"></i> Campus Connect
      </h1>

      <div className="flex flex-col gap-3">
        <NavLink to="/teacher/dashboard" className={getActiveClass}>
          <i className="ri-dashboard-line text-base"></i> Dashboard
        </NavLink>
        <NavLink to="/teacher/class-management" className={getActiveClass}>
          <i className="ri-group-line text-base"></i> Class Management
        </NavLink>
        <NavLink to="/teacher/assignments" className={getActiveClass}>
          <i className="ri-task-line text-base"></i> Assignments
        </NavLink>
        <NavLink to="/teacher/student-monitoring" className={getActiveClass}>
          <i className="ri-user-search-line text-base"></i> Student Monitoring
        </NavLink>
        <NavLink to="/teacher/communication" className={getActiveClass}>
          <i className="ri-chat-3-line text-base"></i> Communication
        </NavLink>
        <NavLink to="/teacher/events" className={getActiveClass}>
          <i className="ri-calendar-event-line text-base"></i> Events
        </NavLink>
        <NavLink to="/teacher/feedback-surveys" className={getActiveClass}>
          <i className="ri-feedback-line text-base"></i> Feedback & Surveys
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

export default TeacherNavbar;
