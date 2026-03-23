import './App.css';
import About from './components/About';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Organizers from './components/Organizers';
import Schedule from './components/Schedule';

function App() {
  return (
    <div className="appShell">
      <Nav />
      <main id="top" className="appMain" aria-label="Build Guild Dubai">
        <Hero />
        <About />
        <Schedule />
        <Organizers />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
