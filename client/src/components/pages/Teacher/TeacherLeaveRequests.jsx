import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {jwtDecode} from "jwt-decode";
import TeacherNavbar from "./TeacherNavbar";

const TeacherLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveData, setLeaveData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      
      setTeacherId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    if (teacherId) {
      fetchLeaveRequests();
    }
  }, [teacherId]);

  // Fetch Teacher's Leave Requests
  const fetchLeaveRequests = async () => {
    try {
      const response = await axiosInstance.get(`/leave/leave-requests?teacher_id=${teacherId}`);
      setLeaveRequests(response.data.data);
    } catch (err) {
      setError("Failed to fetch leave requests. Please try again.");
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  // Submit Leave Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
     const response = await axiosInstance.post("/leave/leave-requests", { ...leaveData, teacher_id: teacherId });
        
      setSuccess("Leave request submitted successfully!");
      fetchLeaveRequests();
      setLeaveData({ leave_type: "", start_date: "", end_date: "", reason: "" });
    } catch (err) {
      setError("Failed to submit leave request. Please try again.");
    }
  };

  return (
    <div className="flex">
<TeacherNavbar/>
<div className="flex flex-col m-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">📅 My Leave Requests</h2>
    <div className="p-6 max-w-3xl mx-auto flex">

      {/* Leave Request Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow-md border mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Apply for Leave</h3>
        <div className="grid grid-cols-2 gap-4">
          <select
            name="leave_type"
            value={leaveData.leave_type}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
            >
            <option value="">Select Leave Type</option>
            <option value="Sick Leave ">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
          <input
            type="date"
            name="start_date"
            value={leaveData.start_date}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
            />
          <input
            type="date"
            name="end_date"
            value={leaveData.end_date}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
            />
        </div>
        <textarea
          name="reason"
          placeholder="Reason for leave"
          value={leaveData.reason}
          onChange={handleChange}
          required
          className="border p-2 rounded-md w-full mt-3"
          />
        <button type="submit" className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Submit Request
        </button>
      </form>

      {/* Success/Error Messages */}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      {/* Leave Request List */}
     {/* Leave Request List */}
<div className="max-h-96 overflow-y-auto space-y-4 border rounded-md p-2">
  {leaveRequests.length === 0 ? (
      <p className="text-center text-gray-600">No leave requests found.</p>
    ) : (
        leaveRequests.map((request) => (
            <div key={request.id} className="bg-white p-4 rounded-md shadow-md border">
        <h3 className="text-lg font-semibold">{request.leave_type} </h3>
        <p className="text-gray-600">
          <span className="font-semibold">Dates:</span> {formatDate(request.start_date)} - {formatDate(request.end_date)}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Reason:</span> {request.reason}
        </p>
        <p className={`font-semibold mt-2 ${
            request.status === "pending" ? "text-yellow-500" :
            request.status === "approved" ? "text-green-500" : "text-red-500"
        }`}>
          Status: {request.status}
        </p>
      </div>
    ))
)}

      </div>
    </div>
</div>
        </div>
  );
};

export default TeacherLeaveRequests;
