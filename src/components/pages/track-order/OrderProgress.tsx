"use client";

import { CheckCircle, Truck } from 'lucide-react';
import { Order } from './types';
import { formatDate } from './utils';

interface OrderProgressProps {
  order: Order;
}

export default function OrderProgress({ order }: OrderProgressProps) {
  return (
    <div className="p-6 sm:p-8 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-[#000000] mb-6">Order Progress</h3>
      
      {/* Mobile Progress - Vertical Layout */}
      <div className="block sm:hidden space-y-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4 flex-1">
            <p className="font-semibold text-[#000000]">Order Confirmed</p>
            <p className="text-sm text-[#4A4A4A]">{formatDate(order.date)}</p>
          </div>
        </div>
        
        <div className="flex items-center pl-5">
          <div className={`w-1 h-8 ${order.status !== 'processing' ? 'bg-[#C8102E]' : 'bg-gray-200'}`}></div>
        </div>
        
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status !== 'processing' ? 'bg-[#C8102E]' : 'bg-gray-200'}`}>
            <Truck className={`h-6 w-6 ${order.status !== 'processing' ? 'text-white' : 'text-gray-400'}`} />
          </div>
          <div className="ml-4 flex-1">
            <p className={`font-semibold ${order.status !== 'processing' ? 'text-[#000000]' : 'text-gray-400'}`}>Shipped</p>
            {order.status !== 'processing' && (
              <p className="text-sm text-[#4A4A4A]">In transit</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center pl-5">
          <div className={`w-1 h-8 ${order.status === 'delivered' ? 'bg-[#C8102E]' : 'bg-gray-200'}`}></div>
        </div>
        
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'delivered' ? 'bg-[#C8102E]' : 'bg-gray-200'}`}>
            <CheckCircle className={`h-6 w-6 ${order.status === 'delivered' ? 'text-white' : 'text-gray-400'}`} />
          </div>
          <div className="ml-4 flex-1">
            <p className={`font-semibold ${order.status === 'delivered' ? 'text-[#000000]' : 'text-gray-400'}`}>Delivered</p>
            {order.estimatedDelivery && order.status !== 'delivered' && (
              <p className="text-sm text-[#4A4A4A]">Est. {formatDate(order.estimatedDelivery)}</p>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Progress - Horizontal Layout */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <p className="font-medium text-[#000000]">Order Confirmed</p>
            <p className="text-sm text-[#4A4A4A]">{formatDate(order.date)}</p>
          </div>
        </div>
        <div className={`h-1 flex-1 mx-4 ${order.status !== 'processing' ? 'bg-[#C8102E]' : 'bg-gray-200'}`}></div>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status !== 'processing' ? 'bg-[#C8102E]' : 'bg-gray-200'}`}>
            <Truck className={`h-6 w-6 ${order.status !== 'processing' ? 'text-white' : 'text-gray-400'}`} />
          </div>
          <div className="ml-3">
            <p className={`font-medium ${order.status !== 'processing' ? 'text-[#000000]' : 'text-gray-400'}`}>Shipped</p>
            {order.status !== 'processing' && (
              <p className="text-sm text-[#4A4A4A]">In transit</p>
            )}
          </div>
        </div>
        <div className={`h-1 flex-1 mx-4 ${order.status === 'delivered' ? 'bg-[#C8102E]' : 'bg-gray-200'}`}></div>
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === 'delivered' ? 'bg-[#C8102E]' : 'bg-gray-200'}`}>
            <CheckCircle className={`h-6 w-6 ${order.status === 'delivered' ? 'text-white' : 'text-gray-400'}`} />
          </div>
          <div className="ml-3">
            <p className={`font-medium ${order.status === 'delivered' ? 'text-[#000000]' : 'text-gray-400'}`}>Delivered</p>
            {order.estimatedDelivery && order.status !== 'delivered' && (
              <p className="text-sm text-[#4A4A4A]">Est. {formatDate(order.estimatedDelivery)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
