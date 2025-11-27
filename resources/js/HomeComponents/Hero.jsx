import React from "react";
import NavBar from "./NavBar";

function Hero() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[url('https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg')] bg-cover bg-center">
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 "></div>

      <NavBar />

      <div className="relative flex flex-col items-center justify-center flex-1 px-4 text-center z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl">
          Find Your Dream Room
        </h1>
        <h2 className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-xl font-normal text-white max-w-2xl">
          We Have Over a Million Properties For You.
        </h2>
      </div>
    </div>
  );
}

export default Hero;
