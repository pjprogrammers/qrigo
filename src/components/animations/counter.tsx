"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type CounterProps = {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  format?: boolean;
};

function Counter({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  className,
  prefix = "",
  suffix = "",
  format: shouldFormat = false,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(from);
  const motionValue = useMotionValue(from);
  const spring = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(latest);
    });
    return unsubscribe;
  }, [spring]);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, to, delay, motionValue]);

  const rounded = Math.round(display);
  const formatted = shouldFormat
    ? rounded.toLocaleString("en-US")
    : rounded.toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default Counter;
