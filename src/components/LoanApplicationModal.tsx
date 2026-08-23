import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ChevronRight, ChevronLeft, CheckCircle2, ShieldCheck, CreditCard, 
  Briefcase, User, Check, Building2, Sparkles, AlertCircle, ArrowRight, 
  FileText, Lock, Smartphone, Shield, Download, ExternalLink, RefreshCw, 
  HelpCircle, Landmark, UploadCloud, Eye, Calendar, Award, CheckCircle
} from 'lucide-react';
import { SchoolSelectDropdown } from './SchoolSelectDropdown';
import { INSTITUTIONS, Institution } from '../data/institutions';
import { Logo } from './Logo';
import { SanctionLetterModal } from './SanctionLetterModal';

export type ApplicationPhase = 
  | 'applicant_details'      // 1. Parent/Applicant details & PAN verification
  | 'student_details'        // 2. Student details & Institute selection
  | 'employment_details'     // 3. Employment & Income of relative/applicant
  | 'digilocker_kyc'         // 4. DigiLocker Government ID & Address verification
  | 'underwriting_decision'  // 5. Auto Approval vs Manual Review (AA OTP / Bank Statement)
  | 'nbfc_partner'           // 6. Lending NBFC Partner Selection
  | 'bank_account'           // 7. Bank Account Details (Penny Drop)
  | 'mandate_setup'          // 8. e-NACH / UPI AutoPay Mandate
  | 'application_complete';  // 9. Live Backend Tracking & Sanction Letter

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (application: any) => void;
  initialData?: {
    fullName?: string;
    email?: string;
    phone?: string;
    dob?: string;
    gender?: string;
    employmentType?: string;
    employerName?: string;
    monthlyIncome?: string;
    panNumber?: string;
    schoolName?: string;
    studentName?: string;
    studentGender?: string;
    studentDob?: string;
    studentClass?: string;
    loanAmount?: string;
    tenure?: number;
  };
}

interface StepMeta {
  key: ApplicationPhase;
  phaseNum: number;
  title: string;
  shortTitle: string;
  category: 'Identity' | 'Academic' | 'Financial' | 'Verification' | 'Approval' | 'Disbursement';
}

const PHASES: StepMeta[] = [
  { key: 'applicant_details', phaseNum: 1, title: 'Parent & PAN', shortTitle: '1. Parent PAN', category: 'Identity' },
  { key: 'student_details', phaseNum: 2, title: 'Student & School', shortTitle: '2. Student', category: 'Academic' },
  { key: 'employment_details', phaseNum: 3, title: 'Employment', shortTitle: '3. Income', category: 'Financial' },
  { key: 'digilocker_kyc', phaseNum: 4, title: 'DigiLocker KYC', shortTitle: '4. DigiLocker', category: 'Verification' },
  { key: 'underwriting_decision', phaseNum: 5, title: 'Credit Decision', shortTitle: '5. Approval', category: 'Approval' },
  { key: 'nbfc_partner', phaseNum: 6, title: 'NBFC Partner', shortTitle: '6. NBFC Partner', category: 'Approval' },
  { key: 'bank_account', phaseNum: 7, title: 'Bank Account', shortTitle: '7. Bank Details', category: 'Disbursement' },
  { key: 'mandate_setup', phaseNum: 8, title: 'AutoPay Mandate', shortTitle: '8. Mandate', category: 'Disbursement' },
  { key: 'application_complete', phaseNum: 9, title: 'Complete', shortTitle: '9. Status', category: 'Disbursement' },
];

export const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  initialData 
}) => {
  const [currentPhase, setCurrentPhase] = useState<ApplicationPhase>('applicant_details');
  const [applicationId, setApplicationId] = useState<string>('');
  const [showSanctionModal, setShowSanctionModal] = useState(false);

  // 1. Applicant Personal State
  const [panNumber, setPanNumber] = useState(initialData?.panNumber || '');
  const [isPanVerified, setIsPanVerified] = useState(false);
  const [isVerifyingPan, setIsVerifyingPan] = useState(false);
  const [parentName, setParentName] = useState(initialData?.fullName || '');
  const [parentGender, setParentGender] = useState(initialData?.gender || 'Male');
  const [parentDob, setParentDob] = useState(initialData?.dob || '1984-06-15');
  const [parentPhone, setParentPhone] = useState(initialData?.phone || '');
  const [parentEmail, setParentEmail] = useState(initialData?.email || '');

  // 2. Student & Academic State
  const [studentName, setStudentName] = useState(initialData?.studentName || '');
  const [studentGender, setStudentGender] = useState(initialData?.studentGender || 'Male');
  const [studentDob, setStudentDob] = useState(initialData?.studentDob || '2012-08-20');
  const [relationship, setRelationship] = useState('Father');
  const [schoolName, setSchoolName] = useState(initialData?.schoolName || 'Sri Chaitanya Junior Colleges & IIT Academy');
  const [studentClass, setStudentClass] = useState(initialData?.studentClass || 'Grade 10 (CBSE)');
  const [annualFee, setAnnualFee] = useState<string>(initialData?.loanAmount || '120000');
  const [selectedTenure, setSelectedTenure] = useState<number>(initialData?.tenure || 6);

  // 3. Employment State
  const [employmentType, setEmploymentType] = useState(initialData?.employmentType || 'salaried');
  const [employerName, setEmployerName] = useState(initialData?.employerName || '');
  const [designation, setDesignation] = useState('Senior Manager / Consultant');
  const [monthlyIncome, setMonthlyIncome] = useState(initialData?.monthlyIncome || '85000');
  const [workExperience, setWorkExperience] = useState('8 Years');
  const [workEmail, setWorkEmail] = useState('');
  const [workCity, setWorkCity] = useState('Mumbai');

  // 4. DigiLocker State
  const [aadhaarNumber, setAadhaarNumber] = useState('5489 9012 3456');
  const [digilockerOtp, setDigilockerOtp] = useState('');
  const [isDigilockerOtpSent, setIsDigilockerOtpSent] = useState(false);
  const [isDigilockerVerified, setIsDigilockerVerified] = useState(false);
  const [isVerifyingDigilocker, setIsVerifyingDigilocker] = useState(false);

  // 5. Underwriting State (Auto vs Manual)
  const [underwritingMode, setUnderwritingMode] = useState<'evaluating' | 'auto_approved' | 'manual_review'>('evaluating');
  const [manualMethod, setManualMethod] = useState<'account_aggregator' | 'bank_statement'>('account_aggregator');
  const [aaBank, setAaBank] = useState('HDFC Bank');
  const [aaOtp, setAaOtp] = useState('');
  const [isAaOtpSent, setIsAaOtpSent] = useState(false);
  const [isManualVerified, setIsManualVerified] = useState(false);
  const [isUnderwritingProcessing, setIsUnderwritingProcessing] = useState(false);
  const [cibilScore, setCibilScore] = useState<number>(768);

  // 6. NBFC Partner Selection State
  const [selectedNbfc, setSelectedNbfc] = useState<string>('grayquest_finance');

  // 7. Bank Account Details State
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [accountNumber, setAccountNumber] = useState('50100492819201');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('50100492819201');
  const [ifscCode, setIfscCode] = useState('HDFC0000123');
  const [branchName, setBranchName] = useState('Fort Branch, Mumbai');
  const [accountType, setAccountType] = useState('Savings');
  const [isPennyDropVerified, setIsPennyDropVerified] = useState(false);
  const [isPennyDropping, setIsPennyDropping] = useState(false);

  // 8. Mandate Setup State
  const [mandateMode, setMandateMode] = useState<'upi_autopay' | 'net_banking' | 'debit_card'>('upi_autopay');
  const [upiId, setUpiId] = useState('parent@okaxis');
  const [isMandateAuthorized, setIsMandateAuthorized] = useState(false);
  const [isAuthorizingMandate, setIsAuthorizingMandate] = useState(false);

  // Synchronize initial Data
  useEffect(() => {
    if (isOpen) {
      if (!applicationId) {
        setApplicationId('GQ-' + Math.floor(100000 + Math.random() * 900000));
      }
      if (initialData) {
        if (initialData.panNumber) {
          setPanNumber(initialData.panNumber);
          if (initialData.panNumber.length === 10) {
            setIsPanVerified(true);
          }
        }
        if (initialData.fullName) setParentName(initialData.fullName);
        if (initialData.phone) setParentPhone(initialData.phone);
        if (initialData.email) setParentEmail(initialData.email);
        if (initialData.schoolName) setSchoolName(initialData.schoolName);
        if (initialData.loanAmount) setAnnualFee(initialData.loanAmount);
        if (initialData.tenure) setSelectedTenure(initialData.tenure);
        if (initialData.monthlyIncome) setMonthlyIncome(initialData.monthlyIncome);
        if (initialData.employerName) setEmployerName(initialData.employerName);
      }
      if (parentName) {
        setAccountHolderName(parentName);
      }
    }
  }, [isOpen, initialData]);

  // Keep Account Holder Name matched to Parent Name
  useEffect(() => {
    if (parentName && !accountHolderName) {
      setAccountHolderName(parentName);
    }
  }, [parentName]);

  // Auto-verify PAN if 10 characters valid
  const handleVerifyPan = () => {
    if (!panNumber || panNumber.length !== 10) return;
    setIsVerifyingPan(true);
    setTimeout(() => {
      setIsVerifyingPan(false);
      setIsPanVerified(true);
      if (!parentName) {
        setParentName('RAJESH KUMAR SHARMA');
      }
    }, 900);
  };

  // DigiLocker Verification Simulation
  const handleSendDigilockerOtp = () => {
    setIsDigilockerOtpSent(true);
  };

  const handleVerifyDigilocker = () => {
    setIsVerifyingDigilocker(true);
    setTimeout(() => {
      setIsVerifyingDigilocker(false);
      setIsDigilockerVerified(true);
    }, 1100);
  };

  // Underwriting evaluation
  const runUnderwritingEvaluation = () => {
    setIsUnderwritingProcessing(true);
    setTimeout(() => {
      setIsUnderwritingProcessing(false);
      // Auto-approve if CIBIL >= 720
      if (cibilScore >= 720) {
        setUnderwritingMode('auto_approved');
      } else {
        setUnderwritingMode('manual_review');
      }
    }, 1400);
  };

  // Manual Underwriting Verification
  const handleVerifyManualAA = () => {
    setIsUnderwritingProcessing(true);
    setTimeout(() => {
      setIsUnderwritingProcessing(false);
      setIsManualVerified(true);
    }, 1000);
  };

  // Penny Drop Verification
  const handleVerifyPennyDrop = () => {
    setIsPennyDropping(true);
    setTimeout(() => {
      setIsPennyDropping(false);
      setIsPennyDropVerified(true);
    }, 1200);
  };

  // Mandate Authorization
  const handleAuthorizeMandate = () => {
    setIsAuthorizingMandate(true);
    setTimeout(() => {
      setIsAuthorizingMandate(false);
      setIsMandateAuthorized(true);
    }, 1300);
  };

  const getPhaseIndex = (phase: ApplicationPhase): number => {
    return PHASES.findIndex(p => p.key === phase);
  };

  const currentPhaseIndex = getPhaseIndex(currentPhase);

  // Strict validation for each individual phase
  const checkPhaseValidity = (phase: ApplicationPhase): { isValid: boolean; reason?: string } => {
    switch (phase) {
      case 'applicant_details': {
        const panClean = panNumber.trim().toUpperCase();
        if (panClean.length !== 10) {
          return { isValid: false, reason: 'Enter a 10-character PAN' };
        }
        if (!isPanVerified) {
          return { isValid: false, reason: 'Please click "Verify PAN" to verify taxpayer record' };
        }
        if (parentName.trim().length < 3) {
          return { isValid: false, reason: 'Enter parent / guardian full name' };
        }
        if (!parentDob) {
          return { isValid: false, reason: 'Select parent date of birth' };
        }
        if (parentPhone.trim().length !== 10) {
          return { isValid: false, reason: 'Enter 10-digit mobile number' };
        }
        if (!parentEmail.trim() || !parentEmail.includes('@')) {
          return { isValid: false, reason: 'Enter a valid email address' };
        }
        return { isValid: true };
      }

      case 'student_details': {
        if (studentName.trim().length < 2) {
          return { isValid: false, reason: 'Enter student full name' };
        }
        if (!relationship) {
          return { isValid: false, reason: 'Select relationship to student' };
        }
        if (!schoolName.trim()) {
          return { isValid: false, reason: 'Select or enter the school name' };
        }
        if (!studentClass.trim()) {
          return { isValid: false, reason: 'Select student grade or class' };
        }
        if (!annualFee || Number(annualFee) <= 0) {
          return { isValid: false, reason: 'Enter valid annual fee amount' };
        }
        if (!selectedTenure) {
          return { isValid: false, reason: 'Select payment tenure' };
        }
        return { isValid: true };
      }

      case 'employment_details': {
        if (!employmentType) {
          return { isValid: false, reason: 'Select employment type' };
        }
        if (employerName.trim().length < 2) {
          return { isValid: false, reason: 'Enter company or business name' };
        }
        if (designation.trim().length < 2) {
          return { isValid: false, reason: 'Enter designation or profession' };
        }
        if (!monthlyIncome || Number(monthlyIncome) <= 0) {
          return { isValid: false, reason: 'Enter net monthly income' };
        }
        return { isValid: true };
      }

      case 'digilocker_kyc': {
        if (!isDigilockerVerified) {
          return { isValid: false, reason: 'Please complete DigiLocker OTP verification' };
        }
        return { isValid: true };
      }

      case 'underwriting_decision': {
        if (isUnderwritingProcessing) {
          return { isValid: false, reason: 'Credit underwriting is evaluating...' };
        }
        if (underwritingMode === 'manual_review' && !isManualVerified) {
          return { isValid: false, reason: 'Complete Account Aggregator OTP or submit Bank Statement' };
        }
        return { isValid: true };
      }

      case 'nbfc_partner': {
        if (!selectedNbfc) {
          return { isValid: false, reason: 'Select an NBFC lending partner' };
        }
        return { isValid: true };
      }

      case 'bank_account': {
        if (!bankName.trim()) {
          return { isValid: false, reason: 'Select bank name' };
        }
        if (accountNumber.trim().length < 8) {
          return { isValid: false, reason: 'Enter valid account number' };
        }
        if (confirmAccountNumber.trim() !== accountNumber.trim()) {
          return { isValid: false, reason: 'Account numbers do not match' };
        }
        if (ifscCode.trim().length < 10) {
          return { isValid: false, reason: 'Enter valid IFSC code' };
        }
        if (!isPennyDropVerified) {
          return { isValid: false, reason: 'Please click "Verify Bank Account (Penny Drop)"' };
        }
        return { isValid: true };
      }

      case 'mandate_setup': {
        if (!isMandateAuthorized) {
          return { isValid: false, reason: 'Please click "Authorize e-Mandate" to proceed' };
        }
        return { isValid: true };
      }

      case 'application_complete': {
        return { isValid: true };
      }

      default:
        return { isValid: true };
    }
  };

  const currentStepValidation = checkPhaseValidity(currentPhase);

  const goToNextPhase = () => {
    // Prevent moving forward if current step is invalid
    if (!currentStepValidation.isValid) {
      return;
    }

    const nextIdx = currentPhaseIndex + 1;
    if (nextIdx < PHASES.length) {
      const nextPhase = PHASES[nextIdx].key;
      setCurrentPhase(nextPhase);
      
      // If entering underwriting, run the evaluation
      if (nextPhase === 'underwriting_decision' && underwritingMode === 'evaluating') {
        runUnderwritingEvaluation();
      }

      // If completing, notify parent
      if (nextPhase === 'application_complete') {
        const completedApp = {
          id: applicationId,
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          amount: Number(annualFee).toLocaleString('en-IN'),
          status: 'Approved & Active',
          school: schoolName || 'Partner Institution',
          student: studentName || 'Student',
          emi: Math.round(Number(annualFee) / selectedTenure).toLocaleString('en-IN'),
          nbfc: selectedNbfc === 'grayquest_finance' ? 'GrayQuest NBFC' : 'Vivriti Capital NBFC',
        };
        onSuccess?.(completedApp);
      }
    }
  };

  const goToPrevPhase = () => {
    const prevIdx = currentPhaseIndex - 1;
    if (prevIdx >= 0) {
      setCurrentPhase(PHASES[prevIdx].key);
    }
  };

  const handleStepHeaderClick = (targetPhase: ApplicationPhase, targetIdx: number) => {
    // Can only go back to previous completed steps, cannot skip ahead
    if (targetIdx < currentPhaseIndex) {
      setCurrentPhase(targetPhase);
    }
  };

  if (!isOpen) return null;

  const monthlyEMIValue = Math.round(Number(annualFee || '100000') / selectedTenure);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-brand-navy/65 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Header Bar */}
        <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <Logo variant="light" size="sm" />
            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-13 font-bold text-white tracking-wide">
                  Institutional Education Fee Financing
                </span>
                <span className="bg-[#4C35DE] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  0% Interest
                </span>
              </div>
              <p className="text-[11px] text-white/70">
                Application Ref: <span className="font-mono font-bold text-emerald-400">{applicationId}</span> · RBI Compliant
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Phase Progress Stepper Bar (Horizontal Scrollable on Mobile) */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 shrink-0">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4 py-1">
            {PHASES.map((p, idx) => {
              const isCompleted = idx < currentPhaseIndex;
              const isCurrent = idx === currentPhaseIndex;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => handleStepHeaderClick(p.key, idx)}
                  disabled={idx > currentPhaseIndex}
                  className={`flex items-center gap-1.5 shrink-0 select-none text-left transition-all ${
                    isCurrent 
                      ? 'text-[#4C35DE] font-bold cursor-default' 
                      : isCompleted 
                        ? 'text-emerald-600 font-medium cursor-pointer hover:opacity-80' 
                        : 'text-slate-400 font-normal cursor-not-allowed opacity-60'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isCurrent 
                      ? 'bg-[#4C35DE] text-white ring-2 ring-[#4C35DE]/30' 
                      : isCompleted 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isCompleted ? <Check size={11} strokeWidth={3} /> : p.phaseNum}
                  </div>
                  <span className="text-[11px] whitespace-nowrap hidden sm:inline">
                    {p.shortTitle}
                  </span>
                  {idx < PHASES.length - 1 && (
                    <div className={`w-3 sm:w-4 h-[1px] mx-0.5 ${
                      isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>
          {/* Progress percentage bar */}
          <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-[#4C35DE] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentPhaseIndex + 1) / PHASES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 bg-white">
          <AnimatePresence mode="wait">
            
            {/* =========================================================================
                PHASE 1: APPLICANT (PARENT/GUARDIAN) DETAILS & PAN VERIFICATION
               ========================================================================= */}
            {currentPhase === 'applicant_details' && (
              <motion.div
                key="phase-1"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-11 font-bold text-[#4C35DE] uppercase tracking-wider bg-[#4C35DE]/10 px-2.5 py-0.5 rounded-md">
                      Phase 1 of 9 · Applicant KYC
                    </span>
                    <span className="text-11 text-slate-500 font-medium">Primary Borrower (Parent / Guardian)</span>
                  </div>
                  <h2 className="text-20 sm:text-24 font-bold text-brand-navy mt-1">
                    Parent / Applicant Identity & PAN Verification
                  </h2>
                  <p className="text-13 text-brand-muted mt-1">
                    Please provide the details of the parent or earning guardian. In accordance with RBI guidelines, the student cannot be the primary applicant.
                  </p>
                </div>

                {/* PAN Input & Verification Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
                  <label className="block text-12 font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                    Parent / Guardian's PAN Card Number *
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5 items-stretch">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        maxLength={10}
                        value={panNumber}
                        onChange={(e) => {
                          const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                          setPanNumber(val);
                          setIsPanVerified(false);
                        }}
                        placeholder="e.g. ABCDE1234F"
                        className={`w-full bg-white border ${
                          isPanVerified ? 'border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20' : 'border-slate-300 text-brand-navy'
                        } rounded-xl px-4 py-2.5 text-15 font-mono font-bold tracking-widest uppercase focus:outline-none focus:border-[#4C35DE]`}
                      />
                      {isPanVerified && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-600 text-12 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 size={14} />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={panNumber.length !== 10 || isVerifyingPan || isPanVerified}
                      onClick={handleVerifyPan}
                      className={`px-4 py-2.5 rounded-xl text-12 font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isPanVerified 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : panNumber.length === 10 
                            ? 'bg-[#4C35DE] text-white hover:bg-brand-navy shadow-sm' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isVerifyingPan ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Verifying with NSDL...</span>
                        </>
                      ) : isPanVerified ? (
                        <>
                          <Check size={14} strokeWidth={3} />
                          <span>PAN Verified</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          <span>Verify PAN</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isPanVerified ? (
                    <div className="mt-2.5 flex items-center gap-2 text-11 text-emerald-700 font-medium bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
                      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                      <span>Verified Active Taxpayer Record with Income Tax Department & NSDL. Zero bureau hard-pull impact.</span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-brand-muted mt-1.5">
                      10-character alphanumeric PAN format. We will verify active taxpayer records instantly.
                    </p>
                  )}
                </div>

                {/* Parent Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name as per PAN */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Parent / Guardian Full Name (as on PAN) *
                    </label>
                    <input 
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar Sharma"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Gender *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Male', 'Female', 'Other'].map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setParentGender(g)}
                          className={`py-2 text-13 font-bold rounded-xl border transition-all cursor-pointer ${
                            parentGender === g 
                              ? 'bg-[#4C35DE] text-white border-[#4C35DE] shadow-xs' 
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Date of Birth (as per Govt ID) *
                    </label>
                    <input 
                      type="date"
                      value={parentDob}
                      onChange={(e) => setParentDob(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Mobile Number (Aadhaar linked) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-13 font-bold text-slate-400">
                        +91
                      </span>
                      <input 
                        type="tel"
                        maxLength={10}
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="9876543210"
                        className="w-full bg-white border border-slate-300 rounded-xl pl-12 pr-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Email Address (for Sanction Letter & Receipt) *
                    </label>
                    <input 
                      type="email"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="e.g. parent.name@example.com"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PHASE 2: STUDENT DETAILS & INSTITUTION SELECTION
               ========================================================================= */}
            {currentPhase === 'student_details' && (
              <motion.div
                key="phase-2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-11 font-bold text-[#4C35DE] uppercase tracking-wider bg-[#4C35DE]/10 px-2.5 py-0.5 rounded-md">
                      Phase 2 of 9 · Academic Info
                    </span>
                    <span className="text-11 text-slate-500 font-medium">Child / Dependent Information</span>
                  </div>
                  <h2 className="text-20 sm:text-24 font-bold text-brand-navy mt-1">
                    Student & Academic Institution Details
                  </h2>
                  <p className="text-13 text-brand-muted mt-1">
                    Select your child's institution, current grade, and annual tuition amount for direct institutional disbursal.
                  </p>
                </div>

                {/* Relative Relationship Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5">
                  <AlertCircle size={17} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-12 text-amber-900 leading-relaxed">
                    <strong>RBI Co-Borrower Mandate:</strong> The loan applicant (<span className="font-semibold">{parentName || 'Parent'}</span>) is the primary borrower sponsoring the student. The applicant cannot be the student themselves.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Student Name */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Student Full Name *
                    </label>
                    <input 
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* Relationship to Student */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Applicant's Relationship to Student *
                    </label>
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE] cursor-pointer"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                      <option value="Brother">Brother (Working Sibling)</option>
                      <option value="Sister">Sister (Working Sibling)</option>
                      <option value="Paternal Uncle">Paternal Uncle</option>
                      <option value="Maternal Uncle">Maternal Uncle</option>
                    </select>
                  </div>

                  {/* Student Gender */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Student Gender *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Male', 'Female', 'Other'].map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setStudentGender(g)}
                          className={`py-2 text-13 font-bold rounded-xl border transition-all cursor-pointer ${
                            studentGender === g 
                              ? 'bg-[#4C35DE] text-white border-[#4C35DE] shadow-xs' 
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Student Date of Birth */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Student Date of Birth
                    </label>
                    <input 
                      type="date"
                      value={studentDob}
                      onChange={(e) => setStudentDob(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>
                </div>

                {/* School / Institution Search Dropdown */}
                <div className="space-y-2">
                  <label className="block text-12 font-bold text-brand-navy">
                    Select School, Junior College, or University *
                  </label>
                  <SchoolSelectDropdown 
                    value={schoolName}
                    onSelect={(inst) => setSchoolName(inst.name)}
                    onCustomTextChange={(txt) => setSchoolName(txt)}
                    placeholder="Search 6,500+ schools & colleges (e.g. Sri Chaitanya, Podar, DPS, Narayana)..."
                  />
                </div>

                {/* Class & Annual Fee Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Class / Grade */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Grade / Class / Degree Year *
                    </label>
                    <input 
                      type="text"
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      placeholder="e.g. Grade 10 (CBSE), 1st Year B.Tech, 2nd Year PU"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* Annual Fee */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Annual Tuition Fee Amount (₹) *
                    </label>
                    <input 
                      type="number"
                      value={annualFee}
                      onChange={(e) => setAnnualFee(e.target.value)}
                      placeholder="120000"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 font-mono font-bold text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>
                </div>

                {/* Preferred Tenure Selector */}
                <div>
                  <label className="block text-12 font-bold text-brand-navy mb-1.5">
                    Select Preferred Monthly Installment Plan
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { months: 3, tag: '0% Interest' },
                      { months: 6, tag: '0% Interest (Most Popular)' },
                      { months: 9, tag: 'Subsidized 2.0%' },
                      { months: 12, tag: 'Subsidized 3.5%' },
                    ].map(t => (
                      <button
                        key={t.months}
                        type="button"
                        onClick={() => setSelectedTenure(t.months)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedTenure === t.months 
                            ? 'border-[#4C35DE] bg-[#4C35DE]/5 ring-2 ring-[#4C35DE]/20' 
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-14 font-bold text-brand-navy">{t.months} Months</span>
                          {selectedTenure === t.months && <CheckCircle2 size={15} className="text-[#4C35DE]" />}
                        </div>
                        <p className="text-[11px] font-bold text-[#4C35DE] mt-1">{t.tag}</p>
                        <p className="text-12 font-mono font-semibold text-slate-700 mt-1">
                          ₹{Math.round(Number(annualFee || '120000') / t.months).toLocaleString('en-IN')}/mo
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PHASE 3: EMPLOYMENT & INCOME DETAILS OF APPLICANT
               ========================================================================= */}
            {currentPhase === 'employment_details' && (
              <motion.div
                key="phase-3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-11 font-bold text-[#4C35DE] uppercase tracking-wider bg-[#4C35DE]/10 px-2.5 py-0.5 rounded-md">
                      Phase 3 of 9 · Financial Profile
                    </span>
                    <span className="text-11 text-slate-500 font-medium">Income & Affordability Check</span>
                  </div>
                  <h2 className="text-20 sm:text-24 font-bold text-brand-navy mt-1">
                    Applicant's Employment & Financial Details
                  </h2>
                  <p className="text-13 text-brand-muted mt-1">
                    Provide your professional details to establish repayment capability for 0% monthly installments.
                  </p>
                </div>

                {/* Employment Type Selector */}
                <div>
                  <label className="block text-12 font-bold text-brand-navy mb-2">
                    Employment Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'salaried', title: 'Salaried Employee', desc: 'Corporate, MNC, Govt, PSU' },
                      { id: 'professional', title: 'Self-Employed Pro', desc: 'Doctor, CA, Lawyer, Architect' },
                      { id: 'business', title: 'Business Owner', desc: 'Proprietor, LLP, Pvt Ltd' },
                    ].map(emp => (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => setEmploymentType(emp.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          employmentType === emp.id 
                            ? 'border-[#4C35DE] bg-[#4C35DE]/5 ring-2 ring-[#4C35DE]/20' 
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-13 font-bold text-brand-navy">{emp.title}</span>
                          {employmentType === emp.id && <CheckCircle2 size={15} className="text-[#4C35DE]" />}
                        </div>
                        <p className="text-[11px] text-brand-muted mt-1">{emp.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Company & Role Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Employer Name */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      {employmentType === 'salaried' ? 'Company / Employer Name *' : 'Business / Practice Name *'}
                    </label>
                    <input 
                      type="text"
                      value={employerName}
                      onChange={(e) => setEmployerName(e.target.value)}
                      placeholder="e.g. Tata Consultancy Services / Sharma Clinic"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Designation / Role *
                    </label>
                    <input 
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Senior Manager, VP, Lead Consultant"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* Monthly Income */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Net Monthly Take-Home Income (₹) *
                    </label>
                    <input 
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      placeholder="85000"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 font-mono font-bold text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                    <div className="flex gap-1.5 mt-2">
                      {['50000', '85000', '125000', '200000'].map(amt => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setMonthlyIncome(amt)}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-100 hover:bg-slate-200 text-slate-700"
                        >
                          ₹{(Number(amt) / 1000).toFixed(0)}k
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Total Work Experience
                    </label>
                    <select
                      value={workExperience}
                      onChange={(e) => setWorkExperience(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE] cursor-pointer"
                    >
                      <option value="2-4 Years">2 - 4 Years</option>
                      <option value="5-8 Years">5 - 8 Years</option>
                      <option value="8+ Years">8+ Years (Experienced)</option>
                      <option value="15+ Years">15+ Years (Senior Executive)</option>
                    </select>
                  </div>

                  {/* Office Email */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Work / Official Email ID (Optional)
                    </label>
                    <input 
                      type="email"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      placeholder="e.g. rajesh.s@company.com"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* Office City */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Office City / Location
                    </label>
                    <input 
                      type="text"
                      value={workCity}
                      onChange={(e) => setWorkCity(e.target.value)}
                      placeholder="e.g. Mumbai, Bengaluru, Hyderabad, Delhi NCR"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PHASE 4: DIGILOCKER E-KYC VERIFICATION
               ========================================================================= */}
            {currentPhase === 'digilocker_kyc' && (
              <motion.div
                key="phase-4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-11 font-bold text-[#4C35DE] uppercase tracking-wider bg-[#4C35DE]/10 px-2.5 py-0.5 rounded-md">
                      Phase 4 of 9 · Paperless KYC
                    </span>
                    <span className="text-11 text-slate-500 font-medium">UIDAI & DigiLocker Gateway</span>
                  </div>
                  <h2 className="text-20 sm:text-24 font-bold text-brand-navy mt-1">
                    DigiLocker Government ID & Address Verification
                  </h2>
                  <p className="text-13 text-brand-muted mt-1">
                    Zero physical documents needed. Verify your government-issued identity and residential address via official DigiLocker API.
                  </p>
                </div>

                {/* DigiLocker Gateway Card */}
                <div className="border border-slate-200 rounded-2xl p-5 bg-gradient-to-b from-slate-50 to-white shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#004B87] text-white flex items-center justify-center font-bold text-16 shadow-xs">
                        DL
                      </div>
                      <div>
                        <h4 className="text-14 font-bold text-brand-navy">DigiLocker Govt. of India</h4>
                        <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                          <ShieldCheck size={13} />
                          MeitY Certified 256-Bit SSL Gateway
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-200">
                      e-KYC v2.1
                    </span>
                  </div>

                  {!isDigilockerVerified ? (
                    <div className="mt-5 space-y-4">
                      <div>
                        <label className="block text-12 font-bold text-brand-navy mb-1.5">
                          Applicant's Aadhaar Number (12 Digits) *
                        </label>
                        <div className="flex gap-2">
                          <input 
                            type="text"
                            maxLength={14}
                            value={aadhaarNumber}
                            onChange={(e) => setAadhaarNumber(e.target.value)}
                            placeholder="5489 9012 3456"
                            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-15 font-mono font-bold tracking-wider text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                          />
                          <button
                            type="button"
                            onClick={handleSendDigilockerOtp}
                            className="px-4 py-2.5 rounded-xl text-12 font-bold bg-slate-100 hover:bg-slate-200 text-brand-navy border border-slate-300 cursor-pointer"
                          >
                            {isDigilockerOtpSent ? 'Resend OTP' : 'Send OTP'}
                          </button>
                        </div>
                      </div>

                      {isDigilockerOtpSent && (
                        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-12 font-bold text-blue-950">Enter 6-Digit DigiLocker OTP</span>
                            <span className="text-[11px] text-blue-700 font-mono bg-white px-2 py-0.5 rounded border border-blue-200">
                              Simulated OTP: 492018
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <input 
                              type="text"
                              maxLength={6}
                              value={digilockerOtp}
                              onChange={(e) => setDigilockerOtp(e.target.value)}
                              placeholder="492018"
                              className="flex-1 bg-white border border-blue-300 rounded-xl px-4 py-2 text-16 font-mono font-bold tracking-widest text-center focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyDigilocker}
                              disabled={isVerifyingDigilocker}
                              className="px-5 py-2 bg-[#4C35DE] text-white rounded-xl text-12 font-bold hover:bg-brand-navy transition-all cursor-pointer flex items-center gap-2"
                            >
                              {isVerifyingDigilocker ? (
                                <>
                                  <RefreshCw size={14} className="animate-spin" />
                                  <span>Authenticating...</span>
                                </>
                              ) : (
                                <>
                                  <Check size={14} strokeWidth={3} />
                                  <span>Authorize & Verify</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Verified Aadhaar ID Card */
                    <div className="mt-5 bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <Check size={14} strokeWidth={3} />
                          </div>
                          <span className="text-13 font-bold text-emerald-900">Aadhaar Identity & Address Verified</span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Official DigiLocker Seal
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-12 border-t border-emerald-200/60">
                        <div>
                          <p className="text-slate-500">Verified Name</p>
                          <p className="font-bold text-brand-navy">{parentName || 'RAJESH KUMAR SHARMA'}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Aadhaar Reference</p>
                          <p className="font-mono font-bold text-brand-navy">XXXX XXXX 3456</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-slate-500">Official Residential Address (Fetched)</p>
                          <p className="font-medium text-brand-navy">
                            Flat 402, Oakwood Residency, Sector 15, Vashi, Navi Mumbai, Maharashtra - 400703
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PHASE 5: UNDERWRITING DECISION ENGINE (AUTO vs MANUAL)
               ========================================================================= */}
            {currentPhase === 'underwriting_decision' && (
              <motion.div
                key="phase-5"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-11 font-bold text-[#4C35DE] uppercase tracking-wider bg-[#4C35DE]/10 px-2.5 py-0.5 rounded-md">
                      Phase 5 of 9 · Credit Underwriting
                    </span>
                    <span className="text-11 text-slate-500 font-medium">Algorithmic Risk Engine</span>
                  </div>
                  <h2 className="text-20 sm:text-24 font-bold text-brand-navy mt-1">
                    Credit Assessment & Sanction Clearance
                  </h2>
                  <p className="text-13 text-brand-muted mt-1">
                    Instant bureau evaluation across TransUnion CIBIL, CRIF, and RBI lending frameworks.
                  </p>
                </div>

                {isUnderwritingProcessing ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <RefreshCw size={36} className="animate-spin text-[#4C35DE] mx-auto" />
                    <div>
                      <h4 className="text-16 font-bold text-brand-navy">Analyzing Credit Bureau & Subvention Matrix...</h4>
                      <p className="text-12 text-brand-muted mt-1">
                        Performing automated debt-to-income and institutional fee ratio checks in real time.
                      </p>
                    </div>
                  </div>
                ) : underwritingMode === 'auto_approved' ? (
                  /* AUTO APPROVAL CARD */
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-2xl p-6 shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-11 font-bold tracking-wider uppercase bg-white/20 px-3 py-1 rounded-full">
                        Instant Automated Sanction
                      </span>
                      <span className="text-12 font-bold bg-white text-emerald-800 px-2.5 py-0.5 rounded-md shadow-2xs">
                        CIBIL Score: {cibilScore} (Excellent)
                      </span>
                    </div>

                    <div>
                      <h3 className="text-22 sm:text-26 font-black tracking-tight">
                        🎉 Loan Pre-Sanction Cleared!
                      </h3>
                      <p className="text-13 text-emerald-100 mt-1">
                        Congratulations! Your profile qualifies for 100% upfront school fee financing at 0% interest.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white/10 p-3.5 rounded-xl backdrop-blur-xs text-12">
                      <div>
                        <p className="text-emerald-200 text-[11px]">Sanctioned Amount</p>
                        <p className="text-16 font-mono font-black text-white">₹{Number(annualFee).toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-emerald-200 text-[11px]">Monthly Installment</p>
                        <p className="text-16 font-mono font-black text-white">₹{monthlyEMIValue.toLocaleString('en-IN')}/mo</p>
                      </div>
                      <div>
                        <p className="text-emerald-200 text-[11px]">Interest Rate</p>
                        <p className="text-16 font-bold text-emerald-300">0% (Subsidized)</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-emerald-100 pt-1">
                      <span>✓ ₹0 Down Payment Required</span>
                      <span>✓ ₹0 Processing Fee</span>
                      <span>✓ Free Student Term Cover</span>
                    </div>
                  </div>
                ) : (
                  /* MANUAL UNDERWRITING FLOW (AA OTP / BANK STATEMENT) */
                  <div className="border border-amber-200 bg-amber-50/50 rounded-2xl p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={22} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-15 font-bold text-amber-950">
                          Fast-Track Income Verification Required
                        </h4>
                        <p className="text-12 text-amber-900 mt-0.5">
                          To finalize your 0% approval, please authenticate your recent salary cashflows via RBI Account Aggregator or 6-month statement upload.
                        </p>
                      </div>
                    </div>

                    {/* Method Selector */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setManualMethod('account_aggregator')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          manualMethod === 'account_aggregator' 
                            ? 'border-[#4C35DE] bg-white ring-2 ring-[#4C35DE]/20 shadow-xs' 
                            : 'border-slate-200 bg-white/70 hover:bg-white'
                        }`}
                      >
                        <span className="text-12 font-bold text-brand-navy block">Option A: Account Aggregator</span>
                        <span className="text-[11px] text-emerald-600 font-semibold">10-Sec Instant OTP (Recommended)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setManualMethod('bank_statement')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          manualMethod === 'bank_statement' 
                            ? 'border-[#4C35DE] bg-white ring-2 ring-[#4C35DE]/20 shadow-xs' 
                            : 'border-slate-200 bg-white/70 hover:bg-white'
                        }`}
                      >
                        <span className="text-12 font-bold text-brand-navy block">Option B: Upload Statement</span>
                        <span className="text-[11px] text-slate-500">6-Month Bank PDF File</span>
                      </button>
                    </div>

                    {/* Method A: Account Aggregator */}
                    {manualMethod === 'account_aggregator' && (
                      <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-12 font-bold text-brand-navy">Select Salary Bank</span>
                          <span className="text-[10px] text-slate-400 font-mono">Sahamati AA Framework</span>
                        </div>
                        <select
                          value={aaBank}
                          onChange={(e) => setAaBank(e.target.value)}
                          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-13 text-brand-navy"
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="State Bank of India">State Bank of India</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        </select>

                        <div className="flex gap-2">
                          <input 
                            type="text"
                            placeholder="Enter 6-digit AA OTP (e.g. 582910)"
                            value={aaOtp}
                            onChange={(e) => setAaOtp(e.target.value)}
                            className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-13 font-mono"
                          />
                          <button
                            type="button"
                            onClick={handleVerifyManualAA}
                            className="px-4 py-2 bg-[#4C35DE] text-white rounded-xl text-12 font-bold hover:bg-brand-navy cursor-pointer"
                          >
                            {isManualVerified ? 'Verified ✓' : 'Fetch Statement'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Method B: Upload PDF Statement */}
                    {manualMethod === 'bank_statement' && (
                      <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-6 text-center space-y-2">
                        <UploadCloud size={28} className="text-[#4C35DE] mx-auto" />
                        <p className="text-12 font-bold text-brand-navy">Upload 6-Month Salary Bank Statement (PDF)</p>
                        <p className="text-[11px] text-slate-400">Max size 15MB · E-Statement with official bank seal</p>
                        <button 
                          type="button"
                          onClick={() => setIsManualVerified(true)}
                          className="mt-2 px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-12 font-bold rounded-lg cursor-pointer"
                        >
                          {isManualVerified ? 'Statement Verified ✓' : 'Browse Files & Auto-Parse'}
                        </button>
                      </div>
                    )}

                    {isManualVerified && (
                      <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-12 font-bold flex items-center gap-2 border border-emerald-200">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        <span>Income Cashflows Verified! Sanction Approved for ₹{Number(annualFee).toLocaleString('en-IN')}.</span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* =========================================================================
                PHASE 6: NBFC LENDING PARTNER SELECTION
               ========================================================================= */}
            {currentPhase === 'nbfc_partner' && (
              <motion.div
                key="phase-6"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-11 font-bold text-[#4C35DE] uppercase tracking-wider bg-[#4C35DE]/10 px-2.5 py-0.5 rounded-md">
                      Phase 6 of 9 · Regulated Lender
                    </span>
                    <span className="text-11 text-slate-500 font-medium">RBI Regulated NBFCs</span>
                  </div>
                  <h2 className="text-20 sm:text-24 font-bold text-brand-navy mt-1">
                    Select Regulated NBFC Lending Partner
                  </h2>
                  <p className="text-13 text-brand-muted mt-1">
                    All GrayQuest lending partners are licensed by the Reserve Bank of India with zero hidden fee clauses.
                  </p>
                </div>

                {/* NBFC List */}
                <div className="space-y-3">
                  {[
                    {
                      id: 'grayquest_finance',
                      name: 'GrayQuest Financial Services NBFC',
                      rbiReg: 'RBI Reg: N-13.02341',
                      tag: 'Fastest T+0 Disbursal',
                      desc: 'Direct institutional gateway with automated zero-bounce guarantee.',
                      badge: 'Primary Partner',
                    },
                    {
                      id: 'vivriti_capital',
                      name: 'Vivriti Capital Limited',
                      rbiReg: 'RBI Reg: B-07.00845',
                      tag: 'AAA Institutional Credit',
                      desc: 'Over ₹15,000 Cr credit portfolio. Zero foreclosure penalty.',
                      badge: 'Co-Lender',
                    },
                    {
                      id: 'northern_arc',
                      name: 'Northern Arc Capital',
                      rbiReg: 'RBI Reg: B-07.00652',
                      tag: '100% Digital Edu-Financing',
                      desc: 'Automated credit sanctioning with instant mandate creation.',
                      badge: 'Co-Lender',
                    },
                  ].map(nbfc => (
                    <button
                      key={nbfc.id}
                      type="button"
                      onClick={() => setSelectedNbfc(nbfc.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        selectedNbfc === nbfc.id 
                          ? 'border-[#4C35DE] bg-[#4C35DE]/5 ring-2 ring-[#4C35DE]/20 shadow-xs' 
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-14 font-bold text-brand-navy">{nbfc.name}</span>
                          <span className="text-[10px] font-bold bg-[#4C35DE]/10 text-[#4C35DE] px-2 py-0.5 rounded">
                            {nbfc.badge}
                          </span>
                        </div>
                        <p className="text-12 text-brand-muted">{nbfc.desc}</p>
                        <p className="text-[11px] font-mono text-slate-500">{nbfc.rbiReg} · {nbfc.tag}</p>
                      </div>
                      <div className="shrink-0">
                        {selectedNbfc === nbfc.id ? (
                          <div className="w-6 h-6 rounded-full bg-[#4C35DE] text-white flex items-center justify-center shadow-xs">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-slate-300" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Terms Overview Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-12 space-y-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Sanction Principal Amount:</span>
                    <span className="font-bold text-brand-navy font-mono">₹{Number(annualFee).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tenure & Installment Plan:</span>
                    <span className="font-bold text-brand-navy">{selectedTenure} Months @ 0% Interest</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Monthly Installment:</span>
                    <span className="font-bold text-[#4C35DE] font-mono">₹{monthlyEMIValue.toLocaleString('en-IN')}/month</span>
                  </div>
                  <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200 text-emerald-700 font-semibold">
                    <span>Complimentary Student Life Cover:</span>
                    <span>₹{Number(annualFee).toLocaleString('en-IN')} (Free by Kotak Life / Tata AIA)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PHASE 7: BANK ACCOUNT DETAILS & PENNY-DROP VERIFICATION
               ========================================================================= */}
            {currentPhase === 'bank_account' && (
              <motion.div
                key="phase-7"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-11 font-bold text-[#4C35DE] uppercase tracking-wider bg-[#4C35DE]/10 px-2.5 py-0.5 rounded-md">
                      Phase 7 of 9 · Repayment Bank
                    </span>
                    <span className="text-11 text-slate-500 font-medium">Penny Drop Validation</span>
                  </div>
                  <h2 className="text-20 sm:text-24 font-bold text-brand-navy mt-1">
                    Enter Bank Account for AutoPay Settlement
                  </h2>
                  <p className="text-13 text-brand-muted mt-1">
                    Provide the bank account from which monthly fee installments will be debited. The account name must match your verified identity.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Account Holder Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Account Holder Name (as per Bank Records) *
                    </label>
                    <input 
                      type="text"
                      value={accountHolderName || parentName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      placeholder="e.g. RAJESH KUMAR SHARMA"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 font-semibold text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* Bank Name */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Bank Name *
                    </label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE] cursor-pointer"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      <option value="Punjab National Bank">Punjab National Bank</option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                    </select>
                  </div>

                  {/* Account Type */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Account Type *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Savings', 'Current'].map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setAccountType(t)}
                          className={`py-2 text-13 font-bold rounded-xl border transition-all cursor-pointer ${
                            accountType === t 
                              ? 'bg-[#4C35DE] text-white border-[#4C35DE]' 
                              : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          {t} Account
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Account Number */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Bank Account Number *
                    </label>
                    <input 
                      type="password"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="e.g. 50100492819201"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 font-mono text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* Confirm Account Number */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Confirm Account Number *
                    </label>
                    <input 
                      type="text"
                      value={confirmAccountNumber}
                      onChange={(e) => setConfirmAccountNumber(e.target.value)}
                      placeholder="e.g. 50100492819201"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 font-mono text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* IFSC Code */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      IFSC Code *
                    </label>
                    <input 
                      type="text"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                      placeholder="e.g. HDFC0000123"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 font-mono uppercase text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>

                  {/* Branch Details */}
                  <div>
                    <label className="block text-12 font-bold text-brand-navy mb-1">
                      Branch & City
                    </label>
                    <input 
                      type="text"
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                      placeholder="e.g. Fort Branch, Mumbai"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-14 text-brand-navy focus:outline-none focus:border-[#4C35DE]"
                    />
                  </div>
                </div>

                {/* Penny Drop Verification Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-13 font-bold text-brand-navy">Penny-Drop Validation (₹1 Transfer)</p>
                      <p className="text-11 text-brand-muted">
                        Simulate depositing ₹1 into your account to confirm bank account name matches applicant identity.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleVerifyPennyDrop}
                      disabled={isPennyDropping || isPennyDropVerified}
                      className={`px-4 py-2 rounded-xl text-12 font-bold cursor-pointer transition-all flex items-center gap-2 ${
                        isPennyDropVerified 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-[#4C35DE] text-white hover:bg-brand-navy'
                      }`}
                    >
                      {isPennyDropping ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Testing Penny Drop...</span>
                        </>
                      ) : isPennyDropVerified ? (
                        <>
                          <Check size={14} strokeWidth={3} />
                          <span>Bank Account Verified</span>
                        </>
                      ) : (
                        <span>Verify Account</span>
                      )}
                    </button>
                  </div>

                  {isPennyDropVerified && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-11 text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span><strong>NPCI Match 100%:</strong> Beneficiary Name: <strong>{parentName || 'RAJESH KUMAR SHARMA'}</strong> matches Bank Record.</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PHASE 8: MANDATE SETUP (e-NACH / UPI AUTOPAY)
               ========================================================================= */}
            {currentPhase === 'mandate_setup' && (
              <motion.div
                key="phase-8"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-11 font-bold text-[#4C35DE] uppercase tracking-wider bg-[#4C35DE]/10 px-2.5 py-0.5 rounded-md">
                      Phase 8 of 9 · AutoPay Mandate
                    </span>
                    <span className="text-11 text-slate-500 font-medium">NPCI & e-NACH</span>
                  </div>
                  <h2 className="text-20 sm:text-24 font-bold text-brand-navy mt-1">
                    Setup Monthly Fee AutoPay Mandate
                  </h2>
                  <p className="text-13 text-brand-muted mt-1">
                    Authorize auto-debit for your monthly installment (₹{monthlyEMIValue.toLocaleString('en-IN')}/mo). No late payment worries.
                  </p>
                </div>

                {/* Mandate Channel Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'upi_autopay', title: '⚡ UPI AutoPay', desc: 'Google Pay, PhonePe, Paytm (Fastest)' },
                    { id: 'net_banking', title: '🏛️ Net Banking', desc: 'Digio / NPCI authenticated' },
                    { id: 'debit_card', title: '💳 Debit Card', desc: 'Instant OTP authorization' },
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMandateMode(m.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        mandateMode === m.id 
                          ? 'border-[#4C35DE] bg-[#4C35DE]/5 ring-2 ring-[#4C35DE]/20 shadow-xs' 
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-13 font-bold text-brand-navy block">{m.title}</span>
                      <span className="text-[11px] text-brand-muted mt-0.5 block">{m.desc}</span>
                    </button>
                  ))}
                </div>

                {/* Mandate Schedule Details */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                  <h4 className="text-13 font-bold text-brand-navy">NPCI AutoPay Mandate Terms</h4>
                  
                  <div className="grid grid-cols-2 gap-3 text-12">
                    <div>
                      <p className="text-slate-500">Monthly EMI Amount</p>
                      <p className="font-mono font-bold text-brand-navy text-15">₹{monthlyEMIValue.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Monthly Debit Date</p>
                      <p className="font-bold text-brand-navy">5th of every month</p>
                    </div>
                    <div>
                      <p className="text-slate-500">First Debit Date</p>
                      <p className="font-bold text-brand-navy">5th of Next Month</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Total Tenor</p>
                      <p className="font-bold text-brand-navy">{selectedTenure} Equal Installments</p>
                    </div>
                  </div>

                  {mandateMode === 'upi_autopay' && (
                    <div className="pt-2">
                      <label className="block text-12 font-bold text-brand-navy mb-1">
                        Enter UPI VPA ID (for UPI AutoPay notification) *
                      </label>
                      <input 
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-13 font-mono text-brand-navy focus:outline-none"
                      />
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                    <span className="text-11 text-slate-500">
                      RBI Digital Mandate Framework compliant. Can be modified/paused anytime.
                    </span>
                    <button
                      type="button"
                      onClick={handleAuthorizeMandate}
                      disabled={isAuthorizingMandate || isMandateAuthorized}
                      className={`px-5 py-2 rounded-xl text-12 font-bold cursor-pointer transition-all flex items-center gap-2 ${
                        isMandateAuthorized 
                          ? 'bg-emerald-600 text-white shadow-xs' 
                          : 'bg-[#4C35DE] text-white hover:bg-brand-navy shadow-sm'
                      }`}
                    >
                      {isAuthorizingMandate ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Authorizing NPCI Mandate...</span>
                        </>
                      ) : isMandateAuthorized ? (
                        <>
                          <Check size={14} strokeWidth={3} />
                          <span>Mandate Authorized ✓</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          <span>Authorize e-Mandate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* =========================================================================
                PHASE 9: APPLICATION COMPLETE & LIVE BACKEND STATUS TRACKER
               ========================================================================= */}
            {currentPhase === 'application_complete' && (
              <motion.div
                key="phase-9"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center sm:text-left"
              >
                {/* Success Header */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6 text-emerald-950">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <span className="text-11 font-bold bg-emerald-200/80 text-emerald-900 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        Application Successfully Completed
                      </span>
                      <h2 className="text-20 sm:text-24 font-black text-emerald-950 mt-1">
                        Education Fee Sanction Confirmed!
                      </h2>
                      <p className="text-13 text-emerald-800 mt-1">
                        Your application <span className="font-mono font-bold">{applicationId}</span> has been processed. GrayQuest is now executing direct fee settlement with {schoolName}.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4-Stage Live Institutional Backend Pipeline */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-13 font-bold text-brand-navy">Live Disbursement & Settlement Pipeline</h4>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active Backend Processing
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
                    {/* Step 1 */}
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-emerald-600 text-12 font-bold mb-1">
                        <CheckCircle size={15} />
                        <span>1. KYC Verified</span>
                      </div>
                      <p className="text-[11px] text-slate-500">PAN & DigiLocker Aadhaar e-KYC passed.</p>
                      <p className="text-[10px] font-mono text-emerald-600 mt-2">Completed</p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-emerald-600 text-12 font-bold mb-1">
                        <CheckCircle size={15} />
                        <span>2. Mandate Active</span>
                      </div>
                      <p className="text-[11px] text-slate-500">NPCI AutoPay authorized for 5th of month.</p>
                      <p className="text-[10px] font-mono text-emerald-600 mt-2">Active</p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-3.5 rounded-xl border border-[#4C35DE]/30 ring-2 ring-[#4C35DE]/10 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[#4C35DE] text-12 font-bold mb-1">
                        <RefreshCw size={14} className="animate-spin" />
                        <span>3. School Settlement</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Direct 100% tuition transfer to {schoolName}.</p>
                      <p className="text-[10px] font-mono text-[#4C35DE] font-bold mt-2">T+0 Today</p>
                    </div>

                    {/* Step 4 */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs opacity-80">
                      <div className="flex items-center gap-1.5 text-slate-500 text-12 font-bold mb-1">
                        <Calendar size={14} />
                        <span>4. First Monthly EMI</span>
                      </div>
                      <p className="text-[11px] text-slate-500">₹{monthlyEMIValue.toLocaleString('en-IN')} on 5th next month.</p>
                      <p className="text-[10px] font-mono text-slate-400 mt-2">Scheduled</p>
                    </div>
                  </div>
                </div>

                {/* Summary Sanction Card */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2 text-12">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <p className="text-slate-500 text-[11px]">Sanction Amount</p>
                      <p className="font-mono font-bold text-brand-navy text-14">₹{Number(annualFee).toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[11px]">Monthly Installment</p>
                      <p className="font-mono font-bold text-[#4C35DE] text-14">₹{monthlyEMIValue.toLocaleString('en-IN')}/mo</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[11px]">Student Name</p>
                      <p className="font-bold text-brand-navy">{studentName || 'Student'}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[11px]">Lending Partner</p>
                      <p className="font-bold text-brand-navy">GrayQuest NBFC</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
                    <span>Student Insurance Policy: <strong className="text-slate-700">GQ-KOTAK-984210</strong> (Active)</span>
                    <span>SMS & WhatsApp tracking alerts enabled on <strong className="text-slate-700">+91 {parentPhone || '9876543210'}</strong></span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {currentPhaseIndex > 0 && currentPhase !== 'application_complete' && (
              <button
                type="button"
                onClick={goToPrevPhase}
                className="px-4 py-2 rounded-xl text-13 font-bold text-slate-700 hover:bg-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>
            )}

            {!currentStepValidation.isValid && currentPhase !== 'application_complete' && (
              <div className="flex items-center gap-1.5 text-11 text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                <AlertCircle size={14} className="text-amber-600 shrink-0" />
                <span className="font-semibold">{currentStepValidation.reason}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 justify-end">
            {currentPhase === 'application_complete' ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowSanctionModal(true)}
                  className="px-4 py-2 rounded-xl text-12 font-bold text-[#4C35DE] bg-[#4C35DE]/10 hover:bg-[#4C35DE]/15 border border-[#4C35DE]/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download Sanction PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-12 font-bold bg-[#4C35DE] text-white hover:bg-brand-navy transition-all cursor-pointer shadow-xs"
                >
                  Done & Go to Portal
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled={!currentStepValidation.isValid}
                onClick={goToNextPhase}
                className={`px-6 py-2.5 rounded-xl text-13 font-bold transition-all flex items-center gap-2 shadow-xs ${
                  currentStepValidation.isValid
                    ? 'bg-[#4C35DE] hover:bg-brand-navy text-white cursor-pointer active:scale-98'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                <span>
                  {currentPhase === 'mandate_setup' 
                    ? 'Finalize & Submit Application' 
                    : `Continue to Step ${currentPhaseIndex + 2}`}
                </span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Sanction Letter Modal */}
      {showSanctionModal && (
        <SanctionLetterModal
          isOpen={showSanctionModal}
          onClose={() => setShowSanctionModal(false)}
          customerData={{
            fullName: parentName || 'Valued Parent',
            panNumber: panNumber,
            phone: parentPhone,
            institution: INSTITUTIONS.find(i => i.name === schoolName) || INSTITUTIONS[0],
            feeAmount: Number(annualFee) || 120000,
            sanctionId: applicationId,
          }}
        />
      )}
    </div>
  );
};
