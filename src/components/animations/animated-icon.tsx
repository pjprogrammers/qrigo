"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type IconAnimation = "pulse" | "bounce" | "spin" | "wiggle" | "none";

type AnimatedIconProps = {
  children: React.ReactNode;
  className?: string;
  animation?: IconAnimation;
  hoverAnimation?: IconAnimation;
  size?: number;
};

type AnimationVariant = {
  scale?: number[];
  y?: number[];
  rotate?: number[];
};

const animations: Record<IconAnimation, AnimationVariant> = {
  pulse: {
    scale: [1, 1.1, 1],
  },
  bounce: {
    y: [0, -4, 0],
  },
  spin: {
    rotate: [0, 360],
  },
  wiggle: {
    rotate: [-10, 10, -10],
  },
  none: {},
};

const transition = {
  duration: 0.4,
  ease: "easeInOut" as const,
};

function AnimatedIcon({
  children,
  className,
  animation = "none",
  hoverAnimation = "wiggle",
  size = 24,
}: AnimatedIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const activeAnimation = isHovered ? hoverAnimation : animation;

  return (
    <motion.span
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      animate={animations[activeAnimation]}
      transition={transition}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.span>
  );
}

export default AnimatedIcon;
