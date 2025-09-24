"use client";

import { Smartphone, Home, Zap } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Curated Selection",
    description: "Hand-picked products from trusted brands and suppliers"
  },
  {
    icon: Smartphone,
    title: "Easy Navigation",
    description: "Find what you need quickly with our organised categories"
  },
  {
    icon: Home,
    title: "Quality Guaranteed",
    description: "Every product is verified for quality and authenticity"
  }
];

interface CategoryBenefitsSectionProps {
  title?: string;
  description?: string;
  customBenefits?: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
  }>;
}

const CategoryBenefitsSection: React.FC<CategoryBenefitsSectionProps> = ({
  title = "Why Shop by Category?",
  description = "Our carefully curated categories make it easy to find exactly what you need, with expert recommendations and quality guarantees.",
  customBenefits = benefits
}) => {
  return (
    <div className="bg-gradient-to-r from-[#F6E2E0] to-white rounded-3xl p-8 lg:p-12 mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-4">
          {title}
        </h2>
        <p className="text-[#4A4A4A] max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {customBenefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div key={index} className="text-center p-6">
              <div className="w-16 h-16 bg-[#C8102E] rounded-full flex items-center justify-center mx-auto mb-4">
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-[#000000] mb-2">{benefit.title}</h3>
              <p className="text-[#4A4A4A] text-sm">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBenefitsSection;
