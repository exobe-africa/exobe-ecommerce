import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export const metadata = {
  title: "Privacy Policy - eXobe",
  description: "Privacy Policy for eXobe e-commerce platform",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">Privacy Policy</h1>
            <div className="text-sm text-[#4A4A4A] space-y-1">
              <p><strong>Effective Date:</strong> 16 July 2025</p>
              <p><strong>Last Updated:</strong> 16 July 2025</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Introduction</h2>
              <p className="text-[#4A4A4A] mb-4">
                eXobe (Pty) Ltd ("we", "our", or "us") respects your privacy and is committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
              <p className="text-[#4A4A4A] mb-4">
                This policy complies with the Protection of Personal Information Act (POPIA) and other applicable South African laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-[#000000] mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-4">
                <li>Name, email address, phone number</li>
                <li>Billing and delivery addresses</li>
                <li>Payment information (processed securely by third-party providers)</li>
                <li>Account credentials and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#000000] mb-3">Usage Information</h3>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2 mb-4">
                <li>Browsing history and search queries</li>
                <li>Device information and IP address</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Purchase history and preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>Process orders and provide customer service</li>
                <li>Personalise your shopping experience</li>
                <li>Send order confirmations and updates</li>
                <li>Improve our platform and services</li>
                <li>Prevent fraud and ensure security</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Information Sharing</h2>
              <p className="text-[#4A4A4A] mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>Third-party vendors and service providers who assist in our operations</li>
                <li>Payment processors for transaction processing</li>
                <li>Delivery partners for order fulfillment</li>
                <li>Law enforcement when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
              <p className="text-[#4A4A4A] mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Data Security</h2>
              <p className="text-[#4A4A4A] mb-4">
                We implement appropriate technical and organisational measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Secure payment processing</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Staff training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Your Rights</h2>
              <p className="text-[#4A4A4A] mb-4">
                Under POPIA, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>Access your personal information</li>
                <li>Correct or update your information</li>
                <li>Delete your personal information</li>
                <li>Object to processing of your information</li>
                <li>Withdraw consent at any time</li>
                <li>Data portability</li>
                <li>Lodge a complaint with the Information Regulator</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Cookies and Tracking</h2>
              <p className="text-[#4A4A4A] mb-4">
                We use cookies and similar technologies to enhance your experience, analyse usage, and provide personalised content. 
                You can manage your cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Data Retention</h2>
              <p className="text-[#4A4A4A] mb-4">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, 
                comply with legal obligations, and resolve disputes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Third-Party Links</h2>
              <p className="text-[#4A4A4A] mb-4">
                Our platform may contain links to third-party websites. We are not responsible for the privacy practices 
                of these external sites. Please review their privacy policies before providing any information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Children's Privacy</h2>
              <p className="text-[#4A4A4A] mb-4">
                Our platform is not intended for children under 18. We do not knowingly collect personal information 
                from children under 18 without parental consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Changes to This Privacy Policy</h2>
              <p className="text-[#4A4A4A] mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new policy on our platform and updating the effective date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Contact Us</h2>
              <p className="text-[#4A4A4A] mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="text-[#4A4A4A] space-y-2">
                <p><strong>Email:</strong> privacy@exobe.africa</p>
                <p><strong>Address:</strong> eXobe (Pty) Ltd, 8 Ashwood Drive, Clubview, Centurion, 0185, South Africa</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">Information Regulator</h2>
              <p className="text-[#4A4A4A] mb-4">
                If you believe we have not addressed your privacy concerns adequately, you may lodge a complaint 
                with the Information Regulator of South Africa:
              </p>
              <div className="text-[#4A4A4A] space-y-2">
                <p><strong>Website:</strong> www.inforegulator.org.za</p>
                <p><strong>Email:</strong> inforeg@justice.gov.za</p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-[#4A4A4A] text-center">
                Last updated: July 16, 2025
              </p>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
