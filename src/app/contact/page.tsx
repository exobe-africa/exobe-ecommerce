"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  User, 
  Building2, 
  Globe, 
  Headphones,
  Shield,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Breadcrumb } from '../../components';

const contactMethods = [
  {
    title: 'Live Chat',
    subtitle: 'Get instant help',
    description: 'Chat with our friendly support team for immediate assistance',
    availability: 'Available 24/7',
    icon: MessageCircle,
    color: 'bg-green-500',
    action: 'Start Chat',
    highlight: true
  },
  {
    title: 'Phone Support',
    subtitle: 'Speak to an expert',
    description: 'Call us for personalised help and detailed product information',
    availability: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM',
    icon: Phone,
    color: 'bg-blue-500',
    action: '+27 11 123 4567',
    highlight: false
  },
  {
    title: 'Email Support',
    subtitle: 'Detailed assistance',
    description: 'Send us a message and get comprehensive help via email',
    availability: 'Response within 24 hours',
    icon: Mail,
    color: 'bg-purple-500',
    action: 'support@exobe.africa',
    highlight: false
  },
  {
    title: 'WhatsApp',
    subtitle: 'Quick messaging',
    description: 'Message us on WhatsApp for quick questions and updates',
    availability: 'Mon-Fri: 8AM-6PM',
    icon: MessageCircle,
    color: 'bg-green-600',
    action: '+27 82 123 4567',
    highlight: false
  }
];

const officeLocations = [
  {
    city: 'Johannesburg',
    address: '123 Sandton Drive, Sandton City',
    postal: 'Sandton, 2196, South Africa',
    phone: '+27 11 123 4567',
    email: 'jhb@exobe.africa',
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
    isHeadquarters: true
  },
  {
    city: 'Cape Town',
    address: '456 Victoria & Alfred Waterfront',
    postal: 'Cape Town, 8001, South Africa',
    phone: '+27 21 987 6543',
    email: 'cpt@exobe.africa',
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
    isHeadquarters: false
  },
  {
    city: 'Durban',
    address: '789 Gateway Theatre of Shopping',
    postal: 'Umhlanga, 4319, South Africa',
    phone: '+27 31 555 7890',
    email: 'dbn@exobe.africa',
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
    isHeadquarters: false
  }
];

const departments = [
  { name: 'Sales & Product Inquiries', email: 'sales@exobe.africa', icon: Building2 },
  { name: 'Customer Support', email: 'support@exobe.africa', icon: Headphones },
  { name: 'Returns & Exchanges', email: 'returns@exobe.africa', icon: Shield },
  { name: 'Corporate & Partnerships', email: 'corporate@exobe.africa', icon: Users },
  { name: 'Media & Press', email: 'media@exobe.africa', icon: Globe },
  { name: 'Careers', email: 'careers@exobe.africa', icon: Award }
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-600' },
  { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-blue-400' },
  { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-500' },
  { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-700' },
  { name: 'YouTube', icon: Youtube, url: '#', color: 'hover:text-red-500' }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    department: 'support@exobe.africa',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        department: 'support@exobe.africa',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#000000] to-[#4A4A4A] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact Us', isCurrentPage: true }
            ]}
            variant="centered"
            className="mb-8"
          />

          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-[#C8102E] rounded-xl flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold">Get in Touch</h1>
            </div>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              We're here to help you with everything from product questions to order support. 
              Reach out to us through any of the channels below.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: '24/7', label: 'Live Chat Support' },
                { number: '< 24hrs', label: 'Email Response' },
                { number: '3', label: 'Office Locations' },
                { number: '50k+', label: 'Happy Customers' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-[#C8102E] mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">Choose Your Preferred Way to Connect</h2>
            <p className="text-lg text-[#4A4A4A] max-w-3xl mx-auto">
              Whether you need quick answers or detailed support, we have multiple channels to assist you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div 
                  key={index} 
                  className={`relative p-6 bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-xl group ${
                    method.highlight 
                      ? 'border-[#C8102E] ring-2 ring-[#C8102E] ring-opacity-20' 
                      : 'border-gray-200 hover:border-[#C8102E]'
                  }`}
                >
                  {method.highlight && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#C8102E] text-white text-xs font-bold px-3 py-1 rounded-full">
                        RECOMMENDED
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className={`w-16 h-16 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#000000] mb-2">{method.title}</h3>
                    <p className="text-[#C8102E] font-semibold mb-3">{method.subtitle}</p>
                    <p className="text-[#4A4A4A] text-sm mb-4 leading-relaxed">{method.description}</p>
                    
                    <div className="mb-4">
                      <span className="inline-block bg-gray-100 text-[#4A4A4A] text-xs px-3 py-1 rounded-full">
                        {method.availability}
                      </span>
                    </div>
                    
                    <button className={`w-full ${method.color} text-white py-3 px-4 rounded-full font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95`}>
                      {method.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact Form & Office Info */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#000000] mb-4">Send Us a Message</h2>
                <p className="text-[#4A4A4A]">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent Successfully!</h3>
                  <p className="text-[#4A4A4A]">
                    Thank you for contacting us. We'll respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#000000] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#000000] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#000000] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[#000000] mb-2">
                        Department
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors"
                      >
                        {departments.map((dept, index) => (
                          <option key={index} value={dept.email}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#000000] mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#000000] mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-[#C8102E] hover:bg-[#A00E26] text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Office Locations */}
            <div className="space-y-6">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#000000] mb-4">Visit Our Offices</h2>
                <p className="text-[#4A4A4A]">
                  Meet us in person at one of our convenient locations across South Africa.
                </p>
              </div>

              {officeLocations.map((office, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-[#C8102E] rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#000000]">{office.city}</h3>
                        {office.isHeadquarters && (
                          <span className="inline-block bg-[#C8102E] text-white text-xs px-2 py-1 rounded-full">
                            HEADQUARTERS
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-[#4A4A4A] mt-0.5" />
                      <div>
                        <p className="text-[#000000] font-medium">{office.address}</p>
                        <p className="text-[#4A4A4A] text-sm">{office.postal}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-[#4A4A4A]" />
                      <a href={`tel:${office.phone}`} className="text-[#C8102E] font-medium hover:underline">
                        {office.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-[#4A4A4A]" />
                      <a href={`mailto:${office.email}`} className="text-[#C8102E] font-medium hover:underline">
                        {office.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-[#4A4A4A]" />
                      <span className="text-[#4A4A4A]">{office.hours}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="text-[#C8102E] font-semibold hover:text-[#A00E26] transition-colors flex items-center">
                      Get Directions
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Department Directory */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">Department Directory</h2>
              <p className="text-lg text-[#4A4A4A] max-w-3xl mx-auto">
                Connect directly with the right team for faster, more specialised assistance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => {
                const IconComponent = dept.icon;
                return (
                  <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#F6E2E0] rounded-lg flex items-center justify-center group-hover:bg-[#C8102E] transition-colors">
                        <IconComponent className="h-6 w-6 text-[#C8102E] group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#000000] mb-1">{dept.name}</h3>
                        <a href={`mailto:${dept.email}`} className="text-[#C8102E] text-sm hover:underline">
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ & Social */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Quick FAQ */}
            <div className="bg-gradient-to-br from-[#F6E2E0] to-[#FFF5F5] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#000000] mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {[
                  {
                    question: "What are your customer service hours?",
                    answer: "Live chat is available 24/7. Phone and email support: Mon-Fri 8AM-8PM, weekends 9AM-5PM."
                  },
                  {
                    question: "How quickly do you respond to emails?",
                    answer: "We respond to all emails within 24 hours, typically much faster during business hours."
                  },
                  {
                    question: "Can I visit your physical stores?",
                    answer: "Yes! We have showrooms in Johannesburg, Cape Town, and Durban. Check our office hours above."
                  },
                  {
                    question: "Do you offer phone support in other languages?",
                    answer: "Yes, we provide support in English, Afrikaans, and Zulu. Let us know your preference."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-[#000000] mb-2">{faq.question}</h3>
                    <p className="text-[#4A4A4A] text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/faq">
                  <button className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors flex items-center">
                    View All FAQs
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Social & Community */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-[#000000] mb-6">Connect With Us</h2>
              
              <p className="text-[#4A4A4A] mb-8">
                Follow us on social media for the latest updates, exclusive offers, and community discussions.
              </p>

              <div className="grid grid-cols-5 gap-4 mb-8">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-[#4A4A4A] transition-colors ${social.color}`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-[#000000] mb-2">Community Forum</h3>
                  <p className="text-[#4A4A4A] text-sm mb-3">
                    Join our community to share experiences, get tips, and connect with other customers.
                  </p>
                  <button className="text-[#C8102E] font-semibold hover:underline text-sm">
                    Join Community →
                  </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-[#000000] mb-2">Newsletter</h3>
                  <p className="text-[#4A4A4A] text-sm mb-3">
                    Get the latest news, exclusive offers, and product updates delivered to your inbox.
                  </p>
                  <button className="text-[#C8102E] font-semibold hover:underline text-sm">
                    Subscribe Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
