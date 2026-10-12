import { lazy, Suspense, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { carouselCards, pickerSpends } from "../content/siteContent";

const SwipeCard = lazy(() => import("./three/SwipeCard"));

const STEPS = pickerSpends;
const WINNERS = STEPS.map((s) => s.winner);
const URLS = carouselCards.map((c) => c.textureUrl);
const EASE = [0.16, 1, 0.3, 1];

function StaticFallback() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-16 md:px-8 md:py-24">
      <p className="label text-violet-soft">[02] The swipe</p>
      <h2 className="display-font mt-4 text-5xl font-bold tracking-tight md:text-7xl">
        The right card, <span className="accent text-violet-soft">every time</span>
      </h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <li key={step.id} className="rounded-2xl border border-white/20 p-5">
            <p className="label text-white/60">{step.label}</p>
            <p className="display-font mt-2 text-2xl font-bold">{carouselCards[step.winner].name}</p>
            <p className="mt-1 text-white/75">{step.why}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-white/60">Illustration only.</p>
    </div>
  );
}

export default function SwipeScene() {
  const ref = useRef(null);
  const progressRef = useRef(0);
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const near = useInView(ref, { margin: "800px 0px", once: true });
  const visible = useInView(ref, { margin: "100px 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const p = v * (STEPS.length - 1);
    progressRef.current = p;
    const i = Math.floor(p);
    const f = p - i;
    setStep(Math.min(STEPS.length - 1, f >= 0.75 ? i + 1 : i));
  });

  const spend = STEPS[step];
  const winner = carouselCards[spend.winner];

  if (reduceMotion) {
    return (
      <section id="swipe" className="bg-ink text-white">
        <StaticFallback />
      </section>
    );
  }

  return (
    <section id="swipe" ref={ref} style={{ height: `${STEPS.length * 95}vh` }} className="relative bg-ink text-white">
      <div className="sticky top-0 h-screen overflow-hidden pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[110vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(140,82,255,0.38),rgba(140,82,255,0)_62%)]"
        />
        <div className="relative mx-auto grid h-full w-full max-w-[1320px] grid-rows-[1fr_auto] gap-2 px-4 pb-8 md:px-8 lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:pb-0">
          <div className="relative order-1 min-h-0 lg:order-2 lg:h-[78vh]">
            {near ? (
              <Suspense fallback={null}>
                <SwipeCard progressRef={progressRef} winners={WINNERS} urls={URLS} active={visible} />
              </Suspense>
            ) : null}
          </div>

          <div className="order-2 lg:order-1">
            <p className="label text-violet-soft">[02] The swipe</p>
            <p className="label mt-6 text-white/70">I am paying for</p>
            <div className="relative mt-2 h-[4.2rem] overflow-hidden md:h-[6.2rem] lg:h-[7rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h2
                  key={spend.id}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="display-font absolute inset-x-0 top-0 whitespace-nowrap text-[clamp(2.2rem,5.2vw,5.6rem)] font-bold leading-[1.05] tracking-[-0.04em]"
                >
                  {spend.label}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="mt-4 min-h-[8rem]">
              <p className="label text-white/60">Leads here</p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={spend.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="accent mt-1 text-4xl text-violet-soft md:text-5xl">{winner.name}</p>
                  <p className="mt-2 max-w-md text-lg text-white/80">{spend.why}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex items-center gap-3" aria-hidden="true">
              {STEPS.map((s, index) => (
                <span
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === step ? "w-14 bg-violet" : "w-6 bg-white/25"
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-white/55">Illustration only. Scroll to change what you are paying for.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
