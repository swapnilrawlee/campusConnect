import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

// Event List component
const EventList = ({ events, onDeleteEvent }) => {
  const handleDelete = async (eventId) => {
    try {
      // Send DELETE request to backend
      await axiosInstance.delete(`/events/${eventId}`);
      onDeleteEvent(eventId); // Update the UI after successful deletion
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">All Events</h2>

      {/* List of events */}
      {events.length > 0 ? (
        <ul className="space-y-3">
          {events.map((event) => (
            <li
              key={event.id}
              className="p-3 border rounded flex justify-between items-center bg-gray-100"
            >
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(event.event_date).toDateString()} |{" "}
                  <span className="text-blue-500">{event.type}</span>
                </p>
              </div>
              <button
                onClick={() => handleDelete(event.id)} // Call delete function on click
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No events found.</p>
      )}
    </div>
  );
};


const EventPage = () => {
  const [events, setEvents] = useState([]); 
  const [filteredEvents, setFilteredEvents] = useState([]); 
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState(""); 

  // Fetch events from the backend API
  useEffect(() => {
    axiosInstance
      .get("/events") 
      .then((response) => {
        setEvents(response.data); 
        setFilteredEvents(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []); 

  const handleDeleteEvent = (eventId) => {
    // Remove event from the local state after deleting
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    setFilteredEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId)); // Update filtered events
  };

  const handleFilterEvents = (type) => {
    setFilterType(type);
    if (type === "") {
      setFilteredEvents(events); 
    } else {
      const filtered = events.filter((event) => event.type === type); // Filter by type
      setFilteredEvents(filtered);
    }
  };

  const handleSortEvents = (order) => {
    setSortOrder(order);
    let sortedEvents;
    if (order === "asc") {
      sortedEvents = [...filteredEvents].sort(
        (a, b) => new Date(a.event_date) - new Date(b.event_date)
      );
    } else if (order === "desc") {
      sortedEvents = [...filteredEvents].sort(
        (a, b) => new Date(b.event_date) - new Date(a.event_date)
      );
    }
    setFilteredEvents(sortedEvents); // Update filtered events after sorting
  };

  return (
    <div className="p-4">
      {/* Sorting and Filtering */}
      <div className="flex gap-4 mb-4">
        <select
          value={filterType}
          onChange={(e) => handleFilterEvents(e.target.value)}
          className="px-3 py-2 border rounded-md"
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

        <select
          value={sortOrder}
          onChange={(e) => handleSortEvents(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="" disabled>Sort by Date</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Render filtered and sorted event list */}
      <EventList
        events={filteredEvents} // Pass filtered and sorted events to EventList
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default EventPage;
