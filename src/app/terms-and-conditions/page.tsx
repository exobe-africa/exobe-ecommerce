import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export const metadata = {
  title: "Terms & Conditions - eXobe",
  description: "Terms and Conditions for eXobe e-commerce platform",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#000000] mb-4">eXobe Terms & Conditions</h1>
            <div className="text-sm text-[#4A4A4A] space-y-1">
              <p><strong>Effective Date:</strong> 16 July 2025</p>
              <p><strong>Company Name:</strong> eXobe (Pty) Ltd</p>
              <p><strong>Registration Number:</strong> 2016/474470/07</p>
              <p><strong>Registered Address:</strong> 8 Ashwood Drive, Clubview, Centurion, 0185, South Africa</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">1. Introduction</h2>
              <p className="text-[#4A4A4A] mb-4">
                Welcome to eXobe. These Terms and Conditions ("Terms") govern your access to and use of 
                our online marketplace, including our website, mobile applications, and related services 
                (collectively, the "Platform").
              </p>
              <p className="text-[#4A4A4A] mb-4">
                The Platform is operated by eXobe (Pty) Ltd (Registration No. 2016/474470/07), based at 8 
                Ashwood Drive, Clubview, Centurion, 0185, South Africa ("eXobe", "we", "us", or "our").
              </p>
              <p className="text-[#4A4A4A] mb-4">
                By accessing or using our Platform, you confirm that you have read, understood, and agree 
                to be bound by these Terms. If you do not agree to these Terms, do not use the Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>"User" refers to any person who accesses or uses the Platform.</li>
                <li>"Registered User" means a user who has created an account.</li>
                <li>"Seller", "Service Provider", "Third Party Vendor" refers to businesses or individuals 
                    who list and sell products or services on the Platform.</li>
                <li>"Buyer" refers to users who purchase products or services.</li>
                <li>"Product" means any item listed for sale.</li>
                <li>"Service" refers to any bookable offering from a Service Provider.</li>
                <li>"eXobe Coin" refers to stored-value platform credits equivalent to ZAR.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">3. Platform Access and User Eligibility</h2>
              <p className="text-[#4A4A4A] mb-4">
                You must be at least 18 years old to use the Platform. If you are under 18, your legal 
                guardian must supervise your use and agree to these Terms on your behalf.
              </p>
              <p className="text-[#4A4A4A] mb-4">
                You ensure that all information you provide to eXobe is true, accurate, and current. You are 
                responsible for maintaining the confidentiality of your account credentials and for all activities 
                under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">4. Use of Platform</h2>
              <p className="text-[#4A4A4A] mb-2">You may not:</p>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>Interfere with the proper functioning of the Platform</li>
                <li>Use bots or scraping tools without written consent from an eXobe representative</li>
                <li>Post or transmit content that is unlawful, offensive, or infringes content</li>
                <li>Misrepresent your identity or affiliation</li>
              </ul>
              <p className="text-[#4A4A4A] mt-4">
                eXobe may suspend or terminate access for violations of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">5. Platform Access Limitations</h2>
              <p className="text-[#4A4A4A] mb-4">
                eXobe reserves the right to limit or restrict Platform access temporarily or permanently, 
                including during high traffic periods, for scheduled maintenance, or for security reasons. We 
                may also disable access to suspected misuse or abuse of the system.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">6. Orders and Bookings</h2>
              <p className="text-[#4A4A4A] mb-4">
                Placing a product order or service booking does not constitute acceptance. Acceptance 
                occurs only when:
              </p>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>The product is dispatched or collected, or</li>
                <li>The service is confirmed by the provider or rendered</li>
              </ul>
              <p className="text-[#4A4A4A] mt-4">
                eXobe and Third Party Vendors may reject or cancel any order/booking at their discretion, 
                including due to unavailability or incorrect pricing.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">7. Prohibited Products & Services</h2>
              <p className="text-[#4A4A4A] mb-4">
                No Service Provider may upload offerings independently. All services must be configured 
                and approved by eXobe Admin to ensure they meet our ethical, moral, financial, and social 
                standards. This includes prohibition against adult, dangerous, or inappropriate categories such 
                as counterfeit goods, illicit services, or products violating South African laws. We reserve the 
                right to remove any listing that violates these principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">8. Product Listings, Pricing, and Stock</h2>
              <p className="text-[#4A4A4A] mb-4">
                eXobe does not take responsibility for stock and relies solely on inventory information supplied 
                by the relevant Seller. Therefore, eXobe bears no liability for any inaccuracies in the 
                information supplied to us.
              </p>
              <p className="text-[#4A4A4A] mb-4">
                Consequently, should you order any Products from a Seller which are in fact sold-out, any 
                resulting dispute should be resolved between you and the relevant Seller. Your respective 
                rights and obligations being as set out in these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">9. Payment Terms</h2>
              <p className="text-[#4A4A4A] mb-4">
                We use secure third-party gateways (Ozow, PayFast, Yoco). Payment methods include:
              </p>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>Credit/debit cards</li>
                <li>EFT</li>
                <li>Instant EFT</li>
                <li>eXobe Wallet</li>
              </ul>
              <p className="text-[#4A4A4A] mt-4">
                Funds from the day-to-day purchases are not released directly to Seller/Service Providers. 
                Payouts occur in weekly or bi-weekly batches, depending on the risk profile and trust score.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">10. Television Purchases</h2>
              <p className="text-[#4A4A4A] mb-4">
                Any order of a television will be subject to the condition that we obtain from you your valid 
                TV licence number or other related licence. If we do not receive your TV licence number 
                and your account holder ID, or your TV licence number cannot be validated, you will be 
                able to collect your television from the location number supplied to you in your shopping cart.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">11. Delivery</h2>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>Our delivery charges are subject to change at any time, without prior notice to you. You 
                    will see the applicable delivery charges when you check out.</li>
                <li>Deliveries are made via our logistics partners to the user's nominated address. eXobe 
                    currently does not deliver to collection points. Fulfillment is currently managed by eXobe 
                    and may be outsourced to third party fulfilment partners at a later stage. Risk 
                    passes upon delivery.</li>
                <li>If we are unable to deliver or may cancel the order within 7 (seven) days of receiving your order 
                    of the delay. In case of cancellation, your reimbursement will be processed accordingly.</li>
                <li>eXobe is not liable for any loss or damage to the products after they have been 
                    delivered to the physical address nominated by you.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">12. Service Levels & Timelines</h2>
              <p className="text-[#4A4A4A] mb-2">We aim to:</p>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>Deliver products within 4-10 business days (unless otherwise communicated)</li>
                <li>Process refunds or wallet credits within 5-7 business days after approval</li>
                <li>Respond to customer service inquiries within 24-48 business hours</li>
              </ul>
              <p className="text-[#4A4A4A] mt-4">
                These timeframes may vary due to stock availability, regional delivery constraints, or force 
                majeure events.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">13. Returns and Refunds</h2>
              <p className="text-[#4A4A4A] mb-4">
                Returns must follow eXobe's Return Policy, including:
              </p>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>7 days for unwanted items</li>
                <li>30 days for incorrect or damaged items</li>
                <li>6 months for defects (unless otherwise specified)</li>
              </ul>
              <p className="text-[#4A4A4A] mt-4">
                Refunds are processed via wallet credits by default. Cash refunds must be requested within 
                2-3 days post-purchase and may be subject to chargeback processes and Seller penalties.
              </p>
              <p className="text-[#4A4A4A] mt-4">
                Items must be returned in original packaging with all components. See the full Return Policy 
                for details.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">14. eXobe Coins</h2>
              <p className="text-[#4A4A4A] mb-4">
                eXobe Coins are non-transferable stored-value credits equivalent to South African Rand. 
                They may be earned or applied during transactions. Coins are not traditional loyalty points 
                and may not be redeemed for cash unless required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">15. Subscriptions</h2>
              <p className="text-[#4A4A4A] mb-4">
                eXobe may offer future offer subscription services for enhanced features or access. These 
                offerings will be governed by separate terms and include clear cancellation and renewal 
                procedures. Pricing will be updated accordingly upon launch.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">16. Cancellations</h2>
              <p className="text-[#4A4A4A] mb-4">
                Orders and bookings may be cancelled before dispatch or service confirmation. Post-
                fulfillment cancellations must be handled as returns.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">17. Third Party Vendors and Trust Score</h2>
              <p className="text-[#4A4A4A] mb-4">
                Sellers and Service Providers must maintain high service reliability. eXobe monitors 
                responsiveness and fulfillment. Repeated unresponsiveness or failed fulfillments may result in 
                suspensions.
              </p>
              <p className="text-[#4A4A4A] mb-4">
                Services cannot be self-uploaded. Only those pre-approved and configured by eXobe 
                Admin may be listed, ensuring quality control and ethical compliance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">18. Account Suspension, Review, and Approval</h2>
              <p className="text-[#4A4A4A] mb-4">
                eXobe may suspend or terminate a user account for the following reasons:
              </p>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>Repeated failure to fulfill orders or appointments</li>
                <li>Non-responsiveness beyond acceptable thresholds</li>
                <li>Fraudulent activity or platform abuse</li>
                <li>Violation of community guidelines</li>
              </ul>
              <p className="text-[#4A4A4A] mt-4">
                Suspensions may be temporary or permanent. Users will be notified via email and may 
                submit a written appeal to the eXobe Admin Team within 10 business days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">19. Intellectual Property</h2>
              <p className="text-[#4A4A4A] mb-4">
                All content on the Platform is owned or licenced by eXobe. You may not reproduce or 
                distribute any part of the Platform without written permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">20. Platform Modifications and Availability</h2>
              <p className="text-[#4A4A4A] mb-4">
                We may update, suspend, or remove parts of the Platform at any time. We aim for 24/7 
                uptime but do not guarantee uninterrupted access.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">21. Limitation of Liability</h2>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>eXobe is not liable for indirect, incidental, or consequential damages. Use of the 
                    Platform is at your own risk and we do not warrant uninterrupted functionality or error-free 
                    operation.</li>
                <li>eXobe only provides the platform to facilitate transactions between Sellers and eXobe 
                    customers. eXobe is neither the buyer nor the seller of these Products unless otherwise 
                    specified.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">22. Data Protection and Privacy</h2>
              <p className="text-[#4A4A4A] mb-4">
                We collect and process personal information in line with POPIA. For full details, see our 
                Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">23. Termination</h2>
              <p className="text-[#4A4A4A] mb-4">
                We may suspend or terminate your account for violations of these Terms or suspected 
                fraud. You may stop using the Platform at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">24. Governing Law and Dispute Resolution</h2>
              <p className="text-[#4A4A4A] mb-4">
                These Terms are governed by the laws of South Africa. Any disputes will be subject to the 
                jurisdiction of the High Court of South Africa (North Gauteng Division).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">25. Force Majeure</h2>
              <p className="text-[#4A4A4A] mb-4">
                eXobe shall not be liable for any failure to perform, or delay in performance of any of our 
                obligations under these Terms that is caused by events outside our reasonable control, 
                including but not limited to acts of God, fire, flood, epidemic, pandemic, explosion, war, 
                terrorism, embargos, government order, labour dispute, or internet service provider 
                failure. In such cases, our obligations will be suspended for the duration of the event.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">26. Warranties & Defects</h2>
              <p className="text-[#4A4A4A] mb-4">
                Products sold on the Platform may carry manufacturer warranties under certain clearly 
                defined circumstances. We do not provide additional warranties and disclaim all 
                warranties of any kind, whether express or implied, including but not limited to implied 
                warranties of merchantability, fitness for a particular purpose, or non-
                infringement.
              </p>
              <p className="text-[#4A4A4A] mb-4">
                eXobe disclaims all liability related to the content or information on the Platform, including 
                any errors, inaccuracies, viruses, malware, or other potentially harmful components. You 
                assume all risks related to the use of the Platform and any connected services, unless such 
                risks result from our gross negligence or misconduct as instructed by eXobe.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">27. Deals & Promotions</h2>
              <p className="text-[#4A4A4A] mb-4">
                eXobe may from time to time offer discounts, coupons, flash sales, and promotional 
                bundles ("Deals"). These Deals are subject to availability and may be withdrawn or changed 
                without notice. eXobe reserves the right to reject transactions that take advantage of errors 
                or outside of stated promotional conditions. Terms specific to each Deal will be outlined at 
                the time of the offer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">28. User Content & Reviews</h2>
              <p className="text-[#4A4A4A] mb-4">
                Registered Users may leave reviews or comments. By doing so, you grant eXobe a royalty-
                free, irrevocable licence to use, copy, modify, publish, or display such user content across 
                our platforms. You are responsible for ensuring you have all rights in your content, and 
                user-submitted content. Content may be edited or removed at our discretion.
              </p>
              <p className="text-[#4A4A4A] mb-4">User content must not:</p>
              <ul className="list-disc pl-6 text-[#4A4A4A] space-y-2">
                <li>Include hate speech, harassment, or abuse</li>
                <li>Violate laws or promote illegal activities</li>
                <li>Contains promotional links or spam</li>
                <li>Uses vulgar, obscene, or otherwise offensive language</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">29. Third-Party Content</h2>
              <p className="text-[#4A4A4A] mb-4">
                We do not endorse any third-party content, and eXobe disclaims responsibility for any third-party 
                content submitted by users. Users are solely responsible for the accuracy, quality, legality, and 
                reliability of their submissions and postings.
              </p>
              <p className="text-[#4A4A4A] mb-4">
                Moderation decisions are final, and content may be removed without notice. Repeated 
                abuse of review features may lead to account suspension or limitation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">30. Customer Support</h2>
              <p className="text-[#4A4A4A] mb-4">
                If you have any queries regarding orders, bookings, refunds, or Platform use, please contact 
                our support team at info@exobe.africa. Our support hours are Monday to Thursday, 9AM 
                - 5PM SAST. We aim to respond to inquiries within 24-48 hours.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">31. Fraud & Abuse</h2>
              <p className="text-[#4A4A4A] mb-4">
                eXobe reserves the right to suspend or terminate user accounts that are suspected of 
                fraudulent activity, abuse of promotions, or violation of platform integrity (e.g., creating 
                multiple accounts for personal gain).
              </p>
              <p className="text-[#4A4A4A] mb-4">
                We may cancel transactions and blacklist users where abuse is detected. eXobe will only be 
                liable to refund monies for verified purchases, and accepts no further liability resulting from 
                such suspension or cancellations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">32. Mobile App Usage</h2>
              <p className="text-[#4A4A4A] mb-4">
                eXobe grants you a limited, non-exclusive, non-transferable, revocable licence to use our 
                mobile application solely for accessing the Platform. You must not reverse engineer, modify, 
                or distribute the application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">33. Contact Information</h2>
              <div className="text-[#4A4A4A] space-y-2">
                <p><strong>Legal Address:</strong> eXobe (Pty) Ltd, 8 Ashwood Drive, Clubview, Centurion, South Africa</p>
                <p><strong>Email:</strong> info@exobe.africa</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#000000] mb-4">34. Complaints and Consumer Rights</h2>
              <p className="text-[#4A4A4A] mb-4">
                We are a participant under the Consumer Goods and Services Ombud (CGSO). If we don't 
                resolve your complaint within 15 business days, you may escalate it to CGSO.
              </p>
              <div className="text-[#4A4A4A] space-y-2">
                <p><strong>Website:</strong> www.cgso.org.za</p>
                <p><strong>Email:</strong> complaints@cgso.org.za</p>
                <p><strong>Shortcode:</strong> (086) 000 272</p>
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
