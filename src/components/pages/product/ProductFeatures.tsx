"use client";

interface ProductFeaturesProps {
  features: string[];
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="font-semibold text-[#000000] mb-4">Key Features</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-[#4A4A4A]">
            <div className="w-2 h-2 bg-[#C8102E] rounded-full mr-3 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFeatures;
