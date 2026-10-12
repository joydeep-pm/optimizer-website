import { motion, useReducedMotion } from "framer-motion";
import WaitlistForm from "./WaitlistForm";
import CardFanPicker from "./CardFanPicker";
import { hero } from "../content/siteContent";

const LINES = [
  [{ w: "Turn" }, { w: "Every" }, { w: "Swipe" }],
  [{ w: "Into" }, { w: "Smarter", mark: true }],
  [{ w: "Reward", hot: true }, { w: "Yield", hot: true }],
];

const FACTS = [
  "Recommends from the cards you actually hold",
  "Tracks milestones and points that expire",
  "Gmail and SMS are optional, and start off",
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  let counter = 0;

  return (
    <section id="top" className="mx-auto w-full max-w-[1320px] px-4 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
      <p className="label flex flex-wrap gap-x-4 text-ink/70">
        <span>[01]</span>
        <span>{hero.eyebrow}</span>
      </p>

      <h1
        aria-label={hero.headline}
        className="display-font mt-6 text-[clamp(3rem,10.5vw,9.5rem)] font-bold leading-[0.9] tracking-[-0.04em]"
      >
        {LINES.map((line, lineIndex) => (
          <span key={lineIndex} aria-hidden="true" className="block">
            {line.map((word) => {
              const delay = 0.1 + counter++ * 0.08;
              return (
                <span key={word.w} className="mr-[0.2em] inline-block overflow-hidden pb-[0.08em] align-top last:mr-0">
                  <motion.span
                    className={`inline-block ${
                      word.hot ? "text-violet" : ""
                    } ${word.mark ? "rounded-[0.18em] bg-violet px-[0.14em] text-white" : ""}`}
                    initial={reduceMotion ? false : { y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word.w}
                  </motion.span>
                </span>
              );
            })}
          </span>
        ))}
      </h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <p className="max-w-xl text-xl leading-relaxed text-ink/80 md:text-2xl">{hero.subheadline}</p>
          <div className="mt-8">
            <WaitlistForm variant="hero" buttonLabel="Join the Waitlist" tone="light" />
          </div>
          <ul className="mt-10 space-y-3 border-t border-ink/15 pt-6">
            {FACTS.map((fact) => (
              <li key={fact} className="flex items-start gap-3 text-lg text-ink/85">
                <span aria-hidden="true" className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet text-xs font-bold text-white">
                  &#10003;
                </span>
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <CardFanPicker />
        </div>
      </div>
    </section>
  );
}
