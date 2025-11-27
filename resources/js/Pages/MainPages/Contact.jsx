import Footer from "@/HomeComponents/Footer";
import NavBar from "@/HomeComponents/NavBar";
import {
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  Send,
} from "lucide-react";
import React, { useState } from "react";


function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert("Thank you for contacting us! We'll get back to you soon.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-[url('https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="relative flex flex-col items-center justify-center text-center z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-200 mb-4 max-w-2xl">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="flex items-center gap-2 text-white/90">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="font-semibold">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Contact Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">         
          <div className="w-full h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.925266147456!2d83.98299247531948!3d28.209583075898347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595006e47a60f%3A0x872668dd53b61b80!2sPokhara%20chauthe!5e0!3m2!1sen!2snp!4v1760083223022!5m2!1sen!2snp"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Send Us a Message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Details Card */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8191959/pexels-photo-8191959.jpeg')] bg-cover bg-center opacity-20"></div>
            
            <div className="relative p-8 lg:p-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Contact Information</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Have a question or need assistance? Our team is here to help. Reach out to us through any of the following channels.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="bg-red-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Office Address</h3>
                      <p className="text-gray-300">123 Main Street, Pokhara, Nepal</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-red-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Phone Numbers</h3>
                      <p className="text-gray-300">+977 26182932</p>
                      <p className="text-gray-300">+977 9837492929</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-red-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <MessageCircle className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:example@gmail.com"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        example@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="bg-red-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Working Hours</h3>
                      <p className="text-gray-300">Monday - Friday</p>
                      <p className="text-gray-300">9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;