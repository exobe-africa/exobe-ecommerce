"use client";
import React, { createContext, useReducer, useContext, useEffect, useState, ReactNode } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  addedAt: string;
  description?: string;
  variants?: any;
  availableLocations?: string[];
}

interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistState };

const initialWishlistState: WishlistState = {
  items: [],
  totalItems: 0,
};

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state;
      }
      
      const newItems = [...state.items, action.payload];
      return {
        items: newItems,
        totalItems: newItems.length,
      };

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: filteredItems,
        totalItems: filteredItems.length,
      };

    case 'CLEAR_WISHLIST':
      return {
        items: [],
        totalItems: 0,
      };

    case 'LOAD_WISHLIST':
      return action.payload;

    default:
      return state;
  }
};

interface WishlistContextType {
  state: WishlistState;
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialWishlistState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedWishlist = localStorage.getItem('exobeWishlist');
      if (storedWishlist) {
        try {
          dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(storedWishlist) });
        } catch (error) {
          console.warn('Failed to load wishlist from localStorage:', error);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      localStorage.setItem('exobeWishlist', JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const addItem = (item: Omit<WishlistItem, 'addedAt'>) => {
    const wishlistItem: WishlistItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_ITEM', payload: wishlistItem });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id: string) => {
    return state.items.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ state, addItem, removeItem, clearWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Hook
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
