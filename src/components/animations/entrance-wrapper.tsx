"use client";

import { motion } from "framer-motion";
import React from "react";

type AnimationType = "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft" | "slideRight";

type EntranceWrapperProps = {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
};

type Variant = {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
};

const variants: Record<AnimationType, { hidden: Variant; visible: Variant }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
};

function EntranceWrapper({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
}: EntranceWrapperProps) {
  const { hidden, visible } = variants[animation];

  return (
    <motion.div
      className={className}
      variants={{
        hidden,
        visible: {
          ...visible,
          transition: { duration, delay, ease: "easeOut" },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

export default EntranceWrapper;
