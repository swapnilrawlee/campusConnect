import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HodRegisterPage1 = () => {
  const navigate = useNavigate();

  const [employeeID, setEmployeeID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  

  const isFormValid =
    employeeID &&
    firstName &&
    lastName &&
    dateOfBirth &&
    gender &&
    mobileNumber &&
    email &&
    role;

  const handleNext = () => {
    const formData = {
      employeeID,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      mobileNumber,
      email,
      role,
    };
    localStorage.setItem("formDataPage1", JSON.stringify(formData)); // Save to localStorage
    navigate("/admin/hodregisterpage2"); // Navigate to the next page
  };

  return (
    <div
      className="w-screen min-h-screen flex justify-center items-center bg-cover  sm:bg-contain "
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/2084249/pexels-photo-2084249.jpeg?auto=compress&cs=tinysrgb&w=600)",
      }}
    >
      <div className="sm:bg-white sm:w-[70vw] p-10 gap-4 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex justify-between w-full items-center gap-4">
          <i
            className="ri-arrow-left-line text-2xl cursor-pointer hover:text-gray-600"
            onClick={() => navigate("/admin")}
            title="Go back"

          ></i>
          <h1 className="text-2xl font-bold">Page 1: Basic Information</h1>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-evenly w-full p-10 sm:flex-row flex-col items-start gap-4 capitalize"
        >
          <div className="flex flex-col gap-4">
            <select
              name="role"
              className="p-2 border-2 border-black"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" defaultValue="">
                Select a role
              </option>
              <option value="hod">Hod</option>
              <option value="teacher">Teacher</option>
            </select>

            <label htmlFor="EmployeeID">Employee ID</label>
            <input
              className="p-2 border-2 border-black"
              type="number"
              id="EmployeeID"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              required
            />
            <label htmlFor="FirstName">First Name</label>
            <input
              className="p-2 border-2 border-black capitalize"
              type="text"
              id="FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label htmlFor="LastName">Last Name</label>
            <input
              className="p-2 border-2 border-black capitalize"
              type="text"
              id="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label htmlFor="DateOfBirth">Date of Birth</label>
            <input
              className="p-2 border-2 border-black"
              type="date"
              id="DateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="Gender">Gender</label>
            <div className="flex gap-4">
              <input
                className="p-2 border-2 border-black"
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
              <input
                className="p-2 border-2 border-black"
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Female
            </div>
            <label htmlFor="MobileNumber">Mobile Number</label>
            <input
              className="p-2 border-2 border-black"
              type="tel"
              id="MobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            <label htmlFor="Email">Email</label>
            <input
              className="p-2 border-2 border-black"
              type="email"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleNext}
              className={`${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white font-bold py-2 px-4 rounded-lg`}
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

export default HodRegisterPage1;
