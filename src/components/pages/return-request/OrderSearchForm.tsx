"use client";

import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { Order } from './types';

interface OrderSearchFormProps {
  onOrderFound: (order: Order) => void;
  onError: (error: string) => void;
  mockOrders: Order[];
}

export default function OrderSearchForm({ onOrderFound, onError, mockOrders }: OrderSearchFormProps) {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const order = mockOrders.find(o => 
        o.id.toLowerCase() === orderNumber.toLowerCase() ||
        o.trackingNumber?.toLowerCase() === orderNumber.toLowerCase()
      );

      if (order) {
        onOrderFound(order);
        setError('');
      } else {
        const errorMessage = 'Order not found. Please check your order number and email address.';
        setError(errorMessage);
        onError(errorMessage);
      }
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-[#000000] mb-2">
              Order Number or Tracking Number
            </label>
            <input
              type="text"
              id="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g., ORD-2024-001 or EX123456789ZA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#000000] mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-700"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSearching}
          className="w-full bg-[#C8102E] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSearching ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching...
            </>
          ) : (
            <>
              <Search className="h-5 w-5 mr-2" />
              Find Order
            </>
          )}
        </button>
      </form>
    </div>
  );
}
