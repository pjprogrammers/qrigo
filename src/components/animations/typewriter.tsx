"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

type TypewriterProps = {
  text: string | string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
};

function Typewriter({
  text,
  className = "",
  speed = 50,
  deleteSpeed = 30,
  pauseDuration = 2000,
  loop = false,
}: TypewriterProps) {
  const strings = React.useMemo(() => Array.isArray(text) ? text : [text], [text]);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = strings[currentIndex % strings.length];

    if (!isDeleting && displayText === currentString) {
      const timeout = setTimeout(() => {
        if (currentIndex < strings.length - 1 || loop) {
          setIsDeleting(true);
        }
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentIndex((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setDisplayText(currentString.slice(0, displayText.length + 1));
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    currentIndex,
    strings,
    speed,
    deleteSpeed,
    pauseDuration,
    loop,
  ]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
      <span
        style={{
          animation: "typewriter-cursor-blink 1s step-end infinite",
        }}
      >
        |
      </span>
      <style>{`
        @keyframes typewriter-cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </motion.span>
  );
}

export default Typewriter;
