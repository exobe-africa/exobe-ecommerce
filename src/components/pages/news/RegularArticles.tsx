"use client";

import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';

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

interface RegularArticlesProps {
  articles: NewsArticle[];
}

const RegularArticles: React.FC<RegularArticlesProps> = ({ articles }) => {
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
    <section>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-8">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <Link href={`/news/${article.id}`}>
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-4xl">{article.image}</span>
                </div>
              </div>
            </Link>
            
            <div className="p-6">
              <div className="flex items-center text-xs text-[#4A4A4A] mb-3 space-x-3">
                <span className="bg-[#F6E2E0] text-[#C8102E] px-2 py-1 rounded-full font-medium">
                  {article.category}
                </span>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(article.publishedAt)}
                </div>
              </div>
              
              <Link href={`/news/${article.id}`}>
                <h3 className="text-lg font-bold text-[#000000] mb-3 hover:text-[#C8102E] transition-colors group-hover:text-[#C8102E] line-clamp-2">
                  {article.title}
                </h3>
              </Link>
              
              <p className="text-[#4A4A4A] text-sm mb-4 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-[#4A4A4A]">
                  <User className="h-3 w-3 mr-1" />
                  {article.author}
                </div>
                
                <div className="flex items-center text-xs text-[#4A4A4A]">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime} min
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RegularArticles;
