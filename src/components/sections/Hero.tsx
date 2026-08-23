import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Users, FileText, School, ArrowRight, ShieldCheck, 
  CheckCircle2, Sparkles, Building2, Award, Landmark,
  Search, MapPin, Check, FileCheck, X, ChevronRight
} from 'lucide-react';
import { INSTITUTIONS, Institution } from '../../data/institutions';
import { SanctionLetterModal } from '../SanctionLetterModal';

interface HeroProps {
  onCheckEligibility: () => void;
  onApplyNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckEligibility, onApplyNow }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedHeroSchool, setSelectedHeroSchool] = useState<Institution | null>(null);
  const [isSanctionLetterOpen, setIsSanctionLetterOpen] = useState(false);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const goToSection = (path: string, sectionId?: string) => {
    navigate(path);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter institutions for autocomplete
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return INSTITUTIONS.filter(i => i.featured).slice(0, 6);
    }
    const q = searchQuery.toLowerCase().trim();
    return INSTITUTIONS.filter(i => 
      i.name.toLowerCase().includes(q) || 
      i.city.toLowerCase().includes(q) ||
      (i.shortName && i.shortName.toLowerCase().includes(q)) ||
      i.category.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  const trendingSchools = [
    { name: 'Sri Chaitanya', inst: INSTITUTIONS.find(i => i.id === 'sri_chaitanya_junior_colleges') || INSTITUTIONS[0] },
    { name: 'Narayana Group', inst: INSTITUTIONS.find(i => i.id === 'narayana_junior_colleges') || INSTITUTIONS[1] },
    { name: 'DPS Society', inst: INSTITUTIONS.find(i => i.id === 'dps') || INSTITUTIONS[2] },
    { name: 'Podar International', inst: INSTITUTIONS.find(i => i.id === 'podar') || INSTITUTIONS[3] },
    { name: 'IIT Bombay', inst: INSTITUTIONS.find(i => i.id === 'iit_bombay') || INSTITUTIONS[4] },
    { name: 'NMIMS University', inst: INSTITUTIONS.find(i => i.id === 'nmims') || INSTITUTIONS[5] },
  ];

  const handleSelectSchool = (inst: Institution) => {
    setSelectedHeroSchool(inst);
    setSearchQuery(inst.name);
    setIsSearchFocused(false);
  };

  const nbfcPartners = [
    { name: "Arka Fincap", short: "ARKA", color: "text-brand-navy" },
    { name: "Ratnaafincorp", short: "RATNAAFIN", color: "text-brand-blue" },
    { name: "Mirae Asset", short: "MIRAE", color: "text-amber-700" },
    { name: "Western Capital", short: "WESTERN", color: "text-emerald-700" },
  ];

  return (
    <section className="relative pt-6 pb-8 md:pt-8 md:pb-10 overflow-hidden bg-gradient-to-b from-[#F2F5F9] via-[#F6F8FA] to-[#F1F4F8] border-b border-brand-border/60">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top Header Badge & Titles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-4xl mx-auto mb-5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-12 font-bold mb-2.5 border border-brand-blue/20 shadow-xs">
            <Zap size={13} className="fill-brand-blue" />
            <span>Zero-Cost Monthly Education Fee Financing</span>
          </div>

          <h1 className="text-28 sm:text-36 md:text-44 font-bold text-brand-navy leading-tight tracking-tight mb-2.5">
            Pay your child's education fees in <span className="text-brand-blue underline decoration-brand-blue/30 underline-offset-4">easy monthly installments</span>
          </h1>

          <p className="text-14 sm:text-16 text-brand-muted max-w-3xl mx-auto leading-relaxed">
            Empowering parents across 6,500+ partner schools, junior colleges, and institutes in India. 
            0% interest on 3 & 6-month plans with instant digital approval.
          </p>
        </motion.div>

        {/* 1. Live Partner Institution Search Autocomplete Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="max-w-3xl mx-auto mb-6"
          ref={searchContainerRef}
        >
          <div className="relative">
            {/* Search Input Box */}
            <div className="relative bg-white border-2 border-brand-border hover:border-brand-blue focus-within:border-brand-blue rounded-2xl shadow-sm hover:shadow-md transition-all p-1.5 flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 ml-1">
                <Search size={18} />
              </div>
              
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                  if (selectedHeroSchool && e.target.value !== selectedHeroSchool.name) {
                    setSelectedHeroSchool(null);
                  }
                }}
                placeholder="Search 6,500+ schools, colleges, IITs (e.g. Sri Chaitanya, Narayana, DPS, Podar...)"
                className="w-full text-13 sm:text-14 text-brand-navy bg-transparent outline-none placeholder:text-slate-400 py-2 pr-2"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedHeroSchool(null);
                  }}
                  className="p-1.5 text-slate-400 hover:text-brand-navy rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X size={16} />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (selectedHeroSchool) {
                    goToSection('/parents', 'calculator');
                  } else if (searchResults.length > 0) {
                    handleSelectSchool(searchResults[0]);
                  }
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-13 rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
              >
                <span>Check Fee Plan</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Trending Quick Search Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 no-scrollbar text-11">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] shrink-0 mr-1 flex items-center gap-1">
                <Sparkles size={11} className="text-brand-blue" />
                Popular:
              </span>
              {trendingSchools.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleSelectSchool(item.inst)}
                  className={`px-2.5 py-0.5 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                    selectedHeroSchool?.id === item.inst.id
                      ? 'bg-brand-blue text-white border-brand-blue font-bold shadow-2xs'
                      : 'bg-white/80 hover:bg-white text-slate-700 hover:text-brand-blue border-brand-border'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Autocomplete Dropdown List */}
            {isSearchFocused && (
              <div className="absolute z-40 left-0 right-0 top-full mt-1.5 bg-white border border-brand-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[380px] overflow-y-auto">
                <div className="p-2.5 bg-slate-50 border-b border-brand-border flex items-center justify-between text-11 text-slate-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Building2 size={13} className="text-brand-blue" />
                    {searchQuery ? `Matching institutions for "${searchQuery}"` : 'Featured Partner Institutions'}
                  </span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    0% Subsidized EMI Available
                  </span>
                </div>

                <div className="divide-y divide-brand-border/60">
                  {searchResults.map((inst) => {
                    const isZero6M = inst.tenureRates[6]?.flatRatePercent === 0;
                    return (
                      <div
                        key={inst.id}
                        onClick={() => handleSelectSchool(inst)}
                        className="p-3 hover:bg-brand-surface cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-13 text-brand-navy group-hover:text-brand-blue truncate">
                              {inst.name}
                            </span>
                            {inst.featured && (
                              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[9px] font-bold rounded">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-11 text-slate-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <MapPin size={11} /> {inst.city}
                            </span>
                            <span>•</span>
                            <span className="bg-slate-100 px-1.5 py-0.2 rounded text-[10px] text-slate-700">
                              {inst.category}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0 flex items-center gap-2">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            isZero6M 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-blue-100 text-brand-blue'
                          }`}>
                            {isZero6M ? '0% on 3 & 6M' : 'Subsidized'}
                          </span>
                          <ChevronRight size={14} className="text-slate-400 group-hover:text-brand-blue transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-brand-border text-center text-11 text-slate-500">
                  Can't find your school? GrayQuest supports <strong className="text-brand-navy">ALL accredited institutions</strong> across India with low open rates.
                </div>
              </div>
            )}

            {/* Selected School Quick Card Preview */}
            <AnimatePresence>
              {selectedHeroSchool && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -5 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -5 }}
                  className="mt-3 p-3.5 bg-white border-2 border-brand-blue/30 rounded-2xl shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-13 text-brand-navy truncate max-w-sm">
                            {selectedHeroSchool.name}
                          </h4>
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                            Verified Partner
                          </span>
                        </div>
                        <p className="text-11 text-slate-500 mt-0.5">
                          {selectedHeroSchool.tierNote || 'Pre-approved 0% interest monthly installment plan active.'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedHeroSchool(null)}
                      className="text-slate-400 hover:text-slate-600 self-start sm:self-auto p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="pt-2.5 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-11 text-slate-600">
                      <span className="font-semibold text-brand-navy">Plan: 0% Interest for 3 & 6M</span>
                      <span>•</span>
                      <span>₹0 Processing Fee</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setIsSanctionLetterOpen(true)}
                        className="flex-1 sm:flex-initial px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-brand-navy text-12 font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FileCheck size={13} className="text-brand-blue" />
                        <span>Sample Sanction Letter</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => goToSection('/parents', 'calculator')}
                        className="flex-1 sm:flex-initial px-3.5 py-1.5 bg-brand-blue hover:bg-brand-blue/90 text-white text-12 font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <span>Calculate EMI</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

        {/* The 3 Core Action Cards in One Symmetric, Clean Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          {/* Card 1: Check Eligibility */}
          <div 
            onClick={onCheckEligibility}
            className="bg-white border-2 border-brand-blue/20 hover:border-brand-blue rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-bl-full -z-0 pointer-events-none group-hover:scale-110 transition-transform" />
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-3 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <Users size={20} />
              </div>
              
              <div className="inline-block px-2 py-0.5 rounded-md bg-blue-50 text-brand-blue text-[11px] font-bold mb-1.5">
                2-Min Soft Check
              </div>

              <h3 className="text-17 font-bold text-brand-navy mb-1.5 group-hover:text-brand-blue transition-colors">
                Check Eligibility
              </h3>
              <p className="text-13 text-brand-muted leading-relaxed">
                Instant soft credit inquiry via PAN. Zero score impact, instant pre-approved credit limit & downloadable sanction certificate.
              </p>
            </div>

            <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between relative z-10">
              <span className="text-13 font-bold text-brand-blue flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Check Eligibility Now <ArrowRight size={15} />
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                No Impact
              </span>
            </div>
          </div>

          {/* Card 2: Start Application */}
          <div 
            onClick={onApplyNow}
            className="bg-white border-2 border-emerald-500/20 hover:border-brand-green rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -z-0 pointer-events-none group-hover:scale-110 transition-transform" />
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center mb-3 group-hover:bg-brand-green group-hover:text-white transition-colors">
                <FileText size={20} />
              </div>

              <div className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold mb-1.5">
                100% Digital & Paperless
              </div>

              <h3 className="text-17 font-bold text-brand-navy mb-1.5 group-hover:text-brand-green transition-colors">
                Start Application
              </h3>
              <p className="text-13 text-brand-muted leading-relaxed">
                Complete your quick digital KYC with Aadhaar OTP and get your fee disbursed directly to your school.
              </p>
            </div>

            <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between relative z-10">
              <span className="text-13 font-bold text-brand-green flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Apply in 5 Minutes <ArrowRight size={15} />
              </span>
              <span className="text-[11px] font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded">
                Fast Sanction
              </span>
            </div>
          </div>

          {/* Card 3: I Represent a School */}
          <div 
            onClick={() => goToSection('/schools')}
            className="bg-white border-2 border-slate-200 hover:border-brand-navy rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-bl-full -z-0 pointer-events-none group-hover:scale-110 transition-transform" />
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-brand-navy flex items-center justify-center mb-3 group-hover:bg-brand-navy group-hover:text-white transition-colors">
                <School size={20} />
              </div>

              <div className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold mb-1.5">
                For School Leadership
              </div>

              <h3 className="text-17 font-bold text-brand-navy mb-1.5 group-hover:text-brand-navy transition-colors">
                I Represent a School
              </h3>
              <p className="text-13 text-brand-muted leading-relaxed">
                Streamline annual fee collections, boost student enrollments, and secure 100% upfront fee settlements.
              </p>
            </div>

            <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between relative z-10">
              <span className="text-13 font-bold text-brand-navy flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Partner with GrayQuest <ArrowRight size={15} />
              </span>
              <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                6,500+ Schools
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Trust & NBFC Partners Bar */}
        <div className="pt-4 border-t border-brand-border/60 flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-12 text-brand-muted">
            <span className="flex items-center gap-1.5 font-semibold text-brand-navy">
              <ShieldCheck size={15} className="text-brand-green" />
              RBI Regulated NBFCs
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5 font-semibold text-brand-navy">
              <CheckCircle2 size={15} className="text-brand-blue" />
              0% Interest on 3 & 6M
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-1.5 font-semibold text-brand-navy">
              <Award size={15} className="text-amber-500" />
              6,500+ Partner Institutions
            </span>
          </div>

          {/* NBFC Lending Partners Strip */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-11 uppercase font-bold tracking-wider text-slate-600 mr-1 flex items-center gap-1">
              <Landmark size={12} className="text-brand-blue" />
              Partnered with NBFCs:
            </span>
            {nbfcPartners.map((partner) => (
              <div 
                key={partner.name} 
                className="flex items-center gap-1.5 bg-white border border-brand-border px-2.5 py-1 rounded-lg shadow-2xs hover:border-brand-blue transition-colors"
                title={`${partner.name} - RBI Regulated Lending Partner`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className={`font-bold text-11 ${partner.color}`}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Hero Sample Sanction Letter Modal */}
      <SanctionLetterModal
        isOpen={isSanctionLetterOpen}
        onClose={() => setIsSanctionLetterOpen(false)}
        onProceedToApply={() => {
          setIsSanctionLetterOpen(false);
          onApplyNow();
        }}
        customerData={{
          fullName: 'Sample Parent Candidate',
          panNumber: 'ABCDE1234F',
          phone: '9876543210',
          institution: selectedHeroSchool || INSTITUTIONS[0],
          feeAmount: 120000,
          cibilScore: 780,
        }}
      />
    </section>
  );
};


