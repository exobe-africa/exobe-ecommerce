import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import {
  WarrantyHeader,
  WarrantyIntroduction,
  WarrantyCoverageTypes,
  WarrantyPeriods,
  WarrantyCoverageDetails,
  WarrantyClaimProcess,
  WarrantyDocumentation,
  WarrantyProcessingTimes,
  ExtendedWarrantyOptions,
  WarrantySupport
} from '../../../components/pages/help-center/product-warranty-information';

export default function ProductWarrantyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <WarrantyHeader />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12">
              
              <WarrantyIntroduction />

              <WarrantyCoverageTypes />

              <WarrantyPeriods />

              <WarrantyCoverageDetails />

              <WarrantyClaimProcess />

              <WarrantyDocumentation />

              <WarrantyProcessingTimes />

              <ExtendedWarrantyOptions />

              <WarrantySupport />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
