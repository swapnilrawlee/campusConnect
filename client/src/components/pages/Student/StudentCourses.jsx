import React, { useEffect, useState } from 'react';
import StudentNavbar from './StudentNavbar';
import axiosInstance from '../../utils/axiosInstance';
import {jwtDecode} from "jwt-decode";

const StudentCourses = () => {
  const [year, setYear] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]); // Store fetched courses

  // Get user details from sessionStorage
  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem("userdetails")); // Parse JSON string
    if (userDetails?.stream) {
      setStream(userDetails.stream);
    }

    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedData = jwtDecode(token);
      if (decodedData?.Student_year) {
        setYear(decodedData.Student_year);
      }
    }
  }, []);

  // Fetch student courses when year and stream are available
  useEffect(() => {
    if (stream && year) {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`/api/studentSubject`, {
            params: { stream, year },
          });
          setCourses(response.data.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchData();
    }
  }, [stream, year]); // Run effect when stream and year update

  // Group courses by semester
  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {});

  return (
    <div className="w-screen min-h-screen flex gap-4">
      <StudentNavbar />
      <div className="p-4 w-full">
        <h1 className="text-3xl font-bold mb-4">Student Courses Page</h1>

        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>

          {Object.keys(groupedCourses).length > 0 ? (
            Object.keys(groupedCourses).map((semester, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  Semester {semester}
                </h3>
                <ul className="list-disc pl-6">
                  {groupedCourses[semester].map((course, idx) => (
                    <li key={idx} className="mt-1">
                      {course.subject_name}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
