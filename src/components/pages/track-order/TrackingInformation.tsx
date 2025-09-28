"use client";

import { Truck } from 'lucide-react';
import { Order } from './types';

interface TrackingInformationProps {
  order: Order;
}

export default function TrackingInformation({ order }: TrackingInformationProps) {
  if (!order.trackingNumber) {
    return null;
  }

  return (
    <div className="p-6 sm:p-8 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-[#000000] mb-4">Tracking Information</h3>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Truck className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-blue-900">Tracking Number:</span>
          <span className="font-mono text-blue-700 font-semibold">{order.trackingNumber}</span>
        </div>
        <p className="text-sm text-blue-700 mt-2">
          Use this tracking number with our courier partner to get detailed delivery updates.
        </p>
      </div>
    </div>
  );
}
