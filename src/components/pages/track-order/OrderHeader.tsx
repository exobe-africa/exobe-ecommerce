"use client";

import { CheckCircle, Truck, Clock, AlertCircle } from 'lucide-react';
import { Order } from './types';
import { getStatusColor, getStatusIconType, formatCurrency, formatDate } from './utils';

interface OrderHeaderProps {
  order: Order;
}

export default function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <div className="p-6 sm:p-8 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#000000] mb-2">Order {order.id}</h2>
          <p className="text-[#4A4A4A]">Placed on {formatDate(order.date)}</p>
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border font-medium ${getStatusColor(order.status)}`}>
            {getStatusIconType(order.status) === 'CheckCircle' && <CheckCircle className="h-5 w-5" />}
            {getStatusIconType(order.status) === 'Truck' && <Truck className="h-5 w-5" />}
            {getStatusIconType(order.status) === 'Clock' && <Clock className="h-5 w-5" />}
            {getStatusIconType(order.status) === 'AlertCircle' && <AlertCircle className="h-5 w-5" />}
            <span className="capitalize">{order.status}</span>
          </div>
          <p className="text-2xl font-bold text-[#000000] mt-2">{formatCurrency(order.total)}</p>
        </div>
      </div>
    </div>
  );
}
