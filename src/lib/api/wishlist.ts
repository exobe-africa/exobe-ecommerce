import { gql } from "@apollo/client";

export const GET_MY_WISHLIST = gql`
  query GetMyWishlist {
    myWishlist {
      id
      items {
        id
        product_id
        product_variant_id
        created_at
      }
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation AddToWishlist($input: WishlistItemInput!) {
    addToWishlist(input: $input)
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveFromWishlist($input: WishlistItemInput!) {
    removeFromWishlist(input: $input)
  }
`;
