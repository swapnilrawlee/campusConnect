import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HodLogin = () => {
  const [uniqueId, setUniqueId] = useState(""); // Unique ID state
  const [password, setPassword] = useState(""); // Password state
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ uniqueId, password }); // Log the unique ID and password
  };

  return (
    <div className="main-container w-screen h-screen flex flex-col gap-8 justify-center items-center bg-cover bg-center p-10" style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/monochrome-grainy-effect-background_91008-303.jpg?t=st=1735937374~exp=1735940974~hmac=c0dd16c0614c74597f88bec9b84037026860550e0fd0a98ad202c9da3fd647c1&w=996)'}}>
      <div className="bg-white bg-opacity-15 rounded-lg shadow-2xl shadow-black p-6 w-1/4 flex flex-col gap-4 items-center justify-center">
        <i className="ri-arrow-left-line flex items-start w-full justify-start" onClick={() => navigate("/welcomePage")}></i>
        <h1 className="text-2xl">HOD Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <div className="relative w-full">
            <i className="ri-id-card-line absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input
              id="uniqueId"  // Unique ID input
              type="number"
              placeholder="Unique ID"  // Updated placeholder
              min={100000}
              max={999999}
              className="p-2 pl-8 rounded-lg w-full"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              required
            />
          </div>

          <div className="relative w-full">
            <i className="ri-lock-line absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="p-2 pl-8 rounded-lg w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>
        
    
      </div>
    </div>
  );
};

export default HodLogin;
