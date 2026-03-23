import { Link } from 'react-router-dom';
import { blueprintProjects } from '../data/projects';
import SectionLabel from './ui/SectionLabel';
import styles from './BuildsTeaser.module.css';

const previewProjects = blueprintProjects.slice(0, 3);

function BuildsTeaser() {
  return (
    <section className={styles.section} aria-labelledby="builds-teaser-title">
      <div className={styles.inner}>
        <article className={styles.panel}>
          <div className={styles.copy}>
            <SectionLabel label="build archive" />
            <p className={styles.kicker}>Blueprint projects worth studying before Dubai</p>
            <h2 id="builds-teaser-title" className={styles.title}>
              See what we&apos;ve built.
            </h2>
            <p className={styles.body}>
              We moved the full Blueprint project archive onto its own page so the main site stays fast and focused.
              When you&apos;re ready to browse real boards, shipped keyboards, dev boards, and dense PCB work, head to
              the dedicated builds view.
            </p>
            <Link to="/builds" className={styles.link}>
              See What We&apos;ve Built &rarr;
            </Link>
          </div>

          <div className={styles.previewRail} aria-hidden="true">
            {previewProjects.map((project) => (
              <article key={project.id} className={styles.previewCard}>
                <img src={project.imageUrl} alt="" className={styles.previewImage} />
                <div className={styles.previewCopy}>
                  <p className={styles.previewCreator}>{project.creator}</p>
                  <p className={styles.previewTitle}>{project.name}</p>
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default BuildsTeaser;
