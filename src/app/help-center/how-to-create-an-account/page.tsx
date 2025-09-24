import {
  AccountCreationHeader,
  AccountIntroduction,
  AccountBenefits,
  StepByStepGuide,
  AccountSecurity,
  AccountTroubleshooting,
  AccountSupport
} from '../../../components/pages/help-center/how-to-create-an-account';

export default function CreateAccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <AccountCreationHeader />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 lg:p-12">
              
              <AccountIntroduction />

              <AccountBenefits />

              <StepByStepGuide />

              <AccountSecurity />

              <AccountTroubleshooting />

              <AccountSupport />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
