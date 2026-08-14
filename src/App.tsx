import About from "./components/About";
import ClientMarquee from "./components/ClientMarquee";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import GithubStats from "./components/GithubStats";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Work from "./components/Work";

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Work />
      <ClientMarquee />
      <Experience />
      <GithubStats />
      <Contact />
    </>
  );
}

export default App;
