"use client";

import { AlertTriangle } from 'lucide-react';

const defaultWarrantyPeriods = [
  {
    category: 'Electronics & Appliances',
    period: '12-24 months',
    details: 'Smartphones, laptops, TVs, home appliances',
    color: 'border-blue-200 bg-blue-50 text-blue-700'
  },
  {
    category: 'Fashion & Accessories',
    period: '6 months',
    details: 'Clothing, shoes, bags, jewelry',
    color: 'border-purple-200 bg-purple-50 text-purple-700'
  },
  {
    category: 'Home & Garden',
    period: '12 months',
    details: 'Furniture, tools, garden equipment',
    color: 'border-green-200 bg-green-50 text-green-700'
  },
  {
    category: 'Sports & Fitness',
    period: '6-12 months',
    details: 'Exercise equipment, outdoor gear, sports accessories',
    color: 'border-orange-200 bg-orange-50 text-orange-700'
  },
  {
    category: 'Beauty & Health',
    period: '3-6 months',
    details: 'Cosmetics, skincare, health devices',
    color: 'border-pink-200 bg-pink-50 text-pink-700'
  },
  {
    category: 'Books & Media',
    period: 'No warranty',
    details: 'Physical and digital content',
    color: 'border-gray-200 bg-gray-50 text-gray-700'
  }
];

interface WarrantyPeriod {
  category: string;
  period: string;
  details: string;
  color: string;
}

interface WarrantyPeriodsProps {
  title?: string;
  periods?: WarrantyPeriod[];
  showImportantNote?: boolean;
  importantNote?: string;
}

const WarrantyPeriods: React.FC<WarrantyPeriodsProps> = ({
  title = "Warranty Periods by Product Category",
  periods = defaultWarrantyPeriods,
  showImportantNote = true,
  importantNote = "Warranty periods may vary by brand and specific product. Check individual product pages for exact warranty terms."
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="space-y-4">
        {periods.map((item, index) => (
          <div key={index} className={`p-6 rounded-lg border ${item.color}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg">{item.category}</h3>
              <span className="font-bold">{item.period}</span>
            </div>
            <p className="text-sm">{item.details}</p>
          </div>
        ))}
      </div>

      {showImportantNote && (
        <div className="mt-6 p-4 rounded-lg border border-yellow-200 bg-yellow-50">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-yellow-800">Important Note</span>
          </div>
          <p className="text-yellow-700 text-sm">
            {importantNote}
          </p>
        </div>
      )}
    </div>
  );
};

export default WarrantyPeriods;
