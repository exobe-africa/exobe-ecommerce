"use client";

import { Truck } from 'lucide-react';

interface ShippingProgressBarProps {
  subtotal: number;
  freeShippingThreshold?: number;
}

const ShippingProgressBar: React.FC<ShippingProgressBarProps> = ({ 
  subtotal, 
  freeShippingThreshold = 499 
}) => {
  const remainingAmount = freeShippingThreshold - subtotal;
  const progressPercentage = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  if (subtotal >= freeShippingThreshold) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Truck className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-blue-800">Free Shipping</span>
        </div>
        <span className="text-sm font-medium text-blue-700">
          R{remainingAmount.toFixed(2)} away
        </span>
      </div>
      
      <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <p className="text-sm text-blue-700">
        Add <span className="font-semibold">R{remainingAmount.toFixed(2)}</span> more to get <span className="font-semibold text-green-600">FREE delivery</span>!
      </p>
    </div>
  );
};

export default ShippingProgressBar;
