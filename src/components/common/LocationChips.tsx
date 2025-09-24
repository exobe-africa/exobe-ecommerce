"use client";

import { MapPin } from 'lucide-react';

interface LocationChipsProps {
  locations: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LocationChips({ locations, className = '', size = 'md' }: LocationChipsProps) {
  if (!locations || locations.length === 0) {
    return null;
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  };

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <div className="flex items-center gap-1 text-[#4A4A4A]">
        <MapPin className={`${iconSizes[size]} text-[#C8102E]`} />
        <span className={`font-medium ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
          Available in:
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {locations.map((location, index) => (
          <span
            key={location}
            className={`inline-flex items-center ${sizeClasses[size]} rounded-full font-medium bg-[#F6E2E0] text-[#C8102E] border border-[#C8102E]/20 shadow-sm hover:bg-[#C8102E] hover:text-white transition-colors duration-200`}
          >
            {location}
          </span>
        ))}
      </div>
    </div>
  );
}
