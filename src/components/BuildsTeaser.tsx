import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { blueprintProjects } from '../data/projects';
import SectionLabel from './ui/SectionLabel';
import styles from './BuildsTeaser.module.css';

const previewProjects = blueprintProjects.slice(0, 2);

function BuildsTeaser() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const expandedProject = useMemo(
    () => previewProjects.find((project) => project.id === expandedId) ?? null,
    [expandedId],
  );

  useEffect(() => {
    if (!expandedProject) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExpandedId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedProject]);

  const handleToggle = (projectId: string) => {
    setExpandedId((currentId) => (currentId === projectId ? null : projectId));
  };

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
            <div className={styles.previewRail}>
              {previewProjects.map((project) => {
                const isExpanded = project.id === expandedId;

                return (
                  <button
                    key={project.id}
                    type="button"
                    className={`${styles.previewCard} ${isExpanded ? styles.previewCardActive : ''}`}
                    onClick={() => handleToggle(project.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`build-teaser-detail-${project.id}`}
                  >
                    <img src={project.imageUrl} alt={project.name} className={styles.previewImage} />
                    <div className={styles.previewCopy}>
                      <p className={styles.previewCreator}>{project.creator}</p>
                      <p className={styles.previewTitle}>{project.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence initial={false}>
              {expandedProject ? (
                <motion.article
                  key={expandedProject.id}
                  id={`build-teaser-detail-${expandedProject.id}`}
                  className={styles.detailPanel}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <div className={styles.detailInner}>
                    <div className={styles.detailMedia}>
                      <img
                        src={expandedProject.imageUrl}
                        alt={expandedProject.name}
                        className={styles.detailImage}
                      />
                    </div>

                    <div className={styles.detailCopy}>
                      <p className={styles.detailCreator}>Creator // {expandedProject.creator}</p>
                      <h3 className={styles.detailTitle}>{expandedProject.name}</h3>
                      <p className={styles.detailSummary}>{expandedProject.summary}</p>

                      <div className={styles.detailActions}>
                        <a
                          href={expandedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.detailAction}
                        >
                          View GitHub
                        </a>
                        <a
                          href={expandedProject.blueprintUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.detailActionSecondary}
                        >
                          Open Blueprint Page
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ) : null}
            </AnimatePresence>
          </div>
        </article>
      </div>
    </section>
  );
}

export default BuildsTeaser;
