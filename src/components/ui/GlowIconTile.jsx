const iconMap = {
  merchant: "M",
  channel: "C",
  yield: "Y",
  vault: "V",
  clarity: "R",
  explain: "E",
  shield: "S",
  trace: "T",
  policy: "P",
};

const toneMap = {
  default: "from-white/30 to-white/5",
  mint: "from-emerald-300/28 to-cyan-300/14",
  blue: "from-cyan-300/28 to-indigo-300/14",
  amber: "from-amber-300/28 to-rose-300/14",
};

export default function GlowIconTile({ iconKey, tone = "default" }) {
  return (
    <div className="relative h-11 w-11 rounded-xl border border-white/18 bg-black/45 p-[1px]">
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${toneMap[tone] || toneMap.default} opacity-48`} />
      <div className="relative flex h-full w-full items-center justify-center rounded-[10px] bg-black/55 text-sm font-bold tracking-wide text-white">
        {iconMap[iconKey] || "•"}
      </div>
    </div>
  );
}
