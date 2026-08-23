import { Linkedin, Twitter, Instagram, MapPin, Phone, Mail, Lock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';

export const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white pt-7 pb-5">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-5">
          {/* Brand & Social */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2.5">
              <Logo variant="light" size="sm" />
            </div>
            <p className="text-12 text-white/60 leading-relaxed max-w-xs">
              India's leading education fee financing platform. Making quality education accessible for every family.
            </p>
            <div className="flex gap-3.5 mt-3 text-white/40">
              <Linkedin size={16} className="hover:text-white cursor-pointer transition-colors" />
              <Twitter size={16} className="hover:text-white cursor-pointer transition-colors" />
              <Instagram size={16} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold text-12 uppercase tracking-wider text-white/90 mb-2.5">Company</h5>
            <ul className="space-y-1.5 text-12 text-white/60">
              <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Parents */}
          <div>
            <h5 className="font-bold text-12 uppercase tracking-wider text-white/90 mb-2.5">Parents</h5>
            <ul className="space-y-1.5 text-12 text-white/60">
              <li><Link to="/parents" className="hover:text-white transition-colors">Fee Financing</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Insurance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Portal</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-span-2 md:col-span-1">
            <h5 className="font-bold text-12 uppercase tracking-wider text-white/90 mb-2.5">Contact Us</h5>
            <ul className="space-y-2 text-12 text-white/60">
              <li className="flex gap-2 items-start">
                <MapPin size={15} className="shrink-0 text-brand-blue mt-0.5" />
                <span className="leading-snug">301, 3rd Floor, Plot No. 12, Sector 17, Vashi, Navi Mumbai 400703</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-blue shrink-0" />
                <span>+91 80974 00000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-brand-blue shrink-0" />
                <span>support@grayquest.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Compliance & Copyright Strip */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-white/50 text-[11px]">
            <span className="font-semibold uppercase tracking-wider">
              Lending Partners: Arka Fincap • Ratnaafincorp • Mirae Asset • Western Capital • Avanse
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Lock size={12} className="text-brand-green" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-brand-green" />
                <span>RBI Regulated</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-white/40 leading-relaxed mb-3">
            Disclaimer: GrayQuest Education Finance Pvt Ltd is a technology service provider. Loans are offered by partner NBFCs licensed by the Reserve Bank of India. Approval is subject to credit assessment and internal policies of the lending partner.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-white/35 pt-1 border-t border-white/5">
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Lending Partners</a>
              <a href="#" className="hover:text-white transition-colors">Grievance Redressal</a>
              <a href="#" className="hover:text-white transition-colors">Fair Practice Code</a>
            </div>
            <p>© 2026 GrayQuest Education Finance Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
