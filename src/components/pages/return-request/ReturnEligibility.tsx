"use client";

import { CheckCircle, AlertCircle } from 'lucide-react';
import { Order } from './types';
import { formatDate } from '@/components/common/orderUtils';

interface ReturnEligibilityProps {
  order: Order;
}

export default function ReturnEligibility({ order }: ReturnEligibilityProps) {
  return (
    <div className="p-6 sm:p-8 border-b border-gray-200">
      {order.returnEligible ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="font-medium text-green-900">Return Eligible</p>
              <p className="text-sm text-green-700">
                You can return items until {formatDate(order.returnDeadline!)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <p className="font-medium text-red-900">Return Period Expired</p>
              <p className="text-sm text-red-700">
                The 30-day return period for this order expired on {formatDate(order.returnDeadline!)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
