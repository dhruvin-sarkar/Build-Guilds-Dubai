import './App.css';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Card from './components/ui/Card';
import SectionLabel from './components/ui/SectionLabel';

interface SectionStub {
  id: 'about' | 'schedule' | 'organizers' | 'faq' | 'rsvp';
  label: string;
  title: string;
  body: string;
}

const sectionStubs: SectionStub[] = [
  {
    id: 'about',
    label: 'phase 5 queued',
    title: 'About section lands next',
    body: 'The overview section is reserved here so navigation stays wired while the real Build Guild story gets implemented in the next phase.',
  },
  {
    id: 'schedule',
    label: 'phase 6 queued',
    title: 'Schedule anchor is live',
    body: 'Hero and nav can already target the schedule section. The actual timeline build comes in the following phase.',
  },
  {
    id: 'organizers',
    label: 'phase 7 queued',
    title: 'Organizers section placeholder',
    body: 'This anchor remains in place for the organizer cards so the fixed nav keeps working as the page fills out.',
  },
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
        <div className="appMain__container">
          {sectionStubs.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className={`sectionStub ${index % 2 === 1 ? 'sectionStub--alt' : ''}`}
            >
              <div className="sectionStub__inner">
                <SectionLabel label={section.label} />
                <Card highlight={section.id === 'schedule'}>
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
