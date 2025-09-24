import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import {
  DeliveryHeader,
  DeliveryIntroduction,
  DeliveryOptions,
  DeliveryCoverageAreas,
  DeliverySchedule,
  DeliveryImportantNotes,
  DeliverySupport
} from '../../../components/pages/help-center/delivery-times-and-areas';

export default function DeliveryTimesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <DeliveryHeader />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12">
              
              <DeliveryIntroduction />

              <DeliveryOptions />

              <DeliveryCoverageAreas />

              <DeliverySchedule />

              <DeliveryImportantNotes />

              <DeliverySupport />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
