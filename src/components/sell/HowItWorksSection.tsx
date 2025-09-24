"use client";

import React from 'react';
import { FileText, Upload, TrendingUp } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Apply to Sell",
      description: "Submit your application with business details. We'll review and approve within 2-3 business days.",
      icon: FileText
    },
    {
      number: 2,
      title: "Set Up Your Store",
      description: "Upload your products, set prices, and customise your store profile to attract customers.",
      icon: Upload
    },
    {
      number: 3,
      title: "Start Selling",
      description: "Your products go live immediately. Start receiving orders and grow your business with eXobe.",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
            How It Works
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            Get started in just 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-[#C8102E] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-[#000000] mb-4">{step.title}</h3>
              <p className="text-[#4A4A4A] mb-6">
                {step.description}
              </p>
              <step.icon className="h-12 w-12 text-[#C8102E] mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
