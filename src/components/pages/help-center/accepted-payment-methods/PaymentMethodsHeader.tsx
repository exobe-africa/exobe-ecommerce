"use client";

import Link from 'next/link';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Breadcrumb, PageHeader } from '../../../common/index';

interface PaymentMethodsHeaderProps {
  title?: string;
  description?: string;
  backUrl?: string;
  backText?: string;
}

const PaymentMethodsHeader: React.FC<PaymentMethodsHeaderProps> = ({
  title = "Accepted Payment Methods",
  description = "Payments & Billing",
  backUrl = "/help-center",
  backText = "Back to Help Centre"
}) => {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Help Centre', href: '/help-center' },
            { label: 'Accepted payment methods', isCurrentPage: true }
          ]}
          className="mb-6"
        />

        <Link href={backUrl} className="inline-flex items-center text-[#C8102E] hover:text-[#A00E26] transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {backText}
        </Link>

        <PageHeader
          title={title}
          description={description}
          iconComponent={CreditCard}
          variant="help-center"
          size="large"
        />
      </div>
    </section>
  );
};

export default PaymentMethodsHeader;
