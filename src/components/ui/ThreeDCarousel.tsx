import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, type PanInfo, useMotionValue } from 'framer-motion';
import type { BlueprintProject } from '../../data/projects';
import styles from './ThreeDCarousel.module.css';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === 'undefined';
const ROTATION_DRAG_FACTOR = 0.28;
const VELOCITY_FACTOR = 0.05;

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = useCallback(
    (currentQuery: string): boolean => {
      if (IS_SERVER) {
        return defaultValue;
      }

      return window.matchMedia(currentQuery).matches;
    },
    [defaultValue],
  );

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }

    return defaultValue;
  });

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    const handleChange = () => {
      setMatches(getMatches(query));
    };

    handleChange();
    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [getMatches, query]);

  return matches;
}

type RotationDirection = 1 | -1;

interface ThreeDCarouselProps {
  projects: BlueprintProject[];
}

interface CarouselRingProps {
  projects: BlueprintProject[];
  isActive: boolean;
  onCycle: (direction: RotationDirection) => void;
  onSelect: (project: BlueprintProject) => void;
}

function wrapIndex(value: number, length: number) {
  return ((value % length) + length) % length;
}

function getBatch(projects: BlueprintProject[], start: number, size: number) {
  return Array.from({ length: size }, (_, index) => projects[wrapIndex(start + index, projects.length)]);
}

function getFaceSummary(summary: string) {
  const collapsed = summary.replace(/\s+/g, ' ').trim();
  return collapsed.length > 88 ? `${collapsed.slice(0, 85).trimEnd()}…` : collapsed;
}

const CarouselRing = memo(function CarouselRing({ projects, isActive, onCycle, onSelect }: CarouselRingProps) {
  const isScreenSizeSm = useMediaQuery('(max-width: 640px)');
  const isScreenSizeMd = useMediaQuery('(max-width: 980px)');
  const cylinderWidth = isScreenSizeSm ? 1040 : isScreenSizeMd ? 1480 : 1980;
  const faceCount = projects.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);
  const rotation = useMotionValue(0);
  const lastCycleThresholdRef = useRef(0);

  useEffect(() => {
    const unsubscribe = rotation.on('change', (value) => {
      while (value - lastCycleThresholdRef.current >= 360) {
        lastCycleThresholdRef.current += 360;
        onCycle(1);
      }

      while (value - lastCycleThresholdRef.current <= -360) {
        lastCycleThresholdRef.current -= 360;
        onCycle(-1);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [onCycle, rotation]);

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isActive) {
      return;
    }

    rotation.set(rotation.get() + info.delta.x * ROTATION_DRAG_FACTOR);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isActive) {
      return;
    }

    const nextRotation = rotation.get() + info.velocity.x * VELOCITY_FACTOR;
    rotation.stop();
    rotation.set(nextRotation);
  };

  return (
    <div className={styles.viewport}>
      <div className={styles.scene}>
        <motion.div
          drag={isActive ? 'x' : false}
          className={`${styles.ring} ${!isActive ? styles.ringInactive : ''}`}
          style={{
            width: cylinderWidth,
            rotateY: rotation,
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {projects.map((project, index) => (
            <motion.button
              key={`${project.id}-${index}`}
              type="button"
              className={styles.face}
              style={{
                width: `${faceWidth}px`,
                transform: `translate(-50%, -50%) rotateY(${index * (360 / faceCount)}deg) translateZ(${radius}px)`,
              }}
              onClick={() => onSelect(project)}
            >
              <article className={styles.faceCard}>
                <div className={styles.faceImageWrap}>
                  <img src={project.imageUrl} alt={project.name} className={styles.faceImage} />
                </div>
                <div className={styles.faceCopy}>
                  <p className={styles.faceCreator}>{project.creator}</p>
                  <h3 className={styles.faceTitle}>{project.name}</h3>
                  <p className={styles.faceSummary}>{getFaceSummary(project.summary)}</p>
                </div>
              </article>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
});

function ThreeDCarousel({ projects }: ThreeDCarouselProps) {
  const isScreenSizeSm = useMediaQuery('(max-width: 640px)');
  const isScreenSizeMd = useMediaQuery('(max-width: 980px)');
  const batchSize = isScreenSizeSm ? 4 : isScreenSizeMd ? 5 : 6;
  const [activeProject, setActiveProject] = useState<BlueprintProject | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const [batchStart, setBatchStart] = useState(0);

  const visibleProjects = useMemo(
    () => getBatch(projects, batchStart, Math.min(batchSize, projects.length)),
    [batchSize, batchStart, projects],
  );

  useEffect(() => {
    setBatchStart((currentStart) => wrapIndex(currentStart, projects.length));
  }, [projects.length]);

  const handleCycle = useCallback(
    (direction: RotationDirection) => {
      setBatchStart((currentStart) => wrapIndex(currentStart + direction * batchSize, projects.length));
    },
    [batchSize, projects.length],
  );

  const handleSelect = useCallback((project: BlueprintProject) => {
    setActiveProject(project);
    setIsCarouselActive(false);
  }, []);

  const handleClose = useCallback(() => {
    setActiveProject(null);
    setIsCarouselActive(true);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <p className={styles.toolbarLabel}>Drag to rotate // click a build for detail</p>
        <p className={styles.toolbarLabel}>Looping through Blueprint projects locally</p>
      </div>

      <CarouselRing
        projects={visibleProjects}
        isActive={isCarouselActive}
        onCycle={handleCycle}
        onSelect={handleSelect}
      />

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className={styles.overlayPanel}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.overlayMedia}>
                <img src={activeProject.imageUrl} alt={activeProject.name} className={styles.overlayImage} />
              </div>

              <div className={styles.overlayCopy}>
                <p className={styles.overlayCreator}>Creator // {activeProject.creator}</p>
                <h3 className={styles.overlayTitle}>{activeProject.name}</h3>
                <p className={styles.overlaySummary}>{activeProject.summary}</p>

                <div className={styles.overlayActions}>
                  <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.action}>
                    View GitHub
                  </a>
                  <a
                    href={activeProject.blueprintUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionSecondary}
                  >
                    Open Blueprint Page
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default ThreeDCarousel;
