import React, { useEffect, useState } from 'react';
import StudentNavbar from './StudentNavbar';
import axiosInstance from '../../utils/axiosInstance';

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null); // State to store student details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const StudentDataFetch = async () => {
    const userdetails = sessionStorage.getItem('userdetails');

    if (userdetails) {
      try {
        const rollNumber = JSON.parse(userdetails).RollNumber; // Parse JSON
        console.log("Fetching details for Roll Number:", rollNumber);

        // Fetch student data from API
        const response = await axiosInstance.get('/students/studentfulldetail', {
          params: { rollNumber },
        });

        console.log("Student Data:", response.data);
        setStudentData(response.data.data); // Set data in state
      } catch (error) {
        console.error("Error fetching student details:", error.message);
        setError("Failed to fetch student details. Please try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("User details not found in session storage.");
      setError("User details not found. Please log in again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    StudentDataFetch();
  }, []);

  if (loading) {
    return <div className="w-screen min-h-screen flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-screen min-h-screen flex justify-center items-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-screen min-h-screen flex gap-4 bg-gray-100 ">
      <StudentNavbar />
      <div className="w-[70%] bg-white shadow-md rounded-lg p-6 capitalize">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        {studentData && (
          <div className="grid grid-cols-2 gap-6">
            <div className='flex flex-col gap-4'>
              <p><strong>Full Name:</strong> {studentData.FirstName} {studentData.LastName}</p>
              <p><strong>Roll Number:</strong> {studentData.RollNumber}</p>
              <p><strong>Course:</strong> {studentData.Course}</p>
              <p><strong>Year of Study:</strong> {studentData.YearOfStudy}</p>
              <p><strong>Current Semester:</strong> {studentData.CurrentSemester}</p>
              <p><strong>Date of Birth:</strong> {new Date(studentData.DateOfBirth).toLocaleDateString()}</p>
              <p><strong>Gender:</strong> {studentData.Gender}</p>
            </div>
            <div className='flex flex-col gap-4'>
              <p><strong>Email:</strong> {studentData.Email}</p>
              <p><strong>Mobile Number:</strong> {studentData.MobileNumber}</p>
              <p><strong>Permanent Address:</strong> {studentData.PermanentAddress}</p>
              <p><strong>Languages Known:</strong> {studentData.LanguagesKnown}</p>
              <p><strong>Skills:</strong> {studentData.Skills}</p>
              <p><strong>Extracurricular Activities:</strong> {studentData.extracurricularActivities}</p>
              <p><strong>Academic Achievements:</strong> {studentData.academicAchievements}</p>
            </div>
          </div>
        )}
        {studentData && (
            <div className='flex flex-col gap-4 mt-6'>
            <h2 className="text-xl font-semibold">Emergency Contact</h2>
            <p><strong>Name:</strong> {studentData.emergencyContactName}</p>
            <p><strong>Relation:</strong> {studentData.emergencyContactRelation}</p>
            <p><strong>Contact Number:</strong> {studentData.emergencyContactNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
