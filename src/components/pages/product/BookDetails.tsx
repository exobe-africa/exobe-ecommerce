"use client";

import { Book, Calendar, Globe, Hash, Tag, FileText, Layers, BookOpen } from 'lucide-react';

interface BookDetailsProps {
  bookDetails: {
    isbn?: string;
    author?: string;
    publisher?: string;
    publicationDate?: string;
    pages?: number;
    language?: string;
    genre?: string;
    format?: string;
  };
  isLoading?: boolean;
}

const BookDetailsSkeleton = () => {
  return (
    <div className="border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-2xl mb-4 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-2 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-lg w-80 mx-auto animate-pulse" />
        </div>
        
        {/* Details Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-10 flex items-center justify-center">
          <div className="h-1 w-24 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const BookDetails: React.FC<BookDetailsProps> = ({ bookDetails, isLoading = false }) => {
  const details = [
    { icon: Hash, label: 'ISBN', value: bookDetails.isbn, highlight: false },
    { icon: Book, label: 'Author', value: bookDetails.author, highlight: true },
    { icon: FileText, label: 'Publisher', value: bookDetails.publisher, highlight: false },
    { icon: Calendar, label: 'Publication Date', value: bookDetails.publicationDate ? new Date(bookDetails.publicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : undefined, highlight: false },
    { icon: Layers, label: 'Pages', value: bookDetails.pages ? `${bookDetails.pages} pages` : undefined, highlight: false },
    { icon: Globe, label: 'Language', value: bookDetails.language, highlight: false },
    { icon: Tag, label: 'Genre', value: bookDetails.genre, highlight: true },
    { icon: BookOpen, label: 'Format', value: bookDetails.format, highlight: false },
  ].filter(item => item.value);

  // Show skeleton while loading
  if (isLoading) {
    return <BookDetailsSkeleton />;
  }

  // Don't show if no details
  if (details.length === 0) return null;

  return (
    <div className="border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#C8102E] to-[#A00E26] rounded-2xl mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-2">Book Information</h2>
          <p className="text-[#4A4A4A] text-lg">Everything you need to know about this book</p>
        </div>
        
        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((detail) => {
            const Icon = detail.icon;
            return (
              <div 
                key={detail.label} 
                className={`group relative bg-white rounded-2xl p-6 shadow-sm border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  detail.highlight 
                    ? 'border-[#C8102E] bg-gradient-to-br from-[#FFF5F5] to-white' 
                    : 'border-gray-100 hover:border-[#C8102E]'
                }`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 ${
                  detail.highlight
                    ? 'bg-gradient-to-br from-[#C8102E] to-[#A00E26] shadow-md'
                    : 'bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-[#C8102E] group-hover:to-[#A00E26]'
                }`}>
                  <Icon className={`w-6 h-6 transition-colors duration-300 ${
                    detail.highlight 
                      ? 'text-white' 
                      : 'text-[#4A4A4A] group-hover:text-white'
                  }`} />
                </div>
                
                {/* Label */}
                <p className="text-sm font-medium text-[#4A4A4A] mb-2 uppercase tracking-wide">
                  {detail.label}
                </p>
                
                {/* Value */}
                <p className="text-lg font-bold text-[#000000] break-words leading-snug">
                  {detail.value}
                </p>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#C8102E] to-transparent opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-10 flex items-center justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#C8102E] to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

