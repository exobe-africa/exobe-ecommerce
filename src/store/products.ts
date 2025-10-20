"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { getApolloClient } from "../lib/apollo/client";
import { ECOM_SEARCH_PRODUCTS, ECOM_PRODUCT_BY_ID } from "../lib/api/products";

export interface UiProductListItem {
  id: string;
  title: string;
  category?: string;
  price?: number; // rands
  image?: string;
}

export interface UiProductDetail {
  id: string;
  title: string;
  description?: string;
  category?: string;
  media: string[];
  price?: number; // rands
  compareAtPrice?: number; // rands
  availableLocations?: string[];
  variants?: Array<{ id: string; price?: number; stock?: number; attributes: Record<string, string> }>; 
  groupedVariantOptions?: Record<string, Array<{ name: string; value: string; price?: number; stock?: number }>>;
  bookDetails?: {
    isbn?: string;
    author?: string;
    publisher?: string;
    publicationDate?: string;
    pages?: number;
    language?: string;
    genre?: string;
    format?: string;
  };
}

interface ProductsState {
  list: UiProductListItem[];
  isLoadingList: boolean;
  product: UiProductDetail | null;
  isLoadingProduct: boolean;
  error: string | null;

  fetchList: (vars?: { query?: string; categoryId?: string; status?: string }) => Promise<void>;
  fetchById: (id: string) => Promise<UiProductDetail | null>;
  clear: () => void;
}

export const useProductsStore = create<ProductsState>()(
  subscribeWithSelector((set, get) => ({
    list: [],
    isLoadingList: false,
    product: null,
    isLoadingProduct: false,
    error: null,

    async fetchList(vars = {}) {
      set({ isLoadingList: true, error: null });
      try {
        const client = getApolloClient();
        const { data } = await client.query({
          query: ECOM_SEARCH_PRODUCTS,
          variables: { ...vars, limit: 24, isActive: true, status: "ACTIVE" },
          fetchPolicy: "no-cache",
        });

        const payload = JSON.parse((data as any)?.searchProducts || "{}");
        const rows: any[] = Array.isArray(payload.items) ? payload.items : [];

        const list: UiProductListItem[] = rows.map((r) => ({
          id: r.id,
          title: r.title,
          category: r.category?.name,
          price: r.variants?.[0]?.priceCents
            ? r.variants[0].priceCents / 100
            : r.priceInCents
            ? r.priceInCents / 100
            : undefined,
          image: r.media?.[0]?.url,
        }));

        set({ list, isLoadingList: false });
      } catch (e: any) {
        set({ error: e?.message || "Failed to fetch products", isLoadingList: false });
      }
    },

    async fetchById(id: string) {
      set({ isLoadingProduct: true, error: null });
      try {
        const client = getApolloClient();
        const { data } = await client.query({
          query: ECOM_PRODUCT_BY_ID,
          variables: { id },
          fetchPolicy: "no-cache",
        });

        const p = (data as any)?.productById;
        if (!p) {
          set({ product: null, isLoadingProduct: false });
          return null;
        }

        let grouped: Record<string, Array<{ name: string; value: string; price?: number; stock?: number }>> | undefined;
        if (Array.isArray(p.options) && p.options.length > 0) {
          grouped = {};
          for (const opt of p.options) {
            const key = opt.name.toLowerCase();
            grouped[key] = (opt.values || []).map((v: any) => ({
              name: v.value,
              value: v.value,
            }));
          }
        }

        const detail: UiProductDetail = {
          id: p.id,
          title: p.title,
          description: p.description,
          category: p.category?.name,
          media: Array.isArray(p.media) ? p.media.map((m: any) => m.url) : [],
          price: p.priceInCents ? p.priceInCents / 100 : p.variants?.[0]?.priceCents ? p.variants[0].priceCents / 100 : undefined,
          compareAtPrice: p.compareAtPriceInCents ? p.compareAtPriceInCents / 100 : p.variants?.[0]?.compareAtPriceCents ? p.variants[0].compareAtPriceCents / 100 : undefined,
          availableLocations: p.availableLocations || [],
          variants: Array.isArray(p.variants)
            ? p.variants.map((v: any) => ({ id: v.id, price: v.priceCents ? v.priceCents / 100 : undefined, stock: v.stockQuantity, attributes: v.attributes || {} }))
            : undefined,
          groupedVariantOptions: grouped,
          ...(typeof p.stockQuantity === 'number' ? { stock: p.stockQuantity } as any : {}),
          bookDetails: p.bookDetails ? {
            isbn: p.bookDetails.isbn,
            author: p.bookDetails.author,
            publisher: p.bookDetails.publisher,
            publicationDate: p.bookDetails.publicationDate,
            pages: p.bookDetails.pages,
            language: p.bookDetails.language,
            genre: p.bookDetails.genre,
            format: p.bookDetails.format,
          } : undefined,
        };

        set({ product: detail, isLoadingProduct: false });
        return detail;
      } catch (e: any) {
        set({ error: e?.message || "Failed to fetch product", isLoadingProduct: false, product: null });
        return null;
      }
    },

    clear() {
      set({ list: [], product: null, error: null });
    },
  }))
);