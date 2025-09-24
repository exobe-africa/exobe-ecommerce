"use client";

import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

const HelpSupportSidebar = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-[#000000] mb-4">Need Help?</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-[#C8102E]" />
          <div>
            <p className="font-medium text-[#000000]">Email Support</p>
            <p className="text-sm text-[#4A4A4A]">support@exobe.co.za</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-[#C8102E]" />
          <div>
            <p className="font-medium text-[#000000]">Call Us</p>
            <p className="text-sm text-[#4A4A4A]">+27 11 123 4567</p>
          </div>
        </div>
      </div>
      
      <Link href="/help-center" className="block mt-4">
        <button className="w-full bg-gray-100 text-[#4A4A4A] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Visit Help Centre
        </button>
      </Link>
    </div>
  );
};

export default HelpSupportSidebar;
