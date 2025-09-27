"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Store, 
  Warehouse, 
  Users, 
  Building2,
  TrendingUp,
  Package,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const SellerTypesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
            Choose Your Selling Path
          </h2>
          <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
            Whether you're selling directly to consumers or supplying retailers, 
            eXobe has the right platform for your business model.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Retailer Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Store className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Retailer</h3>
                  <p className="text-blue-100">Sell directly to consumers</p>
                </div>
              </div>
              <p className="text-blue-100 text-lg leading-relaxed">
                Perfect for brands, manufacturers, and businesses looking to reach end customers 
                through our consumer marketplace.
              </p>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#000000] mb-4">What You Get:</h4>
                <ul className="space-y-3">
                  {[
                    'Access to 2M+ South African consumers',
                    'Product listings on our consumer marketplace',
                    'Integrated payment processing & order management',
                    'Marketing tools & promotional opportunities',
                    'Customer service & returns support',
                    'Performance analytics & sales insights'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4A4A4A]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#000000] mb-4">Perfect For:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Individual sellers',
                    'Small businesses',
                    'Brand owners',
                    'Manufacturers',
                    'Resellers',
                    'Online stores'
                  ].map((type, index) => (
                    <div key={index} className="flex items-center">
                      <Users className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm text-[#4A4A4A]">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">Revenue Potential</span>
                </div>
                <p className="text-sm text-blue-700">
                  Average retailers earn R20k - R500k+ monthly through direct consumer sales, 
                  with top performers reaching R2.5M+ per month.
                </p>
              </div>

              <Link href="/sell/apply">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Apply as Retailer
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </Link>
            </div>
          </div>

          {/* Wholesaler Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Warehouse className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Wholesaler</h3>
                  <p className="text-green-100">Supply products to retailers</p>
                </div>
              </div>
              <p className="text-green-100 text-lg leading-relaxed">
                Ideal for manufacturers, distributors, and suppliers looking to serve 
                retailers through our B2B marketplace.
              </p>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#000000] mb-4">What You Get:</h4>
                <ul className="space-y-3">
                  {[
                    'Access to verified retailers across our network',
                    'B2B marketplace with bulk order management',
                    'Volume pricing tools & quantity discounts',
                    'B2B payment terms & credit facilities',
                    'Inventory management & demand forecasting',
                    'Dedicated account management support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-[#4A4A4A]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[#000000] mb-4">Perfect For:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Manufacturers',
                    'Distributors',
                    'Importers',
                    'Suppliers',
                    'Wholesalers',
                    'Exporters'
                  ].map((type, index) => (
                    <div key={index} className="flex items-center">
                      <Building2 className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-[#4A4A4A]">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <Package className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Revenue Potential</span>
                </div>
                <p className="text-sm text-green-700">
                  Average wholesalers earn R200k - R5M+ monthly through bulk sales, 
                  with established suppliers reaching R10M+ per month.
                </p>
              </div>

              <Link href="/sell/apply">
                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                  Apply as Wholesaler
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-[#000000] text-center">
              Quick Comparison
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#000000]">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Retailer</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">Wholesaler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  {
                    feature: 'Target Customers',
                    retailer: 'End consumers',
                    wholesaler: 'Retailers & businesses'
                  },
                  {
                    feature: 'Order Sizes',
                    retailer: 'Individual units',
                    wholesaler: 'Bulk quantities'
                  },
                  {
                    feature: 'Pricing Model',
                    retailer: 'Retail pricing',
                    wholesaler: 'Volume discounts'
                  },
                  {
                    feature: 'Payment Terms',
                    retailer: 'Immediate payment',
                    wholesaler: 'Credit terms available'
                  },
                  {
                    feature: 'Marketing Support',
                    retailer: 'Consumer marketing',
                    wholesaler: 'B2B relationship building'
                  },
                  {
                    feature: 'Minimum Orders',
                    retailer: 'No minimum',
                    wholesaler: 'MOQ requirements'
                  }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-[#000000]">{row.feature}</td>
                    <td className="px-6 py-4 text-sm text-[#4A4A4A] text-center">{row.retailer}</td>
                    <td className="px-6 py-4 text-sm text-[#4A4A4A] text-center">{row.wholesaler}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-[#C8102E] to-[#A00E26] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Not Sure Which Path to Choose?</h3>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              Our application process will help you determine the best selling approach for your business. 
              You can always adjust your strategy as you grow.
            </p>
            <Link href="/sell/apply">
              <button className="bg-white text-[#C8102E] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                Start Your Application
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerTypesSection;
