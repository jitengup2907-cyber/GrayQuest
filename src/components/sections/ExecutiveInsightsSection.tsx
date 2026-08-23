import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, TrendingUp, ShieldCheck, CheckCircle2, 
  Building2, Zap, Award, Target, FileText, ArrowRight, Shield, Layers 
} from 'lucide-react';
import { ExecutiveInsightsModal } from '../ExecutiveInsightsModal';

export const ExecutiveInsightsSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-8 md:py-10 bg-[#EDF1F6] border-y border-brand-border/60">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-navy text-brand-green rounded-full text-11 font-bold mb-2 border border-brand-green/30">
              <Zap size={12} />
              <span>Next-Gen FinTech Architecture</span>
            </div>
            <h2 className="text-22 md:text-28 font-bold text-brand-navy">
              Institutional Intelligence & Operational Differentiation
            </h2>
            <p className="text-13 text-brand-muted mt-1 max-w-3xl">
              Engineered with empirical insights from 19,164 parent applications across Sri Chaitanya, Narayana, and IITs to deliver maximum conversion and zero NBFC default risk.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-xl font-bold text-12 hover:bg-brand-navy/90 transition-all shadow-sm cursor-pointer shrink-0"
          >
            <BarChart3 size={15} className="text-brand-green" />
            <span>Explore Executive Research Hub</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs hover:border-brand-blue transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <TrendingUp size={20} />
            </div>
            <h4 className="font-bold text-15 text-brand-navy">86.81% Auto-Approval</h4>
            <p className="text-12 text-brand-muted leading-relaxed">
              PAN CIBIL score matching and Account Aggregator integration cuts drop-off by 38% compared to legacy manual verification.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs hover:border-brand-blue transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <h4 className="font-bold text-15 text-brand-navy">0% for 3 & 6 Months</h4>
            <p className="text-12 text-brand-muted leading-relaxed">
              Exact subvention schedules for Sri Chaitanya, Narayana & IITs (0% for 3/6M, 2% for 9M, 3.5% for 11M) with verified poster schedules.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs hover:border-brand-blue transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-15 text-brand-navy">Embedded Child Cover</h4>
            <p className="text-12 text-brand-muted leading-relaxed">
              Official Tata AIA & Kotak Life live integration guarantees child tuition continuity for ₹15L, ₹30L, and ₹50L sum assured.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-xs hover:border-brand-blue transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Shield size={20} />
            </div>
            <h4 className="font-bold text-15 text-brand-navy">19-Point Defaulter Shield</h4>
            <p className="text-12 text-brand-muted leading-relaxed">
              Automated pre-screening filters repeat default patterns before underwriting submission, protecting NBFC partner capital.
            </p>
          </div>
        </div>
      </div>

      <ExecutiveInsightsModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
