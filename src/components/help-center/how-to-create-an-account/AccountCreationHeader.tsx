"use client";

import Link from 'next/link';
import { ArrowLeft, User } from 'lucide-react';
import { Breadcrumb, PageHeader } from '../../index';

interface AccountCreationHeaderProps {
  title?: string;
  description?: string;
  backUrl?: string;
  backText?: string;
}

const AccountCreationHeader: React.FC<AccountCreationHeaderProps> = ({
  title = "How to Create an Account",
  description = "Account & Profile",
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
            { label: 'How to create an account', isCurrentPage: true }
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
          iconComponent={User}
          variant="help-center"
          size="large"
        />
      </div>
    </section>
  );
};

export default AccountCreationHeader;
