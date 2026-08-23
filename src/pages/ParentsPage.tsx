import React from 'react';
import { Calculator } from '../components/sections/Calculator';
import { ComparisonTable } from '../components/sections/ComparisonTable';
import { ForParents } from '../components/sections/ForParents';
import { PartnerStrip } from '../components/sections/PartnerStrip';

interface ParentsPageProps {
  onCheckEligibility: () => void;
  onStartApplication?: (data?: { schoolName: string; fee: number; tenure: number }) => void;
}

export const ParentsPage: React.FC<ParentsPageProps> = ({ onCheckEligibility, onStartApplication }) => {
  return (
    <div className="bg-[#F4F6FA]">
      <div className="bg-brand-navy text-white py-8 md:py-10 text-center border-b border-brand-navy/20">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-blue/20 text-brand-blue rounded-full text-11 font-bold mb-2 border border-brand-blue/30">
          Zero-Stress Education Planning
        </span>
        <h1 className="text-28 md:text-36 font-bold mb-2 text-white">For Parents & Guardians</h1>
        <p className="text-13 sm:text-14 md:text-15 text-white/80 max-w-5xl mx-auto px-4 whitespace-normal sm:whitespace-nowrap">
          Calculate your monthly installment plan and explore transparent 0% interest education fee financing across 6,500+ partner schools.
        </p>
      </div>

      {/* 1. Calculator at the Top of Parents Page */}
      <Calculator 
        onCheckEligibility={onCheckEligibility} 
        onStartApplication={onStartApplication}
      />

      {/* 2. Compact Comparison Table */}
      <ComparisonTable />

      {/* 3. Core Benefits, Stories & Stats */}
      <ForParents onCheckEligibility={onCheckEligibility} />

      {/* 4. Partner Schools & Institutes Strip */}
      <div className="py-10 bg-white border-t border-brand-border/60">
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <h4 className="text-18 font-bold text-brand-navy mb-6">Over 6,500 Partner Schools & Institutes</h4>
          <PartnerStrip />
        </div>
      </div>
    </div>
  );
};

