import GlowIconTile from "../ui/GlowIconTile";
import InfoCard from "../ui/InfoCard";
import { disclaimer, securityCards } from "../../content/siteContent";

export default function SecuritySection() {
  return (
    <section id="security" className="mx-auto w-full max-w-[1240px] px-4 py-4 md:px-8 md:py-8">
      <div className="section-shell rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">Security and Trust</p>
        <h2 className="display-font mt-4 text-3xl font-bold tracking-tight md:text-5xl">
          Trust signals designed into the decision layer
        </h2>

        <div className="stagger-grid mt-7 grid gap-4 md:grid-cols-3">
          {securityCards.map((item, index) => (
            <InfoCard
              key={item.title}
              title={item.title}
              body={item.point}
              badge={item.signalType}
              badgeTone={index === 0 ? "positive" : index === 1 ? "info" : "amber"}
              visual={
                <div className="flex items-center justify-between">
                  <GlowIconTile iconKey={item.signalType} tone={index === 0 ? "mint" : index === 1 ? "blue" : "amber"} />
                  <span className="text-xs uppercase tracking-[0.12em] text-white/58">trust signal</span>
                </div>
              }
            />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/16 bg-black/35 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-white/70">
            Legal note
          </span>
          <span className="rounded-full border border-white/16 bg-black/35 px-3 py-1.5 text-xs text-white/65">
            {disclaimer}
          </span>
        </div>
      </div>
    </section>
  );
}
