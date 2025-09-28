"use client";

import { Phone, Shield } from 'lucide-react';
import Link from 'next/link';

interface SupportSectionProps {
  title?: string;
  description?: string;
  whatsappMessage?: string;
  helpCenterLink?: string;
  helpCenterTitle?: string;
  helpCenterDescription?: string;
}

export default function SupportSection({
  title = "Need Help?",
  description = "Can't find what you're looking for or need assistance? Our support team is here to help.",
  whatsappMessage = "Hi! I need help. Can you please assist me?",
  helpCenterLink = "/help-center",
  helpCenterTitle = "Help Center",
  helpCenterDescription = "Browse FAQs"
}: SupportSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#000000] mb-4">{title}</h2>
        <p className="text-[#4A4A4A]">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => {
            const whatsappUrl = `https://wa.me/27821234567?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
          }}
          className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors border border-green-200"
        >
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-medium text-[#000000]">WhatsApp Support</p>
            <p className="text-sm text-[#4A4A4A]">Get instant help</p>
            <p className="text-xs text-green-600">Available 24/7</p>
          </div>
        </button>

        <button 
          onClick={() => window.location.href = 'tel:+27111234567'}
          className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200"
        >
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-medium text-[#000000]">Call Us</p>
            <p className="text-sm text-[#4A4A4A]">+27 11 123 4567</p>
            <p className="text-xs text-blue-600">Mon-Fri: 8AM-8PM</p>
          </div>
        </button>

        <Link 
          href={helpCenterLink}
          className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors border border-purple-200"
        >
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <p className="font-medium text-[#000000]">{helpCenterTitle}</p>
            <p className="text-sm text-[#4A4A4A]">{helpCenterDescription}</p>
            <p className="text-xs text-purple-600">Self-service options</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
