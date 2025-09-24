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
        <p className="text-[#4A4A4A] text-lg">
          You have <strong>{days} days</strong> {description}
        </p>
      </div>
    </div>
  );
};

export default ReturnTimeframe;
