"use client";

const defaultFAQs = [
  {
    id: 'tracking-number-timing',
    question: "When will I receive my tracking number?",
    answer: "You'll receive your tracking number within 24-48 hours after your order has been dispatched. This will be sent to the email address you provided during checkout."
  },
  {
    id: 'no-tracking-updates',
    question: "My tracking shows no updates. What should I do?",
    answer: "Tracking information can take 24-48 hours to update after dispatch. If there are still no updates after this time, please contact our support team."
  },
  {
    id: 'change-delivery-address',
    question: "Can I change my delivery address after the order has shipped?",
    answer: "Once your order has been dispatched, we cannot change the delivery address. Please contact our support team immediately if you need to make changes."
  },
  {
    id: 'package-not-received',
    question: "What if my package shows as delivered but I haven't received it?",
    answer: "First, check with neighbors, building management, or family members. If you still can't locate your package, contact us within 48 hours of the delivery date."
  }
];

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface TrackingFAQProps {
  title?: string;
  faqs?: FAQ[];
}

const TrackingFAQ: React.FC<TrackingFAQProps> = ({
  title = "Frequently Asked Questions",
  faqs = defaultFAQs
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#000000] mb-6">{title}</h2>
      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.id} className="p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-[#000000] mb-3">{faq.question}</h3>
            <p className="text-[#4A4A4A] leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingFAQ;
