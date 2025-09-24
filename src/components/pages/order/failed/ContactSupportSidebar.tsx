"use client";

import { Phone, MessageCircle, Mail } from 'lucide-react';

const ContactSupportSidebar = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-[#000000] mb-4">Need Immediate Help?</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Phone className="h-5 w-5 text-[#C8102E]" />
          <div>
            <p className="font-medium text-[#000000]">Call Support</p>
            <p className="text-sm text-[#4A4A4A]">+27 11 123 4567</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <MessageCircle className="h-5 w-5 text-[#C8102E]" />
          <div>
            <p className="font-medium text-[#000000]">Live Chat</p>
            <p className="text-sm text-[#4A4A4A]">Available 24/7</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="h-5 w-5 text-[#C8102E]" />
          <div>
            <p className="font-medium text-[#000000]">Email Us</p>
            <p className="text-sm text-[#4A4A4A]">support@exobe.co.za</p>
          </div>
        </div>
      </div>
      
      <button className="w-full mt-4 bg-[#C8102E] text-white py-3 rounded-lg font-medium hover:bg-[#A00E26] transition-colors">
        Contact Support Now
      </button>
    </div>
  );
};

export default ContactSupportSidebar;
