import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const DailyCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
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

  // Fetch Teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axiosInstance.get("/staff/staffdetails");
        const fullName = response.data.data.map(
          (item) => `${item.first_name} ${item.last_name}`
        );
        setTeachers(fullName);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    fetchTeachers();
  }, []);

  // Fetch Subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axiosInstance.get("/api/subject", {
          params: { year: newEvent.year },
        });
        setSubjects(response.data.data.map((item) => item.subject_name));
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, [newEvent.year]);

  // Fetch Calendar Data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/timetable");
        setCalendarData(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Add Event
  const addEvent = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/timetable", newEvent);
      setCalendarData([...calendarData, newEvent]);
      setNewEvent({
        department: "IT",
        year: "1st Year",
        section: "A",
        time: "",
        description: "",
        subject: "",
        teacher: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Event
  const deleteHandler = async (id) => {
    try {
      await axiosInstance.delete(`/timetable/${id}`);
      setCalendarData(calendarData.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Daily Calendar</h1>

      {/* Add Event Form */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add Event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="department" value={newEvent.department} onChange={handleInputChange} className="p-2 border rounded">
            <option value="IT">IT</option>
            <option value="CS">CS</option>
          </select>
          <select name="year" value={newEvent.year} onChange={handleInputChange} className="p-2 border rounded">
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
          </select>
          {newEvent.year === "1st Year" && (
            <select name="section" value={newEvent.section} onChange={handleInputChange} className="p-2 border rounded">
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          )}
          <input type="text" name="time" placeholder="Time" value={newEvent.time} onChange={handleInputChange} className="p-2 border rounded" />
          <input type="text" name="description" placeholder="Description" value={newEvent.description} onChange={handleInputChange} className="p-2 border rounded" />
          <select name="subject" value={newEvent.subject} onChange={handleInputChange} className="p-2 border rounded">
            <option value="">Select Subject</option>
            {subjects.map((subject, index) => <option key={index} value={subject}>{subject}</option>)}
          </select>
          <select name="teacher" value={newEvent.teacher} onChange={handleInputChange} className="p-2 border rounded">
            <option value="">Select Teacher</option>
            {teachers.map((teacher, index) => <option key={index} value={teacher}>{teacher}</option>)}
          </select>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={addEvent} disabled={loading}>{loading ? "Loading..." : "Add Event"}</button>
      </div>

      {/* Event Table */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">All Events</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th>Department</th><th>Year</th><th>Section</th><th>Time</th><th>Description</th><th>Subject</th><th>Teacher</th><th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {calendarData.map((event, index) => (
              <tr key={index}>
                <td>{event.department}</td><td>{event.year}</td><td>{event.section}</td><td>{event.time}</td><td>{event.description}</td><td>{event.subject}</td><td>{event.teacher}</td>
                <td><button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteHandler(event.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyCalendar;
