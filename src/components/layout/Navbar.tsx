import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../Logo';

interface NavbarProps {
  onCheckEligibility: () => void;
  onStartApplication: () => void;
  onOpenPortal: () => void;
}

export const Navbar = ({ 
  onCheckEligibility, 
  onStartApplication,
  onOpenPortal
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'For Parents', href: '/parents' },
    { name: 'For Schools', href: '/schools' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Portal', onClick: onOpenPortal },
  ];

  return (
    <>
      {/* Top Regulatory Notification Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-brand-navy text-white h-[32px] flex items-center justify-center text-[12px] font-medium tracking-wide border-b border-white/10 select-none px-3">
        <Shield size={13} className="mr-1.5 text-emerald-400 shrink-0" />
        <span className="truncate">Regulated NBFC Partners · Zero Bureau Score Impact · 100% Encrypted</span>
      </div>

      {/* Main Navbar Header */}
      <header 
        className={`fixed top-[32px] left-0 right-0 z-50 h-[64px] bg-[#F6F8FA]/95 backdrop-blur-md transition-all duration-200 border-b border-brand-border flex items-center ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links - Single line guaranteed */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
            {navLinks.map((link) => (
              link.onClick ? (
                <button 
                  key={link.name} 
                  onClick={link.onClick}
                  className="text-14 font-medium text-brand-text hover:text-[#4C35DE] transition-colors cursor-pointer whitespace-nowrap"
                >
                  {link.name}
                </button>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href!} 
                  className={`text-14 font-medium whitespace-nowrap transition-colors ${
                    location.pathname === link.href 
                      ? 'text-[#4C35DE] font-semibold' 
                      : 'text-brand-text hover:text-[#4C35DE]'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Check Eligibility */}
            <button 
              onClick={onCheckEligibility}
              className="px-4 py-2 rounded-xl text-13 font-bold bg-[#4C35DE]/10 text-[#4C35DE] hover:bg-[#4C35DE]/15 border border-[#4C35DE]/20 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>Check Eligibility</span>
            </button>

            {/* Start Application */}
            <button 
              onClick={onStartApplication}
              className="px-4 py-2 rounded-xl text-13 font-bold bg-[#4C35DE] hover:bg-brand-navy text-white shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-98"
            >
              <span>Start Application</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile Quick Action & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={onCheckEligibility}
              className="px-2.5 py-1 rounded-md text-11 font-bold bg-[#4C35DE]/10 text-[#4C35DE] border border-[#4C35DE]/20 whitespace-nowrap"
            >
              Check
            </button>
            <button 
              onClick={onStartApplication}
              className="px-2.5 py-1 rounded-md text-11 font-bold bg-[#4C35DE] text-white whitespace-nowrap"
            >
              Apply
            </button>
            <button 
              className="text-brand-navy p-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer" 
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-brand-navy/50 backdrop-blur-xs z-50"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-white z-50 p-5 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center pb-4 mb-4 border-b border-brand-border">
                    <Logo size="sm" />
                    <button 
                      onClick={() => setIsOpen(false)} 
                      className="p-1 rounded-md text-brand-navy hover:bg-slate-100 cursor-pointer"
                    >
                      <X size={22} />
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      link.onClick ? (
                        <button 
                          key={link.name} 
                          onClick={() => { setIsOpen(false); link.onClick(); }}
                          className="text-14 font-semibold text-brand-navy py-2 text-left hover:text-[#4C35DE] transition-colors flex items-center justify-between whitespace-nowrap"
                        >
                          <span>{link.name}</span>
                          <span className="text-11 text-brand-muted">→</span>
                        </button>
                      ) : (
                        <Link 
                          key={link.name} 
                          to={link.href!} 
                          onClick={() => setIsOpen(false)}
                          className={`text-14 font-semibold py-2 transition-colors flex items-center justify-between whitespace-nowrap ${
                            location.pathname === link.href ? 'text-[#4C35DE]' : 'text-brand-navy hover:text-[#4C35DE]'
                          }`}
                        >
                          <span>{link.name}</span>
                          <span className="text-11 text-brand-muted">→</span>
                        </Link>
                      )
                    ))}
                  </div>
                </div>

                {/* Action Button Group in Mobile Drawer */}
                <div className="space-y-2.5 pt-4 border-t border-brand-border">
                  <p className="text-[11px] font-bold text-brand-muted uppercase tracking-wider mb-1">
                    Quick Actions
                  </p>
                  
                  {/* Button 1: Check Eligibility */}
                  <button 
                    onClick={() => { setIsOpen(false); onCheckEligibility(); }}
                    className="w-full py-2.5 px-3 bg-[#4C35DE]/10 hover:bg-[#4C35DE]/15 text-[#4C35DE] border border-[#4C35DE]/20 rounded-xl font-bold text-13 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-2xs whitespace-nowrap"
                  >
                    <Sparkles size={15} />
                    <span>Check Eligibility</span>
                  </button>

                  {/* Button 2: Start Application */}
                  <button 
                    onClick={() => { setIsOpen(false); onStartApplication(); }}
                    className="w-full py-2.5 px-3 bg-[#4C35DE] hover:bg-brand-navy text-white rounded-xl font-bold text-13 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs whitespace-nowrap"
                  >
                    <span>Start Application</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

