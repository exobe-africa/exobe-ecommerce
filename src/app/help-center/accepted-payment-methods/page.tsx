import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import {
  PaymentMethodsHeader,
  PaymentIntroduction,
  PaymentMethodsGrid,
  PaymentSecurity,
  PaymentProcess,
  PaymentIssues,
  CurrencyPricing,
  PaymentSupport
} from '../../../components/accepted-payment-methods';

export default function PaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <PaymentMethodsHeader />

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12">
              
              <PaymentIntroduction />

              <PaymentMethodsGrid />

              <PaymentSecurity />

              <PaymentProcess />

              <PaymentIssues />

              <CurrencyPricing />

              <PaymentSupport />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
