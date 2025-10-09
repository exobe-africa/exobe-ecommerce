"use client";

import { create } from "zustand";
import { getApolloClient } from "../lib/apollo/client";
import { GET_MY_NOTIFICATION_SETTINGS, UPDATE_MY_NOTIFICATION_SETTINGS } from "../lib/api/notifications";

export interface NotificationSettings {
  id: string;
  order_confirmations: boolean;
  shipping_updates: boolean;
  delivery_notifications: boolean;
  product_recommendations: boolean;
  exclusive_deals: boolean;
  wishlist_updates: boolean;
  shopping_insights: boolean;
  login_alerts: boolean;
  password_changes: boolean;
}

export interface NotificationState {
  settings: NotificationSettings | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;

  fetchSettings: () => Promise<void>;
  updateSettings: (settings: Partial<NotificationSettings>) => Promise<{ success: boolean; error?: string }>;
  reset: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  settings: null,
  isLoading: false,
  isUpdating: false,
  error: null,

  fetchSettings: async () => {
    // Check if user is authenticated before making API call
    const authStore = await import('./auth');
    if (!authStore.useAuthStore.getState().isAuthenticated) {
      set({
        settings: null,
        isLoading: false,
        error: 'Please log in to view notification settings',
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const client = getApolloClient();
      const { data } = await client.query({
        query: GET_MY_NOTIFICATION_SETTINGS,
        fetchPolicy: "no-cache",
      });

      await client.clearStore();

      const settingsData = (data as any)?.myNotificationSettings;
      console.log('Fetched notification settings:', settingsData);

      set({
        settings: settingsData || null,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error('Failed to fetch notification settings:', error);
      set({
        error: error?.message || 'Failed to load notification settings',
        isLoading: false,
      });
    }
  },

  updateSettings: async (newSettings) => {
    // Check if user is authenticated before making API call
    const authStore = await import('./auth');
    if (!authStore.useAuthStore.getState().isAuthenticated) {
      return { success: false, error: 'Please log in to update notification settings' };
    }

    const { settings } = get();

    if (!settings) {
      return { success: false, error: 'No current settings found' };
    }

    set({ isUpdating: true, error: null });

    try {
      const client = getApolloClient();

      const changedFields: Record<string, boolean> = {};
      Object.keys(newSettings).forEach(key => {
        const settingKey = key as keyof NotificationSettings;
        if (newSettings[settingKey] !== settings[settingKey] && newSettings[settingKey] !== undefined) {
          changedFields[settingKey] = newSettings[settingKey] as boolean;
        }
      });

      console.log('Updating notification settings with:', changedFields);

      await client.mutate({
        mutation: UPDATE_MY_NOTIFICATION_SETTINGS,
        variables: {
          input: changedFields,
        },
        fetchPolicy: 'no-cache',
      });

      // Update local state
      set({
        settings: { ...settings, ...newSettings },
        isUpdating: false,
        error: null,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Failed to update notification settings:', error);
      set({
        error: error?.message || 'Failed to update notification settings',
        isUpdating: false,
      });

      return { success: false, error: error?.message || 'Failed to update settings' };
    }
  },

  reset: () => {
    set({
      settings: null,
      isLoading: false,
      isUpdating: false,
      error: null,
    });
  },
}));
