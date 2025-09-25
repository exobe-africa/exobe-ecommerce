"use client";

import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: string;
  image: string;
  featured: boolean;
}

interface FeaturedArticlesProps {
  articles: NewsArticle[];
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ articles }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-8">Featured Stories</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {articles.map((article, index) => (
          <article
            key={article.id}
            className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group ${
              index === 0 && articles.length > 1 ? 'lg:col-span-2' : ''
            }`}
          >
            <Link href={`/news/${article.id}`}>
              <div className="relative">
                <div className={`bg-gradient-to-br from-[#C8102E]/10 to-[#C8102E]/20 flex items-center justify-center ${
                  index === 0 && articles.length > 1 ? 'h-64 sm:h-80' : 'h-48 sm:h-56'
                }`}>
                  <span className={`${
                    index === 0 && articles.length > 1 ? 'text-6xl sm:text-8xl' : 'text-4xl sm:text-6xl'
                  }`}>
                    {article.image}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-[#C8102E] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                </div>
              </div>
            </Link>
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center text-sm text-[#4A4A4A] mb-4 space-x-4">
                <span className="bg-[#F6E2E0] text-[#C8102E] px-3 py-1 rounded-full font-medium">
                  {article.category}
                </span>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(article.publishedAt)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime} min read
                </div>
              </div>
              
              <Link href={`/news/${article.id}`}>
                <h3 className={`font-bold text-[#000000] mb-4 hover:text-[#C8102E] transition-colors group-hover:text-[#C8102E] ${
                  index === 0 && articles.length > 1 ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl'
                }`}>
                  {article.title}
                </h3>
              </Link>
              
              <p className="text-[#4A4A4A] mb-6 leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-[#4A4A4A]">
                  <User className="h-4 w-4 mr-1" />
                  {article.author}
                </div>
                
                <Link 
                  href={`/news/${article.id}`}
                  className="inline-flex items-center text-[#C8102E] hover:text-[#A00E26] font-medium text-sm group-hover:translate-x-1 transition-all duration-200"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;
