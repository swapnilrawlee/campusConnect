import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UsernameContext from './CreateContext';
import WelcomePage from '../pages/WelcomePage';
import Login from '../auth/Login';
import HodLogin from '../auth/HodLogin';
import AdminLogin from '../auth/AdminLogin';
import RegisterHOD from '../auth/RegisterHOD';
import Rolepanel from '../pages/Rolepanel';

import StudentRegisterPage1 from '../auth/StudentRegisterPage1';
import StudentRegisterPage2 from '../auth/StudentRegisterPage2';
import HodRegisterPage1 from '../auth/HodRegisterPage1';
import HodRegisterPage2 from '../auth/HodRegisterPage2';

const Routing = () => {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
  return (
   //Creating all routes here
   <div>
    <UsernameContext.Provider value={{ username, setUsername }}>

      <Routes>
        <Route path="/welcomepage" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hodlogin" element={<HodLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<RegisterHOD />} />
        <Route path="/admin" element={<Rolepanel />} />
        <Route path="/admin/staff" element={<HodRegisterPage1 />} />
        <Route path="/admin/hodregisterpage2" element={<HodRegisterPage2 />} />
        <Route path="/admin/student" element={<StudentRegisterPage1 />} />
        <Route path="/admin/Studentregisterpage2" element={<StudentRegisterPage2 />} />

      </Routes>

   


    </UsernameContext.Provider>
    </div>
  )
}

export default Routing
