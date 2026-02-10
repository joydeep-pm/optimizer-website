import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "./FadeIn";
import FlowMiniMap from "./FlowMiniMap";
import SignalBadge from "./SignalBadge";

export default function TimelineStep({ step, title, line, nodes, delay = 0, isLast = false }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      {!isLast ? (
        <div className="pointer-events-none absolute left-[52%] top-7 hidden h-px w-full overflow-hidden rounded-full bg-white/12 md:block">
          <motion.span
            aria-hidden="true"
            className="motion-timeline-fill absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-cyan-300/55 via-cyan-200/30 to-transparent"
            initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.7, delay: delay + 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      ) : null}

      <FadeIn delay={delay} direction="up" distance={14}>
        <article className="relative min-h-[232px] rounded-2xl border border-white/12 bg-black/45 p-4 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <h3 className="display-font text-2xl font-semibold leading-tight text-white">{title}</h3>
            <SignalBadge label={step} tone="info" />
          </div>

          <p className="mt-2 text-base leading-relaxed text-white/72">{line}</p>

          <div className="mt-4">
            <FlowMiniMap nodes={nodes} animated={!reduceMotion} />
          </div>
        </article>
      </FadeIn>
    </div>
  );
}
