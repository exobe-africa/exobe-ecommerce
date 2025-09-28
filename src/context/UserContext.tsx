"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  avatar?: string | null;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
}

interface Address {
  id: number;
  type: string;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

interface UserContextType {
  user: User | null;
  addresses: Address[];
  isLoggedIn: boolean;
  login: (userData: User, userAddresses: Address[]) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateAddresses: (addresses: Address[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('exobeUser');
      const storedAddresses = localStorage.getItem('exobeUserAddresses');
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsLoggedIn(true);
        } catch (error) {
          console.warn('Failed to load user from localStorage:', error);
        }
      }
      
      if (storedAddresses) {
        try {
          const addressData = JSON.parse(storedAddresses);
          setAddresses(addressData);
        } catch (error) {
          console.warn('Failed to load addresses from localStorage:', error);
        }
      }
    }
  }, []);

  const login = (userData: User, userAddresses: Address[] = []) => {
    setUser(userData);
    setAddresses(userAddresses);
    setIsLoggedIn(true);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('exobeUser', JSON.stringify(userData));
      localStorage.setItem('exobeUserAddresses', JSON.stringify(userAddresses));
    }
  };

  const logout = () => {
    setUser(null);
    setAddresses([]);
    setIsLoggedIn(false);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('exobeUser');
      localStorage.removeItem('exobeUserAddresses');
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('exobeUser', JSON.stringify(updatedUser));
      }
    }
  };

  const updateAddresses = (newAddresses: Address[]) => {
    setAddresses(newAddresses);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('exobeUserAddresses', JSON.stringify(newAddresses));
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      addresses,
      isLoggedIn,
      login,
      logout,
      updateUser,
      updateAddresses
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
