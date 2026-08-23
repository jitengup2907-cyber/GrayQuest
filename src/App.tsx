import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Layout & Components
import { Layout } from './components/layout/Layout';
import { Chatbot } from './components/Chatbot';
import { LoanApplicationModal } from './components/LoanApplicationModal';
import { CustomerPortal } from './components/CustomerPortal';
import { EligibilityModal } from './components/EligibilityModal';

// Pages
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ParentsPage } from './pages/ParentsPage';
import { SchoolsPage } from './pages/SchoolsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { ResourcesPage } from './pages/ResourcesPage';

export default function App() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [prefillApplicationData, setPrefillApplicationData] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([
    {
      id: 'GQ829104',
      date: '02 Apr 2026',
      amount: '1,20,000',
      status: 'Approved',
      school: 'Podar International School',
    }
  ]);

  const addApplication = (app: any) => {
    setApplications(prev => [app, ...prev]);
  };

  const handleProceedFromEligibility = (initialData: any) => {
    setPrefillApplicationData(initialData);
    setIsEligibilityOpen(false);
    setIsApplicationOpen(true);
  };

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
    <Router>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
      
      <Layout 
        onCheckEligibility={() => setIsEligibilityOpen(true)} 
        onStartApplication={() => setIsApplicationOpen(true)}
        onOpenPortal={() => setIsPortalOpen(true)}
      >
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onCheckEligibility={() => setIsEligibilityOpen(true)} 
                onApplyNow={() => setIsApplicationOpen(true)} 
              />
            } 
          />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route 
            path="/parents" 
            element={
              <ParentsPage 
                onCheckEligibility={() => setIsEligibilityOpen(true)} 
                onStartApplication={(data) => {
                  if (data) {
                    setPrefillApplicationData({
                      schoolName: data.schoolName,
                      loanAmount: String(data.fee),
                      tenure: data.tenure,
                    });
                  }
                  setIsApplicationOpen(true);
                }}
              />
            } 
          />
          <Route path="/schools" element={<SchoolsPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resources" element={<ResourcesPage onCheckEligibility={() => setIsEligibilityOpen(true)} />} />
        </Routes>

        {/* Mobile Sticky Bottom Unified Action Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#F6F8FA]/95 backdrop-blur-md border-t border-brand-border px-3 py-2.5 z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setIsEligibilityOpen(true)}
              className="w-full bg-brand-surface hover:bg-slate-100 border border-brand-border text-brand-navy py-2 px-2.5 rounded-lg font-bold text-12 text-center transition-all flex items-center justify-center gap-1 shadow-2xs"
            >
              <span>Check Eligibility</span>
            </button>
            <button 
              onClick={() => setIsApplicationOpen(true)}
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white py-2 px-2.5 rounded-lg font-bold text-12 text-center transition-all flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Start Application</span>
            </button>
          </div>
        </div>
      </Layout>

      <AnimatePresence>
        {isEligibilityOpen && (
          <EligibilityModal 
            isOpen={isEligibilityOpen} 
            onClose={() => setIsEligibilityOpen(false)} 
            onProceedToApply={handleProceedFromEligibility}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isApplicationOpen && (
          <LoanApplicationModal 
            isOpen={isApplicationOpen} 
            onClose={() => {
              setIsApplicationOpen(false);
              setPrefillApplicationData(null);
            }} 
            onSuccess={addApplication}
            initialData={prefillApplicationData}
          />
        )}
      </AnimatePresence>

      <CustomerPortal 
        isOpen={isPortalOpen} 
        onClose={() => setIsPortalOpen(false)} 
        applications={applications}
      />

      <Chatbot />

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </Router>
  );
}
