'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const TRAIL_LENGTH = 20;

interface Point {
  x: number;
  y: number;
}

export default function RainbowCursor() {
  const [isMobile, setIsMobile] = useState(true); // default true to avoid flash
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef<Point>({ x: -100, y: -100 });
  const trailPositions = useRef<Point[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );
  const animFrameId = useRef<number>(0);
  const hueOffset = useRef(0);
  const isHovering = useRef(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const isTouchOnly =
        'ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches;
      setIsMobile(coarse || isTouchOnly);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const animate = useCallback(() => {
    hueOffset.current = (hueOffset.current + 0.5) % 360;

    // Update trail positions (shift towards cursor)
    const positions = trailPositions.current;
    positions[0] = { ...mousePos.current };
    for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
      positions[i] = {
        x: positions[i].x + (positions[i - 1].x - positions[i].x) * 0.35,
        y: positions[i].y + (positions[i - 1].y - positions[i].y) * 0.35,
      };
    }

    // Update main cursor
    if (cursorRef.current) {
      const scale = isHovering.current ? 1.2 : 1;
      cursorRef.current.style.transform = `translate3d(${mousePos.current.x - 6}px, ${mousePos.current.y - 6}px, 0) scale(${scale})`;
    }

    // Update trail particles
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const el = trailRefs.current[i];
      if (!el) continue;

      const progress = i / TRAIL_LENGTH;
      const hue = (i * 18 + hueOffset.current) % 360;
      const opacity = 0.8 * (1 - progress);
      const size = 8 - progress * 6; // 8px → 2px

      el.style.transform = `translate3d(${positions[i].x - size / 2}px, ${positions[i].y - size / 2}px, 0)`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = `${opacity}`;
      el.style.background = `hsl(${hue}, 100%, 65%)`;
      el.style.boxShadow = `0 0 ${6 + (1 - progress) * 6}px hsl(${hue}, 100%, 65%)`;
    }

    animFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Hide system cursor
    document.documentElement.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        isHovering.current = true;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        isHovering.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animFrameId.current);
    };
  }, [isMobile, animate]);

  if (isMobile) return null;

  return (
    <>
      {/* Trail particles */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 8,
            height: 8,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            willChange: 'transform, opacity',
            transition: 'none',
          }}
        />
      ))}

      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 0 12px 4px rgba(255,255,255,0.6), 0 0 24px 8px rgba(99,102,241,0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transition: 'transform 0.08s ease-out',
        }}
      />
    </>
  );
}
