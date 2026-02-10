import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  direction?: "up" | "left" | "right";
  distance?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  y = 20,
  once = true,
  className = "",
  direction = "up",
  distance,
}: FadeInProps) {
  const travel = distance ?? y;
  const initial =
    direction === "left"
      ? { opacity: 0, x: -travel }
      : direction === "right"
        ? { opacity: 0, x: travel }
        : { opacity: 0, y: travel };

  const visible = direction === "up" ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={visible}
      viewport={{ once, amount: 0.28 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
