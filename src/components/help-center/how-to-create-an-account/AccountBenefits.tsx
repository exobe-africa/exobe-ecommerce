"use client";

import { CheckCircle, Eye, User, Shield } from 'lucide-react';

const defaultBenefits = [
  {
    title: 'Faster Checkout',
    description: 'Save your details for quick and easy purchases',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    title: 'Order Tracking',
    description: 'Track all your orders and view order history',
    icon: Eye,
    color: 'text-blue-500'
  },
  {
    title: 'Wishlist & Favourites',
    description: 'Save items you love for later purchase',
    icon: User,
    color: 'text-purple-500'
  },
  {
    title: 'Exclusive Offers',
    description: 'Get access to member-only deals and early sales',
    icon: Shield,
    color: 'text-orange-500'
  }
];

interface Benefit {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface AccountBenefitsProps {
  title?: string;
  benefits?: Benefit[];
  columns?: number;
}

const AccountBenefits: React.FC<AccountBenefitsProps> = ({
  title = "Benefits of Having an Account",
  benefits = defaultBenefits,
  columns = 2
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[2]} gap-6`}>
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
              <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 ${benefit.color}`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-[#000000] mb-2">{benefit.title}</h3>
              <p className="text-[#4A4A4A] text-sm">{benefit.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountBenefits;
