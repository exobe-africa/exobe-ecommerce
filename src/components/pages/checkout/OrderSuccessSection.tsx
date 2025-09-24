"use client";

import Link from 'next/link';
import { Check } from 'lucide-react';

interface OrderSuccessSectionProps {
  orderNumber?: string;
}

const OrderSuccessSection: React.FC<OrderSuccessSectionProps> = ({ 
  orderNumber = `EXO${Date.now().toString().slice(-6)}` 
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-[#000000] mb-4">Order Confirmed!</h1>
        <p className="text-[#4A4A4A] mb-6">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-[#4A4A4A]">Order Number</p>
          <p className="text-lg font-semibold text-[#000000]">#{orderNumber}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1">
            <button className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors">
              Continue Shopping
            </button>
          </Link>
          <Link href="/orders" className="flex-1">
            <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-3 rounded-lg font-semibold hover:bg-[#C8102E] hover:text-white transition-colors">
              View Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessSection;
