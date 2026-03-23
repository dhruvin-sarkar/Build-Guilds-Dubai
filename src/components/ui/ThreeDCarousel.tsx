import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import type { BlueprintProject } from '../../data/projects';
import styles from './ThreeDCarousel.module.css';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

interface ThreeDCarouselProps {
  projects: BlueprintProject[];
}

interface PointerState {
  pointerId: number | null;
  lastX: number;
  lastTime: number;
  velocity: number;
  distance: number;
}

const IS_SERVER = typeof window === 'undefined';
const ROTATION_DRAG_FACTOR = 0.32;
const RELEASE_ROTATION_FACTOR = 120;
const MAX_RELEASE_ROTATION = 48;

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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeRotation(value: number, span: number) {
  let nextValue = value;

  while (nextValue >= span) {
    nextValue -= span;
  }

  while (nextValue < -span) {
    nextValue += span;
  }

  return nextValue;
}

function getFaceSummary(summary: string) {
  const collapsed = summary.replace(/\s+/g, ' ').trim();
  return collapsed.length > 116 ? `${collapsed.slice(0, 113).trimEnd()}…` : collapsed;
}

function ThreeDCarousel({ projects }: ThreeDCarouselProps) {
  const isScreenSizeSm = useMediaQuery('(max-width: 640px)');
  const isScreenSizeMd = useMediaQuery('(max-width: 980px)');
  const rotation = useMotionValue(0);
  const [activeProject, setActiveProject] = useState<BlueprintProject | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const pointerStateRef = useRef<PointerState>({
    pointerId: null,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    distance: 0,
  });

  const duplicatedProjects = useMemo(() => [...projects, ...projects], [projects]);
  const faceCount = duplicatedProjects.length;
  const faceWidth = isScreenSizeSm ? 190 : isScreenSizeMd ? 228 : 264;
  const faceHeight = isScreenSizeSm ? 318 : isScreenSizeMd ? 362 : 410;
  const circumference = faceWidth * Math.max(faceCount, 1);
  const radius = circumference / (2 * Math.PI);
  const stepAngle = faceCount > 0 ? 360 / faceCount : 0;
  const seamlessSpan = faceCount > 0 ? stepAngle * projects.length : 180;

  const carouselVars = useMemo(
    () =>
      ({
        '--carousel-face-width': `${faceWidth}px`,
        '--carousel-face-height': `${faceHeight}px`,
      }) as CSSProperties,
    [faceHeight, faceWidth],
  );

  const setWrappedRotation = useCallback(
    (nextValue: number) => {
      rotation.set(normalizeRotation(nextValue, seamlessSpan));
    },
    [rotation, seamlessSpan],
  );

  useEffect(() => {
    setWrappedRotation(0);
    pointerStateRef.current = {
      pointerId: null,
      lastX: 0,
      lastTime: 0,
      velocity: 0,
      distance: 0,
    };
    setIsDragging(false);
  }, [projects.length, setWrappedRotation]);

  useEffect(() => {
    if (!activeProject) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
        setIsCarouselActive(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isCarouselActive || faceCount === 0) {
      return;
    }

    pointerStateRef.current = {
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      distance: 0,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointerState = pointerStateRef.current;

    if (!isCarouselActive || pointerState.pointerId !== event.pointerId) {
      return;
    }

    const now = performance.now();
    const deltaX = event.clientX - pointerState.lastX;
    const deltaTime = Math.max(now - pointerState.lastTime, 1);

    pointerStateRef.current = {
      pointerId: pointerState.pointerId,
      lastX: event.clientX,
      lastTime: now,
      velocity: deltaX / deltaTime,
      distance: pointerState.distance + Math.abs(deltaX),
    };

    setWrappedRotation(rotation.get() + deltaX * ROTATION_DRAG_FACTOR);
  };

  const finishPointerDrag = useCallback(
    (pointerId: number | null) => {
      const pointerState = pointerStateRef.current;

      if (pointerState.pointerId !== pointerId) {
        return;
      }

      const releaseRotation = clamp(
        pointerState.velocity * RELEASE_ROTATION_FACTOR,
        -MAX_RELEASE_ROTATION,
        MAX_RELEASE_ROTATION,
      );

      setWrappedRotation(rotation.get() + releaseRotation);
      pointerStateRef.current = {
        pointerId: null,
        lastX: 0,
        lastTime: 0,
        velocity: 0,
        distance: pointerState.distance,
      };
      setIsDragging(false);
    },
    [rotation, setWrappedRotation],
  );

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    finishPointerDrag(event.pointerId);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    finishPointerDrag(event.pointerId);
  };

  const handleSelect = useCallback((project: BlueprintProject) => {
    if (pointerStateRef.current.distance > 8) {
      return;
    }

    setActiveProject(project);
    setIsCarouselActive(false);
  }, []);

  const handleClose = useCallback(() => {
    setActiveProject(null);
    setIsCarouselActive(true);
  }, []);

  return (
    <div className={styles.root} style={carouselVars}>
      <div className={styles.toolbar}>
        <p className={styles.toolbarLabel}>Drag to rotate // click a build for detail</p>
        <p className={styles.toolbarLabel}>Looping through Blueprint projects locally</p>
      </div>

      <div
        className={styles.viewport}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div className={`${styles.scene} ${isDragging ? styles.sceneDragging : ''}`}>
          <motion.div
            className={`${styles.ring} ${!isCarouselActive ? styles.ringInactive : ''}`}
            style={{
              width: `${circumference}px`,
              rotateY: rotation,
            }}
          >
            {duplicatedProjects.map((project, index) => (
              <button
                key={`${project.id}-${index}`}
                type="button"
                className={styles.face}
                style={{
                  transform: `translate(-50%, -50%) rotateY(${index * stepAngle}deg) translateZ(${radius}px)`,
                }}
                onClick={() => handleSelect(project)}
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
              </button>
            ))}
          </motion.div>
        </div>
      </div>

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
