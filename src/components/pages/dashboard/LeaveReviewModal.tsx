"use client";

import { useState, useEffect } from 'react';
import { X, Star, MessageSquare, Package } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface LeaveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  orderId: string;
  onSubmit: (reviews: { itemId: number; rating: number; comment: string }[]) => void;
}

interface ReviewData {
  itemId: number;
  rating: number;
  comment: string;
  hoveredRating: number;
}

export default function LeaveReviewModal({ 
  isOpen, 
  onClose, 
  orderItems, 
  orderId, 
  onSubmit 
}: LeaveReviewModalProps) {
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  // Initialize reviews when orderItems change
  useEffect(() => {
    if (orderItems.length > 0 && isOpen) {
      setReviews(orderItems.map(item => ({
        itemId: item.id,
        rating: 5,
        comment: '',
        hoveredRating: 0
      })));
    } else if (!isOpen) {
      // Clear reviews when modal closes
      setReviews([]);
    }
  }, [orderItems, isOpen]);

  const handleRatingClick = (itemId: number, rating: number) => {
    setReviews(prev => prev.map(review => 
      review.itemId === itemId ? { ...review, rating } : review
    ));
  };

  const handleRatingHover = (itemId: number, rating: number) => {
    setReviews(prev => prev.map(review => 
      review.itemId === itemId ? { ...review, hoveredRating: rating } : review
    ));
  };

  const handleRatingLeave = (itemId: number) => {
    setReviews(prev => prev.map(review => 
      review.itemId === itemId ? { ...review, hoveredRating: 0 } : review
    ));
  };

  const handleCommentChange = (itemId: number, comment: string) => {
    setReviews(prev => prev.map(review => 
      review.itemId === itemId ? { ...review, comment } : review
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validReviews = reviews.filter(review => review.comment.trim());
    if (validReviews.length > 0) {
      onSubmit(validReviews.map(({ itemId, rating, comment }) => ({ itemId, rating, comment })));
      onClose();
    }
  };

  const allReviewsHaveComments = reviews.every(review => review.comment.trim());

  if (!isOpen) return null;
  
  // Don't render until reviews are initialized
  if (orderItems.length > 0 && reviews.length === 0) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C8102E]"></div>
            <span className="ml-3 text-[#4A4A4A]">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#F6E2E0] rounded-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-[#C8102E]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#000000]">Leave Reviews</h3>
                <p className="text-sm text-[#4A4A4A]">Order {orderId}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-6">
            {orderItems.map((item) => {
              const review = reviews.find(r => r.itemId === item.id);
              if (!review) return null;
              return (
                <div key={item.id} className="border border-gray-200 rounded-xl p-6">
                  {/* Product Info */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{item.image}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#000000] mb-1">{item.name}</h4>
                      {item.variant && (
                        <p className="text-sm text-[#4A4A4A] mb-1">{item.variant}</p>
                      )}
                      <p className="text-sm text-[#4A4A4A]">
                        Quantity: {item.quantity} • R{item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Rating Section */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#000000] mb-3">
                      Your Rating
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(item.id, star)}
                            onMouseEnter={() => handleRatingHover(item.id, star)}
                            onMouseLeave={() => handleRatingLeave(item.id)}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-6 w-6 transition-colors ${
                                star <= (review.hoveredRating || review.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 hover:text-yellow-200'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-sm text-[#4A4A4A] ml-3">
                        {review.rating === 1 && 'Poor'}
                        {review.rating === 2 && 'Fair'}
                        {review.rating === 3 && 'Good'}
                        {review.rating === 4 && 'Very Good'}
                        {review.rating === 5 && 'Excellent'}
                      </span>
                    </div>
                  </div>

                  {/* Comment Section */}
                  <div>
                    <label className="block text-sm font-medium text-[#000000] mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={review.comment}
                      onChange={(e) => handleCommentChange(item.id, e.target.value)}
                      placeholder={`Share your experience with ${item.name}...`}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none text-[#000000] placeholder-gray-600 font-medium"
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-xs text-[#4A4A4A]">
                        Help other customers with your honest feedback
                      </p>
                      <span className="text-xs text-[#4A4A4A]">
                        {review.comment.length}/500
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Review Guidelines */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-2">Review Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be honest and helpful to other customers</li>
              <li>• Focus on the product's features, quality, and your experience</li>
              <li>• Avoid personal information or inappropriate content</li>
              <li>• You can review individual items or skip items you don't want to review</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={reviews.filter(r => r.comment.trim()).length === 0}
              className="flex-1 bg-[#C8102E] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Reviews ({reviews.filter(r => r.comment.trim()).length})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
