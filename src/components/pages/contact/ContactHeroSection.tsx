"use client";

import { MessageCircle } from 'lucide-react';
import { Breadcrumb, PageHeader, QuickStats } from '../../common/index';

const ContactHeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#000000] to-[#4A4A4A] text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us', isCurrentPage: true }
          ]}
          variant="centered"
          className="mb-8"
        />

        <div className="text-center">
          <PageHeader
            title="Get in Touch"
            iconComponent={MessageCircle}
            variant="centered"
            size="large"
            className="text-4xl lg:text-6xl mb-6"
          />
          
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            We're here to help you with everything from product questions to order support. 
            Reach out to us through any of the channels below.
          </p>

          <QuickStats
            stats={[
              { number: '24/7', label: 'WhatsApp Support' },
              { number: '< 24hrs', label: 'Email Response' },
              { number: '3', label: 'Office Locations' },
              { number: '50k+', label: 'Happy Customers' }
            ]}
            variant="hero"
            columns={4}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
