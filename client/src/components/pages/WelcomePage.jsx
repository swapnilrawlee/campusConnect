import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
<div className=" w-screen h-screen flex flex-col gap-8 justify-end items-end main-container bg-cover bg-center p-20 " style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/abstract-flag-shape-from-coloured-paper_23-2148319024.jpg?t=st=1735934071~exp=1735937671~hmac=d32c3458711d168de9626940772906b201efedc2f47bdc73ba8df884badbbdf4&w=1060)' }}>

      <h1 className="text-6xl welcomeh1 font-bold middleText text-white  flex flex-col items-end gap-4">
        Welcome to
        <span className="text-red-900 text-8xl biggerText"> CampusConnect</span>
      </h1>
      <p className="smallText w-[35%] text-gray-200 text-lg welcomepara  text-left">
        Campus Connect is a unified platform designed to bridge the
        communication gap between students, teachers, and Heads of Departments
        (HODs) in an academic environment.
      </p>
      <div className="flex gap-4">
        <Link to={"/login"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            {" "}
            Login
          </button>
        </Link>
        <Link to={"/hodlogin"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            H.O.D Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
