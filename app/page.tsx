import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Work from "@/components/sections/Work";
import ClientMarquee from "@/components/sections/ClientMarquee";
import Experience from "@/components/sections/Experience";
import TechConstellation from "@/components/sections/TechConstellation";
import GithubStats from "@/components/sections/GithubStats";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Currently from "@/components/sections/Currently";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Intro />
      <Work />
      <ClientMarquee />
      <Experience />
      <TechConstellation />
      <GithubStats />
      <About />
      <Process />
      <Currently />
      <Contact />
    </main>
  );
}
