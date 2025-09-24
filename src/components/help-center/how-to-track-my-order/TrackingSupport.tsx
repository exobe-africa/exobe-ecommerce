"use client";

import { MessageCircle } from 'lucide-react';

interface TrackingSupportProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  phoneNumber?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const TrackingSupport: React.FC<TrackingSupportProps> = ({
  title = "Still need help?",
  description = "If you're having trouble tracking your order or have any questions, our support team is here to help.",
  primaryButtonText = "Live Chat",
  secondaryButtonText = "Call +27 11 123 4567",
  phoneNumber = "+27 11 123 4567",
  onPrimaryClick,
  onSecondaryClick
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      window.location.href = `tel:${phoneNumber.replace(/\s+/g, '')}`;
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-xl p-8">
      <h2 className="text-2xl font-bold text-[#000000] mb-4">{title}</h2>
      <p className="text-[#4A4A4A] mb-6">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handlePrimaryClick}
          className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          {primaryButtonText}
        </button>
        <button 
          onClick={handleSecondaryClick}
          className="border-2 border-[#C8102E] text-[#C8102E] px-6 py-3 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-colors"
        >
          {secondaryButtonText}
        </button>
      </div>
    </div>
  );
};

export default TrackingSupport;
