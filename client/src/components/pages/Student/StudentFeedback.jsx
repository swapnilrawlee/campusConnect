import React, { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";
import FeedbackForm from "../../smallComponents/FeedbackForm"; // Import the new form component

const StudentFeedback = () => {
  const [year, setYear] = useState(null);
  const [role, setRole] = useState(null);
  const [feedback, setFeedback] = useState({ title: "", message: "", year: null, role: null });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedData = jwtDecode(token);
        if (decodedData?.Student_year && decodedData?.role) {          
          setYear(decodedData.Student_year);
          setRole(decodedData.role);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    setFeedback((prevFeedback) => ({ ...prevFeedback, year, role }));
  }, [year, role]);

  const validateForm = () => {
    let errors = {};
    if (!feedback.title.trim()) errors.title = "Title is required.";
    if (!feedback.message.trim()) errors.message = "Message is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post("/feedback", {
        title: feedback.title,
        message: feedback.message,
        year: feedback.year,
        role: feedback.role,
      });

      if (response.status === 200) {
        setSuccessMessage("Feedback submitted successfully!");
        setFeedback({ title: "", message: "", year, role });
      } else {
        setErrors({ form: "Failed to submit feedback" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ form: "An error occurred while submitting feedback" });
    }
  };

  return (
    <div className="w-screen min-h-screen flex gap-4">
      <StudentNavbar />
      <div className="w-[70%] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold font-serif mb-4">Submit Feedback</h2>

        {successMessage && <p className="text-green-600 font-medium mb-4">{successMessage}</p>}
        {errors.form && <p className="text-red-500 font-medium mb-4">{errors.form}</p>}

        {/* Feedback Form Component */}
        <FeedbackForm feedback={feedback} errors={errors} onChange={setFeedback} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default StudentFeedback;
