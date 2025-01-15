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
  console.log(name);
  
  // Handle logout functionality
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userdetails");
    navigate("/hodlogin");
  };

  return (
    <div className="min-h-screen w-[20%] bg-blue-800 p-8">
      <h1 className="text-xl font-bold mb-8 text-white">Campus Connect</h1>
      <div className="flex flex-col gap-4">
        <NavLink
  to={`/hod`} 
  className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-4 py-2 rounded-md block"
              : "text-white px-4 py-2 block"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/hod/student-management"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-4 py-2 rounded-md block"
              : "text-white px-4 py-2 block"
          }
        >
          Student Management
        </NavLink>
        <NavLink
          to="/hod/teacher-management"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-4 py-2 rounded-md block"
              : "text-white px-4 py-2 block"
          }
        >
          Teacher Management
        </NavLink>
        <NavLink
          to="/hod/feedback"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-4 py-2 rounded-md block"
              : "text-white px-4 py-2 block"
          }
        >
          Feedback
        </NavLink>
        <NavLink
          to="/hod/communication"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-4 py-2 rounded-md block"
              : "text-white px-4 py-2 block"
          }
        >
          Communication
        </NavLink>
        <NavLink
          to="/hod/events"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-4 py-2 rounded-md block"
              : "text-white px-4 py-2 block"
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/hod/timetable-schedule"
          className={({ isActive }) =>
            isActive
              ? "text-black bg-white px-4 py-2 rounded-md block"
              : "text-white px-4 py-2 block"
          }
        >
          Timetable Schedule
        </NavLink>
      </div>
      <div className="flex mt-10 justify-end">
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
