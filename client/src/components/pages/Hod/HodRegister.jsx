import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HodRegister = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [subjects, setSubjects] = useState("");
  const [publications, setPublications] = useState("");
  const [achievements, setAchievements] = useState("");
  const [languages, setLanguages] = useState("");
  const [skills, setSkills] = useState("");

  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    const CheckHandler = () => {
        const date = new Date();
        const birthDate = new Date(dateOfBirth);
        if (birthDate >= date) {
          alert("Date of Birth should be less than the current date");
          return;  // Prevent form submission if validation fails
        }
        
        const joining = new Date(joiningDate);
        if (joining > date) {
          alert("Joining Date should be less than or equal to the current date");
          return;  // Prevent form submission if validation fails
        }
      };

    CheckHandler();
    
    const formData = {
      employeeID,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      mobileNumber,
      email,
      password,
      department,
      designation,
      qualification,
      specialization,
      experienceYears,
      joiningDate,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactNumber,
      permanentAddress,
      subjects,
      publications,
      achievements,
      languages,
      skills,
    };
    console.log(formData);
  };

  const handleReset = () => {
    setEmployeeID("");
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setGender("");
    setMobileNumber("");
    setEmail("");
    setPassword("");
    setDepartment("");
    setDesignation("");
    setQualification("");
    setSpecialization("");
    setExperienceYears("");
    setJoiningDate("");
    setEmergencyContactName("");
    setEmergencyContactRelation("");
    setEmergencyContactNumber("");
    setPermanentAddress("");
    setSubjects("");
    setPublications("");
    setAchievements("");
    setLanguages("");
    setSkills("");
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center " style={{backgroundImage: 
        "url(https://img.freepik.com/free-vector/monochrome-grainy-effect-background_91008-303.jpg?t=st=1735937374~exp=1735940974~hmac=c0dd16c0614c74597f88bec9b84037026860550e0fd0a98ad202c9da3fd647c1&w=996)",
    }}>
      <div className="bg-white  p-10 gap-4 rounded-lg shadow-lg  flex flex-col items-center">
        <div className="w-full flex justify-between items-center">
        <i className="ri-arrow-left-line flex items-start w-full justify-start" onClick={() => navigate("/admin")}></i>
        <h1 className="text-2xl font-bold">Teacher Registration Page</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-evenly items-start gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="EmployeeID">Employee ID</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="EmployeeID"
              id="EmployeeID"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              required
            />

            <label htmlFor="FirstName">First Name</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="FirstName"
              id="FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <label htmlFor="LastName">Last Name</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="LastName"
              id="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <label htmlFor="DateOfBirth">Date of Birth</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="date"
              name="DateOfBirth"
              id="DateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />

            <label htmlFor="Gender">Gender</label>
            <div className="flex">
              <input
                className="outline-none rounded-xl  p-2 w-full border-2 border-black"
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />{" "}
              Male
              <input
                className="outline-none rounded-xl  p-2 w-full border-2 border-black"
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                required
              />{" "}
              Female
            </div>

            <label htmlFor="MobileNumber">Mobile Number</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="tel"
              name="MobileNumber"
              id="MobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />

         

            <label htmlFor="Password">Password</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="password"
              name="Password"
              id="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
          <label htmlFor="Email">Email</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="email"
              name="Email"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="Department">Department</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="Department"
              id="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />

            <label htmlFor="Designation">Designation</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="Designation"
              id="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />

            <label htmlFor="Qualification">Qualification</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="Qualification"
              id="Qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            />

            <label htmlFor="Specialization">Specialization</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="Specialization"
              id="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />

            <label htmlFor="ExperienceYears">Experience Years</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="number"
              name="ExperienceYears"
              id="ExperienceYears"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              required
            />

            <label htmlFor="JoiningDate">Joining Date</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="date"
              name="JoiningDate"
              id="JoiningDate"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="EmergencyContactName">Emergency Contact Name</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
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
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
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
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="tel"
              name="EmergencyContactNumber"
              id="EmergencyContactNumber"
              value={emergencyContactNumber}
              onChange={(e) => setEmergencyContactNumber(e.target.value)}
              required
            />

            <label htmlFor="PermanentAddress">Permanent Address</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="PermanentAddress"
              id="PermanentAddress"
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="Subjects">Subjects</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="Subjects"
              id="Subjects"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
            />

            <label htmlFor="Publications">Publications</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="Publications"
              id="Publications"
              value={publications}
              onChange={(e) => setPublications(e.target.value)}
            />

            <label htmlFor="Achievements">Achievements</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="Achievements"
              id="Achievements"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
            />

            <label htmlFor="languages">Languages</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="languages"
              id="languages"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
            />

            <label htmlFor="Skills">Skills</label>
            <input
              className="outline-none rounded-xl  p-2 w-full border-2 border-black"
              type="text"
              name="Skills"
              id="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              type="submit"
            >
              Register
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              type="button"
              onClick={() => {
                handleReset();
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HodRegister;
