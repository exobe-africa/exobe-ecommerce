"use client";

import React from 'react';
import { 
  TrendingUp, 
  Shield, 
  Truck, 
  BarChart3,
  MessageCircle,
  Globe
} from 'lucide-react';

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const BenefitsSection: React.FC = () => {
  const benefits: Benefit[] = [
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Reach millions of South African customers and expand your market reach with our growing platform."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Get paid securely and on time with our trusted payment system and fraud protection."
    },
    {
      icon: Truck,
      title: "Logistics Support",
      description: "Access our nationwide delivery network and fulfillment services to reach customers everywhere."
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your performance with detailed analytics and insights to optimise your sales strategy."
    },
    {
      icon: MessageCircle,
      title: "Dedicated Support",
      description: "Get help from our dedicated seller support team whenever you need assistance."
    },
    {
      icon: Globe,
      title: "Easy Setup",
      description: "Quick and simple onboarding process to get your store up and running in no time."
    }
  ];

  return (
    <section id="learn-more" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
            Why Sell on eXobe?
          </h2>
          <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
            Join a thriving marketplace that puts your success first with powerful tools, 
            dedicated support, and access to millions of customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#C8102E] rounded-full flex items-center justify-center mb-6">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#000000] mb-4">{benefit.title}</h3>
              <p className="text-[#4A4A4A] leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
