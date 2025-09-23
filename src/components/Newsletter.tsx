"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log("Newsletter subscription for:", email);
    // Reset form
    setEmail("");
    // You could show a success message here
    alert("Thank you for subscribing! You'll receive 10% off your first order.");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-full text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
          />
          <button 
            type="submit"
            className="bg-[#C8102E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#A00E26] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:ring-offset-2 focus:ring-offset-black"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
