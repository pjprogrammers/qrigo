"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StepFlowProps = {
  steps: string[];
  currentStep?: number;
  className?: string;
};

function StepFlow({ steps, currentStep = 0, className }: StepFlowProps) {
  return (
    <div
      className={cn(
        "flex w-full items-start justify-center gap-0",
        className,
      )}
    >
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isIncomplete = index > currentStep;

        return (
          <div key={index} className="flex flex-1 items-center last:flex-none">
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <div className="relative flex items-center justify-center">
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: "0 0 0 0 rgba(168,85,247,0.4)",
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(168,85,247,0.4)",
                        "0 0 0 12px rgba(168,85,247,0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}

                <motion.div
                  className={cn(
                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors sm:h-12 sm:w-12 sm:text-base",
                    isCompleted &&
                      "border-transparent bg-gradient-to-r from-purple-600 to-pink-500 text-white",
                    isActive &&
                      "border-transparent bg-gradient-to-r from-purple-600 to-pink-500 text-white",
                    isIncomplete &&
                      "border-neutral-300 bg-transparent text-neutral-500 dark:border-neutral-600 dark:text-neutral-400",
                  )}
                  initial={isActive ? { scale: 1 } : false}
                  animate={
                    isActive
                      ? {
                          scale: [1, 1.08, 1],
                        }
                      : undefined
                  }
                  transition={
                    isActive
                      ? {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : undefined
                  }
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>
              </div>

              <span
                className={cn(
                  "max-w-20 text-center text-xs font-medium leading-tight sm:max-w-28 sm:text-sm",
                  isCompleted &&
                    "text-purple-600 dark:text-purple-400",
                  isActive && "text-neutral-900 dark:text-white",
                  isIncomplete &&
                    "text-neutral-400 dark:text-neutral-500",
                )}
              >
                {label}
              </span>
            </motion.div>

            {index < steps.length - 1 && (
              <div className="mx-2 flex-1 self-center sm:mx-3">
                <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-purple-600 to-pink-500"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: isCompleted ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.2,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepFlow;
