import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ObjectionSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const objections = [
    { q: "Is this a loan? Will it affect my CIBIL?", a: "It is a structured fee payment plan. We do a soft check first which doesn't affect your score. A hard pull only happens if you execute the plan." },
    { q: "What if my school isn't a partner?", a: "We can still help! We offer a direct-to-parent plan for most recognized institutions in India." }
  ];

  return (
    <div className="mt-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-12 text-brand-blue font-medium flex items-center gap-1 hover:underline"
      >
        Is this right for me? {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-2">
              {objections.map((obj, i) => (
                <div key={i} className="bg-brand-blue/5 p-2 rounded-sm border border-brand-blue/10">
                  <p className="text-11 font-bold text-brand-navy">{obj.q}</p>
                  <p className="text-11 text-brand-muted mt-1">{obj.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
