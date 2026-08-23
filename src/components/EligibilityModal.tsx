import React, { useState, useMemo } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, CreditCard, 
  ArrowRight, Upload, Lock, RefreshCw, 
  Sparkles, UserCheck, Check, Info, AlertTriangle, Building,
  FileCheck, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INSTITUTIONS, Institution, calculateFeePlan } from '../data/institutions';
import { SchoolSelectDropdown } from './SchoolSelectDropdown';
import { SanctionLetterModal } from './SanctionLetterModal';

const POPULAR_BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', logo: '🏦' },
  { id: 'sbi', name: 'State Bank of India', logo: '🏛️' },
  { id: 'icici', name: 'ICICI Bank', logo: '💳' },
  { id: 'axis', name: 'Axis Bank', logo: '🏦' },
  { id: 'kotak', name: 'Kotak Mahindra Bank', logo: '🔴' },
];

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToApply?: (initialData: {
    fullName: string;
    panNumber: string;
    phone: string;
    schoolName: string;
    loanAmount: string;
    cibilScore?: number;
    approvalType?: 'auto' | 'manual_aa' | 'manual_doc';
  }) => void;
}

type ModalView = 'input' | 'analyzing' | 'result' | 'manual_aa' | 'manual_statement' | 'manual_success';

export const EligibilityModal: React.FC<EligibilityModalProps> = ({ 
  isOpen, 
  onClose,
  onProceedToApply 
}) => {
  const [view, setView] = useState<ModalView>('input');
  
  // Primary Form State
  const [fullName, setFullName] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState<Institution>(INSTITUTIONS[0]);
  const [fee, setFee] = useState('120000');

  // Assessment & CIBIL state
  const [calculatedCibil, setCalculatedCibil] = useState<number>(780);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStatusText, setAnalysisStatusText] = useState('Validating PAN with NSDL / Tax database...');

  // Manual Approval flow state
  const [selectedBank, setSelectedBank] = useState('');
  const [aaMobileOtp, setAaMobileOtp] = useState('');
  const [aaOtpSent, setAaOtpSent] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [pdfPassword, setPdfPassword] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSanctionOpen, setIsSanctionOpen] = useState(false);

  // PAN Validation Regex: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const isPanValid = useMemo(() => {
    return panRegex.test(panNumber.trim().toUpperCase());
  }, [panNumber]);

  const isFormValid = useMemo(() => {
    return (
      fullName.trim().length >= 3 &&
      isPanValid &&
      phone.trim().length === 10 &&
      Boolean(selectedInstitution?.name) &&
      Number(fee) > 0
    );
  }, [fullName, isPanValid, phone, selectedInstitution, fee]);

  // Determine CIBIL score based on PAN hash or manual test triggers
  const evaluateEligibility = (presetScore?: number) => {
    setView('analyzing');
    setAnalysisProgress(15);
    setAnalysisStatusText('Validating PAN format & tax registry...');

    setTimeout(() => {
      setAnalysisProgress(45);
      setAnalysisStatusText('Initiating soft bureau inquiry with TransUnion CIBIL (0 score impact)...');
    }, 600);

    setTimeout(() => {
      setAnalysisProgress(80);
      setAnalysisStatusText('Matching institution partnership & 0% interest subsidy tier...');
    }, 1300);

    setTimeout(() => {
      setAnalysisProgress(100);
      let score = presetScore;
      if (!score) {
        // Derive realistic bureau score deterministically from PAN and Name
        const sumChars = (panNumber + fullName).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
        score = 650 + (sumChars % 170); // Scores typically between 650 and 820
      }
      setCalculatedCibil(score);
      setView('result');
    }, 1900);
  };

  // Color-Coded Tiers and Plan calculation
  const calculatedPlan = useMemo(() => {
    return calculateFeePlan(Number(fee || '120000'), 12, selectedInstitution);
  }, [fee, selectedInstitution]);

  const approvalTier = useMemo(() => {
    const isZeroCost = selectedInstitution.interestRateMonthly === 0;
    const rateText = isZeroCost ? '0% Interest Subsidized' : `${selectedInstitution.interestRateMonthly}%/mo Subsidized`;
    const feeText = selectedInstitution.processingFee === 0 ? '₹0 Processing Fee' : `₹${selectedInstitution.processingFee} Processing Fee`;

    if (calculatedCibil >= 750) {
      return {
        type: 'high' as const,
        probabilityText: 'High Approval Probability (98%)',
        probabilitySubtitle: 'Instant 100% Digital Auto-Approval Pre-Sanctioned',
        textColorClass: 'text-emerald-700',
        badgeBg: 'bg-emerald-600',
        containerBg: 'bg-emerald-50/80 border-emerald-300',
        accentColor: '#059669',
        scoreVerdict: 'Excellent Credit Standing',
        description: `Your strong credit track record qualifies for immediate pre-approved fee financing at ${selectedInstitution.name}.`,
        termInterest: rateText,
        termProcessingFee: feeText,
        termTenure: '3 to 12 Months',
        termApprovalTime: 'Instant (< 2 mins)',
        canAutoApprove: true,
      };
    } else if (calculatedCibil >= 680) {
      return {
        type: 'moderate' as const,
        probabilityText: 'Moderate Approval Probability (78%)',
        probabilitySubtitle: 'Conditional Pre-Approval (Requires standard Aadhaar e-KYC)',
        textColorClass: 'text-amber-700',
        badgeBg: 'bg-amber-600',
        containerBg: 'bg-amber-50/80 border-amber-300',
        accentColor: '#D97706',
        scoreVerdict: 'Good Credit Standing',
        description: `You qualify for standard monthly installment plans at ${selectedInstitution.name}. Instant sanction upon quick Aadhaar OTP verification.`,
        termInterest: rateText,
        termProcessingFee: feeText,
        termTenure: '3 to 12 Months',
        termApprovalTime: 'Fast (5 - 10 mins)',
        canAutoApprove: true,
      };
    } else {
      return {
        type: 'manual' as const,
        probabilityText: 'Manual Underwriting Required (85% Historical Clearance)',
        probabilitySubtitle: 'Fast-track bank statement underwriting route available',
        textColorClass: 'text-blue-800',
        badgeBg: 'bg-blue-600',
        containerBg: 'bg-blue-50/80 border-blue-300',
        accentColor: '#2563EB',
        scoreVerdict: 'Bureau Review / Thin File',
        description: `Your bureau score indicates limited formal credit history. 85%+ of parents in your bracket get approved within hours via bank statement verification.`,
        termInterest: isZeroCost ? '0% on Statement Verification' : `${selectedInstitution.interestRateMonthly}%/mo on Review`,
        termProcessingFee: feeText,
        termTenure: '3 to 12 Months',
        termApprovalTime: '2 - 4 Business Hours',
        canAutoApprove: false,
      };
    }
  }, [calculatedCibil, selectedInstitution]);

  const handleStartApplication = (approvalType: 'auto' | 'manual_aa' | 'manual_doc' = 'auto') => {
    if (onProceedToApply) {
      onProceedToApply({
        fullName,
        panNumber: panNumber.toUpperCase(),
        phone,
        schoolName: selectedInstitution.name,
        loanAmount: fee,
        cibilScore: calculatedCibil,
        approvalType,
      });
    }
    onClose();
  };

  const handleAaSubmit = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setView('manual_success');
    }, 1600);
  };

  const handleStatementUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleManualStatementSubmit = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setView('manual_success');
    }, 1500);
  };

  const setTestScenario = (score: number, sampleName: string, samplePan: string, sampleInstIndex: number = 0) => {
    setFullName(sampleName);
    setPanNumber(samplePan);
    setPhone('9876543210');
    setSelectedInstitution(INSTITUTIONS[sampleInstIndex] || INSTITUTIONS[0]);
    setFee('120000');
    evaluateEligibility(score);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden z-10 my-6 border border-brand-border flex flex-col max-h-[90vh]"
      >
        {/* Header Strip */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue border border-brand-blue/30">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="text-16 sm:text-18 font-bold leading-tight text-white">
                Check Eligibility & CIBIL Score
              </h3>
              <p className="text-11 text-slate-300 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Soft Credit Bureau Inquiry · 0 Impact on Score · 100% Encrypted
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            {/* VIEW 1: PRIMARY INPUT FORM (Dedicated PAN field + Details) */}
            {view === 'input' && (
              <motion.div 
                key="input-view"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                {/* Notice Banner */}
                <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-3 flex items-start gap-2.5">
                  <Info size={18} className="text-brand-blue shrink-0 mt-0.5" />
                  <p className="text-12 text-brand-text leading-relaxed">
                    Enter your <strong className="text-brand-navy">Permanent Account Number (PAN)</strong> to simulate your credit bureau match. We partner with RBI-registered NBFCs to calculate zero-cost monthly installments instantly.
                  </p>
                </div>

                {/* Primary Field 1: PAN Holder's Full Name */}
                <div>
                  <label className="block text-13 font-bold text-brand-navy mb-1.5">
                    Parent / Guardian's Full Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar Sharma (as on PAN card)"
                    className="w-full px-3.5 py-2.5 bg-white border border-brand-border rounded-lg text-14 text-brand-navy focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  />
                  <p className="text-[11px] text-brand-muted mt-1">Must match exactly as printed on your official PAN card.</p>
                </div>

                {/* Primary Field 2: DEDICATED PAN NUMBER FIELD */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-13 font-bold text-brand-navy flex items-center gap-1.5">
                      <CreditCard size={15} className="text-brand-blue" />
                      <span>Parent / Guardian's PAN Number</span>
                      <span className="text-red-500">*</span>
                    </label>
                    {panNumber && (
                      <span className={`text-11 font-bold ${isPanValid ? 'text-emerald-700 flex items-center gap-1' : 'text-amber-700'}`}>
                        {isPanValid ? <><Check size={12} /> Valid 10-Digit PAN</> : 'Format: ABCDE1234F'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      maxLength={10}
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-15 font-mono tracking-widest uppercase text-brand-navy focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all ${
                        panNumber ? (isPanValid ? 'border-emerald-500 bg-emerald-50/20' : 'border-amber-400') : 'border-brand-border'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-11 font-bold text-slate-400 pointer-events-none uppercase">
                      IN-TAX
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Used strictly for bureau matching and KYC identity verification. No hard inquiry registered.
                  </p>
                </div>

                {/* Mobile Number & Fee Grid */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-13 font-bold text-brand-navy mb-1.5">
                      Mobile Number (Aadhaar Linked) <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-brand-surface border border-r-0 border-brand-border rounded-l-lg text-13 font-bold text-brand-navy">
                        +91
                      </span>
                      <input 
                        type="tel" 
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className="w-full px-3.5 py-2.5 bg-white border border-brand-border rounded-r-lg text-14 text-brand-navy focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-13 font-bold text-brand-navy mb-1.5">
                      Annual Fee Amount (₹) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="number" 
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                      placeholder="e.g. 1,20,000"
                      className="w-full px-3.5 py-2.5 bg-white border border-brand-border rounded-lg text-14 text-brand-navy focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none"
                    />
                  </div>
                </div>

                {/* School / Institution Search Dropdown */}
                <div>
                  <label className="block text-13 font-bold text-brand-navy mb-1.5">
                    School / College / Institution <span className="text-red-500">*</span>
                  </label>
                  <SchoolSelectDropdown
                    value={selectedInstitution.name}
                    onChange={(inst) => setSelectedInstitution(inst)}
                    placeholder="Search or select school (e.g. Podar, DPS, Solitaire)..."
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button 
                    disabled={!isFormValid}
                    onClick={() => evaluateEligibility()}
                    className="w-full py-3.5 bg-brand-blue text-white rounded-xl font-bold text-15 shadow-md hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    <span>Simulate CIBIL Check & Calculate Chances</span>
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* Testing Presets for Quick Demo */}
                <div className="pt-2 border-t border-brand-border">
                  <div className="flex items-center justify-between text-[11px] text-brand-muted mb-2">
                    <span className="font-semibold text-brand-navy uppercase tracking-wider">⚡ Test Probability Scenarios:</span>
                    <span>Click to test color-coded outputs</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setTestScenario(790, 'Sunil Narayan Mehta', 'ABCPM1234K')}
                      className="px-2 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-lg text-11 font-semibold text-center transition-colors cursor-pointer"
                    >
                      🟢 790 High (Green)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTestScenario(715, 'Pooja Anand Varma', 'BHYPV5678L')}
                      className="px-2 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-lg text-11 font-semibold text-center transition-colors cursor-pointer"
                    >
                      🟡 715 Moderate (Amber)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTestScenario(635, 'Vikramjeet Singh', 'CDEPS9012M')}
                      className="px-2 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 rounded-lg text-11 font-semibold text-center transition-colors cursor-pointer"
                    >
                      🔵 635 Manual (Blue)
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: ANALYZING SIMULATION ANIMATION */}
            {view === 'analyzing' && (
              <motion.div 
                key="analyzing-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 px-4 text-center space-y-6"
              >
                <div className="relative w-20 h-20 mx-auto">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                    className="w-20 h-20 rounded-full border-4 border-brand-blue/20 border-t-brand-blue"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-brand-navy font-black text-14">
                    {analysisProgress}%
                  </div>
                </div>

                <div>
                  <h4 className="text-18 font-bold text-brand-navy mb-2">Simulating CIBIL Bureau Assessment</h4>
                  <p className="text-13 text-brand-muted max-w-sm mx-auto">{analysisStatusText}</p>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden max-w-xs mx-auto">
                  <motion.div 
                    className="h-full bg-brand-blue rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${analysisProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <p className="text-[11px] text-slate-400">
                  TransUnion CIBIL · Equifax · Experian Soft Registry Simulation
                </p>
              </motion.div>
            )}

            {/* VIEW 3: RESULT SCREEN WITH COLOR-CODED PROBABILITY & TERMS */}
            {view === 'result' && (
              <motion.div 
                key="result-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                {/* Result Card with Color Code & Probability Status */}
                <div className={`p-5 rounded-2xl border ${approvalTier.containerBg} relative overflow-hidden shadow-xs`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-white text-[11px] font-bold uppercase tracking-wider ${approvalTier.badgeBg}`}>
                          {approvalTier.probabilityText}
                        </span>
                      </div>
                      
                      {/* Highlighted Color-Coded Status */}
                      <h4 className={`text-20 font-bold ${approvalTier.textColorClass}`}>
                        {approvalTier.probabilitySubtitle}
                      </h4>
                      <p className="text-12 text-slate-700 leading-relaxed max-w-md">
                        {approvalTier.description}
                      </p>
                    </div>

                    {/* CIBIL Score Card */}
                    <div className="shrink-0 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl border border-black/10 text-center shadow-sm min-w-[120px]">
                      <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">Bureau Score</span>
                      <div className="text-30 font-black leading-none my-1" style={{ color: approvalTier.accentColor }}>
                        {calculatedCibil}
                      </div>
                      <span className={`text-[11px] font-bold ${approvalTier.textColorClass} block`}>
                        {approvalTier.scoreVerdict}
                      </span>
                    </div>
                  </div>

                  {/* Pre-Approved Terms Grid */}
                  <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                    <div className="bg-white/80 p-2.5 rounded-xl border border-black/5">
                      <span className="text-[10px] text-brand-muted font-bold block uppercase">Interest Rate</span>
                      <span className="text-13 font-bold text-brand-navy">{approvalTier.termInterest}</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-black/5">
                      <span className="text-[10px] text-brand-muted font-bold block uppercase">Processing Fee</span>
                      <span className="text-13 font-bold text-brand-navy">{approvalTier.termProcessingFee}</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-black/5">
                      <span className="text-[10px] text-brand-muted font-bold block uppercase">Estimated EMI</span>
                      <span className="text-13 font-bold text-brand-navy">₹{calculatedPlan.monthlyEMI.toLocaleString('en-IN')}/mo</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-black/5">
                      <span className="text-[10px] text-brand-muted font-bold block uppercase">Turnaround</span>
                      <span className="text-13 font-bold text-brand-navy">{approvalTier.termApprovalTime}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button: Proceed to Application */}
                {approvalTier.canAutoApprove ? (
                  <div className="space-y-2.5">
                    <button 
                      onClick={() => handleStartApplication('auto')}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-15 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <Sparkles size={18} />
                      <span>Proceed to Application with Pre-Filled Details</span>
                      <ArrowRight size={18} />
                    </button>

                    {/* Downloadable PDF Sanction Letter Preview Button */}
                    <button
                      type="button"
                      onClick={() => setIsSanctionOpen(true)}
                      className="w-full py-2.5 bg-white border-2 border-brand-blue/30 hover:border-brand-blue text-brand-blue hover:text-brand-navy rounded-xl font-bold text-13 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs hover:bg-brand-blue/5"
                    >
                      <FileCheck size={16} className="text-brand-blue" />
                      <span>View & Download Pre-Approved Sanction Letter (PDF)</span>
                      <Download size={14} />
                    </button>
                    
                    <div className="text-center pt-1">
                      <span className="text-12 text-brand-muted">
                        Looking for alternative income verification?{' '}
                        <button 
                          onClick={() => setView('manual_aa')}
                          className="text-brand-blue font-bold underline hover:text-brand-navy cursor-pointer"
                        >
                          Account Aggregator Verification
                        </button>
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Option for Manual Approval / Alternative Underwriting */
                  <div className="space-y-3 pt-1">
                    <div className="bg-slate-50 border border-brand-border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <UserCheck size={18} className="text-brand-blue" />
                        <h5 className="font-bold text-14 text-brand-navy">Alternative Underwriting Routes</h5>
                      </div>
                      <p className="text-12 text-brand-muted mb-3">
                        You can get approved within hours by sharing bank transaction history:
                      </p>

                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {/* Option 1: Account Aggregator (AA) */}
                        <div 
                          onClick={() => setView('manual_aa')}
                          className="p-3 bg-white border border-brand-border hover:border-brand-blue rounded-xl cursor-pointer transition-all hover:shadow-sm group"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-16">⚡</span>
                            <span className="text-[10px] font-bold bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded">
                              Instant (60s)
                            </span>
                          </div>
                          <h6 className="font-bold text-13 text-brand-navy group-hover:text-brand-blue">
                            Online Account Aggregator
                          </h6>
                          <p className="text-11 text-brand-muted mt-1 leading-snug">
                            RBI-approved OTP consent. Zero document uploads.
                          </p>
                        </div>

                        {/* Option 2: Upload 6 Months Statement */}
                        <div 
                          onClick={() => setView('manual_statement')}
                          className="p-3 bg-white border border-brand-border hover:border-brand-blue rounded-xl cursor-pointer transition-all hover:shadow-sm group"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-16">📄</span>
                            <span className="text-[10px] font-bold bg-slate-100 text-brand-navy px-2 py-0.5 rounded">
                              PDF Upload
                            </span>
                          </div>
                          <h6 className="font-bold text-13 text-brand-navy group-hover:text-brand-blue">
                            6-Month Bank Statement
                          </h6>
                          <p className="text-11 text-brand-muted mt-1 leading-snug">
                            Upload net-banking statement for manual review.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsSanctionOpen(true)}
                        className="w-full py-3 bg-white border border-brand-border hover:border-brand-blue text-brand-navy rounded-xl font-bold text-13 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <FileCheck size={15} />
                        <span>Preview Conditional Sanction</span>
                      </button>
                      <button 
                        onClick={() => handleStartApplication('manual_doc')}
                        className="w-full py-3 bg-brand-blue text-white rounded-xl font-bold text-13 hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Proceed to Application</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Back to Re-check */}
                <div className="flex justify-between items-center text-12 text-brand-muted pt-2 border-t border-brand-border">
                  <button 
                    onClick={() => setView('input')} 
                    className="hover:text-brand-navy flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <RefreshCw size={13} />
                    <span>Check with another PAN / Details</span>
                  </button>
                  <span>PAN: <strong className="text-brand-navy font-mono">{panNumber}</strong></span>
                </div>
              </motion.div>
            )}

            {/* VIEW 4: ONLINE ACCOUNT AGGREGATOR (AA) */}
            {view === 'manual_aa' && (
              <motion.div 
                key="manual-aa-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                  <div>
                    <h4 className="text-16 font-bold text-brand-navy">RBI Account Aggregator Verification</h4>
                    <p className="text-12 text-brand-muted">Secure, instant statement consent via Sahamati framework</p>
                  </div>
                  <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                    100% Encrypted
                  </span>
                </div>

                <div>
                  <label className="block text-13 font-bold text-brand-navy mb-2">Select Primary Salary / Business Bank</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {POPULAR_BANKS.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBank(b.id)}
                        className={`p-2.5 rounded-lg border text-left flex items-center gap-2 text-13 font-medium transition-all cursor-pointer ${
                          selectedBank === b.id 
                            ? 'border-brand-blue bg-brand-blue/5 text-brand-navy font-bold ring-2 ring-brand-blue/20' 
                            : 'border-brand-border bg-white text-brand-text hover:bg-brand-surface'
                        }`}
                      >
                        <span>{b.logo}</span>
                        <span className="truncate">{b.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedBank && (
                  <div className="bg-brand-surface p-4 rounded-xl border border-brand-border space-y-3">
                    <div className="flex items-center justify-between text-13">
                      <span className="text-brand-muted">Consent for Bank:</span>
                      <span className="font-bold text-brand-navy">
                        {POPULAR_BANKS.find(b => b.id === selectedBank)?.name}
                      </span>
                    </div>

                    {!aaOtpSent ? (
                      <button 
                        onClick={() => setAaOtpSent(true)}
                        className="w-full py-2.5 bg-brand-blue text-white rounded-lg font-bold text-13 hover:bg-brand-blue/90 transition-all cursor-pointer"
                      >
                        Request Bank Consent OTP on +91 {phone || '9876543210'}
                      </button>
                    ) : (
                      <div className="space-y-2.5">
                        <p className="text-12 text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-lg text-center font-medium">
                          OTP sent to mobile registered with bank (+91 {phone || '9876543210'})
                        </p>
                        <input 
                          type="text" 
                          maxLength={6}
                          value={aaMobileOtp}
                          onChange={(e) => setAaMobileOtp(e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          className="w-full px-3 py-2 bg-white border border-brand-border rounded-lg text-center tracking-widest font-mono text-16 outline-none focus:ring-2 focus:ring-brand-blue/20"
                        />
                        <button 
                          disabled={aaMobileOtp.length < 4 || isUploading}
                          onClick={handleAaSubmit}
                          className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold text-14 hover:bg-emerald-700 disabled:opacity-50 transition-all cursor-pointer"
                        >
                          {isUploading ? 'Verifying with RBI Aggregator...' : 'Authorize & Fetch 6 Months Statements'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center text-12 text-brand-muted pt-2">
                  <button onClick={() => setView('result')} className="hover:text-brand-navy cursor-pointer">
                    ← Back to Results
                  </button>
                  <button onClick={() => setView('manual_statement')} className="text-brand-blue hover:underline cursor-pointer">
                    Prefer PDF Upload instead?
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 5: UPLOAD 6-MONTH STATEMENT (PDF) */}
            {view === 'manual_statement' && (
              <motion.div 
                key="manual-statement-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                  <div>
                    <h4 className="text-16 font-bold text-brand-navy">Upload 6 Months Bank Statement</h4>
                    <p className="text-12 text-brand-muted">Upload official e-statement downloaded from net banking</p>
                  </div>
                </div>

                {/* Upload Box */}
                <div className="border-2 border-dashed border-brand-border hover:border-brand-blue rounded-xl p-6 text-center bg-brand-surface transition-colors relative cursor-pointer">
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={handleStatementUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-3">
                      <Upload size={24} />
                    </div>
                    {uploadedFileName ? (
                      <div className="space-y-1">
                        <p className="text-14 font-bold text-emerald-600 flex items-center justify-center gap-1.5">
                          <CheckCircle2 size={16} /> {uploadedFileName}
                        </p>
                        <p className="text-11 text-brand-muted">Click or drag to replace PDF</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-14 font-bold text-brand-navy">Choose file or drag & drop</p>
                        <p className="text-12 text-brand-muted mt-1">PDF format only (Max 15MB, last 6 months)</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Password input if protected */}
                <div>
                  <label className="block text-12 font-medium text-brand-muted mb-1">
                    Statement PDF Password (if protected by your bank)
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={pdfPassword}
                      onChange={(e) => setPdfPassword(e.target.value)}
                      placeholder="e.g. DOB / PAN / Customer ID"
                      className="w-full px-3 py-2 bg-white border border-brand-border rounded-lg text-13 outline-none focus:ring-2 focus:ring-brand-blue/20"
                    />
                    <Lock size={16} className="absolute right-3 top-2.5 text-brand-muted pointer-events-none" />
                  </div>
                </div>

                <button 
                  disabled={!uploadedFileName || isUploading}
                  onClick={handleManualStatementSubmit}
                  className="w-full py-3.5 bg-brand-blue text-white rounded-xl font-bold text-14 hover:bg-brand-blue/90 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isUploading ? 'Submitting to Underwriting Queue...' : 'Submit Statement for Manual Underwriting'}
                </button>

                <div className="flex justify-between items-center text-12 text-brand-muted pt-1">
                  <button onClick={() => setView('result')} className="hover:text-brand-navy cursor-pointer">
                    ← Back to Results
                  </button>
                  <button onClick={() => setView('manual_aa')} className="text-brand-blue hover:underline cursor-pointer">
                    Use Instant Account Aggregator instead
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 6: MANUAL UNDERWRITING SUBMISSION SUCCESS */}
            {view === 'manual_success' && (
              <motion.div 
                key="manual-success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-20 font-bold text-brand-navy">Documents Received for Manual Sanction</h4>
                <p className="text-13 text-brand-muted max-w-md mx-auto leading-relaxed">
                  Your banking verification is under review by our senior underwriting team. Sanction updates will be sent to <strong className="text-brand-navy">+91 {phone || '9876543210'}</strong> within 2 to 4 business hours.
                </p>

                <div className="bg-brand-surface p-4 rounded-xl border border-brand-border max-w-sm mx-auto text-left space-y-2 text-13">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Application ID:</span>
                    <span className="font-mono font-bold text-brand-navy">GQ-MANUAL-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Estimated Fees:</span>
                    <span className="font-bold text-brand-navy">₹{Number(fee || '120000').toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">School:</span>
                    <span className="font-bold text-brand-navy truncate max-w-[180px]">{selectedInstitution?.name || 'Partner Institution'}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                  <button 
                    onClick={() => handleStartApplication('manual_aa')}
                    className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-14 hover:bg-emerald-700 transition-all cursor-pointer"
                  >
                    Complete Full Profile
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full py-3 bg-slate-100 text-brand-navy rounded-xl font-bold text-14 hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Official PDF Sanction Letter Preview Modal */}
      <SanctionLetterModal
        isOpen={isSanctionOpen}
        onClose={() => setIsSanctionOpen(false)}
        onProceedToApply={() => {
          setIsSanctionOpen(false);
          handleStartApplication(approvalTier.canAutoApprove ? 'auto' : 'manual_doc');
        }}
        customerData={{
          fullName: fullName || 'Verified Parent Applicant',
          panNumber: panNumber || 'ABCDE1234F',
          phone: phone || '9876543210',
          institution: selectedInstitution || INSTITUTIONS[0],
          feeAmount: Number(fee || '120000'),
          cibilScore: calculatedCibil || 780,
        }}
      />
    </div>
  );
};

