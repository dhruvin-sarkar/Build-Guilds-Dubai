import { blueprintProjects } from '../data/projects';
import ThreeDCarousel from './ui/ThreeDCarousel';
import SectionLabel from './ui/SectionLabel';
import styles from './Showcase.module.css';

function Showcase() {
  return (
    <section id="showcase" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionLabel label="build archive" />
          <div className={styles.headerCopy}>
            <p className={styles.kicker}>Blueprint projects worth studying before Dubai</p>
            <h2 className={styles.title}>Real boards. Real enclosures. Real projects people our age already ship.</h2>
            <p className={styles.lead}>
              This page is the proof wall: keyboards, dev boards, e-ink wearables, rockets, and dense little PCBs that
              started as sketches and turned into hardware. Drag the carousel, rotate through the ring, and it keeps
              looping through the local snapshot of Blueprint work.
            </p>
          </div>
        </div>

        <ThreeDCarousel projects={blueprintProjects} />
      </div>
    </section>
  );
}

export default Showcase;
