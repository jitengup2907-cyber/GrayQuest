import React from 'react';
import { HelpCenter } from '../components/sections/HelpCenter';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-[#F4F6FA]">
      <div className="bg-brand-navy text-white py-8 md:py-10 text-center">
        <h1 className="text-28 md:text-36 font-bold mb-2 text-white">Contact Us</h1>
        <p className="text-14 md:text-16 text-white/70 max-w-3xl mx-auto px-4">
          Have questions? Our support team is here to help you.
        </p>
      </div>
      <HelpCenter />
    </div>
  );
};
