import { gql } from "@apollo/client";

export const GET_MY_NOTIFICATION_SETTINGS = gql`
  query GetMyNotificationSettings {
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

export const UPDATE_MY_NOTIFICATION_SETTINGS = gql`
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

// Alternative mutation without custom input type (for debugging)
export const UPDATE_NOTIFICATION_SETTINGS_RAW = gql`
  mutation UpdateNotificationSettings($order_confirmations: Boolean, $shipping_updates: Boolean, $delivery_notifications: Boolean, $product_recommendations: Boolean, $exclusive_deals: Boolean, $wishlist_updates: Boolean, $shopping_insights: Boolean, $login_alerts: Boolean, $password_changes: Boolean) {
    updateMyNotificationSettings(input: {
      order_confirmations: $order_confirmations
      shipping_updates: $shipping_updates
      delivery_notifications: $delivery_notifications
      product_recommendations: $product_recommendations
      exclusive_deals: $exclusive_deals
      wishlist_updates: $wishlist_updates
      shopping_insights: $shopping_insights
      login_alerts: $login_alerts
      password_changes: $password_changes
    }) {
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

// For debugging - let's try with a simpler input structure
export const UPDATE_NOTIFICATION_SETTINGS_SIMPLE = gql`
  mutation UpdateNotificationSettings($settings: CustomerNotificationSettingsInput!) {
    updateMyNotificationSettings(input: $settings) {
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
