import React from "react";
import NavBar from "./NavBar";
import BlurText from "./BlurText";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

function Hero() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[url('https://images.pexels.com/photos/34582723/pexels-photo-34582723.jpeg')] bg-cover bg-center">
      
      {/* Navbar */}
      <div className="relative z-20">
        <NavBar />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center flex-1 px-4 text-center z-20">
        
        {/* Animated Heading */}
        <BlurText
          text="Find Your Dream Room"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5"
        />

        {/* Subtitle */}
         <BlurText
          text="We Have Over a Million Properties For You."
          delay={300}
          className="mt-4 text-base sm:text-lg md:text-xl text-white"
        />


      </div>
    </div>
  );
}

export default Hero;
