import React, { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // Ensure correct import

const SelectedDate = ({ date, events, onDeleteEvent }) => {
  useEffect(()=>{
    console.log("refresh event");
    
  },[events]);
  const isSameDate = (date1, date2) =>
    date1.toISOString().split("T")[0] === date2.toISOString().split("T")[0];

  const filteredEvents = events.filter((event) =>
    isSameDate(new Date(event.event_date), date)
  );

  const handleDelete = async (eventId) => {
    try {
      await axiosInstance.delete(`/events/${eventId}`);
      onDeleteEvent(eventId); // ✅ Updates UI after deletion
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <h3 className="mt-4 text-lg font-semibold">
        Selected Date: {date.toDateString()}
      </h3>
      {filteredEvents.length > 0 ? (
        <ul className="mt-2">
          {filteredEvents.map((event) => (
            <li key={event.id} className="p-2 bg-gray-100 rounded mb-2 flex justify-between items-center">
              <span>
                <strong>{event.title}</strong> - {new Date(event.event_date).toDateString()}
              </span>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">No events for this date.</p>
      )}
    </div>
  );
};

export default SelectedDate;
