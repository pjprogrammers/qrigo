"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkipLinkProps {
  href?: string;
  className?: string;
}

export default function SkipLink({
  href = "#main-content",
  className,
}: SkipLinkProps) {
  return (
    <motion.a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg",
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      whileFocus={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      Skip to main content
    </motion.a>
  );
}
