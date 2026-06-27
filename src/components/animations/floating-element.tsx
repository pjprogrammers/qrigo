"use client";

import { motion } from "framer-motion";
import React from "react";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  y?: number;
  delay?: number;
  as?: "div" | "span";
}

function FloatingElement({
  children,
  className,
  duration = 3,
  y = 10,
  delay = 0,
  as = "div",
}: FloatingElementProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      animate={{ y: [0, -y, 0] }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </Component>
  );
}

export default FloatingElement;
