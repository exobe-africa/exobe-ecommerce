"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Package, Truck, Mail, ArrowRight, ShoppingBag, Receipt } from 'lucide-react';

interface OrderSuccessSectionProps {
  orderNumber?: string;
}

const OrderSuccessSection: React.FC<OrderSuccessSectionProps> = ({ 
  orderNumber = `EXO${Date.now().toString().slice(-6)}` 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-gray-50 py-8 sm:py-16 px-4 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#C8102E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C8102E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000" />
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#C8102E] rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className={`max-w-4xl mx-auto transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Success Header with Animation */}
          <div className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-5" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full mb-6 animate-scale-in shadow-xl">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#C8102E] animate-check-draw" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 animate-fade-in-up">
                Order Confirmed!
              </h1>
              <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                Thank you for shopping with us! Your order has been confirmed and is being prepared for shipment.
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-6 sm:p-10">
            {/* Order Number Badge */}
            <div className="bg-gradient-to-br from-gray-50 to-red-50/30 rounded-2xl p-6 sm:p-8 mb-8 border-2 border-[#C8102E]/20 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Receipt className="w-5 h-5 text-[#C8102E]" />
                <p className="text-sm font-medium text-[#4A4A4A]">Order Number</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-[#000000] tracking-wide">
                #{orderNumber}
              </p>
              <p className="text-xs text-[#4A4A4A] mt-2">
                Please save this number for tracking your order
              </p>
            </div>

            {/* What's Next Section */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#000000] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#C8102E] text-white rounded-full flex items-center justify-center text-sm">
                  ✓
                </span>
                What Happens Next?
              </h2>
              
              <div className="grid gap-4">
                {[
                  {
                    icon: <Mail className="w-6 h-6" />,
                    title: 'Order Confirmation',
                    description: 'You will receive an email confirmation shortly with your order details',
                    color: 'from-blue-500 to-blue-600'
                  },
                  {
                    icon: <Package className="w-6 h-6" />,
                    title: 'Processing',
                    description: 'Our team is preparing your order for shipment',
                    color: 'from-purple-500 to-purple-600'
                  },
                  {
                    icon: <Truck className="w-6 h-6" />,
                    title: 'Shipping Update',
                    description: 'Track your order once it\'s shipped (usually within 24-48 hours)',
                    color: 'from-green-500 to-green-600'
                  }
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:translate-x-2 group"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${step.color} text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#000000] mb-1">{step.title}</h3>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/" className="group">
                <button className="w-full bg-gradient-to-r from-[#C8102E] to-[#A00E26] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link href="/dashboard?tab=orders" className="group">
                <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-4 px-6 rounded-xl font-semibold hover:bg-[#C8102E] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                  <Package className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>View Orders</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: '🔒', title: 'Secure Payment', desc: '256-bit SSL encryption' },
            { icon: '🚚', title: 'Free Shipping', desc: 'On orders over R499' },
            { icon: '📞', title: '24/7 Support', desc: 'Always here to help' }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-[#000000] mb-1">{item.title}</h3>
              <p className="text-sm text-[#4A4A4A]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes check-draw {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-check-draw {
          animation: check-draw 0.6s ease-out 0.3s;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessSection;
