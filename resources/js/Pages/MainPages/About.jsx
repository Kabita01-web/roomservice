import React from "react";
import NavBar from "@/HomeComponents/NavBar";
import Footer from "@/HomeComponents/Footer";
import Choose from "@/HomeComponents/Choose";


function About() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-800">
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <div className="relative h-[60vh] bg-[url('https://images.pexels.com/photos/6893945/pexels-photo-6893945.jpeg')] bg-cover bg-center flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40"></div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-2xl mb-4 tracking-tight">
            ABOUT US
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/90 text-lg">
            <a href="/" className="hover:text-pink-400 transition-colors duration-300">
              Home
            </a>
            <span className="text-pink-400">/</span>
            <span className="text-pink-400 font-medium">About Us</span>
          </div>
        </div>
      </div>

      {/* Main About Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Main About Card */}
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                <h2 className="text-4xl font-bold text-gray-900">
                  About{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">
                    GharBhada
                  </span>
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg mb-4">
                Welcome to <span className="font-semibold text-gray-800">GharBhada</span>, your trusted partner in finding the perfect
                rental home. We understand that searching for a rental property
                can be a daunting task, and we're here to make it easier for you.
                Our mission is to connect tenants with landlords and property
                managers, ensuring a smooth and hassle-free rental experience.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                We believe that finding a home shouldn't be complicated. That's
                why we've built a user-friendly platform where anyone can browse,
                post, and connect easily — all in one place. Proudly based in
                <span className="font-semibold text-gray-800"> Nepal</span>, GharBhada understands local housing needs and aims to make
                renting more transparent, convenient, and community-driven.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-pink-50 to-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-pink-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-pink-500 text-white p-3 rounded-xl shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                At GharBhada, our vision is to create a world where finding a home
                is a seamless and enjoyable experience for everyone. We strive to
                empower individuals and families by providing them with the tools
                and resources they need to make informed decisions about their
                housing options.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-blue-500 text-white p-3 rounded-xl shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our mission is to connect tenants with landlords and property
                managers, ensuring a smooth and hassle-free rental experience. We
                are committed to providing a platform that is easy to use,
                reliable, and trustworthy. We aim to foster a sense of community
                among renters and landlords, promoting transparency and open
                communication.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-blue-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <img
                src="https://images.pexels.com/photos/8243467/pexels-photo-8243467.jpeg"
                alt="About GharBhada"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Building Communities</h4>
                  <p className="text-gray-600">Connecting people with their perfect homes across Nepal</p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>

      {/* Choose Section */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <Choose />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;