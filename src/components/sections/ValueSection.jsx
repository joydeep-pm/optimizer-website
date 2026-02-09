import InfoCard from "../ui/InfoCard";
import FlowMiniMap from "../ui/FlowMiniMap";
import SignalBadge from "../ui/SignalBadge";
import { valueCards } from "../../content/siteContent";

function ValueVisual({ visualType, chipLabels }) {
  if (visualType === "bars") {
    return (
      <div className="rounded-xl border border-white/12 bg-black/40 p-3">
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-gradient-to-r from-rose-300/65 via-amber-300/45 to-transparent" />
          <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300/70 via-emerald-300/45 to-transparent" />
          <div className="h-2 rounded-full bg-gradient-to-r from-indigo-300/60 via-cyan-300/30 to-transparent" />
        </div>
      </div>
    );
  }

  if (visualType === "chips") {
    return (
      <div className="flex flex-wrap gap-2">
        {chipLabels.map((chip) => (
          <SignalBadge key={chip} label={chip} tone="info" />
        ))}
      </div>
    );
  }

  return <FlowMiniMap nodes={chipLabels} animated />;
}

export default function ValueSection() {
  return (
    <section id="product" className="mx-auto w-full max-w-[1240px] px-4 py-14 md:px-8 md:py-20">
      <div className="section-shell rounded-3xl border border-white/15 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">Value Proposition</p>
        <h2 className="display-font mt-4 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
          Card strategy visualized as decisions, not paragraphs.
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-white/72 md:text-base">
          Compact signal cards surface where value drops, where fit improves, and how rule logic
          selects stronger routes.
        </p>

        <div className="mb-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 px-4 py-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-cyan-100/85">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.85)]" />
            Live decision surface
          </div>
        </div>

        <div className="stagger-grid mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {valueCards.map((item, index) => (
            <InfoCard
              key={item.title}
              title={item.title}
              body={item.body}
              badge={index === 0 ? "Gap" : index === 1 ? "Fit" : "Logic"}
              badgeTone={index === 0 ? "amber" : index === 1 ? "info" : "positive"}
              className={index === 0 ? "lg:col-span-5 min-h-[210px]" : index === 1 ? "lg:col-span-4 min-h-[210px]" : "lg:col-span-3 min-h-[210px]"}
              visual={<ValueVisual visualType={item.visualType} chipLabels={item.chipLabels} />}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
