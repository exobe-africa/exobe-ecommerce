"use client";

import { Mail, User, Smartphone, Lock } from 'lucide-react';

const defaultSteps = [
  {
    id: 'signup-page',
    stepNumber: 1,
    title: 'Go to the Sign Up Page',
    description: 'Click "Sign Up" or "Create Account" on any page of the eXobe website. You\'ll find this in the top right corner of the navigation bar.',
    tip: 'You can also create an account during checkout for even more convenience.',
    tipType: 'info'
  },
  {
    id: 'fill-details',
    stepNumber: 2,
    title: 'Fill in Your Details',
    description: 'Complete the registration form with your personal information:',
    fields: [
      {
        icon: Mail,
        label: 'Email Address',
        description: 'This will be your login username'
      },
      {
        icon: User,
        label: 'Full Name',
        description: 'First name and surname'
      },
      {
        icon: Smartphone,
        label: 'Mobile Number',
        description: 'For delivery notifications'
      },
      {
        icon: Lock,
        label: 'Password',
        description: 'Minimum 8 characters'
      }
    ]
  },
  {
    id: 'create-password',
    stepNumber: 3,
    title: 'Create a Strong Password',
    description: 'Your password should be secure and unique. Follow these guidelines:',
    requirements: [
      'At least 8 characters long',
      'Include uppercase and lowercase letters',
      'Include at least one number',
      'Include a special character (!, @, #, etc.)',
      'Don\'t use personal information'
    ],
    tipType: 'warning'
  },
  {
    id: 'verify-email',
    stepNumber: 4,
    title: 'Verify Your Email',
    description: 'After submitting the form, check your email inbox for a verification message from eXobe.',
    tip: 'Check your spam folder if you don\'t see the email within 5 minutes. You\'ll need to verify your email before you can place orders.',
    tipType: 'warning'
  },
  {
    id: 'complete-profile',
    stepNumber: 5,
    title: 'Complete Your Profile',
    description: 'Once verified, log in and complete your profile for the best shopping experience:',
    items: [
      'Add your delivery address',
      'Set your communication preferences',
      'Add payment methods for faster checkout',
      'Subscribe to newsletters for exclusive offers'
    ]
  }
];

interface FormField {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

interface Step {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
  tipType?: 'info' | 'warning';
  fields?: FormField[];
  requirements?: string[];
  items?: string[];
}

interface StepByStepGuideProps {
  title?: string;
  steps?: Step[];
}

const StepByStepGuide: React.FC<StepByStepGuideProps> = ({
  title = "Step-by-Step Account Creation",
  steps = defaultSteps
}) => {
  const getTipStyles = (tipType?: string) => {
    switch (tipType) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'info':
      default:
        return 'bg-[#F6E2E0] text-[#4A4A4A]';
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      
      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-[#C8102E] rounded-full flex items-center justify-center text-white font-bold text-lg">
              {step.stepNumber}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#000000] mb-3">{step.title}</h3>
              <p className="text-[#4A4A4A] mb-4">
                {step.description}
              </p>
              
              {/* Form Fields */}
              {step.fields && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {step.fields.map((field, index) => {
                    const IconComponent = field.icon;
                    return (
                      <div key={index} className="p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <IconComponent className="h-5 w-5 text-[#C8102E]" />
                          <span className="font-medium">{field.label}</span>
                        </div>
                        <p className="text-sm text-[#4A4A4A]">{field.description}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {/* Password Requirements */}
              {step.requirements && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Password Requirements:</h4>
                  <ul className="space-y-1 text-blue-700 text-sm">
                    {step.requirements.map((requirement, index) => (
                      <li key={index}>• {requirement}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* List Items */}
              {step.items && (
                <ul className="space-y-2 text-[#4A4A4A]">
                  {step.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              )}
              
              {/* Tip */}
              {step.tip && (
                <div className={`rounded-lg p-4 border ${getTipStyles(step.tipType)}`}>
                  <p className="text-sm">
                    <strong>{step.tipType === 'warning' ? 'Important:' : 'Tip:'}</strong> {step.tip}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepByStepGuide;
