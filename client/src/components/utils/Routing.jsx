import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UsernameContext from './CreateContext';
import WelcomePage from '../pages/WelcomePage';
import Login from '../auth/Login';
import HodLogin from '../auth/HodLogin';

const Routing = () => {
    const [username, setUsername] = useState("");
  return (
   //Creating all routes here
   <div>
    <UsernameContext.Provider value={{ username, setUsername }}>

      <Routes>
        <Route path="/welcomepage" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hodlogin" element={<HodLogin />} />
        {/* <Route path="/register" element={<About />} />
        
        <Route path="/admin/login" element={<About />} />
        <Route path="/admin/registerhod" element={<About />} />
        <Route path="/" element={<Home />} /> */}
      </Routes>
    </UsernameContext.Provider>
    </div>
  )
}

export default Routing
