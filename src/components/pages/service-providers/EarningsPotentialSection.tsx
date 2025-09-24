"use client";

import { CheckCircle, DollarSign } from 'lucide-react';

const EarningsPotentialSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-6">
              Your Earning Potential
            </h2>
            <p className="text-xl text-[#4A4A4A] mb-8">
              Set your own rates and work as much or as little as you want. 
              Many service providers earn R5,000 - R15,000+ per month.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#000000] mb-1">Keep 85% of Your Earnings</h4>
                  <p className="text-[#4A4A4A]">Low platform fees mean more money in your pocket</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#000000] mb-1">Weekly Payouts</h4>
                  <p className="text-[#4A4A4A]">Get paid every week directly to your bank account</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#000000] mb-1">No Hidden Fees</h4>
                  <p className="text-[#4A4A4A]">Transparent pricing with no surprise charges</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center">
              <DollarSign className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-[#000000] mb-4">Average Monthly Earnings</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Part-time (10-15 hrs/week)</span>
                    <span className="font-bold text-green-600">R3,000 - R6,000</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Full-time (30-40 hrs/week)</span>
                    <span className="font-bold text-green-600">R8,000 - R15,000</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Top Performers</span>
                    <span className="font-bold text-green-600">R20,000+</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-[#4A4A4A] mt-4">
                * Earnings vary based on service type, location, and hours worked
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningsPotentialSection;
