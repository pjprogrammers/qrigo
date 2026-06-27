"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MicroButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "gradient" | "outline";
  href?: string;
  size?: "sm" | "md" | "lg";
};

type Ripple = {
  id: number;
  x: number;
  y: number;
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};

const variantStyles = {
  primary:
    "bg-neutral-900 text-white shadow-sm hover:shadow-md dark:bg-white dark:text-neutral-900",
  gradient:
    "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-sm hover:shadow-lg",
  outline:
    "border-2 border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800",
};

function MicroButton({
  children,
  className,
  variant = "primary",
  href,
  size = "md",
}: MicroButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const idCounter = useRef(0);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++idCounter.current;
      setRipples((prev) => [...prev, { id, x, y }]);
    },
    [],
  );

  const handleRippleEnd = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => {
      setIsHovered(false);
      setIsPressed(false);
    },
  };

  const isStringChild = typeof children === "string";

  const classes = cn(
    "relative inline-flex items-center justify-center overflow-hidden rounded-xl font-medium transition-shadow duration-300 select-none",
    sizeStyles[size],
    variantStyles[variant],
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
    "disabled:pointer-events-none disabled:opacity-50",
    className,
  );

  const glowStyle = isHovered
    ? variant === "gradient"
      ? { boxShadow: "0 0 24px rgba(168, 85, 247, 0.4), 0 0 48px rgba(236, 72, 153, 0.2)" }
      : variant === "outline"
        ? { boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }
        : { boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)" }
    : undefined;

  const content = (
    <>
      {children}
      {isStringChild && variant === "gradient" && (
        <motion.span
          animate={{ x: isHovered ? 3 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      )}
      <AnimatePresence mode="popLayout">
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full bg-white/30"
            initial={{
              width: 0,
              height: 0,
              x: ripple.x,
              y: ripple.y,
              opacity: 0.6,
            }}
            animate={{
              width: 400,
              height: 400,
              x: ripple.x - 200,
              y: ripple.y - 200,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => handleRippleEnd(ripple.id)}
          />
        ))}
      </AnimatePresence>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        style={glowStyle}
        onClick={handleClick}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      style={glowStyle}
      onClick={handleClick}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}

export default MicroButton;
