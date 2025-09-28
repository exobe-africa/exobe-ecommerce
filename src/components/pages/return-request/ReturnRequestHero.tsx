"use client";

import { RotateCcw } from 'lucide-react';

export default function ReturnRequestHero() {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#C8102E] rounded-full flex items-center justify-center mx-auto mb-6">
            <RotateCcw className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">Request a Return</h1>
          <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            Enter your order details below to start a return request for eligible items from your purchase.
          </p>
        </div>
      </div>
    </div>
  );
}
