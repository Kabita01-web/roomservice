import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import React, { useState } from "react";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "Working with this team has been an absolute game-changer for our business. Their attention to detail and commitment to excellence is unmatched.",
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    },
    {
      id: 2,
      text: "Exceptional service and outstanding results. They transformed our vision into reality and exceeded all our expectations from start to finish.",
      name: "Michael Chen",
      role: "Founder, GrowthLab",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    },
    {
      id: 3,
      text: "The level of professionalism and expertise is remarkable. Our project was delivered on time and the quality was beyond what we imagined.",
      name: "Emily Rodriguez",
      role: "Director, InnovateCo",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      id: 4,
      text: "I've never experienced such dedication and creativity. They truly care about their clients and it shows in every aspect of their work.",
      name: "David Park",
      role: "VP of Marketing, BrandHub",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    },
    {
      id: 5,
      text: "Outstanding collaboration from day one. Their innovative approach and problem-solving skills helped us achieve incredible results.",
      name: "Jessica Williams",
      role: "COO, NextGen Solutions",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    },
    {
      id: 6,
      text: "Simply the best in the business. Their expertise and passion for what they do is evident in every interaction and deliverable.",
      name: "Robert Anderson",
      role: "Managing Partner, Apex Group",
      image:
        "https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg",
    },
    {
      id: 7,
      text: "The results speak for themselves - our revenue increased by 45% after implementing their strategies. A truly transformative partnership.",
      name: "Amanda Thompson",
      role: "Marketing Director, GlobalTech",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    },
    {
      id: 8,
      text: "Their team went above and beyond to ensure our success. The dedication and expertise they brought to the table was exceptional.",
      name: "James Wilson",
      role: "CTO, FutureSystems",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      id: 9,
      text: "From concept to execution, every step was handled with precision and care. We couldn't be happier with the final outcome.",
      name: "Lisa Martinez",
      role: "Product Manager, CloudNine",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
    },
    {
      id: 10,
      text: "They delivered exactly what we needed, when we needed it. The communication throughout the project was flawless.",
      name: "Kevin Brown",
      role: "Operations Director, Streamline Inc",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    },
    {
      id: 11,
      text: "Innovative solutions combined with exceptional execution. They helped us solve complex challenges with elegant simplicity.",
      name: "Rachel Green",
      role: "VP of Innovation, TechVenture",
      image:
        "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg",
    },
    {
      id: 12,
      text: "The quality of work exceeded our highest expectations. They're not just service providers; they're true partners in growth.",
      name: "Thomas Lee",
      role: "Founder, Digital Dynamics",
      image:
        "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg",
    },
    {
      id: 13,
      text: "Working with them felt like having an extension of our own team. The collaboration was seamless and highly productive.",
      name: "Olivia Parker",
      role: "CEO, Creative Solutions",
      image:
        "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
    },
    {
      id: 14,
      text: "They brought fresh perspectives and cutting-edge solutions that transformed our approach to digital transformation.",
      name: "Daniel Kim",
      role: "Technology Director, NextWave",
      image:
        "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg",
    },
    {
      id: 15,
      text: "The attention to detail and strategic thinking they demonstrated throughout our engagement was truly impressive.",
      name: "Sophia Carter",
      role: "Head of Product, Visionary Labs",
      image:
        "https://images.pexels.com/photos/3760736/pexels-photo-3760736.jpeg",
    },
    {
      id: 16,
      text: "They delivered a solution that not only met but far exceeded our requirements. The ROI has been tremendous.",
      name: "Brian Taylor",
      role: "Finance Director, Enterprise Plus",
      image:
        "https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  // Get current testimonials
  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their experience
            working with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex mb-4">
                <Quote className="w-8 h-8 text-rose-400" fill="currentColor" />
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 min-h-32">
                {testimonial.text}
              </p>

              <div className="flex items-center pt-6 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-4 border-rose-100 object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-gray-900 font-semibold text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls with Chevrons */}
        <div className="flex justify-center items-center space-x-4 relative">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-3 rounded-full border transition-all duration-200 absolute left-2 bottom-48 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-3 rounded-full border transition-all duration-200 absolute right-2 bottom-48 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-white text-gray-700 border-gray-300 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600"
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
