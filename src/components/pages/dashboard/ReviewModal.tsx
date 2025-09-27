"use client";

import { useState } from 'react';
import { X, Star, MessageSquare } from 'lucide-react';
import { useScrollLock } from '../../../hooks/useScrollLock';

interface Review {
  id: number;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review | null;
  onSave: (reviewData: { rating: number; comment: string }) => void;
}

export default function ReviewModal({ isOpen, onClose, review, onSave }: ReviewModalProps) {
  const [rating, setRating] = useState(review?.rating || 5);
  const [comment, setComment] = useState(review?.comment || '');
  const [hoveredRating, setHoveredRating] = useState(0);

  // Lock body scroll when modal is open
  useScrollLock(isOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSave({ rating, comment: comment.trim() });
      onClose();
    }
  };

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  const handleRatingHover = (newRating: number) => {
    setHoveredRating(newRating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-100 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#F6E2E0] rounded-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-[#C8102E]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#000000]">Edit Review</h3>
                <p className="text-sm text-[#4A4A4A]">{review.productName}</p>
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
        <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 p-6 space-y-6">
          {/* Rating Section */}
          <div>
            <label className="block text-sm font-medium text-[#000000] mb-3">
              Your Rating
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => handleRatingHover(star)}
                    onMouseLeave={handleRatingLeave}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 hover:text-yellow-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm text-[#4A4A4A] ml-3">
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </span>
            </div>
          </div>

          {/* Comment Section */}
          <div>
            <label className="block text-sm font-medium text-[#000000] mb-2">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none text-[#000000] placeholder-gray-500"
              required
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-[#4A4A4A]">
                Help other customers by sharing your honest experience
              </p>
              <span className="text-xs text-[#4A4A4A]">
                {comment.length}/500
              </span>
            </div>
          </div>

          {/* Review Guidelines */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-2">Review Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be honest and helpful to other customers</li>
              <li>• Focus on the product's features and quality</li>
              <li>• Avoid personal information or inappropriate content</li>
            </ul>
          </div>
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-[#4A4A4A] px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!comment.trim()}
                className="flex-1 bg-[#C8102E] text-white px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-[#A00E26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Review
              </button>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
