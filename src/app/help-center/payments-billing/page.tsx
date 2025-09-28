import {
  HelpCenterHero,
  ContactSupport
} from '../../../components/pages/help-center';
import { CreditCard, Shield, AlertTriangle, Clock, FileText, DollarSign, MessageCircle, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const paymentsArticles = [
  {
    title: 'Accepted payment methods',
    description: 'All the payment options we accept',
    icon: CreditCard,
    slug: 'accepted-payment-methods',
    featured: true
  },
  {
    title: 'Payment security and safety',
    description: 'How we protect your payment information',
    icon: Shield,
    slug: 'payment-security',
    featured: true
  },
  {
    title: 'Failed payment troubleshooting',
    description: 'What to do when payments fail',
    icon: AlertTriangle,
    slug: 'payment-troubleshooting',
    featured: true
  },
  {
    title: 'Refund processing times',
    description: 'How long refunds take to appear in your account',
    icon: Clock,
    slug: 'refund-processing',
    featured: false
  },
  {
    title: 'Invoice and receipt queries',
    description: 'Getting copies of invoices and receipts',
    icon: FileText,
    slug: 'invoice-receipt-queries',
    featured: false
  },
  {
    title: 'Payment plan options',
    description: 'Available payment plans and financing options',
    icon: DollarSign,
    slug: 'payment-plan-options',
    featured: false
  }
];

const contactMethods = [
  {
    title: 'WhatsApp Support',
    description: 'Message us on WhatsApp for instant help',
    availability: 'Available 24/7',
    icon: MessageCircle,
    color: 'bg-green-500',
    action: 'Chat on WhatsApp',
    whatsappNumber: '+27821234567'
  },
  {
    title: 'Phone Support',
    description: 'Call us for immediate help',
    availability: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM',
    icon: Phone,
    color: 'bg-blue-500',
    action: 'Call +27 11 123 4567'
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message',
    availability: 'Response within 24 hours',
    icon: Mail,
    color: 'bg-purple-500',
    action: 'Send Email'
  }
];

export default function PaymentsBillingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HelpCenterHero 
        title="Payments & Billing"
        description="Everything you need to know about payment methods, billing, and transaction issues."
        icon={CreditCard}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#000000] mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentsArticles.filter(article => article.featured).map((article) => {
              const IconComponent = article.icon;
              return (
                <Link 
                  key={article.slug}
                  href={`/help-center/${article.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#000000] group-hover:text-[#C8102E] transition-colors mb-2">
                        {article.title}
                      </h3>
                      <p className="text-[#4A4A4A] text-sm">{article.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#000000] mb-6">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentsArticles.map((article) => {
              const IconComponent = article.icon;
              return (
                <Link 
                  key={article.slug}
                  href={`/help-center/${article.slug}`}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#C8102E] rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#000000] group-hover:text-[#C8102E] transition-colors text-sm">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#000000] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/help-center/accepted-payment-methods"
              className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] rounded-xl p-6 text-white text-center hover:from-[#A00E26] hover:to-[#8B0A1F] transition-all duration-300"
            >
              <CreditCard className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
              <p className="text-sm opacity-90">View accepted payment options</p>
            </Link>
            <Link 
              href="/dashboard?tab=orders"
              className="bg-gradient-to-r from-[#4A4A4A] to-[#2D2D2D] rounded-xl p-6 text-white text-center hover:from-[#2D2D2D] hover:to-[#1A1A1A] transition-all duration-300"
            >
              <FileText className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Order History</h3>
              <p className="text-sm opacity-90">View invoices and receipts</p>
            </Link>
            <Link 
              href="/help-center/payment-security"
              className="bg-gradient-to-r from-[#F6E2E0] to-[#E8D5D3] rounded-xl p-6 text-[#000000] text-center hover:from-[#E8D5D3] hover:to-[#DCC8C6] transition-all duration-300"
            >
              <Shield className="h-8 w-8 mx-auto mb-3 text-[#C8102E]" />
              <h3 className="text-lg font-semibold mb-2">Payment Security</h3>
              <p className="text-sm opacity-70">Learn about our security measures</p>
            </Link>
          </div>
        </section>

        <ContactSupport contactMethods={contactMethods} />
      </div>
    </div>
  );
}
