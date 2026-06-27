"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ShimmerDividerProps = {
  className?: string;
  width?: string;
  height?: number;
  colors?: string[];
  label?: string;
};

function ShimmerDivider({
  className = "",
  width = "full",
  height = 1,
  colors = ["transparent", "#a855f7", "#ec4899", "#fb923c", "transparent"],
  label,
}: ShimmerDividerProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;
  const widthClass = width === "full" ? "w-full" : width;

  return (
    <div className={cn("relative flex items-center", widthClass, className)}>
      <motion.div
        className="h-px w-full rounded-full dark:opacity-70"
        style={{
          height,
          backgroundImage: gradient,
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["-200% 0%", "200% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {label && (
        <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-sm text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
          {label}
        </span>
      )}
    </div>
  );
}

export default ShimmerDivider;
