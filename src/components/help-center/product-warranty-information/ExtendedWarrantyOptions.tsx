"use client";

import { Shield } from 'lucide-react';

const defaultBenefits = [
  'Extended coverage up to 3 years',
  'Accidental damage protection',
  'Priority repair service',
  'Free annual maintenance'
];

const defaultAvailableFor = [
  'Electronics over R2,000',
  'Home appliances',
  'Fitness equipment',
  'Premium fashion items'
];

interface ExtendedWarrantyOptionsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  benefits?: string[];
  availableFor?: string[];
  benefitsTitle?: string;
  availableForTitle?: string;
}

const ExtendedWarrantyOptions: React.FC<ExtendedWarrantyOptionsProps> = ({
  title = "Extended Warranty Options",
  subtitle = "eXobe Care Plus",
  description = "Extend your warranty coverage for additional peace of mind and protection.",
  benefits = defaultBenefits,
  availableFor = defaultAvailableFor,
  benefitsTitle = "Benefits Include:",
  availableForTitle = "Available For:"
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="p-6 rounded-xl border border-purple-200 bg-purple-50">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-purple-500" />
          <h3 className="text-xl font-semibold text-purple-800">{subtitle}</h3>
        </div>
        
        <p className="text-purple-700 mb-4">
          {description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
          <div>
            <h4 className="font-semibold mb-2">{benefitsTitle}</h4>
            <ul className="space-y-1 text-sm">
              {benefits.map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">{availableForTitle}</h4>
            <ul className="space-y-1 text-sm">
              {availableFor.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedWarrantyOptions;
