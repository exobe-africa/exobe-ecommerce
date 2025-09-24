"use client";

import { CheckCircle, AlertTriangle } from 'lucide-react';

const defaultCoverageAreas = [
  {
    id: 'major-cities',
    title: 'Major Cities & Suburbs',
    icon: CheckCircle,
    iconColor: 'text-green-500',
    statusText: 'All delivery options available • Same day delivery in CBD areas',
    statusColor: 'text-green-600',
    areas: [
      {
        region: 'Gauteng',
        locations: [
          'Johannesburg & surrounds',
          'Pretoria & surrounds',
          'East Rand',
          'West Rand'
        ]
      },
      {
        region: 'Western Cape',
        locations: [
          'Cape Town & surrounds',
          'Stellenbosch',
          'Paarl',
          'Somerset West'
        ]
      },
      {
        region: 'KwaZulu-Natal',
        locations: [
          'Durban & surrounds',
          'Pietermaritzburg',
          'Ballito',
          'Pinetown'
        ]
      }
    ]
  },
  {
    id: 'secondary-cities',
    title: 'Secondary Cities',
    icon: CheckCircle,
    iconColor: 'text-blue-500',
    statusText: 'Standard & Express delivery available • Collection points available',
    statusColor: 'text-blue-600',
    areas: [
      {
        region: 'Cities',
        locations: [
          'Port Elizabeth',
          'Bloemfontein',
          'East London',
          'Kimberley',
          'Polokwane',
          'Nelspruit',
          'George',
          'Rustenburg'
        ]
      }
    ]
  },
  {
    id: 'rural-areas',
    title: 'Rural & Remote Areas',
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    statusText: '',
    statusColor: '',
    description: 'We deliver to most rural areas across South Africa, though delivery times may be extended.',
    areas: [
      {
        region: 'Information',
        locations: [
          'Standard delivery: 5-7 business days',
          'Collection points recommended for faster delivery',
          'Additional delivery fee may apply for very remote areas'
        ]
      }
    ]
  }
];

interface CoverageArea {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  statusText: string;
  statusColor: string;
  description?: string;
  areas: Array<{
    region: string;
    locations: string[];
  }>;
}

interface DeliveryCoverageAreasProps {
  title?: string;
  areas?: CoverageArea[];
}

const DeliveryCoverageAreas: React.FC<DeliveryCoverageAreasProps> = ({
  title = "Delivery Coverage Areas",
  areas = defaultCoverageAreas
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="space-y-6">
        {areas.map((area) => {
          const IconComponent = area.icon;
          return (
            <div key={area.id} className="p-6 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <IconComponent className={`h-6 w-6 ${area.iconColor}`} />
                <h3 className="text-xl font-semibold text-[#000000]">{area.title}</h3>
              </div>
              
              {area.description && (
                <p className="text-[#4A4A4A] mb-3">{area.description}</p>
              )}
              
              {area.areas.map((region, index) => (
                <div key={index} className={area.areas.length > 1 ? "grid grid-cols-1 md:grid-cols-3 gap-4 text-[#4A4A4A]" : ""}>
                  {area.areas.length > 1 ? (
                    <div>
                      <h4 className="font-semibold mb-2">{region.region}</h4>
                      <ul className="space-y-1 text-sm">
                        {region.locations.map((location, locIndex) => (
                          <li key={locIndex}>• {location}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <ul className="space-y-1 text-[#4A4A4A] text-sm">
                      {region.locations.map((location, locIndex) => (
                        <li key={locIndex}>• {location}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              
              {area.statusText && (
                <p className={`text-sm ${area.statusColor} mt-4`}>
                  <strong>{area.statusText}</strong>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryCoverageAreas;
