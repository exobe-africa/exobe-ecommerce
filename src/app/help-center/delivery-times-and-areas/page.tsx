import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, Truck, Package, MessageCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function DeliveryTimesPage() {
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
            <span className="text-[#000000] font-medium">Delivery times and areas</span>
          </div>

          {/* Back Button */}
          <Link href="/help-center" className="inline-flex items-center text-[#C8102E] hover:text-[#A00E26] transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Center
          </Link>

          {/* Title */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-[#F6E2E0] rounded-xl flex items-center justify-center">
              <Clock className="h-8 w-8 text-[#C8102E]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-2">Delivery Times & Areas</h1>
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
                  eXobe delivers nationwide across South Africa. We offer multiple delivery options to get your orders 
                  to you as quickly and conveniently as possible.
                </p>
              </div>

              {/* Delivery Options */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-8">Delivery Options</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Standard Delivery */}
                  <div className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
                    <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center mb-4">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3">Standard Delivery</h3>
                    <div className="space-y-2 text-[#4A4A4A] mb-4">
                      <p><strong>Timeframe:</strong> 3-5 business days</p>
                      <p><strong>Cost:</strong> R99 (Free on orders over R499)</p>
                      <p><strong>Tracking:</strong> Full tracking included</p>
                    </div>
                    <p className="text-[#4A4A4A] text-sm">
                      Perfect for regular orders when you're not in a rush. Reliable and cost-effective.
                    </p>
                  </div>

                  {/* Express Delivery */}
                  <div className="p-6 rounded-xl border border-blue-200 bg-blue-50 hover:border-blue-400 transition-colors">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <Truck className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">Express Delivery</h3>
                    <div className="space-y-2 text-blue-700 mb-4">
                      <p><strong>Timeframe:</strong> 1-2 business days</p>
                      <p><strong>Cost:</strong> R199</p>
                      <p><strong>Tracking:</strong> Real-time tracking</p>
                    </div>
                    <p className="text-blue-700 text-sm">
                      Fast delivery for urgent orders. Available in major cities and surrounding areas.
                    </p>
                  </div>

                  {/* Same Day Delivery */}
                  <div className="p-6 rounded-xl border border-green-200 bg-green-50 hover:border-green-400 transition-colors">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Same Day Delivery</h3>
                    <div className="space-y-2 text-green-700 mb-4">
                      <p><strong>Timeframe:</strong> Within 4-6 hours</p>
                      <p><strong>Cost:</strong> R299</p>
                      <p><strong>Cutoff:</strong> Order by 12:00 PM</p>
                    </div>
                    <p className="text-green-700 text-sm">
                      Ultra-fast delivery available in Johannesburg, Cape Town, and Durban CBD areas.
                    </p>
                  </div>

                  {/* Collection Points */}
                  <div className="p-6 rounded-xl border border-purple-200 bg-purple-50 hover:border-purple-400 transition-colors">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-purple-800 mb-3">Collection Points</h3>
                    <div className="space-y-2 text-purple-700 mb-4">
                      <p><strong>Timeframe:</strong> 2-3 business days</p>
                      <p><strong>Cost:</strong> R49</p>
                      <p><strong>Locations:</strong> 500+ pickup points</p>
                    </div>
                    <p className="text-purple-700 text-sm">
                      Convenient pickup from Pep, Ackermans, and other partner stores nationwide.
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Areas */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Delivery Coverage Areas</h2>
                
                <div className="space-y-6">
                  {/* Major Cities */}
                  <div className="p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <h3 className="text-xl font-semibold text-[#000000]">Major Cities & Suburbs</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#4A4A4A]">
                      <div>
                        <h4 className="font-semibold mb-2">Gauteng</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Johannesburg & surrounds</li>
                          <li>• Pretoria & surrounds</li>
                          <li>• East Rand</li>
                          <li>• West Rand</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Western Cape</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Cape Town & surrounds</li>
                          <li>• Stellenbosch</li>
                          <li>• Paarl</li>
                          <li>• Somerset West</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">KwaZulu-Natal</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Durban & surrounds</li>
                          <li>• Pietermaritzburg</li>
                          <li>• Ballito</li>
                          <li>• Pinetown</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 mt-4">
                      <strong>All delivery options available • Same day delivery in CBD areas</strong>
                    </p>
                  </div>

                  {/* Secondary Cities */}
                  <div className="p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                      <h3 className="text-xl font-semibold text-[#000000]">Secondary Cities</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[#4A4A4A] text-sm">
                      <div>• Port Elizabeth</div>
                      <div>• Bloemfontein</div>
                      <div>• East London</div>
                      <div>• Kimberley</div>
                      <div>• Polokwane</div>
                      <div>• Nelspruit</div>
                      <div>• George</div>
                      <div>• Rustenburg</div>
                    </div>
                    <p className="text-sm text-blue-600 mt-4">
                      <strong>Standard & Express delivery available • Collection points available</strong>
                    </p>
                  </div>

                  {/* Rural Areas */}
                  <div className="p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                      <h3 className="text-xl font-semibold text-[#000000]">Rural & Remote Areas</h3>
                    </div>
                    <p className="text-[#4A4A4A] mb-3">
                      We deliver to most rural areas across South Africa, though delivery times may be extended.
                    </p>
                    <ul className="space-y-1 text-[#4A4A4A] text-sm">
                      <li>• Standard delivery: 5-7 business days</li>
                      <li>• Collection points recommended for faster delivery</li>
                      <li>• Additional delivery fee may apply for very remote areas</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Delivery Schedule */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Delivery Schedule</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-[#000000] mb-3">Standard Delivery Hours</h3>
                    <ul className="space-y-2 text-[#4A4A4A]">
                      <li><strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM</li>
                      <li><strong>Saturday:</strong> 8:00 AM - 1:00 PM</li>
                      <li><strong>Sunday:</strong> No deliveries</li>
                      <li><strong>Public Holidays:</strong> No deliveries</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl border border-gray-200">
                    <h3 className="font-semibold text-[#000000] mb-3">Express & Same Day</h3>
                    <ul className="space-y-2 text-[#4A4A4A]">
                      <li><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</li>
                      <li><strong>Saturday:</strong> 8:00 AM - 2:00 PM</li>
                      <li><strong>Same Day Cutoff:</strong> 12:00 PM</li>
                      <li><strong>Express Cutoff:</strong> 3:00 PM</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Important Delivery Information</h2>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <h3 className="font-semibold text-yellow-800">Delivery Attempts</h3>
                    </div>
                    <p className="text-yellow-700 text-sm">
                      We make up to 3 delivery attempts. If unsuccessful, your package will be held at the nearest collection point for 7 days.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold text-blue-800">Large Items</h3>
                    </div>
                    <p className="text-blue-700 text-sm">
                      Furniture and large appliances require special delivery arrangements. We'll contact you to schedule delivery within 5-10 business days.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-green-200 bg-green-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold text-green-800">Signature Required</h3>
                    </div>
                    <p className="text-green-700 text-sm">
                      All deliveries require a signature. Please ensure someone is available to receive your order during delivery hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#000000] mb-4">Delivery Questions?</h2>
                <p className="text-[#4A4A4A] mb-6">
                  Need help with delivery options or have questions about your area? Our team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Check Delivery Area
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
