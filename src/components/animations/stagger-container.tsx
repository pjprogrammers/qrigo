"use client";

import { motion } from "framer-motion";
import React from "react";

type StaggerContainerProps = {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  margin?: string;
};

const containerVariants = (staggerDelay: number, delayChildren: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0.15,
  once = true,
  margin = "-50px",
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants(staggerDelay, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

export default StaggerContainer;
