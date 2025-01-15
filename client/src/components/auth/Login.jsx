import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [role, setRole] = useState("");
  const [uniqueId, setUniqueId] = useState(""); // Changed from rollNo to uniqueId
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle change for role select
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!role || !uniqueId || !password) {
        alert("Please fill in all fields.");
        return;
      }

      const response = await axiosInstance.post("/auth/login", {
        role,
        uniqueId,
        password,
      });

      const UserRole = response.data.userDetails.role;
      const UserName =
        response.data.userDetails.FirstName +
        response.data.userDetails.LastName;

      // Storing the token
      sessionStorage.setItem("token", response.data.token);

      switch (UserRole) {
        case "Student":
          // Ensure response contains student ID before navigating
          if (response.data.userDetails.StudentID) {
            sessionStorage.setItem("userdetails", JSON.stringify(response.data.userDetails));
            navigate(`/student/${response.data.userDetails.FirstName}`);
          } else {
            alert("Student ID not found.");
          }
          break;

        case "teacher":
          // Ensure response contains employee ID before navigating
          if (response.data.employeeID) {
            navigate(`/teacher/${response.data.employeeID}`);
          } else {
            alert("Employee ID not found.");
          }
          break;

        default:
          // If an invalid role is selected
          alert("Invalid role. Please select a valid role.");
          break;
      }
    } catch (error) {
      console.error("Error during login:", error); // Error handling
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div
      className="main-container w-screen h-screen flex flex-col gap-8 justify-center items-center bg-cover bg-center p-10"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/2084249/pexels-photo-2084249.jpeg?auto=compress&cs=tinysrgb&w=600)",
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl shadow-black p-6 sm:w-1/4 flex flex-col gap-4 items-center justify-center">
        <i
          className="ri-arrow-left-line flex items-start w-full justify-start"
          onClick={() => navigate("/welcomePage")}
          title="Go back"
        ></i>
        <h1 className="text-2xl">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <select
            value={role}
            onChange={handleRoleChange}
            className="p-2 border-2 border-black rounded-lg"
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <div className="relative w-full">
            <i className="ri-id-card-line absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input
              id="uniqueId"
              type="number"
              placeholder="Unique ID"
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
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400">
          New to CampusConnect? Contact the H.O.D.
        </p>
      </div>
    </div>
  );
};

export default Login;
