"use client";

import { useEffect } from "react";
import { useNewsletterStore } from "../../store/newsletter";
import { useToast } from "../../context/ToastContext";

export default function Newsletter() {
  const {
    formData,
    isSubmitting,
    isSubmitted,
    error,
    validationErrors,
    setFormData,
    subscribeToNewsletter,
    resetForm,
  } = useNewsletterStore();

  const { showToast } = useToast();

  useEffect(() => {
    if (isSubmitted) {
      showToast("Thank you for subscribing! You'll receive 10% off your first order.", "success");
      resetForm();
    }
  }, [isSubmitted, showToast, resetForm]);

  useEffect(() => {
    if (error) {
      showToast(error, "error");
    }
  }, [error, showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim() || isSubmitting) {
      return;
    }

    const result = await subscribeToNewsletter(formData.email);
    if (result.success) {
      // Success is handled in the useEffect above
    }
  };

  return (
    <section className="py-16 bg-[#000000]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-lg text-gray-300 mb-8">
          Subscribe to our newsletter and get 10% off your first order
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ email: e.target.value })}
            placeholder="Enter your email"
            required
            className={`flex-1 px-4 py-3 rounded-full text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent ${
              validationErrors.email ? 'border-red-500' : ''
            }`}
          />
          <button
            type="submit"
            disabled={isSubmitting || !formData.email.trim()}
            className={`px-8 py-3 rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:ring-offset-2 focus:ring-offset-black ${
              isSubmitting || !formData.email.trim()
                ? 'bg-[#C8102E]/50 text-white/70 cursor-not-allowed'
                : 'bg-[#C8102E] text-white hover:bg-[#A00E26]'
            }`}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {validationErrors.email && (
          <p className="text-red-400 mt-2 text-sm">{validationErrors.email}</p>
        )}
      </div>
    </section>
  );
}
