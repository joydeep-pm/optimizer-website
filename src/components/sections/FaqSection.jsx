import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqList } from "../../content/siteContent";

function Row({ index, item }) {
  const [open, setOpen] = useState(index === 0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-ink/15">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 w-full items-start gap-4 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:gap-8"
        >
          <span className="label mt-2 w-8 shrink-0 text-ink/60">{String(index + 1).padStart(2, "0")}</span>
          <span className="display-font flex-1 text-xl font-bold leading-snug md:text-3xl">{item.question}</span>
          <span
            aria-hidden="true"
            className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/30 text-xl transition ${
              open ? "rotate-45 bg-ink text-white" : ""
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="a"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 pl-12 text-lg leading-relaxed text-ink/75 md:pl-20">{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  return (
    <section id="faq" className="mx-auto w-full max-w-[1320px] px-4 py-16 md:px-8 md:py-28">
      <p className="label text-ink/70">[05] Questions</p>
      <h2 className="display-font mt-4 max-w-4xl text-balance text-5xl font-bold leading-[0.98] tracking-tight md:text-8xl">
        Questions before you join
      </h2>
      <div className="mt-12 border-b border-ink/15">
        {faqList.map((item, index) => (
          <Row key={item.question} index={index} item={item} />
        ))}
      </div>
    </section>
  );
}
