import React from 'react'
import TeacherNavbar from './TeacherNavbar'
import AttendancePage from './AttendancePage'

const TeacherClassmanagement = () => {
  return (
    <div className='flex w-screen min-h-screen'>
      <TeacherNavbar/>
      <div>
        <AttendancePage/>
      </div>
    </div>
  )
}

export default TeacherClassmanagement
