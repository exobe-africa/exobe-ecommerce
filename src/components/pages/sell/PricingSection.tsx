"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PricingTier {
  name: string;
  commission: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonStyle: 'outline' | 'primary' | 'secondary';
}

const PricingSection: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      commission: "5%",
      features: [
        "Up to 100 products",
        "Basic analytics",
        "Email support"
      ],
      buttonText: "Get Started",
      buttonStyle: "outline"
    },
    {
      name: "Professional",
      commission: "3%",
      features: [
        "Unlimited products",
        "Advanced analytics",
        "Priority support",
        "Marketing tools"
      ],
      isPopular: true,
      buttonText: "Get Started",
      buttonStyle: "primary"
    },
    {
      name: "Enterprise",
      commission: "2%",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 phone support"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "outline"
    }
  ];

  const getButtonClasses = (style: string, isPopular: boolean = false) => {
    if (style === 'primary') {
      return "w-full bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors";
    }
    return "w-full border-2 border-[#C8102E] text-[#C8102E] py-3 rounded-lg font-semibold hover:bg-[#C8102E] hover:text-white transition-colors";
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Simple, transparent fees with no hidden costs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div key={index} className={`bg-white rounded-2xl p-8 relative ${
              tier.isPopular ? 'border-2 border-[#C8102E]' : 'border-2 border-gray-200'
            }`}>
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#C8102E] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-[#000000] mb-4">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#C8102E]">{tier.commission}</span>
                <span className="text-[#4A4A4A] ml-2">commission per sale</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-[#4A4A4A]">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={getButtonClasses(tier.buttonStyle, tier.isPopular)}>
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
