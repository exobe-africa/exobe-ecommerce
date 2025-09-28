"use client";

import { Search } from 'lucide-react';
import { Breadcrumb } from '../../common/index';

interface HelpCenterHeroProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  title?: string;
  description?: string;
  icon?: React.ElementType;
}

const HelpCenterHero: React.FC<HelpCenterHeroProps> = ({
  searchQuery,
  onSearchChange,
  title = "How can we help you?",
  description = "Find answers to your questions, get support, and learn more about shopping with eXobe",
  icon: Icon
}) => {
  const shouldRenderSearch = typeof searchQuery === 'string' && typeof onSearchChange === 'function';

  return (
    <section className="bg-gradient-to-br from-[#000000] to-[#4A4A4A] text-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Help Centre', isCurrentPage: true }
          ]}
          variant="centered"
          separator="chevron"
          className="mb-6"
        />

        {Icon && (
          <div className="flex items-center justify-center mb-5">
            <div className="w-14 h-14 rounded-xl bg-[#C8102E] flex items-center justify-center">
              <Icon className="h-7 w-7 text-white" />
            </div>
          </div>
        )}

        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
          {title}
        </h1>
        <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          {description}
        </p>
        
        {shouldRenderSearch && (
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-6 pr-14 py-4 text-lg rounded-full border-0 focus:outline-none focus:ring-4 focus:ring-[#C8102E] bg-white text-[#000000] placeholder-gray-500 shadow-lg"
              />
              <Search className="absolute right-5 top-4 h-6 w-6 text-[#4A4A4A]" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HelpCenterHero;
