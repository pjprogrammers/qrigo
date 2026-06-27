"use client";

import { motion } from "framer-motion";

type BouncyCardProps = {
  children: React.ReactNode;
  className?: string;
  index?: number;
  delay?: number;
};

const variants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

function BouncyCard({
  children,
  className = "",
  index = 0,
  delay = 0,
}: BouncyCardProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: index * 0.08 + delay,
      }}
      className={`rounded-xl border bg-white shadow-sm dark:bg-neutral-900 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default BouncyCard;
