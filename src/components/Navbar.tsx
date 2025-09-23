"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, Heart, X, HelpCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { state, toggleCart } = useCart();
  const { state: wishlistState } = useWishlist();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isMobileMenuAnimating, setIsMobileMenuAnimating] = useState(false);
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const sampleProducts = [
    { id: 1, name: "iPhone 15 Pro", category: "Electronics", price: 12999, image: "📱", brand: "Apple" },
    { id: 2, name: "Samsung Galaxy S24", category: "Electronics", price: 11999, image: "📱", brand: "Samsung" },
    { id: 3, name: "MacBook Pro M3", category: "Electronics", price: 24999, image: "💻", brand: "Apple" },
    { id: 4, name: "Nike Air Max 270", category: "Fashion", price: 2499, image: "👟", brand: "Nike" },
    { id: 5, name: "Adidas Ultraboost", category: "Fashion", price: 2299, image: "👟", brand: "Adidas" },
    { id: 6, name: "Sony WH-1000XM5", category: "Electronics", price: 4999, image: "🎧", brand: "Sony" },
    { id: 7, name: "Cotton T-Shirt", category: "Fashion", price: 299, image: "👕", brand: "eXobe" },
    { id: 8, name: "Smart Watch", category: "Electronics", price: 3999, image: "⌚", brand: "Apple" },
    { id: 9, name: "Wireless Earbuds", category: "Electronics", price: 1999, image: "🎧", brand: "Sony" },
    { id: 10, name: "Gaming Laptop", category: "Electronics", price: 18999, image: "💻", brand: "ASUS" },
  ];

  const trendingSearches = ["iPhone 15", "MacBook", "Nike shoes", "Wireless earbuds", "Smart watch"];

  // Search functionality
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      const filtered = sampleProducts.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase()) ||
        product.brand.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchFocused(false);
      setShowSearchResults(false);
    }, 200);
  };

  const handleSearchSelect = (product: any) => {
    setSearchQuery(product.name);
    setShowSearchResults(false);
    setSearchFocused(false);
    
    const newRecentSearches = [product.name, ...recentSearches.filter(s => s !== product.name)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    
    router.push(`/product/${product.id}`);
  };

  const handleTrendingSearch = (term: string) => {
    setSearchQuery(term);
    handleSearchChange(term);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setShowSearchResults(false);
      setSearchFocused(false);
      
      const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  useEffect(() => {
    if (showMobileMenu) {
      setIsMobileMenuVisible(true);
      setIsMobileMenuAnimating(true);
      const timer = setTimeout(() => {
        setIsMobileMenuAnimating(false);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsMobileMenuAnimating(true);
      const timer = setTimeout(() => {
        setIsMobileMenuVisible(false);
        setIsMobileMenuAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showMobileMenu]);

  useEffect(() => {
    const handlePopState = () => {
      if (showMobileMenu) {
        closeMobileMenu();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [showMobileMenu]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="bg-[#000000] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="hidden md:block">
              <span>Free shipping on orders over R499.00</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/help-center" className="hover:text-[#F6E2E0] transition-colors">Help Centre</Link>
              <span>|</span>
              <Link href="/sell" className="hover:text-[#F6E2E0] transition-colors">Sell on eXobe</Link>
              <span>|</span>
              <Link href="/service-providers" className="hover:text-[#F6E2E0] transition-colors">Become a Service Provider</Link>
            </div>

            <div className="flex md:hidden flex-col items-center space-y-1 text-xs w-full">
              <div className="flex items-center space-x-3">
                <Link href="/help-center" className="hover:text-[#F6E2E0] transition-colors whitespace-nowrap">Help Centre</Link>
                <span className="text-gray-400">•</span>
                <Link href="/sell" className="hover:text-[#F6E2E0] transition-colors whitespace-nowrap">Sell on eXobe</Link>
              </div>
              <Link href="/service-providers" className="hover:text-[#F6E2E0] transition-colors whitespace-nowrap">Become a Service Provider</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
            <button 
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden p-3 rounded-md hover:bg-gray-100 touch-manipulation"
            >
              <Menu className="h-6 w-6 text-[#4A4A4A]" />
            </button>

            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <Image
                  src="/eXobe Main Logo - Red & Black.png"
                  alt="eXobe"
                  width={180}
                  height={180}
                  className="h-20 w-20 sm:h-20 sm:w-20 lg:h-24 lg:w-24 object-contain bg-white rounded-lg p-1"
                  priority
                  style={{ minWidth: '40px', minHeight: '40px' }}
                />
              </a>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/categories" className="text-[#4A4A4A] hover:text-[#C8102E] font-medium transition-colors">Shop by Categories</a>
              <a href="#" className="text-[#4A4A4A] hover:text-[#C8102E] font-medium transition-colors">Deals</a>
              <a href="#" className="text-[#4A4A4A] hover:text-[#C8102E] font-medium transition-colors">Orders</a>
            </nav>

          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyDown={handleSearchSubmit}
                className={`w-full pl-4 pr-12 py-2 border rounded-full focus:outline-none transition-all duration-300 bg-white text-[#000000] placeholder-gray-600 ${
                  searchFocused 
                    ? 'border-[#C8102E] ring-2 ring-[#C8102E] ring-opacity-20 shadow-lg' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              />
              {searchQuery ? (
                <button
                  onClick={clearSearch}
                  className="absolute right-10 top-2.5 h-5 w-5 text-[#4A4A4A] hover:text-[#C8102E] transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#4A4A4A]" />
              
              {(showSearchResults || searchFocused) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-hidden">
                  <div className="p-4">
                    {searchQuery.trim() ? (
                      <>
                        {searchResults.length > 0 ? (
                          <>
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-sm font-semibold text-[#000000]">Products</h3>
                              <span className="text-xs text-[#4A4A4A]">{searchResults.length} found</span>
                            </div>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                              {searchResults.slice(0, 6).map((product) => (
                                <div
                                  key={product.id}
                                  onClick={() => handleSearchSelect(product)}
                                  className="flex items-center p-3 hover:bg-[#F6E2E0] rounded-xl cursor-pointer transition-all duration-200 group"
                                >
                                  <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                                    <span className="text-lg">{product.image}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-[#000000] truncate group-hover:text-[#C8102E] transition-colors">
                                      {product.name}
                                    </h4>
                                    <div className="flex items-center space-x-2 text-xs text-[#4A4A4A]">
                                      <span>{product.category}</span>
                                      <span>•</span>
                                      <span>{product.brand}</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-[#C8102E]">R{product.price.toFixed(2)}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Search className="h-8 w-8 text-[#4A4A4A]" />
                            </div>
                            <h3 className="font-medium text-[#000000] mb-2">No products found</h3>
                            <p className="text-sm text-[#4A4A4A]">Try searching for something else</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {recentSearches.length > 0 && (
                          <>
                            <h3 className="text-sm font-semibold text-[#000000] mb-3">Recent Searches</h3>
                            <div className="space-y-2 mb-4">
                              {recentSearches.map((search, index) => (
                                <div
                                  key={index}
                                  onClick={() => handleTrendingSearch(search)}
                                  className="flex items-center p-2 hover:bg-[#F6E2E0] rounded-lg cursor-pointer transition-colors group"
                                >
                                  <Search className="h-4 w-4 text-[#4A4A4A] mr-3" />
                                  <span className="text-[#000000] group-hover:text-[#C8102E] transition-colors">{search}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        <h3 className="text-sm font-semibold text-[#000000] mb-3">🔥 Trending</h3>
                        <div className="flex flex-wrap gap-2">
                          {trendingSearches.map((term, index) => (
                            <button
                              key={index}
                              onClick={() => handleTrendingSearch(term)}
                              className="px-3 py-2 bg-gradient-to-r from-[#F6E2E0] to-[#F0F0F0] hover:from-[#C8102E] hover:to-[#A00E26] text-[#000000] hover:text-white rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

            <div className="flex items-center space-x-2">
              <Link href="/wishlist">
                <button className="relative p-3 rounded-full hover:bg-[#F6E2E0] transition-colors touch-manipulation">
                  <Heart className="h-6 w-6 text-[#4A4A4A]" />
                  {wishlistState.totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#C8102E] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistState.totalItems > 99 ? '99+' : wishlistState.totalItems}
                    </span>
                  )}
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="p-3 rounded-full hover:bg-[#F6E2E0] transition-colors touch-manipulation">
                  <User className="h-6 w-6 text-[#4A4A4A]" />
                </button>
              </Link>
              <button 
                onClick={toggleCart}
                className="relative p-3 rounded-full hover:bg-[#F6E2E0] transition-colors touch-manipulation"
              >
                <ShoppingCart className="h-6 w-6 text-[#4A4A4A]" />
                {state.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8102E] text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
                    {state.totalItems > 99 ? '99+' : state.totalItems}
                  </span>
                )}
              </button>
            </div>
        </div>
      </div>

      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onKeyDown={handleSearchSubmit}
            className={`w-full pl-4 pr-12 py-3 text-base border rounded-full focus:outline-none transition-all duration-300 touch-manipulation bg-white text-[#000000] placeholder-gray-600 ${
              searchFocused 
                ? 'border-[#C8102E] ring-2 ring-[#C8102E] ring-opacity-20 shadow-lg' 
                : 'border-gray-300'
            }`}
          />
          {searchQuery ? (
            <button
              onClick={clearSearch}
              className="absolute right-12 top-3.5 h-5 w-5 text-[#4A4A4A] hover:text-[#C8102E] transition-colors touch-manipulation"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          <Search className="absolute right-4 top-3.5 h-5 w-5 text-[#4A4A4A]" />
          
          {(showSearchResults || searchFocused) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-80 overflow-hidden">
              <div className="p-4">
                {searchQuery.trim() ? (
                  <>
                    {searchResults.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-[#000000]">Products</h3>
                          <span className="text-xs text-[#4A4A4A]">{searchResults.length} found</span>
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {searchResults.slice(0, 5).map((product) => (
                            <div
                              key={product.id}
                              onClick={() => handleSearchSelect(product)}
                              className="flex items-center p-3 hover:bg-[#F6E2E0] rounded-xl cursor-pointer transition-all duration-200 group touch-manipulation"
                            >
                              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                                <span className="text-xl">{product.image}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-[#000000] truncate group-hover:text-[#C8102E] transition-colors text-sm">
                                  {product.name}
                                </h4>
                                <div className="flex items-center space-x-2 text-xs text-[#4A4A4A]">
                                  <span>{product.category}</span>
                                  <span>•</span>
                                  <span>{product.brand}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-[#C8102E] text-sm">R{product.price.toFixed(2)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Search className="h-6 w-6 text-[#4A4A4A]" />
                        </div>
                        <h3 className="font-medium text-[#000000] mb-1 text-sm">No products found</h3>
                        <p className="text-xs text-[#4A4A4A]">Try searching for something else</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {recentSearches.length > 0 && (
                      <>
                        <h3 className="text-sm font-semibold text-[#000000] mb-3">Recent Searches</h3>
                        <div className="space-y-2 mb-4">
                          {recentSearches.slice(0, 3).map((search, index) => (
                            <div
                              key={index}
                              onClick={() => handleTrendingSearch(search)}
                              className="flex items-center p-2 hover:bg-[#F6E2E0] rounded-lg cursor-pointer transition-colors group touch-manipulation"
                            >
                              <Search className="h-4 w-4 text-[#4A4A4A] mr-3" />
                              <span className="text-[#000000] group-hover:text-[#C8102E] transition-colors text-sm">{search}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <h3 className="text-sm font-semibold text-[#000000] mb-3">🔥 Trending</h3>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.slice(0, 4).map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handleTrendingSearch(term)}
                          className="px-3 py-2 bg-gradient-to-r from-[#F6E2E0] to-[#F0F0F0] hover:from-[#C8102E] hover:to-[#A00E26] text-[#000000] hover:text-white rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-105 touch-manipulation"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuVisible && (
        <>
          <div 
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-all duration-300 ${
              showMobileMenu && !isMobileMenuAnimating ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMobileMenu}
          />
          <div className={`fixed top-0 left-0 w-full max-w-sm h-full bg-white z-50 lg:hidden transform transition-all duration-300 ease-in-out shadow-xl ${
            showMobileMenu && !isMobileMenuAnimating ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className={`flex items-center justify-between p-4 border-b border-gray-200 transition-all duration-300 delay-100 ${
              showMobileMenu && !isMobileMenuAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              <Link href="/" onClick={() => setShowMobileMenu(false)}>
                <Image
                  src="/eXobe Main Logo - Red & Black.png"
                  alt="eXobe"
                  width={140}
                  height={140}
                  className="h-10 w-10 object-contain bg-white rounded p-0.5"
                  style={{ minWidth: '40px', minHeight: '40px' }}
                />
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100 touch-manipulation"
              >
                <X className="h-6 w-6 text-[#4A4A4A]" />
              </button>
            </div>

            <div className={`flex flex-col h-full transition-all duration-300 delay-200 ${
              showMobileMenu && !isMobileMenuAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-2">
                  <Link
                    href="/categories"
                    onClick={closeMobileMenu}
                    className="flex items-center py-3 px-4 text-[#4A4A4A] hover:bg-[#F6E2E0] hover:text-[#C8102E] rounded-lg transition-colors touch-manipulation"
                  >
                    <span className="text-2xl mr-3">🛍️</span>
                    Shop by Categories
                  </Link>
                  <Link
                    href="/category/electronics"
                    onClick={closeMobileMenu}
                    className="flex items-center py-3 px-4 text-[#4A4A4A] hover:bg-[#F6E2E0] hover:text-[#C8102E] rounded-lg transition-colors touch-manipulation"
                  >
                    <span className="text-2xl mr-3">📱</span>
                    Electronics
                  </Link>
                  <Link
                    href="/category/fashion"
                    onClick={closeMobileMenu}
                    className="flex items-center py-3 px-4 text-[#4A4A4A] hover:bg-[#F6E2E0] hover:text-[#C8102E] rounded-lg transition-colors touch-manipulation"
                  >
                    <span className="text-2xl mr-3">👕</span>
                    Fashion
                  </Link>
                  <Link
                    href="/category/home-garden"
                    onClick={closeMobileMenu}
                    className="flex items-center py-3 px-4 text-[#4A4A4A] hover:bg-[#F6E2E0] hover:text-[#C8102E] rounded-lg transition-colors touch-manipulation"
                  >
                    <span className="text-2xl mr-3">🏠</span>
                    Home & Garden
                  </Link>
                  <Link
                    href="/category/sports"
                    onClick={closeMobileMenu}
                    className="flex items-center py-3 px-4 text-[#4A4A4A] hover:bg-[#F6E2E0] hover:text-[#C8102E] rounded-lg transition-colors touch-manipulation"
                  >
                    <span className="text-2xl mr-3">⚽</span>
                    Sports & Fitness
                  </Link>
                </div>

                <div className="my-6 px-4">
                  <div className="border-t border-gray-200"></div>
                </div>

                <div className="px-4 space-y-2">
                  <Link
                    href="/wishlist"
                    onClick={closeMobileMenu}
                    className="flex items-center py-3 px-4 text-[#4A4A4A] hover:bg-[#F6E2E0] hover:text-[#C8102E] rounded-lg transition-colors w-full touch-manipulation"
                  >
                    <Heart className="h-6 w-6 mr-3" />
                    <span className="flex-1">My Wishlist</span>
                    {wishlistState.totalItems > 0 && (
                      <span className="bg-[#C8102E] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistState.totalItems > 99 ? '99+' : wishlistState.totalItems}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center py-3 px-4 text-[#4A4A4A] hover:bg-[#F6E2E0] hover:text-[#C8102E] rounded-lg transition-colors w-full touch-manipulation"
                  >
                    <User className="h-6 w-6 mr-3" />
                    My Orders
                  </button>
                  <Link
                    href="/help-center"
                    onClick={closeMobileMenu}
                    className="flex items-center py-3 px-4 text-[#4A4A4A] hover:bg-[#F6E2E0] hover:text-[#C8102E] rounded-lg transition-colors w-full touch-manipulation"
                  >
                    <HelpCircle className="h-6 w-6 mr-3" />
                    Help & Support
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="text-center text-sm text-[#4A4A4A] space-y-1">
                  <p>Need help?</p>
                  <p className="font-medium text-[#C8102E]">+27 11 123 4567</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
