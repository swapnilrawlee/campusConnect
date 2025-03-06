import React from 'react'
import { NavLink } from "react-router-dom";

const StudentmanagementNavbar = () => {
  return (
    <nav className=" mt-2 flex flex-col gap-4 justify-center items-center w-full  rounded-lg ">
    <NavLink
      className=" p-2  rounded-lg bg-blue-800 w-1/2 text-white flex justify-center  hover:bg-blue-900  hover:scale-95  "
      to={"/admin/student"}
    >
      Create Student Profile
    </NavLink>
    <NavLink
      className=" p-2  rounded-lg bg-blue-800 w-1/2 text-white flex justify-center  hover:bg-blue-900  hover:scale-95 "
      to={"/hod/student-management/studentprofile"}
    >
      View Student Profiles
    </NavLink>
    <NavLink
      className=" p-2  rounded-lg bg-blue-800 w-1/2 text-white flex justify-center  hover:bg-blue-900  hover:scale-95 "
      to={"/hod/student-management/attendancemanagement"}
    >
      Progress Tracking
    </NavLink>
    <NavLink
      className=" p-2  rounded-lg bg-blue-800 w-1/2 text-white flex justify-center  hover:bg-blue-900  hover:scale-95 "
      to={"/hod/student-management/studentqueries"}
    >
     Student Queries
    </NavLink>
  
  </nav>
  )
}

export default StudentmanagementNavbar
