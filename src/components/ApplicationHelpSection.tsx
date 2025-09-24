"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Clock, Star } from 'lucide-react';

interface ApplicationHelpSectionProps {
  applicationType: 'service-provider' | 'seller';
  title?: string;
  description?: string;
  responseTime?: string;
  className?: string;
}

export default function ApplicationHelpSection({
  applicationType,
  title,
  description,
  responseTime = "3-5 business days",
  className = ""
}: ApplicationHelpSectionProps) {
  // Default configurations based on application type
  const config = {
    'service-provider': {
      title: title || "Need Help?",
      description: description || `Our team reviews applications within ${responseTime}. We're here to help you succeed!`
    },
    'seller': {
      title: title || "Need Help?",
      description: description || `Our team reviews applications within ${responseTime}. We're here to help you get started!`
    }
  };

  const currentConfig = config[applicationType];

  return (
    <div className={`mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 ${className}`}>
      <div className="text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <Clock className="h-8 w-8 text-blue-600" />
          <Star className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-[#000000] mb-2">{currentConfig.title}</h3>
        <p className="text-[#4A4A4A] mb-4">
          {currentConfig.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/help-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
              Visit Help Centre
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
