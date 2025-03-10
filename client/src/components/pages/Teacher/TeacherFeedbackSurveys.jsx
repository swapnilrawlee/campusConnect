import React, { useEffect, useState } from "react";
import TeacherNavbar from "./TeacherNavbar";
import FeedbackForm from "../../smallComponents/FeedbackForm";
import axiosInstance from "../../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const TeacherFeedbackSurveys = () => {
  const [feedback, setFeedback] = useState({ title: "", message: "", year: "", name: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [role, setRole] = useState("");

  // Extract name, role, and student year from token
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedData = jwtDecode(token);

        if (decodedData?.role) {
          console.log("Role:", decodedData.role);
          setRole(decodedData.role);
        }

        if (decodedData?.name) {
          console.log("Name:", decodedData.name);
          setFeedback((prev) => ({ ...prev, name: decodedData.name }));
        }

        if (decodedData?.Student_year) {
          console.log("Student Year:", decodedData.Student_year);
          setFeedback((prev) => ({ ...prev, year: decodedData.Student_year }));
        } else {
          setFeedback((prev) => ({ ...prev, year: null })); // Set null for teachers
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!feedback.title.trim()) errors.title = "Title is required.";
    if (!feedback.message.trim()) errors.message = "Message is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post("/feedback", {
        title: feedback.title,
        message: feedback.message,
        role: role,
        name: feedback.name, // Send name to backend
        year: role === "teacher" ? null : feedback.year, // Assign year for students, null for teachers
      });

      if (response.status === 200) {
        setSuccessMessage("Feedback submitted successfully!");
        setFeedback({ title: "", message: "", year: feedback.year, name: feedback.name }); // Keep name & year
      } else {
        setErrors(response.data.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ form: "An error occurred while submitting feedback" });
    }
  };

  return (
    <div className="flex w-screen min-h-screen">
      <TeacherNavbar />
      <div className="flex flex-col w-full items-center justify-center p-6">
        <h2 className="text-3xl font-bold mb-4">Teacher Feedback Survey</h2>

        {successMessage && <p className="text-green-600 font-medium mb-4">{successMessage}</p>}
        {errors.form && <p className="text-red-500 font-medium mb-4">{errors.form}</p>}

        <FeedbackForm feedback={feedback} errors={errors} onChange={setFeedback} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default TeacherFeedbackSurveys;
