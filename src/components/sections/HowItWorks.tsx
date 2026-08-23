import React from 'react';
import { Search, FileText, Zap, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNum: "01",
      title: "Select Institution",
      desc: "Choose from 6,500+ schools, junior colleges, IITs, and universities across India.",
      icon: <Search size={22} />,
    },
    {
      stepNum: "02",
      title: "Digital KYC Form",
      desc: "Provide basic PAN and verify via Aadhaar OTP in under 2 minutes.",
      icon: <FileText size={22} />,
    },
    {
      stepNum: "03",
      title: "Instant Sanction",
      desc: "Instant automated approval with customized 0% or low-rate monthly EMI plan.",
      icon: <Zap size={22} />,
    },
    {
      stepNum: "04",
      title: "Direct Disbursement",
      desc: "School receives 100% annual fees upfront. You pay in monthly installments via e-NACH.",
      icon: <CreditCard size={22} />,
    }
  ];

  return (
    <section id="how-it-works" className="py-8 md:py-10 bg-[#F4F6FA] border-t border-brand-border/60">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded-full text-11 font-bold mb-2 border border-brand-blue/20">
            <Zap size={12} />
            Simple 4-Step Process
          </span>
          <h2 className="text-24 md:text-30 font-bold text-brand-navy">
            How GrayQuest Works
          </h2>
          <p className="text-13 text-brand-muted mt-1">
            100% digital, paperless, and approved in minutes from your mobile phone.
          </p>
        </div>

        {/* 4 Steps in One Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="bg-slate-50 border border-brand-border/80 rounded-2xl p-4 sm:p-5 hover:bg-white hover:border-brand-blue/30 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-16 font-black text-slate-300 group-hover:text-brand-blue/40 transition-colors">
                    {step.stepNum}
                  </span>
                </div>

                <h3 className="font-bold text-16 text-brand-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-13 text-brand-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-brand-blue">
                <span>Step {i + 1} of 4</span>
                {i < 3 && <ArrowRight size={12} className="opacity-60" />}
              </div>
            </div>
          ))}
        </div>

        {/* Reassuring Compliance Note */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start sm:items-center gap-3">
          <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5 sm:mt-0" size={20} />
          <p className="text-12 sm:text-13 text-emerald-950 leading-relaxed">
            GrayQuest partners with RBI-licensed NBFCs including <strong className="font-bold">Arka Fincap, Ratnaafincorp, Mirae Asset, Western Capital, and Avanse</strong> to disburse fees directly to your institution. Transparent agreements with zero hidden charges.
          </p>
        </div>
      </div>
    </section>
  );
};

