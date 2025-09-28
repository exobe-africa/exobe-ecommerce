"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface UIState {
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
}

const UIContext = createContext<UIState | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        isMobileMenuOpen,
        isCartOpen,
        setMobileMenuOpen: setIsMobileMenuOpen,
        setCartOpen: setIsCartOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
