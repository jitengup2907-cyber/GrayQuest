import React from 'react';
import { ForSchools } from '../components/sections/ForSchools';
import { PartnerStrip } from '../components/sections/PartnerStrip';

export const SchoolsPage: React.FC = () => {
  return (
    <div className="bg-[#F4F6FA]">
      <div className="bg-brand-navy text-white py-8 md:py-10 text-center">
        <h1 className="text-28 md:text-36 font-bold mb-2 text-white">For Educational Institutions</h1>
        <p className="text-13 sm:text-14 md:text-15 text-white/80 max-w-5xl mx-auto px-4 whitespace-normal sm:whitespace-nowrap">
          Empower your parents with flexible payment options while ensuring 100% fee collection for your school.
        </p>
      </div>
      <ForSchools />
      <div className="py-8 md:py-10 bg-brand-surface">
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <h2 className="text-22 md:text-26 font-bold text-brand-navy mb-5">Trusted by India's Leading Schools</h2>
          <PartnerStrip />
        </div>
      </div>
    </div>
  );
};
