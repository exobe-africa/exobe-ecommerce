"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Breadcrumb } from '../../../components/common';
import {
  ProductImageGallery,
  ProductDetails,
  VariantSelector,
  AddToCartSection,
  ProductFeatures,
  TrustBadges,
  ReviewsSection,
  ReviewForm,
  BookDetails
} from '../../../components/pages/product';

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
import { useCart } from '../../../context/CartContext';
import { useWishlistStore } from '../../../store/wishlist';
import { useAuthStore } from '../../../store/auth';
import LocationChips from '../../../components/common/LocationChips';
import { useProductsStore } from '../../../store/products';

// Live product is fetched from the products store

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuthStore();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    openAuthModal
  } = useWishlistStore();
  const [quantity, setQuantity] = useState(1);
  
  // Variant state management
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [currentImage, setCurrentImage] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentStock, setCurrentStock] = useState(0);
  const [currentLocations, setCurrentLocations] = useState<string[]>([]);

  // Review states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Track if variants have been initialized to prevent infinite loops
  const initializedProductId = useRef<string | null>(null);

  const { product: apiProduct, isLoadingProduct, fetchById } = useProductsStore();

  // Build a view model expected by existing components
  const product = (apiProduct || isLoadingProduct)
    ? {
        id: apiProduct?.id || '',
        name: apiProduct?.title || 'Loading...',
        price: apiProduct?.price || 0,
        originalPrice: apiProduct?.compareAtPrice,
        image: apiProduct?.media?.[0] || '',
        images: apiProduct?.media || [],
        category: apiProduct?.category || '',
        inStock: (() => {
          const productLevel = (apiProduct as any)?.stock ?? (apiProduct as any)?.stockQuantity;
          const variantLevel = apiProduct?.variants?.[0]?.stock;
          const count = (productLevel ?? variantLevel ?? 0) as number;
          return count > 0;
        })(),
        stockCount: ((apiProduct as any)?.stock ?? (apiProduct as any)?.stockQuantity ?? apiProduct?.variants?.[0]?.stock ?? 0) as number,
        rating: 4.8,
        reviews: 0,
        description: apiProduct?.description || '',
        features: [],
        availableLocations: apiProduct?.availableLocations || [],
        variants: apiProduct?.groupedVariantOptions as unknown as ProductVariants | undefined,
      }
    : undefined as any;

  useEffect(() => {
    if (typeof params.id === 'string') {
      fetchById(params.id);
    }
  }, [params.id, fetchById]);

  // Function to calculate current available locations based on selected variants
  const calculateCurrentLocations = (variants: Record<string, string>) => {
    if (!product?.variants) return product?.availableLocations || [];
    
    const selectedOptions: VariantOption[] = [];
    
    // Get all selected variant options
    Object.entries(variants).forEach(([variantType, selectedValue]) => {
      const variantOptions = product.variants[variantType as keyof typeof product.variants];
      if (variantOptions) {
        const selectedOption = (variantOptions as VariantOption[]).find((option: VariantOption) => option.value === selectedValue);
        if (selectedOption) {
          selectedOptions.push(selectedOption);
        }
      }
    });
    
    // If no variants selected, return product-level locations
    if (selectedOptions.length === 0) {
      return product.availableLocations || [];
    }
    
    // Find intersection of all selected variant locations
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
    // Only initialize once per product ID to prevent infinite loops
    if (!apiProduct?.id || initializedProductId.current === apiProduct.id) {
      return;
    }

    initializedProductId.current = apiProduct.id;

    if (apiProduct.groupedVariantOptions && Object.keys(apiProduct.groupedVariantOptions).length > 0) {
      const initialVariants: Record<string, string> = {};
      let basePrice = apiProduct.price || 0;
      let baseStock = (((apiProduct as any)?.stock ?? (apiProduct as any)?.stockQuantity) ?? apiProduct.variants?.[0]?.stock ?? 0) as number;
      let baseImage = apiProduct.media?.[0] || '';

      Object.entries(apiProduct.groupedVariantOptions).forEach(([variantType, options]) => {
        const arr: VariantOption[] = Array.isArray(options) ? (options as unknown as VariantOption[]) : [];
        if (arr.length > 0) {
          initialVariants[variantType] = arr[0].value;
          if (arr[0].image) {
            baseImage = arr[0].image;
          }
          if (arr[0].price !== undefined) {
            basePrice = arr[0].price;
          }
          if (arr[0].stock !== undefined) {
            baseStock = arr[0].stock;
          }
        }
      });

      setSelectedVariants(initialVariants);
      setCurrentImage(baseImage);
      setCurrentPrice(basePrice);
      setCurrentStock(baseStock);
      setCurrentLocations(calculateCurrentLocations(initialVariants));
    } else if (apiProduct) {
      setCurrentImage(apiProduct.media?.[0] || '');
      setCurrentPrice(apiProduct.price || 0);
      setCurrentStock((((apiProduct as any)?.stock ?? (apiProduct as any)?.stockQuantity) ?? apiProduct.variants?.[0]?.stock ?? 0) as number);
      setCurrentLocations(apiProduct.availableLocations || []);
    }
  }, [apiProduct?.id, apiProduct]);

  // Handle variant selection
  const handleVariantChange = (variantType: string, value: string) => {
    const newVariants = { ...selectedVariants, [variantType]: value };
    setSelectedVariants(newVariants);

    // Find the selected variant option
    const variants = product?.variants as ProductVariants | undefined;
    const variantOptions = variants?.[variantType] as VariantOption[] | undefined;
    const variantOption = variantOptions?.find((option: VariantOption) => option.value === value);
    
    if (variantOption) {
      // Update image if variant has one
      if (variantOption.image) {
        setCurrentImage(variantOption.image);
      }
      
      // Calculate new price based on all selected variants
      let newPrice = product?.price || 0;
      Object.entries(newVariants).forEach(([type, val]) => {
        const variants = product?.variants as ProductVariants | undefined;
        const typeOptions = variants?.[type] as VariantOption[] | undefined;
        const option = typeOptions?.find((opt: VariantOption) => opt.value === val);
        if (option && option.price !== undefined) {
          newPrice = option.price;
        }
      });
      
      // Add band price for watches
      if (variantType === 'bands' && variantOption.price) {
        newPrice += variantOption.price;
      }
      
      setCurrentPrice(newPrice);
      
      // Update stock
      if (variantOption.stock !== undefined) {
        setCurrentStock(variantOption.stock);
      }
    }
    
    // Update current locations based on all selected variants
    setCurrentLocations(calculateCurrentLocations(newVariants));
  };

  // Don't show anything until we have at least attempted to load
  if (!isLoadingProduct && !product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-[#000000] mb-4">Product Not Found</h1>
          <p className="text-[#4A4A4A]">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const availableStock = currentStock || product.stockCount;
    if (availableStock === 0) {
      console.warn('This variant is currently out of stock');
      return;
    }

    if (quantity > availableStock) {
      console.warn(`Only ${availableStock} items in stock!`);
      return;
    }

    // Create variant description for cart item name
    let variantName = product.name;
    if (Object.keys(selectedVariants).length > 0) {
      const variantDescriptions = Object.entries(selectedVariants).map(([type, value]) => {
        const variants = product.variants as ProductVariants | undefined;
      const typeOptions = variants?.[type] as VariantOption[] | undefined;
      const option = typeOptions?.find((opt: VariantOption) => opt.value === value);
        return option?.name;
      }).filter(Boolean);
      
      if (variantDescriptions.length > 0) {
        variantName += ` (${variantDescriptions.join(', ')})`;
      }
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${Object.values(selectedVariants).join('-')}`,
        name: variantName,
        price: currentPrice || product.price,
        originalPrice: product.originalPrice,
        image: currentImage || product.image,
        category: product.category,
        stock: currentStock || product.stockCount,
        availableLocations: currentLocations,
      });
    }
    
    // Toast removed - cart drawer opens automatically
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    // Always check authentication first
    if (!isAuthenticated) {
      openAuthModal({ type: 'add', productId: product.id });
      return;
    }

    if (isInWishlist(product.id, Object.values(selectedVariants)[0])) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id, Object.values(selectedVariants)[0]);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} on eXobe!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        console.log('Product link copied to clipboard!');
      }
    } catch (err) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        console.log('Product link copied to clipboard!');
      } catch (clipboardErr) {
        console.error('Unable to share product');
      }
    }
  };


  const sampleReviews: any[] = [];


  // Review functions
  const handleWriteReview = () => {
    if (!isLoggedIn) {
      console.log('Redirecting to login...');
      router.push('/auth/login');
      return;
    }
    setShowReviewForm(true);
  };

  const handleSubmitReview = () => {
    if (!reviewText.trim() || reviewRating === 0) {
      console.warn('Please provide both a rating and review text');
      return;
    }

    setShowReviewForm(false);
    setReviewRating(0);
    setReviewText('');
  };

  const handleLoginPrompt = () => {
    router.push('/auth/login');
  };

  // Show skeleton loader while loading
  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb Skeleton */}
          <div className="mb-6 flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery Skeleton */}
            <div className="space-y-4">
              <div className="relative bg-gray-200 rounded-2xl aspect-square animate-pulse" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>

            {/* Product Details Skeleton */}
            <div className="space-y-6">
              {/* Title */}
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Price */}
              <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />

              {/* Stock Status */}
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />

              {/* Quantity */}
              <div>
                <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-12 w-40 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <div className="h-14 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-14 bg-gray-200 rounded-full animate-pulse" />
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb 
          showBackButton={true}
          items={[
            { label: product?.category || '' },
            { label: product?.name || '', isCurrentPage: true }
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductImageGallery
            currentImage={currentImage || product?.image || ''}
            images={product?.images || []}
            productName={product?.name || ''}
            productId={product?.id || ''}
            isInWishlist={isInWishlist(product?.id || '')}
            onWishlistToggle={handleWishlistToggle}
            onShare={handleShare}
          />

          <div className="space-y-6">
            <ProductDetails 
              product={product}
              currentPrice={currentPrice || product?.price || 0}
              currentLocations={currentLocations}
            />

            {product?.variants && (
              <VariantSelector
                variants={product.variants}
                selectedVariants={selectedVariants}
                onVariantChange={handleVariantChange}
              />
            )}

            <AddToCartSection
              quantity={quantity}
              setQuantity={setQuantity}
              currentStock={currentStock || product?.stockCount || 0}
              inStock={product?.inStock && (currentStock || product?.stockCount || 0) > 0}
              isInWishlist={isInWishlist(product?.id || '')}
              onAddToCart={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
            />

            <ProductFeatures features={product?.features || []} />

            <TrustBadges />
          </div>
        </div>

        {(isLoadingProduct || apiProduct?.bookDetails) && (
          <BookDetails 
            bookDetails={apiProduct?.bookDetails as any || {}} 
            isLoading={isLoadingProduct}
          />
        )}

        <ReviewsSection
          product={product}
          reviews={sampleReviews}
          isLoggedIn={isLoggedIn}
          onWriteReview={handleWriteReview}
          onLoginPrompt={handleLoginPrompt}
        />

        <ReviewForm
          isOpen={showReviewForm}
          onClose={() => setShowReviewForm(false)}
          reviewRating={reviewRating}
          setReviewRating={setReviewRating}
          reviewText={reviewText}
          setReviewText={setReviewText}
          onSubmit={handleSubmitReview}
        />
      </div>

      
    </div>
  );
}
