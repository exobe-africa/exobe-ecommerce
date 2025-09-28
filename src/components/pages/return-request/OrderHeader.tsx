"use client";

import { Order } from './types';
import { getStatusColor, getStatusIcon, formatCurrency, formatDate } from '@/components/common/orderUtils';

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
          {order.deliveredDate && (
            <p className="text-[#4A4A4A]">Delivered on {formatDate(order.deliveredDate)}</p>
          )}
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border font-medium ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="capitalize">{order.status}</span>
          </div>
          <p className="text-2xl font-bold text-[#000000] mt-2">{formatCurrency(order.total)}</p>
        </div>
      </div>
    </div>
  );
}
