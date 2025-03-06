import React, { useEffect, useState } from "react";

const EventForm = ({ onAddEvent }) => {
  const [newEvent, setNewEvent] = useState({ title: "", type: "", date: "" });
  useEffect(() => {
    console.log("refresh");
  }, [newEvent]);

  const handleSubmit = () => {
    const trimmedTitle = newEvent.title.trim();
    if (!trimmedTitle || !newEvent.type || !newEvent.date) {
      alert("Please fill all event details.");
      return;
    }

    const formattedEvent = {
      title: trimmedTitle,
      type: newEvent.type,
      event_date: new Date(newEvent.date).toISOString().split("T")[0], // Ensures correct format
    };

    onAddEvent(formattedEvent); // ✅ Send event to parent
    setNewEvent({ title: "", type: "", date: "" }); // ✅ Reset form
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Event Title"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        className="border p-2 mb-2 w-full rounded"
      />
      <select
        value={newEvent.type}
        onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
        className="border p-2 mb-2 w-full rounded"
      >
        <option value="">Select Type</option>
        <option value="Meeting">Meeting</option>
        <option value="Deadline">Deadline</option>
        <option value="Holiday">Holiday</option>
        <option value="Exam">Exam</option>
        <option value="Workshop">Workshop</option>
        <option value="Seminar">Seminar</option>
        <option value="Competition">Competition</option>
        <option value="Placement">Placement</option>
        <option value="Project Submission">Project Submission</option>
        <option value="Field Trip">Field Trip</option>
        <option value="Sports Event">Sports Event</option>
        <option value="Cultural Fest">Cultural Fest</option>
        <option value="Orientation">Orientation</option>
      </select>
      <input
        type="date"
        value={newEvent.date}
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        className="border p-2 mb-2 w-full rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Event
      </button>
    </div>
  );
};

export default EventForm;
