import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { blueprintProjects } from '../data/projects';
import SectionLabel from './ui/SectionLabel';
import styles from './BuildsTeaser.module.css';

function BuildsTeaser() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeIndex = ((currentIndex % blueprintProjects.length) + blueprintProjects.length) % blueprintProjects.length;

  const currentProject = useMemo(() => blueprintProjects[safeIndex], [safeIndex]);

  const handlePrevious = () => {
    setCurrentIndex((index) => (index - 1 + blueprintProjects.length) % blueprintProjects.length);
  };

  const handleNext = () => {
    setCurrentIndex((index) => (index + 1) % blueprintProjects.length);
  };

  if (!currentProject) {
    return null;
  }

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

          <div className={styles.previewArea}>
            <div className={styles.carouselFrame}>
              <button
                type="button"
                className={styles.arrowButton}
                onClick={handlePrevious}
                aria-label="Show previous project"
              >
                &larr;
              </button>

              <article className={styles.detailPanel}>
                <div className={styles.detailInner}>
                  <div className={styles.detailMedia}>
                    <img src={currentProject.imageUrl} alt={currentProject.name} className={styles.detailImage} />
                  </div>

                  <div className={styles.detailCopy}>
                    <p className={styles.detailCreator}>Creator // {currentProject.creator}</p>
                    <h3 className={styles.detailTitle}>{currentProject.name}</h3>
                    <p className={styles.detailSummary}>{currentProject.summary}</p>

                    <div className={styles.detailActions}>
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.detailAction}
                      >
                        View GitHub
                      </a>
                      <a
                        href={currentProject.blueprintUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.detailActionSecondary}
                      >
                        Open Blueprint Page
                      </a>
                    </div>
                  </div>
                </div>
              </article>

              <button
                type="button"
                className={styles.arrowButton}
                onClick={handleNext}
                aria-label="Show next project"
              >
                &rarr;
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default BuildsTeaser;
