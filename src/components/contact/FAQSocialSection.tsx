"use client";

import Link from 'next/link';
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-600' },
  { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-blue-400' },
  { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-500' },
  { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-700' },
  { name: 'YouTube', icon: Youtube, url: '#', color: 'hover:text-red-500' }
];

const FAQSocialSection = () => {
  return (
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
  );
};

export default FAQSocialSection;
