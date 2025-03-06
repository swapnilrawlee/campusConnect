import React, { useState } from "react";
import Navbar from "./Navbar";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateSubject = () => {
  const [stream, setStream] = useState("");
  const [year, setYear] = useState("");
  const [sem, setSem] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate= useNavigate();

  const handleSubmit = async () => {
    if (!subjectName) {
      setError("Subject name is required.");
      setMessage("");
    } else {
      setError("");
      try {
        const response = await axiosInstance.post("/api/subject", {
          stream,
          year,
          sem,
          subjectName,
        });
        if (response.status === 200) {
          setMessage("Subject added successfully!");
          setStream(""); // Clear stream dropdown
          setYear(""); // Clear year dropdown
          setSem(""); // Clear semester dropdown
          setSubjectName(""); // Clear subject name input
          setError("");  // Clear the error message on success
        }
      } catch (error) {
        // Handle missing error.response in case of network failure
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        setError(errorMessage);
      }
    }
  };

  const isFieldAdded = stream === "" || year === "" || sem === "";

  return (
    <div className="flex gap-4 w-screen min-h-screen">
      <Navbar />
      <div className="w-[70%] p-4 mt-6">
      <button onClick={()=>navigate(-1)} className="p-2 bg-black text-white rounded">Back</button>

        <h1 className="text-2xl font-bold mb-4">Create Subject</h1>
        {/* Form */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            className="outline p-2 rounded w-1/2"
            name="Stream"
            aria-label="Select Stream"
            onChange={(e) => setStream(e.target.value)}
            value={stream} // Controlled value
          >
            <option value="">Select Stream</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">
              Information Technology
            </option>
          </select>
          <select
            className="outline p-2 rounded w-1/2"
            name="Year"
            aria-label="Select Year"
            onChange={(e) => setYear(e.target.value)}
            value={year} // Controlled value
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
          </select>
          <select
            className="outline p-2 rounded w-1/2"
            name="Semester"
            aria-label="Select Semester"
            onChange={(e) => setSem(e.target.value)}
            value={sem} // Controlled value
          >
            <option value="">Select Semester</option>
            <option value="1st Semester">1st Semester</option>
            <option value="2nd Semester">2nd Semester</option>
            <option value="3rd Semester">3rd Semester</option>
            <option value="4th Semester">4th Semester</option>
            <option value="5th Semester">5th Semester</option>
            <option value="6th Semester">6th Semester</option>
          </select>
        </div>
        <input
          type="text"
          name="Subject"
          className="outline rounded p-2 w-full mb-4"
          placeholder="Add Subject"
          aria-label="Enter Subject Name"
          onChange={(e) => setSubjectName(e.target.value)}
          value={subjectName} // Controlled value
        />
        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            onClick={handleSubmit}
          >
            Add Subject
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setStream(""); // Clear stream dropdown
              setYear(""); // Clear year dropdown
              setSem(""); // Clear semester dropdown
              setSubjectName(""); // Clear subject name input
              setMessage(""); // Clear success message
              setError(""); // Clear error message
            }}
          >
            Cancel
          </button>
        </div>
        {/* Messages */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default CreateSubject;
