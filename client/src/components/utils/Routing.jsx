import React from "react";
import { Route, Routes } from "react-router-dom";

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
import StudentProfile from "../pages/Student/StudentProfile.jsx";
import StudentAssignments from "../pages/Student/StudentAssignments.jsx";
import StudentCourses from "../pages/Student/StudentCourses.jsx";
import StudentLibrary from "../pages/Student/StudentLibrary.jsx";
import StudentFeedback from "../pages/Student/StudentFeedback.jsx";
import StudentClassSchedules from "../pages/Student/StudentClassSchedules.jsx";
import StudentAssignmentTracker from "../pages/Student/StudentAssignmentTracker.jsx";
import StudentResources from "../pages/Student/StudentResources.jsx";
import StudentCommunication from "../pages/Student/StudentCommunication.jsx";

import TeacherHomepage from "../pages/Teacher/TeacherHomepage";
import TeacherClassmanagement from "../pages/Teacher/TeacherClassmanagement.jsx";
import TeacherAssignments from "../pages/Teacher/TeacherAssignments.jsx";
import TeacherStudentMonitoring from "../pages/Teacher/TeacherStudentMonitoring.jsx";
import TeacherCommunication from "../pages/Teacher/TeacherCommunication.jsx";
import TeacherFeedbackSurveys from "../pages/Teacher/TeacherFeedbackSurveys.jsx";

import HodHomepage from "../pages/Hod/HodHomepage";
import CreateSubject from "../pages/Hod/CreateSubject.jsx";
import ShowSubject from "../pages/Hod/ShowSubject.jsx";
import StudentManagement from "../pages/Hod/StudentManagement";
import TeacherManagement from "../pages/Hod/TeacherManagement";
import Feedback from "../pages/Hod/Feedback";
import Events from "../pages/Hod/Events";
import Timetable from "../pages/Hod/Timetable";

import NotFound from "../NotFound";
import Studentprofile from "../pages/Hod/Studentprofile.jsx";
import SubjectPage from "../pages/Hod/SubjectPage.jsx";
import Communication from "../pages/Hod/Communication.jsx";

const Routing = () => {
  return (
    <div>
      <Routes>
        {/* General Routes */}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcomePage" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<RegisterHOD />} />
        <Route path="/admin" element={<Rolepanel />} />
        <Route path="/admin/staff" element={<HodRegisterPage1 />} />
        <Route path="/admin/hodregisterpage2" element={<HodRegisterPage2 />} />
        <Route path="/admin/student" element={<StudentRegisterPage1 />} />
        <Route
          path="/admin/studentregisterpage2"
          element={<StudentRegisterPage2 />}
        />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentHomepage />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/library" element={<StudentLibrary />} />
        <Route path="/student/feedback" element={<StudentFeedback />} />
        <Route path="/student/class-schedules" element={<StudentClassSchedules />} />
        <Route path="/student/assignment-tracker" element={<StudentAssignmentTracker />} />.jsx
        <Route path="/student/communication" element={<StudentCommunication />} />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<TeacherHomepage />} />
        <Route path="/teacher/studentresources" element={<StudentResources />} />
        <Route path="/teacher/class-management" element={<TeacherClassmanagement />} />
        <Route path="/teacher/assignments" element={<TeacherAssignments />} />
        <Route path="/teacher/student-monitoring" element={<TeacherStudentMonitoring />} />
        <Route path="/teacher/communication" element={<TeacherCommunication />} />
        <Route path="/teacher/feedback-surveys" element={<TeacherFeedbackSurveys />} />

        {/* HOD Routes */}
        <Route path="/hodlogin" element={<HodLogin />} />
        <Route path="/hod/communication" element={<Communication />} />
        <Route path="/hod" element={<HodHomepage />} />
        <Route path="/hod/subject" element={<SubjectPage />} />
        <Route path="/hod/subject/showsubject" element={<ShowSubject />} />
        <Route path="/hod/subject/createsubject" element={<CreateSubject />} />
        <Route path="/hod/student-management/studentprofile" element={<Studentprofile />} />
        <Route path="/hod/student-management" element={<StudentManagement />} />
        <Route path="/hod/teacher-management" element={<TeacherManagement />} />
        <Route path="/hod/feedback" element={<Feedback />} />
        <Route path="/hod/events" element={<Events />} />
        <Route path="/hod/timetable-schedule" element={<Timetable />} />
      </Routes>
    </div>
  );
};

export default Routing;
