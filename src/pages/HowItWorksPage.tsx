import React from 'react';
import { HowItWorks } from '../components/sections/HowItWorks';
import { CreditTransparency } from '../components/sections/CreditTransparency';
import { HelpCenter } from '../components/sections/HelpCenter';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="bg-[#F4F6FA]">
      <div className="bg-brand-navy text-white py-8 md:py-10 text-center">
        <h1 className="text-28 md:text-36 font-bold mb-2 text-white">How GrayQuest Works</h1>
        <p className="text-13 sm:text-14 md:text-15 text-white/80 max-w-4xl mx-auto px-4 whitespace-normal sm:whitespace-nowrap">
          A simple, 100% digital process to pay your education fees in easy monthly installments.
        </p>
      </div>
      <HowItWorks />
      <CreditTransparency />
      <HelpCenter />
    </div>
  );
};
