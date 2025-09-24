"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Shield, Truck, RotateCcw, Share2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Breadcrumb } from '../../../components';

// Type definitions for variants
interface VariantOption {
  name: string;
  value: string;
  image?: string;
  price?: number;
  stock: number;
}

interface ProductVariants {
  colors?: VariantOption[];
  sizes?: VariantOption[];
  storage?: VariantOption[];
  bands?: VariantOption[];
  [key: string]: VariantOption[] | undefined;
}
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Toast from '../../../components/Toast';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';

// Sample product data with variants - in a real app, this would come from an API
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
    variants: {
      colors: [
        { name: 'Midnight Black', value: 'black', image: '🎧', price: 1299.99, stock: 15 },
        { name: 'Space Gray', value: 'gray', image: '🎤', price: 1299.99, stock: 8 },
        { name: 'Rose Gold', value: 'rose', image: '🎵', price: 1399.99, stock: 5 },
        { name: 'Silver', value: 'silver', image: '🔊', price: 1299.99, stock: 12 }
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
    variants: {
      colors: [
        { name: 'Classic White', value: 'white', image: '👕', price: 299.99, stock: 20 },
        { name: 'Jet Black', value: 'black', image: '🖤', price: 299.99, stock: 15 },
        { name: 'Navy Blue', value: 'navy', image: '💙', price: 299.99, stock: 12 },
        { name: 'Forest Green', value: 'green', image: '💚', price: 299.99, stock: 8 }
      ],
      sizes: [
        { name: 'XS', value: 'xs', stock: 5 },
        { name: 'S', value: 's', stock: 15 },
        { name: 'M', value: 'm', stock: 20 },
        { name: 'L', value: 'l', stock: 18 },
        { name: 'XL', value: 'xl', stock: 12 },
        { name: 'XXL', value: 'xxl', stock: 6 }
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
    variants: {
      colors: [
        { name: 'Cosmic Black', value: 'black', image: '📱', price: 9999.99, stock: 8 },
        { name: 'Starlight', value: 'white', image: '🤍', price: 9999.99, stock: 5 },
        { name: 'Deep Purple', value: 'purple', image: '💜', price: 9999.99, stock: 3 },
        { name: 'Gold', value: 'gold', image: '💛', price: 10199.99, stock: 2 }
      ],
      storage: [
        { name: '128GB', value: '128gb', price: 9999.99, stock: 10 },
        { name: '256GB', value: '256gb', price: 11499.99, stock: 8 },
        { name: '512GB', value: '512gb', price: 13999.99, stock: 4 },
        { name: '1TB', value: '1tb', price: 16499.99, stock: 2 }
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
    variants: {
      colors: [
        { name: 'Midnight', value: 'black', image: '⌚', price: 3499.99, stock: 15 },
        { name: 'Silver', value: 'silver', image: '⚪', price: 3499.99, stock: 12 },
        { name: 'Gold', value: 'gold', image: '🟡', price: 3799.99, stock: 8 },
        { name: 'Red', value: 'red', image: '🔴', price: 3499.99, stock: 6 }
      ],
      bands: [
        { name: 'Sport Band', value: 'sport', image: '⌚', price: 0, stock: 20 },
        { name: 'Leather Loop', value: 'leather', image: '🤎', price: 299.99, stock: 15 },
        { name: 'Milanese Loop', value: 'milanese', image: '⚙️', price: 399.99, stock: 10 },
        { name: 'Link Bracelet', value: 'link', image: '🔗', price: 699.99, stock: 5 }
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
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Variant state management
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [currentImage, setCurrentImage] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentStock, setCurrentStock] = useState(0);

  const product = products.find(p => p.id === params.id);

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
    } else if (product) {
      setCurrentImage(product.image);
      setCurrentPrice(product.price);
      setCurrentStock(product.stockCount);
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
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
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
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const availableStock = currentStock || product.stockCount;
    if (availableStock === 0) {
      setToast({
        message: 'This variant is currently out of stock',
        type: 'error'
      });
      return;
    }

    if (quantity > availableStock) {
      setToast({ message: `Only ${availableStock} items in stock!`, type: 'error' });
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
      });
    }
    
    setToast({
      message: `${quantity} ${variantName}${quantity > 1 ? 's' : ''} added to cart!`,
      type: 'success'
    });
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setToast({
        message: `${product.name} removed from wishlist`,
        type: 'info'
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: currentPrice || product.price,
        originalPrice: product.originalPrice,
        image: currentImage || product.image,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
        inStock: (currentStock || product.stockCount) > 0,
      });
      setToast({
        message: `${product.name} added to wishlist!`,
        type: 'success'
      });
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
        setToast({
          message: 'Product link copied to clipboard!',
          type: 'success'
        });
      }
    } catch (err) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setToast({
          message: 'Product link copied to clipboard!',
          type: 'success'
        });
      } catch (clipboardErr) {
        setToast({
          message: 'Unable to share product',
          type: 'error'
        });
      }
    }
  };

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Review states
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In a real app, this would come from auth context

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && product.images && selectedImageIndex < product.images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
    if (isRightSwipe && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // Review functions
  const handleWriteReview = () => {
    if (!isLoggedIn) {
      setToast({
        message: 'Redirecting to login...',
        type: 'info'
      });
      // Navigate to login page using Next.js router
      router.push('/auth/login');
      return;
    }
    setShowReviewForm(true);
  };

  const handleSubmitReview = () => {
    if (!reviewText.trim() || reviewRating === 0) {
      setToast({
        message: 'Please provide both a rating and review text',
        type: 'error'
      });
      return;
    }

    // In a real app, this would submit to an API
    setToast({
      message: 'Thank you for your review! It will be published after moderation.',
      type: 'success'
    });

    // Reset form
    setShowReviewForm(false);
    setReviewRating(0);
    setReviewText('');
  };

  const handleLoginPrompt = () => {
    router.push('/auth/login');
  };

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
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
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div 
              className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-square flex items-center justify-center group touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <span className="text-8xl lg:text-9xl">{currentImage || product.image}</span>
              
              {/* Image Navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <ChevronLeft className="h-6 w-6 text-[#4A4A4A]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <ChevronRight className="h-6 w-6 text-[#4A4A4A]" />
                  </button>
                </>
              )}

              {/* Wishlist Button */}
                    <button
                      onClick={handleWishlistToggle}
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                    >
                      <Heart className={`h-6 w-6 transition-colors ${
                        isInWishlist(product.id) 
                          ? 'fill-[#C8102E] text-[#C8102E]' 
                          : 'text-[#4A4A4A] hover:text-[#C8102E]'
                      }`} />
                    </button>

              {/* Share Button */}
              <button 
                onClick={handleShare}
                className="absolute top-4 left-4 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                title="Share product"
              >
                <Share2 className="h-6 w-6 text-[#4A4A4A]" />
              </button>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-2xl transition-all ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-[#C8102E] scale-105' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {img}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#000000] mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-[#4A4A4A]">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <p className="text-[#4A4A4A] leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-[#C8102E] break-words">
                R{(currentPrice || product.price).toFixed(2)}
              </span>
              <div className="flex items-center gap-2 sm:gap-4">
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-[#4A4A4A] line-through">
                    R{product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-[#C8102E] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                    Save R{(product.originalPrice - (currentPrice || product.price)).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-6">
                {Object.entries(product.variants).map(([variantType, options]) => (
                  <div key={variantType} className="space-y-3">
                    <h3 className="text-lg font-semibold text-[#000000] capitalize">
                      {variantType === 'colors' ? 'Colour' : 
                       variantType === 'sizes' ? 'Size' : 
                       variantType === 'storage' ? 'Storage' :
                       variantType === 'bands' ? 'Band' : variantType}
                    </h3>
                    
                    {variantType === 'colors' ? (
                      // Color swatches
                      <div className="flex flex-wrap gap-3">
                        {options.map((option: VariantOption) => (
                          <button
                            key={option.value}
                            onClick={() => handleVariantChange(variantType, option.value)}
                            className={`group relative flex flex-col items-center justify-between p-3 rounded-xl border-2 transition-all w-24 h-24 ${
                              selectedVariants[variantType] === option.value
                                ? 'border-[#C8102E] bg-[#F6E2E0]'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xl">
                              {option.image}
                            </div>
                            <span className="text-xs font-medium text-[#000000] text-center leading-tight">{option.name}</span>
                            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                              selectedVariants[variantType] === option.value ? 'bg-[#C8102E]' : 'bg-transparent'
                            } flex items-center justify-center`}>
                              {selectedVariants[variantType] === option.value && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      // Regular buttons for sizes, storage, etc.
                      <div className="flex flex-wrap gap-3">
                        {options.map((option: VariantOption) => (
                          <button
                            key={option.value}
                            onClick={() => handleVariantChange(variantType, option.value)}
                            disabled={option.stock === 0}
                            className={`flex flex-col items-center justify-center min-w-[4rem] h-12 px-3 py-2 rounded-lg border-2 font-medium transition-all ${
                              selectedVariants[variantType] === option.value
                                ? 'border-[#C8102E] bg-[#C8102E] text-white'
                                : option.stock === 0
                                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'border-gray-200 text-[#000000] hover:border-[#C8102E] hover:text-[#C8102E]'
                            }`}
                          >
                            <span className="text-sm truncate">{option.name}</span>
                            {option.price !== undefined && option.price > 0 && (
                              <span className="text-xs whitespace-nowrap">
                                +R{option.price.toFixed(2)}
                              </span>
                            )}
                            {option.stock === 0 && (
                              <span className="text-xs">Out of Stock</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${(currentStock || product.stockCount) > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-medium ${(currentStock || product.stockCount) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(currentStock || product.stockCount) > 0 ? `In Stock (${currentStock || product.stockCount} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Selected Variant Summary */}
            {Object.keys(selectedVariants).length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-[#000000] mb-2">Selected Configuration:</h4>
                <div className="space-y-1">
                  {Object.entries(selectedVariants).map(([type, value]) => {
                    const variants = product.variants as ProductVariants | undefined;
                    const typeOptions = variants?.[type];
                    const option = typeOptions?.find(opt => opt.value === value);
                    return (
                      <div key={type} className="flex justify-between text-sm">
                        <span className="text-[#4A4A4A] capitalize">{type}:</span>
                        <span className="text-[#000000] font-medium">{option?.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="font-medium text-[#000000]">Quantity:</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-500 bg-white flex items-center justify-center hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!product.inStock}
                >
                  <Minus className="h-5 w-5 text-[#000000] font-bold" />
                </button>
                <span className="w-12 text-center font-semibold text-lg text-[#000000]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-500 bg-white flex items-center justify-center hover:border-[#C8102E] hover:bg-[#C8102E] hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!product.inStock || quantity >= product.stockCount}
                >
                  <Plus className="h-5 w-5 text-[#000000] font-bold" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-3 transition-all duration-300 ${
                  product.inStock
                    ? 'bg-[#C8102E] text-white hover:bg-[#A00E26] transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="h-6 w-6" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>

              <button
                onClick={handleWishlistToggle}
                className={`w-full py-3 rounded-full border-2 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isInWishlist(product.id)
                    ? 'border-pink-500 bg-pink-500 text-white hover:bg-pink-600 hover:border-pink-600'
                    : 'border-gray-300 text-gray-600 hover:border-pink-500 hover:text-pink-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                <span>{isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-[#000000] mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-[#4A4A4A]">
                    <div className="w-2 h-2 bg-[#C8102E] rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-[#C8102E] flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm text-[#000000]">Secure Payment</div>
                    <div className="text-xs text-[#4A4A4A]">100% Protected</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-6 w-6 text-[#C8102E] flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm text-[#000000]">Free Delivery</div>
                    <div className="text-xs text-[#4A4A4A]">Orders over R99</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <RotateCcw className="h-6 w-6 text-[#C8102E] flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm text-[#000000]">Easy Returns</div>
                    <div className="text-xs text-[#4A4A4A]">30-day policy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Reviews Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Customer Reviews</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-lg font-semibold text-[#000000] ml-2">{product.rating}</span>
                  </div>
                  <span className="text-[#4A4A4A]">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0">
                {isLoggedIn ? (
                  <button
                    onClick={handleWriteReview}
                    className="bg-[#C8102E] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors"
                  >
                    Write a Review
                  </button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-[#4A4A4A] mb-2">Want to write a review?</p>
                    <button
                      onClick={handleLoginPrompt}
                      className="bg-[#4A4A4A] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#333333] transition-colors"
                    >
                      Sign In to Review
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Review Form Modal */}
            {showReviewForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-[#000000]">Write a Review</h3>
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="h-5 w-5 text-[#4A4A4A]" />
                      </button>
                    </div>

                    {/* Rating Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-[#000000] mb-3">Your Rating</label>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setReviewRating(i + 1)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star 
                              className={`h-8 w-8 ${
                                i < reviewRating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300 hover:text-yellow-400'
                              }`} 
                            />
                          </button>
                        ))}
                        <span className="ml-3 text-sm text-[#4A4A4A]">
                          {reviewRating > 0 && `${reviewRating} star${reviewRating !== 1 ? 's' : ''}`}
                        </span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-[#000000] mb-3">Your Review</label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience with this product..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent resize-none"
                        rows={5}
                      />
                      <div className="text-right text-sm text-[#4A4A4A] mt-1">
                        {reviewText.length}/500
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="flex-1 py-3 border-2 border-gray-300 text-gray-600 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmitReview}
                        disabled={reviewRating === 0 || !reviewText.trim()}
                        className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                          reviewRating === 0 || !reviewText.trim()
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
                        }`}
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rating Breakdown */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-[#000000] mb-4">Rating Breakdown</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = sampleReviews.filter(r => r.rating === rating).length;
                  const percentage = (count / sampleReviews.length) * 100;
                  return (
                    <div key={rating} className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-[#000000] w-8">{rating}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#4A4A4A] w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {sampleReviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-semibold">
                        {review.userName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-[#000000]">{review.userName}</span>
                          {review.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-[#4A4A4A]">
                            {new Date(review.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-[#000000] mb-2">{review.title}</h4>
                    <p className="text-[#4A4A4A] leading-relaxed">{review.comment}</p>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-[#4A4A4A] hover:text-[#C8102E] transition-colors">
                      <span className="text-sm">👍</span>
                      <span className="text-sm">Helpful ({review.helpful})</span>
                    </button>
                    <button className="text-sm text-[#4A4A4A] hover:text-[#C8102E] transition-colors">
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Reviews */}
            <div className="text-center mt-8">
              <button className="bg-gray-100 text-[#4A4A4A] px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
