import Link from 'next/link';
import { ArrowLeft, Truck, Search, Mail, MessageCircle, CheckCircle, Clock, Package, MapPin } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-[#4A4A4A] mb-6">
            <Link href="/" className="hover:text-[#C8102E] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/help-center" className="hover:text-[#C8102E] transition-colors">Help Centre</Link>
            <span>/</span>
            <span className="text-[#000000] font-medium">How to track my order</span>
          </div>

          {/* Back Button */}
          <Link href="/help-center" className="inline-flex items-center text-[#C8102E] hover:text-[#A00E26] transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Centre
          </Link>

          {/* Title */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-[#F6E2E0] rounded-xl flex items-center justify-center">
              <Truck className="h-8 w-8 text-[#C8102E]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-2">How to track my order</h1>
              <p className="text-lg text-[#4A4A4A]">Orders & Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12">
              
              {/* Introduction */}
              <div className="mb-10">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  Tracking your eXobe order is quick and easy. Once your order has been dispatched, you'll receive tracking information 
                  to monitor your package every step of the way to your door.
                </p>
              </div>

              {/* Order Status Timeline */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Order Status Timeline</h2>
                <div className="space-y-6">
                  {[
                    {
                      status: 'Order Confirmed',
                      description: 'Your order has been received and is being processed',
                      icon: CheckCircle,
                      color: 'text-green-500'
                    },
                    {
                      status: 'Processing',
                      description: 'We\'re preparing your items for shipment',
                      icon: Package,
                      color: 'text-blue-500'
                    },
                    {
                      status: 'Shipped',
                      description: 'Your order has been dispatched and is on its way',
                      icon: Truck,
                      color: 'text-orange-500'
                    },
                    {
                      status: 'Out for Delivery',
                      description: 'Your package is out for delivery and will arrive today',
                      icon: MapPin,
                      color: 'text-purple-500'
                    },
                    {
                      status: 'Delivered',
                      description: 'Your order has been successfully delivered',
                      icon: CheckCircle,
                      color: 'text-green-500'
                    }
                  ].map((step, index) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${step.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#000000] mb-1">{step.status}</h3>
                          <p className="text-[#4A4A4A]">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tracking Methods */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">How to Track Your Order</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Method 1 */}
                  <div className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
                    <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center mb-4">
                      <Search className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3">Online Tracking</h3>
                    <ol className="list-decimal list-inside space-y-2 text-[#4A4A4A]">
                      <li>Go to the eXobe website</li>
                      <li>Click on "Track Order" in the top menu</li>
                      <li>Enter your order number and email address</li>
                      <li>Click "Track" to view your order status</li>
                    </ol>
                  </div>

                  {/* Method 2 */}
                  <div className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
                    <div className="w-12 h-12 bg-[#4A4A4A] rounded-lg flex items-center justify-center mb-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3">Email Notifications</h3>
                    <ol className="list-decimal list-inside space-y-2 text-[#4A4A4A]">
                      <li>Check your email for order confirmation</li>
                      <li>Look for shipping notification with tracking number</li>
                      <li>Click the tracking link in the email</li>
                      <li>Monitor updates sent to your inbox</li>
                    </ol>
                  </div>
                </div>

                {/* Tracking Number Format */}
                <div className="bg-[#F6E2E0] rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-[#000000] mb-3">Tracking Number Format</h3>
                  <p className="text-[#4A4A4A] mb-4">
                    Your eXobe tracking number will look like this:
                  </p>
                  <div className="bg-white rounded-lg p-4 border-2 border-dashed border-[#C8102E]">
                    <code className="text-[#C8102E] font-mono text-lg">EX123456789ZA</code>
                  </div>
                  <p className="text-sm text-[#4A4A4A] mt-3">
                    Tracking numbers are typically 12 characters long and start with "EX"
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {[
                    {
                      question: "When will I receive my tracking number?",
                      answer: "You'll receive your tracking number within 24-48 hours after your order has been dispatched. This will be sent to the email address you provided during checkout."
                    },
                    {
                      question: "My tracking shows no updates. What should I do?",
                      answer: "Tracking information can take 24-48 hours to update after dispatch. If there are still no updates after this time, please contact our support team."
                    },
                    {
                      question: "Can I change my delivery address after the order has shipped?",
                      answer: "Once your order has been dispatched, we cannot change the delivery address. Please contact our support team immediately if you need to make changes."
                    },
                    {
                      question: "What if my package shows as delivered but I haven't received it?",
                      answer: "First, check with neighbors, building management, or family members. If you still can't locate your package, contact us within 48 hours of the delivery date."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="p-6 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-[#000000] mb-3">{faq.question}</h3>
                      <p className="text-[#4A4A4A] leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#000000] mb-4">Still need help?</h2>
                <p className="text-[#4A4A4A] mb-6">
                  If you're having trouble tracking your order or have any questions, our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Live Chat
                  </button>
                  <button className="border-2 border-[#C8102E] text-[#C8102E] px-6 py-3 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-colors">
                    Call +27 11 123 4567
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
