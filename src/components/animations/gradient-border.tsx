"use client";

import { motion } from "framer-motion";

type GradientBorderProps = {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  duration?: number;
  colors?: string[];
};

export default function GradientBorder({
  children,
  className = "",
  borderWidth = 2,
  duration = 3,
  colors = ["#a855f7", "#ec4899", "#fb923c", "#a855f7"],
}: GradientBorderProps) {
  const gradient = `conic-gradient(${colors.join(", ")})`;

  return (
    <div
      className={`relative rounded-xl overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: gradient,
          scale: 1.5,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      />
      <div
        className="relative bg-white dark:bg-neutral-900 rounded-xl"
        style={{ margin: borderWidth }}
      >
        {children}
      </div>
    </div>
  );
}
