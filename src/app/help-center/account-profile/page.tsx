import {
  HelpCenterHero,
  ContactSupport
} from '../../../components/pages/help-center';
import { User, Key, Edit, Shield, Mail, Trash2, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

const accountArticles = [
  {
    title: 'Creating an account',
    description: 'How to create a new eXobe account',
    icon: User,
    slug: 'how-to-create-an-account',
    featured: true
  },
  {
    title: 'Password reset help',
    description: 'Reset your password if you forgot it',
    icon: Key,
    slug: 'password-reset',
    featured: true
  },
  {
    title: 'Update personal information',
    description: 'How to update your profile and personal details',
    icon: Edit,
    slug: 'update-profile',
    featured: true
  },
  {
    title: 'Account security settings',
    description: 'Manage your account security and privacy settings',
    icon: Shield,
    slug: 'account-security',
    featured: false
  },
  {
    title: 'Email preferences',
    description: 'Manage your email notification preferences',
    icon: Mail,
    slug: 'email-preferences',
    featured: false
  },
  {
    title: 'Delete my account',
    description: 'How to permanently delete your account',
    icon: Trash2,
    slug: 'delete-account',
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

export default function AccountProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HelpCenterHero 
        title="Account & Profile"
        description="Everything you need to know about managing your account, profile, and login issues."
        icon={User}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#000000] mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accountArticles.filter(article => article.featured).map((article) => {
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
            {accountArticles.map((article) => {
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
              href="/auth/register"
              className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] rounded-xl p-6 text-white text-center hover:from-[#A00E26] hover:to-[#8B0A1F] transition-all duration-300"
            >
              <User className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Create Account</h3>
              <p className="text-sm opacity-90">Sign up for a new account</p>
            </Link>
            <Link 
              href="/dashboard"
              className="bg-gradient-to-r from-[#4A4A4A] to-[#2D2D2D] rounded-xl p-6 text-white text-center hover:from-[#2D2D2D] hover:to-[#1A1A1A] transition-all duration-300"
            >
              <Edit className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">My Dashboard</h3>
              <p className="text-sm opacity-90">Manage your account settings</p>
            </Link>
            <Link 
              href="/auth/login"
              className="bg-gradient-to-r from-[#F6E2E0] to-[#E8D5D3] rounded-xl p-6 text-[#000000] text-center hover:from-[#E8D5D3] hover:to-[#DCC8C6] transition-all duration-300"
            >
              <Key className="h-8 w-8 mx-auto mb-3 text-[#C8102E]" />
              <h3 className="text-lg font-semibold mb-2">Sign In</h3>
              <p className="text-sm opacity-70">Access your account</p>
            </Link>
          </div>
        </section>

        <ContactSupport contactMethods={contactMethods} />
      </div>
    </div>
  );
}
