"use client";

import { Star, Edit3, Trash2 } from 'lucide-react';
import { Review } from '../../shared/types';
import { formatDate } from '../../shared/utils';

interface ReviewsTabProps {
  reviews: Review[];
  onReviewEdit: (review: Review) => void;
  onReviewDelete: (review: Review) => void;
}

export default function ReviewsTab({ reviews, onReviewEdit, onReviewDelete }: ReviewsTabProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-[#000000]">My Reviews</h2>
        <p className="text-[#4A4A4A] mt-1">Manage your product reviews and ratings</p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[#000000] mb-2">{review.productName}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#4A4A4A]">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  <p className="text-[#4A4A4A]">{review.comment}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onReviewEdit(review)}
                    className="text-[#C8102E] hover:text-[#A00E26] p-2 rounded-lg hover:bg-[#F6E2E0] transition-colors"
                    title="Edit review"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => onReviewDelete(review)}
                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete review"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-[#4A4A4A]">
                <span>{review.helpful} people found this helpful</span>
                <button className="text-[#C8102E] hover:text-[#A00E26] font-medium">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
