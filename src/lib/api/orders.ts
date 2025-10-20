import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      order_number
      email
      status
      payment_status
      subtotal_cents
      shipping_cents
      vat_cents
      total_cents
      shipping_address
      billing_address
      items {
        id
        sku
        title
        attributes
        quantity
        price_cents
        total_cents
      }
    }
  }
`;

export const TRACK_ORDER = gql`
  query TrackOrder($orderNumber: String!, $email: String!) {
    trackOrder(orderNumber: $orderNumber, email: $email) {
      id
      order_number
      email
      status
      payment_status
      subtotal_cents
      shipping_cents
      vat_cents
      total_cents
      shipping_address
      billing_address
      items {
        id
        sku
        title
        attributes
        quantity
        price_cents
        total_cents
        product {
          id
          title
          media {
            id
            url
            type
            position
          }
        }
      }
      events {
        id
        status
        payment_status
        description
        created_at
      }
    }
  }
`;

