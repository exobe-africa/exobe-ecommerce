"use client";

import Link from 'next/link';
import { Store, ArrowRight, Warehouse } from 'lucide-react';
import { QuickStats } from '../../common/index';

interface Stat {
  number: string;
  label: string;
}

interface SellHeroSectionProps {
  stats: Stat[];
}

const SellHeroSection: React.FC<SellHeroSectionProps> = ({ stats }) => {
  return (
    <section className="bg-gradient-to-br from-[#C8102E] to-[#A00E26] text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Sell on eXobe
            </h1>
            <p className="text-xl sm:text-2xl text-red-100 mb-4">
              Join South Africa's fastest-growing marketplace
            </p>
            <p className="text-lg text-red-100 mb-8 leading-relaxed">
              Whether you're a <span className="font-semibold text-white">retailer</span> selling directly to consumers 
              or a <span className="font-semibold text-white">wholesaler</span> supplying to businesses, 
              we have the perfect platform to grow your sales and reach new markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sell/apply">
                <button className="bg-white text-[#C8102E] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center text-lg">
                  <Store className="h-6 w-6 mr-2" />
                  Start Selling Today
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
                <Store className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Two Ways to Sell</h3>
                <div className="space-y-2 text-red-100">
                  <p className="flex items-center justify-center">
                    <Store className="h-4 w-4 mr-2" />
                    <span className="font-medium">Retailer:</span> Direct to consumers
                  </p>
                  <p className="flex items-center justify-center">
                    <Warehouse className="h-4 w-4 mr-2" />
                    <span className="font-medium">Wholesaler:</span> Supply to retailers
                  </p>
                </div>
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

export default SellHeroSection;
