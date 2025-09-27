"use client";

import { Phone, Mail, MessageCircle } from 'lucide-react';

const contactMethods = [
  {
    title: 'WhatsApp',
    subtitle: 'Get instant help',
    description: 'Message us on WhatsApp for quick questions and immediate assistance',
    availability: 'Available 24/7',
    icon: MessageCircle,
    color: 'bg-green-600',
    action: '+27 82 123 4567',
    highlight: true
  },
  {
    title: 'Phone Support',
    subtitle: 'Speak to an expert',
    description: 'Call us for personalised help and detailed product information',
    availability: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM',
    icon: Phone,
    color: 'bg-blue-500',
    action: '+27 11 123 4567',
    highlight: false
  },
  {
    title: 'Email Support',
    subtitle: 'Detailed assistance',
    description: 'Send us a message and get comprehensive help via email',
    availability: 'Response within 24 hours',
    icon: Mail,
    color: 'bg-purple-500',
    action: 'support@exobe.africa',
    highlight: false
  }
];

const ContactMethodsSection = () => {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">Choose Your Preferred Way to Connect</h2>
        <p className="text-lg text-[#4A4A4A] max-w-3xl mx-auto">
          Whether you need quick answers or detailed support, we have multiple channels to assist you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contactMethods.map((method, index) => {
          const IconComponent = method.icon;
          return (
            <div 
              key={index} 
              className={`relative p-6 bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-xl group ${
                method.highlight 
                  ? 'border-[#C8102E] ring-2 ring-[#C8102E] ring-opacity-20' 
                  : 'border-gray-200 hover:border-[#C8102E]'
              }`}
            >
              {method.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#C8102E] text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <div className={`w-16 h-16 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-[#000000] mb-2">{method.title}</h3>
                <p className="text-[#C8102E] font-semibold mb-3">{method.subtitle}</p>
                <p className="text-[#4A4A4A] text-sm mb-4 leading-relaxed">{method.description}</p>
                
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 text-[#4A4A4A] text-xs px-3 py-1 rounded-full">
                    {method.availability}
                  </span>
                </div>
                
                <button className={`w-full ${method.color} text-white py-3 px-4 rounded-full font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95`}>
                  {method.action}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContactMethodsSection;
