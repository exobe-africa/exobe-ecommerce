"use client";

import Link from 'next/link';
import { Truck, RotateCcw, Search, User, Star, CreditCard, Clock, Phone } from 'lucide-react';

const defaultQuickLinks = [
  { title: 'Order Status', icon: Truck, link: '/orders' },
  { title: 'Return Item', icon: RotateCcw, link: '/returns' },
  { title: 'Track Package', icon: Search, link: '/tracking' },
  { title: 'My Account', icon: User, link: '/account' },
  { title: 'Wishlist', icon: Star, link: '/wishlist' },
  { title: 'Payment Methods', icon: CreditCard, link: '/payment' },
  { title: 'Shipping Info', icon: Clock, link: '/shipping' },
  { title: 'Contact Us', icon: Phone, link: '/contact' }
];

interface QuickLink {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}

interface QuickLinksProps {
  links?: QuickLink[];
  title?: string;
  description?: string;
  columns?: number;
}

const QuickLinks: React.FC<QuickLinksProps> = ({
  links = defaultQuickLinks,
  title = "Quick Links",
  description = "Fast access to commonly needed information and services",
  columns = 4
}) => {
  const gridCols = {
    2: 'grid-cols-2 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
  };

  return (
    <section className="mb-16">
      <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-2xl p-8 lg:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#000000] mb-4">{title}</h2>
          <p className="text-lg text-[#4A4A4A]">
            {description}
          </p>
        </div>

        <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[4]} gap-6`}>
          {links.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <Link key={index} href={link.link}>
                <div className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-[#000000] group-hover:text-[#C8102E] transition-colors">
                    {link.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
