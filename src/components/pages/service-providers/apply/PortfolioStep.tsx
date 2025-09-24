"use client";

import { Award } from 'lucide-react';
import { RadioButton } from '../../../common';
import { ServiceProviderFormData } from './types';

interface PortfolioStepProps {
  formData: ServiceProviderFormData;
  errors: {[key: string]: string};
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<ServiceProviderFormData>>;
}

const PortfolioStep: React.FC<PortfolioStepProps> = ({
  formData,
  errors,
  onInputChange,
  setFormData
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Award className="h-16 w-16 text-[#C8102E] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-2">Portfolio & References</h2>
        <p className="text-[#4A4A4A] text-lg">Show your expertise and credibility</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Work Samples & Portfolio
          </label>
          <textarea
            name="workSamples"
            value={formData.workSamples}
            onChange={onInputChange}
            rows={4}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="Describe your best work, provide links to portfolio, photos, or examples of your services..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Client References
          </label>
          <textarea
            name="clientReferences"
            value={formData.clientReferences}
            onChange={onInputChange}
            rows={4}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="Provide contact details of previous clients who can vouch for your work (name, phone, email)..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-2">
            Professional Certifications
          </label>
          <textarea
            name="certifications"
            value={formData.certifications}
            onChange={onInputChange}
            rows={3}
            className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] bg-white text-[#000000] text-lg"
            placeholder="List any relevant certifications, licences, or professional memberships..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Do you have professional insurance?
          </label>
          <div className="space-y-3">
            {[
              { value: 'yes', label: 'Yes, I have professional liability insurance' },
              { value: 'no', label: 'No, but I understand the importance' },
              { value: 'will-get', label: 'No, but I will obtain it if accepted' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`insurance-${option.value}`}
                name="insurance"
                value={option.value}
                checked={formData.insurance === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, insurance: value }))}
                label={option.label}
                variant="card"
                size="md"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#000000] mb-4">
            Background Check Consent
          </label>
          <div className="space-y-3">
            {[
              { value: 'clean', label: 'I have a clean criminal record' },
              { value: 'minor', label: 'I have minor offenses but nothing serious' },
              { value: 'explain', label: 'I need to explain my background' }
            ].map((option) => (
              <RadioButton
                key={option.value}
                id={`backgroundCheck-${option.value}`}
                name="backgroundCheck"
                value={option.value}
                checked={formData.backgroundCheck === option.value}
                onChange={(value) => setFormData(prev => ({ ...prev, backgroundCheck: value }))}
                label={option.label}
                variant="card"
                size="md"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioStep;
