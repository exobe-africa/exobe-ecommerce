"use client";

import { CheckCircle } from 'lucide-react';

const SuccessOrderHeader = () => {
  return (
    <div className="text-center mb-12">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
        Order Confirmed! 🎉
      </h1>
      <p className="text-lg text-[#4A4A4A] mb-2">
        Thank you for shopping with eXobe
      </p>
      <p className="text-sm text-[#4A4A4A]">
        Your order has been successfully placed and is being processed
      </p>
    </div>
  );
};

export default SuccessOrderHeader;
