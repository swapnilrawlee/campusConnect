import React from 'react';

const SelectedDate = ({ date, events }) => {
  return (
    <div>
      <h3 className="mt-4 text-lg font-semibold">Selected Date: {date.toDateString()}</h3>
      <ul className="mt-2">
        {events
          .filter((event) => new Date(event.date).toDateString() === date.toDateString())
          .map((event, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded mb-2">
              {event.title} - {event.type}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SelectedDate;
