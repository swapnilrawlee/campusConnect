import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const TeacherNavbar = () => {
    const navigate = useNavigate();
    const handleLogout =()=>{
        sessionStorage.removeItem('token');
        navigate('/login')
    }
  return (
    <nav className="bg-[#DC851F] w-[20%] p-8 flex flex-col gap-10 ">
      <h1 className="text-3xl text-center font-bold mb-2 text-white">Campus Connect</h1>
      <NavLink
        to="/teacher/dashboard"
        className={({ isActive }) =>
          isActive
            ? "bg-white text-black p-4 rounded-lg "
            : "bg-black text-white p-4 rounded-lg "
        }
      >
        Teacher Dashboard
      </NavLink>
      <NavLink
        to="/teacher/class-management"
        className={({ isActive }) =>
          isActive
            ? "bg-white text-black p-4 rounded-lg "
            : "bg-black text-white p-4 rounded-lg "
        }
      >
        Class Management
      </NavLink>
      <NavLink
        to="/teacher/assignments"
        className={({ isActive }) =>
          isActive
            ? "bg-white text-black p-4 rounded-lg "
            : "bg-black text-white p-4 rounded-lg "
        }
      >
        Assignments
      </NavLink>
      <NavLink
        to="/teacher/student-monitoring"
        className={({ isActive }) =>
          isActive
            ? "bg-white text-black p-4 rounded-lg "
            : "bg-black text-white p-4 rounded-lg "
        }
      >
        Student Monitoring
      </NavLink>
      <NavLink
        to="/teacher/communication"
        className={({ isActive }) =>
          isActive
            ? "bg-white text-black p-4 rounded-lg "
            : "bg-black text-white p-4 rounded-lg "
        }
      >
        Communication
      </NavLink>
      <NavLink
        to="/teacher/feedback-surveys"
        className={({ isActive }) =>
          isActive
            ? "bg-white text-black p-4 rounded-lg "
            : "bg-black text-white p-4 rounded-lg "
        }
      >
        Feedback & Surveys
      </NavLink>
      <div className=" flex justify-end">

      <button onClick={handleLogout} className="bg-[#d62828] p-2 rounded-lg  w-1/2 text-white ">
        logout
      </button>
      </div>
    </nav>
  );
};

export default TeacherNavbar;
