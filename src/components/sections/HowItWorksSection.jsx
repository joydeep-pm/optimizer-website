import BaselineContainer from "../ui/BaselineContainer";
import SectionIntro from "../ui/SectionIntro";
import TimelineStep from "../ui/TimelineStep";
import { channels, howItWorksRail, howItWorksSection } from "../../content/siteContent";

export default function HowItWorksSection() {
  return (
    <BaselineContainer id="how-it-works" tone="violet">
      <SectionIntro
        eyebrow={howItWorksSection.eyebrow}
        title={howItWorksSection.title}
        body={howItWorksSection.body}
        titleClassName="max-w-5xl"
      />

      <div className="mt-5 flex flex-wrap gap-2">
        {channels.map((channel) => (
          <span
            key={channel}
            className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/84 transition hover:bg-white/[0.08]"
          >
            {channel}
          </span>
        ))}
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-white/10 md:block" />

        <div className="grid gap-4 md:grid-cols-3">
          {howItWorksRail.map((item, index) => (
            <TimelineStep
              key={item.step}
              step={item.step}
              title={item.title}
              line={item.line}
              nodes={item.diagramNodes}
              delay={index * 0.2}
              isLast={index === howItWorksRail.length - 1}
            />
          ))}
        </div>
      </div>
    </BaselineContainer>
  );
}
