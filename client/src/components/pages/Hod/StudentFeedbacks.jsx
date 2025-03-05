import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axiosInstance from "../../utils/axiosInstance";

const StudentFeedbacks = () => {
  const [studentsFeedback, setStudentsFeedback] = useState([]);

  // Fetch student feedbacks from API
  const getFeedbacks = async () => {
    try {
      const response = await axiosInstance.get("/feedback");
      console.log("API Response:", response.data);

      const feedbacks = response.data.feedbacks || response.data || [];
      const filteredFeedbacks = feedbacks.filter((feedback) => feedback.role === "student");

      // Sort feedbacks by latest (assuming 'created_at' is available)
      const sortedFeedbacks = filteredFeedbacks.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setStudentsFeedback(sortedFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    try {
      await axiosInstance.delete(`/feedback/${id}`);
      setStudentsFeedback((prev) => prev.filter((feedback) => feedback.id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <div className="flex w-screen min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Navbar />
      <div className="w-[70%] mx-auto py-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4 drop-shadow-lg">
          📢 Student Feedbacks
        </h1>

        {studentsFeedback.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentsFeedback.map((student, index) => (
              <div
                key={student.id || student._id || index}
                className="relative bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-md font-semibold text-gray-900 capitalize">
                  📌 {student.title || "Untitled Feedback"}
                </h2>

                {/* Delete Button */}
                <button
                  onClick={() => deleteFeedback(student.id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  <span className="text-blue-600">👨‍🎓 Student:</span> {student.name || "Unknown"}
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  <span className="font-medium text-blue-600">💬 Feedback:</span>{" "}
                  {student.message || student.feedback || "No message provided"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-6 text-sm">🚫 No student feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentFeedbacks;
