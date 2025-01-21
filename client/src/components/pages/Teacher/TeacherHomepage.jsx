import React, { useState } from 'react';
import TeacherNavbar from './TeacherNavbar';

const TeacherHomepage = () => {
  const [year, setYear] = useState('');
  const [stream, setStream] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([]);

  // Subject options (organized by Year, Stream, and Semester)
  const subjectOptions = {
    "1": {
      "1": {
        "information technology": ["Mathematics I", "Programming Basics", "Physics"],
        "Computer Science": ["Mathematics I", "Introduction to Computers", "Digital Logic"],
        plain: ["Mathematics I", "Environmental Studies", "English"],
      },
      "2": {
        "information technology": ["Mathematics II", "Data Communication", "C Programming"],
        "Computer Science": ["Mathematics II", "Database Concepts", "Operating Systems"],
        plain: ["History II", "English Literature", "Sociology Basics"],
      },
    },
    "2": {
      "1": {
        "information technology": ["Data Structures", "Discrete Mathematics", "Database Management"],
        "Computer Science": ["Algorithms", "Computer Architecture", "Data Structures"],
        plain: ["Advanced History", "Political Science", "Economics"],
      },
      "2": {
        "information technology": ["Operating Systems", "Web Technologies", "Computer Networks"],
        "Computer Science": ["Compiler Design", "Artificial Intelligence", "Machine Learning"],
        plain: ["Modern Sociology", "Philosophy", "Psychology"],
      },
    },
    "3": {
      "1": {
        "information technology": ["Cloud Computing", "Software Engineering", "Advanced DBMS"],
        "Computer Science": ["Big Data Analytics", "Cyber Security", "Data Science"],
        plain: ["International Relations", "Global Economics", "Sociology"],
      },
      "2": {
        "information technology": ["Blockchain", "Mobile App Development", "IoT"],
        "Computer Science": ["Deep Learning", "Natural Language Processing", "Quantum Computing"],
        plain: ["Research Methods", "Ethics in History", "Comparative Politics"],
      },
    },
  };

  // Function to update subjects dynamically
  const updateSubjects = () => {
    const availableSubjects =
      subjectOptions[year]?.[semester]?.[stream] || [];
    setSubjects(availableSubjects);
  };

  // Handlers for dropdown changes
  const handleYearChange = (e) => {
    setYear(e.target.value);
    setStream('');
    setSemester('');
    setSubjects([]);
  };

  const handleStreamChange = (e) => {
    setStream(e.target.value);
    setSemester('');
    setSubjects([]);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    updateSubjects();
  };

  return (
    <div className="flex w-screen min-h-screen">
      <TeacherNavbar />
      <div className="dropdown-container">
        {/* Year Dropdown */}
        <select value={year} onChange={handleYearChange}>
          <option value="" disabled>Select a year</option>
          <option value="1">1st year</option>
          <option value="2">2nd year</option>
          <option value="3">3rd year</option>
        </select>

        {/* Stream Dropdown */}
        {year && (
          <select value={stream} onChange={handleStreamChange}>
            <option value="" disabled>Select a stream</option>
            <option value="information technology">Information Technology</option>
            <option value="Computer Science">Computer Science</option>
            <option value="plain">Plain</option>
          </select>
        )}

        {/* Semester Dropdown */}
        {stream && (
          <select value={semester} onChange={handleSemesterChange}>
            <option value="" disabled>Select a semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
          </select>
        )}

        {/* Subject Dropdown */}
        {semester && (
          <select>
            <option value="" disabled>Select Subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default TeacherHomepage;
