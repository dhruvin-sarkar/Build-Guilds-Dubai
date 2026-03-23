import About from '../components/About';
import BuildsTeaser from '../components/BuildsTeaser';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';
import Hero from '../components/Hero';
import Merch from '../components/Merch';
import Organizers from '../components/Organizers';
import Schedule from '../components/Schedule';

function HomePage() {
  return (
    <main id="top" className="appMain" aria-label="Build Guild Dubai">
      <Hero />
      <About />
      <BuildsTeaser />
      <Schedule />
      <Organizers />
      <Merch />
      <FAQ />
      <CTA />
    </main>
  );
}

export default HomePage;
