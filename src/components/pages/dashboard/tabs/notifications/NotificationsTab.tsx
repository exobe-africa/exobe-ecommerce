"use client";

import { useEffect, useState } from "react";
import { useNotificationStore, NotificationSettings } from "../../../../../store/notifications";
import { useToast } from "../../../../../context/ToastContext";

interface NotificationToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function NotificationToggle({ title, description, checked, onChange, disabled = false }: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-[#000000]">{title}</p>
        <p className="text-sm text-[#4A4A4A]">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#F6E2E0] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
          checked
            ? 'bg-[#C8102E]'
            : 'bg-gray-200'
        } ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'peer-checked:after:translate-x-full'
        }`}></div>
      </label>
    </div>
  );
}

export default function NotificationsTab() {
  const {
    settings,
    isLoading,
    isUpdating,
    error,
    fetchSettings,
    updateSettings
  } = useNotificationStore();

  const { showSuccess, showError } = useToast();
  const [localSettings, setLocalSettings] = useState<any>({
    order_confirmations: false,
    shipping_updates: false,
    delivery_notifications: false,
    product_recommendations: false,
    exclusive_deals: false,
    wishlist_updates: false,
    shopping_insights: false,
    login_alerts: false,
    password_changes: false,
  });

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (settings) {
      setLocalSettings((prevSettings: any) => ({
        ...prevSettings,
        ...settings,
      }));
    }
  }, [settings]);

  const handleSettingChange = (key: string, value: boolean) => {
    setLocalSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!settings) return;

    // Only send changed settings
    const changedSettings: Record<string, boolean> = {};
    Object.keys(localSettings).forEach(key => {
      const settingKey = key as keyof NotificationSettings;
      if (localSettings[settingKey] !== settings[settingKey] && localSettings[settingKey] !== undefined) {
        changedSettings[settingKey] = localSettings[settingKey] as boolean;
      }
    });

    const result = await updateSettings(changedSettings);

    if (result.success) {
      showSuccess('Notification preferences updated successfully!');
    } else {
      showError(result.error || 'Failed to update preferences');
      console.error('Update failed with error:', result.error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8102E]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="text-center text-red-500">
            <p>Error loading notification settings: {error}</p>
            <button
              onClick={() => fetchSettings()}
              className="mt-2 text-[#C8102E] hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <p className="text-center text-gray-500">No notification settings found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-[#000000]">Notification Preferences</h2>
        <p className="text-[#4A4A4A] mt-1">Customize how we communicate with you to enhance your shopping experience</p>
      </div>
      <div className="p-6">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-[#000000] mb-4">Order Updates</h3>
            <div className="space-y-4">
              <NotificationToggle
                title="Order confirmations"
                description="Get notified when your order is confirmed"
                checked={localSettings.order_confirmations}
                onChange={(checked) => handleSettingChange('order_confirmations', checked)}
                disabled={isUpdating}
              />
              <NotificationToggle
                title="Shipping updates"
                description="Track your package from dispatch to delivery"
                checked={localSettings.shipping_updates}
                onChange={(checked) => handleSettingChange('shipping_updates', checked)}
                disabled={isUpdating}
              />
              <NotificationToggle
                title="Delivery notifications"
                description="Know exactly when your order arrives"
                checked={localSettings.delivery_notifications}
                onChange={(checked) => handleSettingChange('delivery_notifications', checked)}
                disabled={isUpdating}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#000000] mb-2">Personalized Shopping Experience</h3>
            <p className="text-sm text-[#4A4A4A] mb-4">Help us improve your shopping experience with relevant updates and recommendations</p>
            <div className="space-y-4">
              <NotificationToggle
                title="Product recommendations"
                description="Discover products tailored to your interests and purchase history"
                checked={localSettings.product_recommendations}
                onChange={(checked) => handleSettingChange('product_recommendations', checked)}
                disabled={isUpdating}
              />
              <NotificationToggle
                title="Exclusive deals & early access"
                description="Be the first to know about special offers and new arrivals"
                checked={localSettings.exclusive_deals}
                onChange={(checked) => handleSettingChange('exclusive_deals', checked)}
                disabled={isUpdating}
              />
              <NotificationToggle
                title="Wishlist updates"
                description="Get notified when wishlist items go on sale or are back in stock"
                checked={localSettings.wishlist_updates}
                onChange={(checked) => handleSettingChange('wishlist_updates', checked)}
                disabled={isUpdating}
              />
              <NotificationToggle
                title="Shopping insights"
                description="Monthly summaries of your shopping activity and savings"
                checked={localSettings.shopping_insights}
                onChange={(checked) => handleSettingChange('shopping_insights', checked)}
                disabled={isUpdating}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#000000] mb-4">Account Security</h3>
            <div className="space-y-4">
              <NotificationToggle
                title="Login alerts"
                description="Get notified of new device logins for security"
                checked={localSettings.login_alerts}
                onChange={(checked) => handleSettingChange('login_alerts', checked)}
                disabled={isUpdating}
              />
              <NotificationToggle
                title="Password changes"
                description="Confirmation when your password is updated"
                checked={localSettings.password_changes}
                onChange={(checked) => handleSettingChange('password_changes', checked)}
                disabled={isUpdating}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className={`px-8 py-3 rounded-xl font-medium transition-colors ${
                isUpdating
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
              }`}
            >
              {isUpdating ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Preferences'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
