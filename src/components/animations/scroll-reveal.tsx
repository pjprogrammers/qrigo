"use client";

import { motion } from "framer-motion";
import React from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
};

const directionMap: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

function ScrollReveal({
  children,
  className,
  direction = "up",
  distance = 40,
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const dir = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: dir.x * distance, y: dir.y * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
