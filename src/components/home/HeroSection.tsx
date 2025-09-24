"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#F6E2E0] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#000000] mb-4 sm:mb-6 leading-tight">
              Discover Premium
              <span className="text-[#C8102E] block">Products</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#4A4A4A] mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              Experience luxury shopping with our curated collection of high-quality products. 
              From fashion to electronics, find everything you need with exceptional service.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 px-4 sm:px-0">
              <Link href="/categories">
                <button className="w-full sm:w-auto bg-[#C8102E] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 flex items-center justify-center group touch-manipulation text-lg">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/categories">
                <button className="w-full sm:w-auto border-2 border-[#4A4A4A] text-[#4A4A4A] px-8 py-4 rounded-full font-semibold hover:bg-[#4A4A4A] hover:text-white transition-all duration-300 touch-manipulation">
                  Browse Categories
                </button>
              </Link>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 mb-4 lg:mb-0">
            <div className="bg-gradient-to-br from-[#C8102E] to-[#A00E26] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Special Offer</h3>
                <p className="text-base sm:text-lg mb-4 sm:mb-6">Up to 50% off on selected items</p>
                <div className="bg-white text-[#C8102E] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-lg sm:text-xl">
                  LIMITED TIME
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
