"use client";

import { Star, X } from 'lucide-react';

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  reviewText: string;
  setReviewText: (text: string) => void;
  onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  isOpen,
  onClose,
  reviewRating,
  setReviewRating,
  reviewText,
  setReviewText,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#000000]">Write a Review</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-[#4A4A4A]" />
            </button>
          </div>

          {/* Rating Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#000000] mb-3">Your Rating</label>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewRating(i + 1)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star 
                    className={`h-8 w-8 ${
                      i < reviewRating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300 hover:text-yellow-400'
                    }`} 
                  />
                </button>
              ))}
              <span className="ml-3 text-sm text-[#4A4A4A]">
                {reviewRating > 0 && `${reviewRating} star${reviewRating !== 1 ? 's' : ''}`}
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#000000] mb-3">Your Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none"
              rows={5}
              maxLength={500}
            />
            <div className="text-right text-sm text-[#4A4A4A] mt-1">
              {reviewText.length}/500
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-full font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={reviewRating === 0 || !reviewText.trim()}
              className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                reviewRating === 0 || !reviewText.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
              }`}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
