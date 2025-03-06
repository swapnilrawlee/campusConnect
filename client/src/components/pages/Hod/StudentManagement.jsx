import React from "react";
import Navbar from "./Navbar";
import StudentmanagementNavbar from "./StudentmanagementNavbar";

const StudentManagement = () => {
  return (
    <div className="flex gap-4  w-screen min-h-screen">
      <Navbar />
      <div className="w-[70%] flex justify-center items-center">
       <StudentmanagementNavbar/>
      </div>
    </div>
  );
};

export default StudentManagement;
