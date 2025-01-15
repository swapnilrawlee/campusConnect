import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import userDetailsContext from "./CreateContext";
import WelcomePage from "../pages/WelcomePage";
import Login from "../auth/Login";
import HodLogin from "../auth/HodLogin";
import AdminLogin from "../auth/AdminLogin";
import RegisterHOD from "../auth/RegisterHOD";
import Rolepanel from "../pages/Rolepanel";

import StudentRegisterPage1 from "../auth/StudentRegisterPage1";
import StudentRegisterPage2 from "../auth/StudentRegisterPage2";
import HodRegisterPage1 from "../auth/HodRegisterPage1";
import HodRegisterPage2 from "../auth/HodRegisterPage2";
import StudentHomepage from "../pages/Student/StudentHomepage";
import TeacherHomepage from "../pages/Teacher/TeacherHomepage.jsx";
import HodHomepage from "../pages/Hod/HodHomepage.jsx";
import StudentManagement from "../pages/Hod/StudentManagement.jsx";
import TeacherManagement from "../pages/Hod/TeacherManagement.jsx";
import Feedback from "../pages/Hod/Feedback.jsx";
import Events from "../pages/Hod/Events.jsx";
import Timetable from "../pages/Hod/Timetable.jsx";

const Routing = () => {
  return (
    <div>
        <Routing />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcomepage" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hodlogin" element={<HodLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<RegisterHOD />} />
          <Route path="/admin" element={<Rolepanel />} />
          <Route path="/admin/staff" element={<HodRegisterPage1 />} />
          <Route
            path="/admin/hodregisterpage2"
            element={<HodRegisterPage2 />}
          />
          <Route path="/admin/student" element={<StudentRegisterPage1 />} />
          <Route
            path="/admin/Studentregisterpage2"
            element={<StudentRegisterPage2 />}
          />
          <Route path="/student/:UserName" element={<StudentHomepage />} />
          <Route path="/teacher/:employeeID" element={<TeacherHomepage />} />
          <Route path="/hod" element={<HodHomepage />} />
          <Route
            path="/hod/student-management"
            element={<StudentManagement />}
          />
          <Route
            path="/hod/teacher-management"
            element={<TeacherManagement />}
          />
          <Route path="/hod/feedback" element={<Feedback />} />
          <Route path="/hod/communication" element={<Feedback />} />
          <Route path="/hod/events" element={<Events />} />
          <Route path="/hod/timetable-schedule" element={<Timetable />} />
        </Routes>
    </div>
  );
};

export default Routing;
