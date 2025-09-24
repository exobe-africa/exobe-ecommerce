"use client";

import { MessageCircle } from 'lucide-react';

interface PaymentSupportProps {
  title?: string;
  description?: string;
  chatButtonText?: string;
  phoneButtonText?: string;
  phoneNumber?: string;
  onChatClick?: () => void;
  onPhoneClick?: () => void;
}

const PaymentSupport: React.FC<PaymentSupportProps> = ({
  title = "Payment Support",
  description = "Having trouble with payments? Our support team is available to help you complete your purchase.",
  chatButtonText = "Live Chat Support",
  phoneButtonText = "Call +27 11 123 4567",
  phoneNumber = "+27 11 123 4567",
  onChatClick,
  onPhoneClick
}) => {
  const handleChatClick = () => {
    if (onChatClick) {
      onChatClick();
    }
  };

  const handlePhoneClick = () => {
    if (onPhoneClick) {
      onPhoneClick();
    } else {
      window.location.href = `tel:${phoneNumber}`;
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
          onClick={handleChatClick}
          className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          {chatButtonText}
        </button>
        <button 
          onClick={handlePhoneClick}
          className="border-2 border-[#C8102E] text-[#C8102E] px-6 py-3 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-colors"
        >
          {phoneButtonText}
        </button>
      </div>
    </div>
  );
};

export default PaymentSupport;
