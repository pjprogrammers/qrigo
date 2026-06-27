"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

type MouseGlowProps = {
  children: React.ReactNode;
  className?: string;
  glowSize?: number;
  glowOpacity?: number;
  color?: string;
};

function MouseGlow({
  children,
  className = "",
  glowSize = 300,
  glowOpacity = 0.15,
  color = "rgba(168,85,247,0.5)",
}: MouseGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(e.clientX - rect.left - glowSize / 2);
      y.set(e.clientY - rect.top - glowSize / 2);
    },
    [glowSize, x, y],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="pointer-events-none absolute"
        style={{ x, y, width: glowSize, height: glowSize }}
        animate={{ opacity: isHovered ? glowOpacity : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="size-full rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
          }}
        />
      </motion.div>
      {children}
    </div>
  );
}

export default MouseGlow;
