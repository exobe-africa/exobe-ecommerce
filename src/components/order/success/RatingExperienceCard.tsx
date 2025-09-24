"use client";

import { Star } from 'lucide-react';

const RatingExperienceCard = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 p-6">
      <h3 className="text-lg font-semibold text-[#000000] mb-3">Rate Your Experience</h3>
      <p className="text-sm text-[#4A4A4A] mb-4">
        How was your shopping experience with eXobe?
      </p>
      
      <div className="flex justify-center space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} className="text-yellow-400 hover:text-yellow-500 transition-colors">
            <Star className="h-8 w-8 fill-current" />
          </button>
        ))}
      </div>
      
      <button className="w-full bg-yellow-400 text-yellow-900 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
        Submit Rating
      </button>
    </div>
  );
};

export default RatingExperienceCard;
