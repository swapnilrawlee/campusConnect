import React from 'react'
import TeacherNavbar from './TeacherNavbar'
import Communication from '../../smallComponents/Communications'

const TeacherCommunication = () => {
  return (
    <div className='flex w-screen min-h-screen'>
      <TeacherNavbar/>
      <div className='w-[70%] m-auto'>
        <Communication/>
      </div>
    </div>
  )
}

export default TeacherCommunication
