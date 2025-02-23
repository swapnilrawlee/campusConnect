import React, { useEffect } from "react";
import gsap from "gsap";

const NotFound = () => {
  useEffect(() => {
    const t2 = gsap.timeline({ repeat: -1, yoyo: true });
    // Animating letters
    t2.to(".letters span", {
      duration: 2,
      rotate: 360, // Rotates each letter by 360 degrees
      scale: 1.2,
      opacity: 1, // Makes the letters more visible
      ease: "elastic",
      stagger: 0.1,
    });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    // Timeline for child divs
    tl.to(".child-div", {
      duration: 1,
      scale: 1.1,
      ease: "elastic",
      stagger: 0.3,
    }).to(".child-div:nth-last-child(2)", {
      // Correct selector for second-to-last div
      duration: 1,
      rotation: -9, // Roates the second last div by -6 degrees
      ease: "elastic",
    });
  }, []);

  return (
    <div className="flex justify-center items-center relative gap-2  main-container w-screen h-screen">
      <h1 className="absolute letters text-3xl font-bold z-10 text-red-600  backdrop-blur-0 top-20">
        {"404 PAGE...".split("").map((letter, index) => (
          <span key={index} className="inline-block">
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
      <div className="child-div bg-blue-800 flex justify-center items-center w-[10vh] rounded-2xl h-[40vh]">
        <div className="bg-red-200 w-[1vw] rounded-2xl h-1/2 p-2"></div>
      </div>
      <div className="child-div bg-orange-800 flex justify-center items-center w-[10vh] rounded-2xl h-[40vh]">
        <div className="bg-red-200 w-[1vw] rounded-2xl h-1/2 p-2"></div>
      </div>
      <div className="child-div bg-red-800 flex justify-center items-center w-[10vh] rounded-2xl h-[40vh]">
        <div className="bg-red-200 w-[1vw] rounded-2xl h-1/2 p-2"></div>
      </div>
      <div className="child-div ml-2 bg-slate-500 flex justify-center items-center w-[10vh] rounded-2xl h-[40vh]">
        <div className="bg-red-200 w-[1vw] rounded-2xl h-1/2 p-2"></div>
      </div>
      <h1 className="absolute letters text-3xl font-bold z-10 text-red-600  backdrop-blur-0 bottom-20">
        {"Not Found ...".split("").map((letter, index) => (
          <span key={index} className="inline-block">
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default NotFound;
