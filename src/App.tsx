import './App.css';
import Nav from './components/Nav';
import Card from './components/ui/Card';
import SectionLabel from './components/ui/SectionLabel';

interface PreviewSection {
  id: 'about' | 'schedule' | 'organizers' | 'faq';
  label: string;
  title: string;
  body: string;
  callouts: string[];
}

const previewSections: PreviewSection[] = [
  {
    id: 'about',
    label: 'about anchor',
    title: 'Fixed header + smooth anchor targeting',
    body: 'The nav stays pinned, the backdrop stays dark and sharp, and section jumps use smooth scrolling without losing the PCB grid underneath.',
    callouts: ['Fixed at top with blur', 'Scroll state at 60px', 'Logo fallback stays readable'],
  },
  {
    id: 'schedule',
    label: 'schedule anchor',
    title: 'Desktop nav links stay compact and technical',
    body: 'Primary links stay on one line at desktop widths, with a sharp CTA at the far edge so the signup action remains visible immediately.',
    callouts: ['Uppercase JetBrains Mono', 'Anchor-based navigation only', 'CTA opens external signup'],
  },
  {
    id: 'organizers',
    label: 'organizers anchor',
    title: 'Mobile drawer slides in with the same dark aesthetic',
    body: 'At tablet and below, the nav collapses to a hamburger, opens a right-side drawer, and locks background scroll so the panel feels deliberate.',
    callouts: ['Hamburger at 768px', 'Slide-in drawer', 'Overlay click closes menu'],
  },
  {
    id: 'faq',
    label: 'faq anchor',
    title: 'Section targets leave room for the fixed bar',
    body: 'Each section uses scroll margin so the header never covers the first line of content when a nav jump completes.',
    callouts: ['ScrollIntoView behavior', 'No clipped headings', 'Ready for real sections next'],
  },
];

function App() {
  return (
    <>
      <Nav />
      <main id="top" className="navPreview" aria-label="Build Guild Dubai Phase 3 navigation preview">
        <div className="navPreview__container">
          <header className="navPreview__intro">
            <SectionLabel label="phase 3 navigation" />
            <h1 className="navPreview__title">Navigation online // fixed, sharp, responsive</h1>
            <p className="navPreview__lede">
              This preview exists only to validate the header behavior before we wire it into the real landing page
              sections.
            </p>
          </header>

          {previewSections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className={`navPreview__section ${index % 2 === 1 ? 'navPreview__section--alt' : ''}`}
            >
              <div className="navPreview__sectionInner">
                <SectionLabel label={section.label} />
                <div className="navPreview__sectionGrid">
                  <div className="navPreview__copy">
                    <h2 className="navPreview__sectionTitle">{section.title}</h2>
                    <p className="navPreview__sectionBody">{section.body}</p>
                  </div>

                  <div className="navPreview__callouts">
                    {section.callouts.map((callout, calloutIndex) => (
                      <Card key={`${section.id}-${calloutIndex}`} highlight={calloutIndex === 0}>
                        <p className="navPreview__calloutIndex">0{calloutIndex + 1}</p>
                        <p className="navPreview__calloutText">{callout}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
