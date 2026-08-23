import React, { useState } from 'react';
import { Phone, Mail, Ticket, ChevronDown, X, CheckCircle2, Send, Clock, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketCategory, setTicketCategory] = useState('Payment & EMI');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

  const faqs = [
    { q: "Will GrayQuest affect my CIBIL score?", a: "Yes, as a credit product, timely payments help build your score, while defaults will be reported to bureaus like CIBIL." },
    { q: "What happens if I miss an EMI?", a: "A bounce fee is charged by your bank. We notify you 3 days in advance to help you avoid this." },
    { q: "Can I foreclose my plan early?", a: "Yes, you can foreclose your plan at any time through our app with zero foreclosure charges." },
    { q: "How long does approval take?", a: "Most applications are approved in under 10 minutes through our fully digital process." },
    { q: "Is my school a GrayQuest partner?", a: "You can search for your school in the calculator section above or contact our support team." },
    { q: "How do I get a refund if I leave the school?", a: "Refunds are processed as per the school's policy. Once the school confirms, we adjust your loan accordingly." }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `GQ-TKT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketRef(generatedRef);
    setTicketSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsTicketModalOpen(false);
    setTicketSubmitted(false);
    setParentName('');
    setParentPhone('');
    setApplicationId('');
    setTicketMessage('');
  };

  return (
    <section id="help" className="py-9 bg-[#F4F6FA]">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="text-center mb-2 text-28 font-bold text-brand-navy">Got a question? We have a dedicated support team.</h2>
        <p className="text-center text-brand-muted mb-6">We are here to help you every step of the way.</p>

        <div className="grid md:grid-cols-3 gap-5 mb-9">
          <div className="p-5 border border-brand-border rounded-xl text-center hover:shadow-subtle transition-shadow bg-white">
            <Phone className="mx-auto mb-3 text-brand-blue" />
            <h4 className="font-bold mb-1">Call Us</h4>
            <p className="text-14 text-brand-navy font-semibold">+91 80974 00000</p>
            <p className="text-12 text-brand-muted mt-1">Mon–Sat, 10am–7pm</p>
          </div>
          <div className="p-5 border border-brand-border rounded-xl text-center hover:shadow-subtle transition-shadow bg-white">
            <Mail className="mx-auto mb-3 text-brand-blue" />
            <h4 className="font-bold mb-1">Email</h4>
            <p className="text-14 text-brand-navy font-semibold">support@grayquest.com</p>
            <p className="text-12 text-brand-muted mt-1">Response in 24 hours</p>
          </div>
          <div className="p-5 border border-brand-border rounded-xl text-center hover:shadow-subtle transition-shadow bg-white">
            <Ticket className="mx-auto mb-3 text-brand-blue" />
            <h4 className="font-bold mb-1">Raise a Ticket</h4>
            <button 
              onClick={() => setIsTicketModalOpen(true)}
              className="mt-2 px-4 py-2 bg-brand-blue hover:bg-brand-navy text-white rounded-lg font-bold text-13 cursor-pointer transition-colors"
            >
              Open Support Form
            </button>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <h3 className="text-center mb-4 text-20 font-bold text-brand-navy">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-brand-border rounded-md overflow-hidden bg-white">
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

      {/* Support Ticket Modal */}
      <AnimatePresence>
        {isTicketModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs"
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl z-10 overflow-hidden border border-brand-border"
            >
              <div className="p-5 bg-brand-navy text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ticket size={20} className="text-brand-blue" />
                  <h3 className="font-bold text-16">Raise a Support Ticket</h3>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                {ticketSubmitted ? (
                  <div className="text-center py-4 space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={28} />
                    </div>
                    <h4 className="text-18 font-bold text-brand-navy">Ticket Raised Successfully</h4>
                    <p className="text-13 text-brand-muted max-w-sm mx-auto">
                      Your query has been assigned to a dedicated support officer. You will receive an update on WhatsApp and email.
                    </p>
                    <div className="p-3 bg-slate-50 border border-brand-border rounded-xl text-12 font-mono text-slate-700 font-bold">
                      Reference ID: {ticketRef}
                    </div>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="mt-4 px-6 py-2.5 bg-brand-blue text-white rounded-xl font-bold text-13 hover:bg-brand-navy transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div>
                      <label className="block text-12 font-bold text-brand-navy mb-1">Issue Category</label>
                      <select 
                        value={ticketCategory}
                        onChange={(e) => setTicketCategory(e.target.value)}
                        className="w-full p-2.5 border border-brand-border rounded-xl text-13 focus:outline-none focus:border-brand-blue"
                      >
                        <option value="Payment & EMI">Payment & EMI Schedule</option>
                        <option value="KYC & Aadhaar">KYC & Document Verification</option>
                        <option value="Sanction Letter">Sanction Letter & Disbursal</option>
                        <option value="School Fee Receipt">School Fee Receipt & ERP Sync</option>
                        <option value="Foreclosure">Foreclosure & Prepayment</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-12 font-bold text-brand-navy mb-1">Your Full Name</label>
                        <input 
                          type="text"
                          required
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          placeholder="e.g. Ramesh Patel"
                          className="w-full p-2.5 border border-brand-border rounded-xl text-13 focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-12 font-bold text-brand-navy mb-1">Mobile Number</label>
                        <input 
                          type="tel"
                          required
                          maxLength={10}
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="10-digit mobile"
                          className="w-full p-2.5 border border-brand-border rounded-xl text-13 focus:outline-none focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-12 font-bold text-brand-navy mb-1">Application ID (Optional)</label>
                      <input 
                        type="text"
                        value={applicationId}
                        onChange={(e) => setApplicationId(e.target.value)}
                        placeholder="e.g. GQ-APP-2026-9842"
                        className="w-full p-2.5 border border-brand-border rounded-xl text-13 focus:outline-none focus:border-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-12 font-bold text-brand-navy mb-1">Describe your query</label>
                      <textarea 
                        required
                        rows={3}
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                        placeholder="Please provide details regarding your inquiry..."
                        className="w-full p-2.5 border border-brand-border rounded-xl text-13 focus:outline-none focus:border-brand-blue resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 text-13 font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-brand-blue hover:bg-brand-navy text-white rounded-xl font-bold text-13 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send size={14} />
                        <span>Submit Ticket</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
