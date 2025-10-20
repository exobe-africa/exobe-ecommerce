"use client";

import { Package } from 'lucide-react';
import Image from 'next/image';
import { Order } from './types';
import { formatCurrency } from './utils';

interface OrderItemsProps {
  order: Order;
}

export default function OrderItems({ order }: OrderItemsProps) {
  return (
    <div className="p-6 sm:p-8 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-[#000000] mb-4">Order Items</h3>
      <div className="space-y-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-[#000000]">{item.name}</h4>
              {item.variant && (
                <p className="text-sm text-[#4A4A4A]">{item.variant}</p>
              )}
              <p className="text-sm text-[#4A4A4A]">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#000000]">{formatCurrency(item.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
