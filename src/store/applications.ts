"use client";

import { create } from "zustand";
import { getApolloClient } from "../lib/apollo/client";
import { APPLY_RETAILER, APPLY_WHOLESALER } from "../lib/api/applications";

export interface SellerApplicationInputState {
  businessType: string;
  applicantType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  landline?: string | null;
  identificationType: string;
  businessName: string;
  businessRegistration?: string | null;
  saIdNumber?: string | null;
  vatRegistered: string;
  vatNumber?: string | null;
  monthlyRevenue?: string | null;
  physicalStores?: string | null;
  numberOfStores?: string | null;
  supplierToRetailers?: string | null;
  otherMarketplaces?: string | null;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  uniqueProducts?: string | null;
  primaryCategory: string;
  stockType: string;
  productDescription: string;
  ownedBrands?: string | null;
  resellerBrands?: string | null;
  website?: string | null;
  socialMedia?: string | null;
  businessSummary: string;
  howDidYouHear: string;
  agreeToTerms: boolean;
}

interface ApplicationsState {
  isSubmitting: boolean;
  error: string | null;
  lastSubmittedId: string | null;
  applySeller: (sellerType: "retailer" | "wholesaler", input: SellerApplicationInputState) => Promise<string>;
  clearError: () => void;
}

export const useApplicationsStore = create<ApplicationsState>()((set, get) => ({
  isSubmitting: false,
  error: null,
  lastSubmittedId: null,
  async applySeller(sellerType, input) {
    set({ isSubmitting: true, error: null });
    try {
      const client = getApolloClient();
      const mutation = sellerType === "wholesaler" ? APPLY_WHOLESALER : APPLY_RETAILER;
      const { data } = await client.mutate({ mutation, variables: { input } });
      const resp = sellerType === "wholesaler" ? (data as any)?.applyWholesaler : (data as any)?.applyRetailer;
      const id = resp?.id as string;
      set({ isSubmitting: false, lastSubmittedId: id || null });
      return id;
    } catch (err: any) {
      const message = err?.message || "Submission failed";
      set({ isSubmitting: false, error: message });
      throw err;
    }
  },
  clearError() {
    set({ error: null });
  },
}));


