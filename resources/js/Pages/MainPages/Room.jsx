import Footer from "@/HomeComponents/Footer";
import NavBar from "@/HomeComponents/NavBar";
import React from "react";


function Room() {
  const roomDetails = {
    id: 1,
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    image2: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    image3: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    image4: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    title: "Real Luxury Family House Villa",
    location: "Est St, 77-Central Park South, NYC",
    description:
      "This stunning family house villa offers unparalleled luxury and comfort in the heart of the city. With spacious living areas, modern amenities, and exquisite design, it's the perfect home for those seeking elegance and convenience. Enjoy breathtaking views, a private garden, and top-of-the-line facilities that cater to your every need.",
  };
  const PropertyDetails = {
    title: "Room Details",
    id: 1,
    bedrooms: 4,
    bathrooms: 3,
    area: "3500 sqft",
    price: "$1,200,000",
  };
  return (
    <div>
      <NavBar />
      <div className="grid sm:grid-cols-1 bg-gray-400 md:grid-cols-2 lg:grid-cols-4  p-10">
        <img src={roomDetails.image} alt="" className="w-100 h-100 mt-10" />
        <img src={roomDetails.image2} alt="" className="w-100 h-100 mt-10" />
        <img src={roomDetails.image3} alt="" className="w-100 h-100 mt-10" />
        <img src={roomDetails.image4} alt="" className="w-100 h-100 mt-10" />
      </div>
      <div className="mt-5 px-6 float-left max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold ">{roomDetails.title}</h1>
        <p className=" text-gray-500 mt-2">{roomDetails.location}</p>
        <h1 className="text-3xl font font-semibold mb-4 mt-4 text-pink-500">
          Description
        </h1>
        <p className=" text-gray-700 ">{roomDetails.description}</p>
      </div>
      <div className="mt-5 py-4 px-2 ml-200 max-w-md items-center mx-auto shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold">{PropertyDetails.title}</h1>
        <p className="mt-2 text-gray-700">
          Bedrooms: {PropertyDetails.bedrooms}
        </p>
        <p className="mt-2 text-gray-700">
          Bathrooms: {PropertyDetails.bathrooms}
        </p>
        <p className="mt-2 text-gray-700">Area: {PropertyDetails.area}</p>
        <p className="mt-2 text-gray-700">Price: {PropertyDetails.price}</p>
        <button className="mt-4 w-50 bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
          Contact Now
        </button>
      </div>
      <div className="mt-5 px-6  max-w-5xl h-120 mx-auto shadow-md rounded-lg">
        <h1 className="text-2xl text-pink-500 font-semibold">Property Video</h1>
        <video className="w-full h-100 mt-4 rounded-lg" controls></video>
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
      </div>
      <div className="grid grid-cols-1 gap-10 max-w-7xl mx-auto my-20 px-4 ">
        <div className="bg-white p-5  rounded-lg shadow-lg">
          <h1 className="text-2xl text-pink-500 font-semibold"> LOCATION</h1>

          <div className="w-full h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.925266147456!2d83.98299247531948!3d28.209583075898347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595006e47a60f%3A0x872668dd53b61b80!2sPokhara%20chauthe!5e0!3m2!1sen!2snp!4v1760083223022!5m2!1sen!2snp"
              className="w-full p-2 h-full  border-0 rounded-lg shadow-md grid"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Room;
