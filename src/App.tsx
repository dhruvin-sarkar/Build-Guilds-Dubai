import './App.css';
import About from './components/About';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import GridOverlay from './components/GridOverlay';
import Hero from './components/Hero';
import Merch from './components/Merch';
import Nav from './components/Nav';
import Organizers from './components/Organizers';
import Schedule from './components/Schedule';
import SignupModal from './components/SignupModal';
import { SignupModalProvider } from './context/SignupModal';

function App() {
  return (
    <SignupModalProvider>
      <div className="appShell">
        <GridOverlay />
        <div className="appContent">
          <Nav />
          <main id="top" className="appMain" aria-label="Build Guild Dubai">
            <Hero />
            <About />
            <Schedule />
            <Organizers />
            <Merch />
            <FAQ />
            <CTA />
          </main>
          <Footer />
        </div>
        <SignupModal />
      </div>
    </SignupModalProvider>
  );
}

export default App;
