"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Breadcrumb } from '../../common';

interface ArticleHeaderProps {
  title: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title }) => {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'News', href: '/news' },
            { label: title, isCurrentPage: true }
          ]}
          className="mb-6"
        />

        {/* Back Button */}
        <Link 
          href="/news"
          className="inline-flex items-center text-[#C8102E] hover:text-[#A00E26] font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to News
        </Link>
      </div>
    </section>
  );
};

export default ArticleHeader;
