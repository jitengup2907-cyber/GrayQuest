import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, 
  TrendingDown, Percent, Info, HelpCircle, RefreshCw, Calendar, FileText, Award,
  FileCheck, Download
} from 'lucide-react';
import { ObjectionSection } from '../ObjectionSection';
import { INSTITUTIONS, Institution, calculateFeePlan } from '../../data/institutions';
import { SchoolSelectDropdown } from '../SchoolSelectDropdown';
import { FeeInsuranceCalculator } from '../FeeInsuranceCalculator';
import { InstitutionScheduleModal } from '../InstitutionScheduleModal';
import { SanctionLetterModal } from '../SanctionLetterModal';

interface CalculatorProps {
  onStartApplication?: (data?: { schoolName: string; fee: number; tenure: number }) => void;
  onCheckEligibility?: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ 
  onStartApplication,
  onCheckEligibility 
}) => {
  const [fee, setFee] = useState<number>(100000);
  const [emis, setEmis] = useState<number>(6); // Default to 6 months 0%
  const [selectedInstitution, setSelectedInstitution] = useState<Institution>(INSTITUTIONS[0]); // Default Sri Chaitanya Junior Colleges
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(false);
  const [insuranceQuote, setInsuranceQuote] = useState<any>(null);
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);
  const [isSanctionLetterOpen, setIsSanctionLetterOpen] = useState<boolean>(false);

  // Calculate live plan based on selected institution
  const plan = useMemo(() => {
    return calculateFeePlan(fee || 0, emis, selectedInstitution);
  }, [fee, emis, selectedInstitution]);

  const presetAmounts = [60000, 100000, 150000, 200000, 300000];

  // Available tenures
  const availableTenures = [3, 6, 9, 10, 11, 12];

  // Total monthly with or without insurance
  const insuranceMonthly = (includeInsurance && insuranceQuote) ? insuranceQuote.monthlyPremium : 0;
  const netMonthlyEMI = plan.monthlyEMI + insuranceMonthly;

  const handleApplyClick = () => {
    if (onStartApplication) {
      onStartApplication({
        schoolName: selectedInstitution.name,
        fee: fee,
        tenure: emis,
      });
    } else if (onCheckEligibility) {
      onCheckEligibility();
    }
  };

  return (
    <section className="py-8 md:py-10 bg-[#F5F7FA] border-y border-brand-border/60" id="calculator">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded-full text-11 font-bold mb-2 border border-brand-blue/20">
            <Percent size={13} />
            <span>Transparent Institutional Pricing & 0% EMIs</span>
          </div>
          <h2 className="text-24 md:text-30 font-bold text-brand-navy leading-tight">
            Calculate your Monthly Fee Installment Plan
          </h2>
          <p className="text-13 md:text-14 text-brand-muted mt-1">
            Select your child's school or college below to see the exact 0% subsidy (3 & 6 Months) or subsidized long-term plans with zero hidden costs.
          </p>
        </div>
        
        <div className="w-full grid lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* Left Form Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Step 1: Search and Select Institution */}
            <div className="space-y-2">
              <label className="block text-14 font-bold text-brand-navy">
                1. Select School / Junior College / IIT
              </label>
              
              <SchoolSelectDropdown 
                institutions={INSTITUTIONS}
                selectedInstitution={selectedInstitution}
                onSelect={(inst) => {
                  setSelectedInstitution(inst);
                }}
              />

              {/* Poster Schedule Trigger Button */}
              <div className="pt-1 flex items-center justify-between">
                <span className="text-11 text-brand-muted">
                  Partner Type: <strong className="text-brand-navy">{selectedInstitution.category}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(true)}
                  className="inline-flex items-center gap-1.5 text-12 font-bold text-brand-blue hover:text-brand-navy underline cursor-pointer"
                >
                  <FileText size={14} />
                  <span>View Academic Fee Schedule Table</span>
                </button>
              </div>
            </div>

            {/* Step 2: Total Fee Input & Quick Presets */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="calculator-fee-input" className="text-14 font-bold text-brand-navy">
                  2. Total Academic Year Fee (₹)
                </label>
                <span className="text-12 font-semibold text-brand-blue">
                  ₹{fee.toLocaleString('en-IN')}
                </span>
              </div>
              
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-16 font-bold text-brand-muted">
                  ₹
                </span>
                <input
                  id="calculator-fee-input"
                  type="number"
                  min={10000}
                  max={2000000}
                  step={5000}
                  value={fee || ''}
                  onChange={(e) => setFee(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-9 pr-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-16 font-bold text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                  placeholder="Enter annual fee amount"
                />
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setFee(amt)}
                    className={`text-12 py-1 px-3 rounded-lg border font-medium transition-all cursor-pointer ${
                      fee === amt 
                        ? 'bg-brand-navy text-white border-brand-navy' 
                        : 'bg-slate-50 border-brand-border text-brand-muted hover:bg-slate-100 hover:text-brand-navy'
                    }`}
                  >
                    ₹{(amt / 100000).toFixed(amt % 100000 === 0 ? 0 : 1)}L
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Tenure Selection (Months) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-14 font-bold text-brand-navy">
                  3. Select Repayment Tenure
                </label>
                <span className="text-12 text-brand-muted font-medium">
                  {emis <= 6 ? (
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      0% Interest (Subsidized)
                    </span>
                  ) : (
                    <span className="text-brand-blue font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {plan.flatRatePercent}% Flat Interest
                    </span>
                  )}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableTenures.map((num) => {
                  const rateConfig = selectedInstitution.tenureRates[num];
                  const ratePct = rateConfig ? rateConfig.flatRatePercent : (num <= 6 ? 0 : (num === 9 ? 2.0 : (num === 11 ? 3.5 : 4.0)));
                  const isZero = ratePct === 0;

                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setEmis(num)}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        emis === num 
                          ? 'bg-brand-blue text-white font-bold border-brand-blue shadow-xs' 
                          : 'bg-white border-brand-border text-brand-navy hover:bg-brand-surface font-medium'
                      }`}
                    >
                      <span className="block text-13 font-bold">{num} EMIs</span>
                      <span className={`block text-[10px] font-semibold mt-0.5 ${
                        emis === num 
                          ? 'text-white/90' 
                          : isZero ? 'text-emerald-700' : 'text-slate-600'
                      }`}>
                        {isZero ? '0% Cost' : `${ratePct}% Int.`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Embedded Student Fee Protection Insurance */}
            <FeeInsuranceCalculator 
              isIncluded={includeInsurance}
              onInsuranceSelect={(quote, isInc) => {
                setInsuranceQuote(quote);
                setIncludeInsurance(isInc);
              }}
            />

            {/* Selected School Info Callout */}
            <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
              plan.isZeroPercent 
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                : 'bg-blue-50/70 border-blue-200 text-blue-950'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                plan.isZeroPercent ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-brand-blue'
              }`}>
                {plan.isZeroPercent ? <CheckCircle2 size={18} /> : <Percent size={18} />}
              </div>
              <div className="text-12 leading-relaxed">
                <p className="font-bold text-13 mb-0.5">
                  {selectedInstitution.name} ({plan.subsidyBadge})
                </p>
                <p className="opacity-90">{plan.tierNote}</p>
              </div>
            </div>
          </div>

          {/* Right Result Card (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div 
              key={`${selectedInstitution.id}-${fee}-${emis}-${includeInsurance}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-brand-navy text-white p-6 rounded-3xl shadow-xl border border-brand-navy/80 space-y-6 relative overflow-hidden"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/60 block">
                    Calculated Monthly Fee Plan
                  </span>
                  <h4 className="text-17 font-bold text-white truncate max-w-[230px]">
                    {selectedInstitution.shortName || selectedInstitution.name}
                  </h4>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-11 font-bold ${
                  plan.isZeroPercent ? 'bg-brand-green text-white' : 'bg-brand-blue text-white'
                }`}>
                  {plan.isZeroPercent ? '0% Zero Cost' : `${plan.flatRatePercent}% Total Interest`}
                </span>
              </div>

              {/* Big Monthly EMI Hero */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
                <span className="text-12 text-white/70 font-medium block mb-1">
                  {includeInsurance ? 'Total Net Monthly (Fee + Child Cover)' : 'Your Fixed Monthly Installment'}
                </span>
                <div className="text-36 font-black text-white leading-tight">
                  ₹{netMonthlyEMI.toLocaleString('en-IN')}
                  <span className="text-14 font-normal text-white/70 ml-1">/ month</span>
                </div>
                <p className="text-[11px] text-white/60 mt-1">
                  for {emis} consecutive monthly billing cycles
                </p>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-3 text-13 divide-y divide-white/10 pt-1">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white/70">Total School Fee</span>
                  <span className="font-semibold">₹{fee.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-white/70">Institutional Interest Rate</span>
                  <span className={`font-bold ${plan.isZeroPercent ? 'text-brand-green' : 'text-brand-amber'}`}>
                    {plan.isZeroPercent ? '0% (Zero Interest)' : `${plan.flatRatePercent}% Flat Total`}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-white/70">Total Interest Amount</span>
                  <span className={`font-semibold ${plan.isZeroPercent ? 'text-brand-green' : 'text-white'}`}>
                    {plan.isZeroPercent ? '₹0 (100% Subsidized)' : `₹${plan.totalInterest.toLocaleString('en-IN')}`}
                  </span>
                </div>

                {includeInsurance && insuranceQuote && (
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-emerald-300 flex items-center gap-1">
                      <ShieldCheck size={14} /> Child Fee Cover ({insuranceQuote.provider})
                    </span>
                    <span className="font-semibold text-emerald-300">
                      +₹{insuranceQuote.monthlyPremium}/mo
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <span className="text-white/70">One-time Processing Fee</span>
                  <span className={`font-semibold ${plan.processingFee === 0 ? 'text-brand-green' : 'text-white'}`}>
                    {plan.processingFee === 0 ? '₹0 (Waived)' : `₹${plan.processingFee}`}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 font-bold text-14">
                  <span className="text-white">Net Total Payable</span>
                  <span className="text-brand-green">
                    ₹{(plan.totalPayable + plan.processingFee + (includeInsurance && insuranceQuote ? insuranceQuote.annualPremium : 0)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Savings callout vs Credit Cards */}
              {plan.savingsVsCreditCard > 0 && (
                <div className="p-3 bg-brand-green/20 border border-brand-green/30 rounded-xl flex items-center gap-2.5">
                  <TrendingDown size={20} className="text-brand-green shrink-0" />
                  <p className="text-12 text-white/90 leading-tight">
                    You save <strong className="text-brand-green font-bold">₹{plan.savingsVsCreditCard.toLocaleString('en-IN')}</strong> compared to standard credit card EMIs & surcharges.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button 
                  onClick={handleApplyClick}
                  className="w-full py-3.5 bg-brand-green text-white rounded-xl font-bold text-15 hover:bg-brand-green/90 shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Apply for this Plan</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsSanctionLetterOpen(true)}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-13 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                >
                  <FileCheck size={15} className="text-emerald-400" />
                  <span>Preview & Download Official Sanction Letter</span>
                  <Download size={13} className="text-white/80" />
                </button>

                <p className="text-11 text-center text-white/60">
                  Instant 2-minute sanction · Zero impact on your CIBIL score
                </p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <ObjectionSection />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Schedule Table Modal */}
      <InstitutionScheduleModal 
        institution={selectedInstitution}
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onApplyNow={handleApplyClick}
      />

      {/* Sanction Letter Preview Modal */}
      <SanctionLetterModal
        isOpen={isSanctionLetterOpen}
        onClose={() => setIsSanctionLetterOpen(false)}
        onProceedToApply={() => {
          setIsSanctionLetterOpen(false);
          handleApplyClick();
        }}
        customerData={{
          fullName: 'Verified Parent Applicant',
          panNumber: 'ABCDE1234F',
          phone: '9876543210',
          institution: selectedInstitution,
          feeAmount: fee,
          cibilScore: 780,
        }}
      />
    </section>
  );
};
