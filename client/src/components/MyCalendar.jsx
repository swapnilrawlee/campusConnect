import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventForm from './pages/Hod/EventForm';
import SelectedDate from './SelectedDate';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);

  // Event Creation Handler
  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
    setShowEventForm(false); // Close the form after saving the event
  };

  // Render Events in Calendar Tiles
  const renderEvents = ({ date }) => {
    const dayEvents = events.filter(
      (event) => new Date(event.date).toDateString() === date.toDateString()
    );
    return (
      <ul className="mt-1 text-[0.5rem]">
        {dayEvents.map((event, index) => (
          <li key={index} className="text-blue-900">
            {event.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 m-auto">
      <h2 className="text-center text-xl font-bold mb-4">My Calendar</h2>

      <div className="mb-4">
        <button
          onClick={() => setShowEventForm(!showEventForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showEventForm ? 'Cancel' : 'Add Event'}
        </button>

        {showEventForm && <EventForm onAddEvent={handleAddEvent} />}
      </div>

      <div className="flex gap-3 w-full justify-evenly">
        <div className="w-[40%]">
          <Calendar
            onChange={setDate}
            value={date}
            className="rounded-lg shadow-lg p-2"
            tileContent={renderEvents}
          />
        </div>
        <div className="w-[40%]">
          <SelectedDate date={date} events={events} />
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
