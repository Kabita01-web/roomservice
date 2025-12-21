import React, { useState } from 'react';
import { Search, MessageCircle, BookOpen, HelpCircle, Phone, Mail, Clock, ChevronDown, ChevronUp, Users, Home, CreditCard, Shield, Settings, FileText } from 'lucide-react';
import NavBar from '@/HomeComponents/NavBar';
import Footer from '@/HomeComponents/Footer';


const Help = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const supportCategories = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Account & Profile",
      description: "Manage your account settings, profile information, and security preferences",
      link: "#account"
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Property Listings",
      description: "Learn how to create, edit, and optimize your property listings",
      link: "#listings"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Bookings & Payments",
      description: "Understand the booking process, payment methods, and refund policies",
      link: "#bookings"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety & Security",
      description: "Stay safe with our verified listings and secure payment system",
      link: "#safety"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Technical Support",
      description: "Get help with technical issues, bugs, and platform functionality",
      link: "#technical"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Policies & Guidelines",
      description: "Review our terms, conditions, and community guidelines",
      link: "#policies"
    }
  ];

  const faqs = [
    {
      category: "Account",
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button in the top right corner, enter your email address, create a password, and fill in your basic information. You'll receive a verification email to activate your account."
    },
    {
      category: "Account",
      question: "I forgot my password. What should I do?",
      answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
    },
    {
      category: "Bookings",
      question: "How do I book a room?",
      answer: "Browse available properties, select your desired dates, review the listing details and pricing, then click 'Book Now'. You'll need to provide payment information and agree to the property's terms before confirming."
    },
    {
      category: "Bookings",
      question: "What is the cancellation policy?",
      answer: "Cancellation policies vary by property and are clearly stated on each listing. Generally, you can cancel within 24-48 hours for a full refund. Review the specific policy before booking."
    },
    {
      category: "Payments",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and select digital payment methods. All transactions are processed securely through our encrypted payment system."
    },
    {
      category: "Payments",
      question: "When will I receive my refund?",
      answer: "Refunds are processed within 5-7 business days of cancellation approval. The time it takes for the funds to appear in your account depends on your bank or card provider."
    },
    {
      category: "Listings",
      question: "How do I list my property?",
      answer: "Click 'List Your Property' in the navigation menu, provide detailed information about your space, upload high-quality photos, set your pricing and availability, and submit for review. Our team typically approves listings within 24 hours."
    },
    {
      category: "Listings",
      question: "What makes a good listing?",
      answer: "Include clear, high-quality photos, write detailed descriptions highlighting unique features, set competitive pricing, maintain accurate availability, and respond promptly to inquiries. Properties with complete information and good reviews get more bookings."
    },
    {
      category: "Safety",
      question: "How do you verify properties?",
      answer: "All property owners must verify their identity and provide proof of ownership or authorization to rent. We also encourage reviews from guests to maintain transparency and accountability."
    },
    {
      category: "Safety",
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and secure payment processors. We never store your complete credit card information on our servers and comply with PCI DSS standards."
    }
  ];

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      availability: "Available 24/7",
      action: "Start Chat",
      color: "from-[#8B7355] to-[#A0826D]"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      description: "support@roomrental.com",
      availability: "Response within 24 hours",
      action: "Send Email",
      color: "from-[#8B7355] to-[#A0826D]"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Call Now",
      color: "from-[#8B7355] to-[#A0826D]"
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <NavBar/>
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-[url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="relative flex flex-col items-center justify-center text-center z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            How Can We Help You?
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl">
            Find answers to your questions or get in touch with our support team
          </p>
          
          {/* Search Bar */}
      

          <div className="flex items-center gap-2 text-white/90 mt-6">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="font-semibold">Help & Support</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Support Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Browse by Category</h2>
          <p className="text-gray-600 text-center mb-8">Select a topic to find helpful resources</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category, index) => (
              <a
                key={index}
                href={category.link}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#D9CFC7] rounded-xl flex items-center justify-center text-[#8B7355]">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-8 h-8 text-[#8B7355]" />
              <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#8B7355] transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-[#D9CFC7] text-[#8B7355] text-xs font-semibold rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#8B7355] flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-6 pb-4 pt-2 bg-gray-50">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No FAQs found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        
        

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-[#8B7355] to-[#A0826D] rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Quick Tips for Getting Help
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">1</span>
              </div>
              <p className="text-sm leading-relaxed">Search our FAQ section first - most common questions are answered there</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">2</span>
              </div>
              <p className="text-sm leading-relaxed">Include booking or listing numbers when contacting support for faster assistance</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">3</span>
              </div>
              <p className="text-sm leading-relaxed">Use live chat for urgent issues - email for detailed inquiries</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">4</span>
              </div>
              <p className="text-sm leading-relaxed">Check your email for updates on support tickets and responses</p>
            </div>
          </div>
        </div>
      </div>
     <Footer/>
    </div>
  );
};

export default Help;