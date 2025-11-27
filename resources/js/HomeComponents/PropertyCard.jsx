// import {
//   Bath,
//   BedDouble,
//   CarFront,
//   ChevronRight,
//   Heart,
//   MapPin,
//   Ruler,
// } from "lucide-react";
// import React from "react";

// function PropertyCard() {
//   const properties = [
//     {
//       id: 1,
//       image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
//       title: "Real Luxury Family House Villa",
//       location: "Est St, 77-Central Park South, NYC",
//       bedrooms: 6,
//       bathrooms: 3,
//       area: 720,
//       garages: 2,
//       price: 150000,
//     },
//     {
//       id: 2,
//       image:
//         "https://images.pexels.com/photos/27059631/pexels-photo-27059631.jpeg",
//       title: "Modern Downtown Loft",
//       location: "Est St, 77-Central Park South, NYC",
//       bedrooms: 6,
//       bathrooms: 3,
//       area: 720,
//       garages: 2,
//       price: 150000,
//     },
//     {
//       id: 3,
//       image:
//         "https://images.pexels.com/photos/23325566/pexels-photo-23325566.jpeg",
//       title: "Suburban Family Home",
//       location: "Est St, 77-Central Park South, NYC",
//       bedrooms: 6,
//       bathrooms: 3,
//       area: 720,
//       garages: 2,
//       price: 150000,
//     },
//     {
//       id: 4,
//       image: "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg",
//       title: "Luxury Penthouse Apartment",
//       location: "Est St, 77-Central Park South, NYC",
//       bedrooms: 6,
//       bathrooms: 3,
//       area: 720,
//       garages: 2,
//       price: 150000,
//     },
//     {
//       id: 5,
//       image:
//         "https://images.pexels.com/photos/5824520/pexels-photo-5824520.jpeg",
//       title: "Waterfront Villa with Pool",
//       location: "Est St, 77-Central Park South, NYC",
//       bedrooms: 6,
//       bathrooms: 3,
//       area: 720,
//       garages: 2,
//       price: 150000,
//     },
//     {
//       id: 6,
//       image:
//         "https://images.pexels.com/photos/5883725/pexels-photo-5883725.jpeg",
//       title: "Historic Brownstone Renovated",
//       location: "Est St, 77-Central Park South, NYC",
//       bedrooms: 6,
//       bathrooms: 3,
//       area: 720,
//       garages: 2,
//       price: 150000,
//     },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen py-8">
//       <div className="max-w-7xl mx-auto text-center px-4">
//         <h1 className="text-4xl font-semibold text-gray-800">
//           Featured Properties
//         </h1>
//         <h2 className="mb-10 text-xl font-normal mt-5 text-gray-600">
//           These are our featured properties
//         </h2>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           {properties.map((property) => (
//             <div
//               key={property.id}
//               className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden"
//             >
//               <div className="flex flex-col md:flex-row">
//                 <div className="md:w-1/2">
//                   <img
//                     className="w-full h-64 md:h-full object-cover"
//                     src={property.image}
//                     alt={property.title}
//                   />
//                 </div>
//                 <div className="md:w-1/2 p-5 flex flex-col justify-between">
//                   <div>
//                     <h3 className="font-semibold text-gray-800 text-left mb-2">
//                       {property.title}
//                     </h3>
//                     <div className="flex items-center text-sm text-gray-600 mb-4">
//                       <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
//                       <span>{property.location}</span>
//                     </div>

//                     <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
//                       <div className="flex items-center">
//                         <BedDouble className="w-4 h-4 mr-1" />
//                         <span>{property.bedrooms} Bedrooms</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Bath className="w-4 h-4 mr-1" />
//                         <span>{property.bathrooms} Bathrooms</span>
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
//                       <div className="flex items-center">
//                         <Ruler className="w-4 h-4 mr-1" />
//                         <span>{property.area} sq ft</span>
//                       </div>
//                       <div className="flex items-center">
//                         <CarFront className="w-4 h-4 mr-1" />
//                         <span>{property.garages} Garages</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border-t border-gray-200 pt-4 mt-4">
//                     <div className="flex items-center justify-between">
//                       <h4 className="text-lg font-semibold text-gray-900">
//                         ${property.price.toLocaleString()}
//                       </h4>
//                       <button
//                         aria-label="Save property"
//                         className="text-gray-600 hover:text-red-500 transition-colors focus:outline-none"
//                       >
//                         <Heart className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 flex justify-center">
//           <button className="flex justify-center items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
//             View More
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyCard;




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
import React, { useState } from "react";
import PropertyDetails from './PropertyDetails';

function PropertyCard() {
  const [selectedProperty, setSelectedProperty] = useState(null);

const properties = [
  {
    id: 1,
    images: [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
      "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg",
      "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg"
    ],
    title: "Luxury Single Room in Bagnati",
    location: "Budhanilkantha, Kathmandu",
    description: "Experience unparalleled luxury in this beautifully designed single room located in the serene neighborhood of Budhanilkantha. This spacious 250 sq ft room features premium finishes, large windows that flood the space with natural light, and a private attached bathroom with modern fixtures. The room comes fully furnished with a comfortable queen-sized bed, study desk, wardrobe, and sitting area. Enjoy access to shared amenities including a fully-equipped kitchen, laundry facilities, and a beautiful garden. Perfect for professionals and students seeking a peaceful yet convenient living space with high-speed WiFi and dedicated parking.",
    bedrooms: 1,
    bathrooms: 1,
    area: 250,
    garages: 1,
    price: 8000,
    period: "month",
    wifi: true,
    shared: false
  },
  {
    id: 2,
    images: [
      "https://images.pexels.com/photos/27059631/pexels-photo-27059631.jpeg",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg",
      "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
    ],
    title: "Modern Shared Room in City Center",
    location: "Kamalpokhari, Kathmandu",
    description: "Located in the heart of Kathmandu's bustling city center, this modern shared room offers the perfect blend of convenience and comfort. The 180 sq ft space is thoughtfully designed with two separate beds, personal storage units, and a shared bathroom that's maintained with utmost cleanliness. The property features a contemporary kitchen, cozy living area, and a balcony with city views. Ideal for students and young professionals, this shared accommodation includes high-speed WiFi, regular cleaning services, and is within walking distance to restaurants, shopping centers, and public transportation. A vibrant community atmosphere awaits in this prime location.",
    bedrooms: 1,
    bathrooms: 2,
    area: 180,
    garages: 0,
    price: 5500,
    period: "month",
    wifi: true,
    shared: true
  },
  {
    id: 3,
    images: [
      "https://images.pexels.com/photos/23325566/pexels-photo-23325566.jpeg",
      "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg",
      "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg"
    ],
    title: "Cozy Single Room with Attached Bath",
    location: "Patan Durbar Square, Lalitpur",
    description: "Nestled in the cultural heart of Patan near the historic Durbar Square, this cozy 200 sq ft single room combines traditional charm with modern comforts. The room features an attached bathroom, comfortable bedding, and elegant wooden furniture that reflects the area's rich heritage. Large windows offer views of the surrounding traditional architecture while providing excellent ventilation. Residents have access to a shared kitchen, courtyard, and rooftop terrace with panoramic views. The location offers easy access to museums, cafes, and cultural sites, making it perfect for those who appreciate history and convenience. High-speed WiFi and regular maintenance included.",
    bedrooms: 1,
    bathrooms: 1,
    area: 200,
    garages: 0,
    price: 7000,
    period: "month",
    wifi: true,
    shared: false
  },
  {
    id: 4,
    images: [
      "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg",
      "https://images.pexels.com/photos/1457845/pexels-photo-1457845.jpeg",
      "https://images.pexels.com/photos/271623/pexels-photo-271623.jpeg"
    ],
    title: "Premium Room with Mountain View",
    location: "Bhaktapur Durbar Area, Bhaktapur",
    description: "Wake up to breathtaking mountain views from this premium 220 sq ft room located in the ancient city of Bhaktapur. This beautifully appointed space features traditional Newari architecture blended with modern amenities, including an attached bathroom with hot water, comfortable seating area, and workspace. The room opens to a private balcony where you can enjoy your morning tea while admiring the Himalayan range. The property includes shared access to a traditional courtyard, modern kitchen facilities, and a meditation garden. Situated in the UNESCO World Heritage site area, you'll be surrounded by rich culture, traditional pottery squares, and authentic Newari cuisine.",
    bedrooms: 1,
    bathrooms: 1,
    area: 220,
    garages: 0,
    price: 7500,
    period: "month",
    wifi: true,
    shared: false
  },
  {
    id: 5,
    images: [
      "https://images.pexels.com/photos/5824520/pexels-photo-5824520.jpeg",
      "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg",
      "https://images.pexels.com/photos/271625/pexels-photo-271625.jpeg"
    ],
    title: "Lakeside Shared Room",
    location: "Fewa Lake, Pokhara",
    description: "Experience the tranquility of lakeside living in this beautifully maintained shared room just steps away from Fewa Lake in Pokhara. This 190 sq ft space offers two comfortable single beds with personal lockers and reading lamps. The room features large windows that capture the cool lake breeze and views of the surrounding hills. Shared facilities include a modern kitchen, spacious living area, and a beautiful garden with direct lake access. Perfect for travelers, students, or anyone seeking a peaceful retreat, this accommodation provides easy access to boating facilities, lakeside cafes, and adventure sports operators. High-speed WiFi and weekly cleaning services included.",
    bedrooms: 1,
    bathrooms: 2,
    area: 190,
    garages: 0,
    price: 6000,
    period: "month",
    wifi: true,
    shared: true
  },
  {
    id: 6,
    images: [
      "https://images.pexels.com/photos/5883725/pexels-photo-5883725.jpeg",
      "https://images.pexels.com/photos/1457844/pexels-photo-1457844.jpeg",
      "https://images.pexels.com/photos/271622/pexels-photo-271622.jpeg"
    ],
    title: "Bachelor Room with Kitchen Access",
    location: "Biratnagar Municipality, Morang",
    description: "This practical and affordable 210 sq ft bachelor room in Biratnagar offers excellent value for money with its convenient location and functional design. The room comes with a comfortable bed, study table, wardrobe, and personal storage space. While WiFi is not included, the room offers access to a shared kitchen where you can prepare your meals, helping you save on food costs. The property is located in a quiet neighborhood yet close to markets, hospitals, and educational institutions. Regular public transportation is easily accessible from the doorstep. This no-frills accommodation is perfect for budget-conscious students and working professionals seeking a comfortable living space in a developing commercial hub.",
    bedrooms: 1,
    bathrooms: 1,
    area: 210,
    garages: 0,
    price: 5000,
    period: "month",
    wifi: false,
    shared: false
  },
  {
    id: 7,
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
      "https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg",
      "https://images.pexels.com/photos/271621/pexels-photo-271621.jpeg"
    ],
    title: "Heritage Building Single Room",
    location: "Thamel, Kathmandu",
    description: "Live in a piece of Kathmandu's history with this beautifully restored single room in a traditional heritage building located in the vibrant Thamel area. This 180 sq ft room features original wooden carvings, exposed brick walls, and traditional windows that open to courtyard views. Despite its historical character, the room includes modern comforts like an attached bathroom with 24/7 hot water, comfortable bedding, and ample storage. The property offers shared access to a rooftop terrace with stunning views of the city and mountains, a common kitchen, and a peaceful courtyard garden. Located in the tourist hub of Kathmandu, you'll have endless dining, shopping, and entertainment options at your doorstep.",
    bedrooms: 1,
    bathrooms: 1,
    area: 180,
    garages: 0,
    price: 8500,
    period: "month",
    wifi: true,
    shared: false
  },
  {
    id: 8,
    images: [
      "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg",
      "https://images.pexels.com/photos/1457846/pexels-photo-1457846.jpeg",
      "https://images.pexels.com/photos/271620/pexels-photo-271620.jpeg"
    ],
    title: "Contemporary Shared Room",
    location: "Boudha, Kathmandu",
    description: "Immerse yourself in the spiritual atmosphere of Boudha while enjoying modern comforts in this contemporary shared room. This 170 sq ft space is designed for two occupants with comfortable single beds, personal storage solutions, and a shared bathroom that's cleaned daily. The room features large windows that provide plenty of natural light and views of the surrounding area. Shared amenities include a fully-equipped kitchen, meditation space, and a rooftop terrace with views of the Great Stupa. The location offers easy access to monasteries, meditation centers, and international cuisine. This accommodation is perfect for spiritual seekers, students, and professionals looking for a peaceful community living experience with high-speed WiFi and regular maintenance.",
    bedrooms: 1,
    bathrooms: 2,
    area: 170,
    garages: 0,
    price: 4800,
    period: "month",
    wifi: true,
    shared: true
  },
];

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto text-center px-4">
        <div className="mb-12">       
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Featured Rental Rooms
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover your perfect rental room from our curated selection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 relative overflow-hidden">
                  <img
                    className="w-full h-64 md:h-full object-cover transition-transform duration-500 hover:scale-105"
                    src={property.images[0]} // Use first image as main image
                    alt={property.title}
                  />
                  <div className="absolute top-4 right-4">
                    <button
                      aria-label="Save property"
                      className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full text-gray-700 hover:text-red-500 hover:bg-white transition-all shadow-lg"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-pink-600 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                      For Rent
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
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
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 text-left mb-3 hover:text-rose-600 transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-5">
                      <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0 text-rose-500" />
                      <span>{property.location}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <BedDouble className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-700 font-medium">{property.bedrooms} Room</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <Bath className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-700 font-medium">{property.bathrooms} {property.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <Ruler className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-700 font-medium">{property.area.toLocaleString()} sq ft</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                        <CarFront className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm text-gray-700 font-medium">{property.garages} {property.garages > 1 ? 'Parking' : 'Parking'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex flex-col gap-2 items-center">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Monthly Rent</p>
                        <h4 className="text-2xl font-bold text-rose-500">
                          Rs. {property.price.toLocaleString()}
                          <span className="text-sm font-normal text-gray-500 ml-1">/ {property.period}</span>
                        </h4>
                      </div>
                      <button 
                        onClick={() => handleViewDetails(property)}
                        className="bg-rose-500 text-white px-5 py-2.5 rounded-lg hover:bg-rose-700 transition-colors font-medium text-sm shadow-md hover:shadow-lg cursor-pointer"
                      >
                        View Room Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="group flex justify-center items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-full hover:from-rose-700 hover:to-red-700 transition-all shadow-lg hover:shadow-xl font-semibold">
            Explore All Rental Rooms
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
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