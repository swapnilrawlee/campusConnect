import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "./Navbar";

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axiosInstance.get("/leave/hod/leave-requests");
      setLeaveRequests(response.data.data);
    } catch (err) {
      setError("Failed to fetch leave requests. Please try again.");
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosInstance.put(`/leave/hod/leave-requests/${id}`, { status });
      setLeaveRequests((prev) =>
        prev.map((request) => (request.id === id ? { ...request, status } : request))
      );
    } catch (err) {
      setError("Failed to update status. Please try again.");
    }
  };

  const filteredRequests = leaveRequests.filter(
    (request) => filter === "all" || request.status === filter
  );

  return (
    <div className="flex">
    <Navbar/>
    <div className="flex flex-col m-auto">
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">📄 Teacher Leave Requests</h2>

      {/* Filter */}
      <div className="mb-4 flex justify-center space-x-4">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded-md ${
              filter === status ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Leave Request List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <p className="text-center text-gray-600">No leave requests found.</p>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="bg-white p-4 rounded-md shadow-md border">
              <h3 className="text-lg font-semibold">
                {request.teacher_name} ({request.employee_id})
              </h3>
              <p className="text-gray-600">
                <span className="font-semibold">Type:</span> {request.leave_type}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Dates:</span> {request.start_date} - {request.end_date}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Reason:</span> {request.reason}
              </p>
              <p className={`font-semibold mt-2 ${request.status === "pending" ? "text-yellow-500" : request.status === "approved" ? "text-green-500" : "text-red-500"}`}>
                Status: {request.status}
              </p>

              {/* Approve/Reject Buttons */}
              {request.status === "pending" && (
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(request.id, "approved")}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(request.id, "rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default LeaveRequests;
