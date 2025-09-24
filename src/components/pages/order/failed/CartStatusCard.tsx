"use client";

import { Clock } from 'lucide-react';

const CartStatusCard = () => {
  return (
    <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
        <Clock className="h-5 w-5 mr-2" />
        Your Cart is Saved
      </h3>
      <p className="text-sm text-blue-700 mb-4">
        Don't worry! We've saved your items for 24 hours. You can return anytime to complete your purchase.
      </p>
      <div className="flex items-center text-xs text-blue-600">
        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
        Items reserved until tomorrow
      </div>
    </div>
  );
};

export default CartStatusCard;
