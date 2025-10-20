import { gql } from "@apollo/client";

export const ECOM_SEARCH_PRODUCTS = gql`
  query SearchProducts($query: String, $categoryId: String, $vendorId: String, $status: String, $isActive: Boolean, $cursor: String, $limit: Float) {
    searchProducts(query: $query, categoryId: $categoryId, vendorId: $vendorId, status: $status, isActive: $isActive, cursor: $cursor, limit: $limit)
  }
`;

export const ECOM_PRODUCT_BY_ID = gql`
  query ProductById($id: String!) {
    productById(id: $id) {
      id
      title
      slug
      description
      status
      isActive
      categoryId
      availableLocations
      stockQuantity
      priceInCents
      compareAtPriceInCents
      media { id url type position }
      options { id name position values { id value position } }
      variants { id sku title priceCents compareAtPriceCents stockQuantity attributes }
      category { id name }
      bookDetails { id isbn author publisher publicationDate pages language genre format }
    }
  }
`;


