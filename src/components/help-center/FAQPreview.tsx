"use client";

import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

const defaultFAQs = [
  {
    question: "How long does delivery take?",
    answer: "Standard delivery takes 2-5 business days within South Africa. Express delivery is available for next-day delivery in major cities."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only ship within South Africa. International shipping will be available soon."
  },
  {
    question: "How can I track my order?",
    answer: "You'll receive a tracking number via email once your order ships. Use this to track your package on our website."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, EFT, SnapScan, and Buy Now Pay Later options."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use industry-standard SSL encryption and PCI DSS compliance to protect your payment information."
  }
];

interface FAQ {
  question: string;
  answer: string;
}

interface FAQPreviewProps {
  faqs?: FAQ[];
  title?: string;
  description?: string;
  faqPageUrl?: string;
  buttonText?: string;
  maxItems?: number;
  columns?: number;
}

const FAQPreview: React.FC<FAQPreviewProps> = ({
  faqs = defaultFAQs,
  title = "Frequently Asked Questions",
  description = "Quick answers to the most common questions",
  faqPageUrl = "/faq",
  buttonText = "View All FAQs",
  maxItems = 6,
  columns = 2
}) => {
  const displayFAQs = faqs.slice(0, maxItems);
  
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  return (
    <section>
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-200">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#000000] mb-4">{title}</h2>
          <p className="text-lg text-[#4A4A4A]">
            {description}
          </p>
        </div>

        <div className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[2]} gap-8`}>
          {displayFAQs.map((faq, index) => (
            <div key={index} className="p-6 rounded-lg border border-gray-200 hover:border-[#C8102E] transition-colors">
              <h3 className="font-semibold text-[#000000] mb-3 flex items-center">
                <HelpCircle className="h-5 w-5 text-[#C8102E] mr-2" />
                {faq.question}
              </h3>
              <p className="text-[#4A4A4A] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href={faqPageUrl}>
            <button className="bg-[#000000] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#4A4A4A] transition-colors">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQPreview;
