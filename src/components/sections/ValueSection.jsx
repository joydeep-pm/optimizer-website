import { motion, useReducedMotion } from "framer-motion";
import SectionIntro from "../ui/SectionIntro";
import SignalBadge from "../ui/SignalBadge";
import { valueSection } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

export default function ValueSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="product" className="relative overflow-hidden bg-[#020202] py-24 md:py-32">
      {/* Full-bleed ambient glow — gives this section its own identity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 50% at 20% 20%, rgba(56,189,248,0.10), transparent)",
            "radial-gradient(ellipse 60% 60% at 80% 70%, rgba(139,92,246,0.08), transparent)",
            "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(34,211,238,0.06), transparent)",
          ].join(", "),
        }}
      />

      <div className="relative z-[1] mx-auto max-w-[1240px] px-4 md:px-8">
        {/* Eyebrow + headline — much larger, cinematic weight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
            {valueSection.eyebrow}
          </p>
          <h2 className="display-font mt-4 max-w-3xl text-left text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
            {valueSection.title}
          </h2>
          <p className="mt-5 max-w-2xl text-left text-lg leading-relaxed text-white/60 md:text-xl">
            {valueSection.body}
          </p>
        </motion.div>

        {/* Two-column: signal pill + decision canvas */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left — signal indicator */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-5 py-3">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.85)]" />
              <span className="text-xs uppercase tracking-[0.14em] text-cyan-100/85">
                {valueSection.signalLabel}
              </span>
            </div>

            {/* Vertical trace decoration */}
            <div className="mt-8 ml-3 space-y-3">
              {valueSection.decisionPanel.traces.map((trace, i) => (
                <motion.div
                  key={`side-trace-${i}`}
                  className={`h-1.5 rounded-full bg-gradient-to-r ${trace}`}
                  style={{ width: `${85 - i * 18}%` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — decision canvas panel */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8">
              {/* Floating ambient blob */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-10 h-52 w-52 rounded-full bg-violet-400/12 blur-3xl"
                animate={reduceMotion ? undefined : { y: [-6, 8, -6], x: [4, -4, 4] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-[1]">
                <p className="text-left text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {valueSection.decisionPanel.title}
                </p>
                <p className="mt-2.5 max-w-2xl text-left text-base leading-relaxed text-white/68">
                  {valueSection.decisionPanel.subtitle}
                </p>

                {/* Stage flow */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {valueSection.decisionPanel.stages.map((stage, index) => (
                    <div key={stage} className="flex items-center gap-2">
                      <span className="rounded-full border border-white/16 px-3 py-1 text-xs uppercase tracking-[0.12em] text-white/82">
                        {stage}
                      </span>
                      {index < valueSection.decisionPanel.stages.length - 1 ? (
                        <span className="text-white/35">→</span>
                      ) : null}
                    </div>
                  ))}
                </div>

                {/* Path traces */}
                <div className="mt-6 space-y-2.5">
                  {valueSection.decisionPanel.traces.map((trace, index) => (
                    <div key={`trace-${index}`} className="flex items-center gap-3">
                      <span className="w-18 shrink-0 text-[10px] uppercase tracking-[0.16em] text-white/42">
                        path {index + 1}
                      </span>
                      <motion.div
                        className={`h-2.5 flex-1 rounded-full bg-gradient-to-r ${trace}`}
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.12, ease: EASE }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support items — horizontal rule divider with 3 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          className="mt-14 border-t border-white/8 pt-8"
        >
          <div className="grid gap-8 md:grid-cols-3 md:gap-0">
            {valueSection.supportItems.map((item, index) => (
              <div
                key={item.title}
                className={`px-0 md:px-6 ${index < valueSection.supportItems.length - 1 ? "md:border-r md:border-white/8" : ""} ${index === 0 ? "md:pl-0" : ""} ${index === valueSection.supportItems.length - 1 ? "md:pr-0" : ""}`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="display-font text-left text-lg font-semibold tracking-tight text-white">{item.title}</p>
                  <SignalBadge label={item.badge} tone={index % 2 === 0 ? "info" : "amber"} />
                </div>
                <p className="text-left text-sm leading-relaxed text-white/55">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
