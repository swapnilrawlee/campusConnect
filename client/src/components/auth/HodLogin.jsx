import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import userDetailsContext from "../utils/CreateContext";

const HodLogin = () => {
  const [uniqueId, setUniqueId] = useState(""); // Unique ID state
  const [password, setPassword] = useState(""); // Password state
  const [role, setRole] = useState("hod"); // Role state
  const navigate = useNavigate();
  const {setUserDetails} = useContext(userDetailsContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post("/auth/login", {
      role,
      uniqueId,
      password,
    });
    setUserDetails(response.data.userDetails);

    try {
      if (response.status === 200) {
        navigate(`/hod`, {
          state: { userDetails: response.data.userDetails },
        });
      } else {
        navigate("/hodlogin");
      }
    } catch (error) {}
  };

  return (
    <div
      className="main-container w-screen h-screen flex flex-col gap-8 justify-center items-center bg-cover bg-center p-10"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/2084249/pexels-photo-2084249.jpeg?auto=compress&cs=tinysrgb&w=600)",
      }}
    >
      <div className="bg-white   rounded-lg shadow-2xl shadow-black p-6 sm:w-1/4 flex flex-col gap-4 items-center justify-center">
        <i
          className="ri-arrow-left-line flex items-start w-full justify-start"
          onClick={() => navigate("/welcomePage")}
        ></i>
        <h1 className="text-2xl">HOD Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative w-full">
            <i className="ri-id-card-line absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input
              id="uniqueId" // Unique ID input
              type="number"
              placeholder="Unique ID" // Updated placeholder
              className="p-2 pl-8 border-2 border-black rounded-lg w-full"
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
              className="p-2 pl-8 border-2 border-black rounded-lg w-full"
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
