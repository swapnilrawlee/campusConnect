import React from "react";
import { Link } from "react-router-dom";

const Rolepanel = () => {
  return (
    <div className=" w-screen h-screen flex justify-center items-center sm:bg-contain bg-cover" 
    style={{
      backgroundImage:
        "url(https://images.pexels.com/photos/2084249/pexels-photo-2084249.jpeg?auto=compress&cs=tinysrgb&w=600)",
    }}    >
        <div className="flex flex-col gap-10 items-center justify-center bg-white w-1/2 h-1/2   rounded-lg shadow-2xl shadow-black p-6 " >

        <h1 className="sm:text-2xl text-lg ">      Register Page
        </h1>
      <div className="flex sm:flex-row flex-col  gap-4">
        
      <Link to={"/admin/staff"}>
        <button             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
>Hod</button>
      </Link>
      <Link to={"/admin/staff"}>
        <button             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
>Teacher</button>
      </Link>
      <Link to={"/admin/student"}>
        <button             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
>Student</button>
      </Link>
      </div>
        </div>
    </div>
  );
};

export default Rolepanel;
