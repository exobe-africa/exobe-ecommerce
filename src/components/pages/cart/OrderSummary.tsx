"use client";

import Link from 'next/link';
import { ArrowRight, ArrowLeft, Tag, Shield, Truck, Clock } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  totalItems: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
  totalItems,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
      <h3 className="text-lg font-semibold text-[#000000] mb-6 flex items-center">
        <Tag className="h-5 w-5 mr-2 text-[#C8102E]" />
        Order Summary
      </h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-[#4A4A4A]">Subtotal ({totalItems} items)</span>
          <span className="text-[#000000] font-medium">R{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-[#4A4A4A]">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-[#000000]'}`}>
            {shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-[#4A4A4A]">VAT (15%)</span>
          <span className="text-[#000000] font-medium">R{tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-[#000000]">Total</span>
            <span className="text-[#C8102E]">R{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <Link href="/checkout" className="block mb-4">
        <button className="w-full bg-[#C8102E] text-white py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center group text-lg">
          Proceed to Checkout
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
      
      <Link href="/">
        <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-4 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-all duration-300 flex items-center justify-center text-lg">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Continue Shopping
        </button>
      </Link>
      
      <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
        <div className="flex items-center text-sm text-[#4A4A4A]">
          <Shield className="h-4 w-4 mr-3 text-green-600" />
          Secure 256-bit SSL encryption
        </div>
        <div className="flex items-center text-sm text-[#4A4A4A]">
          <Truck className="h-4 w-4 mr-3 text-blue-600" />
          Free returns within 30 days
        </div>
        <div className="flex items-center text-sm text-[#4A4A4A]">
          <Clock className="h-4 w-4 mr-3 text-purple-600" />
          24/7 customer support
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
