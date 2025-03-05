import React from 'react'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'

const TeacherManagement = () => {
  return (
    <div className='flex gap-4 justify-between w-screen min-h-screen'>
      <Navbar/>
      <nav className="mt-2 flex flex-col gap-4 justify-center items-center w-[70%] rounded-lg">
      <NavLink
        className="p-2 rounded-lg bg-blue-800 w-1/2 text-white flex justify-center hover:bg-blue-900 hover:scale-95"
        to={"/admin/teacher"}
      >
        Create Teacher Profile
      </NavLink>
      <NavLink
        className="p-2 rounded-lg bg-blue-800 w-1/2 text-white flex justify-center hover:bg-blue-900 hover:scale-95"
        to={"/hod/teacher-management/teacherprofile"}
      >
        View Teacher Profiles
      </NavLink>
      <NavLink
        className="p-2 rounded-lg bg-blue-800 w-1/2 text-white flex justify-center hover:bg-blue-900 hover:scale-95"
        to={"/hod/teacher-management/schedule"}
      >
        Manage Schedules
      </NavLink>
      <NavLink
        className="p-2 rounded-lg bg-blue-800 w-1/2 text-white flex justify-center hover:bg-blue-900 hover:scale-95"
        to={"/hod/teacher-management/leave-requests"}
      >
        Leave Requests
      </NavLink>
    </nav>
      </div>
  )
}

export default TeacherManagement
