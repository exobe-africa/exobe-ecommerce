"use client";

import { Truck, Clock } from 'lucide-react';

interface DeliveryInformationProps {
  estimatedDelivery: Date;
}

const DeliveryInformation: React.FC<DeliveryInformationProps> = ({ estimatedDelivery }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
        <Truck className="h-6 w-6 mr-2 text-[#C8102E]" />
        Delivery Information
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <p className="font-semibold text-blue-800">Estimated Delivery</p>
              <p className="text-sm text-blue-600">
                {estimatedDelivery.toLocaleDateString('en-ZA', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-blue-800">FREE</p>
            <p className="text-xs text-blue-600">Standard Delivery</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-[#000000] mb-2">Tracking Available</p>
            <p className="text-sm text-[#4A4A4A]">
              We'll send you tracking information once your order ships
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-[#000000] mb-2">Delivery Updates</p>
            <p className="text-sm text-[#4A4A4A]">
              SMS and email notifications will keep you informed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInformation;
