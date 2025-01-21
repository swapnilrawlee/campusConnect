import React from 'react'
import Navbar from './Navbar'
import EventForm from './EventForm'

const Events = () => {
  return (
    <div className='flex gap-4  w-screen min-h-screen'>
      <Navbar/>
      <div>
        <EventForm/>

      </div>
    </div>
  )
}

export default Events
