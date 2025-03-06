import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const HodRegisterPage2 = () => {
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formDataPage1 = JSON.parse(localStorage.getItem("formDataPage1"));

console.log(formDataPage1);


    try {
      // Post data to your backend
      const response = await axiosInstance.post(
        "/staff/staffbasicinfo",
        formDataPage1
      );
      // console.log(response.data.employeeID);
      sessionStorage.setItem("employeeID", response.data.employeeID);
      const employeeID = sessionStorage.getItem("employeeID");

      const response2 = await axiosInstance.post("/staff/staffadditionalinfo", {
        department,
        designation,
        qualification,
        specialization,
        experienceYears,
        joiningDate,
        emergencyContactName,
        emergencyContactNumber,
        employeeID,
      });

      if(response.statusCode === 200 &&response2.statusCode === 200) {
        alert("Staff registered successfully!");
        navigate("/admin/staff")
            localStorage.removeItem("formDataPage1");

      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="w-screen min-h-screen flex justify-center items-center  bg-cover "
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/2084249/pexels-photo-2084249.jpeg?auto=compress&cs=tinysrgb&w=600)",
      }}
    >
      <div className="sm:bg-white  sm:w-1/2 p-10 gap-4 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex justify-between w-full items-center gap-4">
          <i
            className="ri-arrow-left-line text-2xl cursor-pointer hover:text-gray-600"
            onClick={() => navigate("/admin/staff")}
            title="Go back"
          ></i>
          <h1 className="text-2xl font-bold">Page 2: Additional Information</h1>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4 w-full capitalize"
        >
          <label htmlFor="Department">Department</label>
          <input
            type="text"
            id="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="p-2 border-2 border-black capitalize"
            required
          />

          <label htmlFor="Designation">Designation</label>
          <input
            type="text"
            id="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="p-2 border-2 border-black"
            required
          />

          <label htmlFor="Qualification">Qualification</label>
          <input
            type="text"
            id="Qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="p-2 border-2 border-black"
            required
          />

          <label htmlFor="Specialization">Specialization</label>
          <input
            type="text"
            id="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="p-2 border-2 border-black"
            required
          />

          <label htmlFor="ExperienceYears">Experience Years</label>
          <input
            type="number"
            id="ExperienceYears"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            className="p-2 border-2 border-black"
            required
          />

          <label htmlFor="JoiningDate">Joining Date</label>
          <input
            type="date"
            id="JoiningDate"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            className="p-2 border-2 border-black"
            required
          />

          <label htmlFor="EmergencyContactName">Emergency Contact Name</label>
          <input
            type="text"
            id="EmergencyContactName"
            value={emergencyContactName}
            onChange={(e) => setEmergencyContactName(e.target.value)}
            className="p-2 border-2 border-black"
            required
          />

          <label htmlFor="EmergencyContactNumber">
            Emergency Contact Number
          </label>
          <input
            type="tel"
            id="EmergencyContactNumber"
            value={emergencyContactNumber}
            onChange={(e) => setEmergencyContactNumber(e.target.value)}
            className="p-2 border-2 border-black"
            required
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HodRegisterPage2;
