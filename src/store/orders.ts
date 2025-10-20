"use client";

import { create } from "zustand";
import { getApolloClient } from "../lib/apollo/client";
import { DASHBOARD_MY_ORDERS } from "../lib/api/dashboard";
import { CREATE_ORDER } from "../lib/api/orders";

export interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  trackingNumber?: string | null;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
}

interface OrdersState {
  // Data
  orders: Order[];
  lastOrder?: any;
  
  // UI state
  isLoading: boolean;
  isPlacing: boolean;
  error: string | null;
  
  // Actions
  setOrders: (orders: Order[]) => void;
  setError: (error: string | null) => void;
  
  // GraphQL operations
  fetchOrders: () => Promise<{ success: boolean; error?: string }>;
  placeOrder: (input: any) => Promise<{ success: boolean; order?: any; error?: string }>;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  // Initial state
  orders: [],
  lastOrder: undefined,
  isLoading: false,
  isPlacing: false,
  error: null,

  // Setters
  setOrders: (orders) => set({ orders }),

  setError: (error) => set({ error }),

  // GraphQL operations
  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const client = getApolloClient();
      const { data } = await client.query({
        query: DASHBOARD_MY_ORDERS,
        fetchPolicy: 'network-only'
      });
      
      const raw = (data as any)?.myOrders ?? [];
      const orders: Order[] = raw.map((o: any, idx: number) => ({
        id: o.id,
        date: o.created_at ? new Date(o.created_at).toLocaleDateString() : 'Unknown',
        status: o.status || 'Processing',
        total: (o.total_cents ?? 0) / 100,
        items: o.items?.map((item: any) => ({
          id: item.id,
          name: item.product?.name || 'Unknown Product',
          image: item.product?.images?.[0]?.url || '/placeholder-product.jpg',
          price: (item.price_cents ?? 0) / 100,
          quantity: item.quantity ?? 1,
          variant: item.variant?.name
        })) || [],
        trackingNumber: o.tracking_number,
        shippingAddress: {
          name: o.shipping_address?.name || 'N/A',
          street: o.shipping_address?.address_line_1 || 'N/A',
          city: o.shipping_address?.city || 'N/A',
          province: o.shipping_address?.province || 'N/A',
          postalCode: o.shipping_address?.postal_code || 'N/A'
        },
        paymentMethod: o.payment_method || 'Credit Card',
        subtotal: (o.subtotal_cents ?? 0) / 100,
        shipping: (o.shipping_cents ?? 0) / 100,
        tax: (o.vat_cents ?? 0) / 100,
      }));
      
      set({ orders, isLoading: false });
      return { success: true };
    } catch (error: any) {
      const message = error?.message || 'Failed to fetch orders';
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
  },

  // Create order (moved from component)
  placeOrder: async (input: any) => {
    set({ isPlacing: true, error: null });
    try {
      const client = getApolloClient();
      const { data } = await client.mutate({
        mutation: CREATE_ORDER,
        variables: { input }
      });
      const order = (data as any)?.createOrder;
      if (!order) throw new Error('Order not created');
      set({ lastOrder: order, isPlacing: false });
      return { success: true, order };
    } catch (error: any) {
      const message = error?.message || 'Failed to place order';
      set({ error: message, isPlacing: false });
      return { success: false, error: message };
    }
  }
}));
