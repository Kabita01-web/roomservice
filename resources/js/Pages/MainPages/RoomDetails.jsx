import React, { useState } from "react";
import { MapPin, Bed, Bath, Maximize, DollarSign, User, Wifi, Coffee, Dumbbell } from "lucide-react";

const RoomDetails = ({ room }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Safely handle images array
  const images = room?.images?.map(img => 
    img.image_path ? `/storage/${img.image_path}` : img
  ) || [];

  return (
    <>
      {/* Hero Section with Background */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat w-full h-[40vh] md:h-[70vh] flex items-center justify-center"
        style={{ 
          backgroundImage: `url(${images[0] || 'https://via.placeholder.com/1200x600'})` 
        }}
      >
        <div className="absolute inset-0 bg-gray-900/60"></div>
        <div className="relative z-10 text-center px-4">
          <h2 className='uppercase text-3xl md:text-5xl font-semibold text-white'>Property Details</h2>
          <p className='text-emerald-500 mt-4 text-md uppercase'>
            <span className='text-white'>Home</span> / Property
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 md:py-12">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <img 
              className='w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg' 
              src={images[selectedImage] || 'https://via.placeholder.com/800x500'} 
              alt={room?.title || 'Property'}
            />
            
            {/* Thumbnail Gallery */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-6">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    className={`w-full h-24 md:h-32 object-cover rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-4 border-emerald-500 opacity-100 scale-105' 
                        : 'border-2 border-gray-300 opacity-70 hover:opacity-100 hover:border-emerald-400'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {/* Property Info */}
            <div className="mt-8 md:mt-12">
              <span className="text-emerald-600 uppercase text-sm tracking-wider font-semibold">
                {room?.property_type || 'Luxury Property'}
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold mt-2 text-gray-800">
                {room?.title || 'Property Title'}
              </h2>
              
              <div className="flex items-center gap-2 mt-3 text-gray-600">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <p>{room?.location || 'Location not specified'}</p>
              </div>
              
              <h3 className="text-2xl font-semibold mt-8 text-emerald-600">Description</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {room?.description || 'No description available.'}
              </p>

              {/* Property Video Section - Optional */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-emerald-600">Property Video</h3>
                <video className="w-full mt-4 rounded-lg shadow-md" controls>
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Location Map */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-emerald-600">Location</h3>
                <div className="w-full h-[400px] md:h-[450px] mt-4">
                  <iframe
                    title="Property Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.925266147456!2d83.98299247531948!3d28.209583075898347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595006e47a60f%3A0x872668dd53b61b80!2sPokhara%20chauthe!5e0!3m2!1sen!2snp!4v1760083223022!5m2!1sen!2snp"
                    className="w-full h-full border-0 rounded-lg shadow-md"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-24">
              <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>
                {room?.title || 'Property Details'}
              </h2>
              
              <div className="space-y-6 mt-6">
                <div>
                  <div className="flex items-center gap-4">
                    <Bed className="w-6 h-6 text-emerald-600" />
                    <p className='text-gray-600'>
                      <span className="font-medium">Bedrooms:</span> {room?.bedrooms || 'N/A'}
                    </p>
                  </div>
                  <div className="border-b border-gray-200 mt-4"></div>
                </div>

                <div>
                  <div className="flex items-center gap-4">
                    <Bath className="w-6 h-6 text-emerald-600" />
                    <p className='text-gray-600'>
                      <span className="font-medium">Bathrooms:</span> {room?.bathrooms || 'N/A'}
                    </p>
                  </div>
                  <div className="border-b border-gray-200 mt-4"></div>
                </div>

                <div>
                  <div className="flex items-center gap-4">
                    <Maximize className="w-6 h-6 text-emerald-600" />
                    <p className='text-gray-600'>
                      <span className="font-medium">Area:</span> {room?.size || 'N/A'}
                    </p>
                  </div>
                  <div className="border-b border-gray-200 mt-4"></div>
                </div>

                <div>
                  <div className="flex items-center gap-4">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                    <p className='text-gray-600'>
                      <span className="font-medium">Price:</span> ${room?.price ? room.price.toLocaleString() : 'N/A'}
                    </p>
                  </div>
                  <div className="border-b border-gray-200 mt-4"></div>
                </div>
              </div>

              {/* Amenities Section */}
              <h3 className='text-xl font-semibold text-gray-800 mt-8 mb-4'>Amenities</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-emerald-600" />
                  <p className='text-gray-600'>2 - 5 Persons</p>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-emerald-600" />
                  <p className='text-gray-600'>Free Wifi Internet</p>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-emerald-600" />
                  <p className='text-gray-600'>Breakfast</p>
                </div>
                <div className="flex items-center gap-3">
                  <Dumbbell className="w-5 h-5 text-emerald-600" />
                  <p className='text-gray-600'>Gym Facilities</p>
                </div>
              </div>

              {/* Contact Button */}
              <button className="mt-8 w-full border-2 uppercase border-emerald-600 bg-emerald-600 hover:bg-emerald-700 hover:border-emerald-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-semibold">
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomDetails;