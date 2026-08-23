import React from 'react';
import { CreditCard, FileText, Zap, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { ObjectionSection } from '../ObjectionSection';

interface ForParentsProps {
  onCheckEligibility: () => void;
}

export const ForParents: React.FC<ForParentsProps> = ({ onCheckEligibility }) => {
  const benefits = [
    { title: "No Lump Sum Stress", desc: "Pay manageable monthly EMIs instead of depleting your family savings upfront.", icon: <CreditCard size={22} /> },
    { title: "Zero Physical Paperwork", desc: "Fast digital KYC with Aadhaar OTP directly from your mobile device.", icon: <FileText size={22} /> },
    { title: "Admission Secured Day 1", desc: "Your child's school or college receives 100% annual fees immediately.", icon: <Zap size={22} /> },
    { title: "Child Fee Protection", desc: "Complimentary term life cover powered by TATA AIA & Kotak Life.", icon: <Shield size={22} /> },
  ];

  const testimonials = [
    { 
      name: "Anjali Sharma", 
      city: "Mumbai", 
      school: "Podar International", 
      quote: "GrayQuest made managing high school fees effortless without breaking my fixed deposits. The 0% 6-month plan is completely transparent." 
    },
    { 
      name: "Rahul Verma", 
      city: "Hyderabad", 
      school: "Sri Chaitanya Junior College", 
      quote: "Approved in less than 5 minutes online. The monthly auto-debit gives total peace of mind for competitive coaching fees." 
    },
    { 
      name: "Priya Nair", 
      city: "Bengaluru", 
      school: "Orchids International", 
      quote: "Zero hidden charges and no surprise fees. Customer support was prompt, and the WhatsApp reminders keep me on track." 
    },
  ];

  return (
    <section id="parents" className="py-8 md:py-10 bg-[#EDF1F6] border-t border-brand-border/60">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded-full text-11 font-bold mb-2 border border-brand-blue/20">
            <Shield size={12} />
            Trusted by 2M+ Families
          </span>
          <h2 className="text-24 md:text-30 font-bold text-brand-navy">
            Why Parents Choose GrayQuest
          </h2>
          <p className="text-13 text-brand-muted mt-1">
            Designed to help families plan and fund their children's education with zero financial strain.
          </p>
        </div>
        
        {/* 4 Benefits in One Clean Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl border border-brand-border shadow-xs hover:shadow-md transition-all">
              <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-3">
                {b.icon}
              </div>
              <h3 className="font-bold text-14 text-brand-navy mb-1">{b.title}</h3>
              <p className="text-12 text-brand-muted leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* 3 Testimonials in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-4 sm:p-5 rounded-2xl border border-brand-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative">
              <div className="mb-3">
                <div className="flex items-center gap-1 text-amber-400 mb-2 text-12">
                  ★★★★★
                </div>
                <p className="text-12 text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center font-bold text-12">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-12 text-brand-navy">{t.name}</h4>
                  <p className="text-[11px] text-brand-muted">{t.school}, {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="bg-brand-navy text-white p-5 sm:p-6 rounded-2xl mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-24 sm:text-28 font-black text-white">6,500+</p>
            <p className="text-[11px] text-white/70 uppercase font-semibold tracking-wider mt-0.5">Partner Institutions</p>
          </div>
          <div>
            <p className="text-24 sm:text-28 font-black text-brand-green">2M+</p>
            <p className="text-[11px] text-white/70 uppercase font-semibold tracking-wider mt-0.5">Students Covered</p>
          </div>
          <div>
            <p className="text-24 sm:text-28 font-black text-white">0%</p>
            <p className="text-[11px] text-white/70 uppercase font-semibold tracking-wider mt-0.5">Subsidized EMI Available</p>
          </div>
          <div>
            <p className="text-24 sm:text-28 font-black text-amber-400">4.8★</p>
            <p className="text-[11px] text-white/70 uppercase font-semibold tracking-wider mt-0.5">Parent Trust Rating</p>
          </div>
        </div>

        {/* Action Callout */}
        <div className="text-center max-w-md mx-auto space-y-2">
          <button 
            onClick={onCheckEligibility}
            className="w-full sm:w-auto px-7 py-3 bg-brand-blue text-white rounded-xl font-bold text-14 shadow-sm hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <span>Check My Eligibility in 2 Minutes</span>
            <ArrowRight size={15} />
          </button>
          <p className="text-11 text-brand-muted">Instant pre-approval with zero credit score impact.</p>
        </div>
      </div>
    </section>
  );
};

