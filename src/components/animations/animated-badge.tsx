"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedBadgeProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "outline";
  animate?: boolean;
};

const variantStyles: Record<NonNullable<AnimatedBadgeProps["variant"]>, string> = {
  default:
    "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  gradient:
    "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white",
  outline:
    "border-neutral-300 text-neutral-700 dark:border-neutral-600 dark:text-neutral-300",
};

function AnimatedBadge({
  children,
  className,
  variant = "gradient",
  animate = true,
}: AnimatedBadgeProps) {
  return (
    <motion.span
      className={cn(
        "relative inline-flex items-center gap-1 overflow-hidden rounded-full px-3 py-1 text-xs font-medium",
        variantStyles[variant],
        variant === "outline" && "border",
        className,
      )}
      initial={animate ? { scale: 0.9, opacity: 0 } : undefined}
      animate={
        animate
          ? {
              scale: 1,
              opacity: 1,
              ...(variant === "outline"
                ? {
                    borderColor: [
                      "rgb(168,85,247)",
                      "rgb(236,72,153)",
                      "rgb(251,146,60)",
                      "rgb(168,85,247)",
                    ],
                  }
                : {}),
            }
          : undefined
      }
      transition={
        animate
          ? {
              scale: { type: "spring", stiffness: 300, damping: 20 },
              opacity: { duration: 0.3 },
              borderColor: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              },
            }
          : undefined
      }
    >
      {variant === "gradient" && animate && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ["-100%", "100%", "-100%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      {variant === "default" && animate && (
        <motion.span
          className="absolute inset-0 rounded-full bg-neutral-900/5 dark:bg-white/5"
          animate={{
            opacity: [0, 0.35, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      {children}
    </motion.span>
  );
}

export default AnimatedBadge;
