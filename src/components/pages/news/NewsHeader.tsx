"use client";

import { Calendar } from 'lucide-react';
import { Breadcrumb, PageHeader } from '../../common';

const NewsHeader = () => {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'News & Updates', isCurrentPage: true }
          ]}
          className="mb-6"
        />

        <PageHeader
          title="News & Updates"
          description="Stay informed with the latest news, updates, and insights from eXobe"
          iconComponent={Calendar}
          variant="default"
          size="large"
        />
      </div>
    </section>
  );
};

export default NewsHeader;
