import React, { useState } from 'react'
import TeacherNavbar from './TeacherNavbar';
import MyCalendar from '../../smallComponents/MyCalendar';
import EventPage from '../../smallComponents/EventPage';

const TeacherEvents = () => {
    const [calendarData, setCalendarData] = useState([]);
  
    return (
      <div className='flex gap-4  w-screen min-h-screen'>
<TeacherNavbar/>   
     <div className='w-[70%]'>
             <div className="mt-9">
            <MyCalendar events={calendarData} onEventChange={setCalendarData} />
          </div>
          <div className='w-full '>
  
          <EventPage/>
          </div>
        </div>
      </div>
    )
}

export default TeacherEvents
