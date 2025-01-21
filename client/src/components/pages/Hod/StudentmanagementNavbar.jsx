import React from 'react'
import { NavLink } from "react-router-dom";

const StudentmanagementNavbar = () => {
  return (
    <nav className=" mt-2 flex gap-4 bg-black justify-center items-center w-full text-white rounded-lg ">
    <NavLink
      className=" p-2  rounded-lg  "
      to={"/admin/student"}
    >
      Create Student Profile
    </NavLink>
    <NavLink
      className=" p-2  rounded-lg "
      to={"/hod/student-management/studentprofile"}
    >
      View Student Profiles
    </NavLink>
    <NavLink
      className=" p-2  rounded-lg "
      to={"/hod/student-management/attendancemanagement"}
    >
      Progress Tracking
    </NavLink>
    <NavLink
      className=" p-2  rounded-lg "
      to={"/hod/student-management/studentqueries"}
    >
     Student Queries
    </NavLink>
  
  </nav>
  )
}

export default StudentmanagementNavbar
