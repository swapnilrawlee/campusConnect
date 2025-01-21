import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const DailyCalendar = () => {
  const initialData = {
    IT: {
      "1st Year": { A: [], B: [] },
      "2nd Year": [],
      "3rd Year": [],
    },
    CS: {
      "1st Year": { A: [], B: [] },
      "2nd Year": [],
      "3rd Year": [],
    },
  };

  const [calendarData, setCalendarData] = useState(initialData);
  const [newEvent, setNewEvent] = useState({
    department: "IT",
    year: "1st Year",
    section: "A",
    time: "",
    description: "",
    subject: "",
    teacher: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Utility function for fetching data
  const fetchData = async (url, setData, errorMessage) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(url);
      setData(response.data.data);
    } catch (error) {
      console.error(errorMessage, error);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("/staff/staffdetails", (data) => {
      const fullName = data.map((item) => `${item.first_name} ${item.last_name}`);
      setTeachers(fullName);
    }, "Error fetching teacher data");
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/subject", {
          params: { year: newEvent.year },
        });
        const subjects = response.data.data.map((item) => item.subject_name);
        setSubjects(subjects);
      } catch (error) {
        console.error("Error fetching subject data:", error);
        alert("Failed to fetch subjects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [newEvent.year]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const addEvent = () => {
    const { department, year, section, time, description, subject, teacher } = newEvent;

    if (time && description && subject && teacher) {
      setCalendarData((prevData) => {
        const updatedData = { ...prevData };
        if (year === "1st Year") {
          updatedData[department][year][section].push({ time, description, subject, teacher });
        } else {
          updatedData[department][year].push({ time, description, subject, teacher });
        }
        return updatedData;
      });
      setNewEvent({ ...newEvent, time: "", description: "", subject: "", teacher: "" });
    } else {
      alert("Please fill all fields before adding an event.");
    }
  };

  const getAllEvents = () => {
    const events = [];
    for (const department in calendarData) {
      for (const year in calendarData[department]) {
        if (year === "1st Year") {
          for (const section in calendarData[department][year]) {
            calendarData[department][year][section].forEach((event) =>
              events.push({ department, year, section, ...event })
            );
          }
        } else {
          calendarData[department][year].forEach((event) =>
            events.push({ department, year, section: "-", ...event })
          );
        }
      }
    }
    return events;
  };

  const deleteHandler = (department, year, section, time) => {
    setCalendarData((prevData) => {
      const updatedData = { ...prevData };
      if (year === "1st Year") {
        updatedData[department][year][section] = updatedData[department][year][section].filter(
          (event) => event.time !== time
        );
      } else {
        updatedData[department][year] = updatedData[department][year].filter(
          (event) => event.time !== time
        );
      }
      return updatedData;
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Daily Calendar</h1>

      {/* Event Form */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="department"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={newEvent.department}
            onChange={handleInputChange}
          >
            <option value="IT">IT</option>
            <option value="CS">CS</option>
          </select>
          <select
            name="year"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={newEvent.year}
            onChange={handleInputChange}
          >
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
          </select>
          {newEvent.year === "1st Year" && (
            <select
              name="section"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              value={newEvent.section}
              onChange={handleInputChange}
            >
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          )}
          <input
            type="text"
            name="time"
            placeholder="Time (e.g., 10:00 AM)"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={newEvent.time}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={newEvent.description}
            onChange={handleInputChange}
          />
          <select
            name="subject"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={newEvent.subject}
            onChange={handleInputChange}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select
            name="teacher"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={newEvent.teacher}
            onChange={handleInputChange}
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher, index) => (
              <option key={index} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={addEvent}
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Event"}
        </button>
      </div>

      {/* Unified Event Table */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">All Events</h2>
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Section</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Teacher</th>
              <th className="border px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {getAllEvents().map((event, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{event.department}</td>
                <td className="border px-4 py-2">{event.year}</td>
                <td className="border px-4 py-2">{event.section}</td>
                <td className="border px-4 py-2">{event.time}</td>
                <td className="border px-4 py-2">{event.description}</td>
                <td className="border px-4 py-2">{event.subject}</td>
                <td className="border px-4 py-2">{event.teacher}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() =>
                      deleteHandler(
                        event.department,
                        event.year,
                        event.section,
                        event.time
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyCalendar;
