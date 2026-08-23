export interface Institution {
  id: string;
  name: string;
  shortName?: string;
  city: string;
  category: 'K-12' | 'Higher Education' | 'Preschool' | 'Coaching / Test Prep' | 'Other';
  subventionType: 'full_subvention' | 'partial_subvention' | 'standard';
  // Specific tenure flat interest rates (in percentage)
  // For example: 3M: 0%, 6M: 0%, 9M: 2.0%, 10M: 2.5%, 11M: 3.5%, 12M: 4.0%
  tenureRates: {
    [tenureMonths: number]: {
      flatRatePercent: number; // e.g. 0 for 0%, 2.0 for 2%, 3.5 for 3.5%
      processingFee: number; // in INR
    };
  };
  defaultProcessingFee: number;
  subsidyBadge: string;
  isPartner: boolean;
  featured: boolean;
  tierNote: string;
  coBrandedContact?: {
    email: string;
    phone: string;
    focalPerson?: string;
  };
}

export const INSTITUTIONS: Institution[] = [
  // 1. SRI CHAITANYA GROUP
  {
    id: 'sri_chaitanya_junior_colleges',
    name: 'Sri Chaitanya Junior Colleges & IIT Academy',
    shortName: 'Sri Chaitanya Colleges',
    city: 'Hyderabad, Vijayawada, Vizag, Bengaluru, Pan-India',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 4.0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Official Subvention Partner (0% for 3 & 6 Months)',
    isPartner: true,
    featured: true,
    tierNote: '0% interest for 3 & 6 months. Subsidized 2% for 9 months and 3.5% for 11 months with zero hidden costs.',
    coBrandedContact: {
      email: 'srichaitanyacolleges@grayquest.com',
      phone: '+91 7351756746',
      focalPerson: 'Sri Chaitanya Fee Assistance Desk'
    }
  },
  {
    id: 'sri_chaitanya_techno_schools',
    name: 'Sri Chaitanya Techno Schools',
    shortName: 'Sri Chaitanya Techno',
    city: 'Telangana, Andhra Pradesh, Karnataka, Pan-India',
    category: 'K-12',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 4.0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Official Subvention Partner (0% for 3 & 6 Months)',
    isPartner: true,
    featured: true,
    tierNote: 'K-12 school fee installment plans with 0% interest on 3 & 6-month tenures.',
    coBrandedContact: {
      email: 'srichaitanyaschools@grayquest.com',
      phone: '+91 7351756746'
    }
  },
  {
    id: 'sri_chaitanya_kokapet',
    name: 'Sri Chaitanya Zonal Campus Kokapet',
    shortName: 'Sri Chaitanya Kokapet',
    city: 'Kokapet, Hyderabad, Telangana',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 4.0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Direct Zonal Campus Tie-Up (0% on 3 & 6 Months)',
    isPartner: true,
    featured: false,
    tierNote: 'Dedicated on-ground GrayQuest FOS support available on campus for instant digital approval.',
    coBrandedContact: {
      email: 'srichaitanyacolleges@grayquest.com',
      phone: '+91 7351756746'
    }
  },
  {
    id: 'sri_chaitanya_raman_bhavan',
    name: 'Sri Chaitanya Raman Bhavan 2 Campus',
    shortName: 'Sri Chaitanya Raman Bhavan',
    city: 'Hyderabad, Telangana',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 4.0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Institutional Partnership (0% on 3 & 6 Months)',
    isPartner: true,
    featured: false,
    tierNote: 'On-ground assistance with bilingual support for 100% digital fee authorization.',
    coBrandedContact: {
      email: 'srichaitanyacolleges@grayquest.com',
      phone: '+91 7351756746'
    }
  },

  // 2. NARAYANA GROUP
  {
    id: 'narayana_junior_colleges',
    name: 'Narayana Educational Institutions & Junior Colleges',
    shortName: 'Narayana Group',
    city: 'Hyderabad, Bengaluru, Chennai, Visakhapatnam, Pan-India',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 4.0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Official Subvention Partner (0% on 3 & 6 Months)',
    isPartner: true,
    featured: true,
    tierNote: 'Over 7,700+ parents verified across Narayana branches with instant 2-minute auto-approval.',
    coBrandedContact: {
      email: 'narayana@grayquest.com',
      phone: '+91 7351756746'
    }
  },
  {
    id: 'narayana_e_techno',
    name: 'Narayana e-Techno Schools',
    shortName: 'Narayana e-Techno',
    city: 'Hyderabad, Bengaluru, Delhi NCR, Pan-India',
    category: 'K-12',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 4.0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Official Partner (0% on 3 & 6 Months)',
    isPartner: true,
    featured: true,
    tierNote: '0% EMI for school session fees across all e-Techno primary and high school branches.'
  },
  {
    id: 'narayana_iit_neet',
    name: 'Narayana IIT / NEET Academy (CO-Spark & Olympus)',
    shortName: 'Narayana IIT Academy',
    city: 'Hyderabad, Kota, Bengaluru, Delhi NCR',
    category: 'Coaching / Test Prep',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 4.0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: '0% Interest Subsidized (3 & 6M)',
    isPartner: true,
    featured: false,
    tierNote: 'Integrated coaching fee financing with zero-stress monthly repayment plans.'
  },

  // 3. IITS & PREMIER ENGINEERING INSTITUTES
  {
    id: 'iit_bombay',
    name: 'Indian Institute of Technology (IIT) Bombay',
    shortName: 'IIT Bombay',
    city: 'Powai, Mumbai, Maharashtra',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 1.8, processingFee: 0 },
      10: { flatRatePercent: 2.2, processingFee: 0 },
      11: { flatRatePercent: 2.8, processingFee: 0 },
      12: { flatRatePercent: 3.2, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Premier Engineering Rate (0% on 3 & 6M)',
    isPartner: true,
    featured: true,
    tierNote: 'Semester fee financing for B.Tech, M.Tech, and Executive Continuing Education programs.'
  },
  {
    id: 'iit_delhi',
    name: 'Indian Institute of Technology (IIT) Delhi',
    shortName: 'IIT Delhi',
    city: 'Hauz Khas, New Delhi',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 1.8, processingFee: 0 },
      10: { flatRatePercent: 2.2, processingFee: 0 },
      11: { flatRatePercent: 2.8, processingFee: 0 },
      12: { flatRatePercent: 3.2, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Premier Engineering Rate (0% on 3 & 6M)',
    isPartner: true,
    featured: false,
    tierNote: 'Seamless semester fee financing for undergraduate & postgraduate engineering students.'
  },
  {
    id: 'iit_madras',
    name: 'Indian Institute of Technology (IIT) Madras',
    shortName: 'IIT Madras',
    city: 'Chennai, Tamil Nadu',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 1.8, processingFee: 0 },
      10: { flatRatePercent: 2.2, processingFee: 0 },
      11: { flatRatePercent: 2.8, processingFee: 0 },
      12: { flatRatePercent: 3.2, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Premier Engineering Rate (0% on 3 & 6M)',
    isPartner: true,
    featured: false,
    tierNote: 'Includes support for BS in Data Science and on-campus degree tuition disbursements.'
  },
  {
    id: 'iit_hyderabad',
    name: 'Indian Institute of Technology (IIT) Hyderabad',
    shortName: 'IIT Hyderabad',
    city: 'Kandi, Sangareddy / Hyderabad, Telangana',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 1.8, processingFee: 0 },
      10: { flatRatePercent: 2.2, processingFee: 0 },
      11: { flatRatePercent: 2.8, processingFee: 0 },
      12: { flatRatePercent: 3.2, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Premier Engineering Rate (0% on 3 & 6M)',
    isPartner: true,
    featured: true,
    tierNote: 'Zero-stress semester fee staggering for engineering and advanced research students.'
  },
  {
    id: 'iit_kharagpur',
    name: 'Indian Institute of Technology (IIT) Kharagpur',
    shortName: 'IIT Kharagpur',
    city: 'Kharagpur, West Bengal',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 1.8, processingFee: 0 },
      10: { flatRatePercent: 2.2, processingFee: 0 },
      11: { flatRatePercent: 2.8, processingFee: 0 },
      12: { flatRatePercent: 3.2, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Premier Engineering Rate (0% on 3 & 6M)',
    isPartner: true,
    featured: false,
    tierNote: 'National premier engineering tuition support with instant paperless sanction.'
  },
  {
    id: 'bits_pilani',
    name: 'BITS Pilani (Pilani, Goa, Hyderabad & WILP)',
    shortName: 'BITS Pilani',
    city: 'Pilani, Hyderabad, Goa, Online',
    category: 'Higher Education',
    subventionType: 'partial_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 299 },
      10: { flatRatePercent: 2.5, processingFee: 299 },
      11: { flatRatePercent: 3.2, processingFee: 299 },
      12: { flatRatePercent: 3.8, processingFee: 299 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Subsidized Partner Rate (0% for 3 & 6M)',
    isPartner: true,
    featured: true,
    tierNote: 'Higher education and Work Integrated Learning Programs (WILP) tuition installments.'
  },

  // 4. FLAGSHIP CASE STUDY & HYDERABAD CLUSTER SCHOOLS
  {
    id: 'solitaire_global',
    name: 'Solitaire Global School (Attapur & Hyderabad Campuses)',
    shortName: 'Solitaire Global School',
    city: 'Attapur, Hyderabad, Telangana',
    category: 'K-12',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 1.5, processingFee: 0 },
      10: { flatRatePercent: 2.0, processingFee: 0 },
      11: { flatRatePercent: 2.8, processingFee: 0 },
      12: { flatRatePercent: 0, processingFee: 0 }, // Full 12M 0% subsidy!
    },
    defaultProcessingFee: 0,
    subsidyBadge: '★ Top Performing Partner (100% Subsidized 0% EMI)',
    isPartner: true,
    featured: true,
    tierNote: 'Flagship international school partner with 89% conversion rate and 100% 0% fee subvention across 12 months.'
  },
  {
    id: 'phoenix_greens',
    name: 'Phoenix Greens International School',
    shortName: 'Phoenix Greens',
    city: 'Kokapet, Hyderabad, Telangana',
    category: 'K-12',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: 'Direct School Subvention (0% Interest)',
    isPartner: true,
    featured: false,
    tierNote: 'Complete digital fee onboarding for CBSE and Cambridge curriculum streams.'
  },

  // 5. OTHER PREMIER NATIONAL PARTNERS
  {
    id: 'podar',
    name: 'Podar International School',
    shortName: 'Podar International',
    city: 'Mumbai, Pune, Pan-India',
    category: 'K-12',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: '100% School Subsidized (0% Interest)',
    isPartner: true,
    featured: true,
    tierNote: 'Zero-cost 0% EMI with ₹0 processing charges through exclusive school tie-up.'
  },
  {
    id: 'dps',
    name: 'Delhi Public School (DPS)',
    shortName: 'DPS Society',
    city: 'Delhi NCR, Bengaluru, Hyderabad, Kolkata',
    category: 'K-12',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: '100% School Subsidized (0% Interest)',
    isPartner: true,
    featured: true,
    tierNote: 'Zero-cost 0% EMI with ₹0 processing charges through exclusive school tie-up.'
  },
  {
    id: 'nmims',
    name: "SVKM's NMIMS Deemed-to-be University",
    shortName: 'NMIMS University',
    city: 'Mumbai, Bengaluru, Hyderabad, Shirpur, Navi Mumbai',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 1.8, processingFee: 0 },
      10: { flatRatePercent: 2.2, processingFee: 0 },
      11: { flatRatePercent: 3.0, processingFee: 0 },
      12: { flatRatePercent: 0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: '100% University Subsidized (0% Interest)',
    isPartner: true,
    featured: true,
    tierNote: 'Zero-interest tuition payment plans enabled for undergraduate and postgraduate programs.'
  },
  {
    id: 'vibgyor',
    name: 'VIBGYOR High School',
    shortName: 'VIBGYOR High',
    city: 'Mumbai, Pune, Bengaluru, Vadodara, Surat',
    category: 'K-12',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: '100% School Subsidized (0% Interest)',
    isPartner: true,
    featured: true,
    tierNote: 'Zero-cost 0% EMI with ₹0 processing charges through exclusive school tie-up.'
  },
  {
    id: 'ryan',
    name: 'Ryan International Group of Institutions',
    shortName: 'Ryan International',
    city: 'Mumbai, Delhi NCR, Pan-India',
    category: 'K-12',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: '100% School Subsidized (0% Interest)',
    isPartner: true,
    featured: true,
    tierNote: 'Zero-cost 0% EMI with ₹0 processing charges through exclusive school tie-up.'
  },
  {
    id: 'orchids',
    name: 'Orchids The International School',
    shortName: 'Orchids International',
    city: 'Bengaluru, Mumbai, Pune, Kolkata, Hyderabad',
    category: 'K-12',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: '100% School Subsidized (0% Interest)',
    isPartner: true,
    featured: true,
    tierNote: 'Zero-cost 0% EMI with ₹0 processing charges through exclusive school tie-up.'
  },
  {
    id: 'eurokids',
    name: 'EuroKids International Preschool',
    shortName: 'EuroKids',
    city: 'Pan-India',
    category: 'Preschool',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.0, processingFee: 0 },
      10: { flatRatePercent: 2.5, processingFee: 0 },
      11: { flatRatePercent: 3.5, processingFee: 0 },
      12: { flatRatePercent: 0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: '100% Subsidized (0% Interest)',
    isPartner: true,
    featured: true,
    tierNote: 'Flexible 0% monthly payment options for early childhood education and daycare.'
  },
  {
    id: 'manipal',
    name: 'Manipal Academy of Higher Education (MAHE)',
    shortName: 'Manipal University',
    city: 'Manipal, Mangalore, Bengaluru, Jaipur',
    category: 'Higher Education',
    subventionType: 'full_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 1.8, processingFee: 0 },
      10: { flatRatePercent: 2.2, processingFee: 0 },
      11: { flatRatePercent: 3.0, processingFee: 0 },
      12: { flatRatePercent: 0, processingFee: 0 },
    },
    defaultProcessingFee: 0,
    subsidyBadge: '100% University Subsidized (0% Interest)',
    isPartner: true,
    featured: true,
    tierNote: 'Zero-cost monthly fee financing for professional and technical courses.'
  },
  {
    id: 'allen',
    name: 'Allen Career Institute (JEE / NEET Prep)',
    shortName: 'Allen Kota',
    city: 'Kota, Mumbai, Delhi, Bengaluru, Hyderabad',
    category: 'Coaching / Test Prep',
    subventionType: 'partial_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.2, processingFee: 299 },
      10: { flatRatePercent: 2.8, processingFee: 299 },
      11: { flatRatePercent: 3.5, processingFee: 299 },
      12: { flatRatePercent: 4.2, processingFee: 299 },
    },
    defaultProcessingFee: 299,
    subsidyBadge: 'Coaching Subsidized (0% for 3 & 6M)',
    isPartner: true,
    featured: false,
    tierNote: 'Discounted monthly fee financing for 1-year and 2-year classroom courses.'
  },
  {
    id: 'aakash',
    name: 'Aakash Educational Services (AESL / BYJU\'S)',
    shortName: 'Aakash Institute',
    city: 'Pan-India',
    category: 'Coaching / Test Prep',
    subventionType: 'partial_subvention',
    tenureRates: {
      3: { flatRatePercent: 0, processingFee: 0 },
      6: { flatRatePercent: 0, processingFee: 0 },
      9: { flatRatePercent: 2.2, processingFee: 299 },
      10: { flatRatePercent: 2.8, processingFee: 299 },
      11: { flatRatePercent: 3.5, processingFee: 299 },
      12: { flatRatePercent: 4.2, processingFee: 299 },
    },
    defaultProcessingFee: 299,
    subsidyBadge: 'Coaching Subsidized (0% for 3 & 6M)',
    isPartner: true,
    featured: false,
    tierNote: 'Medical and engineering competitive exam coaching fee financing.'
  },
  {
    id: 'other_unlisted',
    name: 'Other Unlisted School / College / Coaching',
    shortName: 'Unlisted Institution',
    city: 'Any city in India',
    category: 'Other',
    subventionType: 'standard',
    tenureRates: {
      3: { flatRatePercent: 0.5, processingFee: 499 },
      6: { flatRatePercent: 1.5, processingFee: 499 },
      9: { flatRatePercent: 3.5, processingFee: 799 },
      10: { flatRatePercent: 4.0, processingFee: 799 },
      11: { flatRatePercent: 4.8, processingFee: 799 },
      12: { flatRatePercent: 5.5, processingFee: 799 },
    },
    defaultProcessingFee: 799,
    subsidyBadge: 'Open Education Financing (Low Rate)',
    isPartner: false,
    featured: false,
    tierNote: 'Direct parent financing for institutions not yet in our direct 0% subsidy network. Far lower than 24% credit card rates!'
  }
];

export function getInstitutionById(id: string): Institution | undefined {
  return INSTITUTIONS.find(inst => inst.id === id);
}

export function getInstitutionByName(name: string): Institution | undefined {
  if (!name) return undefined;
  const lower = name.toLowerCase().trim();
  return INSTITUTIONS.find(inst => 
    inst.name.toLowerCase().includes(lower) || 
    (inst.shortName && inst.shortName.toLowerCase().includes(lower)) ||
    lower.includes(inst.name.toLowerCase())
  );
}

export function calculateFeePlan(
  principal: number,
  tenureMonths: number,
  institution: Institution
) {
  // Retrieve tenure rate from the institution or fallback
  const tenureConfig = institution.tenureRates[tenureMonths] || {
    flatRatePercent: tenureMonths <= 6 ? 0 : (tenureMonths === 9 ? 2.0 : (tenureMonths === 11 ? 3.5 : 4.0)),
    processingFee: institution.defaultProcessingFee || 0
  };

  const flatRatePercent = tenureConfig.flatRatePercent;
  const isZeroPercent = flatRatePercent === 0;
  
  // Flat total interest = principal * (flatRatePercent / 100)
  const totalInterest = Math.round(principal * (flatRatePercent / 100));
  const totalPayable = principal + totalInterest;
  const monthlyEMI = Math.round(totalPayable / tenureMonths);
  const processingFee = tenureConfig.processingFee;

  // Credit card comparison (average 18% p.a. reducing + 2% processing fee + GST)
  const creditCardInterest = Math.round(principal * (18 / 100) * (tenureMonths / 12));
  const creditCardProcessingFee = Math.round(principal * 0.02);
  const creditCardTotal = principal + creditCardInterest + creditCardProcessingFee;
  const savingsVsCreditCard = Math.max(0, creditCardTotal - (totalPayable + processingFee));

  return {
    principal,
    tenureMonths,
    monthlyEMI,
    totalInterest,
    flatRatePercent,
    totalPayable,
    processingFee,
    isZeroPercent,
    savingsVsCreditCard,
    subsidyBadge: institution.subsidyBadge,
    tierNote: institution.tierNote,
    coBrandedContact: institution.coBrandedContact
  };
}
