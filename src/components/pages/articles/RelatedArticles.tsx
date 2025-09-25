"use client";

import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';

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

interface RelatedArticlesProps {
  articles: NewsArticle[];
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles }) => {
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
    <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((relatedArticle) => (
          <article key={relatedArticle.id} className="group">
            <Link href={`/news/${relatedArticle.id}`}>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-32 flex items-center justify-center mb-4 group-hover:from-[#C8102E]/10 group-hover:to-[#C8102E]/20 transition-all duration-300">
                <span className="text-3xl">{relatedArticle.image}</span>
              </div>
              
              <h3 className="font-semibold text-[#000000] mb-2 group-hover:text-[#C8102E] transition-colors line-clamp-2">
                {relatedArticle.title}
              </h3>
              
              <p className="text-sm text-[#4A4A4A] mb-3 line-clamp-2">
                {relatedArticle.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs text-[#4A4A4A]">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(relatedArticle.publishedAt)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {relatedArticle.readTime} min
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
