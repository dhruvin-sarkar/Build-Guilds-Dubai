import './App.css';
import CircuitSVG from './components/ui/CircuitSVG';
import Countdown from './components/ui/Countdown';
import Card from './components/ui/Card';
import SectionLabel from './components/ui/SectionLabel';
import { EVENT_DATE } from './data/constants';

function App() {
  return (
    <main className="preview" aria-label="Build Guild Dubai Phase 2 primitives preview">
      <div className="preview__container">
        <header className="preview__header">
          <SectionLabel label="phase 2 primitives" />
          <h1 className="preview__title">UI primitives // hardware-first foundation</h1>
          <p className="preview__lede">
            Section label, card shell, countdown, and the hero circuit all built in isolation before the main
            sections get assembled.
          </p>
        </header>

        <section className="preview__layout">
          <div className="preview__stack">
            <Card>
              <SectionLabel label="annotation system" />
              <h2 className="preview__cardTitle">SectionLabel.tsx</h2>
              <p className="preview__cardText">
                Schematic-style annotation with an inline signal rail and terminal framing.
              </p>
            </Card>

            <Card highlight>
              <SectionLabel label="surface primitive" />
              <h2 className="preview__cardTitle">Card.tsx</h2>
              <p className="preview__cardText">
                Sharp Blueprint-compliant container with left trace accent, hover glow, and zero rounded corners.
              </p>
            </Card>
          </div>

          <Card highlight className="preview__circuitCard">
            <SectionLabel label="circuit animation" />
            <CircuitSVG animate />
          </Card>
        </section>

        <Card className="preview__countdownCard">
          <SectionLabel label="countdown" />
          <div className="preview__countdownWrap">
            <Countdown targetDate={EVENT_DATE} />
          </div>
        </Card>
      </div>
    </main>
  );
}

export default App;
