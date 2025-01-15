import React, { useState } from 'react';

const EventForm = ({ onAddEvent }) => {
  const [newEvent, setNewEvent] = useState({ title: '', type: '', date: '' });

  const handleSubmit = () => {
    if (newEvent.title && newEvent.type && newEvent.date) {
      onAddEvent(newEvent); // Send event data to parent
      setNewEvent({ title: '', type: '', date: '' }); // Reset form
    } else {
      alert('Please fill all event details.');
    }
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
