"use client";

import { motion } from "framer-motion";

interface BorderBeamProps {
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export const BorderBeam = ({
  duration = 1.5,
  colorFrom = "#f59e0b",
  colorTo = "#f97316",
  className = "",
}: BorderBeamProps) => {
  return (
    <motion.div
      className={`absolute inset-0 rounded-[inherit] ${className}`}
      animate={{
        boxShadow: [
          `0 0 0 0px ${colorFrom}40`,
          `0 0 0 8px ${colorTo}30`,
          `0 0 0 0px ${colorFrom}40`,
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}; 