import React from 'react';
import { AboutAndCareers } from '../components/sections/AboutAndCareers';
import { HelpCenter } from '../components/sections/HelpCenter';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-[#F4F6FA]">
      <div className="bg-brand-blue text-white py-8 md:py-10 text-center">
        <h1 className="text-28 md:text-36 font-bold mb-2 text-white">About GrayQuest</h1>
        <p className="text-13 sm:text-14 md:text-15 text-white/90 max-w-4xl mx-auto px-4 whitespace-normal sm:whitespace-nowrap">
          India's leading education fee financing platform, dedicated to making quality education accessible.
        </p>
      </div>
      <AboutAndCareers />
      <HelpCenter />
    </div>
  );
};
