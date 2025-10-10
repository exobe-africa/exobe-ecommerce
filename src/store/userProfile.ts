"use client";

import { create } from "zustand";
import { getApolloClient } from "../lib/apollo/client";
import { DASHBOARD_ME } from "../lib/api/dashboard";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  joinDate: string;
  avatar?: string | null;
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints: number;
}

interface UserProfileState {
  profile: UserProfile | null;
  
  isLoading: boolean;
  error: string | null;
  
  setProfile: (profile: UserProfile | null) => void;
  setError: (error: string | null) => void;
  
  fetchProfile: () => Promise<{ success: boolean; error?: string }>;
}

export const useUserProfileStore = create<UserProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  setProfile: (profile) => set({ profile }),

  setError: (error) => set({ error }),

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const client = getApolloClient();
      const { data } = await client.query({
        query: DASHBOARD_ME,
        fetchPolicy: 'network-only'
      });
      
      const me = (data as any)?.me;
      if (!me) {
        set({ isLoading: false, error: 'User profile not found' });
        return { success: false, error: 'User profile not found' };
      }

      const profile: UserProfile = {
        id: me.id,
        name: me.name || `${me.firstName ?? ''} ${me.lastName ?? ''}`.trim() || (me.email ?? ''),
        email: me.email ?? '',
        firstName: me.firstName,
        lastName: me.lastName,
        phone: me.phone,
        dateOfBirth: me.dateOfBirth,
        joinDate: me.created_at || new Date().toISOString(),
        avatar: me.avatar,
        totalOrders: me.totalOrders || 0,
        totalSpent: me.totalSpent || 0,
        loyaltyPoints: me.loyaltyPoints || 0,
      };
      
      set({ profile, isLoading: false });
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to fetch user profile';
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  }
}));
