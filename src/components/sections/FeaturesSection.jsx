import GlowIconTile from "../ui/GlowIconTile";
import InfoCard from "../ui/InfoCard";
import SignalBadge from "../ui/SignalBadge";
import { featureCards } from "../../content/siteContent";

function toneForIndex(index) {
  if (index % 3 === 0) return "mint";
  if (index % 3 === 1) return "blue";
  return "amber";
}

export default function FeaturesSection() {
  return (
    <section id="features" className="mx-auto w-full max-w-[1240px] px-4 py-4 md:px-8 md:py-8">
      <div className="section-shell rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">Feature Pillars</p>
        <h2 className="display-font mt-4 text-3xl font-bold tracking-tight md:text-5xl">
          Card-first capability tiles with high-signal visual cues
        </h2>

        <div className="stagger-grid mt-8 grid auto-rows-[1fr] gap-4 md:grid-cols-6">
          {featureCards.map((feature, index) => (
            <InfoCard
              key={feature.title}
              title={feature.title}
              body={feature.microCopy}
              className={
                index === 0
                  ? "md:col-span-3"
                  : index === 1
                    ? "md:col-span-3"
                    : index === 2
                      ? "md:col-span-2"
                      : index === 3
                        ? "md:col-span-2"
                        : index === 4
                          ? "md:col-span-2"
                          : "md:col-span-6"
              }
              visual={
                <div className="flex items-center justify-between gap-3">
                  <GlowIconTile iconKey={feature.iconKey} tone={toneForIndex(index)} />
                  <SignalBadge label={feature.statusTag} tone={index % 2 === 0 ? "positive" : "info"} />
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
