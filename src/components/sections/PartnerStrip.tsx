import { useState } from 'react';
import { School } from 'lucide-react';

export const PartnerStrip = () => {
  const schoolLogos = [
    { name: "Podar Education", short: "Podar", img: "https://www.podareducation.org/images/logo.png" },
    { name: "NMIMS University", short: "NMIMS", img: "https://www.nmims.edu/images/logo.png" },
    { name: "VIBGYOR High", short: "VIBGYOR", img: "https://www.vibgyorhigh.com/images/logo.png" },
    { name: "Ryan International", short: "Ryan", img: "https://www.ryaninternational.org/images/logo.png" },
    { name: "Orchids International", short: "Orchids", img: "https://www.orchidsinternationalschool.com/wp-content/uploads/2022/03/Orchids-Logo.png" },
    { name: "EuroKids Preschool", short: "EuroKids", img: "https://www.eurokidsindia.com/images/logo.png" },
    { name: "Billabong High", short: "Billabong", img: "https://www.billabonghighschool.com/images/logo.png" },
    { name: "Mount Litera Zee", short: "Zee School", img: "https://www.mountlitera.com/images/logo.png" },
    { name: "Jain Group of Inst.", short: "Jain Group", img: "https://www.jgi.ac.in/images/logo.png" },
    { name: "Delhi Public School", short: "DPS", img: "https://www.dpsfamily.org/images/logo.png" },
  ];
  const cities = ["Mumbai", "Pune", "Hyderabad", "Delhi NCR", "Bengaluru", "Chennai", "Ahmedabad", "Kolkata", "Jaipur", "Lucknow"];

  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="py-9 bg-[#EDF1F6] border-y border-brand-border overflow-hidden">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10">
        <p className="text-center text-13 font-bold text-brand-muted uppercase tracking-widest mb-8">Trusted by 6,500+ schools across India</p>
        
        <div className="flex gap-12 animate-scroll whitespace-nowrap mb-8 items-center">
          {[...schoolLogos, ...schoolLogos].map((s, i) => (
            <div key={`${s.name}-${i}`} className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 shrink-0">
              {!failedImages[`${s.name}-${i}`] ? (
                <img 
                  src={s.img} 
                  alt={s.name} 
                  className="h-10 max-w-[120px] w-auto object-contain rounded-sm"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    setFailedImages(prev => ({ ...prev, [`${s.name}-${i}`]: true }));
                  }}
                />
              ) : (
                <div className="h-10 px-3 bg-white border border-brand-border rounded flex items-center gap-1.5 shadow-2xs">
                  <School size={16} className="text-brand-blue" />
                  <span className="font-bold text-12 text-brand-navy">{s.short}</span>
                </div>
              )}
              <span className="text-11 font-bold text-brand-navy/60">{s.name}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center flex-nowrap overflow-x-auto gap-1.5 sm:gap-2 md:gap-2.5 py-1 no-scrollbar">
          {cities.map(c => (
            <span 
              key={c} 
              className="px-2.5 sm:px-3 md:px-3.5 py-1 sm:py-1.5 bg-white border border-brand-border rounded-full text-11 sm:text-12 font-semibold text-brand-navy shadow-2xs hover:border-brand-blue hover:text-brand-blue transition-colors cursor-default whitespace-nowrap shrink-0"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
