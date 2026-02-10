import SignalBadge from "./SignalBadge";

const variantClassMap = {
  feature: "rounded-2xl border-white/12 bg-black/45",
  support: "rounded-xl border-white/12 bg-black/35",
  trust: "rounded-2xl border-white/14 bg-black/48",
};

export default function InfoCard({
  title,
  body,
  visual,
  badge,
  badgeTone = "default",
  className = "",
  reveal = true,
  variant = "feature",
}) {
  return (
    <article
      className={`${reveal ? "reveal-up" : ""} ${variantClassMap[variant] || variantClassMap.feature} group border p-4 backdrop-blur-xl transition-all duration-300 hover-glow ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="display-font text-xl font-bold tracking-tight text-white">{title}</h3>
        {badge ? <SignalBadge label={badge} tone={badgeTone} /> : null}
      </div>
      {body ? <p className="mt-2 max-w-prose text-sm leading-relaxed text-white/72">{body}</p> : null}
      {visual ? <div className="mt-3">{visual}</div> : null}
    </article>
  );
}
