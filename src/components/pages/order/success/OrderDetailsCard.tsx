"use client";

import { Package, Download, Share2 } from 'lucide-react';

interface OrderDetailsCardProps {
  orderNumber: string;
  orderTotal: number;
  onShare: () => void;
}

const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({
  orderNumber,
  orderTotal,
  onShare,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Package className="h-6 w-6 mr-2" />
          Order Details
        </h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm font-medium text-[#4A4A4A] mb-1">Order Number</p>
            <p className="text-lg font-bold text-[#C8102E]">#{orderNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#4A4A4A] mb-1">Order Date</p>
            <p className="text-lg font-semibold text-[#000000]">
              {new Date().toLocaleDateString('en-ZA', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#4A4A4A] mb-1">Total Amount</p>
            <p className="text-lg font-bold text-[#C8102E]">
              R{orderTotal > 0 ? orderTotal.toFixed(2) : '1,299.99'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#4A4A4A] mb-1">Payment Status</p>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p className="text-lg font-semibold text-green-600">Confirmed</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-[#C8102E] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center">
            <Download className="h-5 w-5 mr-2" />
            Download Receipt
          </button>
          <button 
            onClick={onShare}
            className="flex-1 border-2 border-[#C8102E] text-[#C8102E] py-3 px-4 rounded-lg font-semibold hover:bg-[#C8102E] hover:text-white transition-colors flex items-center justify-center"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsCard;
