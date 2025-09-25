"use client";

import React from 'react';
import Link from 'next/link';
import { Home, Search, ArrowLeft, ShoppingBag, User, HelpCircle } from 'lucide-react';
import { Newsletter } from '@/components/common';

export default function NotFound() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl sm:text-[12rem] font-bold text-[#C8102E] leading-none">
            404
          </h1>
          <div className="w-24 h-1 bg-[#C8102E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link href="/">
            <button className="group flex items-center gap-3 px-8 py-4 bg-[#C8102E] text-white rounded-full font-semibold text-lg hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <Home className="h-5 w-5" />
              Back to Home
            </button>
          </Link>
          
          <Link href="/search">
            <button className="group flex items-center gap-3 px-8 py-4 border-2 border-[#C8102E] text-[#C8102E] rounded-full font-semibold text-lg hover:bg-[#C8102E] hover:text-white transition-all duration-300 transform hover:scale-105">
              <Search className="h-5 w-5" />
              Search Products
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Quick Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/categories" className="group">
              <div className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-200 hover:border-[#C8102E] hover:bg-red-50 transition-all duration-300">
                <ShoppingBag className="h-8 w-8 text-[#C8102E] mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-gray-900 group-hover:text-[#C8102E]">Categories</span>
              </div>
            </Link>
            
            <Link href="/sell" className="group">
              <div className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-200 hover:border-[#C8102E] hover:bg-red-50 transition-all duration-300">
                <User className="h-8 w-8 text-[#C8102E] mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-gray-900 group-hover:text-[#C8102E]">Sell on eXobe</span>
              </div>
            </Link>
            
            <Link href="/help-center" className="group">
              <div className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-200 hover:border-[#C8102E] hover:bg-red-50 transition-all duration-300">
                <HelpCircle className="h-8 w-8 text-[#C8102E] mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-gray-900 group-hover:text-[#C8102E]">Help Center</span>
              </div>
            </Link>
            
            <Link href="/contact" className="group">
              <div className="flex flex-col items-center p-6 rounded-xl border-2 border-gray-200 hover:border-[#C8102E] hover:bg-red-50 transition-all duration-300">
                <ArrowLeft className="h-8 w-8 text-[#C8102E] mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-gray-900 group-hover:text-[#C8102E]">Contact Us</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="relative -mt-8 mb-16">
          <div className="text-6xl sm:text-8xl mb-4">🔍</div>
          <div className="text-sm text-gray-500 max-w-md mx-auto">
            "Not all who wander are lost, but this page definitely is!"
          </div>
        </div>
      </div>
    </div>
    <Newsletter />
    </>
  );
}
