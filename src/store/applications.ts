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

export interface ValidationErrors {
  [key: string]: string;
}

interface ApplicationsState {
  isSubmitting: boolean;
  error: string | null;
  fieldErrors: ValidationErrors;
  lastSubmittedId: string | null;
  applySeller: (sellerType: "retailer" | "wholesaler", input: SellerApplicationInputState) => Promise<string>;
  clearError: () => void;
  clearFieldErrors: () => void;
}

// Parse GraphQL validation errors
function parseValidationErrors(error: any): { message: string; fieldErrors: ValidationErrors } {
  let message = "Submission failed. Please check all required fields.";
  const fieldErrors: ValidationErrors = {};

  if (error?.graphQLErrors?.length > 0) {
    const graphQLError = error.graphQLErrors[0];

    // Check for validation errors from class-validator
    if (graphQLError?.extensions?.exception?.response?.message) {
      const validationMessages = graphQLError.extensions.exception.response.message;

      if (Array.isArray(validationMessages)) {
        // Parse validation messages and extract field names
        validationMessages.forEach((msg: string) => {
          // Try to extract field name from message (e.g., "firstName must be at least 2 characters")
          const fieldMatch = msg.match(/^(\w+)\s/);
          if (fieldMatch) {
            const fieldName = fieldMatch[1];
            fieldErrors[fieldName] = msg;
          }
        });
        message = validationMessages.join(', ') || message;
      } else if (typeof validationMessages === 'string') {
        message = validationMessages;
      }
    } else if (graphQLError?.extensions?.exception?.message) {
      // Nest may put message here as array or string
      const exMsg = graphQLError.extensions.exception.message;
      message = Array.isArray(exMsg) ? exMsg.join(', ') : exMsg || message;
    } else if (graphQLError?.message) {
      message = graphQLError.message;
    }
  } else if (error?.message) {
    message = error.message;
  }

  return { message, fieldErrors };
}

export const useApplicationsStore = create<ApplicationsState>()((set, get) => ({
  isSubmitting: false,
  error: null,
  fieldErrors: {},
  lastSubmittedId: null,
  async applySeller(sellerType, input) {
    set({ isSubmitting: true, error: null, fieldErrors: {} });
    try {
      const client = getApolloClient();
      const mutation = sellerType === "wholesaler" ? APPLY_WHOLESALER : APPLY_RETAILER;
      const { data } = await client.mutate({ mutation, variables: { input } });
      const resp = sellerType === "wholesaler" ? (data as any)?.applyWholesaler : (data as any)?.applyRetailer;
      const id = resp?.id as string;
      set({ isSubmitting: false, lastSubmittedId: id || null });
      return id;
    } catch (err: any) {
      const { message, fieldErrors } = parseValidationErrors(err);
      set({ isSubmitting: false, error: message, fieldErrors });
      throw err;
    }
  },
  clearError() {
    set({ error: null });
  },
  clearFieldErrors() {
    set({ fieldErrors: {} });
  },
}));


