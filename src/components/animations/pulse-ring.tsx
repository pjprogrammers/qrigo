"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PulseRingProps {
  children?: React.ReactNode;
  className?: string;
  ringCount?: number;
  color?: string;
  size?: number;
  duration?: number;
}

function PulseRing({
  children,
  className,
  ringCount = 3,
  color = "#a855f7",
  size = 48,
  duration = 2,
}: PulseRingProps) {
  const rings = useMemo(() => {
    return Array.from({ length: ringCount }, (_, i) => ({
      id: i,
      delay: (duration / ringCount) * i,
    }));
  }, [ringCount, duration]);

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {rings.map((ring) => (
        <motion.div
          key={ring.id}
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: color }}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: [0.8, 2], opacity: [0.6, 0] }}
          transition={{
            duration,
            delay: ring.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default PulseRing;
