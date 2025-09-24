"use client";

import { CreditCard, Building2, Smartphone } from 'lucide-react';

const defaultPaymentMethods = [
  {
    id: 'cards',
    title: 'Credit & Debit Cards',
    description: 'We accept all major credit and debit cards issued by South African banks.',
    icon: CreditCard,
    color: 'bg-[#C8102E]',
    items: ['Visa', 'Mastercard', 'American Express', 'Diners Club']
  },
  {
    id: 'eft',
    title: 'EFT / Bank Transfer',
    description: 'Direct bank transfers from your South African bank account.',
    icon: Building2,
    color: 'bg-[#4A4A4A]',
    items: ['Instant EFT', 'Manual EFT', 'All major SA banks', 'Secure bank-grade encryption']
  },
  {
    id: 'mobile',
    title: 'Mobile Payments',
    description: 'Quick and convenient mobile payment solutions.',
    icon: Smartphone,
    color: 'bg-green-500',
    items: ['SnapScan', 'Zapper', 'Samsung Pay', 'Google Pay']
  },
  {
    id: 'bnpl',
    title: 'Buy Now, Pay Later',
    description: 'Flexible payment options to spread your purchases.',
    icon: CreditCard,
    color: 'bg-purple-500',
    items: ['PayJustNow (3 payments)', 'Mobicred', 'RCS Store Card', 'Subject to approval']
  }
];

interface PaymentMethod {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: string[];
}

interface PaymentMethodsGridProps {
  methods?: PaymentMethod[];
  title?: string;
  columns?: number;
}

const PaymentMethodsGrid: React.FC<PaymentMethodsGridProps> = ({
  methods = defaultPaymentMethods,
  title = "Available Payment Methods",
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
      <h2 className="text-2xl font-bold text-[#000000] mb-8">{title}</h2>
      
      <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[2]} gap-8`}>
        {methods.map((method) => {
          const IconComponent = method.icon;
          return (
            <div key={method.id} className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
              <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mb-4`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#000000] mb-3">{method.title}</h3>
              <p className="text-[#4A4A4A] mb-4">
                {method.description}
              </p>
              <ul className="space-y-2 text-[#4A4A4A]">
                {method.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethodsGrid;
