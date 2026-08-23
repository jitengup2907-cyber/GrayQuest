import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Building2, Search, Check, ChevronDown, Sparkles, MapPin, 
  Percent, ShieldCheck, X 
} from 'lucide-react';
import { INSTITUTIONS, Institution } from '../data/institutions';

interface SchoolSelectDropdownProps {
  value?: string;
  selectedInstitution?: Institution;
  onSelect?: (institution: Institution) => void;
  onChange?: (institution: Institution) => void;
  onCustomTextChange?: (customName: string) => void;
  placeholder?: string;
  className?: string;
  showRateBadge?: boolean;
  required?: boolean;
}

export const SchoolSelectDropdown: React.FC<SchoolSelectDropdownProps> = ({
  value,
  selectedInstitution: propSelectedInstitution,
  onSelect,
  onChange,
  onCustomTextChange,
  placeholder = "Select or search your School, College, or IIT...",
  className = "",
  showRateBadge = true,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Unified callback
  const handleNotifySelection = (inst: Institution) => {
    if (onSelect) onSelect(inst);
    if (onChange) onChange(inst);
  };

  // Find currently selected institution
  const selectedInstitution = useMemo(() => {
    if (propSelectedInstitution) return propSelectedInstitution;
    return INSTITUTIONS.find(i => i.name.toLowerCase() === (value || '').toLowerCase()) || 
           INSTITUTIONS.find(i => i.id === value) ||
           (value ? {
             id: 'custom',
             name: value,
             city: 'Location',
             category: 'Other' as const,
             subventionType: 'standard' as const,
             tenureRates: {
               3: { flatRatePercent: 0.5, processingFee: 499 },
               6: { flatRatePercent: 1.5, processingFee: 499 },
               9: { flatRatePercent: 3.5, processingFee: 799 },
               10: { flatRatePercent: 4.0, processingFee: 799 },
               11: { flatRatePercent: 4.8, processingFee: 799 },
               12: { flatRatePercent: 5.5, processingFee: 799 },
             },
             defaultProcessingFee: 799,
             subsidyBadge: 'Standard Education Plan (Low Rate)',
             isPartner: false,
             featured: false,
             tierNote: 'Open financing for unlisted institutions.'
           } : INSTITUTIONS[0]);
  }, [value, propSelectedInstitution]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered institutions
  const filteredInstitutions = useMemo(() => {
    let list = INSTITUTIONS;
    if (selectedCategory !== 'All') {
      list = list.filter(i => {
        if (selectedCategory === 'K-12') return i.category === 'K-12';
        if (selectedCategory === 'Higher Ed') return i.category === 'Higher Education';
        if (selectedCategory === 'Preschool') return i.category === 'Preschool';
        if (selectedCategory === 'Coaching') return i.category === 'Coaching / Test Prep';
        return true;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.city.toLowerCase().includes(q) ||
        (i.shortName && i.shortName.toLowerCase().includes(q)) ||
        i.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery, selectedCategory]);

  const handleSelect = (inst: Institution) => {
    handleNotifySelection(inst);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleCustomEntry = () => {
    if (!searchQuery.trim()) return;
    const customInst: Institution = {
      id: `custom-${Date.now()}`,
      name: searchQuery.trim(),
      city: 'Custom Institution',
      category: 'Other',
      subventionType: 'standard',
      tenureRates: {
        3: { flatRatePercent: 0.5, processingFee: 499 },
        6: { flatRatePercent: 1.5, processingFee: 499 },
        9: { flatRatePercent: 3.5, processingFee: 799 },
        10: { flatRatePercent: 4.0, processingFee: 799 },
        11: { flatRatePercent: 4.8, processingFee: 799 },
        12: { flatRatePercent: 5.5, processingFee: 799 },
      },
      defaultProcessingFee: 799,
      subsidyBadge: 'Open Education Financing',
      isPartner: false,
      featured: false,
      tierNote: 'Valid across all accredited schools and universities in India.'
    };
    handleNotifySelection(customInst);
    if (onCustomTextChange) onCustomTextChange(searchQuery.trim());
    setSearchQuery('');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button / Input Display */}
      <div 
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className="w-full min-h-[50px] p-3 bg-white border border-brand-border hover:border-brand-blue rounded-xl cursor-pointer flex items-center justify-between gap-2 transition-all shadow-xs group"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
            <Building2 size={20} />
          </div>
          {selectedInstitution ? (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-14 text-brand-navy truncate">
                  {selectedInstitution.name}
                </span>
                {showRateBadge && (
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${
                    selectedInstitution.tenureRates[6]?.flatRatePercent === 0 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-blue-100 text-brand-blue'
                  }`}>
                    {selectedInstitution.tenureRates[6]?.flatRatePercent === 0 ? '0% on 3 & 6M' : 'Subsidized'}
                  </span>
                )}
              </div>
              <p className="text-11 text-brand-muted truncate flex items-center gap-1 mt-0.5">
                <MapPin size={11} /> {selectedInstitution.city}
              </p>
            </div>
          ) : (
            <span className="text-14 text-brand-muted select-none">
              {placeholder}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-brand-muted group-hover:text-brand-navy">
          {selectedInstitution && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNotifySelection(INSTITUTIONS[0]);
              }}
              className="p-1 hover:bg-black/5 rounded-full text-brand-muted hover:text-brand-navy"
              title="Reset selection"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-blue' : ''}`} />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-brand-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[400px]">
          {/* Search Header */}
          <div className="p-3 bg-brand-surface border-b border-brand-border space-y-2">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-brand-muted pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type school, college, IIT, or city name..."
                className="w-full pl-9 pr-8 py-2 bg-white border border-brand-border rounded-lg text-13 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                onClick={(e) => e.stopPropagation()}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-brand-muted hover:text-brand-navy"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-11 font-medium">
              {['All', 'K-12', 'Higher Ed', 'Preschool', 'Coaching'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(cat);
                  }}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-brand-blue text-white font-bold'
                      : 'bg-white text-brand-muted hover:text-brand-navy border border-brand-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Institutions */}
          <div className="overflow-y-auto flex-1 divide-y divide-brand-border">
            {filteredInstitutions.length > 0 ? (
              filteredInstitutions.map((inst) => {
                const isSelected = selectedInstitution?.id === inst.id;
                const isZero6M = inst.tenureRates[6]?.flatRatePercent === 0;

                return (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => handleSelect(inst)}
                    className={`w-full text-left p-3.5 hover:bg-brand-surface flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected ? 'bg-brand-blue/5' : ''
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-13 text-brand-navy truncate">
                          {inst.name}
                        </span>
                        {inst.featured && (
                          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[9px] font-bold shrink-0">
                            ★ FEATURED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-11 text-brand-muted">
                        <span className="truncate">{inst.city}</span>
                        <span>•</span>
                        <span className="px-1.5 py-0.2 bg-slate-100 rounded text-[10px] text-slate-700">{inst.category}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex items-center gap-2">
                      <div className="flex flex-col items-end">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          isZero6M 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-blue-50 text-brand-blue border border-blue-200'
                        }`}>
                          {isZero6M ? '0% on 3 & 6M' : 'Subsidized'}
                        </span>
                        <span className="text-[10px] text-brand-muted mt-0.5">
                          {inst.tenureRates[9] ? `9M @ ${inst.tenureRates[9].flatRatePercent}%` : 'Flexible EMIs'}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-5 text-center space-y-3">
                <p className="text-13 text-brand-muted">No exact partner matches found for "{searchQuery}"</p>
                <button
                  type="button"
                  onClick={handleCustomEntry}
                  className="px-4 py-2 bg-brand-blue text-white rounded-lg text-12 font-bold hover:bg-brand-blue/90 transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Use "{searchQuery}" with Open Education Plan</span>
                </button>
                <p className="text-[11px] text-brand-muted">
                  GrayQuest supports fee payments for ALL accredited institutions across India with low subsidized rates.
                </p>
              </div>
            )}
          </div>

          {/* Footer Notice */}
          <div className="p-2.5 bg-slate-50 border-t border-brand-border flex items-center justify-between text-[11px] text-brand-muted">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-emerald-600" />
              6,500+ institutional partnerships across India
            </span>
            <span className="font-medium text-brand-navy">
              Showing {filteredInstitutions.length} institutions
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
