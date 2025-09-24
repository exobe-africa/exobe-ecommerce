"use client";

import { MessageCircle } from 'lucide-react';

interface DeliverySupportProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const DeliverySupport: React.FC<DeliverySupportProps> = ({
  title = "Delivery Questions?",
  description = "Need help with delivery options or have questions about your area? Our team is here to help.",
  primaryButtonText = "Check Delivery Area",
  secondaryButtonText = "Contact Support",
  onPrimaryClick,
  onSecondaryClick
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    }
    // Default behavior could be implemented here
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    }
    // Default behavior could be implemented here
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

export default DeliverySupport;
