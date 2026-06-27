"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface Sparkle {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface SparkleEffectProps {
  children: React.ReactNode;
  className?: string;
  sparkleCount?: number;
  triggerOnHover?: boolean;
  colors?: string[];
}

function SparkleEffect({
  children,
  className,
  sparkleCount = 6,
  triggerOnHover = true,
  colors = ["#a855f7", "#ec4899", "#f97316"],
}: SparkleEffectProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sparkles = useMemo<Sparkle[]>(() => {
    return Array.from({ length: sparkleCount }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 2,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sparkleCount, ...colors]);

  const showSparkles = triggerOnHover ? isHovered : true;

  return (
    <motion.div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showSparkles &&
        sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="pointer-events-none absolute"
            style={{
              top: `${sparkle.top}%`,
              left: `${sparkle.left}%`,
              width: sparkle.size + 4,
              height: sparkle.size + 4,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 12 12"
              fill={sparkle.color}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
            </svg>
          </motion.div>
        ))}
      {children}
    </motion.div>
  );
}

export default SparkleEffect;
