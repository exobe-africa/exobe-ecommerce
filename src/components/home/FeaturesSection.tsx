"use client";

import { Truck, Shield, RotateCcw } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over R99. Fast and reliable shipping."
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Your payment information is safe and secure with our encryption."
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy. Not satisfied? Return it hassle-free."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
                <div className="bg-[#C8102E] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#000000] mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
