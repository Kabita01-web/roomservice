import React from 'react';
import { FileText, Users, Home, CreditCard, Shield, AlertTriangle, Scale, CheckCircle } from 'lucide-react';
import NavBar from '@/HomeComponents/NavBar';
import Footer from '@/HomeComponents/Footer';


const TermsandConditions = () => {
  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Account Registration",
      content: "To use our platform, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must be at least 18 years old to register. You agree to notify us immediately of any unauthorized use of your account."
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Property Listings",
      content: "Property owners must provide accurate descriptions, photos, and pricing information for their listings. You warrant that you have the right to rent the property and comply with all local laws and regulations. Misleading or fraudulent listings are strictly prohibited and may result in account termination. All listings are subject to our review and approval."
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Bookings and Payments",
      content: "When you book a room, you enter into a binding agreement with the property owner. Payment must be made through our secure platform. We charge a service fee for facilitating bookings. Cancellation policies vary by property and are clearly stated in each listing. Refunds are processed according to the applicable cancellation policy."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "User Conduct",
      content: "You agree to use our platform lawfully and respectfully. Prohibited activities include harassment, discrimination, posting offensive content, attempting to bypass our payment system, or using the platform for any illegal purposes. We reserve the right to suspend or terminate accounts that violate these terms."
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Liability and Disclaimers",
      content: "We provide the platform as-is without warranties of any kind. We are not responsible for the condition, safety, or legality of listed properties, the accuracy of listings, or the ability of users to complete transactions. Property owners are solely responsible for their properties and interactions with guests. You use our services at your own risk."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Dispute Resolution",
      content: "In the event of disputes between users, we encourage direct communication and resolution. While we may assist in facilitating resolutions, we are not obligated to intervene. For unresolved disputes, you agree to attempt mediation before pursuing legal action. Any legal proceedings shall be governed by the laws of our jurisdiction."
    }
  ];

  const keyPoints = [
    "You must be 18 or older to use this platform",
    "All users must provide accurate and truthful information",
    "Property owners are responsible for the accuracy of their listings",
    "Service fees apply to all bookings and are non-refundable",
    "Cancellation policies are set by individual property owners",
    "We reserve the right to modify these terms at any time",
    "Users are responsible for all taxes related to their activities",
    "We may suspend accounts that violate our terms"
  ];

  return (
    <div className="">
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
        {/* Acceptance of Terms */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-[#8B7355] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using our room rental platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree with any part of these terms, you must not use our services. These terms constitute a legally binding agreement between you and our platform.
              </p>
            </div>
          </div>
        </div>

        {/* Key Points Summary */}
        <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] rounded-2xl shadow-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Key Points to Remember
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Sections */}
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

        {/* Intellectual Property */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Intellectual Property Rights</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            All content on our platform, including text, graphics, logos, images, and software, is the property of our company or our licensors and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By posting content on our platform, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content in connection with our services. You retain ownership of your content and are responsible for ensuring you have the necessary rights to post it.
          </p>
        </div>

        {/* Privacy and Data */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy and Data Protection</h3>
          <p className="text-gray-700 leading-relaxed">
            We are committed to protecting your privacy and personal information. Our collection, use, and disclosure of personal data are governed by our Privacy Policy, which is incorporated into these Terms and Conditions by reference. By using our platform, you consent to our data practices as described in the Privacy Policy.
          </p>
        </div>

        {/* Termination */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Termination</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to suspend or terminate your account and access to our services at any time, with or without notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users, us, or third parties, or for any other reason in our sole discretion.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You may terminate your account at any time by contacting our support team. Upon termination, your right to use our services will immediately cease. Provisions that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h3>
          <p className="text-gray-700 leading-relaxed">
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services. Our total liability shall not exceed the amount you paid us in the twelve months prior to the event giving rise to the liability.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Changes to Terms</h3>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms and Conditions at any time. We will notify you of material changes by posting the updated terms on our platform and updating the effective date. Your continued use of our services after such modifications constitutes your acceptance of the updated terms. We encourage you to review these terms periodically.
          </p>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Governing Law and Jurisdiction</h3>
          <p className="text-gray-700 leading-relaxed">
            These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in our jurisdiction for the resolution of any disputes arising out of or relating to these terms or your use of our services.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] rounded-2xl shadow-lg p-8 mt-8 text-white">
          <div className="flex items-start gap-4">
            <FileText className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold mb-3">Questions About These Terms?</h3>
              <p className="leading-relaxed mb-4">
                If you have any questions or concerns regarding these Terms and Conditions, please contact our legal team:
              </p>
              <div className="space-y-2">
                <p className="font-medium">Email: legal@roomrental.com</p>
                <p className="font-medium">Phone: +1 (555) 123-4567</p>
                <p className="font-medium">Address: 123 Legal Avenue, Suite 200, City, State 12345</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Acknowledgment */}
       
      </div>
      <Footer/>
    </div>
  );
};

export default TermsandConditions;