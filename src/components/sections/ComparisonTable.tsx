import React from 'react';
import { motion } from 'motion/react';
import { Check, X, ShieldCheck, Zap } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const features = [
    {
      name: "Interest Rate",
      gq: "0% Subsidized (3 & 6M)",
      traditional: "11% – 16% p.a.",
      isGqBetter: true
    },
    {
      name: "Processing Fees",
      gq: "Transparent (₹499–₹799)",
      traditional: "High (1.5% – 3% + GST)",
      isGqBetter: true
    },
    {
      name: "Collateral & Security",
      gq: "Zero Collateral Required",
      traditional: "Asset or FD Pledge often required",
      isGqBetter: true
    },
    {
      name: "Approval & KYC",
      gq: "Instant (2-Min Aadhaar OTP)",
      traditional: "7–14 Days physical branch visits",
      isGqBetter: true
    },
    {
      name: "Child Fee Protection",
      gq: "Included (Tata AIA / Kotak)",
      traditional: "Expensive separate policy",
      isGqBetter: true
    },
    {
      name: "Foreclosure & Prepayment",
      gq: "Zero Prepayment Penalty",
      traditional: "Lock-ins & penalty charges",
      isGqBetter: true
    }
  ];

  return (
    <section className="py-8 md:py-10 bg-[#EDF1F6] border-t border-brand-border/60">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded-full text-11 font-bold mb-2">
            <Zap size={12} />
            Why GrayQuest Wins
          </span>
          <h3 className="text-22 md:text-26 font-bold text-brand-navy">
            GrayQuest vs. Traditional Education Loans
          </h3>
          <p className="text-12 text-brand-muted mt-1">
            See how our zero-cost institutional plans compare with conventional banking loans.
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-brand-border">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-brand-navy text-white text-12 font-bold border-b border-brand-navy">
                <th className="py-3 px-4 w-1/3">Key Feature</th>
                <th className="py-3 px-4 w-1/3 bg-brand-blue text-center text-white">GrayQuest Education Plan</th>
                <th className="py-3 px-4 w-1/3 text-center text-white/80">Traditional Bank Loans</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-12">
              {features.map((feature, index) => (
                <tr 
                  key={index}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-2.5 px-4 font-semibold text-brand-navy">
                    {feature.name}
                  </td>
                  <td className="py-2.5 px-4 text-center bg-blue-50/40 font-bold text-brand-blue border-x border-brand-border/40">
                    <div className="inline-flex items-center justify-center gap-1.5">
                      <Check className="text-emerald-600 shrink-0" size={14} />
                      <span>{feature.gq}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-center text-slate-500">
                    <div className="inline-flex items-center justify-center gap-1.5">
                      <X className="text-rose-400 shrink-0" size={14} />
                      <span>{feature.traditional}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-11 text-brand-muted text-center">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>All payment arrangements are executed under RBI-approved NBFC Fair Practice Guidelines.</span>
        </div>
      </div>
    </section>
  );
};

