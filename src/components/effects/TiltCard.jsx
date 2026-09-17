import React, { useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.02,
  perspective = 1000,
  speed = 400,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();
  const [transform, setTransform] = useState(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
  const [isHovered, setIsHovered] = useState(false);
  const animFrameId = useRef(null);

  const handleMouseMove = (e) => {
    if (prefersReduced || !cardRef.current) return;

    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);

    animFrameId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calculate tilt angles normalized between -1 and 1
      const xPct = (mouseX / width) - 0.5;
      const yPct = (mouseY / height) - 0.5;

      const rotateX = -(yPct * maxTilt * 2).toFixed(2);
      const rotateY = (xPct * maxTilt * 2).toFixed(2);

      setTransform(`perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`);
    });
  };

  const handleMouseEnter = () => {
    if (prefersReduced) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (prefersReduced) return;
    setIsHovered(false);
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-${isHovered ? '75' : speed} ease-out ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
