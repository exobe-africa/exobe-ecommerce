"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { XCircle, AlertTriangle, ArrowRight, ShoppingBag, RefreshCcw, Mail } from 'lucide-react';

export default function OrderFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasMounted, setHasMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const error = searchParams.get('error');
    setErrorMessage(error || 'An unexpected error occurred while processing your order.');
    
    setTimeout(() => setIsVisible(true), 100);
  }, [searchParams]);

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8102E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-gray-50 py-8 sm:py-16 px-4 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-1000" />
      </div>

      <div className={`max-w-4xl mx-auto transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Main Error Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Error Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-5" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full mb-6 animate-scale-in shadow-xl">
                <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 animate-shake" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 animate-fade-in-up">
                Order Failed
              </h1>
              <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
                We couldn't process your order. Please try again or contact support if the issue persists.
              </p>
            </div>
          </div>

          {/* Error Details */}
          <div className="p-6 sm:p-10">
            {/* Error Message */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8 mb-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <p className="text-lg font-semibold text-red-900">Error Details</p>
              </div>
              <p className="text-red-800 leading-relaxed">
                {errorMessage}
              </p>
            </div>

            {/* What to Do Section */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#000000] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#C8102E] text-white rounded-full flex items-center justify-center text-sm">
                  !
                </span>
                What You Can Do
              </h2>
              
              <div className="grid gap-4">
                {[
                  {
                    icon: <RefreshCcw className="w-6 h-6" />,
                    title: 'Try Again',
                    description: 'Return to checkout and attempt to place your order again',
                    color: 'from-blue-500 to-blue-600'
                  },
                  {
                    icon: <ShoppingBag className="w-6 h-6" />,
                    title: 'Review Your Cart',
                    description: 'Check that all items are still available and properly configured',
                    color: 'from-purple-500 to-purple-600'
                  },
                  {
                    icon: <Mail className="w-6 h-6" />,
                    title: 'Contact Support',
                    description: 'Reach out to our support team if you continue experiencing issues',
                    color: 'from-green-500 to-green-600'
                  }
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:translate-x-2 group"
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
              <Link href="/checkout" className="group">
                <button className="w-full bg-gradient-to-r from-[#C8102E] to-[#A00E26] text-white py-4 px-6 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                  <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Try Again</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link href="/" className="group">
                <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-4 px-6 rounded-xl font-semibold hover:bg-[#C8102E] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105">
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Help Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: '💬', title: 'Live Chat', desc: 'Chat with our support team' },
            { icon: '📧', title: 'Email Us', desc: 'support@exobe.co.za' },
            { icon: '📞', title: 'Call Us', desc: '24/7 support available' }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
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
        
        @keyframes shake {
          0%, 100% {
            transform: rotate(0deg);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: rotate(-5deg);
          }
          20%, 40%, 60%, 80% {
            transform: rotate(5deg);
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
        
        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .animate-shake {
          animation: shake 0.6s ease-in-out 0.3s;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}

