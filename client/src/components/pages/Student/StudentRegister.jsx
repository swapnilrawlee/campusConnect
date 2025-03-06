import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const [studentID, setStudentID] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [currentSemester, setCurrentSemester] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("");
  const [academicAdvisor, setAcademicAdvisor] = useState("");
  const [academicAchievements, setAcademicAchievements] = useState("");
  const [extracurricularActivities, setExtracurricularActivities] = useState("");
  const [certifications, setCertifications] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [languagesKnown, setLanguagesKnown] = useState("");
  const [skills, setSkills] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      studentID,
      rollNumber,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      mobileNumber,
      email,
      department,
      course,
      yearOfStudy,
      currentSemester,
      enrollmentYear,
      academicAdvisor,
      academicAchievements,
      extracurricularActivities,
      certifications,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactNumber,
      permanentAddress,
      languagesKnown,
      skills,
    };
    // console.log(formData);
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center  " >
      <div className="bg-white w-full p-10 gap-4 rounded-lg shadow-lg flex flex-col items-center bg-auto bg-gradient-to-t	 bg-no-repeat bg-right-bottom	"  style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/illustration-notebook-icon_53876-5858.jpg?t=st=1736023478~exp=1736027078~hmac=951658a3796c5be69844aac254acfa2695bae045d454f27ce8102fdf3db04293&w=740)",
      }} >
      <div className="w-full flex justify-between items-center">
      <i className="ri-arrow-left-line flex items-start w-full justify-start" onClick={() => navigate("/admin")}></i>
        <h1 className="text-2xl font-bold">Student Registration Page</h1>
      </div>
        <form onSubmit={handleSubmit} className="flex w-full justify-evenly items-start gap-4  ">
          <div className="flex flex-col gap-2  w-full p-4  rounded-lg">
            <label htmlFor="RollNumber">Roll Number</label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="text"
              name="RollNumber"
              id="RollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />

            <label htmlFor="FirstName">First Name</label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="text"
              name="FirstName"
              id="FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <label htmlFor="LastName">Last Name</label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="text"
              name="LastName"
              id="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <label htmlFor="DateOfBirth">Date of Birth</label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="date"
              name="DateOfBirth"
              id="DateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />

            <label htmlFor="Gender">Gender</label>
            <div className="flex gap-4">
              <input
                className="outline-none p-2 w-full border-2 border-black"
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              /> Male
              <input
                className="outline-none p-2 w-full border-2 border-black"
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              /> Female
              <input
                className="outline-none p-2 w-full border-2 border-black"
                type="radio"
                name="gender"
                value="Other"
                checked={gender === "Other"}
                onChange={(e) => setGender(e.target.value)}
              /> Other
            </div>

            <label htmlFor="MobileNumber">Mobile Number</label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="tel"
              name="MobileNumber"
              id="MobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />

            <label htmlFor="Email">Email</label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="email"
              name="Email"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2  w-full p-4  rounded-lg">
            <label htmlFor="Department">Department</label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="text"
              name="Department"
              id="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />

            <label htmlFor="Course">Course</label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="text"
              name="Course"
              id="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />

            <label htmlFor="YearOfStudy">Year of Study</label>
            <select
              className="outline-none p-2 w-full border-2 border-black"
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
              className="outline-none p-2 w-full border-2 border-black"
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
              className="outline-none p-2 w-full border-2 border-black"
              type="number"
              name="EnrollmentYear"
              id="EnrollmentYear"
              value={enrollmentYear}
              onChange={(e) => setEnrollmentYear(e.target.value)}
              required
            />
               <label htmlFor="LanguagesKnown">Languages Known</label>
            <textarea
              className="outline-none p-2 w-full border-2 border-black"
              name="LanguagesKnown"
              id="LanguagesKnown"
              value={languagesKnown}
              onChange={(e) => setLanguagesKnown(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2  w-full p-4  rounded-lg">
            <label htmlFor="AcademicAdvisor">Academic Advisor</label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="text"
              name="AcademicAdvisor"
              id="AcademicAdvisor"
              value={academicAdvisor}
              onChange={(e) => setAcademicAdvisor(e.target.value)}
            />

            <label htmlFor="AcademicAchievements">Academic Achievements</label>
            <textarea
              className="outline-none p-2 w-full border-2 border-black"
              name="AcademicAchievements"
              id="AcademicAchievements"
              value={academicAchievements}
              onChange={(e) => setAcademicAchievements(e.target.value)}
            />

            <label htmlFor="ExtracurricularActivities">Extracurricular Activities</label>
            <textarea
              className="outline-none p-2 w-full border-2 border-black"
              name="ExtracurricularActivities"
              id="ExtracurricularActivities"
              value={extracurricularActivities}
              onChange={(e) => setExtracurricularActivities(e.target.value)}
            />

            <label htmlFor="Certifications">Certifications</label>
            <textarea
              className="outline-none p-2 w-full border-2 border-black"
              name="Certifications"
              id="Certifications"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
            />
               <label htmlFor="Skills">Skills</label>
            <textarea
              className="outline-none p-2 w-full border-2 border-black"
              name="Skills"
              id="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2  w-full p-4  rounded-lg">
            <label htmlFor="EmergencyContactName">Emergency Contact Name</label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="text"
              name="EmergencyContactName"
              id="EmergencyContactName"
              value={emergencyContactName}
              onChange={(e) => setEmergencyContactName(e.target.value)}
              required
            />

            <label htmlFor="EmergencyContactRelation">
              Emergency Contact Relation
            </label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="text"
              name="EmergencyContactRelation"
              id="EmergencyContactRelation"
              value={emergencyContactRelation}
              onChange={(e) => setEmergencyContactRelation(e.target.value)}
              required
            />

            <label htmlFor="EmergencyContactNumber">
              Emergency Contact Number
            </label>
            <input
              className="outline-none p-2 w-full border-2 border-black"
              type="tel"
              name="EmergencyContactNumber"
              id="EmergencyContactNumber"
              value={emergencyContactNumber}
              onChange={(e) => setEmergencyContactNumber(e.target.value)}
              required
            />

            <label htmlFor="PermanentAddress">Permanent Address</label>
            <textarea
              className="outline-none p-2 w-full border-2 border-black"
              name="PermanentAddress"
              id="PermanentAddress"
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
              required
            />

         

         

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              type="submit"
            >
              Register
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              type="reset"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
