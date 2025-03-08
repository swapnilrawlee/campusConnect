import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    YearOfStudy: "",
    Stream: "",
  });
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    if (filters.YearOfStudy && filters.Stream) {
      fetchStudents();
    }
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get(`/attendance`, {
        params: {
          yearOfStudy: filters.YearOfStudy,
          stream: filters.Stream,
        },
      });
      setStudents(response.data);

      // Initialize attendance state with false (unchecked)
      const initialAttendance = {};
      response.data.forEach(student => {
        initialAttendance[student.RollNumber] = false;
      });
      setAttendance(initialAttendance);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleCheckboxChange = (rollNumber) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [rollNumber]: !prevAttendance[rollNumber], // Toggle the checkbox state
    }));
  };

  const handleSubmitAttendance = async () => {
    const todayDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    const attendanceData = students.map((student) => ({
      RollNumber: student.RollNumber,
      Date: todayDate,
      Status: attendance[student.RollNumber] ? "Present" : "Absent",
      YearOfStudy: student.YearOfStudy,
      Stream: student.stream,
    }));

    try {
      await Promise.all(
        attendanceData.map((data) =>
          axiosInstance.post("/attendance", data)
        )
      );
      alert("Attendance marked successfully!");
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("Failed to mark attendance.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mark Attendance</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <select name="YearOfStudy" onChange={handleFilterChange} required className="p-2 border rounded w-full">
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
        </select>
        <select name="Stream" onChange={handleFilterChange} required className="p-2 border rounded w-full">
          <option value="">Select Stream</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
        </select>
      </div>

      {students.length > 0 ? (
        <div>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Roll Number</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Year</th>
                <th className="border p-2">Stream</th>
                <th className="border p-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.RollNumber} className="border">
                  <td className="border p-2">{student.RollNumber}</td>
                  <td className="border p-2">{student.FirstName} {student.LastName}</td>
                  <td className="border p-2">{student.YearOfStudy}</td>
                  <td className="border p-2">{student.stream}</td>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={attendance[student.RollNumber] || false}
                      onChange={() => handleCheckboxChange(student.RollNumber)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSubmitAttendance}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Submit Attendance
          </button>
        </div>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default AttendancePage;
