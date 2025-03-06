import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { UserName } = useParams();
  const [name, setName] = useState("");

  useEffect(() => {
    if (UserName) {
      setName(UserName);
    }
  }, [UserName]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userdetails");
    sessionStorage.removeItem("userName");
    navigate("/hodlogin");
  };

  return (
    <div className="min-h-screen w-[20%] bg-blue-800 p-6">
      <h1 className="text-sm font-bold mb-6 text-white flex items-center gap-2">
        <i className="ri-school-line text-base"></i> Campus Connect
      </h1>
      <div className="flex flex-col gap-3">
        <NavLink
          to={`/hod`}
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-3 py-2 rounded-md flex items-center gap-2 text-sm"
              : "text-white px-3 py-2 flex items-center gap-2 text-sm"
          }
        >
          <i className="ri-dashboard-line text-base"></i> Dashboard
        </NavLink>

        <NavLink
          to="/hod/subject"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-3 py-2 rounded-md flex items-center gap-2 text-sm"
              : "text-white px-3 py-2 flex items-center gap-2 text-sm"
          }
        >
          <i className="ri-book-line text-base"></i> Subject
        </NavLink>

        <NavLink
          to="/hod/student-management"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-3 py-2 rounded-md flex items-center gap-2 text-sm"
              : "text-white px-3 py-2 flex items-center gap-2 text-sm"
          }
        >
          <i className="ri-team-line text-base"></i> Student Management
        </NavLink>

        <NavLink
          to="/hod/teacher-management"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-3 py-2 rounded-md flex items-center gap-2 text-sm"
              : "text-white px-3 py-2 flex items-center gap-2 text-sm"
          }
        >
          <i className="ri-user-star-line text-base"></i> Teacher Management
        </NavLink>

        <NavLink
          to="/hod/feedback"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-3 py-2 rounded-md flex items-center gap-2 text-sm"
              : "text-white px-3 py-2 flex items-center gap-2 text-sm"
          }
        >
          <i className="ri-feedback-line text-base"></i> Feedback
        </NavLink>

        <NavLink
          to="/hod/communication"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-3 py-2 rounded-md flex items-center gap-2 text-sm"
              : "text-white px-3 py-2 flex items-center gap-2 text-sm"
          }
        >
          <i className="ri-chat-3-line text-base"></i> Communication
        </NavLink>

        <NavLink
          to="/hod/events"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-3 py-2 rounded-md flex items-center gap-2 text-sm"
              : "text-white px-3 py-2 flex items-center gap-2 text-sm"
          }
        >
          <i className="ri-calendar-event-line text-base"></i> Events
        </NavLink>

        <NavLink
          to="/hod/timetable-schedule"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-3 py-2 rounded-md flex items-center gap-2 text-sm"
              : "text-white px-3 py-2 flex items-center gap-2 text-sm"
          }
        >
          <i className="ri-time-line text-base"></i> Timetable Schedule
        </NavLink>
      </div>

      <div className="flex mt-8 justify-end">
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg flex items-center gap-2 text-sm"
        >
          <i className="ri-logout-box-line text-base"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
