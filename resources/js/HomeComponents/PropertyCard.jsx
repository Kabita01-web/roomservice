// PropertyCard.jsx - Updated to show only 4 properties
import {
  Bath,
  BedDouble,
  CarFront,
  ChevronRight,
  Heart,
  MapPin,
  Ruler,
  Wifi,
  Users,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import PropertyDetails from './PropertyDetails';
import { Link } from '@inertiajs/react';
import axios from 'axios';

function PropertyCard() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imgurl = import.meta.env.VITE_IMAGE_PATH;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(route("ourproperty.index"));
        
        if (response.data && response.data.data) {
          // Transform the API data to match your component structure
          const transformedProperties = response.data.data.map((property, index) => ({
            id: property.id,
            title: property.title,
            description: property.description || "No description available",
            location: property.location,
            price: parseFloat(property.price),
            period: "month",
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            size: parseInt(property.size) || 0,
            area: parseInt(property.size) || 0, // Keep for compatibility
            garages: property.garages || 1,
            shared: property.shared || false,
            wifi: property.wifi || true,
            slug: property.slug,
            property_type: property.property_type || 'Apartment', // Add property_type
            
            // Handle images - ensure we have proper image URLs
            image: property.images && property.images.length > 0 
              ? property.images[0].image_path && (property.images[0].image_path.startsWith('http://') || property.images[0].image_path.startsWith('https://'))
                ? property.images[0].image_path
                : `${imgurl}/${property.images[0].image_path}`
              : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
            
            // All images for details view
            allImages: property.images && property.images.length > 0 
              ? property.images.map(img => {
                  if (img.image_path && (img.image_path.startsWith('http://') || img.image_path.startsWith('https://'))) {
                    return img.image_path;
                  }
                  return img.image_path ? `${imgurl}/${img.image_path}` : null;
                }).filter(img => img !== null)
              : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'],
          }));
          
          // Store all properties but we'll only display first 4
          setProperties(transformedProperties);
        } else {
          setError("No properties data found");
          setProperties([]);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError("Failed to load properties. Please try again later.");
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Get first 4 properties to display
  const displayProperties = properties.slice(0, 4);

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto text-center px-4">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && properties.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto text-center px-4">
          <div className="flex flex-col justify-center items-center h-96">
            <div className="text-lg text-red-600 mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#6F86C9] hover:bg-[#5E75B8] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-9 text-center">       
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Featured Rental Rooms
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your perfect rental room from our curated selection
          </p>
        </div>

        {/* Results Section */}
        <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"> {/* Changed to 4 columns */}
              {displayProperties.map((property) => ( // Using displayProperties instead of properties
                <div
                  key={property.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80';
                      }}
                    />
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                    >
                      <Heart
                        size={20}
                        className={favorites.has(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                      />
                    </button>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#6F86C9] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        For Rent
                      </span>
                    </div>
                    {/* Additional badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {property.wifi && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Wifi className="w-3 h-3" />
                          WiFi
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        property.shared 
                          ? "bg-orange-500 text-white" 
                          : "bg-purple-500 text-white"
                      }`}>
                        <Users className="w-3 h-3" />
                        {property.shared ? "Shared" : "Single"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate hover:text-[#6F86C9] transition-colors">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={16} className="mr-1 text-rose-500" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    {/* Features */}
                    <div className="flex items-center gap-4 mb-4 text-gray-700">
                      <div className="flex items-center gap-1">
                        <BedDouble size={18} className="text-[#6F86C9]" />
                        <span className="text-sm">{property.bedrooms} {property.bedrooms > 1 ? 'Rooms' : 'Room'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={18} className="text-[#6F86C9]" />
                        <span className="text-sm">{property.bathrooms} {property.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Ruler size={18} className="text-[#6F86C9]" />
                        <span className="text-sm">{property.size.toLocaleString()} sq ft</span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Monthly Rent</p>
                        <span className="text-2xl font-bold text-[#6F86C9]">
                          Rs. {property.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-sm">/ {property.period}</span>
                      </div>
                      <button 
                        onClick={() => handleViewDetails(property)}
                        className="bg-[#6F86C9] hover:bg-[#5E75B8] text-white px-5 py-2.5 rounded-lg transition-colors font-medium text-sm shadow-md hover:shadow-lg cursor-pointer"
                      >
                        View Room Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Only show "Explore All" button if we have more than 4 properties */}
        {properties.length > 4 && (
          <div className="mt-12 flex justify-center">
            <a
              href="/rooms"
              className="group flex items-center gap-2 px-8 py-4
              bg-gradient-to-r from-[#6F86C9] to-[#5E75B8]
              text-white rounded-full
              hover:from-[#5E75B8] hover:to-[#4F66A6]
              transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              Explore All Rental Rooms ({properties.length} total)
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetails 
          property={selectedProperty} 
          onClose={handleCloseDetails} 
        />
      )}
    </div>
  );
}

export default PropertyCard;