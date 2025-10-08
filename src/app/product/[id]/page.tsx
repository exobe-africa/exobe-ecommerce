"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Breadcrumb } from '../../../components/common';
import {
  ProductImageGallery,
  ProductDetails,
  VariantSelector,
  AddToCartSection,
  ProductFeatures,
  TrustBadges,
  ReviewsSection,
  ReviewForm
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

const products = [
  { 
    id: '1', 
    name: 'Premium Headphones', 
    price: 1299.99, 
    originalPrice: 1599.99, 
    image: '🎧', 
    category: 'Electronics', 
    description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding.',
    features: ['Active Noise Cancellation', '30-hour battery life', 'Premium comfort padding', 'Bluetooth 5.0', 'Fast charging'],
    images: ['🎧', '🎤', '🎵', '🔊'],
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviews: 124,
    availableLocations: ['Johannesburg', 'Cape Town', 'Durban'],
    variants: {
      colors: [
        { name: 'Midnight Black', value: 'black', image: '🎧', price: 1299.99, stock: 15, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
        { name: 'Space Gray', value: 'gray', image: '🎤', price: 1299.99, stock: 8, availableLocations: ['Johannesburg', 'Cape Town'] },
        { name: 'Rose Gold', value: 'rose', image: '🎵', price: 1399.99, stock: 5, availableLocations: ['Cape Town', 'Durban'] },
        { name: 'Silver', value: 'silver', image: '🔊', price: 1299.99, stock: 12, availableLocations: ['Johannesburg', 'Durban', 'Pretoria'] }
      ]
    }
  },
  { 
    id: '2', 
    name: 'Cotton T-Shirt', 
    price: 299.99, 
    originalPrice: 399.99, 
    image: '👕', 
    category: 'Fashion',
    description: 'Premium 100% organic cotton t-shirt with a comfortable fit. Perfect for everyday wear with a stylish design that never goes out of fashion.',
    features: ['100% Organic Cotton', 'Comfortable fit', 'Machine washable', 'Available in multiple colors', 'Durable construction'],
    images: ['👕', '🖤', '💙', '💚'],
    inStock: true,
    stockCount: 8,
    rating: 4.6,
    reviews: 89,
    availableLocations: ['Johannesburg', 'Cape Town'],
    variants: {
      colors: [
        { name: 'Classic White', value: 'white', image: '👕', price: 299.99, stock: 20, availableLocations: ['Johannesburg', 'Cape Town'] },
        { name: 'Jet Black', value: 'black', image: '🖤', price: 299.99, stock: 15, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
        { name: 'Navy Blue', value: 'navy', image: '💙', price: 299.99, stock: 12, availableLocations: ['Cape Town', 'Durban'] },
        { name: 'Forest Green', value: 'green', image: '💚', price: 299.99, stock: 8, availableLocations: ['Johannesburg', 'Durban'] }
      ],
      sizes: [
        { name: 'XS', value: 'xs', stock: 5, availableLocations: ['Cape Town'] },
        { name: 'S', value: 's', stock: 15, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
        { name: 'M', value: 'm', stock: 20, availableLocations: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'] },
        { name: 'L', value: 'l', stock: 18, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
        { name: 'XL', value: 'xl', stock: 12, availableLocations: ['Johannesburg', 'Durban'] },
        { name: 'XXL', value: 'xxl', stock: 6, availableLocations: ['Cape Town', 'Pretoria'] }
      ]
    }
  },
  { 
    id: '3', 
    name: 'Smartphone', 
    price: 9999.99, 
    originalPrice: 11999.99, 
    image: '📱', 
    category: 'Electronics',
    description: 'Latest flagship smartphone with cutting-edge technology, professional camera system, and all-day battery life.',
    features: ['6.7" OLED Display', '128GB Storage', 'Triple Camera System', '5G Connectivity', 'Wireless Charging'],
    images: ['📱', '📸', '🔋', '💾'],
    inStock: true,
    stockCount: 5,
    rating: 4.9,
    reviews: 256,
    availableLocations: ['Johannesburg', 'Durban'],
    variants: {
      colors: [
        { name: 'Cosmic Black', value: 'black', image: '📱', price: 9999.99, stock: 8, availableLocations: ['Johannesburg', 'Durban'] },
        { name: 'Starlight', value: 'white', image: '🤍', price: 9999.99, stock: 5, availableLocations: ['Johannesburg', 'Cape Town'] },
        { name: 'Deep Purple', value: 'purple', image: '💜', price: 9999.99, stock: 3, availableLocations: ['Cape Town', 'Durban'] },
        { name: 'Gold', value: 'gold', image: '💛', price: 10199.99, stock: 2, availableLocations: ['Johannesburg', 'Pretoria'] }
      ],
      storage: [
        { name: '128GB', value: '128gb', price: 9999.99, stock: 10, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
        { name: '256GB', value: '256gb', price: 11499.99, stock: 8, availableLocations: ['Johannesburg', 'Durban'] },
        { name: '512GB', value: '512gb', price: 13999.99, stock: 4, availableLocations: ['Cape Town', 'Durban', 'Pretoria'] },
        { name: '1TB', value: '1tb', price: 16499.99, stock: 2, availableLocations: ['Johannesburg', 'Pretoria'] }
      ]
    }
  },
  { 
    id: '4', 
    name: 'Smart Watch', 
    price: 3499.99, 
    originalPrice: 4199.99, 
    image: '⌚', 
    category: 'Electronics',
    description: 'Advanced smartwatch with health monitoring, GPS tracking, and seamless smartphone integration.',
    features: ['Health Monitoring', 'GPS Tracking', '7-day battery life', 'Water resistant', 'Multiple sport modes'],
    images: ['⌚', '💓', '🏃', '📊'],
    inStock: true,
    stockCount: 12,
    rating: 4.7,
    reviews: 178,
    availableLocations: ['Cape Town', 'Durban', 'Pretoria'],
    variants: {
      colors: [
        { name: 'Midnight', value: 'black', image: '⌚', price: 3499.99, stock: 15, availableLocations: ['Cape Town', 'Durban', 'Pretoria'] },
        { name: 'Silver', value: 'silver', image: '⚪', price: 3499.99, stock: 12, availableLocations: ['Johannesburg', 'Cape Town', 'Durban'] },
        { name: 'Gold', value: 'gold', image: '🟡', price: 3799.99, stock: 8, availableLocations: ['Johannesburg', 'Pretoria'] },
        { name: 'Red', value: 'red', image: '🔴', price: 3499.99, stock: 6, availableLocations: ['Cape Town', 'Durban'] }
      ],
      bands: [
        { name: 'Sport Band', value: 'sport', image: '⌚', price: 0, stock: 20, availableLocations: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria'] },
        { name: 'Leather Loop', value: 'leather', image: '🤎', price: 299.99, stock: 15, availableLocations: ['Johannesburg', 'Cape Town'] },
        { name: 'Milanese Loop', value: 'milanese', image: '⚙️', price: 399.99, stock: 10, availableLocations: ['Cape Town', 'Durban', 'Pretoria'] },
        { name: 'Link Bracelet', value: 'link', image: '🔗', price: 699.99, stock: 5, availableLocations: ['Johannesburg', 'Durban'] }
      ]
    }
  },
  { id: '5', name: 'Wireless Speaker', price: 1499.99, originalPrice: 1999.99, image: '🔊', category: 'Electronics',
    description: 'Portable wireless speaker with 360-degree sound, waterproof design, and 20-hour battery life.',
    features: ['360-degree sound', 'Waterproof IPX7', '20-hour battery', 'Bluetooth 5.0', 'Voice assistant'],
    images: ['🔊', '🎵', '💧', '🔋'],
    inStock: true,
    stockCount: 20,
    rating: 4.5,
    reviews: 95
  },
  { id: '6', name: 'Designer Jacket', price: 2499.99, originalPrice: 3299.99, image: '🧥', category: 'Fashion',
    description: 'Stylish designer jacket made from premium materials. Perfect for both casual and formal occasions.',
    features: ['Premium materials', 'Water resistant', 'Multiple pockets', 'Tailored fit', 'Easy care'],
    images: ['🧥', '✨', '🌧️', '👔'],
    inStock: true,
    stockCount: 6,
    rating: 4.8,
    reviews: 67
  },
  { id: '7', name: 'Gaming Mouse', price: 799.99, originalPrice: 999.99, image: '🖱️', category: 'Electronics',
    description: 'High-precision gaming mouse with customizable RGB lighting, programmable buttons, and ergonomic design.',
    features: ['16000 DPI sensor', 'RGB lighting', 'Programmable buttons', 'Ergonomic design', 'Gaming software'],
    images: ['🖱️', '🎮', '🌈', '⚡'],
    inStock: true,
    stockCount: 25,
    rating: 4.7,
    reviews: 143
  },
  { id: '8', name: 'Running Shoes', price: 1999.99, originalPrice: 2499.99, image: '👟', category: 'Sports',
    description: 'Professional running shoes with advanced cushioning, breathable design, and superior grip for all terrains.',
    features: ['Advanced cushioning', 'Breathable mesh', 'Superior grip', 'Lightweight design', 'Durable construction'],
    images: ['👟', '🏃', '💨', '🏔️'],
    inStock: false,
    stockCount: 0,
    rating: 4.6,
    reviews: 201
  },
];

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

  const product = products.find(p => p.id === params.id);

  // Function to calculate current available locations based on selected variants
  const calculateCurrentLocations = (variants: Record<string, string>) => {
    if (!product?.variants) return product?.availableLocations || [];
    
    const selectedOptions: VariantOption[] = [];
    
    // Get all selected variant options
    Object.entries(variants).forEach(([variantType, selectedValue]) => {
      const variantOptions = product.variants[variantType as keyof typeof product.variants];
      if (variantOptions) {
        const selectedOption = variantOptions.find(option => option.value === selectedValue);
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

  // Initialize variants and pricing
  useEffect(() => {
    if (product?.variants) {
      const initialVariants: Record<string, string> = {};
      let basePrice = product.price;
      let baseStock = product.stockCount;
      let baseImage = product.image;

      // Set default selections for each variant type
      Object.entries(product.variants).forEach(([variantType, options]) => {
        if (options && options.length > 0) {
          initialVariants[variantType] = options[0].value;
          // Update image if this variant has one
          if (options[0].image) {
            baseImage = options[0].image;
          }
          // Update price if this variant affects it
          if (options[0].price !== undefined) {
            basePrice = options[0].price;
          }
          // Update stock if this variant has specific stock
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
    } else if (product) {
      setCurrentImage(product.image);
      setCurrentPrice(product.price);
      setCurrentStock(product.stockCount);
      setCurrentLocations(product.availableLocations || []);
    }
  }, [product]);

  // Handle variant selection
  const handleVariantChange = (variantType: string, value: string) => {
    const newVariants = { ...selectedVariants, [variantType]: value };
    setSelectedVariants(newVariants);

    // Find the selected variant option
    const variants = product?.variants as ProductVariants | undefined;
    const variantOptions = variants?.[variantType];
    const variantOption = variantOptions?.find(option => option.value === value);
    
    if (variantOption) {
      // Update image if variant has one
      if (variantOption.image) {
        setCurrentImage(variantOption.image);
      }
      
      // Calculate new price based on all selected variants
      let newPrice = product?.price || 0;
      Object.entries(newVariants).forEach(([type, val]) => {
        const variants = product?.variants as ProductVariants | undefined;
        const typeOptions = variants?.[type];
        const option = typeOptions?.find(opt => opt.value === val);
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

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-[#000000] mb-4">Product Not Found</h1>
          <p className="text-[#4A4A4A] mb-8">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors"
          >
            Go Back
          </button>
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
        const typeOptions = variants?.[type];
        const option = typeOptions?.find(opt => opt.value === value);
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

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
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
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        console.log('Product link copied to clipboard!');
      }
    } catch (err) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        console.log('Product link copied to clipboard!');
      } catch (clipboardErr) {
        console.error('Unable to share product');
      }
    }
  };


  // Sample reviews data - in a real app, this would come from an API
  const sampleReviews = [
    {
      id: 1,
      userName: "Sarah M.",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent product!",
      comment: "This product exceeded my expectations. The quality is outstanding and delivery was fast. Highly recommended!",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      userName: "James K.",
      rating: 4,
      date: "2024-01-10",
      title: "Good value for money",
      comment: "Great product overall. The build quality is solid and it works exactly as described. Only minor issue is the packaging could be better.",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      userName: "Emily R.",
      rating: 5,
      date: "2024-01-08",
      title: "Love it!",
      comment: "Perfect! Exactly what I was looking for. Fast shipping and excellent customer service.",
      verified: false,
      helpful: 5
    },
    {
      id: 4,
      userName: "Michael T.",
      rating: 3,
      date: "2024-01-05",
      title: "Decent product",
      comment: "It's okay. Does what it's supposed to do but nothing special. Price is fair for what you get.",
      verified: true,
      helpful: 3
    }
  ];


  // Review functions
  const handleWriteReview = () => {
    if (!isLoggedIn) {
      console.log('Redirecting to login...');
      // Navigate to login page using Next.js router
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

    // In a real app, this would submit to an API
    console.log('Thank you for your review! It will be published after moderation.');

    // Reset form
    setShowReviewForm(false);
    setReviewRating(0);
    setReviewText('');
  };

  const handleLoginPrompt = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <Breadcrumb 
          showBackButton={true}
          items={[
            { label: product.category },
            { label: product.name, isCurrentPage: true }
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductImageGallery
            currentImage={currentImage || product.image}
            images={product.images}
            productName={product.name}
            productId={product.id}
            isInWishlist={isInWishlist(product.id)}
            onWishlistToggle={handleWishlistToggle}
            onShare={handleShare}
          />

          <div className="space-y-6">
            <ProductDetails 
              product={product}
              currentPrice={currentPrice || product.price}
              currentLocations={currentLocations}
            />

            {product.variants && (
              <VariantSelector
                variants={product.variants}
                selectedVariants={selectedVariants}
                onVariantChange={handleVariantChange}
              />
            )}

            <AddToCartSection
              quantity={quantity}
              setQuantity={setQuantity}
              currentStock={currentStock || product.stockCount}
              inStock={product.inStock && (currentStock || product.stockCount) > 0}
              isInWishlist={isInWishlist(product.id)}
              onAddToCart={handleAddToCart}
              onWishlistToggle={handleWishlistToggle}
            />

            <ProductFeatures features={product.features} />

            <TrustBadges />
          </div>
        </div>

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
