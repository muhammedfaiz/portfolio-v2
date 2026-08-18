export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  scene: "laptop" | "phone" | "browser" | "cube";
};

export const projects: Project[] = [
  {
    id: "kicks",
    index: "01",
    title: "KICKS",
    subtitle: "E-COMMERCE PLATFORM",
    description:
      "A complete men's footwear e-commerce platform with product management, offers, coupons, sales reporting, administration and Razorpay payment integration.",
    tech: ["Node.js", "Express", "MongoDB", "EJS", "Razorpay"],
    liveUrl: "https://kicks-1u5a.onrender.com/",
    scene: "laptop",
  },
  {
    id: "speed-service",
    index: "02",
    title: "SPEED SERVICE",
    subtitle: "REAL-TIME SERVICE PLATFORM",
    description:
      "A home-service booking platform connecting customers, employees and administrators with real-time communication and location functionality.",
    tech: ["React", "Node.js", "MongoDB", "Socket.IO"],
    liveUrl: "https://speed-service-tan.vercel.app/",
    scene: "phone",
  },
  {
    id: "shopify-experiences",
    index: "03",
    title: "SHOPIFY EXPERIENCES",
    subtitle: "E-COMMERCE / STOREFRONT",
    description:
      "Custom Shopify storefronts designed and developed for modern consumer brands.",
    tech: ["Shopify", "Liquid", "JavaScript", "CSS", "APIs"],
    scene: "browser",
  },
  {
    id: "secure-supply",
    index: "04",
    title: "SECURE SUPPLY",
    subtitle: "SECURITY PLATFORM",
    description:
      "A developer-focused platform for analyzing software dependencies and identifying vulnerabilities.",
    tech: ["React", "Node.js", "REST APIs", "GitHub integration"],
    scene: "cube",
  },
];
