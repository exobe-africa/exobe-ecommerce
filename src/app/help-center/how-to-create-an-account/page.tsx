import Link from 'next/link';
import { ArrowLeft, User, Mail, Lock, Smartphone, Shield, CheckCircle, MessageCircle, Eye, EyeOff } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Breadcrumb } from '../../../components';

export default function CreateAccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Help Centre', href: '/help-center' },
              { label: 'How to create an account', isCurrentPage: true }
            ]}
            className="mb-6"
          />

          {/* Back Button */}
          <Link href="/help-center" className="inline-flex items-center text-[#C8102E] hover:text-[#A00E26] transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Centre
          </Link>

          {/* Title */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-[#F6E2E0] rounded-xl flex items-center justify-center">
              <User className="h-8 w-8 text-[#C8102E]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-2">How to Create an Account</h1>
              <p className="text-lg text-[#4A4A4A]">Account & Profile</p>
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
                  Creating an eXobe account is quick, easy, and gives you access to faster checkout, order tracking, 
                  wishlists, and exclusive member benefits.
                </p>
              </div>

              {/* Account Benefits */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Benefits of Having an Account</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Faster Checkout',
                      description: 'Save your details for quick and easy purchases',
                      icon: CheckCircle,
                      color: 'text-green-500'
                    },
                    {
                      title: 'Order Tracking',
                      description: 'Track all your orders and view order history',
                      icon: Eye,
                      color: 'text-blue-500'
                    },
                    {
                      title: 'Wishlist & Favourites',
                      description: 'Save items you love for later purchase',
                      icon: User,
                      color: 'text-purple-500'
                    },
                    {
                      title: 'Exclusive Offers',
                      description: 'Get access to member-only deals and early sales',
                      icon: Shield,
                      color: 'text-orange-500'
                    }
                  ].map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                      <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
                        <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 ${benefit.color}`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-[#000000] mb-2">{benefit.title}</h3>
                        <p className="text-[#4A4A4A] text-sm">{benefit.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step by Step Guide */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Step-by-Step Account Creation</h2>
                
                <div className="space-y-8">
                  {/* Step 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#000000] mb-3">Go to the Sign Up Page</h3>
                      <p className="text-[#4A4A4A] mb-4">
                        Click "Sign Up" or "Create Account" on any page of the eXobe website. You'll find this in the top right corner of the navigation bar.
                      </p>
                      <div className="bg-[#F6E2E0] rounded-lg p-4">
                        <p className="text-[#4A4A4A] text-sm">
                          <strong>Tip:</strong> You can also create an account during checkout for even more convenience.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#000000] mb-3">Fill in Your Details</h3>
                      <p className="text-[#4A4A4A] mb-4">
                        Complete the registration form with your personal information:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Mail className="h-5 w-5 text-[#C8102E]" />
                            <span className="font-medium">Email Address</span>
                          </div>
                          <p className="text-sm text-[#4A4A4A]">This will be your login username</p>
                        </div>
                        
                        <div className="p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <User className="h-5 w-5 text-[#C8102E]" />
                            <span className="font-medium">Full Name</span>
                          </div>
                          <p className="text-sm text-[#4A4A4A]">First name and surname</p>
                        </div>
                        
                        <div className="p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Smartphone className="h-5 w-5 text-[#C8102E]" />
                            <span className="font-medium">Mobile Number</span>
                          </div>
                          <p className="text-sm text-[#4A4A4A]">For delivery notifications</p>
                        </div>
                        
                        <div className="p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Lock className="h-5 w-5 text-[#C8102E]" />
                            <span className="font-medium">Password</span>
                          </div>
                          <p className="text-sm text-[#4A4A4A]">Minimum 8 characters</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#000000] mb-3">Create a Strong Password</h3>
                      <p className="text-[#4A4A4A] mb-4">
                        Your password should be secure and unique. Follow these guidelines:
                      </p>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Password Requirements:</h4>
                        <ul className="space-y-1 text-blue-700 text-sm">
                          <li>• At least 8 characters long</li>
                          <li>• Include uppercase and lowercase letters</li>
                          <li>• Include at least one number</li>
                          <li>• Include a special character (!, @, #, etc.)</li>
                          <li>• Don't use personal information</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#000000] mb-3">Verify Your Email</h3>
                      <p className="text-[#4A4A4A] mb-4">
                        After submitting the form, check your email inbox for a verification message from eXobe.
                      </p>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-700 text-sm">
                          <strong>Important:</strong> Check your spam folder if you don't see the email within 5 minutes. 
                          You'll need to verify your email before you can place orders.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#000000] mb-3">Complete Your Profile</h3>
                      <p className="text-[#4A4A4A] mb-4">
                        Once verified, log in and complete your profile for the best shopping experience:
                      </p>
                      
                      <ul className="space-y-2 text-[#4A4A4A]">
                        <li>• Add your delivery address</li>
                        <li>• Set your communication preferences</li>
                        <li>• Add payment methods for faster checkout</li>
                        <li>• Subscribe to newsletters for exclusive offers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Security */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Account Security</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="h-6 w-6 text-green-500" />
                    <h3 className="text-xl font-semibold text-green-800">Your Account is Protected</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                    <div>
                      <h4 className="font-semibold mb-2">Security Features:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• SSL encrypted data transmission</li>
                        <li>• Secure password storage</li>
                        <li>• Login attempt monitoring</li>
                        <li>• Account activity alerts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Privacy Protection:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• POPIA compliant data handling</li>
                        <li>• No sharing with third parties</li>
                        <li>• Control your communication preferences</li>
                        <li>• Right to data deletion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Troubleshooting */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Common Issues</h2>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-[#000000] mb-2">Email Already Exists</h3>
                    <p className="text-[#4A4A4A] text-sm">
                      If you get this error, you may already have an account. Try using the "Forgot Password" feature to reset your password.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-[#000000] mb-2">Verification Email Not Received</h3>
                    <p className="text-[#4A4A4A] text-sm">
                      Check your spam folder first. If still not found, contact support to resend the verification email.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-[#000000] mb-2">Password Too Weak</h3>
                    <p className="text-[#4A4A4A] text-sm">
                      Make sure your password meets all requirements listed above. Use a mix of letters, numbers, and symbols.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#000000] mb-4">Need Help Creating Your Account?</h2>
                <p className="text-[#4A4A4A] mb-6">
                  Our support team is ready to help you get started with your eXobe account.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Get Account Help
                  </button>
                  <button className="border-2 border-[#C8102E] text-[#C8102E] px-6 py-3 rounded-full font-semibold hover:bg-[#C8102E] hover:text-white transition-colors">
                    Create Account Now
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
