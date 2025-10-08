"use client";

import React from 'react';
import { CheckCircle, Clock, Mail, Phone } from 'lucide-react';

interface ApplicationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationType: 'service-provider' | 'seller';
  title?: string;
  subtitle?: string;
  responseTime?: string;
  contactEmail?: string;
  contactPhone?: string;
  backButtonText?: string;
}

export default function ApplicationSuccessModal({
  isOpen,
  onClose,
  applicationType,
  title,
  subtitle,
  responseTime = "3-5 business days",
  contactEmail,
  contactPhone = "+27 11 123 4567",
  backButtonText
}: ApplicationSuccessModalProps) {
  if (!isOpen) return null;

  // Default configurations based on application type
  const config = {
    'service-provider': {
      title: title || "Application Submitted!",
      subtitle: subtitle || "Thank you for applying to be a service provider",
      email: contactEmail || "providers@exobe.com",
      backText: backButtonText || "Back to Service Providers",
      steps: [
        {
          title: "Review Process:",
          description: `Our team will review your application within ${responseTime}`
        },
        {
          title: "Email Notification:",
          description: "We'll send you an email with the decision and next steps"
        },
        {
          title: "Get Started:",
          description: "Once approved, you can start accepting jobs and earning money"
        }
      ]
    },
    'seller': {
      title: title || "Application Submitted!",
      subtitle: subtitle || "Thank you for applying to sell on eXobe",
      email: contactEmail || "sellers@exobe.com",
      backText: backButtonText || "Back to Sell on eXobe",
      steps: [
        {
          title: "Review Process:",
          description: `Our team will review your application within ${responseTime}`
        },
        {
          title: "Email Notification:",
          description: "We'll send you an email with the decision and next steps"
        },
        {
          title: "Start Selling:",
          description: "Once approved, you can list products and start making sales"
        }
      ]
    }
  };

  const currentConfig = config[applicationType];

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold">{currentConfig.title}</h3>
          <p className="text-green-100 mt-2">{currentConfig.subtitle}</p>
        </div>

        <div className="p-6 text-center">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-[#000000] mb-3">What happens next?</h4>
            <div className="space-y-3 text-left">
              {currentConfig.steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-[#C8102E] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-[#4A4A4A] text-sm">
                      <strong>{step.title}</strong> {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-semibold text-blue-800">Expected Response Time</span>
            </div>
            <p className="text-blue-700 text-sm">{responseTime}</p>
          </div>

          <div className="text-sm text-[#4A4A4A] mb-6">
            <p className="mb-2">
              <strong>Questions?</strong> Contact our {applicationType === 'service-provider' ? 'service provider' : 'seller'} support team:
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center text-xs">
              <span className="flex items-center justify-center">
                <Mail className="h-4 w-4 mr-1 text-[#C8102E]" />
                {currentConfig.email}
              </span>
              <span className="flex items-center justify-center">
                <Phone className="h-4 w-4 mr-1 text-[#C8102E]" />
                {contactPhone}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#C8102E] text-white py-4 rounded-full font-semibold hover:bg-[#A00E26] transition-colors text-lg shadow-lg"
          >
            {currentConfig.backText}
          </button>
        </div>
      </div>
    </div>
  );
}
