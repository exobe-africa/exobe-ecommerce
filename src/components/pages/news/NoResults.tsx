"use client";

interface NoResultsProps {
  onViewAll: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ onViewAll }) => {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">📰</div>
      <h3 className="text-xl font-semibold text-[#000000] mb-2">No articles found</h3>
      <p className="text-[#4A4A4A] mb-6">
        No articles match the selected category. Try selecting a different category.
      </p>
      <button
        onClick={onViewAll}
        className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors"
      >
        View All Articles
      </button>
    </div>
  );
};

export default NoResults;
