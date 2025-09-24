"use client";

import Link from 'next/link';
import { Gift } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface SuggestedProductsProps {
  products: Product[];
  title?: string;
  maxItems?: number;
}

const SuggestedProducts: React.FC<SuggestedProductsProps> = ({ 
  products, 
  title = "Frequently bought together",
  maxItems = 2 
}) => {
  const displayProducts = products.slice(0, maxItems);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-[#000000] mb-4 flex items-center">
        <Gift className="h-5 w-5 mr-2 text-[#C8102E]" />
        {title}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {displayProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <span className="text-2xl">{product.image}</span>
              </div>
              <h4 className="font-medium text-[#000000] text-sm line-clamp-2 mb-1">{product.name}</h4>
              <p className="font-semibold text-[#C8102E] text-sm">R{product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;
