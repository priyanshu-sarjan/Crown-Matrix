import React, { useEffect, useState, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function CursorFollower() {
  const prefersReduced = usePrefersReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Check for coarse pointer (touch devices)
    const touchMedia = window.matchMedia('(pointer: coarse)');
    if (touchMedia.matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    // Hover detection for interactive elements
    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, [role="button"], input, select, textarea, .interactive-hover, [data-cell]');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    // Animation Loop with Lerp Interpolation
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const render = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.18);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetPos.current.x}px, ${targetPos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (prefersReduced || isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 -mt-1.25 -ml-1.25 rounded-full bg-cyan-400 transition-transform duration-75 ease-out shadow-[0_0_10px_#22d3ee] ${
          isClicked ? 'scale-50 bg-amber-400 shadow-[0_0_12px_#fbbf24]' : ''
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Trailing Aura Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-cyan-400/60 -mt-5 -ml-5 transition-all duration-300 ease-out backdrop-blur-[1px] ${
          isHovered
            ? 'w-14 h-14 -mt-7 -ml-7 bg-cyan-500/15 border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-110'
            : isClicked
            ? 'w-8 h-8 -mt-4 -ml-4 border-amber-400 bg-amber-500/20 scale-90'
            : 'w-10 h-10 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
