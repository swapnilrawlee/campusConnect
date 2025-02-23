import React from "react";

const FeedbackForm = ({ feedback, errors, onChange, onSubmit }) => {
  const handleChange = (e) => {
    onChange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md" onSubmit={onSubmit}>
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

      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
