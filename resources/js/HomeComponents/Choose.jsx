import React from "react";

function Choose() {
  const features = [
    {
      title: "Wide Range Of Properties",
      description:
        "We offer an extensive selection of homes, apartments, and villas that fit every lifestyle and budget. Whether you’re looking for a cozy studio or a luxury estate, our listings cover it all.",
      icon: "https://code-theme.com/html/findhouses/images/icons/icon-4.svg",
    },
    {
      title: "Trusted by thousands",
      description:
        "Our reputation is built on trust and transparency. Thousands of satisfied clients have found their dream homes through us, and we continue to earn their confidence every day.",
      icon: "https://code-theme.com/html/findhouses/images/icons/icon-5.svg",
    },
    {
      title: "Financing made easy",
      description:
        "We make the buying process simple with flexible financing options and expert guidance. Our team helps you find the best deals so you can own your home without stress.",
      icon: "https://code-theme.com/html/findhouses/images/icons/icon-6.svg",
    },
    {
      title: "We are here near you",
      description:
        "Wherever you are, we’re just a step away. With local agents and dedicated support, we’re always nearby to help you find the perfect property in your area.",
      icon: "https://code-theme.com/html/findhouses/images/icons/icon-15.svg",
    },
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          Why Choose Us
        </h1>
        <p className="text-lg mt-4 text-gray-600 mx-auto">
          We provide full service at every step.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col items-center text-center min-h-[22rem]"
          >
            <div className="flex justify-center mb-4">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-24 h-24 object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {feature.title}
            </h2>
            <p className="text-sm text-gray-600 flex-grow">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Choose;
