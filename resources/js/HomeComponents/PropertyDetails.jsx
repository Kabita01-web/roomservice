import React, { useState } from 'react';
import {
  Bath,
  BedDouble,
  CarFront,
  Heart,
  MapPin,
  Ruler,
  Wifi,
  Users,
  X,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PropertyDetails = ({ property, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) return null;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className='fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50'>
      <div className='bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-full sm:max-w-2xl md:max-w-4xl h-[650px] overflow-y-auto'>
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Gallery */}
        <div className="relative mb-6 rounded-xl overflow-hidden">
          <div className="relative">
            <img
              src={property.images[currentImageIndex]}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-64 sm:h-80 object-cover"
            />
            
            {/* Navigation Arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white transition-all shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-gray-900 hover:bg-white transition-all shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {property.images.length}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-gray-700 hover:text-red-500 hover:bg-white transition-all shadow-lg">
                <Heart className="w-5 h-5" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-gray-700 hover:text-blue-500 hover:bg-white transition-all shadow-lg">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          {property.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto py-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex 
                      ? 'border-rose-500 ring-2 ring-rose-200' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 text-indigo-600 mr-3" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 text-indigo-600 mr-3" />
                <span>{property.shared ? "Shared Room" : "Single Room"}</span>
              </div>
              {property.wifi && (
                <div className="flex items-center text-gray-600">
                  <Wifi className="w-5 h-5 text-indigo-600 mr-3" />
                  <span>WiFi Included</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <BedDouble className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-gray-700">{property.bedrooms} Room</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <Bath className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-gray-700">{property.bathrooms} {property.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <Ruler className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-gray-700">{property.area.toLocaleString()} sq ft</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <CarFront className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-gray-700">{property.garages} {property.garages > 1 ? 'Parkings' : 'Parking'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            This beautiful {property.shared ? "shared" : "single"} room located in {property.location} offers 
            {property.area} square feet of comfortable living space. Perfect for {property.shared ? "students or young professionals" : "individuals"} 
            looking for a cozy place in a great neighborhood. The property includes {property.bathrooms} 
            {property.bathrooms > 1 ? ' bathrooms' : ' bathroom'} and {property.garages} 
            {property.garages > 1 ? ' parking spaces' : ' parking space'}.
          </p>
        </div>

        {/* Price & Contact */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Monthly Rent</p>
              <h4 className="text-3xl font-bold text-rose-600">
                Rs. {property.price.toLocaleString()}
                <span className="text-base font-normal text-gray-500 ml-2">/ {property.period}</span>
              </h4>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Request a visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;