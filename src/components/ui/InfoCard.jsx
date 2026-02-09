import SignalBadge from "./SignalBadge";

export default function InfoCard({
  title,
  body,
  visual,
  badge,
  badgeTone = "default",
  className = "",
}) {
  return (
    <article
      className={`group reveal-up rounded-2xl border border-white/12 bg-black/45 p-4 backdrop-blur-xl transition-all duration-300 hover-glow ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="display-font text-xl font-bold tracking-tight text-white">{title}</h3>
        {badge ? <SignalBadge label={badge} tone={badgeTone} /> : null}
      </div>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-white/72">{body}</p>
      {visual ? <div className="mt-3">{visual}</div> : null}
    </article>
  );
}
