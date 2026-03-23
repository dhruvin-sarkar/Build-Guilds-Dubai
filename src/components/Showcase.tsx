import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useMemo, useRef, useState, type TouchEvent, type WheelEvent } from 'react';
import { blueprintProjects } from '../data/projects';
import SectionLabel from './ui/SectionLabel';
import styles from './Showcase.module.css';

const cardVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 48 : -48,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -48 : 48,
  }),
};

function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const wheelLockRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });
  const cylinderRotation = useTransform(scrollYProgress, [0, 1], [-110, 110]);

  const activeProject = blueprintProjects[activeIndex];
  const activeCounter = `${String(activeIndex + 1).padStart(2, '0')} / ${String(blueprintProjects.length).padStart(2, '0')}`;

  const galleryCards = useMemo(
    () =>
      blueprintProjects.map((project, index) => {
        const angle = index * (360 / blueprintProjects.length);
        const transform = useMotionTemplate`translate(-50%, -50%) rotateY(calc(${cylinderRotation}deg + ${angle}deg)) translateZ(28rem)`;

        return {
          ...project,
          transform,
        };
      }),
    [cylinderRotation],
  );

  const setProjectIndex = (nextIndex: number) => {
    const wrappedIndex = (nextIndex + blueprintProjects.length) % blueprintProjects.length;
    setActiveIndex(wrappedIndex);
  };

  const goToNext = () => {
    setDirection(1);
    setProjectIndex(activeIndex + 1);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setProjectIndex(activeIndex - 1);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const horizontalDelta = Math.abs(event.deltaX) > 12 ? event.deltaX : event.shiftKey ? event.deltaY : 0;

    if (!horizontalDelta || Math.abs(horizontalDelta) < 16) {
      return;
    }

    const now = performance.now();

    if (now - wheelLockRef.current < 450) {
      return;
    }

    wheelLockRef.current = now;
    event.preventDefault();
    horizontalDelta > 0 ? goToNext() : goToPrevious();
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const firstTouch = event.touches[0];
    touchStartRef.current = {
      x: firstTouch.clientX,
      y: firstTouch.clientY,
    };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    touchStartRef.current = null;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    deltaX < 0 ? goToNext() : goToPrevious();
  };

  return (
    <section ref={galleryRef} id="showcase" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionLabel label="look what we've built" />
          <div className={styles.headerCopy}>
            <h2 className={styles.title}>Real Blueprint submissions. Real boards. Real shipped hardware.</h2>
            <p className={styles.lead}>
              This is the level of work teens are already routing, soldering, printing, and flashing through
              Blueprint. Build Guild Dubai is about getting more people into that loop.
            </p>
          </div>
        </div>

        <div
          className={styles.carousel}
          tabIndex={0}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              goToNext();
            }

            if (event.key === 'ArrowLeft') {
              goToPrevious();
            }
          }}
        >
          <div className={styles.carouselHeader}>
            <p className={styles.carouselLabel}>Popular Blueprint hardware</p>
            <div className={styles.carouselControls}>
              <span className={styles.counter}>{activeCounter}</span>
              <button type="button" className={styles.control} onClick={goToPrevious} aria-label="Previous project">
                Prev
              </button>
              <button type="button" className={styles.control} onClick={goToNext} aria-label="Next project">
                Next
              </button>
            </div>
          </div>

          <div className={styles.carouselViewport}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.article
                key={activeProject.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.34, ease: 'easeOut' }}
                className={styles.carouselCard}
              >
                <div className={styles.mediaPane}>
                  <img src={activeProject.imageUrl} alt={activeProject.name} className={styles.mediaImage} />
                </div>

                <div className={styles.contentPane}>
                  <p className={styles.projectMeta}>Creator // {activeProject.creator}</p>
                  <h3 className={styles.projectTitle}>{activeProject.name}</h3>
                  <p className={styles.projectSummary}>{activeProject.summary}</p>

                  <dl className={styles.metrics}>
                    <div className={styles.metric}>
                      <dt>Views</dt>
                      <dd>{activeProject.views.toLocaleString()}</dd>
                    </div>
                    <div className={styles.metric}>
                      <dt>Followers</dt>
                      <dd>{activeProject.followers}</dd>
                    </div>
                  </dl>

                  <div className={styles.actions}>
                    <a
                      href={activeProject.githubUrl}
                      className={styles.primaryAction}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View GitHub
                    </a>
                    <a
                      href={activeProject.blueprintUrl}
                      className={styles.secondaryAction}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open Blueprint Page
                    </a>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.galleryHeader}>
          <p className={styles.galleryEyebrow}>Scroll-driven gallery</p>
          <p className={styles.galleryLead}>
            Think of this like a rotating parts reel: projects moving through view as the page scrolls, each one a
            reminder that the hardware bar is already high.
          </p>
        </div>

        <div className={styles.galleryDesktop} aria-hidden="true">
          <div className={styles.galleryPerspective}>
            <div className={styles.galleryStage}>
              {galleryCards.map((project) => (
                <motion.article key={project.id} className={styles.galleryCard} style={{ transform: project.transform }}>
                  <img src={project.imageUrl} alt={project.name} className={styles.galleryImage} />
                  <div className={styles.galleryCopy}>
                    <p className={styles.galleryCreator}>{project.creator}</p>
                    <h3 className={styles.galleryTitle}>{project.name}</h3>
                    <p className={styles.gallerySummary}>{project.summary}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.galleryMobile}>
          {blueprintProjects.map((project) => (
            <article key={project.id} className={styles.mobileCard}>
              <img src={project.imageUrl} alt={project.name} className={styles.mobileImage} />
              <div className={styles.mobileCopy}>
                <p className={styles.galleryCreator}>{project.creator}</p>
                <h3 className={styles.galleryTitle}>{project.name}</h3>
                <p className={styles.mobileSummary}>{project.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Showcase;
