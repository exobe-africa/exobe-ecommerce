import { gql } from "@apollo/client";

export const APPLY_RETAILER = gql`
  mutation ApplyRetailer($input: SellerApplicationInput!) {
    applyRetailer(input: $input) {
      id
    }
  }
`;

export const APPLY_WHOLESALER = gql`
  mutation ApplyWholesaler($input: SellerApplicationInput!) {
    applyWholesaler(input: $input) {
      id
    }
  }
`;


