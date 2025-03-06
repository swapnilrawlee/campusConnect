import React from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

const SubjectPage = () => {
  return (
    <div className="flex gap-4  w-screen min-h-screen">
      <Navbar />
      <div className="w-[70%] flex flex-col justify-center items-center  gap-6 ">
        <h1 className="text-4xl font-serif ">Subjects</h1>
        <div className="flex gap-6">

        <NavLink
          to={"/hod/subject/createsubject"}
          className="bg-blue-500 text-xl text-white p-4 rounded-lg "
          >
          CreateSubject
        </NavLink>
        <NavLink
          to={"/hod/subject/showsubject"}
          className="bg-green-500 text-xl text-white p-4 rounded-lg"
          >
          Show Subject
        </NavLink>
          </div>
      </div>
    </div>
  );
};

export default SubjectPage;
