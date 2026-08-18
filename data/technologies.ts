export type Technology = {
  name: string;
  description: string;
};

// Small set for the Hero's orbiting tags (spec §7)
export const heroTechnologies: Technology[] = [
  { name: "React", description: "Component-driven interfaces" },
  { name: "Node.js", description: "Backend APIs · Server architecture" },
  { name: "Shopify", description: "Custom storefronts · Liquid" },
  { name: "MongoDB", description: "Flexible document data" },
  { name: "AWS", description: "Cloud infrastructure · Deployment" },
];

// Full set for the Technology Constellation (spec §18)
export const technologies: Technology[] = [
  { name: "React", description: "Component-driven interfaces · Hooks · State" },
  { name: "Next.js", description: "App Router · SSR · Edge-ready apps" },
  { name: "TypeScript", description: "Type-safe application code" },
  { name: "Node.js", description: "Backend APIs · Real-time systems · Server architecture" },
  { name: "Express", description: "REST APIs · Middleware · Auth" },
  { name: "MongoDB", description: "Flexible document data at scale" },
  { name: "PostgreSQL", description: "Relational data · Transactions" },
  { name: "Shopify", description: "Custom storefronts · Apps · Checkout" },
  { name: "Liquid", description: "Shopify templating · Theme development" },
  { name: "AWS", description: "EC2 · S3 · Cloud infrastructure" },
  { name: "Git", description: "Version control · CI workflows" },
];
