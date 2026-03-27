import { AnimatePresence, motion } from 'framer-motion';
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
import { createPortal } from 'react-dom';
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

interface LoopProject {
  loopKey: string;
  project: BlueprintProject;
}

const IS_SERVER = typeof window === 'undefined';
const LOOP_MULTIPLIER = 3;
const DRAG_ROTATION_FACTOR = 0.18;
const RELEASE_ROTATION_FACTOR = 4.5;
const MAX_RELEASE_ROTATION = 16;
const ROTATION_TRANSITION_MS = 320;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function modulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

function normalizeRotationToMiddleSet(rotation: number, stepAngle: number, realProjectCount: number) {
  if (stepAngle === 0 || realProjectCount === 0) {
    return rotation;
  }

  const projectProgress = modulo(-rotation / stepAngle, realProjectCount);
  return -(projectProgress + realProjectCount) * stepAngle;
}

function normalizeProjectSummary(summary: string) {
  return summary.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function getFaceSummary(summary: string) {
  const collapsed = normalizeProjectSummary(summary).replace(/\s+/g, ' ').trim();
  return collapsed.length > 144 ? `${collapsed.slice(0, 141).trimEnd()}…` : collapsed;
}

function getSummaryParagraphs(summary: string) {
  return normalizeProjectSummary(summary)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = useCallback(
    (currentQuery: string) => {
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

function ThreeDCarousel({ projects }: ThreeDCarouselProps) {
  const isScreenSizeSm = useMediaQuery('(max-width: 640px)');
  const isScreenSizeMd = useMediaQuery('(max-width: 980px)');
  const [activeProject, setActiveProject] = useState<BlueprintProject | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const resetTimerRef = useRef<number | null>(null);
  const pointerStateRef = useRef<PointerState>({
    pointerId: null,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    distance: 0,
  });

  const loopProjects = useMemo<LoopProject[]>(
    () =>
      Array.from({ length: LOOP_MULTIPLIER }, (_, copyIndex) =>
        projects.map((project) => ({
          loopKey: `${project.id}-${copyIndex}`,
          project,
        })),
      ).flat(),
    [projects],
  );

  const realProjectCount = projects.length;
  const faceCount = loopProjects.length;
  const faceWidth = isScreenSizeSm ? 280 : isScreenSizeMd ? 300 : 320;
  const faceHeight = isScreenSizeSm ? 380 : isScreenSizeMd ? 408 : 436;
  const radius = isScreenSizeSm ? 320 : isScreenSizeMd ? 460 : 600;
  const ringDepth = radius;
  const stepAngle = faceCount > 0 ? 360 / faceCount : 0;
  const startingRotation = -(realProjectCount * stepAngle);
  const scenePerspective = isScreenSizeSm ? 1180 : isScreenSizeMd ? 1460 : 1820;
  const carouselVars = useMemo(
    () =>
      ({
        '--carousel-face-width': `${faceWidth}px`,
        '--carousel-face-height': `${faceHeight}px`,
        '--carousel-radius': `${radius}px`,
        '--carousel-perspective': `${scenePerspective}px`,
      }) as CSSProperties,
    [faceHeight, faceWidth, radius, scenePerspective],
  );

  const activeSummaryParagraphs = useMemo(
    () => (activeProject ? getSummaryParagraphs(activeProject.summary) : []),
    [activeProject],
  );

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const queueSilentReset = useCallback(
    (targetRotation: number) => {
      clearResetTimer();

      const normalizedRotation = normalizeRotationToMiddleSet(targetRotation, stepAngle, realProjectCount);

      if (Math.abs(normalizedRotation - targetRotation) < 0.0001) {
        return;
      }

      resetTimerRef.current = window.setTimeout(() => {
        setIsTransitionEnabled(false);
        setRotation(normalizedRotation);

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setIsTransitionEnabled(true);
          });
        });

        resetTimerRef.current = null;
      }, ROTATION_TRANSITION_MS);
    },
    [clearResetTimer, realProjectCount, stepAngle],
  );

  useEffect(() => {
    setIsTransitionEnabled(false);
    setRotation(startingRotation);
    setIsDragging(false);
    pointerStateRef.current = {
      pointerId: null,
      lastX: 0,
      lastTime: 0,
      velocity: 0,
      distance: 0,
    };

    const frameId = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [startingRotation]);

  useEffect(() => {
    return () => {
      clearResetTimer();
    };
  }, [clearResetTimer]);

  useEffect(() => {
    if (!activeProject) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
        setIsCarouselActive(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a, button')) {
      return;
    }

    if (!isCarouselActive || faceCount === 0 || event.button === 2) {
      return;
    }

    clearResetTimer();
    pointerStateRef.current = {
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      distance: 0,
    };

    setIsTransitionEnabled(false);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointerState = pointerStateRef.current;

    if (!isCarouselActive || pointerState.pointerId !== event.pointerId || stepAngle === 0) {
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

    setRotation((currentRotation) => currentRotation + deltaX * DRAG_ROTATION_FACTOR);
  };

  const finishPointerDrag = useCallback(
    (pointerId: number | null) => {
      const pointerState = pointerStateRef.current;

      if (pointerState.pointerId !== pointerId || stepAngle === 0) {
        return;
      }

      const releaseRotation = clamp(
        pointerState.velocity * RELEASE_ROTATION_FACTOR,
        -MAX_RELEASE_ROTATION,
        MAX_RELEASE_ROTATION,
      );

      const targetRotation = rotation + releaseRotation;

      setIsDragging(false);
      setIsTransitionEnabled(true);
      setRotation(targetRotation);
      queueSilentReset(targetRotation);

      pointerStateRef.current = {
        pointerId: null,
        lastX: 0,
        lastTime: 0,
        velocity: 0,
        distance: pointerState.distance,
      };
    },
    [queueSilentReset, rotation, stepAngle],
  );

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    finishPointerDrag(event.pointerId);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    finishPointerDrag(event.pointerId);
  };

  const handleSelect = useCallback((project: BlueprintProject) => {
    if (pointerStateRef.current.distance > 12) {
      return;
    }

    setActiveProject(project);
    setIsCarouselActive(false);
  }, []);

  const handleClose = useCallback(() => {
    setActiveProject(null);
    setIsCarouselActive(true);
  }, []);

  if (!projects.length) {
    return null;
  }

  return (
    <div className={styles.root} style={carouselVars}>
      <div className={styles.toolbar}>
        <p className={styles.toolbarLabel}>Drag left or right // click a build for detail</p>
        <p className={styles.toolbarLabel}>Radius recalibrated // cycling the local archive continuously</p>
      </div>

      <div
        className={styles.viewport}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div className={`${styles.scene} ${isDragging ? styles.sceneDragging : ''}`}>
          <div
            className={`${styles.ring} ${isCarouselActive ? '' : styles.ringInactive}`}
            style={{
              transform: `translateZ(-${ringDepth}px) rotateY(${rotation}deg)`,
              transitionDuration: isTransitionEnabled ? `${ROTATION_TRANSITION_MS}ms` : '0ms',
            }}
          >
            {loopProjects.map(({ loopKey, project }, index) => (
              <div
                key={loopKey}
                className={styles.face}
                style={{
                  transform: `rotateY(${index * stepAngle}deg) translateZ(${radius}px)`,
                }}
              >
                <button type="button" className={styles.faceButton} onClick={() => handleSelect(project)}>
                  <article className={styles.faceCard}>
                    <div className={styles.faceImageWrap}>
                      <img src={project.imageUrl} alt={project.name} className={styles.faceImage} />
                    </div>

                    <div className={styles.faceCopy}>
                      <p className={styles.faceCreator}>Creator // {project.creator}</p>
                      <h3 className={styles.faceTitle}>{project.name}</h3>
                      <p className={styles.faceSummary}>{getFaceSummary(project.summary)}</p>

                      <div className={styles.faceFooter}>
                        <span className={styles.faceLink}>View build details</span>
                      </div>
                    </div>
                  </article>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeProject &&
          createPortal(
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              <motion.div
                className={styles.overlayPanel}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className={styles.overlayMedia}>
                  <img src={activeProject.imageUrl} alt={activeProject.name} className={styles.overlayImage} />
                </div>

                <div className={styles.overlayCopy}>
                  <div className={styles.overlayHeader}>
                    <div className={styles.overlayHeading}>
                      <p className={styles.overlayCreator}>Creator // {activeProject.creator}</p>
                      <h3 className={styles.overlayTitle}>{activeProject.name}</h3>
                    </div>

                    <button
                      type="button"
                      className={styles.closeButton}
                      onClick={handleClose}
                      aria-label="Close project detail"
                    >
                      Close
                    </button>
                  </div>

                  <div className={styles.overlayBody}>
                    {activeSummaryParagraphs.map((paragraph, index) => (
                      <p key={`${activeProject.id}-paragraph-${index}`} className={styles.overlayParagraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className={styles.overlayActions}>
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionLink}
                    >
                      View GitHub
                    </a>
                    <a
                      href={activeProject.blueprintUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionLink}
                    >
                      Open Blueprint Page
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>,
            document.body,
          )}
      </AnimatePresence>
    </div>
  );
}

export default ThreeDCarousel;
