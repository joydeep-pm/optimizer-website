export default function SignalBadge({ label, tone = "default" }) {
  const toneMap = {
    default: "border-white/16 bg-white/[0.05] text-white/78",
    positive: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100/90",
    info: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100/90",
    amber: "border-amber-300/20 bg-amber-300/10 text-amber-100/90",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase ${toneMap[tone] || toneMap.default}`}
    >
      {label}
    </span>
  );
}
