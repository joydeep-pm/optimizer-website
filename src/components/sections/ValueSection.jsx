import { motion, useReducedMotion } from "framer-motion";
import BaselineContainer from "../ui/BaselineContainer";
import SectionIntro from "../ui/SectionIntro";
import SignalBadge from "../ui/SignalBadge";
import { valueSection } from "../../content/siteContent";

const EASE = [0.25, 0.1, 0.25, 1.0];

export default function ValueSection() {
  const reduceMotion = useReducedMotion();

  return (
    <BaselineContainer id="product" tone="teal">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <SectionIntro
            eyebrow={valueSection.eyebrow}
            title={valueSection.title}
            body={valueSection.body}
            titleClassName="max-w-xl text-left"
            bodyClassName="max-w-xl text-left"
          />

          <div className="mt-6 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2.5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100/85">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.85)]" />
              {valueSection.signalLabel}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/14 bg-black/40 p-6">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 top-0 h-44 w-44 rounded-full bg-cyan-300/16 blur-3xl"
              animate={reduceMotion ? undefined : { y: [-8, 8, -8] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-[1]">
              <p className="text-left text-xs uppercase tracking-[0.16em] text-white/56">
                {valueSection.decisionPanel.title}
              </p>
              <p className="mt-3 max-w-2xl text-left text-base leading-relaxed text-white/74">
                {valueSection.decisionPanel.subtitle}
              </p>

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

              <div className="mt-6 space-y-2.5">
                {valueSection.decisionPanel.traces.map((trace, index) => (
                  <div key={`${trace}-${index}`} className="flex items-center gap-3">
                    <span className="w-18 shrink-0 text-[10px] uppercase tracking-[0.16em] text-white/42">
                      path {index + 1}
                    </span>
                    <div className={`h-2.5 flex-1 rounded-full bg-gradient-to-r ${trace}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
        className="mt-8 border-y border-white/12"
      >
        <div className="grid gap-0 md:grid-cols-3">
          {valueSection.supportItems.map((item, index) => (
            <div
              key={item.title}
              className={`px-0 py-5 md:px-5 ${index < valueSection.supportItems.length - 1 ? "md:border-r md:border-white/12" : ""}`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="display-font text-left text-xl font-semibold tracking-tight text-white">{item.title}</p>
                <SignalBadge label={item.badge} tone={index % 2 === 0 ? "info" : "amber"} />
              </div>
              <p className="text-left text-base leading-relaxed text-white/70">{item.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </BaselineContainer>
  );
}
