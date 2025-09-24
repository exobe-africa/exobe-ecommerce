import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import {
  ReturnPolicyHeader,
  ReturnIntroduction,
  ReturnTimeframe,
  ReturnConditions,
  ReturnProcess,
  RefundInformation,
  ExchangePolicy,
  SpecialReturnPolicies,
  ReturnSupport
} from '../../../components/pages/help-center/return-policy-and-conditions';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <ReturnPolicyHeader />

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12">
              
              <ReturnIntroduction />

              <ReturnTimeframe />

              <ReturnConditions />

              <ReturnProcess />

              <RefundInformation />

              <ExchangePolicy />

              <SpecialReturnPolicies />

              <ReturnSupport />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
