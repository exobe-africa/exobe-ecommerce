"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category: string;
  // Maximum available stock for this line (product or variant). When set, cart cannot exceed this amount.
  stock?: number;
  variant?: {
    size?: string;
    color?: string;
    style?: string;
    material?: string;
    [key: string]: string | undefined;
  };
  uniqueId?: string; // Generated unique ID including variant info
  availableLocations?: string[];
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string; variant?: { [key: string]: string | undefined } } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number; variant?: { [key: string]: string | undefined } } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalPrice: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Create a unique key for the item including variants
      const uniqueId = action.payload.id + '_' + JSON.stringify(action.payload.variant || {});
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        JSON.stringify(item.variant || {}) === JSON.stringify(action.payload.variant || {})
      );
      let newItems: CartItem[];

      if (existingItem) {
        newItems = state.items.map(item => {
          if (
            item.id === action.payload.id &&
            JSON.stringify(item.variant || {}) === JSON.stringify(action.payload.variant || {})
          ) {
            const max = item.stock ?? Number.POSITIVE_INFINITY;
            const nextQty = Math.min(item.quantity + 1, max);
            return { ...item, quantity: nextQty };
          }
          return item;
        });
      } else {
        const initialQty = Math.min(1, action.payload.stock ?? 1);
        if (initialQty <= 0) {
          return state; // do not add when no stock
        }
        newItems = [...state.items, { ...action.payload, quantity: initialQty, uniqueId }];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => 
        !(item.id === action.payload.id && 
          JSON.stringify(item.variant || {}) === JSON.stringify(action.payload.variant || {}))
      );
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items
        .map(item => {
          if (
            item.id === action.payload.id &&
            JSON.stringify(item.variant || {}) === JSON.stringify(action.payload.variant || {})
          ) {
            const max = item.stock ?? Number.POSITIVE_INFINITY;
            const clamped = Math.max(0, Math.min(action.payload.quantity, max));
            return { ...item, quantity: clamped };
          }
          return item;
        })
        .filter(item => item.quantity > 0);

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true,
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };

    case 'LOAD_CART': {
      const totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...state,
        items: action.payload,
        totalItems,
        totalPrice,
      };
    }

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, variant?: { [key: string]: string | undefined }) => void;
  updateQuantity: (id: string, quantity: number, variant?: { [key: string]: string | undefined }) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem('exobe-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('exobe-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    dispatch({ type: 'OPEN_CART' });
  };

  const removeItem = (id: string, variant?: { [key: string]: string | undefined }) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, variant } });
  };

  const updateQuantity = (id: string, quantity: number, variant?: { [key: string]: string | undefined }) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity, variant } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
