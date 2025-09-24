"use client";

import { Phone, Mail, MessageCircle } from 'lucide-react';

const defaultContactMethods = [
  {
    title: 'Live Chat',
    description: 'Chat with our support team',
    availability: 'Available 24/7',
    icon: MessageCircle,
    color: 'bg-green-500',
    action: 'Start Chat'
  },
  {
    title: 'Phone Support',
    description: 'Call us for immediate help',
    availability: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM',
    icon: Phone,
    color: 'bg-blue-500',
    action: 'Call +27 11 123 4567'
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message',
    availability: 'Response within 24 hours',
    icon: Mail,
    color: 'bg-purple-500',
    action: 'Send Email'
  }
];

interface ContactMethod {
  title: string;
  description: string;
  availability: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  action: string;
}

interface ContactSupportProps {
  contactMethods?: ContactMethod[];
  title?: string;
  description?: string;
  onContactClick?: (method: ContactMethod) => void;
}

const ContactSupport: React.FC<ContactSupportProps> = ({
  contactMethods = defaultContactMethods,
  title = "Still need help?",
  description = "Our friendly support team is here to help you with any questions or issues you might have.",
  onContactClick
}) => {
  const handleContactClick = (method: ContactMethod) => {
    if (onContactClick) {
      onContactClick(method);
    }
  };

  return (
    <section className="mb-16">
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#000000] mb-4">{title}</h2>
          <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:border-[#C8102E] transition-all duration-300 group">
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#000000] mb-2">{method.title}</h3>
                <p className="text-[#4A4A4A] mb-3">{method.description}</p>
                <p className="text-sm text-gray-500 mb-4">{method.availability}</p>
                <button 
                  onClick={() => handleContactClick(method)}
                  className="bg-[#C8102E] text-white px-6 py-2 rounded-full font-medium hover:bg-[#A00E26] transition-colors"
                >
                  {method.action}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;
