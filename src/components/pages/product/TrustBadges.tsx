"use client";

import { Shield, Truck, RotateCcw } from 'lucide-react';

const TrustBadges = () => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Shield className="h-6 w-6 text-[#C8102E] flex-shrink-0" />
          <div>
            <div className="font-medium text-sm text-[#000000]">Secure Payment</div>
            <div className="text-xs text-[#4A4A4A]">100% Protected</div>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Truck className="h-6 w-6 text-[#C8102E] flex-shrink-0" />
          <div>
            <div className="font-medium text-sm text-[#000000]">Free Delivery</div>
            <div className="text-xs text-[#4A4A4A]">Orders over R99</div>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <RotateCcw className="h-6 w-6 text-[#C8102E] flex-shrink-0" />
          <div>
            <div className="font-medium text-sm text-[#000000]">Easy Returns</div>
            <div className="text-xs text-[#4A4A4A]">30-day policy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
