"use client";

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  ContactHeroSection, 
  ContactMethodsSection, 
  ContactFormSection, 
  OfficeLocationsSection, 
  DepartmentDirectorySection, 
  FAQSocialSection 
} from '../../components/contact';

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ContactHeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ContactMethodsSection />

        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactFormSection />

            <OfficeLocationsSection />
          </div>
        </section>

        <DepartmentDirectorySection />

        <FAQSocialSection />
      </div>

      <Footer />
    </div>
  );
}
