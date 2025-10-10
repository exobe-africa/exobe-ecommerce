"use client";

import { create } from "zustand";
import { getApolloClient } from "../lib/apollo/client";
import { 
  DASHBOARD_ADDRESSES,
  DASHBOARD_CREATE_ADDRESS, 
  DASHBOARD_UPDATE_ADDRESS, 
  DASHBOARD_DELETE_ADDRESS 
} from "../lib/api/dashboard";

export interface Address {
  id: string;
  type: string;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export interface AddressFormData {
  type: string;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}

interface AddressesState {
  addresses: Address[];
  selectedAddress: Address | null;
  
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  validationErrors: ValidationErrors;
  
  setAddresses: (addresses: Address[]) => void;
  setSelectedAddress: (address: Address | null) => void;
  setValidationErrors: (errors: ValidationErrors) => void;
  clearValidationErrors: () => void;
  
  fetchAddresses: (userId: string) => Promise<{ success: boolean; error?: string }>;
  createAddress: (data: AddressFormData) => Promise<{ success: boolean; error?: string }>;
  updateAddress: (id: string, data: AddressFormData) => Promise<{ success: boolean; error?: string }>;
  deleteAddress: (id: string) => Promise<{ success: boolean; error?: string }>;
  
  validateAddress: (data: AddressFormData) => ValidationErrors;
}

export const useAddressesStore = create<AddressesState>((set, get) => ({
  addresses: [],
  selectedAddress: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  validationErrors: {},

  setAddresses: (addresses) => set({ addresses }),

  setSelectedAddress: (address) => set({ selectedAddress: address }),

  setValidationErrors: (errors) => set({ validationErrors: errors }),

  clearValidationErrors: () => set({ validationErrors: {} }),

  validateAddress: (data) => {
    const errors: ValidationErrors = {};
    
    if (!data.type.trim()) {
      errors.type = 'Address type is required';
    }
    
    if (!data.street.trim()) {
      errors.street = 'Street address is required';
    } else if (data.street.trim().length < 5) {
      errors.street = 'Street address must be at least 5 characters';
    }
    
    if (!data.city.trim()) {
      errors.city = 'City is required';
    } else if (data.city.trim().length < 2) {
      errors.city = 'City must be at least 2 characters';
    }
    
    if (!data.province.trim()) {
      errors.province = 'Province is required';
    }
    
    if (!data.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    } else if (!/^\d{4}$/.test(data.postalCode.trim())) {
      errors.postalCode = 'Postal code must be 4 digits';
    }
    
    return errors;
  },

  fetchAddresses: async (userId) => {
    set({ isLoading: true, validationErrors: {} });
    
    try {
      const client = getApolloClient();
      const { data } = await client.query({
        query: DASHBOARD_ADDRESSES,
        variables: { userId },
        fetchPolicy: 'network-only'
      });
      
      const rawAddresses = (data as any)?.getUserAddresses || [];
      const mappedAddresses: Address[] = rawAddresses.map((addr: any, idx: number) => ({
        id: String(addr.id),
        type: addr.type,
        name: addr.addressName || addr.type,
        street: addr.addressLine1,
        city: addr.city,
        province: addr.province || '',
        postalCode: addr.postalCode,
        isDefault: !!addr.defaultAddress
      }));
      
      set({ addresses: mappedAddresses, isLoading: false });
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to fetch addresses';
      set({ isLoading: false });
      return { success: false, error: message };
    }
  },

  createAddress: async (data) => {
    set({ isCreating: true, validationErrors: {} });
    
    try {
      const client = getApolloClient();
      const { data: result } = await client.mutate({
        mutation: DASHBOARD_CREATE_ADDRESS,
        variables: {
          input: {
            type: data.type,
            addressName: data.name,
            addressLine1: data.street,
            addressLine2: undefined,
            city: data.city,
            province: data.province,
            country: 'South Africa',
            postalCode: data.postalCode,
            defaultAddress: !!data.isDefault,
          }
        }
      });
      
      set({ isCreating: false });
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to create address';
      set({ isCreating: false });
      return { success: false, error: message };
    }
  },

  updateAddress: async (id, data) => {
    set({ isUpdating: true, validationErrors: {} });
    
    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: DASHBOARD_UPDATE_ADDRESS,
        variables: {
          id: String(id),
          input: {
            type: data.type,
            addressName: data.name,
            addressLine1: data.street,
            addressLine2: undefined,
            city: data.city,
            province: data.province,
            postalCode: data.postalCode,
            defaultAddress: !!data.isDefault,
          }
        }
      });
      
      set((state) => ({
        addresses: state.addresses.map(addr => 
          addr.id === id 
            ? { ...addr, ...data }
            : addr
        ),
        isUpdating: false
      }));
      
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to update address';
      set({ isUpdating: false });
      return { success: false, error: message };
    }
  },

  deleteAddress: async (id) => {
    set({ isDeleting: true });
    
    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: DASHBOARD_DELETE_ADDRESS,
        variables: { id: String(id) }
      });
      
      set((state) => ({
        addresses: state.addresses.filter(addr => addr.id !== id),
        isDeleting: false
      }));
      
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to delete address';
      set({ isDeleting: false });
      return { success: false, error: message };
    }
  }
}));
