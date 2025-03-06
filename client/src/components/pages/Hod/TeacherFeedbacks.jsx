import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axiosInstance from "../../utils/axiosInstance";

const TeacherFeedbacks = () => {
  const [teacherFeedbacks, setTeacherFeedbacks] = useState([]);

  // Fetch teacher feedbacks
  const getFeedbacks = async () => {
    try {
      const response = await axiosInstance.get("/feedback");
      console.log("API Response:", response.data.feedbacks);

      const feedbacks = response.data.feedbacks || response.data || [];
      const filteredFeedbacks = feedbacks.filter((feedback) => feedback.role === "teacher");

      setTeacherFeedbacks(filteredFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    try {
      await axiosInstance.delete(`/feedback/${id}`);
      setTeacherFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id));
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
          🏫 Teacher Feedbacks
        </h1>

        {teacherFeedbacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teacherFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="relative bg-white bg-opacity-80 backdrop-blur-lg border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h2 className="text-md font-semibold text-gray-900 capitalize">
                  📌 {feedback.title || "Untitled Feedback"}
                </h2>

                <p className="text-sm font-medium text-gray-900 mt-1">
                  <span className="text-blue-600">👨‍🏫 Teacher:</span> {feedback.name || "Unknown"}
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  <span className="font-medium text-blue-600">💬 Feedback:</span>{" "}
                  {feedback.message || "No message provided"}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() => deleteFeedback(feedback.id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-6 text-sm">🚫 No teacher feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherFeedbacks;
