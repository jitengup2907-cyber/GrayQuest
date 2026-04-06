import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Menu, 
  X, 
  Search, 
  FileText, 
  Zap, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronDown, 
  Phone, 
  Mail, 
  Ticket, 
  Linkedin, 
  Twitter, 
  Instagram,
  School,
  Users,
  Shield,
  ExternalLink,
  MessageCircle,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface SchoolOption {
  name: string;
  city: string;
}

const HARDCODED_SCHOOLS: SchoolOption[] = [
  { name: "Podar International School", city: "Mumbai" },
  { name: "Delhi Public School (DPS)", city: "Delhi" },
  { name: "SVKM's NMIMS", city: "Mumbai" },
  { name: "VIBGYOR High School", city: "Pune" },
  { name: "Ryan International School", city: "Mumbai" },
  { name: "Orchids The International School", city: "Bengaluru" },
  { name: "EuroKids Preschool", city: "Mumbai" },
  { name: "Billabong High International", city: "Mumbai" },
  { name: "Mount Litera Zee School", city: "Pune" },
  { name: "Jain Heritage School", city: "Bengaluru" },
];

// --- Components ---

const ObjectionSection = () => {
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

const EligibilityModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [schoolSearch, setSchoolSearch] = useState('');
  const [fee, setFee] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const filteredSchools = HARDCODED_SCHOOLS.filter(s => 
    s.name.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSendOtp = () => {
    setIsOtpSent(true);
    setTimeout(() => nextStep(), 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative bg-white w-full max-w-md rounded-md shadow-2xl overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="h-1.5 bg-brand-surface w-full">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            className="h-full bg-brand-green"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-20 font-bold">Check Eligibility</h3>
            <button onClick={onClose} className="text-brand-muted hover:text-brand-navy"><X size={24} /></button>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <div className="relative">
                  <label className="block text-13 font-bold mb-1">School Name</label>
                  <input 
                    type="text" 
                    value={schoolSearch}
                    onChange={(e) => setSchoolSearch(e.target.value)}
                    placeholder="Search your school..."
                    className="w-full p-3 border border-brand-border rounded-sm focus:ring-2 focus:ring-brand-blue/20 outline-none"
                  />
                  {schoolSearch && filteredSchools.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-brand-border mt-1 rounded-sm shadow-lg max-h-40 overflow-y-auto">
                      {filteredSchools.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => { setSchoolSearch(s.name); }}
                          className="w-full text-left p-2 hover:bg-brand-surface text-13 border-b border-brand-border last:border-0"
                        >
                          {s.name} <span className="text-11 text-brand-muted">({s.city})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-13 font-bold mb-1">Annual Fee Amount (₹)</label>
                  <input 
                    type="number" 
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    placeholder="e.g. 1,50,000"
                    className="w-full p-3 border border-brand-border rounded-sm focus:ring-2 focus:ring-brand-blue/20 outline-none"
                  />
                </div>
                <button 
                  disabled={!schoolSearch || !fee}
                  onClick={nextStep}
                  className="w-full py-4 bg-brand-blue text-white rounded-lg font-bold disabled:opacity-50"
                >
                  Next Step
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-13 font-bold mb-1">Mobile Number</label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 bg-brand-surface border border-brand-border rounded-sm text-14">+91</span>
                    <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter 10 digit mobile"
                      className="w-full p-3 border border-brand-border rounded-sm focus:ring-2 focus:ring-brand-blue/20 outline-none"
                    />
                  </div>
                </div>
                {isOtpSent ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-brand-green/10 border border-brand-green/20 rounded-sm text-center">
                      <p className="text-13 text-brand-green font-medium">OTP sent to +91 {mobile}</p>
                    </div>
                    <div>
                      <label className="block text-13 font-bold mb-1">Enter OTP</label>
                      <input 
                        type="text" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="0 0 0 0"
                        className="w-full p-3 border border-brand-border rounded-sm text-center text-20 tracking-widest focus:ring-2 focus:ring-brand-blue/20 outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <button 
                    disabled={mobile.length !== 10}
                    onClick={handleSendOtp}
                    className="w-full py-4 bg-brand-blue text-white rounded-lg font-bold disabled:opacity-50"
                  >
                    Send OTP
                  </button>
                )}
                <button onClick={prevStep} className="w-full text-13 text-brand-muted hover:text-brand-navy">Back</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-20 font-bold text-brand-navy">Congratulations!</h4>
                  <p className="text-14 text-brand-muted">You are eligible for a 0% interest plan.</p>
                </div>

                <div className="bg-brand-surface p-4 rounded-md border border-brand-border space-y-3">
                  <div className="flex justify-between">
                    <span className="text-13 text-brand-muted">Monthly EMI</span>
                    <span className="text-16 font-bold text-brand-navy">₹{(Number(fee) / 12).toFixed(0)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-13 text-brand-muted">Tenure</span>
                    <span className="text-16 font-bold text-brand-navy">12 Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-13 text-brand-muted">Interest Rate</span>
                    <span className="text-16 font-bold text-brand-green">0% Interest</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-brand-green text-white rounded-lg font-bold shadow-lg">
                  Proceed to Apply
                </button>
                <p className="text-11 text-center text-brand-muted">No commitment. No hard credit check until you confirm.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const ChatModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end p-6 pointer-events-none">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white w-full max-w-sm rounded-md shadow-2xl border border-brand-border pointer-events-auto overflow-hidden"
      >
        <div className="bg-brand-blue p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Users size={16} />
            </div>
            <div>
              <p className="font-bold text-14">Chat with Support</p>
              <p className="text-11 opacity-80">We typically reply in 5 mins</p>
            </div>
          </div>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-14 text-brand-muted">Hi there! How can we help you today?</p>
          <div className="space-y-2">
            <button className="w-full text-left p-3 border border-brand-border rounded-sm text-13 hover:bg-brand-surface transition-colors">I want to check my eligibility</button>
            <button className="w-full text-left p-3 border border-brand-border rounded-sm text-13 hover:bg-brand-surface transition-colors">I have a question about my EMI</button>
            <button className="w-full text-left p-3 border border-brand-border rounded-sm text-13 hover:bg-brand-surface transition-colors">I represent a school</button>
          </div>
          <div className="pt-4 border-t border-brand-border">
            <p className="text-11 text-brand-muted text-center">Or call us at <span className="font-bold text-brand-navy">022-4893-1823</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ onCheckEligibility }: { onCheckEligibility: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'For Schools', href: '#schools' },
    { name: 'For Parents', href: '#parents' },
    { name: 'Help Centre', href: '#help' },
    { name: 'Login', href: '#' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] bg-brand-blue text-white h-[32px] flex items-center justify-center text-[12px] font-medium tracking-wide">
        <Shield size={14} className="mr-2" />
        Regulated by RBI framework · 100% Secure & Transparent
      </div>
      <header className={`fixed top-[32px] left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-subtle py-2' : 'bg-transparent py-3'}`}>
        <div className="max-w-7xl mx-auto px-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-blue">
                <rect width="40" height="40" rx="8" fill="currentColor"/>
                <path d="M12 12H28V16H16V20H24V24H16V28H12V12Z" fill="white"/>
                <circle cx="30" cy="10" r="4" fill="#F5A623" />
              </svg>
              <span className="text-22 font-bold tracking-tight text-brand-navy">GrayQuest</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-14 font-medium text-brand-text hover:text-brand-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={onCheckEligibility}
              className="bg-brand-blue text-white px-3 py-1.5 rounded-full font-medium hover:bg-brand-blue/90 transition-all shadow-subtle text-14"
            >
              Check Eligibility
            </button>
          </nav>

          <button className="md:hidden text-brand-navy" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
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
                className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-50"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white z-50 p-4 shadow-lg"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-18 font-semibold text-brand-navy">Menu</span>
                  <button onClick={() => setIsOpen(false)}><X size={24} /></button>
                </div>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-16 font-medium text-brand-text border-b border-brand-border pb-2"
                    >
                      {link.name}
                    </a>
                  ))}
                  <button 
                    onClick={() => { setIsOpen(false); onCheckEligibility(); }}
                    className="bg-brand-blue text-white w-full py-3 rounded-lg font-medium mt-4"
                  >
                    Check Eligibility
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

const Hero = ({ onCheckEligibility }: { onCheckEligibility: () => void }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-12 pb-6 md:pt-16 md:pb-12 overflow-hidden bg-brand-surface">
      <div className="max-w-7xl mx-auto px-3 grid md:grid-cols-2 gap-9 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-amber/10 text-brand-amber rounded-full text-12 font-bold mb-4 border border-brand-amber/20">
            <Zap size={14} />
            <span>New: GrayQuest Rewards now live!</span>
          </div>
          <h1 className="mb-4 text-[36px] md:text-[52px] leading-[1.05] font-bold text-brand-navy">
            Pay your child's school fees in <span className="text-brand-blue underline decoration-brand-blue/20">easy monthly installments</span>
          </h1>
          <p className="text-18 text-brand-muted mb-8 max-w-lg leading-relaxed">
            Partnered with 6,500+ schools across India. 0% interest for eligible parents.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <div className="space-y-2">
              <button 
                onClick={onCheckEligibility}
                className="w-full bg-brand-blue text-white p-4 rounded-md shadow-subtle text-left group hover:bg-brand-blue/95 transition-all"
              >
                <Users size={28} className="mb-3" />
                <p className="font-bold text-18">I am a Parent</p>
                <p className="text-13 opacity-80 mt-1">Start your payment arrangement</p>
                <ArrowRight size={18} className="mt-3 group-hover:translate-x-2 transition-transform" />
              </button>
              <p className="text-11 text-brand-muted text-center">No commitment. No hard credit check until you confirm.</p>
              <ObjectionSection />
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => scrollTo('schools')}
                className="w-full bg-white text-brand-navy border border-brand-border p-4 rounded-md text-left group hover:bg-brand-surface transition-all"
              >
                <School size={28} className="mb-3 text-brand-blue" />
                <p className="font-bold text-18">I represent a School</p>
                <p className="text-13 text-brand-muted mt-1">Streamline fee collection</p>
                <ArrowRight size={18} className="mt-3 text-brand-blue group-hover:translate-x-2 transition-transform" />
              </button>
              <p className="text-11 text-brand-muted text-center">Join 6,500+ institutions today.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-brand-border">
            <p className="text-11 text-brand-muted uppercase font-bold tracking-widest mb-4">Backed by Institutional Investors</p>
            <div className="flex items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-navy rounded-full flex items-center justify-center text-white font-bold text-10">IIFL</div>
                <span className="font-bold text-brand-navy">IIFL Fintech</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-10">PV</div>
                <span className="font-bold text-brand-navy">Pravega Ventures</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex justify-center relative"
        >
          <div className="absolute -top-4 -left-4 bg-white p-3 rounded-md shadow-lg border border-brand-border z-10 animate-bounce">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-green rounded-full" />
              <span className="text-12 font-bold text-brand-navy">₹500 Cr+ fees managed</span>
            </div>
          </div>
          {/* Geometric Illustration */}
          <svg width="450" height="450" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="150" width="300" height="200" rx="8" fill="#E8EDF2" />
            <rect x="120" y="100" width="160" height="100" rx="8" fill="#1D6FA4" />
            <circle cx="150" cy="130" r="10" fill="white" opacity="0.2" />
            <rect x="170" y="250" width="60" height="100" fill="#0D2137" />
            <circle cx="100" cy="250" r="30" fill="#00A36C" opacity="0.1" />
            <path d="M280 280C280 260 295 245 315 245C335 245 350 260 350 280V350H280V280Z" fill="#F5A623" opacity="0.2" />
            <circle cx="315" cy="220" r="15" fill="#F5A623" opacity="0.4" />
            <rect x="80" y="300" width="40" height="50" rx="20" fill="#1D6FA4" opacity="0.3" />
            <circle cx="100" cy="285" r="12" fill="#1D6FA4" opacity="0.5" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Check your school",
      desc: "Search if your school is a GrayQuest partner",
      icon: <Search size={24} />,
      content: (
        <div className="mt-3 relative">
          <input 
            type="text" 
            placeholder="Search school name..." 
            className="w-full bg-white border border-brand-border rounded-sm py-2 pl-4 pr-2 text-13 focus:outline-none"
            readOnly
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
        </div>
      )
    },
    {
      title: "Quick Form",
      desc: "PAN card is all you need in most cases",
      icon: <FileText size={24} />,
    },
    {
      title: "10-Min Check",
      desc: "We check your eligibility in under 10 minutes",
      icon: <Zap size={24} />,
    },
    {
      title: "Auto-Debit",
      desc: "School gets full fees. You pay monthly.",
      icon: <CreditCard size={24} />,
    }
  ];

  return (
    <section id="how-it-works" className="py-9 bg-white">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center mb-6">
          <h2 className="mb-2">Simple, transparent, 100% digital</h2>
          <p className="text-brand-muted">Your fee payment plan, simplified.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-brand-border -z-10" />
          
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center mb-3 shadow-lg">
                {step.icon}
              </div>
              <h4 className="font-semibold text-16 mb-1">{step.title}</h4>
              <p className="text-13 text-brand-muted px-2">{step.desc}</p>
              {step.content}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto p-4 bg-brand-green/5 border border-brand-green/20 rounded-md">
          <div className="flex gap-3">
            <CheckCircle2 className="text-brand-green shrink-0" size={24} />
            <p className="text-13 text-brand-muted leading-relaxed">
              GrayQuest partners with licensed NBFCs including <span className="font-semibold text-brand-navy">Avanse Financial Services</span> to facilitate your payment arrangement. Your application may involve a soft or hard credit inquiry depending on the plan chosen. We will tell you which applies before you submit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CreditTransparency = () => {
  const cards = [
    {
      q: "Will this affect my CIBIL score?",
      a: "A soft inquiry (no impact) is used first. A hard pull only happens if you proceed to loan execution — and we tell you before it happens.",
    },
    {
      q: "Who is the lending partner?",
      a: "GrayQuest works with Avanse Financial Services, a licensed NBFC. All loan agreements are with Avanse. GrayQuest is the platform and service layer.",
    },
    {
      q: "What if I miss an EMI?",
      a: "Your bank will charge a bounce fee of ₹500–₹1,200. GrayQuest will notify you 3 days in advance to ensure your account is funded.",
    }
  ];

  return (
    <section className="py-9 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-3">
        <h2 className="text-center mb-6">We believe in 100% transparency about your credit</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-white p-4 rounded-md border border-brand-border shadow-subtle flex gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0 text-brand-green">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-16 mb-2">{card.q}</h4>
                <p className="text-14 text-brand-muted leading-relaxed">{card.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#" className="text-brand-blue font-medium hover:underline flex items-center justify-center gap-1">
            Read our full terms before applying <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Calculator = () => {
  const [fee, setFee] = useState(100000);
  const [emis, setEmis] = useState(12);
  const [school, setSchool] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculate = (e: FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  const monthlyEMI = Math.round(fee / emis);

  return (
    <section className="py-9 bg-white">
      <div className="max-w-7xl mx-auto px-3">
        <h2 className="text-center mb-6">Find out your plan in 30 seconds</h2>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          <form onSubmit={calculate} className="bg-brand-surface p-4 rounded-md border border-brand-border space-y-4">
            <div>
              <label className="block text-13 mb-1">School / Institution Name</label>
              <input 
                type="text" 
                placeholder="e.g. Podar International" 
                className="w-full p-2 border border-brand-border rounded-sm focus:ring-2 focus:ring-brand-blue/20 outline-none"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              />
              <p className="text-11 text-brand-muted mt-1 italic">Hint: Try 'Podar' or 'DPS'</p>
            </div>
            <div>
              <label className="block text-13 mb-1">Annual Fee Amount (₹)</label>
              <input 
                type="number" 
                className="w-full p-2 border border-brand-border rounded-sm focus:ring-2 focus:ring-brand-blue/20 outline-none"
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="block text-13 mb-2">Preferred EMIs</label>
              <div className="flex gap-4">
                {[3, 6, 9, 12].map((num) => (
                  <label key={num} className="flex items-center gap-1 cursor-pointer">
                    <input 
                      type="radio" 
                      name="emis" 
                      value={num} 
                      checked={emis === num}
                      onChange={() => setEmis(num)}
                      className="accent-brand-blue"
                    />
                    <span className="text-14">{num}</span>
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-brand-navy text-white rounded-lg font-semibold hover:bg-brand-navy/90 transition-all">
              Calculate Plan
            </button>
          </form>

          <AnimatePresence mode="wait">
            {showResult ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-brand-navy text-white p-4 rounded-md shadow-lg"
              >
                <h4 className="text-18 font-semibold mb-4 border-b border-white/10 pb-2">Your Estimated Plan</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Monthly EMI</span>
                    <span className="text-24 font-bold">₹{monthlyEMI.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Interest Rate</span>
                    <span className="text-brand-green font-semibold">0% (for this school)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Processing Fee</span>
                    <span className="text-brand-green font-semibold">None</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-brand-green text-white rounded-lg font-bold mt-6 hover:bg-brand-green/90 transition-all">
                  Looks good — start my application
                </button>
                <p className="text-11 text-center text-white/60 mt-2">No commitment. No hard credit check until you confirm.</p>
                <div className="max-w-xs mx-auto">
                  <ObjectionSection />
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-brand-border rounded-md p-6 text-center">
                <p className="text-brand-muted">Enter your details to see your personalized fee plan</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ForParents = ({ onCheckEligibility }: { onCheckEligibility: () => void }) => {
  const benefits = [
    { title: "No lump sum stress", desc: "Pay ₹8,000/month instead of ₹96,000 upfront", icon: <CreditCard /> },
    { title: "Zero paperwork", desc: "Aadhaar OTP KYC, no physical documents", icon: <FileText /> },
    { title: "School paid in full", desc: "Your child's admission is secured from day one", icon: <Zap /> },
    { title: "Free student insurance", desc: "Accidental cover at no extra cost", icon: <Shield /> },
  ];

  const testimonials = [
    { name: "Anjali Sharma", city: "Mumbai", school: "Podar International", quote: "GrayQuest made it so easy to manage my daughter's high school fees without dipping into my savings." },
    { name: "Rahul Verma", city: "Pune", school: "VIBGYOR High", quote: "The 0% interest plan is a lifesaver. The digital process took less than 10 minutes." },
    { name: "Priya Nair", city: "Bengaluru", school: "Orchids International", quote: "Transparent terms and no hidden charges. I've recommended it to all my fellow parents." },
  ];

  return (
    <section id="parents" className="py-9 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-3">
        <h2 className="text-center mb-6">Why parents choose GrayQuest</h2>
        
        <div className="grid md:grid-cols-4 gap-4 mb-9">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white p-4 rounded-md border border-brand-border shadow-subtle">
              <div className="text-brand-blue mb-3">{b.icon}</div>
              <h4 className="font-semibold mb-1">{b.title}</h4>
              <p className="text-13 text-brand-muted">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-9">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-md italic text-brand-text border border-brand-border shadow-subtle relative">
              <div className="absolute -top-3 -right-3 bg-brand-green text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md">
                <CheckCircle2 size={10} /> Verified GrayQuest parent
              </div>
              <p className="mb-4 leading-relaxed">"{t.quote}"</p>
              <div className="text-13 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-surface rounded-full flex items-center justify-center font-bold text-brand-blue">
                  {t.name[0]}
                </div>
                <div>
                  <span className="font-bold">{t.name}</span>, {t.city}
                  <p className="text-brand-muted text-11">{t.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy text-white p-6 rounded-md mb-9 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-center">
          <div>
            <p className="text-24 font-bold">6,500+</p>
            <p className="text-11 text-white/60 uppercase tracking-widest">Partner Schools</p>
          </div>
          <div>
            <p className="text-24 font-bold">2M+</p>
            <p className="text-11 text-white/60 uppercase tracking-widest">Students</p>
          </div>
          <div>
            <p className="text-24 font-bold">₹500 Cr+</p>
            <p className="text-11 text-white/60 uppercase tracking-widest">Fees Managed</p>
          </div>
          <div>
            <p className="text-24 font-bold">4.2★</p>
            <p className="text-11 text-white/60 uppercase tracking-widest">Avg Parent Rating</p>
          </div>
        </div>

        <div className="text-center space-y-3">
          <button 
            onClick={onCheckEligibility}
            className="bg-brand-blue text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Check My Eligibility
          </button>
          <p className="text-11 text-brand-muted">No commitment. No hard credit check until you confirm.</p>
          <div className="max-w-xs mx-auto">
            <ObjectionSection />
          </div>
        </div>
      </div>
    </section>
  );
};

const ForSchools = () => {
  return (
    <section id="schools" className="py-9 bg-white">
      <div className="max-w-7xl mx-auto px-3">
        <h2 className="text-center mb-6">Built for school finance teams</h2>
        
        <div className="grid md:grid-cols-2 gap-9 items-center">
          <div>
            <ul className="space-y-4">
              {[
                "Get full fee upfront — no waiting for term payments",
                "Auto-reconciliation dashboard — ARC",
                "Parent communication built in",
                "Zero collection risk — we handle defaults",
                "Dedicated relationship manager"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-16 font-medium text-brand-navy">
                  <CheckCircle2 className="text-brand-green" size={20} />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-6 bg-brand-navy text-white px-6 py-3 rounded-md font-bold hover:bg-brand-navy/90 transition-all">
              Schedule a Demo
            </button>
            <p className="text-11 text-brand-muted mt-2">Free consultation for your institution.</p>
          </div>
          <div className="relative">
            <div className="bg-brand-surface border border-brand-border rounded-md p-4 shadow-subtle">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <span className="text-11 font-bold text-brand-muted uppercase">ARC Dashboard</span>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-brand-border rounded w-3/4" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-12 bg-brand-blue/10 rounded" />
                  <div className="h-12 bg-brand-blue/10 rounded" />
                  <div className="h-12 bg-brand-blue/10 rounded" />
                </div>
                <div className="h-24 bg-white border border-brand-border rounded" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-brand-blue text-white p-3 rounded shadow-lg hidden md:block">
              <p className="text-11 uppercase font-bold">Live Collections</p>
              <p className="text-18 font-bold">₹4.2 Cr</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PartnerStrip = () => {
  const schoolLogos = [
    { name: "Podar Education", img: "https://picsum.photos/seed/podar/120/60" },
    { name: "DPS", img: "https://picsum.photos/seed/dps/120/60" },
    { name: "SVKM / NMIMS", img: "https://picsum.photos/seed/svkm/120/60" },
    { name: "VIBGYOR", img: "https://picsum.photos/seed/vibgyor/120/60" },
    { name: "Ryan International", img: "https://picsum.photos/seed/ryan/120/60" },
    { name: "Orchids", img: "https://picsum.photos/seed/orchids/120/60" },
    { name: "EuroKids", img: "https://picsum.photos/seed/eurokids/120/60" },
    { name: "Billabong", img: "https://picsum.photos/seed/billabong/120/60" },
    { name: "Mount Litera", img: "https://picsum.photos/seed/litera/120/60" },
    { name: "Jain Group", img: "https://picsum.photos/seed/jain/120/60" },
  ];
  const cities = ["Mumbai", "Pune", "Hyderabad", "Delhi", "Bengaluru", "Chennai"];

  return (
    <section className="py-9 bg-brand-surface border-y border-brand-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-3">
        <p className="text-center text-13 font-bold text-brand-muted uppercase tracking-widest mb-8">Trusted by 6,500+ schools across India</p>
        
        <div className="flex gap-12 animate-scroll whitespace-nowrap mb-8 items-center">
          {[...schoolLogos, ...schoolLogos].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              <img 
                src={s.img} 
                alt={s.name} 
                className="h-12 w-auto object-contain rounded-sm"
                referrerPolicy="no-referrer"
              />
              <span className="text-11 font-bold text-brand-navy/40">{s.name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {cities.map(c => (
            <span key={c} className="px-4 py-2 bg-white border border-brand-border rounded-full text-13 font-semibold text-brand-navy shadow-sm hover:border-brand-blue transition-colors cursor-default">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Will GrayQuest affect my CIBIL score?", a: "Yes, as a credit product, timely payments help build your score, while defaults will be reported to bureaus like CIBIL." },
    { q: "What happens if I miss an EMI?", a: "A bounce fee is charged by your bank. We notify you 3 days in advance to help you avoid this." },
    { q: "Can I foreclose my plan early?", a: "Yes, you can foreclose your plan at any time through our app with zero foreclosure charges." },
    { q: "How long does approval take?", a: "Most applications are approved in under 10 minutes through our fully digital process." },
    { q: "Is my school a GrayQuest partner?", a: "You can search for your school in the calculator section above or contact our support team." },
    { q: "How do I get a refund if I leave the school?", a: "Refunds are processed as per the school's policy. Once the school confirms, we adjust your loan accordingly." }
  ];

  return (
    <section id="help" className="py-9 bg-white">
      <div className="max-w-7xl mx-auto px-3">
        <h2 className="text-center mb-2">Got a question? We have a dedicated support team.</h2>
        <p className="text-center text-brand-muted mb-6">We are here to help you every step of the way.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-9">
          <div className="p-4 border border-brand-border rounded-md text-center hover:shadow-subtle transition-shadow">
            <Phone className="mx-auto mb-3 text-brand-blue" />
            <h4 className="font-bold mb-1">Call Us</h4>
            <p className="text-14 text-brand-navy font-semibold">022-4893-1823</p>
            <p className="text-12 text-brand-muted mt-1">Mon–Sat, 10am–7pm</p>
          </div>
          <div className="p-4 border border-brand-border rounded-md text-center hover:shadow-subtle transition-shadow">
            <Mail className="mx-auto mb-3 text-brand-blue" />
            <h4 className="font-bold mb-1">Email</h4>
            <p className="text-14 text-brand-navy font-semibold">support@grayquest.com</p>
            <p className="text-12 text-brand-muted mt-1">Response in 24 hours</p>
          </div>
          <div className="p-4 border border-brand-border rounded-md text-center hover:shadow-subtle transition-shadow">
            <Ticket className="mx-auto mb-3 text-brand-blue" />
            <h4 className="font-bold mb-1">Raise a Ticket</h4>
            <button className="mt-2 px-4 py-2 bg-brand-blue text-white rounded font-bold text-13">Open Support Form</button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-center mb-4">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-brand-border rounded-md overflow-hidden">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-brand-navy hover:bg-brand-surface transition-colors tap-target"
                >
                  {faq.q}
                  <ChevronDown className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`} size={20} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-brand-muted text-14 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-9 pb-4">
      <div className="max-w-7xl mx-auto px-3 grid md:grid-cols-4 gap-6 mb-9">
        <div>
          <div className="flex items-center gap-1 mb-4">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-blue">
              <rect width="32" height="32" rx="4" fill="currentColor"/>
              <path d="M10 10H22V14H14V18H22V22H10V10Z" fill="white"/>
            </svg>
            <span className="text-18 font-bold">GrayQuest</span>
          </div>
          <p className="text-13 text-white/60 leading-relaxed">
            India's leading education fee financing platform. Making quality education accessible for every family.
          </p>
          <div className="flex gap-4 mt-4 text-white/40">
            <Linkedin size={20} className="hover:text-white cursor-pointer" />
            <Twitter size={20} className="hover:text-white cursor-pointer" />
            <Instagram size={20} className="hover:text-white cursor-pointer" />
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-4">Company</h5>
          <ul className="space-y-2 text-13 text-white/60">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-4">Parents</h5>
          <ul className="space-y-2 text-13 text-white/60">
            <li><a href="#" className="hover:text-white">Fee Financing</a></li>
            <li><a href="#" className="hover:text-white">GQ Rewards</a></li>
            <li><a href="#" className="hover:text-white">Insurance</a></li>
            <li><a href="#" className="hover:text-white">Eligibility Check</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-4">Legal</h5>
          <ul className="space-y-2 text-13 text-white/60">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Lending Partners</a></li>
            <li><a href="#" className="hover:text-white">Grievance Redressal</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 pt-6 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 opacity-40 grayscale">
          <span className="text-11 font-bold uppercase tracking-widest">Lending Partners: Avanse Financial Services</span>
          <div className="flex gap-4">
            <Lock size={16} />
            <ShieldCheck size={16} />
          </div>
        </div>
        <p className="text-11 text-white/40 leading-relaxed mb-4">
          Disclaimer: GrayQuest Education Finance Pvt Ltd is a technology service provider. Loans are offered by partner NBFCs licensed by the Reserve Bank of India. Approval is subject to credit assessment and internal policies of the lending partner.
        </p>
        <p className="text-11 text-white/30">© 2026 GrayQuest Education Finance Pvt Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "GrayQuest Education Fee Payment Plan",
    "description": "Pay school and college fees in easy monthly installments with 0% interest.",
    "brand": {
      "@type": "Brand",
      "name": "GrayQuest"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "description": "0% interest fee payment plans"
    }
  };

  return (
    <div className="min-h-screen selection:bg-brand-blue/10 font-sans">
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      
      <Navbar onCheckEligibility={() => setIsEligibilityOpen(true)} />
      <main className="pt-[32px]">
        <Hero onCheckEligibility={() => setIsEligibilityOpen(true)} />
        <HowItWorks />
        <CreditTransparency />
        <Calculator />
        <ForParents onCheckEligibility={() => setIsEligibilityOpen(true)} />
        <ForSchools />
        <PartnerStrip />
        <HelpCenter />
      </main>
      <Footer />
      
      {/* Floating Support Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-brand-blue text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform z-40"
      >
        <MessageCircle size={20} />
        <span className="font-bold text-14">Chat with us</span>
      </button>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border p-3 z-40 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div>
          <p className="text-13 font-bold text-brand-navy">Check Eligibility</p>
          <p className="text-11 text-brand-muted">Free · No commitment</p>
        </div>
        <button 
          onClick={() => setIsEligibilityOpen(true)}
          className="bg-brand-green text-white px-4 py-2 rounded-md font-bold text-14"
        >
          Check Now
        </button>
      </div>

      <AnimatePresence>
        {isEligibilityOpen && (
          <EligibilityModal isOpen={isEligibilityOpen} onClose={() => setIsEligibilityOpen(false)} />
        )}
        {isChatOpen && (
          <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
