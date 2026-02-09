import FlowMiniMap from "../ui/FlowMiniMap";
import FadeIn from "../ui/FadeIn";
import InfoCard from "../ui/InfoCard";
import { channels, workflowCards } from "../../content/siteContent";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-[1240px] px-4 py-4 md:px-8 md:py-8">
      <div className="section-shell rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">How It Works</p>
        <h2 className="display-font mt-4 text-3xl font-bold tracking-tight md:text-5xl">
          A visual flow from spend intent to route decision
        </h2>

        <div className="mt-6 flex flex-wrap gap-2">
          {channels.map((channel) => (
            <span
              key={channel}
              className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/84 transition hover:bg-white/[0.08]"
            >
              {channel}
            </span>
          ))}
        </div>

        <div className="stagger-grid mt-7 grid gap-4 md:grid-cols-3">
          {workflowCards.map((item, index) => (
            <FadeIn key={item.step} delay={index * 0.2}>
              <InfoCard
                title={item.title}
                body={item.line}
                badge={item.step}
                badgeTone="info"
                className="relative"
                reveal={false}
                visual={<FlowMiniMap nodes={item.diagramNodes} animated />}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
