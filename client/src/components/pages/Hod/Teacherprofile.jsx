import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "./Navbar";

const TeacherProfile = () => {
  const [employeeID, setEmployeeId] = useState("");
  const [teacherData, setTeacherData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!employeeID) {
      setError("⚠️ Please enter an Employee ID");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.get(`/staff/staffFullDetails`, {
        params: { employeeID },
      });
      setTeacherData(response.data.data);
    } catch (err) {
      setError("❌ Teacher not found or an error occurred");
      setTeacherData(null);
    }
  };

  return (
    <div className="flex  ">
<Navbar/>
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
        🔍 Search Teacher Profile
      </h2>

      {/* Search Bar */}
      <div className="flex items-center bg-white shadow-md rounded-lg p-2 border border-gray-200">
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={employeeID}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full  text-gray-700 border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-transform active:scale-95 shadow-md"
          >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && (
          <p className="text-red-500 font-semibold text-center mt-4">{error}</p>
        )}

      {/* Profile Card */}
      {teacherData && (
          <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white border border-gray-300 rounded-xl w-auto shadow-xl p-6 hover:shadow-2xl transition-all relative">
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <div className="bg-white text-blue-700 font-bold text-3xl w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-blue-300">
              {teacherData.first_name[0]}{teacherData.last_name[0]}
            </div>
          </div>

          {/* Name & Designation */}
          <h3 className="text-xl font-bold text-center">
            {teacherData.first_name} {teacherData.last_name}
          </h3>
          <p className="text-center text-lg opacity-90 capitalize">
            <i className="ri-briefcase-line mr-2"></i> {teacherData.designation}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            <p className="flex items-center">
              <i className="ri-graduation-cap-line mr-2"></i>
              <span className="font-semibold">Qualification:</span>{" "}
              {teacherData.qualification}
            </p>
            <div className="col-span-2 flex items-center">
              <i className="ri-lightbulb-line mr-2"></i>
              <span className="font-semibold">Specialization:</span>{" "}
            </div>
            <p className="col-span-2 pl-6">{teacherData.specialization}</p>
            <p className="flex items-center">
              <i className="ri-mail-line mr-2"></i>
              <span className="font-semibold">Email:</span> {teacherData.email}
            </p>
            <p className="flex items-center">
              <i className="ri-phone-line mr-2"></i>
              <span className="font-semibold">Mobile:</span>{" "}
              {teacherData.mobile_number}
            </p>
            <p>
              <i className="ri-profile-line mr-2"></i>
              <span className="font-semibold">Employee ID:</span>{" "}
              {teacherData.employee_id}
            </p>
            <p>
              <i className="ri-building-line mr-2"></i>
              <span className="font-semibold">Department:</span>{" "}
              {teacherData.department}
            </p>
            <p>
              <i className="ri-history-line mr-2"></i>
              <span className="font-semibold">Experience:</span>{" "}
              {teacherData.experience_years} years
            </p>
            <p>
              <i className="ri-calendar-check-line mr-2"></i>
              <span className="font-semibold">Joining Date:</span>{" "}
              {new Date(teacherData.joining_date).toLocaleDateString()}
            </p>
            <p>
              <i className="ri-calendar-line mr-2"></i>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {new Date(teacherData.date_of_birth).toLocaleDateString()}
            </p>
            <p>
              <i className="ri-user-line mr-2"></i>
              <span className="font-semibold">Gender:</span>{" "}
              {teacherData.gender}
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="mt-4 p-3 bg-white text-gray-800 rounded-md shadow-md">
            <p className="font-semibold text-lg text-center">🚨 Emergency Contact</p>
            <p className="text-center">
              {teacherData.emergency_contact_name || "N/A"} -{" "}
              {teacherData.emergency_contact_number || "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
      </div>
  );
};

export default TeacherProfile;
