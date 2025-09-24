"use client";

import Link from 'next/link';
import { MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react';

const HelpSupportSection = () => {
  return (
    <section className="mt-16">
      <div className="bg-gradient-to-r from-[#F6E2E0] to-[#FFF5F5] rounded-2xl p-8 lg:p-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#000000] mb-4">Still need help?</h2>
          <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our friendly support team is here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Live Chat */}
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#C8102E] transition-all duration-300 group">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#000000] mb-2">Live Chat</h3>
            <p className="text-[#4A4A4A] mb-3">Get instant help from our support team</p>
            <p className="text-sm text-green-600 font-medium mb-4">Available 24/7</p>
            <button className="bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors">
              Start Chat
            </button>
          </div>

          {/* Phone Support */}
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#C8102E] transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#000000] mb-2">Phone Support</h3>
            <p className="text-[#4A4A4A] mb-3">Speak directly with our team</p>
            <p className="text-sm text-blue-600 font-medium mb-4">Mon-Fri: 8AM-8PM</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors">
              +27 11 123 4567
            </button>
          </div>

          {/* Email Support */}
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-[#C8102E] transition-all duration-300 group">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#000000] mb-2">Email Support</h3>
            <p className="text-[#4A4A4A] mb-3">Send us a detailed message</p>
            <p className="text-sm text-purple-600 font-medium mb-4">Response within 24hrs</p>
            <button className="bg-purple-500 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-600 transition-colors">
              Send Email
            </button>
          </div>
        </div>

        {/* Help Center Link */}
        <div className="text-center mt-10">
          <Link href="/help-center">
            <button className="bg-[#000000] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#4A4A4A] transition-colors flex items-center justify-center mx-auto group">
              Browse Help Centre
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HelpSupportSection;
