import Link from 'next/link';
import { ArrowLeft, CreditCard, Smartphone, Building2, Shield, Lock, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Breadcrumb, PageHeader } from '../../../components';

export default function PaymentMethodsPage() {
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
              { label: 'Accepted payment methods', isCurrentPage: true }
            ]}
            className="mb-6"
          />

          {/* Back Button */}
          <Link href="/help-center" className="inline-flex items-center text-[#C8102E] hover:text-[#A00E26] transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Centre
          </Link>

          {/* Title */}
          <PageHeader
            title="Accepted Payment Methods"
            description="Payments & Billing"
            iconComponent={CreditCard}
            variant="help-center"
            size="large"
          />
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
                  eXobe accepts a variety of secure payment methods to make your shopping experience convenient and safe. 
                  All transactions are protected with industry-standard encryption.
                </p>
              </div>

              {/* Payment Methods */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-8">Available Payment Methods</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Credit & Debit Cards */}
                  <div className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
                    <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center mb-4">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3">Credit & Debit Cards</h3>
                    <p className="text-[#4A4A4A] mb-4">
                      We accept all major credit and debit cards issued by South African banks.
                    </p>
                    <ul className="space-y-2 text-[#4A4A4A]">
                      <li>• Visa</li>
                      <li>• Mastercard</li>
                      <li>• American Express</li>
                      <li>• Diners Club</li>
                    </ul>
                  </div>

                  {/* EFT/Bank Transfer */}
                  <div className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
                    <div className="w-12 h-12 bg-[#4A4A4A] rounded-lg flex items-center justify-center mb-4">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3">EFT / Bank Transfer</h3>
                    <p className="text-[#4A4A4A] mb-4">
                      Direct bank transfers from your South African bank account.
                    </p>
                    <ul className="space-y-2 text-[#4A4A4A]">
                      <li>• Instant EFT</li>
                      <li>• Manual EFT</li>
                      <li>• All major SA banks</li>
                      <li>• Secure bank-grade encryption</li>
                    </ul>
                  </div>

                  {/* Mobile Payments */}
                  <div className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3">Mobile Payments</h3>
                    <p className="text-[#4A4A4A] mb-4">
                      Quick and convenient mobile payment solutions.
                    </p>
                    <ul className="space-y-2 text-[#4A4A4A]">
                      <li>• SnapScan</li>
                      <li>• Zapper</li>
                      <li>• Samsung Pay</li>
                      <li>• Google Pay</li>
                    </ul>
                  </div>

                  {/* Buy Now Pay Later */}
                  <div className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-colors">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#000000] mb-3">Buy Now, Pay Later</h3>
                    <p className="text-[#4A4A4A] mb-4">
                      Flexible payment options to spread your purchases.
                    </p>
                    <ul className="space-y-2 text-[#4A4A4A]">
                      <li>• PayJustNow (3 payments)</li>
                      <li>• Mobicred</li>
                      <li>• RCS Store Card</li>
                      <li>• Subject to approval</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Security */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Payment Security</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="h-6 w-6 text-green-500" />
                    <h3 className="text-xl font-semibold text-green-800">Your Payments Are Secure</h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    We use industry-leading security measures to protect your payment information.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-700">SSL Encryption</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-700">PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-700">3D Secure Authentication</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-700">Fraud Protection</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Lock className="h-6 w-6 text-[#4A4A4A]" />
                    <h3 className="text-xl font-semibold text-[#000000]">We Never Store Your Card Details</h3>
                  </div>
                  <p className="text-[#4A4A4A]">
                    Your payment information is processed securely through our certified payment partners. 
                    eXobe never stores your full credit card details on our servers.
                  </p>
                </div>
              </div>

              {/* Payment Process */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">How Payment Processing Works</h2>
                
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: 'Select Payment Method',
                      description: 'Choose your preferred payment method during checkout.',
                      icon: CreditCard
                    },
                    {
                      step: 2,
                      title: 'Enter Payment Details',
                      description: 'Securely enter your payment information on our encrypted checkout page.',
                      icon: Lock
                    },
                    {
                      step: 3,
                      title: 'Verify Transaction',
                      description: 'Complete any required authentication (like OTP or 3D Secure).',
                      icon: Shield
                    },
                    {
                      step: 4,
                      title: 'Confirmation',
                      description: 'Receive instant confirmation of your successful payment.',
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

              {/* Payment Issues */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Common Payment Issues</h2>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-lg border border-yellow-200 bg-yellow-50">
                    <div className="flex items-center space-x-3 mb-3">
                      <AlertCircle className="h-6 w-6 text-yellow-500" />
                      <h3 className="font-semibold text-yellow-800">Payment Declined</h3>
                    </div>
                    <p className="text-yellow-700 mb-3">If your payment is declined, try these solutions:</p>
                    <ul className="space-y-1 text-yellow-700">
                      <li>• Check your card details are correct</li>
                      <li>• Ensure you have sufficient funds</li>
                      <li>• Contact your bank to authorise online purchases</li>
                      <li>• Try a different payment method</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="flex items-center space-x-3 mb-3">
                      <AlertCircle className="h-6 w-6 text-blue-500" />
                      <h3 className="font-semibold text-blue-800">Payment Pending</h3>
                    </div>
                    <p className="text-blue-700 mb-3">If your payment shows as pending:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• EFT payments can take 24-48 hours to clear</li>
                      <li>• Check your bank account for deductions</li>
                      <li>• Contact us if payment doesn't clear within 3 business days</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-lg border border-red-200 bg-red-50">
                    <div className="flex items-center space-x-3 mb-3">
                      <AlertCircle className="h-6 w-6 text-red-500" />
                      <h3 className="font-semibold text-red-800">Unauthorised Transactions</h3>
                    </div>
                    <p className="text-red-700 mb-3">If you notice unauthorised charges:</p>
                    <ul className="space-y-1 text-red-700">
                      <li>• Contact us immediately at +27 11 123 4567</li>
                      <li>• Notify your bank or card issuer</li>
                      <li>• We'll investigate and resolve the issue quickly</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Currency & Pricing */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#000000] mb-6">Currency & Pricing</h2>
                
                <div className="p-6 rounded-xl border border-gray-200">
                  <p className="text-[#4A4A4A] mb-4">
                    <strong>All prices on eXobe are displayed in South African Rands (ZAR).</strong>
                  </p>
                  <ul className="space-y-2 text-[#4A4A4A]">
                    <li>• Prices include VAT where applicable</li>
                    <li>• International cards are accepted but may incur foreign exchange fees from your bank</li>
                    <li>• Exchange rates are determined by your card issuer</li>
                    <li>• Delivery fees are calculated at checkout</li>
                  </ul>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#000000] mb-4">Payment Support</h2>
                <p className="text-[#4A4A4A] mb-6">
                  Having trouble with payments? Our support team is available to help you complete your purchase.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Live Chat Support
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
