import React from 'react';
import Navbar from './Navbar';

const Feedback = () => {
  const handleStudentFeedback = () => {
    console.log("Navigating to Student Feedback form...");
    // Add navigation or logic for Student Feedback
  };

  const handleTeacherFeedback = () => {
    console.log("Navigating to Teacher Feedback form...");
    // Add navigation or logic for Teacher Feedback
  };

  return (
    <div className="flex gap-4 w-screen min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Feedback</h1>
        <div className=" gap-3 flex">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition"
            onClick={handleStudentFeedback}
          >
            Student Feedback
          </button>
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition"
            onClick={handleTeacherFeedback}
          >
            Teacher Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
