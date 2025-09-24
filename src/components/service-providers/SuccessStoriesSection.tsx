"use client";

import { Star, MapPin } from 'lucide-react';

interface Testimonial {
  name: string;
  service: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface SuccessStoriesSectionProps {
  testimonials: Testimonial[];
}

const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ testimonials }) => {
  return (
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
  );
};

export default SuccessStoriesSection;
