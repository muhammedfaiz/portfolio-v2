export type ExperienceEntry = {
  role: string;
  org: string;
  date: string;
  points: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack Developer",
    org: "Troopod, India (Remote)",
    date: "Dec 2024 — Present",
    points: [
      "Built and maintained production MERN apps across 20+ client platforms",
      "Cut page load time by 30% via frontend/backend optimization",
      "Integrated Razorpay and PayPal into production checkout flows",
    ],
  },
  {
    role: "Freelance Developer",
    org: "Independent",
    date: "2023 — Present",
    points: [
      "Pipagro — custom Shopify store, optimized checkout flow",
      "Liflic — corporate WordPress site, hardened asset security",
    ],
  },
  {
    role: "Advanced MERN Certification",
    org: "Brototype, Ernakulam",
    date: "2023 — 2024",
    points: ["Project-based certification in full MERN + deployment practices"],
  },
  {
    role: "BCA, Computer Applications",
    org: "MES Kalladi College, Calicut",
    date: "2020 — 2023",
    points: ["CGPA 7.5 / 10"],
  },
];
