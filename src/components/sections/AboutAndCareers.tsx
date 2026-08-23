import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const AboutAndCareers = () => {
  return (
    <section className="py-9 bg-[#F4F6FA]">
      <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-10 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-12 font-bold mb-4 inline-block">Our Story</span>
          <h2 className="mb-4 text-28 font-bold text-brand-navy">Making quality education accessible for every family.</h2>
          <p className="text-brand-muted mb-6 leading-relaxed">
            GrayQuest was founded with a simple mission: to ensure that no child's education is compromised due to financial constraints. We are building India's first education-focused fintech ecosystem that benefits parents, students, and institutions alike.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-brand-surface rounded-md border border-brand-border">
              <p className="text-24 font-bold text-brand-blue">6,500+</p>
              <p className="text-12 text-brand-muted uppercase font-bold tracking-wider">Partner Institutions</p>
            </div>
            <div className="p-4 bg-brand-surface rounded-md border border-brand-border">
              <p className="text-24 font-bold text-brand-blue">2,00,000+</p>
              <p className="text-12 text-brand-muted uppercase font-bold tracking-wider">Families Supported</p>
            </div>
          </div>
          <a 
            href="https://grayquest.com/about-us" 
            className="mt-8 inline-flex items-center gap-2 text-brand-blue font-bold hover:gap-3 transition-all"
          >
            Learn more about our mission <ArrowRight size={18} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-brand-navy text-white p-8 rounded-md relative overflow-hidden"
        >
          <div className="relative z-10">
            <span className="px-3 py-1 bg-white/10 text-white rounded-full text-12 font-bold mb-4 inline-block">Careers</span>
            <h3 className="text-white text-24 mb-4 font-bold">Join the mission to transform education finance.</h3>
            <p className="text-white/60 mb-8">
              We are always looking for passionate individuals to join our team in Mumbai and across India. Explore open roles in Engineering, Product, Sales, and Operations.
            </p>
            <a 
              href="https://grayquest.com/careers" 
              className="bg-brand-blue text-white px-6 py-3 rounded-md font-bold inline-block hover:bg-brand-blue/90 transition-all"
            >
              View Openings
            </a>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};
