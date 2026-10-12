import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import WaitlistForm from "./WaitlistForm";
import { carouselCards, disclaimer, hero, pickerSpends } from "../content/siteContent";

const StageCard = lazy(() => import("./three/StageCard"));

const TOTAL = 960;
const BOUNDS = [100, 420, 640, 840];
const PICK_RANGE = [130, 400];
const SCENES = [
  { id: "start", label: "Start", at: 0 },
  { id: "pick", label: "Pick", at: 100 },
  { id: "mile", label: "Month", at: 420 },
  { id: "data", label: "Data", at: 640 },
  { id: "join", label: "Join", at: 840 },
];
const WINNERS = pickerSpends.map((s) => s.winner);
const URLS = carouselCards.map((c) => c.textureUrl);
const EASE = [0.16, 1, 0.3, 1];
const COLORS = ["#f4f1ea", "#8c52ff", "#0b0b0f", "#f4f1ea", "#8c52ff"];

const LINES = [
  [{ w: "Turn" }, { w: "Every" }, { w: "Swipe" }],
  [{ w: "Into" }, { w: "Smarter", mark: true }],
  [{ w: "Reward", hot: true }, { w: "Yield", hot: true }],
];

function sceneStops(index) {
  const first = index === 0;
  const last = index === SCENES.length - 1;
  const at = SCENES[index].at;
  const end = last ? TOTAL : SCENES[index + 1].at;
  if (first) return { stops: [0, end - 45, end - 17], opacity: [1, 1, 0], y: [0, 0, -40] };
  if (last) return { stops: [at + 6, at + 34, TOTAL], opacity: [0, 1, 1], y: [40, 0, 0] };
  return { stops: [at + 6, at + 34, end - 45, end - 17], opacity: [0, 1, 1, 0], y: [40, 0, 0, -40] };
}

function Scene({ index, vh, active, onMeasure, className = "", children }) {
  const innerRef = useRef(null);
  const { stops, opacity, y } = sceneStops(index);
  useEffect(() => {
    const el = innerRef.current && innerRef.current.firstElementChild;
    if (!el || !onMeasure) return undefined;
    const measure = () => onMeasure(index, el.offsetTop);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [index, onMeasure]);
  const raw = useTransform(vh, stops, opacity);
  const o = useTransform(raw, (v) => (v < 0.05 ? 0 : v));
  const ty = useTransform(vh, stops, y);
  return (
    <motion.div
      inert={active !== index}
      style={{ opacity: o, y: ty, pointerEvents: active === index ? "auto" : "none" }}
      className={`absolute inset-0 z-20 flex px-4 pb-8 pt-20 md:px-10 md:pb-10 ${className}`}
    >
      <div ref={innerRef} className="mx-auto flex w-full max-w-[1320px] lg:pr-20">{children}</div>
    </motion.div>
  );
}

function Toggle({ label, note }) {
  const [on, setOn] = useState(false);
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border-2 border-ink/80 bg-white/40 p-4 md:p-5">
      <div>
        <p className="text-xl font-semibold text-ink md:text-2xl">{label}</p>
        <p className="text-sm text-ink/70 md:text-base">{note}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((v) => !v)}
        className={`relative h-9 w-16 shrink-0 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
          on ? "bg-violet" : "bg-ink/30"
        }`}
      >
        <span className={`absolute top-1 h-7 w-7 rounded-full bg-white transition-all ${on ? "left-8" : "left-1"}`} />
      </button>
    </div>
  );
}

function SpendWatermark({ vh, label }) {
  const o = useTransform(vh, [106, 134, 395, 417], [0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity: o }} className="pointer-events-none absolute inset-0 z-[12] hidden items-center justify-center overflow-hidden lg:flex">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="display-font whitespace-nowrap text-[clamp(6rem,15vw,15rem)] font-bold uppercase leading-none tracking-[-0.04em] text-white/[0.13]"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

function Preloader({ ready }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: ready ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      style={{ pointerEvents: ready ? "none" : "auto" }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-ink text-white"
    >
      <span className="display-font flex h-16 w-16 items-center justify-center rounded-full bg-white text-xl font-bold text-ink">CP</span>
      <div className="h-1 w-48 overflow-hidden rounded-full bg-white/20">
        <motion.div
          className="h-full origin-left bg-violet"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: ready ? 1 : 0.85 }}
          transition={{ duration: ready ? 0.3 : 2.4, ease: "easeOut" }}
        />
      </div>
      <p className="label text-white/60">Loading Card Co-Pilot</p>
    </motion.div>
  );
}

function Ruler({ vh, active }) {
  const fill = useTransform(vh, [0, TOTAL], [0, 1]);
  return (
    <div className="pointer-events-none absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 lg:flex lg:right-6">
      <div className={`relative flex h-[46vh] flex-col justify-between py-1 transition-colors duration-500 ${active === 0 || active === 3 ? "text-ink" : "text-white"}`}>
        <div className="absolute bottom-0 right-[3px] top-0 w-px bg-current opacity-30" />
        <motion.div style={{ scaleY: fill }} className="absolute right-[3px] top-0 h-full w-px origin-top bg-current" />
        {SCENES.map((scene, index) => (
          <div key={scene.id} className="relative flex items-center justify-end gap-3 pr-5">
            <span className={`label transition ${active === index ? "opacity-100" : "opacity-50"}`}>
              {String(index + 1).padStart(2, "0")} {active === index ? scene.label : ""}
            </span>
            <span className={`absolute right-0 h-px bg-current transition-all ${active === index ? "w-4" : "w-2"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestoneFill({ vh }) {
  const height = useTransform(vh, [440, 610], ["0%", "64%"]);
  const o = useTransform(vh, [425, 450, 590, 618], [0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity: o }} className="pointer-events-none absolute inset-0 z-10">
      <motion.div style={{ height }} className="absolute inset-x-0 bottom-0 bg-violet">
        <svg className="wave absolute -top-[39px] left-0 h-10 w-[200%]" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20 V40 H0Z" fill="#8c52ff" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function StaticStage() {
  return (
    <section id="top" className="bg-bone px-4 pb-24 pt-32 md:px-10">
      <div className="mx-auto max-w-[1320px]">
        <h1 className="display-font text-6xl font-bold tracking-tight md:text-9xl">{hero.headline}</h1>
        <p className="mt-6 max-w-xl text-2xl text-ink/80">{hero.subheadline}</p>
        <div id="waitlist" className="mt-8 max-w-3xl">
          <WaitlistForm variant="hero" tone="light" />
        </div>
      </div>
    </section>
  );
}

export default function Stage() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const stateRef = useRef({ vh: 0, step: 0, tops: [0, 0, 0, 0, 0] });
  const onMeasure = useCallback((index, top) => {
    stateRef.current.tops[index] = top;
  }, []);
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const vh = useTransform(scrollYProgress, [0, 1], [0, TOTAL]);
  const bg = useTransform(
    vh,
    [0, BOUNDS[0] - 14, BOUNDS[0] - 6, BOUNDS[1] - 14, BOUNDS[1] - 6, BOUNDS[2] - 14, BOUNDS[2] - 6, BOUNDS[3] - 14, BOUNDS[3] - 6, TOTAL],
    [COLORS[0], COLORS[0], COLORS[1], COLORS[1], COLORS[2], COLORS[2], COLORS[3], COLORS[3], COLORS[4], COLORS[4]],
  );

  useMotionValueEvent(vh, "change", (v) => {
    stateRef.current.vh = v;
    const idx = SCENES.reduce((acc, sc, i) => (v >= sc.at ? i : acc), 0);
    setActive(idx);
    const [ps, pe] = PICK_RANGE;
    const n = WINNERS.length - 1;
    const p = Math.min(Math.max(((v - ps) / (pe - ps)) * n, 0), n);
    const nextStep = Math.min(n, Math.round(p));
    stateRef.current.step = nextStep;
    setStep(nextStep);
    setPct(Math.round(Math.min(Math.max((v - 440) / 170, 0), 1) * 64));
  });

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 6000);
    return () => clearTimeout(t);
  }, []);

  function jumpToStep(i) {
    const n = WINNERS.length - 1;
    const target = PICK_RANGE[0] + (i / n) * (PICK_RANGE[1] - PICK_RANGE[0]);
    const y = sectionRef.current.offsetTop + (target * window.innerHeight) / 100;
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }

  if (reduceMotion) return <StaticStage />;

  const spend = pickerSpends[step];
  const winner = carouselCards[spend.winner];
  let wordIndex = 0;

  return (
    <section ref={sectionRef} id="top" style={{ height: `${TOTAL + 100}vh` }} className="relative">
      <Preloader ready={ready} />
      <span id="moments" className="absolute left-0" style={{ top: "100vh" }} />
      <span id="waitlist" className="absolute left-0" style={{ top: "880vh" }} />

      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ backgroundColor: bg }} className="absolute inset-0" />

        <SpendWatermark vh={vh} label={spend.label} />

        <div className="pointer-events-none absolute inset-0 z-[15]">
          <Suspense fallback={null}>
            <StageCard stateRef={stateRef} winners={WINNERS} urls={URLS} pickRange={PICK_RANGE} onReady={() => setReady(true)} />
          </Suspense>
        </div>

        <Scene index={0} vh={vh} active={active} onMeasure={onMeasure} className="items-end lg:items-center">
          <div className="w-full lg:w-[46%]">
            <p className="label text-ink/70">[01] {hero.eyebrow}</p>
            <h1
              aria-label={hero.headline}
              className="display-font mt-3 text-[clamp(2.4rem,5.6vw,6rem)] font-bold leading-[0.92] tracking-[-0.04em] text-ink"
            >
              {LINES.map((line, li) => (
                <span key={li} aria-hidden="true" className="block">
                  {line.map((word) => {
                    const delay = 0.5 + wordIndex++ * 0.08;
                    return (
                      <span key={word.w} className="mr-[0.2em] inline-block overflow-hidden pb-[0.08em] align-top last:mr-0">
                        <motion.span
                          className={`inline-block ${word.hot ? "accent text-violet" : ""} ${
                            word.mark ? "rounded-[0.18em] bg-violet px-[0.14em] text-white" : ""
                          }`}
                          initial={{ y: "115%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.8, delay, ease: EASE }}
                        >
                          {word.w}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
            <p className="mt-5 hidden max-w-lg text-lg text-ink/80 lg:block lg:text-xl">{hero.subheadline}</p>
            <div className="mt-6 max-w-xl">
              <WaitlistForm variant="hero" tone="light" compact />
            </div>
          </div>
        </Scene>

        <Scene index={1} vh={vh} active={active} onMeasure={onMeasure} className="items-end lg:items-center">
          <div className="w-full text-white lg:w-[46%]">
            <p className="label text-white/80">[02] The swipe</p>
            <p className="label mt-4 text-white/80">I am paying for</p>
            <div className="relative mt-1 h-[3rem] overflow-hidden md:h-[5.4rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h2
                  key={spend.id}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="display-font absolute inset-x-0 top-0 whitespace-nowrap text-[clamp(1.9rem,4vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.03em]"
                >
                  {spend.label}
                </motion.h2>
              </AnimatePresence>
            </div>
            <p className="label mt-3 text-white/80">Leads here</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={spend.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                <p className="accent text-4xl md:text-6xl">{winner.name}</p>
                <p className="mt-1 max-w-md text-base text-white/90 md:text-lg">{spend.why}</p>
              </motion.div>
            </AnimatePresence>
            <div role="group" aria-label="Jump to a spend" className="mt-4 flex flex-wrap gap-2">
              {pickerSpends.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={i === step}
                  onClick={() => jumpToStep(i)}
                  className={`min-h-11 rounded-full border-2 px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    i === step ? "border-white bg-white text-violet" : "border-white/70 text-white hover:bg-white/15"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/75">Illustration only. Scroll, or pick one.</p>
          </div>
        </Scene>

        <Scene index={2} vh={vh} active={active} onMeasure={onMeasure} className="items-end lg:items-center">
          <div className="w-full text-white lg:w-[44%]">
            <p className="label text-white/80">[03] Across the month</p>
            <p className="display-font text-[clamp(5rem,15vw,13rem)] font-bold leading-[0.85] tracking-[-0.05em] text-white">{pct}%</p>
            <h2 className="display-font mt-2 text-3xl font-bold leading-tight tracking-tight md:text-5xl">Milestones and points, noticed in time.</h2>
            <p className="mt-3 max-w-md text-base text-white/85 md:text-lg">Track spend milestones and points that expire, so a bonus is not missed by a few days.</p>
            <p className="mt-3 text-xs text-white/70">Illustration only. Quarterly spend milestone.</p>
          </div>
        </Scene>

        <Scene index={3} vh={vh} active={active} onMeasure={onMeasure} className="items-end lg:items-center">
          <div className="w-full text-ink lg:w-[46%]">
            <p className="label text-ink/80">[04] Behind the scenes</p>
            <h2 className="display-font mt-2 text-4xl font-bold leading-[1] tracking-tight md:text-7xl">You choose what it reads.</h2>
            <div className="mt-5 space-y-3">
              <Toggle label="Gmail, read-only" note="Off until you connect it" />
              <Toggle label="Bank SMS (Android)" note="Off until you turn it on" />
            </div>
            <p className="mt-3 text-sm text-ink/80">Both start off. Try the switches.</p>
          </div>
        </Scene>

        <Scene index={4} vh={vh} active={active} onMeasure={onMeasure} className="items-end lg:items-center">
          <div className="w-full text-white lg:w-[46%]">
            <p className="label text-white/80">[05] Early access</p>
            <h2 className="display-font mt-2 text-balance text-4xl font-bold leading-[0.98] tracking-[-0.03em] md:text-7xl">
              Be first to know which card to swipe.
            </h2>
            <p className="mt-3 max-w-lg text-base text-white/85 md:text-lg">Join the waitlist for launch updates and onboarding instructions.</p>
            <div className="mt-5 max-w-xl">
              <WaitlistForm variant="hero" tone="brand" compact />
            </div>
            <p className="mt-3 text-xs text-white/70">{disclaimer}</p>
          </div>
        </Scene>

        <Ruler vh={vh} active={active} />
      </div>
    </section>
  );
}
