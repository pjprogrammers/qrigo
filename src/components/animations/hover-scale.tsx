"use client";

import { motion } from "framer-motion";

interface HoverScaleProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  y?: number;
  duration?: number;
}

export default function HoverScale({
  children,
  className,
  scale = 1.03,
  y = -4,
  duration = 0.2,
}: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1, y: 0 }}
      whileHover={{ scale, y }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", duration }}
    >
      {children}
    </motion.div>
  );
}
