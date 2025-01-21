import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentRegisterPage1 = () => {
  const navigate = useNavigate();

  const [rollNumber, setRollNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [currentSemester, setCurrentSemester] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");

  const isFormValid =
    rollNumber &&
    firstName &&
    lastName &&
    dateOfBirth &&
    gender &&
    mobileNumber &&
    email &&
    course &&
    yearOfStudy &&
    currentSemester &&
    permanentAddress &&
    enrollmentYear;

  const handleNext = () => {
    const formData = {
      rollNumber,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      mobileNumber,
      email,
      course,
      yearOfStudy,
      currentSemester,
      enrollmentYear,
      permanentAddress,
      password,
    };
    localStorage.setItem("formDataPage1", JSON.stringify(formData)); // Save to localStorage
    navigate("/admin/StudentRegisterPage2"); // Navigate to the next page
  };

  return (
    <div
      className="w-screen min-h-screen flex justify-center items-center  sm:bg-contain bg-cover"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/2084249/pexels-photo-2084249.jpeg?auto=compress&cs=tinysrgb&w=600)",
      }}
    >
      <div className="sm:w-[80vw] sm:bg-white m-auto  p-10 gap-4 rounded-lg shadow-lg shadow-black flex flex-col items-center">
        <div className="flex justify-between w-full items-center gap-4">
          <i
            className="ri-arrow-left-line"
            onClick={() => navigate(-1)}
          ></i>
          <h1 className="text-2xl font-bold">Student Registration - Page 1</h1>
        </div>
        <form className="flex justify-between w-full p-10 items-start gap-4 flex-col sm:flex-row">
          <div className="flex flex-col gap-2">
            <label htmlFor="RollNumber">Roll Number</label>
            <input
              className=" p-2 border-2 border-black"
              type="text"
              name="RollNumber"
              id="RollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
            <label htmlFor="FirstName">First Name</label>
            <input
              className=" p-2 border-2 border-black"
              type="text"
              name="FirstName"
              id="FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label htmlFor="LastName">Last Name</label>
            <input
              className=" p-2 border-2 border-black"
              type="text"
              name="LastName"
              id="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
           
            <label htmlFor="Gender">Gender</label>
            <div className="flex gap-4">
              <input
                className=" p-2 border-2 border-black"
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
              <input
                className=" p-2 border-2 border-black"
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
              <input
                className=" p-2 border-2 border-black"
                type="radio"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Other
            </div>
           
          </div>
          <div className="flex flex-col gap-2">
          <label htmlFor="DateOfBirth">Date of Birth</label>
            <input
              className=" p-2 border-2 border-black"
              type="date"
              name="DateOfBirth"
              id="DateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
           <label htmlFor="MobileNumber">Mobile Number</label>
            <input
              className=" p-2 border-2 border-black"
              type="tel"
              name="MobileNumber"
              id="MobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            <label htmlFor="Email">Email</label>
            <input
              className=" p-2 border-2 border-black"
              type="email"
              name="Email"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="PermanentAddress">Permanent Address</label>
            <textarea
              className="p-2 border-2 border-black"
              name="PermanentAddress"
              id="PermanentAddress"
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="Course">Course</label>
            <input
              className=" p-2 border-2 border-black"
              type="text"
              name="Course"
              id="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
            <label htmlFor="YearOfStudy">Year of Study</label>
            <select
              className=" p-2 border-2 border-black"
              name="YearOfStudy"
              id="YearOfStudy"
              value={yearOfStudy}
              onChange={(e) => setYearOfStudy(e.target.value)}
              required
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>

            <label htmlFor="CurrentSemester">Current Semester</label>
            <select
              className=" p-2 border-2 border-black"
              name="CurrentSemester"
              id="CurrentSemester"
              value={currentSemester}
              onChange={(e) => setCurrentSemester(e.target.value)}
              required
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>

            <label htmlFor="EnrollmentYear">Enrollment Year</label>
            <input
              className=" p-2 border-2 border-black"
              type="number"
              name="EnrollmentYear"
              id="EnrollmentYear"
              value={enrollmentYear}
              onChange={(e) => setEnrollmentYear(e.target.value)}
              required
            />

            <button
              className={`${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white font-bold py-2 px-4 rounded-lg`}
              type="button"
              onClick={() => handleNext()}
              disabled={!isFormValid}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegisterPage1;
