import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

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
    <div className="border-b border-white/14 py-1">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-0 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
        aria-expanded={isOpen}
      >
        <span className="pr-3 text-left text-2xl font-semibold leading-tight text-white">{question}</span>

        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.12em] text-white/72">
            {tag}
          </span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: EASE }}
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
            initial={reduceMotion ? { opacity: 1, y: 0, height: "auto" } : { opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={reduceMotion ? { opacity: 0, y: 0, height: "auto" } : { opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-left text-base leading-relaxed text-white/72">{answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
