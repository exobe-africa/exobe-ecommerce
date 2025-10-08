"use client";

import { Send, CheckCircle } from 'lucide-react';
import { useContactStore } from '../../../store/contact';
import { useToast } from '../../../context/ToastContext';

// Import the store again for direct access
import { useContactStore as useContactStoreDirect } from '../../../store/contact';

const ContactFormSection = () => {
  const { showSuccess, showError } = useToast();

  const {
    formData,
    isSubmitting,
    isSubmitted,
    validationErrors,
    departments,
    setFormData,
    sendMessage,
    validateAndSetErrors,
    resetForm
  } = useContactStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value } as any);

    if (validationErrors[name]) {
      const newErrors = { ...validationErrors };
      delete newErrors[name];
      useContactStoreDirect.setState({ validationErrors: newErrors });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateAndSetErrors(formData);
    const errors = Object.keys(useContactStoreDirect.getState().validationErrors);
    if (errors.length > 0) {
      return;
    }

    const result = await sendMessage(formData);
    if (result.success) {
      showSuccess('Message sent successfully! We\'ll get back to you within 24 hours.');
      setTimeout(() => {
        resetForm();
      }, 3000);
    } else {
      showError(result.error || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#000000] mb-4">Send Us a Message</h2>
        <p className="text-[#4A4A4A]">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent Successfully!</h3>
          <p className="text-[#4A4A4A]">
            Thank you for contacting us. We'll respond within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#000000] placeholder-gray-700 ${
                  validationErrors.name
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
                }`}
                placeholder="Enter your full name"
              />
              {validationErrors.name && <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#000000] placeholder-gray-700 ${
                  validationErrors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
                }`}
                placeholder="Enter your email address"
              />
              {validationErrors.email && <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#000000] placeholder-gray-700 ${
                  validationErrors.phone
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
                }`}
                placeholder="Enter your phone number"
              />
              {validationErrors.phone && <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[#000000] mb-2">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-colors text-[#000000]"
              >
                {departments.map((dept, index) => (
                  <option key={index} value={dept.email}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-[#000000] placeholder-gray-700 ${
                validationErrors.subject
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
              }`}
              placeholder="What's this about?"
            />
            {validationErrors.subject && <p className="mt-1 text-sm text-red-600">{validationErrors.subject}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#000000] mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none text-[#000000] placeholder-gray-700 ${
                validationErrors.message
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#C8102E] focus:border-transparent'
              }`}
              placeholder="Tell us more about your inquiry..."
            />
            {validationErrors.message && <p className="mt-1 text-sm text-red-600">{validationErrors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#C8102E] hover:bg-[#A00E26] text-white'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Sending Message...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactFormSection;
