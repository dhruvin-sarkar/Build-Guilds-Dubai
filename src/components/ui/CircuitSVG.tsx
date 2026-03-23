import { useEffect, useRef, useState } from 'react';
import styles from './CircuitSVG.module.css';

interface CircuitSVGProps {
  animate?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

const viewWidth = 760;
const viewHeight = 540;

function CircuitSVG({
  animate = true,
  width = viewWidth,
  height = viewHeight,
  className,
}: CircuitSVGProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!animate) {
      setIsVisible(false);
      return;
    }

    const observedNode = shellRef.current;

    if (!observedNode) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    observer.observe(observedNode);

    return () => {
      observer.disconnect();
    };
  }, [animate]);

  const classes = [styles.shell, isVisible ? styles.shellVisible : '', className].filter(Boolean).join(' ');

  return (
    <figure ref={shellRef} className={classes} style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}>
      <div className={styles.viewport} role="img" aria-label="Filtered rendered circuit board reference image">
        <img src="/pcb-reference.png" alt="" className={styles.boardImage} />
        <div className={styles.overlay} aria-hidden="true">
          <span className={`${styles.trace} ${styles.tracePrimary}`} />
          <span className={`${styles.trace} ${styles.traceSecondary}`} />
          <span className={`${styles.trace} ${styles.traceVertical}`} />
          <span className={`${styles.dot} ${styles.dotPrimary}`} />
          <span className={`${styles.dot} ${styles.dotSecondary}`} />
          <span className={styles.scanLine} />
          <span className={styles.badge}>Rendered board reference</span>
          <span className={styles.badgeSecondary}>Source: PcbDraw (MIT)</span>
        </div>
      </div>
    </figure>
  );
}

export default CircuitSVG;
