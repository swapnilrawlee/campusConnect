import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const ShowSubject = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [ sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const SubjectFetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/subject", {
        params: { year },
      });
      setSubjects(response.data.data || []);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setSubjects([]);
    }
  };

  const handleSort = (key) => {
    let direction = "asc"; // Default sorting direction
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"; // Toggle to descending if already sorted ascending
    }
    setSortConfig({ key, direction });

    const sortedData = [...subjects].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSubjects(sortedData);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-screen min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 p-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-200"
        >
          Back
        </button>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Subject Details</h1>
        <div className="mb-6">
          <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">
            Select Year
          </label>
          <select
            name="year"
            id="year"
            onChange={(e) => setYear(e.target.value)}
            className="w-full md:w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500"
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
          </select>
          <button
            onClick={SubjectFetchData}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200"
          >
            Search
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg bg-white rounded">
            <thead className="bg-gray-200">
              <tr>
                <th
                  className="p-4 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort("subject_name")}
                >
                  Subject Name{" "}
                  {sortConfig.key === "subject_name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-4 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort("stream")}
                >
                  Stream{" "}
                  {sortConfig.key === "stream" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-4 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort("year")}
                >
                  Year{" "}
                  {sortConfig.key === "year" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="p-4 text-left border border-gray-300 cursor-pointer"
                  onClick={() => handleSort("semester")}
                >
                  Semester{" "}
                  {sortConfig.key === "semester" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-4 border border-gray-300">{subject.subject_name}</td>
                    <td className="p-4 border border-gray-300">{subject.stream}</td>
                    <td className="p-4 border border-gray-300">{subject.year}</td>
                    <td className="p-4 border border-gray-300">{subject.semester}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="p-4 text-center text-gray-500 border border-gray-300"
                  >
                    No subjects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowSubject;
