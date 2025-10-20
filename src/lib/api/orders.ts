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

