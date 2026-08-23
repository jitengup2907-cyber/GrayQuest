import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CreditTransparency: React.FC = () => {
  const cards = [
    {
      q: "Will this affect my CIBIL score?",
      badge: "Zero Score Impact",
      a: "A soft inquiry is used for instant eligibility checking with 0 score impact. A hard pull only happens when you explicitly proceed to final loan execution — and we clearly inform you beforehand.",
    },
    {
      q: "Who are the lending partners?",
      badge: "RBI-Regulated",
      a: "GrayQuest partners with RBI-registered NBFCs including Arka Fincap, Ratnaafincorp, Mirae Asset, Western Capital, and Avanse. All loan sanctions are governed by RBI fair practice codes. GrayQuest provides the technology, institutional interface, and servicing platform.",
    },
    {
      q: "What if I miss an EMI?",
      badge: "Proactive Reminders",
      a: "Banks charge standard return fees (₹500–₹1,200). GrayQuest sends proactive WhatsApp and SMS notifications 3 days in advance to ensure your account is seamlessly funded.",
    }
  ];

  return (
    <section className="py-8 md:py-10 bg-[#EDF1F6] border-t border-brand-border/60">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-800 rounded-full text-11 font-bold mb-2 border border-emerald-200">
            <CheckCircle2 size={12} />
            Ethical & Transparent Lending
          </span>
          <h2 className="text-24 md:text-30 font-bold text-brand-navy">
            100% Transparency About Your Credit & Privacy
          </h2>
          <p className="text-13 text-brand-muted mt-1">
            Clear terms, zero hidden charges, and honest guidance at every single step.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className="bg-white p-4 sm:p-5 rounded-2xl border border-brand-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {card.badge}
                  </span>
                </div>
                <h4 className="font-bold text-16 text-brand-navy mb-2">{card.q}</h4>
                <p className="text-13 text-brand-muted leading-relaxed">{card.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/resources" 
            className="inline-flex items-center gap-1.5 text-13 font-bold text-brand-blue hover:text-brand-navy transition-colors"
          >
            <span>Read our complete consumer charter & regulatory guidelines</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

