"use client";

import { Shield, CheckCircle } from 'lucide-react';

const defaultCoverageTypes = [
  {
    id: 'manufacturer',
    title: 'Manufacturer Warranty',
    description: 'All products come with the original manufacturer\'s warranty covering defects and malfunctions.',
    icon: Shield,
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    iconBgColor: 'bg-[#C8102E]',
    textColor: 'text-[#4A4A4A]',
    titleColor: 'text-[#000000]',
    features: [
      'Covers manufacturing defects',
      'Varies by product category',
      'Handled directly by manufacturer',
      'Proof of purchase required'
    ]
  },
  {
    id: 'exobe-guarantee',
    title: 'eXobe Quality Guarantee',
    description: 'Our additional guarantee ensures you\'re completely satisfied with your purchase.',
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconBgColor: 'bg-green-500',
    textColor: 'text-green-700',
    titleColor: 'text-green-800',
    features: [
      '30-day satisfaction guarantee',
      'Free repair or replacement',
      'Covers shipping damage',
      'No-hassle claims process'
    ]
  }
];

interface CoverageType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  borderColor: string;
  iconBgColor: string;
  textColor: string;
  titleColor: string;
  features: string[];
}

interface WarrantyCoverageTypesProps {
  title?: string;
  coverageTypes?: CoverageType[];
  columns?: number;
}

const WarrantyCoverageTypes: React.FC<WarrantyCoverageTypesProps> = ({
  title = "Types of Warranty Coverage",
  coverageTypes = defaultCoverageTypes,
  columns = 2
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-8">{title}</h2>
      
      <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[2]} gap-8`}>
        {coverageTypes.map((coverage) => {
          const IconComponent = coverage.icon;
          return (
            <div 
              key={coverage.id} 
              className={`p-6 rounded-xl border ${coverage.borderColor} ${coverage.bgColor} hover:border-opacity-75 transition-colors`}
            >
              <div className={`w-12 h-12 ${coverage.iconBgColor} rounded-lg flex items-center justify-center mb-4`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${coverage.titleColor} mb-3`}>{coverage.title}</h3>
              <p className={`${coverage.textColor} mb-4`}>
                {coverage.description}
              </p>
              <ul className={`space-y-2 ${coverage.textColor} text-sm`}>
                {coverage.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WarrantyCoverageTypes;
