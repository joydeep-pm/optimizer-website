export default function FlowMiniMap({ nodes = [], animated = true }) {
  return (
    <div className="mt-4">
      <div className="relative flex items-center gap-2 overflow-hidden rounded-xl border border-white/12 bg-black/35 px-2 py-2">
        {animated ? <span className="flow-trace" aria-hidden="true" /> : null}
        {nodes.map((node, index) => (
          <div key={`${node}-${index}`} className="relative z-[1] flex items-center gap-2">
            <span className="rounded-md border border-white/20 bg-white/[0.08] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/78">
              {node}
            </span>
            {index < nodes.length - 1 ? <span className="text-white/45">→</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
