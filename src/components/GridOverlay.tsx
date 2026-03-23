import { useEffect, useRef } from 'react';
import styles from './GridOverlay.module.css';

const GRID_SIZE = 48;
const INTERACTION_RADIUS = 160;
const BASE_ALPHA = 0.2;
const ACTIVE_ALPHA = 0.44;
const EASING = 0.14;

function getCssRgbValue(style: CSSStyleDeclaration, variableName: string, fallback: string) {
  const value = style.getPropertyValue(variableName).trim();
  return value || fallback;
}

function GridOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }

    const context = canvasElement.getContext('2d');

    if (!context) {
      return;
    }

    const rootStyles = getComputedStyle(document.documentElement);
    const baseRgb = getCssRgbValue(rootStyles, '--grid-rgb', '35, 51, 81');
    const activeRgb = getCssRgbValue(rootStyles, '--grid-active-rgb', '94, 110, 141');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.35;
    let targetX = pointerX;
    let targetY = pointerY;

    const drawGrid = () => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;

      for (let column = 0; column <= width + GRID_SIZE; column += GRID_SIZE) {
        const distance = Math.abs(column - pointerX);
        const influence = reducedMotionQuery.matches ? 0 : Math.max(0, 1 - distance / INTERACTION_RADIUS);
        const alpha = BASE_ALPHA + influence * (ACTIVE_ALPHA - BASE_ALPHA);
        const lineColor = influence > 0.06 ? activeRgb : baseRgb;

        context.strokeStyle = `rgba(${lineColor}, ${alpha.toFixed(3)})`;
        context.beginPath();
        context.moveTo(Math.round(column) + 0.5, 0);
        context.lineTo(Math.round(column) + 0.5, height);
        context.stroke();
      }

      for (let row = 0; row <= height + GRID_SIZE; row += GRID_SIZE) {
        const distance = Math.abs(row - pointerY);
        const influence = reducedMotionQuery.matches ? 0 : Math.max(0, 1 - distance / INTERACTION_RADIUS);
        const alpha = BASE_ALPHA + influence * (ACTIVE_ALPHA - BASE_ALPHA);
        const lineColor = influence > 0.06 ? activeRgb : baseRgb;

        context.strokeStyle = `rgba(${lineColor}, ${alpha.toFixed(3)})`;
        context.beginPath();
        context.moveTo(0, Math.round(row) + 0.5);
        context.lineTo(width, Math.round(row) + 0.5);
        context.stroke();
      }
    };

    const renderFrame = () => {
      if (!reducedMotionQuery.matches) {
        pointerX += (targetX - pointerX) * EASING;
        pointerY += (targetY - pointerY) * EASING;
      } else {
        pointerX = targetX;
        pointerY = targetY;
      }

      drawGrid();

      if (!reducedMotionQuery.matches) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      } else {
        animationFrameId = 0;
      }
    };

    const resizeCanvas = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvasElement.width = Math.round(width * devicePixelRatio);
      canvasElement.height = Math.round(height * devicePixelRatio);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      drawGrid();
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (reducedMotionQuery.matches) {
        drawGrid();
      } else if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const handlePointerLeave = () => {
      targetX = width * 0.5;
      targetY = height * 0.35;
    };

    const handleReducedMotionChange = () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }

      pointerX = targetX;
      pointerY = targetY;
      drawGrid();

      if (!reducedMotionQuery.matches) {
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    resizeCanvas();
    drawGrid();

    if (!reducedMotionQuery.matches) {
      animationFrameId = window.requestAnimationFrame(renderFrame);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}

export default GridOverlay;
