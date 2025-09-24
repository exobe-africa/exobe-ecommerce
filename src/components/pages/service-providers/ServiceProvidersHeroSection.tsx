"use client";

import Link from 'next/link';
import { Briefcase, ArrowRight } from 'lucide-react';
import { QuickStats } from '../../common/index';

interface Stat {
  number: string;
  label: string;
}

interface ServiceProvidersHeroSectionProps {
  stats: Stat[];
}

const ServiceProvidersHeroSection: React.FC<ServiceProvidersHeroSectionProps> = ({ stats }) => {
  return (
    <section className="bg-gradient-to-br from-[#C8102E] to-[#A00E26] text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Become a Service Provider
            </h1>
            <p className="text-xl sm:text-2xl text-red-100 mb-8">
              Turn your skills into income. Connect with customers who need your expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/service-providers/apply">
                <button className="bg-white text-[#C8102E] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center text-lg">
                  <Briefcase className="h-6 w-6 mr-2" />
                  Start Earning Today
                </button>
              </Link>
              <Link href="#learn-more">
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#C8102E] transition-colors flex items-center justify-center text-lg">
                  Learn More
                  <ArrowRight className="h-6 w-6 ml-2" />
                </button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-center mb-6">
                <Briefcase className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Join Our Community</h3>
                <p className="text-red-100">Thousands of service providers earning more</p>
              </div>
              <QuickStats
                stats={stats}
                variant="card"
                columns={2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProvidersHeroSection;
