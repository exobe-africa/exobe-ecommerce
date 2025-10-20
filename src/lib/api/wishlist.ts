import { gql } from "@apollo/client";

export const GET_MY_WISHLIST = gql`
  query GetMyWishlist {
    myWishlist {
      id
      count
      items {
        id
        product_id
        product_variant_id
        created_at
        product {
          id
          title
          priceInCents
          compareAtPriceInCents
          category { id name }
          media { id url type position }
          variants { id priceCents compareAtPriceCents stockQuantity attributes }
        }
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
