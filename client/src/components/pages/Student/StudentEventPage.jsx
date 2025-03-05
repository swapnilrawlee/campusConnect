import React from 'react'
import StudentNavbar from './StudentNavbar'
import EventPage from '../../smallComponents/EventPage'

const StudentEventPage = () => {
  return (
    <div className='w-screen min-h-screen  flex gap-4  '>
      <StudentNavbar/>
      <div>
        <EventPage/>
      </div>
    </div>
  )
}

export default StudentEventPage
