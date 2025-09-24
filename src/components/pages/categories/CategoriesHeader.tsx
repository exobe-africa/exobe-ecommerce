"use client";

interface CategoriesHeaderProps {
  title?: string;
  description?: string;
}

const CategoriesHeader: React.FC<CategoriesHeaderProps> = ({
  title = "Shop by Category",
  description = "Discover our extensive range of products across multiple categories. Find exactly what you're looking for with our curated collections."
}) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">
        {title}
      </h1>
      <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default CategoriesHeader;
