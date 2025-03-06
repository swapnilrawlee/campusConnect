import React from "react";
import { Link } from "react-router-dom";
import welcomepage from "../../assets/welcomepage.jpg";

const WelcomePage = () => {
  return (
    <div
      className=" w-screen h-screen flex flex-col gap-8 justify-end items-end main-container bg-cover bg-center p-20 "
      style={{
        backgroundImage:
          `url(${welcomepage})`,
      }}
    >
      <h1 className="text-6xl welcomeh1 font-bold middleText  flex flex-col items-end gap-4">
        Welcome to
        <span className="text-red-900 text-8xl biggerText"> CampusConnect</span>
      </h1>
      <p className="smallText w-[45%] text-gray-800 text-lg welcomepara  text-left">
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
