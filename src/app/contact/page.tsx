"use client";

import { 
  ContactHeroSection, 
  ContactMethodsSection, 
  ContactFormSection, 
  OfficeLocationsSection, 
  DepartmentDirectorySection, 
  FAQSocialSection 
} from '../../components/pages/contact';
import { Newsletter } from '@/components/common';

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      
      <ContactHeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ContactMethodsSection />

        <section className="mb-20">
          <ContactFormSection />
        </section>

        <section className="mb-20">
          <OfficeLocationsSection />
        </section>

        <DepartmentDirectorySection />

        <FAQSocialSection />
      </div>
      <Newsletter />
    </div>
  );
}
