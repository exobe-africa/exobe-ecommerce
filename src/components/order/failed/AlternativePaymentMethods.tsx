"use client";

import { CreditCard } from 'lucide-react';

const AlternativePaymentMethods = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-[#000000] mb-6 text-center">Try Alternative Payment Methods</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-[#C8102E] transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <p className="font-semibold text-[#000000]">Different Card</p>
          <p className="text-sm text-[#4A4A4A]">Try another credit/debit card</p>
        </div>
        
        <div className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-[#C8102E] transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">💳</span>
          </div>
          <p className="font-semibold text-[#000000]">PayPal</p>
          <p className="text-sm text-[#4A4A4A]">Pay with your PayPal account</p>
        </div>
        
        <div className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-[#C8102E] transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">🏦</span>
          </div>
          <p className="font-semibold text-[#000000]">Bank Transfer</p>
          <p className="text-sm text-[#4A4A4A]">Direct EFT payment</p>
        </div>
      </div>
    </div>
  );
};

export default AlternativePaymentMethods;
