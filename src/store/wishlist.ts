"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getApolloClient } from "../lib/apollo/client";
import { GET_MY_WISHLIST, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../lib/api/wishlist";
import { useAuthStore } from "./auth";

export interface WishlistItem {
  id: string;
  product_id: string;
  product_variant_id?: string | null;
  created_at: string;
}

export interface WishlistData {
  id: string;
  count?: number;
  items: WishlistItem[];
}

interface WishlistState {
  wishlist: WishlistData | null;
  isLoading: boolean;
  error: string | null;

  showAuthModal: boolean;
  pendingWishlistAction: {
    type: 'add' | 'view';
    productId?: string;
    productVariantId?: string;
  } | null;
  hasTriedFetch: boolean;

  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string, productVariantId?: string) => Promise<{ success: boolean; error?: string }>;
  removeFromWishlist: (productId: string, productVariantId?: string) => Promise<{ success: boolean; error?: string }>;
  isInWishlist: (productId: string, productVariantId?: string) => boolean;

  openAuthModal: (action: { type: 'add' | 'view'; productId?: string; productVariantId?: string }) => void;
  closeAuthModal: () => void;
  handleAuthSuccess: () => void;
  executePendingAction: () => Promise<void>;

  totalItems: number;
  isEmpty: boolean;
}

export const useWishlistStore = create<WishlistState>()(
  subscribeWithSelector((set, get) => ({
    wishlist: null,
    isLoading: false,
    error: null,
    showAuthModal: false,
    pendingWishlistAction: null,
    hasTriedFetch: false,

    get totalItems() {
      const wl = get().wishlist;
      const result = (typeof wl?.count === 'number') ? wl!.count! : (wl?.items.length || 0);
      return result;
    },

    get isEmpty() {
      return get().totalItems === 0;
    },

  fetchWishlist: async () => {
    set({ isLoading: true, error: null, hasTriedFetch: true });

    try {
      const client = getApolloClient();
      const { data } = await client.query({
        query: GET_MY_WISHLIST,
        fetchPolicy: 'network-only',
      });

      const wishlistData = (data as any)?.myWishlist || null;
      
      set({ wishlist: wishlistData, isLoading: false });
    } catch (error: any) {
      console.error('Failed to fetch wishlist:', error);
      if (error?.message?.includes('Unauthorized') || error?.message?.includes('UNAUTHENTICATED')) {
        set({ wishlist: null, isLoading: false });
      } else {
        set({ error: error?.message || 'Failed to load wishlist', isLoading: false });
      }
    }
  },

  addToWishlist: async (productId, productVariantId) => {
    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: ADD_TO_WISHLIST,
        variables: {
          input: {
            product_id: productId,
            product_variant_id: productVariantId,
          },
        },
      });

      await get().fetchWishlist();

      return { success: true };
    } catch (error: any) {
      console.error('Failed to add to wishlist:', error);
      // If unauthorized, return success: false without error message to trigger modal
      if (error?.message?.includes('Unauthorized') || error?.message?.includes('UNAUTHENTICATED')) {
        return { success: false };
      }
      return { success: false, error: error?.message || 'Failed to add to wishlist' };
    }
  },

  removeFromWishlist: async (productId, productVariantId) => {
    try {
      const client = getApolloClient();
      await client.mutate({
        mutation: REMOVE_FROM_WISHLIST,
        variables: {
          input: {
            product_id: productId,
            product_variant_id: productVariantId,
          },
        },
      });

      await get().fetchWishlist();

      return { success: true };
    } catch (error: any) {
      console.error('Failed to remove from wishlist:', error);
      // If unauthorized, return success: false without error message to trigger modal
      if (error?.message?.includes('Unauthorized') || error?.message?.includes('UNAUTHENTICATED')) {
        return { success: false };
      }
      return { success: false, error: error?.message || 'Failed to remove from wishlist' };
    }
  },

  isInWishlist: (productId, productVariantId) => {
    const { wishlist, isLoading, hasTriedFetch, error } = get();
    if (isLoading || !hasTriedFetch) return false;

    if (error && (error.includes('Unauthorized') || error.includes('UNAUTHENTICATED'))) return false;

    if (!wishlist || !wishlist.items || wishlist.items.length === 0) return false;

    if (typeof productVariantId === 'string') {
      return wishlist.items.some(item =>
        item.product_id === productId &&
        (item.product_variant_id ?? null) === (productVariantId ?? null)
      );
    }

    return wishlist.items.some(item => item.product_id === productId);
  },

  clearWishlistState: () => {
    set({
      wishlist: null,
      isLoading: false,
      error: null,
      hasTriedFetch: false,
    });
  },

  openAuthModal: (action) => {
    set({
      showAuthModal: true,
      pendingWishlistAction: action,
    });
  },

  closeAuthModal: () => {
    set({
      showAuthModal: false,
      pendingWishlistAction: null,
    });
  },

  handleAuthSuccess: () => {
    set({ showAuthModal: false });
    get().executePendingAction();
  },

  executePendingAction: async () => {
    const { pendingWishlistAction } = get();
    if (!pendingWishlistAction) return;

    if (pendingWishlistAction.type === 'add' && pendingWishlistAction.productId) {
      await get().addToWishlist(
        pendingWishlistAction.productId,
        pendingWishlistAction.productVariantId
      );
    }
  },
})));

// TODO: Add subscription to auth changes to clear wishlist state when user logs out
// For now, the wishlist state will be cleared on page refresh
