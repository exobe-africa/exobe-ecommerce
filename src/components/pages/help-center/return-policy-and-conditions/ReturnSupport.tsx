"use client";

import { MessageCircle, ExternalLink, User, Phone } from 'lucide-react';
import Link from 'next/link';

interface ReturnSupportProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const ReturnSupport: React.FC<ReturnSupportProps> = ({
  title = "Need Help with Returns?",
  description = "Our customer service team is here to help you with your return or exchange. Choose the option that works best for you.",
  primaryButtonText = "WhatsApp Support",
  secondaryButtonText = "Call Support",
  onPrimaryClick,
  onSecondaryClick
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      const message = "Hi! I need help with a return request on eXobe. Can you please assist me?";
      const whatsappUrl = `https://wa.me/27821234567?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      window.location.href = 'tel:+27111234567';
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-xl p-8">
      <h2 className="text-2xl font-bold text-[#000000] mb-4">{title}</h2>
      <p className="text-[#4A4A4A] mb-6">
        {description}
      </p>
      
      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button 
          onClick={handlePrimaryClick}
          className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          {primaryButtonText}
        </button>
        <button 
          onClick={handleSecondaryClick}
          className="border-2 border-[#C8102E] text-[#C8102E] px-6 py-3 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-colors flex items-center justify-center"
        >
          <Phone className="h-5 w-5 mr-2" />
          {secondaryButtonText}
        </button>
      </div>

      {/* Quick Access Links */}
      <div className="border-t border-[#C8102E]/20 pt-6">
        <h3 className="text-lg font-semibold text-[#000000] mb-4">Quick Access to Return Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/dashboard?tab=orders"
            className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors group"
          >
            <User className="h-5 w-5 text-[#C8102E] group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-medium text-[#000000] text-sm">My Account</p>
              <p className="text-xs text-[#4A4A4A]">View order history</p>
            </div>
          </Link>
          <Link 
            href="/return-request"
            className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors group"
          >
            <ExternalLink className="h-5 w-5 text-[#C8102E] group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-medium text-[#000000] text-sm">Guest Returns</p>
              <p className="text-xs text-[#4A4A4A]">Return without account</p>
            </div>
          </Link>
          <Link 
            href="/track-order"
            className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors group"
          >
            <MessageCircle className="h-5 w-5 text-[#C8102E] group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-medium text-[#000000] text-sm">Track Order</p>
              <p className="text-xs text-[#4A4A4A]">Check order status</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnSupport;
