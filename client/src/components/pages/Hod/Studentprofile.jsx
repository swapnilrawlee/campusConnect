import React, { useState } from "react";
import Navbar from "./Navbar";
import axiosInstance from "../../utils/axiosInstance";
import StudentmanagementNavbar from "./StudentmanagementNavbar";

const Studentprofile = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState(null);

  // Handle search functionality
  const handleSearch = async () => {
    if (!rollNumber.trim()) {
        setTimeout(() => {
            setError("Please enter a valid roll number.");
            setStudentDetails(null);
          }, 2000); 
      return;
    }
    // Sending rollNumber as a query parameter in a GET request
    const response = await axiosInstance.get("/students/studentfulldetail", {
      params: { rollNumber }, // Query parameters
    });
    if(response.status ===200){
        setStudentDetails(response.data.data);
        setRollNumber("");
        setError(null);
    }
  };

  return (
    <div className="flex gap-4 w-screen min-h-screen">
      <Navbar />
      <div className="mt-2 w-[70%]">
        <StudentmanagementNavbar/>
        {/* Search Bar */}
        <div className="flex gap-4 mt-2 w-[40%] mb-4">
          <input
            type="number"
            className="w-full outline p-2 border border-gray-300 rounded-lg"
            name="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter Student Roll Number"
          />
          <button
            className="bg-blue-800 text-white p-2 rounded-lg hover:bg-blue-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 bg-red-100 p-2 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Student Details */}
        {studentDetails && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-4 text-blue-600">Student Profile</h1>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">Name:</strong>
                <span className="text-slate-700  capitalize">
                  {studentDetails.FirstName} {studentDetails.LastName}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">Roll Number:</strong>
                <span className="text-slate-700  capitalize">{studentDetails.RollNumber}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">Course:</strong>
                <span className="text-slate-700  capitalize">{studentDetails.Course}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">
                  Year of Study:
                </strong>
                <span className="text-slate-700  capitalize">{studentDetails.YearOfStudy}</span>
              </div>

              <div className="flex justify-between">
                <strong className="font-semibold text-lg">
                  Date of Birth:
                </strong>
                <span className="text-slate-700  capitalize">
                  {new Date(studentDetails.DateOfBirth).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">Gender:</strong>
                <span className="text-slate-700  capitalize">{studentDetails.Gender}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">Email:</strong>
                <span className="text-slate-700  ">{studentDetails.Email}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">
                  Mobile Number:
                </strong>
                <span className="text-slate-700  capitalize">{studentDetails.MobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">
                  Permanent Address:
                </strong>
                <span className="text-slate-700  capitalize">{studentDetails.PermanentAddress}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">
                  EnrollmentYear:
                </strong>
                <span className="text-slate-700  capitalize">{studentDetails.EnrollmentYear}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">Skills:</strong>
                <span className="text-slate-700  capitalize">{studentDetails.Skills}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">
                  Academic Achievements:
                </strong>
                <span className="text-slate-700  capitalize">{studentDetails.academicAchievements}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">
                  Certifications:
                </strong>
                <span className="text-slate-700  capitalize">{studentDetails.certifications}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">
                  Emergency Contact:
                </strong>
                <span className="text-slate-700  capitalize">
                  {studentDetails.emergencyContactName} (
                  {studentDetails.emergencyContactRelation}) -{" "}
                  {studentDetails.emergencyContactNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">
                  Extracurricular Activities:
                </strong>
                <span className="text-slate-700  capitalize">{studentDetails.extracurricularActivities}</span>
              </div>
              <div className="flex justify-between">
                <strong className="font-semibold text-lg">
                  Languages Known:
                </strong>
                <span className="text-slate-700  capitalize">{studentDetails.LanguagesKnown}</span>
              </div>
            </div>
          </div>
        )}

        {/* No Student Found */}
        {studentDetails === null && rollNumber.trim() && !error &&  (
          <p className="text-gray-600 mt-4">No student data available.</p>
        )}
      </div>
    </div>
  );
};

export default Studentprofile;
