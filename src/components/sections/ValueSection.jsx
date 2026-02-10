import { motion, useReducedMotion } from "framer-motion";
import BaselineContainer from "../ui/BaselineContainer";
import InfoCard from "../ui/InfoCard";
import SectionIntro from "../ui/SectionIntro";
import SignalBadge from "../ui/SignalBadge";
import { valueSection } from "../../content/siteContent";

export default function ValueSection() {
  const reduceMotion = useReducedMotion();

  return (
    <BaselineContainer id="product" tone="teal">
      <div className="grid gap-7 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-5">
          <SectionIntro
            eyebrow={valueSection.eyebrow}
            title={valueSection.title}
            body={valueSection.body}
            titleClassName="max-w-xl"
          />

          <div className="mt-6 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2.5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100/85">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.85)]" />
              {valueSection.signalLabel}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/48 p-5 md:p-6">
            <motion.div
              aria-hidden="true"
              className="motion-value-parallax pointer-events-none absolute -left-24 top-0 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl"
              animate={reduceMotion ? undefined : { y: [-10, 10, -10], x: [-8, 8, -8] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              aria-hidden="true"
              className="motion-value-parallax pointer-events-none absolute bottom-[-80px] right-[-70px] h-64 w-64 rounded-full bg-fuchsia-300/20 blur-3xl"
              animate={reduceMotion ? undefined : { y: [8, -10, 8], x: [6, -4, 6] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-[1]">
              <p className="text-xs uppercase tracking-[0.16em] text-white/56">
                {valueSection.decisionPanel.title}
              </p>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/75">
                {valueSection.decisionPanel.subtitle}
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {valueSection.decisionPanel.stages.map((stage) => (
                  <div
                    key={stage}
                    className="rounded-lg border border-white/14 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/82"
                  >
                    {stage}
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3 rounded-xl border border-white/12 bg-black/35 p-3">
                {valueSection.decisionPanel.traces.map((trace, index) => (
                  <div
                    key={`${trace}-${index}`}
                    className={`h-2.5 rounded-full bg-gradient-to-r ${trace}`}
                  />
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <SignalBadge label="merchant signal" tone="info" />
                <SignalBadge label="channel context" tone="default" />
                <SignalBadge label="logic route" tone="positive" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {valueSection.supportItems.map((item, index) => (
          <InfoCard
            key={item.title}
            title={item.title}
            body={item.body}
            badge={item.badge}
            badgeTone={index % 2 === 0 ? "info" : "amber"}
            variant="support"
            className="min-h-[170px]"
          />
        ))}
      </div>
    </BaselineContainer>
  );
}
