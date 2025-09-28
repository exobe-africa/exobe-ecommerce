"use client";

import { Search, Mail } from 'lucide-react';

export default function TrackingInstructions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">How to Track Your Order</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center mb-4">
            <Search className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#000000] mb-4">Online Tracking</h3>
          <ol className="space-y-2 text-[#4A4A4A]">
            <li>1. Visit this tracking page</li>
            <li>2. Enter your order number or tracking number</li>
            <li>3. Enter the email address used for your order</li>
            <li>4. Click "Track Order" to view your order status</li>
          </ol>
        </div>
        
        <div>
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#000000] mb-4">Email Notifications</h3>
          <ol className="space-y-2 text-[#4A4A4A]">
            <li>1. Check your email for order confirmation</li>
            <li>2. Look for shipping notification with tracking number</li>
            <li>3. Click the tracking link in the email</li>
            <li>4. Monitor updates sent to your inbox</li>
          </ol>
        </div>
      </div>

      <div className="mt-8 p-6 bg-[#F6E2E0] rounded-xl">
        <h4 className="font-semibold text-[#000000] mb-2">Tracking Number Format</h4>
        <p className="text-[#4A4A4A] mb-4">Your eXobe tracking number will look like this:</p>
        <div className="bg-white border-2 border-dashed border-[#C8102E] rounded-lg p-4 text-center">
          <span className="font-mono text-lg font-bold text-[#C8102E]">EX123456789ZA</span>
        </div>
        <p className="text-sm text-[#4A4A4A] mt-2">
          Tracking numbers are typically 12 characters long and start with "EX"
        </p>
      </div>
    </div>
  );
}
