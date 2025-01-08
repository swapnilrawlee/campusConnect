import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const StudentRegisterPage2 = () => {
  const navigate = useNavigate();

  const [academicAchievements, setAcademicAchievements] = useState("");
  const [extracurricularActivities, setExtracurricularActivities] =
    useState("");
  const [certifications, setCertifications] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelation, setEmergencyContactRelation] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [languagesKnown, setLanguagesKnown] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataPage1 = JSON.parse(localStorage.getItem("formDataPage1"));
    const formDataPage2 = {
      academicAchievements,
      extracurricularActivities,
      certifications,
      emergencyContactName,
      emergencyContactRelation,
      emergencyContactNumber,
      languagesKnown,
      skills,
    };
    const finalData = { ...formDataPage1, ...formDataPage2 };
    console.log(finalData);
    

    try {
      const response = await axiosInstance.post("/students/studentprofile", {
        rollNumber: finalData.rollNumber,
        firstName: finalData.firstName,
        lastName: finalData.lastName,
        dateOfBirth: finalData.dateOfBirth,
        gender: finalData.gender,
        mobileNumber: finalData.mobileNumber,
        email: finalData.email,
        department: finalData.department,
        Course: finalData.course,
        YearOfStudy: finalData.YearOfStudy,
        CurrentSemester: finalData.CurrentSemester,
        enrollmentYear: finalData.enrollmentYear,
        permanentAddress: finalData.permanentAddress,
      });
sessionStorage.setItem("studentid", response.data.studentid);
const studentId = sessionStorage.getItem("studentid");

      const response1 = await axiosInstance.post("/students/academicdetails",{
        academicAchievements,
        extracurricularActivities,
        certifications,
        studentId
      })
      const response2 = await axiosInstance.post("/students/emergencycontact",{
        emergencyContactName,
        emergencyContactRelation,
        emergencyContactNumber,
        studentId
      })
      const response3 = await axiosInstance.post("/students/skillsandlanguages",{
        languagesKnown,
        skills,
        studentId
      })
      if (
        response.status === 200 &&
        response1.status === 200 &&
        response2.status === 200 &&
        response3.status === 200
      ) {
        alert("Successfully created");
        academicAchievements="";
        extracurricularActivities="";
        certifications="";
        emergencyContactName="";
        emergencyContactRelation="";
        emergencyContactNumber="";
        languagesKnown="";
        skills="";
      } else {
        alert("Error: One or more responses failed.");
      }
    } catch (error) {
      console.log(error);
    }
 
  

    // Clear localStorage after submission
    localStorage.removeItem("formDataPage1");
  };

  return (
    <div
      className="w-screen min-h-screen flex justify-center items-center sm-bg-contain bg-cover"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/2084249/pexels-photo-2084249.jpeg?auto=compress&cs=tinysrgb&w=600)",
      }}
    >
      <div className="sm:w-2/3 sm:bg-white m-auto p-10 gap-4 rounded-lg shadow-lg shadow-black flex flex-col items-center">
        <div className="flex justify-between w-full items-center gap-4">
          <i
            className="ri-arrow-left-line"
            onClick={() => navigate("/admin/student")}
          ></i>
          <h1 className="text-2xl  font-bold">Student Registration - Page 2</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex justify-around w-full sm:flex-row flex-col p-10 items-start gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="AcademicAchievements">Academic Achievements</label>
            <textarea
              className="p-2 border-2 border-black"
              name="AcademicAchievements"
              id="AcademicAchievements"
              value={academicAchievements}
              onChange={(e) => setAcademicAchievements(e.target.value)}
            />
            <label htmlFor="ExtracurricularActivities">
              Extracurricular Activities
            </label>
            <textarea
              className="p-2 border-2 border-black"
              name="ExtracurricularActivities"
              id="ExtracurricularActivities"
              value={extracurricularActivities}
              onChange={(e) => setExtracurricularActivities(e.target.value)}
            />
            <label htmlFor="Certifications">Certifications</label>
            <textarea
              className="p-2 border-2 border-black"
              name="Certifications"
              id="Certifications"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="EmergencyContactName">Emergency Contact Name</label>
            <input
              className="p-2 border-2 border-black"
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
              className="p-2 border-2 border-black"
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
              className="p-2 border-2 border-black"
              type="tel"
              name="EmergencyContactNumber"
              id="EmergencyContactNumber"
              value={emergencyContactNumber}
              onChange={(e) => setEmergencyContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
          
            <label htmlFor="LanguagesKnown">Languages Known</label>
            <textarea
              className="p-2 border-2 border-black"
              name="LanguagesKnown"
              id="LanguagesKnown"
              value={languagesKnown}
              onChange={(e) => setLanguagesKnown(e.target.value)}
            />
            <label htmlFor="Skills">Skills</label>
            <textarea
              className="p-2 border-2 border-black"
              name="Skills"
              id="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegisterPage2;
