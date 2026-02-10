import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SignalBadge from "./SignalBadge";

interface AccordionItemProps {
  question: string;
  answer: string;
  tag: string;
  defaultOpen?: boolean;
}

export default function AccordionItem({
  question,
  answer,
  tag,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();

  return (
    <div className="motion-accordion relative overflow-hidden rounded-xl border border-white/12 bg-black/45 backdrop-blur-xl">
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 rounded-r bg-gradient-to-b from-cyan-300/80 via-cyan-300/40 to-transparent"
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left outline-none transition hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-cyan-300/60"
        aria-expanded={isOpen}
      >
        <span className="pr-3 text-lg font-semibold leading-tight text-white">{question}</span>

        <div className="flex shrink-0 items-center gap-3">
          <SignalBadge label={tag} tone="info" />
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-white/65"
          >
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.75" />
          </motion.svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="content"
            initial={reduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0, height: "auto" } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-base leading-relaxed text-white/72">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
