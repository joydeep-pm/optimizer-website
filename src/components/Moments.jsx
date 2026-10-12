import { useState } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { carouselCards, moments } from "../content/siteContent";

const EASE = [0.16, 1, 0.3, 1];

function PickVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <p className="label text-white/60">Illustration</p>
      <div className="flex items-center gap-4">
        <span className="rounded-full border border-white/30 px-4 py-2 text-base font-semibold">Food delivery</span>
        <span aria-hidden="true" className="text-2xl text-violet-soft">&rarr;</span>
        <img
          src={carouselCards[2].textureUrl}
          alt="Everyday Cashback, illustrative card"
          className="w-40 rounded-xl shadow-[0_18px_40px_rgba(0,0,0,0.5)] md:w-56"
        />
      </div>
      <p className="display-font text-2xl font-bold md:text-3xl">{carouselCards[2].name} leads.</p>
    </div>
  );
}

function MilestoneVisual() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <p className="label text-white/60">Illustration</p>
      <div>
        <p className="text-base text-white/80">Quarterly spend milestone</p>
        <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full origin-left rounded-full bg-violet"
            style={{ width: "62%" }}
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: EASE }}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <span className="rounded-full bg-violet px-4 py-2 text-sm font-semibold">Points expiring soon</span>
        <span className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold">Nudge before it lapses</span>
      </div>
    </div>
  );
}

function ToggleRow({ label, note }) {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/20 p-4">
      <div>
        <p className="text-lg font-semibold">{label}</p>
        <p className="text-sm text-white/65">{note}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((v) => !v)}
        className={`relative h-8 w-14 shrink-0 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          on ? "bg-violet" : "bg-white/25"
        }`}
      >
        <span className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all ${on ? "left-7" : "left-1"}`} />
      </button>
    </div>
  );
}

function DataVisual() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <p className="label text-white/60">Illustration</p>
      <div className="space-y-3">
        <ToggleRow label="Gmail, read-only" note="Off until you connect it" />
        <ToggleRow label="Bank SMS (Android)" note="Off until you turn it on" />
      </div>
      <p className="text-base text-white/80">Both start off. Try the switches.</p>
    </div>
  );
}

const VISUALS = [PickVisual, MilestoneVisual, DataVisual];

function Numeral({ children, scrollTarget }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scrollTarget, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [70, -70]);
  return (
    <motion.p
      style={{ y }}
      className="display-font text-[clamp(5rem,14vw,11rem)] font-bold leading-[0.8] tracking-[-0.05em] text-violet"
    >
      {children}
    </motion.p>
  );
}

function Moment({ moment, index }) {
  const Visual = VISUALS[index];
  const flip = index % 2 === 1;
  const ref = useRef(null);
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="grid gap-8 border-t border-ink/15 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
    >
      <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
        <Numeral scrollTarget={ref}>{moment.n}</Numeral>
        <p className="label mt-6 text-ink/70">{moment.kicker}</p>
        <h2 className="display-font mt-3 text-balance text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
          {moment.title}
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/75">{moment.body}</p>
      </div>
      <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
        <div className="min-h-[320px] rounded-[2rem] bg-ink p-6 text-white md:min-h-[400px] md:p-9">
          <Visual />
        </div>
      </div>
    </motion.article>
  );
}

export default function Moments() {
  return (
    <section id="moments" className="mx-auto w-full max-w-[1320px] px-4 py-16 md:px-8 md:py-28">
      <p className="label text-ink/70">[03] Three moments</p>
      <div className="mt-8">
        {moments.map((moment, index) => (
          <Moment key={moment.n} moment={moment} index={index} />
        ))}
      </div>
    </section>
  );
}
