import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, HeartHandshake, CheckCircle2, AlertCircle, 
  HelpCircle, User, Calendar, Award, Sparkles, Building2 
} from 'lucide-react';
import { getInsuranceQuote } from '../data/insurance';

interface FeeInsuranceCalculatorProps {
  onInsuranceSelect?: (quote: any, isIncluded: boolean) => void;
  isIncluded?: boolean;
}

export const FeeInsuranceCalculator: React.FC<FeeInsuranceCalculatorProps> = ({
  onInsuranceSelect,
  isIncluded = false
}) => {
  const [age, setAge] = useState<number>(35);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [sumAssured, setSumAssured] = useState<15 | 30 | 50>(15);
  const [enableInsurance, setEnableInsurance] = useState<boolean>(isIncluded);

  const quote = useMemo(() => {
    return getInsuranceQuote(age, gender, sumAssured);
  }, [age, gender, sumAssured]);

  const handleToggle = (checked: boolean) => {
    setEnableInsurance(checked);
    if (onInsuranceSelect) {
      onInsuranceSelect(quote, checked);
    }
  };

  const handleSumChange = (sum: 15 | 30 | 50) => {
    setSumAssured(sum);
    if (onInsuranceSelect && enableInsurance) {
      onInsuranceSelect(getInsuranceQuote(age, gender, sum), true);
    }
  };

  const handleAgeChange = (newAge: number) => {
    setAge(newAge);
    if (onInsuranceSelect && enableInsurance) {
      onInsuranceSelect(getInsuranceQuote(newAge, gender, sumAssured), true);
    }
  };

  const handleGenderChange = (newGender: 'male' | 'female') => {
    setGender(newGender);
    if (onInsuranceSelect && enableInsurance) {
      onInsuranceSelect(getInsuranceQuote(age, newGender, sumAssured), true);
    }
  };

  return (
    <div className="bg-slate-50 border border-brand-border rounded-2xl p-5 space-y-4">
      {/* Header with Enable Switch */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-15 font-bold text-brand-navy">
                Student Fee Continuity & Life Cover
              </h4>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase">
                Official Protection Partner
              </span>
            </div>
            <p className="text-12 text-brand-muted mt-0.5 leading-relaxed">
              Guarantees 100% of your child's remaining school/college tuition up to ₹{sumAssured} Lakhs in any unforeseen parental emergency.
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
          <input 
            type="checkbox" 
            checked={enableInsurance} 
            onChange={(e) => handleToggle(e.target.checked)} 
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
        </label>
      </div>

      {enableInsurance && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4 pt-3 border-t border-brand-border/60"
        >
          {/* Cover Sum Assured Selector */}
          <div>
            <label className="block text-12 font-bold text-brand-navy mb-1.5">
              Select Education Protection Cover (Sum Assured)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([15, 30, 50] as const).map((sum) => (
                <button
                  key={sum}
                  type="button"
                  onClick={() => handleSumChange(sum)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                    sumAssured === sum
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                      : 'bg-white border-brand-border text-brand-navy hover:bg-slate-100 font-medium'
                  }`}
                >
                  <span className="block text-14 font-black">₹{sum} Lakhs</span>
                  <span className="block text-[10px] opacity-80">Full Education Cover</span>
                </button>
              ))}
            </div>
          </div>

          {/* Age & Gender Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Parent Age Slider */}
            <div className="bg-white p-3 rounded-xl border border-brand-border">
              <div className="flex justify-between items-center text-12 mb-1">
                <span className="text-brand-muted font-medium flex items-center gap-1">
                  <Calendar size={13} /> Parent Age
                </span>
                <span className="font-bold text-brand-navy text-13">{age} Years</span>
              </div>
              <input 
                type="range"
                min={18}
                max={60}
                value={age}
                onChange={(e) => handleAgeChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-brand-muted mt-1">
                <span>18 yrs</span>
                <span>40 yrs</span>
                <span>60 yrs</span>
              </div>
            </div>

            {/* Parent Gender */}
            <div className="bg-white p-3 rounded-xl border border-brand-border flex flex-col justify-between">
              <span className="text-12 text-brand-muted font-medium flex items-center gap-1">
                <User size={13} /> Parent Gender
              </span>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                <button
                  type="button"
                  onClick={() => handleGenderChange('male')}
                  className={`py-1.5 text-12 rounded-lg font-bold transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'bg-brand-navy text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange('female')}
                  className={`py-1.5 text-12 rounded-lg font-bold transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'bg-brand-navy text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Calculated Quote Card */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-11 font-bold text-emerald-900">
                  Secured Underwriter:
                </span>
                <span className="px-2 py-0.5 bg-white text-emerald-800 text-[11px] font-black rounded border border-emerald-300">
                  {quote.provider}
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 mt-1">
                Just ₹{quote.dailyCost}/day for ₹{sumAssured} Lakh education guarantee
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-700 block font-medium">Monthly Premium</span>
              <div className="text-18 font-black text-emerald-900">
                +₹{quote.monthlyPremium} <span className="text-11 font-normal">/mo</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
