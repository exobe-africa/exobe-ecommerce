"use client";

import { CheckCircle, AlertTriangle } from 'lucide-react';

const defaultCoveredItems = [
  'Manufacturing defects',
  'Material failures',
  'Electrical malfunctions',
  'Component failures under normal use',
  'Software issues (electronics)',
  'Structural problems'
];

const defaultNotCoveredItems = [
  'Physical damage from drops or impacts',
  'Water damage (unless waterproof)',
  'Normal wear and tear',
  'Misuse or abuse',
  'Unauthorised repairs',
  'Cosmetic damage that doesn\'t affect function'
];

interface WarrantyCoverageDetailsProps {
  title?: string;
  coveredItems?: string[];
  notCoveredItems?: string[];
  coveredTitle?: string;
  notCoveredTitle?: string;
}

const WarrantyCoverageDetails: React.FC<WarrantyCoverageDetailsProps> = ({
  title = "What's Covered Under Warranty",
  coveredItems = defaultCoveredItems,
  notCoveredItems = defaultNotCoveredItems,
  coveredTitle = "Covered",
  notCoveredTitle = "Not Covered"
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-green-200 bg-green-50">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h3 className="text-xl font-semibold text-green-800">{coveredTitle}</h3>
          </div>
          <ul className="space-y-2 text-green-700">
            {coveredItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-xl border border-red-200 bg-red-50">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h3 className="text-xl font-semibold text-red-800">{notCoveredTitle}</h3>
          </div>
          <ul className="space-y-2 text-red-700">
            {notCoveredItems.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WarrantyCoverageDetails;
