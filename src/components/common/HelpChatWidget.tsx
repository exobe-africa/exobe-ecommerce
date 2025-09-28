"use client";

import { useState, useEffect } from 'react';
import { useUI } from '../../context/UIContext';
import { 
  MessageCircle, 
  X, 
  Search, 
  ShoppingCart, 
  Package, 
  CreditCard, 
  Truck, 
  RotateCcw, 
  User, 
  HelpCircle,
  ArrowRight,
  Phone,
  Mail,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

interface HelpOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  solutions: Solution[];
}

interface Solution {
  id: string;
  title: string;
  description: string;
  action?: {
    type: 'link' | 'whatsapp' | 'phone' | 'email';
    value: string;
    label: string;
  };
}

const helpOptions: HelpOption[] = [
  {
    id: 'orders',
    title: 'Orders & Tracking',
    description: 'Track orders, delivery issues, order status',
    icon: Package,
    color: 'bg-blue-500',
    solutions: [
      {
        id: 'track-order',
        title: 'Track My Order',
        description: 'Check the status and location of your order',
        action: {
          type: 'link',
          value: '/track-order',
          label: 'Track Order'
        }
      },
      {
        id: 'order-delay',
        title: 'Order Delayed',
        description: 'My order is taking longer than expected',
        action: {
          type: 'whatsapp',
          value: 'Hi! My order seems to be delayed. Order number: [Please provide your order number]. Can you help me check the status?',
          label: 'Contact Support'
        }
      },
      {
        id: 'wrong-order',
        title: 'Wrong Item Received',
        description: 'I received the wrong product',
        action: {
          type: 'whatsapp',
          value: 'Hi! I received the wrong item in my order. Order number: [Please provide your order number]. I need assistance with this issue.',
          label: 'Report Issue'
        }
      }
    ]
  },
  {
    id: 'payments',
    title: 'Payments & Billing',
    description: 'Payment methods, refunds, billing issues',
    icon: CreditCard,
    color: 'bg-green-500',
    solutions: [
      {
        id: 'payment-methods',
        title: 'Payment Methods',
        description: 'Learn about accepted payment options',
        action: {
          type: 'link',
          value: '/help-center/accepted-payment-methods',
          label: 'View Payment Methods'
        }
      },
      {
        id: 'payment-failed',
        title: 'Payment Failed',
        description: 'My payment was declined or failed',
        action: {
          type: 'whatsapp',
          value: 'Hi! I\'m having trouble with payment. My payment failed during checkout. Can you help me resolve this?',
          label: 'Get Payment Help'
        }
      },
      {
        id: 'refund-status',
        title: 'Refund Status',
        description: 'Check the status of my refund',
        action: {
          type: 'whatsapp',
          value: 'Hi! I would like to check the status of my refund. Order number: [Please provide your order number]. Thank you!',
          label: 'Check Refund'
        }
      }
    ]
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    description: 'Return policy, refund process, exchanges',
    icon: RotateCcw,
    color: 'bg-orange-500',
    solutions: [
      {
        id: 'return-policy',
        title: 'Return Policy',
        description: 'Learn about our return policy and conditions',
        action: {
          type: 'link',
          value: '/help-center/return-policy-and-conditions',
          label: 'View Return Policy'
        }
      },
      {
        id: 'start-return',
        title: 'Start a Return',
        description: 'Initiate a return for your order',
        action: {
          type: 'link',
          value: '/return-request',
          label: 'Start Return Request'
        }
      },
      {
        id: 'return-help',
        title: 'Return Assistance',
        description: 'I need help with returning an item',
        action: {
          type: 'whatsapp',
          value: 'Hi! I need help with returning an item. Order number: [Please provide your order number]. Reason for return: [Please describe the issue]. Thank you!',
          label: 'Get Return Help'
        }
      }
    ]
  },
  {
    id: 'account',
    title: 'Account & Profile',
    description: 'Login issues, profile settings, security',
    icon: User,
    color: 'bg-purple-500',
    solutions: [
      {
        id: 'login-issues',
        title: 'Login Problems',
        description: 'I can\'t log into my account',
        action: {
          type: 'link',
          value: '/auth/forgot-password',
          label: 'Reset Password'
        }
      },
      {
        id: 'update-profile',
        title: 'Update Profile',
        description: 'Change my account information',
        action: {
          type: 'link',
          value: '/dashboard?tab=settings',
          label: 'Go to Settings'
        }
      },
      {
        id: 'account-security',
        title: 'Account Security',
        description: 'Security concerns or suspicious activity',
        action: {
          type: 'whatsapp',
          value: 'Hi! I have security concerns about my account. I need assistance with account security. Please help me secure my account.',
          label: 'Report Security Issue'
        }
      }
    ]
  },
  {
    id: 'shopping',
    title: 'Shopping Help',
    description: 'Product questions, cart issues, checkout',
    icon: ShoppingCart,
    color: 'bg-pink-500',
    solutions: [
      {
        id: 'product-info',
        title: 'Product Information',
        description: 'I need more details about a product',
        action: {
          type: 'whatsapp',
          value: 'Hi! I need more information about a product. Product name/link: [Please provide product details]. Can you help me with more details?',
          label: 'Ask About Product'
        }
      },
      {
        id: 'checkout-issues',
        title: 'Checkout Problems',
        description: 'I\'m having trouble completing my order',
        action: {
          type: 'whatsapp',
          value: 'Hi! I\'m having trouble completing my checkout. I need assistance with placing my order. Can you help me?',
          label: 'Get Checkout Help'
        }
      },
      {
        id: 'stock-availability',
        title: 'Stock Availability',
        description: 'When will an item be back in stock?',
        action: {
          type: 'whatsapp',
          value: 'Hi! I\'m interested in a product that\'s out of stock. Product name: [Please provide product name]. When will it be available again?',
          label: 'Check Stock'
        }
      }
    ]
  },
  {
    id: 'delivery',
    title: 'Delivery & Shipping',
    description: 'Delivery times, shipping options, addresses',
    icon: Truck,
    color: 'bg-indigo-500',
    solutions: [
      {
        id: 'delivery-info',
        title: 'Delivery Information',
        description: 'Learn about delivery times and areas',
        action: {
          type: 'link',
          value: '/help-center/delivery-times-and-areas',
          label: 'View Delivery Info'
        }
      },
      {
        id: 'change-address',
        title: 'Change Delivery Address',
        description: 'I need to update my delivery address',
        action: {
          type: 'whatsapp',
          value: 'Hi! I need to change my delivery address for order: [Please provide your order number]. New address: [Please provide new address]. Thank you!',
          label: 'Update Address'
        }
      },
      {
        id: 'delivery-issues',
        title: 'Delivery Problems',
        description: 'Issues with delivery or courier',
        action: {
          type: 'whatsapp',
          value: 'Hi! I\'m having delivery issues with my order. Order number: [Please provide your order number]. Issue: [Please describe the delivery problem]. Can you help?',
          label: 'Report Delivery Issue'
        }
      }
    ]
  }
];

interface HelpChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
}

export default function HelpChatWidget({ position = 'bottom-left' }: HelpChatWidgetProps) {
  const { isMobileMenuOpen, isCartOpen } = useUI();
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'category' | 'contact'>('main');
  const [selectedCategory, setSelectedCategory] = useState<HelpOption | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  const handleCategorySelect = (category: HelpOption) => {
    setSelectedCategory(category);
    setCurrentView('category');
  };

  const handleSolutionAction = (action: Solution['action']) => {
    if (!action) return;

    switch (action.type) {
      case 'link':
        window.location.href = action.value;
        setIsOpen(false);
        break;
      case 'whatsapp':
        const whatsappUrl = `https://wa.me/27111234567?text=${encodeURIComponent(action.value)}`;
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
        break;
      case 'phone':
        window.location.href = `tel:${action.value}`;
        break;
      case 'email':
        window.location.href = `mailto:${action.value}`;
        break;
    }
  };

  const handleContactSupport = () => {
    const message = searchQuery 
      ? `Hi! I need help with: ${searchQuery}. Can you please assist me?`
      : 'Hi! I need assistance with an issue not covered in the help menu. Can you please help me?';
    
    const whatsappUrl = `https://wa.me/27111234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const filteredOptions = helpOptions.filter(option =>
    option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hide chat widget on mobile when menu or cart is open
  const shouldHide = isMobileMenuOpen || isCartOpen;

  return (
    <>
      {/* Chat Widget */}
      <div className={`fixed ${positionClasses[position]} z-50 ${shouldHide ? 'hidden md:block' : ''}`}>
        {/* Chat Panel */}
        {isOpen && (
          <div className={`absolute bottom-16 ${
            position === 'bottom-right' ? 'right-0' : 'left-0'
          } w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}>
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {currentView !== 'main' && (
                    <button
                      onClick={() => {
                        if (currentView === 'category') {
                          setCurrentView('main');
                          setSelectedCategory(null);
                        } else {
                          setCurrentView('main');
                        }
                      }}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {currentView === 'main' ? 'How can we help?' : 
                       currentView === 'category' ? selectedCategory?.title :
                       'Contact Support'}
                    </h3>
                    <p className="text-red-100 text-sm">
                      {currentView === 'main' ? 'Choose a topic below' :
                       currentView === 'category' ? 'Select a solution' :
                       'Get direct assistance'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {currentView === 'main' && (
                <div className="p-4">
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for help..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-[#000000] placeholder-gray-700"
                    />
                  </div>

                  {/* Help Categories */}
                  <div className="space-y-2">
                    {filteredOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleCategorySelect(option)}
                        className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-[#C8102E] hover:bg-red-50 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${option.color} rounded-full flex items-center justify-center`}>
                            <option.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-[#000000] group-hover:text-[#C8102E]">
                              {option.title}
                            </h4>
                            <p className="text-sm text-[#4A4A4A]">{option.description}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#C8102E]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentView === 'category' && selectedCategory && (
                <div className="p-4">
                  <div className="space-y-3">
                    {selectedCategory.solutions.map((solution) => (
                      <div key={solution.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#C8102E] transition-colors">
                        <h4 className="font-medium text-[#000000] mb-2">{solution.title}</h4>
                        <p className="text-sm text-[#4A4A4A] mb-3">{solution.description}</p>
                        {solution.action && (
                          <button
                            onClick={() => handleSolutionAction(solution.action)}
                            className="inline-flex items-center text-[#C8102E] hover:text-[#A00E26] font-medium text-sm"
                          >
                            {solution.action.label}
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="text-center">
                <p className="text-sm text-[#4A4A4A] mb-3">
                  Can't find what you're looking for?
                </p>
                <button
                  onClick={handleContactSupport}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </button>
                <div className="flex justify-center space-x-4 mt-3 text-xs text-[#4A4A4A]">
                  <button
                    onClick={() => window.location.href = 'tel:+27111234567'}
                    className="flex items-center hover:text-[#C8102E]"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Call Us
                  </button>
                  <button
                    onClick={() => window.location.href = 'mailto:support@exobe.africa'}
                    className="flex items-center hover:text-[#C8102E]"
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 bg-[#C8102E] hover:bg-[#A00E26] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-label="Open help chat"
        >
          {isOpen ? (
            <X className="h-6 w-6 transition-transform duration-300" />
          ) : (
            <MessageCircle className="h-6 w-6 transition-transform duration-300" />
          )}
        </button>

        {/* Pulse animation */}
        {!isOpen && (
          <div className="absolute inset-0 w-14 h-14 bg-[#C8102E] rounded-full animate-ping opacity-20 pointer-events-none"></div>
        )}

        {/* Notification badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#25D366] text-white rounded-full flex items-center justify-center text-xs font-bold animate-bounce pointer-events-none">
            ?
          </div>
        )}
      </div>
    </>
  );
}
