import React, { useEffect } from 'react';
import StudentNavbar from './StudentNavbar';
import gsap from 'gsap';

const StudentLibrary = () => {
  useEffect(() => {
    const t2 = gsap.timeline({ repeat: -1, yoyo: true });
    t2.to('.letters span', {
      duration: 1,
      rotate: 360, // Rotates each letter by 360 degrees
      scale: 1.2,
      opacity: 1, // Makes the letters more visible
      ease: 'elastic',
      stagger: 0.1, // Adds delay between letters for better animation
    });
  }, []);

  const message = "Coming Soon...";

  return (
    <div className="w-screen min-h-screen flex gap-4 bg-gray-100">
      <StudentNavbar />
      <div className="w-[70%] flex justify-center items-center">
        <h1 className="text-6xl font-bold flex gap-2">
          <span className="letters">
            {message.split("").map((letter, index) => (
           <span key={index} className="inline-block">
           {letter === " " ? "\u00A0" : letter}
         </span>
            ))}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default StudentLibrary;
