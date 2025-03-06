import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance"; // Adjust path if needed

// AttendancePage component to manage attendance display and creation
const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  
  
  
  const [newAttendance, setNewAttendance] = useState({
    RollNumber: "",
    YearOfStudy: "",
    CurrentSemester: "",
    AttendanceDate: "",
    Status: "Present", // Default status
  });

  // Fetch attendance records from backend
  useEffect(() => {
    axiosInstance
      .get("/attendance")
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
      });
  }, []);

  // Handle form input changes for new attendance
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAttendance((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle marking new attendance
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/attendance", newAttendance)
      .then((response) => {
        // Update the attendance list after marking attendance
        setAttendance((prevAttendance) => [
          ...prevAttendance,
          { ...newAttendance, AttendanceID: Date.now() }, // Adding a mock ID for the new attendance
        ]);
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error marking attendance:", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Attendance Records</h1>

      {/* Display Attendance Records */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">All Attendance</h2>
        {attendance.length > 0 ? (
          <ul className="space-y-2">
            {attendance.map((record) => (
              <li
                key={record.AttendanceID}
                className="p-3 border rounded bg-gray-100 flex justify-between"
              >
                <div>
                  <p>
                    <strong>
                      {record.FirstName} {record.LastName}
                    </strong>
                    <br />
                    {record.YearOfStudy} - Semester {record.CurrentSemester}
                    <br />
                    Date: {new Date(record.AttendanceDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`${
                    record.Status === "Present"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-semibold`}
                >
                  {record.Status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No attendance records found.</p>
        )}
      </div>

      {/* Mark Attendance Form */}
      <div>
        <h2 className="text-lg font-semibold">Mark Attendance</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold" htmlFor="RollNumber">
              Roll Number:
            </label>
            <input
              type="text"
              id="RollNumber"
              name="RollNumber"
              value={newAttendance.RollNumber}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block font-semibold" htmlFor="YearOfStudy">
              Year of Study:
            </label>
            <select
              id="YearOfStudy"
              name="YearOfStudy"
              value={newAttendance.YearOfStudy}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold" htmlFor="CurrentSemester">
              Current Semester:
            </label>
            <select
              id="CurrentSemester"
              name="CurrentSemester"
              value={newAttendance.CurrentSemester}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            >
              <option value="">Select Semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold" htmlFor="AttendanceDate">
              Attendance Date:
            </label>
            <input
              type="date"
              id="AttendanceDate"
              name="AttendanceDate"
              value={newAttendance.AttendanceDate}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>

          <div>
            <label className="block font-semibold" htmlFor="Status">
              Status:
            </label>
            <select
              id="Status"
              name="Status"
              value={newAttendance.Status}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Mark Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default AttendancePage;
