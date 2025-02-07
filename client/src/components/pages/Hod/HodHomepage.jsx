import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MyCalendar from "../../MyCalendar";
import useAxiosFetch from "../../CustomHook/useAxiosFetch";
import { jwtDecode } from "jwt-decode";
import TodoList from "../../TodoList";

const HodHomepage = () => {

  const [userName, setUserName] = useState("User");
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [id, setId] = useState("");

  // Decode JWT Token Function
  const decodeToken = (token) => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid Token", error);
      return null;
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const decodedData = decodeToken(token);

    if (decodedData) {
      setUserName(decodedData.name);
      setId(decodedData.id);
    }
  }, []);

  // Fetch Student & Staff Count
  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
  } = useAxiosFetch("/students/studentCount");
  const {
    data: staffData,
    loading: staffLoading,
    error: staffError,
  } = useAxiosFetch("/staff/staffCount");

  useEffect(() => {
    if (studentData?.data?.totalStudents !== undefined) {
      setTotalStudents(studentData.data.totalStudents);
    }
    if (staffData?.data?.totalStaff !== undefined) {
      setTotalStaff(staffData.data.totalStaff);
    }
  }, [studentData, staffData]);


  // Greeting Logic
  const time = new Date();
  const hours = time.getHours();
  const formattedTime = `${hours % 12 || 12}:${time.getMinutes().toString().padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
  const greeting =
    hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : hours < 21 ? "Good Evening" : "Good Night";

  return (
    <div className="flex gap-4 w-screen min-h-screen">
      <Navbar />
      <div className="min-h-screen p-10 w-[80%] flex-col flex gap-4">
        {/* Greeting Section */}
        <div className="bg-[#511A1A] w-[80%] text-white rounded-lg p-5">
          <h1 className="text-2xl">
            Welcome, {userName}! {greeting}
          </h1>
          <p>{formattedTime}</p>
        </div>

        {/* Dashboard Panels */}
        <div className="flex w-full gap-4 mx-auto">
          {/* Overview Panel */}
          <div className="border border-black w-[30%] p-4 min-h-[40%] flex flex-col gap-6 shadow-md shadow-black">
            <h1 className="text-xl font-extrabold font-serif">Overview Panel</h1>
            {studentLoading || staffLoading ? (
              <p>Loading...</p>
            ) : studentError || staffError ? (
              <p>Error loading data.</p>
            ) : (
              <>
                <p className="font-semibold">Active Students: {totalStudents}</p>
                <p className="font-semibold">Active Teachers: {totalStaff}</p>
                <p className="font-semibold">Ongoing Classes: 4</p>
                <p className="font-semibold">Upcoming Deadlines: 2 approvals pending</p>
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="border border-black w-[30%] p-4 min-h-[40%] flex flex-col gap-6 shadow-md shadow-black">
            <h1 className="text-xl font-extrabold font-serif">Quick Actions</h1>
            <button className="bg-[#0B930B] text-start p-2 rounded-lg text-white">
              Approve Pending Leave Requests
            </button>
            <button className="bg-[#CD5E03] text-start p-2 rounded-lg text-white">
              Announce Urgent Updates
            </button>
          </div>

          {/* Notifications */}
          <div className="border border-black w-[30%] p-4 min-h-[40%] flex flex-col gap-6 shadow-md shadow-black">
            <h1 className="text-xl font-extrabold font-serif">Notifications</h1>
            <p className="bg-[#2B419C] p-2 rounded-xl text-white">
              Recent Update: New class schedule uploaded.
            </p>
            <p className="bg-[#9B0B25] p-2 rounded-xl text-white">
              Alert: Teacher John Doe is absent today.
            </p>
            <p className="bg-[#CD5E03] p-2 rounded-xl text-white">
              Reminder: Faculty meeting on 15th Jan at 3 PM.
            </p>
          </div>
        </div>

    
      <TodoList/>
    
      </div>
    </div>
  );
};

export default HodHomepage;
