"use client";

import { create } from "zustand";
import { getApolloClient } from "../lib/apollo/client";
import { 
  DASHBOARD_UPDATE_PROFILE, 
  DASHBOARD_UPDATE_PASSWORD, 
  DASHBOARD_CHECK_EMAIL_EXISTS, 
  DASHBOARD_DELETE_ACCOUNT 
} from "../lib/api/dashboard";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

interface UserSettingsState {
  profileData: UserProfile;
  passwordData: PasswordData;
  isUpdatingProfile: boolean;
  isUpdatingPassword: boolean;
  isDeletingAccount: boolean;
  validationErrors: ValidationErrors;
  
  // Actions
  setProfileData: (data: Partial<UserProfile>) => void;
  setPasswordData: (data: Partial<PasswordData>) => void;
  setValidationErrors: (errors: ValidationErrors) => void;
  clearValidationErrors: () => void;
  clearPasswordData: () => void;
  
  // GraphQL operations
  updateProfile: (data: UserProfile) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (data: PasswordData) => Promise<{ success: boolean; error?: string }>;
  checkEmailExists: (email: string) => Promise<boolean>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  
  // Validation
  validateProfile: (data: UserProfile) => ValidationErrors;
  validatePassword: (data: PasswordData) => ValidationErrors;
}

export const useUserSettingsStore = create<UserSettingsState>((set, get) => ({
  profileData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: ''
  },
  passwordData: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  },
  isUpdatingProfile: false,
  isUpdatingPassword: false,
  isDeletingAccount: false,
  validationErrors: {},

  setProfileData: (data) => set((state) => ({
    profileData: { ...state.profileData, ...data }
  })),

  setPasswordData: (data) => set((state) => ({
    passwordData: { ...state.passwordData, ...data }
  })),

  setValidationErrors: (errors) => set({ validationErrors: errors }),

  clearValidationErrors: () => set({ validationErrors: {} }),

  clearPasswordData: () => set({
    passwordData: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }),

  validateProfile: (data) => {
    const errors: ValidationErrors = {};
    
    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (data.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (data.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (data.phone && !/^\+27\s?\d{2}\s?\d{3}\s?\d{4}$/.test(data.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid South African phone number';
    }
    
    return errors;
  },

  validatePassword: (data) => {
    const errors: ValidationErrors = {};
    
    if (!data.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!data.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (data.newPassword.length < 8) {
      errors.newPassword = 'New password must be at least 8 characters';
    }
    
    if (!data.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true, validationErrors: {} });
    
    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: DASHBOARD_UPDATE_PROFILE,
        variables: {
          input: {
            first_name: data.firstName || null,
            last_name: data.lastName || null,
            email: data.email || null,
            phone: data.phone || null,
            date_of_birth: data.dateOfBirth || null
          }
        }
      });
      
      set({ isUpdatingProfile: false });
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to update profile';
      set({ isUpdatingProfile: false });
      return { success: false, error: message };
    }
  },

  updatePassword: async (data) => {
    set({ isUpdatingPassword: true, validationErrors: {} });
    
    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: DASHBOARD_UPDATE_PASSWORD,
        variables: {
          input: {
            current_password: data.currentPassword,
            new_password: data.newPassword
          }
        }
      });
      
      set({ isUpdatingPassword: false });
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to update password';
      set({ isUpdatingPassword: false });
      return { success: false, error: message };
    }
  },

  checkEmailExists: async (email) => {
    try {
      const client = getApolloClient();
      const { data } = await client.mutate({
        mutation: DASHBOARD_CHECK_EMAIL_EXISTS,
        variables: { input: { email } }
      });
      return (data as any)?.checkEmailExists || false;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  },

  deleteAccount: async () => {
    set({ isDeletingAccount: true });
    
    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: DASHBOARD_DELETE_ACCOUNT
      });
      
      set({ isDeletingAccount: false });
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to delete account';
      set({ isDeletingAccount: false });
      return { success: false, error: message };
    }
  }
}));
