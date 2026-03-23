import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { generatedProjects as blueprintProjects } from '../data/projects.generated';
import SectionLabel from './ui/SectionLabel';
import styles from './BuildsTeaser.module.css';

const swipeThreshold = 88;
const carouselVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? '8%' : '-8%',
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? '-8%' : '8%',
  }),
};

function BuildsTeaser() {
  const [carouselState, setCarouselState] = useState({ index: 0, direction: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const projectCount = blueprintProjects.length;
  const shouldReduceMotion = useReducedMotion();

  const safeIndex = ((carouselState.index % projectCount) + projectCount) % projectCount;
  const currentProject = useMemo(() => blueprintProjects[safeIndex], [safeIndex]);

  const paginate = useCallback(
    (direction: number) => {
      setCarouselState((state) => ({
        index: (state.index + direction + projectCount) % projectCount,
        direction,
      }));
    },
    [projectCount],
  );

  useEffect(() => {
    if (shouldReduceMotion || isPaused || isDragging || projectCount < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      paginate(1);
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isDragging, isPaused, paginate, projectCount, shouldReduceMotion]);

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
              <div
                className={styles.carouselViewport}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocusCapture={() => setIsPaused(true)}
                onBlurCapture={(event) => {
                  const nextFocusedElement = event.relatedTarget as Node | null;

                  if (!nextFocusedElement || !event.currentTarget.contains(nextFocusedElement)) {
                    setIsPaused(false);
                  }
                }}
              >
                <AnimatePresence initial={false} custom={carouselState.direction} mode="wait">
                  <motion.article
                    key={currentProject.id}
                    className={`${styles.detailPanel} ${styles.carouselSlide}`}
                    custom={carouselState.direction}
                    variants={carouselVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.42,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.14}
                    dragMomentum={false}
                    onDragStart={() => {
                      setIsDragging(true);
                      setIsPaused(true);
                    }}
                    onDragEnd={(_, info) => {
                      setIsDragging(false);
                      setIsPaused(false);

                      if (info.offset.x <= -swipeThreshold || info.velocity.x < -420) {
                        paginate(1);
                        return;
                      }

                      if (info.offset.x >= swipeThreshold || info.velocity.x > 420) {
                        paginate(-1);
                      }
                    }}
                  >
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
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default BuildsTeaser;
