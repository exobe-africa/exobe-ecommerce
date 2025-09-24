"use client";

import React from 'react';
import { User, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  testimonial: string;
}

const SuccessStoriesSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah M.",
      role: "Fashion Retailer",
      rating: 5,
      testimonial: "eXobe helped me grow my fashion business from a small boutique to reaching customers nationwide. The platform is easy to use and the support team is fantastic!"
    },
    {
      name: "David K.",
      role: "Electronics Seller",
      rating: 5,
      testimonial: "I've been selling electronics on eXobe for 2 years now. The analytics tools help me understand my customers better and the secure payment system gives me peace of mind."
    },
    {
      name: "Lisa T.",
      role: "Home & Garden",
      rating: 5,
      testimonial: "Starting my home decor business was scary, but eXobe made it simple. I love how they handle logistics so I can focus on what I do best - creating beautiful products."
    }
  ];

  return (
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
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#000000]">{testimonial.name}</h4>
                  <p className="text-[#4A4A4A] text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#4A4A4A] italic">
                "{testimonial.testimonial}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
