import React from 'react'
import StudentNavbar from './StudentNavbar'
import Communication from "../../smallComponents/Communications"

const StudentCommunication = () => {
  return (
    <div className='w-screen min-h-screen  flex gap-4  '>
   <StudentNavbar/>
   <div className='w-[75%] '>

   <Communication/>
   </div>
    </div>
  )
}

export default StudentCommunication
