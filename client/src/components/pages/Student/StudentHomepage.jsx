import React, { useContext, useEffect, useState } from 'react'
import UsernameContext from '../../utils/CreateContext'
import { NavLink } from 'react-router-dom'
import StudentNavbar from './StudentNavbar'
import axios from 'axios'
import Calendar from 'react-calendar'
import MyCalendar from '../../smallComponents/MyCalendar'
import EventPage from '../../smallComponents/EventPage'

const StudentHomepage = () => {
  const userdetails = JSON.parse(sessionStorage.getItem('userdetails'));
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [greet, setGreet] = useState('');
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    handleClick();
    WeatherApi();
  }, []);

  const handleClick = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    let timeOfDay;
    if (hours < 12) {
      timeOfDay = " Good Morning";
    } else if (hours < 18) {
      timeOfDay = " Good Afternoon";
    } else if (hours < 21) {
      timeOfDay = " Good Evening";
    } else {
      timeOfDay = " Good Night";
    }
    setHours(hours);
    setMinutes(minutes);
    setGreet(timeOfDay);
  };

  const WeatherApi = async () => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=1284ea18df9d31cafd3165c6b33bebe6&units=metric"
      );
      // console.log(response);
      
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className='w-screen min-h-screen m-auto flex gap-4  '>
   <StudentNavbar/>
    <div className='w-[70%]  px-6'>
      <div className='flex justify-between  p-2 mt-10'>
        <div>

      <h1 className='text-2xl font-bold font-serif ' >{greet} , {userdetails.FirstName +" " + userdetails.LastName} </h1>
      <p className="text-lg  text-muted-foreground">
                {hours}:{minutes} {hours > 12 ? "pm" : "am"}
              </p>
        </div>
        <div className='flex justify-center items-center'>

              <span className="mr-2 weather text-lg">
                {weather?.name}, {weather?.sys?.country ?? "IN"}
              </span>
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
                alt="Weather Icon"
                className="w-8 h-8"
                />
              <span className="ml-2 text-2xl font-bold">
                {weather?.main?.temp ?? "--"}°C
              </span>
                </div>
              </div>


      
<div className=' w-[80%] '>

<div>
</div>
</div>
    </div>
    </div>
  )
}

export default StudentHomepage
