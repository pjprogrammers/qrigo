"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface MorphingShapeProps {
  className?: string;
  colors?: string[];
  size?: number;
}

const BORDER_RADII = [
  "30% 70% 70% 30% / 30% 30% 70% 70%",
  "50% 50% 20% 80% / 25% 80% 20% 75%",
  "40% 60% 75% 25% / 60% 40% 60% 40%",
  "70% 30% 30% 70% / 60% 40% 60% 40%",
  "30% 70% 50% 50% / 65% 25% 75% 35%",
];

function MorphingShape({
  className,
  colors = [
    "rgba(168,85,247,0.2)",
    "rgba(236,72,153,0.15)",
    "rgba(251,146,60,0.1)",
  ],
  size = 200,
}: MorphingShapeProps) {
  const gradient = useMemo(
    () => `linear-gradient(135deg, ${colors.join(", ")})`,
    [colors],
  );

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: gradient,
        filter: "blur(2px)",
      }}
      animate={{
        borderRadius: BORDER_RADII,
        rotate: [0, 360],
        scale: [1, 1.05, 0.95, 1],
        opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
      }}
      transition={{
        borderRadius: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        },
        scale: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    />
  );
}

export default MorphingShape;
