import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axiosInstance from "../utils/axiosInstance";
import "react-calendar/dist/Calendar.css";
import EventForm from "../pages/Hod/EventForm";
import SelectedDate from "./SelectedDate";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);

  // Fetch events from MySQL
  useEffect(() => {
    axiosInstance
      .get("/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Add Event to MySQL
  const handleAddEvent = async (newEvent) => {
    try {
      const response = await axiosInstance.post("/events", newEvent);
      setEvents([...events, { ...newEvent, id: response.data.id }]); // ✅ Updates event list
      setShowEventForm(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Delete Event from MySQL
  const handleDeleteEvent = async (eventId) => {
    try {
      await axiosInstance.delete(`/events/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId)); // ✅ Removes deleted event from UI
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Function to compare dates safely
  const isSameDate = (date1, date2) =>
    new Date(date1).toDateString() === new Date(date2).toDateString();

  // Render Events in Calendar Tiles
  const renderEvents = ({ date }) => {
    const dayEvents = events.filter((event) => isSameDate(event.event_date, date));
    return (
      <ul className="mt-1 text-[0.5rem]">
        {dayEvents.map((event) => (
          <li key={event.id} className="text-blue-900">
            {event.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 m-auto">
      <h2 className="text-center text-xl font-bold mb-4">My Calendar</h2>


      <div className="flex gap-3 w-full justify-evenly">
        <div className="w-[40%]">
          <Calendar
            onChange={setDate}
            value={date}
            className="rounded-lg shadow-lg p-2"
            tileContent={renderEvents}
          />
          
        </div>
        
   <div className="w-1/2">
   <div className="mb-4">
        <button
          onClick={() => setShowEventForm(!showEventForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showEventForm ? "Cancel" : "Add Event"}
        </button>

    {/* event form for submiting events */}
        {showEventForm && <EventForm onAddEvent={handleAddEvent} />}
      
      </div>
      {/* selected date  of an events  */}
        <div className="w-full">
          <SelectedDate date={date} events={events} onDeleteEvent={handleDeleteEvent} />
        </div>
   </div>
      </div>
    </div>
  );
};

export default MyCalendar;
