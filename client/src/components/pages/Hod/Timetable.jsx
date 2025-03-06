import React from 'react'
import Navbar from './Navbar'
import DailyCalendar from './DailyCalendar'

const Timetable = () => {
  return (
    <div className='flex gap-4  w-screen min-h-screen'>
      <Navbar/>
      <div className='w-[70%]'>
        <DailyCalendar/>
      </div>
    </div>
  )
}

export default Timetable
