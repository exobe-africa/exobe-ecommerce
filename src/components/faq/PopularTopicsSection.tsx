"use client";

import { Truck, RotateCcw, CreditCard, User, Shield, HelpCircle } from 'lucide-react';

const popularTopics = [
  { title: "Order tracking and delivery status", icon: Truck },
  { title: "Return and refund process", icon: RotateCcw },
  { title: "Payment methods and security", icon: CreditCard },
  { title: "Account creation and management", icon: User },
  { title: "Product warranties and guarantees", icon: Shield },
  { title: "Technical website issues", icon: HelpCircle }
];

interface PopularTopicsSectionProps {
  searchQuery: string;
  selectedCategory: string;
}

const PopularTopicsSection: React.FC<PopularTopicsSectionProps> = ({
  searchQuery,
  selectedCategory
}) => {
  // Only show when no search or category filter is active
  if (searchQuery || selectedCategory !== '') {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-200">
        <h2 className="text-3xl font-bold text-[#000000] mb-8 text-center">Most Asked About</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTopics.map((topic, index) => {
            const IconComponent = topic.icon;
            return (
              <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#F6E2E0] rounded-lg flex items-center justify-center group-hover:bg-[#C8102E] transition-colors">
                    <IconComponent className="h-5 w-5 text-[#C8102E] group-hover:text-white" />
                  </div>
                  <p className="text-[#000000] font-medium group-hover:text-[#C8102E] transition-colors">
                    {topic.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularTopicsSection;
