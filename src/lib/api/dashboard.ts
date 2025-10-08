import { gql } from "@apollo/client";

export const DASHBOARD_ME = gql`
  query Me {
    me {
      id
      email
      name
      phone
      role
    }
  }
`;

export const DASHBOARD_ADDRESSES = gql`
  query GetUserAddresses($userId: String!) {
    getUserAddresses(userId: $userId) {
      id
      type
      addressLine1
      addressLine2
      city
      province
      country
      postalCode
    }
  }
`;

export const DASHBOARD_CREATE_ADDRESS = gql`
  mutation CreateUserAddress($input: CreateUserAddressInput!) {
    createUserAddress(input: $input) {
      id
      type
      addressLine1
      addressLine2
      city
      province
      country
      postalCode
    }
  }
`;

export const DASHBOARD_UPDATE_ADDRESS = gql`
  mutation UpdateUserAddress($id: String!, $input: UpdateUserAddressInput!) {
    updateUserAddress(id: $id, input: $input) {
      id
      type
      addressLine1
      addressLine2
      city
      province
      country
      postalCode
    }
  }
`;

export const DASHBOARD_DELETE_ADDRESS = gql`
  mutation DeleteUserAddress($id: String!) {
    deleteUserAddress(id: $id)
  }
`;

export const DASHBOARD_MY_ORDERS = gql`
  query MyOrders {
    myOrders {
      id
      order_number
      status
      payment_status
      subtotal_cents
      shipping_cents
      vat_cents
      total_cents
      created_at
      items {
        id
        sku
        title
        price_cents
        quantity
        total_cents
      }
    }
  }
`;

export const DASHBOARD_MY_RETURNS = gql`
  query MyReturns {
    myReturns {
      id
      status
      created_at
      updated_at
    }
  }
`;

export const DASHBOARD_MY_NOTIFICATIONS = gql`
  query MyNotificationSettings {
    myNotificationSettings {
      id
      order_confirmations
      shipping_updates
      delivery_notifications
      product_recommendations
      exclusive_deals
      wishlist_updates
      shopping_insights
      login_alerts
      password_changes
    }
  }
`;

export const DASHBOARD_UPDATE_NOTIFICATIONS = gql`
  mutation UpdateMyNotificationSettings($input: UpdateNotificationSettingsInput!) {
    updateMyNotificationSettings(input: $input) {
      id
      order_confirmations
      shipping_updates
      delivery_notifications
      product_recommendations
      exclusive_deals
      wishlist_updates
      shopping_insights
      login_alerts
      password_changes
    }
  }
`;

export const DASHBOARD_UPDATE_PROFILE = gql`
  mutation UpdateMyProfile($input: UpdateProfileInput!) {
    updateMyProfile(input: $input)
  }
`;

export const DASHBOARD_UPDATE_PASSWORD = gql`
  mutation UpdateMyPassword($input: UpdatePasswordInput!) {
    updateMyPassword(input: $input)
  }
`;

export const DASHBOARD_CHECK_EMAIL_EXISTS = gql`
  mutation CheckEmailExists($input: CheckEmailExistsInput!) {
    checkEmailExists(input: $input)
  }
`;

export const DASHBOARD_DELETE_ACCOUNT = gql`
  mutation DeleteMyAccount {
    deleteMyAccount
  }
`;


