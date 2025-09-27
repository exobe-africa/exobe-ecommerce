"use client";

import { Shield, Clock, Truck, HeadphonesIcon, Award, CheckCircle } from 'lucide-react';

const commitments = [
  {
    icon: Shield,
    title: 'Secure Shopping',
    description: 'Your personal and payment information is protected with industry-leading security measures.',
    color: 'bg-blue-500'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery across South Africa with real-time tracking for all orders.',
    color: 'bg-green-500'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to assist you with any questions.',
    color: 'bg-purple-500'
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'We stand behind every product we sell with comprehensive warranties and return policies.',
    color: 'bg-orange-500'
  }
];

const supportStats = [
  { number: '99.8%', label: 'Customer Satisfaction' },
  { number: '24/7', label: 'Support Available' },
  { number: '<2hrs', label: 'Average Response Time' },
  { number: '50K+', label: 'Happy Customers' }
];

const OfficeLocationsSection = () => {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-4">Why Choose eXobe?</h2>
        <p className="text-[#4A4A4A] text-sm sm:text-base">
          We're committed to providing you with the best online shopping experience in South Africa.
        </p>
      </div>

      {/* Commitments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {commitments.map((commitment, index) => {
          const IconComponent = commitment.icon;
          return (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${commitment.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-[#000000] mb-2">{commitment.title}</h3>
                  <p className="text-[#4A4A4A] text-sm sm:text-base leading-relaxed">{commitment.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Support Statistics */}
      <div className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Our Support Promise</h3>
          <p className="text-red-100 text-sm sm:text-base">
            Delivering exceptional service that exceeds your expectations
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {supportStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">{stat.number}</div>
              <div className="text-red-100 text-xs sm:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Assurance */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#000000] mb-2">Get in Touch Today</h3>
            <p className="text-[#4A4A4A] text-sm sm:text-base mb-4 leading-relaxed">
              Whether you have a question about a product, need help with an order, or want to provide feedback, 
              we're here to help. Choose your preferred contact method above and we'll get back to you promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-[#4A4A4A]" />
                <span className="text-[#4A4A4A]">Quick response guaranteed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-[#4A4A4A]" />
                <span className="text-[#4A4A4A]">Your privacy is protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeLocationsSection;
