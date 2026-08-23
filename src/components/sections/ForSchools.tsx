import React, { useState } from 'react';
import { 
  CheckCircle2, ShieldCheck, ArrowRight, BarChart3, 
  Download, Search, RefreshCw, Layers, CheckCircle, 
  TrendingUp, Users, Building, Calendar, DollarSign 
} from 'lucide-react';

export const ForSchools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settled' | 'pending'>('settled');
  const [selectedSchool, setSelectedSchool] = useState('Solitaire Global School');
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  const recentTransactions = [
    { id: 'TXN-9842', student: 'Diya Reddy', grade: 'Gr 11 IIT Academy', amount: '₹1,65,000', plan: '6-Month 0%', status: 'Disbursed T+0', time: '10 mins ago' },
    { id: 'TXN-9841', student: 'Aarav Sharma', grade: 'Gr 8-A Techno', amount: '₹95,000', plan: '3-Month 0%', status: 'Disbursed T+0', time: '28 mins ago' },
    { id: 'TXN-9840', student: 'Ananya Deshmukh', grade: 'Gr 4-B ICSE', amount: '₹1,20,000', plan: '9-Month Subsidized', status: 'Disbursed T+0', time: '1 hour ago' },
    { id: 'TXN-9839', student: 'Kabir Joshi', grade: 'Pre-Primary', amount: '₹60,000', plan: '6-Month 0%', status: 'Disbursed T+0', time: '3 hours ago' },
  ];

  return (
    <section id="schools" className="py-8 md:py-10 bg-[#F4F6FA] border-t border-brand-border/60">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-navy/5 text-brand-navy rounded-full text-11 font-bold mb-2 border border-brand-navy/10">
            <Building size={12} className="text-brand-blue" />
            Institutional Fee Management
          </span>
          <h2 className="text-24 md:text-30 font-bold text-brand-navy">
            Built for School Finance Teams & Chancellors
          </h2>
          <p className="text-13 text-brand-muted mt-1">
            Secure 100% upfront annual fee settlement while offering flexible monthly plans to your parents.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Core Value Pillars */}
          <div className="lg:col-span-5 space-y-6">
            <ul className="space-y-3.5">
              {[
                { title: "100% Upfront Annual Fee Settlement", desc: "No waiting for delayed quarterly or term installments. Receive your complete fees on day 1." },
                { title: "ARC: Automated Reconciliation & Ledger Sync", desc: "Instantly auto-reconciles student fee IDs with your school ERP, Tally, or SAP software." },
                { title: "Zero Collection or Default Risk", desc: "GrayQuest and RBI-partnered NBFCs absorb 100% of collection operations and credit risk." },
                { title: "Higher Student Retention & Admissions", desc: "Removing lump-sum burden boosts enrollment conversions and reduces mid-year dropouts." },
                { title: "Dedicated Key Account Manager", desc: "On-campus onboarding support, helpdesk for parents, and custom reporting." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={15} />
                  </div>
                  <div>
                    <h4 className="text-14 font-bold text-brand-navy leading-snug">{item.title}</h4>
                    <p className="text-12 text-brand-muted leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a 
                href="mailto:partners@grayquest.com?subject=Institution%20Partnership%20Inquiry"
                className="bg-brand-navy text-white px-6 py-3 rounded-xl font-bold text-14 hover:bg-brand-navy/90 transition-all flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <span>Schedule an Institutional Demo</span>
                <ArrowRight size={15} />
              </a>
              <span className="text-12 text-brand-muted text-center sm:text-left">
                Zero onboarding fee for schools
              </span>
            </div>
          </div>

          {/* Right Column: Authentic ARC Dashboard Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-800">
              {/* Window Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-11 font-black text-slate-400 uppercase tracking-wider ml-2">
                    GRAYQUEST ARC PORTAL
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[11px] font-bold flex items-center gap-1 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live ERP Sync
                  </span>
                  <div className="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md font-mono">
                    AY 2025-26
                  </div>
                </div>
              </div>

              {/* Institution Context Header */}
              <div className="py-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-blue/20 text-brand-blue flex items-center justify-center font-bold text-12">
                    SG
                  </div>
                  <div>
                    <h5 className="font-bold text-13 text-white">{selectedSchool}</h5>
                    <p className="text-[11px] text-slate-400">Campus ID: HYD-CAMPUS-04 • T+0 Upfront Settlement</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={handleExport}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-11 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {exported ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Download size={12} />}
                    <span>{exported ? 'Ledger Exported (.xlsx)' : 'Export Ledger'}</span>
                  </button>
                </div>
              </div>

              {/* ARC KPI Summary Cards */}
              <div className="grid grid-cols-3 gap-2.5 my-3.5">
                <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Upfront Disbursed</p>
                  <p className="text-16 sm:text-18 font-black text-white mt-0.5">₹4.85 Cr</p>
                  <p className="text-[10px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-0.5">
                    <TrendingUp size={10} /> 100% Collected
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Auto-Reconciled</p>
                  <p className="text-16 sm:text-18 font-black text-emerald-400 mt-0.5">99.8%</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">0 manual vouchers</p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Active Students</p>
                  <p className="text-16 sm:text-18 font-black text-brand-blue mt-0.5">684</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">3–12M EMI plans</p>
                </div>
              </div>

              {/* Live Fee Settlement Ledger */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <RefreshCw size={11} className="text-brand-blue" />
                    Live Settlement Stream (T+0)
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">All Sanctions Verified</span>
                </div>

                <div className="divide-y divide-slate-800/70 text-12 font-medium">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="p-2.5 flex items-center justify-between gap-2 hover:bg-slate-900/50 transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-12 truncate">{tx.student}</span>
                          <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded shrink-0">{tx.grade}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{tx.id} • {tx.plan}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold text-white text-12 block">{tx.amount}</span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold rounded">
                          <CheckCircle size={9} /> {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  Bank-Grade 256-bit Encrypted Settlement Pipeline
                </span>
                <span className="text-slate-500">Updated seconds ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

