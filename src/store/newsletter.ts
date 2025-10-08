"use client";

import { create } from "zustand";
import { getApolloClient } from "../lib/apollo/client";
import { SUBSCRIBE_TO_NEWSLETTER, UNSUBSCRIBE_FROM_NEWSLETTER } from "../lib/api/newsletter";

export interface NewsletterFormData {
  email: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface NewsletterState {
  // State
  formData: NewsletterFormData;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  validationErrors: ValidationErrors;

  // Actions
  setFormData: (data: Partial<NewsletterFormData>) => void;
  setValidationErrors: (errors: ValidationErrors) => void;
  clearValidationErrors: () => void;
  resetForm: () => void;

  // Newsletter operations
  subscribeToNewsletter: (email: string) => Promise<{ success: boolean; message?: string }>;
  unsubscribeFromNewsletter: (email: string) => Promise<{ success: boolean; message?: string }>;
  validateForm: (data: NewsletterFormData) => ValidationErrors;
}

export const useNewsletterStore = create<NewsletterState>((set, get) => ({
  // Initial state
  formData: {
    email: '',
  },
  isSubmitting: false,
  isSubmitted: false,
  error: null,
  validationErrors: {},

  // Actions
  setFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
      validationErrors: {},
      error: null,
    }));
  },

  setValidationErrors: (errors) => {
    set({ validationErrors: errors });
  },

  clearValidationErrors: () => {
    set({ validationErrors: {} });
  },

  resetForm: () => {
    set({
      formData: { email: '' },
      isSubmitting: false,
      isSubmitted: false,
      error: null,
      validationErrors: {},
    });
  },

  // Validation
  validateForm: (data) => {
    const errors: ValidationErrors = {};

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    return errors;
  },

  // Newsletter operations
  subscribeToNewsletter: async (email) => {
    set({ isSubmitting: true, error: null, validationErrors: {} });

    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: SUBSCRIBE_TO_NEWSLETTER,
        variables: {
          input: {
            email,
          },
        },
      });

      set({
        isSubmitting: false,
        isSubmitted: true,
        error: null,
        validationErrors: {},
        formData: { email: '' },
      });

      return { success: true };
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);

      let message = 'Failed to subscribe to newsletter';
      const validationErrors: ValidationErrors = {};

      if (error?.message?.includes('already subscribed')) {
        message = 'This email is already subscribed to the newsletter';
      } else if (error?.message?.includes('Invalid email')) {
        validationErrors.email = 'Please enter a valid email address';
      } else if (error?.message) {
        message = error.message;
      }

      set({
        isSubmitting: false,
        error: message,
        validationErrors,
      });

      return { success: false, message };
    }
  },

  unsubscribeFromNewsletter: async (email) => {
    set({ isSubmitting: true, error: null });

    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: UNSUBSCRIBE_FROM_NEWSLETTER,
        variables: { email },
      });

      set({
        isSubmitting: false,
        isSubmitted: true,
        error: null,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Newsletter unsubscription error:', error);

      let message = 'Failed to unsubscribe from newsletter';
      if (error?.message?.includes('not found')) {
        message = 'Email address not found in subscription list';
      } else if (error?.message) {
        message = error.message;
      }

      set({
        isSubmitting: false,
        error: message,
      });

      return { success: false, message };
    }
  },
}));
