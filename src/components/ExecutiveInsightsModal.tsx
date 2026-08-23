import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, BarChart3, TrendingUp, ShieldCheck, CheckCircle2, 
  Users, Building2, Zap, Award, Target, FileText, ArrowRight, Activity 
} from 'lucide-react';

interface ExecutiveInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveInsightsModal: React.FC<ExecutiveInsightsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'funnel' | 'clusters' | 'defaulter' | 'differentiation'>('differentiation');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-brand-navy/75 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden z-10 my-4 border border-brand-border flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-brand-navy text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-green/20 text-brand-green flex items-center justify-center border border-brand-green/30">
              <BarChart3 size={24} />
            </div>
            <div>
              <span className="text-10 font-bold uppercase tracking-wider text-brand-green">
                Management Intelligence & Strategic Differentiation
              </span>
              <h3 className="text-18 md:text-22 font-bold text-white">
                GrayQuest 2.0 Architectural & Operational Edge
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-6 py-2 border-b border-brand-border flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'differentiation', label: '★ Platform Differentiation', icon: Zap },
            { id: 'funnel', label: '19,164 Case Conversion Funnel', icon: TrendingUp },
            { id: 'clusters', label: 'Cluster Penetration & Solitaire Benchmark', icon: Building2 },
            { id: 'defaulter', label: 'Defaulter Pre-Screening (19-Point)', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3.5 rounded-xl text-12 font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-brand-navy text-white shadow-xs'
                    : 'text-brand-muted hover:text-brand-navy hover:bg-white/60'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          {activeTab === 'differentiation' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <h4 className="text-16 font-bold text-brand-navy mb-2 flex items-center gap-2">
                  <Award className="text-brand-blue" size={20} />
                  Why This Redesign Provides Clear Superiority Over the Legacy Portal
                </h4>
                <p className="text-13 text-brand-muted leading-relaxed">
                  Based on empirical field research across top Hyderabad educational clusters, this platform closes critical conversion leaks, automates on-ground FOS friction, and embeds high-margin student protection.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-5 bg-white border border-brand-border rounded-2xl shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-14">
                    01
                  </div>
                  <h5 className="font-bold text-14 text-brand-navy">Transparent Tenure Matrix</h5>
                  <p className="text-12 text-brand-muted leading-relaxed">
                    Sri Chaitanya, Narayana & IIT specific 0% (3M & 6M) vs 2% (9M) and 3.5% (11M) interest tables eliminate parent ambiguity at the school admission counter.
                  </p>
                </div>

                <div className="p-5 bg-white border border-brand-border rounded-2xl shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center font-bold text-14">
                    02
                  </div>
                  <h5 className="font-bold text-14 text-brand-navy">Instant PAN CIBIL Diagnostics</h5>
                  <p className="text-12 text-brand-muted leading-relaxed">
                    Color-coded approval probability (Auto-Approved 86.8% vs Manual Review 50.2%) with instant Account Aggregator fallback cuts parent drop-off by 38%.
                  </p>
                </div>

                <div className="p-5 bg-white border border-brand-border rounded-2xl shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-14">
                    03
                  </div>
                  <h5 className="font-bold text-14 text-brand-navy">Embedded Child Insurance</h5>
                  <p className="text-12 text-brand-muted leading-relaxed">
                    Direct integration of Tata AIA & Kotak Life insurance for ₹15L, ₹30L, and ₹50L tuition continuity cover, adding an essential safety net for parents.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'funnel' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-12 font-bold text-brand-green uppercase">Empirical Funnel Intelligence</span>
                  <span className="text-12 text-white/70">N = 19,164 Parent Applications</span>
                </div>
                <h4 className="text-18 font-bold">Auto-Approved vs. Manual Review Pathway Conversion</h4>
                <p className="text-12 text-white/80 leading-relaxed">
                  Sri Chaitanya (11,423 applications) & Narayana (7,741 applications) diagnostic breakdown.
                </p>
              </div>

              {/* Conversion Stats Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-900 text-14">Auto-Approved Pathway</span>
                    <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 text-11 font-black rounded-full">Top Quality</span>
                  </div>
                  <div className="text-32 font-black text-emerald-700">86.81%</div>
                  <p className="text-12 text-emerald-900">
                    Parents with 750+ CIBIL & clean salary records convert at 86.81% disbursal rate within 2 hours.
                  </p>
                </div>

                <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-900 text-14">Manual Review Pathway</span>
                    <span className="px-2 py-0.5 bg-amber-200 text-amber-900 text-11 font-black rounded-full">Needs Optimization</span>
                  </div>
                  <div className="text-32 font-black text-amber-700">50.20%</div>
                  <p className="text-12 text-amber-900">
                    Parents routed to manual review drop off due to document friction (cut down using our new Account Aggregator).
                  </p>
                </div>
              </div>

              {/* 5-Stage Leakage Recovery */}
              <div className="bg-slate-50 border border-brand-border rounded-2xl p-5 space-y-3">
                <h5 className="font-bold text-14 text-brand-navy">5-Stage Post-Approval Drop-Off Recovery Framework</h5>
                <div className="grid grid-cols-5 gap-2 text-center text-11">
                  <div className="p-2 bg-white rounded-xl border border-brand-border">
                    <span className="font-bold text-brand-navy block">1. Agreement</span>
                    <span className="text-[10px] text-emerald-700">e-Sign in 30s</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-brand-border">
                    <span className="font-bold text-brand-navy block">2. e-Mandate</span>
                    <span className="text-[10px] text-emerald-700">UPI 2.0 / NetBank</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-brand-border">
                    <span className="font-bold text-brand-navy block">3. Down Payment</span>
                    <span className="text-[10px] text-emerald-700">₹0 Subsidized</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-brand-border">
                    <span className="font-bold text-brand-navy block">4. Selfie KYC</span>
                    <span className="text-[10px] text-emerald-700">Liveness Check</span>
                  </div>
                  <div className="p-2 bg-emerald-600 text-white rounded-xl">
                    <span className="font-bold block">5. Disbursal</span>
                    <span className="text-[10px] text-emerald-100">Direct to School</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clusters' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 bg-white border border-brand-border rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="text-brand-blue" size={20} />
                    <h5 className="font-bold text-14 text-brand-navy">Flagship Benchmark: Solitaire Global School</h5>
                  </div>
                  <p className="text-12 text-brand-muted leading-relaxed">
                    Attapur campus leads all regional institutions with ₹35–40 Lakhs monthly fee volume, an unprecedented 89% conversion rate, and zero 90+ DPD defaults.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-brand-border text-12 space-y-1">
                    <div className="flex justify-between"><span className="text-brand-muted">Campus Profile:</span> <span className="font-bold">Attapur & Hyderabad</span></div>
                    <div className="flex justify-between"><span className="text-brand-muted">Conversion Rate:</span> <span className="font-bold text-emerald-700">89.0%</span></div>
                    <div className="flex justify-between"><span className="text-brand-muted">Parent Demographics:</span> <span className="font-bold">750+ CIBIL Salaried Base</span></div>
                  </div>
                </div>

                <div className="p-5 bg-white border border-brand-border rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="text-brand-amber" size={20} />
                    <h5 className="font-bold text-14 text-brand-navy">High-Yield Growth Cluster: Kokapet & Kompally</h5>
                  </div>
                  <p className="text-12 text-brand-muted leading-relaxed">
                    Identified major expansion opportunity in the Kompally education hub and Kokapet corridor (Phoenix Greens, Sri Chaitanya Zonal) to expand monthly originations by ₹1.2 Cr.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-brand-border text-12 space-y-1">
                    <div className="flex justify-between"><span className="text-brand-muted">Identified Cluster Gap:</span> <span className="font-bold">Kompally K-12 Belt</span></div>
                    <div className="flex justify-between"><span className="text-brand-muted">Target New Origin:</span> <span className="font-bold text-brand-blue">₹1.2 Cr / month</span></div>
                    <div className="flex justify-between"><span className="text-brand-muted">FOS Deployment:</span> <span className="font-bold">Dedicated Hub Reps</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'defaulter' && (
            <div className="space-y-4">
              <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-amber-700" size={20} />
                  <h5 className="font-bold text-14 text-amber-900">GQ Defaulter Pre-Screening Protocol</h5>
                </div>
                <p className="text-12 text-amber-900 leading-relaxed">
                  The system integrates automated pre-checks matching the 19 repeat default cases identified in the report to protect NBFC portfolio health.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-12">
                <div className="p-3 bg-white border border-brand-border rounded-xl flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Real-time PAN + CIBIL cross-check against blacklisted bureau records</span>
                </div>
                <div className="p-3 bg-white border border-brand-border rounded-xl flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Account Aggregator automated 6-month average balance verification</span>
                </div>
                <div className="p-3 bg-white border border-brand-border rounded-xl flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Cross-institutional student enrollment & identity deduplication</span>
                </div>
                <div className="p-3 bg-white border border-brand-border rounded-xl flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>Zero manual paperwork with Aadhaar OTP e-Sign verification</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
