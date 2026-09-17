import React, { useRef, useState, useEffect } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  disabled = false,
  style = {},
  ...props
}) {
  const buttonRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const animFrameId = useRef(null);

  const handleMouseMove = (e) => {
    if (prefersReduced || disabled || !buttonRef.current) return;

    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);

    animFrameId.current = requestAnimationFrame(() => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setPosition({ x: deltaX, y: deltaY });
    });
  };

  const handleMouseEnter = () => {
    if (prefersReduced || disabled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (prefersReduced || disabled) return;
    setIsHovered(false);
    if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block transition-transform duration-${isHovered ? '100' : '300'} ease-out ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        willChange: 'transform',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
