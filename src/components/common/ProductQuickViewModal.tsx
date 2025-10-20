"use client";

import { useState, useEffect } from 'react';
import { X, Plus, Minus, Heart, Share2, Star } from 'lucide-react';
import LocationChips from './LocationChips';

interface VariantOption {
  name: string;
  value: string;
  image?: string;
  price?: number;
  stock: number;
  availableLocations?: string[];
}

interface ProductVariants {
  colors?: VariantOption[];
  sizes?: VariantOption[];
  storage?: VariantOption[];
  bands?: VariantOption[];
  [key: string]: VariantOption[] | undefined;
}

interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  brand?: string;
  description?: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  addedAt?: Date;
  variants?: ProductVariants;
  availableLocations?: string[];
}

interface ProductQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (product: Product, selectedVariants: Record<string, string>, quantity: number, currentLocations: string[]) => void;
  onWishlistToggle?: (product: Product) => void;
  isInWishlist?: boolean;
}

export default function ProductQuickViewModal({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onWishlistToggle,
  isInWishlist = false
}: ProductQuickViewModalProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(product.image);
  const [currentPrice, setCurrentPrice] = useState(product.price);
  const [currentStock, setCurrentStock] = useState(0);
  const [currentLocations, setCurrentLocations] = useState<string[]>(product.availableLocations || []);

  const calculateCurrentLocations = (variants: Record<string, string>) => {
    if (!product.variants) return product.availableLocations || [];
    
    const selectedOptions: VariantOption[] = [];
    
    Object.entries(variants).forEach(([variantType, selectedValue]) => {
      const variantOptions = product.variants?.[variantType];
      if (variantOptions) {
        const selectedOption = variantOptions.find(option => option.value === selectedValue);
        if (selectedOption) {
          selectedOptions.push(selectedOption);
        }
      }
    });
    
    if (selectedOptions.length === 0) {
      return product.availableLocations || [];
    }
    
    let commonLocations = selectedOptions[0]?.availableLocations || [];
    
    for (let i = 1; i < selectedOptions.length; i++) {
      const optionLocations = selectedOptions[i]?.availableLocations || [];
      commonLocations = commonLocations.filter(location => 
        optionLocations.includes(location)
      );
    }
    
    return commonLocations;
  };

  useEffect(() => {
    if (product.variants) {
      const initialVariants: Record<string, string> = {};
      let basePrice = product.price;
      let baseStock = 0;
      let baseImage = product.image;

      Object.entries(product.variants).forEach(([variantType, options]) => {
        if (options && options.length > 0) {
          initialVariants[variantType] = options[0].value;
          if (options[0].image) {
            baseImage = options[0].image;
          }
          if (options[0].price !== undefined) {
            basePrice = options[0].price;
          }
          if (options[0].stock !== undefined) {
            baseStock = options[0].stock;
          }
        }
      });

      setSelectedVariants(initialVariants);
      setCurrentImage(baseImage);
      setCurrentPrice(basePrice);
      setCurrentStock(baseStock);
      setCurrentLocations(calculateCurrentLocations(initialVariants));
    } else {
      setCurrentImage(product.image);
      setCurrentPrice(product.price);
      setCurrentStock(100);
      setCurrentLocations(product.availableLocations || []);
    }
    setQuantity(1);
  }, [product]);

  const handleVariantChange = (variantType: string, value: string) => {
    const newVariants = { ...selectedVariants, [variantType]: value };
    setSelectedVariants(newVariants);

    const variantOptions = product.variants?.[variantType];
    const variantOption = variantOptions?.find(option => option.value === value);
    
    if (variantOption) {
      if (variantOption.image) {
        setCurrentImage(variantOption.image);
      }
      
      let newPrice = product.price;
      Object.entries(newVariants).forEach(([type, val]) => {
        const typeOptions = product.variants?.[type];
        const option = typeOptions?.find(opt => opt.value === val);
        if (option && option.price !== undefined) {
          newPrice = option.price;
        }
      });
      
      if (variantType === 'bands' && variantOption.price) {
        newPrice += variantOption.price;
      }
      
      setCurrentPrice(newPrice);
      
      if (variantOption.stock !== undefined) {
        setCurrentStock(variantOption.stock);
      }
    }
    
    setCurrentLocations(calculateCurrentLocations(newVariants));
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariants, quantity, currentLocations);
    onClose();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out this ${product.name} on eXobe!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        console.log('Product link copied to clipboard!');
      }
    } catch (err) {
      console.error('Unable to share product');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300"
          onClick={onClose}
        />
        
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-[#000000] truncate pr-4">
              Quick View
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-[#4A4A4A]" />
            </button>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                  {currentImage && (currentImage.startsWith('http') || currentImage.startsWith('/')) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={currentImage} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl sm:text-8xl">{currentImage}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-center space-x-3">
                  {onWishlistToggle && (
                    <button
                      onClick={() => {
                        // Close the quick view modal first
                        onClose();
                        // Then handle the wishlist toggle
                        onWishlistToggle(product);
                      }}
                      className={`p-3 rounded-full border-2 transition-all duration-200 ${
                        isInWishlist
                          ? 'border-pink-500 bg-pink-50 text-pink-500'
                          : 'border-[#4A4A4A] text-[#4A4A4A] hover:border-pink-500 hover:bg-pink-50 hover:text-pink-500'
                      }`}
                      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
                    </button>
                  )}
                  
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full border-2 border-[#4A4A4A] text-[#4A4A4A] hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200"
                    title="Share product"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#000000] mb-2">{product.name}</h1>
                  {product.rating && product.reviews && (
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating!)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-[#4A4A4A]">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  )}
                  {product.description && (
                    <p className="text-[#4A4A4A] text-sm leading-relaxed">{product.description}</p>
                  )}
                </div>

                {currentLocations.length > 0 && (
                  <LocationChips 
                    locations={currentLocations} 
                    size="md"
                    className="py-2"
                  />
                )}

                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-[#C8102E]">
                    R{currentPrice.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-[#4A4A4A] line-through">
                        R{product.originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-[#C8102E] text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Save R{(product.originalPrice - currentPrice).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {product.variants && Object.entries(product.variants).map(([variantType, options]) => (
                  <div key={variantType} className="space-y-3">
                    <h3 className="font-semibold text-[#000000] capitalize">
                      {variantType === 'colors' ? 'Color' : 
                       variantType === 'sizes' ? 'Size' :
                       variantType === 'storage' ? 'Storage' :
                       variantType === 'bands' ? 'Band' : variantType}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {options?.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleVariantChange(variantType, option.value)}
                          className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200 ${
                            selectedVariants[variantType] === option.value
                              ? 'border-[#C8102E] bg-[#C8102E] text-white'
                              : 'border-gray-300 text-[#4A4A4A] hover:border-[#C8102E] hover:text-[#C8102E]'
                          }`}
                        >
                          {option.name}
                          {option.price && option.price > 0 && (
                            <span className="ml-1 text-xs">
                              (+R{option.price.toFixed(2)})
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-[#000000]">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full border-2 border-[#4A4A4A] bg-white text-[#4A4A4A] flex items-center justify-center hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      
                      <span className="w-12 text-center font-semibold text-lg text-[#000000]">
                        {quantity}
                      </span>
                      
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-full border-2 border-[#4A4A4A] bg-white text-[#4A4A4A] flex items-center justify-center hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#C8102E] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#A00E26] transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Add to Cart
                  </button>
                </div>

                {currentStock > 0 && (
                  <p className="text-sm text-green-600 font-medium">
                    ✓ {currentStock} items in stock
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
