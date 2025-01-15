import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const StudentNavbar = () => {
  const userdetails = JSON.parse(sessionStorage.getItem('userdetails'));
  const navigate = useNavigate();
  

  // Function to apply active link styling
  const getActiveClass = ({ isActive }) => (isActive ? 'bg-white p-2 rounded-lg' : 'text-white');

  // Logout function to clear session storage and redirect to login
  const handleLogout = () => {
    sessionStorage.removeItem('userdetails');
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="flex flex-col w-[20%] min-h-screen bg-blue-600 p-4">
      <div className="flex justify-between flex-col gap-10 items-center">
        <div className="text-white font-bold text-lg">CampusConnect</div>
        <div className="flex flex-col text-sm items-center gap-4">
          <NavLink
            to={`/student/${userdetails.FirstName}`}
            className={getActiveClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/profile"
            className={getActiveClass}
          >
            Profile
          </NavLink>
          <NavLink
            to="/assignments"
            className={getActiveClass}
          >
            Assignments
          </NavLink>
          <NavLink
            to="/courses"
            className={getActiveClass}
          >
            Courses
          </NavLink>
          <NavLink
            to="/library"
            className={getActiveClass}
          >
            Library
          </NavLink>
          <NavLink
            to="/feedback"
            className={getActiveClass}
          >
            Feedback
          </NavLink>
          <NavLink
            to="/dashboard"
            className={getActiveClass}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/class-schedules"
            className={getActiveClass}
          >
            Class Schedules
          </NavLink>
          <NavLink
            to="/assignment-tracker"
            className={getActiveClass}
          >
            Assignment Tracker
          </NavLink>
          <NavLink
            to="/resources"
            className={getActiveClass}
          >
            Resources
          </NavLink>
          <NavLink
            to="/communication"
            className={getActiveClass}
          >
            Communication
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 p-2 rounded-lg mt-4"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
