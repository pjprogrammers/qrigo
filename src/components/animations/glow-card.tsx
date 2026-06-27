"use client";

import { motion } from "framer-motion";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColors?: string[];
  hoverOnly?: boolean;
};

function GlowCard({
  children,
  className = "",
  glowColors = ["#a855f7", "#ec4899", "#fb923c"],
  hoverOnly = false,
}: GlowCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-xl ${className}`}>
      <motion.div
        className={`pointer-events-none absolute -inset-2 rounded-xl blur-2xl transition-opacity duration-500 ${
          hoverOnly ? "opacity-0 group-hover:opacity-80" : "opacity-80"
        }`}
        style={{
          background: `conic-gradient(from 0deg, ${glowColors.join(", ")}, ${glowColors[0]})`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 rounded-xl bg-white dark:bg-neutral-900 shadow-md transition-shadow duration-300 group-hover:shadow-xl">
        {children}
      </div>
    </div>
  );
}

export default GlowCard;
