"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  XCircle, 
  AlertTriangle, 
  CreditCard, 
  RefreshCw, 
  Phone,
  Mail,
  MessageCircle,
  ShoppingCart,
  Home,
  Clock,
  Shield,
  HelpCircle,
  CheckCircle
} from 'lucide-react';
import { Navbar, Footer } from '../../../components';

export default function OrderFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorType, setErrorType] = useState('payment');
  const [orderAttempt, setOrderAttempt] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const error = searchParams.get('error') || 'payment';
    const attempt = searchParams.get('attempt') || `FA${Date.now().toString().slice(-6)}`;
    const retry = parseInt(searchParams.get('retry') || '0');
    
    setErrorType(error);
    setOrderAttempt(attempt);
    setRetryCount(retry);
  }, [searchParams]);

  const getErrorDetails = () => {
    switch (errorType) {
      case 'payment':
        return {
          title: 'Payment Failed',
          subtitle: 'Your payment could not be processed',
          icon: CreditCard,
          color: 'red',
          description: 'There was an issue processing your payment. This could be due to insufficient funds, an expired card, or a temporary issue with your payment provider.'
        };
      case 'network':
        return {
          title: 'Connection Error',
          subtitle: 'Network connection was interrupted',
          icon: AlertTriangle,
          color: 'orange',
          description: 'We lost connection during the checkout process. Your payment was not charged. Please check your internet connection and try again.'
        };
      case 'system':
        return {
          title: 'System Error',
          subtitle: 'A technical error occurred',
          icon: XCircle,
          color: 'red',
          description: 'We encountered a technical issue while processing your order. Our team has been notified and is working to resolve this.'
        };
      default:
        return {
          title: 'Order Failed',
          subtitle: 'Something went wrong',
          icon: XCircle,
          color: 'red',
          description: 'We were unable to complete your order. Please try again or contact our support team for assistance.'
        };
    }
  };

  const errorDetails = getErrorDetails();
  const IconComponent = errorDetails.icon;

  const handleRetryPayment = () => {
    router.push('/checkout');
  };

  const handleContactSupport = () => {
    router.push('/help-center');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Error Header */}
        <div className="text-center mb-12">
          <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r ${
            errorDetails.color === 'red' ? 'from-red-400 to-red-600' : 'from-orange-400 to-orange-600'
          } rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
            <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
            {errorDetails.title}
          </h1>
          <p className="text-lg text-[#4A4A4A] mb-2">
            {errorDetails.subtitle}
          </p>
          <p className="text-sm text-[#4A4A4A]">
            Don't worry - no payment has been charged to your account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Error Details Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className={`bg-gradient-to-r ${
                errorDetails.color === 'red' ? 'from-red-500 to-red-600' : 'from-orange-500 to-orange-600'
              } px-6 py-4`}>
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  What Happened?
                </h2>
              </div>
              
              <div className="p-6">
                <p className="text-[#4A4A4A] mb-6 leading-relaxed">
                  {errorDetails.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-[#4A4A4A] mb-1">Attempt ID</p>
                    <p className="text-lg font-semibold text-[#000000]">#{orderAttempt}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-[#4A4A4A] mb-1">Time</p>
                    <p className="text-lg font-semibold text-[#000000]">
                      {new Date().toLocaleTimeString('en-ZA', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleRetryPayment}
                    className="flex-1 bg-[#C8102E] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center"
                  >
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Try Again
                  </button>
                  <button 
                    onClick={handleContactSupport}
                    className="flex-1 border-2 border-[#C8102E] text-[#C8102E] py-3 px-4 rounded-lg font-semibold hover:bg-[#C8102E] hover:text-white transition-colors flex items-center justify-center"
                  >
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Get Help
                  </button>
                </div>
              </div>
            </div>

            {/* Common Solutions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                Common Solutions
              </h3>
              
              <div className="space-y-4">
                {errorType === 'payment' && (
                  <>
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800">Check Your Card Details</p>
                        <p className="text-sm text-blue-700">Verify your card number, expiry date, and CVV are correct</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800">Verify Available Balance</p>
                        <p className="text-sm text-blue-700">Ensure you have sufficient funds for this purchase</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800">Try a Different Card</p>
                        <p className="text-sm text-blue-700">Use an alternative payment method if available</p>
                      </div>
                    </div>
                  </>
                )}

                {errorType === 'network' && (
                  <>
                    <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-semibold text-orange-800">Check Your Connection</p>
                        <p className="text-sm text-orange-700">Ensure you have a stable internet connection</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-semibold text-orange-800">Refresh and Retry</p>
                        <p className="text-sm text-orange-700">Reload the page and attempt the purchase again</p>
                      </div>
                    </div>
                  </>
                )}

                {errorType === 'system' && (
                  <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                      !
                    </div>
                    <div>
                      <p className="font-semibold text-red-800">System Issue Detected</p>
                      <p className="text-sm text-red-700">Our technical team has been notified. Please try again in a few minutes or contact support.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-green-800">Your Information is Safe</h3>
              </div>
              <div className="space-y-2 text-sm text-green-700">
                <p>• No payment has been processed or charged</p>
                <p>• Your payment information remains secure</p>
                <p>• All transactions use 256-bit SSL encryption</p>
                <p>• Your cart items have been saved for 24 hours</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Support */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#000000] mb-4">Need Immediate Help?</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-[#C8102E]" />
                  <div>
                    <p className="font-medium text-[#000000]">Call Support</p>
                    <p className="text-sm text-[#4A4A4A]">+27 11 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-[#C8102E]" />
                  <div>
                    <p className="font-medium text-[#000000]">Live Chat</p>
                    <p className="text-sm text-[#4A4A4A]">Available 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-[#C8102E]" />
                  <div>
                    <p className="font-medium text-[#000000]">Email Us</p>
                    <p className="text-sm text-[#4A4A4A]">support@exobe.co.za</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-[#C8102E] text-white py-3 rounded-lg font-medium hover:bg-[#A00E26] transition-colors">
                Contact Support Now
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#000000] mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link href="/cart" className="block">
                  <button className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-medium hover:bg-[#A00E26] transition-colors flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Return to Cart
                  </button>
                </Link>
                
                <Link href="/" className="block">
                  <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-3 rounded-lg font-medium hover:bg-[#C8102E] hover:text-white transition-colors flex items-center justify-center">
                    <Home className="h-5 w-5 mr-2" />
                    Continue Shopping
                  </button>
                </Link>
                
                <Link href="/help-center" className="block">
                  <button className="w-full bg-gray-100 text-[#4A4A4A] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Help Centre
                  </button>
                </Link>
              </div>
            </div>

            {/* Status Updates */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Your Cart is Saved
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                Don't worry! We've saved your items for 24 hours. You can return anytime to complete your purchase.
              </p>
              <div className="flex items-center text-xs text-blue-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                Items reserved until tomorrow
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Payment Methods */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-[#000000] mb-6 text-center">Try Alternative Payment Methods</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-[#C8102E] transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <p className="font-semibold text-[#000000]">Different Card</p>
              <p className="text-sm text-[#4A4A4A]">Try another credit/debit card</p>
            </div>
            
            <div className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-[#C8102E] transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💳</span>
              </div>
              <p className="font-semibold text-[#000000]">PayPal</p>
              <p className="text-sm text-[#4A4A4A]">Pay with your PayPal account</p>
            </div>
            
            <div className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-[#C8102E] transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🏦</span>
              </div>
              <p className="font-semibold text-[#000000]">Bank Transfer</p>
              <p className="text-sm text-[#4A4A4A]">Direct EFT payment</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
