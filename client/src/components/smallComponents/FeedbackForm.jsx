import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Install via `npm install jwt-decode`

const FeedbackForm = ({ feedback, errors, onChange, onSubmit }) => {
  const [role, setRole] = useState("");

  // Extract role from token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role); // Assuming token has a `role` field
        onChange((prev) => ({
          ...prev,
          role: decoded.role,
          recipient: "hod", // Automatically set recipient to HOD
        }));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [onChange]);

  const handleChange = (e) => {
    onChange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md" onSubmit={onSubmit}>
      {/* Automatically set role and recipient - Hidden inputs */}
      <input type="hidden" name="role" value={role} />
      <input type="hidden" name="recipient" value="hod" />

      {/* Feedback Category */}
      <label className="block mb-2 font-medium">
        Category:
        <select
          name="category"
          value={feedback.category}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-lg"
        >
          <option value="">Select Category</option>
          <option value="academic">Academic</option>
          <option value="administration">Administration</option>
          <option value="infrastructure">Infrastructure</option>
          <option value="other">Other</option>
        </select>
      </label>

      {/* Title */}
      <label className="block mb-2 font-medium">
        Title:
        <input
          type="text"
          name="title"
          value={feedback.title}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-lg"
          placeholder="Enter feedback title"
          required
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </label>

      {/* Message */}
      <label className="block mb-2 font-medium">
        Message:
        <textarea
          name="message"
          value={feedback.message}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-lg"
          rows="4"
          placeholder="Enter your feedback message"
          required
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
      </label>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
