"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Clock, 
  Mail, 
  Phone,
  Download,
  Share2,
  ArrowRight,
  Home,
  ShoppingBag,
  Heart,
  Star
} from 'lucide-react';
import { Navbar, Footer } from '../../../components';

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    // Generate order number or get from URL params
    const orderNum = searchParams.get('order') || `EXO${Date.now().toString().slice(-6)}`;
    const email = searchParams.get('email') || 'customer@example.com';
    const total = parseFloat(searchParams.get('total') || '0');
    
    setOrderNumber(orderNum);
    setCustomerEmail(email);
    setOrderTotal(total);
  }, [searchParams]);

  const handleShare = async () => {
    const shareData = {
      title: 'Order Confirmed - eXobe',
      text: `My order ${orderNumber} has been confirmed on eXobe!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        // Could show a toast here
      }
    } catch (err) {
      console.log('Sharing failed');
    }
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-lg text-[#4A4A4A] mb-2">
            Thank you for shopping with eXobe
          </p>
          <p className="text-sm text-[#4A4A4A]">
            Your order has been successfully placed and is being processed
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Details Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Package className="h-6 w-6 mr-2" />
                  Order Details
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-1">Order Number</p>
                    <p className="text-lg font-bold text-[#C8102E]">#{orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-1">Order Date</p>
                    <p className="text-lg font-semibold text-[#000000]">
                      {new Date().toLocaleDateString('en-ZA', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-1">Total Amount</p>
                    <p className="text-lg font-bold text-[#C8102E]">
                      R{orderTotal > 0 ? orderTotal.toFixed(2) : '1,299.99'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#4A4A4A] mb-1">Payment Status</p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-lg font-semibold text-green-600">Confirmed</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-[#C8102E] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center">
                    <Download className="h-5 w-5 mr-2" />
                    Download Receipt
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex-1 border-2 border-[#C8102E] text-[#C8102E] py-3 px-4 rounded-lg font-semibold hover:bg-[#C8102E] hover:text-white transition-colors flex items-center justify-center"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Order
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
                <Truck className="h-6 w-6 mr-2 text-[#C8102E]" />
                Delivery Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-semibold text-blue-800">Estimated Delivery</p>
                      <p className="text-sm text-blue-600">
                        {estimatedDelivery.toLocaleDateString('en-ZA', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-800">FREE</p>
                    <p className="text-xs text-blue-600">Standard Delivery</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-[#000000] mb-2">Tracking Available</p>
                    <p className="text-sm text-[#4A4A4A]">
                      We'll send you tracking information once your order ships
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-[#000000] mb-2">Delivery Updates</p>
                    <p className="text-sm text-[#4A4A4A]">
                      SMS and email notifications will keep you informed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-[#000000] mb-6">What happens next?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#C8102E] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-[#000000]">Order Processing</p>
                    <p className="text-sm text-[#4A4A4A]">We're preparing your items for shipment (1-2 business days)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-[#000000]">Shipping</p>
                    <p className="text-sm text-[#4A4A4A]">Your order will be dispatched and tracking info sent</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-[#000000]">Delivery</p>
                    <p className="text-sm text-[#4A4A4A]">Enjoy your new items from eXobe!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Support */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#000000] mb-4">Need Help?</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#C8102E]" />
                  <div>
                    <p className="font-medium text-[#000000]">Email Support</p>
                    <p className="text-sm text-[#4A4A4A]">support@exobe.co.za</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#C8102E]" />
                  <div>
                    <p className="font-medium text-[#000000]">Call Us</p>
                    <p className="text-sm text-[#4A4A4A]">+27 11 123 4567</p>
                  </div>
                </div>
              </div>
              
              <Link href="/help-center" className="block mt-4">
                <button className="w-full bg-gray-100 text-[#4A4A4A] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Visit Help Centre
                </button>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#000000] mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link href="/" className="block">
                  <button className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-medium hover:bg-[#A00E26] transition-colors flex items-center justify-center">
                    <Home className="h-5 w-5 mr-2" />
                    Continue Shopping
                  </button>
                </Link>
                
                <Link href="/categories" className="block">
                  <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-3 rounded-lg font-medium hover:bg-[#C8102E] hover:text-white transition-colors flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Browse Categories
                  </button>
                </Link>
                
                <Link href="/wishlist" className="block">
                  <button className="w-full bg-gray-100 text-[#4A4A4A] py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                    <Heart className="h-5 w-5 mr-2" />
                    View Wishlist
                  </button>
                </Link>
              </div>
            </div>

            {/* Rate Your Experience */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 p-6">
              <h3 className="text-lg font-semibold text-[#000000] mb-3">Rate Your Experience</h3>
              <p className="text-sm text-[#4A4A4A] mb-4">
                How was your shopping experience with eXobe?
              </p>
              
              <div className="flex justify-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-yellow-400 hover:text-yellow-500 transition-colors">
                    <Star className="h-8 w-8 fill-current" />
                  </button>
                ))}
              </div>
              
              <button className="w-full bg-yellow-400 text-yellow-900 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
                Submit Rating
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Email Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Confirmation Email Sent</h3>
          <p className="text-blue-700 mb-4">
            We've sent a detailed order confirmation to <span className="font-semibold">{customerEmail}</span>
          </p>
          <p className="text-sm text-blue-600">
            Don't see it? Check your spam folder or <Link href="/help-center" className="underline hover:no-underline">contact support</Link>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
