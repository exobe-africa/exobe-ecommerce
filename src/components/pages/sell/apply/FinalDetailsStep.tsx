"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Checkbox, RadioButton } from '../../../common';
import { FormData } from './types';

interface FinalDetailsStepProps {
  formData: FormData;
  errors: { [key: string]: string };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FinalDetailsStep: React.FC<FinalDetailsStepProps> = ({
  formData,
  errors,
  onInputChange,
  setFormData
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
            Business Summary <span className="text-red-500">*</span>
          </label>
          <textarea
            name="businessSummary"
            value={formData.businessSummary}
            onChange={onInputChange}
            rows={5}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="Tell us about your business, what makes it unique, what products you want to sell on eXobe, and any special requirements or certifications you have..."
          />
          <div className="text-sm text-[#4A4A4A] mt-2">
            What makes your business or products unique?<br/>
            What products do you want to market on the eXobe platform?<br/>
            Do you have any feature requirements?<br/>
            Does your business or products have any certifications? (Example: ISO, Proudly SA, ICASA, NRCS, etc)
          </div>
          {errors.businessSummary && <p className="text-red-500 text-sm mt-1">{errors.businessSummary}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            How did you hear about eXobe Marketplace? <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {[
              { value: 'referral', label: 'Colleague or Friend Referral' },
              { value: 'township', label: 'Township Economy Initiative' },
              { value: 'expo', label: 'Expo' },
              { value: 'customer', label: 'Found ability to sell as a customer of eXobe' },
              { value: 'facebook', label: 'Facebook' },
              { value: 'google', label: 'Google' },
              { value: 'linkedin', label: 'LinkedIn' },
              { value: 'tiktok', label: 'TikTok' },
              { value: 'youtube', label: 'YouTube' },
              { value: 'other', label: 'Other' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`howDidYouHear-${option.value}`}
                name="howDidYouHear"
                value={option.value}
                checked={formData.howDidYouHear === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, howDidYouHear: value }))}
                label={option.label}
                variant="default"
                size="sm"
                className="p-3 border border-gray-200 rounded-lg hover:border-[#C8102E] transition-colors"
              />
            ))}
          </div>
          {errors.howDidYouHear && <p className="text-red-500 text-sm mt-2">{errors.howDidYouHear}</p>}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <Checkbox
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked }))}
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
                , and understand that eXobe will review my application within 2-3 business days.
              </span>
            }
          />
          {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}
        </div>
      </div>
    </div>
  );
};

export default FinalDetailsStep;
