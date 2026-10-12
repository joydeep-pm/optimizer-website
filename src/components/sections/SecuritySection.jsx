import { motion } from "framer-motion";
import { disclaimer, trustLedger } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

function LedgerColumn({ heading, items, variant, delay }) {
  const isReads = variant === "reads";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={`rounded-3xl border p-6 md:p-8 ${
        isReads ? "border-white/15 bg-white/[0.03]" : "border-[#8c52ff]/50 bg-[#8c52ff]/[0.08]"
      }`}
    >
      <h3 className="display-font text-3xl font-bold tracking-tight text-white md:text-4xl">{heading}</h3>
      <ul className="mt-6 divide-y divide-white/12">
        {items.map((item) => (
          <li key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <span
              aria-hidden="true"
              className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                isReads ? "bg-white/10 text-white" : "bg-[#8c52ff] text-white"
              }`}
            >
              {isReads ? "→" : "✕"}
            </span>
            <div>
              <p className="text-xl font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-base leading-relaxed text-white/75">{item.note}</p>
              {item.tag ? (
                <span className="mt-3 inline-flex rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
                  {item.tag}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function SecuritySection() {
  return (
    <section id="your-data" className="bg-ink text-white">
      <div className="mx-auto w-full max-w-[1320px] px-4 py-16 md:px-8 md:py-28">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="text-left"
      >
        <p className="label text-violet-soft">[06] {trustLedger.eyebrow}</p>
        <h2 className="display-font mt-3 max-w-4xl text-balance text-4xl font-bold tracking-tight text-white md:text-8xl">
          {trustLedger.title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75">{trustLedger.body}</p>
      </motion.header>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <LedgerColumn heading={trustLedger.reads.heading} items={trustLedger.reads.items} variant="reads" delay={0} />
        <LedgerColumn heading={trustLedger.never.heading} items={trustLedger.never.items} variant="never" delay={0.08} />
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-white/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/65">{disclaimer}</p>
        <a
          href="/privacy/"
          className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {trustLedger.privacyLabel}
        </a>
      </div>
      </div>
    </section>
  );
}
