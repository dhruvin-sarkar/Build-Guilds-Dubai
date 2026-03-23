import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
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
const LOOP_MULTIPLIER = 3;
const ROTATION_DRAG_FACTOR = 0.18;
const RELEASE_ROTATION_FACTOR = 110;
const MAX_RELEASE_ROTATION = 34;
const ROTATION_TRANSITION_MS = 560;

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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeRotation(rotation: number, cycleSpan: number) {
  let nextRotation = rotation;

  while (nextRotation <= -cycleSpan * 2) {
    nextRotation += cycleSpan;
  }

  while (nextRotation > 0) {
    nextRotation -= cycleSpan;
  }

  return nextRotation;
}

function getFaceSummary(summary: string) {
  const collapsed = summary.replace(/\s+/g, ' ').trim();
  return collapsed.length > 120 ? `${collapsed.slice(0, 117).trimEnd()}…` : collapsed;
}

function ThreeDCarousel({ projects }: ThreeDCarouselProps) {
  const isScreenSizeSm = useMediaQuery('(max-width: 640px)');
  const isScreenSizeMd = useMediaQuery('(max-width: 980px)');
  const [activeProject, setActiveProject] = useState<BlueprintProject | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const pointerStateRef = useRef<PointerState>({
    pointerId: null,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    distance: 0,
  });

  const duplicatedProjects = useMemo(
    () => Array.from({ length: LOOP_MULTIPLIER }, () => projects).flat(),
    [projects],
  );

  const faceCount = duplicatedProjects.length;
  const realProjectCount = projects.length;
  const faceWidth = isScreenSizeSm ? 236 : isScreenSizeMd ? 304 : 388;
  const faceHeight = isScreenSizeSm ? 356 : isScreenSizeMd ? 432 : 548;
  const stepAngle = faceCount > 0 ? 360 / faceCount : 0;
  const cycleSpan = realProjectCount > 0 ? stepAngle * realProjectCount : 0;
  const startingRotation = cycleSpan > 0 ? -cycleSpan : 0;
  const radius =
    faceCount > 2 ? (faceWidth * 0.92) / (2 * Math.tan(Math.PI / faceCount)) : faceWidth * 0.5;
  const ringDepth = radius * 0.88;
  const scenePerspective = isScreenSizeSm ? 1350 : isScreenSizeMd ? 1800 : 2400;

  const carouselVars = useMemo(
    () =>
      ({
        '--carousel-face-width': `${faceWidth}px`,
        '--carousel-face-height': `${faceHeight}px`,
        '--carousel-radius': `${Math.round(radius)}px`,
        '--carousel-perspective': `${scenePerspective}px`,
      }) as CSSProperties,
    [faceHeight, faceWidth, radius, scenePerspective],
  );

  const queueSilentReset = useCallback(
    (targetRotation: number) => {
      const normalizedRotation = normalizeRotation(targetRotation, cycleSpan);

      if (normalizedRotation === targetRotation) {
        return;
      }

      window.setTimeout(() => {
        setIsTransitionEnabled(false);
        setRotation(normalizedRotation);

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setIsTransitionEnabled(true);
          });
        });
      }, ROTATION_TRANSITION_MS);
    },
    [cycleSpan],
  );

  useEffect(() => {
    setIsTransitionEnabled(false);
    setRotation(startingRotation);
    pointerStateRef.current = {
      pointerId: null,
      lastX: 0,
      lastTime: 0,
      velocity: 0,
      distance: 0,
    };
    setIsDragging(false);

    const frameId = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [startingRotation]);

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

    setIsTransitionEnabled(false);
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointerState = pointerStateRef.current;

    if (!isCarouselActive || pointerState.pointerId !== event.pointerId || cycleSpan === 0) {
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

    setRotation((currentRotation) => normalizeRotation(currentRotation + deltaX * ROTATION_DRAG_FACTOR, cycleSpan));
  };

  const finishPointerDrag = useCallback(
    (pointerId: number | null) => {
      const pointerState = pointerStateRef.current;

      if (pointerState.pointerId !== pointerId || cycleSpan === 0) {
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
    [cycleSpan, queueSilentReset, rotation],
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

  if (!projects.length) {
    return null;
  }

  return (
    <div className={styles.root} style={carouselVars}>
      <div className={styles.toolbar}>
        <p className={styles.toolbarLabel}>Drag left or right // click a build for detail</p>
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
          <div
            className={`${styles.ring} ${!isCarouselActive ? styles.ringInactive : ''}`}
            style={{
              transform: `translateZ(-${ringDepth}px) rotateY(${rotation}deg)`,
              transitionDuration: isTransitionEnabled ? `${ROTATION_TRANSITION_MS}ms` : '0ms',
            }}
          >
            {duplicatedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
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
                      <p className={styles.faceCreator}>{project.creator}</p>
                      <h3 className={styles.faceTitle}>{project.name}</h3>
                      <p className={styles.faceSummary}>{getFaceSummary(project.summary)}</p>
                    </div>
                  </article>
                </button>
              </div>
            ))}
          </div>
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
