import React from 'react'
import Communications from '../../smallComponents/Communications'
import Navbar from './Navbar'

const Communication = () => {
  return (
    <div className='flex '>
      <Navbar/>
      <div className='w-[70%] mx-auto'>
      <Communications/>
      </div>
    </div>
  )
}

export default Communication
