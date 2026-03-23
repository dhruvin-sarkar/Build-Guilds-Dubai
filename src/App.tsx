import './App.css';
import About from './components/About';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Organizers from './components/Organizers';
import Schedule from './components/Schedule';
import Card from './components/ui/Card';
import SectionLabel from './components/ui/SectionLabel';

interface SectionStub {
  id: 'faq' | 'rsvp';
  label: string;
  title: string;
  body: string;
}

const sectionStubs: SectionStub[] = [
  {
    id: 'faq',
    label: 'phase 8 queued',
    title: 'FAQ section placeholder',
    body: 'The FAQ accordion will replace this stub once the next content phase is ready.',
  },
  {
    id: 'rsvp',
    label: 'phase 9 queued',
    title: 'Final CTA reserved',
    body: 'The bottom signup push and footer will attach here after the core content sections are complete.',
  },
];

function App() {
  return (
    <>
      <Nav />
      <main id="top" className="appMain" aria-label="Build Guild Dubai">
        <Hero />
        <About />
        <Schedule />
        <Organizers />
        <div className="appMain__container">
          {sectionStubs.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className={`sectionStub ${index % 2 === 1 ? 'sectionStub--alt' : ''}`}
            >
              <div className="sectionStub__inner">
                <SectionLabel label={section.label} />
                <Card>
                  <h2 className="sectionStub__title">{section.title}</h2>
                  <p className="sectionStub__body">{section.body}</p>
                </Card>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
