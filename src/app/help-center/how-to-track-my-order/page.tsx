import Navbar from '../../../components/common/Navbar';
import Footer from '../../../components/common/Footer';
import {
  TrackOrderHeader,
  TrackOrderIntroduction,
  OrderStatusTimeline,
  TrackingMethods,
  TrackingFAQ,
  TrackingSupport
} from '../../../components/pages/help-center/how-to-track-my-order';

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <TrackOrderHeader />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12">
              
              <TrackOrderIntroduction />

              <OrderStatusTimeline />

              <TrackingMethods />

              <TrackingFAQ />

              <TrackingSupport />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
