import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import styles from './CircuitSVG.module.css';

interface CircuitSVGProps {
  animate?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

interface Point {
  x: number;
  y: number;
}

interface CircuitTrace {
  id: string;
  d: string;
  durationMs: number;
  delayMs: number;
  travelDurationMs: number;
  start: Point;
  end: Point;
}

type TraceStyle = CSSProperties &
  Record<
    '--trace-length' | '--trace-delay' | '--trace-duration' | '--travel-delay' | '--travel-duration',
    string
  >;

const viewBoxWidth = 760;
const viewBoxHeight = 540;

const circuitTraces: CircuitTrace[] = [
  {
    id: 'trace-left-top',
    d: 'M 72 116 H 180 V 146 H 308',
    durationMs: 760,
    delayMs: 120,
    travelDurationMs: 3400,
    start: { x: 72, y: 116 },
    end: { x: 308, y: 146 },
  },
  {
    id: 'trace-left-branch',
    d: 'M 180 146 V 66 H 332',
    durationMs: 620,
    delayMs: 380,
    travelDurationMs: 3000,
    start: { x: 180, y: 146 },
    end: { x: 332, y: 66 },
  },
  {
    id: 'trace-left-middle',
    d: 'M 72 246 H 168 V 224 H 308',
    durationMs: 800,
    delayMs: 520,
    travelDurationMs: 3200,
    start: { x: 72, y: 246 },
    end: { x: 308, y: 224 },
  },
  {
    id: 'trace-bottom-left',
    d: 'M 120 452 H 256 V 392 H 380 V 340',
    durationMs: 920,
    delayMs: 660,
    travelDurationMs: 3600,
    start: { x: 120, y: 452 },
    end: { x: 380, y: 340 },
  },
  {
    id: 'trace-bottom-branch',
    d: 'M 256 392 V 476 H 356',
    durationMs: 580,
    delayMs: 900,
    travelDurationMs: 2800,
    start: { x: 256, y: 392 },
    end: { x: 356, y: 476 },
  },
  {
    id: 'trace-right-top',
    d: 'M 688 104 H 580 V 164 H 452',
    durationMs: 780,
    delayMs: 1040,
    travelDurationMs: 3300,
    start: { x: 688, y: 104 },
    end: { x: 452, y: 164 },
  },
  {
    id: 'trace-right-branch',
    d: 'M 580 164 V 112 H 520',
    durationMs: 520,
    delayMs: 1260,
    travelDurationMs: 2600,
    start: { x: 580, y: 164 },
    end: { x: 520, y: 112 },
  },
  {
    id: 'trace-right-middle',
    d: 'M 688 268 H 600 V 236 H 452',
    durationMs: 760,
    delayMs: 1420,
    travelDurationMs: 3200,
    start: { x: 688, y: 268 },
    end: { x: 452, y: 236 },
  },
  {
    id: 'trace-right-bottom',
    d: 'M 688 420 H 560 V 388 H 452',
    durationMs: 840,
    delayMs: 1600,
    travelDurationMs: 3400,
    start: { x: 688, y: 420 },
    end: { x: 452, y: 388 },
  },
];

const junctions: Point[] = [
  { x: 180, y: 146 },
  { x: 256, y: 392 },
  { x: 580, y: 164 },
];

const chipPins = [
  { x1: 308, y1: 146, x2: 286, y2: 146 },
  { x1: 308, y1: 224, x2: 286, y2: 224 },
  { x1: 380, y1: 340, x2: 380, y2: 362 },
  { x1: 452, y1: 164, x2: 474, y2: 164 },
  { x1: 452, y1: 236, x2: 474, y2: 236 },
  { x1: 452, y1: 388, x2: 474, y2: 388 },
];

const signalPads = Array.from(
  new Map(
    circuitTraces
      .flatMap((trace) => [trace.start, trace.end])
      .map((point) => [`${point.x}-${point.y}`, point]),
  ).values(),
);

const boardMarks = [
  { x: 86, y: 86, label: 'IN_A' },
  { x: 86, y: 216, label: 'IN_B' },
  { x: 132, y: 486, label: 'CLK' },
  { x: 628, y: 74, label: 'PWR' },
  { x: 628, y: 238, label: 'BUS' },
  { x: 628, y: 390, label: 'MUX' },
];

function CircuitSVG({
  animate = true,
  width = viewBoxWidth,
  height = viewBoxHeight,
  className,
}: CircuitSVGProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const [traceLengths, setTraceLengths] = useState<Record<string, number>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const nextTraceLengths = circuitTraces.reduce<Record<string, number>>((accumulator, trace, index) => {
      const pathNode = pathRefs.current[index];
      accumulator[trace.id] = pathNode ? pathNode.getTotalLength() : 0;
      return accumulator;
    }, {});

    setTraceLengths(nextTraceLengths);
  }, []);

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

  const circuitStateClass = isVisible ? styles.shellVisible : '';
  const classes = [styles.shell, circuitStateClass, className].filter(Boolean).join(' ');

  const traceStyles = useMemo<Record<string, TraceStyle>>(
    () =>
      circuitTraces.reduce<Record<string, TraceStyle>>((accumulator, trace) => {
        const traceLength = traceLengths[trace.id] ?? 0;

        accumulator[trace.id] = {
          '--trace-length': `${traceLength}`,
          '--trace-delay': `${trace.delayMs}ms`,
          '--trace-duration': `${trace.durationMs}ms`,
          '--travel-delay': `${trace.delayMs + trace.durationMs}ms`,
          '--travel-duration': `${trace.travelDurationMs}ms`,
          offsetPath: `path('${trace.d}')`,
        };

        return accumulator;
      }, {}),
    [traceLengths],
  );

  return (
    <div ref={shellRef} className={classes} style={{ maxWidth: `${width}px`, maxHeight: `${height}px` }}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        width="100%"
        height="100%"
        role="img"
        aria-label="Animated circuit board illustration"
      >
        <rect x="18" y="18" width="724" height="504" className={styles.boardFrame} />
        <path d="M 36 54 H 724" className={styles.boardGuide} />
        <path d="M 36 486 H 724" className={styles.boardGuide} />
        <path d="M 94 36 V 504" className={styles.boardGuideVertical} />
        <path d="M 666 36 V 504" className={styles.boardGuideVertical} />

        {circuitTraces.map((trace, index) => (
          <g key={trace.id}>
            <path d={trace.d} className={styles.traceBase} />
            <path
              ref={(node) => {
                pathRefs.current[index] = node;
              }}
              d={trace.d}
              className={styles.traceActive}
              style={traceStyles[trace.id]}
            />
          </g>
        ))}

        <g className={styles.componentLayer}>
          <rect x="308" y="146" width="144" height="242" className={styles.icBody} />
          <rect x="324" y="166" width="112" height="202" className={styles.icCore} />
          {chipPins.map((pin) => (
            <line
              key={`${pin.x1}-${pin.y1}-${pin.x2}-${pin.y2}`}
              x1={pin.x1}
              y1={pin.y1}
              x2={pin.x2}
              y2={pin.y2}
              className={styles.icPin}
            />
          ))}
          <text x="380" y="236" textAnchor="middle" className={styles.componentLabel}>
            MCU
          </text>
          <text x="380" y="270" textAnchor="middle" className={styles.componentMeta}>
            BUILD_GUILD
          </text>
          <text x="380" y="304" textAnchor="middle" className={styles.componentMeta}>
            DUBAI_CORE
          </text>
        </g>

        <g className={styles.componentLayer}>
          <path
            d="M 212 66 H 232 M 232 66 L 244 52 L 256 80 L 268 52 L 280 80 L 292 52 L 304 80 L 316 66 M 316 66 H 332"
            className={styles.resistor}
          />
          <text x="272" y="46" textAnchor="middle" className={styles.componentTag}>
            R1
          </text>
        </g>

        <g className={styles.componentLayer}>
          <path d="M 580 112 H 550" className={styles.capacitorLead} />
          <line x1="550" y1="92" x2="550" y2="132" className={styles.capacitorPlate} />
          <line x1="536" y1="92" x2="536" y2="132" className={styles.capacitorPlate} />
          <path d="M 536 112 H 520" className={styles.capacitorLead} />
          <text x="548" y="78" textAnchor="middle" className={styles.componentTag}>
            C7
          </text>
        </g>

        {signalPads.map((point) => (
          <rect
            key={`${point.x}-${point.y}`}
            x={point.x - 5}
            y={point.y - 5}
            width="10"
            height="10"
            className={styles.pad}
          />
        ))}

        {junctions.map((point) => (
          <rect
            key={`junction-${point.x}-${point.y}`}
            x={point.x - 4}
            y={point.y - 4}
            width="8"
            height="8"
            className={styles.junction}
          />
        ))}

        {boardMarks.map((mark) => (
          <g key={`${mark.label}-${mark.x}-${mark.y}`} className={styles.boardMark}>
            <text x={mark.x} y={mark.y} className={styles.boardMarkText}>
              {mark.label}
            </text>
          </g>
        ))}

        {circuitTraces.map((trace) => (
          <circle key={`dot-${trace.id}`} r="4.5" className={styles.signalDot} style={traceStyles[trace.id]} />
        ))}
      </svg>
    </div>
  );
}

export default CircuitSVG;
