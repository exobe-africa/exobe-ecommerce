"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const ArticleNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">📰</div>
        <h1 className="text-2xl font-bold text-[#000000] mb-4">Article Not Found</h1>
        <p className="text-[#4A4A4A] mb-8">The article you're looking for doesn't exist.</p>
        <Link 
          href="/news"
          className="inline-flex items-center bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to News
        </Link>
      </div>
    </div>
  );
};

export default ArticleNotFound;
