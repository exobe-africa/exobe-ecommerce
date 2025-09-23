import Link from 'next/link';
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Clock,
  Star,
  DollarSign,
  CheckCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Award,
  Zap,
  Target,
  MessageCircle,
  BarChart3,
  Globe,
  Briefcase,
  Wrench,
  Camera,
  Home,
  Car,
  Heart,
  GraduationCap,
  Scissors,
  Truck,
  Baby,
  PaintBucket,
  Laptop,
  Music,
  Dumbbell,
  ChefHat,
  Headphones
} from 'lucide-react';
import { Navbar, Footer } from '../../components';

export default function ServiceProvidersPage() {
  const benefits = [
    {
      icon: Users,
      title: "Reach More Customers",
      description: "Connect with thousands of customers actively looking for professional services in your area."
    },
    {
      icon: DollarSign,
      title: "Increase Your Income",
      description: "Set your own rates and earn more by expanding your customer base beyond traditional methods."
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Work on your own terms. Accept jobs that fit your schedule and availability."
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Get paid safely and on time through our secure payment system with buyer protection."
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Showcase your work with reviews and ratings to attract more high-quality customers."
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Track your performance, earnings, and customer feedback with detailed insights."
    }
  ];

  const serviceCategories = [
    { icon: Wrench, name: "Home Maintenance", description: "Plumbing, electrical, carpentry, and repairs" },
    { icon: PaintBucket, name: "Home Improvement", description: "Painting, renovations, and interior design" },
    { icon: Scissors, name: "Beauty & Wellness", description: "Hair, nails, massage, and personal care" },
    { icon: Camera, name: "Photography", description: "Events, portraits, and commercial photography" },
    { icon: Laptop, name: "Tech Support", description: "Computer repair, setup, and IT services" },
    { icon: Car, name: "Automotive", description: "Car wash, repairs, and maintenance services" },
    { icon: ChefHat, name: "Food & Catering", description: "Personal chef, catering, and meal prep" },
    { icon: GraduationCap, name: "Education & Tutoring", description: "Academic support and skill training" },
    { icon: Dumbbell, name: "Fitness & Health", description: "Personal training and wellness coaching" },
    { icon: Baby, name: "Childcare", description: "Babysitting, nanny services, and childcare" },
    { icon: Truck, name: "Moving & Delivery", description: "Moving services, delivery, and logistics" },
    { icon: Music, name: "Entertainment", description: "DJ services, music lessons, and events" }
  ];

  const stats = [
    { number: "50K+", label: "Active Customers" },
    { number: "15K+", label: "Service Providers" },
    { number: "200K+", label: "Jobs Completed" },
    { number: "4.8★", label: "Average Rating" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      service: "Interior Designer",
      location: "Cape Town",
      rating: 5,
      comment: "eXobe has transformed my business! I've connected with so many new clients and my income has doubled in just 6 months.",
      avatar: "👩‍🎨"
    },
    {
      name: "Mike Patel",
      service: "Electrician",
      location: "Johannesburg",
      rating: 5,
      comment: "The platform is easy to use and payments are always secure. I love how I can manage my schedule and choose my jobs.",
      avatar: "⚡"
    },
    {
      name: "Lisa Ndaba",
      service: "Personal Trainer",
      location: "Durban",
      rating: 5,
      comment: "Building my reputation through reviews has helped me attract premium clients. The analytics help me understand my business better.",
      avatar: "💪"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Sign up and create a detailed profile showcasing your skills, experience, and portfolio."
    },
    {
      step: 2,
      title: "Set Your Services & Rates",
      description: "List the services you offer, set your pricing, and define your availability."
    },
    {
      step: 3,
      title: "Receive Job Requests",
      description: "Get notified when customers in your area need your services."
    },
    {
      step: 4,
      title: "Complete Jobs & Get Paid",
      description: "Provide excellent service, receive reviews, and get paid securely through the platform."
    }
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
                Become a Service Provider
              </h1>
              <p className="text-xl sm:text-2xl text-red-100 mb-8">
                Turn your skills into income. Connect with customers who need your expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/service-providers/apply">
                  <button className="bg-white text-[#C8102E] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center text-lg">
                    <Briefcase className="h-6 w-6 mr-2" />
                    Start Earning Today
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
                  <Briefcase className="h-16 w-16 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Join Our Community</h3>
                  <p className="text-red-100">Thousands of service providers earning more</p>
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
              Why Choose eXobe for Your Services?
            </h2>
            <p className="text-xl text-[#4A4A4A] max-w-3xl mx-auto">
              Join thousands of successful service providers who are growing their businesses 
              and increasing their income on South Africa's most trusted platform.
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

      {/* Service Categories */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
              Service Categories
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Whatever your expertise, there's a place for you on eXobe
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-200">
                <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center mb-4">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#000000] mb-2">{category.name}</h3>
                <p className="text-[#4A4A4A] text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Start earning in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connecting Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 transform translate-x-1/2 z-0" />
                )}
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-[#C8102E] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-[#000000] mb-4">{step.title}</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Real stories from real service providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#000000]">{testimonial.name}</h4>
                    <p className="text-[#4A4A4A] text-sm">{testimonial.service}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 text-[#4A4A4A] mr-1" />
                      <span className="text-[#4A4A4A] text-xs">{testimonial.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-[#4A4A4A] italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Potential */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-6">
                Your Earning Potential
              </h2>
              <p className="text-xl text-[#4A4A4A] mb-8">
                Set your own rates and work as much or as little as you want. 
                Many service providers earn R5,000 - R15,000+ per month.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#000000] mb-1">Keep 85% of Your Earnings</h4>
                    <p className="text-[#4A4A4A]">Low platform fees mean more money in your pocket</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#000000] mb-1">Weekly Payouts</h4>
                    <p className="text-[#4A4A4A]">Get paid every week directly to your bank account</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#000000] mb-1">No Hidden Fees</h4>
                    <p className="text-[#4A4A4A]">Transparent pricing with no surprise charges</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <div className="text-center">
                <DollarSign className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-[#000000] mb-4">Average Monthly Earnings</h3>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Part-time (10-15 hrs/week)</span>
                      <span className="font-bold text-green-600">R3,000 - R6,000</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Full-time (30-40 hrs/week)</span>
                      <span className="font-bold text-green-600">R8,000 - R15,000</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Top Performers</span>
                      <span className="font-bold text-green-600">R20,000+</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-[#4A4A4A] mt-4">
                  * Earnings vary based on service type, location, and hours worked
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-4">
              Requirements to Get Started
            </h2>
            <p className="text-xl text-[#4A4A4A]">
              Simple requirements to join our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                Basic Requirements
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-[#4A4A4A]">18+ years old</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-[#4A4A4A]">Valid South African ID</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-[#4A4A4A]">Bank account for payments</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-[#4A4A4A]">Smartphone or computer access</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-[#000000] mb-6 flex items-center">
                <Star className="h-6 w-6 text-yellow-500 mr-3" />
                Recommended
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-[#4A4A4A]">Professional experience in your field</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-[#4A4A4A]">Portfolio or examples of your work</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-[#4A4A4A]">References from previous clients</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#C8102E] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-[#4A4A4A]">Professional certifications (if applicable)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-[#000000] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of service providers who are building successful businesses on eXobe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/service-providers/apply">
              <button className="bg-[#C8102E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center text-lg">
                <Briefcase className="h-6 w-6 mr-2" />
                Apply Now
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
