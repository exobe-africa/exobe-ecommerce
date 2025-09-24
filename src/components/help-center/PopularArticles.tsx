"use client";

import Link from 'next/link';
import { ChevronRight, Truck, RotateCcw, CreditCard, Clock, User, Shield } from 'lucide-react';

const defaultPopularArticles = [
  {
    title: 'How to track my order',
    category: 'Orders & Delivery',
    icon: Truck,
    slug: 'how-to-track-my-order'
  },
  {
    title: 'Return policy and conditions',
    category: 'Returns & Refunds',
    icon: RotateCcw,
    slug: 'return-policy-and-conditions'
  },
  {
    title: 'Accepted payment methods',
    category: 'Payments & Billing',
    icon: CreditCard,
    slug: 'accepted-payment-methods'
  },
  {
    title: 'Delivery times and areas',
    category: 'Orders & Delivery',
    icon: Clock,
    slug: 'delivery-times-and-areas'
  },
  {
    title: 'How to create an account',
    category: 'Account & Profile',
    icon: User,
    slug: 'how-to-create-an-account'
  },
  {
    title: 'Product warranty information',
    category: 'Products & Stock',
    icon: Shield,
    slug: 'product-warranty-information'
  }
];

interface Article {
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  slug: string;
}

interface PopularArticlesProps {
  articles?: Article[];
  searchQuery?: string;
  title?: string;
  baseUrl?: string;
}

const PopularArticles: React.FC<PopularArticlesProps> = ({
  articles = defaultPopularArticles,
  searchQuery = '',
  title = "Popular Help Articles",
  baseUrl = "/help-center"
}) => {
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (searchQuery || filteredArticles.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-[#000000] mb-8 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, index) => {
          const IconComponent = article.icon;
          return (
            <Link key={index} href={`${baseUrl}/${article.slug}`}>
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#F6E2E0] rounded-lg flex items-center justify-center group-hover:bg-[#C8102E] transition-colors">
                      <IconComponent className="h-6 w-6 text-[#C8102E] group-hover:text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#000000] mb-2 group-hover:text-[#C8102E] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#4A4A4A]">{article.category}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#C8102E] transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default PopularArticles;
