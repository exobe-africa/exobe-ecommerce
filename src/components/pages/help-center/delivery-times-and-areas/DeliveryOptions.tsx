"use client";

import { Package, Truck, Clock, MapPin } from 'lucide-react';

const defaultDeliveryOptions = [
  {
    id: 'standard',
    title: 'Standard Delivery',
    icon: Package,
    color: 'bg-[#C8102E]',
    borderColor: 'border-gray-200',
    bgColor: 'bg-white',
    textColor: 'text-[#4A4A4A]',
    titleColor: 'text-[#000000]',
    details: {
      timeframe: '3-5 business days',
      cost: 'R99 (Free on orders over R499)',
      tracking: 'Full tracking included'
    },
    description: 'Perfect for regular orders when you\'re not in a rush. Reliable and cost-effective.'
  },
  {
    id: 'express',
    title: 'Express Delivery',
    icon: Truck,
    color: 'bg-blue-500',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    titleColor: 'text-blue-800',
    details: {
      timeframe: '1-2 business days',
      cost: 'R199',
      tracking: 'Real-time tracking'
    },
    description: 'Fast delivery for urgent orders. Available in major cities and surrounding areas.'
  },
  {
    id: 'same-day',
    title: 'Same Day Delivery',
    icon: Clock,
    color: 'bg-green-500',
    borderColor: 'border-green-200',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    titleColor: 'text-green-800',
    details: {
      timeframe: 'Within 4-6 hours',
      cost: 'R299',
      cutoff: 'Order by 12:00 PM'
    },
    description: 'Ultra-fast delivery available in Johannesburg, Cape Town, and Durban CBD areas.'
  },
  {
    id: 'collection',
    title: 'Collection Points',
    icon: MapPin,
    color: 'bg-purple-500',
    borderColor: 'border-purple-200',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    titleColor: 'text-purple-800',
    details: {
      timeframe: '2-3 business days',
      cost: 'R49',
      locations: '500+ pickup points'
    },
    description: 'Convenient pickup from Pep, Ackermans, and other partner stores nationwide.'
  }
];

interface DeliveryOption {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  titleColor: string;
  details: Record<string, string>;
  description: string;
}

interface DeliveryOptionsProps {
  title?: string;
  options?: DeliveryOption[];
  columns?: number;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  title = "Delivery Options",
  options = defaultDeliveryOptions,
  columns = 2
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-8">{title}</h2>
      
      <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[2]} gap-8`}>
        {options.map((option) => {
          const IconComponent = option.icon;
          return (
            <div key={option.id} className={`p-6 rounded-xl border ${option.borderColor} ${option.bgColor} hover:border-opacity-75 transition-colors`}>
              <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mb-4`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-xl font-semibold ${option.titleColor} mb-3`}>{option.title}</h3>
              <div className={`space-y-2 ${option.textColor} mb-4`}>
                {Object.entries(option.details).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </p>
                ))}
              </div>
              <p className={`${option.textColor} text-sm`}>
                {option.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryOptions;
