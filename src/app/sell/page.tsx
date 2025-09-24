import Link from 'next/link';
import { 
  Store, 
  TrendingUp, 
  Shield, 
  Truck, 
  BarChart3,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Globe,
  FileText,
  Upload,
  User,
  Star,
  Headphones
} from 'lucide-react';
import { Navbar, Footer } from '../../components';

export default function SellOnExobePage() {

  const benefits = [
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Reach millions of South African customers and expand your market reach with our growing platform."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Get paid securely and on time with our trusted payment system and fraud protection."
    },
    {
      icon: Truck,
      title: "Logistics Support",
      description: "Access our nationwide delivery network and fulfillment services to reach customers everywhere."
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your performance with detailed analytics and insights to optimise your sales strategy."
    },
    {
      icon: MessageCircle,
      title: "Dedicated Support",
      description: "Get help from our dedicated seller support team whenever you need assistance."
    },
    {
      icon: Globe,
      title: "Easy Setup",
      description: "Quick and simple onboarding process to get your store up and running in no time."
    }
  ];

  const stats = [
    { number: "2M+", label: "Active Customers" },
    { number: "50K+", label: "Sellers" },
    { number: "R2B+", label: "Annual Sales" },
    { number: "99.8%", label: "Uptime" }
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#C8102E] to-[#A00E26] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Sell on eXobe
              </h1>
              <p className="text-xl sm:text-2xl text-red-100 mb-8">
                Join South Africa's fastest-growing marketplace and reach millions of customers
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sell/apply">
                  <button className="bg-white text-[#C8102E] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center text-lg">
                    <Store className="h-6 w-6 mr-2" />
                    Start Selling Today
                  </button>
                </Link>
                <Link href="#learn-more">
                  <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#C8102E] transition-colors flex items-center justify-center text-lg">
                    Learn More
                    <ArrowRight className="h-6 w-6 ml-2" />
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-center mb-6">
                  <Store className="h-16 w-16 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Ready to Start?</h3>
                  <p className="text-red-100">Join thousands of successful sellers</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-2xl font-bold">{stat.number}</div>
                      <div className="text-red-100 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="learn-more" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
              Why Sell on eXobe?
            </h2>
            <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
              Join a thriving marketplace that puts your success first with powerful tools, 
              dedicated support, and access to millions of customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[#C8102E] rounded-full flex items-center justify-center mb-6">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#000000] mb-4">{benefit.title}</h3>
                <p className="text-[#4A4A4A] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#C8102E] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-[#000000] mb-4">Apply to Sell</h3>
              <p className="text-[#4A4A4A] mb-6">
                Submit your application with business details. We'll review and approve within 2-3 business days.
              </p>
              <FileText className="h-12 w-12 text-[#C8102E] mx-auto" />
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#C8102E] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-[#000000] mb-4">Set Up Your Store</h3>
              <p className="text-[#4A4A4A] mb-6">
                Upload your products, set prices, and customise your store profile to attract customers.
              </p>
              <Upload className="h-12 w-12 text-[#C8102E] mx-auto" />
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#C8102E] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-[#000000] mb-4">Start Selling</h3>
              <p className="text-[#4A4A4A] mb-6">
                Your products go live immediately. Start receiving orders and grow your business with eXobe.
              </p>
              <TrendingUp className="h-12 w-12 text-[#C8102E] mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Hear from our successful sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#000000]">Sarah M.</h4>
                  <p className="text-[#4A4A4A] text-sm">Fashion Retailer</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#4A4A4A] italic">
                "eXobe helped me grow my fashion business from a small boutique to reaching customers nationwide. 
                The platform is easy to use and the support team is fantastic!"
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#000000]">David K.</h4>
                  <p className="text-[#4A4A4A] text-sm">Electronics Seller</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#4A4A4A] italic">
                "I've been selling electronics on eXobe for 2 years now. The analytics tools help me understand 
                my customers better and the secure payment system gives me peace of mind."
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#000000]">Lisa T.</h4>
                  <p className="text-[#4A4A4A] text-sm">Home & Garden</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#4A4A4A] italic">
                "Starting my home decor business was scary, but eXobe made it simple. I love how they handle 
                logistics so I can focus on what I do best - creating beautiful products."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Fees */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Simple, transparent fees with no hidden costs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-[#000000] mb-4">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#C8102E]">5%</span>
                <span className="text-[#4A4A4A] ml-2">commission per sale</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">Up to 100 products</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">Email support</span>
                </li>
              </ul>
              <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-3 rounded-lg font-semibold hover:bg-[#C8102E] hover:text-white transition-colors">
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-[#C8102E] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#C8102E] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#000000] mb-4">Professional</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#C8102E]">3%</span>
                <span className="text-[#4A4A4A] ml-2">commission per sale</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">Unlimited products</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">Marketing tools</span>
                </li>
              </ul>
              <button className="w-full bg-[#C8102E] text-white py-3 rounded-lg font-semibold hover:bg-[#A00E26] transition-colors">
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-[#000000] mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#C8102E]">2%</span>
                <span className="text-[#4A4A4A] ml-2">commission per sale</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">Everything in Professional</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-[#4A4A4A]">24/7 phone support</span>
                </li>
              </ul>
              <button className="w-full border-2 border-[#C8102E] text-[#C8102E] py-3 rounded-lg font-semibold hover:bg-[#C8102E] hover:text-white transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-[#000000] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of successful sellers on South Africa's fastest-growing marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sell/apply">
              <button className="bg-[#C8102E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center text-lg">
                <Store className="h-6 w-6 mr-2" />
                Apply to Sell Now
              </button>
            </Link>
            <Link href="/help-center">
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#000000] transition-colors flex items-center justify-center text-lg">
                <Headphones className="h-6 w-6 mr-2" />
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
