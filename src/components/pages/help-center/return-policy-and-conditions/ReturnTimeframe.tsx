"use client";

import { Calendar } from 'lucide-react';

interface ReturnTimeframeProps {
  title?: string;
  days?: number;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const ReturnTimeframe: React.FC<ReturnTimeframeProps> = ({
  title = "30-Day Return Policy",
  days = 30,
  description = "from the date of delivery to return most items for a full refund or exchange.",
  icon: IconComponent = Calendar
}) => {
  return (
    <div className="mb-12">
      <div className="bg-[#F6E2E0] rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <IconComponent className="h-6 w-6 text-[#C8102E]" />
          <h2 className="text-2xl font-bold text-[#000000]">{title}</h2>
        </div>
        <p className="text-[#4A4A4A] text-lg mb-4">
          You have <strong>{days} days</strong> {description}
        </p>
        
        {/* Enhanced tracking info */}
        <div className="bg-white rounded-lg p-4 border border-[#C8102E]/20">
          <h3 className="font-semibold text-[#000000] mb-2">📦 Return Tracking</h3>
          <p className="text-sm text-[#4A4A4A]">
            Track your return status in real-time through your account dashboard or by using our guest tracking system. 
            You'll receive email updates at every step of the return process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnTimeframe;
