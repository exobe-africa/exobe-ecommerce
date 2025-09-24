import Link from 'next/link';
import { Checkbox } from '../../index';

interface TermsAndNewsletterProps {
  formData: {
    agreeToTerms: boolean;
    subscribeNewsletter: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TermsAndNewsletter: React.FC<TermsAndNewsletterProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <Checkbox
          id="agreeToTerms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={(checked) => onInputChange({ target: { name: 'agreeToTerms', type: 'checkbox', checked } } as React.ChangeEvent<HTMLInputElement>)}
          required
          label={
            <span className="text-sm leading-relaxed">
              I agree to the{' '}
              <Link href="/terms-and-conditions" className="text-[#C8102E] hover:text-[#A00E26] font-semibold underline">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="text-[#C8102E] hover:text-[#A00E26] font-semibold underline">
                Privacy Policy
              </Link>
            </span>
          }
        />
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <Checkbox
          id="subscribeNewsletter"
          name="subscribeNewsletter"
          checked={formData.subscribeNewsletter}
          onChange={(checked) => onInputChange({ target: { name: 'subscribeNewsletter', type: 'checkbox', checked } } as React.ChangeEvent<HTMLInputElement>)}
          label="Subscribe to our newsletter for exclusive offers and updates"
        />
      </div>
    </div>
  );
};

export default TermsAndNewsletter;
