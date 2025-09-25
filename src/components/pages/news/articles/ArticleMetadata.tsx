"use client";

import { Calendar, Clock, User, Share2 } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: string;
  image: string;
  featured: boolean;
}

interface ArticleMetadataProps {
  article: NewsArticle;
  onShare: () => void;
}

const ArticleMetadata: React.FC<ArticleMetadataProps> = ({ article, onShare }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
      <div className="flex items-center mb-4">
        <span className="bg-[#C8102E] text-white px-3 py-1 rounded-full text-sm font-semibold mr-4">
          {article.category}
        </span>
        {article.featured && (
          <span className="bg-[#F6E2E0] text-[#C8102E] px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </span>
        )}
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000000] mb-4 leading-tight">
        {article.title}
      </h1>

      <p className="text-lg text-[#4A4A4A] mb-6 leading-relaxed">
        {article.excerpt}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 pt-6">
        <div className="flex items-center space-x-6 text-sm text-[#4A4A4A] mb-4 sm:mb-0">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            {article.author}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(article.publishedAt)}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {article.readTime} min read
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onShare}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-[#4A4A4A] hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
        </div>
      </div>
    </header>
  );
};

export default ArticleMetadata;
