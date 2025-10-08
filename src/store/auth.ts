"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getApolloClient } from "../lib/apollo/client";
import { LOGIN_MUTATION, REGISTER_MUTATION, ME_QUERY } from "../lib/api/auth";

export interface AuthUser {
  id: string;
  email: string;
  token?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  role: string;
  name?: string | null;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    agreeToTerms: boolean;
    subscribeNewsletter: boolean;
  }) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

function extractApolloErrorMessage(err: unknown): string {
  const fallback = "Something went wrong";
  if (!err) return fallback;
  const apolloErr = err as { message?: string };
  if (apolloErr?.message) return apolloErr.message;
  try {
    return String(err);
  } catch {
    return fallback;
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      hasHydrated: false,
      setHasHydrated(value) {
        set({ hasHydrated: value });
      },
      async login(input) {
        set({ isLoading: true, error: null });
        try {
          const client = getApolloClient();
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: { input },
          });
          const user = (data as any)?.login ?? null;
          set({ user, isAuthenticated: !!user, isLoading: false });
        } catch (err) {
          set({ error: extractApolloErrorMessage(err), isLoading: false });
          throw err;
        }
      },
      async register(input) {
        set({ isLoading: true, error: null });
        try {
          const client = getApolloClient();
          const { data } = await client.mutate({
            mutation: REGISTER_MUTATION,
            variables: { input },
          });
          const user = (data as any)?.register ?? null;
          set({ user, isAuthenticated: !!user, isLoading: false });
        } catch (err) {
          set({ error: extractApolloErrorMessage(err), isLoading: false });
          throw err;
        }
      },
      async fetchMe() {
        try {
          const client = getApolloClient();
          const { data } = await client.query({ query: ME_QUERY, fetchPolicy: "no-cache" });
          const user = (data as any)?.me ?? null;
          set({ user, isAuthenticated: !!user });
        } catch (err) {
          // Ignore if not authenticated
        }
      },
      async logout() {
        try {
          await fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: "mutation{ logout }" }),
            credentials: "include",
          });
        } catch (_) {}
        set({ user: null, isAuthenticated: false });
      },
      clearError() {
        set({ error: null });
      },
    }),
    {
      name: "exobe-auth",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state, error) => {
        // Mark hydration complete regardless of success/failure so UI can proceed
        state?.setHasHydrated(true);
      },
    }
  )
);


