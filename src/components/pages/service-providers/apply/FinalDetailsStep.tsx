"use client";

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { RadioButton, Checkbox } from '../../../common';
import { ServiceProviderFormData } from './types';

interface FinalDetailsStepProps {
  formData: ServiceProviderFormData;
  errors: {[key: string]: string};
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FinalDetailsStep: React.FC<FinalDetailsStepProps> = ({
  formData,
  errors,
  onInputChange
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Final Details</h2>
        <p className="text-[#4A4A4A] text-lg">Complete your application</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Why do you want to become a service provider on eXobe? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="motivation"
            value={formData.motivation}
            onChange={onInputChange}
            rows={5}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="Tell us about your motivation, what you hope to achieve, and how you plan to provide excellent service to customers..."
          />
          {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Your Goals & Expectations
          </label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={onInputChange}
            rows={4}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="What are your income goals? How many hours per week do you want to work? What type of clients do you want to serve?"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            How did you hear about eXobe Service Providers? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {[
              { value: 'friend', label: 'Friend or family recommendation' },
              { value: 'social-media', label: 'Social media (Facebook, Instagram, etc.)' },
              { value: 'google', label: 'Google search' },
              { value: 'existing-customer', label: 'I\'m already an eXobe customer' },
              { value: 'advertisement', label: 'Online advertisement' },
              { value: 'job-board', label: 'Job board or employment site' },
              { value: 'other', label: 'Other' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`howDidYouHear-${option.value}`}
                name="howDidYouHear"
                value={option.value}
                checked={formData.howDidYouHear === option.value}
                onChange={(value) => {
                  // Also trigger the main onInputChange to clear validation errors
                  const syntheticEvent = {
                    target: { name: 'howDidYouHear', value }
                  } as React.ChangeEvent<HTMLSelectElement>;
                  onInputChange(syntheticEvent);
                }}
                label={option.label}
                variant="default"
                size="sm"
                className="p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors"
              />
            ))}
          </div>
          {errors.howDidYouHear && <p className="text-red-500 text-sm mt-2">{errors.howDidYouHear}</p>}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <Checkbox
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={(checked) => {
              // Also trigger the main onInputChange to clear validation errors
              const syntheticEvent = {
                target: { name: 'agreeToTerms', value: checked.toString() }
              } as React.ChangeEvent<HTMLInputElement>;
              onInputChange(syntheticEvent);
            }}
            required
            label={
              <span className="text-sm leading-relaxed">
                I agree to the{' '}
                <Link href="/terms-and-conditions" className="text-[#C8102E] hover:underline font-semibold">
                  Terms and Conditions
                </Link>
                {' '}and{' '}
                <Link href="/privacy-policy" className="text-[#C8102E] hover:underline font-semibold">
                  Privacy Policy
                </Link>
                , and understand that eXobe will review my application.
              </span>
            }
          />
          {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}

          <Checkbox
            id="agreeToBackground"
            name="agreeToBackground"
            checked={formData.agreeToBackground}
            onChange={(checked) => {
              // Also trigger the main onInputChange to clear validation errors
              const syntheticEvent = {
                target: { name: 'agreeToBackground', value: checked.toString() }
              } as React.ChangeEvent<HTMLInputElement>;
              onInputChange(syntheticEvent);
            }}
            required
            label={
              <span className="text-sm leading-relaxed">
                I consent to a background check and understand that providing false information may result in rejection or termination of my service provider account.
              </span>
            }
          />
          {errors.agreeToBackground && <p className="text-red-500 text-sm mt-2">{errors.agreeToBackground}</p>}
        </div>
      </div>
    </div>
  );
};

export default FinalDetailsStep;
