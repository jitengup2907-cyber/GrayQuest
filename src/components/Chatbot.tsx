import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, User, Bot, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the GrayQuest AI Assistant, a helpful and professional support agent for GrayQuest, India's leading education-focused fintech company.

Your goal is to assist parents, students, and educational institutions with their queries based on the following knowledge:

1. **What is GrayQuest?**
   - India's first education-focused fintech ecosystem.
   - Enables parents to pay annual education fees in easy monthly installments (EMI) at 0% extra cost.
   - Partnered with 6,500+ schools and colleges across India.

2. **Key Benefits for Parents:**
   - **0% Interest EMI:** Pay fees monthly without any interest burden.
   - **Insurance Coverage:** Complimentary insurance that secures a student's education in case of unforeseen circumstances.
   - **GQ Rewards:** India's first student-focused loyalty program. Earn points for every fee payment and redeem them for brand vouchers and experiences.
   - **Digital Process:** 100% paperless and instant approval.

3. **Supported Courses & Career Paths:**
   - **K-12 Education:** Comprehensive support for school fees across 6,500+ partner institutions.
   - **Higher Education:** Financing for professional degrees in Engineering, Medicine, Management (MBA), and Law.
   - **Vocational & Upskilling:** Support for high-demand certifications in Data Science, AI/ML, Cloud Computing, Cybersecurity, and Digital Marketing.
   - **Job Market Alignment:** We focus on financing courses that offer high ROI and align with the growing digital economy and healthcare sectors, making expensive professional training accessible to all.

4. **GrayQuest vs. Traditional Education Loans:**
   - **Interest Rate:** GrayQuest offers 0% interest, while traditional loans charge 10-15% p.a.
   - **Processing Fees:** Minimal and transparent with GrayQuest vs. high fees (1-2%) with banks.
   - **Collateral:** No collateral required for GrayQuest plans.
   - **Approval:** Instant/Same-day approval with GrayQuest vs. 7-15 days for traditional loans.
   - **Foreclosure:** If you wish to foreclose, a nominal fee of 2.5% of the total remaining EMI amount is applicable.

5. **Financial Planning for Education (Mistakes to Avoid):**
   - **Starting Too Late:** Education costs compound; early planning is crucial.
   - **Ignoring Education Inflation:** Education costs in India often rise by 10-12% annually, significantly higher than general inflation.
   - **Overlooking Hidden Costs:** Always account for books, laptops, living expenses, and extracurriculars, not just tuition.
   - **Relying Solely on Liquid Savings:** Using all cash for fees can deplete emergency funds. GrayQuest's 0% EMI allows you to preserve liquidity.
   - **Neglecting Insurance:** Unforeseen events can halt education. GrayQuest includes complimentary insurance to secure the student's future.

6. **Customer Journey & Support:**
   - **Application:** Parents can apply via customer.grayquest.com.
   - **EMI Date Changes:** Can be requested through the customer portal.
   - **Foreclosure:** Requests for early loan closure can be initiated via support. A nominal fee of 2.5% of the total remaining EMI amount is applicable.
   - **Escalation:** If a query isn't resolved, it can be escalated to the support team at support@grayquest.com.

7. **Important Links:**
   - Customer Portal: https://customer.grayquest.com/
   - Official Website: https://grayquest.com/
   - Support Email: support@grayquest.com

**Tone and Style:**
- **Empathetic & Professional:** You understand that education is a significant emotional and financial investment. Use a warm, supportive tone. Acknowledge the importance of their queries with phrases like "I understand how important this is for your child's future" or "We're here to help you navigate these options."
- **Clarity with Bullet Points:** Always use bullet points when explaining features, benefits, or multi-step processes. This ensures the information is easy to read and digest.
- **Concise but Informative:** Provide direct answers to questions while offering relevant context. Avoid unnecessary jargon.
- **Polite Redirection:** If you cannot answer a specific question or if the query requires account-specific details (like a specific application status), gracefully direct the user to:
  - The **Customer Portal** (https://customer.grayquest.com/) for account management.
  - Our **Support Team** at support@grayquest.com for direct assistance.
- **Conciseness:** Keep your responses focused. If a user asks a broad question, give a high-level overview and ask if they'd like more details on a specific part.
`;

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      text: "Hi! I'm your GrayQuest Assistant. How can I help you with your education fee financing today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const chatHistory = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: response.text || "I'm sorry, I couldn't process that request. Please try again or contact support.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: "I'm having trouble connecting to my brain right now. Please try again in a moment, or contact our support team at support@grayquest.com if the issue persists. We're here to help!",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Pill */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-5 z-40 bg-brand-navy text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 font-bold border border-white/10 hover:bg-brand-navy/95 transition-all cursor-pointer"
        id="chat-with-us-pill"
      >
        <MessageCircle size={18} className="text-brand-blue" />
        <span className="text-13">Chat with us</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[60] w-[90vw] md:w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-brand-border"
          >
            {/* Header */}
            <div className="bg-brand-navy p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-blue/20 rounded-full flex items-center justify-center">
                  <Bot size={24} className="text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-16">GrayQuest Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-11 text-white/60">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-surface">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-brand-blue text-white' : 'bg-brand-navy text-white'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-14 leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-brand-blue text-white rounded-tr-none' 
                        : 'bg-white text-brand-navy shadow-sm border border-brand-border rounded-tl-none'
                    }`}>
                      {msg.text}
                      <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-brand-muted'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center bg-white p-3 rounded-2xl shadow-sm border border-brand-border rounded-tl-none">
                    <Loader2 size={16} className="animate-spin text-brand-blue" />
                    <span className="text-12 text-brand-muted">Assistant is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-brand-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about fee EMIs, rewards..."
                  className="flex-1 bg-brand-surface border border-brand-border rounded-lg px-4 py-2 text-14 focus:outline-none focus:border-brand-blue transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-brand-blue text-white p-2 rounded-lg hover:bg-brand-blue/90 disabled:opacity-50 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-[10px] text-brand-muted mt-2 text-center flex items-center justify-center gap-1">
                Powered by GrayQuest AI <ExternalLink size={8} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
