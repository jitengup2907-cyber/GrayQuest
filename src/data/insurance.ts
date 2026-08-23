export interface InsuranceRateRow {
  age: number;
  lakh15: {
    male: { provider: 'TATA AIA' | 'Kotak Life'; premium: number };
    female: { provider: 'TATA AIA' | 'Kotak Life'; premium: number };
  };
  lakh30: {
    male: { provider: 'TATA AIA' | 'Kotak Life'; premium: number };
    female: { provider: 'TATA AIA' | 'Kotak Life'; premium: number };
  };
  lakh50: {
    male: { provider: 'TATA AIA' | 'Kotak Life'; premium: number };
    female: { provider: 'TATA AIA' | 'Kotak Life'; premium: number };
  };
}

// Exact empirical rates from the GrayQuest Official Insurance Partner Master Sheet (Tata AIA & Kotak Life)
export const INSURANCE_RATES: InsuranceRateRow[] = [
  { age: 18, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 332 }, female: { provider: 'Kotak Life', premium: 332 } }, lakh50: { male: { provider: 'Kotak Life', premium: 553 }, female: { provider: 'Kotak Life', premium: 553 } } },
  { age: 19, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 340 }, female: { provider: 'Kotak Life', premium: 332 } }, lakh50: { male: { provider: 'Kotak Life', premium: 567 }, female: { provider: 'Kotak Life', premium: 553 } } },
  { age: 20, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 347 }, female: { provider: 'Kotak Life', premium: 332 } }, lakh50: { male: { provider: 'Kotak Life', premium: 578 }, female: { provider: 'Kotak Life', premium: 553 } } },
  { age: 21, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 352 }, female: { provider: 'Kotak Life', premium: 332 } }, lakh50: { male: { provider: 'Kotak Life', premium: 587 }, female: { provider: 'Kotak Life', premium: 553 } } },
  { age: 22, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 356 }, female: { provider: 'Kotak Life', premium: 340 } }, lakh50: { male: { provider: 'Kotak Life', premium: 593 }, female: { provider: 'Kotak Life', premium: 567 } } },
  { age: 23, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 359 }, female: { provider: 'Kotak Life', premium: 347 } }, lakh50: { male: { provider: 'Kotak Life', premium: 598 }, female: { provider: 'Kotak Life', premium: 578 } } },
  { age: 24, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 361 }, female: { provider: 'Kotak Life', premium: 352 } }, lakh50: { male: { provider: 'Kotak Life', premium: 602 }, female: { provider: 'Kotak Life', premium: 587 } } },
  { age: 25, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 363 }, female: { provider: 'Kotak Life', premium: 356 } }, lakh50: { male: { provider: 'Kotak Life', premium: 605 }, female: { provider: 'Kotak Life', premium: 593 } } },
  { age: 26, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 365 }, female: { provider: 'Kotak Life', premium: 359 } }, lakh50: { male: { provider: 'Kotak Life', premium: 608 }, female: { provider: 'Kotak Life', premium: 598 } } },
  { age: 27, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 367 }, female: { provider: 'Kotak Life', premium: 361 } }, lakh50: { male: { provider: 'Kotak Life', premium: 612 }, female: { provider: 'Kotak Life', premium: 602 } } },
  { age: 28, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 370 }, female: { provider: 'Kotak Life', premium: 363 } }, lakh50: { male: { provider: 'Kotak Life', premium: 616 }, female: { provider: 'Kotak Life', premium: 605 } } },
  { age: 29, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 374 }, female: { provider: 'Kotak Life', premium: 365 } }, lakh50: { male: { provider: 'Kotak Life', premium: 623 }, female: { provider: 'Kotak Life', premium: 608 } } },
  { age: 30, lakh15: { male: { provider: 'TATA AIA', premium: 185 }, female: { provider: 'TATA AIA', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 379 }, female: { provider: 'Kotak Life', premium: 367 } }, lakh50: { male: { provider: 'Kotak Life', premium: 631 }, female: { provider: 'Kotak Life', premium: 612 } } },
  { age: 31, lakh15: { male: { provider: 'TATA AIA', premium: 209 }, female: { provider: 'Kotak Life', premium: 185 } }, lakh30: { male: { provider: 'Kotak Life', premium: 385 }, female: { provider: 'Kotak Life', premium: 370 } }, lakh50: { male: { provider: 'Kotak Life', premium: 641 }, female: { provider: 'Kotak Life', premium: 616 } } },
  { age: 32, lakh15: { male: { provider: 'TATA AIA', premium: 209 }, female: { provider: 'Kotak Life', premium: 187 } }, lakh30: { male: { provider: 'Kotak Life', premium: 392 }, female: { provider: 'Kotak Life', premium: 374 } }, lakh50: { male: { provider: 'Kotak Life', premium: 653 }, female: { provider: 'Kotak Life', premium: 623 } } },
  { age: 33, lakh15: { male: { provider: 'TATA AIA', premium: 209 }, female: { provider: 'TATA AIA', premium: 209 } }, lakh30: { male: { provider: 'Kotak Life', premium: 402 }, female: { provider: 'Kotak Life', premium: 379 } }, lakh50: { male: { provider: 'Kotak Life', premium: 669 }, female: { provider: 'Kotak Life', premium: 631 } } },
  { age: 34, lakh15: { male: { provider: 'TATA AIA', premium: 209 }, female: { provider: 'TATA AIA', premium: 209 } }, lakh30: { male: { provider: 'Kotak Life', premium: 413 }, female: { provider: 'Kotak Life', premium: 385 } }, lakh50: { male: { provider: 'Kotak Life', premium: 688 }, female: { provider: 'Kotak Life', premium: 641 } } },
  { age: 35, lakh15: { male: { provider: 'TATA AIA', premium: 209 }, female: { provider: 'TATA AIA', premium: 209 } }, lakh30: { male: { provider: 'Kotak Life', premium: 426 }, female: { provider: 'Kotak Life', premium: 392 } }, lakh50: { male: { provider: 'Kotak Life', premium: 710 }, female: { provider: 'Kotak Life', premium: 653 } } },
  { age: 36, lakh15: { male: { provider: 'Kotak Life', premium: 221 }, female: { provider: 'Kotak Life', premium: 201 } }, lakh30: { male: { provider: 'Kotak Life', premium: 442 }, female: { provider: 'Kotak Life', premium: 402 } }, lakh50: { male: { provider: 'Kotak Life', premium: 736 }, female: { provider: 'Kotak Life', premium: 669 } } },
  { age: 37, lakh15: { male: { provider: 'Kotak Life', premium: 230 }, female: { provider: 'Kotak Life', premium: 207 } }, lakh30: { male: { provider: 'Kotak Life', premium: 460 }, female: { provider: 'Kotak Life', premium: 413 } }, lakh50: { male: { provider: 'Kotak Life', premium: 766 }, female: { provider: 'Kotak Life', premium: 688 } } },
  { age: 38, lakh15: { male: { provider: 'Kotak Life', premium: 241 }, female: { provider: 'Kotak Life', premium: 213 } }, lakh30: { male: { provider: 'Kotak Life', premium: 481 }, female: { provider: 'Kotak Life', premium: 426 } }, lakh50: { male: { provider: 'Kotak Life', premium: 801 }, female: { provider: 'Kotak Life', premium: 710 } } },
  { age: 39, lakh15: { male: { provider: 'TATA AIA', premium: 270 }, female: { provider: 'Kotak Life', premium: 221 } }, lakh30: { male: { provider: 'Kotak Life', premium: 505 }, female: { provider: 'Kotak Life', premium: 442 } }, lakh50: { male: { provider: 'Kotak Life', premium: 841 }, female: { provider: 'Kotak Life', premium: 736 } } },
  { age: 40, lakh15: { male: { provider: 'TATA AIA', premium: 270 }, female: { provider: 'Kotak Life', premium: 230 } }, lakh30: { male: { provider: 'Kotak Life', premium: 532 }, female: { provider: 'Kotak Life', premium: 460 } }, lakh50: { male: { provider: 'Kotak Life', premium: 887 }, female: { provider: 'Kotak Life', premium: 766 } } },
  { age: 41, lakh15: { male: { provider: 'Kotak Life', premium: 282 }, female: { provider: 'Kotak Life', premium: 241 } }, lakh30: { male: { provider: 'Kotak Life', premium: 564 }, female: { provider: 'Kotak Life', premium: 481 } }, lakh50: { male: { provider: 'Kotak Life', premium: 940 }, female: { provider: 'Kotak Life', premium: 801 } } },
  { age: 42, lakh15: { male: { provider: 'Kotak Life', premium: 301 }, female: { provider: 'Kotak Life', premium: 253 } }, lakh30: { male: { provider: 'Kotak Life', premium: 601 }, female: { provider: 'Kotak Life', premium: 505 } }, lakh50: { male: { provider: 'Kotak Life', premium: 1002 }, female: { provider: 'Kotak Life', premium: 841 } } },
  { age: 43, lakh15: { male: { provider: 'Kotak Life', premium: 322 }, female: { provider: 'Kotak Life', premium: 266 } }, lakh30: { male: { provider: 'Kotak Life', premium: 644 }, female: { provider: 'Kotak Life', premium: 532 } }, lakh50: { male: { provider: 'Kotak Life', premium: 1073 }, female: { provider: 'Kotak Life', premium: 887 } } },
  { age: 44, lakh15: { male: { provider: 'TATA AIA', premium: 381 }, female: { provider: 'Kotak Life', premium: 282 } }, lakh30: { male: { provider: 'Kotak Life', premium: 694 }, female: { provider: 'Kotak Life', premium: 564 } }, lakh50: { male: { provider: 'Kotak Life', premium: 1156 }, female: { provider: 'Kotak Life', premium: 940 } } },
  { age: 45, lakh15: { male: { provider: 'TATA AIA', premium: 381 }, female: { provider: 'Kotak Life', premium: 301 } }, lakh30: { male: { provider: 'Kotak Life', premium: 751 }, female: { provider: 'Kotak Life', premium: 601 } }, lakh50: { male: { provider: 'Kotak Life', premium: 1251 }, female: { provider: 'Kotak Life', premium: 1002 } } },
  { age: 46, lakh15: { male: { provider: 'Kotak Life', premium: 409 }, female: { provider: 'Kotak Life', premium: 322 } }, lakh30: { male: { provider: 'Kotak Life', premium: 817 }, female: { provider: 'Kotak Life', premium: 644 } }, lakh50: { male: { provider: 'Kotak Life', premium: 1361 }, female: { provider: 'Kotak Life', premium: 1073 } } },
  { age: 47, lakh15: { male: { provider: 'Kotak Life', premium: 446 }, female: { provider: 'Kotak Life', premium: 347 } }, lakh30: { male: { provider: 'Kotak Life', premium: 891 }, female: { provider: 'Kotak Life', premium: 694 } }, lakh50: { male: { provider: 'Kotak Life', premium: 1485 }, female: { provider: 'Kotak Life', premium: 1156 } } },
  { age: 48, lakh15: { male: { provider: 'Kotak Life', premium: 487 }, female: { provider: 'Kotak Life', premium: 376 } }, lakh30: { male: { provider: 'Kotak Life', premium: 974 }, female: { provider: 'Kotak Life', premium: 751 } }, lakh50: { male: { provider: 'Kotak Life', premium: 1624 }, female: { provider: 'Kotak Life', premium: 1251 } } },
  { age: 49, lakh15: { male: { provider: 'Kotak Life', premium: 533 }, female: { provider: 'Kotak Life', premium: 409 } }, lakh30: { male: { provider: 'Kotak Life', premium: 1065 }, female: { provider: 'Kotak Life', premium: 817 } }, lakh50: { male: { provider: 'Kotak Life', premium: 1775 }, female: { provider: 'Kotak Life', premium: 1361 } } },
  { age: 50, lakh15: { male: { provider: 'Kotak Life', premium: 608 }, female: { provider: 'Kotak Life', premium: 446 } }, lakh30: { male: { provider: 'Kotak Life', premium: 1164 }, female: { provider: 'Kotak Life', premium: 891 } }, lakh50: { male: { provider: 'Kotak Life', premium: 1940 }, female: { provider: 'Kotak Life', premium: 1485 } } },
  { age: 51, lakh15: { male: { provider: 'Kotak Life', premium: 635 }, female: { provider: 'Kotak Life', premium: 487 } }, lakh30: { male: { provider: 'Kotak Life', premium: 1269 }, female: { provider: 'Kotak Life', premium: 974 } }, lakh50: { male: { provider: 'Kotak Life', premium: 2114 }, female: { provider: 'Kotak Life', premium: 1624 } } },
  { age: 52, lakh15: { male: { provider: 'Kotak Life', premium: 690 }, female: { provider: 'Kotak Life', premium: 533 } }, lakh30: { male: { provider: 'Kotak Life', premium: 1379 }, female: { provider: 'Kotak Life', premium: 1065 } }, lakh50: { male: { provider: 'Kotak Life', premium: 2297 }, female: { provider: 'Kotak Life', premium: 1775 } } },
  { age: 53, lakh15: { male: { provider: 'Kotak Life', premium: 747 }, female: { provider: 'Kotak Life', premium: 582 } }, lakh30: { male: { provider: 'Kotak Life', premium: 1493 }, female: { provider: 'Kotak Life', premium: 1164 } }, lakh50: { male: { provider: 'Kotak Life', premium: 2487 }, female: { provider: 'Kotak Life', premium: 1940 } } },
  { age: 54, lakh15: { male: { provider: 'Kotak Life', premium: 805 }, female: { provider: 'Kotak Life', premium: 635 } }, lakh30: { male: { provider: 'Kotak Life', premium: 1610 }, female: { provider: 'Kotak Life', premium: 1269 } }, lakh50: { male: { provider: 'Kotak Life', premium: 2684 }, female: { provider: 'Kotak Life', premium: 2114 } } },
  { age: 55, lakh15: { male: { provider: 'Kotak Life', premium: 867 }, female: { provider: 'Kotak Life', premium: 690 } }, lakh30: { male: { provider: 'Kotak Life', premium: 1733 }, female: { provider: 'Kotak Life', premium: 1379 } }, lakh50: { male: { provider: 'Kotak Life', premium: 2887 }, female: { provider: 'Kotak Life', premium: 2297 } } },
  { age: 56, lakh15: { male: { provider: 'Kotak Life', premium: 930 }, female: { provider: 'Kotak Life', premium: 747 } }, lakh30: { male: { provider: 'Kotak Life', premium: 1859 }, female: { provider: 'Kotak Life', premium: 1493 } }, lakh50: { male: { provider: 'Kotak Life', premium: 3099 }, female: { provider: 'Kotak Life', premium: 2487 } } },
  { age: 57, lakh15: { male: { provider: 'Kotak Life', premium: 996 }, female: { provider: 'Kotak Life', premium: 805 } }, lakh30: { male: { provider: 'Kotak Life', premium: 1992 }, female: { provider: 'Kotak Life', premium: 1610 } }, lakh50: { male: { provider: 'Kotak Life', premium: 3320 }, female: { provider: 'Kotak Life', premium: 2684 } } },
  { age: 58, lakh15: { male: { provider: 'Kotak Life', premium: 1067 }, female: { provider: 'Kotak Life', premium: 867 } }, lakh30: { male: { provider: 'Kotak Life', premium: 2133 }, female: { provider: 'Kotak Life', premium: 1733 } }, lakh50: { male: { provider: 'Kotak Life', premium: 3554 }, female: { provider: 'Kotak Life', premium: 2887 } } },
  { age: 59, lakh15: { male: { provider: 'Kotak Life', premium: 1142 }, female: { provider: 'Kotak Life', premium: 930 } }, lakh30: { male: { provider: 'Kotak Life', premium: 2283 }, female: { provider: 'Kotak Life', premium: 1859 } }, lakh50: { male: { provider: 'Kotak Life', premium: 3805 }, female: { provider: 'Kotak Life', premium: 3099 } } },
  { age: 60, lakh15: { male: { provider: 'Kotak Life', premium: 1223 }, female: { provider: 'Kotak Life', premium: 996 } }, lakh30: { male: { provider: 'Kotak Life', premium: 2446 }, female: { provider: 'Kotak Life', premium: 1992 } }, lakh50: { male: { provider: 'Kotak Life', premium: 4077 }, female: { provider: 'Kotak Life', premium: 3320 } } },
];

export function getInsuranceQuote(
  age: number,
  gender: 'male' | 'female',
  sumAssuredLakhs: 15 | 30 | 50
) {
  // Clamp age between 18 and 60
  const clampedAge = Math.min(60, Math.max(18, Math.round(age)));
  const row = INSURANCE_RATES.find(r => r.age === clampedAge) || INSURANCE_RATES[12]; // default ~30

  let cell: { provider: 'TATA AIA' | 'Kotak Life'; premium: number };

  if (sumAssuredLakhs === 15) {
    cell = row.lakh15[gender];
  } else if (sumAssuredLakhs === 30) {
    cell = row.lakh30[gender];
  } else {
    cell = row.lakh50[gender];
  }

  const monthlyPremium = cell.premium;
  const annualPremium = monthlyPremium * 12;

  return {
    age: clampedAge,
    gender,
    sumAssuredLakhs,
    sumAssuredINR: sumAssuredLakhs * 100000,
    provider: cell.provider,
    monthlyPremium,
    annualPremium,
    dailyCost: (monthlyPremium / 30).toFixed(1),
    features: [
      `100% Student Education Continuity Cover up to ₹${sumAssuredLakhs} Lakhs`,
      `Direct fee reimbursement to partner school / college upon claim`,
      `Zero medical test required up to 45 years of age`,
      `Backed by official insurance partner: ${cell.provider}`
    ]
  };
}
