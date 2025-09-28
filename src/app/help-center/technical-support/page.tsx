import {
  HelpCenterHero,
  ContactSupport
} from '../../../components/pages/help-center';
import { Shield, Smartphone, Monitor, RefreshCw, Accessibility, Settings } from 'lucide-react';
import Link from 'next/link';

const technicalArticles = [
  {
    title: 'Website not loading properly',
    description: 'Troubleshoot website loading issues',
    icon: Monitor,
    slug: 'website-issues',
    featured: true
  },
  {
    title: 'Mobile app issues',
    description: 'Fix problems with our mobile app',
    icon: Smartphone,
    slug: 'mobile-app-issues',
    featured: true
  },
  {
    title: 'Browser compatibility',
    description: 'Ensure your browser works with our site',
    icon: Shield,
    slug: 'browser-compatibility',
    featured: true
  },
  {
    title: 'Clear cache and cookies',
    description: 'How to clear your browser cache and cookies',
    icon: RefreshCw,
    slug: 'clear-cache-cookies',
    featured: false
  },
  {
    title: 'Accessibility features',
    description: 'Using accessibility features on our website',
    icon: Accessibility,
    slug: 'accessibility-features',
    featured: false
  },
  {
    title: 'System requirements',
    description: 'Minimum system requirements for our website',
    icon: Settings,
    slug: 'system-requirements',
    featured: false
  }
];

const contactMethods = [
  {
    title: 'WhatsApp Support',
    description: 'Message us on WhatsApp for instant help',
    availability: 'Available 24/7',
    icon: 'MessageCircle',
    color: 'bg-green-500',
    action: 'Chat on WhatsApp',
    whatsappNumber: '+27821234567'
  },
  {
    title: 'Phone Support',
    description: 'Call us for immediate help',
    availability: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM',
    icon: 'Phone',
    color: 'bg-blue-500',
    action: 'Call +27 11 123 4567'
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message',
    availability: 'Response within 24 hours',
    icon: 'Mail',
    color: 'bg-purple-500',
    action: 'Send Email'
  }
];

export default function TechnicalSupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HelpCenterHero 
        title="Technical Support"
        description="Everything you need to know about website issues, app problems, and technical help."
        icon="technical"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#000000] mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalArticles.filter(article => article.featured).map((article) => {
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
            {technicalArticles.map((article) => {
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
              href="/help-center/website-issues"
              className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] rounded-xl p-6 text-white text-center hover:from-[#A00E26] hover:to-[#8B0A1F] transition-all duration-300"
            >
              <Monitor className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Website Issues</h3>
              <p className="text-sm opacity-90">Troubleshoot website problems</p>
            </Link>
            <Link 
              href="/help-center/mobile-app-issues"
              className="bg-gradient-to-r from-[#4A4A4A] to-[#2D2D2D] rounded-xl p-6 text-white text-center hover:from-[#2D2D2D] hover:to-[#1A1A1A] transition-all duration-300"
            >
              <Smartphone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Mobile App</h3>
              <p className="text-sm opacity-90">Fix app-related issues</p>
            </Link>
            <Link 
              href="/help-center/browser-compatibility"
              className="bg-gradient-to-r from-[#F6E2E0] to-[#E8D5D3] rounded-xl p-6 text-[#000000] text-center hover:from-[#E8D5D3] hover:to-[#DCC8C6] transition-all duration-300"
            >
              <Shield className="h-8 w-8 mx-auto mb-3 text-[#C8102E]" />
              <h3 className="text-lg font-semibold mb-2">Browser Support</h3>
              <p className="text-sm opacity-70">Check browser compatibility</p>
            </Link>
          </div>
        </section>

        <ContactSupport contactMethods={contactMethods} />
      </div>
    </div>
  );
}
