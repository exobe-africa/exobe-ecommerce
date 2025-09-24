"use client";

import Link from 'next/link';
import { Store, Headphones } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Ready to Start Your Success Story?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of successful sellers on South Africa's fastest-growing marketplace
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sell/apply">
            <button className="bg-[#C8102E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center text-lg">
              <Store className="h-6 w-6 mr-2" />
              Apply to Sell Now
            </button>
          </Link>
          <Link href="/help-center">
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#000000] transition-colors flex items-center justify-center text-lg">
              <Headphones className="h-6 w-6 mr-2" />
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
