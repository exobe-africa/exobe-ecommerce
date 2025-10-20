"use client";

import { Star } from 'lucide-react';

interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
}

interface Product {
  id: string;
  name: string;
  rating: number;
  reviews: number;
}

interface ReviewsSectionProps {
  product: Product;
  reviews: Review[];
  isLoggedIn: boolean;
  onWriteReview: () => void;
  onLoginPrompt: () => void;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  product,
  reviews,
  isLoggedIn,
  onWriteReview,
  onLoginPrompt,
}) => {
  return (
    <div className="border-t border-gray-200 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Reviews Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Customer Reviews</h2>
            {product.reviews > 0 ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-lg font-semibold text-[#000000] ml-2">{product.rating}</span>
                </div>
                <span className="text-[#4A4A4A]">({product.reviews} reviews)</span>
              </div>
            ) : (
              <p className="text-[#4A4A4A]">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
          
          <div className="mt-4 sm:mt-0">
            {isLoggedIn ? (
              <button
                onClick={onWriteReview}
                className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors"
              >
                Write a Review
              </button>
            ) : (
              <div className="text-center">
                <p className="text-sm text-[#4A4A4A] mb-2">Want to write a review?</p>
                <button
                  onClick={onLoginPrompt}
                  className="bg-[#4A4A4A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#333333] transition-colors"
                >
                  Sign In to Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Rating Breakdown - only show if there are reviews */}
        {product.reviews > 0 && reviews.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-[#000000] mb-4">Rating Breakdown</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-[#000000] w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#4A4A4A] w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Individual Reviews - only show if there are reviews */}
        {reviews.length > 0 && (
          <>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-semibold">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-[#000000]">{review.userName}</span>
                          {review.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-[#4A4A4A]">
                            {new Date(review.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#000000] mb-2">{review.title}</h4>
                    <p className="text-[#4A4A4A] leading-relaxed">{review.comment}</p>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-[#4A4A4A] hover:text-[#C8102E] transition-colors">
                      <span className="text-sm">👍</span>
                      <span className="text-sm">Helpful ({review.helpful})</span>
                    </button>
                    <button className="text-sm text-[#4A4A4A] hover:text-[#C8102E] transition-colors">
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Reviews */}
            <div className="text-center mt-8">
              <button className="bg-gray-100 text-[#4A4A4A] px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                Load More Reviews
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
