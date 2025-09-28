"use client";

import { User, Zap, Package, Star, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  description: string;
}

interface AccountBenefitsProps {
  title?: string;
  description?: string;
  benefits?: Benefit[];
  variant?: 'default' | 'returns';
}

const defaultBenefits: Benefit[] = [
  {
    icon: Zap,
    iconColor: 'bg-blue-100 text-blue-600',
    title: 'Faster Checkout',
    description: 'Save your addresses and payment methods for lightning-fast ordering'
  },
  {
    icon: Package,
    iconColor: 'bg-green-100 text-green-600',
    title: 'Order History',
    description: 'View all your orders, track packages, and reorder favorites easily'
  },
  {
    icon: Star,
    iconColor: 'bg-purple-100 text-purple-600',
    title: 'Exclusive Offers',
    description: 'Get early access to sales, special discounts, and member-only deals'
  }
];

const returnsBenefits: Benefit[] = [
  {
    icon: RotateCcw,
    iconColor: 'bg-[#F6E2E0] text-[#C8102E]',
    title: 'Easy Returns',
    description: 'View all orders, initiate returns instantly, and track return status in real-time'
  },
  {
    icon: Package,
    iconColor: 'bg-blue-100 text-blue-600',
    title: 'Order History',
    description: 'Access complete purchase history, reorder favorites, and manage all transactions'
  },
  {
    icon: Star,
    iconColor: 'bg-purple-100 text-purple-600',
    title: 'Priority Support',
    description: 'Get faster customer service, dedicated support, and priority processing'
  }
];

export default function AccountBenefits({
  title,
  description,
  benefits,
  variant = 'default'
}: AccountBenefitsProps) {
  const finalTitle = title || (variant === 'returns' 
    ? 'Manage Returns Easier with an Account'
    : 'Create an Account for a Better Experience'
  );
  
  const finalDescription = description || (variant === 'returns'
    ? 'Create your free eXobe account to streamline returns, track requests, and enjoy exclusive member benefits.'
    : 'Join thousands of satisfied customers and enjoy exclusive benefits when you create your free eXobe account.'
  );

  const finalBenefits = benefits || (variant === 'returns' ? returnsBenefits : defaultBenefits);

  return (
    <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-2xl p-6 sm:p-8 mb-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#C8102E] rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#000000] mb-4">{finalTitle}</h2>
        <p className="text-[#4A4A4A] max-w-2xl mx-auto">{finalDescription}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {finalBenefits.map((benefit, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className={`w-12 h-12 ${benefit.iconColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <benefit.icon className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-[#000000] mb-2">{benefit.title}</h3>
            <p className="text-sm text-[#4A4A4A]">{benefit.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/auth/register"
          className="w-full sm:w-auto inline-flex items-center justify-center bg-[#C8102E] text-white px-8 py-4 sm:py-3 rounded-lg font-medium hover:bg-[#A00E26] transition-colors text-center"
        >
          Create Free Account
        </Link>
        <Link
          href="/auth/login"
          className="w-full sm:w-auto inline-flex items-center justify-center border border-[#C8102E] text-[#C8102E] px-8 py-4 sm:py-3 rounded-lg font-medium hover:bg-[#F6E2E0] transition-colors text-center"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
