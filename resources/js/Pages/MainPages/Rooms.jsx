import React, { useState, useEffect } from "react";
import {
    Search,
    Home,
    Bed,
    Bath,
    Maximize2,
    MapPin,
    Heart,
} from "lucide-react";
import NavBar from "@/HomeComponents/NavBar";
import Footer from "@/HomeComponents/Footer";
import axios from "axios";
import PropertyDetails from "@/HomeComponents/PropertyDetails";

const Rooms = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [favorites, setFavorites] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Property Details Modal State
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showPropertyDetails, setShowPropertyDetails] = useState(false);

    // Fetch properties from API
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get("/ourproperty");

                if (response.data.status && response.data.data) {
                    const transformedProperties = response.data.data.map(
                        (property) => ({
                            id: property.id,
                            title: property.title,
                            description:
                                property.description ||
                                "No description available",
                            location: property.location,
                            bedrooms: property.bedrooms,
                            bathrooms: property.bathrooms,
                            size: property.size,
                            property_type: property.property_type,
                            price: parseFloat(property.price),
                            slug: property.slug || `property-${property.id}`,
                            garages: property.garages || 0,
                            shared: property.shared || false,
                            wifi: property.wifi || true,
                            period: "month",
                            image:
                                property.images && property.images.length > 0
                                    ? `/storage/${property.images[0].image_path}`
                                    : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
                            allImages:
                                property.images && property.images.length > 0
                                    ? property.images.map(
                                          (img) => `/storage/${img.image_path}`
                                      )
                                    : [
                                          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
                                      ],
                        })
                    );

                    setProperties(transformedProperties);
                    setFilteredProperties(transformedProperties);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                console.error("Error fetching properties:", err);
                setError("Failed to load properties. Please try again later.");
                setProperties([]);
                setFilteredProperties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Filter properties based on criteria
    useEffect(() => {
        let filtered = [...properties];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (property) =>
                    property.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    property.location
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    property.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        // Property type filter
        if (selectedType !== "all") {
            filtered = filtered.filter(
                (property) => property.property_type === selectedType
            );
        }

        setFilteredProperties(filtered);
    }, [searchTerm, selectedType, properties]);

    const toggleFavorite = (id) => {
        setFavorites((prev) => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    };

    const handleViewDetails = (property) => {
        setSelectedProperty(property);
        setShowPropertyDetails(true);
    };

    const handleCloseDetails = () => {
        setShowPropertyDetails(false);
        setSelectedProperty(null);
    };

    // Get unique property types from properties
    const propertyTypes = [
        "all",
        ...new Set(properties.map((p) => p.property_type)),
    ].filter(Boolean); // Remove any null/undefined values

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedType("all");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <NavBar />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-600">Loading properties...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error && properties.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                <NavBar />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <Home className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <p className="text-red-500 mb-2">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100">
            <NavBar />

            <div className="relative h-[60vh] bg-[url('https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg')] bg-cover bg-center flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
                <div className="relative flex flex-col items-center justify-center text-center z-10 px-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Find Your Perfect Space
                    </h1>
                    <p className="text-lg text-gray-200 mb-4 max-w-2xl">
                        Discover properties that match your lifestyle and budget
                    </p>
                    <div className="flex items-center gap-2 text-white/90">
                        <a
                            href="/"
                            className="hover:text-white transition-colors"
                        >
                            Home
                        </a>
                        <span>/</span>
                        <span className="font-semibold">Properties</span>
                    </div>
                </div>
            </div>

            {/* Filters Section - Always Visible */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <div className=" p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">
                            Filter Properties
                        </h3>
                        <button
                            onClick={clearFilters}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {/* Search Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <div className="relative">
                                <Search 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                    size={20} 
                                />
                                <input
                                    type="text"
                                    placeholder="Search properties..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Property Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Type
                            </label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                {propertyTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type === "all"
                                            ? "All Types"
                                            : type.charAt(0).toUpperCase() +
                                              type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {filteredProperties.length} Properties Available
                    </h2>
                    <div className="text-sm text-gray-600">
                        Showing {filteredProperties.length} of{" "}
                        {properties.length} properties
                    </div>
                </div>

                {/* Property Grid */}
                {filteredProperties.length === 0 ? (
                    <div className="text-center py-16">
                        <Home
                            size={64}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No properties found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your filters or search criteria
                        </p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => (
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
                                            e.target.src =
                                                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80";
                                        }}
                                    />
                                    <button
                                        onClick={() =>
                                            toggleFavorite(property.id)
                                        }
                                        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
                                    >
                                        <Heart
                                            size={20}
                                            className={
                                                favorites.has(property.id)
                                                    ? "fill-red-500 text-red-500"
                                                    : "text-gray-600"
                                            }
                                        />
                                    </button>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {property.property_type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                                        {property.title}
                                    </h3>

                                    <div className="flex items-center text-gray-600 mb-4">
                                        <MapPin size={16} className="mr-1" />
                                        <span className="text-sm">
                                            {property.location}
                                        </span>
                                    </div>

                                    {/* Features */}
                                    <div className="flex items-center gap-4 mb-4 text-gray-700">
                                        <div className="flex items-center gap-1">
                                            <Bed size={18} />
                                            <span className="text-sm">
                                                {property.bedrooms}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Bath size={18} />
                                            <span className="text-sm">
                                                {property.bathrooms}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Maximize2 size={18} />
                                            <span className="text-sm">
                                                {property.size} sq ft
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price and CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <div>
                                            <span className="text-2xl font-bold text-blue-600">
                                                NPR{" "}
                                                {property.price.toLocaleString()}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                /month
                                            </span>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleViewDetails(property)
                                            }
                                            className="bg-rose-500 text-white px-5 py-2.5 rounded-lg hover:bg-rose-700 transition-colors font-medium text-sm shadow-md hover:shadow-lg cursor-pointer"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Property Details Modal */}
            {showPropertyDetails && selectedProperty && (
                <PropertyDetails
                    property={selectedProperty}
                    onClose={handleCloseDetails}
                />
            )}

            <Footer />
        </div>
    );
};

export default Rooms;