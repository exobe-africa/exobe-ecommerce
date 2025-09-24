"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ShoppingBag, CreditCard, RotateCcw, User, Shield } from 'lucide-react';

const faqCategories = [
  {
    id: 'orders',
    title: 'Orders & Delivery',
    icon: ShoppingBag,
    color: 'bg-blue-500',
    questions: [
      {
        question: "How long does delivery take?",
        answer: "Standard delivery takes 3-5 business days within South Africa. Express delivery (1-2 days) and same-day delivery (4-6 hours in major cities) are also available. Free standard delivery on orders over R499."
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can track your package on our website or through the courier's tracking system. You'll also receive SMS updates on delivery progress."
      },
      {
        question: "What if I'm not home for delivery?",
        answer: "Our couriers will attempt delivery up to 3 times. If unsuccessful, your package will be held at the nearest collection point for 7 days. You'll receive notification with collection details."
      },
      {
        question: "Can I change my delivery address after ordering?",
        answer: "You can change your delivery address within 2 hours of placing your order by contacting our support team. Once the order has been dispatched, address changes are not possible."
      },
      {
        question: "Do you deliver to rural areas?",
        answer: "Yes, we deliver nationwide across South Africa, including rural areas. Delivery to remote areas may take 5-7 business days and may incur additional fees. Collection points are often faster for rural deliveries."
      },
      {
        question: "What are your delivery hours?",
        answer: "Standard delivery: Monday-Friday 8AM-5PM, Saturday 8AM-1PM. Express and same-day delivery: Monday-Friday 8AM-6PM, Saturday 8AM-2PM. No deliveries on Sundays or public holidays."
      }
    ]
  },
  {
    id: 'payments',
    title: 'Payments & Billing',
    icon: CreditCard,
    color: 'bg-green-500',
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards (Visa, Mastercard, American Express), EFT, mobile payments (SnapScan, Zapper, Google Pay), and Buy Now Pay Later options (PayJustNow, Mobicred)."
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. We use SSL encryption, are PCI DSS compliant, and implement 3D Secure authentication. We never store your full card details on our servers - all payments are processed through certified payment partners."
      },
      {
        question: "Why was my payment declined?",
        answer: "Common reasons include insufficient funds, incorrect card details, or bank restrictions on online purchases. Contact your bank to authorise online transactions, or try a different payment method."
      },
      {
        question: "How long do EFT payments take to process?",
        answer: "Instant EFT payments are processed immediately. Manual EFT payments can take 24-48 hours to clear. Your order will only be dispatched once payment is confirmed."
      },
      {
        question: "Can I get an invoice for my purchase?",
        answer: "Yes, you'll receive a tax invoice via email after your order is confirmed. You can also download invoices from your account under 'My Orders'. VAT-registered businesses can request formal tax invoices."
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we partner with PayJustNow (3 interest-free payments) and Mobicred for flexible payment options. Approval is subject to credit checks and terms and conditions apply."
      }
    ]
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    icon: RotateCcw,
    color: 'bg-orange-500',
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached, unopened, and in original packaging. Proof of purchase is required."
      },
      {
        question: "How do I return an item?",
        answer: "Log into your account, go to 'My Orders', find the item and click 'Return Item'. Select your reason, print the prepaid return label, and send the item back. We'll process your refund within 5-7 business days of receiving the returned item."
      },
      {
        question: "What items cannot be returned?",
        answer: "Personal care items, underwear, swimwear, customised products, digital downloads, and gift cards cannot be returned for hygiene and policy reasons. Items damaged by misuse are also not eligible."
      },
      {
        question: "How long do refunds take?",
        answer: "Refunds are processed within 5-7 business days after we receive and inspect your returned item. Credit/debit card refunds take 5-7 business days, EFT refunds take 2-3 days, and store credit is immediate."
      },
      {
        question: "Can I exchange an item instead of returning it?",
        answer: "Yes, we offer exchanges for different sizes, colours, or styles of the same product, subject to availability. Price differences will be charged or refunded accordingly."
      },
      {
        question: "Who pays for return shipping?",
        answer: "Return shipping is free for defective items. For other returns, you can use our prepaid return label (cost deducted from refund) or arrange your own shipping."
      }
    ]
  },
  {
    id: 'account',
    title: 'Account & Profile',
    icon: User,
    color: 'bg-purple-500',
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click 'Sign Up' in the top navigation, fill in your details (email, name, mobile, password), verify your email address, and you're ready to shop! You can also create an account during checkout."
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
      },
      {
        question: "How do I update my personal information?",
        answer: "Log into your account and go to 'My Profile'. You can update your name, email, mobile number, addresses, and communication preferences. Don't forget to save your changes!"
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can request account deletion by contacting our support team. Please note that this action is permanent and you'll lose access to order history, wishlists, and stored information."
      },
      {
        question: "Why should I create an account?",
        answer: "Account benefits include faster checkout, order tracking, wishlist functionality, exclusive member offers, and easy access to your purchase history and returns."
      },
      {
        question: "How do I change my email preferences?",
        answer: "In your account settings, go to 'Communication Preferences' to manage newsletter subscriptions, promotional emails, and order notifications. You can unsubscribe from marketing emails anytime."
      }
    ]
  },
  {
    id: 'products',
    title: 'Products & Stock',
    icon: Shield,
    color: 'bg-pink-500',
    questions: [
      {
        question: "How do I know if an item is in stock?",
        answer: "Stock availability is shown on each product page. 'In Stock' means immediate dispatch, 'Limited Stock' means few items left, and 'Out of Stock' means currently unavailable. You can set notifications for restocked items."
      },
      {
        question: "Do you offer warranties on products?",
        answer: "Yes, all products come with manufacturer warranties ranging from 6-24 months depending on the category. We also offer our eXobe Quality Guarantee and optional extended warranty coverage."
      },
      {
        question: "How do I find the right size?",
        answer: "Each product page includes detailed size guides and measurements. For clothing and shoes, refer to our size charts. If you're unsure, our customer service team can help with sizing recommendations."
      },
      {
        question: "Can I request a product that's not available?",
        answer: "Absolutely! Contact us with product details and we'll try to source it for you. Popular requests may be added to our regular inventory. We'll notify you if we can fulfill your request."
      },
      {
        question: "How do I know if a product is authentic?",
        answer: "We only sell authentic products from authorised suppliers and official brand partners. All items come with proper documentation and warranties. Counterfeit products are never tolerated."
      },
      {
        question: "What if I receive a damaged or defective item?",
        answer: "Contact us immediately with photos of the damage. We'll arrange a free return and provide a full refund or replacement. Defective items are covered under our quality guarantee regardless of the return period."
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Support',
    icon: HelpCircle,
    color: 'bg-indigo-500',
    questions: [
      {
        question: "The website isn't loading properly. What should I do?",
        answer: "Try refreshing the page, clearing your browser cache, or using a different browser. Ensure you have a stable internet connection. If issues persist, contact our technical support team."
      },
      {
        question: "I'm having trouble placing an order. How can I get help?",
        answer: "Common issues include payment problems or address validation errors. Try using a different payment method or browser. Our live chat support can assist you in completing your order."
      },
      {
        question: "Can I shop on mobile devices?",
        answer: "Yes! Our website is fully optimised for mobile devices and tablets. For the best experience, use the latest version of your mobile browser or consider using our mobile app when available."
      },
      {
        question: "Do you have a mobile app?",
        answer: "We're currently developing our mobile app for iOS and Android. In the meantime, our mobile website provides a great shopping experience with all the same features."
      },
      {
        question: "How do I enable cookies?",
        answer: "Cookies are required for shopping cart functionality. In your browser settings, ensure cookies are enabled for exobe.africa. Instructions vary by browser - contact us if you need specific help."
      },
      {
        question: "What browsers do you support?",
        answer: "We support the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, please ensure your browser is up to date. Internet Explorer is not supported."
      }
    ]
  }
];

interface FAQCategoriesSectionProps {
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

const FAQCategoriesSection: React.FC<FAQCategoriesSectionProps> = ({
  searchQuery,
  selectedCategory,
  setSearchQuery,
  setSelectedCategory
}) => {
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    category.questions.length > 0 && 
    (selectedCategory === '' || category.id === selectedCategory)
  );

  return (
    <section>
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16">
          <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-[#000000] mb-2">No results found</h3>
          <p className="text-[#4A4A4A] mb-6">
            Try adjusting your search terms or browse all categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
            }}
            className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 lg:p-8 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-[#000000]">{category.title}</h2>
                      <p className="text-[#4A4A4A]">{category.questions.length} questions</p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq, index) => {
                    const key = `${category.id}-${index}`;
                    const isOpen = openQuestions[key];
                    
                    return (
                      <div key={index} className="p-6 lg:p-8">
                        <button
                          onClick={() => toggleQuestion(category.id, index)}
                          className="w-full flex items-center justify-between text-left group"
                        >
                          <h3 className="text-lg font-semibold text-[#000000] group-hover:text-[#C8102E] transition-colors pr-4">
                            {faq.question}
                          </h3>
                          <div className="flex-shrink-0">
                            {isOpen ? (
                              <ChevronUp className="h-6 w-6 text-[#4A4A4A] group-hover:text-[#C8102E] transition-colors" />
                            ) : (
                              <ChevronDown className="h-6 w-6 text-[#4A4A4A] group-hover:text-[#C8102E] transition-colors" />
                            )}
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="mt-4 pr-8">
                            <p className="text-[#4A4A4A] leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FAQCategoriesSection;
