import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, Check, Calendar, Phone, Mail, Sparkles, Building2, 
  ArrowRight, ShieldCheck, Download, CheckCircle2 
} from 'lucide-react';
import { Institution } from '../data/institutions';

interface InstitutionScheduleModalProps {
  institution: Institution;
  isOpen: boolean;
  onClose: () => void;
  onApplyNow?: () => void;
}

export const InstitutionScheduleModal: React.FC<InstitutionScheduleModalProps> = ({
  institution,
  isOpen,
  onClose,
  onApplyNow
}) => {
  const [feeBase, setFeeBase] = useState<number>(100000);

  if (!isOpen) return null;

  // Monthly breakdown for standard ₹1,00,000 or custom base
  const multiplier = feeBase / 100000;

  const normalPayJune = Math.round(50000 * multiplier);
  const normalPaySept = Math.round(50000 * multiplier);

  // 6 Month @ 0% (June to Nov)
  const plan6Monthly = Math.round(16667 * multiplier);
  const plan6Total = feeBase;

  // 9 Month @ 2% (June to Feb)
  const plan9Monthly = Math.round(11300 * multiplier);
  const plan9Total = Math.round(102000 * multiplier);

  // 11 Month @ 3.5% (June to April)
  const plan11Monthly = Math.round(9409 * multiplier);
  const plan11Total = Math.round(103500 * multiplier);

  const months = [
    { name: 'June', normal: normalPayJune, m6: plan6Monthly, m9: plan9Monthly, m11: plan11Monthly },
    { name: 'July', normal: null, m6: plan6Monthly, m9: plan9Monthly, m11: plan11Monthly },
    { name: 'August', normal: null, m6: plan6Monthly, m9: plan9Monthly, m11: plan11Monthly },
    { name: 'September', normal: normalPaySept, m6: plan6Monthly, m9: plan9Monthly, m11: plan11Monthly },
    { name: 'October', normal: null, m6: plan6Monthly, m9: plan9Monthly, m11: plan11Monthly },
    { name: 'November', normal: null, m6: plan6Monthly, m9: plan9Monthly, m11: plan11Monthly },
    { name: 'December', normal: null, m6: null, m9: plan9Monthly, m11: plan11Monthly },
    { name: 'January', normal: null, m6: null, m9: plan9Monthly, m11: plan11Monthly },
    { name: 'February', normal: null, m6: null, m9: plan9Monthly, m11: plan11Monthly },
    { name: 'March', normal: null, m6: null, m9: null, m11: plan11Monthly },
    { name: 'April', normal: null, m6: null, m9: null, m11: plan11Monthly },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-brand-navy/70 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden z-10 my-4 border border-brand-border flex flex-col max-h-[92vh]"
      >
        {/* Header Ribbon */}
        <div className="bg-brand-navy text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Building2 size={24} className="text-brand-green" />
            </div>
            <div>
              <span className="text-10 font-bold uppercase tracking-wider text-brand-green">
                Academic Session Official Fee Schedule
              </span>
              <h3 className="text-18 md:text-22 font-bold text-white leading-tight">
                {institution.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Schedule Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          {/* Fee Selection Bar */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-12 font-bold text-brand-navy block">Annual Institution Fee Benchmark</span>
              <span className="text-11 text-brand-muted">Change amount to preview scaled monthly installment schedule</span>
            </div>
            <div className="flex items-center gap-2">
              {[60000, 100000, 150000, 200000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setFeeBase(amt)}
                  className={`px-3 py-1.5 rounded-lg text-12 font-bold transition-all cursor-pointer ${
                    feeBase === amt 
                      ? 'bg-brand-blue text-white shadow-xs' 
                      : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-100'
                  }`}
                >
                  ₹{(amt / 100000).toFixed(amt % 100000 === 0 ? 0 : 1)}L
                </button>
              ))}
            </div>
          </div>

          {/* Official Schedule Matrix Table */}
          <div className="border border-brand-border rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-13 border-collapse">
                <thead>
                  <tr className="bg-brand-navy text-white text-12 font-bold">
                    <th className="py-3.5 px-4">Academic Month</th>
                    <th className="py-3.5 px-4 bg-slate-800/80">How Parents Normally Pay</th>
                    <th className="py-3.5 px-4 bg-emerald-700">
                      6 Month Plan at 0%
                      <span className="block text-[10px] font-normal text-emerald-200">100% Subsidized</span>
                    </th>
                    <th className="py-3.5 px-4 bg-brand-blue">
                      9 Month Plan at 2%
                      <span className="block text-[10px] font-normal text-blue-200">Low Subsidized Rate</span>
                    </th>
                    <th className="py-3.5 px-4 bg-purple-700">
                      11 Month Plan at 3.5%
                      <span className="block text-[10px] font-normal text-purple-200">Max Extended Tenure</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {months.map((m, idx) => (
                    <tr key={m.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="py-3 px-4 font-bold text-brand-navy">{m.name}</td>
                      <td className="py-3 px-4 font-semibold text-slate-700 bg-slate-100/30">
                        {m.normal ? `₹${m.normal.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700 bg-emerald-50/30">
                        {m.m6 ? `₹${m.m6.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="py-3 px-4 font-bold text-brand-blue bg-blue-50/30">
                        {m.m9 ? `₹${m.m9.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td className="py-3 px-4 font-bold text-purple-900 bg-purple-50/30">
                        {m.m11 ? `₹${m.m11.toLocaleString('en-IN')}` : '—'}
                      </td>
                    </tr>
                  ))}
                  {/* Total Footer Row */}
                  <tr className="bg-slate-100 font-black text-14 border-t-2 border-brand-navy">
                    <td className="py-4 px-4 text-brand-navy">Total Amount Paid</td>
                    <td className="py-4 px-4 text-slate-900">₹{feeBase.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-4 text-emerald-700 bg-emerald-100/50">
                      ₹{plan6Total.toLocaleString('en-IN')} (0% Interest)
                    </td>
                    <td className="py-4 px-4 text-brand-blue bg-blue-100/50">
                      ₹{plan9Total.toLocaleString('en-IN')} (2% Total)
                    </td>
                    <td className="py-4 px-4 text-purple-900 bg-purple-100/50">
                      ₹{plan11Total.toLocaleString('en-IN')} (3.5% Total)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4 Feature Badges from Official Poster */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-brand-surface rounded-xl border border-brand-border text-center space-y-1">
              <span className="text-20 block">⚡</span>
              <span className="text-12 font-bold text-brand-navy block">2 Minute Sign Up</span>
              <span className="text-[10px] text-brand-muted">Aadhaar OTP e-Sign</span>
            </div>
            <div className="p-3 bg-brand-surface rounded-xl border border-brand-border text-center space-y-1">
              <span className="text-20 block">✅</span>
              <span className="text-12 font-bold text-brand-navy block">Instant Approval</span>
              <span className="text-[10px] text-brand-muted">86.81% Auto-Approved</span>
            </div>
            <div className="p-3 bg-brand-surface rounded-xl border border-brand-border text-center space-y-1">
              <span className="text-20 block">📄</span>
              <span className="text-12 font-bold text-brand-navy block">100% Digital</span>
              <span className="text-[10px] text-brand-muted">Zero physical paper</span>
            </div>
            <div className="p-3 bg-brand-surface rounded-xl border border-brand-border text-center space-y-1">
              <span className="text-20 block">₹</span>
              <span className="text-12 font-bold text-brand-navy block">No Hidden Costs</span>
              <span className="text-[10px] text-brand-muted">Transparent terms</span>
            </div>
          </div>

          {/* Direct Institution Desk Contact Card */}
          {institution.coBrandedContact && (
            <div className="p-4 bg-brand-navy text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold text-brand-green">
                  Dedicated Institutional Liaison & FOS
                </span>
                <h4 className="text-15 font-bold text-white">
                  Have questions about {institution.shortName || institution.name} fee plans?
                </h4>
                <div className="flex flex-wrap items-center gap-4 text-12 text-white/80 pt-1">
                  <a href={`mailto:${institution.coBrandedContact.email}`} className="flex items-center gap-1.5 hover:text-brand-green transition-colors">
                    <Mail size={14} className="text-brand-green" />
                    <span>{institution.coBrandedContact.email}</span>
                  </a>
                  <a href={`tel:${institution.coBrandedContact.phone}`} className="flex items-center gap-1.5 hover:text-brand-green transition-colors">
                    <Phone size={14} className="text-brand-green" />
                    <span>{institution.coBrandedContact.phone}</span>
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onApplyNow) onApplyNow();
                }}
                className="px-6 py-3 bg-brand-green text-white font-bold rounded-xl text-13 hover:bg-brand-green/90 transition-all flex items-center gap-2 shadow-lg cursor-pointer shrink-0"
              >
                <span>Start Direct Application</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
