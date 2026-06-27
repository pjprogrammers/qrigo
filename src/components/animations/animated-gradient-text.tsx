"use client";

import { motion } from "framer-motion";

type AnimatedGradientTextProps = {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
};

function AnimatedGradientText({
  children,
  className = "",
  colors = ["#a855f7", "#ec4899", "#fb923c"],
}: AnimatedGradientTextProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")}, ${colors[0]})`;

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

export default AnimatedGradientText;
