import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { generatedProjects as blueprintProjects } from '../data/projects.generated';
import styles from './BuildsTeaser.module.css';

const swipeThreshold = 88;
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 23 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: 'easeOut',
    },
  },
};

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
        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.article className={styles.copyCard} variants={itemVariants}>
            <h2 id="builds-teaser-title" className={styles.title}>
              SEE WHAT OTHERS HAVE BUILT.
            </h2>
            <p className={styles.body}>
              Here&apos;s some of the amazing hardware projects real Hack Clubbers have built. Maybe you&apos;ll be able
              to make stuff like this too after attending Build Guild Dubai!
            </p>
            <Link to="/builds" className={styles.link}>
              EXPLORE FULL GALLERY
            </Link>
          </motion.article>

          <motion.article className={styles.previewCard} variants={itemVariants}>
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
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

export default BuildsTeaser;
