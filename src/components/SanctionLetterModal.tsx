import React, { useRef } from 'react';
import { 
  X, Download, Printer, ShieldCheck, CheckCircle2, 
  Building2, Calendar, Award, Lock, Share2, Sparkles, 
  ArrowRight, FileCheck, Landmark, Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { Institution } from '../data/institutions';
import { Logo } from './Logo';

interface SanctionLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToApply?: () => void;
  customerData: {
    fullName: string;
    panNumber: string;
    phone: string;
    institution: Institution;
    feeAmount: number;
    cibilScore?: number;
    sanctionId?: string;
  };
}

export const SanctionLetterModal: React.FC<SanctionLetterModalProps> = ({
  isOpen,
  onClose,
  onProceedToApply,
  customerData
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  
  const expiryDate = new Date();
  expiryDate.setDate(today.getDate() + 30);
  const expiryFormatted = expiryDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const sanctionRef = customerData.sanctionId || `GQ-SANC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const fee = customerData.feeAmount || 120000;
  const maxLimit = Math.max(fee, Math.min(500000, Math.round(fee * 1.3 / 10000) * 10000));
  const maskedPan = customerData.panNumber 
    ? `${customerData.panNumber.slice(0, 2)}XXXX${customerData.panNumber.slice(-2)}` 
    : 'ABCXX1234F';

  // Calculate sample 3, 6, 9, 12 month monthly installment amounts
  const plans = [
    { tenure: 3, rate: customerData.institution.tenureRates[3]?.flatRatePercent || 0, fee: customerData.institution.tenureRates[3]?.processingFee || 0 },
    { tenure: 6, rate: customerData.institution.tenureRates[6]?.flatRatePercent || 0, fee: customerData.institution.tenureRates[6]?.processingFee || 0 },
    { tenure: 9, rate: customerData.institution.tenureRates[9]?.flatRatePercent || 2.0, fee: customerData.institution.tenureRates[9]?.processingFee || 0 },
    { tenure: 12, rate: customerData.institution.tenureRates[12]?.flatRatePercent || 0, fee: customerData.institution.tenureRates[12]?.processingFee || 0 },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`GrayQuest Pre-Approved Sanction Letter Ref: ${sanctionRef} for ${customerData.fullName || 'Parent'} (${customerData.institution.name}) - Sanctioned Limit: ₹${maxLimit.toLocaleString('en-IN')}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-navy/75 backdrop-blur-md print:hidden"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden z-10 my-4 border border-brand-border flex flex-col max-h-[94vh] print:max-h-none print:shadow-none print:border-none print:m-0 print:w-full"
      >
        {/* Top Control Bar (Hidden on Print) */}
        <div className="bg-brand-navy text-white px-5 py-3 flex items-center justify-between print:hidden border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <FileCheck size={18} />
            </div>
            <div>
              <h3 className="text-15 font-bold leading-tight text-white flex items-center gap-2">
                Official Sanction Letter Preview
                <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Pre-Approved
                </span>
              </h3>
              <p className="text-11 text-slate-300">
                Generated via GrayQuest Underwriting & Co-Lending Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-12 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy details link"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white text-12 font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Printer size={15} />
              <span>Print / Download PDF</span>
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Letter Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 bg-white print:p-0 print:overflow-visible" ref={printRef}>
          
          {/* Official Document Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b-2 border-slate-900">
            <div>
              <div className="flex items-center gap-3">
                <Logo variant="dark" size="md" />
                <div className="h-6 w-px bg-slate-300" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest leading-none">
                    Co-Lending Credit Facility
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    RBI Regulated Education Financing
                  </span>
                </div>
              </div>
              <p className="text-11 text-slate-500 mt-2 max-w-sm">
                GrayQuest Education Finance Pvt. Ltd. • CIN: U65990MH2017PTC297800<br/>
                Regd. Office: 301, 3rd Floor, Sector 17, Vashi, Navi Mumbai, Maharashtra 400703
              </p>
            </div>

            <div className="text-right sm:border-l sm:pl-5 border-slate-200 w-full sm:w-auto">
              <div className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-lg text-left mb-1.5">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Sanction Reference ID</span>
                <span className="text-13 font-mono font-bold text-slate-900">{sanctionRef}</span>
              </div>
              <p className="text-11 text-slate-500">
                <strong>Date of Issue:</strong> {dateFormatted}<br/>
                <strong>Valid Till:</strong> {expiryFormatted} (30 Days)
              </p>
            </div>
          </div>

          {/* Letter Title & Congratulations */}
          <div className="text-center py-2 bg-slate-50 rounded-xl border border-slate-200">
            <h2 className="text-16 sm:text-18 font-bold text-brand-navy uppercase tracking-wide">
              PROVISIONAL SANCTION & IN-PRINCIPLE APPROVAL LETTER
            </h2>
            <p className="text-12 text-brand-muted mt-0.5">
              Subject: Sanction of Zero-Cost Education Fee Installment Facility for Academic Year 2026–27
            </p>
          </div>

          {/* Salutation & Borrower Summary */}
          <div className="space-y-3 text-13 text-slate-800 leading-relaxed">
            <p>
              Dear <strong>{customerData.fullName || 'Valued Parent'}</strong>,
            </p>
            <p>
              We are pleased to inform you that based on our initial automated credit underwriting and bureau evaluation (CIBIL Bureau Score: <strong>{customerData.cibilScore || 780}</strong>), an in-principle education fee financing line has been <strong>pre-approved</strong> for the education of your child/ward.
            </p>
          </div>

          {/* Borrower & Institution Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-brand-surface p-4 rounded-xl border border-brand-border text-12">
            <div className="space-y-1.5">
              <div className="flex justify-between pb-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Primary Borrower / Applicant:</span>
                <span className="font-bold text-slate-900">{customerData.fullName || 'Not Provided'}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Permanent Account Number (PAN):</span>
                <span className="font-mono font-bold text-slate-900">{maskedPan}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Registered Contact Phone:</span>
                <span className="font-mono font-bold text-slate-900">+91 {customerData.phone || '9876543210'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Underwriting Method:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Instant Soft Bureau Verification
                </span>
              </div>
            </div>

            <div className="space-y-1.5 sm:border-l sm:pl-3 border-slate-200">
              <div className="flex justify-between pb-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Partner Institution:</span>
                <span className="font-bold text-slate-900 truncate max-w-[170px] text-right" title={customerData.institution.name}>
                  {customerData.institution.name}
                </span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Campus Location:</span>
                <span className="font-bold text-slate-900 truncate max-w-[170px] text-right">
                  {customerData.institution.city}
                </span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Subvention Category:</span>
                <span className="font-bold text-brand-blue truncate max-w-[170px] text-right">
                  {customerData.institution.subsidyBadge}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Disbursal Beneficiary:</span>
                <span className="font-bold text-slate-900">Direct School Account (100%)</span>
              </div>
            </div>
          </div>

          {/* Sanctioned Facility Parameters */}
          <div className="space-y-2">
            <h4 className="text-13 font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Award size={15} className="text-amber-500" />
              1. Key Sanction Terms & Pre-Approved Credit Limit
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-[10px] text-emerald-800 font-bold uppercase block">Max Sanction Limit</span>
                <span className="text-16 sm:text-18 font-extrabold text-emerald-900">₹{maxLimit.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <span className="text-[10px] text-brand-blue font-bold uppercase block">Interest Rate (3 & 6M)</span>
                <span className="text-16 sm:text-18 font-extrabold text-brand-blue">0% Interest</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-600 font-bold uppercase block">Processing Charges</span>
                <span className="text-16 sm:text-18 font-extrabold text-slate-900">₹0 Nil</span>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                <span className="text-[10px] text-purple-800 font-bold uppercase block">Prepayment Penalty</span>
                <span className="text-16 sm:text-18 font-extrabold text-purple-900">₹0 (Zero Charges)</span>
              </div>
            </div>
          </div>

          {/* Repayment Schedule Matrix */}
          <div className="space-y-2">
            <h4 className="text-13 font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar size={15} className="text-brand-blue" />
              2. Pre-Approved Repayment Options for ₹{fee.toLocaleString('en-IN')} Fee
            </h4>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-12">
                <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Tenure</th>
                    <th className="p-2.5">Subvention Rate</th>
                    <th className="p-2.5">Estimated Monthly EMI</th>
                    <th className="p-2.5">Down Payment</th>
                    <th className="p-2.5">Total Repayment</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {plans.map((p) => {
                    const totalInt = Math.round(fee * (p.rate / 100));
                    const totalPayable = fee + totalInt;
                    const monthlyEmi = Math.round(totalPayable / p.tenure);

                    return (
                      <tr key={p.tenure} className={p.tenure === 6 ? 'bg-emerald-50/50 font-semibold' : 'hover:bg-slate-50'}>
                        <td className="p-2.5 font-bold">{p.tenure} Months</td>
                        <td className="p-2.5">
                          {p.rate === 0 ? (
                            <span className="text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded text-[11px]">
                              0% Subsidized
                            </span>
                          ) : (
                            <span>{p.rate}% Flat Subsidized</span>
                          )}
                        </td>
                        <td className="p-2.5 font-bold text-slate-900">₹{monthlyEmi.toLocaleString('en-IN')}/mo</td>
                        <td className="p-2.5">₹0 Nil</td>
                        <td className="p-2.5">₹{totalPayable.toLocaleString('en-IN')}</td>
                        <td className="p-2.5">
                          <span className="inline-flex items-center gap-1 text-emerald-700 text-[11px] font-bold">
                            <CheckCircle2 size={12} /> Pre-Approved
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Standard Regulatory Disclaimers & Signatures */}
          <div className="pt-3 border-t border-slate-200 space-y-4">
            <div className="text-[11px] text-slate-500 space-y-1 leading-normal bg-slate-50 p-3 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-700">Important Sanction Terms & Next Steps:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>This is an in-principle sanction based on automated soft bureau checks and is valid for 30 calendar days.</li>
                <li>Final disbursal is contingent upon paperless Aadhaar e-KYC authentication and e-NACH auto-debit setup on your primary bank account.</li>
                <li>Loans are disbursed directly to the bank account of {customerData.institution.name} via partner NBFCs licensed by the Reserve Bank of India (Arka Fincap, Ratnaafincorp, Mirae Asset, Western Capital, Avanse).</li>
              </ul>
            </div>

            {/* Official Seal & Signature Block */}
            <div className="flex items-end justify-between pt-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-11 shadow-inner">
                    GQ
                  </div>
                  <div>
                    <span className="text-11 font-bold text-slate-900 block">GrayQuest Credit Committee</span>
                    <span className="text-[10px] text-slate-500">Authorized Digital Sanction Stamp</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-mono pt-1">
                  <Lock size={11} /> Digitally Signed: SHA-256 Verified (Timestamp: {dateFormatted})
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block border-b border-slate-900 pb-1 px-4 mb-1">
                  <span className="font-serif italic font-bold text-14 text-slate-900">Arjun Sharma</span>
                </div>
                <span className="text-[10px] text-slate-500 block">Head of Credit & Risk Operations</span>
                <span className="text-[9px] text-slate-400">GrayQuest Education Finance Pvt. Ltd.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions (Hidden on Print) */}
        <div className="p-4 bg-slate-50 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden shrink-0">
          <div className="flex items-center gap-2 text-12 text-slate-600">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
            <span>Zero obligation • Sanction valid for 30 days</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-white border border-brand-border hover:border-brand-navy rounded-xl text-13 font-bold text-brand-navy hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download size={15} />
              <span>Save / Print PDF</span>
            </button>
            
            <button
              onClick={() => {
                onClose();
                if (onProceedToApply) onProceedToApply();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-13 font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <span>Accept & Start Application</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
