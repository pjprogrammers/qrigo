"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  tiltDegree?: number;
};

function TiltCard({
  children,
  className = "",
  tiltDegree = 10,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const xMotion = useMotionValue(0);
  const yMotion = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const rotateX = useSpring(yMotion, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(xMotion, { stiffness: 300, damping: 30 });
  const glowPosX = useSpring(glowX, { stiffness: 200, damping: 25 });
  const glowPosY = useSpring(glowY, { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      xMotion.set((mouseX / (rect.width / 2)) * tiltDegree);
      yMotion.set(-(mouseY / (rect.height / 2)) * tiltDegree);

      const gx = ((e.clientX - rect.left) / rect.width) * 100;
      const gy = ((e.clientY - rect.top) / rect.height) * 100;
      glowX.set(gx);
      glowY.set(gy);
    },
    [tiltDegree, xMotion, yMotion, glowX, glowY],
  );

  const handleMouseLeave = useCallback(() => {
    xMotion.set(0);
    yMotion.set(0);
    glowX.set(50);
    glowY.set(50);
  }, [xMotion, yMotion, glowX, glowY]);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background:
              "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,255,255,0.15) 0%, transparent 60%)",
            "--glow-x": `${glowPosX}%`,
            "--glow-y": `${glowPosY}%`,
          } as React.CSSProperties}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-xl dark:opacity-40"
          style={{
            background:
              "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0,0,0,0.06) 0%, transparent 60%)",
            "--glow-x": `${glowPosX}%`,
            "--glow-y": `${glowPosY}%`,
          } as React.CSSProperties}
        />
        <div style={{ transformStyle: "preserve-3d" }}>{children}</div>
      </motion.div>
    </div>
  );
}

export default TiltCard;
