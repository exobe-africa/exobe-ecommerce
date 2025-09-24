"use client";

import { CheckCircle, Star } from 'lucide-react';

const RequirementsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
            Requirements to Get Started
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Simple requirements to join our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              Basic Requirements
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-[#4A4A4A]">18+ years old</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-[#4A4A4A]">Valid South African ID</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-[#4A4A4A]">Bank account for payments</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-[#4A4A4A]">Smartphone or computer access</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-3" />
              Recommended
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-[#4A4A4A]">Professional experience in your field</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-[#4A4A4A]">Portfolio or examples of your work</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-[#4A4A4A]">References from previous clients</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-[#4A4A4A]">Professional certifications (if applicable)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;
