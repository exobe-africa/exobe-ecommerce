"use client";

import { CheckCircle, XCircle } from 'lucide-react';

const defaultEligibleItems = [
  'Items in original condition with tags attached',
  'Unopened and unused products',
  'Items in original packaging',
  'Proof of purchase (receipt/order confirmation)',
  'Returned within 30 days of delivery'
];

const defaultNonEligibleItems = [
  'Personal care and hygiene products',
  'Underwear and swimwear',
  'Customised or personalised items',
  'Digital downloads and gift cards',
  'Items damaged by misuse'
];

interface ReturnConditionsProps {
  title?: string;
  eligibleItems?: string[];
  nonEligibleItems?: string[];
  eligibleTitle?: string;
  nonEligibleTitle?: string;
}

const ReturnConditions: React.FC<ReturnConditionsProps> = ({
  title = "Return Conditions",
  eligibleItems = defaultEligibleItems,
  nonEligibleItems = defaultNonEligibleItems,
  eligibleTitle = "Eligible for Return",
  nonEligibleTitle = "Not Eligible for Return"
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-xl border border-green-200 bg-green-50">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h3 className="text-xl font-semibold text-green-800">{eligibleTitle}</h3>
          </div>
          <ul className="space-y-2 text-green-700">
            {eligibleItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-xl border border-red-200 bg-red-50">
          <div className="flex items-center space-x-3 mb-4">
            <XCircle className="h-6 w-6 text-red-500" />
            <h3 className="text-xl font-semibold text-red-800">{nonEligibleTitle}</h3>
          </div>
          <ul className="space-y-2 text-red-700">
            {nonEligibleItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReturnConditions;
