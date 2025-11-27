import React from 'react';
import { Shield, Lock, Eye, UserCheck, Database, FileText, Mail, AlertCircle } from 'lucide-react';
import NavBar from '@/HomeComponents/NavBar';
import Footer from '@/HomeComponents/Footer';


const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: "We collect information you provide directly to us when creating an account, listing a property, or booking a room. This includes your name, email address, phone number, payment information, and property details. We also automatically collect certain information about your device and how you interact with our platform."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and protect against fraudulent or illegal activity. We may also use your information to personalize your experience and send you promotional communications."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Information Sharing",
      content: "We share your information with service providers who perform services on our behalf, such as payment processing and data analysis. When you book a room, we share necessary information with the property owner. We may also share information when required by law or to protect our rights and safety."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information at any time through your account settings. You may also opt out of receiving promotional communications from us. For data deletion requests or privacy concerns, please contact our support team."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to collect information about your browsing activities. This helps us improve our services, remember your preferences, and provide relevant advertisements. You can control cookies through your browser settings."
    }
  ];

  return (
    <div className="">
      {/* Header */}
      <NavBar/>
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


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#8B7355] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to our room rental platform. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully to understand our practices regarding your personal data.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#D9CFC7] rounded-xl flex items-center justify-center text-[#8B7355]">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Third Party Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Services</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our platform may contain links to third-party websites and services. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any personal information.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We may use third-party service providers for payment processing, analytics, and customer support. These providers have access to your personal information only to perform specific tasks on our behalf and are obligated to protect your data.
          </p>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Children's Privacy</h3>
          <p className="text-gray-700 leading-relaxed">
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately so we can delete such information.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Policy</h3>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] rounded-2xl shadow-lg p-8 mt-8 text-white">
          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold mb-3">Contact Us</h3>
              <p className="leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please don't hesitate to contact us:
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: privacy@roomrental.com</p>
                <p className="font-medium">Phone: +1 (555) 123-4567</p>
                <p className="font-medium">Address: 123 Privacy Lane, Suite 100, City, State 12345</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
       
      </div>
       <Footer/>
    </div>
  );
};

export default PrivacyPolicy;