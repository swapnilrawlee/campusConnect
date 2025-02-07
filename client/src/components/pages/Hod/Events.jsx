import React, { useState } from 'react'
import Navbar from './Navbar'
import MyCalendar from '../../MyCalendar'
import EventPage from '../../EventPage'

const Events = () => {
    const [calendarData, setCalendarData] = useState([]);
  
  return (
    <div className='flex gap-4  w-screen min-h-screen'>
      <Navbar/>
      <div className='w-[80%]'>
           {/* Calendar */}
           <div className="mt-9">
          <MyCalendar events={calendarData} onEventChange={setCalendarData} />
        </div>
        <EventPage/>
      </div>
    </div>
  )
}

export default Events
