"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
  image: string;
  color: string;
  textColor: string;
  bgColor: string;
  featured: string[];
}

interface CategoriesGridProps {
  categories: Category[];
  startingPrice?: string;
}

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ 
  categories, 
  startingPrice = "R99.99" 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}`}>
          <div className="group cursor-pointer">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-100">
              <div className={`relative h-48 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <span className="text-6xl">{category.icon}</span>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-[#000000] group-hover:text-[#C8102E] transition-colors">
                    {category.name}
                  </h3>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${category.bgColor} ${category.textColor}`}>
                    {category.productCount} items
                  </span>
                </div>
                
                <p className="text-[#4A4A4A] mb-4 leading-relaxed">
                  {category.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {category.featured.slice(0, 3).map((item, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-[#4A4A4A] px-2 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                    {category.featured.length > 3 && (
                      <span className="text-xs text-[#4A4A4A] px-2 py-1">
                        +{category.featured.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4A4A4A]">
                    Starting from {startingPrice}
                  </span>
                  <div className="flex items-center text-[#C8102E] font-medium group-hover:translate-x-1 transition-transform">
                    <span className="text-sm mr-1">Shop Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesGrid;
