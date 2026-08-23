import React from 'react';
import { Hero } from '../components/sections/Hero';
import { ExecutiveInsightsSection } from '../components/sections/ExecutiveInsightsSection';
import { PartnerStrip } from '../components/sections/PartnerStrip';
import { ArrowRight, Users, School, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  onCheckEligibility: () => void;
  onApplyNow: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onCheckEligibility, onApplyNow }) => {
  return (
    <div className="bg-[#F4F6FA]">
      {/* 1. Hero with Quick Action Cards & NBFC Partners */}
      <Hero onCheckEligibility={onCheckEligibility} onApplyNow={onApplyNow} />

      {/* 2. Three Dedicated Portals Strip (Non-repetitive high-level gateways) */}
      <section className="py-8 md:py-10 bg-[#EDF1F6] border-b border-brand-border/60">
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-11 font-bold text-brand-blue uppercase tracking-wider bg-brand-blue/10 px-2.5 py-1 rounded-full">
              Explore GrayQuest
            </span>
            <h2 className="text-22 md:text-28 font-bold text-brand-navy mt-1.5">
              India's Dedicated Education Financing Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* For Parents */}
            <div className="bg-[#FAFBFD] p-5 rounded-2xl border border-brand-border shadow-2xs hover:shadow-md hover:border-brand-blue/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-3.5 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <Users size={20} />
                </div>
                <h3 className="text-17 font-bold text-brand-navy mb-1.5">For Parents & Students</h3>
                <p className="text-13 text-brand-muted leading-relaxed mb-3">
                  Convert annual tuition into 0% interest monthly installments with complimentary student life cover.
                </p>
              </div>
              <Link 
                to="/parents" 
                className="inline-flex items-center gap-1.5 text-13 font-bold text-brand-blue hover:text-brand-navy pt-3 border-t border-slate-200/80"
              >
                <span>Calculate & Explore Parents Hub</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* For Institutions */}
            <div className="bg-[#FAFBFD] p-5 rounded-2xl border border-brand-border shadow-2xs hover:shadow-md hover:border-brand-navy/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-3.5 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                  <School size={20} />
                </div>
                <h3 className="text-17 font-bold text-brand-navy mb-1.5">For Schools & Colleges</h3>
                <p className="text-13 text-brand-muted leading-relaxed mb-3">
                  100% upfront fee collection on Day 1, zero default risk, and ARC auto-reconciliation ledger dashboard.
                </p>
              </div>
              <Link 
                to="/schools" 
                className="inline-flex items-center gap-1.5 text-13 font-bold text-brand-navy hover:text-brand-blue pt-3 border-t border-slate-200/80"
              >
                <span>Explore Institutional Solutions</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* How It Works */}
            <div className="bg-[#FAFBFD] p-5 rounded-2xl border border-brand-border shadow-2xs hover:shadow-md hover:border-emerald-500/30 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Zap size={20} />
                </div>
                <h3 className="text-17 font-bold text-brand-navy mb-1.5">Process & Credit Rules</h3>
                <p className="text-13 text-brand-muted leading-relaxed mb-3">
                  100% digital 4-step KYC process with instant pre-approval and complete CIBIL score transparency.
                </p>
              </div>
              <Link 
                to="/how-it-works" 
                className="inline-flex items-center gap-1.5 text-13 font-bold text-emerald-700 hover:text-emerald-900 pt-3 border-t border-slate-200/80"
              >
                <span>Read How It Works</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Executive Insights & Impact Metrics */}
      <ExecutiveInsightsSection />

      {/* 4. Partner Institutions Marquee */}
      <div className="py-8 md:py-10 bg-[#F4F6FA] border-t border-brand-border/60">
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <span className="text-11 font-bold text-brand-muted uppercase tracking-wider mb-1.5 block">
            Nationwide Institutional Network
          </span>
          <h3 className="text-20 md:text-24 font-bold text-brand-navy mb-5">
            Trusted by 6,500+ Top Schools, Colleges & Coaching Academies
          </h3>
          <PartnerStrip />
        </div>
      </div>
    </div>
  );
};

