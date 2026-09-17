import React, { useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function SpotlightContainer({
  children,
  className = '',
  spotlightColor = 'rgba(6, 182, 212, 0.18)',
  spotlightSize = 400,
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const animFrameId = useRef(null);

  const handleMouseMove = (e) => {
    if (prefersReduced || !containerRef.current) return;

    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);

    animFrameId.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      containerRef.current.style.setProperty('--spotlight-x', `${x}px`);
      containerRef.current.style.setProperty('--spotlight-y', `${y}px`);
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--spotlight-x': '50%',
        '--spotlight-y': '50%',
        ...style
      }}
      {...props}
    >
      {/* Ambient Spotlight Layer */}
      {!prefersReduced && (
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 z-10 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(${spotlightSize}px circle at var(--spotlight-x) var(--spotlight-y), ${spotlightColor}, transparent 70%)`
          }}
        />
      )}
      {children}
    </div>
  );
}
