import React from "react";
import NavBar from "./NavBar";
import BlurText from "./BlurText";


const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

function Hero() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070')] bg-cover bg-center">
      
      {/* Navbar */}
      <div className="relative z-20">
        <NavBar />
      </div>

      {/* Overlay */}
        <div className="relative flex flex-col items-center justify-center flex-1 px-4 text-center z-20 max-w-5xl mx-auto">
        
        {/* Animated Heading */}
        <BlurText
          text="पोखरा तपाईंको सपनाको कोठा"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight"
        />

        {/* English Subtitle */}
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/95 mb-4">
          Find Your Dream Room in Pokhara
        </p>

        {/* Subtitle */}
        <BlurText
          text="सस्तो, सुरक्षित र सजिलो। पोखरा उपत्यकाका हजारौं कोठा र फ्ल्याटहरू।"
          delay={300}
          className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wide max-w-3xl mb-2"
        />
        
        <p className="text-base sm:text-lg md:text-xl text-white/85 font-light max-w-2xl">
          Affordable, Safe & Easy. Thousands of rooms and flats across Pokhara Valley.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12">
          <a href="/rooms" className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
            कोठा खोज्नुहोस् / Browse Rooms
          </a>
          <a href="/contact" className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
            सम्पर्क गर्नुहोस् / Contact Us
          </a>
        </div>

      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
    </div>
  );
}

export default Hero;
