"use client";

import { ChevronRight, ShoppingBag, CreditCard, RotateCcw, User, Star, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// URL mappings for categories and articles
const categoryUrls = {
  'orders': '/help-center/orders-delivery',
  'payments': '/help-center/payments-billing',
  'returns': '/help-center/returns-refunds',
  'account': '/help-center/account-profile',
  'products': '/help-center/products-stock',
  'technical': '/help-center/technical-support'
};

const articleUrls = {
  'How to track my order': '/help-center/how-to-track-my-order',
  'Delivery times and areas': '/help-center/delivery-times-and-areas',
  'What if my order is delayed?': '/help-center/order-delayed',
  'Accepted payment methods': '/help-center/accepted-payment-methods',
  'Payment security and safety': '/help-center/payment-security',
  'Failed payment troubleshooting': '/help-center/payment-troubleshooting',
  'How to return an item': '/help-center/how-to-return-item',
  'Return policy and conditions': '/help-center/return-policy-and-conditions',
  'Refund processing times': '/help-center/refund-processing',
  'Creating an account': '/help-center/how-to-create-an-account',
  'Password reset help': '/help-center/password-reset',
  'Update personal information': '/help-center/update-profile',
  'Product specifications': '/help-center/product-specifications',
  'Stock availability': '/help-center/stock-availability',
  'Product warranty info': '/help-center/product-warranty-information',
  'Website not loading properly': '/help-center/website-issues',
  'Mobile app issues': '/help-center/mobile-app-issues',
  'Browser compatibility': '/help-center/browser-compatibility'
};

const defaultHelpCategories = [
  {
    id: 'orders',
    title: 'Orders & Delivery',
    icon: ShoppingBag,
    description: 'Track orders, delivery info, and shipping questions',
    color: 'bg-blue-500',
    articles: [
      'How to track my order',
      'Delivery times and areas',
      'What if my order is delayed?',
      'Changing delivery address',
      'Delivery fees and options',
      'Order confirmation issues'
    ]
  },
  {
    id: 'payments',
    title: 'Payments & Billing',
    icon: CreditCard,
    description: 'Payment methods, billing, and transaction issues',
    color: 'bg-green-500',
    articles: [
      'Accepted payment methods',
      'Payment security and safety',
      'Failed payment troubleshooting',
      'Refund processing times',
      'Invoice and receipt queries',
      'Payment plan options'
    ]
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    icon: RotateCcw,
    description: 'Return policy, refund process, and exchanges',
    color: 'bg-orange-500',
    articles: [
      'How to return an item',
      'Return policy and conditions',
      'Refund processing times',
      'Exchange procedures',
      'Return shipping costs',
      'Damaged item returns'
    ]
  },
  {
    id: 'account',
    title: 'Account & Profile',
    icon: User,
    description: 'Account settings, profile, and login issues',
    color: 'bg-purple-500',
    articles: [
      'Creating an account',
      'Password reset help',
      'Update personal information',
      'Account security settings',
      'Email preferences',
      'Delete my account'
    ]
  },
  {
    id: 'products',
    title: 'Products & Stock',
    icon: Star,
    description: 'Product information, availability, and specifications',
    color: 'bg-pink-500',
    articles: [
      'Product specifications',
      'Stock availability',
      'Product warranty info',
      'Size guides and charts',
      'Product reviews and ratings',
      'Request new products'
    ]
  },
  {
    id: 'technical',
    title: 'Technical Support',
    icon: Shield,
    description: 'Website issues, app problems, and technical help',
    color: 'bg-indigo-500',
    articles: [
      'Website not loading properly',
      'Mobile app issues',
      'Browser compatibility',
      'Clear cache and cookies',
      'Accessibility features',
      'System requirements'
    ]
  }
];

interface HelpCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  articles: string[];
}

interface HelpCategoriesProps {
  categories?: HelpCategory[];
  searchQuery?: string;
  title?: string;
}

const HelpCategories: React.FC<HelpCategoriesProps> = ({
  categories = defaultHelpCategories,
  searchQuery = '',
  title
}) => {
  const router = useRouter();
  
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const displayTitle = searchQuery ? 'Search Results' : (title || 'Browse by Category');
  const categoriesToShow = searchQuery ? filteredCategories : categories;

  const handleCategoryClick = (categoryId: string) => {
    const categoryUrl = categoryUrls[categoryId as keyof typeof categoryUrls];
    if (categoryUrl) {
      router.push(categoryUrl);
    }
  };

  const handleArticleClick = (article: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent category click
    const articleUrl = articleUrls[article as keyof typeof articleUrls];
    if (articleUrl) {
      router.push(articleUrl);
    }
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-[#000000] mb-8 text-center">
        {displayTitle}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesToShow.map((category) => {
          const IconComponent = category.icon;
          return (
            <div 
              key={category.id} 
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 group cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#000000] group-hover:text-[#C8102E] transition-colors">
                    {category.title}
                  </h3>
                </div>
              </div>
              <p className="text-[#4A4A4A] mb-4">{category.description}</p>
              <div className="space-y-2">
                {category.articles.slice(0, 3).map((article, index) => (
                  <div 
                    key={index} 
                    onClick={(e) => handleArticleClick(article, e)}
                    className="flex items-center space-x-2 text-sm text-[#4A4A4A] hover:text-[#C8102E] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span>{article}</span>
                  </div>
                ))}
                {category.articles.length > 3 && (
                  <div className="text-sm text-[#C8102E] font-medium mt-3">
                    +{category.articles.length - 3} more articles
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HelpCategories;
