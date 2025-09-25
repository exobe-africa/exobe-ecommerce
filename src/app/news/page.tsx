"use client";

import { useState } from 'react';
import { 
  NewsHeader, 
  CategoryFilter, 
  FeaturedArticles, 
  RegularArticles, 
  NoResults 
} from '../../components/pages/news';
import { Newsletter } from '@/components/common';

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

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'eXobe Launches Revolutionary AI-Powered Shopping Assistant',
    excerpt: 'Experience the future of online shopping with our new AI assistant that helps you find exactly what you need, when you need it.',
    content: '',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15',
    readTime: 5,
    category: 'Technology',
    image: '🤖',
    featured: true
  },
  {
    id: '2',
    title: 'Sustainable Shopping: Our Commitment to a Greener Future',
    excerpt: 'Discover how eXobe is leading the charge in sustainable e-commerce with eco-friendly packaging and carbon-neutral delivery options.',
    content: '',
    author: 'Michael Green',
    publishedAt: '2024-01-12',
    readTime: 7,
    category: 'Sustainability',
    image: '🌱',
    featured: true
  },
  {
    id: '3',
    title: 'Black Friday 2024: Record-Breaking Sales and Customer Satisfaction',
    excerpt: 'A look back at our most successful Black Friday event, featuring incredible deals and unprecedented customer engagement.',
    content: '',
    author: 'Emma Davis',
    publishedAt: '2024-01-10',
    readTime: 4,
    category: 'Business',
    image: '🛍️',
    featured: false
  },
  {
    id: '4',
    title: 'Black Friday 2024: Record-Breaking Sales and Customer Satisfaction',
    excerpt: 'A look back at our most successful Black Friday event, featuring incredible deals and unprecedented customer engagement.',
    content: '',
    author: 'Emma Davis',
    publishedAt: '2024-01-10',
    readTime: 4,
    category: 'Business',
    image: '🛍️',
    featured: false
  },
  {
    id: '5',
    title: 'Black Friday 2024: Record-Breaking Sales and Customer Satisfaction',
    excerpt: 'A look back at our most successful Black Friday event, featuring incredible deals and unprecedented customer engagement.',
    content: '',
    author: 'Emma Davis',
    publishedAt: '2024-01-10',
    readTime: 4,
    category: 'Business',
    image: '🛍️',
    featured: false
  },
];

const categories = ['All', 'Technology', 'Sustainability', 'Business', 'Community', 'Updates'];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleViewAllArticles = () => {
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NewsHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <FeaturedArticles articles={featuredArticles} />

        <RegularArticles articles={regularArticles} />

        {filteredArticles.length === 0 && (
          <NoResults onViewAll={handleViewAllArticles} />
        )}
      </div>
      <Newsletter />
    </div>
  );
}
