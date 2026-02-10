import { type ReactNode } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  once = true,
  className = "",
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.28 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
