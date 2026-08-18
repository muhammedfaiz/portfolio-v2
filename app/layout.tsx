import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/chrome/SmoothScrollProvider";
import CustomCursor from "@/components/chrome/CustomCursor";
import PageLoader from "@/components/chrome/PageLoader";
import GrainOverlay from "@/components/chrome/GrainOverlay";
import Navbar from "@/components/chrome/Navbar";
import { links } from "@/data/links";

// display: "optional" — the browser waits a very brief block period for the
// self-hosted font and just keeps the fallback if it isn't ready, instead of
// swapping fonts in after paint. That swap was reflowing text-width-dependent
// layout (GSAP ScrollTrigger pin start/end positions measured from element
// widths) after they'd already been calculated, desyncing pinned sections.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
  display: "optional",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "optional",
});

const siteUrl = "https://muhammedfaiz.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Muhammed Faiz — Full Stack Developer",
  description:
    "Portfolio of Muhammed Faiz, a Full Stack Developer specializing in MERN, Shopify, e-commerce and modern web experiences.",
  keywords: [
    "Muhammed Faiz",
    "Full Stack Developer",
    "MERN Developer",
    "Shopify Developer",
    "React Developer",
    "Next.js Developer",
  ],
  authors: [{ name: "Muhammed Faiz" }],
  creator: "Muhammed Faiz",
  openGraph: {
    title: "Muhammed Faiz — Full Stack Developer",
    description:
      "Portfolio of Muhammed Faiz, a Full Stack Developer specializing in MERN, Shopify, e-commerce and modern web experiences.",
    url: siteUrl,
    siteName: "Muhammed Faiz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Faiz — Full Stack Developer",
    description:
      "Portfolio of Muhammed Faiz, a Full Stack Developer specializing in MERN, Shopify, e-commerce and modern web experiences.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammed Faiz",
  jobTitle: "Full Stack Developer",
  url: siteUrl,
  email: `mailto:${links.email}`,
  sameAs: [links.github, links.linkedin],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Shopify",
    "AWS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only rounded-full border border-line bg-bg px-5 py-2.5 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:text-ink"
        >
          Skip to content
        </a>
        <PageLoader />
        <SmoothScrollProvider>
          <CustomCursor />
          <GrainOverlay />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
