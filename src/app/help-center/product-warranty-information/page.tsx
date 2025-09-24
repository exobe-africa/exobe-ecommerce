import Link from 'next/link';
import { ArrowLeft, Shield, FileText, Wrench, MessageCircle, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Breadcrumb, PageHeader } from '../../../components';

export default function ProductWarrantyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Help Centre', href: '/help-center' },
              { label: 'Product warranty information', isCurrentPage: true }
            ]}
            className="mb-6"
          />

          <Link href="/help-center" className="inline-flex items-center text-[#C8102E] hover:text-[#A00E26] transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Centre
          </Link>

          <PageHeader
            title="Product Warranty Information"
            description="Products & Stock"
            iconComponent={Shield}
            variant="help-center"
            size="large"
          />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12">
              
              <div className="mb-10">
                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                  At eXobe, we stand behind the quality of our products. All items come with manufacturer warranties, 
                  and we provide additional protection to ensure your complete satisfaction.
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-8">Types of Warranty Coverage</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
                    <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3">Manufacturer Warranty</h3>
                    <p className="text-[#4A4A4A] mb-4">
                      All products come with the original manufacturer's warranty covering defects and malfunctions.
                    </p>
                    <ul className="space-y-2 text-[#4A4A4A] text-sm">
                      <li>• Covers manufacturing defects</li>
                      <li>• Varies by product category</li>
                      <li>• Handled directly by manufacturer</li>
                      <li>• Proof of purchase required</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl border border-green-200 bg-green-50 hover:border-green-400 transition-colors">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-3">eXobe Quality Guarantee</h3>
                    <p className="text-green-700 mb-4">
                      Our additional guarantee ensures you're completely satisfied with your purchase.
                    </p>
                    <ul className="space-y-2 text-green-700 text-sm">
                      <li>• 30-day satisfaction guarantee</li>
                      <li>• Free repair or replacement</li>
                      <li>• Covers shipping damage</li>
                      <li>• No-hassle claims process</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Warranty Periods by Product Category</h2>
                
                <div className="space-y-4">
                  {[
                    {
                      category: 'Electronics & Appliances',
                      period: '12-24 months',
                      details: 'Smartphones, laptops, TVs, home appliances',
                      color: 'border-blue-200 bg-blue-50 text-blue-700'
                    },
                    {
                      category: 'Fashion & Accessories',
                      period: '6 months',
                      details: 'Clothing, shoes, bags, jewelry',
                      color: 'border-purple-200 bg-purple-50 text-purple-700'
                    },
                    {
                      category: 'Home & Garden',
                      period: '12 months',
                      details: 'Furniture, tools, garden equipment',
                      color: 'border-green-200 bg-green-50 text-green-700'
                    },
                    {
                      category: 'Sports & Fitness',
                      period: '6-12 months',
                      details: 'Exercise equipment, outdoor gear, sports accessories',
                      color: 'border-orange-200 bg-orange-50 text-orange-700'
                    },
                    {
                      category: 'Beauty & Health',
                      period: '3-6 months',
                      details: 'Cosmetics, skincare, health devices',
                      color: 'border-pink-200 bg-pink-50 text-pink-700'
                    },
                    {
                      category: 'Books & Media',
                      period: 'No warranty',
                      details: 'Physical and digital content',
                      color: 'border-gray-200 bg-gray-50 text-gray-700'
                    }
                  ].map((item, index) => (
                    <div key={index} className={`p-6 rounded-lg border ${item.color}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{item.category}</h3>
                        <span className="font-bold">{item.period}</span>
                      </div>
                      <p className="text-sm">{item.details}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold text-yellow-800">Important Note</span>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    Warranty periods may vary by brand and specific product. Check individual product pages for exact warranty terms.
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">What's Covered Under Warranty</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl border border-green-200 bg-green-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <h3 className="text-xl font-semibold text-green-800">Covered</h3>
                    </div>
                    <ul className="space-y-2 text-green-700">
                      <li>• Manufacturing defects</li>
                      <li>• Material failures</li>
                      <li>• Electrical malfunctions</li>
                      <li>• Component failures under normal use</li>
                      <li>• Software issues (electronics)</li>
                      <li>• Structural problems</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-xl border border-red-200 bg-red-50">
                    <div className="flex items-center space-x-3 mb-4">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                      <h3 className="text-xl font-semibold text-red-800">Not Covered</h3>
                    </div>
                    <ul className="space-y-2 text-red-700">
                      <li>• Physical damage from drops or impacts</li>
                      <li>• Water damage (unless waterproof)</li>
                      <li>• Normal wear and tear</li>
                      <li>• Misuse or abuse</li>
                      <li>• Unauthorised repairs</li>
                      <li>• Cosmetic damage that doesn't affect function</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">How to Make a Warranty Claim</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: 'Gather Required Information',
                      description: 'Collect your order number, proof of purchase, and product details.',
                      icon: FileText
                    },
                    {
                      step: 2,
                      title: 'Contact eXobe Support',
                      description: 'Reach out via live chat, email, or phone to initiate your warranty claim.',
                      icon: MessageCircle
                    },
                    {
                      step: 3,
                      title: 'Assessment & Diagnosis',
                      description: 'Our team will assess the issue and determine the best solution.',
                      icon: Wrench
                    },
                    {
                      step: 4,
                      title: 'Resolution',
                      description: 'Receive repair, replacement, or refund based on warranty terms.',
                      icon: CheckCircle
                    }
                  ].map((step) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={step.step} className="flex items-start space-x-4 p-6 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#000000] mb-2">{step.title}</h3>
                          <p className="text-[#4A4A4A]">{step.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-[#4A4A4A]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Required Documentation</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <h3 className="text-xl font-semibold text-blue-800">What You'll Need</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                    <div>
                      <h4 className="font-semibold mb-2">Essential Documents:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Original proof of purchase</li>
                        <li>• eXobe order confirmation</li>
                        <li>• Product serial number (if applicable)</li>
                        <li>• Photos of the defect/damage</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Additional Information:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Detailed description of the problem</li>
                        <li>• Date when issue first occurred</li>
                        <li>• Steps taken to resolve the issue</li>
                        <li>• Any error messages or codes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Warranty Claim Processing Times</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl border border-gray-200 text-center">
                    <Clock className="h-8 w-8 text-[#C8102E] mx-auto mb-3" />
                    <h3 className="font-semibold text-[#000000] mb-2">Initial Response</h3>
                    <p className="text-2xl font-bold text-[#C8102E] mb-1">24 hours</p>
                    <p className="text-[#4A4A4A] text-sm">Acknowledgment and case number</p>
                  </div>
                  
                  <div className="p-6 rounded-xl border border-gray-200 text-center">
                    <Wrench className="h-8 w-8 text-[#C8102E] mx-auto mb-3" />
                    <h3 className="font-semibold text-[#000000] mb-2">Assessment</h3>
                    <p className="text-2xl font-bold text-[#C8102E] mb-1">2-5 days</p>
                    <p className="text-[#4A4A4A] text-sm">Technical evaluation and decision</p>
                  </div>
                  
                  <div className="p-6 rounded-xl border border-gray-200 text-center">
                    <CheckCircle className="h-8 w-8 text-[#C8102E] mx-auto mb-3" />
                    <h3 className="font-semibold text-[#000000] mb-2">Resolution</h3>
                    <p className="text-2xl font-bold text-[#C8102E] mb-1">5-10 days</p>
                    <p className="text-[#4A4A4A] text-sm">Repair, replacement, or refund</p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Extended Warranty Options</h2>
                
                <div className="p-6 rounded-xl border border-purple-200 bg-purple-50">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="h-6 w-6 text-purple-500" />
                    <h3 className="text-xl font-semibold text-purple-800">eXobe Care Plus</h3>
                  </div>
                  
                  <p className="text-purple-700 mb-4">
                    Extend your warranty coverage for additional peace of mind and protection.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
                    <div>
                      <h4 className="font-semibold mb-2">Benefits Include:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Extended coverage up to 3 years</li>
                        <li>• Accidental damage protection</li>
                        <li>• Priority repair service</li>
                        <li>• Free annual maintenance</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Available For:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Electronics over R2,000</li>
                        <li>• Home appliances</li>
                        <li>• Fitness equipment</li>
                        <li>• Premium fashion items</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#000000] mb-4">Warranty Support</h2>
                <p className="text-[#4A4A4A] mb-6">
                  Have questions about your warranty or need to make a claim? Our dedicated warranty team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start Warranty Claim
                  </button>
                  <button className="border-2 border-[#C8102E] text-[#C8102E] px-6 py-3 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-colors">
                    Check Warranty Status
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
