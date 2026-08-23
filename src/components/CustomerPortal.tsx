import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, CheckCircle2, XCircle, Truck, FileText, ArrowRight, Calendar, AlertCircle, Check } from 'lucide-react';

interface Application {
  id: string;
  date: string;
  amount: string;
  status: 'Under Review' | 'Approved' | 'Rejected' | 'Disbursed';
  school: string;
  nextEmiDate?: string;
}

interface CustomerPortalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: Application[];
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ isOpen, onClose, applications }) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'faq'>('applications');
  const [requestingChangeId, setRequestingChangeId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I change my EMI due date?",
      a: "You can request a due date change directly from your active application card in the dashboard. Note that requests must be made at least 5 days before your current due date and are subject to approval."
    },
    {
      q: "What happens if I miss an EMI payment?",
      a: "Missing an EMI may lead to late payment charges and can negatively impact your credit score. We recommend maintaining sufficient balance or contacting us in advance if you foresee a delay."
    },
    {
      q: "How can I foreclose my loan?",
      a: "You can foreclose or prepay your plan at any time with ZERO foreclosure penalties or lock-in charges. Simply send a foreclosure request to support@grayquest.com or initiate it directly from this portal."
    },
    {
      q: "Where can I find my payment receipts?",
      a: "All payment receipts are available for download under each application in the 'Active Applications' section of this portal. Simply click 'Download Receipt' on the relevant application."
    },
    {
      q: "How do I update my bank details for EMI?",
      a: "To update your bank account for future EMIs, you will need to complete a new e-mandate process. Please contact our support team at support@grayquest.com to initiate this update."
    }
  ];

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'Under Review': return <Clock className="text-amber-500" size={20} />;
      case 'Approved': return <CheckCircle2 className="text-brand-green" size={20} />;
      case 'Rejected': return <XCircle className="text-red-500" size={20} />;
      case 'Disbursed': return <Truck className="text-brand-blue" size={20} />;
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'Under Review': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Approved': return 'bg-green-50 text-green-700 border-green-200';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'Disbursed': return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const handleRequestChange = (appId: string) => {
    setRequestingChangeId(appId);
    setSuccess(false);
    setError('');
    setNewDate('');
    setIsConfirming(false);
  };

  const validateDate = (dateStr: string) => {
    if (!dateStr) return "Please select a date";
    
    const selectedDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return "Due date cannot be in the past";
    }

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    // Rule: Within same month or next month
    const monthDiff = (selectedYear - currentYear) * 12 + (selectedMonth - currentMonth);
    
    if (monthDiff < 0 || monthDiff > 1) {
      return "New due date must be within the current or next month";
    }

    return "";
  };

  const handleSubmitRequest = () => {
    const validationError = validateDate(newDate);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setIsConfirming(true);
  };

  const handleConfirmRequest = () => {
    // Simulate API call
    setSuccess(true);
    setIsConfirming(false);
    setTimeout(() => {
      setRequestingChangeId(null);
      setSuccess(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="border-b border-brand-border bg-brand-surface">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-20 font-bold text-brand-navy">Customer Portal</h2>
                  <p className="text-12 text-brand-muted mt-1">Manage your fee payment applications</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-brand-navy/5 rounded-full transition-colors"
                >
                  <X size={24} className="text-brand-navy" />
                </button>
              </div>
              
              {/* Tabs */}
              {!requestingChangeId && (
                <div className="flex px-6 gap-8">
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className={`pb-3 text-14 font-bold transition-all border-b-2 ${
                      activeTab === 'applications' 
                        ? 'text-brand-blue border-brand-blue' 
                        : 'text-brand-muted border-transparent hover:text-brand-navy'
                    }`}
                  >
                    My Applications
                  </button>
                  <button 
                    onClick={() => setActiveTab('faq')}
                    className={`pb-3 text-14 font-bold transition-all border-b-2 ${
                      activeTab === 'faq' 
                        ? 'text-brand-blue border-brand-blue' 
                        : 'text-brand-muted border-transparent hover:text-brand-navy'
                    }`}
                  >
                    Help & FAQ
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {requestingChangeId ? (
                // ... (existing date change form code)
                <div className="max-w-md mx-auto py-8">
                  <button 
                    onClick={() => setRequestingChangeId(null)}
                    className="text-13 text-brand-blue font-bold mb-6 flex items-center gap-1 hover:underline"
                  >
                    <ArrowRight size={14} className="rotate-180" /> Back to Dashboard
                  </button>
                  
                  {success ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={32} />
                      </div>
                      <h3 className="text-20 font-bold text-brand-navy">Request Submitted</h3>
                      <p className="text-14 text-brand-muted mt-2">
                        Your request to change the EMI due date to <span className="font-bold text-brand-navy">{new Date(newDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span> has been received.
                      </p>
                      <p className="text-12 text-brand-muted mt-4">We will notify you once it's approved by our team.</p>
                    </div>
                  ) : isConfirming ? (
                    <div className="space-y-6">
                      <h3 className="text-20 font-bold text-brand-navy">Confirm Due Date Change</h3>
                      <div className="p-4 bg-brand-surface rounded-xl border border-brand-border">
                        <p className="text-14 text-brand-muted">You are requesting to change your EMI due date to:</p>
                        <p className="text-24 font-bold text-brand-navy mt-2">
                          {new Date(newDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <AlertCircle className="text-amber-600 shrink-0" size={20} />
                        <p className="text-12 text-amber-800">
                          Please note that changing your due date may affect your next billing cycle. Ensure you have sufficient funds in your account by the new date.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setIsConfirming(false)}
                          className="flex-1 px-6 py-3 border border-brand-border rounded-lg font-bold text-brand-navy hover:bg-brand-surface transition-all"
                        >
                          Edit Date
                        </button>
                        <button 
                          onClick={handleConfirmRequest}
                          className="flex-1 px-6 py-3 bg-brand-blue text-white rounded-lg font-bold hover:bg-brand-blue/90 transition-all"
                        >
                          Confirm Request
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h3 className="text-20 font-bold text-brand-navy">Change EMI Due Date</h3>
                      <p className="text-14 text-brand-muted">
                        Select a new date for your monthly EMI deduction. Requests are subject to approval.
                      </p>
                      
                      <div className="space-y-2">
                        <label className="text-13 font-bold text-brand-navy">Select New Due Date</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-lg focus:outline-none focus:border-brand-blue transition-colors"
                          />
                          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" size={18} />
                        </div>
                        {error && <p className="text-12 text-red-500 font-medium flex items-center gap-1 mt-1"><AlertCircle size={14} /> {error}</p>}
                      </div>

                      <div className="p-4 bg-brand-surface rounded-xl border border-brand-border">
                        <h4 className="text-13 font-bold text-brand-navy mb-2">Business Rules:</h4>
                        <ul className="text-12 text-brand-muted space-y-1 list-disc pl-4">
                          <li>New date must be within the current or next month.</li>
                          <li>Requests must be made at least 5 days before the current due date.</li>
                          <li>Only one change request allowed per billing cycle.</li>
                        </ul>
                      </div>

                      <button 
                        onClick={handleSubmitRequest}
                        className="w-full bg-brand-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-blue/90 transition-all"
                      >
                        Review Request
                      </button>
                    </div>
                  )}
                </div>
              ) : activeTab === 'faq' ? (
                <div className="space-y-4 max-w-2xl mx-auto py-4">
                  <h3 className="text-18 font-bold text-brand-navy mb-6">Frequently Asked Questions</h3>
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border border-brand-border rounded-xl overflow-hidden bg-white"
                    >
                      <button 
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-brand-surface transition-colors"
                      >
                        <span className="font-bold text-brand-navy text-14">{faq.q}</span>
                        <ArrowRight 
                          size={16} 
                          className={`text-brand-muted transition-transform ${expandedFaq === index ? 'rotate-90' : ''}`} 
                        />
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-0 text-13 text-brand-muted leading-relaxed border-t border-brand-border/50">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  <div className="mt-8 p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue/10 text-center">
                    <p className="text-14 text-brand-navy font-medium mb-2">Still have questions?</p>
                    <p className="text-12 text-brand-muted mb-4">Our support team is available Monday to Saturday, 10 AM - 7 PM.</p>
                    <a 
                      href="mailto:support@grayquest.com" 
                      className="inline-flex items-center gap-2 text-brand-blue font-bold hover:underline"
                    >
                      Contact Support <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ) : applications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-brand-surface rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="text-brand-muted" size={32} />
                  </div>
                  <h3 className="text-18 font-bold text-brand-navy">No applications yet</h3>
                  <p className="text-14 text-brand-muted mt-2">Start your first fee payment plan today.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 bg-brand-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-blue/90 transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-14 font-bold text-brand-muted uppercase tracking-wider mb-2">Active Applications</h3>
                  {applications.map((app) => (
                    <div 
                      key={app.id}
                      className="p-4 border border-brand-border rounded-xl hover:shadow-subtle transition-all bg-white group"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getStatusColor(app.status)} border`}>
                            {getStatusIcon(app.status)}
                          </div>
                          <div>
                            <h4 className="font-bold text-brand-navy">{app.school}</h4>
                            <p className="text-12 text-brand-muted mt-0.5">Application ID: {app.id}</p>
                            <p className="text-12 text-brand-muted">Applied on: {app.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-16 font-bold text-brand-navy">₹{app.amount}</p>
                          <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-11 font-bold border ${getStatusColor(app.status)}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {app.status}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-brand-border flex items-center justify-between">
                        <div className="flex gap-2">
                          <button className="text-12 font-bold text-brand-blue hover:underline">View Details</button>
                          <span className="text-brand-border">|</span>
                          <button 
                            onClick={() => handleRequestChange(app.id)}
                            className="text-12 font-bold text-brand-blue hover:underline"
                          >
                            Change Due Date
                          </button>
                          <span className="text-brand-border">|</span>
                          <button className="text-12 font-bold text-brand-blue hover:underline">Download Receipt</button>
                        </div>
                        <ArrowRight size={16} className="text-brand-muted group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-brand-surface border-t border-brand-border text-center">
              <p className="text-11 text-brand-muted">
                Need help? Contact our support at <span className="font-bold text-brand-navy">support@grayquest.com</span> or call <span className="font-bold text-brand-navy">+91 80974 00000</span>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
