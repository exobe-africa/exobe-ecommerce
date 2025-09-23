import Link from 'next/link';
import { ArrowLeft, RotateCcw, Calendar, CheckCircle, XCircle, AlertTriangle, Package, CreditCard, MessageCircle } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function ReturnPolicyPage() {
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
            <Link href="/help-center" className="hover:text-[#C8102E] transition-colors">Help Center</Link>
            <span>/</span>
            <span className="text-[#000000] font-medium">Return policy and conditions</span>
          </div>

          {/* Back Button */}
          <Link href="/help-center" className="inline-flex items-center text-[#C8102E] hover:text-[#A00E26] transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Center
          </Link>

          {/* Title */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-[#F6E2E0] rounded-xl flex items-center justify-center">
              <RotateCcw className="h-8 w-8 text-[#C8102E]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-2">Return Policy & Conditions</h1>
              <p className="text-lg text-[#4A4A4A]">Returns & Refunds</p>
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
                  At eXobe, we want you to be completely satisfied with your purchase. If you're not happy with an item, 
                  our return policy makes it easy to return or exchange products within the specified timeframe.
                </p>
              </div>

              {/* Return Timeframe */}
              <div className="mb-12">
                <div className="bg-[#F6E2E0] rounded-xl p-6 mb-8">
                  <div className="flex items-center space-x-3 mb-3">
                    <Calendar className="h-6 w-6 text-[#C8102E]" />
                    <h2 className="text-2xl font-bold text-[#000000]">30-Day Return Policy</h2>
                  </div>
                  <p className="text-[#4A4A4A] text-lg">
                    You have <strong>30 days</strong> from the date of delivery to return most items for a full refund or exchange.
                  </p>
                </div>
              </div>

              {/* Return Conditions */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Return Conditions</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Eligible Returns */}
                  <div className="p-6 rounded-xl border border-green-200 bg-green-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <h3 className="text-xl font-semibold text-green-800">Eligible for Return</h3>
                    </div>
                    <ul className="space-y-2 text-green-700">
                      <li>• Items in original condition with tags attached</li>
                      <li>• Unopened and unused products</li>
                      <li>• Items in original packaging</li>
                      <li>• Proof of purchase (receipt/order confirmation)</li>
                      <li>• Returned within 30 days of delivery</li>
                    </ul>
                  </div>

                  {/* Non-Eligible Returns */}
                  <div className="p-6 rounded-xl border border-red-200 bg-red-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <XCircle className="h-6 w-6 text-red-500" />
                      <h3 className="text-xl font-semibold text-red-800">Not Eligible for Return</h3>
                    </div>
                    <ul className="space-y-2 text-red-700">
                      <li>• Personal care and hygiene products</li>
                      <li>• Underwear and swimwear</li>
                      <li>• Customized or personalized items</li>
                      <li>• Digital downloads and gift cards</li>
                      <li>• Items damaged by misuse</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Return */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">How to Return an Item</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: 'Initiate Return Request',
                      description: 'Log into your eXobe account and go to "My Orders". Find the item you want to return and click "Return Item".',
                      icon: Package
                    },
                    {
                      step: 2,
                      title: 'Select Return Reason',
                      description: 'Choose the reason for your return from the dropdown menu and provide any additional details.',
                      icon: CheckCircle
                    },
                    {
                      step: 3,
                      title: 'Print Return Label',
                      description: 'Download and print the prepaid return shipping label that will be emailed to you.',
                      icon: Package
                    },
                    {
                      step: 4,
                      title: 'Package and Ship',
                      description: 'Securely package the item with all original accessories and attach the return label.',
                      icon: Package
                    }
                  ].map((step) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={step.step} className="flex items-start space-x-4 p-6 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#000000] mb-2">{step.title}</h3>
                          <p className="text-[#4A4A4A]">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Refund Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Refund Information</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <CreditCard className="h-6 w-6 text-blue-500" />
                    <h3 className="text-xl font-semibold text-blue-800">Refund Processing</h3>
                  </div>
                  <p className="text-blue-700 mb-4">
                    Once we receive and inspect your returned item, we'll process your refund within 5-7 business days.
                  </p>
                  <ul className="space-y-2 text-blue-700">
                    <li>• <strong>Credit/Debit Cards:</strong> 5-7 business days</li>
                    <li>• <strong>EFT/Bank Transfer:</strong> 2-3 business days</li>
                    <li>• <strong>eXobe Store Credit:</strong> Immediate</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    <h3 className="text-xl font-semibold text-yellow-800">Important Notes</h3>
                  </div>
                  <ul className="space-y-2 text-yellow-700">
                    <li>• Original shipping costs are non-refundable</li>
                    <li>• Return shipping is free for defective items</li>
                    <li>• Refunds are processed to the original payment method</li>
                    <li>• Store credit refunds never expire</li>
                  </ul>
                </div>
              </div>

              {/* Exchange Policy */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Exchange Policy</h2>
                
                <div className="p-6 rounded-xl border border-gray-200">
                  <p className="text-[#4A4A4A] mb-4">
                    We offer exchanges for different sizes, colors, or styles of the same product, subject to availability.
                  </p>
                  <ul className="space-y-2 text-[#4A4A4A]">
                    <li>• Same product category exchanges only</li>
                    <li>• Price differences will be charged or refunded</li>
                    <li>• Exchanges follow the same 30-day policy</li>
                    <li>• Free exchange shipping for defective items</li>
                  </ul>
                </div>
              </div>

              {/* Special Categories */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Special Return Policies</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-[#000000] mb-3">Electronics</h3>
                    <ul className="space-y-2 text-[#4A4A4A] text-sm">
                      <li>• Must include all original accessories</li>
                      <li>• Software/apps must be unregistered</li>
                      <li>• 15-day return period for opened items</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-[#000000] mb-3">Clothing & Footwear</h3>
                    <ul className="space-y-2 text-[#4A4A4A] text-sm">
                      <li>• Tags must be attached</li>
                      <li>• No signs of wear or washing</li>
                      <li>• Original packaging preferred</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-[#000000] mb-3">Home & Garden</h3>
                    <ul className="space-y-2 text-[#4A4A4A] text-sm">
                      <li>• Large items may require special pickup</li>
                      <li>• Assembly instructions must be included</li>
                      <li>• No damage from outdoor use</li>
                    </ul>
                  </div>
                  
                  <div className="p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-[#000000] mb-3">Books & Media</h3>
                    <ul className="space-y-2 text-[#4A4A4A] text-sm">
                      <li>• Books must be in sellable condition</li>
                      <li>• DVDs/CDs must be unscratched</li>
                      <li>• Digital content non-returnable</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#000000] mb-4">Need Help with Returns?</h2>
                <p className="text-[#4A4A4A] mb-6">
                  Our customer service team is here to help you with your return or exchange.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start Return Process
                  </button>
                  <button className="border-2 border-[#C8102E] text-[#C8102E] px-6 py-3 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-colors">
                    Contact Support
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
