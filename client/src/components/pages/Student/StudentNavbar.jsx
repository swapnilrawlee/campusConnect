import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const userdetails = JSON.parse(sessionStorage.getItem("userdetails"));
  const navigate = useNavigate();

  // Function to apply active link styling
  const getActiveClass = ({ isActive }) =>
    isActive ? "bg-white p-2 rounded-lg w-1/2" : "text-white";

  // Logout function to clear session storage and redirect to login
  const handleLogout = () => {
    sessionStorage.removeItem("userdetails");
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="flex flex-col w-[20%] min-h-screen bg-blue-600 p-4">
      <div className="flex  flex-col gap-10 ">
        <div className="text-white font-bold text-lg">CampusConnect</div>
        <div className="flex flex-col text-xl p-5   gap-5">
          <NavLink to="/student/dashboard" className={getActiveClass}>
            Dashboard
          </NavLink>
          <NavLink to="/student/profile" className={getActiveClass}>
            Profile
          </NavLink>
          <NavLink to="/student/assignments" className={getActiveClass}>
            Assignments
          </NavLink>
          <NavLink to="/student/courses" className={getActiveClass}>
            Courses
          </NavLink>
          <NavLink to="/student/library" className={getActiveClass}>
            Library
          </NavLink>
          <NavLink to="/student/feedback" className={getActiveClass}>
            Feedback
          </NavLink>

          <NavLink to="/student/class-schedules" className={getActiveClass}>
            Class Schedules
          </NavLink>
          <NavLink to="/student/assignment-tracker" className={getActiveClass}>
            Assignment Tracker
          </NavLink>
          <NavLink to="/student/resources" className={getActiveClass}>
            Resources
          </NavLink>
          <NavLink to="/student/communication" className={getActiveClass}>
            Communication
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 p-4 rounded-lg mt-4  "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
