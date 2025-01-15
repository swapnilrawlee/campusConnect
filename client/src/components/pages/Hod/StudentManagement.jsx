import React from 'react'
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'

const StudentManagement = () => {
  return (
    <div className='flex gap-4  w-screen min-h-screen'>
      <Navbar/>
      <div>
       <nav className='mt-2'>
          <NavLink className='bg-blue-200 p-2  rounded-lg' to={'/admin/student'}>
          Create Student Profile
          </NavLink>       
       </nav>
      </div>
    </div>
  )
}

export default StudentManagement
