"use client";

import { Order } from './types';
import { formatCurrency } from './utils';

interface OrderSummaryProps {
  order: Order;
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="p-6 sm:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-[#000000] mb-4">Shipping Address</h3>
          <div className="text-[#4A4A4A] space-y-1">
            <p className="font-medium text-[#000000]">{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.province}</p>
            <p>{order.shippingAddress.postalCode}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#000000] mb-4">Payment & Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-[#4A4A4A]">
              <span>Subtotal:</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#4A4A4A]">
              <span>Shipping:</span>
              <span>{formatCurrency(order.shipping)}</span>
            </div>
            {order.tax > 0 && (
              <div className="flex justify-between text-[#4A4A4A]">
                <span>Tax:</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between font-semibold text-[#000000]">
                <span>Total:</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
            <p className="text-sm text-[#4A4A4A] mt-4">
              Payment Method: {order.paymentMethod}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
